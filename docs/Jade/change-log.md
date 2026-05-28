# My Change Log

A personal record of changes I've made or commissioned. Most recent first.

---

## ActionBar — new component, stories, a11y fixes, and documentation
**Date:** May 28, 2026
**Branch:** `feat/action-bar`
**Files:**
- `src/components/ActionBar/index.tsx` (new)
- `src/components/ActionBar/actionBarParts.tsx` (new)
- `src/stories/components/ActionBar.stories.tsx` (new)
- `src/components/Button/index.tsx`
- `src/stories/index.mdx`
- `.storybook/preview.tsx`
- `src/index.ts`

### What changed

#### 1. New ActionBar component
A new promotional banner component — `<ActionBar>` — added to the library.

**Props:**
- `title` — primary heading
- `description` — supporting body text
- `action` — CTA button config (`label`, `onClick`, `href`)
- `image` — optional; `variant: 'icon'` for a small circular icon, `variant: 'decorative'` for a bleed image on the left
- `variant` — `'dark'` (brand navy), `'primary'` (brand blue), `'light'` (neutral tinted surface). Default: `'light'`

**Two layout branches:**
- *Icon / no-image*: horizontal row — icon, heading + description, button. Responsive: stacks vertically on mobile.
- *Decorative*: image fills left column (~38% width), content on the right with `h2`-sized heading. Responsive: image capped at 200px on mobile, stacks above content.

Component split across two files (`index.tsx` + `actionBarParts.tsx`) to stay within the 200-line limit.

#### 2. Three Storybook stories
- **Contained - Icon** — playground with icon selector (ART icon library), variant control, and button label control
- **Contained with image** — decorative image layout with variant and button label controls
- **Contained - No Icon** — text-only layout with variant and button label controls

#### 3. Library exports added
`ActionBar`, `ActionBarProps`, `ActionBarAction`, and `ActionBarImage` exported from `src/index.ts`.

#### 4. Component registered in Storybook
- Added to `src/stories/index.mdx` status table as `draft`, positioned alphabetically after Alert
- Added to `.storybook/preview.tsx` story sort order (`Action Bar` after `Alert`)

#### 5. Accessibility fixes (Flanders review)
- **WCAG 4.1.1 — Nested interactive controls**: The `ActionButton` was wrapping a `<button>` inside an `<a>` tag (invalid HTML). Fixed by adding `href` and `target` props to the `Button` component — MUI ButtonBase automatically renders as `<a>` when `href` is set — and passing `href` directly to `Button` instead of wrapping.
- **WCAG 1.3.6 — Identify purpose**: Added `aria-label={title}` to both `<section>` renders so each ActionBar has an accessible name.

#### 6. Story documentation (Lisa review)
All three stories now have full usage descriptions covering layout purpose, responsive behaviour, and guidance on when to use each variant. Component-level description updated to cover all three variants and image slot options.

---

## Card — removed two stories
**Date:** May 28, 2026
**Files:** `src/stories/components/Card.stories.tsx`

### What changed
Removed two stories that were no longer needed:
- **Contained — horizontal + icon** — removed export, type, and playground entry
- **Open — horizontal image + actions** (Promo variant) — removed export, type, `bgTokenMap` constant, and playground entry

The `PROMO_PLACEHOLDER_IMAGE` constant was also removed as it was only used by the Promo story.

---

## Card — Playground story, autodocs, and controls clean-up
**Date:** May 18, 2026
**Files:** `src/stories/components/Card.stories.tsx`

### What changed

#### 1. Docs page switched from custom MDX to autodocs
The custom `Card.mdx` accordion page was removed. The stories file now uses `tags: ['autodocs']` — the same pattern as FormProgress under Stepped Forms. Each story appears as its own named section in the docs page with a description, live canvas, and controls panel. No more click-to-expand.

#### 2. Playground story added
A new **Playground** story sits at the top of the docs page. It has a single **Variant** dropdown listing all 9 Card layouts:

- Contained
- Contained — interactive (whole card)
- Contained — icon feature
- Contained — horizontal + icon
- Open — image + actions
- Open — no image
- Open — interactive (whole card)
- Open — href link card
- Open — horizontal image + actions

Selecting a variant in the dropdown swaps the canvas to that layout in real time. A **Show subtitle** toggle works across all variants. This replaces the need to jump between separate stories to compare layouts.

#### 3. Dev-only controls hidden from the controls panel
The following props were hidden from the Storybook controls table across all stories. They are still used internally by the stories but are not relevant to a designer reviewing the component:

- `title`
- `subtitle`
- `imageSrc`
- `imageAlt`
- `href`
- `badge`
- `sx`

---

## Card — documentation rewrite, new promo variant, and Storybook improvements
**Date:** May 15, 2026
**Files:** `src/components/Card/index.tsx`, `src/stories/components/Card.stories.tsx`, `src/stories/components/Card.mdx`

### What changed

#### 1. Documentation rewritten for a designer audience
All story descriptions were rewritten to remove developer-facing language (rem sizes, prop names, ARIA implementation detail). Tone and structure now matches Material Design 3 — purpose first, brief guidance on when to use, key decisions highlighted in bold. No implementation detail.

#### 2. `showSubtitle` toggle added to all remaining stories; defaults set to `false` on contained variants
The three contained variants (**Contained**, **Contained — interactive**, **Contained — icon feature**) did not have a subtitle toggle. All three now have one, defaulting to `false`. The open variants retain their `true` default.

#### 3. New `promo` variant — Open — horizontal image + actions
A new `variant="promo"` was added to the Card component. Layout: image fills the left side (~35% width), content sits to the right. Stacks vertically on small screens.

**Component changes (`src/components/Card/index.tsx`):**
- `Box` import added
- `variant` union extended: `'contained' | 'open' | 'promo'`
- Promo renders with `h5` heading (same as all other variants), responsive flex layout, and the same action button pattern as the open variant

**Accessibility (Flanders — PASS):**
- Heading swaps to `<p>` when card is interactive (prevents heading inside button)
- `aria-label={title}` on `CardActionArea`
- Action buttons carry contextual `aria-label="Action: Card title"`
- Stacks to column at `xs/sm` — safe for keyboard and zoom users

**Story controls for the new variant:**
| Control | Options | Default |
|---|---|---|
| Show subtitle | boolean | off |
| Show primary action | boolean | on |
| Show secondary action | boolean | off |
| Show text button | boolean | off |
| Background colour | white / grey / light blue | white |

Background colour maps to `background.paper`, `background.default`, and `background.brandClear` (light blue brand token).

`actionStyle` select control replaced with an independent `showTextButton` boolean toggle — consistent with how primary and secondary actions are controlled.

#### 4. Image badge/pill feature added
A `badge?: string` prop was added to the Card component. When set, renders a white pill label absolutely positioned in the top-left of the image. Applies to both the `open` and `promo` variants.

- Position: `1rem` from top and left edges (previously `2px` — too tight)
- Internal padding: `px: 2, py: 0.75` — breathing room around the label
- Text centred with `display: flex`, `alignItems: center`, `justifyContent: center`
- `pointerEvents: none` — does not interfere with interactive cards

Four stories now have `showBadge` (boolean, default off) and `badgeLabel` (text, default "New members") controls:
- Open — image + actions
- Open — interactive (whole card)
- Open — href link card
- Open — horizontal image + actions

#### 5. New story: Contained — horizontal + icon
A new layout composition using `variant="contained"`: icon on the left (64px container / 32px icon), heading and supporting copy in the centre, action on the right. Responsive — stacks to column on small screens.

**Accessibility (Flanders — PASS):**
- Icon is decorative — no `aria-label`, heading communicates the topic
- `minWidth: 0` on content box prevents long headings blowing out the flex layout
- Stacks to column on `xs` screens

**Story controls:**
| Control | Options | Default |
|---|---|---|
| Icon | ART icon set | Calculator |
| Icon background | none / brand / white / grey | brand |
| Show subtitle | boolean | off |
| Show primary action | boolean | on |
| Show secondary action | boolean | off |
| Show text button | boolean | off |

Typography matches all other card variants: `h5` heading, `mb: 1` (8px) below heading, `variant="small"` for subtitle, `variant="body"` for supporting copy.

#### 6. Storybook docs page restructured with accordions
`autodocs` was replaced with a custom MDX docs page (`Card.mdx`). Each story is now inside a collapsible MUI Accordion. Structure:
- **Contained** — 4 stories
- **Open — vertical** — 4 stories
- **Open — horizontal** — 1 story

Each accordion shows the story description (`Description`), live canvas (`Canvas`), and controls (`Controls`).

#### 7. Story renamed
"Promo — image + content" renamed to **"Open — horizontal image + actions"** to sit consistently within the Open family naming convention.

#### 8. npm audit — safe fixes applied
Ran `npm audit fix`. Resolved 7 high-severity vulnerabilities (`ws <8.20.1`, `zod <4.0`, associated licence flags). 8 critical issues remain — all trace back to `next` itself and require a major version upgrade to `next@16.2.6`. Parked for a separate scoped upgrade project.

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
