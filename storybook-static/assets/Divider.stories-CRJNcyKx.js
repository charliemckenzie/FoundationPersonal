import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{n,t as r}from"./Typography-ChsBGyM_.js";import{n as i,t as a}from"./Box-Cj6TI_Dr.js";import{n as o,t as s}from"./Divider-BWNcmbqb.js";var c,l,u,d,f,p,m,h;e((()=>{c=t(),a(),r(),o(),l={title:`Components / Divider`,component:s,tags:[`autodocs`],parameters:{layout:`padded`},argTypes:{orientation:{control:`select`,options:[`horizontal`,`vertical`]},variant:{control:`select`,options:[`fullWidth`,`inset`,`middle`]},textAlign:{control:`select`,options:[`left`,`center`,`right`]},flexItem:{control:`boolean`}}},u={},d={args:{children:`or`}},f={render:()=>(0,c.jsxs)(i,{sx:{display:`flex`,flexDirection:`column`,gap:3},children:[(0,c.jsx)(s,{textAlign:`left`,children:`Left`}),(0,c.jsx)(s,{textAlign:`center`,children:`Centre`}),(0,c.jsx)(s,{textAlign:`right`,children:`Right`})]})},p={render:()=>(0,c.jsx)(i,{sx:{display:`flex`,flexDirection:`column`,gap:3},children:[`fullWidth`,`inset`,`middle`].map(e=>(0,c.jsxs)(i,{children:[(0,c.jsx)(n,{variant:`small`,color:`text.muted`,sx:{mb:1},children:e}),(0,c.jsx)(s,{variant:e})]},e))})},m={render:()=>(0,c.jsxs)(i,{sx:{display:`flex`,height:`4rem`,alignItems:`center`,gap:2},children:[(0,c.jsx)(n,{variant:`body`,children:`Left`}),(0,c.jsx)(s,{orientation:`vertical`,flexItem:!0}),(0,c.jsx)(n,{variant:`body`,children:`Right`})]})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    children: 'or'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  }}>\r
      <Divider textAlign="left">Left</Divider>\r
      <Divider textAlign="center">Centre</Divider>\r
      <Divider textAlign="right">Right</Divider>\r
    </Box>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  }}>\r
      {(['fullWidth', 'inset', 'middle'] as const).map(variant => <Box key={variant}>\r
          <Typography variant="small" color="text.muted" sx={{
        mb: 1
      }}>\r
            {variant}\r
          </Typography>\r
          <Divider variant={variant} />\r
        </Box>)}\r
    </Box>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    display: 'flex',
    height: '4rem',
    alignItems: 'center',
    gap: 2
  }}>\r
      <Typography variant="body">Left</Typography>\r
      <Divider orientation="vertical" flexItem />\r
      <Typography variant="body">Right</Typography>\r
    </Box>
}`,...m.parameters?.docs?.source}}},h=[`Default`,`WithText`,`TextAlignment`,`Variants`,`Vertical`]}))();export{u as Default,f as TextAlignment,p as Variants,m as Vertical,d as WithText,h as __namedExportsOrder,l as default};