# Storybook QA Workflow — Research & Recommendation

**Author**: Jade | **Researched**: June 2026 | **Status**: Planning — awaiting one decision before execution

---

## Context

This document captures Jade's research session with Sideshow Bob. It is ready for Paolo to pick up and continue directly in VS Code Copilot Chat using Sideshow Bob mode.

**The brief:** Design a workflow that allows Developers and Business Analysts to QA and validate Storybook/Foundation component work — producing a report that can be dropped directly into a Jira ticket or Confluence page. There is no existing system; this is greenfield.

---

## What the workflow needs to do

1. Check whether a Storybook story exists for a given component
2. Review whether a story covers the required variants, states, and edge cases
3. Generate a human-readable report summarising component coverage
4. Guide a BA or developer through using Storybook to validate a component (checklist walkthrough)

**Audiences:** Both Developers and BAs equally — they have different needs but should receive the same output format.

**Output format:** Structured markdown, suitable for pasting directly into a Jira ticket or Confluence page.

**Starting point:** Greenfield — no existing QA or coverage-checking process.

---

## Research findings

### What already exists in the codebase

**Component status table** — `src/stories/index.mdx`
- 63+ components tracked with statuses: `stable`, `review`, `draft`
- Each component has a direct Storybook story link
- Current breakdown at time of research: ~8 stable, ~7 in review, ~48 draft
- This is the closest thing to a coverage registry the team currently has

**Story file locations**
- `src/stories/components/` — core UI components
- `src/stories/member-online/` — member portal components
- `src/stories/design-tokens/` — colour, typography, spacing, shadows
- `src/stories/foundation/` — system-level stories
- `src/stories/utilities/` — utility component stories

**Existing story conventions** (observed across the codebase)
- Every story file has a `Default` export (playground with controls)
- Well-covered components have named exports for: `Variants`, `Sizes`, `Disabled`, `ErrorState` / `ErrorStates`, `AllStates`
- Stories include `docs.description` blocks with usage guidance
- The a11y addon is already configured in Storybook

**Willie's sign-off checklist** (existing internal team gate — `docs/agents/willie.md`)
Willie already runs a checklist for internal component promotion. The proposed QA workflow is the *external-facing* equivalent — for developers and BAs consuming Foundation, not building it.

**Workflow documentation** — `docs/workflows/`
Currently only contains a Figma design tokens guide. This is where the new BA/developer workflow guide should live.

---

## Recommendation: Two-layer approach

A single agent is *almost* the right answer — but not sufficient alone. Developers have Copilot Chat in VS Code. BAs likely do not. A VS Code-only solution helps one audience and leaves the other without support.

---

### Layer 1 — New Copilot agent: Kent Brockman

**"And I, for one, welcome our comprehensive component coverage report."**

**Character:** Kent Brockman — TV news anchor. His entire job is to assess a situation, synthesise information from multiple sources, and deliver a clear structured report to a mixed audience. He speaks to both developers and BAs naturally. Calm, professional, occasionally a little self-important.

**What he does:**
A developer opens Copilot Chat, switches to Kent Brockman mode, and says *"Review the Button component."* Kent:
1. Reads `src/stories/index.mdx` to check the component's current status
2. Reads the component's `.stories.tsx` file
3. Checks coverage against the required story checklist (see open question below)
4. Produces a Jira/Confluence-ready markdown report

**Example invocation:**
> "Kent, review the Card component."
> "Kent, give me a coverage report for all form components."
> "Kent, what's the current component status summary?"

**Files to create:**
- `.github/agents/kent-brockman.agent.md` — the agent instruction file (matches the format of `milhouse.agent.md` and `sideshow-bob.agent.md`)
- `docs/agents/kent-brockman.md` — the human-readable agent doc (matches the format of `docs/agents/willie.md` etc.)

---

### Layer 2 — Script: `scripts/check-stories.mjs`

**What it does:**
An automated Node.js script that BAs (and developers who want a quick batch overview) can run without Copilot. It:
- Scans all `.stories.tsx` files in `src/stories/`
- Cross-references the component status table in `src/stories/index.mdx`
- Checks for required named story exports (once the minimum coverage standard is defined)
- Writes a markdown coverage report to `docs/coverage-report.md`

**Run command:** `npm run check-coverage` (added to `package.json`)

**No VS Code required. No Copilot required.** Run it, get the file, paste it into Confluence.

---

### The shared output format

Both Kent Brockman (agent) and the script produce output in the same format:

```markdown
## Foundation Component Coverage Report
**Generated:** [date] | **Component:** [name] | **Status:** stable / review / draft

### Coverage Summary
| Check | Result |
|---|---|
| Story file exists | ✅ / ❌ |
| Default story | ✅ / ❌ |
| Variants covered | ✅ / ⚠️ Partial / ❌ Missing |
| Disabled state | ✅ / ❌ |
| Error state | ✅ / ❌ / N/A |
| Responsive / size variants | ✅ / ❌ / N/A |
| Usage guidance in docs | ✅ / ❌ |
| a11y addon active | ✅ / ❌ |

### Verdict
[PASS / NEEDS WORK / INCOMPLETE]

### Notes for developers
[specific gaps, recommendations]

### Notes for BAs
[plain English: what's ready, what's not, what to look for in Storybook]
```

---

### Layer 3 — Workflow guide: `docs/workflows/storybook-qa-guide.md`

A human-readable guide for BAs and developers who want to understand the process without using the agent or the script. Covers:
- How to navigate Storybook
- What each component status means (stable / review / draft)
- How to use the Docs tab and the a11y panel
- How to run the script and read the report
- How to invoke Kent Brockman in Copilot Chat

---

## Open question — must be answered before execution

**What is "minimum viable coverage" for a Storybook story?**

The script and Kent Brockman both need a defined standard to check against. The following is a *proposed* baseline — Paolo should confirm, adjust, or replace this with the team's actual standard:

| Story export | Required for all components? | Notes |
|---|---|---|
| `Default` | Yes | Interactive playground with controls |
| `Variants` | Yes, if component has a `variant` prop | |
| `Sizes` | Yes, if component has a `size` prop | |
| `Disabled` | Yes, if component accepts a `disabled` prop | |
| `ErrorState` | Yes, for all form components | |
| `AllStates` | Recommended | Shows all states at once for quick scanning |
| Usage guidance in `docs.description` | Yes | At least one sentence per story |

**To proceed:** Confirm this list with the designer or the team. Willie and Lisa likely have opinions — this is adjacent to their domain.

---

## What Paolo needs to do to continue this conversation

1. Open VS Code Copilot Chat
2. Switch to **Sideshow Bob** mode in the agent picker
3. Say: *"I'm picking up from Jade's planning doc at docs/Jade/storybook-qa-workflow.md. The open question is the minimum viable coverage standard. Here's my answer: [your answer]. Please proceed with the execution plan."*

Sideshow Bob will then produce a full execution document with numbered steps, file paths, and conflict risk table — ready to hand to the team.

---

## Agents to involve when executing

| Step | Agent | What they do |
|---|---|---|
| Character + voice sign-off | Smithers / Designer | Approves Kent Brockman as a new team agent |
| Agent file creation | Sideshow Bob → executor | Creates `.github/agents/kent-brockman.agent.md` and `docs/agents/kent-brockman.md` |
| Script creation | Carl | Writes `scripts/check-stories.mjs` |
| Script review | Chalmers | Code quality pass |
| Workflow guide | Lisa | Writes `docs/workflows/storybook-qa-guide.md` |
| AGENTS.md update | Smithers | Adds Kent Brockman to the team roster |
| Package.json update | Frink | Adds `check-coverage` script entry |

---

## Files this plan will touch

| File | What changes | Risk |
|---|---|---|
| `AGENTS.md` | New agent section added — Kent Brockman | Medium — actively edited |
| `docs/agents/README.md` | New row in the agents table | Low |
| `.github/agents/kent-brockman.agent.md` | New file — created | Low |
| `docs/agents/kent-brockman.md` | New file — created | Low |
| `scripts/check-stories.mjs` | New file — created | Low |
| `package.json` | New script entry added | Medium — actively edited |
| `docs/workflows/storybook-qa-guide.md` | New file — created | Low |

---

*"The document is complete. Do try not to lose it."*
