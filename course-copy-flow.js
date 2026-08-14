/*
 * Course copy flow
 * Keeps the course headline and course-detail copy readable on every viewport.
 */
(function () {
  'use strict';

  var COURSE_HEADING = '英検・受験・不登校・通信制高校まで対応する15の指導コース';
  var HEADING_LINES = [
    '英検・受験・不登校・通信制高校まで',
    '対応する15の指導コース'
  ];
  var segmenter = typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function'
    ? new Intl.Segmenter('ja', { granularity: 'word' })
    : null;

  function createPhrase(text) {
    var phrase = document.createElement('span');
    phrase.className = 'ks-course-phrase';
    phrase.textContent = text;
    return phrase;
  }

  function phraseFragment(text, maximumLength) {
    var fragment = document.createDocumentFragment();
    var source = String(text || '').replace(/\s+/g, ' ').trim();
    if (!source) return fragment;

    var units = segmenter
      ? Array.from(segmenter.segment(source), function (part) { return part.segment; })
      : source.split('');
    var phrase = '';

    function flush() {
      if (!phrase) return;
      fragment.appendChild(createPhrase(phrase));
      phrase = '';
    }

    units.forEach(function (unit) {
      var nextLength = (phrase + unit).replace(/\s/g, '').length;
      if (phrase && nextLength > maximumLength) flush();
      phrase += unit;
      if (/[、。・！!？?：:]/.test(unit) || /(?:ます|です|した|する|対応|対策|支援|作成|演習|練習|あり|方)$/.test(phrase)) {
        flush();
      }
    });
    flush();
    return fragment;
  }

  function replaceWithPhrases(element, maximumLength) {
    if (!element || element.dataset.ksCoursePhraseFlow === 'true') return;
    var text = element.textContent.replace(/\s+/g, ' ').trim();
    if (!text) return;
    element.replaceChildren(phraseFragment(text, maximumLength));
    element.classList.add('ks-course-copy-flow');
    element.dataset.ksCoursePhraseFlow = 'true';
  }

  function findCourseDetailCard(section) {
    return Array.prototype.find.call(section.querySelectorAll('.rounded-2xl'), function (card) {
      return Array.prototype.some.call(card.querySelectorAll('p'), function (paragraph) {
        return paragraph.textContent.replace(/\s+/g, '').trim() === '主なサポート内容';
      });
    });
  }

  function enhanceCourseDetail(section) {
    var card = findCourseDetailCard(section);
    if (!card) return;
    card.classList.add('ks-course-detail-flow');

    var paragraphs = Array.prototype.slice.call(card.querySelectorAll('p'));
    var supportLabel = paragraphs.find(function (paragraph) {
      return paragraph.textContent.replace(/\s+/g, '').trim() === '主なサポート内容';
    });
    var recommendationLabel = paragraphs.find(function (paragraph) {
      return paragraph.textContent.replace(/\s+/g, '').trim() === 'こんな方におすすめ';
    });

    paragraphs.forEach(function (paragraph) {
      var normalized = paragraph.textContent.replace(/\s+/g, '').trim();
      if (normalized.length >= 28 && paragraph !== supportLabel && paragraph !== recommendationLabel) {
        replaceWithPhrases(paragraph, 13);
      }
    });

    if (supportLabel && supportLabel.parentElement) {
      Array.prototype.forEach.call(supportLabel.parentElement.querySelectorAll('li'), function (item) {
        var copy = item.lastElementChild;
        if (!copy || copy.tagName !== 'SPAN') return;
        copy.classList.add('ks-course-support-copy');
        replaceWithPhrases(copy, 16);
      });
    }

    if (recommendationLabel && recommendationLabel.nextElementSibling && recommendationLabel.nextElementSibling.tagName === 'P') {
      replaceWithPhrases(recommendationLabel.nextElementSibling, 13);
    }
  }

  function measureSingleLine(element) {
    var ruler = element.cloneNode(true);
    ruler.style.cssText = [
      'position:fixed!important',
      'left:-10000px!important',
      'top:-10000px!important',
      'width:max-content!important',
      'max-width:none!important',
      'white-space:nowrap!important',
      'visibility:hidden!important'
    ].join(';');
    document.body.appendChild(ruler);
    var width = ruler.getBoundingClientRect().width;
    ruler.remove();
    return width;
  }

  function enhanceHeading(section) {
    var heading = Array.prototype.find.call(section.querySelectorAll('h2'), function (element) {
      return element.textContent.replace(/\s+/g, '').trim() === COURSE_HEADING;
    });
    if (!heading) return;

    if (heading.dataset.ksCourseHeadingFlow !== 'true') {
      heading.replaceChildren();
      HEADING_LINES.forEach(function (line) {
        var lineElement = document.createElement('span');
        lineElement.className = 'ks-course-heading-line';
        lineElement.textContent = line;
        heading.appendChild(lineElement);
      });
      heading.classList.add('ks-course-heading-fit');
      heading.dataset.ksCourseHeadingFlow = 'true';
    }

    heading.style.removeProperty('--ks-course-heading-size');
    var lines = Array.prototype.slice.call(heading.querySelectorAll('.ks-course-heading-line'));
    if (!lines.length || !heading.clientWidth) return;
    var fontSize = Number.parseFloat(getComputedStyle(heading).fontSize);
    var requiredWidth = Math.max.apply(null, lines.map(measureSingleLine));
    var size = fontSize;
    if (requiredWidth > heading.clientWidth) {
      size = Math.max(15, fontSize * (heading.clientWidth / requiredWidth));
    }
    heading.style.setProperty('--ks-course-heading-size', size.toFixed(2) + 'px');
  }

  function enhance() {
    var section = document.querySelector('#courses');
    if (!section) return;
    enhanceHeading(section);
    enhanceCourseDetail(section);
  }

  var resizeTimer;
  function scheduleEnhance() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(enhance, 90);
  }

  function boot() {
    enhance();
    [100, 350, 900, 1500].forEach(function (delay) {
      window.setTimeout(enhance, delay);
    });
    window.addEventListener('resize', scheduleEnhance, { passive: true });
    var root = document.querySelector('#root') || document.body;
    new MutationObserver(scheduleEnhance).observe(root, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
}());
