import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{n,t as r}from"./Icon-IHyqCtZq.js";import{n as i,t as a}from"./TextField-BFXHaNu_.js";var o,s,c,l,u,d,f,p,m,h,g,_,v,y,b;e((()=>{o=t(),i(),n(),s=[`magnifying-glass`,`lock`,`key`,`circle-info`,`circle-question`,`circle-check`,`xmark`,`circle-dollar`],c={title:`Form Components / TextInput / TextField`,component:a,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`TextField is a single-line text input. Use it for free-text entry — names, emails, search queries, and other unstructured values.

For passwords, multi-line text, currency, percentages, or date of birth, use the purpose-built components in this group instead. They inherit TextField's styling automatically.`}}},argTypes:{condensed:{control:`boolean`},type:{control:`select`,options:[`text`,`email`,`number`,`tel`,`url`,`search`,`date`]},size:{control:`select`,options:[`small`,`medium`]},errorMessage:{if:{arg:`error`,truthy:!0}},value:{table:{disable:!0}},defaultValue:{table:{disable:!0}},multiline:{table:{disable:!0}},rows:{table:{disable:!0}},onChange:{table:{disable:!0}},onBlur:{table:{disable:!0}},onFocus:{table:{disable:!0}},htmlInputProps:{table:{disable:!0}},id:{table:{disable:!0}},name:{table:{disable:!0}},autoComplete:{table:{disable:!0}},fullWidth:{table:{disable:!0}}}},l={name:`Playground`,parameters:{docs:{description:{story:``}}},argTypes:{showHelperText:{control:`boolean`,name:`helperText`},helperText:{table:{disable:!0}},startAdornment:{table:{disable:!0}},endAdornment:{table:{disable:!0}},showStartAdornment:{control:`boolean`,name:`startAdornment`},startAdornmentIcon:{control:`select`,options:s,name:`start icon`,if:{arg:`showStartAdornment`,truthy:!0}},startAdornmentText:{control:`text`,name:`start text`,if:{arg:`showStartAdornment`,truthy:!0}},showEndAdornment:{control:`boolean`,name:`endAdornment`},endAdornmentIcon:{control:`select`,options:s,name:`end icon`,if:{arg:`showEndAdornment`,truthy:!0}},endAdornmentText:{control:`text`,name:`end text`,if:{arg:`showEndAdornment`,truthy:!0}}},args:{condensed:!1,label:`Label`,placeholder:`Placeholder text`,type:`text`,size:`medium`,error:!1,errorMessage:`This field contains an error. Please check and try again.`,required:!1,disabled:!1,showHelperText:!1,showStartAdornment:!1,startAdornmentIcon:`magnifying-glass`,startAdornmentText:``,showEndAdornment:!1,endAdornmentIcon:`circle-info`,endAdornmentText:``},render:e=>{let{showHelperText:t,showStartAdornment:n,startAdornmentIcon:i,startAdornmentText:s,showEndAdornment:c,endAdornmentIcon:l,endAdornmentText:u,...d}=e,f=n?s?(0,o.jsx)(`span`,{children:s}):(0,o.jsx)(r,{icon:i??`magnifying-glass`,size:`lg`}):void 0,p=c?u?(0,o.jsx)(`span`,{children:u}):(0,o.jsx)(r,{icon:l??`circle-info`,size:`lg`}):void 0;return(0,o.jsx)(`div`,{style:{width:320},children:(0,o.jsx)(a,{...d,startAdornment:f,endAdornment:p,helperText:t?`Enter a value that matches the required format.`:void 0},d.type)})}},u={parameters:{docs:{description:{story:`Standard text field with label and placeholder.`}}},args:{label:`Username`,placeholder:`Enter username`}},d={parameters:{docs:{description:{story:["**Usage guidance:** Omit `label` when the surrounding context makes the field's purpose clear — search bars, inline edit fields, or table cell inputs.",``,"> **Placeholder contrast:** When no label is present, the placeholder is the only descriptor for the field. The component automatically renders it at a higher contrast (`text.secondary`, full opacity) in this case. Do not suppress or lighten placeholder text on unlabelled fields."].join(`
`)}}},render:()=>(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,width:320},children:[(0,o.jsx)(a,{placeholder:`Enter username`}),(0,o.jsx)(a,{type:`email`,placeholder:`Enter email`}),(0,o.jsx)(a,{type:`search`,placeholder:`Search...`})]})},f={parameters:{docs:{description:{story:[`Two sizes cover the full range of layout needs.`,``,`| Size | Default height | Condensed height |`,`|------|---------------|-----------------|`,`| Small | 40px | 36px |`,`| Medium | 48px | 44px |`,``,`**Default** — use in standard form layouts, dialogs, and standalone inputs.`,``,"**Condensed** — use in dense interfaces: data tables, filter bars, and anywhere vertical rhythm is tight. Apply the `condensed` prop; do not substitute a smaller size tier to save space.",``,"> **iOS zoom:** Input font size is fixed at `1rem` (16px) regardless of size or condensed state. iOS Safari automatically zooms the viewport when a focused input has a font size below 16px. Do not override the input font size."].join(`
`)}}},render:()=>(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24,width:280},children:[(0,o.jsxs)(`div`,{children:[(0,o.jsx)(`p`,{style:{margin:`0 0 12px`,fontWeight:600,fontSize:13,textTransform:`uppercase`,letterSpacing:`0.05em`,color:`#666`},children:`Default`}),(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,o.jsx)(a,{label:`Small`,size:`small`,placeholder:`Small field`}),(0,o.jsx)(a,{label:`Medium`,size:`medium`,placeholder:`Medium field`})]})]}),(0,o.jsxs)(`div`,{children:[(0,o.jsx)(`p`,{style:{margin:`0 0 12px`,fontWeight:600,fontSize:13,textTransform:`uppercase`,letterSpacing:`0.05em`,color:`#666`},children:`Condensed`}),(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,o.jsx)(a,{label:`Small`,size:`small`,condensed:!0,placeholder:`Small condensed`}),(0,o.jsx)(a,{label:`Medium`,size:`medium`,condensed:!0,placeholder:`Medium condensed`})]})]})]})},p={parameters:{docs:{description:{story:"**Usage guidance:** Set `type` to trigger the correct keyboard on mobile and enable browser behaviour for that input type — email validation, numeric input, and so on. For passwords use `PasswordField`."}}},render:()=>(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,width:280},children:[(0,o.jsx)(a,{label:`Text`,type:`text`,placeholder:`Text input`}),(0,o.jsx)(a,{label:`Email`,type:`email`,placeholder:`you@example.com`}),(0,o.jsx)(a,{label:`Number`,type:`number`,placeholder:`0`}),(0,o.jsx)(a,{label:`Search`,type:`search`,placeholder:`Search...`})]})},m={parameters:{docs:{description:{story:"**Usage guidance:** Use `startAdornment` and `endAdornment` for icons, units, or action buttons. One adornment per side maximum."}}},render:()=>(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,width:280},children:[(0,o.jsx)(a,{label:`Search`,type:`search`,placeholder:`Search...`,startAdornment:(0,o.jsx)(r,{icon:`magnifying-glass`,size:`lg`})}),(0,o.jsx)(a,{label:`Password`,type:`password`,placeholder:`••••••••`,startAdornment:(0,o.jsx)(r,{icon:`lock`,size:`lg`})})]})},h={parameters:{docs:{description:{story:"**Usage guidance:** Use `helperText` for persistent guidance the user needs before typing — constraints, format hints, or context."}}},args:{label:`Username`,placeholder:`Enter username`,helperText:`Must be 3–20 characters.`}},g={parameters:{docs:{description:{story:"**Usage guidance:** Set `error` when validation fails. Always pair with `helperText` to explain what went wrong."}}},args:{label:`Email`,value:`not-an-email`,error:!0,helperText:`Enter a valid email address.`}},_={parameters:{docs:{description:{story:"**Usage guidance:** Use `errorMessage` alongside `helperText` when you need both persistent context and a specific validation message on the same field. `helperText` shows in its normal position; `errorMessage` appears beneath it in red."}}},args:{label:`Username`,value:`ab`,error:!0,helperText:`Must be 3–20 characters.`,errorMessage:`Username is too short.`}},v={parameters:{docs:{description:{story:"**Usage guidance:** Use `required` to mark mandatory fields. The asterisk is visible; assistive technologies will also announce the requirement."}}},args:{label:`Full name`,required:!0,placeholder:`Your full name`}},y={parameters:{docs:{description:{story:"**Usage guidance:** Use `disabled` when the field is not editable — for example, while a form is submitting or a value has been locked."}}},args:{label:`Disabled field`,value:`Cannot edit this`,disabled:!0}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
    },
    endAdornment: {
      table: {
        disable: true
      }
    },
    showStartAdornment: {
      control: 'boolean',
      name: 'startAdornment'
    },
    startAdornmentIcon: {
      control: 'select',
      options: ADORNMENT_ICONS,
      name: 'start icon',
      if: {
        arg: 'showStartAdornment',
        truthy: true
      }
    },
    startAdornmentText: {
      control: 'text',
      name: 'start text',
      if: {
        arg: 'showStartAdornment',
        truthy: true
      }
    },
    showEndAdornment: {
      control: 'boolean',
      name: 'endAdornment'
    },
    endAdornmentIcon: {
      control: 'select',
      options: ADORNMENT_ICONS,
      name: 'end icon',
      if: {
        arg: 'showEndAdornment',
        truthy: true
      }
    },
    endAdornmentText: {
      control: 'text',
      name: 'end text',
      if: {
        arg: 'showEndAdornment',
        truthy: true
      }
    }
  },
  args: {
    condensed: false,
    label: 'Label',
    placeholder: 'Placeholder text',
    type: 'text',
    size: 'medium',
    error: false,
    errorMessage: 'This field contains an error. Please check and try again.',
    required: false,
    disabled: false,
    showHelperText: false,
    showStartAdornment: false,
    startAdornmentIcon: 'magnifying-glass',
    startAdornmentText: '',
    showEndAdornment: false,
    endAdornmentIcon: 'circle-info',
    endAdornmentText: ''
  } as Story['args'] & {
    showHelperText: boolean;
    showStartAdornment: boolean;
    startAdornmentIcon: string;
    startAdornmentText: string;
    showEndAdornment: boolean;
    endAdornmentIcon: string;
    endAdornmentText: string;
  },
  render: args => {
    const {
      showHelperText,
      showStartAdornment,
      startAdornmentIcon,
      startAdornmentText,
      showEndAdornment,
      endAdornmentIcon,
      endAdornmentText,
      ...rest
    } = args as TextFieldProps & {
      showHelperText?: boolean;
      showStartAdornment?: boolean;
      startAdornmentIcon?: string;
      startAdornmentText?: string;
      showEndAdornment?: boolean;
      endAdornmentIcon?: string;
      endAdornmentText?: string;
    };
    const startAdornment = showStartAdornment ? startAdornmentText ? <span>{startAdornmentText}</span> : <Icon icon={startAdornmentIcon ?? 'magnifying-glass'} size="lg" /> : undefined;
    const endAdornment = showEndAdornment ? endAdornmentText ? <span>{endAdornmentText}</span> : <Icon icon={endAdornmentIcon ?? 'circle-info'} size="lg" /> : undefined;
    return <div style={{
      width: 320
    }}>\r
        <TextField key={rest.type} {...rest} startAdornment={startAdornment} endAdornment={endAdornment} helperText={showHelperText ? 'Enter a value that matches the required format.' : undefined} />\r
      </div>;
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Standard text field with label and placeholder.'
      }
    }
  },
  args: {
    label: 'Username',
    placeholder: 'Enter username'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: ["**Usage guidance:** Omit \`label\` when the surrounding context makes the field's purpose clear — search bars, inline edit fields, or table cell inputs.", '', '> **Placeholder contrast:** When no label is present, the placeholder is the only descriptor for the field. The component automatically renders it at a higher contrast (\`text.secondary\`, full opacity) in this case. Do not suppress or lighten placeholder text on unlabelled fields.'].join('\\n')
      }
    }
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: 320
  }}>\r
      <TextField placeholder="Enter username" />\r
      <TextField type="email" placeholder="Enter email" />\r
      <TextField type="search" placeholder="Search..." />\r
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
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
          <TextField label="Small" size="small" placeholder="Small field" />\r
          <TextField label="Medium" size="medium" placeholder="Medium field" />\r
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
          <TextField label="Small" size="small" condensed placeholder="Small condensed" />\r
          <TextField label="Medium" size="medium" condensed placeholder="Medium condensed" />\r
        </div>\r
      </div>\r
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Set \`type\` to trigger the correct keyboard on mobile and enable browser behaviour for that input type — email validation, numeric input, and so on. For passwords use \`PasswordField\`.'
      }
    }
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: 280
  }}>\r
      <TextField label="Text" type="text" placeholder="Text input" />\r
      <TextField label="Email" type="email" placeholder="you@example.com" />\r
      <TextField label="Number" type="number" placeholder="0" />\r
      <TextField label="Search" type="search" placeholder="Search..." />\r
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`startAdornment\` and \`endAdornment\` for icons, units, or action buttons. One adornment per side maximum.'
      }
    }
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: 280
  }}>\r
      <TextField label="Search" type="search" placeholder="Search..." startAdornment={<Icon icon="magnifying-glass" size="lg" />} />\r
      <TextField label="Password" type="password" placeholder="••••••••" startAdornment={<Icon icon="lock" size="lg" />} />\r
    </div>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`helperText\` for persistent guidance the user needs before typing — constraints, format hints, or context.'
      }
    }
  },
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    helperText: 'Must be 3–20 characters.'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Set \`error\` when validation fails. Always pair with \`helperText\` to explain what went wrong.'
      }
    }
  },
  args: {
    label: 'Email',
    value: 'not-an-email',
    error: true,
    helperText: 'Enter a valid email address.'
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`errorMessage\` alongside \`helperText\` when you need both persistent context and a specific validation message on the same field. \`helperText\` shows in its normal position; \`errorMessage\` appears beneath it in red.'
      }
    }
  },
  args: {
    label: 'Username',
    value: 'ab',
    error: true,
    helperText: 'Must be 3–20 characters.',
    errorMessage: 'Username is too short.'
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`required\` to mark mandatory fields. The asterisk is visible; assistive technologies will also announce the requirement.'
      }
    }
  },
  args: {
    label: 'Full name',
    required: true,
    placeholder: 'Your full name'
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`disabled\` when the field is not editable — for example, while a form is submitting or a value has been locked.'
      }
    }
  },
  args: {
    label: 'Disabled field',
    value: 'Cannot edit this',
    disabled: true
  }
}`,...y.parameters?.docs?.source}}},b=[`Playground`,`Default`,`NoLabels`,`Sizes`,`Types`,`WithAdornments`,`HelperText`,`ErrorState`,`ErrorWithHelperText`,`Required`,`Disabled`]}))();export{u as Default,y as Disabled,g as ErrorState,_ as ErrorWithHelperText,h as HelperText,d as NoLabels,l as Playground,v as Required,f as Sizes,p as Types,m as WithAdornments,b as __namedExportsOrder,c as default};