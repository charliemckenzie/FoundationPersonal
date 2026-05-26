import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{r as n}from"./react-Bzxasctr.js";import{a as r,o as i}from"./blocks-BVbwG1nk.js";import{t as a}from"./mdx-react-shim-LP2IF1-t.js";function o(e){let t={code:`code`,h1:`h1`,h2:`h2`,hr:`hr`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{title:`Foundation / AI Management`}),`
`,(0,c.jsx)(t.h1,{id:`ai-management`,children:`AI Management`}),`
`,(0,c.jsx)(t.p,{children:`This project uses GitHub Copilot as the primary AI coding assistant. AI agents do not automatically know how this codebase is structured, what conventions we follow, or what components already exist. Instruction files tell them.`}),`
`,(0,c.jsx)(t.p,{children:`This page explains how that system works so anyone on the team can use it, maintain it, and add to it.`}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`how-it-works`,children:`How It Works`}),`
`,(0,c.jsxs)(t.p,{children:[`When GitHub Copilot opens a chat session, it automatically loads `,(0,c.jsx)(t.code,{children:`.github/copilot-instructions.md`}),` from the repository root. That file uses `,(0,c.jsx)(t.code,{children:`@`}),` references to pull in other documents as context. Every agent — regardless of which AI model is active — reads those documents before responding.`]}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{children:`.github/copilot-instructions.md   ← loaded automatically by Copilot (all models)\r
CLAUDE.md                          ← loaded by Claude Code CLI + Copilot on Claude model\r
  │\r
  ├── @AGENTS.md                   ← the agent team, their roles, and the component pipeline\r
  ├── @docs/guidelines/typography.md   ← typography scale, allowed variants, sizing rules\r
  └── @docs/guidelines/components.md  ← component catalogue + the rule to use existing ones
`})}),`
`,(0,c.jsx)(t.p,{children:`The result: every Copilot session starts with knowledge of the team structure, the design constraints, and the full component library — without anyone needing to paste context manually.`}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`the-guidelines-folder`,children:`The Guidelines Folder`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`docs/guidelines/`}),` is the home for all AI instruction documents. Each file targets a specific area where AI output needs to be constrained or guided.`]}),`
`,(0,c.jsxs)(`table`,{children:[(0,c.jsx)(`thead`,{children:(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`th`,{children:`File`}),(0,c.jsx)(`th`,{children:`What it governs`})]})}),(0,c.jsxs)(`tbody`,{children:[(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{children:(0,c.jsx)(`code`,{children:`typography.md`})}),(0,c.jsx)(`td`,{children:`Allowed typography variants, rem sizing rules, banned MUI variants`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{children:(0,c.jsx)(`code`,{children:`components.md`})}),(0,c.jsx)(`td`,{children:`Full component catalogue; the rule to always use existing components first`})]})]})]}),`
`,(0,c.jsx)(t.p,{children:`These files are not documentation for humans first — they are instructions for AI. Write them accordingly: direct, specific, and unambiguous. Avoid prose where a table or list will do.`}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`when-to-create-a-new-guideline`,children:`When to Create a New Guideline`}),`
`,(0,c.jsx)(t.p,{children:`If the same problem keeps recurring in AI output, that's a signal. A new guideline file is the fix.`}),`
`,(0,c.jsx)(t.p,{children:`Common triggers:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`An agent repeatedly uses a pattern you've corrected more than twice`}),`
`,(0,c.jsx)(t.li,{children:`A new area of the codebase has rules that aren't obvious from the code itself`}),`
`,(0,c.jsx)(t.li,{children:`A convention exists in the team's heads but nowhere in writing`}),`
`,(0,c.jsx)(t.li,{children:`A component, token, or API is consistently misused`}),`
`]}),`
`,(0,c.jsx)(t.p,{children:(0,c.jsx)(t.strong,{children:`Process:`})}),`
`,(0,c.jsxs)(t.ol,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Write the guideline in `,(0,c.jsx)(t.code,{children:`docs/guidelines/`}),` as a focused `,(0,c.jsx)(t.code,{children:`.md`}),` file`]}),`
`,(0,c.jsxs)(t.li,{children:[`Add an `,(0,c.jsx)(t.code,{children:`@`}),` reference to it in both `,(0,c.jsx)(t.code,{children:`.github/copilot-instructions.md`}),` and `,(0,c.jsx)(t.code,{children:`CLAUDE.md`})]}),`
`,(0,c.jsx)(t.li,{children:`Keep it short — AI context has limits and specific files load every session`}),`
`]}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`adding-a-reference`,children:`Adding a Reference`}),`
`,(0,c.jsx)(t.p,{children:`Both instruction files must be updated together. Open each and add the new reference on a new line:`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{children:`@AGENTS.md\r
@docs/guidelines/typography.md\r
@docs/guidelines/components.md\r
@docs/guidelines/your-new-file.md   ← add here
`})}),`
`,(0,c.jsxs)(t.p,{children:[`Files are: `,(0,c.jsx)(t.code,{children:`.github/copilot-instructions.md`}),` and `,(0,c.jsx)(t.code,{children:`CLAUDE.md`}),` in the repository root.`]}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`writing-effective-guideline-files`,children:`Writing Effective Guideline Files`}),`
`,(0,c.jsxs)(`table`,{children:[(0,c.jsx)(`thead`,{children:(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`th`,{children:`Do`}),(0,c.jsx)(`th`,{children:`Don't`})]})}),(0,c.jsxs)(`tbody`,{children:[(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{children:`State the rule first, explain second`}),(0,c.jsx)(`td`,{children:`Bury the constraint in paragraph four`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{children:`Use tables for reference data (prop names, token names, etc.)`}),(0,c.jsx)(`td`,{children:`Write long prose when a list is clearer`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsxs)(`td`,{children:[`Use strong language for hard rules: `,(0,c.jsx)(`strong`,{children:`always`}),`, `,(0,c.jsx)(`strong`,{children:`never`}),`, `,(0,c.jsx)(`strong`,{children:`must`})]}),(0,c.jsx)(`td`,{children:`Use hedging language: "try to", "consider", "it's recommended"`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{children:`Include a concrete example of the wrong pattern and the right one`}),(0,c.jsx)(`td`,{children:`Assume the AI will infer what you mean`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{children:`Keep each file focused on one area`}),(0,c.jsx)(`td`,{children:`Combine unrelated rules into one large file`})]})]})]}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`model-switching`,children:`Model Switching`}),`
`,(0,c.jsxs)(t.p,{children:[`The instruction system is model-agnostic. Switching between Claude, GPT-4o, Codex, or Gemini in GitHub Copilot does not require any changes — `,(0,c.jsx)(t.code,{children:`.github/copilot-instructions.md`}),` is loaded regardless.`]}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.code,{children:`CLAUDE.md`}),` additionally serves the Claude Code CLI (Anthropic's terminal tool). Keep both files identical to avoid divergence.`]}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`for-new-team-members`,children:`For New Team Members`}),`
`,(0,c.jsx)(t.p,{children:`You do not need to understand this system to use Copilot day-to-day. The files load silently in the background.`}),`
`,(0,c.jsx)(t.p,{children:`You do need to understand it if you are:`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Getting unexpected output from an AI agent`}),` — check whether a guideline file covers the area. If not, consider writing one.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Building a new component`}),` — `,(0,c.jsx)(t.code,{children:`docs/guidelines/components.md`}),` contains the rule that you must use an existing component first. AI agents are instructed to follow this; so should you.`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.strong,{children:`Adding a new convention to the codebase`}),` — write it down in `,(0,c.jsx)(t.code,{children:`docs/guidelines/`}),` so AI agents learn it too.`]}),`
`]}),`
`,(0,c.jsx)(t.p,{children:`The goal is a shared understanding between the human team and the AI tools. When the guidelines are current, AI output requires less correction. When they fall behind, expect drift.`})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=t(),a(),i()}))();export{s as default};