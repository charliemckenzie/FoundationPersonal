import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{n,t as r}from"./Typography-ChsBGyM_.js";import{n as i,t as a}from"./Box-Cj6TI_Dr.js";import{n as o,t as s}from"./Tabs-Cs5RcwMB.js";function c({size:e}){return(0,l.jsxs)(i,{sx:{display:`flex`,alignItems:`center`,gap:4,mb:3},children:[(0,l.jsx)(i,{sx:{flex:1},children:(0,l.jsx)(s,{label:`${e} tabs`,tabs:f,size:e})}),(0,l.jsx)(n,{variant:`small`,color:`text.muted`,sx:{textTransform:`capitalize`,minWidth:56},children:e})]})}var l,u,d,f,p,m,h,g,_,v,y,b;e((()=>{l=t(),o(),r(),a(),u=e=>(0,l.jsx)(i,{sx:{p:2,bgcolor:`background.default`,borderRadius:1,border:`1px dashed`,borderColor:`divider`},children:(0,l.jsxs)(n,{variant:`body`,color:`text.muted`,children:[e,` — placeholder content`]})}),d=[{label:`Overview`,content:u(`Tab one`)},{label:`Transactions`,content:u(`Tab two`)},{label:`Documents`,content:u(`Tab three`)}],f=[{label:`Tab one`},{label:`Tab two`},{label:`Tab three`}],p={title:`Components / Tabs`,component:s,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:"Tabs let users switch between related views without leaving the page.\n\n**Three styles:**\n- `default` — pill-shaped soft-fill tabs on a light or white background. The default for most use cases.\n- `white` — same pill shape, optimised for brand-coloured or dark backgrounds where the blue tint would disappear.\n- `segmented` — a sliding pill control inside a tinted track. Use for binary or small-count switches (2–4 options) where the choice feels like a mode selector rather than navigation.\n\n**Three sizes:** `small`, `medium` (default), `large`. Choose based on the surrounding context — e.g. `small` inside a dense card, `large` as a primary page-level control."}}},argTypes:{size:{control:`select`,options:[`small`,`medium`,`large`],description:`Controls height, font size, and horizontal padding.`},tabStyle:{control:`select`,options:[`default`,`white`,`segmented`],description:"`default` — soft-fill pills on white. `white` — for coloured backgrounds. `segmented` — sliding pill control."},defaultTab:{control:`number`,description:`Zero-based index of the initially selected tab.`},fullWidth:{control:`boolean`,description:`Segmented only — stretches the control to fill its container.`,if:{arg:`tabStyle`,eq:`segmented`}},reversed:{control:`boolean`,description:`Flip all styles to white-based for placement on dark or brand-coloured backgrounds.`},label:{control:`text`,description:`Accessible label for the tablist — read by screen readers. Make it descriptive.`},tabs:{table:{disable:!0}},onChange:{table:{disable:!0}}}},m={name:`Playground`,args:{label:`Example tabs`,size:`medium`,tabStyle:`default`,defaultTab:0,tabs:d}},h={name:`Default`,parameters:{docs:{description:{story:"**Usage guidance:** Use on white or light grey backgrounds. The soft primary-tinted fill keeps inactive tabs visually present without competing with the active state. Avoid placing on coloured surfaces — use `white` instead."}}},render:()=>(0,l.jsx)(s,{label:`Default tabs`,tabs:d})},g={name:`Sizes`,parameters:{docs:{description:{story:"Match tab size to the density of the surrounding layout. `medium` is right for most page-level contexts."}}},render:()=>(0,l.jsxs)(i,{sx:{maxWidth:600},children:[(0,l.jsx)(c,{size:`small`}),(0,l.jsx)(c,{size:`medium`}),(0,l.jsx)(c,{size:`large`})]})},_=[{label:`Monthly`,content:u(`Monthly view`)},{label:`Yearly`,content:u(`Yearly view`)},{label:`All time`,content:u(`All time view`)}],v={name:`Segmented`,parameters:{docs:{description:{story:"**Usage guidance:** Use for compact mode-selectors with 2–4 options — e.g. chart period pickers, view toggles. The sliding pill reinforces that the choice is a mode, not navigation. Keep labels short; long labels break the equal-width layout. Avoid for more than 4 options — use `default` tabs instead."}}},render:()=>(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n,{variant:`small`,color:`text.muted`,sx:{display:`block`,mb:1},children:`Medium (default)`}),(0,l.jsx)(s,{label:`Period selector`,tabs:_,tabStyle:`segmented`,size:`medium`}),(0,l.jsx)(n,{variant:`small`,color:`text.muted`,sx:{display:`block`,mt:3,mb:1},children:`Small`}),(0,l.jsx)(s,{label:`Period selector small`,tabs:_,tabStyle:`segmented`,size:`small`}),(0,l.jsx)(n,{variant:`small`,color:`text.muted`,sx:{display:`block`,mt:3,mb:1},children:`Full width`}),(0,l.jsx)(s,{label:`Period selector full width`,tabs:_,tabStyle:`segmented`,size:`medium`,fullWidth:!0})]})},y={name:`Reversed`,parameters:{docs:{description:{story:"**Usage guidance:** Use `reversed` on dark or brand-coloured backgrounds. Works on all three styles — `default`, `white`, and `segmented`. Inactive tabs become white-tinted, the active state becomes a solid white element with primary-coloured text."}}},render:()=>(0,l.jsxs)(i,{sx:{bgcolor:`background.brandSecondary`,borderRadius:2,p:3,display:`flex`,flexDirection:`column`,gap:4},children:[(0,l.jsxs)(i,{children:[(0,l.jsx)(n,{variant:`small`,sx:{display:`block`,mb:1,color:`common.white`,opacity:.7},children:`Default — reversed`}),(0,l.jsx)(s,{label:`Reversed default`,tabs:f,reversed:!0})]}),(0,l.jsxs)(i,{children:[(0,l.jsx)(n,{variant:`small`,sx:{display:`block`,mb:1,color:`common.white`,opacity:.7},children:`Segmented — reversed`}),(0,l.jsx)(s,{label:`Reversed segmented`,tabs:_,tabStyle:`segmented`,reversed:!0})]}),(0,l.jsxs)(i,{children:[(0,l.jsx)(n,{variant:`small`,sx:{display:`block`,mb:1,color:`common.white`,opacity:.7},children:`Segmented full width — reversed`}),(0,l.jsx)(s,{label:`Reversed segmented full width`,tabs:_,tabStyle:`segmented`,reversed:!0,fullWidth:!0})]})]})},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Playground',
  args: {
    label: 'Example tabs',
    size: 'medium',
    tabStyle: 'default',
    defaultTab: 0,
    tabs: SAMPLE_TABS
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Default',
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use on white or light grey backgrounds. The soft primary-tinted fill keeps inactive tabs visually present without competing with the active state. Avoid placing on coloured surfaces — use \`white\` instead.'
      }
    }
  },
  render: () => <Tabs label="Default tabs" tabs={SAMPLE_TABS} />
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Sizes',
  parameters: {
    docs: {
      description: {
        story: 'Match tab size to the density of the surrounding layout. \`medium\` is right for most page-level contexts.'
      }
    }
  },
  render: () => <Box sx={{
    maxWidth: 600
  }}>\r
      <SizeRow size="small" />\r
      <SizeRow size="medium" />\r
      <SizeRow size="large" />\r
    </Box>
}`,...g.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Segmented',
  parameters: {
    docs: {
      description: {
        story: \`**Usage guidance:** Use for compact mode-selectors with 2–4 options — e.g. chart period pickers, view toggles. The sliding pill reinforces that the choice is a mode, not navigation. Keep labels short; long labels break the equal-width layout. Avoid for more than 4 options — use \\\`default\\\` tabs instead.\`
      }
    }
  },
  render: () => <>\r
      <Typography variant="small" color="text.muted" sx={{
      display: 'block',
      mb: 1
    }}>Medium (default)</Typography>\r
      <Tabs label="Period selector" tabs={SEGMENTED_TABS} tabStyle="segmented" size="medium" />\r
      <Typography variant="small" color="text.muted" sx={{
      display: 'block',
      mt: 3,
      mb: 1
    }}>Small</Typography>\r
      <Tabs label="Period selector small" tabs={SEGMENTED_TABS} tabStyle="segmented" size="small" />\r
      <Typography variant="small" color="text.muted" sx={{
      display: 'block',
      mt: 3,
      mb: 1
    }}>Full width</Typography>\r
      <Tabs label="Period selector full width" tabs={SEGMENTED_TABS} tabStyle="segmented" size="medium" fullWidth />\r
    </>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  name: 'Reversed',
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`reversed\` on dark or brand-coloured backgrounds. Works on all three styles — \`default\`, \`white\`, and \`segmented\`. Inactive tabs become white-tinted, the active state becomes a solid white element with primary-coloured text.'
      }
    }
  },
  render: () => <Box sx={{
    bgcolor: 'background.brandSecondary',
    borderRadius: 2,
    p: 3,
    display: 'flex',
    flexDirection: 'column',
    gap: 4
  }}>\r
      <Box>\r
        <Typography variant="small" sx={{
        display: 'block',
        mb: 1,
        color: 'common.white',
        opacity: 0.7
      }}>Default — reversed</Typography>\r
        <Tabs label="Reversed default" tabs={SHORT_TABS} reversed />\r
      </Box>\r
      <Box>\r
        <Typography variant="small" sx={{
        display: 'block',
        mb: 1,
        color: 'common.white',
        opacity: 0.7
      }}>Segmented — reversed</Typography>\r
        <Tabs label="Reversed segmented" tabs={SEGMENTED_TABS} tabStyle="segmented" reversed />\r
      </Box>\r
      <Box>\r
        <Typography variant="small" sx={{
        display: 'block',
        mb: 1,
        color: 'common.white',
        opacity: 0.7
      }}>Segmented full width — reversed</Typography>\r
        <Tabs label="Reversed segmented full width" tabs={SEGMENTED_TABS} tabStyle="segmented" reversed fullWidth />\r
      </Box>\r
    </Box>
}`,...y.parameters?.docs?.source}}},b=[`Playground`,`DefaultStyle`,`Sizes`,`SegmentedDefault`,`Reversed`]}))();export{h as DefaultStyle,m as Playground,y as Reversed,v as SegmentedDefault,g as Sizes,b as __namedExportsOrder,p as default};