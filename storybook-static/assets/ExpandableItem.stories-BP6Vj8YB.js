import{n as e,s as t}from"./chunk-Bj-mKKzh.js";import{t as n}from"./react-DVKR3yZN.js";import{t as r}from"./jsx-runtime-CyI9ICYU.js";import{n as i,t as a}from"./Typography-ChsBGyM_.js";import{n as o,t as s}from"./Box-Cj6TI_Dr.js";import{n as c,t as l}from"./Icon-IHyqCtZq.js";import{t as u}from"./material-9TMraaxw.js";import{c as d}from"./AccordionSummary-Bsz-k9fb.js";function f({label:e,children:t,defaultExpanded:n=!1,expanded:r,onChange:a,disabled:s=!1,id:c}){let u=(0,m.useId)(),f=c||u,[h,g]=(0,m.useState)(n),_=r===void 0?h:r,v=(0,m.useCallback)(()=>{if(s)return;let e=!_;r===void 0&&g(e),a?.(e)},[s,_,r,a]);return(0,p.jsxs)(o,{children:[(0,p.jsxs)(o,{component:`button`,onClick:v,onKeyDown:(0,m.useCallback)(e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),v())},[v]),disabled:s,"aria-expanded":_,"aria-controls":`${f}-content`,id:`${f}-header`,sx:e=>({display:`flex`,alignItems:`center`,gap:1,background:`none`,border:`none`,padding:0,cursor:s?`default`:`pointer`,opacity:s?e.palette.action.disabledOpacity:1,color:s?`action.disabled`:`primary.main`,transition:e.transitions.create(`color`,{duration:e.transitions.duration.short}),"&:hover:not(:disabled)":{color:`primary.dark`},"&.Mui-focusVisible":{outline:`2px solid`,outlineColor:`border.focus`,outlineOffset:`2px`,borderRadius:`${e.shape.xs}px`}}),children:[(0,p.jsx)(o,{sx:e=>({display:`flex`,transition:e.transitions.create(`transform`,{duration:e.transitions.duration.short,easing:e.transitions.easing.easeInOut}),transform:_?`rotate(180deg)`:`rotate(0deg)`}),children:(0,p.jsx)(l,{icon:`chevron_down`,size:`sm`,color:`inherit`})}),(0,p.jsx)(i,{variant:`body`,component:`span`,sx:{fontWeight:700},children:e})]}),(0,p.jsx)(d,{in:_,children:(0,p.jsx)(o,{id:`${f}-content`,role:`region`,"aria-labelledby":`${f}-header`,sx:{mt:1},children:t})})]})}var p,m,h=e((()=>{p=r(),m=t(n()),u(),c(),f.__docgenInfo={description:``,methods:[],displayName:`ExpandableItem`,props:{label:{required:!0,tsType:{name:`string`},description:``},children:{required:!0,tsType:{name:`ReactReactNode`,raw:`React.ReactNode`},description:``},defaultExpanded:{required:!1,tsType:{name:`boolean`},description:`@default false`,defaultValue:{value:`false`,computed:!1}},expanded:{required:!1,tsType:{name:`boolean`},description:``},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(expanded: boolean) => void`,signature:{arguments:[{type:{name:`boolean`},name:`expanded`}],return:{name:`void`}}},description:``},disabled:{required:!1,tsType:{name:`boolean`},description:`@default false`,defaultValue:{value:`false`,computed:!1}},id:{required:!1,tsType:{name:`string`},description:``}}}})),g,_,v,y,b,x,S,C,w,T;e((()=>{g=r(),_=t(n()),h(),s(),a(),v={title:`Components / Expandable / ExpandableItem`,component:f,tags:[`autodocs`],parameters:{layout:`padded`},argTypes:{onChange:{table:{disable:!0}},disabled:{control:`boolean`},defaultExpanded:{control:`boolean`}}},y={args:{label:`Show details`,children:`This content slides in when you click the label above.`}},b={args:{label:`Already expanded`,children:`Content is visible on first render.`,defaultExpanded:!0}},x={args:{label:`Cannot expand`,children:`This item is disabled.`,disabled:!0}},S={render:()=>{let[e,t]=(0,_.useState)(!1);return(0,g.jsxs)(o,{sx:{display:`flex`,flexDirection:`column`,gap:2},children:[(0,g.jsx)(f,{label:`Controlled item`,expanded:e,onChange:t,children:`Content is controlled by parent state.`}),(0,g.jsxs)(i,{variant:`body`,children:[`State: `,e?`Expanded`:`Collapsed`]})]})}},C={name:`Multiple Items`,render:()=>(0,g.jsxs)(o,{sx:{display:`flex`,flexDirection:`column`,gap:2},children:[(0,g.jsx)(f,{label:`What is this component?`,children:`ExpandableItem is a single show/hide disclosure widget. Click the label to expand or collapse content.`}),(0,g.jsx)(f,{label:`When should I use it?`,children:`Use ExpandableItem for inline content that users can reveal on demand. Unlike Accordion, this component has no borders or visual decoration — just a bold label with a rotating chevron.`}),(0,g.jsx)(f,{label:`How is it different from Accordion?`,defaultExpanded:!0,children:`Accordion is designed for groups of collapsible sections with borders and elevated backgrounds. ExpandableItem is minimal — perfect for single disclosures in body text or subtle expansions that don't need visual weight.`})]})},w={name:`With Rich Content`,render:()=>(0,g.jsx)(f,{label:`Technical specifications`,children:(0,g.jsxs)(o,{sx:{display:`flex`,flexDirection:`column`,gap:1},children:[(0,g.jsx)(i,{variant:`body`,sx:{fontWeight:600},children:`Performance`}),(0,g.jsx)(i,{variant:`body`,children:`Renders in under 16ms on modern browsers`}),(0,g.jsx)(i,{variant:`body`,sx:{fontWeight:600,mt:1},children:`Accessibility`}),(0,g.jsx)(i,{variant:`body`,children:`WCAG 2.2 AA compliant with full keyboard navigation`}),(0,g.jsx)(i,{variant:`body`,sx:{fontWeight:600,mt:1},children:`Browser Support`}),(0,g.jsx)(i,{variant:`body`,children:`Chrome 90+, Firefox 88+, Safari 14+, Edge 90+`})]})})},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Show details',
    children: 'This content slides in when you click the label above.'
  }
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Already expanded',
    children: 'Content is visible on first render.',
    defaultExpanded: true
  }
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Cannot expand',
    children: 'This item is disabled.',
    disabled: true
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [expanded, setExpanded] = useState(false);
    return <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }}>\r
        <ExpandableItem label="Controlled item" expanded={expanded} onChange={setExpanded}>\r
          Content is controlled by parent state.\r
        </ExpandableItem>\r
        <Typography variant="body">State: {expanded ? 'Expanded' : 'Collapsed'}</Typography>\r
      </Box>;
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Multiple Items',
  render: () => <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 2
  }}>\r
      <ExpandableItem label="What is this component?">\r
        ExpandableItem is a single show/hide disclosure widget. Click the label to expand or collapse content.\r
      </ExpandableItem>\r
      <ExpandableItem label="When should I use it?">\r
        Use ExpandableItem for inline content that users can reveal on demand. Unlike Accordion, this component has no borders or visual decoration — just a bold label with a rotating chevron.\r
      </ExpandableItem>\r
      <ExpandableItem label="How is it different from Accordion?" defaultExpanded>\r
        Accordion is designed for groups of collapsible sections with borders and elevated backgrounds. ExpandableItem is minimal — perfect for single disclosures in body text or subtle expansions that don't need visual weight.\r
      </ExpandableItem>\r
    </Box>
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  name: 'With Rich Content',
  render: () => <ExpandableItem label="Technical specifications">\r
      <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 1
    }}>\r
        <Typography variant="body" sx={{
        fontWeight: 600
      }}>Performance</Typography>\r
        <Typography variant="body">Renders in under 16ms on modern browsers</Typography>\r
        <Typography variant="body" sx={{
        fontWeight: 600,
        mt: 1
      }}>Accessibility</Typography>\r
        <Typography variant="body">WCAG 2.2 AA compliant with full keyboard navigation</Typography>\r
        <Typography variant="body" sx={{
        fontWeight: 600,
        mt: 1
      }}>Browser Support</Typography>\r
        <Typography variant="body">Chrome 90+, Firefox 88+, Safari 14+, Edge 90+</Typography>\r
      </Box>\r
    </ExpandableItem>
}`,...w.parameters?.docs?.source}}},T=[`Default`,`DefaultExpanded`,`Disabled`,`Controlled`,`MultipleItems`,`WithRichContent`]}))();export{S as Controlled,y as Default,b as DefaultExpanded,x as Disabled,C as MultipleItems,w as WithRichContent,T as __namedExportsOrder,v as default};