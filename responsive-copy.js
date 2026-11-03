/* Preserve natural Japanese line endings with bounded, viewport-local work.
 * Text is never changed, hidden, truncated, or forced into a single line.
 */
(() => {
 'use strict';
 const selector='main h1,main h2,main h3,main h4,main h5,main p,main li,main dt,main dd,main figcaption,main summary,main .book-example>strong,footer p';
 const ignored='svg,[aria-hidden="true"],script,style,input,select,textarea,code,pre';
 const visible=new Set(),pending=new Set();let measured=new WeakMap(),scheduled=false;
 const reset=el=>{el.classList.remove('ks-responsive-fit','ks-responsive-balance');el.style.removeProperty('--ks-responsive-font');};
 function lastLineIsShort(el){
  const chars=[],walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT),range=document.createRange();let node;
  while((node=walker.nextNode())){
   if(node.parentElement.closest(ignored))continue;
   for(let i=0;i<node.length;i++)if(!/[\s\p{P}\p{S}]/u.test(node.data[i]))chars.push([node,i]);
  }
  if(chars.length<4)return false;
  let last=null,count=0;
  for(let i=chars.length-1;i>=Math.max(0,chars.length-4);i--){
   const [n,offset]=chars[i];range.setStart(n,offset);range.setEnd(n,offset+1);
   const r=range.getBoundingClientRect();if(!r.width||!r.height)return false;
   const mid=(r.top+r.bottom)/2;
   if(last===null)last={mid,height:r.height};
   if(Math.abs(mid-last.mid)>Math.min(r.height,last.height)*.45)return count<=3;
   count++;
  }
  return false;
 }
 function lineCount(el){
  const range=document.createRange();range.selectNodeContents(el);const rows=[];
  for(const r of range.getClientRects()){
   if(!r.width||!r.height)continue;const mid=(r.top+r.bottom)/2;
   if(!rows.some(y=>Math.abs(y.mid-mid)<Math.min(y.height,r.height)*.45))rows.push({mid,height:r.height});
  }
  return rows.length;
 }
 function refine(el){
  if(!el.isConnected||!el.getClientRects().length||el.closest('[data-copy-fit="off"],table,form'))return;
  const text=el.textContent.trim();if(text.length<4||text.length>240||!/[\u3040-\u30ff\u3400-\u9fff]/.test(text))return;
  if(el.matches('li,dd,summary')&&el.querySelector('p,h1,h2,h3,h4,ul,ol,div'))return;
  const key=innerWidth+':'+el.clientWidth+':'+text;
  if(measured.get(el)===key)return;measured.set(el,key);reset(el);
  const style=getComputedStyle(el);if(['flex','grid','inline-flex','inline-grid'].includes(style.display))return;
  const original=parseFloat(style.fontSize);if(!original||el.clientWidth<60||!lastLineIsShort(el))return;
  const heading=el.matches('h1,h2,h3,h4,h5,summary,strong');
  const floor=Math.min(original,Math.max(heading?15:13,original*(heading?.84:.92))),before=lineCount(el);
  const apply=size=>{el.style.setProperty('--ks-responsive-font',size.toFixed(2)+'px');el.classList.add('ks-responsive-fit');};
  apply(floor);
  if(lineCount(el)>=before||lastLineIsShort(el)){
   reset(el);if(text.length<=90)el.classList.add('ks-responsive-balance');return;
  }
  let low=floor,high=original;
  for(let i=0;i<5;i++){
   const mid=(low+high)/2;apply(mid);
   if(lineCount(el)<before&&!lastLineIsShort(el)&&el.scrollWidth<=el.clientWidth+1)low=mid;else high=mid;
  }
  apply(low);
 }
 function pump(){
  scheduled=false;const start=performance.now();
  while(pending.size){const el=pending.values().next().value;pending.delete(el);refine(el);if(performance.now()-start>6)break;}
  if(pending.size)schedule();
 }
 function schedule(){if(scheduled)return;scheduled=true;if('requestIdleCallback'in window)requestIdleCallback(pump,{timeout:500});else requestAnimationFrame(pump);}
 function refresh(){for(const el of visible){measured.delete(el);pending.add(el);}schedule();}
 function boot(){
  const elements=[...document.querySelectorAll(selector)];
  if('IntersectionObserver'in window){
   const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){visible.add(entry.target);pending.add(entry.target);}else visible.delete(entry.target);}schedule();},{rootMargin:'200px 0px'});
   elements.forEach(el=>observer.observe(el));
  }else{elements.filter(el=>el.getBoundingClientRect().top<innerHeight+200).forEach(el=>{visible.add(el);pending.add(el);});schedule();}
  let timer;const resize=()=>{clearTimeout(timer);timer=setTimeout(()=>{measured=new WeakMap();elements.forEach(reset);refresh();},120);};
  window.addEventListener('resize',resize,{passive:true});window.addEventListener('orientationchange',resize,{passive:true});
  document.fonts?.ready.then(refresh);document.fonts?.addEventListener('loadingdone',refresh);
  document.addEventListener('toggle',refresh,true);
 }
 // Resolve preceding section sizes before navigating to a deep anchor. Normal
 // top-of-page visits retain deferred rendering; navigation pays this cost once.
 function prepareHash(hash){
  let target;try{target=document.getElementById(decodeURIComponent(hash.slice(1)));}catch{return;}
  if(!target)return;
  for(const section of document.querySelectorAll('main>section')){
   section.style.contentVisibility='visible';section.style.containIntrinsicSize='none';
   if(section===target||section.contains(target))break;
  }
  target.style.scrollMarginTop='110px';
  return target;
 }
 const initialHash=location.hash;let visitorInput=false;
 for(const event of ['wheel','touchstart','pointerdown','keydown'])window.addEventListener(event,()=>{visitorInput=true;},{once:true,passive:true});
 if(initialHash)prepareHash(initialHash);
 const loaded=document.readyState==='complete'?Promise.resolve():new Promise(resolve=>window.addEventListener('load',resolve,{once:true}));
 Promise.all([loaded,document.fonts?.ready]).then(()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{
  if(visitorInput||!initialHash||location.hash!==initialHash)return;
  prepareHash(initialHash)?.scrollIntoView({block:'start',behavior:'instant'});
 })));
 document.addEventListener('click',event=>{
  const link=event.target.closest('a[href]');if(!link)return;
  const url=new URL(link.href,location.href);
  if(url.origin===location.origin&&url.pathname===location.pathname&&url.hash)prepareHash(url.hash);
 });
 window.addEventListener('hashchange',()=>{prepareHash(location.hash)?.scrollIntoView({block:'start',behavior:'instant'});});
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
