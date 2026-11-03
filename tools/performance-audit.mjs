import lighthouse from 'lighthouse';
import {launch} from 'chrome-launcher';
import {chromium} from 'playwright';
import {mkdir,writeFile} from 'node:fs/promises';
const out='performance-results';await mkdir(out,{recursive:true});const results=[];
const chrome=await launch({chromePath:chromium.executablePath(),chromeFlags:['--headless','--no-sandbox','--disable-dev-shm-usage']});
try{
 for(const [phase,base] of (process.env.PERFORMANCE_PRODUCTION==='1'?[['production','https://kateikyoshi-sogo.com']]:[['before','http://127.0.0.1:4174'],['after','http://127.0.0.1:4173']])){
  for(const route of ['/','/eiken/','/gyakuten/','/bansou/','/retry/']){
   const name=route==='/'?'home':route.split('/')[1];
   const r=await lighthouse(base+route,{port:chrome.port,output:'json',logLevel:'error',onlyCategories:['performance','accessibility','best-practices','seo'],formFactor:'mobile',screenEmulation:{mobile:true,width:390,height:844,deviceScaleFactor:1,disabled:false}});
   await writeFile(`${out}/${phase}-${name}.json`,JSON.stringify(r.lhr));
   const a=r.lhr.audits;
   results.push({phase,route,scores:Object.fromEntries(Object.entries(r.lhr.categories).map(([k,v])=>[k,Math.round(v.score*100)])),lcp:a['largest-contentful-paint'].numericValue,cls:a['cumulative-layout-shift'].numericValue,tbt:a['total-blocking-time'].numericValue,failed:Object.entries(a).filter(([,v])=>v.score!==null&&v.score<1).map(([id,v])=>({id,title:v.title,displayValue:v.displayValue}))});
   await writeFile(`${out}/summary.json`,JSON.stringify(results,null,2));
  }
 }
}finally{await chrome.kill()}
console.log(JSON.stringify(results,null,2));
