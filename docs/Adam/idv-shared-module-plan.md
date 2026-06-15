# Plan — Extract Equifax IDV into a reusable shared module

**Status:** Ready to execute — **run this BEFORE the consolidate plan**
**Owner:** Adam (designer-supervised)
**Target model:** Sonnet, fresh session
**New module:** `src/features/idv/`
**Touches merged code:** `src/features/lifetime-pension/` (PR #46) — refactor with regression
**Companion plan:** `docs/Adam/consolidate-super-plan.md` (depends on this being done first)

---

## 0. How to use this document

You are a fresh agent. This is a **refactor + extraction** task: lift the existing, working Equifax IDV process out of `lifetime-pension` into a standalone, reusable `src/features/idv/` module, add a small reusable wrapper API, then re-point `lifetime-pension` to consume the shared module with **zero behaviour change**.

This is deliberately a separate, self-contained plan so it can be executed and reviewed on its own, ahead of the consolidate work.

**Read first:** `AGENTS.md` (this is NOT the Next.js you know — check `node_modules/next/dist/docs/` before any Next API), the Code Quality Charter in `AGENTS.md`, `docs/guidelines/components.md`, `docs/guidelines/typography.md`.

**Charter constraints (non-negotiable):** TS strict, no `any`; theme tokens only; rem-first text sizing, unitless line-heights; Foundation components + approved Typography variants only; functions ≤ 40 lines, components ≤ 200 lines; conventional commits; **ask the designer before branching or committing.**

**Critical rule for this task:** This is a *move + re-point*, not a rewrite. The IDV UI, copy, validation, caching, and the Equifax IDMatrix mock must behave **exactly** as they do today. Lifetime-pension must look and work identically after the refactor.

---

## 1. What exists today (inventory — do not re-derive)

The IDV process currently lives inside `src/features/lifetime-pension/`. It was added in PR #46 (`feat/verify-details-idv`).

| File | What it contains | Move? |
|---|---|---|
| `idvService.ts` | `checkIDVCache()`, `setIDVCache()`, `submitIDV(document, fields)` — mock Equifax IDMatrix call (1.5 s delay, always succeeds). | **Move** to `idv/` verbatim. |
| `steps/StepIDV.tsx` | The full IDV UI: 3 document tiles (drivers licence / Medicare / passport), per-document sub-forms, Equifax IDMatrix + DVS declaration, `Submit`. Already has an `embedded?: boolean` prop (page heading vs modal use). ~392 lines. | **Move** to `idv/`. |
| `steps/StepVerifyDetails.tsx` | `VerifyDetailsContent` + `requiredFieldsFilled()` + `verifyDetailsCanContinue()`. The "confirm your name/address/DOB" gate that precedes IDV (address must be correct or verification fails). | **Move** to `idv/`. |
| `types.ts` (IDV section) | `IDVDocument`, `IDVState`, `UserProfile`, `VerifyDetailsState`. | **Move** these 4 to `idv/types.ts`; re-export or import back into lifetime-pension. |
| `constants.ts` (IDV section) | `IDV_STORAGE_KEY = 'qsuper_idv_verified'`, `IDV_CACHE_YEARS = 3`, `AUSTRALIAN_STATES`, `initialIDVState()`. Also `initialVerifyDetailsState`, `MOCK_USER_PROFILE` (lifetime-pension imports these). | **Move** IDV constants/factories to `idv/`. `MOCK_USER_PROFILE` is demo data — see §4. |
| `LifetimePensionFlow.tsx` | Holds `idvState`/`verifyDetailsState`, imports `checkIDVCache/setIDVCache/submitIDV`, renders `StepIDV`. IDV is currently triggered as a **modal on the success screen**. | **Re-point** imports only. |
| `steps/StepSuccess.tsx` | Renders the IDV `Modal` (`open`, `StepIDV ... embedded`, `onSubmit={handleIdvSubmit}` → `submitIDV` → `setIDVCache`). | **Re-point** imports only. |
| `components/Modal/index.tsx` | Modified in PR #46 (minor). | Leave as-is. |

**Current caching behaviour:** `localStorage` key `qsuper_idv_verified`, 3-year window. If a member verified within 3 years, `checkIDVCache()` returns true and IDV is skipped. This is member-level and should be **shared across all flows** — that is the whole point of reuse.

**Current trigger model (lifetime-pension):** IDV runs as a modal launched from the success screen (a "pending IDV" notice with a button opening the modal). Keep this exactly for lifetime-pension. The new reusable API must support **both** the modal pattern (lifetime-pension) and an **inline step / pre-gate** pattern (consolidate needs IDV before an action).

---

## 2. Goal & non-goals

**Goal:** A `src/features/idv/` module that any feature can use to (a) check whether the member is already verified, (b) render the Verify-Details gate and the Equifax IDV form (inline or in a modal), and (c) record a successful verification in the shared cache — with a clean, documented API.

**Non-goals:**
- No real Equifax/DVS integration — stays mocked (`submitIDV`).
- No visual redesign of the IDV screens — pixel-identical to today.
- No change to lifetime-pension's UX (IDV still a success-screen modal there).

---

## 3. Target module structure

```
src/features/idv/
  index.ts                 Barrel: public exports (the module's API surface)
  types.ts                 IDVDocument, IDVState, UserProfile, VerifyDetailsState
  constants.ts             IDV_STORAGE_KEY, IDV_CACHE_YEARS, AUSTRALIAN_STATES,
                           MEDICARE_COLOUR_OPTIONS, initialIDVState(), initialVerifyDetailsState()
  idvService.ts            checkIDVCache(), setIDVCache(), clearIDVCache(), submitIDV()
  StepIDV.tsx              (moved) the Equifax IDV form — keeps `embedded` prop
  VerifyDetailsContent.tsx (moved from StepVerifyDetails.tsx) + requiredFieldsFilled, verifyDetailsCanContinue
  useIdvGate.ts            NEW reusable hook (state machine + cache + submit)
  IdvModal.tsx             NEW thin wrapper: renders StepIDV inside a Foundation Modal
  StepIDV.stories.tsx      Story (move/author)
  VerifyDetailsContent.stories.tsx
```

> Keep `MEDICARE_COLOUR_OPTIONS` (currently inline in `StepIDV.tsx`) — you may leave it inline or lift to `constants.ts`; lifting is preferred for reuse but optional. Don't change its values.

### 3.1 New reusable API

Add a small hook so consumers don't re-implement the state/cache/submit dance.

```ts
// useIdvGate.ts
export type IdvStatus = 'verified' | 'unverified' | 'submitting' | 'error';

export interface UseIdvGate {
  status: IdvStatus;
  idvState: IDVState;
  setIdvState: (next: IDVState) => void;
  error: string;
  /** Runs submitIDV; on success caches + flips status to 'verified'. */
  submit: () => Promise<boolean>;
  /** True if checkIDVCache() passed on mount (member already verified). */
  alreadyVerified: boolean;
}

export function useIdvGate(): UseIdvGate;
```

- On mount: `alreadyVerified = checkIDVCache()`; initial `status = alreadyVerified ? 'verified' : 'unverified'`.
- `submit()`: set `submitting` → `await submitIDV(...)` → on success `setIDVCache()` + `status='verified'` + return true; on failure `status='error'`, set `error`, return false.
- Keep ≤ 40-line functions.

```tsx
// IdvModal.tsx — thin Modal wrapper around StepIDV (mirrors StepSuccess's current usage)
export interface IdvModalProps {
  open: boolean;
  onClose: () => void;
  gate: UseIdvGate;          // or the individual props if you prefer explicit wiring
  onVerified: () => void;    // called after a successful submit
}
```

These two are the only **new** building blocks. Consumers choose: inline (`<StepIDV embedded={false} .../>` as a flow step) or modal (`<IdvModal .../>`).

### 3.2 Barrel (`index.ts`) — public API
Export exactly: `StepIDV`, `VerifyDetailsContent`, `IdvModal`, `useIdvGate`, the IDV/VerifyDetails types, `checkIDVCache/setIDVCache/clearIDVCache/submitIDV`, `initialIDVState/initialVerifyDetailsState`, `AUSTRALIAN_STATES`, `requiredFieldsFilled/verifyDetailsCanContinue`. Consumers import from `@/features/idv` (or the relative path) only — never reach into internal files.

---

## 4. UserProfile / mock data decision

- `UserProfile` and `VerifyDetailsState` **types** belong to `idv/` (the Verify-Details gate owns them).
- `MOCK_USER_PROFILE` is **demo data**, not module logic. Options:
  - **Recommended:** export a generic `MOCK_USER_PROFILE` from `idv/constants.ts` (brand-neutral) so any demo flow can pass a profile. Lifetime-pension imports it from `idv/` instead of its own constants.
  - The consuming flow always *passes* the profile into `VerifyDetailsContent` via the `profile` prop, so production wiring later just swaps the data source. Keep that prop contract.

---

## 5. Caching / storage key

- Keep a **single shared key** so verification carries across flows (desired UX). Current value: `qsuper_idv_verified`.
- Decision to confirm with the designer: keep `qsuper_idv_verified` (no churn, existing carts still valid) **or** rename to brand-neutral `art_idv_verified`. **Recommended: keep as-is** for now; renaming only invalidates the local cache (harmless in prototype) but is unnecessary. Note it in the PR description either way.
- Add `clearIDVCache()` (new) for Storybook/testing and a future "verify again" affordance.

---

## 6. Build sequence

1. **Create `src/features/idv/`** and **move** (git mv where possible to preserve history): `idvService.ts`, `StepIDV.tsx`, `StepVerifyDetails.tsx` → `VerifyDetailsContent.tsx`. Move the 4 IDV types into `idv/types.ts`; move IDV constants/factories into `idv/constants.ts`.
2. **Fix internal imports** within the moved files (they referenced `../constants`, `../types`, `../../../components/*` — update relative depths). The components path changes from `../../../components/` to `../../components/` (idv is one level shallower than `lifetime-pension/steps/`). Verify every import resolves.
3. **Add** `useIdvGate.ts`, `IdvModal.tsx`, `index.ts` barrel.
4. **Re-point lifetime-pension:**
   - `LifetimePensionFlow.tsx`: import `IDVState`, `checkIDVCache/setIDVCache/submitIDV`, `StepIDV`, `initialIDVState`, `initialVerifyDetailsState`, `VerifyDetailsState`, `MOCK_USER_PROFILE` from `../idv` instead of local files.
   - `StepSuccess.tsx`: import `StepIDV` + `IDVState` from `../../idv`. (Optionally adopt `IdvModal`/`useIdvGate` to simplify — **optional**, only if behaviour stays identical; otherwise leave its hand-wired modal.)
   - `StepVerifyDetails` consumers: import `VerifyDetailsContent`, `verifyDetailsCanContinue`, `requiredFieldsFilled` from `../../idv`.
   - Delete the now-empty IDV sections from lifetime-pension `types.ts` / `constants.ts` and the moved step files. Leave a re-export shim **only** if many files import them and you want a smaller diff — otherwise update call sites directly (preferred; no shims left behind per charter "no dead code").
5. **Typecheck + lint:** resolve every reference. `npm run build` / `tsc` clean.
6. **Stories (Lisa):** move/author `StepIDV.stories.tsx` and `VerifyDetailsContent.stories.tsx` under `idv/` (or `src/stories/`), covering: no document selected, each document selected, error state, embedded vs full. One story per component minimum.
7. **Regression-test lifetime-pension manually** (see §7). Then `/simplify` the new `useIdvGate`/`IdvModal`.

---

## 7. Regression checklist — lifetime-pension must be unchanged

- [ ] Verify-Details gate renders identically (fields read-only; "No" makes them editable; validation message on empty confirm).
- [ ] Success screen shows the "pending IDV" notice and opens the IDV **modal**.
- [ ] IDV modal: document tiles select correctly; per-document sub-forms render; Submit disabled until valid; loading spinner on submit; success closes/marks verified.
- [ ] `checkIDVCache()` still skips IDV within 3 years; `setIDVCache()` writes on success.
- [ ] No visual or copy diffs (Equifax IDMatrix + DVS declaration text unchanged).
- [ ] No console errors; `tsc`/lint clean; Storybook a11y addon clean on moved stories.

---

## 8. Definition of done
- [ ] `src/features/idv/` is the single source of IDV; no IDV logic remains in `lifetime-pension` except its own state wiring and imports from `../idv`.
- [ ] No duplication (Moe's charter). **Moe must sign off the new module's structure/API** (it's a new shared module — structural approval required).
- [ ] `useIdvGate` + `IdvModal` documented in the barrel and a story.
- [ ] Charter checklist (TS strict, tokens, rem-first, sizes, Foundation components, Typography variants) all pass — Chalmers.
- [ ] A11y unchanged/clean — Flanders. Visual parity — Marge. Stories — Lisa. Status/promotion — Willie.
- [ ] Designer approves branch + merge; no new dependencies.

## 9. Risks / notes
- This touches a recently-merged feature. Keep the diff a faithful move; review with `git diff -M` (rename detection) to confirm content is unchanged where it should be.
- If `StepSuccess` adoption of `IdvModal`/`useIdvGate` risks any behaviour drift, **skip it** — only re-point imports. The reusable hook/modal are there primarily for *new* consumers (consolidate).
- The consolidate plan (`consolidate-super-plan.md`) assumes this module exists at `src/features/idv/` with the API in §3. If you change export names, update that plan's §IDV section accordingly.
```
