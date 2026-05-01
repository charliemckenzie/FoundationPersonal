import{n as e}from"./chunk-vNrZSFDR.js";import{t}from"./jsx-runtime-BiDZswiL.js";import{a as n,n as r,o as i,t as a}from"./FormHelperText-BE9lMToM.js";import{n as o,t as s}from"./FormControlLabel-Cs7g70W4.js";import{n as c,t as l}from"./Switch-Bg1uPMoN.js";function u({label:e,checked:t,defaultChecked:n,color:a=`primary`,size:s=`medium`,labelPlacement:l=`end`,helperText:u,error:f=!1,disabled:p=!1,required:m=!1,onChange:h,id:g,name:_}){return(0,d.jsxs)(i,{error:f,disabled:p,required:m,children:[(0,d.jsx)(o,{labelPlacement:l,label:e,control:(0,d.jsx)(c,{checked:t,defaultChecked:n,color:a,size:s,id:g,name:_,onChange:e=>h?.(e.target.checked)})}),u&&(0,d.jsx)(r,{role:f?`alert`:void 0,children:u})]})}var d,f=e((()=>{d=t(),l(),s(),n(),a(),u.__docgenInfo={description:``,methods:[],displayName:`Switch`,props:{label:{required:!0,tsType:{name:`string`},description:``},checked:{required:!1,tsType:{name:`boolean`},description:``},defaultChecked:{required:!1,tsType:{name:`boolean`},description:``},color:{required:!1,tsType:{name:`union`,raw:`'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'default'`,elements:[{name:`literal`,value:`'primary'`},{name:`literal`,value:`'secondary'`},{name:`literal`,value:`'error'`},{name:`literal`,value:`'warning'`},{name:`literal`,value:`'info'`},{name:`literal`,value:`'success'`},{name:`literal`,value:`'default'`}]},description:``,defaultValue:{value:`'primary'`,computed:!1}},size:{required:!1,tsType:{name:`union`,raw:`'small' | 'medium'`,elements:[{name:`literal`,value:`'small'`},{name:`literal`,value:`'medium'`}]},description:``,defaultValue:{value:`'medium'`,computed:!1}},labelPlacement:{required:!1,tsType:{name:`union`,raw:`'end' | 'start' | 'top' | 'bottom'`,elements:[{name:`literal`,value:`'end'`},{name:`literal`,value:`'start'`},{name:`literal`,value:`'top'`},{name:`literal`,value:`'bottom'`}]},description:``,defaultValue:{value:`'end'`,computed:!1}},helperText:{required:!1,tsType:{name:`string`},description:``},error:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},required:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(checked: boolean) => void`,signature:{arguments:[{type:{name:`boolean`},name:`checked`}],return:{name:`void`}}},description:``},id:{required:!1,tsType:{name:`string`},description:``},name:{required:!1,tsType:{name:`string`},description:``}}}})),p,m,h,g,_,v,y,b,x;e((()=>{p=t(),f(),m={title:`Form Components / Switch`,component:u,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{color:{control:`select`,options:[`default`,`primary`,`secondary`,`error`,`warning`,`info`,`success`]},size:{control:`select`,options:[`small`,`medium`]},labelPlacement:{control:`select`,options:[`end`,`start`,`top`,`bottom`]}}},h={args:{label:`Enable notifications`}},g={args:{label:`Enabled`,checked:!0}},_={render:()=>(0,p.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,p.jsx)(u,{label:`Small`,size:`small`,defaultChecked:!0}),(0,p.jsx)(u,{label:`Medium`,size:`medium`,defaultChecked:!0})]})},v={render:()=>(0,p.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,p.jsx)(u,{label:`Primary`,color:`primary`,defaultChecked:!0}),(0,p.jsx)(u,{label:`Secondary`,color:`secondary`,defaultChecked:!0}),(0,p.jsx)(u,{label:`Error`,color:`error`,defaultChecked:!0}),(0,p.jsx)(u,{label:`Success`,color:`success`,defaultChecked:!0})]})},y={args:{label:`Dark mode`,helperText:`Applies immediately across the app.`}},b={render:()=>(0,p.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,p.jsx)(u,{label:`Disabled off`,disabled:!0}),(0,p.jsx)(u,{label:`Disabled on`,disabled:!0,defaultChecked:!0})]})},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Enable notifications'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Enabled',
    checked: true
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  }}>\r
      <Switch label="Small" size="small" defaultChecked />\r
      <Switch label="Medium" size="medium" defaultChecked />\r
    </div>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  }}>\r
      <Switch label="Primary" color="primary" defaultChecked />\r
      <Switch label="Secondary" color="secondary" defaultChecked />\r
      <Switch label="Error" color="error" defaultChecked />\r
      <Switch label="Success" color="success" defaultChecked />\r
    </div>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Dark mode',
    helperText: 'Applies immediately across the app.'
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  }}>\r
      <Switch label="Disabled off" disabled />\r
      <Switch label="Disabled on" disabled defaultChecked />\r
    </div>
}`,...b.parameters?.docs?.source}}},x=[`Default`,`Checked`,`Sizes`,`Colors`,`WithHelperText`,`Disabled`]}))();export{g as Checked,v as Colors,h as Default,b as Disabled,_ as Sizes,y as WithHelperText,x as __namedExportsOrder,m as default};