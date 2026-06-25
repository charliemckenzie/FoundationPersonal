# Plan: Establish "Features" as a first-class concept (pattern + Storybook + app wiring)

> **This document is self-contained** — paths, rationale, and verification are included so it
> can be implemented from a fresh context window with no prior conversation.

---

## Context — why we're doing this

The codebase has grown a second kind of reusable unit that isn't a **component**. Two
exist today and **many more are coming**:

- **Investment Mix** (`src/features/investment-mix/`) — a multi-step investment flow.
- **Eligibility Checker** (`src/features/eligibility-checker/`) — a config-driven pre-gate.

These are **features**, not components. A component is drop-anywhere and controlled (takes
`value`/`state` + `onChange`, owns nothing about the app around it). A feature **owns
orchestration** — step navigation, routing (`useSearchParams`, `history`), persistence — and
is reused by passing **props/config** that express per-consumer variations.

Investment Mix is already reused in **three** places, which proves the pattern and the need:

| Consumer | File |
|---|---|
| ART standalone switch | `src/app/member-online/(portal)/investments/manage-investments/change-mix/page.tsx` |
| QSuper standalone switch | `src/app/qsuper/member-online/(portal)/investments/manage-investments/change-mix/page.tsx` |
| Embedded in RIA new-account | `src/features/retirement-income-account/RetirementIncomeAccountFlow.tsx` (step `investment-mix`) |

**The problems this solves:**

1. **No shared definition of "feature."** The team needs a written rule for what a feature
   is, how it differs from a component, and how to document it — so future features are
   built and documented consistently.
2. **No home to show a feature's UX + its variants.** We document components in Storybook;
   we need the same for features — render the live flow, one story per variant, so the UX
   impact of each variation is *shown*, not described.
3. **Investment Mix isn't a cleanly encapsulated feature yet.** It leaks its result through
   `sessionStorage` (`InvestmentMixContext`) instead of returning it to its host, and RIA
   carries three **dead duplicate** step files that can silently drift. These must be fixed
   so "edit once, reused everywhere" actually holds.

**Intended outcome:** a documented Components-vs-Features pattern, a Storybook `Features/`
section with Investment Mix as the exemplar (explainer + live variant stories + reference
MDX), and Investment Mix tightened into a properly encapsulated feature in the app.

---

## Decisions (settled)

- **One Storybook**, not two. Add a first-class top-level `Features/` section + a
  "Components vs Features" explainer. A second Storybook is premature overhead (separate
  config/build/port/CI/Chromatic/hosting) for 2 feature stories. Keep the structure
  split-ready (consistent `Features/` namespace, co-located stories). **Revisit a split**
  when Features grows heavy (rule of thumb: ~8–10 features, or Storybook build/CI time
  becomes painful).
- **Feature = owns flow/routing/state; reused via props.** **Component = drop-anywhere,
  controlled, no app concerns.** Domain complexity does NOT promote a component to a feature
  (IDV and Bank details stay components).
- **Variations are props on the single entry component — never a forked copy.**
- **A feature is documented like a component, one tier up:** public API (props = variants),
  variants shown as stories, plus a data contract (inputs → `onComplete` output) and
  where-used. Catalogue facts (composition / where-used) come from the codemap, not by hand.

---

## Part A — Document the pattern in Storybook (the core ask)

### A1. "Components vs Features" explainer
- **New file:** `src/stories/foundation/ComponentsVsFeatures.mdx` (sits beside the existing
  Foundation getting-started docs — `src/stories/foundation/` already holds
  "What is Foundation?", "How do I use a component?", etc.).
- **Title:** `Foundation / Components vs Features` (top-level `Foundation` or `Getting Started`
  namespace — match whatever the existing foundation docs use).
- **Content (use the definitions in this plan):**
  - The one-question test: *"Can you drop it anywhere with just props, owning nothing about
    the app around it?"* Yes → component. No (owns flow/routing/state) → feature.
  - A two-row table: Component vs Feature — home, what it documents, examples.
  - Examples table: IDV / Bank details / allocation step = components; Investment Mix /
    Eligibility Checker = features.
  - "How a feature is documented" — points to the feature-doc template (A2).

### A2. Feature-doc template (the reusable shape every future feature follows)
- **New file:** `src/stories/features/_TEMPLATE.mdx` (underscore keeps it sorting first;
  title `Features / _Template`). It documents the required sections so Lisa/Moe stamp out
  consistent feature docs:
  1. **What & when** — the journey it owns; when to use it.
  2. **Public API** — props table; the props ARE the variation surface.
  3. **Variants / modes** — matrix + embedded live stories (one per variant).
  4. **Data contract** — inputs (props + URL params) → output (`onComplete` payload).
  5. **Constraints** — conditional steps, domain rules, "requires a router."
  6. **Composition / where-used** — link to codemap; do not hand-maintain.

---

## Part B — Document Investment Mix as the first exemplar feature

### B1. Variant stories (show the UX)
- **New file:** `src/stories/features/investment-mix/InvestmentMixFlow.stories.tsx`
- **Title:** `Features / Investment Mix`. `component: InvestmentMixFlow`.
- **Pattern:** mirror the Eligibility Checker story
  (`src/stories/features/eligibility-checker/EligibilityChecker.stories.tsx`) — a small
  `Harness` wrapper, one exported story per variant, each rendering the **live interactive
  flow** with that variant's props. Viewer clicks through to experience it; switches stories
  to compare variants.
- **Stories (one per variant / consumer):**
  - `Standalone` — `overviewPath`, `accountFilter="all"`, full intro + review (ART default).
  - `StandaloneQSuper` — adds `brandName="QSuper"` to show the brand variation.
  - `EmbeddedInNewAccount` — `embedded skipIntro accountFilter="income"` +
    `onComplete`/`onBack` stubs (the RIA configuration).
  - `AccumulationAccount` — `accountFilter="accum"` to show Lifecycle included.
- **Storybook technical setup (important — this flow touches the router):**
  - Wrap each story in `InvestmentMixProvider`
    (`src/features/investment-mix/InvestmentMixContext.tsx`).
  - The flow reads `useSearchParams()` and calls `history.pushState`. Set
    `parameters.nextjs.navigation` (query params) per story so deep-link variants render.
    `@storybook/nextjs-vite` mocks the router; confirm the exact param shape during the spike.
  - **Spike first** (~30 min): mount one story, confirm the router mock + provider render the
    flow without errors before authoring all variants.

### B2. Reference MDX
- **New file:** `src/stories/features/investment-mix/InvestmentMix.mdx`
- **Title:** `Features / Investment Mix` (Docs page alongside the stories).
- Fill the A2 template for Investment Mix:
  - **Public API** from `InvestmentMixFlowProps` (`overviewPath`, `brandName`,
    `accountFilter`, `onComplete`, `embedded`, `skipIntro`, `onBack`).
  - **Variants matrix** embedding the B1 stories with one line each on the UX difference.
  - **Data contract**: inputs (props + `?account` / `?applyTo` / `?step` URL params) →
    output (`InvestmentMixChange` via `onComplete`, or success screen when standalone).
  - **Constraints**: conditional rebalance/payment steps; Lifecycle excluded for income
    accounts; requires a router.
  - **Where-used**: the three consumers above (link to codemap once features are registered).

### B3. (Optional, validates the template) Bring Eligibility Checker up to standard
- Its story today only renders `lifetimePensionConfig`. Add a **RIA variant** using
  `retirementIncomeAccountConfig` (`src/features/eligibility-checker/configs/`) and a short
  `EligibilityChecker.mdx` following the A2 template. This proves the template works on a
  second feature. Defer if time-boxed.

---

## Part C — Make Investment Mix a properly encapsulated feature in the app

> This is the "set it up properly in the app" half. Do C1/C2 so the Storybook docs describe
> a clean contract rather than enshrining the current leak. **Gate with Chalmers** (and Moe
> for the structural call) before deleting anything.

### C1. Close the data-contract seam (embedded mode returns its result)
- **Problem:** when embedded in RIA, `InvestmentMixFlow.onComplete` only calls `advance()`
  (`RetirementIncomeAccountFlow.tsx:367`). The real allocations are written to `sessionStorage`
  via `InvestmentMixContext`, but RIA's review reads `state.investmentMix` / `state.drawdown`
  (`src/features/retirement-income-account/steps/StepReview.tsx`) — a **different store**.
- **Fix:** in RIA's embed, use `onComplete(change)` to write the returned `InvestmentMixChange`
  into RIA state (`state.investmentMix` + `state.drawdown`), and have `StepReview` render
  that. Embedded mode should not depend on the `sessionStorage` side-channel.
- **Files:** `RetirementIncomeAccountFlow.tsx` (the `investment-mix` step branch),
  `steps/StepReview.tsx`, possibly `types.ts` to align the mix/drawdown shape with
  `InvestmentMixChange` (`src/features/investment-mix/types.ts`).

### C2. Remove the dead duplicate step files (kill the drift risk)
- **Confirmed dead** (not rendered by `RetirementIncomeAccountFlow.tsx`; `investment-drawdown`
  is in `CONDITIONAL_STEPS` but never in `STEP_KEYS`):
  - `src/features/retirement-income-account/steps/StepInvestmentMix.tsx`
  - `src/features/retirement-income-account/steps/StepInvestmentDrawdown.tsx`
  - `src/features/retirement-income-account/steps/StepOption.tsx` (copied from Lifetime Pension)
- **One live coupling to fix first:** `StepReview.tsx:16` imports `MOCK_INVESTMENT_OPTIONS`
  *through* `StepInvestmentMix`. Repoint it to source — `../investment-mix/mockData` or
  `RIA_INVESTMENT_OPTIONS` from `../constants` — then delete the three files.
- **Verify dead before deleting:** have **Chalmers** confirm zero remaining imports/renders
  (grep each symbol across `src/`), then remove.

### C3. (Follow-up, not blocking) Register features in the codemap
- So `Features/` where-used + composition auto-track like components. This is a
  codemap-generator change owned by **Moe/Frink** (`npm run generate-codemap`,
  `src/stories/component-status.ts`). Until then, the MDX where-used list is hand-written and
  marked as such. Track as a follow-up ticket — do not block Parts A/B on it.

---

## Ownership / pipeline

- **Moe** — owns the component-vs-feature boundary (Part A definitions) and the structural
  call on C1/C2. Should sign off the A1/A2 wording.
- **Lisa** — writes the MDX (A1, A2, B2, B3) and story prose in her house style.
- **Lenny** — authors the variant stories (B1) and implements the C1 app change.
- **Chalmers** — verifies C2 files are dead before deletion; quality-gates C1.
- **Marge / Flanders** — light pass; mostly docs + a contained state change, but the RIA
  review change touches a member-facing screen.

---

## Verification

1. **Storybook builds & renders:** `npm run storybook` (port 6006). Confirm:
   - `Foundation / Components vs Features` explainer renders.
   - `Features / Investment Mix` shows all variant stories; each renders the live flow and is
     clickable through its steps. Switching stories visibly changes the UX (intro present/
     absent, account options, brand name).
   - `Features / _Template` and `Features / Investment Mix` Docs pages render (remark-gfm
     tables intact).
2. **Build doesn't break:** `npm run build-storybook` succeeds (catches MDX/story errors).
3. **App still works end-to-end** (the C1/C2 change):
   - RIA new-account flow → investment-mix step → complete it → **review screen shows the
     allocations the member just chose** (proves `onComplete` write-back, not the stale
     `state.investmentMix`).
   - ART and QSuper standalone change-mix flows still submit and show the success screen.
4. **No dead-code regressions:** `grep -r "StepInvestmentMix\|StepInvestmentDrawdown\|StepOption"
   src/` returns nothing after C2 (except, intentionally, Lifetime Pension's own `StepOption`).
5. **Type + lint:** `npm run lint` and `tsc` clean (typecheck per project scripts).
6. **Sign-off block:** if any component/feature status changes, update the PR
   **Foundation sign-off** block and run `npm run check:signoff`.

---

## Suggested execution order

1. **A1 + A2** — pattern docs (fast, unblocks the concept).
2. **B1 spike** — prove the router-mock + provider render one story.
3. **C1 + C2** — encapsulate the feature in the app (so docs describe a clean contract).
4. **B1 + B2** — full variant stories + reference MDX.
5. **B3** — Eligibility Checker template validation (optional).
6. **C3** — codemap registration (follow-up ticket).
