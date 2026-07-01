# xClues — Developer Onboarding

Daily connection-puzzle games for films, books, and music. Group 16 items into 4
hidden categories. One codebase serves three domains (filmclues / litclues /
musiclues .space) by detecting the host.

## Stack

- **Next.js (App Router)** + React, TypeScript (strict)
- **Bun** — package manager + script/test runner
- **Zustand** — game/stats/app state (per-genre store instances)
- **Supabase** — Postgres + auth (project `filmections`, ref `thvrwkzeqkppkvgsuenc`)
- **Vitest** + Testing Library — tests; **Storybook** — component dev
- **Capacitor** — optional iOS build (`CAPACITOR=1`)

## Setup

```bash
bun install
# Create .env.local with the NEXT_PUBLIC_SUPABASE_URL / _ANON_KEY (+ SUPABASE_SERVICE_ROLE_KEY,
# ANALIDIOTS_SECRET for the analytics dashboard).
bun run dev          # http://localhost:3000
```

## Everyday commands

| Command | What it does |
|---|---|
| `bun run test` | Full Vitest suite (always use this) |
| `bunx tsc --noEmit` | Type check |
| `bun run lint` / `bun run style:lint` | ESLint / Stylelint |
| `bun run dup` | jscpd duplication gate |
| `bun run build` | Production build |
| `bun run bundle:budget` | Gzipped client-JS budget (after build) |
| `bun run storybook` | Component explorer |
| `bun run db:types` | Regenerate `src/lib/supabase/types.ts` from the live schema |

CI runs lint → style:lint → tsc → dup → test → build → bundle budget, plus
gitleaks and a dependency audit. Match it locally before pushing.

## Architecture

- **Atomic design** under `src/components/`: `atoms/` → `molecules/` →
  `organisms/`. `src/views/` are page-level templates; `app/` holds Next routes.
- **State**: `src/store/` — `gameStore` (per-genre game state, modelled as
  loading→playing→won/lost), `statsStore`, `appStore`.
- **Data**: `src/lib/supabase/` — `puzzleQueries` (server reads, `unstable_cache`
  + retry), `server.ts` client factories (anon vs service-role, least privilege),
  `storage/` (interface-driven puzzle storage).
- **Boundaries are validated with Zod** (`src/lib/schemas/`): DB rows, localStorage,
  stats. Types are derived from generated DB types — never hand-synced.
- **Errors**: typed hierarchy in `src/lib/errors.ts` (`AppError` /
  `PuzzleNotFoundError` / `AuthError`); route boundaries in `app/error.tsx` and
  `app/[genre]/error.tsx`.
- **Theme/brand**: applied entirely client-side (inline init script + `useTheme`)
  so the SSR HTML is user-neutral and edge-cacheable.

## Conventions

- **TDD**: write the failing test first, then the fix.
- **Design tokens**: all colors/spacing/typography come from CSS custom properties
  in `src/index.css` (single numeric spacing scale). Stylelint bans raw hex.
- **Accessibility**: components ship with axe tests; keyboard nav, live regions,
  and labelled controls are expected.
- **CSS**: keep it simple — fixed values that work over clever units. Tailwind and
  hand-written CSS are not mixed.
- The owner handles all git commits; leave changes in the working tree.

## Where things live

```
app/                 Next routes (layout, [genre], api/, analidiots, …)
src/components/      atoms / molecules / organisms (+ .css, .stories, __tests__)
src/views/           page templates
src/store/           zustand stores
src/lib/             supabase, schemas, errors, retry, native
src/hooks/ src/utils/ src/config/ src/services/
docs/                plans + this doc
scripts/             standalone marketing/automation scripts
```
