# FreshRoute AI

FreshRoute AI is a confidence-aware accessibility intelligence dashboard that demonstrates dynamic route recommendations for changing street conditions.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server
- `pnpm --filter @workspace/freshroute-ai run dev` — run the FreshRoute web app
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string; artifact workflows supply `PORT` and `BASE_PATH`

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

_Populate as you build — short repo map plus pointers to the source-of-truth file for DB schema, API contracts, theme files, etc._

## Where things live

- `artifacts/freshroute-ai` — React/Vite frontend and user-facing routes
- `artifacts/api-server/src/routes/freshroute.ts` — API routes, seeded demo data, confidence decay, route scoring, demo scenario, and prototype vision inference
- `lib/api-spec/openapi.yaml` — source-of-truth API contract
- `lib/db/src/schema/` — Drizzle persistence models for observations and reports

## Architecture decisions

- The prototype uses the workspace's shared Express/PostgreSQL services instead of introducing a separate FastAPI/SQLite stack.
- Demo observations are deterministic and labeled so the product can demonstrate the concept without making real-world accessibility claims.
- Confidence is recalculated from the last verification timestamp, while the demo scenario writes a fresh simulated camera observation to show the full rerouting loop.

## Product

- Dashboard metrics and live accessibility pulse
- Observation map with evidence details
- Mobility-aware route alternatives
- Detect → Verify → Decay → Update → Reroute demo
- Crowdsourced report submission
- Prototype image detection
- Analytics for observations, obstacles, confidence, categories, and statuses

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Run API codegen after editing `lib/api-spec/openapi.yaml`.
- The frontend build requires workflow-provided `PORT` and `BASE_PATH`; use the managed web workflow or provide them for a direct build.
- Demo data is seeded into the development database on the first observations/map/dashboard request.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
