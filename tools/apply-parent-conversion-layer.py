from pathlib import Path

path = Path('index.html')
text = path.read_text(encoding='utf-8')
marker = '<!-- PARENT-CONVERSION-LAYER:v1 -->'
if marker in text:
    raise SystemExit('already applied')

payload = r'''<!-- PARENT-CONVERSION-LAYER:v1 -->
<style id="parent-conversion-layer-style">
  :root{--pc-navy:#0b1f3a;--pc-blue:#164e9d;--pc-gold:#f59e0b;--pc-ink:#182230;--pc-muted:#566579;--pc-line:#dce5f0;--pc-mist:#f6f9fd;--pc-radius:20px}
  .pc-proofbar{display:grid;grid-template-columns:repeat(4,1fr);gap:0;max-width:1120px;margin:-1.5rem auto 3rem;padding:0 20px;position:relative;z-index:5}
  .pc-proofbar__item{padding:18px 16px;background:#fff;border:1px solid var(--pc-line);border-right:0;text-align:center;box-shadow:0 12px 32px rgba(11,31,58,.07)}
  .pc-proofbar__item:first-child{border-radius:16px 0 0 16px}.pc-proofbar__item:last-child{border-right:1px solid var(--pc-line);border-radius:0 16px 16px 0}
  .pc-proofbar__num{display:block;color:var(--pc-navy);font-weight:900;font-size:1.05rem;line-height:1.4}.pc-proofbar__label{display:block;margin-top:3px;color:var(--pc-muted);font-size:.78rem;line-height:1.5}
  .pc-decision{max-width:1120px;margin:0 auto 4.5rem;padding:0 20px}.pc-decision__inner{position:relative;overflow:hidden;border-radius:24px;padding:clamp(28px,5vw,48px);background:linear-gradient(135deg,#0b1f3a 0%,#123d77 100%);box-shadow:0 24px 60px rgba(11,31,58,.18);color:#fff}
  .pc-decision__inner:after{content:"";position:absolute;right:-120px;top:-140px;width:360px;height:360px;border-radius:50%;background:rgba(245,158,11,.12)}
  .pc-decision__eyebrow{margin:0 0 10px;color:#fcd34d;font-size:.82rem;font-weight:900;letter-spacing:.12em}.pc-decision h2{margin:0;max-width:22ch;color:#fff;font-size:clamp(1.65rem,3.4vw,2.55rem);line-height:1.45;font-weight:900}.pc-decision__lead{max-width:760px;margin:16px 0 24px;color:rgba(255,255,255,.86);font-size:1rem;line-height:1.9}.pc-decision__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:0 0 26px}.pc-decision__card{padding:16px;border:1px solid rgba(255,255,255,.16);border-radius:16px;background:rgba(255,255,255,.08)}.pc-decision__card strong{display:block;color:#fff;font-size:.98rem}.pc-decision__card span{display:block;margin-top:5px;color:rgba(255,255,255,.72);font-size:.8rem;line-height:1.65}.pc-decision__actions{display:flex;flex-wrap:wrap;gap:12px;align-items:center}.pc-decision__cta{display:inline-flex;align-items:center;justify-content:center;min-height:54px;padding:0 24px;border-radius:12px;background:linear-gradient(135deg,#f59e0b,#d97706);color:#fff!important;text-decoration:none!important;font-weight:900;box-shadow:0 12px 26px rgba(0,0,0,.18)}.pc-decision__sub{color:rgba(255,255,255,.68);font-size:.78rem}
  .pc-steps{max-width:1120px;margin:0 auto 5rem;padding:0 20px}.pc-steps__head{text-align:center;margin-bottom:28px}.pc-steps__head p{margin:0 0 7px;color:var(--pc-blue);font-weight:900;font-size:.82rem;letter-spacing:.1em}.pc-steps__head h2{margin:0;color:var(--pc-navy);font-size:clamp(1.55rem,3vw,2.25rem);line-height:1.5}.pc-steps__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.pc-step{position:relative;padding:25px 22px;border:1px solid var(--pc-line);border-radius:18px;background:#fff;box-shadow:0 10px 28px rgba(11,31,58,.06)}.pc-step__n{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:var(--pc-navy);color:#fff;font-weight:900;font-size:.85rem}.pc-step h3{margin:14px 0 7px;color:var(--pc-navy);font-size:1.05rem}.pc-step p{margin:0;color:var(--pc-muted);font-size:.88rem;line-height:1.8}
  .pc-mobile-cta{display:none}
  @media(max-width:767px){.pc-proofbar{grid-template-columns:repeat(2,1fr);padding:0 16px;margin:-1rem auto 2.5rem}.pc-proofbar__item{padding:14px 10px;border-right:1px solid var(--pc-line);border-radius:0!important}.pc-proofbar__item:nth-child(1){border-radius:14px 0 0 0!important}.pc-proofbar__item:nth-child(2){border-radius:0 14px 0 0!important}.pc-proofbar__item:nth-child(3){border-radius:0 0 0 14px!important}.pc-proofbar__item:nth-child(4){border-radius:0 0 14px 0!important}.pc-proofbar__num{font-size:.92rem}.pc-proofbar__label{font-size:.72rem}.pc-decision{padding:0 16px;margin-bottom:3.5rem}.pc-decision__inner{padding:26px 20px;border-radius:20px}.pc-decision h2{font-size:1.55rem}.pc-decision__lead{font-size:.9rem}.pc-decision__grid{grid-template-columns:1fr;gap:8px}.pc-decision__card{padding:13px}.pc-decision__actions{display:block}.pc-decision__cta{width:100%;box-sizing:border-box}.pc-decision__sub{display:block;text-align:center;margin-top:9px}.pc-steps{padding:0 16px;margin-bottom:3.5rem}.pc-steps__grid{grid-template-columns:1fr;gap:10px}.pc-step{padding:20px}.pc-mobile-cta{position:fixed;left:12px;right:12px;bottom:12px;z-index:60;display:flex;align-items:center;gap:10px;padding:9px 10px 9px 14px;border:1px solid rgba(255,255,255,.55);border-radius:16px;background:rgba(11,31,58,.96);box-shadow:0 16px 38px rgba(0,0,0,.22);backdrop-filter:blur(12px);opacity:0;transform:translateY(18px);pointer-events:none;transition:.22s ease}.pc-mobile-cta.is-visible{opacity:1;transform:none;pointer-events:auto}.pc-mobile-cta__text{min-width:0;flex:1;color:#fff;font-size:.73rem;line-height:1.45}.pc-mobile-cta__text strong{display:block;font-size:.82rem}.pc-mobile-cta a{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:0 15px;border-radius:10px;background:#f59e0b;color:#fff!important;text-decoration:none!important;font-weight:900;font-size:.82rem;white-space:nowrap}}
  @media(prefers-reduced-motion:reduce){.pc-mobile-cta{transition:none}}
</style>
<script id="parent-conversion-layer-script">
(function(){
  function init(){
    if(document.getElementById('pc-proofbar')) return;
    var main=document.querySelector('main');
    if(!main) return;
    var hero=main.firstElementChild;
    if(!hero) return;
    var proof=document.createElement('div'); proof.id='pc-proofbar'; proof.className='pc-proofbar';
    proof.innerHTML='<div class="pc-proofbar__item"><span class="pc-proofbar__num">20年以上</span><span class="pc-proofbar__label">指導経験</span></div><div class="pc-proofbar__item"><span class="pc-proofbar__num">1,000名超</span><span class="pc-proofbar__label">延べ指導人数</span></div><div class="pc-proofbar__item"><span class="pc-proofbar__num">0円</span><span class="pc-proofbar__label">入会金・管理費・仲介手数料</span></div><div class="pc-proofbar__item"><span class="pc-proofbar__num">全国オンライン</span><span class="pc-proofbar__label">初回無料相談</span></div>';
    hero.insertAdjacentElement('afterend',proof);

    var decision=document.createElement('section'); decision.className='pc-decision'; decision.setAttribute('aria-labelledby','pc-decision-title');
    decision.innerHTML='<div class="pc-decision__inner"><p class="pc-decision__eyebrow">保護者の方へ｜ご相談前に</p><h2 id="pc-decision-title">「この先生なら、うちの子を任せられそう」と思えるかを、まず確かめてください。</h2><p class="pc-decision__lead">成績や志望校だけでなく、お子さまの性格、現在の学習状況、つまずいている理由まで丁寧に伺います。ご相談から実際の授業まで、講師本人が一貫して担当します。</p><div class="pc-decision__grid"><div class="pc-decision__card"><strong>講師本人が直接担当</strong><span>紹介会社や別担当者を挟まず、相談内容をそのまま指導へつなげます。</span></div><div class="pc-decision__card"><strong>必要なものだけをご提案</strong><span>コースを無理に決めるのではなく、お子さまに合う進め方を一緒に整理します。</span></div><div class="pc-decision__card"><strong>まずは無料で相談</strong><span>「何から始めればいいか分からない」という段階からご相談いただけます。</span></div></div><div class="pc-decision__actions"><a class="pc-decision__cta" href="#contact">無料相談・体験授業について相談する →</a><span class="pc-decision__sub">相談だけでも大丈夫です。無理な勧誘は行いません。</span></div></div></section>';
    proof.insertAdjacentElement('afterend',decision);

    var steps=document.createElement('section'); steps.className='pc-steps'; steps.innerHTML='<div class="pc-steps__head"><p>FIRST CONTACT</p><h2>お問い合わせから授業開始まで</h2></div><div class="pc-steps__grid"><div class="pc-step"><span class="pc-step__n">1</span><h3>無料相談</h3><p>学年・目標・現在の状況・お悩みを伺い、必要な指導を整理します。</p></div><div class="pc-step"><span class="pc-step__n">2</span><h3>相性と方針を確認</h3><p>授業内容や進め方をご説明。疑問や不安も遠慮なくお聞きください。</p></div><div class="pc-step"><span class="pc-step__n">3</span><h3>お子さまに合わせて開始</h3><p>一人ひとりの状況に合わせて、無理のないペースから指導を始めます。</p></div></div></section>';
    var contact=document.getElementById('contact'); if(contact) contact.parentNode.insertBefore(steps,contact); else main.appendChild(steps);

    var mobile=document.createElement('div'); mobile.className='pc-mobile-cta'; mobile.innerHTML='<div class="pc-mobile-cta__text"><strong>お子さまのことを、まず聞かせてください</strong>講師本人が直接ご相談に対応します。</div><a href="#contact">無料相談</a>'; document.body.appendChild(mobile);
    var shown=false; function onScroll(){var y=window.scrollY||document.documentElement.scrollTop; var should=y>420; if(should!==shown){shown=should;mobile.classList.toggle('is-visible',should)}} window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
</script>
'''
needle='</head>'
if needle not in text:
    raise SystemExit('head marker missing')
text=text.replace(needle,payload+needle,1)
path.write_text(text,encoding='utf-8')
print('patched index.html')
