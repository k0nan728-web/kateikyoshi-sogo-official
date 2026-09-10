import {monthlyEstimate} from './pricing.mjs';
// Each behaviour owns its component; no DOM relocation or text-based removal.
const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.global-nav');
function closeMenu({restoreFocus=false}={}) {
  menuButton.setAttribute('aria-expanded','false');
  menuButton.setAttribute('aria-label','メニューを開く');
  menu.classList.remove('is-open');
  if(restoreFocus) menuButton.focus();
}
menuButton.addEventListener('click',()=>{
  const open=menuButton.getAttribute('aria-expanded')!=='true';
  menuButton.setAttribute('aria-expanded',String(open));
  menuButton.setAttribute('aria-label',open?'メニューを閉じる':'メニューを開く');
  menu.classList.toggle('is-open',open);
});
menu.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.classList.contains('is-open'))closeMenu({restoreFocus:true})});
document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu()});
// One size per heading, fitted against its longest line.
const headings=[...document.querySelectorAll('[data-fit-lines]')];
const widths=new WeakMap();
function fitHeading(el){
  el.style.removeProperty('--fit-size');
  el.classList.remove('fit-wrap');el.classList.add('fitted');
  const computed=getComputedStyle(el);
  const maximum=parseFloat(computed.fontSize);
  const minimum=Number(el.dataset.fitMin||18)*(parseFloat(getComputedStyle(document.documentElement).fontSize)/16);
  const available=el.clientWidth-parseFloat(computed.paddingLeft)-parseFloat(computed.paddingRight);
  const range=document.createRange();let longest=0;
  for(const line of el.children){if(line.tagName!=='SPAN')continue;range.selectNodeContents(line);longest=Math.max(longest,range.getBoundingClientRect().width)}
  if(!available||!longest)return;
  const proposed=Math.min(maximum,maximum*(available-2)/longest);
  el.style.setProperty('--fit-size',`${Math.max(minimum,proposed).toFixed(2)}px`);
  if(proposed<minimum){el.classList.remove('fitted');el.classList.add('fit-wrap')}
}
let frame;
function fitAll(){cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>headings.forEach(fitHeading))}
const observer=new ResizeObserver(entries=>{
  let changed=false;
  for(const {target,contentRect} of entries){if(widths.get(target)!==contentRect.width){widths.set(target,contentRect.width);changed=true}}
  if(changed)fitAll();
});
headings.forEach(el=>observer.observe(el));
document.fonts.ready.then(fitAll);window.addEventListener('resize',fitAll,{passive:true});fitAll();
const estimateForm=document.getElementById('estimate-form');
const yen=new Intl.NumberFormat('ja-JP');
function updateEstimate(){
  const rate=Number(document.getElementById('estimate-course').value);
  const minutes=Number(document.getElementById('estimate-minutes').value);
  const count=Number(document.getElementById('estimate-count').value);
  const withSupport=document.getElementById('estimate-support').checked;
  document.getElementById('estimate-total').textContent=`月額 ${yen.format(monthlyEstimate(rate,minutes,count,withSupport))}円（税込）`;
  document.getElementById('estimate-breakdown').textContent=`${yen.format(rate)}円 × ${minutes}分 ÷ 60 × ${count}回${withSupport?' ＋ サポート10,000円':''}`;
}
estimateForm.addEventListener('input',updateEstimate);estimateForm.addEventListener('change',updateEstimate);estimateForm.addEventListener('submit',e=>e.preventDefault());updateEstimate();
