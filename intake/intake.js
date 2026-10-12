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
const serviceAgreement=`<section class="consent terms-consent" aria-labelledby="terms-title">
 <h4 id="terms-title">お申し込み前の確認事項</h4>
 <p class="terms-lead">公式サイトに掲載されている指導内容・料金・受講条件をご確認ください。各リンクは新しいタブで開きます。</p>
 <ul class="terms-links">
 <li><a href="https://kateikyoshi-sogo.com/#pricing" target="_blank" rel="noopener noreferrer">授業料金・受講条件を見る ↗</a></li>
 <li><a href="https://kateikyoshi-sogo.com/#cancel-policy" target="_blank" rel="noopener noreferrer">キャンセル規定を見る ↗</a></li>
 <li><a href="https://kateikyoshi-sogo.com/#process" target="_blank" rel="noopener noreferrer">受講開始までの流れを見る ↗</a></li>
 </ul>
 <label class="agreement-check"><input type="checkbox" name="siteTermsAccepted" value="on" required><span>上記の公式サイト掲載内容を確認し、申し込みに関する条件に同意します。<span class="required">必須</span></span></label>
 <p class="terms-help"><strong>現在の指導形式はオンラインのみです。</strong> 体験授業は受講者お一人1回限りで、級・科目・コースを変えても再度体験できません。このフォームは受講希望の受付であり、送信だけで授業日時や契約は確定しません。正式な条件は講師との確認後にご案内します。</p>
 </section>`;
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
 <p class="small">受付方法によってはGoogleフォームでの最終送信が必要です。お問い合わせだけで契約や料金の請求は発生しません。</p>`;
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
 <p class="notice trial-policy"><strong>体験授業は受講者お一人につき1回限りです。</strong> 英検の級・教科・コース・申込窓口を変えても、2回目の体験授業はお受けできません。体験授業は有料です。料金・空き状況を確認してご案内します。</p>
 <div class="consent trial-confirm" id="trial-confirm" hidden><label><input type="checkbox" name="trialOnceConfirmed" value="on"><span>今回の受講者は、鈴木雄太による体験授業をこれまで受けていません。<span class="required">必須</span><span class="small">過去に別コース・別の級で体験済みの場合は、通常授業のお申し込みまたは無料相談をご利用ください。</span></span></label></div>
 ${checks("courses","ご希望の講座・サポート（複数選択可）",courseOptions,{required:true,help:"まだ決めていない場合は「その他・相談して決めたい」をお選びください。医学的な診断内容などを入力する必要はありません。"})}
 ${checks("subjects","ご希望の指導科目（複数選択可）",subjectOptions,{help:"大学受験の専門指導は文系科目が中心です。数学・理科は学年や内容によって対応できない場合があります。"})}
 <div class="actions"><button type="button" class="btn secondary" data-prev>← 戻る</button><button type="button" class="btn primary" data-next>日時・形式へ進む →</button></div></div>
 <div class="step-panel" data-step="2" hidden><h3 class="step-heading">希望日時・授業形式を教えてください</h3>
 ${dropdown("duration","1回あたりのご希望の時間",["60分","90分","120分","150分","180分","相談して決めたい"],{required:true})}
 <div class="field mode-confirmation"><div class="mode-caption">指導形式</div><p class="notice"><strong>オンライン指導のみ受け付けています。</strong> 対面による家庭教師は現在受け付けておらず、再開するかどうかも未定です。</p><input type="hidden" name="lessonMode" value="オンライン指導"></div>
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
 ${serviceAgreement}
 ${consent}${challenge}
 <div class="actions"><button type="button" class="btn secondary" data-prev>← 戻る</button><button type="submit" class="btn primary" id="send-button">申し込み希望を送信する →</button></div>
 <p class="small">直接送信が利用できない場合は、Googleフォームの最終送信画面へ引き継ぎます。申し込み希望の送信だけで契約・決済は発生しません。</p></div>`;
}
if(kind==="apply"){
 const purpose=form.querySelector("#f-purpose"),trialBox=form.querySelector("#trial-confirm");
 const trialCheck=trialBox?.querySelector('[name="trialOnceConfirmed"]');
 const syncTrial=()=>{
  const isTrial=purpose?.value==="体験授業のお申し込み";
  if(trialBox)trialBox.hidden=!isTrial;
  if(trialCheck){trialCheck.required=isTrial;if(!isTrial)trialCheck.checked=false;}
 };
 purpose?.addEventListener("change",syncTrial);
 syncTrial();
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
   if(!el.checkValidity()){
     const label=el.name==="siteTermsAccepted"?"公式サイト掲載の受講条件への同意":
       el.name==="privacyAccepted"?"個人情報の取り扱いへの同意":
       (el.closest(".field")?.querySelector("label")?.textContent?.trim()||
       el.closest(".consent")?.querySelector("label")?.textContent?.trim()||
       "必須項目");
     showError("「"+label+"」を確認してください。未入力・未チェックの項目があります。");
     el.focus();
     el.reportValidity();
     return false;
   }
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
    if(from.value>to.value){
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
 status.innerHTML="";
 const p=document.createElement("p");
 p.textContent="【送信先の準備中】この画面からの直接送信はまだ利用できません。入力内容を既存のGoogleフォームへ引き継ぎ、そちらで最終送信してください。既存フォームで追加の必須質問への回答が必要です。";
 status.appendChild(p);
 const a=document.createElement("a");
 a.href=fallback;a.target="_blank";a.rel="noopener noreferrer";a.textContent=kind==="apply"?"既存のGoogleフォームで申し込む →":"既存のGoogleフォームで相談する →";
 status.append(a);
 const button=form.querySelector("#send-button");
 if(button)button.textContent="入力内容を引き継いでGoogleフォームへ進む →";
 const copy=document.getElementById("copy-action");
 if(copy)copy.hidden=false;
}
function selectedSchedules(){
 if(kind!=="apply")return [];
 const selections=[];
 for(let i=1;i<=4;i++){
  const day=form.elements.namedItem("schedule"+i+"Day").value;
  const from=form.elements.namedItem("schedule"+i+"From").value;
  const to=form.elements.namedItem("schedule"+i+"To").value;
  selections.push({day,from,to});
 }
 return selections;
}
function payloadFromForm(token=""){
 const data=new FormData(form);
 const payload=Object.fromEntries(data.entries());
 payload.kind=kind;
 payload.courses=data.getAll("courses");
 payload.subjects=data.getAll("subjects");
 payload.scheduleCandidates=selectedSchedules();
 payload.privacyAccepted=data.get("privacyAccepted")==="on";
 payload.siteTermsAccepted=kind==="apply" && data.get("siteTermsAccepted")==="on";
 payload.trialOnceConfirmed=kind==="apply" && data.get("trialOnceConfirmed")==="on";
 payload.source=source;
 payload.token=token;
 payload.website=data.get("website")||"";
 return payload;
}
// Legacy Google Form prefill is the verified backup submission route until
// the dedicated notification service is configured. Old form still requires
// the visitor to complete its own mandatory school/gender questions.
function legacyPrefillUrl(data){
 const params=new URLSearchParams();
 params.set("usp","pp_url");
 const add=(id,value)=>{if(value!==null&&value!==undefined&&String(value).trim())params.append("entry."+id,String(value).trim())};
 const choosePurpose=kind==="apply"
   ? data.purpose
   : ({"体験授業について相談":"体験授業のお問い合わせ",
       "通常授業について相談":"通常授業のお問い合わせ",
       "料金について相談":"料金のお問い合わせ",
       "指導コースについて相談":"指導コースのお問い合わせ"}[data.purpose]||"指導コースのお問い合わせ");
 const sourceMap={
  "当方のホームページ":"当方のホームページ","Googleなどの検索サイト":"検索サイト",
  "Googleマップ":"Google map","ジモティ":"ジモティ","ストアカ":"ストアカ",
  "マナリンク":"マナリンク","知り合いからのご紹介":"知り合いからのご紹介"
 };
 const courseMap={
  "大学受験対策（文系科目）":"大学受験対策",
  "中学受験対策（英語・国語・社会）":"中学受験対策",
  "不登校・通信制高校サポート":"不登校サポート",
  "発達特性に配慮した学習支援":"発達障害サポート",
  "宿題・提出物サポート":"宿題サポート",
  "季節講習":"夏期講習・冬期講習・春期講習"
 };
 const allowedCourses=new Set([
  "英検対策（準1級）","英検対策（2級）","英検対策（準2級プラス）",
  "英検対策（準2級）","英検対策（3級）","英検対策（4級）","英検対策（5級）",
  "大学受験対策","高校受験対策","中学受験対策","逆転合格対策",
  "定期テスト対策","学校の補習","塾の補習","中高一貫校サポート",
  "不登校サポート","発達障害サポート","宿題サポート",
  "自習見守りサポート","学習相談・カウンセリング","夏期講習・冬期講習・春期講習"
 ]);
 const allowedSubjects=new Set([
  "英語","国語","社会","数学","理科","現代文","古文","漢文",
  "世界史探究","日本史探究","歴史総合","地理探究","地理総合",
  "政治経済","倫理","公共",
  "英検準1級対策","英検2級対策","英検準2級プラス対策","英検準2級対策",
  "英検3級対策","英検4級対策","英検5級対策"
 ]);
 add("1564624791",choosePurpose);
 add("69889553",sourceMap[data.discovery]||"当方のホームページ");
 add("1230834699",[data.studentName,data.studentNameKana?"（"+data.studentNameKana+"）":""].filter(Boolean).join(""));
 add("1329071149",data.guardianName);
 add("112684098",data.region);
 add("241826980",data.school);
 add("177037440",data.grade);
 const selectedCourses=(data.courses||[]).map(v=>courseMap[v]||v).filter(v=>allowedCourses.has(v));
 for(const v of selectedCourses)add("1305738703",v);
 const selectedSubjects=(data.subjects||[]).map(v=>v==="政治・経済"?"政治経済":v).filter(v=>allowedSubjects.has(v));
 for(const v of selectedSubjects)add("102234408",v);
 if(["60分","90分","120分","150分","180分"].includes(data.duration))add("1137729539",data.duration);
 add("878164990",data.firstDate);
 const times=(data.scheduleCandidates||[]).map((x,i)=>({...x,rank:i+1})).filter(x=>x.day&&x.from&&x.to).map(x=>"第"+x.rank+"候補："+x.day+" "+x.from+"〜"+x.to+"の間に開始可能");
 if(times.length)add("1103182725",times.join("／"));
 if(data.tool==="Zoom")add("568073567","Zoom（40分で再入室が必要）");
 if(data.tool==="Google Meet")add("568073567","Google meet（Googleアカウントが必要）");
 const details="【申し込み条件の同意】"+(data.siteTermsAccepted?"確認済み":"未確認")+" ／ 【個人情報の取り扱い】"+(data.privacyAccepted?"同意済み":"未確認")+"\n"+buildMailBody(data);
 if(kind==="apply")add("1692327135",details.slice(0,1600));
 else add("1952735166",details.slice(0,1600));
 return fallback+(fallback.includes("?")?"&":"?")+params.toString();
}
function buildMailBody(d){
 const sections=[
 ["お申し込みの種類",d.purpose],["保護者・ご本人のお名前",d.guardianName],
 ["メールアドレス",d.email],["電話番号",d.phone],
 ["受講者のお名前",d.studentName],["受講者のお名前のふりがな",d.studentNameKana],
 ["学年",d.grade],["お住まいの都道府県・市区町村",d.region],
 ["ご希望の講座",(d.courses||[]).join("、")],
 ["ご希望の科目",(d.subjects||[]).join("、")],
 ["希望指導時間",d.duration],["指導形式",d.lessonMode],
 ["初回のご希望日時",d.firstDate],["オンラインツール",d.tool],
 ["学校名",d.school],["知ったきっかけ",d.discovery],
 ["ご相談内容・ご要望",d.message],
 ["公式サイトの受講条件への同意",kind==="apply" && d.siteTermsAccepted?"同意済み":""],
 ["体験授業は一人1回・別コースでも再体験不可の確認",d.purpose==="体験授業のお申し込み" && d.trialOnceConfirmed?"初めての体験であることを確認済み":""],
 ["個人情報の取り扱いへの同意",d.privacyAccepted?"同意済み":""],
 ["サイト",d.source],
 ];
 if(kind==="apply")for(let i=0;i<d.scheduleCandidates.length;i++){
  const slot=d.scheduleCandidates[i];
  if(slot.day && slot.from && slot.to)
   sections.push(["希望時間帯 第"+(i+1)+"候補",slot.day+" "+slot.from+"〜"+slot.to+"の間に授業開始可能"]);
 }
 return "公式サイトのフォームで入力しました。ご確認をお願いいたします。\n"
 +"※このメールはメールアプリからご自身で送信する必要があります。\n\n"
 +sections.filter(([label,value])=>String(value||"").trim()).map(([label,value])=>label+"： "+String(value).trim()).join("\n");
}
async function copyMailBody(){
 if(kind==="apply"){
  for(let i=0;i<4;i++){setStep(i);if(!validatePanel())return}
 }else if(!validatePanel())return;
 const body=buildMailBody(payloadFromForm());
 try{
  if(!navigator.clipboard?.writeText)throw Error("Clipboard API unavailable");
  await navigator.clipboard.writeText(body);
  showError("入力内容をコピーしました。メールを作成して本文に貼り付け、送信してください。フォーム自体からは送信されていません。");
 }catch{
  const target=document.getElementById("copy-fallback");
  if(target){target.value=body;target.hidden=false;target.focus();target.select()}
  showError("自動コピーできませんでした。表示された入力内容を選択してコピーし、メールに貼り付けてください。");
 }
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
 if(kind==="apply"){
  for(let i=0;i<4;i++){if(step!==i)setStep(i);if(!validatePanel())return}
 }else if(!validatePanel())return;
 if(!configured){
  const payload=payloadFromForm();
  const prefill=legacyPrefillUrl(payload);
  showError("既存のGoogleフォームを開きます。転記できない必須項目はGoogleフォーム側でご入力のうえ、最後に送信してください。この画面ではまだ申し込みは完了していません。");
  const link=document.createElement("a");
  link.href=prefill;
  link.target="_blank";
  link.rel="noopener noreferrer";
  link.textContent="Googleフォームの最終送信画面を開く →";
  error.append(document.createElement("br"),link);
  window.open(prefill,"_blank","noopener,noreferrer");
  return;
 }
 const token=widgetReady?window.turnstile.getResponse(widgetId):"";
 if(!token){showError("迷惑送信防止の認証を完了してください。");return}
 const payload=payloadFromForm(token);
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
const copyAction=document.createElement("button");
copyAction.type="button";
copyAction.className="btn secondary copy-action";
copyAction.id="copy-action";
copyAction.textContent="入力内容をコピーする";
copyAction.addEventListener("click",copyMailBody);
const copyFallback=document.createElement("textarea");
copyFallback.id="copy-fallback";
copyFallback.hidden=true;
copyFallback.readOnly=true;
copyFallback.setAttribute("aria-label","メール用の入力内容をコピー");
copyFallback.style.cssText="width:100%;min-height:180px;margin-top:15px;";
const sendActions=form.querySelector("#send-button")?.closest(".actions");
if(sendActions){sendActions.append(copyAction);sendActions.after(copyFallback)}
copyAction.hidden=true;
// Unconfigured preview: retain a usable mail-app draft and copy action.
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