(() => {
  'use strict';

  const STYLE_ID = 'mobile-section1-final-style-v2';
  const SECTION_CLASS = 'ks-mobile-section1-final';
  const HEADER_CLASS = 'ks-mobile-header-clean';

  const norm = (s) => (s || '').replace(/\s+/g, '').trim();

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      *, *::before, *::after { box-sizing:border-box; }
      html, body, #root, main { max-width:100% !important; min-width:0 !important; overflow-x:hidden !important; }

      /* ===== First section: never allow horizontal overflow ===== */
      .${SECTION_CLASS},
      .${SECTION_CLASS} > *,
      .${SECTION_CLASS} > * > * {
        min-width:0 !important;
        max-width:100% !important;
      }
      .${SECTION_CLASS} {
        width:100% !important;
        max-width:100vw !important;
        margin-inline:0 !important;
        overflow:hidden !important;
        padding-left:16px !important;
        padding-right:16px !important;
      }
      .${SECTION_CLASS} h1,
      .${SECTION_CLASS} h2,
      .${SECTION_CLASS} h3,
      .${SECTION_CLASS} p,
      .${SECTION_CLASS} a,
      .${SECTION_CLASS} span,
      .${SECTION_CLASS} strong,
      .${SECTION_CLASS} small {
        max-width:100% !important;
        overflow-wrap:normal !important;
        word-break:keep-all !important;
        line-break:strict !important;
        hyphens:none !important;
        white-space:normal !important;
        text-wrap:pretty !important;
      }
      .${SECTION_CLASS} .ks-section1-intro {
        width:100% !important;
        max-width:34rem !important;
        margin-inline:auto !important;
        text-align:center !important;
      }
      .${SECTION_CLASS} .ks-section1-intro p {
        width:100% !important;
        max-width:100% !important;
        margin-inline:auto !important;
        font-size:clamp(14px,4vw,18px) !important;
        line-height:1.85 !important;
      }
      .${SECTION_CLASS} .ks-section1-stats {
        display:grid !important;
        grid-template-columns:repeat(2,minmax(0,1fr)) !important;
        gap:12px !important;
        width:100% !important;
        max-width:100% !important;
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
        max-width:100% !important;
        font-size:clamp(12px,3.4vw,15px) !important;
        line-height:1.55 !important;
      }
      .${SECTION_CLASS} .ks-section1-linkrow {
        width:100% !important;
        max-width:100% !important;
        display:flex !important;
        flex-wrap:wrap !important;
        justify-content:center !important;
        align-items:center !important;
        gap:3px 7px !important;
        margin:12px auto !important;
        text-align:center !important;
      }
      .${SECTION_CLASS} .ks-section1-linkrow a {
        display:inline !important;
        max-width:100% !important;
        font-size:clamp(12px,3.35vw,16px) !important;
        line-height:1.6 !important;
      }

      /* Comparison route: one clean vertical reading path on small screens. */
      .${SECTION_CLASS} .ks-section1-route {
        width:100% !important;
        max-width:100% !important;
        min-width:0 !important;
        margin:14px auto 0 !important;
        padding:14px 14px !important;
        overflow:hidden !important;
        border-radius:16px !important;
        display:flex !important;
        flex-direction:column !important;
        align-items:center !important;
        justify-content:center !important;
        gap:5px !important;
        text-align:center !important;
      }
      .${SECTION_CLASS} .ks-section1-route * {
        max-width:100% !important;
        min-width:0 !important;
      }
      .${SECTION_CLASS} .ks-section1-route h3 {
        width:100% !important;
        margin:0 !important;
        font-size:clamp(16px,4.6vw,22px) !important;
        line-height:1.45 !important;
        white-space:normal !important;
        word-break:keep-all !important;
        text-align:center !important;
      }
      .${SECTION_CLASS} .ks-section1-route p {
        width:100% !important;
        margin:0 !important;
        font-size:12px !important;
        line-height:1.65 !important;
        white-space:normal !important;
      }

      /* ===== Mobile header: brand first, action second, menu third ===== */
      @media (max-width:600px) {
        nav.${HEADER_CLASS} {
          position:sticky !important;
          top:0 !important;
          left:0 !important;
          width:100% !important;
          min-width:0 !important;
          min-height:64px !important;
          height:auto !important;
          padding:8px 10px !important;
          background:#081a32 !important;
          border-bottom:1px solid rgba(255,255,255,.14) !important;
          box-shadow:0 5px 18px rgba(7,24,47,.20) !important;
          backdrop-filter:none !important;
          overflow:hidden !important;
          z-index:9999 !important;
        }
        nav.${HEADER_CLASS} > .container,
        nav.${HEADER_CLASS} > .container > div,
        nav.${HEADER_CLASS} > div:first-child,
        nav.${HEADER_CLASS} > div:first-child > div {
          width:100% !important;
          max-width:100% !important;
          min-width:0 !important;
        }
        nav.${HEADER_CLASS} > .container > div:first-child,
        nav.${HEADER_CLASS} > div:first-child {
          min-height:48px !important;
          height:auto !important;
          padding:0 !important;
          display:grid !important;
          grid-template-columns:minmax(0,1fr) auto 40px !important;
          align-items:center !important;
          column-gap:8px !important;
        }
        nav.${HEADER_CLASS} .ks-mobile-brand {
          grid-column:1 !important;
          grid-row:1 !important;
          display:flex !important;
          flex-direction:column !important;
          justify-content:center !important;
          align-items:flex-start !important;
          width:100% !important;
          min-width:0 !important;
          margin:0 !important;
          padding:0 !important;
          color:#fff !important;
          font-family:'Noto Serif JP',serif !important;
          font-size:15px !important;
          font-weight:900 !important;
          line-height:1.15 !important;
          letter-spacing:.01em !important;
          white-space:nowrap !important;
          text-decoration:none !important;
        }
        nav.${HEADER_CLASS} .ks-mobile-brand-main {
          display:block !important;
          color:#fff !important;
          font-size:15px !important;
          line-height:1.15 !important;
          white-space:nowrap !important;
        }
        nav.${HEADER_CLASS} .ks-mobile-brand-sub {
          display:block !important;
          margin-top:3px !important;
          color:rgba(255,255,255,.78) !important;
          font-family:'Noto Sans JP',sans-serif !important;
          font-size:9px !important;
          font-weight:600 !important;
          line-height:1.2 !important;
          white-space:nowrap !important;
          letter-spacing:.01em !important;
        }
        nav.${HEADER_CLASS} .ks-mobile-cta {
          grid-column:2 !important;
          grid-row:1 !important;
          display:flex !important;
          align-items:center !important;
          justify-content:center !important;
          width:auto !important;
          min-width:96px !important;
          min-height:38px !important;
          margin:0 !important;
          padding:7px 11px !important;
          border:1px solid rgba(255,255,255,.18) !important;
          border-radius:999px !important;
          background:#ed3f73 !important;
          color:#fff !important;
          font-family:'Noto Sans JP',sans-serif !important;
          font-size:11px !important;
          font-weight:800 !important;
          line-height:1.2 !important;
          white-space:nowrap !important;
          text-decoration:none !important;
          box-shadow:0 5px 12px rgba(237,63,115,.20) !important;
        }
        nav.${HEADER_CLASS} .ks-mobile-menu {
          grid-column:3 !important;
          grid-row:1 !important;
          display:flex !important;
          align-items:center !important;
          justify-content:center !important;
          width:40px !important;
          height:40px !important;
          min-width:40px !important;
          flex:0 0 40px !important;
          margin:0 !important;
          padding:0 !important;
          color:#fff !important;
          background:transparent !important;
          border:0 !important;
        }
        nav.${HEADER_CLASS} .ks-mobile-menu svg {
          width:26px !important;
          height:26px !important;
          stroke:#5ea8ff !important;
          color:#5ea8ff !important;
        }
        nav.${HEADER_CLASS} > div:nth-child(2),
        nav.${HEADER_CLASS} > .container > div:nth-child(2),
        nav.${HEADER_CLASS} .ks-mobile-extra {
          display:none !important;
        }
      }

      @media (max-width:390px) {
        .${SECTION_CLASS} { padding-left:12px !important; padding-right:12px !important; }
        .${SECTION_CLASS} .ks-section1-stats { gap:10px !important; }
        .${SECTION_CLASS} .ks-section1-stats > * { padding:16px 6px !important; }
        .${SECTION_CLASS} .ks-section1-stats strong,
        .${SECTION_CLASS} .ks-section1-stats b { font-size:27px !important; }
        .${SECTION_CLASS} .ks-section1-stats span,
        .${SECTION_CLASS} .ks-section1-stats small { font-size:11px !important; }
        .${SECTION_CLASS} .ks-section1-route { padding:13px 10px !important; }
        .${SECTION_CLASS} .ks-section1-route h3 { font-size:17px !important; line-height:1.5 !important; }
        nav.${HEADER_CLASS} > .container > div:first-child,
        nav.${HEADER_CLASS} > div:first-child { grid-template-columns:minmax(0,1fr) auto 36px !important; column-gap:6px !important; }
        nav.${HEADER_CLASS} .ks-mobile-brand,
        nav.${HEADER_CLASS} .ks-mobile-brand-main { font-size:14px !important; }
        nav.${HEADER_CLASS} .ks-mobile-brand-sub { font-size:8px !important; }
        nav.${HEADER_CLASS} .ks-mobile-cta { min-width:91px !important; padding-inline:9px !important; font-size:10px !important; }
        nav.${HEADER_CLASS} .ks-mobile-menu { width:36px !important; min-width:36px !important; }
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

    const section = anchor.closest('section') || anchor;
    section.classList.add(SECTION_CLASS);

    const children = Array.from(section.querySelectorAll('div, p, h2, h3'));
    const stats = children.find(el => {
      const t = norm(el.textContent);
      return t.includes('20年超') && t.includes('1,000名超') && t.includes('300名以上') && t.includes('80%超');
    });
    if (stats) {
      const grid = stats.querySelector(':scope > div') ? stats : stats.parentElement;
      if (grid) grid.classList.add('ks-section1-stats');
    }

    const routeText = children.find(el => norm(el.textContent).includes('料金・担当体制を比較して選ぶ'));
    if (routeText) {
      const box = routeText.closest('a') || routeText.closest('aside') || routeText.parentElement;
      if (box) box.classList.add('ks-section1-route');
    }

    const linkRow = children.find(el => {
      const t = norm(el.textContent);
      return t.includes('無料相談') && t.includes('お問い合わせ') && t.includes('体験授業');
    });
    if (linkRow) (linkRow.closest('div') || linkRow).classList.add('ks-section1-linkrow');

    const intro = children.find(el => {
      const t = norm(el.textContent);
      return t.includes('そんなお悩みを') && t.includes('20年の経験で解決します');
    });
    if (intro) (intro.closest('div') || intro).classList.add('ks-section1-intro');

    // Remove accidental orphan punctuation produced by prior mobile wrappers.
    children.forEach(el => {
      if (norm(el.textContent) === '。' && el.children.length === 0) el.style.display = 'none';
    });
  }

  function cleanHeader() {
    const nav = document.querySelector('nav.fixed.top-0, nav.fixed');
    if (!nav) return;
    nav.classList.add(HEADER_CLASS);

    // Use the actual clickable elements, not leaf spans, so CTA styling cannot drift.
    const anchors = Array.from(nav.querySelectorAll('a'));
    const brandLink = anchors.find(a => {
      const t = norm(a.textContent);
      return t.includes('プロ家庭教師') && t.includes('鈴木雄太');
    });
    if (brandLink) {
      brandLink.classList.add('ks-mobile-brand');
      if (!brandLink.dataset.mobileBrandV2) {
        brandLink.dataset.mobileBrandV2 = '1';
        brandLink.innerHTML = `
          <span class="ks-mobile-brand-main">プロ家庭教師　鈴木雄太</span>
          <span class="ks-mobile-brand-sub">英検・受験・不登校・通信制を一人で担当</span>
        `;
      }
    }

    const cta = anchors.find(a => {
      const t = norm(a.textContent);
      return /無料相談|お問い合わせ/.test(t) && t.length < 40;
    });
    if (cta) cta.classList.add('ks-mobile-cta');

    const buttons = Array.from(nav.querySelectorAll('button'));
    const menu = buttons.find(b => /メニュー|menu/i.test(`${b.getAttribute('aria-label') || ''}${b.textContent || ''}`)) || buttons.find(b => b.querySelector('svg'));
    if (menu) menu.classList.add('ks-mobile-menu');

    nav.querySelectorAll('a,span,div,ul').forEach(el => {
      if (el === brandLink || el === cta || el === menu) return;
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
