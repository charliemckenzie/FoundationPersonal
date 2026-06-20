# Foundation — Holistic Code Quality Review

**Date:** 2026-06-20
**Author:** Code review (Claude Code)
**Scope:** 68 components, 8 feature flows, app routes, theme system, build/CI config
**Method:** `tsc --noEmit`, `eslint`, anti-pattern scans, dependency/CI inspection, targeted deep reads

---

## Headline

The component library and styling discipline are genuinely strong (no `any`, no `px` font sizes, no hardcoded hex in components, token-only `sx`, 109 stories). But **`main` does not type-check or lint clean** — **57 TypeScript errors** and **25 ESLint errors** are committed — and **nothing in CI catches this**. Dev works because Turbopack doesn't type-check; the breakage is invisible until someone runs `next build`.

> **⚠️ UPDATE 2026-06-20 — Phase 1 of the remediation plan is DONE.** §1–5 are **resolved**: `main` (commit `7a25b7d`) now has **0 `tsc` errors**, **0 `eslint` errors** (114 warnings remain → Phase 5), and **`next build` exits 0**. See `code-quality-remediation-plan-2026-06-20.md` → "Phase 1 — COMPLETE" for the per-WP detail and corrections. The original findings below are kept for the record; current-state columns are added to the metrics table. We are now on **Phase 2 (CI gate, §6)**.

**Snapshot metrics**

| Signal | At review (2026-06-20) | Current (post-Phase 1) |
|---|---|---|
| `tsc --noEmit` errors | 57 | **0** ✅ |
| ESLint errors / warnings | 25 / 114 | **0** / 114 ✅ |
| `next build` | broke | **exit 0** ✅ |
| Explicit `any` types (components/features/app) | 0 | 0 |
| `px` font sizes | 0 | 0 |
| Hardcoded hex in components/features | 0 | 0 |
| Inline `style={{}}` props | 2 | 2 |
| `formatCurrency` definitions | 7 (duplicated) | 7 — **still TODO (Phase 3 §7)** |
| `formatDate` definitions | 8 (duplicated) | 8 — **still TODO (Phase 3 §7)** |
| Test files | *(stated 1)* | **110 vitest files** (1 unit test + 109 Storybook stories via `@storybook/addon-vitest` chromium project); **513/514 tests pass — 1 failing** (`MemberOnlineLayout.stories.tsx > Default`, `ThemeModeProvider` missing). The "1 test file" metric undercounted: there is genuinely 1 *unit* test, but the story suite also runs as tests. **Phase 2 blocker — see plan WP2.0.** |
| Storybook stories | 109 | 109 |
| Components > 200-line charter limit | 14 | 14 — **still TODO (Phase 4 §10)** |
| CI jobs running tsc/eslint/test/build | 0 | 0 — **Phase 2 in progress (§6)** |

---

## 🔴 Critical — broken on `main`, blocks `next build`

### 1. `retirement-income-account/utils.ts` is missing its type imports (24 errors)
`src/features/retirement-income-account/utils.ts` uses `RetirementIncomeAccountState`, `PensionOption`, `SpouseDetails`, `BankDetails`, `PensionEstimate` but only imports from `./constants` — there is **no `import … from './types'`**. The types exist in `src/features/retirement-income-account/types.ts`; the import line was dropped. This file is imported by **7 step files**, so the whole feature fails compilation.
**Fix:** add the missing `import type { … } from './types'`. One line. High value.

### 2. Duplicate `export default` — botched merge
`src/app/qsuper/member-online/(portal)/consolidate/ato-supermatch/page.tsx` contains **two** `export default function QSuperAtoSuperMatchPage()` bodies (a real flow + an "under construction" placeholder) stacked in one file. Hard compile error.
**Fix:** delete whichever is stale (the placeholder appears to be the leftover).

### 3. `consolidate` feature is committed but does not compile (~16 errors)
The feature is tracked (18 files) yet riddled with API misuse:
- `<Alert severity="info">text</Alert>` — Alert takes a **`message`** prop, not children. (`ConsolidateHub.tsx:36`, `ManualStep0BeforeYouStart`, both `smsf/page.tsx`)
- `<StepperActions totalSteps={…} />` — **no such prop** (`AtoSuperMatchFlow.tsx:228`, `ManualConsolidateFlow.tsx:183`)
- `<TextButton>text</TextButton>` / `<Button>text</Button>` — both require a **`label`** prop, not children (`AtoStep2Results`, `AtoStep3Review`, `ManualStep1Funds`, `SubmissionSuccess`)
- `AmountChoice` — `readonly` options array assigned to mutable `RadioOption[]`, `string` vs `TransferAmountType`, `null` vs `undefined` (`AmountChoice.tsx`)
- Invalid icon size `"4xl"` and `color="secondary"`/`"error"` on Button (only `primary`/`success` supported)

### 4. `lifetime-pension/StepReview.tsx` reads fields that don't exist on the type
`src/features/lifetime-pension/steps/StepReview.tsx:140–147` accesses `SpouseDetails.middleName`, `.residentialAddress`, `.homePhone` — none defined on the interface. Either the type or the access is wrong; today it's a type error and a latent `undefined` at runtime.

### 5. React Compiler ESLint errors (25 errors)
The React-Compiler lint rules are firing on real anti-patterns:
- **Components defined during render** — `src/app/member-online/(portal)/lifetime-pension/view-application/page.tsx:183,194` declares `SummarySection`/`SummaryRow` *inside* the page component. This breaks memoization and risks remounts on every render. **Also note:** these reinvent the Foundation **`DescriptionList`** component — use that instead and the lint error disappears.
- **Impure function during render** in `src/app/member-online/(portal)/layout.tsx:30` and "cannot access variable before declared" in `manage-income-accounts/page.tsx`.

---

## 🟠 High — quality / maintainability / safety

### 6. No mechanical quality gate in CI — *this is the root cause of §1–5*

> **Phase 2 status (2026-06-20):** This is now the active phase. `main` is green for tsc + eslint, so the gate is safe to add. **New blocker found while verifying the test step:** `npm run test` is not green — `MemberOnlineLayout.stories.tsx > Default` fails (`ThemeModeProvider` missing). The Storybook vitest project also needs chromium installed in CI. Both must be handled before the test gate is marked required — see plan WP2.0/2.1.
`.github/workflows/` has only `publish`, `signoff`, `sync-runtimes`. **None run `tsc`, `eslint`, `vitest`, or `next build`.** The `signoff` gate only validates PR-body checkboxes — so the entire Chalmers/Flanders pipeline is enforced *socially*, not mechanically. That's exactly how 57 type errors reached `main`.
**Fix:** add a `ci.yml` running `tsc --noEmit && eslint && next build` (and `vitest run`) as a required check. Highest-leverage single change in this review.

### 7. `formatCurrency` defined **7×**, `formatDate` **8×**
Duplicated in every feature `utils.ts` plus `InvestmentOverview` and two `manage-income-accounts` pages, with **divergent signatures and rounding** (`amount` vs `value`, options vs none). There is no shared `src/lib/` or `src/utils/`.
**Fix:** create `src/lib/format.ts` with one canonical `formatCurrency`/`formatDate`; delete the copies. Removes drift risk in money-display code.

Locations:
- `features/consolidate/utils.ts`
- `features/investment-mix/utils.ts`
- `features/lifetime-pension/utils.ts`
- `features/retirement-income-account/utils.ts`
- `features/retirement-projection/format.ts`
- `components/InvestmentOverview/index.tsx`
- `app/member-online/(portal)/manage-income-accounts/page.tsx`

### 8. Near-zero automated test coverage
**1 test file** (`features/retirement-projection/projection.test.ts`) for the whole app, despite `vitest`, `playwright`, `@vitest/browser-playwright`, and `@storybook/addon-vitest` all installed and configured. The `tests/` directory referenced by the Playwright instructions **doesn't exist**. Money-math utilities (`estimatePension`, drawdown, currency) are exactly what should be unit-tested.
**Fix:** start with unit tests on the `utils.ts` calculation functions per feature; they're pure and high-risk.

### 9. Foundation component APIs are being bypassed at scale
The recurring `children`-instead-of-`message`/`label` errors (§3) across 10+ call sites suggest the prop-based API (`message`, `label`) is non-obvious — developers/agents instinctively pass children. Worth a Moe decision: either (a) support `children` as an alias on `Alert`/`Button`/`TextButton`, or (b) add lint/docs to steer call sites. Right now it's a repeated foot-gun.

---

## 🟡 Medium — structure & consistency

### 10. 14 components exceed the 200-line charter limit
`Card` 387, `RadioGroup` 335, `AnnouncementBanner` 304, `MobileNavDrawer` 278, `FileUpload` 260, `InputSelect` 257, `PosterPanel` 255, `TextField` 245, `Checkbox` 237, `DescriptionList` 233, `Dialog` 223, `DataGrid` 219, `Select` 218, `NavFlyout` 206. Pages are worse: `manage-income-accounts/page.tsx` **626**, its `[id]` variant **621**. Extract variant-style maps and subsections per the charter (`src/components/buttons/variantStyles.ts` is the model to follow).

### 11. Incomplete IDV extraction
A shared `features/idv/` exists, yet `features/retirement-income-account/steps/StepIDV.tsx` (392 lines) still carries its own copy. Per the IDV-extraction-first plan, this feature should consume the shared module. Finish the migration or the two will diverge.

### 12. 7 flow orchestrators reimplement the same step state-machine
Each `*Flow.tsx` hand-rolls `currentStep`/direction/next/back, several needing `eslint-disable react-hooks/exhaustive-deps` to do it (`InvestmentMixFlow`, `Step4PaymentPreference`, `RetirementProjectionFlow`, `StepTransition`). A shared `useSteppedFlow` hook would remove the disables and the boilerplate. Recommendation, not a defect.

### 13. `InputSelect` vs `Select` overlap
Two select components in the catalogue. Worth a Moe consolidation check — confirm `InputSelect` earns its place or fold it in.

---

## 🟢 Low — housekeeping

- **114 ESLint warnings** — mostly `storybook/no-redundant-story-name` (auto-fixable) and a few unused vars/imports.
- **`console.log` placeholders** in `onSearch` handlers across 3 `layout.tsx` files (`paolo`, `public-web`, `qsuper/public-web`) — fine for demos, but they ship.
- **Generated artifacts committed** — `tokens-resolved.json` (99 KB), `tokens-flat.json` (485 KB) are build outputs in git; churn noise. `tokens.json` (source) is the only one needed.
- **`.gitignore` lists `package-lock.json` and `.npmrc`, but both are tracked** — the ignore entries are dead and misleading (and tie into the dual-registry lockfile-churn pain). Remove the stale entries or stop tracking the files — pick one.
- **Stray root planning docs** — `MUI_TYPOGRAPHY_MIGRATION.md`, `state-coverage-section.md`, `state-coverage-tables.md` clutter the root; move to `docs/`.

---

## What's genuinely good

Token-only styling is near-perfectly enforced (0 `any`, 0 `px` font sizes, 0 hardcoded hex in components, 2 stray inline styles total). The typography/component guidelines are unusually thorough. 109 Storybook stories give strong visual coverage. The `buttons/variantStyles.ts` shared-helper pattern is the right model — it just needs to spread to the oversized components.

---

## Recommended order of attack

1. **Add a CI quality gate** (§6) — without this, everything below regresses again.
2. **Fix the 5 critical compile breakers** (§1–5) — §1 and §2 are ~2-line fixes; §3 is the bulk (consolidate API misuse).
3. **Consolidate `formatCurrency`/`formatDate`** into `src/lib/format.ts` (§7).
4. **Seed unit tests** on the pure calc utils (§8).
5. Then the medium structural items (size limits, IDV extraction, flow hook).

---

## Process note

Per the team workflow, fixes should route through Chalmers (review) and Frink (branch/commit), and **branching requires explicit approval first**. The publish pipeline (`publish.yml`) runs on `v*.*.*` tags via `npm ci → lib:build → npm publish`; the library entry (`src/index.ts`) exports components + themes only, so most of the broken feature/app files are outside the published graph — but `InfoButton`'s type error *is* in the library graph and could break `lib:build`/`dts` generation. Verify before the next release tag.
