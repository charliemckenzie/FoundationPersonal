import{n as e,s as t}from"./chunk-Bj-mKKzh.js";import{t as n}from"./react-DVKR3yZN.js";import{t as r}from"./jsx-runtime-CyI9ICYU.js";import{n as i,t as a}from"./Divider-D6q-eyzm.js";import{n as o,t as s}from"./Box-Cj6TI_Dr.js";import{n as c,t as l}from"./Icon-IHyqCtZq.js";import{n as u,t as d}from"./TextButton-FnMCDWco.js";import{r as f,t as p}from"./Alert-2okvnCky.js";import{n as m,t as h}from"./Button-C-Y45Snn.js";import{n as g,t as _}from"./Dialog-BfZCkAdE.js";function v({step:e,isSubmitStep:t=!1,backLabel:n=`Back`,nextLabel:r=`Next`,cancelLabel:a=`Cancel and exit`,exitDialogTitle:s=`Are you sure?`,exitDialogDescription:c=`You will lose any progress you've made, are you sure you want to exit`,exitDialogConfirmLabel:u=`Confirm`,exitDialogCancelLabel:f=`Cancel`,onBack:m,onNext:g,onExit:v,supportsSave:x=!1,saveLabel:S=`Save and exit`,savingLabel:C=`Saving...`,savedLabel:w=`Progress saved`,onSave:T,sx:E}){let[D,O]=(0,b.useState)(!1),[k,A]=(0,b.useState)(`idle`),j=(0,b.useRef)(null);function M(){O(!0)}function N(){O(!1),v?.()}function P(){O(!1)}async function F(){j.current&&clearTimeout(j.current),A(`saving`);try{await T?.()}finally{A(`saved`),j.current=setTimeout(()=>A(`idle`),2e3)}}return(0,y.jsxs)(o,{sx:E,children:[(0,y.jsx)(i,{}),(0,y.jsxs)(o,{sx:{mt:4,pb:4,display:`flex`,flexWrap:{xs:`wrap`,sm:`nowrap`},alignItems:`center`,gap:2},children:[(0,y.jsxs)(o,{sx:{order:{xs:1,sm:3},display:`flex`,gap:1.5,width:{xs:`100%`,sm:`auto`}},children:[e>1&&(0,y.jsx)(h,{label:n,variant:`soft`,color:`primary`,size:`medium`,onClick:m}),(0,y.jsx)(o,{sx:{flexGrow:{xs:1,sm:0}},children:(0,y.jsx)(h,{label:r,variant:`contained`,color:`primary`,size:`medium`,endIcon:t?void 0:`arrow-right`,onClick:g,sx:{width:{xs:`100%`,sm:`auto`},minWidth:{sm:`13rem`}}})})]}),(0,y.jsx)(o,{sx:{order:2,flex:1,display:{xs:`none`,sm:`block`}}}),(0,y.jsx)(o,{sx:{order:{xs:2,sm:1},width:{xs:`100%`,sm:`auto`},display:`flex`,justifyContent:{xs:`center`,sm:`flex-start`}},children:x?k===`saved`?(0,y.jsx)(p,{severity:`success`,message:w,icon:(0,y.jsx)(l,{icon:`circle-check`,color:`inherit`,size:`lg`})}):(0,y.jsx)(d,{label:k===`saving`?C:S,color:`primary`,size:`medium`,hideIcon:!0,loading:k===`saving`,onClick:F}):(0,y.jsx)(d,{label:a,color:`primary`,size:`medium`,hideIcon:!0,onClick:M})})]}),!x&&(0,y.jsx)(_,{open:D,onClose:P,title:s,description:c,variant:`alert`,confirmLabel:u,cancelLabel:f,onConfirm:N})]})}var y,b,x=e((()=>{y=r(),b=t(n()),s(),a(),m(),u(),g(),f(),c(),v.__docgenInfo={description:``,methods:[],displayName:`StepperActions`,props:{step:{required:!0,tsType:{name:`number`},description:`1-based current step. Step 1 hides the back button.`},isSubmitStep:{required:!1,tsType:{name:`boolean`},description:`When true, the next button renders without the trailing arrow icon.`,defaultValue:{value:`false`,computed:!1}},backLabel:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'Back'`,computed:!1}},nextLabel:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'Next'`,computed:!1}},cancelLabel:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'Cancel and exit'`,computed:!1}},exitDialogTitle:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'Are you sure?'`,computed:!1}},exitDialogDescription:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`"You will lose any progress you've made, are you sure you want to exit"`,computed:!1}},exitDialogConfirmLabel:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'Confirm'`,computed:!1}},exitDialogCancelLabel:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'Cancel'`,computed:!1}},onBack:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onNext:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},onExit:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:`Called when the user confirms exit in the dialog.`},supportsSave:{required:!1,tsType:{name:`boolean`},description:`When true, shows a Save and exit button instead of Cancel and exit.`,defaultValue:{value:`false`,computed:!1}},saveLabel:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'Save and exit'`,computed:!1}},savingLabel:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'Saving...'`,computed:!1}},savedLabel:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'Progress saved'`,computed:!1}},onSave:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => Promise<void>`,signature:{arguments:[],return:{name:`Promise`,elements:[{name:`void`}],raw:`Promise<void>`}}},description:`Async save handler. Component transitions idle → saving → saved automatically.`},sx:{required:!1,tsType:{name:`SxProps`,elements:[{name:`Theme`}],raw:`SxProps<Theme>`},description:``}}}})),S,C,w,T,E,D,O;e((()=>{S=r(),x(),C=({first:e,children:t})=>(0,S.jsx)(`p`,{style:{margin:e?`0 0 0.5rem`:`1.5rem 0 0.5rem`,fontSize:`0.75rem`,color:`#666`,fontWeight:600},children:t}),w=()=>new Promise(e=>setTimeout(e,2500)),T={title:`Form Components / Stepped Forms / StepperActions`,component:v,tags:[`autodocs`],argTypes:{step:{table:{disable:!0}},isSubmitStep:{table:{disable:!0}},exitDialogTitle:{table:{disable:!0}},exitDialogDescription:{table:{disable:!0}},exitDialogConfirmLabel:{table:{disable:!0}},exitDialogCancelLabel:{table:{disable:!0}},supportsSave:{table:{disable:!0}},saveLabel:{table:{disable:!0}},savingLabel:{table:{disable:!0}},savedLabel:{table:{disable:!0}},onBack:{table:{disable:!0}},onNext:{table:{disable:!0}},onExit:{table:{disable:!0}},onSave:{table:{disable:!0}},sx:{table:{disable:!0}}},parameters:{layout:`padded`,docs:{description:{component:`Navigation controls for stepped forms. Sits below the form content.

- **Back** is hidden on step 1 and shown on all subsequent steps.
- **Next** carries a trailing arrow icon on all steps except the final submit step.
- **Cancel and exit** opens an alert dialog asking for confirmation before exiting.
- When \`supportsSave\` is true, a **Save and exit** button replaces Cancel and exit, showing a loading state then a success confirmation.
- A divider sits above the actions with 32px of space between them.`}}}},E={name:`Playground`,parameters:{docs:{description:{story:``}}},argTypes:{state:{name:`Step state`,control:`select`,options:[`Step 1`,`Internal step`,`Submit step`]},supportsSave:{name:`Supports save`,control:`boolean`,table:{disable:!1}},nextLabel:{name:`Next label`,control:`text`,if:{arg:`state`,neq:`Submit step`}},backLabel:{name:`Back label`,control:`text`,if:{arg:`state`,neq:`Step 1`}},submitLabel:{name:`Submit label`,control:`text`,if:{arg:`state`,eq:`Submit step`}},cancelLabel:{name:`Exit label`,control:`text`}},args:{state:`Internal step`,supportsSave:!1,nextLabel:`Next`,backLabel:`Back`,submitLabel:`Submit`,cancelLabel:`Cancel and exit`},render:({state:e,supportsSave:t,nextLabel:n,backLabel:r,submitLabel:i,cancelLabel:a})=>(0,S.jsx)(v,{step:e===`Step 1`?1:2,isSubmitStep:e===`Submit step`,nextLabel:e===`Submit step`?i:n,backLabel:r,cancelLabel:a,supportsSave:t,onBack:()=>{},onNext:()=>{},onExit:()=>{},onSave:w})},D={name:`States`,parameters:{docs:{description:{story:`All three states in sequence: first step (no back), mid-form, and submit step (no arrow).`}}},render:()=>(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(C,{first:!0,children:`Step 1 — back button hidden`}),(0,S.jsx)(v,{step:1,onNext:()=>{},onExit:()=>{}}),(0,S.jsx)(C,{children:`Step 2 — back button visible, next with arrow`}),(0,S.jsx)(v,{step:2,onBack:()=>{},onNext:()=>{},onExit:()=>{}}),(0,S.jsx)(C,{children:`Submit step — next without arrow`}),(0,S.jsx)(v,{step:4,isSubmitStep:!0,nextLabel:`Submit`,onBack:()=>{},onNext:()=>{},onExit:()=>{}}),(0,S.jsx)(C,{children:`Save and exit — try clicking Save and exit`}),(0,S.jsx)(v,{step:2,supportsSave:!0,onBack:()=>{},onNext:()=>{},onSave:w})]}),args:{}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: ''
      }
    }
  },
  argTypes: {
    state: {
      name: 'Step state',
      control: 'select',
      options: ['Step 1', 'Internal step', 'Submit step'] satisfies StepState[]
    },
    supportsSave: {
      name: 'Supports save',
      control: 'boolean',
      table: {
        disable: false
      }
    },
    nextLabel: {
      name: 'Next label',
      control: 'text',
      if: {
        arg: 'state',
        neq: 'Submit step'
      }
    },
    backLabel: {
      name: 'Back label',
      control: 'text',
      if: {
        arg: 'state',
        neq: 'Step 1'
      }
    },
    submitLabel: {
      name: 'Submit label',
      control: 'text',
      if: {
        arg: 'state',
        eq: 'Submit step'
      }
    },
    cancelLabel: {
      name: 'Exit label',
      control: 'text'
    }
  },
  args: {
    state: 'Internal step',
    supportsSave: false,
    nextLabel: 'Next',
    backLabel: 'Back',
    submitLabel: 'Submit',
    cancelLabel: 'Cancel and exit'
  },
  render: ({
    state,
    supportsSave,
    nextLabel,
    backLabel,
    submitLabel,
    cancelLabel
  }) => <StepperActions step={state === 'Step 1' ? 1 : 2} isSubmitStep={state === 'Submit step'} nextLabel={state === 'Submit step' ? submitLabel : nextLabel} backLabel={backLabel} cancelLabel={cancelLabel} supportsSave={supportsSave} onBack={() => {}} onNext={() => {}} onExit={() => {}} onSave={mockSave} />
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  name: 'States',
  parameters: {
    docs: {
      description: {
        story: 'All three states in sequence: first step (no back), mid-form, and submit step (no arrow).'
      }
    }
  },
  render: () => <>\r
      <Label first>Step 1 — back button hidden</Label>\r
      <StepperActions step={1} onNext={() => {}} onExit={() => {}} />\r
\r
      <Label>Step 2 — back button visible, next with arrow</Label>\r
      <StepperActions step={2} onBack={() => {}} onNext={() => {}} onExit={() => {}} />\r
\r
      <Label>Submit step — next without arrow</Label>\r
      <StepperActions step={4} isSubmitStep nextLabel="Submit" onBack={() => {}} onNext={() => {}} onExit={() => {}} />\r
\r
      <Label>Save and exit — try clicking Save and exit</Label>\r
      <StepperActions step={2} supportsSave onBack={() => {}} onNext={() => {}} onSave={mockSave} />\r
    </>,
  args: {} as never
}`,...D.parameters?.docs?.source}}},O=[`Playground`,`States`]}))();export{E as Playground,D as States,O as __namedExportsOrder,T as default};