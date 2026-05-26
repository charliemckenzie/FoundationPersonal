import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{n,t as r}from"./Typography-ChsBGyM_.js";import{n as i,t as a}from"./Box-Cj6TI_Dr.js";import{n as o,t as s}from"./Skeleton-BGWumqgW.js";var c,l,u,d,f,p,m;e((()=>{c=t(),a(),r(),o(),l={title:`Components / Skeleton`,component:s,tags:[`autodocs`],parameters:{layout:`padded`},argTypes:{variant:{control:`select`,options:[`text`,`circular`,`rectangular`,`rounded`]},animation:{control:`select`,options:[`pulse`,`wave`,!1]},width:{control:`text`},height:{control:`text`}}},u={args:{variant:`text`,width:`80%`}},d={render:()=>(0,c.jsxs)(i,{sx:{display:`flex`,gap:4,alignItems:`center`,flexWrap:`wrap`},children:[(0,c.jsxs)(i,{sx:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:1},children:[(0,c.jsx)(s,{variant:`text`,width:`8rem`}),(0,c.jsx)(n,{variant:`small`,color:`text.muted`,children:`text`})]}),(0,c.jsxs)(i,{sx:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:1},children:[(0,c.jsx)(s,{variant:`circular`,width:`3rem`,height:`3rem`}),(0,c.jsx)(n,{variant:`small`,color:`text.muted`,children:`circular`})]}),(0,c.jsxs)(i,{sx:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:1},children:[(0,c.jsx)(s,{variant:`rectangular`,width:`8rem`,height:`4rem`}),(0,c.jsx)(n,{variant:`small`,color:`text.muted`,children:`rectangular`})]}),(0,c.jsxs)(i,{sx:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:1},children:[(0,c.jsx)(s,{variant:`rounded`,width:`8rem`,height:`4rem`}),(0,c.jsx)(n,{variant:`small`,color:`text.muted`,children:`rounded`})]})]})},f={render:()=>(0,c.jsx)(i,{sx:{display:`flex`,flexDirection:`column`,gap:3},children:[`pulse`,`wave`,!1].map(e=>(0,c.jsxs)(i,{children:[(0,c.jsx)(n,{variant:`small`,color:`text.muted`,sx:{mb:.5},children:String(e)}),(0,c.jsx)(s,{variant:`text`,width:`60%`,animation:e})]},String(e)))})},p={render:()=>(0,c.jsxs)(i,{sx:{p:2,border:1,borderColor:`border.default`,borderRadius:2,maxWidth:`24rem`},children:[(0,c.jsxs)(i,{sx:{display:`flex`,alignItems:`center`,gap:2,mb:2},children:[(0,c.jsx)(s,{variant:`circular`,width:`2.5rem`,height:`2.5rem`}),(0,c.jsxs)(i,{sx:{flex:1},children:[(0,c.jsx)(s,{variant:`text`,width:`60%`}),(0,c.jsx)(s,{variant:`text`,width:`40%`})]})]}),(0,c.jsx)(s,{variant:`rounded`,height:`8rem`,sx:{mb:2}}),(0,c.jsx)(s,{variant:`text`}),(0,c.jsx)(s,{variant:`text`}),(0,c.jsx)(s,{variant:`text`,width:`80%`})]})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'text',
    width: '80%'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    display: 'flex',
    gap: 4,
    alignItems: 'center',
    flexWrap: 'wrap'
  }}>\r
      <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1
    }}>\r
        <Skeleton variant="text" width="8rem" />\r
        <Typography variant="small" color="text.muted">text</Typography>\r
      </Box>\r
      <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1
    }}>\r
        <Skeleton variant="circular" width="3rem" height="3rem" />\r
        <Typography variant="small" color="text.muted">circular</Typography>\r
      </Box>\r
      <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1
    }}>\r
        <Skeleton variant="rectangular" width="8rem" height="4rem" />\r
        <Typography variant="small" color="text.muted">rectangular</Typography>\r
      </Box>\r
      <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1
    }}>\r
        <Skeleton variant="rounded" width="8rem" height="4rem" />\r
        <Typography variant="small" color="text.muted">rounded</Typography>\r
      </Box>\r
    </Box>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 3
  }}>\r
      {(['pulse', 'wave', false] as const).map(animation => <Box key={String(animation)}>\r
          <Typography variant="small" color="text.muted" sx={{
        mb: 0.5
      }}>\r
            {String(animation)}\r
          </Typography>\r
          <Skeleton variant="text" width="60%" animation={animation} />\r
        </Box>)}\r
    </Box>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    p: 2,
    border: 1,
    borderColor: 'border.default',
    borderRadius: 2,
    maxWidth: '24rem'
  }}>\r
      <Box sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      mb: 2
    }}>\r
        <Skeleton variant="circular" width="2.5rem" height="2.5rem" />\r
        <Box sx={{
        flex: 1
      }}>\r
          <Skeleton variant="text" width="60%" />\r
          <Skeleton variant="text" width="40%" />\r
        </Box>\r
      </Box>\r
      <Skeleton variant="rounded" height="8rem" sx={{
      mb: 2
    }} />\r
      <Skeleton variant="text" />\r
      <Skeleton variant="text" />\r
      <Skeleton variant="text" width="80%" />\r
    </Box>
}`,...p.parameters?.docs?.source}}},m=[`Default`,`Variants`,`Animations`,`CardPlaceholder`]}))();export{f as Animations,p as CardPlaceholder,u as Default,d as Variants,m as __namedExportsOrder,l as default};