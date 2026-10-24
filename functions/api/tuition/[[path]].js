// Cloudflare Pages Function, isolated from the public inquiry API.
// Bind TUITION_DB (D1), TUITION_AUTH_SECRET (random 32+ chars),
// RESEND_API_KEY, TUITION_FROM_EMAIL and TUITION_ADMIN_EMAIL before enabling.
const json=(data,status=200,extra={})=>new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store","x-content-type-options":"nosniff",...extra}});
const encoder=new TextEncoder();
const now=()=>Math.floor(Date.now()/1000);
const hex=bytes=>[...new Uint8Array(bytes)].map(b=>b.toString(16).padStart(2,"0")).join("");
async function digest(value){return hex(await crypto.subtle.digest("SHA-256",encoder.encode(value)));}
async function hmac(secret,value){const key=await crypto.subtle.importKey("raw",encoder.encode(secret),{name:"HMAC",hash:"SHA-256"},false,["sign"]);return hex(await crypto.subtle.sign("HMAC",key,encoder.encode(value)));}
const emailOK=v=>typeof v==="string"&&v.length<=254&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const cookie=(value,age)=>"tuition_session="+value+"; Path=/api/tuition; HttpOnly; Secure; SameSite=Strict; Max-Age="+age;
function sameOrigin(request){const origin=request.headers.get("origin");if(!origin)return false;try{return new URL(origin).origin===new URL(request.url).origin;}catch{return false;}}
async function current(request,env){const token=(request.headers.get("cookie")||"").match(/(?:^|;\s*)tuition_session=([a-f0-9]{64})(?:;|$)/)?.[1];if(!token)return null;const hash=await digest(token);return env.TUITION_DB.prepare("SELECT u.id,u.email,u.role,u.display_name,u.active FROM tuition_sessions s JOIN tuition_users u ON u.id=s.user_id WHERE s.token_hash=? AND s.expires_at>?").bind(hash,now()).first().then(u=>u?.active?{...u,hash}:null);}
const goodInt=(v,min,max)=>Number.isSafeInteger(v)&&v>=min&&v<=max;
async function route(request,env){
 if(!env.TUITION_DB||!env.TUITION_AUTH_SECRET||env.TUITION_AUTH_SECRET.length<32||!env.RESEND_API_KEY||!env.TUITION_FROM_EMAIL||!emailOK(env.TUITION_ADMIN_EMAIL))return json({error:"管理システムは準備中です。"},503);
 const url=new URL(request.url),path=url.pathname.replace(/^\/api\/tuition\/?/,""),method=request.method;
 if(method!=="GET"&&!sameOrigin(request))return json({error:"送信元を確認できません。"},403);
 let d={};if(method==="POST"){if(!(request.headers.get("content-type")||"").includes("application/json"))return json({error:"JSONが必要です。"},415);if(Number(request.headers.get("content-length")||0)>12000)return json({error:"データが大きすぎます。"},413);const raw=await request.text();if(raw.length>12000)return json({error:"データが大きすぎます。"},413);try{d=JSON.parse(raw);if(!d||typeof d!=="object"||Array.isArray(d))throw 0;}catch{return json({error:"入力形式が不正です。"},400);}}
 if(path==="request-code"&&method==="POST"){
  const email=String(d.email||"").trim().toLowerCase();if(!emailOK(email))return json({error:"メールアドレスをご確認ください。"},400);
  const user=await env.TUITION_DB.prepare("SELECT id FROM tuition_users WHERE email=? AND active=1").bind(email).first();
  const existing=await env.TUITION_DB.prepare("SELECT last_sent_at FROM tuition_codes WHERE email=?").bind(email).first();
  // Generic response to avoid revealing registered email addresses.
  if(!user||existing&&existing.last_sent_at>now()-90)return json({ok:true,message:"登録済みの場合、確認コードを送信します。"});
  const random=new Uint32Array(1);crypto.getRandomValues(random);const code=String(random[0]%1000000).padStart(6,"0");
  const hash=await hmac(env.TUITION_AUTH_SECRET,email+":"+code);
  await env.TUITION_DB.prepare("INSERT INTO tuition_codes(email,code_hash,expires_at,attempts,last_sent_at) VALUES(?,?,?,?,?) ON CONFLICT(email) DO UPDATE SET code_hash=excluded.code_hash,expires_at=excluded.expires_at,attempts=0,last_sent_at=excluded.last_sent_at").bind(email,hash,now()+600,0,now()).run();
  const resp=await fetch("https://api.resend.com/emails",{method:"POST",headers:{"Authorization":"Bearer "+env.RESEND_API_KEY,"Content-Type":"application/json"},body:JSON.stringify({from:env.TUITION_FROM_EMAIL,to:[email],subject:"【家庭教師総合】ログイン確認コード",text:"ログイン確認コード: "+code+"\n有効期限は10分です。心当たりがなければ無視してください。"})});
  if(!resp.ok){await env.TUITION_DB.prepare("DELETE FROM tuition_codes WHERE email=?").bind(email).run();return json({error:"メール送信に失敗しました。"},503);}
  return json({ok:true,message:"登録済みの場合、確認コードを送信します。"});
 }
 if(path==="verify"&&method==="POST"){
  const email=String(d.email||"").trim().toLowerCase(),code=String(d.code||"");
  if(!emailOK(email)||!/^[0-9]{6}$/.test(code))return json({error:"確認コードが正しくありません。"},400);
  const rec=await env.TUITION_DB.prepare("SELECT * FROM tuition_codes WHERE email=?").bind(email).first();
  if(!rec||rec.expires_at<now()||rec.attempts>=5)return json({error:"コードが無効または期限切れです。"},401);
  await env.TUITION_DB.prepare("UPDATE tuition_codes SET attempts=attempts+1 WHERE email=?").bind(email).run();
  if(rec.code_hash!==await hmac(env.TUITION_AUTH_SECRET,email+":"+code))return json({error:"コードが無効または期限切れです。"},401);
  const user=await env.TUITION_DB.prepare("SELECT id FROM tuition_users WHERE email=? AND active=1").bind(email).first();
  if(!user)return json({error:"ログインできません。"},401);
  await env.TUITION_DB.prepare("DELETE FROM tuition_codes WHERE email=?").bind(email).run();
  const bytes=new Uint8Array(32);crypto.getRandomValues(bytes);const token=hex(bytes);
  await env.TUITION_DB.prepare("INSERT INTO tuition_sessions(token_hash,user_id,expires_at) VALUES(?,?,?)").bind(await digest(token),user.id,now()+86400).run();
  return json({ok:true},200,{"set-cookie":cookie(token,86400)});
 }
 const user=await current(request,env);if(!user)return json({error:"ログインしてください。"},401);
 if(path==="me"&&method==="GET")return json({user:{id:user.id,email:user.email,role:user.role,name:user.display_name}});
 if(path==="logout"&&method==="POST"){await env.TUITION_DB.prepare("DELETE FROM tuition_sessions WHERE token_hash=?").bind(user.hash).run();return json({ok:true},200,{"set-cookie":cookie("",0)});}
 if(path==="invoices"&&method==="GET"){
  const isAdmin=user.role==="admin";
  const rows=await (isAdmin?env.TUITION_DB.prepare("SELECT i.*,u.display_name AS parent_name FROM tuition_invoices i JOIN tuition_users u ON u.id=i.parent_id ORDER BY i.period DESC,i.created_at DESC LIMIT 200").all():env.TUITION_DB.prepare("SELECT id,period,course,unit_yen,duration_min,lesson_count,free_count,adjustment_yen,amount_yen,due_date,status,paid_at FROM tuition_invoices WHERE parent_id=? ORDER BY period DESC LIMIT 100").bind(user.id).all());
  return json({invoices:rows.results});
 }
 if(user.role!=="admin")return json({error:"権限がありません。"},403);
 if(path==="parents"&&method==="GET"){const r=await env.TUITION_DB.prepare("SELECT id,email,display_name,active FROM tuition_users WHERE role='parent' ORDER BY created_at DESC LIMIT 200").all();return json({parents:r.results});}
 if(path==="parents"&&method==="POST"){
  const email=String(d.email||"").trim().toLowerCase(),name=String(d.name||"").trim();
  if(!emailOK(email)||!name||name.length>100)return json({error:"登録情報が不正です。"},400);
  if(email===env.TUITION_ADMIN_EMAIL.toLowerCase())return json({error:"管理者メールは登録できません。"},400);
  try{await env.TUITION_DB.prepare("INSERT INTO tuition_users(id,email,role,display_name,created_at) VALUES(?,?,?,?,?)").bind(crypto.randomUUID(),email,"parent",name,now()).run();}catch{return json({error:"すでに登録されている可能性があります。"},409);}
  return json({ok:true},201);
 }
 if(path==="invoices"&&method==="POST"){
  const {parent_id,period,course,unit_yen,duration_min,lesson_count,free_count,adjustment_yen,due_date}=d;
  if(typeof parent_id!=="string"||typeof period!=="string"||!/^[0-9]{4}-(0[1-9]|1[0-2])$/.test(period)||typeof course!=="string"||!course.trim()||course.length>100||typeof due_date!=="string"||!/^\d{4}-\d{2}-\d{2}$/.test(due_date)||!goodInt(unit_yen,0,100000)||![60,90,120].includes(duration_min)||!goodInt(lesson_count,0,31)||!goodInt(free_count,0,lesson_count)||!goodInt(adjustment_yen,-1000000,1000000))return json({error:"請求内容が不正です。"},400);
  const parent=await env.TUITION_DB.prepare("SELECT id FROM tuition_users WHERE id=? AND role='parent' AND active=1").bind(parent_id).first();if(!parent)return json({error:"保護者が見つかりません。"},404);
  const amount=unit_yen*duration_min/60*(lesson_count-free_count)+adjustment_yen;if(!goodInt(amount,0,10000000))return json({error:"金額を確認してください。"},400);
  const id=crypto.randomUUID();await env.TUITION_DB.prepare("INSERT INTO tuition_invoices(id,parent_id,period,course,unit_yen,duration_min,lesson_count,free_count,adjustment_yen,amount_yen,due_date,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)").bind(id,parent_id,period,course,unit_yen,duration_min,lesson_count,free_count,adjustment_yen,amount,due_date,now(),now()).run();
  return json({ok:true,id,amount_yen:amount},201);
 }
 if(path==="payment"&&method==="POST"){
  if(typeof d.id!=="string"||!["paid","unpaid"].includes(d.status))return json({error:"入力が不正です。"},400);
  const result=await env.TUITION_DB.prepare("UPDATE tuition_invoices SET status=?,paid_at=?,updated_at=? WHERE id=?").bind(d.status,d.status==="paid"?now():null,now(),d.id).run();
  return result.meta.changes?json({ok:true}):json({error:"請求が見つかりません。"},404);
 }
 return json({error:"ページが見つかりません。"},404);
}
export async function onRequest({request,env}){try{return await route(request,env);}catch(e){console.error("tuition portal request failed",e?.name||"error");return json({error:"処理に失敗しました。"},500);}}
