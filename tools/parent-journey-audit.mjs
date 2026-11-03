import {chromium,webkit} from 'playwright';
import {mkdir,writeFile} from 'node:fs/promises';
const base=process.env.APP_URL||'http://127.0.0.1:4173';
const out='parent-journey-results';await mkdir(out,{recursive:true});
const routes=['/','/eiken/','/gyakuten/','/bansou/','/retry/'],results=[];
for(const [engine,type] of Object.entries({chromium,webkit})){
 const browser=await type.launch();
 try{
  for(const route of routes)for(const width of [414,1366]){
   const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
   const page=await context.newPage();const row={engine,route,width,links:[],passed:false};
   try{
    const guide=base+route+'#first-visit';
    await page.goto(guide,{waitUntil:'networkidle'});
    await page.evaluate(()=>document.fonts.ready);
    const nav=page.getByRole('navigation',{name:'受講前に確認したいこと'});
    const links=await nav.locator('a').evaluateAll(es=>es.map(e=>({href:e.getAttribute('href'),text:e.innerText})));
    if(links.length!==4)throw Error('Four parent questions are not available');
    await nav.locator('a').first().focus();
    for(let i=0;i<4;i++){
     const focused=await page.evaluate(()=>document.activeElement?.getAttribute('href'));
     if(focused!==links[i].href)throw Error('Keyboard reading order differs from the visible guide');
     if(i<3)await page.keyboard.press('Tab');
    }
    await page.screenshot({path:`${out}/${engine}-${route==='/'?'home':route.split('/')[1]}-${width}.png`});
    for(const item of links){
     await page.goto(guide,{waitUntil:'load'});
     await page.getByRole('navigation',{name:'受講前に確認したいこと'}).locator(`a[href="${item.href}"]`).click();
     const target=page.locator(item.href);
     await target.waitFor({state:'visible'});
     await page.waitForFunction(id=>{const e=document.querySelector(id);if(!e)return false;const r=e.getBoundingClientRect();return r.top>=0&&r.top<300},item.href,{timeout:5000});
     const heading=(await target.locator('h2').first().innerText()).trim();
     if(!heading)throw Error('A guide link has no visible destination heading');
     row.links.push({question:item.text,destination:item.href,heading});
    }
    await page.goto(guide,{waitUntil:'load'});
    await page.locator('#first-visit .visit-consult').click();
    await page.getByRole('heading',{name:'お問い合わせ・無料相談フォーム',exact:true}).waitFor({state:'visible'});
    const url=new URL(page.url());const expected=route==='/'?null:route.split('/')[1];
    if(url.pathname!=='/contact/'||url.searchParams.get('brand')!==expected)throw Error('Free consultation handoff lost the originating brand');
    row.consultation={path:url.pathname,brand:url.searchParams.get('brand'),submitted:false};row.passed=true;
   }catch(error){row.error=String(error)}finally{results.push(row);await context.close()}
  }
 }finally{await browser.close()}
}
await writeFile(`${out}/summary.json`,JSON.stringify(results,null,2));
const failed=results.filter(r=>!r.passed);console.log(JSON.stringify({journeys:results.length,failed},null,2));
if(failed.length)process.exitCode=1;
