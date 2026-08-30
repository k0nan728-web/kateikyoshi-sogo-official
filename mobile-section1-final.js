(() => {
  'use strict';

  const HEADER_CLASS = 'ks-mobile-header-clean';
  const norm = (s) => (s || '').replace(/\s+/g, '').trim();

  const setImp = (el, prop, value) => {
    if (el) el.style.setProperty(prop, value, 'important');
  };

  function findContractRoute() {
    const candidates = Array.from(document.querySelectorAll('a[href], aside, div'))
      .filter((el) => {
        const t = norm(el.textContent);
        return t.includes('料金・担当体制を比較して選ぶ') ||
          (t.includes('CONTRACTCOMPARISON') && t.includes('料金'));
      })
      .sort((a, b) => a.querySelectorAll('*').length - b.querySelectorAll('*').length);

    if (!candidates.length) return null;
    const hit = candidates[0];
    return hit.tagName === 'A' ? hit : (hit.closest('a[href]') || hit.querySelector('a[href]') || hit);
  }

  function rebuildContractRoute() {
    const route = findContractRoute();
    if (!route) return;

    if (!route.dataset.ksCleanContractRoute) {
      route.dataset.ksCleanContractRoute = '1';
      route.innerHTML = [
        '<span class="ks-clean-contract-label">CONTRACT COMPARISON</span>',
        '<span class="ks-clean-contract-title">料金・担当体制を比較して選ぶ</span>',
        '<span class="ks-clean-contract-arrow" aria-hidden="true">→</span>'
      ].join('');
    }

    setImp(route, 'position', 'relative');
    setImp(route, 'box-sizing', 'border-box');
    setImp(route, 'width', '100%');
    setImp(route, 'max-width', '100%');
    setImp(route, 'min-width', '0');
    setImp(route, 'overflow', 'hidden');
    setImp(route, 'text-decoration', 'none');
    setImp(route, 'background', 'linear-gradient(90deg,#fffaf0 0%,#fff4d8 100%)');
    setImp(route, 'border', '1px solid #e6b84b');
    setImp(route, 'border-left', '6px solid #e2a91f');
    setImp(route, 'border-radius', '16px');
    setImp(route, 'box-shadow', 'none');

    /* Kill every legacy decorative layer that caused the navy paint-over. */
    route.classList.add('ks-contract-route-clean-v5');

    const label = route.querySelector('.ks-clean-contract-label');
    const title = route.querySelector('.ks-clean-contract-title');
    const arrow = route.querySelector('.ks-clean-contract-arrow');
    [label, title, arrow].forEach((el) => {
      setImp(el, 'min-width', '0');
      setImp(el, 'max-width', '100%');
      setImp(el, 'background', 'transparent');
      setImp(el, 'box-shadow', 'none');
      setImp(el, 'transform', 'none');
      setImp(el, 'position', 'static');
    });

    setImp(label, 'color', '#9b6500');
    setImp(label, 'font-family', 'Noto Sans JP, sans-serif');
    setImp(label, 'font-weight', '800');
    setImp(label, 'letter-spacing', '.14em');
    setImp(label, 'line-height', '1.4');
    setImp(label, 'text-align', 'center');

    setImp(title, 'color', '#0b3d78');
    setImp(title, 'font-family', 'Noto Serif JP, serif');
    setImp(title, 'font-weight', '900');
    setImp(title, 'line-height', '1.35');
    setImp(title, 'text-align', 'center');
    setImp(title, 'white-space', 'normal');
    setImp(title, 'word-break', 'normal');
    setImp(title, 'overflow-wrap', 'normal');

    setImp(arrow, 'color', '#0b3d78');
    setImp(arrow, 'font-weight', '900');
    setImp(arrow, 'line-height', '1');
    setImp(arrow, 'text-align', 'center');

    const w = window.innerWidth || document.documentElement.clientWidth;
    if (w >= 601) {
      setImp(route, 'display', 'grid');
      setImp(route, 'grid-template-columns', 'minmax(190px,.34fr) minmax(0,1fr) 44px');
      setImp(route, 'align-items', 'center');
      setImp(route, 'gap', '14px');
      setImp(route, 'padding', '18px 22px');
      setImp(label, 'font-size', 'clamp(13px,1.55vw,17px)');
      setImp(title, 'font-size', 'clamp(24px,3.5vw,36px)');
      setImp(arrow, 'font-size', '24px');
      setImp(label, 'white-space', 'nowrap');
    } else {
      setImp(route, 'display', 'grid');
      setImp(route, 'grid-template-columns', 'minmax(0,1fr)');
      setImp(route, 'gap', '7px');
      setImp(route, 'padding', '14px 14px');
      setImp(label, 'font-size', '12px');
      setImp(title, 'font-size', 'clamp(20px,6vw,26px)');
      setImp(arrow, 'font-size', '20px');
      setImp(label, 'white-space', 'normal');
    }
  }

  function fixDirectContractHeading() {
    const section = document.getElementById('ks-direct-contract-proof-v7');
    if (!section) return;
    const heading = section.querySelector('h2');
    if (!heading) return;

    const original = norm(heading.textContent);
    if (!original.includes('講師を紹介してもらうのではなく') || !original.includes('直接契約')) return;

    const w = window.innerWidth || document.documentElement.clientWidth;
    setImp(heading, 'width', '100%');
    setImp(heading, 'margin-left', 'auto');
    setImp(heading, 'margin-right', 'auto');
    setImp(heading, 'text-align', 'center');
    setImp(heading, 'letter-spacing', '0');
    setImp(heading, 'word-break', 'normal');
    setImp(heading, 'overflow-wrap', 'normal');
    setImp(heading, 'line-break', 'strict');

    if (w >= 601 && w <= 1100) {
      heading.innerHTML = '<span class="ks-contract-head-line">講師を紹介してもらうのではなく、</span><span class="ks-contract-head-line">講師本人と<span class="ks-accent">直接契約</span>する家庭教師です。</span>';
      setImp(heading, 'max-width', '980px');
      setImp(heading, 'font-size', 'clamp(30px,3.7vw,40px)');
      setImp(heading, 'line-height', '1.48');
      heading.querySelectorAll('.ks-contract-head-line').forEach((line) => {
        setImp(line, 'display', 'block');
        setImp(line, 'width', '100%');
        setImp(line, 'white-space', 'nowrap');
      });
    } else {
      heading.innerHTML = '講師を紹介してもらうのではなく、<br>講師本人と<span class="ks-accent">直接契約</span>する家庭教師です。';
      setImp(heading, 'max-width', '100%');
      setImp(heading, 'white-space', 'normal');
    }

    const lead = section.querySelector('.ks-proof-lead');
    if (lead) {
      setImp(lead, 'width', '100%');
      setImp(lead, 'max-width', w >= 601 ? '900px' : '100%');
      setImp(lead, 'margin-left', 'auto');
      setImp(lead, 'margin-right', 'auto');
      setImp(lead, 'text-align', 'center');
      setImp(lead, 'white-space', 'normal');
    }
  }

  function cleanHeader() {
    const nav = document.querySelector('nav.fixed.top-0, nav.fixed');
    if (!nav) return;
    nav.classList.add(HEADER_CLASS);
  }

  function injectPseudoKillStyle() {
    let style = document.getElementById('ks-contract-route-pseudo-kill-v5');
    if (style) return;
    style = document.createElement('style');
    style.id = 'ks-contract-route-pseudo-kill-v5';
    style.textContent = `
      .ks-contract-route-clean-v5::before,
      .ks-contract-route-clean-v5::after,
      .ks-contract-route-clean-v5 > *::before,
      .ks-contract-route-clean-v5 > *::after {
        content:none !important;
        display:none !important;
        background:none !important;
        box-shadow:none !important;
      }
      @media (min-width:601px) and (max-width:1100px) {
        #ks-direct-contract-proof-v7 .ks-proof-heading { max-width:1000px !important; }
      }
    `;
    document.head.appendChild(style);
  }

  function run() {
    injectPseudoKillStyle();
    rebuildContractRoute();
    fixDirectContractHeading();
    cleanHeader();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }

  /* Run after all known legacy mutations. */
  [250, 700, 1400, 2800, 3600, 4500].forEach((delay) => setTimeout(run, delay));
  window.addEventListener('resize', () => setTimeout(run, 80), { passive: true });
})();
