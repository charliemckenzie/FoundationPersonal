import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{r as n}from"./react-Bzxasctr.js";import{a as r,o as i}from"./blocks-BVbwG1nk.js";import{t as a}from"./mdx-react-shim-LP2IF1-t.js";function o(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,hr:`hr`,li:`li`,p:`p`,pre:`pre`,table:`table`,tbody:`tbody`,td:`td`,th:`th`,thead:`thead`,tr:`tr`,ul:`ul`,...n(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(r,{title:`Utilities / Overview`}),`
`,(0,c.jsx)(t.h1,{id:`utilities`,children:`Utilities`}),`
`,(0,c.jsx)(t.p,{children:`Utilities are foundational building blocks — low-level components that handle a specific browser or interaction concern without imposing structure on the content inside them.`}),`
`,(0,c.jsx)(t.p,{children:`They sit one level below opinionated UI components. A Utility solves the hard part (focus trapping, overlay management, scroll locking, portal rendering) so that higher-level components can focus on layout and content.`}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`when-to-use-a-utility`,children:`When to use a Utility`}),`
`,(0,c.jsx)(t.p,{children:`Use a Utility directly when you need full control over the content and visual structure of an overlay or panel. Use an opinionated component when you want a consistent, pre-structured pattern.`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`You want…`}),(0,c.jsx)(t.th,{children:`Use`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`A flexible overlay with any content`}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.a,{href:`/?path=/story/utilities-modal--default`,children:`Modal`})})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`A confirmation or destructive-action dialog`}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.a,{href:`/?path=/story/components-dialog--default`,children:`Dialog`})})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`A slide-in panel for nav, filters, or forms`}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.a,{href:`/?path=/story/components-drawer--default`,children:`Drawer`})})]})]})]}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`how-utilities-relate-to-components`,children:`How Utilities relate to Components`}),`
`,(0,c.jsx)(t.p,{children:`Utilities are not wrappers around design decisions — they are infrastructure. They do not make choices about colour, spacing, or typography. Those choices belong to the components built on top of them.`}),`
`,(0,c.jsx)(t.pre,{children:(0,c.jsx)(t.code,{children:`Utility (Modal)\r
  └── Opinionated component (Dialog, Drawer)\r
        └── Usage in product UI
`})}),`
`,(0,c.jsx)(t.p,{children:`Any component that introduces an overlay, a focus trap, or a portal should be built on a Utility — not on raw MUI primitives — so the team maintains one consistent layer of control.`}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`current-utilities`,children:`Current Utilities`}),`
`,(0,c.jsxs)(t.table,{children:[(0,c.jsx)(t.thead,{children:(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.th,{children:`Utility`}),(0,c.jsx)(t.th,{children:`Purpose`}),(0,c.jsx)(t.th,{children:`Story`})]})}),(0,c.jsxs)(t.tbody,{children:[(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Modal`}),(0,c.jsx)(t.td,{children:`General-purpose overlay with focus trap, backdrop, and scroll lock`}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.a,{href:`/?path=/story/utilities-modal--default`,children:`Modal`})})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Transitions`}),(0,c.jsx)(t.td,{children:`Duration and easing tokens for all animated UI changes`}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.a,{href:`/?path=/story/utilities-transitions--default`,children:`Transitions`})})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Z-Index`}),(0,c.jsx)(t.td,{children:`Named layer tokens for the stacking context`}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.a,{href:`/?path=/story/utilities-z-index--default`,children:`Z-Index`})})]}),(0,c.jsxs)(t.tr,{children:[(0,c.jsx)(t.td,{children:`Breakpoints`}),(0,c.jsx)(t.td,{children:`Viewport breakpoints and brand grid config`}),(0,c.jsx)(t.td,{children:(0,c.jsx)(t.a,{href:`/?path=/story/utilities-breakpoints--default`,children:`Breakpoints`})})]})]})]}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`adding-a-new-utility`,children:`Adding a new Utility`}),`
`,(0,c.jsx)(t.p,{children:`Before proposing a new Utility, confirm that no existing Utility covers the use case. Overlay behaviour should always be consolidated — two components solving the same browser concern is a maintenance liability.`}),`
`,(0,c.jsx)(t.p,{children:`New Utilities follow the same component pipeline as all other components: Lenny builds, Chalmers reviews, Flanders checks accessibility, Marge checks visual consistency, Lisa documents.`}),`
`,(0,c.jsx)(t.hr,{}),`
`,(0,c.jsx)(t.h2,{id:`further-reading`,children:`Further reading`}),`
`,(0,c.jsxs)(t.ul,{children:[`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.a,{href:`/?path=/docs/foundation-accessibility--docs`,children:`Foundation / Accessibility`}),` — WCAG 2.2 AA requirements that every overlay Utility must satisfy`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.a,{href:`/?path=/story/components-dialog--default`,children:`Components / Dialog`}),` — built on Modal; structured confirmation flows`]}),`
`,(0,c.jsxs)(t.li,{children:[(0,c.jsx)(t.a,{href:`/?path=/story/components-drawer--default`,children:`Components / Drawer`}),` — slide-in panels for secondary content`]}),`
`]})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}var c;e((()=>{c=t(),a(),i()}))();export{s as default};