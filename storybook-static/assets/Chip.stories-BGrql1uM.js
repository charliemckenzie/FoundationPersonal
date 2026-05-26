import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{n,t as r}from"./Icon-IHyqCtZq.js";import{n as i,t as a}from"./Chip-B1NQs2VU.js";var o,s,c,l,u,d,f,p,m,h,g,_;e((()=>{o=t(),i(),n(),s=[`circle-check`,`circle-dollar`,`circle-exclamation`,`circle-info`,`circle-minus`,`circle-plus`,`circle-question`],c={error:`circle-exclamation`,warning:`circle-exclamation`,info:`circle-info`,success:`circle-check`},l={title:`Components / Chip`,component:a,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{label:{control:`text`},variant:{control:`select`,options:[`filled`,`outlined`,`alert`]},severity:{control:`select`,options:[`error`,`warning`,`info`,`success`],if:{arg:`variant`,eq:`alert`}},alertIcon:{name:`icon`,control:`boolean`,if:{arg:`variant`,eq:`alert`}},showIcon:{name:`icon`,control:`boolean`,if:{arg:`variant`,neq:`alert`}},iconName:{name:`icon name`,control:`select`,options:s,if:{arg:`variant`,neq:`alert`}},color:{control:`select`,options:[`default`,`primary`,`white`],if:{arg:`variant`,neq:`alert`}},size:{control:`select`,options:[`small`,`medium`]},disabled:{table:{disable:!0}},icon:{table:{disable:!0}},avatar:{table:{disable:!0}},clickable:{table:{disable:!0}},onDelete:{table:{disable:!0}},onClick:{table:{disable:!0}}}},u={args:{label:`Chip`,variant:`filled`,severity:`info`,alertIcon:!1,showIcon:!1,iconName:`circle-plus`},render:({showIcon:e,alertIcon:t,iconName:n,variant:i,severity:s,...l})=>{let u=i===`alert`&&t&&s?(0,o.jsx)(r,{icon:c[s]}):e&&n&&i!==`alert`?(0,o.jsx)(r,{icon:n}):void 0;return(0,o.jsx)(a,{...l,variant:i===`alert`?void 0:i,severity:i===`alert`?s:void 0,icon:u})}},d={render:()=>(0,o.jsxs)(`div`,{style:{display:`flex`,gap:8,alignItems:`center`},children:[(0,o.jsx)(a,{label:`Filled`,variant:`filled`,color:`primary`}),(0,o.jsx)(a,{label:`Outlined`,variant:`outlined`,color:`primary`})]})},f={render:()=>(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:24},children:[(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,o.jsx)(`span`,{style:{fontSize:12,fontWeight:600,textTransform:`uppercase`,letterSpacing:`0.08em`,opacity:.5},children:`Medium`}),(0,o.jsxs)(`div`,{style:{display:`flex`,gap:8,flexWrap:`wrap`},children:[(0,o.jsx)(a,{label:`Error`,severity:`error`,size:`medium`}),(0,o.jsx)(a,{label:`Warning`,severity:`warning`,size:`medium`}),(0,o.jsx)(a,{label:`Info`,severity:`info`,size:`medium`}),(0,o.jsx)(a,{label:`Success`,severity:`success`,size:`medium`})]}),(0,o.jsxs)(`div`,{style:{display:`flex`,gap:8,flexWrap:`wrap`},children:[(0,o.jsx)(a,{label:`Error`,severity:`error`,size:`medium`,icon:(0,o.jsx)(r,{icon:`circle-exclamation`,color:`inherit`})}),(0,o.jsx)(a,{label:`Warning`,severity:`warning`,size:`medium`,icon:(0,o.jsx)(r,{icon:`circle-exclamation`,color:`inherit`})}),(0,o.jsx)(a,{label:`Info`,severity:`info`,size:`medium`,icon:(0,o.jsx)(r,{icon:`circle-info`,color:`inherit`})}),(0,o.jsx)(a,{label:`Success`,severity:`success`,size:`medium`,icon:(0,o.jsx)(r,{icon:`circle-check`,color:`inherit`})})]})]}),(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,o.jsx)(`span`,{style:{fontSize:12,fontWeight:600,textTransform:`uppercase`,letterSpacing:`0.08em`,opacity:.5},children:`Small`}),(0,o.jsxs)(`div`,{style:{display:`flex`,gap:8,flexWrap:`wrap`},children:[(0,o.jsx)(a,{label:`Error`,severity:`error`,size:`small`}),(0,o.jsx)(a,{label:`Warning`,severity:`warning`,size:`small`}),(0,o.jsx)(a,{label:`Info`,severity:`info`,size:`small`}),(0,o.jsx)(a,{label:`Success`,severity:`success`,size:`small`})]}),(0,o.jsxs)(`div`,{style:{display:`flex`,gap:8,flexWrap:`wrap`},children:[(0,o.jsx)(a,{label:`Error`,severity:`error`,size:`small`,icon:(0,o.jsx)(r,{icon:`circle-exclamation`,color:`inherit`})}),(0,o.jsx)(a,{label:`Warning`,severity:`warning`,size:`small`,icon:(0,o.jsx)(r,{icon:`circle-exclamation`,color:`inherit`})}),(0,o.jsx)(a,{label:`Info`,severity:`info`,size:`small`,icon:(0,o.jsx)(r,{icon:`circle-info`,color:`inherit`})}),(0,o.jsx)(a,{label:`Success`,severity:`success`,size:`small`,icon:(0,o.jsx)(r,{icon:`circle-check`,color:`inherit`})})]})]})]})},p={name:`Inline with text`,render:()=>(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,o.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:8},children:[(0,o.jsx)(`span`,{style:{fontSize:16},children:`Invoice #1042`}),(0,o.jsx)(a,{label:`Overdue`,severity:`error`,size:`small`})]}),(0,o.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:8},children:[(0,o.jsx)(`span`,{style:{fontSize:16},children:`Deployment v2.4.1`}),(0,o.jsx)(a,{label:`In review`,severity:`warning`,size:`small`})]}),(0,o.jsxs)(`div`,{style:{display:`flex`,alignItems:`center`,gap:8},children:[(0,o.jsx)(`span`,{style:{fontSize:16},children:`Pull request #88`}),(0,o.jsx)(a,{label:`Merged`,severity:`success`,size:`small`})]})]})},m={render:()=>(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,o.jsxs)(`div`,{style:{display:`flex`,gap:8},children:[(0,o.jsx)(a,{label:`Default`,color:`default`}),(0,o.jsx)(a,{label:`Primary`,color:`primary`}),(0,o.jsx)(a,{label:`Default`,color:`default`,variant:`outlined`}),(0,o.jsx)(a,{label:`Primary`,color:`primary`,variant:`outlined`})]}),(0,o.jsxs)(`div`,{style:{display:`flex`,gap:8,padding:16,background:`#1c355e`,borderRadius:8},children:[(0,o.jsx)(a,{label:`White`,color:`white`}),(0,o.jsx)(a,{label:`White`,color:`white`,variant:`outlined`})]})]})},h={render:()=>(0,o.jsxs)(`div`,{style:{display:`flex`,gap:8,alignItems:`center`},children:[(0,o.jsx)(a,{label:`Small`,size:`small`,color:`primary`}),(0,o.jsx)(a,{label:`Medium`,size:`medium`,color:`primary`})]})},g={name:`With icon`,render:()=>(0,o.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,o.jsxs)(`div`,{style:{display:`flex`,gap:8,alignItems:`center`},children:[(0,o.jsx)(a,{label:`Default`,icon:(0,o.jsx)(r,{icon:`circle-plus`}),color:`default`}),(0,o.jsx)(a,{label:`Primary`,icon:(0,o.jsx)(r,{icon:`circle-plus`}),color:`primary`})]}),(0,o.jsxs)(`div`,{style:{display:`flex`,gap:8,alignItems:`center`},children:[(0,o.jsx)(a,{label:`Default`,size:`small`,icon:(0,o.jsx)(r,{icon:`circle-plus`}),color:`default`}),(0,o.jsx)(a,{label:`Primary`,size:`small`,icon:(0,o.jsx)(r,{icon:`circle-plus`}),color:`primary`})]})]})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Chip',
    variant: 'filled',
    severity: 'info',
    alertIcon: false,
    showIcon: false,
    iconName: 'circle-plus'
  },
  render: ({
    showIcon,
    alertIcon,
    iconName,
    variant,
    severity,
    ...args
  }) => {
    const icon = variant === 'alert' && alertIcon && severity ? <Icon icon={ALERT_ICON[severity]} /> : showIcon && iconName && variant !== 'alert' ? <Icon icon={iconName} /> : undefined;
    return <Chip {...args} variant={variant === 'alert' ? undefined : variant} severity={variant === 'alert' ? severity : undefined} icon={icon} />;
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 8,
    alignItems: 'center'
  }}>\r
      <Chip label="Filled" variant="filled" color="primary" />\r
      <Chip label="Outlined" variant="outlined" color="primary" />\r
    </div>
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 24
  }}>\r
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }}>\r
        <span style={{
        fontSize: 12,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        opacity: 0.5
      }}>Medium</span>\r
        <div style={{
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap'
      }}>\r
          <Chip label="Error" severity="error" size="medium" />\r
          <Chip label="Warning" severity="warning" size="medium" />\r
          <Chip label="Info" severity="info" size="medium" />\r
          <Chip label="Success" severity="success" size="medium" />\r
        </div>\r
        <div style={{
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap'
      }}>\r
          <Chip label="Error" severity="error" size="medium" icon={<Icon icon="circle-exclamation" color="inherit" />} />\r
          <Chip label="Warning" severity="warning" size="medium" icon={<Icon icon="circle-exclamation" color="inherit" />} />\r
          <Chip label="Info" severity="info" size="medium" icon={<Icon icon="circle-info" color="inherit" />} />\r
          <Chip label="Success" severity="success" size="medium" icon={<Icon icon="circle-check" color="inherit" />} />\r
        </div>\r
      </div>\r
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }}>\r
        <span style={{
        fontSize: 12,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        opacity: 0.5
      }}>Small</span>\r
        <div style={{
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap'
      }}>\r
          <Chip label="Error" severity="error" size="small" />\r
          <Chip label="Warning" severity="warning" size="small" />\r
          <Chip label="Info" severity="info" size="small" />\r
          <Chip label="Success" severity="success" size="small" />\r
        </div>\r
        <div style={{
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap'
      }}>\r
          <Chip label="Error" severity="error" size="small" icon={<Icon icon="circle-exclamation" color="inherit" />} />\r
          <Chip label="Warning" severity="warning" size="small" icon={<Icon icon="circle-exclamation" color="inherit" />} />\r
          <Chip label="Info" severity="info" size="small" icon={<Icon icon="circle-info" color="inherit" />} />\r
          <Chip label="Success" severity="success" size="small" icon={<Icon icon="circle-check" color="inherit" />} />\r
        </div>\r
      </div>\r
    </div>
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Inline with text',
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }}>\r
      <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }}>\r
        <span style={{
        fontSize: 16
      }}>Invoice #1042</span>\r
        <Chip label="Overdue" severity="error" size="small" />\r
      </div>\r
      <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }}>\r
        <span style={{
        fontSize: 16
      }}>Deployment v2.4.1</span>\r
        <Chip label="In review" severity="warning" size="small" />\r
      </div>\r
      <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }}>\r
        <span style={{
        fontSize: 16
      }}>Pull request #88</span>\r
        <Chip label="Merged" severity="success" size="small" />\r
      </div>\r
    </div>
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16
  }}>\r
      <div style={{
      display: 'flex',
      gap: 8
    }}>\r
        <Chip label="Default" color="default" />\r
        <Chip label="Primary" color="primary" />\r
        <Chip label="Default" color="default" variant="outlined" />\r
        <Chip label="Primary" color="primary" variant="outlined" />\r
      </div>\r
      <div style={{
      display: 'flex',
      gap: 8,
      padding: 16,
      background: '#1c355e',
      borderRadius: 8
    }}>\r
        <Chip label="White" color="white" />\r
        <Chip label="White" color="white" variant="outlined" />\r
      </div>\r
    </div>
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 8,
    alignItems: 'center'
  }}>\r
      <Chip label="Small" size="small" color="primary" />\r
      <Chip label="Medium" size="medium" color="primary" />\r
    </div>
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'With icon',
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  }}>\r
      <div style={{
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }}>\r
        <Chip label="Default" icon={<Icon icon="circle-plus" />} color="default" />\r
        <Chip label="Primary" icon={<Icon icon="circle-plus" />} color="primary" />\r
      </div>\r
      <div style={{
      display: 'flex',
      gap: 8,
      alignItems: 'center'
    }}>\r
        <Chip label="Default" size="small" icon={<Icon icon="circle-plus" />} color="default" />\r
        <Chip label="Primary" size="small" icon={<Icon icon="circle-plus" />} color="primary" />\r
      </div>\r
    </div>
}`,...g.parameters?.docs?.source}}},_=[`Default`,`Variants`,`Alert`,`InlineWithText`,`Colors`,`Sizes`,`WithIcon`]}))();export{f as Alert,m as Colors,u as Default,p as InlineWithText,h as Sizes,d as Variants,g as WithIcon,_ as __namedExportsOrder,l as default};