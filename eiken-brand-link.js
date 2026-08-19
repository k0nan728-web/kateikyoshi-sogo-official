/* Add specialist-brand links immediately after the all-courses heading. */
(function () {
  'use strict';

  var brands = [
    {
      variant: 'ks-course-brand-link--eiken',
      href: '/eiken/',
      kicker: 'EIKEN PASS SEMINAR',
      title: '英検合格ゼミナール',
      label: '英検合格ゼミナールの専門サイトを見る'
    },
    {
      variant: 'ks-course-brand-link--gyakuten',
      href: '/gyakuten/',
      kicker: 'GYAKUTEN PASS SEMINAR',
      title: '逆転合格ゼミナール',
      label: '逆転合格ゼミナールの専門サイトを見る'
    },
    {
      variant: 'ks-course-brand-link--bansou',
      href: '/bansou/',
      kicker: 'SHINRO BANSOU SEMINAR',
      title: '進路伴走ゼミナール',
      label: '進路伴走ゼミナールの専門サイトを見る'
    }
  ];

  function findCourseHeading() {
    return Array.prototype.find.call(document.querySelectorAll('h1, h2, h3'), function (heading) {
      return heading.textContent.replace(/\s+/g, '').indexOf('対応する15の指導コース') !== -1;
    });
  }

  function createBrandLink(brand) {
    var link = document.createElement('a');
    link.className = 'ks-course-brand-link ' + brand.variant;
    link.href = brand.href;
    link.setAttribute('aria-label', brand.label);
    link.innerHTML =
      '<span class="ks-course-brand-link-kicker">' + brand.kicker + '</span>' +
      '<strong>' + brand.title + '</strong>' +
      '<span class="ks-course-brand-link-arrow" aria-hidden="true">→</span>';
    return link;
  }

  function addBrandLinks() {
    var heading = findCourseHeading();
    if (!heading || document.querySelector('.ks-course-brand-links')) return false;

    var links = document.createElement('nav');
    links.className = 'ks-course-brand-links';
    links.setAttribute('aria-label', '専門ブランドサイト');
    brands.forEach(function (brand) {
      links.appendChild(createBrandLink(brand));
    });

    heading.insertAdjacentElement('afterend', links);
    return true;
  }

  function start() {
    if (addBrandLinks()) return;
    var observer = new MutationObserver(function () {
      if (addBrandLinks()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
}());
