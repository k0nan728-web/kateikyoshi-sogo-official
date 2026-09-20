# PageShareレビュー反映・停止記録 2026-09-20

## ソースと対象
- source branch: codex/official-parent-rebuild-20260910
- GitHub source commit: c94113c3725d25771313a2b5b0282c34fd5c4c1e
- local source commit: edc04ba41cf824dfafef4a2d32cd34dcc825eea9
- matching source tree: 97fbfb4a227fb29ccda419d64468f0e75b9b03a9
- site: site_6de31bc499c24a21b7b861a677ccab9b
- URL: https://smoky-arbor-9431.hosted.pageshare.ai
- version: ver_b79546ef68d7426abe64afd13fba4926 (Version 3)

## 今回の復旧結果
既存のビルド・静的検査を再実施せず、作成済みVersionを継続。最初のversions_listは認証要求、認証受諾後の再試行で取得成功。再認証以外の無意味な再試行なし。

全13ファイルは前回アップロード成功済み。未確定一覧のfileCount=0は受領失敗と断定せず、expectedFileCount=13でversions_commitを実行。成功応答: status=active, fileCount=13, totalBytes=4137521。画像・動画の再送・削除・圧縮・置換なし。

sites_getでcurrentVersionIdが新Versionと一致し、isPublished=true、protectionType=publicを確認。ただしisExpired=true、hostedSubdomainStatus=suspended。有効期限2026-09-20T00:26:43.911Z（日本時間9月20日09:26:43）。そのため実機確認用公開の正常完了とは判定しない。

前回のexpiration=7d要求は無料プラン制限（INVALID_ARGUMENT: Free includes up to 3 active hosted pages for 7 days; selectable expiration requires Premium）で拒否済み。同じ期限延長要求を反復しない。今回、新規サイト／Version作成による期限の回避もしていない。

## アップロード済み（未アップロードなし）
index.html、assets/index-B45iVI2V.css、assets/index-DZ_vHFaH.js、IMG_4684_trimmed_35c73ae5.PNG、achievement-certificate.jpg、online-lesson-screen.jpg、teacher-intro-poster.jpg、teacher_intro_clean_403456db.mp4、eiken/index.html、gyakuten/index.html、bansou/index.html、retry/index.html、hikaku/index.html。

## 外部リンクの実機確認待ち
前回各1回再取得したがWork Web取得サービスのInternal Error/not accessibleが継続。404／サイト障害とは断定せず、URL変更なし。

| リンク元 | URL / 想定遷移先 |
|---|---|
| 4ブランド・不登校支援 | https://kateikyoshi-sogo.com/bansou/ — 進路伴走ゼミナール |
| 4ブランド・再挑戦 | https://kateikyoshi-sogo.com/retry/ — Re:大学受験ゼミナール |
| 教育コラム一覧 | https://kateikyoshi-sogo.com/blog/ — 記事一覧 |
| 料金比較CTA | https://kateikyoshi-sogo.com/hikaku/ — 料金比較 |
| 英検記事 | https://kateikyoshi-sogo.com/blog/?article=eiken-study-roadmap — 英検の勉強の始め方 |
| 受験戦略記事 | https://kateikyoshi-sogo.com/blog/?article=humanities-exam-priority — 英語・国語・社会の優先順位 |
| 不登校記事 | https://kateikyoshi-sogo.com/blog/?article=restart-study-at-home — 学習再開 |
| 最終CTA・学習相談CTA | https://docs.google.com/forms/d/e/1FAIpQLSdS7FOxXb3MnoANiffjXAxZvVi4GBSIeHrVAZQ_wmkBNsz6NA/viewform — お問い合わせフォーム（送信テスト不要） |

## 解決方法と再開地点
期限延長が可能なPageShare契約／設定についてユーザー判断が必要。復旧後、既に確定済みのVersion 3を再利用し、サイト期限とhostedSubdomainStatusを確認する。ソース再ビルドや全ファイル再アップロードから始めない。

Safari確認: iPhoneは通常／文字拡大・縦横で開始フロー01〜05、改行、横超過、写真全体、メニュー、38開閉項目、料金計算・CTA。iPadは縦横で4ブランドの比較、段組・余白、料金表、図解、メニューと本文の干渉。共通で動画・8外部リンク・章ごとの視覚的抑揚を確認。

Work側の実表示再開は320×844/root32/process01〜05。その後局所回帰、全章目視、Manus直接比較、6観点最終評価。動画字幕全文・Safari実機も未完。100点／完成判定なし。main/root/kateikyoshi-sogo.com本番は変更なし。
