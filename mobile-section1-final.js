(() => {
  'use strict';

  const SECTION_ID = 'ks-premium-intro-v5';
  const STYLE_ID = 'ks-premium-intro-style-v5';
  let scheduled = false;
  const norm = s => (s || '').replace(/\s+/g,'').trim();

  function injectStyles(){
    if(document.getElementById(STYLE_ID)) return;
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      :root{
        --ks-navy:#082f59;
        --ks-navy-2:#164b82;
        --ks-text:#314a66;
        --ks-muted:#66778b;
        --ks-line:#e1e6eb;
        --ks-gold:#d7a21f;
        --ks-gold-soft:#fff8e8;
        --ks-rose:#e53b70;
        --ks-rose-soft:#fff5f8;
        --ks-blue:#2f73c8;
        --ks-blue-soft:#f5f9ff;
        --ks-green:#34a36c;
        --ks-green-soft:#f5fbf7;
      }

      #${SECTION_ID},#${SECTION_ID} *{box-sizing:border-box!important;min-width:0!important}
      #${SECTION_ID}{
        width:100%!important;margin:0!important;padding:clamp(16px,2.8vw,30px) clamp(8px,2vw,20px)!important;
        background:linear-gradient(180deg,#f4f7fb 0%,#eef3f8 100%)!important;color:var(--ks-text)!important;
        font-family:"Noto Sans JP",sans-serif!important;overflow:hidden!important;
      }
      #${SECTION_ID} .ks-ref__panel{
        position:relative!important;width:min(100%,1200px)!important;margin:0 auto!important;
        padding:clamp(30px,4.8vw,60px) clamp(18px,4.5vw,54px) clamp(28px,4vw,48px)!important;
        border:1px solid #dce4ec!important;border-radius:clamp(20px,2.8vw,28px)!important;
        background:linear-gradient(135deg,#fff 0%,#fffdf9 54%,#fffaf0 100%)!important;
        box-shadow:0 18px 52px rgba(16,45,77,.075)!important;text-align:center!important;overflow:hidden!important;
      }
      #${SECTION_ID} .ks-ref__panel::after{
        content:""!important;position:absolute!important;right:-120px!important;top:115px!important;width:330px!important;height:330px!important;
        border-radius:50%!important;background:radial-gradient(circle,rgba(241,205,112,.18) 0%,rgba(241,205,112,0) 70%)!important;pointer-events:none!important;
      }

      #${SECTION_ID} .ks-ref__categories{
        position:relative!important;z-index:1!important;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;
        gap:clamp(10px,1.6vw,16px)!important;width:min(100%,890px)!important;margin:0 auto clamp(26px,3vw,38px)!important;
      }
      #${SECTION_ID} .ks-ref__category{
        display:flex!important;align-items:center!important;justify-content:center!important;gap:10px!important;
        min-height:clamp(56px,6vw,72px)!important;padding:10px 16px!important;border-radius:14px!important;background:#fff!important;
        font-family:"Noto Serif JP",serif!important;font-size:clamp(18px,2.1vw,25px)!important;font-weight:800!important;line-height:1.3!important;
      }
      #${SECTION_ID} .ks-ref__category svg{width:25px!important;height:25px!important;flex:0 0 25px!important;stroke:currentColor!important}
      #${SECTION_ID} .ks-ref__category--rose{border:1.5px solid #ef6b91!important;color:#df3368!important}
      #${SECTION_ID} .ks-ref__category--blue{border:1.5px solid #74a5df!important;color:#2369ba!important}

      #${SECTION_ID} .ks-ref__hero-title{
        position:relative!important;z-index:1!important;margin:0 auto clamp(18px,2.1vw,24px)!important;color:var(--ks-navy)!important;
        font-family:"Noto Serif JP",serif!important;font-size:clamp(32px,5vw,58px)!important;font-weight:900!important;line-height:1.42!important;
        letter-spacing:.005em!important;text-align:center!important;
      }
      #${SECTION_ID} .ks-ref__hero-line{display:block!important;white-space:nowrap!important}
      #${SECTION_ID} .ks-ref__hero-mobile-extra{display:none!important}
      #${SECTION_ID} .ks-ref__ornament{position:relative!important;z-index:1!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:8px!important;margin:0 auto clamp(18px,2.3vw,26px)!important}
      #${SECTION_ID} .ks-ref__ornament::before,#${SECTION_ID} .ks-ref__ornament::after{content:""!important;width:44px!important;height:2px!important;background:var(--ks-gold)!important;border-radius:99px!important}
      #${SECTION_ID} .ks-ref__ornament span{width:6px!important;height:6px!important;border-radius:50%!important;background:var(--ks-gold)!important}

      #${SECTION_ID} .ks-ref__question{
        position:relative!important;z-index:1!important;margin:0 auto 13px!important;color:var(--ks-navy)!important;
        font-family:"Noto Serif JP",serif!important;font-size:clamp(21px,2.7vw,31px)!important;font-weight:800!important;line-height:1.52!important;text-align:center!important;
      }
      #${SECTION_ID} .ks-ref__resolution{position:relative!important;z-index:1!important;margin:0 auto 16px!important;color:var(--ks-navy)!important;font-size:clamp(15px,1.65vw,19px)!important;font-weight:700!important;line-height:1.8!important;text-align:center!important}
      #${SECTION_ID} .ks-ref__resolution strong{color:#d29a10!important;font-family:"Noto Serif JP",serif!important;font-size:1.45em!important;font-weight:900!important}
      #${SECTION_ID} .ks-ref__support{position:relative!important;z-index:1!important;margin:0 auto 12px!important;color:#183f69!important;font-size:clamp(13px,1.45vw,16px)!important;font-weight:600!important;line-height:1.85!important;text-align:center!important}
      #${SECTION_ID} .ks-ref__support span,#${SECTION_ID} .ks-ref__planner span{display:block!important;white-space:nowrap!important}
      #${SECTION_ID} .ks-ref__planner{position:relative!important;z-index:1!important;margin:0 auto clamp(20px,2.4vw,28px)!important;color:#173d64!important;font-size:clamp(13px,1.42vw,16px)!important;font-weight:600!important;line-height:1.8!important;text-align:center!important}

      #${SECTION_ID} .ks-ref__divider{height:1px!important;width:100%!important;margin:clamp(18px,2.3vw,28px) 0!important;background:linear-gradient(90deg,transparent,#e6dac0 12%,#e6dac0 88%,transparent)!important}
      #${SECTION_ID} .ks-ref__section-title{margin:0 auto 16px!important;color:var(--ks-navy)!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(18px,2.1vw,24px)!important;font-weight:800!important;line-height:1.5!important;text-align:center!important}
      #${SECTION_ID} .ks-ref__section-title strong{color:#d69e12!important;font-size:1.45em!important;font-weight:900!important}

      #${SECTION_ID} .ks-ref__promises{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:14px!important;width:100%!important}
      #${SECTION_ID} .ks-ref__promise{position:relative!important;padding:18px 17px 18px 20px!important;border:1px solid #e3e6ea!important;border-radius:16px!important;background:#fff!important;text-align:left!important;box-shadow:0 7px 18px rgba(29,56,84,.05)!important;overflow:hidden!important}
      #${SECTION_ID} .ks-ref__promise::before{content:""!important;position:absolute!important;left:0!important;top:0!important;bottom:0!important;width:4px!important;background:var(--accent)!important}
      #${SECTION_ID} .ks-ref__promise--rose{--accent:var(--ks-rose)!important;background:linear-gradient(180deg,#fff,#fff9fb)!important}
      #${SECTION_ID} .ks-ref__promise--blue{--accent:var(--ks-blue)!important;background:linear-gradient(180deg,#fff,#f9fbff)!important}
      #${SECTION_ID} .ks-ref__promise--green{--accent:var(--ks-green)!important;background:linear-gradient(180deg,#fff,#f9fdfb)!important}
      #${SECTION_ID} .ks-ref__promise-head{display:flex!important;align-items:center!important;gap:11px!important;margin-bottom:11px!important}
      #${SECTION_ID} .ks-ref__icon{display:grid!important;place-items:center!important;width:48px!important;height:48px!important;flex:0 0 48px!important;border:1.5px solid var(--accent)!important;border-radius:50%!important;color:var(--accent)!important;background:#fff!important}
      #${SECTION_ID} .ks-ref__icon svg{width:25px!important;height:25px!important;stroke:currentColor!important}
      #${SECTION_ID} .ks-ref__promise h3{margin:0!important;color:var(--ks-navy)!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(15px,1.5vw,19px)!important;font-weight:800!important;line-height:1.55!important}
      #${SECTION_ID} .ks-ref__promise p{margin:0!important;color:#38506a!important;font-size:clamp(12px,1.1vw,14px)!important;line-height:1.8!important;font-weight:500!important}

      #${SECTION_ID} .ks-ref__proofs{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:12px!important;width:100%!important}
      #${SECTION_ID} .ks-ref__proof{display:flex!important;flex-direction:column!important;justify-content:center!important;align-items:center!important;min-height:clamp(92px,9vw,116px)!important;padding:14px 8px!important;border:1px solid #e8d7ad!important;border-radius:15px!important;background:linear-gradient(180deg,#fffefb,#fff8ea)!important;box-shadow:0 6px 16px rgba(99,73,20,.04)!important}
      #${SECTION_ID} .ks-ref__proof-value{display:block!important;color:#0d4c8e!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(24px,3.2vw,36px)!important;font-weight:900!important;line-height:1.2!important;white-space:nowrap!important}
      #${SECTION_ID} .ks-ref__proof-label{display:block!important;margin-top:5px!important;color:#7d5f1d!important;font-size:clamp(10px,.95vw,12px)!important;font-weight:800!important;line-height:1.4!important}
      #${SECTION_ID} .ks-ref__note{margin:10px 4px 0 auto!important;color:#748194!important;font-size:clamp(9px,.85vw,11px)!important;line-height:1.6!important;text-align:right!important}

      #${SECTION_ID} .ks-ref__cta-strip{display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;align-items:center!important;gap:18px!important;margin-top:22px!important;padding:18px 20px!important;border:1px solid #f1b7c8!important;border-radius:16px!important;background:linear-gradient(135deg,#fff7fa,#fff)!important;text-align:left!important}
      #${SECTION_ID} .ks-ref__cta-copy{display:flex!important;align-items:center!important;gap:14px!important}
      #${SECTION_ID} .ks-ref__cta-badge{display:grid!important;place-items:center!important;width:54px!important;height:54px!important;flex:0 0 54px!important;border-radius:50%!important;background:linear-gradient(135deg,#ffdbe7,#fff)!important;color:var(--ks-rose)!important}
      #${SECTION_ID} .ks-ref__cta-badge svg{width:28px!important;height:28px!important;stroke:currentColor!important}
      #${SECTION_ID} .ks-ref__cta-copy strong{display:block!important;color:var(--ks-navy)!important;font-size:clamp(14px,1.45vw,17px)!important;line-height:1.5!important}
      #${SECTION_ID} .ks-ref__cta-copy span{display:block!important;margin-top:4px!important;color:#5f7083!important;font-size:clamp(10px,1vw,12px)!important;line-height:1.6!important}
      #${SECTION_ID} .ks-ref__cta{display:flex!important;align-items:center!important;justify-content:center!important;min-height:52px!important;padding:12px 22px!important;border:1px solid #dc356b!important;border-radius:12px!important;background:linear-gradient(135deg,#ee4177,#df3269)!important;color:#fff!important;text-decoration:none!important;font-size:clamp(12px,1.15vw,14px)!important;font-weight:900!important;line-height:1.4!important;text-align:center!important;box-shadow:0 10px 22px rgba(222,53,104,.18)!important;white-space:nowrap!important}

      @media(min-width:601px) and (max-width:1024px){
        #${SECTION_ID}{padding:14px 10px 24px!important}
        #${SECTION_ID} .ks-ref__panel{padding:32px 28px 28px!important}
        #${SECTION_ID} .ks-ref__hero-title{font-size:clamp(34px,5.3vw,48px)!important}
        #${SECTION_ID} .ks-ref__promises{gap:10px!important}
        #${SECTION_ID} .ks-ref__promise{padding:16px 13px 16px 16px!important}
        #${SECTION_ID} .ks-ref__proofs{grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:9px!important}
        #${SECTION_ID} .ks-ref__proof-value{font-size:clamp(24px,4vw,33px)!important}
      }

      @media(max-width:600px){
        #${SECTION_ID}{padding:10px 7px 20px!important}
        #${SECTION_ID} .ks-ref__panel{padding:24px 12px 22px!important;border-radius:18px!important}
        #${SECTION_ID} .ks-ref__categories{gap:7px!important;margin-bottom:22px!important}
        #${SECTION_ID} .ks-ref__category{min-height:52px!important;padding:9px 7px!important;border-radius:12px!important;font-size:clamp(15px,4.4vw,20px)!important;gap:6px!important}
        #${SECTION_ID} .ks-ref__category svg{width:20px!important;height:20px!important;flex-basis:20px!important}
        #${SECTION_ID} .ks-ref__hero-title{font-size:clamp(25px,7.1vw,34px)!important;line-height:1.48!important;margin-bottom:16px!important}
        #${SECTION_ID} .ks-ref__question{font-size:clamp(18px,5.1vw,23px)!important}
        #${SECTION_ID} .ks-ref__resolution{font-size:clamp(12px,3.45vw,15px)!important}
        #${SECTION_ID} .ks-ref__support,#${SECTION_ID} .ks-ref__planner{font-size:clamp(10.8px,3vw,13px)!important}
        #${SECTION_ID} .ks-ref__promises{grid-template-columns:1fr!important;gap:9px!important}
        #${SECTION_ID} .ks-ref__promise{padding:16px 14px 16px 18px!important}
        #${SECTION_ID} .ks-ref__promise-head{margin-bottom:7px!important}
        #${SECTION_ID} .ks-ref__icon{width:42px!important;height:42px!important;flex-basis:42px!important}
        #${SECTION_ID} .ks-ref__proofs{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important}
        #${SECTION_ID} .ks-ref__proof{min-height:92px!important;padding:13px 5px!important}
        #${SECTION_ID} .ks-ref__proof-value{font-size:clamp(22px,6.5vw,29px)!important}
        #${SECTION_ID} .ks-ref__note{text-align:center!important;margin-inline:auto!important}
        #${SECTION_ID} .ks-ref__cta-strip{grid-template-columns:1fr!important;gap:13px!important;padding:15px!important;text-align:center!important}
        #${SECTION_ID} .ks-ref__cta-copy{justify-content:center!important;text-align:left!important}
        #${SECTION_ID} .ks-ref__cta{width:100%!important;white-space:normal!important}
      }

      /* Very small phones: preserve the reference's hierarchy rather than shrinking type too far. */
      @media(max-width:430px){
        #${SECTION_ID} .ks-ref__categories{grid-template-columns:1fr!important}
        #${SECTION_ID} .ks-ref__category{font-size:19px!important}
        #${SECTION_ID} .ks-ref__hero-line--second{display:none!important}
        #${SECTION_ID} .ks-ref__hero-mobile-extra{display:block!important}
        #${SECTION_ID} .ks-ref__hero-title{font-size:clamp(25px,7.3vw,31px)!important}
        #${SECTION_ID} .ks-ref__support span,#${SECTION_ID} .ks-ref__planner span{white-space:normal!important}
        #${SECTION_ID} .ks-ref__cta-copy{align-items:flex-start!important}
      }
    `;
    document.head.appendChild(style);
  }

  const iconBook=`<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22V5.5Z"/><path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22V5.5Z"/></svg>`;
  const iconSchool=`<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18"/><path d="M5 21V9l7-4 7 4v12"/><path d="M9 21v-6h6v6"/><path d="M8 11h.01M12 11h.01M16 11h.01"/><path d="M12 5V2"/></svg>`;
  const iconPerson=`<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="7" r="3"/><path d="M4 20v-2a6 6 0 0 1 12 0v2"/><path d="m17 13 1.7 1.7L22 11.4"/></svg>`;
  const iconChat=`<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.4-4.1A8 8 0 1 1 21 12Z"/><path d="M8 12h.01M12 12h.01M16 12h.01"/></svg>`;
  const iconTrend=`<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18 10 12l4 4 6-8"/><path d="M15 8h5v5"/></svg>`;
  const iconConsult=`<svg viewBox="0 0 24 24" fill="none" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18h9a5 5 0 0 0 0-10H9a5 5 0 0 0-5 5v7l3-2Z"/><path d="M9 12h6M9 15h4"/></svg>`;

  function buildSection(){
    const section=document.createElement('section');
    section.id=SECTION_ID;
    section.className='ks-first-section-v5';
    section.setAttribute('aria-labelledby','ks-premium-intro-title');
    section.innerHTML=`
      <div class="ks-ref__panel">
        <div class="ks-ref__categories" aria-label="主な対応分野">
          <div class="ks-ref__category ks-ref__category--rose">${iconBook}<span>英検・受験</span></div>
          <div class="ks-ref__category ks-ref__category--blue">${iconSchool}<span>不登校・通信制高校</span></div>
        </div>

        <h2 class="ks-ref__hero-title" id="ks-premium-intro-title">
          <span class="ks-ref__hero-line">英検・受験・不登校まで、</span>
          <span class="ks-ref__hero-line ks-ref__hero-line--second">1人のプロが一貫して伴走します。</span>
          <span class="ks-ref__hero-mobile-extra">1人のプロが一貫して<br>伴走します。</span>
        </h2>
        <div class="ks-ref__ornament" aria-hidden="true"><span></span></div>

        <p class="ks-ref__question">「うちの子に合う先生が見つからない」</p>
        <p class="ks-ref__resolution">そんなお悩みを、<strong>20年</strong>の経験で解決します。</p>
        <p class="ks-ref__support"><span>学校に通えている子も、通えていない子も、</span><span>お子様に最適な指導で英検・受験などに一貫対応。</span></p>
        <p class="ks-ref__planner"><span>進路指導や学習習慣の定着まで見据えた</span><span>お子様だけの学習プランナー。</span></p>

        <div class="ks-ref__divider" aria-hidden="true"></div>
        <h3 class="ks-ref__section-title">一人ひとりに合わせるための、<strong>3</strong>つの約束</h3>
        <div class="ks-ref__promises">
          <article class="ks-ref__promise ks-ref__promise--rose">
            <div class="ks-ref__promise-head"><span class="ks-ref__icon">${iconPerson}</span><h3>お子様に合わせた<br>オーダーメイド指導</h3></div>
            <p>現在地・目標・性格・生活環境を丁寧に把握し、最適な学習計画を一緒に作ります。</p>
          </article>
          <article class="ks-ref__promise ks-ref__promise--blue">
            <div class="ks-ref__promise-head"><span class="ks-ref__icon">${iconChat}</span><h3>相談から授業まで<br>同じプロが担当</h3></div>
            <p>相談した内容がそのまま指導につながるので、安心して何でも相談できます。</p>
          </article>
          <article class="ks-ref__promise ks-ref__promise--green">
            <div class="ks-ref__promise-head"><span class="ks-ref__icon">${iconTrend}</span><h3>英検・受験・進路まで<br>長期的に伴走</h3></div>
            <p>点数だけでなく将来を見据えたサポートで、学力と自信をしっかり育てます。</p>
          </article>
        </div>

        <div class="ks-ref__divider" aria-hidden="true"></div>
        <h3 class="ks-ref__section-title">多くのご家庭に選ばれています</h3>
        <div class="ks-ref__proofs" aria-label="指導実績">
          <div class="ks-ref__proof"><span class="ks-ref__proof-value">20年超</span><span class="ks-ref__proof-label">指導経験</span></div>
          <div class="ks-ref__proof"><span class="ks-ref__proof-value">1,000名超</span><span class="ks-ref__proof-label">総指導生徒数</span></div>
          <div class="ks-ref__proof"><span class="ks-ref__proof-value">300名以上</span><span class="ks-ref__proof-label">英検指導実績</span></div>
          <div class="ks-ref__proof"><span class="ks-ref__proof-value">80%超</span><span class="ks-ref__proof-label">英検合格率</span></div>
        </div>
        <p class="ks-ref__note">※上記はこれまでの指導実績に基づく数値です。</p>

        <div class="ks-ref__cta-strip">
          <div class="ks-ref__cta-copy"><span class="ks-ref__cta-badge">${iconConsult}</span><div><strong>まずはお気軽にご相談ください</strong><span>無料相談・体験授業で、お子様に合う学び方を一緒に考えます。</span></div></div>
          <a class="ks-ref__cta" href="#contact">無料相談・体験授業について相談する　›</a>
        </div>
      </div>`;
    return section;
  }

  function removeKnownLegacy(){
    document.getElementById('pc-proofbar')?.remove();
    document.querySelectorAll('.pc-decision').forEach(el=>el.remove());
    ['ks-premium-intro-v1','ks-premium-intro-v2','ks-premium-intro-v3','ks-premium-intro-v4'].forEach(id=>document.getElementById(id)?.remove());
  }

  function findLegacyIntro(main){
    const candidates=Array.from(main.querySelectorAll('h1,h2,h3,h4,p,strong,div,span')).filter(el=>!el.closest('#'+SECTION_ID));
    const heading=candidates.find(el=>norm(el.textContent).replace(/[「」]/g,'')==='うちの子に合う先生が見つからない');
    if(!heading) return null;
    let node=heading;
    while(node&&node!==main){
      const t=norm(node.textContent);
      const hasProofs=(t.includes('20年超')||t.includes('20年'))&&t.includes('1,000名超')&&(t.includes('300名以上')||t.includes('英検指導実績'))&&(t.includes('80%超')||t.includes('英検合格率'));
      if(hasProofs&&node.parentElement!==document.body) return node;
      node=node.parentElement;
    }
    return heading.closest('.ks-mobile-section1-final,section')||null;
  }

  function rebuild(){
    scheduled=false;injectStyles();removeKnownLegacy();
    const main=document.querySelector('main');if(!main)return;
    let fresh=document.getElementById(SECTION_ID);
    const legacy=findLegacyIntro(main)||Array.from(main.querySelectorAll('.ks-mobile-section1-final')).find(el=>!el.closest('#'+SECTION_ID))||null;
    if(legacy){const replacement=fresh||buildSection();if(fresh&&fresh!==legacy)fresh.remove();legacy.replaceWith(replacement);fresh=replacement}
    else if(!fresh){fresh=buildSection();const hero=main.firstElementChild;if(hero)hero.insertAdjacentElement('afterend',fresh);else main.prepend(fresh)}
    main.querySelectorAll('.ks-mobile-section1-final').forEach(el=>{if(!el.closest('#'+SECTION_ID))el.remove()});
  }

  function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(rebuild)}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',rebuild,{once:true});else rebuild();
  window.addEventListener('load',rebuild,{once:true});
  window.addEventListener('resize',schedule,{passive:true});
  document.fonts?.ready?.then(rebuild);
  [120,350,800,1600,3000].forEach(ms=>setTimeout(rebuild,ms));
  const root=document.getElementById('root')||document.body;if(root)new MutationObserver(schedule).observe(root,{childList:true,subtree:true});
})();
