# EligibilityChecker — Feature Build Plan

## What it is

A compact, card-based, config-driven eligibility checker widget. Not a full-page form — a self-contained card that lives on product overview pages in Member Online, acting as a pre-gate before a member enters a full application flow.

The existing `StepEligibility` steps inside `lifetime-pension/` and `retirement-income-account/` are untouched. This is a separate component.

---

## Screenshot reference

The design (shared in chat) shows:
- A small card with a back arrow (chevron-left) + step pill badge ("2 of 3") in the header
- One question per card view
- Conditional follow-up questions slide in below the primary answer
- Success state transforms the card content (replaces questions with a success callout)

---

## Placement

- Lives in **Member Online** (logged-in context)
- First integration point: `src/app/member-online/(portal)/income-accounts/page.tsx`
- Reusable for any future product — driven entirely by a config object passed as a prop

---

## File structure

```
src/features/eligibility-checker/
  types.ts                         ← all TS types and the EligibilityCheckerConfig shape
  EligibilityCheckerStep.tsx       ← renders a single step: question + conditional + outcome alerts
  EligibilityChecker.tsx           ← card shell: header (back + badge), step rendering, eligible transform
  configs/
    lifetimePensionConfig.tsx      ← the LP/RIA config (all 3 steps wired up)
  index.ts                         ← public exports

src/stories/features/eligibility-checker/
  EligibilityChecker.stories.tsx   ← all states
```

---

## Types (`types.ts`)

```ts
export type EligibilityAnswer = 'yes' | 'no' | '';
export type EligibilityOutcome = 'eligible' | 'ineligible' | 'warning' | 'pending';

// All answers keyed by question id
export type Answers = Record<string, EligibilityAnswer>;

export interface EligibilityQuestion {
  id: string;
  text: string;
  subtext?: React.ReactNode;          // optional sublabel (e.g. the 10hrs/week copy)
  options: { value: string; label: string }[];
}

export interface ConditionalQuestion {
  whenAnswer: 'yes' | 'no';          // show when the parent answer matches this
  question: EligibilityQuestion;
}

export interface EligibilityStepConfig {
  id: string;
  question: EligibilityQuestion;
  conditional?: ConditionalQuestion;  // one optional follow-up question
  getOutcome: (answers: Answers) => EligibilityOutcome;
  ineligibleMessage: string;          // used when outcome === 'ineligible'
  warningMessage?: string;            // used when outcome === 'warning'
}

export interface EligibilityCheckerConfig {
  steps: EligibilityStepConfig[];
  eligibleTitle: string;
  eligibleMessage: string;
}
```

---

## Step logic

### Step 1 — Transfer amount

**Question:** How much will you be transferring?

Options (radio):
- `'yes'` label: `"I'll be transferring $10,000 or more"`
- `'no'` label: `"I won't be transferring $10,000"`

No conditional follow-up.

```ts
getOutcome: (answers) => {
  if (answers['transfer'] === 'yes') return 'eligible';
  if (answers['transfer'] === 'no') return 'ineligible';
  return 'pending';
}
ineligibleMessage: "Sorry, you're not eligible. A minimum purchase amount of $10,000 applies."
```

---

### Step 2 — Tax deduction

**Question:** Have you claimed a tax deduction on voluntary contributions this or last financial year?
**Subtext:** You would have submitted a Notice of Intent to claim form.

Options (radio): Yes / No

Conditional when `'yes'`:
> **Follow-up:** Have you received confirmation it's been processed?
> Options: Yes / No

Conditional when `'no'`:
> **Follow-up:** Do you intend to?
> Options: Yes / No

```ts
getOutcome: (answers) => {
  const primary = answers['taxDeduction'];
  const processed = answers['taxDeductionProcessed'];
  const intends = answers['taxDeductionIntends'];

  if (primary === 'yes') {
    if (processed === 'yes') return 'eligible';
    if (processed === 'no') return 'ineligible';
    return 'pending';
  }
  if (primary === 'no') {
    if (intends === 'yes') return 'warning';
    if (intends === 'no') return 'eligible';
    return 'pending';
  }
  return 'pending';
}
ineligibleMessage: "You're not eligible to proceed. Please contact us for assistance."
warningMessage: "Please complete this first so we can process your application."
```

Note: `warning` outcome blocks the Next button just like `ineligible`.

---

### Step 3 — Retirement status

**Question:** Have you permanently retired from work?
**Subtext:** This means you were in paid employment for at least 10 hours a week and **now you do not intend to work 10 or more hours in any given future week.**

Options (radio): Yes / No

Conditional when `'no'`:
> **Follow-up:** Have you left an employer on or after turning 60?
> Options: Yes / No

```ts
getOutcome: (answers) => {
  const retired = answers['retiredFromWork'];
  const leftAfter60 = answers['leftEmployerAfter60'];

  if (retired === 'yes') return 'eligible';
  if (retired === 'no') {
    if (leftAfter60 === 'yes') return 'eligible';
    if (leftAfter60 === 'no') return 'ineligible';
    return 'pending';
  }
  return 'pending';
}
ineligibleMessage: "You are not eligible for this account yet. To open this account, you will need to be permanently retired or have left an employer on or after turning 60."
```

When the final step returns `'eligible'` → the card transforms to the success state (no more steps).

---

## Component breakdown

### `EligibilityCheckerStep.tsx`

**Props:**
```ts
interface EligibilityCheckerStepProps {
  config: EligibilityStepConfig;
  answers: Answers;
  onChange: (id: string, value: EligibilityAnswer) => void;
  outcome: EligibilityOutcome;
}
```

**Renders:**
1. Primary `RadioGroup` (legend + optional sublabel)
2. Conditional `RadioGroup` — rendered inside a `Box sx={{ pt: 1 }}` when the trigger condition matches
3. Alert outcome feedback:
   - `outcome === 'ineligible'` → `<Alert severity="error" message={config.ineligibleMessage} />`
   - `outcome === 'warning'` → `<Alert severity="warning" message={config.warningMessage} />`

No success Alert here — success is handled by the parent card transform.

---

### `EligibilityChecker.tsx`

**Props:**
```ts
interface EligibilityCheckerProps {
  config: EligibilityCheckerConfig;
}
```

**State:**
```ts
const [activeStep, setActiveStep] = useState(0);
const [answers, setAnswers] = useState<Answers>({});
const [eligible, setEligible] = useState(false);
```

**Render structure:**
```
Box (card shell)
  ├── Card header (when !eligible)
  │     ├── IconButton chevron-left (hidden on step 0, resets step answers on click)
  │     └── Chip/Badge "X of N" (blue pill — same style as screenshot)
  ├── Card body
  │     ├── if eligible → EligibleCallout (success.background box, icon, title, message)
  │     └── else → EligibilityCheckerStep (current step)
  └── Card footer (when !eligible)
        └── Button "Next" (contained, disabled when outcome !== 'eligible')
```

**Navigation logic:**
- `handleNext`: if `currentOutcome === 'eligible'` and there is a next step → `setActiveStep(s => s + 1)`. If on last step and eligible → `setEligible(true)`.
- `handleBack`: `setActiveStep(s => s - 1)`, clear answers for the step being left.
- Next is **disabled** when outcome is `'pending'`, `'ineligible'`, or `'warning'`.

**Card shell styles** (mirror existing bordered card pattern from `StepEligibility`):
```tsx
sx={{
  border: '1px solid',
  borderColor: 'border.default',
  borderRadius: (t) => `${t.shape.md}px`,
  backgroundColor: 'background.paper',
  p: 3,
}}
```

**Eligible callout styles** (mirror `RetirementBonus` in `StepFunding.tsx`):
```tsx
sx={{
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  p: 3,
  borderRadius: (t) => `${t.shape.lg}px`,
  border: '1px solid',
  borderColor: 'success.border',
  bgcolor: 'success.background',
}}
```
Includes a circular icon badge (success.main bg, success.contrastText icon — use `circle-check` icon).

**Step pill badge** (header):
```tsx
sx={{
  display: 'inline-flex',
  alignItems: 'center',
  px: 1.5,
  py: 0.5,
  borderRadius: '999px',
  bgcolor: 'primary.main',
  color: 'primary.contrastText',
}}
// Typography variant="small" inside
```

---

### `configs/lifetimePensionConfig.tsx`

Wires up all 3 steps as described above. Import and pass directly to `<EligibilityChecker config={lifetimePensionConfig} />`.

---

### `index.ts`

```ts
export { EligibilityChecker } from './EligibilityChecker';
export type { EligibilityCheckerConfig, EligibilityStepConfig, EligibilityOutcome, Answers } from './types';
export { lifetimePensionConfig } from './configs/lifetimePensionConfig';
```

---

## Storybook stories (`EligibilityChecker.stories.tsx`)

Stories to cover (use `useState` harness inside each render):

| Story name | What it shows |
|---|---|
| `Step1_Unanswered` | Step 1 with no answer selected |
| `Step1_Ineligible` | "I won't be transferring $10,000" selected → error Alert |
| `Step2_YesBranch` | Primary = Yes, confirmation follow-up visible, unanswered |
| `Step2_YesIneligible` | Primary = Yes, "No" on follow-up → error Alert |
| `Step2_NoBranch` | Primary = No, "intend to?" follow-up visible, unanswered |
| `Step2_Warning` | Primary = No, "Yes" on follow-up → warning Alert |
| `Step3_NoBranch` | Primary = No, employer-after-60 follow-up visible |
| `Step3_Ineligible` | Primary = No, follow-up = No → error Alert |
| `EligibleState` | Card transformed to success callout |

File location: `src/stories/features/eligibility-checker/EligibilityChecker.stories.tsx`
Story title: `'Features / EligibilityChecker'`

---

## Integration (income-accounts page)

After the feature is built, add the checker below the "Open a Lifetime Pension" `ManagedList` in `src/app/member-online/(portal)/income-accounts/page.tsx`:

```tsx
import { EligibilityChecker, lifetimePensionConfig } from '@/features/eligibility-checker';

// Inside the JSX, below the ManagedList for Lifetime Pension:
<EligibilityChecker config={lifetimePensionConfig} />
```

The checker sits as a standalone card — no breadcrumb, no `StepperActions`, no `ContentContainer` changes needed.

---

## Build order

1. `src/features/eligibility-checker/types.ts`
2. `src/features/eligibility-checker/EligibilityCheckerStep.tsx`
3. `src/features/eligibility-checker/EligibilityChecker.tsx`
4. `src/features/eligibility-checker/configs/lifetimePensionConfig.tsx`
5. `src/features/eligibility-checker/index.ts`
6. `src/stories/features/eligibility-checker/EligibilityChecker.stories.tsx`
7. Integration in `income-accounts/page.tsx`

---

## Component conventions to follow

- `RadioGroup` from `@/components/RadioGroup` — use `legend`, `legendSx={{ typography: 'h6', color: 'text.heading', fontWeight: 700 }}`, `options`, `value`, `direction="row"`, `onChange`
- `Alert` from `@/components/Alert` — `severity="error"` / `severity="warning"` / `severity="success"`
- `Icon` from `@/components/Icon` — use `"chevron-left"` for back, `"circle-check"` for eligible state icon
- `Button` from `@/components/Button` — `variant="contained"`, `label="Next"`
- All colours via MUI theme tokens — no hardcoded hex values
- All font sizes in `rem`, line heights unitless
- `sx` props only — no `style={{}}` inline props
- TypeScript strict — no `any`
- Component file ≤ 200 lines — split if larger

---

## Key existing files for reference

| File | Why it's relevant |
|---|---|
| `src/features/lifetime-pension/steps/StepEligibility.tsx` | Existing retirement-status question (step 3 source of truth for copy + sublabel) |
| `src/features/retirement-income-account/steps/StepFunding.tsx` (line ~234) | `RetirementBonus` component — reference for success callout styles |
| `src/components/RadioGroup/index.tsx` | Full RadioGroup props interface |
| `src/components/Alert/index.tsx` | Alert props, `SEVERITY_ICONS` export |
| `src/app/member-online/(portal)/income-accounts/page.tsx` | Integration target page |
