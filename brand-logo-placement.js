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

    if (!logoFigure.querySelector('[data-ks-brand-credentials="true"]')) {
      const credentials = document.createElement('div');
      credentials.className = 'ks-brand-logo-showcase-credentials';
      credentials.dataset.ksBrandCredentials = 'true';
      credentials.innerHTML = `
        <div class="ks-brand-credential ks-brand-credential-recognition">
          <span class="ks-brand-credential-label">トッププロ認定</span>
          <span class="ks-brand-credential-detail">T社・Y社・R社</span>
        </div>
        <div class="ks-brand-credential ks-brand-credential-academic">
          <span class="ks-brand-credential-label">明治大学</span>
          <span class="ks-brand-credential-detail">政治経済学部 卒業</span>
        </div>
      `;
      logoFigure.append(credentials);
    }

    const profileName = [...profileGrid.querySelectorAll('h3')]
      .find((element) => /鈴木\s*雄太/.test(element.textContent || ''));
    const profileRole = [...profileGrid.querySelectorAll('p')]
      .find((element) => (element.textContent || '').replace(/\s+/g, ' ').trim() === 'プロ家庭教師 / 学習戦略プランナー');

    profileName?.classList.add('ks-brand-absorbed-profile-name');
    profileRole?.classList.add('ks-brand-absorbed-profile-role');
    profileName?.style.setProperty('display', 'none', 'important');
    profileRole?.style.setProperty('display', 'none', 'important');

    const recognitionBadge = [...profileGrid.querySelectorAll('div')].find((element) => {
      const directTexts = [...element.children].map((child) => child.textContent.trim());
      return directTexts.includes('トッププロ認定') && directTexts.includes('T社・Y社・R社');
    });
    recognitionBadge?.classList.add('ks-brand-absorbed-recognition');
    recognitionBadge?.style.setProperty('display', 'none', 'important');

    [...profileGrid.querySelectorAll('span')]
      .filter((element) => element.textContent.trim() === '明治大学 政治経済学部 卒業')
      .map((element) => element.parentElement)
      .filter(Boolean)
      .forEach((academicBadge) => {
        academicBadge.classList.add('ks-brand-absorbed-academic');
        academicBadge.style.setProperty('display', 'none', 'important');
      });

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
