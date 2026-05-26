import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{n,t as r}from"./Typography-ChsBGyM_.js";import{n as i,t as a}from"./Box-Cj6TI_Dr.js";import{n as o,t as s}from"./Icon-IHyqCtZq.js";function c({links:e=u}){return(0,l.jsx)(i,{component:`nav`,"aria-label":`Skip links`,sx:{position:`fixed`,top:`2.5rem`,left:`2.5rem`,zIndex:e=>e.zIndex.skipLink,display:`flex`,flexDirection:`column`,gap:.5,pointerEvents:`none`},children:e.map(({label:e,targetId:t,icon:n})=>(0,l.jsxs)(i,{component:`a`,href:`#${t}`,sx:{display:`flex`,alignItems:`center`,minWidth:`19.6875rem`,bgcolor:`background.paper`,color:`primary.main`,textDecoration:`none !important`,border:`2px solid`,borderColor:`primary.main`,borderRadius:`0.5rem`,fontWeight:700,fontSize:`0.875rem`,lineHeight:1.5,overflow:`hidden`,pointerEvents:`none`,transform:`translateX(calc(-100% - 3rem))`,transition:`transform 0.15s ease`,"&:focus":{pointerEvents:`auto`,transform:`translateX(0)`,outline:`3px solid`,outlineColor:`border.focus`,outlineOffset:`3px`}},children:[n?(0,l.jsx)(i,{"aria-hidden":`true`,sx:{display:`flex`,alignItems:`center`,justifyContent:`center`,px:2,py:2.5,borderRight:`1px solid`,borderColor:`divider`,color:`primary.main`},children:(0,l.jsx)(s,{icon:n,size:`xl`})}):null,(0,l.jsx)(i,{sx:{flex:1,px:2},children:e}),(0,l.jsxs)(i,{"aria-hidden":`true`,sx:{display:`flex`,flexDirection:`column`,alignItems:`center`,pr:1.5,fontSize:`0.6875rem`,color:`text.muted`,lineHeight:1.2,userSelect:`none`},children:[(0,l.jsx)(i,{component:`span`,sx:{fontSize:`1rem`,lineHeight:1},children:`↩`}),(0,l.jsx)(i,{component:`span`,children:`ENTER`})]})]},t))})}var l,u,d=e((()=>{l=t(),a(),o(),u=[{label:`Skip to main content`,targetId:`main-content`,icon:`house`},{label:`Skip to navigation`,targetId:`main-nav`,icon:`bars`},{label:`Skip to footer`,targetId:`footer`,icon:`arrow-down-to-line`}],c.__docgenInfo={description:``,methods:[],displayName:`SkipLinks`,props:{links:{required:!1,tsType:{name:`Array`,elements:[{name:`SkipLink`}],raw:`SkipLink[]`},description:``,defaultValue:{value:`[\r
  { label: 'Skip to main content', targetId: 'main-content', icon: 'house' },\r
  { label: 'Skip to navigation', targetId: 'main-nav', icon: 'bars' },\r
  { label: 'Skip to footer', targetId: 'footer', icon: 'arrow-down-to-line' },\r
]`,computed:!1}}}}})),f,p,m,h,g,_,v;e((()=>{f=t(),a(),r(),d(),p={title:`Accessibility / SkipLinks`,component:c,tags:[`autodocs`],parameters:{layout:`fullscreen`,docs:{description:{component:"Visually hidden navigation landmarks that appear when focused via keyboard. Must be the first focusable element on the page — rendered in `layout.tsx` before all other content. Tab into this story to see the links appear."}}},argTypes:{links:{description:"Array of skip link targets. Each entry needs a `label` (visible text), a `targetId` (the `id` attribute on the landmark element), and an optional `icon` (FontAwesome icon name). Defaults to main content, navigation, and footer.",control:`object`,table:{type:{summary:`SkipLink[]`}}}}},m={name:`Default (tab to reveal)`,render:()=>(0,f.jsxs)(i,{sx:{position:`relative`,minHeight:120,bgcolor:`background.default`},children:[(0,f.jsx)(c,{}),(0,f.jsx)(i,{sx:{p:4},children:(0,f.jsx)(n,{variant:`body`,sx:{color:`text.muted`},children:`Tab into this canvas to reveal the skip links.`})})]})},h=[{label:`Skip to main content`,targetId:`main-content`,icon:`house`},{label:`Skip to navigation`,targetId:`main-nav`,icon:`bars`},{label:`Skip to footer`,targetId:`footer`,icon:`arrow-down-to-line`}],g={name:`Visible (design review)`,parameters:{docs:{description:{story:`Forces links into their revealed state for design review. In production they are hidden until focused via keyboard.`}}},render:()=>(0,f.jsx)(i,{sx:{minHeight:300,bgcolor:`background.default`,"& nav a":{transform:`translateX(0) !important`}},children:(0,f.jsx)(c,{links:h})})},_={name:`Custom links`,args:{links:[{label:`Skip to main content`,targetId:`main-content`,icon:`house`},{label:`Skip to navigation`,targetId:`main-nav`,icon:`bars`}]},render:e=>(0,f.jsxs)(i,{sx:{position:`relative`,minHeight:120,bgcolor:`background.default`},children:[(0,f.jsx)(c,{...e}),(0,f.jsx)(i,{sx:{p:4},children:(0,f.jsx)(n,{variant:`body`,sx:{color:`text.muted`},children:`Tab into this canvas to reveal the skip links.`})})]})},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Default (tab to reveal)',
  render: () => <Box sx={{
    position: 'relative',
    minHeight: 120,
    bgcolor: 'background.default'
  }}>\r
      <SkipLinks />\r
      <Box sx={{
      p: 4
    }}>\r
        <Typography variant="body" sx={{
        color: 'text.muted'
      }}>\r
          Tab into this canvas to reveal the skip links.\r
        </Typography>\r
      </Box>\r
    </Box>
}`,...m.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Visible (design review)',
  parameters: {
    docs: {
      description: {
        story: 'Forces links into their revealed state for design review. In production they are hidden until focused via keyboard.'
      }
    }
  },
  render: () => <Box sx={{
    minHeight: 300,
    bgcolor: 'background.default',
    // Override the translate so cards are always visible
    '& nav a': {
      transform: 'translateX(0) !important'
    }
  }}>\r
      <SkipLinks links={VISIBLE_LINKS} />\r
    </Box>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Custom links',
  args: {
    links: [{
      label: 'Skip to main content',
      targetId: 'main-content',
      icon: 'house'
    }, {
      label: 'Skip to navigation',
      targetId: 'main-nav',
      icon: 'bars'
    }]
  },
  render: args => <Box sx={{
    position: 'relative',
    minHeight: 120,
    bgcolor: 'background.default'
  }}>\r
      <SkipLinks {...args} />\r
      <Box sx={{
      p: 4
    }}>\r
        <Typography variant="body" sx={{
        color: 'text.muted'
      }}>\r
          Tab into this canvas to reveal the skip links.\r
        </Typography>\r
      </Box>\r
    </Box>
}`,..._.parameters?.docs?.source}}},v=[`Default`,`Visible`,`Custom`]}))();export{_ as Custom,m as Default,g as Visible,v as __namedExportsOrder,p as default};