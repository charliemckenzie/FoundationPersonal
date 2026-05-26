import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{n,t as r}from"./RadioGroup-CHWLD_eX.js";var i,a,o,s,c,l,u,d,f,p,m,h,g,_,v,y,b;e((()=>{i=t(),n(),a=[{value:`xs`,label:`Extra small`},{value:`sm`,label:`Small`},{value:`md`,label:`Medium`}],o=[{value:`xs`,label:`Extra small`,description:`Best for compact spaces.`},{value:`sm`,label:`Small`,description:`A versatile everyday choice.`},{value:`md`,label:`Medium`,description:`Our most popular size.`}],s=[{value:`savings`,label:`Savings`,icon:`piggy-bank`},{value:`investment`,label:`Investment`,icon:`chart-line`},{value:`insurance`,label:`Insurance`,icon:`umbrella`}],c=[{value:`savings`,label:`Savings`,description:`Grow your balance`,icon:`piggy-bank`},{value:`investment`,label:`Investment`,description:`Build long-term wealth`,icon:`chart-line`},{value:`insurance`,label:`Insurance`,description:`Protect what matters`,icon:`umbrella`}],l={title:`Form Components / RadioGroup`,component:r,tags:[`autodocs`],decorators:[(e,{args:t})=>{let{showHelperText:n,showLegend:r,cardIcon:a,...o}=t,s=o.variant===`card`&&a?o.options?.map(e=>({...e,icon:a})):o.options;return(0,i.jsx)(e,{args:{...o,options:s,legend:r?o.legend:void 0,helperText:n?o.helperText:void 0}})}],parameters:{layout:`centered`,controls:{exclude:[`defaultValue`,`value`,`onChange`,`name`]},docs:{description:{component:"RadioGroup renders a set of mutually exclusive options. Three variants:\n\n- `default` — a standard radio list with an optional legend and helper text. Use for most single-choice selections.\n- `boxed` — bordered rows. Use for settings or option tables where visual separation between choices improves scannability.\n- `card` — visual tile selection. Use for product or preference pickers where icons and descriptions add meaning.\n\nAll variants support `error`, `disabled`, and `description` on individual options."}}},args:{variant:`default`,cardIcon:`piggy-bank`,showLegend:!0,legend:`Select an option`,legendBold:!0,disabled:!1,required:!1,error:!1,errorMessage:`Please select an option.`,showHelperText:!1,helperText:`We'll use this to send you relevant updates.`},argTypes:{variant:{control:`select`,options:[`default`,`boxed`,`card`]},cardIcon:{control:`select`,options:[`piggy-bank`,`chart-line`,`umbrella`,`star`,`heart`,`bolt`,`shield`,`house`],if:{arg:`variant`,eq:`card`}},cardDirection:{if:{arg:`variant`,eq:`card`}},direction:{control:`select`,options:[`column`,`row`]},showLegend:{control:`boolean`},legend:{control:`text`,if:{arg:`showLegend`,truthy:!0}},legendBold:{control:`boolean`,if:{arg:`showLegend`,truthy:!0}},error:{control:`boolean`},errorMessage:{control:`text`,if:{arg:`error`,truthy:!0}},showHelperText:{control:`boolean`},helperText:{control:`text`,if:{arg:`showHelperText`,truthy:!0}},color:{table:{disable:!0}},size:{table:{disable:!0}}}},u={name:`Playground`,parameters:{docs:{description:{story:``}}},args:{legend:`Size`,options:a,defaultValue:`sm`}},d={parameters:{docs:{description:{story:`Standard radio group with a legend. Use for most single-choice selections where all options should be visible simultaneously.`}}},args:{legend:`Size`,options:a,defaultValue:`sm`}},f={parameters:{docs:{description:{story:'**Usage guidance:** Set `direction="row"` to lay options horizontally. Best for very short option sets (2–3 items) where labels are brief.'}}},args:{legend:`Size`,options:a,direction:`row`,defaultValue:`sm`}},p={parameters:{docs:{description:{story:"**Usage guidance:** Use `helperText` for persistent guidance below the group."}}},args:{legend:`T-shirt size`,options:a,helperText:`This cannot be changed after ordering.`}},m={parameters:{docs:{description:{story:"**Usage guidance:** Set `error` when validation fails. Use `helperText` for context. Add `errorMessage` for a separate validation message displayed beneath."}}},render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:32},children:[(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{style:{fontSize:`0.75rem`,fontWeight:600,margin:`0 0 8px`},children:`Error with helper text`}),(0,i.jsx)(r,{legend:`Size`,options:a,error:!0,helperText:`Please select a size.`})]}),(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{style:{fontSize:`0.75rem`,fontWeight:600,margin:`0 0 8px`},children:`Error with helper text and error message`}),(0,i.jsx)(r,{legend:`T-shirt size`,options:a,error:!0,helperText:`This cannot be changed after ordering.`,errorMessage:`Please select a size.`})]})]})},h={parameters:{docs:{description:{story:"**Usage guidance:** Use `disabled` to disable the entire group. Set `disabled` on individual options to disable them selectively while leaving others interactive."}}},args:{legend:`Size`,options:a,disabled:!0,defaultValue:`sm`}},g={parameters:{docs:{description:{story:"**Usage guidance:** Use `description` on individual options for secondary explanatory text below each label."}}},args:{legend:`Size`,options:o,defaultValue:`sm`}},_={parameters:{docs:{description:{story:'**Usage guidance:** Use `variant="boxed"` for settings-style selections where each option is a full-width bordered row. Works with or without `description`.'}}},render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24,width:320},children:[(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{style:{fontSize:`0.75rem`,fontWeight:600,margin:`0 0 8px`},children:`Without description`}),(0,i.jsx)(r,{legend:`Size`,options:a,variant:`boxed`,defaultValue:`sm`})]}),(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{style:{fontSize:`0.75rem`,fontWeight:600,margin:`0 0 8px`},children:`With description`}),(0,i.jsx)(r,{legend:`Size`,options:o,variant:`boxed`,defaultValue:`sm`})]})]})},v={name:`Card - Column`,parameters:{docs:{description:{story:'**Usage guidance:** Use `variant="card"` with `cardDirection="column"` for visual tile pickers — product selectors, preference cards, or onboarding choices. Pair with `icon` on each option for maximum visual clarity.'}}},render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24},children:[(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{style:{fontSize:`0.75rem`,fontWeight:600,margin:`0 0 8px`},children:`Without description`}),(0,i.jsx)(r,{legend:`Contact preference`,options:s,variant:`card`,direction:`row`,defaultValue:`savings`})]}),(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{style:{fontSize:`0.75rem`,fontWeight:600,margin:`0 0 8px`},children:`With description`}),(0,i.jsx)(r,{legend:`Contact preference`,options:c,variant:`card`,direction:`row`,defaultValue:`savings`})]})]})},y={name:`Card - Row`,parameters:{docs:{description:{story:'**Usage guidance:** Use `cardDirection="row"` for horizontal-layout cards arranged in a vertical list. Better than `column` when descriptions are longer or vertical space is limited.'}}},render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24,width:360},children:[(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{style:{fontSize:`0.75rem`,fontWeight:600,margin:`0 0 8px`},children:`Without description`}),(0,i.jsx)(r,{legend:`Contact preference`,options:s,variant:`card`,cardDirection:`row`,defaultValue:`savings`})]}),(0,i.jsxs)(`div`,{children:[(0,i.jsx)(`p`,{style:{fontSize:`0.75rem`,fontWeight:600,margin:`0 0 8px`},children:`With description`}),(0,i.jsx)(r,{legend:`Contact preference`,options:c,variant:`card`,cardDirection:`row`,defaultValue:`savings`})]})]})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: ''
      }
    }
  },
  args: {
    legend: 'Size',
    options: SIZE_OPTIONS,
    defaultValue: 'sm'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Standard radio group with a legend. Use for most single-choice selections where all options should be visible simultaneously.'
      }
    }
  },
  args: {
    legend: 'Size',
    options: SIZE_OPTIONS,
    defaultValue: 'sm'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Set \`direction="row"\` to lay options horizontally. Best for very short option sets (2–3 items) where labels are brief.'
      }
    }
  },
  args: {
    legend: 'Size',
    options: SIZE_OPTIONS,
    direction: 'row',
    defaultValue: 'sm'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`helperText\` for persistent guidance below the group.'
      }
    }
  },
  args: {
    legend: 'T-shirt size',
    options: SIZE_OPTIONS,
    helperText: 'This cannot be changed after ordering.'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Set \`error\` when validation fails. Use \`helperText\` for context. Add \`errorMessage\` for a separate validation message displayed beneath.'
      }
    }
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 32
  }}>\r
      <div>\r
        <p style={{
        fontSize: '0.75rem',
        fontWeight: 600,
        margin: '0 0 8px'
      }}>Error with helper text</p>\r
        <RadioGroup legend="Size" options={SIZE_OPTIONS} error helperText="Please select a size." />\r
      </div>\r
      <div>\r
        <p style={{
        fontSize: '0.75rem',
        fontWeight: 600,
        margin: '0 0 8px'
      }}>Error with helper text and error message</p>\r
        <RadioGroup legend="T-shirt size" options={SIZE_OPTIONS} error helperText="This cannot be changed after ordering." errorMessage="Please select a size." />\r
      </div>\r
    </div>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`disabled\` to disable the entire group. Set \`disabled\` on individual options to disable them selectively while leaving others interactive.'
      }
    }
  },
  args: {
    legend: 'Size',
    options: SIZE_OPTIONS,
    disabled: true,
    defaultValue: 'sm'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`description\` on individual options for secondary explanatory text below each label.'
      }
    }
  },
  args: {
    legend: 'Size',
    options: SIZE_OPTIONS_WITH_DESCRIPTION,
    defaultValue: 'sm'
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`variant="boxed"\` for settings-style selections where each option is a full-width bordered row. Works with or without \`description\`.'
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
        <RadioGroup legend="Size" options={SIZE_OPTIONS} variant="boxed" defaultValue="sm" />\r
      </div>\r
      <div>\r
        <p style={{
        fontSize: '0.75rem',
        fontWeight: 600,
        margin: '0 0 8px'
      }}>With description</p>\r
        <RadioGroup legend="Size" options={SIZE_OPTIONS_WITH_DESCRIPTION} variant="boxed" defaultValue="sm" />\r
      </div>\r
    </div>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Card - Column',
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`variant="card"\` with \`cardDirection="column"\` for visual tile pickers — product selectors, preference cards, or onboarding choices. Pair with \`icon\` on each option for maximum visual clarity.'
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
        <RadioGroup legend="Contact preference" options={CONTACT_OPTIONS} variant="card" direction="row" defaultValue="savings" />\r
      </div>\r
      <div>\r
        <p style={{
        fontSize: '0.75rem',
        fontWeight: 600,
        margin: '0 0 8px'
      }}>With description</p>\r
        <RadioGroup legend="Contact preference" options={CONTACT_OPTIONS_WITH_DESCRIPTION} variant="card" direction="row" defaultValue="savings" />\r
      </div>\r
    </div>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Card - Row',
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`cardDirection="row"\` for horizontal-layout cards arranged in a vertical list. Better than \`column\` when descriptions are longer or vertical space is limited.'
      }
    }
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    width: 360
  }}>\r
      <div>\r
        <p style={{
        fontSize: '0.75rem',
        fontWeight: 600,
        margin: '0 0 8px'
      }}>Without description</p>\r
        <RadioGroup legend="Contact preference" options={CONTACT_OPTIONS} variant="card" cardDirection="row" defaultValue="savings" />\r
      </div>\r
      <div>\r
        <p style={{
        fontSize: '0.75rem',
        fontWeight: 600,
        margin: '0 0 8px'
      }}>With description</p>\r
        <RadioGroup legend="Contact preference" options={CONTACT_OPTIONS_WITH_DESCRIPTION} variant="card" cardDirection="row" defaultValue="savings" />\r
      </div>\r
    </div>
}`,...y.parameters?.docs?.source}}},b=[`Playground`,`Default`,`Row`,`WithHelperText`,`ErrorStates`,`Disabled`,`WithDescription`,`Boxed`,`Card`,`CardLeft`]}))();export{_ as Boxed,v as Card,y as CardLeft,d as Default,h as Disabled,m as ErrorStates,u as Playground,f as Row,g as WithDescription,p as WithHelperText,b as __namedExportsOrder,l as default};