(() => {
  const button = document.querySelector('.menu-button');
  const nav = document.querySelector('.global-nav');
  if (!button || !nav) return;
  const close = () => { button.setAttribute('aria-expanded', 'false'); button.setAttribute('aria-label', 'メニューを開く'); nav.classList.remove('is-open'); };
  button.addEventListener('click', () => { const open = button.getAttribute('aria-expanded') !== 'true'; button.setAttribute('aria-expanded', String(open)); button.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く'); nav.classList.toggle('is-open', open); });
  nav.addEventListener('click', close);
  window.addEventListener('resize', () => { if (window.innerWidth > 760) close(); }, { passive: true });
})();
