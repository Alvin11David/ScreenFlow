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

- **Vercel deployment**: the domain serves the static Vite build from `artifacts/screenflow/dist/public` and routes `/api/*` to the Express app. The deployable is a pre-bundled, self-contained `api/index.mjs` (esbuild from `api/_entry.ts`, run via `node scripts/build-api-function.mjs`). Vercel's Node runtime transpiles `api/*.ts` per-file and does **not** resolve directory/extensionless relative imports (`import router from "./routes"` crashes with `ERR_UNSUPPORTED_DIR_IMPORT`), so never point Vercel at `artifacts/api-server/src` directly. Regenerate the bundle after any api-server change: `node scripts/build-api-function.mjs` (this is part of the `vercel.json` `buildCommand`).
- **`DATABASE_URL`**: required by `/api/auth`, `/api/videos`, `/api/teams`, `/api/subscriptions`. Without it the Vercel function still boots (healthz/stats work) but those endpoints fail. Set it in the Vercel project env vars to a Postgres/Neon connection string.
- Runtime deps the function bundle externalizes (express, pg, drizzle-orm, pino, ...) are declared at the repo root `package.json` so Vercel's function tracer can resolve them.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
