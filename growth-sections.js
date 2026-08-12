/* Content-growth sections for the static production build. */
(() => {
  const STOACA_PROFILE_URL = "https://www.street-academy.com/steachers/685282";
  const STOACA_EIKEN_URL = "https://www.street-academy.com/myclass/155464";
  const BLOG_HOME_URL = "https://eiken-seminar.hatenablog.jp/";

  // Set an account URL here when each official channel is ready to publish.
  // Empty values intentionally render as "準備中" to avoid misleading visitors.
  const SOCIAL_CHANNELS = [
    { label: "LINE公式", key: "LINE", url: "", tone: "line" },
    { label: "X", key: "X", url: "", tone: "x" },
    { label: "Instagram", key: "IG", url: "", tone: "instagram" },
    { label: "YouTube", key: "YT", url: "", tone: "youtube" },
  ];

  const articleCards = [
    {
      category: "英検対策",
      title: "夏に差がつく。英検対策の始めどきは「今」",
      excerpt:
        "学校の授業が少ない時期を、長文読解・リスニング・面接準備にどう使うか。個別カリキュラムの考え方を解説します。",
      url: "https://eiken-seminar.hatenablog.jp/entry/2025/07/06/230943",
      date: "2025.07.06",
    },
    {
      category: "学習法",
      title: "英検の勉強は、何から始める？",
      excerpt:
        "目標級、現在地、試験日から逆算して、最初に整えるべき学習の順番を紹介します。",
      url: "https://eiken-seminar.hatenablog.jp/entry/2025/07/16/100000",
      date: "学習アドバイス",
    },
    {
      category: "受験・進路",
      title: "小学生が英検2級以上を目指すときに大切なこと",
      excerpt:
        "無理なく伸ばすための到達目標、土台づくり、家庭での関わり方を考えます。",
      url: "https://eiken-seminar.hatenablog.jp/entry/2025/06/23/202636",
      date: "受験・英検",
    },
  ];

  const section = (id, className, html) => {
    const element = document.createElement("section");
    element.id = id;
    element.className = className;
    element.innerHTML = html;
    return element;
  };

  const openExternal = (url) =>
    `href="${url}" target="_blank" rel="noopener noreferrer"`;

  const createReasons = () =>
    section(
      "reasons",
      "ks-growth-section ks-reasons",
      `
        <div class="ks-growth-container">
          <div class="ks-growth-heading ks-growth-heading--center">
            <p class="ks-eyebrow">WHY CHOOSE YUTA SUZUKI</p>
            <h2>私が選ばれる理由</h2>
            <p>お子様の現在地を受け止め、英検・受験・学校生活のその先まで見据えて、学びの伴走者であり続けます。</p>
          </div>
          <div class="ks-reasons-grid">
            <article class="ks-reason-card">
              <span class="ks-reason-number">01</span>
              <h3>トッププロ認定に<br>裏付けられた指導力</h3>
              <p>複数の家庭教師センターでプロ認定を受け、そのうち3社ではトッププロに認定されています。20年超の経験を、目の前のお子様に合う指導へ落とし込みます。</p>
            </article>
            <article class="ks-reason-card">
              <span class="ks-reason-number">02</span>
              <h3>悩みを分断しない<br>一人の担当講師</h3>
              <p>英検、受験、不登校、通信制高校、発達特性。状況が変わっても講師を替えず、学習の背景を理解した一人が継続して支援します。</p>
            </article>
            <article class="ks-reason-card">
              <span class="ks-reason-number">03</span>
              <h3>目標から逆算する<br>学習戦略</h3>
              <p>「今できないこと」だけでなく、検定・進学・将来の選択肢まで見通して、無理のない優先順位と具体的な学習計画を一緒に整えます。</p>
            </article>
            <article class="ks-reason-card">
              <span class="ks-reason-number">04</span>
              <h3>保護者様ともつくる<br>安心できる学習環境</h3>
              <p>授業だけで終わらせず、進捗や家庭学習のポイントを共有します。保護者様だけのご相談からでも、状況を丁寧に整理します。</p>
            </article>
          </div>
          <div class="ks-growth-cta-row">
            <a href="#contact" class="ks-growth-cta">お子様に合う進め方を相談する <span>→</span></a>
          </div>
        </div>
      `,
    );

  const createDirectContractValue = () =>
    section(
      "direct-contract",
      "ks-growth-section ks-direct-contract",
      `
        <div class="ks-growth-container">
          <div class="ks-direct-contract-layout">
            <div class="ks-direct-contract-lead">
              <p class="ks-eyebrow">DIRECT PARTNERSHIP</p>
              <h2>プロ家庭教師と<br>個人契約するメリット</h2>
              <p>ご相談から授業、振り返りまで。お子様の変化を一番近くで見ている講師本人が、責任を持って直接お応えします。</p>
              <p class="ks-direct-contract-note">最初は保護者様だけのご相談でも構いません。無理なご契約を前提とせず、相性と方針をご確認いただくことを大切にしています。</p>
            </div>
            <div class="ks-value-list" role="list">
              <article class="ks-value-item" role="listitem">
                <span class="ks-value-icon">01</span>
                <div><h3>相談から指導まで、情報が途切れない</h3><p>状況を何度も説明し直す必要がありません。学習の経緯を把握する担当講師が、必要な調整をすぐに行います。</p></div>
              </article>
              <article class="ks-value-item" role="listitem">
                <span class="ks-value-icon">02</span>
                <div><h3>一人ひとりに合わせて、柔軟に組み立てる</h3><p>学習量、教材、授業形式、カメラの有無、受験時期まで。お子様の状態に合わせた進め方を一緒に選びます。</p></div>
              </article>
              <article class="ks-value-item" role="listitem">
                <span class="ks-value-icon">03</span>
                <div><h3>費用を、指導そのものに集中できる</h3><p>入会金・仲介手数料・管理費はいただきません。必要な支援を、指導の時間と質に集中させます。</p></div>
              </article>
            </div>
          </div>
        </div>
      `,
    );

  const createStoaca = () =>
    section(
      "stoaca",
      "ks-growth-section ks-stoaca",
      `
        <div class="ks-growth-container">
          <div class="ks-stoaca-grid">
            <figure class="ks-stoaca-visual">
              <img src="/stoaca-eiken-course-thumbnail.png" alt="オンライン個別指導 英検対策 5級から準1級まで4技能完全対応のストアカ講座" loading="lazy">
            </figure>
            <div class="ks-stoaca-copy">
              <p class="ks-eyebrow">STOACA ONLINE LESSON</p>
              <h2>ストアカでも<br>英検対策講座を開講中</h2>
              <p>過去問を使った完全マンツーマン指導で、今の弱点に合わせた英検対策を行います。英検5級から準1級まで、読む・聞く・書く・話すの4技能に対応します。</p>
              <ul class="ks-check-list">
                <li>オンライン・完全1対1の個別レッスン</li>
                <li>過去問を使った弱点分析と具体的な学習プラン</li>
                <li>不登校・通信制高校・発達特性のあるお子様にも配慮</li>
              </ul>
              <div class="ks-stoaca-actions">
                <a ${openExternal(STOACA_EIKEN_URL)} class="ks-growth-cta">英検2級講座を見る <span>↗</span></a>
                <a ${openExternal(STOACA_PROFILE_URL)} class="ks-text-link">ストアカの講師プロフィール・全講座を見る <span>→</span></a>
              </div>
            </div>
          </div>
        </div>
      `,
    );

  const socialCards = SOCIAL_CHANNELS.map((channel) => {
    if (channel.url) {
      return `<a ${openExternal(channel.url)} class="ks-social-card ks-social-card--${channel.tone}"><span>${channel.key}</span><strong>${channel.label}</strong><small>公式アカウントへ</small></a>`;
    }
    return `<div class="ks-social-card ks-social-card--${channel.tone} is-coming-soon" aria-label="${channel.label}は準備中です"><span>${channel.key}</span><strong>${channel.label}</strong><small>準備中</small></div>`;
  }).join("");

  const articleMarkup = articleCards
    .map(
      (article) => `
        <article class="ks-article-card">
          <p class="ks-article-meta"><span>${article.category}</span>${article.date}</p>
          <h3>${article.title}</h3>
          <p>${article.excerpt}</p>
          <a ${openExternal(article.url)} class="ks-text-link">記事を読む <span>→</span></a>
        </article>
      `,
    )
    .join("");

  const createBlog = () =>
    section(
      "blog",
      "ks-growth-section ks-blog",
      `
        <div class="ks-growth-container">
          <div class="ks-growth-heading">
            <p class="ks-eyebrow">EDUCATION JOURNAL</p>
            <h2>英検・受験・学習法を<br>わかりやすく発信します</h2>
            <p>英検対策、受験勉強、学習習慣、参考書選びなど、保護者様と生徒様が「次に何をすればよいか」を整理できる教育コラムを定期的に発信します。</p>
          </div>
          <div class="ks-blog-layout">
            <div class="ks-article-grid">${articleMarkup}</div>
            <aside class="ks-social-hub">
              <p class="ks-social-hub-label">FOLLOW &amp; LEARN</p>
              <h3>新着の教育情報を<br>見逃さないために</h3>
              <p>ブログの更新を起点に、LINE・X・Instagram・YouTubeでも学習のヒントや講座情報をお届けする予定です。</p>
              <div class="ks-social-grid">${socialCards}</div>
              <a ${openExternal(BLOG_HOME_URL)} class="ks-growth-cta ks-growth-cta--outline">英検合格ゼミナールのブログへ <span>↗</span></a>
            </aside>
          </div>
          <div class="ks-content-topics" aria-label="今後発信するテーマ">
            <span>英検対策</span><span>受験戦略</span><span>不登校・通信制</span><span>学習法</span><span>参考書レビュー</span><span>保護者向け学習相談</span>
          </div>
        </div>
      `,
    );

  const insertAfter = (reference, element) => {
    if (reference?.parentNode)
      reference.parentNode.insertBefore(element, reference.nextSibling);
  };

  const addHeaderLinks = () => {
    const entries = [
      { href: "#reasons", label: "選ばれる理由" },
      { href: "#stoaca", label: "講座・SNS" },
      { href: "#blog", label: "教育コラム" },
    ];
    const faqLinks = document.querySelectorAll('nav a[href="#faq"]');
    faqLinks.forEach((faqLink) => {
      const parent = faqLink.parentElement;
      if (!parent || parent.querySelector(".ks-header-growth-link")) return;
      entries.forEach((entry) => {
        const link = document.createElement("a");
        link.href = entry.href;
        link.className = "ks-header-growth-link";
        link.textContent = entry.label;
        parent.insertBefore(link, faqLink);
      });
    });
  };

  const buildGrowthSections = () => {
    if (window.location.pathname !== "/" || document.getElementById("reasons"))
      return;
    const teacherVideo = document.getElementById("teacher-video");
    const results = document.getElementById("results");
    const howWeTeach = document.getElementById("how-we-teach");
    const why = document.getElementById("why");

    if (!teacherVideo || !results || !howWeTeach || !why) return;

    insertAfter(teacherVideo, createReasons());
    const reasons = document.getElementById("reasons");
    insertAfter(reasons, createDirectContractValue());
    insertAfter(results, createStoaca());
    insertAfter(howWeTeach, createBlog());
    addHeaderLinks();
  };

  const start = () => {
    buildGrowthSections();
    const root = document.getElementById("root");
    if (root) {
      const observer = new MutationObserver(() => buildGrowthSections());
      observer.observe(root, { childList: true, subtree: true });
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
