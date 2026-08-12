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

    // The legacy floating CTA overlaps the two detail-page buttons on compact
    // screens. Hide it only on course pages, where the dedicated CTAs are present.
    const floatingCta = document.getElementById("floating-cta");
    if (floatingCta) {
      floatingCta.setAttribute("aria-hidden", "true");
      floatingCta.style.display = "none";
    }

    document.querySelectorAll("a").forEach((anchor) => {
      const label = anchor.textContent.trim().replace(/\s+/g, " ");
      const purpose = CTA_PURPOSES[label];
      if (!purpose || anchor.dataset.ksFormLink === "true") return;

      // Replace in-site #contact links with direct, prefilled Google Form URLs.
      // A normal anchor is intentionally used so it remains reliable in Safari,
      // works without JavaScript navigation APIs, and supports opening in a new tab.
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
    refreshFixedElements();
    window.addEventListener("scroll", refreshFixedElements, { passive: true });

    // React renders after the module bundle; observe once more so direct links
    // are also applied after the course-detail DOM is mounted.
    const root = document.getElementById("root");
    if (root) {
      const observer = new MutationObserver(() => enhanceCourseDetailCtas());
      observer.observe(root, { childList: true, subtree: true });
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
