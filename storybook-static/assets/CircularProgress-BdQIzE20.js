import{n as e,s as t}from"./chunk-Bj-mKKzh.js";import{t as n}from"./react-DVKR3yZN.js";import{t as r}from"./jsx-runtime-CyI9ICYU.js";import{M as i,N as a,at as o,bt as s,c,et as l,i as u,n as d,nt as f,ot as p,rt as m,t as h,tt as g,vt as _}from"./DefaultPropsProvider-ZDz6prh7.js";import{a as v,i as y,n as b,o as x,r as S,t as C}from"./createSimplePaletteValueFilter-C5qLWv87.js";function w(e){return m(`MuiCircularProgress`,e)}var T=e((()=>{l(),f(),g(`MuiCircularProgress`,[`root`,`determinate`,`indeterminate`,`colorPrimary`,`colorSecondary`,`svg`,`track`,`circle`,`circleDisableShrink`])})),E,D,O,k,A,j,M,N,P,F,I,L,R,z=e((()=>{E=t(n(),1),p(),i(),u(),v(),h(),y(),b(),T(),D=r(),O=44,k=s`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,A=s`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`,j=typeof k==`string`?null:_`
        animation: ${k} 1.4s linear infinite;
      `,M=typeof A==`string`?null:_`
        animation: ${A} 1.4s ease-in-out infinite;
      `,N=e=>{let{classes:t,variant:n,color:r,disableShrink:i}=e;return a({root:[`root`,n,`color${S(r)}`],svg:[`svg`],track:[`track`],circle:[`circle`,i&&`circleDisableShrink`]},w,t)},P=c(`span`,{name:`MuiCircularProgress`,slot:`Root`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,t[n.variant],t[`color${S(n.color)}`]]}})(x(({theme:e})=>({display:`inline-block`,variants:[{props:{variant:`determinate`},style:{transition:e.transitions.create(`transform`)}},{props:{variant:`indeterminate`},style:j||{animation:`${k} 1.4s linear infinite`}},...Object.entries(e.palette).filter(C()).map(([t])=>({props:{color:t},style:{color:(e.vars||e).palette[t].main}}))]}))),F=c(`svg`,{name:`MuiCircularProgress`,slot:`Svg`})({display:`block`}),I=c(`circle`,{name:`MuiCircularProgress`,slot:`Circle`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.circle,n.disableShrink&&t.circleDisableShrink]}})(x(({theme:e})=>({stroke:`currentColor`,variants:[{props:{variant:`determinate`},style:{transition:e.transitions.create(`stroke-dashoffset`)}},{props:{variant:`indeterminate`},style:{strokeDasharray:`80px, 200px`,strokeDashoffset:0}},{props:({ownerState:e})=>e.variant===`indeterminate`&&!e.disableShrink,style:M||{animation:`${A} 1.4s ease-in-out infinite`}}]}))),L=c(`circle`,{name:`MuiCircularProgress`,slot:`Track`})(x(({theme:e})=>({stroke:`currentColor`,opacity:(e.vars||e).palette.action.activatedOpacity}))),R=E.forwardRef(function(e,t){let n=d({props:e,name:`MuiCircularProgress`}),{className:r,color:i=`primary`,disableShrink:a=!1,enableTrackSlot:s=!1,size:c=40,style:l,thickness:u=3.6,value:f=0,variant:p=`indeterminate`,...m}=n,h={...n,color:i,disableShrink:a,size:c,thickness:u,value:f,variant:p,enableTrackSlot:s},g=N(h),_={},v={},y={};if(p===`determinate`){let e=2*Math.PI*((O-u)/2);_.strokeDasharray=e.toFixed(3),y[`aria-valuenow`]=Math.round(f),_.strokeDashoffset=`${((100-f)/100*e).toFixed(3)}px`,v.transform=`rotate(-90deg)`}return(0,D.jsx)(P,{className:o(g.root,r),style:{width:c,height:c,...v,...l},ownerState:h,ref:t,role:`progressbar`,...y,...m,children:(0,D.jsxs)(F,{className:g.svg,ownerState:h,viewBox:`${O/2} ${O/2} ${O} ${O}`,children:[s?(0,D.jsx)(L,{className:g.track,ownerState:h,cx:O,cy:O,r:(O-u)/2,fill:`none`,strokeWidth:u,"aria-hidden":`true`}):null,(0,D.jsx)(I,{className:g.circle,style:_,ownerState:h,cx:O,cy:O,r:(O-u)/2,fill:`none`,strokeWidth:u})]})})})})),B=e((()=>{z(),T(),T()}));export{R as n,B as t};