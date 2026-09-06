(() => {
  'use strict';
  const STYLE_ID='ks-next-official-fluid-fit-v3';
  const SECTION_ID='ks-premium-intro-v6';

  const css=`
    #${SECTION_ID},#${SECTION_ID} *{box-sizing:border-box!important;min-width:0!important}
    #${SECTION_ID}{width:100%!important;max-width:100vw!important;overflow-x:hidden!important}
    #${SECTION_ID} .ks-panel{width:min(100%,1220px)!important;max-width:100%!important;margin-inline:auto!important;overflow:hidden!important}
    #${SECTION_ID} .ks-categories,#${SECTION_ID} .promises,#${SECTION_ID} .proofs,#${SECTION_ID} .cta-strip{width:100%!important;max-width:100%!important}
    #${SECTION_ID} .ks-category,#${SECTION_ID} .promise,#${SECTION_ID} .proof,#${SECTION_ID} .cta-strip{max-width:100%!important;overflow:hidden!important}
    #${SECTION_ID} .ks-hero,#${SECTION_ID} .ks-question,#${SECTION_ID} .ks-resolution,#${SECTION_ID} .ks-copy,#${SECTION_ID} .ks-planner,#${SECTION_ID} .section-title,#${SECTION_ID} .promise h3,#${SECTION_ID} .promise p,#${SECTION_ID} .cta-copy strong,#${SECTION_ID} .cta-copy span{max-width:100%!important;word-break:normal!important;overflow-wrap:normal!important;line-break:strict!important;hyphens:none!important}
    #${SECTION_ID} .ks-sem-line,#${SECTION_ID} .promise-title-line,#${SECTION_ID} .promise-body-line{display:block!important;width:100%!important;white-space:nowrap!important;text-align:center!important}
    #${SECTION_ID} .promise-body-mobile{display:none!important}
    #${SECTION_ID} .promise-body-wide{display:block!important}
    #${SECTION_ID} .cta-copy{min-width:0!important}
    #${SECTION_ID} .cta-copy strong .ks-sem-line,#${SECTION_ID} .cta-copy span .ks-sem-line{text-align:left!important}
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

  const lineHTML=parts=>parts.map(x=>`<span class="ks-sem-line">${x}</span>`).join('');

  function normalizeCopy(sec,vw){
    const compact=vw<680;
    const hero=sec.querySelector('.ks-hero');
    if(hero) hero.innerHTML=lineHTML(compact?['英検・受験・不登校まで、','1人のプロが一貫して','伴走します。']:['英検・受験・不登校まで、','1人のプロが一貫して伴走します。']);

    const q=sec.querySelector('.ks-question');
    if(q) q.innerHTML=lineHTML(compact?['「うちの子に合う先生が','見つからない」']:['「うちの子に合う先生が見つからない」']);

    const r=sec.querySelector('.ks-resolution');
    if(r) r.innerHTML=lineHTML(['そんなお悩みを、','<strong>20年</strong>の経験で解決します。']);

    const copies=sec.querySelectorAll('.ks-copy');
    if(copies[0]) copies[0].innerHTML=lineHTML(compact?['学校に通えている子も、','通えていない子も、','お子様に最適な指導で','英検・受験などに一貫対応。']:['学校に通えている子も、通えていない子も、','お子様に最適な指導で英検・受験などに一貫対応。']);

    const planner=sec.querySelector('.ks-planner');
    if(planner) planner.innerHTML=lineHTML(['進路指導や学習習慣の定着まで見据えた','お子様だけの学習プランナー。']);

    const title=sec.querySelector('.section-title');
    if(title) title.innerHTML=lineHTML(['一人ひとりに合わせるための、','<strong>3</strong>つの約束']);

    const ctaStrong=sec.querySelector('.cta-copy strong');
    if(ctaStrong) ctaStrong.innerHTML=lineHTML(compact?['まずはお気軽に','ご相談ください']:['まずはお気軽にご相談ください']);
    const ctaSpan=sec.querySelector('.cta-copy span:not(.cta-badge)');
    if(ctaSpan) ctaSpan.innerHTML=lineHTML(compact?['無料相談・体験授業で、','お子様に合う学び方を','一緒に考えます。']:['無料相談・体験授業で、','お子様に合う学び方を一緒に考えます。']);
  }

  function fit(el,min,max){
    if(!el||!el.isConnected)return max;
    const parent=el.parentElement;if(!parent)return max;
    const cs=getComputedStyle(parent);
    const available=parent.clientWidth-(parseFloat(cs.paddingLeft)||0)-(parseFloat(cs.paddingRight)||0)-2;
    if(available<=0)return max;
    let lo=min,hi=max;
    for(let i=0;i<11;i++){
      const mid=(lo+hi)/2;
      el.style.setProperty('font-size',mid+'px','important');
      if(el.scrollWidth<=available+1)lo=mid;else hi=mid;
    }
    el.style.setProperty('font-size',lo.toFixed(2)+'px','important');
    return lo;
  }

  function fitGroup(nodes,min,max){
    const arr=[...nodes].filter(Boolean);if(!arr.length)return;
    let common=max;
    arr.forEach(el=>{common=Math.min(common,fit(el,min,max))});
    arr.forEach(el=>el.style.setProperty('font-size',common.toFixed(2)+'px','important'));
  }

  function apply(){
    inject();
    const sec=document.getElementById(SECTION_ID);if(!sec)return;
    const vw=document.documentElement.clientWidth||innerWidth;
    const desktop=vw>=1200,tablet=vw>=680;
    normalizeCopy(sec,vw);

    fitGroup(sec.querySelectorAll('.ks-category>span'),16,desktop?48:tablet?36:24);
    fitGroup(sec.querySelectorAll('.ks-hero .ks-sem-line'),21,desktop?60:tablet?46:34);
    fitGroup(sec.querySelectorAll('.ks-question .ks-sem-line'),16,desktop?48:tablet?36:26);
    fitGroup(sec.querySelectorAll('.ks-resolution .ks-sem-line'),13,desktop?20:tablet?18:16);
    fitGroup(sec.querySelectorAll('.ks-copy:not(.ks-planner) .ks-sem-line'),12,desktop?17:tablet?16:15);
    fitGroup(sec.querySelectorAll('.ks-planner .ks-sem-line'),14,desktop?39:tablet?32:27);
    fitGroup(sec.querySelectorAll('.section-title .ks-sem-line'),18,desktop?52:tablet?42:30);
    fitGroup(sec.querySelectorAll('.promise-title-line'),18,desktop?36:tablet?31:27);
    const mobileBodies=sec.querySelectorAll('.promise-body-mobile .promise-body-line');
    const wideBodies=sec.querySelectorAll('.promise-body-wide .promise-body-line');
    fitGroup(tablet?wideBodies:mobileBodies,13,desktop?17:tablet?18:17);
    fitGroup(sec.querySelectorAll('.proof strong'),18,desktop?41:tablet?34:30);
    fitGroup(sec.querySelectorAll('.cta-copy strong .ks-sem-line'),13,desktop?20:tablet?18:17);
    fitGroup(sec.querySelectorAll('.cta-copy span .ks-sem-line'),10,desktop?13:tablet?12:12);

    const compareMain=document.querySelector('.ks-section1-comparison-v9 .ks-comparison-title-main');
    const comparePrice=document.querySelector('.ks-section1-comparison-v9 .ks-comparison-title-price');
    fit(compareMain,15,desktop?31:tablet?24:20);
    fit(comparePrice,22,desktop?46:tablet?38:34);
  }

  let raf=0;
  function schedule(){cancelAnimationFrame(raf);raf=requestAnimationFrame(apply)}
  function boot(){apply();document.fonts?.ready?.then(apply);[100,350,800,1600,3000].forEach(ms=>setTimeout(apply,ms));window.addEventListener('resize',schedule,{passive:true});window.addEventListener('orientationchange',()=>setTimeout(apply,100),{passive:true});}
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();