# Using Foundation in a new project

Foundation is published as `@art/foundation` on GitHub Packages. This guide covers installation, authentication, and wiring up the theme and components in a new app.

---

## Prerequisites

- Node.js 22+
- A GitHub account with access to the ART organisation
- A GitHub Personal Access Token (PAT) with `read:packages` scope

---

## Step 1 — Authenticate with GitHub Packages

GitHub Packages requires authentication even for read access.

**Create a PAT** at https://github.com/settings/tokens → *Generate new token (classic)* → tick `read:packages`.

**Add to your global `~/.npmrc`:**

```
//npm.pkg.github.com/:_authToken=YOUR_PAT_HERE
```

---

## Step 2 — Configure the `@art` scope

In your **project's** `.npmrc` (create it at the repo root if it doesn't exist):

```
@art:registry=https://npm.pkg.github.com
```

This tells npm to fetch any `@art/*` package from GitHub Packages instead of the public registry.

---

## Step 3 — Install

```bash
npm install @art/foundation
```

Install peer dependencies if your project doesn't already have them:

```bash
npm install @mui/material @emotion/react @emotion/styled
```

---

## Step 4 — Wrap your app in the theme provider

### Next.js App Router

```tsx
// app/layout.tsx
import { ThemeRegistry } from '@art/foundation'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  )
}
```

### Other frameworks (Vite, CRA, etc.)

```tsx
// src/main.tsx
import { ThemeRegistryBase } from '@art/foundation'

root.render(
  <ThemeRegistryBase>
    <App />
  </ThemeRegistryBase>
)
```

`ThemeRegistryBase` is identical to `ThemeRegistry` but has no Next.js dependency.

---

## Step 5 — Import components

```tsx
import { Button, TextField, Card } from '@art/foundation'

export function LoginForm() {
  return (
    <Card>
      <TextField label="Email" />
      <Button variant="contained">Sign in</Button>
    </Card>
  )
}
```

All components are pre-themed. No additional theme setup is needed.

---

## Using a custom brand theme

Foundation ships `createBrandTheme` for product teams that need their own brand colours.

```tsx
import { createBrandTheme, ThemeRegistryBase } from '@art/foundation'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import type { BrandConfig } from '@art/foundation'

const myBrand: BrandConfig = {
  // your brand config here — see src/app/themes/brands/index.ts for the shape
}

const myTheme = createBrandTheme(myBrand)

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
```

---

## CI / CD authentication

In GitHub Actions, use the built-in `GITHUB_TOKEN` — no PAT needed if the consuming repo is in the same org:

```yaml
- uses: actions/setup-node@v4
  with:
    registry-url: 'https://npm.pkg.github.com'
    scope: '@art'

- run: npm ci
  env:
    NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

For repos outside the ART org, create a PAT with `read:packages` and store it as a repository secret.

---

## Available exports

| Export | Type | Description |
|---|---|---|
| `theme` | MUI Theme | Default Foundation theme |
| `createBrandTheme` | Function | Creates a custom-branded MUI theme |
| `ThemeRegistry` | Component | Next.js App Router theme wrapper |
| `ThemeRegistryBase` | Component | Framework-agnostic theme wrapper |
| `Accordion` | Component | — |
| `Alert` | Component | — |
| `Autocomplete` | Component | — |
| `Badge` | Component | — |
| `Breadcrumb` | Component | — |
| `Button` | Component | — |
| `Card` | Component | — |
| `Checkbox` | Component | — |
| `Chip` | Component | — |
| `Dialog` | Component | — |
| `Drawer` | Component | — |
| `Footer` | Component | — |
| `Header` | Component | — |
| `Icon` | Component | — |
| `IconButton` | Component | — |
| `Logo` | Component | — |
| `Modal` | Component | — |
| `RadioGroup` | Component | — |
| `Select` | Component | — |
| `Spinner` | Component | — |
| `Switch` | Component | — |
| `Table` | Component | — |
| `Tabs` | Component | — |
| `TextField` | Component | — |
| `Tooltip` | Component | — |
