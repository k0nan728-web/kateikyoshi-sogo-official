(() => {
  "use strict";

  const STYLE_ID = "mobile-small-screen-perfect-runtime";
  const PHRASES = {
    "英検を取りたい": ["英検を", "取りたい"],
    "大学受験で伸ばしたい": ["大学受験で", "伸ばしたい"],
    "不登校・通信制で学びたい": ["不登校・通信制で", "学びたい"],
    "まず相談して整理したい": ["まず相談して", "整理したい"],
    "自宅で学習を続けたい": ["自宅で", "学習を続けたい"],
    "どこに相談すればいいか分からない": ["どこに相談すれば", "いいか分からない"],
    "今の級や苦手を整理し、英検合格に向けた学習を組み立てます。": ["今の級や苦手を整理し、", "英検合格に向けた学習を組み立てます。"],
    "現在地と志望校から、優先順位を整理して合格までの道筋を考えます。": ["現在地と志望校から、", "優先順位を整理して", "合格までの道筋を考えます。"],
    "学習だけでなく生活リズムや進路まで、無理のないペースで伴走します。": ["学習だけでなく", "生活リズムや進路まで、", "無理のないペースで伴走します。"],
    "今の状況を一緒に整理し、必要な支援だけをご提案します。": ["今の状況を一緒に整理し、", "必要な支援だけをご提案します。"],
    "級・弱点・4技能を整理して、合格までの学習計画を一緒に作ります。": ["級・弱点・4技能を整理して、", "合格までの学習計画を一緒に作ります。"],
    "現在地から志望校まで逆算し、英語・国語・社会の優先順位を整えます。": ["現在地から志望校まで逆算し、", "英語・国語・社会の優先順位を整えます。"],
    "講師を紹介してもらうのではなく、講師本人と直接契約する家庭教師です。": ["講師を紹介してもらうのではなく、", "講師本人と", "直接契約", "する家庭教師です。"]
  };

  const esc = (s) => s.replace(/[&<>\"]/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]));

  const wrap = (el) => {
    if (!el || el.dataset.phraseWrapped === "1") return;
    const current = (el.textContent || "").replace(/\s+/g, "").trim();
    if (!current) return;
    const match = Object.keys(PHRASES).find((key) => current === key);
    if (!match) return;
    el.innerHTML = PHRASES[match].map((p) => `<span class="ms-phrase${p.includes("直接契約") ? " ms-accent" : ""}">${esc(p)}</span>`).join("");
    el.dataset.phraseWrapped = "1";
  };

  const inject = () => {
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.textContent = `
        @media(max-width:600px){
          .ms-phrase{display:inline-block;white-space:nowrap;max-width:100%;}
          .ms-accent{color:#e83e73!important;}
          #ks-direct-contract-proof-v7 h2 br{display:none!important;}
          #ks-direct-contract-proof-v7 h2 .ms-phrase{margin-right:.08em;}
          #ks-direct-contract-proof-v7 .ks-route-card h3 .ms-phrase,
          #ks-direct-contract-proof-v7 .ks-route-card p .ms-phrase,
          .p100-choice h3 .ms-phrase,
          .p100-choice p .ms-phrase{margin-right:.12em;}
        }
      `;
      document.head.appendChild(style);
    }

    document.querySelectorAll("#ks-direct-contract-proof-v7 .ks-route-card h3, #ks-direct-contract-proof-v7 .ks-route-card p, .p100-choice h3, .p100-choice p").forEach(wrap);
    const contract = document.querySelector("#ks-direct-contract-proof-v7 h2");
    if (contract) wrap(contract);
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", inject, { once:true });
  else inject();
  setTimeout(inject, 700);
  setTimeout(inject, 1800);
})();
