---
name: ui-ux-pro-max
description: 'Design decisions, visual consistency audits, accessibility reviews, and UX guidance for the Foundation design system. Use when checking colour systems, spacing, typography scale, token usage, contrast ratios, WCAG compliance, keyboard navigation, ARIA patterns, MUI theme conventions, or reviewing component visual consistency. Triggers: design review, visual audit, colour check, accessibility, a11y, WCAG, token audit, spacing review, typography check, contrast, focus management, keyboard nav, UX guidance.'
argument-hint: 'Describe the design or accessibility concern, component to review, or UX decision needed'
---

# UI/UX Pro Max — Design, Accessibility & Visual Consistency

## Purpose

Three modes in one skill:
1. **Design mode** — colour, spacing, typography, MUI token decisions
2. **A11y mode** — WCAG 2.2 AA compliance, keyboard nav, focus management, ARIA
3. **Visual consistency mode** — audit components against the established system

---

## Mode 1 — Design Decisions

### Colour

Only MUI theme tokens. Never hardcode.

| Token pattern | Example |
|---|---|
| `'primary.main'` | Primary brand action colour |
| `'secondary.main'` | Secondary accent |
| `'text.primary'` | Body text |
| `'text.secondary'` | Supporting text |
| `'background.paper'` | Card/surface background |
| `'background.default'` | Page background |
| `'error.main'` / `'warning.main'` / `'success.main'` / `'info.main'` | Status colours |
| `'divider'` | Borders and rules |

Source of truth: `src/app/themes/factory.ts` and `src/app/themes/semantic.ts`.

### Spacing

- Use `theme.spacing()` (multiples of the base unit) wherever possible
- Where `theme.spacing()` cannot be used, write explicit `rem` values
- Never use `px` for spacing that scales with text
- `sx` shorthand: `p: 2` = `theme.spacing(2)`, `gap: 1.5` etc.

### Typography

Only these variants are valid in this design system:

| Variant | Size | Use case |
|---|---|---|
| `display-1` – `display-5` | 2.5rem–5rem down to 1.75rem–3rem | Hero headings — responsive via `clamp()` |
| `h1` – `h2` | Responsive | Semantic headings — heading font (serif) |
| `h3` | 1.75rem | Heading font (serif) |
| `h4` – `h6` | 1.5rem – 1rem | Body font (sans-serif) |
| `lead` | 1.25rem | Intro paragraphs, hero subtitles |
| `body` | 1rem | **Default for all body text** |
| `small` | 0.875rem | Secondary text — use sparingly |
| `caption` | 0.75rem | Metadata only — use very sparingly |

**Banned variants:** `body1`, `body2`, `subtitle1`, `subtitle2`, `button`, `overline` — they are disabled.

**Default to `body`.** Only drop to `small` or `caption` when the content is genuinely supplementary.

Do not override typography inside components with `sx` font props — components have typography built in.

### `sx` Access Patterns

Pick one pattern per component and stay consistent:

| Pattern | When to use |
|---|---|
| `'primary.main'` string shorthand | Static colour tokens — always prefer this |
| `(t) => t.palette.primary.main` | Conditional logic, computed values |
| `theme.palette.primary.main` object notation | **Never use inside `sx`** |

Never mix patterns in the same component.

---

## Mode 2 — Accessibility (WCAG 2.2 AA)

### Contrast

- Normal text (< 18pt / < 14pt bold): minimum **4.5:1**
- Large text (≥ 18pt / ≥ 14pt bold): minimum **3:1**
- UI components and graphical objects: minimum **3:1**
- `text.primary` on `background.default` must pass — verify in theme tokens if changed

### Keyboard Navigation

Every interactive element must be:
- Reachable via `Tab`
- Activatable via `Enter` / `Space`
- Escapable via `Escape` (for overlays, menus, dialogs)

Focus order must follow visual/DOM order. Never use `tabIndex > 0`.

### Focus Management

- Focus rings must be visible at all times — never `outline: none` without a visible replacement
- Dialogs, Drawers, and Modals must trap focus while open and return focus to the trigger on close
- Skip links (`SkipLinks` component) are required on every page — include at the top of the DOM

### ARIA

- Semantic HTML first — `<button>`, `<nav>`, `<main>`, `<h1>`–`<h6>`, `<label>`, `<fieldset>`
- ARIA only when a native element cannot serve the purpose
- Every form input needs an associated `<label>` (explicit `htmlFor` or `aria-label`)
- Status messages: `role="status"` (polite) or `role="alert"` (assertive)
- Icons with meaning: `aria-label` on the icon button or `aria-hidden` on purely decorative icons
- Loading states: `aria-busy="true"` on the container being updated

### Common Violations to Flag

| Pattern | Fix |
|---|---|
| `onClick` on a `<div>` | Use `<button>` or `role="button"` + `onKeyDown` |
| Missing `alt` on `<img>` | Add descriptive `alt` or `alt=""` for decorative |
| Colour as the only differentiator | Add text label, pattern, or icon |
| Placeholder as label substitute | Add visible `<label>` |
| `aria-label` duplicating visible text | Remove — screen readers read both |
| `tabIndex={1}` or higher | Use `tabIndex={0}` only |

---

## Mode 3 — Visual Consistency Audit

### What to Check

1. **Token compliance** — all colours, spacing, and shadows use theme tokens, not hardcoded values
2. **Typography** — only the 14 valid variants; no overrides inside components
3. **Sizing** — font sizes and component sizes using `rem`; line heights unitless
4. **Spacing rhythm** — consistent use of `theme.spacing()` multiples; no magic numbers
5. **Component alignment** — does the new component look cohesive alongside existing ones in Storybook?
6. **`sx` pattern consistency** — single pattern per component; no mixed access notation

### Audit Procedure

1. Spawn Explore (medium) to scan `src/components/` for token usage patterns across existing components
2. Compare the new component's `sx` props against those patterns
3. Check `src/app/themes/factory.ts` to verify token names are correct
4. Flag any divergence with specific line-level notes and suggested token replacements
5. Sign off or return to Lenny with a remediation list

### Marge's Boundary

- **Moe** — structural and API correctness (does this component belong? are props named right?)
- **Marge / this skill** — visual correctness (does it look right? are tokens used correctly?)

---

## References

- Typography scale: [`docs/guidelines/typography.md`](../../../docs/guidelines/typography.md)
- Component inventory: `codemap.json` / `CODEMAP.md` (generated). When-to-use: [`docs/guidelines/component-selection.md`](../../../docs/guidelines/component-selection.md)
- Theme source: `src/app/themes/factory.ts`, `src/app/themes/semantic.ts`
- Brand configs: `src/app/themes/brands/`
