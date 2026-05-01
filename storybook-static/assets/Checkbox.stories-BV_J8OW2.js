import{n as e}from"./chunk-vNrZSFDR.js";import{t}from"./jsx-runtime-BiDZswiL.js";import{a as n,n as r,o as i,t as a}from"./FormHelperText-BE9lMToM.js";import{n as o,t as s}from"./FormControlLabel-Cs7g70W4.js";import{n as c,t as l}from"./Checkbox-Ig7wfpSE.js";function u({label:e,checked:t,defaultChecked:n,indeterminate:a=!1,color:s=`primary`,size:l=`medium`,labelPlacement:u=`end`,helperText:f,error:p=!1,disabled:m=!1,required:h=!1,onChange:g,id:_,name:v}){return(0,d.jsxs)(i,{error:p,disabled:m,required:h,children:[(0,d.jsx)(o,{labelPlacement:u,label:e,control:(0,d.jsx)(c,{checked:t,defaultChecked:n,indeterminate:a,color:s,size:l,id:_,name:v,onChange:e=>g?.(e.target.checked)})}),f&&(0,d.jsx)(r,{role:p?`alert`:void 0,children:f})]})}var d,f=e((()=>{d=t(),l(),s(),a(),n(),u.__docgenInfo={description:``,methods:[],displayName:`Checkbox`,props:{label:{required:!0,tsType:{name:`string`},description:``},checked:{required:!1,tsType:{name:`boolean`},description:``},defaultChecked:{required:!1,tsType:{name:`boolean`},description:``},indeterminate:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},color:{required:!1,tsType:{name:`union`,raw:`'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'default'`,elements:[{name:`literal`,value:`'primary'`},{name:`literal`,value:`'secondary'`},{name:`literal`,value:`'error'`},{name:`literal`,value:`'warning'`},{name:`literal`,value:`'info'`},{name:`literal`,value:`'success'`},{name:`literal`,value:`'default'`}]},description:``,defaultValue:{value:`'primary'`,computed:!1}},size:{required:!1,tsType:{name:`union`,raw:`'small' | 'medium'`,elements:[{name:`literal`,value:`'small'`},{name:`literal`,value:`'medium'`}]},description:``,defaultValue:{value:`'medium'`,computed:!1}},labelPlacement:{required:!1,tsType:{name:`union`,raw:`'end' | 'start' | 'top' | 'bottom'`,elements:[{name:`literal`,value:`'end'`},{name:`literal`,value:`'start'`},{name:`literal`,value:`'top'`},{name:`literal`,value:`'bottom'`}]},description:``,defaultValue:{value:`'end'`,computed:!1}},helperText:{required:!1,tsType:{name:`string`},description:``},error:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},required:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(checked: boolean) => void`,signature:{arguments:[{type:{name:`boolean`},name:`checked`}],return:{name:`void`}}},description:``},id:{required:!1,tsType:{name:`string`},description:``},name:{required:!1,tsType:{name:`string`},description:``}}}})),p,m,h,g,_,v,y,b,x,S,C;e((()=>{p=t(),f(),m={title:`Form Components / Checkbox`,component:u,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{color:{control:`select`,options:[`default`,`primary`,`secondary`,`error`,`warning`,`info`,`success`]},size:{control:`select`,options:[`small`,`medium`]},labelPlacement:{control:`select`,options:[`end`,`start`,`top`,`bottom`]}}},h={args:{label:`Accept terms and conditions`}},g={args:{label:`Checked`,checked:!0}},_={args:{label:`Partially selected`,indeterminate:!0}},v={render:()=>(0,p.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,p.jsx)(u,{label:`Small`,size:`small`,defaultChecked:!0}),(0,p.jsx)(u,{label:`Medium`,size:`medium`,defaultChecked:!0})]})},y={render:()=>(0,p.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,p.jsx)(u,{label:`Primary`,color:`primary`,defaultChecked:!0}),(0,p.jsx)(u,{label:`Secondary`,color:`secondary`,defaultChecked:!0}),(0,p.jsx)(u,{label:`Error`,color:`error`,defaultChecked:!0}),(0,p.jsx)(u,{label:`Success`,color:`success`,defaultChecked:!0})]})},b={args:{label:`Subscribe to newsletter`,helperText:`We send one email per week, no spam.`}},x={args:{label:`Accept terms`,error:!0,helperText:`You must accept the terms to continue.`}},S={render:()=>(0,p.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,p.jsx)(u,{label:`Disabled unchecked`,disabled:!0}),(0,p.jsx)(u,{label:`Disabled checked`,disabled:!0,defaultChecked:!0})]})},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Accept terms and conditions'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Checked',
    checked: true
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Partially selected',
    indeterminate: true
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  }}>\r
      <Checkbox label="Small" size="small" defaultChecked />\r
      <Checkbox label="Medium" size="medium" defaultChecked />\r
    </div>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  }}>\r
      <Checkbox label="Primary" color="primary" defaultChecked />\r
      <Checkbox label="Secondary" color="secondary" defaultChecked />\r
      <Checkbox label="Error" color="error" defaultChecked />\r
      <Checkbox label="Success" color="success" defaultChecked />\r
    </div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Subscribe to newsletter',
    helperText: 'We send one email per week, no spam.'
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Accept terms',
    error: true,
    helperText: 'You must accept the terms to continue.'
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  }}>\r
      <Checkbox label="Disabled unchecked" disabled />\r
      <Checkbox label="Disabled checked" disabled defaultChecked />\r
    </div>
}`,...S.parameters?.docs?.source}}},C=[`Default`,`Checked`,`Indeterminate`,`Sizes`,`Colors`,`WithHelperText`,`ErrorState`,`Disabled`]}))();export{g as Checked,y as Colors,h as Default,S as Disabled,x as ErrorState,_ as Indeterminate,v as Sizes,b as WithHelperText,C as __namedExportsOrder,m as default};