# Figma Component Spec — derived format

> **You don't fill this in.** The `#figma-component-builder` prompt reads the component's source and story and **produces this spec for you**, then asks you to confirm before building. This file just shows the shape it outputs and a worked example so you know what "good" looks like. Your only job is to glance at the derived spec and say "go" (or tweak a value).

## What the AI derives (the output shape)

1. **Source of truth** — source + story paths, status, default brand/mode (ART / Light), whether it already exists in Figma.
2. **Variant properties** — `Variant` / `Size` / `Color` etc., with exact values pulled from the prop unions.
3. **States** — Default / Hover / Focus / Active / Disabled / Loading / Error — only the ones the source actually renders.
4. **Boolean / text / instance properties** — `condensed`, `label`, icon slots, etc.
5. **Tokens consumed** — the semantic Figma variables it will bind.
6. **Auto-layout** — direction, padding, gap, sizing, height.
7. **Composition** — nested live instances and instance-swap slots.
8. **Variant matrix size** — total count + grid layout.

If any of those look wrong when the AI presents them, that's your cue to correct — and the correction should be folded back into the prompt file so it's right next time.

---

# Worked example — `Button` (what a derived spec looks like)

## 1. Source of truth
- **Source:** `src/components/Button/index.tsx`
- **Story:** Button stories
- **Status:** stable
- **Default brand / mode:** ART / Light
- **Existing in Figma?** Yes — update (300 variants already built incl. Condensed)

## 2. Variant properties
| Figma property | React prop | Values (exact) | Default |
|---|---|---|---|
| `Variant` | `variant` | `Contained` / `Outlined` / `Ghost` | `Contained` |
| `Size` | `size` | `Small` / `Medium` / `Large` | `Medium` |
| `Color` | `color` | `Primary` / `Secondary` / `Error` / `White` | `Primary` |

## 3. States
| State | Supported? | Treatment |
|---|---|---|
| Default | ✅ | — |
| Hover | ✅ | `action/active` + `Opacity/hover` |
| Focus | ✅ | focus ring ≥3:1 |
| Active | ✅ | `Opacity/selected` |
| Disabled | ✅ | muted tokens / reduced opacity |
| Loading | ✅ | `CircularProgress`; text hidden when `hideLoadingText` |

## 4. Boolean / text / instance
| Figma property | React prop | Type | Default |
|---|---|---|---|
| `Condensed` | `condensed` | BOOLEAN | false |
| `Full Width` | `fullWidth` | BOOLEAN | false |
| `Reversed` | `reversed` | BOOLEAN | false |
| `Label` | `label` | TEXT | "Button" |
| `Start Icon` | `startIcon` | BOOLEAN + INSTANCE_SWAP | false |
| `End Icon` | `endIcon` | BOOLEAN + INSTANCE_SWAP | false |

## 5. Tokens consumed
| Element | Figma variable |
|---|---|
| Label text | `<palette>/contrastText` (contained) / `<palette>/main` (outlined/ghost) |
| Fill | `<palette>/main` (contained) |
| Border | `<palette>/main` (outlined) |
| Radius | `Radius/full` (pill) |
| Padding X | `Spacing/2`–`Spacing/3.5` by size |

## 6. Auto-layout
- **Direction:** row (icon + label + icon)
- **Padding:** Small `Spacing/2` · Medium `Spacing/3` · Large `Spacing/3.5` horizontal
- **Gap:** `Spacing/1`
- **Sizing:** hug (fill when `Full Width`)
- **Height:** Small 40px (2.5rem) / Medium 48px (3rem) / Large 56px (3.5rem); `Condensed` −4px

## 7. Composition
- Icon slots are INSTANCE_SWAP to the Icon component
- No nested component instances

## 8. Variant matrix size
- Variant(3) × Size(3) × Color(4-ish) × State(5) × Condensed(2) ≈ 300
- Layout: 5 state columns × 60 rows, section gaps between Variant and Condensed blocks
