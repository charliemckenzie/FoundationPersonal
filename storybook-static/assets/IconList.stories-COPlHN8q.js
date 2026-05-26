import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{n,t as r}from"./Typography-ChsBGyM_.js";import{n as i,t as a}from"./Box-Cj6TI_Dr.js";import{n as o,t as s}from"./Icon-IHyqCtZq.js";function c({items:e,listType:t=`ul`,size:r=`md`,defaultIcon:a=`circle-check`,iconColor:o=`primary`}){let{iconSize:c,olIconSize:d,iconSlotWidth:f,headingVariant:p,textVariant:m,itemGap:h,listGap:g}=u[r];return(0,l.jsx)(i,{component:t,sx:e=>({listStyle:`none`,margin:0,padding:0,display:`flex`,flexDirection:`column`,gap:e.spacing(g)}),children:e.map((e,r)=>{let u=e.heading?p:m;return(0,l.jsxs)(i,{component:`li`,sx:e=>({display:`flex`,alignItems:`flex-start`,gap:e.spacing(h)}),children:[(0,l.jsx)(i,{sx:e=>({width:e.spacing(f),height:`calc(${e.typography[u].fontSize} * ${e.typography[u].lineHeight})`,display:`flex`,alignItems:`center`,justifyContent:`center`,flexShrink:0}),children:(0,l.jsx)(s,{icon:t===`ol`?`no${r+1}`:e.icon??a,size:t===`ol`?d:c,color:o})}),(0,l.jsxs)(i,{sx:{display:`flex`,flexDirection:`column`,minWidth:0},children:[e.heading&&(0,l.jsx)(n,{variant:p,component:e.headingComponent??p,sx:{margin:0,color:`text.heading`},children:e.heading}),(0,l.jsx)(n,{variant:m,children:e.text})]})]},r)})})}var l,u,d=e((()=>{l=t(),a(),r(),o(),u={sm:{iconSize:`md`,olIconSize:`sm`,iconSlotWidth:2,headingVariant:`h6`,textVariant:`small`,itemGap:1,listGap:.75},md:{iconSize:`lg`,olIconSize:`md`,iconSlotWidth:2.5,headingVariant:`h6`,textVariant:`body`,itemGap:1.5,listGap:1},lg:{iconSize:`xl`,olIconSize:`lg`,iconSlotWidth:3,headingVariant:`h5`,textVariant:`body`,itemGap:2,listGap:1.25}},c.__docgenInfo={description:``,methods:[],displayName:`IconList`,props:{items:{required:!0,tsType:{name:`Array`,elements:[{name:`IconListItem`}],raw:`IconListItem[]`},description:``},listType:{required:!1,tsType:{name:`union`,raw:`'ul' | 'ol'`,elements:[{name:`literal`,value:`'ul'`},{name:`literal`,value:`'ol'`}]},description:``,defaultValue:{value:`'ul'`,computed:!1}},size:{required:!1,tsType:{name:`union`,raw:`'sm' | 'md' | 'lg'`,elements:[{name:`literal`,value:`'sm'`},{name:`literal`,value:`'md'`},{name:`literal`,value:`'lg'`}]},description:``,defaultValue:{value:`'md'`,computed:!1}},defaultIcon:{required:!1,tsType:{name:`string`},description:``,defaultValue:{value:`'circle-check'`,computed:!1}},iconColor:{required:!1,tsType:{name:`union`,raw:`| 'inherit'\r
| 'primary'\r
| 'secondary'\r
| 'error'\r
| 'warning'\r
| 'info'\r
| 'success'\r
| 'text.primary'\r
| 'text.muted'\r
| 'text.disabled'`,elements:[{name:`literal`,value:`'inherit'`},{name:`literal`,value:`'primary'`},{name:`literal`,value:`'secondary'`},{name:`literal`,value:`'error'`},{name:`literal`,value:`'warning'`},{name:`literal`,value:`'info'`},{name:`literal`,value:`'success'`},{name:`literal`,value:`'text.primary'`},{name:`literal`,value:`'text.muted'`},{name:`literal`,value:`'text.disabled'`}]},description:``,defaultValue:{value:`'primary'`,computed:!1}}}}})),f,p,m,h,g,_,v,y,b,x,S,C;e((()=>{f=t(),a(),d(),p=`arrow-down-to-line.arrow-left.arrow-right.arrow-up-right.bars.chart-column.chart-line.chart-pie.check.chevron-down.chevron-left.chevron-right.chevron-up.circle-check.circle-dollar.circle-exclamation.circle-info.circle-minus.circle-plus.circle-question.ellipsis.gift.house.key.lock.magnifying-glass.magnifying-glass-dollar.minus.piggy-bank.plus.question.triangle-exclamation.umbrella.xmark`.split(`.`),m=[`primary`,`text.muted`],h={title:`Components / IconList`,component:c,tags:[`autodocs`],parameters:{layout:`padded`},argTypes:{listType:{control:`select`,options:[`ul`,`ol`]},size:{control:`select`,options:[`sm`,`md`,`lg`]},items:{table:{disable:!0}}}},g=[{icon:`circle-check`,heading:`Premium access`,text:`Unlimited access to all features`},{icon:`circle-check`,heading:`Priority support`,text:`Priority customer support`},{icon:`circle-check`,heading:`Reporting`,text:`Monthly usage reports and exports`}],_={argTypes:{listType:{control:`select`,options:[`ul`,`ol`]},size:{control:`select`,options:[`sm`,`md`,`lg`]},showHeading:{control:`boolean`},defaultIcon:{control:`select`,options:p,if:{arg:`listType`,eq:`ul`}},iconColor:{control:`select`,options:m},items:{table:{disable:!0}}},args:{listType:`ul`,size:`md`,showHeading:!1,defaultIcon:`circle-check`,iconColor:`primary`},render:({showHeading:e,defaultIcon:t,iconColor:n,listType:r,size:i})=>(0,f.jsx)(c,{listType:r,size:i,defaultIcon:t,iconColor:n,items:g.map(({heading:t,...n})=>({...n,...e?{heading:t}:{}}))})},v={render:()=>(0,f.jsxs)(i,{sx:{display:`flex`,flexDirection:`column`,gap:4},children:[(0,f.jsx)(c,{size:`sm`,items:g.map(({heading:e,...t})=>t)}),(0,f.jsx)(c,{size:`sm`,items:g})]})},y={render:()=>(0,f.jsxs)(i,{sx:{display:`flex`,flexDirection:`column`,gap:4},children:[(0,f.jsx)(c,{size:`md`,items:g.map(({heading:e,...t})=>t)}),(0,f.jsx)(c,{size:`md`,items:g})]})},b={render:()=>(0,f.jsxs)(i,{sx:{display:`flex`,flexDirection:`column`,gap:4},children:[(0,f.jsx)(c,{size:`lg`,items:g.map(({heading:e,...t})=>t)}),(0,f.jsx)(c,{size:`lg`,items:g})]})},x={render:()=>(0,f.jsx)(c,{items:[{icon:`circle-check`,text:`Unlimited access to all features across every plan tier, including advanced analytics, custom reporting, and priority API rate limits that scale with your organisation.`},{icon:`circle-check`,text:`Dedicated customer support with guaranteed response times, a named account manager, and direct access to our engineering team for complex integration queries.`},{icon:`circle-check`,text:`Monthly usage reports and data exports in PDF, CSV, and JSON formats, with automated delivery to your preferred email addresses or cloud storage bucket.`}]})},S={render:()=>(0,f.jsx)(c,{listType:`ol`,size:`md`,items:[{text:`Create your account and verify your email address.`},{text:`Set up your organisation profile and invite team members.`},{text:`Connect your data sources and configure your first report.`}]})},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  argTypes: {
    listType: {
      control: 'select',
      options: ['ul', 'ol']
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg']
    },
    showHeading: {
      control: 'boolean'
    },
    defaultIcon: {
      control: 'select',
      options: ICON_OPTIONS,
      if: {
        arg: 'listType',
        eq: 'ul'
      }
    },
    iconColor: {
      control: 'select',
      options: COLOR_OPTIONS
    },
    items: {
      table: {
        disable: true
      }
    }
  },
  args: {
    listType: 'ul',
    size: 'md',
    showHeading: false,
    defaultIcon: 'circle-check',
    iconColor: 'primary'
  },
  render: ({
    showHeading,
    defaultIcon,
    iconColor,
    listType,
    size
  }) => <IconList listType={listType} size={size} defaultIcon={defaultIcon} iconColor={iconColor} items={items.map(({
    heading,
    ...item
  }) => ({
    ...item,
    ...(showHeading ? {
      heading
    } : {})
  }))} />
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 4
  }}>\r
      <IconList size="sm" items={items.map(({
      heading: _,
      ...item
    }) => item)} />\r
      <IconList size="sm" items={items} />\r
    </Box>
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 4
  }}>\r
      <IconList size="md" items={items.map(({
      heading: _,
      ...item
    }) => item)} />\r
      <IconList size="md" items={items} />\r
    </Box>
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 4
  }}>\r
      <IconList size="lg" items={items.map(({
      heading: _,
      ...item
    }) => item)} />\r
      <IconList size="lg" items={items} />\r
    </Box>
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => <IconList items={[{
    icon: 'circle-check',
    text: 'Unlimited access to all features across every plan tier, including advanced analytics, custom reporting, and priority API rate limits that scale with your organisation.'
  }, {
    icon: 'circle-check',
    text: 'Dedicated customer support with guaranteed response times, a named account manager, and direct access to our engineering team for complex integration queries.'
  }, {
    icon: 'circle-check',
    text: 'Monthly usage reports and data exports in PDF, CSV, and JSON formats, with automated delivery to your preferred email addresses or cloud storage bucket.'
  }]} />
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => <IconList listType="ol" size="md" items={[{
    text: 'Create your account and verify your email address.'
  }, {
    text: 'Set up your organisation profile and invite team members.'
  }, {
    text: 'Connect your data sources and configure your first report.'
  }]} />
}`,...S.parameters?.docs?.source}}},C=[`Default`,`Small`,`Medium`,`Large`,`LongContent`,`OrderedList`]}))();export{_ as Default,b as Large,x as LongContent,y as Medium,S as OrderedList,v as Small,C as __namedExportsOrder,h as default};