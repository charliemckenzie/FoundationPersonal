import{n as e,o as t}from"./chunk-vNrZSFDR.js";import{t as n}from"./react-KkzZQhs-.js";import{t as r}from"./jsx-runtime-BiDZswiL.js";import{L as i,m as a,p as o}from"./DefaultPropsProvider-Cbvbar0X.js";import{i as s,n as c,r as l,t as u}from"./Box-CHS_Iwe8.js";import{a as d,i as f,n as p,o as m,r as h,t as g}from"./theme-b-C2WwdKIP.js";import{n as _,t as v}from"./Typography-DJ0wIq9h.js";import{i as y,n as b,r as x,t as S}from"./Tab-CbQ9tdsm.js";function C({label:e,tabs:t,variant:n=`pill`,size:r=`medium`,tabStyle:a=`default`,defaultTab:s=0,onChange:l}){let[u,d]=T.useState(s),f=T.useId(),p=o(),{fontSize:m,py:h,px:g,minHeight:_}=E[r],v=`${p.shape.button}px`,x=(e,t)=>{d(t),l?.(t)},S=a===`default`?{borderRadius:v,border:`1px solid`,borderColor:`border.subtle`,bgcolor:`action.selected`,textTransform:`none`,fontWeight:500,fontSize:m,py:h,px:g,minHeight:_,color:`text.primary`,"&:hover":{bgcolor:`action.hover`,borderColor:`border.default`},"&.Mui-selected":{bgcolor:`primary.main`,color:`primary.contrastText`,borderColor:`primary.main`,"&:hover":{bgcolor:`primary.dark`,borderColor:`primary.dark`}},"&.Mui-focusVisible":{outline:`2px solid`,outlineColor:`primary.main`,outlineOffset:2},"&.Mui-disabled":{borderColor:`action.disabledBackground`,color:`text.disabled`,bgcolor:`action.disabledBackground`}}:{borderRadius:v,border:`1px solid`,borderColor:i(p.palette.text.inverse,.5),bgcolor:i(p.palette.text.inverse,.15),textTransform:`none`,fontWeight:500,fontSize:m,py:h,px:g,minHeight:_,color:`text.inverse`,"&:hover":{bgcolor:i(p.palette.text.inverse,.25)},"&.Mui-selected":{bgcolor:`background.paper`,color:`primary.main`,borderColor:`background.paper`,"&:hover":{bgcolor:`background.elevated`}},"&.Mui-focusVisible":{outline:`2px solid`,outlineColor:`text.inverse`,outlineOffset:2},"&.Mui-disabled":{borderColor:i(p.palette.text.inverse,.3),color:i(p.palette.text.inverse,.4),bgcolor:`transparent`}},C=n===`pill`?S:{textTransform:`none`,fontWeight:500,fontSize:m,py:h,px:g,minHeight:_,color:`text.primary`,"&:hover":{color:`primary.main`,bgcolor:`action.hover`},"&.Mui-selected":{color:`primary.main`,fontWeight:700},"&.Mui-focusVisible":{outline:`2px solid`,outlineColor:`primary.main`,outlineOffset:2}};return(0,w.jsxs)(c,{children:[(0,w.jsx)(c,{sx:n===`nav`?{borderBottom:1,borderColor:`divider`}:void 0,children:(0,w.jsx)(y,{value:u,onChange:x,"aria-label":e,sx:n===`pill`?{"& .MuiTabs-flexContainer":{gap:1},"& .MuiTabs-indicator":{display:`none`},minHeight:_}:{minHeight:_},TabIndicatorProps:n===`pill`?{style:{display:`none`,height:0}}:void 0,children:t.map((e,t)=>(0,w.jsx)(b,{label:e.label,disabled:e.disabled,id:`${f}-tab-${t}`,"aria-controls":`${f}-tabpanel-${t}`,sx:C},t))})}),t.map((e,t)=>e.content===void 0?null:(0,w.jsx)(c,{role:`tabpanel`,hidden:u!==t,tabIndex:u===t?0:-1,id:`${f}-tabpanel-${t}`,"aria-labelledby":`${f}-tab-${t}`,sx:{pt:3},children:e.content},t))]})}var w,T,E,D=e((()=>{w=r(),x(),S(),u(),l(),T=t(n()),E={small:{fontSize:`0.75rem`,py:.5,px:1.5,minHeight:32},medium:{fontSize:`0.875rem`,py:1,px:2,minHeight:40},large:{fontSize:`1rem`,py:1,px:3,minHeight:48}},C.__docgenInfo={description:``,methods:[],displayName:`Tabs`,props:{label:{required:!0,tsType:{name:`string`},description:`Accessible label for the tablist — shown to screen readers. Make it descriptive, e.g. "Account settings".`},tabs:{required:!0,tsType:{name:`Array`,elements:[{name:`TabItem`}],raw:`TabItem[]`},description:``},variant:{required:!1,tsType:{name:`union`,raw:`'pill' | 'nav'`,elements:[{name:`literal`,value:`'pill'`},{name:`literal`,value:`'nav'`}]},description:``,defaultValue:{value:`'pill'`,computed:!1}},size:{required:!1,tsType:{name:`union`,raw:`'small' | 'medium' | 'large'`,elements:[{name:`literal`,value:`'small'`},{name:`literal`,value:`'medium'`},{name:`literal`,value:`'large'`}]},description:``,defaultValue:{value:`'medium'`,computed:!1}},tabStyle:{required:!1,tsType:{name:`union`,raw:`'default' | 'white'`,elements:[{name:`literal`,value:`'default'`},{name:`literal`,value:`'white'`}]},description:``,defaultValue:{value:`'default'`,computed:!1}},defaultTab:{required:!1,tsType:{name:`number`},description:``,defaultValue:{value:`0`,computed:!1}},onChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(index: number) => void`,signature:{arguments:[{type:{name:`number`},name:`index`}],return:{name:`void`}}},description:``}}}}));function O({variant:e,size:t,label:n}){return(0,j.jsxs)(c,{sx:{display:`flex`,alignItems:`center`,gap:4,mb:2},children:[(0,j.jsx)(c,{sx:{flex:1},children:(0,j.jsx)(C,{label:`${n} size tabs`,tabs:I,variant:e,size:t})}),(0,j.jsx)(_,{variant:`small`,color:`text.muted`,sx:{minWidth:56},children:n})]})}function k({variant:e,bgcolor:t,tabStyle:n=`default`,bgLabel:r}){return(0,j.jsxs)(c,{sx:{mb:4},children:[(0,j.jsx)(_,{variant:`small`,color:`text.muted`,sx:{display:`block`,mb:1},children:r}),(0,j.jsx)(c,{sx:{bgcolor:t,borderRadius:1,p:3},children:(0,j.jsx)(C,{label:`${r} ${e} tabs`,tabs:I,variant:e,tabStyle:n})})]})}function A(){let e=o(),t=!!e.palette.background.brandSky,n=!!e.palette.background.brandClear,r=!!e.palette.background.brandGrey,i=!!e.palette.background.brandLightBlue,l=(0,M.useMemo)(()=>{if(!t)return null;let{colorSchemes:e,...n}=d(h);return a({...n,palette:e.dark.palette})},[t]),u=(0,M.useMemo)(()=>{if(!r)return null;let{colorSchemes:e,...t}=d(p);return a({...t,palette:e.dark.palette})},[r]);return(0,j.jsxs)(c,{sx:{maxWidth:700},children:[(0,j.jsx)(_,{variant:`h4`,sx:{mb:.5},children:`Pill tabs — Background contexts`}),(0,j.jsx)(_,{variant:`body`,color:`text.muted`,sx:{display:`block`,mb:4},children:`Pill tabs using the white tab style on brand-coloured surfaces.`}),t&&(0,j.jsx)(k,{variant:`pill`,bgcolor:`background.brandSky`,bgLabel:`background.brandSky`}),n&&(0,j.jsx)(k,{variant:`pill`,bgcolor:`background.brandClear`,bgLabel:`background.brandClear`}),r&&(0,j.jsx)(k,{variant:`pill`,bgcolor:`background.brandGrey`,bgLabel:`background.brandGrey`}),i&&(0,j.jsx)(k,{variant:`pill`,bgcolor:`background.brandLightBlue`,bgLabel:`background.brandLightBlue`}),(0,j.jsx)(_,{variant:`h4`,sx:{mb:.5,mt:4},children:`Nav tabs — Background contexts`}),(0,j.jsx)(_,{variant:`body`,color:`text.muted`,sx:{display:`block`,mb:4},children:`Nav tabs on the same brand-coloured surfaces.`}),t&&(0,j.jsx)(k,{variant:`nav`,bgcolor:`background.brandSky`,bgLabel:`background.brandSky`}),n&&(0,j.jsx)(k,{variant:`nav`,bgcolor:`background.brandClear`,bgLabel:`background.brandClear`}),r&&(0,j.jsx)(k,{variant:`nav`,bgcolor:`background.brandGrey`,bgLabel:`background.brandGrey`}),i&&(0,j.jsx)(k,{variant:`nav`,bgcolor:`background.brandLightBlue`,bgLabel:`background.brandLightBlue`}),t&&l&&(0,j.jsxs)(s,{theme:l,children:[(0,j.jsx)(_,{variant:`h4`,sx:{mb:.5,mt:6},children:`Pill tabs — Dark mode`}),(0,j.jsx)(_,{variant:`body`,color:`text.muted`,sx:{display:`block`,mb:4},children:`ART brand surfaces in dark mode.`}),(0,j.jsx)(k,{variant:`pill`,bgcolor:`background.brandSky`,bgLabel:`background.brandSky (dark)`}),(0,j.jsx)(k,{variant:`pill`,bgcolor:`background.brandClear`,bgLabel:`background.brandClear (dark)`}),(0,j.jsx)(k,{variant:`pill`,bgcolor:`background.brandWarm`,bgLabel:`background.brandWarm (dark)`}),(0,j.jsx)(_,{variant:`h4`,sx:{mb:.5,mt:4},children:`Nav tabs — Dark mode`}),(0,j.jsx)(_,{variant:`body`,color:`text.muted`,sx:{display:`block`,mb:4},children:`Nav tabs in dark mode.`}),(0,j.jsx)(k,{variant:`nav`,bgcolor:`background.brandSky`,bgLabel:`background.brandSky (dark)`}),(0,j.jsx)(k,{variant:`nav`,bgcolor:`background.brandClear`,bgLabel:`background.brandClear (dark)`}),(0,j.jsx)(k,{variant:`nav`,bgcolor:`background.brandWarm`,bgLabel:`background.brandWarm (dark)`})]}),r&&u&&(0,j.jsxs)(s,{theme:u,children:[(0,j.jsx)(_,{variant:`h4`,sx:{mb:.5,mt:6},children:`Pill tabs — Dark mode`}),(0,j.jsx)(_,{variant:`body`,color:`text.muted`,sx:{display:`block`,mb:4},children:`QSuper brand surfaces in dark mode.`}),(0,j.jsx)(k,{variant:`pill`,bgcolor:`background.brandGrey`,bgLabel:`background.brandGrey (dark)`}),(0,j.jsx)(k,{variant:`pill`,bgcolor:`background.brandLightBlue`,bgLabel:`background.brandLightBlue (dark)`}),(0,j.jsx)(_,{variant:`h4`,sx:{mb:.5,mt:4},children:`Nav tabs — Dark mode`}),(0,j.jsx)(_,{variant:`body`,color:`text.muted`,sx:{display:`block`,mb:4},children:`Nav tabs in dark mode.`}),(0,j.jsx)(k,{variant:`nav`,bgcolor:`background.brandGrey`,bgLabel:`background.brandGrey (dark)`}),(0,j.jsx)(k,{variant:`nav`,bgcolor:`background.brandLightBlue`,bgLabel:`background.brandLightBlue (dark)`})]})]})}var j,M,N,P,F,I,L,R,z,B,V,H;e((()=>{j=r(),D(),l(),v(),u(),M=t(n()),m(),f(),g(),N={title:`Components / Tabs`,component:C,tags:[`autodocs`],parameters:{layout:`padded`}},P=e=>(0,j.jsx)(c,{sx:{p:2,bgcolor:`background.default`,borderRadius:1,border:`1px dashed`,borderColor:`divider`},children:(0,j.jsxs)(_,{variant:`body`,color:`text.muted`,children:[e,` — placeholder content`]})}),F=[{label:`Tab label`,content:P(`Tab one`)},{label:`Tab label`,content:P(`Tab two`)},{label:`Tab label`,content:P(`Tab three`)}],I=[{label:`Tab label`},{label:`Tab label`},{label:`Tab label`}],L={name:`Pill tabs`,render:()=>(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(_,{variant:`body`,color:`text.muted`,sx:{display:`block`,mb:1},children:`More commonly used tab style.`}),(0,j.jsx)(_,{variant:`small`,sx:{display:`block`,mb:.5},children:(0,j.jsx)(`strong`,{children:`Behavior: Tab`})}),(0,j.jsx)(_,{variant:`small`,color:`text.muted`,sx:{display:`block`,mb:3},children:`Standard JavaScript driven tab behavior. Each tab has a corresponding tab content that shows and hides on a single page depending on what's selected.`}),(0,j.jsx)(C,{label:`Pill tabs example`,tabs:F,variant:`pill`})]})},R={name:`Nav tabs`,render:()=>(0,j.jsxs)(j.Fragment,{children:[(0,j.jsx)(_,{variant:`body`,color:`text.muted`,sx:{display:`block`,mb:1},children:`Less frequently used tab style.`}),(0,j.jsx)(_,{variant:`small`,sx:{display:`block`,mb:.5},children:(0,j.jsx)(`strong`,{children:`Behavior: Link tab`})}),(0,j.jsx)(_,{variant:`small`,color:`text.muted`,sx:{display:`block`,mb:3},children:`Using tabs as a navigation tool to other pages instead of tab content. Nav tab is more commonly used to help a user quickly switch between pages.`}),(0,j.jsx)(C,{label:`Nav tabs example`,tabs:F,variant:`nav`})]})},z={name:`Pill — Size variations`,render:()=>(0,j.jsxs)(c,{sx:{maxWidth:560},children:[(0,j.jsx)(_,{variant:`h4`,sx:{mb:3},children:`Size variations`}),(0,j.jsx)(O,{variant:`pill`,size:`small`,label:`Small`}),(0,j.jsx)(O,{variant:`pill`,size:`medium`,label:`Medium`}),(0,j.jsx)(O,{variant:`pill`,size:`large`,label:`Large`}),(0,j.jsx)(_,{variant:`small`,color:`text.muted`,sx:{mt:2,display:`block`},children:`No detailed rules apply, use the size that's appropriate for the need.`})]})},B={name:`Nav — Size variations`,render:()=>(0,j.jsxs)(c,{sx:{maxWidth:560},children:[(0,j.jsx)(_,{variant:`h4`,sx:{mb:3},children:`Size variations`}),(0,j.jsx)(O,{variant:`nav`,size:`small`,label:`Small`}),(0,j.jsx)(O,{variant:`nav`,size:`medium`,label:`Medium`}),(0,j.jsx)(O,{variant:`nav`,size:`large`,label:`Large`}),(0,j.jsx)(_,{variant:`small`,color:`text.muted`,sx:{mt:2,display:`block`},children:`No detailed rules apply, use the size that's appropriate for the need.`})]})},V={name:`Background contexts`,render:()=>(0,j.jsx)(A,{})},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  name: 'Pill tabs',
  render: () => <>\r
      <Typography variant="body" color="text.muted" sx={{
      display: 'block',
      mb: 1
    }}>\r
        More commonly used tab style.\r
      </Typography>\r
      <Typography variant="small" sx={{
      display: 'block',
      mb: 0.5
    }}>\r
        <strong>Behavior: Tab</strong>\r
      </Typography>\r
      <Typography variant="small" color="text.muted" sx={{
      display: 'block',
      mb: 3
    }}>\r
        Standard JavaScript driven tab behavior. Each tab has a corresponding tab content that shows\r
        and hides on a single page depending on what&apos;s selected.\r
      </Typography>\r
      <Tabs label="Pill tabs example" tabs={SAMPLE_TABS} variant="pill" />\r
    </>
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  name: 'Nav tabs',
  render: () => <>\r
      <Typography variant="body" color="text.muted" sx={{
      display: 'block',
      mb: 1
    }}>\r
        Less frequently used tab style.\r
      </Typography>\r
      <Typography variant="small" sx={{
      display: 'block',
      mb: 0.5
    }}>\r
        <strong>Behavior: Link tab</strong>\r
      </Typography>\r
      <Typography variant="small" color="text.muted" sx={{
      display: 'block',
      mb: 3
    }}>\r
        Using tabs as a navigation tool to other pages instead of tab content. Nav tab is more\r
        commonly used to help a user quickly switch between pages.\r
      </Typography>\r
      <Tabs label="Nav tabs example" tabs={SAMPLE_TABS} variant="nav" />\r
    </>
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  name: 'Pill — Size variations',
  render: () => <Box sx={{
    maxWidth: 560
  }}>\r
      <Typography variant="h4" sx={{
      mb: 3
    }}>Size variations</Typography>\r
      <SizeRow variant="pill" size="small" label="Small" />\r
      <SizeRow variant="pill" size="medium" label="Medium" />\r
      <SizeRow variant="pill" size="large" label="Large" />\r
      <Typography variant="small" color="text.muted" sx={{
      mt: 2,
      display: 'block'
    }}>\r
        No detailed rules apply, use the size that&apos;s appropriate for the need.\r
      </Typography>\r
    </Box>
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  name: 'Nav — Size variations',
  render: () => <Box sx={{
    maxWidth: 560
  }}>\r
      <Typography variant="h4" sx={{
      mb: 3
    }}>Size variations</Typography>\r
      <SizeRow variant="nav" size="small" label="Small" />\r
      <SizeRow variant="nav" size="medium" label="Medium" />\r
      <SizeRow variant="nav" size="large" label="Large" />\r
      <Typography variant="small" color="text.muted" sx={{
      mt: 2,
      display: 'block'
    }}>\r
        No detailed rules apply, use the size that&apos;s appropriate for the need.\r
      </Typography>\r
    </Box>
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  name: 'Background contexts',
  render: () => <BackgroundsDoc />
}`,...V.parameters?.docs?.source}}},H=[`PillTabs`,`NavTabs`,`PillSizes`,`NavSizes`,`Backgrounds`]}))();export{V as Backgrounds,B as NavSizes,R as NavTabs,z as PillSizes,L as PillTabs,H as __namedExportsOrder,N as default};