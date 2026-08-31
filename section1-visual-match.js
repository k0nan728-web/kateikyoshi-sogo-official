(() => {
  'use strict';
  const ID='ks-premium-intro-v6';
  const STYLE_ID='ks-section1-approved-reference-v5';
  const VERSION='5';

  function style(){
    document.querySelectorAll('[id^="ks-section1-approved-reference-v"],#ks-section1-visual-match-v1,#ks-section1-visual-match-v2').forEach(el=>{if(el.id!==STYLE_ID)el.remove()});
    if(document.getElementById(STYLE_ID)) return;
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
      #${ID}{--n:#082f59;--g:#d7a21f;--r:#df3568;--b:#286fc0;--gr:#35a36b;--t:#173e67;width:100%!important;padding:12px 8px 30px!important;background:linear-gradient(180deg,#f4f7fb,#eef3f8)!important}
      #${ID},#${ID} *{box-sizing:border-box!important;min-width:0!important}
      #${ID} .ks-panel{position:relative!important;width:min(100%,1220px)!important;margin:0 auto!important;padding:clamp(34px,4vw,50px) clamp(24px,4vw,48px) clamp(32px,3vw,40px)!important;border:1px solid rgba(202,177,113,.46)!important;border-radius:22px!important;background:linear-gradient(135deg,#fff 0%,#fffefb 66%,#fff9ee 100%)!important;box-shadow:0 18px 42px rgba(20,47,78,.08),inset 0 1px 0 rgba(255,255,255,.98)!important;overflow:hidden!important;text-align:center!important}
      #${ID} .ks-panel:after{opacity:.58!important}

      #${ID} .ks-categories{width:min(100%,990px)!important;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:18px!important;margin:0 auto 42px!important}
      #${ID} .ks-category{display:flex!important;align-items:center!important;justify-content:center!important;min-height:94px!important;padding:10px 12px!important;gap:12px!important;border-radius:16px!important;background:linear-gradient(180deg,#fff,#fffefd)!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(30px,3.5vw,38px)!important;font-weight:900!important;line-height:1.1!important;letter-spacing:0!important;white-space:nowrap!important;box-shadow:0 9px 22px rgba(27,53,82,.05),inset 0 0 0 1px rgba(255,255,255,.85)!important}
      #${ID} .ks-category svg{width:clamp(38px,4vw,46px)!important;height:clamp(38px,4vw,46px)!important;flex:0 0 clamp(38px,4vw,46px)!important;stroke-width:1.8!important}
      #${ID} .ks-category.rose{border:2px solid #e85884!important;color:var(--r)!important}
      #${ID} .ks-category.blue{border:2px solid #4f91da!important;color:var(--b)!important}

      #${ID} .ks-hero{max-width:1120px!important;margin:0 auto 18px!important;color:var(--n)!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(44px,5vw,60px)!important;font-weight:900!important;line-height:1.26!important;letter-spacing:0!important;text-align:center!important}
      #${ID} .ks-hero .semantic-line{display:block!important;font:inherit!important;color:inherit!important;text-align:center!important;white-space:nowrap!important}
      #${ID} .ks-hero .mobile-split{display:inline!important;font:inherit!important;color:inherit!important;white-space:nowrap!important}
      #${ID} .ornament{margin:0 auto 28px!important}
      #${ID} .ornament:before,#${ID} .ornament:after{width:44px!important;height:2px!important;background:var(--g)!important}
      #${ID} .ornament i{width:6px!important;height:6px!important;background:var(--g)!important}

      #${ID} .ks-question{margin:0 auto 16px!important;color:var(--n)!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(26px,2.8vw,32px)!important;font-weight:900!important;line-height:1.42!important;letter-spacing:.003em!important;text-align:center!important}
      #${ID} .question-line{display:inline!important}
      #${ID} .ks-resolution{margin:0 auto 30px!important;color:var(--n)!important;font-size:clamp(16px,1.7vw,19px)!important;font-weight:800!important;line-height:1.62!important;text-align:center!important;white-space:nowrap!important}
      #${ID} .resolution-line{display:inline!important}
      #${ID} .ks-resolution strong{display:inline!important;color:#d29a10!important;font-family:"Noto Serif JP",serif!important;font-size:1.66em!important;font-weight:900!important;line-height:1!important}

      #${ID} .ks-copy{margin:0 auto!important;color:var(--t)!important;font-size:clamp(14px,1.5vw,17px)!important;font-weight:700!important;line-height:1.72!important;text-align:center!important}
      #${ID} .ks-copy .semantic-line{display:block!important;font-size:inherit!important;line-height:inherit!important;text-align:center!important;white-space:nowrap!important}
      #${ID} .phrase{display:inline!important}
      #${ID} .ks-copy.ks-support-block{margin-bottom:30px!important}

      #${ID} .ks-planner{display:block!important;margin:0 auto 38px!important;color:var(--t)!important;text-align:center!important}
      #${ID} .planner-lead{display:block!important;margin:0!important;font-size:clamp(14px,1.5vw,16.5px)!important;font-weight:700!important;line-height:1.65!important;white-space:nowrap!important}
      #${ID} .planner-emphasis{display:block!important;margin:18px auto 0!important;color:var(--n)!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(31px,3.45vw,39px)!important;font-weight:900!important;line-height:1.26!important;letter-spacing:.002em!important;white-space:nowrap!important}

      #${ID} .divider{height:1px!important;width:100%!important;margin:34px 0!important;background:linear-gradient(90deg,transparent,#dfd2b6 7%,#dfd2b6 93%,transparent)!important}
      #${ID} .section-title{margin:0 auto 26px!important;color:var(--n)!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(23px,2.6vw,29px)!important;font-weight:900!important;line-height:1.35!important;letter-spacing:.002em!important;white-space:nowrap!important}
      #${ID} .section-title strong{display:inline!important;color:#d39a10!important;font-size:1.3em!important;font-weight:900!important}

      #${ID} .promises{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:16px!important}
      #${ID} .promise{min-height:205px!important;padding:20px 18px!important;border:1px solid #d8dfe6!important;border-radius:16px!important;background:linear-gradient(180deg,#fff,#fffefd)!important;box-shadow:0 9px 22px rgba(27,53,82,.055),inset 0 1px 0 rgba(255,255,255,.92)!important}
      #${ID} .promise:before{width:5px!important}
      #${ID} .promise-head{display:flex!important;align-items:center!important;gap:13px!important;margin-bottom:13px!important}
      #${ID} .icon{width:54px!important;height:54px!important;flex:0 0 54px!important;border-width:1.7px!important;background:#fff!important}
      #${ID} .icon svg{width:29px!important;height:29px!important}
      #${ID} .promise h3{margin:0!important;color:var(--n)!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(17px,1.7vw,20px)!important;font-weight:900!important;line-height:1.48!important;letter-spacing:.001em!important}
      #${ID} .promise p{margin:0!important;color:#2f4b68!important;font-size:clamp(12.5px,1.17vw,14px)!important;font-weight:600!important;line-height:1.7!important}

      #${ID} .proofs{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:13px!important}
      #${ID} .proof{position:relative!important;min-height:110px!important;padding:14px 12px!important;border:1.5px solid #dfc67d!important;border-radius:14px!important;background:linear-gradient(180deg,#fffefb,#fff8e8)!important;box-shadow:inset 0 0 0 1px rgba(255,255,255,.78),0 6px 14px rgba(99,73,20,.045)!important;overflow:hidden!important}
      #${ID} .proof:before,#${ID} .proof:after{content:"❧"!important;position:absolute!important;top:50%!important;color:#cfa744!important;font-size:34px!important;line-height:1!important;opacity:.88!important}
      #${ID} .proof:before{left:8px!important;transform:translateY(-50%) rotate(-18deg)!important}
      #${ID} .proof:after{right:8px!important;transform:translateY(-50%) scaleX(-1) rotate(-18deg)!important}
      #${ID} .proof strong{position:relative!important;z-index:1!important;display:block!important;color:#0c4b8a!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(30px,3.5vw,41px)!important;font-weight:900!important;line-height:1.08!important;white-space:nowrap!important}
      #${ID} .proof span{position:relative!important;z-index:1!important;display:block!important;margin-top:7px!important;color:#6f5520!important;font-size:clamp(10px,1vw,12px)!important;font-weight:800!important;line-height:1.3!important}
      #${ID} .note{margin:10px 4px 0 auto!important;color:#6e7b8b!important;font-size:clamp(9.5px,.9vw,11px)!important;text-align:right!important}

      #${ID} .cta-strip{display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;align-items:center!important;gap:18px!important;margin-top:26px!important;padding:18px 22px!important;border:1.5px solid #ecadc0!important;border-radius:14px!important;background:linear-gradient(135deg,#fff6f9,#fff)!important;box-shadow:0 7px 18px rgba(220,53,104,.045),inset 0 1px 0 rgba(255,255,255,.92)!important;text-align:left!important}
      #${ID} .cta-copy{display:flex!important;align-items:center!important;gap:14px!important}
      #${ID} .cta-badge{width:56px!important;height:56px!important;flex:0 0 56px!important}
      #${ID} .cta-copy strong{display:block!important;color:var(--n)!important;font-size:clamp(15px,1.5vw,18px)!important;font-weight:900!important;line-height:1.38!important}
      #${ID} .cta-copy span{display:block!important;margin-top:4px!important;color:#53677e!important;font-size:clamp(10.5px,1vw,12.5px)!important;line-height:1.45!important}
      #${ID} .cta{min-height:56px!important;padding:12px 26px!important;border-radius:10px!important;background:linear-gradient(135deg,#ed3d75,#df3269)!important;font-size:clamp(13px,1.2vw,15px)!important;font-weight:900!important;white-space:nowrap!important;box-shadow:0 8px 18px rgba(222,53,104,.13)!important}

      @media (min-width:680px) and (max-width:834px){
        #${ID} .ks-panel{padding:31px 22px 29px!important}
        #${ID} .ks-categories{gap:14px!important;margin-bottom:38px!important}
        #${ID} .ks-category{min-height:84px!important;font-size:clamp(28px,4.2vw,33px)!important;gap:9px!important;padding-inline:8px!important}
        #${ID} .ks-category svg{width:clamp(33px,4.7vw,39px)!important;height:clamp(33px,4.7vw,39px)!important;flex-basis:clamp(33px,4.7vw,39px)!important}
        #${ID} .ks-hero{font-size:clamp(36px,5.45vw,45px)!important}
        #${ID} .ks-question{font-size:28px!important}
        #${ID} .ks-resolution{font-size:17px!important}
        #${ID} .ks-copy{font-size:15px!important}
        #${ID} .planner-emphasis{font-size:31px!important}
        #${ID} .section-title{font-size:25px!important}
        #${ID} .promise{min-height:202px!important;padding:18px 15px!important}
        #${ID} .icon{width:50px!important;height:50px!important;flex-basis:50px!important}
        #${ID} .promise h3{font-size:17px!important}
        #${ID} .promise p{font-size:12.5px!important}
        #${ID} .proof strong{font-size:32px!important}
      }

      @media (max-width:679px){
        #${ID}{padding:8px 5px 22px!important}
        #${ID} .ks-panel{padding:24px 13px!important;border-radius:18px!important}
        #${ID} .ks-categories{grid-template-columns:1fr!important;gap:10px!important;width:min(100%,540px)!important;margin-bottom:30px!important}
        #${ID} .ks-category{min-height:68px!important;padding:8px 10px!important;font-size:clamp(24px,6vw,30px)!important;gap:10px!important}
        #${ID} .ks-category svg{width:clamp(29px,7vw,36px)!important;height:clamp(29px,7vw,36px)!important;flex-basis:clamp(29px,7vw,36px)!important}
        #${ID} .ks-hero{font-size:clamp(28px,6.2vw,36px)!important;line-height:1.34!important}
        #${ID} .ks-hero .semantic-line{white-space:normal!important}
        #${ID} .ks-hero .mobile-split{display:block!important;margin-top:2px!important}
        #${ID} .ks-question{font-size:clamp(21px,4.8vw,25px)!important}
        #${ID} .question-line{display:block!important}
        #${ID} .ks-resolution{font-size:clamp(13.5px,3.2vw,15px)!important;white-space:normal!important}
        #${ID} .resolution-line{display:block!important}
        #${ID} .ks-copy{font-size:clamp(12px,2.8vw,13.5px)!important}
        #${ID} .ks-copy .semantic-line{white-space:normal!important}
        #${ID} .phrase{display:block!important}
        #${ID} .planner-lead{font-size:clamp(12px,2.8vw,13.5px)!important;white-space:normal!important}
        #${ID} .planner-emphasis{font-size:clamp(23px,5.6vw,28px)!important;white-space:normal!important;margin-top:16px!important}
        #${ID} .section-title{font-size:clamp(20px,4.8vw,23px)!important;white-space:normal!important}
        #${ID} .promises{grid-template-columns:1fr!important;gap:11px!important}
        #${ID} .promise{min-height:0!important;padding:17px 16px!important}
        #${ID} .promise h3{font-size:18px!important}
        #${ID} .promise p{font-size:13.5px!important}
        #${ID} .proofs{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:9px!important}
        #${ID} .proof{min-height:98px!important}
        #${ID} .proof strong{font-size:clamp(27px,6.8vw,32px)!important}
        #${ID} .proof:before,#${ID} .proof:after{font-size:26px!important}
        #${ID} .note{text-align:center!important;margin-inline:auto!important}
        #${ID} .cta-strip{grid-template-columns:1fr!important;gap:13px!important;padding:15px!important;text-align:center!important}
        #${ID} .cta-copy{justify-content:center!important;text-align:left!important}
        #${ID} .cta{width:100%!important;white-space:normal!important}
      }

      @media (max-width:390px){
        #${ID} .ks-panel{padding-inline:10px!important}
        #${ID} .ks-category{font-size:24px!important}
        #${ID} .ks-hero{font-size:27px!important}
        #${ID} .ks-question{font-size:20px!important}
        #${ID} .ks-copy{font-size:12px!important}
        #${ID} .planner-emphasis{font-size:23px!important}
        #${ID} .proof strong{font-size:27px!important}
      }
    `;
    document.head.appendChild(s);
  }

  function copy(){
    const sec=document.getElementById(ID); if(!sec) return;
    const hero=sec.querySelector('.ks-hero');
    if(hero && hero.dataset.ref!==VERSION){
      hero.innerHTML='<span class="semantic-line">英検・受験・不登校まで、</span><span class="semantic-line">1人のプロが一貫して<span class="mobile-split">伴走します。</span></span>';
      hero.dataset.ref=VERSION;
    }
    const q=sec.querySelector('.ks-question');
    if(q && q.dataset.ref!==VERSION){q.innerHTML='<span class="question-line">「うちの子に合う先生が</span><span class="question-line">見つからない」</span>';q.dataset.ref=VERSION}
    const r=sec.querySelector('.ks-resolution');
    if(r && r.dataset.ref!==VERSION){r.innerHTML='<span class="resolution-line">そんなお悩みを、</span><span class="resolution-line"><strong>20年</strong>の経験で解決します。</span>';r.dataset.ref=VERSION}
    const copies=sec.querySelectorAll('.ks-copy');
    if(copies[0]){copies[0].classList.add('ks-support-block');copies[0].innerHTML='<span class="semantic-line"><span class="phrase">学校に通えている子も、</span><span class="phrase">通えていない子も、</span></span><span class="semantic-line"><span class="phrase">お子様に最適な指導で</span><span class="phrase">英検・受験などに一貫対応。</span></span>'}
    const planner=sec.querySelector('.ks-planner');
    if(planner && planner.dataset.ref!==VERSION){planner.innerHTML='<span class="planner-lead">進路指導や学習習慣の定着まで見据えた</span><span class="planner-emphasis">お子様だけの学習プランナー。</span>';planner.dataset.ref=VERSION}
    const h=sec.querySelectorAll('.promise h3');
    const exact=['お子様に合わせた<br>オーダーメイド指導','相談から授業まで<br>同じプロが担当','英検・受験・進路まで<br>長期的に伴走'];
    h.forEach((el,i)=>{if(exact[i]&&el.dataset.ref!==VERSION){el.innerHTML=exact[i];el.dataset.ref=VERSION}})
  }
  function apply(){style();copy()}
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',apply,{once:true}):apply();
  window.addEventListener('load',apply,{once:true});
  [120,350,900,1800,3200].forEach(ms=>setTimeout(apply,ms));
  const root=document.getElementById('root')||document.body;
  if(root)new MutationObserver(()=>requestAnimationFrame(apply)).observe(root,{childList:true,subtree:true});
})();