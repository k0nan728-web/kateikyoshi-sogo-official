(() => {
  "use strict";

  const STYLE_ID = "ks-homepage-quality-pass-style-v6";
  const SECTION_ID = "ks-direct-contract-proof-v6";

  const injectStyles = () => {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      #${SECTION_ID} { position:relative; z-index:2; width:100%; box-sizing:border-box; padding:clamp(2.25rem,5vw,4rem) 0 !important; background:#0b1f3a !important; color:#fff !important; border-top:1px solid rgba(255,255,255,.1); border-bottom:1px solid rgba(255,255,255,.1); }
      #${SECTION_ID} .ks-proof-inner { width:min(100%,1200px); margin:0 auto; padding:0 32px; box-sizing:border-box; }
      #${SECTION_ID} .ks-proof-heading { max-width:820px; margin:0 auto 1.75rem; text-align:center; }
      #${SECTION_ID} .ks-proof-kicker { margin:0 0 .5rem; color:#fcd34d !important; font-size:.75rem; font-weight:800; letter-spacing:.14em; }
      #${SECTION_ID} h2 { margin:0 !important; color:#fff !important; font-family:"Noto Serif JP",serif; font-size:clamp(1.4rem,3vw,2.3rem) !important; line-height:1.55 !important; }
      #${SECTION_ID} .ks-proof-lead { margin:.8rem auto 0; max-width:760px; color:rgba(255,255,255,.84) !important; font-size:.98rem; line-height:1.9; }
      #${SECTION_ID} .ks-proof-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:1px; overflow:hidden; margin-top:1.75rem; border:1px solid rgba(255,255,255,.16); border-radius:18px; background:rgba(255,255,255,.14); }
      #${SECTION_ID} .ks-proof-item { min-width:0; padding:1.25rem 1rem; background:rgba(6,21,41,.78) !important; text-align:center; }
      #${SECTION_ID} .ks-proof-item strong { display:block; color:#fff !important; font-size:1rem; line-height:1.55; }
      #${SECTION_ID} .ks-proof-item span { display:block; margin-top:.35rem; color:rgba(255,255,255,.72) !important; font-size:.78rem; line-height:1.6; }
      #${SECTION_ID} .ks-credibility { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px; margin-top:12px; }
      #${SECTION_ID} .ks-credibility-item { padding:1rem 1.1rem; border:1px solid rgba(255,255,255,.16); border-radius:14px; background:rgba(255,255,255,.06) !important; text-align:center; }
      #${SECTION_ID} .ks-credibility-item b { display:block; color:#fcd34d !important; font-size:1.1rem; line-height:1.4; }
      #${SECTION_ID} .ks-credibility-item span { display:block; margin-top:.35rem; color:rgba(255,255,255,.78) !important; font-size:.78rem; line-height:1.65; }
      #${SECTION_ID} .ks-route-heading { margin:2.2rem auto 1rem; text-align:center; }
      #${SECTION_ID} .ks-route-heading strong { display:block; color:#fff !important; font-size:1.15rem; line-height:1.6; }
      #${SECTION_ID} .ks-route-heading span { display:block; margin-top:.25rem; color:rgba(255,255,255,.68) !important; font-size:.8rem; }
      #${SECTION_ID} .ks-route-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px; }
      #${SECTION_ID} .ks-route-card { min-width:0; display:flex; flex-direction:column; padding:1.1rem; border:1px solid rgba(255,255,255,.18); border-radius:16px; background:#fff !important; color:#182230 !important; text-decoration:none !important; box-shadow:0 8px 22px rgba(0,0,0,.12); }
      #${SECTION_ID} .ks-route-card:hover { transform:translateY(-2px); }
      #${SECTION_ID} .ks-route-label { display:inline-flex; align-self:flex-start; padding:.25rem .5rem; border-radius:999px; background:#eef4ff !important; color:#164e9d !important; font-size:.68rem; font-weight:800; }
      #${SECTION_ID} .ks-route-card h3 { margin:.65rem 0 .4rem !important; color:#0b1f3a !important; font-size:1rem !important; line-height:1.5 !important; }
      #${SECTION_ID} .ks-route-card p { margin:0 !important; color:#516174 !important; font-size:.78rem !important; line-height:1.7 !important; }
      #${SECTION_ID} .ks-route-link { margin-top:auto; padding-top:.8rem; color:#164e9d !important; font-size:.76rem; font-weight:800; }
      #${SECTION_ID} .ks-proof-note { margin:1rem auto 0; max-width:820px; color:rgba(255,255,255,.66) !important; font-size:.76rem; line-height:1.7; text-align:center; }
      #${SECTION_ID} .ks-proof-cta { display:flex; justify-content:center; margin-top:1.35rem; }
      #${SECTION_ID} .ks-proof-cta a { display:inline-flex; align-items:center; justify-content:center; min-height:48px; padding:.7rem 1.35rem; border:1px solid rgba(255,255,255,.35); border-radius:999px; color:#fff !important; background:#d97706 !important; text-decoration:none !important; font-weight:800; }
      @media (max-width:900px) {
        #${SECTION_ID} .ks-route-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
      }
      @media (max-width:767px) {
        #${SECTION_ID} .ks-proof-inner { padding:0 20px; }
        #${SECTION_ID} .ks-proof-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
        #${SECTION_ID} .ks-proof-item { padding:1rem .75rem; }
        #${SECTION_ID} .ks-proof-item strong { font-size:.9rem; }
        #${SECTION_ID} .ks-proof-item span { font-size:.72rem; }
        #${SECTION_ID} .ks-credibility { grid-template-columns:repeat(2,minmax(0,1fr)); }
        #${SECTION_ID} .ks-credibility-item { padding:.85rem .8rem; }
        #${SECTION_ID} .ks-credibility-item b { font-size:1rem; }
        #${SECTION_ID} .ks-credibility-item span { font-size:.72rem; }
        #${SECTION_ID} .ks-route-grid { grid-template-columns:1fr; }
        #${SECTION_ID} .ks-route-card { padding:1rem; }
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
    section.setAttribute("aria-labelledby", "ks-direct-contract-proof-title-v6");
    section.innerHTML = `
      <div class="ks-proof-inner">
        <div class="ks-proof-heading">
          <p class="ks-proof-kicker">DIRECT CONTRACT</p>
          <h2 id="ks-direct-contract-proof-title-v6">講師を紹介してもらうのではなく、<br>講師本人と直接契約する家庭教師です。</h2>
          <p class="ks-proof-lead">ご相談から授業まで、鈴木雄太本人が一貫して担当。仲介を挟まないからこそ、ご家庭の希望と学習状況をそのまま指導へつなげます。</p>
        </div>
        <div class="ks-proof-grid" role="list">
          <div class="ks-proof-item" role="listitem"><strong>入会金 0円</strong><span>個人契約</span></div>
          <div class="ks-proof-item" role="listitem"><strong>管理費 0円</strong><span>固定の管理費なし</span></div>
          <div class="ks-proof-item" role="listitem"><strong>仲介手数料 0円</strong><span>センターを介さない契約</span></div>
          <div class="ks-proof-item" role="listitem"><strong>本人が一貫して担当</strong><span>相談・授業・学習設計</span></div>
        </div>
        <div class="ks-credibility" role="list" aria-label="講師の経験と実績">
          <div class="ks-credibility-item" role="listitem"><b>20年超</b><span>塾講師・家庭教師としての指導経験</span></div>
          <div class="ks-credibility-item" role="listitem"><b>1,000名超</b><span>延べ総指導生徒数</span></div>
          <div class="ks-credibility-item" role="listitem"><b>英検300名以上</b><span>英検指導実績</span></div>
          <div class="ks-credibility-item" role="listitem"><b>トッププロ認定</b><span>T社・Y社・R社での認定実績</span></div>
        </div>
        <div class="ks-route-heading">
          <strong>お子さまの状況に合わせて、最適な入口をご案内します</strong>
          <span>悩みに近い入口から、必要な情報へすぐ進めます</span>
        </div>
        <div class="ks-route-grid" role="list">
          <a class="ks-route-card" role="listitem" href="/eiken/">
            <span class="ks-route-label">英検</span>
            <h3>英検を取りたい</h3>
            <p>今の級や苦手を整理し、英検合格に向けた学習を組み立てます。</p>
            <span class="ks-route-link">英検合格ゼミナールを見る →</span>
          </a>
          <a class="ks-route-card" role="listitem" href="/gyakuten/">
            <span class="ks-route-label">大学受験</span>
            <h3>大学受験で伸ばしたい</h3>
            <p>現在地と志望校から、優先順位を整理して合格までの道筋を考えます。</p>
            <span class="ks-route-link">逆転合格ゼミナールを見る →</span>
          </a>
          <a class="ks-route-card" role="listitem" href="/bansou/">
            <span class="ks-route-label">不登校・通信制</span>
            <h3>自宅で学習を続けたい</h3>
            <p>学習面だけでなく、進路や生活リズムも含めて伴走します。</p>
            <span class="ks-route-link">進路伴走ゼミナールを見る →</span>
          </a>
          <a class="ks-route-card" role="listitem" href="#contact">
            <span class="ks-route-label">個別相談</span>
            <h3>どこに相談すればいいか分からない</h3>
            <p>英検・受験・不登校など、状況を整理してから最適な方向を一緒に考えます。</p>
            <span class="ks-route-link">無料相談へ進む →</span>
          </a>
        </div>
        <p class="ks-proof-note">※実績・認定表記は公式サイト内の講師紹介・実績情報に基づいています。個別の成果には個人差があります。</p>
        <div class="ks-proof-cta"><a href="#contact">まずは無料相談で状況を整理する →</a></div>
      </div>
    `;

    if (target.mode === "after") target.node.insertAdjacentElement("afterend", section);
    else target.node.insertAdjacentElement("beforebegin", section);
    return true;
  };

  const boot = () => { injectStyles(); return createSection(); };
  let attempts = 0;
  const retry = () => { if (boot() || attempts >= 30) return; attempts += 1; window.setTimeout(retry,500); };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", retry, {once:true});
  else retry();

  const observer = new MutationObserver(() => {
    if (document.getElementById(SECTION_ID)) { observer.disconnect(); return; }
    boot();
  });
  observer.observe(document.documentElement, {childList:true, subtree:true});
})();
