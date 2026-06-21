# How this application is optimised for AI

This codebase is built to be worked on by AI coding assistants — quickly, cheaply, and safely. This page explains how, in plain terms, for anyone across the organisation.

## Why this matters

Most of our day-to-day development happens with AI assistants (GitHub Copilot and Claude Code). An AI that understands our standards and our existing building blocks produces better work, faster, with less correction. We've deliberately set the project up so that happens by default — rather than relying on each person to remember to guide the AI.

The result: features ship faster, quality stays consistent, and we spend less on AI usage.

## How it's optimised

**1. A specialist AI team, not a single assistant.**
Work is handled by a set of focused AI roles — one for building, one for accessibility, one for code quality, one for visual consistency, and so on — coordinated through a single point of contact. Every piece of work passes through review gates before it's considered done, the same way a human team hands work between specialists.

**2. The AI starts lean and pulls detail only when needed.**
Every AI session used to load a large pile of reference material up front, whether or not it was relevant. We trimmed that down to a small core of essential rules and made the bulky reference available on demand. This cut the always-loaded context by **over 60%** — which means faster responses and lower cost on every single task.

**3. A self-updating map of the codebase.**
The AI has an automatically generated map of every component in the system — what exists, how the pieces fit together, and what depends on what. It updates itself whenever code changes, so it's never out of date. This stops the AI guessing, re-inventing things we already have, or working from stale information.

**4. Guardrails are built in, not bolted on.**
Our standards — accessibility (WCAG 2.2 AA), consistent design, code quality, no hard-coded values — are baked into the instructions the AI reads automatically. The AI is steered toward accessible, on-brand, maintainable code from the first line, rather than being corrected after the fact.

**5. It works the same across both AI tools.**
We use two AI assistants (Copilot and Claude Code). Both read the same shared rules, kept automatically in sync, so the experience and the output are consistent no matter which tool someone uses.

## What the organisation gets from it

- **Faster delivery** — the AI spends less time rediscovering context and more time building.
- **Lower cost** — every task carries far less overhead, so AI usage is cheaper.
- **Consistent quality** — the same standards apply automatically to all work.
- **Accessibility by default** — compliance is guided from the start, reducing legal and rework risk.
- **No drift** — the codebase map and shared rules keep themselves current, so the system doesn't quietly fall out of date.

## How it stays this way

The setup is self-maintaining. The codebase map regenerates automatically, the shared rules stay synchronised across both AI tools, and an automated check warns us if the always-loaded context starts creeping back up. In short: the optimisation holds without anyone needing to actively manage it.
