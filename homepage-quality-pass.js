(() => {
  "use strict";

  const STYLE_ID = "ks-homepage-quality-pass-style-v7";
  const SECTION_ID = "ks-direct-contract-proof-v7";

  const injectStyles = () => {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${SECTION_ID} { position:relative; z-index:2; width:100%; box-sizing:border-box; padding:clamp(2rem,5vw,4rem) 0 2.5rem !important; background:linear-gradient(180deg,#f7fbff 0%,#fff 72%) !important; color:#10233f !important; border-top:1px solid #e5edf7; }
      #${SECTION_ID} .ks-proof-inner { width:min(100%,1200px); margin:0 auto; padding:0 24px; box-sizing:border-box; }
      #${SECTION_ID} .ks-proof-heading { max-width:920px; margin:0 auto 1.5rem; text-align:center; }
      #${SECTION_ID} .ks-proof-kicker { margin:0 0 .45rem; color:#2563eb !important; font-size:.78rem; font-weight:900; letter-spacing:.14em; }
      #${SECTION_ID} h2 { margin:0 !important; color:#0b1f3a !important; font-family:"Noto Serif JP",serif; font-size:clamp(1.55rem,3.5vw,2.65rem) !important; line-height:1.45 !important; }
      #${SECTION_ID} h2 .ks-accent { color:#e83e73 !important; }
      #${SECTION_ID} .ks-proof-lead { margin:.75rem auto 0; max-width:760px; color:#516174 !important; font-size:.96rem; line-height:1.85; }
      #${SECTION_ID} .ks-proof-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px; margin-top:1.5rem; }
      #${SECTION_ID} .ks-proof-item { min-width:0; padding:1.15rem .85rem 1rem; background:#fff !important; border:2px solid #f3a1bd; border-radius:16px; text-align:center; box-shadow:0 8px 20px rgba(30,64,175,.07); }
      #${SECTION_ID} .ks-proof-icon { display:block; font-size:1.65rem; line-height:1; margin-bottom:.45rem; }
      #${SECTION_ID} .ks-proof-item strong { display:block; color:#182230 !important; font-size:.95rem; line-height:1.45; }
      #${SECTION_ID} .ks-proof-item b { display:block; margin-top:.15rem; color:#e83e73 !important; font-size:1.8rem; line-height:1.15; }
      #${SECTION_ID} .ks-proof-item span { display:block; margin-top:.25rem; color:#68778b !important; font-size:.7rem; line-height:1.5; }
      #${SECTION_ID} .ks-proof-item:last-child b { font-size:1.25rem; }
      #${SECTION_ID} .ks-credibility { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:0; margin-top:1rem; overflow:hidden; border-radius:16px; background:#071d3b !important; box-shadow:0 10px 24px rgba(7,29,59,.12); }
      #${SECTION_ID} .ks-credibility-item { padding:1rem .75rem; border-right:1px solid rgba(255,255,255,.22); text-align:center; }
      #${SECTION_ID} .ks-credibility-item:last-child { border-right:0; }
      #${SECTION_ID} .ks-credibility-item b { display:block; color:#fbbf24 !important; font-size:1.2rem; line-height:1.35; }
      #${SECTION_ID} .ks-credibility-item span { display:block; margin-top:.25rem; color:#fff !important; font-size:.72rem; line-height:1.55; opacity:.92; }
      #${SECTION_ID} .ks-route-heading { margin:1.9rem auto .9rem; text-align:center; }
      #${SECTION_ID} .ks-route-heading strong { display:block; color:#164e9d !important; font-size:1.15rem; line-height:1.55; }
      #${SECTION_ID} .ks-route-heading span { display:block; margin-top:.2rem; color:#66758a !important; font-size:.78rem; }
      #${SECTION_ID} .ks-route-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px; }
      #${SECTION_ID} .ks-route-card { min-width:0; display:flex; flex-direction:column; padding:1rem; border:1.5px solid #dce5ef; border-radius:16px; background:#fff !important; color:#182230 !important; text-decoration:none !important; box-shadow:0 7px 18px rgba(15,23,42,.06); transition:transform .18s ease,box-shadow .18s ease; }
      #${SECTION_ID} .ks-route-card:hover { transform:translateY(-2px); box-shadow:0 12px 24px rgba(15,23,42,.1); }
      #${SECTION_ID} .ks-route-card:nth-child(1) { border-top:4px solid #e83e73; }
      #${SECTION_ID} .ks-route-card:nth-child(2) { border-top:4px solid #22a06b; }
      #${SECTION_ID} .ks-route-card:nth-child(3) { border-top:4px solid #2563eb; }
      #${SECTION_ID} .ks-route-card:nth-child(4) { border-top:4px solid #f59e0b; }
      #${SECTION_ID} .ks-route-label { display:inline-flex; align-self:flex-start; padding:.25rem .55rem; border-radius:999px; background:#eef4ff !important; color:#164e9d !important; font-size:.67rem; font-weight:900; }
      #${SECTION_ID} .ks-route-card:nth-child(1) .ks-route-label { background:#fff0f5 !important; color:#d52f65 !important; }
      #${SECTION_ID} .ks-route-card:nth-child(2) .ks-route-label { background:#effbf4 !important; color:#16834f !important; }
      #${SECTION_ID} .ks-route-card:nth-child(3) .ks-route-label { background:#eff5ff !important; color:#1654b7 !important; }
      #${SECTION_ID} .ks-route-card:nth-child(4) .ks-route-label { background:#fff8e8 !important; color:#c97900 !important; }
      #${SECTION_ID} .ks-route-card h3 { margin:.55rem 0 .4rem !important; color:#0b1f3a !important; font-size:1rem !important; line-height:1.5 !important; }
      #${SECTION_ID} .ks-route-card p { margin:0 !important; color:#516174 !important; font-size:.75rem !important; line-height:1.7 !important; }
      #${SECTION_ID} .ks-route-link { margin-top:auto; padding-top:.75rem; color:#164e9d !important; font-size:.75rem; font-weight:900; }
      #${SECTION_ID} .ks-route-card:nth-child(1) .ks-route-link { color:#d52f65 !important; }
      #${SECTION_ID} .ks-route-card:nth-child(2) .ks-route-link { color:#16834f !important; }
      #${SECTION_ID} .ks-route-card:nth-child(4) .ks-route-link { color:#c97900 !important; }
      #${SECTION_ID} .ks-proof-cta-wrap { margin-top:1.25rem; padding:1rem; border-radius:16px; background:#fff0f5 !important; border:1px solid #f7c2d4; text-align:center; }
      #${SECTION_ID} .ks-proof-cta-wrap p { margin:0 0 .55rem !important; color:#182230 !important; font-weight:800; font-size:.9rem; }
      #${SECTION_ID} .ks-proof-cta { display:flex; justify-content:center; }
      #${SECTION_ID} .ks-proof-cta a { display:flex; align-items:center; justify-content:center; width:min(100%,760px); min-height:52px; padding:.7rem 1.2rem; border-radius:10px; color:#fff !important; background:#e83e73 !important; text-decoration:none !important; font-weight:900; font-size:1rem; box-shadow:0 7px 15px rgba(232,62,115,.22); }
      #${SECTION_ID} .ks-entry-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); margin-top:1.2rem; border:1px solid #e4eaf1; border-radius:16px; background:#fff !important; overflow:hidden; }
      #${SECTION_ID} .ks-entry { padding:1rem .7rem; text-align:center; border-right:1px solid #e4eaf1; }
      #${SECTION_ID} .ks-entry:last-child { border-right:0; }
      #${SECTION_ID} .ks-entry-icon { display:block; font-size:1.5rem; margin-bottom:.3rem; }
      #${SECTION_ID} .ks-entry strong { display:block; color:#182230 !important; font-size:.75rem; line-height:1.5; }
      #${SECTION_ID} .ks-entry span { display:block; margin-top:.2rem; color:#68778b !important; font-size:.66rem; line-height:1.5; }
      #${SECTION_ID} .ks-proof-note { margin:1rem auto 0; max-width:900px; color:#77869a !important; font-size:.67rem; line-height:1.7; text-align:center; }
      @media (max-width:900px) { #${SECTION_ID} .ks-route-grid { grid-template-columns:repeat(2,minmax(0,1fr)); } }
      @media (max-width:767px) {
        #${SECTION_ID} .ks-proof-inner { padding:0 16px; }
        #${SECTION_ID} .ks-proof-grid { grid-template-columns:repeat(2,minmax(0,1fr)); gap:8px; }
        #${SECTION_ID} .ks-proof-item { padding:.9rem .55rem; }
        #${SECTION_ID} .ks-proof-item b { font-size:1.55rem; }
        #${SECTION_ID} .ks-proof-item:last-child b { font-size:1.05rem; }
        #${SECTION_ID} .ks-credibility { grid-template-columns:repeat(2,minmax(0,1fr)); }
        #${SECTION_ID} .ks-credibility-item { padding:.85rem .55rem; border-bottom:1px solid rgba(255,255,255,.22); }
        #${SECTION_ID} .ks-credibility-item:nth-child(2) { border-right:0; }
        #${SECTION_ID} .ks-credibility-item:nth-child(3), #${SECTION_ID} .ks-credibility-item:nth-child(4) { border-bottom:0; }
        #${SECTION_ID} .ks-route-grid { grid-template-columns:1fr; }
        #${SECTION_ID} .ks-route-card { padding:1rem; }
        #${SECTION_ID} .ks-entry-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
        #${SECTION_ID} .ks-entry:nth-child(2) { border-right:0; }
        #${SECTION_ID} .ks-entry:nth-child(1), #${SECTION_ID} .ks-entry:nth-child(2) { border-bottom:1px solid #e4eaf1; }
      }
    `;
    document.head.appendChild(style);
  };

  const findInsertionTarget = () => {
    const main = document.querySelector("main");
    if (main) {
      const firstSection = main.querySelector(":scope > section, :scope > div > section");
      if (firstSection) return { node:firstSection, mode:"after" };
      const firstChild = main.firstElementChild;
      if (firstChild) return { node:firstChild, mode:"after" };
    }
    const root = document.getElementById("root");
    if (root) {
      const firstChild = root.firstElementChild;
      if (firstChild) return { node:firstChild, mode:"before" };
    }
    return null;
  };

  const createSection = () => {
    if (document.getElementById(SECTION_ID)) return true;
    const target = findInsertionTarget();
    if (!target) return false;

    const section = document.createElement("section");
    section.id = SECTION_ID;
    section.setAttribute("aria-labelledby", "ks-direct-contract-proof-title-v7");
    section.innerHTML = `
      <div class="ks-proof-inner">
        <div class="ks-proof-heading">
          <p class="ks-proof-kicker">DIRECT CONTRACT</p>
          <h2 id="ks-direct-contract-proof-title-v7">講師を紹介してもらうのではなく、<br>講師本人と<span class="ks-accent">直接契約</span>する家庭教師です。</h2>
          <p class="ks-proof-lead">ご相談から授業まで、鈴木雄太本人が一貫して担当。仲介を挟まないからこそ、ご家庭の希望と学習状況をそのまま指導へつなげます。</p>
        </div>
        <div class="ks-proof-grid" role="list">
          <div class="ks-proof-item" role="listitem"><span class="ks-proof-icon">￥</span><strong>入会金</strong><b>0円</b><span>個人契約</span></div>
          <div class="ks-proof-item" role="listitem"><span class="ks-proof-icon">▦</span><strong>管理費</strong><b>0円</b><span>固定の管理費なし</span></div>
          <div class="ks-proof-item" role="listitem"><span class="ks-proof-icon">🤝</span><strong>仲介手数料</strong><b>0円</b><span>センターを介さない契約</span></div>
          <div class="ks-proof-item" role="listitem"><span class="ks-proof-icon">●</span><strong>本人が一貫して</strong><b>担当</b><span>相談・授業・学習設計</span></div>
        </div>
        <div class="ks-credibility" role="list" aria-label="講師の経験と実績">
          <div class="ks-credibility-item" role="listitem"><b>20年超</b><span>指導経験</span></div>
          <div class="ks-credibility-item" role="listitem"><b>1,000名超</b><span>延べ指導生徒数</span></div>
          <div class="ks-credibility-item" role="listitem"><b>英検300名以上</b><span>英検指導実績</span></div>
          <div class="ks-credibility-item" role="listitem"><b>トッププロ認定</b><span>T社・Y社・R社</span></div>
        </div>
        <div class="ks-route-heading">
          <strong>お子さまの状況に合わせて、最適なサポートをご提供します</strong>
          <span>悩みに近い入口から、必要な情報へすぐ進めます</span>
        </div>
        <div class="ks-route-grid" role="list">
          <a class="ks-route-card" role="listitem" href="/eiken/"><span class="ks-route-label">英検</span><h3>英検を取りたい</h3><p>今の級や苦手を整理し、英検合格に向けた学習を組み立てます。</p><span class="ks-route-link">詳しく見る →</span></a>
          <a class="ks-route-card" role="listitem" href="/gyakuten/"><span class="ks-route-label">大学受験</span><h3>大学受験で伸ばしたい</h3><p>現在地と志望校から、優先順位を整理して合格までの道筋を考えます。</p><span class="ks-route-link">詳しく見る →</span></a>
          <a class="ks-route-card" role="listitem" href="/bansou/"><span class="ks-route-label">不登校・通信制</span><h3>自宅で学習を続けたい</h3><p>学習面だけでなく、進路や生活リズムも含めて伴走します。</p><span class="ks-route-link">詳しく見る →</span></a>
          <a class="ks-route-card" role="listitem" href="#contact"><span class="ks-route-label">その他・個別相談</span><h3>どこに相談すればいいか分からない</h3><p>英検・受験・不登校など、状況を整理して最適な方向を一緒に考えます。</p><span class="ks-route-link">無料相談を予約 →</span></a>
        </div>
        <div class="ks-proof-cta-wrap"><p>まずは無料相談で、お子さまに合った学習プランをご提案します</p><div class="ks-proof-cta"><a href="#contact">無料相談を予約する　›</a></div></div>
        <div class="ks-entry-grid" aria-label="ご相談の4つの入口">
          <div class="ks-entry"><span class="ks-entry-icon">💬</span><strong>無料相談を予約する</strong><span>まずはお気軽にご相談を</span></div>
          <div class="ks-entry"><span class="ks-entry-icon">📋</span><strong>各ゼミナールを見る</strong><span>目的に合ったコースへ</span></div>
          <div class="ks-entry"><span class="ks-entry-icon">📖</span><strong>実績・講師紹介を見る</strong><span>実績と人柄をご確認</span></div>
          <div class="ks-entry"><span class="ks-entry-icon">✉</span><strong>お問い合わせする</strong><span>ご質問はこちらから</span></div>
        </div>
        <p class="ks-proof-note">※実績・認定表記は公式サイト内の講師紹介・実績情報に基づいています。個別の成果には個人差があります。</p>
      </div>
    `;

    if (target.mode === "after") target.node.insertAdjacentElement("afterend", section);
    else target.node.insertAdjacentElement("beforebegin", section);
    return true;
  };

  const boot = () => { injectStyles(); return createSection(); };
  let attempts = 0;
  const retry = () => { if (boot() || attempts >= 30) return; attempts += 1; window.setTimeout(retry,500); };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", retry, {once:true}); else retry();
  const observer = new MutationObserver(() => { if (document.getElementById(SECTION_ID)) observer.disconnect(); else boot(); });
  observer.observe(document.documentElement, {childList:true, subtree:true});
})();
