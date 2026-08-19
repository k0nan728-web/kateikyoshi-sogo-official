/* Add specialist-brand paths after the all-courses description while preserving a clear route to every other course. */
(function () {
  'use strict';

  var brands = [
    {
      variant: 'ks-course-brand-link--eiken',
      href: '/eiken/',
      area: '英検対策',
      kicker: 'EIKEN PASS SEMINAR',
      title: '英検合格ゼミナール',
      label: '英検対策：英検合格ゼミナールの専門サイトを見る'
    },
    {
      variant: 'ks-course-brand-link--gyakuten',
      href: '/gyakuten/',
      area: '大学受験',
      kicker: 'GYAKUTEN PASS SEMINAR',
      title: '逆転合格ゼミナール',
      label: '大学受験：逆転合格ゼミナールの専門サイトを見る'
    },
    {
      variant: 'ks-course-brand-link--bansou',
      href: '/bansou/',
      area: '不登校・通信制高校・発達特性',
      kicker: 'SHINRO BANSOU SEMINAR',
      title: '進路伴走ゼミナール',
      label: '不登校・通信制高校・発達特性：進路伴走ゼミナールの専門サイトを見る'
    }
  ];

  function findCourseHeading() {
    return Array.prototype.find.call(document.querySelectorAll('h1, h2, h3'), function (heading) {
      return heading.textContent.replace(/\s+/g, '').indexOf('対応する15の指導コース') !== -1;
    });
  }

  function findCourseDescription(heading) {
    var siblings = Array.prototype.slice.call(heading.parentElement.children);
    var index = siblings.indexOf(heading);
    return siblings.slice(index + 1).find(function (element) {
      return element.tagName === 'P';
    }) || null;
  }

  function createBrandLink(brand) {
    var link = document.createElement('a');
    link.className = 'ks-course-brand-link ' + brand.variant;
    link.href = brand.href;
    link.setAttribute('aria-label', brand.label);
    link.innerHTML =
      '<span class="ks-course-brand-link-area">' + brand.area + '</span>' +
      '<span class="ks-course-brand-link-kicker">' + brand.kicker + '</span>' +
      '<strong>' + brand.title + '</strong>' +
      '<span class="ks-course-brand-link-arrow" aria-hidden="true">→</span>';
    return link;
  }

  function addCourseListAnchor(heading) {
    var section = heading.closest('section');
    if (!section) return;
    var firstCourse = Array.prototype.find.call(section.querySelectorAll('button'), function (button) {
      return button.textContent.replace(/\s+/g, '').indexOf('英検対策コース') !== -1;
    });
    if (firstCourse && !firstCourse.id) firstCourse.id = 'all-course-list';
  }

  function createGeneralCoursePath() {
    var path = document.createElement('aside');
    path.className = 'ks-course-general-path';
    path.setAttribute('aria-label', 'その他の指導コースへのご案内');
    path.innerHTML =
      '<p class="ks-course-general-path-eyebrow">OTHER LEARNING GOALS</p>' +
      '<p class="ks-course-general-path-title">高校受験・定期テスト・学校補習などをお探しの方へ</p>' +
      '<p class="ks-course-general-path-copy">中学受験・総合型選抜・高卒認定・進路相談・学習カウンセリングも、鈴木が一人で対応します。以下の15コースから、目的に合うコースをご覧ください。</p>' +
      '<a class="ks-course-general-path-link" href="#all-course-list">その他のコースを見る <span aria-hidden="true">↓</span></a>';
    return path;
  }

  function addBrandLinks() {
    var heading = findCourseHeading();
    if (!heading || document.querySelector('.ks-course-brand-links')) return false;

    var description = findCourseDescription(heading);
    if (!description) return false;

    var specialistIntro = document.createElement('p');
    specialistIntro.className = 'ks-course-specialist-intro';
    specialistIntro.textContent = '特にご相談の多い3領域は、専門サイトで詳しくご案内しています。';

    var links = document.createElement('nav');
    links.className = 'ks-course-brand-links';
    links.setAttribute('aria-label', '専門ブランドサイト');
    brands.forEach(function (brand) {
      links.appendChild(createBrandLink(brand));
    });

    description.insertAdjacentElement('afterend', specialistIntro);
    specialistIntro.insertAdjacentElement('afterend', links);
    links.insertAdjacentElement('afterend', createGeneralCoursePath());
    addCourseListAnchor(heading);
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
