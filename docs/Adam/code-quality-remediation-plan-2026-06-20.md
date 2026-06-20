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

### ✅ Phase 2 — COMPLETE (gate live, advisory by choice) — 2026-06-20

- **WP2.0 — DONE.** Failing `MemberOnlineLayout.stories.tsx > Default` (`useThemeMode must be used inside a ThemeModeProvider`) fixed by wrapping the story in a `meta.decorators` `<ThemeModeProvider>` (Lenny). No interim `test:unit` scoping needed — full `npm run test` is green: **514/514**. Chalmers PASS.
- **WP2.1 — DONE.** `.github/workflows/ci.yml` added: `checkout → setup-node(22, npm cache) → normalize lockfile → npm ci → tsc --noEmit → lint → build → lib:build → playwright install chromium → test`, on `pull_request` + `push: main`, with `concurrency` cancel and `timeout-minutes: 20`. Chalmers PASS (×2). **Verified GREEN on `origin/main`** (run `27862838364`, all 13 steps success, ~ full browser suite included).
- **WP2.0/2.1 blocker found & fixed — lockfile registry hosts.** First CI run failed at `npm ci` (`Exit handler never called!`) because `package-lock.json` had 185 `resolved` URLs on the internal `https://nexus-repo/repository/npm-proxy/...` host (dual-device ping-pong) unreachable from runners. Fix (Adam-approved "clean lockfile + CI guard"): (1) rewrote the 185 URLs → `https://registry.npmjs.org/` (host-only, integrity unchanged); (2) added a `Normalize lockfile registry hosts` `sed` step before `npm ci` so future Nexus-device installs self-heal in CI. Also cleared the `skip-worktree` bit on `package-lock.json` (was hiding the fix from git) — **Adam chose to leave skip-worktree OFF** going forward so the lockfile stays honest.
- **WP2.3 — DONE.** Errors-only lint policy confirmed: `npm run lint` has no `--max-warnings`; the 114 warnings pass, eslint exits 0. CI lint step green.
- **WP2.2 — DECLINED by Adam (2026-06-20).** Adam does **not** want branch protection / a required check — the team pushes directly to `main` and the enforcement friction (PR-gated merges, ~2–3 min CI wait) isn't wanted. **The `ci` gate is live but advisory:** it runs on every push + PR and reports green/red, but never blocks. This is a deliberate choice, not an oversight — do not re-propose enforcement without Adam raising it first.

**Owners (as executed):** Lenny (WP2.0 story fix) → Frink (workflow, drafted then handed to Claude after a session limit) → Chalmers (reviewed all changes, PASS). Adam committed/pushed directly to `main` and made the WP2.2 / skip-worktree calls.
**Acceptance (met):** CI runs green on `main` (run `27862838364`). The "broken PR blocks merge" criterion is **moot** — WP2.2 (required check) was declined, so the gate is advisory and never blocks. The gate still surfaces green/red on every push + PR.

---

## Phase 3 — DRY + tests

### ✅ Phase 3 — COMPLETE (2026-06-20)

**Both WPs done, lean (no full team pipeline — direct build + verification, per Adam). `main`-ready; not yet committed (Adam commits himself).**

| Gate | After |
|---|---|
| `npx tsc --noEmit` | **0 errors** |
| `npx eslint .` | **0 errors** / 114 warnings (unchanged — Phase 5) |
| `npm run lib:build` | **success** (incl. DTS) |
| `npm run test` | **543/543** (33 new unit tests added) |

**WP3.1 — single source for formatters (`src/lib/format.ts`).** Re-survey corrected the counts: the "7 currency + 8 date" copies were really **2 distinct currency behaviours + 1 date format family**:
- **6 identical 2-dp AUD** `formatCurrency` (`$1,234.56`) — retirement-income-account, lifetime-pension, investment-mix, consolidate, InvestmentOverview, manage-income-accounts. Collapsed into canonical `formatCurrency`.
- **1 deliberate outlier** — `retirement-projection/format.ts` (whole dollars, true-minus, `/yr`, signed). **Left untouched** (Adam's call — it's a different contract, not a duplicate; merging would silently change every projection figure to 2-dp).
- **`formatDate`** (`5 Jun 2026`) ×5 + `formatDateDMY` (`05 / 06 / 2026`) ×2 + `formatDateLong` (`5 June 2026`) ×1 → all folded into canonical. The canonical `formatDate` adopts beneficiaries' **safe component-parse** for `YYYY-MM-DD` (avoids the `new Date('2026-06-05')` UTC-midnight shift) and falls back to `new Date` for ISO timestamps — output identical for current inputs. Added a **range guard** (month 1–12, day 1–31) so malformed dates return the original string instead of `40 undefined 2026` (a latent bug in every original copy; caught by a unit test).
- **Approach:** feature `utils.ts` barrels now **re-export** the canonical formatters (`export { formatCurrency, … } from '@/lib/format'`) so all ~30 call sites keep importing from `../utils` unchanged — zero call-site churn, single implementation. The 2 exported component files (`InvestmentOverview/index.tsx`, `DialItem.tsx`) use a **relative** import (`../../lib/format`) because they're in the published `lib:build` graph and tsup/esbuild has no `@/` alias plugin. `src/lib/format.ts` is **not** exported from `src/index.ts` (it's an internal app util, not part of the public component API).
- **Config fix:** added `resolve.alias` `@`→`src` to `vitest.config.ts` so the node `unit` project resolves the new `@/lib/format` imports (it previously had no `@/` imports to resolve).

**WP3.2 — seed unit tests.** Added `src/lib/format.test.ts` (11 tests — currency rounding/grouping/negatives, date parsing incl. the timezone + malformed-input guards), `retirement-income-account/utils.test.ts` (`estimatePension` rate table + null cases, `getMinDrawdownRate` brackets, `estimateRetirementBonus` cap), `investment-mix/utils.test.ts` (`ordinal`, `allocationsEqual`, `summariseMix`, `validateStep3` incl. float tolerance). The `unit` project (`src/**/*.test.ts`, node env) now has 4 test files / 44 tests.

**Carry-forwards:** none. Note for Phase 5: the barrel re-export comments + the untouched projection formatter are intentional, not cleanup targets.

---

**Status: ~~NOT STARTED~~ COMPLETE — see block above.** Phases 1 + 2 were done and `main` green; Phase 3 built on that. The CI gate runs on every push + PR (advisory), so this work gets automatic green/red feedback — but nothing blocks, so it was verified locally (tsc/lint/lib:build/test all green) before handing back.

**Before starting, re-survey the duplication (counts below are from the 2026-06-20 review and may have drifted):**
- `formatCurrency` — grep for definitions: `grep -rn "formatCurrency" src/ --include=*.ts`. Review listed 7 copies across `features/consolidate/utils.ts`, `features/investment-mix/utils.ts`, `features/lifetime-pension/utils.ts`, `features/retirement-income-account/utils.ts`, `features/retirement-projection/format.ts`, `components/InvestmentOverview/index.tsx`, `app/member-online/(portal)/manage-income-accounts/page.tsx`.
- `formatDate` — 8 copies (similar spread). **Watch for divergent signatures/rounding/locale before collapsing** (`amount` vs `value`, options vs none) — settle one canonical signature, don't silently change any call site's output.
- Test convention: only `features/retirement-projection/projection.test.ts` exists as a real unit test (vitest `unit` project = `src/**/*.test.{ts,tsx}`, node env — see `vitest.config.ts`). The `tests/` dir the Playwright instructions assume does **not** exist yet.

| WP | § | Change | Effort |
|---|---|---|---|
| 3.1 | §7 | Create `src/lib/format.ts` with one canonical `formatCurrency` and `formatDate` (settle on a single signature + rounding/locale). Replace the 7 currency + 8 date copies; delete the local definitions. Export from `src/index.ts` if useful to library consumers. | M |
| 3.2 | §8 | Seed `vitest` unit tests for pure calc utils — start with `retirement-income-account/utils.ts` (`estimatePension`, drawdown), `investment-mix/utils.ts`, and the new `src/lib/format.ts`. Establish the `tests/` convention the Playwright instructions already assume. | M |

**Owners:** Carl/Lenny (3.1), Carl (3.2) → Chalmers. Moe signs off on `src/lib/` as a new shared location + the canonical format API.
**Risk:** 3.1 touches money display widely — Phase 2's gate + 3.2's tests de-risk it. Watch for intentional rounding differences between the 7 copies before collapsing.
**Acceptance:** single source for formatters; `npm run test` green with meaningful assertions on calc functions.

---

## Phase 4 — Structural cleanup

**Status: IN PROGRESS (started 2026-06-20) — running LEAN at Adam's request (direct build + verify, one component at a time, no full team pipeline).** Baseline confirmed green before starting: `tsc` 0, `eslint` 0 errors (114 warnings), `lib:build` OK.

### WP4.1 progress — 18 of 19 components DONE (only InputSelect left, deferred to WP4.4); 2 app pages remain

Extraction pattern used throughout: pull type/interface declarations into `types.ts`, variant-style maps + derived-sx helpers into `styles.ts`, and large JSX subsections / cohesive logic into sibling sub-components or co-located hooks. `index.tsx` re-exports all public types (`export type { … } from './types'`) so `src/index.ts` and external imports are **unchanged**. Verified after each: `tsc` 0, `eslint` 0 errors, `lib:build` DTS stable (public API byte-identical), and the component's Storybook story tests pass. **Final state: every `src/components/**/*.tsx` is now ≤200 lines except `InputSelect` (257, deferred). Full repo green: `tsc` 0, `eslint` 0 errors, warnings 114→113.**

| Component | Before | After (index) | New sibling files |
|---|---|---|---|
| `Card` | 387 | **154** | `types.ts`, `styles.ts`, `helpers.tsx`, `CardGrid.tsx` |
| `RadioGroup` | 335 | **127** | `types.ts`, `styles.ts`, `RadioOptionItem.tsx` |
| `AnnouncementBanner` | 304 | **187** | `types.ts`, `styles.ts` |
| `MemberOnline/MobileNavDrawer` | 278 | **173** | `RootNavPanel.tsx`, `DrillNavPanel.tsx` |
| `FileUpload` | 260 | **176** | `Dropzone.tsx` |
| `PosterPanel` | 255 | **180** | `types.ts`, `styles.ts` |
| `TextField` | 245 | **159** | `types.ts`, `styles.ts` |
| `Checkbox` | 237 | **118** | `types.ts`, `helpers.tsx`, `styles.ts` |
| `DescriptionList` | 233 | **90** | `types.ts`, `context.ts`, `DescriptionListItem.tsx` |
| `AddressField/AustralianAutocomplete` | 239 | **187** | `autocompleteStyles.ts` (+ deduped an identical inline link sx) |
| `Dialog` | 223 | **173** | `types.ts`, `constants.tsx` (incl. SlideUp), `DrawerDragHandle.tsx` |
| `Header/ARTHeader` | 225 | **161** | `useArtHeaderNav.ts` (hook) |
| `Header/QSuperHeader` | 210 | **180** | `useQSuperHeaderNav.ts` (hook; also removed an unused `UtilityBar` import) |
| `Header/CondensedBar` | 203 | **140** | `CondensedSearch.tsx` |
| `Select` | 218 | **167** | `types.ts`, `styles.ts` |
| `DataGrid` | 219 | **156** | `parts/DataGridBody.tsx` (+ moved `DataGridProps` to `types.ts`, exported `DataGridRowProps`) |
| `MemberOnline/NavFlyout` | 206 | **161** | `useNavFlyoutKeyboard.ts` (hook) |
| `Table/ResponsiveTable` | 203 | **174** | `responsiveTableTypes.ts` |

**Carry-forward found:** `src/components/Card/cardParts.tsx` (150 lines) is **tracked but imported nowhere** (grep across all `.ts`/`.tsx` returns zero references) — dead code. Left untouched (out of scope, "look before deleting"); flag for **Phase 5** cleanup or confirm with Moe whether it's intended.

**The two 621-line `manage-income-accounts` pages — DONE.** Both split behaviour-preservingly into co-located siblings (mock data, types, sub-components extracted from the inline definitions):
- `manage-income-accounts/page.tsx` **621 → 146** — extracted `types.ts`, `mockData.ts`, `AccountListRow.tsx`, `AccountSelect.tsx`, `ApplicationRow.tsx`, `detailParts.tsx` (DetailRow/Section), `AccountDetailView.tsx`. (Also dropped a dead unused `isLifetimePension` var.)
- `manage-income-accounts/[id]/page.tsx` **621 → 150** — extracted `types.ts`, `mockData.ts` (the 178-line `MOCK_DETAILS`), `parts.tsx` (SectionHeading/DetailRow/InlineCard), `sections.tsx` (PaymentsSection/BeneficiariesSection), `CentrelinkScheduleSection.tsx`.

**WP4.1 is COMPLETE** (everything except `InputSelect`, deferred to WP4.4). Full repo re-verified after all of WP4.1: `tsc` **0 errors**, `eslint` **0 errors** (warnings 114 → **112**, two dead imports/vars cleared as a side-effect), `lib:build` DTS stable at **89.13 KB**, `npm run test` **543/543 passing** (113 files). Nothing committed — Adam commits himself.

**Note for whoever does these pages' follow-up:** `page.tsx` carried Adam's pre-existing uncommitted WIP when split; the split only relocated code (no logic change), and the file was green before and after.

**`InputSelect` (257)** is intentionally deferred to **WP4.4** (which decides whether it's consolidated into `Select` or kept).

**WP4.2 / 4.3 / 4.4:** not started.

*Original re-verified counts (2026-06-20, before any Phase 4 work):*

| WP | § | Change | Effort |
|---|---|---|---|
| 4.1 | §10 | Bring the over-limit components under 200 lines by extracting variant-style maps/subsections (follow `components/buttons/variantStyles.ts`). **Re-verified: 19 component `.tsx` files now exceed 200 lines** (not 14). Top offenders: `Card/index.tsx` (387), `RadioGroup/index.tsx` (335), `AnnouncementBanner/index.tsx` (304), `MemberOnline/MobileNavDrawer/index.tsx` (278), `FileUpload/index.tsx` (260), `InputSelect/index.tsx` (257), `PosterPanel/index.tsx` (255), `TextField/index.tsx` (245), `Checkbox/index.tsx` (237), `DescriptionList/index.tsx` (233), `Dialog/index.tsx` (223). Also split the two **621-line** `manage-income-accounts` pages (`page.tsx` + `[id]/page.tsx`) into sub-components. **Do one component per PR; verify the story renders unchanged after each.** | L |
| 4.2 | §11 | Finish IDV consolidation. The shared module **already exists** (`features/idv/`: `StepIDV.tsx` 363, `idvService.ts` 59, `IdvModal.tsx`, `useIdvGate.ts`) and is **already consumed** by `lifetime-pension` + `consolidate` + `RetirementIncomeAccountFlow.tsx`. Remaining duplicates: **`retirement-income-account/steps/StepIDV.tsx` (392 lines — has diverged from the shared 363-line copy, so diff carefully, don't blind-delete)** plus two near-identical local `idvService.ts` (retirement-income-account 47, lifetime-pension 47) vs shared (59). **First confirm whether the local `steps/StepIDV.tsx` is even still wired in** (the Flow imports `features/idv`) — it may be orphaned. Coordinate with `docs/Adam/idv-shared-module-plan.md`. | M |
| 4.3 | §12 | Extract a `useSteppedFlow` hook from the `*Flow.tsx` orchestrators; remove the `eslint-disable exhaustive-deps` workarounds it enables. **Re-verified: 7 `*Flow.tsx` files, but only 4 are large stepped orchestrators worth the hook** — `InvestmentMixFlow` (560), `RetirementIncomeAccountFlow` (504), `LifetimePensionFlow` (458), `RetirementProjectionFlow` (445). The other 3 (`AtoSuperMatchFlow` 237, `ManualConsolidateFlow` 192, `NominationFlow` 160) are a different shape — assess whether they fit the hook or stay as-is. | L |
| 4.4 | §13 | Moe decision: consolidate `InputSelect` vs `Select` or document why both exist. **Re-verified: `InputSelectContainer` is used in only 3 non-story files** — small surface, low-risk either way. | S (+ build if merged) |

**Owners (if routing through the team — Phase 3 was done lean/direct at Adam's request; ask Adam which he wants for Phase 4):** Moe (4.2/4.3/4.4 architecture) → Lenny → Chalmers → Marge (4.1 visual parity) → Flanders (4.2 a11y). Lisa updates `docs/guidelines/components.md` + stories for any API change.
**Risk:** Medium — refactors with a behaviour-preservation requirement. Stories + the Phase 2 CI gate (advisory) + Phase 3's new unit tests are the safety net. **Do one component/flow at a time; run `npm run test` + `npx tsc --noEmit` after each.**
**Acceptance:** no component `index.tsx` > 200 lines (or a documented exception); single IDV implementation; the 4 big flows share the hook; Storybook unchanged visually; `lib:build` still green (4.1 touches exported components).

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
- [x] Phase 2 — CI gate added + **green on `main`** (§6). WP2.0 (story test) ✅, WP2.1 (`ci.yml`) ✅, WP2.3 (errors-only lint) ✅. **WP2.2 (mark required in branch protection) — declined by Adam; gate kept advisory by choice.**
- [x] Phase 3 — `src/lib/format.ts` (canonical formatters; 6 currency + 8 date copies collapsed, projection outlier left separate) + seed unit tests (44 tests / 4 files). tsc 0, eslint 0 errors, lib:build OK, test 543/543. ✅ (not yet committed — Adam commits himself)
- [~] Phase 4 — **WP4.1 (size limits) ✅ DONE**: 18 components + both 621-line pages now ≤200 lines (only `InputSelect` 257 left, deferred to WP4.4). tsc 0, eslint 0 errors (114→112 warnings), lib:build OK, test **543/543**. **WP4.2 (IDV merge), WP4.3 (`useSteppedFlow`), WP4.4 (InputSelect) — NOT STARTED.** See the "Phase 4 — IN PROGRESS" block for the per-component tally.
- [ ] Phase 5 — warnings, artifacts, gitignore, root docs

---

## Kickoff prompt — Phase 4 continuation: WP4.2 → WP4.3 → WP4.4 (paste into a new context window)

> **Context:** Continue the Foundation code-quality remediation plan in `docs/Adam/code-quality-remediation-plan-2026-06-20.md` (research: `docs/Adam/code-quality-review-2026-06-20.md`). **Read the "Phase 4 — IN PROGRESS" block first.** Phases 1–3 and **Phase 4 WP4.1 are COMPLETE and green** (verified 2026-06-21): `npx tsc --noEmit` **0 errors**, `npx eslint .` **0 errors** (112 warnings → Phase 5), `npm run lib:build` success (DTS 89.13 KB), `npm run test` **543/543** passing (113 files). **Nothing is committed yet — Adam commits/pushes himself; ask before assuming the working tree is clean.** A CI gate (`.github/workflows/ci.yml`) runs on every push + PR, **advisory only** (Adam declined branch protection — do NOT re-propose it).
>
> **WP4.1 is done:** all 18 over-limit components + both 621-line `manage-income-accounts` pages are now ≤200 lines (extraction pattern: `types.ts` / `styles.ts` / sibling sub-components / co-located hooks; `index.tsx` re-exports public types so the API is unchanged). The per-component before→after tally is in the "Phase 4 — IN PROGRESS" block. The only file still >200 is **`InputSelect/index.tsx` (257)**, intentionally left for WP4.4.
>
> **Workflow (confirmed by Adam):** run **LEAN** — direct build + verify, ONE unit at a time, no full team pipeline. After every change run `npx tsc --noEmit`, `npm run lint`, `npm run test`; for any change to an *exported* component (in `src/index.ts`) also `npm run lib:build`. **Do not create a branch or commit without asking Adam first.** Behaviour-preserving throughout; stories + Phase 3 unit tests are the safety net.
>
> **You are now on WP4.2 (do these in order):**
>
> **WP4.2 — finish IDV consolidation (§11).** The shared `features/idv/` module exists and is consumed by lifetime-pension, consolidate, and `RetirementIncomeAccountFlow.tsx`. **Re-verified 2026-06-21:** the local `retirement-income-account/steps/StepIDV.tsx` (392) **IS still imported** (`RetirementIncomeAccountFlow.tsx:20` — NOT orphaned), and it has **diverged** from the shared `features/idv/StepIDV.tsx` (363) — diff them carefully, don't blind-delete; the goal is to migrate the Flow onto the shared component (reconciling the divergence) then remove the local copy. Also collapse the two local `idvService.ts` (`retirement-income-account/idvService.ts` 47, `lifetime-pension/idvService.ts` 47) into the shared `features/idv/idvService.ts` (59) if they're truly equivalent. **Read `docs/Adam/idv-shared-module-plan.md` first.**
>
> **WP4.3 — extract `useSteppedFlow` (§12).** Re-verified 2026-06-21: 4 large stepped orchestrators worth a shared hook — `InvestmentMixFlow` (560), `RetirementIncomeAccountFlow` (504), `LifetimePensionFlow` (458), `RetirementProjectionFlow` (445). Extract their common step/back/next/draft logic into a `useSteppedFlow` hook and remove the `eslint-disable react-hooks/exhaustive-deps` workarounds it lets you delete. The 3 smaller flows (`AtoSuperMatchFlow` 237, `ManualConsolidateFlow` 192, `NominationFlow` 160) are a different shape — assess separately, they may not fit. **This is the riskiest WP** (shared stateful hook across 4 flows) — go one flow at a time, run `npm run test` after each.
>
> **WP4.4 — `InputSelect` vs `Select` (§13) + clears the last >200 file.** Architecture decision. **Re-verified 2026-06-21:** `InputSelectContainer` underpins the select-adornment feature of `TextField` (`TextField/index.tsx` + `types.ts`), `MoneyField`, and `PercentageField` — i.e. it's an *inline adornment select inside a field*, a genuinely different use case from the standalone `Select` dropdown. Likely outcome: **keep both, document the boundary** in `docs/guidelines/components.md`. Separately, bring `InputSelect/index.tsx` (257) under 200 via the same extraction pattern (it's the last over-limit file).
>
> **Also flag for Phase 5:** `src/components/Card/cardParts.tsx` (150 lines) is dead code — tracked but imported nowhere.

---

### (Archived) Phase 4 WP4.1 kickoff prompt

> **Context:** …Phases 1–3 complete and green; start **Phase 4 — Structural cleanup**, WP4.1 (component size limits, §10) first — bring the 19 over-200 component files + the two 621-line `manage-income-accounts` pages under 200 via the `components/buttons/variantStyles.ts` extraction pattern, one at a time, behaviour-preserving. — *WP4.1 completed 2026-06-21, LEAN. All 18 components + both pages done (InputSelect 257 deferred to WP4.4). tsc 0, eslint 0 errors (114→112 warnings), lib:build OK, test 543/543. Per-component tally in the "Phase 4 — IN PROGRESS" block; WP4.2–4.4 remain. See the current Phase 4 continuation kickoff above.*

---

### (Archived) Phase 3 kickoff prompt

> **Context:** …Phases 1 + 2 complete and green; do **Phase 3 — DRY + tests (§7, §8)**. Create `src/lib/format.ts` (canonical `formatCurrency`/`formatDate`), re-survey the 7 currency + 8 date copies, collapse without changing displayed output, seed `vitest` unit tests for the calc utils. — *Completed 2026-06-20. Re-survey found 6 identical 2-dp currency copies (collapsed) + 1 deliberate whole-dollar projection outlier (left separate, Adam's call); date family (`formatDate`/`formatDateDMY`/`formatDateLong`) folded into the canonical module with a safer date-only parse + range guard. Feature `utils.ts` barrels re-export the canonical formatters (zero call-site churn); the 2 exported component files use a relative import (tsup has no `@/` alias). Added `resolve.alias` to `vitest.config.ts`. 44 unit tests / 4 files. tsc 0, eslint 0 errors, lib:build OK, test 543/543. Done lean (no full team pipeline). See the "Phase 3 — COMPLETE" block above.*

---

### (Archived) Phase 2 kickoff prompt

> **Context:** …Phase 1 complete and green; do **Phase 2 — CI quality gate (§6)**. Resolve WP2.0 (failing `MemberOnlineLayout` story — `ThemeModeProvider` missing), then Frink drafts `ci.yml` (tsc/lint/build/test), Chalmers reviews, verify green, Adam flips branch protection. — *Completed 2026-06-20. WP2.0/2.1/2.3 done & green on `main`; a lockfile `nexus-repo`-host blocker was found and fixed (rewrite + CI sed guard); WP2.2 (required check) was **declined** by Adam — gate left advisory. See the "Phase 2 — COMPLETE" block above.*

---

### (Archived) Phase 1 kickoff prompt

> **Context:** Work through the plan… **First decision:** consolidate = fix (A) or quarantine (B). **Then Phase 1 (Stop the bleeding):** get `tsc`/`eslint` to zero via WP1.1–1.5 in order; WP1.1 + WP1.2 are the quick wins. Route through the team (Lenny builds, Chalmers reviews, Flanders for a11y/`DescriptionList`, Moe for the `SpouseDetails` decision). Don't branch/commit without approval. — *Completed 2026-06-20; see the Phase 1 status block above.*
