import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{n,t as r}from"./TextField-BFXHaNu_.js";function i({label:e=`Date of birth`,condensed:t,...n}){return(0,a.jsx)(r,{label:e,type:`date`,condensed:t,htmlInputProps:{min:`1900-01-01`,max:o},...n})}var a,o,s=e((()=>{a=t(),n(),o=new Date().toISOString().split(`T`)[0],i.__docgenInfo={description:``,methods:[],displayName:`DateOfBirthField`,props:{label:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'Date of birth'`,computed:!1}},value:{required:!1,tsType:{name:`string`},description:``},defaultValue:{required:!1,tsType:{name:`string`},description:``},size:{required:!1,tsType:{name:`union`,raw:`'small' | 'medium'`,elements:[{name:`literal`,value:`'small'`},{name:`literal`,value:`'medium'`}]},description:``},condensed:{required:!1,tsType:{name:`boolean`},description:``},helperText:{required:!1,tsType:{name:`string`},description:``},error:{required:!1,tsType:{name:`boolean`},description:``},required:{required:!1,tsType:{name:`boolean`},description:``},disabled:{required:!1,tsType:{name:`boolean`},description:``},fullWidth:{required:!1,tsType:{name:`boolean`},description:``},onChange:{required:!1,tsType:{name:`ReactChangeEventHandler`,raw:`React.ChangeEventHandler<HTMLInputElement>`,elements:[{name:`HTMLInputElement`}]},description:``},onBlur:{required:!1,tsType:{name:`ReactFocusEventHandler`,raw:`React.FocusEventHandler<HTMLInputElement>`,elements:[{name:`HTMLInputElement`}]},description:``},id:{required:!1,tsType:{name:`string`},description:``},name:{required:!1,tsType:{name:`string`},description:``}}}})),c,l,u,d,f,p,m,h,g;e((()=>{c=t(),s(),l={title:`Form Components / TextInput / DateOfBirthField`,component:i,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`DateOfBirthField is a date input pre-configured for date of birth entry. The min is clamped to 1900-01-01 and the max is clamped to today.

Styling is inherited from TextField — visual changes to TextField apply here automatically.

**Behaviour:**
- Renders a native date picker with \`type="date"\`
- Restricts selectable dates to 1900-01-01 through today
- The label defaults to "Date of birth" but can be overridden
- On iOS, the native date picker renders as a wheel — height collapse is prevented via \`-webkit-date-and-time-value\``}}},argTypes:{size:{control:`select`,options:[`small`,`medium`]},condensed:{control:`boolean`},value:{table:{disable:!0}},defaultValue:{table:{disable:!0}},onChange:{table:{disable:!0}},onBlur:{table:{disable:!0}},id:{table:{disable:!0}},name:{table:{disable:!0}},fullWidth:{table:{disable:!0}}}},u={name:`Playground`,parameters:{docs:{description:{story:``}}},args:{label:`Date of birth`,size:`medium`,condensed:!1,error:!1,required:!1,disabled:!1},decorators:[e=>(0,c.jsx)(`div`,{style:{width:280},children:(0,c.jsx)(e,{})})]},d={parameters:{docs:{description:{story:`Date of birth field with default label and native date picker. Min is 1900-01-01; max is today.`}}},args:{},decorators:[e=>(0,c.jsx)(`div`,{style:{width:280},children:(0,c.jsx)(e,{})})]},f={parameters:{docs:{description:{story:`Override the default label when the field is used in a different context.`}}},args:{label:`Director date of birth`},decorators:[e=>(0,c.jsx)(`div`,{style:{width:280},children:(0,c.jsx)(e,{})})]},p={parameters:{docs:{description:{story:[`Two sizes cover the full range of layout needs.`,``,`| Size | Default height | Condensed height |`,`|------|---------------|-----------------|`,`| Small | 40px | 36px |`,`| Medium | 48px | 44px |`,``,`**Default** — use in standard form layouts, dialogs, and standalone inputs.`,``,"**Condensed** — use in dense interfaces: data tables, filter bars, and anywhere vertical rhythm is tight. Apply the `condensed` prop; do not substitute a smaller size tier to save space.",``,"> **iOS zoom:** Input font size is fixed at `1rem` (16px) regardless of size or condensed state. iOS Safari automatically zooms the viewport when a focused input has a font size below 16px. Do not override the input font size."].join(`
`)}}},render:()=>(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24,width:280},children:[(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`p`,{style:{margin:`0 0 12px`,fontWeight:600,fontSize:13,textTransform:`uppercase`,letterSpacing:`0.05em`,color:`#666`},children:`Default`}),(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,c.jsx)(i,{label:`Date of birth (small)`,size:`small`}),(0,c.jsx)(i,{label:`Date of birth (medium)`,size:`medium`})]})]}),(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`p`,{style:{margin:`0 0 12px`,fontWeight:600,fontSize:13,textTransform:`uppercase`,letterSpacing:`0.05em`,color:`#666`},children:`Condensed`}),(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,c.jsx)(i,{label:`Date of birth (small)`,size:`small`,condensed:!0}),(0,c.jsx)(i,{label:`Date of birth (medium)`,size:`medium`,condensed:!0})]})]})]})},m={parameters:{docs:{description:{story:``}}},args:{error:!0,helperText:`Enter a valid date of birth.`},decorators:[e=>(0,c.jsx)(`div`,{style:{width:280},children:(0,c.jsx)(e,{})})]},h={parameters:{docs:{description:{story:``}}},args:{defaultValue:`1990-06-15`,disabled:!0},decorators:[e=>(0,c.jsx)(`div`,{style:{width:280},children:(0,c.jsx)(e,{})})]},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: ''
      }
    }
  },
  args: {
    label: 'Date of birth',
    size: 'medium',
    condensed: false,
    error: false,
    required: false,
    disabled: false
  },
  decorators: [Story => <div style={{
    width: 280
  }}><Story /></div>]
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Date of birth field with default label and native date picker. Min is 1900-01-01; max is today.'
      }
    }
  },
  args: {},
  decorators: [Story => <div style={{
    width: 280
  }}><Story /></div>]
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Override the default label when the field is used in a different context.'
      }
    }
  },
  args: {
    label: 'Director date of birth'
  },
  decorators: [Story => <div style={{
    width: 280
  }}><Story /></div>]
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
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
          <DateOfBirthField label="Date of birth (small)" size="small" />\r
          <DateOfBirthField label="Date of birth (medium)" size="medium" />\r
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
          <DateOfBirthField label="Date of birth (small)" size="small" condensed />\r
          <DateOfBirthField label="Date of birth (medium)" size="medium" condensed />\r
        </div>\r
      </div>\r
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: ''
      }
    }
  },
  args: {
    error: true,
    helperText: 'Enter a valid date of birth.'
  },
  decorators: [Story => <div style={{
    width: 280
  }}><Story /></div>]
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: ''
      }
    }
  },
  args: {
    defaultValue: '1990-06-15',
    disabled: true
  },
  decorators: [Story => <div style={{
    width: 280
  }}><Story /></div>]
}`,...h.parameters?.docs?.source}}},g=[`Playground`,`Default`,`CustomLabel`,`Sizes`,`ErrorState`,`Disabled`]}))();export{f as CustomLabel,d as Default,h as Disabled,m as ErrorState,u as Playground,p as Sizes,g as __namedExportsOrder,l as default};