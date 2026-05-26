import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{n,t as r}from"./Breadcrumb-ClsOSTSO.js";var i,a,o,s,c,l,u,d;e((()=>{i=t(),n(),a=[{label:`Home`,href:`#`},{label:`Investments`,href:`#`},{label:`Retirement Options`,href:`#`},{label:`Conservative`,href:`#`},{label:`Overview`}],o={title:`Public web / Breadcrumb`,component:r,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:`Navigation aid showing the user's current location within a hierarchy. The last item is the current page and is never a link.`}}},argTypes:{crumb1:{control:`text`,description:`First breadcrumb label (always a link).`},crumb2:{control:`text`,description:`Second breadcrumb label. Leave empty to hide.`},crumb3:{control:`text`,description:`Third breadcrumb label. Leave empty to hide.`},crumb4:{control:`text`,description:`Fourth breadcrumb label. Leave empty to hide.`},currentPage:{control:`text`,description:`Current page label — rendered as text, not a link.`},separator:{control:`select`,options:[`/`,`›`,`→`,`·`],description:`Character used to separate items.`},maxItems:{control:`number`,description:`Maximum items shown before collapsing middle items.`},"aria-label":{control:`text`,description:`Accessible label for the nav element.`}}},s={render:({separator:e,maxItems:t,"aria-label":n,crumb1:a,crumb2:o,crumb3:s,crumb4:c,currentPage:l})=>(0,i.jsx)(r,{items:[a?{label:a,href:`#`}:null,o?{label:o,href:`#`}:null,s?{label:s,href:`#`}:null,c?{label:c,href:`#`}:null,l?{label:l}:null].filter(e=>e!==null),separator:e,maxItems:t,"aria-label":n}),args:{crumb1:`Home`,crumb2:`Products`,crumb3:``,crumb4:``,currentPage:`Overview`,separator:`/`,maxItems:8,"aria-label":`breadcrumb`}},c={name:`Long path — collapse behaviour`,render:()=>(0,i.jsx)(r,{items:a,maxItems:3})},l={render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,i.jsx)(r,{items:a.slice(0,3),separator:`/`}),(0,i.jsx)(r,{items:a.slice(0,3),separator:`›`}),(0,i.jsx)(r,{items:a.slice(0,3),separator:`→`}),(0,i.jsx)(r,{items:a.slice(0,3),separator:`·`})]})},u={name:`Single level`,render:()=>(0,i.jsx)(r,{items:[{label:`Home`,href:`#`},{label:`Overview`}]})},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: ({
    separator,
    maxItems,
    'aria-label': ariaLabel,
    crumb1,
    crumb2,
    crumb3,
    crumb4,
    currentPage
  }) => {
    const items = [crumb1 ? {
      label: crumb1,
      href: '#'
    } : null, crumb2 ? {
      label: crumb2,
      href: '#'
    } : null, crumb3 ? {
      label: crumb3,
      href: '#'
    } : null, crumb4 ? {
      label: crumb4,
      href: '#'
    } : null, currentPage ? {
      label: currentPage
    } : null].filter((item): item is NonNullable<typeof item> => item !== null);
    return <Breadcrumb items={items} separator={separator} maxItems={maxItems} aria-label={ariaLabel} />;
  },
  args: {
    crumb1: 'Home',
    crumb2: 'Products',
    crumb3: '',
    crumb4: '',
    currentPage: 'Overview',
    separator: '/',
    maxItems: 8,
    'aria-label': 'breadcrumb'
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'Long path — collapse behaviour',
  render: () => <Breadcrumb items={LONG_ITEMS} maxItems={3} />
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  }}>\r
      <Breadcrumb items={LONG_ITEMS.slice(0, 3)} separator="/" />\r
      <Breadcrumb items={LONG_ITEMS.slice(0, 3)} separator="›" />\r
      <Breadcrumb items={LONG_ITEMS.slice(0, 3)} separator="→" />\r
      <Breadcrumb items={LONG_ITEMS.slice(0, 3)} separator="·" />\r
    </div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  name: 'Single level',
  render: () => <Breadcrumb items={[{
    label: 'Home',
    href: '#'
  }, {
    label: 'Overview'
  }]} />
}`,...u.parameters?.docs?.source}}},d=[`Default`,`LongPath`,`Separators`,`SingleLevel`]}))();export{s as Default,c as LongPath,l as Separators,u as SingleLevel,d as __namedExportsOrder,o as default};