// Isolated Cloudflare Pages API. No shared inquiry settings are mutated.
const enc = new TextEncoder();
const now = () => Math.floor(Date.now() / 1000);
const hex = b => [...new Uint8Array(b)].map(v => v.toString(16).padStart(2, '0')).join('');
const json = (data, status = 200, extra = {}) => new Response(JSON.stringify(data), {status, headers: {
  'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store',
  'x-content-type-options': 'nosniff', 'referrer-policy': 'no-referrer',
  'x-frame-options': 'DENY', 'content-security-policy': "default-src 'none'; frame-ancestors 'none'",
  'x-robots-tag': 'noindex, nofollow', ...extra
}});
const emailOK = v => typeof v === 'string' && v.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const int = (v, min, max) => Number.isSafeInteger(v) && v >= min && v <= max;
const cookie = (token, age) => `__Secure-tuition_session=${token}; Path=/api/tuition; HttpOnly; Secure; SameSite=Strict; Max-Age=${age}`;
async function digest(v) { return hex(await crypto.subtle.digest('SHA-256', enc.encode(v))); }
async function hmac(secret, v) {
  const k = await crypto.subtle.importKey('raw', enc.encode(secret), {name:'HMAC', hash:'SHA-256'}, false, ['sign']);
  return hex(await crypto.subtle.sign('HMAC', k, enc.encode(v)));
}
function sameOrigin(r) { try { return r.headers.get('origin') === new URL(r.url).origin; } catch { return false; } }
function validDate(v) { return typeof v === 'string' && /^20\d{2}-\d{2}-\d{2}$/.test(v) && Number.isFinite(Date.parse(v)) && new Date(v).toISOString().slice(0,10) === v; }
function adminAllowed(u, env) { return u.role !== 'admin' || u.email === env.TUITION_ADMIN_EMAIL.trim().toLowerCase(); }
async function current(r, env) {
  const token = (r.headers.get('cookie') || '').match(/(?:^|;\s*)__Secure-tuition_session=([a-f0-9]{64})(?:;|$)/)?.[1];
  if (!token) return null;
  const hash = await digest(token);
  const u = await env.TUITION_DB.prepare(`SELECT u.id,u.email,u.role,u.display_name,u.active FROM tuition_sessions s
    JOIN tuition_users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at>?`).bind(hash, now()).first();
  return u?.active && adminAllowed(u, env) ? {...u, hash} : null;
}
// Atomic fixed-window counters. Only CF's trusted IP header is used (never X-Forwarded-For).
async function limit(db, key, seconds, max) {
  const bucket = Math.floor(now() / seconds);
  const row = await db.prepare(`INSERT INTO tuition_limits(key,bucket,count,expires_at) VALUES(?,?,1,?)
    ON CONFLICT(key) DO UPDATE SET expires_at=excluded.expires_at,bucket=excluded.bucket,count=CASE WHEN bucket=excluded.bucket THEN count+1 ELSE 1 END
    RETURNING count`).bind(key, bucket, (bucket+1)*seconds).first();
  return row.count <= max;
}
async function audit(db, actor, action, entity, detail = {}) {
  await db.prepare('INSERT INTO tuition_audit(id,actor_id,action,entity_id,detail,created_at) VALUES(?,?,?,?,?,?)')
    .bind(crypto.randomUUID(), actor, action, entity, JSON.stringify(detail), now()).run();
}
const generic = () => json({ok:true, message:'登録済みの場合、確認コードを送信します。'});
const invalid = () => json({error:'コードが無効または期限切れです。'}, 401);
async function route(r, env) {
  if (env.TUITION_ENABLED !== 'true' || !env.TUITION_DB || env.TUITION_AUTH_SECRET?.length < 32 ||
      !env.TUITION_AUTH_SECRET || !env.RESEND_API_KEY || !env.TUITION_FROM_EMAIL || !emailOK(env.TUITION_ADMIN_EMAIL))
    return json({error:'管理システムは準備中です。'}, 503);
  const path = new URL(r.url).pathname.replace(/^\/api\/tuition\/?/, ''), method = r.method;
  if (!['GET','POST'].includes(method)) return json({error:'許可されていない操作です。'}, 405, {allow:'GET, POST'});
  if (method === 'POST' && !sameOrigin(r)) return json({error:'送信元を確認できません。'}, 403);
  let d = {};
  if (method === 'POST') {
    if (!(r.headers.get('content-type') || '').startsWith('application/json')) return json({error:'JSONが必要です。'},415);
    if (Number(r.headers.get('content-length') || 0) > 12000) return json({error:'データが大きすぎます。'},413);
    // Stream with a hard cap, including requests without Content-Length.
    const reader = r.body?.getReader(); const chunks = []; let size = 0;
    if (reader) { while (true) { const {value,done} = await reader.read(); if (done) break;
      size += value.length; if (size > 12000) { await reader.cancel(); return json({error:'データが大きすぎます。'},413); } chunks.push(value); } }
    const bytes = new Uint8Array(size); let offset = 0; for (const c of chunks) { bytes.set(c, offset); offset += c.length; }
    try { d = JSON.parse(new TextDecoder().decode(bytes)); if (!d || typeof d !== 'object' || Array.isArray(d)) throw Error(); }
    catch { return json({error:'入力形式が不正です。'},400); }
  }
  if (['request-code','verify'].includes(path) && method === 'POST') {
    const ipKey = 'ip:' + await hmac(env.TUITION_AUTH_SECRET, r.headers.get('cf-connecting-ip') || 'unknown');
    // Bound table growth even for arbitrary addresses; no unknown-address rows are created.
    if (!await limit(env.TUITION_DB, 'global:' + path, 3600, path === 'verify' ? 600 : 100))
      return json({error:'時間をおいてお試しください。'},429, {'retry-after':'3600'});
    if (!await limit(env.TUITION_DB, ipKey + ':' + path, 600, path === 'verify' ? 30 : 10))
      return json({error:'試行回数が多いため、時間をおいてお試しください。'},429, {'retry-after':'600'});
    await env.TUITION_DB.batch([
      env.TUITION_DB.prepare('DELETE FROM tuition_limits WHERE key IN (SELECT key FROM tuition_limits WHERE expires_at<? LIMIT 500)').bind(now()-3600),
      env.TUITION_DB.prepare('DELETE FROM tuition_sessions WHERE token_hash IN (SELECT token_hash FROM tuition_sessions WHERE expires_at<? LIMIT 500)').bind(now())
    ]);
    const email = typeof d.email === 'string' ? d.email.trim().toLowerCase() : '';
    if (!emailOK(email)) return json({error:'メールアドレスをご確認ください。'},400);
    if (path === 'request-code') {
      const u = await env.TUITION_DB.prepare('SELECT id,email,role FROM tuition_users WHERE email=? AND active=1').bind(email).first();
      if (!u || !adminAllowed(u, env)) return generic();
      if (!await limit(env.TUITION_DB, 'mail:' + await digest(email), 3600, 3)) return generic();
      if (!await limit(env.TUITION_DB, 'global:daily-mail', 86400, 50)) { console.error('tuition daily mail budget exceeded'); return generic(); }
      const values = new Uint32Array(1); do { crypto.getRandomValues(values); } while (values[0] >= 4294000000);
      const code = String(values[0] % 1000000).padStart(6,'0');
      const hash = await hmac(env.TUITION_AUTH_SECRET, email + ':' + code);
      // Preserve the last-send timestamp after consumption to prevent resend bypass.
      const claimed = await env.TUITION_DB.prepare(`INSERT INTO tuition_codes(email,code_hash,expires_at,attempts,last_sent_at) VALUES(?,?,?,?,?)
        ON CONFLICT(email) DO UPDATE SET code_hash=excluded.code_hash,expires_at=excluded.expires_at,attempts=0,last_sent_at=excluded.last_sent_at
        WHERE tuition_codes.last_sent_at<=? RETURNING email`).bind(email,hash,now()+600,0,now(),now()-90).first();
      if (!claimed) return generic();
      try {
        const response = await fetch('https://api.resend.com/emails', {method:'POST', signal:AbortSignal.timeout(10000), headers:{
          Authorization:'Bearer '+env.RESEND_API_KEY, 'Content-Type':'application/json', 'Idempotency-Key':'tuition-otp/'+hash+'/'+now()
        }, body:JSON.stringify({from:env.TUITION_FROM_EMAIL, to:[email], subject:'【家庭教師総合】授業料マイページのログイン確認コード',
          text:`ログイン確認コード: ${code}\n有効期限は10分です。コードを第三者に教えないでください。\n心当たりがない場合は、このメールを無視してください。`})});
        if (!response.ok) throw Error('MailDeliveryError');
      } catch {
        await env.TUITION_DB.prepare('UPDATE tuition_codes SET expires_at=0,attempts=5 WHERE email=? AND code_hash=?').bind(email,hash).run();
        // Do not disclose whether an account exists, including provider failures.
        console.error('tuition email delivery failed');
      }
      return generic();
    }
    if (typeof d.code !== 'string' || !/^\d{6}$/.test(d.code)) return json({error:'確認コードが正しくありません。'},400);
    const rec = await env.TUITION_DB.prepare(`UPDATE tuition_codes SET attempts=attempts+1
      WHERE email=? AND expires_at>? AND attempts<5 RETURNING code_hash`).bind(email, now()).first();
    if (!rec) return invalid();
    const hash = await hmac(env.TUITION_AUTH_SECRET,email+':'+d.code);
    if (rec.code_hash !== hash) return invalid();
    const u = await env.TUITION_DB.prepare('SELECT id,email,role FROM tuition_users WHERE email=? AND active=1').bind(email).first();
    if (!u || !adminAllowed(u,env)) return invalid();
    const tokenBytes = new Uint8Array(32); crypto.getRandomValues(tokenBytes); const token = hex(tokenBytes);
    // Atomic compare-and-consume + session insertion. A racing successful request gets no session.
    const result = await env.TUITION_DB.batch([
      env.TUITION_DB.prepare(`UPDATE tuition_codes SET expires_at=0,attempts=5
        WHERE email=? AND code_hash=? AND expires_at>? AND attempts<=5`).bind(email,hash,now()),
      env.TUITION_DB.prepare(`INSERT INTO tuition_sessions(token_hash,user_id,expires_at)
        SELECT ?,?,? WHERE changes()=1`).bind(await digest(token),u.id,now()+28800)
    ]);
    if (!result[1].meta.changes) return invalid();
    await audit(env.TUITION_DB,u.id,'login',u.id);
    return json({ok:true},200,{'set-cookie':cookie(token,28800)});
  }
  const u = await current(r,env); if (!u) return json({error:'ログインしてください。'},401);
  if (path === 'me' && method === 'GET') return json({user:{id:u.id,email:u.email,role:u.role,name:u.display_name}});
  if (path === 'logout' && method === 'POST') {
    await env.TUITION_DB.prepare('DELETE FROM tuition_sessions WHERE token_hash=?').bind(u.hash).run();
    return json({ok:true},200,{'set-cookie':cookie('',0)});
  }
  if (path === 'invoices' && method === 'GET') {
    const result = await (u.role === 'admin'
      ? env.TUITION_DB.prepare(`SELECT i.*,u.display_name AS parent_name FROM tuition_invoices i JOIN tuition_users u ON u.id=i.parent_id ORDER BY i.period DESC,i.created_at DESC LIMIT 500`)
      : env.TUITION_DB.prepare(`SELECT id,period,course,unit_yen,duration_min,lesson_count,free_count,adjustment_yen,amount_yen,due_date,status,paid_at,version
          FROM tuition_invoices WHERE parent_id=? ORDER BY period DESC,created_at DESC LIMIT 500`).bind(u.id)).all();
    return json({invoices:result.results});
  }
  if (u.role !== 'admin') return json({error:'権限がありません。'},403);
  if (path === 'parents' && method === 'GET') {
    const result = await env.TUITION_DB.prepare("SELECT id,email,display_name,active FROM tuition_users WHERE role='parent' ORDER BY created_at DESC LIMIT 500").all();
    return json({parents:result.results});
  }
  if (path === 'parents' && method === 'POST') {
    const email = typeof d.email === 'string' ? d.email.trim().toLowerCase() : '', name = typeof d.name === 'string' ? d.name.trim() : '';
    if (!emailOK(email) || !name || name.length > 100 || email === env.TUITION_ADMIN_EMAIL.trim().toLowerCase()) return json({error:'登録情報が不正です。'},400);
    if (await env.TUITION_DB.prepare('SELECT id FROM tuition_users WHERE email=?').bind(email).first()) return json({error:'登録済みのメールです。'},409);
    const id = crypto.randomUUID();
    await env.TUITION_DB.batch([
      env.TUITION_DB.prepare('INSERT INTO tuition_users(id,email,role,display_name,created_at) VALUES(?,?,?,?,?)').bind(id,email,'parent',name,now()),
      env.TUITION_DB.prepare('INSERT INTO tuition_audit(id,actor_id,action,entity_id,detail,created_at) VALUES(?,?,?,?,?,?)').bind(crypto.randomUUID(),u.id,'parent.created',id,'{}',now())
    ]);
    return json({ok:true,id},201);
  }
  if (path === 'parent-status' && method === 'POST') {
    if (typeof d.id !== 'string' || ![0,1].includes(d.active)) return json({error:'入力が不正です。'},400);
    const result = await env.TUITION_DB.batch([
      env.TUITION_DB.prepare("UPDATE tuition_users SET active=? WHERE id=? AND role='parent'").bind(d.active,d.id),
      env.TUITION_DB.prepare("INSERT INTO tuition_audit(id,actor_id,action,entity_id,detail,created_at) SELECT ?,?,'parent.status',?,?,? WHERE changes()=1")
        .bind(crypto.randomUUID(),u.id,d.id,JSON.stringify({active:d.active}),now()),
      env.TUITION_DB.prepare("DELETE FROM tuition_sessions WHERE user_id IN (SELECT id FROM tuition_users WHERE id=? AND role='parent')").bind(d.id),
      env.TUITION_DB.prepare("DELETE FROM tuition_codes WHERE email IN (SELECT email FROM tuition_users WHERE id=? AND role='parent')").bind(d.id)
    ]);
    return result[0].meta.changes ? json({ok:true}) : json({error:'保護者が見つかりません。'},404);
  }
  if (path === 'invoices' && method === 'POST') {
    const {parent_id,period,course,unit_yen,duration_min,lesson_count,free_count,adjustment_yen,due_date,request_id} = d;
    if (typeof parent_id !== 'string' || typeof period !== 'string' || !/^20\d{2}-(0[1-9]|1[0-2])$/.test(period) ||
        typeof course !== 'string' || !course.trim() || course.length > 100 || !validDate(due_date) || !int(unit_yen,0,100000) ||
        ![60,90,120].includes(duration_min) || !int(lesson_count,0,31) || !int(free_count,0,lesson_count) || !int(adjustment_yen,-1000000,1000000) ||
        typeof request_id !== 'string' || !/^[a-f0-9-]{36}$/.test(request_id)) return json({error:'請求内容が不正です。'},400);
    const amount = unit_yen * duration_min / 60 * (lesson_count-free_count) + adjustment_yen;
    if (!int(amount,0,10000000)) return json({error:'金額を確認してください。'},400);
    const old = await env.TUITION_DB.prepare('SELECT id,amount_yen FROM tuition_invoices WHERE request_id=?').bind(request_id).first();
    if (old) return json({ok:true,...old});
    const parent = await env.TUITION_DB.prepare("SELECT id FROM tuition_users WHERE id=? AND role='parent' AND active=1").bind(parent_id).first();
    if (!parent) return json({error:'保護者が見つかりません。'},404);
    const id = crypto.randomUUID();
    await env.TUITION_DB.batch([
      env.TUITION_DB.prepare(`INSERT INTO tuition_invoices(id,parent_id,period,course,unit_yen,duration_min,lesson_count,free_count,adjustment_yen,amount_yen,due_date,created_at,updated_at,request_id)
        VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).bind(id,parent_id,period,course.trim(),unit_yen,duration_min,lesson_count,free_count,adjustment_yen,amount,due_date,now(),now(),request_id),
      env.TUITION_DB.prepare('INSERT INTO tuition_audit(id,actor_id,action,entity_id,detail,created_at) VALUES(?,?,?,?,?,?)')
        .bind(crypto.randomUUID(),u.id,'invoice.created',id,JSON.stringify({amount_yen:amount,parent_id}),now())
    ]);
    return json({ok:true,id,amount_yen:amount},201);
  }
  if (path === 'payment' && method === 'POST') {
    if (typeof d.id !== 'string' || !['paid','unpaid'].includes(d.status) || !int(d.version,0,1000000)) return json({error:'入力が不正です。'},400);
    const result = await env.TUITION_DB.batch([
      env.TUITION_DB.prepare(`UPDATE tuition_invoices SET status=?,paid_at=?,updated_at=?,version=version+1 WHERE id=? AND version=?`)
        .bind(d.status,d.status==='paid'?now():null,now(),d.id,d.version),
      env.TUITION_DB.prepare(`INSERT INTO tuition_audit(id,actor_id,action,entity_id,detail,created_at)
        SELECT ?,?,'payment.updated',?,?,? WHERE changes()=1`).bind(crypto.randomUUID(),u.id,d.id,JSON.stringify({status:d.status,previous_version:d.version}),now())
    ]);
    return result[0].meta.changes ? json({ok:true}) : json({error:'請求が更新されています。再読み込みしてください。'},409);
  }
  return json({error:'ページが見つかりません。'},404);
}
export async function onRequest({request,env}) {
  try { return await route(request,env); }
  catch { console.error('tuition portal request failed'); return json({error:'処理に失敗しました。'},500); }
}
