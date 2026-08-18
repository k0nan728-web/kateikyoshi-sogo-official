/* Brand portal layer for the general tutoring site. */
(function () {
  'use strict';

  var portalMarkup = '' +
    '<section id="brand-portal" class="ks-brand-portal" aria-labelledby="ks-brand-portal-title">' +
      '<div class="ks-brand-portal-shell">' +
        '<div class="ks-brand-portal-heading">' +
          '<p class="ks-brand-portal-eyebrow">ONE TEACHER, MULTIPLE PATHS</p>' +
          '<h2 id="ks-brand-portal-title">お子様の課題に合わせた<br class="ks-brand-portal-break" />専門ブランド</h2>' +
          '<p class="ks-brand-portal-lead">英検を深く、大学受験を戦略的に。不登校・通信制高校には、進路まで見据えた伴走を。<br class="ks-brand-portal-break" />総合サイトから、それぞれの目的に合う専門ブランドを選べます。</p>' +
        '</div>' +
        '<div class="ks-brand-portal-positioning" aria-label="幅広い教育対応と専門ブランドの位置づけ">' +
          '<p class="ks-brand-portal-positioning-label">ONE TEACHER, FULL-SCOPE SUPPORT</p>' +
          '<p class="ks-brand-portal-positioning-copy"><span>高校受験・中学受験・定期テスト対策</span>、<span>学校の補習・進路相談</span>、<span>学習カウンセリングまで。</span><br />教育に関する幅広いご相談を、<span>鈴木が一人で一貫してお受けします。</span></p>' +
          '<p class="ks-brand-portal-positioning-focus">とりわけ、<span>英検・大学受験</span>、<span>不登校・通信制高校支援</span>の3領域は、豊富な指導実績と多くのお問い合わせをいただいているため、<strong>他コースとは別に、独立ブランドとして詳しい情報と専門の相談導線をご用意しています。</strong></p>' +
        '</div>' +
        '<div class="ks-brand-portal-grid">' +
          '<a class="ks-brand-card ks-brand-card--eiken" href="/eiken/">' +
            '<span class="ks-brand-card-kicker">EIKEN PASS SEMINAR</span>' +
            '<span class="ks-brand-card-title">英検合格ゼミナール</span>' +
            '<span class="ks-brand-card-copy">5級〜準1級・4技能に特化。級別の学習計画から二次面接まで、英検合格への道筋を専門サイトでご案内します。</span>' +
            '<span class="ks-brand-card-action">専門サイトを見る <b aria-hidden="true">→</b></span>' +
          '</a>' +
          '<a class="ks-brand-card ks-brand-card--exam" href="/gyakuten/">' +
            '<span class="ks-brand-card-kicker">GYAKUTEN PASS SEMINAR</span>' +
            '<span class="ks-brand-card-title">逆転合格ゼミナール</span>' +
            '<span class="ks-brand-card-copy">大学受験専門｜現在の学力から志望大学合格を目指す。過去問分析と逆算カリキュラムで逆転合格へ伴走します。</span>' +
            '<span class="ks-brand-card-action">専門サイトを見る <b aria-hidden="true">→</b></span>' +
          '</a>' +
          '<a class="ks-brand-card ks-brand-card--support" href="/bansou/">' +
            '<span class="ks-brand-card-kicker">SHINRO BANSOU SEMINAR</span>' +
            '<span class="ks-brand-card-title">進路伴走ゼミナール</span>' +
            '<span class="ks-brand-card-copy">不登校・通信制高校生のための大学受験専門指導。学び直しから卒業・志望大学合格まで、進路を一緒に設計します。</span>' +
            '<span class="ks-brand-card-action">専門サイトを見る <b aria-hidden="true">→</b></span>' +
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
