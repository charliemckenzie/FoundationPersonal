import{n as e,s as t}from"./chunk-Bj-mKKzh.js";import{t as n}from"./react-DVKR3yZN.js";import{t as r}from"./jsx-runtime-CyI9ICYU.js";import{n as i,t as a}from"./Typography-ChsBGyM_.js";import{n as o,t as s}from"./Box-Cj6TI_Dr.js";import{n as c,t as l}from"./DateRangePicker-C5g6kpEx.js";var u,d,f,p,m,h,g,_,v;e((()=>{u=r(),d=t(n()),s(),a(),c(),f={title:`Form Components / Date / DateRangePicker`,component:l,tags:[`autodocs`],parameters:{layout:`padded`},argTypes:{disabled:{control:`boolean`},error:{control:`boolean`},helperText:{control:`text`},startLabel:{control:`text`},endLabel:{control:`text`},value:{table:{disable:!0}},onChange:{table:{disable:!0}},minDate:{table:{disable:!0}},maxDate:{table:{disable:!0}}}},p={render:function(e){let[t,n]=(0,d.useState)([null,null]);return(0,u.jsx)(l,{...e,value:t,onChange:n})},args:{startLabel:`Start date`,endLabel:`End date`}},m={render:function(e){let[t,n]=(0,d.useState)([new Date(`2025-01-01`),new Date(`2025-06-30`)]);return(0,u.jsxs)(o,{children:[(0,u.jsx)(l,{...e,value:t,onChange:n}),(0,u.jsxs)(i,{variant:`small`,color:`text.muted`,sx:{mt:1,display:`block`},children:[t[0]?.toLocaleDateString(),` – `,t[1]?.toLocaleDateString()]})]})},args:{startLabel:`From`,endLabel:`To`}},h={render:function(){let[e,t]=(0,d.useState)([null,null]);return(0,u.jsxs)(o,{sx:{maxWidth:`36rem`},children:[(0,u.jsx)(i,{variant:`h6`,sx:{mb:2},children:`Filter transactions`}),(0,u.jsx)(l,{value:e,onChange:t,startLabel:`From`,endLabel:`To`,helperText:`Results will show transactions between these dates.`})]})}},g={render:function(e){let[t,n]=(0,d.useState)([null,null]);return(0,u.jsx)(l,{...e,value:t,onChange:n})},args:{error:!0,helperText:`End date must be after start date.`}},_={render:function(e){return(0,u.jsx)(l,{...e,value:[new Date(`2025-01-01`),new Date(`2025-06-30`)],onChange:()=>void 0})},args:{disabled:!0}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: function Render(args) {
    const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
    return <DateRangePicker {...args} value={value} onChange={setValue} />;
  },
  args: {
    startLabel: 'Start date',
    endLabel: 'End date'
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: function Render(args) {
    const [value, setValue] = useState<[Date | null, Date | null]>([new Date('2025-01-01'), new Date('2025-06-30')]);
    return <Box>\r
        <DateRangePicker {...args} value={value} onChange={setValue} />\r
        <Typography variant="small" color="text.muted" sx={{
        mt: 1,
        display: 'block'
      }}>\r
          {value[0]?.toLocaleDateString()} – {value[1]?.toLocaleDateString()}\r
        </Typography>\r
      </Box>;
  },
  args: {
    startLabel: 'From',
    endLabel: 'To'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: function Render() {
    const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
    return <Box sx={{
      maxWidth: '36rem'
    }}>\r
        <Typography variant="h6" sx={{
        mb: 2
      }}>Filter transactions</Typography>\r
        <DateRangePicker value={value} onChange={setValue} startLabel="From" endLabel="To" helperText="Results will show transactions between these dates." />\r
      </Box>;
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: function Render(args) {
    const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
    return <DateRangePicker {...args} value={value} onChange={setValue} />;
  },
  args: {
    error: true,
    helperText: 'End date must be after start date.'
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: function Render(args) {
    return <DateRangePicker {...args} value={[new Date('2025-01-01'), new Date('2025-06-30')]} onChange={() => undefined} />;
  },
  args: {
    disabled: true
  }
}`,..._.parameters?.docs?.source}}},v=[`Default`,`WithValue`,`TransactionFilter`,`WithError`,`Disabled`]}))();export{p as Default,_ as Disabled,h as TransactionFilter,g as WithError,m as WithValue,v as __namedExportsOrder,f as default};