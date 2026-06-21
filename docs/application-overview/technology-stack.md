# Application overview: technology stack

A plain-language summary of the technology underpinning this application — what we use and why.

## What this application is

**Foundation is a design-system component library.** It provides a single, consistent set of UI building blocks (buttons, forms, tables, navigation, layouts, etc.) that our products use, so everything looks and behaves consistently and accessibly. It is packaged and published so other projects can install and use it, and it ships with a live workshop (Storybook) where every component is documented and demonstrated.

## Core technology

| Layer | Technology | What it's for |
|---|---|---|
| Language | **TypeScript 5** (strict mode) | Catches errors before code runs; every component is fully typed |
| Framework | **Next.js 16** (App Router, Turbopack) | The web framework; renders pages and runs the dev/build pipeline |
| UI library | **React 19** | The foundation for building interactive interfaces |
| Design system & styling | **MUI v9** + **Emotion**, with a custom Foundation theme and design tokens | Provides the base components and styling engine; our theme enforces brand colours, spacing, and typography |
| Icons | **Font Awesome Pro** (plus Tabler and MUI icons) | The icon set used across components |
| Data visualisation | **Recharts** | Charts and graphs |
| Dates | **Day.js** + **MUI X Date Pickers** | Date handling and date/range picker inputs |
| Interaction | **dnd-kit** (drag-and-drop), **Framer Motion** (animation) | Reorderable lists and smooth, accessible transitions |
| Utilities | **Lodash** | Common helper functions |

## Quality and tooling

| Area | Technology | What it's for |
|---|---|---|
| Component workshop & docs | **Storybook 10** | Every component is built, previewed, and documented here in isolation |
| Testing | **Vitest** + **Playwright** | Automated unit tests and real-browser tests, including accessibility checks |
| Code quality | **ESLint 9** with custom design-system rules | Enforces our standards automatically (e.g. blocks hard-coded colours and disallowed text styles) |
| Build & packaging | **tsup** (library build) + **Next.js build**; published to **GitHub Packages** | Bundles the library for other projects to install |
| Automation | **tsx** scripts, **ts-morph**, **Husky** | Generates design tokens and the codebase map, and keeps them up to date automatically on each commit |

## Standards built into the stack

These aren't optional add-ons — they're enforced by the tooling above:

- **Accessibility (WCAG 2.2 AA)** — checked in Storybook and Playwright, and guided automatically while coding.
- **Design tokens only** — colours, spacing, and typography come from a central theme; hard-coded values are blocked by the linter.
- **Scalable sizing** — text and components use relative units so they respect users' browser and zoom settings.

## AI-assisted development

The project is also deliberately set up so AI coding assistants (GitHub Copilot and Claude Code) work effectively against this stack. See [How this application is optimised for AI](./optimised-for-ai.md) for that side of the story.

## In one line

A **TypeScript + React 19 + Next.js 16** design-system component library, styled with **MUI v9** and a custom themed token system, documented in **Storybook**, tested with **Vitest + Playwright**, and published for reuse across our products.
