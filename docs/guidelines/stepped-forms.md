# Stepped forms — guideline

> This doc covers the conventions, components, and implementation rules for multi-step application forms in Foundation. It covers layout, navigation, scroll behaviour, validation, draft persistence, and accessibility.

---

## Components

A stepped form is assembled from three core components. All three should be present.

| Component | Role |
|---|---|
| `FormProgress` | Progress indicator — shows current step and allows jumping back to visited steps |
| `StepTransition` | Animated content swap between steps — handles slide/fade and height |
| `StepperActions` | Back / Next / Submit / Exit action bar at the bottom of each step |

---

## The `useSteppedFlow` hook

The shared engine for all multi-step application flows (Lifetime Pension, Retirement Income Account). Do not hand-roll step state in a new flow — use this hook.

```ts
const flow = useSteppedFlow<MyState>({
  initialState: INITIAL_STATE,
  loadDraft,
  saveDraft,
  deleteDraft,
});
```

It owns:
- `state` / `activeStep` — the form state and current step index
- `advance(step)` / `back()` / `editStep(step)` — step navigation
- `showValidation` — toggled on failed Next attempts, cleared on navigation
- Debounced draft autosave (skipping step 0) and submit cleanup
- The resume dialog handshake (`pendingResume` / `acceptResume` / `discardResume`)

**Flow-specific logic** — per-step validation, conditional routing (e.g. insurance modal), and the JSX — stays in each flow component and composes these primitives.

---

## Scroll position on step change

**Problem:** When a member is scrolled to the bottom of a long step and presses Next, the new step content renders at the same scroll offset — leaving them mid-page on a step they haven't started.

**Solution:** `useSteppedFlow` scrolls to the top on every `advance`, `back`, and `editStep` call.

### Why `window.scrollTo` alone is not enough

The `MemberOnlineLayout` main content area has `overflowY: auto` on desktop (the `#main-content` element). On desktop, the scroll container is that element, not `window`. Scrolling only `window` has no visible effect at the `lg` breakpoint.

### Implementation (in `src/lib/useSteppedFlow.ts`)

```ts
function scrollToTop() {
  // Desktop: #main-content is the scroll container (overflowY: auto at lg+).
  // Mobile: window is the scroll container.
  document.getElementById('main-content')?.scrollTo({ top: 0, behavior: 'instant' });
  window.scrollTo({ top: 0, behavior: 'instant' });
}
```

`behavior: 'instant'` is intentional — smooth scroll would compete with the `StepTransition` animation.

### If you use a different scroll container

If you build a flow outside `MemberOnlineLayout` (e.g. a drawer or embedded panel), you will need to scroll that element's container instead. Either:
- Pass a `scrollContainerRef` into the hook (extend the hook options if needed), or
- Call `containerRef.current?.scrollTo({ top: 0, behavior: 'instant' })` in the flow's own `handleNext` / `handleBack`.

---

## Validation

- Validate on Next — never on field blur (stepped forms are not real-time validators).
- `showValidation` is the gate. Only show error states after the member has attempted to advance.
- Per-step validation lives in the flow component (`stepIsValid(step)`), not in the hook or individual step components. Step components receive `showValidation` as a prop.

---

## Draft persistence

Flows using `useSteppedFlow` get autosave for free. Drafts are stored in `localStorage` with a 30-day expiry via the flow's `draftService`. Step 0 (intro) is never saved — saves begin from step 1.

On return, a "Continue your application?" dialog appears (`ResumeDraftDialog`). The member can resume or start fresh.

---

## Step 0 — intro convention

Step 0 is always the intro / eligibility screen. It:
- Is not included in the `FormProgress` indicator (the progress bar only appears from step 1)
- Is not autosaved
- Uses a `'Get started'` label on the Next button rather than `'Next'`
- Can gate the Next button (`hideNext`) until an eligibility check passes

---

## Step titles and progress

- Render `STEP_TITLES[activeStep]` as the page `<h1>` above the progress bar.
- Show `FormProgress` only from step 1 (`activeStep > 0`).
- `FormProgress` uses `variant="simple"` with `stepMenu` enabled so members can jump back to completed steps.

---

## Accessibility

- The `#main-content` element is the skip-link target and has `tabIndex={-1}` — do not remove this.
- After a step change, focus does not need to be manually managed when scroll-to-top is in place; the member's attention resets to the top of the page naturally.
- If a validation error alert is shown, it should appear **above** `StepperActions` so it is encountered before the button row when tabbing.
- Step headings must use `component="h2"` inside the step content (the page `<h1>` is outside the step container).
