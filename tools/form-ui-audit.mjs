import {chromium,webkit} from 'playwright';
import assert from 'node:assert/strict';
import {mkdir,writeFile} from 'node:fs/promises';
const base='http://127.0.0.1:4173',out='audit-results';await mkdir(out,{recursive:true});const results=[];
const launched=[];
try {
for(const [engine,type] of Object.entries({chromium,webkit})){
 const browser=await type.launch();launched.push(browser);
 for(const kind of ['consult','trial','normal']){
  const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
  let responseMode='failure',posts=[];
  // Entirely isolated fixtures. No real CAPTCHA service or email provider is contacted.
  await page.route('**/api/intake',async route=>{
   if(route.request().method()==='GET')return route.fulfill({json:{available:true,turnstileSiteKey:'isolated-test-key'}});
   posts.push(route.request().postDataJSON());
   await route.fulfill({status:responseMode==='failure'?502:200,json:responseMode==='failure'?{ok:false,error:'テスト用の配信失敗'}:{ok:true,confirmationSent:responseMode!=='partial'}});
  });
  await page.route('https://challenges.cloudflare.com/**',route=>route.fulfill({contentType:'application/javascript',body:'window.turnstile={render:()=>"isolated-widget",getResponse:()=>"isolated-test-token",reset:()=>{}};'}));
  await page.goto(base+(kind==='consult'?'/contact/':'/apply/')+'?brand=bansou');
  await page.locator('#f-guardianName').fill('架空の監査テスト');
  await page.locator('#f-email').fill('test@example.invalid');
  if(kind==='consult'){
   await page.locator('#f-purpose').selectOption('その他のご相談');
  }else{
   await page.locator('#f-grade').selectOption('中3');
   await page.locator('#f-studentName').fill('架空の生徒');
   await page.locator('#f-studentNameKana').fill('かくうのせいと');
   await page.locator('#f-region').fill('テスト県テスト市');
   await page.getByRole('button',{name:'指導内容へ進む'}).click();
   await page.locator('#f-purpose').selectOption(kind==='trial'?'体験授業のお申し込み':'通常授業のお申し込み');
   await page.locator('input[name="courses"][value="不登校・通信制高校サポート"]').check();
   if(kind==='trial'){
    await page.getByRole('button',{name:'日時・形式へ進む'}).click();
    assert(await page.locator('[data-step="1"]').isVisible(),'Trial acknowledgement required');
    await page.locator('input[name="trialOnceConfirmed"]').check();
   }
   await page.getByRole('button',{name:'日時・形式へ進む'}).click();
   await page.locator('#f-duration').selectOption('60分');
   const values=await page.locator('#schedule1From option').evaluateAll(xs=>xs.map(x=>x.value).filter(Boolean));
   assert(values.every(x=>Number(x.slice(-2))%5===0),'Five-minute schedule options');
   await page.locator('#schedule1Day').selectOption('火曜日');
   await page.locator('#schedule1From').selectOption('18:00');
   await page.locator('#schedule1To').selectOption('20:00');
   await page.getByRole('button',{name:'ご要望の入力へ進む'}).click();
  }
  await page.locator('#f-message').fill('隔離された自動テストです。実送信はありません。');
  await page.locator('#send-button').click();
  assert.equal(posts.length,0,'Consent missing: must not send');
  await page.locator('input[name="privacyAccepted"]').check();
  if(kind!=='consult'){
   await page.locator('#send-button').click();assert.equal(posts.length,0,'Terms missing: must not send');
   await page.locator('input[name="siteTermsAccepted"]').check();
  }
  await page.locator('#send-button').click();
  await page.locator('#form-error').filter({hasText:'テスト用の配信失敗'}).waitFor();
  assert(await page.locator('#f-message').isVisible(),'Failure retains input');
  assert.equal(await page.locator('#success').isVisible(),false,'Failure must not show success');
  responseMode=kind==='normal'?'partial':'success';
  await page.locator('#send-button').click();await page.locator('#success').waitFor();
  assert.equal(posts.length,2);assert.equal(posts[0].requestId,posts[1].requestId,'Retry uses same idempotency ID');
  if(kind==='normal')assert.match(await page.locator('#success').innerText(),/再送信は不要/);
  await page.screenshot({path:`${out}/${engine}-form-${kind}.png`,fullPage:true});
  results.push({engine,kind,result:'pass',checks:['required consents','input retention on delivery failure','idempotent retry','completion UI','no actual email sent']});
  await page.close();
 }
 await browser.close();
}
} catch(error) { await writeFile('audit-results/form-ui-error.txt',error.stack||String(error));process.exitCode=1; }
for(const browser of launched)await browser.close().catch(()=>{});
await writeFile(`${out}/form-ui.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results));
