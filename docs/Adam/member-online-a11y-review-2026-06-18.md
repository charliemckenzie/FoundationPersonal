# Member Online — Accessibility Review (`/member-online`)

**Date:** 2026-06-18
**Scope:** The Member Online portal shell and **navigation** — desktop SideNav + flyout, mobile header + drawer (with drill-down), footer, breadcrumb, and skip-link wiring.
**Method:** Static WCAG 2.2 AA conformance review (Flanders / `/conformanceReport`) + code-level tab/focus-order analysis. Runtime Playwright testing was deliberately not used at the user's request; tab order was reasoned from DOM structure instead.
**Standard:** WCAG 2.2 AA.

---

## Summary

| ID | Sev | WCAG | Component | Issue | Status |
|----|-----|------|-----------|-------|--------|
| C1 | CRITICAL | 2.4.1 | SkipLinks / Layout / SideNav / Footer | Skip-link targets (`main-content`/`main-nav`/`footer`) have no matching IDs — all three skip links are dead | Fixed |
| C2 | CRITICAL | 4.1.2 | MobileHeader / IconButton | Hamburger lacks `aria-expanded`/`aria-controls`; `IconButton` couldn't even forward them | Fixed |
| C3 | CRITICAL | 2.1.1 / 4.1.2 | NavFlyout / SideNav | `role="menu"` had no arrow-key traversal; focus not restored to trigger on Escape | Fixed |
| I1 | IMPORTANT | 2.4.3 (+ARIA Rule 4) | MobileNavDrawer | Drill-down moved no focus; inactive panel was `aria-hidden` but still tabbable (ghost controls) | Fixed |
| I2 | IMPORTANT | 2.4.3 | MemberOnlineLayout | Tab order verified: DOM order matches visual order; no positive `tabindex`; desktop/mobile chrome uses `display:none` so hidden branches leave the tab sequence correctly. Only leak was the drawer (I1). | Verified / no change |
| I3 | IMPORTANT | 2.4.7 | MemberFooter | Footer links had no design-system `:focus-visible` style | Fixed |
| I4 | IMPORTANT | 2.4.4 | MOBreadcrumb | Ancestor crumbs fell back to dead `href="#"` | Fixed |
| I5 | IMPORTANT | 2.4.4 / 2.1.1 | page | Breadcrumb "Go back" wired to a no-op handler | Fixed (page wiring) |
| S1 | SUGGESTION | 2.4.2 | page | No `<h1>` / no distinctive route `<title>` (skip-to-main landed on nothing meaningful) | Fixed |
| S2 | SUGGESTION | 1.3.1 | MobileNavDrawer | Drill-down children didn't receive `active`/`aria-current` | Fixed |
| S3 | SUGGESTION | 2.5.8 | IconButton | Target sizes pass (~44px / 36px) — no defect | No change |
| S4 | SUGGESTION | 1.1.1 | NavItem / MOBreadcrumb | Decorative icons correctly `aria-hidden` — no defect | No change |

---

## Detail & remediation

### C1 — Skip links resolve to nothing (WCAG 2.4.1)
`SkipLinks` (root layout) renders anchors to `#main-content`, `#main-nav`, `#footer`, but `MemberOnlineLayout` assigned none of those IDs. Every skip link was present but landed nowhere — the single most important keyboard bypass on the page was non-functional.
**Fix:** `id="main-content"` + `tabIndex={-1}` on `<main>` (`MemberOnlineLayout`); `id="footer"` + `tabIndex={-1}` on `<footer>` (`MemberFooter`). The `main-nav` target is breakpoint-aware: `MemberOnlineLayout` uses `useMediaQuery(up('lg'))` to assign `id="main-nav"` + `tabIndex={-1}` to the desktop SideNav `<nav>` at `lg+` and to the mobile `<header>` below `lg` — so exactly one **visible, focusable** nav target exists at any width, with no duplicate id. All three skip links now land correctly at every viewport. (Re-review confirmed the first pass left `main-nav` desktop-only and non-focusable; this is the corrected fix.)

### C2 — Hamburger missing disclosure semantics (WCAG 4.1.2)
The mobile menu trigger announced no expanded/closed state, and `IconButton`'s prop interface didn't accept or forward `aria-expanded`/`aria-controls`.
**Fix:** `IconButton` now accepts and forwards `aria-expanded`, `aria-controls`, `aria-haspopup`. `MemberOnlineLayout` lifts `drawerOpen` into `MobileHeader`, which passes `aria-haspopup="menu"`, `aria-expanded`, and `aria-controls` (pointing at the drawer paper `id`, set only while open).

### C3 — Flyout menu keyboard semantics (WCAG 2.1.1, 4.1.2)
The flyout opened and Escaped fine and focused its first item, but `role="menu"` exposed no ArrowUp/Down/Home/End traversal, and Escape dropped focus to `<body>` instead of the trigger.
**Fix:** `NavFlyout` adds roving arrow-key navigation (Up/Down/Home/End) across `menuitem`s; Escape now restores focus to the triggering parent item. Click-away intentionally does not steal focus back.

### I1 — Mobile drawer drill-down focus (WCAG 2.4.3 / ARIA Rule 4)
On drill-down the panel slid but focus stayed on the now-off-screen parent; the inactive panel was `aria-hidden` yet its controls stayed in the tab order (tabbable "ghost" elements). Back restored no focus.
**Fix:** inactive panel now uses `inert` (removes it from both the a11y tree and tab order). Entering drill-down moves focus to the drill heading (announces the new context); Back restores focus to the parent item that opened it.

### I3 — Footer focus indicator (WCAG 2.4.7)
**Fix:** footer links get the same `:focus-visible` ring (`border.focus`) used by the breadcrumb and nav items.

### I4 / I5 — Breadcrumb dead links & no-op back (WCAG 2.4.4)
**Fix:** `MOBreadcrumb` renders an ancestor without an `href` as plain text instead of `href="#"`. The demo page no longer passes a no-op `onBack` (so the back button isn't rendered) and gives the Home crumb a real route.

### S1 / S2 — Page heading & drawer current state
**Fix:** page gains an `<h1>` (also a meaningful landing point for the skip-to-main link); drill-down children receive `active`/`aria-current`.

---

## Verification
- `npm run dev` → Tab into `/member-online`: skip links reveal on first Tab; "Skip to main content" focuses `<main>`; "Skip to footer" focuses the footer.
- Desktop flyout: open with Enter/Space, traverse with arrows, Escape returns focus to the parent item.
- Mobile drawer: open, focus enters; drill-down moves focus to the heading; Back returns focus to the parent; inactive panel is not tabbable.
- Re-review by Flanders to close each finding with evidence.
