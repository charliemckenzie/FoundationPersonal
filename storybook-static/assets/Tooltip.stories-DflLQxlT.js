import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{n,t as r}from"./Typography-ChsBGyM_.js";import{n as i,t as a}from"./Box-Cj6TI_Dr.js";import{n as o,t as s}from"./Tooltip-Cn039bZL.js";import{n as c,t as l}from"./Button-C-Y45Snn.js";var u,d,f,p,m,h,g,_;e((()=>{u=t(),o(),c(),a(),r(),d={title:`Components / Tooltip`,component:s,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{placement:{control:`select`,options:[`top`,`top-start`,`top-end`,`bottom`,`bottom-start`,`bottom-end`,`left`,`right`]}}},f={args:{title:`This is a tooltip`,arrow:!0,placement:`top`},render:e=>(0,u.jsx)(s,{...e,children:(0,u.jsx)(l,{label:`Hover me`})})},p={render:()=>(0,u.jsxs)(i,{sx:{display:`grid`,gridTemplateColumns:`repeat(3, auto)`,gap:2,justifyItems:`center`,alignItems:`center`,p:4},children:[(0,u.jsx)(`div`,{}),(0,u.jsx)(s,{title:`Top`,placement:`top`,children:(0,u.jsx)(l,{label:`Top`,size:`small`})}),(0,u.jsx)(`div`,{}),(0,u.jsx)(s,{title:`Left`,placement:`left`,children:(0,u.jsx)(l,{label:`Left`,size:`small`})}),(0,u.jsx)(n,{variant:`body`,color:`text.muted`,align:`center`,children:`Placements`}),(0,u.jsx)(s,{title:`Right`,placement:`right`,children:(0,u.jsx)(l,{label:`Right`,size:`small`})}),(0,u.jsx)(`div`,{}),(0,u.jsx)(s,{title:`Bottom`,placement:`bottom`,children:(0,u.jsx)(l,{label:`Bottom`,size:`small`})}),(0,u.jsx)(`div`,{})]})},m={args:{title:`No arrow tooltip`,arrow:!1,placement:`top`},render:e=>(0,u.jsx)(s,{...e,children:(0,u.jsx)(l,{label:`Hover me`})})},h={render:()=>(0,u.jsxs)(i,{sx:{display:`flex`,gap:2,alignItems:`center`},children:[(0,u.jsx)(s,{title:`Tooltip on a disabled button`,placement:`top`,children:(0,u.jsx)(`span`,{children:(0,u.jsx)(l,{label:`Disabled button`,disabled:!0})})}),(0,u.jsx)(s,{title:`This tooltip never shows`,disableHoverListener:!0,disableFocusListener:!0,disableTouchListener:!0,children:(0,u.jsx)(l,{label:`All listeners off`,variant:`outlined`})})]})},g={render:()=>(0,u.jsx)(s,{title:(0,u.jsxs)(i,{children:[(0,u.jsx)(n,{variant:`small`,sx:{fontWeight:600,display:`block`},children:`Keyboard shortcut`}),(0,u.jsx)(n,{variant:`small`,children:`⌘ + K`})]}),placement:`bottom`,children:(0,u.jsx)(l,{label:`Rich tooltip`,variant:`outlined`})})},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
  render: () => <Box sx={{
    display: 'flex',
    gap: 2,
    alignItems: 'center'
  }}>\r
      <Tooltip title="Tooltip on a disabled button" placement="top">\r
        <span>\r
          <Button label="Disabled button" disabled />\r
        </span>\r
      </Tooltip>\r
      <Tooltip title="This tooltip never shows" disableHoverListener disableFocusListener disableTouchListener>\r
        <Button label="All listeners off" variant="outlined" />\r
      </Tooltip>\r
    </Box>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Tooltip title={<Box>\r
          <Typography variant="small" sx={{
      fontWeight: 600,
      display: 'block'
    }}>Keyboard shortcut</Typography>\r
          <Typography variant="small">⌘ + K</Typography>\r
        </Box>} placement="bottom">\r
      <Button label="Rich tooltip" variant="outlined" />\r
    </Tooltip>
}`,...g.parameters?.docs?.source}}},_=[`Default`,`Placements`,`NoArrow`,`DisabledTrigger`,`RichContent`]}))();export{f as Default,h as DisabledTrigger,m as NoArrow,p as Placements,g as RichContent,_ as __namedExportsOrder,d as default};