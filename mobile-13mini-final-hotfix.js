(() => {
  'use strict';

  const STYLE_ID = 'ks-production-layout-stabilizer-v9';
  const HEADER_STYLE_ID = 'ks-header-final-runtime-v1';

  function installBase() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      *,*::before,*::after{box-sizing:border-box!important}
      html,body{width:100%!important;max-width:100%!important;min-width:0!important;margin:0!important;padding:0!important;overflow-x:hidden!important}
      body>#root,#root{display:block!important;width:100%!important;max-width:100%!important;min-width:0!important;margin:0!important;padding:0!important;overflow-x:clip!important}
      #root>nav,#root>header,#root>main,#root>footer{display:block!important;width:100%!important;max-width:100%!important;min-width:0!important;margin-left:0!important;margin-right:0!important;float:none!important;clear:both!important}
      main{position:relative!important;width:100%!important;max-width:100%!important;min-width:0!important;overflow-x:clip!important}
      main>section,main>article,main>div{width:100%!important;max-width:100%!important;min-width:0!important}
      footer{position:relative!important;inset:auto!important;width:100%!important;max-width:100%!important;min-width:0!important;margin:0!important;float:none!important;clear:both!important;transform:none!important}
      img,video,canvas,svg{max-width:100%!important}
    `;
    document.head.appendChild(style);
  }

  function installHeaderStyle() {
    if (document.getElementById(HEADER_STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = HEADER_STYLE_ID;
    style.textContent = `
      nav.fixed.top-0{background:linear-gradient(180deg,#081d38 0%,#0a2547 100%)!important;border-bottom:2px solid #d6a62d!important;box-shadow:0 8px 26px rgba(4,17,33,.18)!important;overflow:visible!important}
      nav.fixed.top-0>.container{width:100%!important;max-width:1200px!important;margin:0 auto!important;padding:0 22px!important}
      nav.fixed.top-0>.container>div{min-height:78px!important;padding:10px 0!important;gap:14px!important;align-items:center!important}
      nav.fixed.top-0 .ks-header-emblem{flex:0 0 48px!important;width:48px!important;height:48px!important;display:grid!important;place-items:center!important;border:2px solid #d8aa35!important;border-radius:50%!important;color:#e4b443!important;font-family:Georgia,"Times New Roman",serif!important;font-size:25px!important;font-weight:700!important;line-height:1!important;box-shadow:inset 0 0 0 3px rgba(216,170,53,.15)!important}
      nav.fixed.top-0>.container>div>a:first-child{display:flex!important;align-items:center!important;min-width:0!important;flex:1 1 auto!important;gap:12px!important;text-decoration:none!important}
      nav.fixed.top-0>.container>div>a:first-child>div:first-child{display:block!important;flex:0 0 auto!important;border:1px solid #d6a62d!important;border-radius:6px!important;padding:8px 12px!important;color:#f1cd69!important;background:rgba(255,255,255,.02)!important;font-weight:800!important;white-space:nowrap!important}
      nav.fixed.top-0>.container>div>a:first-child>div:last-child{min-width:0!important}
      nav.fixed.top-0>.container>div>a:first-child>div:last-child span:first-child{display:block!important;color:#fff!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(18px,2.1vw,25px)!important;font-weight:700!important;line-height:1.28!important;letter-spacing:.01em!important;white-space:nowrap!important}
      nav.fixed.top-0>.container>div>a:first-child>div:last-child span:last-child{display:block!important;margin-top:3px!important;color:#e0b33d!important;font-size:11px!important;font-weight:700!important;line-height:1.35!important;letter-spacing:.04em!important;white-space:nowrap!important}
      nav.fixed.top-0 .btn-cta{flex:0 0 auto!important;min-height:52px!important;padding:0 24px!important;border:1px solid #d6a62d!important;border-radius:999px!important;background:#fff!important;color:#0b2749!important;font-weight:800!important;font-size:15px!important;line-height:1!important;white-space:nowrap!important;box-shadow:0 8px 20px rgba(0,0,0,.14)!important}
      nav.fixed.top-0 button{flex:0 0 52px!important;width:52px!important;min-width:52px!important;height:52px!important;border:1px solid rgba(255,255,255,.28)!important;border-radius:13px!important;background:rgba(255,255,255,.025)!important;color:#fff!important}
      .ks-header-legacy-row{display:none!important;height:0!important;min-height:0!important;overflow:hidden!important;border:0!important;padding:0!important;margin:0!important}
      @media(min-width:1101px){nav.fixed.top-0>.container>div{min-height:84px!important}}
      @media(min-width:601px) and (max-width:1100px){
        nav.fixed.top-0>.container{padding:0 22px!important}
        nav.fixed.top-0>.container>div{min-height:78px!important;padding:10px 0!important;gap:12px!important}
        nav.fixed.top-0 .ks-header-emblem{flex-basis:44px!important;width:44px!important;height:44px!important;font-size:22px!important}
        nav.fixed.top-0>.container>div>a:first-child>div:first-child{padding:7px 10px!important;font-size:13px!important}
        nav.fixed.top-0>.container>div>a:first-child>div:last-child span:first-child{font-size:clamp(18px,2.2vw,22px)!important}
        nav.fixed.top-0>.container>div>a:first-child>div:last-child span:last-child{font-size:10px!important}
        nav.fixed.top-0 .btn-cta{min-height:50px!important;padding:0 22px!important;font-size:14px!important}
        nav.fixed.top-0 button{width:50px!important;min-width:50px!important;height:50px!important;flex-basis:50px!important}
      }
      @media(max-width:600px){
        nav.fixed.top-0>.container{padding:0 12px!important}
        nav.fixed.top-0>.container>div{min-height:64px!important;padding:7px 0!important;gap:7px!important}
        nav.fixed.top-0>.container>div>a:first-child{gap:7px!important;max-width:calc(100% - 158px)!important}
        nav.fixed.top-0>.container>div>a:first-child>div:first-child{display:none!important}
        nav.fixed.top-0 .ks-header-emblem{flex-basis:34px!important;width:34px!important;height:34px!important;font-size:17px!important;border-width:1.5px!important}
        nav.fixed.top-0>.container>div>a:first-child>div:last-child span:first-child{font-size:clamp(12px,3.6vw,15px)!important;overflow:hidden!important;text-overflow:ellipsis!important}
        nav.fixed.top-0>.container>div>a:first-child>div:last-child span:last-child{display:none!important}
        nav.fixed.top-0 .btn-cta{min-height:42px!important;max-width:110px!important;padding:0 10px!important;font-size:11px!important}
        nav.fixed.top-0 button{width:42px!important;min-width:42px!important;height:42px!important;flex-basis:42px!important;border-radius:11px!important}
      }
      @media(max-width:359px){nav.fixed.top-0 .ks-header-emblem{display:none!important}nav.fixed.top-0>.container>div>a:first-child{max-width:calc(100% - 142px)!important}}
    `;
    document.head.appendChild(style);
  }

  function hideLegacyNav(nav) {
    const known = ['こんな方に','コース一覧','不登校・通信制','よくある質問','お問い合わせ'];
    const nodes = Array.from(nav.querySelectorAll('div,ul,nav'));
    const row = nodes.find(el => {
      const text = (el.textContent || '').replace(/\s+/g,'');
      return known.filter(k => text.includes(k)).length >= 4 && !el.querySelector('.btn-cta');
    });
    if (row) row.classList.add('ks-header-legacy-row');
  }

  function enhanceHeader() {
    installHeaderStyle();
    const nav = document.querySelector('nav.fixed.top-0');
    const main = document.querySelector('main');
    if (!nav) return;
    hideLegacyNav(nav);

    const row = nav.querySelector(':scope > .container > div');
    const brand = row?.querySelector('a:first-child');
    if (brand && !brand.querySelector('.ks-header-emblem')) {
      const emblem = document.createElement('span');
      emblem.className = 'ks-header-emblem';
      emblem.setAttribute('aria-hidden','true');
      emblem.textContent = 'S';
      const badge = brand.firstElementChild;
      if (badge?.nextSibling) brand.insertBefore(emblem, badge.nextSibling);
      else brand.appendChild(emblem);
    }

    const textBox = brand?.lastElementChild;
    if (textBox) {
      const spans = textBox.querySelectorAll('span');
      if (spans[0]) spans[0].textContent = '鈴木雄太のオンライン指導';
      if (spans[1]) spans[1].textContent = '一人ひとりに最適な指導で、未来を創る';
    }

    if (main) {
      const h = Math.ceil(nav.getBoundingClientRect().height || 78);
      main.style.setProperty('padding-top', `${Math.max(h, window.innerWidth <= 600 ? 64 : 78)}px`, 'important');
    }
  }

  function boot() {
    installBase();
    enhanceHeader();
    const root = document.getElementById('root') || document.body;
    if (root) {
      let queued = false;
      new MutationObserver(() => {
        if (queued) return;
        queued = true;
        requestAnimationFrame(() => { queued = false; enhanceHeader(); });
      }).observe(root,{childList:true,subtree:true});
    }
    window.addEventListener('resize',()=>requestAnimationFrame(enhanceHeader),{passive:true});
    document.fonts?.ready?.then(enhanceHeader);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
