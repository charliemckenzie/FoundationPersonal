import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{r as n}from"./react-Bzxasctr.js";import{a as r,o as i}from"./blocks-BVbwG1nk.js";import{t as a}from"./mdx-react-shim-LP2IF1-t.js";function o(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,hr:`hr`,li:`li`,p:`p`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{title:`Foundation / Accessibility`}),`
`,(0,c.jsx)(t.h1,{id:`accessibility`,children:`Accessibility`}),`
`,(0,c.jsxs)(t.p,{children:[`This design system targets `,(0,c.jsx)(t.strong,{children:`WCAG 2.2 Level AA`}),` compliance. Every component must meet these requirements before it is marked stable.`]}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`colour-contrast`,children:`Colour Contrast`}),`
`,(0,c.jsxs)(`table`,{children:[(0,c.jsx)(`thead`,{children:(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`th`,{children:`Situation`}),(0,c.jsx)(`th`,{children:`Minimum ratio`})]})}),(0,c.jsxs)(`tbody`,{children:[(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{children:`Normal text (below 18pt / 14pt bold)`}),(0,c.jsx)(`td`,{children:(0,c.jsx)(`strong`,{children:`4.5 : 1`})})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{children:`Large text (18pt+ or 14pt+ bold)`}),(0,c.jsx)(`td`,{children:(0,c.jsx)(`strong`,{children:`3 : 1`})})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{children:`UI components and graphical objects`}),(0,c.jsx)(`td`,{children:(0,c.jsx)(`strong`,{children:`3 : 1`})})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{children:`Decorative content`}),(0,c.jsx)(`td`,{children:`No requirement`})]})]})]}),`
`,(0,c.jsxs)(t.p,{children:[`All semantic text tokens are verified against all semantic background tokens. See the `,(0,c.jsx)(t.a,{href:`/?path=/story/design-tokens-typography--accessibility`,children:`Typography — Accessibility`}),` story for the full contrast matrix in light and dark mode.`]}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`keyboard-navigation`,children:`Keyboard Navigation`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`All interactive elements must be reachable and operable by keyboard alone.`}),`
`,(0,c.jsx)(t.li,{children:`Tab order must follow a logical, predictable sequence that matches the visual layout.`}),`
`,(0,c.jsx)(t.li,{children:`No keyboard traps — focus must be able to leave every component.`}),`
`,(0,c.jsx)(t.li,{children:`Modal dialogs must trap focus while open and restore it on close.`}),`
`]}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`focus-indicators`,children:`Focus Indicators`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Every interactive element must display a visible focus ring.`}),`
`,(0,c.jsxs)(t.li,{children:[`The focus indicator must have a `,(0,c.jsx)(t.strong,{children:`3 : 1`}),` contrast ratio against adjacent colours.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Do not suppress the outline with `,(0,c.jsx)(t.code,{children:`outline: none`}),` or `,(0,c.jsx)(t.code,{children:`outline: 0`}),` unless you replace it with an equivalent custom indicator.`]}),`
`]}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`text-alternatives`,children:`Text Alternatives`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`All meaningful images must have a descriptive `,(0,c.jsx)(t.code,{children:`alt`}),` attribute.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Decorative images must use `,(0,c.jsx)(t.code,{children:`alt=""`}),` so screen readers skip them.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Icons used as controls must have an accessible label — either visible text, `,(0,c.jsx)(t.code,{children:`aria-label`}),`, or a visually hidden `,(0,c.jsx)(t.code,{children:`<span>`}),`.`]}),`
`]}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`forms`,children:`Forms`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Every form control must have a programmatically associated `,(0,c.jsx)(t.code,{children:`<label>`}),` (`,(0,c.jsx)(t.code,{children:`for`}),`/`,(0,c.jsx)(t.code,{children:`id`}),` pair or wrapping label).`]}),`
`,(0,c.jsxs)(t.li,{children:[`Required fields must be marked — both visually and with `,(0,c.jsx)(t.code,{children:`aria-required="true"`}),` or the native `,(0,c.jsx)(t.code,{children:`required`}),` attribute.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Error messages must identify the field and describe what went wrong. Associate them with the field using `,(0,c.jsx)(t.code,{children:`aria-describedby`}),`.`]}),`
`,(0,c.jsx)(t.li,{children:`Do not rely on colour alone to communicate a validation state — use an icon or text alongside it.`}),`
`]}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`motion-and-animation`,children:`Motion and Animation`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsx)(t.li,{children:`Any animation that lasts more than 5 seconds, moves, blinks, or auto-updates must have a mechanism to pause, stop, or hide it.`}),`
`,(0,c.jsxs)(t.li,{children:[`Respect the user's `,(0,c.jsx)(t.code,{children:`prefers-reduced-motion`}),` media query.`]}),`
`]}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`resize-and-reflow`,children:`Resize and Reflow`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Text must be readable and functional when resized up to `,(0,c.jsx)(t.strong,{children:`200%`}),` in the browser without requiring horizontal scrolling at 320 px width.`]}),`
`,(0,c.jsx)(t.li,{children:`No content or functionality may be clipped or lost at larger text sizes.`}),`
`]}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`language`,children:`Language`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`The page language must be set: `,(0,c.jsx)(t.code,{children:`<html lang="en">`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Sections in a different language must use the `,(0,c.jsx)(t.code,{children:`lang`}),` attribute on the containing element.`]}),`
`]}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`semantic-structure`,children:`Semantic Structure`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[`Use the correct HTML element for the job. A button that triggers an action is `,(0,c.jsx)(t.code,{children:`<button>`}),`. A link that navigates is `,(0,c.jsx)(t.code,{children:`<a>`}),`.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Heading levels (`,(0,c.jsx)(t.code,{children:`h1`}),`–`,(0,c.jsx)(t.code,{children:`h6`}),`) must form a logical outline — do not skip levels.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Landmark regions (`,(0,c.jsx)(t.code,{children:`<main>`}),`, `,(0,c.jsx)(t.code,{children:`<nav>`}),`, `,(0,c.jsx)(t.code,{children:`<header>`}),`, `,(0,c.jsx)(t.code,{children:`<footer>`}),`) help screen reader users navigate quickly.`]}),`
`,(0,c.jsxs)(t.li,{children:[`Lists of items should use `,(0,c.jsx)(t.code,{children:`<ul>`}),` or `,(0,c.jsx)(t.code,{children:`<ol>`}),`, not a series of `,(0,c.jsx)(t.code,{children:`<div>`}),` elements.`]}),`
`]}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`wcag-22--new-criteria`,children:`WCAG 2.2 — New criteria`}),`
`,(0,c.jsx)(t.p,{children:`These criteria were added in 2.2 and are not covered by axe-core's default ruleset. Flanders checks each of these manually during every component review.`}),`
`,(0,c.jsxs)(`table`,{children:[(0,c.jsx)(`thead`,{children:(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`th`,{children:`SC`}),(0,c.jsx)(`th`,{children:`Name`}),(0,c.jsx)(`th`,{children:`Level`}),(0,c.jsx)(`th`,{children:`What to check`})]})}),(0,c.jsxs)(`tbody`,{children:[(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{children:`2.4.11`}),(0,c.jsx)(`td`,{children:`Focus Not Obscured (Minimum)`}),(0,c.jsx)(`td`,{children:`AA`}),(0,c.jsx)(`td`,{children:`No sticky header or overlay completely hides a focused element`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{children:`2.4.13`}),(0,c.jsx)(`td`,{children:`Focus Appearance`}),(0,c.jsx)(`td`,{children:`AA`}),(0,c.jsx)(`td`,{children:`Focus indicator ≥ 2px thick, ≥ 3:1 contrast between focused and unfocused states`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{children:`2.5.7`}),(0,c.jsx)(`td`,{children:`Dragging Movements`}),(0,c.jsx)(`td`,{children:`AA`}),(0,c.jsx)(`td`,{children:`Any drag-and-drop action has a single-pointer alternative (e.g. click to pick up / click to drop)`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{children:`2.5.8`}),(0,c.jsx)(`td`,{children:`Target Size (Minimum)`}),(0,c.jsx)(`td`,{children:`AA`}),(0,c.jsx)(`td`,{children:`Interactive targets ≥ 24 × 24 CSS px, or offset from adjacent targets ≥ 24px`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{children:`3.2.6`}),(0,c.jsx)(`td`,{children:`Consistent Help`}),(0,c.jsx)(`td`,{children:`A`}),(0,c.jsx)(`td`,{children:`Help mechanisms (chat, contact) appear in the same location across pages`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{children:`3.3.7`}),(0,c.jsx)(`td`,{children:`Redundant Entry`}),(0,c.jsx)(`td`,{children:`A`}),(0,c.jsx)(`td`,{children:`Users are not asked to re-enter information already provided in the same session`})]}),(0,c.jsxs)(`tr`,{children:[(0,c.jsx)(`td`,{children:`3.3.8`}),(0,c.jsx)(`td`,{children:`Accessible Authentication (Minimum)`}),(0,c.jsx)(`td`,{children:`AA`}),(0,c.jsx)(`td`,{children:`Login does not require solving a cognitive test (puzzle, image recognition) without an alternative`})]})]})]}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`further-reading`,children:`Further reading`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.a,{href:`/?path=/story/design-tokens-typography--accessibility`,children:`Typography — Accessibility`}),` — contrast matrix for all text and background token combinations`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.a,{href:`https://www.w3.org/WAI/WCAG22/quickref/?versions=2.2&levels=aa`,rel:`nofollow`,children:`WCAG 2.2 Quick Reference`}),` — official W3C checklist`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.a,{href:`https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/`,rel:`nofollow`,children:`What's New in WCAG 2.2`}),` — W3C summary of the 2.2 additions`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.a,{href:`https://www.w3.org/WAI/ARIA/apg/`,rel:`nofollow`,children:`Accessible Rich Internet Applications (ARIA) Authoring Practices`}),` — patterns for complex widgets`]}),`
`]})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=t(),a(),i()}))();export{s as default};