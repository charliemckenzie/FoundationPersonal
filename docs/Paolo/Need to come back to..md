# Issues & Open Questions

Running list of bugs, gaps, and things that need a decision. Discovered during design review sessions.

---

## Component Issues

- [ ] Alternating rows for table component #themeA
- [ ] Header row colouring for table #themeA
- [ ] Tooltip not working #themeA
- [ ] Form Select — default state is collapsed left, needs placeholder text #themeA
- [ ] ToggleButton Form — may need to match button border-radius and theme #themeA
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

## Related

- [[accessibility-audit-todo]] — formal WCAG audit with resolved and open items
- [[Tech Glossary]] — definitions for terms used above
- [[Obsidian Formatting Cheat Sheet]] — formatting reference
