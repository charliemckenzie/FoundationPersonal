import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{n,t as r}from"./Switch-DflzYaQJ.js";var i,a,o,s,c,l,u,d,f;e((()=>{i=t(),n(),a={title:`Form Components / Switch`,component:r,tags:[`autodocs`],parameters:{layout:`centered`},argTypes:{color:{control:`select`,options:[`default`,`primary`,`secondary`,`error`,`warning`,`info`,`success`]},size:{control:`select`,options:[`small`,`medium`]},labelPlacement:{control:`select`,options:[`end`,`start`,`top`,`bottom`]}}},o={args:{label:`Enable notifications`}},s={args:{label:`Enabled`,checked:!0}},c={render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,i.jsx)(r,{label:`Small`,size:`small`,defaultChecked:!0}),(0,i.jsx)(r,{label:`Medium`,size:`medium`,defaultChecked:!0})]})},l={render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,i.jsx)(r,{label:`Primary`,color:`primary`,defaultChecked:!0}),(0,i.jsx)(r,{label:`Secondary`,color:`secondary`,defaultChecked:!0}),(0,i.jsx)(r,{label:`Error`,color:`error`,defaultChecked:!0}),(0,i.jsx)(r,{label:`Success`,color:`success`,defaultChecked:!0})]})},u={args:{label:`Dark mode`,helperText:`Applies immediately across the app.`}},d={render:()=>(0,i.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:8},children:[(0,i.jsx)(r,{label:`Disabled off`,disabled:!0}),(0,i.jsx)(r,{label:`Disabled on`,disabled:!0,defaultChecked:!0})]})},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Enable notifications'
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Enabled',
    checked: true
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  }}>\r
      <Switch label="Small" size="small" defaultChecked />\r
      <Switch label="Medium" size="medium" defaultChecked />\r
    </div>
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  }}>\r
      <Switch label="Primary" color="primary" defaultChecked />\r
      <Switch label="Secondary" color="secondary" defaultChecked />\r
      <Switch label="Error" color="error" defaultChecked />\r
      <Switch label="Success" color="success" defaultChecked />\r
    </div>
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Dark mode',
    helperText: 'Applies immediately across the app.'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 8
  }}>\r
      <Switch label="Disabled off" disabled />\r
      <Switch label="Disabled on" disabled defaultChecked />\r
    </div>
}`,...d.parameters?.docs?.source}}},f=[`Default`,`Checked`,`Sizes`,`Colors`,`WithHelperText`,`Disabled`]}))();export{s as Checked,l as Colors,o as Default,d as Disabled,c as Sizes,u as WithHelperText,f as __namedExportsOrder,a as default};