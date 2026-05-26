import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{n,t as r}from"./Typography-ChsBGyM_.js";import{n as i,t as a}from"./Box-Cj6TI_Dr.js";import{n as o,t as s}from"./Pagination-MZuWD5PA.js";var c,l,u,d,f,p,m;e((()=>{c=t(),a(),r(),o(),l={title:`Components / Pagination`,component:s,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`Wraps MUI Pagination. Connects to brand design tokens for colour, border, focus, and disabled states. Supports three sizes and controlled or uncontrolled usage.`}}},argTypes:{count:{control:{type:`number`,min:1}},page:{control:{type:`number`,min:1},table:{disable:!0}},defaultPage:{table:{disable:!0}},variant:{table:{disable:!0}},color:{table:{disable:!0}},size:{table:{disable:!0}},siblingCount:{control:{type:`number`,min:0,max:3}},boundaryCount:{control:{type:`number`,min:0,max:3}},disabled:{control:`boolean`},showFirstButton:{control:`boolean`},showLastButton:{control:`boolean`},onChange:{table:{disable:!0}},sx:{table:{disable:!0}}}},u={args:{count:10,defaultPage:1,color:`primary`,disabled:!1,siblingCount:0,boundaryCount:1,showFirstButton:!1,showLastButton:!1},parameters:{docs:{description:{story:`Interactive playground. Use controls to explore all props.`}}}},d={parameters:{docs:{description:{story:`Show jump-to-first and jump-to-last buttons for long page ranges.`}}},render:()=>(0,c.jsx)(s,{count:20,defaultPage:10,showFirstButton:!0,showLastButton:!0})},f={parameters:{docs:{description:{story:"Disables all interaction. Uses `text.disabled` and `border.subtle` tokens."}}},render:()=>(0,c.jsx)(s,{count:10,defaultPage:3,disabled:!0})},p={parameters:{docs:{description:{story:"Ellipsis appear when pages exceed `siblingCount` + `boundaryCount` on each side."}}},render:()=>(0,c.jsxs)(i,{sx:{display:`flex`,flexDirection:`column`,gap:3},children:[(0,c.jsxs)(i,{children:[(0,c.jsx)(n,{variant:`caption`,sx:{display:`block`,mb:1,color:`text.muted`},children:`siblingCount=1 boundaryCount=1 (default)`}),(0,c.jsx)(s,{count:50,defaultPage:25})]}),(0,c.jsxs)(i,{children:[(0,c.jsx)(n,{variant:`caption`,sx:{display:`block`,mb:1,color:`text.muted`},children:`siblingCount=2 boundaryCount=2`}),(0,c.jsx)(s,{count:50,defaultPage:25,siblingCount:2,boundaryCount:2})]})]})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    count: 10,
    defaultPage: 1,
    color: 'primary',
    disabled: false,
    siblingCount: 0,
    boundaryCount: 1,
    showFirstButton: false,
    showLastButton: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground. Use controls to explore all props.'
      }
    }
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Show jump-to-first and jump-to-last buttons for long page ranges.'
      }
    }
  },
  render: () => <Pagination count={20} defaultPage={10} showFirstButton showLastButton />
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Disables all interaction. Uses \`text.disabled\` and \`border.subtle\` tokens.'
      }
    }
  },
  render: () => <Pagination count={10} defaultPage={3} disabled />
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Ellipsis appear when pages exceed \`siblingCount\` + \`boundaryCount\` on each side.'
      }
    }
  },
  render: () => <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  }}>\r
      <Box>\r
        <Typography variant="caption" sx={{
        display: 'block',
        mb: 1,
        color: 'text.muted'
      }}>siblingCount=1 boundaryCount=1 (default)</Typography>\r
        <Pagination count={50} defaultPage={25} />\r
      </Box>\r
      <Box>\r
        <Typography variant="caption" sx={{
        display: 'block',
        mb: 1,
        color: 'text.muted'
      }}>siblingCount=2 boundaryCount=2</Typography>\r
        <Pagination count={50} defaultPage={25} siblingCount={2} boundaryCount={2} />\r
      </Box>\r
    </Box>
}`,...p.parameters?.docs?.source}}},m=[`Default`,`WithFirstLastButtons`,`Disabled`,`ManyPages`]}))();export{u as Default,f as Disabled,p as ManyPages,d as WithFirstLastButtons,m as __namedExportsOrder,l as default};