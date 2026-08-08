-- Storage optimization migration (2026-08-08)
-- Memories-only model: no clip binaries are stored in Postgres; only metadata.
-- This drops the unused per-view/share row tables and adds indexes for the
-- hot history query and session cleanup.

DROP TABLE IF EXISTS video_analytics;
DROP TABLE IF EXISTS video_shares;

CREATE INDEX IF NOT EXISTS videos_user_created_idx
  ON videos (user_id, created_at);

CREATE INDEX IF NOT EXISTS sessions_expires_at_idx
  ON sessions (expires_at);

DELETE FROM sessions WHERE expires_at < now();
