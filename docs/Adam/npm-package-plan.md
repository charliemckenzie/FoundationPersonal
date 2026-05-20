# Plan — Convert Foundation to a Publishable NPM Package

**Status:** Ready to execute — pending main branch stabilisation  
**Branch:** `feat/npm-package` (propose to Frink when ready to start)  
**Prerequisite:** Wait for current work in main to merge before branching.

---

## Context for a fresh agent

Read this section before starting. It contains everything you need to act without exploring the codebase from scratch.

### Current stack

| Item | Version |
|---|---|
| Next.js | 16.2.4 |
| React | 19.2.4 |
| MUI (`@mui/material`) | ^9.0.0 |
| `@mui/icons-material` | ^9.0.0 |
| `@mui/material-nextjs` | ^9.0.0 |
| `@emotion/react` | ^11.14.0 |
| `@emotion/styled` | ^11.14.1 |
| `@tabler/icons-react` | ^3.41.1 |
| TypeScript | ^5 |

### Current `package.json` state

- `"name": "foundation"` — needs to be scoped (e.g. `@art/foundation`)
- `"version": "0.1.0"`
- `"private": true` — blocks publishing, must be removed
- All runtime packages are currently in `dependencies`. They need moving to `peerDependencies` (while keeping them in `dependencies` for local dev)
- No `exports` map, no `files` field, no `lib:build` script — all to be added

### Theme system structure

```
src/app/
  theme.ts                  ← creates the default Foundation theme via createBrandTheme(foundation)
  ThemeRegistry.tsx         ← Next.js App Router wrapper (AppRouterCacheProvider + ThemeProvider + CssBaseline)
  themes/
    factory.ts              ← exports createBrandTheme(brandConfig: BrandConfig) → MUI Theme
    semantic.ts             ← buildLightPalette / buildDarkPalette
    brands/
      index.ts              ← exports BrandConfig type + LogoConfig type
      foundation.ts         ← Foundation brand config
      theme-b.ts            ← second brand config (ART)
    primitives/             ← raw colour scales and type definitions
```

`createBrandTheme` is the key export for multi-brand support. Consuming projects that need their own brand pass their own `BrandConfig` object.

### Component list (44 components)

```
Accordion, AddressField, Alert, Autocomplete, Badge, Breadcrumb,
Button, buttons/ (shared variant helpers), Card, Checkbox, Chip,
DateOfBirthField, Dialog, Drawer, ExpandableItem, FileUpload,
Footer, FormProgress, Header, HeroIcon, Icon, IconButton,
IconList, inputs/ (shared), Logo, Menu, Modal, MoneyField,
PasswordField, PercentageField, QuickLinks, RadioGroup, Select,
SkipLinks, Spinner, StepperActions, Switch, Table, Tabs,
TextArea, TextButton, TextField, ToggleButton, Tooltip
```

Each component has its own folder under `src/components/` with an `index.tsx` entry point.

### Next.js coupling audit — ALREADY DONE

A search across all `src/components/**/*.tsx` and `.ts` files for `from 'next/` returned **zero results**. Components are already framework-agnostic.

**The only Next.js-specific file is `ThemeRegistry.tsx`** — it uses `AppRouterCacheProvider` from `@mui/material-nextjs`. This is handled in Phase 2. No component-level changes needed.

### Project conventions (non-negotiable)

- TypeScript strict mode — no `any`, no implicit types
- MUI theme tokens only in `sx` — no hardcoded colours, spacing, or shadows
- `sx` access pattern: string shorthand (`'primary.main'`) for static tokens; `(t) =>` callback only for conditional logic; never `theme.palette.primary.main` object notation
- Rem-first sizing — font sizes, icon sizes, component sizes containing text must use `rem`; line heights unitless; px only for non-text structural values
- No commented-out code; functions ≤ 40 lines; components ≤ 200 lines
- Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`
- Full team conventions are in `AGENTS.md` at repo root

### Open decisions (confirm before starting)

1. **Publishing destination** — GitHub Packages (free, requires GitHub org) or npm private org (~$7/month, cleaner DX for external teams). Not yet decided.
2. **Package scope/org name** — `@art/foundation` assumed throughout this doc. Confirm the actual org name before touching `package.json`.
3. **tsup as build tool** — decided. Do not substitute with another tool.

---

## Background

Foundation is currently a Next.js application. This plan converts it into a **dual-mode repo**: it continues to run as a Next.js app and Storybook environment, while also compiling to a publishable npm package (`@art/foundation`) that product teams install as a dependency.

Consuming projects get:
- All Foundation components (pre-themed, typed)
- The MUI theme and `createBrandTheme` factory
- A `ThemeRegistry` wrapper (with a Next.js variant and a plain variant)
- Full TypeScript types

MUI, React, and Emotion remain **peer dependencies** — consuming projects supply their own copies. Foundation does not bundle them.

---

## Phase 1 — Package infrastructure

### 1.1 Install `tsup`

```bash
npm install --save-dev tsup
```

`tsup` compiles `src/index.ts` → `dist/` as ESM + CJS with TypeScript declarations. It sits alongside the Next.js build; neither interferes with the other.

### 1.2 `tsup.config.ts`

Create at repo root:

```ts
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    'next',
    '@mui/material',
    '@mui/icons-material',
    '@mui/material-nextjs',
    '@emotion/react',
    '@emotion/styled',
    '@tabler/icons-react',
  ],
})
```

### 1.3 `package.json` changes

Four changes:

1. Remove `"private": true`
2. Set `"name": "@art/foundation"` (adjust org name to match npm/GitHub org)
3. Add `lib:build` script: `"lib:build": "tsup"`
4. Add `exports` map:

```json
"exports": {
  ".": {
    "import": "./dist/index.js",
    "require": "./dist/index.cjs"
  }
},
"main": "./dist/index.cjs",
"module": "./dist/index.js",
"types": "./dist/index.d.ts",
"files": ["dist", "tokens.json"]
```

5. Move to `peerDependencies`:
   - `react`, `react-dom`, `next`
   - `@mui/material`, `@mui/icons-material`, `@mui/material-nextjs`
   - `@emotion/react`, `@emotion/styled`
   - `@tabler/icons-react`

   Keep all of these in `dependencies` as well (so local dev still works). npm publishing uses `peerDependencies` for the install graph; `dependencies` is for local use.

6. Add `dist/` to `.gitignore`

---

## Phase 2 — ThemeRegistry split

`ThemeRegistry` currently uses `AppRouterCacheProvider` from `@mui/material-nextjs` — a Next.js-specific package. Consuming projects may not be on Next.js App Router.

**Two exports needed:**

- `ThemeRegistry` — Next.js App Router variant (current implementation, unchanged)
- `ThemeRegistryBase` — plain variant using only `ThemeProvider` + `CssBaseline`, no Next.js dependency

Product teams on Next.js use `ThemeRegistry`. Teams on other frameworks use `ThemeRegistryBase`.

Create `src/app/ThemeRegistryBase.tsx` alongside the existing file.

---

## Phase 3 — Component audit (Next.js coupling)

**Status: Complete — no action required.**

A full search across `src/components/**/*.tsx` and `.ts` for `from 'next/'` returned zero results. All 44 components are already framework-agnostic. No component changes needed before publishing.

The only Next.js-specific code in the library is `ThemeRegistry.tsx` — handled in Phase 2.

---

## Phase 4 — Public API barrel (`src/index.ts`)

Create `src/index.ts` as the single public entry point. Only what goes in here is part of the published API.

Start conservatively — stable, well-reviewed components only. Unstable or in-progress components are excluded from v0.1 and added in later releases.

**Suggested v0.1 exports:**

```ts
// Theme
export { default as theme } from './app/theme'
export { createBrandTheme } from './app/themes/factory'
export { ThemeRegistry } from './app/ThemeRegistry'
export { ThemeRegistryBase } from './app/ThemeRegistryBase'

// Core components (expand after audit)
export { Button } from './components/Button'
export { IconButton } from './components/IconButton'
export { TextField } from './components/TextField'
export { Select } from './components/Select'
export { Checkbox } from './components/Checkbox'
export { RadioGroup } from './components/RadioGroup'
export { Switch } from './components/Switch'
export { Card } from './components/Card'
export { Alert } from './components/Alert'
export { Badge } from './components/Badge'
export { Chip } from './components/Chip'
export { Tooltip } from './components/Tooltip'
export { Spinner } from './components/Spinner'
export { Breadcrumb } from './components/Breadcrumb'
export { Tabs } from './components/Tabs'
export { Modal } from './components/Modal'
export { Dialog } from './components/Dialog'
export { Drawer } from './components/Drawer'
export { Accordion } from './components/Accordion'
export { Table } from './components/Table'
export { Icon } from './components/Icon'
export { Logo } from './components/Logo'
export { Header } from './components/Header'
export { Footer } from './components/Footer'
```

Components with complex Next.js coupling are held back until Phase 3 is resolved.

---

## Phase 5 — Publish pipeline

### Option A: GitHub Packages (recommended to start)

- Free for private packages in the same GitHub org
- Add `.npmrc` to the repo:
  ```
  @art:registry=https://npm.pkg.github.com
  ```
- Add GitHub Actions workflow `.github/workflows/publish.yml` — triggers on version tag push (`v*.*.*`), runs `npm run lib:build && npm publish`

### Option B: npm private org

- Requires paid npm org (~$7/month)
- Cleaner DX for teams outside the GitHub org
- Same workflow, different registry URL

**Recommendation:** Start with GitHub Packages. Migrate to npm org if external teams need access.

---

## Phase 6 — Version and release process

Versioning follows semver. Frink owns the release process.

| Change | Bump |
|---|---|
| Bug fix, visual tweak | `patch` |
| New component, new prop | `minor` |
| Removed/renamed prop, API change | `major` |

Release steps:
```bash
npm version patch   # or minor / major
git push --follow-tags
# GitHub Actions publishes automatically on tag push
```

Breaking changes require a migration note in `docs/` before the release goes out.

---

## Future additions (post v0.1)

These are not in scope for the initial release but should be designed for from the start:

- **Multi-brand theme exports** — `createBrandTheme` is already built; document how consuming projects pass their own brand config
- **Token package** — publish `tokens.json` as a separate entry point so non-React consumers (e.g. native apps, design tools) can import design tokens directly
- **Chromatic hosting** — host Storybook on Chromatic so designers and consuming teams can browse the component library without cloning the repo
- **Changesets** — replace manual `npm version` with [changesets](https://github.com/changemania/changesets) for multi-contributor release management as the team grows
- **Component subpath exports** — allow tree-shaking-friendly imports like `import { Button } from '@art/foundation/button'` for large consuming apps

---

## Checklist before starting

- [ ] Current work in main has merged
- [ ] Branch `feat/npm-package` approved by designer (Frink to propose)
- [ ] Publishing destination confirmed (GitHub Packages or npm org)
- [ ] Org/scope name confirmed (`@art` or other)
