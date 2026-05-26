import{n as e,s as t}from"./chunk-Bj-mKKzh.js";import{t as n}from"./react-DVKR3yZN.js";import{t as r}from"./jsx-runtime-CyI9ICYU.js";import{n as i,t as a}from"./FormHelperText-C9CIb3G6.js";import{n as o,t as s}from"./Box-Cj6TI_Dr.js";import{n as c,t as l}from"./FormLabel-DRNALuI4.js";import{i as u,n as d,r as f,t as p}from"./ToggleButtonGroup-B8755VNI.js";function m({options:e,ariaLabel:t,value:n,defaultValue:r,exclusive:a=!0,color:s=`primary`,size:l=`medium`,orientation:f=`horizontal`,disabled:p=!1,fullWidth:m=!1,onChange:_,label:v,error:y=!1,errorMessage:b}){let x=n!==void 0,[S,C]=(0,g.useState)(r??(a?``:[])),w=x?n:S;function T(e,t){x||C(t),_?.(t)}return(0,h.jsxs)(o,{sx:{display:m?`flex`:`inline-flex`,flexDirection:`column`,gap:.5,...m&&{width:`100%`}},children:[v&&(0,h.jsx)(c,{error:y,sx:{fontWeight:700,fontSize:`1rem`,...!y&&{color:`text.primary`}},children:v}),(0,h.jsx)(d,{value:w,exclusive:a,color:s,size:l,orientation:f,disabled:p,fullWidth:m,onChange:T,"aria-label":t,sx:y?{"& .MuiToggleButton-root":{borderColor:`error.main`},"& .MuiToggleButton-root.Mui-selected":{borderColor:`error.main`},"& .MuiToggleButtonGroup-grouped:not(:first-of-type)":{borderLeftColor:`error.main`},"& .MuiToggleButtonGroup-grouped.Mui-selected:not(:first-of-type)":{borderLeftColor:`error.main`}}:void 0,children:e.map(e=>(0,h.jsx)(u,{value:e.value,disabled:e.disabled,"aria-label":e.label,disableRipple:!0,children:e.label},e.value))}),y&&b&&(0,h.jsx)(i,{error:!0,sx:{mx:0},children:b})]})}var h,g,_=e((()=>{h=r(),g=t(n()),f(),p(),s(),l(),a(),m.__docgenInfo={description:``,methods:[],displayName:`ToggleButtonGroup`,props:{options:{required:!0,tsType:{name:`Array`,elements:[{name:`ToggleButtonOption`}],raw:`ToggleButtonOption[]`},description:``},ariaLabel:{required:!0,tsType:{name:`string`},description:``},value:{required:!1,tsType:{name:`union`,raw:`string | string[]`,elements:[{name:`string`},{name:`Array`,elements:[{name:`string`}],raw:`string[]`}]},description:``},defaultValue:{required:!1,tsType:{name:`union`,raw:`string | string[]`,elements:[{name:`string`},{name:`Array`,elements:[{name:`string`}],raw:`string[]`}]},description:``},exclusive:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},color:{required:!1,tsType:{name:`union`,raw:`'standard' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'`,elements:[{name:`literal`,value:`'standard'`},{name:`literal`,value:`'primary'`},{name:`literal`,value:`'secondary'`},{name:`literal`,value:`'error'`},{name:`literal`,value:`'warning'`},{name:`literal`,value:`'info'`},{name:`literal`,value:`'success'`}]},description:``,defaultValue:{value:`'primary'`,computed:!1}},size:{required:!1,tsType:{name:`union`,raw:`'small' | 'medium' | 'large'`,elements:[{name:`literal`,value:`'small'`},{name:`literal`,value:`'medium'`},{name:`literal`,value:`'large'`}]},description:``,defaultValue:{value:`'medium'`,computed:!1}},orientation:{required:!1,tsType:{name:`union`,raw:`'horizontal' | 'vertical'`,elements:[{name:`literal`,value:`'horizontal'`},{name:`literal`,value:`'vertical'`}]},description:``,defaultValue:{value:`'horizontal'`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},fullWidth:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: string | string[]) => void`,signature:{arguments:[{type:{name:`union`,raw:`string | string[]`,elements:[{name:`string`},{name:`Array`,elements:[{name:`string`}],raw:`string[]`}]},name:`value`}],return:{name:`void`}}},description:``},label:{required:!1,tsType:{name:`string`},description:``},error:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},errorMessage:{required:!1,tsType:{name:`string`},description:``}}}})),v,y,b,x,S,C,w,T,E,D,O,k,A,j,M;e((()=>{v=r(),_(),y=[{value:`left`,label:`Left`},{value:`center`,label:`Center`},{value:`right`,label:`Right`}],b=[{value:`xs`,label:`XS`},{value:`sm`,label:`SM`},{value:`md`,label:`MD`},{value:`lg`,label:`LG`,disabled:!0}],x={title:`Form Components / ToggleButton`,component:m,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{color:{table:{disable:!0}},onChange:{table:{disable:!0}},exclusive:{table:{disable:!0}},defaultValue:{table:{disable:!0}},value:{table:{disable:!0}},size:{control:`select`,options:[`small`,`medium`,`large`]},orientation:{control:`select`,options:[`horizontal`,`vertical`]}}},S={args:{options:y,ariaLabel:`Text alignment`,defaultValue:`left`}},C={args:{options:y,ariaLabel:`Text alignment`,exclusive:!1,defaultValue:[`left`,`center`]}},w={render:()=>(0,v.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,v.jsx)(m,{options:y,ariaLabel:`Text alignment (small)`,size:`small`,defaultValue:`left`}),(0,v.jsx)(m,{options:y,ariaLabel:`Text alignment (medium)`,size:`medium`,defaultValue:`left`}),(0,v.jsx)(m,{options:y,ariaLabel:`Text alignment (large)`,size:`large`,defaultValue:`left`})]})},T=[{value:`au`,label:`Australia`},{value:`other`,label:`Outside Australia`}],E={args:{options:T,ariaLabel:`Select country`,defaultValue:`au`,label:`Select country`}},D={args:{options:T,ariaLabel:`Select country`,label:`Select country`,error:!0,errorMessage:`Please select a country to continue.`}},O={args:{options:y,ariaLabel:`Text alignment`,orientation:`vertical`,defaultValue:`center`}},k={args:{options:b,ariaLabel:`Size selection`,defaultValue:`sm`}},A={args:{options:y,ariaLabel:`Text alignment`,defaultValue:`left`,disabled:!0}},j={args:{options:y,ariaLabel:`Text alignment`,defaultValue:`center`,fullWidth:!0},parameters:{layout:`padded`}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    options: ALIGNMENT_OPTIONS,
    ariaLabel: 'Text alignment',
    defaultValue: 'left'
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    options: ALIGNMENT_OPTIONS,
    ariaLabel: 'Text alignment',
    exclusive: false,
    defaultValue: ['left', 'center']
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  }}>\r
      <ToggleButtonGroup options={ALIGNMENT_OPTIONS} ariaLabel="Text alignment (small)" size="small" defaultValue="left" />\r
      <ToggleButtonGroup options={ALIGNMENT_OPTIONS} ariaLabel="Text alignment (medium)" size="medium" defaultValue="left" />\r
      <ToggleButtonGroup options={ALIGNMENT_OPTIONS} ariaLabel="Text alignment (large)" size="large" defaultValue="left" />\r
    </div>
}`,...w.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    options: COUNTRY_OPTIONS,
    ariaLabel: 'Select country',
    defaultValue: 'au',
    label: 'Select country'
  }
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  args: {
    options: COUNTRY_OPTIONS,
    ariaLabel: 'Select country',
    label: 'Select country',
    error: true,
    errorMessage: 'Please select a country to continue.'
  }
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    options: ALIGNMENT_OPTIONS,
    ariaLabel: 'Text alignment',
    orientation: 'vertical',
    defaultValue: 'center'
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    options: SIZE_OPTIONS,
    ariaLabel: 'Size selection',
    defaultValue: 'sm'
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    options: ALIGNMENT_OPTIONS,
    ariaLabel: 'Text alignment',
    defaultValue: 'left',
    disabled: true
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    options: ALIGNMENT_OPTIONS,
    ariaLabel: 'Text alignment',
    defaultValue: 'center',
    fullWidth: true
  },
  parameters: {
    layout: 'padded'
  }
}`,...j.parameters?.docs?.source}}},M=[`Default`,`MultiSelect`,`Sizes`,`WithLabel`,`WithError`,`Vertical`,`WithDisabledOption`,`Disabled`,`FullWidth`]}))();export{S as Default,A as Disabled,j as FullWidth,C as MultiSelect,w as Sizes,O as Vertical,k as WithDisabledOption,D as WithError,E as WithLabel,M as __namedExportsOrder,x as default};