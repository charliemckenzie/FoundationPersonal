import{n as e}from"./chunk-vNrZSFDR.js";import{t}from"./jsx-runtime-BiDZswiL.js";import{i as n,n as r,r as i,t as a}from"./AlertTitle-DsOi5KLE.js";import{n as o,t as s}from"./Icon-BLoMXT7p.js";import{n as c,t as l}from"./Button-DynpKRmD.js";function u({severity:e,message:t,title:i,variant:a=`standard`,icon:o,action:c,onClose:l}){return(0,d.jsxs)(n,{severity:e,variant:a,icon:o===void 0?(0,d.jsx)(s,{icon:f[e],color:a===`filled`?`inherit`:e,size:`lg`}):o,action:c,onClose:l,children:[i&&(0,d.jsx)(r,{children:i}),t]})}var d,f,p=e((()=>{d=t(),i(),a(),o(),f={error:`alert_2`,warning:`alert_1`,info:`info_1`,success:`tick`},u.__docgenInfo={description:``,methods:[],displayName:`Alert`,props:{severity:{required:!0,tsType:{name:`union`,raw:`'error' | 'warning' | 'info' | 'success'`,elements:[{name:`literal`,value:`'error'`},{name:`literal`,value:`'warning'`},{name:`literal`,value:`'info'`},{name:`literal`,value:`'success'`}]},description:``},message:{required:!0,tsType:{name:`string`},description:``},title:{required:!1,tsType:{name:`string`},description:``},variant:{required:!1,tsType:{name:`union`,raw:`'standard' | 'filled' | 'outlined'`,elements:[{name:`literal`,value:`'standard'`},{name:`literal`,value:`'filled'`},{name:`literal`,value:`'outlined'`}]},description:``,defaultValue:{value:`'standard'`,computed:!1}},icon:{required:!1,tsType:{name:`union`,raw:`React.ReactNode | false`,elements:[{name:`ReactReactNode`,raw:`React.ReactNode`},{name:`literal`,value:`false`}]},description:``},action:{required:!1,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},onClose:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``}}}})),m,h,g,_,v,y,b,x,S;e((()=>{m=t(),p(),c(),h={title:`Components / Alert`,component:u,tags:[`autodocs`],parameters:{layout:`padded`},argTypes:{severity:{control:`select`,options:[`error`,`warning`,`info`,`success`]},variant:{control:`select`,options:[`standard`,`filled`,`outlined`,`no-icon`]}}},g={args:{severity:`info`,message:`This is an informational message.`}},_={render:()=>(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,m.jsx)(u,{severity:`error`,message:`Something went wrong. Please try again.`}),(0,m.jsx)(u,{severity:`warning`,message:`Your session will expire in 5 minutes.`}),(0,m.jsx)(u,{severity:`info`,message:`A new version is available.`}),(0,m.jsx)(u,{severity:`success`,message:`Your changes have been saved.`})]})},v={render:()=>(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,m.jsx)(u,{severity:`info`,variant:`standard`,message:`Standard variant.`}),(0,m.jsx)(u,{severity:`info`,variant:`filled`,message:`Filled variant.`}),(0,m.jsx)(u,{severity:`info`,variant:`outlined`,message:`Outlined variant.`})]})},y={render:()=>(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,m.jsx)(u,{severity:`error`,title:`Error`,message:`The form could not be submitted. Check the fields below.`}),(0,m.jsx)(u,{severity:`success`,title:`Saved`,message:`Your profile has been updated successfully.`})]})},b={args:{severity:`warning`,message:`This alert can be dismissed.`,onClose:()=>{}}},x={args:{severity:`info`,message:`A new version of the app is available.`,action:(0,m.jsx)(l,{label:`Refresh`,size:`small`,variant:`ghost`,color:`info`})}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'info',
    message: 'This is an informational message.'
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }}>\r
      <Alert severity="error" message="Something went wrong. Please try again." />\r
      <Alert severity="warning" message="Your session will expire in 5 minutes." />\r
      <Alert severity="info" message="A new version is available." />\r
      <Alert severity="success" message="Your changes have been saved." />\r
    </div>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }}>\r
      <Alert severity="info" variant="standard" message="Standard variant." />\r
      <Alert severity="info" variant="filled" message="Filled variant." />\r
      <Alert severity="info" variant="outlined" message="Outlined variant." />\r
    </div>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }}>\r
      <Alert severity="error" title="Error" message="The form could not be submitted. Check the fields below." />\r
      <Alert severity="success" title="Saved" message="Your profile has been updated successfully." />\r
    </div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'warning',
    message: 'This alert can be dismissed.',
    onClose: () => {}
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    severity: 'info',
    message: 'A new version of the app is available.',
    action: <Button label="Refresh" size="small" variant="ghost" color="info" />
  }
}`,...x.parameters?.docs?.source}}},S=[`Default`,`Severities`,`Variants`,`WithTitle`,`Closable`,`WithAction`]}))();export{b as Closable,g as Default,_ as Severities,v as Variants,x as WithAction,y as WithTitle,S as __namedExportsOrder,h as default};