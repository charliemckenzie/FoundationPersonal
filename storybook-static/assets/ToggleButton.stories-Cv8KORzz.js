import{n as e,o as t}from"./chunk-vNrZSFDR.js";import{t as n}from"./react-KkzZQhs-.js";import{t as r}from"./jsx-runtime-BiDZswiL.js";import{i,n as a,r as o,t as s}from"./ToggleButtonGroup-CHxciwqQ.js";function c({options:e,ariaLabel:t,value:n,defaultValue:r,exclusive:o=!0,color:s=`primary`,size:c=`medium`,orientation:d=`horizontal`,disabled:f=!1,fullWidth:p=!1,onChange:m}){let h=n!==void 0,[g,_]=(0,u.useState)(r??(o?``:[])),v=h?n:g;function y(e,t){h||_(t),m?.(t)}return(0,l.jsx)(a,{value:v,exclusive:o,color:s,size:c,orientation:d,disabled:f,fullWidth:p,onChange:y,"aria-label":t,children:e.map(e=>(0,l.jsx)(i,{value:e.value,disabled:e.disabled,"aria-label":e.label,children:e.label},e.value))})}var l,u,d=e((()=>{l=r(),u=t(n()),o(),s(),c.__docgenInfo={description:``,methods:[],displayName:`ToggleButtonGroup`,props:{options:{required:!0,tsType:{name:`Array`,elements:[{name:`ToggleButtonOption`}],raw:`ToggleButtonOption[]`},description:``},ariaLabel:{required:!0,tsType:{name:`string`},description:``},value:{required:!1,tsType:{name:`union`,raw:`string | string[]`,elements:[{name:`string`},{name:`Array`,elements:[{name:`string`}],raw:`string[]`}]},description:``},defaultValue:{required:!1,tsType:{name:`union`,raw:`string | string[]`,elements:[{name:`string`},{name:`Array`,elements:[{name:`string`}],raw:`string[]`}]},description:``},exclusive:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},color:{required:!1,tsType:{name:`union`,raw:`'standard' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'`,elements:[{name:`literal`,value:`'standard'`},{name:`literal`,value:`'primary'`},{name:`literal`,value:`'secondary'`},{name:`literal`,value:`'error'`},{name:`literal`,value:`'warning'`},{name:`literal`,value:`'info'`},{name:`literal`,value:`'success'`}]},description:``,defaultValue:{value:`'primary'`,computed:!1}},size:{required:!1,tsType:{name:`union`,raw:`'small' | 'medium' | 'large'`,elements:[{name:`literal`,value:`'small'`},{name:`literal`,value:`'medium'`},{name:`literal`,value:`'large'`}]},description:``,defaultValue:{value:`'medium'`,computed:!1}},orientation:{required:!1,tsType:{name:`union`,raw:`'horizontal' | 'vertical'`,elements:[{name:`literal`,value:`'horizontal'`},{name:`literal`,value:`'vertical'`}]},description:``,defaultValue:{value:`'horizontal'`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},fullWidth:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: string | string[]) => void`,signature:{arguments:[{type:{name:`union`,raw:`string | string[]`,elements:[{name:`string`},{name:`Array`,elements:[{name:`string`}],raw:`string[]`}]},name:`value`}],return:{name:`void`}}},description:``}}}})),f,p,m,h,g,_,v,y,b,x,S,C,w;e((()=>{f=r(),d(),p=[{value:`left`,label:`Left`},{value:`center`,label:`Center`},{value:`right`,label:`Right`}],m=[{value:`xs`,label:`XS`},{value:`sm`,label:`SM`},{value:`md`,label:`MD`},{value:`lg`,label:`LG`,disabled:!0}],h={title:`Form Components / ToggleButton`,component:c,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{color:{control:`select`,options:[`standard`,`primary`,`secondary`,`error`,`warning`,`info`,`success`]},size:{control:`select`,options:[`small`,`medium`,`large`]},orientation:{control:`select`,options:[`horizontal`,`vertical`]}}},g={args:{options:p,ariaLabel:`Text alignment`,defaultValue:`left`}},_={args:{options:p,ariaLabel:`Text alignment`,exclusive:!1,defaultValue:[`left`,`center`]}},v={render:()=>(0,f.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,f.jsx)(c,{options:p,ariaLabel:`Text alignment (small)`,size:`small`,defaultValue:`left`}),(0,f.jsx)(c,{options:p,ariaLabel:`Text alignment (medium)`,size:`medium`,defaultValue:`left`}),(0,f.jsx)(c,{options:p,ariaLabel:`Text alignment (large)`,size:`large`,defaultValue:`left`})]})},y={render:()=>(0,f.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,f.jsx)(c,{options:p,ariaLabel:`Text alignment`,color:`primary`,defaultValue:`left`}),(0,f.jsx)(c,{options:p,ariaLabel:`Text alignment`,color:`secondary`,defaultValue:`left`}),(0,f.jsx)(c,{options:p,ariaLabel:`Text alignment`,color:`success`,defaultValue:`left`})]})},b={args:{options:p,ariaLabel:`Text alignment`,orientation:`vertical`,defaultValue:`center`}},x={args:{options:m,ariaLabel:`Size selection`,defaultValue:`sm`}},S={args:{options:p,ariaLabel:`Text alignment`,defaultValue:`left`,disabled:!0}},C={args:{options:p,ariaLabel:`Text alignment`,defaultValue:`center`,fullWidth:!0},parameters:{layout:`padded`}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    options: ALIGNMENT_OPTIONS,
    ariaLabel: 'Text alignment',
    defaultValue: 'left'
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    options: ALIGNMENT_OPTIONS,
    ariaLabel: 'Text alignment',
    exclusive: false,
    defaultValue: ['left', 'center']
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  }}>\r
      <ToggleButtonGroup options={ALIGNMENT_OPTIONS} ariaLabel="Text alignment (small)" size="small" defaultValue="left" />\r
      <ToggleButtonGroup options={ALIGNMENT_OPTIONS} ariaLabel="Text alignment (medium)" size="medium" defaultValue="left" />\r
      <ToggleButtonGroup options={ALIGNMENT_OPTIONS} ariaLabel="Text alignment (large)" size="large" defaultValue="left" />\r
    </div>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  }}>\r
      <ToggleButtonGroup options={ALIGNMENT_OPTIONS} ariaLabel="Text alignment" color="primary" defaultValue="left" />\r
      <ToggleButtonGroup options={ALIGNMENT_OPTIONS} ariaLabel="Text alignment" color="secondary" defaultValue="left" />\r
      <ToggleButtonGroup options={ALIGNMENT_OPTIONS} ariaLabel="Text alignment" color="success" defaultValue="left" />\r
    </div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    options: ALIGNMENT_OPTIONS,
    ariaLabel: 'Text alignment',
    orientation: 'vertical',
    defaultValue: 'center'
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    options: SIZE_OPTIONS,
    ariaLabel: 'Size selection',
    defaultValue: 'sm'
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    options: ALIGNMENT_OPTIONS,
    ariaLabel: 'Text alignment',
    defaultValue: 'left',
    disabled: true
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    options: ALIGNMENT_OPTIONS,
    ariaLabel: 'Text alignment',
    defaultValue: 'center',
    fullWidth: true
  },
  parameters: {
    layout: 'padded'
  }
}`,...C.parameters?.docs?.source}}},w=[`Default`,`MultiSelect`,`Sizes`,`Colors`,`Vertical`,`WithDisabledOption`,`Disabled`,`FullWidth`]}))();export{y as Colors,g as Default,S as Disabled,C as FullWidth,_ as MultiSelect,v as Sizes,b as Vertical,x as WithDisabledOption,w as __namedExportsOrder,h as default};