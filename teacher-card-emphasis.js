(() => {
  "use strict";

  const findLeaf = (root, text) =>
    [...root.querySelectorAll("*")]
      .filter((element) => element.children.length === 0 && element.textContent.trim().includes(text))
      .sort((first, second) => first.textContent.length - second.textContent.length)[0];

  const findAncestor = (element, predicate) => {
    let current = element;
    while (current && current.id !== "teacher") {
      if (predicate(current)) return current;
      current = current.parentElement;
    }
    return null;
  };

  const hasClasses = (element, classes) =>
    element instanceof HTMLElement && classes.every((className) => element.classList.contains(className));

  const applyTeacherCardEmphasis = () => {
    const section = document.querySelector("#teacher");
    if (!section) return false;

    [
      "千葉県我孫子市在住。39歳。フリーランスとして精力的に活動中。",
      "不登校・中下位層の英検サポートも得意",
      "家庭教師の役割は『伴走者・戦略家』",
      "参考書の徹底したリサーチ",
    ].forEach((text) => {
      const leaf = findLeaf(section, text);
      const card = findAncestor(leaf, (element) => hasClasses(element, ["flex", "items-start", "gap-3", "rounded-xl"]));
      card?.classList.add("ks-teacher-profile-detail-card");
    });

    const manalinkLeaf = findLeaf(section, "第三者プラットフォームでの実績を確認");
    const manalinkCard = findAncestor(manalinkLeaf, (element) =>
      hasClasses(element, ["mt-8", "rounded-2xl", "fade-in-up"]),
    );
    if (manalinkCard) {
      manalinkCard.classList.add("ks-teacher-manalink-card");
      manalinkCard.querySelector("a")?.classList.add("ks-teacher-manalink-cta");
    }

    const actionLeaf = findLeaf(section, "今の状況を少しでも変えたい方を、全力でサポートします。");
    const actionCard = findAncestor(actionLeaf, (element) =>
      hasClasses(element, ["mt-6", "rounded-2xl", "fade-in-up"]),
    );
    actionCard?.classList.add("ks-teacher-action-card");

    section.dataset.ksTeacherCardEmphasis = "true";
    return true;
  };

  let retryTimer;
  const schedule = () => {
    window.clearTimeout(retryTimer);
    retryTimer = window.setTimeout(applyTeacherCardEmphasis, 80);
  };

  const boot = () => {
    applyTeacherCardEmphasis();
    window.setTimeout(applyTeacherCardEmphasis, 450);
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
