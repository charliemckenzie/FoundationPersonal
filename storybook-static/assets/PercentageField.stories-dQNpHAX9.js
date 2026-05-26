import{n as e,s as t}from"./chunk-Bj-mKKzh.js";import{t as n}from"./react-DVKR3yZN.js";import{t as r}from"./jsx-runtime-CyI9ICYU.js";import{n as i,t as a}from"./TextField-BFXHaNu_.js";function o(e){let t=e.replace(/[^0-9.]/g,``),n=t.indexOf(`.`);if(n===-1)return t;let r=t.slice(n+1).replace(/\./g,``).slice(0,2);return`${t.slice(0,n)}.${r}`}function s({label:e,defaultValue:t,placeholder:n=`0.00`,size:r,condensed:i,helperText:s,error:d,required:f,disabled:p,fullWidth:m,onChange:h,id:g,name:_}){let[v,y]=(0,l.useState)(()=>t==null?``:Math.min(100,Math.max(0,t)).toFixed(2)),[b,x]=(0,l.useState)(!1),[S,C]=(0,l.useState)(``);return(0,c.jsx)(a,{label:e,value:v,placeholder:n,size:r,condensed:i,helperText:S||s,error:d||b,required:f,disabled:p,fullWidth:m,endAdornment:`%`,onChange:e=>{let t=o(e.target.value);y(t);let n=parseFloat(t);t&&!isNaN(n)&&n>100?(x(!0),C(u)):(x(!1),C(``))},onBlur:()=>{if(!v){x(!1),C(``),h?.(null);return}let e=parseFloat(v);if(isNaN(e)){y(``),x(!1),C(``),h?.(null);return}if(e>100){y(``),h?.(null);return}let t=Math.max(0,e);y(t.toFixed(2)),x(!1),C(``),h?.(t)},id:g,name:_})}var c,l,u,d=e((()=>{c=r(),l=t(n()),i(),u=`You can't have more than 100%`,s.__docgenInfo={description:``,methods:[],displayName:`PercentageField`,props:{label:{required:!1,tsType:{name:`string`},description:``},defaultValue:{required:!1,tsType:{name:`number`},description:``},placeholder:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'0.00'`,computed:!1}},size:{required:!1,tsType:{name:`union`,raw:`'small' | 'medium'`,elements:[{name:`literal`,value:`'small'`},{name:`literal`,value:`'medium'`}]},description:``},condensed:{required:!1,tsType:{name:`boolean`},description:``},helperText:{required:!1,tsType:{name:`string`},description:``},error:{required:!1,tsType:{name:`boolean`},description:``},required:{required:!1,tsType:{name:`boolean`},description:``},disabled:{required:!1,tsType:{name:`boolean`},description:``},fullWidth:{required:!1,tsType:{name:`boolean`},description:``},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: number | null) => void`,signature:{arguments:[{type:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}]},name:`value`}],return:{name:`void`}}},description:``},id:{required:!1,tsType:{name:`string`},description:``},name:{required:!1,tsType:{name:`string`},description:``}}}})),f,p,m,h,g,_,v,y,b;e((()=>{f=r(),d(),p={title:`Form Components / TextInput / PercentageField`,component:s,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`PercentageField is a numeric input clamped to 0–100. It validates on change and normalises to two decimal places on blur.

Styling is inherited from TextField — visual changes to TextField apply here automatically.

**Behaviour:**
- Accepts numeric input with up to two decimal places
- Shows an inline error if the value exceeds 100 while typing
- On blur, clamps to 0–100 and normalises to two decimal places (e.g. \`75\` → \`75.00\`)
- Emits the numeric value via \`onChange\` (not the formatted string)
- Emits \`null\` when the field is cleared`}}},argTypes:{size:{control:`select`,options:[`small`,`medium`]},condensed:{control:`boolean`},defaultValue:{table:{disable:!0}},onChange:{table:{disable:!0}},id:{table:{disable:!0}},name:{table:{disable:!0}},fullWidth:{table:{disable:!0}}}},m={name:`Playground`,parameters:{docs:{description:{story:``}}},args:{label:`Rate`,placeholder:`0.00`,size:`medium`,condensed:!1,error:!1,required:!1,disabled:!1},decorators:[e=>(0,f.jsx)(`div`,{style:{width:320},children:(0,f.jsx)(e,{})})]},h={parameters:{docs:{description:{story:`Type a number and tab away — the field normalises to two decimal places on blur. Entering a value over 100 shows an inline error.`}}},args:{label:`Rate`,placeholder:`0.00`},decorators:[e=>(0,f.jsx)(`div`,{style:{width:280},children:(0,f.jsx)(e,{})})]},g={parameters:{docs:{description:{story:"Use `defaultValue` (numeric, 0–100) to pre-populate the field."}}},args:{label:`Allocation`,defaultValue:33.5},decorators:[e=>(0,f.jsx)(`div`,{style:{width:280},children:(0,f.jsx)(e,{})})]},_={parameters:{docs:{description:{story:[`Two sizes cover the full range of layout needs.`,``,`| Size | Default height | Condensed height |`,`|------|---------------|-----------------|`,`| Small | 40px | 36px |`,`| Medium | 48px | 44px |`,``,`**Default** — use in standard form layouts, dialogs, and standalone inputs.`,``,"**Condensed** — use in dense interfaces: data tables, filter bars, and anywhere vertical rhythm is tight. Apply the `condensed` prop; do not substitute a smaller size tier to save space.",``,"> **iOS zoom:** Input font size is fixed at `1rem` (16px) regardless of size or condensed state. iOS Safari automatically zooms the viewport when a focused input has a font size below 16px. Do not override the input font size."].join(`
`)}}},render:()=>(0,f.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24,width:280},children:[(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`p`,{style:{margin:`0 0 12px`,fontWeight:600,fontSize:13,textTransform:`uppercase`,letterSpacing:`0.05em`,color:`#666`},children:`Default`}),(0,f.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,f.jsx)(s,{label:`Small`,size:`small`,placeholder:`0.00`}),(0,f.jsx)(s,{label:`Medium`,size:`medium`,placeholder:`0.00`})]})]}),(0,f.jsxs)(`div`,{children:[(0,f.jsx)(`p`,{style:{margin:`0 0 12px`,fontWeight:600,fontSize:13,textTransform:`uppercase`,letterSpacing:`0.05em`,color:`#666`},children:`Condensed`}),(0,f.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,f.jsx)(s,{label:`Small`,size:`small`,condensed:!0,placeholder:`0.00`}),(0,f.jsx)(s,{label:`Medium`,size:`medium`,condensed:!0,placeholder:`0.00`})]})]})]})},v={parameters:{docs:{description:{story:``}}},args:{label:`Rate`,error:!0,helperText:`Enter a percentage between 0 and 100.`},decorators:[e=>(0,f.jsx)(`div`,{style:{width:280},children:(0,f.jsx)(e,{})})]},y={parameters:{docs:{description:{story:``}}},args:{label:`Rate`,defaultValue:25,disabled:!0},decorators:[e=>(0,f.jsx)(`div`,{style:{width:280},children:(0,f.jsx)(e,{})})]},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: ''
      }
    }
  },
  args: {
    label: 'Rate',
    placeholder: '0.00',
    size: 'medium',
    condensed: false,
    error: false,
    required: false,
    disabled: false
  },
  decorators: [Story => <div style={{
    width: 320
  }}><Story /></div>]
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Type a number and tab away — the field normalises to two decimal places on blur. Entering a value over 100 shows an inline error.'
      }
    }
  },
  args: {
    label: 'Rate',
    placeholder: '0.00'
  },
  decorators: [Story => <div style={{
    width: 280
  }}><Story /></div>]
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Use \`defaultValue\` (numeric, 0–100) to pre-populate the field.'
      }
    }
  },
  args: {
    label: 'Allocation',
    defaultValue: 33.5
  },
  decorators: [Story => <div style={{
    width: 280
  }}><Story /></div>]
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: ['Two sizes cover the full range of layout needs.', '', '| Size | Default height | Condensed height |', '|------|---------------|-----------------|', '| Small | 40px | 36px |', '| Medium | 48px | 44px |', '', '**Default** — use in standard form layouts, dialogs, and standalone inputs.', '', '**Condensed** — use in dense interfaces: data tables, filter bars, and anywhere vertical rhythm is tight. Apply the \`condensed\` prop; do not substitute a smaller size tier to save space.', '', '> **iOS zoom:** Input font size is fixed at \`1rem\` (16px) regardless of size or condensed state. iOS Safari automatically zooms the viewport when a focused input has a font size below 16px. Do not override the input font size.'].join('\\n')
      }
    }
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    width: 280
  }}>\r
      <div>\r
        <p style={{
        margin: '0 0 12px',
        fontWeight: 600,
        fontSize: 13,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: '#666'
      }}>Default</p>\r
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }}>\r
          <PercentageField label="Small" size="small" placeholder="0.00" />\r
          <PercentageField label="Medium" size="medium" placeholder="0.00" />\r
        </div>\r
      </div>\r
      <div>\r
        <p style={{
        margin: '0 0 12px',
        fontWeight: 600,
        fontSize: 13,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: '#666'
      }}>Condensed</p>\r
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12
      }}>\r
          <PercentageField label="Small" size="small" condensed placeholder="0.00" />\r
          <PercentageField label="Medium" size="medium" condensed placeholder="0.00" />\r
        </div>\r
      </div>\r
    </div>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: ''
      }
    }
  },
  args: {
    label: 'Rate',
    error: true,
    helperText: 'Enter a percentage between 0 and 100.'
  },
  decorators: [Story => <div style={{
    width: 280
  }}><Story /></div>]
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: ''
      }
    }
  },
  args: {
    label: 'Rate',
    defaultValue: 25,
    disabled: true
  },
  decorators: [Story => <div style={{
    width: 280
  }}><Story /></div>]
}`,...y.parameters?.docs?.source}}},b=[`Playground`,`Default`,`WithDefaultValue`,`Sizes`,`ErrorState`,`Disabled`]}))();export{h as Default,y as Disabled,v as ErrorState,m as Playground,_ as Sizes,g as WithDefaultValue,b as __namedExportsOrder,p as default};