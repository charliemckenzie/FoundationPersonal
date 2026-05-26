import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{n,t as r}from"./Select-Vn-GTvbF.js";var i,a,o,s,c,l,u,d,f,p,m,h,g,_,v;e((()=>{i=t(),n(),a=[{value:`apple`,label:`Apple`},{value:`banana`,label:`Banana`},{value:`cherry`,label:`Cherry`},{value:`durian`,label:`Durian`,disabled:!0}],o={title:`Form Components / Select`,component:r,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:"Select renders a dropdown for choosing from a fixed list of options.\n\nOn mobile (below `sm`) the custom variant opens a bottom drawer automatically — no additional configuration needed. Use `native` to render the browser's native `<select>` element when OS-level autofill, accessibility in constrained environments, or very long option lists are the priority.\n\nFor searchable option lists, use `Autocomplete` instead."}}},args:{error:!1,required:!1,disabled:!1,fullWidth:!1,native:!1},argTypes:{size:{control:`select`,options:[`small`,`medium`]},condensed:{control:`boolean`},error:{control:`boolean`},required:{control:`boolean`},disabled:{control:`boolean`},fullWidth:{control:`boolean`},native:{control:`boolean`},onChange:{table:{disable:!0}},id:{table:{disable:!0}},name:{table:{disable:!0}},value:{table:{disable:!0}},defaultValue:{table:{disable:!0}}}},s={name:`Playground`,parameters:{docs:{description:{story:``}}},args:{label:`Label`,options:a,placeholder:`Select an option`,size:`medium`,condensed:!1},decorators:[e=>(0,i.jsx)(`div`,{style:{width:240},children:(0,i.jsx)(e,{})})]},c={parameters:{docs:{description:{story:`Standard dropdown with label and placeholder.`}}},args:{label:`Fruit`,options:a,placeholder:`Select a fruit`},decorators:[e=>(0,i.jsx)(`div`,{style:{width:240},children:(0,i.jsx)(e,{})})]},l={parameters:{docs:{description:{story:[`Two sizes cover the full range of layout needs.`,``,`| Size | Default height | Condensed height |`,`|------|---------------|-----------------|`,`| Small | 40px | 36px |`,`| Medium | 48px | 44px |`,``,`**Default** — use in standard form layouts, dialogs, and standalone inputs.`,``,"**Condensed** — use in dense interfaces: table toolbars, filter bars, and anywhere vertical rhythm is tight. Apply the `condensed` prop; do not substitute a smaller size tier to save space.",``,"> **iOS zoom:** Input font size is fixed at `1rem` (16px) regardless of size or condensed state. iOS Safari automatically zooms the viewport when a focused input has a font size below 16px. Do not override the input font size."].join(`
`)}}},render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24,width:280},children:[(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{style:{margin:`0 0 12px`,fontWeight:600,fontSize:13,textTransform:`uppercase`,letterSpacing:`0.05em`,color:`#666`},children:`Default`}),(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,i.jsx)(r,{label:`Small`,size:`small`,options:a,placeholder:`Small field`}),(0,i.jsx)(r,{label:`Medium`,size:`medium`,options:a,placeholder:`Medium field`})]})]}),(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{style:{margin:`0 0 12px`,fontWeight:600,fontSize:13,textTransform:`uppercase`,letterSpacing:`0.05em`,color:`#666`},children:`Condensed`}),(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,i.jsx)(r,{label:`Small`,size:`small`,condensed:!0,options:a,placeholder:`Small condensed`}),(0,i.jsx)(r,{label:`Medium`,size:`medium`,condensed:!0,options:a,placeholder:`Medium condensed`})]})]})]})},u={parameters:{docs:{description:{story:`Two selects with different option sets, demonstrating label alignment across a form column.`}}},render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,width:320},children:[(0,i.jsx)(r,{label:`Fruit`,options:a,placeholder:`Select a fruit`}),(0,i.jsx)(r,{label:`Country`,options:[{value:`au`,label:`Australia`},{value:`nz`,label:`New Zealand`},{value:`us`,label:`United States`}],placeholder:`Select your country`})]})},d={parameters:{docs:{description:{story:"**Usage guidance:** Use `helperText` for persistent guidance displayed beneath the field."}}},args:{label:`Fruit`,options:a,placeholder:`Select a fruit`,helperText:`Pick your favourite.`},decorators:[e=>(0,i.jsx)(`div`,{style:{width:240},children:(0,i.jsx)(e,{})})]},f={parameters:{docs:{description:{story:"**Usage guidance:** Set `error` when validation fails. Pair with `helperText` to explain what went wrong."}}},args:{label:`Fruit`,options:a,placeholder:`Select a fruit`,error:!0,helperText:`Please select an option.`},decorators:[e=>(0,i.jsx)(`div`,{style:{width:240},children:(0,i.jsx)(e,{})})]},p={parameters:{docs:{description:{story:"**Usage guidance:** Use `errorMessage` alongside `helperText` when you need both persistent context and a specific validation message on the same field."}}},args:{label:`Fruit`,options:a,placeholder:`Select a fruit`,error:!0,helperText:`Pick your favourite.`,errorMessage:`Please select an option.`},decorators:[e=>(0,i.jsx)(`div`,{style:{width:240},children:(0,i.jsx)(e,{})})]},m={parameters:{docs:{description:{story:"**Usage guidance:** Use `required` to mark mandatory fields."}}},args:{label:`Fruit`,options:a,placeholder:`Select a fruit`,required:!0},decorators:[e=>(0,i.jsx)(`div`,{style:{width:240},children:(0,i.jsx)(e,{})})]},h={parameters:{docs:{description:{story:"**Usage guidance:** Use `disabled` when the field is not editable in the current state."}}},args:{label:`Fruit`,options:a,disabled:!0,defaultValue:`apple`},decorators:[e=>(0,i.jsx)(`div`,{style:{width:240},children:(0,i.jsx)(e,{})})]},g={parameters:{docs:{description:{story:["Renders a native `<select>` element instead of the custom MUI dropdown. Use it when:",``,`- **Autocomplete matters** — browsers surface native selects in OS-level autofill, which the custom dropdown cannot participate in.`,`- **Mobile form UX** — native selects trigger the platform's built-in picker (iOS scroll wheel, Android bottom sheet), which users expect in form contexts.`,`- **Accessibility in constrained environments** — assistive technologies and older browsers have deeper, more reliable support for native form controls.`,`- **Long option lists** — the OS picker handles scroll and search natively without custom implementation.`,``,`Use the default (custom) variant when you need placeholder text, custom option rendering, or the mobile bottom-drawer behaviour.`].join(`
`)}}},args:{label:`Fruit`,options:a,placeholder:`Select a fruit`,native:!0},decorators:[e=>(0,i.jsx)(`div`,{style:{width:240},children:(0,i.jsx)(e,{})})]},_={parameters:{docs:{description:{story:`All interaction states for the native variant — default, with a value selected, error, and disabled.`}}},render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,width:240},children:[(0,i.jsx)(r,{label:`Default`,options:a,placeholder:`Select a fruit`,native:!0}),(0,i.jsx)(r,{label:`With value`,options:a,defaultValue:`apple`,native:!0}),(0,i.jsx)(r,{label:`Error`,options:a,placeholder:`Select a fruit`,native:!0,error:!0,helperText:`Please select an option.`}),(0,i.jsx)(r,{label:`Disabled`,options:a,native:!0,disabled:!0,defaultValue:`banana`})]})},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: ''
      }
    }
  },
  args: {
    label: 'Label',
    options: FRUIT_OPTIONS,
    placeholder: 'Select an option',
    size: 'medium',
    condensed: false
  },
  decorators: [Story => <div style={{
    width: 240
  }}><Story /></div>]
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Standard dropdown with label and placeholder.'
      }
    }
  },
  args: {
    label: 'Fruit',
    options: FRUIT_OPTIONS,
    placeholder: 'Select a fruit'
  },
  decorators: [Story => <div style={{
    width: 240
  }}><Story /></div>]
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: ['Two sizes cover the full range of layout needs.', '', '| Size | Default height | Condensed height |', '|------|---------------|-----------------|', '| Small | 40px | 36px |', '| Medium | 48px | 44px |', '', '**Default** — use in standard form layouts, dialogs, and standalone inputs.', '', '**Condensed** — use in dense interfaces: table toolbars, filter bars, and anywhere vertical rhythm is tight. Apply the \`condensed\` prop; do not substitute a smaller size tier to save space.', '', '> **iOS zoom:** Input font size is fixed at \`1rem\` (16px) regardless of size or condensed state. iOS Safari automatically zooms the viewport when a focused input has a font size below 16px. Do not override the input font size.'].join('\\n')
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
          <Select label="Small" size="small" options={FRUIT_OPTIONS} placeholder="Small field" />\r
          <Select label="Medium" size="medium" options={FRUIT_OPTIONS} placeholder="Medium field" />\r
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
          <Select label="Small" size="small" condensed options={FRUIT_OPTIONS} placeholder="Small condensed" />\r
          <Select label="Medium" size="medium" condensed options={FRUIT_OPTIONS} placeholder="Medium condensed" />\r
        </div>\r
      </div>\r
    </div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Two selects with different option sets, demonstrating label alignment across a form column.'
      }
    }
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: 320
  }}>\r
      <Select label="Fruit" options={FRUIT_OPTIONS} placeholder="Select a fruit" />\r
      <Select label="Country" options={[{
      value: 'au',
      label: 'Australia'
    }, {
      value: 'nz',
      label: 'New Zealand'
    }, {
      value: 'us',
      label: 'United States'
    }]} placeholder="Select your country" />\r
    </div>
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`helperText\` for persistent guidance displayed beneath the field.'
      }
    }
  },
  args: {
    label: 'Fruit',
    options: FRUIT_OPTIONS,
    placeholder: 'Select a fruit',
    helperText: 'Pick your favourite.'
  },
  decorators: [Story => <div style={{
    width: 240
  }}><Story /></div>]
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Set \`error\` when validation fails. Pair with \`helperText\` to explain what went wrong.'
      }
    }
  },
  args: {
    label: 'Fruit',
    options: FRUIT_OPTIONS,
    placeholder: 'Select a fruit',
    error: true,
    helperText: 'Please select an option.'
  },
  decorators: [Story => <div style={{
    width: 240
  }}><Story /></div>]
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`errorMessage\` alongside \`helperText\` when you need both persistent context and a specific validation message on the same field.'
      }
    }
  },
  args: {
    label: 'Fruit',
    options: FRUIT_OPTIONS,
    placeholder: 'Select a fruit',
    error: true,
    helperText: 'Pick your favourite.',
    errorMessage: 'Please select an option.'
  },
  decorators: [Story => <div style={{
    width: 240
  }}><Story /></div>]
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`required\` to mark mandatory fields.'
      }
    }
  },
  args: {
    label: 'Fruit',
    options: FRUIT_OPTIONS,
    placeholder: 'Select a fruit',
    required: true
  },
  decorators: [Story => <div style={{
    width: 240
  }}><Story /></div>]
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`disabled\` when the field is not editable in the current state.'
      }
    }
  },
  args: {
    label: 'Fruit',
    options: FRUIT_OPTIONS,
    disabled: true,
    defaultValue: 'apple'
  },
  decorators: [Story => <div style={{
    width: 240
  }}><Story /></div>]
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: ['Renders a native \`<select>\` element instead of the custom MUI dropdown. Use it when:', '', '- **Autocomplete matters** — browsers surface native selects in OS-level autofill, which the custom dropdown cannot participate in.', '- **Mobile form UX** — native selects trigger the platform\\'s built-in picker (iOS scroll wheel, Android bottom sheet), which users expect in form contexts.', '- **Accessibility in constrained environments** — assistive technologies and older browsers have deeper, more reliable support for native form controls.', '- **Long option lists** — the OS picker handles scroll and search natively without custom implementation.', '', 'Use the default (custom) variant when you need placeholder text, custom option rendering, or the mobile bottom-drawer behaviour.'].join('\\n')
      }
    }
  },
  args: {
    label: 'Fruit',
    options: FRUIT_OPTIONS,
    placeholder: 'Select a fruit',
    native: true
  },
  decorators: [Story => <div style={{
    width: 240
  }}><Story /></div>]
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'All interaction states for the native variant — default, with a value selected, error, and disabled.'
      }
    }
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: 240
  }}>\r
      <Select label="Default" options={FRUIT_OPTIONS} placeholder="Select a fruit" native />\r
      <Select label="With value" options={FRUIT_OPTIONS} defaultValue="apple" native />\r
      <Select label="Error" options={FRUIT_OPTIONS} placeholder="Select a fruit" native error helperText="Please select an option." />\r
      <Select label="Disabled" options={FRUIT_OPTIONS} native disabled defaultValue="banana" />\r
    </div>
}`,..._.parameters?.docs?.source}}},v=[`Playground`,`Default`,`Sizes`,`WithLabels`,`WithHelperText`,`ErrorState`,`ErrorWithHelperText`,`Required`,`Disabled`,`Native`,`NativeStates`]}))();export{c as Default,h as Disabled,f as ErrorState,p as ErrorWithHelperText,g as Native,_ as NativeStates,s as Playground,m as Required,l as Sizes,d as WithHelperText,u as WithLabels,v as __namedExportsOrder,o as default};