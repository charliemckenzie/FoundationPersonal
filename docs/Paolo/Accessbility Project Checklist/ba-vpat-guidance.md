# BA Guide: Preparing a VPAT and ACR for Accessibility

Status: Draft
Audience: Business Analysts, Delivery Leads, SMEs
Scope: Major releases, new journeys, product-level updates

Related guides:
- [accessibility-release-checklist.md](./accessibility-release-checklist.md)
- [journey-accessibility-release-workflow.md](./journey-accessibility-release-workflow.md)
- [mfa-journey-example.md](./mfa-journey-example.md)

## What this guide is for

This guide helps a BA prepare a VPAT-style Accessibility Conformance Report (ACR) using evidence from project delivery.

Use this guide when procurement, governance, or customers ask for a formal accessibility statement.

## Quick clarification (important)

- VPAT is the reporting template format.
- ACR is the completed report produced from that template.
- Accessibility conformance is usually assessed against WCAG criteria (target WCAG 2.2 AA unless policy or contract says otherwise).

For Australia, keep this practical approach:
- Use WCAG 2.2 AA as the technical baseline.
- Confirm exact legal/procurement framing with your legal/compliance team.
- Reuse journey evidence so the ACR is evidence-backed, not opinion-only.

## BA responsibilities

- Coordinate contributors and gather evidence.
- Ensure each claim is traceable to test evidence.
- Record known gaps, impact, and remediation plan.
- Produce a clear ACR draft for approval.

## Who provides inputs

- Technical Lead: technical implementation details and limitations
- Accessibility reviewer: WCAG findings and severity
- Designer: interaction intent and content behavior
- SME: policy/domain constraints
- BA: final report assembly and stakeholder communication

## When to start

Start early, not at release day.

1. Planning
- Define report scope (which journeys and platforms are included).

2. Build and QA
- Collect evidence continuously as journeys are tested.

3. Pre-release
- Draft ACR from final evidence set.

4. Release decision
- Publish approved ACR with known limitations and backlog references.

## Evidence pack checklist

- [ ] Journey inventory in scope
- [ ] Accessibility acceptance criteria per journey
- [ ] Test evidence for keyboard, focus, forms, errors, contrast, reflow
- [ ] Accessibility findings with severity and owner
- [ ] Deferred issues table with business impact and due milestone
- [ ] Sign-off details (Technical Lead and BA)

## How to build the VPAT/ACR (step-by-step)

1. Set report scope
- List product/version/release.
- List in-scope journeys.
- List out-of-scope items explicitly.

2. Set evaluation methods
- Manual testing, assistive technology checks, automated checks.
- Include environments used (browser/device combinations).

3. Map evidence to criteria
- For each relevant WCAG criterion, add one of:
  - Supports
  - Partially Supports
  - Does Not Support
  - Not Applicable
- Add remarks with concrete evidence links or ticket references.

4. Handle known issues clearly
- Do not hide defects.
- Mark affected criteria as Partially Supports or Does Not Support.
- Link backlog items and target milestone.

5. Review and approve
- Review draft with Technical Lead and accessibility reviewer.
- BA finalizes stakeholder-ready version.

## Suggested BA quality rules

- Every conformance statement must link to evidence.
- Avoid generic phrases like "compliant" without qualification.
- Use plain language for risk and user impact.
- Keep unresolved issues visible, dated, and owned.

## ACR report structure (copy/paste)

## Accessibility Conformance Report (ACR)

### Product details
- Product:
- Release:
- Date:
- Prepared by:
- Scope:

### Evaluation methods
- Manual checks:
- Assistive technology checks:
- Automated checks:
- Platforms/environments:

### Conformance summary
- Target standard: WCAG 2.2 AA
- Overall statement:

### Criteria assessment
| Criterion | Conformance | Remarks and evidence |
|---|---|---|
| WCAG [x.x.x] | Supports / Partially Supports / Does Not Support / Not Applicable | [Evidence link or ticket] |

### Known limitations and exceptions
| Issue | Affected criterion | User impact | Mitigation | Backlog reference | Target milestone |
|---|---|---|---|---|---|

### Sign-off
- Technical Lead:
- BA:
- Accessibility reviewer:
- Date:

## Example: MFA journey (how to use this)

Use [mfa-journey-example.md](./mfa-journey-example.md) as your evidence source.

Map each tested MFA step to WCAG criteria and record:
- Pass/fail outcome
- User impact
- Any deferred remediation with milestone

## Common BA pitfalls to avoid

- Starting the report after release decision has already been made
- Making claims without attached evidence
- Omitting out-of-scope definitions
- Treating deferred issues as closed issues
- Mixing business approval with technical conformance claims

## Final note

This guide supports delivery governance and procurement readiness.
For legal interpretation of Australian obligations, confirm with legal/compliance before external publication.
