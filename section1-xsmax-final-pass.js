(() => {
  'use strict';
  const SECTION_ID='ks-premium-intro-v6';
  const STYLE_ID='ks-section1-device-final-pass-v2';

  function injectStyle(){
    document.querySelectorAll('#ks-section1-xsmax-final-pass-v1,#ks-section1-device-final-pass-v2').forEach(el=>{
      if(el.id!==STYLE_ID) el.remove();
    });
    if(document.getElementById(STYLE_ID)) return;
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      #${SECTION_ID} .section-title-prefix,
      #${SECTION_ID} .section-title-promise{display:inline-block!important;white-space:nowrap!important}
      #${SECTION_ID} .section-title-promise strong{display:inline!important;color:#d39a10!important;font-size:1.28em!important;line-height:1!important}

      #${SECTION_ID} .promise-head{
        display:flex!important;
        flex-direction:column!important;
        align-items:center!important;
        justify-content:center!important;
        gap:14px!important;
        margin-bottom:20px!important;
        text-align:center!important
      }
      #${SECTION_ID} .icon{
        display:grid!important;
        place-items:center!important;
        width:68px!important;
        height:68px!important;
        flex:0 0 68px!important;
        margin:0 auto!important
      }
      #${SECTION_ID} .icon svg{width:36px!important;height:36px!important}
      #${SECTION_ID} .promise h3{
        width:100%!important;
        margin:0!important;
        color:#082f59!important;
        font-family:"Noto Serif JP",serif!important;
        font-size:clamp(24px,2.15vw,30px)!important;
        line-height:1.42!important;
        font-weight:900!important;
        letter-spacing:0!important;
        text-align:center!important
      }
      #${SECTION_ID} .promise-title-line{display:block!important;white-space:nowrap!important;text-align:center!important}
      #${SECTION_ID} .promise p{
        margin:0!important;
        color:#2f4b68!important;
        font-size:clamp(13.5px,1.05vw,15px)!important;
        line-height:1.8!important;
        font-weight:650!important;
        text-align:center!important
      }
      #${SECTION_ID} .promise-body-wide{display:block!important}
      #${SECTION_ID} .promise-body-mobile{display:none!important}
      #${SECTION_ID} .promise-body-line{display:block!important;white-space:nowrap!important}

      .ks-section1-comparison-v8 .ks-comparison-title,
      .ks-section1-comparison-v9 .ks-comparison-title{width:100%!important;max-width:100%!important;text-align:center!important}
      .ks-section1-comparison-v8 .ks-comparison-title-main,
      .ks-section1-comparison-v9 .ks-comparison-title-main{
        display:block!important;
        font-size:clamp(25px,2.3vw,31px)!important;
        line-height:1.45!important;
        font-weight:900!important;
        text-align:center!important
      }
      .ks-section1-comparison-v8 .ks-comparison-title-price,
      .ks-section1-comparison-v9 .ks-comparison-title-price{
        display:block!important;
        margin-top:8px!important;
        font-size:clamp(34px,3.2vw,43px)!important;
        line-height:1.25!important;
        font-weight:900!important;
        white-space:nowrap!important;
        text-align:center!important
      }

      @media(max-width:1199px){
        #${SECTION_ID} .section-title{
          white-space:normal!important;
          font-size:clamp(25px,3.5vw,32px)!important;
          line-height:1.45!important
        }
        #${SECTION_ID} .section-title-prefix,
        #${SECTION_ID} .section-title-promise{
          display:block!important;
          width:100%!important;
          text-align:center!important
        }
        #${SECTION_ID} .section-title-promise{margin-top:7px!important}
        #${SECTION_ID} .promises{grid-template-columns:1fr!important;gap:18px!important}
        #${SECTION_ID} .promise{
          min-height:0!important;
          padding:26px 24px 28px!important
        }
        #${SECTION_ID} .promise h3{font-size:clamp(26px,3.1vw,31px)!important}
        #${SECTION_ID} .promise p{font-size:clamp(15px,1.9vw,18px)!important}
        #${SECTION_ID} .icon{width:72px!important;height:72px!important;flex-basis:72px!important}
        #${SECTION_ID} .icon svg{width:38px!important;height:38px!important}
      }

      @media(max-width:679px){
        #${SECTION_ID} .section-title{font-size:clamp(23px,6vw,28px)!important;margin-bottom:28px!important}
        #${SECTION_ID} .promise{padding:22px 18px 24px!important}
        #${SECTION_ID} .promise-head{gap:12px!important;margin-bottom:18px!important}
        #${SECTION_ID} .icon{width:66px!important;height:66px!important;flex-basis:66px!important}
        #${SECTION_ID} .icon svg{width:35px!important;height:35px!important}
        #${SECTION_ID} .promise h3{font-size:clamp(23px,5.9vw,27px)!important;line-height:1.45!important}
        #${SECTION_ID} .promise p{font-size:clamp(15px,3.9vw,17px)!important;line-height:1.8!important}
        .ks-section1-comparison-v8,.ks-section1-comparison-v9{
          min-height:205px!important;
          padding:26px 48px 28px 18px!important
        }
        .ks-section1-comparison-v8 .ks-comparison-kicker,
        .ks-section1-comparison-v9 .ks-comparison-kicker{font-size:12px!important;margin-bottom:14px!important}
        .ks-section1-comparison-v8 .ks-comparison-title-main,
        .ks-section1-comparison-v9 .ks-comparison-title-main{
          font-size:clamp(19px,4.8vw,22px)!important;
          line-height:1.55!important;
          white-space:normal!important;
          text-wrap:balance!important
        }
        .ks-section1-comparison-v8 .ks-comparison-title-price,
        .ks-section1-comparison-v9 .ks-comparison-title-price{font-size:clamp(30px,7.2vw,34px)!important}
      }

      @media(max-width:479px){
        #${SECTION_ID} .promise-body-wide{display:none!important}
        #${SECTION_ID} .promise-body-mobile{display:block!important}
      }

      @media(max-width:359px){
        #${SECTION_ID} .promise h3{font-size:21px!important}
        #${SECTION_ID} .promise p{font-size:14px!important}
        .ks-section1-comparison-v8 .ks-comparison-title-main,
        .ks-section1-comparison-v9 .ks-comparison-title-main{font-size:18px!important}
        .ks-section1-comparison-v8 .ks-comparison-title-price,
        .ks-section1-comparison-v9 .ks-comparison-title-price{font-size:28px!important}
      }
    `;
    document.head.appendChild(style);
  }

  function blockLines(parts,cls){
    return `<span class="${cls}">${parts.map(x=>`<span class="promise-body-line">${x}</span>`).join('')}</span>`;
  }

  function normalizeCopy(){
    const section=document.getElementById(SECTION_ID);if(!section)return;

    const title=section.querySelector('.section-title');
    if(title) title.innerHTML='<span class="section-title-prefix">一人ひとりに合わせるための、</span><span class="section-title-promise"><strong>3</strong>つの約束</span>';

    const headingLines=[
      ['お子様に合わせた','オーダーメイド指導'],
      ['相談から授業まで','同じプロが担当'],
      ['英検・受験・進路まで','長期的に伴走']
    ];
    const bodyWide=[
      ['現在地・目標・性格・生活環境を丁寧に把握し、','最適な学習計画を一緒に作ります。'],
      ['相談した内容がそのまま指導につながるので、','安心して何でも相談できます。'],
      ['点数だけでなく将来を見据えたサポートで、','学力と自信をしっかり育てます。']
    ];
    const bodyMobile=[
      ['現在地・目標・性格・生活環境を','丁寧に把握し、','最適な学習計画を一緒に作ります。'],
      ['相談した内容がそのまま','指導につながるので、','安心して何でも相談できます。'],
      ['点数だけでなく将来を見据えた','サポートで、','学力と自信をしっかり育てます。']
    ];

    [...section.querySelectorAll('.promise')].forEach((card,i)=>{
      const h=card.querySelector('h3'),p=card.querySelector('p');
      if(h&&headingLines[i]) h.innerHTML=headingLines[i].map(x=>`<span class="promise-title-line">${x}</span>`).join('');
      if(p&&bodyWide[i]) p.innerHTML=blockLines(bodyWide[i],'promise-body-wide')+blockLines(bodyMobile[i],'promise-body-mobile');
    });

    const compare=document.querySelector('.ks-section1-comparison-v8,.ks-section1-comparison-v9');
    const ct=compare?.querySelector('.ks-comparison-title');
    if(ct) ct.innerHTML='<span class="ks-comparison-title-main">他の塾・予備校・家庭教師センターと</span><span class="ks-comparison-title-price">料金を比較する</span>';
  }

  function apply(){injectStyle();normalizeCopy()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply,{once:true});else apply();
  window.addEventListener('load',apply,{once:true});
  [100,300,700,1300,2400,4000].forEach(ms=>setTimeout(apply,ms));
  window.addEventListener('resize',()=>requestAnimationFrame(apply),{passive:true});
  const root=document.getElementById('root')||document.body;
  if(root)new MutationObserver(()=>requestAnimationFrame(apply)).observe(root,{childList:true,subtree:true});
})();