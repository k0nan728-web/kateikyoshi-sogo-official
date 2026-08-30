(() => {
  'use strict';

  const SECTION_ID = 'ks-premium-intro-v2';
  const STYLE_ID = 'ks-premium-intro-style-v2';
  let scheduled = false;

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      :root{
        --ks-navy:#0b2f5b;
        --ks-ink:#2e4057;
        --ks-muted:#67768a;
        --ks-line:#dce5ef;
        --ks-gold:#dda91e;
        --ks-pink:#d94a76;
        --ks-pink-soft:#fff5f8;
        --ks-green:#2a855f;
        --ks-green-soft:#f4fbf7;
        --ks-blue:#2d69ae;
        --ks-blue-soft:#f4f8ff;
        --ks-orange:#c98222;
        --ks-orange-soft:#fff9ef;
      }

      /* Header: completed layout; enlarge the Pro Tutor badge only on tablet/desktop. */
      nav.fixed.top-0{background:rgba(9,29,55,.985)!important;border-bottom:1px solid rgba(214,170,55,.34)!important;box-shadow:0 8px 28px rgba(7,22,43,.16)!important;backdrop-filter:blur(14px)!important;-webkit-backdrop-filter:blur(14px)!important;overflow:visible!important}
      nav.fixed.top-0>.container{width:100%!important;max-width:1280px!important;margin-inline:auto!important;padding-inline:clamp(14px,2.6vw,34px)!important}
      nav.fixed.top-0>.container>div{min-height:72px!important;padding-block:9px!important;gap:clamp(8px,1.4vw,18px)!important;align-items:center!important}
      nav.fixed.top-0>.container>div>a:first-child{min-width:0!important;flex:1 1 auto!important;gap:clamp(8px,1.2vw,15px)!important;text-decoration:none!important}
      nav.fixed.top-0>.container>div>a:first-child>div:first-child{flex:0 0 auto!important;border:1px solid rgba(221,177,56,.95)!important;border-radius:7px!important;padding:9px 15px!important;color:#f8df91!important;background:rgba(255,255,255,.025)!important;font-weight:800!important;font-size:16px!important;line-height:1.15!important;white-space:nowrap!important}
      nav.fixed.top-0>.container>div>a:first-child>div:nth-child(2){min-width:0!important}
      nav.fixed.top-0>.container>div>a:first-child>div:nth-child(2) span:first-child{display:block!important;color:#fff!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(17px,2vw,24px)!important;font-weight:700!important;line-height:1.28!important;letter-spacing:.012em!important}
      nav.fixed.top-0>.container>div>a:first-child>div:nth-child(2) span:last-child{display:block!important;margin-top:3px!important;color:#e3b642!important;font-size:clamp(10px,1.05vw,13px)!important;font-weight:700!important;line-height:1.3!important}
      nav.fixed.top-0 .btn-cta{flex:0 0 auto!important;min-height:48px!important;padding:0 22px!important;border:1px solid rgba(224,176,49,.9)!important;border-radius:999px!important;background:#fff!important;color:#0b2749!important;font-weight:800!important;white-space:nowrap!important}
      nav.fixed.top-0 button{flex:0 0 48px!important;width:48px!important;min-width:48px!important;height:48px!important;border:1px solid rgba(255,255,255,.28)!important;border-radius:13px!important;background:rgba(255,255,255,.035)!important;color:#fff!important}
      nav.fixed.top-0>div:nth-child(2){border-top:1px solid rgba(255,255,255,.07)!important;background:rgba(4,19,39,.46)!important}
      @media(min-width:1101px){nav.fixed.top-0>.container>div{min-height:78px!important}nav.fixed.top-0>.container>div>a:first-child>div:first-child{padding:10px 18px!important;font-size:19px!important}nav.fixed.top-0 button{display:none!important}}
      @media(min-width:601px) and (max-width:1100px){nav.fixed.top-0>.container{padding-inline:20px!important}nav.fixed.top-0>.container>div{min-height:76px!important}nav.fixed.top-0>.container>div>a:first-child>div:first-child{padding:10px 16px!important;font-size:17px!important}nav.fixed.top-0>.container>div>a:first-child>div:nth-child(2) span:first-child{font-size:clamp(18px,2.8vw,24px)!important;white-space:nowrap!important}nav.fixed.top-0>.container>div>a:first-child>div:nth-child(2) span:last-child{font-size:clamp(10px,1.45vw,13px)!important}nav.fixed.top-0 .btn-cta{min-height:48px!important;padding-inline:20px!important;font-size:13px!important}nav.fixed.top-0 button{width:48px!important;min-width:48px!important;height:48px!important}nav.fixed.top-0>div:nth-child(2){display:none!important}}
      @media(max-width:600px){nav.fixed.top-0>.container{padding-inline:9px!important}nav.fixed.top-0>.container>div{min-height:64px!important;padding-block:7px!important;gap:6px!important}nav.fixed.top-0>.container>div>a:first-child{gap:6px!important;max-width:calc(100% - 151px)!important}nav.fixed.top-0>.container>div>a:first-child>div:first-child{padding:5px 7px!important;border-radius:5px!important;font-size:10px!important}nav.fixed.top-0>.container>div>a:first-child>div:nth-child(2) span:first-child{font-size:clamp(12px,3.65vw,15px)!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}nav.fixed.top-0>.container>div>a:first-child>div:nth-child(2) span:last-child{display:none!important}nav.fixed.top-0 .btn-cta{min-height:42px!important;max-width:108px!important;padding-inline:9px!important;font-size:10.5px!important}nav.fixed.top-0 button{width:42px!important;min-width:42px!important;height:42px!important;flex-basis:42px!important;border-radius:11px!important}nav.fixed.top-0>div:nth-child(2){display:none!important}}

      #${SECTION_ID},#${SECTION_ID} *{box-sizing:border-box!important;min-width:0!important}
      #${SECTION_ID}{width:100%!important;margin:0!important;padding:clamp(18px,3.6vw,44px) clamp(10px,2.8vw,28px)!important;background:linear-gradient(180deg,#f7f9fc 0%,#fff 100%)!important;color:var(--ks-ink)!important;overflow:hidden!important;font-family:"Noto Sans JP",sans-serif!important}
      #${SECTION_ID} .ks-intro__inner{width:min(100%,1180px)!important;margin:0 auto!important;padding:clamp(28px,4.8vw,58px) clamp(14px,4.5vw,54px)!important;border:1px solid var(--ks-line)!important;border-radius:clamp(20px,3vw,30px)!important;background:#fff!important;box-shadow:0 16px 46px rgba(23,53,86,.075)!important;text-align:center!important;overflow:hidden!important}

      /* User-specified category pair: same size, same width, centered. */
      #${SECTION_ID} .ks-intro__categories{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:clamp(8px,1.6vw,14px)!important;width:min(100%,880px)!important;margin:0 auto clamp(22px,3vw,30px)!important}
      #${SECTION_ID} .ks-intro__category{display:flex!important;align-items:center!important;justify-content:center!important;min-height:clamp(66px,8vw,92px)!important;padding:12px 14px!important;border:1px solid var(--ks-line)!important;border-radius:18px!important;color:var(--ks-navy)!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(24px,3.25vw,34px)!important;font-weight:900!important;line-height:1.35!important;text-align:center!important;white-space:normal!important;box-shadow:0 7px 20px rgba(24,55,88,.045)!important}
      #${SECTION_ID} .ks-intro__category--pink{background:linear-gradient(180deg,var(--ks-pink-soft),#fff)!important;border-color:#f0cbd7!important;color:#b83e65!important}
      #${SECTION_ID} .ks-intro__category--blue{background:linear-gradient(180deg,var(--ks-blue-soft),#fff)!important;border-color:#ceddf0!important;color:#245f9f!important}

      /* Exactly two lines, at roughly half the category-card text size. */
      #${SECTION_ID} .ks-intro__kicker{margin:0 auto clamp(20px,2.8vw,26px)!important;color:#174c87!important;font-size:clamp(13px,1.6vw,17px)!important;font-weight:900!important;line-height:1.65!important;letter-spacing:.01em!important;text-align:center!important}
      #${SECTION_ID} .ks-intro__line{display:block!important;width:100%!important;text-align:center!important}

      #${SECTION_ID} .ks-intro__title{margin:0 auto clamp(18px,2.4vw,24px)!important;color:var(--ks-navy)!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(25px,3.7vw,40px)!important;font-weight:900!important;line-height:1.48!important;text-align:center!important}
      #${SECTION_ID} .ks-intro__resolution{margin:0 auto clamp(24px,3vw,32px)!important;color:#4f6075!important;font-size:clamp(13px,1.55vw,17px)!important;font-weight:500!important;line-height:1.8!important;text-align:center!important;white-space:nowrap!important}
      #${SECTION_ID} .ks-intro__rule{width:66px!important;height:4px!important;margin:0 auto clamp(26px,3vw,34px)!important;border-radius:999px!important;background:linear-gradient(90deg,var(--ks-gold),#efbd43)!important}

      #${SECTION_ID} .ks-intro__support{margin:0 auto clamp(18px,2.5vw,24px)!important;color:#43556d!important;font-size:clamp(12px,1.5vw,17px)!important;line-height:1.95!important;text-align:center!important}
      #${SECTION_ID} .ks-intro__support .ks-intro__line,#${SECTION_ID} .ks-intro__planner .ks-intro__line{white-space:nowrap!important}
      #${SECTION_ID} .ks-intro__planner{margin:0 auto clamp(28px,3.6vw,38px)!important;color:#53647a!important;font-size:clamp(12px,1.42vw,16px)!important;line-height:1.95!important;text-align:center!important}

      #${SECTION_ID} .ks-intro__proofs{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:12px!important;width:100%!important;margin:0 auto clamp(28px,4vw,40px)!important}
      #${SECTION_ID} .ks-proof{padding:clamp(18px,2.7vw,26px) 10px!important;border:1px solid #ead39b!important;border-radius:18px!important;background:linear-gradient(135deg,#fffdf8,#fff7e8)!important;box-shadow:0 8px 20px rgba(88,62,14,.05)!important;text-align:center!important;overflow:hidden!important}
      #${SECTION_ID} .ks-proof__value{display:block!important;color:#0e4a91!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(24px,3.25vw,34px)!important;font-weight:900!important;line-height:1.2!important;white-space:nowrap!important}
      #${SECTION_ID} .ks-proof__label{display:block!important;margin-top:7px!important;color:#8a6312!important;font-size:clamp(11px,1.05vw,13px)!important;font-weight:800!important;line-height:1.45!important}

      #${SECTION_ID} .ks-intro__benefits{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:12px!important;margin:0 0 clamp(24px,3.6vw,36px)!important;text-align:left!important}
      #${SECTION_ID} .ks-benefit{padding:20px 18px!important;border:1px solid var(--ks-line)!important;border-radius:18px!important;background:#fff!important;overflow:hidden!important}
      #${SECTION_ID} .ks-benefit--pink{border-top:5px solid var(--ks-pink)!important;background:linear-gradient(180deg,#fff8fa,#fff 46%)!important}
      #${SECTION_ID} .ks-benefit--green{border-top:5px solid var(--ks-green)!important;background:linear-gradient(180deg,#f7fcf9,#fff 46%)!important}
      #${SECTION_ID} .ks-benefit--blue{border-top:5px solid var(--ks-blue)!important;background:linear-gradient(180deg,#f7faff,#fff 46%)!important}
      #${SECTION_ID} .ks-benefit h3{margin:0!important;color:var(--ks-navy)!important;font-size:clamp(16px,1.6vw,20px)!important;font-weight:900!important;line-height:1.55!important}
      #${SECTION_ID} .ks-benefit p{margin:9px 0 0!important;color:#5d6b7e!important;font-size:clamp(13px,1.18vw,15px)!important;line-height:1.8!important}

      #${SECTION_ID} .ks-intro__direct{padding:clamp(20px,3vw,30px)!important;border:1px solid #f0cad6!important;border-radius:18px!important;background:linear-gradient(135deg,#fff6f9,#fff 60%,#fff9ef)!important;text-align:center!important;overflow:hidden!important}
      #${SECTION_ID} .ks-intro__direct h3{margin:0!important;color:var(--ks-navy)!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(19px,2.3vw,28px)!important;font-weight:900!important;line-height:1.55!important}
      #${SECTION_ID} .ks-intro__direct p{width:min(100%,780px)!important;margin:10px auto 0!important;color:#5d6b7e!important;font-size:clamp(13px,1.18vw,15px)!important;line-height:1.8!important}
      #${SECTION_ID} .ks-intro__actions{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:10px!important;width:min(100%,760px)!important;margin:20px auto 0!important}
      #${SECTION_ID} .ks-intro__cta{display:flex!important;align-items:center!important;justify-content:center!important;width:100%!important;min-height:54px!important;padding:13px 16px!important;border-radius:13px!important;text-decoration:none!important;font-size:clamp(13px,1.2vw,15px)!important;font-weight:900!important;line-height:1.4!important;text-align:center!important;white-space:normal!important;overflow-wrap:anywhere!important}
      #${SECTION_ID} .ks-intro__cta--primary{border:1px solid #d73869!important;background:linear-gradient(135deg,#eb4175,#de3568)!important;color:#fff!important;box-shadow:0 10px 22px rgba(222,53,104,.16)!important}
      #${SECTION_ID} .ks-intro__cta--secondary{border:1px solid #cbd8e6!important;background:#fff!important;color:var(--ks-navy)!important}

      @media(min-width:601px) and (max-width:1024px){
        #${SECTION_ID}{padding-inline:18px!important}
        #${SECTION_ID} .ks-intro__inner{padding:36px 28px!important}
        #${SECTION_ID} .ks-intro__proofs{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:12px!important}
        #${SECTION_ID} .ks-intro__benefits{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:10px!important}
      }
      @media(max-width:600px){
        #${SECTION_ID}{padding:12px 8px 22px!important}
        #${SECTION_ID} .ks-intro__inner{padding:25px 12px 24px!important;border-radius:20px!important}
        #${SECTION_ID} .ks-intro__categories{gap:7px!important;margin-bottom:20px!important}
        #${SECTION_ID} .ks-intro__category{min-height:58px!important;padding:10px 7px!important;border-radius:14px!important;font-size:clamp(20px,6vw,27px)!important}
        #${SECTION_ID} .ks-intro__kicker{font-size:clamp(12px,3.5vw,15px)!important;line-height:1.65!important}
        #${SECTION_ID} .ks-intro__title{font-size:clamp(22px,6.5vw,29px)!important}
        #${SECTION_ID} .ks-intro__resolution{font-size:clamp(11.5px,3.25vw,14px)!important}
        #${SECTION_ID} .ks-intro__support{font-size:clamp(11px,3.05vw,13.5px)!important;line-height:1.9!important}
        #${SECTION_ID} .ks-intro__planner{font-size:clamp(11px,3vw,13px)!important;line-height:1.9!important}
        #${SECTION_ID} .ks-intro__proofs{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important}
        #${SECTION_ID} .ks-proof{padding:16px 6px!important;border-radius:14px!important}
        #${SECTION_ID} .ks-proof__value{font-size:clamp(20px,6.2vw,28px)!important}
        #${SECTION_ID} .ks-intro__benefits{grid-template-columns:1fr!important;gap:9px!important}
        #${SECTION_ID} .ks-benefit{padding:17px 15px!important}
        #${SECTION_ID} .ks-intro__direct{padding:18px 14px!important;text-align:left!important}
        #${SECTION_ID} .ks-intro__actions{grid-template-columns:1fr!important;width:100%!important}
      }
      @media(max-width:359px){
        #${SECTION_ID} .ks-intro__category{font-size:18px!important}
        #${SECTION_ID} .ks-intro__resolution{font-size:11px!important}
        #${SECTION_ID} .ks-intro__support,#${SECTION_ID} .ks-intro__planner{font-size:10.5px!important}
      }
    `;
    document.head.appendChild(style);
  }

  function buildSection() {
    const section = document.createElement('section');
    section.id = SECTION_ID;
    section.setAttribute('aria-labelledby','ks-premium-intro-title');
    section.innerHTML = `
      <div class="ks-intro__inner">
        <div class="ks-intro__categories" aria-label="主な対応分野">
          <div class="ks-intro__category ks-intro__category--pink">英検・受験</div>
          <div class="ks-intro__category ks-intro__category--blue">不登校・通信制高校</div>
        </div>

        <p class="ks-intro__kicker">
          <span class="ks-intro__line">英検・受験・不登校まで、</span>
          <span class="ks-intro__line">1人のプロが一貫して伴走します。</span>
        </p>

        <h2 class="ks-intro__title" id="ks-premium-intro-title">「うちの子に合う先生が見つからない」</h2>
        <p class="ks-intro__resolution">そんなお悩みを、20年の経験で解決します。</p>
        <div class="ks-intro__rule" aria-hidden="true"></div>

        <p class="ks-intro__support">
          <span class="ks-intro__line">学校に通えている子も、通えていない子も、</span>
          <span class="ks-intro__line">お子様に最適な指導で英検・受験などに一貫対応。</span>
        </p>

        <p class="ks-intro__planner">
          <span class="ks-intro__line">進路指導や学習習慣の定着まで見据えた</span>
          <span class="ks-intro__line">お子様だけの学習プランナー。</span>
        </p>

        <div class="ks-intro__proofs" aria-label="指導実績と契約情報">
          <div class="ks-proof"><span class="ks-proof__value">20年超</span><span class="ks-proof__label">指導経験</span></div>
          <div class="ks-proof"><span class="ks-proof__value">1,000名超</span><span class="ks-proof__label">総指導生徒数</span></div>
          <div class="ks-proof"><span class="ks-proof__value">0円</span><span class="ks-proof__label">入会金・管理費・仲介手数料</span></div>
          <div class="ks-proof"><span class="ks-proof__value">全国対応</span><span class="ks-proof__label">オンライン個別指導</span></div>
        </div>

        <div class="ks-intro__benefits">
          <article class="ks-benefit ks-benefit--pink"><h3>「この子には何が必要か」から考える</h3><p>決まった型ではなく、現在地・目標・苦手・性格を見て、優先順位から一緒に組み立てます。</p></article>
          <article class="ks-benefit ks-benefit--green"><h3>相談した本人が、そのまま授業を担当</h3><p>相談担当と講師が別になりません。保護者から伺った内容を、そのまま指導へつなげられるのが個人契約の強みです。</p></article>
          <article class="ks-benefit ks-benefit--blue"><h3>英検・受験・学習習慣・進路まで一貫対応</h3><p>点数だけでなく、学習習慣や進路まで長期的に伴走。状況が変わっても相談先を変える必要がありません。</p></article>
        </div>

        <div class="ks-intro__direct">
          <h3>講師を「紹介してもらう」のではなく、鈴木雄太本人と直接契約。</h3>
          <p>入会金・管理費・仲介手数料は不要です。まずは「お子様と指導方針が合いそうか」を無料相談・体験授業で確かめてください。</p>
          <div class="ks-intro__actions">
            <a class="ks-intro__cta ks-intro__cta--primary" href="#contact">無料相談・体験授業について相談する</a>
            <a class="ks-intro__cta ks-intro__cta--secondary" href="/hikaku/">料金・担当体制を比較して見る</a>
          </div>
        </div>
      </div>
    `;
    return section;
  }

  function removeLegacy() {
    document.getElementById('pc-proofbar')?.remove();
    document.querySelectorAll('.pc-decision').forEach(el=>el.remove());
    document.getElementById('ks-premium-intro-v1')?.remove();
  }

  function rebuild() {
    injectStyles();
    removeLegacy();
    const main = document.querySelector('main');
    if (!main) return;

    let section = document.getElementById(SECTION_ID);
    const legacy = Array.from(main.querySelectorAll('.ks-mobile-section1-final')).find(el=>el.id !== SECTION_ID) || null;
    if (!section) {
      section = buildSection();
      if (legacy) legacy.replaceWith(section);
      else {
        const hero = main.firstElementChild;
        if (hero) hero.insertAdjacentElement('afterend',section);
        else main.prepend(section);
      }
    }
    main.querySelectorAll('.ks-mobile-section1-final').forEach(el=>{if(el.id!==SECTION_ID) el.remove()});
  }

  function run(){scheduled=false;rebuild()}
  function schedule(){if(scheduled)return;scheduled=true;requestAnimationFrame(run)}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run,{once:true}); else run();
  window.addEventListener('load',run,{once:true});
  window.addEventListener('resize',schedule,{passive:true});
  document.fonts?.ready?.then(run);
  const root=document.getElementById('root')||document.body;
  if(root)new MutationObserver(schedule).observe(root,{childList:true,subtree:true});
})();
