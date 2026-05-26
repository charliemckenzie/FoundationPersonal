import{n as e,s as t}from"./chunk-Bj-mKKzh.js";import{t as n}from"./react-DVKR3yZN.js";import{t as r}from"./jsx-runtime-CyI9ICYU.js";import{n as i,t as a}from"./Box-Cj6TI_Dr.js";import{n as o,t as s}from"./Button-C-Y45Snn.js";import{n as c,t as l}from"./Dialog-BfZCkAdE.js";function u({variant:e=`neutral`,size:t=`small`,title:n=`Confirm action`,description:r=`Are you sure you want to continue? This cannot be undone.`,triggerLabel:i=`Open dialog`,confirmLabel:a,cancelLabel:o,mobileDisplay:c}){let[u,p]=(0,f.useState)(!1);return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(s,{label:i,onClick:()=>p(!0)}),(0,d.jsx)(l,{open:u,onClose:()=>p(!1),onConfirm:()=>p(!1),title:n,description:r,variant:e,size:t,confirmLabel:a,cancelLabel:o,mobileDisplay:c})]})}var d,f,p,m,h,g,_,v;e((()=>{d=r(),f=t(n()),a(),c(),o(),p={title:`Components / Dialog`,component:l,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`A structured overlay for confirmations, alerts, and destructive-action flows. Use Modal for flexible, content-agnostic overlays.`}}},argTypes:{variant:{table:{disable:!0}},size:{control:`select`,options:[`small`,`medium`,`large`]},alertButtonLayout:{table:{disable:!0}},loading:{table:{disable:!0}},disableCloseOnBackdrop:{table:{disable:!0}},onConfirm:{table:{disable:!0}},onClose:{table:{disable:!0}},children:{table:{disable:!0}},extraActions:{table:{disable:!0}},mobileDisplay:{control:`radio`,options:[`drawer`,`dialog`]}}},m={render:()=>(0,d.jsx)(u,{})},h={name:`No mobile drawer`,parameters:{docs:{description:{story:'Use `mobileDisplay="dialog"` to keep the classic centred modal on all breakpoints. The default (`"drawer"`) slides up from the bottom on small screens.'}}},render:()=>(0,d.jsxs)(i,{sx:{display:`flex`,gap:2},children:[(0,d.jsx)(u,{triggerLabel:`Drawer (default)`}),(0,d.jsx)(u,{triggerLabel:`Always modal`,mobileDisplay:`dialog`})]})},g={render:()=>(0,d.jsxs)(i,{sx:{display:`flex`,gap:2},children:[(0,d.jsx)(u,{size:`small`,title:`Small dialog`,triggerLabel:`Small`}),(0,d.jsx)(u,{size:`medium`,title:`Medium dialog`,triggerLabel:`Medium`}),(0,d.jsx)(u,{size:`large`,title:`Large dialog`,triggerLabel:`Large`})]})},_={render:()=>{let[e,t]=(0,f.useState)(null);return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)(i,{sx:{display:`flex`,gap:2},children:[(0,d.jsx)(s,{label:`Single action`,onClick:()=>t(`single`)}),(0,d.jsx)(s,{label:`Dual action`,onClick:()=>t(`dual`)}),(0,d.jsx)(s,{label:`Stacked actions`,onClick:()=>t(`stacked`)})]}),(0,d.jsx)(l,{open:e===`single`,onClose:()=>t(null),variant:`alert`,title:`No internet connection`,description:`Check your settings and try again.`,cancelLabel:`OK`}),(0,d.jsx)(l,{open:e===`dual`,onClose:()=>t(null),onConfirm:()=>t(null),variant:`alert`,title:`Delete item?`,description:`This action cannot be undone.`,confirmLabel:`Delete`,cancelLabel:`Cancel`}),(0,d.jsx)(l,{open:e===`stacked`,onClose:()=>t(null),onConfirm:()=>t(null),variant:`alert`,alertButtonLayout:`stack`,title:`Unsaved changes`,description:`Choose how you'd like to handle your unsaved changes.`,confirmLabel:`Keep editing`,cancelLabel:`Cancel`,extraActions:[{label:`Save as draft`,onClick:()=>t(null)},{label:`Discard changes`,onClick:()=>t(null)}]})]})}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <DialogDemo />
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'No mobile drawer',
  parameters: {
    docs: {
      description: {
        story: 'Use \`mobileDisplay="dialog"\` to keep the classic centred modal on all breakpoints. The default (\`"drawer"\`) slides up from the bottom on small screens.'
      }
    }
  },
  render: () => <Box sx={{
    display: 'flex',
    gap: 2
  }}>\r
      <DialogDemo triggerLabel="Drawer (default)" />\r
      <DialogDemo triggerLabel="Always modal" mobileDisplay="dialog" />\r
    </Box>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    display: 'flex',
    gap: 2
  }}>\r
      <DialogDemo size="small" title="Small dialog" triggerLabel="Small" />\r
      <DialogDemo size="medium" title="Medium dialog" triggerLabel="Medium" />\r
      <DialogDemo size="large" title="Large dialog" triggerLabel="Large" />\r
    </Box>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState<'single' | 'dual' | 'stacked' | null>(null);
    const extraActions: AlertAction[] = [{
      label: 'Save as draft',
      onClick: () => setOpen(null)
    }, {
      label: 'Discard changes',
      onClick: () => setOpen(null)
    }];
    return <>\r
        <Box sx={{
        display: 'flex',
        gap: 2
      }}>\r
          <Button label="Single action" onClick={() => setOpen('single')} />\r
          <Button label="Dual action" onClick={() => setOpen('dual')} />\r
          <Button label="Stacked actions" onClick={() => setOpen('stacked')} />\r
        </Box>\r
        <Dialog open={open === 'single'} onClose={() => setOpen(null)} variant="alert" title="No internet connection" description="Check your settings and try again." cancelLabel="OK" />\r
        <Dialog open={open === 'dual'} onClose={() => setOpen(null)} onConfirm={() => setOpen(null)} variant="alert" title="Delete item?" description="This action cannot be undone." confirmLabel="Delete" cancelLabel="Cancel" />\r
        <Dialog open={open === 'stacked'} onClose={() => setOpen(null)} onConfirm={() => setOpen(null)} variant="alert" alertButtonLayout="stack" title="Unsaved changes" description="Choose how you'd like to handle your unsaved changes." confirmLabel="Keep editing" cancelLabel="Cancel" extraActions={extraActions} />\r
      </>;
  }
}`,..._.parameters?.docs?.source}}},v=[`Default`,`NoMobileDrawer`,`Sizes`,`AlertDialogs`]}))();export{_ as AlertDialogs,m as Default,h as NoMobileDrawer,g as Sizes,v as __namedExportsOrder,p as default};