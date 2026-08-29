(() => {
  'use strict';

  const STYLE_ID = 'mobile-section1-current-style-v4';
  const ROUTE_CLASS = 'ks-current-contract-route';
  const HEADER_CLASS = 'ks-mobile-header-clean';
  const norm = (s) => (s || '').replace(/\s+/g, '').trim();

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      *,*::before,*::after{box-sizing:border-box}
      html,body,#root,main{max-width:100%!important;min-width:0!important;overflow-x:hidden!important}

      .${ROUTE_CLASS},.${ROUTE_CLASS} *{box-sizing:border-box!important;min-width:0!important;max-width:100%!important}
      .${ROUTE_CLASS}{width:100%!important;max-width:100%!important;margin-inline:auto!important;overflow:hidden!important}
      .${ROUTE_CLASS} h1,.${ROUTE_CLASS} h2,.${ROUTE_CLASS} h3,.${ROUTE_CLASS} p,.${ROUTE_CLASS} span,.${ROUTE_CLASS} strong,.${ROUTE_CLASS} b,.${ROUTE_CLASS} small{white-space:normal!important;word-break:normal!important;overflow-wrap:anywhere!important;line-break:strict!important;hyphens:none!important}

      #ks-direct-contract-proof-v7,#ks-direct-contract-proof-v7 *{box-sizing:border-box!important;min-width:0!important;max-width:100%!important}
      #ks-direct-contract-proof-v7{width:100%!important;overflow:hidden!important}
      #ks-direct-contract-proof-v7 .ks-proof-inner{width:100%!important;max-width:1160px!important;margin-inline:auto!important}
      #ks-direct-contract-proof-v7 .ks-proof-heading{width:100%!important;max-width:1000px!important;margin-left:auto!important;margin-right:auto!important;text-align:center!important}
      #ks-direct-contract-proof-v7 h2{width:100%!important;max-width:940px!important;margin-left:auto!important;margin-right:auto!important;white-space:normal!important;word-break:normal!important;overflow-wrap:normal!important;line-break:strict!important;text-wrap:balance!important}
      #ks-direct-contract-proof-v7 .ks-proof-lead{width:100%!important;max-width:900px!important;margin-left:auto!important;margin-right:auto!important;white-space:normal!important;word-break:normal!important;overflow-wrap:normal!important;line-break:strict!important}

      @media(min-width:601px) and (max-width:1100px){
        .${ROUTE_CLASS}{display:grid!important;grid-template-columns:minmax(0,1fr)!important;gap:.7rem!important;padding:1rem 1.15rem!important;text-align:center!important}
        .${ROUTE_CLASS}>*{width:100%!important;max-width:100%!important;margin-inline:auto!important}
        .${ROUTE_CLASS} h1,.${ROUTE_CLASS} h2,.${ROUTE_CLASS} h3{font-size:clamp(1.5rem,3.5vw,2.15rem)!important;line-height:1.42!important;text-align:center!important;text-wrap:balance!important}
        .${ROUTE_CLASS} p,.${ROUTE_CLASS} span,.${ROUTE_CLASS} strong{font-size:clamp(.88rem,1.7vw,1rem)!important;line-height:1.65!important}
        .${ROUTE_CLASS}::before,.${ROUTE_CLASS}::after{max-width:100%!important}

        #ks-direct-contract-proof-v7{padding-left:22px!important;padding-right:22px!important}
        #ks-direct-contract-proof-v7 .ks-proof-inner{padding-left:10px!important;padding-right:10px!important}
        #ks-direct-contract-proof-v7 h2{max-width:940px!important;font-size:clamp(2rem,4.1vw,2.75rem)!important;line-height:1.42!important;letter-spacing:0!important}
        #ks-direct-contract-proof-v7 .ks-proof-lead{font-size:clamp(.95rem,1.75vw,1.08rem)!important;line-height:1.85!important}
        #ks-direct-contract-proof-v7 .ks-proof-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:16px!important}
      }

      @media(max-width:600px){
        .${ROUTE_CLASS}{display:grid!important;grid-template-columns:minmax(0,1fr)!important;gap:.6rem!important;padding:.9rem .85rem!important;text-align:center!important}
        .${ROUTE_CLASS} h1,.${ROUTE_CLASS} h2,.${ROUTE_CLASS} h3{font-size:clamp(1.18rem,5.7vw,1.55rem)!important;line-height:1.48!important;text-align:center!important}

        #ks-direct-contract-proof-v7{padding-left:14px!important;padding-right:14px!important}
        #ks-direct-contract-proof-v7 .ks-proof-inner{padding-left:0!important;padding-right:0!important}
        #ks-direct-contract-proof-v7 h2{max-width:100%!important;font-size:clamp(1.62rem,7vw,2.02rem)!important;line-height:1.5!important}
        #ks-direct-contract-proof-v7 .ks-proof-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important}

        nav.${HEADER_CLASS}{width:100%!important;max-width:100vw!important;overflow:hidden!important}
        nav.${HEADER_CLASS}>.container{width:100%!important;max-width:100%!important;padding:0 12px!important}
        nav.${HEADER_CLASS}>.container>div{min-height:60px!important;display:flex!important;align-items:center!important;gap:7px!important}
        nav.${HEADER_CLASS} .ks-mobile-brand{flex:1 1 auto!important;min-width:0!important;display:flex!important;flex-direction:column!important;color:#fff!important;text-decoration:none!important}
        nav.${HEADER_CLASS} .ks-mobile-brand-main{display:block!important;font-family:'Noto Serif JP',serif!important;font-size:14px!important;font-weight:900!important;line-height:1.2!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
        nav.${HEADER_CLASS} .ks-mobile-brand-sub{display:block!important;margin-top:2px!important;font-size:8px!important;line-height:1.2!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
        nav.${HEADER_CLASS} .ks-mobile-cta{flex:0 0 auto!important;min-height:40px!important;padding:7px 10px!important;border-radius:999px!important;white-space:nowrap!important}
        nav.${HEADER_CLASS} .ks-mobile-menu{flex:0 0 40px!important;width:40px!important;height:40px!important}
        nav.${HEADER_CLASS}>div:nth-child(2){display:none!important}
      }

      @media(max-width:359px){
        #ks-direct-contract-proof-v7 .ks-proof-grid{grid-template-columns:minmax(0,1fr)!important}
      }
    `;
    document.head.appendChild(style);
  }

  function markContractRoute(){
    const links=Array.from(document.querySelectorAll('a[href]'));
    let route=links.find((el)=>{
      const t=norm(el.textContent);
      return t.includes('料金・担当体制を比較して選ぶ')||(t.includes('CONTRACTCOMPARISON')&&t.includes('料金'));
    });
    if(!route){
      const candidates=Array.from(document.querySelectorAll('aside,div'));
      route=candidates.filter((el)=>{
        const t=norm(el.textContent);
        return t.includes('料金・担当体制を比較して選ぶ')||(t.includes('CONTRACTCOMPARISON')&&t.includes('料金'));
      }).sort((a,b)=>a.querySelectorAll('*').length-b.querySelectorAll('*').length)[0];
    }
    if(route) route.classList.add(ROUTE_CLASS);
  }

  function cleanHeader(){
    const nav=document.querySelector('nav.fixed.top-0,nav.fixed');
    if(!nav)return;
    nav.classList.add(HEADER_CLASS);
    const anchors=Array.from(nav.querySelectorAll('a'));
    const brand=anchors.find(a=>{const t=norm(a.textContent);return t.includes('プロ家庭教師')&&t.includes('鈴木雄太');});
    if(brand){
      brand.classList.add('ks-mobile-brand');
      if(!brand.dataset.mobileBrandCurrent){
        brand.dataset.mobileBrandCurrent='1';
        brand.innerHTML='<span class="ks-mobile-brand-main">プロ家庭教師　鈴木雄太</span><span class="ks-mobile-brand-sub">英検・受験・不登校・通信制を一人で担当</span>';
      }
    }
    const cta=anchors.find(a=>{const t=norm(a.textContent);return /無料相談|お問い合わせ/.test(t)&&t.length<40;});
    if(cta)cta.classList.add('ks-mobile-cta');
    const buttons=Array.from(nav.querySelectorAll('button'));
    const menu=buttons.find(b=>/メニュー|menu/i.test(`${b.getAttribute('aria-label')||''}${b.textContent||''}`))||buttons.find(b=>b.querySelector('svg'));
    if(menu)menu.classList.add('ks-mobile-menu');
  }

  function run(){injectStyles();markContractRoute();cleanHeader();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
  [400,1200,2600,3300].forEach((delay)=>setTimeout(run,delay));
})();
