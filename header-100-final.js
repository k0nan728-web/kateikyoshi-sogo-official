/* Header 100-point rebuild — 2026-08-27 */
(function(){
  'use strict';
  var links=[
    ['こんな方に','#for-you'],
    ['講師紹介','#teacher'],
    ['特徴','#why'],
    ['コース一覧','#courses'],
    ['不登校支援','#support'],
    ['合格実績','#results'],
    ['生徒の声','#voices'],
    ['料金・比較','#pricing'],
    ['お問い合わせ','#contact']
  ];

  function findOldHeader(){
    return document.querySelector('nav.fixed.top-0') || document.querySelector('nav');
  }

  function mount(){
    if(document.getElementById('h100-header')) return true;
    var old=findOldHeader();
    if(!old) return false;

    var header=document.createElement('header');
    header.id='h100-header';
    header.setAttribute('aria-label','サイトヘッダー');
    var navDesktop=links.map(function(x){return '<li><a href="'+x[1]+'"'+(x[0]==='料金・比較'?' class="h100-nav-accent"':'')+'>'+x[0]+'</a></li>';}).join('');
    var navMobile=links.map(function(x){return '<a href="'+x[1]+'">'+x[0]+'</a>';}).join('');
    header.innerHTML=''
      +'<div class="h100-shell">'
      +'<div class="h100-main">'
      +'<a class="h100-brand" href="/" aria-label="プロ家庭教師 鈴木雄太 公式サイト">'
      +'<span class="h100-mark">プロ家庭教師</span>'
      +'<span class="h100-brand-text"><span class="h100-name">鈴木雄太のオンライン指導</span><span class="h100-sub">英検・受験・不登校・通信制高校まで、一人の講師が一貫対応</span></span>'
      +'</a>'
      +'<div class="h100-actions">'
      +'<a class="h100-cta" href="#contact">無料相談・お問い合わせ</a>'
      +'<button class="h100-menu-btn" type="button" aria-expanded="false" aria-controls="h100-mobile-panel" aria-label="メニューを開く"><span class="h100-menu-icon"></span></button>'
      +'</div>'
      +'</div>'
      +'</div>'
      +'<nav class="h100-nav" aria-label="主要メニュー"><div class="h100-shell"><ul class="h100-nav-list">'+navDesktop+'</ul></div></nav>'
      +'<div id="h100-mobile-panel" class="h100-panel"><div class="h100-shell"><div class="h100-panel-grid">'+navMobile+'</div></div></div>';

    old.classList.add('h100-old-hidden');
    old.setAttribute('aria-hidden','true');
    old.insertAdjacentElement('afterend',header);

    var btn=header.querySelector('.h100-menu-btn');
    btn.addEventListener('click',function(){
      var open=header.classList.toggle('is-open');
      btn.setAttribute('aria-expanded',String(open));
      btn.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く');
    });
    header.querySelectorAll('a[href^="#"]').forEach(function(a){
      a.addEventListener('click',function(){
        header.classList.remove('is-open');
        btn.setAttribute('aria-expanded','false');
        btn.setAttribute('aria-label','メニューを開く');
      });
    });
    return true;
  }

  function start(){
    if(mount()) return;
    var observer=new MutationObserver(function(){if(mount()) observer.disconnect();});
    observer.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(function(){observer.disconnect();mount();},10000);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
