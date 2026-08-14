/*
 * Stoaca section layout
 * Keep the lesson label and profile link centered, and place the lesson visual after the introduction.
 */
(function () {
  'use strict';

  function enhanceStoacaLayout() {
    var section = document.getElementById('stoaca');
    if (!section) return;

    var grid = section.querySelector('.ks-stoaca-grid');
    var copy = section.querySelector('.ks-stoaca-copy');
    var visual = section.querySelector('.ks-stoaca-visual');
    var intro = copy && copy.querySelector('p[data-ks-narrative-copy]');

    if (grid && copy && visual && intro && visual.parentElement !== copy) {
      intro.insertAdjacentElement('afterend', visual);
      grid.classList.add('ks-stoaca-flow-ready');
    }

    var label = section.querySelector('.ks-eyebrow');
    if (label && /STREET-ACADEMY ONLINE LESSON/.test(label.textContent)) {
      label.classList.add('ks-stoaca-lesson-label');
    }

    Array.prototype.forEach.call(section.querySelectorAll('a'), function (link) {
      if (/street-academyの講師プロフィール|ストアカの講師プロフィール/.test(link.textContent)) {
        link.textContent = 'ストアカの講師プロフィール・全講座を見る →';
        link.classList.add('ks-stoaca-profile-link');
      }
    });
  }

  function start() {
    enhanceStoacaLayout();
    [80, 280, 700].forEach(function (delay) {
      window.setTimeout(enhanceStoacaLayout, delay);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
}());
