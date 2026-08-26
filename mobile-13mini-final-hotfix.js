(() => {
  "use strict";
  const STYLE_ID = "ks-13mini-final-hotfix";
  const CONTRACT_ID = "ks-direct-contract-proof-v7";

  const wrapSentence = (el, parts) => {
    if (!el || el.dataset.miniHotfixWrapped === "1") return;
    el.innerHTML = parts.map((p) => `<span class="ks-mini-line">${p}</span>`).join("");
    el.dataset.miniHotfixWrapped = "1";
  };

  const run = () => {
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement("style");
      style.id = STYLE_ID;
      style.textContent = `
        html,body{overflow-x:hidden!important;width:100%;max-width:100%;}
        @media(max-width:390px){
          #${CONTRACT_ID}{overflow:hidden!important;width:100%!important;}
          #${CONTRACT_ID} .ks-proof-inner{padding-left:10px!important;padding-right:10px!important;}
          #${CONTRACT_ID} h2{font-size:21px!important;line-height:1.5!important;letter-spacing:-.02em!important;}
          #${CONTRACT_ID} .ks-mini-line{display:block!important;white-space:nowrap!important;max-width:100%!important;}
          #${CONTRACT_ID} .ks-proof-cta-wrap p{font-size:13px!important;line-height:1.55!important;}
          #${CONTRACT_ID} .ks-proof-cta-wrap p .ks-mini-line{white-space:normal!important;}
          #${CONTRACT_ID} .ks-route-card h3{font-size:15px!important;line-height:1.5!important;word-break:keep-all!important;overflow-wrap:normal!important;}
          #${CONTRACT_ID} .ks-route-card p{font-size:12px!important;line-height:1.7!important;word-break:normal!important;overflow-wrap:normal!important;}
          #${CONTRACT_ID} .ks-proof-item strong{font-size:13px!important;line-height:1.45!important;word-break:keep-all!important;}
        }
      `;
      document.head.appendChild(style);
    }

    const root = document.getElementById(CONTRACT_ID);
    if (root) {
      const heading = root.querySelector("h2");
      if (heading && !heading.dataset.miniHotfixWrapped) {
        wrapSentence(heading, ["講師を紹介してもらうのではなく、", "講師本人と", "直接契約する家庭教師です。"]);
        const accent = Array.from(heading.children).find((el) => el.textContent.includes("直接契約"));
        if (accent) accent.style.color = "#e83e73";
      }

      const cta = root.querySelector(".ks-proof-cta-wrap p");
      if (cta && !cta.dataset.miniHotfixWrapped) {
        wrapSentence(cta, ["まずは無料相談で、", "お子さまに合った学習プランを", "ご提案します"]);
      }

      root.querySelectorAll(".ks-route-card h3,.ks-route-card p").forEach((el) => {
        el.style.maxWidth = "100%";
        el.style.overflow = "visible";
      });
    }

    const header = document.querySelector("nav.fixed.top-0");
    if (header) {
      header.classList.add("ks-mobile-header-final");
      header.querySelectorAll("*").forEach((el) => {
        if (el.children.length) return;
        const text = (el.textContent || "").replace(/\s+/g, " ").trim();
        if (text === "ALL-IN-ONE") el.style.display = "none";
        if (text.includes("ALL-IN-ONE")) el.textContent = text.replace(/ALL-IN-ONE\s*\|?\s*/g, "").trim();
        if (text.includes("プロ家庭教師") && text.includes("鈴木雄太")) {
          el.style.fontSize = "clamp(15px,4.2vw,20px)";
          el.style.fontWeight = "900";
          el.style.lineHeight = "1.2";
          el.style.whiteSpace = "nowrap";
          el.style.maxWidth = "100%";
        }
      });
    }
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run, { once:true });
  else run();
  setTimeout(run, 400);
  setTimeout(run, 1200);
})();
