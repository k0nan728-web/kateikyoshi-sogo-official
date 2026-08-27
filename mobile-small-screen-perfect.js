(() => {
  "use strict";

  const STYLE_ID = "ks-premium-header-v1";
  const HEADER_CLASS = "ks-premium-header";

  const escapeHtml = (value) => String(value || "").replace(/[&<>\"]/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
  }[c]));

  const injectStyles = () => {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      :root {
        --ks-header-navy:#071a31;
        --ks-header-navy-2:#0d2848;
        --ks-header-ink:#f8f4ea;
        --ks-header-gold:#d8aa3d;
        --ks-header-gold-light:#f0cf72;
        --ks-header-pink:#e83e73;
      }

      html { scroll-padding-top:88px !important; }
      body { overflow-x:hidden !important; }

      /* Premium header: one coherent component, rather than several competing bars. */
      nav.fixed.top-0.${HEADER_CLASS} {
        position:fixed !important;
        inset:0 0 auto 0 !important;
        width:100% !important;
        max-width:100vw !important;
        height:86px !important;
        min-height:86px !important;
        padding:0 !important;
        margin:0 !important;
        z-index:1000 !important;
        overflow:visible !important;
        color:var(--ks-header-ink) !important;
        background:rgba(7,26,49,.98) !important;
        border:0 !important;
        border-bottom:1px solid rgba(240,207,114,.25) !important;
        box-shadow:0 10px 35px rgba(4,16,31,.18) !important;
        backdrop-filter:blur(16px) !important;
        -webkit-backdrop-filter:blur(16px) !important;
      }

      nav.fixed.top-0.${HEADER_CLASS}::after {
        content:"";
        position:absolute;
        left:0; right:0; bottom:-2px;
        height:2px;
        background:linear-gradient(90deg,transparent 0%,var(--ks-header-gold) 18%,var(--ks-header-gold-light) 50%,var(--ks-header-gold) 82%,transparent 100%);
        opacity:.9;
      }

      nav.fixed.top-0.${HEADER_CLASS} .ks-header-shell {
        width:min(100%,1280px);
        height:86px;
        margin:0 auto;
        padding:0 28px;
        display:grid;
        grid-template-columns:minmax(230px,1fr) auto auto;
        align-items:center;
        gap:26px;
        box-sizing:border-box;
      }

      .ks-header-brand {
        min-width:0;
        display:flex;
        align-items:center;
        gap:14px;
        color:var(--ks-header-ink) !important;
        text-decoration:none !important;
      }
      .ks-header-mark {
        flex:0 0 auto;
        width:40px;
        height:40px;
        display:grid;
        place-items:center;
        border:1px solid rgba(240,207,114,.65);
        border-radius:11px;
        color:var(--ks-header-gold-light);
        font-family:"Noto Serif JP",serif;
        font-weight:900;
        font-size:18px;
        line-height:1;
        background:linear-gradient(145deg,rgba(216,170,61,.14),rgba(255,255,255,.025));
      }
      .ks-header-brand-copy { min-width:0; display:block; }
      .ks-header-kicker {
        display:block;
        margin:0 0 2px;
        color:var(--ks-header-gold-light);
        font-size:9px;
        font-weight:800;
        letter-spacing:.18em;
        line-height:1.2;
        white-space:nowrap;
      }
      .ks-header-name {
        display:block;
        color:#fff;
        font-family:"Noto Serif JP",serif;
        font-size:clamp(17px,1.55vw,22px);
        font-weight:900;
        line-height:1.25;
        letter-spacing:.015em;
        white-space:nowrap;
      }
      .ks-header-name em { color:#fff; font-style:normal; }
      .ks-header-name span { color:var(--ks-header-gold-light); }

      .ks-header-nav {
        display:flex;
        align-items:center;
        justify-content:center;
        gap:4px;
        min-width:0;
      }
      .ks-header-nav a {
        position:relative;
        display:inline-flex;
        align-items:center;
        justify-content:center;
        min-height:40px;
        padding:0 9px;
        color:rgba(255,255,255,.86) !important;
        text-decoration:none !important;
        font-size:12px;
        font-weight:700;
        letter-spacing:.015em;
        white-space:nowrap;
        border-radius:9px;
        transition:background .18s ease,color .18s ease,transform .18s ease;
      }
      .ks-header-nav a:hover,
      .ks-header-nav a:focus-visible {
        color:#fff !important;
        background:rgba(255,255,255,.09);
        transform:translateY(-1px);
      }
      .ks-header-nav a::after {
        content:"";
        position:absolute;
        left:10px; right:10px; bottom:5px;
        height:1px;
        transform:scaleX(0);
        transform-origin:center;
        background:var(--ks-header-gold-light);
        transition:transform .18s ease;
      }
      .ks-header-nav a:hover::after,
      .ks-header-nav a:focus-visible::after { transform:scaleX(1); }

      .ks-header-actions { display:flex; align-items:center; gap:9px; }
      .ks-header-cta {
        display:inline-flex !important;
        align-items:center;
        justify-content:center;
        min-width:116px;
        min-height:46px;
        padding:0 18px;
        box-sizing:border-box;
        border-radius:999px !important;
        color:#fff !important;
        background:linear-gradient(135deg,#ef4a7f 0%,var(--ks-header-pink) 100%) !important;
        border:1px solid rgba(255,255,255,.2) !important;
        box-shadow:0 9px 22px rgba(232,62,115,.24) !important;
        text-decoration:none !important;
        font-size:13px !important;
        font-weight:900 !important;
        letter-spacing:.03em;
        white-space:nowrap;
        transition:transform .18s ease,box-shadow .18s ease;
      }
      .ks-header-cta:hover { transform:translateY(-2px); box-shadow:0 13px 28px rgba(232,62,115,.34) !important; }

      .ks-header-menu {
        width:46px;
        height:46px;
        display:grid;
        place-items:center;
        padding:0;
        border:1px solid rgba(255,255,255,.2);
        border-radius:12px;
        background:rgba(255,255,255,.05);
        color:#fff;
        cursor:pointer;
      }
      .ks-header-menu-bars { width:20px; height:16px; display:flex; flex-direction:column; justify-content:space-between; }
      .ks-header-menu-bars i { display:block; width:100%; height:2px; border-radius:2px; background:#f0cf72; transition:transform .2s ease,opacity .2s ease; }
      .ks-header-menu[aria-expanded="true"] .ks-header-menu-bars i:nth-child(1){ transform:translateY(7px) rotate(45deg); }
      .ks-header-menu[aria-expanded="true"] .ks-header-menu-bars i:nth-child(2){ opacity:0; }
      .ks-header-menu[aria-expanded="true"] .ks-header-menu-bars i:nth-child(3){ transform:translateY(-7px) rotate(-45deg); }

      .ks-header-drawer {
        position:absolute;
        top:86px; left:0; right:0;
        padding:16px 20px 20px;
        background:rgba(7,26,49,.985);
        border-top:1px solid rgba(240,207,114,.16);
        box-shadow:0 20px 35px rgba(4,16,31,.22);
        display:none;
      }
      .ks-header-drawer.is-open { display:block; }
      .ks-header-drawer-grid {
        width:min(100%,900px);
        margin:0 auto;
        display:grid;
        grid-template-columns:repeat(4,1fr);
        gap:8px;
      }
      .ks-header-drawer a {
        min-height:46px;
        display:flex;
        align-items:center;
        padding:0 14px;
        box-sizing:border-box;
        border:1px solid rgba(255,255,255,.08);
        border-radius:10px;
        color:#fff !important;
        background:rgba(255,255,255,.035);
        text-decoration:none !important;
        font-size:13px;
        font-weight:700;
      }
      .ks-header-drawer a:hover { background:rgba(216,170,61,.1); border-color:rgba(240,207,114,.35); }

      /* Remove legacy multi-row/header badges that caused the old cramped appearance. */
      nav.fixed.top-0.${HEADER_CLASS} > .container,
      nav.fixed.top-0.${HEADER_CLASS} > div:not(.ks-header-shell),
      nav.fixed.top-0.${HEADER_CLASS} .ks-hide-all-in-one { display:none !important; }

      @media (max-width:1100px) {
        nav.fixed.top-0.${HEADER_CLASS} .ks-header-shell { grid-template-columns:minmax(210px,1fr) auto auto; gap:14px; padding:0 20px; }
        .ks-header-nav { display:none; }
      }

      @media (max-width:767px) {
        html { scroll-padding-top:70px !important; }
        nav.fixed.top-0.${HEADER_CLASS} { height:70px !important; min-height:70px !important; }
        nav.fixed.top-0.${HEADER_CLASS} .ks-header-shell { height:70px; padding:0 12px; grid-template-columns:minmax(0,1fr) auto auto; gap:7px; }
        .ks-header-mark { width:34px; height:34px; border-radius:9px; font-size:15px; }
        .ks-header-brand { gap:9px; }
        .ks-header-kicker { font-size:7px; letter-spacing:.14em; margin-bottom:1px; }
        .ks-header-name { font-size:clamp(14px,4.15vw,17px); letter-spacing:0; }
        .ks-header-cta { min-width:92px; min-height:40px; padding:0 11px; font-size:12px !important; }
        .ks-header-menu { width:40px; height:40px; border-radius:10px; }
        .ks-header-drawer { top:70px; padding:12px; }
        .ks-header-drawer-grid { grid-template-columns:repeat(2,minmax(0,1fr)); gap:7px; }
        .ks-header-drawer a { min-height:44px; padding:0 11px; font-size:12px; }
      }

      @media (max-width:390px) {
        nav.fixed.top-0.${HEADER_CLASS} .ks-header-shell { padding:0 9px; gap:5px; }
        .ks-header-mark { display:none; }
        .ks-header-name { font-size:14px; }
        .ks-header-kicker { font-size:6.5px; }
        .ks-header-cta { min-width:88px; padding:0 9px; font-size:11.5px !important; }
        .ks-header-menu { width:38px; height:38px; }
      }

      @media (min-width:768px) {
        .ks-header-menu { display:none; }
      }

      @media (prefers-reduced-motion:reduce) {
        .ks-header-nav a,.ks-header-cta,.ks-header-menu-bars i { transition:none !important; }
      }
    `;
    document.head.appendChild(style);
  };

  const links = [
    ["こんな方に", "#for-you"],
    ["講師紹介", "#instructor"],
    ["指導の特徴", "#why"],
    ["コース一覧", "#courses"],
    ["不登校・通信制", "#futouko"],
    ["実績・お客様の声", "#testimonials"],
    ["料金", "#pricing"],
    ["よくある質問", "#faq"],
    ["お問い合わせ", "#contact"],
  ];

  const makeLink = ([label, href], className = "") => `<a class="${className}" href="${href}">${escapeHtml(label)}</a>`;

  const buildHeader = (header) => {
    if (!header || header.dataset.ksPremiumBuilt === "1") return;
    header.dataset.ksPremiumBuilt = "1";
    header.classList.add(HEADER_CLASS);
    header.innerHTML = `
      <div class="ks-header-shell">
        <a class="ks-header-brand" href="#top" aria-label="プロ家庭教師 鈴木雄太 公式サイト">
          <span class="ks-header-mark" aria-hidden="true">鈴</span>
          <span class="ks-header-brand-copy">
            <span class="ks-header-kicker">PROFESSIONAL PRIVATE TUTOR</span>
            <span class="ks-header-name"><em>プロ家庭教師</em> <span>鈴木雄太</span></span>
          </span>
        </a>
        <nav class="ks-header-nav" aria-label="主要ナビゲーション">
          ${links.slice(0,6).map((x) => makeLink(x)).join("")}
        </nav>
        <div class="ks-header-actions">
          <a class="ks-header-cta" href="#contact">無料相談</a>
          <button class="ks-header-menu" type="button" aria-label="メニューを開く" aria-expanded="false" aria-controls="ks-header-drawer">
            <span class="ks-header-menu-bars" aria-hidden="true"><i></i><i></i><i></i></span>
          </button>
        </div>
      </div>
      <div id="ks-header-drawer" class="ks-header-drawer" aria-hidden="true">
        <div class="ks-header-drawer-grid">
          ${links.map((x) => makeLink(x)).join("")}
        </div>
      </div>
    `;

    const menu = header.querySelector(".ks-header-menu");
    const drawer = header.querySelector(".ks-header-drawer");
    const closeDrawer = () => {
      menu.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-label", "メニューを開く");
      drawer.classList.remove("is-open");
      drawer.setAttribute("aria-hidden", "true");
    };
    menu.addEventListener("click", () => {
      const open = menu.getAttribute("aria-expanded") === "true";
      if (open) closeDrawer();
      else {
        menu.setAttribute("aria-expanded", "true");
        menu.setAttribute("aria-label", "メニューを閉じる");
        drawer.classList.add("is-open");
        drawer.setAttribute("aria-hidden", "false");
      }
    });
    drawer.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeDrawer));
    document.addEventListener("click", (event) => {
      if (!header.contains(event.target)) closeDrawer();
    }, { passive:true });
  };

  const improveLegacyCopy = () => {
    document.querySelectorAll("nav.fixed.top-0 *").forEach((el) => {
      if (!el.children.length && /ALL-IN-ONE/i.test(el.textContent || "")) el.textContent = (el.textContent || "").replace(/ALL-IN-ONE\s*\|?/gi, "").trim();
    });
  };

  const run = () => {
    injectStyles();
    const header = document.querySelector("nav.fixed.top-0");
    if (!header) return;
    improveLegacyCopy();
    buildHeader(header);
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run, { once:true });
  else run();
  setTimeout(run, 300);
  setTimeout(run, 1000);
  setTimeout(run, 2000);
})();
