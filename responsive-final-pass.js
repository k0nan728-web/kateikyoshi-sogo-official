/* FINAL RESPONSIVE PASS — DOM guard + semantic line breaks */
(() => {
  'use strict';
  const STYLE_ID = 'responsive-final-pass-runtime';

  const normalize = s => (s || '').replace(/\s+/g, '').trim();
  const all = sel => Array.from(document.querySelectorAll(sel));

  function addRuntimeGuard() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      html,body,#root,main{max-width:100%!important;min-width:0!important;overflow-x:hidden!important}
      #root *{box-sizing:border-box}
      img,video,svg,canvas{max-width:100%}
      h1,h2,h3,h4,h5,h6,p,a,button,span,strong,small{max-width:100%;min-width:0;line-break:strict;word-break:normal;overflow-wrap:normal;hyphens:none}
      h1,h2,h3,h4,h5,h6{ text-wrap:balance }
    `;
    document.head.appendChild(style);
  }

  function replaceTextWithResponsiveBreaks(el, parts) {
    if (!el || el.dataset.responsiveFinalText === '1') return;
    const text = normalize(el.textContent);
    if (!parts.every(p => text.includes(p))) return;
    const original = el.textContent.trim();
    const frag = document.createDocumentFragment();
    parts.forEach((part, i) => {
      const span = document.createElement('span');
      span.className = 'ks-semantic-line';
      span.textContent = part;
      frag.appendChild(span);
      if (i < parts.length - 1) {
        const br = document.createElement('br');
        br.className = 'ks-semantic-break';
        frag.appendChild(br);
      }
    });
    el.replaceChildren(frag);
    el.dataset.responsiveFinalText = '1';
    el.dataset.responsiveFinalOriginal = original;
  }

  function tuneKnownHeadlines() {
    const nodes = all('h1,h2,h3,h4,p,a,div,strong');
    for (const el of nodes) {
      const t = normalize(el.textContent);
      if (el.children.length > 0 && !el.matches('h1,h2,h3,h4,h5,h6')) continue;

      if (t.includes('講師を紹介してもらうのではなく') && t.includes('講師本人と') && t.includes('直接契約')) {
        replaceTextWithResponsiveBreaks(el, ['講師を紹介してもらうのではなく、', '講師本人と直接契約する家庭教師です。']);
        el.classList.add('ks-direct-contract-headline');
      }
      if (t.includes('まずは無料相談で') && t.includes('お子さまに合った')) {
        replaceTextWithResponsiveBreaks(el, ['まずは無料相談で、', 'お子さまに合った学習プランを一緒に考えます。']);
        el.classList.add('ks-consult-headline');
      }
      if (t.includes('料金・担当体制を比較して選ぶ')) {
        el.classList.add('ks-comparison-headline');
      }
    }
  }

  function tuneOverflowingCards() {
    all('.ks-section1-route,.ks-route-card,.p100-choice,#ks-direct-contract-proof-v7 .ks-proof-item,.p100-contract__grid>div').forEach(card => {
      card.style.minWidth = '0';
      card.style.maxWidth = '100%';
      card.style.overflow = 'hidden';
      all('h2,h3,h4,p,a,strong,span', card).forEach(el => {
        el.style.maxWidth = '100%';
        el.style.minWidth = '0';
        el.style.wordBreak = 'normal';
        el.style.overflowWrap = 'normal';
        el.style.lineBreak = 'strict';
        el.style.hyphens = 'none';
      });
    });
  }

  function markOverflowingElements() {
    // Do not change visible content here; only add a diagnostic class if an element truly overflows.
    all('#root *').forEach(el => {
      if (el.children.length === 0 && el.scrollWidth > el.clientWidth + 2) el.classList.add('ks-real-overflow');
    });
  }

  function run() {
    addRuntimeGuard();
    tuneKnownHeadlines();
    tuneOverflowingCards();
    markOverflowingElements();
  }

  function boot() {
    run();
    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(() => {
        tuneKnownHeadlines();
        tuneOverflowingCards();
      });
    });
    observer.observe(document.getElementById('root') || document.body, { childList:true, subtree:true });
    window.addEventListener('resize', run, { passive:true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once:true });
  else boot();
})();
