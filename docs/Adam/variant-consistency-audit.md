# Variant Consistency Audit — Handoff for Opus Review

This document captures the full findings and changes from a Chalmers + Marge audit of the component library. It was written cold — pick up here without re-deriving context.

## What this audit was

Every component in `src/components/` was scanned for drift from the shared variant infrastructure in `src/components/buttons/variantStyles.ts`. The shared system exports helpers for `contained`, `soft`, `ghost`, `outlined`, `white`, and `reversed` button styles, plus now `buildFocusStyles`. The audit checked: whether components use those helpers or re-implement equivalent logic inline; which focus ring CSS selector they use (`&.Mui-focusVisible` vs `&:focus-visible`); whether disabled state aligns with `theme.palette.action.disabled` / `action.disabledBackground`; and whether `sx` props mix string shorthand tokens with object-notation palette access in the same component.

The Storybook decorator was also compared against the app's provider stack.

---

## Audit Table

| Component | variant/color props | uses shared helpers | focus selector | hardcoded alpha | disabled style | sx pattern | drift | notes |
|---|---|---|---|---|---|---|---|---|
| Badge | variant, color | No (pass-through) | None | None | MUI-native | None | N | Clean pass-through |
| Modal | None | No | None | None | None | Mixed (minor) | N | `(t) =>` and string shorthand in same sx; no interactive states |
| Table | None | No | None | None | None | String shorthand only | N | Clean |
| Tooltip | None | No | None | None | None | None | N | Clean |
| Logo | variant, size | No | None | None | None | **FIXED** (was mixed) | Y→fixed | Converted mixed sx to single `(t) =>` callback |
| Drawer | anchor | No | None | None | None | String shorthand | N | Delegates to IconButton |
| Breadcrumb | None | No | **FIXED** (was `&:focus-visible`) | None | None | String shorthand | Y→fixed | MuiLink gets `Mui-focusVisible`; focus ring corrected |
| IconList | size, iconColor | No | None | None | None | `(theme) =>` callback | N | No interactive states |
| Switch | color, size, disabled | No | None (MUI-native) | None | MUI-native | None | N | Full MUI delegation |
| Chip | variant, color, size, severity, disabled | No | None (MUI-native) | None | MUI-native | `useTheme()` + palette object notation in `alertSx` | Y | Intentional deviation — see below |
| Spinner | size, color | No | None | None | None | None | N | Clean |
| ToggleButton | color, size, orientation, disabled | No | None (MUI-native via theme) | None | MUI-native | String shorthand | N | Focus/disabled handled by theme override in `factory.ts` |
| Accordion | variant | No | `&:focus-within` on container (intentional) | None | None | `(t) =>` callback | Y→fixed | Focus outline colour changed from `primary.main` to `border.focus` |
| Card | variant | No | None (CardActionArea MUI-native) | None | None | **FIXED** (was mixed on badge boxes) | Y→fixed | Two badge Box instances converted to `(t) =>` callbacks |
| FormProgress | variant | No | `&:focus-visible` on Box buttons (intentional) | `alpha(primary.main, 0.18)` ×3 | None | `(t) =>` callback with object notation | Y | Intentional deviation — see below |
| HeroIcon | size, background, iconColor, brand | No | None | None | None | String shorthand | N | Clean |
| IconButton | variant, color, size, disabled, loading, reversed | **Yes — FIXED** | `&.Mui-focusVisible` | None | Delegates to helpers | Static object (helpers are callbacks) | Y→fixed | Focus ring extracted to `buildFocusStyles()`; `color='white'` now maps to `'primary'` |
| QuickLinks | activeHref | No | `&:focus-visible` on native `<a>` (intentional) | None | None | `(t) =>` callback | Y | Intentional deviation — see below |
| Tabs | size, tabStyle, disabled (per-tab) | No | `&.Mui-focusVisible` ✓ | alpha values for white style | `action.disabledBackground` (default); custom alpha (white) | `useTheme()` + object notation | Y | Intentional deviation — see below |
| Menu | color (per-item) | No | None (MUI-native for MenuItem) | None | MUI-native | `(t) =>` callback with object notation | Y | Intentional deviation — see below |
| Dialog | variant, size | Partial (buildSoftStyles for close button) | None (MUI-native for buttons) | None | None | `(t) =>` callback | N | Clean |
| AlertDialog | None (wraps Dialog) | No | None | None | None | Mix in `(t: Theme)` | N | Clean |
| Button | variant, color, size, disabled, loading, reversed | **Yes — FIXED** | `&.Mui-focusVisible` ✓ | None | Delegates to helpers | `(theme) =>` callback | Y→fixed | Focus ring extracted to `buildFocusStyles()` |
| ExpandableItem | disabled | No | `&.Mui-focusVisible` ✓ | None | **FIXED** (`action.disabled` token via string shorthand) | `(t) =>` callback | Y→fixed | Replaced palette object notation with string shorthands |
| Autocomplete | size, disabled, error, loading | No | `&.Mui-focused` (intentional) | alpha for disabled | custom alpha disabled (intentional) | `(t)=>` callback | Y | Intentional deviation — see below |
| Alert | severity | No (delegates to IconButton) | None | None | None | String shorthand | N | Clean |
| Icon | size, color, style | No | None | None | None | String shorthand via lookup | N | Clean |
| Checkbox | variant, color, size, disabled, error | No | `:has(.Mui-focusVisible)` (intentional) | inline alpha ×3 | `action.disabled`/`action.disabledBackground` ✓ | `(theme) =>` callback | Y | Intentional deviation — see below |
| RadioGroup | variant, color, size, disabled, error | No | `:has(.Mui-focusVisible)` (intentional) | inline alpha ×3 | `action.disabled`/`action.disabledBackground` ✓ | `(theme) =>` callback | Y | Intentional deviation — see below |
| TextButton | size, color, disabled, loading, reversed | No | **FIXED** (was `&:focus-visible`) | alpha for reversed states | `action.disabled` ✓; reversed disabled custom (intentional) | `(theme: Theme) =>` callback with object notation | Y→fixed | Focus selector corrected; reversed states documented below |
| StepperActions | None (composes) | No | None | None | None | String shorthand | N | Clean |
| Select | size, disabled, error | No | `&.Mui-focused` (intentional) | alpha for disabled (intentional) | custom alpha (intentional) | `(t) =>` callback | Y | Intentional deviation — see below |
| PasswordField | Inherits TextField | No | `&:focus-visible` on toggle button (intentional) | None | None | `(t) =>` callback | Y | Intentional deviation — see below |
| TextArea | Inherits TextField | No | Delegates to TextField | None | None | None | N | Clean pass-through |
| TextField | size, disabled, error | No | `&.Mui-focused` (intentional) | alpha for disabled (intentional) | custom alpha (intentional) | `(theme) =>` callback | Y | Intentional deviation — see below |
| MoneyField | Inherits TextField | No | Delegates | None | None | None | N | Clean |
| PercentageField | Inherits TextField | No | Delegates | None | None | None | N | Clean |
| DateOfBirthField | Inherits TextField | No | Delegates | None | None | None | N | Clean |
| FileUpload | disabled | No | `&:focus-within` (intentional) | alpha for disabled (intentional) | custom alpha (intentional) | `(theme) =>` callback | Y | Intentional deviation — see below |
| AddressField | disabled | No | Delegates | None | None | String shorthand | N | Clean |
| AddressCapture | disabled | No | Delegates | None | None | String shorthand | N | Clean |
| AustralianAutocomplete | disabled | No | **FIXED** (was `&:focus-visible` on ButtonBase) | None | MUI-native for disabled text | `(t: Theme) =>` callback | Y→fixed | ButtonBase instances corrected to `&.Mui-focusVisible` |
| AustralianFields | disabled | No | Delegates | None | None | String shorthand | N | Clean |
| InternationalFields | disabled | No | Delegates | None | None | String shorthand | N | Clean |
| Footer / FooterBottom / FooterContact / FooterNavSection / AwardPlaceholder | None | No | None | None | None | String shorthand | N | All clean |

---

## Changes Made

### 1. `src/components/buttons/variantStyles.ts`

**What was wrong:** Button and IconButton both computed their focus ring colour inline, using the same logic but duplicated, with messy type casting (`as { main?: string }`) that violated the "no object notation in sx" rule.

**What changed:** Added `buildFocusStyles(isReversed: boolean, resolvedColor: ButtonColorKeyResolved)` at line 108 (before `buildReversedStyles`). Also exported `ButtonColorKeyResolved = Exclude<ButtonColorKey, 'white'>` for type safety.

The helper returns `{ '&.Mui-focusVisible': { outline: (theme) => ..., outlineOffset: '2px', boxShadow: 'none' } }`. The individual `outline` property uses a callback value — consistent with how other helpers in this file use `backgroundColor: (theme: Theme) => ...`.

**Why it matters:** The focus ring colour logic was duplicated in both button components with unmaintainable type casting. One change to the helper now covers both.

---

### 2. `src/components/Button/index.tsx`

**What was wrong:** Line 126 — focus ring used `(theme.palette[resolvedColor as keyof typeof theme.palette] as { main?: string })?.main ?? theme.palette.primary.main`. This is prohibited object notation with unnecessary null-safety on a known-good key.

**What changed:**
- Imported `buildFocusStyles` and `ButtonColorKeyResolved`
- Typed `resolvedColor` as `ButtonColorKeyResolved` (removes 'white' from the type)
- Replaced the `'&.Mui-focusVisible'` block with `...buildFocusStyles(reversed || color === 'white', resolvedColor)`

**File:** `src/components/Button/index.tsx` — import block and lines ~125–129

---

### 3. `src/components/IconButton/index.tsx`

**What was wrong:** Same focus ring object-notation issue as Button (line 101). Additionally: `resolvedColor` only mapped `'default'` to `'primary'` but not `'white'`, so `color='white'` would silently try to access `theme.palette['white']` which doesn't exist.

**What changed:**
- Imported `buildFocusStyles` and `ButtonColorKeyResolved`
- `resolvedColor` now maps both `'default'` and `'white'` to `'primary'`
- The `sx` prop switched from `(theme) => ({...})` callback to a plain object (the callback was only needed for the focus ring; helpers already use their own callbacks internally)
- Focus ring replaced with `...buildFocusStyles(reversed || color === 'white', resolvedColor)`

**File:** `src/components/IconButton/index.tsx` — import block, line ~68, and sx prop

---

### 4. `src/components/TextButton/index.tsx`

**What was wrong:** Line 130 used `&:focus-visible` instead of `&.Mui-focusVisible`. `TextButton` uses `ButtonBase`, which MUI manages with `Mui-focusVisible`. The native `&:focus-visible` fires differently (it's a CSS pseudo-class handled by the browser, not MUI's FocusVisible tracking, which also handles keyboard-only focus via the `:focus-visible` heuristic but the two can diverge in edge cases like programmatic focus).

**What changed:** `&:focus-visible` → `&.Mui-focusVisible` at line 130.

**File:** `src/components/TextButton/index.tsx:130`

---

### 5. `src/components/Breadcrumb/index.tsx`

**What was wrong:** Line 66 used `&:focus-visible` on a `MuiLink`. MUI's Link component applies `Mui-focusVisible` via MUI's internal FocusVisible tracking.

**What changed:** `&:focus-visible` → `&.Mui-focusVisible` at line 66.

**File:** `src/components/Breadcrumb/index.tsx:66`

---

### 6. `src/components/AddressField/AustralianAutocomplete.tsx`

**What was wrong:** Two `ButtonBase` elements (lines 119 and 231) used `&:focus-visible` in their `sx`. ButtonBase is a MUI component that injects `Mui-focusVisible`.

**What changed:** Both instances changed to `&.Mui-focusVisible` (used `replace_all` since the string was identical in both).

**File:** `src/components/AddressField/AustralianAutocomplete.tsx` — `linkSx` function (line 119) and inline sx (line 231)

---

### 7. `src/components/Accordion/index.tsx`

**What was wrong:** Line 57 used `t.palette.primary.main` in the `&:focus-within` outline — prohibited object notation, and inconsistent with the semantic `border.focus` token used everywhere else in the library.

**What changed:** `t.palette.primary.main` → `t.palette.border.focus` at line 57.

**Why not change the selector:** The `&:focus-within` selector on the container is correct and intentional. The AccordionSummary's own `Mui-focusVisible` is suppressed (`outline: 'none'`) to prevent a double ring. The outer `:focus-within` catches keyboard focus on the entire accordion panel. This is a legitimate compound-component focus pattern.

**File:** `src/components/Accordion/index.tsx:57`

---

### 8. `src/components/ExpandableItem/index.tsx`

**What was wrong:** The `(t) =>` sx callback used `t.palette.action.disabled`, `t.palette.primary.main`, `t.palette.primary.dark`, and `t.palette.border.focus` via object notation. The callback was legitimately needed for `t.palette.action.disabledOpacity`, `t.transitions.create()`, and `t.shape.xs` — but the colour tokens didn't need object notation; they could be string shorthands.

**What changed:**
- `t.palette.action.disabled` → `'action.disabled'`
- `t.palette.primary.main` → `'primary.main'`
- `t.palette.primary.dark` → `'primary.dark'`
- `t.palette.border.focus` in template literal → split to `outline: '2px solid'` + `outlineColor: 'border.focus'`

`t.palette.action.disabledOpacity` remains as object notation — it has no string path equivalent (it's a numeric opacity scalar, not a colour token).

**File:** `src/components/ExpandableItem/index.tsx:65–76`

---

### 9. `src/components/Logo/index.tsx`

**What was wrong:** Lines 50–53 mixed `color: 'primary.main'` (string shorthand) with `height: (t) => ...` (callback) in the same `sx` object literal.

**What changed:** Entire `sx` converted from plain object with a callback property to a single `(t) =>` callback function. `color: 'primary.main'` stays as a string shorthand inside the callback (valid — MUI's sx system resolves path strings regardless of whether you're inside a callback).

**File:** `src/components/Logo/index.tsx:50–54`

---

### 10. `src/components/Card/index.tsx`

**What was wrong:** Two badge pill Box instances (promo variant ~line 104, open variant ~line 196) mixed `backgroundColor: 'background.paper'` (string shorthand) with `borderRadius: (t) => ...` (callback) in the same `sx` object.

**What changed:** Both instances converted to `sx={(t) => ({...})}` single-callback form. The `borderRadius` template literal now reads from `t.shape.full` directly without the intermediate callback. Used `replace_all` since both instances were identical.

The module-level `cardBaseSx` constant (line 41) also has the same mixed pattern (`borderRadius: (theme) => ...` with static string values). This was not changed — it is a module-level constant that cannot be a component callback, and the mixed pattern in a static constant is structurally unavoidable. See "Open questions" below.

**File:** `src/components/Card/index.tsx` — two badge Box `sx` props

---

## Intentional Deviations

These components have patterns that look like drift but are deliberate. Do not change them without a design decision.

### TextField / Autocomplete / Select — `&.Mui-focused` (not `Mui-focusVisible`) for focus ring

Form input components show their focus ring on ANY focus event, including mouse click. This is correct UX for typed fields: the user needs to see which field they're in after clicking it. `Mui-focusVisible` only fires on keyboard navigation. Changing inputs to `Mui-focusVisible` would break the visual affordance for mouse users. **This is not drift.**

The MUI theme's own `ToggleButton` override in `src/app/themes/factory.ts` (line 575–576) also uses `alpha(background.default, 0.6)` for disabled background — confirming that this alpha-based disabled pattern is the intentional design for interactive form elements (not a button-family oversight).

### TextField / Autocomplete / Select — `alpha(background.default, 0.6)` for disabled state

Same reasoning. Input disabled state uses semi-transparent background to communicate "read-only data visible through a dimmed field." `action.disabledBackground` is the correct token for button disabled states; the alpha approach is the correct pattern for input disabled states. Both are in the system by design.

### FileUpload — `&:focus-within`

The drop zone wraps a visually-hidden `<input type="file">`. When keyboard users tab to the file input, the native `<input>` receives focus, not the outer Box. `&:focus-within` is the only CSS selector that fires in this case. `Mui-focusVisible` cannot be applied here because there is no MUI-managed element receiving focus. **This is structurally correct.**

### PasswordField toggle button — `&:focus-visible`

The show/hide toggle is `Box component="button"` (a raw HTML button, not a ButtonBase). MUI does not inject `Mui-focusVisible` on raw buttons — only on `ButtonBase`-derived components. `&:focus-visible` is therefore the only working CSS selector for keyboard focus here. **This is correct and necessary.**

### FormProgress step markers — `&:focus-visible`

Same as PasswordField. Step markers are `Box component="button"`. MUI does not manage `Mui-focusVisible` on raw buttons. The `alpha(primary.main, 0.18)` inline values for the active step ring are also unique to this component's stepped-progress affordance and have no equivalent in variantStyles.ts. **Both patterns are intentional.**

### QuickLinks — `&:focus-visible` on native `<a>` anchor

Native HTML anchors do not receive MUI's `Mui-focusVisible` class. `&:focus-visible` is the correct CSS selector. **This is correct.**

### Accordion container — `&:focus-within` selector

The `&:focus-within` on the MuiAccordion root is intentional. AccordionSummary's own `Mui-focusVisible` is suppressed (`outline: none`) to prevent a double ring. The outer container catches keyboard focus on the whole panel. **This is a valid compound-component focus pattern.**

### Chip — severity colour system

Chip uses `theme.palette[severity].background` and `theme.palette[severity].border` — semantic per-severity tokens that don't exist in the button variant system. The button system handles `primary`/`secondary`/`error` etc. Chip uses `error`/`warning`/`info`/`success` severity colours from extended palette tokens. These are structurally different concepts. **This is intentional.**

### Checkbox / RadioGroup — `:has(.Mui-focusVisible)` composite focus pattern

The boxed and card variants of Checkbox/RadioGroup need the focus ring on the outer container, not the native input. The pattern:
- Container gets `outline` via `:has(.Mui-focusVisible)`
- The checkbox/radio's own `Mui-focusVisible` outline is nulled

This works correctly and is necessary for the compound component structure. Forcing `Mui-focusVisible` directly on the outer container wouldn't fire correctly. **This is intentional and technically correct.**

### Tabs white tabStyle — hardcoded alpha values

The `white` tabStyle sits on inverted (dark) backgrounds. `action.disabled` and `action.disabledBackground` tokens are designed for light backgrounds and would fail contrast requirements on dark surfaces. The `alpha(text.inverse, 0.3)` pattern matches the same design intent as `buildReversedStyles` for buttons. The values are intentional for this inverted context. **This is intentional.**

### TextButton reversed states — inline alpha values

TextButton's `reversed` mode uses `alpha(common.white, 0.88/0.80/0.30)` for hover/active/disabled. These alpha values match what `buildReversedStyles` defines for the `ghost` variant's white-on-dark states. However, TextButton is not a variant of the button system — it has no `variant` prop and is a distinct component category (text-only, no container). Refactoring it to call `buildReversedStyles` would require passing a fake `variant` argument, which is semantically wrong. The values are derived from the same design decisions but the architecture doesn't support shared consumption. **Document as acceptable duplication, not drift.**

### Menu — palette object notation in `itemSx`

`itemSx(t, item.color)` uses `t.palette.error.main`, `t.palette.text.primary`, `t.palette.text.muted` inside a `(t) =>` callback. These could technically be string shorthands. However, the function is called as a helper inside `sx={(t) => itemSx(t, item.color)}` and the callback pattern is correct. The object notation violation is minor and the fix (converting the helper to return string shorthands) would require the helper to conditionally return strings vs. computed values. Low priority. **Flagged but not changed.**

### Modal — minor mixed sx

The Modal has `(t) => t.spacing(1)` mixed with `'text.muted'` string shorthand in the same sx object. Non-interactive component; no focus/disabled/hover concerns. **Very low priority.**

---

## Storybook Parity Verdict

**Confirmed. No decorator changes needed.**

Provider stack comparison:

| Layer | App (`ThemeRegistry.tsx`) | Storybook (`.storybook/preview.tsx`) |
|---|---|---|
| Emotion cache | `AppRouterCacheProvider` | Browser default (no provider) |
| Theme | `ThemeProvider` with `createBrandTheme(foundation)` | `ThemeProvider` with `createBrandTheme(brandConfig, mode)` |
| Reset | `CssBaseline` | `CssBaseline` |
| Background | None | `GlobalStyles` (story canvas only) |

**`AppRouterCacheProvider`** is an SSR-specific Emotion cache for Next.js App Router (deduplication during server-side rendering). In Storybook's browser-only environment, Emotion uses its default client-side cache, which produces identical CSS output. Its absence does not cause visual differences.

**Theme source difference** (single brand vs multi-brand/multi-mode) is intentional — Storybook is a design system showcase, not a production app view.

**`GlobalStyles`** in Storybook only affects the story canvas background colour for the background switcher toolbar. It has no effect on component rendering.

**Font loading gap (separate issue):** The app does not use `next/font` or inject a Google Fonts `<link>` from `layout.tsx`. Storybook explicitly loads Noto Sans, Open Sans, and Merriweather from Google Fonts. If the app doesn't load these fonts, components will render in browser default sans-serif. This is outside the scope of this audit (it's a missing app configuration, not a Storybook decorator gap). Recommendation: add `next/font/google` to `src/app/layout.tsx`.

---

## Open Questions for Opus

These are the things Sonnet could not resolve with confidence. They need a deeper review before being closed.

### 1. `outlineColor: 'border.focus'` as an sx string shorthand — does it resolve?

In `ExpandableItem`, the fix uses `outlineColor: 'border.focus'` as a string shorthand inside an sx callback. MUI's sx system resolves dot-notation paths for colour-aware CSS properties (`color`, `backgroundColor`, `borderColor`, `outlineColor`, etc.) by looking them up in `theme.palette`. `'border.focus'` would resolve to `theme.palette.border.focus`. However, this relies on `outlineColor` being in MUI's list of theme-aware properties. **Opus should verify this actually resolves** — if it doesn't, the fix produces a literal CSS string `"border.focus"` which is invalid and reverts to no outline colour. Fallback fix: use `outline: \`2px solid ${t.palette.border.focus}\`` with the callback kept for this value.

### 2. `buildFocusStyles` outline value — individual callback in a plain sx object

The `buildFocusStyles` helper returns `{ '&.Mui-focusVisible': { outline: (theme: Theme) => ..., ... } }`. In Button and TextButton this is spread into a `(theme) =>` callback (so the outer theme is available). In IconButton, it is spread into a **plain object** (no outer callback). The `outline` value is a function `(theme: Theme) => ...` as an individual property value. MUI's sx system does support individual property callbacks in sx objects (the shared helpers in variantStyles.ts already use this pattern extensively, e.g., `backgroundColor: (theme: Theme) => ...`). **Opus should verify** that MUI resolves individual function values correctly when spread into a static sx object (not a callback sx). This is already how `buildContainedStyles`, `buildSoftStyles`, etc. work — but it is worth explicit confirmation for the focus styles specifically.

### 3. `cardBaseSx` module-level constant — mixed pattern unresolved

`cardBaseSx` (line 41 of `Card/index.tsx`) mixes `backgroundColor: 'background.paper'` (string shorthand) and `borderRadius: (theme) => \`${theme.shape.lg}px\`` (callback) in a module-level constant. The badge Box instances inside the component were fixed; this constant was not. To fix it properly, `cardBaseSx` would need to become a theme-accepting function, changing how `mergedSx` is composed. This is a slightly more invasive change (affects the public `sx` prop merging logic). **Opus should decide** whether to convert `cardBaseSx` to a function or document it as an acceptable exception for module-level sx constants.

### 4. TextButton `theme.palette[color].main` object notation — inside a legitimate callback

TextButton's sx is a `(theme: Theme) =>` callback (necessary for `theme.spacing`, `theme.transitions`, `theme.typography`). Inside it, `theme.palette[color].main` and `theme.palette[color].dark` are used for hover/active/focus colours. Since `color` is a prop-driven dynamic key (`TextButtonColor = 'primary' | 'secondary' | 'error' | ...`), these cannot be expressed as static string shorthands — dynamic key access requires the callback form. However the charter's wording ("never use `theme.palette.primary.main` object notation") may not apply to dynamic key access. **Opus should confirm** whether `theme.palette[color].main` where `color` is a runtime variable is an acceptable exception, or whether a different structural approach is needed (e.g., a lookup map of pre-resolved tokens).

### 5. Tabs `useTheme()` pattern — whole-component theme access

Tabs uses `useTheme()` at the component level and builds `pillTabSx` outside the `sx` prop using `theme.palette.*` object notation. The resulting object is then passed to `sx`. This pattern is different from using `sx={(theme) => ...}` but achieves the same result. The charter's prohibition on object notation in `sx` technically applies to the sx prop value, not to a computed object that's later passed to sx. However the spirit of the rule is against using palette object notation to build styles. **Opus should rule** on whether `useTheme()` + pre-computed objects is an acceptable alternative to `sx` callbacks, or whether Tabs should be refactored.

### 6. Checkbox / RadioGroup — inline `alpha(primary.main, 0.08)` for selected background

The selected-state background in Checkbox and RadioGroup uses `alpha(theme.palette.primary.main, 0.08)` which matches `buildSoftStyles(color)`'s light-mode background alpha exactly. However, `buildSoftStyles` is mode-aware (uses 0.15 in dark mode). The Checkbox/RadioGroup selected bg is hardcoded to 0.08 regardless of mode. **Opus should assess** whether this is an intentional decision (Checkbox always uses the lighter shade) or an oversight (should it use `buildSoftStyles` mode-aware alpha?).

---

## What Opus Should Focus On

1. **Verify the two mechanical questions** (outlineColor resolution, individual callback in plain sx) — these affect whether two of the fixes actually work as intended. Short-circuit the rest if either is broken.

2. **`TextButton` object notation inside callback** — read `src/components/TextButton/index.tsx` in full. Decide if the `theme.palette[color]` dynamic access is acceptable or needs restructuring. The file is 177 lines.

3. **`cardBaseSx` module-level constant** — read `src/components/Card/index.tsx` lines 41–48 and decide on the resolution path.

4. **Tabs architecture** — read `src/components/Tabs/index.tsx` in full (182 lines). Assess `useTheme()` pattern and the white-variant disabled state. This is the most concentrated area of remaining drift.

5. **Checkbox and RadioGroup selected-state alpha** — check lines ~150–160 in Checkbox and ~185–200 in RadioGroup. Assess mode-awareness of the 0.08 alpha.

6. **Do not re-audit components that are already marked clean in the table.** Badge, Table, Tooltip, IconList, Switch, Spinner, ToggleButton, Alert, Icon, StepperActions, TextArea, MoneyField, PercentageField, DateOfBirthField, AddressField, AddressCapture, AustralianFields, InternationalFields, and all Footer components are confirmed clean.
