@AGENTS.md
@docs/guidelines/typography.md
@docs/guidelines/components.md

## Entry point

**Start every task with Smithers.** Switch to the `Smithers` agent in the picker and describe what you need — he routes it to the right specialist and enforces the pipeline. Only switch to a specialist agent directly if you know exactly who you need (e.g. "Flanders, review this component").

> **Runtime note.** AGENTS.md is shared with Claude Code and is runtime-neutral; its per-role "Skills to invoke" / "Subagents to spawn" lists are indicative — resolve them via the **Runtime adapters** table in AGENTS.md. In Copilot, only **Smithers** can delegate to another agent; every other agent discovers existing components inline (`codebase` / `search`) rather than spawning a subagent.

## Non-negotiable rules — enforced in every conversation

### Before writing any UI code
**Always check existing components first. No exceptions.**

Before writing any component, page, or UI code:
1. Read `docs/guidelines/components.md` — it lists every available Foundation component
2. Check `src/components/` directly if something seems missing from that list
3. Only use raw MUI primitives if no Foundation component covers the need

Do not reach for `@mui/material/Card`, `@mui/material/Button`, or any other raw MUI primitive when a Foundation component exists. The Foundation components are at `src/components/` and must be used.

### Typography variants — use only these
Never use `body1`, `body2`, `subtitle1`, `subtitle2`, `button`, or `overline` as Typography variants. They are disabled in this design system. Use: `display-1` through `display-5`, `h1`–`h6`, `lead`, `body`, `small`, `caption`.

### Styling
- MUI theme tokens only in `sx` props — no hardcoded colours, spacing, or font sizes
- Font sizes must use `rem`. Line heights must be unitless
- Never use `style={{}}` inline props — use `sx`
- Layout/flex props (`alignItems`, `justifyContent` etc.) belong in `sx`, not as direct component props

### Stack versions — treat as potentially unfamiliar
This project runs **React 19**, **MUI v9**, **Next.js 16**, and **Storybook 10**. AI training data is heavily biased toward older versions. Key differences:
- **React 19**: `ref` is a regular prop — no `forwardRef` wrapper needed on new components. Server Actions are first-class. `use()` hook replaces many patterns.
- **MUI v9**: Grid v2 is the default `Grid` — the v1 API is gone. Some deprecated props removed. Theme `sx` shorthand strings (`'primary.main'`) are preferred over callback access for static tokens.
- **Storybook 10**: `@storybook/nextjs-vite` replaces `@storybook/nextjs`. Story format is CSF3 with `satisfies Meta<typeof Component>`. Addon APIs differ from v7/v8.

### Stepped forms — validation error placement
When the user presses Next/Submit on a stepped form and the step is invalid, show the validation error in a single `Alert` **directly above `StepperActions`**, not only at the top of the step. On long steps a top-of-page error scrolls out of view, so the user gets no feedback next to the button they clicked. Field-level indicators (invalid inputs, a total turning red) stay in place; clear the error on advance/back. See `docs/guidelines/components.md` → "Stepped form validation" and `src/features/investment-mix/InvestmentMixFlow.tsx`.

### Next.js — treat as unfamiliar
This project uses Next.js with breaking API changes from common training data. When working on Next.js code, prefer the `Next.js Expert` agent (`.github/agents/expert-nextjs-developer.agent.md`) or read `node_modules/next/dist/docs/` before writing any Next.js API calls. Key v16 break: `params` and `searchParams` are now async — always `await` them.

### Playwright tests
When writing or reviewing Playwright tests, follow `.github/instructions/playwright-typescript.instructions.md`. Tests go in `tests/` as `<feature>.spec.ts`. Use role-based locators, web-first assertions, and `test.step()` grouping.

### Accessibility
WCAG 2.2 AA anti-patterns are applied automatically via `.github/instructions/a11y.instructions.md`. For component sign-off, use the `Flanders` agent or `/conformanceReport`. For runtime keyboard/focus testing, use the `Accessibility Runtime Tester` agent.

### Skills available
- `/frontend-design` — build Foundation components and pages
- `/ui-ux-pro-max` — design review, a11y, visual consistency
- `/conformanceReport` — WCAG 2.2 AA conformance review (note: `/conformanceReport`, not `/conformance-report`)
- `/code-quality-review` — run the Chalmers checklist: TypeScript strictness, token-only styling, size limits, security basics
- `/web-design-reviewer` — visual QA of running Storybook or app
- `/documentation-writer` — Diátaxis-structured docs (tutorials, how-tos, reference, explanation)

### Prompts available
- `/chronicle` — session history: `/chronicle standup` (daily summary), `/chronicle improve` (patterns + suggestions)

