(() => {
  "use strict";

  const findExactText = (root, text) =>
    [...root.querySelectorAll("*")]
      .filter((element) => element.textContent.trim() === text)
      .sort((first, second) => first.children.length - second.children.length)[0];

  const applyTeacherSpotlight = () => {
    const section = document.querySelector("#teacher");
    if (!section || section.dataset.ksTeacherSpotlight === "true") return Boolean(section);

    const portrait = [...section.querySelectorAll("img")].find((image) =>
      image.alt.includes("鈴木"),
    );
    if (!portrait) return false;

    const portraitFrame = portrait.parentElement;
    const portraitColumn = portraitFrame?.parentElement;
    const profileGrid = portraitColumn?.parentElement;
    const informationColumn = portraitColumn?.nextElementSibling;
    if (!portraitFrame || !portraitColumn || !profileGrid || !informationColumn) return false;

    portraitColumn.classList.add("ks-teacher-portrait-column");
    portraitFrame.classList.add("ks-teacher-portrait-frame");
    profileGrid.classList.add("ks-teacher-spotlight-grid");
    informationColumn.classList.add("ks-teacher-information-column");

    const name = [...informationColumn.querySelectorAll("h1, h2, h3, h4")].find((heading) =>
      heading.textContent.includes("鈴木 雄太"),
    );
    if (name) {
      name.classList.add("ks-teacher-name");
      name.parentElement?.classList.add("ks-teacher-name-row");
    }

    const role = findExactText(informationColumn, "プロ家庭教師 / 学習戦略プランナー");
    role?.classList.add("ks-teacher-role");

    const almaMater = findExactText(informationColumn, "明治大学 政治経済学部 卒業");
    almaMater?.classList.add("ks-teacher-alma-mater");
    almaMater?.parentElement?.classList.add("ks-teacher-alma-mater-wrap");

    const badge = [...portraitFrame.querySelectorAll("*")].find(
      (element) => element.children.length === 0 && element.textContent.includes("トッププロ認定"),
    );
    badge?.parentElement?.classList.add("ks-teacher-recognition-badge");

    const valueStrip = document.createElement("aside");
    valueStrip.className = "ks-teacher-value-strip";
    valueStrip.setAttribute("aria-label", "英検指導の専門性");
    valueStrip.innerHTML = `
      <p class="ks-teacher-value-strip-label">ONLINE EIKEN SUPPORT</p>
      <div class="ks-teacher-value-strip-items">
        <span><b>英検</b> 5級〜準1級</span>
        <span><b>4技能</b> 対応</span>
        <span><b>全国</b> オンライン指導</span>
      </div>
    `;
    portraitColumn.append(valueStrip);

    section.dataset.ksTeacherSpotlight = "true";
    return true;
  };

  let retryTimer;
  const scheduleApply = () => {
    window.clearTimeout(retryTimer);
    retryTimer = window.setTimeout(applyTeacherSpotlight, 80);
  };

  const boot = () => {
    applyTeacherSpotlight();
    window.setTimeout(applyTeacherSpotlight, 400);
    window.setTimeout(applyTeacherSpotlight, 1200);
    new MutationObserver(scheduleApply).observe(document.body, {
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
