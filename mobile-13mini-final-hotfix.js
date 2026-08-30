(() => {
  'use strict';

  const STYLE_ID = 'ks-ideal-header-style-v1';
  const HEADER_ID = 'ks-ideal-header';

  const links = [
    ['こんな方に','#for-you'],
    ['講師紹介','#teacher'],
    ['特徴','#why'],
    ['コース一覧','#courses'],
    ['不登校支援','#support'],
    ['合格実績','#results'],
    ['生徒の声','#voices'],
    ['料金・比較','#pricing'],
    ['お問い合わせ','#contact']
  ];

  function showDiagnostic(){
    try {
      const params = new URLSearchParams(location.search);
      if (params.get('ksdiag') !== '1' || document.getElementById('ks-header-diag')) return;
      const d = document.createElement('div');
      d.id = 'ks-header-diag';
      d.textContent = 'HEADER JS OK';
      d.style.cssText = 'position:fixed;right:10px;bottom:10px;z-index:2147483647;padding:7px 10px;border-radius:8px;background:#16a34a;color:#fff;font:700 12px/1.2 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.25);pointer-events:none';
      document.body.appendChild(d);
      document.documentElement.dataset.ksHeaderRuntime = 'independent-v1';
    } catch (_) {}
  }

  function installStyle(){
    if(document.getElementById(STYLE_ID)) return;
    const s=document.createElement('style');
    s.id=STYLE_ID;
    s.textContent=`
      *,*::before,*::after{box-sizing:border-box}
      html,body,#root{max-width:100%;overflow-x:hidden}
      nav.fixed.top-0{display:none!important}
      #${HEADER_ID}{position:fixed;top:0;left:0;right:0;z-index:2147483000;width:100%;background:radial-gradient(circle at 52% -100%,rgba(49,91,143,.22),transparent 52%),linear-gradient(180deg,#0b2547 0%,#081d38 100%);border-bottom:3px solid #c99726;box-shadow:0 10px 28px rgba(5,21,42,.20);color:#fff;font-family:'Noto Sans JP',sans-serif}
      #${HEADER_ID} *{box-sizing:border-box}
      .ksih-shell{width:min(100%,1360px);margin:0 auto;padding:0 clamp(18px,3vw,42px)}
      .ksih-row{min-height:88px;display:flex;align-items:center;gap:clamp(12px,1.8vw,24px);padding:10px 0}
      .ksih-brand{display:flex;align-items:center;gap:clamp(12px,1.5vw,20px);min-width:0;flex:1 1 auto;color:inherit;text-decoration:none}
      .ksih-badge{display:inline-flex;align-items:center;justify-content:center;flex:0 0 auto;min-height:48px;padding:0 16px;border:1.5px solid #d2a42f;border-radius:9px;color:#f1cb62;background:rgba(255,255,255,.025);font-weight:800;font-size:14px;white-space:nowrap;letter-spacing:.03em}
      .ksih-emblem{display:grid;place-items:center;flex:0 0 54px;width:54px;height:60px;border:2px solid #d6aa36;border-radius:48% 48% 42% 42% / 38% 38% 58% 58%;background:linear-gradient(180deg,#10375f,#071e39);color:#e6b94d;font-family:Georgia,'Times New Roman',serif;font-size:30px;font-weight:700;line-height:1;box-shadow:0 0 0 4px rgba(214,170,54,.10),inset 0 0 0 2px rgba(214,170,54,.22)}
      .ksih-copy{min-width:0}.ksih-title{display:block;font-family:'Noto Serif JP',serif;font-weight:700;font-size:clamp(20px,2vw,29px);line-height:1.25;letter-spacing:.015em;white-space:nowrap}.ksih-sub{display:block;margin-top:4px;color:#deb64c;font-size:11px;font-weight:700;line-height:1.35;letter-spacing:.035em;white-space:nowrap}
      .ksih-actions{display:flex;align-items:center;gap:12px;flex:0 0 auto}.ksih-cta{display:inline-flex;align-items:center;justify-content:center;min-height:54px;padding:0 26px;border:2px solid #d5a632;border-radius:999px;background:linear-gradient(180deg,#fffefa,#fff9ed);color:#102b4b;text-decoration:none;font-weight:800;font-size:15px;white-space:nowrap;box-shadow:0 8px 20px rgba(0,0,0,.14)}.ksih-cta::before{content:'●';margin-right:8px;color:#c99726;font-size:10px}
      .ksih-menu{display:grid;place-items:center;width:54px;height:54px;padding:0;border:1px solid rgba(255,255,255,.34);border-radius:13px;background:rgba(255,255,255,.035);color:#fff;cursor:pointer}.ksih-menu-lines,.ksih-menu-lines::before,.ksih-menu-lines::after{display:block;width:27px;height:2px;border-radius:99px;background:#fff;content:'';transition:.18s ease}.ksih-menu-lines{position:relative}.ksih-menu-lines::before{position:absolute;left:0;top:-8px}.ksih-menu-lines::after{position:absolute;left:0;top:8px}#${HEADER_ID}.is-open .ksih-menu-lines{background:transparent}#${HEADER_ID}.is-open .ksih-menu-lines::before{top:0;transform:rotate(45deg)}#${HEADER_ID}.is-open .ksih-menu-lines::after{top:0;transform:rotate(-45deg)}
      .ksih-panel{display:none;border-top:1px solid rgba(255,255,255,.09);background:rgba(5,23,44,.985);box-shadow:0 18px 28px rgba(5,21,42,.17)}#${HEADER_ID}.is-open .ksih-panel{display:block}.ksih-panel-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;padding:16px 0 18px}.ksih-panel a{display:flex;align-items:center;justify-content:center;min-height:44px;padding:8px 10px;border:1px solid rgba(255,255,255,.10);border-radius:10px;color:rgba(255,255,255,.88);text-decoration:none;font-size:13px;font-weight:700;background:rgba(255,255,255,.025)}
      @media(max-width:1100px){.ksih-shell{padding:0 22px}.ksih-row{min-height:82px;gap:12px;padding:9px 0}.ksih-badge{min-height:44px;padding:0 12px;font-size:12px}.ksih-emblem{flex-basis:46px;width:46px;height:52px;font-size:24px}.ksih-title{font-size:clamp(18px,2.2vw,23px)}.ksih-sub{font-size:9.5px}.ksih-cta{min-height:50px;padding:0 20px;font-size:14px}.ksih-menu{width:50px;height:50px}}
      @media(max-width:850px){.ksih-badge{display:none}.ksih-brand{gap:12px}.ksih-title{font-size:clamp(17px,2.75vw,21px)}.ksih-cta{padding:0 17px;font-size:13px}}
      @media(max-width:600px){.ksih-shell{padding:0 11px}.ksih-row{min-height:66px;gap:7px;padding:6px 0}.ksih-brand{gap:7px;max-width:calc(100% - 157px)}.ksih-emblem{flex-basis:34px;width:34px;height:38px;font-size:17px;border-width:1.5px;box-shadow:inset 0 0 0 2px rgba(214,170,54,.18)}.ksih-title{font-size:clamp(12px,3.55vw,15px);overflow:hidden;text-overflow:ellipsis}.ksih-sub{display:none}.ksih-actions{gap:6px}.ksih-cta{min-height:42px;max-width:109px;padding:0 9px;font-size:10.5px;border-width:1px}.ksih-cta::before{display:none}.ksih-menu{width:42px;height:42px;border-radius:11px}.ksih-menu-lines,.ksih-menu-lines::before,.ksih-menu-lines::after{width:23px}.ksih-panel-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;padding:12px 0 14px}.ksih-panel a{font-size:12px;min-height:42px}}
      @media(max-width:359px){.ksih-emblem{display:none}.ksih-brand{max-width:calc(100% - 143px)}.ksih-cta{max-width:96px;padding:0 7px;font-size:9.5px}.ksih-menu{width:40px;height:40px}}
    `;
    document.head.appendChild(s);
  }

  function createHeader(){
    if(document.getElementById(HEADER_ID)) return document.getElementById(HEADER_ID);
    const h=document.createElement('header');
    h.id=HEADER_ID;
    h.setAttribute('aria-label','サイトヘッダー');
    h.innerHTML=`<div class="ksih-shell"><div class="ksih-row"><a class="ksih-brand" href="/" aria-label="プロ家庭教師 鈴木雄太 公式サイト"><span class="ksih-badge">🎓 プロ家庭教師</span><span class="ksih-emblem" aria-hidden="true">S</span><span class="ksih-copy"><span class="ksih-title">鈴木雄太のオンライン指導</span><span class="ksih-sub">一人ひとりに最適な指導で、未来を創る</span></span></a><div class="ksih-actions"><a class="ksih-cta" href="#contact">無料相談・お問い合わせ</a><button class="ksih-menu" type="button" aria-expanded="false" aria-controls="ksih-panel" aria-label="メニューを開く"><span class="ksih-menu-lines" aria-hidden="true"></span></button></div></div></div><div id="ksih-panel" class="ksih-panel"><div class="ksih-shell"><nav class="ksih-panel-grid" aria-label="主要メニュー">${links.map(x=>`<a href="${x[1]}">${x[0]}</a>`).join('')}</nav></div></div>`;
    const root=document.getElementById('root');
    if(root) root.insertAdjacentElement('beforebegin',h); else document.body.prepend(h);
    const btn=h.querySelector('.ksih-menu');
    btn.addEventListener('click',()=>{const open=h.classList.toggle('is-open');btn.setAttribute('aria-expanded',String(open));btn.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く');syncOffset();});
    h.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',()=>{h.classList.remove('is-open');btn.setAttribute('aria-expanded','false');syncOffset();}));
    return h;
  }

  function syncOffset(){
    const h=document.getElementById(HEADER_ID); if(!h) return;
    const main=document.querySelector('main');
    const height=Math.ceil(h.getBoundingClientRect().height || (innerWidth<=600?66:82));
    document.documentElement.style.setProperty('--ks-ideal-header-height',height+'px');
    if(main){main.style.setProperty('padding-top',height+'px','important');main.style.setProperty('margin-top','0','important');}
  }

  function boot(){
    showDiagnostic();
    installStyle();
    createHeader();
    syncOffset();
    requestAnimationFrame(syncOffset);
    setTimeout(syncOffset,80);
    setTimeout(syncOffset,500);
    window.addEventListener('resize',()=>requestAnimationFrame(syncOffset),{passive:true});
    document.fonts?.ready?.then(syncOffset);
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
})();
