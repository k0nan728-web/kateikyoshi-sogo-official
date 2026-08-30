(() => {
  'use strict';

  const ROUTE_CLASS = 'ks-section01-stable-route';
  const STYLE_ID = 'ks-section01-stable-style-v1';
  const norm = (s) => (s || '').replace(/\s+/g, '').trim();
  let scheduled = false;

  function injectStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .${ROUTE_CLASS},
      .${ROUTE_CLASS} *{box-sizing:border-box!important;min-width:0!important}
      .${ROUTE_CLASS}{
        display:grid!important;
        grid-template-columns:minmax(190px,230px) minmax(0,1fr) 36px!important;
        width:100%!important;max-width:100%!important;
        align-items:center!important;gap:16px!important;
        padding:18px 22px!important;
        margin:0!important;
        overflow:hidden!important;
        border:1px solid #e6b84b!important;
        border-left:6px solid #e2a91f!important;
        border-radius:16px!important;
        background:linear-gradient(90deg,#fffaf0,#fff4d8)!important;
        box-shadow:none!important;text-decoration:none!important;
        position:relative!important;isolation:isolate!important;
      }
      .${ROUTE_CLASS}::before,.${ROUTE_CLASS}::after,
      .${ROUTE_CLASS}>*::before,.${ROUTE_CLASS}>*::after{
        content:none!important;display:none!important;background:none!important;box-shadow:none!important
      }
      .${ROUTE_CLASS}__label{display:block!important;color:#9b6500!important;font:800 15px/1.4 "Noto Sans JP",sans-serif!important;letter-spacing:.12em!important;text-align:center!important;white-space:nowrap!important;background:none!important}
      .${ROUTE_CLASS}__title{display:block!important;color:#0b3d78!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(24px,3vw,32px)!important;font-weight:900!important;line-height:1.35!important;text-align:center!important;white-space:normal!important;word-break:normal!important;overflow-wrap:normal!important;background:none!important}
      .${ROUTE_CLASS}__arrow{display:block!important;color:#0b3d78!important;font-size:24px!important;font-weight:900!important;line-height:1!important;text-align:center!important;background:none!important}
      @media(max-width:600px){
        .${ROUTE_CLASS}{grid-template-columns:minmax(0,1fr)!important;gap:6px!important;padding:14px!important}
        .${ROUTE_CLASS}__label{font-size:12px!important;white-space:normal!important}
        .${ROUTE_CLASS}__title{font-size:clamp(19px,5.6vw,24px)!important}
        .${ROUTE_CLASS}__arrow{font-size:19px!important}
      }
      @media(min-width:601px) and (max-width:1100px){
        #ks-direct-contract-proof-v7 .ks-proof-heading{width:100%!important;max-width:1040px!important}
        #ks-direct-contract-proof-v7 h2{width:100%!important;max-width:1040px!important;margin-left:auto!important;margin-right:auto!important;font-size:clamp(28px,3.3vw,36px)!important;line-height:1.48!important;letter-spacing:0!important;text-align:center!important}
        #ks-direct-contract-proof-v7 h2 .ks-contract-head-line{display:block!important;width:100%!important;white-space:nowrap!important}
      }
    `;
    document.head.appendChild(style);
  }

  function findLegacyRoute() {
    const all = Array.from(document.querySelectorAll('a[href],aside,div'));
    return all
      .filter(el => !el.classList.contains(ROUTE_CLASS))
      .filter(el => {
        const t = norm(el.textContent);
        return t.includes('料金・担当体制を比較して選ぶ') ||
          (t.includes('CONTRACTCOMPARISON') && t.includes('料金'));
      })
      .sort((a,b)=>a.querySelectorAll('*').length-b.querySelectorAll('*').length)[0] || null;
  }

  function stabilizeRoute() {
    if (document.querySelector(`.${ROUTE_CLASS}`)) return;
    const hit = findLegacyRoute();
    if (!hit) return;

    const anchor = hit.tagName === 'A'
      ? hit
      : (hit.closest('a[href]') || hit.querySelector('a[href]'));
    const old = anchor || hit;
    const fresh = document.createElement(anchor ? 'a' : 'div');
    fresh.className = ROUTE_CLASS;

    if (anchor) {
      fresh.href = anchor.getAttribute('href') || '/hikaku/';
      const target = anchor.getAttribute('target');
      const rel = anchor.getAttribute('rel');
      if (target) fresh.target = target;
      if (rel) fresh.rel = rel;
      fresh.setAttribute('aria-label','料金・担当体制の比較を見る');
    }

    fresh.innerHTML =
      `<span class="${ROUTE_CLASS}__label">CONTRACT COMPARISON</span>` +
      `<span class="${ROUTE_CLASS}__title">料金・担当体制を比較して選ぶ</span>` +
      `<span class="${ROUTE_CLASS}__arrow" aria-hidden="true">→</span>`;

    old.replaceWith(fresh);
  }

  function stabilizeDirectHeading() {
    const section = document.getElementById('ks-direct-contract-proof-v7');
    const heading = section?.querySelector('h2');
    if (!heading) return;

    const t = norm(heading.textContent);
    if (!t.includes('講師を紹介してもらうのではなく') || !t.includes('直接契約')) return;

    const w = innerWidth || document.documentElement.clientWidth;
    if (w >= 601 && w <= 1100) {
      const lines = heading.querySelectorAll('.ks-contract-head-line');
      if (lines.length !== 2) {
        heading.innerHTML =
          '<span class="ks-contract-head-line">講師を紹介してもらうのではなく、</span>' +
          '<span class="ks-contract-head-line">講師本人と<span class="ks-accent">直接契約</span>する家庭教師です。</span>';
      }
    } else if (heading.querySelector('.ks-contract-head-line')) {
      heading.innerHTML =
        '講師を紹介してもらうのではなく、<br>' +
        '講師本人と<span class="ks-accent">直接契約</span>する家庭教師です。';
    }
  }

  function run() {
    scheduled = false;
    injectStyle();
    stabilizeRoute();
    stabilizeDirectHeading();
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(run);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, {once:true});
  } else {
    run();
  }

  window.addEventListener('load', run, {once:true});
  window.addEventListener('resize', schedule, {passive:true});
  document.fonts?.ready?.then(run);

  const root = document.getElementById('root') || document.body;
  if (root) {
    new MutationObserver(schedule).observe(root,{childList:true,subtree:true});
  }
})();
