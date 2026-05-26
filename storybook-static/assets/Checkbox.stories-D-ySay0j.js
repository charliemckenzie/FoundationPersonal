import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{n,t as r}from"./Checkbox-B4YNTLHA.js";var i,a,o,s,c,l,u,d,f,p,m,h,g,_;e((()=>{i=t(),n(),a={title:`Form Components / Checkbox`,component:r,tags:[`autodocs`],decorators:[(e,{args:t})=>{let{showHelperText:n,showDescription:r,...a}=t;return(0,i.jsx)(e,{args:{...a,helperText:n?a.helperText:void 0,description:r?a.description:void 0}})}],parameters:{layout:`centered`,docs:{description:{component:"Checkbox supports three variants:\n\n- `default` — a standard checkbox with label, helper text, and optional description. Use for binary choices in standard form layouts.\n- `boxed` — a full-width bordered row. Use for settings lists or permission toggles where visual separation between options improves scannability.\n- `card` — a tappable card tile with an optional icon. Use for selection UIs where visual distinction matters — product types, preference pickers, onboarding answers.\n\nAll variants support `error`, `disabled`, and `description`. The `indeterminate` state is available on the default variant for parent-child selection patterns."}}},args:{label:`Accept terms and conditions`,variant:`default`,icon:`piggy-bank`,indeterminate:!1,disabled:!1,required:!1,error:!1,errorMessage:`This field is required.`,showHelperText:!1,helperText:`We'll never share your details with anyone else.`,showDescription:!1,description:`Additional context about this option.`},argTypes:{variant:{control:`select`,options:[`default`,`boxed`,`card`]},label:{control:`text`},icon:{control:`select`,options:[`piggy-bank`,`chart-line`,`umbrella`,`star`,`heart`,`bolt`,`shield`,`house`],if:{arg:`variant`,eq:`card`}},cardDirection:{if:{arg:`variant`,eq:`card`}},color:{table:{disable:!0}},size:{table:{disable:!0}},checked:{table:{disable:!0}},defaultChecked:{table:{disable:!0}},indeterminate:{control:`boolean`},error:{control:`boolean`},errorMessage:{control:`text`,if:{arg:`error`,truthy:!0}},showHelperText:{control:`boolean`},helperText:{control:`text`,if:{arg:`showHelperText`,truthy:!0}},showDescription:{control:`boolean`},description:{control:`text`,if:{arg:`showDescription`,truthy:!0}},labelPlacement:{table:{disable:!0}},onChange:{table:{disable:!0}},id:{table:{disable:!0}},name:{table:{disable:!0}}}},o={name:`Playground`,parameters:{docs:{description:{story:``}}}},s={parameters:{docs:{description:{story:`Standard checkbox with label. Use for binary choices — accepting terms, toggling a preference, or selecting an item in a list.`}}}},c={parameters:{docs:{description:{story:`Controlled checked state.`}}},args:{label:`Checked`,checked:!0}},l={parameters:{docs:{description:{story:'**Usage guidance:** Use `indeterminate` when a parent checkbox represents a group where some — but not all — children are selected, such as a "Select all" control.'}}},args:{label:`Partially selected`,indeterminate:!0}},u={parameters:{docs:{description:{story:"**Usage guidance:** Use `helperText` for persistent guidance below the checkbox."}}},args:{label:`Subscribe to newsletter`,helperText:`We send one email per week, no spam.`}},d={parameters:{docs:{description:{story:"**Usage guidance:** Set `error` when validation fails. Use `helperText` for context. Add `errorMessage` when you need a separate validation message displayed beneath."}}},render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24},children:[(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{style:{fontSize:`0.75rem`,fontWeight:600,margin:`0 0 8px`},children:`Error with helper text`}),(0,i.jsx)(r,{label:`Accept terms`,error:!0,helperText:`You must accept the terms to continue.`})]}),(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{style:{fontSize:`0.75rem`,fontWeight:600,margin:`0 0 8px`},children:`Error with helper text and error message`}),(0,i.jsx)(r,{label:`Accept terms`,error:!0,helperText:`You must accept the terms before proceeding.`,errorMessage:`This field is required.`})]})]})},f={parameters:{docs:{description:{story:"**Usage guidance:** Use `disabled` when the checkbox cannot be interacted with in the current state."}}},render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,i.jsx)(r,{label:`Disabled unchecked`,disabled:!0}),(0,i.jsx)(r,{label:`Disabled checked`,disabled:!0,defaultChecked:!0})]})},p={parameters:{docs:{description:{story:"**Usage guidance:** Use `description` to add secondary text below the label — useful for explaining what checking the option does."}}},args:{label:`Subscribe to newsletter`,description:`We send one email per week. Unsubscribe any time.`}},m={parameters:{docs:{description:{story:'**Usage guidance:** Use `variant="boxed"` for settings-style lists where each row is a distinct, bordered option. Works with or without `description`. Use for multi-select scenarios where visual separation between options improves scannability.'}}},render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24,width:320},children:[(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{style:{fontSize:`0.75rem`,fontWeight:600,margin:`0 0 8px`},children:`Without description`}),(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,i.jsx)(r,{variant:`boxed`,label:`Email notifications`}),(0,i.jsx)(r,{variant:`boxed`,label:`Email notifications`,defaultChecked:!0}),(0,i.jsx)(r,{variant:`boxed`,label:`Email notifications`,disabled:!0})]})]}),(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{style:{fontSize:`0.75rem`,fontWeight:600,margin:`0 0 8px`},children:`With description`}),(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,i.jsx)(r,{variant:`boxed`,label:`Email notifications`,description:`Receive updates about your account activity.`}),(0,i.jsx)(r,{variant:`boxed`,label:`SMS alerts`,description:`Get urgent alerts sent directly to your phone.`,defaultChecked:!0}),(0,i.jsx)(r,{variant:`boxed`,label:`Marketing emails`,description:`Offers, promotions, and product news.`,disabled:!0})]})]})]})},h={name:`Card - Column`,parameters:{docs:{description:{story:'**Usage guidance:** Use `variant="card"` with `cardDirection="column"` (default) for visual tile selectors — product type choosers, preference pickers, or onboarding answer cards. Always pair with `icon` to maximise the visual impact.'}}},render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24},children:[(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{style:{fontSize:`0.75rem`,fontWeight:600,margin:`0 0 8px`},children:`Without description`}),(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`row`,gap:12},children:[(0,i.jsx)(r,{variant:`card`,label:`Savings`,icon:`piggy-bank`}),(0,i.jsx)(r,{variant:`card`,label:`Investment`,icon:`chart-line`,defaultChecked:!0}),(0,i.jsx)(r,{variant:`card`,label:`Insurance`,icon:`umbrella`,disabled:!0})]})]}),(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{style:{fontSize:`0.75rem`,fontWeight:600,margin:`0 0 8px`},children:`With description`}),(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`row`,gap:12},children:[(0,i.jsx)(r,{variant:`card`,label:`Savings`,description:`Grow your balance`,icon:`piggy-bank`}),(0,i.jsx)(r,{variant:`card`,label:`Investment`,description:`Build long-term wealth`,icon:`chart-line`,defaultChecked:!0}),(0,i.jsx)(r,{variant:`card`,label:`Insurance`,description:`Protect what matters`,icon:`umbrella`})]})]})]})},g={name:`Card - Row`,parameters:{docs:{description:{story:'**Usage guidance:** Use `cardDirection="row"` for horizontal-layout cards arranged in a vertical list. Better than `column` when descriptions are longer or when vertical space is limited.'}}},render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24},children:[(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{style:{fontSize:`0.75rem`,fontWeight:600,margin:`0 0 8px`},children:`Without description`}),(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12,width:320},children:[(0,i.jsx)(r,{variant:`card`,cardDirection:`row`,label:`Savings`,icon:`piggy-bank`}),(0,i.jsx)(r,{variant:`card`,cardDirection:`row`,label:`Investment`,icon:`chart-line`,defaultChecked:!0}),(0,i.jsx)(r,{variant:`card`,cardDirection:`row`,label:`Insurance`,icon:`umbrella`,disabled:!0})]})]}),(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{style:{fontSize:`0.75rem`,fontWeight:600,margin:`0 0 8px`},children:`With description`}),(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12,width:320},children:[(0,i.jsx)(r,{variant:`card`,cardDirection:`row`,label:`Savings`,description:`Grow your balance`,icon:`piggy-bank`}),(0,i.jsx)(r,{variant:`card`,cardDirection:`row`,label:`Investment`,description:`Build long-term wealth`,icon:`chart-line`,defaultChecked:!0}),(0,i.jsx)(r,{variant:`card`,cardDirection:`row`,label:`Insurance`,description:`Protect what matters`,icon:`umbrella`})]})]})]})},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: ''
      }
    }
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Standard checkbox with label. Use for binary choices — accepting terms, toggling a preference, or selecting an item in a list.'
      }
    }
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Controlled checked state.'
      }
    }
  },
  args: {
    label: 'Checked',
    checked: true
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`indeterminate\` when a parent checkbox represents a group where some — but not all — children are selected, such as a "Select all" control.'
      }
    }
  },
  args: {
    label: 'Partially selected',
    indeterminate: true
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`helperText\` for persistent guidance below the checkbox.'
      }
    }
  },
  args: {
    label: 'Subscribe to newsletter',
    helperText: 'We send one email per week, no spam.'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Set \`error\` when validation fails. Use \`helperText\` for context. Add \`errorMessage\` when you need a separate validation message displayed beneath.'
      }
    }
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 24
  }}>\r
      <div>\r
        <p style={{
        fontSize: '0.75rem',
        fontWeight: 600,
        margin: '0 0 8px'
      }}>Error with helper text</p>\r
        <Checkbox label="Accept terms" error helperText="You must accept the terms to continue." />\r
      </div>\r
      <div>\r
        <p style={{
        fontSize: '0.75rem',
        fontWeight: 600,
        margin: '0 0 8px'
      }}>Error with helper text and error message</p>\r
        <Checkbox label="Accept terms" error helperText="You must accept the terms before proceeding." errorMessage="This field is required." />\r
      </div>\r
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`disabled\` when the checkbox cannot be interacted with in the current state.'
      }
    }
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  }}>\r
      <Checkbox label="Disabled unchecked" disabled />\r
      <Checkbox label="Disabled checked" disabled defaultChecked />\r
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`description\` to add secondary text below the label — useful for explaining what checking the option does.'
      }
    }
  },
  args: {
    label: 'Subscribe to newsletter',
    description: 'We send one email per week. Unsubscribe any time.'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`variant="boxed"\` for settings-style lists where each row is a distinct, bordered option. Works with or without \`description\`. Use for multi-select scenarios where visual separation between options improves scannability.'
      }
    }
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    width: 320
  }}>\r
      <div>\r
        <p style={{
        fontSize: '0.75rem',
        fontWeight: 600,
        margin: '0 0 8px'
      }}>Without description</p>\r
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }}>\r
          <Checkbox variant="boxed" label="Email notifications" />\r
          <Checkbox variant="boxed" label="Email notifications" defaultChecked />\r
          <Checkbox variant="boxed" label="Email notifications" disabled />\r
        </div>\r
      </div>\r
      <div>\r
        <p style={{
        fontSize: '0.75rem',
        fontWeight: 600,
        margin: '0 0 8px'
      }}>With description</p>\r
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8
      }}>\r
          <Checkbox variant="boxed" label="Email notifications" description="Receive updates about your account activity." />\r
          <Checkbox variant="boxed" label="SMS alerts" description="Get urgent alerts sent directly to your phone." defaultChecked />\r
          <Checkbox variant="boxed" label="Marketing emails" description="Offers, promotions, and product news." disabled />\r
        </div>\r
      </div>\r
    </div>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Card - Column',
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`variant="card"\` with \`cardDirection="column"\` (default) for visual tile selectors — product type choosers, preference pickers, or onboarding answer cards. Always pair with \`icon\` to maximise the visual impact.'
      }
    }
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 24
  }}>\r
      <div>\r
        <p style={{
        fontSize: '0.75rem',
        fontWeight: 600,
        margin: '0 0 8px'
      }}>Without description</p>\r
        <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 12
      }}>\r
          <Checkbox variant="card" label="Savings" icon="piggy-bank" />\r
          <Checkbox variant="card" label="Investment" icon="chart-line" defaultChecked />\r
          <Checkbox variant="card" label="Insurance" icon="umbrella" disabled />\r
        </div>\r
      </div>\r
      <div>\r
        <p style={{
        fontSize: '0.75rem',
        fontWeight: 600,
        margin: '0 0 8px'
      }}>With description</p>\r
        <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 12
      }}>\r
          <Checkbox variant="card" label="Savings" description="Grow your balance" icon="piggy-bank" />\r
          <Checkbox variant="card" label="Investment" description="Build long-term wealth" icon="chart-line" defaultChecked />\r
          <Checkbox variant="card" label="Insurance" description="Protect what matters" icon="umbrella" />\r
        </div>\r
      </div>\r
    </div>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Card - Row',
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`cardDirection="row"\` for horizontal-layout cards arranged in a vertical list. Better than \`column\` when descriptions are longer or when vertical space is limited.'
      }
    }
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 24
  }}>\r
      <div>\r
        <p style={{
        fontSize: '0.75rem',
        fontWeight: 600,
        margin: '0 0 8px'
      }}>Without description</p>\r
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        width: 320
      }}>\r
          <Checkbox variant="card" cardDirection="row" label="Savings" icon="piggy-bank" />\r
          <Checkbox variant="card" cardDirection="row" label="Investment" icon="chart-line" defaultChecked />\r
          <Checkbox variant="card" cardDirection="row" label="Insurance" icon="umbrella" disabled />\r
        </div>\r
      </div>\r
      <div>\r
        <p style={{
        fontSize: '0.75rem',
        fontWeight: 600,
        margin: '0 0 8px'
      }}>With description</p>\r
        <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        width: 320
      }}>\r
          <Checkbox variant="card" cardDirection="row" label="Savings" description="Grow your balance" icon="piggy-bank" />\r
          <Checkbox variant="card" cardDirection="row" label="Investment" description="Build long-term wealth" icon="chart-line" defaultChecked />\r
          <Checkbox variant="card" cardDirection="row" label="Insurance" description="Protect what matters" icon="umbrella" />\r
        </div>\r
      </div>\r
    </div>
}`,...g.parameters?.docs?.source}}},_=[`Playground`,`Default`,`Checked`,`Indeterminate`,`WithHelperText`,`ErrorStates`,`Disabled`,`WithDescription`,`Boxed`,`Card`,`CardLeft`]}))();export{m as Boxed,h as Card,g as CardLeft,c as Checked,s as Default,f as Disabled,d as ErrorStates,l as Indeterminate,o as Playground,p as WithDescription,u as WithHelperText,_ as __namedExportsOrder,a as default};