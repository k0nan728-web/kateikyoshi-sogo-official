(() => {
  'use strict';

  const STYLE_ID = 'ks-13mini-final-hotfix-v7';
  const CATEGORY = 'ks-section1-category-heading';
  const SECTION = 'ks-mobile-section1-final';

  const norm = (value) => String(value || '').replace(/\s+/g, '').replace(/、/g, '・').trim();

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      html, body, #root, main { width:100% !important; max-width:100% !important; min-width:0 !important; overflow-x:hidden !important; }
      *, *::before, *::after { box-sizing:border-box; }
      img, video, canvas, svg { max-width:100% !important; }

      /* Remove the old floating CTA bars that cover the hero on phones. */
      .p100-sticky, .pc-mobile-cta { display:none !important; }

      /* Header: one stable three-column layout. */
      nav.fixed.top-0 {
        position:fixed !important;
        top:0 !important; left:0 !important; right:0 !important;
        width:100% !important; max-width:100vw !important; min-width:0 !important;
        height:70px !important; min-height:70px !important;
        padding:0 !important; margin:0 !important;
        z-index:10000 !important; overflow:visible !important;
        background:#081a32 !important;
        border:0 !important; border-bottom:1px solid rgba(240,207,114,.45) !important;
        box-shadow:0 8px 24px rgba(4,16,35,.18) !important;
      }
      nav.fixed.top-0 > .container {
        width:100% !important; max-width:1280px !important; min-width:0 !important;
        height:70px !important; padding:0 12px !important; margin:0 auto !important;
      }
      nav.fixed.top-0 > .container > div:first-child {
        width:100% !important; height:70px !important; min-width:0 !important;
        display:grid !important;
        grid-template-columns:minmax(0,1fr) auto 42px !important;
        align-items:center !important; column-gap:8px !important;
        padding:0 !important; margin:0 !important;
      }
      nav.fixed.top-0 > .container > div:first-child > a {
        min-width:0 !important; max-width:100% !important; width:100% !important;
        overflow:hidden !important; display:flex !important; align-items:center !important;
        gap:8px !important; text-decoration:none !important;
      }
      nav.fixed.top-0 > .container > div:first-child > a > div:first-child {
        flex:0 0 auto !important; width:auto !important; max-width:none !important;
        padding:4px 7px !important; border-radius:5px !important;
        background:#d4af37 !important; color:#081a32 !important;
      }
      nav.fixed.top-0 > .container > div:first-child > a > div:first-child span {
        color:#081a32 !important; font-size:10px !important; font-weight:900 !important;
        line-height:1.1 !important; white-space:nowrap !important;
      }
      nav.fixed.top-0 > .container > div:first-child > a > div:nth-child(2) {
        flex:1 1 auto !important; min-width:0 !important; max-width:100% !important; overflow:hidden !important;
      }
      nav.fixed.top-0 > .container > div:first-child > a > div:nth-child(2) > div,
      nav.fixed.top-0 > .container > div:first-child > a > div:nth-child(2) > div > span {
        min-width:0 !important; max-width:100% !important;
      }
      nav.fixed.top-0 > .container > div:first-child > a > div:nth-child(2) span:first-child {
        display:block !important; max-width:100% !important;
        color:#fff !important; font-family:'Noto Serif JP',serif !important;
        font-size:16px !important; font-weight:900 !important; line-height:1.2 !important;
        white-space:nowrap !important; overflow:hidden !important; text-overflow:ellipsis !important;
      }
      nav.fixed.top-0 > .container > div:first-child > a > div:nth-child(2) span:nth-child(2) { display:none !important; }
      nav.fixed.top-0 > .container > div:first-child > a > div:nth-child(2) > span { display:none !important; }
      nav.fixed.top-0 > .container > div:first-child > div:not(:last-child) { min-width:0 !important; }
      nav.fixed.top-0 > .container > div:first-child > div:last-child {
        grid-column:2 !important; display:flex !important; align-items:center !important;
        min-width:0 !important; width:auto !important;
      }
      nav.fixed.top-0 > .container > div:first-child > div:last-child a {
        display:inline-flex !important; align-items:center !important; justify-content:center !important;
        width:auto !important; min-width:112px !important; max-width:145px !important; height:42px !important;
        padding:0 10px !important; border-radius:999px !important;
        background:#fff !important; color:#10243e !important; border:1px solid rgba(255,255,255,.7) !important;
        font-size:12px !important; font-weight:900 !important; line-height:1.2 !important;
        white-space:nowrap !important; overflow:hidden !important; text-overflow:ellipsis !important;
        text-decoration:none !important;
      }
      nav.fixed.top-0 > .container > div:first-child > button {
        grid-column:3 !important; width:42px !important; height:42px !important; min-width:42px !important;
        padding:0 !important; margin:0 !important; display:grid !important; place-items:center !important;
        color:#fff !important; border:1px solid rgba(255,255,255,.22) !important;
        border-radius:11px !important; background:rgba(255,255,255,.04) !important;
      }
      nav.fixed.top-0 > .container > div:first-child > button svg { width:25px !important; height:25px !important; }

      /* If the active header is the JS-built 100-point version, keep it equally stable. */
      nav.ks-premium-header .ks-header-shell {
        width:100% !important; max-width:1280px !important; min-width:0 !important;
        height:70px !important; padding:0 12px !important; margin:0 auto !important;
        display:grid !important; grid-template-columns:minmax(0,1fr) auto auto !important;
        align-items:center !important; gap:8px !important;
      }
      nav.ks-premium-header .ks-header-brand { min-width:0 !important; max-width:100% !important; overflow:hidden !important; }
      nav.ks-premium-header .ks-header-nav { display:none !important; }
      nav.ks-premium-header .ks-header-actions { display:flex !important; align-items:center !important; gap:8px !important; min-width:0 !important; }
      nav.ks-premium-header .ks-header-cta { min-width:112px !important; max-width:145px !important; height:42px !important; padding:0 10px !important; font-size:12px !important; }
      nav.ks-premium-header .ks-header-menu { width:42px !important; height:42px !important; min-width:42px !important; }

      /* Hero: stable width, natural Japanese wrapping, no overlap. */
      main { padding-top:70px !important; padding-bottom:24px !important; }
      main > section:first-child,
      main > .${SECTION} {
        width:100% !important; max-width:100% !important; min-width:0 !important;
        overflow:hidden !important; margin:0 !important;
      }
      main > section:first-child > div,
      main > .${SECTION} > div {
        width:100% !important; max-width:1200px !important; min-width:0 !important;
        margin-inline:auto !important; padding-left:16px !important; padding-right:16px !important;
      }
      main > section:first-child h1,
      main > section:first-child h2,
      main > section:first-child h3,
      main > section:first-child p,
      main > .${SECTION} h1,
      main > .${SECTION} h2,
      main > .${SECTION} h3,
      main > .${SECTION} p {
        max-width:100% !important; min-width:0 !important;
        white-space:normal !important; word-break:normal !important;
        overflow-wrap:break-word !important; line-break:strict !important; hyphens:none !important;
      }

      .${SECTION} .${CATEGORY} {
        display:grid !important; grid-template-columns:repeat(2,minmax(0,1fr)) !important;
        align-items:center !important; justify-items:center !important;
        width:min(900px,100%) !important; max-width:100% !important;
        margin:0 auto 26px !important; padding:0 4px !important; gap:10px !important;
        color:#17457f !important; font-family:'Noto Serif JP',serif !important;
        font-size:clamp(20px,5.4vw,36px) !important; font-weight:900 !important;
        line-height:1.35 !important; text-align:center !important;
      }
      .${SECTION} .${CATEGORY} .ks-section1-category-item {
        display:flex !important; align-items:center !important; justify-content:center !important;
        width:100% !important; min-width:0 !important; max-width:100% !important;
        white-space:normal !important; overflow-wrap:break-word !important; line-break:strict !important;
        color:inherit !important; font:inherit !important; line-height:inherit !important;
        text-wrap:balance !important;
      }
      .${SECTION} .ks-section1-stats,
      main > section:first-child .grid.grid-cols-1.sm\\:grid-cols-2 {
        display:grid !important; grid-template-columns:repeat(2,minmax(0,1fr)) !important;
        gap:10px !important; width:100% !important; max-width:100% !important; min-width:0 !important;
      }
      .${SECTION} .ks-section1-stats > *,
      main > section:first-child .grid.grid-cols-1.sm\\:grid-cols-2 > * {
        min-width:0 !important; max-width:100% !important; overflow:hidden !important;
      }

      @media(max-width:390px){
        nav.fixed.top-0 { height:68px !important; min-height:68px !important; }
        nav.fixed.top-0 > .container { height:68px !important; padding:0 8px !important; }
        nav.fixed.top-0 > .container > div:first-child { height:68px !important; grid-template-columns:minmax(0,1fr) auto 39px !important; column-gap:5px !important; }
        nav.fixed.top-0 > .container > div:first-child > a > div:first-child { display:none !important; }
        nav.fixed.top-0 > .container > div:first-child > a > div:nth-child(2) span:first-child { font-size:14px !important; }
        nav.fixed.top-0 > .container > div:first-child > div:last-child a { min-width:96px !important; max-width:118px !important; height:40px !important; font-size:11px !important; padding:0 7px !important; }
        nav.fixed.top-0 > .container > div:first-child > button { width:39px !important; height:39px !important; min-width:39px !important; }
        nav.ks-premium-header .ks-header-shell { height:68px !important; padding:0 8px !important; grid-template-columns:minmax(0,1fr) auto auto !important; gap:5px !important; }
        nav.ks-premium-header .ks-header-cta { min-width:96px !important; max-width:118px !important; height:40px !important; font-size:11px !important; }
        nav.ks-premium-header .ks-header-menu { width:39px !important; height:39px !important; min-width:39px !important; }
        main { padding-top:68px !important; }
        main > section:first-child > div, main > .${SECTION} > div { padding-left:12px !important; padding-right:12px !important; }
        .${SECTION} .${CATEGORY} { grid-template-columns:repeat(2,minmax(0,1fr)) !important; gap:6px !important; font-size:20px !important; line-height:1.35 !important; margin-bottom:20px !important; padding:0 !important; }
        .${SECTION} .${CATEGORY} .ks-section1-category-item { min-height:1.35em !important; }
      }
    `;
    document.head.appendChild(style);
  }

  function repairCategory() {
    const root = document.getElementById('root') || document;
    let section = root.querySelector('.' + SECTION);
    const candidates = Array.from(root.querySelectorAll('section,article,div,h1,h2,h3,p,span,strong'));
    if (!section) {
      const anchor = candidates.find((el) => {
        const t = norm(el.textContent);
        return t.includes('うちの子に合う先生が見つからない') && t.includes('20年の経験');
      });
      if (anchor) {
        section = anchor.closest('section') || anchor.parentElement;
        if (section) section.classList.add(SECTION);
      }
    }
    if (!section) return;

    let target = section.querySelector('.' + CATEGORY);
    if (!target) {
      target = Array.from(section.querySelectorAll('h1,h2,h3,p,div,span,strong')).find((el) => norm(el.textContent) === '英検・受験・不登校・通信制高校');
      if (target) {
        target.classList.add(CATEGORY);
        target.setAttribute('aria-label','英検・受験／不登校・通信制高校');
        target.innerHTML = '<span class="ks-section1-category-item">英検・受験</span><span class="ks-section1-category-item">不登校・通信制高校</span>';
      }
    }

    const stats = Array.from(section.querySelectorAll('div')).find((el) => {
      const t = norm(el.textContent);
      return t.includes('20年超') && t.includes('1,000名超') && t.includes('300名以上') && t.includes('80%超');
    });
    if (stats) {
      const grid = stats.matches('.grid') ? stats : (stats.querySelector(':scope > .grid') || stats);
      if (grid) grid.classList.add('ks-section1-stats');
    }
  }

  function stabilizeHeader() {
    const nav = document.querySelector('nav.fixed.top-0, nav.fixed');
    if (!nav) return;
    nav.classList.add('ks-mobile-header-final');

    // Remove duplicate legacy/mobile floating headers if more than one nav exists.
    const navs = Array.from(document.querySelectorAll('nav.fixed.top-0, nav.fixed'));
    navs.slice(1).forEach((n) => { if (n !== nav) n.style.display = 'none'; });

    nav.querySelectorAll('*').forEach((el) => {
      if (el.children.length) return;
      const text = (el.textContent || '').replace(/\s+/g,' ').trim();
      if (text === 'ALL-IN-ONE') el.style.display = 'none';
      if (text.includes('ALL-IN-ONE')) el.textContent = text.replace(/ALL-IN-ONE\s*\|?\s*/g,'').trim();
    });
  }

  function repair() {
    injectStyles();
    stabilizeHeader();
    repairCategory();
  }

  repair();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', repair, { once:true });
  [100,300,700,1200,2000,3500].forEach((ms) => setTimeout(repair, ms));
  const observer = new MutationObserver(() => repair());
  observer.observe(document.documentElement, { childList:true, subtree:true });
})();
