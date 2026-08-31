(() => {
  'use strict';
  const SECTION_ID='ks-premium-intro-v6';
  const STYLE_ID='ks-section1-approved-reference-v4';
  const VERSION='4';

  function ensureStyle(){
    document.querySelectorAll('#ks-section1-visual-match-v1,#ks-section1-visual-match-v2,#ks-section1-approved-reference-v3,#ks-section1-approved-reference-v4').forEach(el=>{
      if(el.id!==STYLE_ID) el.remove();
    });
    if(document.getElementById(STYLE_ID)) return;

    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      /* The approved mockup is the implementation specification. */
      #${SECTION_ID}{
        --ref-navy:#082f59;
        --ref-gold:#d7a21f;
        --ref-rose:#e73b72;
        --ref-blue:#2f73c8;
        --ref-green:#35a36b;
        --ref-text:#173e67;
        width:100%!important;
        padding:clamp(10px,1.5vw,18px) clamp(7px,1.2vw,14px) clamp(24px,2.8vw,34px)!important;
        background:linear-gradient(180deg,#f4f7fb 0%,#eef3f8 100%)!important;
      }
      #${SECTION_ID},#${SECTION_ID} *{box-sizing:border-box!important;min-width:0!important}
      #${SECTION_ID} .ks-panel{
        position:relative!important;
        width:min(100%,1220px)!important;
        margin:0 auto!important;
        padding:clamp(34px,4.2vw,50px) clamp(22px,4vw,48px) clamp(30px,3.2vw,40px)!important;
        border:1px solid rgba(205,183,130,.38)!important;
        border-radius:clamp(18px,2vw,24px)!important;
        background:linear-gradient(135deg,#fff 0%,#fffefb 68%,#fff9ee 100%)!important;
        box-shadow:0 14px 34px rgba(20,47,78,.075),inset 0 1px 0 rgba(255,255,255,.95)!important;
        overflow:hidden!important;
        text-align:center!important;
      }
      #${SECTION_ID} .ks-panel:after{opacity:.62!important}

      /* Category cards: use as much of the frame as possible, as in the approved image. */
      #${SECTION_ID} .ks-categories{
        width:min(100%,980px)!important;
        display:grid!important;
        grid-template-columns:repeat(2,minmax(0,1fr))!important;
        gap:clamp(14px,2vw,20px)!important;
        margin:0 auto clamp(36px,4.2vw,50px)!important;
      }
      #${SECTION_ID} .ks-category{
        display:flex!important;
        align-items:center!important;
        justify-content:center!important;
        min-height:clamp(82px,9vw,102px)!important;
        padding:12px 14px!important;
        gap:clamp(9px,1.2vw,14px)!important;
        border-radius:15px!important;
        background:linear-gradient(180deg,#fff,#fffefd)!important;
        font-family:"Noto Serif JP",serif!important;
        font-size:clamp(30px,4vw,38px)!important;
        font-weight:900!important;
        line-height:1.12!important;
        letter-spacing:.002em!important;
        white-space:nowrap!important;
        box-shadow:0 7px 18px rgba(27,53,82,.045),inset 0 0 0 1px rgba(255,255,255,.75)!important;
      }
      #${SECTION_ID} .ks-category svg{
        width:clamp(35px,4.1vw,46px)!important;
        height:clamp(35px,4.1vw,46px)!important;
        flex:0 0 clamp(35px,4.1vw,46px)!important;
        stroke-width:1.75!important;
      }
      #${SECTION_ID} .ks-category.rose{border:2px solid #e85884!important;color:#dc3568!important;box-shadow:0 8px 20px rgba(223,51,104,.055),inset 0 0 0 1px rgba(255,255,255,.8)!important}
      #${SECTION_ID} .ks-category.blue{border:2px solid #4f91da!important;color:#286fc0!important;box-shadow:0 8px 20px rgba(47,115,200,.055),inset 0 0 0 1px rgba(255,255,255,.8)!important}

      /* Main copy hierarchy. Exact semantic lines are preserved. */
      #${SECTION_ID} .ks-hero{
        max-width:1120px!important;
        margin:0 auto clamp(15px,1.8vw,20px)!important;
        color:var(--ref-navy)!important;
        font-family:"Noto Serif JP",serif!important;
        font-size:clamp(42px,5.2vw,60px)!important;
        font-weight:900!important;
        line-height:1.27!important;
        letter-spacing:.001em!important;
        text-align:center!important;
      }
      #${SECTION_ID} .ks-hero .semantic-line{
        display:block!important;
        font:inherit!important;
        color:inherit!important;
        text-align:center!important;
        white-space:nowrap!important;
      }
      #${SECTION_ID} .ks-hero .mobile-split{display:inline!important;font:inherit!important;color:inherit!important;white-space:nowrap!important}
      #${SECTION_ID} .ornament{margin:0 auto clamp(24px,2.8vw,31px)!important}
      #${SECTION_ID} .ornament:before,#${SECTION_ID} .ornament:after{width:44px!important;height:2px!important;background:var(--ref-gold)!important}
      #${SECTION_ID} .ornament i{width:6px!important;height:6px!important;background:var(--ref-gold)!important}

      #${SECTION_ID} .ks-question{
        margin:0 auto clamp(14px,1.7vw,18px)!important;
        color:var(--ref-navy)!important;
        font-family:"Noto Serif JP",serif!important;
        font-size:clamp(25px,2.9vw,32px)!important;
        font-weight:900!important;
        line-height:1.42!important;
        letter-spacing:.004em!important;
        text-align:center!important;
      }
      #${SECTION_ID} .ks-resolution{
        margin:0 auto clamp(27px,3vw,34px)!important;
        color:var(--ref-navy)!important;
        font-size:clamp(16px,1.75vw,19px)!important;
        font-weight:800!important;
        line-height:1.62!important;
        white-space:nowrap!important;
        text-align:center!important;
      }
      #${SECTION_ID} .ks-resolution strong{
        display:inline!important;
        color:#d29a10!important;
        font-family:"Noto Serif JP",serif!important;
        font-size:1.66em!important;
        font-weight:900!important;
        line-height:1!important;
      }
      #${SECTION_ID} .ks-copy{
        margin:0 auto!important;
        color:var(--ref-text)!important;
        font-size:clamp(14px,1.55vw,17px)!important;
        font-weight:700!important;
        line-height:1.72!important;
        text-align:center!important;
      }
      #${SECTION_ID} .ks-copy .semantic-line{display:block!important;font-size:inherit!important;line-height:inherit!important;text-align:center!important;white-space:nowrap!important}
      #${SECTION_ID} .ks-copy.ks-support-block{margin:0 auto clamp(24px,2.8vw,31px)!important}

      /* Planner must be a separate paragraph block with a full visual line of breathing room. */
      #${SECTION_ID} .ks-planner{
        display:block!important;
        margin:0 auto clamp(31px,3.5vw,40px)!important;
        text-align:center!important;
        color:var(--ref-text)!important;
      }
      #${SECTION_ID} .planner-lead{
        display:block!important;
        margin:0!important;
        font-size:clamp(14px,1.5vw,16.5px)!important;
        font-weight:700!important;
        line-height:1.65!important;
        white-space:nowrap!important;
      }
      #${SECTION_ID} .planner-emphasis{
        display:block!important;
        margin:clamp(13px,1.6vw,18px) auto 0!important;
        color:var(--ref-navy)!important;
        font-family:"Noto Serif JP",serif!important;
        font-size:clamp(30px,3.55vw,39px)!important;
        font-weight:900!important;
        line-height:1.26!important;
        letter-spacing:.003em!important;
        white-space:nowrap!important;
      }

      #${SECTION_ID} .divider{
        height:1px!important;
        width:100%!important;
        margin:clamp(26px,3.2vw,36px) 0!important;
        background:linear-gradient(90deg,transparent,#dfd2b6 7%,#dfd2b6 93%,transparent)!important;
      }
      #${SECTION_ID} .section-title{
        margin:0 auto clamp(22px,2.6vw,28px)!important;
        color:var(--ref-navy)!important;
        font-family:"Noto Serif JP",serif!important;
        font-size:clamp(23px,2.7vw,29px)!important;
        font-weight:900!important;
        line-height:1.35!important;
        letter-spacing:.003em!important;
        white-space:nowrap!important;
      }
      #${SECTION_ID} .section-title strong{display:inline!important;color:#d39a10!important;font-size:1.3em!important;font-weight:900!important}

      /* Premium framed promise cards. */
      #${SECTION_ID} .promises{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:clamp(12px,1.7vw,18px)!important}
      #${SECTION_ID} .promise{
        min-height:clamp(188px,18vw,220px)!important;
        padding:clamp(19px,2vw,23px) clamp(16px,1.8vw,21px)!important;
        border:1px solid #d8dfe6!important;
        border-radius:16px!important;
        background:linear-gradient(180deg,#fff,#fffefd)!important;
        box-shadow:0 8px 20px rgba(27,53,82,.055),inset 0 1px 0 rgba(255,255,255,.9)!important;
      }
      #${SECTION_ID} .promise:before{width:5px!important}
      #${SECTION_ID} .promise-head{display:flex!important;align-items:center!important;gap:clamp(11px,1.4vw,15px)!important;margin-bottom:clamp(11px,1.25vw,14px)!important}
      #${SECTION_ID} .icon{width:clamp(48px,5vw,58px)!important;height:clamp(48px,5vw,58px)!important;flex:0 0 clamp(48px,5vw,58px)!important;border-width:1.7px!important;background:#fff!important}
      #${SECTION_ID} .icon svg{width:clamp(26px,2.8vw,31px)!important;height:clamp(26px,2.8vw,31px)!important}
      #${SECTION_ID} .promise h3,#${SECTION_ID} .promise h3 .semantic-line{
        margin:0!important;color:var(--ref-navy)!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(17px,1.75vw,20px)!important;font-weight:900!important;line-height:1.48!important;letter-spacing:.002em!important
      }
      #${SECTION_ID} .promise p{margin:0!important;color:#2f4b68!important;font-size:clamp(12.5px,1.2vw,14px)!important;font-weight:600!important;line-height:1.68!important}

      /* Gold proof frames from the approved reference. */
      #${SECTION_ID} .proofs{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:clamp(10px,1.35vw,14px)!important}
      #${SECTION_ID} .proof{
        position:relative!important;
        min-height:clamp(98px,9.7vw,116px)!important;
        padding:14px clamp(9px,1vw,13px)!important;
        border:1.5px solid #dfc67d!important;
        border-radius:14px!important;
        background:linear-gradient(180deg,#fffefb 0%,#fff8e8 100%)!important;
        box-shadow:inset 0 0 0 1px rgba(255,255,255,.75),0 5px 12px rgba(99,73,20,.04)!important;
        overflow:hidden!important;
      }
      #${SECTION_ID} .proof:before,#${SECTION_ID} .proof:after{content:"❧"!important;position:absolute!important;top:50%!important;color:#cfa744!important;font-size:clamp(29px,3vw,37px)!important;line-height:1!important;opacity:.88!important}
      #${SECTION_ID} .proof:before{left:8px!important;transform:translateY(-50%) rotate(-18deg)!important}
      #${SECTION_ID} .proof:after{right:8px!important;transform:translateY(-50%) scaleX(-1) rotate(-18deg)!important}
      #${SECTION_ID} .proof strong{position:relative!important;z-index:1!important;display:block!important;color:#0c4b8a!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(30px,3.65vw,41px)!important;font-weight:900!important;line-height:1.08!important;white-space:nowrap!important}
      #${SECTION_ID} .proof span{position:relative!important;z-index:1!important;display:block!important;margin-top:7px!important;color:#6f5520!important;font-size:clamp(10px,1vw,12px)!important;font-weight:800!important;line-height:1.3!important}
      #${SECTION_ID} .note{margin:10px 4px 0 auto!important;color:#6e7b8b!important;font-size:clamp(9.5px,.9vw,11px)!important;text-align:right!important}

      #${SECTION_ID} .cta-strip{display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;align-items:center!important;gap:clamp(14px,2vw,22px)!important;margin-top:clamp(22px,2.6vw,29px)!important;padding:clamp(16px,1.8vw,20px) clamp(18px,2vw,24px)!important;border:1.5px solid #ecadc0!important;border-radius:14px!important;background:linear-gradient(135deg,#fff6f9,#fff)!important;box-shadow:0 6px 16px rgba(220,53,104,.04),inset 0 1px 0 rgba(255,255,255,.9)!important;text-align:left!important}
      #${SECTION_ID} .cta-copy{display:flex!important;align-items:center!important;gap:clamp(12px,1.5vw,16px)!important}
      #${SECTION_ID} .cta-badge{width:clamp(50px,5vw,60px)!important;height:clamp(50px,5vw,60px)!important;flex:0 0 clamp(50px,5vw,60px)!important}
      #${SECTION_ID} .cta-copy strong{display:block!important;color:var(--ref-navy)!important;font-size:clamp(15px,1.55vw,18px)!important;font-weight:900!important;line-height:1.38!important}
      #${SECTION_ID} .cta-copy span{display:block!important;margin-top:4px!important;color:#53677e!important;font-size:clamp(10.5px,1.05vw,12.5px)!important;line-height:1.45!important}
      #${SECTION_ID} .cta{min-height:clamp(52px,5vw,60px)!important;padding:12px clamp(22px,2.4vw,30px)!important;border-radius:10px!important;background:linear-gradient(135deg,#ed3d75,#df3269)!important;font-size:clamp(13px,1.25vw,15px)!important;font-weight:900!important;white-space:nowrap!important;box-shadow:0 7px 18px rgba(222,53,104,.13)!important}

      /* iPad mini / portrait tablets: approved reference scale. */
      @media(min-width:601px) and (max-width:834px){
        #${SECTION_ID} .ks-panel{padding:31px 22px 29px!important}
        #${SECTION_ID} .ks-categories{gap:14px!important;margin-bottom:38px!important}
        #${SECTION_ID} .ks-category{min-height:82px!important;font-size:31px!important;gap:9px!important;padding-inline:9px!important}
        #${SECTION_ID} .ks-category svg{width:37px!important;height:37px!important;flex-basis:37px!important}
        #${SECTION_ID} .ks-hero{font-size:clamp(32px,5.45vw,42px)!important;line-height:1.29!important}
        #${SECTION_ID} .ks-question{font-size:28px!important}
        #${SECTION_ID} .ks-resolution{font-size:17px!important}
        #${SECTION_ID} .ks-copy{font-size:15px!important}
        #${SECTION_ID} .planner-lead{font-size:15px!important}
        #${SECTION_ID} .planner-emphasis{font-size:31px!important;margin-top:15px!important}
        #${SECTION_ID} .section-title{font-size:25px!important}
        #${SECTION_ID} .promise{min-height:202px!important;padding:18px 15px!important}
        #${SECTION_ID} .icon{width:50px!important;height:50px!important;flex-basis:50px!important}
        #${SECTION_ID} .promise h3,#${SECTION_ID} .promise h3 .semantic-line{font-size:17px!important}
        #${SECTION_ID} .promise p{font-size:12.5px!important}
        #${SECTION_ID} .proof strong{font-size:32px!important}
        #${SECTION_ID} .proof span{font-size:10.5px!important}
        #${SECTION_ID} .cta-copy strong{font-size:16px!important}
        #${SECTION_ID} .cta-copy span{font-size:11px!important}
        #${SECTION_ID} .cta{font-size:13px!important}
      }

      /* Large phones: keep hierarchy, split only at meaningful phrase boundaries. */
      @media(min-width:431px) and (max-width:600px){
        #${SECTION_ID}{padding-inline:5px!important}
        #${SECTION_ID} .ks-panel{padding:25px 13px 24px!important}
        #${SECTION_ID} .ks-categories{gap:8px!important;margin-bottom:28px!important}
        #${SECTION_ID} .ks-category{min-height:66px!important;padding:8px 6px!important;font-size:22px!important;gap:6px!important}
        #${SECTION_ID} .ks-category svg{width:26px!important;height:26px!important;flex-basis:26px!important}
        #${SECTION_ID} .ks-hero{font-size:31px!important;line-height:1.34!important}
        #${SECTION_ID} .ks-hero .semantic-line{white-space:normal!important}
        #${SECTION_ID} .ks-hero .mobile-split{display:block!important;margin-top:1px!important}
        #${SECTION_ID} .ks-question{font-size:23px!important}
        #${SECTION_ID} .ks-resolution{font-size:14px!important;white-space:normal!important}
        #${SECTION_ID} .ks-copy{font-size:12.5px!important}
        #${SECTION_ID} .ks-copy .semantic-line{white-space:normal!important}
        #${SECTION_ID} .planner-lead{font-size:12.5px!important;white-space:normal!important}
        #${SECTION_ID} .planner-emphasis{font-size:25px!important;white-space:normal!important;margin-top:13px!important}
        #${SECTION_ID} .section-title{font-size:21px!important;white-space:normal!important}
        #${SECTION_ID} .promises{grid-template-columns:1fr!important;gap:12px!important}
        #${SECTION_ID} .promise{min-height:0!important;padding:17px 16px!important}
        #${SECTION_ID} .promise h3,#${SECTION_ID} .promise h3 .semantic-line{font-size:18px!important}
        #${SECTION_ID} .promise p{font-size:13.5px!important}
        #${SECTION_ID} .proofs{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:9px!important}
        #${SECTION_ID} .proof strong{font-size:31px!important}
        #${SECTION_ID} .note{text-align:center!important;margin-inline:auto!important}
        #${SECTION_ID} .cta-strip{grid-template-columns:1fr!important;gap:13px!important;text-align:center!important}
        #${SECTION_ID} .cta-copy{justify-content:center!important;text-align:left!important}
        #${SECTION_ID} .cta{width:100%!important}
      }

      /* Small phones: stack category cards before shrinking their text. */
      @media(max-width:430px){
        #${SECTION_ID}{padding:7px 4px 20px!important}
        #${SECTION_ID} .ks-panel{padding:22px 10px 22px!important}
        #${SECTION_ID} .ks-categories{grid-template-columns:1fr!important;gap:9px!important;margin-bottom:26px!important}
        #${SECTION_ID} .ks-category{min-height:62px!important;padding:8px 10px!important;font-size:24px!important;gap:9px!important;letter-spacing:0!important}
        #${SECTION_ID} .ks-category svg{width:29px!important;height:29px!important;flex-basis:29px!important}
        #${SECTION_ID} .ks-hero{font-size:28px!important;line-height:1.36!important}
        #${SECTION_ID} .ks-hero .semantic-line{white-space:normal!important}
        #${SECTION_ID} .ks-hero .mobile-split{display:block!important;margin-top:1px!important}
        #${SECTION_ID} .ks-question{font-size:21px!important;line-height:1.45!important}
        #${SECTION_ID} .ks-resolution{font-size:13px!important;white-space:normal!important}
        #${SECTION_ID} .ks-copy{font-size:12px!important;line-height:1.76!important}
        #${SECTION_ID} .ks-copy .semantic-line{white-space:normal!important}
        #${SECTION_ID} .planner-lead{font-size:12px!important;white-space:normal!important}
        #${SECTION_ID} .planner-emphasis{font-size:23px!important;white-space:normal!important;margin-top:12px!important}
        #${SECTION_ID} .section-title{font-size:20px!important;white-space:normal!important}
        #${SECTION_ID} .promises{grid-template-columns:1fr!important;gap:10px!important}
        #${SECTION_ID} .promise{min-height:0!important;padding:16px 14px 16px 17px!important}
        #${SECTION_ID} .promise-head{gap:10px!important}
        #${SECTION_ID} .icon{width:46px!important;height:46px!important;flex-basis:46px!important}
        #${SECTION_ID} .promise h3,#${SECTION_ID} .promise h3 .semantic-line{font-size:17px!important}
        #${SECTION_ID} .promise p{font-size:13px!important}
        #${SECTION_ID} .proofs{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important}
        #${SECTION_ID} .proof{min-height:94px!important}
        #${SECTION_ID} .proof:before,#${SECTION_ID} .proof:after{display:none!important}
        #${SECTION_ID} .proof strong{font-size:28px!important}
        #${SECTION_ID} .note{text-align:center!important;margin-inline:auto!important}
        #${SECTION_ID} .cta-strip{grid-template-columns:1fr!important;gap:12px!important;padding:14px!important;text-align:center!important}
        #${SECTION_ID} .cta-copy{justify-content:center!important;text-align:left!important}
        #${SECTION_ID} .cta{width:100%!important;white-space:normal!important}
      }
    `;
    document.head.appendChild(style);
  }

  function normalizeCopy(){
    const section=document.getElementById(SECTION_ID);
    if(!section) return;

    /* Never allow a final syllable such as "す。" to orphan by itself. */
    const hero=section.querySelector('.ks-hero');
    if(hero && hero.dataset.approvedReference!==VERSION){
      hero.innerHTML='<span class="semantic-line">英検・受験・不登校まで、</span><span class="semantic-line">1人のプロが一貫して<span class="mobile-split">伴走します。</span></span>';
      hero.dataset.approvedReference=VERSION;
    }

    const resolution=section.querySelector('.ks-resolution');
    if(resolution && resolution.dataset.approvedReference!==VERSION){
      resolution.innerHTML='そんなお悩みを、<strong>20年</strong>の経験で解決します。';
      resolution.dataset.approvedReference=VERSION;
    }

    const copies=section.querySelectorAll('.ks-copy');
    if(copies[0]){
      copies[0].classList.add('ks-support-block');
      copies[0].innerHTML='<span class="semantic-line">学校に通えている子も、通えていない子も、</span><span class="semantic-line">お子様に最適な指導で英検・受験などに一貫対応。</span>';
    }

    const planner=section.querySelector('.ks-planner');
    if(planner && planner.dataset.approvedReference!==VERSION){
      planner.innerHTML='<span class="planner-lead">進路指導や学習習慣の定着まで見据えた</span><span class="planner-emphasis">お子様だけの学習プランナー。</span>';
      planner.dataset.approvedReference=VERSION;
    }

    const promiseHeads=section.querySelectorAll('.promise h3');
    const exact=[
      'お子様に合わせた<br>オーダーメイド指導',
      '相談から授業まで<br>同じプロが担当',
      '英検・受験・進路まで<br>長期的に伴走'
    ];
    promiseHeads.forEach((h,i)=>{
      if(exact[i] && h.dataset.approvedReference!==VERSION){
        h.innerHTML=exact[i];
        h.dataset.approvedReference=VERSION;
      }
    });
  }

  function apply(){ensureStyle();normalizeCopy()}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true}); else apply();
  window.addEventListener('load',apply,{once:true});
  [100,350,900,1800,3200].forEach(ms=>setTimeout(apply,ms));
  const root=document.getElementById('root')||document.body;
  if(root) new MutationObserver(()=>requestAnimationFrame(apply)).observe(root,{childList:true,subtree:true});
})();