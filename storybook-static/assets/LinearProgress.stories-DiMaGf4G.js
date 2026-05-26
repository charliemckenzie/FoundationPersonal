import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{n,t as r}from"./Typography-ChsBGyM_.js";import{n as i,t as a}from"./Box-Cj6TI_Dr.js";import{n as o,t as s}from"./LinearProgress-CkRl_pIf.js";var c,l,u,d,f,p;e((()=>{c=t(),a(),r(),o(),l={title:`Components / Loading Indicators / LinearProgress`,component:s,tags:[`autodocs`],parameters:{layout:`padded`},argTypes:{variant:{control:`select`,options:[`determinate`,`indeterminate`,`buffer`,`query`]},value:{control:{type:`range`,min:0,max:100}},label:{control:`text`}}},u={},d={args:{variant:`determinate`,value:65}},f={render:()=>(0,c.jsxs)(i,{sx:{maxWidth:`28rem`},children:[(0,c.jsxs)(i,{sx:{display:`flex`,justifyContent:`space-between`,mb:1},children:[(0,c.jsx)(n,{variant:`small`,color:`text.muted`,children:`Step 3 of 5`}),(0,c.jsx)(n,{variant:`small`,color:`text.muted`,children:`60%`})]}),(0,c.jsx)(s,{variant:`determinate`,value:60,label:`Form progress: step 3 of 5`})]})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'determinate',
    value: 65
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    maxWidth: '28rem'
  }}>\r
      <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      mb: 1
    }}>\r
        <Typography variant="small" color="text.muted">Step 3 of 5</Typography>\r
        <Typography variant="small" color="text.muted">60%</Typography>\r
      </Box>\r
      <LinearProgress variant="determinate" value={60} label="Form progress: step 3 of 5" />\r
    </Box>
}`,...f.parameters?.docs?.source}}},p=[`Default`,`Determinate`,`StepProgress`]}))();export{u as Default,d as Determinate,f as StepProgress,p as __namedExportsOrder,l as default};