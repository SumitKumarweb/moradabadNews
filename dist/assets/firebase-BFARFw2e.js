const hd=()=>{};var qa={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mu=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},dd=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[t++];e[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[t++],a=n[t++],u=n[t++],h=((s&7)<<18|(o&63)<<12|(a&63)<<6|u&63)-65536;e[r++]=String.fromCharCode(55296+(h>>10)),e[r++]=String.fromCharCode(56320+(h&1023))}else{const o=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return e.join("")},gu={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const o=n[s],a=s+1<n.length,u=a?n[s+1]:0,h=s+2<n.length,d=h?n[s+2]:0,p=o>>2,g=(o&3)<<4|u>>4;let T=(u&15)<<2|d>>6,P=d&63;h||(P=64,a||(T=64)),r.push(t[p],t[g],t[T],t[P])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(mu(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):dd(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const o=t[n.charAt(s++)],u=s<n.length?t[n.charAt(s)]:0;++s;const d=s<n.length?t[n.charAt(s)]:64;++s;const g=s<n.length?t[n.charAt(s)]:64;if(++s,o==null||u==null||d==null||g==null)throw new fd;const T=o<<2|u>>4;if(r.push(T),d!==64){const P=u<<4&240|d>>2;if(r.push(P),g!==64){const D=d<<6&192|g;r.push(D)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class fd extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const pd=function(n){const e=mu(n);return gu.encodeByteArray(e,!0)},Hr=function(n){return pd(n).replace(/\./g,"")},_u=function(n){try{return gu.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function md(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gd=()=>md().__FIREBASE_DEFAULTS__,_d=()=>{if(typeof process>"u"||typeof qa>"u")return;const n=qa.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},yd=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&_u(n[1]);return e&&JSON.parse(e)},ls=()=>{try{return hd()||gd()||_d()||yd()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},yu=n=>{var e,t;return(t=(e=ls())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},Ed=n=>{const e=yu(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},Eu=()=>{var n;return(n=ls())==null?void 0:n.config},Tu=n=>{var e;return(e=ls())==null?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Td{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dn(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function Iu(n){return(await fetch(n,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Id(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a={iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}},...n};return[Hr(JSON.stringify(t)),Hr(JSON.stringify(a)),""].join(".")}const Bn={};function wd(){const n={prod:[],emulator:[]};for(const e of Object.keys(Bn))Bn[e]?n.emulator.push(e):n.prod.push(e);return n}function vd(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let ja=!1;function wu(n,e){if(typeof window>"u"||typeof document>"u"||!dn(window.location.host)||Bn[n]===e||Bn[n]||ja)return;Bn[n]=e;function t(T){return`__firebase__banner__${T}`}const r="__firebase__banner",o=wd().prod.length>0;function a(){const T=document.getElementById(r);T&&T.remove()}function u(T){T.style.display="flex",T.style.background="#7faaf0",T.style.position="fixed",T.style.bottom="5px",T.style.left="5px",T.style.padding=".5em",T.style.borderRadius="5px",T.style.alignItems="center"}function h(T,P){T.setAttribute("width","24"),T.setAttribute("id",P),T.setAttribute("height","24"),T.setAttribute("viewBox","0 0 24 24"),T.setAttribute("fill","none"),T.style.marginLeft="-6px"}function d(){const T=document.createElement("span");return T.style.cursor="pointer",T.style.marginLeft="16px",T.style.fontSize="24px",T.innerHTML=" &times;",T.onclick=()=>{ja=!0,a()},T}function p(T,P){T.setAttribute("id",P),T.innerText="Learn more",T.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",T.setAttribute("target","__blank"),T.style.paddingLeft="5px",T.style.textDecoration="underline"}function g(){const T=vd(r),P=t("text"),D=document.getElementById(P)||document.createElement("span"),O=t("learnmore"),V=document.getElementById(O)||document.createElement("a"),q=t("preprendIcon"),H=document.getElementById(q)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(T.created){const K=T.element;u(K),p(V,O);const ue=d();h(H,q),K.append(H,D,V,ue),document.body.appendChild(K)}o?(D.innerText="Preview backend disconnected.",H.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(H.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,D.innerText="Preview backend running in this workspace."),D.setAttribute("id",P)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",g):g()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ee(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ad(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ee())}function Rd(){var e;const n=(e=ls())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Sd(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Pd(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Cd(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function bd(){const n=Ee();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Vd(){return!Rd()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function kd(){try{return typeof indexedDB=="object"}catch{return!1}}function Dd(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var o;e(((o=s.error)==null?void 0:o.message)||"")}}catch(t){e(t)}})}function lE(){return!(typeof navigator>"u"||!navigator.cookieEnabled)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nd="FirebaseError";class Ze extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Nd,Object.setPrototypeOf(this,Ze.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,rr.prototype.create)}}class rr{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,o=this.errors[e],a=o?Od(o,r):"Error",u=`${this.serviceName}: ${a} (${s}).`;return new Ze(s,u,r)}}function Od(n,e){return n.replace(Md,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Md=/\{\$([^}]+)}/g;function Ld(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Ft(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const o=n[s],a=e[s];if($a(o)&&$a(a)){if(!Ft(o,a))return!1}else if(o!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function $a(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sr(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function xd(n,e){const t=new Fd(n,e);return t.subscribe.bind(t)}class Fd{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Ud(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=ri),s.error===void 0&&(s.error=ri),s.complete===void 0&&(s.complete=ri);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Ud(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function ri(){}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bd=1e3,qd=2,jd=4*60*60*1e3,$d=.5;function hE(n,e=Bd,t=qd){const r=e*Math.pow(t,n),s=Math.round($d*r*(Math.random()-.5)*2);return Math.min(jd,r+s)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Te(n){return n&&n._delegate?n._delegate:n}class Ut{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zd{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new Td;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),r=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Gd(e))try{this.getOrInitializeService({instanceIdentifier:Nt})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch{}}}}clearInstance(e=Nt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Nt){return this.instances.has(e)}getOptions(e=Nt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[o,a]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(o);r===u&&a.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const o=this.instances.get(r);return o&&e(o,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Hd(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Nt){return this.component?this.component.multipleInstances?e:Nt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Hd(n){return n===Nt?void 0:n}function Gd(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wd{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new zd(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var j;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(j||(j={}));const Kd={debug:j.DEBUG,verbose:j.VERBOSE,info:j.INFO,warn:j.WARN,error:j.ERROR,silent:j.SILENT},Qd=j.INFO,Xd={[j.DEBUG]:"log",[j.VERBOSE]:"log",[j.INFO]:"info",[j.WARN]:"warn",[j.ERROR]:"error"},Jd=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=Xd[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Bi{constructor(e){this.name=e,this._logLevel=Qd,this._logHandler=Jd,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in j))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Kd[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,j.DEBUG,...e),this._logHandler(this,j.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,j.VERBOSE,...e),this._logHandler(this,j.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,j.INFO,...e),this._logHandler(this,j.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,j.WARN,...e),this._logHandler(this,j.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,j.ERROR,...e),this._logHandler(this,j.ERROR,...e)}}const Yd=(n,e)=>e.some(t=>n instanceof t);let za,Ha;function Zd(){return za||(za=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ef(){return Ha||(Ha=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const vu=new WeakMap,mi=new WeakMap,Au=new WeakMap,si=new WeakMap,qi=new WeakMap;function tf(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{t(ft(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&vu.set(t,n)}).catch(()=>{}),qi.set(e,n),e}function nf(n){if(mi.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});mi.set(n,e)}let gi={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return mi.get(n);if(e==="objectStoreNames")return n.objectStoreNames||Au.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ft(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function rf(n){gi=n(gi)}function sf(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(ii(this),e,...t);return Au.set(r,e.sort?e.sort():[e]),ft(r)}:ef().includes(n)?function(...e){return n.apply(ii(this),e),ft(vu.get(this))}:function(...e){return ft(n.apply(ii(this),e))}}function of(n){return typeof n=="function"?sf(n):(n instanceof IDBTransaction&&nf(n),Yd(n,Zd())?new Proxy(n,gi):n)}function ft(n){if(n instanceof IDBRequest)return tf(n);if(si.has(n))return si.get(n);const e=of(n);return e!==n&&(si.set(n,e),qi.set(e,n)),e}const ii=n=>qi.get(n);function af(n,e,{blocked:t,upgrade:r,blocking:s,terminated:o}={}){const a=indexedDB.open(n,e),u=ft(a);return r&&a.addEventListener("upgradeneeded",h=>{r(ft(a.result),h.oldVersion,h.newVersion,ft(a.transaction),h)}),t&&a.addEventListener("blocked",h=>t(h.oldVersion,h.newVersion,h)),u.then(h=>{o&&h.addEventListener("close",()=>o()),s&&h.addEventListener("versionchange",d=>s(d.oldVersion,d.newVersion,d))}).catch(()=>{}),u}const cf=["get","getKey","getAll","getAllKeys","count"],uf=["put","add","delete","clear"],oi=new Map;function Ga(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(oi.get(e))return oi.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=uf.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||cf.includes(t)))return;const o=async function(a,...u){const h=this.transaction(a,s?"readwrite":"readonly");let d=h.store;return r&&(d=d.index(u.shift())),(await Promise.all([d[t](...u),s&&h.done]))[0]};return oi.set(e,o),o}rf(n=>({...n,get:(e,t,r)=>Ga(e,t)||n.get(e,t,r),has:(e,t)=>!!Ga(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lf{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(hf(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function hf(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const _i="@firebase/app",Wa="0.14.4";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ke=new Bi("@firebase/app"),df="@firebase/app-compat",ff="@firebase/analytics-compat",pf="@firebase/analytics",mf="@firebase/app-check-compat",gf="@firebase/app-check",_f="@firebase/auth",yf="@firebase/auth-compat",Ef="@firebase/database",Tf="@firebase/data-connect",If="@firebase/database-compat",wf="@firebase/functions",vf="@firebase/functions-compat",Af="@firebase/installations",Rf="@firebase/installations-compat",Sf="@firebase/messaging",Pf="@firebase/messaging-compat",Cf="@firebase/performance",bf="@firebase/performance-compat",Vf="@firebase/remote-config",kf="@firebase/remote-config-compat",Df="@firebase/storage",Nf="@firebase/storage-compat",Of="@firebase/firestore",Mf="@firebase/ai",Lf="@firebase/firestore-compat",xf="firebase",Ff="12.4.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yi="[DEFAULT]",Uf={[_i]:"fire-core",[df]:"fire-core-compat",[pf]:"fire-analytics",[ff]:"fire-analytics-compat",[gf]:"fire-app-check",[mf]:"fire-app-check-compat",[_f]:"fire-auth",[yf]:"fire-auth-compat",[Ef]:"fire-rtdb",[Tf]:"fire-data-connect",[If]:"fire-rtdb-compat",[wf]:"fire-fn",[vf]:"fire-fn-compat",[Af]:"fire-iid",[Rf]:"fire-iid-compat",[Sf]:"fire-fcm",[Pf]:"fire-fcm-compat",[Cf]:"fire-perf",[bf]:"fire-perf-compat",[Vf]:"fire-rc",[kf]:"fire-rc-compat",[Df]:"fire-gcs",[Nf]:"fire-gcs-compat",[Of]:"fire-fst",[Lf]:"fire-fst-compat",[Mf]:"fire-vertex","fire-js":"fire-js",[xf]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gn=new Map,Bf=new Map,Ei=new Map;function Ka(n,e){try{n.container.addComponent(e)}catch(t){Ke.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function rn(n){const e=n.name;if(Ei.has(e))return Ke.debug(`There were multiple attempts to register component ${e}.`),!1;Ei.set(e,n);for(const t of Gn.values())Ka(t,n);for(const t of Bf.values())Ka(t,n);return!0}function ji(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function xe(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qf={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},pt=new rr("app","Firebase",qf);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jf{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Ut("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw pt.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fn=Ff;function $f(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:yi,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw pt.create("bad-app-name",{appName:String(s)});if(t||(t=Eu()),!t)throw pt.create("no-options");const o=Gn.get(s);if(o){if(Ft(t,o.options)&&Ft(r,o.config))return o;throw pt.create("duplicate-app",{appName:s})}const a=new Wd(s);for(const h of Ei.values())a.addComponent(h);const u=new jf(t,r,a);return Gn.set(s,u),u}function Ru(n=yi){const e=Gn.get(n);if(!e&&n===yi&&Eu())return $f();if(!e)throw pt.create("no-app",{appName:n});return e}function dE(){return Array.from(Gn.values())}function mt(n,e,t){let r=Uf[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),o=e.match(/\s|\//);if(s||o){const a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Ke.warn(a.join(" "));return}rn(new Ut(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zf="firebase-heartbeat-database",Hf=1,Wn="firebase-heartbeat-store";let ai=null;function Su(){return ai||(ai=af(zf,Hf,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Wn)}catch(t){console.warn(t)}}}}).catch(n=>{throw pt.create("idb-open",{originalErrorMessage:n.message})})),ai}async function Gf(n){try{const t=(await Su()).transaction(Wn),r=await t.objectStore(Wn).get(Pu(n));return await t.done,r}catch(e){if(e instanceof Ze)Ke.warn(e.message);else{const t=pt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Ke.warn(t.message)}}}async function Qa(n,e){try{const r=(await Su()).transaction(Wn,"readwrite");await r.objectStore(Wn).put(e,Pu(n)),await r.done}catch(t){if(t instanceof Ze)Ke.warn(t.message);else{const r=pt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});Ke.warn(r.message)}}}function Pu(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wf=1024,Kf=30;class Qf{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Jf(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Xa();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o))return;if(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats.length>Kf){const a=Yf(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(a,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Ke.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Xa(),{heartbeatsToSend:r,unsentEntries:s}=Xf(this._heartbeatsCache.heartbeats),o=Hr(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(t){return Ke.warn(t),""}}}function Xa(){return new Date().toISOString().substring(0,10)}function Xf(n,e=Wf){const t=[];let r=n.slice();for(const s of n){const o=t.find(a=>a.agent===s.agent);if(o){if(o.dates.push(s.date),Ja(t)>e){o.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Ja(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Jf{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return kd()?Dd().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Gf(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Qa(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return Qa(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Ja(n){return Hr(JSON.stringify({version:2,heartbeats:n})).length}function Yf(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zf(n){rn(new Ut("platform-logger",e=>new lf(e),"PRIVATE")),rn(new Ut("heartbeat",e=>new Qf(e),"PRIVATE")),mt(_i,Wa,n),mt(_i,Wa,"esm2020"),mt("fire-js","")}Zf("");var Ya=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var gt,Cu;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(I,m){function y(){}y.prototype=m.prototype,I.F=m.prototype,I.prototype=new y,I.prototype.constructor=I,I.D=function(w,E,A){for(var _=Array(arguments.length-2),ve=2;ve<arguments.length;ve++)_[ve-2]=arguments[ve];return m.prototype[E].apply(w,_)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(I,m,y){y||(y=0);const w=Array(16);if(typeof m=="string")for(var E=0;E<16;++E)w[E]=m.charCodeAt(y++)|m.charCodeAt(y++)<<8|m.charCodeAt(y++)<<16|m.charCodeAt(y++)<<24;else for(E=0;E<16;++E)w[E]=m[y++]|m[y++]<<8|m[y++]<<16|m[y++]<<24;m=I.g[0],y=I.g[1],E=I.g[2];let A=I.g[3],_;_=m+(A^y&(E^A))+w[0]+3614090360&4294967295,m=y+(_<<7&4294967295|_>>>25),_=A+(E^m&(y^E))+w[1]+3905402710&4294967295,A=m+(_<<12&4294967295|_>>>20),_=E+(y^A&(m^y))+w[2]+606105819&4294967295,E=A+(_<<17&4294967295|_>>>15),_=y+(m^E&(A^m))+w[3]+3250441966&4294967295,y=E+(_<<22&4294967295|_>>>10),_=m+(A^y&(E^A))+w[4]+4118548399&4294967295,m=y+(_<<7&4294967295|_>>>25),_=A+(E^m&(y^E))+w[5]+1200080426&4294967295,A=m+(_<<12&4294967295|_>>>20),_=E+(y^A&(m^y))+w[6]+2821735955&4294967295,E=A+(_<<17&4294967295|_>>>15),_=y+(m^E&(A^m))+w[7]+4249261313&4294967295,y=E+(_<<22&4294967295|_>>>10),_=m+(A^y&(E^A))+w[8]+1770035416&4294967295,m=y+(_<<7&4294967295|_>>>25),_=A+(E^m&(y^E))+w[9]+2336552879&4294967295,A=m+(_<<12&4294967295|_>>>20),_=E+(y^A&(m^y))+w[10]+4294925233&4294967295,E=A+(_<<17&4294967295|_>>>15),_=y+(m^E&(A^m))+w[11]+2304563134&4294967295,y=E+(_<<22&4294967295|_>>>10),_=m+(A^y&(E^A))+w[12]+1804603682&4294967295,m=y+(_<<7&4294967295|_>>>25),_=A+(E^m&(y^E))+w[13]+4254626195&4294967295,A=m+(_<<12&4294967295|_>>>20),_=E+(y^A&(m^y))+w[14]+2792965006&4294967295,E=A+(_<<17&4294967295|_>>>15),_=y+(m^E&(A^m))+w[15]+1236535329&4294967295,y=E+(_<<22&4294967295|_>>>10),_=m+(E^A&(y^E))+w[1]+4129170786&4294967295,m=y+(_<<5&4294967295|_>>>27),_=A+(y^E&(m^y))+w[6]+3225465664&4294967295,A=m+(_<<9&4294967295|_>>>23),_=E+(m^y&(A^m))+w[11]+643717713&4294967295,E=A+(_<<14&4294967295|_>>>18),_=y+(A^m&(E^A))+w[0]+3921069994&4294967295,y=E+(_<<20&4294967295|_>>>12),_=m+(E^A&(y^E))+w[5]+3593408605&4294967295,m=y+(_<<5&4294967295|_>>>27),_=A+(y^E&(m^y))+w[10]+38016083&4294967295,A=m+(_<<9&4294967295|_>>>23),_=E+(m^y&(A^m))+w[15]+3634488961&4294967295,E=A+(_<<14&4294967295|_>>>18),_=y+(A^m&(E^A))+w[4]+3889429448&4294967295,y=E+(_<<20&4294967295|_>>>12),_=m+(E^A&(y^E))+w[9]+568446438&4294967295,m=y+(_<<5&4294967295|_>>>27),_=A+(y^E&(m^y))+w[14]+3275163606&4294967295,A=m+(_<<9&4294967295|_>>>23),_=E+(m^y&(A^m))+w[3]+4107603335&4294967295,E=A+(_<<14&4294967295|_>>>18),_=y+(A^m&(E^A))+w[8]+1163531501&4294967295,y=E+(_<<20&4294967295|_>>>12),_=m+(E^A&(y^E))+w[13]+2850285829&4294967295,m=y+(_<<5&4294967295|_>>>27),_=A+(y^E&(m^y))+w[2]+4243563512&4294967295,A=m+(_<<9&4294967295|_>>>23),_=E+(m^y&(A^m))+w[7]+1735328473&4294967295,E=A+(_<<14&4294967295|_>>>18),_=y+(A^m&(E^A))+w[12]+2368359562&4294967295,y=E+(_<<20&4294967295|_>>>12),_=m+(y^E^A)+w[5]+4294588738&4294967295,m=y+(_<<4&4294967295|_>>>28),_=A+(m^y^E)+w[8]+2272392833&4294967295,A=m+(_<<11&4294967295|_>>>21),_=E+(A^m^y)+w[11]+1839030562&4294967295,E=A+(_<<16&4294967295|_>>>16),_=y+(E^A^m)+w[14]+4259657740&4294967295,y=E+(_<<23&4294967295|_>>>9),_=m+(y^E^A)+w[1]+2763975236&4294967295,m=y+(_<<4&4294967295|_>>>28),_=A+(m^y^E)+w[4]+1272893353&4294967295,A=m+(_<<11&4294967295|_>>>21),_=E+(A^m^y)+w[7]+4139469664&4294967295,E=A+(_<<16&4294967295|_>>>16),_=y+(E^A^m)+w[10]+3200236656&4294967295,y=E+(_<<23&4294967295|_>>>9),_=m+(y^E^A)+w[13]+681279174&4294967295,m=y+(_<<4&4294967295|_>>>28),_=A+(m^y^E)+w[0]+3936430074&4294967295,A=m+(_<<11&4294967295|_>>>21),_=E+(A^m^y)+w[3]+3572445317&4294967295,E=A+(_<<16&4294967295|_>>>16),_=y+(E^A^m)+w[6]+76029189&4294967295,y=E+(_<<23&4294967295|_>>>9),_=m+(y^E^A)+w[9]+3654602809&4294967295,m=y+(_<<4&4294967295|_>>>28),_=A+(m^y^E)+w[12]+3873151461&4294967295,A=m+(_<<11&4294967295|_>>>21),_=E+(A^m^y)+w[15]+530742520&4294967295,E=A+(_<<16&4294967295|_>>>16),_=y+(E^A^m)+w[2]+3299628645&4294967295,y=E+(_<<23&4294967295|_>>>9),_=m+(E^(y|~A))+w[0]+4096336452&4294967295,m=y+(_<<6&4294967295|_>>>26),_=A+(y^(m|~E))+w[7]+1126891415&4294967295,A=m+(_<<10&4294967295|_>>>22),_=E+(m^(A|~y))+w[14]+2878612391&4294967295,E=A+(_<<15&4294967295|_>>>17),_=y+(A^(E|~m))+w[5]+4237533241&4294967295,y=E+(_<<21&4294967295|_>>>11),_=m+(E^(y|~A))+w[12]+1700485571&4294967295,m=y+(_<<6&4294967295|_>>>26),_=A+(y^(m|~E))+w[3]+2399980690&4294967295,A=m+(_<<10&4294967295|_>>>22),_=E+(m^(A|~y))+w[10]+4293915773&4294967295,E=A+(_<<15&4294967295|_>>>17),_=y+(A^(E|~m))+w[1]+2240044497&4294967295,y=E+(_<<21&4294967295|_>>>11),_=m+(E^(y|~A))+w[8]+1873313359&4294967295,m=y+(_<<6&4294967295|_>>>26),_=A+(y^(m|~E))+w[15]+4264355552&4294967295,A=m+(_<<10&4294967295|_>>>22),_=E+(m^(A|~y))+w[6]+2734768916&4294967295,E=A+(_<<15&4294967295|_>>>17),_=y+(A^(E|~m))+w[13]+1309151649&4294967295,y=E+(_<<21&4294967295|_>>>11),_=m+(E^(y|~A))+w[4]+4149444226&4294967295,m=y+(_<<6&4294967295|_>>>26),_=A+(y^(m|~E))+w[11]+3174756917&4294967295,A=m+(_<<10&4294967295|_>>>22),_=E+(m^(A|~y))+w[2]+718787259&4294967295,E=A+(_<<15&4294967295|_>>>17),_=y+(A^(E|~m))+w[9]+3951481745&4294967295,I.g[0]=I.g[0]+m&4294967295,I.g[1]=I.g[1]+(E+(_<<21&4294967295|_>>>11))&4294967295,I.g[2]=I.g[2]+E&4294967295,I.g[3]=I.g[3]+A&4294967295}r.prototype.v=function(I,m){m===void 0&&(m=I.length);const y=m-this.blockSize,w=this.C;let E=this.h,A=0;for(;A<m;){if(E==0)for(;A<=y;)s(this,I,A),A+=this.blockSize;if(typeof I=="string"){for(;A<m;)if(w[E++]=I.charCodeAt(A++),E==this.blockSize){s(this,w),E=0;break}}else for(;A<m;)if(w[E++]=I[A++],E==this.blockSize){s(this,w),E=0;break}}this.h=E,this.o+=m},r.prototype.A=function(){var I=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);I[0]=128;for(var m=1;m<I.length-8;++m)I[m]=0;m=this.o*8;for(var y=I.length-8;y<I.length;++y)I[y]=m&255,m/=256;for(this.v(I),I=Array(16),m=0,y=0;y<4;++y)for(let w=0;w<32;w+=8)I[m++]=this.g[y]>>>w&255;return I};function o(I,m){var y=u;return Object.prototype.hasOwnProperty.call(y,I)?y[I]:y[I]=m(I)}function a(I,m){this.h=m;const y=[];let w=!0;for(let E=I.length-1;E>=0;E--){const A=I[E]|0;w&&A==m||(y[E]=A,w=!1)}this.g=y}var u={};function h(I){return-128<=I&&I<128?o(I,function(m){return new a([m|0],m<0?-1:0)}):new a([I|0],I<0?-1:0)}function d(I){if(isNaN(I)||!isFinite(I))return g;if(I<0)return V(d(-I));const m=[];let y=1;for(let w=0;I>=y;w++)m[w]=I/y|0,y*=4294967296;return new a(m,0)}function p(I,m){if(I.length==0)throw Error("number format error: empty string");if(m=m||10,m<2||36<m)throw Error("radix out of range: "+m);if(I.charAt(0)=="-")return V(p(I.substring(1),m));if(I.indexOf("-")>=0)throw Error('number format error: interior "-" character');const y=d(Math.pow(m,8));let w=g;for(let A=0;A<I.length;A+=8){var E=Math.min(8,I.length-A);const _=parseInt(I.substring(A,A+E),m);E<8?(E=d(Math.pow(m,E)),w=w.j(E).add(d(_))):(w=w.j(y),w=w.add(d(_)))}return w}var g=h(0),T=h(1),P=h(16777216);n=a.prototype,n.m=function(){if(O(this))return-V(this).m();let I=0,m=1;for(let y=0;y<this.g.length;y++){const w=this.i(y);I+=(w>=0?w:4294967296+w)*m,m*=4294967296}return I},n.toString=function(I){if(I=I||10,I<2||36<I)throw Error("radix out of range: "+I);if(D(this))return"0";if(O(this))return"-"+V(this).toString(I);const m=d(Math.pow(I,6));var y=this;let w="";for(;;){const E=ue(y,m).g;y=q(y,E.j(m));let A=((y.g.length>0?y.g[0]:y.h)>>>0).toString(I);if(y=E,D(y))return A+w;for(;A.length<6;)A="0"+A;w=A+w}},n.i=function(I){return I<0?0:I<this.g.length?this.g[I]:this.h};function D(I){if(I.h!=0)return!1;for(let m=0;m<I.g.length;m++)if(I.g[m]!=0)return!1;return!0}function O(I){return I.h==-1}n.l=function(I){return I=q(this,I),O(I)?-1:D(I)?0:1};function V(I){const m=I.g.length,y=[];for(let w=0;w<m;w++)y[w]=~I.g[w];return new a(y,~I.h).add(T)}n.abs=function(){return O(this)?V(this):this},n.add=function(I){const m=Math.max(this.g.length,I.g.length),y=[];let w=0;for(let E=0;E<=m;E++){let A=w+(this.i(E)&65535)+(I.i(E)&65535),_=(A>>>16)+(this.i(E)>>>16)+(I.i(E)>>>16);w=_>>>16,A&=65535,_&=65535,y[E]=_<<16|A}return new a(y,y[y.length-1]&-2147483648?-1:0)};function q(I,m){return I.add(V(m))}n.j=function(I){if(D(this)||D(I))return g;if(O(this))return O(I)?V(this).j(V(I)):V(V(this).j(I));if(O(I))return V(this.j(V(I)));if(this.l(P)<0&&I.l(P)<0)return d(this.m()*I.m());const m=this.g.length+I.g.length,y=[];for(var w=0;w<2*m;w++)y[w]=0;for(w=0;w<this.g.length;w++)for(let E=0;E<I.g.length;E++){const A=this.i(w)>>>16,_=this.i(w)&65535,ve=I.i(E)>>>16,Pt=I.i(E)&65535;y[2*w+2*E]+=_*Pt,H(y,2*w+2*E),y[2*w+2*E+1]+=A*Pt,H(y,2*w+2*E+1),y[2*w+2*E+1]+=_*ve,H(y,2*w+2*E+1),y[2*w+2*E+2]+=A*ve,H(y,2*w+2*E+2)}for(I=0;I<m;I++)y[I]=y[2*I+1]<<16|y[2*I];for(I=m;I<2*m;I++)y[I]=0;return new a(y,0)};function H(I,m){for(;(I[m]&65535)!=I[m];)I[m+1]+=I[m]>>>16,I[m]&=65535,m++}function K(I,m){this.g=I,this.h=m}function ue(I,m){if(D(m))throw Error("division by zero");if(D(I))return new K(g,g);if(O(I))return m=ue(V(I),m),new K(V(m.g),V(m.h));if(O(m))return m=ue(I,V(m)),new K(V(m.g),m.h);if(I.g.length>30){if(O(I)||O(m))throw Error("slowDivide_ only works with positive integers.");for(var y=T,w=m;w.l(I)<=0;)y=Se(y),w=Se(w);var E=oe(y,1),A=oe(w,1);for(w=oe(w,2),y=oe(y,2);!D(w);){var _=A.add(w);_.l(I)<=0&&(E=E.add(y),A=_),w=oe(w,1),y=oe(y,1)}return m=q(I,E.j(m)),new K(E,m)}for(E=g;I.l(m)>=0;){for(y=Math.max(1,Math.floor(I.m()/m.m())),w=Math.ceil(Math.log(y)/Math.LN2),w=w<=48?1:Math.pow(2,w-48),A=d(y),_=A.j(m);O(_)||_.l(I)>0;)y-=w,A=d(y),_=A.j(m);D(A)&&(A=T),E=E.add(A),I=q(I,_)}return new K(E,I)}n.B=function(I){return ue(this,I).h},n.and=function(I){const m=Math.max(this.g.length,I.g.length),y=[];for(let w=0;w<m;w++)y[w]=this.i(w)&I.i(w);return new a(y,this.h&I.h)},n.or=function(I){const m=Math.max(this.g.length,I.g.length),y=[];for(let w=0;w<m;w++)y[w]=this.i(w)|I.i(w);return new a(y,this.h|I.h)},n.xor=function(I){const m=Math.max(this.g.length,I.g.length),y=[];for(let w=0;w<m;w++)y[w]=this.i(w)^I.i(w);return new a(y,this.h^I.h)};function Se(I){const m=I.g.length+1,y=[];for(let w=0;w<m;w++)y[w]=I.i(w)<<1|I.i(w-1)>>>31;return new a(y,I.h)}function oe(I,m){const y=m>>5;m%=32;const w=I.g.length-y,E=[];for(let A=0;A<w;A++)E[A]=m>0?I.i(A+y)>>>m|I.i(A+y+1)<<32-m:I.i(A+y);return new a(E,I.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,Cu=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.B,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=d,a.fromString=p,gt=a}).apply(typeof Ya<"u"?Ya:typeof self<"u"?self:typeof window<"u"?window:{});var br=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var bu,Ln,Vu,Mr,Ti,ku,Du,Nu;(function(){var n,e=Object.defineProperty;function t(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof br=="object"&&br];for(var c=0;c<i.length;++c){var l=i[c];if(l&&l.Math==Math)return l}throw Error("Cannot find global object")}var r=t(this);function s(i,c){if(c)e:{var l=r;i=i.split(".");for(var f=0;f<i.length-1;f++){var v=i[f];if(!(v in l))break e;l=l[v]}i=i[i.length-1],f=l[i],c=c(f),c!=f&&c!=null&&e(l,i,{configurable:!0,writable:!0,value:c})}}s("Symbol.dispose",function(i){return i||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(i){return i||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(i){return i||function(c){var l=[],f;for(f in c)Object.prototype.hasOwnProperty.call(c,f)&&l.push([f,c[f]]);return l}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},a=this||self;function u(i){var c=typeof i;return c=="object"&&i!=null||c=="function"}function h(i,c,l){return i.call.apply(i.bind,arguments)}function d(i,c,l){return d=h,d.apply(null,arguments)}function p(i,c){var l=Array.prototype.slice.call(arguments,1);return function(){var f=l.slice();return f.push.apply(f,arguments),i.apply(this,f)}}function g(i,c){function l(){}l.prototype=c.prototype,i.Z=c.prototype,i.prototype=new l,i.prototype.constructor=i,i.Ob=function(f,v,R){for(var b=Array(arguments.length-2),B=2;B<arguments.length;B++)b[B-2]=arguments[B];return c.prototype[v].apply(f,b)}}var T=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?i=>i&&AsyncContext.Snapshot.wrap(i):i=>i;function P(i){const c=i.length;if(c>0){const l=Array(c);for(let f=0;f<c;f++)l[f]=i[f];return l}return[]}function D(i,c){for(let f=1;f<arguments.length;f++){const v=arguments[f];var l=typeof v;if(l=l!="object"?l:v?Array.isArray(v)?"array":l:"null",l=="array"||l=="object"&&typeof v.length=="number"){l=i.length||0;const R=v.length||0;i.length=l+R;for(let b=0;b<R;b++)i[l+b]=v[b]}else i.push(v)}}class O{constructor(c,l){this.i=c,this.j=l,this.h=0,this.g=null}get(){let c;return this.h>0?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function V(i){a.setTimeout(()=>{throw i},0)}function q(){var i=I;let c=null;return i.g&&(c=i.g,i.g=i.g.next,i.g||(i.h=null),c.next=null),c}class H{constructor(){this.h=this.g=null}add(c,l){const f=K.get();f.set(c,l),this.h?this.h.next=f:this.g=f,this.h=f}}var K=new O(()=>new ue,i=>i.reset());class ue{constructor(){this.next=this.g=this.h=null}set(c,l){this.h=c,this.g=l,this.next=null}reset(){this.next=this.g=this.h=null}}let Se,oe=!1,I=new H,m=()=>{const i=Promise.resolve(void 0);Se=()=>{i.then(y)}};function y(){for(var i;i=q();){try{i.h.call(i.g)}catch(l){V(l)}var c=K;c.j(i),c.h<100&&(c.h++,i.next=c.g,c.g=i)}oe=!1}function w(){this.u=this.u,this.C=this.C}w.prototype.u=!1,w.prototype.dispose=function(){this.u||(this.u=!0,this.N())},w.prototype[Symbol.dispose]=function(){this.dispose()},w.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function E(i,c){this.type=i,this.g=this.target=c,this.defaultPrevented=!1}E.prototype.h=function(){this.defaultPrevented=!0};var A=function(){if(!a.addEventListener||!Object.defineProperty)return!1;var i=!1,c=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const l=()=>{};a.addEventListener("test",l,c),a.removeEventListener("test",l,c)}catch{}return i}();function _(i){return/^[\s\xa0]*$/.test(i)}function ve(i,c){E.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i&&this.init(i,c)}g(ve,E),ve.prototype.init=function(i,c){const l=this.type=i.type,f=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;this.target=i.target||i.srcElement,this.g=c,c=i.relatedTarget,c||(l=="mouseover"?c=i.fromElement:l=="mouseout"&&(c=i.toElement)),this.relatedTarget=c,f?(this.clientX=f.clientX!==void 0?f.clientX:f.pageX,this.clientY=f.clientY!==void 0?f.clientY:f.pageY,this.screenX=f.screenX||0,this.screenY=f.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=i.pointerType,this.state=i.state,this.i=i,i.defaultPrevented&&ve.Z.h.call(this)},ve.prototype.h=function(){ve.Z.h.call(this);const i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var Pt="closure_listenable_"+(Math.random()*1e6|0),Nh=0;function Oh(i,c,l,f,v){this.listener=i,this.proxy=null,this.src=c,this.type=l,this.capture=!!f,this.ha=v,this.key=++Nh,this.da=this.fa=!1}function pr(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function mr(i,c,l){for(const f in i)c.call(l,i[f],f,i)}function Mh(i,c){for(const l in i)c.call(void 0,i[l],l,i)}function Bo(i){const c={};for(const l in i)c[l]=i[l];return c}const qo="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function jo(i,c){let l,f;for(let v=1;v<arguments.length;v++){f=arguments[v];for(l in f)i[l]=f[l];for(let R=0;R<qo.length;R++)l=qo[R],Object.prototype.hasOwnProperty.call(f,l)&&(i[l]=f[l])}}function gr(i){this.src=i,this.g={},this.h=0}gr.prototype.add=function(i,c,l,f,v){const R=i.toString();i=this.g[R],i||(i=this.g[R]=[],this.h++);const b=Os(i,c,f,v);return b>-1?(c=i[b],l||(c.fa=!1)):(c=new Oh(c,this.src,R,!!f,v),c.fa=l,i.push(c)),c};function Ns(i,c){const l=c.type;if(l in i.g){var f=i.g[l],v=Array.prototype.indexOf.call(f,c,void 0),R;(R=v>=0)&&Array.prototype.splice.call(f,v,1),R&&(pr(c),i.g[l].length==0&&(delete i.g[l],i.h--))}}function Os(i,c,l,f){for(let v=0;v<i.length;++v){const R=i[v];if(!R.da&&R.listener==c&&R.capture==!!l&&R.ha==f)return v}return-1}var Ms="closure_lm_"+(Math.random()*1e6|0),Ls={};function $o(i,c,l,f,v){if(Array.isArray(c)){for(let R=0;R<c.length;R++)$o(i,c[R],l,f,v);return null}return l=Go(l),i&&i[Pt]?i.J(c,l,u(f)?!!f.capture:!1,v):Lh(i,c,l,!1,f,v)}function Lh(i,c,l,f,v,R){if(!c)throw Error("Invalid event type");const b=u(v)?!!v.capture:!!v;let B=Fs(i);if(B||(i[Ms]=B=new gr(i)),l=B.add(c,l,f,b,R),l.proxy)return l;if(f=xh(),l.proxy=f,f.src=i,f.listener=l,i.addEventListener)A||(v=b),v===void 0&&(v=!1),i.addEventListener(c.toString(),f,v);else if(i.attachEvent)i.attachEvent(Ho(c.toString()),f);else if(i.addListener&&i.removeListener)i.addListener(f);else throw Error("addEventListener and attachEvent are unavailable.");return l}function xh(){function i(l){return c.call(i.src,i.listener,l)}const c=Fh;return i}function zo(i,c,l,f,v){if(Array.isArray(c))for(var R=0;R<c.length;R++)zo(i,c[R],l,f,v);else f=u(f)?!!f.capture:!!f,l=Go(l),i&&i[Pt]?(i=i.i,R=String(c).toString(),R in i.g&&(c=i.g[R],l=Os(c,l,f,v),l>-1&&(pr(c[l]),Array.prototype.splice.call(c,l,1),c.length==0&&(delete i.g[R],i.h--)))):i&&(i=Fs(i))&&(c=i.g[c.toString()],i=-1,c&&(i=Os(c,l,f,v)),(l=i>-1?c[i]:null)&&xs(l))}function xs(i){if(typeof i!="number"&&i&&!i.da){var c=i.src;if(c&&c[Pt])Ns(c.i,i);else{var l=i.type,f=i.proxy;c.removeEventListener?c.removeEventListener(l,f,i.capture):c.detachEvent?c.detachEvent(Ho(l),f):c.addListener&&c.removeListener&&c.removeListener(f),(l=Fs(c))?(Ns(l,i),l.h==0&&(l.src=null,c[Ms]=null)):pr(i)}}}function Ho(i){return i in Ls?Ls[i]:Ls[i]="on"+i}function Fh(i,c){if(i.da)i=!0;else{c=new ve(c,this);const l=i.listener,f=i.ha||i.src;i.fa&&xs(i),i=l.call(f,c)}return i}function Fs(i){return i=i[Ms],i instanceof gr?i:null}var Us="__closure_events_fn_"+(Math.random()*1e9>>>0);function Go(i){return typeof i=="function"?i:(i[Us]||(i[Us]=function(c){return i.handleEvent(c)}),i[Us])}function me(){w.call(this),this.i=new gr(this),this.M=this,this.G=null}g(me,w),me.prototype[Pt]=!0,me.prototype.removeEventListener=function(i,c,l,f){zo(this,i,c,l,f)};function Ie(i,c){var l,f=i.G;if(f)for(l=[];f;f=f.G)l.push(f);if(i=i.M,f=c.type||c,typeof c=="string")c=new E(c,i);else if(c instanceof E)c.target=c.target||i;else{var v=c;c=new E(f,i),jo(c,v)}v=!0;let R,b;if(l)for(b=l.length-1;b>=0;b--)R=c.g=l[b],v=_r(R,f,!0,c)&&v;if(R=c.g=i,v=_r(R,f,!0,c)&&v,v=_r(R,f,!1,c)&&v,l)for(b=0;b<l.length;b++)R=c.g=l[b],v=_r(R,f,!1,c)&&v}me.prototype.N=function(){if(me.Z.N.call(this),this.i){var i=this.i;for(const c in i.g){const l=i.g[c];for(let f=0;f<l.length;f++)pr(l[f]);delete i.g[c],i.h--}}this.G=null},me.prototype.J=function(i,c,l,f){return this.i.add(String(i),c,!1,l,f)},me.prototype.K=function(i,c,l,f){return this.i.add(String(i),c,!0,l,f)};function _r(i,c,l,f){if(c=i.i.g[String(c)],!c)return!0;c=c.concat();let v=!0;for(let R=0;R<c.length;++R){const b=c[R];if(b&&!b.da&&b.capture==l){const B=b.listener,ae=b.ha||b.src;b.fa&&Ns(i.i,b),v=B.call(ae,f)!==!1&&v}}return v&&!f.defaultPrevented}function Uh(i,c){if(typeof i!="function")if(i&&typeof i.handleEvent=="function")i=d(i.handleEvent,i);else throw Error("Invalid listener argument");return Number(c)>2147483647?-1:a.setTimeout(i,c||0)}function Wo(i){i.g=Uh(()=>{i.g=null,i.i&&(i.i=!1,Wo(i))},i.l);const c=i.h;i.h=null,i.m.apply(null,c)}class Bh extends w{constructor(c,l){super(),this.m=c,this.l=l,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:Wo(this)}N(){super.N(),this.g&&(a.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Tn(i){w.call(this),this.h=i,this.g={}}g(Tn,w);var Ko=[];function Qo(i){mr(i.g,function(c,l){this.g.hasOwnProperty(l)&&xs(c)},i),i.g={}}Tn.prototype.N=function(){Tn.Z.N.call(this),Qo(this)},Tn.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Bs=a.JSON.stringify,qh=a.JSON.parse,jh=class{stringify(i){return a.JSON.stringify(i,void 0)}parse(i){return a.JSON.parse(i,void 0)}};function Xo(){}function Jo(){}var In={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function qs(){E.call(this,"d")}g(qs,E);function js(){E.call(this,"c")}g(js,E);var Ct={},Yo=null;function yr(){return Yo=Yo||new me}Ct.Ia="serverreachability";function Zo(i){E.call(this,Ct.Ia,i)}g(Zo,E);function wn(i){const c=yr();Ie(c,new Zo(c))}Ct.STAT_EVENT="statevent";function ea(i,c){E.call(this,Ct.STAT_EVENT,i),this.stat=c}g(ea,E);function we(i){const c=yr();Ie(c,new ea(c,i))}Ct.Ja="timingevent";function ta(i,c){E.call(this,Ct.Ja,i),this.size=c}g(ta,E);function vn(i,c){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return a.setTimeout(function(){i()},c)}function An(){this.g=!0}An.prototype.ua=function(){this.g=!1};function $h(i,c,l,f,v,R){i.info(function(){if(i.g)if(R){var b="",B=R.split("&");for(let Q=0;Q<B.length;Q++){var ae=B[Q].split("=");if(ae.length>1){const le=ae[0];ae=ae[1];const Me=le.split("_");b=Me.length>=2&&Me[1]=="type"?b+(le+"="+ae+"&"):b+(le+"=redacted&")}}}else b=null;else b=R;return"XMLHTTP REQ ("+f+") [attempt "+v+"]: "+c+`
`+l+`
`+b})}function zh(i,c,l,f,v,R,b){i.info(function(){return"XMLHTTP RESP ("+f+") [ attempt "+v+"]: "+c+`
`+l+`
`+R+" "+b})}function Ht(i,c,l,f){i.info(function(){return"XMLHTTP TEXT ("+c+"): "+Gh(i,l)+(f?" "+f:"")})}function Hh(i,c){i.info(function(){return"TIMEOUT: "+c})}An.prototype.info=function(){};function Gh(i,c){if(!i.g)return c;if(!c)return null;try{const R=JSON.parse(c);if(R){for(i=0;i<R.length;i++)if(Array.isArray(R[i])){var l=R[i];if(!(l.length<2)){var f=l[1];if(Array.isArray(f)&&!(f.length<1)){var v=f[0];if(v!="noop"&&v!="stop"&&v!="close")for(let b=1;b<f.length;b++)f[b]=""}}}}return Bs(R)}catch{return c}}var Er={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},na={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},ra;function $s(){}g($s,Xo),$s.prototype.g=function(){return new XMLHttpRequest},ra=new $s;function Rn(i){return encodeURIComponent(String(i))}function Wh(i){var c=1;i=i.split(":");const l=[];for(;c>0&&i.length;)l.push(i.shift()),c--;return i.length&&l.push(i.join(":")),l}function tt(i,c,l,f){this.j=i,this.i=c,this.l=l,this.S=f||1,this.V=new Tn(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new sa}function sa(){this.i=null,this.g="",this.h=!1}var ia={},zs={};function Hs(i,c,l){i.M=1,i.A=Ir(Oe(c)),i.u=l,i.R=!0,oa(i,null)}function oa(i,c){i.F=Date.now(),Tr(i),i.B=Oe(i.A);var l=i.B,f=i.S;Array.isArray(f)||(f=[String(f)]),Ea(l.i,"t",f),i.C=0,l=i.j.L,i.h=new sa,i.g=xa(i.j,l?c:null,!i.u),i.P>0&&(i.O=new Bh(d(i.Y,i,i.g),i.P)),c=i.V,l=i.g,f=i.ba;var v="readystatechange";Array.isArray(v)||(v&&(Ko[0]=v.toString()),v=Ko);for(let R=0;R<v.length;R++){const b=$o(l,v[R],f||c.handleEvent,!1,c.h||c);if(!b)break;c.g[b.key]=b}c=i.J?Bo(i.J):{},i.u?(i.v||(i.v="POST"),c["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.B,i.v,i.u,c)):(i.v="GET",i.g.ea(i.B,i.v,null,c)),wn(),$h(i.i,i.v,i.B,i.l,i.S,i.u)}tt.prototype.ba=function(i){i=i.target;const c=this.O;c&&st(i)==3?c.j():this.Y(i)},tt.prototype.Y=function(i){try{if(i==this.g)e:{const B=st(this.g),ae=this.g.ya(),Q=this.g.ca();if(!(B<3)&&(B!=3||this.g&&(this.h.h||this.g.la()||Sa(this.g)))){this.K||B!=4||ae==7||(ae==8||Q<=0?wn(3):wn(2)),Gs(this);var c=this.g.ca();this.X=c;var l=Kh(this);if(this.o=c==200,zh(this.i,this.v,this.B,this.l,this.S,B,c),this.o){if(this.U&&!this.L){t:{if(this.g){var f,v=this.g;if((f=v.g?v.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!_(f)){var R=f;break t}}R=null}if(i=R)Ht(this.i,this.l,i,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Ws(this,i);else{this.o=!1,this.m=3,we(12),bt(this),Sn(this);break e}}if(this.R){i=!0;let le;for(;!this.K&&this.C<l.length;)if(le=Qh(this,l),le==zs){B==4&&(this.m=4,we(14),i=!1),Ht(this.i,this.l,null,"[Incomplete Response]");break}else if(le==ia){this.m=4,we(15),Ht(this.i,this.l,l,"[Invalid Chunk]"),i=!1;break}else Ht(this.i,this.l,le,null),Ws(this,le);if(aa(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),B!=4||l.length!=0||this.h.h||(this.m=1,we(16),i=!1),this.o=this.o&&i,!i)Ht(this.i,this.l,l,"[Invalid Chunked Response]"),bt(this),Sn(this);else if(l.length>0&&!this.W){this.W=!0;var b=this.j;b.g==this&&b.aa&&!b.P&&(b.j.info("Great, no buffering proxy detected. Bytes received: "+l.length),ti(b),b.P=!0,we(11))}}else Ht(this.i,this.l,l,null),Ws(this,l);B==4&&bt(this),this.o&&!this.K&&(B==4?Na(this.j,this):(this.o=!1,Tr(this)))}else ud(this.g),c==400&&l.indexOf("Unknown SID")>0?(this.m=3,we(12)):(this.m=0,we(13)),bt(this),Sn(this)}}}catch{}finally{}};function Kh(i){if(!aa(i))return i.g.la();const c=Sa(i.g);if(c==="")return"";let l="";const f=c.length,v=st(i.g)==4;if(!i.h.i){if(typeof TextDecoder>"u")return bt(i),Sn(i),"";i.h.i=new a.TextDecoder}for(let R=0;R<f;R++)i.h.h=!0,l+=i.h.i.decode(c[R],{stream:!(v&&R==f-1)});return c.length=0,i.h.g+=l,i.C=0,i.h.g}function aa(i){return i.g?i.v=="GET"&&i.M!=2&&i.j.Aa:!1}function Qh(i,c){var l=i.C,f=c.indexOf(`
`,l);return f==-1?zs:(l=Number(c.substring(l,f)),isNaN(l)?ia:(f+=1,f+l>c.length?zs:(c=c.slice(f,f+l),i.C=f+l,c)))}tt.prototype.cancel=function(){this.K=!0,bt(this)};function Tr(i){i.T=Date.now()+i.H,ca(i,i.H)}function ca(i,c){if(i.D!=null)throw Error("WatchDog timer not null");i.D=vn(d(i.aa,i),c)}function Gs(i){i.D&&(a.clearTimeout(i.D),i.D=null)}tt.prototype.aa=function(){this.D=null;const i=Date.now();i-this.T>=0?(Hh(this.i,this.B),this.M!=2&&(wn(),we(17)),bt(this),this.m=2,Sn(this)):ca(this,this.T-i)};function Sn(i){i.j.I==0||i.K||Na(i.j,i)}function bt(i){Gs(i);var c=i.O;c&&typeof c.dispose=="function"&&c.dispose(),i.O=null,Qo(i.V),i.g&&(c=i.g,i.g=null,c.abort(),c.dispose())}function Ws(i,c){try{var l=i.j;if(l.I!=0&&(l.g==i||Ks(l.h,i))){if(!i.L&&Ks(l.h,i)&&l.I==3){try{var f=l.Ba.g.parse(c)}catch{f=null}if(Array.isArray(f)&&f.length==3){var v=f;if(v[0]==0){e:if(!l.v){if(l.g)if(l.g.F+3e3<i.F)Sr(l),Ar(l);else break e;ei(l),we(18)}}else l.xa=v[1],0<l.xa-l.K&&v[2]<37500&&l.F&&l.A==0&&!l.C&&(l.C=vn(d(l.Va,l),6e3));ha(l.h)<=1&&l.ta&&(l.ta=void 0)}else kt(l,11)}else if((i.L||l.g==i)&&Sr(l),!_(c))for(v=l.Ba.g.parse(c),c=0;c<v.length;c++){let Q=v[c];const le=Q[0];if(!(le<=l.K))if(l.K=le,Q=Q[1],l.I==2)if(Q[0]=="c"){l.M=Q[1],l.ba=Q[2];const Me=Q[3];Me!=null&&(l.ka=Me,l.j.info("VER="+l.ka));const Dt=Q[4];Dt!=null&&(l.za=Dt,l.j.info("SVER="+l.za));const it=Q[5];it!=null&&typeof it=="number"&&it>0&&(f=1.5*it,l.O=f,l.j.info("backChannelRequestTimeoutMs_="+f)),f=l;const ot=i.g;if(ot){const Cr=ot.g?ot.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Cr){var R=f.h;R.g||Cr.indexOf("spdy")==-1&&Cr.indexOf("quic")==-1&&Cr.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(Qs(R,R.h),R.h=null))}if(f.G){const ni=ot.g?ot.g.getResponseHeader("X-HTTP-Session-Id"):null;ni&&(f.wa=ni,J(f.J,f.G,ni))}}l.I=3,l.l&&l.l.ra(),l.aa&&(l.T=Date.now()-i.F,l.j.info("Handshake RTT: "+l.T+"ms")),f=l;var b=i;if(f.na=La(f,f.L?f.ba:null,f.W),b.L){da(f.h,b);var B=b,ae=f.O;ae&&(B.H=ae),B.D&&(Gs(B),Tr(B)),f.g=b}else ka(f);l.i.length>0&&Rr(l)}else Q[0]!="stop"&&Q[0]!="close"||kt(l,7);else l.I==3&&(Q[0]=="stop"||Q[0]=="close"?Q[0]=="stop"?kt(l,7):Zs(l):Q[0]!="noop"&&l.l&&l.l.qa(Q),l.A=0)}}wn(4)}catch{}}var Xh=class{constructor(i,c){this.g=i,this.map=c}};function ua(i){this.l=i||10,a.PerformanceNavigationTiming?(i=a.performance.getEntriesByType("navigation"),i=i.length>0&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(a.chrome&&a.chrome.loadTimes&&a.chrome.loadTimes()&&a.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function la(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function ha(i){return i.h?1:i.g?i.g.size:0}function Ks(i,c){return i.h?i.h==c:i.g?i.g.has(c):!1}function Qs(i,c){i.g?i.g.add(c):i.h=c}function da(i,c){i.h&&i.h==c?i.h=null:i.g&&i.g.has(c)&&i.g.delete(c)}ua.prototype.cancel=function(){if(this.i=fa(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function fa(i){if(i.h!=null)return i.i.concat(i.h.G);if(i.g!=null&&i.g.size!==0){let c=i.i;for(const l of i.g.values())c=c.concat(l.G);return c}return P(i.i)}var pa=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Jh(i,c){if(i){i=i.split("&");for(let l=0;l<i.length;l++){const f=i[l].indexOf("=");let v,R=null;f>=0?(v=i[l].substring(0,f),R=i[l].substring(f+1)):v=i[l],c(v,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function nt(i){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let c;i instanceof nt?(this.l=i.l,Pn(this,i.j),this.o=i.o,this.g=i.g,Cn(this,i.u),this.h=i.h,Xs(this,Ta(i.i)),this.m=i.m):i&&(c=String(i).match(pa))?(this.l=!1,Pn(this,c[1]||"",!0),this.o=bn(c[2]||""),this.g=bn(c[3]||"",!0),Cn(this,c[4]),this.h=bn(c[5]||"",!0),Xs(this,c[6]||"",!0),this.m=bn(c[7]||"")):(this.l=!1,this.i=new kn(null,this.l))}nt.prototype.toString=function(){const i=[];var c=this.j;c&&i.push(Vn(c,ma,!0),":");var l=this.g;return(l||c=="file")&&(i.push("//"),(c=this.o)&&i.push(Vn(c,ma,!0),"@"),i.push(Rn(l).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l=this.u,l!=null&&i.push(":",String(l))),(l=this.h)&&(this.g&&l.charAt(0)!="/"&&i.push("/"),i.push(Vn(l,l.charAt(0)=="/"?ed:Zh,!0))),(l=this.i.toString())&&i.push("?",l),(l=this.m)&&i.push("#",Vn(l,nd)),i.join("")},nt.prototype.resolve=function(i){const c=Oe(this);let l=!!i.j;l?Pn(c,i.j):l=!!i.o,l?c.o=i.o:l=!!i.g,l?c.g=i.g:l=i.u!=null;var f=i.h;if(l)Cn(c,i.u);else if(l=!!i.h){if(f.charAt(0)!="/")if(this.g&&!this.h)f="/"+f;else{var v=c.h.lastIndexOf("/");v!=-1&&(f=c.h.slice(0,v+1)+f)}if(v=f,v==".."||v==".")f="";else if(v.indexOf("./")!=-1||v.indexOf("/.")!=-1){f=v.lastIndexOf("/",0)==0,v=v.split("/");const R=[];for(let b=0;b<v.length;){const B=v[b++];B=="."?f&&b==v.length&&R.push(""):B==".."?((R.length>1||R.length==1&&R[0]!="")&&R.pop(),f&&b==v.length&&R.push("")):(R.push(B),f=!0)}f=R.join("/")}else f=v}return l?c.h=f:l=i.i.toString()!=="",l?Xs(c,Ta(i.i)):l=!!i.m,l&&(c.m=i.m),c};function Oe(i){return new nt(i)}function Pn(i,c,l){i.j=l?bn(c,!0):c,i.j&&(i.j=i.j.replace(/:$/,""))}function Cn(i,c){if(c){if(c=Number(c),isNaN(c)||c<0)throw Error("Bad port number "+c);i.u=c}else i.u=null}function Xs(i,c,l){c instanceof kn?(i.i=c,rd(i.i,i.l)):(l||(c=Vn(c,td)),i.i=new kn(c,i.l))}function J(i,c,l){i.i.set(c,l)}function Ir(i){return J(i,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),i}function bn(i,c){return i?c?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function Vn(i,c,l){return typeof i=="string"?(i=encodeURI(i).replace(c,Yh),l&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function Yh(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var ma=/[#\/\?@]/g,Zh=/[#\?:]/g,ed=/[#\?]/g,td=/[#\?@]/g,nd=/#/g;function kn(i,c){this.h=this.g=null,this.i=i||null,this.j=!!c}function Vt(i){i.g||(i.g=new Map,i.h=0,i.i&&Jh(i.i,function(c,l){i.add(decodeURIComponent(c.replace(/\+/g," ")),l)}))}n=kn.prototype,n.add=function(i,c){Vt(this),this.i=null,i=Gt(this,i);let l=this.g.get(i);return l||this.g.set(i,l=[]),l.push(c),this.h+=1,this};function ga(i,c){Vt(i),c=Gt(i,c),i.g.has(c)&&(i.i=null,i.h-=i.g.get(c).length,i.g.delete(c))}function _a(i,c){return Vt(i),c=Gt(i,c),i.g.has(c)}n.forEach=function(i,c){Vt(this),this.g.forEach(function(l,f){l.forEach(function(v){i.call(c,v,f,this)},this)},this)};function ya(i,c){Vt(i);let l=[];if(typeof c=="string")_a(i,c)&&(l=l.concat(i.g.get(Gt(i,c))));else for(i=Array.from(i.g.values()),c=0;c<i.length;c++)l=l.concat(i[c]);return l}n.set=function(i,c){return Vt(this),this.i=null,i=Gt(this,i),_a(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[c]),this.h+=1,this},n.get=function(i,c){return i?(i=ya(this,i),i.length>0?String(i[0]):c):c};function Ea(i,c,l){ga(i,c),l.length>0&&(i.i=null,i.g.set(Gt(i,c),P(l)),i.h+=l.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],c=Array.from(this.g.keys());for(let f=0;f<c.length;f++){var l=c[f];const v=Rn(l);l=ya(this,l);for(let R=0;R<l.length;R++){let b=v;l[R]!==""&&(b+="="+Rn(l[R])),i.push(b)}}return this.i=i.join("&")};function Ta(i){const c=new kn;return c.i=i.i,i.g&&(c.g=new Map(i.g),c.h=i.h),c}function Gt(i,c){return c=String(c),i.j&&(c=c.toLowerCase()),c}function rd(i,c){c&&!i.j&&(Vt(i),i.i=null,i.g.forEach(function(l,f){const v=f.toLowerCase();f!=v&&(ga(this,f),Ea(this,v,l))},i)),i.j=c}function sd(i,c){const l=new An;if(a.Image){const f=new Image;f.onload=p(rt,l,"TestLoadImage: loaded",!0,c,f),f.onerror=p(rt,l,"TestLoadImage: error",!1,c,f),f.onabort=p(rt,l,"TestLoadImage: abort",!1,c,f),f.ontimeout=p(rt,l,"TestLoadImage: timeout",!1,c,f),a.setTimeout(function(){f.ontimeout&&f.ontimeout()},1e4),f.src=i}else c(!1)}function id(i,c){const l=new An,f=new AbortController,v=setTimeout(()=>{f.abort(),rt(l,"TestPingServer: timeout",!1,c)},1e4);fetch(i,{signal:f.signal}).then(R=>{clearTimeout(v),R.ok?rt(l,"TestPingServer: ok",!0,c):rt(l,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(v),rt(l,"TestPingServer: error",!1,c)})}function rt(i,c,l,f,v){try{v&&(v.onload=null,v.onerror=null,v.onabort=null,v.ontimeout=null),f(l)}catch{}}function od(){this.g=new jh}function Js(i){this.i=i.Sb||null,this.h=i.ab||!1}g(Js,Xo),Js.prototype.g=function(){return new wr(this.i,this.h)};function wr(i,c){me.call(this),this.H=i,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}g(wr,me),n=wr.prototype,n.open=function(i,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=i,this.D=c,this.readyState=1,Nn(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const c={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};i&&(c.body=i),(this.H||a).fetch(new Request(this.D,c)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Dn(this)),this.readyState=0},n.Pa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,Nn(this)),this.g&&(this.readyState=3,Nn(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof a.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;Ia(this)}else i.text().then(this.Oa.bind(this),this.ga.bind(this))};function Ia(i){i.j.read().then(i.Ma.bind(i)).catch(i.ga.bind(i))}n.Ma=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var c=i.value?i.value:new Uint8Array(0);(c=this.B.decode(c,{stream:!i.done}))&&(this.response=this.responseText+=c)}i.done?Dn(this):Nn(this),this.readyState==3&&Ia(this)}},n.Oa=function(i){this.g&&(this.response=this.responseText=i,Dn(this))},n.Na=function(i){this.g&&(this.response=i,Dn(this))},n.ga=function(){this.g&&Dn(this)};function Dn(i){i.readyState=4,i.l=null,i.j=null,i.B=null,Nn(i)}n.setRequestHeader=function(i,c){this.A.append(i,c)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],c=this.h.entries();for(var l=c.next();!l.done;)l=l.value,i.push(l[0]+": "+l[1]),l=c.next();return i.join(`\r
`)};function Nn(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(wr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function wa(i){let c="";return mr(i,function(l,f){c+=f,c+=":",c+=l,c+=`\r
`}),c}function Ys(i,c,l){e:{for(f in l){var f=!1;break e}f=!0}f||(l=wa(l),typeof i=="string"?l!=null&&Rn(l):J(i,c,l))}function ee(i){me.call(this),this.headers=new Map,this.L=i||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}g(ee,me);var ad=/^https?$/i,cd=["POST","PUT"];n=ee.prototype,n.Fa=function(i){this.H=i},n.ea=function(i,c,l,f){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);c=c?c.toUpperCase():"GET",this.D=i,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():ra.g(),this.g.onreadystatechange=T(d(this.Ca,this));try{this.B=!0,this.g.open(c,String(i),!0),this.B=!1}catch(R){va(this,R);return}if(i=l||"",l=new Map(this.headers),f)if(Object.getPrototypeOf(f)===Object.prototype)for(var v in f)l.set(v,f[v]);else if(typeof f.keys=="function"&&typeof f.get=="function")for(const R of f.keys())l.set(R,f.get(R));else throw Error("Unknown input type for opt_headers: "+String(f));f=Array.from(l.keys()).find(R=>R.toLowerCase()=="content-type"),v=a.FormData&&i instanceof a.FormData,!(Array.prototype.indexOf.call(cd,c,void 0)>=0)||f||v||l.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,b]of l)this.g.setRequestHeader(R,b);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(i),this.v=!1}catch(R){va(this,R)}};function va(i,c){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=c,i.o=5,Aa(i),vr(i)}function Aa(i){i.A||(i.A=!0,Ie(i,"complete"),Ie(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=i||7,Ie(this,"complete"),Ie(this,"abort"),vr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),vr(this,!0)),ee.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Ra(this):this.Xa())},n.Xa=function(){Ra(this)};function Ra(i){if(i.h&&typeof o<"u"){if(i.v&&st(i)==4)setTimeout(i.Ca.bind(i),0);else if(Ie(i,"readystatechange"),st(i)==4){i.h=!1;try{const R=i.ca();e:switch(R){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var l;if(!(l=c)){var f;if(f=R===0){let b=String(i.D).match(pa)[1]||null;!b&&a.self&&a.self.location&&(b=a.self.location.protocol.slice(0,-1)),f=!ad.test(b?b.toLowerCase():"")}l=f}if(l)Ie(i,"complete"),Ie(i,"success");else{i.o=6;try{var v=st(i)>2?i.g.statusText:""}catch{v=""}i.l=v+" ["+i.ca()+"]",Aa(i)}}finally{vr(i)}}}}function vr(i,c){if(i.g){i.m&&(clearTimeout(i.m),i.m=null);const l=i.g;i.g=null,c||Ie(i,"ready");try{l.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function st(i){return i.g?i.g.readyState:0}n.ca=function(){try{return st(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(i){if(this.g){var c=this.g.responseText;return i&&c.indexOf(i)==0&&(c=c.substring(i.length)),qh(c)}};function Sa(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.F){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function ud(i){const c={};i=(i.g&&st(i)>=2&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let f=0;f<i.length;f++){if(_(i[f]))continue;var l=Wh(i[f]);const v=l[0];if(l=l[1],typeof l!="string")continue;l=l.trim();const R=c[v]||[];c[v]=R,R.push(l)}Mh(c,function(f){return f.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function On(i,c,l){return l&&l.internalChannelParams&&l.internalChannelParams[i]||c}function Pa(i){this.za=0,this.i=[],this.j=new An,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=On("failFast",!1,i),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=On("baseRetryDelayMs",5e3,i),this.Za=On("retryDelaySeedMs",1e4,i),this.Ta=On("forwardChannelMaxRetries",2,i),this.va=On("forwardChannelRequestTimeoutMs",2e4,i),this.ma=i&&i.xmlHttpFactory||void 0,this.Ua=i&&i.Rb||void 0,this.Aa=i&&i.useFetchStreams||!1,this.O=void 0,this.L=i&&i.supportsCrossDomainXhr||!1,this.M="",this.h=new ua(i&&i.concurrentRequestLimit),this.Ba=new od,this.S=i&&i.fastHandshake||!1,this.R=i&&i.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=i&&i.Pb||!1,i&&i.ua&&this.j.ua(),i&&i.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&i&&i.detectBufferingProxy||!1,this.ia=void 0,i&&i.longPollingTimeout&&i.longPollingTimeout>0&&(this.ia=i.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Pa.prototype,n.ka=8,n.I=1,n.connect=function(i,c,l,f){we(0),this.W=i,this.H=c||{},l&&f!==void 0&&(this.H.OSID=l,this.H.OAID=f),this.F=this.X,this.J=La(this,null,this.W),Rr(this)};function Zs(i){if(Ca(i),i.I==3){var c=i.V++,l=Oe(i.J);if(J(l,"SID",i.M),J(l,"RID",c),J(l,"TYPE","terminate"),Mn(i,l),c=new tt(i,i.j,c),c.M=2,c.A=Ir(Oe(l)),l=!1,a.navigator&&a.navigator.sendBeacon)try{l=a.navigator.sendBeacon(c.A.toString(),"")}catch{}!l&&a.Image&&(new Image().src=c.A,l=!0),l||(c.g=xa(c.j,null),c.g.ea(c.A)),c.F=Date.now(),Tr(c)}Ma(i)}function Ar(i){i.g&&(ti(i),i.g.cancel(),i.g=null)}function Ca(i){Ar(i),i.v&&(a.clearTimeout(i.v),i.v=null),Sr(i),i.h.cancel(),i.m&&(typeof i.m=="number"&&a.clearTimeout(i.m),i.m=null)}function Rr(i){if(!la(i.h)&&!i.m){i.m=!0;var c=i.Ea;Se||m(),oe||(Se(),oe=!0),I.add(c,i),i.D=0}}function ld(i,c){return ha(i.h)>=i.h.j-(i.m?1:0)?!1:i.m?(i.i=c.G.concat(i.i),!0):i.I==1||i.I==2||i.D>=(i.Sa?0:i.Ta)?!1:(i.m=vn(d(i.Ea,i,c),Oa(i,i.D)),i.D++,!0)}n.Ea=function(i){if(this.m)if(this.m=null,this.I==1){if(!i){this.V=Math.floor(Math.random()*1e5),i=this.V++;const v=new tt(this,this.j,i);let R=this.o;if(this.U&&(R?(R=Bo(R),jo(R,this.U)):R=this.U),this.u!==null||this.R||(v.J=R,R=null),this.S)e:{for(var c=0,l=0;l<this.i.length;l++){t:{var f=this.i[l];if("__data__"in f.map&&(f=f.map.__data__,typeof f=="string")){f=f.length;break t}f=void 0}if(f===void 0)break;if(c+=f,c>4096){c=l;break e}if(c===4096||l===this.i.length-1){c=l+1;break e}}c=1e3}else c=1e3;c=Va(this,v,c),l=Oe(this.J),J(l,"RID",i),J(l,"CVER",22),this.G&&J(l,"X-HTTP-Session-Id",this.G),Mn(this,l),R&&(this.R?c="headers="+Rn(wa(R))+"&"+c:this.u&&Ys(l,this.u,R)),Qs(this.h,v),this.Ra&&J(l,"TYPE","init"),this.S?(J(l,"$req",c),J(l,"SID","null"),v.U=!0,Hs(v,l,null)):Hs(v,l,c),this.I=2}}else this.I==3&&(i?ba(this,i):this.i.length==0||la(this.h)||ba(this))};function ba(i,c){var l;c?l=c.l:l=i.V++;const f=Oe(i.J);J(f,"SID",i.M),J(f,"RID",l),J(f,"AID",i.K),Mn(i,f),i.u&&i.o&&Ys(f,i.u,i.o),l=new tt(i,i.j,l,i.D+1),i.u===null&&(l.J=i.o),c&&(i.i=c.G.concat(i.i)),c=Va(i,l,1e3),l.H=Math.round(i.va*.5)+Math.round(i.va*.5*Math.random()),Qs(i.h,l),Hs(l,f,c)}function Mn(i,c){i.H&&mr(i.H,function(l,f){J(c,f,l)}),i.l&&mr({},function(l,f){J(c,f,l)})}function Va(i,c,l){l=Math.min(i.i.length,l);const f=i.l?d(i.l.Ka,i.l,i):null;e:{var v=i.i;let B=-1;for(;;){const ae=["count="+l];B==-1?l>0?(B=v[0].g,ae.push("ofs="+B)):B=0:ae.push("ofs="+B);let Q=!0;for(let le=0;le<l;le++){var R=v[le].g;const Me=v[le].map;if(R-=B,R<0)B=Math.max(0,v[le].g-100),Q=!1;else try{R="req"+R+"_"||"";try{var b=Me instanceof Map?Me:Object.entries(Me);for(const[Dt,it]of b){let ot=it;u(it)&&(ot=Bs(it)),ae.push(R+Dt+"="+encodeURIComponent(ot))}}catch(Dt){throw ae.push(R+"type="+encodeURIComponent("_badmap")),Dt}}catch{f&&f(Me)}}if(Q){b=ae.join("&");break e}}b=void 0}return i=i.i.splice(0,l),c.G=i,b}function ka(i){if(!i.g&&!i.v){i.Y=1;var c=i.Da;Se||m(),oe||(Se(),oe=!0),I.add(c,i),i.A=0}}function ei(i){return i.g||i.v||i.A>=3?!1:(i.Y++,i.v=vn(d(i.Da,i),Oa(i,i.A)),i.A++,!0)}n.Da=function(){if(this.v=null,Da(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var i=4*this.T;this.j.info("BP detection timer enabled: "+i),this.B=vn(d(this.Wa,this),i)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,we(10),Ar(this),Da(this))};function ti(i){i.B!=null&&(a.clearTimeout(i.B),i.B=null)}function Da(i){i.g=new tt(i,i.j,"rpc",i.Y),i.u===null&&(i.g.J=i.o),i.g.P=0;var c=Oe(i.na);J(c,"RID","rpc"),J(c,"SID",i.M),J(c,"AID",i.K),J(c,"CI",i.F?"0":"1"),!i.F&&i.ia&&J(c,"TO",i.ia),J(c,"TYPE","xmlhttp"),Mn(i,c),i.u&&i.o&&Ys(c,i.u,i.o),i.O&&(i.g.H=i.O);var l=i.g;i=i.ba,l.M=1,l.A=Ir(Oe(c)),l.u=null,l.R=!0,oa(l,i)}n.Va=function(){this.C!=null&&(this.C=null,Ar(this),ei(this),we(19))};function Sr(i){i.C!=null&&(a.clearTimeout(i.C),i.C=null)}function Na(i,c){var l=null;if(i.g==c){Sr(i),ti(i),i.g=null;var f=2}else if(Ks(i.h,c))l=c.G,da(i.h,c),f=1;else return;if(i.I!=0){if(c.o)if(f==1){l=c.u?c.u.length:0,c=Date.now()-c.F;var v=i.D;f=yr(),Ie(f,new ta(f,l)),Rr(i)}else ka(i);else if(v=c.m,v==3||v==0&&c.X>0||!(f==1&&ld(i,c)||f==2&&ei(i)))switch(l&&l.length>0&&(c=i.h,c.i=c.i.concat(l)),v){case 1:kt(i,5);break;case 4:kt(i,10);break;case 3:kt(i,6);break;default:kt(i,2)}}}function Oa(i,c){let l=i.Qa+Math.floor(Math.random()*i.Za);return i.isActive()||(l*=2),l*c}function kt(i,c){if(i.j.info("Error code "+c),c==2){var l=d(i.bb,i),f=i.Ua;const v=!f;f=new nt(f||"//www.google.com/images/cleardot.gif"),a.location&&a.location.protocol=="http"||Pn(f,"https"),Ir(f),v?sd(f.toString(),l):id(f.toString(),l)}else we(2);i.I=0,i.l&&i.l.pa(c),Ma(i),Ca(i)}n.bb=function(i){i?(this.j.info("Successfully pinged google.com"),we(2)):(this.j.info("Failed to ping google.com"),we(1))};function Ma(i){if(i.I=0,i.ja=[],i.l){const c=fa(i.h);(c.length!=0||i.i.length!=0)&&(D(i.ja,c),D(i.ja,i.i),i.h.i.length=0,P(i.i),i.i.length=0),i.l.oa()}}function La(i,c,l){var f=l instanceof nt?Oe(l):new nt(l);if(f.g!="")c&&(f.g=c+"."+f.g),Cn(f,f.u);else{var v=a.location;f=v.protocol,c=c?c+"."+v.hostname:v.hostname,v=+v.port;const R=new nt(null);f&&Pn(R,f),c&&(R.g=c),v&&Cn(R,v),l&&(R.h=l),f=R}return l=i.G,c=i.wa,l&&c&&J(f,l,c),J(f,"VER",i.ka),Mn(i,f),f}function xa(i,c,l){if(c&&!i.L)throw Error("Can't create secondary domain capable XhrIo object.");return c=i.Aa&&!i.ma?new ee(new Js({ab:l})):new ee(i.ma),c.Fa(i.L),c}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Fa(){}n=Fa.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Pr(){}Pr.prototype.g=function(i,c){return new Pe(i,c)};function Pe(i,c){me.call(this),this.g=new Pa(c),this.l=i,this.h=c&&c.messageUrlParams||null,i=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(i?i["X-WebChannel-Content-Type"]=c.messageContentType:i={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.sa&&(i?i["X-WebChannel-Client-Profile"]=c.sa:i={"X-WebChannel-Client-Profile":c.sa}),this.g.U=i,(i=c&&c.Qb)&&!_(i)&&(this.g.u=i),this.A=c&&c.supportsCrossDomainXhr||!1,this.v=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!_(c)&&(this.g.G=c,i=this.h,i!==null&&c in i&&(i=this.h,c in i&&delete i[c])),this.j=new Wt(this)}g(Pe,me),Pe.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},Pe.prototype.close=function(){Zs(this.g)},Pe.prototype.o=function(i){var c=this.g;if(typeof i=="string"){var l={};l.__data__=i,i=l}else this.v&&(l={},l.__data__=Bs(i),i=l);c.i.push(new Xh(c.Ya++,i)),c.I==3&&Rr(c)},Pe.prototype.N=function(){this.g.l=null,delete this.j,Zs(this.g),delete this.g,Pe.Z.N.call(this)};function Ua(i){qs.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var c=i.__sm__;if(c){e:{for(const l in c){i=l;break e}i=void 0}(this.i=i)&&(i=this.i,c=c!==null&&i in c?c[i]:void 0),this.data=c}else this.data=i}g(Ua,qs);function Ba(){js.call(this),this.status=1}g(Ba,js);function Wt(i){this.g=i}g(Wt,Fa),Wt.prototype.ra=function(){Ie(this.g,"a")},Wt.prototype.qa=function(i){Ie(this.g,new Ua(i))},Wt.prototype.pa=function(i){Ie(this.g,new Ba)},Wt.prototype.oa=function(){Ie(this.g,"b")},Pr.prototype.createWebChannel=Pr.prototype.g,Pe.prototype.send=Pe.prototype.o,Pe.prototype.open=Pe.prototype.m,Pe.prototype.close=Pe.prototype.close,Nu=function(){return new Pr},Du=function(){return yr()},ku=Ct,Ti={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Er.NO_ERROR=0,Er.TIMEOUT=8,Er.HTTP_ERROR=6,Mr=Er,na.COMPLETE="complete",Vu=na,Jo.EventType=In,In.OPEN="a",In.CLOSE="b",In.ERROR="c",In.MESSAGE="d",me.prototype.listen=me.prototype.J,Ln=Jo,ee.prototype.listenOnce=ee.prototype.K,ee.prototype.getLastError=ee.prototype.Ha,ee.prototype.getLastErrorCode=ee.prototype.ya,ee.prototype.getStatus=ee.prototype.ca,ee.prototype.getResponseJson=ee.prototype.La,ee.prototype.getResponseText=ee.prototype.la,ee.prototype.send=ee.prototype.ea,ee.prototype.setWithCredentials=ee.prototype.Fa,bu=ee}).apply(typeof br<"u"?br:typeof self<"u"?self:typeof window<"u"?window:{});const Za="@firebase/firestore",ec="4.9.2";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}_e.UNAUTHENTICATED=new _e(null),_e.GOOGLE_CREDENTIALS=new _e("google-credentials-uid"),_e.FIRST_PARTY=new _e("first-party-uid"),_e.MOCK_USER=new _e("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let pn="12.3.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bt=new Bi("@firebase/firestore");function Kt(){return Bt.logLevel}function N(n,...e){if(Bt.logLevel<=j.DEBUG){const t=e.map($i);Bt.debug(`Firestore (${pn}): ${n}`,...t)}}function Qe(n,...e){if(Bt.logLevel<=j.ERROR){const t=e.map($i);Bt.error(`Firestore (${pn}): ${n}`,...t)}}function sn(n,...e){if(Bt.logLevel<=j.WARN){const t=e.map($i);Bt.warn(`Firestore (${pn}): ${n}`,...t)}}function $i(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function L(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,Ou(n,r,t)}function Ou(n,e,t){let r=`FIRESTORE (${pn}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Qe(r),new Error(r)}function W(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||Ou(e,s,r)}function U(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class k extends Ze{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mu{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class ep{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(_e.UNAUTHENTICATED))}shutdown(){}}class tp{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class np{constructor(e){this.t=e,this.currentUser=_e.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){W(this.o===void 0,42304);let r=this.i;const s=h=>this.i!==r?(r=this.i,t(h)):Promise.resolve();let o=new We;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new We,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const h=o;e.enqueueRetryable(async()=>{await h.promise,await s(this.currentUser)})},u=h=>{N("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=h,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(h=>u(h)),setTimeout(()=>{if(!this.auth){const h=this.t.getImmediate({optional:!0});h?u(h):(N("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new We)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(N("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(W(typeof r.accessToken=="string",31837,{l:r}),new Mu(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return W(e===null||typeof e=="string",2055,{h:e}),new _e(e)}}class rp{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=_e.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class sp{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new rp(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(_e.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class tc{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class ip{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,xe(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){W(this.o===void 0,3512);const r=o=>{o.error!=null&&N("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.m;return this.m=o.token,N("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(o.token):Promise.resolve()};this.o=o=>{e.enqueueRetryable(()=>r(o))};const s=o=>{N("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(o=>s(o)),setTimeout(()=>{if(!this.appCheck){const o=this.V.getImmediate({optional:!0});o?s(o):N("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new tc(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(W(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new tc(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function op(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zi{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=op(40);for(let o=0;o<s.length;++o)r.length<20&&s[o]<t&&(r+=e.charAt(s[o]%62))}return r}}function $(n,e){return n<e?-1:n>e?1:0}function Ii(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),o=e.charAt(r);if(s!==o)return ci(s)===ci(o)?$(s,o):ci(s)?1:-1}return $(n.length,e.length)}const ap=55296,cp=57343;function ci(n){const e=n.charCodeAt(0);return e>=ap&&e<=cp}function on(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nc="__name__";class Le{constructor(e,t,r){t===void 0?t=0:t>e.length&&L(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&L(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Le.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Le?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const o=Le.compareSegments(e.get(s),t.get(s));if(o!==0)return o}return $(e.length,t.length)}static compareSegments(e,t){const r=Le.isNumericId(e),s=Le.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?Le.extractNumericId(e).compare(Le.extractNumericId(t)):Ii(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return gt.fromString(e.substring(4,e.length-2))}}class X extends Le{construct(e,t,r){return new X(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new k(S.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new X(t)}static emptyPath(){return new X([])}}const up=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class fe extends Le{construct(e,t,r){return new fe(e,t,r)}static isValidIdentifier(e){return up.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),fe.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===nc}static keyField(){return new fe([nc])}static fromServerFormat(e){const t=[];let r="",s=0;const o=()=>{if(r.length===0)throw new k(S.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const u=e[s];if(u==="\\"){if(s+1===e.length)throw new k(S.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const h=e[s+1];if(h!=="\\"&&h!=="."&&h!=="`")throw new k(S.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=h,s+=2}else u==="`"?(a=!a,s++):u!=="."||a?(r+=u,s++):(o(),s++)}if(o(),a)throw new k(S.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new fe(t)}static emptyPath(){return new fe([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e){this.path=e}static fromPath(e){return new M(X.fromString(e))}static fromName(e){return new M(X.fromString(e).popFirst(5))}static empty(){return new M(X.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&X.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return X.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new M(new X(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lu(n,e,t){if(!t)throw new k(S.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function lp(n,e,t,r){if(e===!0&&r===!0)throw new k(S.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function rc(n){if(!M.isDocumentKey(n))throw new k(S.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function sc(n){if(M.isDocumentKey(n))throw new k(S.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function xu(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function hs(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":L(12329,{type:typeof n})}function Ve(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new k(S.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=hs(n);throw new k(S.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}function hp(n,e){if(e<=0)throw new k(S.INVALID_ARGUMENT,`Function ${n}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ie(n,e){const t={typeString:n};return e&&(t.value=e),t}function ir(n,e){if(!xu(n))throw new k(S.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,o="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const a=n[r];if(s&&typeof a!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(o!==void 0&&a!==o.value){t=`Expected '${r}' field to equal '${o.value}'`;break}}if(t)throw new k(S.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ic=-62135596800,oc=1e6;class Y{static now(){return Y.fromMillis(Date.now())}static fromDate(e){return Y.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*oc);return new Y(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new k(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new k(S.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<ic)throw new k(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new k(S.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/oc}_compareTo(e){return this.seconds===e.seconds?$(this.nanoseconds,e.nanoseconds):$(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:Y._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(ir(e,Y._jsonSchema))return new Y(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-ic;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}Y._jsonSchemaVersion="firestore/timestamp/1.0",Y._jsonSchema={type:ie("string",Y._jsonSchemaVersion),seconds:ie("number"),nanoseconds:ie("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F{static fromTimestamp(e){return new F(e)}static min(){return new F(new Y(0,0))}static max(){return new F(new Y(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Kn=-1;function dp(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=F.fromTimestamp(r===1e9?new Y(t+1,0):new Y(t,r));return new yt(s,M.empty(),e)}function fp(n){return new yt(n.readTime,n.key,Kn)}class yt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new yt(F.min(),M.empty(),Kn)}static max(){return new yt(F.max(),M.empty(),Kn)}}function pp(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=M.comparator(n.documentKey,e.documentKey),t!==0?t:$(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mp="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class gp{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mn(n){if(n.code!==S.FAILED_PRECONDITION||n.message!==mp)throw n;N("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&L(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new C((r,s)=>{this.nextCallback=o=>{this.wrapSuccess(e,o).next(r,s)},this.catchCallback=o=>{this.wrapFailure(t,o).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof C?t:C.resolve(t)}catch(t){return C.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):C.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):C.reject(t)}static resolve(e){return new C((t,r)=>{t(e)})}static reject(e){return new C((t,r)=>{r(e)})}static waitFor(e){return new C((t,r)=>{let s=0,o=0,a=!1;e.forEach(u=>{++s,u.next(()=>{++o,a&&o===s&&t()},h=>r(h))}),a=!0,o===s&&t()})}static or(e){let t=C.resolve(!1);for(const r of e)t=t.next(s=>s?C.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,o)=>{r.push(t.call(this,s,o))}),this.waitFor(r)}static mapArray(e,t){return new C((r,s)=>{const o=e.length,a=new Array(o);let u=0;for(let h=0;h<o;h++){const d=h;t(e[d]).next(p=>{a[d]=p,++u,u===o&&r(a)},p=>s(p))}})}static doWhile(e,t){return new C((r,s)=>{const o=()=>{e()===!0?t().next(()=>{o()},s):r()};o()})}}function _p(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function gn(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ds{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}ds.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hi=-1;function fs(n){return n==null}function Gr(n){return n===0&&1/n==-1/0}function yp(n){return typeof n=="number"&&Number.isInteger(n)&&!Gr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fu="";function Ep(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=ac(e)),e=Tp(n.get(t),e);return ac(e)}function Tp(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const o=n.charAt(s);switch(o){case"\0":t+="";break;case Fu:t+="";break;default:t+=o}}return t}function ac(n){return n+Fu+""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cc(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Rt(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Uu(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(e,t){this.comparator=e,this.root=t||de.EMPTY}insert(e,t){return new Z(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,de.BLACK,null,null))}remove(e){return new Z(this.comparator,this.root.remove(e,this.comparator).copy(null,null,de.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Vr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Vr(this.root,e,this.comparator,!1)}getReverseIterator(){return new Vr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Vr(this.root,e,this.comparator,!0)}}class Vr{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!e.isEmpty();)if(o=t?r(e.key,t):1,t&&s&&(o*=-1),o<0)e=this.isReverse?e.left:e.right;else{if(o===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class de{constructor(e,t,r,s,o){this.key=e,this.value=t,this.color=r??de.RED,this.left=s??de.EMPTY,this.right=o??de.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,o){return new de(e??this.key,t??this.value,r??this.color,s??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const o=r(e,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(e,t,r),null):o===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return de.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return de.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,de.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,de.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw L(43730,{key:this.key,value:this.value});if(this.right.isRed())throw L(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw L(27949);return e+(this.isRed()?0:1)}}de.EMPTY=null,de.RED=!0,de.BLACK=!1;de.EMPTY=new class{constructor(){this.size=0}get key(){throw L(57766)}get value(){throw L(16141)}get color(){throw L(16727)}get left(){throw L(29726)}get right(){throw L(36894)}copy(e,t,r,s,o){return this}insert(e,t,r){return new de(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce{constructor(e){this.comparator=e,this.data=new Z(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new uc(this.data.getIterator())}getIteratorFrom(e){return new uc(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof ce)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,o=r.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ce(this.comparator);return t.data=e,t}}class uc{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ce{constructor(e){this.fields=e,e.sort(fe.comparator)}static empty(){return new Ce([])}unionWith(e){let t=new ce(fe.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Ce(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return on(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bu extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pe{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new Bu("Invalid base64 string: "+o):o}}(e);return new pe(t)}static fromUint8Array(e){const t=function(s){let o="";for(let a=0;a<s.length;++a)o+=String.fromCharCode(s[a]);return o}(e);return new pe(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return $(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}pe.EMPTY_BYTE_STRING=new pe("");const Ip=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Et(n){if(W(!!n,39018),typeof n=="string"){let e=0;const t=Ip.exec(n);if(W(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:te(n.seconds),nanos:te(n.nanos)}}function te(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Tt(n){return typeof n=="string"?pe.fromBase64String(n):pe.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qu="server_timestamp",ju="__type__",$u="__previous_value__",zu="__local_write_time__";function Gi(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[ju])==null?void 0:r.stringValue)===qu}function ps(n){const e=n.mapValue.fields[$u];return Gi(e)?ps(e):e}function Qn(n){const e=Et(n.mapValue.fields[zu].timestampValue);return new Y(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wp{constructor(e,t,r,s,o,a,u,h,d,p){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=u,this.longPollingOptions=h,this.useFetchStreams=d,this.isUsingEmulator=p}}const Wr="(default)";class Xn{constructor(e,t){this.projectId=e,this.database=t||Wr}static empty(){return new Xn("","")}get isDefaultDatabase(){return this.database===Wr}isEqual(e){return e instanceof Xn&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hu="__type__",vp="__max__",kr={mapValue:{}},Gu="__vector__",Kr="value";function It(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Gi(n)?4:Rp(n)?9007199254740991:Ap(n)?10:11:L(28295,{value:n})}function ze(n,e){if(n===e)return!0;const t=It(n);if(t!==It(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Qn(n).isEqual(Qn(e));case 3:return function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;const a=Et(s.timestampValue),u=Et(o.timestampValue);return a.seconds===u.seconds&&a.nanos===u.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,o){return Tt(s.bytesValue).isEqual(Tt(o.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,o){return te(s.geoPointValue.latitude)===te(o.geoPointValue.latitude)&&te(s.geoPointValue.longitude)===te(o.geoPointValue.longitude)}(n,e);case 2:return function(s,o){if("integerValue"in s&&"integerValue"in o)return te(s.integerValue)===te(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){const a=te(s.doubleValue),u=te(o.doubleValue);return a===u?Gr(a)===Gr(u):isNaN(a)&&isNaN(u)}return!1}(n,e);case 9:return on(n.arrayValue.values||[],e.arrayValue.values||[],ze);case 10:case 11:return function(s,o){const a=s.mapValue.fields||{},u=o.mapValue.fields||{};if(cc(a)!==cc(u))return!1;for(const h in a)if(a.hasOwnProperty(h)&&(u[h]===void 0||!ze(a[h],u[h])))return!1;return!0}(n,e);default:return L(52216,{left:n})}}function Jn(n,e){return(n.values||[]).find(t=>ze(t,e))!==void 0}function an(n,e){if(n===e)return 0;const t=It(n),r=It(e);if(t!==r)return $(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return $(n.booleanValue,e.booleanValue);case 2:return function(o,a){const u=te(o.integerValue||o.doubleValue),h=te(a.integerValue||a.doubleValue);return u<h?-1:u>h?1:u===h?0:isNaN(u)?isNaN(h)?0:-1:1}(n,e);case 3:return lc(n.timestampValue,e.timestampValue);case 4:return lc(Qn(n),Qn(e));case 5:return Ii(n.stringValue,e.stringValue);case 6:return function(o,a){const u=Tt(o),h=Tt(a);return u.compareTo(h)}(n.bytesValue,e.bytesValue);case 7:return function(o,a){const u=o.split("/"),h=a.split("/");for(let d=0;d<u.length&&d<h.length;d++){const p=$(u[d],h[d]);if(p!==0)return p}return $(u.length,h.length)}(n.referenceValue,e.referenceValue);case 8:return function(o,a){const u=$(te(o.latitude),te(a.latitude));return u!==0?u:$(te(o.longitude),te(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return hc(n.arrayValue,e.arrayValue);case 10:return function(o,a){var T,P,D,O;const u=o.fields||{},h=a.fields||{},d=(T=u[Kr])==null?void 0:T.arrayValue,p=(P=h[Kr])==null?void 0:P.arrayValue,g=$(((D=d==null?void 0:d.values)==null?void 0:D.length)||0,((O=p==null?void 0:p.values)==null?void 0:O.length)||0);return g!==0?g:hc(d,p)}(n.mapValue,e.mapValue);case 11:return function(o,a){if(o===kr.mapValue&&a===kr.mapValue)return 0;if(o===kr.mapValue)return 1;if(a===kr.mapValue)return-1;const u=o.fields||{},h=Object.keys(u),d=a.fields||{},p=Object.keys(d);h.sort(),p.sort();for(let g=0;g<h.length&&g<p.length;++g){const T=Ii(h[g],p[g]);if(T!==0)return T;const P=an(u[h[g]],d[p[g]]);if(P!==0)return P}return $(h.length,p.length)}(n.mapValue,e.mapValue);default:throw L(23264,{he:t})}}function lc(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return $(n,e);const t=Et(n),r=Et(e),s=$(t.seconds,r.seconds);return s!==0?s:$(t.nanos,r.nanos)}function hc(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const o=an(t[s],r[s]);if(o)return o}return $(t.length,r.length)}function cn(n){return wi(n)}function wi(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=Et(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return Tt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return M.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const o of t.values||[])s?s=!1:r+=",",r+=wi(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",o=!0;for(const a of r)o?o=!1:s+=",",s+=`${a}:${wi(t.fields[a])}`;return s+"}"}(n.mapValue):L(61005,{value:n})}function Lr(n){switch(It(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=ps(n);return e?16+Lr(e):16;case 5:return 2*n.stringValue.length;case 6:return Tt(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return function(r){return(r.values||[]).reduce((s,o)=>s+Lr(o),0)}(n.arrayValue);case 10:case 11:return function(r){let s=0;return Rt(r.fields,(o,a)=>{s+=o.length+Lr(a)}),s}(n.mapValue);default:throw L(13486,{value:n})}}function dc(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function vi(n){return!!n&&"integerValue"in n}function Wi(n){return!!n&&"arrayValue"in n}function fc(n){return!!n&&"nullValue"in n}function pc(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function xr(n){return!!n&&"mapValue"in n}function Ap(n){var t,r;return((r=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Hu])==null?void 0:r.stringValue)===Gu}function qn(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return Rt(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=qn(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=qn(n.arrayValue.values[t]);return e}return{...n}}function Rp(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===vp}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(e){this.value=e}static empty(){return new Re({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!xr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=qn(t)}setAll(e){let t=fe.emptyPath(),r={},s=[];e.forEach((a,u)=>{if(!t.isImmediateParentOf(u)){const h=this.getFieldsMap(t);this.applyChanges(h,r,s),r={},s=[],t=u.popLast()}a?r[u.lastSegment()]=qn(a):s.push(u.lastSegment())});const o=this.getFieldsMap(t);this.applyChanges(o,r,s)}delete(e){const t=this.field(e.popLast());xr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return ze(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];xr(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){Rt(t,(s,o)=>e[s]=o);for(const s of r)delete e[s]}clone(){return new Re(qn(this.value))}}function Wu(n){const e=[];return Rt(n.fields,(t,r)=>{const s=new fe([t]);if(xr(r)){const o=Wu(r.mapValue).fields;if(o.length===0)e.push(s);else for(const a of o)e.push(s.child(a))}else e.push(s)}),new Ce(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ye{constructor(e,t,r,s,o,a,u){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=o,this.data=a,this.documentState=u}static newInvalidDocument(e){return new ye(e,0,F.min(),F.min(),F.min(),Re.empty(),0)}static newFoundDocument(e,t,r,s){return new ye(e,1,t,F.min(),r,s,0)}static newNoDocument(e,t){return new ye(e,2,t,F.min(),F.min(),Re.empty(),0)}static newUnknownDocument(e,t){return new ye(e,3,t,F.min(),F.min(),Re.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(F.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Re.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Re.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=F.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ye&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ye(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qr{constructor(e,t){this.position=e,this.inclusive=t}}function mc(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const o=e[s],a=n.position[s];if(o.field.isKeyField()?r=M.comparator(M.fromName(a.referenceValue),t.key):r=an(a,t.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function gc(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!ze(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yn{constructor(e,t="asc"){this.field=e,this.dir=t}}function Sp(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ku{}class se extends Ku{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new Cp(e,t,r):t==="array-contains"?new kp(e,r):t==="in"?new Dp(e,r):t==="not-in"?new Np(e,r):t==="array-contains-any"?new Op(e,r):new se(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new bp(e,r):new Vp(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(an(t,this.value)):t!==null&&It(this.value)===It(t)&&this.matchesComparison(an(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return L(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ne extends Ku{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new Ne(e,t)}matches(e){return Qu(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Qu(n){return n.op==="and"}function Xu(n){return Pp(n)&&Qu(n)}function Pp(n){for(const e of n.filters)if(e instanceof Ne)return!1;return!0}function Ai(n){if(n instanceof se)return n.field.canonicalString()+n.op.toString()+cn(n.value);if(Xu(n))return n.filters.map(e=>Ai(e)).join(",");{const e=n.filters.map(t=>Ai(t)).join(",");return`${n.op}(${e})`}}function Ju(n,e){return n instanceof se?function(r,s){return s instanceof se&&r.op===s.op&&r.field.isEqual(s.field)&&ze(r.value,s.value)}(n,e):n instanceof Ne?function(r,s){return s instanceof Ne&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((o,a,u)=>o&&Ju(a,s.filters[u]),!0):!1}(n,e):void L(19439)}function Yu(n){return n instanceof se?function(t){return`${t.field.canonicalString()} ${t.op} ${cn(t.value)}`}(n):n instanceof Ne?function(t){return t.op.toString()+" {"+t.getFilters().map(Yu).join(" ,")+"}"}(n):"Filter"}class Cp extends se{constructor(e,t,r){super(e,t,r),this.key=M.fromName(r.referenceValue)}matches(e){const t=M.comparator(e.key,this.key);return this.matchesComparison(t)}}class bp extends se{constructor(e,t){super(e,"in",t),this.keys=Zu("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Vp extends se{constructor(e,t){super(e,"not-in",t),this.keys=Zu("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Zu(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map(r=>M.fromName(r.referenceValue))}class kp extends se{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Wi(t)&&Jn(t.arrayValue,this.value)}}class Dp extends se{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Jn(this.value.arrayValue,t)}}class Np extends se{constructor(e,t){super(e,"not-in",t)}matches(e){if(Jn(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Jn(this.value.arrayValue,t)}}class Op extends se{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Wi(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>Jn(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mp{constructor(e,t=null,r=[],s=[],o=null,a=null,u=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=o,this.startAt=a,this.endAt=u,this.Te=null}}function _c(n,e=null,t=[],r=[],s=null,o=null,a=null){return new Mp(n,e,t,r,s,o,a)}function Ki(n){const e=U(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Ai(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),fs(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>cn(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>cn(r)).join(",")),e.Te=t}return e.Te}function Qi(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Sp(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Ju(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!gc(n.startAt,e.startAt)&&gc(n.endAt,e.endAt)}function Ri(n){return M.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _n{constructor(e,t=null,r=[],s=[],o=null,a="F",u=null,h=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=o,this.limitType=a,this.startAt=u,this.endAt=h,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function Lp(n,e,t,r,s,o,a,u){return new _n(n,e,t,r,s,o,a,u)}function ms(n){return new _n(n)}function yc(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function el(n){return n.collectionGroup!==null}function jn(n){const e=U(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const o of e.explicitOrderBy)e.Ie.push(o),t.add(o.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let u=new ce(fe.comparator);return a.filters.forEach(h=>{h.getFlattenedFilters().forEach(d=>{d.isInequality()&&(u=u.add(d.field))})}),u})(e).forEach(o=>{t.has(o.canonicalString())||o.isKeyField()||e.Ie.push(new Yn(o,r))}),t.has(fe.keyField().canonicalString())||e.Ie.push(new Yn(fe.keyField(),r))}return e.Ie}function Fe(n){const e=U(n);return e.Ee||(e.Ee=xp(e,jn(n))),e.Ee}function xp(n,e){if(n.limitType==="F")return _c(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const o=s.dir==="desc"?"asc":"desc";return new Yn(s.field,o)});const t=n.endAt?new Qr(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Qr(n.startAt.position,n.startAt.inclusive):null;return _c(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Si(n,e){const t=n.filters.concat([e]);return new _n(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Xr(n,e,t){return new _n(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function gs(n,e){return Qi(Fe(n),Fe(e))&&n.limitType===e.limitType}function tl(n){return`${Ki(Fe(n))}|lt:${n.limitType}`}function Qt(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>Yu(s)).join(", ")}]`),fs(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>cn(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>cn(s)).join(",")),`Target(${r})`}(Fe(n))}; limitType=${n.limitType})`}function _s(n,e){return e.isFoundDocument()&&function(r,s){const o=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):M.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,e)&&function(r,s){for(const o of jn(r))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const o of r.filters)if(!o.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,u,h){const d=mc(a,u,h);return a.inclusive?d<=0:d<0}(r.startAt,jn(r),s)||r.endAt&&!function(a,u,h){const d=mc(a,u,h);return a.inclusive?d>=0:d>0}(r.endAt,jn(r),s))}(n,e)}function Fp(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function nl(n){return(e,t)=>{let r=!1;for(const s of jn(n)){const o=Up(s,e,t);if(o!==0)return o;r=r||s.field.isKeyField()}return 0}}function Up(n,e,t){const r=n.field.isKeyField()?M.comparator(e.key,t.key):function(o,a,u){const h=a.data.field(o),d=u.data.field(o);return h!==null&&d!==null?an(h,d):L(42886)}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return L(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $t{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,o]of r)if(this.equalsFn(s,e))return o}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],e))return void(s[o]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){Rt(this.inner,(t,r)=>{for(const[s,o]of r)e(s,o)})}isEmpty(){return Uu(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bp=new Z(M.comparator);function Xe(){return Bp}const rl=new Z(M.comparator);function xn(...n){let e=rl;for(const t of n)e=e.insert(t.key,t);return e}function sl(n){let e=rl;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Ot(){return $n()}function il(){return $n()}function $n(){return new $t(n=>n.toString(),(n,e)=>n.isEqual(e))}const qp=new Z(M.comparator),jp=new ce(M.comparator);function z(...n){let e=jp;for(const t of n)e=e.add(t);return e}const $p=new ce($);function zp(){return $p}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xi(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Gr(e)?"-0":e}}function ol(n){return{integerValue:""+n}}function al(n,e){return yp(e)?ol(e):Xi(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ys{constructor(){this._=void 0}}function Hp(n,e,t){return n instanceof Jr?function(s,o){const a={fields:{[ju]:{stringValue:qu},[zu]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&Gi(o)&&(o=ps(o)),o&&(a.fields[$u]=o),{mapValue:a}}(t,e):n instanceof Zn?ul(n,e):n instanceof er?ll(n,e):function(s,o){const a=cl(s,o),u=Ec(a)+Ec(s.Ae);return vi(a)&&vi(s.Ae)?ol(u):Xi(s.serializer,u)}(n,e)}function Gp(n,e,t){return n instanceof Zn?ul(n,e):n instanceof er?ll(n,e):t}function cl(n,e){return n instanceof tr?function(r){return vi(r)||function(o){return!!o&&"doubleValue"in o}(r)}(e)?e:{integerValue:0}:null}class Jr extends ys{}class Zn extends ys{constructor(e){super(),this.elements=e}}function ul(n,e){const t=hl(e);for(const r of n.elements)t.some(s=>ze(s,r))||t.push(r);return{arrayValue:{values:t}}}class er extends ys{constructor(e){super(),this.elements=e}}function ll(n,e){let t=hl(e);for(const r of n.elements)t=t.filter(s=>!ze(s,r));return{arrayValue:{values:t}}}class tr extends ys{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Ec(n){return te(n.integerValue||n.doubleValue)}function hl(n){return Wi(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wp{constructor(e,t){this.field=e,this.transform=t}}function Kp(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof Zn&&s instanceof Zn||r instanceof er&&s instanceof er?on(r.elements,s.elements,ze):r instanceof tr&&s instanceof tr?ze(r.Ae,s.Ae):r instanceof Jr&&s instanceof Jr}(n.transform,e.transform)}class Qp{constructor(e,t){this.version=e,this.transformResults=t}}class De{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new De}static exists(e){return new De(void 0,e)}static updateTime(e){return new De(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Fr(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Es{}function dl(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Ji(n.key,De.none()):new or(n.key,n.data,De.none());{const t=n.data,r=Re.empty();let s=new ce(fe.comparator);for(let o of e.fields)if(!s.has(o)){let a=t.field(o);a===null&&o.length>1&&(o=o.popLast(),a=t.field(o)),a===null?r.delete(o):r.set(o,a),s=s.add(o)}return new St(n.key,r,new Ce(s.toArray()),De.none())}}function Xp(n,e,t){n instanceof or?function(s,o,a){const u=s.value.clone(),h=Ic(s.fieldTransforms,o,a.transformResults);u.setAll(h),o.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):n instanceof St?function(s,o,a){if(!Fr(s.precondition,o))return void o.convertToUnknownDocument(a.version);const u=Ic(s.fieldTransforms,o,a.transformResults),h=o.data;h.setAll(fl(s)),h.setAll(u),o.convertToFoundDocument(a.version,h).setHasCommittedMutations()}(n,e,t):function(s,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function zn(n,e,t,r){return n instanceof or?function(o,a,u,h){if(!Fr(o.precondition,a))return u;const d=o.value.clone(),p=wc(o.fieldTransforms,h,a);return d.setAll(p),a.convertToFoundDocument(a.version,d).setHasLocalMutations(),null}(n,e,t,r):n instanceof St?function(o,a,u,h){if(!Fr(o.precondition,a))return u;const d=wc(o.fieldTransforms,h,a),p=a.data;return p.setAll(fl(o)),p.setAll(d),a.convertToFoundDocument(a.version,p).setHasLocalMutations(),u===null?null:u.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(g=>g.field))}(n,e,t,r):function(o,a,u){return Fr(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):u}(n,e,t)}function Jp(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),o=cl(r.transform,s||null);o!=null&&(t===null&&(t=Re.empty()),t.set(r.field,o))}return t||null}function Tc(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&on(r,s,(o,a)=>Kp(o,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class or extends Es{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class St extends Es{constructor(e,t,r,s,o=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function fl(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function Ic(n,e,t){const r=new Map;W(n.length===t.length,32656,{Re:t.length,Ve:n.length});for(let s=0;s<t.length;s++){const o=n[s],a=o.transform,u=e.data.field(o.field);r.set(o.field,Gp(a,u,t[s]))}return r}function wc(n,e,t){const r=new Map;for(const s of n){const o=s.transform,a=t.data.field(s.field);r.set(s.field,Hp(o,a,e))}return r}class Ji extends Es{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Yp extends Es{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zp{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const o=this.mutations[s];o.key.isEqual(e.key)&&Xp(o,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=zn(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=zn(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=il();return this.mutations.forEach(s=>{const o=e.get(s.key),a=o.overlayedDocument;let u=this.applyToLocalView(a,o.mutatedFields);u=t.has(s.key)?null:u;const h=dl(a,u);h!==null&&r.set(s.key,h),a.isValidDocument()||a.convertToNoDocument(F.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),z())}isEqual(e){return this.batchId===e.batchId&&on(this.mutations,e.mutations,(t,r)=>Tc(t,r))&&on(this.baseMutations,e.baseMutations,(t,r)=>Tc(t,r))}}class Yi{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){W(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=function(){return qp}();const o=e.mutations;for(let a=0;a<o.length;a++)s=s.insert(o[a].key,r[a].version);return new Yi(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class em{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tm{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var re,G;function nm(n){switch(n){case S.OK:return L(64938);case S.CANCELLED:case S.UNKNOWN:case S.DEADLINE_EXCEEDED:case S.RESOURCE_EXHAUSTED:case S.INTERNAL:case S.UNAVAILABLE:case S.UNAUTHENTICATED:return!1;case S.INVALID_ARGUMENT:case S.NOT_FOUND:case S.ALREADY_EXISTS:case S.PERMISSION_DENIED:case S.FAILED_PRECONDITION:case S.ABORTED:case S.OUT_OF_RANGE:case S.UNIMPLEMENTED:case S.DATA_LOSS:return!0;default:return L(15467,{code:n})}}function pl(n){if(n===void 0)return Qe("GRPC error has no .code"),S.UNKNOWN;switch(n){case re.OK:return S.OK;case re.CANCELLED:return S.CANCELLED;case re.UNKNOWN:return S.UNKNOWN;case re.DEADLINE_EXCEEDED:return S.DEADLINE_EXCEEDED;case re.RESOURCE_EXHAUSTED:return S.RESOURCE_EXHAUSTED;case re.INTERNAL:return S.INTERNAL;case re.UNAVAILABLE:return S.UNAVAILABLE;case re.UNAUTHENTICATED:return S.UNAUTHENTICATED;case re.INVALID_ARGUMENT:return S.INVALID_ARGUMENT;case re.NOT_FOUND:return S.NOT_FOUND;case re.ALREADY_EXISTS:return S.ALREADY_EXISTS;case re.PERMISSION_DENIED:return S.PERMISSION_DENIED;case re.FAILED_PRECONDITION:return S.FAILED_PRECONDITION;case re.ABORTED:return S.ABORTED;case re.OUT_OF_RANGE:return S.OUT_OF_RANGE;case re.UNIMPLEMENTED:return S.UNIMPLEMENTED;case re.DATA_LOSS:return S.DATA_LOSS;default:return L(39323,{code:n})}}(G=re||(re={}))[G.OK=0]="OK",G[G.CANCELLED=1]="CANCELLED",G[G.UNKNOWN=2]="UNKNOWN",G[G.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",G[G.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",G[G.NOT_FOUND=5]="NOT_FOUND",G[G.ALREADY_EXISTS=6]="ALREADY_EXISTS",G[G.PERMISSION_DENIED=7]="PERMISSION_DENIED",G[G.UNAUTHENTICATED=16]="UNAUTHENTICATED",G[G.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",G[G.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",G[G.ABORTED=10]="ABORTED",G[G.OUT_OF_RANGE=11]="OUT_OF_RANGE",G[G.UNIMPLEMENTED=12]="UNIMPLEMENTED",G[G.INTERNAL=13]="INTERNAL",G[G.UNAVAILABLE=14]="UNAVAILABLE",G[G.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rm(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sm=new gt([4294967295,4294967295],0);function vc(n){const e=rm().encode(n),t=new Cu;return t.update(e),new Uint8Array(t.digest())}function Ac(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),o=e.getUint32(12,!0);return[new gt([t,r],0),new gt([s,o],0)]}class Zi{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Fn(`Invalid padding: ${t}`);if(r<0)throw new Fn(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Fn(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Fn(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=gt.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply(gt.fromNumber(r)));return s.compare(sm)===1&&(s=new gt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=vc(e),[r,s]=Ac(t);for(let o=0;o<this.hashCount;o++){const a=this.ye(r,s,o);if(!this.we(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,o=new Uint8Array(Math.ceil(e/8)),a=new Zi(o,s,t);return r.forEach(u=>a.insert(u)),a}insert(e){if(this.ge===0)return;const t=vc(e),[r,s]=Ac(t);for(let o=0;o<this.hashCount;o++){const a=this.ye(r,s,o);this.Se(a)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Fn extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ts{constructor(e,t,r,s,o){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,ar.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Ts(F.min(),s,new Z($),Xe(),z())}}class ar{constructor(e,t,r,s,o){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new ar(r,t,z(),z(),z())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur{constructor(e,t,r,s){this.be=e,this.removedTargetIds=t,this.key=r,this.De=s}}class ml{constructor(e,t){this.targetId=e,this.Ce=t}}class gl{constructor(e,t,r=pe.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Rc{constructor(){this.ve=0,this.Fe=Sc(),this.Me=pe.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=z(),t=z(),r=z();return this.Fe.forEach((s,o)=>{switch(o){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:L(38017,{changeType:o})}}),new ar(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=Sc()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,W(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class im{constructor(e){this.Ge=e,this.ze=new Map,this.je=Xe(),this.Je=Dr(),this.He=Dr(),this.Ye=new Z($)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.We(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:L(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach((r,s)=>{this.rt(s)&&t(s)})}st(e){const t=e.targetId,r=e.Ce.count,s=this.ot(t);if(s){const o=s.target;if(Ri(o))if(r===0){const a=new M(o.path);this.et(t,a,ye.newNoDocument(a,F.min()))}else W(r===1,20013,{expectedCount:r});else{const a=this._t(t);if(a!==r){const u=this.ut(e),h=u?this.ct(u,e,a):1;if(h!==0){this.it(t);const d=h===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,d)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:o=0}=t;let a,u;try{a=Tt(r).toUint8Array()}catch(h){if(h instanceof Bu)return sn("Decoding the base64 bloom filter in existence filter failed ("+h.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw h}try{u=new Zi(a,s,o)}catch(h){return sn(h instanceof Fn?"BloomFilter error: ":"Applying bloom filter failed: ",h),null}return u.ge===0?null:u}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach(o=>{const a=this.Ge.ht(),u=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;e.mightContain(u)||(this.et(t,o,null),s++)}),s}Tt(e){const t=new Map;this.ze.forEach((o,a)=>{const u=this.ot(a);if(u){if(o.current&&Ri(u.target)){const h=new M(u.target.path);this.It(h).has(a)||this.Et(a,h)||this.et(a,h,ye.newNoDocument(h,e))}o.Be&&(t.set(a,o.ke()),o.qe())}});let r=z();this.He.forEach((o,a)=>{let u=!0;a.forEachWhile(h=>{const d=this.ot(h);return!d||d.purpose==="TargetPurposeLimboResolution"||(u=!1,!1)}),u&&(r=r.add(o))}),this.je.forEach((o,a)=>a.setReadTime(e));const s=new Ts(e,t,this.Ye,this.je,r);return this.je=Xe(),this.Je=Dr(),this.He=Dr(),this.Ye=new Z($),s}Xe(e,t){if(!this.rt(e))return;const r=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,t)?s.Qe(t,1):s.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new Rc,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new ce($),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new ce($),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||N("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Rc),this.Ge.getRemoteKeysForTarget(e).forEach(t=>{this.et(e,t,null)})}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Dr(){return new Z(M.comparator)}function Sc(){return new Z(M.comparator)}const om={asc:"ASCENDING",desc:"DESCENDING"},am={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},cm={and:"AND",or:"OR"};class um{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Pi(n,e){return n.useProto3Json||fs(e)?e:{value:e}}function Yr(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function _l(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function lm(n,e){return Yr(n,e.toTimestamp())}function Ue(n){return W(!!n,49232),F.fromTimestamp(function(t){const r=Et(t);return new Y(r.seconds,r.nanos)}(n))}function eo(n,e){return Ci(n,e).canonicalString()}function Ci(n,e){const t=function(s){return new X(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function yl(n){const e=X.fromString(n);return W(vl(e),10190,{key:e.toString()}),e}function bi(n,e){return eo(n.databaseId,e.path)}function ui(n,e){const t=yl(e);if(t.get(1)!==n.databaseId.projectId)throw new k(S.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new k(S.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new M(Tl(t))}function El(n,e){return eo(n.databaseId,e)}function hm(n){const e=yl(n);return e.length===4?X.emptyPath():Tl(e)}function Vi(n){return new X(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Tl(n){return W(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Pc(n,e,t){return{name:bi(n,e),fields:t.value.mapValue.fields}}function dm(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(d){return d==="NO_CHANGE"?0:d==="ADD"?1:d==="REMOVE"?2:d==="CURRENT"?3:d==="RESET"?4:L(39313,{state:d})}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],o=function(d,p){return d.useProto3Json?(W(p===void 0||typeof p=="string",58123),pe.fromBase64String(p||"")):(W(p===void 0||p instanceof Buffer||p instanceof Uint8Array,16193),pe.fromUint8Array(p||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,u=a&&function(d){const p=d.code===void 0?S.UNKNOWN:pl(d.code);return new k(p,d.message||"")}(a);t=new gl(r,s,o,u||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=ui(n,r.document.name),o=Ue(r.document.updateTime),a=r.document.createTime?Ue(r.document.createTime):F.min(),u=new Re({mapValue:{fields:r.document.fields}}),h=ye.newFoundDocument(s,o,a,u),d=r.targetIds||[],p=r.removedTargetIds||[];t=new Ur(d,p,h.key,h)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=ui(n,r.document),o=r.readTime?Ue(r.readTime):F.min(),a=ye.newNoDocument(s,o),u=r.removedTargetIds||[];t=new Ur([],u,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=ui(n,r.document),o=r.removedTargetIds||[];t=new Ur([],o,s,null)}else{if(!("filter"in e))return L(11601,{Rt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:o}=r,a=new tm(s,o),u=r.targetId;t=new ml(u,a)}}return t}function fm(n,e){let t;if(e instanceof or)t={update:Pc(n,e.key,e.value)};else if(e instanceof Ji)t={delete:bi(n,e.key)};else if(e instanceof St)t={update:Pc(n,e.key,e.data),updateMask:wm(e.fieldMask)};else{if(!(e instanceof Yp))return L(16599,{Vt:e.type});t={verify:bi(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(o,a){const u=a.transform;if(u instanceof Jr)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(u instanceof Zn)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:u.elements}};if(u instanceof er)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:u.elements}};if(u instanceof tr)return{fieldPath:a.field.canonicalString(),increment:u.Ae};throw L(20930,{transform:a.transform})}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,o){return o.updateTime!==void 0?{updateTime:lm(s,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:L(27497)}(n,e.precondition)),t}function pm(n,e){return n&&n.length>0?(W(e!==void 0,14353),n.map(t=>function(s,o){let a=s.updateTime?Ue(s.updateTime):Ue(o);return a.isEqual(F.min())&&(a=Ue(o)),new Qp(a,s.transformResults||[])}(t,e))):[]}function mm(n,e){return{documents:[El(n,e.path)]}}function gm(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=El(n,s);const o=function(d){if(d.length!==0)return wl(Ne.create(d,"and"))}(e.filters);o&&(t.structuredQuery.where=o);const a=function(d){if(d.length!==0)return d.map(p=>function(T){return{field:Xt(T.field),direction:Em(T.dir)}}(p))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const u=Pi(n,e.limit);return u!==null&&(t.structuredQuery.limit=u),e.startAt&&(t.structuredQuery.startAt=function(d){return{before:d.inclusive,values:d.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(d){return{before:!d.inclusive,values:d.position}}(e.endAt)),{ft:t,parent:s}}function _m(n){let e=hm(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){W(r===1,65062);const p=t.from[0];p.allDescendants?s=p.collectionId:e=e.child(p.collectionId)}let o=[];t.where&&(o=function(g){const T=Il(g);return T instanceof Ne&&Xu(T)?T.getFilters():[T]}(t.where));let a=[];t.orderBy&&(a=function(g){return g.map(T=>function(D){return new Yn(Jt(D.field),function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(D.direction))}(T))}(t.orderBy));let u=null;t.limit&&(u=function(g){let T;return T=typeof g=="object"?g.value:g,fs(T)?null:T}(t.limit));let h=null;t.startAt&&(h=function(g){const T=!!g.before,P=g.values||[];return new Qr(P,T)}(t.startAt));let d=null;return t.endAt&&(d=function(g){const T=!g.before,P=g.values||[];return new Qr(P,T)}(t.endAt)),Lp(e,s,a,o,u,"F",h,d)}function ym(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return L(28987,{purpose:s})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Il(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Jt(t.unaryFilter.field);return se.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Jt(t.unaryFilter.field);return se.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Jt(t.unaryFilter.field);return se.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Jt(t.unaryFilter.field);return se.create(a,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return L(61313);default:return L(60726)}}(n):n.fieldFilter!==void 0?function(t){return se.create(Jt(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return L(58110);default:return L(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Ne.create(t.compositeFilter.filters.map(r=>Il(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return L(1026)}}(t.compositeFilter.op))}(n):L(30097,{filter:n})}function Em(n){return om[n]}function Tm(n){return am[n]}function Im(n){return cm[n]}function Xt(n){return{fieldPath:n.canonicalString()}}function Jt(n){return fe.fromServerFormat(n.fieldPath)}function wl(n){return n instanceof se?function(t){if(t.op==="=="){if(pc(t.value))return{unaryFilter:{field:Xt(t.field),op:"IS_NAN"}};if(fc(t.value))return{unaryFilter:{field:Xt(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(pc(t.value))return{unaryFilter:{field:Xt(t.field),op:"IS_NOT_NAN"}};if(fc(t.value))return{unaryFilter:{field:Xt(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Xt(t.field),op:Tm(t.op),value:t.value}}}(n):n instanceof Ne?function(t){const r=t.getFilters().map(s=>wl(s));return r.length===1?r[0]:{compositeFilter:{op:Im(t.op),filters:r}}}(n):L(54877,{filter:n})}function wm(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function vl(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dt{constructor(e,t,r,s,o=F.min(),a=F.min(),u=pe.EMPTY_BYTE_STRING,h=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=u,this.expectedCount=h}withSequenceNumber(e){return new dt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new dt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new dt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new dt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vm{constructor(e){this.yt=e}}function Am(n){const e=_m({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Xr(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rm{constructor(){this.Cn=new Sm}addToCollectionParentIndex(e,t){return this.Cn.add(t),C.resolve()}getCollectionParents(e,t){return C.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return C.resolve()}deleteFieldIndex(e,t){return C.resolve()}deleteAllFieldIndexes(e){return C.resolve()}createTargetIndexes(e,t){return C.resolve()}getDocumentsMatchingTarget(e,t){return C.resolve(null)}getIndexType(e,t){return C.resolve(0)}getFieldIndexes(e,t){return C.resolve([])}getNextCollectionGroupToUpdate(e){return C.resolve(null)}getMinOffset(e,t){return C.resolve(yt.min())}getMinOffsetFromCollectionGroup(e,t){return C.resolve(yt.min())}updateCollectionGroup(e,t,r){return C.resolve()}updateIndexEntries(e,t){return C.resolve()}}class Sm{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new ce(X.comparator),o=!s.has(r);return this.index[t]=s.add(r),o}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new ce(X.comparator)).toArray()}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cc={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Al=41943040;class Ae{static withCacheSize(e){return new Ae(e,Ae.DEFAULT_COLLECTION_PERCENTILE,Ae.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ae.DEFAULT_COLLECTION_PERCENTILE=10,Ae.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ae.DEFAULT=new Ae(Al,Ae.DEFAULT_COLLECTION_PERCENTILE,Ae.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ae.DISABLED=new Ae(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class un{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new un(0)}static cr(){return new un(-1)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bc="LruGarbageCollector",Pm=1048576;function Vc([n,e],[t,r]){const s=$(n,t);return s===0?$(e,r):s}class Cm{constructor(e){this.Ir=e,this.buffer=new ce(Vc),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();Vc(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class bm{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){N(bc,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){gn(t)?N(bc,"Ignoring IndexedDB error during garbage collection: ",t):await mn(t)}await this.Vr(3e5)})}}class Vm{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next(r=>Math.floor(t/100*r))}nthSequenceNumber(e,t){if(t===0)return C.resolve(ds.ce);const r=new Cm(t);return this.mr.forEachTarget(e,s=>r.Ar(s.sequenceNumber)).next(()=>this.mr.pr(e,s=>r.Ar(s))).next(()=>r.maxValue)}removeTargets(e,t,r){return this.mr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(N("LruGarbageCollector","Garbage collection skipped; disabled"),C.resolve(Cc)):this.getCacheSize(e).next(r=>r<this.params.cacheSizeCollectionThreshold?(N("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),Cc):this.yr(e,t))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let r,s,o,a,u,h,d;const p=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(g=>(g>this.params.maximumSequenceNumbersToCollect?(N("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${g}`),s=this.params.maximumSequenceNumbersToCollect):s=g,a=Date.now(),this.nthSequenceNumber(e,s))).next(g=>(r=g,u=Date.now(),this.removeTargets(e,r,t))).next(g=>(o=g,h=Date.now(),this.removeOrphanedDocuments(e,r))).next(g=>(d=Date.now(),Kt()<=j.DEBUG&&N("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${a-p}ms
	Determined least recently used ${s} in `+(u-a)+`ms
	Removed ${o} targets in `+(h-u)+`ms
	Removed ${g} documents in `+(d-h)+`ms
Total Duration: ${d-p}ms`),C.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:o,documentsRemoved:g})))}}function km(n,e){return new Vm(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dm{constructor(){this.changes=new $t(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ye.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?C.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nm{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Om{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&zn(r.mutation,s,Ce.empty(),Y.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,z()).next(()=>r))}getLocalViewOfDocuments(e,t,r=z()){const s=Ot();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(o=>{let a=xn();return o.forEach((u,h)=>{a=a.insert(u,h.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=Ot();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,z()))}populateOverlays(e,t,r){const s=[];return r.forEach(o=>{t.has(o)||s.push(o)}),this.documentOverlayCache.getOverlays(e,s).next(o=>{o.forEach((a,u)=>{t.set(a,u)})})}computeViews(e,t,r,s){let o=Xe();const a=$n(),u=function(){return $n()}();return t.forEach((h,d)=>{const p=r.get(d.key);s.has(d.key)&&(p===void 0||p.mutation instanceof St)?o=o.insert(d.key,d):p!==void 0?(a.set(d.key,p.mutation.getFieldMask()),zn(p.mutation,d,p.mutation.getFieldMask(),Y.now())):a.set(d.key,Ce.empty())}),this.recalculateAndSaveOverlays(e,o).next(h=>(h.forEach((d,p)=>a.set(d,p)),t.forEach((d,p)=>u.set(d,new Nm(p,a.get(d)??null))),u))}recalculateAndSaveOverlays(e,t){const r=$n();let s=new Z((a,u)=>a-u),o=z();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const u of a)u.keys().forEach(h=>{const d=t.get(h);if(d===null)return;let p=r.get(h)||Ce.empty();p=u.applyToLocalView(d,p),r.set(h,p);const g=(s.get(u.batchId)||z()).add(h);s=s.insert(u.batchId,g)})}).next(()=>{const a=[],u=s.getReverseIterator();for(;u.hasNext();){const h=u.getNext(),d=h.key,p=h.value,g=il();p.forEach(T=>{if(!o.has(T)){const P=dl(t.get(T),r.get(T));P!==null&&g.set(T,P),o=o.add(T)}}),a.push(this.documentOverlayCache.saveOverlays(e,d,g))}return C.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(a){return M.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):el(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(o=>{const a=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-o.size):C.resolve(Ot());let u=Kn,h=o;return a.next(d=>C.forEach(d,(p,g)=>(u<g.largestBatchId&&(u=g.largestBatchId),o.get(p)?C.resolve():this.remoteDocumentCache.getEntry(e,p).next(T=>{h=h.insert(p,T)}))).next(()=>this.populateOverlays(e,d,o)).next(()=>this.computeViews(e,h,d,z())).next(p=>({batchId:u,changes:sl(p)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new M(t)).next(r=>{let s=xn();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const o=t.collectionGroup;let a=xn();return this.indexManager.getCollectionParents(e,o).next(u=>C.forEach(u,h=>{const d=function(g,T){return new _n(T,null,g.explicitOrderBy.slice(),g.filters.slice(),g.limit,g.limitType,g.startAt,g.endAt)}(t,h.child(o));return this.getDocumentsMatchingCollectionQuery(e,d,r,s).next(p=>{p.forEach((g,T)=>{a=a.insert(g,T)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let o;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,o,s))).next(a=>{o.forEach((h,d)=>{const p=d.getKey();a.get(p)===null&&(a=a.insert(p,ye.newInvalidDocument(p)))});let u=xn();return a.forEach((h,d)=>{const p=o.get(h);p!==void 0&&zn(p.mutation,d,Ce.empty(),Y.now()),_s(t,d)&&(u=u.insert(h,d))}),u})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mm{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return C.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:Ue(s.createTime)}}(t)),C.resolve()}getNamedQuery(e,t){return C.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,function(s){return{name:s.name,query:Am(s.bundledQuery),readTime:Ue(s.readTime)}}(t)),C.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lm{constructor(){this.overlays=new Z(M.comparator),this.qr=new Map}getOverlay(e,t){return C.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Ot();return C.forEach(t,s=>this.getOverlay(e,s).next(o=>{o!==null&&r.set(s,o)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,o)=>{this.St(e,t,o)}),C.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.qr.get(r);return s!==void 0&&(s.forEach(o=>this.overlays=this.overlays.remove(o)),this.qr.delete(r)),C.resolve()}getOverlaysForCollection(e,t,r){const s=Ot(),o=t.length+1,a=new M(t.child("")),u=this.overlays.getIteratorFrom(a);for(;u.hasNext();){const h=u.getNext().value,d=h.getKey();if(!t.isPrefixOf(d.path))break;d.path.length===o&&h.largestBatchId>r&&s.set(h.getKey(),h)}return C.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let o=new Z((d,p)=>d-p);const a=this.overlays.getIterator();for(;a.hasNext();){const d=a.getNext().value;if(d.getKey().getCollectionGroup()===t&&d.largestBatchId>r){let p=o.get(d.largestBatchId);p===null&&(p=Ot(),o=o.insert(d.largestBatchId,p)),p.set(d.getKey(),d)}}const u=Ot(),h=o.getIterator();for(;h.hasNext()&&(h.getNext().value.forEach((d,p)=>u.set(d,p)),!(u.size()>=s)););return C.resolve(u)}St(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.qr.get(s.largestBatchId).delete(r.key);this.qr.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new em(t,r));let o=this.qr.get(t);o===void 0&&(o=z(),this.qr.set(t,o)),this.qr.set(t,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xm{constructor(){this.sessionToken=pe.EMPTY_BYTE_STRING}getSessionToken(e){return C.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,C.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class to{constructor(){this.Qr=new ce(he.$r),this.Ur=new ce(he.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const r=new he(e,t);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Gr(new he(e,t))}zr(e,t){e.forEach(r=>this.removeReference(r,t))}jr(e){const t=new M(new X([])),r=new he(t,e),s=new he(t,e+1),o=[];return this.Ur.forEachInRange([r,s],a=>{this.Gr(a),o.push(a.key)}),o}Jr(){this.Qr.forEach(e=>this.Gr(e))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new M(new X([])),r=new he(t,e),s=new he(t,e+1);let o=z();return this.Ur.forEachInRange([r,s],a=>{o=o.add(a.key)}),o}containsKey(e){const t=new he(e,0),r=this.Qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class he{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return M.comparator(e.key,t.key)||$(e.Yr,t.Yr)}static Kr(e,t){return $(e.Yr,t.Yr)||M.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fm{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new ce(he.$r)}checkEmpty(e){return C.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const o=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new Zp(o,t,r,s);this.mutationQueue.push(a);for(const u of s)this.Zr=this.Zr.add(new he(u.key,o)),this.indexManager.addToCollectionParentIndex(e,u.key.path.popLast());return C.resolve(a)}lookupMutationBatch(e,t){return C.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.ei(r),o=s<0?0:s;return C.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return C.resolve(this.mutationQueue.length===0?Hi:this.tr-1)}getAllMutationBatches(e){return C.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new he(t,0),s=new he(t,Number.POSITIVE_INFINITY),o=[];return this.Zr.forEachInRange([r,s],a=>{const u=this.Xr(a.Yr);o.push(u)}),C.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ce($);return t.forEach(s=>{const o=new he(s,0),a=new he(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([o,a],u=>{r=r.add(u.Yr)})}),C.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let o=r;M.isDocumentKey(o)||(o=o.child(""));const a=new he(new M(o),0);let u=new ce($);return this.Zr.forEachWhile(h=>{const d=h.key.path;return!!r.isPrefixOf(d)&&(d.length===s&&(u=u.add(h.Yr)),!0)},a),C.resolve(this.ti(u))}ti(e){const t=[];return e.forEach(r=>{const s=this.Xr(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){W(this.ni(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return C.forEach(t.mutations,s=>{const o=new he(s.key,t.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.Zr=r})}ir(e){}containsKey(e,t){const r=new he(t,0),s=this.Zr.firstAfterOrEqual(r);return C.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,C.resolve()}ni(e,t){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Um{constructor(e){this.ri=e,this.docs=function(){return new Z(M.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),o=s?s.size:0,a=this.ri(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return C.resolve(r?r.document.mutableCopy():ye.newInvalidDocument(t))}getEntries(e,t){let r=Xe();return t.forEach(s=>{const o=this.docs.get(s);r=r.insert(s,o?o.document.mutableCopy():ye.newInvalidDocument(s))}),C.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let o=Xe();const a=t.path,u=new M(a.child("__id-9223372036854775808__")),h=this.docs.getIteratorFrom(u);for(;h.hasNext();){const{key:d,value:{document:p}}=h.getNext();if(!a.isPrefixOf(d.path))break;d.path.length>a.length+1||pp(fp(p),r)<=0||(s.has(p.key)||_s(t,p))&&(o=o.insert(p.key,p.mutableCopy()))}return C.resolve(o)}getAllFromCollectionGroup(e,t,r,s){L(9500)}ii(e,t){return C.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new Bm(this)}getSize(e){return C.resolve(this.size)}}class Bm extends Dm{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.Nr.addEntry(e,s)):this.Nr.removeEntry(r)}),C.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qm{constructor(e){this.persistence=e,this.si=new $t(t=>Ki(t),Qi),this.lastRemoteSnapshotVersion=F.min(),this.highestTargetId=0,this.oi=0,this._i=new to,this.targetCount=0,this.ai=un.ur()}forEachTarget(e,t){return this.si.forEach((r,s)=>t(s)),C.resolve()}getLastRemoteSnapshotVersion(e){return C.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return C.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),C.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.oi&&(this.oi=t),C.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new un(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,C.resolve()}updateTargetData(e,t){return this.Pr(t),C.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,C.resolve()}removeTargets(e,t,r){let s=0;const o=[];return this.si.forEach((a,u)=>{u.sequenceNumber<=t&&r.get(u.targetId)===null&&(this.si.delete(a),o.push(this.removeMatchingKeysForTargetId(e,u.targetId)),s++)}),C.waitFor(o).next(()=>s)}getTargetCount(e){return C.resolve(this.targetCount)}getTargetData(e,t){const r=this.si.get(t)||null;return C.resolve(r)}addMatchingKeys(e,t,r){return this._i.Wr(t,r),C.resolve()}removeMatchingKeys(e,t,r){this._i.zr(t,r);const s=this.persistence.referenceDelegate,o=[];return s&&t.forEach(a=>{o.push(s.markPotentiallyOrphaned(e,a))}),C.waitFor(o)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),C.resolve()}getMatchingKeysForTargetId(e,t){const r=this._i.Hr(t);return C.resolve(r)}containsKey(e,t){return C.resolve(this._i.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rl{constructor(e,t){this.ui={},this.overlays={},this.ci=new ds(0),this.li=!1,this.li=!0,this.hi=new xm,this.referenceDelegate=e(this),this.Pi=new qm(this),this.indexManager=new Rm,this.remoteDocumentCache=function(s){return new Um(s)}(r=>this.referenceDelegate.Ti(r)),this.serializer=new vm(t),this.Ii=new Mm(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Lm,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ui[e.toKey()];return r||(r=new Fm(t,this.referenceDelegate),this.ui[e.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,r){N("MemoryPersistence","Starting transaction:",e);const s=new jm(this.ci.next());return this.referenceDelegate.Ei(),r(s).next(o=>this.referenceDelegate.di(s).next(()=>o)).toPromise().then(o=>(s.raiseOnCommittedEvent(),o))}Ai(e,t){return C.or(Object.values(this.ui).map(r=>()=>r.containsKey(e,t)))}}class jm extends gp{constructor(e){super(),this.currentSequenceNumber=e}}class no{constructor(e){this.persistence=e,this.Ri=new to,this.Vi=null}static mi(e){return new no(e)}get fi(){if(this.Vi)return this.Vi;throw L(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.fi.delete(r.toString()),C.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.fi.add(r.toString()),C.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),C.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach(s=>this.fi.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(o=>this.fi.add(o.toString()))}).next(()=>r.removeTargetData(e,t))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return C.forEach(this.fi,r=>{const s=M.fromPath(r);return this.gi(e,s).next(o=>{o||t.removeEntry(s,F.min())})}).next(()=>(this.Vi=null,t.apply(e)))}updateLimboDocument(e,t){return this.gi(e,t).next(r=>{r?this.fi.delete(t.toString()):this.fi.add(t.toString())})}Ti(e){return 0}gi(e,t){return C.or([()=>C.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class Zr{constructor(e,t){this.persistence=e,this.pi=new $t(r=>Ep(r.path),(r,s)=>r.isEqual(s)),this.garbageCollector=km(this,t)}static mi(e,t){return new Zr(e,t)}Ei(){}di(e){return C.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next(r=>t.next(s=>r+s))}wr(e){let t=0;return this.pr(e,r=>{t++}).next(()=>t)}pr(e,t){return C.forEach(this.pi,(r,s)=>this.br(e,r,s).next(o=>o?C.resolve():t(s)))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),o=s.newChangeBuffer();return s.ii(e,a=>this.br(e,a,t).next(u=>{u||(r++,o.removeEntry(a,F.min()))})).next(()=>o.apply(e)).next(()=>r)}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),C.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),C.resolve()}removeReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),C.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),C.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Lr(e.data.value)),t}br(e,t,r){return C.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.pi.get(t);return C.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ro{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Es=r,this.ds=s}static As(e,t){let r=z(),s=z();for(const o of t.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new ro(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $m{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zm{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=function(){return Vd()?8:_p(Ee())>0?6:4}()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,s){const o={result:null};return this.ys(e,t).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.ws(e,t,s,r).next(a=>{o.result=a})}).next(()=>{if(o.result)return;const a=new $m;return this.Ss(e,t,a).next(u=>{if(o.result=u,this.Vs)return this.bs(e,t,a,u.size)})}).next(()=>o.result)}bs(e,t,r,s){return r.documentReadCount<this.fs?(Kt()<=j.DEBUG&&N("QueryEngine","SDK will not create cache indexes for query:",Qt(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),C.resolve()):(Kt()<=j.DEBUG&&N("QueryEngine","Query:",Qt(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.gs*s?(Kt()<=j.DEBUG&&N("QueryEngine","The SDK decides to create cache indexes for query:",Qt(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Fe(t))):C.resolve())}ys(e,t){if(yc(t))return C.resolve(null);let r=Fe(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=Xr(t,null,"F"),r=Fe(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(o=>{const a=z(...o);return this.ps.getDocuments(e,a).next(u=>this.indexManager.getMinOffset(e,r).next(h=>{const d=this.Ds(t,u);return this.Cs(t,d,a,h.readTime)?this.ys(e,Xr(t,null,"F")):this.vs(e,d,t,h)}))})))}ws(e,t,r,s){return yc(t)||s.isEqual(F.min())?C.resolve(null):this.ps.getDocuments(e,r).next(o=>{const a=this.Ds(t,o);return this.Cs(t,a,r,s)?C.resolve(null):(Kt()<=j.DEBUG&&N("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Qt(t)),this.vs(e,a,t,dp(s,Kn)).next(u=>u))})}Ds(e,t){let r=new ce(nl(e));return t.forEach((s,o)=>{_s(e,o)&&(r=r.add(o))}),r}Cs(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const o=e.limitType==="F"?t.last():t.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}Ss(e,t,r){return Kt()<=j.DEBUG&&N("QueryEngine","Using full collection scan to execute query:",Qt(t)),this.ps.getDocumentsMatchingQuery(e,t,yt.min(),r)}vs(e,t,r,s){return this.ps.getDocumentsMatchingQuery(e,r,s).next(o=>(t.forEach(a=>{o=o.insert(a.key,a)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const so="LocalStore",Hm=3e8;class Gm{constructor(e,t,r,s){this.persistence=e,this.Fs=t,this.serializer=s,this.Ms=new Z($),this.xs=new $t(o=>Ki(o),Qi),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(r)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Om(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Ms))}}function Wm(n,e,t,r){return new Gm(n,e,t,r)}async function Sl(n,e){const t=U(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(o=>(s=o,t.Bs(e),t.mutationQueue.getAllMutationBatches(r))).next(o=>{const a=[],u=[];let h=z();for(const d of s){a.push(d.batchId);for(const p of d.mutations)h=h.add(p.key)}for(const d of o){u.push(d.batchId);for(const p of d.mutations)h=h.add(p.key)}return t.localDocuments.getDocuments(r,h).next(d=>({Ls:d,removedBatchIds:a,addedBatchIds:u}))})})}function Km(n,e){const t=U(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),o=t.Ns.newChangeBuffer({trackRemovals:!0});return function(u,h,d,p){const g=d.batch,T=g.keys();let P=C.resolve();return T.forEach(D=>{P=P.next(()=>p.getEntry(h,D)).next(O=>{const V=d.docVersions.get(D);W(V!==null,48541),O.version.compareTo(V)<0&&(g.applyToRemoteDocument(O,d),O.isValidDocument()&&(O.setReadTime(d.commitVersion),p.addEntry(O)))})}),P.next(()=>u.mutationQueue.removeMutationBatch(h,g))}(t,r,e,o).next(()=>o.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(u){let h=z();for(let d=0;d<u.mutationResults.length;++d)u.mutationResults[d].transformResults.length>0&&(h=h.add(u.batch.mutations[d].key));return h}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function Pl(n){const e=U(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Pi.getLastRemoteSnapshotVersion(t))}function Qm(n,e){const t=U(n),r=e.snapshotVersion;let s=t.Ms;return t.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{const a=t.Ns.newChangeBuffer({trackRemovals:!0});s=t.Ms;const u=[];e.targetChanges.forEach((p,g)=>{const T=s.get(g);if(!T)return;u.push(t.Pi.removeMatchingKeys(o,p.removedDocuments,g).next(()=>t.Pi.addMatchingKeys(o,p.addedDocuments,g)));let P=T.withSequenceNumber(o.currentSequenceNumber);e.targetMismatches.get(g)!==null?P=P.withResumeToken(pe.EMPTY_BYTE_STRING,F.min()).withLastLimboFreeSnapshotVersion(F.min()):p.resumeToken.approximateByteSize()>0&&(P=P.withResumeToken(p.resumeToken,r)),s=s.insert(g,P),function(O,V,q){return O.resumeToken.approximateByteSize()===0||V.snapshotVersion.toMicroseconds()-O.snapshotVersion.toMicroseconds()>=Hm?!0:q.addedDocuments.size+q.modifiedDocuments.size+q.removedDocuments.size>0}(T,P,p)&&u.push(t.Pi.updateTargetData(o,P))});let h=Xe(),d=z();if(e.documentUpdates.forEach(p=>{e.resolvedLimboDocuments.has(p)&&u.push(t.persistence.referenceDelegate.updateLimboDocument(o,p))}),u.push(Xm(o,a,e.documentUpdates).next(p=>{h=p.ks,d=p.qs})),!r.isEqual(F.min())){const p=t.Pi.getLastRemoteSnapshotVersion(o).next(g=>t.Pi.setTargetsMetadata(o,o.currentSequenceNumber,r));u.push(p)}return C.waitFor(u).next(()=>a.apply(o)).next(()=>t.localDocuments.getLocalViewOfDocuments(o,h,d)).next(()=>h)}).then(o=>(t.Ms=s,o))}function Xm(n,e,t){let r=z(),s=z();return t.forEach(o=>r=r.add(o)),e.getEntries(n,r).next(o=>{let a=Xe();return t.forEach((u,h)=>{const d=o.get(u);h.isFoundDocument()!==d.isFoundDocument()&&(s=s.add(u)),h.isNoDocument()&&h.version.isEqual(F.min())?(e.removeEntry(u,h.readTime),a=a.insert(u,h)):!d.isValidDocument()||h.version.compareTo(d.version)>0||h.version.compareTo(d.version)===0&&d.hasPendingWrites?(e.addEntry(h),a=a.insert(u,h)):N(so,"Ignoring outdated watch update for ",u,". Current version:",d.version," Watch version:",h.version)}),{ks:a,qs:s}})}function Jm(n,e){const t=U(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=Hi),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function Ym(n,e){const t=U(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.Pi.getTargetData(r,e).next(o=>o?(s=o,C.resolve(s)):t.Pi.allocateTargetId(r).next(a=>(s=new dt(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Pi.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.Ms.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ms=t.Ms.insert(r.targetId,r),t.xs.set(e,r.targetId)),r})}async function ki(n,e,t){const r=U(n),s=r.Ms.get(e),o=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",o,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!gn(a))throw a;N(so,`Failed to update sequence numbers for target ${e}: ${a}`)}r.Ms=r.Ms.remove(e),r.xs.delete(s.target)}function kc(n,e,t){const r=U(n);let s=F.min(),o=z();return r.persistence.runTransaction("Execute query","readwrite",a=>function(h,d,p){const g=U(h),T=g.xs.get(p);return T!==void 0?C.resolve(g.Ms.get(T)):g.Pi.getTargetData(d,p)}(r,a,Fe(e)).next(u=>{if(u)return s=u.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(a,u.targetId).next(h=>{o=h})}).next(()=>r.Fs.getDocumentsMatchingQuery(a,e,t?s:F.min(),t?o:z())).next(u=>(Zm(r,Fp(e),u),{documents:u,Qs:o})))}function Zm(n,e,t){let r=n.Os.get(e)||F.min();t.forEach((s,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)}),n.Os.set(e,r)}class Dc{constructor(){this.activeTargetIds=zp()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class eg{constructor(){this.Mo=new Dc,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,r){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new Dc,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tg{Oo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nc="ConnectivityMonitor";class Oc{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){N(Nc,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){N(Nc,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Nr=null;function Di(){return Nr===null?Nr=function(){return 268435456+Math.round(2147483648*Math.random())}():Nr++,"0x"+Nr.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const li="RestConnection",ng={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class rg{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${r}/databases/${s}`,this.Wo=this.databaseId.database===Wr?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Go(e,t,r,s,o){const a=Di(),u=this.zo(e,t.toUriEncodedString());N(li,`Sending RPC '${e}' ${a}:`,u,r);const h={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(h,s,o);const{host:d}=new URL(u),p=dn(d);return this.Jo(e,u,h,r,p).then(g=>(N(li,`Received RPC '${e}' ${a}: `,g),g),g=>{throw sn(li,`RPC '${e}' ${a} failed with error: `,g,"url: ",u,"request:",r),g})}Ho(e,t,r,s,o,a){return this.Go(e,t,r,s,o)}jo(e,t,r){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+pn}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((s,o)=>e[o]=s),r&&r.headers.forEach((s,o)=>e[o]=s)}zo(e,t){const r=ng[e];return`${this.Uo}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sg{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ge="WebChannelConnection";class ig extends rg{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,r,s,o){const a=Di();return new Promise((u,h)=>{const d=new bu;d.setWithCredentials(!0),d.listenOnce(Vu.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case Mr.NO_ERROR:const g=d.getResponseJson();N(ge,`XHR for RPC '${e}' ${a} received:`,JSON.stringify(g)),u(g);break;case Mr.TIMEOUT:N(ge,`RPC '${e}' ${a} timed out`),h(new k(S.DEADLINE_EXCEEDED,"Request time out"));break;case Mr.HTTP_ERROR:const T=d.getStatus();if(N(ge,`RPC '${e}' ${a} failed with status:`,T,"response text:",d.getResponseText()),T>0){let P=d.getResponseJson();Array.isArray(P)&&(P=P[0]);const D=P==null?void 0:P.error;if(D&&D.status&&D.message){const O=function(q){const H=q.toLowerCase().replace(/_/g,"-");return Object.values(S).indexOf(H)>=0?H:S.UNKNOWN}(D.status);h(new k(O,D.message))}else h(new k(S.UNKNOWN,"Server responded with status "+d.getStatus()))}else h(new k(S.UNAVAILABLE,"Connection failed."));break;default:L(9055,{l_:e,streamId:a,h_:d.getLastErrorCode(),P_:d.getLastError()})}}finally{N(ge,`RPC '${e}' ${a} completed.`)}});const p=JSON.stringify(s);N(ge,`RPC '${e}' ${a} sending request:`,s),d.send(t,"POST",p,r,15)})}T_(e,t,r){const s=Di(),o=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=Nu(),u=Du(),h={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},d=this.longPollingOptions.timeoutSeconds;d!==void 0&&(h.longPollingTimeout=Math.round(1e3*d)),this.useFetchStreams&&(h.useFetchStreams=!0),this.jo(h.initMessageHeaders,t,r),h.encodeInitMessageHeaders=!0;const p=o.join("");N(ge,`Creating RPC '${e}' stream ${s}: ${p}`,h);const g=a.createWebChannel(p,h);this.I_(g);let T=!1,P=!1;const D=new sg({Yo:V=>{P?N(ge,`Not sending because RPC '${e}' stream ${s} is closed:`,V):(T||(N(ge,`Opening RPC '${e}' stream ${s} transport.`),g.open(),T=!0),N(ge,`RPC '${e}' stream ${s} sending:`,V),g.send(V))},Zo:()=>g.close()}),O=(V,q,H)=>{V.listen(q,K=>{try{H(K)}catch(ue){setTimeout(()=>{throw ue},0)}})};return O(g,Ln.EventType.OPEN,()=>{P||(N(ge,`RPC '${e}' stream ${s} transport opened.`),D.o_())}),O(g,Ln.EventType.CLOSE,()=>{P||(P=!0,N(ge,`RPC '${e}' stream ${s} transport closed`),D.a_(),this.E_(g))}),O(g,Ln.EventType.ERROR,V=>{P||(P=!0,sn(ge,`RPC '${e}' stream ${s} transport errored. Name:`,V.name,"Message:",V.message),D.a_(new k(S.UNAVAILABLE,"The operation could not be completed")))}),O(g,Ln.EventType.MESSAGE,V=>{var q;if(!P){const H=V.data[0];W(!!H,16349);const K=H,ue=(K==null?void 0:K.error)||((q=K[0])==null?void 0:q.error);if(ue){N(ge,`RPC '${e}' stream ${s} received error:`,ue);const Se=ue.status;let oe=function(y){const w=re[y];if(w!==void 0)return pl(w)}(Se),I=ue.message;oe===void 0&&(oe=S.INTERNAL,I="Unknown error status: "+Se+" with message "+ue.message),P=!0,D.a_(new k(oe,I)),g.close()}else N(ge,`RPC '${e}' stream ${s} received:`,H),D.u_(H)}}),O(u,ku.STAT_EVENT,V=>{V.stat===Ti.PROXY?N(ge,`RPC '${e}' stream ${s} detected buffering proxy`):V.stat===Ti.NOPROXY&&N(ge,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{D.__()},0),D}terminate(){this.c_.forEach(e=>e.close()),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter(t=>t===e)}}function hi(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Is(n){return new um(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cl{constructor(e,t,r=1e3,s=1.5,o=6e4){this.Mi=e,this.timerId=t,this.d_=r,this.A_=s,this.R_=o,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-r);s>0&&N("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,()=>(this.f_=Date.now(),e())),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mc="PersistentStream";class bl{constructor(e,t,r,s,o,a,u,h){this.Mi=e,this.S_=r,this.b_=s,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=u,this.listener=h,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Cl(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,()=>this.k_()))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===S.RESOURCE_EXHAUSTED?(Qe(t.toString()),Qe("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===S.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.D_===t&&this.G_(r,s)},r=>{e(()=>{const s=new k(S.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)})})}G_(e,t){const r=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo(()=>{r(()=>this.listener.Xo())}),this.stream.t_(()=>{r(()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,()=>(this.O_()&&(this.state=3),Promise.resolve())),this.listener.t_()))}),this.stream.r_(s=>{r(()=>this.z_(s))}),this.stream.onMessage(s=>{r(()=>++this.F_==1?this.J_(s):this.onNext(s))})}N_(){this.state=5,this.M_.p_(async()=>{this.state=0,this.start()})}z_(e){return N(Mc,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget(()=>this.D_===e?t():(N(Mc,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class og extends bl{constructor(e,t,r,s,o,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=o}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=dm(this.serializer,e),r=function(o){if(!("targetChange"in o))return F.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?F.min():a.readTime?Ue(a.readTime):F.min()}(e);return this.listener.H_(t,r)}Y_(e){const t={};t.database=Vi(this.serializer),t.addTarget=function(o,a){let u;const h=a.target;if(u=Ri(h)?{documents:mm(o,h)}:{query:gm(o,h).ft},u.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){u.resumeToken=_l(o,a.resumeToken);const d=Pi(o,a.expectedCount);d!==null&&(u.expectedCount=d)}else if(a.snapshotVersion.compareTo(F.min())>0){u.readTime=Yr(o,a.snapshotVersion.toTimestamp());const d=Pi(o,a.expectedCount);d!==null&&(u.expectedCount=d)}return u}(this.serializer,e);const r=ym(this.serializer,e);r&&(t.labels=r),this.q_(t)}Z_(e){const t={};t.database=Vi(this.serializer),t.removeTarget=e,this.q_(t)}}class ag extends bl{constructor(e,t,r,s,o,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=o}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return W(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,W(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){W(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=pm(e.writeResults,e.commitTime),r=Ue(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=Vi(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>fm(this.serializer,r))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cg{}class ug extends cg{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new k(S.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Go(e,Ci(t,r),s,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new k(S.UNKNOWN,o.toString())})}Ho(e,t,r,s,o){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,u])=>this.connection.Ho(e,Ci(t,r),s,a,u,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===S.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new k(S.UNKNOWN,a.toString())})}terminate(){this.ia=!0,this.connection.terminate()}}class lg{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve())))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Qe(t),this.aa=!1):N("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qt="RemoteStore";class hg{constructor(e,t,r,s,o){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=o,this.Aa.Oo(a=>{r.enqueueAndForget(async()=>{zt(this)&&(N(qt,"Restarting streams for network reachability change."),await async function(h){const d=U(h);d.Ea.add(4),await cr(d),d.Ra.set("Unknown"),d.Ea.delete(4),await ws(d)}(this))})}),this.Ra=new lg(r,s)}}async function ws(n){if(zt(n))for(const e of n.da)await e(!0)}async function cr(n){for(const e of n.da)await e(!1)}function Vl(n,e){const t=U(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),co(t)?ao(t):yn(t).O_()&&oo(t,e))}function io(n,e){const t=U(n),r=yn(t);t.Ia.delete(e),r.O_()&&kl(t,e),t.Ia.size===0&&(r.O_()?r.L_():zt(t)&&t.Ra.set("Unknown"))}function oo(n,e){if(n.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(F.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}yn(n).Y_(e)}function kl(n,e){n.Va.Ue(e),yn(n).Z_(e)}function ao(n){n.Va=new im({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),yn(n).start(),n.Ra.ua()}function co(n){return zt(n)&&!yn(n).x_()&&n.Ia.size>0}function zt(n){return U(n).Ea.size===0}function Dl(n){n.Va=void 0}async function dg(n){n.Ra.set("Online")}async function fg(n){n.Ia.forEach((e,t)=>{oo(n,e)})}async function pg(n,e){Dl(n),co(n)?(n.Ra.ha(e),ao(n)):n.Ra.set("Unknown")}async function mg(n,e,t){if(n.Ra.set("Online"),e instanceof gl&&e.state===2&&e.cause)try{await async function(s,o){const a=o.cause;for(const u of o.targetIds)s.Ia.has(u)&&(await s.remoteSyncer.rejectListen(u,a),s.Ia.delete(u),s.Va.removeTarget(u))}(n,e)}catch(r){N(qt,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await es(n,r)}else if(e instanceof Ur?n.Va.Ze(e):e instanceof ml?n.Va.st(e):n.Va.tt(e),!t.isEqual(F.min()))try{const r=await Pl(n.localStore);t.compareTo(r)>=0&&await function(o,a){const u=o.Va.Tt(a);return u.targetChanges.forEach((h,d)=>{if(h.resumeToken.approximateByteSize()>0){const p=o.Ia.get(d);p&&o.Ia.set(d,p.withResumeToken(h.resumeToken,a))}}),u.targetMismatches.forEach((h,d)=>{const p=o.Ia.get(h);if(!p)return;o.Ia.set(h,p.withResumeToken(pe.EMPTY_BYTE_STRING,p.snapshotVersion)),kl(o,h);const g=new dt(p.target,h,d,p.sequenceNumber);oo(o,g)}),o.remoteSyncer.applyRemoteEvent(u)}(n,t)}catch(r){N(qt,"Failed to raise snapshot:",r),await es(n,r)}}async function es(n,e,t){if(!gn(e))throw e;n.Ea.add(1),await cr(n),n.Ra.set("Offline"),t||(t=()=>Pl(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{N(qt,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await ws(n)})}function Nl(n,e){return e().catch(t=>es(n,t,e))}async function vs(n){const e=U(n),t=wt(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Hi;for(;gg(e);)try{const s=await Jm(e.localStore,r);if(s===null){e.Ta.length===0&&t.L_();break}r=s.batchId,_g(e,s)}catch(s){await es(e,s)}Ol(e)&&Ml(e)}function gg(n){return zt(n)&&n.Ta.length<10}function _g(n,e){n.Ta.push(e);const t=wt(n);t.O_()&&t.X_&&t.ea(e.mutations)}function Ol(n){return zt(n)&&!wt(n).x_()&&n.Ta.length>0}function Ml(n){wt(n).start()}async function yg(n){wt(n).ra()}async function Eg(n){const e=wt(n);for(const t of n.Ta)e.ea(t.mutations)}async function Tg(n,e,t){const r=n.Ta.shift(),s=Yi.from(r,e,t);await Nl(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await vs(n)}async function Ig(n,e){e&&wt(n).X_&&await async function(r,s){if(function(a){return nm(a)&&a!==S.ABORTED}(s.code)){const o=r.Ta.shift();wt(r).B_(),await Nl(r,()=>r.remoteSyncer.rejectFailedWrite(o.batchId,s)),await vs(r)}}(n,e),Ol(n)&&Ml(n)}async function Lc(n,e){const t=U(n);t.asyncQueue.verifyOperationInProgress(),N(qt,"RemoteStore received new credentials");const r=zt(t);t.Ea.add(3),await cr(t),r&&t.Ra.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await ws(t)}async function wg(n,e){const t=U(n);e?(t.Ea.delete(2),await ws(t)):e||(t.Ea.add(2),await cr(t),t.Ra.set("Unknown"))}function yn(n){return n.ma||(n.ma=function(t,r,s){const o=U(t);return o.sa(),new og(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(n.datastore,n.asyncQueue,{Xo:dg.bind(null,n),t_:fg.bind(null,n),r_:pg.bind(null,n),H_:mg.bind(null,n)}),n.da.push(async e=>{e?(n.ma.B_(),co(n)?ao(n):n.Ra.set("Unknown")):(await n.ma.stop(),Dl(n))})),n.ma}function wt(n){return n.fa||(n.fa=function(t,r,s){const o=U(t);return o.sa(),new ag(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:yg.bind(null,n),r_:Ig.bind(null,n),ta:Eg.bind(null,n),na:Tg.bind(null,n)}),n.da.push(async e=>{e?(n.fa.B_(),await vs(n)):(await n.fa.stop(),n.Ta.length>0&&(N(qt,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))})),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uo{constructor(e,t,r,s,o){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=o,this.deferred=new We,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,o){const a=Date.now()+r,u=new uo(e,t,a,s,o);return u.start(r),u}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new k(S.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function lo(n,e){if(Qe("AsyncQueue",`${e}: ${n}`),gn(n))return new k(S.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt{static emptySet(e){return new Zt(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||M.comparator(t.key,r.key):(t,r)=>M.comparator(t.key,r.key),this.keyedMap=xn(),this.sortedSet=new Z(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Zt)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,o=r.getNext().key;if(!s.isEqual(o))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Zt;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xc{constructor(){this.ga=new Z(M.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):L(63341,{Rt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal((t,r)=>{e.push(r)}),e}}class ln{constructor(e,t,r,s,o,a,u,h,d){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=u,this.excludesMetadataChanges=h,this.hasCachedResults=d}static fromInitialDocuments(e,t,r,s,o){const a=[];return t.forEach(u=>{a.push({type:0,doc:u})}),new ln(e,t,Zt.emptySet(t),a,r,s,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&gs(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vg{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some(e=>e.Da())}}class Ag{constructor(){this.queries=Fc(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const s=U(t),o=s.queries;s.queries=Fc(),o.forEach((a,u)=>{for(const h of u.Sa)h.onError(r)})})(this,new k(S.ABORTED,"Firestore shutting down"))}}function Fc(){return new $t(n=>tl(n),gs)}async function ho(n,e){const t=U(n);let r=3;const s=e.query;let o=t.queries.get(s);o?!o.ba()&&e.Da()&&(r=2):(o=new vg,r=e.Da()?0:1);try{switch(r){case 0:o.wa=await t.onListen(s,!0);break;case 1:o.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const u=lo(a,`Initialization of query '${Qt(e.query)}' failed`);return void e.onError(u)}t.queries.set(s,o),o.Sa.push(e),e.va(t.onlineState),o.wa&&e.Fa(o.wa)&&po(t)}async function fo(n,e){const t=U(n),r=e.query;let s=3;const o=t.queries.get(r);if(o){const a=o.Sa.indexOf(e);a>=0&&(o.Sa.splice(a,1),o.Sa.length===0?s=e.Da()?0:1:!o.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function Rg(n,e){const t=U(n);let r=!1;for(const s of e){const o=s.query,a=t.queries.get(o);if(a){for(const u of a.Sa)u.Fa(s)&&(r=!0);a.wa=s}}r&&po(t)}function Sg(n,e,t){const r=U(n),s=r.queries.get(e);if(s)for(const o of s.Sa)o.onError(t);r.queries.delete(e)}function po(n){n.Ca.forEach(e=>{e.next()})}var Ni,Uc;(Uc=Ni||(Ni={})).Ma="default",Uc.Cache="cache";class mo{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new ln(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=ln.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Ni.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ll{constructor(e){this.key=e}}class xl{constructor(e){this.key=e}}class Pg{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=z(),this.mutatedKeys=z(),this.eu=nl(e),this.tu=new Zt(this.eu)}get nu(){return this.Ya}ru(e,t){const r=t?t.iu:new xc,s=t?t.tu:this.tu;let o=t?t.mutatedKeys:this.mutatedKeys,a=s,u=!1;const h=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,d=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((p,g)=>{const T=s.get(p),P=_s(this.query,g)?g:null,D=!!T&&this.mutatedKeys.has(T.key),O=!!P&&(P.hasLocalMutations||this.mutatedKeys.has(P.key)&&P.hasCommittedMutations);let V=!1;T&&P?T.data.isEqual(P.data)?D!==O&&(r.track({type:3,doc:P}),V=!0):this.su(T,P)||(r.track({type:2,doc:P}),V=!0,(h&&this.eu(P,h)>0||d&&this.eu(P,d)<0)&&(u=!0)):!T&&P?(r.track({type:0,doc:P}),V=!0):T&&!P&&(r.track({type:1,doc:T}),V=!0,(h||d)&&(u=!0)),V&&(P?(a=a.add(P),o=O?o.add(p):o.delete(p)):(a=a.delete(p),o=o.delete(p)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const p=this.query.limitType==="F"?a.last():a.first();a=a.delete(p.key),o=o.delete(p.key),r.track({type:1,doc:p})}return{tu:a,iu:r,Cs:u,mutatedKeys:o}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const o=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const a=e.iu.ya();a.sort((p,g)=>function(P,D){const O=V=>{switch(V){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return L(20277,{Rt:V})}};return O(P)-O(D)}(p.type,g.type)||this.eu(p.doc,g.doc)),this.ou(r),s=s??!1;const u=t&&!s?this._u():[],h=this.Xa.size===0&&this.current&&!s?1:0,d=h!==this.Za;return this.Za=h,a.length!==0||d?{snapshot:new ln(this.query,e.tu,o,a,e.mutatedKeys,h===0,d,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:u}:{au:u}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new xc,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach(t=>this.Ya=this.Ya.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ya=this.Ya.delete(t)),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=z(),this.tu.forEach(r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))});const t=[];return e.forEach(r=>{this.Xa.has(r)||t.push(new xl(r))}),this.Xa.forEach(r=>{e.has(r)||t.push(new Ll(r))}),t}cu(e){this.Ya=e.Qs,this.Xa=z();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return ln.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const go="SyncEngine";class Cg{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class bg{constructor(e){this.key=e,this.hu=!1}}class Vg{constructor(e,t,r,s,o,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.Pu={},this.Tu=new $t(u=>tl(u),gs),this.Iu=new Map,this.Eu=new Set,this.du=new Z(M.comparator),this.Au=new Map,this.Ru=new to,this.Vu={},this.mu=new Map,this.fu=un.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function kg(n,e,t=!0){const r=$l(n);let s;const o=r.Tu.get(e);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),s=o.view.lu()):s=await Fl(r,e,t,!0),s}async function Dg(n,e){const t=$l(n);await Fl(t,e,!0,!1)}async function Fl(n,e,t,r){const s=await Ym(n.localStore,Fe(e)),o=s.targetId,a=n.sharedClientState.addLocalQueryTarget(o,t);let u;return r&&(u=await Ng(n,e,o,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&Vl(n.remoteStore,s),u}async function Ng(n,e,t,r,s){n.pu=(g,T,P)=>async function(O,V,q,H){let K=V.view.ru(q);K.Cs&&(K=await kc(O.localStore,V.query,!1).then(({documents:I})=>V.view.ru(I,K)));const ue=H&&H.targetChanges.get(V.targetId),Se=H&&H.targetMismatches.get(V.targetId)!=null,oe=V.view.applyChanges(K,O.isPrimaryClient,ue,Se);return qc(O,V.targetId,oe.au),oe.snapshot}(n,g,T,P);const o=await kc(n.localStore,e,!0),a=new Pg(e,o.Qs),u=a.ru(o.documents),h=ar.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),d=a.applyChanges(u,n.isPrimaryClient,h);qc(n,t,d.au);const p=new Cg(e,t,a);return n.Tu.set(e,p),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),d.snapshot}async function Og(n,e,t){const r=U(n),s=r.Tu.get(e),o=r.Iu.get(s.targetId);if(o.length>1)return r.Iu.set(s.targetId,o.filter(a=>!gs(a,e))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await ki(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&io(r.remoteStore,s.targetId),Oi(r,s.targetId)}).catch(mn)):(Oi(r,s.targetId),await ki(r.localStore,s.targetId,!0))}async function Mg(n,e){const t=U(n),r=t.Tu.get(e),s=t.Iu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),io(t.remoteStore,r.targetId))}async function Lg(n,e,t){const r=$g(n);try{const s=await function(a,u){const h=U(a),d=Y.now(),p=u.reduce((P,D)=>P.add(D.key),z());let g,T;return h.persistence.runTransaction("Locally write mutations","readwrite",P=>{let D=Xe(),O=z();return h.Ns.getEntries(P,p).next(V=>{D=V,D.forEach((q,H)=>{H.isValidDocument()||(O=O.add(q))})}).next(()=>h.localDocuments.getOverlayedDocuments(P,D)).next(V=>{g=V;const q=[];for(const H of u){const K=Jp(H,g.get(H.key).overlayedDocument);K!=null&&q.push(new St(H.key,K,Wu(K.value.mapValue),De.exists(!0)))}return h.mutationQueue.addMutationBatch(P,d,q,u)}).next(V=>{T=V;const q=V.applyToLocalDocumentSet(g,O);return h.documentOverlayCache.saveOverlays(P,V.batchId,q)})}).then(()=>({batchId:T.batchId,changes:sl(g)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,u,h){let d=a.Vu[a.currentUser.toKey()];d||(d=new Z($)),d=d.insert(u,h),a.Vu[a.currentUser.toKey()]=d}(r,s.batchId,t),await ur(r,s.changes),await vs(r.remoteStore)}catch(s){const o=lo(s,"Failed to persist write");t.reject(o)}}async function Ul(n,e){const t=U(n);try{const r=await Qm(t.localStore,e);e.targetChanges.forEach((s,o)=>{const a=t.Au.get(o);a&&(W(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?a.hu=!0:s.modifiedDocuments.size>0?W(a.hu,14607):s.removedDocuments.size>0&&(W(a.hu,42227),a.hu=!1))}),await ur(t,r,e)}catch(r){await mn(r)}}function Bc(n,e,t){const r=U(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Tu.forEach((o,a)=>{const u=a.view.va(e);u.snapshot&&s.push(u.snapshot)}),function(a,u){const h=U(a);h.onlineState=u;let d=!1;h.queries.forEach((p,g)=>{for(const T of g.Sa)T.va(u)&&(d=!0)}),d&&po(h)}(r.eventManager,e),s.length&&r.Pu.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function xg(n,e,t){const r=U(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Au.get(e),o=s&&s.key;if(o){let a=new Z(M.comparator);a=a.insert(o,ye.newNoDocument(o,F.min()));const u=z().add(o),h=new Ts(F.min(),new Map,new Z($),a,u);await Ul(r,h),r.du=r.du.remove(o),r.Au.delete(e),_o(r)}else await ki(r.localStore,e,!1).then(()=>Oi(r,e,t)).catch(mn)}async function Fg(n,e){const t=U(n),r=e.batch.batchId;try{const s=await Km(t.localStore,e);ql(t,r,null),Bl(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await ur(t,s)}catch(s){await mn(s)}}async function Ug(n,e,t){const r=U(n);try{const s=await function(a,u){const h=U(a);return h.persistence.runTransaction("Reject batch","readwrite-primary",d=>{let p;return h.mutationQueue.lookupMutationBatch(d,u).next(g=>(W(g!==null,37113),p=g.keys(),h.mutationQueue.removeMutationBatch(d,g))).next(()=>h.mutationQueue.performConsistencyCheck(d)).next(()=>h.documentOverlayCache.removeOverlaysForBatchId(d,p,u)).next(()=>h.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(d,p)).next(()=>h.localDocuments.getDocuments(d,p))})}(r.localStore,e);ql(r,e,t),Bl(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await ur(r,s)}catch(s){await mn(s)}}function Bl(n,e){(n.mu.get(e)||[]).forEach(t=>{t.resolve()}),n.mu.delete(e)}function ql(n,e,t){const r=U(n);let s=r.Vu[r.currentUser.toKey()];if(s){const o=s.get(e);o&&(t?o.reject(t):o.resolve(),s=s.remove(e)),r.Vu[r.currentUser.toKey()]=s}}function Oi(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Iu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Iu.delete(e),n.isPrimaryClient&&n.Ru.jr(e).forEach(r=>{n.Ru.containsKey(r)||jl(n,r)})}function jl(n,e){n.Eu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(io(n.remoteStore,t),n.du=n.du.remove(e),n.Au.delete(t),_o(n))}function qc(n,e,t){for(const r of t)r instanceof Ll?(n.Ru.addReference(r.key,e),Bg(n,r)):r instanceof xl?(N(go,"Document no longer in limbo: "+r.key),n.Ru.removeReference(r.key,e),n.Ru.containsKey(r.key)||jl(n,r.key)):L(19791,{wu:r})}function Bg(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Eu.has(r)||(N(go,"New document in limbo: "+t),n.Eu.add(r),_o(n))}function _o(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new M(X.fromString(e)),r=n.fu.next();n.Au.set(r,new bg(t)),n.du=n.du.insert(t,r),Vl(n.remoteStore,new dt(Fe(ms(t.path)),r,"TargetPurposeLimboResolution",ds.ce))}}async function ur(n,e,t){const r=U(n),s=[],o=[],a=[];r.Tu.isEmpty()||(r.Tu.forEach((u,h)=>{a.push(r.pu(h,e,t).then(d=>{var p;if((d||t)&&r.isPrimaryClient){const g=d?!d.fromCache:(p=t==null?void 0:t.targetChanges.get(h.targetId))==null?void 0:p.current;r.sharedClientState.updateQueryState(h.targetId,g?"current":"not-current")}if(d){s.push(d);const g=ro.As(h.targetId,d);o.push(g)}}))}),await Promise.all(a),r.Pu.H_(s),await async function(h,d){const p=U(h);try{await p.persistence.runTransaction("notifyLocalViewChanges","readwrite",g=>C.forEach(d,T=>C.forEach(T.Es,P=>p.persistence.referenceDelegate.addReference(g,T.targetId,P)).next(()=>C.forEach(T.ds,P=>p.persistence.referenceDelegate.removeReference(g,T.targetId,P)))))}catch(g){if(!gn(g))throw g;N(so,"Failed to update sequence numbers: "+g)}for(const g of d){const T=g.targetId;if(!g.fromCache){const P=p.Ms.get(T),D=P.snapshotVersion,O=P.withLastLimboFreeSnapshotVersion(D);p.Ms=p.Ms.insert(T,O)}}}(r.localStore,o))}async function qg(n,e){const t=U(n);if(!t.currentUser.isEqual(e)){N(go,"User change. New user:",e.toKey());const r=await Sl(t.localStore,e);t.currentUser=e,function(o,a){o.mu.forEach(u=>{u.forEach(h=>{h.reject(new k(S.CANCELLED,a))})}),o.mu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await ur(t,r.Ls)}}function jg(n,e){const t=U(n),r=t.Au.get(e);if(r&&r.hu)return z().add(r.key);{let s=z();const o=t.Iu.get(e);if(!o)return s;for(const a of o){const u=t.Tu.get(a);s=s.unionWith(u.view.nu)}return s}}function $l(n){const e=U(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Ul.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=jg.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=xg.bind(null,e),e.Pu.H_=Rg.bind(null,e.eventManager),e.Pu.yu=Sg.bind(null,e.eventManager),e}function $g(n){const e=U(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Fg.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Ug.bind(null,e),e}class ts{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Is(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return Wm(this.persistence,new zm,e.initialUser,this.serializer)}Cu(e){return new Rl(no.mi,this.serializer)}Du(e){return new eg}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ts.provider={build:()=>new ts};class zg extends ts{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){W(this.persistence.referenceDelegate instanceof Zr,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new bm(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?Ae.withCacheSize(this.cacheSizeBytes):Ae.DEFAULT;return new Rl(r=>Zr.mi(r,t),this.serializer)}}class Mi{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Bc(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=qg.bind(null,this.syncEngine),await wg(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new Ag}()}createDatastore(e){const t=Is(e.databaseInfo.databaseId),r=function(o){return new ig(o)}(e.databaseInfo);return function(o,a,u,h){return new ug(o,a,u,h)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,o,a,u){return new hg(r,s,o,a,u)}(this.localStore,this.datastore,e.asyncQueue,t=>Bc(this.syncEngine,t,0),function(){return Oc.v()?new Oc:new tg}())}createSyncEngine(e,t){return function(s,o,a,u,h,d,p){const g=new Vg(s,o,a,u,h,d);return p&&(g.gu=!0),g}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const o=U(s);N(qt,"RemoteStore shutting down."),o.Ea.add(5),await cr(o),o.Aa.shutdown(),o.Ra.set("Unknown")}(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}Mi.provider={build:()=>new Mi};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yo{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):Qe("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vt="FirestoreClient";class Hg{constructor(e,t,r,s,o){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=_e.UNAUTHENTICATED,this.clientId=zi.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,async a=>{N(vt,"Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(N(vt,"Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new We;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=lo(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function di(n,e){n.asyncQueue.verifyOperationInProgress(),N(vt,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Sl(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function jc(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Gg(n);N(vt,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Lc(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>Lc(e.remoteStore,s)),n._onlineComponents=e}async function Gg(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){N(vt,"Using user provided OfflineComponentProvider");try{await di(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===S.FAILED_PRECONDITION||s.code===S.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;sn("Error using user provided cache. Falling back to memory cache: "+t),await di(n,new ts)}}else N(vt,"Using default OfflineComponentProvider"),await di(n,new zg(void 0));return n._offlineComponents}async function zl(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(N(vt,"Using user provided OnlineComponentProvider"),await jc(n,n._uninitializedComponentsProvider._online)):(N(vt,"Using default OnlineComponentProvider"),await jc(n,new Mi))),n._onlineComponents}function Wg(n){return zl(n).then(e=>e.syncEngine)}async function ns(n){const e=await zl(n),t=e.eventManager;return t.onListen=kg.bind(null,e.syncEngine),t.onUnlisten=Og.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Dg.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Mg.bind(null,e.syncEngine),t}function Kg(n,e,t={}){const r=new We;return n.asyncQueue.enqueueAndForget(async()=>function(o,a,u,h,d){const p=new yo({next:T=>{p.Nu(),a.enqueueAndForget(()=>fo(o,g));const P=T.docs.has(u);!P&&T.fromCache?d.reject(new k(S.UNAVAILABLE,"Failed to get document because the client is offline.")):P&&T.fromCache&&h&&h.source==="server"?d.reject(new k(S.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):d.resolve(T)},error:T=>d.reject(T)}),g=new mo(ms(u.path),p,{includeMetadataChanges:!0,qa:!0});return ho(o,g)}(await ns(n),n.asyncQueue,e,t,r)),r.promise}function Qg(n,e,t={}){const r=new We;return n.asyncQueue.enqueueAndForget(async()=>function(o,a,u,h,d){const p=new yo({next:T=>{p.Nu(),a.enqueueAndForget(()=>fo(o,g)),T.fromCache&&h.source==="server"?d.reject(new k(S.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):d.resolve(T)},error:T=>d.reject(T)}),g=new mo(u,p,{includeMetadataChanges:!0,qa:!0});return ho(o,g)}(await ns(n),n.asyncQueue,e,t,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hl(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $c=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gl="firestore.googleapis.com",zc=!0;class Hc{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new k(S.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Gl,this.ssl=zc}else this.host=e.host,this.ssl=e.ssl??zc;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Al;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Pm)throw new k(S.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}lp("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Hl(e.experimentalLongPollingOptions??{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new k(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new k(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new k(S.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class As{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Hc({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new k(S.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new k(S.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Hc(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new ep;switch(r.type){case"firstParty":return new sp(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new k(S.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=$c.get(t);r&&(N("ComponentProvider","Removing Datastore"),$c.delete(t),r.terminate())}(this),Promise.resolve()}}function Xg(n,e,t,r={}){var d;n=Ve(n,As);const s=dn(e),o=n._getSettings(),a={...o,emulatorOptions:n._getEmulatorOptions()},u=`${e}:${t}`;s&&(Iu(`https://${u}`),wu("Firestore",!0)),o.host!==Gl&&o.host!==u&&sn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const h={...o,host:u,ssl:s,emulatorOptions:r};if(!Ft(h,a)&&(n._setSettings(h),r.mockUserToken)){let p,g;if(typeof r.mockUserToken=="string")p=r.mockUserToken,g=_e.MOCK_USER;else{p=Id(r.mockUserToken,(d=n._app)==null?void 0:d.options.projectId);const T=r.mockUserToken.sub||r.mockUserToken.user_id;if(!T)throw new k(S.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");g=new _e(T)}n._authCredentials=new tp(new Mu(p,g))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new et(this.firestore,e,this._query)}}class ne{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new _t(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ne(this.firestore,e,this._key)}toJSON(){return{type:ne._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(ir(t,ne._jsonSchema))return new ne(e,r||null,new M(X.fromString(t.referencePath)))}}ne._jsonSchemaVersion="firestore/documentReference/1.0",ne._jsonSchema={type:ie("string",ne._jsonSchemaVersion),referencePath:ie("string")};class _t extends et{constructor(e,t,r){super(e,t,ms(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ne(this.firestore,null,new M(e))}withConverter(e){return new _t(this.firestore,e,this._path)}}function pE(n,e,...t){if(n=Te(n),Lu("collection","path",e),n instanceof As){const r=X.fromString(e,...t);return sc(r),new _t(n,null,r)}{if(!(n instanceof ne||n instanceof _t))throw new k(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(X.fromString(e,...t));return sc(r),new _t(n.firestore,null,r)}}function Jg(n,e,...t){if(n=Te(n),arguments.length===1&&(e=zi.newId()),Lu("doc","path",e),n instanceof As){const r=X.fromString(e,...t);return rc(r),new ne(n,null,new M(r))}{if(!(n instanceof ne||n instanceof _t))throw new k(S.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(X.fromString(e,...t));return rc(r),new ne(n.firestore,n instanceof _t?n.converter:null,new M(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gc="AsyncQueue";class Wc{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Cl(this,"async_queue_retry"),this._c=()=>{const r=hi();r&&N(Gc,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=hi();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=hi();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise(()=>{});const t=new We;return this.cc(()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Xu.push(e),this.lc()))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!gn(e))throw e;N(Gc,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_(()=>this.lc())}}cc(e){const t=this.ac.then(()=>(this.rc=!0,e().catch(r=>{throw this.nc=r,this.rc=!1,Qe("INTERNAL UNHANDLED ERROR: ",Kc(r)),r}).then(r=>(this.rc=!1,r))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=uo.createAndSchedule(this,e,t,r,o=>this.hc(o));return this.tc.push(s),s}uc(){this.nc&&L(47125,{Pc:Kc(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then(()=>{this.tc.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()})}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Kc(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qc(n){return function(t,r){if(typeof t!="object"||t===null)return!1;const s=t;for(const o of r)if(o in s&&typeof s[o]=="function")return!0;return!1}(n,["next","error","complete"])}class At extends As{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Wc,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Wc(e),this._firestoreClient=void 0,await e}}}function mE(n,e){const t=typeof n=="object"?n:Ru(),r=typeof n=="string"?n:Wr,s=ji(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const o=Ed("firestore");o&&Xg(s,...o)}return s}function Rs(n){if(n._terminated)throw new k(S.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Yg(n),n._firestoreClient}function Yg(n){var r,s,o;const e=n._freezeSettings(),t=function(u,h,d,p){return new wp(u,h,d,p.host,p.ssl,p.experimentalForceLongPolling,p.experimentalAutoDetectLongPolling,Hl(p.experimentalLongPollingOptions),p.useFetchStreams,p.isUsingEmulator)}(n._databaseId,((r=n._app)==null?void 0:r.options.appId)||"",n._persistenceKey,e);n._componentsProvider||(s=e.localCache)!=null&&s._offlineComponentProvider&&((o=e.localCache)!=null&&o._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new Hg(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&function(u){const h=u==null?void 0:u._online.build();return{_offline:u==null?void 0:u._offline.build(h),_online:h}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be{constructor(e){this._byteString=e}static fromBase64String(e){try{return new be(pe.fromBase64String(e))}catch(t){throw new k(S.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new be(pe.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:be._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(ir(e,be._jsonSchema))return be.fromBase64String(e.bytes)}}be._jsonSchemaVersion="firestore/bytes/1.0",be._jsonSchema={type:ie("string",be._jsonSchemaVersion),bytes:ie("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ss{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new k(S.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new fe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ps{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new k(S.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new k(S.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return $(this._lat,e._lat)||$(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:Be._jsonSchemaVersion}}static fromJSON(e){if(ir(e,Be._jsonSchema))return new Be(e.latitude,e.longitude)}}Be._jsonSchemaVersion="firestore/geoPoint/1.0",Be._jsonSchema={type:ie("string",Be._jsonSchemaVersion),latitude:ie("number"),longitude:ie("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==s[o])return!1;return!0}(this._values,e._values)}toJSON(){return{type:qe._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(ir(e,qe._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new qe(e.vectorValues);throw new k(S.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}qe._jsonSchemaVersion="firestore/vectorValue/1.0",qe._jsonSchema={type:ie("string",qe._jsonSchemaVersion),vectorValues:ie("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zg=/^__.*__$/;class e_{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new St(e,this.data,this.fieldMask,t,this.fieldTransforms):new or(e,this.data,t,this.fieldTransforms)}}class Wl{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new St(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Kl(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw L(40011,{Ac:n})}}class Eo{constructor(e,t,r,s,o,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,o===void 0&&this.Rc(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new Eo({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.Vc({path:t,fc:!1});return r.gc(e),r}yc(e){var s;const t=(s=this.path)==null?void 0:s.child(e),r=this.Vc({path:t,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return rs(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(Kl(this.Ac)&&Zg.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class t_{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Is(e)}Cc(e,t,r,s=!1){return new Eo({Ac:e,methodName:t,Dc:r,path:fe.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function To(n){const e=n._freezeSettings(),t=Is(n._databaseId);return new t_(n._databaseId,!!e.ignoreUndefinedProperties,t)}function n_(n,e,t,r,s,o={}){const a=n.Cc(o.merge||o.mergeFields?2:0,e,t,s);wo("Data must be an object, but it was:",a,r);const u=Ql(r,a);let h,d;if(o.merge)h=new Ce(a.fieldMask),d=a.fieldTransforms;else if(o.mergeFields){const p=[];for(const g of o.mergeFields){const T=Li(e,g,t);if(!a.contains(T))throw new k(S.INVALID_ARGUMENT,`Field '${T}' is specified in your field mask but missing from your input data.`);Jl(p,T)||p.push(T)}h=new Ce(p),d=a.fieldTransforms.filter(g=>h.covers(g.field))}else h=null,d=a.fieldTransforms;return new e_(new Re(u),h,d)}class Cs extends Ps{_toFieldTransform(e){if(e.Ac!==2)throw e.Ac===1?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Cs}}class Io extends Ps{constructor(e,t){super(e),this.Fc=t}_toFieldTransform(e){const t=new tr(e.serializer,al(e.serializer,this.Fc));return new Wp(e.path,t)}isEqual(e){return e instanceof Io&&this.Fc===e.Fc}}function r_(n,e,t,r){const s=n.Cc(1,e,t);wo("Data must be an object, but it was:",s,r);const o=[],a=Re.empty();Rt(r,(h,d)=>{const p=vo(e,h,t);d=Te(d);const g=s.yc(p);if(d instanceof Cs)o.push(p);else{const T=lr(d,g);T!=null&&(o.push(p),a.set(p,T))}});const u=new Ce(o);return new Wl(a,u,s.fieldTransforms)}function s_(n,e,t,r,s,o){const a=n.Cc(1,e,t),u=[Li(e,r,t)],h=[s];if(o.length%2!=0)throw new k(S.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let T=0;T<o.length;T+=2)u.push(Li(e,o[T])),h.push(o[T+1]);const d=[],p=Re.empty();for(let T=u.length-1;T>=0;--T)if(!Jl(d,u[T])){const P=u[T];let D=h[T];D=Te(D);const O=a.yc(P);if(D instanceof Cs)d.push(P);else{const V=lr(D,O);V!=null&&(d.push(P),p.set(P,V))}}const g=new Ce(d);return new Wl(p,g,a.fieldTransforms)}function i_(n,e,t,r=!1){return lr(t,n.Cc(r?4:3,e))}function lr(n,e){if(Xl(n=Te(n)))return wo("Unsupported field value:",e,n),Ql(n,e);if(n instanceof Ps)return function(r,s){if(!Kl(s.Ac))throw s.Sc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(s);o&&s.fieldTransforms.push(o)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return function(r,s){const o=[];let a=0;for(const u of r){let h=lr(u,s.wc(a));h==null&&(h={nullValue:"NULL_VALUE"}),o.push(h),a++}return{arrayValue:{values:o}}}(n,e)}return function(r,s){if((r=Te(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return al(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=Y.fromDate(r);return{timestampValue:Yr(s.serializer,o)}}if(r instanceof Y){const o=new Y(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Yr(s.serializer,o)}}if(r instanceof Be)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof be)return{bytesValue:_l(s.serializer,r._byteString)};if(r instanceof ne){const o=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(o))throw s.Sc(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:eo(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof qe)return function(a,u){return{mapValue:{fields:{[Hu]:{stringValue:Gu},[Kr]:{arrayValue:{values:a.toArray().map(d=>{if(typeof d!="number")throw u.Sc("VectorValues must only contain numeric values.");return Xi(u.serializer,d)})}}}}}}(r,s);throw s.Sc(`Unsupported field value: ${hs(r)}`)}(n,e)}function Ql(n,e){const t={};return Uu(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Rt(n,(r,s)=>{const o=lr(s,e.mc(r));o!=null&&(t[r]=o)}),{mapValue:{fields:t}}}function Xl(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof Y||n instanceof Be||n instanceof be||n instanceof ne||n instanceof Ps||n instanceof qe)}function wo(n,e,t){if(!Xl(t)||!xu(t)){const r=hs(t);throw r==="an object"?e.Sc(n+" a custom object"):e.Sc(n+" "+r)}}function Li(n,e,t){if((e=Te(e))instanceof Ss)return e._internalPath;if(typeof e=="string")return vo(n,e);throw rs("Field path arguments must be of type string or ",n,!1,void 0,t)}const o_=new RegExp("[~\\*/\\[\\]]");function vo(n,e,t){if(e.search(o_)>=0)throw rs(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Ss(...e.split("."))._internalPath}catch{throw rs(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function rs(n,e,t,r,s){const o=r&&!r.isEmpty(),a=s!==void 0;let u=`Function ${e}() called with invalid data`;t&&(u+=" (via `toFirestore()`)"),u+=". ";let h="";return(o||a)&&(h+=" (found",o&&(h+=` in field ${r}`),a&&(h+=` in document ${s}`),h+=")"),new k(S.INVALID_ARGUMENT,u+n+h)}function Jl(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yl{constructor(e,t,r,s,o){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new ne(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new a_(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(bs("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class a_ extends Yl{data(){return super.data()}}function bs(n,e){return typeof e=="string"?vo(n,e):e instanceof Ss?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zl(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new k(S.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Ao{}class Ro extends Ao{}function gE(n,e,...t){let r=[];e instanceof Ao&&r.push(e),r=r.concat(t),function(o){const a=o.filter(h=>h instanceof So).length,u=o.filter(h=>h instanceof Vs).length;if(a>1||a>0&&u>0)throw new k(S.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class Vs extends Ro{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Vs(e,t,r)}_apply(e){const t=this._parse(e);return eh(e._query,t),new et(e.firestore,e.converter,Si(e._query,t))}_parse(e){const t=To(e.firestore);return function(o,a,u,h,d,p,g){let T;if(d.isKeyField()){if(p==="array-contains"||p==="array-contains-any")throw new k(S.INVALID_ARGUMENT,`Invalid Query. You can't perform '${p}' queries on documentId().`);if(p==="in"||p==="not-in"){Jc(g,p);const D=[];for(const O of g)D.push(Xc(h,o,O));T={arrayValue:{values:D}}}else T=Xc(h,o,g)}else p!=="in"&&p!=="not-in"&&p!=="array-contains-any"||Jc(g,p),T=i_(u,a,g,p==="in"||p==="not-in");return se.create(d,p,T)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function _E(n,e,t){const r=e,s=bs("where",n);return Vs._create(s,r,t)}class So extends Ao{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new So(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:Ne.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,o){let a=s;const u=o.getFlattenedFilters();for(const h of u)eh(a,h),a=Si(a,h)}(e._query,t),new et(e.firestore,e.converter,Si(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Po extends Ro{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Po(e,t)}_apply(e){const t=function(s,o,a){if(s.startAt!==null)throw new k(S.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(s.endAt!==null)throw new k(S.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Yn(o,a)}(e._query,this._field,this._direction);return new et(e.firestore,e.converter,function(s,o){const a=s.explicitOrderBy.concat([o]);return new _n(s.path,s.collectionGroup,a,s.filters.slice(),s.limit,s.limitType,s.startAt,s.endAt)}(e._query,t))}}function yE(n,e="asc"){const t=e,r=bs("orderBy",n);return Po._create(r,t)}class Co extends Ro{constructor(e,t,r){super(),this.type=e,this._limit=t,this._limitType=r}static _create(e,t,r){return new Co(e,t,r)}_apply(e){return new et(e.firestore,e.converter,Xr(e._query,this._limit,this._limitType))}}function EE(n){return hp("limit",n),Co._create("limit",n,"F")}function Xc(n,e,t){if(typeof(t=Te(t))=="string"){if(t==="")throw new k(S.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!el(e)&&t.indexOf("/")!==-1)throw new k(S.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(X.fromString(t));if(!M.isDocumentKey(r))throw new k(S.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return dc(n,new M(r))}if(t instanceof ne)return dc(n,t._key);throw new k(S.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${hs(t)}.`)}function Jc(n,e){if(!Array.isArray(n)||n.length===0)throw new k(S.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function eh(n,e){const t=function(s,o){for(const a of s)for(const u of a.getFlattenedFilters())if(o.indexOf(u.op)>=0)return u.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new k(S.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new k(S.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class c_{convertValue(e,t="none"){switch(It(e)){case 0:return null;case 1:return e.booleanValue;case 2:return te(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Tt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw L(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return Rt(e,(s,o)=>{r[s]=this.convertValue(o,t)}),r}convertVectorValue(e){var r,s,o;const t=(o=(s=(r=e.fields)==null?void 0:r[Kr].arrayValue)==null?void 0:s.values)==null?void 0:o.map(a=>te(a.doubleValue));return new qe(t)}convertGeoPoint(e){return new Be(te(e.latitude),te(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=ps(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Qn(e));default:return null}}convertTimestamp(e){const t=Et(e);return new Y(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=X.fromString(e);W(vl(r),9688,{name:e});const s=new Xn(r.get(1),r.get(3)),o=new M(r.popFirst(5));return s.isEqual(t)||Qe(`Document ${o} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function u_(n,e,t){let r;return r=n?n.toFirestore(e):e,r}class Un{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Mt extends Yl{constructor(e,t,r,s,o,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=o}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Br(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(bs("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new k(S.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Mt._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Mt._jsonSchemaVersion="firestore/documentSnapshot/1.0",Mt._jsonSchema={type:ie("string",Mt._jsonSchemaVersion),bundleSource:ie("string","DocumentSnapshot"),bundleName:ie("string"),bundle:ie("string")};class Br extends Mt{data(e={}){return super.data(e)}}class Lt{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Un(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Br(this._firestore,this._userDataWriter,r.key,r,new Un(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new k(S.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,o){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(u=>{const h=new Br(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Un(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:h,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(u=>o||u.type!==3).map(u=>{const h=new Br(s._firestore,s._userDataWriter,u.doc.key,u.doc,new Un(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);let d=-1,p=-1;return u.type!==0&&(d=a.indexOf(u.doc.key),a=a.delete(u.doc.key)),u.type!==1&&(a=a.add(u.doc),p=a.indexOf(u.doc.key)),{type:l_(u.type),doc:h,oldIndex:d,newIndex:p}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new k(S.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Lt._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=zi.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach(o=>{o._document!==null&&(t.push(o._document),r.push(this._userDataWriter.convertObjectMap(o._document.data.value.mapValue.fields,"previous")),s.push(o.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function l_(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return L(61501,{type:n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function TE(n){n=Ve(n,ne);const e=Ve(n.firestore,At);return Kg(Rs(e),n._key).then(t=>th(e,n,t))}Lt._jsonSchemaVersion="firestore/querySnapshot/1.0",Lt._jsonSchema={type:ie("string",Lt._jsonSchemaVersion),bundleSource:ie("string","QuerySnapshot"),bundleName:ie("string"),bundle:ie("string")};class bo extends c_{constructor(e){super(),this.firestore=e}convertBytes(e){return new be(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ne(this.firestore,null,t)}}function IE(n){n=Ve(n,et);const e=Ve(n.firestore,At),t=Rs(e),r=new bo(e);return Zl(n._query),Qg(t,n._query).then(s=>new Lt(e,r,n,s))}function wE(n,e,t,...r){n=Ve(n,ne);const s=Ve(n.firestore,At),o=To(s);let a;return a=typeof(e=Te(e))=="string"||e instanceof Ss?s_(o,"updateDoc",n._key,e,t,r):r_(o,"updateDoc",n._key,e),Vo(s,[a.toMutation(n._key,De.exists(!0))])}function vE(n){return Vo(Ve(n.firestore,At),[new Ji(n._key,De.none())])}function AE(n,e){const t=Ve(n.firestore,At),r=Jg(n),s=u_(n.converter,e);return Vo(t,[n_(To(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,De.exists(!1))]).then(()=>r)}function RE(n,...e){var h,d,p;n=Te(n);let t={includeMetadataChanges:!1,source:"default"},r=0;typeof e[r]!="object"||Qc(e[r])||(t=e[r++]);const s={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(Qc(e[r])){const g=e[r];e[r]=(h=g.next)==null?void 0:h.bind(g),e[r+1]=(d=g.error)==null?void 0:d.bind(g),e[r+2]=(p=g.complete)==null?void 0:p.bind(g)}let o,a,u;if(n instanceof ne)a=Ve(n.firestore,At),u=ms(n._key.path),o={next:g=>{e[r]&&e[r](th(a,n,g))},error:e[r+1],complete:e[r+2]};else{const g=Ve(n,et);a=Ve(g.firestore,At),u=g._query;const T=new bo(a);o={next:P=>{e[r]&&e[r](new Lt(a,T,g,P))},error:e[r+1],complete:e[r+2]},Zl(n._query)}return function(T,P,D,O){const V=new yo(O),q=new mo(P,V,D);return T.asyncQueue.enqueueAndForget(async()=>ho(await ns(T),q)),()=>{V.Nu(),T.asyncQueue.enqueueAndForget(async()=>fo(await ns(T),q))}}(Rs(a),u,s,o)}function Vo(n,e){return function(r,s){const o=new We;return r.asyncQueue.enqueueAndForget(async()=>Lg(await Wg(r),s,o)),o.promise}(Rs(n),e)}function th(n,e,t){const r=t.docs.get(e._key),s=new bo(n);return new Mt(n,s,e._key,r,new Un(t.hasPendingWrites,t.fromCache),e.converter)}function SE(n){return new Io("increment",n)}(function(e,t=!0){(function(s){pn=s})(fn),rn(new Ut("firestore",(r,{instanceIdentifier:s,options:o})=>{const a=r.getProvider("app").getImmediate(),u=new At(new np(r.getProvider("auth-internal")),new ip(a,r.getProvider("app-check-internal")),function(d,p){if(!Object.prototype.hasOwnProperty.apply(d.options,["projectId"]))throw new k(S.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Xn(d.options.projectId,p)}(a,s),a);return o={useFetchStreams:t,...o},u._setSettings(o),u},"PUBLIC").setMultipleInstances(!0)),mt(Za,ec,e),mt(Za,ec,"esm2020")})();var h_="firebase",d_="12.4.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */mt(h_,d_,"app");function nh(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const f_=nh,rh=new rr("auth","Firebase",nh());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ss=new Bi("@firebase/auth");function p_(n,...e){ss.logLevel<=j.WARN&&ss.warn(`Auth (${fn}): ${n}`,...e)}function qr(n,...e){ss.logLevel<=j.ERROR&&ss.error(`Auth (${fn}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Je(n,...e){throw ko(n,...e)}function je(n,...e){return ko(n,...e)}function sh(n,e,t){const r={...f_(),[e]:t};return new rr("auth","Firebase",r).create(e,{appName:n.name})}function xt(n){return sh(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function ko(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return rh.create(n,...e)}function x(n,e,...t){if(!n)throw ko(e,...t)}function He(n){const e="INTERNAL ASSERTION FAILED: "+n;throw qr(e),new Error(e)}function Ye(n,e){n||He(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xi(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function m_(){return Yc()==="http:"||Yc()==="https:"}function Yc(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function g_(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(m_()||Pd()||"connection"in navigator)?navigator.onLine:!0}function __(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hr{constructor(e,t){this.shortDelay=e,this.longDelay=t,Ye(t>e,"Short delay should be less than long delay!"),this.isMobile=Ad()||Cd()}get(){return g_()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Do(n,e){Ye(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ih{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;He("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;He("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;He("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const y_={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const E_=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],T_=new hr(3e4,6e4);function No(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function En(n,e,t,r,s={}){return oh(n,s,async()=>{let o={},a={};r&&(e==="GET"?a=r:o={body:JSON.stringify(r)});const u=sr({key:n.config.apiKey,...a}).slice(1),h=await n._getAdditionalHeaders();h["Content-Type"]="application/json",n.languageCode&&(h["X-Firebase-Locale"]=n.languageCode);const d={method:e,headers:h,...o};return Sd()||(d.referrerPolicy="no-referrer"),n.emulatorConfig&&dn(n.emulatorConfig.host)&&(d.credentials="include"),ih.fetch()(await ah(n,n.config.apiHost,t,u),d)})}async function oh(n,e,t){n._canInitEmulator=!1;const r={...y_,...e};try{const s=new w_(n),o=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await o.json();if("needConfirmation"in a)throw Or(n,"account-exists-with-different-credential",a);if(o.ok&&!("errorMessage"in a))return a;{const u=o.ok?a.errorMessage:a.error.message,[h,d]=u.split(" : ");if(h==="FEDERATED_USER_ID_ALREADY_LINKED")throw Or(n,"credential-already-in-use",a);if(h==="EMAIL_EXISTS")throw Or(n,"email-already-in-use",a);if(h==="USER_DISABLED")throw Or(n,"user-disabled",a);const p=r[h]||h.toLowerCase().replace(/[_\s]+/g,"-");if(d)throw sh(n,p,d);Je(n,p)}}catch(s){if(s instanceof Ze)throw s;Je(n,"network-request-failed",{message:String(s)})}}async function I_(n,e,t,r,s={}){const o=await En(n,e,t,r,s);return"mfaPendingCredential"in o&&Je(n,"multi-factor-auth-required",{_serverResponse:o}),o}async function ah(n,e,t,r){const s=`${e}${t}?${r}`,o=n,a=o.config.emulator?Do(n.config,s):`${n.config.apiScheme}://${s}`;return E_.includes(t)&&(await o._persistenceManagerAvailable,o._getPersistenceType()==="COOKIE")?o._getPersistence()._getFinalTarget(a).toString():a}class w_{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(je(this.auth,"network-request-failed")),T_.get())})}}function Or(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=je(n,e,r);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function v_(n,e){return En(n,"POST","/v1/accounts:delete",e)}async function is(n,e){return En(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hn(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function A_(n,e=!1){const t=Te(n),r=await t.getIdToken(e),s=Oo(r);x(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const o=typeof s.firebase=="object"?s.firebase:void 0,a=o==null?void 0:o.sign_in_provider;return{claims:s,token:r,authTime:Hn(fi(s.auth_time)),issuedAtTime:Hn(fi(s.iat)),expirationTime:Hn(fi(s.exp)),signInProvider:a||null,signInSecondFactor:(o==null?void 0:o.sign_in_second_factor)||null}}function fi(n){return Number(n)*1e3}function Oo(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return qr("JWT malformed, contained fewer than 3 sections"),null;try{const s=_u(t);return s?JSON.parse(s):(qr("Failed to decode base64 JWT payload"),null)}catch(s){return qr("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Zc(n){const e=Oo(n);return x(e,"internal-error"),x(typeof e.exp<"u","internal-error"),x(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nr(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof Ze&&R_(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function R_({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S_{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fi{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Hn(this.lastLoginAt),this.creationTime=Hn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function os(n){var g;const e=n.auth,t=await n.getIdToken(),r=await nr(n,is(e,{idToken:t}));x(r==null?void 0:r.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const o=(g=s.providerUserInfo)!=null&&g.length?ch(s.providerUserInfo):[],a=C_(n.providerData,o),u=n.isAnonymous,h=!(n.email&&s.passwordHash)&&!(a!=null&&a.length),d=u?h:!1,p={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Fi(s.createdAt,s.lastLoginAt),isAnonymous:d};Object.assign(n,p)}async function P_(n){const e=Te(n);await os(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function C_(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function ch(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function b_(n,e){const t=await oh(n,{},async()=>{const r=sr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:o}=n.config,a=await ah(n,s,"/v1/token",`key=${o}`),u=await n._getAdditionalHeaders();u["Content-Type"]="application/x-www-form-urlencoded";const h={method:"POST",headers:u,body:r};return n.emulatorConfig&&dn(n.emulatorConfig.host)&&(h.credentials="include"),ih.fetch()(a,h)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function V_(n,e){return En(n,"POST","/v2/accounts:revokeToken",No(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){x(e.idToken,"internal-error"),x(typeof e.idToken<"u","internal-error"),x(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Zc(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){x(e.length!==0,"internal-error");const t=Zc(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(x(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:o}=await b_(e,t);this.updateTokensAndExpiration(r,s,Number(o))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:o}=t,a=new en;return r&&(x(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(x(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),o&&(x(typeof o=="number","internal-error",{appName:e}),a.expirationTime=o),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new en,this.toJSON())}_performRefresh(){return He("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function at(n,e){x(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class ke{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new S_(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Fi(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await nr(this,this.stsTokenManager.getToken(this.auth,e));return x(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return A_(this,e)}reload(){return P_(this)}_assign(e){this!==e&&(x(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ke({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){x(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await os(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(xe(this.auth.app))return Promise.reject(xt(this.auth));const e=await this.getIdToken();return await nr(this,v_(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,o=t.phoneNumber??void 0,a=t.photoURL??void 0,u=t.tenantId??void 0,h=t._redirectEventId??void 0,d=t.createdAt??void 0,p=t.lastLoginAt??void 0,{uid:g,emailVerified:T,isAnonymous:P,providerData:D,stsTokenManager:O}=t;x(g&&O,e,"internal-error");const V=en.fromJSON(this.name,O);x(typeof g=="string",e,"internal-error"),at(r,e.name),at(s,e.name),x(typeof T=="boolean",e,"internal-error"),x(typeof P=="boolean",e,"internal-error"),at(o,e.name),at(a,e.name),at(u,e.name),at(h,e.name),at(d,e.name),at(p,e.name);const q=new ke({uid:g,auth:e,email:s,emailVerified:T,displayName:r,isAnonymous:P,photoURL:a,phoneNumber:o,tenantId:u,stsTokenManager:V,createdAt:d,lastLoginAt:p});return D&&Array.isArray(D)&&(q.providerData=D.map(H=>({...H}))),h&&(q._redirectEventId=h),q}static async _fromIdTokenResponse(e,t,r=!1){const s=new en;s.updateFromServerResponse(t);const o=new ke({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await os(o),o}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];x(s.localId!==void 0,"internal-error");const o=s.providerUserInfo!==void 0?ch(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(o!=null&&o.length),u=new en;u.updateFromIdToken(r);const h=new ke({uid:s.localId,auth:e,stsTokenManager:u,isAnonymous:a}),d={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Fi(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(o!=null&&o.length)};return Object.assign(h,d),h}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eu=new Map;function Ge(n){Ye(n instanceof Function,"Expected a class definition");let e=eu.get(n);return e?(Ye(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,eu.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uh{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}uh.type="NONE";const tu=uh;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jr(n,e,t){return`firebase:${n}:${e}:${t}`}class tn{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:o}=this.auth;this.fullUserKey=jr(this.userKey,s.apiKey,o),this.fullPersistenceKey=jr("persistence",s.apiKey,o),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await is(this.auth,{idToken:e}).catch(()=>{});return t?ke._fromGetAccountInfoResponse(this.auth,t,e):null}return ke._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new tn(Ge(tu),e,r);const s=(await Promise.all(t.map(async d=>{if(await d._isAvailable())return d}))).filter(d=>d);let o=s[0]||Ge(tu);const a=jr(r,e.config.apiKey,e.name);let u=null;for(const d of t)try{const p=await d._get(a);if(p){let g;if(typeof p=="string"){const T=await is(e,{idToken:p}).catch(()=>{});if(!T)break;g=await ke._fromGetAccountInfoResponse(e,T,p)}else g=ke._fromJSON(e,p);d!==o&&(u=g),o=d;break}}catch{}const h=s.filter(d=>d._shouldAllowMigration);return!o._shouldAllowMigration||!h.length?new tn(o,e,r):(o=h[0],u&&await o._set(a,u.toJSON()),await Promise.all(t.map(async d=>{if(d!==o)try{await d._remove(a)}catch{}})),new tn(o,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nu(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(fh(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(lh(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(mh(e))return"Blackberry";if(gh(e))return"Webos";if(hh(e))return"Safari";if((e.includes("chrome/")||dh(e))&&!e.includes("edge/"))return"Chrome";if(ph(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function lh(n=Ee()){return/firefox\//i.test(n)}function hh(n=Ee()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function dh(n=Ee()){return/crios\//i.test(n)}function fh(n=Ee()){return/iemobile/i.test(n)}function ph(n=Ee()){return/android/i.test(n)}function mh(n=Ee()){return/blackberry/i.test(n)}function gh(n=Ee()){return/webos/i.test(n)}function Mo(n=Ee()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function k_(n=Ee()){var e;return Mo(n)&&!!((e=window.navigator)!=null&&e.standalone)}function D_(){return bd()&&document.documentMode===10}function _h(n=Ee()){return Mo(n)||ph(n)||gh(n)||mh(n)||/windows phone/i.test(n)||fh(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yh(n,e=[]){let t;switch(n){case"Browser":t=nu(Ee());break;case"Worker":t=`${nu(Ee())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${fn}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class N_{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=o=>new Promise((a,u)=>{try{const h=e(o);a(h)}catch(h){u(h)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function O_(n,e={}){return En(n,"GET","/v2/passwordPolicy",No(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const M_=6;class L_{constructor(e){var r;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??M_,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((r=e.allowedNonAlphanumericCharacters)==null?void 0:r.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class x_{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new ru(this),this.idTokenSubscription=new ru(this),this.beforeStateQueue=new N_(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=rh,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(o=>this._resolvePersistenceManagerAvailable=o)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Ge(t)),this._initializationPromise=this.queue(async()=>{var r,s,o;if(!this._deleted&&(this.persistenceManager=await tn.create(this,e),(r=this._resolvePersistenceManagerAvailable)==null||r.call(this),!this._deleted)){if((s=this._popupRedirectResolver)!=null&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((o=this.currentUser)==null?void 0:o.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await is(this,{idToken:e}),r=await ke._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var o;if(xe(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(u=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(u,u))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(o=this.redirectUser)==null?void 0:o._redirectEventId,u=r==null?void 0:r._redirectEventId,h=await this.tryRedirectSignIn(e);(!a||a===u)&&(h!=null&&h.user)&&(r=h.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(a){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return x(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await os(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=__()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(xe(this.app))return Promise.reject(xt(this));const t=e?Te(e):null;return t&&x(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&x(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return xe(this.app)?Promise.reject(xt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return xe(this.app)?Promise.reject(xt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ge(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await O_(this),t=new L_(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new rr("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await V_(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Ge(e)||this._popupRedirectResolver;x(t,this,"argument-error"),this.redirectPersistenceManager=await tn.create(this,[Ge(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)==null?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const o=typeof t=="function"?t:t.next.bind(t);let a=!1;const u=this._isInitialized?Promise.resolve():this._initializationPromise;if(x(u,this,"internal-error"),u.then(()=>{a||o(this.currentUser)}),typeof t=="function"){const h=e.addObserver(t,r,s);return()=>{a=!0,h()}}else{const h=e.addObserver(t);return()=>{a=!0,h()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return x(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=yh(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var s;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((s=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:s.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){var t;if(xe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&p_(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function Lo(n){return Te(n)}class ru{constructor(e){this.auth=e,this.observer=null,this.addObserver=xd(t=>this.observer=t)}get next(){return x(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xo={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function F_(n){xo=n}function U_(n){return xo.loadJS(n)}function B_(){return xo.gapiScript}function q_(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j_(n,e){const t=ji(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),o=t.getOptions();if(Ft(o,e??{}))return s;Je(s,"already-initialized")}return t.initialize({options:e})}function $_(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(Ge);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function z_(n,e,t){const r=Lo(n);x(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,o=Eh(e),{host:a,port:u}=H_(e),h=u===null?"":`:${u}`,d={url:`${o}//${a}${h}/`},p=Object.freeze({host:a,port:u,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){x(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),x(Ft(d,r.config.emulator)&&Ft(p,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=d,r.emulatorConfig=p,r.settings.appVerificationDisabledForTesting=!0,dn(a)?(Iu(`${o}//${a}${h}`),wu("Auth",!0)):G_()}function Eh(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function H_(n){const e=Eh(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const o=s[1];return{host:o,port:su(r.substr(o.length+1))}}else{const[o,a]=r.split(":");return{host:o,port:su(a)}}}function su(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function G_(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Th{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return He("not implemented")}_getIdTokenResponse(e){return He("not implemented")}_linkToIdToken(e,t){return He("not implemented")}_getReauthenticationResolver(e){return He("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nn(n,e){return I_(n,"POST","/v1/accounts:signInWithIdp",No(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const W_="http://localhost";class jt extends Th{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new jt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):Je("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...o}=t;if(!r||!s)return null;const a=new jt(r,s);return a.idToken=o.idToken||void 0,a.accessToken=o.accessToken||void 0,a.secret=o.secret,a.nonce=o.nonce,a.pendingToken=o.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return nn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,nn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,nn(e,t)}buildRequest(){const e={requestUri:W_,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=sr(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ih{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr extends Ih{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct extends dr{constructor(){super("facebook.com")}static credential(e){return jt._fromParams({providerId:ct.PROVIDER_ID,signInMethod:ct.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ct.credentialFromTaggedObject(e)}static credentialFromError(e){return ct.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ct.credential(e.oauthAccessToken)}catch{return null}}}ct.FACEBOOK_SIGN_IN_METHOD="facebook.com";ct.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ut extends dr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return jt._fromParams({providerId:ut.PROVIDER_ID,signInMethod:ut.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return ut.credentialFromTaggedObject(e)}static credentialFromError(e){return ut.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return ut.credential(t,r)}catch{return null}}}ut.GOOGLE_SIGN_IN_METHOD="google.com";ut.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt extends dr{constructor(){super("github.com")}static credential(e){return jt._fromParams({providerId:lt.PROVIDER_ID,signInMethod:lt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return lt.credentialFromTaggedObject(e)}static credentialFromError(e){return lt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return lt.credential(e.oauthAccessToken)}catch{return null}}}lt.GITHUB_SIGN_IN_METHOD="github.com";lt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht extends dr{constructor(){super("twitter.com")}static credential(e,t){return jt._fromParams({providerId:ht.PROVIDER_ID,signInMethod:ht.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return ht.credentialFromTaggedObject(e)}static credentialFromError(e){return ht.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return ht.credential(t,r)}catch{return null}}}ht.TWITTER_SIGN_IN_METHOD="twitter.com";ht.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const o=await ke._fromIdTokenResponse(e,r,s),a=iu(r);return new hn({user:o,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=iu(r);return new hn({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function iu(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class as extends Ze{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,as.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new as(e,t,r,s)}}function wh(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?as._fromErrorAndOperation(n,o,e,r):o})}async function K_(n,e,t=!1){const r=await nr(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return hn._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Q_(n,e,t=!1){const{auth:r}=n;if(xe(r.app))return Promise.reject(xt(r));const s="reauthenticate";try{const o=await nr(n,wh(r,s,e,n),t);x(o.idToken,r,"internal-error");const a=Oo(o.idToken);x(a,r,"internal-error");const{sub:u}=a;return x(n.uid===u,r,"user-mismatch"),hn._forOperation(n,s,o)}catch(o){throw(o==null?void 0:o.code)==="auth/user-not-found"&&Je(r,"user-mismatch"),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function X_(n,e,t=!1){if(xe(n.app))return Promise.reject(xt(n));const r="signIn",s=await wh(n,r,e),o=await hn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(o.user),o}function J_(n,e,t,r){return Te(n).onIdTokenChanged(e,t,r)}function Y_(n,e,t){return Te(n).beforeAuthStateChanged(e,t)}const cs="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vh{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(cs,"1"),this.storage.removeItem(cs),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Z_=1e3,ey=10;class Ah extends vh{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=_h(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,u,h)=>{this.notifyListeners(a,h)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},o=this.storage.getItem(r);D_()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,ey):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Z_)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Ah.type="LOCAL";const ty=Ah;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rh extends vh{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}Rh.type="SESSION";const Sh=Rh;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ny(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ks{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new ks(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:o}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const u=Array.from(a).map(async d=>d(t.origin,o)),h=await ny(u);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:h})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}ks.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fo(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ry{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let o,a;return new Promise((u,h)=>{const d=Fo("",20);s.port1.start();const p=setTimeout(()=>{h(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(g){const T=g;if(T.data.eventId===d)switch(T.data.status){case"ack":clearTimeout(p),o=setTimeout(()=>{h(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),u(T.data.response);break;default:clearTimeout(p),clearTimeout(o),h(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:d,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $e(){return window}function sy(n){$e().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ph(){return typeof $e().WorkerGlobalScope<"u"&&typeof $e().importScripts=="function"}async function iy(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function oy(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function ay(){return Ph()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ch="firebaseLocalStorageDb",cy=1,us="firebaseLocalStorage",bh="fbase_key";class fr{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Ds(n,e){return n.transaction([us],e?"readwrite":"readonly").objectStore(us)}function uy(){const n=indexedDB.deleteDatabase(Ch);return new fr(n).toPromise()}function Ui(){const n=indexedDB.open(Ch,cy);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(us,{keyPath:bh})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(us)?e(r):(r.close(),await uy(),e(await Ui()))})})}async function ou(n,e,t){const r=Ds(n,!0).put({[bh]:e,value:t});return new fr(r).toPromise()}async function ly(n,e){const t=Ds(n,!1).get(e),r=await new fr(t).toPromise();return r===void 0?null:r.value}function au(n,e){const t=Ds(n,!0).delete(e);return new fr(t).toPromise()}const hy=800,dy=3;class Vh{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Ui(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>dy)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Ph()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=ks._getInstance(ay()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,r;if(this.activeServiceWorker=await iy(),!this.activeServiceWorker)return;this.sender=new ry(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(r=e[0])!=null&&r.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||oy()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Ui();return await ou(e,cs,"1"),await au(e,cs),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>ou(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>ly(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>au(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const o=Ds(s,!1).getAll();return new fr(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:o}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(o)&&(this.notifyListeners(s,o),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),hy)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Vh.type="LOCAL";const fy=Vh;new hr(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function py(n,e){return e?Ge(e):(x(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uo extends Th{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return nn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return nn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return nn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function my(n){return X_(n.auth,new Uo(n),n.bypassAuthState)}function gy(n){const{auth:e,user:t}=n;return x(t,e,"internal-error"),Q_(t,new Uo(n),n.bypassAuthState)}async function _y(n){const{auth:e,user:t}=n;return x(t,e,"internal-error"),K_(t,new Uo(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kh{constructor(e,t,r,s,o=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:o,error:a,type:u}=e;if(a){this.reject(a);return}const h={auth:this.auth,requestUri:t,sessionId:r,tenantId:o||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(h))}catch(d){this.reject(d)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return my;case"linkViaPopup":case"linkViaRedirect":return _y;case"reauthViaPopup":case"reauthViaRedirect":return gy;default:Je(this.auth,"internal-error")}}resolve(e){Ye(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ye(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yy=new hr(2e3,1e4);class Yt extends kh{constructor(e,t,r,s,o){super(e,t,s,o),this.provider=r,this.authWindow=null,this.pollId=null,Yt.currentPopupAction&&Yt.currentPopupAction.cancel(),Yt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return x(e,this.auth,"internal-error"),e}async onExecution(){Ye(this.filter.length===1,"Popup operations only handle one event");const e=Fo();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(je(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(je(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Yt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if((r=(t=this.authWindow)==null?void 0:t.window)!=null&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(je(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,yy.get())};e()}}Yt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ey="pendingRedirect",$r=new Map;class Ty extends kh{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=$r.get(this.auth._key());if(!e){try{const r=await Iy(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}$r.set(this.auth._key(),e)}return this.bypassAuthState||$r.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Iy(n,e){const t=Ay(e),r=vy(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function wy(n,e){$r.set(n._key(),e)}function vy(n){return Ge(n._redirectPersistence)}function Ay(n){return jr(Ey,n.config.apiKey,n.name)}async function Ry(n,e,t=!1){if(xe(n.app))return Promise.reject(xt(n));const r=Lo(n),s=py(r,e),a=await new Ty(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sy=10*60*1e3;class Py{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Cy(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!Dh(e)){const s=((r=e.error.code)==null?void 0:r.split("auth/")[1])||"internal-error";t.onError(je(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Sy&&this.cachedEventUids.clear(),this.cachedEventUids.has(cu(e))}saveEventToCache(e){this.cachedEventUids.add(cu(e)),this.lastProcessedEventTime=Date.now()}}function cu(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Dh({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Cy(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Dh(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function by(n,e={}){return En(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vy=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,ky=/^https?/;async function Dy(n){if(n.config.emulator)return;const{authorizedDomains:e}=await by(n);for(const t of e)try{if(Ny(t))return}catch{}Je(n,"unauthorized-domain")}function Ny(n){const e=xi(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!ky.test(t))return!1;if(Vy.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oy=new hr(3e4,6e4);function uu(){const n=$e().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function My(n){return new Promise((e,t)=>{var s,o,a;function r(){uu(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{uu(),t(je(n,"network-request-failed"))},timeout:Oy.get()})}if((o=(s=$e().gapi)==null?void 0:s.iframes)!=null&&o.Iframe)e(gapi.iframes.getContext());else if((a=$e().gapi)!=null&&a.load)r();else{const u=q_("iframefcb");return $e()[u]=()=>{gapi.load?r():t(je(n,"network-request-failed"))},U_(`${B_()}?onload=${u}`).catch(h=>t(h))}}).catch(e=>{throw zr=null,e})}let zr=null;function Ly(n){return zr=zr||My(n),zr}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xy=new hr(5e3,15e3),Fy="__/auth/iframe",Uy="emulator/auth/iframe",By={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},qy=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function jy(n){const e=n.config;x(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Do(e,Uy):`https://${n.config.authDomain}/${Fy}`,r={apiKey:e.apiKey,appName:n.name,v:fn},s=qy.get(n.config.apiHost);s&&(r.eid=s);const o=n._getFrameworks();return o.length&&(r.fw=o.join(",")),`${t}?${sr(r).slice(1)}`}async function $y(n){const e=await Ly(n),t=$e().gapi;return x(t,n,"internal-error"),e.open({where:document.body,url:jy(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:By,dontclear:!0},r=>new Promise(async(s,o)=>{await r.restyle({setHideOnLeave:!1});const a=je(n,"network-request-failed"),u=$e().setTimeout(()=>{o(a)},xy.get());function h(){$e().clearTimeout(u),s(r)}r.ping(h).then(h,()=>{o(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zy={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Hy=500,Gy=600,Wy="_blank",Ky="http://localhost";class lu{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function Qy(n,e,t,r=Hy,s=Gy){const o=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let u="";const h={...zy,width:r.toString(),height:s.toString(),top:o,left:a},d=Ee().toLowerCase();t&&(u=dh(d)?Wy:t),lh(d)&&(e=e||Ky,h.scrollbars="yes");const p=Object.entries(h).reduce((T,[P,D])=>`${T}${P}=${D},`,"");if(k_(d)&&u!=="_self")return Xy(e||"",u),new lu(null);const g=window.open(e||"",u,p);x(g,n,"popup-blocked");try{g.focus()}catch{}return new lu(g)}function Xy(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jy="__/auth/handler",Yy="emulator/auth/handler",Zy=encodeURIComponent("fac");async function hu(n,e,t,r,s,o){x(n.config.authDomain,n,"auth-domain-config-required"),x(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:fn,eventId:s};if(e instanceof Ih){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Ld(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[p,g]of Object.entries({}))a[p]=g}if(e instanceof dr){const p=e.getScopes().filter(g=>g!=="");p.length>0&&(a.scopes=p.join(","))}n.tenantId&&(a.tid=n.tenantId);const u=a;for(const p of Object.keys(u))u[p]===void 0&&delete u[p];const h=await n._getAppCheckToken(),d=h?`#${Zy}=${encodeURIComponent(h)}`:"";return`${eE(n)}?${sr(u).slice(1)}${d}`}function eE({config:n}){return n.emulator?Do(n,Yy):`https://${n.authDomain}/${Jy}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pi="webStorageSupport";class tE{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Sh,this._completeRedirectFn=Ry,this._overrideRedirectResult=wy}async _openPopup(e,t,r,s){var a;Ye((a=this.eventManagers[e._key()])==null?void 0:a.manager,"_initialize() not called before _openPopup()");const o=await hu(e,t,r,xi(),s);return Qy(e,o,Fo())}async _openRedirect(e,t,r,s){await this._originValidation(e);const o=await hu(e,t,r,xi(),s);return sy(o),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:o}=this.eventManagers[t];return s?Promise.resolve(s):(Ye(o,"If manager is not set, promise should be"),o)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await $y(e),r=new Py(e);return t.register("authEvent",s=>(x(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(pi,{type:pi},s=>{var a;const o=(a=s==null?void 0:s[0])==null?void 0:a[pi];o!==void 0&&t(!!o),Je(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Dy(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return _h()||hh()||Mo()}}const nE=tE;var du="@firebase/auth",fu="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rE{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){x(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sE(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function iE(n){rn(new Ut("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:a,authDomain:u}=r.options;x(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const h={apiKey:a,authDomain:u,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:yh(n)},d=new x_(r,s,o,h);return $_(d,t),d},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),rn(new Ut("auth-internal",e=>{const t=Lo(e.getProvider("auth").getImmediate());return(r=>new rE(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),mt(du,fu,sE(n)),mt(du,fu,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oE=5*60,aE=Tu("authIdTokenMaxAge")||oE;let pu=null;const cE=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>aE)return;const s=t==null?void 0:t.token;pu!==s&&(pu=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function PE(n=Ru()){const e=ji(n,"auth");if(e.isInitialized())return e.getImmediate();const t=j_(n,{popupRedirectResolver:nE,persistence:[fy,ty,Sh]}),r=Tu("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const o=new URL(r,location.origin);if(location.origin===o.origin){const a=cE(o.toString());Y_(t,a,()=>a(t.currentUser)),J_(t,u=>a(u))}}const s=yu("auth");return s&&z_(t,`http://${s}`),t}function uE(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}F_({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const o=je("internal-error");o.customData=s,t(o)},r.type="text/javascript",r.charset="UTF-8",uE().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});iE("Browser");export{EE as A,RE as B,Ut as C,rr as E,Ze as F,Bi as L,Y as T,rn as _,ji as a,kd as b,hE as c,Ru as d,Ft as e,lE as f,Te as g,dE as h,Pd as i,$f as j,mE as k,PE as l,pE as m,AE as n,af as o,IE as p,gE as q,mt as r,Jg as s,TE as t,wE as u,Dd as v,_E as w,SE as x,vE as y,yE as z};
