(function(t){function e(e){for(var s,a,u=e[0],o=e[1],c=e[2],h=0,d=[];h<u.length;h++)a=u[h],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&d.push(r[a][0]),r[a]=0;for(s in o)Object.prototype.hasOwnProperty.call(o,s)&&(t[s]=o[s]);l&&l(e);while(d.length)d.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],s=!0,u=1;u<n.length;u++){var o=n[u];0!==r[o]&&(s=!1)}s&&(i.splice(e--,1),t=a(a.s=n[0]))}return t}var s={},r={0:0},i=[];function a(e){if(s[e])return s[e].exports;var n=s[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=s,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var s in t)a.d(n,s,function(e){return t[e]}.bind(null,s));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/";var u=window["webpackJsonp"]=window["webpackJsonp"]||[],o=u.push.bind(u);u.push=e,u=u.slice();for(var c=0;c<u.length;c++)e(u[c]);var l=o;i.push([0,1]),n()})({0:function(t,e,n){t.exports=n("Vtdi")},EwFT:function(t,e,n){},Vtdi:function(t,e,n){"use strict";n.r(e);n("VRzm");var s=n("Kw5r"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"container mt-4"},[n("autocurl",{attrs:{m3u8:t.m3u8}}),n("autocurl",{attrs:{m3u8:t.m3u8_2}})],1)])},i=[],a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"watcher card mb-2 bg-light"},[n("div",{staticClass:"card-header bg-light"},[n("div",{staticClass:"input-group"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.m3u8,expression:"m3u8"}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.m3u8},on:{input:function(e){e.target.composing||(t.m3u8=e.target.value)}}}),n("div",{staticClass:"input-group-append"},[n("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:function(e){t.refreshAutocurl()}}},[t._v(t._s(t.curlbuttontext))])])])]),n("div",{staticClass:"card-body p-0"},[n("ul",{staticClass:"list-group list-group-flush"},[n("li",{staticClass:"list-group-item"},[n("span",{staticClass:"badge badge-pill badge-success mr-1 p-2"},[t._v(t._s(t.status)+" "+t._s(t.statusText))]),n("span",{staticClass:"badge badge-pill badge-light mr-1 p-2"},[t._v("Renditions: "+t._s(t.renditions.length))]),n("span",{staticClass:"badge badge-pill badge-light mr-1 p-2"},[t._v("First: "+t._s(t.renditions[0].first)+".ts")]),n("span",{staticClass:"badge badge-pill badge-light mr-1 p-2"},[t._v("Last: "+t._s(t.renditions[0].last)+".ts")]),n("span",{staticClass:"badge badge-pill badge-light mr-1 p-2"},[t._v("Segments: "+t._s(t.renditions[0].count))])]),n("li",{staticClass:"list-group-item"},t._l(t.checks,function(e,s,r){return n("button",{key:r,staticClass:"btn mr-1",class:[e.value?"btn-success":"btn-danger"],attrs:{disabled:""}},[n("span",{staticClass:"mr-2"},[t._v(t._s(e.name))]),n("span",{staticClass:"badge badge-light mr-1"},[t._v(t._s(e.value?"OK":"NOT OK"))])])}))])]),n("div",{staticClass:"card-footer"},[n("span",{staticClass:"badge badge-pill badge-secondary mr-1 p-2"},[t._v("Time : "+t._s(t.processTime)+" ms")])])])},u=[],o=(n("SRfc"),n("Z2Ku"),n("L9s1"),n("KKXr"),n("f3/d"),n("vDqi")),c=n("cfFl"),l=n("CxY0"),h=n("LvDl"),d=n("Ec79"),f=function(t){console.log("AUTOCURL DEBUG: "+t)},p=function(t){var e="string"==typeof t&&""!=t?l.parse(t):l.parse(""),n={manifestUrl:e,debug:!0,keepErrors:!1,name:"",status:0,statusText:"",data:"",processTime:0,timestamp:0,isMaster:"notset",setManifestUrl:m,setName:g,setDebug:b,setErrorKeeping:v,renditions:[],errors:[],newError:j,checks:{firstChunk:{value:!1,name:"First Chunks"},lastChunk:{value:!1,name:"Last Chunks"},chunkOrder:{value:!1,name:"Sequence"},chunkCount:{value:!1,name:"Equal Count"}},refreshData:k,checkFirstChunks:y,checkLastChunks:O,checkChunkOrder:E,checkChunkCount:M};return n};function m(t){var e="string"===typeof t&&""!=t?l.parse(t):this.manifestUrl;return this.manifestUrl=e,this}function g(t){return this.name="string"===typeof t?t:this.name,this}function b(t){return this.debug="boolean"===typeof t?t:this.debug,this}function v(t){return this.keepErrors="boolean"===typeof t?t:this.keepErrors,this}function k(){var t=this;if(""!=this.manifestUrl)return this.debug&&f("refreshData() started."),new d(function(e){t.keepErrors||(t.errors=[]),t.processTime=h.now(),C(t).then(w).then(T).then(_).then(x).then(function(n){n.debug&&f("Prerequisities done"),c.parallel([function(t){n.checkFirstChunks(),t(null)},function(t){n.checkLastChunks(),t(null)},function(t){n.checkChunkOrder(),t(null)},function(t){n.checkChunkCount(),t(null)}],function(){t.processTime=h.now()-t.processTime,t.timestamp=(new Date).toLocaleTimeString(),t.debug&&f("refreshData() end."),e(n)})})})}function C(t){return new d(function(e){o.get(t.manifestUrl.href).then(function(n){return t.data=n.data,t.status=n.status,t.statusText=n.statusText,e(t)}).catch(function(n){return n.response?(t.data=n.response.data,t.status=n.response.status,t.statusText=n.response.statusText):n.request?(t.data="",t.status=0,t.statusText=""):(t.data="",t.status=0,t.statusText=n.message),t.debug&&f("curl done."),e(t)})})}function w(t){return new d(function(e){return"notset"===t.isMaster&&(t.isMaster=!!N(t.data)),t.debug&&f("analyze type done."),e(t)})}function T(t){return new d(function(e){return t.isMaster?(t.renditions=t.data.split("\n").filter(function(t){return"#"!==t[0]}).filter(function(t){return h.includes(t,"m3u8")}),t.renditions=t.renditions.map(function(t,e){return new P(t,e)}),t.debug&&f("set renditions done."),e(t)):(t.renditions=[new P(t.manifestUrl.href,0)],t.debug&&f("set renditions done."),e(t))})}function _(t){return new d(function(e){c.map(t.renditions,function(t,e){o.get(t.url).then(function(n){t.data=n.data,t.status=n.status,e(null,t)}).catch(function(n){n.response?(t.data=n.response.data,t.status=n.response.status):(n.request,t.data="",t.status=0),e(null,t)})},function(){return t.debug&&f("curl renditions done."),e(t)})})}function x(t){return new d(function(e){t.renditions.map(function(t){t.chunks=t.data.split("\n").filter(function(t){return"#"!==t[0]&&""!==t}),t.count=t.chunks.length,t.first=0,t.last=0}),t.debug&&f("clean renditions done"),e(t)})}function y(t){var e=/\d*(?=.ts)/g;h.each(this.renditions,function(t){t.first=h.head(t.chunks).match(e)[0]});var n=!!this.renditions.reduce(function(t,e){return t.first==e.first?t:NaN});return this.checks.firstChunk.value=!!n,!n&&this.newError("At least 1 rendition has a different first chunk than all others."),this.debug&&f("check first chunks done."),t?t(null):this}function O(t){var e=/\d*(?=.ts)/g;h.each(this.renditions,function(t){t.last=h.last(t.chunks).match(e)[0]});var n=!!this.renditions.reduce(function(t,e){return t.last==e.last?t:NaN});return this.checks.lastChunk.value=!!n,!n&&this.newError("At least 1 rendition has a different last chunk than all others."),this.debug&&f("check last chunks done."),t?t(null):this}function E(t){var e=/\d*(?=.ts)/g,n=[];this.checks.chunkOrder.value=!0,h.each(this.renditions,function(t,s){var r=t.chunks.map(function(t){return t.match(e)[0]}),i=[1,-999,-1999,-2999,-3999],a=!!r.reduce(function(t,e){return!0===h.includes(i,e-t)?e:NaN});n.push({program:s,chunksInOrder:a})});for(var s=0;s<n.length;s++)n[s].chunksInOrder||(this.checks.chunkOrder.value=!1,this.newError("Program ["+n[s].program+"] has an error in sequence."));return this.debug&&f("check chunk order done."),t?t(null):this}function M(t){var e=!!this.renditions.reduce(function(t,e){return t.count==e.count?t:NaN});return this.checks.chunkCount.value=!!e,!e&&this.newError("At least 1 rendition has a different amount of chunks than all others."),this.debug&&f("check chunk count done."),t?t(null):this}function N(t){var e=t.split("\n").filter(function(t){return"#"!==t[0]}).map(function(t){var e=t.split(".");return e[e.length-1]});return"m3u8"===e[0]}function P(t,e){this.url=t,this.program=e,this.chunks=[],this.status=0,this.data="",this.count=0,this.first=0,this.last=0}function j(t){this.errors.push(new D(t))}function D(t){this.msg=t,this.timestamp=h.now()}var L={props:["m3u8"],data:function(){return{status:0,statusText:"",isMaster:!0,renditions:[{first:0,last:0,count:0,chunks:[],program:0}],checks:{firstChunk:!1,lastChunk:!1,chunkOrder:!1,chunkCount:!1},processTime:0,timestamp:0,curlbuttontext:"Loading",duration:0}},created:function(){var t=this,e=p(this.m3u8);e.refreshData().then(function(e){t.status=e.status,t.statusText=e.statusText,t.isMaster=e.isMaster,t.renditions=e.renditions,t.checks=e.checks,t.processTime=e.processTime,t.timestamp=e.timestamp,t.curlbuttontext="Curl"})},methods:{refreshAutocurl:function(){var t=this;this.curlbuttontext="Loading";var e=p(this.m3u8);e.refreshData().then(function(e){t.status=e.status,t.statusText=e.statusText,t.isMaster=e.isMaster,t.renditions=e.renditions,t.checks=e.checks,t.processTime=e.processTime,t.timestamp=e.timestamp,t.curlbuttontext="Curl"})}}},U=L,S=(n("fB8e"),n("KHd+")),K=Object(S["a"])(U,a,u,!1,null,null,null),q=K.exports,A={name:"app",data:function(){return{m3u8:"https://rbmn-live.akamaized.net/hls/live/590971/180712Goodwood1Pri/master.m3u8",m3u8_2:"https://liveredbulltv02-i.akamaihd.net/hls/live/573017/171014IronmanPri/master.m3u8"}},components:{Autocurl:q}},F=A,R=(n("nNx0"),Object(S["a"])(F,r,i,!1,null,null,null)),z=R.exports;s["a"].config.productionTip=!1,new s["a"]({render:function(t){return t(z)}}).$mount("#app")},boi5:function(t,e,n){},fB8e:function(t,e,n){"use strict";var s=n("EwFT"),r=n.n(s);r.a},nNx0:function(t,e,n){"use strict";var s=n("boi5"),r=n.n(s);r.a}});
//# sourceMappingURL=app.5f04e631.js.map