# Foundation release process

How to publish updates to `@art/foundation` on GitHub Packages.

---

## Version numbering

| Change | Bump | Example |
|---|---|---|
| Bug fix, visual tweak, patch dependency update | `patch` | `0.1.0 → 0.1.1` |
| New component, new prop, new export | `minor` | `0.1.0 → 0.2.0` |
| Removed or renamed prop, changed API contract | `major` | `0.1.0 → 1.0.0` |

---

## Publishing a release

Once work is merged to `main`, Frink runs:

```bash
# 1. Make sure you're on main and up to date
git checkout main
git pull

# 2. Bump the version — npm updates package.json and creates a git tag
npm version patch   # or: minor / major

# 3. Push the commit and the tag
git push --follow-tags
```

GitHub Actions detects the `v*.*.*` tag and runs the publish workflow automatically (`.github/workflows/publish.yml`). No manual `npm publish` needed.

---

## Adding a new component to the package

1. **Build the component** — follow the full component pipeline in `AGENTS.md` (Moe → Lenny → Chalmers → Flanders → Marge → Lisa → Willie)

2. **Add the export to `src/index.ts`:**

   ```ts
   export { MyComponent } from './components/MyComponent'
   ```

3. **Test the build locally:**

   ```bash
   npm run lib:build
   ```

   Fix any TypeScript errors before proceeding. The build must be clean.

4. **Commit and raise a PR** — Frink handles this per the standard pipeline.

5. **After merge, bump `minor`** — a new component is always a minor version bump.

---

## Removing or changing a component API (breaking change)

Breaking changes require a migration note before the release goes out.

1. Create `docs/migrations/vX.0.0.md` describing what changed and how to update consuming code.
2. Bump `major`.
3. If deprecating (rather than removing immediately): mark the export with a `@deprecated` JSDoc comment before the major release and give consuming teams at least one minor release to migrate.

---

## Checking what will be published

Before tagging, verify the dist is clean and the right files are included:

```bash
npm run lib:build
npm pack --dry-run
```

`npm pack --dry-run` lists every file that would be included in the published package. It should show only:
- `dist/`
- `tokens.json`
- `package.json`
- `README.md` (if it exists)

---

## GitHub Actions workflow

The publish workflow lives at `.github/workflows/publish.yml`.

It triggers on any tag matching `v*.*.*`, runs `npm run lib:build`, then `npm publish` using the built-in `GITHUB_TOKEN`. No secrets to manage.

If the publish fails, check:
- The tag format matches `v*.*.*` exactly
- The version in `package.json` matches the tag
- The GitHub Actions workflow has `packages: write` permission (it does — set in the workflow file)

---

## Local build only

To build without publishing (useful for testing the output):

```bash
npm run lib:build
```

Output lands in `dist/`. This folder is gitignored — never commit it manually.
