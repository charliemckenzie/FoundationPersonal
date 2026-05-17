# Component Registry

Quick reference for all Foundation components. Check here before exploring `src/components/` — if this file doesn't answer your question, then spawn Explore.

**Maintained by:** Lisa (adds entry when writing stories) · Willie (verifies on status promotion) · Moe (updates on structural changes)

---

## Stable

| Component | Path | Description | Variants | Sizes | Key Props |
|-----------|------|-------------|----------|-------|-----------|
| Accordion | `src/components/Accordion/` | Expandable content panels | `default` (multi), `exclusive` (one at a time) | — | `items`, `defaultExpanded`, `onChange`, `showCloseAll` |
| Button | `src/components/Button/` | Primary action button | `contained`, `soft`, `ghost`, `outlined` | `small` `medium` `large` | `label`, `variant`, `size`, `color`, `loading`, `startIcon`, `endIcon`, `reversed`, `condensed` |
| Checkbox | `src/components/Checkbox/` | Input checkbox with optional description | `default`, `boxed`, `card` | — | `label`, `checked`, `color`, `variant`, `description`, `icon`, `indeterminate` |
| FormProgress | `src/components/FormProgress/` | Multi-variant form progress indicator | `simple` (linear %), `stepped` (discrete), `responsive` (adaptive) | — | `variant`, `value`, `steps`, `activeStep`, `maxStep`, `tooltipLabels`, `showStepIndicator`, `stepMenu` |
| IconButton | `src/components/IconButton/` | Icon-only button with optional tooltip | `contained`, `soft`, `ghost`, `outlined` | `small` `medium` `large` | `icon`, `label`, `variant`, `size`, `color`, `loading`, `showTooltip` |
| RadioGroup | `src/components/RadioGroup/` | Set of radio buttons | `default`, `boxed`, `card` | — | `legend`, `options`, `variant`, `value`, `direction`, `color`, `cardDirection` |
| Tabs | `src/components/Tabs/` | Tab navigation with content panels | `default` (pill), `white` | `small` `medium` `large` | `label`, `tabs`, `size`, `tabStyle`, `defaultTab`, `onChange` |
| TextButton | `src/components/TextButton/` | Text-based action button with optional icons | — | `small` `medium` `large` | `label`, `size`, `color`, `startIcon`, `endIcon`, `iconDirection`, `loading`, `hideIcon` |

---

## In Review

| Component | Path | Description | Variants | Sizes | Key Props |
|-----------|------|-------------|----------|-------|-----------|
| Alert | `src/components/Alert/` | Alert message box | Severities: `error`, `warning`, `info`, `success` | — | `severity`, `message`, `title`, `icon`, `action`, `onClose` |
| Badge | `src/components/Badge/` | Badge overlay on child elements | `standard` (count), `dot` | — | `children`, `count`, `variant`, `color`, `max`, `anchorVertical`, `anchorHorizontal` |
| Chip | `src/components/Chip/` | Compact label or input indicator | `filled`, `outlined` | — | `label`, `variant`, `color`, `size`, `icon`, `avatar`, `severity`, `onDelete` |
| ExpandableItem | `src/components/ExpandableItem/` | Single collapsible content panel | — | — | `label`, `defaultExpanded`, `expanded`, `onChange`, `disabled` |
| Select | `src/components/Select/` | Dropdown select; adapts to drawer on mobile | — | — | `label`, `options`, `value`, `placeholder`, `size`, `error`, `native` |
| Switch | `src/components/Switch/` | Toggle switch input | — | — | `label`, `checked`, `color`, `size`, `labelPlacement`, `helperText`, `onChange` |
| TextField | `src/components/TextField/` | Text input field with adornment support | Types: `text` `email` `password` `number` `tel` `url` `search` `date` | — | `label`, `value`, `type`, `size`, `placeholder`, `multiline`, `startAdornment`, `endAdornment`, `error` |

---

## Draft

| Component | Path | Description | Variants | Sizes | Key Props |
|-----------|------|-------------|----------|-------|-----------|
| FileUpload | `src/components/FileUpload/` | Drag-and-drop file input with click-to-browse, file preview, and built-in type/size validation | — | — | `label`, `accept`, `maxSizeMB`, `multiple`, `onChange`, `error`, `helperText`, `disabled` |
| AddressField | `src/components/AddressField/` | Dual address capture (residential + optional postal) with autocomplete | — | — | `onChange`, `defaultHasPostalAddress`, `disabled`, `addressLookup` |
| Autocomplete | `src/components/Autocomplete/` | Searchable dropdown with grouping and custom rendering | — | — | `label`, `options`, `value`, `placeholder`, `size`, `groupBy`, `renderOption`, `loading` |
| Breadcrumb | `src/components/Breadcrumb/` | Navigation breadcrumb trail | — | — | `items`, `separator`, `maxItems` |
| Card | `src/components/Card/` | Container card with image, content, and action slots | `contained`, `open`, `promo` (horizontal) | — | `variant`, `title`, `subtitle`, `imageSrc`, `primaryAction`, `secondaryAction`, `badge`, `onClick` |
| DateOfBirthField | `src/components/DateOfBirthField/` | Date input defaulting 1900–today; extends TextField | — | — | Extends `TextFieldProps` |
| Dialog | `src/components/Dialog/` | Modal dialog; adapts to drawer on mobile | `neutral`, `info`, `warning`, `danger`, `alert` | `small` `medium` `large` | `open`, `onClose`, `title`, `description`, `variant`, `size`, `loading`, `confirmLabel`, `alertButtonLayout` |
| Drawer | `src/components/Drawer/` | Slide-out panel | Anchors: `left`, `right`, `top`, `bottom` | — | `open`, `onClose`, `anchor`, `title`, `width`, `actions` |
| Footer | `src/components/Footer/` | Brand-aware footer with logo, nav, and contact | — | — | Brand-aware (ART vs QSuper); no public props |
| HeroIcon | `src/components/HeroIcon/` | Large branded illustration icon | Backgrounds: `none`, `brand`, `white`, `grey` | — | `name`, `brand`, `size`, `background`, `iconColor`, `iconSizeOverride`, `containerSizeOverride` |
| Icon | `src/components/Icon/` | Font Awesome SVG icon | Styles: `solid`, `light`, `regular`, `thin`, `duotone`, `sharp` | `sm` `md` `lg` `xl` `2xl` `3xl` | `icon`, `style`, `size`, `color` |
| IconList | `src/components/IconList/` | Icon-prefixed list | `ul` (custom icons), `ol` (numbered) | `sm` `md` `lg` | `items`, `listType`, `size`, `defaultIcon`, `iconColor` |
| Logo | `src/components/Logo/` | Brand logo; brand-aware | `primary`, `secondary`, `mark` | `sm` `md` `lg` | `variant`, `size`, `alt` |
| Menu | `src/components/Menu/` | Dropdown menu; adapts to drawer on mobile | — | — | `trigger`, `items`, `id`, `onOpenChange` |
| Modal | `src/components/Modal/` | Simple dialog wrapper | — | `small` `medium` `large` `fullscreen` | `open`, `onClose`, `title`, `children`, `actions`, `size` |
| MoneyField | `src/components/MoneyField/` | Currency input with thousand-separator formatting | — | — | `label`, `defaultValue`, `placeholder`, `size`, `helperText`, `onChange` |
| PercentageField | `src/components/PercentageField/` | Percentage input clamped 0–100 | — | — | `label`, `defaultValue`, `placeholder`, `size`, `helperText`, `onChange` |
| QuickLinks | `src/components/QuickLinks/` | Icon + label navigation strip; horizontal scroll on mobile | — | — | `items`, `brand`, `iconSize`, `activeHref` |
| Spinner | `src/components/Spinner/` | Loading indicator | — | `small` `medium` `large` | `size`, `color`, `label` |
| StepperActions | `src/components/StepperActions/` | Form wizard action buttons with back/next/save/exit | — | — | `step`, `isSubmitStep`, `onBack`, `onNext`, `onExit`, `onSave`, `supportsSave` |
| Table | `src/components/Table/` | Data table with loading and empty states | Densities: `condensed`, `default`, `spaced` | — | `columns`, `rows`, `loading`, `stickyHeader`, `striped`, `density`, `horizontalPadding` |
| ToggleButtonGroup | `src/components/ToggleButton/` | Toggle button set; exclusive or multi-select | Orientations: `horizontal`, `vertical` | — | `options`, `ariaLabel`, `value`, `exclusive`, `color`, `size`, `orientation` |
| Tooltip | `src/components/Tooltip/` | Hover tooltip with 12 placement options | — | — | `title`, `children`, `placement`, `arrow`, `disableHoverListener` |

---

## Composition Map

Components that compose others — useful for understanding blast radius before editing.

| Component | Composes |
|-----------|----------|
| Accordion | Button, Icon |
| AddressField | Checkbox, AddressCapture (internal) |
| Card | Button (actions) |
| Dialog | Button, Icon |
| Footer | Logo, FooterNavSection, FooterContact, FooterBottom (all internal) |
| FormProgress | Button, Menu, Icon, Tooltip |
| Menu | Icon, Drawer (mobile fallback) |
| QuickLinks | HeroIcon |
| Select | Drawer (mobile fallback) |
| StepperActions | Button, TextButton, Dialog (exit confirm), Alert, Icon |

**Icon is a leaf dependency** — used by Button, IconButton, TextButton, Accordion, Checkbox, Dialog, Drawer, ExpandableItem, FormProgress, Menu, Tooltip, QuickLinks, StepperActions, IconList.

---

## Specialised Field Family

These extend TextField and share its prop surface:

| Component | Specialisation |
|-----------|----------------|
| DateOfBirthField | `type: 'date'`, defaults 1900–today range |
| MoneyField | Thousand-separator formatting, normalised on blur |
| PercentageField | Validates and clamps to 0–100 |

---

## Standard Prop Conventions

Consistent across all components that support them:

| Prop | Values |
|------|--------|
| `variant` | Component-specific (see table above) |
| `size` | `small` / `medium` / `large` |
| `color` | `primary` `secondary` `error` `warning` `info` `success` `white` |
| Events | `onX` naming (`onChange`, `onClose`, `onOpenChange`) |
| Loading | `loading: boolean` |
