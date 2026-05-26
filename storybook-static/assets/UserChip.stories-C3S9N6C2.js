import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{n,t as r}from"./Stack-1OCv9wQp.js";import{m as i,t as a}from"./MemberOnline-C0mdNYw5.js";import{o,s}from"./mockData-BVFEpkl-.js";var c,l,u,d,f,p;e((()=>{c=t(),r(),a(),s(),l={title:`Member Online / Target State / UserChip`,component:i,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`Avatar with initials (or photo) alongside the member name and number. Used in the desktop MemberHeader.`}}}},u={args:{user:o}},d={args:{user:o,iconOnly:!0}},f={render:()=>(0,c.jsxs)(n,{spacing:2,children:[(0,c.jsx)(i,{user:o}),(0,c.jsx)(i,{user:{name:`Jordan Lee`,memberNumber:`123456789`}}),(0,c.jsx)(i,{user:o,iconOnly:!0})]})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    user: MOCK_USER
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    user: MOCK_USER,
    iconOnly: true
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <Stack spacing={2}>\r
      <UserChip user={MOCK_USER} />\r
      <UserChip user={{
      name: 'Jordan Lee',
      memberNumber: '123456789'
    }} />\r
      <UserChip user={MOCK_USER} iconOnly />\r
    </Stack>
}`,...f.parameters?.docs?.source}}},p=[`Default`,`IconOnly`,`Variants`]}))();export{u as Default,d as IconOnly,f as Variants,p as __namedExportsOrder,l as default};