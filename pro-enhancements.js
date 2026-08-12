/* Lightweight progressive enhancements for the static production build. */
(() => {
  const init = () => {
    const floatingCta = document.getElementById("floating-cta");
    const header = document.querySelector("nav.fixed.top-0");
    const hero = document.querySelector("main > section:first-child");

    const refreshFixedElements = () => {
      const scrolled = window.scrollY > 360;
      if (floatingCta) {
        floatingCta.classList.toggle("is-visible", scrolled);
        floatingCta.setAttribute("aria-hidden", scrolled ? "false" : "true");
      }
      if (header) {
        header.classList.toggle("is-scrolled", window.scrollY > 16);
      }
    };

    refreshFixedElements();
    window.addEventListener("scroll", refreshFixedElements, { passive: true });

    // Let keyboard users bypass the long navigation without changing content semantics.
    const skipLink = document.createElement("a");
    skipLink.href = "#main-content";
    skipLink.className = "ks-skip-link";
    skipLink.textContent = "本文へ移動";
    document.body.prepend(skipLink);

    const main = document.querySelector("main");
    if (main) {
      main.id = "main-content";
      main.tabIndex = -1;
    }

    // Convey that the hero image is supplementary on compact screens by retaining
    // the DOM reading order while CSS controls visual order.
    if (hero) {
      hero.setAttribute(
        "aria-label",
        "プロ家庭教師 鈴木雄太のオンライン指導のご案内",
      );
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
