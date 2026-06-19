@AGENTS.md
@docs/guidelines/typography.md
@docs/guidelines/components.md

# Always-on standards

Copilot auto-applies these via `.github/instructions/*` (`applyTo` globs). Claude Code has no equivalent mechanism, so they are imported here to keep both runtimes in parity.

@.github/instructions/a11y.instructions.md

When writing or reviewing Playwright tests (`**/*.spec.ts`), follow `.github/instructions/playwright-typescript.instructions.md` — role-based locators, web-first assertions, `test.step()` grouping, files in `tests/` as `<feature>.spec.ts`.

## Member Online navigation

Before changing the Member Online side nav (items, children, icons, order, secondary links, or which config shows), **read `src/app/member-online/(portal)/navigation-config/README.md` first.** The nav is driven by per-config JSON files in that folder — edit the JSON, not the components. The README explains the file shape, how to add/exclude items and children, the icon and `href`/placeholder conventions, and how to add a new config.

# The team in Claude Code

The Simpsons-themed team is defined in `AGENTS.md` (canonical, runtime-neutral). In Claude Code the agents are instantiable subagents under `.claude/agents/` — invoke one with the `Agent` tool using its `subagent_type` (`smithers`, `moe`, `lenny`, `carl`, `chalmers`, `flanders`, `marge`, `lisa`, `willie`, `frink`, `milhouse`, `troy-mcclure`, `sideshow-bob`, `nextjs-expert`, `accessibility-runtime-tester`, `search-ai-optimization-expert`).

**Entry point:** for any non-trivial task, start with the `smithers` subagent — it routes to the right specialist and enforces the pipeline. Invoke a specialist directly only when you know exactly who you need.

**Skills:** the six Foundation skills are mirrored under `.claude/skills/` and resolve as `/frontend-design`, `/ui-ux-pro-max`, `/conformanceReport`, `/code-quality-review`, `/web-design-reviewer`, `/documentation-writer`. See the **Runtime adapters** table in AGENTS.md for the capability→skill mapping.

**Delegation:** only `smithers` carries the `Agent` tool. Every other agent does component discovery inline with `Read`/`Grep`/`Glob` rather than spawning a subagent.

**Sync note:** `.claude/agents/` and `.claude/skills/` mirror `.github/agents/` and `.github/skills/`. When you change a team member's role or a skill, update both runtimes (or the canonical role text in AGENTS.md, which both defer to).

