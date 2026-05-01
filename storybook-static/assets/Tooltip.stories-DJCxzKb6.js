import{n as e}from"./chunk-vNrZSFDR.js";import{t}from"./jsx-runtime-BiDZswiL.js";import{n,t as r}from"./Box-CHS_Iwe8.js";import{n as i,t as a}from"./Typography-DJ0wIq9h.js";import{n as o,t as s}from"./Button-DynpKRmD.js";import{n as c,t as l}from"./Tooltip-B3K9dANB.js";var u,d,f,p,m,h,g;e((()=>{u=t(),c(),o(),r(),a(),d={title:`Components / Tooltip`,component:l,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{placement:{control:`select`,options:[`top`,`top-start`,`top-end`,`bottom`,`bottom-start`,`bottom-end`,`left`,`right`]}}},f={args:{title:`This is a tooltip`,arrow:!0,placement:`top`},render:e=>(0,u.jsx)(l,{...e,children:(0,u.jsx)(s,{label:`Hover me`})})},p={render:()=>(0,u.jsxs)(n,{sx:{display:`grid`,gridTemplateColumns:`repeat(3, auto)`,gap:2,justifyItems:`center`,alignItems:`center`,p:4},children:[(0,u.jsx)(`div`,{}),(0,u.jsx)(l,{title:`Top`,placement:`top`,children:(0,u.jsx)(s,{label:`Top`,size:`small`})}),(0,u.jsx)(`div`,{}),(0,u.jsx)(l,{title:`Left`,placement:`left`,children:(0,u.jsx)(s,{label:`Left`,size:`small`})}),(0,u.jsx)(i,{variant:`body`,color:`text.muted`,align:`center`,children:`Placements`}),(0,u.jsx)(l,{title:`Right`,placement:`right`,children:(0,u.jsx)(s,{label:`Right`,size:`small`})}),(0,u.jsx)(`div`,{}),(0,u.jsx)(l,{title:`Bottom`,placement:`bottom`,children:(0,u.jsx)(s,{label:`Bottom`,size:`small`})}),(0,u.jsx)(`div`,{})]})},m={args:{title:`No arrow tooltip`,arrow:!1,placement:`top`},render:e=>(0,u.jsx)(l,{...e,children:(0,u.jsx)(s,{label:`Hover me`})})},h={render:()=>(0,u.jsx)(l,{title:(0,u.jsxs)(n,{children:[(0,u.jsx)(i,{variant:`small`,sx:{fontWeight:600,display:`block`},children:`Keyboard shortcut`}),(0,u.jsx)(i,{variant:`small`,children:`⌘ + K`})]}),placement:`bottom`,children:(0,u.jsx)(s,{label:`Rich tooltip`,variant:`outlined`})})},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'This is a tooltip',
    arrow: true,
    placement: 'top'
  },
  render: args => <Tooltip {...args}>\r
      <Button label="Hover me" />\r
    </Tooltip>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    display: 'grid',
    gridTemplateColumns: 'repeat(3, auto)',
    gap: 2,
    justifyItems: 'center',
    alignItems: 'center',
    p: 4
  }}>\r
      <div />\r
      <Tooltip title="Top" placement="top"><Button label="Top" size="small" /></Tooltip>\r
      <div />\r
      <Tooltip title="Left" placement="left"><Button label="Left" size="small" /></Tooltip>\r
      <Typography variant="body" color="text.muted" align="center">Placements</Typography>\r
      <Tooltip title="Right" placement="right"><Button label="Right" size="small" /></Tooltip>\r
      <div />\r
      <Tooltip title="Bottom" placement="bottom"><Button label="Bottom" size="small" /></Tooltip>\r
      <div />\r
    </Box>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'No arrow tooltip',
    arrow: false,
    placement: 'top'
  },
  render: args => <Tooltip {...args}>\r
      <Button label="Hover me" />\r
    </Tooltip>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <Tooltip title={<Box>\r
          <Typography variant="small" sx={{
      fontWeight: 600,
      display: 'block'
    }}>Keyboard shortcut</Typography>\r
          <Typography variant="small">⌘ + K</Typography>\r
        </Box>} placement="bottom">\r
      <Button label="Rich tooltip" variant="outlined" />\r
    </Tooltip>
}`,...h.parameters?.docs?.source}}},g=[`Default`,`Placements`,`NoArrow`,`RichContent`]}))();export{f as Default,m as NoArrow,p as Placements,h as RichContent,g as __namedExportsOrder,d as default};