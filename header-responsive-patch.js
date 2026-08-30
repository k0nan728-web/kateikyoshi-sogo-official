(()=>{'use strict';
const HOST='ks-ideal-header-host';
function apply(){
  const host=document.getElementById(HOST),root=host?.shadowRoot;if(!root)return false;
  root.querySelectorAll('style[id^="ks-responsive-patch"]').forEach(x=>x.remove());
  const style=document.createElement('style');style.id='ks-responsive-patch-v6';style.textContent=`
    .shell{padding-left:max(clamp(6px,1.8vw,22px),env(safe-area-inset-left))!important;padding-right:max(clamp(6px,1.8vw,22px),env(safe-area-inset-right))!important}
    .row{min-height:clamp(64px,7vw,82px)!important;padding:clamp(5px,.8vw,9px) 0!important;gap:clamp(4px,.8vw,12px)!important}
    .brand{display:flex!important;align-items:center!important;flex:1 1 auto!important;min-width:0!important;gap:clamp(5px,.8vw,12px)!important;overflow:hidden!important}
    .em{display:none!important}
    .badge{display:flex!important;align-items:center!important;justify-content:center!important;flex:0 0 auto!important;min-height:clamp(32px,3.8vw,46px)!important;padding:0 clamp(5px,1vw,12px)!important;border-radius:7px!important;font-size:clamp(8px,1vw,13px)!important;line-height:1!important;white-space:nowrap!important}
    .brand>span:last-child{display:block!important;flex:1 1 auto!important;min-width:0!important;text-align:center!important;overflow:hidden!important}
    .title{display:block!important;margin:0!important;color:#fff!important;font-family:'Noto Serif JP',serif!important;font-size:clamp(13px,2vw,27px)!important;font-weight:700!important;line-height:1.12!important;letter-spacing:0!important;white-space:nowrap!important;text-align:center!important;overflow:visible!important;text-overflow:clip!important}
    .sub{display:block!important;margin:clamp(2px,.35vw,4px) 0 0!important;color:#deb64c!important;font-size:clamp(7px,.85vw,11px)!important;font-weight:700!important;line-height:1.1!important;letter-spacing:0!important;white-space:nowrap!important;text-align:center!important;overflow:hidden!important;text-overflow:clip!important}
    .actions{display:flex!important;align-items:center!important;flex:0 0 auto!important;gap:clamp(4px,.65vw,9px)!important}
    .cta{display:flex!important;align-items:center!important;justify-content:center!important;min-height:clamp(40px,4.5vw,52px)!important;padding:0 clamp(8px,1.5vw,20px)!important;font-size:clamp(10px,1vw,14px)!important;font-weight:800!important;line-height:1!important;white-space:nowrap!important}
    .menu{width:clamp(40px,4.5vw,52px)!important;height:clamp(40px,4.5vw,52px)!important;flex:0 0 clamp(40px,4.5vw,52px)!important;font-size:clamp(21px,2.3vw,27px)!important}
    @media(max-width:600px){
      .shell{padding-left:max(5px,env(safe-area-inset-left))!important;padding-right:max(5px,env(safe-area-inset-right))!important}
      .row{min-height:66px!important;padding:5px 0!important;gap:3px!important}
      .brand{gap:3px!important}
      .badge{min-height:32px!important;padding:0 4px!important;font-size:clamp(7px,2.05vw,8.5px)!important;border-radius:5px!important}
      .title{font-size:clamp(11px,3.15vw,13.5px)!important;line-height:1.05!important}
      .sub{margin-top:2px!important;font-size:clamp(6px,1.7vw,7.5px)!important;line-height:1.05!important}
      .actions{gap:3px!important}
      .cta{min-height:38px!important;padding:0 clamp(5px,1.5vw,7px)!important;font-size:clamp(9px,2.35vw,10.5px)!important}
      .menu{width:38px!important;height:38px!important;flex-basis:38px!important;font-size:20px!important}
    }
    @media(max-width:360px){
      .shell{padding-left:max(4px,env(safe-area-inset-left))!important;padding-right:max(4px,env(safe-area-inset-right))!important}
      .row{gap:2px!important}.brand{gap:2px!important}.actions{gap:2px!important}
      .badge{padding:0 3px!important;font-size:6.8px!important}
      .title{font-size:10.6px!important}.sub{font-size:5.8px!important}
      .cta{padding:0 4px!important;font-size:8.7px!important}
      .menu{width:36px!important;height:36px!important;flex-basis:36px!important;font-size:19px!important}
    }
  `;root.appendChild(style);
  const title=root.querySelector('.title');if(title)title.textContent='鈴木雄太のオンライン指導';
  const sub=root.querySelector('.sub');if(sub)sub.textContent='一人ひとりに最適な指導で、未来を創る';
  const cta=root.querySelector('.cta');if(cta)cta.textContent=innerWidth<=600?'無料相談':'無料相談・お問い合わせ';
  return true;
}
function boot(){let n=0;if(!apply()){const id=setInterval(()=>{if(apply()||++n>60)clearInterval(id)},100)}addEventListener('resize',()=>requestAnimationFrame(apply),{passive:true});addEventListener('orientationchange',()=>setTimeout(apply,100),{passive:true})}
document.readyState==='loading'?document.addEventListener('DOMContentLoaded',boot,{once:true}):boot();})();