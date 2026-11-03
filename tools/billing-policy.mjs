// Shared disclosure for the owner's monthly / per-lesson billing policy.
import {readFile,writeFile} from 'node:fs/promises';
export const version='2026-11-03-monthly';
export const comparisonCopy='原則は月謝制です。月途中からの開始月のみ回数制を利用できます。試験前・長期休み・通常より多い受講・5週目の受講には、月謝制と回数制を併用できます。初月・追加分の回数・適用単価・合計は事前に確認します。試算は選択した月の回数を同じ条件で受講する場合の目安です。';
export const markup=`<!-- billing-policy:start -->
<aside class="billing-plan" id="billing-plan" aria-labelledby="billing-plan-title" data-billing-policy-version="${version}">
<p class="billing-plan__eyebrow">月謝制と回数制のご案内</p><h3 id="billing-plan-title">原則は月謝制。<span>必要な月は、回数制も。</span></h3>
<p>継続受講は<strong>原則として月謝制</strong>です。月ごとの授業回数・時間と費用を、事前に確認してご案内します。</p>
<ol class="billing-plan__cases"><li><b aria-hidden="true">01</b><div><strong>毎月の学習は、月謝制で</strong><p>ご相談のうえで決めた回数・時間を基本に、継続して学習します。</p></div></li><li><b aria-hidden="true">02</b><div><strong>月の途中からも開始できます</strong><p>月途中から受講を始める場合は、<strong>開始する当月のみ回数制</strong>を利用できます。翌月以降は原則として月謝制です。</p></div></li><li><b aria-hidden="true">03</b><div><strong>必要な分を、回数制で追加</strong><p><strong>試験前・長期休み・通常より多く受講したいとき・5週目も通常どおり受講したいとき</strong>は、月謝制と回数制を併用できます。</p></div></li></ol>
<p class="billing-plan__total"><strong>月謝分 ＋ 必要な回数分の追加受講</strong><span>ご希望日・対応可能な枠・回数・適用単価・合計金額を、受講前に確認します。開始月や追加受講によって、月のお支払い金額が変わる場合があります。</span></p>
<p class="billing-plan__note">回数制の利用方法と、各コースの料金・継続条件は分けてご案内します。英検の級別料金、試験までの日数・申込総回数による通常料金／直前・少回数料金の条件は、引き続き適用されます。<a href="/#eiken-fee-policy">英検の料金条件を確認する →</a></p>
</aside>
<!-- billing-policy:end -->`;
export const css=`/* Scoped billing disclosure: no font downloads or JavaScript layout work. */
.billing-plan{box-sizing:border-box;min-width:0;margin:26px 0 32px;padding:clamp(18px,3vw,30px);border:1px solid #b6d5d7;border-top:5px solid #18796f;border-radius:16px;background:#f4faf8;color:#17394c;font-family:system-ui,-apple-system,"Hiragino Kaku Gothic ProN",Meiryo,sans-serif;font-size:16px;line-height:1.85}.billing-plan *{box-sizing:border-box;min-width:0}.billing-plan .billing-plan__eyebrow{margin:0 0 7px;color:#176459;text-align:center;font-size:14px;font-weight:700}.billing-plan :is(h2,h3){margin:0 0 18px;text-align:center;font-size:clamp(21px,2.5vw,29px);line-height:1.6;color:#17394c;text-wrap:balance}.billing-plan :is(h2,h3) span{display:inline-block;max-width:100%}.billing-plan p{margin:0 0 16px;text-align:left;font-size:16px;line-height:1.85;overflow-wrap:break-word;text-wrap:pretty}.billing-plan__cases{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));list-style:none;margin:22px 0;padding:0;gap:18px}.billing-plan__cases>li{display:flex;align-items:flex-start;gap:10px;margin:0;padding:0;list-style:none}.billing-plan__cases>li>b{flex:none;color:#14776e;font:800 23px/1.5 system-ui,sans-serif}.billing-plan__cases strong{font-size:16px;color:#17394c}.billing-plan__cases p{margin:8px 0 0;font-size:15px}.billing-plan .billing-plan__total{display:grid;grid-template-columns:minmax(180px,.8fr) minmax(0,1.5fr);align-items:center;gap:18px;padding:16px;background:#fff;border:1px solid #c5dedb;border-radius:10px}.billing-plan__total>strong{text-align:center;color:#165f64}.billing-plan .billing-plan__note{margin-bottom:0;font-size:14px;color:#35576a}.billing-plan a{color:#105c77;text-decoration:underline;text-underline-offset:3px}.billing-plan a:focus-visible{outline:3px solid #14776e;outline-offset:3px}@media(max-width:760px){.billing-plan__cases{grid-template-columns:1fr;gap:20px}.billing-plan .billing-plan__total{grid-template-columns:1fr;gap:10px}.billing-plan__total>strong{text-align:left}}`;
const check=process.argv.includes('--check');
const targets=[['index.html','<nav aria-label="費用の確認メニュー"'],['eiken/index.html','<div class="pricing-layout">'],['gyakuten/index.html','<div class="rev-two">'],['bansou/index.html','<div class="guide-cost-strip">'],['retry/index.html','<div class="guide-cost-strip">'],['payment/index.html','<section class="card">']];
for(const [path,target] of targets){
 const source=await readFile(path,'utf8');let result;
 const disclosure=path==='payment/index.html'?markup.replace('<h3 id=','<h2 id=').replace('</h3>','</h2>'):markup;
 if(source.includes('<!-- billing-policy:start -->'))result=source.replace(/<!-- billing-policy:start -->[\s\S]*?<!-- billing-policy:end -->/,disclosure);
 else if(path==='gyakuten/index.html'){
  const start=source.indexOf('id="pricing"');const i=source.indexOf(target,start);if(i<0)throw Error(path);result=source.slice(0,i)+disclosure+'\n'+source.slice(i);
 }else{const i=source.indexOf(target);if(i<0)throw Error(path);result=source.slice(0,i)+disclosure+'\n'+source.slice(i);}
 if(!result.includes(disclosure))throw Error('Missing billing disclosure '+path);
 if(check&&result!==source)throw Error('Billing policy out of sync: '+path);
 if(!check)await writeFile(path,result);
}
const sheet=await readFile('billing-plan.css','utf8').catch(()=>null);
if(check&&sheet!==css)throw Error('Billing stylesheet out of sync');
if(!check)await writeFile('billing-plan.css',css);
console.log(check?'Six billing disclosures and stylesheet match the shared source.':'Six billing disclosures and stylesheet updated.');
