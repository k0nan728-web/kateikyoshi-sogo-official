(() => {
  'use strict';
  const SECTION_ID='ks-premium-intro-v6';
  const STYLE_ID='ks-section1-visual-match-v1';

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
      #${SECTION_ID} .proof strong{
        font-family:"Noto Serif JP",serif!important;
      }
      #${SECTION_ID} .promise h3 .semantic-line{font-size:inherit!important;font-weight:inherit!important;line-height:inherit!important;color:inherit!important}
      #${SECTION_ID} .section-title strong,
      #${SECTION_ID} .ks-resolution strong{display:inline!important}

      /* Desktop and large tablet: preserve the approved reference hierarchy. */
      @media(min-width:835px){
        #${SECTION_ID} .ks-panel{padding-top:42px!important}
        #${SECTION_ID} .ks-category{font-size:24px!important;min-height:68px!important}
        #${SECTION_ID} .ks-hero{font-size:54px!important;margin-bottom:18px!important}
        #${SECTION_ID} .ks-question{font-size:29px!important;margin-bottom:10px!important}
        #${SECTION_ID} .ks-resolution{font-size:18px!important;margin-bottom:14px!important}
        #${SECTION_ID} .ks-copy{font-size:16px!important;line-height:1.8!important}
        #${SECTION_ID} .section-title{font-size:24px!important}
        #${SECTION_ID} .promise h3{font-size:18px!important}
        #${SECTION_ID} .promise p{font-size:14px!important}
        #${SECTION_ID} .proof strong{font-size:35px!important}
      }

      /* iPad mini / tablets in portrait: this is the key reference size. */
      @media(min-width:601px) and (max-width:834px){
        #${SECTION_ID} .ks-panel{padding:34px 26px 28px!important}
        #${SECTION_ID} .ks-categories{margin-bottom:28px!important}
        #${SECTION_ID} .ks-category{min-height:62px!important;font-size:22px!important}
        #${SECTION_ID} .ks-category svg{width:23px!important;height:23px!important;flex-basis:23px!important}
        #${SECTION_ID} .ks-hero{font-size:42px!important;line-height:1.3!important;margin-bottom:18px!important}
        #${SECTION_ID} .ks-hero .semantic-line{white-space:nowrap!important}
        #${SECTION_ID} .ks-hero .mobile-split{display:inline!important}
        #${SECTION_ID} .ornament{margin-bottom:18px!important}
        #${SECTION_ID} .ks-question{font-size:27px!important;line-height:1.45!important;margin-bottom:10px!important}
        #${SECTION_ID} .ks-resolution{font-size:17px!important;line-height:1.7!important;margin-bottom:14px!important}
        #${SECTION_ID} .ks-resolution .semantic-line{display:inline!important;white-space:normal!important}
        #${SECTION_ID} .ks-copy{font-size:15.5px!important;line-height:1.82!important;margin-bottom:12px!important}
        #${SECTION_ID} .ks-copy .semantic-line{font-size:inherit!important;line-height:inherit!important}
        #${SECTION_ID} .divider{margin:24px 0!important}
        #${SECTION_ID} .section-title{font-size:24px!important;line-height:1.45!important;margin-bottom:18px!important}
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

      /* Large phones: keep two category cards but protect readable type. */
      @media(min-width:431px) and (max-width:600px){
        #${SECTION_ID} .ks-hero{font-size:32px!important;line-height:1.34!important}
        #${SECTION_ID} .ks-hero .mobile-split{display:inline!important}
        #${SECTION_ID} .ks-question{font-size:22px!important}
        #${SECTION_ID} .ks-resolution{font-size:14px!important}
        #${SECTION_ID} .ks-resolution .semantic-line{display:inline!important}
        #${SECTION_ID} .ks-copy{font-size:12.5px!important}
        #${SECTION_ID} .section-title{font-size:21px!important}
        #${SECTION_ID} .promise h3{font-size:17px!important}
        #${SECTION_ID} .promise p{font-size:13px!important}
      }

      /* Small phones: change layout before shrinking typography. */
      @media(max-width:430px){
        #${SECTION_ID} .ks-hero{font-size:29px!important;line-height:1.36!important}
        #${SECTION_ID} .ks-hero .mobile-split{display:block!important}
        #${SECTION_ID} .ks-question{font-size:21px!important;line-height:1.45!important}
        #${SECTION_ID} .ks-resolution{font-size:13.5px!important}
        #${SECTION_ID} .ks-copy{font-size:12px!important;line-height:1.78!important}
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
    if(resolution && resolution.dataset.visualMatch!=='1'){
      resolution.innerHTML='そんなお悩みを、<strong>20年</strong>の経験で解決します。';
      resolution.dataset.visualMatch='1';
    }
  }

  function apply(){ensureStyle();normalizeCopy()}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',apply,{once:true}); else apply();
  window.addEventListener('load',apply,{once:true});
  [100,350,900,1800,3200].forEach(ms=>setTimeout(apply,ms));
  const root=document.getElementById('root')||document.body;
  if(root) new MutationObserver(apply).observe(root,{childList:true,subtree:true});
})();
