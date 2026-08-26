(() => {
  const ready = () => {
    if (document.body.dataset.p100 === '1') return;
    document.body.dataset.p100 = '1';
    const q = (s) => Array.from(document.querySelectorAll(s));
    const text = (el) => ((el && el.textContent) || '').replace(/\s+/g, ' ').trim();
    const links = q('a[href]');
    const contact = links.find(a => /無料相談|お問い合わせ|体験授業|相談を予約/.test(text(a)));
    const teacher = links.find(a => /講師紹介/.test(text(a)));
    if (contact) contact.classList.add('p100-cta', 'p100-cta-primary');
    if (teacher) teacher.classList.add('p100-cta', 'p100-cta-secondary');

    const first = q('main, #root').find(el => el.querySelector('h1'));
    if (first && !document.querySelector('.p100-trustbar')) {
      const bar = document.createElement('div'); bar.className = 'p100-trustbar';
      bar.innerHTML = '<span><b>20年超</b> 指導経験</span><span><b>1,000名超</b> 総指導生徒数</span><span><b>300名以上</b> 英検指導実績</span><span><b>全国対応</b> オンライン</span>';
      first.parentNode.insertBefore(bar, first);
    }

    const headings = q('h2,h3');
    headings.forEach(h => {
      const t = text(h); const keys = ['選ばれる','こんな方','講師紹介','指導の特徴','授業の様子','授業を成果','料金','よくある質問','お客様の声','お問い合わせ','無料相談','専門ブランド','個人契約','合格実績'];
      if (keys.some(k => t.includes(k))) { const sec = h.closest('section,article,div'); if (sec && !sec.classList.contains('p100-section')) sec.classList.add('p100-section'); }
    });

    const target = q('a').filter(a => /英検合格ゼミナール|逆転合格ゼミナール|進路伴走ゼミナール/.test(text(a)));
    if (target.length >= 2) {
      const box = document.createElement('div'); box.className = 'p100-choice-grid';
      const data = [
        ['英検を取りたい','級・弱点・4技能を整理して、合格までの学習計画を一緒に作ります。','英検合格ゼミナール','/eiken/'],
        ['大学受験で伸ばしたい','現在地から志望校まで逆算し、英語・国語・社会の優先順位を整えます。','逆転合格ゼミナール','/gyakuten/'],
        ['不登校・通信制で学びたい','学習だけでなく生活リズムや進路まで、無理のないペースで伴走します。','進路伴走ゼミナール','/shinro/'],
        ['まず相談して整理したい','今の状況を一緒に整理し、必要な支援だけをご提案します。','無料相談へ','mailto:info@kateikyoshi-sogo.com']
      ];
      data.forEach((d,i)=>{ const c=document.createElement('div'); c.className='p100-choice p100-card'; c.innerHTML='<span class="p100-badge">'+(['英検','大学受験','不登校・通信制','個別相談'][i])+'</span><h3>'+d[0]+'</h3><p>'+d[1]+'</p><a href="'+d[3]+'">'+d[2]+' →</a>'; box.appendChild(c); });
      const anchor = target[0].closest('section,article,div');
      if (anchor && !document.querySelector('.p100-choice-grid')) anchor.parentNode.insertBefore(box, anchor);
    }

    if (!document.querySelector('.p100-contract')) {
      const contract = document.createElement('section'); contract.className = 'p100-contract';
      contract.innerHTML = '<div class="p100-contract__inner"><span class="p100-badge">個人契約について</span><h2>費用と担当が分かりやすい、直接契約です</h2><p class="p100-contract__lead">ご家庭が安心して検討できるよう、契約に関わる負担と担当体制をシンプルにしています。</p><div class="p100-contract__grid"><div><strong>0円</strong><h3>入会金</h3><p>入会時の初期費用はありません。</p></div><div><strong>0円</strong><h3>管理費</h3><p>月々の管理費はありません。</p></div><div><strong>0円</strong><h3>仲介手数料</h3><p>紹介会社を介した仲介手数料はありません。</p></div><div><strong>本人が担当</strong><h3>一貫した指導</h3><p>ご相談から指導まで、講師本人が直接対応します。</p></div></div></div></section>';
      const anchor = q('h2,h3').find(h => /料金|個人契約|費用/.test(text(h)));
      const targetAnchor = anchor && anchor.closest('section,article,div');
      if (targetAnchor && targetAnchor.parentNode) targetAnchor.parentNode.insertBefore(contract, targetAnchor);
      else if (document.querySelector('.p100-consult')) document.querySelector('.p100-consult').before(contract);
    }

    if (!document.querySelector('.p100-consult')) {
      const consult = document.createElement('section'); consult.className = 'p100-consult';
      consult.innerHTML = '<div class="p100-consult__inner"><span class="p100-badge">はじめての方へ</span><h2>無料相談では、まず今の状況をお聞かせください</h2><p class="p100-consult__lead">いきなり入会を決めていただく必要はありません。お子さまの現在地やお悩み、目標を整理し、必要なサポートを一緒に考えます。</p><div class="p100-consult__steps"><div><strong>01</strong><h3>状況を伺う</h3><p>学習状況・学校生活・受験や英検の目標などをお聞きします。</p></div><div><strong>02</strong><h3>課題を整理する</h3><p>今どこから始めるべきか、優先順位を一緒に整理します。</p></div><div><strong>03</strong><h3>方向性をご提案</h3><p>必要な指導内容や進め方をご説明し、ご家庭で検討いただけます。</p></div></div><a class="p100-cta p100-cta-primary p100-consult__cta" href="mailto:info@kateikyoshi-sogo.com?subject=無料相談について">まずは無料相談をする →</a></div></section>';
      const contactHeading = q('h2,h3').find(h => /お問い合わせ|無料相談/.test(text(h)));
      const anchor = contactHeading && contactHeading.closest('section,article,div');
      if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(consult, anchor);
      else if (document.querySelector('footer')) document.querySelector('footer').before(consult);
    }

    if (!document.querySelector('.p100-sticky')) {
      const s = document.createElement('div'); s.className = 'p100-sticky'; s.innerHTML = '<a class="secondary" href="mailto:info@kateikyoshi-sogo.com">メールで相談</a><a class="primary" href="mailto:info@kateikyoshi-sogo.com?subject=無料相談について">無料相談をする</a>'; document.body.appendChild(s);
    }

    q('details').forEach(d => d.classList.add('p100-faq'));
    q('article, [class*="card"], [class*="Card"]').forEach(el => { if (el.offsetWidth > 220 && el.offsetWidth < 900) el.classList.add('p100-card'); });

    // First section: make the hero's contract conditions immediately understandable.
    const hero = document.querySelector('.ks-photo-hero');
    const heroCopy = hero?.querySelector('.ks-hero-copy');
    const heroSecondary = heroCopy?.querySelector('.ks-hero-secondary');
    if (hero && heroCopy && heroSecondary && !hero.querySelector('.p100-hero-assurance')) {
      const styleId = 'p100-hero-assurance-style';
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style'); style.id = styleId;
        style.textContent = `
          .p100-hero-assurance{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin:1rem 0 0}
          .p100-hero-assurance__item{min-width:0;padding:.62rem .45rem;border:1px solid #e8d5df;border-radius:10px;background:linear-gradient(180deg,#fff 0%,#fff8fb 100%);text-align:center}
          .p100-hero-assurance__item strong{display:block;color:#d92f67;font-size:1.02rem;line-height:1.25;font-weight:900}
          .p100-hero-assurance__item span{display:block;margin-top:.18rem;color:#536276;font-size:.66rem;line-height:1.45}
          .p100-hero-assurance-note{margin:.62rem 0 0;color:#52647a;font-size:.73rem;line-height:1.65}
          .p100-hero-assurance-note b{color:#173f73}
          @media(max-width:900px){.p100-hero-assurance{gap:6px}.p100-hero-assurance__item{padding:.58rem .28rem}.p100-hero-assurance__item strong{font-size:.9rem}.p100-hero-assurance__item span{font-size:.6rem}.p100-hero-assurance-note{font-size:.68rem}}
          @media(max-width:380px){.p100-hero-assurance__item strong{font-size:.8rem}.p100-hero-assurance__item span{font-size:.56rem}}
        `;
        document.head.appendChild(style);
      }
      const assurance = document.createElement('div'); assurance.className = 'p100-hero-assurance'; assurance.setAttribute('aria-label','契約と料金の安心ポイント');
      assurance.innerHTML = '<div class="p100-hero-assurance__item"><strong>0円</strong><span>入会金</span></div><div class="p100-hero-assurance__item"><strong>0円</strong><span>管理費</span></div><div class="p100-hero-assurance__item"><strong>0円</strong><span>仲介手数料</span></div>';
      const note = document.createElement('p'); note.className = 'p100-hero-assurance-note'; note.innerHTML = '<b>講師本人が直接担当</b>。ご相談から指導まで、一貫して対応します。';
      heroSecondary.insertAdjacentElement('afterend', assurance); assurance.insertAdjacentElement('afterend', note);
    }
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ready); else ready();
  setTimeout(ready, 1200); setTimeout(ready, 3000);
})();
