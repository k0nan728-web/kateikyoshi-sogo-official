(() => {
  "use strict";

  const STYLE_ID = "ks-homepage-quality-pass-style-v4";
  const SECTION_ID = "ks-direct-contract-proof-v4";

  const injectStyles = () => {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${SECTION_ID} {
        position: relative;
        z-index: 2;
        width: 100%;
        box-sizing: border-box;
        padding: clamp(2.25rem, 5vw, 4rem) 0 !important;
        background: #0b1f3a !important;
        color: #fff !important;
        border-top: 1px solid rgba(255,255,255,.1);
        border-bottom: 1px solid rgba(255,255,255,.1);
      }
      #${SECTION_ID} .ks-proof-inner {
        width: min(100%, 1200px);
        margin: 0 auto;
        padding: 0 32px;
        box-sizing: border-box;
      }
      #${SECTION_ID} .ks-proof-heading {
        max-width: 800px;
        margin: 0 auto 1.75rem;
        text-align: center;
      }
      #${SECTION_ID} .ks-proof-kicker {
        margin: 0 0 .5rem;
        color: #fcd34d !important;
        font-size: .75rem;
        font-weight: 800;
        letter-spacing: .14em;
      }
      #${SECTION_ID} h2 {
        margin: 0 !important;
        color: #fff !important;
        font-family: "Noto Serif JP", serif;
        font-size: clamp(1.4rem, 3vw, 2.3rem) !important;
        line-height: 1.55 !important;
      }
      #${SECTION_ID} .ks-proof-lead {
        margin: .8rem auto 0;
        max-width: 730px;
        color: rgba(255,255,255,.84) !important;
        font-size: .98rem;
        line-height: 1.9;
      }
      #${SECTION_ID} .ks-proof-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 1px;
        overflow: hidden;
        margin-top: 1.75rem;
        border: 1px solid rgba(255,255,255,.16);
        border-radius: 18px;
        background: rgba(255,255,255,.14);
      }
      #${SECTION_ID} .ks-proof-item {
        min-width: 0;
        padding: 1.25rem 1rem;
        background: rgba(6,21,41,.78) !important;
        text-align: center;
      }
      #${SECTION_ID} .ks-proof-item strong {
        display: block;
        color: #fff !important;
        font-size: 1rem;
        line-height: 1.55;
      }
      #${SECTION_ID} .ks-proof-item span {
        display: block;
        margin-top: .35rem;
        color: rgba(255,255,255,.72) !important;
        font-size: .78rem;
        line-height: 1.6;
      }
      #${SECTION_ID} .ks-credibility {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
        margin-top: 12px;
      }
      #${SECTION_ID} .ks-credibility-item {
        padding: 1rem 1.1rem;
        border: 1px solid rgba(255,255,255,.16);
        border-radius: 14px;
        background: rgba(255,255,255,.06) !important;
      }
      #${SECTION_ID} .ks-credibility-item b {
        display: block;
        color: #fcd34d !important;
        font-size: 1.25rem;
        line-height: 1.35;
      }
      #${SECTION_ID} .ks-credibility-item span {
        display: block;
        margin-top: .35rem;
        color: rgba(255,255,255,.78) !important;
        font-size: .8rem;
        line-height: 1.65;
      }
      #${SECTION_ID} .ks-proof-note {
        margin: 1rem auto 0;
        max-width: 780px;
        color: rgba(255,255,255,.66) !important;
        font-size: .76rem;
        line-height: 1.7;
        text-align: center;
      }
      #${SECTION_ID} .ks-proof-cta {
        display: flex;
        justify-content: center;
        margin-top: 1.35rem;
      }
      #${SECTION_ID} .ks-proof-cta a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 48px;
        padding: .7rem 1.35rem;
        border: 1px solid rgba(255,255,255,.35);
        border-radius: 999px;
        color: #fff !important;
        background: rgba(255,255,255,.08) !important;
        text-decoration: none !important;
        font-weight: 700;
      }
      @media (max-width: 767px) {
        #${SECTION_ID} .ks-proof-inner { padding: 0 20px; }
        #${SECTION_ID} .ks-proof-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        #${SECTION_ID} .ks-proof-item { padding: 1rem .75rem; }
        #${SECTION_ID} .ks-proof-item strong { font-size: .9rem; }
        #${SECTION_ID} .ks-proof-item span { font-size: .72rem; }
        #${SECTION_ID} .ks-credibility { grid-template-columns: 1fr; }
        #${SECTION_ID} .ks-credibility-item { padding: .9rem 1rem; }
      }
    `;
    document.head.appendChild(style);
  };

  const findInsertionTarget = () => {
    const main = document.querySelector("main");
    if (main) {
      const firstSection = main.querySelector(":scope > section, :scope > div > section");
      if (firstSection) return { node: firstSection, mode: "after" };
      const firstChild = main.firstElementChild;
      if (firstChild) return { node: firstChild, mode: "after" };
    }

    const root = document.getElementById("root");
    if (root) {
      const firstChild = root.firstElementChild;
      if (firstChild) return { node: firstChild, mode: "before" };
    }

    return null;
  };

  const createSection = () => {
    if (document.getElementById(SECTION_ID)) return true;
    const target = findInsertionTarget();
    if (!target) return false;

    const section = document.createElement("section");
    section.id = SECTION_ID;
    section.setAttribute("aria-labelledby", "ks-direct-contract-proof-title-v4");
    section.innerHTML = `
      <div class="ks-proof-inner">
        <div class="ks-proof-heading">
          <p class="ks-proof-kicker">DIRECT CONTRACT</p>
          <h2 id="ks-direct-contract-proof-title-v4">講師を紹介してもらうのではなく、<br>講師本人と直接契約する家庭教師です。</h2>
          <p class="ks-proof-lead">ご相談から授業まで、鈴木雄太本人が一貫して担当。仲介を挟まないからこそ、ご家庭の希望と学習状況をそのまま指導へつなげます。</p>
        </div>
        <div class="ks-proof-grid" role="list">
          <div class="ks-proof-item" role="listitem"><strong>入会金 0円</strong><span>個人契約</span></div>
          <div class="ks-proof-item" role="listitem"><strong>管理費 0円</strong><span>固定の管理費なし</span></div>
          <div class="ks-proof-item" role="listitem"><strong>仲介手数料 0円</strong><span>センターを介さない契約</span></div>
          <div class="ks-proof-item" role="listitem"><strong>本人が一貫して担当</strong><span>相談・授業・学習設計</span></div>
        </div>
        <div class="ks-credibility" role="list" aria-label="指導実績">
          <div class="ks-credibility-item" role="listitem"><b>20年以上</b><span>プロ家庭教師としての指導経験</span></div>
          <div class="ks-credibility-item" role="listitem"><b>延べ1,000名超</b><span>これまでに指導してきた生徒</span></div>
          <div class="ks-credibility-item" role="listitem"><b>全国オンライン</b><span>地域を問わず一貫した個別指導</span></div>
        </div>
        <p class="ks-proof-note">※指導経験・人数などの実績表記は、公式サイト内の講師紹介・実績情報に基づく表記です。</p>
        <div class="ks-proof-cta"><a href="#contact">まずは無料相談で状況を整理する →</a></div>
      </div>
    `;

    if (target.mode === "after") target.node.insertAdjacentElement("afterend", section);
    else target.node.insertAdjacentElement("beforebegin", section);
    return true;
  };

  const boot = () => {
    injectStyles();
    return createSection();
  };

  let attempts = 0;
  const retry = () => {
    if (boot() || attempts >= 30) return;
    attempts += 1;
    window.setTimeout(retry, 500);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", retry, { once: true });
  } else {
    retry();
  }

  const observer = new MutationObserver(() => {
    if (document.getElementById(SECTION_ID)) {
      observer.disconnect();
      return;
    }
    boot();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
