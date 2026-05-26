import{n as e,s as t}from"./chunk-Bj-mKKzh.js";import{t as n}from"./react-DVKR3yZN.js";import{t as r}from"./jsx-runtime-CyI9ICYU.js";import{n as i,t as a}from"./TextField-BFXHaNu_.js";function o(e){let t=e.replace(/[^0-9.]/g,``),n=t.indexOf(`.`);if(n===-1)return t;let r=t.slice(n+1).replace(/\./g,``).slice(0,2);return`${t.slice(0,n)}.${r}`}function s(e,t=!1){if(!e)return``;let n=e.indexOf(`.`),r=n!==-1,i=r?e.slice(0,n):e,a=r?e.slice(n+1):``,o=i?(parseInt(i,10)||0).toLocaleString(`en-US`):``;return!r||t&&!a?o:t?`${o||`0`}.${a.slice(0,2).padEnd(2,`0`)}`:`${o}.${a}`}function c(e,t,n){let r=n-(e.slice(0,n).match(/,/g)??[]).length;if(r===0)return 0;let i=0;for(let e=0;e<t.length;e++)if(t[e]!==`,`&&i++,i===r)return e+1;return t.length}function l({label:e,defaultValue:t,placeholder:n=`0`,size:r,condensed:i,helperText:l,error:f,required:p,disabled:m,fullWidth:h,onChange:g,id:_,name:v}){let[y,b]=(0,d.useState)(()=>t==null?``:t.toLocaleString(`en-US`,{maximumFractionDigits:2}));return(0,u.jsx)(a,{label:e,value:y,placeholder:n,size:r,condensed:i,helperText:l,error:f,required:p,disabled:m,fullWidth:h,startAdornment:`$`,onChange:e=>{let t=e.target,n=t.selectionStart??0,r=e.target.value,i=s(o(r)),a=c(r,i,n);b(i),requestAnimationFrame(()=>{t.setSelectionRange(a,a)})},onBlur:()=>{let e=y.replace(/,/g,``);if(!e||e===`.`){b(``),g?.(null);return}b(s(e,!0));let t=parseFloat(e);g?.(isNaN(t)?null:t)},id:_,name:v})}var u,d,f=e((()=>{u=r(),d=t(n()),i(),l.__docgenInfo={description:``,methods:[],displayName:`MoneyField`,props:{label:{required:!1,tsType:{name:`string`},description:``},defaultValue:{required:!1,tsType:{name:`number`},description:``},placeholder:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'0'`,computed:!1}},size:{required:!1,tsType:{name:`union`,raw:`'small' | 'medium'`,elements:[{name:`literal`,value:`'small'`},{name:`literal`,value:`'medium'`}]},description:``},condensed:{required:!1,tsType:{name:`boolean`},description:``},helperText:{required:!1,tsType:{name:`string`},description:``},error:{required:!1,tsType:{name:`boolean`},description:``},required:{required:!1,tsType:{name:`boolean`},description:``},disabled:{required:!1,tsType:{name:`boolean`},description:``},fullWidth:{required:!1,tsType:{name:`boolean`},description:``},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(value: number | null) => void`,signature:{arguments:[{type:{name:`union`,raw:`number | null`,elements:[{name:`number`},{name:`null`}]},name:`value`}],return:{name:`void`}}},description:``},id:{required:!1,tsType:{name:`string`},description:``},name:{required:!1,tsType:{name:`string`},description:``}}}})),p,m,h,g,_,v,y,b,x;e((()=>{p=r(),f(),m={title:`Form Components / TextInput / MoneyField`,component:l,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`MoneyField is a currency input with automatic thousand-separator formatting and two-decimal normalisation on blur.

Styling is inherited from TextField — visual changes to TextField apply here automatically.

**Behaviour:**
- Formats the integer part with comma separators as the user types
- On blur, normalises to two decimal places (e.g. \`1234\` → \`1,234.00\`)
- Emits the numeric value via \`onChange\` (not the formatted string)
- Emits \`null\` when the field is cleared`}}},argTypes:{size:{control:`select`,options:[`small`,`medium`]},condensed:{control:`boolean`},defaultValue:{table:{disable:!0}},onChange:{table:{disable:!0}},id:{table:{disable:!0}},name:{table:{disable:!0}},fullWidth:{table:{disable:!0}}}},h={name:`Playground`,parameters:{docs:{description:{story:``}}},args:{label:`Amount`,placeholder:`0`,size:`medium`,condensed:!1,error:!1,required:!1,disabled:!1},decorators:[e=>(0,p.jsx)(`div`,{style:{width:320},children:(0,p.jsx)(e,{})})]},g={parameters:{docs:{description:{story:`Type a number and tab away — the field formats to two decimal places on blur.`}}},args:{label:`Amount`,placeholder:`0`},decorators:[e=>(0,p.jsx)(`div`,{style:{width:280},children:(0,p.jsx)(e,{})})]},_={parameters:{docs:{description:{story:"Use `defaultValue` (numeric) to pre-populate the field. The value is formatted on mount."}}},args:{label:`Balance`,defaultValue:1234567.89},decorators:[e=>(0,p.jsx)(`div`,{style:{width:280},children:(0,p.jsx)(e,{})})]},v={parameters:{docs:{description:{story:[`Two sizes cover the full range of layout needs.`,``,`| Size | Default height | Condensed height |`,`|------|---------------|-----------------|`,`| Small | 40px | 36px |`,`| Medium | 48px | 44px |`,``,`**Default** — use in standard form layouts, dialogs, and standalone inputs.`,``,"**Condensed** — use in dense interfaces: data tables, filter bars, and anywhere vertical rhythm is tight. Apply the `condensed` prop; do not substitute a smaller size tier to save space.",``,"> **iOS zoom:** Input font size is fixed at `1rem` (16px) regardless of size or condensed state. iOS Safari automatically zooms the viewport when a focused input has a font size below 16px. Do not override the input font size."].join(`
`)}}},render:()=>(0,p.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24,width:280},children:[(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`p`,{style:{margin:`0 0 12px`,fontWeight:600,fontSize:13,textTransform:`uppercase`,letterSpacing:`0.05em`,color:`#666`},children:`Default`}),(0,p.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,p.jsx)(l,{label:`Small`,size:`small`,placeholder:`0`}),(0,p.jsx)(l,{label:`Medium`,size:`medium`,placeholder:`0`})]})]}),(0,p.jsxs)(`div`,{children:[(0,p.jsx)(`p`,{style:{margin:`0 0 12px`,fontWeight:600,fontSize:13,textTransform:`uppercase`,letterSpacing:`0.05em`,color:`#666`},children:`Condensed`}),(0,p.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,p.jsx)(l,{label:`Small`,size:`small`,condensed:!0,placeholder:`0`}),(0,p.jsx)(l,{label:`Medium`,size:`medium`,condensed:!0,placeholder:`0`})]})]})]})},y={parameters:{docs:{description:{story:``}}},args:{label:`Amount`,error:!0,helperText:`Enter a valid dollar amount.`},decorators:[e=>(0,p.jsx)(`div`,{style:{width:280},children:(0,p.jsx)(e,{})})]},b={parameters:{docs:{description:{story:``}}},args:{label:`Amount`,defaultValue:500,disabled:!0},decorators:[e=>(0,p.jsx)(`div`,{style:{width:280},children:(0,p.jsx)(e,{})})]},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: ''
      }
    }
  },
  args: {
    label: 'Amount',
    placeholder: '0',
    size: 'medium',
    condensed: false,
    error: false,
    required: false,
    disabled: false
  },
  decorators: [Story => <div style={{
    width: 320
  }}><Story /></div>]
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Type a number and tab away — the field formats to two decimal places on blur.'
      }
    }
  },
  args: {
    label: 'Amount',
    placeholder: '0'
  },
  decorators: [Story => <div style={{
    width: 280
  }}><Story /></div>]
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Use \`defaultValue\` (numeric) to pre-populate the field. The value is formatted on mount.'
      }
    }
  },
  args: {
    label: 'Balance',
    defaultValue: 1234567.89
  },
  decorators: [Story => <div style={{
    width: 280
  }}><Story /></div>]
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
          <MoneyField label="Small" size="small" placeholder="0" />\r
          <MoneyField label="Medium" size="medium" placeholder="0" />\r
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
          <MoneyField label="Small" size="small" condensed placeholder="0" />\r
          <MoneyField label="Medium" size="medium" condensed placeholder="0" />\r
        </div>\r
      </div>\r
    </div>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: ''
      }
    }
  },
  args: {
    label: 'Amount',
    error: true,
    helperText: 'Enter a valid dollar amount.'
  },
  decorators: [Story => <div style={{
    width: 280
  }}><Story /></div>]
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: ''
      }
    }
  },
  args: {
    label: 'Amount',
    defaultValue: 500,
    disabled: true
  },
  decorators: [Story => <div style={{
    width: 280
  }}><Story /></div>]
}`,...b.parameters?.docs?.source}}},x=[`Playground`,`Default`,`WithDefaultValue`,`Sizes`,`ErrorState`,`Disabled`]}))();export{g as Default,b as Disabled,y as ErrorState,h as Playground,v as Sizes,_ as WithDefaultValue,x as __namedExportsOrder,m as default};