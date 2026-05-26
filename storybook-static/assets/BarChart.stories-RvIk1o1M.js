import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{r as n,t as r}from"./Charts-DAGuvsEX.js";var i,a,o,s,c,l,u;e((()=>{i=t(),r(),a=[{month:`Jan`,revenue:4200,expenses:2800},{month:`Feb`,revenue:3800,expenses:3100},{month:`Mar`,revenue:5100,expenses:2900},{month:`Apr`,revenue:4700,expenses:3200},{month:`May`,revenue:6200,expenses:3400},{month:`Jun`,revenue:5800,expenses:3e3}],o={title:`Components / Charts / BarChart`,component:n,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:"Bar chart built with Recharts. Supports single and grouped bars. Colours pull from the MUI theme palette in order — override per series with the `color` prop. Keyboard accessible via the `accessibilityLayer` prop."}}},argTypes:{height:{control:{type:`range`,min:200,max:600,step:50}},barSize:{control:{type:`range`,min:4,max:60,step:2}},showGrid:{control:`boolean`},showLegend:{control:`boolean`},showTooltip:{control:`boolean`},ariaLabel:{control:`text`},data:{table:{disable:!0}},bars:{table:{disable:!0}},xKey:{table:{disable:!0}},sx:{table:{disable:!0}}}},s={args:{data:a,xKey:`month`,bars:[{dataKey:`revenue`,label:`Revenue`}],height:300,barSize:40,showGrid:!0,showLegend:!0,showTooltip:!0,ariaLabel:`Monthly revenue bar chart`},parameters:{docs:{description:{story:`Single series. Toggle grid, legend, and tooltip via the controls panel.`}}}},c={parameters:{docs:{description:{story:`Multiple series rendered side by side. Each series picks the next colour from the theme palette.`}}},render:()=>(0,i.jsx)(n,{data:a,xKey:`month`,bars:[{dataKey:`revenue`,label:`Revenue`},{dataKey:`expenses`,label:`Expenses`}],height:300,ariaLabel:`Monthly revenue and expenses bar chart`})},l={parameters:{docs:{description:{story:`No grid, legend, or tooltip — useful for compact dashboard tiles.`}}},render:()=>(0,i.jsx)(n,{data:a,xKey:`month`,bars:[{dataKey:`revenue`,label:`Revenue`}],height:200,showGrid:!1,showLegend:!1,showTooltip:!1,ariaLabel:`Monthly revenue summary`})},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    data: MONTHLY_DATA,
    xKey: 'month',
    bars: [{
      dataKey: 'revenue',
      label: 'Revenue'
    }],
    height: 300,
    barSize: 40,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    ariaLabel: 'Monthly revenue bar chart'
  },
  parameters: {
    docs: {
      description: {
        story: 'Single series. Toggle grid, legend, and tooltip via the controls panel.'
      }
    }
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Multiple series rendered side by side. Each series picks the next colour from the theme palette.'
      }
    }
  },
  render: () => <BarChart data={MONTHLY_DATA} xKey="month" bars={[{
    dataKey: 'revenue',
    label: 'Revenue'
  }, {
    dataKey: 'expenses',
    label: 'Expenses'
  }]} height={300} ariaLabel="Monthly revenue and expenses bar chart" />
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'No grid, legend, or tooltip — useful for compact dashboard tiles.'
      }
    }
  },
  render: () => <BarChart data={MONTHLY_DATA} xKey="month" bars={[{
    dataKey: 'revenue',
    label: 'Revenue'
  }]} height={200} showGrid={false} showLegend={false} showTooltip={false} ariaLabel="Monthly revenue summary" />
}`,...l.parameters?.docs?.source}}},u=[`Default`,`Grouped`,`Minimal`]}))();export{s as Default,c as Grouped,l as Minimal,u as __namedExportsOrder,o as default};