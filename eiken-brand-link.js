/* Add a distinct brand-navigation link from the general tutoring site to the EIKEN specialist site. */
(function () {
  'use strict';

  function findCourseHeading() {
    return Array.prototype.find.call(document.querySelectorAll('h1, h2, h3'), function (heading) {
      return heading.textContent.replace(/\s+/g, '').indexOf('対応する15の指導コース') !== -1;
    });
  }

  function addBrandLink() {
    var heading = findCourseHeading();
    if (!heading || document.querySelector('.ks-eiken-brand-link')) return false;

    var link = document.createElement('a');
    link.className = 'ks-eiken-brand-link';
    link.href = '/eiken/';
    link.innerHTML = '<span class="ks-eiken-brand-link-kicker">EIKEN PASS SEMINAR</span><strong>英検合格ゼミナール 専門サイトを見る</strong><span class="ks-eiken-brand-link-arrow" aria-hidden="true">→</span>';

    var copy = heading.parentElement && heading.parentElement.querySelector('p');
    if (copy) copy.insertAdjacentElement('afterend', link);
    else heading.insertAdjacentElement('afterend', link);
    return true;
  }

  function start() {
    if (addBrandLink()) return;
    var observer = new MutationObserver(function () {
      if (addBrandLink()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
}());
