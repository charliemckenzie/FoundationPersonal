@AGENTS.md
@docs/guidelines/essentials.md

## Entry point

**Start every task with Smithers.** Switch to the `Smithers` agent in the picker and describe what you need — he routes it to the right specialist and enforces the pipeline. Only switch to a specialist agent directly if you know exactly who you need (e.g. "Flanders, review this component").

> **Runtime note.** AGENTS.md is shared with Claude Code and is runtime-neutral; its per-role "Skills to invoke" / "Subagents to spawn" lists are indicative — resolve them via the **Runtime adapters** table in AGENTS.md. In Copilot, only **Smithers** can delegate to another agent; every other agent discovers existing components inline (`codebase` / `search`) rather than spawning a subagent.

## Always-on core

The non-negotiable rules — styling (MUI tokens, rem sizing), typography variants, "check existing components first", the accessibility floor, stack versions, and the high-frequency gotchas — live in `docs/guidelines/essentials.md`, imported above and shared verbatim with Claude Code. Edit that file, not this one, to change a rule both runtimes follow.

The heavy reference docs are intentionally **not** imported here — they apply on demand:
- **A11y full catalogue** auto-applies to UI files via `.github/instructions/a11y.instructions.md` (scoped by its `applyTo` glob); for component sign-off use `/conformanceReport` or the Flanders agent.
- **Full typography scale** (`docs/guidelines/typography.md`), the **generated component inventory** (`codemap.json` / `CODEMAP.md`), and the **when-to-use judgment** (`docs/guidelines/component-selection.md`) are read before that kind of work — see the pointers in `essentials.md`.
- **Playwright** test guidance (`.github/instructions/playwright-typescript.instructions.md`) auto-applies to `**/*.spec.ts`.

## Skills available

- `/frontend-design`, `/ui-ux-pro-max`, `/conformanceReport`, `/code-quality-review`, `/web-design-reviewer`, `/documentation-writer` — see the **Runtime adapters** (capability → skill) table in AGENTS.md.

## Prompts available

- `/chronicle` — session history: `/chronicle standup` (daily summary), `/chronicle improve` (patterns + suggestions)
