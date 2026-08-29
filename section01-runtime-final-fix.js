(() => {
  'use strict';

  const STYLE_ID = 'ks-section01-runtime-final-style';
  const ROUTE_CLASS = 'ks-section01-contract-route-fixed';

  const norm = (value) => (value || '').replace(/\s+/g, '').trim();

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      /* Section 01 final runtime repair — loaded after every legacy mobile layer. */
      .${ROUTE_CLASS},
      .${ROUTE_CLASS} * {
        box-sizing: border-box !important;
        min-width: 0 !important;
        max-width: 100% !important;
      }

      .${ROUTE_CLASS} {
        width: 100% !important;
        max-width: 100% !important;
        margin-inline: auto !important;
        overflow: hidden !important;
      }

      .${ROUTE_CLASS} h1,
      .${ROUTE_CLASS} h2,
      .${ROUTE_CLASS} h3,
      .${ROUTE_CLASS} p,
      .${ROUTE_CLASS} span,
      .${ROUTE_CLASS} strong,
      .${ROUTE_CLASS} b,
      .${ROUTE_CLASS} small {
        white-space: normal !important;
        word-break: normal !important;
        overflow-wrap: anywhere !important;
        line-break: strict !important;
        hyphens: none !important;
      }

      /* Direct-contract proof section shown immediately below the route. */
      #ks-direct-contract-proof-v7,
      #ks-direct-contract-proof-v7 .ks-proof-inner,
      #ks-direct-contract-proof-v7 .ks-proof-heading,
      #ks-direct-contract-proof-v7 .ks-proof-lead,
      #ks-direct-contract-proof-v7 .ks-proof-grid,
      #ks-direct-contract-proof-v7 .ks-credibility {
        box-sizing: border-box !important;
        min-width: 0 !important;
        max-width: 100% !important;
      }

      #ks-direct-contract-proof-v7 .ks-proof-heading {
        width: 100% !important;
        max-width: 980px !important;
        margin-left: auto !important;
        margin-right: auto !important;
        text-align: center !important;
      }

      #ks-direct-contract-proof-v7 h2 {
        width: 100% !important;
        max-width: 900px !important;
        margin-left: auto !important;
        margin-right: auto !important;
        white-space: normal !important;
        word-break: normal !important;
        overflow-wrap: normal !important;
        line-break: strict !important;
        text-wrap: balance !important;
      }

      #ks-direct-contract-proof-v7 .ks-proof-lead {
        width: 100% !important;
        max-width: 880px !important;
        margin-left: auto !important;
        margin-right: auto !important;
        white-space: normal !important;
        word-break: normal !important;
        overflow-wrap: normal !important;
        line-break: strict !important;
      }

      @media (min-width: 601px) and (max-width: 1100px) {
        .${ROUTE_CLASS} {
          display: grid !important;
          grid-template-columns: minmax(0, 1fr) !important;
          gap: .75rem !important;
          padding: 1.05rem 1.1rem !important;
          text-align: center !important;
        }

        .${ROUTE_CLASS} > * {
          width: 100% !important;
          max-width: 100% !important;
          margin-left: auto !important;
          margin-right: auto !important;
        }

        .${ROUTE_CLASS} h1,
        .${ROUTE_CLASS} h2,
        .${ROUTE_CLASS} h3 {
          font-size: clamp(1.55rem, 3.7vw, 2.2rem) !important;
          line-height: 1.45 !important;
          text-align: center !important;
          text-wrap: balance !important;
        }

        .${ROUTE_CLASS} p,
        .${ROUTE_CLASS} span,
        .${ROUTE_CLASS} strong {
          font-size: clamp(.88rem, 1.8vw, 1rem) !important;
          line-height: 1.65 !important;
        }

        .${ROUTE_CLASS}::before,
        .${ROUTE_CLASS}::after {
          max-width: 100% !important;
        }

        #ks-direct-contract-proof-v7 {
          padding-left: 22px !important;
          padding-right: 22px !important;
          overflow: hidden !important;
        }

        #ks-direct-contract-proof-v7 .ks-proof-inner {
          width: 100% !important;
          padding-left: 10px !important;
          padding-right: 10px !important;
        }

        #ks-direct-contract-proof-v7 h2 {
          max-width: 900px !important;
          font-size: clamp(2rem, 4.3vw, 2.7rem) !important;
          line-height: 1.45 !important;
          letter-spacing: 0 !important;
        }

        #ks-direct-contract-proof-v7 .ks-proof-lead {
          font-size: clamp(.95rem, 1.8vw, 1.08rem) !important;
          line-height: 1.85 !important;
        }

        #ks-direct-contract-proof-v7 .ks-proof-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          gap: 16px !important;
        }
      }

      @media (max-width: 600px) {
        .${ROUTE_CLASS} {
          display: grid !important;
          grid-template-columns: minmax(0,1fr) !important;
          gap: .65rem !important;
          width: 100% !important;
          padding: .9rem .85rem !important;
          text-align: center !important;
        }

        .${ROUTE_CLASS} h1,
        .${ROUTE_CLASS} h2,
        .${ROUTE_CLASS} h3 {
          font-size: clamp(1.2rem, 5.7vw, 1.55rem) !important;
          line-height: 1.48 !important;
          text-align: center !important;
        }

        #ks-direct-contract-proof-v7 {
          padding-left: 14px !important;
          padding-right: 14px !important;
        }

        #ks-direct-contract-proof-v7 .ks-proof-inner {
          padding-left: 0 !important;
          padding-right: 0 !important;
        }

        #ks-direct-contract-proof-v7 h2 {
          max-width: 100% !important;
          font-size: clamp(1.65rem, 7.2vw, 2.05rem) !important;
          line-height: 1.5 !important;
        }

        #ks-direct-contract-proof-v7 .ks-proof-grid {
          grid-template-columns: repeat(2, minmax(0,1fr)) !important;
          gap: 10px !important;
        }
      }

      @media (max-width: 359px) {
        #ks-direct-contract-proof-v7 .ks-proof-grid {
          grid-template-columns: minmax(0,1fr) !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function markContractRoute() {
    const candidates = Array.from(document.querySelectorAll('a[href], aside, div'));
    const route = candidates
      .filter((el) => {
        const t = norm(el.textContent);
        return t.includes('料金・担当体制を比較して選ぶ') ||
          (t.includes('CONTRACTCOMPARISON') && t.includes('料金'));
      })
      .sort((a, b) => a.querySelectorAll('*').length - b.querySelectorAll('*').length)[0];

    if (!route) return;

    let box = route;
    if (route.tagName !== 'A') {
      const link = route.closest('a[href]') || route.querySelector('a[href]');
      if (link) box = link;
    }
    box.classList.add(ROUTE_CLASS);
  }

  function run() {
    injectStyle();
    markContractRoute();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }

  /* Legacy scripts mutate the same area at 0.4 / 1.2 / 2.5 seconds. Re-apply after them. */
  [500, 1300, 2700, 3400].forEach((delay) => setTimeout(run, delay));
})();
