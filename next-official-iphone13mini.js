(() => {
  'use strict';
  const STYLE_ID='ks-next-official-iphone13mini-v1';
  const SECTION_ID='ks-premium-intro-v6';

  function apply(){
    let style=document.getElementById(STYLE_ID);
    if(!style){
      style=document.createElement('style');
      style.id=STYLE_ID;
      style.textContent=`
        @media (max-width:390px){
          #${SECTION_ID},#${SECTION_ID} *{box-sizing:border-box!important;min-width:0!important;max-width:100%!important}
          #${SECTION_ID}{width:100%!important;padding:8px 5px 18px!important;overflow-x:hidden!important}
          #${SECTION_ID} .ks-panel{width:100%!important;max-width:100%!important;padding:22px 11px 20px!important;margin:0 auto!important;overflow:hidden!important}
          #${SECTION_ID} .ks-categories{grid-template-columns:1fr!important;width:100%!important;gap:8px!important;margin:0 auto 24px!important}
          #${SECTION_ID} .ks-category{width:100%!important;min-height:54px!important;padding:8px 10px!important;font-size:18px!important;white-space:nowrap!important}
          #${SECTION_ID} .ks-hero{width:100%!important;margin:0 auto 18px!important;font-size:clamp(26px,7vw,29px)!important;line-height:1.48!important;letter-spacing:0!important;text-align:center!important}
          #${SECTION_ID} .ks-hero .semantic-line{display:block!important;width:100%!important;white-space:normal!important;text-wrap:balance!important}
          #${SECTION_ID} .ks-hero .mobile-split{display:block!important;white-space:nowrap!important}
          #${SECTION_ID} .ks-question{width:100%!important;font-size:clamp(18px,4.9vw,20px)!important;line-height:1.55!important;white-space:normal!important;text-wrap:balance!important}
          #${SECTION_ID} .ks-resolution,#${SECTION_ID} .ks-copy,#${SECTION_ID} .planner-lead,#${SECTION_ID} .planner-emphasis{width:100%!important;white-space:normal!important;word-break:normal!important;overflow-wrap:normal!important;line-break:strict!important}
          #${SECTION_ID} .ks-copy .semantic-line,#${SECTION_ID} .planner-lead,#${SECTION_ID} .planner-emphasis{display:block!important;white-space:normal!important;text-wrap:balance!important}
          #${SECTION_ID} .planner-emphasis{font-size:clamp(22px,5.8vw,25px)!important;line-height:1.45!important}
          #${SECTION_ID} .section-title{width:100%!important;font-size:clamp(23px,6.2vw,26px)!important;line-height:1.5!important;text-align:center!important}
          #${SECTION_ID} .section-title-prefix,#${SECTION_ID} .section-title-promise{display:block!important;width:100%!important;white-space:nowrap!important;text-align:center!important}
          #${SECTION_ID} .promises{grid-template-columns:1fr!important;width:100%!important;gap:12px!important}
          #${SECTION_ID} .promise{width:100%!important;padding:22px 14px 24px!important;overflow:hidden!important}
          #${SECTION_ID} .promise h3{width:100%!important;font-size:clamp(22px,5.8vw,25px)!important;line-height:1.5!important;text-align:center!important}
          #${SECTION_ID} .promise-title-line{display:block!important;width:100%!important;white-space:nowrap!important;text-align:center!important}
          #${SECTION_ID} .promise p{width:100%!important;font-size:15px!important;line-height:1.9!important;text-align:center!important;word-break:normal!important;overflow-wrap:normal!important;line-break:strict!important}
          #${SECTION_ID} .promise-body-wide{display:none!important}
          #${SECTION_ID} .promise-body-mobile{display:block!important}
          #${SECTION_ID} .promise-body-line{display:block!important;width:100%!important;white-space:nowrap!important}
          #${SECTION_ID} .proofs{grid-template-columns:repeat(2,minmax(0,1fr))!important;width:100%!important;gap:8px!important}
          #${SECTION_ID} .proof{width:100%!important;padding:12px 4px!important;overflow:hidden!important}
          #${SECTION_ID} .proof strong{font-size:clamp(23px,6.2vw,27px)!important;white-space:nowrap!important}
          #${SECTION_ID} .cta-strip{grid-template-columns:1fr!important;width:100%!important;gap:12px!important;padding:14px 12px!important;text-align:center!important;overflow:hidden!important}
          #${SECTION_ID} .cta-copy{justify-content:center!important;align-items:flex-start!important;text-align:left!important}
          #${SECTION_ID} .cta-copy strong,#${SECTION_ID} .cta-copy span{white-space:normal!important;word-break:normal!important;overflow-wrap:normal!important;line-break:strict!important}
          #${SECTION_ID} .cta{width:100%!important;white-space:normal!important;word-break:keep-all!important;line-height:1.6!important}
          .ks-section1-comparison-v9{width:calc(100% - 10px)!important;max-width:100%!important;min-height:190px!important;margin:24px auto 0!important;padding:24px 44px 24px 14px!important;overflow:hidden!important}
          .ks-section1-comparison-v9 .ks-comparison-title-main{font-size:18px!important;line-height:1.65!important;white-space:normal!important;text-wrap:balance!important}
          .ks-section1-comparison-v9 .ks-comparison-title-price{font-size:29px!important;white-space:nowrap!important}
          .ks-section1-comparison-v9 .ks-comparison-arrow{right:10px!important;width:38px!important;height:38px!important}
        }
      `;
      document.head.appendChild(style);
    }
  }

  function boot(){
    apply();
    [100,350,800,1600,3000,5000].forEach(ms=>setTimeout(apply,ms));
    window.addEventListener('resize',()=>requestAnimationFrame(apply),{passive:true});
    window.addEventListener('orientationchange',()=>setTimeout(apply,120),{passive:true});
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();