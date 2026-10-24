# 授業料管理・保護者マイページ（未公開・試験実装）

## 現在の状態
- GitHub の feature ブランチのみ。main 未変更・本番未公開。
- 個人情報を登録しないこと。認証・メール・DB の本番設定と E2E テストは未実施。
- UI: /tuition-portal/ 、API: /api/tuition/*、D1 schema: tuition-portal/schema.sql。
- 既存のフォーム /api/intake とは分離。新規保護者登録は管理者のみ。
- 保護者の請求取得は認証済み user.id で SQL フィルタし、任意の parent_id を受け付けない。

## Cloudflare に必要な設定（管理者の承認後）
1. 専用 D1 データベースを作成し、Pages に TUITION_DB としてバインドする。
2. schema.sql を D1 に適用する。既存 DB に混在させない。
3. Secret: TUITION_AUTH_SECRET（ランダム 32 文字以上）。RESEND_API_KEY（既存環境の secret を参照可能な場合のみ）、TUITION_FROM_EMAIL（Resend 認証済み送信元）、TUITION_ADMIN_EMAIL（管理者のメール）を設定。
4. 管理者アカウントを D1 に手動登録（メールアドレスは Secret の TUITION_ADMIN_EMAIL と一致させる）。例：
   INSERT INTO tuition_users(id,email,role,display_name,active,created_at)
   VALUES ('UUIDを生成','管理者メール','admin','管理者',1,unixepoch());
5. ステージングの Pages プレビューで OTP メール受信・ログイン・ログアウト・未登録メールの応答・5回誤入力・90秒再送制限・期限切れ・請求登録・親権限による他者請求遮断・入金変更を確認。
6. 保護者A/Bの2件を用意し、BのデータをAで取得できないことを API 直接アクセスでも検証。
7. 請求情報のバックアップ、削除・訂正・保管期間、退会時の停止、プライバシー表示、インシデント対応を決める。
8. レート制限を Cloudflare WAF 等で IP ベースにも設定し、Resend 送信量の制限と監視を行う。現在はメールアドレス単位の90秒制限のみ。高頻度の未知メールアドレスでDBが肥大化しないよう運用制限を追加する。
9. 請求書のPDF作成、通知、CSV出力、請求修正履歴、入金照合は未実装。変更履歴を含めた監査ログも本番前に検討する。
10. 動作検証が済むまでは main にマージしないこと。URLを知らせないだけではアクセス制御にならない。

## 料金計算
60分単価 × (授業時間÷60) × (授業回数−無料回数) ＋ 調整額。税込・整数円。
実際の個別契約の条件を確認する。5週月は回数を5などに変更。

## 注意
「入金済」は管理者による手動確認であり銀行口座との連携ではない。
銀行振込の無料条件は保護者の金融機関に依存する。
