# GitHub Packages — Setup to First Publish

**Status:** In progress  
**Prerequisite:** `feat/npm-package` merged to main ✅

---

## What's already done

- `package.json` — scoped name `@art/foundation`, exports map, `lib:build` script, `peerDependencies` ✅
- `tsup.config.ts` — builds ESM + CJS + types to `dist/` ✅
- `src/index.ts` — public API barrel ✅
- `ThemeRegistryBase.tsx` — framework-agnostic theme wrapper ✅
- `.github/workflows/publish.yml` — triggers on `v*.*.*` tag, publishes to GitHub Packages ✅

---

## Blockers to fix before first publish

### 1. Scope must match the GitHub org/user name

GitHub Packages requires the npm scope to match the GitHub org (or username) that owns the repo.

The repo is currently at `https://github.com/Paolo-Meyer_artghec/Foundation`.  
The package is named `@art/foundation`.

**These won't match** — GitHub Packages will reject the publish unless there is a GitHub org named `art` that owns the repo.

**Decision needed — pick one:**

| Option | What to do |
|---|---|
| A | Create a GitHub org named `art` (or the agreed org name), transfer the repo there, keep `@art/foundation` |
| B | Rename the package to match the current owner, e.g. `@paolo-meyer-artghec/foundation` |

Option A is the right long-term move for an org-level design system.

---

### 2. Add `publishConfig` to `package.json`

Without this, `npm publish` will try to hit the public npm registry.

Add to `package.json`:

```json
"publishConfig": {
  "registry": "https://npm.pkg.github.com"
}
```

---

### 3. Add registry entry to repo `.npmrc`

The repo's `.npmrc` (currently only has Font Awesome config) needs a GitHub Packages line:

```
@art:registry=https://npm.pkg.github.com
```

No auth token goes in this file — that's injected by the GitHub Actions `GITHUB_TOKEN` at publish time, and by a personal PAT for local dev and consuming projects.

---

### 4. Verify the build works locally

Before tagging a release, confirm `tsup` produces a clean output:

```bash
npm run lib:build
```

Check that `dist/` contains:
- `index.js` (ESM)
- `index.cjs` (CJS)
- `index.d.ts` (types)

If there are TypeScript errors, resolve them before publishing. The `dist/` folder is gitignored — it is built fresh by CI on each publish.

---

### 5. GitHub Actions permissions

The workflow already has `packages: write` in its permissions block — this is correct and no further config is needed on the Actions side. The `GITHUB_TOKEN` secret is automatic; no manual secret setup required.

One thing to confirm: **GitHub Packages must be enabled for the repo** (or org). Go to the repo → Settings → General → scroll to "Features" — confirm Packages is on.

---

## How to publish the first version

Once the blockers above are resolved:

```bash
# 1. Confirm build is clean
npm run lib:build

# 2. Bump version (patch = 0.1.1, minor = 0.2.0, major = 1.0.0)
npm version minor

# 3. Push the tag — this triggers the publish workflow
git push --follow-tags
```

GitHub Actions will build and publish automatically. Check the Actions tab on GitHub to monitor.

---

## How consuming projects install the package

Once published, consuming projects need two things:

**1. `.npmrc` in their project root:**

```
@art:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

The `GITHUB_TOKEN` env var must be a GitHub Personal Access Token (classic) with `read:packages` scope. Each developer generates their own at GitHub → Settings → Developer settings → Personal access tokens.

**2. Install the package:**

```bash
npm install @art/foundation
```

**3. Peer dependencies** — consuming projects must have these installed (Foundation won't install them automatically):

```bash
npm install react react-dom @mui/material @mui/icons-material @emotion/react @emotion/styled
```

---

## Open questions

- [ ] Confirm GitHub org name — do we create `art` org or use an existing one?
- [ ] Who generates and distributes PATs to consuming team members — is there a shared service account, or does each dev use their own?
- [ ] Should the package be public (readable without auth) or private? GitHub Packages free tier supports private packages within the org.
