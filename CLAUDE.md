@AGENTS.md
@docs/guidelines/essentials.md

# On-demand reference (not auto-loaded)

The heavy guideline docs are intentionally **not** `@import`ed here — that keeps the per-session context lean. `docs/guidelines/essentials.md` carries the always-on core and points to each of these. Read the matching one before that kind of work:

- `docs/guidelines/typography.md` — full type scale, weights, spacing, composition
- `docs/guidelines/components.md` — component catalogue + when-to-use
- `.github/instructions/a11y.instructions.md` — full WCAG 2.2 AA catalogue (or use `/conformanceReport` / the Flanders agent for component sign-off)
- `.github/instructions/playwright-typescript.instructions.md` — when writing or reviewing Playwright tests (`**/*.spec.ts`): role-based locators, web-first assertions, `test.step()` grouping, files in `tests/` as `<feature>.spec.ts`
- `docs/team/relationship-map.md`, `docs/team/dependency-update.md` — team diagram + dependency workflow

# The team in Claude Code

The Simpsons-themed team is defined in `AGENTS.md` (canonical, runtime-neutral). In Claude Code the agents are instantiable subagents under `.claude/agents/` — invoke one with the `Agent` tool using its `subagent_type` (`smithers`, `moe`, `lenny`, `carl`, `chalmers`, `flanders`, `marge`, `lisa`, `willie`, `frink`, `milhouse`, `troy-mcclure`, `sideshow-bob`, `nextjs-expert`, `accessibility-runtime-tester`, `search-ai-optimization-expert`).

**Entry point:** for any non-trivial task, start with the `smithers` subagent — it routes to the right specialist and enforces the pipeline. Invoke a specialist directly only when you know exactly who you need.

**Skills:** the six Foundation skills are mirrored under `.claude/skills/` and resolve as `/frontend-design`, `/ui-ux-pro-max`, `/conformanceReport`, `/code-quality-review`, `/web-design-reviewer`, `/documentation-writer`. See the **Runtime adapters** table in AGENTS.md for the capability→skill mapping.

**Delegation:** only `smithers` carries the `Agent` tool. Every other agent does component discovery inline with `Read`/`Grep`/`Glob` rather than spawning a subagent.

**Sync note:** `.claude/agents/` and `.claude/skills/` mirror `.github/agents/` and `.github/skills/`. When you change a team member's role or a skill, update both runtimes (or the canonical role text in AGENTS.md, which both defer to).
