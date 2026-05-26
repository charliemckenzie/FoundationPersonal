import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{n,t as r}from"./Typography-ChsBGyM_.js";import{n as i,t as a}from"./Box-Cj6TI_Dr.js";import{n as o,t as s}from"./Spinner-B5DaCyfD.js";var c,l,u,d,f,p,m,h;e((()=>{c=t(),o(),a(),r(),l={title:`Components / Loading Indicators / Spinner`,component:s,tags:[`autodocs`],parameters:{layout:`padded`},argTypes:{size:{control:`select`,options:[`small`,`medium`,`large`]},color:{control:`select`,options:[`primary`,`secondary`,`error`,`warning`,`info`,`success`,`inherit`]}}},u={args:{size:`medium`,color:`primary`}},d={render:()=>(0,c.jsx)(i,{sx:{display:`flex`,alignItems:`center`,gap:4},children:[`small`,`medium`,`large`].map(e=>(0,c.jsxs)(i,{sx:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:1},children:[(0,c.jsx)(s,{size:e}),(0,c.jsx)(n,{variant:`small`,children:e})]},e))})},f={render:()=>(0,c.jsx)(i,{sx:{display:`flex`,gap:3,flexWrap:`wrap`,alignItems:`center`},children:[`primary`,`secondary`,`error`,`warning`,`info`,`success`].map(e=>(0,c.jsxs)(i,{sx:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:1},children:[(0,c.jsx)(s,{color:e}),(0,c.jsx)(n,{variant:`small`,children:e})]},e))})},p={args:{size:`medium`,label:`Loading data…`}},m={render:()=>(0,c.jsxs)(i,{sx:{position:`relative`,width:320,height:160,border:1,borderColor:`border.default`,borderRadius:1,overflow:`hidden`},children:[(0,c.jsx)(i,{sx:{p:2},children:(0,c.jsx)(n,{variant:`body`,children:`Content underneath the overlay.`})}),(0,c.jsx)(i,{sx:{position:`absolute`,inset:0,display:`flex`,alignItems:`center`,justifyContent:`center`,backgroundColor:`rgba(255,255,255,0.75)`},children:(0,c.jsx)(s,{size:`large`,label:`Loading…`})})]})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    position: 'relative',
    width: 320,
    height: 160,
    border: 1,
    borderColor: 'border.default',
    borderRadius: 1,
    overflow: 'hidden'
  }}>\r
      <Box sx={{
      p: 2
    }}>\r
        <Typography variant="body">Content underneath the overlay.</Typography>\r
      </Box>\r
      <Box sx={{
      position: 'absolute',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255,255,255,0.75)'
    }}>\r
        <Spinner size="large" label="Loading…" />\r
      </Box>\r
    </Box>
}`,...m.parameters?.docs?.source}}},h=[`Default`,`Sizes`,`Colors`,`WithLabel`,`Overlay`]}))();export{f as Colors,u as Default,m as Overlay,d as Sizes,p as WithLabel,h as __namedExportsOrder,l as default};