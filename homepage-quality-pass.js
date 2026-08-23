(() => {
  "use strict";

  const STYLE_ID = "ks-homepage-quality-pass-style";
  const SECTION_ID = "ks-first-contact-flow";

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
      #${SECTION_ID} .ks-flow-inner {
        width: min(100%, 1200px);
        margin: 0 auto;
        padding: 0 32px;
      }
      #${SECTION_ID} .ks-flow-heading {
        max-width: 780px;
        margin: 0 auto 1.75rem;
        text-align: center;
      }
      #${SECTION_ID} .ks-flow-kicker {
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
      #${SECTION_ID} .ks-flow-lead {
        margin: .75rem auto 0;
        max-width: 720px;
        color: rgba(255,255,255,.82);
        font-size: .98rem;
        line-height: 1.9;
      }
      #${SECTION_ID} .ks-flow-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 1rem;
        margin-top: 1.75rem;
      }
      #${SECTION_ID} .ks-flow-item {
        position: relative;
        min-width: 0;
        padding: 1.35rem 1.15rem;
        background: rgba(255,255,255,.07);
        border: 1px solid rgba(255,255,255,.14);
        border-radius: 18px;
      }
      #${SECTION_ID} .ks-flow-number {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        margin-bottom: .7rem;
        border-radius: 999px;
        background: #fcd34d;
        color: #0b1f3a;
        font-size: .78rem;
        font-weight: 900;
      }
      #${SECTION_ID} .ks-flow-item h3 {
        margin: 0;
        color: #fff !important;
        font-size: 1.05rem;
        line-height: 1.55;
      }
      #${SECTION_ID} .ks-flow-item p {
        margin: .55rem 0 0;
        color: rgba(255,255,255,.72);
        font-size: .86rem;
        line-height: 1.75;
      }
      #${SECTION_ID} .ks-flow-cta {
        display: flex;
        justify-content: center;
        margin-top: 1.35rem;
      }
      #${SECTION_ID} .ks-flow-cta a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 48px;
        padding: .75rem 1.35rem;
        border: 1px solid rgba(255,255,255,.35);
        border-radius: 999px;
        color: #fff;
        background: rgba(255,255,255,.08);
        text-decoration: none;
        font-weight: 700;
      }
      #${SECTION_ID} .ks-flow-cta a:hover { background: rgba(255,255,255,.14); }
      @media (max-width: 767px) {
        #${SECTION_ID} .ks-flow-inner { padding: 0 20px; }
        #${SECTION_ID} .ks-flow-grid { grid-template-columns: 1fr; gap: .75rem; }
        #${SECTION_ID} .ks-flow-item { padding: 1.05rem 1rem; }
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
    section.setAttribute("aria-labelledby", "ks-first-contact-flow-title");
    section.innerHTML = `
      <div class="ks-flow-inner">
        <div class="ks-flow-heading">
          <p class="ks-flow-kicker">FIRST CONSULTATION</p>
          <h2 id="ks-first-contact-flow-title">初めてのご相談から、<br>指導開始までの流れ</h2>
          <p class="ks-flow-lead">いきなり契約を決める必要はありません。お子様の現在地とご家庭の希望を整理し、どのコース・進め方が合うかを一緒に確認します。</p>
        </div>
        <div class="ks-flow-grid" role="list">
          <article class="ks-flow-item" role="listitem">
            <span class="ks-flow-number">01</span>
            <h3>まずは状況を相談</h3>
            <p>学年、現在の学習状況、英検・受験などの目標、困っていることをお聞きします。保護者様だけのご相談も可能です。</p>
          </article>
          <article class="ks-flow-item" role="listitem">
            <span class="ks-flow-number">02</span>
            <h3>合うコースと進め方を整理</h3>
            <p>目標と現在地から、必要な指導内容や学習の優先順位を整理します。既存の15コースから適した選択肢をご案内します。</p>
          </article>
          <article class="ks-flow-item" role="listitem">
            <span class="ks-flow-number">03</span>
            <h3>納得してから指導へ</h3>
            <p>方針と条件をご確認いただいたうえで、指導を開始します。契約後も講師本人が継続して状況を見ながら調整します。</p>
          </article>
        </div>
        <div class="ks-flow-cta"><a href="#contact">まずは無料相談で状況を整理する →</a></div>
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
