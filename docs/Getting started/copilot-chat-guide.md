# GitHub Copilot Chat — Slash Commands & Agents Guide

A practical guide to using slash commands, skills, and agents in GitHub Copilot Chat within VS Code.

---

## What is Copilot Chat?

GitHub Copilot Chat is an AI assistant built into VS Code. You can ask it questions, get code suggestions, and — in this project — interact with specialised agents and skills that know our codebase.

**Open it:** Click the chat icon in the sidebar, or press `⌘+Shift+I` (macOS) / `Ctrl+Shift+I` (Windows).

---

## Built-in Slash Commands

Slash commands are shortcuts you type at the start of a message. They tell Copilot what kind of task you want help with.

| Command | What it does |
|---------|--------------|
| `/explain` | Explain how the selected code works |
| `/fix` | Suggest a fix for problems in the selected code |
| `/tests` | Generate unit tests for the selected code |
| `/doc` | Generate documentation or comments for the selected code |
| `/new` | Scaffold a new project or file |
| `/clear` | Clear the chat history and start fresh |
| `/help` | Show available commands and usage tips |

### How to use them

1. Select some code in your editor (optional — some commands work without a selection)
2. Open Copilot Chat
3. Type the slash command followed by any extra context

**Examples:**

```
/explain what does this useEffect do?

/fix this function throws when the array is empty

/tests write tests for the validation logic

/doc add JSDoc comments to this component
```

---

## Context Variables (`@` and `#`)

You can give Copilot extra context by referencing files, symbols, or the workspace:

| Syntax | What it provides |
|--------|-----------------|
| `@workspace` | Search across the entire project |
| `#file:path/to/file.ts` | Include a specific file as context |
| `#selection` | The currently selected code |
| `#editor` | The entire active file |
| `#terminalLastCommand` | The last terminal command and its output |

**Examples:**

```
@workspace where is the Button component defined?

#file:src/components/Button.tsx /explain this component

@workspace #file:src/app/theme.ts what colour tokens are available?
```

---

## Agents (This Project)

Agents are specialised personas configured for this project. They have different expertise and personalities. You switch between them using the **agent picker** dropdown at the top of the chat panel.

### Available Agents

| Agent | Role | When to use |
|-------|------|-------------|
| **Copilot** (default) | General assistant — coordinates as "Smithers" | General questions, routing work, starting tasks |
| **Milhouse** | Design Contractor | "Build me a page", "design this layout", "implement this screen" |
| **Sideshow Bob** | Async Planning Specialist | When you can't work on the repo directly and need a plan written up |

### How to switch agents

1. Look at the top of the Copilot Chat panel
2. Click the agent/model dropdown
3. Select the agent you want

Each agent stays in character and has access to different tools and knowledge. Milhouse will ask clarifying questions before building. Sideshow Bob will interview you and produce a planning document.

**Example prompts for Milhouse:**
```
Build me a dashboard page with a header, two stat cards, and a data table

Design a login form using our Foundation components

Here's a screenshot — can you implement this layout?
```

**Example prompts for Sideshow Bob:**
```
I want to plan a new stepped form for member onboarding

Help me plan changes to the theme token structure

I need to redesign the navigation — let's plan it out
```

---

## Skills (Custom Slash Commands)

This project has custom skills — think of them as specialist knowledge packs that Copilot can activate. They trigger automatically based on your request, but you can also invoke them directly.

### Available Skills

| Skill | Trigger phrases | What it does |
|-------|----------------|--------------|
| `/frontend-design` | "build component", "implement UI", "create page" | Generates production-grade React/MUI/Next.js components following Foundation conventions |
| `/ui-ux-pro-max` | "design review", "accessibility check", "colour audit", "WCAG" | Design decisions, visual consistency audits, and accessibility reviews |
| `/conformanceReport` | "conformance report", "accessibility sign-off", "WCAG review" | Runs an evidence-based WCAG 2.2 AA conformance review for a component |

### How to use skills

Type the skill name as a slash command, or **just describe what you need** — Copilot will activate the right skill automatically.

```
/frontend-design build a Card component with title, description, and action buttons

/ui-ux-pro-max review the colour contrast on our form inputs

/conformanceReport run a conformance review on the Modal component
```

---

## Tips & Best Practices

### Be specific
The more context you give, the better the answer:

```
❌ "fix this"
✅ "fix the TypeScript error on line 12 — it expects a string but receives number | undefined"
```

### Use file references
Point Copilot at the right code:

```
#file:src/components/Button.tsx why does this component re-render on every click?
```

### Start fresh when switching topics

If Copilot seems confused or stuck on a previous topic:

```
/clear
```

Then start your new question.

### Let it read your errors

If you have a terminal error, use:

```
#terminalLastCommand explain this error and how to fix it
```

### Ask it to explain before you ask it to fix

If you don't understand the code yet:

```
/explain
```

Then once you understand, ask for the fix. This helps you learn rather than blindly accepting changes.

---

## Common Workflows

### "I have a component to build"

1. Switch to **Milhouse** agent (or stay on default and describe what you want)
2. Describe the component — what it looks like, what props it needs, what it does
3. Milhouse will ask clarifying questions, then build it

### "I need to understand existing code"

```
@workspace how does the theme token system work?

#file:src/app/theme.ts /explain the colour palette structure
```

### "I have a bug"

1. Select the problematic code
2. Type `/fix` with a description of the issue
3. Review the suggestion before accepting

### "I need tests"

1. Select the function or component
2. Type `/tests`
3. Specify any edge cases you want covered

### "I'm planning work but can't code right now"

1. Switch to **Sideshow Bob** agent
2. Describe what you want to plan
3. Bob will interview you and save a planning document to your personal docs folder

---

## Keyboard Shortcuts

| Action | macOS | Windows |
|--------|-------|---------|
| Open Copilot Chat | `⌘+Shift+I` | `Ctrl+Shift+I` |
| Inline suggestions (accept) | `Tab` | `Tab` |
| Inline suggestions (dismiss) | `Esc` | `Esc` |
| Inline suggestions (next) | `⌥+]` | `Alt+]` |
| Inline suggestions (previous) | `⌥+[` | `Alt+[` |
| Open inline chat | `⌘+I` | `Ctrl+I` |

---

## Inline Chat vs Panel Chat

**Panel chat** (sidebar) — for longer conversations, multi-step tasks, and agent interactions. This is where you use slash commands and agents.

**Inline chat** (`⌘+I` / `Ctrl+I`) — for quick edits directly in the editor. Select code, press the shortcut, type what you want changed. Good for:
- "Rename this variable to something clearer"
- "Add error handling here"
- "Convert this to TypeScript"

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Copilot doesn't know about our components | Use `@workspace` or reference specific files with `#file:` |
| Suggestions use raw MUI instead of Foundation components | Remind it: "Use Foundation components from src/components/" |
| Agent isn't responding in character | Switch agents using the dropdown — you may be on the default |
| Slash command doesn't work | Make sure you're typing it at the very start of your message |
| Chat feels stuck or confused | Use `/clear` and start fresh |
