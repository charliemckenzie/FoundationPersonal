import{n as e}from"./chunk-vNrZSFDR.js";import{t}from"./jsx-runtime-BiDZswiL.js";import{L as n}from"./DefaultPropsProvider-Cbvbar0X.js";import{n as r,r as i,t as a}from"./Box-CHS_Iwe8.js";import{n as o,t as s}from"./IconButton-D4ai3VUi.js";import{n as c,t as l}from"./Icon-BLoMXT7p.js";import{n as u,t as d}from"./Spinner-DQq5y4xe.js";import{n as f,t as p}from"./Tooltip-B3K9dANB.js";function m({icon:e,iconStyle:t=`solid`,label:r,variant:i=`contained`,size:a=`medium`,color:s=`primary`,disabled:c=!1,loading:u=!1,reversed:f=!1,showTooltip:m=!0,onClick:y,type:b=`button`}){let x=s===`default`?`primary`:s,S=i===`contained`?{backgroundColor:e=>e.palette[x].main,color:e=>e.palette[x].contrastText,boxShadow:`none`,"&:hover":{backgroundColor:e=>e.palette[x].dark,boxShadow:`none`},"&:active":{backgroundColor:e=>e.palette[x].dark,boxShadow:`none`},"&.Mui-disabled":{backgroundColor:e=>e.palette.action.disabledBackground,color:e=>e.palette.action.disabled}}:void 0,C=i===`outlined`?{backgroundColor:`transparent`,border:`1px solid`,borderColor:e=>e.palette.mode===`light`?n(e.palette[x].main,.5):e.palette[x].main,color:e=>e.palette[x].main,boxShadow:`none`,"&:hover":{backgroundColor:e=>n(e.palette[x].main,.04),borderColor:e=>e.palette[x].main},"&:active":{backgroundColor:e=>n(e.palette[x].main,.08)},"&.Mui-disabled":{backgroundColor:`transparent`,borderColor:e=>e.palette.action.disabledBackground,color:e=>e.palette.action.disabled}}:void 0,w=i===`soft`?{backgroundColor:e=>e.palette.mode===`dark`?n(e.palette[x].main,.15):n(e.palette[x].main,.08),color:e=>(e.palette.mode,e.palette[x].main),boxShadow:`none`,"&:hover":{backgroundColor:e=>e.palette.mode===`dark`?n(e.palette[x].main,.25):n(e.palette[x].main,.15)},"&:active":{backgroundColor:e=>e.palette.mode===`dark`?n(e.palette[x].main,.3):n(e.palette[x].main,.2)},"&.Mui-disabled":{backgroundColor:e=>e.palette.action.disabledBackground,color:e=>e.palette.action.disabled}}:void 0,T=i===`ghost`?{backgroundColor:`transparent`,color:e=>e.palette[x].main,boxShadow:`none`,"&:hover":{backgroundColor:e=>n(e.palette[x].main,.08)},"&:active":{backgroundColor:e=>n(e.palette[x].main,.12)},"&.Mui-disabled":{backgroundColor:`transparent`,color:e=>e.palette.action.disabled}}:void 0,E=f?{...i===`contained`&&{backgroundColor:e=>e.palette.common.white,color:e=>e.palette.mode===`dark`?e.palette[x].dark:e.palette[x].main,boxShadow:`none`,"&:hover":{backgroundColor:e=>n(e.palette.common.white,.88),boxShadow:`none`},"&:active":{backgroundColor:e=>n(e.palette.common.white,.8),boxShadow:`none`},"&.Mui-disabled":{backgroundColor:e=>n(e.palette.common.white,.3),color:e=>n(e.palette.common.white,.5)}},...i===`outlined`&&{backgroundColor:`transparent`,borderColor:e=>n(e.palette.common.white,.5),color:e=>e.palette.common.white,"&:hover":{backgroundColor:e=>n(e.palette.common.white,.12),borderColor:e=>e.palette.common.white},"&.Mui-disabled":{borderColor:e=>n(e.palette.common.white,.3),color:e=>n(e.palette.common.white,.3)}},...i===`ghost`&&{backgroundColor:`transparent`,color:e=>e.palette.common.white,"&:hover":{backgroundColor:e=>n(e.palette.common.white,.12)},"&.Mui-disabled":{color:e=>n(e.palette.common.white,.3)}},...i===`soft`&&{backgroundColor:e=>n(e.palette.common.white,.15),color:e=>e.palette.common.white,"&:hover":{backgroundColor:e=>n(e.palette.common.white,.25)},"&:active":{backgroundColor:e=>n(e.palette.common.white,.3)},"&.Mui-disabled":{backgroundColor:e=>n(e.palette.common.white,.1),color:e=>n(e.palette.common.white,.3)}}}:void 0,D=(0,h.jsx)(o,{"aria-label":r,"aria-busy":u,size:a,color:s===`default`?`default`:void 0,disabled:c,disableRipple:!0,onClick:u?void 0:y,type:b,sx:e=>({..._[a],...S??C??w??T,...E,...u&&{cursor:`not-allowed !important`,pointerEvents:`none !important`},"&.Mui-disabled, &:disabled":{cursor:`not-allowed !important`,pointerEvents:`none !important`},"&.Mui-focusVisible":{outline:`2px solid ${f?e.palette.common.white:e.palette[s]?.main??e.palette.primary.main}`,outlineOffset:`2px`,boxShadow:`none`}}),children:u?(0,h.jsx)(d,{size:v[a],color:`inherit`}):(0,h.jsx)(l,{icon:e,style:t,size:g[a],color:`inherit`})});return m?(0,h.jsx)(p,{title:r,placement:`top`,arrow:!0,children:D}):D}var h,g,_,v,y=e((()=>{h=t(),s(),i(),c(),f(),u(),g={small:`sm`,medium:`md`,large:`lg`},_={small:{width:36,height:36},medium:{width:48,height:48},large:{width:56,height:56}},v={small:`small`,medium:`small`,large:`medium`},m.__docgenInfo={description:``,methods:[],displayName:`IconButton`,props:{icon:{required:!0,tsType:{name:`string`},description:``},iconStyle:{required:!1,tsType:{name:`union`,raw:`'solid' | 'regular' | 'light' | 'thin' | 'duotone' | 'sharp'`,elements:[{name:`literal`,value:`'solid'`},{name:`literal`,value:`'regular'`},{name:`literal`,value:`'light'`},{name:`literal`,value:`'thin'`},{name:`literal`,value:`'duotone'`},{name:`literal`,value:`'sharp'`}]},description:``,defaultValue:{value:`'solid'`,computed:!1}},label:{required:!0,tsType:{name:`string`},description:``},variant:{required:!1,tsType:{name:`union`,raw:`'contained' | 'outlined' | 'ghost' | 'soft'`,elements:[{name:`literal`,value:`'contained'`},{name:`literal`,value:`'outlined'`},{name:`literal`,value:`'ghost'`},{name:`literal`,value:`'soft'`}]},description:``,defaultValue:{value:`'contained'`,computed:!1}},size:{required:!1,tsType:{name:`union`,raw:`'small' | 'medium' | 'large'`,elements:[{name:`literal`,value:`'small'`},{name:`literal`,value:`'medium'`},{name:`literal`,value:`'large'`}]},description:``,defaultValue:{value:`'medium'`,computed:!1}},color:{required:!1,tsType:{name:`union`,raw:`'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success' | 'default'`,elements:[{name:`literal`,value:`'primary'`},{name:`literal`,value:`'secondary'`},{name:`literal`,value:`'error'`},{name:`literal`,value:`'warning'`},{name:`literal`,value:`'info'`},{name:`literal`,value:`'success'`},{name:`literal`,value:`'default'`}]},description:``,defaultValue:{value:`'primary'`,computed:!1}},disabled:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},loading:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},reversed:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},showTooltip:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}},onClick:{required:!1,tsType:{name:`ReactMouseEventHandler`,raw:`React.MouseEventHandler<HTMLButtonElement>`,elements:[{name:`HTMLButtonElement`}]},description:``},type:{required:!1,tsType:{name:`union`,raw:`'button' | 'submit' | 'reset'`,elements:[{name:`literal`,value:`'button'`},{name:`literal`,value:`'submit'`},{name:`literal`,value:`'reset'`}]},description:``,defaultValue:{value:`'button'`,computed:!1}}}}}));function b(){return(0,x.jsxs)(r,{sx:{display:`flex`,flexDirection:`column`,gap:6,p:6,bgcolor:`background.brandPrimary`},children:[(0,x.jsxs)(r,{children:[(0,x.jsx)(r,{sx:{mb:1,fontWeight:600,color:`common.white`},children:`Variants`}),(0,x.jsxs)(r,{sx:{display:`flex`,gap:2,alignItems:`center`,flexWrap:`wrap`},children:[(0,x.jsx)(m,{icon:`pen`,label:`Contained`,variant:`contained`,reversed:!0}),(0,x.jsx)(m,{icon:`magnifying-glass`,label:`Soft`,variant:`soft`,reversed:!0}),(0,x.jsx)(m,{icon:`circle-info`,label:`Outlined`,variant:`outlined`,reversed:!0}),(0,x.jsx)(m,{icon:`trash`,label:`Ghost`,variant:`ghost`,reversed:!0})]})]}),(0,x.jsxs)(r,{children:[(0,x.jsx)(r,{sx:{mb:1,fontWeight:600,color:`common.white`},children:`Sizes`}),(0,x.jsxs)(r,{sx:{display:`flex`,gap:2,alignItems:`center`,flexWrap:`wrap`},children:[(0,x.jsx)(m,{icon:`pen`,label:`Small`,variant:`contained`,size:`small`,reversed:!0}),(0,x.jsx)(m,{icon:`pen`,label:`Medium`,variant:`contained`,size:`medium`,reversed:!0}),(0,x.jsx)(m,{icon:`pen`,label:`Large`,variant:`contained`,size:`large`,reversed:!0})]})]}),(0,x.jsxs)(r,{children:[(0,x.jsx)(r,{sx:{mb:1,fontWeight:600,color:`common.white`},children:`Disabled`}),(0,x.jsxs)(r,{sx:{display:`flex`,gap:2,alignItems:`center`,flexWrap:`wrap`},children:[(0,x.jsx)(m,{icon:`pen`,label:`Contained`,variant:`contained`,reversed:!0,disabled:!0}),(0,x.jsx)(m,{icon:`magnifying-glass`,label:`Soft`,variant:`soft`,reversed:!0,disabled:!0}),(0,x.jsx)(m,{icon:`circle-info`,label:`Outlined`,variant:`outlined`,reversed:!0,disabled:!0}),(0,x.jsx)(m,{icon:`trash`,label:`Ghost`,variant:`ghost`,reversed:!0,disabled:!0})]})]}),(0,x.jsxs)(r,{children:[(0,x.jsx)(r,{sx:{mb:1,fontWeight:600,color:`common.white`},children:`Loading`}),(0,x.jsxs)(r,{sx:{display:`flex`,gap:2,alignItems:`center`,flexWrap:`wrap`},children:[(0,x.jsx)(m,{icon:`pen`,label:`Contained`,variant:`contained`,reversed:!0,loading:!0}),(0,x.jsx)(m,{icon:`magnifying-glass`,label:`Soft`,variant:`soft`,reversed:!0,loading:!0}),(0,x.jsx)(m,{icon:`circle-info`,label:`Outlined`,variant:`outlined`,reversed:!0,loading:!0}),(0,x.jsx)(m,{icon:`trash`,label:`Ghost`,variant:`ghost`,reversed:!0,loading:!0})]})]})]})}var x,S,C,w,T,E,D,O,k,A,j;e((()=>{x=t(),a(),y(),S={title:`Components / Buttons / IconButton`,component:m,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{variant:{control:`select`,options:[`contained`,`outlined`,`ghost`,`soft`]},size:{control:`select`,options:[`small`,`medium`,`large`]},color:{control:`select`,options:[`default`,`primary`,`secondary`,`error`,`warning`,`info`,`success`]},iconStyle:{control:`select`,options:[`solid`,`regular`,`light`,`thin`,`duotone`,`sharp`]},showTooltip:{control:`boolean`},loading:{control:`boolean`},reversed:{control:`boolean`},onClick:{table:{disable:!0}},type:{table:{disable:!0}}}},C={args:{icon:`pen`,label:`Edit`}},w={render:()=>(0,x.jsxs)(`div`,{style:{display:`flex`,gap:16,alignItems:`center`},children:[(0,x.jsx)(m,{icon:`pen`,label:`Edit (contained)`,variant:`contained`,color:`primary`}),(0,x.jsx)(m,{icon:`pen`,label:`Edit (outlined)`,variant:`outlined`,color:`primary`}),(0,x.jsx)(m,{icon:`pen`,label:`Edit (ghost)`,variant:`ghost`,color:`primary`}),(0,x.jsx)(m,{icon:`pen`,label:`Edit (soft)`,variant:`soft`,color:`primary`})]})},T={render:()=>(0,x.jsxs)(`div`,{style:{display:`flex`,gap:16,alignItems:`center`},children:[(0,x.jsx)(m,{icon:`pen`,label:`Edit small`,size:`small`,color:`primary`}),(0,x.jsx)(m,{icon:`pen`,label:`Edit medium`,size:`medium`,color:`primary`}),(0,x.jsx)(m,{icon:`pen`,label:`Edit large`,size:`large`,color:`primary`})]})},E={render:()=>(0,x.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24},children:[(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`div`,{style:{marginBottom:8,fontWeight:600},children:`Contained`}),(0,x.jsxs)(`div`,{style:{display:`flex`,gap:16,alignItems:`center`},children:[(0,x.jsx)(m,{icon:`pen`,label:`Primary`,variant:`contained`,color:`primary`}),(0,x.jsx)(m,{icon:`magnifying-glass`,label:`Secondary`,variant:`contained`,color:`secondary`}),(0,x.jsx)(m,{icon:`circle-info`,label:`Info`,variant:`contained`,color:`info`}),(0,x.jsx)(m,{icon:`triangle-exclamation`,label:`Warning`,variant:`contained`,color:`warning`}),(0,x.jsx)(m,{icon:`trash`,label:`Error`,variant:`contained`,color:`error`}),(0,x.jsx)(m,{icon:`check`,label:`Success`,variant:`contained`,color:`success`})]})]}),(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`div`,{style:{marginBottom:8,fontWeight:600},children:`Soft`}),(0,x.jsxs)(`div`,{style:{display:`flex`,gap:16,alignItems:`center`},children:[(0,x.jsx)(m,{icon:`pen`,label:`Primary`,variant:`soft`,color:`primary`}),(0,x.jsx)(m,{icon:`magnifying-glass`,label:`Secondary`,variant:`soft`,color:`secondary`}),(0,x.jsx)(m,{icon:`circle-info`,label:`Info`,variant:`soft`,color:`info`}),(0,x.jsx)(m,{icon:`triangle-exclamation`,label:`Warning`,variant:`soft`,color:`warning`}),(0,x.jsx)(m,{icon:`trash`,label:`Error`,variant:`soft`,color:`error`}),(0,x.jsx)(m,{icon:`check`,label:`Success`,variant:`soft`,color:`success`})]})]}),(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`div`,{style:{marginBottom:8,fontWeight:600},children:`Ghost`}),(0,x.jsxs)(`div`,{style:{display:`flex`,gap:16,alignItems:`center`},children:[(0,x.jsx)(m,{icon:`pen`,label:`Primary`,variant:`ghost`,color:`primary`}),(0,x.jsx)(m,{icon:`magnifying-glass`,label:`Secondary`,variant:`ghost`,color:`secondary`}),(0,x.jsx)(m,{icon:`circle-info`,label:`Info`,variant:`ghost`,color:`info`}),(0,x.jsx)(m,{icon:`triangle-exclamation`,label:`Warning`,variant:`ghost`,color:`warning`}),(0,x.jsx)(m,{icon:`trash`,label:`Error`,variant:`ghost`,color:`error`}),(0,x.jsx)(m,{icon:`check`,label:`Success`,variant:`ghost`,color:`success`})]})]}),(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`div`,{style:{marginBottom:8,fontWeight:600},children:`Outlined`}),(0,x.jsxs)(`div`,{style:{display:`flex`,gap:16,alignItems:`center`},children:[(0,x.jsx)(m,{icon:`pen`,label:`Primary`,variant:`outlined`,color:`primary`}),(0,x.jsx)(m,{icon:`magnifying-glass`,label:`Secondary`,variant:`outlined`,color:`secondary`}),(0,x.jsx)(m,{icon:`circle-info`,label:`Info`,variant:`outlined`,color:`info`}),(0,x.jsx)(m,{icon:`triangle-exclamation`,label:`Warning`,variant:`outlined`,color:`warning`}),(0,x.jsx)(m,{icon:`trash`,label:`Error`,variant:`outlined`,color:`error`}),(0,x.jsx)(m,{icon:`check`,label:`Success`,variant:`outlined`,color:`success`})]})]})]})},D={render:()=>(0,x.jsxs)(`div`,{style:{display:`flex`,gap:16,alignItems:`center`},children:[(0,x.jsx)(m,{icon:`info`,label:`Information`,variant:`soft`,color:`primary`}),(0,x.jsx)(m,{icon:`chevron-left`,label:`Previous`,variant:`soft`,color:`primary`}),(0,x.jsx)(m,{icon:`chevron-right`,label:`Next`,variant:`soft`,color:`primary`}),(0,x.jsx)(m,{icon:`pen`,label:`Edit`,variant:`soft`,color:`primary`}),(0,x.jsx)(m,{icon:`trash`,label:`Delete`,variant:`soft`,color:`primary`})]})},O={args:{icon:`pen`,label:`Edit (disabled)`,disabled:!0,color:`primary`}},k={render:()=>(0,x.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24},children:[(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`div`,{style:{marginBottom:8,fontWeight:600},children:`Contained`}),(0,x.jsxs)(`div`,{style:{display:`flex`,gap:16,alignItems:`center`},children:[(0,x.jsx)(m,{icon:`pen`,label:`Primary`,variant:`contained`,color:`primary`,loading:!0}),(0,x.jsx)(m,{icon:`magnifying-glass`,label:`Secondary`,variant:`contained`,color:`secondary`,loading:!0}),(0,x.jsx)(m,{icon:`circle-info`,label:`Info`,variant:`contained`,color:`info`,loading:!0}),(0,x.jsx)(m,{icon:`triangle-exclamation`,label:`Warning`,variant:`contained`,color:`warning`,loading:!0}),(0,x.jsx)(m,{icon:`trash`,label:`Error`,variant:`contained`,color:`error`,loading:!0}),(0,x.jsx)(m,{icon:`check`,label:`Success`,variant:`contained`,color:`success`,loading:!0})]})]}),(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`div`,{style:{marginBottom:8,fontWeight:600},children:`Soft`}),(0,x.jsxs)(`div`,{style:{display:`flex`,gap:16,alignItems:`center`},children:[(0,x.jsx)(m,{icon:`pen`,label:`Primary`,variant:`soft`,color:`primary`,loading:!0}),(0,x.jsx)(m,{icon:`magnifying-glass`,label:`Secondary`,variant:`soft`,color:`secondary`,loading:!0}),(0,x.jsx)(m,{icon:`circle-info`,label:`Info`,variant:`soft`,color:`info`,loading:!0}),(0,x.jsx)(m,{icon:`triangle-exclamation`,label:`Warning`,variant:`soft`,color:`warning`,loading:!0}),(0,x.jsx)(m,{icon:`trash`,label:`Error`,variant:`soft`,color:`error`,loading:!0}),(0,x.jsx)(m,{icon:`check`,label:`Success`,variant:`soft`,color:`success`,loading:!0})]})]}),(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`div`,{style:{marginBottom:8,fontWeight:600},children:`Ghost`}),(0,x.jsxs)(`div`,{style:{display:`flex`,gap:16,alignItems:`center`},children:[(0,x.jsx)(m,{icon:`pen`,label:`Primary`,variant:`ghost`,color:`primary`,loading:!0}),(0,x.jsx)(m,{icon:`magnifying-glass`,label:`Secondary`,variant:`ghost`,color:`secondary`,loading:!0}),(0,x.jsx)(m,{icon:`circle-info`,label:`Info`,variant:`ghost`,color:`info`,loading:!0}),(0,x.jsx)(m,{icon:`triangle-exclamation`,label:`Warning`,variant:`ghost`,color:`warning`,loading:!0}),(0,x.jsx)(m,{icon:`trash`,label:`Error`,variant:`ghost`,color:`error`,loading:!0}),(0,x.jsx)(m,{icon:`check`,label:`Success`,variant:`ghost`,color:`success`,loading:!0})]})]}),(0,x.jsxs)(`div`,{children:[(0,x.jsx)(`div`,{style:{marginBottom:8,fontWeight:600},children:`Outlined`}),(0,x.jsxs)(`div`,{style:{display:`flex`,gap:16,alignItems:`center`},children:[(0,x.jsx)(m,{icon:`pen`,label:`Primary`,variant:`outlined`,color:`primary`,loading:!0}),(0,x.jsx)(m,{icon:`magnifying-glass`,label:`Secondary`,variant:`outlined`,color:`secondary`,loading:!0}),(0,x.jsx)(m,{icon:`circle-info`,label:`Info`,variant:`outlined`,color:`info`,loading:!0}),(0,x.jsx)(m,{icon:`triangle-exclamation`,label:`Warning`,variant:`outlined`,color:`warning`,loading:!0}),(0,x.jsx)(m,{icon:`trash`,label:`Error`,variant:`outlined`,color:`error`,loading:!0}),(0,x.jsx)(m,{icon:`check`,label:`Success`,variant:`outlined`,color:`success`,loading:!0})]})]})]})},A={name:`Reversed — On Primary Background`,parameters:{layout:`fullscreen`},render:()=>(0,x.jsx)(b,{})},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    icon: 'pen',
    label: 'Edit'
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 16,
    alignItems: 'center'
  }}>\r
      <IconButton icon="pen" label="Edit (contained)" variant="contained" color="primary" />\r
      <IconButton icon="pen" label="Edit (outlined)" variant="outlined" color="primary" />\r
      <IconButton icon="pen" label="Edit (ghost)" variant="ghost" color="primary" />\r
      <IconButton icon="pen" label="Edit (soft)" variant="soft" color="primary" />\r
    </div>
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 16,
    alignItems: 'center'
  }}>\r
      <IconButton icon="pen" label="Edit small" size="small" color="primary" />\r
      <IconButton icon="pen" label="Edit medium" size="medium" color="primary" />\r
      <IconButton icon="pen" label="Edit large" size="large" color="primary" />\r
    </div>
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 24
  }}>\r
      <div>\r
        <div style={{
        marginBottom: 8,
        fontWeight: 600
      }}>Contained</div>\r
        <div style={{
        display: 'flex',
        gap: 16,
        alignItems: 'center'
      }}>\r
          <IconButton icon="pen" label="Primary" variant="contained" color="primary" />\r
          <IconButton icon="magnifying-glass" label="Secondary" variant="contained" color="secondary" />\r
          <IconButton icon="circle-info" label="Info" variant="contained" color="info" />\r
          <IconButton icon="triangle-exclamation" label="Warning" variant="contained" color="warning" />\r
          <IconButton icon="trash" label="Error" variant="contained" color="error" />\r
          <IconButton icon="check" label="Success" variant="contained" color="success" />\r
        </div>\r
      </div>\r
      <div>\r
        <div style={{
        marginBottom: 8,
        fontWeight: 600
      }}>Soft</div>\r
        <div style={{
        display: 'flex',
        gap: 16,
        alignItems: 'center'
      }}>\r
          <IconButton icon="pen" label="Primary" variant="soft" color="primary" />\r
          <IconButton icon="magnifying-glass" label="Secondary" variant="soft" color="secondary" />\r
          <IconButton icon="circle-info" label="Info" variant="soft" color="info" />\r
          <IconButton icon="triangle-exclamation" label="Warning" variant="soft" color="warning" />\r
          <IconButton icon="trash" label="Error" variant="soft" color="error" />\r
          <IconButton icon="check" label="Success" variant="soft" color="success" />\r
        </div>\r
      </div>\r
      <div>\r
        <div style={{
        marginBottom: 8,
        fontWeight: 600
      }}>Ghost</div>\r
        <div style={{
        display: 'flex',
        gap: 16,
        alignItems: 'center'
      }}>\r
          <IconButton icon="pen" label="Primary" variant="ghost" color="primary" />\r
          <IconButton icon="magnifying-glass" label="Secondary" variant="ghost" color="secondary" />\r
          <IconButton icon="circle-info" label="Info" variant="ghost" color="info" />\r
          <IconButton icon="triangle-exclamation" label="Warning" variant="ghost" color="warning" />\r
          <IconButton icon="trash" label="Error" variant="ghost" color="error" />\r
          <IconButton icon="check" label="Success" variant="ghost" color="success" />\r
        </div>\r
      </div>\r
      <div>\r
        <div style={{
        marginBottom: 8,
        fontWeight: 600
      }}>Outlined</div>\r
        <div style={{
        display: 'flex',
        gap: 16,
        alignItems: 'center'
      }}>\r
          <IconButton icon="pen" label="Primary" variant="outlined" color="primary" />\r
          <IconButton icon="magnifying-glass" label="Secondary" variant="outlined" color="secondary" />\r
          <IconButton icon="circle-info" label="Info" variant="outlined" color="info" />\r
          <IconButton icon="triangle-exclamation" label="Warning" variant="outlined" color="warning" />\r
          <IconButton icon="trash" label="Error" variant="outlined" color="error" />\r
          <IconButton icon="check" label="Success" variant="outlined" color="success" />\r
        </div>\r
      </div>\r
    </div>
}`,...E.parameters?.docs?.source}}},D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 16,
    alignItems: 'center'
  }}>\r
      <IconButton icon="info" label="Information" variant="soft" color="primary" />\r
      <IconButton icon="chevron-left" label="Previous" variant="soft" color="primary" />\r
      <IconButton icon="chevron-right" label="Next" variant="soft" color="primary" />\r
      <IconButton icon="pen" label="Edit" variant="soft" color="primary" />\r
      <IconButton icon="trash" label="Delete" variant="soft" color="primary" />\r
    </div>
}`,...D.parameters?.docs?.source}}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  args: {
    icon: 'pen',
    label: 'Edit (disabled)',
    disabled: true,
    color: 'primary'
  }
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 24
  }}>\r
      <div>\r
        <div style={{
        marginBottom: 8,
        fontWeight: 600
      }}>Contained</div>\r
        <div style={{
        display: 'flex',
        gap: 16,
        alignItems: 'center'
      }}>\r
          <IconButton icon="pen" label="Primary" variant="contained" color="primary" loading />\r
          <IconButton icon="magnifying-glass" label="Secondary" variant="contained" color="secondary" loading />\r
          <IconButton icon="circle-info" label="Info" variant="contained" color="info" loading />\r
          <IconButton icon="triangle-exclamation" label="Warning" variant="contained" color="warning" loading />\r
          <IconButton icon="trash" label="Error" variant="contained" color="error" loading />\r
          <IconButton icon="check" label="Success" variant="contained" color="success" loading />\r
        </div>\r
      </div>\r
      <div>\r
        <div style={{
        marginBottom: 8,
        fontWeight: 600
      }}>Soft</div>\r
        <div style={{
        display: 'flex',
        gap: 16,
        alignItems: 'center'
      }}>\r
          <IconButton icon="pen" label="Primary" variant="soft" color="primary" loading />\r
          <IconButton icon="magnifying-glass" label="Secondary" variant="soft" color="secondary" loading />\r
          <IconButton icon="circle-info" label="Info" variant="soft" color="info" loading />\r
          <IconButton icon="triangle-exclamation" label="Warning" variant="soft" color="warning" loading />\r
          <IconButton icon="trash" label="Error" variant="soft" color="error" loading />\r
          <IconButton icon="check" label="Success" variant="soft" color="success" loading />\r
        </div>\r
      </div>\r
      <div>\r
        <div style={{
        marginBottom: 8,
        fontWeight: 600
      }}>Ghost</div>\r
        <div style={{
        display: 'flex',
        gap: 16,
        alignItems: 'center'
      }}>\r
          <IconButton icon="pen" label="Primary" variant="ghost" color="primary" loading />\r
          <IconButton icon="magnifying-glass" label="Secondary" variant="ghost" color="secondary" loading />\r
          <IconButton icon="circle-info" label="Info" variant="ghost" color="info" loading />\r
          <IconButton icon="triangle-exclamation" label="Warning" variant="ghost" color="warning" loading />\r
          <IconButton icon="trash" label="Error" variant="ghost" color="error" loading />\r
          <IconButton icon="check" label="Success" variant="ghost" color="success" loading />\r
        </div>\r
      </div>\r
      <div>\r
        <div style={{
        marginBottom: 8,
        fontWeight: 600
      }}>Outlined</div>\r
        <div style={{
        display: 'flex',
        gap: 16,
        alignItems: 'center'
      }}>\r
          <IconButton icon="pen" label="Primary" variant="outlined" color="primary" loading />\r
          <IconButton icon="magnifying-glass" label="Secondary" variant="outlined" color="secondary" loading />\r
          <IconButton icon="circle-info" label="Info" variant="outlined" color="info" loading />\r
          <IconButton icon="triangle-exclamation" label="Warning" variant="outlined" color="warning" loading />\r
          <IconButton icon="trash" label="Error" variant="outlined" color="error" loading />\r
          <IconButton icon="check" label="Success" variant="outlined" color="success" loading />\r
        </div>\r
      </div>\r
    </div>
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: 'Reversed — On Primary Background',
  parameters: {
    layout: 'fullscreen'
  },
  render: () => <ReversedShowcase />
}`,...A.parameters?.docs?.source}}},j=[`Default`,`Variants`,`Sizes`,`Colors`,`CommonlyUsedIcons`,`Disabled`,`Loading`,`OnPrimaryBackground`]}))();export{E as Colors,D as CommonlyUsedIcons,C as Default,O as Disabled,k as Loading,A as OnPrimaryBackground,T as Sizes,w as Variants,j as __namedExportsOrder,S as default};