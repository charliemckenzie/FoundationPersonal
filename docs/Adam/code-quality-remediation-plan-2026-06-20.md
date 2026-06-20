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

## Decision required before Phase 1 starts

**The `consolidate` feature (§3) is committed but doesn't compile and is self-labelled "under construction".** Choose one:
- **A — Fix it** (this plan's default): correct the ~16 API-misuse errors so the feature compiles and works.
- **B — Quarantine it**: if it's not meant to ship yet, exclude it from the build/typecheck (e.g. move under a `_wip/` path or `tsconfig` exclude) and fix later.

Option A is assumed below. If you pick B, WP1.3 changes from "fix" to "isolate" and the CI gate (Phase 2) won't block on it. **This is the one open question to resolve at kickoff.**

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

**Goal:** A required CI check that fails any PR which breaks types, lint, build, or tests.

| WP | Change | Effort |
|---|---|---|
| 2.1 | Add `.github/workflows/ci.yml`: `npm ci` → `npx tsc --noEmit` → `npm run lint` → `npm run test` → `npm run build`. Trigger on `pull_request` + `push` to `main`. | S |
| 2.2 | Mark the `ci` check **required** in branch protection (Adam — repo admin action). | XS |
| 2.3 | Decide lint policy: fail on errors only at first (114 warnings exist); optionally ratchet warnings later. | XS |

**Owners:** Frink (workflow) → Chalmers (review). Adam flips branch protection.
**Dependency:** Must land *after* Phase 1 or the very first run is red.
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

- [ ] **Decision:** consolidate = fix (A) or quarantine (B)
- [ ] Phase 1 — tsc + eslint clean (§1–5)
- [ ] Phase 2 — CI gate added + marked required (§6)
- [ ] Phase 3 — `src/lib/format.ts` + seed tests (§7, §8)
- [ ] Phase 4 — size limits, IDV merge, flow hook, select consolidation (§10–13)
- [ ] Phase 5 — warnings, artifacts, gitignore, root docs

---

## Kickoff prompt (paste into a new context window)

> **Context:** Work through the Foundation code quality remediation plan in `docs/Adam/code-quality-remediation-plan-2026-06-20.md`, which is based on the research in `docs/Adam/code-quality-review-2026-06-20.md`. Read both before starting.
>
> **First, one decision I need to make:** the `consolidate` feature doesn't compile and is labelled "under construction" — ask me whether to **fix it** (Option A) or **quarantine it** (Option B) before touching it.
>
> **Then start Phase 1 (Stop the bleeding):** get `npx tsc --noEmit` and `npx eslint` to zero errors by working through WP1.1–1.5 in order. WP1.1 (restore the dropped type import in `features/retirement-income-account/utils.ts`) and WP1.2 (remove the duplicate `export default` in the qsuper ato-supermatch page) are the quick wins — do those first and re-run `tsc` so we can see the error count drop.
>
> **Workflow rules:** route the work through the team — Lenny builds, Chalmers reviews, Flanders for anything a11y-affecting (WP1.5 swaps in `DescriptionList`), Moe for the `SpouseDetails` type decision (WP1.4) and any API call. **Do not create a branch without asking me first** — have Frink propose the branch name and scope and wait for my approval. Don't commit until Chalmers has signed off. Show me the `tsc` error count after each work package so I can track progress.
>
> Do **not** start Phase 2 (CI gate) until Phase 1 is green, or the first CI run will be red. Stop and check in with me when Phase 1 is complete.
