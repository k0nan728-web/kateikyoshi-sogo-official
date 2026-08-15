/*
 * Classroom showcase treatment
 * Promote the lesson-screen heading and remove copy already included in the image.
 */
(function () {
  'use strict';

  var redundantCopy = [
    '英検過去問を画面共有で徹底解説',
    '英検2022年度 第2回 2級 長文読解の授業より'
  ];

  function findHeading() {
    return Array.prototype.find.call(
      document.querySelectorAll('h1, h2, h3, h4, h5, h6'),
      function (element) {
        return element.textContent.trim() === '実際の授業画面';
      }
    );
  }

  function enhanceShowcase() {
    var heading = findHeading();
    if (!heading) return;

    var copyColumn = heading.parentElement;
    var row = copyColumn && copyColumn.parentElement;
    if (!copyColumn || !row || row.dataset.ksClassroomShowcase === 'true') return;

    Array.prototype.forEach.call(copyColumn.querySelectorAll('p'), function (paragraph) {
      if (redundantCopy.indexOf(paragraph.textContent.trim()) !== -1) paragraph.remove();
    });

    var header = document.createElement('div');
    header.className = 'ks-classroom-showcase-header';
    heading.classList.add('ks-classroom-showcase-heading');
    row.parentNode.insertBefore(header, row);
    header.appendChild(heading);

    row.classList.add('ks-classroom-showcase-row');

    var image = row.querySelector('img[src*="IMG_4792"]');
    if (image) {
      image.src = '/IMG_4792_lesson-screen-no-label.png';
      image.alt = '実際の授業画面：英検2級長文読解のオンライン指導';
    }

    row.dataset.ksClassroomShowcase = 'true';
  }

  function start() {
    enhanceShowcase();
    [80, 260, 700, 1400].forEach(function (delay) {
      window.setTimeout(enhanceShowcase, delay);
    });
    window.addEventListener('load', enhanceShowcase, { once: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
}());
