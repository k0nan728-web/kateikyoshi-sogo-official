(() => {
  'use strict';
  const STYLE_ID='ks-final-responsive-v5';
  const HEADER_CLASS='ks-premium-header';
  const SECTION_CLASS='ks-mobile-section1-final';
  const CATEGORY_CLASS='ks-section1-category-heading';
  const norm=v=>String(v||'').replace(/\s+/g,'').replace(/、/g,'・').trim();

  function inject(){
    if(document.getElementById(STYLE_ID)) return;
    const s=document.createElement('style'); s.id=STYLE_ID;
    s.textContent=`
      *,*::before,*::after{box-sizing:border-box}
      html,body,#root,main{width:100%!important;max-width:100%!important;min-width:0!important;overflow-x:hidden!important}
      img,video,canvas,svg{max-width:100%!important}

      /* Header: fixed three-column grid. Brand, CTA and menu always have their own space. */
      nav.fixed.top-0.${HEADER_CLASS}{position:fixed!important;inset:0 0 auto 0!important;width:100%!important;max-width:100vw!important;height:82px!important;min-height:82px!important;padding:0!important;margin:0!important;z-index:10000!important;overflow:hidden!important;background:#081a32!important;border:0!important;border-bottom:1px solid rgba(240,207,114,.45)!important;box-shadow:0 8px 28px rgba(4,16,31,.18)!important;backdrop-filter:none!important;-webkit-backdrop-filter:none!important}
      nav.fixed.top-0.${HEADER_CLASS}::after{content:"";position:absolute;left:0;right:0;bottom:0;height:2px;background:linear-gradient(90deg,transparent,#d4af37,#f2d477,#d4af37,transparent)!important}
      nav.fixed.top-0.${HEADER_CLASS} .ks-header-shell{width:100%!important;max-width:1280px!important;height:82px!important;margin:0 auto!important;padding:0 24px!important;display:grid!important;grid-template-columns:minmax(0,1fr) auto auto!important;align-items:center!important;gap:16px!important}
      nav.fixed.top-0.${HEADER_CLASS} .ks-header-brand{min-width:0!important;width:100%!important;display:flex!important;align-items:center!important;gap:11px!important;overflow:hidden!important;color:#fff!important;text-decoration:none!important}
      nav.fixed.top-0.${HEADER_CLASS} .ks-header-mark{flex:0 0 38px!important;width:38px!important;height:38px!important;display:grid!important;place-items:center!important;border:1px solid rgba(240,207,114,.7)!important;border-radius:9px!important;color:#f2d477!important;background:rgba(212,175,55,.08)!important;font-size:17px!important}
      nav.fixed.top-0.${HEADER_CLASS} .ks-header-brand-copy{display:block!important;min-width:0!important;max-width:100%!important;overflow:hidden!important}
      nav.fixed.top-0.${HEADER_CLASS} .ks-header-kicker{display:block!important;margin:0 0 2px!important;color:#f2d477!important;font-size:8px!important;font-weight:800!important;letter-spacing:.12em!important;line-height:1.1!important;white-space:nowrap!important}
      nav.fixed.top-0.${HEADER_CLASS} .ks-header-name{display:block!important;min-width:0!important;max-width:100%!important;color:#fff!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(17px,1.7vw,22px)!important;font-weight:900!important;line-height:1.25!important;letter-spacing:0!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
      nav.fixed.top-0.${HEADER_CLASS} .ks-header-name span{color:#fff!important}
      nav.fixed.top-0.${HEADER_CLASS} .ks-header-nav{display:flex!important;align-items:center!important;justify-content:center!important;gap:2px!important;min-width:0!important;overflow:hidden!important}
      nav.fixed.top-0.${HEADER_CLASS} .ks-header-nav a{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:38px!important;padding:0 8px!important;color:rgba(255,255,255,.9)!important;text-decoration:none!important;font-size:12px!important;font-weight:700!important;white-space:nowrap!important;border-radius:8px!important}
      nav.fixed.top-0.${HEADER_CLASS} .ks-header-actions{display:flex!important;align-items:center!important;gap:8px!important;flex:0 0 auto!important}
      nav.fixed.top-0.${HEADER_CLASS} .ks-header-cta{display:inline-flex!important;align-items:center!important;justify-content:center!important;width:auto!important;min-width:124px!important;max-width:180px!important;height:46px!important;padding:0 17px!important;border-radius:999px!important;background:#fff!important;color:#10243e!important;border:1px solid rgba(255,255,255,.7)!important;text-decoration:none!important;font-size:13px!important;font-weight:900!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;box-shadow:0 6px 18px rgba(0,0,0,.12)!important}
      nav.fixed.top-0.${HEADER_CLASS} .ks-header-menu{display:grid!important;place-items:center!important;width:46px!important;height:46px!important;min-width:46px!important;padding:0!important;border:1px solid rgba(255,255,255,.22)!important;border-radius:12px!important;background:rgba(255,255,255,.04)!important;color:#fff!important}
      nav.fixed.top-0.${HEADER_CLASS} .ks-header-menu-bars{width:24px!important;height:18px!important;display:flex!important;flex-direction:column!important;justify-content:space-between!important}
      nav.fixed.top-0.${HEADER_CLASS} .ks-header-menu-bars i{display:block!important;width:100%!important;height:2px!important;background:#fff!important;border-radius:2px!important}
      nav.fixed.top-0.${HEADER_CLASS} .ks-header-drawer{position:absolute!important;top:82px!important;left:0!important;right:0!important;background:#081a32!important;padding:14px!important;display:none!important;z-index:10001!important}
      nav.fixed.top-0.${HEADER_CLASS} .ks-header-drawer.is-open{display:block!important}
      nav.fixed.top-0.${HEADER_CLASS}>.container,nav.fixed.top-0.${HEADER_CLASS}>div:not(.ks-header-shell){display:none!important}

      /* Global text containment. */
      main h1,main h2,main h3,main h4,main h5,main h6,main p,main li,main a,main button,main span,main strong,main small,main td,main th{max-width:100%!important;min-width:0!important;line-break:strict!important;hyphens:none!important;word-break:normal!important;overflow-wrap:break-word!important}

      /* First section. */
      main>.${SECTION_CLASS}{width:100%!important;max-width:100vw!important;min-width:0!important;overflow:hidden!important;padding-left:16px!important;padding-right:16px!important}
      main>.${SECTION_CLASS} .${CATEGORY_CLASS}{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;align-items:center!important;justify-items:center!important;gap:clamp(12px,2.5vw,32px)!important;width:min(900px,100%)!important;max-width:100%!important;margin:0 auto 28px!important;padding:0 4px!important;color:#17457f!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(22px,3.8vw,40px)!important;font-weight:900!important;line-height:1.35!important;text-align:center!important}
      main>.${SECTION_CLASS} .${CATEGORY_CLASS} .ks-section1-category-item{display:flex!important;align-items:center!important;justify-content:center!important;width:100%!important;min-width:0!important;max-width:100%!important;padding:0!important;color:inherit!important;font:inherit!important;line-height:inherit!important;white-space:normal!important;overflow-wrap:break-word!important;text-wrap:balance!important}
      main>.${SECTION_CLASS} .ks-section1-stats{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important;width:100%!important;max-width:100%!important;min-width:0!important}
      main>.${SECTION_CLASS} .ks-section1-stats>*{min-width:0!important;max-width:100%!important;overflow:hidden!important}
      main>.${SECTION_CLASS} .ks-section1-stats strong,main>.${SECTION_CLASS} .ks-section1-stats b{font-size:clamp(22px,4.1vw,40px)!important;line-height:1.2!important;white-space:nowrap!important}
      main>.${SECTION_CLASS} img{width:100%!important;max-width:100%!important;height:auto!important}

      @media(max-width:1100px){nav.fixed.top-0.${HEADER_CLASS} .ks-header-shell{grid-template-columns:minmax(0,1fr) auto auto!important;gap:10px!important;padding:0 18px!important}nav.fixed.top-0.${HEADER_CLASS} .ks-header-nav{display:none!important}}
      @media(max-width:767px){
        nav.fixed.top-0.${HEADER_CLASS}{height:70px!important;min-height:70px!important}
        nav.fixed.top-0.${HEADER_CLASS} .ks-header-shell{height:70px!important;padding:0 12px!important;grid-template-columns:minmax(0,1fr) auto auto!important;gap:7px!important}
        nav.fixed.top-0.${HEADER_CLASS} .ks-header-brand{gap:8px!important}
        nav.fixed.top-0.${HEADER_CLASS} .ks-header-mark{width:34px!important;height:34px!important;flex-basis:34px!important;font-size:15px!important}
        nav.fixed.top-0.${HEADER_CLASS} .ks-header-kicker{font-size:7px!important;letter-spacing:.1em!important}
        nav.fixed.top-0.${HEADER_CLASS} .ks-header-name{font-size:clamp(14px,4.2vw,18px)!important;line-height:1.2!important}
        nav.fixed.top-0.${HEADER_CLASS} .ks-header-cta{min-width:108px!important;max-width:145px!important;height:42px!important;padding:0 10px!important;font-size:12px!important}
        nav.fixed.top-0.${HEADER_CLASS} .ks-header-menu{width:42px!important;height:42px!important;min-width:42px!important}
        main{padding-top:70px!important;padding-bottom:112px!important}
        main>.${SECTION_CLASS}{padding-left:12px!important;padding-right:12px!important}
        main>.${SECTION_CLASS} .${CATEGORY_CLASS}{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:7px!important;font-size:clamp(18px,5.5vw,26px)!important;line-height:1.4!important;margin-bottom:22px!important}
        main>.${SECTION_CLASS} .ks-section1-stats{gap:10px!important}
        main>.${SECTION_CLASS} .ks-section1-stats>*{padding-left:6px!important;padding-right:6px!important}
        main>.${SECTION_CLASS} .ks-section1-stats strong,main>.${SECTION_CLASS} .ks-section1-stats b{font-size:clamp(20px,6.4vw,28px)!important}
      }
      @media(max-width:390px){
        nav.fixed.top-0.${HEADER_CLASS} .ks-header-shell{padding:0 8px!important;gap:5px!important}
        nav.fixed.top-0.${HEADER_CLASS} .ks-header-mark{display:none!important}
        nav.fixed.top-0.${HEADER_CLASS} .ks-header-name{font-size:14px!important}
        nav.fixed.top-0.${HEADER_CLASS} .ks-header-kicker{font-size:6px!important}
        nav.fixed.top-0.${HEADER_CLASS} .ks-header-cta{min-width:96px!important;max-width:118px!important;height:40px!important;padding:0 7px!important;font-size:11px!important}
        nav.fixed.top-0.${HEADER_CLASS} .ks-header-menu{width:39px!important;height:39px!important;min-width:39px!important}
        main>.${SECTION_CLASS} .${CATEGORY_CLASS}{font-size:18px!important;gap:5px!important;padding:0!important}
      }
      @media(min-width:768px) and (max-width:1024px){nav.fixed.top-0.${HEADER_CLASS} .ks-header-shell{padding:0 20px!important}main>.${SECTION_CLASS} .${CATEGORY_CLASS}{font-size:clamp(26px,4.2vw,38px)!important}}
    `;
    document.head.appendChild(s);
  }

  function markSection(){
    const root=document.getElementById('root')||document;
    let section=root.querySelector(`.${SECTION_CLASS}`);
    if(!section){
      const nodes=Array.from(root.querySelectorAll('section,article,main>div,#root>div'));
      const anchor=nodes.find(el=>{const t=norm(el.textContent);return t.includes('うちの子に合う先生が見つからない')&&t.includes('20年の経験')});
      if(anchor){section=anchor.closest('section')||anchor;section.classList.add(SECTION_CLASS)}
    }
    if(!section)return;

    if(!section.querySelector(`.${CATEGORY_CLASS}`)){
      const nodes=Array.from(section.querySelectorAll('h1,h2,h3,h4,p,div,span,strong'));
      const target=nodes.find(el=>norm(el.textContent)==='英検・受験・不登校・通信制高校');
      if(target){
        target.classList.add(CATEGORY_CLASS);
        target.setAttribute('aria-label','英検・受験／不登校・通信制高校');
        target.innerHTML='<span class="ks-section1-category-item">英検・受験</span><span class="ks-section1-category-item">不登校・通信制高校</span>';
      }
    }

    const grids=Array.from(section.querySelectorAll('div'));
    const stats=grids.find(el=>{const t=norm(el.textContent);return t.includes('20年超')&&t.includes('1,000名超')&&t.includes('300名以上')&&t.includes('80%超')});
    if(stats){const grid=stats.matches('.grid')?stats:(stats.querySelector(':scope>.grid')||stats);grid.classList.add('ks-section1-stats')}
  }

  function repair(){inject();markSection();}
  function start(){
    repair();
    const root=document.getElementById('root');
    if(root){let queued=false;const observer=new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;repair()})});observer.observe(root,{childList:true,subtree:true})}
    [100,300,800,1500,2500].forEach(ms=>setTimeout(repair,ms));
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
