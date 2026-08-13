(() => {
  "use strict";

  const VARIABLE_TEXT_SELECTOR =
    "main :is(p, li, dd, dt, blockquote, figcaption, td, th, summary)";
  const NARRATIVE_SELECTOR = "main p";
  const SEMANTIC_GROUPS = ["20年の経験", "お子様だけの学習プランナー"];
  const SEMANTIC_GROUP_SELECTOR = "main p, main li, main dd, main dt, main blockquote";
  const FRAMED_ANCESTOR_SELECTOR = [
    "article",
    ".ks-comparison-scroll",
    ".ks-decision-flow",
    ".ks-street-academy-courses",
    ".ks-social-hub",
    "[role='list']",
    "[role='grid']",
    ".rounded-xl",
    ".rounded-2xl",
    ".rounded-3xl",
  ].join(",");
  const PHRASE_STARTS = new Set(["お子様", "保護者様", "生徒様", "先生", "講師"]);
  const PHRASE_ENDINGS = new Set([
    "は",
    "が",
    "を",
    "に",
    "へ",
    "と",
    "で",
    "も",
    "や",
    "の",
    "まで",
    "より",
    "など",
    "ので",
    "のに",
    "なら",
    "って",
    "という",
  ]);
  const SENTENCE_ENDINGS = /^[、。！？!?：:；;]$/;
  const JAPANESE = /[ぁ-んァ-ヶ一-龯々〆ヵヶ]/;
  const MAX_PHRASE_CHARACTERS = 8;
  const segmenter =
    typeof Intl?.Segmenter === "function"
      ? new Intl.Segmenter("ja", { granularity: "word" })
      : null;

  const isNarrativeCopy = (element) => {
    if (!element?.textContent?.trim()) return false;
    if (element.matches(".ks-eyebrow, .ks-social-hub-label, .ks-article-meta")) return false;
    if (element.closest(FRAMED_ANCESTOR_SELECTOR)) return false;
    return element.textContent.trim().length >= 12;
  };

  const appendPhrase = (fragment, text) => {
    if (!text) return;
    if (!JAPANESE.test(text)) {
      fragment.append(text);
      return;
    }
    const phrase = document.createElement("span");
    phrase.className = "ks-phrase";
    phrase.textContent = text;
    fragment.append(phrase);
  };

  const protectTextNode = (node) => {
    const text = node.textContent;
    if (!text?.trim() || !JAPANESE.test(text) || !segmenter) return;

    const fragment = document.createDocumentFragment();
    let phrase = "";
    const flush = () => {
      appendPhrase(fragment, phrase);
      phrase = "";
    };
    const appendPunctuationToPreviousPhrase = (punctuation) => {
      const previous = fragment.lastChild;
      if (previous instanceof HTMLElement && previous.classList.contains("ks-phrase")) {
        previous.textContent += punctuation;
      } else {
        fragment.append(punctuation);
      }
    };

    for (const { segment } of segmenter.segment(text)) {
      if (/^\s+$/.test(segment)) {
        flush();
        fragment.append(segment);
        continue;
      }

      if (SENTENCE_ENDINGS.test(segment)) {
        if (phrase) {
          phrase += segment;
          flush();
        } else {
          appendPunctuationToPreviousPhrase(segment);
        }
        continue;
      }

      if (phrase && PHRASE_STARTS.has(segment)) flush();

      const prospectiveLength = (phrase + segment).replace(/\s/g, "").length;
      if (phrase && prospectiveLength > MAX_PHRASE_CHARACTERS) flush();

      phrase += segment;
      if (PHRASE_ENDINGS.has(segment)) flush();
    }
    flush();
    node.replaceWith(fragment);
  };

  const protectPhraseBoundaries = (root = document) => {
    root.querySelectorAll?.(VARIABLE_TEXT_SELECTOR).forEach((element) => {
      if (element.dataset.ksPhraseProtected === "true") return;

      let phraseRoot = element;
      if (getComputedStyle(element).display === "flex") {
        const textNodes = [...element.childNodes].filter(
          (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim(),
        );
        if (textNodes.length) {
          phraseRoot = document.createElement("span");
          phraseRoot.className = "ks-phrase-flow";
          textNodes[0].before(phraseRoot);
          textNodes.forEach((node) => phraseRoot.append(node));
        }
      }

      const walker = document.createTreeWalker(phraseRoot, NodeFilter.SHOW_TEXT);
      const nodes = [];
      let node;
      while ((node = walker.nextNode())) nodes.push(node);
      nodes.forEach(protectTextNode);
      element.dataset.ksPhraseProtected = "true";
    });
  };

  const tagNarrativeCopy = (root = document) => {
    root.querySelectorAll?.(NARRATIVE_SELECTOR).forEach((element) => {
      if (isNarrativeCopy(element)) element.dataset.ksNarrativeCopy = "true";
    });
  };

  const protectSemanticGroups = (root = document) => {
    root.querySelectorAll?.(SEMANTIC_GROUP_SELECTOR).forEach((element) => {
      if (element.dataset.ksSemanticGroups === "true") return;
      const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
      const nodes = [];
      let node;
      while ((node = walker.nextNode())) nodes.push(node);

      nodes.forEach((textNode) => {
        const source = textNode.textContent;
        if (!source || !SEMANTIC_GROUPS.some((group) => source.includes(group))) return;
        const pattern = new RegExp(`(${SEMANTIC_GROUPS.map((group) => group.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\$&")).join("|")})`, "g");
        const fragment = document.createDocumentFragment();
        source.split(pattern).forEach((part) => {
          if (!part) return;
          if (SEMANTIC_GROUPS.includes(part)) {
            const group = document.createElement("span");
            group.className = "ks-semantic-group";
            group.textContent = part;
            fragment.append(group);
          } else {
            fragment.append(part);
          }
        });
        textNode.replaceWith(fragment);
      });
      element.dataset.ksSemanticGroups = "true";
    });
  };

  const getLineLayout = (element) => {
    const rows = new Map();
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    let source;

    while ((source = walker.nextNode())) {
      for (let index = 0; index < source.textContent.length; index += 1) {
        const range = document.createRange();
        range.setStart(source, index);
        range.setEnd(source, index + 1);
        const rect = range.getBoundingClientRect();
        if (!rect.height) continue;
        const key = Math.round(rect.top);
        rows.set(key, `${rows.get(key) || ""}${source.textContent[index]}`);
      }
    }

    const lines = [...rows.entries()]
      .sort(([first], [second]) => first - second)
      .map(([, text]) => text.trim())
      .filter(Boolean);

    return { count: Math.max(1, lines.length), lines };
  };

  const getSingleLineWidth = (element) => {
    const ruler = element.cloneNode(true);
    ruler.style.cssText = [
      "position:fixed!important",
      "inset:auto!important",
      "left:-10000px!important",
      "top:-10000px!important",
      "visibility:hidden!important",
      "display:block!important",
      "width:max-content!important",
      "max-width:none!important",
      "min-width:0!important",
      "white-space:nowrap!important",
      "word-break:keep-all!important",
      "overflow-wrap:normal!important",
      "text-wrap:nowrap!important",
    ].join(";");
    document.body.appendChild(ruler);
    const width = ruler.getBoundingClientRect().width;
    ruler.remove();
    return width;
  };

  const fitNearSingleLine = (element) => {
    element.style.removeProperty("font-size");
    element.style.removeProperty("letter-spacing");

    const style = getComputedStyle(element);
    const fontSize = Number.parseFloat(style.fontSize);
    const availableWidth = element.clientWidth;
    const layout = getLineLayout(element);
    const finalLineLength = (layout.lines.at(-1) || "").replace(/[、。\s]/g, "").length;

    if (!fontSize || !availableWidth || layout.count !== 2 || finalLineLength > 6) return;

    const singleLineWidth = getSingleLineWidth(element);
    const fitRatio = availableWidth / singleLineWidth;
    const minimumRatio = 0.9;
    if (fitRatio < minimumRatio || fitRatio >= 1) return;

    element.style.setProperty("letter-spacing", "0", "important");
    const postSpacingWidth = getSingleLineWidth(element);
    const postSpacingRatio = availableWidth / postSpacingWidth;
    if (postSpacingRatio >= 1) return;
    if (postSpacingRatio < minimumRatio) {
      element.style.removeProperty("letter-spacing");
      return;
    }

    element.style.setProperty(
      "font-size",
      `${(fontSize * postSpacingRatio).toFixed(2)}px`,
      "important",
    );
  };

  let resizeTimer;
  const refineTypography = () => {
    // Keep paragraphs as continuous sentences. Native Japanese phrase wrapping
    // chooses a natural line break; do not split text into fixed-length spans
    // or reduce the font just to force a one-line result.
    protectSemanticGroups();
    tagNarrativeCopy();
  };

  const scheduleRefine = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(refineTypography, 80);
  };

  const boot = () => {
    refineTypography();
    window.requestAnimationFrame(refineTypography);
    window.setTimeout(refineTypography, 300);
    document.fonts?.ready?.then(refineTypography);
    window.addEventListener("resize", scheduleRefine, { passive: true });

    const mutationTarget = document.querySelector("#root") || document.body;
    if (mutationTarget) {
      new MutationObserver(scheduleRefine).observe(mutationTarget, {
        childList: true,
        subtree: true,
      });
    }
  };

  let hasBooted = false;
  const bootOnce = () => {
    if (hasBooted) return;
    hasBooted = true;
    window.__naturalCopyFlowBooted = true;
    boot();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootOnce, { once: true });
  } else {
    bootOnce();
  }
  window.addEventListener("load", bootOnce, { once: true });
  window.setTimeout(bootOnce, 1200);
})();
