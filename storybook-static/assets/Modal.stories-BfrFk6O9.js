import{n as e,s as t}from"./chunk-Bj-mKKzh.js";import{t as n}from"./react-DVKR3yZN.js";import{t as r}from"./jsx-runtime-CyI9ICYU.js";import{n as i,t as a}from"./Typography-ChsBGyM_.js";import{n as o,t as s}from"./Box-Cj6TI_Dr.js";import{n as c,t as l}from"./Button-C-Y45Snn.js";import{n as u,t as d}from"./Modal-BrQjo8uL.js";function f({size:e=`medium`,title:t=`Modal title`,disableCloseOnBackdrop:n=!1}){let[r,a]=(0,m.useState)(!1);return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(l,{label:`Open modal`,onClick:()=>a(!0)}),(0,p.jsx)(d,{open:r,onClose:()=>a(!1),title:t,size:e,disableCloseOnBackdrop:n,actions:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(l,{label:`Cancel`,variant:`ghost`,onClick:()=>a(!1)}),(0,p.jsx)(l,{label:`Confirm`,onClick:()=>a(!1)})]}),children:(0,p.jsx)(i,{variant:`body`,color:`text.muted`,children:`This is the modal body. Use this area for forms, confirmations, or detail views.`})})]})}var p,m,h,g,_,v,y,b,x;e((()=>{p=r(),m=t(n()),s(),a(),u(),c(),h={title:`Utilities / Modal`,component:d,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`Modal is the foundational overlay utility. It wraps MUI Dialog to provide focus trapping, backdrop, scroll lock, and portal rendering — with no imposed structure on the content.

For structured interactions, use the opinionated components built on this pattern:
- **[Dialog](/?path=/story/components-dialog--default)** — confirmations, alerts, and destructive-action flows with a required title, optional description, and built-in confirm/cancel actions.
- **[Drawer](/?path=/story/components-drawer--default)** — slide-in panels for navigation, filters, and forms that need persistent screen real estate.`}}},argTypes:{size:{control:`select`,options:[`small`,`medium`,`large`,`fullscreen`]}}},g={render:()=>(0,p.jsx)(f,{})},_={render:()=>(0,p.jsxs)(o,{sx:{display:`flex`,gap:1.5},children:[(0,p.jsx)(f,{size:`small`,title:`Small modal`}),(0,p.jsx)(f,{size:`medium`,title:`Medium modal`}),(0,p.jsx)(f,{size:`large`,title:`Large modal`})]})},v={render:()=>{let[e,t]=(0,m.useState)(!1);return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(l,{label:`Open (no title)`,onClick:()=>t(!0)}),(0,p.jsx)(d,{open:e,onClose:()=>t(!1),actions:(0,p.jsx)(l,{label:`Close`,variant:`ghost`,onClick:()=>t(!1)}),children:(0,p.jsx)(i,{variant:`body`,children:`A modal without a title bar.`})})]})}},y={render:()=>(0,p.jsx)(f,{title:`Can't close by clicking backdrop`,disableCloseOnBackdrop:!0})},b={render:()=>{let[e,t]=(0,m.useState)(!1);return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(l,{label:`Open scrollable modal`,onClick:()=>t(!0)}),(0,p.jsx)(d,{open:e,onClose:()=>t(!1),title:`Long content`,actions:(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(l,{label:`Cancel`,variant:`ghost`,onClick:()=>t(!1)}),(0,p.jsx)(l,{label:`Confirm`,onClick:()=>t(!1)})]}),children:Array.from({length:20},(e,t)=>(0,p.jsxs)(i,{variant:`body`,color:`text.muted`,sx:{mb:2,display:`block`},children:[`Paragraph `,t+1,`: The modal body scrolls independently when content overflows. The title and actions stay fixed.`]},t))})]})}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <ModalDemo />
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    display: 'flex',
    gap: 1.5
  }}>\r
      <ModalDemo size="small" title="Small modal" />\r
      <ModalDemo size="medium" title="Medium modal" />\r
      <ModalDemo size="large" title="Large modal" />\r
    </Box>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>\r
        <Button label="Open (no title)" onClick={() => setOpen(true)} />\r
        <Modal open={open} onClose={() => setOpen(false)} actions={<Button label="Close" variant="ghost" onClick={() => setOpen(false)} />}>\r
          <Typography variant="body">A modal without a title bar.</Typography>\r
        </Modal>\r
      </>;
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <ModalDemo title="Can't close by clicking backdrop" disableCloseOnBackdrop />
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <>\r
        <Button label="Open scrollable modal" onClick={() => setOpen(true)} />\r
        <Modal open={open} onClose={() => setOpen(false)} title="Long content" actions={<>\r
              <Button label="Cancel" variant="ghost" onClick={() => setOpen(false)} />\r
              <Button label="Confirm" onClick={() => setOpen(false)} />\r
            </>}>\r
          {Array.from({
          length: 20
        }, (_, i) => <Typography key={i} variant="body" color="text.muted" sx={{
          mb: 2,
          display: 'block'
        }}>\r
              Paragraph {i + 1}: The modal body scrolls independently when content overflows. The title and actions stay fixed.\r
            </Typography>)}\r
        </Modal>\r
      </>;
  }
}`,...b.parameters?.docs?.source}}},x=[`Default`,`Sizes`,`NoTitle`,`DisableBackdropClose`,`ScrollableContent`]}))();export{g as Default,y as DisableBackdropClose,v as NoTitle,b as ScrollableContent,_ as Sizes,x as __namedExportsOrder,h as default};