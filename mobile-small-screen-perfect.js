(() => {
  "use strict";

  const STYLE_ID = "mobile-small-screen-perfect-v3";
  const CONTRACT_ID = "ks-direct-contract-proof-v7";

  const phraseMap = {
    "講師を紹介してもらうのではなく、講師本人と直接契約する家庭教師です。": [
      "講師を紹介してもらうのではなく、",
      "講師本人と",
      "直接契約する家庭教師です。",
    ],
    "まずは無料相談で、お子さまに合った学習プランをご提案します": [
      "まずは無料相談で、",
      "お子さまに合った学習プランを",
      "ご提案します",
    ],
  };

  const normalize = (value) => (value || "").replace(/\s+/g, "").trim();
  const escapeHtml = (value) => value.replace(/[&<>\"]/g, (c) => ({
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
      html, body { max-width:100%; overflow-x:hidden !important; }
      *, *::before, *::after { box-sizing:border-box; }

      /* The mobile screenshots showed the old brand treatment becoming cramped.
         Keep the name prominent and remove the decorative ALL-IN-ONE badge. */
      nav.fixed.top-0.ks-mobile-header-final {
        width:100% !important;
        max-width:100vw !important;
        overflow:visible !important;
        z-index:100 !important;
      }
      nav.fixed.top-0.ks-mobile-header-final a,
      nav.fixed.top-0.ks-mobile-header-final button,
      nav.fixed.top-0.ks-mobile-header-final span,
      nav.fixed.top-0.ks-mobile-header-final div,
      nav.fixed.top-0.ks-mobile-header-final li {
        min-width:0;
        max-width:100%;
      }
      nav.fixed.top-0.ks-mobile-header-final .ks-hide-all-in-one { display:none !important; }
      nav.fixed.top-0.ks-mobile-header-final .ks-brand-emphasis {
        color:#fff !important;
        font-family:"Noto Serif JP",serif !important;
        font-weight:900 !important;
        letter-spacing:.01em !important;
        line-height:1.2 !important;
        white-space:nowrap !important;
      }
      nav.fixed.top-0.ks-mobile-header-final .ks-header-subtitle {
        color:rgba(255,255,255,.9) !important;
        line-height:1.45 !important;
        white-space:normal !important;
        word-break:keep-all !important;
        overflow-wrap:normal !important;
      }

      /* Never allow the direct-contract headline or CTA sentence to be clipped. */
      #${CONTRACT_ID} { width:100% !important; max-width:100vw !important; overflow:hidden !important; }
      #${CONTRACT_ID} .ks-proof-inner { width:100% !important; max-width:1200px; margin:0 auto; }
      #${CONTRACT_ID} .ks-proof-heading,
      #${CONTRACT_ID} .ks-proof-lead,
      #${CONTRACT_ID} .ks-proof-cta-wrap,
      #${CONTRACT_ID} .ks-proof-cta-wrap p { max-width:100% !important; overflow:visible !important; }
      #${CONTRACT_ID} h2 {
        max-width:100% !important;
        margin-inline:auto !important;
        overflow:visible !important;
        word-break:normal !important;
        overflow-wrap:normal !important;
        line-break:strict !important;
        text-wrap:balance;
      }
      #${CONTRACT_ID} .ks-mobile-phrase {
        display:block !important;
        max-width:100% !important;
        white-space:normal !important;
        word-break:keep-all !important;
        overflow-wrap:normal !important;
      }
      #${CONTRACT_ID} .ks-mobile-accent { color:#e83e73 !important; }
      #${CONTRACT_ID} .ks-proof-cta-wrap p .ks-mobile-phrase {
        display:block !important;
        line-height:1.55 !important;
      }

      @media (max-width:600px) {
        nav.fixed.top-0.ks-mobile-header-final {
          min-height:78px !important;
          padding:8px 10px !important;
          background:#0b1b33 !important;
        }
        nav.fixed.top-0.ks-mobile-header-final .ks-brand-emphasis {
          font-size:clamp(.95rem,4.2vw,1.18rem) !important;
        }
        nav.fixed.top-0.ks-mobile-header-final .ks-header-subtitle {
          font-size:clamp(.66rem,2.8vw,.8rem) !important;
        }

        #${CONTRACT_ID} .ks-proof-inner { padding-inline:12px !important; }
        #${CONTRACT_ID} .ks-proof-heading { padding-inline:2px !important; }
        #${CONTRACT_ID} h2 {
          font-size:clamp(1.42rem,6.3vw,2rem) !important;
          line-height:1.48 !important;
          letter-spacing:-.015em !important;
        }
        #${CONTRACT_ID} .ks-proof-kicker { font-size:.7rem !important; }
        #${CONTRACT_ID} .ks-proof-lead {
          font-size:clamp(.86rem,3.8vw,1rem) !important;
          line-height:1.75 !important;
          padding-inline:2px !important;
        }
        #${CONTRACT_ID} .ks-proof-grid { gap:8px !important; }
        #${CONTRACT_ID} .ks-proof-item {
          padding:.8rem .45rem !important;
          min-width:0 !important;
        }
        #${CONTRACT_ID} .ks-proof-item strong {
          font-size:clamp(.78rem,3.2vw,.92rem) !important;
          line-height:1.45 !important;
          word-break:keep-all !important;
        }
        #${CONTRACT_ID} .ks-proof-item b { font-size:1.45rem !important; }
        #${CONTRACT_ID} .ks-proof-item span { font-size:.66rem !important; line-height:1.45 !important; }
        #${CONTRACT_ID} .ks-credibility-item b { font-size:clamp(.92rem,4vw,1.15rem) !important; }
        #${CONTRACT_ID} .ks-credibility-item span { font-size:.66rem !important; }
        #${CONTRACT_ID} .ks-route-card { padding:.9rem !important; }
        #${CONTRACT_ID} .ks-route-card h3 {
          font-size:clamp(.96rem,4.3vw,1.1rem) !important;
          line-height:1.5 !important;
          word-break:keep-all !important;
        }
        #${CONTRACT_ID} .ks-route-card p {
          font-size:clamp(.72rem,3.2vw,.82rem) !important;
          line-height:1.7 !important;
          word-break:normal !important;
          overflow-wrap:normal !important;
        }
        #${CONTRACT_ID} .ks-proof-cta-wrap { padding:.85rem !important; }
        #${CONTRACT_ID} .ks-proof-cta-wrap p {
          font-size:clamp(.82rem,3.6vw,.95rem) !important;
          line-height:1.55 !important;
          margin-bottom:.6rem !important;
          text-align:center !important;
        }
        #${CONTRACT_ID} .ks-proof-cta a {
          min-height:54px !important;
          font-size:clamp(.9rem,4vw,1rem) !important;
          white-space:nowrap !important;
        }
      }

      @media (max-width:390px) {
        nav.fixed.top-0.ks-mobile-header-final {
          min-height:76px !important;
          padding:7px 8px !important;
        }
        nav.fixed.top-0.ks-mobile-header-final .ks-brand-emphasis {
          font-size:15px !important;
        }
        nav.fixed.top-0.ks-mobile-header-final .ks-header-subtitle {
          font-size:10px !important;
        }
        #${CONTRACT_ID} .ks-proof-inner { padding-inline:10px !important; }
        #${CONTRACT_ID} h2 { font-size:21px !important; line-height:1.5 !important; }
        #${CONTRACT_ID} .ks-proof-lead { font-size:13.5px !important; }
        #${CONTRACT_ID} .ks-proof-item strong { font-size:13px !important; }
        #${CONTRACT_ID} .ks-proof-item b { font-size:22px !important; }
        #${CONTRACT_ID} .ks-proof-item span { font-size:10px !important; }
        #${CONTRACT_ID} .ks-proof-cta-wrap p { font-size:13px !important; }
        #${CONTRACT_ID} .ks-proof-cta a { font-size:14px !important; }
      }
    `;
    document.head.appendChild(style);
  };

  const phraseWrap = (el, parts) => {
    if (!el || el.dataset.mobilePhraseWrapped === "1") return;
    el.innerHTML = parts.map((part) => {
      const accent = part.includes("直接契約");
      return `<span class="ks-mobile-phrase${accent ? " ks-mobile-accent" : ""}">${escapeHtml(part)}</span>`;
    }).join("");
    el.dataset.mobilePhraseWrapped = "1";
  };

  const fixContractCopy = () => {
    const root = document.getElementById(CONTRACT_ID);
    if (!root) return;

    const heading = root.querySelector("h2");
    if (heading) {
      const text = normalize(heading.textContent);
      if (phraseMap[text]) phraseWrap(heading, phraseMap[text]);
    }

    const ctaLead = root.querySelector(".ks-proof-cta-wrap p");
    if (ctaLead) {
      const text = normalize(ctaLead.textContent);
      if (phraseMap[text]) phraseWrap(ctaLead, phraseMap[text]);
    }
  };

  const cleanHeaderCopy = () => {
    const header = document.querySelector("nav.fixed.top-0");
    if (!header) return;
    header.classList.add("ks-mobile-header-final");

    header.querySelectorAll("*").forEach((el) => {
      const direct = normalize(el.textContent);
      if (direct === "ALL-IN-ONE") {
        el.classList.add("ks-hide-all-in-one");
        return;
      }

      if (!el.children.length && direct.includes("ALL-IN-ONE")) {
        const cleaned = el.textContent.replace(/ALL-IN-ONE\s*\|?\s*/g, "").replace(/\s*\|\s*\|/g, "|").trim();
        if (cleaned !== el.textContent.trim()) el.textContent = cleaned;
      }

      if (!el.children.length && direct.includes("プロ家庭教師") && direct.includes("鈴木雄太")) {
        el.classList.add("ks-brand-emphasis");
      }

      if (!el.children.length && /英検|受験|不登校|通信制/.test(direct) && !direct.includes("プロ家庭教師")) {
        el.classList.add("ks-header-subtitle");
      }
    });

    header.querySelectorAll("[aria-label], [title]").forEach((el) => {
      const label = `${el.getAttribute("aria-label") || ""} ${el.getAttribute("title") || ""}`;
      if (/ALL-IN-ONE/i.test(label)) {
        el.setAttribute("aria-label", label.replace(/ALL-IN-ONE/gi, "").trim());
      }
    });
  };

  const protectOtherText = () => {
    document.querySelectorAll(".p100-choice h3, .p100-choice p, #${CONTRACT_ID} .ks-route-card h3, #${CONTRACT_ID} .ks-route-card p").forEach((el) => {
      el.style.maxWidth = "100%";
      el.style.overflowWrap = "normal";
      el.style.wordBreak = el.matches("h3") ? "keep-all" : "normal";
    });
  };

  const run = () => {
    injectStyles();
    cleanHeaderCopy();
    fixContractCopy();
    protectOtherText();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once:true });
  } else {
    run();
  }

  setTimeout(run, 300);
  setTimeout(run, 900);
  setTimeout(run, 1800);
})();
