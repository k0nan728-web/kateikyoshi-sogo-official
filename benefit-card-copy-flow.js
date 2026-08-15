/*
 * Direct-partnership benefit card copy flow
 * Keep benefit headings on one centered line and wrap body copy only between authored phrases.
 */
(function () {
  'use strict';

  var bodyGroups = {
    '相談から指導まで、情報が途切れない': [
      '状況を何度も説明し直す',
      '必要がありません。',
      '学習の経緯を把握する',
      '担当講師が、',
      '必要な調整をすぐに行います。'
    ],
    '一人ひとりに合わせて、柔軟に組み立てる': [
      '学習量、教材、授業形式、',
      'カメラの有無、受験時期まで。',
      'お子様の状態に合わせた',
      '進め方を一緒に選びます。'
    ],
    '費用を、指導そのものに集中できる': [
      '入会金・仲介手数料・',
      '管理費はいただきません。',
      '必要な支援を、',
      '指導の時間と質に集中させます。'
    ]
  };

  function createPhrase(text) {
    var phrase = document.createElement('span');
    phrase.className = 'ks-benefit-copy-phrase ks-benefit-copy-line';
    phrase.textContent = text;
    return phrase;
  }

  function measureHeading(heading, style) {
    var ruler = heading.cloneNode(true);
    ruler.style.cssText = [
      'position:fixed!important',
      'left:-10000px!important',
      'top:-10000px!important',
      'display:block!important',
      'width:max-content!important',
      'max-width:none!important',
      'white-space:nowrap!important',
      'visibility:hidden!important',
      'font-family:' + style.fontFamily + '!important',
      'font-weight:' + style.fontWeight + '!important',
      'letter-spacing:' + style.letterSpacing + '!important'
    ].join(';');
    document.body.appendChild(ruler);
    var width = ruler.getBoundingClientRect().width;
    ruler.remove();
    return width;
  }

  function fitHeading(heading) {
    heading.style.removeProperty('--ks-benefit-heading-size');
    var container = heading.parentElement;
    var available = container.getBoundingClientRect().width;
    var style = getComputedStyle(heading);
    var baseSize = Number.parseFloat(style.fontSize);
    if (!available || !baseSize) return;

    var required = measureHeading(heading, style);
    var fitted = required > available ? baseSize * (available / required) : baseSize;
    heading.style.setProperty('--ks-benefit-heading-size', Math.max(10.5, fitted).toFixed(2) + 'px');
  }

  function groupBodyCopy(card, heading) {
    var groups = bodyGroups[heading.textContent.trim()];
    var body = card.querySelector('p');
    if (!groups || !body || body.dataset.ksBenefitGroups === 'true') return;

    body.textContent = '';
    groups.forEach(function (group) {
      body.appendChild(createPhrase(group));
    });
    body.classList.add('ks-benefit-copy-flow');
    body.dataset.ksBenefitGroups = 'true';
  }

  function enhanceCards() {
    var section = document.getElementById('direct-contract');
    if (!section) return;

    Array.prototype.forEach.call(section.querySelectorAll('.ks-value-item'), function (card) {
      var heading = card.querySelector('h3');
      if (!heading) return;
      groupBodyCopy(card, heading);
      card.classList.add('ks-benefit-copy-fit');
      fitHeading(heading);
    });
  }

  var resizeTimer;
  function scheduleFit() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(enhanceCards, 80);
  }

  function start() {
    enhanceCards();
    [80, 260, 700, 1400].forEach(function (delay) {
      window.setTimeout(enhanceCards, delay);
    });
    window.addEventListener('load', enhanceCards, { once: true });
    window.addEventListener('resize', scheduleFit, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
}());
