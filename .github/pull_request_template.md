## Summary

<!-- What changed and why. Link any planning doc or issue. -->

## Foundation sign-off

<!--
REQUIRED for any PR that adds/changes a Foundation component or promotes a component's status.
For non-component PRs (bug fix, docs, chore, dependency bump), DELETE everything below this comment
and write exactly:  Sign-off: N/A — <reason>

Each gate: tick the box AND add a one-line evidence pointer (commit, file, conformance report, story).
Willie verifies these before updating src/stories/index.mdx. CI (signoff.yml) blocks merge until complete.
-->

Component: <name>
Target status: <experimental | beta | stable>

- [ ] **Moe** — structure & API approved: <evidence>
- [ ] **Chalmers** — code quality (TS strict, tokens only, size limits, security): <evidence>
- [ ] **Flanders** — accessibility, WCAG 2.2 AA (keyboard, focus, ARIA, contrast): <evidence>
- [ ] **Marge** — visual consistency (tokens, spacing, typography): <evidence>
- [ ] **Lisa** — Storybook story + docs written: <evidence>
- [ ] **Willie** — status updated in `src/stories/index.mdx`: <evidence>
