import{n as e,s as t}from"./chunk-Bj-mKKzh.js";import{t as n}from"./react-DVKR3yZN.js";import{t as r}from"./jsx-runtime-CyI9ICYU.js";import{n as i,t as a}from"./Typography-ChsBGyM_.js";import{n as o,t as s}from"./Box-Cj6TI_Dr.js";import{n as c,t as l}from"./Button-C-Y45Snn.js";import{n as u,t as d}from"./Drawer-CU-jRs8l.js";function f({anchor:e=`right`,title:t=`Drawer title`,width:n,triggerLabel:r=`Open drawer`,withActions:a=!0}){let[s,c]=(0,m.useState)(!1);return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(l,{label:r,onClick:()=>c(!0)}),(0,p.jsx)(d,{open:s,onClose:()=>c(!1),anchor:e,title:t,width:n,actions:a?(0,p.jsxs)(o,{sx:{display:`flex`,justifyContent:`flex-end`,gap:1},children:[(0,p.jsx)(l,{label:`Cancel`,variant:`ghost`,size:`small`,onClick:()=>c(!1)}),(0,p.jsx)(l,{label:`Apply`,size:`small`,onClick:()=>c(!1)})]}):void 0,children:(0,p.jsx)(i,{variant:`body`,color:`text.muted`,children:`This is the drawer body. Use this area for filters, forms, navigation, or supplementary content.`})})]})}var p,m,h,g,_,v,y,b,x,S;e((()=>{p=r(),m=t(n()),s(),a(),u(),c(),h={title:`Components / Drawer`,component:d,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`A slide-in panel anchored to any edge of the screen. Use for secondary content, navigation, filters, or forms that do not require a full page.`}}},argTypes:{anchor:{control:`select`,options:[`left`,`right`,`top`,`bottom`]},width:{control:`number`},onClose:{table:{disable:!0}},children:{table:{disable:!0}},actions:{table:{disable:!0}}}},g={render:()=>(0,p.jsx)(f,{})},_={render:()=>(0,p.jsx)(o,{sx:{display:`flex`,gap:2},children:[`left`,`right`,`top`,`bottom`].map(e=>(0,p.jsx)(f,{anchor:e,title:`${e.charAt(0).toUpperCase()+e.slice(1)} drawer`,triggerLabel:e.charAt(0).toUpperCase()+e.slice(1)},e))})},v={render:()=>{let[e,t]=(0,m.useState)(!1);return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(l,{label:`Open (no title)`,onClick:()=>t(!0)}),(0,p.jsx)(d,{open:e,onClose:()=>t(!1),children:(0,p.jsx)(i,{variant:`body`,color:`text.muted`,children:`A drawer without a header. Useful when the trigger context makes the purpose clear.`})})]})}},y={render:()=>(0,p.jsx)(f,{withActions:!0,triggerLabel:`Open with actions`})},b={render:()=>(0,p.jsx)(f,{width:560,title:`Wide drawer`,triggerLabel:`Open wide (560px)`})},x={render:()=>(0,p.jsx)(f,{anchor:`left`,title:`Navigation`,triggerLabel:`Open nav drawer`,withActions:!1})},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <DrawerDemo />
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => {
    const anchors: DrawerAnchor[] = ['left', 'right', 'top', 'bottom'];
    return <Box sx={{
      display: 'flex',
      gap: 2
    }}>\r
        {anchors.map(anchor => <DrawerDemo key={anchor} anchor={anchor} title={\`\${anchor.charAt(0).toUpperCase() + anchor.slice(1)} drawer\`} triggerLabel={anchor.charAt(0).toUpperCase() + anchor.slice(1)} />)}\r
      </Box>;
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>\r
        <Button label="Open (no title)" onClick={() => setOpen(true)} />\r
        <Drawer open={open} onClose={() => setOpen(false)}>\r
          <Typography variant="body" color="text.muted">\r
            A drawer without a header. Useful when the trigger context makes the purpose clear.\r
          </Typography>\r
        </Drawer>\r
      </>;
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <DrawerDemo withActions triggerLabel="Open with actions" />
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <DrawerDemo width={560} title="Wide drawer" triggerLabel="Open wide (560px)" />
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <DrawerDemo anchor="left" title="Navigation" triggerLabel="Open nav drawer" withActions={false} />
}`,...x.parameters?.docs?.source}}},S=[`Default`,`Anchors`,`NoTitle`,`WithActions`,`Wide`,`LeftAnchor`]}))();export{_ as Anchors,g as Default,x as LeftAnchor,v as NoTitle,b as Wide,y as WithActions,S as __namedExportsOrder,h as default};