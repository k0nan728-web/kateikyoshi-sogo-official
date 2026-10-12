import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const workerSource = await readFile("functions/api/intake.js", "utf8");
const moduleUrl = "data:text/javascript;base64," + Buffer.from(workerSource).toString("base64");
const { onRequestPost } = await import(moduleUrl);
const env = {
  RESEND_API_KEY: "test-key",
  INTAKE_FROM_EMAIL: "forms@example.com",
  TURNSTILE_SITE_KEY: "test-site-key",
  TURNSTILE_SECRET_KEY: "test-secret",
};
const base = {
  kind: "apply",
  guardianName: "山田 花子",
  email: "test@example.net",
  studentName: "山田 太郎",
  studentNameKana: "やまだ たろう",
  grade: "中3",
  region: "千葉県柏市",
  courses: ["高校受験対策"],
  purpose: "通常授業のお申し込み",
  lessonMode: "オンライン指導",
  scheduleCandidates: [
    {day:"火曜日",from:"18:00",to:"20:00"},
    {day:"木曜日",from:"19:00",to:"21:00"},
    {day:"",from:"",to:""},
    {day:"",from:"",to:""},
  ],
  privacyAccepted: true,
  siteTermsAccepted: true,
  token: "",
};
async function testPayload(fields) {
  const request = new Request("https://kateikyoshi-sogo.com/api/intake", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://kateikyoshi-sogo.com",
    },
    body: JSON.stringify(fields),
  });
  const response = await onRequestPost({ request, env });
  return { status: response.status, body: await response.json() };
}
for (const key of ["studentName", "studentNameKana", "grade", "region"]) {
  const missing = { ...base, [key]: "" };
  const result = await testPayload(missing);
  assert.equal(result.status, 400, key + " missing must fail");
  assert.match(result.body.error, /受講者のお名前・ふりがな・学年・お住まいの都道府県/);
  const whitespace = { ...base, [key]: "   " };
  const spaceResult = await testPayload(whitespace);
  assert.equal(spaceResult.status, 400, key + " whitespace must fail");
  assert.match(spaceResult.body.error, /受講者のお名前・ふりがな・学年・お住まいの都道府県/);
}
// Only online instruction is available; in-person or undecided modes are rejected.
for(const lessonMode of ["対面指導（地域・条件を要相談）","相談して決めたい",""]){
 const r=await testPayload({...base,lessonMode});
 assert.equal(r.status,400);
 assert.match(r.body.error,/オンライン指導のみ/);
}
const absentKind=await testPayload({...base,purpose:""});
assert.equal(absentKind.status,400);
assert.match(absentKind.body.error,/お申し込みの種類/);
// Trial students can take a trial only once, regardless of course or exam grade.
const trialWithoutConfirmation=await testPayload({...base,purpose:"体験授業のお申し込み"});
assert.equal(trialWithoutConfirmation.status,400);
assert.match(trialWithoutConfirmation.body.error,/お一人1回限り/);
const trialAsString=await testPayload({...base,purpose:"体験授業のお申し込み",trialOnceConfirmed:"on"});
assert.equal(trialAsString.status,400);
assert.match(trialAsString.body.error,/お一人1回限り/);
const firstTrial=await testPayload({...base,purpose:"体験授業のお申し込み",trialOnceConfirmed:true});
assert.equal(firstTrial.status,400);
assert.match(firstTrial.body.error,/認証を完了してください/); // All required checks passed.
// Schedule requirements: first weekly start window is mandatory.
for (const field of ["day","from","to"]) {
 const result = await testPayload({
   ...base,
   scheduleCandidates: [{...base.scheduleCandidates[0],[field]:""},...base.scheduleCandidates.slice(1)]
 });
 assert.equal(result.status,400,"first choice missing "+field);
 assert.match(result.body.error,/第1候補/);
}
const partialSecond = await testPayload({
 ...base,
 scheduleCandidates: [
  base.scheduleCandidates[0],
  {day:"木曜日",from:"",to:"21:00"},
  base.scheduleCandidates[2],base.scheduleCandidates[3]
 ]
});
assert.equal(partialSecond.status,400);
assert.match(partialSecond.body.error,/第2候補/);
const invertedWindow=await testPayload({
 ...base,
 scheduleCandidates: [
  {day:"火曜日",from:"20:00",to:"18:00"},
  ...base.scheduleCandidates.slice(1)
 ]
});
assert.equal(invertedWindow.status,400);
assert.match(invertedWindow.body.error,/第1候補/);
const exactStart=await testPayload({
 ...base,
 scheduleCandidates:[{day:"火曜日",from:"18:00",to:"18:00"},...base.scheduleCandidates.slice(1)]
});
assert.equal(exactStart.status,400);
assert.match(exactStart.body.error,/認証を完了してください/); // Exact single start time is allowed.
const firstOnly=await testPayload({
 ...base,
 scheduleCandidates: [base.scheduleCandidates[0],...Array.from({length:3},()=>({day:"",from:"",to:""}))]
});
assert.equal(firstOnly.status,400);
assert.match(firstOnly.body.error,/認証を完了してください/); // Valid schedule, missing challenge token.
const invalidDay=await testPayload({
 ...base,
 scheduleCandidates: [{day:"架空曜日",from:"18:00",to:"20:00"},...base.scheduleCandidates.slice(1)]
});
assert.equal(invalidDay.status,400);
assert.match(invalidDay.body.error,/第1候補/);
const absentConsent = await testPayload({...base,siteTermsAccepted:false});
assert.equal(absentConsent.status,400);
assert.match(absentConsent.body.error,/受講条件をご確認/);
const missingConsent = {...base};
delete missingConsent.siteTermsAccepted;
const missingConsentResult = await testPayload(missingConsent);
assert.equal(missingConsentResult.status,400);
assert.match(missingConsentResult.body.error,/受講条件をご確認/);
const textualConsent = await testPayload({...base,siteTermsAccepted:"on"});
assert.equal(textualConsent.status,400);
assert.match(textualConsent.body.error,/受講条件をご確認/);
const complete = await testPayload(base);
assert.equal(complete.status, 400);
assert.match(complete.body.error, /認証を完了してください/); // Mandatory application fields passed validation.

const consult = await testPayload({ ...base, kind: "consult", studentName: "", studentNameKana: "", grade: "", region: "", courses: [], siteTermsAccepted: false });
assert.equal(consult.status, 400);
assert.match(consult.body.error, /認証を完了してください/); // They remain optional for consultation.

const frontend = await readFile("intake/intake.js", "utf8");
for (const key of ["studentName", "studentNameKana", "grade", "region"]) {
  const line = frontend.split("\n").find(s => s.includes('"' + key + '"') && s.includes("required:true"));
  assert.ok(line, key + " must be marked required in application UI");
}
assert.match(frontend,/第1候補のみ必須です/);
assert.match(frontend,/候補が少ない場合は/);
assert.match(frontend,/for\(let i=1;i<=4;i\+\+\)/);
assert.ok(!frontend.includes('for(const button of form.querySelectorAll(\'[type="submit"]\'))button.disabled=true'),"Preview must not disable submit entirely");
assert.match(frontend,/name="siteTermsAccepted"/);
assert.match(frontend,/公式サイト掲載内容を確認/);
assert.match(frontend,/キャンセル規定を見る/);
assert.match(frontend,/name="trialOnceConfirmed"/);
assert.match(frontend,/英検の級・教科・コース・申込窓口を変えても/);
assert.match(frontend,/対面による家庭教師は現在受け付けておらず/);
assert.ok(!frontend.includes('"対面指導（地域・条件を要相談）"'),"In-person application option must be removed");
assert.ok(!frontend.includes('dropdown("lessonMode"'),"No lesson-mode dropdown should remain");

const applicationHtml = await readFile("apply/index.html","utf8");
assert.match(applicationHtml,/<h1 class="apply-title"><span class="responsive-phrase">体験授業・通常授業の<\/span><span class="responsive-phrase">お申し込み<\/span><\/h1>/);
const css = await readFile("intake/intake.css","utf8");
assert.match(css,/\.apply-title \.responsive-phrase/);
assert.match(css,/max-width:600px/);
console.log("Application required fields, site-term consent, mobile heading, start windows and preview fallback: all checks passed");
