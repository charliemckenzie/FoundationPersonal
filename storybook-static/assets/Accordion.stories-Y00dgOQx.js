import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{n,t as r}from"./Button-C-Y45Snn.js";import{n as i,t as a}from"./Accordion-DwAKMsjo.js";var o,s,c,l,u,d,f,p,m,h,g,_;e((()=>{o=t(),i(),n(),s=[{id:`panel-1`,title:`What is Foundation?`,content:`Foundation is the design system powering all UX prototypes. It provides a consistent set of components built on MUI.`},{id:`panel-2`,title:`How do I use a component?`,content:`Import from src/components, pass the required props, and refer to the Storybook story for examples.`},{id:`panel-3`,title:`How do I request a new component?`,content:`Talk to Smithers. All new component requests start with Smithers, who routes to Moe for design system approval before Lenny builds it.`}],c={title:`Components / Expandable / Accordion`,component:a,tags:[`autodocs`],parameters:{layout:`padded`},argTypes:{items:{table:{disable:!0}},onChange:{table:{disable:!0}},variant:{control:`radio`,options:[`default`,`exclusive`],description:`exclusive — only one panel can be open at a time.`},defaultExpanded:{control:`select`,options:[`none`,`panel-1`,`panel-2`,`panel-3`],description:`Which panel is open on first render.`},showCloseAll:{control:`boolean`,description:`Show a "Close all" button above the panels.`},showActions:{control:`boolean`,description:`Add action buttons (e.g. Cancel / Confirm) to the bottom of each panel.`}}},l=(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r,{label:`Cancel`,variant:`outlined`,size:`small`}),(0,o.jsx)(r,{label:`Confirm`,variant:`contained`,size:`small`})]}),u={render:({defaultExpanded:e,showCloseAll:t,variant:n,showActions:r})=>(0,o.jsx)(a,{items:s.map(e=>({...e,actions:r?l:void 0})),defaultExpanded:e===`none`?void 0:e,showCloseAll:t,variant:n},`${e}-${n}-${r}`),args:{variant:`default`,defaultExpanded:`none`,showCloseAll:!1,showActions:!1}},d={args:{items:s,defaultExpanded:`panel-1`,showCloseAll:!1}},f={name:`Exclusive — only one open`,args:{items:s,variant:`exclusive`,defaultExpanded:`panel-1`}},p={args:{items:[{id:`single`,title:`Single panel`,content:`Just one panel, expanded by default.`}],defaultExpanded:`single`,showCloseAll:!1}},m={name:`Close All — multiple open`,render:()=>(0,o.jsx)(a,{items:s,defaultExpanded:`panel-1`,showCloseAll:!0})},h={name:`Disabled panels`,render:()=>(0,o.jsx)(a,{defaultExpanded:`panel-1`,items:[{id:`panel-1`,title:`Active panel`,content:`This panel is active and can be expanded or collapsed.`},{id:`panel-2`,title:`Disabled panel`,content:`This content is not reachable.`,disabled:!0},{id:`panel-3`,title:`Another active panel`,content:`This panel is also active.`}]})},g={name:`With action buttons`,render:()=>(0,o.jsx)(a,{defaultExpanded:`panel-1`,items:[{id:`panel-1`,title:`Terms and conditions`,content:`By proceeding you agree to the terms and conditions of this service. Please read carefully before accepting.`,actions:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r,{label:`Cancel`,variant:`outlined`,size:`small`}),(0,o.jsx)(r,{label:`I agree`,variant:`contained`,size:`small`})]})},{id:`panel-2`,title:`Privacy policy`,content:`We collect only the information necessary to deliver our services. Your data is never sold to third parties.`,actions:(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(r,{label:`Decline`,variant:`outlined`,size:`small`}),(0,o.jsx)(r,{label:`Accept`,variant:`contained`,size:`small`})]})},{id:`panel-3`,title:`No action buttons`,content:`This panel has no actions — the footer does not render when actions is omitted.`}]})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: ({
    defaultExpanded,
    showCloseAll,
    variant,
    showActions
  }) => <Accordion key={\`\${defaultExpanded}-\${variant}-\${showActions}\`} items={SAMPLE_ITEMS.map(item => ({
    ...item,
    actions: showActions ? ACTIONS : undefined
  }))} defaultExpanded={defaultExpanded === 'none' ? undefined : defaultExpanded} showCloseAll={showCloseAll} variant={variant} />,
  args: {
    variant: 'default',
    defaultExpanded: 'none',
    showCloseAll: false,
    showActions: false
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    items: SAMPLE_ITEMS,
    defaultExpanded: 'panel-1',
    showCloseAll: false
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  name: 'Exclusive — only one open',
  args: {
    items: SAMPLE_ITEMS,
    variant: 'exclusive',
    defaultExpanded: 'panel-1'
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    items: [{
      id: 'single',
      title: 'Single panel',
      content: 'Just one panel, expanded by default.'
    }],
    defaultExpanded: 'single',
    showCloseAll: false
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Close All — multiple open',
  render: () => <Accordion items={SAMPLE_ITEMS} defaultExpanded="panel-1" showCloseAll={true} />
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Disabled panels',
  render: () => <Accordion defaultExpanded="panel-1" items={[{
    id: 'panel-1',
    title: 'Active panel',
    content: 'This panel is active and can be expanded or collapsed.'
  }, {
    id: 'panel-2',
    title: 'Disabled panel',
    content: 'This content is not reachable.',
    disabled: true
  }, {
    id: 'panel-3',
    title: 'Another active panel',
    content: 'This panel is also active.'
  }]} />
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'With action buttons',
  render: () => <Accordion defaultExpanded="panel-1" items={[{
    id: 'panel-1',
    title: 'Terms and conditions',
    content: 'By proceeding you agree to the terms and conditions of this service. Please read carefully before accepting.',
    actions: <>\r
              <Button label="Cancel" variant="outlined" size="small" />\r
              <Button label="I agree" variant="contained" size="small" />\r
            </>
  }, {
    id: 'panel-2',
    title: 'Privacy policy',
    content: 'We collect only the information necessary to deliver our services. Your data is never sold to third parties.',
    actions: <>\r
              <Button label="Decline" variant="outlined" size="small" />\r
              <Button label="Accept" variant="contained" size="small" />\r
            </>
  }, {
    id: 'panel-3',
    title: 'No action buttons',
    content: 'This panel has no actions — the footer does not render when actions is omitted.'
  }]} />
}`,...g.parameters?.docs?.source}}},_=[`Default`,`DefaultExpanded`,`Exclusive`,`SingleItem`,`MultipleExpanded`,`Disabled`,`WithActions`]}))();export{u as Default,d as DefaultExpanded,h as Disabled,f as Exclusive,m as MultipleExpanded,p as SingleItem,g as WithActions,_ as __namedExportsOrder,c as default};