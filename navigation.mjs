/** Move keyboard focus out of a closing menu; native anchor scrolling stays intact. */
export function focusAnchorTarget(link, doc = document) {
  const href = link.getAttribute('href');
  if (!href?.startsWith('#') || href.length === 1) return false;
  const target = doc.getElementById(href.slice(1));
  if (!target) return false;
  const temporary = !target.hasAttribute('tabindex');
  if (temporary) {
    target.setAttribute('tabindex', '-1');
    target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
  }
  target.focus({ preventScroll: true });
  return true;
}
