# Issues & Open Questions

Running list of bugs, gaps, and things that need a decision. Discovered during design review sessions.

---

## Component Issues

- [ ] Alternating rows for table component #themeA
- [ ] Header row colouring for table #themeA
- [ ] Tooltip not working #themeA
- [ ] Form Select — default state is collapsed left, needs placeholder text #themeA
- [ ] Alert filled — icon not visible #themeA

---

## Card Component — A11y Follow-ups (Flanders review, May 13 2026)

Flagged as recommendations (not AA failures). Fix in a follow-up pass.

- [ ] **Double-announcement on interactive open cards** — `aria-label={title}` on `CardActionArea` causes screen readers to read the title twice (once from the label, once from the inner `<p>`). Fix: remove `aria-label={title}` and let the button text content serve as the accessible name. File: `src/components/Card/index.tsx`
- [ ] **Hardcoded `h3` heading level** — non-interactive open cards always render `<h3>`. Add optional `titleAs` prop (`'h2' | 'h3' | 'h4' | 'h5' | 'h6'`, default `'h3'`) so consumers can match page hierarchy. File: `src/components/Card/index.tsx`
- [ ] **`imageAlt` defaults to `''`** — silently marks all images as decorative if the consumer forgets to pass it. Remove the `= ''` default from destructuring; document the intent clearly in the JSDoc. File: `src/components/Card/index.tsx`

---

## Design Decisions Needed

- [ ] Hero icon colours — conflict between #themeA and #themeB. Needs resolution before either theme is marked stable.

---

## QSuper Header — Megamenu layout refinements + story recovery

**Full plan:** `docs/Paolo/qsuper-megamenu-layout-refinements.md`

Paste this prompt to execute:

---

The QSuper header needs the following fixes. Execute in order.

**1. Recover missing QSuper Storybook story**
`src/stories/components/Header.stories.tsx` is missing the QSuper story — the file ends at MobileView. Re-add: ThemeProvider + CssBaseline + createBrandTheme + themeB imports, the `qsuperTheme` constant, the `qsuperAudienceLinks` / `qsuperResourceLinks` / `qsuperNavItems` data (Products → Advice), and the `QSuperBrand` story export with decorator. Full data is in `docs/Paolo/qsuper-megamenu-layout-refinements.md` Step 0.

**2. Revert nav height change**
In `src/components/Header/QSuperMainBar.tsx`, remove `alignSelf: 'stretch'` from the nav Box if present.

**3. Megamenu: contain width + blue top border + rounded bottom corners**
In `src/components/Header/MegaMenuPanel.tsx`, QSuper branch only:
- Outer fixed Box becomes a transparent positioning layer (remove bgcolor and borderBottom from it)
- Inner white panel: maxWidth capped to lg breakpoint value, `mx: 'auto'`, `borderTop: '3px solid'` borderColor `primary.main`, borderBottom subtle, `borderRadius: (t) => \`0 0 ${t.shape.lg}px ${t.shape.lg}px\``
- ART layout unchanged

**4. Megamenu: cap at 2 nav columns**
Change `Math.min(item.columns.length, 3)` → `Math.min(item.columns.length, 2)` in the QSuper grid.

**5. Promo panel: beveled/inset**
In `QSuperPromoPanel` inside MegaMenuPanel.tsx: add `m: 2`, `borderRadius: (t) => \`${t.shape.lg}px\``, width 300, remove `alignSelf: 'stretch'`, change `justifyContent` to `'space-between'`.

Verify: QSuper brand story loads in Storybook, Products megamenu is centred ~1200px wide, 3px blue top border, 2 columns, inset rounded navy promo panel. ART Default story unaffected.

---

## Related

- [[accessibility-audit-todo]] — formal WCAG audit with resolved and open items
- [[Tech Glossary]] — definitions for terms used above
- [[Obsidian Formatting Cheat Sheet]] — formatting reference
