# Code Quality 5×5 Plan — every rubric criterion to level 5

Goal: lift all 25 Code Consultant criteria (6 rubrics) from today's ~2.7 avg to 5/5.
Start implementing tomorrow. TDD throughout (failing test first, per project rule).

## Honest framing — read first
A handful of level-5 descriptors are **gold-plating for a free, no-PII daily puzzle game**. They're
listed so the number hits 5, but flagged **⚠️ LOW-ROI** — decide per item whether the score is worth it:
- Security: MFA, device binding, session anomaly detection, SBOM, license compliance.
- Design: tokens *synced from a design tool*, component *adoption metrics*.
- Bugs: *fuzzing/generative* tests everywhere (worth it for puzzle/stats logic, overkill for UI).
- UX: offline service worker / full PWA (nice, not essential for a server-driven daily game).

Everything else is genuine quality that compounds. The plan front-loads **shared CI/tooling backbone**
because ~12 of the 25 level-5s literally require "…in CI" — build it once, many scores move together.

Sequencing: Phase 0 (defects) → Phase 1 (backbone) → Phases 2–7 (per-domain). Phases 2–7 can partly
parallelize once the backbone exists.

---

## Phase 0 — Real defects first (not just rubric-climbing) — ~0.5 day
These are bugs found during the audit; fix before feature work. Each gets a failing test first.
1. **Reset-password shows success on failure** — `AuthProvider.updatePassword` returns `{error}`; add `if (error) throw error`. Test: mock Supabase error → assert error UI, not success.
2. **`getSession()` no `.catch`** — infinite spinner on network failure. Add `.catch` → set `isLoading=false`, surface error.
3. **`parsePuzzleRow` null-`groups` crash** — guard `Array.isArray(data.groups)` before `.map`; throw descriptive error.
4. **`/analidiots` unauthenticated** — add auth/secret guard (see Security P4 — do the guard now).
5. **Color-only group difficulty** — add non-color indicator (see UX P6 — do the indicator now).
6. **`submitGuess` timeout IDs untracked** — store IDs, `clearTimeout` in `resetGame` (ghost-animation bug).
7. **`useLocalStorage` infinite loop for objects** — ref-guard hydration, drop `storedValue` from deps.

---

## Phase 1 — Shared CI / tooling backbone — ~2 days
Unlocks the "…in CI / automated" half of every rubric's level 5 in one pass.

| Tool / setup | Lifts toward 5 |
|---|---|
| `@next/bundle-analyzer` + per-route **size budgets** in CI (fail build over budget) | Perf: Bundle size |
| **Lighthouse CI** (`@lhci/cli`) + perf budgets, run on PRs | Perf: Core Web Vitals |
| **Vercel Speed Insights** (RUM) | Perf: Core Web Vitals (RUM dashboards) |
| `bun audit` gate + `.github/dependabot.yml` (weekly) + **CycloneDX SBOM** ⚠️ | Security: Dependency security |
| **gitleaks** scan + GitHub push-protection + secret-scanning | Security: Secrets |
| **axe-core + Playwright** a11y tests in CI (`@axe-core/playwright`) | UX: all 4 criteria (the "CI a11y" clause) |
| **jscpd** duplication detection in CI + eslint `no-duplicate` patterns | DRY: Code duplication |
| **eslint import-boundary** rules (`eslint-plugin-boundaries`) — atoms can't import organisms | Design: Atomic; DRY: SRP |
| **Supabase type generation** (`supabase gen types typescript`) wired to a script + CI drift check | Bugs: Type safety; DRY: SSOT |
| **Zod** schemas at every external boundary (DB JSON, localStorage, API params) | Bugs: Type safety, Edge; DRY: SSOT |
| **Chromatic** (Storybook visual regression) | Design: Spacing/layout (visual regression) |
| **Sentry** (or equivalent) error tracking + source maps | Bugs: Error handling |

TDD note: tooling gets "meta-tests" — e.g. a test that fails if a raw `font-size`/hex/spacing literal
appears in component CSS (stylelint rule), a test asserting generated types match the DB snapshot.

---

## Phase 2 — Performance 2→5 — ~3 days  (highest score delta)
- **Bundle size →5:** move `@capacitor/*` to devDeps + gate imports behind `CAPACITOR` flag; remove unused `@tanstack/react-query` + `useDailyPuzzle` (or adopt it); tree-shake; enforce sub-100KB initial-JS budget in CI (Phase 1).
- **Rendering efficiency →5:** make static content (about, privacy, headers/footers) **server components**; convert the game to a server shell + minimal client islands; `memo(ItemTile)` + `useCallback` selectItem; verify render counts with React Profiler in a test.
- **Data fetching →5:** replace dead module-`Map` cache with `unstable_cache` (tags + revalidate); move domain detection to **middleware** (removes `headers()`/`cookies()` from root layout → routes become static/edge-cacheable); add hover/route **prefetching**; stream responses.
- **Core Web Vitals →5:** add `[genre]/loading.tsx` (GameSkeleton) for Suspense streaming; fix GenreSwitch pill CLS with `useLayoutEffect`; with edge caching → sub-second LCP; RUM + perf budgets from Phase 1; target INP<200ms.
- **Single highest-leverage move:** kill `headers()` in root layout → unlocks Vercel Edge Cache app-wide.

## Phase 3 — Bugs & Correctness 2–3→5 — ~3 days
- **Error handling →5:** Phase 0 fixes; add per-feature **error boundaries** (`error.tsx` per route); a **typed error hierarchy** (`AppError`/`PuzzleNotFoundError`/`AuthError`); structured logging; auto-retry on transient Supabase failures; Sentry in CI (Phase 1).
- **State management →5:** model game flow as an explicit **state machine** (xstate or a typed reducer) — states: loading→playing→won/lost; **snapshot-test** transitions; derive all state (no stale reads); fix `useLocalStorage`; reset SSR singletons per request.
- **Edge cases →5:** **property-based tests** (`fast-check`) for puzzle grouping + streak/stats math (⚠️ skip fuzzing pure-UI); exhaustive `switch` with `never` checks; enable `noUncheckedIndexedAccess`; zero uncovered branches (coverage gate).
- **Type safety →5:** generated Supabase types (Phase 1) → kill all `as never`/`as unknown as`; Zod-validate JSON/localStorage; discriminated unions everywhere; end-to-end DB→API→UI types; generics for reusable utils.

## Phase 4 — Security 2–3→5 — ~2 days
- **Input sanitization →5:** strict **CSP** (nonce the 2 inline scripts) + `X-Frame-Options`/`nosniff`/HSTS via `next.config` `headers()`; Zod input schemas; XSS scanning in CI; no raw-HTML paths.
- **Auth & sessions →5:** auth-guard `/analidiots` (Phase 0); server-side session validation; cookie storage via `@supabase/ssr`; zero-trust **middleware** on admin routes; ⚠️ MFA / device binding / anomaly detection (LOW-ROL — enable only if you truly want the 5).
- **Dependency security →5:** `bun audit` gate + Dependabot (Phase 1); patch critical CVEs in <1wk; ⚠️ SBOM + license compliance (CycloneDX, low-ROI).
- **Secrets →5:** split anon vs service-role client factories (least privilege); secret scanning (Phase 1); short-lived creds + rotation; audit trail.

## Phase 5 — Design System 3→5 — ~2.5 days
- **Atomic →5:** relocate `about/` into correct layers; add a **templates** layer (document `views/` as templates); **Storybook story at every layer**; eslint import-boundary enforcement (Phase 1).
- **Design tokens →5:** collapse dual spacing scales to one; **typed token references** (TS token module, no raw values); ⚠️ sync from design tool via **Style Dictionary** (low-ROI unless a designer owns tokens); stylelint rule banning raw hex/px.
- **Component reuse →5:** add `XButton` variants (toggle/link), remove the 3 `all:unset` bypasses; document prop contracts (TSDoc); slot patterns; ⚠️ adoption metrics (low-ROI).
- **Spacing & layout →5:** layout primitives (`Stack`/`Grid`/`Container`); container queries; **spacing lint rule**; visual regression via Chromatic (Phase 1); fluid typography.
- **Typography →5:** tokenize the 7 raw `XText` sizes; type components enforce scale (ban raw `font-size` via stylelint); responsive scaling + line-height/letter-spacing tokens; **variable font** with `font-display: swap`.

## Phase 6 — UX & Accessibility 2–3→5 — ~2.5 days
- **Keyboard nav →5:** `inert` on off-screen carousel panels; skip-to-content link; fix GenreSwitch focus ring; roving tabindex in the genre tablist; focus restoration after modals; **screen-reader pass** + axe CI (Phase 1).
- **Semantic HTML →5:** name the modal (`Dialog.Title`); label the feedback textarea; `role=tablist/tab` on GenreSwitch; **live regions** for guess feedback/mistakes; follow WAI-ARIA authoring practices; automated a11y in CI.
- **Visual a11y →5:** non-color group indicator (pattern/icon/label — Phase 0); re-enable `prefers-reduced-motion`; restore 44px targets; **AAA contrast** on key text; verify 200%/400% zoom + ⚠️ screen-magnifier/high-contrast manual test.
- **Loading & error →5:** `[genre]/error.tsx` with retry; scope errors to failing section; optimistic UI; streaming SSR (Phase 2); ⚠️ offline service worker / PWA (low-ROL for a daily server game).

## Phase 7 — DRY / SOLID / SSOT / KISS 3–4→5 — ~1.5 days
(Largely falls out of Phases 1–6; finish the remainder.)
- **Duplication →5:** one streak module; scripts import shared `getTodayDate`/`getDayOfYear` from `src/utils`; single genre list (drop `GENRE_ORDER` dup); jscpd gate (Phase 1).
- **SRP →5:** split mixed-concern files (`AuthProvider` session vs password; `game-page.tsx` carousel vs state); **interface-driven storage** (DI) so modules are independently testable.
- **SSOT →5:** generated DB types → API → UI (Phase 1); Zod single-source validation; zero manual type sync.
- **Simplicity →5:** delete dead code (react-query/hook, commented blocks, dual tokens); every abstraction justified; onboarding doc so a new dev is productive in hours.

---

## Effort & sequencing summary
| Phase | Focus | Est. | Unblocks |
|---|---|---|---|
| 0 | Real defects | 0.5d | ship-safe baseline |
| 1 | CI/tooling backbone | 2d | ~12 "in-CI" level-5s |
| 2 | Performance | 3d | biggest score delta |
| 3 | Bugs/correctness | 3d | depends on P1 types/Zod |
| 4 | Security | 2d | depends on P1 scanning |
| 5 | Design system | 2.5d | depends on P1 Storybook/lint |
| 6 | UX/a11y | 2.5d | depends on P1 axe |
| 7 | DRY/SOLID cleanup | 1.5d | finishes leftovers |

Total ~17 working days for literal 5/5 everywhere; **~11 days if the ⚠️ LOW-ROI 5s are skipped**
(recommended) — those skips cost at most 1 point on 4–5 criteria for features a free puzzle game
doesn't need.

## Recommended order if time-boxed (best score/effort)
P0 → P1 → P2 (Performance, worst scores) → P3 → P6 (a11y, real users) → P4 → P5 → P7.

## Owner's additional ideas
- _(add tomorrow)_
