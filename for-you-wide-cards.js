(() => {
  "use strict";

  const CARD_CONTENT = [
    {
      source: "英検に合格したいが、どこから始めればいいかわからない",
      title: "どこから始めても、大丈夫です",
      body: "今の級と苦手を整理して、英検合格へ向けた最初の一歩を一緒に決めます。",
    },
    {
      source: "大学受験で英語・国語・社会を伸ばしたい",
      title: "文系受験を、得点源に変える",
      body: "英語・国語・社会の優先順位を、志望校合格から逆算して整えます。",
    },
    {
      source: "塾に通っているが成績が伸びない",
      title: "頑張りを、結果につなげる",
      body: "伸び悩みの原因を見極め、塾とも両立できる学び方へ立て直します。",
    },
    {
      source: "不登校で学習が遅れているが、自宅で勉強したい",
      title: "学校に行けない時期も、学びは止めない",
      body: "心の負担に配慮しながら、ご自宅で安心して続けられる形をつくります。",
    },
    {
      source: "発達障害があり、集団授業では理解しにくい",
      title: "あなたの理解のペースで進める",
      body: "説明・演習・復習を、お子様に合う順番と量へ柔軟に組み替えます。",
    },
    {
      source: "定期テストの点数を上げて内申点を改善したい",
      title: "内申点を、次の進路への自信に",
      body: "テスト・提出物・日々の学習を整理して、目標点へ着実に近づきます。",
    },
    {
      source: "英語が全くできない状態から英検を取りたい",
      title: "英語ゼロから、合格まで伴走する",
      body: "中学英語の土台から、できることを一つずつ積み上げていきます。",
    },
    {
      source: "難関大学・難関高校に逆転合格したい",
      title: "逆転合格を、具体的な戦略に変える",
      body: "現在地と残り時間から、今取り組むべき順番を明確にします。",
    },
    {
      source: "保護者として子どもの学習状況をしっかり把握したい",
      title: "保護者の不安にも、見通しをつくる",
      body: "学習の変化を共有し、ご家庭での声かけや進路の悩みも一緒に整理します。",
    },
  ];

  const createElement = (tagName, className, text) => {
    const element = document.createElement(tagName);
    element.className = className;
    element.textContent = text;
    return element;
  };

  const buildWideCard = (copy, item) => {
    const card = copy.parentElement;
    if (!card || card.dataset.ksForYouWideCard === "true") return false;

    const icon = createElement("span", "ks-for-you-wide-card-icon", card.firstElementChild?.textContent.trim() || "•");
    const content = document.createElement("div");
    content.className = "ks-for-you-wide-card-content";
    content.append(
      createElement("h3", "ks-for-you-wide-card-title", item.title),
      createElement("p", "ks-for-you-wide-card-body", item.body),
    );

    card.replaceChildren(icon, content);
    card.classList.add("ks-for-you-card", "ks-for-you-wide-card");
    card.dataset.ksForYouWideCard = "true";
    return true;
  };

  const applyForYouWideCards = () => {
    const section = document.querySelector("#for-you");
    if (!section) return false;

    let processed = 0;
    CARD_CONTENT.forEach((item) => {
      const copy = [...section.querySelectorAll("p")].find(
        (paragraph) => paragraph.textContent.trim() === item.source,
      );
      if (copy && buildWideCard(copy, item)) processed += 1;
    });

    if (processed || section.querySelectorAll(".ks-for-you-wide-card").length === CARD_CONTENT.length) {
      section.querySelector(".ks-for-you-wide-card")?.parentElement?.classList.add("ks-for-you-wide-card-list");
      return true;
    }
    return false;
  };

  let retryTimer;
  const schedule = () => {
    window.clearTimeout(retryTimer);
    retryTimer = window.setTimeout(applyForYouWideCards, 80);
  };

  const boot = () => {
    applyForYouWideCards();
    window.setTimeout(applyForYouWideCards, 400);
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
