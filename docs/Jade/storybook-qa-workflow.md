# Journey QA Workflow — Research & Recommendation

**Author**: Jade | **Researched**: June 2026 | **Status**: Refined for journey-based delivery

---

## Context

This document captures the evolved workflow direction after refinement discussions.

The workflow is now journey-first and project-agnostic. Storybook is optional supporting evidence, not the primary QA object.

**The brief:** Design a workflow that allows Developers, BAs, Designers, and SMEs to validate end-to-end user journeys and produce release-ready reports for Jira or Confluence.

---

## What the workflow needs to do

1. Define accessibility and quality acceptance criteria at journey level
2. Validate full user journeys (success, failure, recovery, and support paths)
3. Produce a human-readable release report suitable for Jira/Confluence
4. Support dual sign-off from Technical Lead and BA, with SME input where required

**Audiences:** Developers, Technical Leads, BAs, Designers, and SMEs.

**Output format:** Structured markdown, suitable for pasting directly into a Jira ticket or Confluence page.

**Starting point:** Greenfield — no existing QA or coverage-checking process.

---

## Core model

### Lifecycle checkpoints

1. Discovery and requirements
- BA and SME define journey outcomes, constraints, and acceptance criteria.

2. Design
- Designer defines the journey states and interaction model.
- Existing components are reused where possible; new or bespoke patterns are introduced only when needed.

3. Build
- Developer implements the journey and performs progressive accessibility checks while building.

4. Validation
- BA validates journey outcomes and business rules.
- Accessibility review validates WCAG-aligned behavior on the real journey.
- SME validates domain correctness where needed.

5. Release governance
- Technical Lead signs technical readiness.
- BA signs final release decision.
- Deferred issues are documented and backlogged with owners and milestones.

---

## Agent recommendations

1. Designer
- Owns journey state design and accessibility intent at handoff.

2. Developer/Technical Lead
- Own implementation quality and technical sign-off.

3. BA
- Owns release readiness decision for business outcomes.

4. SME
- Confirms policy/domain constraints are met.

5. Accessibility reviewer (for example Flanders)
- Runs WCAG 2.2 AA-aligned journey checks and remediation guidance.

6. Optional QA reporting agent
- A reporting-focused agent can still be used to generate Jira/Confluence reports, but must evaluate journeys first and components second.

## Suggested output format

Use one report format for all projects:

```markdown
## Journey Accessibility and Readiness Report
**Generated:** [date] | **Release:** [name] | **Journey:** [name]

### Readiness Summary
| Check | Result |
|---|---|
| Journey scope defined | ✅ / ❌ |
| Acceptance criteria defined | ✅ / ❌ |
| Keyboard completion | ✅ / ⚠️ Partial / ❌ |
| Focus behavior | ✅ / ⚠️ Partial / ❌ |
| Error handling and recovery | ✅ / ⚠️ Partial / ❌ |
| WCAG checks completed | ✅ / ❌ |
| Deferred issues documented | ✅ / ❌ / N/A |
| Sign-off complete (Tech Lead + BA) | ✅ / ❌ |

### Verdict
[PASS / NEEDS WORK / INCOMPLETE]

### Notes for technical team
[specific gaps, recommendations]

[plain English: what's ready, what's not, and release risk]
```

---

## Primary guide to use

Use this workflow with the release checklist at:
- `docs/workflows/accessibility-release-checklist.md`

## Compliance note (AU context)

- Standard spelling is WCAG, not WVAG.
- Target WCAG 2.2 AA unless contract or regulation says otherwise.
- Maintain evidence so it can be reused for formal procurement reporting (for example an ACR/VPAT-format output when requested).

## Suggested next step

Create a dedicated journey QA guide in `docs/workflows/` that pairs this recommendation with concrete examples (for example MFA setup, password reset, onboarding, and high-risk account changes).
