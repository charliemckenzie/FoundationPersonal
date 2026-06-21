# Implementation Plan: AI token efficiency & navigation

> **Companion to** [`ai-efficiency-research.md`](./ai-efficiency-research.md) — read that first for the *why*. This doc is the *how*: an ordered, executable build plan. Point agents (or yourself) at it when implementing.
>
> **Status:** ready to execute. Decisions are settled (see research § "Decisions"). Two new dependencies (`ts-morph`, `husky`) are approval gates — flagged inline.

---

## How to use this plan

- **Read the research doc's "Decisions" section first** — every choice in this plan was settled there; don't re-litigate.
- **Model: run the whole thing on Opus.** This work edits the AI's own guardrails, is parity-sensitive, and the generator has real edge cases — judgment-heavy throughout. No need to switch models.
- Work the phases **in order** — Phase 0 → 1 → 2. Each is independently shippable as its own PR.
- **Within Phase 1, do 1A (essentials.md) and 1F (slim AGENTS.md) before wiring the routers (1B/1C)** — the entry points import both, so settle their content first.
- Every code change still goes through the normal pipeline (Chalmers → … → Frink) and the **Foundation sign-off** block. This plan is the spec, not a bypass.
- **Hard constraint throughout:** keep the two runtimes in parity. Any change to `AGENTS.md`, the entry points, or the guideline docs must leave `npm run sync-runtimes:check` green and Copilot working. Copilot is the primary tool — treat `.github/copilot-instructions.md` as co-equal to `CLAUDE.md`, never an afterthought.
- **Generated-artifact contract:** anything the generator emits (`codemap.json`, `docs/codemap/*.md`) is never hand-edited. Change source, regenerate.

### Approval gates (do not proceed past these without Adam's OK)

| Gate | Where | Why |
|---|---|---|
| Add `ts-morph` dependency | Phase 2, step 2A | New dependency (supervision checkpoint #4) |
| Add `husky` dependency | Phase 2, step 2F | New dependency; installs a git hook on `npm install` |
| Edit `AGENTS.md` / theme-adjacent docs | Phase 1 (1F) **and** Phase 2 (2H) | Ripples across both runtimes; re-run `sync-runtimes` after each |

---

## Guardrails grounded in existing repo patterns

This plan deliberately mirrors machinery the repo already trusts, so there's no new infrastructure:

- **Generators** follow `scripts/generate-tokens.ts` — a `tsx`-run TS script that imports from `src/` and writes an artifact. (`tsx` is already a devDependency.)
- **Drift checks** follow `scripts/sync-runtimes.mjs` — a `--check` flag, a `writeIfChanged` helper, drift reporting, `exit 1` on drift. Reuse this exact shape.
- **CI** follows `.github/workflows/sync-runtimes.yml` — `pull_request` + `paths:` filter + `node scripts/<x>.mjs --check`. Advisory (not blocking), matching the repo's branch-protection stance.
- **npm scripts** follow the `sync-runtimes` / `sync-runtimes:check` pairing in `package.json`.

---

## Phase 0 — Baseline measurement (do this first)

**Goal:** a repeatable "before" number, so Phase 1's saving is provable, and a guard that stops the bloat returning. Research decision #4.

### 0A. Build `scripts/context-budget.mjs`
- Plain `.mjs` (no TS needed), run via `node`, mirroring `check-setup.mjs` style.
- For **each runtime**, resolve the always-on set and sum it:
  - **Claude Code:** parse `CLAUDE.md` for `@import` lines, follow them transitively (AGENTS.md → its imports, etc.), collect the file set.
  - **Copilot:** `.github/copilot-instructions.md` `@import`s **plus** every `.github/instructions/*.instructions.md` whose `applyTo` glob matches a representative UI file (e.g. `src/components/Button/index.tsx`).
- Output per runtime: file list, char count, and a **token estimate** (chars ÷ 4 is fine; document the heuristic).
- Support a `--check` mode that exits 1 if either runtime's estimate exceeds a `BUDGET` threshold constant (set the threshold in step 1G, after the slim).
- Wire `package.json`: `"context-budget": "node scripts/context-budget.mjs"` and `"context-budget:check": "node scripts/context-budget.mjs --check"`.

### 0B. Capture the "before"
- Run `npm run context-budget`, paste the output into the Phase 0 PR description. Expected ≈ 31–32k tokens/runtime (research Finding 1).

**Verification:** script prints two per-runtime numbers; re-running gives identical output. No threshold guard yet (added in 1G).

---

## Phase 1 — Slim the always-on context (the big win)

**Goal:** cut the ~32k always-on tokens by >60% on **both** runtimes, by moving the four large reference docs on-demand and keeping only a small, shared, bug-preventing core. Research Tier 1.

### 1A. Define the shared always-on core
Create a single small shared file both entry points import — `docs/guidelines/essentials.md` (target ≤ ~120 lines). This is the parity-safe home for the core, replacing Copilot's currently-inline "Non-negotiable rules" block (`.github/copilot-instructions.md` lines 11–62) and giving Claude Code the same content (it doesn't have it today). Contents (research § "what the always-on core contains"):
- Hard styling rules — MUI tokens only, `rem` sizing, unitless line-heights, banned Typography variants (`body1/body2/subtitle1/subtitle2/button/overline`), no inline `style`.
- Entry-point/routing pointer — "start with Smithers".
- "Check existing components first" + a **bare component-name list** (names only — derived from the `COMPONENTS` data in Phase 2; until then, a hand list).
- High-frequency gotchas — stepped-form error placement (Alert above `StepperActions`), Next.js async `params`/`searchParams`.
- **Pointers to on-demand reference** — "read `docs/guidelines/typography.md` for the full scale", "read the a11y reference / use `/conformanceReport` before an a11y review", "read the component judgment doc before choosing between similar components".

### 1B. Rewrite `CLAUDE.md` → thin router
- Drop the `@import`s of `docs/guidelines/typography.md`, `docs/guidelines/components.md`, `.github/instructions/a11y.instructions.md`.
- Keep `@AGENTS.md` (slimmed in 1F) and add `@docs/guidelines/essentials.md`.
- Net: `CLAUDE.md` imports only AGENTS.md (routing/charter) + essentials.md (core) + short pointers.

### 1C. Rewrite `.github/copilot-instructions.md` → thin router (co-equal)
- Drop the `@import`s of `typography.md` and `components.md`.
- Replace the inline "Non-negotiable rules" block with `@docs/guidelines/essentials.md` so both runtimes share one source.
- Keep the Copilot-specific notes (agent-picker entry point, stack-version warnings) that have no Claude equivalent.

### 1D. Split the guideline docs (essentials extracted, reference stays on-demand)
- **Typography** (`docs/guidelines/typography.md`): the banned-variant list + "always use a variant / never hardcode" rule moves into `essentials.md`; the full scale tables stay in the file as the on-demand reference. No content lost — just relocated.
- **A11y** (`.github/instructions/a11y.instructions.md`): the Five Rules of ARIA + severity legend move into `essentials.md`; the 38 anti-patterns stay in the file as on-demand reference (read by Flanders / `/conformanceReport`).
- **Components**: leave `components.md` as-is in Phase 1 (full retirement is Phase 2); just stop importing it and add the "check first" pointer to `essentials.md`.

### 1E. Narrow the a11y `applyTo` glob (Copilot-only lever, no parity cost)
- In `.github/instructions/a11y.instructions.md` frontmatter, change `applyTo: '**'` → UI surfaces only, e.g. `applyTo: 'src/components/**,src/app/**,**/*.tsx'`.
- Effect: Copilot stops loading the 625-line a11y doc when editing scripts/config/server actions/tests. Claude Code's equivalent (stop importing it) is already done in 1B.

### 1F. Slim `AGENTS.md`'s always-on footprint  ⚠️ approval gate
- Keep always-on: the Runtime-adapters tables, the routing table, the pipeline sequence, the Code Quality charter, supervision checkpoints.
- Move out to where they're consumed: per-agent **signature phrases / voice / personality** belong in `.github/agents/*.agent.md` (already exist) — reference them, don't inline. The mermaid relationship diagram and the dependency-update narrative can move to a separate `docs/team/` reference doc loaded on demand.
- After editing, run `npm run sync-runtimes` (regenerates `.claude/agents` frontmatter) and confirm `sync-runtimes:check` is green.

### 1G. Measure, set the threshold, add the guard
- Run `npm run context-budget`. Confirm **>60% reduction** vs the Phase 0 baseline on both runtimes (target ≈ ≤ 12k tokens).
- Set the `BUDGET` threshold in `context-budget.mjs` a little above the new number (headroom for small growth).
- Add `.github/workflows/context-budget.yml` (copy `sync-runtimes.yml`; `paths:` = the entry points, `essentials.md`, `AGENTS.md`, `.github/instructions/**`; run `npm run context-budget:check`). Advisory.

**Phase 1 verification**
- `npm run context-budget` shows >60% drop, both runtimes.
- `npm run sync-runtimes:check` green (parity intact).
- Spot-check: open a fresh Claude Code session and a Copilot chat; confirm the core rules (tokens, banned variants, "start with Smithers") are present and the big reference docs are *not* auto-loaded but are reachable via the pointers.
- `npm run lint` / existing CI still green (no code touched, but confirm).

---

## Phase 2 — The graph (generator + catalogue retirement + Obsidian vault)

**Goal:** a self-maintaining code map that owns inventory, retire the hand-catalogue to a slim judgment doc, and emit an Obsidian vault for humans. Research Tier 2 #4–5.

### 2A. Add `ts-morph`  ⚠️ approval gate
- `npm i -D ts-morph`. Needed only for the composition pass (one AST step). Everything else is plain derivation.

### 2B. Make the status data importable (small refactor)
- Today `COMPONENTS` lives inside `src/stories/index.mdx` as an exported array. Extract it to `src/stories/component-status.ts` (`export const COMPONENTS = [...]`, plus `STATUS_ORDER`, `STATUS_COLOR`, `COUNTS`), and have `index.mdx` import from it.
- Why: the generator imports the **same module** instead of brittle-parsing MDX. Single source of truth for status; the MDX table is unchanged for users.

### 2C. Build `scripts/generate-codemap.ts` (mould: `generate-tokens.ts`)
Run via `tsx`. Build one in-memory graph model. **Node model (decided): code-derived nodes + status overlay + two edge types.** The node set is what actually exists in code; status is laid over it; the hierarchy is preserved via a separate containment edge. This keeps source-of-truth = code (the map can't miss a component someone forgot to add to `COMPONENTS`) and stops composites being flattened.

| Field | Source / rule |
|---|---|
| **Node set** | real components found in code: top-level `src/components/*/` dirs **plus** nested things that are *exported* (reusable units, not private helpers). Not the `COMPONENTS` array — that's the status overlay. |
| **Path** (per node) | the **name→path resolver** (step 2C-i below) — needed because `COMPONENTS` carries no paths and ~13 entries are *not* at `src/components/<Name>/`. |
| **`status`** | overlaid from `COMPONENTS` (in `component-status.ts`) by name; unmatched node → `status: unknown` (integrity flag, step 2E). |
| **`partOf`** (containment edge) | **derived for free from path nesting**: if a node's file resolves *under* another component's dir, it is part of that parent (e.g. `SideNav.partOf = MemberOnline`). |
| **`composes`** (dependency edge) | **ts-morph** pass: for each node's source, collect imports resolving to other Foundation components (`@/components/X` or relative `../X`). |
| **`usedBy`** (reverse edge) | invert `composes`. |
| **Key exports** | parse `src/index.ts` barrel. |

#### 2C-i. Name → path resolver (build deliberately — don't assume `src/components/<Name>/`)
Resolution order:
1. **Barrel first** — `src/index.ts` maps exported symbol → source path; covers public components.
2. **Nested search** — for names not in the public barrel (the ~13 sub-components like `SideNav`, `BalanceCard`, `MemberHeader` under `src/components/MemberOnline/`), glob `src/components/**` for a dir/file matching the name.
3. **Unresolved → flag** — any `COMPONENTS` name that resolves to nothing is an integrity error (step 2E), not a silent skip.

Emit two AI-facing artifacts:
- `codemap.json` — compact, the canonical machine artifact.
- `CODEMAP.md` — a skimmable rendering (optional but cheap).

### 2D. Emit the Obsidian vault (`docs/codemap/*.md`) — required
- One note per node, filename = component name (so `[[wikilinks]]` resolve).
- YAML frontmatter: `status`, `path`, `partOf`, `composes`. Body renders **both axes** so composites cluster their parts and the graph stays readable:
  - `**Part of:** [[MemberOnline]]` (only on sub-components)
  - `**Composes:** [[Button]] · [[Icon]]`
  - `**Used by:** [[InvestmentOverview]]`
- Generated from the same model in the same run — never a separate pass.

### 2E. Integrity check + `--check` mode (mould: `sync-runtimes.mjs`)
- `--check`: regenerate to memory, compare against committed artifacts via a `writeIfChanged`-style diff, `exit 1` on drift.
- Integrity — three checks from the node-model decision:
  1. **Node with no status** — a code-derived node that no `COMPONENTS` entry matches (`status: unknown`). Prompt: add it to `component-status.ts`.
  2. **Status with no code** — a `COMPONENTS` entry the name→path resolver can't locate. Prompt: fix the name or remove the stale entry.
  3. **Containment sanity** — nodes resolving under another component's dir are tagged `partOf`; surfaces the nested sub-components (`SideNav`, `BalanceCard` under `MemberOnline/`) so they're modelled as parts, not flattened peers.

  Invisible drift becomes a loud, fixable error rather than a silent skip.
- `package.json`: `"generate-codemap": "tsx scripts/generate-codemap.ts"`, `"generate-codemap:check": "tsx scripts/generate-codemap.ts --check"`.

### 2F. Freshness wiring  ⚠️ approval gate (husky)
- `npm i -D husky` + add `"prepare": "husky"` to `package.json` so the hook self-installs on `npm install` (git hooks aren't shared on clone — this is mandatory or the hook silently never runs).
- Add a `pre-commit` hook that:
  1. runs `npm run generate-codemap`, then
  2. **re-stages** the outputs: `git add codemap.json CODEMAP.md docs/codemap/` — without this the fresh map is excluded from the commit (the one-commit-behind trap; research § freshness).
- Optional belt-and-braces: add a `predev`/`prestorybook` regen, or fold it alongside the existing `sync-font-awesome-icons` build step.

### 2G. CI drift workflow
- Add `.github/workflows/codemap.yml` (copy `sync-runtimes.yml`): `paths:` = `src/components/**`, `src/index.ts`, `src/stories/component-status.ts`, `codemap.json`, `docs/codemap/**`, `scripts/generate-codemap.ts`; run `npm run generate-codemap:check`. Advisory backstop for `--no-verify` commits and contributors without the hook.

### 2H. Retire `components.md` → slim judgment-only doc
- The graph now owns inventory, so cut `docs/guidelines/components.md` (447 lines) down to a **~40–80 line `docs/guidelines/component-selection.md`**: only the non-derivable judgment — "Dialog vs Modal", "Select vs InputSelectContainer", "never create a new component without Moe's sign-off", "`small`/`caption` — use sparingly", the prop conventions. On-demand, not always-on.
- Update the `essentials.md` pointer (1A) and the entry points to point at `component-selection.md` + the codemap, not the old catalogue.
- Update `AGENTS.md` (Moe's responsibility): "maintain the components catalogue" → "the generator owns catalogue facts; Moe owns only the small selection doc". Run `sync-runtimes`.
- Update any agent prose (Lenny/Moe/Smithers discovery steps) that says "read `components.md`" → "query the codemap; read `component-selection.md` for judgment".

### 2I. Point discovery at the codemap
- In the relevant skills/agents, the "discover existing components" step references `codemap.json` first (cheap, complete) before grepping.
- **Close the Phase 1 loop:** replace the *stopgap hand-written component-name list* in `essentials.md` (added in 1A) with a one-line pointer to the codemap as the live list. Otherwise that hand list becomes a new drift point — the exact thing this effort removes. (Keep generated and hand content separate: don't inject the generated list *into* `essentials.md`; point at the codemap.)

**Phase 2 verification**
- `npm run generate-codemap` produces `codemap.json`, `CODEMAP.md`, and `docs/codemap/*.md`; opening `docs/codemap/` as an Obsidian vault renders the graph view with working backlinks.
- Make a trivial component change, `git add . && git commit` → confirm the codemap files update **in that commit** (re-staging works).
- `npm run generate-codemap:check` green on a clean tree; flip a value by hand → it goes red.
- Integrity check lists the known `COMPONENTS`-vs-dir mismatches; resolve or document them.
- `sync-runtimes:check` green; `context-budget` shows a further drop (catalogue no longer always-on — though it already wasn't after Phase 1; the win here is drift-removal + the slim doc).

---

## Phase 3 — Parked (MCP navigation server)

Not being built. Documented in the research with a revisit rule: revisit only if post-Phase-2 measurement shows discovery still costs ~5+ round-trips per task, or `codemap.json` grows large enough that loading it whole is itself expensive. No action now.

---

## Risks & decisions to make during build

- ~~Node granularity (Phase 2C).~~ **Decided with Adam: code-derived nodes + status overlay + `partOf`/`composes` edges** (Phase 2C). The node set is what exists in code (not the `COMPONENTS` array); status is overlaid; containment (`SideNav` *part of* `MemberOnline`) is derived from path nesting and kept as a separate edge from composition. Requires the deliberate name→path resolver (2C-i) since `COMPONENTS` carries no paths and ~13 entries aren't at `src/components/<Name>/`. The one judgment call left for build time: the exact rule for "which *nested exported* things count as nodes vs private helpers" — default to "exported from the composite's `index` or the public barrel".
- **`essentials.md` ownership.** It's now the always-on core for both runtimes — put it under the `sync-runtimes` parity mindset (both entry points import it; changing it is a both-runtimes change). Add it to the `context-budget` and (optionally) a CI path filter.
- **Don't over-trim the core (Phase 1).** The core's size is low-stakes (~1–2k tokens); resist cutting the high-frequency gotchas to save bytes — they prevent recurring bugs. Optimise for bug-prevention per token.
- **Advisory CI.** Per the project's branch-protection choice, all new `--check` workflows are advisory (red but non-blocking). The pre-commit hook is the real freshness guarantee; CI is the backstop.

## Suggested PR sequence

1. **PR 1 — Phase 0:** `context-budget.mjs` + baseline numbers in the description. (No behaviour change; safe.)
2. **PR 2 — Phase 1:** `essentials.md`, both entry points slimmed, guideline split, a11y glob narrowed, `AGENTS.md` slimmed, budget guard + workflow. Headline: ">60% always-on reduction, X→Y tokens, both runtimes."
3. **PR 3 — Phase 2:** status extraction, `generate-codemap.ts`, Obsidian vault, husky hook, CI workflow, `components.md` → `component-selection.md`, agent/skill discovery updates.

Each PR carries the **Foundation sign-off** block and keeps `sync-runtimes:check` green.
