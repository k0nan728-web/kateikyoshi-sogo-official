(() => {
  "use strict";

  const measureSingleLineWidth = (element, candidate) => {
    const ruler = element.cloneNode(true);
    ruler.style.setProperty("position", "fixed", "important");
    ruler.style.setProperty("left", "-10000px", "important");
    ruler.style.setProperty("top", "-10000px", "important");
    ruler.style.setProperty("visibility", "hidden", "important");
    ruler.style.setProperty("width", "max-content", "important");
    ruler.style.setProperty("max-width", "none", "important");
    ruler.style.setProperty("display", "inline-block", "important");
    ruler.style.setProperty("white-space", "nowrap", "important");
    ruler.style.setProperty("word-break", "keep-all", "important");
    ruler.style.setProperty("font-size", `${candidate}px`, "important");
    document.body.appendChild(ruler);
    const width = ruler.getBoundingClientRect().width;
    ruler.remove();
    return width;
  };

  const fitSingleLine = (element, availableWidth, minSize, maxSize) => {
    if (!element || availableWidth <= 0) return;

    let low = minSize;
    let high = maxSize;
    let best = minSize;

    for (let index = 0; index < 12; index += 1) {
      const candidate = (low + high) / 2;
      if (measureSingleLineWidth(element, candidate) <= availableWidth) {
        best = candidate;
        low = candidate;
      } else {
        high = candidate;
      }
    }

    element.style.setProperty("display", "block", "important");
    element.style.setProperty("white-space", "nowrap", "important");
    element.style.setProperty("word-break", "keep-all", "important");
    element.style.setProperty("font-size", `${best.toFixed(2)}px`, "important");
  };

  const fitTwoLines = (element, minSize, maxSize) => {
    if (!element || element.clientWidth <= 0) return;

    element.style.setProperty("display", "block", "important");
    element.style.setProperty("white-space", "normal", "important");
    element.style.setProperty("word-break", "normal", "important");
    element.style.setProperty("overflow-wrap", "anywhere", "important");
    element.style.setProperty("line-height", "1.25", "important");

    let low = minSize;
    let high = maxSize;
    let best = minSize;

    for (let index = 0; index < 12; index += 1) {
      const candidate = (low + high) / 2;
      element.style.setProperty("font-size", `${candidate}px`, "important");
      const lineHeight = candidate * 1.25;

      if (element.scrollHeight <= lineHeight * 2 + 2) {
        best = candidate;
        low = candidate;
      } else {
        high = candidate;
      }
    }

    element.style.setProperty("font-size", `${best.toFixed(2)}px`, "important");
  };

  const fitHeaderTypography = () => {
    const copy = document.querySelector(".ks-header-brand-copy");
    const name = copy?.querySelector(".ks-header-name");
    const tagline = copy?.querySelector(".ks-header-tagline");
    const headerRow = copy?.closest("a")?.parentElement;

    if (!copy || !name || !tagline || !headerRow) return;

    headerRow.classList.add("ks-mobile-header-row");

    if (window.innerWidth > 767) {
      [name, tagline].forEach((element) => {
        ["display", "width", "max-width", "white-space", "word-break", "font-size"].forEach(
          (property) => element.style.removeProperty(property),
        );
      });
      return;
    }

    fitSingleLine(name, name.clientWidth, 12, 32);
    fitSingleLine(tagline, headerRow.clientWidth, 7, 14);

    const nameSize = Number.parseFloat(name.style.fontSize) || 12;
    const taglineSize = Number.parseFloat(tagline.style.fontSize) || 7;
    const hierarchyCap = Math.max(8, nameSize * 0.72);

    if (taglineSize > hierarchyCap) {
      tagline.style.setProperty("font-size", `${hierarchyCap.toFixed(2)}px`, "important");
    }
  };

  const fitHeroTypography = (copy) => {
    const heading = copy.querySelector("h1");
    if (heading) {
      heading.style.setProperty("width", "100%", "important");
      heading.style.setProperty("max-width", "100%", "important");
      fitSingleLine(heading, heading.clientWidth, 15, 52);
    }

    const statsGrid = [...copy.children].find(
      (child) =>
        child.classList?.contains("grid") &&
        child.className.includes("grid-cols-1") &&
        child.className.includes("sm:grid-cols-2"),
    );

    if (!statsGrid) return;

    [...statsGrid.children].forEach((card) => {
      const holder = card.querySelector(".pl-2");
      const number = holder?.firstElementChild;
      const label = holder?.lastElementChild;
      if (number) {
        fitSingleLine(number, number.clientWidth, 16, 44);
      }

      if (label) {
        fitTwoLines(label, 13, 22);
      }
    });
  };

  const initialiseHero = () => {
    const image = [...document.images].find((item) =>
      item.src.includes("IMG_4684_trimmed_35c73ae5.PNG"),
    );

    const hero = image?.closest("section");
    const grid = image?.closest(".grid");
    const [visual, copy] = grid ? [...grid.children] : [];

    if (!hero || !image || !visual || !copy) return;

    if (!hero.dataset.photoHeroReady) {
      hero.dataset.photoHeroReady = "true";
      hero.classList.add("ks-photo-hero");
      visual.classList.add("ks-hero-visual");
      copy.classList.add("ks-hero-copy");

      image.loading = "eager";
      image.decoding = "async";
      image.fetchPriority = "high";

      window.requestAnimationFrame(() => hero.classList.add("ks-hero-mounted"));
    }

    const resizeTypography = () => {
      fitHeroTypography(copy);
      fitHeaderTypography();
    };
    window.requestAnimationFrame(resizeTypography);
    window.setTimeout(resizeTypography, 250);
    document.fonts?.ready?.then(resizeTypography);

    if (!hero.dataset.responsiveTypeReady) {
      hero.dataset.responsiveTypeReady = "true";
      let resizeTimer;
      const scheduleResize = () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(resizeTypography, 80);
      };

      window.addEventListener("resize", scheduleResize, { passive: true });
      new ResizeObserver(scheduleResize).observe(copy);
    }
  };

  const boot = () => {
    let attempts = 0;
    const timer = window.setInterval(() => {
      initialiseHero();
      attempts += 1;
      if (document.querySelector(".ks-photo-hero") || attempts >= 50) {
        window.clearInterval(timer);
      }
    }, 80);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
})();
