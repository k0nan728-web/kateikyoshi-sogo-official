(() => {
  'use strict';
  const SECTION_ID='ks-premium-intro-v6';
  const STYLE_ID='ks-section1-approved-reference-v3';

  function ensureStyle(){
    document.querySelectorAll('#ks-section1-visual-match-v1,#ks-section1-visual-match-v2,#ks-section1-approved-reference-v3').forEach(el=>{
      if(el.id!==STYLE_ID) el.remove();
    });
    if(document.getElementById(STYLE_ID)) return;

    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      /* Approved mockup is the specification: preserve hierarchy, spacing and semantic breaks. */
      #${SECTION_ID}{
        --ref-navy:#082f59;
        --ref-gold:#d7a21f;
        --ref-rose:#e73b72;
        --ref-blue:#2f73c8;
        --ref-green:#35a36b;
        --ref-text:#173e67;
        padding:clamp(10px,1.5vw,18px) clamp(8px,1.4vw,16px) clamp(24px,2.8vw,34px)!important;
        background:#f5f7fa!important;
      }
      #${SECTION_ID} .ks-panel{
        width:min(100%,1220px)!important;
        margin:0 auto!important;
        padding:clamp(30px,4vw,48px) clamp(22px,4vw,46px) clamp(28px,3vw,38px)!important;
        border:0!important;
        border-radius:0!important;
        background:linear-gradient(135deg,#fff 0%,#fffefb 68%,#fff9ee 100%)!important;
        box-shadow:none!important;
        text-align:center!important;
      }
      #${SECTION_ID} .ks-panel:after{opacity:.72!important}

      #${SECTION_ID} .ks-categories{
        width:min(100%,960px)!important;
        display:grid!important;
        grid-template-columns:repeat(2,minmax(0,1fr))!important;
        gap:clamp(14px,2vw,20px)!important;
        margin:0 auto clamp(34px,4.2vw,48px)!important;
      }
      #${SECTION_ID} .ks-category{
        min-height:clamp(76px,8.6vw,96px)!important;
        padding:12px 18px!important;
        gap:clamp(12px,1.4vw,16px)!important;
        border-radius:14px!important;
        background:#fff!important;
        font-family:"Noto Serif JP",serif!important;
        font-size:clamp(25px,3vw,34px)!important;
        font-weight:900!important;
        line-height:1.18!important;
        letter-spacing:.004em!important;
        box-shadow:0 2px 8px rgba(20,49,80,.025)!important;
        white-space:nowrap!important;
      }
      #${SECTION_ID} .ks-category svg{
        width:clamp(32px,3.6vw,42px)!important;
        height:clamp(32px,3.6vw,42px)!important;
        flex-basis:clamp(32px,3.6vw,42px)!important;
        stroke-width:1.75!important;
      }
      #${SECTION_ID} .ks-category.rose{border:1.8px solid #eb5b86!important;color:#dd3568!important}
      #${SECTION_ID} .ks-category.blue{border:1.8px solid #5796db!important;color:#2b70bd!important}

      #${SECTION_ID} .ks-hero,
      #${SECTION_ID} .ks-hero .semantic-line,
      #${SECTION_ID} .ks-hero .mobile-split{
        color:var(--ref-navy)!important;
        font-family:"Noto Serif JP",serif!important;
        font-size:inherit!important;
        font-weight:900!important;
        line-height:1.28!important;
        letter-spacing:.001em!important;
      }
      #${SECTION_ID} .ks-hero{
        max-width:1100px!important;
        margin:0 auto clamp(15px,1.8vw,20px)!important;
        font-size:clamp(42px,5.2vw,59px)!important;
      }
      #${SECTION_ID} .ks-hero .semantic-line{display:block!important;white-space:nowrap!important;text-align:center!important}
      #${SECTION_ID} .ks-hero .mobile-split{display:inline!important}
      #${SECTION_ID} .ornament{margin:0 auto clamp(22px,2.8vw,30px)!important}
      #${SECTION_ID} .ornament:before,#${SECTION_ID} .ornament:after{width:44px!important;height:2px!important;background:var(--ref-gold)!important}
      #${SECTION_ID} .ornament i{width:6px!important;height:6px!important;background:var(--ref-gold)!important}

      #${SECTION_ID} .ks-question{
        margin:0 auto clamp(14px,1.7vw,18px)!important;
        color:var(--ref-navy)!important;
        font-family:"Noto Serif JP",serif!important;
        font-size:clamp(25px,2.9vw,32px)!important;
        font-weight:900!important;
        line-height:1.42!important;
        letter-spacing:.005em!important;
      }
      #${SECTION_ID} .ks-resolution{
        margin:0 auto clamp(24px,3vw,32px)!important;
        color:var(--ref-navy)!important;
        font-size:clamp(16px,1.75vw,19px)!important;
        font-weight:800!important;
        line-height:1.65!important;
        white-space:nowrap!important;
      }
      #${SECTION_ID} .ks-resolution strong{
        display:inline!important;
        color:#d29a10!important;
        font-family:"Noto Serif JP",serif!important;
        font-size:1.65em!important;
        font-weight:900!important;
        line-height:1!important;
      }
      #${SECTION_ID} .ks-copy{
        margin:0 auto!important;
        color:var(--ref-text)!important;
        font-size:clamp(14px,1.55vw,17px)!important;
        font-weight:700!important;
        line-height:1.72!important;
      }
      #${SECTION_ID} .ks-copy .semantic-line{display:block!important;font-size:inherit!important;line-height:inherit!important;text-align:center!important;white-space:nowrap!important}
      #${SECTION_ID} .ks-copy.ks-support-block{margin-top:0!important;margin-bottom:clamp(20px,2.5vw,28px)!important}
      #${SECTION_ID} .ks-planner{
        margin:0 auto clamp(28px,3.4vw,38px)!important;
        color:var(--ref-text)!important;
        text-align:center!important;
      }
      #${SECTION_ID} .planner-lead{
        display:block!important;
        font-size:clamp(14px,1.5vw,16.5px)!important;
        font-weight:700!important;
        line-height:1.65!important;
      }
      #${SECTION_ID} .planner-emphasis{
        display:block!important;
        margin-top:clamp(9px,1.25vw,14px)!important;
        color:var(--ref-navy)!important;
        font-family:"Noto Serif JP",serif!important;
        font-size:clamp(29px,3.5vw,38px)!important;
        font-weight:900!important;
        line-height:1.28!important;
        letter-spacing:.003em!important;
      }

      #${SECTION_ID} .divider{
        height:1px!important;
        width:100%!important;
        margin:clamp(24px,3vw,34px) 0!important;
        background:linear-gradient(90deg,transparent,#e7ddc8 7%,#e7ddc8 93%,transparent)!important;
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
      #${SECTION_ID} .section-title strong{display:inline!important;color:#d39a10!important;font-size:1.28em!important;font-weight:900!important}

      #${SECTION_ID} .promises{
        display:grid!important;
        grid-template-columns:repeat(3,minmax(0,1fr))!important;
        gap:clamp(12px,1.7vw,18px)!important;
      }
      #${SECTION_ID} .promise{
        min-height:clamp(186px,18vw,218px)!important;
        padding:clamp(18px,2vw,23px) clamp(16px,1.8vw,21px)!important;
        border:1px solid #dde3e8!important;
        border-radius:15px!important;
        background:#fff!important;
        box-shadow:0 4px 12px rgba(29,56,84,.035)!important;
      }
      #${SECTION_ID} .promise:before{width:4px!important}
      #${SECTION_ID} .promise-head{display:flex!important;align-items:center!important;gap:clamp(11px,1.4vw,15px)!important;margin-bottom:clamp(11px,1.25vw,14px)!important}
      #${SECTION_ID} .icon{
        width:clamp(48px,5vw,58px)!important;
        height:clamp(48px,5vw,58px)!important;
        flex-basis:clamp(48px,5vw,58px)!important;
        border-width:1.6px!important;
      }
      #${SECTION_ID} .icon svg{width:clamp(26px,2.8vw,31px)!important;height:clamp(26px,2.8vw,31px)!important}
      #${SECTION_ID} .promise h3,
      #${SECTION_ID} .promise h3 .semantic-line{
        margin:0!important;
        color:var(--ref-navy)!important;
        font-family:"Noto Serif JP",serif!important;
        font-size:clamp(17px,1.75vw,20px)!important;
        font-weight:900!important;
        line-height:1.48!important;
        letter-spacing:.002em!important;
      }
      #${SECTION_ID} .promise p{
        margin:0!important;
        color:#2f4b68!important;
        font-size:clamp(12.5px,1.2vw,14px)!important;
        font-weight:600!important;
        line-height:1.68!important;
      }

      #${SECTION_ID} .proofs{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:clamp(10px,1.35vw,14px)!important}
      #${SECTION_ID} .proof{
        position:relative!important;
        min-height:clamp(94px,9.5vw,112px)!important;
        padding:14px clamp(8px,1vw,12px)!important;
        border:1px solid #ead9ae!important;
        border-radius:13px!important;
        background:linear-gradient(180deg,#fffefb,#fff9ed)!important;
        box-shadow:none!important;
        overflow:hidden!important;
      }
      #${SECTION_ID} .proof:before,#${SECTION_ID} .proof:after{
        content:"❧"!important;
        position:absolute!important;
        top:50%!important;
        transform:translateY(-50%)!important;
        color:#d2aa4a!important;
        font-size:clamp(28px,3vw,36px)!important;
        line-height:1!important;
        opacity:.82!important;
      }
      #${SECTION_ID} .proof:before{left:8px!important;transform:translateY(-50%) rotate(-18deg)!important}
      #${SECTION_ID} .proof:after{right:8px!important;transform:translateY(-50%) scaleX(-1) rotate(-18deg)!important}
      #${SECTION_ID} .proof strong{
        position:relative!important;z-index:1!important;
        display:block!important;
        color:#0c4b8a!important;
        font-family:"Noto Serif JP",serif!important;
        font-size:clamp(30px,3.6vw,40px)!important;
        font-weight:900!important;
        line-height:1.08!important;
        white-space:nowrap!important;
      }
      #${SECTION_ID} .proof span{
        position:relative!important;z-index:1!important;
        display:block!important;
        margin-top:7px!important;
        color:#6f5520!important;
        font-size:clamp(10px,1vw,12px)!important;
        font-weight:800!important;
        line-height:1.3!important;
      }
      #${SECTION_ID} .note{margin:10px 4px 0 auto!important;color:#6e7b8b!important;font-size:clamp(9.5px,.9vw,11px)!important;text-align:right!important}

      #${SECTION_ID} .cta-strip{
        display:grid!important;
        grid-template-columns:minmax(0,1fr) auto!important;
        align-items:center!important;
        gap:clamp(14px,2vw,22px)!important;
        margin-top:clamp(20px,2.5vw,28px)!important;
        padding:clamp(15px,1.8vw,19px) clamp(18px,2vw,24px)!important;
        border:1px solid #efbac9!important;
        border-radius:13px!important;
        background:linear-gradient(135deg,#fff7fa,#fff)!important;
        text-align:left!important;
      }
      #${SECTION_ID} .cta-copy{display:flex!important;align-items:center!important;gap:clamp(12px,1.5vw,16px)!important}
      #${SECTION_ID} .cta-badge{width:clamp(48px,5vw,58px)!important;height:clamp(48px,5vw,58px)!important;flex-basis:clamp(48px,5vw,58px)!important}
      #${SECTION_ID} .cta-copy strong{display:block!important;color:var(--ref-navy)!important;font-size:clamp(15px,1.55vw,18px)!important;font-weight:900!important;line-height:1.38!important}
      #${SECTION_ID} .cta-copy span{display:block!important;margin-top:4px!important;color:#53677e!important;font-size:clamp(10.5px,1.05vw,12.5px)!important;line-height:1.45!important}
      #${SECTION_ID} .cta{
        min-height:clamp(50px,5vw,58px)!important;
        padding:12px clamp(22px,2.4vw,30px)!important;
        border-radius:10px!important;
        background:linear-gradient(135deg,#ed3d75,#df3269)!important;
        font-size:clamp(13px,1.25vw,15px)!important;
        font-weight:900!important;
        white-space:nowrap!important;
        box-shadow:none!important;
      }

      /* Tablet portrait: same approved composition, not a shrunken desktop. */
      @media(min-width:601px) and (max-width:834px){
        #${SECTION_ID} .ks-panel{padding:30px 24px 28px!important}
        #${SECTION_ID} .ks-category{min-height:80px!important;font-size:29px!important}
        #${SECTION_ID} .ks-category svg{width:34px!important;height:34px!important;flex-basis:34px!important}
        #${SECTION_ID} .ks-hero{font-size:46px!important;line-height:1.27!important}
        #${SECTION_ID} .ks-question{font-size:29px!important}
        #${SECTION_ID} .ks-resolution{font-size:17px!important}
        #${SECTION_ID} .ks-copy{font-size:15px!important}
        #${SECTION_ID} .planner-lead{font-size:15px!important}
        #${SECTION_ID} .planner-emphasis{font-size:31px!important}
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

      /* Large phones: preserve the hierarchy and semantic line breaks. */
      @media(min-width:431px) and (max-width:600px){
        #${SECTION_ID}{padding-inline:5px!important}
        #${SECTION_ID} .ks-panel{padding:24px 14px!important}
        #${SECTION_ID} .ks-categories{gap:8px!important;margin-bottom:28px!important}
        #${SECTION_ID} .ks-category{min-height:64px!important;padding:9px 8px!important;font-size:18px!important;gap:7px!important}
        #${SECTION_ID} .ks-category svg{width:24px!important;height:24px!important;flex-basis:24px!important}
        #${SECTION_ID} .ks-hero{font-size:34px!important;line-height:1.34!important}
        #${SECTION_ID} .ks-question{font-size:23px!important}
        #${SECTION_ID} .ks-resolution{font-size:14px!important}
        #${SECTION_ID} .ks-copy{font-size:12.5px!important}
        #${SECTION_ID} .planner-lead{font-size:12.5px!important}
        #${SECTION_ID} .planner-emphasis{font-size:25px!important}
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

      /* Small phones: only layout changes needed to protect the approved typography. */
      @media(max-width:430px){
        #${SECTION_ID}{padding:7px 4px 20px!important}
        #${SECTION_ID} .ks-panel{padding:22px 10px 22px!important}
        #${SECTION_ID} .ks-categories{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:7px!important;margin-bottom:26px!important}
        #${SECTION_ID} .ks-category{min-height:60px!important;padding:7px 5px!important;font-size:15.5px!important;gap:5px!important;letter-spacing:0!important}
        #${SECTION_ID} .ks-category svg{width:21px!important;height:21px!important;flex-basis:21px!important}
        #${SECTION_ID} .ks-hero{font-size:29px!important;line-height:1.38!important}
        #${SECTION_ID} .ks-hero .semantic-line{white-space:normal!important}
        #${SECTION_ID} .ks-question{font-size:21px!important;line-height:1.45!important}
        #${SECTION_ID} .ks-resolution{font-size:13px!important;white-space:normal!important}
        #${SECTION_ID} .ks-copy{font-size:12px!important;line-height:1.76!important}
        #${SECTION_ID} .ks-copy .semantic-line{white-space:normal!important}
        #${SECTION_ID} .planner-lead{font-size:12px!important}
        #${SECTION_ID} .planner-emphasis{font-size:22px!important}
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

    const resolution=section.querySelector('.ks-resolution');
    if(resolution && resolution.dataset.approvedReference!=='3'){
      resolution.innerHTML='そんなお悩みを、<strong>20年</strong>の経験で解決します。';
      resolution.dataset.approvedReference='3';
    }

    const copies=section.querySelectorAll('.ks-copy');
    if(copies[0]) copies[0].classList.add('ks-support-block');

    const planner=section.querySelector('.ks-planner');
    if(planner && planner.dataset.approvedReference!=='3'){
      planner.innerHTML='<span class="planner-lead">進路指導や学習習慣の定着まで見据えた</span><span class="planner-emphasis">お子様だけの学習プランナー。</span>';
      planner.dataset.approvedReference='3';
    }

    const promiseHeads=section.querySelectorAll('.promise h3');
    const exact=[
      'お子様に合わせた<br>オーダーメイド指導',
      '相談から授業まで<br>同じプロが担当',
      '英検・受験・進路まで<br>長期的に伴走'
    ];
    promiseHeads.forEach((h,i)=>{if(exact[i] && h.dataset.approvedReference!=='3'){h.innerHTML=exact[i];h.dataset.approvedReference='3';}});
  }

  function apply(){ensureStyle();normalizeCopy()}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true}); else apply();
  window.addEventListener('load',apply,{once:true});
  [100,350,900,1800,3200].forEach(ms=>setTimeout(apply,ms));
  const root=document.getElementById('root')||document.body;
  if(root) new MutationObserver(()=>requestAnimationFrame(apply)).observe(root,{childList:true,subtree:true});
})();