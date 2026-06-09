---
name: conformanceReport
description: 'Run an evidence-based WCAG 2.2 AA conformance review for a specific Foundation component and produce a report-ready outcome. Use for requests like: Flanders review this component, run conformance report, component accessibility sign-off, or /conformanceReport.'
argument-hint: 'Component name, file path, Storybook story path, and states/variants to review'
---

# Conformance Report - Evidence-Backed Component Review

## Purpose

Produce a repeatable, non-speculative accessibility conformance outcome for a component.

This skill is strict:
- No inferred issues without evidence.
- No made-up ticket IDs.
- Every finding must cite a source.
- Every WCAG SC reference in report output must be linked to the W3C criterion URL.

WCAG link formatting requirement (Storybook/MDX output):
- Use HTML anchors so links open in a new tab:
  - `<a href="https://www.w3.org/TR/WCAG22/#contrast-minimum" target="_blank" rel="noopener noreferrer">1.4.3</a>`
- Apply this to every SC mention in tables and prose (for example: findings, pass outcomes, conformance matrix, standard test set).

---

## Inputs Required

1. Component source file(s)
2. Story file(s)
3. Variants/states in scope
4. Brand/theme context in scope

If any input is missing, mark scope as partial before reviewing.

---

## Required Review Steps

1. Scope lock
- Confirm exact files and scope.
- List what is out of scope.

2. Standard conformance test set (required)
- Evaluate the component against a fixed set of explicit checks.
- Each check must include:
  - Test ID
  - WCAG mapping
  - Test method
  - Acceptance criteria
  - Observed result
  - Status (`PASS` | `FAIL` | `NOT TESTED`)
- Tooling (Vitest, Storybook, Lighthouse, axe, scripts) may assist execution, but tools are evidence sources, not verdicts.
- Never claim conformance from a tool summary alone.

3. Code evidence
- Review component implementation and style helpers for:
  - Semantics (native element role and state)
  - Keyboard behavior
  - Focus visibility/focus styling
  - Name/role/value exposure
  - Loading/disabled interaction model
  - Non-text contrast and text contrast assumptions

4. Manual evidence status
- If manual testing was not performed, explicitly record "Not tested".
- Required manual areas for full sign-off:
  - Keyboard traversal and activation
  - Screen reader checks (NVDA or VoiceOver)
  - Visual contrast checks in running UI using an explicit matrix

5. Contrast matrix review
- Contrast review is mandatory for interactive components.
- Do not mark contrast criteria as PASS without a completed matrix.
- For button-like controls, test at minimum:
  - Backgrounds: `default`, `paper`, `elevated`
  - Modes: `light`, `dark`
  - States: `resting`, `hover`, `active`, `focus-visible`
  - Variants: every variant in scope
  - Reversed: include all reversed variants/states on their intended brand surfaces
- Record both:
  - Text contrast (`1.4.3`)
  - Non-text contrast / focus indicator contrast (`1.4.11`, `2.4.13` where relevant)
- If a component has special surfaces or semantic backgrounds beyond the default matrix, add them explicitly to scope.

**State-change contrast (SC 1.4.11 — mandatory for stateful controls)**

SC 1.4.11 has two distinct obligations. Both must be measured explicitly:

1. **Component boundary contrast** — the visual boundary of each interactive element (e.g. its border) against the adjacent surface. Already covered by the per-state matrix above.

2. **State-change contrast** — when colour is the *only* visual signal distinguishing two states (e.g. selected vs unselected), the difference in visual presentation *between those states* must itself meet 3:1. This is separate from per-state measurements.

Rules for state-change contrast:
- For every pair of states where the visual difference is conveyed by colour alone (no simultaneous change in weight, border thickness, shape, icon, underline, or other non-colour cue), measure the contrast between the **selected-state appearance and the unselected-state appearance**.
- "Colour alone" means the only visual difference is fill colour, border colour, or text colour — with no accompanying weight change, border-width change, or other non-colour signal present.
- Measurements required per surface × mode combination:
  - Selected background vs unselected background
  - Selected border vs unselected border (at the shared seam between adjacent buttons, if applicable)
- If either measurement is below 3:1 AND no non-colour differentiator is present, record it as a FAIL against SC 1.4.11.
- If a non-colour cue is present (e.g. `fontWeight: 700` on selected, or `borderWidth: 2px` on selected), state-change contrast is not required — document which non-colour cue satisfies it.

Add a dedicated `ST-STATE-CHANGE-01` row to the standard test set:
- Test ID: `ST-STATE-CHANGE-01`
- WCAG SC: `1.4.11`
- Check: State-change visual differentiation — selected vs unselected (or on vs off)
- Acceptance criteria: Either (a) a non-colour cue distinguishes the states, OR (b) the contrast between selected and unselected visual presentation is ≥ 3:1 on every in-scope surface and mode
- Observed result: document whether a non-colour cue is present, and if not, record the measured between-state contrast values

6. Findings classification
- `FAIL`: confirmed accessibility failure that must be fixed.
- `WARN`: confirmed risk/defect with lower severity or partial uncertainty.
- `PASS`: criterion evaluated and satisfied by evidence.
- `NOT TESTED`: criterion not yet evaluated by required method.

---

## Evidence Rules

Each finding must include:
1. Severity (`FAIL` or `WARN`)
2. WCAG criterion mapping
3. Evidence source type (`code`, `automated-test`, `manual-test`)
4. Concrete source reference (file path and/or command output)
5. Clear remediation

If a claim cannot satisfy all five, do not list it as a finding.

Audit-grade rule:
- Do not use "tool passed" as the primary evidence statement.
- Primary evidence must be assertion-based outcomes from the standard test set (criteria + observed result).
- Tool output is supporting traceability evidence only.

---

## Output Format (Use this structure)

### Review metadata
- Component:
- Date: use `dd / mm / yyyy`
- Reviewer:
- Scope:
- Overall status: `green` | `warning` | `error`

Outcome display rule (Storybook/MDX reports):
- Render outcome/status values with emoji + color for rapid scanning.
- Preferred conventions:
  - PASS / Supports: `<span style={{ color: 'green' }}>✅ Pass</span>` or `<span style={{ color: 'green' }}>✅ Supports</span>`
  - FAIL: `<span style={{ color: 'red' }}>❌ Fail</span>`
  - WARN: `<span style={{ color: 'orange' }}>🟠 Warning</span>`
  - NOT TESTED: `<span style={{ color: 'orange' }}>🟡 Not tested</span>`
- Apply this consistently in findings, standard test set status cells, conformance matrix status cells, and status decision summaries.

### Evidence summary
- Standard test set execution status:
- Code review:
- Manual keyboard:
- Manual screen reader:
- Manual contrast:

### Standard test set results
| Test ID | WCAG SC | Check | Method | Acceptance criteria | Observed result | Status | Evidence |
|---|---|---|---|---|---|---|---|

WCAG SC cell rule:
- SC values must be linked citations, not plain text numbers.

Minimum required checks for interactive controls:
- `ST-SEMANTICS-01`: Native semantic role/state mapping and accessible name path (`1.3.1`, `4.1.2`)
- `ST-KEYBOARD-01`: Keyboard activation and disabled/loading interaction behavior (`2.1.1`, `4.1.2`)
- `ST-FOCUS-01`: Focus-visible indicator definition and contrast threshold (`2.4.7`, `2.4.13`)
- `ST-SIZE-01`: Target size minimum check (`2.5.8`)
- `ST-CONTRAST-01`: Text/non-text/focus contrast matrix across in-scope modes/surfaces/states (`1.4.3`, `1.4.11`, `2.4.13`)
- `ST-STATE-CHANGE-01`: State-change visual differentiation — selected/active/on vs unselected/inactive/off. Required for any stateful control where states are distinguished by colour. Either a non-colour cue is present, or between-state contrast ≥ 3:1 on all surfaces/modes. (`1.4.11`)
- `ST-SCREENREADER-01`: Screen reader announcement/state behavior (mark `NOT TESTED` if not executed) (`4.1.2`)

### Contrast matrix
| Surface | Mode | Variant | State | Text contrast | Non-text contrast | Result | Evidence |
|---|---|---|---|---|---|---|---|

Alternative summary matrix (allowed for Storybook component reports):
| Mode | Variant | Surface | Measured text contrast | Measured non-text contrast | Measured focus-visible contrast | Outcome |
|---|---|---|---|---|---|---|

When using the summary matrix, include both of the following:
- A line that states values are minimum/representative outcomes aggregated from the state-level matrix.
- A line that explicitly lists every state included in the summary (for example: `resting`, `hover`, `active`, `focus-visible`).
- A `State coverage results` table that reports per-state measured combinations, minima, failure counts, and outcome for each included state.
- For Storybook MDX reports, render four accordion sections for state coverage (`resting`, `hover`, `active`, `focus`/`focus-visible`).
- Each accordion must include a table with rows across mode, variant, and surface for that state.
- Above the accordions, include a summary table showing items reviewed, passes, and issues per state.

### Findings
| ID | Severity | WCAG SC | Evidence type | Source | Issue | Remediation |
|---|---|---|---|---|---|---|

### Pass outcomes
| WCAG SC | Result | Evidence |
|---|---|---|

### Not tested
- List criteria or checks that remain untested.
- If contrast matrix is incomplete, list every missing surface/mode/variant/state combination.

### Status decision
- Why the status is green/warning/error.

### Notes on reproducibility
- If a report is scoped to a subset (for example, primary-only), the command must encode that scope.
- Example: `npx tsx .\scripts\button-contrast-review.ts --colors=primary`.

---

## Storybook Report Integration

### File and folder structure (mandatory)

**Rule: every component gets its own named subfolder. Both the stories file AND the conformance report MDX go inside that subfolder together. Never create a subfolder for only one of them.**

#### Step-by-step (follow this exactly)

1. Check whether `src/stories/components/ComponentName/` already exists as a folder.
   - If it does, skip to step 3.
   - If it does NOT exist, create it.

2. Move `src/stories/components/ComponentName.stories.tsx` INTO the new subfolder:
   ```
   src/stories/components/ComponentName/ComponentName.stories.tsx
   ```
   Then update every relative import inside that file — add one extra `../` level to each import.

3. Create `WCAGConformanceReport.mdx` INSIDE the same subfolder, alongside the stories file:
   ```
   src/stories/components/ComponentName/WCAGConformanceReport.mdx
   ```

#### Before and after (single-file component example)

**Before:**
```
src/stories/components/
  ComponentName.stories.tsx     ← flat file, no subfolder
```

**After:**
```
src/stories/components/
  ComponentName/                ← NEW folder named after the component
    ComponentName.stories.tsx   ← stories MOVED here (title prop unchanged)
    WCAGConformanceReport.mdx   ← conformance report CREATED here
```

**What NOT to do — these are both wrong:**

❌ Report alongside the stories file at the flat level (no subfolder):
```
src/stories/components/
  ComponentName.stories.tsx
  WCAGConformanceReport.mdx     ← WRONG — not in a subfolder
```

❌ Report in a subfolder but stories left at the flat level (split structure):
```
src/stories/components/
  ComponentName.stories.tsx     ← WRONG — stories not moved
  ComponentName/
    WCAGConformanceReport.mdx   ← WRONG — report is alone in the folder
```

#### Import path note

Moving into a subfolder adds one level — update all relative imports accordingly:
- `../../components/Foo` → `../../../components/Foo`

#### Storybook sidebar result

The component must remain discoverable at its existing sidebar path. Moving stories into a subfolder does not change the sidebar entry as long as the `title` in the stories file is unchanged.

```
Form Components
  ComponentName               ← unchanged entry (from ComponentName.stories.tsx title)
    Playground                ← story
    Default                   ← story
    WCAG Conformance Report   ← nested MDX page
```

### Report page rules

When updating a component WCAG report page:
1. Do not add a top-of-page status banner.
2. Use the Alert in the `Findings` section to communicate the current status decision.
3. Keep `Findings` separate from `Not tested`.
4. Place `Findings` directly after report metadata.
5. Never label "Not tested" items as open issues.
6. Include standard test set results with explicit acceptance criteria and observed outcomes.
7. Include supporting command/tool traceability where relevant, but never as the only evidence.
7a. Ensure command arguments reflect report scope (for example, color filters) so totals can be reproduced exactly.
8. Include the contrast matrix, or explicitly state that the matrix is incomplete.
9. Publish the measured contrast outcomes in the Storybook report itself - not just in terminal output or local notes.
10. Ensure every WCAG SC citation is a W3C link that opens in a new tab (`target="_blank" rel="noopener noreferrer"`).
