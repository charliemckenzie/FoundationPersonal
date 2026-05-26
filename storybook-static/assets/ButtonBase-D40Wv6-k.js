import{n as e,s as t}from"./chunk-Bj-mKKzh.js";import{t as n}from"./react-DVKR3yZN.js";import{t as r}from"./jsx-runtime-CyI9ICYU.js";import{M as i,N as a,at as o,bt as s,c,et as l,i as u,n as d,nt as f,ot as p,rt as m,t as h,tt as g}from"./DefaultPropsProvider-ZDz6prh7.js";import{a as _,c as v,d as y,h as b,i as x,l as S,m as ee,r as te,t as ne,u as C}from"./useTimeout-CbfArO4G.js";function w(e){try{return e.matches(`:focus-visible`)}catch{}return!1}var T=e((()=>{})),E=e((()=>{T()}));function re(e){let{focusableWhenDisabled:t,disabled:n,composite:r=!1,tabIndex:i=0,isNativeButton:a}=e,o=r&&t!==!1,s=r&&t===!1;return D.useMemo(()=>{let e={onKeyDown(e){n&&t&&e.key!==`Tab`&&e.preventDefault()}};return r||(e.tabIndex=i,!a&&n&&(e.tabIndex=t?i:-1)),(a&&(t||o)||!a&&n)&&(e[`aria-disabled`]=n),a&&(!t||s)&&(e.disabled=n),e},[r,n,t,o,s,a,i])}var D,O=e((()=>{D=t(n(),1)}));function ie(e){let{nativeButton:t,nativeButtonProp:n,internalNativeButton:r=t,allowInferredHostMismatch:i=!1,disabled:a,type:o,hasFormAction:s=!1,tabIndex:c=0,focusableWhenDisabled:l,stopEventPropagation:u=!1,onBeforeKeyDown:d,onBeforeKeyUp:f}=e,p=k.useRef(null),m=l===!0,h=re({focusableWhenDisabled:m,disabled:a,isNativeButton:t,tabIndex:c}),g=k.useCallback(()=>{let e=p.current;return e==null?t:e.tagName===`BUTTON`?!0:!!(e.tagName===`A`&&e.href)},[t]),_=k.useMemo(()=>{let e=m?{}:{tabIndex:a?-1:c};return t?(e.type=o===void 0&&!s?`button`:o,m||(e.disabled=a)):(e.role=`button`,!m&&a&&(e[`aria-disabled`]=a)),m?{...e,...h}:e},[a,m,h,s,t,c,o]);return{getButtonProps:k.useCallback((e=A)=>{let{onClick:t,onKeyDown:n,onKeyUp:r,...i}=e,o=e=>{if(u&&e.stopPropagation(),a){e.preventDefault();return}t?.(e)},s=e=>{if(m&&h.onKeyDown(e),!a&&(d?.(e),n?.(e),!(e.target!==e.currentTarget||g()))){if(e.key===` `){e.preventDefault();return}e.key===`Enter`&&(e.preventDefault(),e.currentTarget.click())}},c=e=>{a||(f?.(e),r?.(e),e.target===e.currentTarget&&!g()&&e.key===` `&&!e.defaultPrevented&&e.currentTarget.click())};return{..._,...i,onClick:o,onKeyDown:s,onKeyUp:c}},[_,a,m,h,g,d,f,u]),rootRef:p}}var k,A,ae=e((()=>{k=t(n(),1),O(),A={}})),oe=e((()=>{v()}));function se(){return ce.use()}function j(){let e,t,n=new Promise((n,r)=>{e=n,t=r});return n.resolve=e,n.reject=t,n}var M,ce,N=e((()=>{M=t(n(),1),oe(),ce=class e{static create(){return new e}static use(){let t=S(e.create).current,[n,r]=M.useState(!1);return t.shouldMount=n,t.setShouldMount=r,M.useEffect(t.mountEffect,[n]),t}constructor(){this.ref={current:null},this.mounted=null,this.didMount=!1,this.shouldMount=!1,this.setShouldMount=null}mount(){return this.mounted||(this.mounted=j(),this.shouldMount=!0,this.setShouldMount(this.shouldMount)),this.mounted}mountEffect=()=>{this.shouldMount&&!this.didMount&&this.ref.current!==null&&(this.didMount=!0,this.mounted.resolve())};start(...e){this.mount().then(()=>this.ref.current?.start(...e))}stop(...e){this.mount().then(()=>this.ref.current?.stop(...e))}pulsate(...e){this.mount().then(()=>this.ref.current?.pulsate(...e))}}})),P=e((()=>{N()}));function F(e){let{className:t,classes:n,pulsate:r=!1,rippleX:i,rippleY:a,rippleSize:s,in:c,onExited:l,timeout:u}=e,[d,f]=I.useState(!1),p=o(t,n.ripple,n.rippleVisible,r&&n.ripplePulsate),m={width:s,height:s,top:-(s/2)+a,left:-(s/2)+i},h=o(n.child,d&&n.childLeaving,r&&n.childPulsate);return!c&&!d&&f(!0),I.useEffect(()=>{if(!c&&l!=null){let e=setTimeout(l,u);return()=>{clearTimeout(e)}}},[l,c,u]),(0,L.jsx)(`span`,{className:p,style:m,children:(0,L.jsx)(`span`,{className:h})})}var I,L,R=e((()=>{I=t(n(),1),p(),L=r()})),z,B=e((()=>{l(),z=g(`MuiTouchRipple`,[`root`,`ripple`,`rippleVisible`,`ripplePulsate`,`child`,`childLeaving`,`childPulsate`])})),V,H,U,W,G,K,q,J,le,ue=e((()=>{V=t(n(),1),x(),p(),ne(),u(),h(),R(),B(),H=r(),U=550,W=s`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,G=s`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,K=s`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`,q=c(`span`,{name:`MuiTouchRipple`,slot:`Root`})({overflow:`hidden`,pointerEvents:`none`,position:`absolute`,zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:`inherit`}),J=c(F,{name:`MuiTouchRipple`,slot:`Ripple`})`
  opacity: 0;
  position: absolute;

  &.${z.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${W};
    animation-duration: ${U}ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
  }

  &.${z.ripplePulsate} {
    animation-duration: ${({theme:e})=>e.transitions.duration.shorter}ms;
  }

  & .${z.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${z.childLeaving} {
    opacity: 0;
    animation-name: ${G};
    animation-duration: ${U}ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
  }

  & .${z.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${K};
    animation-duration: 2500ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`,le=V.forwardRef(function(e,t){let{center:n=!1,classes:r={},className:i,...a}=d({props:e,name:`MuiTouchRipple`}),[s,c]=V.useState([]),l=V.useRef(0),u=V.useRef(null);V.useEffect(()=>{u.current&&=(u.current(),null)},[s]);let f=V.useRef(!1),p=te(),m=V.useRef(null),h=V.useRef(null),g=V.useCallback(e=>{let{pulsate:t,rippleX:n,rippleY:i,rippleSize:a,cb:s}=e;c(e=>[...e,(0,H.jsx)(J,{classes:{ripple:o(r.ripple,z.ripple),rippleVisible:o(r.rippleVisible,z.rippleVisible),ripplePulsate:o(r.ripplePulsate,z.ripplePulsate),child:o(r.child,z.child),childLeaving:o(r.childLeaving,z.childLeaving),childPulsate:o(r.childPulsate,z.childPulsate)},timeout:U,pulsate:t,rippleX:n,rippleY:i,rippleSize:a},l.current)]),l.current+=1,u.current=s},[r]),v=V.useCallback((e={},t={},r=()=>{})=>{let{pulsate:i=!1,center:a=n||t.pulsate,fakeElement:o=!1}=t;if(e?.type===`mousedown`&&f.current){f.current=!1;return}e?.type===`touchstart`&&(f.current=!0);let s=o?null:h.current,c=s?s.getBoundingClientRect():{width:0,height:0,left:0,top:0},l,u,d;if(a||e===void 0||e.clientX===0&&e.clientY===0||!e.clientX&&!e.touches)l=Math.round(c.width/2),u=Math.round(c.height/2);else{let{clientX:t,clientY:n}=e.touches&&e.touches.length>0?e.touches[0]:e;l=Math.round(t-c.left),u=Math.round(n-c.top)}if(a)d=Math.sqrt((2*c.width**2+c.height**2)/3),d%2==0&&(d+=1);else{let e=Math.max(Math.abs((s?s.clientWidth:0)-l),l)*2+2,t=Math.max(Math.abs((s?s.clientHeight:0)-u),u)*2+2;d=Math.sqrt(e**2+t**2)}e?.touches?m.current===null&&(m.current=()=>{g({pulsate:i,rippleX:l,rippleY:u,rippleSize:d,cb:r})},p.start(80,()=>{m.current&&=(m.current(),null)})):g({pulsate:i,rippleX:l,rippleY:u,rippleSize:d,cb:r})},[n,g,p]),y=V.useCallback(()=>{v({},{pulsate:!0})},[v]),b=V.useCallback((e,t)=>{if(p.clear(),e?.type===`touchend`&&m.current){m.current(),m.current=null,p.start(0,()=>{b(e,t)});return}m.current=null,c(e=>e.length>0?e.slice(1):e),u.current=t},[p]);return V.useImperativeHandle(t,()=>({pulsate:y,start:v,stop:b}),[y,v,b]),(0,H.jsx)(q,{className:o(z.root,r.root,i),ref:h,...a,children:(0,H.jsx)(_,{component:null,exit:!0,children:s})})})}));function de(e){return m(`MuiButtonBase`,e)}var Y,X=e((()=>{l(),f(),Y=g(`MuiButtonBase`,[`root`,`disabled`,`focusVisible`])}));function Z(e,t,n,r=!1){return y(i=>(n&&n(i),r||e[t](i),!0))}var Q,fe,pe,me,he,ge=e((()=>{Q=t(n(),1),p(),i(),E(),u(),h(),ee(),C(),ae(),P(),ue(),X(),fe=r(),pe=e=>{let{disabled:t,focusVisible:n,focusVisibleClassName:r,suppressFocusVisible:i,classes:o}=e,s=a({root:[`root`,t&&`disabled`,n&&!i&&`focusVisible`]},de,o);return n&&!i&&r&&(s.root+=` ${r}`),s},me=c(`button`,{name:`MuiButtonBase`,slot:`Root`})({display:`inline-flex`,alignItems:`center`,justifyContent:`center`,position:`relative`,boxSizing:`border-box`,WebkitTapHighlightColor:`transparent`,backgroundColor:`transparent`,outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:`pointer`,userSelect:`none`,verticalAlign:`middle`,MozAppearance:`none`,WebkitAppearance:`none`,textDecoration:`none`,color:`inherit`,"&::-moz-focus-inner":{borderStyle:`none`},[`&.${Y.disabled}`]:{pointerEvents:`none`,cursor:`default`},"@media print":{colorAdjust:`exact`}}),he=Q.forwardRef(function(e,t){let n=d({props:e,name:`MuiButtonBase`}),{action:r,centerRipple:i=!1,children:a,className:s,component:c=`button`,disabled:l=!1,disableRipple:u=!1,disableTouchRipple:f=!1,focusRipple:p=!1,focusVisibleClassName:m,focusableWhenDisabled:h,suppressFocusVisible:g=!1,internalNativeButton:_,LinkComponent:v=`a`,nativeButton:x,onBlur:S,onClick:ee,onContextMenu:te,onDragLeave:ne,onFocus:C,onFocusVisible:T,onKeyDown:E,onKeyUp:re,onMouseDown:D,onMouseLeave:O,onMouseUp:k,onTouchEnd:A,onTouchMove:ae,onTouchStart:oe,tabIndex:j=0,TouchRippleProps:M,touchRippleRef:ce,type:N,...P}=n,F=!!(P.href||P.to),I=!!P.formAction,L=c;L===`button`&&F&&(L=v);let R=typeof L==`string`?L===`button`:_??!1,z=x??R,B=se(),V=b(B.ref,ce),[H,U]=Q.useState(!1);(l||g)&&H&&U(!1);let W=y(e=>{p&&!e.repeat&&H&&e.key===` `&&B.stop(e,()=>{B.start(e)})}),G=y(e=>{p&&e.key===` `&&H&&!e.defaultPrevented&&B.stop(e,()=>{B.pulsate(e)})}),{getButtonProps:K,rootRef:q}=ie({nativeButton:z,nativeButtonProp:x,internalNativeButton:R,allowInferredHostMismatch:F||typeof L==`string`,disabled:l,type:N,hasFormAction:I,tabIndex:j,onBeforeKeyDown:W,onBeforeKeyUp:G}),{onClick:J,onKeyDown:ue,onKeyUp:de,...Y}=K({onClick:ee,onKeyDown:E,onKeyUp:re});Q.useImperativeHandle(r,()=>({focusVisible:()=>{U(!0),q.current.focus()}}),[q]);let X=B.shouldMount&&!u&&!l;Q.useEffect(()=>{H&&p&&!u&&B.pulsate()},[u,p,H,B]);let he=Z(B,`start`,D,f),ge=Z(B,`stop`,te,f),_e=Z(B,`stop`,ne,f),ve=Z(B,`stop`,k,f),ye=Z(B,`stop`,e=>{H&&e.preventDefault(),O&&O(e)},f),be=Z(B,`start`,oe,f),xe=Z(B,`stop`,A,f),Se=Z(B,`stop`,ae,f),Ce=Z(B,`stop`,e=>{w(e.target)||U(!1),S&&S(e)},!1),we=y(e=>{q.current||=e.currentTarget,!g&&w(e.target)&&(U(!0),T&&T(e)),C&&C(e)}),$={};F&&($.tabIndex=l?-1:j,l&&($[`aria-disabled`]=l),$.type=N);let Te=b(t,q),Ee={...n,centerRipple:i,component:c,disabled:l,disableRipple:u,disableTouchRipple:f,focusRipple:p,suppressFocusVisible:g,tabIndex:j,focusVisible:H},De=pe(Ee);return(0,fe.jsxs)(me,{as:L,className:o(De.root,s),ownerState:Ee,onBlur:Ce,onClick:J,onContextMenu:ge,onFocus:we,onKeyDown:ue,onKeyUp:de,onMouseDown:he,onMouseLeave:ye,onMouseUp:ve,onDragLeave:_e,onTouchEnd:xe,onTouchMove:Se,onTouchStart:be,ref:Te,...F?$:Y,...P,children:[a,X?(0,fe.jsx)(le,{ref:V,center:i,...M}):null]})})})),_e=e((()=>{ge(),X(),X(),B(),B()}));export{w as i,he as n,E as r,_e as t};