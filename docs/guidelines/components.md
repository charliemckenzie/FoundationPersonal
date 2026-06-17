# Components

## The Rules

**Always use an existing component. Never create a new one without Moe's explicit sign-off.**

Before writing any UI code, check the catalogue below. If a component here can do the job — even partially — use it, extend it, or compose it. Do not reach for raw MUI or custom HTML when a Foundation component exists.

If something isn't listed here, check `src/components/` directly before assuming it doesn't exist — this document may be behind. Only raise it with Moe if a thorough check of the codebase confirms nothing suitable exists.

This applies to all agents. No exceptions.

---

## Maintained by Moe

Moe owns this document. When a new component is created or an existing one changes its API, Moe must update this file before the work is considered done. Lisa may assist with formatting, but Moe is the accountable party.

If this document is out of date, flag it to Moe immediately.

---

## Quick Reference

| Component | What it does |
|---|---|
| `Accordion` | Expandable content panels — one open at a time or multi-open |
| `ActionBar` | Promo/CTA banner — title, description, action button, and optional icon or decorative image |
| `AnnouncementBanner` | Dismissible page-level announcement — title, description, optional CTA, optional illustration, session-persist dismiss |
| `AddressField` | Dual residential + postal address capture with autocomplete |
| `Alert` | Inline status message — error, warning, info, success |
| `ArtieAIButton` | Gradient "Ask Artie" AI-assistant call-to-action button |
| `Autocomplete` | Searchable dropdown with grouping and custom option rendering |
| `Badge` | Count or dot overlay on a child element (e.g. notification bubble on an icon) |
| `Breadcrumb` | Navigation trail showing current location in the hierarchy |
| `Button` | Primary action button — contained, outlined, ghost |
| `Calendar` | Date picker calendar view; use DatePicker for form inputs |
| `CloseButton` | Dismiss / close icon button — standardised X button used by Alert, Dialog, Drawer, and Modal |
| `Card` | Card primitive with three style variants (contained, border, open), optional top section modes (image, hero icon, none), body content, and bottom actions |
| `Charts` | Data visualisation — bar, line, pie etc. |
| `Checkbox` | Single checkbox input — default, boxed, or card layout |
| `Chip` | Compact label, status badge, or dismissible tag |
| `DataGrid` | Interactive, div-based grid (ARIA `role="table"`) for editable cells, row reordering, selection, sorting, pagination, and a summary footer. Use `Table` for static tabular data. |
| `DateOfBirthField` | Date input optimised for date-of-birth capture |
| `DatePicker` | Single-date form input with calendar popover |
| `DateRangePicker` | Start + end date form input with calendar popover |
| `DescriptionList` | Displays label/value pairs for record detail views. Compound component — use `DescriptionList.Item` for each row. Optional `title`, `action` slot per row. |
| `Dialog` | Modal dialog with confirm/cancel actions; adapts to drawer on mobile |
| `Divider` | Horizontal or vertical rule for separating content |
| `Drawer` | Slide-out side panel — left, right, top, or bottom |
| `ExpandableCardList` | List of expandable cards, one open at a time, each with a custom header summary and an optional sibling action (e.g. Remove). Use for editable item lists like beneficiaries. |
| `ExpandableItem` | Single collapsible content panel (lighter than Accordion) |
| `FileUpload` | Drag-and-drop file input with preview and validation |
| `Footer` | Brand-aware site footer with logo, nav, and contact sections |
| `FormProgress` | Multi-step form progress — linear, stepped, or responsive |
| `Header` | Site header with megamenu, search, and mobile drawer |
| `HeroIcon` | Large branded illustration icon with background options |
| `Icon` | Font Awesome SVG icon — all styles and sizes |
| `IconButton` | Icon-only button with optional tooltip |
| `InfoButton` | Inline info/help icon that opens a tooltip or dialog — sits alongside label text |
| `IconList` | Icon-prefixed list (custom icons or numbered) |
| `InvestmentOverview` | Account investment panel — header (account name + total balance) over a card per investment dial (current investments + future contributions / payments), each with an edit button and mix; footer with Change all and View history |
| `LinearProgress` | Horizontal progress bar for loading or completion state |
| `Logo` | Brand logo — primary, secondary, or mark; brand-aware |
| `ManagedList` | Panel for user-managed item lists — header with icon/title, item rows with add/edit/delete, empty state, and optional bulk remove. Use for passkeys, beneficiaries, authorities, and similar. |
| `MemberOnline` | Full member portal layout (nav, header, content area, footer) |
| `MOBreadcrumb` | Member Online breadcrumb with optional back button — shows section path with active page in brand colour |
| `Menu` | Dropdown menu triggered by any element; adapts to drawer on mobile |
| `Modal` | Simple dialog wrapper with title, content, and action slots |
| `MoneyField` | Currency input with thousand-separator formatting |
| `PageTransition` | Fades the content area between page navigations; reusable, global, per-route opt-out, respects reduced motion |
| `Pagination` | Page navigation for lists and tables |
| `PasswordField` | Password input with show/hide toggle |
| `PercentageField` | Percentage input clamped 0–100 |
| `QuickLinks` | Icon + label navigation strip; horizontal scroll on mobile |
| `LinkRow` | Full-width navigation row with icon, label, optional description, and trailing arrow; renders as `<a>` or `<button>` |
| `RadioGroup` | Set of radio buttons — default, boxed, or card layout |
| `Select` | Dropdown select; adapts to drawer on mobile |
| `Skeleton` | Placeholder loading state for content areas |
| `SkipLinks` | Keyboard-only accessibility skip links (required on every page) |
| `Snackbar` | Transient toast notification |
| `Spinner` | Loading indicator |
| `StepperActions` | Back / Next / Save / Exit action buttons for multi-step forms |
| `StepTransition` | Directional slide-and-fade between steps — use in every multi-step form |
| `Switch` | Toggle switch input |
| `Table` | Data table with sorting, loading, and empty states |
| `Tabs` | Tab navigation with content panels — default or segmented style |
| `TextArea` | Multi-line text input |
| `TextButton` | Text-based action link/button with optional icons |
| `TextField` | Single-line text input — text, email, password, number, tel, url, search, date |
| `Tooltip` | Hover tooltip with 12 placement options |

---

## Catalogue

### Layout & Navigation

**Header** — `src/components/Header/`  
Site header. Two-row desktop layout (logo, search, utility links, CTAs + megamenu nav) with condensed scroll state and mobile drawer. Use for every public-facing page.  
Key props: `navItems`, `secondaryNavItems`, `primaryCta`, `secondaryCta`, `utilityLinks`, `onSearch`, `condensed`

**Footer** — `src/components/Footer/`  
Brand-aware site footer. Renders logo, navigation columns, and contact section. Brand is read from context — no public props needed for basic use.

**MemberOnline** — `src/components/MemberOnline/`  
Complete member portal shell. Wraps a page with the authenticated nav, header, content area, and footer. Use as the root layout for any member-facing screen.  
Key props: `user`, `balance`, `primaryItems`, `secondaryItems`, `footerLinks`, `logo`, `activeItemId`, `onItemClick`, `onLogout`

**MOBreadcrumb** — `src/components/MemberOnline/MOBreadcrumb/`  
Member Online breadcrumb navigation. Back button (ghost icon button) + vertical divider + breadcrumb items. Ancestor items render as muted links; the active page renders in the brand primary colour. Member Online only — do not use on public-facing pages (use `Breadcrumb` instead).  
Key props: `items` (`{ label, href? }[]`), `onBack?: () => void`

**Breadcrumb** — `src/components/Breadcrumb/`  
Navigation trail. Truncates long paths automatically.  
Key props: `items`, `separator`, `maxItems`

**SkipLinks** — `src/components/SkipLinks/`  
Keyboard-only skip links. Must be the first focusable element on every page — already included in the root layout. Only configure if the default targets need changing.  
Key props: `links?: SkipLink[]`

**Pagination** — `src/components/Pagination/`  
Page navigation for paginated lists and tables.

**Tabs** — `src/components/Tabs/`  
Tab group with content panels. Two styles: `default` (pill indicator) and `segmented` (button group).  
Key props: `label`, `tabs`, `size`, `tabStyle`, `defaultTab`, `reversed`, `onChange`

**QuickLinks** — `src/components/QuickLinks/`  
Horizontal icon + label navigation strip. Scrolls horizontally on mobile.  
Key props: `items`, `brand`, `iconSize`, `activeHref`

**LinkRow** — `src/components/LinkRow/`  
Full-width navigation row. Icon in a circular tinted container + label + optional description + trailing chevron. Renders as a native `<a>` when `href` is provided, `<button>` otherwise. Use for on-page navigation choices (e.g. "ready to act" vs "need guidance" decision rows).  
Key props: `label`, `description`, `icon`, `iconStyle`, `href`, `onClick`, `sx`

**PageTransition** — `src/components/PageTransition/`  
Reusable, global content-area fade between page navigations. Place inside a persistent section `layout.tsx`, wrapping the page content (not the header/footer), so only the content cross-fades while chrome stays put. Keyed off `usePathname()` — consumers pass only `children`. Built on framer-motion (`AnimatePresence` + a frozen router segment) hidden behind the component. Respects `prefers-reduced-motion`. The fade fires on navigation, so it plays when you move *into* and *out of* a stepped form too — state-based step flows (single route, e.g. beneficiaries) keep their `StepTransition` between steps and need no exclusion. Opt out via `excludePaths` (central list in `src/app/pageTransition.config.ts`) only for flows that drive steps with real routes, or the per-instance `disabled` prop. Tune motion in `src/components/PageTransition/variants.ts`. This is for **page-level** route transitions — for between-step transitions inside a form, use `StepTransition`.  
Key props: `disabled`, `excludePaths`

---

### Containment & Overlay

**Card** — `src/components/Card/`  
Operating model: `closed` (bordered and padded) or `open` (borderless and non-contained), plus `promo` for legacy horizontal image-left layout. `contained` remains as a backwards-compatible alias of `closed`. Top section modes for open/closed are `image`, `heroIcon`, or `none`. Middle section holds title/subtitle and body content. Bottom section holds action buttons when provided.  
Key props: `variant`, `topSection`, `heroIcon`, `title`, `subtitle`, `imageSrc`, `primaryAction`, `secondaryAction`, `badge`, `onClick`, `href`, `sx`

**Card** — `src/components/Card/`  
Baseline card primitive with three visual styles: `contained` (surface background + 32px contained padding), `border` (transparent background + border + 32px contained padding), and `open` (borderless + no contained padding). Supports optional top section, middle content section, and bottom actions section.  
Key props: `variant`, `topSection`, `header`, `body`, `actions`, `children`, `sx`

**ActionBar** — `src/components/ActionBar/`  
Promotional CTA banner. A horizontal surface with a title, description, and a single `contained` action button, plus an optional left-hand icon (small circular container, or any node such as a `HeroIcon`) or a `decorative` bleed image. Three colour variants: `light` (tinted surface, standard text + primary button), `dark` and `primary` (brand surfaces with inverse text and a reversed button). Stacks vertically on mobile.  
Key props: `title`, `description`, `action`, `image`, `variant`, `sx`

**AnnouncementBanner** — `src/components/AnnouncementBanner/`  
Dismissible page-level announcement banner. A horizontal surface with a title, optional description, optional CTA button, and an optional right-side decorative illustration (hidden on mobile). Three colour variants: `light` (tinted surface, standard text + primary button), `dark` and `primary` (brand surfaces with inverse text and a reversed button). A close button is always rendered at the top-right corner. Provide `storageKey` to persist the dismissed state in `sessionStorage` for the browser session — the banner will not reappear until the session ends. Without `storageKey`, visibility is fully controlled by the caller. Use `onClose` to react to dismissal regardless of persistence strategy.  
Key props: `title`, `description`, `action`, `image`, `storageKey`, `onClose`, `variant`, `sx`

**Dialog** — `src/components/Dialog/`  
Modal dialog with confirm/cancel. Five semantic variants: `neutral`, `info`, `warning`, `danger`, `alert`. Adapts to a bottom drawer on mobile. Prefer over Modal when you need a confirm pattern.  
Key props: `open`, `onClose`, `title`, `description`, `variant`, `size`, `confirmLabel`, `loading`

**Modal** — `src/components/Modal/`  
Simpler dialog wrapper when you need full control of the body content and actions. No built-in confirm pattern.  
Key props: `open`, `onClose`, `title`, `children`, `actions`, `size`

**Drawer** — `src/components/Drawer/`  
Slide-out panel from any edge. Use for secondary content, filters, or mobile nav.  
Key props: `open`, `onClose`, `anchor`, `title`, `width`, `actions`

**Accordion** — `src/components/Accordion/`  
Expandable panels. `default` allows multiple open simultaneously; `exclusive` allows only one.  
Key props: `items`, `defaultExpanded`, `variant`, `showCloseAll`, `onChange`

**ExpandableItem** — `src/components/ExpandableItem/`  
Single collapsible panel. Lighter than Accordion — use when you only need one expandable section, not a list of them.  
Key props: `label`, `defaultExpanded`, `expanded`, `onChange`, `disabled`

**ExpandableCardList** — `src/components/ExpandableCardList/`  
Controlled list of expandable cards, one open at a time. Each card has a custom header (`renderHeader(expanded)`), optional right-aligned meta (`renderAside`), an optional sibling action button (`action` — e.g. Remove), and body content. The disclosure and the action are separate sibling buttons (never nested), so the header is fully keyboard and screen-reader accessible; collapsed cards unmount, leaving their fields out of the tab order. Use for editable item lists (beneficiaries and similar) where the classic Accordion's single-button header can't carry a per-item action. Header content must be inline/phrasing (use `component="span"`). Pass `headingLevel` only when the cards are genuine document sections.  
Key props: `items` (`{ id, renderHeader, renderAside?, action?, content, disabled? }`), `expandedId`, `onExpandedChange`, `headingLevel?`

**Menu** — `src/components/Menu/`  
Dropdown menu triggered by any element. Adapts to a bottom drawer on mobile.  
Key props: `trigger`, `items`, `id`, `onOpenChange`

**Tooltip** — `src/components/Tooltip/`  
Hover tooltip. 12 placement options.  
Key props: `title`, `children`, `placement`, `arrow`

**Snackbar** — `src/components/Snackbar/`  
Transient toast notification for feedback after an action.

**Alert** — `src/components/Alert/`  
Inline status message. Four severities: `error`, `warning`, `info`, `success`.  
Key props: `severity`, `message`, `title`, `icon`, `action`, `onClose`

---

### Form Inputs

**TextField** — `src/components/TextField/`  
The default single-line input. Supports `text`, `email`, `password`, `number`, `tel`, `url`, `search`, `date` types. Start/end adornments built in. `email` and `tel` types self-validate format on blur and show their own error; pass `error`/`errorMessage` to override with your own.  
Key props: `label`, `value`, `type`, `size`, `multiline`, `startAdornment`, `endAdornment`, `error`, `errorMessage`, `helperText`

**TextArea** — `src/components/TextArea/`  
Multi-line text input. Use instead of `TextField` with `multiline` when you need explicit textarea semantics.

**PasswordField** — `src/components/PasswordField/`  
Password input with built-in show/hide toggle. Use instead of `TextField type="password"`.

**MoneyField** — `src/components/MoneyField/`  
Currency input. Formats with thousand separators; normalises value on blur. Controlled via `value` (reflects external resets) or uncontrolled via `defaultValue`.  
Key props: `label`, `value`, `defaultValue`, `placeholder`, `size`, `helperText`, `onChange`

**PercentageField** — `src/components/PercentageField/`  
Percentage input. Validates and clamps to 0–100. Controlled via `value` (reflects external resets) or uncontrolled via `defaultValue`.  
Key props: `label`, `value`, `defaultValue`, `error`, `helperText`, `onChange`

**DateOfBirthField** — `src/components/DateOfBirthField/`  
Date input defaulting to 1900–today range. Use for date-of-birth capture specifically. Self-validates on blur (rejects future dates, invalid dates, and implausible ages) and shows its own error; pass `error`/`errorMessage` to override.

**DatePicker** — `src/components/DatePicker/`  
Single-date form input with calendar popover. Use for arbitrary date selection in forms.

**DateRangePicker** — `src/components/DateRangePicker/`  
Start and end date inputs with a shared calendar popover.

**AddressField** — `src/components/AddressField/`  
Dual address capture (residential + optional postal) with autocomplete lookup.  
Key props: `onChange`, `defaultHasPostalAddress`, `disabled`, `addressLookup`

**Select** — `src/components/Select/`  
Dropdown select for a list of options. Adapts to a drawer on mobile for better usability.  
Key props: `label`, `options`, `value`, `placeholder`, `size`, `error`

**Autocomplete** — `src/components/Autocomplete/`  
Searchable dropdown. Use when the option list is long or needs filtering.  
Key props: `label`, `options`, `value`, `groupBy`, `renderOption`, `loading`

**Checkbox** — `src/components/Checkbox/`  
Single checkbox. Three layouts: `default`, `boxed` (outlined), `card` (full-width selectable card).  
Key props: `label`, `checked`, `variant`, `description`, `icon`, `indeterminate`, `color`

**RadioGroup** — `src/components/RadioGroup/`  
Radio button set. Three layouts: `default`, `boxed`, `card`.  
Key props: `legend`, `options`, `variant`, `value`, `direction`, `color`

**Switch** — `src/components/Switch/`  
Toggle switch. Use for on/off settings rather than yes/no choices (use Checkbox for those).  
Key props: `label`, `checked`, `size`, `labelPlacement`, `helperText`

**FileUpload** — `src/components/FileUpload/`  
Drag-and-drop file input with click-to-browse, file preview list, and built-in type/size validation.  
Key props: `label`, `accept`, `maxSizeMB`, `multiple`, `onChange`, `error`

---

### Form Structure

**FormProgress** — `src/components/FormProgress/`  
Multi-step form progress indicator. Three variants: `simple` (linear %), `stepped` (discrete steps), `responsive` (adapts to viewport).  
Key props: `variant`, `value`, `steps`, `activeStep`, `maxStep`, `showStepIndicator`

**StepperActions** — `src/components/StepperActions/`  
Back / Next / Save / Exit action bar for multi-step forms. Handles exit confirmation dialog internally.  
Key props: `step`, `isSubmitStep`, `onBack`, `onNext`, `onExit`, `onSave`, `supportsSave`

**StepTransition** — `src/components/StepTransition/`  
Directional slide-and-fade transition between steps. Holds old content until the exit animation completes, then reveals new content, and animates its height so elements below (e.g. `StepperActions`) slide rather than jump. Drive it with `step` alone — direction is inferred from the change (a higher index slides forward). Respects `prefers-reduced-motion`. Pairs with `FormProgress` and `StepperActions` as the Foundation stepped form pattern.  
Key props: `step`, `direction?` (`'forward' | 'backward'` — optional override for non-linear navigation; inferred by default), `children`

#### Stepped form validation — error placement

When the user presses **Next** (or **Submit**) on a stepped form and the step is invalid, render the validation error in a single `Alert` **directly above `StepperActions`** — never only at the top of the step or page.

The reason: steps can be long and the action sits at the bottom. An error rendered at the top of the step is frequently scrolled out of view, so the user clicks Next, nothing visibly happens, and they're stuck. Placing the error beside the button they just pressed keeps cause and feedback together.

Rules:
- The flow owns the error message. Compute it in the `Next` handler and render `{error && <Alert severity="error" message={error} />}` immediately before `<StepperActions />`.
- Field-level indicators (an invalid input's own error state, a running total turning red) stay in place — they're live feedback, not the click-Next summary. Don't duplicate the summary banner at the top of the step.
- Clear the error when the user advances or goes back.

See `src/features/investment-mix/InvestmentMixFlow.tsx` for the reference implementation.

---

### Buttons & Actions

**Button** — `src/components/Button/`  
The primary action button. Three variants: `contained`, `outlined`, `ghost`. Supports loading state, start/end icons, reversed (on dark backgrounds). `color` is restricted to `primary` (default) and `success` (positive/confirmation actions, typically inside a success surface) — other semantic colours are intentionally unsupported. (`white` is a reversed-on-brand alias of primary.)  
Key props: `label`, `variant`, `size`, `color`, `loading`, `startIcon`, `endIcon`, `reversed`


**IconButton** — `src/components/IconButton/`  
Icon-only button with optional tooltip. Same variants as Button (`contained`, `outlined`, `ghost`).  
Key props: `icon`, `label` (accessible name), `variant`, `size`, `color`, `loading`, `showTooltip`

**TextButton** — `src/components/TextButton/`  
Text-link style action. Use for secondary or inline actions.  
Key props: `label`, `size`, `color`, `startIcon`, `endIcon`, `loading`

**InfoButton** — `src/components/InfoButton/`  
Inline icon button that triggers either a `Tooltip` or a `Dialog`. Designed to sit alongside label text — `display: inline-flex; vertical-align: middle` keeps it flush with the text baseline. Two mutually exclusive modes: pass `tooltip` (string or ReactNode) for a hover tooltip; pass `dialogTitle` + `dialogContent` (ReactNode) for a click-to-open dialog. Use dialog mode on mobile and for any content longer than a sentence.  
**Size rule:** match `size` to the line height of the surrounding text. `sm` is the minimum.

| Typography | Line height | `size` |
|---|---|---|
| `caption`, `small`, `h6`, `h5`, `body` | ≤ 24px | `sm` |
| `h4` | ~29px | `md` |
| `lead`, `h3` | ~32–34px | `lg` |
| `h2`/`h1` (larger) | 38px+ | `xl` |

Key props: `tooltip` OR `dialogTitle` + `dialogContent`, `label` (accessible name), `size`, `icon`, `placement`

**ArtieAIButton** — `src/components/ArtieAIButton/`  
Branded "Ask Artie" AI-assistant call-to-action. A gradient pill (primary → sky blue) with a `sparkles` icon and label; text stays AA-accessible across every gradient stop in both light and dark mode. This is **not** a Foundation `Button` — it is a standalone, purpose-built button for the AI assistant entry point. Use only for that entry point; for all other actions use `Button`.  
Key props: `label`, `size`, `disabled`, `onClick`, `type`

---

### Display & Feedback

**CloseButton** — `src/components/CloseButton/`  
Standardised dismiss / close icon button. Renders an `xmark` icon with a circular hit target. Used internally by Alert, Dialog, Drawer, and Modal — use it whenever you need a standalone close/dismiss action. Two variants: `ghost` (transparent background, default) for surfaces where the button sits against the page; `soft` (tinted fill) for dialog headers and alert actions. `color` drives both the icon colour and the tint, making it straightforward to match severity — e.g. `variant="soft" color="error"` inside an error alert. The `label` prop sets the accessible `aria-label` (default: `"Close"`); always pass a descriptive label when context matters.  
Key props: `onClick`, `label`, `variant`, `color`, `size`, `sx`

**Icon** — `src/components/Icon/`  
Font Awesome SVG icon. Supports six styles: `solid`, `light`, `regular`, `thin`, `duotone`, `sharp`. The leaf dependency — used by almost every other component.  
Key props: `icon` (FA name), `style`, `size`, `color`

**HeroIcon** — `src/components/HeroIcon/`  
Large branded illustration icon for hero sections and empty states. Four background styles.  
Key props: `name`, `brand`, `size`, `background`, `iconColor`

**Logo** — `src/components/Logo/`  
Brand logo. Three variants: `primary`, `secondary`, `mark`. Brand-aware.  
Key props: `variant`, `size`, `alt`

**Badge** — `src/components/Badge/`  
Count or dot overlay on a child element.  
Key props: `children`, `count`, `variant`, `color`, `max`, `anchorVertical`, `anchorHorizontal`

**Chip** — `src/components/Chip/`  
Compact label, status indicator, or dismissible tag. `filled` or `outlined`.  
Key props: `label`, `variant`, `color`, `size`, `icon`, `onDelete`

**Divider** — `src/components/Divider/`  
Horizontal or vertical rule. Thin structural separator — use instead of a raw `<hr>` or border.

**Spinner** — `src/components/Spinner/`  
Loading indicator. Use for full-section loading states. For inline loading on a button, use `Button loading`.  
Key props: `size`, `color`, `label`

**LinearProgress** — `src/components/LinearProgress/`  
Horizontal progress bar. Use for file uploads, form completion, or page load indication.

**Skeleton** — `src/components/Skeleton/`  
Placeholder shimmer for content that's loading. Prefer over Spinner for known-shape content areas.

**IconList** — `src/components/IconList/`  
Icon-prefixed list. Custom icons (`ul`) or numbered (`ol`).  
Key props: `items`, `listType`, `size`, `defaultIcon`, `iconColor`

---

### Data

**Table** — `src/components/Table/`  
Data table with built-in loading, empty, and error states. Three densities: `condensed`, `default`, `spaced`.  
Key props: `columns`, `rows`, `loading`, `stickyHeader`, `striped`, `density`

**DataGrid** — `src/components/DataGrid/`  
Interactive grid for when a static `Table` isn't enough. Renders `div`s with the ARIA table roles (`role="table"`/`row`/`columnheader`/`cell`) — **not** a native `<table>` — so cells can hold interactive controls (inputs, action buttons). Config-driven like `Table` (`columns` + `rows`), with `renderCell` for arbitrary/interactive cell content. Supports client-side sorting, controlled row selection, drag + keyboard row reordering, a pagination footer (shares Table's pagination toolbar), and a full-width `summaryRow` footer (e.g. a running total). Choose `Table` for read-only tabular data; choose `DataGrid` when cells are editable, rows reorder, or rows are selectable.  
Used by the investment-mix payment-preference steps (`PaymentDefaultOrder`, `PaymentPriorityList`, `PaymentPercentageSplit`).  
Key props: `columns`, `rows`, `label`, `density`, `loading`, `sortable`, `selectable`, `selectedIds`, `onSelectionChange`, `reorderable`, `onReorder`, `pagination`, `summaryRow`

**Charts** — `src/components/Charts/`  
Data visualisation components (bar, line, pie etc.). Check the Storybook stories for available chart types before building custom visualisations.

**Calendar** — `src/components/Calendar/`  
Standalone calendar view. For form date inputs, use `DatePicker` or `DateRangePicker` instead.

**ManagedList** — `src/components/ManagedList/`  
Panel for displaying and managing a user-controlled list of items. Header with a circled icon (40px, `background.default`), title, description, and optional navigation chevron. Item rows with icon, name, optional badge, dot-separated metadata, and edit/delete action buttons. Footer with an add action and optional bulk remove. Empty state when no items exist. Set `loading` to render a `Skeleton`-based placeholder that mirrors the panel layout.  
Use for: passkeys, authenticator apps, beneficiaries, third-party authorities, connected accounts.  
Key props: `icon`, `title`, `description`, `href`, `items`, `emptyIcon`, `emptyMessage`, `addLabel`, `onAdd`, `onRemoveAll`, `loading`, `loadingItemCount`

**InvestmentOverview** — `src/components/InvestmentOverview/`  
Account investment panel for the member portal. Mirrors the `ManagedList` panel anatomy (paper header with circled icon, `background.default` body, split footer). The header shows the account name and **total balance** (the sum of all holdings). The body lists the account's **investment dials** — one card per dial. A super account has exactly two: how the existing balance is **currently invested** ("Current investments" — actual holdings, which drift as contributions pool into the future option), and where *future contributions* (accumulation) or *payments/withdrawals* (income) are directed. These can diverge when a member changes one dial alone; when they hold the same mix (an "apply to both" / never-diverged account — the common case) the feature layer collapses them into a single combined card ("Investment mix", no subtitle) rather than two identical ones. The combined card stays deliberately simple (no balance/future descriptor, since that distinction only matters to the split minority), omits its per-card edit button, and the footer action reads "Change mix" instead of "Change all". Each dial card has a title, a subtitle (short descriptor + when last changed — "last switched" for current investments since they drift, "set" for the standing direction), an edit `IconButton`, and the mix as a stacked bar + legend (`CurrentMixSummary`) — no per-card dollar figure, since the total balance lives in the header. The footer's primary action is **Change all** (edit both dials at once); secondary is **View history**. Set `loading` for a skeleton placeholder. The feature layer (`accountDials` in `src/features/investment-mix/mockData.ts`) builds the dials and wires each edit to the change flow with the matching apply-to preselected.  
Each dial card optionally shows a rebalancing status line as the last item under the title/subtitle. Set `rebalancing: { nextDate: '<ISO>' }` on a balance or combined dial to show "Next rebalance dd month yyyy"; set `rebalancing: {}` (no `nextDate`) to show "No rebalancing on this mix". Omit `rebalancing` entirely on future-contributions and payments dials — rebalancing does not apply there.  
Key props: `accountName`, `totalBalance`, `balanceDate`, `isIncomeAccount`, `loading`, `options`, `dials`, `changeAllLabel`, `onChangeAll`, `onViewHistory`  
Dial prop: `rebalancing?: { nextDate?: string }` — present only on balance/combined dials.

---

## Composition Map

Understanding what composes what prevents accidental regressions.

| Component | Composes |
|---|---|
| Accordion | Button, Icon |
| AddressField | Checkbox, internal address capture |
| Card | Button (open/promo variants) |
| DataGrid | Checkbox, Icon, IconButton, Spinner, Table (PaginationToolbar, useTableSort) |
| Dialog | Button, Icon |
| ExpandableCardList | Icon, Tooltip, Collapse (MUI) |
| Footer | Logo, internal nav/contact sections |
| FormProgress | Button, Menu, Icon, Tooltip |
| MemberOnline | Header, Footer, Drawer, Logo, Icon |
| Menu | Icon, Drawer (mobile) |
| QuickLinks | HeroIcon |
| Select | Drawer (mobile) |
| StepperActions | Button, TextButton, Dialog (exit confirm), Alert, Icon |
| InvestmentOverview | Icon, IconButton, Skeleton, CurrentMixSummary (internal) |
| ManagedList | Icon, Chip, IconButton, TextButton, Divider, Skeleton |
| PageTransition | framer-motion (external), Next App Router (`usePathname`, `LayoutRouterContext`) |

**Icon is a leaf dependency** — any change to it has blast radius across almost the entire component library.

---

## Prop Conventions

All Foundation components follow these conventions consistently:

| Prop | Values |
|---|---|
| `variant` | Component-specific (see catalogue above) |
| `size` | `small` / `medium` / `large` |
| `color` | `primary` `secondary` `error` `warning` `info` `success` |
| Events | `onX` naming (`onChange`, `onClose`, `onOpenChange`) |
| Loading state | `loading: boolean` |
| Accessible name | `label` (not `aria-label`) on all inputs and icon-only buttons |
