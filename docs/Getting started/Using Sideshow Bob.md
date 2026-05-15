# Using Sideshow Bob

## What is he?

Sideshow Bob is a planning assistant built into VS Code. When you're blocked from the repo — because someone else is working on it — you talk to Bob instead. He asks you questions about what you want to build or change, researches the current codebase, and writes up a complete plan document saved to your personal folder.

When it's your turn on the repo, you open that document and hand it to the team agents to execute. No re-thinking required.

**Bob does not write code or touch the repo. He only plans.**

---

## How to open Bob

1. Open **VS Code**
2. Open **Copilot Chat** (the chat panel on the left, or `⌃⌘I`)
3. Click the **agent picker** — the dropdown next to the chat input that shows the current mode
4. Select **Sideshow Bob** from the list

---

## How a session works

Just tell Bob what you want to do. For example:

> *"I want to add a new size option to the Tooltip component"*

> *"I want to create a new Callout component for warning messages"*

> *"I want to update the Button colours for the QSuper brand"*

Bob will ask you clarifying questions, then go away and research the codebase. When he's done, he'll write a plan document and save it to your personal folder:

| Your name | Your folder |
|---|---|
| Paolo | `docs/Paolo/` |
| Jade | `docs/Jade/` |
| Adam | `docs/Adam/` |

---

## When it's your turn on the repo

Open your planning document and either:

- **Hand it to the team agents** — tell Smithers: *"Execute [filename] from my planning docs."* He'll coordinate Lenny, Chalmers, Flanders, Marge, Lisa, Willie, and Frink.
- **Run it yourself** — the document has numbered steps written clearly enough to follow independently.

**Always read the Conflict Check section at the top of the document first.** It lists every file the plan will touch and warns you if anything might have changed since Bob wrote the plan.

---

## Tips

- The more detail you give Bob upfront, the less back-and-forth you'll need
- If you're not sure what something is called in the codebase, describe it in plain English — Bob will figure it out
- You can run multiple planning sessions for different pieces of work; each gets its own document
- If the repo has been updated significantly since Bob wrote your plan, ask Bob for a new session before executing
