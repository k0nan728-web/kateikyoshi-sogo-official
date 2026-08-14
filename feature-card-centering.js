(() => {
  function apply() {
    const heading = [...document.querySelectorAll('h2')].find((element) => element.textContent.trim() === '指導の特徴');
    const section = heading?.closest('section');
    if (!section) return false;

    const icons = [...section.querySelectorAll('div[style*="width: 48px"][style*="height: 48px"]')];
    icons.forEach((icon) => {
      const card = icon.parentElement;
      if (!card || !card.querySelector('h3') || !card.querySelector('p')) return;
      card.classList.add('ks-feature-card-centered');
      icon.classList.add('ks-feature-card-icon-centered');
    });

    return icons.length > 0;
  }

  function start() {
    if (apply()) return;
    const observer = new MutationObserver(() => {
      if (apply()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
