(() => {
  'use strict';
  const SECTION_ID = 'ks-premium-intro-v6';
  const STYLE_ID = 'ks-section1-xsmax-final-pass-v1';

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      #${SECTION_ID} .section-title-prefix,
      #${SECTION_ID} .section-title-promise {
        display: inline-block !important;
        white-space: nowrap !important;
      }
      #${SECTION_ID} .section-title-promise strong {
        display: inline !important;
        color: #d39a10 !important;
        font-size: 1.28em !important;
        line-height: 1 !important;
      }

      /* The three promise headings must read as the primary information inside each card. */
      #${SECTION_ID} .promise h3 {
        font-size: clamp(20px, 1.95vw, 24px) !important;
        line-height: 1.48 !important;
        font-weight: 900 !important;
      }
      #${SECTION_ID} .promise-title-line {
        display: block !important;
        white-space: nowrap !important;
      }

      /* Comparison card: semantic break immediately before "料金を比較する". */
      #${SECTION_ID} .ks-comparison-title-main,
      #${SECTION_ID} .ks-comparison-title-price {
        display: block !important;
        text-align: center !important;
      }
      #${SECTION_ID} .ks-comparison-title-price {
        white-space: nowrap !important;
        margin-top: .22em !important;
      }

      @media (min-width: 680px) and (max-width: 834px) {
        #${SECTION_ID} .promise h3 { font-size: 19px !important; }
        #${SECTION_ID} .section-title-promise { white-space: nowrap !important; }
      }

      @media (max-width: 679px) {
        #${SECTION_ID} .section-title {
          white-space: normal !important;
          font-size: clamp(23px, 6.1vw, 28px) !important;
          line-height: 1.45 !important;
          margin-bottom: 28px !important;
        }
        #${SECTION_ID} .section-title-prefix,
        #${SECTION_ID} .section-title-promise {
          display: block !important;
          width: 100% !important;
          text-align: center !important;
        }
        #${SECTION_ID} .section-title-promise {
          margin-top: 6px !important;
          font-size: 1.08em !important;
        }

        #${SECTION_ID} .promise {
          padding: 20px 18px 22px !important;
        }
        #${SECTION_ID} .promise-head {
          gap: 16px !important;
          margin-bottom: 18px !important;
        }
        #${SECTION_ID} .icon {
          width: 62px !important;
          height: 62px !important;
          flex-basis: 62px !important;
        }
        #${SECTION_ID} .icon svg {
          width: 33px !important;
          height: 33px !important;
        }
        #${SECTION_ID} .promise h3 {
          font-size: clamp(22px, 5.7vw, 25px) !important;
          line-height: 1.48 !important;
          letter-spacing: 0 !important;
        }
        #${SECTION_ID} .promise p {
          font-size: clamp(15px, 3.85vw, 17px) !important;
          line-height: 1.8 !important;
          max-width: 31em !important;
          margin-inline: auto !important;
        }

        .ks-section1-comparison-v8,
        .ks-section1-comparison-v9 {
          min-height: 190px !important;
          padding: 24px 52px 26px 18px !important;
        }
        .ks-section1-comparison-v8 .ks-comparison-kicker,
        .ks-section1-comparison-v9 .ks-comparison-kicker {
          font-size: 12px !important;
          margin-bottom: 13px !important;
        }
        .ks-section1-comparison-v8 .ks-comparison-title,
        .ks-section1-comparison-v9 .ks-comparison-title {
          width: 100% !important;
          max-width: 100% !important;
          white-space: normal !important;
          font-size: 21px !important;
          line-height: 1.55 !important;
          text-align: center !important;
        }
        .ks-section1-comparison-v8 .ks-comparison-title-price,
        .ks-section1-comparison-v9 .ks-comparison-title-price {
          font-size: 29px !important;
          line-height: 1.35 !important;
          white-space: nowrap !important;
        }
        .ks-section1-comparison-v8 .ks-comparison-arrow,
        .ks-section1-comparison-v9 .ks-comparison-arrow {
          right: 13px !important;
          width: 42px !important;
          height: 42px !important;
          font-size: 20px !important;
        }
      }

      @media (max-width: 390px) {
        #${SECTION_ID} .section-title { font-size: 22px !important; }
        #${SECTION_ID} .promise h3 { font-size: 21px !important; }
        #${SECTION_ID} .promise p { font-size: 14.5px !important; }
        .ks-section1-comparison-v8 .ks-comparison-title,
        .ks-section1-comparison-v9 .ks-comparison-title { font-size: 19px !important; }
        .ks-section1-comparison-v8 .ks-comparison-title-price,
        .ks-section1-comparison-v9 .ks-comparison-title-price { font-size: 26px !important; }
      }
    `;
    document.head.appendChild(style);
  }

  function normalizeCopy() {
    const section = document.getElementById(SECTION_ID);
    if (!section) return;

    const title = section.querySelector('.section-title');
    if (title) {
      title.innerHTML = '<span class="section-title-prefix">一人ひとりに合わせるための、</span><span class="section-title-promise"><strong>3</strong>つの約束</span>';
    }

    const heads = section.querySelectorAll('.promise h3');
    const exact = [
      ['お子様に合わせた', 'オーダーメイド指導'],
      ['相談から授業まで', '同じプロが担当'],
      ['英検・受験・進路まで', '長期的に伴走']
    ];
    heads.forEach((el, i) => {
      if (exact[i]) {
        el.innerHTML = exact[i].map(line => `<span class="promise-title-line">${line}</span>`).join('');
      }
    });

    const card = document.querySelector('.ks-section1-comparison-v8, .ks-section1-comparison-v9');
    const comparisonTitle = card?.querySelector('.ks-comparison-title');
    if (comparisonTitle) {
      comparisonTitle.innerHTML = '<span class="ks-comparison-title-main">他の塾・予備校・家庭教師センターと</span><span class="ks-comparison-title-price">料金を比較する</span>';
    }
  }

  function apply() {
    injectStyle();
    normalizeCopy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply, { once: true });
  } else {
    apply();
  }
  window.addEventListener('load', apply, { once: true });
  [150, 500, 1200, 2400, 3800].forEach(ms => setTimeout(apply, ms));
  const root = document.getElementById('root') || document.body;
  if (root) new MutationObserver(() => requestAnimationFrame(apply)).observe(root, { childList: true, subtree: true });
})();