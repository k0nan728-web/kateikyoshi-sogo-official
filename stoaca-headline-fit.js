/*
 * Stoaca headline fit
 * Replace the display label and keep the headline centered on one line at every viewport.
 */
(function () {
  'use strict';

  var targetText = 'ストアカでも英検対策講座を開講中';

  function measureHeading(heading, style) {
    var ruler = heading.cloneNode(true);
    ruler.textContent = targetText;
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

  function enhanceHeadline() {
    var section = document.getElementById('stoaca');
    if (!section) return;
    var heading = Array.prototype.find.call(section.querySelectorAll('h1,h2,h3'), function (element) {
      return /street-academy|ストアカ/.test(element.textContent);
    });
    if (!heading) return;

    if (heading.textContent.trim() !== targetText) heading.textContent = targetText;
    heading.classList.add('ks-stoaca-headline-fit');
    heading.style.removeProperty('--ks-stoaca-heading-size');

    var available = heading.parentElement.getBoundingClientRect().width;
    var style = getComputedStyle(heading);
    var baseSize = Number.parseFloat(style.fontSize);
    if (!available || !baseSize) return;

    var required = measureHeading(heading, style);
    var fitted = required > available ? baseSize * (available / required) : baseSize;
    heading.style.setProperty('--ks-stoaca-heading-size', Math.max(12, fitted).toFixed(2) + 'px');
  }

  var resizeTimer;
  function scheduleFit() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(enhanceHeadline, 80);
  }

  function start() {
    enhanceHeadline();
    [80, 260, 700, 1400].forEach(function (delay) { window.setTimeout(enhanceHeadline, delay); });
    window.addEventListener('load', enhanceHeadline, { once: true });
    window.addEventListener('resize', scheduleFit, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
}());
