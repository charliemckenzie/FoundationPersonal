# QSuper Megamenu Layout Refinements — Execution Plan

**Author**: Paolo | **Planned**: 20 May 2026 | **Risk**: Medium

---

## ⚠️ Conflict Check — Do this BEFORE executing

Open each file below and check it matches what this plan expects.
If a file has changed significantly since this document was written, stop — re-plan with Sideshow Bob before proceeding.

| File | What this plan expects | Risk |
|---|---|---|
| `src/components/Header/MegaMenuPanel.tsx` | QSuper branch renders `<Container maxWidth="lg" disableGutters>` with columns + `QSuperPromoPanel` | Low |
| `src/components/Header/QSuperMainBar.tsx` | Nav Box has `alignSelf: 'stretch'` added this session | Low |
| `src/stories/components/Header.stories.tsx` | **⚠️ HIGH RISK** — QSuper story appears MISSING from disk. File ends at ~line 384 (MobileView story). No ThemeProvider imports, no `qsuperTheme`, no `QSuperBrand` export, no audience/resource link data. Needs to be recovered or rewritten before testing the megamenu changes. | High |

---

## What this plan does

Three visual changes to the QSuper megamenu dropdown, plus recovering the missing QSuper Storybook story.

1. The megamenu panel stops spanning the full browser viewport width and clips to the header container (~1200px max-width), centred on screen.
2. A blue (`primary.main`) 3px top border is added to the white panel to visually connect it to the nav bar.
3. The content layout changes from 3 nav columns + a flush navy promo panel → 2 nav columns + a rounded, inset (beveled) navy promo panel with more breathing room.

---

## Prerequisites

- `src/components/Header/MegaMenuPanel.tsx` exists with QSuper branch rendering logic
- `src/app/themes/brands/theme-b.ts` exports `themeB` (QSuper brand config)
- `src/app/themes/factory.ts` exports `createBrandTheme`

---

## Execution steps

### Step 0 — Recover the missing QSuper story in Header.stories.tsx

The `QSuperBrand` story and all its data was lost in the merge. Before making megamenu changes, re-add the following to the end of `src/stories/components/Header.stories.tsx`:

**Add to imports at the top of the file:**
```tsx
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { createBrandTheme } from '../../app/themes/factory'
import { themeB } from '../../app/themes/brands/theme-b'
import type { AudienceLink, ResourceLink } from '../../components/Header/types'
```

**Also update the type import line** to include `AudienceLink` and `ResourceLink`:
```tsx
import type {
  NavItemMegamenu,
  CtaAction,
  UtilityLink,
  AudienceLink,
  ResourceLink,
} from '../../components/Header/types'
```

**Add after the imports block:**
```tsx
const qsuperTheme = createBrandTheme(themeB)
```

**Add before `export default meta`:**
```tsx
const qsuperAudienceLinks: AudienceLink[] = [
  { label: 'Personal', href: '/personal' },
  { label: 'Employers', href: '/employers' },
  { label: 'Advisers', href: '/advisers' },
]

const qsuperResourceLinks: ResourceLink[] = [
  { label: 'Calculators & forms', href: '/calculators' },
  { label: 'News Hub', href: '/news' },
  { label: 'Contact us', href: '/contact' },
]

const qsuperProductsItem: NavItemMegamenu = {
  type: 'megamenu',
  label: 'Products',
  columns: [
    {
      links: [
        { label: 'Why QSuper', href: '/why-qsuper', description: 'Awaken your super with Australian Retirement Trust' },
        { label: 'Can I join QSuper', href: '/join' },
        { label: 'Investment options', href: '/products/investments' },
        { label: 'Fees', href: '/products/fees' },
        { label: 'Financial advice', href: '/advice' },
        { label: 'Compare us', href: '/compare' },
      ],
    },
    {
      heading: 'Insurance',
      links: [
        { label: 'Income protection', href: '/insurance/income' },
        { label: 'Death cover', href: '/insurance/death' },
        { label: 'TPD cover', href: '/insurance/tpd' },
      ],
    },
    {
      heading: 'Account types',
      links: [
        { label: 'Accumulation account', href: '/products/accumulation' },
        { label: 'Transition to Retirement Income account', href: '/products/ttr' },
        { label: 'Retirement Income account', href: '/products/income' },
        { label: 'Lifetime Pension', href: '/products/lifetime' },
      ],
    },
  ],
}

const qsuperNavItems: NavItemMegamenu[] = [
  qsuperProductsItem,
  {
    type: 'megamenu',
    label: 'Super',
    columns: [
      {
        heading: 'Your super',
        links: [
          { label: 'How super works', href: '/super/how' },
          { label: 'Consolidate super', href: '/super/consolidate' },
          { label: 'Super contributions', href: '/super/contributions' },
        ],
      },
      {
        heading: 'Defined Benefit',
        links: [
          { label: 'Defined Benefit account', href: '/super/defined-benefit' },
          { label: 'CSS, PSS & SASS', href: '/super/css-pss' },
        ],
      },
    ],
  },
  {
    type: 'megamenu',
    label: 'Retirement',
    columns: [
      {
        heading: 'Planning',
        links: [
          { label: 'Retirement guide', href: '/retirement/guide' },
          { label: 'When to retire', href: '/retirement/when' },
          { label: 'Age pension', href: '/retirement/pension' },
        ],
      },
    ],
  },
  {
    type: 'megamenu',
    label: 'Investments',
    columns: [
      {
        heading: 'Investment options',
        links: [
          { label: 'Lifetime', href: '/investments/lifetime' },
          { label: 'Diversified options', href: '/investments/diversified' },
          { label: 'Single sector options', href: '/investments/single' },
        ],
      },
      {
        heading: 'Performance',
        links: [
          { label: 'Investment performance', href: '/investments/performance' },
          { label: 'Investment updates', href: '/investments/updates' },
        ],
      },
    ],
  },
  {
    type: 'megamenu',
    label: 'Insurance',
    columns: [
      {
        heading: 'Cover',
        links: [
          { label: 'Income protection', href: '/insurance/income' },
          { label: 'Death cover', href: '/insurance/death' },
          { label: 'TPD cover', href: '/insurance/tpd' },
        ],
      },
    ],
  },
  {
    type: 'megamenu',
    label: 'Advice',
    columns: [
      {
        heading: 'Financial advice',
        links: [
          { label: 'Get advice', href: '/advice' },
          { label: 'Find an adviser', href: '/advice/find' },
          { label: 'Advice fees', href: '/advice/fees' },
        ],
      },
    ],
  },
]
```

**Add at the very end of the file (after `MobileView`):**
```tsx
export const QSuperBrand: Story = {
  name: 'QSuper brand',
  globals: { brand: 'theme-b' },
  decorators: [
    (Story) => (
      <ThemeProvider theme={qsuperTheme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story:
          'QSuper brand layout: audience bar (Personal / Employers / Advisers + resource links) above the main bar (full logo + inline megamenu nav + search + CTAs). Brand auto-detected from theme.',
      },
    },
  },
  args: {
    navItems: qsuperNavItems,
    audienceLinks: qsuperAudienceLinks,
    resourceLinks: qsuperResourceLinks,
    activeAudienceHref: '/personal',
    primaryCta: { label: 'Join' },
    secondaryCta: { label: 'Log In' },
    onSearch: (q: string) => console.log('search:', q),
    searchPlaceholder: 'Search QSuper',
  },
  render: (args) => {
    const { showHero, ...headerArgs } = args as typeof args & { showHero?: boolean }
    return (
      <>
        <Header {...headerArgs} />
        {showHero && <HeroPlaceholder />}
      </>
    )
  },
}
```

---

### Step 1 — Revert `alignSelf: 'stretch'` on the nav (already partially done this session, double-check)

In `src/components/Header/QSuperMainBar.tsx`, confirm the nav Box does NOT have `alignSelf: 'stretch'`. It should be:
```tsx
sx={{ display: 'flex', '& .MuiTypography-root': { fontWeight: 400 } }}
```
If `alignSelf: 'stretch'` is present, remove it.

---

### Step 2 — Contain megamenu width + add blue top border

In `src/components/Header/MegaMenuPanel.tsx`, change the outer fixed Box and the QSuper Container:

**Outer `Box` (the `position: fixed` layer):** Remove `bgcolor` and `borderBottom` — this box becomes a transparent positioning layer only.

**Replace the QSuper branch rendering** with:
```tsx
{isQSuper ? (
  <Box
    sx={{
      maxWidth: 'lg',         // matches Container maxWidth
      mx: 'auto',             // centres it
      bgcolor: 'background.paper',
      borderTop: '3px solid',
      borderColor: 'primary.main',
      borderBottom: '1px solid',
      borderBottomColor: 'border.subtle',
      borderRadius: (t) => `0 0 ${t.shape.lg}px ${t.shape.lg}px`,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'stretch',
    }}
  >
    <Box
      sx={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: `repeat(${Math.min(item.columns.length, 2)}, 1fr)`,
        gap: 5,
        py: 5,
        px: 4,
      }}
    >
      {item.columns.slice(0, 2).map((col, i) => (
        <NavColumn key={i} group={col} onClose={onClose} />
      ))}
    </Box>
    <QSuperPromoPanel>{item.promoCard?.children}</QSuperPromoPanel>
  </Box>
) : (
  // ART layout unchanged
```

> **Note on `maxWidth: 'lg'`** — MUI's `maxWidth="lg"` resolves to `1200px` by default. In an `sx` prop, use `maxWidth: (t) => t.breakpoints.values.lg` to get the exact pixel value from the theme rather than hardcoding.

---

### Step 3 — Bevel the promo panel

In the `QSuperPromoPanel` function inside `MegaMenuPanel.tsx`, update the Box sx:
```tsx
sx={{
  bgcolor: 'background.brandSecondary',
  width: 300,
  flexShrink: 0,
  m: 2,                                              // inset margin creates the beveled floating effect
  borderRadius: (t) => `${t.shape.lg}px`,            // rounded corners on all sides
  py: 5,
  px: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}}
```

Remove `alignSelf: 'stretch'` from the promo panel — the `m: 2` inset handles spacing.

---

### Step 4 — Max 2 nav columns

The grid template in Step 2 already caps at 2: `Math.min(item.columns.length, 2)`. For the Products item, column 1 (prominent links: Why QSuper, Can I join, etc.) and column 2 (Insurance heading + links) will show. Account types (column 3) will be hidden until the story data is updated to fit 2 columns — or it can be merged into column 2 as a second group.

Consider restructuring `qsuperProductsItem` columns so:
- **Col 1**: prominent links (Why QSuper through Compare us) — no heading
- **Col 2**: two groups stacked vertically — Insurance + Account types

To stack two groups in one column, `NavColumn` needs to support `groups: NavGroup[]` (an array) instead of a single `group`. This is a minor API change to NavColumn (internal, not exposed as a prop on the component). Alternatively, the simpler approach: combine Insurance and Account types into a single column with two `heading` blocks — this requires `NavColumn` to accept `groups?: NavGroup[]` or the data to be pre-merged.

---

## Verification

1. Open `http://localhost:6006/iframe.html?id=public-web-header--q-super-brand&viewMode=story`
2. Confirm QSuper story loads with QSuper theme (navy logo, blue CTAs)
3. Click "Products" — megamenu panel should:
   - Be centred, ~1200px wide, not touching browser edges
   - Show 3px blue top border
   - Show 2 nav columns (not 3)
   - Show navy promo panel that is inset with rounded corners, NOT flush to the panel edge
4. Check panel does not overflow viewport on a 1280px wide window
5. Confirm ART Default story is unaffected (megamenu still full-width with close button)

---

## Calling Smithers (optional)

If you want the full team quality pipeline, tell Smithers:

"Execute qsuper-megamenu-layout-refinements.md from Paolo's planning docs."

Otherwise, proceed independently using the steps above.
