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
    "講師を紹介してもらうのではなく、講師本人と直接契約する家庭教師です。": ["講師を紹介してもらうのではなく、", "講師本人と", "直接契約", "する家庭教師です。"]
  };

  const esc = (s) => s.replace(/[&<>\"]/g, (c) => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]));

  const wrap = (el, parts) => {
    if (!el || el.dataset.phraseWrapped === "1") return;
    const current = (el.textContent || "").replace(/\s+/g, "").trim();
    if (!current) return;
    if (current.includes("直接契約")) {
      el.innerHTML = '<span class="ms-phrase">講師を紹介してもらうのではなく、</span><span class="ms-phrase">講師本人と</span><span class="ms-phrase ms-accent">直接契約</span><span class="ms-phrase">する家庭教師です。</span>';
    } else {
      const match = Object.keys(PHRASES).find((key) => current === key);
      if (!match) return;
      el.innerHTML = PHRASES[match].map((p) => `<span class="ms-phrase">${esc(p)}</span>`).join("");
    }
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
          .p100-choice h3 .ms-phrase{margin-right:.12em;}
        }
      `;
      document.head.appendChild(style);
    }

    document.querySelectorAll("#ks-direct-contract-proof-v7 .ks-route-card h3, .p100-choice h3").forEach((el) => wrap(el));
    const contract = document.querySelector("#ks-direct-contract-proof-v7 h2");
    if (contract) wrap(contract, []);
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", inject, { once:true });
  else inject();
  setTimeout(inject, 700);
  setTimeout(inject, 1800);
})();
