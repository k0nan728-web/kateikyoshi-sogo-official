(() => {
  'use strict';

  const FIRST_ID='ks-premium-intro-v6';
  const SECOND_ID='ks-next-official-section2';
  const PHOTO_ID='ks-first-second-photo';
  const STYLE_ID='ks-next-sections12-style-v1';
  const PHOTO_SRC='https://raw.githubusercontent.com/k0nan728-web/kateikyoshi-sogo-official/main/IMG_4792_lesson-screen-no-label.png';
  const norm=s=>(s||'').replace(/\s+/g,'').trim();

  const book='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22V5.5Z"/><path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22V5.5Z"/></svg>';
  const school='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V9l7-4 7 4v12"/><path d="M9 21v-6h6v6"/></svg>';
  const person='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="7" r="3"/><path d="M4 20v-2a6 6 0 0 1 12 0v2"/><path d="m17 13 1.7 1.7L22 11.4"/></svg>';
  const chat='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.4-4.1A8 8 0 1 1 21 12Z"/></svg>';
  const trend='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18 10 12l4 4 6-8"/><path d="M15 8h5v5"/></svg>';

  function injectStyle(){
    ['ks-next-section1-style-v1','ks-next-section1-style-v2','ks-next-section2-style-v1','ks-next-section2-style-v2'].forEach(id=>document.getElementById(id)?.remove());
    if(document.getElementById(STYLE_ID)) return;
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
      #${FIRST_ID},#${FIRST_ID} *,#${SECOND_ID},#${SECOND_ID} *,#${PHOTO_ID},#${PHOTO_ID} *{box-sizing:border-box!important;min-width:0!important}
      #${FIRST_ID},#${SECOND_ID}{width:100%!important;max-width:100vw!important;overflow:hidden!important;font-family:"Noto Sans JP",sans-serif!important;color:#173e67!important}
      #${FIRST_ID}{padding:clamp(8px,1.8vw,22px)!important;background:linear-gradient(180deg,#f4f7fb,#eef3f8)!important}
      #${FIRST_ID} .ks-panel{width:min(100%,1220px)!important;margin:0 auto!important;padding:clamp(24px,4vw,48px) clamp(12px,4vw,44px) clamp(30px,4vw,46px)!important;border:1px solid rgba(202,177,113,.48)!important;border-radius:clamp(17px,2.2vw,24px)!important;background:linear-gradient(135deg,#fff 0%,#fffefb 68%,#fff8e9 100%)!important;box-shadow:0 18px 42px rgba(20,47,78,.08)!important;text-align:center!important;overflow:hidden!important}
      #${FIRST_ID} .ks-categories{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:clamp(9px,1.4vw,16px)!important;width:min(100%,1120px)!important;margin:0 auto clamp(28px,4vw,44px)!important}
      #${FIRST_ID} .ks-category{display:flex!important;align-items:center!important;justify-content:center!important;gap:10px!important;min-height:clamp(66px,8vw,108px)!important;padding:10px 12px!important;border-radius:16px!important;background:#fff!important;font-family:"Noto Serif JP",serif!important;font-weight:900!important;line-height:1.2!important;overflow:hidden!important}
      #${FIRST_ID} .ks-category svg{width:clamp(28px,4vw,46px)!important;height:clamp(28px,4vw,46px)!important;flex:0 0 auto!important}
      #${FIRST_ID} .ks-category-label{display:block!important;flex:0 1 auto!important;width:auto!important;max-width:100%!important;white-space:nowrap!important;word-break:normal!important;overflow-wrap:normal!important;line-break:strict!important;hyphens:none!important;text-align:center!important}
      #${FIRST_ID} .ks-category.rose{border:2px solid #e85884!important;color:#df3568!important}#${FIRST_ID} .ks-category.blue{border:2px solid #4f91da!important;color:#286fc0!important}
      .ks-fit{display:block!important;width:100%!important;max-width:100%!important;white-space:nowrap!important;word-break:normal!important;overflow-wrap:normal!important;line-break:strict!important;hyphens:none!important;text-align:center!important}
      #${FIRST_ID} .ks-hero{margin:0 auto 18px!important;color:#082f59!important;font-family:"Noto Serif JP",serif!important;font-weight:900!important;line-height:1.28!important}
      #${FIRST_ID} .ornament{display:flex!important;align-items:center!important;justify-content:center!important;gap:8px!important;margin:0 auto 24px!important}#${FIRST_ID} .ornament:before,#${FIRST_ID} .ornament:after{content:"";width:44px;height:2px;background:#d7a21f}#${FIRST_ID} .ornament i{width:6px;height:6px;border-radius:50%;background:#d7a21f}
      #${FIRST_ID} .ks-question{margin:0 auto 12px!important;color:#082f59!important;font-family:"Noto Serif JP",serif!important;font-weight:900!important;line-height:1.42!important}
      #${FIRST_ID} .ks-resolution{margin:0 auto 20px!important;color:#082f59!important;font-weight:800!important;line-height:1.6!important}#${FIRST_ID} .ks-resolution strong{color:#d29a10!important;font-family:"Noto Serif JP",serif!important;font-size:1.55em!important}
      #${FIRST_ID} .ks-copy{margin:0 auto!important;color:#173e67!important;font-weight:700!important;line-height:1.75!important}
      #${FIRST_ID} .ks-planner{margin-top:clamp(22px,3vw,34px)!important;margin-bottom:0!important}#${FIRST_ID} .planner-lead{margin-bottom:14px!important}#${FIRST_ID} .planner-emphasis{color:#082f59!important;font-family:"Noto Serif JP",serif!important;font-weight:900!important;line-height:1.3!important}

      #${PHOTO_ID}{display:block!important;width:min(calc(100% - clamp(24px,6vw,72px)),1120px)!important;margin:clamp(34px,5vw,66px) auto!important;padding:0!important;background:none!important;border:0!important}
      #${PHOTO_ID} img{display:block!important;width:100%!important;height:auto!important;max-width:100%!important;border-radius:clamp(14px,2vw,24px)!important;box-shadow:0 18px 44px rgba(14,42,72,.16)!important;object-fit:cover!important}

      #${SECOND_ID}{position:relative!important;padding:clamp(42px,6vw,78px) clamp(12px,4vw,36px)!important;background:linear-gradient(180deg,#fffaf0 0%,#fff 48%,#f6f9fc 100%)!important;border-top:3px solid #d5a328!important}
      #${SECOND_ID} .ks-panel{width:min(100%,1180px)!important;margin:0 auto!important;text-align:center!important}
      #${SECOND_ID} .section-title{margin:0 auto clamp(28px,4vw,40px)!important;color:#082f59!important;font-family:"Noto Serif JP",serif!important;font-weight:900!important;line-height:1.3!important}#${SECOND_ID} .section-title strong{color:#d39a10!important;font-size:1.2em!important}
      #${SECOND_ID} .promises{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:16px!important}
      #${SECOND_ID} .promise{padding:26px 22px 28px!important;border:1px solid #d8dfe6!important;border-radius:18px!important;background:#fff!important;box-shadow:0 9px 22px rgba(27,53,82,.055)!important;overflow:hidden!important}
      #${SECOND_ID} .promise-head{display:flex!important;flex-direction:column!important;align-items:center!important;gap:13px!important;margin-bottom:18px!important}
      #${SECOND_ID} .icon{display:grid!important;place-items:center!important;width:70px!important;height:70px!important;border:1.8px solid currentColor!important;border-radius:50%!important}#${SECOND_ID} .icon svg{width:38px!important;height:38px!important}
      #${SECOND_ID} .promise.rose{color:#df3568!important}#${SECOND_ID} .promise.blue{color:#286fc0!important}#${SECOND_ID} .promise.green{color:#35a36b!important}
      #${SECOND_ID} .promise h3{margin:0!important;color:#082f59!important;font-family:"Noto Serif JP",serif!important;font-weight:900!important;line-height:1.42!important}#${SECOND_ID} .promise p{margin:0!important;color:#53677e!important;font-weight:600!important;line-height:1.85!important}
      #${SECOND_ID} .divider{height:1px!important;margin:clamp(30px,4vw,42px) 0!important;background:linear-gradient(90deg,transparent,#dfd2b6 8%,#dfd2b6 92%,transparent)!important}
      #${SECOND_ID} .proofs{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:12px!important}
      #${SECOND_ID} .proof{min-height:108px!important;padding:14px 8px!important;border:1.5px solid #dfc67d!important;border-radius:14px!important;background:linear-gradient(180deg,#fffefb,#fff8e8)!important;overflow:hidden!important}#${SECOND_ID} .proof strong{display:block!important;color:#0c4b8a!important;font-family:"Noto Serif JP",serif!important;font-weight:900!important}#${SECOND_ID} .proof span{display:block!important;margin-top:6px!important;color:#6f5520!important;font-weight:800!important;font-size:12px!important}
      #${SECOND_ID} .note{margin:10px 0 0!important;color:#6e7b8b!important;font-size:11px!important;text-align:right!important}
      #${SECOND_ID} .cta-strip{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(300px,40%)!important;align-items:center!important;gap:18px!important;margin-top:26px!important;padding:18px 20px!important;border:1.5px solid #ecadc0!important;border-radius:15px!important;background:linear-gradient(135deg,#fff6f9,#fff)!important;overflow:hidden!important}
      #${SECOND_ID} .cta-copy{text-align:left!important}#${SECOND_ID} .cta-copy strong{display:block!important;color:#082f59!important;font-weight:900!important;margin-bottom:5px!important}#${SECOND_ID} .cta-copy span{display:block!important;color:#53677e!important}#${SECOND_ID} .cta{display:flex!important;align-items:center!important;justify-content:center!important;width:100%!important;min-height:58px!important;padding:12px 15px!important;border-radius:11px!important;background:linear-gradient(135deg,#ed3d75,#df3269)!important;color:#fff!important;text-decoration:none!important;font-weight:900!important;text-align:center!important;white-space:normal!important;word-break:keep-all!important;line-height:1.5!important}
      @media(max-width:900px){#${SECOND_ID} .promises{grid-template-columns:1fr!important}#${SECOND_ID} .promise{padding:24px 18px 26px!important}#${SECOND_ID} .cta-strip{grid-template-columns:1fr!important}#${SECOND_ID} .cta-copy{text-align:center!important}}
      @media(max-width:560px){#${FIRST_ID} .ks-categories{grid-template-columns:1fr!important}#${FIRST_ID} .ks-panel{padding-left:12px!important;padding-right:12px!important}#${PHOTO_ID}{width:calc(100% - 24px)!important;margin:30px auto!important}#${SECOND_ID}{padding-left:12px!important;padding-right:12px!important}#${SECOND_ID} .proofs{grid-template-columns:repeat(2,minmax(0,1fr))!important}#${SECOND_ID} .note{text-align:center!important}}
    `;
    document.head.appendChild(s);
  }

  function buildFirst(){
    const s=document.createElement('section');s.id=FIRST_ID;s.dataset.nextOfficial='1';
    s.innerHTML=`<div class="ks-panel">
      <div class="ks-categories"><div class="ks-category rose">${book}<span class="ks-category-label">英検・受験</span></div><div class="ks-category blue">${school}<span class="ks-category-label">不登校・通信制高校</span></div></div>
      <h1 class="ks-hero"></h1><div class="ornament" aria-hidden="true"><i></i></div>
      <p class="ks-question"></p><p class="ks-resolution"></p><p class="ks-copy ks-support"></p>
      <div class="ks-planner"><p class="ks-copy planner-lead"></p><p class="planner-emphasis"></p></div>
    </div>`;
    return s;
  }

  function buildPhoto(){
    const f=document.createElement('figure');f.id=PHOTO_ID;f.setAttribute('aria-label','オンライン授業の様子');
    f.innerHTML=`<img src="${PHOTO_SRC}" alt="オンライン授業の様子" loading="eager" decoding="async">`;
    return f;
  }

  function buildSecond(){
    const s=document.createElement('section');s.id=SECOND_ID;s.dataset.nextOfficial='2';
    s.innerHTML=`<div class="ks-panel">
      <h2 class="section-title"></h2>
      <div class="promises">
        <article class="promise rose"><div class="promise-head"><span class="icon">${person}</span><h3></h3></div><p></p></article>
        <article class="promise blue"><div class="promise-head"><span class="icon">${chat}</span><h3></h3></div><p></p></article>
        <article class="promise green"><div class="promise-head"><span class="icon">${trend}</span><h3></h3></div><p></p></article>
      </div>
      <div class="divider"></div><h2 class="section-title ks-proof-title"></h2>
      <div class="proofs"><div class="proof"><strong>20年超</strong><span>指導経験</span></div><div class="proof"><strong>1,000名超</strong><span>総指導生徒数</span></div><div class="proof"><strong>300名以上</strong><span>英検指導実績</span></div><div class="proof"><strong>80%超</strong><span>英検合格率</span></div></div>
      <p class="note">※上記はこれまでの指導実績に基づく数値です。</p>
      <div class="cta-strip"><div class="cta-copy"><strong></strong><span></span></div><a class="cta" href="#contact">無料相談・体験授業について相談する</a></div>
    </div>`;
    return s;
  }

  const candidates={
    hero:[['英検・受験・不登校まで、','1人のプロが一貫して伴走します。'],['英検・受験・不登校まで、','1人のプロが一貫して','伴走します。']],
    question:[['「うちの子に合う先生が見つからない」'],['「うちの子に合う先生が','見つからない」']],
    resolution:[['そんなお悩みを、<strong>20年</strong>の経験で解決します。'],['そんなお悩みを、','<strong>20年</strong>の経験で解決します。']],
    support:[['学校に通えている子も、通えていない子も、','お子様に最適な指導で英検・受験などに一貫対応。'],['学校に通えている子も、','通えていない子も、','お子様に最適な指導で','英検・受験などに一貫対応。']],
    plannerLead:[['進路指導や学習習慣の定着まで見据えた'],['進路指導や学習習慣の定着まで','見据えた']],
    plannerEm:[['お子様だけの学習プランナー。'],['お子様だけの','学習プランナー。']],
    title:[['一人ひとりに合わせるための、','<strong>3</strong>つの約束']],
    proofTitle:[['多くのご家庭に選ばれています']],
    ctaStrong:[['まずはお気軽にご相談ください'],['まずはお気軽に','ご相談ください']],
    ctaText:[['無料相談・体験授業で、お子様に合う学び方を一緒に考えます。'],['無料相談・体験授業で、','お子様に合う学び方を一緒に考えます。'],['無料相談・体験授業で、','お子様に合う学び方を','一緒に考えます。']]
  };

  function render(el,lines){if(el)el.innerHTML=lines.map(x=>`<span class="ks-fit">${x}</span>`).join('')}
  function innerWidth(el){if(!el)return 0;const c=getComputedStyle(el);return Math.max(0,el.clientWidth-(parseFloat(c.paddingLeft)||0)-(parseFloat(c.paddingRight)||0)-2)}
  function fitCandidate(el,lines,min,max){render(el,lines);const avail=innerWidth(el);let lo=min,hi=max;for(let i=0;i<12;i++){const m=(lo+hi)/2;el.style.setProperty('font-size',m+'px','important');const ok=[...el.querySelectorAll('.ks-fit')].every(x=>x.scrollWidth<=avail+1);if(ok)lo=m;else hi=m}return lo}
  function fitBest(el,sets,min,max){if(!el)return min;let best=null;sets.forEach(lines=>{const size=fitCandidate(el,lines,min,max);const score=size-(lines.length-1)*1.25;if(!best||score>best.score+0.05||(Math.abs(score-best.score)<=0.05&&lines.length<best.lines.length))best={lines,size,score}});render(el,best.lines);el.style.setProperty('font-size',best.size.toFixed(2)+'px','important');return best.size}
  function fitCategoryLabel(el,min,max){if(!el)return min;const card=el.closest('.ks-category');if(!card)return min;const cs=getComputedStyle(card),icon=card.querySelector('svg'),gap=parseFloat(cs.columnGap||cs.gap)||0;const available=card.clientWidth-(parseFloat(cs.paddingLeft)||0)-(parseFloat(cs.paddingRight)||0)-(icon?.getBoundingClientRect().width||0)-gap-4;let lo=min,hi=max;for(let i=0;i<12;i++){const m=(lo+hi)/2;el.style.setProperty('font-size',m+'px','important');if(el.scrollWidth<=available+.5)lo=m;else hi=m}el.style.setProperty('font-size',lo.toFixed(2)+'px','important');return lo}
  function equalize(elements,measure){const arr=[...elements].filter(Boolean);if(!arr.length)return;const sizes=arr.map(el=>measure(el));const common=Math.min(...sizes);arr.forEach(el=>el.style.setProperty('font-size',common.toFixed(2)+'px','important'))}

  function fill(first,second){
    fitBest(first.querySelector('.ks-hero'),candidates.hero,24,60);
    fitBest(first.querySelector('.ks-question'),candidates.question,17,40);
    fitBest(first.querySelector('.ks-resolution'),candidates.resolution,14,22);
    fitBest(first.querySelector('.ks-support'),candidates.support,13,18);
    fitBest(first.querySelector('.planner-lead'),candidates.plannerLead,13,17);
    fitBest(first.querySelector('.planner-emphasis'),candidates.plannerEm,22,39);
    equalize(first.querySelectorAll('.ks-category-label'),el=>fitCategoryLabel(el,16,42));

    fitBest(second.querySelector('.section-title'),candidates.title,22,50);
    fitBest(second.querySelector('.ks-proof-title'),candidates.proofTitle,22,42);
    fitBest(second.querySelector('.cta-copy strong'),candidates.ctaStrong,14,20);
    fitBest(second.querySelector('.cta-copy span'),candidates.ctaText,11,14);
    const heads=[['お子様に合わせた','オーダーメイド指導'],['相談から授業まで','同じプロが担当'],['英検・受験・進路まで','長期的に伴走']];
    const bodies=[[['現在地・目標・性格・生活環境を丁寧に把握し、','最適な学習計画を一緒に作ります。'],['現在地・目標・性格・生活環境を','丁寧に把握し、','最適な学習計画を一緒に作ります。']],[['相談した内容がそのまま指導につながるので、','安心して何でも相談できます。'],['相談した内容がそのまま','指導につながるので、','安心して何でも相談できます。']],[['点数だけでなく将来を見据えたサポートで、','学力と自信をしっかり育てます。'],['点数だけでなく将来を見据えた','サポートで、','学力と自信をしっかり育てます。']]];
    const cards=[...second.querySelectorAll('.promise')];
    const headSizes=cards.map((card,i)=>fitBest(card.querySelector('h3'),[heads[i]],20,34));
    const commonHead=Math.min(...headSizes);cards.forEach(card=>card.querySelector('h3')?.style.setProperty('font-size',commonHead.toFixed(2)+'px','important'));
    const bodySizes=cards.map((card,i)=>fitBest(card.querySelector('p'),bodies[i],13,17));
    const commonBody=Math.min(...bodySizes);cards.forEach(card=>card.querySelector('p')?.style.setProperty('font-size',commonBody.toFixed(2)+'px','important'));
    const proofSizes=[...second.querySelectorAll('.proof strong')].map(el=>{let lo=20,hi=38,avail=innerWidth(el.parentElement);for(let i=0;i<12;i++){const m=(lo+hi)/2;el.style.setProperty('font-size',m+'px','important');if(el.scrollWidth<=avail)lo=m;else hi=m}return lo});
    const commonProof=Math.min(...proofSizes);second.querySelectorAll('.proof strong').forEach(el=>el.style.setProperty('font-size',commonProof.toFixed(2)+'px','important'));
  }

  function mount(){
    injectStyle();
    const main=document.querySelector('main');if(!main)return false;
    let first=document.getElementById(FIRST_ID),second=document.getElementById(SECOND_ID),photo=document.getElementById(PHOTO_ID);
    if(!first||first.dataset.nextOfficial!=='1'||!second||!photo){
      const nodes=[...main.querySelectorAll('section,div')].filter(x=>{const t=norm(x.textContent);return t.includes('うちの子に合う先生が見つからない')&&t.includes('20年')&&t.includes('1,000名超')}).sort((a,b)=>a.querySelectorAll('*').length-b.querySelectorAll('*').length);
      const legacy=nodes[0]?.closest('section')||nodes[0];
      first=buildFirst();photo=buildPhoto();second=buildSecond();
      const frag=document.createDocumentFragment();frag.append(first,photo,second);
      if(legacy)legacy.replaceWith(frag);else main.prepend(frag);
    }
    fill(first,second);return true;
  }

  let raf=0;const schedule=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(mount)};
  function boot(){let n=0;const t=setInterval(()=>{n++;if(mount()||n>40)clearInterval(t)},100);document.fonts?.ready?.then(schedule);window.addEventListener('resize',schedule,{passive:true});window.addEventListener('orientationchange',()=>setTimeout(schedule,100),{passive:true})}
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();