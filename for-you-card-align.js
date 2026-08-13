(() => {
  "use strict";

  const CARD_CONTENT = [
    {
      source: "英検に合格したいが、どこから始めればいいかわからない",
      label: "英検対策",
      title: "英検合格への、最初の一歩をつくる",
      body: "今の級・学年・つまずきに合わせて、今日から始められる学習計画をご提案します。",
    },
    {
      source: "大学受験で英語・国語・社会を伸ばしたい",
      label: "大学受験",
      title: "文系受験を、得点源に変える",
      body: "英語・国語・社会を横断して整理し、志望校合格から逆算した学び方を組み立てます。",
    },
    {
      source: "塾に通っているが成績が伸びない",
      label: "学習の立て直し",
      title: "頑張りが、結果につながる学び方へ",
      body: "分からないまま進む原因を見極め、塾と両立できる無理のない学習サイクルへ整えます。",
    },
    {
      source: "不登校で学習が遅れているが、自宅で勉強したい",
      label: "不登校支援",
      title: "学校に行けない今も、学びを止めない",
      body: "気持ちの負担に配慮しながら、自宅から一歩ずつ学習のリズムと進路の選択肢を取り戻します。",
    },
    {
      source: "発達障害があり、集団授業では理解しにくい",
      label: "発達特性サポート",
      title: "「分からない」を、あなたのペースで解く",
      body: "理解の仕方や集中の波に合わせて、説明・演習・復習の順番まで柔軟に組み替えます。",
    },
    {
      source: "定期テストの点数を上げて内申点を改善したい",
      label: "定期テスト・内申",
      title: "内申点を、次の進路への自信に変える",
      body: "テスト範囲の優先順位から提出物まで整理し、目標点に届くための毎週の行動を明確にします。",
    },
    {
      source: "英語が全くできない状態から英検を取りたい",
      label: "英語のやり直し",
      title: "英語ゼロからでも、合格へ進める",
      body: "中学英語の土台から丁寧に戻り、できることを積み上げながら英検合格を目指します。",
    },
    {
      source: "難関大学・難関高校に逆転合格したい",
      label: "逆転合格",
      title: "逆転合格を、現実的な戦略に変える",
      body: "現在地と残り時間を冷静に分析し、志望校に必要な得点へ最短距離で近づく計画を立てます。",
    },
    {
      source: "保護者として子どもの学習状況をしっかり把握したい",
      label: "保護者サポート",
      title: "保護者の不安にも、見通しをつくる",
      body: "お子様の変化と学習の進み方を共有し、ご家庭での声かけや進路の悩みも一緒に整理します。",
    },
  ];

  const createElement = (tagName, className, text) => {
    const element = document.createElement(tagName);
    element.className = className;
    element.textContent = text;
    return element;
  };

  const buildPremiumCard = (copy, item, index) => {
    const card = copy.parentElement;
    if (!card || card.dataset.ksForYouPremium === "true") return false;

    const number = createElement("span", "ks-for-you-card-index", String(index + 1).padStart(2, "0"));
    const content = document.createElement("div");
    content.className = "ks-for-you-card-content";
    content.append(
      createElement("p", "ks-for-you-card-label", item.label),
      createElement("h3", "ks-for-you-card-title", item.title),
      createElement("p", "ks-for-you-card-body", item.body),
    );

    card.replaceChildren(number, content);
    card.classList.add("ks-for-you-card", "ks-for-you-premium-card");
    card.dataset.ksForYouPremium = "true";
    return true;
  };

  const applyForYouCards = () => {
    const section = document.querySelector("#for-you");
    if (!section) return false;

    let processed = 0;
    CARD_CONTENT.forEach((item, index) => {
      const copy = [...section.querySelectorAll("p")].find(
        (paragraph) => paragraph.textContent.trim() === item.source,
      );
      if (copy && buildPremiumCard(copy, item, index)) processed += 1;
    });

    if (processed || section.querySelectorAll(".ks-for-you-premium-card").length === CARD_CONTENT.length) {
      section.querySelector(".ks-for-you-card")?.parentElement?.classList.add("ks-for-you-card-grid");
      section.dataset.ksForYouPremiumReady = "true";
      return true;
    }
    return false;
  };

  let retryTimer;
  const schedule = () => {
    window.clearTimeout(retryTimer);
    retryTimer = window.setTimeout(applyForYouCards, 80);
  };

  const boot = () => {
    applyForYouCards();
    window.setTimeout(applyForYouCards, 400);
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
