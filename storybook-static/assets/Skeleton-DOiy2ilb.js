import{n as e,s as t}from"./chunk-Bj-mKKzh.js";import{t as n}from"./react-DVKR3yZN.js";import{t as r}from"./jsx-runtime-CyI9ICYU.js";import{M as i,N as a,at as o,bt as s,c,et as l,i as u,n as d,nt as f,ot as p,rt as m,t as h,tt as g,vt as _}from"./DefaultPropsProvider-ZDz6prh7.js";import{a as v,i as y,t as b}from"./styles-Dg3N12Hs.js";import{a as x,o as S}from"./createSimplePaletteValueFilter-C5qLWv87.js";function C(e){return m(`MuiSkeleton`,e)}var w=e((()=>{l(),f(),g(`MuiSkeleton`,[`root`,`text`,`rectangular`,`rounded`,`circular`,`pulse`,`wave`,`withChildren`,`fitContent`,`heightAuto`])})),T,E,D,O,k,A,j,M,N,P=e((()=>{T=t(n(),1),p(),i(),b(),u(),x(),h(),w(),E=r(),D=e=>{let{classes:t,variant:n,animation:r,hasChildren:i,width:o,height:s}=e;return a({root:[`root`,n,r,i&&`withChildren`,i&&!o&&`fitContent`,i&&!s&&`heightAuto`]},C,t)},O=s`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`,k=s`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`,A=typeof O==`string`?null:_`
        animation: ${O} 2s ease-in-out 0.5s infinite;
      `,j=typeof k==`string`?null:_`
        &::after {
          animation: ${k} 2s linear 0.5s infinite;
        }
      `,M=c(`span`,{name:`MuiSkeleton`,slot:`Root`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,t[n.variant],n.animation!==!1&&t[n.animation],n.hasChildren&&t.withChildren,n.hasChildren&&!n.width&&t.fitContent,n.hasChildren&&!n.height&&t.heightAuto]}})(S(({theme:e})=>{let t=y(e.shape.borderRadius)||`px`,n=v(e.shape.borderRadius);return{display:`block`,backgroundColor:e.vars?e.vars.palette.Skeleton.bg:e.alpha(e.palette.text.primary,e.palette.mode===`light`?.11:.13),height:`1.2em`,variants:[{props:{variant:`text`},style:{marginTop:0,marginBottom:0,height:`auto`,transformOrigin:`0 55%`,transform:`scale(1, 0.60)`,borderRadius:`${n}${t}/${Math.round(n/.6*10)/10}${t}`,"&:empty:before":{content:`"\\00a0"`}}},{props:{variant:`circular`},style:{borderRadius:`50%`}},{props:{variant:`rounded`},style:{borderRadius:(e.vars||e).shape.borderRadius}},{props:({ownerState:e})=>e.hasChildren,style:{"& > *":{visibility:`hidden`}}},{props:({ownerState:e})=>e.hasChildren&&!e.width,style:{maxWidth:`fit-content`}},{props:({ownerState:e})=>e.hasChildren&&!e.height,style:{height:`auto`}},{props:{animation:`pulse`},style:A||{animation:`${O} 2s ease-in-out 0.5s infinite`}},{props:{animation:`wave`},style:{position:`relative`,overflow:`hidden`,WebkitMaskImage:`-webkit-radial-gradient(white, black)`,"&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(e.vars||e).palette.action.hover},
                transparent
              )`,content:`""`,position:`absolute`,transform:`translateX(-100%)`,bottom:0,left:0,right:0,top:0}}},{props:{animation:`wave`},style:j||{"&::after":{animation:`${k} 2s linear 0.5s infinite`}}}]}})),N=T.forwardRef(function(e,t){let n=d({props:e,name:`MuiSkeleton`}),{animation:r=`pulse`,className:i,component:a=`span`,height:s,style:c,variant:l=`text`,width:u,...f}=n,p={...n,animation:r,component:a,variant:l,hasChildren:!!f.children};return(0,E.jsx)(M,{as:a,ref:t,className:o(D(p).root,i),ownerState:p,...f,style:{width:u,height:s,...c}})})})),F=e((()=>{P(),w(),w()}));export{N as n,F as t};