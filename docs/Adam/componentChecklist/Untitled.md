



I want you to build a **Consolidate your super** feature for the Foundation design system project. The full plan is at [consolidate-super-plan.md](vscode-file://vscode-app/c:/Program%20Files/Microsoft%20VS%20Code/8761a5560c/resources/app/out/vs/code/electron-browser/workbench/workbench.html) — read it from top to bottom before writing any code. It is a self-contained agent brief and contains everything you need.

**I have roughly 10–12 minutes of build time. Priority is something I can show — a running page in the browser, not scaffolding.**

**Starting point:** The hub route already exists at `/member-online/consolidate` in the app ([page.tsx](vscode-file://vscode-app/c:/Program%20Files/Microsoft%20VS%20Code/8761a5560c/resources/app/out/vs/code/electron-browser/workbench/workbench.html)). It currently renders a heading and lead copy only. Your first task is replacing it with a working `<ConsolidateHub />`. That page is what I'll be showing at the end of this session — make it the first thing that works.

**The IDV prerequisite is done.** [idv](vscode-file://vscode-app/c:/Program%20Files/Microsoft%20VS%20Code/8761a5560c/resources/app/out/vs/code/electron-browser/workbench/workbench.html) is already built and merged. Confirm it compiles clean, then proceed directly to the consolidate work. Do not run [idv-shared-module-plan.md](vscode-file://vscode-app/c:/Program%20Files/Microsoft%20VS%20Code/8761a5560c/resources/app/out/vs/code/electron-browser/workbench/workbench.html).

**Build in this order for the demo:**

1. `ConsolidateHub` + both brand `page.tsx` replacements + `layout.tsx` provider mount — get the hub live at `/member-online/consolidate` with three navigable decision rows
2. Manual flow end-to-end (`ManualConsolidateFlow` + steps) — simplest path to a working submit → success screen
3. Stub pages for ATO and SMSF routes so hub links don't 404
4. ATO flow if time allows — §10 of the plan has the confirmed [idv](vscode-file://vscode-app/c:/Program%20Files/Microsoft%20VS%20Code/8761a5560c/resources/app/out/vs/code/electron-browser/workbench/workbench.html) API

Skip stories for now. Do not branch or commit without asking me first. Surface any of the open questions in §13 before making an assumption.