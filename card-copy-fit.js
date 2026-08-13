(() => {
  "use strict";

  const CARD_SELECTORS = [
    ".ks-for-you-card",
    ".ks-reason-card",
    ".ks-value-item",
    ".ks-article-card",
    ".ks-social-card",
    ".ks-course-card",
    ".ks-course-detail-card",
    "[class*='rounded-xl']",
    "[class*='rounded-2xl']",
    "[class*='rounded-3xl']",
  ];
  const CARD_SELECTOR = CARD_SELECTORS.join(",");
  const COPY_SELECTORS = ["p", "h3", "h4"];
  const CARD_COPY_SELECTOR = CARD_SELECTORS
    .flatMap((cardSelector) => COPY_SELECTORS.map((copySelector) => `${cardSelector} ${copySelector}`))
    .join(",");
  const MINIMUM_FONT_SIZE = 13;
  const MINIMUM_FIT_RATIO = 0.92;

  const isEligibleCopy = (copy, card) => {
    const text = copy.textContent.replace(/\s+/g, " ").trim();
    if (text.length < 4 || text.length > 52) return false;
    if (copy.closest("table, .ks-comparison-table, .ks-article-meta")) return false;
    if (copy.querySelector("a, button, input, textarea")) return false;
    if (!card.contains(copy)) return false;
    return true;
  };

  const singleLineWidth = (copy) => {
    const ruler = copy.cloneNode(true);
    const style = getComputedStyle(copy);
    ruler.style.cssText = [
      "position:fixed!important",
      "left:-10000px!important",
      "top:-10000px!important",
      "width:max-content!important",
      "max-width:none!important",
      "white-space:nowrap!important",
      "visibility:hidden!important",
      `font-size:${style.fontSize}!important`,
      `font-weight:${style.fontWeight}!important`,
      `font-family:${style.fontFamily}!important`,
      `letter-spacing:${style.letterSpacing}!important`,
    ].join(";");
    document.body.append(ruler);
    const width = ruler.getBoundingClientRect().width;
    ruler.remove();
    return width;
  };

  const refineCardCopy = () => {
    document.querySelectorAll(CARD_COPY_SELECTOR).forEach((copy) => {
      const card = copy.closest(CARD_SELECTOR);
      if (!card || !isEligibleCopy(copy, card)) return;

      card.classList.remove("ks-card-copy-one-line");
      copy.classList.remove("ks-card-copy-one-line", "ks-card-copy-font-fitted");
      copy.style.removeProperty("--ks-card-copy-fit-size");
      const available = copy.clientWidth;
      const required = singleLineWidth(copy);
      const fontSize = Number.parseFloat(getComputedStyle(copy).fontSize);
      if (!available || !required || !fontSize) return;

      if (required <= available) {
        copy.classList.add("ks-card-copy-one-line");
      } else {
        const ratio = available / required;
        const nextSize = fontSize * ratio;
        if (ratio >= MINIMUM_FIT_RATIO && nextSize >= MINIMUM_FONT_SIZE) {
          copy.style.setProperty("--ks-card-copy-fit-size", `${nextSize.toFixed(2)}px`);
          copy.classList.add("ks-card-copy-one-line", "ks-card-copy-font-fitted");
        }
      }

      // Verify against the rendered font. If the line still cannot fit, retain
      // natural Japanese wrapping instead of allowing even a small overflow.
      if (copy.classList.contains("ks-card-copy-one-line") && singleLineWidth(copy) > copy.clientWidth + 0.5) {
        copy.classList.remove("ks-card-copy-one-line", "ks-card-copy-font-fitted");
        copy.style.removeProperty("--ks-card-copy-fit-size");
      }
    });
  };

  let timer;
  const schedule = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(refineCardCopy, 90);
  };

  const boot = () => {
    refineCardCopy();
    window.requestAnimationFrame(refineCardCopy);
    window.setTimeout(refineCardCopy, 450);
    window.addEventListener("resize", schedule, { passive: true });
    new MutationObserver(schedule).observe(document.querySelector("#root") || document.body, {
      childList: true,
      subtree: true,
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
