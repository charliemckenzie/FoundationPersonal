# Retirement Projection — UX Audit

**Date:** 12 June 2026
**Scope:** `src/app/retirement-projection/` and `src/features/retirement-projection/` (flow shell, all 8 steps, charts, supporting components)
**Method:** Code-level review against the Design for Hackers checklists (composition, hierarchy, colour, typography), WCAG 2.2 AA, the Foundation quality charter, and `docs/guidelines/components.md` / `typography.md`.

---

## Summary

The flow has a solid skeleton — clear step sequence, a sensible two-column "context left, inputs right" layout, good plain-English question copy, and a genuinely useful concessional-cap tracker. The serious problems cluster in four areas:

1. **Accessibility of hand-rolled interactive elements** (lifestyle cards, next-step cards) that bypass Foundation components.
2. **Credibility leaks** — conflicting dollar figures, dead links, "(tbc)" labels, a non-functional "Ways to improve" form. For a financial advice tool, these are the most damaging class of issue.
3. **The results page never answers the user's question** ("am I on track?") — the user has to derive the verdict themselves.
4. **Design-system drift** — custom buttons, custom transitions, hardcoded colours and px spacing where Foundation equivalents exist.

**Counts:** 6 Critical · 9 Major · 9 Minor

> **Status update — 12 June 2026:** The designer approved fixes for C1, C3, C5, M1–M6, M8, M9, m1, m2, m4, m6, m7, m8, m9, and these are now implemented and verified in the browser. Remaining open: **C2** (dead next-step action cards), **C4** ("Ways to improve" form not wired), **C6** (hardcoded panel colour + red icon), **M7** (dead links and "(tbc)" label), **m3** ("Welcome!" h5 eyebrow), **m5** (results intro copy). Note: C2's existing code also carries two pre-existing TypeScript errors (`HeroIcon background="circle"`, `Icon color="default"`) that should be resolved as part of that rebuild. The C1 rebuild uses `RadioGroup variant="card"`, whose icons are Font Awesome names — the ASFA SVG illustrations were replaced with `house` / `umbrella-beach` / `sliders` icons, for designer review.

---

## Findings table

| # | Severity | Area | Finding |
|---|---|---|---|
| C1 | Critical | Lifestyle step | Hand-rolled radio cards are not an accessible radio group |
| C2 | Critical | Next steps | Action cards are fake buttons — no click or keyboard handler |
| C3 | Critical | Results / constants | Conflicting ASFA income figures shown in the same session |
| C4 | Critical | Results | "Ways to improve" form is non-functional but looks live |
| C5 | Critical | Results | No clear verdict — the page never says whether the user is on track |
| C6 | Critical | Next steps / charter | Hardcoded `#dbeafe` panel; red (`error`) icon on a non-error action |
| M1 | Major | All form steps | Disabled "Next" with no explanation; no inline validation anywhere |
| M2 | Major | Flow | No persistence and no exit/finish confirmation — silent total data loss |
| M3 | Major | Flow | Custom Back/Next buttons duplicated in 3 files instead of `StepperActions` |
| M4 | Major | Flow | Custom `FadeTransition` instead of `StepTransition`; ignores `prefers-reduced-motion` |
| M5 | Major | Results | Stat cards don't stack on mobile; equal visual weight hides the comparison |
| M6 | Major | Header | Welcome header reads "Advice on investing your super" — wrong product name |
| M7 | Major | Results / footer | Dead `href="#"` links (FSG, assumptions "change them here", footer legal links); "(tbc)" shipped in a button label |
| M8 | Major | Charts | 11–12 px font sizes (charter violation); data only available via hover tooltip; colour-only legend |
| M9 | Major | Progress bar | "Results" step shown in the track but never clickable; next-steps phase not represented |
| m1 | Minor | Inputs | Inconsistent placeholder conventions and frequency-option capitalisation |
| m2 | Minor | Super step | Yes/no question labels on amount fields ("Do you salary sacrifice…?") |
| m3 | Minor | Welcome | "Welcome!" eyebrow uses an `h5` heading variant |
| m4 | Minor | Step headings | `color="primary.main"` overrides the theme's `text.heading` |
| m5 | Minor | Results copy | "Improve your score" — there is no score; "Explore simple breakdowns…" copy mismatch |
| m6 | Minor | Disclaimer | Copy and button-order issues ("select exit", Back/Exit/Start grouping) |
| m7 | Minor | Inputs | `type="number"` age fields (spinners, scroll-to-change); mixed controlled/uncontrolled fields |
| m8 | Minor | Typography | Multi-sentence body paragraphs not using `lineHeight: 1.75` per the typography guideline |
| m9 | Minor | Tokens | `grey.300` vs `border.default` borders; `grey.600` label colour; raw px spacing (`'24px'`, `'64px'`, `'40px'`) |

---

## Critical findings

### C1 — Lifestyle cards are not an accessible radio group
**Where:** `src/features/retirement-projection/steps/StepLifestyle.tsx:71-148`

**Problem.** The ASFA lifestyle options are clickable `Box`es with `role="radio"`, but:
- There is no surrounding `role="radiogroup"` and no group label, so screen readers announce orphaned radios with no context.
- Radios require **arrow-key** navigation with a single tab stop; these are three separate tab stops with Enter/Space handlers — they behave like buttons pretending to be radios.
- The "Custom amount" card nests a `MoneyField` *inside* a `role="radio"` element. Interactive content inside a radio is invalid ARIA, and the card's Space/Enter `onKeyDown` fires while the user types in the field.
- Selection is communicated by border colour + background tint only — no redundant non-colour cue (fails the colourblindness check; affects ~10% of male users).

**Principle.** Quality charter: *"semantic HTML first, ARIA only when native elements can't serve."* `components.md`: *"Always use an existing component."* WCAG 2.1.1 (keyboard) and 4.1.2 (name, role, value).

**Fix.** Replace the hand-rolled cards with Foundation `RadioGroup variant="card"`, which already handles grouping, arrow keys, and selection state:

```tsx
<RadioGroup
  legend="Choose the lifestyle you'd like to plan for"
  variant="card"
  value={lifestyle ?? ''}
  onChange={(v) => onLifestyleChange(v as LifestyleOption)}
  options={LIFESTYLE_OPTIONS.map((o) => ({
    value: o.value,
    label: `${o.label} — ${o.yearlyAmount}`,
    description: o.description,
    icon: <Box component="img" src={o.image} alt="" sx={{ width: '2rem' }} />,
  }))}
/>
```

For the custom amount, render the `MoneyField` *below* the group, revealed when `custom` is selected (the same conditional-reveal pattern already used for partner details). If the embedded-input-in-card design is a hard requirement, that's a `RadioGroup` API extension — route through Moe rather than hand-rolling.

---

### C2 — Next-step action cards are fake buttons
**Where:** `src/features/retirement-projection/steps/StepNextSteps.tsx:57-90`

**Problem.** The three action cards ("View Statement of Advice", "Book an advice appointment", "See other advice options") have `role="button"`, `tabIndex={0}`, a pointer cursor, and a hover state — and **no `onClick` or `onKeyDown` at all**. Mouse users click and nothing happens; keyboard users focus a "button" that can never be activated. This is the flow's primary conversion moment, and it's inert.

**Principle.** Design for Hackers Ch. 1 — credibility: an element that promises interaction and doesn't deliver reads as broken and erodes trust in everything around it (including the projection itself). WCAG 2.1.1.

**Fix.** These are links/buttons in a list — use real semantics. The closest Foundation pattern is a list of `Card`/`CardV2` with `href`/`onClick`, or `IconList`-style rows built from `Button`/`TextButton`. Minimum fix:

```tsx
<Box component="a" href={action.href} sx={{ /* existing styles */ }}>
```

with a real destination per action, focus-visible styling, and the handler actually wired. Remove `role`/`tabIndex` once it's a native `<a>`/`<button>`.

---

### C3 — Conflicting ASFA figures in the same session
**Where:** `constants.ts:122-142` ($51,299 / $77,375) vs `WaysToImprove.tsx:28-30` ($45,760 / $70,720)

**Problem.** The lifestyle step tells the user "ASFA Comfortable = $77,375/year". Two steps later, the results page's "Change your retirement age or target income" panel offers "Comfortable ($70,720 p.a.)". Same concept, two different numbers, one screen apart.

**Principle.** Ch. 1 — information design is ~28% of perceived credibility. In a regulated financial advice context an internal contradiction in dollar figures is the single fastest way to lose user trust (and a compliance risk).

**Fix.** Derive every display of these figures from `LIFESTYLE_TARGETS` — one source of truth:

```tsx
{ value: 'modest', label: `Modest (${dollars(LIFESTYLE_TARGETS.modest)} p.a.)` },
{ value: 'comfortable', label: `Comfortable (${dollars(LIFESTYLE_TARGETS.comfortable)} p.a.)` },
```

---

### C4 — "Ways to improve" form is decorative
**Where:** `WaysToImprove.tsx` (whole file)

**Problem.** The accordion's first panel contains a retirement-age field, a target-income radio group, a custom-amount field, and a **"Save changes"** button. None of it is connected to anything: the inputs hold local/no state, and Save has no handler. The other panels' "Start" buttons are equally inert. A user who carefully re-plans their retirement age and clicks Save gets silent nothing — worse than not offering the feature.

**Principle.** Ch. 1 — visual design and information design must not contradict: a form that looks live but isn't is the contradiction in its sharpest form. Also the charter's implicit "no dead UI" (`TODO` without a ticket).

**Fix.** Either wire it or cut it:
- **Wire (preferred):** lift the edited values into `RetirementProjectionState`, recompute `computeProjection` on Save, and scroll to / flash the updated stat cards so cause-and-effect is visible. This "what if?" loop is the most valuable feature the tool could have.
- **Cut for now:** replace the panels with copy + a real link each, and no input controls, until the recompute path exists.

---

### C5 — The results page never answers "am I on track?"
**Where:** `steps/StepResults.tsx:86-97`

**Problem.** The page shows two equally weighted purple stat cards (projected balance, projected income) and buries the target as a caption inside the second card. Unless funds deplete (warning alert), the user must mentally subtract `target − projected` to learn the one thing they came for. There is no dominant element carrying the verdict.

**Principle.** Ch. 6 — *a dominant element must exist; the eye needs to be drawn to one thing first.* Ch. 7 — hierarchy should mirror the information's importance: the verdict outranks both numbers.

**Fix.** Lead with an explicit verdict before the stat cards, with redundant icon + text (not colour alone):

```tsx
const onTrack = projection.projectedIncome >= projection.targetIncome;
<Alert
  severity={onTrack ? 'success' : 'warning'}
  title={onTrack
    ? "You're on track for your target retirement income"
    : `You're projected to be ${dollars(projection.targetIncome - projection.projectedIncome)} a year short of your target`}
  message="Based on the details you provided. See the assumptions below."
/>
```

Then differentiate the two cards (the income card is the primary one — give it the comparison treatment, and consider a neutral surface for the balance card so the pair isn't a tie).

---

### C6 — Hardcoded colour + red on a non-error action
**Where:** `StepNextSteps.tsx:108` (`backgroundColor: '#dbeafe'`) and `:33` (`color: 'error'` on "See other advice options")

**Problem.**
- `#dbeafe` is a raw Tailwind blue in a token-only codebase, and it paints a large empty decorative panel (5 of 12 columns of nothing on the final screen).
- The "See other advice options" HeroIcon uses the `error` palette. Red on an informational action signals danger/blocking where none exists.

**Principle.** Quality charter: *zero hardcoded colours.* Ch. 9 — functional colour conventions: red = error/urgency; misusing it both alarms users and dilutes real errors elsewhere (the cap warning, the shortfall alert).

**Fix.** `color="primary"` (or `info`) for the icon. For the panel, either use a theme token (`primary.softMain` / `background.default`) with actual content (illustration, contact details, SoA summary) or drop the panel and let the actions own the width. Flag to Marge for the token sweep.

---

## Major findings

### M1 — Disabled "Next" with no explanation; no inline validation
**Where:** `RetirementProjectionFlow.tsx:73-84, 295`; all step files

**Problem.** Step validity silently disables Next. If retirement age ≤ current age, nothing tells the user why they're stuck — the fields show no error. Steps 3 and 4 have no validation at all, and the age fields accept 0, negatives, or 200. Disabled-button-without-reason is a classic dead-end: the user's only recovery strategy is re-reading the whole form.

**Principle.** Ch. 1 — usability before polish; WCAG 3.3.1 (error identification) / 3.3.3 (error suggestion).

**Fix.** Keep Next enabled; on click, validate and show field-level errors via the components' existing `error`/`errorMessage` props ("Retirement age must be after your current age", "Enter an age between 15 and 75"). `TextField` already self-validates email/tel on blur — follow that pattern for ages. Reserve disabled-Next for the disclaimer checkbox case, where the reason is visible right above the button.

### M2 — Silent total data loss
**Where:** `RetirementProjectionFlow.tsx:90-95` (`handleFinish`), `StepDisclaimer` Exit

**Problem.** "Finish" wipes all state and returns to Welcome with no confirmation. A browser refresh (or accidental back-swipe — the flow has no routes) loses a ~30-field financial profile. There's no save, and no warning.

**Principle.** Foundation's own pattern: `StepperActions` exists precisely for this and *"handles exit confirmation dialog internally."* Forgiveness/undo is baseline UX for long forms.

**Fix.** (a) Confirm before destructive resets — `Dialog variant="warning"` or `StepperActions`' built-in exit confirm; (b) persist `state` to `sessionStorage` keyed by flow version so refresh resumes; (c) add `beforeunload` guard while the form is dirty.

### M3 — Custom Back/Next buttons ×3 instead of `StepperActions`
**Where:** `RetirementProjectionFlow.tsx:294`, `StepDisclaimer.tsx:98`, `StepResults.tsx:139`

**Problem.** The same pill-shaped ghost-Back sx hack (`borderRadius: '9999px', bgcolor: 'grey.200', '&:hover': …, color: 'primary.main'`) is copy-pasted in three files, and the stepped-form action bar is rebuilt by hand. This is exactly the drift `StepperActions` (Back / Next / Save / Exit + exit confirm) exists to prevent, and it forfeits the Save/Exit affordances M2 needs.

**Principle.** `components.md`: use existing components; charter: no duplicated variant styling. Ch. 6 — similarity/recurring motifs come free when the system component is used.

**Fix.** Replace the three hand-rolled bars with `StepperActions` (`step`, `isSubmitStep`, `onBack`, `onNext`, `onExit`, `onSave`). If the pill-ghost look is wanted, that's a `Button`/theme change — route through Moe, not call-site sx.

### M4 — `FadeTransition` duplicates `StepTransition`, minus accessibility
**Where:** `FadeTransition.tsx`

**Problem.** A bespoke fade was built although `components.md` says *"use `StepTransition` in every multi-step form."* The bespoke version doesn't respect `prefers-reduced-motion`, doesn't animate height (content below jumps), and isn't directional (no forward/back spatial cue).

**Principle.** Charter component-reuse rule; WCAG 2.3.3 (animation from interactions).

**Fix.** Swap `FadeTransition` for `StepTransition` driven by the same composite step index. Delete `FadeTransition.tsx`.

### M5 — Stat cards: no mobile stacking, no hierarchy
**Where:** `StepResults.tsx:86`

**Problem.** `display: 'flex', gap: 2` keeps both cards side-by-side at every width — at 360 px each card gets ~150 px and the h3 dollar figures wrap awkwardly. Both cards are identical purple blocks, so neither reads as the headline.

**Principle.** Ch. 6 dominance; responsive baseline.

**Fix.** `flexDirection: { xs: 'column', sm: 'row' }`, and pair with the C5 verdict treatment so the income-vs-target card leads.

### M6 — Wrong product name in the header
**Where:** `RetirementProjectionFlow.tsx:97-100`

**Problem.** On the welcome screen the header reads **"Advice on investing your super"**; from the next click it becomes "Retirement projection". The first label describes a different ART product, and the switch mid-flow makes the tool feel re-skinned.

**Principle.** Ch. 1 — purpose must be identifiable and consistent; naming is the cheapest credibility signal there is.

**Fix.** Return `'Retirement projection'` unconditionally (delete `getHeaderTitle`).

### M7 — Dead links and "(tbc)" in production UI
**Where:** `StepDisclaimer.tsx:80` (FSG `href="#"`), `StepResults.tsx:130` ("change them here" `href="#"`), footer links `href="#"`, `StepNextSteps.tsx:26` ("Book an advice appointment (tbc)")

**Problem.** The disclaimer asks users to confirm they've read material that links nowhere; the assumptions box invites users to "change them here" — a feature that doesn't exist; a primary CTA carries "(tbc)". Each is a small breach of contract with the user.

**Principle.** Ch. 1 credibility; charter: no `TODO` (a "(tbc)" label is a TODO in the UI).

**Fix.** Real FSG/legal URLs; remove the "change them here" sentence until assumption-editing ships; remove "(tbc)" and hide the appointment card behind a feature flag until it's bookable.

### M8 — Chart typography and data access
**Where:** `ResultsCharts.tsx:81, 89` (`fontSize: 11`, `fontSize: 12`), whole chart

**Problem.** Axis ticks and tooltips use hardcoded px font sizes (charter: rem-first — these won't scale with browser zoom/font preferences). Exact values exist only in hover tooltips (untouchable on keyboard / touch-hover), and the legend relies on colour swatches; `primary.main` vs `primary.light` is a risky pair under colour-vision deficiency.

**Principle.** Charter rem-first rule; Ch. 8 — perceptual colour + redundant cues; WCAG 1.1.1 (non-text content).

**Fix.** `fontSize: theme.typography.caption.fontSize` (rem) for ticks/tooltip; add a visually-hidden or collapsible `Table` of the projection years (Foundation `Table` + `ExpandableItem`: "View as table"); differentiate series with the dashed/solid pattern already used on the reference lines, or pick a higher-ΔL pair.

### M9 — Progress-bar inconsistencies
**Where:** `RetirementProjectionFlow.tsx:153-170`

**Problem.** `FORM_STEPS` includes "Results" (5 steps) but `onStepClick` blocks `index < TOTAL_FORM_STEPS`, so the Results chip is rendered, looks reachable once visited, and never responds. During the next-steps phase the bar still shows "Results" as active — the user's location is misreported.

**Principle.** Ch. 6 — directional flow should match actual navigation; affordance honesty.

**Fix.** Allow `index === TOTAL_FORM_STEPS` to jump to the results phase when `maxStep >= TOTAL_FORM_STEPS`, and either add a "Next steps" entry or mark all steps complete during that phase.

---

## Minor findings

| # | Where | Problem → Fix |
|---|---|---|
| m1 | All steps, `constants.ts:90-119` | Placeholders mix four conventions ("For example, 95000", "For example, $10,000", "Enter their age in years", "0"), and frequency options are lowercase in some lists ('yearly') and capitalised in others ('Weekly') — visible in adjacent selects on the super step. Pick one convention each ("For example, $95,000" / sentence-case option labels) and normalise. |
| m2 | `StepSuper.tsx:119, 134` | Yes/no questions as labels on amount fields ("Do you salary sacrifice into super?" answered with dollars). Relabel: "How much do you salary sacrifice into super?" + helper "Leave blank if you don't." |
| m3 | `StepWelcome.tsx:61` | "Welcome!" eyebrow rendered as `variant="h5"` — a heading above the page's `h1` for a decorative kicker. Use `variant="small"`/`lead` with `component="p"` (typography.md: variant ≠ element). |
| m4 | `StepIncome/Lifestyle/Super/AssetsDebts` headings | `color="primary.main"` on `h4` headings overrides the theme's automatic `text.heading`. typography.md allows it only as a deliberate override — if brand-coloured step headings are intended, make it a theme decision (Moe), not per-call-site. |
| m5 | `WaysToImprove.tsx:19`, `StepResults.tsx:79` | Copy says "improve your **score**" (there is no score) and "Explore simple breakdowns on our website to learn how investing works" (doesn't describe the accordion below it). Align copy with "projection". |
| m6 | `StepDisclaimer.tsx:87, 97-101` | "…select exit" lacks a period and references a button rendered *below* the fold of the box; Back/Exit/Start sit in one undifferentiated row. Suggest: Back (ghost) left-aligned, Exit (outlined) + Start (contained) right-aligned, and finish the sentence. |
| m7 | `StepIncome.tsx:67-81` | `type="number"` for ages brings spinners and scroll-to-change mis-entry; mixing controlled `TextField value` with uncontrolled `MoneyField defaultValue` in the same form is fragile if steps ever stay mounted. Prefer `inputMode="numeric"` text fields and pass `value` consistently (MoneyField supports controlled use per components.md). |
| m8 | Welcome, disclaimer, results body copy | Multi-sentence paragraphs use default `lineHeight 1.5`; typography.md: *"if the text runs to two or more sentences, use 1.75."* Apply `sx={{ lineHeight: 1.75 }}` to the reading passages. |
| m9 | `StepWelcome.tsx:96` (`grey.300`), section labels (`grey.600`), shell spacing (`'24px'`, `'64px'`, `'40px'`, `pt: '2.5rem'`) | Border tokens inconsistent with `border.default` used everywhere else; label grey instead of `text.muted`; raw px strings instead of `theme.spacing` (3, 8, 5). One Marge sweep fixes all three. |

---

## What's working well

Worth keeping as-is:

- **Two-column rhythm** — context/considerations left, inputs right, repeated on every step (Ch. 6 similarity done right).
- **Progressive disclosure** — partner, home-loan, other-fund and debt details reveal only when relevant; the form never looks longer than it needs to.
- **Concessional cap tracker** (`StepSuper.tsx:270-300`) — live feedback, redundant cues (text + colour + progress bar), correct use of `error` at the cap. The best moment in the flow.
- **Honest framing copy** on the results page ("This is a projection, not a guarantee…").
- **`maxStep` gated step-jumping** in the progress bar — revisit-anything-already-seen is the right model.

---

## Suggested follow-ups

- **/flow** — motion & interaction pass: `StepTransition` adoption, reduced-motion, focus management when steps change, mobile stacking (C5/M4/M5).
- **/color** — verdict treatment, chart series palette under colour-vision deficiency, red-usage audit (C5/C6/M8).
- **/fonts** — chart tick/tooltip rem sizing and the line-height 1.75 sweep (M8/m8).
- **Pipeline routing:** C1/C2 → Lenny (rebuild on Foundation components) then Flanders; C3/C4/M7 → Lenny + Carl (wire or cut); m9 → Marge; any `RadioGroup` card-with-input extension → Moe first.
