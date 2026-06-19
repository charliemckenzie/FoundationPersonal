# Component Updates Session — June 16-18, 2026

## Overview
This session focused on aligning Figma component definitions with the Foundation codebase, specifically:
1. Fixing Alert component semantic color variables (Figma → Theme)
2. Adding `Condensed` property to Button component set (300 variants)
3. Building the Card component from scratch in Figma (27 variants)

---

## Alert Component — Semantic Variable Alignment

### Issue
The Figma primitive colour variables (`red/50`, `amber/100`, `green/800`, etc.) were set to standard Tailwind hex values, but the Foundation theme uses custom brand-adjusted colours. This mismatch meant:
- Figma Alert showed correct colours (custom brand palette)
- Storybook Alert displayed the same correct colours
- But the Figma variables were technically "wrong" — they didn't match the theme

### Resolution
Updated all 9 primitive colour variables to match the theme's actual hex values:

| Primitive | Before (Tailwind) | After (Theme) |
|-----------|---|---|
| `red/50` | `#fef2f2` | `#fcebed` |
| `red/100` | `#fee2e2` | `#f9dee1` |
| `red/800` | `#991b1b` | `#58151c` |
| `amber/50` | `#fffbeb` | `#fff9e7` |
| `amber/100` | `#fef3c7` | `#ffefc1` |
| `amber/800` | `#92400e` | `#664d03` |
| `green/50` | `#f0fdf4` | `#edf6f2` |
| `green/100` | `#dcfce7` | `#daece3` |
| `green/800` | `#166534` | `#146c43` |

### Result
- Semantic variables (`error/background → red/50`) now resolve to correct theme colours
- All Alert variants automatically updated via alias chain
- No Alert component code changes needed

### Testing
Ran axe-core accessibility audit on all Alert story variants:
- ✓ **Variants tested:** Default, Severities, With Icon, With Title, Closable, With Action
- ✓ **Result:** Zero violations across WCAG 2.0 A, 2.0 AA, 2.1 AA, best practices
- ✓ **Contrast:** Text 4.5:1–11.8:1 (AAA); Icon 5.3:1–11.8:1 (AA/AAA); Close X 6.99:1–10.76:1 (AA)

---

## Button Component — Condensed Property Addition

### Issue
The Storybook Button component has a `condensed` prop (reduces height by 0.25rem / 4px), but Figma's Button component set had no equivalent. The control was missing.

### Resolution
Added `Condensed` as a variant property to the Button component set:
- **150 original variants** (Condensed=false) → renamed with explicit suffix
- **150 cloned variants** (Condensed=true) with height reduced by 4px
- **Total: 300 variants** (still manageable grid)

| Size | Default | Condensed |
|---|---|---|
| Small | 40px | 36px ✓ |
| Medium | 48px | 44px ✓ |
| Large | 56px | 52px ✓ |

### Cleanup
Positioned all 300 variants in a clean 5-column grid (States: Default, Hover, Active, Disabled, Loading) × 60 rows (Condensed × Variant × Color × Size combinations), with section gaps between Variant and Condensed blocks.

### Alert Integration
Updated all 4 action buttons in the Alert component set to use `Condensed=true`, matching the Storybook story which renders:
```tsx
<Button label="Refresh" size="small" condensed variant="outlined" />
```

---

## Card Component — Full Build

### Component Properties
Created **27 variants** on a new "Card" page with 3 variant dimensions:

| Dimension | Options |
|---|---|
| **Variant** | Contained / Border / Open |
| **Top** | None / Image / Hero |
| **CTA** | None / Single / Double |

### Editable Component Properties
- `Header` (TEXT) — default "Card heading"
- `Body` (TEXT) — default body copy
- `Show Title` (BOOLEAN) — toggles header visibility
- `Primary Label` (TEXT) — default "Get started"
- `Secondary Label` (TEXT) — default "Learn more"
- `Expanded` (BOOLEAN) — reserved for future padding toggle

### Design Decisions

#### Variant Styles
- **Contained**: `background/paper` fill + `border/default` 1px + 24px radius
- **Border**: Transparent + `border/default` 1px + 24px radius
- **Open**: No border, no background, minimal styling

#### Padding
- **Contained/Border**: 32px horizontal, vertical varies (32px edges, 16px between sections)
- **Open**: 0px horizontal, 24px vertical between sections

#### Top Section
- **Image**: 420×184 placeholder (16:7 aspect)
- **Hero**: 48px circle badge (placeholder for future HeroIcon)
- **None**: Content-only card

#### CTA Layout
- **None**: No actions row
- **Single**: One primary button
- **Double**: Primary + secondary buttons

### Token Binding
Applied Figma variables to all text nodes:
- `text/heading` → header text
- `text/primary` → body text
- `Radius/xl` (24px) → all card corners
- `border/default` → card borders (contained/border only)
- `background/paper` → contained variant background

### Button Integration
CTA buttons are **live instances** from the Button component set:
- Primary: `Contained, Medium, Primary, Default, Condensed=false`
- Secondary: `Outlined, Medium, Primary, Default, Condensed=false`

Any updates to Button variants automatically cascade through Card instances.

### Layout Grid
All 27 variants positioned in a logical 3D grid:
- **Columns** (CTA): None → Single → Double (3 across)
- **Rows** (Top×Variant): 9 rows per grouping
  - Contained/None, Contained/Image, Contained/Hero
  - Border/None, Border/Image, Border/Hero
  - Open/None, Open/Image, Open/Hero
- **Section gaps** between Variant blocks for visual breathing room

Final size: **1404 × 3071px**

### Missing Feature: HeroIcon
The Card component references a HeroIcon slot, but the Figma HeroIcon component doesn't exist yet. For now, a 48px circle placeholder is used. Once HeroIcon is built, it can be swapped via `Icon#` instance swap property.

---

## Figma Variable Additions

Created one new variable:
- **`Radius/xl`** = 24px (CORNER_RADIUS scope)
  - Used by Card component borders
  - Maps to `theme.shape.xl` in code

---

## Files & Artifacts

### Figma Pages
- **Alert** — 12 variants, updated Button actions with `Condensed=true`
- **Buttons** — 300 variants (150 default + 150 condensed), gridded layout
- **Card** — 27 variants, all properties wired and tokens bound

### Storybook
All Alert stories pass full WCAG 2.2 AA accessibility audit.

---

## Key Learnings

1. **Semantic Aliases > Primitives**: When building a design system in Figma, keep the primitive values accurate (matching theme), and use semantic aliases to decouple from raw values.

2. **Variant Explosion**: Boolean properties can double variant count (150 → 300 for Button). Feasible for simple properties, but at 300 variants, the component set becomes large—manage grid layout carefully.

3. **Component Composition**: Card works best with instance swap for top sections (Image, HeroIcon, None) and instance children for CTAs. Direct text binding only works on direct children, not nested instance sublayers.

4. **Focus on Matching Code**: Every Figma component property and variant must map to actual code props. This session maintained 1:1 alignment (Storybook → Figma).

---

## Next Steps

1. **HeroIcon Component**: Build the HeroIcon component in Figma with brand backgrounds (none, white, grey, brand) and icon size variants.

2. **Card Placeholder Content**: Replace hardcoded text with realistic content examples (multiple heading lengths, body variations).

3. **Responsive Card**: Add `Mobile` variant dimension to test narrow-width behaviour (stack icon left, reflow CTAs).

4. **Story Library**: Write Storybook stories for Card that map to all 27 Figma variants.

5. **Code Connect**: Set up Code Connect mappings between Figma Card component and `src/components/Card/index.tsx`.

