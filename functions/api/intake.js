// Cloudflare Pages Functions: dedicated inquiry/application endpoint.
// Required Pages environment secrets: RESEND_API_KEY, INTAKE_FROM_EMAIL,
// TURNSTILE_SECRET_KEY, TURNSTILE_SITE_KEY.
// Do not enable as the primary contact path until these are configured and tested.
const FALLBACK = "https://docs.google.com/forms/d/e/1FAIpQLSdS7FOxXb3MnoANiffjXAxZvVi4GBSIeHrVAZQ_wmkBNsz6NA/viewform";
const DESTINATION = "info@kateikyoshi-sogo.com";
const headers = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
};
const reply = (payload, status = 200) =>
  new Response(JSON.stringify(payload), { status, headers });
const limit = (value, max = 500) => String(value ?? "").trim().slice(0, max);
const line = (label, value) => label + ": " + (Array.isArray(value) ? value.map(v => limit(v, 120)).join("、") : limit(value, 1200) || "—");
const validEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
const configured = env => Boolean(
  env.RESEND_API_KEY && env.INTAKE_FROM_EMAIL &&
  env.TURNSTILE_SECRET_KEY && env.TURNSTILE_SITE_KEY
);
export async function onRequestGet({ env }) {
  return reply({
    available: configured(env),
    turnstileSiteKey: configured(env) ? env.TURNSTILE_SITE_KEY : "",
    fallbackUrl: FALLBACK,
  });
}
export async function onRequestPost({ request, env }) {
  if (!configured(env)) return reply({ ok: false, error: "受付の準備中です。既存のフォームをご利用ください。", fallbackUrl: FALLBACK }, 503);
  const origin = request.headers.get("Origin");
  if (origin) {
    let hostname;
    try { hostname = new URL(origin).hostname; } catch { return reply({ ok: false, error: "送信元を確認できません。" }, 403); }
    if (hostname !== "kateikyoshi-sogo.com" && hostname !== "www.kateikyoshi-sogo.com" &&
        !hostname.endsWith(".pages.dev")) return reply({ ok: false, error: "送信元を確認できません。" }, 403);
  }
  if (!request.headers.get("content-type")?.includes("application/json")) return reply({ ok: false, error: "送信形式が正しくありません。" }, 415);
  if (Number(request.headers.get("content-length") || 0) > 20000) return reply({ ok: false, error: "入力内容が長すぎます。" }, 413);
  let d;
  try {
    const raw = await request.text();
    if (raw.length > 20000) return reply({ ok: false, error: "入力内容が長すぎます。" }, 413);
    d = JSON.parse(raw);
  } catch {
    return reply({ ok: false, error: "入力内容を読み込めませんでした。" }, 400);
  }
  if (d && d.website) return reply({ ok: true }); // honeypot; do not send
  const kind = d?.kind === "apply" ? "apply" : d?.kind === "consult" ? "consult" : null;
  const name = limit(d?.guardianName, 90), email = limit(d?.email, 254);
  if (!kind || !name || !validEmail(email) || !d?.privacyAccepted)
    return reply({ ok: false, error: "お名前・メールアドレス・個人情報の同意をご確認ください。" }, 400);
  if (kind === "apply" && (!limit(d?.studentName, 150) || !limit(d?.studentNameKana, 150) || !limit(d?.grade, 50) || !limit(d?.region, 150) || !Array.isArray(d?.courses) || !d.courses.length))
    return reply({ ok: false, error: "お申し込みには受講者のお名前・ふりがな・学年・お住まいの都道府県と市区町村・ご希望の指導内容が必要です。" }, 400);
  const weekdays = new Set(["月曜日","火曜日","水曜日","木曜日","金曜日","土曜日","日曜日"]);
  const validTime = t => /^([01]\d|2[0-3]):[0-5]\d$/.test(t);
  const scheduleCandidates = [];
  if (kind === "apply") {
    if (!Array.isArray(d.scheduleCandidates) || d.scheduleCandidates.length !== 4)
      return reply({ok:false,error:"希望の曜日・開始可能時間帯を第1候補から入力してください。"},400);
    for (let i = 0; i < 4; i++) {
      const slot = d.scheduleCandidates[i];
      if (!slot || typeof slot !== "object" || Array.isArray(slot))
        return reply({ok:false,error:"希望の曜日・時間帯を確認してください。"},400);
      const day = limit(slot.day,20), from = limit(slot.from,10), to = limit(slot.to,10);
      if (i===0 || day || from || to) {
        if (!weekdays.has(day) || !validTime(from) || !validTime(to) || from > to)
          return reply({ok:false,error:"第"+(i+1)+"候補は、曜日と授業開始可能な時間帯（早い時刻〜遅い時刻）を正しく入力してください。"},400);
        scheduleCandidates.push({rank:i+1,day,from,to});
      }
    }
  }
  if (!limit(d?.token, 2048)) return reply({ ok: false, error: "認証を完了してください。" }, 400);
  const verifyPayload = new FormData();
  verifyPayload.append("secret", env.TURNSTILE_SECRET_KEY);
  verifyPayload.append("response", limit(d.token, 2048));
  const visitorIp = request.headers.get("CF-Connecting-IP");
  if (visitorIp) verifyPayload.append("remoteip", visitorIp);
  let challenge;
  try {
    const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST", body: verifyPayload,
    });
    challenge = await verify.json();
  } catch { return reply({ ok: false, error: "認証を確認できません。時間をおいて再度お試しください。" }, 503); }
  if (!challenge?.success) return reply({ ok: false, error: "認証に失敗しました。再度お試しください。" }, 400);
  const fields = [
    ["種類", kind === "apply" ? "体験授業・通常授業のお申し込み" : "お問い合わせ・無料相談"],
    ["お申し込み内容", d.purpose],
    ["保護者・ご本人のお名前", name],
    ["返信先メールアドレス", email],
    ["電話番号", d.phone],
    ["お子様（受講者）のお名前", d.studentName],
    ["お子様（受講者）のお名前のふりがな", d.studentNameKana],
    ["学年", d.grade],
    ["お住まいの地域", d.region],
    ["学校名（任意）", d.school],
    ["きっかけ", d.discovery],
    ["希望の講座", d.courses],
    ["希望の科目", d.subjects],
    ["ご希望の指導時間", d.duration],
    ["希望の初回指導日時", d.firstDate],
    ["毎週の授業開始可能時間帯（第1〜第4候補）", scheduleCandidates.map(s => "第"+s.rank+"候補： "+s.day+" "+s.from+"〜"+s.to+"の間に授業開始可能")],
    ["オンラインツール", d.tool],
    ["指導形式", d.lessonMode],
    ["ご相談内容・ご要望", d.message],
    ["アクセス元", d.source],
  ];
  const plain = [
    "公式サイトの専用フォームから送信されました。",
    "このメールに返信すると、お問い合わせされた方に返信できます。",
    "",
    ...fields.map(([label, val]) => line(label, val)),
  ].join("\n");
  let outgoing;
  try {
    outgoing = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + env.RESEND_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.INTAKE_FROM_EMAIL,
        to: [DESTINATION],
        reply_to: email,
        subject: kind === "apply" ? "【公式サイト】授業のお申し込み" : "【公式サイト】お問い合わせ・無料相談",
        text: plain,
      }),
    });
  } catch { return reply({ ok: false, error: "送信できませんでした。既存のフォームをご利用ください。", fallbackUrl: FALLBACK }, 502); }
  if (!outgoing.ok) {
    // Deliberately avoid logging the payload or email address.
    return reply({ ok: false, error: "送信できませんでした。既存のフォームをご利用ください。", fallbackUrl: FALLBACK }, 502);
  }
  // Auto-reply is best effort; successful instructor notification is the success condition.
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: "Bearer " + env.RESEND_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env.INTAKE_FROM_EMAIL,
        to: [email],
        subject: "【鈴木雄太のオンライン指導】お問い合わせを受け付けました",
        text: name + " 様\n\nフォームからのご連絡を受け付けました。\n内容を確認し、順次ご返信いたします。\n※このメールは自動送信です。まだ授業日程や契約は確定していません。\n\nプロ家庭教師 鈴木雄太\n" + DESTINATION,
      }),
    });
  } catch {}
  return reply({ ok: true });
}
