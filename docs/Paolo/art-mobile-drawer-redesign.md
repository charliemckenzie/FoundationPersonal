# ART Mobile Drawer Redesign — Execution Plan

**Author**: Paolo | **Planned**: 20 May 2026 | **Risk**: Medium
**Scope**: ART brand only. QSuper mobile drawer untouched.

---

## What this changes

The mobile nav drawer is rebuilt from an accordion-expand pattern to a two-panel slide pattern with a custom top chrome, CTA inline dropdowns, and a full slide animation.

### Before → After

| Element | Before | After |
|---|---|---|
| Top chrome | "Menu" title + × | × (left) \| ART mark (centre) \| Contact pill (right) |
| CTAs | Stacked vertical buttons | Side-by-side pill buttons with ↓/↑ chevron |
| CTA tap | Navigates to first href | Inline grey dropdown panel replaces nav list |
| CTA dropdown items | — | Links with dividers + optional accordion sub-items |
| Nav items with sub-content | Accordion (expand in place) | Row with › chevron — tapping slides in sub-panel from right |
| Sub-panel enter | Accordion unfolds | Slides in right → left (RTL) |
| Sub-panel exit (Back) | Accordion collapses | Slides out left → right (LTR, reverse) |
| Depth | Unlimited accordion nesting | Always exactly 2 levels |

---

## Files to change

| File | Change type | Notes |
|---|---|---|
| `src/components/Header/types.ts` | Minor extension | `CtaMenuItem.href` becomes optional; add `items?: CtaSubItem[]` |
| `src/components/Header/NavDrawer.tsx` | Full rewrite | ~150 → ~200 lines. No other Header file changes. |
| `src/stories/components/Header.stories.tsx` | Data update | Enrich CTA menu data with sub-items for the "Setup online access" pattern |

**Not changing:** `Drawer/index.tsx`, `UtilityBar.tsx`, `CondensedBar.tsx`, `CtaButton.tsx`, `QSuperHeader.tsx`, `NavItemButton.tsx`, `MegaMenuPanel.tsx`

---

## Conflict check — do this first

| File | Expected state | Risk |
|---|---|---|
| `src/components/Header/NavDrawer.tsx` | Accordion-based, uses `Drawer` component, ~185 lines | Low |
| `src/components/Header/types.ts` | `CtaMenuItem { label, href }` — no `items` field yet | Low |

---

## Step 1 — Extend `CtaMenuItem` type

In `src/components/Header/types.ts`, replace:

```ts
export interface CtaMenuItem {
  label: string
  href: string
}
```

With:

```ts
export interface CtaSubItem {
  label: string
  href: string
}

export interface CtaMenuItem {
  label: string
  href?: string          // optional — omit if the item only has sub-items
  items?: CtaSubItem[]   // accordion sub-items in the mobile CTA dropdown
}
```

`href` becomes optional because some items (like "Setup online access") act as accordion headers with no direct link. Existing usages that pass `href` are unaffected — TypeScript will accept them. The desktop `CtaButton.tsx` renders `item.href` and will just navigate to undefined if `href` is absent — add a guard: `onClick={() => { if (item.href) window.location.href = item.href }}`.

---

## Step 2 — Rewrite `NavDrawer.tsx`

Replace the entire file. Import `MuiDrawer` directly (skip the design system `Drawer` wrapper — the custom chrome needs full-bleed layout control the wrapper doesn't support).

### State
```ts
const [activePanel, setActivePanel] = useState<NavItemMegamenu | null>(null)
const [activeCta, setActiveCta] = useState<'primary' | 'secondary' | null>(null)
const [expandedMenuItem, setExpandedMenuItem] = useState<string | null>(null)
const [query, setQuery] = useState('')
```

### Props — add `utilityLinks`
```ts
interface NavDrawerProps {
  open: boolean
  onClose: () => void
  navItems: NavItem[]
  secondaryNavItems?: NavItem[]
  primaryCta?: CtaAction
  secondaryCta?: CtaAction
  utilityLinks?: UtilityLink[]   // ← add this
  onSearch?: (query: string) => void
}
```

Update `ARTHeader.tsx` to pass `utilityLinks` into `NavDrawer`. Check the current `NavDrawer` call in `ARTHeader.tsx` and add `utilityLinks={utilityLinks}`.

### Contact button logic
```ts
const contactLink = utilityLinks?.find(l =>
  l.label.toLowerCase().includes('contact')
)
```

### Layout structure (pseudocode)

```tsx
<MuiDrawer
  open={open}
  onClose={handleClose}
  anchor="left"
  slotProps={{ paper: { sx: { width: 320, display: 'flex', flexDirection: 'column', height: '100%' } } }}
>
  {/* ── Top chrome ─────────────────────────────────────── */}
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, pt: 2, pb: 1.5, flexShrink: 0 }}>
    <IconButton icon="xmark" label="Close menu" variant="ghost" size="small" onClick={handleClose} />
    <Logo variant="mark" />
    {contactLink
      ? <Box component="a" href={contactLink.href} sx={{ fontSize: '0.875rem', fontWeight: 600, px: 1.5, py: 0.75, border: '1px solid', borderColor: 'border.default', borderRadius: (t) => `${t.shape.full}px`, color: 'text.primary', textDecoration: 'none !important' }}>Contact</Box>
      : <Box sx={{ width: '2.5rem' }} /> /* spacer to keep mark centred */
    }
  </Box>

  {/* ── CTA bar ────────────────────────────────────────── */}
  <Box sx={{ display: 'flex', gap: 1.5, px: 2, pb: 2, flexShrink: 0 }}>
    {primaryCta && (
      <Button label={primaryCta.label} variant="outlined" fullWidth
        endIcon={activeCta === 'primary' ? 'chevron-up' : 'chevron-down'}
        onClick={() => { setActiveCta(p => p === 'primary' ? null : 'primary'); setExpandedMenuItem(null) }}
      />
    )}
    {secondaryCta && (
      <Button label={secondaryCta.label} variant="contained" fullWidth
        endIcon={activeCta === 'secondary' ? 'chevron-up' : 'chevron-down'}
        onClick={() => { setActiveCta(p => p === 'secondary' ? null : 'secondary'); setExpandedMenuItem(null) }}
      />
    )}
  </Box>

  {/* ── CTA dropdown OR nav list ───────────────────────── */}
  <Box sx={{ flex: 1, overflow: 'hidden', position: 'relative' }}>

    {/* CTA dropdown panel */}
    {activeCta && (() => {
      const cta = activeCta === 'primary' ? primaryCta : secondaryCta
      return (
        <Box sx={{ position: 'absolute', inset: 0, overflow: 'auto', bgcolor: 'action.hover' }}>
          {cta?.menu?.map((item) =>
            item.items?.length ? (
              /* Accordion item */
              <Box key={item.label}>
                <ButtonBase onClick={() => setExpandedMenuItem(p => p === item.label ? null : item.label)}
                  sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 3, py: 2 }}>
                  <Typography variant="body">{item.label}</Typography>
                  <Icon icon={expandedMenuItem === item.label ? 'chevron-up' : 'chevron-down'} size="sm" />
                </ButtonBase>
                {expandedMenuItem === item.label && (
                  <Box sx={{ px: 5, pb: 1 }}>
                    {item.items.map(sub => (
                      <Box key={sub.href} component="a" href={sub.href}
                        sx={{ display: 'block', py: 1.5, color: 'inherit', textDecoration: 'none !important', fontSize: '0.9375rem' }}>
                        {sub.label}
                      </Box>
                    ))}
                  </Box>
                )}
                <Divider />
              </Box>
            ) : (
              /* Direct link */
              <Box key={item.label}>
                <Box component="a" href={item.href}
                  sx={{ display: 'block', px: 3, py: 2, color: 'inherit', textDecoration: 'none !important', fontSize: '0.9375rem' }}>
                  {item.label}
                </Box>
                <Divider />
              </Box>
            )
          )}
        </Box>
      )
    })()}

    {/* Nav slide container (hidden when CTA dropdown is open) */}
    {!activeCta && (
      <>
        {/* Level 1 — nav list */}
        <Box sx={{
          position: 'absolute', inset: 0, overflow: 'auto', px: 2, py: 1,
          transform: activePanel ? 'translateX(-100%)' : 'translateX(0)',
          transition: 'transform 280ms ease',
        }}>
          {/* Search */}
          {onSearch && <SearchBar ... />}

          {/* Primary nav */}
          <Box component="nav" aria-label="Mobile navigation">
            {navItems.map(item =>
              item.type === 'link'
                ? <NavPanelLink href={item.href} label={item.label} onClick={handleClose} />
                : <NavSlideRow item={item} onClick={() => setActivePanel(item)} />
            )}
          </Box>

          {/* Secondary nav */}
          {secondaryNavItems?.length && (
            <>
              <Divider sx={{ my: 1 }} />
              {secondaryNavItems.map(item =>
                item.type === 'link'
                  ? <NavPanelLink href={item.href} label={item.label} onClick={handleClose} />
                  : <NavSlideRow item={item} onClick={() => setActivePanel(item)} />
              )}
            </>
          )}
        </Box>

        {/* Level 2 — sub panel */}
        <Box sx={{
          position: 'absolute', inset: 0, overflow: 'auto', px: 2, py: 1,
          transform: activePanel ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 280ms ease',
        }}>
          <ButtonBase onClick={() => setActivePanel(null)}
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2, color: 'primary.main' }}>
            <Icon icon="chevron-left" size="sm" />
            <Typography variant="body" sx={{ fontWeight: 600 }}>Back</Typography>
          </ButtonBase>

          {activePanel && (
            <>
              <Typography variant="body" sx={{ fontWeight: 700, mb: 2, display: 'block' }}>
                {activePanel.label}
              </Typography>
              {activePanel.columns.flatMap(col => [
                col.heading && (
                  <Typography key={col.heading} variant="small" sx={{ fontWeight: 700, color: 'text.muted', mt: 1.5, mb: 0.5, display: 'block', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {col.heading}
                  </Typography>
                ),
                ...col.links.map(link => (
                  <NavPanelLink key={link.href} {...link} onClick={handleClose} />
                ))
              ])}
            </>
          )}
        </Box>
      </>
    )}
  </Box>
</MuiDrawer>
```

### Helper component — `NavSlideRow`
A simple button row for items with a sub-panel. Renders label + › chevron, full-width, with a divider below. Internal to `NavDrawer.tsx`.

```tsx
function NavSlideRow({ item, onClick }: { item: NavItemMegamenu; onClick: () => void }) {
  return (
    <Box>
      <ButtonBase onClick={onClick} sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5, borderRadius: 1, '&:hover': { bgcolor: 'action.hover' }, '&:focus-visible': { outline: '2px solid', outlineColor: 'border.focus' }, '&:focus': { outline: 'none' } }}>
        <Typography variant="body" sx={{ fontWeight: 700 }}>{item.label}</Typography>
        <Icon icon="chevron-right" size="sm" sx={{ color: 'text.muted' }} />
      </ButtonBase>
      <Divider />
    </Box>
  )
}
```

---

## Step 3 — Update `ARTHeader.tsx` to pass `utilityLinks`

Find the `<NavDrawer ...>` call in `ARTHeader.tsx` and add:
```tsx
utilityLinks={utilityLinks}
```

---

## Step 4 — Update story CTA data

In `src/stories/components/Header.stories.tsx`, enrich `sampleCtaSecondary` to demo the sub-item accordion pattern:

```ts
const sampleCtaSecondary: CtaAction = {
  label: 'Log in',
  menu: [
    { label: 'Member login', href: '/login/member' },
    { label: 'Employer login', href: '/login/employer' },
    { label: 'Adviser login', href: '/login/adviser' },
    {
      label: 'Setup online access',
      items: [
        { label: "I'm a member", href: '/setup/member' },
        { label: "I'm an employer", href: '/setup/employer' },
        { label: "I'm an adviser", href: '/setup/adviser' },
      ],
    },
  ],
}
```

---

## Step 5 — Guard `CtaButton.tsx` for optional `href`

In `src/components/Header/CtaButton.tsx`, the `MenuItem` click handler:
```tsx
// Before
onClick={() => { window.location.href = item.href; setOpen(false) }}

// After
onClick={() => { if (item.href) window.location.href = item.href; setOpen(false) }}
```

---

## Verification checklist

- [ ] Storybook Mobile View story: drawer opens from left
- [ ] Top chrome: × left, ART mark centred, Contact pill right
- [ ] "Join" and "Log in" are side-by-side pill buttons
- [ ] Tapping "Log in" opens grey dropdown, chevron flips to ↑
- [ ] "Setup online access" accordion expands within the grey dropdown
- [ ] Tapping "Log in" again collapses the dropdown
- [ ] Nav items (Why choose us?, Super, etc.) show › chevron with divider
- [ ] Tapping a nav item slides the sub-panel in from the right (RTL)
- [ ] "‹ Back" slides the sub-panel back to the right and restores the list (LTR)
- [ ] Contact us, Rewards, Learn (plain links) have no › chevron
- [ ] For employers / For advisers appear below a divider
- [ ] Desktop header is completely unaffected
- [ ] TypeScript: no errors on `CtaMenuItem` usages in `CtaButton.tsx`

---

## Prompt to execute

Paste this to Smithers / Copilot agent:

---

Rewrite the ART mobile nav drawer. Full plan is in `docs/Paolo/art-mobile-drawer-redesign.md`. Execute all 5 steps in order. ART brand only — do not change QSuper files.

Key changes:
1. Extend `CtaMenuItem` type in `types.ts` — `href` optional, add `items?: CtaSubItem[]`
2. Rewrite `NavDrawer.tsx` using `MuiDrawer` directly (not the Drawer wrapper). New layout: custom top chrome (× | ART mark | Contact pill), side-by-side CTA buttons with inline grey dropdown, slide animation for nav sub-panels (RTL enter, LTR exit, 280ms ease, CSS transform), two levels deep only
3. Add `utilityLinks` prop to NavDrawer and pass it from `ARTHeader.tsx`
4. Update `sampleCtaSecondary` in `Header.stories.tsx` to include sub-items
5. Guard `item.href` in `CtaButton.tsx` to handle optional href

After executing, run `get_errors` on all changed files and verify the Mobile View Storybook story.
