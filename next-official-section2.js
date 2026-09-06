(() => {
  'use strict';
  const STYLE_ID='ks-next-section2-style-v1';
  function inject(){if(document.getElementById(STYLE_ID))return;const s=document.createElement('style');s.id=STYLE_ID;s.textContent=`
    .ks-next-official-section2,.ks-next-official-section2 *{box-sizing:border-box!important;min-width:0!important}
    .ks-next-official-section2{width:100%!important;max-width:100vw!important;overflow-x:hidden!important}
    .ks-next-official-section2 img,.ks-next-official-section2 video,.ks-next-official-section2 svg{max-width:100%!important;height:auto!important}
    .ks-next-official-section2 h1,.ks-next-official-section2 h2,.ks-next-official-section2 h3,.ks-next-official-section2 p,.ks-next-official-section2 li,.ks-next-official-section2 a,.ks-next-official-section2 span,.ks-next-official-section2 strong{max-width:100%!important;word-break:normal!important;overflow-wrap:normal!important;line-break:strict!important;hyphens:none!important}
    .ks-next-official-section2 h1,.ks-next-official-section2 h2,.ks-next-official-section2 h3{text-wrap:balance!important}
    .ks-next-official-section2 .container{width:min(100% - clamp(24px,6vw,64px),1200px)!important;max-width:1200px!important;margin-inline:auto!important}
    @media(max-width:900px){.ks-next-official-section2 .grid-cols-4{grid-template-columns:repeat(2,minmax(0,1fr))!important}.ks-next-official-section2 .grid-cols-3{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
    @media(max-width:560px){.ks-next-official-section2 .grid-cols-4,.ks-next-official-section2 .grid-cols-3,.ks-next-official-section2 .grid-cols-2{grid-template-columns:1fr!important}.ks-next-official-section2 .container{width:calc(100% - 24px)!important}}
  `;document.head.appendChild(s)}
  function mark(){inject();const first=document.getElementById('ks-premium-intro-v6');if(!first)return false;let n=first.nextElementSibling;while(n&&n.matches('script,style'))n=n.nextElementSibling;if(!n)return false;n.classList.add('ks-next-official-section2');return true}
  function boot(){let c=0;const t=setInterval(()=>{c++;if(mark()||c>40)clearInterval(t)},100)}
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();