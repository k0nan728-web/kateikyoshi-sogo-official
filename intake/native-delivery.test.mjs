import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

// No real submissions are sent from this test. Cloudflare verification and
// email delivery are replaced with isolated simulated responses.
const code = await readFile("functions/api/intake.js", "utf8");
const api = await import("data:text/javascript;base64," + Buffer.from(code).toString("base64"));
const env = {
 RESEND_API_KEY: "test-key-not-real",
 INTAKE_FROM_EMAIL: "Tutor Intake <forms@example.org>",
 TURNSTILE_SITE_KEY: "test-site-not-real",
 TURNSTILE_SECRET_KEY: "test-secret-not-real"
};
const req = (payload) => new Request("https://kateikyoshi-sogo.com/api/intake", {
 method:"POST",headers:{"Content-Type":"application/json",Origin:"https://kateikyoshi-sogo.com"},body:JSON.stringify(payload)
});
const example={
 kind:"apply", guardianName:"フォーム動作確認用", email:"test@example.net",
 studentName:"試験太郎",studentNameKana:"しけんたろう",grade:"中3",
 region:"千葉県柏市",courses:["高校受験対策"],subjects:["英語"],
 duration:"60分",lessonMode:"オンライン指導",message:"通知検証（架空データ）",
 privacyAccepted:true,siteTermsAccepted:true,token:"fake-challenge-token",
 scheduleCandidates:[
  {day:"火曜日",from:"18:00",to:"20:00"},
  {day:"",from:"",to:""},{day:"土曜日",from:"10:00",to:"12:00"},
  {day:"",from:"",to:""}
 ]
};
let emails=[];
let verifyEnabled=true;
let emailSuccess=true;
const previousFetch=globalThis.fetch;
try{
 globalThis.fetch=async (url,init={})=>{
  if(url==="https://challenges.cloudflare.com/turnstile/v0/siteverify")return Response.json({success:verifyEnabled});
  if(url==="https://api.resend.com/emails"){
   const body=JSON.parse(init.body);
   emails.push(body);
   return emailSuccess?Response.json({id:"test-mail-id"}):Response.json({error:"simulated failure"},{status:502});
  }
  throw Error("Unexpected outgoing request: "+url);
 };
 const status=await api.onRequestGet({env});
 assert.equal((await status.json()).available,true);
 const delivered=await api.onRequestPost({request:req(example),env});
 assert.equal(delivered.status,200);
 assert.deepEqual(await delivered.json(),{ok:true});
 assert.equal(emails.length,2);
 assert.deepEqual(emails[0].to,["info@kateikyoshi-sogo.com"]);
 assert.equal(emails[0].reply_to,example.email);
 assert.match(emails[0].text,/試験太郎/);
 assert.match(emails[0].text,/しけんたろう/);
 assert.match(emails[0].text,/第1候補： 火曜日 18:00〜20:00/);
 assert.match(emails[0].text,/第3候補： 土曜日 10:00〜12:00/);
 assert.match(emails[0].text,/確認・同意済み/);
 assert.deepEqual(emails[1].to,[example.email]);
 emails=[];verifyEnabled=false;
 const rejected=await api.onRequestPost({request:req(example),env});
 assert.equal(rejected.status,400);
 assert.equal(emails.length,0);
 emails=[];verifyEnabled=true;emailSuccess=false;
 const failed=await api.onRequestPost({request:req(example),env});
 assert.equal(failed.status,502);
 assert.deepEqual((await failed.json()).ok,false);
 assert.equal(emails.length,1); // instructor dispatch failed, no auto-response
 const unavailable=await api.onRequestGet({env:{}});
 assert.equal((await unavailable.json()).available,false);
 console.log("PASS native delivery contract: instructor notice, confirmation, correct consent/schedule, anti-bot failure, email failure");
} finally {globalThis.fetch=previousFetch;}
