# 授業料管理・保護者マイページ

## 現在の公開状態（2026-10-25）

PR #6 の修正ブランチに保存。本番の授業料機能は未公開。公式サイトの Pages プロジェクトに授業料専用 D1 `tuition-production`、管理者メール、認証・送信元の設定を用意し、`TUITION_ENABLED=false` のまま維持している。別の Pages プロジェクト `kateikyoshi-tuition-staging` に同ブランチをデプロイし、専用 D1 `tuition-staging` と環境変数・秘密情報を設定した。設定変更後のデプロイと実メール・実 D1 上の E2E 確認は未完了。確認が済むまで main にマージしない。実際の保護者情報は未投入。

- UI `/tuition-portal/`、API `/api/tuition/*`。既存 `/api/intake`、公式サイト本文、既存フォームファイルは変更しない。
- `_headers` は新規 `/tuition-portal/*` のみ追記。既存ルールはそのまま。
- `TUITION_ENABLED=true` とすべての設定が揃うまで API は 503。推測困難な URL や noindex をアクセス制御として扱わない。

## 実装済み

- 登録済みユーザー限定メール OTP。10分期限、最大5試行、一度限りの原子的消費。コードは HMAC、セッションは SHA-256 のみ保存。
- 管理者は DB の admin ロールと `TUITION_ADMIN_EMAIL` の一致を毎リクエスト確認。保護者登録で role を指定できない。
- 信頼できる `CF-Connecting-IP` の HMAC を用いた IP 制限、全体制限、メール別90秒・毎時3回、全体送信予算1日50回。メール送信失敗は秘密や登録有無を返さずログに記録。
- Secure/HttpOnly/SameSite=Strict の8時間セッション、同一 Origin の JSON POST のみ許可。停止・再開時に既存セッションとコードを失効。
- 保護者の SQL はセッションの user.id で絞り込み。他者IDや query による対象変更不可。保護者に管理者 API を許可しない。
- 60/90/120分、月ごとに異なる回数、無料回数・調整額に対応。整数円・実在日付をサーバーで検証。
- 請求作成の request_id に UNIQUE 制約。入金更新は version で競合を検出。請求作成・入金変更と監査ログを D1 batch の同一トランザクションに保存。
- DB trigger で請求変更前後の金額・状態等も記録。ログインと保護者登録・停止も記録。期限切れセッションと古い制限レコードを少量ずつ削除。
- 管理画面に保護者名を表示。利用停止・再開と操作中のボタン無効化。表示には textContent を使用。新規ページのみ hash ベース CSP、埋め込み拒否、no-store。

## 検証済みと未確認の境界

`node --test tuition-portal/security.test.mjs`：22件成功（親テスト1＋検証21）。Node 24 の実 SQLite に schema と migration を適用し、D1 prepared/batch インターフェースを再現。Resend の外部送信だけはモック。

確認内容：管理者・保護者A/Bの認証、期限切れ・5回誤入力、コード同時送信/同時使用、再送、レート制限、停止後セッション、登録外/偽管理者拒否、未認証・CSRF・SQL注入・不正入力、請求計算・重複防止、保護者間の分離、入金更新・競合、監査ログと失敗時ロールバック、CSP hash。

既存フォームの `intake/validate.test.mjs` と `intake/native-delivery.test.mjs` は成功。既存 `intake/form-smoke.test.mjs` はこの環境に Playwright パッケージがないため未実施。ブラウザー・実 D1・実メールの E2E 成功とは区別する。

## Cloudflare の設定手順（ログイン後に実行）

1. 現在の Pages プロジェクト・本番 branch・ビルド設定・既存 binding/secret を記録。公式サイトとフォームの現状を保存。既存 secret の値を表示・上書き・削除しない。
2. 授業料専用 D1 を本番用と staging 用に別々に作成する。既存 DB と混ぜない。対象ごとに `schema.sql`、次に `migration-002.sql` を一度だけ実行する。migration の重複実行は禁止。
3. 各環境に `TUITION_DB` binding を設定。preview に本番 DB や本番 secret を公開しない。必要ならこのブランチ専用の staging Pages プロジェクトを利用する。
4. 環境別の `TUITION_AUTH_SECRET`（暗号学的乱数32バイト以上）を secret として保存。管理者の指定メールを `TUITION_ADMIN_EMAIL`、認証済みドメインの送信元を `TUITION_FROM_EMAIL` に設定。
5. `RESEND_API_KEY` は既存設定を変更せず利用する。staging に別設定が必要なら送信ドメイン限定の専用キーを使う。秘密値を GitHub、チャット、コマンド引数、スクリーンショット、ログに載せない。既存フォームのキーは交換しない。
6. 管理者メールを小文字に正規化し `tuition_users` に admin として追加。メールは `TUITION_ADMIN_EMAIL` と一致させる。保護者は管理者画面からのみ登録する。
7. staging のみ `TUITION_ENABLED=true`。管理者と、管理者が所有する専用テスト宛先2件の保護者で実メールコードを受信して認証。架空の第三者宛先に送らない。2件の宛先が未確定ならユーザーに確認する。
8. 実 D1 上で A/B に別請求を作成。A の一覧に B が出ないこと、B ID を指定してもアクセス不可、親が入金更新・登録・停止 API を使えないこと、先生の請求作成・入金済/未入金更新が対応する親に反映されることを確認する。ログアウト、停止、誤コード・期限切れも確認する。
9. D1 export と復元を staging で試し、利用プランの Time Travel 保持期間を確認。請求と監査ログの保管・訂正方針、停止時の扱いを確定。バックアップに本番個人情報を含める場合は公開リポジトリに置かない。
10. Pages の path 別 WAF/Rate Limit が使えるか確認。アプリ側制限は実装済みだが、エッジでも `/api/tuition/request-code` と `/verify` を保護する。Resend quota・失敗ログ・送信予算の監視を設定する。
11. これらの実動作確認が成功した commit のみ PR #6 から main へマージ。本番 D1 と secret を設定してデプロイし、`TUITION_ENABLED=true` にする。必要に応じて再デプロイして設定反映。
12. 本番で先生の認証と専用テスト宛先での請求・入金・分離を再確認。元の公式トップと既存フォームの内容・応答が変わらないことを確認。テストレコードは実請求として扱わず、staging のみで使うのを原則とする。

## 停止・復旧

問題時は `TUITION_ENABLED=false` としデプロイ反映。既存フォームの secret や公式サイトを戻す操作は行わない。直前の Pages デプロイと D1 の整合性を確認してから復旧する。migration を逆実行して個人情報や監査記録を消さない。

## 運用上の意味

「入金済」は先生による手動確認。銀行照合・自動引き落としはない。請求のメール通知、PDF、CSV、請求自体の訂正 UI は今回の実装に含まれない。画面上は最大500件を表示するため、請求量が増えた場合はページ送りを追加する。入金状況は両者で確認できるが、銀行振込手数料は銀行側条件による。
