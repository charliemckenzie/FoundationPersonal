import{n as e,s as t}from"./chunk-Bj-mKKzh.js";import{t as n}from"./react-DVKR3yZN.js";import{t as r}from"./jsx-runtime-CyI9ICYU.js";import{n as i,t as a}from"./Autocomplete-CqCGtr5e.js";function o({code:e,label:t}){let n=e.toLowerCase();return(0,c.jsx)(`img`,{loading:`lazy`,width:`20`,height:`15`,src:`https://flagcdn.com/w20/${n}.png`,srcSet:`https://flagcdn.com/w40/${n}.png 2x`,alt:t,style:{display:`block`,objectFit:`cover`}})}function s(){let[e,t]=(0,u.useState)(null);return(0,c.jsx)(`div`,{style:{width:360},children:(0,c.jsx)(a,{label:`Country`,options:g,value:e,onChange:t,placeholder:`Search for a country…`,helperText:e?`Selected: ${e.label}`:`Start typing to search`,groupBy:e=>f.has(e.value)?`Commonly Selected`:`All Countries`,renderOption:(e,t)=>(0,l.createElement)(`li`,{...e,key:t.value,style:{display:`flex`,alignItems:`center`,gap:10,fontSize:`1rem`},children:[(0,c.jsx)(o,{code:t.value,label:t.label}),t.label]})})})}var c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D;e((()=>{c=r(),l=t(n()),u=t(n()),i(),d=[{value:`apple`,label:`Apple`},{value:`banana`,label:`Banana`},{value:`cherry`,label:`Cherry`},{value:`durian`,label:`Durian`},{value:`elderberry`,label:`Elderberry`},{value:`fig`,label:`Fig`},{value:`grape`,label:`Grape`}],f=new Set([`AU`,`NZ`,`GB`]),p=[{value:`AF`,label:`Afghanistan`},{value:`AL`,label:`Albania`},{value:`DZ`,label:`Algeria`},{value:`AD`,label:`Andorra`},{value:`AO`,label:`Angola`},{value:`AG`,label:`Antigua and Barbuda`},{value:`AR`,label:`Argentina`},{value:`AM`,label:`Armenia`},{value:`AU`,label:`Australia`},{value:`AT`,label:`Austria`},{value:`AZ`,label:`Azerbaijan`},{value:`BS`,label:`Bahamas`},{value:`BH`,label:`Bahrain`},{value:`BD`,label:`Bangladesh`},{value:`BB`,label:`Barbados`},{value:`BY`,label:`Belarus`},{value:`BE`,label:`Belgium`},{value:`BZ`,label:`Belize`},{value:`BJ`,label:`Benin`},{value:`BT`,label:`Bhutan`},{value:`BO`,label:`Bolivia`},{value:`BA`,label:`Bosnia and Herzegovina`},{value:`BW`,label:`Botswana`},{value:`BR`,label:`Brazil`},{value:`BN`,label:`Brunei`},{value:`BG`,label:`Bulgaria`},{value:`BF`,label:`Burkina Faso`},{value:`BI`,label:`Burundi`},{value:`CV`,label:`Cabo Verde`},{value:`KH`,label:`Cambodia`},{value:`CM`,label:`Cameroon`},{value:`CA`,label:`Canada`},{value:`CF`,label:`Central African Republic`},{value:`TD`,label:`Chad`},{value:`CL`,label:`Chile`},{value:`CN`,label:`China`},{value:`CO`,label:`Colombia`},{value:`KM`,label:`Comoros`},{value:`CG`,label:`Congo`},{value:`CR`,label:`Costa Rica`},{value:`HR`,label:`Croatia`},{value:`CU`,label:`Cuba`},{value:`CY`,label:`Cyprus`},{value:`CZ`,label:`Czech Republic`},{value:`DK`,label:`Denmark`},{value:`DJ`,label:`Djibouti`},{value:`DM`,label:`Dominica`},{value:`DO`,label:`Dominican Republic`},{value:`EC`,label:`Ecuador`},{value:`EG`,label:`Egypt`},{value:`SV`,label:`El Salvador`},{value:`GQ`,label:`Equatorial Guinea`},{value:`ER`,label:`Eritrea`},{value:`EE`,label:`Estonia`},{value:`SZ`,label:`Eswatini`},{value:`ET`,label:`Ethiopia`},{value:`FJ`,label:`Fiji`},{value:`FI`,label:`Finland`},{value:`FR`,label:`France`},{value:`GA`,label:`Gabon`},{value:`GM`,label:`Gambia`},{value:`GE`,label:`Georgia`},{value:`DE`,label:`Germany`},{value:`GH`,label:`Ghana`},{value:`GR`,label:`Greece`},{value:`GD`,label:`Grenada`},{value:`GT`,label:`Guatemala`},{value:`GN`,label:`Guinea`},{value:`GW`,label:`Guinea-Bissau`},{value:`GY`,label:`Guyana`},{value:`HT`,label:`Haiti`},{value:`HN`,label:`Honduras`},{value:`HU`,label:`Hungary`},{value:`IS`,label:`Iceland`},{value:`IN`,label:`India`},{value:`ID`,label:`Indonesia`},{value:`IR`,label:`Iran`},{value:`IQ`,label:`Iraq`},{value:`IE`,label:`Ireland`},{value:`IL`,label:`Israel`},{value:`IT`,label:`Italy`},{value:`JM`,label:`Jamaica`},{value:`JP`,label:`Japan`},{value:`JO`,label:`Jordan`},{value:`KZ`,label:`Kazakhstan`},{value:`KE`,label:`Kenya`},{value:`KI`,label:`Kiribati`},{value:`KW`,label:`Kuwait`},{value:`KG`,label:`Kyrgyzstan`},{value:`LA`,label:`Laos`},{value:`LV`,label:`Latvia`},{value:`LB`,label:`Lebanon`},{value:`LS`,label:`Lesotho`},{value:`LR`,label:`Liberia`},{value:`LY`,label:`Libya`},{value:`LI`,label:`Liechtenstein`},{value:`LT`,label:`Lithuania`},{value:`LU`,label:`Luxembourg`},{value:`MG`,label:`Madagascar`},{value:`MW`,label:`Malawi`},{value:`MY`,label:`Malaysia`},{value:`MV`,label:`Maldives`},{value:`ML`,label:`Mali`},{value:`MT`,label:`Malta`},{value:`MH`,label:`Marshall Islands`},{value:`MR`,label:`Mauritania`},{value:`MU`,label:`Mauritius`},{value:`MX`,label:`Mexico`},{value:`FM`,label:`Micronesia`},{value:`MD`,label:`Moldova`},{value:`MC`,label:`Monaco`},{value:`MN`,label:`Mongolia`},{value:`ME`,label:`Montenegro`},{value:`MA`,label:`Morocco`},{value:`MZ`,label:`Mozambique`},{value:`MM`,label:`Myanmar`},{value:`NA`,label:`Namibia`},{value:`NR`,label:`Nauru`},{value:`NP`,label:`Nepal`},{value:`NL`,label:`Netherlands`},{value:`NZ`,label:`New Zealand`},{value:`NI`,label:`Nicaragua`},{value:`NE`,label:`Niger`},{value:`NG`,label:`Nigeria`},{value:`NO`,label:`Norway`},{value:`OM`,label:`Oman`},{value:`PK`,label:`Pakistan`},{value:`PW`,label:`Palau`},{value:`PA`,label:`Panama`},{value:`PG`,label:`Papua New Guinea`},{value:`PY`,label:`Paraguay`},{value:`PE`,label:`Peru`},{value:`PH`,label:`Philippines`},{value:`PL`,label:`Poland`},{value:`PT`,label:`Portugal`},{value:`QA`,label:`Qatar`},{value:`RO`,label:`Romania`},{value:`RU`,label:`Russia`},{value:`RW`,label:`Rwanda`},{value:`KN`,label:`Saint Kitts and Nevis`},{value:`LC`,label:`Saint Lucia`},{value:`VC`,label:`Saint Vincent and the Grenadines`},{value:`WS`,label:`Samoa`},{value:`SM`,label:`San Marino`},{value:`ST`,label:`Sao Tome and Principe`},{value:`SA`,label:`Saudi Arabia`},{value:`SN`,label:`Senegal`},{value:`RS`,label:`Serbia`},{value:`SC`,label:`Seychelles`},{value:`SL`,label:`Sierra Leone`},{value:`SG`,label:`Singapore`},{value:`SK`,label:`Slovakia`},{value:`SI`,label:`Slovenia`},{value:`SB`,label:`Solomon Islands`},{value:`SO`,label:`Somalia`},{value:`ZA`,label:`South Africa`},{value:`SS`,label:`South Sudan`},{value:`ES`,label:`Spain`},{value:`LK`,label:`Sri Lanka`},{value:`SD`,label:`Sudan`},{value:`SR`,label:`Suriname`},{value:`SE`,label:`Sweden`},{value:`CH`,label:`Switzerland`},{value:`SY`,label:`Syria`},{value:`TW`,label:`Taiwan`},{value:`TJ`,label:`Tajikistan`},{value:`TZ`,label:`Tanzania`},{value:`TH`,label:`Thailand`},{value:`TL`,label:`Timor-Leste`},{value:`TG`,label:`Togo`},{value:`TO`,label:`Tonga`},{value:`TT`,label:`Trinidad and Tobago`},{value:`TN`,label:`Tunisia`},{value:`TR`,label:`Turkey`},{value:`TM`,label:`Turkmenistan`},{value:`TV`,label:`Tuvalu`},{value:`UG`,label:`Uganda`},{value:`UA`,label:`Ukraine`},{value:`AE`,label:`United Arab Emirates`},{value:`GB`,label:`United Kingdom`},{value:`US`,label:`United States`},{value:`UY`,label:`Uruguay`},{value:`UZ`,label:`Uzbekistan`},{value:`VU`,label:`Vanuatu`},{value:`VE`,label:`Venezuela`},{value:`VN`,label:`Vietnam`},{value:`YE`,label:`Yemen`},{value:`ZM`,label:`Zambia`},{value:`ZW`,label:`Zimbabwe`}],m=p.filter(e=>f.has(e.value)),h=p.filter(e=>!f.has(e.value)),g=[...m,...h],_={title:`Form Components / Autocomplete`,component:a,tags:[`autodocs`],parameters:{layout:`centered`,docs:{description:{component:"Autocomplete is a searchable dropdown. Users type to filter a list of options — best when typing is faster than scrolling.\n\nFor short, fixed lists (under ~10 options), use `Select` instead. For complex grouped lists or custom option rendering, use the `groupBy` and `renderOption` props."}}},args:{error:!1,required:!1,disabled:!1,fullWidth:!1,loading:!1},argTypes:{size:{table:{disable:!0}},error:{control:`boolean`},required:{control:`boolean`},disabled:{control:`boolean`},fullWidth:{control:`boolean`},loading:{control:`boolean`},onChange:{table:{disable:!0}},renderOption:{table:{disable:!0}},id:{table:{disable:!0}},name:{table:{disable:!0}},value:{table:{disable:!0}},defaultValue:{table:{disable:!0}}}},v={name:`Playground`,parameters:{docs:{description:{story:``}}},args:{label:`Label`,options:d,placeholder:`Search…`,error:!1,required:!1,disabled:!1,fullWidth:!1,loading:!1},decorators:[e=>(0,c.jsx)(`div`,{style:{width:360},children:(0,c.jsx)(e,{})})]},y={parameters:{docs:{description:{story:"**Usage guidance:** Use when the option list is too long to browse by scrolling — typically more than 10–15 options. For short, fixed lists use `Select` instead."}}},args:{label:`Fruit`,options:d,placeholder:`Search…`},decorators:[e=>(0,c.jsx)(`div`,{style:{width:360},children:(0,c.jsx)(e,{})})]},b={parameters:{docs:{description:{story:"**Usage guidance:** Use `helperText` for persistent guidance displayed beneath the field."}}},args:{label:`Fruit`,options:d,placeholder:`Search…`,helperText:`Start typing to filter options.`},decorators:[e=>(0,c.jsx)(`div`,{style:{width:360},children:(0,c.jsx)(e,{})})]},x={parameters:{docs:{description:{story:"**Usage guidance:** Set `error` when validation fails. Pair with `helperText` to explain what went wrong."}}},args:{label:`Fruit`,options:d,placeholder:`Search…`,error:!0,helperText:`Please select an option.`},decorators:[e=>(0,c.jsx)(`div`,{style:{width:360},children:(0,c.jsx)(e,{})})]},S={parameters:{docs:{description:{story:"**Usage guidance:** Use `errorMessage` alongside `helperText` when you need both persistent context and a specific validation message on the same field."}}},args:{label:`Fruit`,options:d,placeholder:`Search…`,error:!0,helperText:`Start typing to filter options.`,errorMessage:`Please select an option.`},decorators:[e=>(0,c.jsx)(`div`,{style:{width:360},children:(0,c.jsx)(e,{})})]},C={parameters:{docs:{description:{story:"**Usage guidance:** Use `required` to mark mandatory fields."}}},args:{label:`Fruit`,options:d,placeholder:`Search…`,required:!0},decorators:[e=>(0,c.jsx)(`div`,{style:{width:360},children:(0,c.jsx)(e,{})})]},w={parameters:{docs:{description:{story:"**Usage guidance:** Use `disabled` when the field is not editable in the current state."}}},args:{label:`Fruit`,options:d,defaultValue:d[0],disabled:!0},decorators:[e=>(0,c.jsx)(`div`,{style:{width:360},children:(0,c.jsx)(e,{})})]},T={args:{label:`Fruit`,options:[],placeholder:`Search…`,loading:!0},decorators:[e=>(0,c.jsx)(`div`,{style:{width:360},children:(0,c.jsx)(e,{})})],parameters:{docs:{description:{story:"Pass `loading` when options are being fetched asynchronously. The listbox shows a loading indicator while the options array is empty."}}}},E={render:()=>(0,c.jsx)(s,{}),parameters:{docs:{description:{story:["A searchable country picker with flag images rendered via `renderOption`.",``,`Type any part of the country name to filter. Flag images are served from flagcdn.com using the ISO 3166-1 alpha-2 country code.`].join(`
`)}}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  name: 'Playground',
  parameters: {
    docs: {
      description: {
        story: ''
      }
    }
  },
  args: {
    label: 'Label',
    options: FRUIT_OPTIONS,
    placeholder: 'Search…',
    error: false,
    required: false,
    disabled: false,
    fullWidth: false,
    loading: false
  },
  decorators: [Story => <div style={{
    width: 360
  }}><Story /></div>]
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use when the option list is too long to browse by scrolling — typically more than 10–15 options. For short, fixed lists use \`Select\` instead.'
      }
    }
  },
  args: {
    label: 'Fruit',
    options: FRUIT_OPTIONS,
    placeholder: 'Search…'
  },
  decorators: [Story => <div style={{
    width: 360
  }}><Story /></div>]
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`helperText\` for persistent guidance displayed beneath the field.'
      }
    }
  },
  args: {
    label: 'Fruit',
    options: FRUIT_OPTIONS,
    placeholder: 'Search…',
    helperText: 'Start typing to filter options.'
  },
  decorators: [Story => <div style={{
    width: 360
  }}><Story /></div>]
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Set \`error\` when validation fails. Pair with \`helperText\` to explain what went wrong.'
      }
    }
  },
  args: {
    label: 'Fruit',
    options: FRUIT_OPTIONS,
    placeholder: 'Search…',
    error: true,
    helperText: 'Please select an option.'
  },
  decorators: [Story => <div style={{
    width: 360
  }}><Story /></div>]
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`errorMessage\` alongside \`helperText\` when you need both persistent context and a specific validation message on the same field.'
      }
    }
  },
  args: {
    label: 'Fruit',
    options: FRUIT_OPTIONS,
    placeholder: 'Search…',
    error: true,
    helperText: 'Start typing to filter options.',
    errorMessage: 'Please select an option.'
  },
  decorators: [Story => <div style={{
    width: 360
  }}><Story /></div>]
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`required\` to mark mandatory fields.'
      }
    }
  },
  args: {
    label: 'Fruit',
    options: FRUIT_OPTIONS,
    placeholder: 'Search…',
    required: true
  },
  decorators: [Story => <div style={{
    width: 360
  }}><Story /></div>]
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: '**Usage guidance:** Use \`disabled\` when the field is not editable in the current state.'
      }
    }
  },
  args: {
    label: 'Fruit',
    options: FRUIT_OPTIONS,
    defaultValue: FRUIT_OPTIONS[0],
    disabled: true
  },
  decorators: [Story => <div style={{
    width: 360
  }}><Story /></div>]
}`,...w.parameters?.docs?.source}}},T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Fruit',
    options: [],
    placeholder: 'Search…',
    loading: true
  },
  decorators: [Story => <div style={{
    width: 360
  }}><Story /></div>],
  parameters: {
    docs: {
      description: {
        story: 'Pass \`loading\` when options are being fetched asynchronously. The listbox shows a loading indicator while the options array is empty.'
      }
    }
  }
}`,...T.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: () => <CountrySelectDemo />,
  parameters: {
    docs: {
      description: {
        story: ['A searchable country picker with flag images rendered via \`renderOption\`.', '', 'Type any part of the country name to filter. Flag images are served from flagcdn.com using the ISO 3166-1 alpha-2 country code.'].join('\\n')
      }
    }
  }
}`,...E.parameters?.docs?.source}}},D=[`Playground`,`Default`,`WithHelperText`,`ErrorState`,`ErrorWithHelperText`,`Required`,`Disabled`,`Loading`,`CountrySelect`]}))();export{E as CountrySelect,y as Default,w as Disabled,x as ErrorState,S as ErrorWithHelperText,T as Loading,v as Playground,C as Required,b as WithHelperText,D as __namedExportsOrder,_ as default};