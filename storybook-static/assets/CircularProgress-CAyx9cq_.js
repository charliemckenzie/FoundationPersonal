import{n as e,o as t}from"./chunk-vNrZSFDR.js";import{t as n}from"./react-KkzZQhs-.js";import{t as r}from"./jsx-runtime-BiDZswiL.js";import{D as i,G as a,K as o,O as s,W as c,X as l,Y as u,at as d,i as f,n as p,ot as m,q as h,s as g,t as _}from"./DefaultPropsProvider-Cbvbar0X.js";import{a as v,i as y,n as b,o as x,r as S,t as C}from"./createSimplePaletteValueFilter-DIBsrO6R.js";function w(e){return h(`MuiCircularProgress`,e)}var T=e((()=>{c(),o(),a(`MuiCircularProgress`,[`root`,`determinate`,`indeterminate`,`colorPrimary`,`colorSecondary`,`svg`,`track`,`circle`,`circleDisableShrink`])})),E,D,O,k,A,j,M,N,P,F,I,L,R,z=e((()=>{E=t(n(),1),l(),i(),f(),v(),_(),y(),b(),T(),D=r(),O=44,k=m`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,A=m`
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
`,j=typeof k==`string`?null:d`
        animation: ${k} 1.4s linear infinite;
      `,M=typeof A==`string`?null:d`
        animation: ${A} 1.4s ease-in-out infinite;
      `,N=e=>{let{classes:t,variant:n,color:r,disableShrink:i}=e;return s({root:[`root`,n,`color${S(r)}`],svg:[`svg`],track:[`track`],circle:[`circle`,i&&`circleDisableShrink`]},w,t)},P=g(`span`,{name:`MuiCircularProgress`,slot:`Root`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,t[n.variant],t[`color${S(n.color)}`]]}})(x(({theme:e})=>({display:`inline-block`,variants:[{props:{variant:`determinate`},style:{transition:e.transitions.create(`transform`)}},{props:{variant:`indeterminate`},style:j||{animation:`${k} 1.4s linear infinite`}},...Object.entries(e.palette).filter(C()).map(([t])=>({props:{color:t},style:{color:(e.vars||e).palette[t].main}}))]}))),F=g(`svg`,{name:`MuiCircularProgress`,slot:`Svg`})({display:`block`}),I=g(`circle`,{name:`MuiCircularProgress`,slot:`Circle`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.circle,n.disableShrink&&t.circleDisableShrink]}})(x(({theme:e})=>({stroke:`currentColor`,variants:[{props:{variant:`determinate`},style:{transition:e.transitions.create(`stroke-dashoffset`)}},{props:{variant:`indeterminate`},style:{strokeDasharray:`80px, 200px`,strokeDashoffset:0}},{props:({ownerState:e})=>e.variant===`indeterminate`&&!e.disableShrink,style:M||{animation:`${A} 1.4s ease-in-out infinite`}}]}))),L=g(`circle`,{name:`MuiCircularProgress`,slot:`Track`})(x(({theme:e})=>({stroke:`currentColor`,opacity:(e.vars||e).palette.action.activatedOpacity}))),R=E.forwardRef(function(e,t){let n=p({props:e,name:`MuiCircularProgress`}),{className:r,color:i=`primary`,disableShrink:a=!1,enableTrackSlot:o=!1,size:s=40,style:c,thickness:l=3.6,value:d=0,variant:f=`indeterminate`,...m}=n,h={...n,color:i,disableShrink:a,size:s,thickness:l,value:d,variant:f,enableTrackSlot:o},g=N(h),_={},v={},y={};if(f===`determinate`){let e=2*Math.PI*((O-l)/2);_.strokeDasharray=e.toFixed(3),y[`aria-valuenow`]=Math.round(d),_.strokeDashoffset=`${((100-d)/100*e).toFixed(3)}px`,v.transform=`rotate(-90deg)`}return(0,D.jsx)(P,{className:u(g.root,r),style:{width:s,height:s,...v,...c},ownerState:h,ref:t,role:`progressbar`,...y,...m,children:(0,D.jsxs)(F,{className:g.svg,ownerState:h,viewBox:`${O/2} ${O/2} ${O} ${O}`,children:[o?(0,D.jsx)(L,{className:g.track,ownerState:h,cx:O,cy:O,r:(O-l)/2,fill:`none`,strokeWidth:l,"aria-hidden":`true`}):null,(0,D.jsx)(I,{className:g.circle,style:_,ownerState:h,cx:O,cy:O,r:(O-l)/2,fill:`none`,strokeWidth:l})]})})})})),B=e((()=>{z(),T(),T()}));export{R as n,B as t};