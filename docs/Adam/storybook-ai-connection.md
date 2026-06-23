# Connecting Storybook to AI — `@design` block convention

> **Status:** Pilot complete (Button, Alert, Dialog, TextField). Ready to roll out across all story files.

---

## The problem this solves

Storybook holds the richest design documentation in the project — variant rationale, placement rules, when-to-use guidance, anti-patterns. But Storybook is designed for humans in a browser, not AI. AI can't navigate the Storybook UI, and scraping the built output is fragile.

The `.stories.tsx` files are already AI-readable. The gap was that design guidance was scattered across individual story exports and buried in Storybook config (`parameters.docs.description`), not surfaced at the file level where AI can find it efficiently.

---

## The solution

A structured `@design` JSDoc block at the top of each `.stories.tsx` file. The codemap generator extracts it automatically — no separate files to maintain, no manual sync.

### What AI sees after the change

Reading `docs/codemap/Button.md` now gives AI:

```md
# Button
Status: stable | Path: src/components/Button
StoryFile: src/stories/components/buttons/Button.stories.tsx

## Design guidance
Purpose: Primary action trigger...
Variants: contained (one per view)...
Avoid: multiple contained buttons...

Composes: Icon
Used by: Dialog, Card, StepperActions...
```

Everything needed for a correct design decision — in one file read, no browser required.

---

## How it works

### `@design` block format

Add this as the very first thing in a `.stories.tsx` file (before all imports):

```tsx
/**
 * @design
 * Purpose: One-sentence description of what the component is for.
 *
 * Variants:
 *   - variantName: When to use it.
 *
 * Sizes / Colors / Anatomy / Placement: (whichever are relevant)
 *
 * Avoid:
 *   - Common misuses and anti-patterns.
 */
import type { Meta, ... } from '@storybook/nextjs-vite';
```

**Rules:**
- One block per file, always first (before all imports).
- Storybook ignores JSDoc comments — zero impact on the docs UI.
- Write for AI's decision-making, not for human reading in Storybook.
- Structure: Purpose → relevant sections (Variants, Anatomy, Sizes, Colors, Placement) → Avoid.
- Keep bullets to 1–2 lines. Prefer specificity over completeness.

### Generator integration

`scripts/generate-codemap.ts` does the extraction automatically:

1. `findStoryFiles()` — recursive walk of `src/stories/` to find all `*.stories.tsx`.
2. `extractDesignBlock()` — extracts the `@design` block, strips `* ` line prefixes, trims blanks.
3. `attachStoryFiles()` — matches story file to node by filename convention (`Button.stories.tsx` → `Button` node), attaches `storyFile` + `design`.

Output flows to:
- `codemap.json` — `storyFile` + `design` fields on each node.
- `docs/codemap/<Name>.md` — `**StoryFile:**` line + `## Design guidance` section.

After adding or editing `@design` blocks: `npm run generate-codemap`.

---

## Pilot examples (reference these)

| Component | Story file | What it demonstrates |
|---|---|---|
| Button | `src/stories/components/buttons/Button.stories.tsx` | Variants, sizes, colors, icon rules |
| Alert | `src/stories/components/Alert.stories.tsx` | Severities, anatomy, placement rules |
| Dialog | `src/stories/components/Dialog.stories.tsx` | Variants, mobile behaviour, button labelling |
| TextField | `src/stories/components/TextField.stories.tsx` | Specialised variants, adornments, validation |

Read one of these before writing a new block — the format is easier to copy than to infer.

---

## Rollout plan

### Status (2026-06-23)
- **Done:** Button, Alert, Dialog, TextField
- **Remaining:** all other `.stories.tsx` files in `src/stories/components/` and subdirectories

### Story files that need `@design` blocks

Top-level components (`src/stories/components/`):
- ActionBar, AnnouncementBanner, Autocomplete, Badge, Breadcrumb, Calendar
- Card, Chip, CloseButton, DateOfBirthField, DatePicker, DateRangePicker
- Drawer, Divider, FileUpload (subdirectory), Footer, Header, HeroIcon
- Icon, IconList, InputSelect, LinearProgress, Logo, ManagedList
- Menu, Modal, MoneyField, PageTransition, Pagination, PasswordField
- PercentageField, PosterPanel, QuickLinks, Select, Skeleton, SkipLinks
- Snackbar, Spinner, Switch, Tabs, TextArea, Tooltip

Subdirectories:
- `buttons/` — ArtieAIButton, IconButton, InfoButton, TextButton
- `Checkbox/` — Checkbox (+ CheckboxButtonGroup, CheckboxCardGroup)
- `expandable/` — Accordion, ExpandableItem, ExpandableCardList
- `RadioGroup/` — RadioGroup (+ RadioButtonGroup, RadioCardGroup)
- `stepped-forms/` — FormProgress, StepperActions
- `tables/` — Table, DataGrid, ResponsiveTable

### How to run the rollout (point an agent at this)

1. Read the pilot examples above before starting.
2. For each story file in the remaining list:
   - Read the story file to understand its variants, props, and usage patterns.
   - Read `docs/codemap/<Name>.md` for the existing inventory context.
   - Write the `@design` block (Purpose → relevant sections → Avoid) before the first import.
3. Run `npm run generate-codemap` once at the end.
4. Check a few `docs/codemap/*.md` files to confirm `## Design guidance` sections are present and readable.
5. Commit: `docs(stories): add @design blocks across component library`.

**Note:** The generator matches story files to nodes by filename only. If a story file doesn't follow the `<ComponentName>.stories.tsx` naming convention it won't be matched. Check any that don't appear in the codemap output after regeneration.

---

## What not to do

- **Don't duplicate `@design` content into `component-selection.md`** — that doc holds judgment (when to use which component); `@design` holds per-component design detail. They serve different purposes.
- **Don't hand-edit `docs/codemap/*.md`** — it's generated. Edit the story file, regenerate.
- **Don't put API documentation in `@design`** — prop types, TypeScript signatures, and default values are handled by Storybook autodocs. `@design` is about design decisions, not API reference.
- **Don't write for humans reading Storybook** — the existing `parameters.docs.description` blocks handle that. `@design` is an additional layer for AI, invisible to Storybook users.
