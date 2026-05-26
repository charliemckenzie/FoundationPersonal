import{n as e,s as t}from"./chunk-Bj-mKKzh.js";import{t as n}from"./react-DVKR3yZN.js";import{t as r}from"./jsx-runtime-CyI9ICYU.js";import{n as i,t as a}from"./Box-Cj6TI_Dr.js";import{n as o,t as s}from"./Button-DO5dzdsk.js";import{n as c,t as l}from"./Snackbar-6356WMND.js";var u,d,f,p,m,h,g;e((()=>{u=r(),d=t(n()),s(),a(),c(),f={title:`Components / Snackbar`,component:l,tags:[`autodocs`],parameters:{layout:`padded`},argTypes:{severity:{control:`select`,options:[`success`,`error`,`warning`,`info`,void 0]},duration:{control:`number`},anchorOrigin:{table:{disable:!0}}}},p={render:function(e){let[t,n]=(0,d.useState)(!1);return(0,u.jsxs)(i,{children:[(0,u.jsx)(o,{variant:`contained`,onClick:()=>n(!0),children:`Show notification`}),(0,u.jsx)(l,{...e,open:t,onClose:()=>n(!1)})]})},args:{message:`Changes saved successfully.`}},m={render:function(){let[e,t]=(0,d.useState)(null),n=[{severity:`success`,message:`Your details have been updated.`},{severity:`error`,message:`Something went wrong. Please try again.`},{severity:`warning`,message:`Your session is about to expire.`},{severity:`info`,message:`A new statement is available.`}];return(0,u.jsxs)(i,{sx:{display:`flex`,gap:2,flexWrap:`wrap`},children:[n.map((e,n)=>(0,u.jsx)(o,{variant:`outlined`,onClick:()=>t(n),children:e.severity},e.severity)),n.map((n,r)=>(0,u.jsx)(l,{open:e===r,severity:n.severity,message:n.message,onClose:()=>t(null)},n.severity))]})}},h={render:function(e){let[t,n]=(0,d.useState)(!1);return(0,u.jsxs)(i,{children:[(0,u.jsx)(o,{variant:`contained`,onClick:()=>n(!0),children:`Show persistent`}),(0,u.jsx)(l,{...e,open:t,onClose:()=>n(!1)})]})},args:{message:`This stays until dismissed.`,severity:`info`,duration:null}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return <Box>\r
        <Button variant="contained" onClick={() => setOpen(true)}>\r
          Show notification\r
        </Button>\r
        <Snackbar {...args} open={open} onClose={() => setOpen(false)} />\r
      </Box>;
  },
  args: {
    message: 'Changes saved successfully.'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const items = [{
      severity: 'success' as const,
      message: 'Your details have been updated.'
    }, {
      severity: 'error' as const,
      message: 'Something went wrong. Please try again.'
    }, {
      severity: 'warning' as const,
      message: 'Your session is about to expire.'
    }, {
      severity: 'info' as const,
      message: 'A new statement is available.'
    }];
    return <Box sx={{
      display: 'flex',
      gap: 2,
      flexWrap: 'wrap'
    }}>\r
        {items.map((item, i) => <Button key={item.severity} variant="outlined" onClick={() => setOpenIndex(i)}>\r
            {item.severity}\r
          </Button>)}\r
        {items.map((item, i) => <Snackbar key={item.severity} open={openIndex === i} severity={item.severity} message={item.message} onClose={() => setOpenIndex(null)} />)}\r
      </Box>;
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return <Box>\r
        <Button variant="contained" onClick={() => setOpen(true)}>\r
          Show persistent\r
        </Button>\r
        <Snackbar {...args} open={open} onClose={() => setOpen(false)} />\r
      </Box>;
  },
  args: {
    message: 'This stays until dismissed.',
    severity: 'info',
    duration: null
  }
}`,...h.parameters?.docs?.source}}},g=[`Default`,`Severities`,`Persistent`]}))();export{p as Default,h as Persistent,m as Severities,g as __namedExportsOrder,f as default};