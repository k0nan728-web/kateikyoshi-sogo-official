/* Brand portal layer for the general tutoring site. */
(function () {
  'use strict';

  var portalMarkup = '' +
    '<section id="brand-portal" class="ks-brand-portal" aria-labelledby="ks-brand-portal-title">' +
      '<div class="ks-brand-portal-shell">' +
        '<div class="ks-brand-portal-heading">' +
          '<p class="ks-brand-portal-eyebrow">ONE TEACHER, MULTIPLE PATHS</p>' +
          '<h2 id="ks-brand-portal-title">お子様の課題に合わせた<br class="ks-brand-portal-break" />専門ブランド</h2>' +
          '<p class="ks-brand-portal-lead">英検を深く、受験を戦略的に。不登校・通信制高校には、学びを止めない伴走を。<br class="ks-brand-portal-break" />総合サイトから、それぞれの目的に合う入口を選べます。</p>' +
        '</div>' +
        '<div class="ks-brand-portal-grid">' +
          '<a class="ks-brand-card ks-brand-card--eiken" href="/eiken/">' +
            '<span class="ks-brand-card-kicker">EIKEN PASS SEMINAR</span>' +
            '<span class="ks-brand-card-title">英検合格ゼミナール</span>' +
            '<span class="ks-brand-card-copy">5級〜準1級・4技能に特化。級別の学習計画から二次面接まで、英検合格への道筋を専門サイトでご案内します。</span>' +
            '<span class="ks-brand-card-action">専門サイトを見る <b aria-hidden="true">→</b></span>' +
          '</a>' +
          '<a class="ks-brand-card ks-brand-card--exam" href="#courses">' +
            '<span class="ks-brand-card-kicker">EXAM STRATEGY</span>' +
            '<span class="ks-brand-card-title">受験・学習戦略</span>' +
            '<span class="ks-brand-card-copy">大学・高校・中学受験から総合型選抜まで。科目と進路を横断し、今から何をするかを整理します。</span>' +
            '<span class="ks-brand-card-action">受験コースを見る <b aria-hidden="true">→</b></span>' +
          '</a>' +
          '<a class="ks-brand-card ks-brand-card--support" href="#courses">' +
            '<span class="ks-brand-card-kicker">LEARNING &amp; LIFE SUPPORT</span>' +
            '<span class="ks-brand-card-title">不登校・通信制高校サポート</span>' +
            '<span class="ks-brand-card-copy">学習再開、課題整理、卒業・大学受験まで。お子様のペースを尊重しながら、次の一歩を一緒に設計します。</span>' +
            '<span class="ks-brand-card-action">サポートコースを見る <b aria-hidden="true">→</b></span>' +
          '</a>' +
        '</div>' +
        '<div class="ks-brand-portal-proof" aria-label="総合サイト共通の強み">' +
          '<span><b>20年超</b>の指導経験</span>' +
          '<span><b>1,000名超</b>の総指導生徒数</span>' +
          '<span><b>全国対応</b>オンライン指導</span>' +
        '</div>' +
      '</div>' +
    '</section>';

  function addPortal() {
    if (document.querySelector('#brand-portal')) return true;
    var firstContentSection = document.querySelector('#for-you, #teacher, #why, #courses');
    if (!firstContentSection || !firstContentSection.parentElement) return false;
    firstContentSection.insertAdjacentHTML('beforebegin', portalMarkup);
    return true;
  }

  function addNavLink() {
    if (document.querySelector('.ks-brand-nav-link')) return true;
    var navRow = document.querySelector('nav.fixed.top-0 > div:nth-child(2) .container > div');
    if (!navRow) return false;
    var link = document.createElement('a');
    link.className = 'ks-brand-nav-link';
    link.href = '#brand-portal';
    link.textContent = 'ブランド';
    link.setAttribute('aria-label', '専門ブランドを選ぶ');
    navRow.appendChild(link);
    return true;
  }

  function start() {
    var portalReady = addPortal();
    var navReady = addNavLink();
    if (portalReady && navReady) return;
    var observer = new MutationObserver(function () {
      var ready = addPortal() && addNavLink();
      if (ready) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
}());

/* Keep the small brand portal intentionally additive: existing course cards and form flows remain untouched. */
