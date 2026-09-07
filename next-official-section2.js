(() => {
  'use strict';
  const STYLE_ID='ks-next-section2-guard-v3';
  const SECOND_ID='ks-next-official-section2';
  function inject(){
    if(document.getElementById(STYLE_ID))return;
    const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
      #${SECOND_ID},#${SECOND_ID} *{box-sizing:border-box!important;min-width:0!important}
      #${SECOND_ID}{width:100%!important;max-width:100vw!important;overflow-x:hidden!important}
      #${SECOND_ID} img,#${SECOND_ID} video,#${SECOND_ID} svg{max-width:100%!important;height:auto!important}
      #${SECOND_ID} h1,#${SECOND_ID} h2,#${SECOND_ID} h3,#${SECOND_ID} p,#${SECOND_ID} li,#${SECOND_ID} a,#${SECOND_ID} span,#${SECOND_ID} strong{max-width:100%!important;word-break:normal!important;overflow-wrap:normal!important;line-break:strict!important;hyphens:none!important}
      @media(max-width:560px){#${SECOND_ID}{padding-left:12px!important;padding-right:12px!important}}
    `;document.head.appendChild(s)
  }
  function boot(){inject();}
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();