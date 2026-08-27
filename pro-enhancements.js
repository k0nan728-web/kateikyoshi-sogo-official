/* Lightweight progressive enhancements for the static production build. */
(() => {
  const FORM_BASE_URL =
    "https://docs.google.com/forms/d/e/1FAIpQLSdS7FOxXb3MnoANiffjXAxZvVi4GBSIeHrVAZQ_wmkBNsz6NA/viewform";

  const COURSE_NAMES = {
    eiken: "英検対策コース",
    university: "大学受験対策コース",
    futoukou: "不登校支援コース",
    tsushinsei: "通信制高校 卒業・進学サポートコース",
    hattatsu: "発達特性サポートコース",
    sougoutype: "総合型選抜・推薦対策コース",
    koukokuninteishiken: "高卒認定試験対策コース",
    highschool: "高校受験対策コース",
    juniorhigh: "中学受験対策コース",
    periodic: "定期テスト・内申対策コース",
    hokyuu: "学校補習コース",
    sakanobori: "さかのぼり学習コース",
    chukouikkan: "中高一貫校サポートコース",
    gakushuusoudan: "学習相談・保護者カウンセリングコース",
    shukichuu: "短期集中・試験直前対策コース",
  };

  const CTA_PURPOSES = {
    "無料相談・お問い合わせ": "指導コースのお問い合わせ",
    このコースについて問い合わせ: "指導コースのお問い合わせ",
    体験授業を申し込む: "体験授業のお申し込み",
  };

  const makeFormUrl = (courseId, purpose) => {
    const params = new URLSearchParams({
      usp: "pp_url",
      "entry.1564624791": purpose,
      "entry.69889553": "当方のホームページ",
    });

    const courseName = COURSE_NAMES[courseId];
    if (courseName) {
      params.set("entry.1305738703", courseName);
    }

    return `${FORM_BASE_URL}?${params.toString()}`;
  };

  const enhanceCourseDetailCtas = () => {
    const match = window.location.pathname.match(/^\/course\/([^/?#]+)/);
    if (!match) return;

    const courseId = decodeURIComponent(match[1]);
    if (!COURSE_NAMES[courseId]) return;

    document.body.classList.add("ks-course-detail");

    const floatingCta = document.getElementById("floating-cta");
    if (floatingCta) {
      floatingCta.setAttribute("aria-hidden", "true");
      floatingCta.style.display = "none";
    }

    document.querySelectorAll("a").forEach((anchor) => {
      const label = anchor.textContent.trim().replace(/\s+/g, " ");
      const purpose = CTA_PURPOSES[label];
      if (!purpose || anchor.dataset.ksFormLink === "true") return;

      anchor.href = makeFormUrl(courseId, purpose);
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      anchor.dataset.ksFormLink = "true";
      anchor.setAttribute(
        "aria-label",
        `${label}（${COURSE_NAMES[courseId]}）`,
      );
    });
  };

  const mountHeader100 = () => {
    if (document.getElementById("h100-header")) return;

    if (!document.querySelector('link[data-h100-css="1"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/header-100-final.css?v=20260827-h100-1";
      link.dataset.h100Css = "1";
      document.head.appendChild(link);
    }

    if (!document.querySelector('script[data-h100-js="1"]')) {
      const script = document.createElement("script");
      script.src = "/header-100-final.js?v=20260827-h100-1";
      script.defer = true;
      script.dataset.h100Js = "1";
      document.head.appendChild(script);
    }
  };

  const mountFirstSectionResponsive = () => {
    if (!document.querySelector('link[data-first-section-responsive="1"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/first-section-responsive-final.css?v=20260827-first-section-typography1";
      link.dataset.firstSectionResponsive = "1";
      document.head.appendChild(link);
    }

    if (!document.querySelector('link[data-first-section-category="1"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "/first-section-category-final.css?v=20260827-first-section-category2";
      link.dataset.firstSectionCategory = "1";
      document.head.appendChild(link);
    }

    if (!document.querySelector('script[data-first-section-category="1"]')) {
      const script = document.createElement("script");
      script.src = "/section1-category-layout-final.js?v=20260827-first-section-category2";
      script.defer = true;
      script.dataset.firstSectionCategory = "1";
      document.head.appendChild(script);
    }
  };

  const init = () => {
    const floatingCta = document.getElementById("floating-cta");
    const header = document.querySelector("nav.fixed.top-0");
    const hero = document.querySelector("main > section:first-child");

    const refreshFixedElements = () => {
      const scrolled = window.scrollY > 360;
      if (
        floatingCta &&
        !document.body.classList.contains("ks-course-detail")
      ) {
        floatingCta.classList.toggle("is-visible", scrolled);
        floatingCta.setAttribute("aria-hidden", scrolled ? "false" : "true");
      }
      if (header) {
        header.classList.toggle("is-scrolled", window.scrollY > 16);
      }
    };

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

    if (hero) {
      hero.setAttribute(
        "aria-label",
        "プロ家庭教師 鈴木雄太のオンライン指導のご案内",
      );
    }

    enhanceCourseDetailCtas();
    mountHeader100();
    mountFirstSectionResponsive();
    refreshFixedElements();
    window.addEventListener("scroll", refreshFixedElements, { passive: true });

    const root = document.getElementById("root");
    if (root) {
      const observer = new MutationObserver(() => {
        enhanceCourseDetailCtas();
        mountHeader100();
        mountFirstSectionResponsive();
      });
      observer.observe(root, { childList: true, subtree: true });
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
