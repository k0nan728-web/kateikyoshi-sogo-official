(() => {
  "use strict";

  const STYLE_ID = "ks-homepage-quality-pass-style";
  const SECTION_ID = "ks-direct-contract-proof";

  const injectStyles = () => {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${SECTION_ID} {
        position: relative;
        z-index: 1;
        padding: clamp(2.25rem, 5vw, 4rem) 0 !important;
        background: #0b1f3a !important;
        color: #fff;
        border-top: 1px solid rgba(255,255,255,.08);
        border-bottom: 1px solid rgba(255,255,255,.08);
      }
      #${SECTION_ID} .ks-proof-inner {
        width: min(100%, 1200px);
        margin: 0 auto;
        padding: 0 32px;
      }
      #${SECTION_ID} .ks-proof-heading {
        max-width: 760px;
        margin: 0 auto 1.75rem;
        text-align: center;
      }
      #${SECTION_ID} .ks-proof-kicker {
        margin: 0 0 .45rem;
        color: #fcd34d;
        font-size: .75rem;
        font-weight: 800;
        letter-spacing: .14em;
      }
      #${SECTION_ID} h2 {
        margin: 0;
        color: #fff !important;
        font-family: "Noto Serif JP", serif;
        font-size: clamp(1.45rem, 3vw, 2.35rem);
        line-height: 1.5;
      }
      #${SECTION_ID} .ks-proof-lead {
        margin: .75rem auto 0;
        max-width: 700px;
        color: rgba(255,255,255,.82);
        font-size: .98rem;
        line-height: 1.9;
      }
      #${SECTION_ID} .ks-proof-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 1px;
        overflow: hidden;
        margin-top: 1.75rem;
        border: 1px solid rgba(255,255,255,.14);
        border-radius: 18px;
        background: rgba(255,255,255,.14);
      }
      #${SECTION_ID} .ks-proof-item {
        min-width: 0;
        padding: 1.25rem 1rem;
        background: rgba(6,21,41,.72);
        text-align: center;
      }
      #${SECTION_ID} .ks-proof-item strong {
        display: block;
        color: #fff;
        font-size: 1.02rem;
        line-height: 1.55;
      }
      #${SECTION_ID} .ks-proof-item span {
        display: block;
        margin-top: .35rem;
        color: rgba(255,255,255,.7);
        font-size: .8rem;
        line-height: 1.6;
      }
      #${SECTION_ID} .ks-proof-note {
        margin: 1rem auto 0;
        max-width: 820px;
        color: rgba(255,255,255,.64);
        font-size: .78rem;
        line-height: 1.7;
        text-align: center;
      }
      @media (max-width: 767px) {
        #${SECTION_ID} .ks-proof-inner { padding: 0 20px; }
        #${SECTION_ID} .ks-proof-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        #${SECTION_ID} .ks-proof-item { padding: 1rem .75rem; }
        #${SECTION_ID} .ks-proof-item strong { font-size: .92rem; }
        #${SECTION_ID} .ks-proof-item span { font-size: .75rem; }
      }
    `;
    document.head.appendChild(style);
  };

  const createSection = () => {
    if (document.getElementById(SECTION_ID)) return null;
    const hero = document.querySelector("main > section:first-child");
    if (!hero) return null;

    const section = document.createElement("section");
    section.id = SECTION_ID;
    section.setAttribute("aria-labelledby", "ks-direct-contract-proof-title");
    section.innerHTML = `
      <div class="ks-proof-inner">
        <div class="ks-proof-heading">
          <p class="ks-proof-kicker">DIRECT CONTRACT</p>
          <h2 id="ks-direct-contract-proof-title">「講師を紹介してもらう」のではなく、<br>講師本人と直接契約する家庭教師です。</h2>
          <p class="ks-proof-lead">ご相談から授業まで、鈴木雄太本人が一貫して担当。仲介を挟まないからこそ、学習状況やご家庭の希望をそのまま指導へつなげます。</p>
        </div>
        <div class="ks-proof-grid" role="list">
          <div class="ks-proof-item" role="listitem"><strong>入会金 0円</strong><span>個人契約</span></div>
          <div class="ks-proof-item" role="listitem"><strong>管理費 0円</strong><span>固定の管理費なし</span></div>
          <div class="ks-proof-item" role="listitem"><strong>仲介手数料 0円</strong><span>センターを介さない契約</span></div>
          <div class="ks-proof-item" role="listitem"><strong>一貫して本人が担当</strong><span>相談・授業・学習設計</span></div>
        </div>
        <p class="ks-proof-note">料金・指導条件はコースごとに異なります。詳細は各コースと料金比較ページでご確認ください。</p>
      </div>
    `;
    hero.insertAdjacentElement("afterend", section);
    return section;
  };

  const boot = () => {
    injectStyles();
    createSection();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }

  let tries = 0;
  const retry = () => {
    if (document.getElementById(SECTION_ID) || tries >= 10) return;
    tries += 1;
    window.setTimeout(() => {
      boot();
      retry();
    }, 300);
  };
  retry();
})();
