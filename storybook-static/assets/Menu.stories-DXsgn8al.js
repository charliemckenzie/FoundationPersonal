import{n as e,s as t}from"./chunk-Bj-mKKzh.js";import{t as n}from"./react-DVKR3yZN.js";import{t as r}from"./jsx-runtime-CyI9ICYU.js";import{n as i,t as a}from"./Icon-IHyqCtZq.js";import{n as o,t as s}from"./IconButton-Lg0IhBKz.js";import{n as c,t as l}from"./Button-C-Y45Snn.js";import{n as u,t as d}from"./Menu-DUR7sJEj.js";var f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D;e((()=>{f=r(),p=t(n()),u(),c(),o(),i(),m={title:`Components / Menu`,component:d,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:`A menu reveals a list of actions on demand. Use it when actions are secondary — important enough to offer, but not important enough to take up permanent space in the UI.

**When to use**
- Overflow actions that apply to a single item (edit, duplicate, delete)
- User account or profile actions triggered from an avatar or name
- A set of related actions that would clutter the layout if shown as individual buttons

**When not to use**
- Primary actions — if users need to do it most of the time, make it a button
- Navigation — use a nav component instead
- More than 8 items — long menus are hard to scan; consider a different layout

**Trigger conventions**
- A text button works when the context is clear (e.g. "Actions")
- An icon button with the ellipsis icon (⋯) works for per-row actions in a table
- A button with a trailing chevron signals a dropdown and suits toolbar-style triggers

**Grouping and order**
- Put the most-used actions first
- Group related actions with a divider
- Always place destructive actions (delete, remove) last, after a divider`}}},argTypes:{showIcons:{control:`boolean`,name:`Icons`},showDividers:{control:`boolean`,name:`Dividers`}}},h=[{label:`View profile`,onClick:()=>{}},{label:`Account settings`,onClick:()=>{}},{label:`Sign out`,onClick:()=>{}}],g=[{label:`Edit`,icon:(0,f.jsx)(a,{icon:`pencil`,size:`md`}),onClick:()=>{}},{label:`Duplicate`,icon:(0,f.jsx)(a,{icon:`copy`,size:`md`}),onClick:()=>{}},{label:`Share`,icon:(0,f.jsx)(a,{icon:`share`,size:`md`}),onClick:()=>{}}],_=[{label:`Edit`,icon:(0,f.jsx)(a,{icon:`pencil`,size:`md`}),onClick:()=>{}},{label:`Duplicate`,icon:(0,f.jsx)(a,{icon:`copy`,size:`md`}),onClick:()=>{},dividerAfter:!0},{label:`Archive`,icon:(0,f.jsx)(a,{icon:`box-archive`,size:`md`}),onClick:()=>{}},{label:`Move to…`,icon:(0,f.jsx)(a,{icon:`folder-arrow-down`,size:`md`}),onClick:()=>{},dividerAfter:!0},{label:`Delete`,icon:(0,f.jsx)(a,{icon:`trash`,size:`md`}),onClick:()=>{},color:`error`}],v=[{label:`Edit`,onClick:()=>{}},{label:`Duplicate`,onClick:()=>{},disabled:!0},{label:`Delete`,onClick:()=>{}}],y={args:{showIcons:!1,showDividers:!1},render:({showIcons:e,showDividers:t})=>(0,f.jsx)(d,{trigger:(0,f.jsx)(l,{label:`Open menu`,variant:`soft`}),items:[{label:`Edit`,icon:e?(0,f.jsx)(a,{icon:`pencil`,size:`md`}):void 0,onClick:()=>{}},{label:`Duplicate`,icon:e?(0,f.jsx)(a,{icon:`copy`,size:`md`}):void 0,onClick:()=>{},dividerAfter:t},{label:`Share`,icon:e?(0,f.jsx)(a,{icon:`share`,size:`md`}):void 0,onClick:()=>{}}]})},b={render:()=>(0,f.jsx)(d,{trigger:(0,f.jsx)(l,{label:`Actions`,variant:`soft`}),items:g})},x={render:()=>(0,f.jsx)(d,{trigger:(0,f.jsx)(l,{label:`More actions`,variant:`soft`}),items:_})},S={render:()=>(0,f.jsx)(d,{trigger:(0,f.jsx)(l,{label:`Options`,variant:`soft`}),items:v})},C={render:()=>(0,f.jsx)(d,{trigger:(0,f.jsx)(s,{icon:`ellipsis`,label:`More options`,variant:`soft`}),items:h})},w=[{label:`Dashboard`,icon:(0,f.jsx)(a,{icon:`house`,size:`md`}),onClick:()=>{}},{label:`My profile`,icon:(0,f.jsx)(a,{icon:`user`,size:`md`}),onClick:()=>{}},{label:`Account settings`,icon:(0,f.jsx)(a,{icon:`gear`,size:`md`}),onClick:()=>{}},{label:`Notifications`,icon:(0,f.jsx)(a,{icon:`bell`,size:`md`}),onClick:()=>{}},{label:`Privacy`,icon:(0,f.jsx)(a,{icon:`shield`,size:`md`}),onClick:()=>{}},{label:`Security`,icon:(0,f.jsx)(a,{icon:`lock`,size:`md`}),onClick:()=>{},dividerAfter:!0},{label:`Help centre`,icon:(0,f.jsx)(a,{icon:`circle-question`,size:`md`}),onClick:()=>{}},{label:`Contact support`,icon:(0,f.jsx)(a,{icon:`headset`,size:`md`}),onClick:()=>{}},{label:`Send feedback`,icon:(0,f.jsx)(a,{icon:`message`,size:`md`}),onClick:()=>{},dividerAfter:!0},{label:`Sign out`,icon:(0,f.jsx)(a,{icon:`arrow-right-from-bracket`,size:`md`}),onClick:()=>{},color:`error`}],T={render:()=>(0,f.jsx)(d,{trigger:(0,f.jsx)(l,{label:`Account`,variant:`soft`}),items:w})},E={render:()=>{function e(){let[e,t]=(0,p.useState)(!1);return(0,f.jsx)(d,{trigger:(0,f.jsx)(l,{label:`Options`,variant:`soft`,endIcon:`chevron-down`,sx:{"& .MuiButton-endIcon":{transition:`transform 0.2s ease`,transform:e?`rotate(180deg)`:`rotate(0deg)`}}}),items:h,onOpenChange:t})}return(0,f.jsx)(e,{})}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  args: {
    showIcons: false,
    showDividers: false
  },
  render: ({
    showIcons,
    showDividers
  }) => {
    const items: MenuItemConfig[] = [{
      label: 'Edit',
      icon: showIcons ? <Icon icon="pencil" size="md" /> : undefined,
      onClick: () => {}
    }, {
      label: 'Duplicate',
      icon: showIcons ? <Icon icon="copy" size="md" /> : undefined,
      onClick: () => {},
      dividerAfter: showDividers
    }, {
      label: 'Share',
      icon: showIcons ? <Icon icon="share" size="md" /> : undefined,
      onClick: () => {}
    }];
    return <Menu trigger={<Button label="Open menu" variant="soft" />} items={items} />;
  }
}`,...y.parameters?.docs?.source},description:{story:`A menu reveals a list of actions when triggered. Use it for overflow actions that don't need permanent space in the UI.\r
Toggle the controls to preview common variations.`,...y.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <Menu trigger={<Button label="Actions" variant="soft" />} items={ICON_ITEMS} />
}`,...b.parameters?.docs?.source},description:{story:`Add icons to help users scan and identify actions quickly. Use icons consistently — either all items have one, or none do.`,...b.parameters?.docs?.description}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <Menu trigger={<Button label="More actions" variant="soft" />} items={DIVIDED_ITEMS} />
}`,...x.parameters?.docs?.source},description:{story:`Use dividers to group related actions. Keep groups small — if you need more than two groups, consider a different pattern.`,...x.parameters?.docs?.description}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <Menu trigger={<Button label="Options" variant="soft" />} items={WITH_DISABLED} />
}`,...S.parameters?.docs?.source},description:{story:`Disable items that are unavailable in the current context. Prefer hiding actions that will never be available over disabling them.`,...S.parameters?.docs?.description}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => <Menu trigger={<IconButton icon="ellipsis" label="More options" variant="soft" />} items={BASIC_ITEMS} />
}`,...C.parameters?.docs?.source},description:{story:`Use an icon button trigger for compact layouts where a text label isn't needed. The three-dot (ellipsis) icon is the conventional choice.`,...C.parameters?.docs?.description}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => <Menu trigger={<Button label="Account" variant="soft" />} items={LONG_LIST_ITEMS} />
}`,...T.parameters?.docs?.source},description:{story:`Long lists demonstrate the scrollable drawer on mobile and how the min-width keeps the dropdown readable at any content length.\r
Use dividers to create clear groups when a menu has more than five items.`,...T.parameters?.docs?.description}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => {
    function ChevronMenuDemo() {
      const [open, setOpen] = useState(false);
      return <Menu trigger={<Button label="Options" variant="soft" endIcon="chevron-down" sx={{
        '& .MuiButton-endIcon': {
          transition: 'transform 0.2s ease',
          transform: open ? 'rotate(180deg)' : 'rotate(0deg)'
        }
      }} />} items={BASIC_ITEMS} onOpenChange={setOpen} />;
    }
    return <ChevronMenuDemo />;
  }
}`,...E.parameters?.docs?.source},description:{story:`A chevron on the trigger signals to users that a dropdown will appear. The chevron rotates when the menu is open.`,...E.parameters?.docs?.description}}},D=[`Default`,`WithIcons`,`WithDividers`,`WithDisabledItem`,`WithIconButtonTrigger`,`LongList`,`WithChevron`]}))();export{y as Default,T as LongList,E as WithChevron,S as WithDisabledItem,x as WithDividers,C as WithIconButtonTrigger,b as WithIcons,D as __namedExportsOrder,m as default};