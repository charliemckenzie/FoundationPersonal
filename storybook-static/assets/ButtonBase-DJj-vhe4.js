import{n as e,o as t}from"./chunk-vNrZSFDR.js";import{t as n}from"./react-KkzZQhs-.js";import{t as r}from"./jsx-runtime-BiDZswiL.js";import{D as i,G as a,K as o,O as s,W as c,X as l,Y as u,i as d,n as f,ot as p,q as m,s as h,t as g}from"./DefaultPropsProvider-Cbvbar0X.js";import{a as _,c as v,d as y,f as b,i as x,l as ee,r as te,s as ne,t as S,u as re}from"./useTimeout-fzdBFCur.js";function C(e){try{return e.matches(`:focus-visible`)}catch{}return!1}var w=e((()=>{})),T=e((()=>{w()}));function ie(e){let{focusableWhenDisabled:t,disabled:n,composite:r=!1,tabIndex:i=0,isNativeButton:a}=e,o=r&&t!==!1,s=r&&t===!1;return E.useMemo(()=>{let e={onKeyDown(e){n&&t&&e.key!==`Tab`&&e.preventDefault()}};return r||(e.tabIndex=i,!a&&n&&(e.tabIndex=t?i:-1)),(a&&(t||o)||!a&&n)&&(e[`aria-disabled`]=n),a&&(!t||s)&&(e.disabled=n),e},[r,n,t,o,s,a,i])}var E,D=e((()=>{E=t(n(),1)}));function ae(e){let{nativeButton:t,nativeButtonProp:n,internalNativeButton:r=t,allowInferredHostMismatch:i=!1,disabled:a,type:o,hasFormAction:s=!1,tabIndex:c=0,focusableWhenDisabled:l,stopEventPropagation:u=!1,onBeforeKeyDown:d,onBeforeKeyUp:f}=e,p=O.useRef(null),m=l===!0,h=ie({focusableWhenDisabled:m,disabled:a,isNativeButton:t,tabIndex:c}),g=O.useCallback(()=>{let e=p.current;return e==null?t:e.tagName===`BUTTON`?!0:!!(e.tagName===`A`&&e.href)},[t]),_=O.useMemo(()=>{let e=m?{}:{tabIndex:a?-1:c};return t?(e.type=o===void 0&&!s?`button`:o,m||(e.disabled=a)):(e.role=`button`,!m&&a&&(e[`aria-disabled`]=a)),m?{...e,...h}:e},[a,m,h,s,t,c,o]);return{getButtonProps:O.useCallback((e=k)=>{let{onClick:t,onKeyDown:n,onKeyUp:r,...i}=e,o=e=>{if(u&&e.stopPropagation(),a){e.preventDefault();return}t?.(e)},s=e=>{if(m&&h.onKeyDown(e),!a&&(d?.(e),n?.(e),!(e.target!==e.currentTarget||g()))){if(e.key===` `){e.preventDefault();return}e.key===`Enter`&&(e.preventDefault(),e.currentTarget.click())}},c=e=>{a||(f?.(e),r?.(e),e.target===e.currentTarget&&!g()&&e.key===` `&&!e.defaultPrevented&&e.currentTarget.click())};return{..._,...i,onClick:o,onKeyDown:s,onKeyUp:c}},[_,a,m,h,g,d,f,u]),rootRef:p}}var O,k,oe=e((()=>{O=t(n(),1),D(),k={}})),se=e((()=>{ne()}));function ce(){return le.use()}function A(){let e,t,n=new Promise((n,r)=>{e=n,t=r});return n.resolve=e,n.reject=t,n}var j,le,M=e((()=>{j=t(n(),1),se(),le=class e{static create(){return new e}static use(){let t=v(e.create).current,[n,r]=j.useState(!1);return t.shouldMount=n,t.setShouldMount=r,j.useEffect(t.mountEffect,[n]),t}constructor(){this.ref={current:null},this.mounted=null,this.didMount=!1,this.shouldMount=!1,this.setShouldMount=null}mount(){return this.mounted||(this.mounted=A(),this.shouldMount=!0,this.setShouldMount(this.shouldMount)),this.mounted}mountEffect=()=>{this.shouldMount&&!this.didMount&&this.ref.current!==null&&(this.didMount=!0,this.mounted.resolve())};start(...e){this.mount().then(()=>this.ref.current?.start(...e))}stop(...e){this.mount().then(()=>this.ref.current?.stop(...e))}pulsate(...e){this.mount().then(()=>this.ref.current?.pulsate(...e))}}})),N=e((()=>{M()}));function P(e){let{className:t,classes:n,pulsate:r=!1,rippleX:i,rippleY:a,rippleSize:o,in:s,onExited:c,timeout:l}=e,[d,f]=F.useState(!1),p=u(t,n.ripple,n.rippleVisible,r&&n.ripplePulsate),m={width:o,height:o,top:-(o/2)+a,left:-(o/2)+i},h=u(n.child,d&&n.childLeaving,r&&n.childPulsate);return!s&&!d&&f(!0),F.useEffect(()=>{if(!s&&c!=null){let e=setTimeout(c,l);return()=>{clearTimeout(e)}}},[c,s,l]),(0,I.jsx)(`span`,{className:p,style:m,children:(0,I.jsx)(`span`,{className:h})})}var F,I,L=e((()=>{F=t(n(),1),l(),I=r()})),R,z=e((()=>{c(),R=a(`MuiTouchRipple`,[`root`,`ripple`,`rippleVisible`,`ripplePulsate`,`child`,`childLeaving`,`childPulsate`])})),B,V,H,U,W,G,K,q,ue,de=e((()=>{B=t(n(),1),x(),l(),S(),d(),g(),L(),z(),V=r(),H=550,U=p`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,W=p`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,G=p`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`,K=h(`span`,{name:`MuiTouchRipple`,slot:`Root`})({overflow:`hidden`,pointerEvents:`none`,position:`absolute`,zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:`inherit`}),q=h(P,{name:`MuiTouchRipple`,slot:`Ripple`})`
  opacity: 0;
  position: absolute;

  &.${R.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${U};
    animation-duration: ${H}ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
  }

  &.${R.ripplePulsate} {
    animation-duration: ${({theme:e})=>e.transitions.duration.shorter}ms;
  }

  & .${R.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${R.childLeaving} {
    opacity: 0;
    animation-name: ${W};
    animation-duration: ${H}ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
  }

  & .${R.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${G};
    animation-duration: 2500ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`,ue=B.forwardRef(function(e,t){let{center:n=!1,classes:r={},className:i,...a}=f({props:e,name:`MuiTouchRipple`}),[o,s]=B.useState([]),c=B.useRef(0),l=B.useRef(null);B.useEffect(()=>{l.current&&=(l.current(),null)},[o]);let d=B.useRef(!1),p=te(),m=B.useRef(null),h=B.useRef(null),g=B.useCallback(e=>{let{pulsate:t,rippleX:n,rippleY:i,rippleSize:a,cb:o}=e;s(e=>[...e,(0,V.jsx)(q,{classes:{ripple:u(r.ripple,R.ripple),rippleVisible:u(r.rippleVisible,R.rippleVisible),ripplePulsate:u(r.ripplePulsate,R.ripplePulsate),child:u(r.child,R.child),childLeaving:u(r.childLeaving,R.childLeaving),childPulsate:u(r.childPulsate,R.childPulsate)},timeout:H,pulsate:t,rippleX:n,rippleY:i,rippleSize:a},c.current)]),c.current+=1,l.current=o},[r]),v=B.useCallback((e={},t={},r=()=>{})=>{let{pulsate:i=!1,center:a=n||t.pulsate,fakeElement:o=!1}=t;if(e?.type===`mousedown`&&d.current){d.current=!1;return}e?.type===`touchstart`&&(d.current=!0);let s=o?null:h.current,c=s?s.getBoundingClientRect():{width:0,height:0,left:0,top:0},l,u,f;if(a||e===void 0||e.clientX===0&&e.clientY===0||!e.clientX&&!e.touches)l=Math.round(c.width/2),u=Math.round(c.height/2);else{let{clientX:t,clientY:n}=e.touches&&e.touches.length>0?e.touches[0]:e;l=Math.round(t-c.left),u=Math.round(n-c.top)}if(a)f=Math.sqrt((2*c.width**2+c.height**2)/3),f%2==0&&(f+=1);else{let e=Math.max(Math.abs((s?s.clientWidth:0)-l),l)*2+2,t=Math.max(Math.abs((s?s.clientHeight:0)-u),u)*2+2;f=Math.sqrt(e**2+t**2)}e?.touches?m.current===null&&(m.current=()=>{g({pulsate:i,rippleX:l,rippleY:u,rippleSize:f,cb:r})},p.start(80,()=>{m.current&&=(m.current(),null)})):g({pulsate:i,rippleX:l,rippleY:u,rippleSize:f,cb:r})},[n,g,p]),y=B.useCallback(()=>{v({},{pulsate:!0})},[v]),b=B.useCallback((e,t)=>{if(p.clear(),e?.type===`touchend`&&m.current){m.current(),m.current=null,p.start(0,()=>{b(e,t)});return}m.current=null,s(e=>e.length>0?e.slice(1):e),l.current=t},[p]);return B.useImperativeHandle(t,()=>({pulsate:y,start:v,stop:b}),[y,v,b]),(0,V.jsx)(K,{className:u(R.root,r.root,i),ref:h,...a,children:(0,V.jsx)(_,{component:null,exit:!0,children:o})})})}));function fe(e){return m(`MuiButtonBase`,e)}var J,Y=e((()=>{c(),o(),J=a(`MuiButtonBase`,[`root`,`disabled`,`focusVisible`])}));function X(e,t,n,r=!1){return b(i=>(n&&n(i),r||e[t](i),!0))}var Z,Q,pe,me,he,ge=e((()=>{Z=t(n(),1),l(),i(),T(),d(),g(),ee(),y(),oe(),N(),de(),Y(),Q=r(),pe=e=>{let{disabled:t,focusVisible:n,focusVisibleClassName:r,suppressFocusVisible:i,classes:a}=e,o=s({root:[`root`,t&&`disabled`,n&&!i&&`focusVisible`]},fe,a);return n&&!i&&r&&(o.root+=` ${r}`),o},me=h(`button`,{name:`MuiButtonBase`,slot:`Root`})({display:`inline-flex`,alignItems:`center`,justifyContent:`center`,position:`relative`,boxSizing:`border-box`,WebkitTapHighlightColor:`transparent`,backgroundColor:`transparent`,outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:`pointer`,userSelect:`none`,verticalAlign:`middle`,MozAppearance:`none`,WebkitAppearance:`none`,textDecoration:`none`,color:`inherit`,"&::-moz-focus-inner":{borderStyle:`none`},[`&.${J.disabled}`]:{pointerEvents:`none`,cursor:`default`},"@media print":{colorAdjust:`exact`}}),he=Z.forwardRef(function(e,t){let n=f({props:e,name:`MuiButtonBase`}),{action:r,centerRipple:i=!1,children:a,className:o,component:s=`button`,disabled:c=!1,disableRipple:l=!1,disableTouchRipple:d=!1,focusRipple:p=!1,focusVisibleClassName:m,focusableWhenDisabled:h,suppressFocusVisible:g=!1,internalNativeButton:_,LinkComponent:v=`a`,nativeButton:y,onBlur:x,onClick:ee,onContextMenu:te,onDragLeave:ne,onFocus:S,onFocusVisible:w,onKeyDown:T,onKeyUp:ie,onMouseDown:E,onMouseLeave:D,onMouseUp:O,onTouchEnd:k,onTouchMove:oe,onTouchStart:se,tabIndex:A=0,TouchRippleProps:j,touchRippleRef:le,type:M,...N}=n,P=!!(N.href||N.to),F=!!N.formAction,I=s;I===`button`&&P&&(I=v);let L=typeof I==`string`?I===`button`:_??!1,R=y??L,z=ce(),B=re(z.ref,le),[V,H]=Z.useState(!1);(c||g)&&V&&H(!1);let U=b(e=>{p&&!e.repeat&&V&&e.key===` `&&z.stop(e,()=>{z.start(e)})}),W=b(e=>{p&&e.key===` `&&V&&!e.defaultPrevented&&z.stop(e,()=>{z.pulsate(e)})}),{getButtonProps:G,rootRef:K}=ae({nativeButton:R,nativeButtonProp:y,internalNativeButton:L,allowInferredHostMismatch:P||typeof I==`string`,disabled:c,type:M,hasFormAction:F,tabIndex:A,onBeforeKeyDown:U,onBeforeKeyUp:W}),{onClick:q,onKeyDown:de,onKeyUp:fe,...J}=G({onClick:ee,onKeyDown:T,onKeyUp:ie});Z.useImperativeHandle(r,()=>({focusVisible:()=>{H(!0),K.current.focus()}}),[K]);let Y=z.shouldMount&&!l&&!c;Z.useEffect(()=>{V&&p&&!l&&z.pulsate()},[l,p,V,z]);let he=X(z,`start`,E,d),ge=X(z,`stop`,te,d),_e=X(z,`stop`,ne,d),ve=X(z,`stop`,O,d),ye=X(z,`stop`,e=>{V&&e.preventDefault(),D&&D(e)},d),be=X(z,`start`,se,d),xe=X(z,`stop`,k,d),Se=X(z,`stop`,oe,d),Ce=X(z,`stop`,e=>{C(e.target)||H(!1),x&&x(e)},!1),we=b(e=>{K.current||=e.currentTarget,!g&&C(e.target)&&(H(!0),w&&w(e)),S&&S(e)}),$={};P&&($.tabIndex=c?-1:A,c&&($[`aria-disabled`]=c),$.type=M);let Te=re(t,K),Ee={...n,centerRipple:i,component:s,disabled:c,disableRipple:l,disableTouchRipple:d,focusRipple:p,suppressFocusVisible:g,tabIndex:A,focusVisible:V},De=pe(Ee);return(0,Q.jsxs)(me,{as:I,className:u(De.root,o),ownerState:Ee,onBlur:Ce,onClick:q,onContextMenu:ge,onFocus:we,onKeyDown:de,onKeyUp:fe,onMouseDown:he,onMouseLeave:ye,onMouseUp:ve,onDragLeave:_e,onTouchEnd:xe,onTouchMove:Se,onTouchStart:be,ref:Te,...P?$:J,...N,children:[a,Y?(0,Q.jsx)(ue,{ref:B,center:i,...j}):null]})})})),_e=e((()=>{ge(),Y(),Y(),z(),z()}));export{C as i,he as n,T as r,_e as t};