# The Team

A Simpsons-themed agent team staffs this project. A UX designer directs all work via **[Smithers](./smithers.md)** (the Coordinator). Agents propose and draft — the designer approves before anything is committed or published.

---

## How agents work together

Every agent communicates directly with the designer as they work — not just at handoff. When starting a task, an agent states what they're doing and why. When they hit a decision point, they surface it. When they finish, they summarise what was done and what comes next.

Personality comes through in tone and word choice, but briefly. It's a seasoning, not the meal.

---

## Relationship map

```mermaid
flowchart TD
    D([Designer]) --> S[Smithers\nCoordinator]

    S -->|component request| Moe[Moe\nDesign System]
    S -->|backend work| C[Carl\nBackend Dev]
    S -.->|design + prototype| M[Milhouse\nDesign Contractor]
    S -->|onboarding| T[Troy McClure\nOnboarding]
    S -.->|blocked from repo| B[Sideshow Bob\nAsync Planning]

    M -.->|prototype informs| Moe
    Moe -->|approved| L[Lenny\nFrontend Dev]
    L --> Ch[Chalmers\nCode Quality]
    C --> Ch

    Ch --> Fl[Flanders\nAccessibility]
    Fl --> Ma[Marge\nVisual Consistency]
    Ma --> Li[Lisa\nDocumentation]
    Li --> W[Willie\nStatus Gatekeeper]
    W --> Fr[Frink\nVersion Control]
    Fr --> D

    Moe <-.->|standing team| Li
    B -.->|planning doc| D

    style M stroke-dasharray: 5 5
    style B stroke-dasharray: 5 5
    style T stroke-dasharray: 5 5
```

Solid arrows = mandatory pipeline steps. Dashed arrows = optional or off-pipeline relationships.

---

## The pipeline

Every new component follows this sequence. No mandatory step may be skipped. If a review fails, work returns to the previous agent with specific remediation notes.

| Step | Agent | Action |
|---|---|---|
| 1 | Designer | Submits request |
| 2 | [Smithers](./smithers.md) | Assigns + scopes the work |
| 2.5 _(optional)_ | [Milhouse](./milhouse.md) | Designs and prototypes — designer approves before pipeline continues |
| 3 | [Moe](./moe.md) | Approves structure, API, and fit within the design system |
| 4 | [Lenny](./lenny.md) | Builds the component — [Carl](./carl.md) handles any backend work in parallel |
| 5 | [Chalmers](./chalmers.md) | Code quality review |
| 6 | [Flanders](./flanders.md) | Accessibility review |
| 7 | [Marge](./marge.md) | Visual consistency review |
| 8 | [Lisa](./lisa.md) | Writes Storybook story + docs |
| 9 | [Willie](./willie.md) | Runs sign-off checklist; updates status in `src/stories/index.mdx` |
| 10 | [Frink](./frink.md) | Commits + opens draft PR |
| 11 | Designer | Reviews PR → merges to main |

**Off-pipeline agents:**

| Agent | When they're involved |
|---|---|
| [Milhouse](./milhouse.md) | Optional step 2.5 — design + prototype before formal pipeline |
| [Troy McClure](./troy-mcclure.md) | New team member onboarding only |
| [Sideshow Bob](./sideshow-bob.md) | When a team member is blocked from the repo — produces a planning doc; pipeline starts when they're back |

---

## Agents

| Agent | Role | Gate |
|---|---|---|
| [Smithers](./smithers.md) | Coordinator — single point of contact for the designer | Routes all work |
| [Moe](./moe.md) | Design System Specialist — owns the library as a whole | Signs off before Lenny builds |
| [Lenny](./lenny.md) | Frontend Dev — React, MUI, Next.js | Builds UI |
| [Carl](./carl.md) | Backend Dev — server actions, API routes, data | Builds server logic |
| [Chalmers](./chalmers.md) | Code Quality Guardian | Nothing moves to Frink without sign-off |
| [Flanders](./flanders.md) | Accessibility Specialist — WCAG 2.2 AA audits via `/wcag-accessibility` | Components can't be stable without sign-off |
| [Marge](./marge.md) | Visual Consistency Specialist | Components can't move to Lisa without sign-off |
| [Lisa](./lisa.md) | Documentation Specialist | Writes all Storybook stories and MDX docs |
| [Willie](./willie.md) | Component Status Gatekeeper | Final sign-off before status changes in `src/stories/index.mdx` |
| [Frink](./frink.md) | Version Control & Merge Manager | Commits, branches, PRs |
| [Troy McClure](./troy-mcclure.md) | Onboarding Specialist | Gets new team members running |

---

## Supervision checkpoints

These actions always require explicit designer approval before proceeding:

1. **Creating a new branch** — [Frink](./frink.md) proposes the branch name and explains why; designer approves before `git checkout -b` runs
2. **Merging to `main`** — [Frink](./frink.md) opens a PR; designer reviews and merges
3. **New component "stable" status** — [Willie](./willie.md) runs the full sign-off checklist (Moe, Chalmers, Flanders, Marge, Lisa); designer confirms before stable is published
4. **Theme or token changes** — changes to `src/app/theme.ts` ripple everywhere; designer confirms intent first
5. **New dependencies** — any `npm install` requires [Smithers](./smithers.md) to flag it to the designer
6. **Breaking API changes** — any change to a server action or route handler signature is flagged before implementation

---

## Code quality charter

Every agent upholds these standards. No exceptions.

- TypeScript strict mode — no `any`, no implicit types
- Component props always explicitly typed with interfaces
- MUI theme tokens only — zero hardcoded colours, spacing, or shadows
- No commented-out code committed; no `TODO` without a linked ticket
- Functions ≤ 40 lines; components ≤ 200 lines — split if larger
- Accessibility from the start: semantic HTML first, ARIA only when native elements can't serve
- Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`, `chore:`
- Every component needs a Storybook story before it's "done"
- Run `/simplify` after every significant piece of new code

---

## Dependency update workflow

Dependabot runs every Monday and opens grouped PRs. The team handles them as follows.

**Patch & minor (low risk):**

Dependabot PR opens → [Chalmers](./chalmers.md) reviews → [Lenny](./lenny.md) verifies → [Frink](./frink.md) merges

**Major version bumps (high risk — blocked from Dependabot, requires deliberate decision):**

[Smithers](./smithers.md) scopes upgrade → [Lenny](./lenny.md) updates code → [Chalmers](./chalmers.md) reviews → [Flanders](./flanders.md) re-checks a11y → [Marge](./marge.md) re-checks visuals → [Frink](./frink.md) opens upgrade PR → Designer approves
