# Foundation Design System — Microsoft Briefing

*June 2026*

---

## What it is

**Foundation** is Australian Retirement Trust's internal design system — a shared React/TypeScript component library used to build member-facing digital products across two brands: **ART** and **QSuper**.

**Tech stack:** Next.js 16, React 19, MUI v9, TypeScript strict mode, Storybook v10, Vitest. Published as a GitHub Packages npm package consumed by downstream apps.

**Scope:** ~70 production components (buttons, forms, navigation, data viz, stepped flows), brand-theming system, design tokens pipeline (Figma ↔ code via `tokens.json`), accessibility-first by default (WCAG 2.2 AA).

**Live features in the codebase:** Retirement projection calculator, investment mix management, beneficiary management, identity verification (IDV), lifetime pension flows, member online portal shell.

---

## How it's optimised for AI

The project has been deliberately architected so that AI agents are first-class contributors, not just autocomplete. There are five layers.

---

### 1. Persistent AI context

Every Copilot session auto-loads `.github/copilot-instructions.md`, which pulls in:

- `AGENTS.md` — the full team structure and component pipeline rules
- `docs/guidelines/components.md` — the complete component catalogue (prevents AI from reinventing components that already exist)
- `docs/guidelines/typography.md` — design-system-specific typography constraints (disabled MUI variants, rem rules)

`CLAUDE.md` mirrors this for the Claude model. The result: **every AI session starts with full codebase context without anyone needing to paste anything manually.**

---

### 2. A structured multi-agent team with defined roles and handoffs

The project uses a Simpsons-themed agent team defined in `AGENTS.md` — not as a gimmick, but as a deliberate practice for separating concerns across an AI-assisted workflow.

| Agent            | Role                                                                                                |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| **Smithers**     | Coordinator — routes requests, enforces the pipeline                                                |
| **Milhouse**     | Design contractor — builds pages/layouts from prompts or Figma refs                                 |
| **Lenny**        | Frontend dev — builds library components                                                            |
| **Carl**         | Backend — server actions, API routes                                                                |
| **Moe**          | Design system architect — owns component API decisions                                              |
| **Chalmers**     | Code quality — TypeScript strict, no hardcoded tokens                                               |
| **Flanders**     | Accessibility — WCAG 2.2 AA sign-off required before stable                                         |
| **Marge**        | Visual consistency — MUI token audit                                                                |
| **Lisa**         | Documentation — Storybook stories, MDX                                                              |
| **Willie**       | Status gatekeeper — runs the full sign-off checklist                                                |
| **Frink**        | Version control — branches, commits, PRs                                                            |
| **Sideshow Bob** | Async planning — researches codebase and produces execution documents when a team member is blocked |

Each agent has a defined skill file it reads, specific subagents it's allowed to spawn, and hard gates it enforces. No component reaches "stable" without sign-offs from Moe → Chalmers → Flanders → Marge → Lisa → Willie, and Frink never pushes to `main` without the designer's approval.

---

### 3. Custom packaged skills

Three custom Copilot skills have been authored and live in `.github/skills/`. Each skill is a self-contained instruction document that loads domain-specific knowledge on demand — only when needed — to avoid bloating the base context.

**How they're invoked:** Skills are not called directly by the designer. They are called by agents as part of the component pipeline. Each agent in `AGENTS.md` has an explicit "Skills to invoke" list — the agent reads the skill file via `read_file` when it needs that domain knowledge, then applies it to the task at hand.

| Skill                 | Invoked by                     | What it does                                                                                  |
| --------------------- | ------------------------------ | --------------------------------------------------------------------------------------------- |
| `/frontend-design`    | Lenny, Milhouse                | Generates production-grade React/MUI/Next.js components using Foundation conventions          |
| `/ui-ux-pro-max`      | Milhouse, Marge, Flanders, Moe | Design mode + a11y mode: contrast ratios, WCAG patterns, token audits, keyboard nav           |
| `/conformance-report` | Flanders                       | Runs a structured WCAG 2.2 AA conformance review on a specific component and outputs a report |

For example: when Lenny is building a new component, the pipeline requires him to invoke `/frontend-design` as his primary code generation tool. When Flanders runs an accessibility review, he invokes `/ui-ux-pro-max` (a11y mode) and `/conformance-report`. When Marge audits visual consistency, she invokes `/ui-ux-pro-max` (review mode). The skills are the domain knowledge layer; the agents are the workflow orchestration layer.

---

### 4. AI as a product feature — "Artie"

The design system includes a first-party `ArtieAIButton` component — a branded "Ask Artie" gradient button (sparkle icon, branded blue gradient, WCAG AA contrast verified across all stops, dark-mode aware) that acts as the **UI entry point for an AI assistant surface within the member product itself**. It's in Storybook, exported from the package, and ready for wiring to whatever backend powers Artie.

---

### 5. AI instruction management as a workflow

There's a documented process (in Storybook under *Foundation / AI Management*) for maintaining the AI instruction layer:

- When the same wrong AI output recurs twice, a new `docs/guidelines/` file is the fix
- New guidelines are `@`-referenced into both instruction files immediately
- Guidelines are written for AI consumption first — tables and direct rules, not prose

---

## The headline

This isn't a team that uses Copilot for autocomplete. The entire development workflow — from component proposal through to accessibility sign-off and version control — is orchestrated through a structured multi-agent system with defined roles, supervision checkpoints, and packaged skills. **The AI knows the design system as well as any team member.**
