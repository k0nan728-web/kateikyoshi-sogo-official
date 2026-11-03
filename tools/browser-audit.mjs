import {chromium,webkit} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import {mkdir,writeFile} from 'node:fs/promises';
const base=process.env.APP_URL||'http://127.0.0.1:4173';
const out=process.env.AUDIT_OUT||'audit-results';await mkdir(out,{recursive:true});
const paths=['/','/eiken/','/gyakuten/','/bansou/','/retry/'];
const widths=[320,390,768,1024,1366,1920],results=[];
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
   await page.screenshot({path:`${out}/${engine}-${name}-${width}.png`,fullPage:[390,1366].includes(width)});
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
  const a11y=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze().catch(error=>({violations:[],error:error.stack}));
  await writeFile(`${out}/${engine}-${name}-axe.json`,JSON.stringify(a11y,null,2));
  results.push({engine,route,a11yError:a11y.error,a11y:a11y.violations.map(v=>({id:v.id,impact:v.impact,help:v.help,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
  await context.close();
 }
 await browser.close();
}
} catch(error) { await writeFile(`${out}/error.txt`,error.stack||String(error));results.push({failure:String(error)}); }
for(const browser of launched)await browser.close().catch(()=>{});
await writeFile(`${out}/matrix.json`,JSON.stringify(results,null,2));
const fail=results.filter(r=>r.failure||r.a11yError||r.scrollWidth>r.width||r.badAnchors?.length||r.duplicateIds?.length||r.badImages?.length||r.errors?.length||r.h1!==undefined&&r.h1!==1||r.schemas?.includes(false));
console.log(JSON.stringify({checks:results.length,failures:fail},null,2));
if(fail.length)process.exitCode=1;
