import {chromium,webkit} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {mkdir,writeFile} from 'node:fs/promises';
const base=process.env.APP_URL||'http://127.0.0.1:4173';
const out=process.env.AUDIT_OUT||'audit-results';await mkdir(out,{recursive:true});
const paths=['/','/eiken/','/gyakuten/','/bansou/','/retry/'];
const widths=[320,390,414,768,1024,1366,1920],results=[];
const launched=[];
try {
for(const [engine,type] of Object.entries({chromium,webkit})){
 const browser=await type.launch();launched.push(browser);
 for(const route of paths){
  const context=await browser.newContext({viewport:{width:1366,height:900},reducedMotion:'reduce'});
  const page=await context.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base+route,{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  const name=route==='/'?'home':route.split('/')[1];
  for(const width of widths){
   await page.setViewportSize({width,height:width<600?844:900});
   // Trigger each lazy-loaded image without submitting or changing persisted data.
   await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,20));}scrollTo(0,0);});
   await page.waitForTimeout(200);
   const state=await page.evaluate(()=>({
    paymentGutter:(()=>{const r=document.querySelector('#payment-methods .embedded-payment__inner')?.getBoundingClientRect();return r?{left:r.left,right:innerWidth-r.right}:null})(),
    width:innerWidth,scrollWidth:document.documentElement.scrollWidth,
    badAnchors:[...document.querySelectorAll('a[href^="#"]')].map(x=>x.getAttribute('href')).filter(x=>x.length>1&&!document.getElementById(decodeURIComponent(x.slice(1)))),
    duplicateIds:[...document.querySelectorAll('[id]')].map(x=>x.id).filter((x,i,a)=>a.indexOf(x)!==i),
    badImages:[...document.images].filter(x=>x.complete&&!x.naturalWidth).map(x=>x.getAttribute('src')),
    overflow:[...document.querySelectorAll('main *')].filter(x=>{let r=x.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left< -1)&&getComputedStyle(x).position!=='fixed';}).slice(0,12).map(x=>({tag:x.tagName,class:x.className,text:x.innerText?.slice(0,80)})),
    canonical:document.querySelector('link[rel=canonical]')?.href,
    h1:document.querySelectorAll('h1').length,
    schemas:[...document.querySelectorAll('script[type="application/ld+json"]')].map(x=>{try{JSON.parse(x.textContent);return true;}catch{return false;}})
   }));
   results.push({engine,route,width,errors:[...errors],...state});
   await writeFile(`${out}/matrix.json`,JSON.stringify(results,null,2));
   // Materialize off-screen sections only for the full-page visual record.
   // Overflow, links, images and menu behavior above are measured with production styles.
   const visualStyle=await page.addStyleTag({content:'html body main>section:nth-of-type(n+3){content-visibility:visible;contain-intrinsic-size:none}'});
   const height=await page.evaluate(()=>document.documentElement.scrollHeight);
   await page.screenshot({path:`${out}/${engine}-${name}-${width}.png`,fullPage:[390,1366].includes(width)&&(engine==='chromium'||height<32000)});
   if(engine==='webkit'&&width===390&&height>=32000){
    const sections=page.locator('main > section');
    for(let i=0;i<await sections.count();i++){
     await sections.nth(i).scrollIntoViewIfNeeded();
     await page.screenshot({path:`${out}/${engine}-${name}-section-${i}.png`});
    }
    await page.evaluate(()=>scrollTo(0,0));
   }
   if(width===414){
    await page.locator('#payment-methods').scrollIntoViewIfNeeded();
    await page.screenshot({path:`${out}/${engine}-${name}-payment-414.png`});
    await page.evaluate(()=>scrollTo(0,0));
   }
   await visualStyle.evaluate(el=>el.remove());
   // Native mobile menus must close when a section is selected and on Escape.
   if(width===390){
    const menu=page.locator('header details').first();
    if(await menu.count()&&await menu.isVisible()){
     await menu.locator('summary').click();
     const sectionLink=menu.locator('a[href^="#"]').first();
     if(await sectionLink.count()){
      await sectionLink.click();
      if(await menu.getAttribute('open')!==null)results.push({engine,route,width,failure:'menu remains open after navigation'});
     }
     await menu.locator('summary').click();await page.keyboard.press('Escape');
     if(await menu.getAttribute('open')!==null)results.push({engine,route,width,failure:'menu remains open after Escape'});
    }
   }
  }
  await page.setViewportSize({width:390,height:844});
  const a11yVisualStyle=await page.addStyleTag({content:'html body main>section:nth-of-type(n+3){content-visibility:visible;contain-intrinsic-size:none}'});
  const a11y=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze().catch(error=>({violations:[],error:error.stack}));
  await writeFile(`${out}/${engine}-${name}-axe.json`,JSON.stringify(a11y,null,2));
  results.push({engine,route,a11yError:a11y.error,a11y:a11y.violations.map(v=>({id:v.id,impact:v.impact,help:v.help,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
  await a11yVisualStyle.evaluate(el=>el.remove());
  await page.goto(base+route+'#pricing',{waitUntil:'load'});
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(500);
  const anchorTop=await page.locator('#pricing').evaluate(el=>el.getBoundingClientRect().top);
  if(anchorTop<0||anchorTop>300)results.push({engine,route,failure:'Pricing deep link alignment',anchorTop});
  await context.close();
 }
 await browser.close();
}
} catch(error) { await writeFile(`${out}/error.txt`,error.stack||String(error));results.push({failure:String(error)}); }
for(const browser of launched)await browser.close().catch(()=>{});
await writeFile(`${out}/matrix.json`,JSON.stringify(results,null,2));
const fail=results.filter(r=>r.failure||r.a11yError||r.a11y?.some(v=>['critical','serious'].includes(v.impact))||r.scrollWidth>r.width||r.width<600&&(!r.paymentGutter||Math.min(r.paymentGutter.left,r.paymentGutter.right)<16)||r.badAnchors?.length||r.duplicateIds?.length||r.badImages?.length||r.errors?.length||r.h1!==undefined&&r.h1!==1||r.schemas?.includes(false));
console.log(JSON.stringify({checks:results.length,failures:fail},null,2));
if(fail.length)process.exitCode=1;
