(() => {
  "use strict";

  const initialiseHero = () => {
    const image = [...document.images].find((item) =>
      item.src.includes("IMG_4684_trimmed_35c73ae5.PNG"),
    );

    const hero = image?.closest("section");
    const grid = image?.closest(".grid");
    const [visual, copy] = grid ? [...grid.children] : [];

    if (!hero || !image || !visual || !copy || hero.dataset.photoHeroReady)
      return;

    hero.dataset.photoHeroReady = "true";
    hero.classList.add("ks-photo-hero");
    visual.classList.add("ks-hero-visual");
    copy.classList.add("ks-hero-copy");

    image.loading = "eager";
    image.decoding = "async";
    image.fetchPriority = "high";

    const reveal = () => {
      window.requestAnimationFrame(() => hero.classList.add("ks-hero-mounted"));
    };

    reveal();
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
