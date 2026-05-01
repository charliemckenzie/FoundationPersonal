import{n as e}from"./chunk-vNrZSFDR.js";import{t}from"./jsx-runtime-BiDZswiL.js";import{n,t as r}from"./Box-CHS_Iwe8.js";import{n as i,t as a}from"./Typography-DJ0wIq9h.js";import{n as o,t as s}from"./Spinner-DQq5y4xe.js";var c,l,u,d,f,p,m;e((()=>{c=t(),o(),r(),a(),l={title:`Components / Spinner`,component:s,tags:[`autodocs`],parameters:{layout:`padded`},argTypes:{size:{control:`select`,options:[`small`,`medium`,`large`]},color:{control:`select`,options:[`primary`,`secondary`,`error`,`warning`,`info`,`success`,`inherit`]}}},u={args:{size:`medium`,color:`primary`}},d={render:()=>(0,c.jsx)(n,{sx:{display:`flex`,alignItems:`center`,gap:4},children:[`small`,`medium`,`large`].map(e=>(0,c.jsxs)(n,{sx:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:1},children:[(0,c.jsx)(s,{size:e}),(0,c.jsx)(i,{variant:`small`,children:e})]},e))})},f={render:()=>(0,c.jsx)(n,{sx:{display:`flex`,gap:3,flexWrap:`wrap`,alignItems:`center`},children:[`primary`,`secondary`,`error`,`warning`,`info`,`success`].map(e=>(0,c.jsxs)(n,{sx:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:1},children:[(0,c.jsx)(s,{color:e}),(0,c.jsx)(i,{variant:`small`,children:e})]},e))})},p={args:{size:`medium`,label:`Loading data…`}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'medium',
    color: 'primary'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    display: 'flex',
    alignItems: 'center',
    gap: 4
  }}>\r
      {(['small', 'medium', 'large'] as const).map(size => <Box key={size} sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1
    }}>\r
          <Spinner size={size} />\r
          <Typography variant="small">{size}</Typography>\r
        </Box>)}\r
    </Box>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    display: 'flex',
    gap: 3,
    flexWrap: 'wrap',
    alignItems: 'center'
  }}>\r
      {(['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const).map(color => <Box key={color} sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1
    }}>\r
          <Spinner color={color} />\r
          <Typography variant="small">{color}</Typography>\r
        </Box>)}\r
    </Box>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    size: 'medium',
    label: 'Loading data…'
  }
}`,...p.parameters?.docs?.source}}},m=[`Default`,`Sizes`,`Colors`,`WithLabel`]}))();export{f as Colors,u as Default,d as Sizes,p as WithLabel,m as __namedExportsOrder,l as default};