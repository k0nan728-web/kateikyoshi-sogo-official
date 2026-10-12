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
  privacyAccepted: true,
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
const complete = await testPayload(base);
assert.equal(complete.status, 400);
assert.match(complete.body.error, /認証を完了してください/); // Mandatory application fields passed validation.

const consult = await testPayload({ ...base, kind: "consult", studentName: "", studentNameKana: "", grade: "", region: "", courses: [] });
assert.equal(consult.status, 400);
assert.match(consult.body.error, /認証を完了してください/); // They remain optional for consultation.

const frontend = await readFile("intake/intake.js", "utf8");
for (const key of ["studentName", "studentNameKana", "grade", "region"]) {
  const line = frontend.split("\n").find(s => s.includes('"' + key + '"') && s.includes("required:true"));
  assert.ok(line, key + " must be marked required in application UI");
}
console.log("Application required fields (including furigana): all checks passed");
