// Read-only post-deployment checks. Never submits forms or contacts real parents.
import {mkdir,writeFile} from 'node:fs/promises';
const base='https://kateikyoshi-sogo.com';
const pages=['/','/eiken/','/gyakuten/','/bansou/','/retry/'];
const out='production-results';await mkdir(out,{recursive:true});const results=[];
async function get(path){const r=await fetch(base+path,{signal:AbortSignal.timeout(20000),cache:'no-store'});return {path,status:r.status,url:r.url,text:await r.text()};}
let deployed=false;
for(let attempt=0;attempt<24;attempt++){
 const r=await get('/');
 if(r.status===403||r.status===429)throw Error('Production HTTP '+r.status+'; no retries against access restrictions');
 if(r.status===200&&r.text.includes('data-billing-policy-version="2026-11-03-monthly"')&&r.text.includes('data-parent-design="2026-11-03-colour"')){deployed=true;break;}
 await new Promise(r=>setTimeout(r,7500));
}
if(!deployed)throw Error('New production assets not observed within deployment window');
const found=new Set(['/contact/','/apply/','/hikaku/','/payment/','/robots.txt','/sitemap.xml']);
for(const path of pages){
 const r=await get(path);const canonical=(r.text.match(/<link[^>]*canonical[^>]*>/)||[])[0];
 const protectedEmailTags=[...r.text.matchAll(/<a\b[^>]*href="\/cdn-cgi\/l\/email-protection[^"<]*"[^>]*>/g)].map(m=>m[0]);
 const protectedEmailLinksValid=protectedEmailTags.every(tag=>{
  const hex=(tag.match(/email-protection#([a-f0-9]+)/i)||tag.match(/data-cfemail="([a-f0-9]+)"/i))?.[1];
  if(!hex||hex.length%2)return false;
  const bytes=Buffer.from(hex,'hex');const email=String.fromCharCode(...[...bytes.subarray(1)].map(b=>b^bytes[0]));
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
 });
 results.push({path,status:r.status,protectedEmailLinksValid,colourDesign:r.text.includes('data-parent-design="2026-11-03-colour"'),billingPolicy:r.text.includes('data-billing-policy-version="2026-11-03-monthly"'),canonicalPresent:!!canonical,newAssets:r.text.includes('parent-guide.css?v=20261103b'),oldGoogleForm:r.text.includes('href="https://docs.google.com/forms/')});
 for(const m of r.text.matchAll(/href="([^"]+)"/g)){
  const u=new URL(m[1].replaceAll('&amp;','&'),base+path);
  if(u.origin!==base||u.pathname==='/'||u.pathname==='/cdn-cgi/l/email-protection')continue;
  if(/\.(css|js|png|webp|avif|jpg|svg)$/i.test(u.pathname))continue;
  if(u.pathname.startsWith('/contact/')||u.pathname.startsWith('/apply/')){found.add(u.pathname);continue;}
  found.add(u.pathname);
 }
}
for(const path of found){const r=await get(path);results.push({path,status:r.status});if([403,429].includes(r.status))break;}
const api=await get('/api/intake');const config=JSON.parse(api.text);results.push({path:'/api/intake',status:api.status,available:config.available,publicSiteKeyPresent:!!config.turnstileSiteKey});
const missing=await get('/__audit_missing_page_20261103__');results.push({path:missing.path,status:missing.status,custom404:missing.text.includes('ページが見つかりませんでした')});
const failed=results.filter(r=>r.path===missing.path?r.status!==404||!r.custom404:r.status!==200||r.newAssets===false||r.canonicalPresent===false||r.billingPolicy===false||r.colourDesign===false||r.oldGoogleForm||r.protectedEmailLinksValid===false||r.available===false||r.publicSiteKeyPresent===false);
await writeFile(`${out}/smoke.json`,JSON.stringify({checkedAt:new Date().toISOString(),results,failed},null,2));
console.log(JSON.stringify({results,failed},null,2));if(failed.length)process.exitCode=1;
