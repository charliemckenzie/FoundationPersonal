# Handoff → Frink: retirement-projection work to `origin`

**Branch:** `chore/work-2026-06-09` (pulled from `personal` = `charliemckenzie/FoundationPersonal`)
**Payload commit:** `4a5e2d6` — *"feat(retirement-projection): review fixes, DRY refactor, tests & stories; stabilise Money/PercentageField"*

> Frink: **delete this file before opening the PR** (or exclude it) — it's a transport note, not part of the change.

---

## What's in the payload commit (`4a5e2d6`, 39 files)

**Retirement projection**
- Fixes: broken Undo on the goal tile, static on-track results copy, case-sensitive image paths, `/yr` + sign formatting drift.
- Token/typography compliance: hardcoded colours/greys → semantic tokens, `text.secondary` → `text.muted`, body-size bold titles → `h6`.
- DRY: new `formatCurrency` util + extracted `JourneyTile` / `SuccessSummaryCard` / `RetirementScore` (consumers shrank ~300 lines).
- Tests: `projection.test.ts` (15 cases) via a new vitest **`unit`** Node project (`npm run test:unit`).
- Stories: 4 feature stories under `src/stories/features/retirement-projection/`.
- Image assets re-committed lowercase-hyphenated (Linux-safe) as proper git renames.

**Design system**
- `MoneyField`: restored controlled `value` prop (was a merge regression vs `PercentageField`); added `inputMode="decimal"`.
- Added controlled-value stories to both; corrected `PercentageField` clamp docs.
- Promoted `MoneyField` + `PercentageField` to **stable** in `src/stories/index.mdx`; updated `docs/guidelines/components.md`.

## Pipeline status — already cleared this session
| Gate | Result |
|---|---|
| Moe (API/structure) | ✅ MoneyField `value` restoration approved; both fields promoted to stable |
| Chalmers (code quality) | ✅ `tsc --noEmit` 0 errors, ESLint clean |
| Flanders (a11y) | ✅ label/aria via TextField; `inputMode="decimal"` added |
| Marge (visual) | ✅ token-compliant, sibling fields aligned |
| Lisa (docs/stories) | ✅ components.md + stories updated/corrected |
| Build/tests | ✅ `npm run build` (34 routes), `npm run test:unit` 15/15 |

So it has passed Chalmers — clear for version control.

## Frink's checklist
1. **Re-verify on the work machine** (corporate proxy, fresh env): `nvm use 20` → `npm install` → `npx tsc --noEmit` → `npm run test:unit` → `npm run build`.
2. **⚠️ Determine scope FIRST — `git fetch origin` and compare.** This branch sits on top of the whole `personal` fork divergence (DataGrid, investment-mix, Card rewrites, CardV2/ToggleButton removal, etc.), not just `4a5e2d6`.
   - If `origin` already has that base → the PR is effectively just `4a5e2d6`.
   - If `origin` is far behind (e.g. only `09b6ede`) → the branch carries the entire fork. **Flag to the designer** whether all of it lands on origin, or only the retirement-projection feature (would need a scoped branch / cherry-pick of `4a5e2d6` onto `origin/main`).
3. **Propose a branch and wait for the designer's OK** before `git checkout -b` — suggest `feat/retirement-projection-review` off `origin/main`.
4. **Run `/review`, then open a draft PR** to `origin/main` (conventional title, body = the summary above). Do not merge.

## Do NOT commit
- `package-lock.json` registry rewrites — the work-machine lockfile uses the corporate `nexus-repo` proxy; keep it. (No deps changed here; only `package.json` test scripts.)
- `next-env.d.ts` (build artifact), `.claude/` (local config).

## Notes
- No direct pushes to `main`; no force-push without explicit say-so.
- On the original machine the `personal` remote was switched to SSH (HTTPS auth wasn't available in that sandbox) — irrelevant here; set up remotes as normal.
