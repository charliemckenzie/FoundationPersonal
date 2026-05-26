import{n as e,s as t}from"./chunk-Bj-mKKzh.js";import{t as n}from"./react-DVKR3yZN.js";import{t as r}from"./jsx-runtime-CyI9ICYU.js";import{H as i}from"./DefaultPropsProvider-ZDz6prh7.js";import{t as a}from"./styles-Dg3N12Hs.js";import{n as o,t as s}from"./Typography-ChsBGyM_.js";import{n as c,t as l}from"./Box-Cj6TI_Dr.js";import{n as u,t as d}from"./Icon-IHyqCtZq.js";import{n as ee,t as te}from"./Tooltip-Cn039bZL.js";import{n as ne,t as f}from"./Button-C-Y45Snn.js";import{n as re,t as ie}from"./Menu-DUR7sJEj.js";function p(e,t,n){return e<t?`completed`:e===t?`active`:e<=n?`visited`:`upcoming`}var m,h,g,_,v,y,b=e((()=>{a(),m=`1.5rem`,h=`1.25rem`,g=`calc(1.125rem - 0.75rem)`,_=`calc(1.125rem - 0.625rem)`,v={width:m,height:m,borderRadius:`50%`,display:`flex`,alignItems:`center`,justifyContent:`center`,flexShrink:0,position:`relative`,zIndex:1,p:0,border:0,bgcolor:`background.paper`,cursor:`default`,fontFamily:`inherit`},y={upcoming:{bgcolor:`transparent`,border:0,color:`text.muted`},active:{width:h,height:h,border:`3px solid`,borderColor:`primary.main`,boxShadow:e=>`0 0 0 2px ${e.palette.background.paper}, 0 0 0 6px ${i(e.palette.primary.main,.18)}`},completed:{bgcolor:`transparent`,border:0,color:`primary.main`},visited:{bgcolor:`transparent`,border:0,color:`primary.main`}}}));function ae(e){return e===`completed`?(0,S.jsx)(d,{icon:`circle-check`,style:`solid`,size:`md`,color:`primary`}):e===`visited`?(0,S.jsx)(d,{icon:`circle-check`,style:`light`,size:`md`,color:`primary`}):e===`upcoming`?(0,S.jsx)(d,{icon:`circle-dashed`,style:`light`,size:`md`,color:`text.muted`}):(0,S.jsx)(c,{component:`span`,sx:{width:`1rem`,height:`1rem`,borderRadius:`50%`,border:`2px solid`,borderColor:`primary.main`,display:`inline-flex`,flexShrink:0}})}function x({activeStep:e,maxStep:t,steps:n,showMenu:r,onStepClick:i}){let a=`${e+1} of ${n.length}`;return r&&i?(0,S.jsx)(ie,{trigger:(0,S.jsx)(f,{label:a,variant:`soft`,size:`small`,condensed:!0,endIcon:`chevron-down`,sx:{"& .MuiButton-endIcon > span":{fontSize:`0.75rem !important`}}}),items:n.map((n,r)=>{let a=p(r,e,t);return{label:n.label??`Step ${r+1}`,disabled:r===e,onClick:()=>i(r),icon:ae(a)}})}):(0,S.jsx)(c,{component:`span`,sx:{pointerEvents:`none`},children:(0,S.jsx)(f,{label:a,variant:`soft`,size:`small`,condensed:!0})})}var S,oe=e((()=>{S=r(),l(),u(),ne(),re(),b(),x.__docgenInfo={description:``,methods:[],displayName:`StepCounter`,props:{activeStep:{required:!0,tsType:{name:`number`},description:``},maxStep:{required:!0,tsType:{name:`number`},description:``},steps:{required:!0,tsType:{name:`Array`,elements:[{name:`FormProgressStep`}],raw:`FormProgressStep[]`},description:``},showMenu:{required:!0,tsType:{name:`boolean`},description:``},onStepClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(stepIndex: number) => void`,signature:{arguments:[{type:{name:`number`},name:`stepIndex`}],return:{name:`void`}}},description:``}}}}));function se({state:e}){return e===`completed`?(0,w.jsx)(c,{component:`span`,sx:T,children:(0,w.jsx)(d,{icon:`circle-check`,style:`solid`,size:`inherit`,color:`inherit`})}):e===`visited`?(0,w.jsx)(c,{component:`span`,sx:T,children:(0,w.jsx)(d,{icon:`circle-check`,style:`light`,size:`inherit`,color:`inherit`})}):e===`upcoming`?(0,w.jsx)(c,{component:`span`,sx:T,children:(0,w.jsx)(d,{icon:`circle-dashed`,style:`light`,size:`inherit`,color:`inherit`})}):null}function C({state:e,label:t,showLabelAsTooltip:n,onClick:r,ariaLabel:i}){let a=[v,y[e]],s=t!=null&&!n?(0,w.jsx)(o,{variant:`small`,className:`fm-label`,sx:{fontSize:`0.75rem`,lineHeight:1.4,textAlign:`center`,px:.5,color:e===`active`?`primary.main`:`text.muted`,transition:`color 0.15s ease`},children:t}):null,l=(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(c,{sx:{width:m,height:m,display:`flex`,alignItems:`center`,justifyContent:`center`},children:(0,w.jsx)(c,{component:`span`,className:`fm-marker-icon`,"aria-current":e===`active`?`step`:void 0,sx:[...a,{transition:`transform 0.15s ease`}],children:(0,w.jsx)(se,{state:e})})}),s]}),u=r?(0,w.jsx)(c,{component:`button`,type:`button`,onClick:r,"aria-label":i,sx:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:.5,width:`100%`,background:`none`,border:0,p:0,cursor:`pointer`,fontFamily:`inherit`,"& .fm-marker-icon":{cursor:`pointer`},"&:hover .fm-marker-icon":{transform:`scale(1.15)`,transition:`transform 0.15s ease`,color:`primary.dark`},"&:hover .fm-label":{color:`primary.dark`},"&:focus-visible":{outline:`2px solid`,outlineColor:`primary.main`,outlineOffset:`2px`,borderRadius:`4px`}},children:l}):(0,w.jsx)(c,{sx:{display:`flex`,flexDirection:`column`,alignItems:`center`,gap:.5,width:`100%`},children:l});return n&&t?(0,w.jsx)(te,{title:t,placement:`top`,children:u}):u}var w,T,ce=e((()=>{w=r(),l(),s(),u(),ee(),b(),T={fontSize:`1.5rem`,display:`flex`,lineHeight:0,bgcolor:`background.paper`,borderRadius:`50%`,p:`1px`,cursor:`inherit`},C.__docgenInfo={description:``,methods:[],displayName:`StepMarker`,props:{state:{required:!0,tsType:{name:`union`,raw:`'upcoming' | 'active' | 'completed' | 'visited'`,elements:[{name:`literal`,value:`'upcoming'`},{name:`literal`,value:`'active'`},{name:`literal`,value:`'completed'`},{name:`literal`,value:`'visited'`}]},description:``},label:{required:!1,tsType:{name:`string`},description:``},showLabelAsTooltip:{required:!1,tsType:{name:`boolean`},description:``},onClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`() => void`,signature:{arguments:[],return:{name:`void`}}},description:``},ariaLabel:{required:!0,tsType:{name:`string`},description:``}}}}));function E({steps:e,activeStep:t,maxStep:n,onStepClick:r,tooltipLabels:i,ariaLabel:a,sx:o}){let s=((2*t+1)/(2*e.length)*100).toFixed(4),l=`calc(${m} / 2 - ${4/2}px)`;return(0,D.jsxs)(c,{role:`list`,"aria-label":a??`Form progress`,sx:{position:`relative`,...o},children:[(0,D.jsx)(c,{"aria-hidden":`true`,sx:{position:`absolute`,top:l,left:0,right:0,height:4,borderRadius:`99px`,bgcolor:`border.subtle`}}),(0,D.jsx)(c,{"aria-hidden":`true`,sx:{position:`absolute`,top:l,left:0,width:`${s}%`,height:4,borderRadius:`99px`,bgcolor:`primary.main`,transition:`width 0.35s cubic-bezier(0.4, 0, 0.2, 1)`}}),(0,D.jsx)(c,{sx:{display:`flex`,position:`relative`,zIndex:1},children:e.map((e,a)=>(0,D.jsx)(c,{role:`listitem`,sx:{flex:1,display:`flex`,flexDirection:`column`,alignItems:`center`},children:(0,D.jsx)(C,{state:p(a,t,n),label:e.label,showLabelAsTooltip:i,onClick:r&&a!==t&&p(a,t,n)!==`upcoming`?()=>r(a):void 0,ariaLabel:e.label??`Step ${a+1}`})},e.id))})]})}var D,le=e((()=>{D=r(),l(),ce(),b(),E.__docgenInfo={description:``,methods:[],displayName:`SteppedTrack`,props:{steps:{required:!0,tsType:{name:`Array`,elements:[{name:`FormProgressStep`}],raw:`FormProgressStep[]`},description:``},activeStep:{required:!0,tsType:{name:`number`},description:``},maxStep:{required:!0,tsType:{name:`number`},description:``},onStepClick:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(stepIndex: number) => void`,signature:{arguments:[{type:{name:`number`},name:`stepIndex`}],return:{name:`void`}}},description:``},tooltipLabels:{required:!1,tsType:{name:`boolean`},description:``},ariaLabel:{required:!1,tsType:{name:`string`},description:``},sx:{required:!1,tsType:{name:`SxProps`,elements:[{name:`Theme`}],raw:`SxProps<Theme>`},description:``}}}}));function O({pct:e,visualPct:t,ariaLabel:n}){return(0,k.jsxs)(c,{role:`progressbar`,"aria-valuenow":e,"aria-valuemin":0,"aria-valuemax":100,"aria-label":n,sx:{position:`relative`,height:h},children:[(0,k.jsx)(c,{"aria-hidden":`true`,sx:{position:`absolute`,top:`50%`,left:0,right:0,transform:`translateY(-50%)`,height:4,bgcolor:`border.subtle`,borderRadius:`99px`}}),(0,k.jsx)(c,{"aria-hidden":`true`,sx:{position:`absolute`,top:`50%`,left:0,width:`${t}%`,transform:`translateY(-50%)`,height:4,bgcolor:`primary.main`,borderRadius:`99px`}}),(0,k.jsx)(c,{sx:{position:`absolute`,top:`50%`,left:`${t}%`,transform:`translate(-50%, -50%)`,width:h,height:h,borderRadius:`50%`,bgcolor:`background.paper`,border:`3px solid`,borderColor:`primary.main`,boxShadow:e=>`0 0 0 2px ${e.palette.background.paper}, 0 0 0 6px ${i(e.palette.primary.main,.18)}`,zIndex:1}})]})}var k,ue=e((()=>{k=r(),l(),a(),b(),O.__docgenInfo={description:`The shared 0–100% bar with thumb. Used by the simple variant and by the responsive\r
 variant's mobile fallback.`,methods:[],displayName:`SimpleBar`,props:{pct:{required:!0,tsType:{name:`number`},description:`Percentage 0-100 of the underlying value`},visualPct:{required:!0,tsType:{name:`number`},description:`Visual percentage for the thumb position (pct compressed inside a 10–90% display range)`},ariaLabel:{required:!1,tsType:{name:`string`},description:``}}}}));function A(e,t){let{showStepIndicator:n,stepMenu:r,activeStep:i,maxStep:a,steps:o,onStepClick:s,sx:l,barOffset:u}=t;return!n||i==null||!o?.length?(0,M.jsx)(c,{sx:l,children:e}):(0,M.jsxs)(c,{sx:{display:`flex`,alignItems:`flex-start`,gap:1.5,...l},children:[(0,M.jsx)(x,{activeStep:i,maxStep:a??i,steps:o,showMenu:!!r,onStepClick:s}),(0,M.jsx)(c,{sx:{flex:1,minWidth:0,pt:u},children:e})]})}function j(e){let{showStepIndicator:t,stepMenu:n,sx:r}=e;if(e.variant===`simple`){let{value:i,steps:a,activeStep:o,onStepClick:s,"aria-label":c}=e,l=Math.min(100,Math.max(0,i));return A((0,M.jsx)(O,{pct:l,visualPct:10+l*.8,ariaLabel:c}),{showStepIndicator:t,stepMenu:n,activeStep:o,steps:a,onStepClick:s,sx:r,barOffset:_})}let{steps:i,activeStep:a,maxStep:o=a,onStepClick:s,tooltipLabels:l,"aria-label":u}=e;if(e.variant===`responsive`){let e=i.length<=1?0:Math.round(a/(i.length-1)*100),d=(0,M.jsx)(O,{pct:e,visualPct:10+e*.8,ariaLabel:u??`Form progress`});return(0,M.jsxs)(c,{sx:r,children:[t&&a!=null&&i.length?(0,M.jsxs)(c,{sx:{display:{xs:`flex`,sm:`none`},alignItems:`flex-start`,gap:1.5},children:[(0,M.jsx)(x,{activeStep:a,maxStep:o,steps:i,showMenu:!!n,onStepClick:s}),(0,M.jsx)(c,{sx:{flex:1,minWidth:0,pt:_},children:d})]}):(0,M.jsx)(c,{sx:{display:{xs:`block`,sm:`none`}},children:d}),(0,M.jsx)(E,{steps:i,activeStep:a,maxStep:o,onStepClick:s,tooltipLabels:l,ariaLabel:u,sx:{display:{xs:`none`,sm:`block`}}})]})}return A((0,M.jsx)(E,{steps:i,activeStep:a,maxStep:o,onStepClick:s,tooltipLabels:l,ariaLabel:u}),{showStepIndicator:t,stepMenu:n,activeStep:a,maxStep:o,steps:i,onStepClick:s,sx:r,barOffset:g})}var M,de=e((()=>{M=r(),l(),oe(),le(),ue(),b(),j.__docgenInfo={description:``,methods:[],displayName:`FormProgress`}}));function fe({storyVariant:e,value:t,showStepIndicator:n,stepIndicatorType:r,tooltipLabels:i}){let[a,o]=F.useState(2),s=e===`Stepped - No labels`||e===`Stepped - with labels`?!1:n,c=s&&r===`Menu indicator`;return e===`Simple`?(0,P.jsx)(j,{variant:`simple`,value:t,steps:s?L:void 0,activeStep:s?a:void 0,showStepIndicator:s,stepMenu:c,onStepClick:c?o:void 0,"aria-label":`Form progress`}):e===`Stepped - No labels`?(0,P.jsx)(j,{variant:`stepped`,steps:i?L:z,activeStep:a,maxStep:Math.max(a,3),showStepIndicator:s,stepMenu:c,onStepClick:c?o:void 0,tooltipLabels:i}):e===`Stepped - with labels`?(0,P.jsx)(j,{variant:`stepped`,steps:R,activeStep:Math.min(a,R.length-1),maxStep:Math.min(Math.max(a,2),R.length-1),showStepIndicator:s,stepMenu:c,onStepClick:c?o:void 0}):(0,P.jsx)(j,{variant:`responsive`,steps:L,activeStep:a,maxStep:Math.max(a,3),showStepIndicator:s,stepMenu:c,onStepClick:c?o:void 0})}function N({steps:e,tooltipLabels:t}){let[n,r]=F.useState(2);return(0,P.jsx)(j,{variant:`stepped`,steps:e,activeStep:n,maxStep:Math.max(n,3),tooltipLabels:t,onStepClick:r})}var P,F,I,L,R,z,B,V,H,U,W,G,K,q,J,Y,X,Z,Q,$;e((()=>{P=r(),F=t(n()),de(),I=({first:e,children:t})=>(0,P.jsx)(`p`,{style:{margin:e?`0 0 0.5rem`:`1.5rem 0 0.5rem`,fontSize:`0.75rem`,color:`#666`,fontWeight:600},children:t}),L=[{id:1,label:`Personal`},{id:2,label:`Contact`},{id:3,label:`Income`},{id:4,label:`Review`},{id:5,label:`Confirm`}],R=[{id:1,label:`Personal`},{id:2,label:`Contact`},{id:3,label:`Review`},{id:4,label:`Confirm`}],z=[{id:1},{id:2},{id:3},{id:4},{id:5}],B={title:`Form Components / Stepped Forms / FormProgress`,component:j,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:"FormProgress communicates where the user is in a multi-step form.\n\n**Three variants:**\n- `simple` — a smooth progress bar with a thumb. Use when step boundaries aren't meaningful.\n- `stepped` — discrete step markers on a track. Use when the user benefits from seeing individual steps and navigating between them.\n- `responsive` — stepped at ≥`sm`, a single active marker on a filled track below `sm`. Use when a stepped flow needs to work on all screen sizes."}}}},V={name:`Playground`,parameters:{docs:{description:{story:``}}},argTypes:{storyVariant:{name:`Variant`,control:`select`,options:[`Simple`,`Stepped - No labels`,`Stepped - with labels`,`Responsive`]},value:{name:`Value`,control:{type:`range`,min:0,max:100},if:{arg:`storyVariant`,eq:`Simple`}},showStepIndicator:{name:`Step indicator`,control:`boolean`},stepIndicatorType:{name:`Indicator type`,control:`select`,options:[`Menu indicator`,`Static indicator`],if:{arg:`showStepIndicator`,eq:!0}},tooltipLabels:{name:`Tooltip`,control:`boolean`,if:{arg:`storyVariant`,eq:`Stepped - No labels`}}},args:{storyVariant:`Simple`,value:50,showStepIndicator:!0,stepIndicatorType:`Menu indicator`,tooltipLabels:!0},render:e=>(0,P.jsx)(fe,{...e})},H={parameters:{docs:{description:{story:`**Usage guidance:** Use when overall progress matters more than individual steps OR when flows have too many steps and break on smaller screens. Avoid when users need to understand where they are relative to named checkpoints.`}}},args:{variant:`simple`,value:65,"aria-label":`Form progress`}},U=[{id:1},{id:2},{id:3},{id:4},{id:5}],W=[{id:1,label:`Personal`},{id:2,label:`Contact`},{id:3,label:`Income`},{id:4,label:`Review`},{id:5,label:`Confirm`}],G={name:`Stepped — No labels`,parameters:{docs:{description:{story:`**Usage guidance:** Use when users benefit from seeing discrete step markers but step names aren't needed — short flows where context is clear from the form itself. TooltipLabels are recommended as they aid orientation without permanently cluttering the UI, but are optional.`}}},render:()=>(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(I,{first:!0,children:`Step 1 — all upcoming`}),(0,P.jsx)(j,{variant:`stepped`,steps:U,activeStep:0}),(0,P.jsx)(I,{children:`Mid-flow — steps completed behind active`}),(0,P.jsx)(j,{variant:`stepped`,steps:U,activeStep:2,maxStep:2}),(0,P.jsx)(I,{children:`Mid-flow — tooltip labels`}),(0,P.jsx)(j,{variant:`stepped`,steps:W,activeStep:2,maxStep:2,tooltipLabels:!0})]}),args:{}},K={name:`Stepped — Moving back`,parameters:{docs:{description:{story:`The user has moved back to an earlier step.`}}},args:{variant:`stepped`,steps:U,activeStep:1,maxStep:2}},q=[{id:1,label:`Personal`},{id:2,label:`Contact`},{id:3,label:`Review`},{id:4,label:`Confirm`}],J=[{id:1,label:`Personal Details`},{id:2,label:`Contact Information`},{id:3,label:`Employment & Income`},{id:4,label:`Review Your Application`},{id:5,label:`Confirm & Submit`}],Y={name:`Stepped — With labels`,parameters:{docs:{description:{story:`**Usage guidance:** Use when step names help users understand where they are in the flow. ALWAYS test on smaller screens if you retain labels, if they don't fit switch to no labels or responsive options.`}}},render:()=>(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(I,{first:!0,children:`Short labels`}),(0,P.jsx)(j,{variant:`stepped`,steps:W,activeStep:1,maxStep:2}),(0,P.jsx)(I,{children:`Long labels`}),(0,P.jsx)(j,{variant:`stepped`,steps:J,activeStep:2,maxStep:3}),(0,P.jsxs)(I,{children:[`Maximum with labels — `,4,` steps`]}),(0,P.jsx)(j,{variant:`stepped`,steps:q,activeStep:1,maxStep:2})]}),args:{}},X={name:`Stepped — Clickable markers`,parameters:{docs:{description:{story:`**Usage guidance:** Use when users may need to revisit earlier steps — for example, review-and-edit flows or multi-step forms with a summary page. Only completed and visited steps are interactive; upcoming steps cannot be jumped to.`}}},render:()=>(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(I,{first:!0,children:`No labels`}),(0,P.jsx)(N,{steps:U}),(0,P.jsx)(I,{children:`Tooltip labels`}),(0,P.jsx)(N,{steps:W,tooltipLabels:!0}),(0,P.jsx)(I,{children:`Fixed labels`}),(0,P.jsx)(N,{steps:W})]}),args:{}},Z={name:`Stepped — Responsive`,parameters:{docs:{description:{story:'**Usage guidance:** Use `variant="responsive"` when a stepped flow must work across all screen sizes. Prefer this over `stepped` when mobile is a primary concern — Below `sm` it renders a single active marker on a filled progress track. At `sm` and above it shows the full stepped markers. Resize the viewport to see the switch.'}}},render:()=>(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(I,{first:!0,children:`No labels`}),(0,P.jsx)(j,{variant:`responsive`,steps:U,activeStep:2,maxStep:3}),(0,P.jsx)(I,{children:`Tooltip labels`}),(0,P.jsx)(j,{variant:`responsive`,steps:W,activeStep:2,maxStep:3,tooltipLabels:!0}),(0,P.jsx)(I,{children:`Fixed labels`}),(0,P.jsx)(j,{variant:`responsive`,steps:W,activeStep:2,maxStep:3})]}),args:{}},Q={name:`Step indicator`,parameters:{docs:{description:{story:'**Usage guidance:** Use `showStepIndicator` when users need explicit orientation — particularly on mobile where step markers may not be visible. Use the menu variant (`stepMenu`) when users should be able to navigate freely between steps; use static when navigation is handled elsewhere or stepping back isn\'t permitted.\n\nWhen used with `variant="responsive"`, the step indicator only appears below `sm` — at `sm` and above the full stepped markers are visible and the indicator is hidden. When showing steps ALWAYS check the responsive behaviour, it\'s important to avoid overcrowding on smaller screens.\n\n**Not recommended with `variant="stepped"`** — the step markers already provide orientation, so adding a step indicator is redundant.'}}},render:()=>(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(I,{first:!0,children:`Simple — static indicator`}),(0,P.jsx)(j,{variant:`simple`,value:50,steps:W,activeStep:2,showStepIndicator:!0,"aria-label":`Form progress`}),(0,P.jsx)(I,{children:`Simple — menu`}),(0,P.jsx)(j,{variant:`simple`,value:50,steps:W,activeStep:2,showStepIndicator:!0,stepMenu:!0,onStepClick:()=>{},"aria-label":`Form progress`}),(0,P.jsx)(I,{children:`Responsive — static indicator (indicator shows at <sm)`}),(0,P.jsx)(j,{variant:`responsive`,steps:W,activeStep:2,maxStep:3,showStepIndicator:!0}),(0,P.jsx)(I,{children:`Responsive — menu (menu shows at <sm)`}),(0,P.jsx)(j,{variant:`responsive`,steps:W,activeStep:2,maxStep:3,showStepIndicator:!0,stepMenu:!0,onStepClick:()=>{}})]}),args:{}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: ''
      }
    }
  },
  argTypes: {
    storyVariant: {
      name: 'Variant',
      control: 'select',
      options: ['Simple', 'Stepped - No labels', 'Stepped - with labels', 'Responsive'] satisfies StoryVariant[]
    },
    value: {
      name: 'Value',
      control: {
        type: 'range',
        min: 0,
        max: 100
      },
      if: {
        arg: 'storyVariant',
        eq: 'Simple'
      }
    },
    showStepIndicator: {
      name: 'Step indicator',
      control: 'boolean'
    },
    stepIndicatorType: {
      name: 'Indicator type',
      control: 'select',
      options: ['Menu indicator', 'Static indicator'] satisfies IndicatorType[],
      if: {
        arg: 'showStepIndicator',
        eq: true
      }
    },
    tooltipLabels: {
      name: 'Tooltip',
      control: 'boolean',
      if: {
        arg: 'storyVariant',
        eq: 'Stepped - No labels'
      }
    }
  },
  args: {
    storyVariant: 'Simple',
    value: 50,
    showStepIndicator: true,
    stepIndicatorType: 'Menu indicator',
    tooltipLabels: true
  },
  render: args => <PlaygroundDemo {...args} />
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use when overall progress matters more than individual steps OR when flows have too many steps and break on smaller screens. Avoid when users need to understand where they are relative to named checkpoints.'
      }
    }
  },
  args: {
    variant: 'simple',
    value: 65,
    'aria-label': 'Form progress'
  }
}`,...H.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  name: 'Stepped — No labels',
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use when users benefit from seeing discrete step markers but step names aren\\'t needed — short flows where context is clear from the form itself. TooltipLabels are recommended as they aid orientation without permanently cluttering the UI, but are optional.'
      }
    }
  },
  render: () => <>\r
      <Label first>Step 1 — all upcoming</Label>\r
      <FormProgress variant="stepped" steps={FIVE_STEPS} activeStep={0} />\r
      <Label>Mid-flow — steps completed behind active</Label>\r
      <FormProgress variant="stepped" steps={FIVE_STEPS} activeStep={2} maxStep={2} />\r
      <Label>Mid-flow — tooltip labels</Label>\r
      <FormProgress variant="stepped" steps={FIVE_STEPS_LABELLED} activeStep={2} maxStep={2} tooltipLabels />\r
    </>,
  args: {} as never
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  name: 'Stepped — Moving back',
  parameters: {
    docs: {
      description: {
        story: 'The user has moved back to an earlier step.'
      }
    }
  },
  args: {
    variant: 'stepped',
    steps: FIVE_STEPS,
    activeStep: 1,
    maxStep: 2
  }
}`,...K.parameters?.docs?.source}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  name: 'Stepped — With labels',
  parameters: {
    docs: {
      description: {
        story: \`**Usage guidance:** Use when step names help users understand where they are in the flow. ALWAYS test on smaller screens if you retain labels, if they don't fit switch to no labels or responsive options.\`
      }
    }
  },
  render: () => <>\r
      <Label first>Short labels</Label>\r
      <FormProgress variant="stepped" steps={FIVE_STEPS_LABELLED} activeStep={1} maxStep={2} />\r
      <Label>Long labels</Label>\r
      <FormProgress variant="stepped" steps={FIVE_STEPS_LONG_LABELS} activeStep={2} maxStep={3} />\r
      <Label>Maximum with labels — {STEPPED_MAX_STEPS_LABELLED} steps</Label>\r
      <FormProgress variant="stepped" steps={FOUR_STEPS_LABELLED} activeStep={1} maxStep={2} />\r
    </>,
  args: {} as never
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  name: 'Stepped — Clickable markers',
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use when users may need to revisit earlier steps — for example, review-and-edit flows or multi-step forms with a summary page. Only completed and visited steps are interactive; upcoming steps cannot be jumped to.'
      }
    }
  },
  render: () => <>\r
      <Label first>No labels</Label>\r
      <ClickableDemo steps={FIVE_STEPS} />\r
      <Label>Tooltip labels</Label>\r
      <ClickableDemo steps={FIVE_STEPS_LABELLED} tooltipLabels />\r
      <Label>Fixed labels</Label>\r
      <ClickableDemo steps={FIVE_STEPS_LABELLED} />\r
    </>,
  args: {} as never
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: 'Stepped — Responsive',
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`variant="responsive"\` when a stepped flow must work across all screen sizes. Prefer this over \`stepped\` when mobile is a primary concern — Below \`sm\` it renders a single active marker on a filled progress track. At \`sm\` and above it shows the full stepped markers. Resize the viewport to see the switch.'
      }
    }
  },
  render: () => <>\r
      <Label first>No labels</Label>\r
      <FormProgress variant="responsive" steps={FIVE_STEPS} activeStep={2} maxStep={3} />\r
      <Label>Tooltip labels</Label>\r
      <FormProgress variant="responsive" steps={FIVE_STEPS_LABELLED} activeStep={2} maxStep={3} tooltipLabels />\r
      <Label>Fixed labels</Label>\r
      <FormProgress variant="responsive" steps={FIVE_STEPS_LABELLED} activeStep={2} maxStep={3} />\r
    </>,
  args: {} as never
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: 'Step indicator',
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`showStepIndicator\` when users need explicit orientation — particularly on mobile where step markers may not be visible. Use the menu variant (\`stepMenu\`) when users should be able to navigate freely between steps; use static when navigation is handled elsewhere or stepping back isn\\'t permitted.\\n\\nWhen used with \`variant="responsive"\`, the step indicator only appears below \`sm\` — at \`sm\` and above the full stepped markers are visible and the indicator is hidden. When showing steps ALWAYS check the responsive behaviour, it\\'s important to avoid overcrowding on smaller screens.\\n\\n**Not recommended with \`variant="stepped"\`** — the step markers already provide orientation, so adding a step indicator is redundant.'
      }
    }
  },
  render: () => <>\r
      <Label first>Simple — static indicator</Label>\r
      <FormProgress variant="simple" value={50} steps={FIVE_STEPS_LABELLED} activeStep={2} showStepIndicator aria-label="Form progress" />\r
      <Label>Simple — menu</Label>\r
      <FormProgress variant="simple" value={50} steps={FIVE_STEPS_LABELLED} activeStep={2} showStepIndicator stepMenu onStepClick={() => {}} aria-label="Form progress" />\r
      <Label>Responsive — static indicator (indicator shows at &lt;sm)</Label>\r
      <FormProgress variant="responsive" steps={FIVE_STEPS_LABELLED} activeStep={2} maxStep={3} showStepIndicator />\r
      <Label>Responsive — menu (menu shows at &lt;sm)</Label>\r
      <FormProgress variant="responsive" steps={FIVE_STEPS_LABELLED} activeStep={2} maxStep={3} showStepIndicator stepMenu onStepClick={() => {}} />\r
    </>,
  args: {} as never
}`,...Q.parameters?.docs?.source}}},$=[`Playground`,`Simple`,`SteppedStates`,`SteppedMovingBack`,`SteppedWithLabels`,`SteppedClickable`,`SteppedResponsive`,`StepIndicator`]}))();export{V as Playground,H as Simple,Q as StepIndicator,X as SteppedClickable,K as SteppedMovingBack,Z as SteppedResponsive,G as SteppedStates,Y as SteppedWithLabels,$ as __namedExportsOrder,B as default};