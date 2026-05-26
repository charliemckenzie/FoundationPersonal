import{n as e,s as t}from"./chunk-Bj-mKKzh.js";import{t as n}from"./react-DVKR3yZN.js";import{t as r}from"./jsx-runtime-CyI9ICYU.js";import{n as i,t as a}from"./Box-Cj6TI_Dr.js";import{d as o,t as s}from"./MemberOnline-C0mdNYw5.js";function c({iconOnly:e=!1,size:t=`small`}){let[n,r]=(0,u.useState)(`light`);return(0,l.jsx)(o,{mode:n,onChange:r,iconOnly:e,size:t})}var l,u,d,f,p,m,h;e((()=>{l=r(),u=t(n()),a(),s(),d={title:`Member Online / Target State / ThemeSwitcher`,component:o,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:"Segmented control for switching between light and dark mode. Controlled — the host owns the `mode` value. Used in MemberHeader and MobileNavDrawer."}}}},f={render:()=>(0,l.jsx)(c,{})},p={render:()=>(0,l.jsx)(c,{iconOnly:!0})},m={render:()=>(0,l.jsxs)(i,{sx:{display:`flex`,flexDirection:`column`,alignItems:`flex-start`,gap:2},children:[(0,l.jsx)(c,{size:`small`}),(0,l.jsx)(c,{size:`medium`})]})},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <Demo />
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => <Demo iconOnly />
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 2
  }}>\r
      <Demo size="small" />\r
      <Demo size="medium" />\r
    </Box>
}`,...m.parameters?.docs?.source}}},h=[`Default`,`IconOnly`,`Sizes`]}))();export{f as Default,p as IconOnly,m as Sizes,h as __namedExportsOrder,d as default};