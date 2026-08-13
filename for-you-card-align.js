(() => {
  "use strict";

  const applyForYouAlignment = () => {
    const section = document.querySelector("#for-you");
    if (!section) return false;

    const texts = [
      "英検に合格したいが、どこから始めればいいかわからない",
      "大学受験で英語・国語・社会を伸ばしたい",
      "塾に通っているが成績が伸びない",
      "不登校で学習が遅れているが、自宅で勉強したい",
      "発達障害があり、集団授業では理解しにくい",
      "定期テストの点数を上げて内申点を改善したい",
      "英語が全くできない状態から英検を取りたい",
      "難関大学・難関高校に逆転合格したい",
      "保護者として子どもの学習状況をしっかり把握したい",
    ];

    const copies = texts
      .map((text) =>
        [...section.querySelectorAll("p")].find((paragraph) => paragraph.textContent.trim() === text),
      )
      .filter(Boolean);

    if (!copies.length) return false;

    copies.forEach((copy) => {
      const card = copy.parentElement;
      if (!card) return;
      card.classList.add("ks-for-you-card");
      copy.classList.add("ks-for-you-card-copy");
      card.parentElement?.classList.add("ks-for-you-card-grid");
    });

    section.dataset.ksForYouCardAligned = "true";
    return true;
  };

  let retryTimer;
  const schedule = () => {
    window.clearTimeout(retryTimer);
    retryTimer = window.setTimeout(applyForYouAlignment, 80);
  };

  const boot = () => {
    applyForYouAlignment();
    window.setTimeout(applyForYouAlignment, 400);
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
