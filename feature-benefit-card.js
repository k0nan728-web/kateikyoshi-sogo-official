(() => {
  'use strict';

  const CARD_MARKER = 'data-ks-added-feature-card';

  function addBenefitCard() {
    const section = [...document.querySelectorAll('section')].find((candidate) =>
      [...candidate.querySelectorAll('h2')].some(
        (heading) => heading.textContent.trim() === '指導の特徴'
      )
    );

    if (!section || section.querySelector(`[${CARD_MARKER}]`)) return false;

    const grid = section.querySelector('div[style*="grid-template-columns"]');
    if (!grid || grid.children.length < 1) return false;

    const referenceCard = grid.lastElementChild;
    const card = referenceCard.cloneNode(true);
    card.setAttribute(CARD_MARKER, 'true');

    const icon = card.firstElementChild;
    const title = card.querySelector('h3');
    const body = card.querySelector('p');

    if (!icon || !title || !body) return false;

    icon.textContent = '🧭';
    icon.style.background = 'rgba(14, 116, 144, 0.10)';
    title.textContent = '進路まで見据えた学習設計';
    body.textContent = '英検・受験・学校生活を別々に考えず、今の学びをその先の進路につながる順番へ整えます。目標が変わっても、一人の講師が長期的に伴走します。';

    grid.appendChild(card);
    return true;
  }

  function initialize() {
    if (addBenefitCard()) return;
    window.setTimeout(addBenefitCard, 250);
    window.setTimeout(addBenefitCard, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
