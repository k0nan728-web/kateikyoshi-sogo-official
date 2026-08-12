(() => {
  const LEGACY_BLOG_URL = "https://eiken-seminar.hatenablog.jp/";
  const CONTACT_URL = "https://kateikyoshi-sogo.com/#contact";

  // 公式アカウントを公開する際は、該当する url に公式URLを設定してください。
  // 空のアカウントはサイト上に表示されません。
  const SOCIAL_PROFILES = [
    { name: "LINE公式", label: "LINE", url: "", tone: "line" },
    { name: "X", label: "X", url: "", tone: "x" },
    { name: "Instagram", label: "IG", url: "", tone: "instagram" },
    { name: "YouTube", label: "YT", url: "", tone: "youtube" },
  ];

  const ARTICLES = [
    {
      slug: "eiken-study-roadmap",
      category: "英検対策",
      date: "2026-08-12",
      displayDate: "2026.08.12",
      readingTime: "4分で読めます",
      title:
        "英検の勉強は、何から始める？ 目標級と試験日から逆算する4つのステップ",
      summary:
        "単語帳から始める前に、目標級・現在地・試験日・4技能の優先順位を整理する。英検学習を遠回りにしないための考え方を解説します。",
      tags: ["英検", "4技能", "学習計画"],
      intro:
        "英検の勉強は、教材を増やすほど前に進むとは限りません。まず必要なのは、今の力と目標級の間にある差を、試験日までの時間に合わせて見える形にすることです。ここでは、初めて受験する方にも、もう一度挑戦する方にも共通する学習設計の順番を紹介します。",
      sections: [
        {
          heading: "1. 目標級だけでなく「受験する理由」を言葉にする",
          body: [
            "英検は、入試での活用、英語への自信づくり、学校の学習の確認など、受験する理由によって必要な準備が変わります。まずは「いつまでに、何のために合格したいか」を言葉にしてみましょう。理由が明確になると、受験日、目標スコア、優先する技能を決めやすくなります。",
            "例えば大学入試での利用を考える場合は、出願時期から逆算して受験機会を確保する必要があります。一方で、英語への苦手意識を減らすことが目的なら、無理に上の級へ急ぐより、成功体験につながる級と学習量を選ぶことも大切です。",
          ],
        },
        {
          heading: "2. 4技能を同じ比重で始めない",
          body: [
            "読む・聞く・書く・話すの4技能はすべて大切ですが、最初の課題は一人ひとり異なります。語彙や文法の土台が不足している場合、長文や英作文だけを繰り返しても負担が大きくなります。逆に、筆記ができても面接形式に慣れていない場合は、短い受け答えを早めに練習へ入れるほうが安心です。",
          ],
          points: [
            "語彙・文法：問題演習の前に、理解できていない単元を確認する",
            "リスニング：毎日短時間でも英語の音に触れる時間を固定する",
            "ライティング：型を覚え、添削を受けながら自分の表現にしていく",
            "スピーキング：本番直前だけでなく、短い音読・応答から慣れる",
          ],
        },
        {
          heading: "3. 試験日までを「週単位」で分ける",
          body: [
            "大きな目標を毎日眺めるだけでは、何をすべきかが曖昧になりがちです。試験日までの期間を、基礎を整える時期、形式に慣れる時期、過去問で弱点を確認する時期に分けてみましょう。週ごとに到達目標を置くと、学習が遅れたときも調整しやすくなります。",
            "模擬問題の点数だけで判断せず、「どの問題で迷ったか」「時間が足りなかった理由は何か」まで振り返ることが、次の1週間の学習内容を決める材料になります。",
          ],
        },
        {
          heading: "4. 困った時は、教材を増やす前に計画を見直す",
          body: [
            "勉強が進まないときは、新しい参考書を追加したくなるものです。しかし、原因が時間の使い方や土台の不足にあるなら、教材を増やしても負担が増えるだけです。今の教材で何ができ、どこで止まっているかを確認し、学習量・順番・期限を調整することから始めましょう。",
          ],
        },
      ],
      closing:
        "目標級や現在地によって、最適な順番は変わります。英検と学校の勉強、受験準備をどう両立するか迷う場合は、まず現在の状況を整理することからご相談いただけます。",
    },
    {
      slug: "humanities-exam-priority",
      category: "受験戦略",
      date: "2026-08-05",
      displayDate: "2026.08.05",
      readingTime: "5分で読めます",
      title:
        "文系受験、何から立て直す？ 英語・国語・社会の優先順位を決める考え方",
      summary:
        "英語・国語・社会を同時に伸ばそうとして苦しくなっている受験生へ。得点源、苦手分野、志望校の配点をもとに、学習の優先順位を決めるための視点を整理します。",
      tags: ["大学受験", "英語", "学習戦略"],
      intro:
        "文系受験では複数科目を同時に進める必要があるため、頑張っているのに成果が見えない時期が生まれやすくなります。大切なのは、3科目を均等にこなすことではなく、志望校合格に近づく順番で、限られた時間を配分することです。",
      sections: [
        {
          heading: "1. 志望校の配点と出題形式を最初に確認する",
          body: [
            "受験勉強は、一般的に得意と言われる科目から始めるとは限りません。志望校の配点、問題形式、必要な得点率を確認すると、優先すべき科目が変わることがあります。英語の配点が高い大学なら、語彙・文法・長文・英作文をどう積み上げるかが、他科目の計画にも影響します。",
            "志望校がまだ決まっていない場合も、候補をいくつか置き、必要科目と難度を比べるだけで、学習の方向性が見えやすくなります。",
          ],
        },
        {
          heading: "2. 「伸ばしやすい課題」と「時間がかかる課題」を分ける",
          body: [
            "暗記で補いやすい分野、演習の量で安定しやすい分野、基礎から時間をかける必要がある分野は同じではありません。今の模試や定期テストを見返し、単に点数が低い科目ではなく、原因を単元ごとに分けることが大切です。",
          ],
          points: [
            "英語：単語・文法の土台、長文の読み方、英作文のどこで失点しているか",
            "国語：現代文の根拠の取り方、古文単語・文法、漢文句法のどこが課題か",
            "社会：用語の暗記不足か、時代・テーマのつながりか、問題演習の不足か",
          ],
        },
        {
          heading: "3. 1週間の中に「積み上げ」と「確認」を両方入れる",
          body: [
            "毎日新しい内容だけを進めると、学んだことが定着しません。反対に、復習だけでは受験範囲が終わりません。1週間の計画に、基礎の積み上げ、問題演習、間違い直しの時間をそれぞれ入れ、週末に実行できたかを確認する形が現実的です。",
            "特に英語は、語彙や文法を毎日短時間で続けながら、週に数回は長文や英作文へ取り組むと、4技能・入試形式の両方に対応しやすくなります。",
          ],
        },
        {
          heading: "4. 計画は「守れなかった日」を前提にしておく",
          body: [
            "学校行事、体調、部活動などで、計画どおりに進まない週は必ずあります。そこで計画自体を諦めるのではなく、優先順位の低い課題を後ろへ移し、核になる学習を守る方法を考えます。受験直前ほど、この調整力が大きな差になります。",
          ],
        },
      ],
      closing:
        "志望校・現在地・使える時間によって、優先順位は変わります。英検取得と大学受験を同時に進める場合も、科目の役割を整理すれば、無理のない計画を作れます。",
    },
    {
      slug: "restart-study-at-home",
      category: "不登校・通信制",
      date: "2026-07-28",
      displayDate: "2026.07.28",
      readingTime: "4分で読めます",
      title:
        "学校に通いづらい時期、学習をどう再開する？ 小さな一歩から整える方法",
      summary:
        "学校に通えていない時期の学習は、量よりも安心して続けられる形が重要です。保護者とお子様が無理なく始めるための、目標設定と環境づくりを紹介します。",
      tags: ["不登校", "通信制高校", "保護者向け"],
      intro:
        "学校に通いづらい時期は、学習の遅れだけでなく、生活リズムや自己肯定感、周囲との比較など、さまざまな不安が重なります。学習再開の目的は、すぐに遅れを取り戻すことだけではありません。安心して「できた」を積み重ね、次の選択肢へ進む土台を作ることです。",
      sections: [
        {
          heading: "1. 最初の目標は「続けられる量」にする",
          body: [
            "始めるときから長時間の学習を目標にすると、負担が大きくなり、続かなかった経験が残りやすくなります。最初は10分、1問、短い会話など、本人が取り組みやすい量から始めます。できたら少しずつ増やすという順番が、長く続けるための土台になります。",
          ],
        },
        {
          heading: "2. 学力より先に、取り組める環境を整える",
          body: [
            "机に向かうことが難しい場合は、教材の難度だけではなく、時間帯、声かけ、画面越しのやり取りなども見直します。カメラをオフにする、チャットから始める、好きなテーマを英語や国語の教材へつなげるなど、安心できる入口を選ぶことができます。",
            "保護者の方も、毎日結果を確認するより、「今日は何ができたか」を一緒に振り返る関わり方を試すと、学習が評価だけの時間になりにくくなります。",
          ],
        },
        {
          heading: "3. 学習と進路を切り離さず、急ぎすぎない",
          body: [
            "通信制高校、高卒認定、英検、大学受験など、将来の選択肢は一つではありません。だからこそ、今の状況を否定せず、どの時期にどの選択肢を準備するかを考えます。英検は、英語の力を確認しながら小さな達成感を作れる選択肢の一つにもなります。",
          ],
        },
        {
          heading: "4. 相談する相手を一人に絞らない",
          body: [
            "本人・保護者・学校・支援機関・講師が、それぞれ違う情報を持っています。すべてを一度に解決しようとせず、学習面の相談、進路の相談、生活面の相談を必要に応じて分けながら、情報をつなげていくことが大切です。",
          ],
        },
      ],
      closing:
        "今の状態に合わせて、学び方も目標も調整できます。保護者様だけで状況を整理するご相談からでも、お気軽にお問い合わせください。",
    },
  ];

  const root = document.getElementById("content-hub-root");
  const activeArticle = new URLSearchParams(window.location.search).get(
    "article",
  );

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  const localUrl = (slug) =>
    `${window.location.origin}/blog/?article=${encodeURIComponent(slug)}`;

  const external = (url) =>
    `href="${url}" target="_blank" rel="noopener noreferrer"`;

  const setMeta = (selector, content) => {
    const element = document.querySelector(selector);
    if (element) element.setAttribute("content", content);
  };

  const updatePageMeta = (article) => {
    const url = article
      ? localUrl(article.slug)
      : `${window.location.origin}/blog/`;
    const title = article
      ? `${article.title}｜プロ家庭教師 鈴木雄太の教育コラム`
      : "教育コラム｜英検・受験・学習法をわかりやすく解説｜プロ家庭教師 鈴木雄太";
    const description = article
      ? article.summary
      : "英検対策、文系受験、学習法、不登校・通信制での学び直しを、プロ家庭教師 鈴木雄太がわかりやすく解説する教育コラムです。";
    document.title = title;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
  };

  const profileLinks = () => {
    const enabled = SOCIAL_PROFILES.filter((profile) => profile.url);
    if (!enabled.length) {
      return `<p class="hub-profile-empty">公式SNSは準備中です。記事の共有ボタンはすぐにご利用いただけます。</p>`;
    }
    return `<div class="hub-profile-links">${enabled
      .map(
        (profile) =>
          `<a ${external(profile.url)} class="hub-profile-link hub-profile-link--${profile.tone}"><span>${escapeHtml(profile.label)}</span>${escapeHtml(profile.name)}へ</a>`,
      )
      .join("")}</div>`;
  };

  const articleCard = (article, featured = false) => `
    <article class="hub-card${featured ? " hub-card--featured" : ""}">
      <div class="hub-card-meta"><span>${escapeHtml(article.category)}</span><time datetime="${article.date}">${escapeHtml(article.displayDate)}</time><small>${escapeHtml(article.readingTime)}</small></div>
      <h2><a href="?article=${encodeURIComponent(article.slug)}">${escapeHtml(article.title)}</a></h2>
      <p>${escapeHtml(article.summary)}</p>
      <div class="hub-tags">${article.tags.map((tag) => `<span>#${escapeHtml(tag)}</span>`).join("")}</div>
      <a class="hub-card-link" href="?article=${encodeURIComponent(article.slug)}">記事を読む <span>→</span></a>
    </article>`;

  const renderIndex = () => {
    updatePageMeta(null);
    const categories = [
      "すべて",
      ...new Set(ARTICLES.map((article) => article.category)),
    ];
    root.innerHTML = `
      <header class="hub-header">
        <div class="hub-header-inner">
          <a class="hub-brand" href="../" aria-label="プロ家庭教師 鈴木雄太 公式サイト トップへ戻る"><span>プロ家庭教師</span>鈴木雄太のオンライン指導</a>
          <nav aria-label="教育コラムのナビゲーション"><a href="../">公式サイトへ</a><a href="#articles">記事一覧</a><a href="${LEGACY_BLOG_URL}" target="_blank" rel="noopener noreferrer">旧ブログ ↗</a></nav>
        </div>
      </header>
      <main>
        <section class="hub-hero">
          <div class="hub-shell">
            <p class="hub-kicker">EDUCATION JOURNAL</p>
            <h1>英検・受験・学習法を、<br>次の一歩につながる言葉で。</h1>
            <p>英検対策、文系受験、学習習慣、不登校・通信制での学び直し。お子様と保護者様が「今、何をすればよいか」を整理できる教育コラムです。</p>
            <div class="hub-hero-actions"><a href="#articles" class="hub-button">新着記事を読む <span>↓</span></a><a ${external(LEGACY_BLOG_URL)} class="hub-button hub-button--outline">旧ブログを見る <span>↗</span></a></div>
          </div>
        </section>
        <section class="hub-featured"><div class="hub-shell"><p class="hub-section-label">LATEST ARTICLE</p><div class="hub-featured-grid"><div><h2>最初に読んでほしい記事</h2><p>教材や勉強時間を増やす前に、目標と現在地を整理することから始めましょう。</p></div>${articleCard(ARTICLES[0], true)}</div></div></section>
        <section id="articles" class="hub-articles"><div class="hub-shell"><div class="hub-section-heading"><div><p class="hub-section-label">ALL ARTICLES</p><h2>教育コラム一覧</h2></div><label class="hub-search"><span class="sr-only">記事を検索</span><input id="article-search" type="search" placeholder="キーワードで探す" autocomplete="off"></label></div><div class="hub-filter" role="tablist" aria-label="記事カテゴリー">${categories.map((category, index) => `<button class="hub-filter-button${index === 0 ? " is-active" : ""}" type="button" data-category="${escapeHtml(category)}" role="tab" aria-selected="${index === 0}">${escapeHtml(category)}</button>`).join("")}</div><div id="article-list" class="hub-card-grid">${ARTICLES.map((article) => articleCard(article)).join("")}</div><p id="article-empty" class="hub-empty" hidden>条件に合う記事は見つかりませんでした。別のキーワードでお試しください。</p></div></section>
        <section class="hub-social"><div class="hub-shell hub-social-grid"><div><p class="hub-section-label">SHARE & FOLLOW</p><h2>役立った記事は、<br>必要な方へ共有してください。</h2><p>個別記事では、X・LINEへの共有とURLコピーができます。公式SNSの新着情報も、準備でき次第ここからご案内します。</p></div><div class="hub-social-panel"><h3>公式SNS</h3>${profileLinks()}<a href="${CONTACT_URL}" class="hub-text-link">英検・受験のご相談はこちら <span>→</span></a></div></div></section>
      </main>
      <footer class="hub-footer"><div class="hub-shell"><a class="hub-brand" href="../"><span>プロ家庭教師</span>鈴木雄太のオンライン指導</a><p>英検・受験・不登校・通信制高校まで、全国オンラインで対応しています。</p><a href="${CONTACT_URL}">無料相談・お問い合わせ</a></div></footer>`;

    let category = "すべて";
    const list = document.getElementById("article-list");
    const empty = document.getElementById("article-empty");
    const search = document.getElementById("article-search");
    const renderCards = () => {
      const keyword = search.value.trim().toLowerCase();
      const filtered = ARTICLES.filter((article) => {
        const categoryMatch =
          category === "すべて" || article.category === category;
        const corpus = [
          article.title,
          article.summary,
          article.category,
          ...article.tags,
        ]
          .join(" ")
          .toLowerCase();
        return categoryMatch && (!keyword || corpus.includes(keyword));
      });
      list.innerHTML = filtered.map((article) => articleCard(article)).join("");
      empty.hidden = Boolean(filtered.length);
    };
    document.querySelectorAll(".hub-filter-button").forEach((button) => {
      button.addEventListener("click", () => {
        category = button.dataset.category;
        document.querySelectorAll(".hub-filter-button").forEach((item) => {
          const active = item === button;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-selected", String(active));
        });
        renderCards();
      });
    });
    search.addEventListener("input", renderCards);
  };

  const shareMarkup = (article) => {
    const url = encodeURIComponent(localUrl(article.slug));
    const text = encodeURIComponent(`${article.title}｜プロ家庭教師 鈴木雄太`);
    return `<div class="hub-share" aria-label="この記事を共有"><p>この記事を共有する</p><div><button type="button" class="hub-share-button hub-share-button--native" data-share="native">共有</button><a class="hub-share-button hub-share-button--x" ${external(`https://twitter.com/intent/tweet?text=${text}&url=${url}`)}>X</a><a class="hub-share-button hub-share-button--line" ${external(`https://social-plugins.line.me/lineit/share?url=${url}`)}>LINE</a><button type="button" class="hub-share-button hub-share-button--copy" data-share="copy">URLをコピー</button></div><span class="hub-share-message" aria-live="polite"></span></div>`;
  };

  const articleSection = (section) => `
    <section class="hub-article-section">
      <h2>${escapeHtml(section.heading)}</h2>
      ${section.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
      ${section.points ? `<ul>${section.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ul>` : ""}
    </section>`;

  const renderArticle = (article) => {
    updatePageMeta(article);
    const related = ARTICLES.filter((item) => item.slug !== article.slug).slice(
      0,
      2,
    );
    root.innerHTML = `
      <header class="hub-header"><div class="hub-header-inner"><a class="hub-brand" href="../"><span>プロ家庭教師</span>鈴木雄太のオンライン指導</a><nav aria-label="教育コラムのナビゲーション"><a href="./">記事一覧</a><a href="../">公式サイトへ</a></nav></div></header>
      <main><article class="hub-article"><div class="hub-shell hub-article-shell"><a href="./" class="hub-back-link">← 教育コラム一覧へ戻る</a><header class="hub-article-header"><p class="hub-card-meta"><span>${escapeHtml(article.category)}</span><time datetime="${article.date}">${escapeHtml(article.displayDate)}</time><small>${escapeHtml(article.readingTime)}</small></p><h1>${escapeHtml(article.title)}</h1><p>${escapeHtml(article.summary)}</p><div class="hub-tags">${article.tags.map((tag) => `<span>#${escapeHtml(tag)}</span>`).join("")}</div></header><div class="hub-article-body"><p class="hub-article-lead">${escapeHtml(article.intro)}</p>${article.sections.map(articleSection).join("")}<div class="hub-article-closing"><p>${escapeHtml(article.closing)}</p><a href="${CONTACT_URL}" class="hub-button">無料相談で状況を整理する <span>→</span></a></div></div>${shareMarkup(article)}</div></article><section class="hub-related"><div class="hub-shell"><p class="hub-section-label">RELATED ARTICLES</p><h2>あわせて読みたい記事</h2><div class="hub-card-grid">${related.map((item) => articleCard(item)).join("")}</div></div></section></main><footer class="hub-footer"><div class="hub-shell"><a class="hub-brand" href="../"><span>プロ家庭教師</span>鈴木雄太のオンライン指導</a><p>英検・受験・不登校・通信制高校まで、全国オンラインで対応しています。</p><a href="${CONTACT_URL}">無料相談・お問い合わせ</a></div></footer>`;
    root.querySelectorAll("[data-share]").forEach((button) => {
      button.addEventListener("click", async () => {
        const message = root.querySelector(".hub-share-message");
        if (button.dataset.share === "copy") {
          try {
            await navigator.clipboard.writeText(localUrl(article.slug));
            message.textContent = "記事のURLをコピーしました。";
          } catch (_) {
            message.textContent =
              "URLのコピーに失敗しました。ブラウザのアドレス欄からコピーしてください。";
          }
          return;
        }
        if (navigator.share) {
          try {
            await navigator.share({
              title: article.title,
              text: article.summary,
              url: localUrl(article.slug),
            });
            message.textContent = "共有画面を開きました。";
          } catch (_) {}
        } else {
          try {
            await navigator.clipboard.writeText(localUrl(article.slug));
            message.textContent =
              "共有機能に対応していないため、URLをコピーしました。";
          } catch (_) {
            message.textContent =
              "X・LINEの共有ボタン、またはアドレス欄をご利用ください。";
          }
        }
      });
    });
  };

  const article = ARTICLES.find((item) => item.slug === activeArticle);
  if (activeArticle && !article) {
    window.history.replaceState({}, "", "/blog/");
  }
  article ? renderArticle(article) : renderIndex();
})();
