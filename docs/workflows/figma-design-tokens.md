# Figma Design Tokens Workflow

Generate Figma variables from the live TypeScript theme files using a two-step process.

```
Edit theme files → npm run generate-tokens → Import via Figma plugin
```

---

## Step 1 — Generate tokens.json

From the project root:

```bash
npm run generate-tokens
```

Reads the TypeScript theme source and writes `tokens.json` to the project root. Always run this before importing into Figma.

**Source files:**

| File | What it provides |
|---|---|
| `src/app/themes/primitives/colors.ts` | All raw colour scales |
| `src/app/themes/brands/foundation.ts` | Brand config (primary, secondary, tertiary, neutral scales) |
| `scripts/generate-tokens.ts` | Semantic colours, spacing, radius, typography — defined here, referencing the theme |

> Brand scale detection uses reference equality (`foundation.primary === primitiveScales.trueBlue`). Swap the brand's primary scale and aliases update automatically — no manual edits.

---

## Step 2 — Import into Figma

### Load the plugin (first time only)

1. Open the Figma desktop app
2. **Plugins → Development → Import plugin from manifest**
3. Select `figma-plugin/manifest.json` from the project root
4. Run via **Plugins → Development → Import Design Tokens**

### Import

1. Drop `tokens.json` into the plugin (or click **Choose tokens.json**)
2. Preview panel shows each collection, its modes, and variable count
3. Click **Import variables**

> **Before re-importing:** Delete the existing collections in Figma first. The plugin always creates new collections — it does not update existing ones.

---

## Token structure

`tokens.json` is divided into top-level keys. Each key becomes a **Figma variable collection**.

Keys sharing a prefix joined by `/` (e.g. `semantic/light`, `semantic/dark`) become **modes** of the same collection.

### Collections

| Collection | Modes | Variable type | Count |
|---|---|---|---|
| `primitives` | Value | COLOR | 187 |
| `semantic` | Light, Dark | COLOR | 50 per mode |
| `spacing` | Value | FLOAT | 11 |
| `radius` | Value | FLOAT | 6 |
| `typography` | Value | FLOAT / STRING | 16 |

### Token format

Each token in `tokens.json`:

```json
"text/primary": {
  "value": "{neutral.900}",
  "type": "color",
  "description": "neutral.900 → #0f172a",
  "codeSyntax": { "web": "theme.palette.text.primary" },
  "scopes": ["TEXT_FILL"]
}
```

| Field | Purpose |
|---|---|
| `value` | Hex colour, number, string, or `{alias.path}` reference |
| `type` | `color`, `number`, `string`, `boolean` |
| `description` | Shows in Figma's variable inspector — primitive chain for traceability |
| `codeSyntax.web` | Populates **Code syntax → Web** in Figma Dev Mode — the exact MUI code reference |
| `scopes` | Which Figma property pickers this variable appears in |

---

## Variable scopes

Scopes restrict which design property pickers a variable appears in, reducing noise for designers.

| Scope value | What it controls |
|---|---|
| `TEXT_FILL` | Text colour picker only |
| `FRAME_FILL` | Frame background fill |
| `SHAPE_FILL` | Shape fill |
| `STROKE_COLOR` | Stroke colour |
| `EFFECT_COLOR` | Effect (shadow) colour |
| `CORNER_RADIUS` | Border radius |
| `GAP` | Auto-layout gap |
| `FONT_SIZE` | Font size |
| `FONT_FAMILY` | Font family |

**Current scope assignments:**

| Token group | Scopes |
|---|---|
| `semantic/text/*` | `TEXT_FILL` |
| `semantic/background/*` | `FRAME_FILL`, `SHAPE_FILL` |
| All other tokens | No restriction (appears everywhere) |

> Scope is defined per token in `scripts/generate-tokens.ts`. Any token without a `scopes` field defaults to all scopes in Figma.

---

## Code syntax in Dev Mode

When a developer inspects a component in Figma Dev Mode, the **Code syntax → Web** field shows the exact MUI reference — not the Figma variable name.

Example: `text/primary` variable shows `theme.palette.text.primary` in Dev Mode.

This is set via `setVariableCodeSyntax('WEB', ...)` in the plugin — distinct from the Description field.

---

## Adding new token collections

Add a new key to `scripts/generate-tokens.ts`:

```ts
const elevation: TokenGroup = {
  sm: { value: '0 1px 3px rgba(0,0,0,0.12)', type: 'string', codeSyntax: { web: 'theme.shadows[1]' } },
  md: { value: '0 4px 6px rgba(0,0,0,0.15)', type: 'string', codeSyntax: { web: 'theme.shadows[2]' } },
};
```

Add it to the `tokens` object at the bottom:

```ts
const tokens = { primitives, 'semantic/light': semanticLight, 'semantic/dark': semanticDark, spacing, radius, typography, elevation };
```

Run `npm run generate-tokens` — the plugin picks it up automatically.

---

## Adding a new mode (second brand)

Add `semantic/brand-b` as a new top-level key alongside `semantic/light` and `semantic/dark`. The plugin adds it as a third mode on the `semantic` collection.

> Multi-mode collections require a paid Figma plan. The plugin falls back to the first mode only if `addMode` fails.

---

## File locations

```
foundation/
├── figma-plugin/
│   ├── manifest.json        ← load this in Figma to install the plugin
│   ├── code.js              ← Figma Plugin API logic (two-pass variable creation)
│   └── ui.html              ← plugin UI (drag-and-drop, preview, import)
├── scripts/
│   └── generate-tokens.ts  ← edit this to change token definitions
└── tokens.json              ← generated output — do not edit by hand
```

> `tokens.json` is overwritten every time `generate-tokens` runs. Put all changes in the theme files or in `generate-tokens.ts`.

---

## Supported Figma variable types

| Token `type` | Figma variable type |
|---|---|
| `color` | COLOR |
| `number`, `dimension`, `fontSize`, `lineHeight`, `fontWeight`, `opacity` | FLOAT |
| `string` | STRING |
| `boolean` | BOOLEAN |
