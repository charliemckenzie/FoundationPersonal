import{n as e,s as t}from"./chunk-Bj-mKKzh.js";import{t as n}from"./react-DVKR3yZN.js";import{t as r}from"./jsx-runtime-CyI9ICYU.js";import{n as i,t as a}from"./Typography-ChsBGyM_.js";import{n as o,t as s}from"./Box-Cj6TI_Dr.js";import{n as c,t as l}from"./Icon-IHyqCtZq.js";import{n as u,t as d}from"./TextField-BAuwYXsz.js";import{i as f,n as p,r as m,t as h}from"./ToggleButtonGroup-B8755VNI.js";function g({style:e}){let[t,n]=(0,v.useState)(``),[r,a]=(0,v.useState)(e),s=r===`regular`?b:y,c=t.trim()?s.filter(e=>e.toLowerCase().includes(t.toLowerCase())):s;return(0,_.jsxs)(o,{children:[(0,_.jsxs)(o,{sx:{display:`flex`,alignItems:`center`,justifyContent:`space-between`,gap:2,mb:2,flexWrap:`wrap`},children:[(0,_.jsx)(u,{placeholder:`Search icons...`,size:`small`,value:t,onChange:e=>n(e.target.value),sx:{width:280,maxWidth:`100%`},slotProps:{input:{"aria-label":`Search icons`}}}),(0,_.jsxs)(p,{exclusive:!0,value:r,onChange:(e,t)=>{t&&a(t)},"aria-label":`Icon style`,sx:{ml:`auto`},children:[(0,_.jsx)(f,{value:`solid`,"aria-label":`Solid icons`,children:`Solid`}),(0,_.jsx)(f,{value:`regular`,"aria-label":`Regular icons`,children:`Regular`}),(0,_.jsx)(f,{value:`light`,"aria-label":`Light icons`,children:`Light`})]})]}),(0,_.jsxs)(i,{variant:`body`,sx:{mb:3,color:`text.secondary`},children:[c.length,` of `,s.length,` icons`]}),(0,_.jsx)(o,{sx:{display:`grid`,gridTemplateColumns:`repeat(auto-fill, minmax(120px, 1fr))`,gap:2},children:c.map(e=>(0,_.jsxs)(o,{sx:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:1,p:2,border:`1px solid`,borderColor:`divider`,borderRadius:1,textAlign:`center`},children:[(0,_.jsx)(l,{icon:e,style:r,size:`lg`}),(0,_.jsx)(i,{variant:`small`,sx:{wordBreak:`break-word`,lineHeight:1.3,color:`text.secondary`},children:e})]},e))})]})}var _,v,y,b,x,S,C,w,T,E;e((()=>{_=r(),c(),s(),a(),d(),m(),h(),v=t(n()),y=`arrow-down.arrow-down-to-line.arrow-left.arrow-left-arrow-right.arrow-right.arrow-right-to-bracket.arrow-up.arrow-up-from-line.arrow-up-right.arrows-up-down.bars.book-open-lines.calendar.chart-column.chart-line.chart-pie.chart-pie-simple.check.cloud-arrow-up.copy.chevron-down.chevron-left.chevron-right.chevron-up.circle-check.circle-dashed.circle-dollar.circle-exclamation.circle-info.circle-minus.circle-plus.circle-question.ellipsis.facebook-f-brands.gift.house.instagram-brands.key.linkedin-in-brands.lock.magnifying-glass.magnifying-glass-dollar.minus.money-in.money-out.moon.phone-sharp.piggy-bank.plus.question.sun-bright.trash.triangle-exclamation.umbrella.xmark.youtube-brands.no0.no1.no2.no3.no4.no5.no6.no7.no8.no9`.split(`.`),b=`arrow-down.arrow-down-to-line.arrow-left.arrow-left-arrow-right.arrow-right.arrow-right-to-bracket.arrow-up.arrow-up-from-line.arrow-up-right.arrows-up-down.bars.book-open-lines.calendar.chart-column.chart-line.chart-pie.chart-pie-simple.check.chevron-down.chevron-left.chevron-right.chevron-up.circle-check.circle-dashed.circle-dollar.circle-exclamation.circle-info.circle-minus.circle-plus.circle-question.cloud-arrow-up.copy.ellipsis.gift.house.key.lock.magnifying-glass.magnifying-glass-dollar.minus.money-in.money-out.moon.piggy-bank.plus.question.sun-bright.trash.triangle-exclamation.umbrella.xmark`.split(`.`),x={title:`Components / Icons / Icon`,component:l,tags:[`autodocs`],parameters:{layout:`padded`},argTypes:{icon:{control:`text`,description:`Local icon name without .svg extension.`},style:{control:`select`,options:[`solid`,`regular`,`light`,`thin`,`duotone`,`sharp`],description:`Uses Font Awesome local icons. Solid and light map to distinct assets.`},size:{control:`select`,options:[`sm`,`md`,`lg`,`xl`,`2xl`,`3xl`]},color:{control:`select`,options:[`inherit`,`primary`,`secondary`,`error`,`warning`,`info`,`success`,`text.primary`,`text.muted`,`text.disabled`]}}},S={args:{icon:`house`,size:`md`,color:`inherit`}},C={render:()=>(0,_.jsxs)(o,{sx:{display:`flex`,alignItems:`center`,gap:3},children:[(0,_.jsxs)(o,{sx:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:1},children:[(0,_.jsx)(l,{icon:`plus`,size:`sm`}),(0,_.jsx)(i,{variant:`small`,children:`sm (14px)`})]}),(0,_.jsxs)(o,{sx:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:1},children:[(0,_.jsx)(l,{icon:`plus`,size:`md`}),(0,_.jsx)(i,{variant:`small`,children:`md (16px)`})]}),(0,_.jsxs)(o,{sx:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:1},children:[(0,_.jsx)(l,{icon:`plus`,size:`lg`}),(0,_.jsx)(i,{variant:`small`,children:`lg (20px)`})]}),(0,_.jsxs)(o,{sx:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:1},children:[(0,_.jsx)(l,{icon:`plus`,size:`xl`}),(0,_.jsx)(i,{variant:`small`,children:`xl (24px)`})]}),(0,_.jsxs)(o,{sx:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:1},children:[(0,_.jsx)(l,{icon:`plus`,size:`2xl`}),(0,_.jsx)(i,{variant:`small`,children:`2xl (32px)`})]}),(0,_.jsxs)(o,{sx:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:1},children:[(0,_.jsx)(l,{icon:`plus`,size:`3xl`}),(0,_.jsx)(i,{variant:`small`,children:`3xl (40px)`})]})]})},w={args:{icon:`circle-info`,"aria-label":`Information`}},T={args:{style:`solid`},render:e=>(0,_.jsx)(g,{style:e.style===`light`?`light`:e.style===`regular`?`regular`:`solid`}),parameters:{controls:{include:[`style`]}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    icon: 'house',
    size: 'md',
    color: 'inherit'
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    icon: 'circle-info',
    'aria-label': 'Information'
  }
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    style: 'solid'
  },
  render: args => {
    const style = args.style === 'light' ? 'light' : args.style === 'regular' ? 'regular' : 'solid';
    return <GalleryRender style={style} />;
  },
  parameters: {
    controls: {
      include: ['style']
    }
  }
}`,...T.parameters?.docs?.source}}},E=[`Default`,`Sizes`,`WithAriaLabel`,`Gallery`]}))();export{S as Default,T as Gallery,C as Sizes,w as WithAriaLabel,E as __namedExportsOrder,x as default};