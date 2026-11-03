// Single source for the owner-provided policy. Mandatory legal limits take priority.
import {readFile,writeFile} from 'node:fs/promises';
export const version='2026-11-03';
export const markup=`<!-- termination-policy:start -->
<section class="parent-guide termination-guide" id="termination-policy" aria-labelledby="termination-title" data-termination-version="2026-11-03"><div class="guide-inner">
<p class="guide-kicker">契約全体の中途解約・返金</p><h2 id="termination-title">お支払い済みの授業料が<span class="guide-phrase">残っている場合の精算。</span></h2>
<p class="guide-intro">支払済みの未受講分がある状態で中途解約する場合は、精算対象の授業料から解約手数料を差し引いて返金します。手数料は<strong>原則15,000円</strong>です。ただし、適用法令の上限・制限が優先されます。</p>
<div class="termination-formula" aria-label="返金額の計算"><div><span>精算対象</span><strong>支払済みの<br>未受講分授業料</strong></div><b aria-hidden="true">−</b><div><span>解約手数料</span><strong>原則15,000円</strong><small>法令の範囲内で適用</small></div><b aria-hidden="true">＝</b><div><span>返金額</span><strong>0円以上</strong><small>差引後が0円以下なら返金なし</small></div></div>
<div class="termination-cutoff"><article><h3>授業開始24時間前まで</h3><p>その授業分から、未受講分の精算対象として計算します。</p></article><article><h3>授業開始まで24時間未満</h3><p>その授業は当日キャンセル扱いとなり、<strong>次回の授業分から</strong>精算対象として計算します。</p></article></div>
<p class="guide-note termination-legal"><strong>法令上の取り扱いを優先します。</strong>解約手数料は、適用法令で認められる範囲に限ります。未実施の授業に係る当日キャンセル料と解約手数料を合わせる場合も、法令の制限を超えない範囲で精算します。クーリング・オフ等、法令に基づく解除・返金の権利は制限しません。</p>
<details class="guide-details"><summary>適用対象・計算方法を詳しく確認する</summary><ul><li>通常の中途解約で差引後の残額が0円またはマイナスになる場合、返金額は0円です。法令上、差し引ける金額が少なくなる場合は、その金額で計算します。</li><li>未受講分は、契約時に確認した授業料の単価で計算します。中途解約を理由に、すでに受講した授業の単価を引き上げて再計算することはありません。</li><li>本規定を事前に提示・説明した新規契約に適用します。既存契約は、個別に合意した内容と適用法令に従います。</li><li>任意サポート・教材等の精算は、その契約内容と適用法令に従います。精算対象の回数・単価・差引額・返金額を確認してご案内します。</li></ul><p class="guide-note">解約料には合理的な算出根拠が必要であり、法定の上限以下なら一律に請求できることを意味しません。</p><a class="guide-link" href="https://www.no-trouble.caa.go.jp/what/continuousservices/" target="_blank" rel="noopener">消費者庁の中途解約・クーリング・オフの案内 ↗</a></details>
</div></section>
<!-- termination-policy:end -->`;
const pages=['index.html','eiken/index.html','gyakuten/index.html','bansou/index.html','retry/index.html'];
const check=process.argv.includes('--check');
for(const path of pages){
 const source=await readFile(path,'utf8');let updated;
 if(source.includes('<!-- termination-policy:start -->'))updated=source.replace(/<!-- termination-policy:start -->[\s\S]*?<!-- termination-policy:end -->/,markup);
 else if(path==='index.html'){
  updated=source.replace(/(<section\b[^>]*id="cancel-policy"[^>]*>[\s\S]*?<\/section>)/,`$1\n${markup}`);
 }else updated=source.replace(/(<section\b[^>]*id="contact"[^>]*>)/,`${markup}\n$1`);
 if(!updated?.includes(markup))throw Error('Missing insertion target: '+path);
 if(check&&source!==updated)throw Error('Policy out of sync: '+path);
 if(!check)await writeFile(path,updated);
}
console.log(check?'Five policy disclosures match the shared source.':'Five policy disclosures updated.');
