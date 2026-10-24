/* Keep 1–3 Japanese characters from being stranded on another line.
 * No wording changes, truncation, fixed viewport assumptions or forced nowrap.
 * Measure the real font and column, and restore the design size on each resize.
 */
(() => {
  'use strict';
  const selector = 'main h1,main h2,main h3,main h4,main h5,main p,main li,main dt,main dd,main figcaption,main summary,main .book-example>strong,main .book-example>span:not(.book-cover),footer p,main .editorial-phrase,main .heading-phrase,main .semantic-unit,main .phrase,main .heading-line,main .copy-unit';
  const ignored = 'svg,[aria-hidden="true"],script,style,input,select,textarea,code,pre';
  const ink = text => text.replace(/[\s\p{P}\p{S}]/gu, '');
  function lines(el) {
    const rows = [];
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const range = document.createRange();
    let node;
    while ((node = walker.nextNode())) {
      if (node.parentElement.closest(ignored)) continue;
      for (let i = 0; i < node.length; i++) {
        if (/\s/.test(node.data[i])) continue;
        range.setStart(node, i); range.setEnd(node, i + 1);
        const rect = range.getBoundingClientRect();
        if (!rect.width || !rect.height) continue;
        // Use vertical overlap, not exact top, to group mixed font sizes.
        const middle = (rect.top + rect.bottom) / 2;
        let row = rows.find(r => Math.abs(r.middle - middle) < Math.min(r.height, rect.height) * .45);
        if (!row) { row = {middle, height:rect.height, text:''}; rows.push(row); }
        row.text += node.data[i];
      }
    }
    return rows.sort((a,b) => a.middle-b.middle).map(r => r.text);
  }
  const orphan = rows => rows.length > 1 && ink(rows.at(-1)).length <= 3;
  const fitted = new Set();
  function refine() {
    // Reset our own adjustments only. Never overwrite another component's styles.
    fitted.forEach(el => {
      el.classList.remove('ks-responsive-fit','ks-responsive-balance');
      el.style.removeProperty('--ks-responsive-font');
    });
    fitted.clear();
    document.querySelectorAll(selector).forEach(el => {
      const text = el.textContent.trim();
      if (text.length < 4 || text.length > 240 || !/[\u3040-\u30ff\u3400-\u9fff]/.test(text)) return;
      if (!el.getClientRects().length || el.closest('[data-copy-fit="off"],table,form')) return;
      // Avoid fitting an entire list item containing separate blocks/headings.
      if (el.matches('li,dd,summary') && el.querySelector('p,h1,h2,h3,h4,ul,ol,div')) return;
      const style = getComputedStyle(el);
      if (['flex','grid','inline-flex','inline-grid'].includes(style.display)) return;
      const original = Number.parseFloat(style.fontSize);
      if (!original || el.clientWidth < 60) return;
      const before = lines(el);
      if (!orphan(before)) return;
      const heading = el.matches('h1,h2,h3,h4,h5,summary,strong') || !!el.closest('h1,h2,h3,h4,h5');
      // Modest shrink only, with a readable floor. Browser zoom stays effective.
      const floor = Math.min(original, Math.max(heading ? 15 : 13, original * (heading ? .84 : .92)));
      let success = false;
      for (let size = original - .25; size >= floor; size -= .25) {
        el.style.setProperty('--ks-responsive-font',size.toFixed(2)+'px');
        el.classList.add('ks-responsive-fit');
        const after = lines(el);
        if (after.length < before.length && !orphan(after) && el.scrollWidth <= el.clientWidth + 1) {
          success = true; break;
        }
      }
      if (!success) {
        el.classList.remove('ks-responsive-fit');
        el.style.removeProperty('--ks-responsive-font');
        // When modest shrinking cannot remove a line, distribute short headings
        // over natural lines. Existing phrase spans and intentional breaks stay.
        if (text.length <= 90) el.classList.add('ks-responsive-balance');
      }
      fitted.add(el);
    });
  }
  let timer;
  function schedule() { clearTimeout(timer); timer = setTimeout(refine,100); }
  function boot() {
    refine();
    document.fonts?.ready.then(schedule);
    document.fonts?.addEventListener('loadingdone',schedule);
    window.addEventListener('resize',schedule,{passive:true});
    window.addEventListener('orientationchange',schedule,{passive:true});
    window.addEventListener('load',schedule,{once:true});
    document.addEventListener('toggle',schedule,true);
    new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true,characterData:true});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();
})();
