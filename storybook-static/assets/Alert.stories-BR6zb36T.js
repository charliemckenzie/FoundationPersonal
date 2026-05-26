import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{n,t as r}from"./Icon-IHyqCtZq.js";import{n as i,r as a,t as o}from"./Alert-2okvnCky.js";import{n as s,t as c}from"./Button-C-Y45Snn.js";var l,u,d,f,p,m,h,g,_;e((()=>{l=t(),a(),s(),n(),u={title:`Components / Alert`,component:o,tags:[`autodocs`],parameters:{layout:`padded`},argTypes:{severity:{control:`select`,options:[`error`,`warning`,`info`,`success`]},message:{control:`text`},title:{control:`text`},showIcon:{control:`boolean`,description:`Show an icon.`},iconName:{control:`select`,options:[`(default)`,...[`arrow-down-to-line`,`arrow-left`,`arrow-left-arrow-right`,`arrow-right`,`arrow-up-right`,`chevron-down`,`chevron-left`,`chevron-right`,`chevron-up`,`circle-info`,`house`,`plus`,`xmark`]],description:`Override the severity icon. "(default)" uses the severity icon.`,if:{arg:`showIcon`,truthy:!0}},action:{table:{disable:!0}},onClose:{table:{disable:!0}},actionType:{control:`select`,options:[`none`,`close`,`custom`],description:`Action slot. "close" shows a dismiss button; "custom" shows an action button.`},actionLabel:{control:`text`,description:`Label for the custom action button.`,if:{arg:`actionType`,eq:`custom`}}}},d={render:({showIcon:e,iconName:t,actionType:n,actionLabel:a,severity:s,message:u,title:d})=>(0,l.jsx)(o,{severity:s,message:u,title:d,icon:e?(0,l.jsx)(r,{icon:t===`(default)`?i[s]:t,color:`inherit`,size:`lg`}):void 0,action:n===`custom`?(0,l.jsx)(c,{label:a||`Refresh`,size:`small`,variant:`soft`,color:s}):void 0,onClose:n===`close`?()=>{}:void 0}),args:{severity:`info`,message:`This is an informational message.`,showIcon:!1,iconName:`(default)`,actionType:`none`,actionLabel:`Refresh`}},f={render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,l.jsx)(o,{severity:`error`,message:`Something went wrong. Please try again.`}),(0,l.jsx)(o,{severity:`warning`,message:`Your session will expire in 5 minutes.`}),(0,l.jsx)(o,{severity:`info`,message:`A new version is available.`}),(0,l.jsx)(o,{severity:`success`,message:`Your changes have been saved.`})]})},p={name:`With Icon`,render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,l.jsx)(o,{severity:`error`,message:`Something went wrong. Please try again.`,icon:(0,l.jsx)(r,{icon:i.error,color:`inherit`,size:`lg`})}),(0,l.jsx)(o,{severity:`warning`,message:`Your session will expire in 5 minutes.`,icon:(0,l.jsx)(r,{icon:i.warning,color:`inherit`,size:`lg`})}),(0,l.jsx)(o,{severity:`info`,message:`A new version is available.`,icon:(0,l.jsx)(r,{icon:i.info,color:`inherit`,size:`lg`})}),(0,l.jsx)(o,{severity:`success`,message:`Your changes have been saved.`,icon:(0,l.jsx)(r,{icon:i.success,color:`inherit`,size:`lg`})})]})},m={render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,l.jsx)(o,{severity:`error`,title:`Error`,message:`The form could not be submitted. Check the fields below.`}),(0,l.jsx)(o,{severity:`success`,title:`Saved`,message:`Your profile has been updated successfully.`,icon:(0,l.jsx)(r,{icon:i.success,color:`inherit`,size:`lg`})})]})},h={render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,l.jsx)(o,{severity:`warning`,message:`This alert can be dismissed.`,onClose:()=>{}}),(0,l.jsx)(o,{severity:`warning`,title:`Session expiring soon`,message:`Your session will expire in 5 minutes due to inactivity. Save any unsaved work before it times out.`,icon:(0,l.jsx)(r,{icon:i.warning,color:`inherit`,size:`lg`}),onClose:()=>{}})]})},g={render:()=>(0,l.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,l.jsx)(o,{severity:`info`,message:`A new version of the app is available.`,action:(0,l.jsx)(c,{label:`Refresh`,size:`small`,condensed:!0,variant:`soft`,color:`info`})}),(0,l.jsx)(o,{severity:`info`,title:`Update available`,message:`A new version of the app is available with performance improvements and bug fixes. Refresh to apply the update.`,icon:(0,l.jsx)(r,{icon:i.info,color:`inherit`,size:`lg`}),action:(0,l.jsx)(c,{label:`Refresh`,size:`small`,condensed:!0,variant:`soft`,color:`info`})})]})},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: ({
    showIcon,
    iconName,
    actionType,
    actionLabel,
    severity,
    message,
    title
  }) => {
    const resolvedIcon = showIcon ? <Icon icon={iconName !== '(default)' ? iconName : SEVERITY_ICONS[severity as AlertSeverity]} color="inherit" size="lg" /> : undefined;
    const resolvedAction = actionType === 'custom' ? <Button label={actionLabel || 'Refresh'} size="small" variant="soft" color={severity} /> : undefined;
    const resolvedOnClose = actionType === 'close' ? () => {} : undefined;
    return <Alert severity={severity} message={message} title={title} icon={resolvedIcon} action={resolvedAction} onClose={resolvedOnClose} />;
  },
  args: {
    severity: 'info',
    message: 'This is an informational message.',
    showIcon: false,
    iconName: '(default)',
    actionType: 'none',
    actionLabel: 'Refresh'
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }}>\r
      <Alert severity="error" message="Something went wrong. Please try again." />\r
      <Alert severity="warning" message="Your session will expire in 5 minutes." />\r
      <Alert severity="info" message="A new version is available." />\r
      <Alert severity="success" message="Your changes have been saved." />\r
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'With Icon',
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }}>\r
      <Alert severity="error" message="Something went wrong. Please try again." icon={<Icon icon={SEVERITY_ICONS.error} color="inherit" size="lg" />} />\r
      <Alert severity="warning" message="Your session will expire in 5 minutes." icon={<Icon icon={SEVERITY_ICONS.warning} color="inherit" size="lg" />} />\r
      <Alert severity="info" message="A new version is available." icon={<Icon icon={SEVERITY_ICONS.info} color="inherit" size="lg" />} />\r
      <Alert severity="success" message="Your changes have been saved." icon={<Icon icon={SEVERITY_ICONS.success} color="inherit" size="lg" />} />\r
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }}>\r
      <Alert severity="error" title="Error" message="The form could not be submitted. Check the fields below." />\r
      <Alert severity="success" title="Saved" message="Your profile has been updated successfully." icon={<Icon icon={SEVERITY_ICONS.success} color="inherit" size="lg" />} />\r
    </div>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }}>\r
      <Alert severity="warning" message="This alert can be dismissed." onClose={() => {}} />\r
      <Alert severity="warning" title="Session expiring soon" message="Your session will expire in 5 minutes due to inactivity. Save any unsaved work before it times out." icon={<Icon icon={SEVERITY_ICONS.warning} color="inherit" size="lg" />} onClose={() => {}} />\r
    </div>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }}>\r
      <Alert severity="info" message="A new version of the app is available." action={<Button label="Refresh" size="small" condensed variant="soft" color="info" />} />\r
      <Alert severity="info" title="Update available" message="A new version of the app is available with performance improvements and bug fixes. Refresh to apply the update." icon={<Icon icon={SEVERITY_ICONS.info} color="inherit" size="lg" />} action={<Button label="Refresh" size="small" condensed variant="soft" color="info" />} />\r
    </div>
}`,...g.parameters?.docs?.source}}},_=[`Default`,`Severities`,`WithIcon`,`WithTitle`,`Closable`,`WithAction`]}))();export{h as Closable,d as Default,f as Severities,g as WithAction,p as WithIcon,m as WithTitle,_ as __namedExportsOrder,u as default};