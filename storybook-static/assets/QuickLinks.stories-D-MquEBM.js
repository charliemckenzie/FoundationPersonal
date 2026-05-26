import{n as e}from"./chunk-Bj-mKKzh.js";import{t}from"./jsx-runtime-CyI9ICYU.js";import{n,t as r}from"./Typography-ChsBGyM_.js";import{n as i,t as a}from"./Box-Cj6TI_Dr.js";import{n as o,t as s}from"./HeroIcon-BkBt6Dzg.js";function c({items:e,brand:t=`art`,iconSize:r=`md`,activeHref:a,"aria-label":o=`Section navigation`}){return(0,l.jsx)(i,{component:`nav`,"aria-label":o,sx:{borderBottom:`2px solid`,borderColor:`border.default`,position:`relative`,"&::after":{content:`""`,display:{xs:`block`,sm:`none`},position:`absolute`,top:0,right:0,bottom:0,width:48,background:e=>`linear-gradient(to right, transparent, var(--QuickLinks-fadeBg, ${e.palette.background.paper}))`,pointerEvents:`none`}},children:(0,l.jsx)(i,{component:`ul`,sx:{display:`flex`,justifyContent:{xs:`flex-start`,sm:`center`},overflowX:{xs:`auto`,sm:`visible`},scrollSnapType:{xs:`x mandatory`,sm:`none`},scrollbarWidth:`none`,"&::-webkit-scrollbar":{display:`none`},maxWidth:`1248px`,width:`100%`,mx:`auto`,my:0,p:0,listStyle:`none`},children:e.slice(0,6).map(e=>{let o=e.href===a;return(0,l.jsx)(i,{component:`li`,sx:{display:`flex`,flex:{xs:`0 0 clamp(120px, 30vw, calc(100% / 6))`,sm:`0 0 calc(100% / 6)`},scrollSnapAlign:{xs:`start`,sm:`none`}},children:(0,l.jsxs)(i,{component:`a`,href:e.href,"aria-current":o?`page`:void 0,sx:e=>({display:`flex`,flexDirection:`column`,alignItems:`center`,justifyContent:`flex-end`,gap:1.5,px:2,pt:2.5,pb:2,width:`100%`,textDecoration:`none`,textDecorationLine:`none !important`,color:o?`primary.main`:`text.muted`,position:`relative`,transition:e.transitions.create([`color`],{duration:e.transitions.duration.shortest}),"& .ql-icon":{filter:o?`none`:`grayscale(1) opacity(0.5)`,transition:`filter 150ms ease`},"&::after":{content:`""`,position:`absolute`,bottom:`-2px`,left:0,right:0,height:`3px`,bgcolor:`primary.main`,borderRadius:`2px 2px 0 0`,opacity:+!!o,transition:`opacity 150ms ease`},"&:hover":{color:`primary.main`,textDecoration:`none`,"& .ql-icon":{filter:`none`},"&::after":{opacity:1}},"&:focus-visible":{outline:`2px solid ${e.palette.border.focus}`,outlineOffset:`2px`,borderRadius:1}}),children:[(0,l.jsx)(i,{className:`ql-icon`,children:(0,l.jsx)(s,{name:e.icon,brand:t,size:r,background:`none`,"aria-hidden":!0})}),(0,l.jsx)(n,{variant:`small`,component:`span`,sx:{fontWeight:o?700:400,color:`inherit`,textAlign:`center`},children:e.label})]})},e.href)})})})}var l,u=e((()=>{l=t(),a(),r(),o(),c.__docgenInfo={description:``,methods:[],displayName:`QuickLinks`,props:{items:{required:!0,tsType:{name:`Array`,elements:[{name:`QuickLinkItem`}],raw:`QuickLinkItem[]`},description:`Between 3 and 6 items.`},brand:{required:!1,tsType:{name:`union`,raw:`'art' | 'qsuper'`,elements:[{name:`literal`,value:`'art'`},{name:`literal`,value:`'qsuper'`}]},description:``,defaultValue:{value:`'art'`,computed:!1}},iconSize:{required:!1,tsType:{name:`union`,raw:`'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'`,elements:[{name:`literal`,value:`'sm'`},{name:`literal`,value:`'md'`},{name:`literal`,value:`'lg'`},{name:`literal`,value:`'xl'`},{name:`literal`,value:`'2xl'`},{name:`literal`,value:`'3xl'`}]},description:``,defaultValue:{value:`'md'`,computed:!1}},activeHref:{required:!1,tsType:{name:`string`},description:`href of the currently active item — renders the underline indicator and aria-current.`},"aria-label":{required:!1,tsType:{name:`string`},description:`Accessible label for the nav landmark. Defaults to 'Section navigation'.\r
 Override when multiple navs appear on the same page.`,defaultValue:{value:`'Section navigation'`,computed:!1}}}}})),d,f,p,m,h,g,_;e((()=>{d=t(),u(),f={foundation:{brand:`art`,items:[{label:`Join ART`,href:`#join`,icon:`Add to super`},{label:`View performance`,href:`#performance`,icon:`Achievement`},{label:`Fees & costs`,href:`#fees`,icon:`Calculator with money`},{label:`Forms & resources`,href:`#forms`,icon:`Annual report`},{label:`Mobile app`,href:`#mobile`,icon:`App Icon`},{label:`Contact us`,href:`#contact`,icon:`Call`}]},"theme-b":{brand:`qsuper`,items:[{label:`Join QSuper`,href:`#join`,icon:`join`},{label:`View performance`,href:`#performance`,icon:`performance_1`},{label:`Fees & costs`,href:`#fees`,icon:`dollar`},{label:`Forms & resources`,href:`#forms`,icon:`checklist`},{label:`Mobile app`,href:`#mobile`,icon:`devices`},{label:`Contact us`,href:`#contact`,icon:`contact_centre`}]}},p={title:`Public web / Section navigation tab`,component:c,tags:[`autodocs`],parameters:{layout:`fullscreen`,docs:{description:{component:`Tab-style section navigation with hero icons and an active underline indicator. Supports 3–6 items. Icons and colours follow the active brand.`}}},argTypes:{itemCount:{control:`select`,options:[3,4,5,6],description:`Number of items to display (3–6).`},activeIndex:{control:`select`,options:[0,1,2,3,4,5],description:`Index of the currently active item.`},iconSize:{control:`select`,options:[`sm`,`md`,`lg`,`xl`],description:`Size of the hero icon.`},activeHref:{table:{disable:!0}}}},m={render:({itemCount:e,iconSize:t,activeIndex:n},r)=>{let{brand:i,items:a}=f[r.globals.brand??`foundation`]??f.foundation,o=a.slice(0,e);return(0,d.jsx)(c,{items:o,brand:i,iconSize:t,activeHref:o[n]?.href})},args:{itemCount:6,activeIndex:0,iconSize:`md`}},h={name:`Three items (minimum)`,render:(e,t)=>{let{brand:n,items:r}=f[t.globals.brand??`foundation`]??f.foundation,i=r.slice(0,3);return(0,d.jsx)(c,{items:i,brand:n,iconSize:`md`,activeHref:i[0].href})}},g={name:`Six items (maximum)`,render:(e,t)=>{let{brand:n,items:r}=f[t.globals.brand??`foundation`]??f.foundation;return(0,d.jsx)(c,{items:r,brand:n,iconSize:`md`,activeHref:r[2].href})}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  render: ({
    itemCount,
    iconSize,
    activeIndex
  }, context) => {
    const {
      brand,
      items
    } = BRAND_MAP[context.globals.brand ?? 'foundation'] ?? BRAND_MAP['foundation'];
    const sliced = items.slice(0, itemCount);
    return <QuickLinks items={sliced} brand={brand} iconSize={iconSize} activeHref={sliced[activeIndex]?.href} />;
  },
  args: {
    itemCount: 6,
    activeIndex: 0,
    iconSize: 'md'
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  name: 'Three items (minimum)',
  render: (_, context) => {
    const {
      brand,
      items
    } = BRAND_MAP[context.globals.brand ?? 'foundation'] ?? BRAND_MAP['foundation'];
    const sliced = items.slice(0, 3);
    return <QuickLinks items={sliced} brand={brand} iconSize="md" activeHref={sliced[0].href} />;
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  name: 'Six items (maximum)',
  render: (_, context) => {
    const {
      brand,
      items
    } = BRAND_MAP[context.globals.brand ?? 'foundation'] ?? BRAND_MAP['foundation'];
    return <QuickLinks items={items} brand={brand} iconSize="md" activeHref={items[2].href} />;
  }
}`,...g.parameters?.docs?.source}}},_=[`Default`,`ThreeItems`,`SixItems`]}))();export{m as Default,g as SixItems,h as ThreeItems,_ as __namedExportsOrder,p as default};