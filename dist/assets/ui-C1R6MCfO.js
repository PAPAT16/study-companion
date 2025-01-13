import{r as e}from"./vendor-C23GxzV5.js";let t,a,r,o={data:""},i=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,s=/\/\*[^]*?\*\/|  +/g,n=/\n+/g,l=(e,t)=>{let a="",r="",o="";for(let i in e){let s=e[i];"@"==i[0]?"i"==i[1]?a=i+" "+s+";":r+="f"==i[1]?l(s,i):i+"{"+l(s,"k"==i[1]?"":t)+"}":"object"==typeof s?r+=l(s,t?t.replace(/([^,])+/g,(e=>i.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,(t=>/&/.test(t)?t.replace(/&/g,e):e?e+" "+t:t)))):i):null!=s&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=l.p?l.p(i,s):i+":"+s+";")}return a+(t&&o?t+"{"+o+"}":o)+r},d={},c=e=>{if("object"==typeof e){let t="";for(let a in e)t+=a+c(e[a]);return t}return e};function p(e){let t=this||{},a=e.call?e(t.p):e;return((e,t,a,r,o)=>{let p=c(e),u=d[p]||(d[p]=(e=>{let t=0,a=11;for(;t<e.length;)a=101*a+e.charCodeAt(t++)>>>0;return"go"+a})(p));if(!d[u]){let t=p!==e?e:(e=>{let t,a,r=[{}];for(;t=i.exec(e.replace(s,""));)t[4]?r.shift():t[3]?(a=t[3].replace(n," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][t[1]]=t[2].replace(n," ").trim();return r[0]})(e);d[u]=l(o?{["@keyframes "+u]:t}:t,a?"":"."+u)}let m=a&&d.g?d.g:null;return a&&(d.g=d[u]),f=d[u],y=t,g=r,(h=m)?y.data=y.data.replace(h,f):-1===y.data.indexOf(f)&&(y.data=g?f+y.data:y.data+f),u;var f,y,g,h})(a.unshift?a.raw?((e,t,a)=>e.reduce(((e,r,o)=>{let i=t[o];if(i&&i.call){let e=i(a),t=e&&e.props&&e.props.className||/^go/.test(e)&&e;i=t?"."+t:e&&"object"==typeof e?e.props?"":l(e,""):!1===e?"":e}return e+r+(null==i?"":i)}),""))(a,[].slice.call(arguments,1),t.p):a.reduce(((e,a)=>Object.assign(e,a&&a.call?a(t.p):a)),{}):a,(r=t.target,"object"==typeof window?((r?r.querySelector("#_goober"):window._goober)||Object.assign((r||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:r||o),t.g,t.o,t.k);var r}p.bind({g:1});let u=p.bind({k:1});function m(e,o){let i=this||{};return function(){let o=arguments;return function s(n,l){let d=Object.assign({},n),c=d.className||s.className;i.p=Object.assign({theme:a&&a()},d),i.o=/ *go\d+/.test(c),d.className=p.apply(i,o)+(c?" "+c:"");let u=e;return e[0]&&(u=d.as||e,delete d.as),r&&u[0]&&r(d),t(u,d)}}}var f=(e,t)=>(e=>"function"==typeof e)(e)?e(t):e,y=(()=>{let e=0;return()=>(++e).toString()})(),g=(()=>{let e;return()=>{if(void 0===e&&typeof window<"u"){let t=matchMedia("(prefers-reduced-motion: reduce)");e=!t||t.matches}return e}})(),h=(e,t)=>{switch(t.type){case 0:return{...e,toasts:[t.toast,...e.toasts].slice(0,20)};case 1:return{...e,toasts:e.toasts.map((e=>e.id===t.toast.id?{...e,...t.toast}:e))};case 2:let{toast:a}=t;return h(e,{type:e.toasts.find((e=>e.id===a.id))?1:0,toast:a});case 3:let{toastId:r}=t;return{...e,toasts:e.toasts.map((e=>e.id===r||void 0===r?{...e,dismissed:!0,visible:!1}:e))};case 4:return void 0===t.toastId?{...e,toasts:[]}:{...e,toasts:e.toasts.filter((e=>e.id!==t.toastId))};case 5:return{...e,pausedAt:t.time};case 6:let o=t.time-(e.pausedAt||0);return{...e,pausedAt:void 0,toasts:e.toasts.map((e=>({...e,pauseDuration:e.pauseDuration+o})))}}},b=[],v={toasts:[],pausedAt:void 0},x=e=>{v=h(v,e),b.forEach((e=>{e(v)}))},w={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},E=e=>(t,a)=>{let r=((e,t="blank",a)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:t,ariaProps:{role:"status","aria-live":"polite"},message:e,pauseDuration:0,...a,id:(null==a?void 0:a.id)||y()}))(t,e,a);return x({type:2,toast:r}),r.id},$=(e,t)=>E("blank")(e,t);$.error=E("error"),$.success=E("success"),$.loading=E("loading"),$.custom=E("custom"),$.dismiss=e=>{x({type:3,toastId:e})},$.remove=e=>x({type:4,toastId:e}),$.promise=(e,t,a)=>{let r=$.loading(t.loading,{...a,...null==a?void 0:a.loading});return"function"==typeof e&&(e=e()),e.then((e=>{let o=t.success?f(t.success,e):void 0;return o?$.success(o,{id:r,...a,...null==a?void 0:a.success}):$.dismiss(r),e})).catch((e=>{let o=t.error?f(t.error,e):void 0;o?$.error(o,{id:r,...a,...null==a?void 0:a.error}):$.dismiss(r)})),e};var k,D,j,O,C=(e,t)=>{x({type:1,toast:{id:e,height:t}})},N=()=>{x({type:5,time:Date.now()})},z=new Map,A=t=>{let{toasts:a,pausedAt:r}=((t={})=>{let[a,r]=e.useState(v);e.useEffect((()=>(b.push(r),()=>{let e=b.indexOf(r);e>-1&&b.splice(e,1)})),[a]);let o=a.toasts.map((e=>{var a,r,o;return{...t,...t[e.type],...e,removeDelay:e.removeDelay||(null==(a=t[e.type])?void 0:a.removeDelay)||(null==t?void 0:t.removeDelay),duration:e.duration||(null==(r=t[e.type])?void 0:r.duration)||(null==t?void 0:t.duration)||w[e.type],style:{...t.style,...null==(o=t[e.type])?void 0:o.style,...e.style}}}));return{...a,toasts:o}})(t);e.useEffect((()=>{if(r)return;let e=Date.now(),t=a.map((t=>{if(t.duration===1/0)return;let a=(t.duration||0)+t.pauseDuration-(e-t.createdAt);if(!(a<0))return setTimeout((()=>$.dismiss(t.id)),a);t.visible&&$.dismiss(t.id)}));return()=>{t.forEach((e=>e&&clearTimeout(e)))}}),[a,r]);let o=e.useCallback((()=>{r&&x({type:6,time:Date.now()})}),[r]),i=e.useCallback(((e,t)=>{let{reverseOrder:r=!1,gutter:o=8,defaultPosition:i}=t||{},s=a.filter((t=>(t.position||i)===(e.position||i)&&t.height)),n=s.findIndex((t=>t.id===e.id)),l=s.filter(((e,t)=>t<n&&e.visible)).length;return s.filter((e=>e.visible)).slice(...r?[l+1]:[0,l]).reduce(((e,t)=>e+(t.height||0)+o),0)}),[a]);return e.useEffect((()=>{a.forEach((e=>{if(e.dismissed)((e,t=1e3)=>{if(z.has(e))return;let a=setTimeout((()=>{z.delete(e),x({type:4,toastId:e})}),t);z.set(e,a)})(e.id,e.removeDelay);else{let t=z.get(e.id);t&&(clearTimeout(t),z.delete(e.id))}}))}),[a]),{toasts:a,handlers:{updateHeight:C,startPause:N,endPause:o,calculateOffset:i}}},I=u`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,P=u`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,M=u`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,T=m("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${I} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${P} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${e=>e.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${M} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,F=u`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,H=m("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${e=>e.secondary||"#e0e0e0"};
  border-right-color: ${e=>e.primary||"#616161"};
  animation: ${F} 1s linear infinite;
`,S=u`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,_=u`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,L=m("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${e=>e.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${S} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${_} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${e=>e.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,U=m("div")`
  position: absolute;
`,q=m("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,B=u`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,R=m("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${B} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Y=({toast:t})=>{let{icon:a,type:r,iconTheme:o}=t;return void 0!==a?"string"==typeof a?e.createElement(R,null,a):a:"blank"===r?null:e.createElement(q,null,e.createElement(H,{...o}),"loading"!==r&&e.createElement(U,null,"error"===r?e.createElement(T,{...o}):e.createElement(L,{...o})))},Z=e=>`\n0% {transform: translate3d(0,${-200*e}%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n`,G=e=>`\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,${-150*e}%,-1px) scale(.6); opacity:0;}\n`,J=m("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,K=m("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,Q=e.memo((({toast:t,position:a,style:r,children:o})=>{let i=t.height?((e,t)=>{let a=e.includes("top")?1:-1,[r,o]=g()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[Z(a),G(a)];return{animation:t?`${u(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${u(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(t.position||a||"top-center",t.visible):{opacity:0},s=e.createElement(Y,{toast:t}),n=e.createElement(K,{...t.ariaProps},f(t.message,t));return e.createElement(J,{className:t.className,style:{...i,...r,...t.style}},"function"==typeof o?o({icon:s,message:n}):e.createElement(e.Fragment,null,s,n))}));k=e.createElement,l.p=D,t=k,a=j,r=O;var V=({id:t,className:a,style:r,onHeightUpdate:o,children:i})=>{let s=e.useCallback((e=>{if(e){let a=()=>{let a=e.getBoundingClientRect().height;o(t,a)};a(),new MutationObserver(a).observe(e,{subtree:!0,childList:!0,characterData:!0})}}),[t,o]);return e.createElement("div",{ref:s,className:a,style:r},i)},W=p`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,X=({reverseOrder:t,position:a="top-center",toastOptions:r,gutter:o,children:i,containerStyle:s,containerClassName:n})=>{let{toasts:l,handlers:d}=A(r);return e.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...s},className:n,onMouseEnter:d.startPause,onMouseLeave:d.endPause},l.map((r=>{let s=r.position||a,n=((e,t)=>{let a=e.includes("top"),r=a?{top:0}:{bottom:0},o=e.includes("center")?{justifyContent:"center"}:e.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:g()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${t*(a?1:-1)}px)`,...r,...o}})(s,d.calculateOffset(r,{reverseOrder:t,gutter:o,defaultPosition:a}));return e.createElement(V,{id:r.id,key:r.id,onHeightUpdate:d.updateHeight,className:r.visible?W:"",style:n},"custom"===r.type?f(r.message,r):i?i(r):e.createElement(Q,{toast:r,position:s}))})))},ee=$;export{X as D,ee as k};
//# sourceMappingURL=ui-C1R6MCfO.js.map
