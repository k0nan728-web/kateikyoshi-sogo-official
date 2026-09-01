(() => {
  'use strict';
  const ID = 'ks-premium-intro-v6';
  const STYLE_ID = 'ks-section1-consolidated-v9';
  const VERSION = '9';
  let mounted = false;
  let resizeTimer = 0;

  const norm = s => (s || '').replace(/\s+/g, '').trim();

  function injectStyle() {
    document.querySelectorAll('[id^="ks-section1-approved-reference-v"],#ks-section1-visual-match-v1,#ks-section1-visual-match-v2,#ks-section1-device-final-pass-v2,#ks-section1-xsmax-final-pass-v1').forEach(el => el.remove());
    if (document.getElementById(STYLE_ID)) return;
    const s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent = `
      #${ID}{--n:#082f59;--g:#d7a21f;--r:#df3568;--b:#286fc0;--gr:#35a36b;--t:#173e67;width:100%!important;padding:12px 8px 30px!important;background:linear-gradient(180deg,#f4f7fb,#eef3f8)!important;overflow:hidden!important}
      #${ID},#${ID} *{box-sizing:border-box!important;min-width:0!important}
      #${ID} .ks-panel{width:min(100%,1220px)!important;margin:0 auto!important;padding:42px 40px 38px!important;border:1px solid rgba(202,177,113,.48)!important;border-radius:22px!important;background:linear-gradient(135deg,#fff 0%,#fffefb 68%,#fff8e9 100%)!important;box-shadow:0 18px 42px rgba(20,47,78,.08),inset 0 1px 0 #fff!important;text-align:center!important;overflow:hidden!important}

      #${ID} .ks-categories{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:18px!important;width:100%!important;max-width:1120px!important;margin:0 auto 46px!important}
      #${ID} .ks-category{display:flex!important;align-items:center!important;justify-content:center!important;min-height:112px!important;padding:10px 14px!important;gap:12px!important;border-radius:18px!important;background:linear-gradient(180deg,#fff,#fffefd)!important;font-family:"Noto Serif JP",serif!important;font-weight:900!important;line-height:1.05!important;white-space:nowrap!important;box-shadow:0 9px 22px rgba(27,53,82,.045),inset 0 0 0 1px rgba(255,255,255,.9)!important}
      #${ID} .ks-category>span{display:inline-block!important;white-space:nowrap!important;font-family:"Noto Serif JP",serif!important;font-weight:900!important;line-height:1.05!important;letter-spacing:0!important}
      #${ID} .ks-category svg{width:48px!important;height:48px!important;flex:0 0 48px!important;stroke-width:1.8!important}
      #${ID} .ks-category.rose{border:2px solid #e85884!important;color:var(--r)!important}#${ID} .ks-category.blue{border:2px solid #4f91da!important;color:var(--b)!important}

      #${ID} .ks-hero{max-width:1120px!important;margin:0 auto 19px!important;color:var(--n)!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(46px,5vw,60px)!important;font-weight:900!important;line-height:1.26!important;text-align:center!important}
      #${ID} .ks-hero .semantic-line{display:block!important;white-space:nowrap!important;font:inherit!important}#${ID} .ks-hero .mobile-split{display:inline!important;white-space:nowrap!important;font:inherit!important}
      #${ID} .ornament{margin:0 auto 30px!important}#${ID} .ornament:before,#${ID} .ornament:after{width:46px!important;height:2px!important;background:var(--g)!important}#${ID} .ornament i{width:6px!important;height:6px!important;background:var(--g)!important}
      #${ID} .ks-question{margin:0 auto 18px!important;color:var(--n)!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(34px,4vw,48px)!important;font-weight:900!important;line-height:1.38!important;white-space:nowrap!important;text-align:center!important}
      #${ID} .ks-resolution{margin:0 auto 31px!important;color:var(--n)!important;font-size:clamp(17px,1.8vw,20px)!important;font-weight:800!important;line-height:1.65!important;white-space:nowrap!important;text-align:center!important}#${ID} .ks-resolution strong{display:inline!important;color:#d29a10!important;font-family:"Noto Serif JP",serif!important;font-size:1.72em!important;font-weight:900!important}
      #${ID} .ks-copy{margin:0 auto!important;color:var(--t)!important;font-size:clamp(14px,1.55vw,17px)!important;font-weight:700!important;line-height:1.72!important;text-align:center!important}#${ID} .ks-copy .semantic-line{display:block!important;white-space:nowrap!important}#${ID} .ks-copy.ks-support-block{margin-bottom:32px!important}
      #${ID} .ks-planner{display:block!important;margin:0 auto 41px!important;text-align:center!important}#${ID} .planner-lead{display:block!important;color:var(--t)!important;font-size:clamp(14px,1.5vw,16.5px)!important;font-weight:700!important;line-height:1.65!important;white-space:nowrap!important}#${ID} .planner-emphasis{display:block!important;margin:18px auto 0!important;color:var(--n)!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(31px,3.45vw,39px)!important;font-weight:900!important;line-height:1.26!important;white-space:nowrap!important}
      #${ID} .divider{height:1px!important;width:100%!important;margin:36px 0!important;background:linear-gradient(90deg,transparent,#dfd2b6 7%,#dfd2b6 93%,transparent)!important}

      #${ID} .section-title{margin:0 auto 30px!important;color:var(--n)!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(38px,4.3vw,52px)!important;font-weight:900!important;line-height:1.25!important;text-align:center!important;white-space:normal!important}
      #${ID} .section-title-prefix,#${ID} .section-title-promise{display:inline-block!important;white-space:nowrap!important}#${ID} .section-title-promise strong{display:inline!important;color:#d39a10!important;font-size:1.2em!important}

      #${ID} .promises{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:18px!important}
      #${ID} .promise{min-height:300px!important;padding:26px 24px 28px!important;border:1px solid #d8dfe6!important;border-radius:18px!important;background:linear-gradient(180deg,#fff,#fffefd)!important;box-shadow:0 9px 22px rgba(27,53,82,.055),inset 0 1px 0 rgba(255,255,255,.94)!important}
      #${ID} .promise-head{display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:14px!important;margin-bottom:22px!important;text-align:center!important}
      #${ID} .icon{display:grid!important;place-items:center!important;width:74px!important;height:74px!important;flex:0 0 74px!important;margin:0 auto!important;border-width:1.8px!important;background:#fff!important}#${ID} .icon svg{width:40px!important;height:40px!important}
      #${ID} .promise h3{width:100%!important;margin:0!important;color:#082f59!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(28px,2.55vw,36px)!important;font-weight:900!important;line-height:1.38!important;text-align:center!important;letter-spacing:0!important}
      #${ID} .promise-title-line{display:block!important;white-space:nowrap!important;text-align:center!important}
      #${ID} .promise p{margin:0!important;color:#53677e!important;font-size:clamp(15px,1.25vw,17px)!important;font-weight:600!important;line-height:1.82!important;text-align:center!important}
      #${ID} .promise-body-wide{display:block!important}#${ID} .promise-body-mobile{display:none!important}#${ID} .promise-body-line{display:block!important;white-space:nowrap!important}

      #${ID} .proofs{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:13px!important}#${ID} .proof{min-height:112px!important;padding:14px 10px!important;border:1.5px solid #dfc67d!important;border-radius:14px!important;background:linear-gradient(180deg,#fffefb,#fff8e8)!important}#${ID} .proof strong{display:block!important;color:#0c4b8a!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(30px,3.5vw,41px)!important;font-weight:900!important;white-space:nowrap!important}#${ID} .proof span{display:block!important;margin-top:7px!important;color:#6f5520!important;font-size:clamp(10px,1vw,12px)!important;font-weight:800!important}#${ID} .note{margin:10px 4px 0 auto!important;color:#6e7b8b!important;font-size:clamp(9.5px,.9vw,11px)!important;text-align:right!important}

      #${ID} .cta-strip{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(340px,40%)!important;align-items:center!important;gap:22px!important;margin-top:27px!important;padding:18px 22px!important;border:1.5px solid #ecadc0!important;border-radius:15px!important;background:linear-gradient(135deg,#fff6f9,#fff)!important;text-align:left!important;overflow:hidden!important}#${ID} .cta-copy{display:flex!important;align-items:center!important;gap:14px!important}#${ID} .cta-badge{width:58px!important;height:58px!important;flex:0 0 58px!important}#${ID} .cta-copy strong{display:block!important;color:var(--n)!important;font-size:clamp(17px,1.7vw,20px)!important;font-weight:900!important;line-height:1.4!important}#${ID} .cta-copy span{display:block!important;margin-top:5px!important;color:#53677e!important;font-size:clamp(11px,1.05vw,13px)!important;line-height:1.5!important}#${ID} .cta{position:static!important;transform:none!important;width:100%!important;min-height:60px!important;margin:0!important;padding:12px 15px!important;border-radius:11px!important;background:linear-gradient(135deg,#ed3d75,#df3269)!important;color:#fff!important;font-size:clamp(13px,1.25vw,15px)!important;font-weight:900!important;text-align:center!important}

      .ks-section1-comparison-v9{position:relative!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;width:100%!important;max-width:1080px!important;min-height:175px!important;margin:30px auto 0!important;padding:24px 84px 28px!important;border:1.5px solid #d8b34c!important;border-left:7px solid #d6a520!important;border-radius:18px!important;background:linear-gradient(135deg,#fffdf5,#fff4d4)!important;box-shadow:0 12px 28px rgba(75,55,12,.09),inset 0 1px 0 #fff!important;color:#0b3c70!important;text-align:center!important;text-decoration:none!important;overflow:hidden!important}.ks-section1-comparison-v9 .ks-comparison-kicker{display:block!important;margin:0 0 11px!important;color:#9c7214!important;font-size:15px!important;font-weight:800!important;letter-spacing:.16em!important}.ks-section1-comparison-v9 .ks-comparison-title-main{display:block!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(24px,2.3vw,31px)!important;font-weight:900!important;line-height:1.4!important}.ks-section1-comparison-v9 .ks-comparison-title-price{display:block!important;margin-top:8px!important;font-family:"Noto Serif JP",serif!important;font-size:clamp(36px,3.4vw,46px)!important;font-weight:900!important;line-height:1.2!important;white-space:nowrap!important}.ks-section1-comparison-v9 .ks-comparison-arrow{position:absolute!important;right:24px!important;top:50%!important;transform:translateY(-50%)!important;display:grid!important;place-items:center!important;width:54px!important;height:54px!important;border-radius:50%!important;background:#164f8d!important;color:#fff!important;font-size:25px!important}

      @media(max-width:1199px){
        #${ID} .section-title{font-size:clamp(34px,5vw,46px)!important}
        #${ID} .section-title-prefix,#${ID} .section-title-promise{display:block!important;width:100%!important;text-align:center!important}#${ID} .section-title-promise{margin-top:8px!important}
        #${ID} .promises{grid-template-columns:1fr!important;gap:20px!important}
        #${ID} .promise{min-height:0!important;padding:30px 30px 32px!important}
        #${ID} .promise h3{font-size:clamp(31px,4.4vw,40px)!important}
        #${ID} .promise p{font-size:clamp(17px,2.1vw,20px)!important}
        #${ID} .icon{width:82px!important;height:82px!important;flex-basis:82px!important}#${ID} .icon svg{width:44px!important;height:44px!important}
      }
      @media(min-width:680px) and (max-width:834px){#${ID} .ks-panel{padding:32px 22px 30px!important}#${ID} .ks-categories{gap:14px!important;margin-bottom:40px!important}#${ID} .ks-category{min-height:94px!important;padding:9px 8px!important;gap:8px!important}#${ID} .ks-category svg{width:38px!important;height:38px!important;flex-basis:38px!important}#${ID} .ks-hero{font-size:clamp(36px,5.45vw,45px)!important}#${ID} .ks-question{font-size:clamp(30px,4.5vw,37px)!important}#${ID} .cta-strip{grid-template-columns:1fr!important;gap:15px!important;text-align:center!important}#${ID} .cta-copy{justify-content:center!important;text-align:left!important}}
      @media(max-width:679px){
        #${ID}{padding:8px 5px 22px!important}#${ID} .ks-panel{padding:25px 13px 24px!important;border-radius:18px!important}
        #${ID} .ks-categories{grid-template-columns:1fr!important;gap:10px!important;width:100%!important;margin-bottom:31px!important}#${ID} .ks-category{min-height:78px!important;padding:8px 10px!important;gap:10px!important}#${ID} .ks-category svg{width:36px!important;height:36px!important;flex-basis:36px!important}
        #${ID} .ks-hero{font-size:clamp(28px,6.4vw,36px)!important;line-height:1.34!important}#${ID} .ks-hero .semantic-line{white-space:normal!important}#${ID} .ks-hero .mobile-split{display:block!important}
        #${ID} .ks-question{font-size:clamp(23px,6vw,30px)!important;white-space:normal!important}#${ID} .ks-resolution{font-size:clamp(13.5px,3.3vw,15px)!important;white-space:normal!important}#${ID} .ks-copy{font-size:clamp(12px,2.9vw,13.5px)!important}#${ID} .ks-copy .semantic-line{white-space:normal!important}#${ID} .planner-lead{font-size:clamp(12px,2.9vw,13.5px)!important;white-space:normal!important}#${ID} .planner-emphasis{font-size:clamp(23px,5.7vw,28px)!important;white-space:normal!important}
        #${ID} .section-title{font-size:clamp(30px,8vw,39px)!important;margin-bottom:30px!important}
        #${ID} .promise{padding:24px 18px 26px!important}#${ID} .promise h3{font-size:clamp(27px,7.2vw,34px)!important;line-height:1.42!important}#${ID} .promise p{font-size:clamp(15px,4vw,17px)!important}#${ID} .icon{width:74px!important;height:74px!important;flex-basis:74px!important}#${ID} .icon svg{width:40px!important;height:40px!important}
        #${ID} .promise-body-wide{display:none!important}#${ID} .promise-body-mobile{display:block!important}
        #${ID} .proofs{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:9px!important}#${ID} .proof strong{font-size:clamp(27px,6.8vw,32px)!important}#${ID} .note{text-align:center!important;margin-inline:auto!important}
        #${ID} .cta-strip{grid-template-columns:1fr!important;gap:13px!important;padding:15px!important;text-align:center!important}#${ID} .cta-copy{justify-content:center!important;text-align:left!important}#${ID} .cta{width:100%!important}
        .ks-section1-comparison-v9{min-height:205px!important;padding:26px 48px 28px 18px!important}.ks-section1-comparison-v9 .ks-comparison-title-main{font-size:clamp(19px,4.8vw,22px)!important;line-height:1.55!important}.ks-section1-comparison-v9 .ks-comparison-title-price{font-size:clamp(31px,7.4vw,36px)!important}.ks-section1-comparison-v9 .ks-comparison-arrow{right:13px!important;width:42px!important;height:42px!important}
      }
    `;
    document.head.appendChild(s);
  }

  function fitText(el, available, min, max) {
    if (!el || available <= 0) return;
    let lo = min, hi = max;
    for (let i = 0; i < 9; i++) {
      const m = (lo + hi) / 2;
      el.style.setProperty('font-size', m + 'px', 'important');
      if (el.scrollWidth <= available + 1) lo = m; else hi = m;
    }
    el.style.setProperty('font-size', lo.toFixed(2) + 'px', 'important');
  }

  function fitCategories() {
    const sec = document.getElementById(ID); if (!sec) return;
    const cards = [...sec.querySelectorAll('.ks-category')]; if (!cards.length) return;
    const max = innerWidth >= 1200 ? 48 : innerWidth >= 835 ? 43 : innerWidth >= 680 ? 35 : 39;
    let common = max;
    cards.forEach(card => {
      const label = card.querySelector('span'), icon = card.querySelector('svg'); if (!label) return;
      const cs = getComputedStyle(card), pad = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight), gap = parseFloat(cs.gap) || 0, iw = icon ? icon.getBoundingClientRect().width : 0;
      fitText(label, card.clientWidth - pad - gap - iw - 6, 22, max);
      common = Math.min(common, parseFloat(label.style.fontSize) || max);
    });
    cards.forEach(card => card.querySelector('span')?.style.setProperty('font-size', common.toFixed(2) + 'px', 'important'));
  }

  function normalizeCopy() {
    const sec = document.getElementById(ID); if (!sec) return false;
    const hero = sec.querySelector('.ks-hero'); if (hero && hero.dataset.ref !== VERSION) { hero.innerHTML = '<span class="semantic-line">英検・受験・不登校まで、</span><span class="semantic-line">1人のプロが一貫して<span class="mobile-split">伴走します。</span></span>'; hero.dataset.ref = VERSION; }
    const q = sec.querySelector('.ks-question'); if (q) q.textContent = '「うちの子に合う先生が見つからない」';
    const r = sec.querySelector('.ks-resolution'); if (r) r.innerHTML = 'そんなお悩みを、<strong>20年</strong>の経験で解決します。';
    const copies = sec.querySelectorAll('.ks-copy'); if (copies[0] && copies[0].dataset.ref !== VERSION) { copies[0].classList.add('ks-support-block'); copies[0].innerHTML = '<span class="semantic-line">学校に通えている子も、通えていない子も、</span><span class="semantic-line">お子様に最適な指導で英検・受験などに一貫対応。</span>'; copies[0].dataset.ref = VERSION; }
    const planner = sec.querySelector('.ks-planner'); if (planner && planner.dataset.ref !== VERSION) { planner.innerHTML = '<span class="planner-lead">進路指導や学習習慣の定着まで見据えた</span><span class="planner-emphasis">お子様だけの学習プランナー。</span>'; planner.dataset.ref = VERSION; }
    const title = sec.querySelector('.section-title'); if (title) title.innerHTML = '<span class="section-title-prefix">一人ひとりに合わせるための、</span><span class="section-title-promise"><strong>3</strong>つの約束</span>';
    const headingLines = [['お子様に合わせた','オーダーメイド指導'],['相談から授業まで','同じプロが担当'],['英検・受験・進路まで','長期的に伴走']];
    const bodyWide = [['現在地・目標・性格・生活環境を丁寧に把握し、','最適な学習計画を一緒に作ります。'],['相談した内容がそのまま指導につながるので、','安心して何でも相談できます。'],['点数だけでなく将来を見据えたサポートで、','学力と自信をしっかり育てます。']];
    const bodyMobile = [['現在地・目標・性格・生活環境を','丁寧に把握し、','最適な学習計画を一緒に作ります。'],['相談した内容がそのまま','指導につながるので、','安心して何でも相談できます。'],['点数だけでなく将来を見据えた','サポートで、','学力と自信をしっかり育てます。']];
    [...sec.querySelectorAll('.promise')].forEach((card,i) => {
      const h = card.querySelector('h3'), p = card.querySelector('p');
      if (h && headingLines[i]) h.innerHTML = headingLines[i].map(x => `<span class="promise-title-line">${x}</span>`).join('');
      if (p && bodyWide[i]) p.innerHTML = `<span class="promise-body-wide">${bodyWide[i].map(x=>`<span class="promise-body-line">${x}</span>`).join('')}</span><span class="promise-body-mobile">${bodyMobile[i].map(x=>`<span class="promise-body-line">${x}</span>`).join('')}</span>`;
    });
    return true;
  }

  function comparison() {
    const nodes = [...document.querySelectorAll('a[href],aside,div')].filter(el => { const t = norm(el.textContent); return t.includes('料金・担当体制を比較して選ぶ') || t.includes('他の塾・予備校・家庭教師センターと料金を比較する') || (t.includes('CONTRACTCOMPARISON') && t.includes('料金')); }).sort((a,b)=>a.querySelectorAll('*').length-b.querySelectorAll('*').length);
    if (!nodes[0]) return false;
    const box = nodes[0].tagName === 'A' ? nodes[0] : (nodes[0].closest('a[href]') || nodes[0].querySelector('a[href]') || nodes[0]);
    box.classList.remove('ks-section1-comparison-v6','ks-section1-comparison-v7','ks-section1-comparison-v8','ks-section01-contract-route-fixed'); box.classList.add('ks-section1-comparison-v9');
    if (box.dataset.ref !== VERSION) { box.innerHTML = '<span class="ks-comparison-kicker">CONTRACT COMPARISON</span><span class="ks-comparison-title"><span class="ks-comparison-title-main">他の塾・予備校・家庭教師センターと</span><span class="ks-comparison-title-price">料金を比較する</span></span><span class="ks-comparison-arrow" aria-hidden="true">→</span>'; box.dataset.ref = VERSION; }
    return true;
  }

  function apply() {
    injectStyle();
    const ok = normalizeCopy();
    comparison();
    requestAnimationFrame(() => fitCategories());
    return ok;
  }

  function mountBounded() {
    let tries = 0;
    const timer = setInterval(() => {
      tries++;
      if (apply() || tries >= 30) { clearInterval(timer); mounted = true; }
    }, 100);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountBounded, { once:true }); else mountBounded();
  window.addEventListener('load', () => { if (!mounted) apply(); else { comparison(); fitCategories(); } }, { once:true });
  document.fonts?.ready?.then(() => requestAnimationFrame(fitCategories));
  window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => requestAnimationFrame(fitCategories), 120); }, { passive:true });
})();