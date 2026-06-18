# Foundation Typography

Source of truth: `src/app/themes/factory.ts` · TypeScript contracts: `src/types/mui.d.ts` · Storybook: Design Tokens → Typography

---

## The scale

Every piece of text in the product must use one of these variants. No exceptions.

```tsx
<Typography variant="h2">Section heading</Typography>
<Typography variant="body">Body paragraph</Typography>
```

### Display headings

Responsive sizes via `clamp()`. Font: **heading font** (Merriweather for ART / QSuper).
All display variants render as `<h1>` in the DOM by default — override with `component` when needed.

| Variant | Min → Max | Weight | Line height | Default element |
|---|---|---|---|---|
| `display-1` | 2.5rem → 5rem (40–80px) | 700 | 1.2 | `h1` |
| `display-2` | 2.25rem → 4.5rem (36–72px) | 700 | 1.2 | `h1` |
| `display-3` | 2rem → 4rem (32–64px) | 700 | 1.2 | `h1` |
| `display-4` | 1.875rem → 3.5rem (30–56px) | 700 | 1.2 | `h1` |
| `display-5` | 1.75rem → 3rem (28–48px) | 700 | 1.2 | `h2` |

### Semantic headings

Responsive `h1`–`h2`. Fixed size for `h3`–`h6`. Font: heading font for `h1`–`h3`, body font for `h4`–`h6`.

| Variant | Size | Weight | Line height | Font |
|---|---|---|---|---|
| `h1` | 1.75rem → 2.5rem (28–40px) | 700 | 1.2 | Heading (serif) |
| `h2` | 1.5rem → 2rem (24–32px) | 700 | 1.2 | Heading (serif) |
| `h3` | 1.75rem / 28px | 700 | 1.2 | Heading (serif) |
| `h4` | 1.5rem / 24px | 700 | 1.2 | Body (sans-serif) |
| `h5` | 1.25rem / 20px | 700 | 1.2 | Body (sans-serif) |
| `h6` | 1.125rem / 18px | 700 | 1.333 | Body (sans-serif) |

### Body variants

Font: body font (Noto Sans for ART / QSuper). All use the body font stack.

| Variant | Size | Weight | Line height | Use case |
|---|---|---|---|---|
| `lead` | 1.25rem / 20px | 300 desktop · 400 mobile | 1.6 | Intro paragraphs, hero subtitles |
| `body` | 1rem / 16px | 400 | 1.5 | Default body text |
| `small` | 0.875rem / 14px | 400 | 1.5 | Secondary/supporting text |
| `caption` | 0.75rem / 12px | 400 | 1.5 | Metadata, dates, helper text |

### small and caption — use sparingly

Both variants are below the 16px threshold commonly associated with comfortable reading. Small text is harder to read for users with low vision and fails WCAG contrast requirements at lower font weights. **Default to `body` unless there is a clear reason not to.**

**`small` (14px)**

Use only for text that is genuinely supplementary — content the user doesn't need to read to complete their task. Acceptable uses:

- Footnotes and legal disclaimers
- Form helper text beneath an input
- Supporting metadata (timestamps, file sizes, secondary labels)
- In-table secondary data below a primary value

Never use `small` as the default font for a section, card, or form. If the text is important enough to be there, it is important enough to be readable at `body` size.

**`caption` (12px)**

Caption is the smallest variant. At 12px it is at the limit of legibility for many users and fails 4.5:1 contrast at all but the darkest token values. Use it only when explicitly directed or when the context genuinely demands it (e.g. chart axis labels, image captions beneath media).

Do not use `caption` speculatively. If you are unsure whether a piece of text warrants `caption`, it should be `small` or `body`.

---

## Hard rules

### Do not override component typography

Components have all font styles built in — size, weight, line height, and colour are already set. Do not add `sx` typography overrides (`fontSize`, `fontWeight`, `lineHeight`, `fontFamily`, `typography`) to text rendered inside a component unless explicitly directed.

```tsx
// ✗ Wrong — overriding styles the component already handles
<Button label="Continue" sx={{ fontSize: '1rem', fontWeight: 700 }} />
<Chip label="Active" sx={{ typography: 'small' }} />

// ✓ Correct — let the component render its own typography
<Button label="Continue" />
<Chip label="Active" />
```

If a component's typography looks wrong, the fix belongs in the theme or the component itself — not at the call site.

### What is allowed
Only the variants listed above. The full allowed list:

```
display-1  display-2  display-3  display-4  display-5
h1  h2  h3  h4  h5  h6
lead  body  small  caption  inherit
```

### What is banned

These MUI defaults are **disabled** in `src/types/mui.d.ts`. They will cause TypeScript errors. The ESLint rule in `eslint.config.mjs` will fail the build.

```
body1  body2  subtitle1  subtitle2  button  overline
```

Never use bare `<Typography>` without a `variant` prop — MUI defaults to `body1`, which is disabled.

### Font sizes

Never hardcode a font size anywhere:

```tsx
// ✗ Wrong
<Box sx={{ fontSize: '18px' }} />
<Box sx={{ fontSize: 13 }} />
<Typography sx={{ fontSize: '1.125rem' }} />

// ✓ Correct — use a variant
<Typography variant="body" />

// ✓ Correct — reference a theme variant in sx when Typography is not available
<Box sx={{ typography: 'small' }} />
```

### Line heights

Always unitless. Never `px` or `rem`.

```tsx
// ✗ Wrong
sx={{ lineHeight: '24px' }}

// ✓ Correct
sx={{ lineHeight: 1.5 }}
```

The theme default for `body` is `1.5` (24px). This is appropriate for short text — labels, table cells, captions, UI copy.

For content blocks where the user is reading continuous sentences or paragraphs, increase to `1.75` (28px). The extra vertical space significantly improves readability for longer passages.

```tsx
// Short UI text — default is fine
<Typography variant="body">Last updated: 24 May 2026</Typography>

// Reading content — increase line height
<Typography variant="body" sx={{ lineHeight: 1.75 }}>
  Your super balance is invested across a mix of assets. The returns you see each year
  reflect the performance of those underlying investments after fees and taxes.
</Typography>
```

**Rule of thumb:** if the text runs to two or more sentences, use `1.75`.

### `component` overrides

Variant controls **visual style**. `component` controls **HTML element**. They are independent.

```tsx
// Renders visually as display-1 but outputs a <p> — useful for non-heading contexts
<Typography variant="display-1" component="p">...</Typography>

// Renders visually as body but outputs a <span> — useful inside inline flows
<Typography variant="body" component="span">...</Typography>
```

---

## Default HTML element mapping (variantMapping)

| Variant | Default DOM element |
|---|---|
| `display-1` – `display-4` | `h1` |
| `display-5` | `h2` |
| `h1` – `h6` | `h1` – `h6` (matching) |
| `lead` | `p` |
| `body` | `p` |
| `small` | `p` |
| `caption` | `span` |

---

## Recommended margin-bottom spacing

These are conventions, not enforced by the theme. Apply with `sx={{ mb: X }}`.

| Variant | `mb` value | px equivalent |
|---|---|---|
| `display-1` – `display-5` | `2` | 16px |
| `h1`, `h2` | `1.5` | 12px |
| `h3`, `h4`, `h5` | `1` | 8px |
| `h6` | `0.5` | 4px |
| `lead` | `2.5` | 20px |
| `body` | `2` | 16px |
| `small` | `1.5` | 12px |
| `caption` | `1` | 8px |

---

## Font families

| Role | Variants | Notes |
|---|---|---|
| Heading (serif) | `display-1` – `display-5`, `h1`, `h2`, `h3` | Merriweather (ART) · configured via `brand.headingFontFamily` |
| Body (sans-serif) | `h4`, `h5`, `h6`, `lead`, `body`, `small`, `caption` | Noto Sans (ART) · configured via `brand.fontFamily` |

Override a heading to body font when needed: `sx={{ fontFamily: theme.typography.fontFamily }}`.

---

## Heading colour

`h1`–`h6` and all display variants automatically receive `text.heading` colour from the theme. Do not manually set `color` on heading variants unless intentionally overriding.

Body variants (`lead`, `body`, `small`, `caption`) use `text.primary` by default. Do not override the colour unless explicitly directed.

### Never apply colour overrides speculatively

Do not reach for a colour token just because text is "supporting" or sits beneath a heading. If the text belongs on the page, it should read at full `text.primary` strength. Colour overrides must be explicitly requested.

```tsx
// ✗ Wrong — unsolicited colour override
<Typography variant="lead" sx={{ color: 'text.secondary' }}>...</Typography>
<Typography variant="body" sx={{ color: 'text.muted' }}>...</Typography>

// ✓ Correct — no override; text.primary applies automatically
<Typography variant="lead">...</Typography>
<Typography variant="body">...</Typography>
```

**`text.secondary`** — never use. It is an MUI default that applies reduced opacity and is not a Foundation design token.

**`text.muted`** — a valid Foundation token but apply it only when explicitly directed or when it is already part of an existing component's established pattern. Do not add it speculatively to supporting paragraphs.

---

## Composition patterns

**Page with lead-in:**
```tsx
<Typography variant="h1">Getting started</Typography>
<Typography variant="lead" sx={{ mb: 2.5 }}>Intro sentence here.</Typography>
<Typography variant="body">Body paragraph...</Typography>
```

**Card metadata:**
```tsx
<Typography variant="h5">Card title</Typography>
<Typography variant="small" color="text.muted">Supporting label</Typography>
<Typography variant="caption" color="text.muted">12 Apr 2026</Typography>
```

**Stat display:**
```tsx
<Typography variant="caption" color="text.muted" display="block">Total balance</Typography>
<Typography variant="h2" component="p">$112,200</Typography>
<Typography variant="caption" color="text.muted">As at 24 May 2026</Typography>
```

---

## Where to look

| Purpose | File |
|---|---|
| Token definitions | `src/app/themes/factory.ts` → `typography:` section |
| TypeScript variant contracts | `src/types/mui.d.ts` → `TypographyPropsVariantOverrides` |
| ESLint enforcement | `eslint.config.mjs` → `no-restricted-syntax` |
| Storybook visual reference | Design Tokens → Typography / Typography Usage / Typography Composition |
