import{n as e}from"./chunk-vNrZSFDR.js";import{t}from"./jsx-runtime-BiDZswiL.js";import{n,t as r}from"./Paper-D0ALM1Zn.js";import{n as i,t as a}from"./Typography-DJ0wIq9h.js";import{n as o,t as s}from"./Chip-Dq7YAFPi.js";import{n as c,t as l}from"./Spinner-DQq5y4xe.js";import{a as u,c as d,d as f,f as p,i as m,l as h,n as g,o as _,r as v,s as y,t as b,u as x}from"./TableRow-g8E89m2J.js";function S({columns:e,rows:t,loading:r=!1,emptyMessage:a=`No data to display.`,stickyHeader:o=!1,striped:s=!1,density:c=`default`,horizontalPadding:u=!0}){let f=!r&&t.length===0,h=e.map(e=>String(e.key)),v=w[c],y=u?2:1;return(0,C.jsx)(_,{component:n,variant:`outlined`,children:(0,C.jsxs)(p,{stickyHeader:o,"aria-busy":r,children:[(0,C.jsx)(m,{children:(0,C.jsx)(g,{children:e.map((e,t)=>(0,C.jsx)(d,{component:`th`,scope:`col`,align:e.align??`left`,width:e.width,sx:{fontWeight:600,bgcolor:`primary.main`,color:`primary.contrastText`,py:v,px:y},children:e.label},h[t]))})}),(0,C.jsxs)(x,{children:[r&&(0,C.jsx)(g,{children:(0,C.jsx)(d,{colSpan:e.length,align:`center`,sx:{py:4},children:(0,C.jsx)(l,{size:`medium`})})}),f&&(0,C.jsx)(g,{children:(0,C.jsx)(d,{colSpan:e.length,align:`center`,sx:{py:4},children:(0,C.jsx)(i,{variant:`body`,color:`text.muted`,children:a})})}),!r&&t.map((t,n)=>(0,C.jsx)(g,{hover:!0,sx:s&&n%2==1?{bgcolor:`background.tableStripe`}:void 0,children:e.map((e,n)=>(0,C.jsx)(d,{align:e.align??`left`,sx:{py:v,px:y,...s?{borderBottom:`none`}:{borderBottomColor:`divider`}},children:e.render?e.render(t):String(t[h[n]]??``)},h[n]))},t.id))]})]})})}var C,w,T=e((()=>{C=t(),f(),h(),y(),u(),v(),b(),r(),a(),c(),w={condensed:.75,default:1.5,spaced:2.5},S.__docgenInfo={description:``,methods:[],displayName:`Table`,props:{columns:{required:!0,tsType:{name:`Array`,elements:[{name:`TableColumn`,elements:[{name:`T`}],raw:`TableColumn<T>`}],raw:`TableColumn<T>[]`},description:``},rows:{required:!0,tsType:{name:`Array`,elements:[{name:`T`}],raw:`T[]`},description:``},loading:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},emptyMessage:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'No data to display.'`,computed:!1}},stickyHeader:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},striped:{required:!1,tsType:{name:`boolean`},description:`Alternates row background colour using the tableStripe semantic token.`,defaultValue:{value:`false`,computed:!1}},density:{required:!1,tsType:{name:`union`,raw:`'condensed' | 'default' | 'spaced'`,elements:[{name:`literal`,value:`'condensed'`},{name:`literal`,value:`'default'`},{name:`literal`,value:`'spaced'`}]},description:`Vertical cell padding size. Defaults to 'default'.`,defaultValue:{value:`'default'`,computed:!1}},horizontalPadding:{required:!1,tsType:{name:`boolean`},description:`Include horizontal cell padding. Defaults to true.`,defaultValue:{value:`true`,computed:!1}}}}})),E,D,O,k,A,j,M,N,P,F,I,L,R;e((()=>{E=t(),T(),o(),D=[{id:1,name:`Homer Simpson`,email:`homer@springfield.gov`,role:`Safety Inspector`,status:`active`},{id:2,name:`Marge Simpson`,email:`marge@simpson.com`,role:`Designer`,status:`active`},{id:3,name:`Bart Simpson`,email:`bart@springfield.edu`,role:`Student`,status:`inactive`},{id:4,name:`Lisa Simpson`,email:`lisa@springfield.edu`,role:`Student`,status:`active`}],O=[{key:`name`,label:`Name`},{key:`email`,label:`Email`},{key:`role`,label:`Role`},{key:`status`,label:`Status`,render:e=>(0,E.jsx)(s,{label:e.status,color:e.status===`active`?`success`:`default`,size:`small`})}],k={title:`Components / Table`,component:S,tags:[`autodocs`],parameters:{layout:`padded`},argTypes:{density:{control:`select`,options:[`condensed`,`default`,`spaced`],description:`Vertical cell padding size.`},striped:{control:`boolean`,description:`Alternates row background colour.`},horizontalPadding:{control:`boolean`,description:`Include horizontal cell padding.`},stickyHeader:{control:`boolean`}}},A={render:()=>(0,E.jsx)(S,{columns:O,rows:D})},j={render:()=>(0,E.jsx)(S,{columns:O,rows:D,striped:!0})},M={render:()=>(0,E.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:32},children:[(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`p`,{style:{marginBottom:8,fontWeight:600},children:`Condensed`}),(0,E.jsx)(S,{columns:O,rows:D,density:`condensed`})]}),(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`p`,{style:{marginBottom:8,fontWeight:600},children:`Default`}),(0,E.jsx)(S,{columns:O,rows:D,density:`default`})]}),(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`p`,{style:{marginBottom:8,fontWeight:600},children:`Spaced`}),(0,E.jsx)(S,{columns:O,rows:D,density:`spaced`})]})]})},N={render:()=>(0,E.jsx)(S,{columns:O,rows:D,horizontalPadding:!1})},P={name:`Kitchen Sink`,render:()=>(0,E.jsx)(S,{columns:O,rows:D,striped:!0,density:`condensed`,horizontalPadding:!1})},F={render:()=>(0,E.jsx)(S,{columns:O,rows:[],loading:!0})},I={render:()=>(0,E.jsx)(S,{columns:O,rows:[],emptyMessage:`No users found.`})},L={render:()=>(0,E.jsx)(`div`,{style:{maxHeight:200,overflow:`auto`},children:(0,E.jsx)(S,{columns:O,rows:[...D,...D,...D],stickyHeader:!0})})},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: () => <Table columns={COLUMNS} rows={ROWS} />
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  render: () => <Table columns={COLUMNS} rows={ROWS} striped />
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 32
  }}>\r
      <div>\r
        <p style={{
        marginBottom: 8,
        fontWeight: 600
      }}>Condensed</p>\r
        <Table columns={COLUMNS} rows={ROWS} density="condensed" />\r
      </div>\r
      <div>\r
        <p style={{
        marginBottom: 8,
        fontWeight: 600
      }}>Default</p>\r
        <Table columns={COLUMNS} rows={ROWS} density="default" />\r
      </div>\r
      <div>\r
        <p style={{
        marginBottom: 8,
        fontWeight: 600
      }}>Spaced</p>\r
        <Table columns={COLUMNS} rows={ROWS} density="spaced" />\r
      </div>\r
    </div>
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  render: () => <Table columns={COLUMNS} rows={ROWS} horizontalPadding={false} />
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: 'Kitchen Sink',
  render: () => <Table columns={COLUMNS} rows={ROWS} striped density="condensed" horizontalPadding={false} />
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: () => <Table columns={COLUMNS} rows={[]} loading />
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  render: () => <Table columns={COLUMNS} rows={[]} emptyMessage="No users found." />
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    maxHeight: 200,
    overflow: 'auto'
  }}>\r
      <Table columns={COLUMNS} rows={[...ROWS, ...ROWS, ...ROWS]} stickyHeader />\r
    </div>
}`,...L.parameters?.docs?.source}}},R=[`Default`,`Striped`,`Density`,`NoHorizontalPadding`,`KitchenSink`,`Loading`,`Empty`,`StickyHeader`]}))();export{A as Default,M as Density,I as Empty,P as KitchenSink,F as Loading,N as NoHorizontalPadding,L as StickyHeader,j as Striped,R as __namedExportsOrder,k as default};