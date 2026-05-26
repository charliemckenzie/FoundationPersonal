import{n as e,s as t}from"./chunk-Bj-mKKzh.js";import{t as n}from"./react-DVKR3yZN.js";import{t as r}from"./jsx-runtime-CyI9ICYU.js";import{n as i,t as a}from"./Box-Cj6TI_Dr.js";import{n as o,t as s}from"./Icon-IHyqCtZq.js";import{n as c,t as l}from"./TextField-BFXHaNu_.js";function u(e){let[t,n]=(0,f.useState)(!1),r=(0,d.jsx)(i,{component:`button`,type:`button`,"aria-label":t?`Hide password`:`Show password`,onClick:()=>n(e=>!e),sx:e=>({background:`none`,border:`none`,padding:`0 0.25rem`,cursor:`pointer`,fontSize:`0.875rem`,fontWeight:600,color:`primary.main`,lineHeight:1,"&:hover":{opacity:.8},"&:focus-visible":{outline:`2px solid ${e.palette.border.focus}`,outlineOffset:`2px`,borderRadius:`2px`}}),children:t?`Hide`:`Show`});return(0,d.jsx)(l,{...e,type:t?`text`:`password`,endAdornment:r})}var d,f,p=e((()=>{d=r(),f=t(n()),a(),c(),u.__docgenInfo={description:``,methods:[],displayName:`PasswordField`}})),m,h,g,_,v,y,b,x,S,C;e((()=>{m=r(),p(),o(),h={title:`Form Components / TextInput / PasswordField`,component:u,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`PasswordField is a password input with a built-in show/hide toggle. Use it wherever a user needs to enter a password or sensitive value.

The show/hide toggle is always present and cannot be removed — it is a core accessibility and usability requirement. The toggle label updates for screen readers as state changes.

Do not use \`TextField type="password"\` directly — use this component instead.`}}},argTypes:{condensed:{control:`boolean`},size:{control:`select`,options:[`small`,`medium`]},errorMessage:{if:{arg:`error`,truthy:!0}},value:{table:{disable:!0}},defaultValue:{table:{disable:!0}},onChange:{table:{disable:!0}},onBlur:{table:{disable:!0}},onFocus:{table:{disable:!0}},htmlInputProps:{table:{disable:!0}},id:{table:{disable:!0}},name:{table:{disable:!0}},autoComplete:{table:{disable:!0}},fullWidth:{table:{disable:!0}}}},g={name:`Playground`,parameters:{docs:{description:{story:``}}},argTypes:{showHelperText:{control:`boolean`,name:`helperText`},helperText:{table:{disable:!0}},startAdornment:{table:{disable:!0}}},args:{condensed:!1,label:`Password`,placeholder:`••••••••`,size:`medium`,error:!1,errorMessage:`This field contains an error. Please check and try again.`,required:!1,disabled:!1,showHelperText:!1},render:e=>{let{showHelperText:t,...n}=e;return(0,m.jsx)(`div`,{style:{width:320},children:(0,m.jsx)(u,{...n,helperText:t?`Use at least 8 characters, including a number and a symbol.`:void 0})})}},_={parameters:{docs:{description:{story:`Password field with label. The show/hide toggle is always present.`}}},args:{label:`Password`,placeholder:`••••••••`},decorators:[e=>(0,m.jsx)(`div`,{style:{width:320},children:(0,m.jsx)(e,{})})]},v={parameters:{docs:{description:{story:"**Usage guidance:** Use `startAdornment` to reinforce the field purpose with an icon. The end adornment is reserved for the show/hide toggle."}}},render:()=>(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,width:320},children:[(0,m.jsx)(u,{label:`Password`,placeholder:`••••••••`,startAdornment:(0,m.jsx)(s,{icon:`lock`,size:`lg`})}),(0,m.jsx)(u,{label:`Confirm password`,placeholder:`••••••••`,startAdornment:(0,m.jsx)(s,{icon:`key`,size:`lg`})})]})},y={parameters:{docs:{description:{story:`When no label is present the placeholder renders at higher contrast automatically. Prefer a visible label wherever possible.`}}},render:()=>(0,m.jsx)(`div`,{style:{width:320},children:(0,m.jsx)(u,{placeholder:`Enter password`})})},b={parameters:{docs:{description:{story:[`Two sizes cover the full range of layout needs.`,``,`| Size | Default height | Condensed height |`,`|------|---------------|-----------------|`,`| Small | 40px | 36px |`,`| Medium | 48px | 44px |`,``,`**Default** — use in standard form layouts, dialogs, and standalone inputs.`,``,"**Condensed** — use in dense interfaces: data tables, filter bars, and anywhere vertical rhythm is tight. Apply the `condensed` prop; do not substitute a smaller size tier to save space.",``,"> **iOS zoom:** Input font size is fixed at `1rem` (16px) regardless of size or condensed state. iOS Safari automatically zooms the viewport when a focused input has a font size below 16px. Do not override the input font size."].join(`
`)}}},render:()=>(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24,width:280},children:[(0,m.jsxs)(`div`,{children:[(0,m.jsx)(`p`,{style:{margin:`0 0 12px`,fontWeight:600,fontSize:13,textTransform:`uppercase`,letterSpacing:`0.05em`,color:`#666`},children:`Default`}),(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,m.jsx)(u,{label:`Small`,size:`small`,placeholder:`••••••••`}),(0,m.jsx)(u,{label:`Medium`,size:`medium`,placeholder:`••••••••`})]})]}),(0,m.jsxs)(`div`,{children:[(0,m.jsx)(`p`,{style:{margin:`0 0 12px`,fontWeight:600,fontSize:13,textTransform:`uppercase`,letterSpacing:`0.05em`,color:`#666`},children:`Condensed`}),(0,m.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,m.jsx)(u,{label:`Small`,size:`small`,condensed:!0,placeholder:`••••••••`}),(0,m.jsx)(u,{label:`Medium`,size:`medium`,condensed:!0,placeholder:`••••••••`})]})]})]})},x={parameters:{docs:{description:{story:"**Usage guidance:** Set `error` and `helperText` together — the helper text explains what went wrong."}}},args:{label:`Password`,error:!0,helperText:`Password must be at least 8 characters.`},decorators:[e=>(0,m.jsx)(`div`,{style:{width:320},children:(0,m.jsx)(e,{})})]},S={parameters:{docs:{description:{story:`The show/hide toggle is also disabled when the field is disabled.`}}},args:{label:`Password`,value:`hidden-value`,disabled:!0},decorators:[e=>(0,m.jsx)(`div`,{style:{width:320},children:(0,m.jsx)(e,{})})]},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: ''
      }
    }
  },
  argTypes: {
    showHelperText: {
      control: 'boolean',
      name: 'helperText'
    },
    helperText: {
      table: {
        disable: true
      }
    },
    startAdornment: {
      table: {
        disable: true
      }
    }
  },
  args: {
    condensed: false,
    label: 'Password',
    placeholder: '••••••••',
    size: 'medium',
    error: false,
    errorMessage: 'This field contains an error. Please check and try again.',
    required: false,
    disabled: false,
    showHelperText: false
  } as Story['args'] & {
    showHelperText: boolean;
  },
  render: args => {
    const {
      showHelperText,
      ...rest
    } = args as PasswordFieldProps & {
      showHelperText?: boolean;
    };
    return <div style={{
      width: 320
    }}>\r
        <PasswordField {...rest} helperText={showHelperText ? 'Use at least 8 characters, including a number and a symbol.' : undefined} />\r
      </div>;
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Password field with label. The show/hide toggle is always present.'
      }
    }
  },
  args: {
    label: 'Password',
    placeholder: '••••••••'
  },
  decorators: [Story => <div style={{
    width: 320
  }}><Story /></div>]
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`startAdornment\` to reinforce the field purpose with an icon. The end adornment is reserved for the show/hide toggle.'
      }
    }
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: 320
  }}>\r
      <PasswordField label="Password" placeholder="••••••••" startAdornment={<Icon icon="lock" size="lg" />} />\r
      <PasswordField label="Confirm password" placeholder="••••••••" startAdornment={<Icon icon="key" size="lg" />} />\r
    </div>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'When no label is present the placeholder renders at higher contrast automatically. Prefer a visible label wherever possible.'
      }
    }
  },
  render: () => <div style={{
    width: 320
  }}>\r
      <PasswordField placeholder="Enter password" />\r
    </div>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
          <PasswordField label="Small" size="small" placeholder="••••••••" />\r
          <PasswordField label="Medium" size="medium" placeholder="••••••••" />\r
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
          <PasswordField label="Small" size="small" condensed placeholder="••••••••" />\r
          <PasswordField label="Medium" size="medium" condensed placeholder="••••••••" />\r
        </div>\r
      </div>\r
    </div>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Set \`error\` and \`helperText\` together — the helper text explains what went wrong.'
      }
    }
  },
  args: {
    label: 'Password',
    error: true,
    helperText: 'Password must be at least 8 characters.'
  },
  decorators: [Story => <div style={{
    width: 320
  }}><Story /></div>]
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'The show/hide toggle is also disabled when the field is disabled.'
      }
    }
  },
  args: {
    label: 'Password',
    value: 'hidden-value',
    disabled: true
  },
  decorators: [Story => <div style={{
    width: 320
  }}><Story /></div>]
}`,...S.parameters?.docs?.source}}},C=[`Playground`,`Default`,`WithStartAdornment`,`NoLabel`,`Sizes`,`ErrorState`,`Disabled`]}))();export{_ as Default,S as Disabled,x as ErrorState,y as NoLabel,g as Playground,b as Sizes,v as WithStartAdornment,C as __namedExportsOrder,h as default};