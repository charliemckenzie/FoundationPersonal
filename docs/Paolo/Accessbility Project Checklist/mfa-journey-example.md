# MFA Journey Example (Project-Agnostic)

This example shows how to use the journey-based accessibility checklist for an MFA setup flow.

Use with:
- [accessibility-release-checklist.md](./accessibility-release-checklist.md)
- [journey-accessibility-release-workflow.md](./journey-accessibility-release-workflow.md)

## 1. Journey definition

- Journey name: Set up multi-factor authentication (MFA)
- Business outcome: Increase account security and reduce account takeover risk
- Primary users: Existing account holders
- Secondary users: Support staff assisting MFA enrollment issues

## 2. In-scope journey steps

1. User opens Security settings
2. User selects Set up MFA
3. User chooses factor type (authenticator app or SMS)
4. User completes enrollment (scan QR or receive code)
5. User enters verification code
6. User receives success confirmation
7. User can manage backup options

## 3. Critical edge cases

- Invalid code entry
- Expired code entry
- Resend code limit reached
- Device time mismatch (authenticator drift)
- User cancels and resumes later
- Locked account after repeated failures
- Fallback to support/contact flow

## 4. Accessibility acceptance criteria (example)

- Users can complete MFA enrollment using keyboard only
- Focus order is logical on every step and modal
- Focus is visible and not obscured after every action
- Error messages are announced and clearly explain recovery
- Time-related prompts include accessible warnings and options
- Contrast passes for all input, helper text, and actionable controls
- Zoom/reflow supports completion at common accessibility zoom levels

## 5. Roles and sign-off

- Technical Lead: signs technical readiness and remediation completion
- BA: signs final release readiness and risk acceptance
- Designer: validates interaction and content behavior
- SME: validates policy and security constraints
- Accessibility reviewer: validates WCAG-aligned behavior

## 6. Example test evidence checklist

- [ ] Keyboard-only walkthrough recording attached
- [ ] Screen-reader spot check notes attached
- [ ] Error/recovery path evidence attached
- [ ] Contrast check snapshots attached
- [ ] Deferred issues table updated (if any)

## 7. Deferred issue governance example

| Issue | Journey step | User impact | Reason deferred | Owner | Target milestone |
|---|---|---|---|---|---|
| Countdown timer not announced consistently in one browser | Verify code | May confuse some screen-reader users | Third-party timer dependency update pending | Frontend lead | Sprint 14 |

## 8. Jira/Confluence-ready report example

## Journey Accessibility and Readiness Report
**Generated:** 2026-06-05 | **Release:** Member Online Security Update | **Journey:** MFA Setup

### Readiness Summary
| Check | Result |
|---|---|
| Journey scope defined | ✅ |
| Acceptance criteria defined | ✅ |
| Keyboard completion | ✅ |
| Focus behavior | ⚠️ Partial |
| Error handling and recovery | ✅ |
| WCAG checks completed | ✅ |
| Deferred issues documented | ✅ |
| Sign-off complete (Tech Lead + BA) | ✅ |

### Verdict
PASS WITH DEFERRED ITEM

### Notes for technical team
- Fix timer announcement behavior in targeted browser in Sprint 14.
- Re-run screen-reader verification after dependency upgrade.

### Notes for BA and stakeholders
- MFA setup is releasable for the current milestone.
- One low-to-medium accessibility issue is accepted with a dated backlog commitment.
