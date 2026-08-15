/*
 * Classroom support cards
 * Turn the six teaching-support items into clearly separated, centered feature cards.
 */
(function () {
  'use strict';

  var titles = [
    '授業の流れ〜過去問を使った実践的な解説〜',
    '宿題・復習システム〜授業後の学習を効率化〜',
    '進捗報告・保護者共有〜学習状況を見える化〜',
    '心理的配慮と個別対応〜不登校・発達障害の方も安心〜',
    '生徒さんに最適な教材を厳選〜参考書選定の工夫〜',
    'ライフスタイルに合わせた受講〜全国どこからでも〜'
  ];

  function isTargetHeading(heading) {
    return titles.indexOf(heading.textContent.trim()) !== -1;
  }

  function findCard(heading) {
    var node = heading.parentElement;
    while (node && node.parentElement) {
      if (node.classList && node.classList.contains('flex') && node.classList.contains('gap-4')) return node;
      node = node.parentElement;
    }
    return null;
  }

  function createSupportTransition(grid) {
    if (!grid || grid.previousElementSibling?.classList?.contains('ks-classroom-support-transition')) return;

    var transition = document.createElement('div');
    transition.className = 'ks-classroom-support-transition';
    transition.innerHTML = [
      '<p class="ks-classroom-support-transition-eyebrow">LEARNING SUPPORT SYSTEM</p>',
      '<h3 class="ks-classroom-support-transition-title">授業を成果へつなげる<br>6つのサポート</h3>',
      '<p class="ks-classroom-support-transition-copy">授業後の定着、進捗の共有、心のケアまで。お子様の学びを継続的に支える仕組みです。</p>'
    ].join('');

    grid.parentNode.insertBefore(transition, grid);
  }

  function enhanceCards() {
    var headings = Array.prototype.filter.call(
      document.querySelectorAll('h1, h2, h3, h4, h5, h6'),
      isTargetHeading
    );

    if (headings.length !== titles.length) return;

    var firstCard = findCard(headings[0]);
    var supportGrid = firstCard && firstCard.parentElement;
    if (supportGrid) {
      supportGrid.classList.add('ks-classroom-support-grid');
      createSupportTransition(supportGrid);
    }

    headings.forEach(function (heading) {
      var card = findCard(heading);
      if (!card || card.dataset.ksClassroomSupportCard === 'true') return;

      var grid = card.parentElement;
      var iconWrap = card.firstElementChild;
      var content = heading.parentElement;
      var copy = content && content.querySelector('p');

      card.classList.add('ks-classroom-support-card');
      if (iconWrap) iconWrap.classList.add('ks-classroom-support-icon-wrap');
      if (content) content.classList.add('ks-classroom-support-content');
      heading.classList.add('ks-classroom-support-heading');
      if (copy) copy.classList.add('ks-classroom-support-copy');

      card.dataset.ksClassroomSupportCard = 'true';
    });
  }

  function start() {
    enhanceCards();
    [80, 260, 700, 1400].forEach(function (delay) {
      window.setTimeout(enhanceCards, delay);
    });
    window.addEventListener('load', enhanceCards, { once: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
}());
