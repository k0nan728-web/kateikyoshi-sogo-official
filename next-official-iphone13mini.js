(() => {
  'use strict';
  const STYLE_ID='ks-next-official-fluid-fit-v2';
  const SECTION_ID='ks-premium-intro-v6';

  const css=`
    #${SECTION_ID},#${SECTION_ID} *{box-sizing:border-box!important;min-width:0!important}
    #${SECTION_ID}{width:100%!important;max-width:100vw!important;overflow-x:hidden!important}
    #${SECTION_ID} .ks-panel{width:min(100%,1220px)!important;max-width:100%!important;margin-inline:auto!important;overflow:hidden!important}
    #${SECTION_ID} .ks-hero,#${SECTION_ID} .ks-question,#${SECTION_ID} .ks-resolution,#${SECTION_ID} .ks-copy,#${SECTION_ID} .planner-emphasis,#${SECTION_ID} .section-title,#${SECTION_ID} .promise h3,#${SECTION_ID} .promise p{max-width:100%!important;word-break:normal!important;overflow-wrap:normal!important;line-break:strict!important;hyphens:none!important}
    #${SECTION_ID} .ks-categories,#${SECTION_ID} .promises,#${SECTION_ID} .proofs,#${SECTION_ID} .cta-strip{width:100%!important;max-width:100%!important}
    #${SECTION_ID} .ks-category,#${SECTION_ID} .promise,#${SECTION_ID} .proof{max-width:100%!important;overflow:hidden!important}
    #${SECTION_ID} .semantic-line,#${SECTION_ID} .promise-title-line,#${SECTION_ID} .promise-body-line{display:block!important}
    #${SECTION_ID} .ks-hero .semantic-line,#${SECTION_ID} .promise-title-line,#${SECTION_ID} .promise-body-line,#${SECTION_ID} .section-title-prefix,#${SECTION_ID} .section-title-promise{white-space:nowrap!important}
    #${SECTION_ID} .promise-body-mobile{display:none!important}
    #${SECTION_ID} .promise-body-wide{display:block!important}
    .ks-section1-comparison-v9{max-width:calc(100vw - 16px)!important;overflow:hidden!important}
    @media(max-width:679px){
      #${SECTION_ID}{padding-inline:clamp(5px,2vw,10px)!important}
      #${SECTION_ID} .ks-panel{padding-inline:clamp(11px,4vw,22px)!important}
      #${SECTION_ID} .ks-categories{grid-template-columns:1fr!important}
      #${SECTION_ID} .promises{grid-template-columns:1fr!important}
      #${SECTION_ID} .proofs{grid-template-columns:repeat(2,minmax(0,1fr))!important}
      #${SECTION_ID} .cta-strip{grid-template-columns:1fr!important}
      #${SECTION_ID} .promise-body-wide{display:none!important}
      #${SECTION_ID} .promise-body-mobile{display:block!important}
    }
  `;

  function inject(){
    let s=document.getElementById(STYLE_ID);
    if(!s){s=document.createElement('style');s.id=STYLE_ID;s.textContent=css;document.head.appendChild(s)}
  }

  function fit(el,min,max){
    if(!el||!el.isConnected)return;
    const parent=el.parentElement;if(!parent)return;
    const cs=getComputedStyle(parent);
    const available=parent.clientWidth-(parseFloat(cs.paddingLeft)||0)-(parseFloat(cs.paddingRight)||0)-2;
    if(available<=0)return;
    let lo=min,hi=max;
    el.style.setProperty('font-size',max+'px','important');
    for(let i=0;i<10;i++){
      const mid=(lo+hi)/2;
      el.style.setProperty('font-size',mid+'px','important');
      if(el.scrollWidth<=available+1)lo=mid;else hi=mid;
    }
    el.style.setProperty('font-size',lo.toFixed(2)+'px','important');
  }

  function fitGroup(nodes,min,max){
    const arr=[...nodes].filter(Boolean);if(!arr.length)return;
    let common=max;
    arr.forEach(el=>{fit(el,min,max);common=Math.min(common,parseFloat(getComputedStyle(el).fontSize)||max)});
    arr.forEach(el=>el.style.setProperty('font-size',common.toFixed(2)+'px','important'));
  }

  function apply(){
    inject();
    const sec=document.getElementById(SECTION_ID);if(!sec)return;
    const vw=document.documentElement.clientWidth||innerWidth;
    const desktop=vw>=1200,tablet=vw>=680;
    fitGroup(sec.querySelectorAll('.ks-category>span'),16,desktop?48:tablet?36:24);
    fitGroup(sec.querySelectorAll('.ks-hero .semantic-line'),22,desktop?60:tablet?46:34);
    fit(sec.querySelector('.ks-question'),16,desktop?48:tablet?36:26);
    fit(sec.querySelector('.planner-emphasis'),18,desktop?39:tablet?32:28);
    fitGroup(sec.querySelectorAll('.section-title-prefix,.section-title-promise'),18,desktop?52:tablet?42:30);
    fitGroup(sec.querySelectorAll('.promise-title-line'),18,desktop?36:tablet?31:27);
    const mobileBodies=sec.querySelectorAll('.promise-body-mobile .promise-body-line');
    const wideBodies=sec.querySelectorAll('.promise-body-wide .promise-body-line');
    fitGroup(tablet?wideBodies:mobileBodies,13,desktop?17:tablet?18:17);
    fitGroup(sec.querySelectorAll('.proof strong'),18,desktop?41:tablet?34:30);
    const price=document.querySelector('.ks-section1-comparison-v9 .ks-comparison-title-price');
    fit(price,22,desktop?46:tablet?38:34);
  }

  let raf=0;
  function schedule(){cancelAnimationFrame(raf);raf=requestAnimationFrame(apply)}
  function boot(){apply();document.fonts?.ready?.then(apply);[100,350,800,1600,3000].forEach(ms=>setTimeout(apply,ms));window.addEventListener('resize',schedule,{passive:true});window.addEventListener('orientationchange',()=>setTimeout(apply,100),{passive:true});}
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();