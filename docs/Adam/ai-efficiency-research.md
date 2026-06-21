# Research: AI token efficiency & navigation for Foundation

> **Deliverable type:** Research findings, intended for hand-off to a separate implementation-planning pass.

---

## Context — why this research

The Foundation app is growing (548 TS/TSX files, ~26k lines, 68 components, 8 multi-step feature flows) and is becoming more token-intensive and slower to work with via AI assistants (Claude Code / Copilot). Adam wants to understand *where* the AI cost actually lives today and *what opportunities exist* to improve it, before committing to a build.

The trigger reference was [graphify](https://github.com/safishamsi/graphify) — a code-graph tool that lets an AI navigate a codebase more efficiently. Adam correctly judged it inappropriate here (Python-based, calls external LLMs) but wants this *kind* of thinking explored: find the real opportunities, graphify-style or otherwise.

**Scope decision (confirmed with Adam): everything is on the table** — including the always-loaded agent framework, the guideline imports, and the dual Copilot+Claude-Code runtime setup, if it saves tokens.

This document measures the current state, surveys options, and ranks opportunities. It does **not** prescribe an implementation — that is the next pass.

---

## How to think about the cost: two separate budgets

AI cost in a repo splits into two distinct categories. Conflating them leads to fixing the wrong thing.

| | **A. Fixed per-session tax** | **B. Variable navigation cost** |
|---|---|---|
| What | Context auto-loaded *before any work begins* | Tokens spent discovering which files matter for a task |
| When paid | Every session/turn, unconditionally | Per task, scales with repo size |
| Driver here | The `CLAUDE.md` `@import` chain | 548 files, no machine-readable map |
| graphify addresses | ✗ | ✓ |

**Key insight:** graphify-style tooling targets **B**. But for Foundation *today*, **A is the larger and more certain cost** — it is paid on every single turn regardless of task, and most of it is irrelevant to any given task. The highest-ROI work is cutting A first; B is a strong secondary.

---

## Findings (measured)

### Finding 1 — The always-loaded context is ≈30k+ tokens, paid every session

**This applies to *both* runtimes, and Copilot is the primary one.** `CLAUDE.md` is a 28-line wrapper that `@import`s four large documents. Its Copilot counterpart, `.github/copilot-instructions.md` (63 lines), imports the same big three (`AGENTS.md` + typography + components) and additionally carries the a11y reference via `.github/instructions/a11y.instructions.md`, which is set to **`applyTo: '**'`** — i.e. the full 625-line accessibility doc is applied to *every* file Copilot touches. So Copilot's always-on load is essentially the same magnitude as Claude Code's; the table below measures the Claude Code chain, but read it as representative of both.

Every session loads all of these up front (directly observable — they are all present in context right now):

| File | Lines | ~Chars | ~Tokens |
|---|---|---|---|
| `AGENTS.md` | 770 | 45,000 | ~11,000 |
| `.github/instructions/a11y.instructions.md` | 625 | 38,000 | ~9,500 |
| `docs/guidelines/components.md` | 447 | 27,000 | ~6,750 |
| `docs/guidelines/typography.md` | 273 | 16,000 | ~4,000 |
| `CLAUDE.md` wrapper | 28 | 2,000 | ~500 |
| **Total** | **~2,140** | **~128,000** | **~31,750** |

That is ~32k tokens consumed before the user's first message — on a backend bugfix, a docs tweak, anything. A pure server-action task still loads the full 38k-char accessibility anti-pattern catalogue and the entire 16-agent pipeline narrative.

This is the single biggest lever in the repo.

### Finding 2 — `AGENTS.md` mixes thin routing logic with heavy reference prose

The 770 lines are mostly *reference and flavour*: per-agent signature phrases, voice descriptions, a mermaid relationship diagram, dependency-update workflows, supervision checkpoints. The genuinely *always-needed* content is small: the runtime-adapter tables, the routing table, the pipeline sequence, and the code-quality charter — perhaps ~150–200 lines. The rest is valuable but belongs where it is consumed (the per-agent definition files), not in every session's context.

### Finding 3 — The component catalogue is hand-maintained and can drift

`docs/guidelines/components.md` (447 lines) is manually updated by the "Moe" role whenever a component changes. Two problems: (a) **drift risk** against the real `src/components/` (68 dirs) — the doc can silently fall out of sync; (b) it is a large **always-on** cost. The data it contains (component name, path, status, composition) is derivable from source.

### Finding 4 — No machine-readable code map exists (this is graphify's domain)

548 files, no symbol index, no dependency/composition graph available to the AI. Discovery today is grep/glob/Explore round-trips. The "Composition Map" in `components.md` is hand-written prose. There is a partial, underused machine-readable asset: the `COMPONENTS` array embedded in `src/stories/index.mdx` (71 entries: name, status, story URL), and the public barrel `src/index.ts` (171 lines). Nothing stitches these into a navigable map.

### Finding 5 — Dual-runtime duplication (`.github/` ↔ `.claude/`) — both runtimes stay

Skills are duplicated 100% (`.github/skills/` ≈ `.claude/skills/`, 1,054 lines each). Agents are asymmetric (full bodies in `.github/agents/` ≈ 2,089 lines; thin wrappers in `.claude/`). Kept in sync by `scripts/sync-runtimes.mjs` + a CI check. This cost is **maintenance + repo size**, mostly *not* Claude Code's per-session budget.

**Confirmed with Adam: GitHub Copilot is very much still actively used.** Retiring the mirror is therefore *off the table* — both runtimes must be maintained in parity. The implication for everything else in this document: any restructuring of `CLAUDE.md`, `AGENTS.md`, or the guideline docs must keep Copilot working too. The good news is that the biggest lever (Tier 1) is runtime-neutral — `AGENTS.md` is imported by *both* `CLAUDE.md` and `.github/copilot-instructions.md`, so slimming it benefits both. The constraint is that the essentials/reference split (Tier 1 #3) and any catalogue generation (Tier 2) must be mirrored across both runtimes via the existing `sync-runtimes` machinery, not done one-sided. Note one runtime-specific mechanism: Copilot can scope reference docs with `applyTo` globs (Tier 1 #2), which Claude Code lacks — so the *delivery mechanism* differs per runtime even though the *essentials* stay identical.

### Finding 6 — Skills and agents already use the right (lazy) loading model

Claude Code skills load only when invoked; agents load only when spawned. That is exactly the on-demand pattern we want. The anomaly is that **`CLAUDE.md`'s import chain does the opposite** — it eagerly front-loads the heaviest reference docs. The fix is to make the always-on context behave like skills: thin pointers, pull the slice on demand.

### Finding 7 — Existing tooling is a ready-made foundation for a generator

The repo already has a script-based generation pattern: `scripts/generate-tokens.ts` builds `tokens.json` from theme source. The same approach (a Node/ts-morph script wired into an npm script + CI drift check, exactly like `sync-runtimes`) can generate a code map and/or a catalogue with zero new infrastructure or external services.

---

## Opportunities, ranked by leverage

### Tier 1 — Cut the fixed per-session tax (biggest, unconditional)

1. **Slim *both* entry points — `CLAUDE.md` AND `.github/copilot-instructions.md` — to thin routers.** Copilot is the primary tool, so it is a co-equal target here, not an afterthought. Replace the heavy `@import`s with short pointers ("read `docs/guidelines/components.md` before building UI; read the a11y reference before an a11y review"). Keep a compact always-on core only. Useful starting point: `copilot-instructions.md` *already* carries a distilled "Non-negotiable rules" essentials block (lines 11–62) — that block is close to the right always-on core for both runtimes; the move is to keep that style and stop importing the large reference docs eagerly. *Estimated saving: ~20–25k tokens per session, on both runtimes.*
2. **Use Copilot's `applyTo` glob to scope the a11y reference (Copilot-only lever, no parity cost).** `.github/instructions/a11y.instructions.md` is currently `applyTo: '**'`, so the full 625-line catalogue loads for *every* file — including scripts, config, server actions, and tests where it is irrelevant. Narrow the glob to UI surfaces (e.g. `src/components/**`, `src/app/**`, `**/*.tsx`) so it only applies when editing components/pages. Claude Code has no native glob mechanism, so its equivalent is to stop importing the full a11y doc into `CLAUDE.md` and have the Flanders/a11y agents and `/conformanceReport` skill pull it on demand. Net effect: the *essentials* stay in parity across runtimes; the *bulk reference* loads only when relevant on each.
3. **Split each large guideline into "essentials" (tiny, always-on) + "reference" (bulk, on-demand).**
   - *Typography:* the banned-variant list + "always use a variant / never hardcode" rule is essential and cheap; the full scale tables are reference.
   - *A11y:* keep the Five Rules of ARIA + severity legend always-on; the 38 anti-patterns become an on-demand doc/skill the Flanders/a11y agents read.
   - *Components:* keep a one-line "always check the catalogue first" rule always-on; the 447-line catalogue loads on demand (and ideally becomes generated — see Tier 2).
4. **Reduce `AGENTS.md`'s always-on footprint** to the routing/pipeline/adapter/charter tables; the personality and relationship narrative already live in the per-agent files and can be referenced, not inlined. (Runtime-neutral — benefits both runtimes since both import it.)

**Decided with Adam — what the always-on core contains (balanced trim).** The ~25k-token win comes from moving the four large reference docs (a11y, AGENTS narrative, the catalogue, typography tables) to on-demand *regardless*; the remaining core is small either way (~50–120 lines), so trimming it harder only saves a marginal ~1–2k tokens. The objective for the core is therefore **bug-prevention per token, not minimum tokens.** Keep always-on:
- the hard styling rules (MUI tokens only, `rem` sizing, unitless line-heights, banned Typography variants, no inline `style`);
- the entry-point/routing pointer ("start with Smithers");
- "check existing components first" + a **bare component-name list** (cheapest way to stop the AI reaching for raw MUI because it didn't know a Foundation component exists);
- the handful of **high-frequency gotchas that bite often** — stepped-form error placement, Next.js async `params`/`searchParams`.

Everything bulkier (full a11y catalogue, full typography scale tables, full component catalogue/judgment doc, agent personalities, Member Online nav rules) becomes an **on-demand pointer** ("read X before doing Y").

### Tier 2 — Cut navigation cost (the graphify-equivalent, additive)

4. **Generate a machine-readable code map.** A small generator (ts-morph or the TS compiler API, mirroring `generate-tokens.ts`) emits a compact `codemap.json` / `CODEMAP.md`: component → path → status → composes → key exports → where-used. Auto-generated ⇒ no drift; loaded on demand by agents during discovery. This is the TS-native, no-external-LLM answer to graphify.

   **Required — dual output: same graph, two projections.** The generator builds the graph model *once* and serialises it to two targets, both regenerated together by the same freshness machinery (pre-commit hook + CI check):
   - **`codemap.json`** — for the **AI**: compact, queryable, cheap to load on demand.
   - **An Obsidian vault (`docs/codemap/*.md`)** — for **humans**: one markdown note per component, linked by `[[wikilinks]]` that encode composition/usage, with YAML frontmatter (`status`, `path`, `composes`). Opened in Obsidian this gives a live **graph view** of the component network, **backlinks** ("what uses this"), blast-radius navigation from leaf components like `Icon`, and — via the Dataview plugin — frontmatter-driven tables (e.g. "all draft components"). The repo's own memory system already uses the `[[wikilink]]` convention, so this is consistent with existing practice.

   Example generated `docs/codemap/Card.md`:
   ```markdown
   ---
   status: draft
   path: src/components/Card/
   ---
   # Card
   **Composes:** [[Button]] · [[Icon]]
   **Used by:** [[InvestmentOverview]]
   ```

   These notes are **generated artifacts — never hand-edited** (any human prose lives in separate notes). The same "don't hand-edit; regenerate" contract and pre-commit re-staging apply to the vault as to the JSON.

   **Scope note (so it isn't mis-sold):** the Obsidian vault is a **human-ergonomics** deliverable (onboarding, visual dependency exploration, spotting over-coupled components), *not* a token-efficiency one — the AI still uses `codemap.json`. It rides on the same generator at near-zero extra cost (one more serialisation target), but it does not contribute to the always-on token saving. It is required output, not part of the saving math.
5. **Retire the catalogue; the graph owns inventory. Keep a slim judgment-only guidance doc.** *(Decided with Adam.)* The 447-line `docs/guidelines/components.md` does two jobs: **inventory** (what exists, path, status, composition, props) and **judgment** (when to use A vs B). The generated code map (#4) replaces the *inventory* job entirely — always accurate, updates on commit — so that bulk goes away. What survives is only the **non-derivable judgment** the code never expresses: e.g. "use `Dialog` over `Modal` for a confirm pattern", `Select` vs `InputSelectContainer` (standalone field vs inline adornment), "never create a new component without Moe's sign-off", "`small`/`caption` — use sparingly". That collapses ~447 lines to roughly **40–80 lines** of hand-authored selection guidance, loaded **on demand** before UI work — not always-on. Net: removes the drift risk *and* the manual "Moe must update the catalogue" gate (Moe now owns only the small judgment doc), while the graph keeps the facts honest automatically.
6. **(Parked — not being pursued for now) an MCP code-navigation server.** A lightweight local MCP server, built *on top of* the Phase 2 `codemap.json`, could expose code navigation as on-demand tools (`find_component`, `who_uses`, `composition`, `list_components`) instead of grep/read round-trips. It is the same data as the static map, delivered as live queries rather than a loaded file.

   **Decision (with Adam): not now.** Reasons it stays parked: Claude Code's Glob/Grep/Explore already navigate well; the Phase 2 static map likely closes most of the gap on its own; and a server is a running process to operate and keep in parity across *both* runtimes. Revisit only if measurement after Phase 2 shows a real bottleneck — see the decision rule below.

   **When to revisit (decision rule for the future):**
   - *Token economics.* A static map in context costs tokens equal to its size, every turn it is loaded; an MCP tool result costs tokens only for the specific answer. So if `codemap.json` stays small, the file wins and no server is warranted. The tipping point is when the map grows large enough (where-used graphs, prop details, feature flows) that loading the whole thing to answer one question becomes expensive.
   - *Round-trips.* If a representative "build/modify component X" task still spends ~5+ discovery calls just locating things and their relationships after Phases 1–2, that is the signal. If the map collapses that to a single read, stay on the file.
   - *Build note for then:* thin custom server on the official MCP TypeScript SDK over the existing `codemap.json` — not a generic code-MCP (`serena` etc.), which does not understand Foundation concepts (status, composition, story links).

#### Tier 2 build approach — custom, and how it stays fresh

**Custom, deliberately thin — not off-the-shelf.** Off-the-shelf packers (`repomix`, `code2prompt`) and repo-map tools (aider's tree-sitter map, LSP MCP servers like `serena`) optimise for *completeness* — they dump everything, which is the opposite of the goal (a *compact* map that's cheap to load). They also don't understand Foundation concepts (status, composition, story links). So build a small script in the existing `generate-tokens.ts` / `sync-runtimes.mjs` mould. It is **mostly derivation from sources that already exist**, with one small AST pass:

| Field | Source (derive, don't author) |
|---|---|
| Status (stable/review/draft) | `src/stories/index.mdx` `COMPONENTS` array — *read* it; status is a human judgment Willie owns, never re-inferred |
| Inventory + paths | glob `src/components/*/` |
| Exports | `src/index.ts` barrel |
| Composition graph (`Card` composes `Button`) | light **ts-morph** pass over each component's Foundation imports — the one bit needing AST, and the bit `components.md` currently hand-maintains and gets wrong |

> **Note — node model refined during planning.** The table above is the *conceptual* shape. The final, decided node model is more precise: **code-derived nodes + a status overlay + two edge types (`composes` and `partOf`)**, with a deliberate name→path resolver (because `COMPONENTS` carries no paths and ~13 entries are nested sub-components, e.g. `SideNav` under `MemberOnline/`). Build to the implementation plan's **§2C / §2C-i**, not this simplified table.

**Trade-off:** it is code to maintain, but it *replaces* the hand-edited catalogue + composition map, so it is net *less* work — and it cannot silently lie the way the hand doc can.

**Freshness — the human does nothing.** The map is a generated artifact; source of truth is the code. Three layers keep the committed copy honest, mirroring patterns the repo already trusts:

1. **Local auto-regen (the real guarantee).** A **pre-commit hook** regenerates and stages the map, so it updates as a side effect of normal commits; optionally also wire it into a frequent script (`predev` / `prestorybook`, or alongside the existing `sync-font-awesome-icons` build step) so running the app refreshes it. This is the primary mechanism *because CI here is advisory, not blocking* (per the project's branch-protection choice — see [[feedback-no-branch-protection]]).

   **Does a normal `git add . && git commit -m '…'` trigger it? Yes — given two implementation details that must be built correctly:**
   - **The hook must re-stage the file it regenerates.** A pre-commit hook runs *after* staging. The sequence is: `git add .` stages your changes → `git commit` fires the hook → the hook regenerates `codemap.json` → **the hook must then run `git add codemap.json` itself** → the commit is created with the fresh map. If the hook regenerates but does *not* re-stage, the fresh map is left as an unstaged working-tree change and is **excluded from that commit** (you end up one commit behind, every time). Re-staging inside the hook is what makes "the human does nothing" actually true.
   - **The hook must be installed automatically.** Git hooks live in `.git/hooks/`, which is **local and not shared on clone** — a hand-written hook will silently not run on anyone else's machine (or a fresh clone). Install it via [Husky](https://typicode.github.io/husky/) + a `prepare` script so it self-installs on `npm install`. Without this, the auto-regen simply never fires.

   **What still bypasses it:** `git commit --no-verify` (skips all hooks) and any contributor/clone where the hook isn't installed. Those cases are exactly why layer 2 (CI drift check) exists as the backstop.
2. **CI drift check.** A `--check` mode that regenerates in CI and fails the PR if the committed map differs — identical to `sync-runtimes.mjs --check` / `sync-runtimes.yml`. Advisory backstop.
3. **Integrity check (bonus).** Because the generator reads the hand-maintained status array, it flags mismatches — a component folder with no `COMPONENTS` entry, or vice versa. Invisible drift becomes a loud error, *strengthening* the existing Willie/Moe gates rather than bypassing them.

**Design rule that makes this painless:** the generator owns *mechanical facts only* (path, status, exports, composition). Any human guidance ("when to use this component") stays in a separate hand-authored file. Mixing generated and hand content in one file is exactly what makes drift miserable — keep them apart.

**Net for Adam:** nothing to do. Change code as normal; the hook keeps the map current; the only human-owned input (component status) is an existing Willie judgment, not new work. The AGENTS.md "Moe must manually update `components.md`" responsibility becomes "the generator owns the catalogue facts" — a manual gate removed, mirrored across both runtimes via `sync-runtimes`.

### Tier 3 — Structural / maintenance

7. ~~Resolve the dual-runtime question.~~ **Resolved: Copilot is actively used — the `.github/` ↔ `.claude/` mirror and its `sync-runtimes` machinery stay.** No consolidation. Treat "keep both runtimes in parity" as a hard constraint on all Tier 1/Tier 2 work.
8. **Add small per-area "context anchor" files** (a ~20-line `README`/`AGENTS.md` in `src/features/` and `src/components/`) so agents read a cheap local guide instead of re-deriving patterns or loading global docs.

---

## On the graphify question specifically

The *concept* — a generated index that lets the AI navigate without brute-force exploration — is sound and worth adopting in a TS-native form (Tier 2, #4). But graphify itself is the wrong fit (Python, external-LLM calls), and more importantly it solves the **secondary** cost here. The honest conclusion: **build a small generated code map, but only after cutting the fixed per-session tax, which is the larger and more certain win.**

---

## Decisions (resolved with Adam)

*All four open questions from the original research have been settled in conversation. They are recorded here as decisions for the implementation-planning pass — no further input needed.*

1. ~~Is the GitHub Copilot runtime still actively used?~~ **Answered: yes, very actively.** The dual-runtime mirror stays; "keep both runtimes in parity" is a hard constraint on all the work below (Finding 5 / Tier 3 #7).
2. ~~Appetite for generated vs. hand-maintained docs?~~ **Answered: the generated graph owns inventory; `components.md` is retired and replaced by a slim (~40–80 line) judgment-only guidance doc, loaded on demand** (Tier 2 #5).
3. ~~How aggressively to slim the always-on context?~~ **Answered: balanced trim** — keep a small core (hard styling rules + routing + check-first/name-list + high-frequency gotchas); move the four large reference docs on-demand. Core size is low-stakes (~1–2k tokens); optimise it for bug-prevention, not minimum tokens (Tier 1).
4. ~~Measurement baseline?~~ **Answered: build a tiny counter script with an auto-warning.** A small `scripts/context-budget.mjs` sums the always-on context per runtime as a token estimate — run before and after Phase 1 to prove the saving, re-runnable anytime — **plus an advisory CI guard** that warns if the always-on budget creeps back above an agreed threshold, so the bloat can't silently return. Advisory only, matching the repo's CI stance (see [[feedback-no-branch-protection]]).

---

## Suggested shape of the follow-up plan (not prescriptive)

- **Phase 1:** Restructure **both** entry points — `CLAUDE.md` *and* `.github/copilot-instructions.md` (Copilot is the primary tool) — plus narrow the `applyTo` glob on `.github/instructions/a11y.instructions.md`, and split the guidelines into essentials/reference (Tier 1 #1–4). Establish the token baseline first (measure both runtimes). Highest ROI, lowest risk. Keep the two runtimes in parity via `sync-runtimes`.
- **Phase 2:** Build the generated code map (the graph), wired like `generate-tokens`/`sync-runtimes` with a CI drift check (Tier 2 #4). Custom + thin (derive from existing sources + one ts-morph pass); kept fresh by a pre-commit hook so there's no manual upkeep — see "Tier 2 build approach — custom, and how it stays fresh". **Required dual output:** `codemap.json` for the AI *and* an Obsidian vault (`docs/codemap/*.md`, wikilinked) for humans — same graph, two projections, regenerated together. The graph **replaces** the `components.md` inventory; retire that catalogue down to a slim (~40–80 line) judgment-only guidance doc loaded on demand (Tier 2 #5).
- **Phase 3 — parked.** An MCP navigation server (Tier 2 #6) is explicitly **not** being pursued for now. It remains documented as a future option with a clear decision rule (revisit only if post-Phase-2 measurement shows discovery is still a real bottleneck). *(Runtime consolidation is also out of scope — Copilot is actively used; both runtimes stay.)*

---

## Verification / how to prove the wins

- **Baseline:** `scripts/context-budget.mjs` counts the always-on context for **both** runtimes today — the `CLAUDE.md` import chain (~128k chars) *and* the Copilot equivalent (`copilot-instructions.md` imports + every `.github/instructions/*` file whose `applyTo` matches a typical UI file) — as a token estimate per runtime. This is the "before" number.
- **After Tier 1:** re-run `context-budget.mjs`; target a >60% reduction in always-on context. The advisory CI guard then keeps it from creeping back above the agreed threshold.
- **After Tier 2:** measure discovery round-trips (Grep/Glob/Read calls) on a sample of representative tasks before vs. after the code map exists.
- **Drift safety:** the generator + CI `--check` (same pattern as `sync-runtimes.yml`) proves the graph never silently diverges from source; its integrity check also flags any component folder missing a status entry (or vice versa).
