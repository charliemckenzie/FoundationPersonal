import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{n,t as r}from"./Box-Cj6TI_Dr.js";import{g as i,t as a}from"./MemberOnline-C0mdNYw5.js";var o,s,c,l,u,d,f,p;e((()=>{o=t(),r(),a(),s={title:`Member Online / Target State / NavItem`,component:i,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`A single nav row with icon, label, optional trailing chevron, and active treatment. Used inside the SideNav, MobileNavDrawer, and any list-style navigation.`}}},argTypes:{variant:{control:`inline-radio`,options:[`primary`,`secondary`]},size:{control:`inline-radio`,options:[`medium`,`large`]},active:{control:`boolean`},hasChildren:{control:`boolean`}}},c={args:{label:`Home`,icon:`house`,variant:`primary`},decorators:[e=>(0,o.jsx)(n,{sx:{width:`16rem`},children:(0,o.jsx)(e,{})})]},l={args:{label:`Home`,icon:`house`,active:!0,variant:`primary`},decorators:[e=>(0,o.jsx)(n,{sx:{width:`16rem`},children:(0,o.jsx)(e,{})})]},u={args:{label:`Transactions`,icon:`arrow-left-arrow-right`,hasChildren:!0},decorators:[e=>(0,o.jsx)(n,{sx:{width:`16rem`},children:(0,o.jsx)(e,{})})]},d={args:{label:`Help & contact`,variant:`secondary`},decorators:[e=>(0,o.jsx)(n,{sx:{width:`16rem`},children:(0,o.jsx)(e,{})})]},f={render:()=>(0,o.jsxs)(n,{sx:{width:`16rem`,display:`flex`,flexDirection:`column`},children:[(0,o.jsx)(i,{label:`Home`,icon:`house`}),(0,o.jsx)(i,{label:`Home`,icon:`house`,active:!0}),(0,o.jsx)(i,{label:`Transactions`,icon:`arrow-left-arrow-right`,hasChildren:!0}),(0,o.jsx)(i,{label:`Insurance`,icon:`umbrella`}),(0,o.jsx)(i,{label:`Help & contact`,variant:`secondary`}),(0,o.jsx)(i,{label:`Profile`,variant:`secondary`,active:!0})]})},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Home',
    icon: 'house',
    variant: 'primary'
  },
  decorators: [Story => <Box sx={{
    width: '16rem'
  }}><Story /></Box>]
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Home',
    icon: 'house',
    active: true,
    variant: 'primary'
  },
  decorators: [Story => <Box sx={{
    width: '16rem'
  }}><Story /></Box>]
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Transactions',
    icon: 'arrow-left-arrow-right',
    hasChildren: true
  },
  decorators: [Story => <Box sx={{
    width: '16rem'
  }}><Story /></Box>]
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Help & contact',
    variant: 'secondary'
  },
  decorators: [Story => <Box sx={{
    width: '16rem'
  }}><Story /></Box>]
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    width: '16rem',
    display: 'flex',
    flexDirection: 'column'
  }}>\r
      <NavItem label="Home" icon="house" />\r
      <NavItem label="Home" icon="house" active />\r
      <NavItem label="Transactions" icon="arrow-left-arrow-right" hasChildren />\r
      <NavItem label="Insurance" icon="umbrella" />\r
      <NavItem label="Help & contact" variant="secondary" />\r
      <NavItem label="Profile" variant="secondary" active />\r
    </Box>
}`,...f.parameters?.docs?.source}}},p=[`Default`,`Active`,`WithChildren`,`Secondary`,`AllStates`]}))();export{l as Active,f as AllStates,c as Default,d as Secondary,u as WithChildren,p as __namedExportsOrder,s as default};