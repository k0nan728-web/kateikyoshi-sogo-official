(() => {
  'use strict';

  const ROUTE_CLASS = 'ks-section01-stable-route';
  const ROUTE_ID = 'ks-section01-stable-route-v2';
  const STYLE_ID = 'ks-section01-stable-style-v2';
  const HEADER_STYLE_ID = 'ks-header-100-style-v1';
  const norm = (s) => (s || '').replace(/\s+/g, '').trim();
  let scheduled = false;

  const imp = (el, prop, value) => {
    if (el) el.style.setProperty(prop, value, 'important');
  };

  function injectStyle() {
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement('style');
      style.id = STYLE_ID;
      style.textContent = `
        #${ROUTE_ID},#${ROUTE_ID} *{box-sizing:border-box!important;min-width:0!important}
        #${ROUTE_ID}{display:grid!important;grid-template-columns:minmax(190px,230px) minmax(0,1fr) 36px!important;width:100%!important;max-width:100%!important;align-items:center!important;gap:16px!important;padding:18px 22px!important;margin:0!important;overflow:hidden!important;border:1px solid #e6b84b!important;border-left:6px solid #e2a91f!important;border-radius:16px!important;background:linear-gradient(90deg,#fffaf0,#fff4d8)!important;box-shadow:none!important;text-decoration:none!important;position:relative!important;isolation:isolate!important}
        #${ROUTE_ID}::before,#${ROUTE_ID}::after,#${ROUTE_ID}>*::before,#${ROUTE_ID}>*::after{content:none!important;display:none!important;background:none!important;box-shadow:none!important}
        #${ROUTE_ID} .${ROUTE_CLASS}__label{display:block!important;color:#9b6500!important;font:800 15px/1.4 "Noto Sans JP",sans-serif!important;letter-spacing:.12em!important;text-align:center!important;white-space:nowrap!important;background:none!important}
        #${ROUTE_ID} .${ROUTE_CLASS}__title{display:block!important;color:#0b3d78!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(24px,3vw,32px)!important;font-weight:900!important;line-height:1.35!important;text-align:center!important;white-space:normal!important;word-break:normal!important;overflow-wrap:normal!important;background:none!important}
        #${ROUTE_ID} .${ROUTE_CLASS}__arrow{display:block!important;color:#0b3d78!important;font-size:24px!important;font-weight:900!important;line-height:1!important;text-align:center!important;background:none!important}
        @media(max-width:1100px){#${ROUTE_ID}{grid-template-columns:minmax(0,1fr)!important;gap:7px!important;padding:15px 16px!important}#${ROUTE_ID} .${ROUTE_CLASS}__label{font-size:12px!important;white-space:normal!important}#${ROUTE_ID} .${ROUTE_CLASS}__title{font-size:clamp(20px,3.6vw,29px)!important}#${ROUTE_ID} .${ROUTE_CLASS}__arrow{font-size:20px!important}}
        @media(min-width:601px) and (max-width:1100px){#ks-direct-contract-proof-v7 .ks-proof-heading{width:100%!important;max-width:100%!important;padding-left:14px!important;padding-right:14px!important}#ks-direct-contract-proof-v7 h2{width:100%!important;max-width:100%!important;margin-left:auto!important;margin-right:auto!important;font-size:clamp(25px,3.2vw,32px)!important;line-height:1.48!important;letter-spacing:0!important;text-align:center!important;word-break:normal!important;overflow-wrap:normal!important}#ks-direct-contract-proof-v7 h2 .ks-contract-head-line{display:block!important;width:100%!important;white-space:nowrap!important}}
        @media(max-width:600px){#${ROUTE_ID}{gap:6px!important;padding:14px!important}#${ROUTE_ID} .${ROUTE_CLASS}__title{font-size:clamp(19px,5.6vw,24px)!important}#${ROUTE_ID} .${ROUTE_CLASS}__arrow{font-size:19px!important}}
      `;
      document.head.appendChild(style);
    }

    if (!document.getElementById(HEADER_STYLE_ID)) {
      const style = document.createElement('style');
      style.id = HEADER_STYLE_ID;
      style.textContent = `
        nav.fixed.top-0{
          background:rgba(9,29,55,.985)!important;
          border-bottom:1px solid rgba(214,170,55,.34)!important;
          box-shadow:0 8px 28px rgba(7,22,43,.16)!important;
          backdrop-filter:blur(14px)!important;
          -webkit-backdrop-filter:blur(14px)!important;
          overflow:visible!important;
        }
        nav.fixed.top-0>.container{
          width:100%!important;
          max-width:1200px!important;
          margin-inline:auto!important;
          padding-inline:clamp(18px,3vw,32px)!important;
        }
        nav.fixed.top-0>.container>div{
          min-height:72px!important;
          padding-block:10px!important;
          gap:clamp(10px,1.6vw,20px)!important;
          align-items:center!important;
        }
        nav.fixed.top-0>.container>div>a:first-child{
          min-width:0!important;
          flex:1 1 auto!important;
          gap:14px!important;
          text-decoration:none!important;
        }
        nav.fixed.top-0>.container>div>a:first-child>div:first-child{
          flex:0 0 auto!important;
          border:1px solid rgba(221,177,56,.9)!important;
          border-radius:6px!important;
          padding:8px 13px!important;
          color:#f8df91!important;
          background:rgba(255,255,255,.025)!important;
          box-shadow:inset 0 0 0 1px rgba(255,255,255,.02)!important;
        }
        nav.fixed.top-0>.container>div>a:first-child>div:nth-child(2){
          min-width:0!important;
        }
        nav.fixed.top-0>.container>div>a:first-child>div:nth-child(2) span:first-child{
          display:block!important;
          color:#fff!important;
          font-family:"Noto Serif JP",serif!important;
          font-size:clamp(17px,2vw,23px)!important;
          font-weight:700!important;
          line-height:1.3!important;
          letter-spacing:.015em!important;
        }
        nav.fixed.top-0>.container>div>a:first-child>div:nth-child(2) span:last-child{
          display:block!important;
          margin-top:3px!important;
          color:rgba(255,255,255,.68)!important;
          font-size:11px!important;
          line-height:1.35!important;
          letter-spacing:.03em!important;
        }
        nav.fixed.top-0 .btn-cta{
          flex:0 0 auto!important;
          min-height:50px!important;
          padding:0 24px!important;
          border:1px solid rgba(255,255,255,.88)!important;
          border-radius:999px!important;
          background:#fff!important;
          color:#0b2749!important;
          font-weight:800!important;
          font-size:15px!important;
          line-height:1!important;
          box-shadow:0 7px 18px rgba(0,0,0,.13)!important;
          transition:transform .16s ease,box-shadow .16s ease!important;
          white-space:nowrap!important;
        }
        nav.fixed.top-0 .btn-cta:hover{
          transform:translateY(-1px)!important;
          box-shadow:0 10px 24px rgba(0,0,0,.17)!important;
        }
        nav.fixed.top-0 button{
          flex:0 0 50px!important;
          width:50px!important;
          min-width:50px!important;
          height:50px!important;
          border:1px solid rgba(255,255,255,.28)!important;
          border-radius:13px!important;
          background:rgba(255,255,255,.035)!important;
          color:#fff!important;
          transition:background .16s ease,border-color .16s ease!important;
        }
        nav.fixed.top-0 button:hover{
          background:rgba(255,255,255,.09)!important;
          border-color:rgba(255,255,255,.45)!important;
        }
        nav.fixed.top-0>div:nth-child(2){
          border-top:1px solid rgba(255,255,255,.07)!important;
          background:rgba(4,19,39,.46)!important;
        }
        nav.fixed.top-0>div:nth-child(2) a{
          color:rgba(255,255,255,.82)!important;
          font-size:13px!important;
          font-weight:600!important;
          letter-spacing:.015em!important;
        }
        nav.fixed.top-0>div:nth-child(2) a:hover{color:#fff!important}

        @media(min-width:1101px){
          nav.fixed.top-0>.container>div{min-height:76px!important}
          nav.fixed.top-0 button{display:none!important}
        }

        @media(min-width:601px) and (max-width:1100px){
          nav.fixed.top-0>.container{padding-inline:22px!important}
          nav.fixed.top-0>.container>div{min-height:76px!important;padding-block:11px!important}
          nav.fixed.top-0>.container>div>a:first-child>div:first-child{padding:7px 11px!important;font-size:13px!important}
          nav.fixed.top-0>.container>div>a:first-child>div:nth-child(2) span:first-child{font-size:clamp(17px,2.2vw,21px)!important;white-space:nowrap!important}
          nav.fixed.top-0>.container>div>a:first-child>div:nth-child(2) span:last-child{display:none!important}
          nav.fixed.top-0 .btn-cta{min-height:48px!important;padding-inline:22px!important;font-size:14px!important}
          nav.fixed.top-0 button{width:48px!important;min-width:48px!important;height:48px!important;flex-basis:48px!important}
          nav.fixed.top-0>div:nth-child(2){display:none!important}
        }

        @media(max-width:600px){
          nav.fixed.top-0>.container{padding-inline:12px!important}
          nav.fixed.top-0>.container>div{min-height:64px!important;padding-block:7px!important;gap:7px!important}
          nav.fixed.top-0>.container>div>a:first-child{gap:7px!important;max-width:calc(100% - 158px)!important}
          nav.fixed.top-0>.container>div>a:first-child>div:first-child{
            display:block!important;
            padding:5px 7px!important;
            border-radius:5px!important;
            font-size:10px!important;
            line-height:1.15!important;
            white-space:nowrap!important;
          }
          nav.fixed.top-0>.container>div>a:first-child>div:nth-child(2) span:first-child{
            font-family:"Noto Serif JP",serif!important;
            font-size:clamp(12px,3.65vw,15px)!important;
            line-height:1.25!important;
            white-space:nowrap!important;
            overflow:hidden!important;
            text-overflow:ellipsis!important;
          }
          nav.fixed.top-0>.container>div>a:first-child>div:nth-child(2) span:last-child{display:none!important}
          nav.fixed.top-0 .btn-cta{
            min-height:42px!important;
            max-width:112px!important;
            padding-inline:11px!important;
            font-size:11px!important;
            line-height:1.25!important;
          }
          nav.fixed.top-0 button{
            width:42px!important;
            min-width:42px!important;
            height:42px!important;
            flex-basis:42px!important;
            border-radius:11px!important;
          }
          nav.fixed.top-0>div:nth-child(2){display:none!important}
        }

        @media(max-width:359px){
          nav.fixed.top-0>.container{padding-inline:9px!important}
          nav.fixed.top-0>.container>div>a:first-child{max-width:calc(100% - 142px)!important}
          nav.fixed.top-0>.container>div>a:first-child>div:first-child{display:none!important}
          nav.fixed.top-0 .btn-cta{max-width:96px!important;padding-inline:8px!important;font-size:10px!important}
          nav.fixed.top-0 button{width:40px!important;min-width:40px!important;height:40px!important;flex-basis:40px!important}
        }
      `;
      document.head.appendChild(style);
    }
  }

  function findLegacyRoute() {
    const all = Array.from(document.querySelectorAll('a[href],aside,div'));
    return all.filter(el => el.id !== ROUTE_ID && !el.classList.contains(ROUTE_CLASS)).filter(el => {
      const t = norm(el.textContent);
      return t.includes('料金・担当体制を比較して選ぶ') || (t.includes('CONTRACTCOMPARISON') && t.includes('料金'));
    }).sort((a,b)=>a.querySelectorAll('*').length-b.querySelectorAll('*').length)[0] || null;
  }

  function forceRouteStyles(route) {
    const w = innerWidth || document.documentElement.clientWidth;
    imp(route,'display','grid');imp(route,'width','100%');imp(route,'max-width','100%');imp(route,'min-width','0');imp(route,'box-sizing','border-box');imp(route,'align-items','center');imp(route,'overflow','hidden');imp(route,'margin','0');imp(route,'border','1px solid #e6b84b');imp(route,'border-left','6px solid #e2a91f');imp(route,'border-radius','16px');imp(route,'background','linear-gradient(90deg,#fffaf0,#fff4d8)');imp(route,'box-shadow','none');imp(route,'text-decoration','none');imp(route,'position','relative');imp(route,'isolation','isolate');
    const label = route.querySelector(`.${ROUTE_CLASS}__label`);const title = route.querySelector(`.${ROUTE_CLASS}__title`);const arrow = route.querySelector(`.${ROUTE_CLASS}__arrow`);
    [label,title,arrow].forEach(el=>{imp(el,'display','block');imp(el,'width','100%');imp(el,'max-width','100%');imp(el,'min-width','0');imp(el,'background','transparent');imp(el,'box-shadow','none');imp(el,'transform','none');imp(el,'position','static');imp(el,'text-align','center');});
    if(w<=1100){imp(route,'grid-template-columns','minmax(0,1fr)');imp(route,'gap',w<=600?'6px':'7px');imp(route,'padding',w<=600?'14px':'15px 16px');imp(label,'white-space','normal');imp(label,'font-size','12px');imp(title,'font-size',w<=600?'clamp(19px,5.6vw,24px)':'clamp(20px,3.6vw,29px)');imp(arrow,'font-size',w<=600?'19px':'20px');}else{imp(route,'grid-template-columns','minmax(190px,230px) minmax(0,1fr) 36px');imp(route,'gap','16px');imp(route,'padding','18px 22px');imp(label,'white-space','nowrap');}
  }

  function stabilizeRoute() {
    let route = document.getElementById(ROUTE_ID);
    if(!route){const hit=findLegacyRoute();if(!hit)return;const anchor=hit.tagName==='A'?hit:(hit.closest('a[href]')||hit.querySelector('a[href]'));const old=anchor||hit;const fresh=document.createElement(anchor?'a':'div');fresh.id=ROUTE_ID;fresh.className=ROUTE_CLASS;if(anchor){fresh.href=anchor.getAttribute('href')||'/hikaku/';const target=anchor.getAttribute('target');const rel=anchor.getAttribute('rel');if(target)fresh.target=target;if(rel)fresh.rel=rel;fresh.setAttribute('aria-label','料金・担当体制の比較を見る');}fresh.innerHTML=`<span class="${ROUTE_CLASS}__label">CONTRACT COMPARISON</span><span class="${ROUTE_CLASS}__title">料金・担当体制を比較して選ぶ</span><span class="${ROUTE_CLASS}__arrow" aria-hidden="true">→</span>`;old.replaceWith(fresh);route=fresh;}
    forceRouteStyles(route);
  }

  function stabilizeDirectHeading() {
    const section=document.getElementById('ks-direct-contract-proof-v7');const heading=section?.querySelector('h2');if(!heading)return;const t=norm(heading.textContent);if(!t.includes('講師を紹介してもらうのではなく')||!t.includes('直接契約'))return;const w=innerWidth||document.documentElement.clientWidth;
    if(w>=601&&w<=1100){if(heading.querySelectorAll('.ks-contract-head-line').length!==2){heading.innerHTML='<span class="ks-contract-head-line">講師を紹介してもらうのではなく、</span><span class="ks-contract-head-line">講師本人と<span class="ks-accent">直接契約</span>する家庭教師です。</span>';}imp(heading,'width','100%');imp(heading,'max-width','100%');imp(heading,'margin-left','auto');imp(heading,'margin-right','auto');imp(heading,'font-size','clamp(25px,3.2vw,32px)');imp(heading,'line-height','1.48');imp(heading,'letter-spacing','0');imp(heading,'text-align','center');heading.querySelectorAll('.ks-contract-head-line').forEach(line=>{imp(line,'display','block');imp(line,'width','100%');imp(line,'white-space','nowrap');});}else if(heading.querySelector('.ks-contract-head-line')){heading.innerHTML='講師を紹介してもらうのではなく、<br>講師本人と<span class="ks-accent">直接契約</span>する家庭教師です。';}
  }

  function run(){scheduled=false;injectStyle();stabilizeRoute();stabilizeDirectHeading();}
  function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(run);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
  window.addEventListener('load',run,{once:true});window.addEventListener('resize',schedule,{passive:true});document.fonts?.ready?.then(run);
  const root=document.getElementById('root')||document.body;if(root)new MutationObserver(schedule).observe(root,{childList:true,subtree:true});
})();
