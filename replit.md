# [Project name]

_Replace the heading above with the project's name, and this line with one sentence describing what this app does for users._

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Architecture decisions

_Populate as you build — non-obvious choices a reader couldn't infer from the code (3-5 bullets)._

## Product

_Describe the high-level user-facing capabilities of this app once they exist._

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- **Deployment split**: the frontend (Vite static build, `artifacts/screenflow/dist/public`) is deployed on Vercel; the API backend is a long-running Express server deployed on Railway (`railway.json`, Dockerfile `node:22`, `pnpm --filter @workspace/api-server run start`). Vercel reverse-proxies `/api/*` to the Railway service via an external rewrite in `vercel.json` (currently `https://screenflow-api-production-0196.up.railway.app`). Because the browser only ever talks to the Vercel origin, the `sameSite: lax` session cookie and CORS keep working. Never point Vercel at `artifacts/api-server/src` directly.
- **No clip binaries in Postgres**: recordings are memories-only — `videos` holds metadata (title, URLs, duration, resolution, fileSize, status). The recorder app registers a recording via `POST /api/videos` with optional `fileUrl`/`thumbnailUrl`/`duration`/`fileSize`/`resolution`/`status`; the actual clips live in the recorder's own storage.
- **DB growth guards**: `video_analytics` and `video_shares` tables were dropped; `videos(user_id, created_at)` and `sessions(expires_at)` are indexed; the always-on Railway server sweeps expired sessions hourly (`src/jobs/cleanup-sessions.ts`); `/auth/login` + `/auth/register` are rate-limited; string lengths are capped in the OpenAPI spec.
- **`DATABASE_URL`**: required by `/api/auth`, `/api/videos`, `/api/teams`, `/api/subscriptions`. Set it in the Railway service env vars (the Postgres instance is also on Railway). `CORS_ORIGIN` (comma-separated) defaults to the two app domains.
- **Migrations**: `drizzle-kit push` needs a TTY and cannot be automated. Apply SQL migrations against the Railway Postgres with `DATABASE_URL=... node scripts/apply-migration.mjs migrations/<file>.sql`.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
