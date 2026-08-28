(() => {
  'use strict';

  // Production layout stabilizer.
  // The previous version rewrote DOM nodes and injected a large set of
  // narrow-screen rules. That made the page vulnerable to parent flex/grid
  // rules, producing the exact "content on the left / footer on the right"
  // regression seen in production. This version deliberately does not rewrite
  // content; it only restores the page-level flow and safe mobile sizing.

  const STYLE_ID = 'ks-production-layout-stabilizer-v8';

  function install() {
    if (document.getElementById(STYLE_ID)) return;

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

      /* Critical fix: the application root must be a vertical document flow.
         A row flex/grid parent is what can put the footer beside the page. */
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

      img, video, canvas, svg {
        max-width: 100% !important;
      }

      @media (max-width: 600px) {
        body, #root, main, footer {
          width: 100% !important;
          max-width: 100vw !important;
          min-width: 0 !important;
        }

        #root > main,
        #root > footer {
          flex: none !important;
        }

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

  install();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', install, { once: true });
  }
})();
