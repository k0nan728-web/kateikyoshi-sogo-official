(() => {
  'use strict';

  const STYLE_ID = 'mobile-section1-final-style-v1';
  const SECTION_CLASS = 'ks-mobile-section1-final';
  const HEADER_CLASS = 'ks-mobile-header-clean';

  const norm = (s) => (s || '').replace(/\s+/g, '').trim();

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      /* ---------- iPhone mini / first-section final fit ---------- */
      html, body, #root, main { max-width:100% !important; min-width:0 !important; overflow-x:hidden !important; }
      *, *::before, *::after { box-sizing:border-box; }

      .${SECTION_CLASS} {
        width:100% !important;
        max-width:100vw !important;
        min-width:0 !important;
        margin-left:0 !important;
        margin-right:0 !important;
        overflow:hidden !important;
        padding-left:16px !important;
        padding-right:16px !important;
      }
      .${SECTION_CLASS} * { min-width:0 !important; max-width:100% !important; }
      .${SECTION_CLASS} h1,
      .${SECTION_CLASS} h2,
      .${SECTION_CLASS} h3,
      .${SECTION_CLASS} p,
      .${SECTION_CLASS} a,
      .${SECTION_CLASS} span,
      .${SECTION_CLASS} strong {
        overflow:visible !important;
        word-break:keep-all !important;
        overflow-wrap:normal !important;
        line-break:strict !important;
        hyphens:none !important;
        text-wrap:pretty !important;
      }

      .${SECTION_CLASS} .ks-section1-intro {
        text-align:center !important;
        margin-inline:auto !important;
      }
      .${SECTION_CLASS} .ks-section1-intro p {
        max-width:34rem !important;
        margin-inline:auto !important;
        font-size:clamp(14px,4vw,18px) !important;
        line-height:1.85 !important;
      }

      .${SECTION_CLASS} .ks-section1-stats {
        display:grid !important;
        grid-template-columns:repeat(2,minmax(0,1fr)) !important;
        gap:12px !important;
        width:100% !important;
        margin-inline:auto !important;
      }
      .${SECTION_CLASS} .ks-section1-stats > * {
        width:100% !important;
        min-width:0 !important;
        margin:0 !important;
        padding:18px 8px !important;
        overflow:hidden !important;
      }
      .${SECTION_CLASS} .ks-section1-stats strong,
      .${SECTION_CLASS} .ks-section1-stats b {
        display:block !important;
        max-width:100% !important;
        font-size:clamp(25px,8vw,38px) !important;
        line-height:1.15 !important;
        white-space:nowrap !important;
      }
      .${SECTION_CLASS} .ks-section1-stats span,
      .${SECTION_CLASS} .ks-section1-stats small {
        display:block !important;
        font-size:clamp(12px,3.4vw,15px) !important;
        line-height:1.55 !important;
      }

      .${SECTION_CLASS} .ks-section1-linkrow {
        width:100% !important;
        display:flex !important;
        flex-wrap:wrap !important;
        justify-content:center !important;
        align-items:center !important;
        gap:4px 8px !important;
        margin:12px auto !important;
        text-align:center !important;
      }
      .${SECTION_CLASS} .ks-section1-linkrow a {
        display:inline !important;
        font-size:clamp(13px,3.5vw,16px) !important;
        line-height:1.6 !important;
      }

      .${SECTION_CLASS} .ks-section1-route {
        width:100% !important;
        max-width:100% !important;
        overflow:hidden !important;
        padding:14px 16px !important;
        margin:14px auto 0 !important;
        border-radius:14px !important;
      }
      .${SECTION_CLASS} .ks-section1-route * { max-width:100% !important; }
      .${SECTION_CLASS} .ks-section1-route h3 {
        font-size:clamp(16px,4.4vw,20px) !important;
        line-height:1.55 !important;
      }
      .${SECTION_CLASS} .ks-section1-route p {
        font-size:13px !important;
        line-height:1.7 !important;
      }

      /* ---------- clean, legible mobile header ---------- */
      @media (max-width:600px) {
        nav.${HEADER_CLASS} {
          position:sticky !important;
          top:0 !important;
          left:0 !important;
          width:100% !important;
          min-height:68px !important;
          height:auto !important;
          padding:8px 10px !important;
          background:#0b1f3a !important;
          border-bottom:1px solid rgba(255,255,255,.14) !important;
          box-shadow:0 4px 18px rgba(7,24,47,.18) !important;
          overflow:hidden !important;
          z-index:9999 !important;
        }
        nav.${HEADER_CLASS} .ks-mobile-brand {
          color:#fff !important;
          font-family:'Noto Serif JP',serif !important;
          font-size:16px !important;
          font-weight:900 !important;
          line-height:1.2 !important;
          letter-spacing:.01em !important;
          white-space:nowrap !important;
        }
        nav.${HEADER_CLASS} .ks-mobile-brand-sub {
          display:block !important;
          margin-top:2px !important;
          color:rgba(255,255,255,.82) !important;
          font-family:'Noto Sans JP',sans-serif !important;
          font-size:10px !important;
          line-height:1.35 !important;
          white-space:nowrap !important;
        }
        nav.${HEADER_CLASS} .ks-mobile-cta {
          display:flex !important;
          align-items:center !important;
          justify-content:center !important;
          min-height:42px !important;
          padding:7px 12px !important;
          border-radius:999px !important;
          background:#ed3f73 !important;
          color:#fff !important;
          font-size:12px !important;
          font-weight:800 !important;
          line-height:1.2 !important;
          text-decoration:none !important;
          white-space:nowrap !important;
          box-shadow:0 5px 12px rgba(237,63,115,.22) !important;
        }
        nav.${HEADER_CLASS} .ks-mobile-menu {
          display:flex !important;
          align-items:center !important;
          justify-content:center !important;
          width:42px !important;
          height:42px !important;
          flex:0 0 42px !important;
          color:#fff !important;
        }
        nav.${HEADER_CLASS} .ks-mobile-extra { display:none !important; }
      }

      @media (max-width:390px) {
        .${SECTION_CLASS} { padding-left:12px !important; padding-right:12px !important; }
        .${SECTION_CLASS} .ks-section1-stats { gap:10px !important; }
        .${SECTION_CLASS} .ks-section1-stats > * { padding:16px 6px !important; }
        .${SECTION_CLASS} .ks-section1-stats strong,
        .${SECTION_CLASS} .ks-section1-stats b { font-size:27px !important; }
        .${SECTION_CLASS} .ks-section1-stats span,
        .${SECTION_CLASS} .ks-section1-stats small { font-size:11px !important; }
        nav.${HEADER_CLASS} .ks-mobile-brand { font-size:15px !important; }
        nav.${HEADER_CLASS} .ks-mobile-cta { font-size:11px !important; padding-inline:10px !important; }
      }
    `;
    document.head.appendChild(style);
  }

  function markFirstSection() {
    const all = Array.from(document.querySelectorAll('section, article, main > div, #root > div'));
    const anchor = all.find(el => {
      const t = norm(el.textContent);
      return t.includes('うちの子に合う先生が見つからない') && t.includes('20年の経験で解決します');
    });
    if (!anchor) return;

    let section = anchor.closest('section') || anchor;
    section.classList.add(SECTION_CLASS);

    // Mark likely intro, stats and route blocks without relying on generated class names.
    const children = Array.from(section.querySelectorAll('div, p, h2, h3'));
    const stats = children.find(el => {
      const t = norm(el.textContent);
      return t.includes('20年超') && t.includes('1,000名超') && t.includes('300名以上') && t.includes('80%超');
    });
    if (stats) {
      const grid = stats.querySelector(':scope > div') ? stats : stats.parentElement;
      if (grid) grid.classList.add('ks-section1-stats');
    }

    const route = children.find(el => norm(el.textContent).includes('料金・担当体制を比較して選ぶ'));
    if (route) {
      const box = route.closest('a') || route.closest('div');
      if (box) box.classList.add('ks-section1-route');
    }

    const linkRow = children.find(el => {
      const t = norm(el.textContent);
      return t.includes('無料相談') && t.includes('お問い合わせ') && t.includes('体験授業');
    });
    if (linkRow) (linkRow.closest('div') || linkRow).classList.add('ks-section1-linkrow');

    const intro = children.find(el => norm(el.textContent).includes('そんなお悩みを') && norm(el.textContent).includes('20年の経験で解決します'));
    if (intro) (intro.closest('div') || intro).classList.add('ks-section1-intro');
  }

  function cleanHeader() {
    const nav = document.querySelector('nav.fixed.top-0, nav.fixed');
    if (!nav) return;
    nav.classList.add(HEADER_CLASS);

    // Find the visible brand and CTA, then hide secondary desktop navigation on narrow screens.
    const leaves = Array.from(nav.querySelectorAll('*')).filter(el => !el.children.length);
    const brand = leaves.find(el => /プロ家庭教師/.test(norm(el.textContent)) && /鈴木雄太/.test(norm(el.textContent)));
    if (brand) {
      brand.classList.add('ks-mobile-brand');
      const sub = brand.parentElement?.querySelector(':scope > *:not(.ks-mobile-brand)');
      if (sub && /オンライン指導|英検|受験|不登校|通信制/.test(norm(sub.textContent))) sub.classList.add('ks-mobile-brand-sub');
    }

    const cta = leaves.find(el => /無料相談|お問い合わせ/.test(norm(el.textContent)) && norm(el.textContent).length < 40);
    if (cta) cta.classList.add('ks-mobile-cta');

    const buttons = Array.from(nav.querySelectorAll('button'));
    const menu = buttons.find(b => /メニュー|menu/i.test(`${b.getAttribute('aria-label') || ''}${b.textContent || ''}`)) || buttons.find(b => b.querySelector('svg'));
    if (menu) menu.classList.add('ks-mobile-menu');

    nav.querySelectorAll('a,span,div,ul').forEach(el => {
      if (el === brand || el === cta || el === menu) return;
      const t = norm(el.textContent);
      if (el.children.length === 0 && /ALL-IN-ONE/.test(t)) el.classList.add('ks-mobile-extra');
      if (el.tagName === 'UL' && t.length > 20) el.classList.add('ks-mobile-extra');
    });
  }

  function run() {
    injectStyles();
    markFirstSection();
    cleanHeader();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, {once:true});
  else run();
  setTimeout(run, 400);
  setTimeout(run, 1200);
  setTimeout(run, 2500);
})();
