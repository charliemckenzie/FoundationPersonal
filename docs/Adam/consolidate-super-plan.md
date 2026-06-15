# Plan — Consolidate Your Super (3 flows + IDV-gated ATO search)

**Status:** Ready to execute — fresh-context build
**Owner:** Adam (designer-supervised)
**Target model:** Sonnet, fresh session
**Feature area:** `src/features/consolidate/` + routes under both brand trees
**Reference feature (read first):** `src/features/investment-mix/`
**Prerequisite:** `docs/Adam/idv-shared-module-plan.md` must be executed first — this plan consumes `src/features/idv/`.

---

## 0. How to use this document

You are a fresh agent with no prior context. This document contains everything you need to build the feature without re-deriving the codebase. Read sections 1–6 fully before writing any code. Sections 7–11 are the build. Section 12 is your definition of done.

**Golden rule (from `AGENTS.md`):** This is NOT the Next.js you know. Before using any Next.js API, read the relevant guide in `node_modules/next/dist/docs/`. Heed deprecation notices.

**Hard constraints (Code Quality Charter — non-negotiable):**
- TypeScript strict — no `any`, no implicit types. Props typed with interfaces.
- MUI theme tokens only — zero hardcoded colours, spacing, shadows.
- Rem-first sizing for anything containing text; unitless line-heights; px only for borders/outlines/shadows.
- Foundation components (`src/components/`) only — never raw MUI/custom HTML when a Foundation component exists. See `docs/guidelines/components.md`.
- Typography: only approved variants (`docs/guidelines/typography.md`). Never bare `<Typography>`; `body1`/`body2`/`subtitle*`/`button`/`overline` are banned and fail lint.
- Functions ≤ 40 lines; components ≤ 200 lines.
- Conventional commits. **Do not branch or commit without asking the designer** (Frink's rule).

---

## 1. What we are building

A **Consolidate your super** experience for the authenticated Member Online portal. The member is logged in, so we already hold their personal details (name, DOB, address, contact, client number). The placeholder route exists today and renders only a heading + lead:

- `src/app/member-online/(portal)/consolidate/page.tsx`
- `src/app/qsuper/member-online/(portal)/consolidate/page.tsx`

Turn `/consolidate` into a **hub** offering three ways to bring external super into the member's Accumulation account, each launching its own stepped sub-flow:

1. **ATO SuperMatch** — fund searches the ATO on the member's behalf and returns super held elsewhere (incl. ATO-held money). **Requires completed online identity verification (Equifax IDV) before the search runs.** Member selects accounts and rolls them in.
2. **User-led (manual)** — member knows where their super is and enters fund details manually (modelled on the QSuper **FO28 "Consolidate With QSuper"** form, `fo28.pdf`).
3. **SMSF** — a guided readiness checklist that gates on the member having prepared their SMSF for rollover (assets liquidated to cash, ESA obtained, details verifiable), then captures SMSF rollover details and submits.

### Design decisions already made (do not re-litigate)

| Decision | Choice |
|---|---|
| Backend realism | **Mock / simulated only.** Mirror `investment-mix`/`beneficiaries`: client-side state, `mockData.ts`, sessionStorage context, simulated async. No real server actions. |
| Brand scope | **Both** `member-online` (ART/Foundation) and `qsuper`. Feature logic is brand-agnostic in `src/features/consolidate/`; each brand route is a thin wrapper passing its own `basePath`. |
| Entry model | **Hub with 3 choices.** `/consolidate` becomes intro + 3 decision rows; each launches a self-contained stepped sub-flow. |
| SMSF depth | **Readiness checklist + ESA capture.** Guided eligibility/readiness gate; if not ready, show "what to do next" and block; if ready, capture details (ESA mandatory) + submit. |
| IDV | **Reuse the shared `src/features/idv/` module** (built by the IDV plan, run first). The ATO flow gates on IDV. Do **not** re-implement IDV here. |

---

## 2. Reference files — read before building

| Purpose | File | What to learn |
|---|---|---|
| Stepped flow shell | `src/features/investment-mix/InvestmentMixFlow.tsx` | `FormProgress`+`StepTransition`+`StepperActions`; dynamic `steps` array; `handleNext`/`handleBack`; error `Alert` **directly above** `StepperActions`; `SubmissionSuccess` swap; history wiring. |
| Simpler state-stepped flow | `src/features/beneficiaries/NominationFlow.tsx` | Minimal 3-step flow with `advance`/`maxStep` — template for the simpler flows here. |
| Context provider | `src/features/beneficiaries/BeneficiariesContext.tsx` | sessionStorage provider; `save*`/`clear*`; `useX()` hook. |
| Provider-mounting layout | `src/app/member-online/(portal)/beneficiaries/layout.tsx` | `'use client'` layout wrapping children in the provider. |
| Flow-mounting page | `src/app/member-online/(portal)/beneficiaries/new/page.tsx` | One-line page rendering a flow with an `overviewPath` prop. |
| Types + option consts | `src/features/investment-mix/types.ts` | Exported `interface`/`type`; `*_OPTIONS` arrays (`value`/`label`/`description`) for `RadioGroup`/`Select`. |
| Mock data | `src/features/investment-mix/mockData.ts` | Mock account/option shapes. |
| Validation/format utils | `src/features/investment-mix/utils.ts` | `validateStepN`, `buildChange`, `formatCurrency`, `formatDate`. |
| Success screen | `src/features/investment-mix/SubmissionSuccess.tsx` | Reference number + summary + back-to-overview CTA. |
| **Shared IDV module** | `src/features/idv/` (from the IDV plan) | `useIdvGate()`, `StepIDV` (`embedded`), `IdvModal`, `checkIDVCache/setIDVCache`, `VerifyDetailsContent`, types. **Import from the barrel only.** |

Catalogue: `docs/guidelines/components.md`. Typography: `docs/guidelines/typography.md`.

---

## 3. Domain primer (grounded — for accurate copy; never present as advice)

### 3.1 ATO SuperMatch
- SuperMatch is an **ATO service funds call** (not individuals, not SMSFs) to obtain a list of an individual's active accounts, lost member accounts, and ATO-held money, via the member's TFN.
- **Not a consolidation service** — it returns info; the member decides what to roll in.
- The fund must obtain the member's **explicit consent** before searching.
- **Identity must be verified** before the fund queries the ATO on the member's behalf — hence the Equifax IDV gate in this flow.
- Prototype: IDV gate → consent → simulate search (fake delay) → mock found-funds → member selects → confirm/submit.

### 3.2 User-led (manual) — from FO28
Per external fund (we already hold personal details, so capture only fund + amount):
- Fund name; **ABN**; **USI** (N/A for SMSF); fund phone; **your member/account number**; amount = **full balance** OR **partial** (`MoneyField`).
- Supports **multiple funds** (FO28 lists up to 4) — use an add-more repeater.
- Declaration/authorisation checkbox before submit (paraphrase FO28 §3, don't dump legalese).
- Transfers invested per the member's **current investment strategy** (state it; don't ask).

### 3.3 SMSF rollover
- Rolling **out of an SMSF into an APRA fund** (ART) goes via **SuperStream (Rollover v3)**.
- SMSF needs a rollover-capable **ESA**, valid **ABN**, and **bank details** recorded + verifiable with the ATO (receiving fund verifies SMSF details).
- Assets generally must be **sold to cash** in the SMSF before the cash can roll out — ART can't do this; the flow confirms it's done.
- Full-balance rollover → **wind-up** considerations (surface as a consideration, not advice).
- ESA **mandatory** for SMSF; USI **N/A**.

> All ATO specifics summarised from ATO/industry guidance current June 2026. Never present as advice in-product. Confirm external link targets with the designer before finalising.

---

## 4. Information architecture & routes

Hub + three sub-flows. Sub-flows are **state-stepped within a single route** (like `beneficiaries/new`), so `StepTransition` applies between steps and per-step `PageTransition` isn't needed.

```
/consolidate                      → Hub (intro + 3 decision rows)        [replace placeholder]
/consolidate/ato-supermatch       → ATO SuperMatch flow (IDV-gated)       [new]
/consolidate/manual               → User-led manual flow                  [new]
/consolidate/smsf                 → SMSF readiness + rollover flow         [new]
```

Mirror all four under **both** brand trees:
- `src/app/member-online/(portal)/consolidate/...`  → `basePath = '/member-online/consolidate'`
- `src/app/qsuper/member-online/(portal)/consolidate/...` → `basePath = '/qsuper/member-online/consolidate'`

A `'use client'` `layout.tsx` at each brand's `consolidate/` mounts `ConsolidateProvider` so flow state + success summary survive hub↔sub-flow navigation.

---

## 5. File manifest

### Feature (brand-agnostic) — `src/features/consolidate/`
```
types.ts                       Shared types + *_OPTIONS constants
mockData.ts                    Mock found-funds (ATO), member target account, empty fixture
utils.ts                       validators, formatCurrency/formatDate, buildSubmission, reference number
ConsolidateContext.tsx         sessionStorage provider; saveRollover/clearRollover; useConsolidate()
ConsolidateHub.tsx             Hub: intro + 3 LinkRow decision rows (takes basePath)
SubmissionSuccess.tsx          Shared success screen

AtoSuperMatchFlow.tsx          Flow 1 shell (IDV-gated)
manual/ManualConsolidateFlow.tsx
smsf/SmsfConsolidateFlow.tsx

steps/
  AtoStep0Identity.tsx         IDV gate (consumes src/features/idv)  — see §7.1
  AtoStep1Consent.tsx          SuperMatch consent
  AtoStep2Results.tsx          Simulated search + selectable results
  AtoStep3Review.tsx           Review selected + declaration + submit

  ManualStep0BeforeYouStart.tsx
  ManualStep1Funds.tsx         Fund repeater
  ManualStep2Review.tsx

  SmsfStep0Intro.tsx
  SmsfStep1Readiness.tsx       Readiness gate
  SmsfStep1NotReady.tsx        Inline "what to do next" when incomplete
  SmsfStep2Details.tsx         ESA mandatory
  SmsfStep3Review.tsx

components/
  FundDetailFields.tsx         Reusable per-fund field group (Manual + SMSF)
  AmountChoice.tsx             Full vs partial radio + conditional MoneyField
  FoundFundRow.tsx             One ATO result row (Checkbox card variant)
```

### Routes — per brand (×2)
```
(portal)/consolidate/layout.tsx               'use client' → <ConsolidateProvider>
(portal)/consolidate/page.tsx                 → <ConsolidateHub basePath=… />   (replace placeholder)
(portal)/consolidate/ato-supermatch/page.tsx  → <AtoSuperMatchFlow basePath=… />
(portal)/consolidate/manual/page.tsx          → <ManualConsolidateFlow basePath=… />
(portal)/consolidate/smsf/page.tsx            → <SmsfConsolidateFlow basePath=… />
```

> Keep every component ≤ 200 lines: push step UI into `steps/*`, field groups into `components/*`, option arrays/copy into `types.ts`/module constants.

---

## 6. Shared types (`src/features/consolidate/types.ts`)

```ts
export type ConsolidateMethod = 'ato' | 'manual' | 'smsf';

export type TransferAmountType = 'full' | 'partial';
export interface TransferAmount { type: TransferAmountType; amount?: number; } // amount only when 'partial'

export interface ExternalFund {
  id: string; fundName: string; abn: string; usi: string; esa: string;
  fundPhone: string; memberNumber: string; amount: TransferAmount;
}

export interface FoundFund {
  id: string; fundName: string; accountNumber: string; // masked e.g. '••• ••• 4821'
  balance: number; isAtoHeld?: boolean; insuranceFlag?: boolean; selected: boolean;
}

export interface SmsfReadiness {
  assetsLiquidated: boolean; esaConfirmed: boolean;
  detailsVerifiable: boolean; windUpUnderstood: boolean;
}

export interface SmsfDetails {
  smsfName: string; abn: string; esa: string; // mandatory
  bankVerified: boolean; amount: TransferAmount;
}

export interface ConsolidateSubmission {
  method: ConsolidateMethod;
  funds?: ExternalFund[]; selectedFunds?: FoundFund[]; smsf?: SmsfDetails;
  referenceNumber: string; submittedAt: string;
}
```
Plus option constants (`AMOUNT_OPTIONS`, `SMSF_READINESS_ITEMS`, …) in the `value/label/description` shape used elsewhere.

---

## 7. Flow specifications

All flows: `ContentContainer size="md"`; `MOBreadcrumb` (back to hub) at top; `FormProgress variant="simple"`; `StepTransition` keyed on step index; validation `Alert severity="error"` **immediately above** `StepperActions`; clear error on advance/back. Mirror `InvestmentMixFlow.tsx`. Submit → `saveRollover(...)` → swap to `SubmissionSuccess`.

### 7.0 Hub — `ConsolidateHub.tsx`
- `h1` "Consolidate your super" + `lead` (reuse existing placeholder copy).
- Three `LinkRow` (decision-row pattern: icon + label + description + chevron, `href={`${basePath}/<flow>`}`):
  1. **Find my super (ATO SuperMatch)** — "We'll verify your identity, then search the ATO for super held in your name." icon `magnifying-glass-dollar`.
  2. **I know my fund details (Enter manually)** — "Enter your other fund's details and we'll arrange the transfer." icon `pen-to-square`.
  3. **Self-managed super fund (SMSF)** — "Roll money from your SMSF. We'll check you're ready first." icon `building-columns`.
- Optional `Alert severity="info"`: consolidating may affect insurance/benefits at the other fund (factual, not advice).

### 7.1 ATO SuperMatch — `AtoSuperMatchFlow.tsx`  (IDV-gated)
Steps: `['identity', 'consent', 'results', 'review']`. **`identity` may auto-skip** when already verified.

**Step 0 — Identity (`AtoStep0Identity.tsx`)** — consumes `src/features/idv`:
- On flow mount, call `useIdvGate()`. If `alreadyVerified` (cache hit via `checkIDVCache()`), **skip this step** (start at `consent`) — build the `steps` array conditionally, exactly like investment-mix drops conditional steps.
- If not verified, render the IDV inline as the first step: optionally `VerifyDetailsContent` (confirm name/address — address correctness affects IDV) followed by `StepIDV embedded={false}` driven by the gate's `idvState`/`setIdvState`/`error`. On the step's primary action, call `gate.submit()`; on success (`setIDVCache()` happens inside the hook) advance to `consent`. On failure, show the gate `error`.
- Copy: explain we must verify identity before searching the ATO. Reuse the module's Equifax IDMatrix + DVS declaration verbatim — do not rewrite it.

**Step 1 — Consent (`AtoStep1Consent.tsx`)**
- Explain SuperMatch (uses TFN to find active + lost + ATO-held super). Required consent `Checkbox` (card/boxed): "I consent to [Fund] searching the ATO for super held in my name using my Tax File Number." Must be checked to continue.

**Step 2 — Results (`AtoStep2Results.tsx`)**
- On entering, run a **simulated search**: `Spinner` ("Searching the ATO for your super") ~1.5 s via `setTimeout`, then reveal `mockData` results.
- Empty branch: friendly empty state (`HeroIcon` + message + back-to-hub). Provide a mock fixture toggle so this state is reviewable.
- Results: list of `FoundFundRow` (Checkbox `card` variant) — fund name, masked account number, `formatCurrency(balance)`, badges for ATO-held / possible insurance. Select ≥1 to continue. Inline caution where `insuranceFlag`.

**Step 3 — Review (`AtoStep3Review.tsx`)**
- Selected funds + total; declaration `Checkbox`; note funds invested per current strategy. Submit → `ConsolidateSubmission{ method:'ato', selectedFunds }` → success.

### 7.2 User-led manual — `ManualConsolidateFlow.tsx`
Steps: `['before-you-start', 'funds', 'review']`.

**Step 0 (`ManualStep0BeforeYouStart.tsx`)** — FO28 guidance (redirect future contributions; closing a fund may end insurance/benefits; consider tax) via `IconList`/`Alert`. Optional required acknowledgement checkbox (mirror investment-mix `Step0BeforeYouStart` + `introReviewed` gating).

**Step 1 (`ManualStep1Funds.tsx`)** — repeater of `FundDetailFields` (modelled on `ExpandableCardList`/`BeneficiaryRepeater`); start with one; "Add another fund" appends; each removable (min 1). Per fund: `TextField` name, ABN, USI (helper "N/A for SMSF"), fund phone (`type="tel"`), member number; `AmountChoice`. No ESA here (manual = APRA fund). Validate: name + member number + chosen amount per fund; partial requires positive amount. Field-level errors in place; summary `Alert` above actions on Next.

**Step 2 (`ManualStep2Review.tsx`)** — `DescriptionList` per fund; declaration; submit → `{ method:'manual', funds }` → success.

### 7.3 SMSF — `SmsfConsolidateFlow.tsx`
Steps: `['intro', 'readiness', 'details', 'review']`. **Readiness is a gate.**

**Step 0 (`SmsfStep0Intro.tsx`)** — explain (no advice): SMSF rollovers go via SuperStream; you generally need assets in cash first; we can't sell assets for you; we confirm readiness then arrange the rollover.

**Step 1 (`SmsfStep1Readiness.tsx` + `SmsfStep1NotReady.tsx`)** — four required confirmations → `SmsfReadiness`:
- "I've sold my SMSF's assets to cash (or will roll cash only)."
- "My SMSF has an ESA that supports rollovers."
- "My SMSF's ABN and bank details are current with the ATO."
- "If rolling my full balance, I understand this may mean winding up my SMSF."
- **Gate:** Next allowed only when all true. If any unchecked on Next, render `SmsfStep1NotReady` inline ("what to do next" — `IconList`/`Alert` + a designer-confirmed external resource link) and stay on the step.

**Step 2 (`SmsfStep2Details.tsx`)** — `FundDetailFields` configured for SMSF: SMSF name, ABN, **ESA (required)**, hide USI, `bankVerified` attestation checkbox, `AmountChoice`. ESA: required/non-empty, light format hint only.

**Step 3 (`SmsfStep3Review.tsx`)** — `DescriptionList` of SMSF details + amount; declaration; submit → `{ method:'smsf', smsf }` → success.

---

## 8. Context provider (`ConsolidateContext.tsx`)
Copy `BeneficiariesContext.tsx` in shape: `STORAGE_KEY = 'consolidate_submission'`; value `{ submission; saveRollover(s); clearRollover() }`; lazy read from sessionStorage; `useConsolidate()` hook. Mounted by each brand's `consolidate/layout.tsx`.

## 9. Mock data (`mockData.ts`)
- `MOCK_FOUND_FUNDS: FoundFund[]` — 2–3 realistic accounts incl. one ATO-held and one with `insuranceFlag`; export an empty fixture for the empty state.
- `MOCK_TARGET_ACCOUNT` — member's Accumulation account (name + masked number) shown as destination on reviews.
- Port `formatCurrency`/`formatDate` from `investment-mix/utils.ts` into `consolidate/utils.ts` (same impl). `generateReferenceNumber()` — same approach.

---

## 10. IDV integration contract (depends on `src/features/idv/`)
Import only from the `idv` barrel:
```ts
import { useIdvGate, StepIDV, VerifyDetailsContent, checkIDVCache } from '@/features/idv';
```
- The ATO flow's `identity` step is **conditional** on `!checkIDVCache()` at mount (build it into the dynamic `steps` array; skip when already verified — same pattern as investment-mix conditional steps).
- Submission of IDV is handled by `useIdvGate().submit()` (caches on success). The consolidate flow does **not** touch `localStorage` directly.
- If the IDV plan changed any export names, reconcile here. Do not re-implement IDV.

---

## 11. Build sequence

1. **Confirm prerequisite:** `src/features/idv/` exists with the API in `idv-shared-module-plan.md` §3. If not, stop and run that plan first.
2. **Scaffold** `types.ts`, `mockData.ts`, `utils.ts`, `ConsolidateContext.tsx`. Compile clean.
3. **Brand routes + layout + hub** (both brands): `layout.tsx` (provider), replace `page.tsx` with `<ConsolidateHub basePath=… />`, build `ConsolidateHub.tsx`. Verify navigation (sub-flow pages can be stubs first).
4. **Shared blocks:** `components/FundDetailFields.tsx`, `AmountChoice.tsx`, `FoundFundRow.tsx`, `SubmissionSuccess.tsx`.
5. **Manual flow** end-to-end → success. Wire both brand `manual/page.tsx`.
6. **ATO flow** incl. IDV gate (conditional step), simulated search, empty state → success. Wire both `ato-supermatch/page.tsx`. Test both: already-verified (cache hit → IDV skipped) and unverified (IDV shown).
7. **SMSF flow** incl. readiness gate + not-ready panel → success. Wire both `smsf/page.tsx`.
8. **Polish:** error placement above `StepperActions`, `StepTransition` keys, breadcrumb labels, copy review.
9. **Stories (Lisa):** `ConsolidateHub`, each flow shell (mock context), `FundDetailFields`, `AmountChoice`, `FoundFundRow`, `SubmissionSuccess`. Cover default + edge (empty ATO results, SMSF not-ready, partial amount, IDV-already-verified path).
10. **Self-review:** run `/simplify` on new code.

> Sanity-run and click through after each flow. Avoid Playwright unless a layout bug genuinely needs visual confirmation (project preference).

---

## 12. Definition of done

**Code (Chalmers):** TS strict, no `any`; explicit prop interfaces; tokens only; rem-first text + unitless line-heights + px only for borders/outlines/shadows; Foundation components + approved Typography variants only; no bare `<Typography>`; functions ≤ 40 / components ≤ 200 lines; no dead code/untracked TODOs.

**A11y (Flanders):** semantic HTML; keyboard nav; visible focus; required consents/checkbox groups labelled via `label` prop; Storybook a11y addon clean; error `Alert` announced, not colour-only.

**Visual (Marge):** tokens/spacing consistent with `investment-mix`/`beneficiaries`.

**Docs (Lisa):** stories written; hub + flows documented.

**Structure/API (Moe):** no duplicate components; `FundDetailFields`/`AmountChoice`/`FoundFundRow` are the only new feature-local components — confirm none should be promoted to `src/components/`. **IDV is reused, not re-created.** Any new shared component needs Moe's sign-off before building.

**Supervision (designer):** branch, any new dependency, and merge require designer approval. Expect **no new dependencies** — flag immediately otherwise.

---

## 13. Assumptions & open questions (surface to designer)
1. **IDV prerequisite** — this plan assumes `src/features/idv/` is built and merged first.
2. **External link targets** (ATO resources, `/advice`) — confirm before finalising copy.
3. **Insurance/benefit warnings** — wording reviewed; factual, never advice.
4. **Destination account** — assumed single Accumulation account; add a selector only if a member can have several (out of scope unless confirmed).
5. **Promotion of `FundDetailFields`/`AmountChoice`** to the shared library — Moe to decide; feature-local for now.
6. **Hub component** — assumes `LinkRow`; confirm with Marge/Milhouse if a richer card is wanted.
7. **Does manual/SMSF also need IDV?** Plan currently gates **only ATO** (the ATO query is what legally needs verified identity). Confirm whether manual/SMSF rollovers should also require IDV before submit — if yes, reuse the same `useIdvGate` as a pre-submit modal (`IdvModal`).

---

## 14. Pipeline note
Net-new UI across three flows + IDV reuse. Per `AGENTS.md`: Smithers → (optional Milhouse design pass) → Moe approves structure (esp. the 3 new feature-local components + confirming IDV reuse) → Lenny builds → Chalmers → Flanders → Marge → Lisa → Willie → Frink → designer merge. If executing solo, still satisfy every gate's checklist in §12, and **ask the designer before branching or committing.**
```
