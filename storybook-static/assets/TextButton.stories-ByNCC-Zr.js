import{n as e,o as t}from"./chunk-vNrZSFDR.js";import{t as n}from"./react-KkzZQhs-.js";import{t as r}from"./jsx-runtime-BiDZswiL.js";import{L as i}from"./DefaultPropsProvider-Cbvbar0X.js";import{n as a,r as o,t as s}from"./Box-CHS_Iwe8.js";import{n as c,t as l}from"./ButtonBase-DJj-vhe4.js";import{n as u,t as d}from"./Typography-DJ0wIq9h.js";import{n as f,t as p}from"./Icon-BLoMXT7p.js";import{n as m,t as h}from"./Spinner-DQq5y4xe.js";function g({label:e,size:t=`medium`,color:n=`primary`,disabled:r=!1,loading:o=!1,reversed:s=!1,startIcon:l,endIcon:d,iconDirection:f=`right`,onClick:m,type:g=`button`}){let v={small:`sm`,medium:`md`,large:`lg`}[t],y={small:`small`,medium:`small`,large:`medium`}[t],b={small:16,medium:16,large:24},x=f===`left`?`chevron_left`:`chevron_right`,S=l||(f===`left`&&!d?x:void 0),C=d||(f===`right`&&!l?x:void 0),w=!l&&!d,T={small:`0.875rem`,medium:`1rem`,large:`1.125rem`},E={small:1.43,medium:1.5,large:1.56},D=(e,t)=>({display:`inline-flex`,...t&&{transition:e.transitions.create([`transform`],{duration:e.transitions.duration.short})}});return(0,_.jsxs)(c,{disabled:r,disableRipple:!0,"aria-busy":o,onClick:o?void 0:m,type:g,sx:e=>({display:`inline-flex`,alignItems:`center`,gap:e.spacing(1),padding:e.spacing(.5,0),color:s?r?i(e.palette.common.white,.3):e.palette.common.white:r?e.palette.action.disabled:e.palette[n].main,fontSize:T[t],fontWeight:700,lineHeight:E[t],fontFamily:e.typography.fontFamily,textAlign:`left`,cursor:r||o?`not-allowed`:`pointer`,borderRadius:e.spacing(.5),transition:e.transitions.create([`color`],{duration:e.transitions.duration.short}),...o&&{pointerEvents:`none`},"&:hover:not(:disabled)":{color:s?i(e.palette.common.white,.88):e.palette[n].dark,...w&&!o&&{"& .text-button-icon":{transform:f===`left`?`translateX(-${e.spacing(.5)})`:`translateX(${e.spacing(.5)})`}}},"&:focus-visible":{outline:`2px solid ${s?e.palette.common.white:e.palette[n].main}`,outlineOffset:`2px`},"&:active:not(:disabled)":{color:s?i(e.palette.common.white,.8):e.palette[n].dark},"&:disabled":{pointerEvents:`auto`}}),children:[o&&f===`left`?(0,_.jsx)(a,{sx:{display:`inline-flex`,width:b[t],justifyContent:`center`},children:(0,_.jsx)(h,{size:y,color:`inherit`})}):!o&&S&&(0,_.jsx)(a,{className:`text-button-icon`,sx:e=>({...D(e,w),width:b[t],justifyContent:`center`}),children:(0,_.jsx)(p,{icon:S,size:v,color:`inherit`})}),(0,_.jsx)(u,{component:`span`,sx:{fontSize:`inherit`,fontWeight:`inherit`,lineHeight:`inherit`,color:`inherit`},children:e}),o&&f===`right`?(0,_.jsx)(a,{sx:{display:`inline-flex`,width:b[t],justifyContent:`center`},children:(0,_.jsx)(h,{size:y,color:`inherit`})}):!o&&C&&(0,_.jsx)(a,{className:`text-button-icon`,sx:e=>({...D(e,w),width:b[t],justifyContent:`center`}),children:(0,_.jsx)(p,{icon:C,size:v,color:`inherit`})})]})}var _,v=e((()=>{_=r(),l(),d(),s(),o(),f(),m(),g.__docgenInfo={description:``,methods:[],displayName:`TextButton`,props:{label:{required:!0,tsType:{name:`string`},description:``},size:{required:!1,tsType:{name:`union`,raw:`'small' | 'medium' | 'large'`,elements:[{name:`literal`,value:`'small'`},{name:`literal`,value:`'medium'`},{name:`literal`,value:`'large'`}]},description:``,defaultValue:{value:`'medium'`,computed:!1}},color:{required:!1,tsType:{name:`union`,raw:`'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'`,elements:[{name:`literal`,value:`'primary'`},{name:`literal`,value:`'secondary'`},{name:`literal`,value:`'error'`},{name:`literal`,value:`'warning'`},{name:`literal`,value:`'info'`},{name:`literal`,value:`'success'`}]},description:``,defaultValue:{value:`'primary'`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},loading:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},reversed:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},startIcon:{required:!1,tsType:{name:`string`},description:``},endIcon:{required:!1,tsType:{name:`string`},description:``},iconDirection:{required:!1,tsType:{name:`union`,raw:`'left' | 'right'`,elements:[{name:`literal`,value:`'left'`},{name:`literal`,value:`'right'`}]},description:``,defaultValue:{value:`'right'`,computed:!1}},onClick:{required:!1,tsType:{name:`ReactMouseEventHandler`,raw:`React.MouseEventHandler<HTMLButtonElement>`,elements:[{name:`HTMLButtonElement`}]},description:``},type:{required:!1,tsType:{name:`union`,raw:`'button' | 'submit' | 'reset'`,elements:[{name:`literal`,value:`'button'`},{name:`literal`,value:`'submit'`},{name:`literal`,value:`'reset'`}]},description:``,defaultValue:{value:`'button'`,computed:!1}}}}}));function y(){let[e,t]=(0,x.useState)(!1),[n,r]=(0,x.useState)(!1);return(0,b.jsxs)(a,{sx:{display:`flex`,flexDirection:`column`,gap:6,p:6,bgcolor:`background.brandPrimary`},children:[(0,b.jsxs)(a,{children:[(0,b.jsx)(a,{sx:{mb:1,fontWeight:600,color:`common.white`},children:`Default`}),(0,b.jsxs)(a,{sx:{display:`flex`,flexDirection:`column`,gap:2,alignItems:`flex-start`},children:[(0,b.jsx)(g,{label:`Learn more`,reversed:!0}),(0,b.jsx)(g,{label:`View details`,reversed:!0,startIcon:`clone`}),(0,b.jsx)(g,{label:`Open external link`,reversed:!0,endIcon:`arrow-up-right`})]})]}),(0,b.jsxs)(a,{children:[(0,b.jsx)(a,{sx:{mb:1,fontWeight:600,color:`common.white`},children:`Sizes`}),(0,b.jsxs)(a,{sx:{display:`flex`,flexDirection:`column`,gap:2,alignItems:`flex-start`},children:[(0,b.jsx)(g,{label:`Small text button`,size:`small`,reversed:!0}),(0,b.jsx)(g,{label:`Medium text button`,size:`medium`,reversed:!0}),(0,b.jsx)(g,{label:`Large text button`,size:`large`,reversed:!0})]})]}),(0,b.jsxs)(a,{children:[(0,b.jsx)(a,{sx:{mb:1,fontWeight:600,color:`common.white`},children:`Icon Direction`}),(0,b.jsxs)(a,{sx:{display:`flex`,flexDirection:`column`,gap:2,alignItems:`flex-start`},children:[(0,b.jsx)(g,{label:`Default (arrow right)`,iconDirection:`right`,reversed:!0}),(0,b.jsx)(g,{label:`Arrow on left`,iconDirection:`left`,reversed:!0})]})]}),(0,b.jsxs)(a,{children:[(0,b.jsx)(a,{sx:{mb:1,fontWeight:600,color:`common.white`},children:`Disabled`}),(0,b.jsxs)(a,{sx:{display:`flex`,flexDirection:`column`,gap:2,alignItems:`flex-start`},children:[(0,b.jsx)(g,{label:`Disabled primary`,disabled:!0,reversed:!0}),(0,b.jsx)(g,{label:`Disabled with icon`,disabled:!0,startIcon:`plus`,reversed:!0})]})]}),(0,b.jsxs)(a,{children:[(0,b.jsx)(a,{sx:{mb:1,fontWeight:600,color:`common.white`},children:`Loading — Click to toggle`}),(0,b.jsxs)(a,{sx:{display:`flex`,flexDirection:`column`,gap:2,alignItems:`flex-start`},children:[(0,b.jsx)(g,{label:`Click me (icon left)`,loading:e,reversed:!0,iconDirection:`left`,onClick:()=>t(!e)}),(0,b.jsx)(g,{label:`Click me (icon right)`,loading:n,reversed:!0,iconDirection:`right`,onClick:()=>r(!n)})]})]})]})}var b,x,S,C,w,T,E,D,O,k,A;e((()=>{b=r(),s(),v(),x=t(n()),S={title:`Components / Buttons / TextButton`,component:g,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`
**Icon Position Rule:**

- **Icon left** — User stays on the current page (add, delete, download)
- **Icon right** — User leaves the current page (external links, navigation)
        `}}},decorators:[(e,t)=>(0,b.jsx)(a,{sx:{bgcolor:`background.${t.globals.backgroundColor||`default`}`,p:3,minWidth:200},children:(0,b.jsx)(e,{})})],argTypes:{size:{control:`select`,options:[`small`,`medium`,`large`]},color:{control:`select`,options:[`primary`,`secondary`,`error`,`warning`,`info`,`success`]},iconDirection:{control:`select`,options:[`left`,`right`]},disabled:{control:`boolean`},loading:{control:`boolean`},reversed:{control:`boolean`},type:{table:{disable:!0}},onClick:{table:{disable:!0}}}},C={args:{label:`Learn more`}},w={render:()=>(0,b.jsxs)(a,{sx:{display:`flex`,flexDirection:`column`,gap:2,alignItems:`flex-start`},children:[(0,b.jsx)(g,{label:`Small text button`,size:`small`}),(0,b.jsx)(g,{label:`Medium text button`,size:`medium`}),(0,b.jsx)(g,{label:`Large text button`,size:`large`})]})},T={render:()=>(0,b.jsxs)(a,{sx:{display:`flex`,flexDirection:`column`,gap:2,alignItems:`flex-start`},children:[(0,b.jsx)(g,{label:`Default (arrow right)`,iconDirection:`right`}),(0,b.jsx)(g,{label:`Arrow on left`,iconDirection:`left`})]})},E={parameters:{docs:{description:{story:`
**Open External** — Icon right. Used for external links that leave the website.

**Download** — Icon left. Used for downloading files or documents.

**Add Item** — Icon left. Used for adding items to a list or element.

**Delete** — Icon left. Used for deleting elements.

**Open Modal** — Icon left. Used for opening modal popups or detail views.
        `}}},render:()=>(0,b.jsxs)(a,{sx:{display:`flex`,flexDirection:`column`,gap:2,alignItems:`flex-start`},children:[(0,b.jsx)(g,{label:`Open external link`,endIcon:`arrow-up-right`}),(0,b.jsx)(g,{label:`Download file`,startIcon:`arrow-down-to-line`}),(0,b.jsx)(g,{label:`Add item`,startIcon:`plus`}),(0,b.jsx)(g,{label:`Delete`,startIcon:`delete`,color:`error`}),(0,b.jsx)(g,{label:`View details`,startIcon:`clone`})]})},D={render:()=>(0,b.jsxs)(a,{sx:{display:`flex`,flexDirection:`column`,gap:2,alignItems:`flex-start`},children:[(0,b.jsx)(g,{label:`Disabled primary`,disabled:!0}),(0,b.jsx)(g,{label:`Disabled with icon`,disabled:!0,startIcon:`plus`}),(0,b.jsx)(g,{label:`Disabled error`,disabled:!0,color:`error`})]})},O={render:()=>(0,b.jsx)(()=>{let[e,t]=(0,x.useState)(!1),[n,r]=(0,x.useState)(!1);return(0,b.jsx)(a,{sx:{display:`flex`,flexDirection:`column`,gap:3},children:(0,b.jsxs)(a,{children:[(0,b.jsx)(a,{sx:{mb:1,fontWeight:600},children:`Click to toggle loading state`}),(0,b.jsxs)(a,{sx:{display:`flex`,flexDirection:`column`,gap:2,alignItems:`flex-start`},children:[(0,b.jsx)(g,{label:`Click me (icon left)`,loading:e,iconDirection:`left`,onClick:()=>t(!e)}),(0,b.jsx)(g,{label:`Click me (icon right)`,loading:n,iconDirection:`right`,onClick:()=>r(!n)})]})]})})},{})},k={name:`Reversed — On Primary Background`,parameters:{layout:`fullscreen`},render:()=>(0,b.jsx)(y,{})},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Learn more'
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    alignItems: 'flex-start'
  }}>\r
      <TextButton label="Small text button" size="small" />\r
      <TextButton label="Medium text button" size="medium" />\r
      <TextButton label="Large text button" size="large" />\r
    </Box>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    alignItems: 'flex-start'
  }}>\r
      <TextButton label="Default (arrow right)" iconDirection="right" />\r
      <TextButton label="Arrow on left" iconDirection="left" />\r
    </Box>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: \`
**Open External** — Icon right. Used for external links that leave the website.

**Download** — Icon left. Used for downloading files or documents.

**Add Item** — Icon left. Used for adding items to a list or element.

**Delete** — Icon left. Used for deleting elements.

**Open Modal** — Icon left. Used for opening modal popups or detail views.
        \`
      }
    }
  },
  render: () => <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    alignItems: 'flex-start'
  }}>\r
      <TextButton label="Open external link" endIcon="arrow-up-right" />\r
      <TextButton label="Download file" startIcon="arrow-down-to-line" />\r
      <TextButton label="Add item" startIcon="plus" />\r
      <TextButton label="Delete" startIcon="delete" color="error" />\r
      <TextButton label="View details" startIcon="clone" />\r
    </Box>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    alignItems: 'flex-start'
  }}>\r
      <TextButton label="Disabled primary" disabled />\r
      <TextButton label="Disabled with icon" disabled startIcon="plus" />\r
      <TextButton label="Disabled error" disabled color="error" />\r
    </Box>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: () => {
    const LoadingExample = () => {
      const [loadingLeft, setLoadingLeft] = useState(false);
      const [loadingRight, setLoadingRight] = useState(false);
      return <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3
      }}>\r
          <Box>\r
            <Box sx={{
            mb: 1,
            fontWeight: 600
          }}>Click to toggle loading state</Box>\r
            <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            alignItems: 'flex-start'
          }}>\r
              <TextButton label="Click me (icon left)" loading={loadingLeft} iconDirection="left" onClick={() => setLoadingLeft(!loadingLeft)} />\r
              <TextButton label="Click me (icon right)" loading={loadingRight} iconDirection="right" onClick={() => setLoadingRight(!loadingRight)} />\r
            </Box>\r
          </Box>\r
        </Box>;
    };
    return <LoadingExample />;
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  name: 'Reversed — On Primary Background',
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <ReversedShowcase />
}`,...k.parameters?.docs?.source}}},A=[`Default`,`Sizes`,`IconDirection`,`CommonIcons`,`Disabled`,`Loading`,`OnPrimaryBackground`]}))();export{E as CommonIcons,C as Default,D as Disabled,T as IconDirection,O as Loading,k as OnPrimaryBackground,w as Sizes,A as __namedExportsOrder,S as default};