(() => {
  'use strict';

  function addBrandLogo() {
    const teacher = document.querySelector('#teacher');
    if (!teacher) return false;

    const container = teacher.querySelector(':scope > .container');
    const introduction = container?.querySelector(':scope > .text-center');
    const profileGrid = container?.querySelector(':scope > .grid');
    if (!container || !introduction || !profileGrid) return false;

    let logoFigure = container.querySelector('[data-ks-brand-logo="true"]');
    if (!logoFigure) {
      logoFigure = document.createElement('figure');
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
    }

    if (!logoFigure.querySelector('[data-ks-brand-role="true"]')) {
      const role = document.createElement('p');
      role.className = 'ks-brand-logo-showcase-role';
      role.dataset.ksBrandRole = 'true';
      role.textContent = '学習戦略プランナー／合格戦略アドバイザー';
      logoFigure.append(role);
    }

    const profileName = [...profileGrid.querySelectorAll('h3')]
      .find((element) => /鈴木\s*雄太/.test(element.textContent || ''));
    const profileRole = [...profileGrid.querySelectorAll('p')]
      .find((element) => (element.textContent || '').replace(/\s+/g, ' ').trim() === 'プロ家庭教師 / 学習戦略プランナー');

    profileName?.classList.add('ks-brand-absorbed-profile-name');
    profileRole?.classList.add('ks-brand-absorbed-profile-role');
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
