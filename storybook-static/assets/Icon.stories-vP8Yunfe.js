import{n as e,o as t}from"./chunk-vNrZSFDR.js";import{t as n}from"./react-KkzZQhs-.js";import{t as r}from"./jsx-runtime-BiDZswiL.js";import{n as i,t as a}from"./Box-CHS_Iwe8.js";import{n as o,t as s}from"./Typography-DJ0wIq9h.js";import{n as c,t as l}from"./Icon-BLoMXT7p.js";import{n as u,t as d}from"./TextField-Ty4bEEke.js";import{i as f,n as p,r as m,t as h}from"./ToggleButtonGroup-CHxciwqQ.js";function g({style:e}){let[t,n]=(0,v.useState)(``),[r,a]=(0,v.useState)(e),s=t.trim()?y.filter(e=>e.toLowerCase().includes(t.toLowerCase())):y;return(0,_.jsxs)(i,{children:[(0,_.jsxs)(i,{sx:{display:`flex`,alignItems:`center`,justifyContent:`space-between`,gap:2,mb:2,flexWrap:`wrap`},children:[(0,_.jsx)(u,{placeholder:`Search icons...`,size:`small`,value:t,onChange:e=>n(e.target.value),sx:{width:280,maxWidth:`100%`},inputProps:{"aria-label":`Search icons`}}),(0,_.jsxs)(p,{exclusive:!0,value:r,onChange:(e,t)=>{t&&a(t)},"aria-label":`Icon style`,sx:{ml:`auto`},children:[(0,_.jsx)(f,{value:`solid`,"aria-label":`Solid icons`,children:`Solid`}),(0,_.jsx)(f,{value:`light`,"aria-label":`Light icons`,children:`Light`})]})]}),(0,_.jsxs)(o,{variant:`body2`,sx:{mb:3,color:`text.secondary`},children:[s.length,` of `,y.length,` icons`]}),(0,_.jsx)(i,{sx:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(120px, 1fr))`,gap:2},children:s.map(e=>(0,_.jsxs)(i,{sx:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:1,p:2,border:`1px solid`,borderColor:`divider`,borderRadius:1,textAlign:`center`},children:[(0,_.jsx)(l,{icon:e,style:r,size:`lg`}),(0,_.jsx)(o,{variant:`caption`,sx:{wordBreak:`break-word`,lineHeight:1.3,color:`text.secondary`},children:e})]},e))})]})}var _,v,y,b,x,S,C,w,T;e((()=>{_=r(),c(),a(),s(),d(),m(),h(),v=t(n()),y=[`arrow-up-right`,`chevron-down`,`chevron-left`,`chevron-right`,`chevron-up`,`circle-info`,`house`,`plus`],b={title:`Components / Icons / Icon`,component:l,tags:[`autodocs`],parameters:{layout:`padded`},argTypes:{icon:{control:`text`,description:`Local icon name without .svg extension.`},style:{control:`select`,options:[`solid`,`regular`,`light`,`thin`,`duotone`,`sharp`],description:`Uses Font Awesome local icons. Solid and light map to distinct assets.`},size:{control:`select`,options:[`sm`,`md`,`lg`,`xl`,`2xl`,`3xl`]},color:{control:`select`,options:[`inherit`,`primary`,`secondary`,`error`,`warning`,`info`,`success`,`text.primary`,`text.muted`,`text.disabled`]}}},x={args:{icon:`house`,size:`md`,color:`inherit`}},S={render:()=>(0,_.jsxs)(i,{sx:{display:`flex`,alignItems:`center`,gap:3},children:[(0,_.jsxs)(i,{sx:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:1},children:[(0,_.jsx)(l,{icon:`plus`,size:`sm`}),(0,_.jsx)(o,{variant:`small`,children:`sm (14px)`})]}),(0,_.jsxs)(i,{sx:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:1},children:[(0,_.jsx)(l,{icon:`plus`,size:`md`}),(0,_.jsx)(o,{variant:`small`,children:`md (16px)`})]}),(0,_.jsxs)(i,{sx:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:1},children:[(0,_.jsx)(l,{icon:`plus`,size:`lg`}),(0,_.jsx)(o,{variant:`small`,children:`lg (20px)`})]}),(0,_.jsxs)(i,{sx:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:1},children:[(0,_.jsx)(l,{icon:`plus`,size:`xl`}),(0,_.jsx)(o,{variant:`small`,children:`xl (24px)`})]}),(0,_.jsxs)(i,{sx:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:1},children:[(0,_.jsx)(l,{icon:`plus`,size:`2xl`}),(0,_.jsx)(o,{variant:`small`,children:`2xl (32px)`})]}),(0,_.jsxs)(i,{sx:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:1},children:[(0,_.jsx)(l,{icon:`plus`,size:`3xl`}),(0,_.jsx)(o,{variant:`small`,children:`3xl (40px)`})]})]})},C={args:{icon:`circle-info`,"aria-label":`Information`}},w={args:{style:`solid`},render:e=>(0,_.jsx)(g,{style:e.style===`light`?`light`:`solid`}),parameters:{controls:{include:[`style`]}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    icon: 'house',
    size: 'md',
    color: 'inherit'
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    display: 'flex',
    alignItems: 'center',
    gap: 3
  }}>\r
      <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1
    }}>\r
        <Icon icon="plus" size="sm" />\r
        <Typography variant="small">sm (14px)</Typography>\r
      </Box>\r
      <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1
    }}>\r
        <Icon icon="plus" size="md" />\r
        <Typography variant="small">md (16px)</Typography>\r
      </Box>\r
      <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1
    }}>\r
        <Icon icon="plus" size="lg" />\r
        <Typography variant="small">lg (20px)</Typography>\r
      </Box>\r
      <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1
    }}>\r
        <Icon icon="plus" size="xl" />\r
        <Typography variant="small">xl (24px)</Typography>\r
      </Box>\r
      <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1
    }}>\r
        <Icon icon="plus" size="2xl" />\r
        <Typography variant="small">2xl (32px)</Typography>\r
      </Box>\r
      <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 1
    }}>\r
        <Icon icon="plus" size="3xl" />\r
        <Typography variant="small">3xl (40px)</Typography>\r
      </Box>\r
    </Box>
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    icon: 'circle-info',
    'aria-label': 'Information'
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    style: 'solid'
  },
  render: args => <GalleryRender style={args.style === 'light' ? 'light' : 'solid'} />,
  parameters: {
    controls: {
      include: ['style']
    }
  }
}`,...w.parameters?.docs?.source}}},T=[`Default`,`Sizes`,`WithAriaLabel`,`Gallery`]}))();export{x as Default,w as Gallery,S as Sizes,C as WithAriaLabel,T as __namedExportsOrder,b as default};