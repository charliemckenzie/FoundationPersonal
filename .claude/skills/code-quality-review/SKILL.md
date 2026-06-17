---
name: code-quality-review
description: 'Run a Foundation code quality review. Checks TypeScript strictness, MUI token-only styling, Foundation typography scale compliance, component size limits, and security basics. Use when: reviewing a component before sign-off, catching charter violations, running Chalmers checklist, quality gate before Flanders.'
argument-hint: 'File path(s) to review, or describe what was changed'
---

# Foundation Code Quality Review

Run this checklist against any component or feature before it moves to the accessibility review stage. Every item is mandatory — partial reviews are not sign-offs.

---

## TypeScript

- [ ] Strict mode — no `any`, no implicit types
- [ ] All component props explicitly typed with interfaces
- [ ] Props interfaces exported alongside the component
- [ ] Server action inputs and return types explicitly typed

---

## Styling — token violations are bugs

- [ ] No hardcoded colours — search for `#`, `rgb(`, `rgba(`, named CSS colours in `sx` props
- [ ] No hardcoded `px` spacing — use `theme.spacing()` multiples or explicit `rem`
- [ ] No `style={{}}` inline props — must use `sx`
- [ ] No `theme.palette.X.X` object notation inside `sx` — use string shorthand `'primary.main'` or `(t) =>` callback for conditional logic

---

## Typography — the scale is fixed, violations are bugs

Valid variants (only these exist in this system):
`display-1` `display-2` `display-3` `display-4` `display-5` `h1` `h2` `h3` `h4` `h5` `h6` `lead` `body` `small` `caption`

- [ ] No `fontSize:` with `px` values, raw numbers, or non-scale `rem` values
- [ ] No disabled MUI variants: `body1`, `body2`, `subtitle1`, `subtitle2`, `button`, `overline`
- [ ] All `<Typography>` components have an explicit `variant` prop (omitting it defaults to `body1` which is disabled)
- [ ] Line heights are unitless — `1.5` not `'24px'`
- [ ] When inheriting a full variant spec in an `sx` prop, use `typography: 'body'` not bare `fontSize:`

---

## Component size

- [ ] Functions ≤ 40 lines — if over, extract helpers
- [ ] Components ≤ 200 lines — if over, extract variant style objects and size maps to module-level constants

---

## Security

- [ ] No sensitive data (passwords, tokens, PII) logged to console or exposed in responses
- [ ] All user-provided input validated at system boundaries — never trust external data
- [ ] No `dangerouslySetInnerHTML` without sanitisation
- [ ] No internal error details exposed to the client

---

## General

- [ ] No commented-out code committed
- [ ] No `TODO` comments without a linked ticket
- [ ] No abstractions or helpers built for one-time operations
- [ ] No new dependencies introduced without checking with Smithers

---

## Sign-off format

When the review passes, state explicitly:

> **Chalmers sign-off: approved. Pass to Flanders.**

When the review fails, return to the originating agent with findings in this format:

> **[file path, line N]** — [what the violation is] — [what the correct pattern is]

Example:
> `src/components/Button/Button.tsx, line 42` — hardcoded `#1976d2` in `sx` prop — use `'primary.main'`
