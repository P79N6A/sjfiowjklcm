(function(e){var t={};function n(r){if(t[r]){return t[r].exports}var a=t[r]={i:r,l:false,exports:{}};e[r].call(a.exports,a,a.exports,n);a.l=true;return a.exports}n.m=e;n.c=t;n.d=function(e,t,r){if(!n.o(e,t)){Object.defineProperty(e,t,{configurable:false,enumerable:true,get:r})}};n.n=function(e){var t=e&&e.__esModule?function t(){return e["default"]}:function t(){return e};n.d(t,"a",t);return t};n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)};n.p="";return n(n.s=0)})([function(e,t,n){function r(e){n(1)}var a=n(6);var i=n(7);var o=n(8);var s=false;var c=r;var f=null;var l=null;var u=a(i,o,s,c,f,l);e.exports=u.exports},function(e,t,n){var r=n(2);if(typeof r==="string")r=[[e.i,r,""]];if(r.locals)e.exports=r.locals;var a=n(4)("118c4f40",r,true,{})},function(e,t,n){t=e.exports=n(3)(true);t.push([e.i,".qy-banner{overflow:hidden;position:relative;text-align:center;margin:0 auto;background:#000}.qy-banner a{height:100%;display:block;width:100%}.qy-banner .opacity-item{position:absolute;left:0;top:0}.qy-banner .opacity-item.active{z-index:1}.qy-banner .banner-page{width:100%;text-align:center;z-index:2;bottom:55px;left:0;position:absolute}.qy-banner .banner-page>*{display:inline-block;height:20px;width:20px;margin:0 5px;background:#fff;-webkit-transition:all .3s;transition:all .3s}.qy-banner .banner-page>.active{background:#041238}.qy-banner .banner-page>.circle{border-radius:100em}.qy-banner .fade-enter-active,.qy-banner .fade-leave-active{-webkit-transition:opacity 1.5s;transition:opacity 1.5s}.qy-banner .fade-enter,.qy-banner .fade-leave-to{opacity:0}","",{version:3,sources:["D:/project/vue-async-component/src/views/banner.vue"],names:[],mappings:"AACA,WACE,gBAAiB,AACjB,kBAAmB,AACnB,kBAAmB,AACnB,cAAe,AACf,eAAiB,CAClB,AACD,aACI,YAAa,AACb,cAAe,AACf,UAAY,CACf,AACD,yBACI,kBAAmB,AACnB,OAAQ,AACR,KAAO,CACV,AACD,gCACM,SAAW,CAChB,AACD,wBACI,WAAY,AACZ,kBAAmB,AACnB,UAAW,AACX,YAAa,AACb,OAAQ,AACR,iBAAmB,CACtB,AACD,0BACM,qBAAsB,AACtB,YAAa,AACb,WAAY,AACZ,aAAc,AACd,gBAAiB,AACjB,2BAA6B,AAC7B,kBAAqB,CAC1B,AACD,gCACQ,kBAAoB,CAC3B,AACD,gCACQ,mBAAqB,CAC5B,AACD,4DAEI,gCAAiC,AACjC,uBAAyB,CAC5B,AACD,iDAEI,SAAW,CACd",file:"banner.vue",sourcesContent:["\n.qy-banner {\n  overflow: hidden;\n  position: relative;\n  text-align: center;\n  margin: 0 auto;\n  background: #000;\n}\n.qy-banner a {\n    height: 100%;\n    display: block;\n    width: 100%;\n}\n.qy-banner .opacity-item {\n    position: absolute;\n    left: 0;\n    top: 0;\n}\n.qy-banner .opacity-item.active {\n      z-index: 1;\n}\n.qy-banner .banner-page {\n    width: 100%;\n    text-align: center;\n    z-index: 2;\n    bottom: 55px;\n    left: 0;\n    position: absolute;\n}\n.qy-banner .banner-page > * {\n      display: inline-block;\n      height: 20px;\n      width: 20px;\n      margin: 0 5px;\n      background: #fff;\n      -webkit-transition: all 0.3s;\n      transition: all 0.3s;\n}\n.qy-banner .banner-page > *.active {\n        background: #041238;\n}\n.qy-banner .banner-page > *.circle {\n        border-radius: 100em;\n}\n.qy-banner .fade-enter-active,\n  .qy-banner .fade-leave-active {\n    -webkit-transition: opacity 1.5s;\n    transition: opacity 1.5s;\n}\n.qy-banner .fade-enter,\n  .qy-banner .fade-leave-to {\n    opacity: 0;\n}\n"],sourceRoot:""}])},function(e,t){e.exports=function(e){var t=[];t.toString=function t(){return this.map(function(t){var r=n(t,e);if(t[2]){return"@media "+t[2]+"{"+r+"}"}else{return r}}).join("")};t.i=function(e,n){if(typeof e==="string")e=[[null,e,""]];var r={};for(var a=0;a<this.length;a++){var i=this[a][0];if(typeof i==="number")r[i]=true}for(a=0;a<e.length;a++){var o=e[a];if(typeof o[0]!=="number"||!r[o[0]]){if(n&&!o[2]){o[2]=n}else if(n){o[2]="("+o[2]+") and ("+n+")"}t.push(o)}}};return t};function n(e,t){var n=e[1]||"";var a=e[3];if(!a){return n}if(t&&typeof btoa==="function"){var i=r(a);var o=a.sources.map(function(e){return"/*# sourceURL="+a.sourceRoot+e+" */"});return[n].concat(o).concat([i]).join("\n")}return[n].join("\n")}function r(e){var t=btoa(unescape(encodeURIComponent(JSON.stringify(e))));var n="sourceMappingURL=data:application/json;charset=utf-8;base64,"+t;return"/*# "+n+" */"}},function(e,t,n){var r=typeof document!=="undefined";if(typeof DEBUG!=="undefined"&&DEBUG){if(!r){throw new Error("vue-style-loader cannot be used in a non-browser environment. "+"Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.")}}var a=n(5);var i={};var o=r&&(document.head||document.getElementsByTagName("head")[0]);var s=null;var c=0;var f=false;var l=function(){};var u=null;var d="data-vue-ssr-id";var v=typeof navigator!=="undefined"&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());e.exports=function(e,t,n,r){f=n;u=r||{};var o=a(e,t);p(o);return function t(n){var r=[];for(var s=0;s<o.length;s++){var c=o[s];var f=i[c.id];f.refs--;r.push(f)}if(n){o=a(e,n);p(o)}else{o=[]}for(var s=0;s<r.length;s++){var f=r[s];if(f.refs===0){for(var l=0;l<f.parts.length;l++){f.parts[l]()}delete i[f.id]}}}};function p(e){for(var t=0;t<e.length;t++){var n=e[t];var r=i[n.id];if(r){r.refs++;for(var a=0;a<r.parts.length;a++){r.parts[a](n.parts[a])}for(;a<n.parts.length;a++){r.parts.push(h(n.parts[a]))}if(r.parts.length>n.parts.length){r.parts.length=n.parts.length}}else{var o=[];for(var a=0;a<n.parts.length;a++){o.push(h(n.parts[a]))}i[n.id]={id:n.id,refs:1,parts:o}}}}function A(){var e=document.createElement("style");e.type="text/css";o.appendChild(e);return e}function h(e){var t,n;var r=document.querySelector("style["+d+'~="'+e.id+'"]');if(r){if(f){return l}else{r.parentNode.removeChild(r)}}if(v){var a=c++;r=s||(s=A());t=C.bind(null,r,a,false);n=C.bind(null,r,a,true)}else{r=A();t=y.bind(null,r);n=function(){r.parentNode.removeChild(r)}}t(e);return function r(a){if(a){if(a.css===e.css&&a.media===e.media&&a.sourceMap===e.sourceMap){return}t(e=a)}else{n()}}}var g=function(){var e=[];return function(t,n){e[t]=n;return e.filter(Boolean).join("\n")}}();function C(e,t,n,r){var a=n?"":r.css;if(e.styleSheet){e.styleSheet.cssText=g(t,a)}else{var i=document.createTextNode(a);var o=e.childNodes;if(o[t])e.removeChild(o[t]);if(o.length){e.insertBefore(i,o[t])}else{e.appendChild(i)}}}function y(e,t){var n=t.css;var r=t.media;var a=t.sourceMap;if(r){e.setAttribute("media",r)}if(u.ssrId){e.setAttribute(d,t.id)}if(a){n+="\n/*# sourceURL="+a.sources[0]+" */";n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"}if(e.styleSheet){e.styleSheet.cssText=n}else{while(e.firstChild){e.removeChild(e.firstChild)}e.appendChild(document.createTextNode(n))}}},function(e,t){e.exports=function e(t,n){var r=[];var a={};for(var i=0;i<n.length;i++){var o=n[i];var s=o[0];var c=o[1];var f=o[2];var l=o[3];var u={id:t+":"+i,css:c,media:f,sourceMap:l};if(!a[s]){r.push(a[s]={id:s,parts:[u]})}else{a[s].parts.push(u)}}return r}},function(e,t){e.exports=function e(t,n,r,a,i,o){var s;var c=t=t||{};var f=typeof t.default;if(f==="object"||f==="function"){s=t;c=t.default}var l=typeof c==="function"?c.options:c;if(n){l.render=n.render;l.staticRenderFns=n.staticRenderFns;l._compiled=true}if(r){l.functional=true}if(i){l._scopeId=i}var u;if(o){u=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext;if(!e&&typeof __VUE_SSR_CONTEXT__!=="undefined"){e=__VUE_SSR_CONTEXT__}if(a){a.call(this,e)}if(e&&e._registeredComponents){e._registeredComponents.add(o)}};l._ssrRegister=u}else if(a){u=a}if(u){var d=l.functional;var v=d?l.render:l.beforeCreate;if(!d){l.beforeCreate=v?[].concat(v,u):[u]}else{l._injectStyles=u;l.render=function e(t,n){u.call(n);return v(t,n)}}}return{esModule:s,exports:c,options:l}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true});t["default"]={data:function e(){return{config:{height:"370",interval:5e3,dotColor:"#EEE",dotColorActive:"#041238",dotWidth:"20",dotHeight:"20",dotStyle:"circle"},myData:[{showUrl:"https://support.sjltech.cn/WEB/banner/2019/01/gifts1.jpg",hyperlinkUrl:"https:www.google.com"}],active:0,id:0}},methods:{next:function e(){this.active=(this.active+1)%this.myData.length},prev:function e(){if(this.active==0){this.active=this.myData.length-1}else{this.active--}},startAnimation:function e(){var t=this;this.id=window.setInterval(function(){t.next()},this.config.interval||4e3)},getData:function e(){var t=this;if(!this.categoryId){return}window.service.get("/json/categories/"+this.categoryId+".json").then(function(e){t.myData=[];e.data.forEach(function(e){t.myData.push({showUrl:"http://localhost:3000"+e.thumbnail.src||"",hyperlinkUrl:e.extensions.href||"",abstract:e.abstract||""})})}).catch(function(e){})},getConfig:function e(){var t=this;console.log("getConfig");window.service.get("/json/contents/"+this.dataId+".json").then(function(e){t.config.height=e.data.extensions.height;t.config.interval=e.data.extensions.interval;t.config.dotColor=e.data.extensions.dotColor;t.config.dotColorActive=e.data.extensions.dotColorActive;t.config.dotWidth=e.data.extensions.dotWidth;t.config.dotHeight=e.data.extensions.dotHeight;t.config.dotStyle=e.data.extensions.dotStyle;t.startAnimation()}).catch(function(e){t.startAnimation()})}},beforeDestroy:function e(){window.clearInterval(this.id)},mounted:function e(){this.getConfig();this.getData()},props:["categoryId","dataId"]}},function(e,t){var n=function(){var e=this;var t=e.$createElement;var n=e._self._c||t;return n("div",{staticClass:"banner qy-banner",style:{height:e.config.height+"px"}},[n("transition-group",{attrs:{name:"fade"}},e._l(e.myData,function(t,r){return n("a",{directives:[{name:"show",rawName:"v-show",value:e.active==r,expression:"active==i"}],key:r,ref:"i",refInFor:true,class:["opacity-item",{active:e.active==r}],style:{background:"url("+t.showUrl+") no-repeat center"},attrs:{target:"_blank",href:t.hyperlinkUrl}})}),0),e._v(" "),e.myData.length>1?n("div",{staticClass:"banner-page"},e._l(e.myData,function(t,r){return n("a",{key:r,class:[{active:e.active==r},e.config.dotStyle],style:{background:e.active==r?e.config.dotColorActive:e.config.dotColor,width:e.config.dotWidth+"px",height:e.config.dotHeight+"px"},attrs:{href:"javascript:void(0);"},on:{click:function(t){e.active=r}}})}),0):e._e()],1)};var r=[];e.exports={render:n,staticRenderFns:r}}]);