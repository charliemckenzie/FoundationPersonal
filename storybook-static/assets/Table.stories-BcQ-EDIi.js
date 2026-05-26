import{n as e,s as t}from"./chunk-Bj-mKKzh.js";import{t as n}from"./react-DVKR3yZN.js";import{t as r}from"./jsx-runtime-CyI9ICYU.js";import{n as i,t as a}from"./Chip-B1NQs2VU.js";import{n as o,t as s}from"./Table-CEfMfx-3.js";var c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w;e((()=>{c=r(),l=t(n()),o(),i(),u=[{id:1,name:`Homer Simpson`,email:`homer@springfield.gov`,role:`Safety Inspector`,status:`active`},{id:2,name:`Marge Simpson`,email:`marge@simpson.com`,role:`Designer`,status:`active`},{id:3,name:`Bart Simpson`,email:`bart@springfield.edu`,role:`Student`,status:`inactive`},{id:4,name:`Lisa Simpson`,email:`lisa@springfield.edu`,role:`Student`,status:`active`},{id:5,name:`Ned Flanders`,email:`ned@flanders.com`,role:`Neighbour`,status:`active`},{id:6,name:`Burns`,email:`burns@springfield.gov`,role:`CEO`,status:`inactive`},{id:7,name:`Lenny Leonard`,email:`lenny@springfield.gov`,role:`Safety Inspector`,status:`active`},{id:8,name:`Carl Carlson`,email:`carl@springfield.gov`,role:`Safety Inspector`,status:`active`},{id:9,name:`Moe Szyslak`,email:`moe@tavern.com`,role:`Barkeep`,status:`active`}],d=[{key:`name`,label:`Name`,sortable:!0},{key:`email`,label:`Email`,sortable:!0},{key:`role`,label:`Role`,sortable:!0},{key:`status`,label:`Status`,render:e=>(0,c.jsx)(a,{label:e.status,...e.status===`active`?{severity:`success`}:{color:`default`},size:`small`})}],f=[{key:`date`,label:`Date`,width:120},{key:`description`,label:`Description`,width:200},{key:`amount`,label:`Amount (AUD)`,width:140,align:`right`},{key:`category`,label:`Category`,width:160},{key:`account`,label:`Account`,width:180},{key:`reference`,label:`Reference`,width:160},{key:`status`,label:`Status`,width:110}],p=[{id:1,date:`2026-05-01`,description:`Employer contribution`,amount:`$1,200.00`,category:`Contribution`,account:`Super Account`,reference:`REF-00001`,status:`Completed`},{id:2,date:`2026-05-05`,description:`Investment earnings`,amount:`$348.50`,category:`Earnings`,account:`Investment Account`,reference:`REF-00002`,status:`Completed`},{id:3,date:`2026-05-10`,description:`Insurance premium`,amount:`-$45.00`,category:`Insurance`,account:`Super Account`,reference:`REF-00003`,status:`Pending`},{id:4,date:`2026-05-15`,description:`Voluntary contribution`,amount:`$500.00`,category:`Contribution`,account:`Super Account`,reference:`REF-00004`,status:`Completed`}],m={title:`Components / Tables / Table`,component:s,tags:[`autodocs`],parameters:{layout:`padded`},argTypes:{density:{control:`select`,options:[`condensed`,`default`,`spaced`],description:`Vertical cell padding size.`},striped:{control:`boolean`,description:`Alternates row background colour.`},stripeDirection:{control:`select`,options:[`row`,`column`],description:`Direction of striping when striped is true. 'row' alternates rows, 'column' alternates columns.`},bordered:{control:`boolean`,description:`Adds vertical column separators for a full grid appearance.`},stickyHeader:{control:`boolean`,description:`Pins the header row when the table scrolls.`},containerMaxHeight:{control:`text`,description:`Max height of the scroll container. Required for sticky header.`},columns:{table:{disable:!0}},rows:{table:{disable:!0}},loading:{table:{disable:!0}},emptyMessage:{table:{disable:!0}},horizontalPadding:{table:{disable:!0}},pagination:{table:{disable:!0}}}},h={args:{density:`default`,striped:!1,stickyHeader:!1},render:e=>(0,c.jsx)(s,{...e,columns:d,rows:u.slice(0,4)})},g={render:()=>(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:32},children:[(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`p`,{style:{marginBottom:8,fontWeight:600},children:`Row striped`}),(0,c.jsx)(s,{columns:d,rows:u.slice(0,5),striped:!0})]}),(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`p`,{style:{marginBottom:8,fontWeight:600},children:`Column striped`}),(0,c.jsx)(s,{columns:d,rows:u.slice(0,5),striped:!0,stripeDirection:`column`})]})]})},_={name:`Bordered`,render:()=>(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:32},children:[(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`p`,{style:{marginBottom:8,fontWeight:600},children:`Bordered`}),(0,c.jsx)(s,{columns:d,rows:u.slice(0,5),bordered:!0})]}),(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`p`,{style:{marginBottom:8,fontWeight:600},children:`Bordered + Row striped`}),(0,c.jsx)(s,{columns:d,rows:u.slice(0,5),bordered:!0,striped:!0})]})]})},v={render:()=>(0,c.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:32},children:[(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`p`,{style:{marginBottom:8,fontWeight:600},children:`Condensed`}),(0,c.jsx)(s,{columns:d,rows:u.slice(0,4),density:`condensed`})]}),(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`p`,{style:{marginBottom:8,fontWeight:600},children:`Default`}),(0,c.jsx)(s,{columns:d,rows:u.slice(0,4),density:`default`})]}),(0,c.jsxs)(`div`,{children:[(0,c.jsx)(`p`,{style:{marginBottom:8,fontWeight:600},children:`Spaced`}),(0,c.jsx)(s,{columns:d,rows:u.slice(0,4),density:`spaced`})]})]})},y={name:`Column Sorting`,render:()=>(0,c.jsx)(s,{columns:d.map(e=>({...e,sortable:e.key!==`status`})),rows:u.slice(0,4)})},b={render:()=>(0,c.jsx)(s,{columns:d,rows:[...u,...u,...u],stickyHeader:!0,containerMaxHeight:250})},x={name:`Overflow Scroll`,render:()=>(0,c.jsxs)(`div`,{style:{maxWidth:520},children:[(0,c.jsx)(`p`,{style:{marginBottom:12,fontSize:14,color:`#666`},children:`Container constrained to 520px — table scrolls horizontally on overflow.`}),(0,c.jsx)(s,{columns:f,rows:p})]})},S={name:`Pagination`,render:()=>{let[e,t]=(0,l.useState)(0),[n,r]=(0,l.useState)(5);return(0,c.jsx)(s,{columns:d,rows:u.slice(e*n,e*n+n),pagination:{count:u.length,page:e,rowsPerPage:n,onPageChange:t,onRowsPerPageChange:e=>{r(e),t(0)},rowsPerPageOptions:[5,10,{value:-1,label:`All`}]}})}},C={name:`Pagination + Sticky Header`,render:()=>{let[e,t]=(0,l.useState)(0),[n,r]=(0,l.useState)(5),i=[...u,...u,...u];return(0,c.jsx)(s,{columns:d,rows:i.slice(e*n,e*n+n),stickyHeader:!0,containerMaxHeight:300,pagination:{count:i.length,page:e,rowsPerPage:n,onPageChange:t,onRowsPerPageChange:e=>{r(e),t(0)}}})}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    density: 'default',
    striped: false,
    stickyHeader: false
  },
  render: args => <Table {...args} columns={COLUMNS} rows={ROWS.slice(0, 4)} />
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 32
  }}>\r
      <div>\r
        <p style={{
        marginBottom: 8,
        fontWeight: 600
      }}>Row striped</p>\r
        <Table columns={COLUMNS} rows={ROWS.slice(0, 5)} striped />\r
      </div>\r
      <div>\r
        <p style={{
        marginBottom: 8,
        fontWeight: 600
      }}>Column striped</p>\r
        <Table columns={COLUMNS} rows={ROWS.slice(0, 5)} striped stripeDirection="column" />\r
      </div>\r
    </div>
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  name: 'Bordered',
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 32
  }}>\r
      <div>\r
        <p style={{
        marginBottom: 8,
        fontWeight: 600
      }}>Bordered</p>\r
        <Table columns={COLUMNS} rows={ROWS.slice(0, 5)} bordered />\r
      </div>\r
      <div>\r
        <p style={{
        marginBottom: 8,
        fontWeight: 600
      }}>Bordered + Row striped</p>\r
        <Table columns={COLUMNS} rows={ROWS.slice(0, 5)} bordered striped />\r
      </div>\r
    </div>
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
        <Table columns={COLUMNS} rows={ROWS.slice(0, 4)} density="condensed" />\r
      </div>\r
      <div>\r
        <p style={{
        marginBottom: 8,
        fontWeight: 600
      }}>Default</p>\r
        <Table columns={COLUMNS} rows={ROWS.slice(0, 4)} density="default" />\r
      </div>\r
      <div>\r
        <p style={{
        marginBottom: 8,
        fontWeight: 600
      }}>Spaced</p>\r
        <Table columns={COLUMNS} rows={ROWS.slice(0, 4)} density="spaced" />\r
      </div>\r
    </div>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Column Sorting',
  render: () => <Table columns={COLUMNS.map(col => ({
    ...col,
    sortable: col.key !== 'status'
  }))} rows={ROWS.slice(0, 4)} />
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <Table columns={COLUMNS} rows={[...ROWS, ...ROWS, ...ROWS]} stickyHeader containerMaxHeight={250} />
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Overflow Scroll',
  render: () => <div style={{
    maxWidth: 520
  }}>\r
      <p style={{
      marginBottom: 12,
      fontSize: 14,
      color: '#666'
    }}>\r
        Container constrained to 520px — table scrolls horizontally on overflow.\r
      </p>\r
      <Table<Transaction> columns={TRANSACTION_COLUMNS} rows={TRANSACTION_ROWS} />\r
    </div>
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  name: 'Pagination',
  render: () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const paginated = ROWS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    return <Table columns={COLUMNS} rows={paginated} pagination={{
      count: ROWS.length,
      page,
      rowsPerPage,
      onPageChange: setPage,
      onRowsPerPageChange: rpp => {
        setRowsPerPage(rpp);
        setPage(0);
      },
      rowsPerPageOptions: [5, 10, {
        value: -1,
        label: 'All'
      }]
    }} />;
  }
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Pagination + Sticky Header',
  render: () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const allRows = [...ROWS, ...ROWS, ...ROWS];
    const paginated = allRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    return <Table columns={COLUMNS} rows={paginated} stickyHeader containerMaxHeight={300} pagination={{
      count: allRows.length,
      page,
      rowsPerPage,
      onPageChange: setPage,
      onRowsPerPageChange: rpp => {
        setRowsPerPage(rpp);
        setPage(0);
      }
    }} />;
  }
}`,...C.parameters?.docs?.source}}},w=[`Default`,`Striped`,`Bordered`,`Density`,`Sortable`,`StickyHeader`,`OverflowScroll`,`Pagination`,`PaginationStickyHeader`]}))();export{_ as Bordered,h as Default,v as Density,x as OverflowScroll,S as Pagination,C as PaginationStickyHeader,y as Sortable,b as StickyHeader,g as Striped,w as __namedExportsOrder,m as default};