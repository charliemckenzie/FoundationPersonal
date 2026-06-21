# MUI Typography Migration Guide

This project uses **Bootstrap-style typography** instead of MUI's default variants.

## Typography Scale

### Display Headings (Largest → Smallest)
- `display-1` — 5rem / 80px, weight 300
- `display-2` — 4.5rem / 72px, weight 300
- `display-3` — 4rem / 64px, weight 300
- `display-4` — 3.5rem / 56px, weight 300
- `display-5` — 3rem / 48px, weight 300

### Standard Headings
- `h1` — 2.5rem / 40px, weight 500
- `h2` — 2rem / 32px, weight 500
- `h3` — 1.75rem / 28px, weight 500
- `h4` — 1.5rem / 24px, weight 500
- `h5` — 1.25rem / 20px, weight 500
- `h6` — 1rem / 16px, weight 500

### Body Text
- `lead` — 1.25rem / 20px, weight 400, line-height 1.6 (emphasized intro text)
- `body` — 1rem / 16px, weight 400, line-height 1.5 (default body text)
- `small` — 0.875rem / 14px, weight 400, line-height 1.5 (supplementary text)

---

## Importing New MUI Components

When importing a new MUI component that uses Typography, follow this mapping:

| MUI Variant (OLD) | Bootstrap Variant (NEW) | Use Case |
|---|---|---|
| `h1`, `h2`, `h3`, `h4`, `h5`, `h6` | Same: `h1` - `h6` | Standard headings |
| `body1` | `body` | Default body text |
| `body2` | `body` or `small` | Secondary body text — use `small` if it's truly supplementary |
| `subtitle1` | `lead` or `h5` | Emphasized paragraph or small heading |
| `subtitle2` | `h6` or `body` | De-emphasized heading or strong body text |
| `caption` | `small` | Labels, helper text, metadata |
| `overline` | `small` (uppercase via sx) | Eyebrow text, section labels |
| `button` | N/A (handled by Button component) | Not used in Typography |

---

## Process for New Component Imports

### 1. Search for Typography Usage

After importing a new MUI component, search the file for:

```tsx
<Typography variant="
```

### 2. Apply the Mapping

Replace each MUI variant with its Bootstrap equivalent using the table above.

**Example:**

```tsx
// ❌ OLD (MUI)
<Typography variant="body1">Main content</Typography>
<Typography variant="caption" color="text.muted">Helper text</Typography>

// ✅ NEW (Bootstrap)
<Typography variant="body">Main content</Typography>
<Typography variant="small" color="text.muted">Helper text</Typography>
```

### 3. Context Matters

The mapping isn't always 1:1. Consider the **semantic purpose**:

- **Emphasized intro paragraph?** → `lead`
- **Default paragraph text?** → `body`
- **Small metadata, labels, captions?** → `small`
- **Large attention-grabbing heading?** → `display-1` through `display-5`
- **Section headings?** → `h1` through `h6`

### 4. Special Cases

#### Overline Text

MUI's `overline` variant is typically uppercase, small, and spaced. Use `small` + `sx`:

```tsx
<Typography variant="small" sx={{ textTransform: 'uppercase', letterSpacing: '0.1em' }}>
  Section Label
</Typography>
```

#### Button Text

MUI's `button` variant is handled by the Button component itself. Don't use Typography for button labels — use the Button component.

---

## TypeScript

The project has **disabled** MUI's default variants via type augmentation in `src/app/themes/factory.ts`:

```ts
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    // MUI defaults — disabled
    body1: false;
    body2: false;
    subtitle1: false;
    subtitle2: false;
    button: false;
    caption: false;
    overline: false;
    
    // Bootstrap variants — enabled
    'display-1': true;
    'display-2': true;
    // ... etc
  }
}
```

This means **TypeScript will error** if you try to use the old MUI variants. The error is your reminder to use the mapping table above.

---

## Review Checklist

Before marking a new component complete, verify:

- [ ] All `variant="body1"` changed to `variant="body"`
- [ ] All `variant="body2"` changed to `variant="body"` or `variant="small"`
- [ ] All `variant="caption"` changed to `variant="small"`
- [ ] All `variant="subtitle1"` changed to appropriate Bootstrap variant
- [ ] All `variant="subtitle2"` changed to appropriate Bootstrap variant
- [ ] All `variant="overline"` changed to `variant="small"` with uppercase styling
- [ ] TypeScript errors resolved
- [ ] Component renders correctly in Storybook

---

## Questions?

If you're unsure which variant to use, check the [Typography story](src/stories/design-tokens/Typography.stories.tsx) in Storybook to see all available variants with examples.
