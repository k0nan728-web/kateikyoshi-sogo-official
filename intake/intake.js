(()=>{"use strict";
const form=document.getElementById("intake-form");
if(!form)return;
const kind=document.body.dataset.kind==="apply"?"apply":"consult";
const fallback="https://docs.google.com/forms/d/e/1FAIpQLSdS7FOxXb3MnoANiffjXAxZvVi4GBSIeHrVAZQ_wmkBNsz6NA/viewform";
const fields=document.getElementById("form-fields");
const status=document.getElementById("server-status");
const error=document.getElementById("form-error");
const success=document.getElementById("success");
const sources={"eiken":"英検合格ゼミナール","gyakuten":"逆転合格ゼミナール","bansou":"進路伴走ゼミナール","retry":"Re:大学受験ゼミナール"};
const sourceKey=new URLSearchParams(location.search).get("brand");
const source=sources[sourceKey]||"総合公式サイト";
const grades=["幼稚園","小1","小2","小3","小4","小5","小6","中1","中2","中3","高1","高2","高3","既卒","社会人","その他"];
const purposes=["体験授業について相談","通常授業について相談","料金について相談","指導コースについて相談","その他のご相談"];
const applicationPurposes=["体験授業のお申し込み","通常授業のお申し込み"];
const courseOptions=[
"英検対策（準1級）","英検対策（2級）","英検対策（準2級プラス）","英検対策（準2級）","英検対策（3級）","英検対策（4級）","英検対策（5級）",
"大学受験対策（文系科目）","高校受験対策","中学受験対策（英語・国語・社会）","逆転合格対策","定期テスト対策",
"学校の補習","塾の補習","中高一貫校サポート","不登校・通信制高校サポート","発達特性に配慮した学習支援",
"宿題・提出物サポート","自習見守りサポート","学習相談・カウンセリング","季節講習","その他・相談して決めたい"];
const subjectOptions=[
"英語","国語","社会","現代文","古文","漢文","世界史探究","日本史探究","歴史総合",
"地理探究","地理総合","政治・経済","倫理","公共","英検対策","数学（対応可否を要相談）","理科（対応可否を要相談）","その他"];
const escapeHtml=s=>String(s).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
function field(name,label,{required=false,placeholder="",type="text",help="",auto="",multiline=false}={}){
 const id="f-"+name,req=required?' required aria-required="true"':"";
 const control=multiline?`<textarea id="${id}" name="${name}" rows="5" placeholder="${escapeHtml(placeholder)}"${req} maxlength="2000"></textarea>`:`<input type="${type}" id="${id}" name="${name}" placeholder="${escapeHtml(placeholder)}" ${auto?'autocomplete="'+auto+'"':""} ${type==="email"?'inputmode="email"':""} ${req} maxlength="${type==="email"?254:150}">`;
 return `<div class="field"><label for="${id}">${label}${required?'<span class="required">必須</span>':'<span class="optional">任意</span>'}</label>${control}${help?'<p class="help">'+help+'</p>':""}</div>`;
}
function dropdown(name,label,options,{required=false,help=""}={}){
 return `<div class="field"><label for="f-${name}">${label}${required?'<span class="required">必須</span>':'<span class="optional">任意</span>'}</label><select id="f-${name}" name="${name}" ${required?"required":""}><option value="">選択してください</option>${options.map(x=>'<option value="'+escapeHtml(x)+'">'+escapeHtml(x)+'</option>').join("")}</select>${help?'<p class="help">'+help+'</p>':""}</div>`;
}
function checks(name,label,options,{required=false,help=""}={}){
 return `<fieldset class="field fieldset" data-group="${name}"><legend>${label}${required?'<span class="required">必須</span>':'<span class="optional">任意</span>'}</legend><div class="options">${options.map((x,i)=>`<label><input type="checkbox" name="${name}" value="${escapeHtml(x)}" id="${name}-${i}"><span>${escapeHtml(x)}</span></label>`).join("")}</div>${help?'<p class="help">'+help+'</p>':""}</fieldset>`;
}
const weekdays=["月曜日","火曜日","水曜日","木曜日","金曜日","土曜日","日曜日"];
function scheduleSlot(i){
 const required=i===1;
 const mark=required?'<span class="required">必須</span>':'<span class="optional">任意</span>';
 const id="schedule"+i;
 const options=weekdays.map(day=>'<option value="'+day+'">'+day+'</option>').join("");
 return `<fieldset class="schedule-card" data-schedule="${i}">
 <legend><span>第${["","1","2","3","4"][i]}候補</span>${mark}</legend>
 <div class="schedule-grid">
 <div class="field"><label for="${id}Day">ご希望の曜日</label><select id="${id}Day" name="${id}Day" ${required?"required":""}><option value="">曜日を選択</option>${options}</select></div>
 <div class="field"><label for="${id}From">何時から開始可能？</label><input type="time" id="${id}From" name="${id}From" step="900" ${required?"required":""}></div>
 <div class="field"><label for="${id}To">何時までに開始可能？</label><input type="time" id="${id}To" name="${id}To" step="900" ${required?"required":""}></div>
 </div></fieldset>`;
}
const consent=`<div class="consent"><label><input type="checkbox" name="privacyAccepted" required><span>個人情報の取り扱いに同意します。<span class="required">必須</span><br><span class="small">ご入力いただいた情報は、ご連絡・受講相談・授業準備に利用します。送信にはメール配信サービスを使用します。必要な範囲を超えて公開しません。</span></span></label></div>`;
const challenge='<div id="challenge" class="turnstile" aria-label="迷惑送信防止の認証"></div>';
let step=0,configured=false,widgetId=null,widgetReady=false,turnstileLoading=false;
if(kind==="consult"){
 fields.innerHTML=`
 <p class="notice">迷っている段階でも大丈夫です。学校名や詳しい事情は、初回のお問い合わせでは不要です。</p>
 ${dropdown("purpose","お問い合わせの内容",purposes,{required:true})}
 <div class="two">${field("guardianName","保護者・ご本人のお名前",{required:true,placeholder:"例：山田 花子",auto:"name"})}
 ${field("email","返信用メールアドレス",{required:true,type:"email",placeholder:"例：example@email.com",auto:"email"})}</div>
 <div class="two">${field("phone","電話番号",{type:"tel",placeholder:"電話連絡をご希望の場合",auto:"tel"})}
 ${dropdown("grade","お子様の学年",grades)}</div>
 ${dropdown("discovery","当方を知ったきっかけ",["当方のホームページ","Googleなどの検索サイト","Googleマップ","ジモティ","ストアカ","マナリンク","知り合いからのご紹介","その他"])}
 ${field("message","ご相談内容",{required:true,multiline:true,placeholder:"例：中学2年生の英検対策を考えています。料金や週1回の授業について知りたいです。"})}
 ${consent}${challenge}
 <div class="actions"><button type="submit" class="btn primary" id="send-button">この内容で送信する →</button></div>
 <p class="small">送信後、控えメールをお送りします。契約や料金の請求は発生しません。</p>`;
}else{
 fields.innerHTML=`
 <ol class="steps" aria-label="入力手順"><li class="active">1 ご連絡先</li><li>2 指導内容</li><li>3 日程・形式</li><li>4 ご要望・確認</li></ol>
 <div class="step-panel" data-step="0"><h3 class="step-heading">まずはご連絡先を教えてください</h3>
 ${field("guardianName","保護者・ご本人のお名前",{required:true,placeholder:"例：山田 花子",auto:"name"})}
 ${field("email","返信用メールアドレス",{required:true,type:"email",placeholder:"例：example@email.com",auto:"email"})}
 <div class="two">${field("phone","お電話番号",{type:"tel",auto:"tel",placeholder:"任意"})}
 ${dropdown("grade","お子様の学年",grades,{required:true})}</div>
 <div class="two">${field("studentName","お子様（受講者）のお名前",{required:true,placeholder:"例：山田 太郎",help:"実際に授業を受ける方のお名前をご入力ください。"})}
 ${field("studentNameKana","お子様（受講者）のお名前のふりがな",{required:true,placeholder:"例：やまだ たろう",help:"読み間違いを防ぐため、ひらがなでご入力ください。"})}</div>
 ${field("region","お住まいの都道府県・市区町村",{required:true,placeholder:"例：千葉県柏市",help:"公立高校の入試制度や地域ごとの学習事情を確認するために使用します。町名・番地は不要です。"})}
 <div class="actions"><button type="button" class="btn primary" data-next>指導内容へ進む →</button></div></div>
 <div class="step-panel" data-step="1" hidden><h3 class="step-heading">ご希望の指導内容を教えてください</h3>
 ${dropdown("purpose","お申し込みの種類",applicationPurposes,{required:true})}
 ${checks("courses","ご希望の講座・サポート（複数選択可）",courseOptions,{required:true,help:"まだ決めていない場合は「その他・相談して決めたい」をお選びください。医学的な診断内容などを入力する必要はありません。"})}
 ${checks("subjects","ご希望の指導科目（複数選択可）",subjectOptions,{help:"大学受験の専門指導は文系科目が中心です。数学・理科は学年や内容によって対応できない場合があります。"})}
 <div class="actions"><button type="button" class="btn secondary" data-prev>← 戻る</button><button type="button" class="btn primary" data-next>日時・形式へ進む →</button></div></div>
 <div class="step-panel" data-step="2" hidden><h3 class="step-heading">希望日時・授業形式を教えてください</h3>
 ${dropdown("duration","1回あたりのご希望の時間",["60分","90分","120分","150分","180分","相談して決めたい"],{required:true})}
 ${dropdown("lessonMode","指導形式",["オンライン指導","対面指導（地域・条件を要相談）","相談して決めたい"],{required:true})}
 ${field("firstDate","初回のご希望日時",{placeholder:"例：11月第2週ごろ"})}
 <div class="schedule-section">
 <h4>毎週のご希望曜日と、授業を開始できる時間帯</h4>
 <p class="notice"><strong>例：火曜日の18:00〜20:00の間に授業開始可能</strong><br>ここでの「20:00」は授業終了時刻ではなく、<strong>開始してもよい最も遅い時刻</strong>です。</p>
 <p class="schedule-note">現在、すでに埋まっている指導枠も多くあります。<strong>候補が少ない場合は、ご希望に添えずお引き受けできない可能性が高くなります。</strong> 可能でしたら第2〜第4候補までご入力ください。第1候補のみ必須です。</p>
 ${[1,2,3,4].map(scheduleSlot).join("")}
 </div>
 ${dropdown("tool","ご希望のオンラインツール",["Google Meet","Zoom","その他","相談して決めたい"],{help:"ツールのご利用方法は授業開始前にご案内します。"})}
 <div class="actions"><button type="button" class="btn secondary" data-prev>← 戻る</button><button type="button" class="btn primary" data-next>ご要望の入力へ進む →</button></div></div>
 <div class="step-panel" data-step="3" hidden><h3 class="step-heading">最後に、ご要望をお聞かせください</h3>
 <p class="notice">フォーム送信は「お申し込み希望の受付」です。日程・料金・受講開始は、講師本人との確認後に確定します。</p>
 ${field("school","学校名",{placeholder:"任意。最初の段階では不要です。"})}
 ${dropdown("discovery","当方を知ったきっかけ",["当方のホームページ","Googleなどの検索サイト","Googleマップ","ジモティ","ストアカ","マナリンク","知り合いからのご紹介","その他"])}
 ${field("message","授業へのご要望・現在の学習状況",{required:true,multiline:true,placeholder:"例：英検2級合格に向けて、ライティングを重点的に指導してほしいです。"})}
 ${consent}${challenge}
 <div class="actions"><button type="button" class="btn secondary" data-prev>← 戻る</button><button type="submit" class="btn primary" id="send-button">申し込み希望を送信する →</button></div>
 <p class="small">送信完了メールをお送りします。送信のみで契約・決済が発生することはありません。</p></div>`;
}
const panels=[...form.querySelectorAll(".step-panel")];
function setStep(next){
 step=next;
 panels.forEach((x,i)=>{x.hidden=i!==step});
 form.querySelectorAll(".steps li").forEach((x,i)=>{x.classList.toggle("active",i===step);x.classList.toggle("done",i<step)});
 error.hidden=true;
 const heading=panels[step].querySelector("h3");
 heading?.scrollIntoView({block:"start",behavior:"instant"});
 if(step===3)loadTurnstile();
 heading?.setAttribute("tabindex","-1");heading?.focus({preventScroll:true});
}
function validatePanel(){
 const panel=kind==="apply"?panels[step]:form;
 for(const el of panel.querySelectorAll("[required]")){
   if(!el.checkValidity()){el.reportValidity();el.focus();return false}
 }
 if(kind==="apply" && step===1 && !form.querySelector('[name="courses"]:checked')){
  showError("ご希望の講座を1つ以上選んでください。");form.querySelector('[name="courses"]')?.focus();return false;
 }
 if(kind==="apply" && step===2){
  for(let i=1;i<=4;i++){
   const day=form.elements.namedItem("schedule"+i+"Day");
   const from=form.elements.namedItem("schedule"+i+"From");
   const to=form.elements.namedItem("schedule"+i+"To");
   const values=[day.value,from.value,to.value];
   if(i===1 || values.some(Boolean)){
    if(values.some(v=>!v)){
     showError("第"+i+"候補は、曜日・開始可能な最も早い時刻・最も遅い時刻をすべて入力してください。");
     [day,from,to].find(el=>!el.value)?.focus();return false;
    }
    if(from.value>=to.value){
     showError("第"+i+"候補の開始可能時間帯は、終了側の時刻を開始側より遅く設定してください。");
     to.focus();return false;
    }
   }
  }
 }
 return true;
}
form.addEventListener("click",e=>{
 const next=e.target.closest("[data-next]"),prev=e.target.closest("[data-prev]");
 if(next){if(validatePanel())setStep(Math.min(step+1,3))}
 if(prev)setStep(Math.max(step-1,0));
});
function showError(message){
 error.textContent=message;
 error.hidden=false;
 error.scrollIntoView({block:"nearest"});
}
function unavailable(){
 status.hidden=false;
 status.textContent="現在、専用フォームの送信先を準備しています。お手数ですが、正式稼働まで既存のGoogleフォームからご連絡ください。";
 const a=document.createElement("a");a.href=fallback;a.target="_blank";a.rel="noopener noreferrer";a.textContent="既存のGoogleフォームを開く →";status.append(document.createElement("br"),a);
 for(const button of form.querySelectorAll('[type="submit"]'))button.disabled=true;
}
async function initialize(){
 try{
  const response=await fetch("/api/intake",{headers:{Accept:"application/json"},cache:"no-store"});
  if(!response.ok)throw Error("Endpoint not ready");
  const config=await response.json();
  if(!config.available || !config.turnstileSiteKey)throw Error("Not configured");
  configured=true;
  window.__intakeSiteKey=config.turnstileSiteKey;
  if(kind==="consult")loadTurnstile();
 }catch{unavailable()}
}
function loadTurnstile(){
 if(!configured||widgetReady||turnstileLoading)return;
 turnstileLoading=true;
 const script=document.createElement("script");
 script.src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
 script.async=true;script.defer=true;
 script.onload=()=>{
  try{
   widgetId=window.turnstile.render("#challenge",{sitekey:window.__intakeSiteKey,theme:"light"});
   widgetReady=true;
  }catch{showError("認証画面を表示できません。ブラウザの設定をご確認ください。")}
 };
 script.onerror=()=>showError("認証画面を読み込めません。再読み込みをお試しください。");
 document.head.appendChild(script);
}
form.addEventListener("submit",async e=>{
 e.preventDefault();
 if(!configured){showError("現在は既存のGoogleフォームからお問い合わせください。");return}
 if(!validatePanel())return;
 const token=widgetReady?window.turnstile.getResponse(widgetId):"";
 if(!token){showError("迷惑送信防止の認証を完了してください。");return}
 const data=new FormData(form);
 const payload=Object.fromEntries(data.entries());
 payload.kind=kind;
 payload.courses=data.getAll("courses");
 payload.subjects=data.getAll("subjects");
 payload.privacyAccepted=data.get("privacyAccepted")==="on";
 payload.source=source;
 payload.token=token;
 payload.website=data.get("website")||"";
 const button=form.querySelector("#send-button");
 button.disabled=true;button.textContent="送信中…";error.hidden=true;
 try{
  const response=await fetch("/api/intake",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload),cache:"no-store"});
  const result=await response.json();
  if(!response.ok||!result.ok)throw new Error(result.error||"送信できませんでした。");
  form.hidden=true;document.querySelector(".form-top").hidden=true;
  success.hidden=false;success.scrollIntoView({block:"center"});
 }catch(err){
  showError(err.message+" 送信できない場合は、ページ内の既存フォームをご利用ください。");
  try{window.turnstile.reset(widgetId)}catch{}
 }finally{button.disabled=false;button.textContent=kind==="apply"?"申し込み希望を送信する →":"この内容で送信する →"}
});
const honeypot=document.createElement("input");honeypot.name="website";honeypot.type="text";honeypot.autocomplete="off";honeypot.tabIndex=-1;honeypot.setAttribute("aria-hidden","true");honeypot.style.cssText="position:absolute;left:-9999px;opacity:0;height:0;width:0";form.appendChild(honeypot);
if(kind==="apply"){
 const choices=form.querySelectorAll('[name="courses"]');
 if(sourceKey==="eiken")choices[0]?.click();
 if(sourceKey==="gyakuten")choices[10]?.click();
 if(sourceKey==="bansou")choices[15]?.click();
 if(sourceKey==="retry")choices[7]?.click();
}
initialize();
})();