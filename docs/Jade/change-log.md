# My Change Log

A personal record of changes I've made or commissioned. Most recent first.

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
