(() => {
  'use strict';

  const SECTION_ID = 'ks-premium-intro-v4';
  const STYLE_ID = 'ks-premium-intro-style-v4';
  let scheduled = false;
  const norm = s => (s || '').replace(/\s+/g,'').trim();

  function injectStyles(){
    if(document.getElementById(STYLE_ID)) return;
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      :root{
        --ks-navy:#0c2f57;--ks-navy-2:#173f68;--ks-ink:#425469;--ks-muted:#6c7b8d;
        --ks-line:#dfe6ed;--ks-ivory:#fbfaf6;--ks-ivory-2:#f5f1e8;--ks-gold:#c99a28;
        --ks-rose:#c85b79;--ks-blue:#4273a7;--ks-green:#628777;
      }
      #${SECTION_ID},#${SECTION_ID} *{box-sizing:border-box!important;min-width:0!important}
      #${SECTION_ID}{width:100%!important;margin:0!important;padding:clamp(22px,3.7vw,48px) clamp(10px,2.8vw,28px)!important;background:linear-gradient(180deg,#f4f7fa 0%,#eef3f7 100%)!important;color:var(--ks-ink)!important;font-family:"Noto Sans JP",sans-serif!important;overflow:hidden!important}
      #${SECTION_ID} .ks-intro__inner{width:min(100%,1160px)!important;margin:0 auto!important;padding:clamp(34px,5vw,64px) clamp(16px,4.6vw,58px)!important;border:1px solid #d9e1e8!important;border-radius:clamp(22px,3vw,30px)!important;background:linear-gradient(180deg,#fff 0%,#fdfdfb 100%)!important;box-shadow:0 20px 54px rgba(31,54,78,.07)!important;text-align:center!important}

      .ks-intro__eyebrow{display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:8px!important;margin:0 auto 18px!important;padding:7px 14px!important;border:1px solid #e2d4aa!important;border-radius:999px!important;background:#fffaf0!important;color:#8a6918!important;font-size:clamp(11px,1.05vw,13px)!important;font-weight:800!important;letter-spacing:.08em!important}
      .ks-intro__eyebrow::before{content:""!important;width:7px!important;height:7px!important;border-radius:50%!important;background:var(--ks-gold)!important}

      #${SECTION_ID} .ks-intro__categories{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:clamp(10px,1.5vw,14px)!important;width:min(100%,900px)!important;margin:0 auto clamp(24px,3vw,34px)!important}
      #${SECTION_ID} .ks-intro__category{position:relative!important;display:flex!important;align-items:center!important;justify-content:center!important;min-height:clamp(82px,9vw,104px)!important;padding:14px 16px!important;border:1px solid #e7e0d2!important;border-radius:18px!important;background:linear-gradient(135deg,#fffdf9,#faf7ef)!important;color:var(--ks-navy)!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(23px,3vw,32px)!important;font-weight:800!important;line-height:1.35!important;box-shadow:0 8px 22px rgba(71,62,38,.045)!important}
      #${SECTION_ID} .ks-intro__category::before{content:""!important;position:absolute!important;left:18px!important;right:18px!important;top:0!important;height:4px!important;border-radius:0 0 6px 6px!important;background:var(--accent)!important;opacity:.9!important}
      #${SECTION_ID} .ks-intro__category--pink{--accent:var(--ks-rose)!important}
      #${SECTION_ID} .ks-intro__category--blue{--accent:var(--ks-blue)!important}

      #${SECTION_ID} .ks-intro__kicker{margin:0 auto 22px!important;color:var(--ks-navy-2)!important;font-size:clamp(13px,1.5vw,16px)!important;font-weight:800!important;line-height:1.72!important;text-align:center!important}
      #${SECTION_ID} .ks-intro__line{display:block!important;width:100%!important;text-align:center!important}
      #${SECTION_ID} .ks-intro__title{margin:0 auto 18px!important;color:var(--ks-navy)!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(27px,3.5vw,39px)!important;font-weight:900!important;line-height:1.5!important;letter-spacing:.005em!important;text-align:center!important}
      #${SECTION_ID} .ks-intro__resolution{margin:0 auto 26px!important;color:#4c5e72!important;font-size:clamp(14px,1.55vw,17px)!important;font-weight:600!important;line-height:1.75!important;text-align:center!important;white-space:nowrap!important}
      #${SECTION_ID} .ks-intro__rule{width:62px!important;height:3px!important;margin:0 auto 30px!important;border-radius:999px!important;background:var(--ks-gold)!important;opacity:.9!important}
      #${SECTION_ID} .ks-intro__support{margin:0 auto 20px!important;color:#4c5f74!important;font-size:clamp(13px,1.4vw,16px)!important;line-height:1.9!important;text-align:center!important}
      #${SECTION_ID} .ks-intro__planner{margin:0 auto clamp(30px,3.8vw,42px)!important;color:#657488!important;font-size:clamp(12px,1.3vw,15px)!important;line-height:1.9!important;text-align:center!important}
      #${SECTION_ID} .ks-intro__support .ks-intro__line,#${SECTION_ID} .ks-intro__planner .ks-intro__line{white-space:nowrap!important}

      #${SECTION_ID} .ks-intro__proofs{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:12px!important;width:100%!important;margin:0 auto clamp(30px,4vw,42px)!important}
      #${SECTION_ID} .ks-proof{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;min-height:clamp(108px,11vw,136px)!important;padding:18px 10px!important;border:1px solid #e8dfcc!important;border-radius:17px!important;background:linear-gradient(180deg,#fffdf8,#faf6ec)!important;text-align:center!important;box-shadow:0 8px 22px rgba(73,61,34,.045)!important}
      #${SECTION_ID} .ks-proof__value{display:block!important;color:#174a7d!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(23px,3vw,33px)!important;font-weight:900!important;line-height:1.18!important;white-space:nowrap!important}
      #${SECTION_ID} .ks-proof__label{display:block!important;margin-top:8px!important;color:#876922!important;font-size:clamp(10.5px,1vw,12.5px)!important;font-weight:800!important;line-height:1.45!important}

      #${SECTION_ID} .ks-intro__benefits-wrap{padding:clamp(22px,3vw,30px)!important;border:1px solid #e1e7ec!important;border-radius:20px!important;background:#f8fafb!important}
      #${SECTION_ID} .ks-intro__benefits-head{margin:0 auto 18px!important;color:var(--ks-navy)!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(19px,2.2vw,25px)!important;font-weight:800!important;line-height:1.5!important;text-align:center!important}
      #${SECTION_ID} .ks-intro__benefits{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:12px!important;text-align:left!important}
      #${SECTION_ID} .ks-benefit{position:relative!important;padding:21px 18px 20px 21px!important;border:1px solid #e0e6eb!important;border-radius:16px!important;background:#fff!important;overflow:hidden!important}
      #${SECTION_ID} .ks-benefit::before{content:""!important;position:absolute!important;left:0!important;top:18px!important;bottom:18px!important;width:4px!important;border-radius:0 4px 4px 0!important;background:var(--accent)!important;opacity:.72!important}
      #${SECTION_ID} .ks-benefit--pink{--accent:var(--ks-rose)!important}
      #${SECTION_ID} .ks-benefit--green{--accent:var(--ks-green)!important}
      #${SECTION_ID} .ks-benefit--blue{--accent:var(--ks-blue)!important}
      #${SECTION_ID} .ks-benefit h3{margin:0!important;color:var(--ks-navy)!important;font-size:clamp(15px,1.5vw,19px)!important;font-weight:900!important;line-height:1.6!important}
      #${SECTION_ID} .ks-benefit p{margin:9px 0 0!important;color:#657486!important;font-size:clamp(12.5px,1.15vw,14.5px)!important;line-height:1.82!important}

      #${SECTION_ID} .ks-intro__bottom{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:18px!important;margin-top:22px!important;padding:18px 20px!important;border-top:1px solid #e4e9ee!important;color:#667587!important;text-align:left!important}
      #${SECTION_ID} .ks-intro__bottom p{margin:0!important;font-size:clamp(12px,1.15vw,14px)!important;line-height:1.75!important}
      #${SECTION_ID} .ks-intro__cta{flex:0 0 auto!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:50px!important;padding:12px 22px!important;border-radius:999px!important;border:1px solid #d9b24e!important;background:#fffaf0!important;color:#6e5414!important;text-decoration:none!important;font-size:clamp(12.5px,1.15vw,14px)!important;font-weight:900!important;white-space:nowrap!important}

      @media(min-width:601px) and (max-width:1024px){
        #${SECTION_ID}{padding-inline:18px!important}
        #${SECTION_ID} .ks-intro__inner{padding:36px 28px!important}
        #${SECTION_ID} .ks-intro__proofs{grid-template-columns:repeat(2,minmax(0,1fr))!important}
        #${SECTION_ID} .ks-intro__benefits{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:10px!important}
        #${SECTION_ID} .ks-benefit{padding:18px 14px 18px 17px!important}
      }
      @media(max-width:600px){
        #${SECTION_ID}{padding:12px 8px 22px!important}
        #${SECTION_ID} .ks-intro__inner{padding:26px 12px!important;border-radius:20px!important}
        #${SECTION_ID} .ks-intro__categories{gap:7px!important;margin-bottom:20px!important}
        #${SECTION_ID} .ks-intro__category{min-height:68px!important;padding:10px 6px!important;border-radius:14px!important;font-size:clamp(18px,5.1vw,23px)!important}
        #${SECTION_ID} .ks-intro__kicker{font-size:clamp(11.5px,3.35vw,14px)!important}
        #${SECTION_ID} .ks-intro__title{font-size:clamp(21px,6vw,28px)!important}
        #${SECTION_ID} .ks-intro__resolution{font-size:clamp(10.8px,3vw,13px)!important}
        #${SECTION_ID} .ks-intro__support{font-size:clamp(10.2px,2.9vw,12.5px)!important}
        #${SECTION_ID} .ks-intro__planner{font-size:clamp(10px,2.8vw,12px)!important}
        #${SECTION_ID} .ks-intro__proofs{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important}
        #${SECTION_ID} .ks-proof{min-height:98px!important;padding:14px 5px!important;border-radius:14px!important}
        #${SECTION_ID} .ks-proof__value{font-size:clamp(19px,5.8vw,26px)!important}
        #${SECTION_ID} .ks-intro__benefits-wrap{padding:18px 12px!important}
        #${SECTION_ID} .ks-intro__benefits{grid-template-columns:1fr!important;gap:9px!important}
        #${SECTION_ID} .ks-benefit{padding:17px 14px 17px 18px!important}
        #${SECTION_ID} .ks-intro__bottom{flex-direction:column!important;text-align:center!important;padding:17px 8px 0!important}
        #${SECTION_ID} .ks-intro__cta{width:100%!important;white-space:normal!important;text-align:center!important}
      }
      @media(max-width:359px){#${SECTION_ID} .ks-intro__category{font-size:17px!important}#${SECTION_ID} .ks-intro__resolution{font-size:10px!important}#${SECTION_ID} .ks-intro__support,#${SECTION_ID} .ks-intro__planner{font-size:9.8px!important}}
    `;
    document.head.appendChild(style);
  }

  function buildSection(){
    const section=document.createElement('section');
    section.id=SECTION_ID;
    section.className='ks-first-section-v4';
    section.setAttribute('aria-labelledby','ks-premium-intro-title');
    section.innerHTML=`
      <div class="ks-intro__inner">
        <div class="ks-intro__eyebrow">PERSONAL SUPPORT</div>
        <div class="ks-intro__categories" aria-label="主な対応分野">
          <div class="ks-intro__category ks-intro__category--pink">英検・受験</div>
          <div class="ks-intro__category ks-intro__category--blue">不登校・通信制高校</div>
        </div>
        <p class="ks-intro__kicker"><span class="ks-intro__line">英検・受験・不登校まで、</span><span class="ks-intro__line">1人のプロが一貫して伴走します。</span></p>
        <h2 class="ks-intro__title" id="ks-premium-intro-title">「うちの子に合う先生が見つからない」</h2>
        <p class="ks-intro__resolution">そんなお悩みを、20年の経験で解決します。</p>
        <div class="ks-intro__rule" aria-hidden="true"></div>
        <p class="ks-intro__support"><span class="ks-intro__line">学校に通えている子も、通えていない子も、</span><span class="ks-intro__line">お子様に最適な指導で英検・受験などに一貫対応。</span></p>
        <p class="ks-intro__planner"><span class="ks-intro__line">進路指導や学習習慣の定着まで見据えた</span><span class="ks-intro__line">お子様だけの学習プランナー。</span></p>
        <div class="ks-intro__proofs" aria-label="指導実績">
          <div class="ks-proof"><span class="ks-proof__value">20年超</span><span class="ks-proof__label">指導経験</span></div>
          <div class="ks-proof"><span class="ks-proof__value">1,000名超</span><span class="ks-proof__label">総指導生徒数</span></div>
          <div class="ks-proof"><span class="ks-proof__value">300名以上</span><span class="ks-proof__label">英検指導実績</span></div>
          <div class="ks-proof"><span class="ks-proof__value">80%超</span><span class="ks-proof__label">英検合格率</span></div>
        </div>
        <div class="ks-intro__benefits-wrap">
          <h3 class="ks-intro__benefits-head">一人ひとりに合わせるための、3つの約束</h3>
          <div class="ks-intro__benefits">
            <article class="ks-benefit ks-benefit--pink"><h3>「この子には何が必要か」から考える</h3><p>決まった型ではなく、現在地・目標・苦手・性格を見て、優先順位から一緒に組み立てます。</p></article>
            <article class="ks-benefit ks-benefit--green"><h3>相談した本人が、そのまま授業を担当</h3><p>相談担当と講師が別になりません。保護者から伺った内容を、そのまま指導へつなげます。</p></article>
            <article class="ks-benefit ks-benefit--blue"><h3>英検・受験・学習習慣・進路まで一貫対応</h3><p>点数だけでなく、学習習慣や進路まで長期的に伴走します。</p></article>
          </div>
        </div>
        <div class="ks-intro__bottom"><p>まずは、お子様の状況やお悩みをお聞かせください。合う指導かどうかを一緒に整理します。</p><a class="ks-intro__cta" href="#contact">無料相談・体験授業について相談する →</a></div>
      </div>`;
    return section;
  }

  function removeKnownLegacy(){
    document.getElementById('pc-proofbar')?.remove();
    document.querySelectorAll('.pc-decision').forEach(el=>el.remove());
    ['ks-premium-intro-v1','ks-premium-intro-v2','ks-premium-intro-v3'].forEach(id=>document.getElementById(id)?.remove());
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
  window.addEventListener('load',rebuild,{once:true});window.addEventListener('resize',schedule,{passive:true});document.fonts?.ready?.then(rebuild);
  [120,350,800,1600,3000].forEach(ms=>setTimeout(rebuild,ms));
  const root=document.getElementById('root')||document.body;if(root)new MutationObserver(schedule).observe(root,{childList:true,subtree:true});
})();
