(() => {
  const selector = '#star-case h2';
  let resizeTimer = null;

  function headline() {
    return document.querySelector(selector);
  }

  function ensureStructure(target) {
    if (target.dataset.ksHeadlineFit === 'true') return;

    target.innerHTML = `
      <span class="ks-starcase-headline-line">
        <span class="ks-starcase-headline-plain">わずか1年10ヶ月で</span><span class="ks-starcase-headline-gold">準1級合格</span>
      </span>
      <span class="ks-starcase-headline-line">
        <span class="ks-starcase-headline-plain">その後、</span><span class="ks-starcase-headline-gold">早稲田大学に現役合格</span>
      </span>
    `;
    target.dataset.ksHeadlineFit = 'true';
  }

  function fitMobileLines(target) {
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const lines = [...target.querySelectorAll('.ks-starcase-headline-line')];

    target.classList.toggle('ks-starcase-headline-fit', isMobile);
    if (!isMobile) {
      lines.forEach((line) => { line.style.fontSize = ''; });
      return;
    }

    const availableWidth = Math.max(1, target.clientWidth - 2);
    lines.forEach((line) => {
      let low = 14;
      let high = 38;
      let best = low;

      for (let index = 0; index < 14; index += 1) {
        const middle = (low + high) / 2;
        line.style.fontSize = `${middle}px`;
        if (line.getBoundingClientRect().width <= availableWidth) {
          best = middle;
          low = middle;
        } else {
          high = middle;
        }
      }

      line.style.fontSize = `${Math.floor(best * 10) / 10}px`;
    });
  }

  function apply() {
    const target = headline();
    if (!target) return false;
    ensureStructure(target);
    fitMobileLines(target);
    return true;
  }

  function start() {
    if (apply()) return;
    const observer = new MutationObserver(() => {
      if (apply()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  window.addEventListener('resize', () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(apply, 80);
  }, { passive: true });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
