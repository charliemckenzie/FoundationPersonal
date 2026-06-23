# Lifetime Pension — "Other options" document upload (Selfie ID / Certified ID)

**Status:** Plan — ready to execute (designer decisions confirmed 2026-06-24)
**Author:** Adam (drafted with Claude Code)
**Date:** 2026-06-24
**Source of truth:** `fs51.pdf` — *Proof of identity* factsheet (QSuper / Australian Retirement Trust, FS51 10/25)

---

## 1. Goal

On the Lifetime Pension **Verify your identity** step, the user already chooses between **Online** (electronic check) and **Other options**. Today the "Other options" branch is just a single confirmation checkbox pointing at the factsheet.

Replace that placeholder with a real flow that lets the user **upload the documents described in the factsheet** — either a **Selfie ID** or a **Certified ID** — directly in the application, plus an explicit **"I'll provide this later"** escape hatch.

Supporting detail (who can certify, how to certify, full acceptable-document lists) lives behind a **modal** so the page stays scannable; top-level, just-enough guidance stays on the page.

### Decisions (confirmed with designer, 2026-06-24)

- **Upload required to continue** on the Selfie and Certified paths; "I'll provide this later" is the only no-upload path.
- **File types:** Selfie ID = images only (JPG/PNG, **rejects PDF** per factsheet "original photo files, not a PDF"); Certified ID = images **+ PDF**. 10 MB per file, multiple files allowed.
- **"Provide later" tone:** soft, not a hard warning. Copy explains the user can upload later via *Upload files* in Member Online and will receive **email reminders**, but **the application can't be processed until the documents are supplied**. Confirmation checkbox still required.
- **Review screen:** identity row shows **method + uploaded file names** (e.g. "Certified ID: licence-front.jpg, licence-back.jpg").
- **Backend:** **prototype only** — files held in memory, no real upload endpoint, no persistence across draft resume. No Carl/backend work this pass.
- **Out of scope:** name-change documents (marriage certificate, deed poll) and signing-on-behalf (Power of Attorney). Standard Selfie / Certified / later only.

### How to execute (for the agent picking this up)

1. **Read first, in order:** §2.1 (exact current contracts + line refs), §6.1 (verified component APIs + skeleton), then §3–§5. Then open and read the real files in §2 before editing — line numbers here are approximate (`~`) and may have drifted.
2. **Build order:** §6 row 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8. (types → constants → `VerifyOtherOptions` → `IdDocumentsModal` → wire `LifetimePensionFlow` → `StepReview` → `StepSuccess` → story.)
3. **Conventions are mandatory** — MUI theme tokens only (no hardcoded colour/spacing/shadow/font-size), rem-first sizing, no `any`, Foundation typography variants only (`body`/`small`/`h5`/`h6` etc., never `body1`/`subtitle1`). Reuse existing components; do not create new library components.
4. **Self-review against §7 (a11y) and the charter** rather than spawning the Foundation review agents — you are executing directly. The §8 pipeline is context for how this ships, not a step you run.
5. **Verify** per §10 (`npm run lint`, `npx tsc --noEmit`, then Storybook manual + keyboard pass). Report what passed/failed honestly.
6. **Do not commit or branch** unless the designer asks — leave the work in the tree for review.

---

## 2. Current state (what exists)

| File | Role |
|---|---|
| [`src/features/lifetime-pension/LifetimePensionFlow.tsx`](../../src/features/lifetime-pension/LifetimePensionFlow.tsx) | Step 6 (`idv`) renders the `verifyMethod` RadioGroup (`online` / `other`). The `other` branch is a `Box` containing one paragraph + one `Checkbox` (`otherOptionsConfirmed`). Validation: `stepIsValid(6)` returns `otherOptionsConfirmed` for `other`. |
| [`src/features/idv/StepIDV.tsx`](../../src/features/idv/StepIDV.tsx) | The Online sub-form (drivers licence / Medicare / passport). Untouched by this work. |
| [`src/features/idv/types.ts`](../../src/features/idv/types.ts) | `IDVState` + related types. |
| [`src/features/idv/constants.ts`](../../src/features/idv/constants.ts) | `initialIDVState`, state lists, etc. |
| [`src/features/idv/index.ts`](../../src/features/idv/index.ts) | Public API barrel for the IDV module. |

**Relevant local state in `LifetimePensionFlow.tsx`** (see lines ~59–65):
`verifyMethod: 'online' | 'other'`, `otherOptionsConfirmed: boolean`.

These flow through to `StepReview` (`verifyMethod` prop) and `StepSuccess` (`alreadyVerified`). Any new sub-state must thread the same way.

### 2.1 Exact current contracts to thread through (read before editing)

**Step keys / index.** `STEP_KEYS` (lines ~43–52) = `['intro','option','funding','allocate','payments','details','idv','review']`. The IDV step is **index 6** (`'idv'`). `stepIsValid(6)` (lines ~112–115) currently:
```ts
if (step === 6) {
  if (verifyMethod === 'other') return otherOptionsConfirmed;
  return canSubmitIDV(idvState);
}
```

**Step-6 render (lines ~281–348).** The `other` branch is a bordered `Box` (the panel chrome to reuse verbatim) wrapping a `Stack` with one `Typography` + one `Checkbox`. Copy this exact `sx` for the new panel so Online and Other match:
```tsx
sx={(theme) => ({
  borderRadius: `${theme.shape.lg}px`,
  backgroundColor: 'background.paper',
  border: '1px solid',
  borderColor: 'border.default',
  px: { xs: 3, sm: 4 },
  pt: { xs: 3, sm: 4 },
  pb: { xs: 3, sm: 4 },
})}
```

**Step-6 error Alert (lines ~373–378).** Already renders a single `<Alert severity="error">` above `<StepperActions>` when `showValidation && activeStep === 6 && !stepIsValid(6)`. Keep this location; just broaden the message to cover all three sub-methods (e.g. *"To continue, upload your identity documents, or choose ‘I’ll provide this later’ and confirm."*).

**`StepReview` contract** (`steps/StepReview.tsx`). Props include `verifyMethod: 'online' | 'other'` (line ~27). The "Identity verification" `DescriptionList` (lines ~318–334) renders:
```tsx
{verifyMethod === 'other'
  ? 'Member will supply documents as per our Identity Factsheet'
  : 'Digital verification complete'}
```
→ To show **method + file names**, add a new prop (e.g. `otherIdSummary?: { method: OtherIdMethod; fileNames: string[] }`) and replace the `'other'` string with: method label + comma-joined `fileNames`, or `'Provide identity later'` when `method === 'later'`. `verifyMethod` is passed from `LifetimePensionFlow.tsx` line ~360.

**`StepSuccess` contract** (`steps/StepSuccess.tsx`). Props: `onReturnDashboard`, `gate: UseIdvGate`. `alreadyVerified` is set in `LifetimePensionFlow.tsx` line ~155: `alreadyVerified: verifyMethod === 'online' && canSubmitIDV(idvState)`. So for the `other` path `verified` is **false** → it shows the "Identity verification required" pending notice (lines ~107–136) whose copy is hardcoded to *drivers licence / Medicare / passport* and a "Verify your identity" button opening `IdvModal`.
→ For the `other` path that copy is **wrong**. Add a prop (e.g. `verifyMethod` and/or `otherIdMethod`) so the pending block can instead say:
- `selfie`/`certified`: *"We've received your identity documents and will review them. No further action needed."* (suppress the IDV modal button), or
- `later`: *"You still need to provide your identity documents. Upload them via* Upload files *in Member Online — we'll email you reminders. Your application can't be processed until we receive them."*
Do **not** show the electronic-IDV `IdvModal` button on the `other` path.

---

## 3. Reusable components already available

No new Foundation components needed — this is composition only (so **no Moe new-component gate**, just structural review).

| Need | Component | Path |
|---|---|---|
| File upload (drag/drop, type + size guard, file cards, progress/error) | `FileUpload` | [`src/components/FileUpload/index.tsx`](../../src/components/FileUpload/index.tsx) — props: `accept`, `maxSizeMB`, `multiple`, `label`, `description`, `helperText`, `error`, `onChange(files)` |
| Method selector | `RadioGroup` (`variant="card"` like the Online doc tiles) | `src/components/RadioGroup` |
| Supporting info ("Who can certify", full lists) | `Modal` (`size="medium"`, content-rich, no confirm pattern — per `component-selection.md` "Dialog vs Modal") | [`src/components/Modal/index.tsx`](../../src/components/Modal/index.tsx) |
| Open the modal | `TextButton` (`startIcon="circle-info"`, matches the "Need help?" pattern already in `StepIDV`) | `src/components/TextButton` |
| Grouped collapsible detail inside the modal (certifiers / acceptable docs / how to certify) | `Accordion` (set, multi-open) | `src/components/Accordion` |
| Inline guidance / requirements callout | `Alert` (`severity="info"`) and/or `Card variant="border"` | existing |
| Confirmation for the "later" path | `Checkbox` | existing |

> **Rem-first + token-only** styling throughout. Reuse the exact `Box` panel styling already used by the Online branch (`borderRadius: theme.shape.lg`, `border 1px solid border.default`, `background.paper`, responsive `px/pt/pb`) so the two branches look identical.

---

## 4. Proposed UX

### 4.1 "Other options" branch layout (replaces the current checkbox box)

```
How would you like to verify?  ( ) Online   (•) Other options
────────────────────────────────────────────────────────────
[ Panel: background.paper, bordered — same chrome as Online ]

  Choose how to send your ID
  ┌────────────┐  ┌────────────┐  ┌────────────────────┐
  │ 📷 Selfie  │  │ 📄 Certified│  │ 🕓 I'll provide    │
  │    ID      │  │    ID       │  │    this later      │
  └────────────┘  └────────────┘  └────────────────────┘
        (RadioGroup variant="card", direction row → wraps on mobile)

  ── if "Selfie ID" ──────────────────────────────────────
  [Alert info] What you'll need (top-level guidance, 3 steps)
     1. A clear photo/scan of your ID (front AND back for a
        licence).
     2. A selfie of you holding that ID — face + writing legible.
     3. Send the original photo files (not inside a PDF).
  [TextButton: "Which documents can I use?"] → opens Modal
  [FileUpload  multiple  accept="image/*"  maxSizeMB=10
     label="Upload your selfie ID"
     description="JPG or PNG. Include front and back of a licence."]

  ── if "Certified ID" ───────────────────────────────────
  [Alert info] What you'll need
     • A certified copy of ONE primary photo ID, OR
     • ONE non-photo ID + TWO proof-of-address documents.
     • A certifier must write "certified true copy of the
       original", sign, date, and add their stamp / reg number.
  [TextButton: "Who can certify & which documents?"] → opens Modal
  [FileUpload  multiple  accept="image/*,application/pdf"
     maxSizeMB=10  label="Upload your certified documents"
     description="Photo, scan or PDF. Make sure it's readable."]

  ── if "I'll provide this later" ─────────────────────────
  [Alert info] You can upload your ID later via "Upload files" in
     Member Online, and we'll send you email reminders. We won't
     be able to process your application until we receive it.
  [Checkbox] "I understand I need to provide identity documents
     before my application can be processed."
─────────────────────────────────────────────────────────────
```

### 4.2 Validation (`stepIsValid(6)` for `verifyMethod === 'other'`)

| Sub-method | Valid when |
|---|---|
| `selfie` | ≥ 1 file uploaded |
| `certified` | ≥ 1 file uploaded |
| `later` | confirmation checkbox checked |
| (none selected) | invalid |

The existing step-level `Alert` (lines ~373–378) error copy gets generalised to cover all three.

### 4.3 Modal content (supporting info — kept off the page)

Title: **Proof of identity — acceptable documents**, `Modal size="medium"`. Body uses an `Accordion` so each section is collapsible.

> **Accordion API:** `<Accordion items={[{ id, title, content }]} />`. `content` is a `ReactNode` (pass JSX for lists). The **default** variant is already multi-open — do **not** pass `variant="exclusive"`. `Modal` renders its own close button when `title` is set; an explicit `actions={<Button label="Close" onClick={onClose}/>}` footer is optional.

Accordion sections (`items`):

1. **Which documents can I use?**
   - *Selfie ID* — one of: current AU/foreign driver's licence (front + back); current AU state/territory photo ID or Proof of Age card; passport (signature + details page; AU passports may be expired ≤ 2 years).
   - *Certified ID* — one primary photo ID (as above) **OR** one secondary doc (birth/citizenship certificate, Services Australia pension/health-care card) **AND** two address docs dated recently (Services Australia benefit notice or ATO notice ≤ 12 months; council rates, electricity/gas ≤ 3 months).
2. **Who can certify my documents?** — JP, Commissioner for Declarations, legal practitioner, police officer, pharmacist, medical practitioner, accountant (2+ yrs), bank/financial-institution officer (2+ yrs), Australia Post employee (2+ yrs continuous), etc. (Render the full Australia list + the "if overseas" list from factsheet p.3.)
3. **How should a certified copy look?** — certifier writes/stamps "certified true copy of the original", signs, dates, adds name/title/address + evidence of status (registration number / stamp / employer).
4. **Not in English?** — use a NAATI-accredited translator (`naati.com.au`).
5. **What's NOT accepted** — bank/credit/debit cards, private health cards, library cards. Digital driver's licences only accepted in person at a Member Centre.

> Lisa to own the exact copy; keep it tight and factsheet-faithful. This is prototype copy, not legal sign-off.

---

## 5. State model changes

Keep the new state **local to `LifetimePensionFlow.tsx`** for the prototype (mirrors how `verifyMethod` / `otherOptionsConfirmed` already live there). Do **not** force it into `IDVState` (that module is about the *electronic* check and is shared by other flows — don't pollute it).

Replace `otherOptionsConfirmed` with:

```ts
type OtherIdMethod = 'selfie' | 'certified' | 'later' | '';

interface OtherIdState {
  method: OtherIdMethod;
  files: File[];          // selfie or certified uploads (prototype: not persisted)
  laterConfirmed: boolean;
}
```

- `File[]` is not JSON-serialisable, so it **won't survive draft autosave** — acceptable for the prototype. Note this explicitly; if persistence is needed later, store file metadata only and re-prompt on resume.
- Thread `otherIdState` (method **+ file names**) into `StepReview` and `StepSuccess` the same way `verifyMethod` is today, so the review/success screens describe what the user chose ("Certified ID: licence-front.jpg, licence-back.jpg", or "Provide identity later").

### Extraction into two new components (required)

The "Other options" branch is too large to inline (see the file-size note in §6.1). Build it as:
- `src/features/lifetime-pension/steps/VerifyOtherOptions.tsx` — props `state: OtherIdState`, `onChange: (s: OtherIdState) => void`, `showValidation: boolean`. Renders the method selector + per-method guidance + uploads/checkbox, and owns the modal open/close state.
- `src/features/lifetime-pension/steps/IdDocumentsModal.tsx` — props `open: boolean`, `onClose: () => void`. The factsheet `Modal` + `Accordion` (§4.3).

---

## 6. File-by-file change list

| # | File | Change |
|---|---|---|
| 1 | `src/features/lifetime-pension/types.ts` | Add `OtherIdMethod` + `OtherIdState`. |
| 2 | `src/features/lifetime-pension/constants.ts` | Add `initialOtherIdState`; (optional) `OTHER_ID_METHOD_OPTIONS` for the card RadioGroup; modal copy constants if not co-located. |
| 3 | **`src/features/lifetime-pension/steps/VerifyOtherOptions.tsx`** (new) | The method selector + per-method guidance + `FileUpload` + later-checkbox. Reuses the Online panel chrome. |
| 4 | **`src/features/lifetime-pension/steps/IdDocumentsModal.tsx`** (new) | `Modal` + `Accordion` rendering the factsheet detail (§4.3). |
| 5 | `src/features/lifetime-pension/LifetimePensionFlow.tsx` | Replace `otherOptionsConfirmed` useState with `otherIdState` (`initialOtherIdState`); in step-6 `other` branch render `<VerifyOtherOptions state={otherIdState} onChange={setOtherIdState} showValidation={showValidation} />` (drop the inline panel); update `stepIsValid(6)` (§4.2); pass an `otherIdSummary` to `StepReview` and `otherIdMethod`/`verifyMethod` to `StepSuccess` (§2.1); broaden the step-6 error `Alert` copy. |
| 6 | `src/features/lifetime-pension/steps/StepReview.tsx` | Add prop for the other-id summary; render method **+ uploaded file names** (or "Provide identity later") in the existing "Identity verification" `DescriptionList` (replaces the hardcoded `'other'` string, lines ~318–334). |
| 7 | `src/features/lifetime-pension/steps/StepSuccess.tsx` | Add prop(s) to know the `other` method; replace the hardcoded "drivers licence / Medicare / passport" pending notice (lines ~107–136) with the §2.1 copy for `selfie`/`certified`/`later`; suppress the electronic `IdvModal` button on the `other` path. |
| 8 | Storybook | Add/extend a story for the Verify-identity step covering: Selfie selected, Certified selected, Later selected, validation error, modal open. (Lisa.) |

> No `src/features/idv/**` edits required. No new dependency. No theme change.

### 6.1 Suggested `VerifyOtherOptions.tsx` skeleton (composition only)

Verified component contracts (read these — they are exact):
- **`RadioGroup`** is controlled: `value: string` + `onChange: (value: string) => void`. For card tiles: `variant="card" direction="row" cardDirection="column"`. `RadioOption = { value; label; description?; icon?; disabled? }`. It has its own `error` + `errorMessage` props.
- **`FileUpload`** `onChange: (files: File[]) => void`; show the "file required" message via its `error?: string` prop. It already enforces `accept`/`maxSizeMB` internally and shows its own rejection message.
- **`TextButton`** props used here: `label`, `startIcon`, `hideIcon`, `onClick` (see `StepIDV.tsx` line ~274 for the exact "Need help?" usage).
- **Icons** are Font Awesome base names served from `public/icons/font-awesome/solid/<name>-solid-full.svg`; a missing name **silently falls back to a house glyph** (no error). Use only verified names. The three tile icons below are confirmed on disk: `user`, `file-signature`, `calendar`. `circle-info` (modal trigger) is also confirmed. If you want a different icon, `Glob` `public/icons/font-awesome/solid/` first.

```tsx
// props: { state: OtherIdState; onChange: (s: OtherIdState) => void; showValidation: boolean }
// 1. RadioGroup variant="card" direction="row" cardDirection="column"
//    legend="Choose how to send your ID"
//    options: { value:'selfie',    label:'Selfie ID',          icon:'user' }
//             { value:'certified', label:'Certified ID',       icon:'file-signature' }
//             { value:'later',     label:"I'll provide this later", icon:'calendar' }
//    onChange(value) → reset files/laterConfirmed when method switches:
//      onChange({ method: value as OtherIdMethod, files: [], laterConfirmed: false })
// 2. Branch on state.method:
//    selfie    → <Alert severity="info"> 3-step guidance
//                + <TextButton label="Which documents can I use?" startIcon="circle-info" hideIcon={false} onClick={openModal}/>
//                + <FileUpload multiple accept="image/*" maxSizeMB={10}
//                    label="Upload your selfie ID"
//                    error={showValidation && state.files.length === 0 ? 'Upload at least one file.' : undefined}
//                    onChange={(files)=>onChange({...state, files})}/>
//    certified → <Alert severity="info"> requirements + same TextButton (label "Who can certify & which documents?")
//                + <FileUpload multiple accept="image/*,application/pdf" maxSizeMB={10} ... same error/onChange />
//    later     → <Alert severity="info"> Member Online upload + email-reminder copy
//                + <Checkbox checked={state.laterConfirmed} onChange={(c)=>onChange({...state, laterConfirmed:c})}
//                    label="I understand I need to provide identity documents before my application can be processed."/>
// 3. <IdDocumentsModal open={modalOpen} onClose={closeModal}/> rendered once at the bottom (both TextButtons open the same modal).
// Wrap the whole thing in the bordered panel Box (chrome from §2.1) so it matches Online.
```

> **File-size note:** `LifetimePensionFlow.tsx` is already ~420 lines (a pre-existing state, larger than the 200-line guide). **Do not refactor the whole flow.** Just swap the inline `other` panel for `<VerifyOtherOptions/>` and keep the two new files small. Each *new* component must stay ≤ 200 lines and each function ≤ 40 lines.

---

## 7. Accessibility notes (for Flanders / Runtime Tester)

- Method `RadioGroup` must have a `legend` ("Choose how to send your ID"); cards keep the radio as the accessible control.
- `FileUpload` already wires `aria-describedby` for error/helper and uses a labelled input — confirm the `label` is set and the drop target has an accessible name.
- **Modal focus:** opening the "Who can certify" modal moves focus in; Escape closes; focus returns to the triggering `TextButton`. Verify with the Accessibility Runtime Tester.
- Step-level validation error renders in a single `<Alert>` **directly above `<StepperActions>`** (matches the stepped-form error convention already followed at lines ~373–378) — do not scatter field errors that scroll out of view.
- Uploaded-file removal must be keyboard operable (FileCard `onRemove`).
- Don't trap a focusable element under `aria-hidden`; the modal handles this via MUI Dialog.

---

## 8. Pipeline & sign-off

Composition-only change, but it touches a user-facing flow, file handling, and adds a modal — run the relevant gates:

1. **Moe** — confirm no new library component is warranted (FileUpload/Modal/Accordion all exist); approve the two new *feature* files' structure.
2. **Lenny** — build (§6).
3. **Chalmers** — token-only styling, no `any`, component ≤ 200 lines (hence the extraction in §5), functions ≤ 40 lines.
4. **Flanders** — a11y per §7; `/conformanceReport` on the new modal + upload branch.
5. **Marge** — the "Other options" panel must be visually indistinguishable in chrome from the Online panel.
6. **Lisa** — modal copy + Storybook stories.
7. **Willie** → **Frink** — only after the **Foundation sign-off** block is filled.
8. **Designer (Adam)** — approve branch name before Frink branches; review PR before merge.

---

## 9. Designer decisions (resolved 2026-06-24)

All open questions are settled — see the **Decisions** block at the top of this doc. For reference:

1. **Upload limits** — Selfie = `image/*` only (rejects PDF); Certified = `image/*` + `application/pdf`. 10 MB/file, multiple allowed. ✅
2. **"Provide later" copy** — soft tone: upload later via *Upload files* in Member Online + email reminders, but application not processed until ID is received. Checkbox still required. ✅
3. **Review screen** — method **+ file names**. ✅
4. **Real backend** — prototype only; files in memory, no endpoint, no draft-resume persistence. ✅
5. **Change-of-name / signing-for-another** — out of scope. ✅

---

## 10. Verification (how to test end-to-end)

Run from the repo root (`c:\Users\adama\Sites\Foundation`):

```bash
npm run lint           # ESLint — must pass (banned typography variants, token rules)
npx tsc --noEmit       # TypeScript strict — no errors
npm run storybook      # open http://localhost:6006
```

Manual pass in Storybook (or the running app's Lifetime Pension flow at `/member-online` → Set up income accounts → Lifetime Pension, advance to step 7 "Verify your identity"):

1. Select **Other options** → the new panel renders with identical chrome to the **Online** panel (Marge check).
2. **Selfie ID:** Next is blocked until a file is attached; attaching a **PDF is rejected** (FileUpload internal error), a JPG/PNG is accepted → Next enabled.
3. **Certified ID:** Next blocked until a file (image **or PDF**) is attached.
4. **I'll provide this later:** Next blocked until the confirmation checkbox is checked; Alert shows the Member-Online-upload + email-reminder copy.
5. Open the **"Which documents can I use?" / "Who can certify"** modal → factsheet content (Accordion sections) renders; **Escape** and the close button dismiss it; **focus returns** to the triggering `TextButton`.
6. Continue with nothing selected → the single step-level `<Alert severity="error">` appears **directly above** `<StepperActions>`.
7. Reach the **Review** step → "Identity verification" row shows the chosen method **+ file names** (e.g. "Certified ID: licence-front.jpg, licence-back.jpg") or "Provide identity later".
8. **Submit** → the **Success** screen shows the correct `other`-path messaging (documents received / provide-later reminder) and does **not** offer the electronic IDV modal button.
9. **Keyboard-only pass:** tab to the method tiles, select with arrow keys, tab into the uploader, add and **remove** a file via keyboard, open/close the modal — all operable (Accessibility Runtime Tester).

> Reminder: uploads are prototype-only and held in memory; they will **not** survive a draft resume (`File[]` is non-serialisable) — expected.

---

## 11. Conflict risk

| File | Risk | Note |
|---|---|---|
| `LifetimePensionFlow.tsx` | **Medium** | Actively evolving flow; step indices and review/success wiring are touched. Rebase before merge. |
| `idv/*` | **Low** | No changes. |
| New `VerifyOtherOptions.tsx` / `IdDocumentsModal.tsx` | **Low** | New files. |
| `StepReview.tsx` | **Low** | Additive prop + one render swap (the hardcoded `'other'` string). |
| `StepSuccess.tsx` | **Medium** | More than additive — the pending-IDV copy is hardcoded for the electronic path and must be branched for `other` (and the `IdvModal` button suppressed). See §2.1. |
