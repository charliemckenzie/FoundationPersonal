import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{n,t as r}from"./Typography-ChsBGyM_.js";import{n as i,t as a}from"./Box-Cj6TI_Dr.js";import{n as o,t as s}from"./Logo-Ca_1uZJO.js";var c,l,u,d,f,p;e((()=>{c=t(),a(),r(),o(),l={title:`Components / Logo`,component:s,tags:[`autodocs`],parameters:{layout:`padded`},argTypes:{variant:{control:`select`,options:[`primary`,`secondary`,`mark`],description:"Logo variant. `secondary` and `mark` fall back to `primary` if not defined for the current brand."},size:{control:`select`,options:[`sm`,`md`,`lg`],description:`Controls the logo height. Width scales proportionally.`},alt:{control:`text`,description:`Overrides the brand default alt text.`}},args:{variant:`primary`,size:`md`}},u={},d={render:()=>(0,c.jsx)(i,{sx:{display:`flex`,flexDirection:`column`,gap:4},children:[`primary`,`secondary`,`mark`].map(e=>(0,c.jsxs)(i,{sx:{display:`flex`,flexDirection:`column`,gap:1},children:[(0,c.jsx)(n,{variant:`small`,sx:{color:`text.secondary`},children:e}),(0,c.jsx)(s,{variant:e,size:`md`})]},e))}),parameters:{controls:{disable:!0}}},f={render:()=>(0,c.jsx)(i,{sx:{display:`flex`,flexDirection:`column`,gap:4},children:[`sm`,`md`,`lg`].map(e=>(0,c.jsxs)(i,{sx:{display:`flex`,alignItems:`center`,gap:3},children:[(0,c.jsx)(n,{variant:`small`,sx:{color:`text.secondary`,width:e=>e.spacing(4)},children:e}),(0,c.jsx)(s,{variant:`primary`,size:e})]},e))}),parameters:{controls:{disable:!0}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 4
  }}>\r
      {(['primary', 'secondary', 'mark'] as const).map(variant => <Box key={variant} sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 1
    }}>\r
          <Typography variant="small" sx={{
        color: 'text.secondary'
      }}>\r
            {variant}\r
          </Typography>\r
          <Logo variant={variant} size="md" />\r
        </Box>)}\r
    </Box>,
  parameters: {
    controls: {
      disable: true
    }
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 4
  }}>\r
      {(['sm', 'md', 'lg'] as const).map(size => <Box key={size} sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 3
    }}>\r
          <Typography variant="small" sx={{
        color: 'text.secondary',
        width: t => t.spacing(4)
      }}>\r
            {size}\r
          </Typography>\r
          <Logo variant="primary" size={size} />\r
        </Box>)}\r
    </Box>,
  parameters: {
    controls: {
      disable: true
    }
  }
}`,...f.parameters?.docs?.source}}},p=[`Default`,`AllVariants`,`AllSizes`]}))();export{f as AllSizes,d as AllVariants,u as Default,p as __namedExportsOrder,l as default};