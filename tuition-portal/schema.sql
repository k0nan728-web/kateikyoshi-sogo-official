-- Apply only to a separately configured Cloudflare D1 database TUITION_DB.
CREATE TABLE IF NOT EXISTS tuition_users (
 id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, role TEXT NOT NULL CHECK(role IN ('admin','parent')), display_name TEXT NOT NULL, active INTEGER NOT NULL DEFAULT 1, created_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS tuition_codes (
 email TEXT PRIMARY KEY, code_hash TEXT NOT NULL, expires_at INTEGER NOT NULL, attempts INTEGER NOT NULL DEFAULT 0, last_sent_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS tuition_sessions (
 token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES tuition_users(id), expires_at INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS tuition_invoices (
 id TEXT PRIMARY KEY, parent_id TEXT NOT NULL REFERENCES tuition_users(id), period TEXT NOT NULL, course TEXT NOT NULL, unit_yen INTEGER NOT NULL CHECK(unit_yen>=0), duration_min INTEGER NOT NULL CHECK(duration_min IN (60,90,120)), lesson_count INTEGER NOT NULL CHECK(lesson_count BETWEEN 0 AND 31), free_count INTEGER NOT NULL CHECK(free_count BETWEEN 0 AND lesson_count), adjustment_yen INTEGER NOT NULL, amount_yen INTEGER NOT NULL CHECK(amount_yen>=0), due_date TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'unpaid' CHECK(status IN ('unpaid','paid')), paid_at INTEGER, created_at INTEGER NOT NULL, updated_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS tuition_invoice_parent_idx ON tuition_invoices(parent_id,period);
CREATE INDEX IF NOT EXISTS tuition_session_user_idx ON tuition_sessions(user_id);
