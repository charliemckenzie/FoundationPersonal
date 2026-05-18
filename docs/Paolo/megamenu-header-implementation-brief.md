# Header + MegaMenu — Implementation Brief

This document is a self-contained prompt. Hand it to Lenny (or any implementing agent) to build the Header and MegaMenu components from scratch.

---

## What to build

A `Header` component containing:
- **Logo** (left) — uses the existing `Logo` component
- **Desktop megamenu nav** (centre/left) — 5–7 top-level items, opens on click
- **Two CTA buttons** (right) — primary (`contained`) and secondary (`outlined`)
- **Mobile hamburger** (right, mobile only) — opens a left-anchored `Drawer`

The megamenu supports two panel types:
- `megamenu` — full-width panel (Portal + fixed positioning) with optional promo card and 1–4 link columns
- `dropdown` — narrow MUI Popover anchored to the nav button

Mobile collapses all navigation into the existing `Drawer` component as a flat list.

Both ART and QSuper brands are supported via the existing theme system.

---

## Decisions already made

| Decision | Value |
|---|---|
| Mobile breakpoint | `md` (900px) — below this = mobile |
| Desktop trigger | Click to open/close |
| Full-width panel strategy | MUI `Portal` + `Fade` + `position: fixed` anchored to `headerRef.current.getBoundingClientRect().bottom` |
| Dropdown panel strategy | MUI `Popover` anchored to the clicked nav button |
| Close triggers | ESC key, backdrop click, window scroll |
| Backdrop | `rgba(0,0,0,0.4)` — `Backdrop` inside Portal for megamenu; `slotProps.backdrop` for Popover |
| CTA buttons | `Button` component; primary = `contained`, secondary = `outlined` |
| Mobile drawer | Existing `Drawer` component; `anchor="left"`, `width={320}`; promo card omitted on mobile; CTAs in drawer `actions` slot |
| Header scroll behaviour | `position="static"` (scrolls with page); panel closes on scroll |
| Header elevation | `AppBar elevation={0}` + `borderBottom: 1` using `border.subtle` token |
| zIndex | Megamenu panel: `zIndex.appBar + 1`; Backdrop: `zIndex.appBar`; Popover: MUI default modal zIndex |
| PromoCard on mobile | Omitted — mobile shows flat link list only |

---

## File structure to create

```
src/components/Header/
  types.ts           ← TypeScript interfaces
  index.tsx          ← Header root component
  MegaMenuPanel.tsx  ← Full-width megamenu panel
  NavDrawer.tsx      ← Mobile drawer wrapper
  NavPanelLink.tsx   ← Link atom (label + optional description)
  PromoCard.tsx      ← Promo card (image, title, desc, CTA)

src/stories/components/Header.stories.tsx
```

---

## TypeScript interfaces (types.ts)

All interfaces must be exported. Use `interface`, not `type`, for object shapes.

```ts
export interface NavLink {
  label: string
  href: string
  description?: string
}

export interface NavGroup {
  heading?: string
  links: NavLink[]
}

export interface NavPromoCard {
  image?: string
  imageAlt?: string
  title: string
  description?: string
  cta: { label: string; href: string }
}

export interface NavItemMegamenu {
  type: 'megamenu'
  label: string
  promoCard?: NavPromoCard
  columns: NavGroup[]   // 1–4 columns
}

export interface NavItemDropdown {
  type: 'dropdown'
  label: string
  items: NavLink[]      // max ~8 links
}

export interface NavItemLink {
  type: 'link'
  label: string
  href: string
}

export type NavItem = NavItemMegamenu | NavItemDropdown | NavItemLink

export interface CtaAction {
  label: string
  onClick?: () => void
  href?: string
}

export interface HeaderProps {
  navItems: NavItem[]
  primaryCta?: CtaAction
  secondaryCta?: CtaAction
}
```

---

## Existing components to import and reuse

Read these files before writing any code. Do NOT guess their APIs.

| Component | Path | Key props |
|---|---|---|
| `Logo` | `src/components/Logo/index.tsx` | `variant?`, `size?: 'sm' \| 'md' \| 'lg'`, `alt?` |
| `Button` | `src/components/Button/index.tsx` | `label`, `variant?: 'contained' \| 'outlined' \| 'ghost' \| 'soft'`, `size?`, `fullWidth?`, `onClick?` |
| `IconButton` | `src/components/IconButton/index.tsx` | `icon: string`, `label: string`, `variant?`, `size?`, `onClick?` |
| `Icon` | `src/components/Icon/index.tsx` | `icon: string`, `style?`, `size?: 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl'`, `color?` |
| `Drawer` | `src/components/Drawer/index.tsx` | `open: boolean`, `onClose: () => void`, `anchor?: DrawerAnchor`, `title?`, `children`, `width?: number`, `actions?: React.ReactNode` |

---

## Theme tokens to use

Pull all values from theme tokens. Zero hardcoded colours, spacing, or shadows.

**Semantic tokens** (via `sx` string shorthand e.g. `'border.subtle'`):
- `border.subtle` — panel and card borders
- `border.focus` — focus ring colour
- `text.muted` — nav item descriptions, group headings
- `text.heading` — promo card title
- `action.hover` — link hover background
- `background.paper` — panel background

**Shape tokens** (via `theme.shape.*`):
- `shape.sm` (8px) — NavPanelLink hover border-radius
- `shape.md` (12px) — PromoCard border-radius
- `shape.lg` (16px) — MegaMenuPanel border-radius on bottom corners

**Breakpoints**: `md` = 900px is the desktop/mobile cutoff.

**zIndex**: Use `(t) => t.zIndex.appBar + 1` for the megamenu panel box; `(t) => t.zIndex.appBar` for the Backdrop.

---

## Phase 1 — types.ts

Create `src/components/Header/types.ts` with all interfaces listed above. No component code here.

---

## Phase 2 — Atom components (build in parallel, both depend on Phase 1)

### NavPanelLink.tsx

Props:
```ts
interface NavPanelLinkProps {
  href: string
  label: string
  description?: string
  onClick?: () => void
}
```

Implementation notes:
- Root element: MUI `Box component="a"` (or Next.js `Link` if available — check `node_modules/next/dist/docs/` first)
- `display: block` — entire area is the click target
- Hover: `bgcolor: 'action.hover'`, `borderRadius: (t) => t.shape.sm + 'px'`
- Focus: `outline: '2px solid'`, `outlineColor: 'border.focus'`, `outlineOffset: '2px'`; remove default browser outline
- Label: `Typography variant="body"` (this is a custom variant — check factory.ts; do NOT use `body1`)
- Description: `Typography variant="small" sx={{ color: 'text.muted' }}`
- No icons in NavPanelLink — keep it simple

### PromoCard.tsx

Props:
```ts
interface PromoCardProps {
  image?: string
  imageAlt?: string
  title: string
  description?: string
  cta: { label: string; href: string }
  width?: number  // default 280
}
```

Implementation notes:
- Root: `Box` with `border: 1px solid`, `borderColor: 'border.subtle'`, `borderRadius: (t) => t.shape.md + 'px'`, `overflow: 'hidden'`, `width: props.width ?? 280`, `flexShrink: 0`
- Image: `<Box component="img" src={image} alt={imageAlt ?? ''} sx={{ width: '100%', aspectRatio: '3/2', objectFit: 'cover', display: 'block' }} />` — only render if `image` is provided
- Content box: `px: 2, py: 2, display: 'flex', flexDirection: 'column', gap: 1`
- Title: `Typography variant="h5" sx={{ color: 'text.heading' }}`
- Description: `Typography variant="body" sx={{ color: 'text.muted' }}` — only render if provided
- CTA: `Button label={cta.label} variant="outlined" size="small"` — use `onClick` or Next.js `Link` to navigate to `cta.href`

---

## Phase 3 — MegaMenuPanel.tsx (depends on Phase 1–2)

Props:
```ts
interface MegaMenuPanelProps {
  item: NavItemMegamenu
  open: boolean
  headerBottom: number
  onClose: () => void
}
```

Implementation notes:
- Use MUI `Portal` (import from `@mui/material/Portal`) — renders children at `document.body`
- Inside Portal: two siblings — Backdrop first, then panel box (DOM order matters for stacking)

**Backdrop** (renders before panel so panel sits on top):
```tsx
<Backdrop
  open={open}
  onClick={onClose}
  sx={{ zIndex: (t) => t.zIndex.appBar, bgcolor: 'rgba(0,0,0,0.4)' }}
/>
```

**Panel box**:
```tsx
<Fade in={open} unmountOnExit>
  <Box
    role="region"
    aria-label={item.label}
    sx={{
      position: 'fixed',
      top: headerBottom,
      left: 0,
      right: 0,
      bgcolor: 'background.paper',
      borderBottom: 1,
      borderColor: 'border.subtle',
      zIndex: (t) => t.zIndex.appBar + 1,
      py: 4,
    }}
  >
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', gap: 4 }}>
        {item.promoCard && <PromoCard {...item.promoCard} />}
        <Box
          sx={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: `repeat(${item.columns.length}, 1fr)`,
            gap: 3,
          }}
        >
          {item.columns.map((col, i) => (
            <Box key={i}>
              {col.heading && (
                <Typography
                  variant="small"
                  sx={{ fontWeight: 700, color: 'text.muted', mb: 1, display: 'block' }}
                >
                  {col.heading}
                </Typography>
              )}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {col.links.map((link) => (
                  <NavPanelLink key={link.href} {...link} onClick={onClose} />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  </Box>
</Fade>
```

Keep MegaMenuPanel under 200 lines. If it grows, extract column rendering into a `NavColumn` sub-component within the same file (not exported).

---

## Phase 4 — NavDrawer.tsx (depends on Phase 1–2, build in parallel with Phase 3)

Props:
```ts
interface NavDrawerProps {
  open: boolean
  onClose: () => void
  navItems: NavItem[]
  primaryCta?: CtaAction
  secondaryCta?: CtaAction
}
```

Implementation notes:
- Wraps the existing `Drawer` component: `anchor="left"`, `title="Menu"`, `width={320}`, `open`, `onClose`
- `actions` slot: `<Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>` containing CTAs as `Button fullWidth`. Primary first (`contained`), secondary second (`outlined`). Only render if a CTA is provided.
- Content: iterate `navItems` with `Divider` between each group:
  - `type === 'link'`: `<NavPanelLink href={item.href} label={item.label} onClick={onClose} />`
  - `type === 'dropdown'`: section label + list of `NavPanelLink` for each `item.items`
  - `type === 'megamenu'`: section label + all links from all `item.columns` flattened — no promo card, no group headings
- Section label: `Typography variant="small" sx={{ fontWeight: 700, color: 'text.muted', px: 1, py: 0.5, display: 'block' }}`

---

## Phase 5 — index.tsx (Header root, depends on all previous phases)

### State and refs

```ts
const [activePanel, setActivePanel] = useState<string | null>(null)
const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
const [headerBottom, setHeaderBottom] = useState(0)
const [drawerOpen, setDrawerOpen] = useState(false)
const headerRef = useRef<HTMLElement | null>(null)
const theme = useTheme()
const isMobile = useMediaQuery(theme.breakpoints.down('md'))
```

### Effects

```ts
// Close panel when resized to mobile
useEffect(() => {
  if (isMobile) closePanel()
}, [isMobile])

// Measure header bottom when a panel opens
useEffect(() => {
  if (activePanel && headerRef.current) {
    setHeaderBottom(headerRef.current.getBoundingClientRect().bottom)
  }
}, [activePanel])

// Close on scroll
useEffect(() => {
  const handleScroll = () => closePanel()
  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}, [])

// Close on ESC
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') closePanel()
  }
  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [])
```

### closePanel helper

```ts
const closePanel = () => {
  setActivePanel(null)
  setAnchorEl(null)
}
```

### handleNavClick

```ts
const handleNavClick = (item: NavItem, el: HTMLButtonElement) => {
  if (item.type === 'link') {
    // use Next.js router.push(item.href) or window.location.href = item.href
    return
  }
  if (activePanel === item.label) {
    closePanel()
    return
  }
  setActivePanel(item.label)
  setAnchorEl(el)
}
```

### Derived values

```ts
const activeItem = navItems.find((item) => item.label === activePanel) ?? null
```

### NavItemButton sub-component

If this sub-component exceeds 40 lines, extract it to `src/components/Header/NavItemButton.tsx`. Otherwise keep inline.

Props:
```ts
interface NavItemButtonProps {
  item: NavItem
  active: boolean
  onClick: (item: NavItem, el: HTMLButtonElement) => void
}
```

- Root: MUI `ButtonBase` as a `<button>` element
- `aria-expanded`: `item.type !== 'link' ? active : undefined`
- `aria-haspopup`: `item.type !== 'link' ? 'true' : undefined`
- Label: `Typography variant="body"` (inline, same text size as body)
- Chevron: `Icon icon="chevron-down" size="sm"` — only render for `dropdown` and `megamenu` types
  - `sx={{ transition: 'transform 0.2s', transform: active ? 'rotate(180deg)' : 'rotate(0deg)' }}`
- Active underline: `borderBottom: active ? '2px solid' : '2px solid transparent'`, `borderColor: active ? 'primary.main' : 'transparent'`
- `onClick`: `(e) => onClick(item, e.currentTarget as HTMLButtonElement)`
- Padding: `px: 1.5, py: 1`

### Layout structure

```tsx
<Box component="div">
  <AppBar
    component="header"
    ref={headerRef}
    position="static"
    color="inherit"
    elevation={0}
    sx={{ borderBottom: 1, borderColor: 'border.subtle' }}
  >
    <Container maxWidth="lg">
      <Toolbar disableGutters sx={{ gap: 2 }}>

        {/* Logo */}
        <Logo size="md" />

        {/* Desktop nav */}
        <Box
          component="nav"
          aria-label="Main navigation"
          sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, flex: 1 }}
        >
          {navItems.map((item) => (
            <NavItemButton
              key={item.label}
              item={item}
              active={activePanel === item.label}
              onClick={handleNavClick}
            />
          ))}
        </Box>

        {/* Desktop CTAs */}
        {(secondaryCta || primaryCta) && (
          <Box sx={{ ml: 'auto', display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {secondaryCta && (
              <Button label={secondaryCta.label} variant="outlined" onClick={secondaryCta.onClick} />
            )}
            {primaryCta && (
              <Button label={primaryCta.label} variant="contained" onClick={primaryCta.onClick} />
            )}
          </Box>
        )}

        {/* Mobile hamburger */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
          <IconButton
            icon="bars"
            label="Open navigation"
            onClick={() => setDrawerOpen(true)}
          />
        </Box>

      </Toolbar>
    </Container>
  </AppBar>

  {/* Megamenu panel */}
  {activeItem?.type === 'megamenu' && (
    <MegaMenuPanel
      item={activeItem}
      open={true}
      headerBottom={headerBottom}
      onClose={closePanel}
    />
  )}

  {/* Dropdown panel */}
  <Popover
    open={activeItem?.type === 'dropdown'}
    anchorEl={anchorEl}
    onClose={closePanel}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    transformOrigin={{ vertical: 'top', horizontal: 'left' }}
    disableScrollLock
    slotProps={{
      paper: { sx: { minWidth: 200, maxWidth: 320, mt: 0.5 } },
      backdrop: { sx: { bgcolor: 'rgba(0,0,0,0.4)' } },
    }}
  >
    {activeItem?.type === 'dropdown' && (
      <List disablePadding sx={{ py: 1 }}>
        {activeItem.items.map((link) => (
          <ListItem key={link.href} disablePadding>
            <NavPanelLink {...link} onClick={closePanel} />
          </ListItem>
        ))}
      </List>
    )}
  </Popover>

  {/* Mobile drawer */}
  <NavDrawer
    open={drawerOpen}
    onClose={() => setDrawerOpen(false)}
    navItems={navItems}
    primaryCta={primaryCta}
    secondaryCta={secondaryCta}
  />
</Box>
```

---

## Phase 6 — Storybook story (depends on Phase 5)

Create `src/stories/components/Header.stories.tsx`.

### Story metadata

```ts
const meta = {
  title: 'Components / Header',
  component: Header,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Site header with responsive megamenu navigation. Supports megamenu panels (full-width with optional promo card), dropdown panels, and plain links. Collapses to a drawer on mobile.',
      },
    },
  },
} satisfies Meta<typeof Header>
```

### Sample data to use across stories

```ts
const sampleMegamenuItem: NavItemMegamenu = {
  type: 'megamenu',
  label: 'Products',
  promoCard: {
    title: 'New: Self-managed super',
    description: 'Take control of your retirement savings.',
    cta: { label: 'Learn more', href: '/products/smsf' },
  },
  columns: [
    {
      heading: 'Super',
      links: [
        { label: 'Overview', href: '/super', description: 'How our super works' },
        { label: 'Performance', href: '/super/performance' },
        { label: 'Fees', href: '/super/fees' },
      ],
    },
    {
      heading: 'Investments',
      links: [
        { label: 'Investment options', href: '/investments' },
        { label: 'MySuper', href: '/investments/mysuper' },
      ],
    },
    {
      heading: 'Insurance',
      links: [
        { label: 'Insurance cover', href: '/insurance' },
        { label: 'Make a claim', href: '/insurance/claim' },
      ],
    },
  ],
}

const sampleDropdownItem: NavItemDropdown = {
  type: 'dropdown',
  label: 'Tools',
  items: [
    { label: 'Retirement calculator', href: '/tools/retirement' },
    { label: 'Insurance needs estimator', href: '/tools/insurance' },
    { label: 'Fee comparison', href: '/tools/fees' },
  ],
}

const sampleLinkItem: NavItemLink = {
  type: 'link',
  label: 'About us',
  href: '/about',
}

const sampleCtaPrimary: CtaAction = { label: 'Join now', onClick: () => {} }
const sampleCtaSecondary: CtaAction = { label: 'Log in', onClick: () => {} }
```

### Stories to write

1. **Default** — playground with args: `navItems`, `primaryCta`, `secondaryCta`
2. **MegaMenuVariant** — 5 items: 2 megamenu + 2 dropdown + 1 link; promoCard on first megamenu
3. **DropdownOnly** — all items are `dropdown` type; no megamenu panels
4. **MixedNav** — realistic mix: 3 megamenu + 2 dropdown + 1 link
5. **MobileView** — same data as MixedNav; set `parameters.viewport.defaultViewport = 'mobile1'`

---

## Phase 7 — Register in index.mdx

Update `src/stories/index.mdx` — add `Header` to the `draft` status column (same format as existing entries in that table).

---

## Quality charter checklist (verify before handing off to Chalmers)

- [ ] Zero hardcoded colours, spacing, or shadows — MUI theme tokens only
- [ ] All font sizes and icon sizes in `rem`; line heights unitless
- [ ] No `style={{}}` props — use `sx` with theme tokens
- [ ] No `any` types
- [ ] All component props explicitly typed with `interface`
- [ ] Every component file ≤ 200 lines; every function ≤ 40 lines
- [ ] `NavItemButton` extracted to its own file if it exceeds 40 lines
- [ ] `npx tsc --noEmit` passes with zero errors
- [ ] Run `/simplify` after implementing

---

## Handoff sequence after build

```
Lenny → Chalmers (code quality)
      → Flanders (a11y: keyboard nav, contrast, ARIA)
      → Marge (visual consistency with existing components)
      → Lisa (Storybook story + docs — already in scope above)
      → Willie (sign-off checklist + status update in index.mdx)
      → Frink (commit + draft PR)
      → Designer (review + merge)
```

---

## Out of scope (do not implement)

- Active/current page route highlighting
- Hover-only desktop trigger (click-first is the decision)
- Animated slide-in sub-panels on mobile
- Search bar in header
- Notification badges
- User avatar / profile menu
