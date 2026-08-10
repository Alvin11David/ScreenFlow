-- Admin analytics & presence migration (2026-08-10)
-- Tracks signup auth provider, online presence, and web performance events.

ALTER TABLE users
  ADD COLUMN IF NOT EXISTS auth_provider varchar(50) NOT NULL DEFAULT 'email';
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS provider_id text;
ALTER TABLE users
  ADD COLUMN IF NOT EXISTS last_seen_at timestamp;

CREATE INDEX IF NOT EXISTS users_auth_provider_idx
  ON users (auth_provider);
CREATE INDEX IF NOT EXISTS users_last_seen_at_idx
  ON users (last_seen_at);

CREATE TABLE IF NOT EXISTS presence (
  id serial PRIMARY KEY,
  user_id integer REFERENCES users(id) ON DELETE CASCADE,
  visitor_id varchar(64) UNIQUE,
  last_seen_at timestamp NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS presence_user_id_idx
  ON presence (user_id) WHERE user_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS presence_last_seen_at_idx
  ON presence (last_seen_at);

CREATE TABLE IF NOT EXISTS web_vitals (
  id serial PRIMARY KEY,
  type varchar(20) NOT NULL,
  value real NOT NULL,
  rating varchar(30) NOT NULL,
  path varchar(500),
  created_at timestamp NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS web_vitals_created_type_idx
  ON web_vitals (created_at, type);

DELETE FROM sessions WHERE expires_at < now();
