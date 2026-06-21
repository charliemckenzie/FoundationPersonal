# Dependency Update Workflow

> Moved out of `AGENTS.md` to keep the always-on context lean. This is on-demand reference — read it when handling Dependabot PRs or a deliberate major upgrade.

Dependabot runs every Monday morning and opens grouped PRs automatically (see `.github/dependabot.yml`). The team handles them as follows.

## Automated (Dependabot handles detection)

Dependabot groups updates into buckets and opens a PR per group:
- `react` — React + type definitions
- `mui` — All MUI and Emotion packages
- `next` — Next.js (patch/minor only — majors are blocked)
- `storybook` — All Storybook packages
- `tailwind` — Tailwind and plugins
- `testing` — Vitest, Playwright
- `typescript-tooling` — TypeScript, ESLint

## Patch & minor PRs (low risk)

When the designer says **"run dependency review"**, Smithers coordinates:

```
Dependabot PR opens
  → Chalmers reviews (are there any API changes that affect our code?)
  → Lenny verifies (do components still render correctly? run Storybook)
  → Frink merges the PR
```

## Major version bumps (high risk — Smithers coordinates manually)

Major bumps for `next`, `react`, `react-dom`, and `@mui/material` are **blocked from Dependabot** — they require a deliberate decision. When the designer wants to upgrade:

```
Smithers scopes the upgrade (reads migration guide, lists breaking changes)
  → Lenny updates code to new API (component by component)
  → Chalmers reviews each change
  → Flanders re-checks a11y (APIs sometimes change here)
  → Marge re-checks visual consistency (theme APIs may change)
  → Frink opens a dedicated upgrade PR (e.g. feat: upgrade to MUI v10)
  → Designer reviews and approves before merge
```

**Rule:** Major version upgrades are never rushed. If a library's migration guide is longer than a page, treat it as a project in its own right.
