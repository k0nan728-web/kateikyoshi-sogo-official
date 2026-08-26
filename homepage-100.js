(function(){
  const ready=()=>{
    if(document.body.dataset.p100==='1') return; document.body.dataset.p100='1';
    const q=(s)=>Array.from(document.querySelectorAll(s));
    const text=(el)=>((el&&el.textContent)||'').replace(/\s+/g,' ').trim();
    const links=q('a[href]');
    const contact=links.find(a=>/無料相談|お問い合わせ|体験授業|相談を予約/.test(text(a)));
    const teacher=links.find(a=>/講師紹介/.test(text(a)));
    if(contact){contact.classList.add('p100-cta','p100-cta-primary');}
    if(teacher) teacher.classList.add('p100-cta','p100-cta-secondary');

    const first=q('main, #root').find(el=>el.querySelector('h1'));
    if(first && !document.querySelector('.p100-trustbar')){
      const bar=document.createElement('div'); bar.className='p100-trustbar';
      bar.innerHTML='<span><b>20年超</b> 指導経験</span><span><b>1,000名超</b> 総指導生徒数</span><span><b>300名以上</b> 英検指導実績</span><span><b>全国対応</b> オンライン</span>';
      first.parentNode.insertBefore(bar,first);
    }

    const headings=q('h2,h3');
    headings.forEach(h=>{
      const t=text(h); const keys=['選ばれる','こんな方','講師紹介','指導の特徴','授業の様子','授業を成果','料金','よくある質問','お客様の声','お問い合わせ','無料相談','専門ブランド','個人契約','合格実績'];
      if(keys.some(k=>t.includes(k))){const sec=h.closest('section,article,div'); if(sec && !sec.classList.contains('p100-section')) sec.classList.add('p100-section');}
    });

    const target=q('a').filter(a=>/英検合格ゼミナール|逆転合格ゼミナール|進路伴走ゼミナール/.test(text(a)));
    if(target.length>=2){
      const box=document.createElement('div'); box.className='p100-choice-grid';
      const data=[
        ['英検を取りたい','級・弱点・4技能を整理して、合格までの学習計画を一緒に作ります。','英検合格ゼミナール','/eiken/'],
        ['大学受験で伸ばしたい','現在地から志望校まで逆算し、英語・国語・社会の優先順位を整えます。','逆転合格ゼミナール','/gyakuten/'],
        ['不登校・通信制で学びたい','学習だけでなく生活リズムや進路まで、無理のないペースで伴走します。','進路伴走ゼミナール','/shinro/'],
        ['まず相談して整理したい','今の状況を一緒に整理し、必要な支援だけをご提案します。','無料相談へ','mailto:info@kateikyoshi-sogo.com']
      ];
      data.forEach((d,i)=>{const c=document.createElement('div');c.className='p100-choice p100-card';c.innerHTML='<span class="p100-badge">'+(['英検','大学受験','不登校・通信制','個別相談'][i])+'</span><h3>'+d[0]+'</h3><p>'+d[1]+'</p><a href="'+d[3]+'">'+d[2]+' →</a>';box.appendChild(c);});
      const anchor=target[0].closest('section,article,div');
      if(anchor && !document.querySelector('.p100-choice-grid')) anchor.parentNode.insertBefore(box,anchor);
    }

    // Customer-facing consultation reassurance: explain what happens after the first contact without exposing the internal persuasion model.
    if(!document.querySelector('.p100-consult')){
      const consult=document.createElement('section'); consult.className='p100-consult';
      consult.innerHTML='<div class="p100-consult__inner"><span class="p100-badge">はじめての方へ</span><h2>無料相談では、まず今の状況をお聞かせください</h2><p class="p100-consult__lead">いきなり入会を決めていただく必要はありません。お子さまの現在地やお悩み、目標を整理し、必要なサポートを一緒に考えます。</p><div class="p100-consult__steps"><div><strong>01</strong><h3>状況を伺う</h3><p>学習状況・学校生活・受験や英検の目標などをお聞きします。</p></div><div><strong>02</strong><h3>課題を整理する</h3><p>今どこから始めるべきか、優先順位を一緒に整理します。</p></div><div><strong>03</strong><h3>方向性をご提案</h3><p>必要な指導内容や進め方をご説明し、ご家庭で検討いただけます。</p></div></div><a class="p100-cta p100-cta-primary p100-consult__cta" href="mailto:info@kateikyoshi-sogo.com?subject=無料相談について">まずは無料相談をする →</a></div></section>';
      const contactHeading=q('h2,h3').find(h=>/お問い合わせ|無料相談/.test(text(h)));
      const anchor=contactHeading&&contactHeading.closest('section,article,div');
      if(anchor&&anchor.parentNode) anchor.parentNode.insertBefore(consult,anchor);
      else if(document.querySelector('footer')) document.querySelector('footer').before(consult);
    }

    if(!document.querySelector('.p100-sticky')){
      const s=document.createElement('div');s.className='p100-sticky';s.innerHTML='<a class="secondary" href="mailto:info@kateikyoshi-sogo.com">メールで相談</a><a class="primary" href="mailto:info@kateikyoshi-sogo.com?subject=無料相談について">無料相談をする</a>';document.body.appendChild(s);
    }

    q('details').forEach(d=>d.classList.add('p100-faq'));
    q('article, [class*="card"], [class*="Card"]').forEach(el=>{if(el.offsetWidth>220 && el.offsetWidth<900) el.classList.add('p100-card');});
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',ready); else ready();
  setTimeout(ready,1200); setTimeout(ready,3000);
})();
