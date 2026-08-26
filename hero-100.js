(() => {
  "use strict";

  const STYLE_ID = "ks-hero-100-style-v1";
  const HERO_ID = "ks-hero-100";

  const injectStyles = () => {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      .ks-photo-hero { overflow:visible !important; }
      .ks-photo-hero .ks-hero-copy { position:relative; }
      #${HERO_ID}-assurance {
        display:grid;
        grid-template-columns:repeat(3,minmax(0,1fr));
        gap:8px;
        margin:1rem 0 0;
      }
      #${HERO_ID}-assurance .ks-hero-assurance-item {
        min-width:0;
        padding:.62rem .5rem;
        border:1px solid #e8d5df;
        border-radius:10px;
        background:linear-gradient(180deg,#fff 0%,#fff8fb 100%);
        text-align:center;
      }
      #${HERO_ID}-assurance strong {
        display:block;
        color:#d92f67;
        font-size:1.02rem;
        line-height:1.25;
        font-weight:900;
      }
      #${HERO_ID}-assurance span {
        display:block;
        margin-top:.18rem;
        color:#536276;
        font-size:.66rem;
        line-height:1.45;
      }
      #${HERO_ID}-note {
        margin:.65rem 0 0;
        color:#52647a;
        font-size:.73rem;
        line-height:1.65;
      }
      #${HERO_ID}-note b { color:#173f73; }
      @media (max-width:900px) {
        #${HERO_ID}-assurance { grid-template-columns:repeat(3,minmax(0,1fr)); gap:6px; }
        #${HERO_ID}-assurance .ks-hero-assurance-item { padding:.58rem .28rem; }
        #${HERO_ID}-assurance strong { font-size:.9rem; }
        #${HERO_ID}-assurance span { font-size:.6rem; }
        #${HERO_ID}-note { font-size:.68rem; }
      }
      @media (max-width:380px) {
        #${HERO_ID}-assurance strong { font-size:.8rem; }
        #${HERO_ID}-assurance span { font-size:.56rem; }
      }
    `;
    document.head.appendChild(style);
  };

  const addContent = () => {
    const hero = document.querySelector(".ks-photo-hero");
    const copy = hero?.querySelector(".ks-hero-copy");
    const secondary = copy?.querySelector(".ks-hero-secondary");
    if (!hero || !copy || !secondary) return false;
    if (document.getElementById(HERO_ID)) return true;

    const assurance = document.createElement("div");
    assurance.id = HERO_ID;
    assurance.setAttribute("aria-label", "契約と料金の安心ポイント");
    assurance.innerHTML = `
      <div class="ks-hero-assurance-item"><strong>0円</strong><span>入会金</span></div>
      <div class="ks-hero-assurance-item"><strong>0円</strong><span>管理費</span></div>
      <div class="ks-hero-assurance-item"><strong>0円</strong><span>仲介手数料</span></div>
    `;

    const note = document.createElement("p");
    note.id = `${HERO_ID}-note`;
    note.innerHTML = "<b>講師本人が直接担当</b>。ご相談から指導まで、一貫して対応します。";

    secondary.insertAdjacentElement("afterend", assurance);
    assurance.insertAdjacentElement("afterend", note);
    hero.classList.add("ks-hero-100-ready");
    return true;
  };

  const boot = () => {
    injectStyles();
    let attempts = 0;
    const timer = window.setInterval(() => {
      if (addContent() || attempts >= 60) window.clearInterval(timer);
      attempts += 1;
    }, 100);
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once:true });
  else boot();
})();
