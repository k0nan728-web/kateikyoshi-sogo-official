/* Content-growth sections for the static production build. */
(() => {
  const STREET_ACADEMY_PROFILE_URL =
    "https://www.street-academy.com/steachers/685282";
  const STREET_ACADEMY_EIKEN_COURSES = [
    {
      grade: "英検準2級",
      url: "https://www.street-academy.com/myclass/165687",
    },
    {
      grade: "英検準2級プラス",
      url: "https://www.street-academy.com/myclass/220176",
    },
    {
      grade: "英検2級",
      url: "https://www.street-academy.com/myclass/155464",
    },
    {
      grade: "英検準1級",
      url: "https://www.street-academy.com/myclass/197538",
    },
  ];
  const BLOG_HOME_URL = "/blog/";
  const LEGACY_BLOG_URL = "https://eiken-seminar.hatenablog.jp/";

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
      title: "英検の勉強は、何から始める？ 逆算する4つのステップ",
      excerpt:
        "目標級・現在地・試験日・4技能の優先順位を整理し、英検学習を遠回りにしないための考え方を解説します。",
      url: "/blog/?article=eiken-study-roadmap",
      date: "2026.08.12",
    },
    {
      category: "学習法",
      title: "文系受験、何から立て直す？ 科目の優先順位を決める考え方",
      excerpt:
        "英語・国語・社会を同時に伸ばすために、志望校の配点と現在地から学習の順番を整理します。",
      url: "/blog/?article=humanities-exam-priority",
      date: "2026.08.05",
    },
    {
      category: "不登校・通信制",
      title: "学校に通いづらい時期、学習をどう再開する？",
      excerpt:
        "量よりも安心して続けられる形を大切にする、学習再開と保護者の関わり方を紹介します。",
      url: "/blog/?article=restart-study-at-home",
      date: "2026.07.28",
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

  const contentLink = (url) =>
    url.startsWith("/") ? `href="${url}"` : openExternal(url);

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
          <div class="ks-direct-contract-lead ks-direct-contract-lead--center">
            <p class="ks-eyebrow">DIRECT PARTNERSHIP</p>
            <h2>プロ家庭教師と<br>個人契約するメリット</h2>
            <p>ご相談から授業、振り返りまで。お子様の変化を一番近くで見ている講師本人が、責任を持って直接お応えします。</p>
            <p class="ks-direct-contract-note">最初は保護者様だけのご相談でも構いません。無理なご契約を前提とせず、相性と方針をご確認いただくことを大切にしています。</p>
          </div>
          <div class="ks-value-list ks-value-list--three" role="list">
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
      `,
    );

  const createTutorComparison = () =>
    section(
      "tutor-comparison",
      "ks-growth-section ks-tutor-comparison",
      `
        <div class="ks-growth-container">
          <div class="ks-growth-heading ks-growth-heading--center">
            <p class="ks-eyebrow">HOW TO CHOOSE A TUTOR</p>
            <h2>家庭教師選びで、<br>本当に比べるべきこと</h2>
            <p>どの選択肢にも良さがあります。だからこそ、英検・文系受験で大切な「専門性」「長期の戦略」「担当の継続性」「保護者との連携」を軸に、納得できる選び方を考えます。</p>
          </div>

          <div class="ks-comparison-intro">
            <div class="ks-comparison-intro-badge">英検・文系受験<br>を重視するご家庭へ</div>
            <p><strong>検定対策と受験対策を別々にせず、今の学習状況から志望校まで一人の担当と組み立てたい。</strong>そのようなご家庭には、鈴木雄太の直接指導が特に適しています。</p>
          </div>

          <div class="ks-comparison-scroll" role="region" aria-label="家庭教師の選択肢比較表" tabindex="0">
            <table class="ks-comparison-table">
              <thead>
                <tr>
                  <th scope="col">比べるポイント</th>
                  <th scope="col">学生アルバイト講師</th>
                  <th scope="col">一般の社会人講師</th>
                  <th scope="col">家庭教師センター経由の<br>プロ家庭教師</th>
                  <th scope="col" class="is-recommended">鈴木雄太の<br>直接指導</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">向いているご家庭</th>
                  <td>年齢の近い先輩として、日々の学習習慣や質問対応を重視したい</td>
                  <td>特定教科の補習や、生活に合わせた継続指導を相談したい</td>
                  <td>窓口で条件を伝え、複数候補から講師を紹介してほしい</td>
                  <td class="is-recommended"><strong>英検・文系受験を軸に、学習・進路・ご家庭の不安を一体で相談したい</strong></td>
                </tr>
                <tr>
                  <th scope="row">英検・文系受験の専門性</th>
                  <td>講師の経験・得意分野によって異なる</td>
                  <td>経験・専門領域に幅がある</td>
                  <td>紹介される講師の専門領域を事前確認</td>
                  <td class="is-recommended"><strong>英検5級〜準1級、英語・国語・社会の受験対策を横断して相談可能</strong></td>
                </tr>
                <tr>
                  <th scope="row">長期の受験戦略</th>
                  <td>個別の講師により異なる</td>
                  <td>個別の講師により異なる</td>
                  <td>担当講師とセンターの連携方法を確認</td>
                  <td class="is-recommended"><strong>検定・志望校・現在地から逆算して、優先順位を設計</strong></td>
                </tr>
                <tr>
                  <th scope="row">担当の継続性・保護者連携</th>
                  <td>学業や予定により変動する場合がある</td>
                  <td>講師ごとの運用による</td>
                  <td>センターの窓口を介することがある</td>
                  <td class="is-recommended"><strong>相談・授業・振り返りを講師本人が直接担当</strong></td>
                </tr>
                <tr>
                  <th scope="row">費用構造</th>
                  <td>比較的抑えやすい一方、条件は個別に確認</td>
                  <td>経験・地域・形式により異なる</td>
                  <td>紹介・管理などの費用体系はセンターごとに異なる</td>
                  <td class="is-recommended"><strong>入会金・仲介手数料・管理費なし。費用を指導に集中</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="ks-comparison-disclaimer">※ 一般的な比較です。講師・家庭教師センターごとに経験、契約条件、費用体系は異なります。ご家庭の目的に合わせてご確認ください。</p>

          <div class="ks-decision-flow" aria-label="鈴木雄太の直接指導が適しているかを判断する図">
            <p class="ks-decision-flow-label">CHECK POINT</p>
            <h3>このようなご家庭には、<br>鈴木の直接指導が適しています</h3>
            <div class="ks-decision-steps">
              <article><span>01</span><p><strong>英検の級・4技能</strong>と受験を、別々にせず一人へ相談したい</p></article>
              <span class="ks-decision-arrow">→</span>
              <article><span>02</span><p><strong>英語・国語・社会</strong>を含む文系受験の優先順位を整理したい</p></article>
              <span class="ks-decision-arrow">→</span>
              <article><span>03</span><p>不登校・通信制など、<strong>状況の変化も踏まえて</strong>長く伴走してほしい</p></article>
              <span class="ks-decision-arrow">→</span>
              <article class="is-destination"><span>✓</span><p><strong>無料相談で、今の状況と最適な進め方を確認</strong></p></article>
            </div>
          </div>
          <div class="ks-growth-cta-row"><a href="#contact" class="ks-growth-cta">英検・文系受験の進め方を相談する <span>→</span></a></div>
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
              <img src="/stoaca-eiken-course-thumbnail.png" alt="オンライン個別指導 英検対策 5級から準1級まで4技能完全対応のstreet-academy講座" loading="lazy">
            </figure>
            <div class="ks-stoaca-copy">
              <p class="ks-eyebrow">STREET-ACADEMY ONLINE LESSON</p>
              <h2>street-academyでも<br>英検対策講座を開講中</h2>
              <p>過去問を使った完全マンツーマン指導で、今の弱点に合わせた英検対策を行います。英検5級から準1級まで、読む・聞く・書く・話すの4技能に対応します。</p>
              <ul class="ks-check-list">
                <li>オンライン・完全1対1の個別レッスン</li>
                <li>過去問を使った弱点分析と具体的な学習プラン</li>
                <li>不登校・通信制高校・発達特性のあるお子様にも配慮</li>
              </ul>
              <div class="ks-street-academy-courses" aria-label="street-academy 英検対策講座一覧">
                <p>受講したい級を選ぶ</p>
                <div>${STREET_ACADEMY_EIKEN_COURSES.map((course) => `<a ${openExternal(course.url)} class="ks-street-academy-course-link">${course.grade}<span>↗</span></a>`).join("")}</div>
              </div>
              <div class="ks-stoaca-actions">
                <a ${openExternal(STREET_ACADEMY_PROFILE_URL)} class="ks-text-link">street-academyの講師プロフィール・全講座を見る <span>→</span></a>
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
          <a ${contentLink(article.url)} class="ks-text-link">記事を読む <span>→</span></a>
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
              <a href="${BLOG_HOME_URL}" class="ks-growth-cta ks-growth-cta--outline">教育コラム一覧を見る <span>→</span></a>
              <a ${openExternal(LEGACY_BLOG_URL)} class="ks-text-link">英検合格ゼミナールの旧ブログを見る <span>↗</span></a>
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
      { href: "/blog/", label: "教育コラム" },
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
    const directContract = document.getElementById("direct-contract");
    insertAfter(directContract, createTutorComparison());
    insertAfter(results, createStoaca());
    insertAfter(howWeTeach, createBlog());
    addHeaderLinks();

    // The sections are injected after the application mounts. Re-apply a URL
    // hash once so shared links and mobile navigation land on the new section.
    const targetId = window.location.hash.slice(1);
    const target = targetId && document.getElementById(targetId);
    if (target) {
      window.setTimeout(() => target.scrollIntoView({ block: "start" }), 80);
    }
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
