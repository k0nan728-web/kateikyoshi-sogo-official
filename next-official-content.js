// Next Official: current messaging layered onto the approved July 2026 Manus composition.
// This file intentionally changes copy only. The original Manus component order,
// spacing, typography, imagery, and visual rhythm remain the design source of truth.
(() => {
  const applyFirstViewCopy = () => {
    const setText = (loc, text) => {
      const el = document.querySelector(`[data-loc="${loc}"]`);
      if (el && el.textContent !== text) el.textContent = text;
      return el;
    };

    // Header: preserve original navy/gold Manus header and hierarchy.
    setText(
      'client/src/components/Header.tsx:90',
      '「英検・大学受験（文系科目）・不登校・通信制高校」に強いプロ家庭教師'
    );

    // Hero: keep the original two-column photo + editorial copy composition.
    const h1 = document.querySelector('[data-loc="client/src/components/HeroSection.tsx:31"]');
    if (h1 && h1.dataset.nextOfficial !== '1') {
      h1.replaceChildren(
        document.createTextNode('英検・大学受験（文系科目）・不登校――'),
        document.createElement('br'),
        document.createTextNode('一人のプロ家庭教師が、学習と進路を一貫して支えます。')
      );
      h1.dataset.nextOfficial = '1';
    }

    setText(
      'client/src/components/HeroSection.tsx:40',
      '全国オンライン × 講師本人との直接契約'
    );
    setText(
      'client/src/components/HeroSection.tsx:43',
      'ご相談から授業まで、同じ講師が一貫して担当します。'
    );
    setText(
      'client/src/components/HeroSection.tsx:46',
      '英語・国語（現代文・古文・漢文）・社会を横断して指導。理系の方の文系科目対策にも対応します。'
    );
    setText(
      'client/src/components/HeroSection.tsx:49',
      '仲介会社を通さない直接契約だから、講師との距離が近く、余計な仲介手数料もかかりません。'
    );

    // Hero proof points. Keep the approved 2×2 Manus stat layout.
    const stats = [
      ['20年超', '指導経験'],
      ['1,000名超', '延べ指導人数'],
      ['300名以上', '英検指導実績'],
      ['0円', '仲介手数料']
    ];
    const statCards = document.querySelectorAll('[data-loc="client/src/components/HeroSection.tsx:57"]');
    statCards.forEach((card, i) => {
      if (!stats[i]) return;
      const value = card.querySelector('[data-loc="client/src/components/HeroSection.tsx:66"]');
      const label = card.querySelector('[data-loc="client/src/components/HeroSection.tsx:69"]');
      if (value) value.textContent = stats[i][0];
      if (label) label.textContent = stats[i][1];
    });
  };

  let scheduled = false;
  const scheduleApply = () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyFirstViewCopy();
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleApply, { once: true });
  } else {
    scheduleApply();
  }

  const observer = new MutationObserver(scheduleApply);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('load', scheduleApply, { once: true });
})();
