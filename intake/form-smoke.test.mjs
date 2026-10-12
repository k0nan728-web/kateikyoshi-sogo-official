import {chromium} from "playwright";
const site=process.env.APP_URL||"https://feature-intake-forms-2026101.kateikyoshi-sogo.pages.dev";
const browser=await chromium.launch({headless:true});
const failures=[];
for(const size of [{w:390,h:844},{w:1366,h:900}]){
 const page=await browser.newPage({viewport:{width:size.w,height:size.h}});
 const errors=[];
 page.on("pageerror",error=>errors.push(String(error)));
 await page.goto(site+"/apply/",{waitUntil:"domcontentloaded",timeout:30000});
 await page.locator("#f-guardianName").waitFor({state:"visible"});
 await page.waitForTimeout(2000);
 if(errors.length)throw Error("page errors: "+errors.join("; "));
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))
  throw Error("Horizontal overflow at width "+size.w);
 const heading=page.locator("h1.apply-title");
 const spans=heading.locator("span.responsive-phrase");
 if(await spans.count()!==2)throw Error("Heading phrases not grouped");
 const lines=await spans.evaluateAll(nodes=>nodes.map(x=>Math.round(x.getBoundingClientRect().top)));
 if(size.w===390 && lines[0]===lines[1])throw Error("Mobile heading did not break after semantic phrase");
 await page.locator("#f-guardianName").fill("テスト保護者");
 await page.locator("#f-email").fill("test@example.com");
 await page.locator("#f-grade").selectOption({label:"中3"});
 await page.locator("#f-studentName").fill("テスト生徒");
 await page.locator("#f-studentNameKana").fill("てすとせいと");
 await page.locator("#f-region").fill("千葉県柏市");
 await page.getByRole("button",{name:"指導内容へ進む"}).click();
 await page.locator("#f-purpose").selectOption({label:"体験授業のお申し込み"});
 await page.locator('input[name="courses"]').first().check();
 await page.getByRole("button",{name:"日時・形式へ進む"}).click();
 await page.locator("#f-duration").selectOption({label:"60分"});
 await page.locator("#f-lessonMode").selectOption({label:"オンライン指導"});
 await page.locator("#schedule1Day").selectOption({label:"火曜日"});
 await page.locator("#schedule1From").fill("18:00");
 await page.locator("#schedule1To").fill("20:00");
 await page.getByRole("button",{name:"ご要望の入力へ進む"}).click();
 await page.locator("#f-message").fill("英語の体験授業を希望しています。");
 // Both consents are mandatory; missing terms must not reach next screen.
 const btn=page.locator("#send-button");
 await page.locator('input[name="privacyAccepted"]').check();
 await btn.click();
 if(await page.locator("#form-error").isHidden())throw Error("Missing site-terms agreement not caught");
 await page.locator('input[name="siteTermsAccepted"]').check();
 // The final submit falls back to an explicitly labeled Google Form handoff
 // when Cloudflare email variables have not yet been configured.
 const label=await btn.innerText();
 if(label.includes("Googleフォーム")){
  const popupPromise=page.waitForEvent("popup",{timeout:10000});
  await btn.click();
  const popup=await popupPromise;
  const target=popup.url();
  if(!target.includes("docs.google.com/forms/d/e/"))throw Error("Wrong fallback destination: "+target);
  if(!target.includes("entry.1564624791="))throw Error("Prefill did not carry purpose");
  await popup.close();
 }else{
  console.log("Backend is configured, skipping live submission to avoid creating a fake inquiry.");
 }
 await page.screenshot({path:"/tmp/intake-"+size.w+".png",fullPage:true});
 await page.close();
 console.log("PASS "+size.w+"px viewport, 4-step form, consent and submission handoff");
}
await browser.close();
