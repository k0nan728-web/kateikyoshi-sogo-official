(function(){
  const ready=()=>{
    if(document.querySelector('.parent-flow')) return;
    const root=document.querySelector('main, #root'); if(!root) return;
    const all=[...document.querySelectorAll('a[href]')];
    const findLink=(patterns)=>{const a=all.find(x=>patterns.some(p=>((x.textContent||'').replace(/\s+/g,'')).includes(p)));return a?a.getAttribute('href'):null};
    const links={
      eiken:findLink(['英検合格ゼミナール']),
      exam:findLink(['逆転合格ゼミナール']),
      support:findLink(['進路伴走ゼミナール']),
      contact:findLink(['無料相談','お問い合わせ','相談を予約'])||'mailto:info@kateikyoshi-sogo.com'
    };
    const flow=document.createElement('section'); flow.className='parent-flow'; flow.setAttribute('aria-label','保護者が相談に進むまでの心理導線');
    flow.innerHTML=`
      <h2 class="parent-flow__title">保護者が「この先生に相談したい」と思うまで</h2>
      <p class="parent-flow__lead">信頼 → 安心 → 自分に合う → 任せたい → 行動する、の順に必要な情報を配置しています</p>
      <div class="parent-flow__steps">
        <article class="parent-flow__step"><span class="parent-flow__num">1</span><h3>気づく・興味を持つ</h3><p class="parent-flow__mind">「どんな先生だろう？ うちの子に合うかな？」</p><div class="parent-flow__section"><strong>最初に伝える</strong>直接契約・費用負担の分かりやすさ・実績・相談入口</div></article>
        <article class="parent-flow__step"><span class="parent-flow__num">2</span><h3>信頼できそう</h3><p class="parent-flow__mind">「実績もしっかりしていて、安心できそう」</p><div class="parent-flow__section"><strong>証拠を見せる</strong>指導経験・合格実績・講師紹介・選ばれる理由</div></article>
        <article class="parent-flow__step"><span class="parent-flow__num">3</span><h3>自分たちに合いそう</h3><p class="parent-flow__mind">「うちの子の状況にも対応してくれそう」</p><div class="parent-flow__section"><strong>選択肢を明確に</strong>英検・大学受験・不登校／通信制・個別相談の4つの入口</div><a class="parent-flow__cta" href="${links.eiken||'#'}">英検の方はこちら</a></article>
        <article class="parent-flow__step"><span class="parent-flow__num">4</span><h3>任せられそう</h3><p class="parent-flow__mind">「この先生なら、子どもを任せられそう」</p><div class="parent-flow__section"><strong>最後の不安を解消</strong>具体的な指導方法・お客様の声・料金・よくある質問</div><a class="parent-flow__cta" href="${links.exam||'#'}">受験の方はこちら</a></article>
        <article class="parent-flow__step"><span class="parent-flow__num">5</span><h3>相談してみよう</h3><p class="parent-flow__mind">「まず話を聞いてみよう。相談だけでもしてみたい」</p><div class="parent-flow__section"><strong>行動のハードルを下げる</strong>無料相談で状況を整理し、必要な支援だけを一緒に考える</div><a class="parent-flow__cta" href="${links.contact}">無料相談へ進む →</a></article>
      </div>
      <div class="parent-flow__bottom"><strong>ゴールは「契約させる」ことではなく、「安心して相談できる」と感じてもらうこと</strong><span>相談 → 状況整理 → 最適な学習プランの提案、という自然な流れにつなげます</span></div>`;
    const trust=document.querySelector('.p100-trustbar');
    if(trust) trust.insertAdjacentElement('afterend',flow); else root.insertBefore(flow,root.firstChild);
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',ready); else ready();
  setTimeout(ready,1000); setTimeout(ready,2500);
})();
