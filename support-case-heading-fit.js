/*
 * Support case heading fit
 * Keep success-case headings centered on one line while cards remain in a single vertical column.
 */
(function () {
  'use strict';

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
    heading.style.removeProperty('--ks-case-heading-size');
    var content = heading.parentElement;
    var available = content.getBoundingClientRect().width;
    var style = getComputedStyle(heading);
    var baseSize = Number.parseFloat(style.fontSize);
    if (!available || !baseSize) return;

    var required = measureHeading(heading, style);
    var fitted = required > available ? baseSize * (available / required) : baseSize;
    heading.style.setProperty('--ks-case-heading-size', Math.max(10.5, fitted).toFixed(2) + 'px');
  }

  function enhanceSupportCases() {
    var section = document.getElementById('futouko');
    if (!section) return;
    var grid = section.querySelector('.grid.md\\:grid-cols-3');
    if (!grid) return;

    Array.prototype.forEach.call(grid.children, function (card) {
      var heading = card.querySelector(':scope > div:first-child > div:last-child > p');
      if (!heading) return;
      card.classList.add('ks-support-case-card');
      fitHeading(heading);
    });
  }

  var resizeTimer;
  function scheduleFit() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(enhanceSupportCases, 80);
  }

  function start() {
    enhanceSupportCases();
    [80, 260, 700, 1400].forEach(function (delay) {
      window.setTimeout(enhanceSupportCases, delay);
    });
    window.addEventListener('load', enhanceSupportCases, { once: true });
    window.addEventListener('resize', scheduleFit, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
}());
