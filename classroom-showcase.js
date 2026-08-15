/*
 * Classroom showcase treatment
 * Keep the section heading above the lesson visual and place the lesson-screen label on the image itself.
 */
(function () {
  'use strict';

  var redundantCopy = [
    '英検過去問を画面共有で徹底解説',
    '英検2022年度 第2回 2級 長文読解の授業より'
  ];

  function findShowcaseHeading(section) {
    return Array.prototype.find.call(
      section.querySelectorAll('h3'),
      function (element) {
        return element.textContent.trim() === '実際の授業画面';
      }
    );
  }

  function removeRedundantCopy(container) {
    if (!container) return;
    Array.prototype.forEach.call(container.querySelectorAll('p'), function (paragraph) {
      if (redundantCopy.indexOf(paragraph.textContent.trim()) !== -1) paragraph.remove();
    });
  }

  function enhanceShowcase() {
    var section = document.getElementById('how-we-teach');
    if (!section) return;

    var image = section.querySelector('img[src*="IMG_4792"]');
    if (!image) return;

    image.src = '/IMG_4792_lesson-screen-no-label.png';
    image.alt = '実際の授業画面：英検2級長文読解のオンライン指導';
    image.loading = 'eager';
    image.fetchPriority = 'high';

    var media = image.parentElement;
    var layout = media && media.parentElement && media.parentElement.parentElement;
    if (!media || !layout) return;

    media.classList.add('ks-classroom-showcase-media');
    layout.classList.add('ks-classroom-showcase-layout');

    var label = media.querySelector('.ks-classroom-showcase-label');
    var heading = findShowcaseHeading(section);

    if (!label && heading) {
      var sourceColumn = heading.parentElement;
      removeRedundantCopy(sourceColumn);

      label = document.createElement('div');
      label.className = 'ks-classroom-showcase-label';
      heading.classList.add('ks-classroom-showcase-heading');
      label.appendChild(heading);
      media.appendChild(label);
    }

    section.dataset.ksClassroomShowcaseReady = 'true';
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
