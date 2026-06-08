# Accessibility Release Checklist (Journey-Based)

Status: Draft
Audience: Business Analysts, Technical Leads, Developers, Designers, SMEs, Accessibility Reviewers
Scope: Major releases, new user journeys, product/application updates

Companion guides:
- [journey-accessibility-release-workflow.md](./journey-accessibility-release-workflow.md)
- [mfa-journey-example.md](./mfa-journey-example.md)
- [ba-vpat-guidance.md](./ba-vpat-guidance.md)

## Purpose

Use this checklist to decide whether a user journey is ready for release from an accessibility and business-readiness perspective.

This checklist is project-agnostic and can be used in any product team.

## When this checklist is required

Run this checklist for:
- Major feature releases
- New end-to-end user journeys
- Product/application-level updates

Do not require the full process for minor changes unless user interaction, content clarity, or accessibility behavior is affected.

## Decision model

1. Technical Lead signs off technical readiness and remediation status.
2. BA signs off business journey readiness and release risk.
3. BA is final release authority, informed by Technical Lead, Designer, SME, and accessibility review input.

## Required evidence before sign-off

- Journey scope and acceptance criteria
- Accessibility review summary (WCAG-aligned)
- Test evidence for critical paths (manual and/or automated)
- Defect list with severity and resolution status
- Deferred issue register (if any)

## Checklist

## A. Journey scope and stakeholders

- [ ] Journey name, purpose, and business outcome are documented
- [ ] User groups and assistive technology impact are identified
- [ ] Critical steps and edge cases are listed
- [ ] Stakeholders are identified (BA, Technical Lead, Designer, SME)

## B. Requirements and design readiness

- [ ] Accessibility acceptance criteria exist for each critical step
- [ ] Content, error states, and help text requirements are defined
- [ ] Keyboard and focus expectations are defined
- [ ] Non-functional constraints and compliance requirements are recorded

## C. Build and functional verification

- [ ] Keyboard-only completion works for critical tasks
- [ ] Focus order is logical and focus is always visible
- [ ] Semantic HTML is used before ARIA fallbacks
- [ ] Forms include labels, instructions, and clear error recovery
- [ ] Contrast checks pass for text and interactive UI
- [ ] Zoom/reflow/responsive behavior supports task completion

## D. Journey QA verification

- [ ] End-to-end journey tested in realistic scenarios
- [ ] Success, failure, timeout, and recovery paths are tested
- [ ] Alternate paths (for example retry/resend/help/contact support) are tested
- [ ] Evidence is captured in a shareable format for BA and release governance

## E. Review and remediation

- [ ] Accessibility findings are logged with severity and owner
- [ ] Must-fix issues are resolved before release
- [ ] Remaining issues have explicit rationale and approval
- [ ] SME confirms domain/business correctness where required

## F. Deferred issue governance

If an issue cannot be fixed in this release:

- [ ] Issue is documented with user impact and affected journey step
- [ ] Risk acceptance note is written and approved
- [ ] Backlog item exists with owner and due milestone
- [ ] Temporary mitigation or user guidance is documented
- [ ] Follow-up review date is assigned

## G. Final sign-off

Technical Lead sign-off:
- [ ] Approved
- Name:
- Date:

BA sign-off:
- [ ] Approved
- Name:
- Date:

Contributors:
- Designer:
- SME:
- Accessibility Reviewer:

Release decision:
- [ ] GO
- [ ] HOLD
- Notes:

## Accessibility release report template

Use this template for Jira, Confluence, or release notes.

### Accessibility Release Summary

- Release:
- Date:
- Journey:
- BA:
- Technical Lead:
- Designer:
- SME:

### Coverage and outcomes

- In-scope steps tested:
- Passed checks:
- Open issues:
- Deferred issues:

### Deferred issues table

| Issue | Journey step | User impact | Reason deferred | Owner | Target milestone |
|---|---|---|---|---|---|

### Recommendation

- Decision: GO / HOLD
- BA rationale:
- Technical rationale:
- SME note (if applicable):

## Notes

- Standards target should be WCAG 2.2 AA unless contract or policy specifies otherwise.
- Use plain language for BA/SME consumers and actionable language for technical teams.
- This checklist can be paired with an Accessibility Conformance Report process when required by procurement.
