-- Apply after schema.sql, exactly once, only to the dedicated tuition D1.
ALTER TABLE tuition_invoices ADD COLUMN request_id TEXT;
ALTER TABLE tuition_invoices ADD COLUMN version INTEGER NOT NULL DEFAULT 0;
CREATE UNIQUE INDEX tuition_invoice_request_idx ON tuition_invoices(request_id);
CREATE TABLE tuition_limits (key TEXT PRIMARY KEY, bucket INTEGER NOT NULL, count INTEGER NOT NULL, expires_at INTEGER NOT NULL);
CREATE INDEX tuition_limit_expiry_idx ON tuition_limits(expires_at);
CREATE INDEX tuition_session_expiry_idx ON tuition_sessions(expires_at);
CREATE TABLE tuition_audit (id TEXT PRIMARY KEY, actor_id TEXT NOT NULL, action TEXT NOT NULL, entity_id TEXT NOT NULL, detail TEXT NOT NULL, created_at INTEGER NOT NULL);
CREATE INDEX tuition_audit_time_idx ON tuition_audit(created_at);
-- Audit invoice changes at the database boundary, including manual SQL changes.
CREATE TRIGGER tuition_invoice_update_audit AFTER UPDATE ON tuition_invoices BEGIN
 INSERT INTO tuition_audit(id,actor_id,action,entity_id,detail,created_at)
 VALUES(lower(hex(randomblob(16))),'database','invoice.updated',NEW.id,
 json_object('before',json_object('status',OLD.status,'amount_yen',OLD.amount_yen,'parent_id',OLD.parent_id,'paid_at',OLD.paid_at),
 'after',json_object('status',NEW.status,'amount_yen',NEW.amount_yen,'parent_id',NEW.parent_id,'paid_at',NEW.paid_at)),unixepoch());
END;
