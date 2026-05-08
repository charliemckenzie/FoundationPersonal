# Tech Glossary

Quick-reference definitions for the tools and terms used in this project. Written for people who don't code day-to-day.

---

## The Big Picture

**Foundation** is our internal design system — a shared library of UI components (buttons, alerts, tables, etc.) that any product team can use. Think of it as a toolkit that keeps every product looking and feeling consistent.

---

## Core Tools

### React
The underlying technology used to build every component. React lets you define reusable building blocks (e.g. "a Button") and combine them to build interfaces. You don't need to touch React directly — it's the engine under the hood.

### Next.js
A framework that sits on top of React. It handles routing, page structure, and performance. Our dev environment runs on Next.js — when you see `npm run dev`, that's starting a Next.js server.

### TypeScript
A stricter version of JavaScript that catches mistakes before they reach the browser. If a developer passes the wrong type of data to a component, TypeScript will flag it immediately. Files end in `.ts` or `.tsx`.

---

## Design System Tools

### MUI (Material UI)
Our component library. MUI provides the base components — buttons, text fields, modals, etc. — that we then customise to match our brand. We never hardcode colours or spacing; instead we use **theme tokens** (see below) so MUI applies them consistently everywhere.

### Theme tokens
Named design values instead of raw numbers. Rather than writing `color: #005BBB`, we write `color: primary.main`. The token resolves to the right colour for whichever brand (ART or QSuper) is active. Change the token once → everything updates.

### Surface tokens
Define the background colours that UI sits on top of. There are three levels:

- **Default** — the page background. The outermost layer everything sits on.
- **Paper** — a raised surface. Cards, panels, drawers — anything that sits above the page.
- **Elevated** — a further-raised surface. Dropdowns, tooltips, hover states — things that float above paper.

Think of it as a physical stack: Default → Paper → Elevated, each one slightly lighter (light mode) or darker (dark mode) to create visual depth. They're sourced from the brand's neutral scale (greys), so swapping the brand token updates all surfaces automatically.

### Emotion
The styling engine that MUI uses behind the scenes. It converts our `sx={{ ... }}` prop shorthand into real CSS. You'll rarely see it mentioned directly.

### Tailwind CSS
A utility CSS library also available in the project. Provides helper classes like `flex`, `gap-4`, `rounded-full`. Used sparingly alongside MUI.

---

## Storybook
A standalone browser app (runs at `localhost:6006`) where every component lives in isolation. You can:
- Browse all components in the left-hand sidebar
- Switch between **ART** and **QSuper** brand themes using the toolbar at the top
- Toggle **light/dark mode**
- See and edit props live using the **Controls** panel

Storybook is the source of truth for the design system. If a component isn't in Storybook, it doesn't officially exist.

### Story
A single example of a component in a specific state. The `Default` story shows the basic version; other stories show variants (e.g. `Sizes`, `Backgrounds`, `Gallery`). Stories live in `src/stories/`.

### Docs tab
Auto-generated documentation for each component. Shows the props table, description, and all stories in one page. Click **Docs** in the sidebar under any component.

### a11y addon
The **Accessibility** panel in Storybook (the person icon in the bottom panel). It automatically flags colour contrast failures and missing ARIA attributes.

---

## Icons

### Font Awesome (Pro)
Our primary icon set for UI icons — things like arrows, checkmarks, warning signs. Comes in multiple weights: Solid, Regular, Light, Thin. Used via the `Icon` component.

### Hero Icons
Larger illustrative icons unique to each brand. ART uses full-colour illustrations; QSuper uses monochrome SVGs that can be tinted. Used via the `HeroIcon` component.

---

## Brands

### Foundation (ART theme)
The default brand. Blue pill-shaped buttons, Noto Sans typeface, full-colour hero icons.

### Theme B (QSuper theme)
The QSuper brand. Rounded-rectangle buttons, Open Sans typeface, monochrome hero icons.

---

## Development Terms

### Component
A reusable piece of UI — Button, Alert, Modal, etc. Each lives in `src/components/` and has its own folder.

### Props
Short for "properties". The settings you pass into a component to control how it looks or behaves — e.g. `size`, `variant`, `disabled`. The **Controls** panel in Storybook lets you change props live.

### `sx` prop
MUI's shorthand for styling. Instead of writing a separate CSS file, you write styles inline: `sx={{ mt: 2, color: 'primary.main' }}`. Values map to theme tokens where possible.

### npm / `npm run ...`
npm is the tool used to install packages and run scripts. Common commands:
- `npm run storybook` — start Storybook
- `npm run dev` — start the Next.js dev server
- `npm run lint` — check for code quality issues

### ESLint
Automatically checks code for common mistakes and style issues. Runs on save in VS Code and also via `npm run lint`.

### Vitest / Playwright
Testing tools. Vitest handles unit tests (does this function return the right value?). Playwright handles end-to-end tests (does this page actually work in a browser?).

### Chromatic
A cloud service connected to Storybook. It takes visual snapshots of every story and flags when something changes visually — useful for catching accidental regressions.

---

## Related

- [[accessibility-audit-todo]] — WCAG 2.2 AA audit of Foundation. See this for real-world examples of the a11y concepts above.
- [[Issues & Open Questions]] — active bugs and open design decisions
- [[Obsidian Formatting Cheat Sheet]] — formatting reference
