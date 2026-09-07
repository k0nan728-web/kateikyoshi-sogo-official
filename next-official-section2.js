(() => {
  'use strict';
  const STYLE_ID='ks-next-section2-style-v2';
  const WRAP_ID='ks-next-official-section2';
  const PHOTO_ID='ks-section-break-photo';
  const PHOTO='https://cdn.jsdelivr.net/gh/k0nan728-web/kateikyoshi-sogo-official@b1b7fd5dfbf7a6c87ae6b2a0f9c0d6f717384693/IMG_4684_trimmed_35c73ae5.PNG';

  function inject(){
    document.getElementById('ks-next-section2-style-v1')?.remove();
    if(document.getElementById(STYLE_ID))return;
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
      #${PHOTO_ID},#${PHOTO_ID} * ,#${WRAP_ID},#${WRAP_ID} *{box-sizing:border-box!important;min-width:0!important}
      #${PHOTO_ID}{width:100%!important;max-width:100vw!important;margin:0!important;padding:clamp(34px,7vw,84px) clamp(12px,4vw,40px)!important;background:linear-gradient(180deg,#eef3f8 0%,#f8f4ea 50%,#fff 100%)!important;overflow:hidden!important}
      #${PHOTO_ID} .ks-break-inner{width:min(100%,1080px)!important;margin:0 auto!important}
      #${PHOTO_ID} .ks-break-rule{display:flex!important;align-items:center!important;justify-content:center!important;gap:10px!important;margin:0 auto clamp(18px,3vw,28px)!important}
      #${PHOTO_ID} .ks-break-rule:before,#${PHOTO_ID} .ks-break-rule:after{content:""!important;width:min(22vw,120px)!important;height:1px!important;background:#cda94c!important}
      #${PHOTO_ID} .ks-break-rule i{width:7px!important;height:7px!important;border-radius:50%!important;background:#cda94c!important}
      #${PHOTO_ID} figure{width:100%!important;margin:0!important;padding:0!important}
      #${PHOTO_ID} .ks-break-frame{width:100%!important;max-width:920px!important;margin:0 auto!important;padding:clamp(6px,1.2vw,10px)!important;background:#fff!important;border:1px solid rgba(202,177,113,.55)!important;box-shadow:0 18px 42px rgba(17,43,72,.11)!important}
      #${PHOTO_ID} img{display:block!important;width:100%!important;height:auto!important;max-height:min(72vh,720px)!important;object-fit:cover!important;object-position:center!important}

      #${WRAP_ID}{width:100%!important;max-width:100vw!important;margin:0!important;padding:clamp(42px,7vw,92px) clamp(12px,4vw,42px)!important;background:#fffdf8!important;border-top:1px solid rgba(205,169,76,.24)!important;border-bottom:1px solid rgba(205,169,76,.24)!important;overflow-x:hidden!important;position:relative!important}
      #${WRAP_ID}:before{content:""!important;position:absolute!important;top:0!important;left:50%!important;transform:translateX(-50%)!important;width:min(70%,560px)!important;height:3px!important;background:linear-gradient(90deg,transparent,#cda94c,transparent)!important}
      #${WRAP_ID}>.ks-section2-inner{width:min(100%,1200px)!important;margin:0 auto!important}
      #${WRAP_ID} img,#${WRAP_ID} video,#${WRAP_ID} svg{max-width:100%!important;height:auto!important}
      #${WRAP_ID} h1,#${WRAP_ID} h2,#${WRAP_ID} h3,#${WRAP_ID} p,#${WRAP_ID} li,#${WRAP_ID} a,#${WRAP_ID} span,#${WRAP_ID} strong{max-width:100%!important;word-break:normal!important;overflow-wrap:normal!important;line-break:strict!important;hyphens:none!important}
      #${WRAP_ID} h1,#${WRAP_ID} h2,#${WRAP_ID} h3{text-wrap:balance!important}
      #${WRAP_ID} .container{width:min(100% - clamp(24px,6vw,64px),1200px)!important;max-width:1200px!important;margin-inline:auto!important}
      @media(max-width:900px){#${WRAP_ID} .grid-cols-4{grid-template-columns:repeat(2,minmax(0,1fr))!important}#${WRAP_ID} .grid-cols-3{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
      @media(max-width:560px){
        #${PHOTO_ID}{padding:34px 10px 42px!important}
        #${PHOTO_ID} .ks-break-frame{padding:5px!important}
        #${PHOTO_ID} img{max-height:none!important}
        #${WRAP_ID}{padding:44px 10px 58px!important}
        #${WRAP_ID} .grid-cols-4,#${WRAP_ID} .grid-cols-3,#${WRAP_ID} .grid-cols-2{grid-template-columns:1fr!important}
        #${WRAP_ID} .container{width:calc(100% - 16px)!important}
      }
    `;
    document.head.appendChild(s);
  }

  function buildPhoto(){
    const sec=document.createElement('section');
    sec.id=PHOTO_ID;
    sec.setAttribute('aria-label','指導風景');
    sec.innerHTML=`<div class="ks-break-inner"><div class="ks-break-rule" aria-hidden="true"><i></i></div><figure><div class="ks-break-frame"><img src="${PHOTO}" alt="プロ家庭教師 鈴木雄太のオンライン指導風景" loading="eager" decoding="async"></div></figure></div>`;
    return sec;
  }

  function mark(){
    inject();
    const first=document.getElementById('ks-premium-intro-v6');
    if(!first)return false;

    let n=first.nextElementSibling;
    while(n&&n.matches('script,style'))n=n.nextElementSibling;
    if(!n)return false;

    let wrap=document.getElementById(WRAP_ID);
    if(!wrap){
      wrap=document.createElement('section');
      wrap.id=WRAP_ID;
      wrap.setAttribute('aria-label','サービス紹介');
      const inner=document.createElement('div');
      inner.className='ks-section2-inner';
      n.parentNode.insertBefore(wrap,n);
      wrap.appendChild(inner);
      inner.appendChild(n);
    }

    if(!document.getElementById(PHOTO_ID)){
      wrap.parentNode.insertBefore(buildPhoto(),wrap);
    }
    return true;
  }

  function boot(){let c=0;const t=setInterval(()=>{c++;if(mark()||c>50)clearInterval(t)},100)}
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();
})();