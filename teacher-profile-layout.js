(() => {
  'use strict';

  function organizeTeacherProfile() {
    const teacher = document.querySelector('#teacher');
    if (!teacher || teacher.dataset.ksTeacherTrustLayout === 'true') return false;

    const container = teacher.querySelector(':scope > .container');
    const profileGrid = container?.querySelector(':scope > .grid');
    const brandLogo = container?.querySelector('[data-ks-brand-logo="true"]');
    if (!container || !profileGrid || !brandLogo || profileGrid.children.length < 2) return false;

    const portraitColumn = profileGrid.children[0];
    const biography = profileGrid.children[1];
    const portraitFrame = portraitColumn.querySelector('.relative');
    const statGrid = [...biography.children]
      .find((element) => element.classList.contains('grid') && element.children.length === 4 && /20年超/.test(element.textContent));

    if (!portraitFrame || !statGrid) return false;

    const trustOverview = document.createElement('section');
    trustOverview.className = 'ks-teacher-trust-overview fade-in-up';
    trustOverview.setAttribute('aria-label', '講師の写真と主な実績');

    const centeredPortrait = document.createElement('div');
    centeredPortrait.className = 'ks-teacher-centered-portrait';
    centeredPortrait.append(portraitFrame);

    statGrid.classList.add('ks-teacher-primary-stats');
    trustOverview.append(centeredPortrait, statGrid);

    const experienceHighlight = [...biography.querySelectorAll('p')]
      .find((element) => (element.textContent || '').replace(/\s+/g, ' ').trim() === '▶ 各分野での専門経験が、「総合的な判断力」を生み出します');
    if (experienceHighlight && experienceHighlight.dataset.ksExperienceLinebreak !== 'true') {
      experienceHighlight.classList.add('ks-experience-highlight');
      experienceHighlight.dataset.ksExperienceLinebreak = 'true';
      experienceHighlight.innerHTML = '<span class="ks-experience-highlight-prefix">▶ 各分野での専門経験が、</span><span class="ks-experience-highlight-suffix">「総合的な判断力」を生み出します</span>';
    }

    biography.classList.add('ks-teacher-biography');
    brandLogo.insertAdjacentElement('afterend', trustOverview);
    profileGrid.replaceWith(biography);

    teacher.dataset.ksTeacherTrustLayout = 'true';
    return true;
  }

  function initialize() {
    if (organizeTeacherProfile()) return;
    window.setTimeout(organizeTeacherProfile, 300);
    window.setTimeout(organizeTeacherProfile, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
