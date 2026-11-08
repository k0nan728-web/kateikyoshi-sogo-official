// Single source for the owner-provided policy. Mandatory legal limits take priority.
import {readFile,writeFile} from 'node:fs/promises';
export const version='2026-11-08';
export const markup="<!-- termination-policy:start -->\n<section class=\"parent-guide termination-guide\" id=\"termination-policy\" aria-labelledby=\"termination-title\" data-termination-version=\"2026-11-08\"><div class=\"guide-inner\">\n<p class=\"guide-kicker\">中途解約・返金について</p>\n<h2 id=\"termination-title\">翌月分のお支払い前にご相談いただくと、<span class=\"guide-phrase\">解約手数料はかかりません。</span></h2>\n<p class=\"guide-intro\">授業の曜日・時間をあらかじめ確保し、ほかの生徒さんの予定も調整しています。そのため、翌月分の授業料をお支払いいただいた後に中途解約される場合は、未受講分の授業料から<strong>原則15,000円</strong>を解約手数料として差し引いて精算します。</p>\n<div class=\"termination-cutoff\">\n<article><h3>① 翌月分のお支払い前に相談</h3><p>解約のご相談・お申し出をいただいた場合、<strong>解約手数料はかかりません。</strong>翌月分の授業料もお支払いいただく必要はありません。</p></article>\n<article><h3>② 翌月分のお支払い後に相談</h3><p>すでにお支払いいただいた未受講分から、<strong>原則15,000円</strong>を差し引いて返金額を計算します。</p></article>\n</div>\n<div class=\"termination-formula\" aria-label=\"返金額の計算\"><div><span>精算の対象</span><strong>支払済みの<br>未受講分授業料</strong></div><b aria-hidden=\"true\">−</b><div><span>解約手数料</span><strong>原則15,000円</strong><small>お支払い後の解約の場合</small></div><b aria-hidden=\"true\">＝</b><div><span>返金額</span><strong>差引後の金額</strong><small>0円以下の場合は返金なし</small></div></div>\n<div class=\"termination-cutoff\">\n<article><h3>計算例：未受講分が20,000円の場合</h3><p>20,000円 − 15,000円 ＝ <strong>5,000円を返金</strong></p></article>\n<article><h3>計算例：未受講分が10,000円の場合</h3><p>10,000円 − 15,000円 ＝ 0円以下のため、<strong>返金はありません。</strong></p></article>\n</div>\n<details class=\"guide-details\"><summary>精算について、もう少し詳しく</summary><ul>\n<li>「未受講分」とは、お支払い済みで、まだ授業を受けていない分の授業料です。</li>\n<li>翌月分のお支払い前に解約のご相談・お申し出をいただいた場合は、原則15,000円の解約手数料はかかりません。</li>\n<li>お支払い後に解約される場合も、返金額がマイナスになることはありません。差し引いた結果が0円以下の場合、返金額は0円です。</li>\n<li>契約内容や適用されるルールにより別の精算方法が必要な場合は、その内容を確認し、個別にご説明します。</li>\n<li>この中途解約の精算は、1回ごとの授業日程変更・キャンセルとは別の取り扱いです。</li>\n</ul></details>\n<p class=\"guide-note termination-legal\">ご不明な点があれば、解約のお申し出前に講師本人までご相談ください。精算対象の授業回数・金額・手数料・返金額を、順番に分かりやすくご説明します。</p>\n</div></section>\n<!-- termination-policy:end -->";
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
