(() => {
  'use strict';

  const CATEGORY_CLASS = 'ks-section1-category-heading';

  const normalize = (value) => (value || '').replace(/\s+/g, '').replace(/、/g, '・').trim();

  function repairCategory() {
    const root = document.getElementById('root') || document;
    const existing = root.querySelector(`.${CATEGORY_CLASS}`);
    if (existing) return;

    const candidates = Array.from(root.querySelectorAll('h1,h2,h3,h4,h5,p,div,span,strong'));
    const target = candidates.find((el) => normalize(el.textContent) === '英検・受験・不登校・通信制高校');
    if (!target) return;

    target.classList.add(CATEGORY_CLASS);
    target.setAttribute('aria-label', '英検・受験／不登校・通信制高校');
    target.innerHTML = '<span class="ks-section1-category-item">英検・受験</span><span class="ks-section1-category-item">不登校・通信制高校</span>';
  }

  function init() {
    repairCategory();
    const root = document.getElementById('root');
    if (root) {
      const observer = new MutationObserver(() => repairCategory());
      observer.observe(root, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
