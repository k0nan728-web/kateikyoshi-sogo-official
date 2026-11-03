/* Native Japanese wrapping is defined in responsive-copy.css.
 * Do not measure glyphs or resize text during rendering. */
(() => {
 'use strict';
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
})();
