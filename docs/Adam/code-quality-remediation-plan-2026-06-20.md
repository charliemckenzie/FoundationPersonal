# Foundation — Code Quality Remediation Plan

**Date:** 2026-06-20
**Author:** Implementation plan (Claude Code)
**Source research:** [`code-quality-review-2026-06-20.md`](./code-quality-review-2026-06-20.md) — read this first; every work package below references a section (§) in that doc.

---

## Purpose

Turn the findings of the code quality review into sequenced, owned, acceptance-tested work. The review found `main` does not type-check (57 TS errors) or lint clean (25 ESLint errors), with **no CI gate to catch it**. This plan fixes the breakage, then installs the gate that prevents recurrence, then pays down DRY/test/structural debt.

## Guiding principles

- **Make `main` green before making the gate required.** A required CI check can't pass while 57 errors exist, so Phase 1 (fixes) lands before Phase 2 flips the gate to *required*.
- **Route through the team.** Lenny/Carl build, Chalmers reviews, Flanders signs off a11y-affecting changes, Moe owns API decisions, Frink branches/commits/PRs. **Branching requires Adam's explicit approval** (Frink proposes name + scope first).
- **One PR per phase** (Phase 1 may split into 1–2 PRs). Each PR carries the Foundation sign-off block.
- **No behaviour change in Phases 1–3** unless a fix demands it — these are correctness and hygiene, not redesign.

## Sequence at a glance

| Phase | Theme | Review § | Blocking? | Est. |
|---|---|---|---|---|
| 1 | Stop the bleeding — compile + lint clean | §1–5 | Yes — unblocks everything | ~1–2 days |
| 2 | Lock it in — CI quality gate | §6 | Yes — prevents regression | ~0.5 day |
| 3 | DRY + tests | §7, §8 | No | ~1–2 days |
| 4 | Structural cleanup | §10–13 | No | ~3–5 days |
| 5 | Housekeeping | §9 (low items) | No | ~0.5 day |

Phases 1→2 are strictly ordered. Phases 3–5 can run in parallel once 1–2 land.

---

## Decision required before Phase 1 starts — ✅ RESOLVED (2026-06-20)

**The `consolidate` feature (§3) is committed but doesn't compile and is self-labelled "under construction".**
- **DECISION: Option A — Fix it.** Adam chose to fix the feature so it compiles and works (not quarantine). WP1.3 executed as a "fix". The CI gate (Phase 2) will therefore cover consolidate.

---

## ✅ Phase 1 — COMPLETE (2026-06-20)

**All five WPs done, team-routed, green.**

| Gate | Before | After |
|---|---|---|
| `npx tsc --noEmit` | 57 errors | **0** |
| `npx eslint .` | 25 errors / 114 warnings | **0 errors** / 114 warnings (warnings → Phase 5) |
| `npx next build` | broke | **exit 0** |

**Git state:** Phase 1 landed on `main` in commit `7a25b7d "updates"` — committed by Adam together with pre-existing unrelated WIP (lifetime-pension flow rework, Checkbox/RadioGroup/StepperActions, the new `eligibility-checker` feature). It did **not** go onto the proposed `fix/compile-lint-phase-1` branch + draft PR. `main` is clean and green.

**What each WP actually did:**
- **WP1.1** — added `import type { RetirementIncomeAccountState, PensionOption, SpouseDetails, BankDetails } from './types'` to `retirement-income-account/utils.ts`. ⚠️ Plan listed `PensionEstimate` too, but it's defined **locally** in `utils.ts:61` — importing it would clash, so it was excluded.
- **WP1.2** — removed the duplicate "under construction" `export default` from the qsuper ato-supermatch page; kept the `AtoSuperMatchFlow` body.
- **WP1.3** — fixed all 16 consolidate errors: Alert `children`→`message=`, removed non-existent `StepperActions totalSteps`, Button/TextButton `children`→`label=`, `AmountChoice` types (`AMOUNT_OPTIONS` typed as `RadioOption[]` with `satisfies` per value; RadioGroup `error` boolean + message routing; MoneyField `null`→`undefined`), Icon `"4xl"`→`3xl`, Button `color="secondary"/"error"`→`primary`. Chalmers PASS.
- **WP1.4** — Moe decided by data shape: lifetime-pension `SpouseDetails` never captures `middleName`/`residentialAddress`/`homePhone` (the review was copied from `retirement-income-account`, which *does* collect them; lifetime-pension's capture step was trimmed but the review wasn't). **Removed the phantom rows** from `StepReview.tsx` rather than adding fields nothing populates. Chalmers PASS.
- **Extra tsc errors not enumerated in the plan** (also inside the "0 errors" gate): `InfoButton/index.tsx:108` — **library-graph** fix; added an `isDialogMode(p): p is InfoButtonDialogProps` type predicate so the discriminated-union narrows `dialogTitle` to `string`. `StepInvestmentStrategy.tsx` — `alignItems` moved off `<Stack>` into `sx` (this MUI version rejects it as a direct Stack prop), and Alert `sx` removed → wrapped in `<Box sx={{mt:2}}>` (Alert has no `sx`). `StepSetupMode.tsx` — Icon `"xs"`→`"sm"`, Alert `children`→`message=`. Chalmers PASS.
- **WP1.5 + remaining eslint** — `view-application/page.tsx`: replaced the in-render `SummarySection`/`SummaryRow` (18 "components during render" errors) with Foundation `DescriptionList`/`DescriptionList.Item`. Consolidate unescaped apostrophes →`&apos;` (4). `ManualConsolidateFlow.tsx:40` `Date.now()` → `useState(() => …)` lazy initializer. `InvestmentMixFlow.tsx`: moved the derived-state block (incl. `steps`) above the effects to fix use-before-declare + memoization-not-preserved (2). Chalmers PASS; **Flanders PASS** — the DescriptionList swap is a WCAG 2.2 AA *upgrade* (better reflow, equal/better contrast).

**Plan corrections discovered (so Phase 2+ start from truth):**
- §5/WP1.5 file attributions were approximate. The actual React-Compiler errors were: "components during render" in `view-application` (matches), `Date.now` impure in **`consolidate/manual/ManualConsolidateFlow.tsx:40`** (NOT `layout.tsx:30`), use-before-declare in **`investment-mix/InvestmentMixFlow.tsx:147`** (NOT `manage-income-accounts`). `layout.tsx` and `manage-income-accounts` had **no** eslint errors in the current tree.
- The plan's WP list didn't enumerate the `InfoButton`/`StepInvestmentStrategy`/`StepSetupMode` tsc errors — they're now fixed.

**Carry-forwards (logged for later phases, not Phase 1 blockers):**
- **Destructive "Remove fund" button** (`consolidate/steps/ManualStep1Funds.tsx`) lost its red — Button/TextButton only support `primary`/`success`. Restoring destructive styling needs **Moe to add a destructive Button variant** (ties into §9, the children-vs-`message`/`label` API foot-gun that recurred across 10+ call sites — strong evidence §9 is worth doing).
- Optional: pre-existing `h2→h6` heading gap in the view-application dialog (Flanders flagged; Marge's call on any size change). Not introduced by this work.

---

## Phase 1 — Stop the bleeding (compile + lint clean)

**Goal:** `npx tsc --noEmit` → 0 errors; `npx eslint` → 0 errors. **Acceptance gate for the whole phase.**

| WP | § | File(s) | Change | Effort |
|---|---|---|---|---|
| 1.1 | §1 | `features/retirement-income-account/utils.ts` | Add the dropped `import type { RetirementIncomeAccountState, PensionOption, SpouseDetails, BankDetails, PensionEstimate } from './types'`. Verify the 7 dependent step files then compile. | XS (1 line) |
| 1.2 | §2 | `app/qsuper/member-online/(portal)/consolidate/ato-supermatch/page.tsx` | Delete the duplicate `export default` block. Confirm which body is canonical (the `AtoSuperMatchFlow` one vs the "under construction" placeholder) — likely keep the flow, drop the placeholder. | XS |
| 1.3 | §3 | `features/consolidate/**` (ConsolidateHub, AtoSuperMatchFlow, ManualConsolidateFlow, AmountChoice, AtoStep2Results, AtoStep3Review, ManualStep1Funds, SubmissionSuccess, ManualStep0BeforeYouStart, `app/.../consolidate/smsf/page.tsx` ×2) | Fix API misuse: `Alert message=` not children; remove non-existent `StepperActions totalSteps`; `Button`/`TextButton` `label=` not children; `AmountChoice` types (`readonly`→mutable or type the option array, `TransferAmountType`, `null`→`undefined`); replace invalid icon size `"4xl"` and unsupported Button `color` values. | M (bulk of phase) |
| 1.4 | §4 | `features/lifetime-pension/steps/StepReview.tsx` + `types.ts` | Reconcile `SpouseDetails` — either add `middleName`/`residentialAddress`/`homePhone` to the interface (if the data exists) or stop reading them. Decide with the data shape, not by silencing. | S |
| 1.5 | §5 | `app/member-online/(portal)/lifetime-pension/view-application/page.tsx`, `app/member-online/(portal)/layout.tsx`, `manage-income-accounts/page.tsx` | Hoist `SummarySection`/`SummaryRow` out of render — **prefer replacing with the Foundation `DescriptionList` component** (it's exactly this pattern). Fix the impure-function-during-render in `layout.tsx:30` and the use-before-declare in `manage-income-accounts`. | M |

**Owners:** Lenny (build) → Chalmers (review) → Flanders (WP1.5 touches a11y/DescriptionList semantics) → Frink (commit). Moe consulted on WP1.4 (type contract) and WP1.3 (confirm Button colour/icon constraints).
**Risk:** Low-medium. WP1.3 is volume, not complexity. WP1.4 needs a real data decision.
**Acceptance:** `tsc` and `eslint` both clean; affected flows still render in Storybook/dev; no new behaviour regressions.

---

## Phase 2 — Lock it in (CI quality gate) — §6

**Status at Phase 2 kickoff (2026-06-20):** Phase 1 is complete; `main` is green for `tsc` (0) and `eslint` (0 errors). The CI gate is now safe to add. **One blocker remains for the *test* step — see WP2.0 below.**

**Goal:** A required CI check that fails any PR which breaks types, lint, build, or tests.

**Confirmed npm scripts (from `package.json`, verified 2026-06-20):**
- `npm run lint` → `eslint` — **0 errors**, 114 warnings (errors-only policy = green).
- `npx tsc --noEmit` — **0 errors**.
- `npm run build` → `next build` — **exits 0**.
- `npm run test` → `vitest run` — ⚠️ **NOT green: 1 failing test** (see WP2.0). 110 vitest files run (1 unit test `retirement-projection/projection.test.ts` + 109 Storybook stories via `@storybook/addon-vitest` in a chromium browser project); 513/514 tests pass. The Storybook project requires a browser (Playwright/chromium) — CI must install it (`npx playwright install --with-deps chromium`) and this step is heavier/slower than tsc+lint.
- `npm run lib:build` → `tsup` — the published-library build. The review's process note flagged `InfoButton`'s type error could break `lib:build`/dts; **that error is now fixed**, but consider adding `lib:build` to CI to protect the publish graph.

| WP | Change | Effort |
|---|---|---|
| **2.0** | **BLOCKER — fix the failing test before the test gate can be required.** `src/stories/member-online/MemberOnlineLayout.stories.tsx > Default` fails with `useThemeMode must be used inside a ThemeModeProvider` (the story renders `MemberOnlineLayout` without wrapping it in `ThemeModeProvider`; the global Storybook/vitest decorator isn't applied to this story, or the story needs the provider). Unrelated to Phase 1 code — pre-existing/from the merge. Either fix the story's decorator/wrapper, or (interim) scope the CI test step to `npm run test:unit` (`vitest run --project unit`) so the gate is green while the story-test is fixed separately. **Route to Lenny (story fix) + Marge/Lisa if it's a decorator-config issue; confirm with whoever owns the vitest Storybook setup.** | S |
| 2.1 | Add `.github/workflows/ci.yml`: `npm ci` → `npx tsc --noEmit` → `npm run lint` → `npm run build` → (test step: `npm run test` once WP2.0 is fixed, or `npm run test:unit` interim; the Storybook test project needs `npx playwright install --with-deps chromium`). Trigger on `pull_request` + `push` to `main`. Consider also `npm run lib:build`. | S |
| 2.2 | Mark the `ci` check **required** in branch protection (Adam — repo admin action). Do this only after WP2.0 so the first required run is green. | XS |
| 2.3 | Lint policy: fail on errors only at first (114 warnings exist); optionally ratchet warnings later. `eslint` already exits 0 on errors-only. | XS |

**Owners:** Frink (workflow) → Chalmers (review). Lenny fixes WP2.0. Adam flips branch protection.
**Dependency:** WP2.0 must be resolved (or the test step scoped to `test:unit`) before WP2.2, or the first required run is red.
**Acceptance:** CI runs green on `main`; a deliberately-broken test PR goes red and blocks merge.

---

## Phase 3 — DRY + tests

| WP | § | Change | Effort |
|---|---|---|---|
| 3.1 | §7 | Create `src/lib/format.ts` with one canonical `formatCurrency` and `formatDate` (settle on a single signature + rounding/locale). Replace the 7 currency + 8 date copies; delete the local definitions. Export from `src/index.ts` if useful to library consumers. | M |
| 3.2 | §8 | Seed `vitest` unit tests for pure calc utils — start with `retirement-income-account/utils.ts` (`estimatePension`, drawdown), `investment-mix/utils.ts`, and the new `src/lib/format.ts`. Establish the `tests/` convention the Playwright instructions already assume. | M |

**Owners:** Carl/Lenny (3.1), Carl (3.2) → Chalmers. Moe signs off on `src/lib/` as a new shared location + the canonical format API.
**Risk:** 3.1 touches money display widely — Phase 2's gate + 3.2's tests de-risk it. Watch for intentional rounding differences between the 7 copies before collapsing.
**Acceptance:** single source for formatters; `npm run test` green with meaningful assertions on calc functions.

---

## Phase 4 — Structural cleanup

| WP | § | Change | Effort |
|---|---|---|---|
| 4.1 | §10 | Bring the 14 over-limit components under 200 lines by extracting variant-style maps/subsections (follow `components/buttons/variantStyles.ts`). Prioritise `Card` (387), `RadioGroup` (335), `AnnouncementBanner` (304). Split the 626/621-line `manage-income-accounts` pages into sub-components. | L |
| 4.2 | §11 | Finish IDV extraction — make `retirement-income-account/steps/StepIDV.tsx` consume shared `features/idv/`; delete the duplicated 392-line copy. (Coordinate with the existing `idv-shared-module-plan.md`.) | M |
| 4.3 | §12 | Extract a `useSteppedFlow` hook from the 7 `*Flow.tsx` orchestrators; remove the `eslint-disable exhaustive-deps` workarounds it enables. | L |
| 4.4 | §13 | Moe decision: consolidate `InputSelect` vs `Select` or document why both exist. | S (+ build if merged) |

**Owners:** Moe (4.2/4.3/4.4 architecture) → Lenny → Chalmers → Marge (4.1 visual parity) → Flanders (4.2 a11y). Lisa updates `docs/guidelines/components.md` + stories for any API change.
**Risk:** Medium — refactors with behaviour-preservation requirement. Stories + Phase 2 gate are the safety net. Do one component/flow per PR.
**Acceptance:** no component index.tsx > 200 lines (or documented exception); single IDV implementation; flows share the hook; Storybook unchanged visually.

---

## Phase 5 — Housekeeping

| WP | Change | Effort |
|---|---|---|
| 5.1 | `npx eslint --fix` for the auto-fixable `storybook/no-redundant-story-name` warnings; clear unused vars/imports. | XS |
| 5.2 | Replace `console.log` placeholder `onSearch` handlers in the 3 demo `layout.tsx` files (or wire real handlers). | XS |
| 5.3 | Stop committing generated `tokens-resolved.json` / `tokens-flat.json` (gitignore + remove from tracking) unless Figma sync needs them tracked — confirm with token tooling owner. | S |
| 5.4 | Reconcile `.gitignore` vs tracked `package-lock.json` / `.npmrc` — remove the dead ignore entries (both files are tracked). | XS |
| 5.5 | Move root planning docs (`MUI_TYPOGRAPHY_MIGRATION.md`, `state-coverage-*.md`) into `docs/`. | XS |

**Owners:** Frink (5.1, 5.4, 5.5), Lenny (5.2), token tooling owner (5.3) → Chalmers.

---

## Tracking checklist

- [x] **Decision:** consolidate = **fix (A)** ✅
- [x] Phase 1 — tsc + eslint clean (§1–5) ✅ (committed to `main` in `7a25b7d`; tsc 0, eslint 0 errors, build exit 0)
- [ ] Phase 2 — CI gate added + marked required (§6) — ⚠️ blocked on WP2.0 (failing `MemberOnlineLayout` story test) before the test step can be required
- [ ] Phase 3 — `src/lib/format.ts` + seed tests (§7, §8)
- [ ] Phase 4 — size limits, IDV merge, flow hook, select consolidation (§10–13)
- [ ] Phase 5 — warnings, artifacts, gitignore, root docs

---

## Kickoff prompt — Phase 2 (paste into a new context window)

> **Context:** Continue the Foundation code-quality remediation plan in `docs/Adam/code-quality-remediation-plan-2026-06-20.md` (research: `docs/Adam/code-quality-review-2026-06-20.md`). **Read both before starting.** Phase 1 is **complete and green** — `main` (commit `7a25b7d`) has `npx tsc --noEmit` 0 errors, `npx eslint .` 0 errors (114 warnings remain, Phase 5), `npx next build` exit 0. We are now on **Phase 2 — the CI quality gate (§6).**
>
> **Before writing the workflow, resolve WP2.0 — the one blocker.** `npm run test` (`vitest run`) is **not green**: `src/stories/member-online/MemberOnlineLayout.stories.tsx > Default` fails with `useThemeMode must be used inside a ThemeModeProvider`. It's unrelated to Phase 1 (pre-existing/from a merge). Investigate the story's decorator/provider setup vs. the global Storybook+vitest config, then **fix the story so the suite is green** (route to Lenny; loop in whoever owns the vitest Storybook setup). If a proper fix is non-trivial, propose the interim of scoping the CI test step to `npm run test:unit` (`vitest run --project unit`) and tell me before doing it. Note: the Storybook vitest project runs 109 stories in a chromium browser and needs `npx playwright install --with-deps chromium` in CI.
>
> **Then build the gate (WP2.1):** have Frink draft `.github/workflows/ci.yml` running `npm ci` → `npx tsc --noEmit` → `npm run lint` → `npm run build` → the test step (full `npm run test` once WP2.0 is fixed, else `test:unit`), on `pull_request` + `push` to `main`. Consider adding `npm run lib:build` (tsup) to protect the publish graph. Chalmers reviews the workflow. Verify CI is green, then I (Adam) handle **WP2.2** (mark `ci` required in branch protection — repo-admin action). **WP2.3:** errors-only lint policy (already exits 0).
>
> **Workflow rules:** route through the team — Frink owns the workflow file, Lenny fixes the failing story, Chalmers reviews. **Do not create a branch without asking me first** — have Frink propose the branch name + scope and wait for my explicit approval. Don't commit until Chalmers signs off.
>
> **Stop and check in with me** once CI is green on a test PR and ready for me to flip branch protection — don't mark the check required yourself (that's my action). Do **not** start Phase 3 without checking in.

---

### (Archived) Phase 1 kickoff prompt

> **Context:** Work through the plan… **First decision:** consolidate = fix (A) or quarantine (B). **Then Phase 1 (Stop the bleeding):** get `tsc`/`eslint` to zero via WP1.1–1.5 in order; WP1.1 + WP1.2 are the quick wins. Route through the team (Lenny builds, Chalmers reviews, Flanders for a11y/`DescriptionList`, Moe for the `SpouseDetails` decision). Don't branch/commit without approval. — *Completed 2026-06-20; see the Phase 1 status block above.*
