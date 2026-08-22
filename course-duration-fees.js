/* Official course-fee policy: 90 minutes = 60-minute fee × 1.5; 120 minutes = × 2. Learning consultation retains its dedicated 30/60-minute prices. */
(() => {
  const EXCLUDED_COURSES = new Set(["gakushuusoudan"]);

  const renderDurationPolicy = () => {
    const match = window.location.pathname.match(/^\/course\/([^/?#]+)/);
    if (!match || EXCLUDED_COURSES.has(decodeURIComponent(match[1]))) return;
    if (document.getElementById("ks-course-duration-policy")) return;

    const priceHeading = [...document.querySelectorAll("h2")].find(
      (heading) => heading.textContent?.trim() === "料金について",
    );
    if (!priceHeading) return;

    const policy = document.createElement("aside");
    policy.id = "ks-course-duration-policy";
    policy.className = "ks-course-duration-policy";
    policy.setAttribute("aria-label", "指導時間別の料金計算ルール");
    policy.innerHTML = `
      <p class="ks-course-duration-policy__eyebrow">LESSON DURATION POLICY</p>
      <h3>90分・120分をご希望の場合の料金</h3>
      <p>掲載の60分料金を基準に、<strong>90分は1.5倍、120分は2倍</strong>で計算します。月2・4・6・8回は、選んだ1回の時間料金に回数を掛け合わせます。</p>
      <div class="ks-course-duration-policy__formula" role="list" aria-label="時間別料金の計算式">
        <span role="listitem"><b>60分</b><em>掲載料金</em></span>
        <span role="listitem"><b>90分</b><em>60分料金 × 1.5</em></span>
        <span role="listitem"><b>120分</b><em>60分料金 × 2</em></span>
      </div>
      <p class="ks-course-duration-policy__note">短期・単発、体験授業、兄弟姉妹割引などは、各ページの条件に従ってご案内します。</p>
    `;

    const card = priceHeading.parentElement;
    if (card?.parentElement) card.parentElement.insertBefore(policy, card.nextElementSibling);
  };

  const init = () => {
    renderDurationPolicy();
    const root = document.getElementById("root");
    if (root) {
      new MutationObserver(renderDurationPolicy).observe(root, {
        childList: true,
        subtree: true,
      });
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
