import {chromium,webkit} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const base='http://127.0.0.1:4173',results=[];await mkdir('audit-results',{recursive:true});
const launched=[];
try {
for(const [engine,type] of Object.entries({chromium,webkit})){
 const browser=await type.launch();launched.push(browser);const page=await browser.newPage({viewport:{width:390,height:844}});
 await page.goto(base+'/');
 async function homeTotal(expected,name){assert.equal(await page.locator('#estimate-amount').innerText(),expected);results.push({engine,name,total:expected});}
 await homeTotal('16,000円','home 5級60分月4回');
 await page.locator('#estimate-eiken-timing').selectOption('urgent');await homeTotal('20,800円','home 直前1.3倍');
 await page.locator('#estimate-eiken-booking').selectOption('3');await homeTotal('15,600円','home 直前かつ少回数は1.3倍のみ');
 await page.locator('#estimate-eiken-timing').selectOption('normal');await homeTotal('15,600円','home 少回数1.3倍');
 await page.locator('#estimate-eiken-booking').selectOption('4');await page.locator('#estimate-count').selectOption('4');await homeTotal('16,000円','home 境界4回通常');
 await page.locator('#estimate-course').selectOption({label:'大学受験対策（上位国公立・難関私大 56～62）'});
 await page.locator('#estimate-minutes').selectOption('120');await page.locator('#estimate-count').selectOption('6');await homeTotal('84,000円','home 大学受験120分月6回');
 await page.goto(base+'/hikaku/');
 const select=(name,value)=>page.getByRole('combobox',{name,exact:true}).selectOption(value);
 const total=async(expected,name)=>{assert.equal(await page.locator('.quote-total').innerText(),expected);results.push({engine,name,total:expected});};
 await select('目標の級','5');await total('96,000円','5級60分月4回6か月');
 await select('目標の級','2');await select('1回の授業時間','90');await total('234,000円','2級90分月4回6か月');
 await page.getByRole('checkbox').check();await total('294,000円','2級90分月4回6か月＋サポート');await page.getByRole('checkbox').uncheck();
 await select('指導コース','university');
 const tierText=await page.getByRole('combobox',{name:'対策のレベル'}).textContent();
 for(const label of ['地方国公立・中堅私大（〜55）','上位国公立・難関私大（56〜62）','最難関国公立・超難関私大（63〜68）','最高難度（69以上）'])assert.ok(tierText.includes(label));
 await select('対策のレベル','standard');await select('1回の授業時間','120');await select('月の授業回数','6');await select('試算する期間','9');await total('756,000円','大学受験7000円120分月6回9か月');
 await select('指導コース','eiken');await select('目標の級','5');await select('1回の授業時間','60');await select('月の授業回数','3');await select('試算する期間','3');await total('36,000円','月3回×3か月＝総9回は通常');
 await select('試算する期間','1');await total('15,600円','総3回は1.3倍');
 await select('月の授業回数','4');await total('16,000円','総4回ちょうどは通常');
 await select('申込時点で、対象試験まで','near');await total('20,800円','直前30日未満の1か月分');
 await page.getByRole('checkbox').check();await total('30,800円','任意サポートは割増対象外');
 await browser.close();
}
} catch(error) { await writeFile('audit-results/calculator-error.txt',error.stack||String(error));process.exitCode=1; }
for(const browser of launched)await browser.close().catch(()=>{});
await writeFile('audit-results/calculator.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results));
