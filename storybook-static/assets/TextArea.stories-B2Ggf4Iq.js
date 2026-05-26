import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{n,t as r}from"./TextField-BFXHaNu_.js";function i({rows:e=4,onChange:t,onBlur:n,onFocus:i,...o}){return(0,a.jsx)(r,{...o,multiline:!0,rows:e,onChange:t,onBlur:n,onFocus:i})}var a,o=e((()=>{a=t(),n(),i.__docgenInfo={description:``,methods:[],displayName:`TextArea`,props:{rows:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`4`,computed:!1}},onChange:{required:!1,tsType:{name:`ReactChangeEventHandler`,raw:`React.ChangeEventHandler<HTMLTextAreaElement>`,elements:[{name:`HTMLTextAreaElement`}]},description:``},onBlur:{required:!1,tsType:{name:`ReactFocusEventHandler`,raw:`React.FocusEventHandler<HTMLTextAreaElement>`,elements:[{name:`HTMLTextAreaElement`}]},description:``},onFocus:{required:!1,tsType:{name:`ReactFocusEventHandler`,raw:`React.FocusEventHandler<HTMLTextAreaElement>`,elements:[{name:`HTMLTextAreaElement`}]},description:``}},composes:[`Omit`]}})),s,c,l,u,d,f,p,m,h,g;e((()=>{s=t(),o(),c={title:`Form Components / TextInput / TextArea`,component:i,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:"TextArea is a multi-line text input. Use it for freeform content that may span multiple lines — notes, descriptions, addresses, and feedback.\n\nHeight is controlled by `rows`, not by size or condensed props. The `size` prop affects the label and font size only.\n\nDo not use `TextField multiline` directly — use this component instead."}}},argTypes:{size:{control:`select`,options:[`small`,`medium`]},rows:{control:`number`},errorMessage:{if:{arg:`error`,truthy:!0}},value:{table:{disable:!0}},defaultValue:{table:{disable:!0}},onChange:{table:{disable:!0}},onBlur:{table:{disable:!0}},onFocus:{table:{disable:!0}},htmlInputProps:{table:{disable:!0}},id:{table:{disable:!0}},name:{table:{disable:!0}},autoComplete:{table:{disable:!0}},fullWidth:{table:{disable:!0}}}},l={name:`Playground`,parameters:{docs:{description:{story:``}}},argTypes:{showHelperText:{control:`boolean`,name:`helperText`},helperText:{table:{disable:!0}}},args:{label:`Label`,placeholder:`Placeholder text`,size:`medium`,rows:4,error:!1,errorMessage:`This field contains an error. Please check and try again.`,required:!1,disabled:!1,showHelperText:!1},render:e=>{let{showHelperText:t,...n}=e;return(0,s.jsx)(`div`,{style:{width:400},children:(0,s.jsx)(i,{...n,helperText:t?`Enter a value that matches the required format.`:void 0})})}},u={parameters:{docs:{description:{story:"Standard textarea with label. Height is set by `rows` (default 4)."}}},args:{label:`Notes`,placeholder:`Write your notes here...`},decorators:[e=>(0,s.jsx)(`div`,{style:{width:400},children:(0,s.jsx)(e,{})})]},d={parameters:{docs:{description:{story:"**Usage guidance:** Use `rows` to set the initial visible height. Choose based on the expected length of the content — short notes (2–3), medium descriptions (4–5), long content (6+)."}}},render:()=>(0,s.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16,width:400},children:[(0,s.jsx)(i,{label:`Short (2 rows)`,rows:2,placeholder:`Brief note...`}),(0,s.jsx)(i,{label:`Default (4 rows)`,rows:4,placeholder:`Standard description...`}),(0,s.jsx)(i,{label:`Tall (6 rows)`,rows:6,placeholder:`Longer content...`})]})},f={parameters:{docs:{description:{story:"**Usage guidance:** Use `helperText` for character limits, format hints, or context the user needs before typing."}}},args:{label:`Bio`,placeholder:`Tell us about yourself...`,helperText:`Maximum 500 characters.`},decorators:[e=>(0,s.jsx)(`div`,{style:{width:400},children:(0,s.jsx)(e,{})})]},p={parameters:{docs:{description:{story:"**Usage guidance:** Set `error` and `helperText` together to explain what went wrong."}}},args:{label:`Description`,error:!0,helperText:`Description is required.`},decorators:[e=>(0,s.jsx)(`div`,{style:{width:400},children:(0,s.jsx)(e,{})})]},m={parameters:{docs:{description:{story:``}}},args:{label:`Feedback`,required:!0,placeholder:`Share your feedback...`},decorators:[e=>(0,s.jsx)(`div`,{style:{width:400},children:(0,s.jsx)(e,{})})]},h={parameters:{docs:{description:{story:``}}},args:{label:`Notes`,value:`This content cannot be edited.`,disabled:!0},decorators:[e=>(0,s.jsx)(`div`,{style:{width:400},children:(0,s.jsx)(e,{})})]},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
    }
  },
  args: {
    label: 'Label',
    placeholder: 'Placeholder text',
    size: 'medium',
    rows: 4,
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
    } = args as TextAreaProps & {
      showHelperText?: boolean;
    };
    return <div style={{
      width: 400
    }}>\r
        <TextArea {...rest} helperText={showHelperText ? 'Enter a value that matches the required format.' : undefined} />\r
      </div>;
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Standard textarea with label. Height is set by \`rows\` (default 4).'
      }
    }
  },
  args: {
    label: 'Notes',
    placeholder: 'Write your notes here...'
  },
  decorators: [Story => <div style={{
    width: 400
  }}><Story /></div>]
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`rows\` to set the initial visible height. Choose based on the expected length of the content — short notes (2–3), medium descriptions (4–5), long content (6+).'
      }
    }
  },
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: 400
  }}>\r
      <TextArea label="Short (2 rows)" rows={2} placeholder="Brief note..." />\r
      <TextArea label="Default (4 rows)" rows={4} placeholder="Standard description..." />\r
      <TextArea label="Tall (6 rows)" rows={6} placeholder="Longer content..." />\r
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`helperText\` for character limits, format hints, or context the user needs before typing.'
      }
    }
  },
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    helperText: 'Maximum 500 characters.'
  },
  decorators: [Story => <div style={{
    width: 400
  }}><Story /></div>]
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Set \`error\` and \`helperText\` together to explain what went wrong.'
      }
    }
  },
  args: {
    label: 'Description',
    error: true,
    helperText: 'Description is required.'
  },
  decorators: [Story => <div style={{
    width: 400
  }}><Story /></div>]
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: ''
      }
    }
  },
  args: {
    label: 'Feedback',
    required: true,
    placeholder: 'Share your feedback...'
  },
  decorators: [Story => <div style={{
    width: 400
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
    label: 'Notes',
    value: 'This content cannot be edited.',
    disabled: true
  },
  decorators: [Story => <div style={{
    width: 400
  }}><Story /></div>]
}`,...h.parameters?.docs?.source}}},g=[`Playground`,`Default`,`Rows`,`HelperText`,`ErrorState`,`Required`,`Disabled`]}))();export{u as Default,h as Disabled,p as ErrorState,f as HelperText,l as Playground,m as Required,d as Rows,g as __namedExportsOrder,c as default};