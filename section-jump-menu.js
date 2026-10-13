(() => {
  document.querySelectorAll('.section-jump-menu').forEach(menu => {
    const summary = menu.querySelector('summary');
    menu.addEventListener('click', event => {
      const link = event.target.closest('a');
      if (!link) return;
      menu.open = false;
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        const heading = document.getElementById(href.slice(1))?.querySelector('h2');
        if (heading) { heading.setAttribute('tabindex', '-1'); heading.focus({preventScroll:true}); }
      }
    });
    document.addEventListener('click', event => {
      if (menu.open && !menu.contains(event.target)) menu.open = false;
    });
    menu.addEventListener('keydown', event => {
      if (event.key === 'Escape' && menu.open) { menu.open = false; summary.focus(); }
    });
    window.matchMedia('(max-width:1100px)').addEventListener('change', () => { menu.open = false; });
  });
})();
