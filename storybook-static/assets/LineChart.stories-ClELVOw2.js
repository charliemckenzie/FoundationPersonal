import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{n,t as r}from"./Charts-DAGuvsEX.js";var i,a,o,s,c,l,u,d;e((()=>{i=t(),r(),a=[{quarter:`Q1 2023`,growth:4.2,benchmark:3.8},{quarter:`Q2 2023`,growth:5.1,benchmark:4.1},{quarter:`Q3 2023`,growth:3.7,benchmark:4.3},{quarter:`Q4 2023`,growth:6.2,benchmark:4.9},{quarter:`Q1 2024`,growth:5.8,benchmark:5.2},{quarter:`Q2 2024`,growth:7.1,benchmark:5.5}],o={title:`Components / Charts / LineChart`,component:n,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:`Line chart built with Recharts. Supports multiple series, dashed lines for benchmarks or targets, optional dots, and full keyboard accessibility.`}}},argTypes:{height:{control:{type:`range`,min:200,max:600,step:50}},showGrid:{control:`boolean`},showLegend:{control:`boolean`},showTooltip:{control:`boolean`},showDots:{control:`boolean`},ariaLabel:{control:`text`},data:{table:{disable:!0}},lines:{table:{disable:!0}},xKey:{table:{disable:!0}},sx:{table:{disable:!0}}}},s={args:{data:a,xKey:`quarter`,lines:[{dataKey:`growth`,label:`Fund Growth (%)`}],height:300,showGrid:!0,showLegend:!0,showTooltip:!0,showDots:!0,ariaLabel:`Quarterly fund growth line chart`},parameters:{docs:{description:{story:`Single series. Toggle grid, legend, tooltip, and dots via the controls panel.`}}}},c={parameters:{docs:{description:{story:`Two series compared side by side. Each picks the next theme palette colour.`}}},render:()=>(0,i.jsx)(n,{data:a,xKey:`quarter`,lines:[{dataKey:`growth`,label:`Fund Growth (%)`},{dataKey:`benchmark`,label:`Benchmark (%)`}],height:300,ariaLabel:`Quarterly fund growth vs benchmark`})},l={parameters:{docs:{description:{story:"Use `dashed: true` on a series to visually distinguish benchmarks or target lines."}}},render:()=>(0,i.jsx)(n,{data:a,xKey:`quarter`,lines:[{dataKey:`growth`,label:`Fund Growth (%)`},{dataKey:`benchmark`,label:`Benchmark (%)`,dashed:!0}],height:300,ariaLabel:`Quarterly fund growth with dashed benchmark`})},u={parameters:{docs:{description:{story:"Set `showDots={false}` for dense datasets — cleaner trend line."}}},render:()=>(0,i.jsx)(n,{data:a,xKey:`quarter`,lines:[{dataKey:`growth`,label:`Fund Growth (%)`}],height:300,showDots:!1,ariaLabel:`Quarterly fund growth trend without dots`})},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    data: PERFORMANCE_DATA,
    xKey: 'quarter',
    lines: [{
      dataKey: 'growth',
      label: 'Fund Growth (%)'
    }],
    height: 300,
    showGrid: true,
    showLegend: true,
    showTooltip: true,
    showDots: true,
    ariaLabel: 'Quarterly fund growth line chart'
  },
  parameters: {
    docs: {
      description: {
        story: 'Single series. Toggle grid, legend, tooltip, and dots via the controls panel.'
      }
    }
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Two series compared side by side. Each picks the next theme palette colour.'
      }
    }
  },
  render: () => <LineChart data={PERFORMANCE_DATA} xKey="quarter" lines={[{
    dataKey: 'growth',
    label: 'Fund Growth (%)'
  }, {
    dataKey: 'benchmark',
    label: 'Benchmark (%)'
  }]} height={300} ariaLabel="Quarterly fund growth vs benchmark" />
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Use \`dashed: true\` on a series to visually distinguish benchmarks or target lines.'
      }
    }
  },
  render: () => <LineChart data={PERFORMANCE_DATA} xKey="quarter" lines={[{
    dataKey: 'growth',
    label: 'Fund Growth (%)'
  }, {
    dataKey: 'benchmark',
    label: 'Benchmark (%)',
    dashed: true
  }]} height={300} ariaLabel="Quarterly fund growth with dashed benchmark" />
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Set \`showDots={false}\` for dense datasets — cleaner trend line.'
      }
    }
  },
  render: () => <LineChart data={PERFORMANCE_DATA} xKey="quarter" lines={[{
    dataKey: 'growth',
    label: 'Fund Growth (%)'
  }]} height={300} showDots={false} ariaLabel="Quarterly fund growth trend without dots" />
}`,...u.parameters?.docs?.source}}},d=[`Default`,`MultiSeries`,`DashedBenchmark`,`NoDots`]}))();export{l as DashedBenchmark,s as Default,c as MultiSeries,u as NoDots,d as __namedExportsOrder,o as default};