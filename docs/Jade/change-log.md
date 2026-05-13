# My Change Log

A personal record of changes I've made or commissioned. Most recent first.

---

## Card — Contained icon feature variant + HeroIcon size overrides
**Date:** May 13, 2026
**Files:** `src/stories/components/Card.stories.tsx`, `src/components/HeroIcon/index.tsx`

### What changed

Added a new **Contained — icon feature** story to the Card component in Storybook (positioned after "Contained — interactive (whole card)"). It's a `contained` card (free-form children) composed of:
- `HeroIcon` — 88px container / 44px icon (5.5rem / 2.75rem). ART icon set with selectable background.
- `Typography` heading + body copy
- `TextButton` CTA — lighter visual weight than the action button variants

To support the specific 88×44 sizes (not covered by HeroIcon's existing size scale), two optional props were added to `HeroIcon`:
- `iconSizeOverride` — CSS length string, must be rem
- `containerSizeOverride` — CSS length string, must be rem

**Story controls:**
- **Icon** — select dropdown of the full ART icon set (~150 icons)
- **Icon background** — `none | brand | white | grey`

### Team reviews

**Flanders (a11y) — PASS WITH NOTES → fixed:**
- Removed `aria-label` from decorative HeroIcon (heading communicates topic)
- Updated TextButton label from generic "Call to action" to descriptive "Learn more about this feature"

**Chalmers (code quality) — PASS WITH NOTES → fixed:**
- `??` → `||` operator on override fallbacks (empty string would have silently bypassed the fallback)
- Strengthened JSDoc on both override props — rem-only, must pass both together

**Marge (visual consistency) — PASS WITH NOTES → fixed:**
- Body text spacing updated to `mb: { xs: 3, sm: 4 }` to match other card variant spacing

**Lisa (documentation) — done:**
- Story description updated to cover decorative icon rule, button label guidance, ratio rationale, and heading level note

### Structural note (resolved)
Marge flagged that the story was originally named "Open — icon" but used `variant="contained"` while all other "Open —" stories use `variant="open"`. Renamed to **Contained — icon feature** to correctly reflect the variant, and repositioned to sit directly after "Contained — interactive (whole card)" in the Storybook sidebar.

---

## Card — showSubtitle control extended to remaining open variants
**Date:** May 13, 2026
**Files:** `src/stories/components/Card.stories.tsx`

### What changed

The `showSubtitle` boolean Storybook control (added earlier to "Open — image + actions") was extended to the three remaining open card variants:
- **Open — no image**
- **Open — interactive (whole card)**
- **Open — href link card**

Each story now has the toggle on by default. Toggling off passes `subtitle={undefined}` to the Card, removing the element from the DOM (not CSS-hiding it).

### Accessibility (Flanders — PASS)

All three variants passed. In the interactive and link card contexts, `aria-label={title}` on `CardActionArea` means the accessible name is completely decoupled from subtitle state — toggling it has no effect on what assistive technology announces.

### Documentation (Lisa)

Each story now has a `parameters.docs.description.story` string in the autodocs panel explaining the variant purpose, the `showSubtitle` toggle, and the relevant a11y behaviour.

---

## Card — Accessibility fixes + subtitle toggle
**Date:** May 13, 2026
**Files:** `src/components/Card/index.tsx`, `src/app/themes/factory.ts`, `src/stories/components/Card.stories.tsx`

### What the issue was

Three things needed fixing:

1. **No focus ring on interactive cards.** When a Card has an `onClick` or `href`, the whole card becomes a button/link via MUI's `CardActionArea`. But unlike every other interactive component in the codebase, it had no explicit focus outline — just a faint background tint. Failed WCAG 2.4.11 (Focus Appearance, AA).

2. **Action buttons were indistinguishable by screen readers.** On a page with multiple cards, "Get started / Learn more / Get started / Learn more" with nothing to say which button belongs to which card. Failed WCAG 2.4.6 (Headings and Labels, AA).

3. **Subtitle wasn't controllable in Storybook.** The "Open — image + actions" story had the subtitle hardcoded, so there was no way to preview the layout without it.

### How we fixed it

1. **Focus ring** — added `MuiCardActionArea` to the theme overrides in `factory.ts` with `&.Mui-focusVisible { outline: 2px solid border.focus; outlineOffset: 2px }`. Same pattern used by Accordion, Checkbox, Radio.

2. **Button labels** — action buttons in the open card now get `aria-label` built from the card title: `"Get started: Card heading"`, `"Learn more: Card heading"`. Falls back gracefully to the visible label when no title is present.

3. **Subtitle toggle** — added a `showSubtitle` boolean control to the `OpenWithActions` story. On by default. Toggle off to preview the card without the supporting detail line.

### Follow-ups logged

Three Flanders recommendations parked in `docs/Paolo/Need to come back to..md`:
- Double-announcement on interactive open cards (`aria-label` + inner `<p>` duplication)
- Hardcoded `h3` heading level — should be a `titleAs` prop
- `imageAlt` defaulting to `''`, silently marking all images as decorative
