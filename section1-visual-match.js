(() => {
  'use strict';
  const SECTION_ID='ks-premium-intro-v6';
  const STYLE_ID='ks-section1-visual-match-v2';

  function ensureStyle(){
    if(document.getElementById(STYLE_ID)) return;
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      #${SECTION_ID} .ks-hero,
      #${SECTION_ID} .ks-hero .semantic-line,
      #${SECTION_ID} .ks-hero .mobile-split{
        font-family:"Noto Serif JP",serif!important;
        font-weight:900!important;
        line-height:1.28!important;
        letter-spacing:.002em!important;
      }
      #${SECTION_ID} .ks-hero .semantic-line,
      #${SECTION_ID} .ks-hero .mobile-split{font-size:inherit!important;color:inherit!important}
      #${SECTION_ID} .ks-hero .mobile-split{display:inline!important}

      #${SECTION_ID} .ks-question,
      #${SECTION_ID} .section-title,
      #${SECTION_ID} .promise h3,
      #${SECTION_ID} .promise h3 .semantic-line,
      #${SECTION_ID} .proof strong,
      #${SECTION_ID} .planner-emphasis{
        font-family:"Noto Serif JP",serif!important;
      }
      #${SECTION_ID} .promise h3 .semantic-line{font-size:inherit!important;font-weight:inherit!important;line-height:inherit!important;color:inherit!important}
      #${SECTION_ID} .section-title strong,
      #${SECTION_ID} .ks-resolution strong{display:inline!important}

      /* Shared rhythm: sentence groups breathe at semantic boundaries. */
      #${SECTION_ID} .ks-question{margin-top:0!important}
      #${SECTION_ID} .ks-resolution{margin-top:0!important}
      #${SECTION_ID} .ks-copy{margin-top:0!important}
      #${SECTION_ID} .ks-copy.ks-support-block{margin-top:clamp(14px,1.8vw,20px)!important}
      #${SECTION_ID} .ks-planner{margin-top:clamp(16px,2vw,24px)!important}
      #${SECTION_ID} .planner-lead{display:block!important}
      #${SECTION_ID} .planner-emphasis{
        display:block!important;
        margin-top:clamp(8px,1.1vw,13px)!important;
        color:#082f59!important;
        font-weight:900!important;
        line-height:1.35!important;
        letter-spacing:.005em!important;
      }

      /* Desktop and large tablet: preserve the approved reference hierarchy. */
      @media(min-width:835px){
        #${SECTION_ID} .ks-panel{padding-top:42px!important}
        #${SECTION_ID} .ks-categories{margin-bottom:36px!important}
        #${SECTION_ID} .ks-category{font-size:30px!important;min-height:82px!important;gap:14px!important}
        #${SECTION_ID} .ks-category svg{width:34px!important;height:34px!important;flex-basis:34px!important}
        #${SECTION_ID} .ks-hero{font-size:54px!important;margin-bottom:18px!important}
        #${SECTION_ID} .ks-question{font-size:29px!important;margin-bottom:12px!important}
        #${SECTION_ID} .ks-resolution{font-size:18px!important;margin-bottom:18px!important}
        #${SECTION_ID} .ks-copy{font-size:16px!important;line-height:1.8!important}
        #${SECTION_ID} .ks-planner{margin-bottom:34px!important}
        #${SECTION_ID} .planner-emphasis{font-size:31px!important}
        #${SECTION_ID} .section-title{font-size:24px!important}
        #${SECTION_ID} .promise h3{font-size:18px!important}
        #${SECTION_ID} .promise p{font-size:14px!important}
        #${SECTION_ID} .proof strong{font-size:35px!important}
      }

      /* iPad mini / tablets in portrait: key reference size. */
      @media(min-width:601px) and (max-width:834px){
        #${SECTION_ID} .ks-panel{padding:34px 26px 28px!important}
        #${SECTION_ID} .ks-categories{margin-bottom:34px!important}
        #${SECTION_ID} .ks-category{min-height:76px!important;font-size:28px!important;gap:12px!important}
        #${SECTION_ID} .ks-category svg{width:31px!important;height:31px!important;flex-basis:31px!important}
        #${SECTION_ID} .ks-hero{font-size:42px!important;line-height:1.3!important;margin-bottom:18px!important}
        #${SECTION_ID} .ks-hero .semantic-line{white-space:nowrap!important}
        #${SECTION_ID} .ks-hero .mobile-split{display:inline!important}
        #${SECTION_ID} .ornament{margin-bottom:22px!important}
        #${SECTION_ID} .ks-question{font-size:27px!important;line-height:1.45!important;margin-bottom:12px!important}
        #${SECTION_ID} .ks-resolution{font-size:17px!important;line-height:1.7!important;margin-bottom:18px!important}
        #${SECTION_ID} .ks-resolution .semantic-line{display:inline!important;white-space:normal!important}
        #${SECTION_ID} .ks-copy{font-size:15.5px!important;line-height:1.82!important;margin-bottom:12px!important}
        #${SECTION_ID} .ks-copy .semantic-line{font-size:inherit!important;line-height:inherit!important}
        #${SECTION_ID} .ks-planner{margin-top:20px!important;margin-bottom:32px!important}
        #${SECTION_ID} .planner-emphasis{font-size:28px!important;margin-top:10px!important}
        #${SECTION_ID} .divider{margin:28px 0!important}
        #${SECTION_ID} .section-title{font-size:24px!important;line-height:1.45!important;margin-bottom:20px!important}
        #${SECTION_ID} .section-title strong{font-size:1.2em!important}
        #${SECTION_ID} .promise{padding:18px 15px 18px 18px!important}
        #${SECTION_ID} .promise-head{gap:10px!important;margin-bottom:10px!important}
        #${SECTION_ID} .icon{width:46px!important;height:46px!important;flex-basis:46px!important}
        #${SECTION_ID} .promise h3{font-size:17.5px!important;line-height:1.5!important}
        #${SECTION_ID} .promise p{font-size:13.5px!important;line-height:1.78!important}
        #${SECTION_ID} .proof{min-height:106px!important}
        #${SECTION_ID} .proof strong{font-size:31px!important}
        #${SECTION_ID} .proof span{font-size:11px!important}
        #${SECTION_ID} .cta-copy strong{font-size:16px!important}
        #${SECTION_ID} .cta-copy span{font-size:11.5px!important}
        #${SECTION_ID} .cta{font-size:13.5px!important}
      }

      /* Large phones: keep two category cards, but keep category type visually substantial. */
      @media(min-width:431px) and (max-width:600px){
        #${SECTION_ID} .ks-category{font-size:22px!important;min-height:60px!important;gap:8px!important}
        #${SECTION_ID} .ks-category svg{width:24px!important;height:24px!important;flex-basis:24px!important}
        #${SECTION_ID} .ks-hero{font-size:32px!important;line-height:1.34!important}
        #${SECTION_ID} .ks-hero .mobile-split{display:inline!important}
        #${SECTION_ID} .ks-question{font-size:22px!important}
        #${SECTION_ID} .ks-resolution{font-size:14px!important;margin-bottom:16px!important}
        #${SECTION_ID} .ks-resolution .semantic-line{display:inline!important}
        #${SECTION_ID} .ks-copy{font-size:12.5px!important}
        #${SECTION_ID} .ks-planner{margin-top:18px!important;margin-bottom:26px!important}
        #${SECTION_ID} .planner-emphasis{font-size:24px!important;margin-top:8px!important}
        #${SECTION_ID} .section-title{font-size:21px!important}
        #${SECTION_ID} .promise h3{font-size:17px!important}
        #${SECTION_ID} .promise p{font-size:13px!important}
      }

      /* Small phones: change layout before shrinking typography. */
      @media(max-width:430px){
        #${SECTION_ID} .ks-categories{gap:10px!important;margin-bottom:24px!important}
        #${SECTION_ID} .ks-category{font-size:21px!important;min-height:58px!important;gap:8px!important}
        #${SECTION_ID} .ks-category svg{width:24px!important;height:24px!important;flex-basis:24px!important}
        #${SECTION_ID} .ks-hero{font-size:29px!important;line-height:1.36!important}
        #${SECTION_ID} .ks-hero .mobile-split{display:block!important}
        #${SECTION_ID} .ks-question{font-size:21px!important;line-height:1.45!important}
        #${SECTION_ID} .ks-resolution{font-size:13.5px!important;margin-bottom:16px!important}
        #${SECTION_ID} .ks-copy{font-size:12px!important;line-height:1.78!important}
        #${SECTION_ID} .ks-planner{margin-top:18px!important;margin-bottom:26px!important}
        #${SECTION_ID} .planner-emphasis{font-size:22px!important;margin-top:8px!important}
        #${SECTION_ID} .section-title{font-size:20px!important}
        #${SECTION_ID} .promise h3{font-size:17px!important}
        #${SECTION_ID} .promise p{font-size:13px!important}
      }
    `;
    document.head.appendChild(style);
  }

  function normalizeCopy(){
    const section=document.getElementById(SECTION_ID);
    if(!section) return;

    const resolution=section.querySelector('.ks-resolution');
    if(resolution && resolution.dataset.visualMatch!=='2'){
      resolution.innerHTML='そんなお悩みを、<strong>20年</strong>の経験で解決します。';
      resolution.dataset.visualMatch='2';
    }

    const copies=section.querySelectorAll('.ks-copy');
    if(copies[0]) copies[0].classList.add('ks-support-block');

    const planner=section.querySelector('.ks-planner');
    if(planner && planner.dataset.visualMatch!=='2'){
      planner.innerHTML='<span class="planner-lead">進路指導や学習習慣の定着まで見据えた</span><span class="planner-emphasis">お子様だけの学習プランナー。</span>';
      planner.dataset.visualMatch='2';
    }
  }

  function apply(){ensureStyle();normalizeCopy()}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true}); else apply();
  window.addEventListener('load',apply,{once:true});
  [100,350,900,1800,3200].forEach(ms=>setTimeout(apply,ms));
  const root=document.getElementById('root')||document.body;
  if(root) new MutationObserver(apply).observe(root,{childList:true,subtree:true});
})();
