(() => {
  'use strict';

  const SECTION_ID = 'ks-premium-intro-v1';
  const STYLE_ID = 'ks-premium-intro-style-v1';
  let scheduled = false;

  function injectStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      :root{
        --ks-navy:#0b2f5b;
        --ks-navy-deep:#082443;
        --ks-ink:#24364d;
        --ks-muted:#66758a;
        --ks-line:#dce5ef;
        --ks-soft:#f7f9fc;
        --ks-pink:#e83f73;
        --ks-pink-soft:#fff1f5;
        --ks-green:#22815c;
        --ks-green-soft:#f1fbf6;
        --ks-blue:#2768b2;
        --ks-blue-soft:#f2f7ff;
        --ks-orange:#c97916;
        --ks-orange-soft:#fff8ec;
        --ks-gold:#d9a825;
      }

      /* Header: keep the completed layout, only give the Pro Tutor badge more presence. */
      nav.fixed.top-0{
        background:rgba(9,29,55,.985)!important;
        border-bottom:1px solid rgba(214,170,55,.34)!important;
        box-shadow:0 8px 28px rgba(7,22,43,.16)!important;
        backdrop-filter:blur(14px)!important;
        -webkit-backdrop-filter:blur(14px)!important;
        overflow:visible!important;
      }
      nav.fixed.top-0>.container{width:100%!important;max-width:1280px!important;margin-inline:auto!important;padding-inline:clamp(14px,2.6vw,34px)!important}
      nav.fixed.top-0>.container>div{min-height:72px!important;padding-block:9px!important;gap:clamp(8px,1.4vw,18px)!important;align-items:center!important}
      nav.fixed.top-0>.container>div>a:first-child{min-width:0!important;flex:1 1 auto!important;gap:clamp(8px,1.2vw,15px)!important;text-decoration:none!important}
      nav.fixed.top-0>.container>div>a:first-child>div:first-child{
        flex:0 0 auto!important;border:1px solid rgba(221,177,56,.95)!important;border-radius:7px!important;
        padding:9px 15px!important;color:#f8df91!important;background:rgba(255,255,255,.025)!important;
        font-weight:800!important;font-size:16px!important;line-height:1.15!important;white-space:nowrap!important;
      }
      nav.fixed.top-0>.container>div>a:first-child>div:nth-child(2){min-width:0!important}
      nav.fixed.top-0>.container>div>a:first-child>div:nth-child(2) span:first-child{
        display:block!important;color:#fff!important;font-family:"Noto Serif JP",serif!important;
        font-size:clamp(17px,2vw,24px)!important;font-weight:700!important;line-height:1.28!important;letter-spacing:.012em!important;
      }
      nav.fixed.top-0>.container>div>a:first-child>div:nth-child(2) span:last-child{
        display:block!important;margin-top:3px!important;color:#e3b642!important;font-size:clamp(10px,1.05vw,13px)!important;font-weight:700!important;line-height:1.3!important;
      }
      nav.fixed.top-0 .btn-cta{flex:0 0 auto!important;min-height:48px!important;padding:0 22px!important;border:1px solid rgba(224,176,49,.9)!important;border-radius:999px!important;background:#fff!important;color:#0b2749!important;font-weight:800!important;white-space:nowrap!important}
      nav.fixed.top-0 button{flex:0 0 48px!important;width:48px!important;min-width:48px!important;height:48px!important;border:1px solid rgba(255,255,255,.28)!important;border-radius:13px!important;background:rgba(255,255,255,.035)!important;color:#fff!important}
      nav.fixed.top-0>div:nth-child(2){border-top:1px solid rgba(255,255,255,.07)!important;background:rgba(4,19,39,.46)!important}

      @media(min-width:1101px){
        nav.fixed.top-0>.container>div{min-height:78px!important}
        nav.fixed.top-0>.container>div>a:first-child>div:first-child{padding:10px 17px!important;font-size:18px!important}
        nav.fixed.top-0 button{display:none!important}
      }
      @media(min-width:601px) and (max-width:1100px){
        nav.fixed.top-0>.container{padding-inline:20px!important}
        nav.fixed.top-0>.container>div{min-height:76px!important}
        nav.fixed.top-0>.container>div>a:first-child>div:first-child{padding:9px 15px!important;font-size:16px!important}
        nav.fixed.top-0>.container>div>a:first-child>div:nth-child(2) span:first-child{font-size:clamp(18px,2.8vw,24px)!important;white-space:nowrap!important}
        nav.fixed.top-0>.container>div>a:first-child>div:nth-child(2) span:last-child{font-size:clamp(10px,1.45vw,13px)!important}
        nav.fixed.top-0 .btn-cta{min-height:48px!important;padding-inline:20px!important;font-size:13px!important}
        nav.fixed.top-0 button{width:48px!important;min-width:48px!important;height:48px!important}
        nav.fixed.top-0>div:nth-child(2){display:none!important}
      }
      @media(max-width:600px){
        nav.fixed.top-0>.container{padding-inline:9px!important}
        nav.fixed.top-0>.container>div{min-height:64px!important;padding-block:7px!important;gap:6px!important}
        nav.fixed.top-0>.container>div>a:first-child{gap:6px!important;max-width:calc(100% - 151px)!important}
        nav.fixed.top-0>.container>div>a:first-child>div:first-child{padding:5px 7px!important;border-radius:5px!important;font-size:10px!important}
        nav.fixed.top-0>.container>div>a:first-child>div:nth-child(2) span:first-child{font-size:clamp(12px,3.65vw,15px)!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}
        nav.fixed.top-0>.container>div>a:first-child>div:nth-child(2) span:last-child{display:none!important}
        nav.fixed.top-0 .btn-cta{min-height:42px!important;max-width:108px!important;padding-inline:9px!important;font-size:10.5px!important}
        nav.fixed.top-0 button{width:42px!important;min-width:42px!important;height:42px!important;flex-basis:42px!important;border-radius:11px!important}
        nav.fixed.top-0>div:nth-child(2){display:none!important}
      }
      @media(max-width:359px){
        nav.fixed.top-0>.container>div>a:first-child{max-width:calc(100% - 137px)!important}
        nav.fixed.top-0>.container>div>a:first-child>div:first-child{display:none!important}
        nav.fixed.top-0 .btn-cta{max-width:93px!important;padding-inline:7px!important;font-size:10px!important}
        nav.fixed.top-0 button{width:39px!important;min-width:39px!important;height:39px!important;flex-basis:39px!important}
      }

      /* Section 01: trust, fit and direct-contract value. */
      #${SECTION_ID},#${SECTION_ID} *{box-sizing:border-box!important;min-width:0!important}
      #${SECTION_ID}{
        width:100%!important;margin:0!important;padding:clamp(18px,3.6vw,46px) clamp(14px,3vw,30px)!important;
        background:linear-gradient(180deg,#f7f9fc 0%,#ffffff 100%)!important;color:var(--ks-ink)!important;overflow:hidden!important;
        font-family:"Noto Sans JP",sans-serif!important;
      }
      #${SECTION_ID} .ks-premium-intro__inner{
        width:min(100%,1180px)!important;margin:0 auto!important;padding:clamp(28px,5vw,64px) clamp(18px,5vw,62px)!important;
        border:1px solid var(--ks-line)!important;border-radius:clamp(20px,3vw,32px)!important;background:#fff!important;
        box-shadow:0 18px 52px rgba(23,53,86,.08)!important;text-align:center!important;
      }
      #${SECTION_ID} .ks-premium-intro__categories{display:flex!important;flex-wrap:wrap!important;justify-content:center!important;gap:8px!important;margin:0 auto clamp(18px,2.6vw,28px)!important}
      #${SECTION_ID} .ks-category-chip{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-height:34px!important;padding:6px 13px!important;border-radius:999px!important;font-size:clamp(12px,1.2vw,14px)!important;font-weight:800!important;line-height:1.35!important;white-space:nowrap!important}
      #${SECTION_ID} .ks-category-chip--pink{color:#b92d59!important;background:var(--ks-pink-soft)!important;border:1px solid #f3bfd0!important}
      #${SECTION_ID} .ks-category-chip--green{color:#17704d!important;background:var(--ks-green-soft)!important;border:1px solid #bfe5d1!important}
      #${SECTION_ID} .ks-category-chip--blue{color:#1f5f9f!important;background:var(--ks-blue-soft)!important;border:1px solid #c9dcf3!important}
      #${SECTION_ID} .ks-category-chip--orange{color:#a7620e!important;background:var(--ks-orange-soft)!important;border:1px solid #f0d4aa!important}
      #${SECTION_ID} .ks-premium-intro__kicker{margin:0 0 10px!important;color:var(--ks-blue)!important;font-size:clamp(13px,1.4vw,16px)!important;font-weight:900!important;letter-spacing:.06em!important;line-height:1.55!important}
      #${SECTION_ID} h2{max-width:20ch!important;margin:0 auto!important;color:var(--ks-navy)!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(27px,4.2vw,46px)!important;font-weight:900!important;line-height:1.46!important;letter-spacing:.01em!important;text-align:center!important;text-wrap:balance!important;word-break:normal!important;overflow-wrap:break-word!important}
      #${SECTION_ID} .ks-premium-intro__accent{display:inline!important;background:linear-gradient(transparent 67%,#fff0bd 67%)!important;color:inherit!important}
      #${SECTION_ID} .ks-premium-intro__lead{width:min(100%,810px)!important;margin:clamp(18px,2.8vw,28px) auto 0!important;color:#4f6075!important;font-size:clamp(15px,1.55vw,18px)!important;line-height:1.95!important;text-align:center!important;word-break:normal!important;overflow-wrap:break-word!important}
      #${SECTION_ID} .ks-premium-intro__lead strong{color:var(--ks-navy)!important;font-weight:900!important}
      #${SECTION_ID} .ks-premium-intro__rule{width:70px!important;height:4px!important;margin:clamp(20px,3vw,30px) auto!important;border:0!important;border-radius:999px!important;background:linear-gradient(90deg,var(--ks-gold),#efbd43)!important}

      #${SECTION_ID} .ks-premium-intro__proofs{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:12px!important;width:100%!important;margin:0 auto clamp(26px,4vw,40px)!important}
      #${SECTION_ID} .ks-proof-card{padding:clamp(16px,2.5vw,24px) 12px!important;border:1px solid var(--ks-line)!important;border-radius:18px!important;background:#fff!important;box-shadow:0 8px 22px rgba(25,53,83,.055)!important;text-align:center!important}
      #${SECTION_ID} .ks-proof-card__value{display:block!important;color:var(--ks-navy)!important;font-size:clamp(23px,3.1vw,36px)!important;font-weight:900!important;line-height:1.2!important;letter-spacing:-.02em!important}
      #${SECTION_ID} .ks-proof-card__label{display:block!important;margin-top:7px!important;color:#66758a!important;font-size:clamp(11px,1.1vw,13px)!important;font-weight:700!important;line-height:1.55!important}

      #${SECTION_ID} .ks-premium-intro__benefits{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:14px!important;margin:0 0 clamp(24px,4vw,38px)!important;text-align:left!important}
      #${SECTION_ID} .ks-benefit-card{position:relative!important;padding:clamp(18px,2.8vw,26px)!important;border:1px solid var(--ks-line)!important;border-radius:19px!important;background:#fff!important;overflow:hidden!important}
      #${SECTION_ID} .ks-benefit-card::before{content:""!important;position:absolute!important;left:0!important;top:0!important;right:0!important;height:5px!important;background:var(--ks-card-accent)!important}
      #${SECTION_ID} .ks-benefit-card--pink{--ks-card-accent:var(--ks-pink);background:linear-gradient(180deg,#fff8fa 0%,#fff 42%)!important}
      #${SECTION_ID} .ks-benefit-card--green{--ks-card-accent:var(--ks-green);background:linear-gradient(180deg,#f7fcf9 0%,#fff 42%)!important}
      #${SECTION_ID} .ks-benefit-card--blue{--ks-card-accent:var(--ks-blue);background:linear-gradient(180deg,#f7faff 0%,#fff 42%)!important}
      #${SECTION_ID} .ks-benefit-card__eyebrow{display:block!important;margin:0 0 8px!important;color:var(--ks-card-accent)!important;font-size:12px!important;font-weight:900!important;letter-spacing:.08em!important;line-height:1.4!important}
      #${SECTION_ID} .ks-benefit-card h3{margin:0!important;color:var(--ks-navy)!important;font-size:clamp(17px,1.7vw,21px)!important;font-weight:900!important;line-height:1.55!important}
      #${SECTION_ID} .ks-benefit-card p{margin:10px 0 0!important;color:#5a697d!important;font-size:clamp(13px,1.25vw,15px)!important;line-height:1.85!important}

      #${SECTION_ID} .ks-premium-intro__direct{
        display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;align-items:center!important;gap:clamp(18px,3vw,34px)!important;
        margin:0!important;padding:clamp(21px,3.4vw,32px)!important;border:1px solid #f2d3db!important;border-radius:20px!important;
        background:linear-gradient(135deg,#fff6f8 0%,#fff 62%,#fff9ed 100%)!important;text-align:left!important;
      }
      #${SECTION_ID} .ks-premium-intro__direct-copy{min-width:0!important}
      #${SECTION_ID} .ks-premium-intro__direct-label{margin:0 0 7px!important;color:var(--ks-pink)!important;font-size:12px!important;font-weight:900!important;letter-spacing:.08em!important}
      #${SECTION_ID} .ks-premium-intro__direct h3{margin:0!important;color:var(--ks-navy)!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(20px,2.5vw,30px)!important;font-weight:900!important;line-height:1.55!important}
      #${SECTION_ID} .ks-premium-intro__direct p{margin:8px 0 0!important;color:#596a7e!important;font-size:clamp(13px,1.25vw,15px)!important;line-height:1.8!important}
      #${SECTION_ID} .ks-premium-intro__actions{display:flex!important;flex-direction:column!important;gap:9px!important;width:min(100%,340px)!important}
      #${SECTION_ID} .ks-premium-intro__cta{display:inline-flex!important;align-items:center!important;justify-content:center!important;width:100%!important;min-height:54px!important;padding:13px 20px!important;border-radius:13px!important;text-decoration:none!important;font-size:clamp(14px,1.2vw,16px)!important;font-weight:900!important;line-height:1.35!important;text-align:center!important;transition:transform .18s ease,box-shadow .18s ease!important}
      #${SECTION_ID} .ks-premium-intro__cta--primary{border:1px solid #d83366!important;background:linear-gradient(135deg,#eb4175,#df3569)!important;color:#fff!important;box-shadow:0 11px 24px rgba(222,53,104,.18)!important}
      #${SECTION_ID} .ks-premium-intro__cta--secondary{border:1px solid #c9d5e3!important;background:#fff!important;color:var(--ks-navy)!important}
      #${SECTION_ID} .ks-premium-intro__cta:hover{transform:translateY(-1px)!important}
      #${SECTION_ID} .ks-premium-intro__note{grid-column:1/-1!important;margin:0!important;color:#748195!important;font-size:12px!important;line-height:1.65!important;text-align:center!important}

      @media(min-width:601px) and (max-width:1024px){
        #${SECTION_ID}{padding-inline:22px!important}
        #${SECTION_ID} .ks-premium-intro__inner{padding:clamp(34px,5vw,50px) clamp(24px,4vw,38px)!important}
        #${SECTION_ID} .ks-premium-intro__proofs{grid-template-columns:repeat(2,minmax(0,1fr))!important}
        #${SECTION_ID} .ks-premium-intro__benefits{grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:10px!important}
        #${SECTION_ID} .ks-benefit-card{padding:18px 16px!important}
        #${SECTION_ID} .ks-premium-intro__direct{grid-template-columns:1fr!important;text-align:center!important}
        #${SECTION_ID} .ks-premium-intro__actions{width:min(100%,620px)!important;margin-inline:auto!important;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important}
      }
      @media(max-width:600px){
        #${SECTION_ID}{padding:14px 10px 24px!important}
        #${SECTION_ID} .ks-premium-intro__inner{padding:26px 16px 24px!important;border-radius:20px!important;box-shadow:0 10px 28px rgba(23,53,86,.065)!important}
        #${SECTION_ID} .ks-premium-intro__categories{gap:6px!important;margin-bottom:18px!important}
        #${SECTION_ID} .ks-category-chip{min-height:30px!important;padding:5px 9px!important;font-size:11px!important}
        #${SECTION_ID} h2{max-width:100%!important;font-size:clamp(24px,7vw,31px)!important;line-height:1.5!important}
        #${SECTION_ID} .ks-premium-intro__lead{font-size:clamp(14px,4vw,16px)!important;line-height:1.9!important;text-align:left!important}
        #${SECTION_ID} .ks-premium-intro__proofs{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:8px!important;margin-bottom:24px!important}
        #${SECTION_ID} .ks-proof-card{padding:16px 8px!important;border-radius:14px!important}
        #${SECTION_ID} .ks-proof-card__value{font-size:clamp(22px,7vw,29px)!important}
        #${SECTION_ID} .ks-premium-intro__benefits{grid-template-columns:1fr!important;gap:10px!important;margin-bottom:22px!important}
        #${SECTION_ID} .ks-benefit-card{padding:18px 16px!important;border-radius:16px!important}
        #${SECTION_ID} .ks-benefit-card p{font-size:14px!important;line-height:1.8!important}
        #${SECTION_ID} .ks-premium-intro__direct{grid-template-columns:1fr!important;gap:17px!important;padding:19px 15px!important;border-radius:16px!important;text-align:left!important}
        #${SECTION_ID} .ks-premium-intro__direct h3{font-size:clamp(19px,5.7vw,24px)!important}
        #${SECTION_ID} .ks-premium-intro__actions{width:100%!important}
        #${SECTION_ID} .ks-premium-intro__cta{min-height:52px!important;font-size:14px!important}
      }
      @media(max-width:359px){
        #${SECTION_ID} .ks-premium-intro__categories{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important}
        #${SECTION_ID} .ks-category-chip{white-space:normal!important;text-align:center!important}
        #${SECTION_ID} .ks-premium-intro__proofs{grid-template-columns:1fr!important}
      }
      @media(prefers-reduced-motion:reduce){#${SECTION_ID} .ks-premium-intro__cta{transition:none!important}}
    `;
    document.head.appendChild(style);
  }

  function buildSection() {
    const section = document.createElement('section');
    section.id = SECTION_ID;
    section.setAttribute('aria-labelledby', 'ks-premium-intro-title');
    section.innerHTML = `
      <div class="ks-premium-intro__inner">
        <div class="ks-premium-intro__categories" aria-label="対応分野">
          <span class="ks-category-chip ks-category-chip--pink">英検</span>
          <span class="ks-category-chip ks-category-chip--green">中学・高校・大学受験</span>
          <span class="ks-category-chip ks-category-chip--blue">不登校・通信制高校</span>
          <span class="ks-category-chip ks-category-chip--orange">学習・進路相談</span>
        </div>
        <p class="ks-premium-intro__kicker">英検・受験・不登校まで、1人のプロが一貫して伴走します。</p>
        <h2 id="ks-premium-intro-title">「うちの子に合う先生が見つからない」<br><span class="ks-premium-intro__accent">その悩みに、20年以上の経験で向き合います。</span></h2>
        <p class="ks-premium-intro__lead">学校に通えている子も、通えていない子も。目標や性格、生活リズム、これまでのつまずきまで丁寧に整理し、<strong>お子さまだけの学習プラン</strong>をご提案します。無料相談から実際の授業まで、講師本人が直接対応します。</p>
        <div class="ks-premium-intro__rule" aria-hidden="true"></div>

        <div class="ks-premium-intro__proofs" aria-label="指導の基本情報">
          <div class="ks-proof-card"><span class="ks-proof-card__value">20年以上</span><span class="ks-proof-card__label">指導経験</span></div>
          <div class="ks-proof-card"><span class="ks-proof-card__value">1,000名超</span><span class="ks-proof-card__label">延べ指導人数</span></div>
          <div class="ks-proof-card"><span class="ks-proof-card__value">0円</span><span class="ks-proof-card__label">入会金・管理費・仲介手数料</span></div>
          <div class="ks-proof-card"><span class="ks-proof-card__value">全国対応</span><span class="ks-proof-card__label">オンライン個別指導</span></div>
        </div>

        <div class="ks-premium-intro__benefits">
          <article class="ks-benefit-card ks-benefit-card--pink">
            <span class="ks-benefit-card__eyebrow">PERSONAL FIT</span>
            <h3>「この子には何が必要か」から考える</h3>
            <p>決まった型に当てはめるのではなく、現在地・目標・苦手・性格を見て、優先順位から一緒に組み立てます。</p>
          </article>
          <article class="ks-benefit-card ks-benefit-card--green">
            <span class="ks-benefit-card__eyebrow">ONE-TO-ONE</span>
            <h3>相談した本人が、そのまま授業を担当</h3>
            <p>相談担当と講師が別になることはありません。保護者から伺った内容を、指導へ直接つなげられるのが個人契約の強みです。</p>
          </article>
          <article class="ks-benefit-card ks-benefit-card--blue">
            <span class="ks-benefit-card__eyebrow">WIDE SUPPORT</span>
            <h3>英検・受験・学習習慣・進路まで一貫対応</h3>
            <p>その場の点数だけでなく、学習習慣や進路も含めて長期的に伴走。状況が変わっても相談先を変える必要がありません。</p>
          </article>
        </div>

        <div class="ks-premium-intro__direct">
          <div class="ks-premium-intro__direct-copy">
            <p class="ks-premium-intro__direct-label">DIRECT CONTRACT</p>
            <h3>講師を「紹介してもらう」のではなく、鈴木雄太本人と直接契約。</h3>
            <p>入会金・管理費・仲介手数料は不要です。まずは料金を決める前に、「お子さまと指導方針が合いそうか」を無料相談で確かめてください。</p>
          </div>
          <div class="ks-premium-intro__actions">
            <a class="ks-premium-intro__cta ks-premium-intro__cta--primary" href="#contact">無料相談・体験授業について相談する →</a>
            <a class="ks-premium-intro__cta ks-premium-intro__cta--secondary" href="/hikaku/">料金・担当体制を比較して見る →</a>
          </div>
          <p class="ks-premium-intro__note">相談だけでも大丈夫です。状況を伺ったうえで、必要な指導と進め方を一緒に整理します。</p>
        </div>
      </div>
    `;
    return section;
  }

  function removeLegacyFirstConversionBlocks() {
    document.getElementById('pc-proofbar')?.remove();
    document.querySelectorAll('.pc-decision').forEach(el => el.remove());
  }

  function rebuildFirstSection() {
    injectStyles();
    removeLegacyFirstConversionBlocks();

    const main = document.querySelector('main');
    if (!main) return;

    let section = document.getElementById(SECTION_ID);
    const legacy = Array.from(main.querySelectorAll('.ks-mobile-section1-final')).find(el => el.id !== SECTION_ID) || null;

    if (!section) {
      section = buildSection();
      if (legacy) {
        legacy.replaceWith(section);
      } else {
        const hero = main.firstElementChild;
        if (hero) hero.insertAdjacentElement('afterend', section);
        else main.prepend(section);
      }
    }

    main.querySelectorAll('.ks-mobile-section1-final').forEach(el => {
      if (el.id !== SECTION_ID) el.remove();
    });
  }

  function run() {
    scheduled = false;
    rebuildFirstSection();
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(run);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });
  else run();
  window.addEventListener('load', run, { once: true });
  window.addEventListener('resize', schedule, { passive: true });
  document.fonts?.ready?.then(run);

  const root = document.getElementById('root') || document.body;
  if (root) new MutationObserver(schedule).observe(root, { childList: true, subtree: true });
})();
