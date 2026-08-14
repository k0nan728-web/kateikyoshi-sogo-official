(() => {
  'use strict';

  function addBrandLogo() {
    const teacher = document.querySelector('#teacher');
    if (!teacher || teacher.querySelector('[data-ks-brand-logo="true"]')) return false;

    const container = teacher.querySelector(':scope > .container');
    const introduction = container?.querySelector(':scope > .text-center');
    const profileGrid = container?.querySelector(':scope > .grid');
    if (!container || !introduction || !profileGrid) return false;

    const logoFigure = document.createElement('figure');
    logoFigure.className = 'ks-brand-logo-showcase';
    logoFigure.dataset.ksBrandLogo = 'true';
    logoFigure.setAttribute('aria-label', 'プロ家庭教師 鈴木雄太 公式ロゴ');

    const label = document.createElement('p');
    label.className = 'ks-brand-logo-showcase-label';
    label.textContent = 'OFFICIAL BRAND IDENTITY';

    const image = document.createElement('img');
    image.className = 'ks-brand-logo-showcase-image';
    image.src = '/yuta-suzuki-brand-logo.png';
    image.alt = 'プロ家庭教師 鈴木雄太 Yuta Suzuki 公式ロゴ';
    image.width = 2172;
    image.height = 724;
    image.decoding = 'async';

    logoFigure.append(label, image);
    introduction.insertAdjacentElement('afterend', logoFigure);
    return true;
  }

  function initialize() {
    if (addBrandLogo()) return;
    window.setTimeout(addBrandLogo, 250);
    window.setTimeout(addBrandLogo, 900);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
