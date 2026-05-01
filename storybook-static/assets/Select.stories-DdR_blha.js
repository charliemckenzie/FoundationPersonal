import{n as e}from"./chunk-vNrZSFDR.js";import{t}from"./jsx-runtime-BiDZswiL.js";import{a as n,n as r,o as i,t as a}from"./FormHelperText-BE9lMToM.js";import{_ as o,g as s,n as c,t as l}from"./Select-BVjw-o1g.js";import{n as u,t as d}from"./MenuItem-DtGQC51f.js";function f({label:e,options:t,value:n,defaultValue:a,size:s=`medium`,helperText:l,error:d=!1,required:f=!1,disabled:m=!1,fullWidth:h=!1,onChange:g,id:_,name:v}){let y=`${_??e.toLowerCase().replace(/\s+/g,`-`)}-label`;function b(e){g?.(e.target.value)}return(0,p.jsxs)(i,{size:s,error:d,required:f,disabled:m,fullWidth:h,children:[(0,p.jsx)(o,{id:y,children:e}),(0,p.jsx)(c,{labelId:y,label:e,value:n,defaultValue:a,onChange:b,inputProps:{id:_,name:v},children:t.map(e=>(0,p.jsx)(u,{value:e.value,disabled:e.disabled,children:e.label},e.value))}),l&&(0,p.jsx)(r,{role:d?`alert`:void 0,children:l})]})}var p,m=e((()=>{p=t(),n(),s(),l(),d(),a(),f.__docgenInfo={description:``,methods:[],displayName:`Select`,props:{label:{required:!0,tsType:{name:`string`},description:``},options:{required:!0,tsType:{name:`Array`,elements:[{name:`SelectOption`}],raw:`SelectOption[]`},description:``},value:{required:!1,tsType:{name:`string`},description:``},defaultValue:{required:!1,tsType:{name:`string`},description:``},size:{required:!1,tsType:{name:`union`,raw:`'small' | 'medium'`,elements:[{name:`literal`,value:`'small'`},{name:`literal`,value:`'medium'`}]},description:``,defaultValue:{value:`'medium'`,computed:!1}},helperText:{required:!1,tsType:{name:`string`},description:``},error:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},required:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},fullWidth:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: string) => void`,signature:{arguments:[{type:{name:`string`},name:`value`}],return:{name:`void`}}},description:``},id:{required:!1,tsType:{name:`string`},description:``},name:{required:!1,tsType:{name:`string`},description:``}}}})),h,g,_,v,y,b,x,S,C,w;e((()=>{h=t(),m(),g=[{value:`apple`,label:`Apple`},{value:`banana`,label:`Banana`},{value:`cherry`,label:`Cherry`},{value:`durian`,label:`Durian`,disabled:!0}],_={title:`Form Components / Select`,component:f,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{size:{control:`select`,options:[`small`,`medium`]}}},v={args:{label:`Fruit`,options:g},decorators:[e=>(0,h.jsx)(`div`,{style:{width:240},children:(0,h.jsx)(e,{})})]},y={render:()=>(0,h.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,width:240},children:[(0,h.jsx)(f,{label:`Small`,options:g,size:`small`}),(0,h.jsx)(f,{label:`Medium`,options:g,size:`medium`})]})},b={args:{label:`Fruit`,options:g,helperText:`Pick your favourite.`},decorators:[e=>(0,h.jsx)(`div`,{style:{width:240},children:(0,h.jsx)(e,{})})]},x={args:{label:`Fruit`,options:g,error:!0,helperText:`Please select an option.`},decorators:[e=>(0,h.jsx)(`div`,{style:{width:240},children:(0,h.jsx)(e,{})})]},S={args:{label:`Fruit`,options:g,required:!0},decorators:[e=>(0,h.jsx)(`div`,{style:{width:240},children:(0,h.jsx)(e,{})})]},C={args:{label:`Fruit`,options:g,disabled:!0,defaultValue:`apple`},decorators:[e=>(0,h.jsx)(`div`,{style:{width:240},children:(0,h.jsx)(e,{})})]},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Fruit',
    options: FRUIT_OPTIONS
  },
  decorators: [Story => <div style={{
    width: 240
  }}><Story /></div>]
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: 240
  }}>\r
      <Select label="Small" options={FRUIT_OPTIONS} size="small" />\r
      <Select label="Medium" options={FRUIT_OPTIONS} size="medium" />\r
    </div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Fruit',
    options: FRUIT_OPTIONS,
    helperText: 'Pick your favourite.'
  },
  decorators: [Story => <div style={{
    width: 240
  }}><Story /></div>]
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Fruit',
    options: FRUIT_OPTIONS,
    error: true,
    helperText: 'Please select an option.'
  },
  decorators: [Story => <div style={{
    width: 240
  }}><Story /></div>]
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Fruit',
    options: FRUIT_OPTIONS,
    required: true
  },
  decorators: [Story => <div style={{
    width: 240
  }}><Story /></div>]
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Fruit',
    options: FRUIT_OPTIONS,
    disabled: true,
    defaultValue: 'apple'
  },
  decorators: [Story => <div style={{
    width: 240
  }}><Story /></div>]
}`,...C.parameters?.docs?.source}}},w=[`Default`,`Sizes`,`WithHelperText`,`ErrorState`,`Required`,`Disabled`]}))();export{v as Default,C as Disabled,x as ErrorState,S as Required,y as Sizes,b as WithHelperText,w as __namedExportsOrder,_ as default};