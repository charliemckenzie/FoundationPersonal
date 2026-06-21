# Milhouse — Design Direction

Personal knowledge base of Foundation design patterns and decisions. Updated across sessions.

---

## Foundation Principles

- Foundation components first — always. Check the code map (`codemap.json` / `CODEMAP.md`) and `docs/guidelines/component-selection.md` before writing a single line.
- MUI theme tokens only — no hardcoded colours, spacing, or font sizes anywhere.
- `sx` prop with string token shorthand for static values: `'primary.main'`, `'background.paper'`.
- Callback syntax `(t) => ...` only for conditional logic — never for static tokens.
- Font sizes in `rem`. Line heights unitless. Spacing via `theme.spacing()` or explicit `rem`.

---

## Typography

Only these 14 variants are valid in this design system. All others (`body1`, `body2`, `subtitle1`, `subtitle2`, `button`, `overline`) are disabled and will break.

| Variant | Default element | Use |
|---|---|---|
| `display-1` – `display-5` | `h1` | Large hero headings — responsive via `clamp()` |
| `h1` – `h3` | `h1`–`h3` | Semantic headings, heading font (serif) |
| `h4` – `h6` | `h4`–`h6` | Semantic headings, body font (sans-serif) |
| `lead` | `p` | Intro paragraphs, hero subtitles — 1.25rem |
| `body` | `p` | **Default for all body text** — use this unless there's a clear reason not to |
| `small` | `p` | Secondary/supporting text — use sparingly (14px is below comfortable reading threshold) |
| `caption` | `span` | Metadata only (12px) — use very sparingly; can fail contrast at lower weights |

**Rule:** Default to `body`. Only drop to `small` or `caption` when content is genuinely supplementary.

**Rule:** Never override typography inside components with `sx` font props — font sizes, weights, and line heights are built into the components.

---

## Spacing

- `theme.spacing()` multiples wherever possible (base unit = 8px by default in MUI)
- `sx` shorthand maps directly: `p: 2` = `theme.spacing(2)` = `16px`
- Common values: `0.5` (4px), `1` (8px), `1.5` (12px), `2` (16px), `3` (24px), `4` (32px), `6` (48px)
- Use `gap`, `p`, `px`, `py`, `m`, `mx`, `my` shorthand in `sx` — avoids verbose paddingTop/paddingBottom

---

## Colour Tokens

| Token | Purpose |
|---|---|
| `'primary.main'` | Primary brand action |
| `'primary.light'` / `'primary.dark'` | Primary variants |
| `'secondary.main'` | Secondary accent |
| `'text.primary'` | Body text |
| `'text.secondary'` | Supporting / de-emphasised text |
| `'text.disabled'` | Disabled state text |
| `'background.default'` | Page background |
| `'background.paper'` | Card / surface background |
| `'divider'` | Borders and rules |
| `'error.main'` / `'warning.main'` / `'success.main'` / `'info.main'` | Status colours |
| `'action.hover'` / `'action.selected'` | Interactive state overlays |

Source of truth: `src/app/themes/factory.ts` and `src/app/themes/semantic.ts`.

---

## Layout Patterns

- Use MUI `Stack` for flex layouts in `sx` — cleaner than `Box` + manual flexbox
- `Stack` `direction`, `spacing`, `alignItems`, `justifyContent` go in `sx` — not as direct props
- Use `Grid` for responsive column layouts
- `Box` is the escape hatch — use it when `Stack` / `Grid` don't fit
- Page max-width containers typically use `maxWidth: 'lg'` or `maxWidth: 'xl'` on a `Container`

---

## Accessibility Defaults

- Semantic HTML first: `<main>`, `<section>`, `<nav>`, `<article>`, `<h1>`–`<h6>`, `<label>`, `<button>`
- Every page needs `SkipLinks` at the top of the DOM
- Every form input needs an associated `<label>` (or `aria-label` if truly no visible label)
- `Icon` components used purely for decoration: pass `aria-hidden` or wrap in something with an `aria-label`
- `IconButton` always needs an `aria-label`
- Minimum contrast: 4.5:1 for normal text, 3:1 for large text and UI components

---

## Component Notes

_(Milhouse adds to this section as he works — specific patterns, gotchas, useful prop combos)_

### Button
- Variants: `contained` (primary), `soft`, `ghost`, `outlined`
- `size`: `small`, `medium`, `large`
- Always use Foundation `Button` — never raw MUI `Button`

### Card
- Three layouts: contained, open (image + CTA), promo (horizontal)
- Use the Foundation `Card` — it handles brand-aware colours

### Icon
- Foundation `Icon` wraps Font Awesome SVG icons
- Pass `aria-hidden="true"` on decorative icons
- `IconButton` for clickable icon-only actions — always add `aria-label`

### TextField
- Handles: text, email, password, number, tel, url, search, date
- Has built-in label, helper text, error state — don't re-implement these

### Dialog / Modal
- `Dialog` = modal with confirm/cancel actions, adapts to Drawer on mobile
- `Modal` = simpler wrapper with title + content + action slots
- Focus must be trapped inside while open; returns to trigger on close

---

### Grid
- Project uses MUI Grid v2 API (`size` prop, not `item xs={...}`)
- `<Grid size={{ xs: 12, md: 6 }}>` — NOT `<Grid item xs={12} md={6}>`
- Import: `import Grid from '@mui/material/Grid'`

### Background tokens (full list from semantic.ts)
- `background.default` — page background
- `background.paper` — card/surface
- `background.elevated` — modal/popover
- `background.brandPrimary` — brand primary zone (hero sections, CTA banners, primary[600])
- `background.brandSecondary` — secondary brand zone
- `background.tintCool` — subtle cool-toned brand surface (great for hero sections)
- `background.tintNeutral` — neutral grey tint

### Extended text tokens
- `text.heading` — display and heading text (`secondary[800]`)
- `text.muted` — secondary/metadata copy (`text.secondary` equivalent)
- `text.inverse` — text on brand surfaces (white)
- `text.link` — anchor rest state (`primary[600]`)

### Public page layout pattern
- `SkipLinks` → `Header` → `<Box component="main" id="main-content">` → sections → `Footer`
- Each `<Box component="section">` gets `aria-labelledby` pointing to its heading's `id`
- Alternate between `background.paper` and `background.default` for visual rhythm
- Hero → `background.tintCool`; CTA banner → `background.brandPrimary` with `text.inverse`
- Section vertical padding: `py: { xs: 6, md: 8 }` standard; hero `py: { xs: 6, md: 10 }`

### HeroIcon name format
- Use the exact filename without `.svg` extension (e.g. `"Death Benefit"`, `"Time 1"`, `"People"`)
- Available backgrounds for ART: `'none' | 'brand' | 'white' | 'grey'`
- `'grey'` background works well for card icons; `'none'` for large hero illustrations

### Accordion within sections
- `variant="exclusive"` for FAQ-style (one open at a time)
- Default variant allows multiple open
- `content` prop accepts `React.ReactNode` — can nest `IconList` inside accordion items

### Button reversed prop
- Use `reversed` on `contained` buttons placed on brand-coloured backgrounds
- Flanders should verify contrast of `reversed` button against `background.brandPrimary`

---

## Patterns to Avoid

- `style={{}}` inline props — always use `sx`
- Hardcoded colours (`#1976d2`, `rgba(...)`, colour names) — use tokens
- `px` for font sizes or component sizes that scale with zoom — use `rem`
- `tabIndex={1}` or higher — use `0` only
- `onClick` on a `<div>` — use `<button>` or appropriate semantic element
- Mixing `sx` access patterns in the same component — pick one and stay consistent
