(() => {
  const selector = '.ks-hero-secondary';
  let resizeTimer = null;
  let headingObserver = null;

  function target() {
    return document.querySelector(selector);
  }

  function mainHeading() {
    return document.querySelector('.ks-photo-hero h1');
  }

  function ensureStructure(element) {
    if (element.dataset.ksHeroSubheadlineFit === 'true') return;

    element.innerHTML = `
      <span class="ks-hero-subheadline-line">英検・受験・不登校まで、</span>
      <span class="ks-hero-subheadline-line">1人のプロが一貫して伴走します。</span>
    `;
    element.dataset.ksHeroSubheadlineFit = 'true';
  }

  function fit(element) {
    const heading = mainHeading();
    const renderedMainFontSize = heading
      ? Number.parseFloat(window.getComputedStyle(heading).fontSize) || 20
      : 20;
    const mainFitRatio = heading && heading.scrollWidth > heading.clientWidth
      ? heading.clientWidth / heading.scrollWidth
      : 1;
    const mainFontSize = renderedMainFontSize * mainFitRatio;
    const maximum = Math.max(12, mainFontSize * 0.9);
    const availableWidth = Math.max(1, element.clientWidth - 2);
    const lines = [...element.querySelectorAll('.ks-hero-subheadline-line')];

    let low = 12;
    let high = maximum;
    let best = low;

    for (let index = 0; index < 15; index += 1) {
      const middle = (low + high) / 2;
      lines.forEach((line) => { line.style.fontSize = `${middle}px`; });
      const fits = lines.every((line) => line.getBoundingClientRect().width <= availableWidth);
      if (fits) {
        best = middle;
        low = middle;
      } else {
        high = middle;
      }
    }

    lines.forEach((line) => { line.style.fontSize = `${Math.floor(best * 10) / 10}px`; });
  }

  function apply() {
    const element = target();
    if (!element) return false;
    ensureStructure(element);
    fit(element);
    return true;
  }

  function scheduleApply() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(apply, 80);
  }

  function watchHeading() {
    const heading = mainHeading();
    if (!heading || headingObserver) return;
    headingObserver = new MutationObserver(scheduleApply);
    headingObserver.observe(heading, { attributes: true, attributeFilter: ['style', 'class'] });
  }

  function start() {
    if (!apply()) {
      const observer = new MutationObserver(() => {
        if (apply()) {
          observer.disconnect();
          watchHeading();
        }
      });
      observer.observe(document.documentElement, { childList: true, subtree: true });
      return;
    }

    watchHeading();
    [250, 700, 1400, 2600, 4200].forEach((delay) => window.setTimeout(apply, delay));
  }

  window.addEventListener('resize', scheduleApply, { passive: true });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
