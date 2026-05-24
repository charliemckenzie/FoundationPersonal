# Figma Sync — Tokens & Design System

How the Foundation design tokens flow from code into Figma so designers can use the same primitives, semantic tokens, and brand modes when designing.

## Architecture

Code is the source of truth. Tokens are generated from the live theme source files, written to a single JSON, and imported into Figma as native Variables.

```
src/app/themes/*.ts          (TypeScript theme source)
        │
        ▼
scripts/generate-tokens.ts   (npm run generate-tokens)
        │
        ▼
tokens.json                  (DTCG-ish — Tokens Studio compatible)
        │
        ├──▶ Tokens Studio Figma plugin   (designer pulls)
        │
        └──▶ scripts/figma-import-variables.mjs   (CI pushes, optional)
                        │
                        ▼
                  Figma Variables
```

## Token structure in `tokens.json`

| Collection | Modes | What's in it |
|---|---|---|
| `primitives` | n/a | Raw colour scales (`trueBlue.50`–`950`, `qBlue.50`–`950`, etc.). 18 scales × 11 steps. |
| `semantic-art` | `light`, `dark` | ART semantic tokens, both modes. Aliased to primitives. |
| `semantic-qsuper` | `light`, `dark` | QSuper semantic tokens, both modes. Aliased to primitives. |
| `action-opacity` | `light`, `dark` | Numeric opacity scalars (`hover`, `selected`, `focus`, `disabled`). Compose with `.active`-coloured base in Figma. |
| `spacing` | n/a | MUI spacing scale (`1`–`10` → 4px–128px). |
| `radius` | n/a | Border radius scale (`xs` 4px, `sm` 8px, `md` 12px, `lg` 16px, `xl` 24px, `2xl` 32px, `full` 9999). |
| `typography` | n/a | Font families, sizes, weights, line heights. |

## Two-layer token model

```
primitive  →  semantic  →  component
 (raw hex)     (alias)      (consumed)
```

- **Primitives** never used directly in components.
- **Semantic** is what `theme.palette.X` exposes; this is what designers reach for in Figma.
- **Components** read semantic tokens; designers reach for the matching named variable in Figma.

This shape maps cleanly onto Figma Variables, which natively support aliases (one variable can reference another).

## Brand & mode strategy

Each brand-mode combination is a parallel set of values for the **same** semantic token names. ART and QSuper share every token name; the values differ where the brand differs.

**Recommended Figma collection layout:**

| Collection | Modes |
|---|---|
| Foundation / Primitives | (single mode) |
| Foundation / ART | Light, Dark |
| Foundation / QSuper | Light, Dark |
| Foundation / Tokens | Spacing, Radius, Typography (single mode) |
| Foundation / Opacity | Light, Dark |

When designing for ART, switch the ART collection to Light or Dark. The semantic variables resolve to the right primitive automatically.

## Brand-specific values

Most semantic tokens have identical values across ART and QSuper. The ones that **differ** are listed below — these are the values you'll see flip when switching brand mode:

| Token | ART (light) | QSuper (light) |
|---|---|---|
| `text.linkInverse` | `clearBlue[100]` | `white` |
| `background.tintCool` | `skyBlue[200]` | `qSkyBlue[100]` |
| `background.tintNeutralCool` | `clearBlue[100]` | `qSkyBlue[50]` |
| `background.tintWarm` | `salmon[50]` | `neutral[100]` (fallback — QSuper has no warm surface) |
| `background.tintNeutral` | `neutralART[100]` | `neutral[100]` |

| Token | ART (dark) | QSuper (dark) |
|---|---|---|
| `text.primary` | `neutralART[300]` | `neutral[50]` (brighter — qBlue is lower-contrast) |
| `text.muted` | `neutralART[500]` | `neutral[300]` |
| `divider` | `neutralART[600]` | `neutral[700]` |
| `border.default` | `neutralART[600]` | `neutral[700]` |
| `border.input` | `neutralART[500]` | `neutral[400]` |

These differences live in each brand's `semanticOverrides` block:
- [src/app/themes/brands/foundation.ts](../src/app/themes/brands/foundation.ts) (ART)
- [src/app/themes/brands/theme-b.ts](../src/app/themes/brands/theme-b.ts) (QSuper)

## Special case: interaction-state opacity

`action.hover`, `action.selected`, and `action.focus` aren't single colours — they're computed at runtime as `alpha(neutral[900], 0.04)` etc. Figma Variables can't store JS expressions, so the export splits them into two pieces:

- `semantic-*/light/action/active` — the base RGB colour (e.g. `neutral.900`)
- `action-opacity/light/hover` — the numeric scalar (`0.04`)

In Figma, compose these in a fill: set the fill colour to `action.active`, then set the fill opacity to `action-opacity.hover`. The result matches the runtime `alpha()` output exactly.

## Sync workflow

### Option A — Tokens Studio plugin (designer-driven, recommended)

1. Designer installs the [Tokens Studio](https://tokens.studio/) Figma plugin (free tier supports JSON file imports).
2. Run `npm run generate-tokens` from this repo. The script writes `tokens.json`.
3. Designer opens Tokens Studio → "Import" → load `tokens.json` (either committed to GitHub and pulled by the plugin, or shared via cloud sync).
4. Plugin publishes the variables into the Figma file.
5. Designer can preview before publishing — gives a final approval step.

**When to re-sync:** any time a token changes in code, run `npm run generate-tokens` and re-import. The export is deterministic — re-importing only updates changed values.

### Option B — REST API push (CI-driven)

[scripts/figma-import-variables.mjs](../scripts/figma-import-variables.mjs) reads `tokens.json` directly and pushes the full token set into a target Figma file. Idempotent — re-runs UPDATE existing variables rather than creating duplicates.

```bash
# 1. Generate the source-of-truth tokens
npm run generate-tokens

# 2. Push to Figma
FIGMA_TOKEN=<your_token> FIGMA_FILE=<your_file_key> npm run figma-import
```

Required env vars:
- `FIGMA_TOKEN` — personal access token with `file_variables:write` scope. Generate from Figma → Settings → Personal access tokens.
- `FIGMA_FILE` — the file key (between `/file/` and the next `/` in the Figma URL).

On first run the script creates all 7 collections, their modes, and every variable, and writes a `figma-id-map.json` file alongside `tokens.json`. **Commit `figma-id-map.json`** — it tracks the real Figma IDs so subsequent runs (and other teammates) issue UPDATE rather than CREATE, preserving variable identity for library subscribers.

To start fresh (e.g. switching target Figma files), delete `figma-id-map.json` and re-run. Old variables remain in the previous file; new ones land in the new file.

A push-based pipeline removes the manual "designer pulls" step but loses the preview gate; recommended only once the token set is stable and change-cadence is low.

## When designers need a new token

Don't add it in Figma first. The Figma file is downstream of code.

1. Designer asks Smithers, who routes to Moe.
2. Moe approves the token (does it belong? what shape should it have? does it need brand-specific values?).
3. Lenny adds the token in `semantic.ts` (and `semanticOverrides` in each brand config if values differ per brand).
4. Run `npm run generate-tokens`.
5. Designer pulls the updated `tokens.json` via Tokens Studio.

If the token is added in Figma first, it won't have a code counterpart and will desync on the next pull.

## Verification

After any sync:

- Open a sample frame in Figma.
- Switch ART → QSuper mode. Surfaces that should swap (brand colours, tints, dark-mode text) update.
- Switch Light → Dark mode. Surfaces flip correctly.
- No "missing variable" warnings appear — confirms every token has a value in every mode.
- Spot-check one component (e.g. Button) renders the same colour in code and Figma at the same brand-mode combination.
