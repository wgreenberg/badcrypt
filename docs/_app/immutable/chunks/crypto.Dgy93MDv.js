var m=Object.defineProperty;var D=(e,r,t)=>r in e?m(e,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[r]=t;var l=(e,r,t)=>D(e,typeof r!="symbol"?r+"":r,t);import{K as S,L as b,N as J,B as x,h as u,ap as G,aq as C,a9 as I,ar as F,as as Q,r as E,O as U,q as k}from"./runtime.CpPTpihc.js";import{i as V}from"./index-client.DIn6mBrw.js";let B=!1;function T(){B||(B=!0,document.addEventListener("reset",e=>{Promise.resolve().then(()=>{var r;if(!e.defaultPrevented)for(const t of e.target.elements)(r=t.__on_r)==null||r.call(t)})},{capture:!0}))}function Y(e){var r=J,t=x;S(null),b(null);try{return e()}finally{S(r),b(t)}}function P(e,r,t,n=t){e.addEventListener(r,()=>Y(t));const s=e.__on_r;s?e.__on_r=()=>{s(),n()}:e.__on_r=n,T()}function se(e){if(u){var r=!1,t=()=>{if(!r){if(r=!0,e.hasAttribute("value")){var n=e.value;N(e,"value",null),e.value=n}if(e.hasAttribute("checked")){var s=e.checked;N(e,"checked",null),e.checked=s}}};e.__on_r=t,G(t),T()}}function ne(e,r){var t=e.__attributes??(e.__attributes={});t.value===(t.value=r)||e.value===r&&(r!==0||e.nodeName!=="PROGRESS")||(e.value=r)}function N(e,r,t,n){var s=e.__attributes??(e.__attributes={});u&&(s[r]=e.getAttribute(r),r==="src"||r==="srcset"||r==="href"&&e.nodeName==="LINK")||s[r]!==(s[r]=t)&&(r==="style"&&"__styles"in e&&(e.__styles={}),r==="loading"&&(e[C]=t),t==null?e.removeAttribute(r):typeof t!="string"&&j(e).includes(r)?e[r]=t:e.setAttribute(r,t))}var A=new Map;function j(e){var r=A.get(e.nodeName);if(r)return r;A.set(e.nodeName,r=[]);for(var t,n=I(e),s=Element.prototype;s!==n;){t=F(n);for(var o in t)t[o].set&&r.push(o);n=I(n)}return r}function ie(e,r,t=r){var n=Q();P(e,"input",()=>{var s=_(e)?v(e.value):e.value;t(s),n&&s!==(s=r())&&(e.value=s??"")}),E(()=>{var s=r();if(u&&e.defaultValue!==e.value){t(_(e)?v(e.value):e.value);return}_(e)&&s===v(e.value)||e.type==="date"&&!s&&!e.value||s!==e.value&&(e.value=s??"")})}const h=new Set;function ce(e,r,t,n,s=n){var o=t.getAttribute("type")==="checkbox",i=e;let a=!1;if(r!==null)for(var d of r)i=i[d]??(i[d]=[]);i.push(t),P(t,"change",()=>{var c=t.__value;o&&(c=p(i,c,t.checked)),s(c)},()=>s(o?[]:null)),E(()=>{var c=n();if(u&&t.defaultChecked!==t.checked){a=!0;return}o?(c=c||[],t.checked=c.includes(t.__value)):t.checked=V(t.__value,c)}),U(()=>{var c=i.indexOf(t);c!==-1&&i.splice(c,1)}),h.has(i)||(h.add(i),k(()=>{i.sort((c,f)=>c.compareDocumentPosition(f)===4?-1:1),h.delete(i)})),k(()=>{if(a){var c;if(o)c=p(i,c,t.checked);else{var f=i.find(R=>R.checked);c=f==null?void 0:f.__value}s(c)}})}function p(e,r,t){for(var n=new Set,s=0;s<e.length;s+=1)e[s].checked&&n.add(e[s].__value);return t||n.delete(r),Array.from(n)}function _(e){var r=e.type;return r==="number"||r==="range"}function v(e){return e===""?null:+e}const K=[58111,51361,43103,63607],O=[65011,36373,62869,62467];function z(){const e=K[g(0,K.length-1)],r=O[g(0,O.length-1)];return[e,r]}function g(e,r){return e=Math.ceil(e),r=Math.floor(r),Math.floor(Math.random()*(r-e+1))+e}function q(e,r){return r===0?e:q(r,e%r)}function L(e,r){if(e=(e%r+r)%r,!e||r<2)throw Error("bad");const t=[];let n=r;for(;n;)[e,n]=[n,e%n],t.push({a:e,b:n});if(e!==1n)throw Error("bad");let s=1n,o=0n;for(let i=t.length-2;i>=0;--i)[s,o]=[o,s-o*BigInt(t[i].a/t[i].b)];return(o%r+r)%r}function M(e,r,t){if(r===0n)return 1n;r<0n&&(e=L(e,t),r=-r);let n=1n;for(;r>0n;)r%2n===1n&&(n=n*e%t),r=r/2n,e=e*e%t;return n}class w{constructor(r,t){this.n=r,this.e=t}static fromString(r){const t=JSON.parse(r);return new w(t.n,t.e)}encrypt(r){return M(r,BigInt(this.e),BigInt(this.n))}encryptString(r){const t=new TextEncoder,n=X(t.encode(r));return console.log(n),H(this.encrypt(n))}}function H(e){if(e===0n)return"A";const r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";let t="",n=e<0n?"-":"";for(e=e<0n?-e:e;e>0n;)t=r.charAt(Number(e%64n))+t,e=e/64n;return n+t}function W(e){if(e==="A")return 0n;const r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";let t=0n,n=1n;e.charAt(0)==="-"&&(n=-1n,e=e.slice(1));for(let s=0;s<e.length;s++)t=t*64n+BigInt(r.indexOf(e.charAt(s)));return n*t}function X(e){let r=0n;for(let t=0;t<e.length;t++)r=(r<<8n)+BigInt(e[t]);return r}function Z(e){const r=e.toString(16),t=r.length/2,n=new Uint8Array(t);for(let s=0;s<t;s++)n[s]=parseInt(r.slice(s*2,s*2+2),16);return n}class y{constructor(r,t){this.publicKey=r,this.privateKey=t}static generate(){const[r,t]=z(),n=r*t,s=(r-1)*(t-1);if(s<256)throw new Error("phi too small");let o;for(;;){const a=g(3,s);if(q(a,s)===1){o=new w(n,a);break}}const i=L(BigInt(o.e),BigInt(s));if(Number.isNaN(i))throw new Error("NaN private key");return new y(o,Number(i))}static fromString(r){const t=JSON.parse(r);return new y(t.publicKey,t.privateKey)}toString(){return JSON.stringify({publicKey:this.publicKey,privateKey:this.privateKey})}decrypt(r){return M(r,BigInt(this.privateKey),BigInt(this.publicKey.n))}decryptString(r){const t=new TextDecoder,n=W(r);console.log(r,n);let s=Z(this.decrypt(n));return t.decode(s)}}class ${constructor(r){l(this,"originalSeed");l(this,"seed");this.originalSeed=this.seed=r,this.reset()}next(){return this.seed=this.seed*16807%2147483647}reset(){this.seed=this.originalSeed%2147483647,this.seed<=0&&(this.seed+=2147483646)}}class oe{constructor(r){l(this,"secretBytes");l(this,"rng");this.secret=r;const t=new TextEncoder;this.secretBytes=t.encode(r);let n=1;for(const s of this.secretBytes)n*=s;this.rng=new $(n)}apply(r){this.rng.reset();for(let t=0;t<r.length;t++)r[t]=r[t]^this.getSecretByte(t)}getSecretByte(r){return this.rng.next()%255}}export{w as R,oe as S,y as a,ce as b,ie as c,N as d,g,se as r,ne as s};