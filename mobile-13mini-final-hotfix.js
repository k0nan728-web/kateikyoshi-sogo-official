(() => {
  'use strict';

  // Production layout stabilizer.
  // Keeps the application in a safe vertical document flow and adds the
  // approved responsive header presentation without rewriting the React DOM.

  const STYLE_ID = 'ks-production-layout-stabilizer-v8';
  const HEADER_STYLE_ID = 'ks-approved-header-design-v1';

  function install() {
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement('style');
      style.id = STYLE_ID;
      style.textContent = `
        *, *::before, *::after { box-sizing: border-box !important; }
        html, body {
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow-x: hidden !important;
        }

        body > #root,
        #root {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow-x: clip !important;
        }

        #root > nav,
        #root > header,
        #root > main,
        #root > footer {
          display: block !important;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          margin-left: 0 !important;
          margin-right: 0 !important;
          float: none !important;
          clear: both !important;
        }

        main {
          position: relative !important;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          overflow-x: clip !important;
        }

        main > section,
        main > article,
        main > div {
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
        }

        footer {
          position: relative !important;
          inset: auto !important;
          width: 100% !important;
          max-width: 100% !important;
          min-width: 0 !important;
          margin: 0 !important;
          float: none !important;
          clear: both !important;
          transform: none !important;
        }

        img, video, canvas, svg { max-width: 100% !important; }

        @media (max-width: 600px) {
          body, #root, main, footer {
            width: 100% !important;
            max-width: 100vw !important;
            min-width: 0 !important;
          }

          #root > main,
          #root > footer { flex: none !important; }

          main > section:first-child {
            width: 100% !important;
            max-width: 100% !important;
            min-width: 0 !important;
            margin: 0 !important;
            overflow: hidden !important;
          }

          main > section:first-child > div {
            width: 100% !important;
            max-width: 1200px !important;
            min-width: 0 !important;
            margin-left: auto !important;
            margin-right: auto !important;
          }

          main h1, main h2, main h3, main h4, main h5, main h6,
          main p, main li, main a, main button, main span, main strong {
            min-width: 0 !important;
            max-width: 100% !important;
            white-space: normal !important;
            word-break: normal !important;
            overflow-wrap: break-word !important;
            line-break: strict !important;
            hyphens: none !important;
          }
        }
      `;
      document.head.appendChild(style);
    }

    if (!document.getElementById(HEADER_STYLE_ID)) {
      const style = document.createElement('style');
      style.id = HEADER_STYLE_ID;
      style.textContent = `
        /* ========================================================
           APPROVED HEADER DESIGN — navy / gold / ivory
           High-specificity selectors intentionally beat older header layers.
           ======================================================== */
        html body nav.fixed.top-0 {
          width: 100% !important;
          max-width: 100vw !important;
          background:
            radial-gradient(circle at 55% -120%, rgba(34,83,139,.22), transparent 54%),
            linear-gradient(180deg,#0b2547 0%,#081d38 100%) !important;
          border: 0 !important;
          border-bottom: 3px solid #c99726 !important;
          box-shadow: 0 10px 28px rgba(5,21,42,.18) !important;
          backdrop-filter: blur(14px) !important;
          -webkit-backdrop-filter: blur(14px) !important;
          overflow: visible !important;
        }

        html body nav.fixed.top-0 > .container {
          width: 100% !important;
          max-width: 1360px !important;
          margin-inline: auto !important;
          padding-inline: clamp(20px,3.2vw,46px) !important;
        }

        html body nav.fixed.top-0 > .container > div {
          width: 100% !important;
          min-width: 0 !important;
          min-height: 88px !important;
          padding-block: 12px !important;
          display: flex !important;
          align-items: center !important;
          gap: clamp(14px,2vw,28px) !important;
        }

        html body nav.fixed.top-0 > .container > div > a:first-child {
          min-width: 0 !important;
          flex: 1 1 auto !important;
          display: flex !important;
          align-items: center !important;
          gap: clamp(18px,2vw,30px) !important;
          overflow: visible !important;
          text-decoration: none !important;
        }

        /* Gold professional badge */
        html body nav.fixed.top-0 > .container > div > a:first-child > div:first-child {
          display: inline-flex !important;
          flex: 0 0 auto !important;
          align-items: center !important;
          justify-content: center !important;
          min-height: 48px !important;
          padding: 0 17px !important;
          border: 1.5px solid #d2a42f !important;
          border-radius: 9px !important;
          background: linear-gradient(180deg,rgba(255,255,255,.035),rgba(255,255,255,.012)) !important;
          color: #f0c85c !important;
          font-size: 14px !important;
          font-weight: 800 !important;
          line-height: 1 !important;
          letter-spacing: .035em !important;
          white-space: nowrap !important;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.018) !important;
        }

        /* Brand block. The crest is CSS-only, so the existing DOM stays intact. */
        html body nav.fixed.top-0 > .container > div > a:first-child > div:nth-child(2) {
          position: relative !important;
          min-width: 0 !important;
          flex: 1 1 auto !important;
          padding-left: 72px !important;
          overflow: visible !important;
        }

        html body nav.fixed.top-0 > .container > div > a:first-child > div:nth-child(2)::before {
          content: 'S' !important;
          position: absolute !important;
          left: 0 !important;
          top: 50% !important;
          width: 54px !important;
          height: 62px !important;
          transform: translateY(-50%) !important;
          display: grid !important;
          place-items: center !important;
          border: 2px solid #d5a62f !important;
          border-radius: 48% 48% 42% 42% / 38% 38% 58% 58% !important;
          background: linear-gradient(180deg,rgba(16,52,91,.82),rgba(5,24,47,.96)) !important;
          color: #e9bd4f !important;
          font-family: Georgia,'Times New Roman',serif !important;
          font-size: 30px !important;
          font-weight: 700 !important;
          line-height: 1 !important;
          text-shadow: 0 1px 0 rgba(255,255,255,.08) !important;
          box-shadow:
            0 0 0 4px rgba(213,166,47,.10),
            inset 0 0 0 2px rgba(213,166,47,.24) !important;
        }

        html body nav.fixed.top-0 > .container > div > a:first-child > div:nth-child(2)::after {
          content: '一人ひとりに最適な指導で、未来を創る' !important;
          display: block !important;
          margin-top: 4px !important;
          color: #dcb24b !important;
          font-family: 'Noto Sans JP',sans-serif !important;
          font-size: 11px !important;
          font-weight: 700 !important;
          line-height: 1.35 !important;
          letter-spacing: .035em !important;
          white-space: nowrap !important;
        }

        html body nav.fixed.top-0 > .container > div > a:first-child > div:nth-child(2) span:first-child {
          display: block !important;
          max-width: 100% !important;
          overflow: visible !important;
          color: #fff !important;
          font-family: 'Noto Serif JP',serif !important;
          font-size: clamp(21px,2.1vw,29px) !important;
          font-weight: 700 !important;
          line-height: 1.22 !important;
          letter-spacing: .02em !important;
          white-space: nowrap !important;
          text-overflow: clip !important;
          text-shadow: 0 1px 0 rgba(255,255,255,.06) !important;
        }

        html body nav.fixed.top-0 > .container > div > a:first-child > div:nth-child(2) span:last-child {
          display: none !important;
        }

        /* Primary consultation CTA */
        html body nav.fixed.top-0 .btn-cta {
          flex: 0 0 auto !important;
          min-height: 54px !important;
          padding: 0 26px !important;
          border: 2px solid #d7a936 !important;
          border-radius: 999px !important;
          background: linear-gradient(180deg,#fffefa,#fffaf0) !important;
          color: #102b4b !important;
          font-family: 'Noto Sans JP',sans-serif !important;
          font-size: 15px !important;
          font-weight: 800 !important;
          line-height: 1 !important;
          letter-spacing: .015em !important;
          white-space: nowrap !important;
          box-shadow: 0 8px 20px rgba(0,0,0,.14), inset 0 0 0 1px rgba(255,255,255,.9) !important;
          transition: transform .16s ease, box-shadow .16s ease, background .16s ease !important;
        }

        html body nav.fixed.top-0 .btn-cta::before {
          content: '●' !important;
          display: inline-block !important;
          margin-right: 8px !important;
          color: #c99726 !important;
          font-size: 10px !important;
          vertical-align: 1px !important;
        }

        html body nav.fixed.top-0 .btn-cta:hover {
          transform: translateY(-1px) !important;
          background: #fff !important;
          box-shadow: 0 11px 26px rgba(0,0,0,.18), inset 0 0 0 1px rgba(255,255,255,.95) !important;
        }

        /* Menu button remains visible at every viewport, matching approved mockup. */
        html body nav.fixed.top-0 button {
          display: inline-flex !important;
          flex: 0 0 54px !important;
          width: 54px !important;
          min-width: 54px !important;
          height: 54px !important;
          padding: 11px !important;
          align-items: center !important;
          justify-content: center !important;
          border: 1px solid rgba(255,255,255,.35) !important;
          border-radius: 13px !important;
          background: rgba(255,255,255,.035) !important;
          color: #fff !important;
          box-shadow: inset 0 0 0 1px rgba(255,255,255,.025) !important;
        }

        html body nav.fixed.top-0 button:hover {
          background: rgba(255,255,255,.09) !important;
          border-color: rgba(255,255,255,.55) !important;
        }

        /* The approved header is one clean bar. */
        html body nav.fixed.top-0 > div:nth-child(2) {
          display: none !important;
        }

        /* iPad / tablets: full approved composition. */
        @media (min-width: 601px) and (max-width: 1100px) {
          html body nav.fixed.top-0 > .container {
            padding-inline: 22px !important;
          }
          html body nav.fixed.top-0 > .container > div {
            min-height: 84px !important;
            padding-block: 10px !important;
            gap: 13px !important;
          }
          html body nav.fixed.top-0 > .container > div > a:first-child {
            gap: 16px !important;
          }
          html body nav.fixed.top-0 > .container > div > a:first-child > div:first-child {
            min-height: 44px !important;
            padding-inline: 13px !important;
            font-size: 12px !important;
          }
          html body nav.fixed.top-0 > .container > div > a:first-child > div:nth-child(2) {
            padding-left: 58px !important;
          }
          html body nav.fixed.top-0 > .container > div > a:first-child > div:nth-child(2)::before {
            width: 44px !important;
            height: 52px !important;
            font-size: 24px !important;
          }
          html body nav.fixed.top-0 > .container > div > a:first-child > div:nth-child(2) span:first-child {
            font-size: clamp(18px,2.35vw,24px) !important;
          }
          html body nav.fixed.top-0 > .container > div > a:first-child > div:nth-child(2)::after {
            font-size: 9.5px !important;
          }
          html body nav.fixed.top-0 .btn-cta {
            min-height: 50px !important;
            padding-inline: 20px !important;
            font-size: 14px !important;
          }
          html body nav.fixed.top-0 button {
            flex-basis: 50px !important;
            width: 50px !important;
            min-width: 50px !important;
            height: 50px !important;
          }
        }

        /* Smartphones: same brand language, reduced density for real fit. */
        @media (max-width: 600px) {
          html body nav.fixed.top-0 > .container {
            padding-inline: 11px !important;
          }
          html body nav.fixed.top-0 > .container > div {
            min-height: 68px !important;
            padding-block: 7px !important;
            gap: 7px !important;
          }
          html body nav.fixed.top-0 > .container > div > a:first-child {
            min-width: 0 !important;
            max-width: calc(100% - 151px) !important;
            gap: 0 !important;
          }
          html body nav.fixed.top-0 > .container > div > a:first-child > div:first-child {
            display: none !important;
          }
          html body nav.fixed.top-0 > .container > div > a:first-child > div:nth-child(2) {
            width: 100% !important;
            padding-left: 42px !important;
          }
          html body nav.fixed.top-0 > .container > div > a:first-child > div:nth-child(2)::before {
            width: 32px !important;
            height: 38px !important;
            border-width: 1.5px !important;
            font-size: 18px !important;
            box-shadow: 0 0 0 2px rgba(213,166,47,.09), inset 0 0 0 1px rgba(213,166,47,.24) !important;
          }
          html body nav.fixed.top-0 > .container > div > a:first-child > div:nth-child(2) span:first-child {
            font-size: clamp(12px,3.55vw,15px) !important;
            line-height: 1.23 !important;
            letter-spacing: 0 !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }
          html body nav.fixed.top-0 > .container > div > a:first-child > div:nth-child(2)::after {
            content: '一人ひとりに最適な指導を' !important;
            margin-top: 2px !important;
            font-size: clamp(7.5px,2.05vw,9px) !important;
            letter-spacing: 0 !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }
          html body nav.fixed.top-0 .btn-cta {
            min-height: 43px !important;
            max-width: 103px !important;
            padding-inline: 9px !important;
            border-width: 1.5px !important;
            font-size: 10px !important;
            line-height: 1.2 !important;
            white-space: normal !important;
            text-align: center !important;
          }
          html body nav.fixed.top-0 .btn-cta::before {
            display: none !important;
          }
          html body nav.fixed.top-0 button {
            flex-basis: 41px !important;
            width: 41px !important;
            min-width: 41px !important;
            height: 41px !important;
            padding: 8px !important;
            border-radius: 10px !important;
          }
        }

        @media (max-width: 359px) {
          html body nav.fixed.top-0 > .container { padding-inline: 8px !important; }
          html body nav.fixed.top-0 > .container > div { gap: 5px !important; }
          html body nav.fixed.top-0 > .container > div > a:first-child { max-width: calc(100% - 135px) !important; }
          html body nav.fixed.top-0 > .container > div > a:first-child > div:nth-child(2) { padding-left: 36px !important; }
          html body nav.fixed.top-0 > .container > div > a:first-child > div:nth-child(2)::before {
            width: 28px !important;
            height: 34px !important;
            font-size: 16px !important;
          }
          html body nav.fixed.top-0 > .container > div > a:first-child > div:nth-child(2)::after { display: none !important; }
          html body nav.fixed.top-0 .btn-cta { max-width: 91px !important; padding-inline: 6px !important; font-size: 9px !important; }
          html body nav.fixed.top-0 button { flex-basis: 39px !important; width: 39px !important; min-width: 39px !important; height: 39px !important; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  install();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', install, { once: true });
  }
})();
