# Component selection — judgment guide

> **Inventory lives in the code map, not here.** For *what exists* (names, paths, status, what-composes-what, where-used) read `codemap.json` / `CODEMAP.md` (generated, always accurate). This doc holds only the **non-derivable judgment** the code can't express: which component to reach for, and the rules around adding new ones. Read it before building UI.

## The rules

- **Always use an existing Foundation component.** Check the code map first; only drop to raw MUI or custom HTML when nothing fits.
- **Never create a new component without Moe's sign-off.** If the code map shows nothing suitable, raise it with Moe — don't invent a one-off.
- **Moe owns this doc** (judgment). The generator owns the catalogue facts. When an API changes, the code map updates itself; Moe updates only the judgment here.

## What each component does (one-liner; inventory, paths, status & composition live in the code map)

| Component | What it does |
|---|---|
| Accordion | Expandable panels — one-open or multi-open |
| ActionBar | Promo/CTA banner — title, description, action, optional icon/image |
| AddressField | Dual residential + postal address capture with autocomplete |
| Alert | Inline status message — error/warning/info/success |
| AnnouncementBanner | Dismissible page-level announcement with optional CTA |
| ArtieAIButton | Gradient "Ask Artie" AI-assistant button — that entry point only |
| Autocomplete | Searchable dropdown with grouping/custom options |
| Badge | Count or dot overlay on a child element |
| Breadcrumb | Navigation trail (public pages) |
| Button | Primary action button — contained/outlined/ghost |
| Calendar | Standalone calendar view (use DatePicker for form inputs) |
| Card | Card primitive — closed/open/promo variants |
| Charts | Data visualisation — bar, line, pie, etc. |
| Checkbox | Single checkbox — default/boxed/card layout |
| Chip | Compact label, status badge, or dismissible tag |
| CloseButton | Standardised dismiss/close icon button |
| DataGrid | Interactive grid — editable/selectable/reorderable rows |
| DateOfBirthField | Date input tuned for date-of-birth capture |
| DatePicker | Single-date form input with calendar popover |
| DateRangePicker | Start + end date form input |
| DescriptionList | Label/value pairs for record detail views |
| Dialog | Modal with confirm/cancel; drawer on mobile |
| Divider | Horizontal/vertical rule |
| Drawer | Slide-out side panel (any edge) |
| ExpandableCardList | Editable list of expandable cards with per-item action |
| ExpandableItem | Single collapsible panel (lighter than Accordion) |
| FileUpload | Drag-and-drop file input with preview + validation |
| Footer | Brand-aware site footer |
| FormProgress | Multi-step form progress — simple/stepped/responsive |
| Header | Site header — megamenu, search, mobile drawer |
| HeroIcon | Large branded illustration icon |
| Icon | Font Awesome SVG icon (leaf dependency) |
| IconButton | Icon-only button with optional tooltip |
| IconList | Icon-prefixed list (custom or numbered) |
| InfoButton | Inline info/help icon → tooltip or dialog |
| InputSelectContainer | Inline select adornment fused inside another input |
| InvestmentOverview | Account investment-dials panel (member portal) |
| LinearProgress | Horizontal progress bar |
| LinkRow | Full-width nav row — icon, label, description, arrow |
| Logo | Brand logo — primary/secondary/mark |
| ManagedList | Panel for user-managed item lists (passkeys, beneficiaries…) |
| MemberOnline | Full member portal shell (nav, header, content, footer) |
| Menu | Dropdown menu; drawer on mobile |
| Modal | Simple dialog wrapper (no confirm pattern) |
| MOBreadcrumb | Member Online breadcrumb with back button |
| MoneyField | Currency input with thousand-separator formatting |
| PageTransition | Fades the content area between page navigations |
| Pagination | Page navigation for lists/tables |
| PasswordField | Password input with show/hide toggle |
| PercentageField | Percentage input clamped 0–100 |
| PosterPanel | Full-width image panel with gradient overlay + text column |
| QuickLinks | Icon + label navigation strip (scrolls on mobile) |
| RadioGroup | Radio set — default/boxed/card layout |
| Select | Dropdown select; drawer on mobile |
| Skeleton | Placeholder loading shimmer |
| SkipLinks | Keyboard-only accessibility skip links |
| Snackbar | Transient toast notification |
| Spinner | Loading indicator |
| StepperActions | Back/Next/Save/Exit bar for multi-step forms |
| StepTransition | Directional slide-and-fade between form steps |
| Switch | Toggle switch (on/off settings) |
| Table | Static data table — sorting, loading, empty states |
| Tabs | Tab navigation — default or segmented |
| TextArea | Multi-line text input |
| TextButton | Text-link style action |
| TextField | Single-line input — text/email/password/number/etc. |
| Tooltip | Hover tooltip with placement options |

## When to use which (the calls the code can't make for you)

- **Dialog vs Modal** — `Dialog` for a confirm/cancel pattern (built-in actions, semantic variants, drawer on mobile). `Modal` when you need full control of body + actions with no confirm pattern.
- **Select vs InputSelectContainer** — `Select` when the dropdown *is* the field (standalone, full-width, labelled). `InputSelectContainer` only when a select must sit *inside* another input (the unit/currency picker in `TextField`/`MoneyField`/`PercentageField` via `selectAdornment`). You rarely render the latter directly.
- **Table vs DataGrid** — `Table` for read-only tabular data. `DataGrid` when cells are editable/interactive, rows reorder, or rows are selectable.
- **Accordion vs ExpandableItem vs ExpandableCardList** — `ExpandableItem` for a single collapsible panel; `Accordion` for a set (one-open or multi-open); `ExpandableCardList` for an *editable item list* where each row needs its own action (e.g. Remove) beside the disclosure.
- **Breadcrumb vs MOBreadcrumb** — `MOBreadcrumb` inside Member Online (back button + brand-coloured active page); `Breadcrumb` on public-facing pages.
- **PageTransition vs StepTransition** — `PageTransition` for route-to-route fades (page level); `StepTransition` for between-step transitions inside a single multi-step form.
- **ManagedList vs InvestmentOverview** — `ManagedList` for user-managed item lists (passkeys, beneficiaries, authorities); `InvestmentOverview` specifically for the account investment-dials panel.
- **Button vs ArtieAIButton vs TextButton/IconButton** — `Button` for actions (`color` limited to `primary`/`success`). `ArtieAIButton` *only* for the "Ask Artie" AI entry point. `TextButton` for inline/secondary text actions; `IconButton` for icon-only.

## Typography & sizing reminders (full rules in essentials.md / typography.md)

- `small` (14px) and `caption` (12px): use sparingly — only genuinely supplementary text. Default to `body`.
- `InfoButton` size matches the line height of adjacent text — `sm` is the minimum.

## Stepped-form validation — error placement

On Next/Submit with an invalid step, render the error in a single `Alert` **directly above `StepperActions`** (a top-of-step error scrolls out of view). Field-level indicators stay; clear the error on advance/back. Reference: `src/features/investment-mix/InvestmentMixFlow.tsx`.

## Prop conventions (consistent across all components)

| Prop | Values |
|---|---|
| `variant` | component-specific |
| `size` | `small` / `medium` / `large` |
| `color` | `primary` `secondary` `error` `warning` `info` `success` (Button is restricted to `primary`/`success`) |
| Events | `onX` (`onChange`, `onClose`, `onOpenChange`) |
| Loading | `loading: boolean` |
| Accessible name | `label` (not `aria-label`) on inputs and icon-only buttons |

## Composition awareness

`Icon` is a leaf dependency — the code map shows it used by ~33 components, so any change to it has wide blast radius. Check `usedBy` in the code map before changing a low-level component.
