---
name: frontend-design
description: 'Build UI components and pages for the Foundation design system. Use when creating new components, implementing pages, wiring up props, or generating polished production-grade React/MUI/Next.js code. Triggers: build component, implement UI, create page, generate component, wire up props, new button/card/form/layout.'
argument-hint: 'Describe the component or page to build, including variants, props, and any relevant context'
---

# Frontend Design — Foundation Component Builder

## Purpose

Generate polished, production-grade React components and pages for the Foundation design system.  
Uses MUI, Next.js App Router, TypeScript strict mode, and the Foundation component library.

---

## Before You Write a Single Line

1. **Check the code map (`codemap.json` / `CODEMAP.md`)** — the generated inventory of every component. Read [`docs/guidelines/component-selection.md`](../../../docs/guidelines/component-selection.md) for which to choose.  
   If a Foundation component covers the need, use it. Do not reach for raw MUI primitives.

2. **Spawn Explore (medium)** to audit `src/components/` for similar existing patterns, prop naming conventions, and `sx` usage.

3. **Moe must approve new components before build starts.** If the request is a new component (not a page or composition), flag it.

---

## Implementation Rules

### TypeScript
- Strict mode — no `any`, no implicit types
- All component props explicitly typed with interfaces
- Export the props interface alongside the component

### Styling
- `sx` prop with MUI theme tokens **only** — no hardcoded colours, spacing, or shadows
- No `style={{}}` inline props
- Static token access: `'primary.main'` string shorthand
- Conditional logic only: `(t) => t.palette.primary.main`
- Never: `theme.palette.primary.main` object notation inside `sx`
- Layout props (`alignItems`, `justifyContent`, etc.) go inside `sx`, not as direct component props

### Sizing
- Font sizes → `rem`
- Line heights → unitless (e.g. `1.5`, never `'24px'`)
- Component sizes containing text → `rem`
- Icon sizes → `rem`
- Non-text structural values (borders, outlines, box-shadows) → `px` is acceptable
- Derive from `theme.spacing()` or `theme.typography` where possible

### Typography
Only these variants are valid. All others are disabled in this design system.

| Variant | Use |
|---|---|
| `display-1` – `display-5` | Hero / large display headings |
| `h1` – `h6` | Semantic headings |
| `lead` | Intro paragraphs, hero subtitles |
| `body` | Default body text |
| `small` | Secondary / supporting text — use sparingly |
| `caption` | Metadata only — use very sparingly |

Never use: `body1`, `body2`, `subtitle1`, `subtitle2`, `button`, `overline`.

### Component Size Limits
- Functions ≤ 40 lines
- Components ≤ 200 lines — extract variant maps and size constants to module-level before the file grows

### Foundation Components First
Always prefer Foundation components over raw MUI:

| Need | Use |
|---|---|
| Action | `Button`, `IconButton`, `TextButton` |
| Input | `TextField`, `Select`, `Checkbox`, `RadioGroup`, `Switch`, `TextArea` |
| Feedback | `Alert`, `Snackbar`, `Spinner`, `Skeleton` |
| Navigation | `Breadcrumb`, `Tabs`, `Pagination`, `Menu` |
| Overlay | `Dialog`, `Modal`, `Drawer`, `Tooltip` |
| Layout | `Card`, `Divider`, `Accordion`, `ExpandableItem` |
| Media | `Icon`, `HeroIcon`, `Logo` |
| Forms | `MoneyField`, `PercentageField`, `DatePicker`, `DateRangePicker`, `FileUpload` |

---

## Procedure

### For a new page or composition:
1. Identify Foundation components that cover each part of the UI
2. Compose them — no raw MUI primitives if a Foundation component exists
3. Use `sx` with theme tokens for all spacing and colour
4. Apply correct Typography variants throughout
5. Ensure semantic HTML structure (`main`, `section`, `nav`, `h1`–`h6` hierarchy)
6. Hand off to: **Chalmers → Flanders → Marge → Lisa**

### For a new component (requires Moe approval first):
1. Define the props interface
2. Check `src/components/buttons/` (or relevant folder) for shared variant helpers before reimplementing styles
3. Extract variant style objects and size maps as module-level constants
4. Keep component body ≤ 200 lines
5. Do not add a Storybook story yet — Lisa owns that step
6. Hand off to: **Chalmers → Flanders → Marge → Lisa**

---

## Next.js App Router Notes

> **Warning:** This project uses a non-standard Next.js version. Read `node_modules/next/dist/docs/` before using any Next.js API — conventions and file structure may differ from training data.

- `"use client"` only when state, effects, or browser APIs are required
- Server Components are the default — keep data fetching server-side where possible
- Server Actions for mutations — validated at the boundary, no raw client-side fetch for mutations

---

## Checklist Before Handing Off

- [ ] No hardcoded colours, spacing, or font sizes
- [ ] No `style={{}}` inline props
- [ ] No disabled Typography variants (`body1`, `body2`, etc.)
- [ ] TypeScript strict — no `any`
- [ ] All props interfaces exported
- [ ] Component ≤ 200 lines, functions ≤ 40 lines
- [ ] Semantic HTML structure
- [ ] Foundation components used — no unnecessary raw MUI primitives
