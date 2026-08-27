(() => {
  'use strict';

  const SECTION = '.ks-mobile-section1-final';
  const CLASS = 'ks-section1-category-heading';
  const normalize = (value) => (value || '').replace(/\s+/g, '').replace(/、/g, '・').trim();

  function apply() {
    const section = document.querySelector(SECTION);
    if (!section) return;
    if (section.querySelector(`.${CLASS}`)) return;

    const target = Array.from(section.querySelectorAll('h1,h2,h3,p,div,span'))
      .find((el) => {
        const text = normalize(el.textContent);
        return text === '英検・受験・不登校・通信制高校';
      });

    if (!target) return;

    target.classList.add(CLASS);
    target.setAttribute('aria-label', '英検・受験／不登校・通信制高校');
    target.innerHTML = `
      <span class="ks-section1-category-item">英検・受験</span>
      <span class="ks-section1-category-item">不登校・通信制高校</span>
    `;
  }

  function init() {
    apply();
    const root = document.getElementById('root');
    if (root) {
      const observer = new MutationObserver(apply);
      observer.observe(root, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
