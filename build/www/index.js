(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function applyHook(o,p,n,a,c,f){o.forEach(function(o){o(p,n,a,c,f)})}module.exports=applyHook;

},{}],2:[function(require,module,exports){
function dispatcher(t){function n(t){t.onStateChange&&s.push(t.onStateChange),t.onError&&u.push(wrapOnError(t.onError)),t.onAction&&c.push(t.onAction),t.wrapSubscriptions&&a.push(t.wrapSubscriptions),t.wrapInitialState&&i.push(t.wrapInitialState),t.wrapReducers&&f.push(t.wrapReducers),t.wrapEffects&&p.push(t.wrapEffects)}function e(t){b.push(t)}function o(t){t=t||{};const n=t.state;if(!t.state&&t.freeze===!1)return xtend(x);if(!t.state)return Object.freeze(xtend(x));const e=[],o={};b.forEach(function(t){const r=t.namespace;e.push(r);const s=t.state||{};r?(o[r]=o[r]||{},apply(r,s,o),o[r]=xtend(o[r],n[r])):mutate(o,s)}),Object.keys(n).forEach(function(t){e.indexOf(t)===-1&&(o[t]=n[t])});const r=xtend(x,xtend(n,o)),s=wrapHook(r,i);return t.freeze===!1?s:Object.freeze(s)}function r(t){function n(t,n){return function(o,r,s){function c(t){t=t||null,t&&applyHook(u,t,x,function(t){return function(n,o){o="undefined"==typeof o?null:o,e(n,o,t,a)}})}s||n||(s=r,r=null),r="undefined"==typeof r?null:r;const a=n?c:s;e(o,r,t,a)}}function e(t,e,o,r){setTimeout(function(){var u=!1,a=!1;const i=xtend(x);c.length&&applyHook(c,e,x,t,o,n);var f=t;if(/:/.test(t)){const p=t.split(":");var l=p.shift();f=p.join(":")}const d=l?E[l]:E;if(d&&d[f]){if(l){const h=d[f](e,x[l]);i[l]=xtend(x[l],h)}else mutate(i,E[f](e,x));u=!0,s.length&&applyHook(s,e,i,x,f,n),x=i,r(null,i)}const w=l?k[l]:k;if(!u&&w&&w[f]){const y=n("effect: "+t);l?w[f](e,x[l],y,r):w[f](e,x,y,r),a=!0}if(!u&&!a)throw new Error("Could not find action "+f)},0)}return t=t||{},b.forEach(function(e){const o=e.namespace;if(!h&&e.state&&t.state!==!1){const r=e.state||{};o?(x[o]=x[o]||{},apply(o,r,x)):mutate(x,r)}!l&&e.reducers&&t.reducers!==!1&&apply(o,e.reducers,E,function(t){return wrapHook(t,f)}),!d&&e.effects&&t.effects!==!1&&apply(o,e.effects,k,function(t){return wrapHook(t,p)}),!w&&e.subscriptions&&t.subscriptions!==!1&&apply(o,e.subscriptions,y,function(t,e){const r=n("subscription: "+(o?o+":"+e:e));return t=wrapHook(t,a),t(r,function(t){applyHook(u,t,x,n)}),t})}),h||t.state===!1||(x=wrapHook(x,i)),t.noSubscriptions||(w=!0),t.noReducers||(l=!0),t.noEffects||(d=!0),t.noState||(h=!0),u.length||u.push(wrapOnError(defaultOnError)),n}t=t||{};const s=[],c=[],u=[],a=[],i=[],f=[],p=[];n(t);var l=!1,d=!1,h=!1,w=!1;const y=r._subscriptions={},E=r._reducers={},k=r._effects={},b=r._models=[];var x={};return r.model=e,r.state=o,r.start=r,r.use=n,r}function apply(t,n,e,o){t&&!e[t]&&(e[t]={}),Object.keys(n).forEach(function(r){const s=o?o(n[r],r):n[r];t?e[t][r]=s:e[r]=s})}function defaultOnError(t){throw t}function wrapOnError(t){return function(n,e,o){n&&t(n,e,o)}}function wrapHook(t,n){return n.forEach(function(n){t=n(t)}),t}const mutate=require(44),xtend=require(43),applyHook=require(1);module.exports=dispatcher;

},{"1":1,"43":43,"44":44}],3:[function(require,module,exports){
function belCreateElement(e,t,a){function n(e){if(Array.isArray(e))for(var t=0;t<e.length;t++){var a=e[t];if(Array.isArray(a))n(a);else{if(("number"==typeof a||"boolean"==typeof a||a instanceof Date||a instanceof RegExp)&&(a=a.toString()),"string"==typeof a){if(o.lastChild&&"#text"===o.lastChild.nodeName){o.lastChild.nodeValue+=a;continue}a=document.createTextNode(a)}a&&a.nodeType&&o.appendChild(a)}}}var o;SVG_TAGS.indexOf(e)!==-1&&(t.namespace=SVGNS);var l=!1;if(t.namespace&&(l=t.namespace,delete t.namespace),o=l?document.createElementNS(l,e):document.createElement(e),t.onload||t.onunload){var r=t.onload||function(){},i=t.onunload||function(){};onload(o,function(){r(o)},function(){i(o)},belCreateElement.caller.caller.caller),delete t.onload,delete t.onunload}for(var f in t)if(t.hasOwnProperty(f)){var c=f.toLowerCase(),s=t[f];if("classname"===c&&(c="class",f="class"),"htmlFor"===f&&(f="for"),BOOL_PROPS[c])if("true"===s)s=c;else if("false"===s)continue;"on"===c.slice(0,2)?o[f]=s:l?"xlink:href"===f?o.setAttributeNS(XLINKNS,f,s):o.setAttributeNS(null,f,s):o.setAttribute(f,s)}return n(a),o}var document=require(16),hyperx=require(20),onload=require(27),SVGNS="http://www.w3.org/2000/svg",XLINKNS="http://www.w3.org/1999/xlink",BOOL_PROPS={autofocus:1,checked:1,defaultchecked:1,disabled:1,formnovalidate:1,indeterminate:1,readonly:1,required:1,selected:1,willvalidate:1},SVG_TAGS=["svg","altGlyph","altGlyphDef","altGlyphItem","animate","animateColor","animateMotion","animateTransform","circle","clipPath","color-profile","cursor","defs","desc","ellipse","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","filter","font","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignObject","g","glyph","glyphRef","hkern","image","line","linearGradient","marker","mask","metadata","missing-glyph","mpath","path","pattern","polygon","polyline","radialGradient","rect","set","stop","switch","symbol","text","textPath","title","tref","tspan","use","view","vkern"];module.exports=hyperx(belCreateElement),module.exports.createElement=belCreateElement;

},{"16":16,"20":20,"27":27}],4:[function(require,module,exports){

},{}],5:[function(require,module,exports){
function chooLog(){function o(o,e,r,t,l){function i(e,r){console.log("action name:",e),console.log("data:",o)}const c=t.split(":"),p=c[0].trim(),f=c[1].trim(),a=[];colorify("lightGray",renderTime(n)+" ",a),colorify("gray",renderType("action")+" ",a),colorify("gray",renderActionType(p)+" ",a),colorify("default","'"+f+"'",a),colorify("default","->",a),colorify("default","'"+r+"'",a),groupCollapseSupported()?(logGroup(a),i(r,o),console.groupEnd()):(log(a),i(r,o))}function e(o,e,r){function t(o){console.error(o)}const l=[];colorify("lightGray",renderTime(n)+" ",l),colorify("red",renderType("error")+" ",l),colorify("default",o.message+" ",l),groupCollapseSupported()?(logGroup(l),t(o),console.groupEnd()):(log(l),t(o))}function r(o,e,r,t){function l(o,e){console.log("prev ",o),console.log("state",e),c?console.warn("diff ","There is no difference between states"):console.log("diff ",i)}const i=deepDiff(r,e)||[],c=0===i.length,p=function(o){return c?"no diff":1===o.length?"diff":"diffs"}(i),f=[];colorify("lightGray",renderTime(n)+" ",f),colorify(c?"yellow":"gray",renderType("state")+" ",f),colorify("default",(c?"":i.length+" ")+p,f),groupCollapseSupported()?(logGroup(f),l(r,e),console.groupEnd()):(log(f),l(r,e))}const n=Date.now();return{onAction:o,onError:e,onStateChange:r}}function logGroup(o){console.groupCollapsed.apply(console,o)}function log(o){console.log.apply(console,o)}function renderType(o){const e=paddings.type,r=paddings.actionType+e+2;return"state"===o||"error"===o?padRight(padLeft(o,e," "),r," "):padLeft(o,e," ")}function renderActionType(o){const e=paddings.actionType;return"subscription"===o&&(o="subs"),padRight(o,e," ")}function colorify(o,e,r){var n="%c"+e,t="color: "+colors[o]+";";return r?(r[0]||(r[0]=""),r[0]+=" "+n,r[1]||(r[1]=""),"firefox"===browser.name?r[1]+=" "+t:r.push(t),r):r=[n,t]}function renderTime(o){var e=String(Math.round((Date.now()-o)/1e3)%1e4),r="["+padLeft(e,4,"0")+"]";return r}function groupCollapseSupported(){return console.groupCollapsed&&"firefox"!==browser.name}const deepDiff=require(10),padRight=require(29),padLeft=require(28),browser=require(11);module.exports=chooLog;const colors={green:"#2ECC40",red:"#FF4136",blue:"#7FDBFF",lightGray:"#DDDDDD",gray:"#AAAAAA",yellow:"#FFDC00",default:"#293037"},paddings={type:7,actionType:7};

},{"10":10,"11":11,"28":28,"29":29}],6:[function(require,module,exports){
module.exports=require(45);
},{"45":45}],7:[function(require,module,exports){
function choo(t){function e(t,e){function n(){return function(){}}e=e||{},s.start({subscriptions:!1,reducers:!1,effects:!1});const r=s.state({state:e}),o=c(h,l,n),u=o(t,r);return u.outerHTML||u.toString()}function n(t,e){e||"string"==typeof t||(e=t,t=null),e=e||{},s.model(appInit(e));const r=s.start(e);i=n._router=c(h,l,r);const o=s.state({state:{}});if(!t){const u=i(o.location.pathname,o);return f=u,u}onReady(function(){const e=document.querySelector(t),n=i(o.location.pathname,o);f=yo.update(e,n)})}function r(t,e,n,r,o){d||(d=nanoraf(function(t,e){const n=i(t.location.pathname,t,e);f=yo.update(f,n)})),d(e,n)}function o(t,e){h=t,l=e}function u(t){s.model(t)}function a(t){s.use(t)}function c(e,n,r){function o(e){function n(e,n){const o=r("view: "+n,!0);return function(n,r){const a=u,c=u=xtend(r,{params:n});return t.freeze!==!1&&Object.freeze(c),e(c,a,o)}}return function(t,r,o){return"function"==typeof r&&(r=n(r,t)),e(t,r,o)}}var u={params:{}};return sheetRouter(e,n,o)}t=t||{};const s=n._store=barracks();var i=n._router=null,h=null,f=null,l=null,d=null;return s.use({onStateChange:r}),s.use(t),n.toString=e,n.router=o,n.model=u,n.start=n,n.use=a,n}function appInit(t){function e(t,e,n){n[e]=function(e,n){t(function(t){e("location:setLocation",{location:t},n)})}}const n=document.location,r={pathname:t.hash?hashMatch(n.hash):n.href},o={setLocation:function(t,e){return{pathname:t.location.replace(/#.*/,"")}}},u={};return t.hash===!0?e(function(t){hash(function(e){t(hashMatch(e))})},"handleHash",u):(t.history!==!1&&e(history,"handleHistory",u),t.href!==!1&&e(href,"handleHref",u)),{namespace:"location",subscriptions:u,reducers:o,state:r}}const history=require(34),sheetRouter=require(36),document=require(16),onReady=require(13),href=require(35),hash=require(33),hashMatch=require(18),barracks=require(2),nanoraf=require(26),xtend=require(43),yo=require(45);module.exports=choo;
},{"13":13,"16":16,"18":18,"2":2,"26":26,"33":33,"34":34,"35":35,"36":36,"43":43,"45":45}],8:[function(require,module,exports){
!function(){"use strict";function e(){for(var r=[],o=0;o<arguments.length;o++){var f=arguments[o];if(f){var i=typeof f;if("string"===i||"number"===i)r.push(f);else if(Array.isArray(f))r.push(e.apply(null,f));else if("object"===i)for(var t in f)n.call(f,t)&&f[t]&&r.push(t)}}return r.join(" ")}var n={}.hasOwnProperty;"undefined"!=typeof module&&module.exports?module.exports=e:"function"==typeof define&&"object"==typeof define.amd&&define.amd?define("classnames",[],function(){return e}):window.classNames=e}();

},{}],9:[function(require,module,exports){
var matches=require(24);module.exports=function(e,r,t){for(var o=t?e:e.parentNode;o&&o!==document;){if(matches(o,r))return o;o=o.parentNode}};
},{"24":24}],10:[function(require,module,exports){
(function (global){
!function(e,t){"use strict";"function"==typeof define&&define.amd?define([],function(){return t()}):"object"==typeof exports?module.exports=t():e.DeepDiff=t()}(this,function(e){"use strict";function t(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}function n(e,t){Object.defineProperty(this,"kind",{value:e,enumerable:!0}),t&&t.length&&Object.defineProperty(this,"path",{value:t,enumerable:!0})}function a(e,t,n){a.super_.call(this,"E",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0}),Object.defineProperty(this,"rhs",{value:n,enumerable:!0})}function r(e,t){r.super_.call(this,"N",e),Object.defineProperty(this,"rhs",{value:t,enumerable:!0})}function i(e,t){i.super_.call(this,"D",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0})}function f(e,t,n){f.super_.call(this,"A",e),Object.defineProperty(this,"index",{value:t,enumerable:!0}),Object.defineProperty(this,"item",{value:n,enumerable:!0})}function l(e,t,n){var a=e.slice((n||t)+1||e.length);return e.length=t<0?e.length+t:t,e.push.apply(e,a),e}function o(e){var t=typeof e;return"object"!==t?t:e===Math?"math":null===e?"null":Array.isArray(e)?"array":"[object Date]"===Object.prototype.toString.call(e)?"date":"undefined"!=typeof e.toString&&/^\/.*\//.test(e.toString())?"regexp":"object"}function u(t,n,c,p,h,s,b){h=h||[];var d=h.slice(0);if("undefined"!=typeof s){if(p){if("function"==typeof p&&p(d,s))return;if("object"==typeof p){if(p.prefilter&&p.prefilter(d,s))return;if(p.normalize){var y=p.normalize(d,s,t,n);y&&(t=y[0],n=y[1])}}}d.push(s)}"regexp"===o(t)&&"regexp"===o(n)&&(t=t.toString(),n=n.toString());var g=typeof t,v=typeof n;if("undefined"===g)"undefined"!==v&&c(new r(d,n));else if("undefined"===v)c(new i(d,t));else if(o(t)!==o(n))c(new a(d,t,n));else if("[object Date]"===Object.prototype.toString.call(t)&&"[object Date]"===Object.prototype.toString.call(n)&&t-n!==0)c(new a(d,t,n));else if("object"===g&&null!==t&&null!==n){if(b=b||[],b.indexOf(t)<0){if(b.push(t),Array.isArray(t)){var m;t.length;for(m=0;m<t.length;m++)m>=n.length?c(new f(d,m,new i(e,t[m]))):u(t[m],n[m],c,p,d,m,b);for(;m<n.length;)c(new f(d,m,new r(e,n[m++])))}else{var k=Object.keys(t),j=Object.keys(n);k.forEach(function(a,r){var i=j.indexOf(a);i>=0?(u(t[a],n[a],c,p,d,a,b),j=l(j,i)):u(t[a],e,c,p,d,a,b)}),j.forEach(function(t){u(e,n[t],c,p,d,t,b)})}b.length=b.length-1}}else t!==n&&("number"===g&&isNaN(t)&&isNaN(n)||c(new a(d,t,n)))}function c(t,n,a,r){return r=r||[],u(t,n,function(e){e&&r.push(e)},a),r.length?r:e}function p(e,t,n){if(n.path&&n.path.length){var a,r=e[t],i=n.path.length-1;for(a=0;a<i;a++)r=r[n.path[a]];switch(n.kind){case"A":p(r[n.path[a]],n.index,n.item);break;case"D":delete r[n.path[a]];break;case"E":case"N":r[n.path[a]]=n.rhs}}else switch(n.kind){case"A":p(e[t],n.index,n.item);break;case"D":e=l(e,t);break;case"E":case"N":e[t]=n.rhs}return e}function h(e,t,n){if(e&&t&&n&&n.kind){for(var a=e,r=-1,i=n.path?n.path.length-1:0;++r<i;)"undefined"==typeof a[n.path[r]]&&(a[n.path[r]]="number"==typeof n.path[r]?[]:{}),a=a[n.path[r]];switch(n.kind){case"A":p(n.path?a[n.path[r]]:a,n.index,n.item);break;case"D":delete a[n.path[r]];break;case"E":case"N":a[n.path[r]]=n.rhs}}}function s(e,t,n){if(n.path&&n.path.length){var a,r=e[t],i=n.path.length-1;for(a=0;a<i;a++)r=r[n.path[a]];switch(n.kind){case"A":s(r[n.path[a]],n.index,n.item);break;case"D":r[n.path[a]]=n.lhs;break;case"E":r[n.path[a]]=n.lhs;break;case"N":delete r[n.path[a]]}}else switch(n.kind){case"A":s(e[t],n.index,n.item);break;case"D":e[t]=n.lhs;break;case"E":e[t]=n.lhs;break;case"N":e=l(e,t)}return e}function b(e,t,n){if(e&&t&&n&&n.kind){var a,r,i=e;for(r=n.path.length-1,a=0;a<r;a++)"undefined"==typeof i[n.path[a]]&&(i[n.path[a]]={}),i=i[n.path[a]];switch(n.kind){case"A":s(i[n.path[a]],n.index,n.item);break;case"D":i[n.path[a]]=n.lhs;break;case"E":i[n.path[a]]=n.lhs;break;case"N":delete i[n.path[a]]}}}function d(e,t,n){if(e&&t){var a=function(a){n&&!n(e,t,a)||h(e,t,a)};u(e,t,a)}}var y,g,v=[];return y="object"==typeof global&&global?global:"undefined"!=typeof window?window:{},g=y.DeepDiff,g&&v.push(function(){"undefined"!=typeof g&&y.DeepDiff===c&&(y.DeepDiff=g,g=e)}),t(a,n),t(r,n),t(i,n),t(f,n),Object.defineProperties(c,{diff:{value:c,enumerable:!0},observableDiff:{value:u,enumerable:!0},applyDiff:{value:d,enumerable:!0},applyChange:{value:h,enumerable:!0},revertChange:{value:b,enumerable:!0},isConflict:{value:function(){return"undefined"!=typeof g},enumerable:!0},noConflict:{value:function(){return v&&(v.forEach(function(e){e()}),v=null),c},enumerable:!0}}),c});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],11:[function(require,module,exports){
var detectBrowser=require(12);module.exports=detectBrowser(navigator.userAgent);

},{"12":12}],12:[function(require,module,exports){
module.exports=function(e){function r(r){return r.concat(r[1].exec(e))}function i(e){return!!e[2]}var o=[["edge",/Edge\/([0-9\._]+)/],["chrome",/(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],["crios",/CriOS\/([0-9\.]+)(:?\s|$)/],["firefox",/Firefox\/([0-9\.]+)(?:\s|$)/],["opera",/Opera\/([0-9\.]+)(?:\s|$)/],["opera",/OPR\/([0-9\.]+)(:?\s|$)$/],["ie",/Trident\/7\.0.*rv\:([0-9\.]+)\).*Gecko$/],["ie",/MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],["ie",/MSIE\s(7\.0)/],["bb10",/BB10;\sTouch.*Version\/([0-9\.]+)/],["android",/Android\s([0-9\.]+)/],["ios",/iPad.*Version\/([0-9\._]+)/],["ios",/iPhone.*Version\/([0-9\._]+)/],["safari",/Version\/([0-9\._]+).*Safari/]],n=0,s=[];for(n=0;n<o.length;n++)o[n]=r(o[n]),i(o[n])&&s.push(o[n]);for(var a=s[0],t=a&&a[3].split(/[._]/).slice(0,3);t&&t.length<3;)t.push("0");return{name:a&&a[0],version:t&&t.join(".")}};

},{}],13:[function(require,module,exports){
"use strict";function ready(e){var t=document.readyState;return"complete"===t||"interactive"===t?setTimeout(e,0):void document.addEventListener("DOMContentLoaded",function(){e()})}function noop(){}var document=require(16);module.exports=document.addEventListener?ready:noop;
},{"16":16}],14:[function(require,module,exports){
!function(){"use strict";function t(e,o){function i(t,e){return function(){return t.apply(e,arguments)}}var r;if(o=o||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=o.touchBoundary||10,this.layer=e,this.tapDelay=o.tapDelay||200,this.tapTimeout=o.tapTimeout||700,!t.notNeeded(e)){for(var a=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],c=this,s=0,u=a.length;s<u;s++)c[a[s]]=i(c[a[s]],c);n&&(e.addEventListener("mouseover",this.onMouse,!0),e.addEventListener("mousedown",this.onMouse,!0),e.addEventListener("mouseup",this.onMouse,!0)),e.addEventListener("click",this.onClick,!0),e.addEventListener("touchstart",this.onTouchStart,!1),e.addEventListener("touchmove",this.onTouchMove,!1),e.addEventListener("touchend",this.onTouchEnd,!1),e.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(e.removeEventListener=function(t,n,o){var i=Node.prototype.removeEventListener;"click"===t?i.call(e,t,n.hijacked||n,o):i.call(e,t,n,o)},e.addEventListener=function(t,n,o){var i=Node.prototype.addEventListener;"click"===t?i.call(e,t,n.hijacked||(n.hijacked=function(t){t.propagationStopped||n(t)}),o):i.call(e,t,n,o)}),"function"==typeof e.onclick&&(r=e.onclick,e.addEventListener("click",function(t){r(t)},!1),e.onclick=null)}}var e=navigator.userAgent.indexOf("Windows Phone")>=0,n=navigator.userAgent.indexOf("Android")>0&&!e,o=/iP(ad|hone|od)/.test(navigator.userAgent)&&!e,i=o&&/OS 4_\d(_\d)?/.test(navigator.userAgent),r=o&&/OS [6-7]_\d/.test(navigator.userAgent),a=navigator.userAgent.indexOf("BB10")>0;t.prototype.needsClick=function(t){switch(t.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(t.disabled)return!0;break;case"input":if(o&&"file"===t.type||t.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(t.className)},t.prototype.needsFocus=function(t){switch(t.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!n;case"input":switch(t.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!t.disabled&&!t.readOnly;default:return/\bneedsfocus\b/.test(t.className)}},t.prototype.sendClick=function(t,e){var n,o;document.activeElement&&document.activeElement!==t&&document.activeElement.blur(),o=e.changedTouches[0],n=document.createEvent("MouseEvents"),n.initMouseEvent(this.determineEventType(t),!0,!0,window,1,o.screenX,o.screenY,o.clientX,o.clientY,!1,!1,!1,!1,0,null),n.forwardedTouchEvent=!0,t.dispatchEvent(n)},t.prototype.determineEventType=function(t){return n&&"select"===t.tagName.toLowerCase()?"mousedown":"click"},t.prototype.focus=function(t){var e;o&&t.setSelectionRange&&0!==t.type.indexOf("date")&&"time"!==t.type&&"month"!==t.type?(e=t.value.length,t.setSelectionRange(e,e)):t.focus()},t.prototype.updateScrollParent=function(t){var e,n;if(e=t.fastClickScrollParent,!e||!e.contains(t)){n=t;do{if(n.scrollHeight>n.offsetHeight){e=n,t.fastClickScrollParent=n;break}n=n.parentElement}while(n)}e&&(e.fastClickLastScrollTop=e.scrollTop)},t.prototype.getTargetElementFromEventTarget=function(t){return t.nodeType===Node.TEXT_NODE?t.parentNode:t},t.prototype.onTouchStart=function(t){var e,n,r;if(t.targetTouches.length>1)return!0;if(e=this.getTargetElementFromEventTarget(t.target),n=t.targetTouches[0],o){if(r=window.getSelection(),r.rangeCount&&!r.isCollapsed)return!0;if(!i){if(n.identifier&&n.identifier===this.lastTouchIdentifier)return t.preventDefault(),!1;this.lastTouchIdentifier=n.identifier,this.updateScrollParent(e)}}return this.trackingClick=!0,this.trackingClickStart=t.timeStamp,this.targetElement=e,this.touchStartX=n.pageX,this.touchStartY=n.pageY,t.timeStamp-this.lastClickTime<this.tapDelay&&t.preventDefault(),!0},t.prototype.touchHasMoved=function(t){var e=t.changedTouches[0],n=this.touchBoundary;return Math.abs(e.pageX-this.touchStartX)>n||Math.abs(e.pageY-this.touchStartY)>n},t.prototype.onTouchMove=function(t){return!this.trackingClick||((this.targetElement!==this.getTargetElementFromEventTarget(t.target)||this.touchHasMoved(t))&&(this.trackingClick=!1,this.targetElement=null),!0)},t.prototype.findControl=function(t){return void 0!==t.control?t.control:t.htmlFor?document.getElementById(t.htmlFor):t.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},t.prototype.onTouchEnd=function(t){var e,a,c,s,u,l=this.targetElement;if(!this.trackingClick)return!0;if(t.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(t.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=t.timeStamp,a=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,r&&(u=t.changedTouches[0],l=document.elementFromPoint(u.pageX-window.pageXOffset,u.pageY-window.pageYOffset)||l,l.fastClickScrollParent=this.targetElement.fastClickScrollParent),c=l.tagName.toLowerCase(),"label"===c){if(e=this.findControl(l)){if(this.focus(l),n)return!1;l=e}}else if(this.needsFocus(l))return t.timeStamp-a>100||o&&window.top!==window&&"input"===c?(this.targetElement=null,!1):(this.focus(l),this.sendClick(l,t),o&&"select"===c||(this.targetElement=null,t.preventDefault()),!1);return!(!o||i||(s=l.fastClickScrollParent,!s||s.fastClickLastScrollTop===s.scrollTop))||(this.needsClick(l)||(t.preventDefault(),this.sendClick(l,t)),!1)},t.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},t.prototype.onMouse=function(t){return!this.targetElement||(!!t.forwardedTouchEvent||(!t.cancelable||(!(!this.needsClick(this.targetElement)||this.cancelNextClick)||(t.stopImmediatePropagation?t.stopImmediatePropagation():t.propagationStopped=!0,t.stopPropagation(),t.preventDefault(),!1))))},t.prototype.onClick=function(t){var e;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===t.target.type&&0===t.detail||(e=this.onMouse(t),e||(this.targetElement=null),e)},t.prototype.destroy=function(){var t=this.layer;n&&(t.removeEventListener("mouseover",this.onMouse,!0),t.removeEventListener("mousedown",this.onMouse,!0),t.removeEventListener("mouseup",this.onMouse,!0)),t.removeEventListener("click",this.onClick,!0),t.removeEventListener("touchstart",this.onTouchStart,!1),t.removeEventListener("touchmove",this.onTouchMove,!1),t.removeEventListener("touchend",this.onTouchEnd,!1),t.removeEventListener("touchcancel",this.onTouchCancel,!1)},t.notNeeded=function(t){var e,o,i,r;if("undefined"==typeof window.ontouchstart)return!0;if(o=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!n)return!0;if(e=document.querySelector("meta[name=viewport]")){if(e.content.indexOf("user-scalable=no")!==-1)return!0;if(o>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(a&&(i=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),i[1]>=10&&i[2]>=3&&(e=document.querySelector("meta[name=viewport]")))){if(e.content.indexOf("user-scalable=no")!==-1)return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===t.style.msTouchAction||"manipulation"===t.style.touchAction||(r=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],!!(r>=27&&(e=document.querySelector("meta[name=viewport]"),e&&(e.content.indexOf("user-scalable=no")!==-1||document.documentElement.scrollWidth<=window.outerWidth)))||("none"===t.style.touchAction||"manipulation"===t.style.touchAction))},t.attach=function(e,n){return new t(e,n)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define(function(){return t}):"undefined"!=typeof module&&module.exports?(module.exports=t.attach,module.exports.FastClick=t):window.FastClick=t}();

},{}],15:[function(require,module,exports){
function forEach(r,t,o){if(!isFunction(t))throw new TypeError("iterator must be a function");arguments.length<3&&(o=this),"[object Array]"===toString.call(r)?forEachArray(r,t,o):"string"==typeof r?forEachString(r,t,o):forEachObject(r,t,o)}function forEachArray(r,t,o){for(var n=0,a=r.length;n<a;n++)hasOwnProperty.call(r,n)&&t.call(o,r[n],n,r)}function forEachString(r,t,o){for(var n=0,a=r.length;n<a;n++)t.call(o,r.charAt(n),n,r)}function forEachObject(r,t,o){for(var n in r)hasOwnProperty.call(r,n)&&t.call(o,r[n],n,r)}var isFunction=require(21);module.exports=forEach;var toString=Object.prototype.toString,hasOwnProperty=Object.prototype.hasOwnProperty;

},{"21":21}],16:[function(require,module,exports){
(function (global){
var topLevel="undefined"!=typeof global?global:"undefined"!=typeof window?window:{},minDoc=require(4);if("undefined"!=typeof document)module.exports=document;else{var doccy=topLevel["__GLOBAL_DOCUMENT_CACHE@4"];doccy||(doccy=topLevel["__GLOBAL_DOCUMENT_CACHE@4"]=minDoc),module.exports=doccy}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"4":4}],17:[function(require,module,exports){
(function (global){
"undefined"!=typeof window?module.exports=window:"undefined"!=typeof global?module.exports=global:"undefined"!=typeof self?module.exports=self:module.exports={};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],18:[function(require,module,exports){
module.exports=function(e,r){var l=r||"/";return 0===e.length?l:(e=e.replace("#",""),e=e.replace(/\/$/,""),0!=e.indexOf("/")&&(e="/"+e),"/"==l?e:e.replace(l,""))};

},{}],19:[function(require,module,exports){
function attributeToProperty(r){return function(t,o,e){for(var n in o)n in transform&&(o[transform[n]]=o[n],delete o[n]);return r(t,o,e)}}module.exports=attributeToProperty;var transform={class:"className",for:"htmlFor","http-equiv":"httpEquiv"};
},{}],20:[function(require,module,exports){
function quot(T){return T===ATTR_VALUE_SQ||T===ATTR_VALUE_DQ}function has(T,e){return hasOwn.call(T,e)}function selfClosing(T){return closeRE.test(T)}var attrToProp=require(19),VAR=0,TEXT=1,OPEN=2,CLOSE=3,ATTR=4,ATTR_KEY=5,ATTR_KEY_W=6,ATTR_VALUE_W=7,ATTR_VALUE=8,ATTR_VALUE_SQ=9,ATTR_VALUE_DQ=10,ATTR_EQ=11,ATTR_BREAK=12;module.exports=function(T,e){function A(T){return"function"==typeof T?T:"string"==typeof T?T:T&&"object"==typeof T?T:t("",T)}T=attrToProp(T),e||(e={});var t=e.concat||function(T,e){return String(T)+String(e)};return function(e){function r(T){var e=[];R===ATTR_VALUE_W&&(R=ATTR);for(var A=0;A<T.length;A++){var t=T.charAt(A);R===TEXT&&"<"===t?(n.length&&e.push([TEXT,n]),n="",R=OPEN):">"!==t||quot(R)?R===TEXT?n+=t:R===OPEN&&/\s/.test(t)?(e.push([OPEN,n]),n="",R=ATTR):R===OPEN?n+=t:R===ATTR&&/[\w-]/.test(t)?(R=ATTR_KEY,n=t):R===ATTR&&/\s/.test(t)?(n.length&&e.push([ATTR_KEY,n]),e.push([ATTR_BREAK])):R===ATTR_KEY&&/\s/.test(t)?(e.push([ATTR_KEY,n]),n="",R=ATTR_KEY_W):R===ATTR_KEY&&"="===t?(e.push([ATTR_KEY,n],[ATTR_EQ]),n="",R=ATTR_VALUE_W):R===ATTR_KEY?n+=t:R!==ATTR_KEY_W&&R!==ATTR||"="!==t?R!==ATTR_KEY_W&&R!==ATTR||/\s/.test(t)?R===ATTR_VALUE_W&&'"'===t?R=ATTR_VALUE_DQ:R===ATTR_VALUE_W&&"'"===t?R=ATTR_VALUE_SQ:R===ATTR_VALUE_DQ&&'"'===t?(e.push([ATTR_VALUE,n],[ATTR_BREAK]),n="",R=ATTR):R===ATTR_VALUE_SQ&&"'"===t?(e.push([ATTR_VALUE,n],[ATTR_BREAK]),n="",R=ATTR):R!==ATTR_VALUE_W||/\s/.test(t)?R===ATTR_VALUE&&/\s/.test(t)?(e.push([ATTR_VALUE,n],[ATTR_BREAK]),n="",R=ATTR):R!==ATTR_VALUE&&R!==ATTR_VALUE_SQ&&R!==ATTR_VALUE_DQ||(n+=t):(R=ATTR_VALUE,A--):(e.push([ATTR_BREAK]),/[\w-]/.test(t)?(n+=t,R=ATTR_KEY):R=ATTR):(e.push([ATTR_EQ]),R=ATTR_VALUE_W):(R===OPEN?e.push([OPEN,n]):R===ATTR_KEY?e.push([ATTR_KEY,n]):R===ATTR_VALUE&&n.length&&e.push([ATTR_VALUE,n]),e.push([CLOSE]),n="",R=TEXT)}return R===TEXT&&n.length?(e.push([TEXT,n]),n=""):R===ATTR_VALUE&&n.length?(e.push([ATTR_VALUE,n]),n=""):R===ATTR_VALUE_DQ&&n.length?(e.push([ATTR_VALUE,n]),n=""):R===ATTR_VALUE_SQ&&n.length?(e.push([ATTR_VALUE,n]),n=""):R===ATTR_KEY&&(e.push([ATTR_KEY,n]),n=""),e}for(var R=TEXT,n="",E=arguments.length,_=[],s=0;s<e.length;s++)if(s<E-1){var o=arguments[s+1],l=r(e[s]),h=R;h===ATTR_VALUE_DQ&&(h=ATTR_VALUE),h===ATTR_VALUE_SQ&&(h=ATTR_VALUE),h===ATTR_VALUE_W&&(h=ATTR_VALUE),h===ATTR&&(h=ATTR_KEY),l.push([VAR,h,o]),_.push.apply(_,l)}else _.push.apply(_,r(e[s]));for(var i=[null,{},[]],f=[[i,-1]],s=0;s<_.length;s++){var a=f[f.length-1][0],l=_[s],p=l[0];if(p===OPEN&&/^\//.test(l[1])){var u=f[f.length-1][1];f.length>1&&(f.pop(),f[f.length-1][0][2][u]=T(a[0],a[1],a[2].length?a[2]:void 0))}else if(p===OPEN){var g=[l[1],{},[]];a[2].push(g),f.push([g,a[2].length-1])}else if(p===ATTR_KEY||p===VAR&&l[1]===ATTR_KEY){for(var L,V="";s<_.length;s++)if(_[s][0]===ATTR_KEY)V=t(V,_[s][1]);else{if(_[s][0]!==VAR||_[s][1]!==ATTR_KEY)break;if("object"!=typeof _[s][2]||V)V=t(V,_[s][2]);else for(L in _[s][2])_[s][2].hasOwnProperty(L)&&!a[1][L]&&(a[1][L]=_[s][2][L])}_[s][0]===ATTR_EQ&&s++;for(var U=s;s<_.length;s++)if(_[s][0]===ATTR_VALUE||_[s][0]===ATTR_KEY)a[1][V]?a[1][V]=t(a[1][V],_[s][1]):a[1][V]=A(_[s][1]);else{if(_[s][0]!==VAR||_[s][1]!==ATTR_VALUE&&_[s][1]!==ATTR_KEY){!V.length||a[1][V]||s!==U||_[s][0]!==CLOSE&&_[s][0]!==ATTR_BREAK||(a[1][V]=V.toLowerCase());break}a[1][V]?a[1][V]=t(a[1][V],_[s][2]):a[1][V]=A(_[s][2])}}else if(p===ATTR_KEY)a[1][l[1]]=!0;else if(p===VAR&&l[1]===ATTR_KEY)a[1][l[2]]=!0;else if(p===CLOSE){if(selfClosing(a[0])&&f.length){var u=f[f.length-1][1];f.pop(),f[f.length-1][0][2][u]=T(a[0],a[1],a[2].length?a[2]:void 0)}}else if(p===VAR&&l[1]===TEXT)void 0===l[2]||null===l[2]?l[2]="":l[2]||(l[2]=t("",l[2])),Array.isArray(l[2][0])?a[2].push.apply(a[2],l[2]):a[2].push(l[2]);else if(p===TEXT)a[2].push(l[1]);else if(p!==ATTR_EQ&&p!==ATTR_BREAK)throw new Error("unhandled: "+p)}if(i[2].length>1&&/^\s*$/.test(i[2][0])&&i[2].shift(),i[2].length>2||2===i[2].length&&/\S/.test(i[2][1]))throw new Error("multiple root elements must be wrapped in an enclosing tag");return Array.isArray(i[2][0])&&"string"==typeof i[2][0][0]&&Array.isArray(i[2][0][2])&&(i[2][0]=T(i[2][0][0],i[2][0][1],i[2][0][2])),i[2][0]}};var hasOwn=Object.prototype.hasOwnProperty,closeRE=RegExp("^("+["area","base","basefont","bgsound","br","col","command","embed","frame","hr","img","input","isindex","keygen","link","meta","param","source","track","wbr","animate","animateTransform","circle","cursor","desc","ellipse","feBlend","feColorMatrix","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","font-face-format","font-face-name","font-face-uri","glyph","glyphRef","hkern","image","line","missing-glyph","mpath","path","polygon","polyline","rect","set","stop","tref","use","view","vkern"].join("|")+")(?:[.#][a-zA-Z0-9-￿_:-]+)*$");

},{"19":19}],21:[function(require,module,exports){
function isFunction(o){var t=toString.call(o);return"[object Function]"===t||"function"==typeof o&&"[object RegExp]"!==t||"undefined"!=typeof window&&(o===window.setTimeout||o===window.alert||o===window.confirm||o===window.prompt)}module.exports=isFunction;var toString=Object.prototype.toString;

},{}],22:[function(require,module,exports){
module.exports=[
  {
    "id": "aatrox",
    "key": "266",
    "name": "Aatrox",
    "title": "the Darkin Blade",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "stats": {
      "hp": 537.8,
      "hpperlevel": 85,
      "mp": 105.6,
      "mpperlevel": 45,
      "movespeed": 345,
      "armor": 24.384,
      "armorperlevel": 3.8,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 150,
      "hpregen": 6.59,
      "hpregenperlevel": 0.5,
      "mpregen": 0,
      "mpregenperlevel": 0,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 60.376,
      "attackdamageperlevel": 3.2,
      "attackspeedoffset": -0.04,
      "attackspeedperlevel": 3
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Aatrox.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 0,
      "y": 0
    },
    "description": "Aatrox is a legendary warrior, one of only five that remain of an ancient race known as the Darkin. He wields his massive blade with grace and poise, slicing through legions in a style that is hypnotic to behold. With each foe felled, Aatrox's ..."
  },
  {
    "id": "ahri",
    "key": "103",
    "name": "Ahri",
    "title": "the Nine-Tailed Fox",
    "tags": [
      "Mage",
      "Assassin"
    ],
    "stats": {
      "hp": 514.4,
      "hpperlevel": 80,
      "mp": 334,
      "mpperlevel": 50,
      "movespeed": 330,
      "armor": 20.88,
      "armorperlevel": 3.5,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 550,
      "hpregen": 6.505,
      "hpregenperlevel": 0.6,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 53.04,
      "attackdamageperlevel": 3,
      "attackspeedoffset": -0.065,
      "attackspeedperlevel": 2
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Ahri.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 48,
      "y": 0
    },
    "description": "Unlike other foxes that roamed the woods of southern Ionia, Ahri had always felt a strange connection to the magical world around her; a connection that was somehow incomplete. Deep inside, she felt the skin she had been born into was an ill fit for ..."
  },
  {
    "id": "akali",
    "key": "84",
    "name": "Akali",
    "title": "the Fist of Shadow",
    "tags": [
      "Assassin"
    ],
    "stats": {
      "hp": 587.8,
      "hpperlevel": 85,
      "mp": 200,
      "mpperlevel": 0,
      "movespeed": 350,
      "armor": 26.38,
      "armorperlevel": 3.5,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 8.34,
      "hpregenperlevel": 0.65,
      "mpregen": 50,
      "mpregenperlevel": 0,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 58.376,
      "attackdamageperlevel": 3.2,
      "attackspeedoffset": -0.1,
      "attackspeedperlevel": 3.1
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Akali.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 96,
      "y": 0
    },
    "description": "There exists an ancient order originating in the Ionian Isles dedicated to the preservation of balance. Order, chaos, light, darkness -- all things must exist in perfect harmony for such is the way of the universe. This order is known as the Kinkou ..."
  },
  {
    "id": "alistar",
    "key": "12",
    "name": "Alistar",
    "title": "the Minotaur",
    "tags": [
      "Tank",
      "Support"
    ],
    "stats": {
      "hp": 613.36,
      "hpperlevel": 106,
      "mp": 278.84,
      "mpperlevel": 38,
      "movespeed": 330,
      "armor": 24.38,
      "armorperlevel": 3.5,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 8.675,
      "hpregenperlevel": 0.85,
      "mpregen": 8.5,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 61.1116,
      "attackdamageperlevel": 3.62,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2.125
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Alistar.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 144,
      "y": 0
    },
    "description": "As the mightiest warrior to ever emerge from the Minotaur tribes of the Great Barrier, Alistar defended his tribe from Valoran's many dangers; that is, until the coming of the Noxian army. Alistar was lured from his village by the machinations of ..."
  },
  {
    "id": "amumu",
    "key": "32",
    "name": "Amumu",
    "title": "the Sad Mummy",
    "tags": [
      "Tank",
      "Mage"
    ],
    "stats": {
      "hp": 613.12,
      "hpperlevel": 84,
      "mp": 287.2,
      "mpperlevel": 40,
      "movespeed": 335,
      "armor": 23.544,
      "armorperlevel": 3.8,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 8.875,
      "hpregenperlevel": 0.85,
      "mpregen": 7.38,
      "mpregenperlevel": 0.525,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 53.384,
      "attackdamageperlevel": 3.8,
      "attackspeedoffset": -0.02,
      "attackspeedperlevel": 2.18
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Amumu.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 192,
      "y": 0
    },
    "description": "''Solitude can be lonelier than death.''<br><br>A lonely and melancholy soul from ancient Shurima, Amumu roams the world in search of a friend. Cursed by an ancient spell, he is doomed to remain alone forever, as his touch is death and his affection ..."
  },
  {
    "id": "anivia",
    "key": "34",
    "name": "Anivia",
    "title": "the Cryophoenix",
    "tags": [
      "Mage",
      "Support"
    ],
    "stats": {
      "hp": 467.6,
      "hpperlevel": 70,
      "mp": 396.04,
      "mpperlevel": 50,
      "movespeed": 325,
      "armor": 21.22,
      "armorperlevel": 4,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 600,
      "hpregen": 5.57,
      "hpregenperlevel": 0.55,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 51.376,
      "attackdamageperlevel": 3.2,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 1.68
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Anivia.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 240,
      "y": 0
    },
    "description": "Anivia is a being of the coldest winter, a mystical embodiment of ice magic, and an ancient protector of the Freljord. She commands all the power and fury of the land itself, calling the snow and bitter wind to defend her home from those who would ..."
  },
  {
    "id": "annie",
    "key": "1",
    "name": "Annie",
    "title": "the Dark Child",
    "tags": [
      "Mage"
    ],
    "stats": {
      "hp": 511.68,
      "hpperlevel": 76,
      "mp": 334,
      "mpperlevel": 50,
      "movespeed": 335,
      "armor": 19.22,
      "armorperlevel": 4,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 575,
      "hpregen": 5.42,
      "hpregenperlevel": 0.55,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 50.41,
      "attackdamageperlevel": 2.625,
      "attackspeedoffset": 0.08,
      "attackspeedperlevel": 1.36
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Annie.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 288,
      "y": 0
    },
    "description": "There have always been those within Noxus who did not agree with the evils perpetrated by the Noxian High Command. The High Command had just put down a coup attempt from the self-proclaimed Crown Prince Raschallion, and a crackdown on any form of ..."
  },
  {
    "id": "ashe",
    "key": "22",
    "name": "Ashe",
    "title": "the Frost Archer",
    "tags": [
      "Marksman",
      "Support"
    ],
    "stats": {
      "hp": 527.72,
      "hpperlevel": 79,
      "mp": 280,
      "mpperlevel": 32,
      "movespeed": 325,
      "armor": 21.212,
      "armorperlevel": 3.4,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 600,
      "hpregen": 5.42,
      "hpregenperlevel": 0.55,
      "mpregen": 6.97,
      "mpregenperlevel": 0.4,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 56.508,
      "attackdamageperlevel": 2.26,
      "attackspeedoffset": -0.05,
      "attackspeedperlevel": 3.33
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Ashe.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 336,
      "y": 0
    },
    "description": "With each arrow she fires from her ancient ice-enchanted bow, Ashe proves she is a master archer. She chooses each target carefully, waits for the right moment, and then strikes with power and precision. It is with this same vision and focus that she ..."
  },
  {
    "id": "aurelionsol",
    "key": "136",
    "name": "Aurelion Sol",
    "title": "The Star Forger",
    "tags": [
      "Mage",
      "Fighter"
    ],
    "stats": {
      "hp": 550,
      "hpperlevel": 80,
      "mp": 350,
      "mpperlevel": 50,
      "movespeed": 325,
      "armor": 19,
      "armorperlevel": 3.6,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 550,
      "hpregen": 6.5,
      "hpregenperlevel": 0.6,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 57,
      "attackdamageperlevel": 3.2,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 1.36
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/AurelionSol.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 384,
      "y": 0
    },
    "description": "Aurelion Sol once graced the vast emptiness of the cosmos with celestial wonders of his own devising. Now, he is forced to wield his awesome power at the behest of a space-faring empire that tricked him into servitude. Desiring a return to his ..."
  },
  {
    "id": "azir",
    "key": "268",
    "name": "Azir",
    "title": "the Emperor of the Sands",
    "tags": [
      "Mage",
      "Marksman"
    ],
    "stats": {
      "hp": 524.4,
      "hpperlevel": 80,
      "mp": 350.56,
      "mpperlevel": 42,
      "movespeed": 325,
      "armor": 19.04,
      "armorperlevel": 3,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 525,
      "hpregen": 6.92,
      "hpregenperlevel": 0.55,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 52,
      "attackdamageperlevel": 2.8,
      "attackspeedoffset": -0.02,
      "attackspeedperlevel": 1.5
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Azir.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 432,
      "y": 0
    },
    "description": "''Shurima was once the glory of Runeterra. I will make it so again.''<br><br>Azir was a mortal emperor of Shurima in a far distant age, a proud man who stood at the cusp of immortality. His hubris saw him betrayed and murdered at the moment of his ..."
  },
  {
    "id": "bard",
    "key": "432",
    "name": "Bard",
    "title": "the Wandering Caretaker",
    "tags": [
      "Support",
      "Mage"
    ],
    "stats": {
      "hp": 535,
      "hpperlevel": 89,
      "mp": 350,
      "mpperlevel": 50,
      "movespeed": 330,
      "armor": 25,
      "armorperlevel": 4,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 500,
      "hpregen": 5.4,
      "hpregenperlevel": 0.55,
      "mpregen": 6,
      "mpregenperlevel": 0.45,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 52,
      "attackdamageperlevel": 3,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Bard.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 0,
      "y": 48
    },
    "description": "Bard travels through realms beyond the imagination of mortal beings. Some of Valoran's greatest scholars have spent their lives trying to understand the mysteries he embodies. This enigmatic spirit has been given many names throughout the history of ..."
  },
  {
    "id": "blitzcrank",
    "key": "53",
    "name": "Blitzcrank",
    "title": "the Great Steam Golem",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "stats": {
      "hp": 582.6,
      "hpperlevel": 95,
      "mp": 267.2,
      "mpperlevel": 40,
      "movespeed": 325,
      "armor": 24.38,
      "armorperlevel": 4,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 8.51,
      "hpregenperlevel": 0.75,
      "mpregen": 8.5,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 61.54,
      "attackdamageperlevel": 3.5,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 1.13
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Blitzcrank.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 48,
      "y": 48
    },
    "description": "Zaun is a place where both magic and science have gone awry, and the unchecked nature of experimentation has taken its toll. However, Zaun's lenient restrictions allow their researchers and inventors the leeway to push the bounds of science at an ..."
  },
  {
    "id": "brand",
    "key": "63",
    "name": "Brand",
    "title": "the Burning Vengeance",
    "tags": [
      "Mage"
    ],
    "stats": {
      "hp": 507.68,
      "hpperlevel": 76,
      "mp": 375.6,
      "mpperlevel": 42,
      "movespeed": 340,
      "armor": 21.88,
      "armorperlevel": 3.5,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 550,
      "hpregen": 5.42,
      "hpregenperlevel": 0.55,
      "mpregen": 8.005,
      "mpregenperlevel": 0.6,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 57.04,
      "attackdamageperlevel": 3,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 1.36
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Brand.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 96,
      "y": 48
    },
    "description": "In a faraway place known as Lokfar there was a seafaring marauder called Kegan Rodhe. As was his people's way, Kegan sailed far and wide with his fellows, stealing treasures from those unlucky enough to catch their attention. To some, he was a ..."
  },
  {
    "id": "braum",
    "key": "201",
    "name": "Braum",
    "title": "the Heart of the Freljord",
    "tags": [
      "Support",
      "Tank"
    ],
    "stats": {
      "hp": 576.16,
      "hpperlevel": 87,
      "mp": 310.6,
      "mpperlevel": 45,
      "movespeed": 335,
      "armor": 26.72,
      "armorperlevel": 4.5,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 8.18,
      "hpregenperlevel": 1,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 55.376,
      "attackdamageperlevel": 3.2,
      "attackspeedoffset": -0.03,
      "attackspeedperlevel": 3.5
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Braum.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 144,
      "y": 48
    },
    "description": "''Would you like a bedtime story?''<br><br>''Grandma, I'm too old for that.''<br><br>''You're never too old to be told a story.''<br><br>The girl reluctantly crawls into bed and waits, knowing she won't win this battle. A bitter wind howls outside, ..."
  },
  {
    "id": "caitlyn",
    "key": "51",
    "name": "Caitlyn",
    "title": "the Sheriff of Piltover",
    "tags": [
      "Marksman"
    ],
    "stats": {
      "hp": 524.4,
      "hpperlevel": 80,
      "mp": 313.7,
      "mpperlevel": 35,
      "movespeed": 325,
      "armor": 22.88,
      "armorperlevel": 3.5,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 650,
      "hpregen": 5.67,
      "hpregenperlevel": 0.55,
      "mpregen": 7.4,
      "mpregenperlevel": 0.55,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 53.66,
      "attackdamageperlevel": 2.18,
      "attackspeedoffset": 0.1,
      "attackspeedperlevel": 4
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Caitlyn.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 192,
      "y": 48
    },
    "description": "''Go ahead, run. I'll give you a five minute head start.''<br><br>One of the reasons Piltover is known as the City of Progress is because it has an extraordinarily low crime rate. This hasn't always been the case; brigands and thieves of all sorts ..."
  },
  {
    "id": "cassiopeia",
    "key": "69",
    "name": "Cassiopeia",
    "title": "the Serpent's Embrace",
    "tags": [
      "Mage"
    ],
    "stats": {
      "hp": 525,
      "hpperlevel": 75,
      "mp": 375,
      "mpperlevel": 60,
      "movespeed": 328,
      "armor": 25,
      "armorperlevel": 3.5,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 550,
      "hpregen": 5.5,
      "hpregenperlevel": 0.5,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 53,
      "attackdamageperlevel": 3,
      "attackspeedoffset": -0.034,
      "attackspeedperlevel": 1.5
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Cassiopeia.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 240,
      "y": 48
    },
    "description": "Cassiopeia is a terrifying creature - half woman, half snake - whose slightest glance brings death. The youngest daughter of one of Noxus' most influential families, she was once a beautiful and cunning temptress capable of manipulating the hardest ..."
  },
  {
    "id": "chogath",
    "key": "31",
    "name": "Cho'Gath",
    "title": "the Terror of the Void",
    "tags": [
      "Tank",
      "Mage"
    ],
    "stats": {
      "hp": 574.4,
      "hpperlevel": 80,
      "mp": 272.2,
      "mpperlevel": 40,
      "movespeed": 345,
      "armor": 28.88,
      "armorperlevel": 3.5,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 8.925,
      "hpregenperlevel": 0.85,
      "mpregen": 7.205,
      "mpregenperlevel": 0.45,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 61.156,
      "attackdamageperlevel": 4.2,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 1.44
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Chogath.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 288,
      "y": 48
    },
    "description": "There is a place between dimensions, between worlds. To some it is known as the Outside, to others it is the Unknown. To those that truly know, however, it is called the Void. Despite its name, the Void is not an empty place, but rather the home of ..."
  },
  {
    "id": "corki",
    "key": "42",
    "name": "Corki",
    "title": "the Daring Bombardier",
    "tags": [
      "Marksman"
    ],
    "stats": {
      "hp": 512.76,
      "hpperlevel": 82,
      "mp": 350.16,
      "mpperlevel": 34,
      "movespeed": 325,
      "armor": 23.38,
      "armorperlevel": 3.5,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 550,
      "hpregen": 5.42,
      "hpregenperlevel": 0.55,
      "mpregen": 7.42,
      "mpregenperlevel": 0.55,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 56,
      "attackdamageperlevel": 3.5,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2.3
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Corki.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 336,
      "y": 48
    },
    "description": "When Heimerdinger and his yordle colleagues migrated to Piltover, they embraced science as a way of life, and they immediately made several groundbreaking contributions to the techmaturgical community. What yordles lack in stature, they make up for ..."
  },
  {
    "id": "darius",
    "key": "122",
    "name": "Darius",
    "title": "the Hand of Noxus",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "stats": {
      "hp": 582.24,
      "hpperlevel": 100,
      "mp": 263,
      "mpperlevel": 37.5,
      "movespeed": 340,
      "armor": 30,
      "armorperlevel": 4,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 175,
      "hpregen": 9.845,
      "hpregenperlevel": 0.95,
      "mpregen": 6.585,
      "mpregenperlevel": 0.35,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 56,
      "attackdamageperlevel": 5,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 1
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Darius.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 384,
      "y": 48
    },
    "description": "There is no greater symbol of Noxian might than Darius, the nation's most feared and battle-hardened warrior. Orphaned at a young age, Darius had to fight to keep himself and his younger brother alive. By the time he joined the military, he had ..."
  },
  {
    "id": "diana",
    "key": "131",
    "name": "Diana",
    "title": "Scorn of the Moon",
    "tags": [
      "Fighter",
      "Mage"
    ],
    "stats": {
      "hp": 589.2,
      "hpperlevel": 90,
      "mp": 297.2,
      "mpperlevel": 40,
      "movespeed": 345,
      "armor": 26.048,
      "armorperlevel": 3.6,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 150,
      "hpregen": 7.425,
      "hpregenperlevel": 0.85,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 53.04,
      "attackdamageperlevel": 3,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2.25
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Diana.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 432,
      "y": 48
    },
    "description": "''I am the light coursing in the soul of the moon.''<br><br>Bearing her crescent moonblade, Diana fights as a warrior of the Lunari, a faith all but quashed in the lands around Mount Targon. Clad in shimmering armor the color of winter snow at night, ..."
  },
  {
    "id": "draven",
    "key": "119",
    "name": "Draven",
    "title": "the Glorious Executioner",
    "tags": [
      "Marksman"
    ],
    "stats": {
      "hp": 557.76,
      "hpperlevel": 82,
      "mp": 360.56,
      "mpperlevel": 39,
      "movespeed": 330,
      "armor": 25.544,
      "armorperlevel": 3.3,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 550,
      "hpregen": 6.175,
      "hpregenperlevel": 0.7,
      "mpregen": 8.04,
      "mpregenperlevel": 0.65,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 55.8,
      "attackdamageperlevel": 2.91,
      "attackspeedoffset": -0.08,
      "attackspeedperlevel": 2.7
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Draven.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 0,
      "y": 96
    },
    "description": "Unlike his brother Darius, victory in battle was never enough for Draven. He craved recognition, acclaim, and glory. He first sought greatness in the Noxian military, but his flair for the dramatic went severely underappreciated. Thirsting for a ..."
  },
  {
    "id": "drmundo",
    "key": "36",
    "name": "Dr. Mundo",
    "title": "the Madman of Zaun",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "stats": {
      "hp": 582.52,
      "hpperlevel": 89,
      "mp": 0,
      "mpperlevel": 0,
      "movespeed": 345,
      "armor": 26.88,
      "armorperlevel": 3.5,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 7.76,
      "hpregenperlevel": 0.75,
      "mpregen": 0,
      "mpregenperlevel": 0,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 61.27,
      "attackdamageperlevel": 3,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2.8
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/DrMundo.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 48,
      "y": 96
    },
    "description": "''Beware the Madman of Zaun. In his eyes, you are already dead''<br><br>It is said that the man now known as Dr. Mundo was born without any sort of conscience. Instead, he had an unquenchable desire to inflict pain through experimentation. By the time ..."
  },
  {
    "id": "ekko",
    "key": "245",
    "name": "Ekko",
    "title": "the Boy Who Shattered Time",
    "tags": [
      "Assassin",
      "Fighter"
    ],
    "stats": {
      "hp": 580,
      "hpperlevel": 80,
      "mp": 280,
      "mpperlevel": 50,
      "movespeed": 340,
      "armor": 27,
      "armorperlevel": 3,
      "spellblock": 32,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 9,
      "hpregenperlevel": 0.9,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 55,
      "attackdamageperlevel": 3,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 3.3
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Ekko.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 96,
      "y": 96
    },
    "description": "A prodigy from the rough streets of Zaun, Ekko manipulates time to spin any situation to his advantage. Using his own invention, the Zero-Drive, he explores the branching possibilities of reality. As well as experimenting with multi-dimensional ..."
  },
  {
    "id": "elise",
    "key": "60",
    "name": "Elise",
    "title": "the Spider Queen",
    "tags": [
      "Mage",
      "Fighter"
    ],
    "stats": {
      "hp": 529.4,
      "hpperlevel": 80,
      "mp": 324,
      "mpperlevel": 50,
      "movespeed": 325,
      "armor": 22.128,
      "armorperlevel": 3.35,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 550,
      "hpregen": 5.705,
      "hpregenperlevel": 0.6,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 50.54,
      "attackdamageperlevel": 3,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 1.75
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Elise.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 144,
      "y": 96
    },
    "description": "''Beauty is power too, and can strike swifter than any sword.''<br><br>Elise is a deadly predator who dwells in a shuttered, lightless palace, deep in the Immortal Bastion of Noxus. Once she was mortal, the mistress of a once-powerful house, but the ..."
  },
  {
    "id": "evelynn",
    "key": "28",
    "name": "Evelynn",
    "title": "the Widowmaker",
    "tags": [
      "Assassin",
      "Mage"
    ],
    "stats": {
      "hp": 531.2,
      "hpperlevel": 90,
      "mp": 315.6,
      "mpperlevel": 42,
      "movespeed": 340,
      "armor": 26.5,
      "armorperlevel": 3.8,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 9.82,
      "hpregenperlevel": 0.55,
      "mpregen": 8.105,
      "mpregenperlevel": 0.6,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 53.88,
      "attackdamageperlevel": 3.5,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 3.6
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Evelynn.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 192,
      "y": 96
    },
    "description": "Swift and lethal, Evelynn is one of the most deadly - and expensive - assassins in all of Runeterra. Able to merge with the shadows at will, she patiently stalks her prey, waiting for the right moment to strike. While Evelynn is clearly not entirely ..."
  },
  {
    "id": "ezreal",
    "key": "81",
    "name": "Ezreal",
    "title": "the Prodigal Explorer",
    "tags": [
      "Marksman",
      "Mage"
    ],
    "stats": {
      "hp": 484.4,
      "hpperlevel": 80,
      "mp": 360.6,
      "mpperlevel": 42,
      "movespeed": 325,
      "armor": 21.88,
      "armorperlevel": 3.5,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 550,
      "hpregen": 6.42,
      "hpregenperlevel": 0.55,
      "mpregen": 8.09,
      "mpregenperlevel": 0.65,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 55.66,
      "attackdamageperlevel": 2.41,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2.8
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Ezreal.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 240,
      "y": 96
    },
    "description": "The intrepid young adventurer Ezreal has explored some of the most remote and abandoned locations on Runeterra. During an expedition to the buried ruins of ancient Shurima, he recovered an amulet of incredible mystical power. Likely constructed to be ..."
  },
  {
    "id": "fiddlesticks",
    "key": "9",
    "name": "Fiddlesticks",
    "title": "the Harbinger of Doom",
    "tags": [
      "Mage",
      "Support"
    ],
    "stats": {
      "hp": 524.4,
      "hpperlevel": 80,
      "mp": 400.12,
      "mpperlevel": 56,
      "movespeed": 335,
      "armor": 20.88,
      "armorperlevel": 3.5,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 480,
      "hpregen": 5.605,
      "hpregenperlevel": 0.6,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 48.36,
      "attackdamageperlevel": 2.625,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2.11
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/FiddleSticks.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 288,
      "y": 96
    },
    "description": "For nearly twenty years, Fiddlesticks has stood alone in the easternmost summoning chamber of the Institute of War. Only the burning emerald light of his unearthly gaze pierces the musty darkness of his dust-covered home. It is here that the Harbinger ..."
  },
  {
    "id": "fiora",
    "key": "114",
    "name": "Fiora",
    "title": "the Grand Duelist",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "stats": {
      "hp": 550,
      "hpperlevel": 85,
      "mp": 300,
      "mpperlevel": 40,
      "movespeed": 345,
      "armor": 24,
      "armorperlevel": 3.5,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 150,
      "hpregen": 8.25,
      "hpregenperlevel": 0.55,
      "mpregen": 8,
      "mpregenperlevel": 0.7,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 60,
      "attackdamageperlevel": 3.3,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 3.2
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Fiora.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 336,
      "y": 96
    },
    "description": "''I have come to kill you for the sake of honor. And though you possess none, still you die.''<br>The most feared duelist in all Valoran, Fiora is as renowned for her brusque manner and cunning mind as she is for the speed of her bluesteel rapier. ..."
  },
  {
    "id": "fizz",
    "key": "105",
    "name": "Fizz",
    "title": "the Tidal Trickster",
    "tags": [
      "Assassin",
      "Fighter"
    ],
    "stats": {
      "hp": 558.48,
      "hpperlevel": 86,
      "mp": 317.2,
      "mpperlevel": 37,
      "movespeed": 335,
      "armor": 22.412,
      "armorperlevel": 3.4,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 175,
      "hpregen": 8.175,
      "hpregenperlevel": 0.7,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 58.04,
      "attackdamageperlevel": 3,
      "attackspeedoffset": -0.05,
      "attackspeedperlevel": 3.1
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Fizz.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 384,
      "y": 96
    },
    "description": "Centuries ago, an ancient water-dwelling race built a hidden city beneath a mountain in the sea. Though these creatures had their enemies, the city was an impenetrable fortress, and, in the safety it provided, they grew complacent. Fizz, however, ..."
  },
  {
    "id": "galio",
    "key": "3",
    "name": "Galio",
    "title": "the Sentinel's Sorrow",
    "tags": [
      "Tank",
      "Mage"
    ],
    "stats": {
      "hp": 577.8,
      "hpperlevel": 85,
      "mp": 369,
      "mpperlevel": 47,
      "movespeed": 335,
      "armor": 26.88,
      "armorperlevel": 3.5,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 8.71,
      "hpregenperlevel": 0.75,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 61.97,
      "attackdamageperlevel": 3.375,
      "attackspeedoffset": -0.02,
      "attackspeedperlevel": 1.2
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Galio.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion0.png",
      "x": 432,
      "y": 96
    },
    "description": "''There is no such thing as redemption. Only penance.''<br><br>Long before the regulation of magic, mages experimented with the creation of artificial life. Now forbidden, instilling golems with reason was once not so uncommon a practice amongst the ..."
  },
  {
    "id": "gangplank",
    "key": "41",
    "name": "Gangplank",
    "title": "the Saltwater Scourge",
    "tags": [
      "Fighter"
    ],
    "stats": {
      "hp": 540,
      "hpperlevel": 82,
      "mp": 282,
      "mpperlevel": 40,
      "movespeed": 345,
      "armor": 26,
      "armorperlevel": 3,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 6,
      "hpregenperlevel": 0.6,
      "mpregen": 7.5,
      "mpregenperlevel": 0.7,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 56,
      "attackdamageperlevel": 3,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 3.2
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Gangplank.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 0,
      "y": 0
    },
    "description": "''I was cutting throats and sinking Noxian war galleys when you were still pissing your britches, boy. You don't want to take me on.''<br><br>As unpredictable as he is brutal, the dethroned reaver king known as Gangplank is feared far and wide. Where ..."
  },
  {
    "id": "garen",
    "key": "86",
    "name": "Garen",
    "title": "The Might of Demacia",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "stats": {
      "hp": 616.28,
      "hpperlevel": 84.25,
      "mp": 0,
      "mpperlevel": 0,
      "movespeed": 340,
      "armor": 27.536,
      "armorperlevel": 3,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 175,
      "hpregen": 7.84,
      "hpregenperlevel": 0.5,
      "mpregen": 0,
      "mpregenperlevel": 0,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 57.88,
      "attackdamageperlevel": 4.5,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2.9
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Garen.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 48,
      "y": 0
    },
    "description": "Throughout Valoran, the resolve of Demacia's military is alternately celebrated or despised, but always respected. Their ''zero tolerance'' moral code is strictly upheld by civilians and soldiers alike. In combat, this means Demacian troops may not ..."
  },
  {
    "id": "gnar",
    "key": "150",
    "name": "Gnar",
    "title": "the Missing Link",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "stats": {
      "hp": 540,
      "hpperlevel": 65,
      "mp": 100,
      "mpperlevel": 0,
      "movespeed": 325,
      "armor": 23,
      "armorperlevel": 2.5,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 175,
      "hpregen": 2.5,
      "hpregenperlevel": 0.5,
      "mpregen": 0,
      "mpregenperlevel": 0,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 51,
      "attackdamageperlevel": 3,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 6
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Gnar.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 96,
      "y": 0
    },
    "description": "The jungle does not forgive blindness. Every broken branch tells a story.<br><br>I've hunted every creature this jungle has to offer. I was certain there were no challenges left here, but now there is something new. Each track is the size of a ..."
  },
  {
    "id": "gragas",
    "key": "79",
    "name": "Gragas",
    "title": "the Rabble Rouser",
    "tags": [
      "Fighter",
      "Mage"
    ],
    "stats": {
      "hp": 583.52,
      "hpperlevel": 89,
      "mp": 400,
      "mpperlevel": 47,
      "movespeed": 330,
      "armor": 26.048,
      "armorperlevel": 3.6,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 5.5,
      "hpregenperlevel": 0.5,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 61.38,
      "attackdamageperlevel": 3.5,
      "attackspeedoffset": -0.04,
      "attackspeedperlevel": 2.05
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Gragas.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 144,
      "y": 0
    },
    "description": "The only thing more important to Gragas than fighting is drinking. His unquenchable thirst for stronger ale has led him in search of the most potent and unconventional ingredients to toss in his still. Impulsive and unpredictable, this rowdy carouser ..."
  },
  {
    "id": "graves",
    "key": "104",
    "name": "Graves",
    "title": "the Outlaw",
    "tags": [
      "Marksman"
    ],
    "stats": {
      "hp": 551.12,
      "hpperlevel": 84,
      "mp": 322.2,
      "mpperlevel": 40,
      "movespeed": 340,
      "armor": 24.376,
      "armorperlevel": 3.4,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 425,
      "hpregen": 6.675,
      "hpregenperlevel": 0.7,
      "mpregen": 7.9,
      "mpregenperlevel": 0.7,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 60.83,
      "attackdamageperlevel": 2.41,
      "attackspeedoffset": 0.3,
      "attackspeedperlevel": 2.6
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Graves.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 192,
      "y": 0
    },
    "description": "Malcolm Graves is a wanted man in every realm, city and empire he has visited. Tough, strong-willed, and above all, relentless, through his life of crime he has amassed (then invariably lost) a small fortune."
  },
  {
    "id": "hecarim",
    "key": "120",
    "name": "Hecarim",
    "title": "the Shadow of War",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "stats": {
      "hp": 580,
      "hpperlevel": 90,
      "mp": 277.2,
      "mpperlevel": 40,
      "movespeed": 345,
      "armor": 26.72,
      "armorperlevel": 4,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 175,
      "hpregen": 7,
      "hpregenperlevel": 0.75,
      "mpregen": 6.5,
      "mpregenperlevel": 0.6,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 58,
      "attackdamageperlevel": 3.2,
      "attackspeedoffset": -0.0672,
      "attackspeedperlevel": 2.5
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Hecarim.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 240,
      "y": 0
    },
    "description": "''Break their ranks and ride them down without mercy. Crush the living and feast on their terror.''<br><br>Hecarim is an armored colossus who charges from the Shadow Isles at the head of a deathly host of spectral horsemen to hunt the living. A ..."
  },
  {
    "id": "heimerdinger",
    "key": "74",
    "name": "Heimerdinger",
    "title": "the Revered Inventor",
    "tags": [
      "Mage",
      "Support"
    ],
    "stats": {
      "hp": 476,
      "hpperlevel": 75,
      "mp": 307.2,
      "mpperlevel": 40,
      "movespeed": 340,
      "armor": 19.04,
      "armorperlevel": 3,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 550,
      "hpregen": 11.005,
      "hpregenperlevel": 1.75,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 55.536,
      "attackdamageperlevel": 2.7,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 1.36
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Heimerdinger.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 288,
      "y": 0
    },
    "description": "From the Journal of Professor Cecil B. Heimerdinger<br><br>10.14<br><br>09:15<br><br>Current meteorological conditions in Bandle City seem optimal. Atmospheric pressure is ideal for today's experiments!<br><br>Running a fifth trial for my ..."
  },
  {
    "id": "illaoi",
    "key": "420",
    "name": "Illaoi",
    "title": "the Kraken Priestess",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "stats": {
      "hp": 585.6,
      "hpperlevel": 95,
      "mp": 300,
      "mpperlevel": 40,
      "movespeed": 340,
      "armor": 26,
      "armorperlevel": 3.8,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 9.5,
      "hpregenperlevel": 0.8,
      "mpregen": 7.5,
      "mpregenperlevel": 0.75,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 60,
      "attackdamageperlevel": 5,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2.5
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Illaoi.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 336,
      "y": 0
    },
    "description": "''I'm not big on sermons. Broken bones teach better lessons.''<br>Illaoi's powerful physique is dwarfed only by her indomitable faith. As the prophet of the Great Kraken, she uses a huge, golden idol to rip her foes' spirits from their bodies and ..."
  },
  {
    "id": "irelia",
    "key": "39",
    "name": "Irelia",
    "title": "the Will of the Blades",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "stats": {
      "hp": 607.2,
      "hpperlevel": 90,
      "mp": 338.8,
      "mpperlevel": 32,
      "movespeed": 345,
      "armor": 25.3,
      "armorperlevel": 3.75,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 8.59,
      "hpregenperlevel": 0.65,
      "mpregen": 8.1,
      "mpregenperlevel": 0.65,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 61.544,
      "attackdamageperlevel": 3.3,
      "attackspeedoffset": -0.06,
      "attackspeedperlevel": 3.2
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Irelia.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 384,
      "y": 0
    },
    "description": "''The sword flourishes, as though painting with blood.''<br><br>The Ionians have developed some of the most breathtaking and deadly martial arts in all of Runeterra - just one manifestation of their pursuit of enlightenment. The most remarkable blade ..."
  },
  {
    "id": "ivern",
    "key": "427",
    "name": "Ivern",
    "title": "the Green Father",
    "tags": [
      "Support",
      "Mage"
    ],
    "stats": {
      "hp": 580,
      "hpperlevel": 90,
      "mp": 450,
      "mpperlevel": 60,
      "movespeed": 330,
      "armor": 22,
      "armorperlevel": 3.5,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 6.9,
      "hpregenperlevel": 0.85,
      "mpregen": 6,
      "mpregenperlevel": 0.75,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 50,
      "attackdamageperlevel": 3,
      "attackspeedoffset": -0.03,
      "attackspeedperlevel": 3.4
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Ivern.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion4.png",
      "x": 96,
      "y": 48
    },
    "description": "Ivern Bramblefoot, known to many as the Green Father, is a peculiar half man, half tree who roams Runeterra's forests, cultivating life everywhere he goes. He knows the secrets of the natural world, and holds deep friendships with all things that grow,..."
  },
  {
    "id": "janna",
    "key": "40",
    "name": "Janna",
    "title": "the Storm's Fury",
    "tags": [
      "Support",
      "Mage"
    ],
    "stats": {
      "hp": 487.04,
      "hpperlevel": 78,
      "mp": 409.52,
      "mpperlevel": 64,
      "movespeed": 335,
      "armor": 19.384,
      "armorperlevel": 3.8,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 475,
      "hpregen": 5.42,
      "hpregenperlevel": 0.55,
      "mpregen": 11.5,
      "mpregenperlevel": 0.4,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 51.956,
      "attackdamageperlevel": 2.95,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2.61
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Janna.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 432,
      "y": 0
    },
    "description": "There are those sorcerers who give themselves over to the primal powers of nature, forgoing the learned practice of magic. Such a sorceress is Janna, who first learned magic as an orphan growing up amidst the chaos that is the city-state of Zaun. ..."
  },
  {
    "id": "jarvaniv",
    "key": "59",
    "name": "Jarvan IV",
    "title": "the Exemplar of Demacia",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "stats": {
      "hp": 571.2,
      "hpperlevel": 90,
      "mp": 302.2,
      "mpperlevel": 40,
      "movespeed": 340,
      "armor": 29,
      "armorperlevel": 3.6,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 175,
      "hpregen": 8.175,
      "hpregenperlevel": 0.7,
      "mpregen": 6.755,
      "mpregenperlevel": 0.45,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 55.712,
      "attackdamageperlevel": 3.4,
      "attackspeedoffset": -0.05,
      "attackspeedperlevel": 2.5
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/JarvanIV.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 0,
      "y": 48
    },
    "description": "''There is only one truth, and you will find it at the point of my lance.''<br><br>As the royal family of Demacia for centuries, members of the Lightshield line have spent their lives waging war against any who opposed Demacian ethics. It is said that ..."
  },
  {
    "id": "jax",
    "key": "24",
    "name": "Jax",
    "title": "Grandmaster at Arms",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "stats": {
      "hp": 592.8,
      "hpperlevel": 85,
      "mp": 338.8,
      "mpperlevel": 32,
      "movespeed": 350,
      "armor": 27.04,
      "armorperlevel": 3,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 8.37,
      "hpregenperlevel": 0.55,
      "mpregen": 7.575,
      "mpregenperlevel": 0.7,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 61.97,
      "attackdamageperlevel": 3.375,
      "attackspeedoffset": -0.02,
      "attackspeedperlevel": 3.4
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Jax.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 48,
      "y": 48
    },
    "description": "It is seldom the case where a champion is defined by his actions after joining the League of Legends rather than before. Such is the case with Jax, for whom the argument could be made that he is the most prolific tournament fighter currently at the ..."
  },
  {
    "id": "jayce",
    "key": "126",
    "name": "Jayce",
    "title": "the Defender of Tomorrow",
    "tags": [
      "Fighter",
      "Marksman"
    ],
    "stats": {
      "hp": 571.2,
      "hpperlevel": 90,
      "mp": 357.2,
      "mpperlevel": 37,
      "movespeed": 335,
      "armor": 22.38,
      "armorperlevel": 3.5,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 125,
      "hpregen": 7.34,
      "hpregenperlevel": 0.8,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 50.38,
      "attackdamageperlevel": 3.5,
      "attackspeedoffset": -0.05,
      "attackspeedperlevel": 3
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Jayce.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 96,
      "y": 48
    },
    "description": "Armed with wit, charm, and his signature transforming hammer, Jayce lives to protect his native Piltover. Long before his nation called him a hero, however, he was a promising young inventor. When Piltover commissioned him to study a rare arcane ..."
  },
  {
    "id": "jhin",
    "key": "202",
    "name": "Jhin",
    "title": "the Virtuoso",
    "tags": [
      "Marksman",
      "Assassin"
    ],
    "stats": {
      "hp": 540,
      "hpperlevel": 85,
      "mp": 300,
      "mpperlevel": 50,
      "movespeed": 330,
      "armor": 20,
      "armorperlevel": 3.5,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 550,
      "hpregen": 6,
      "hpregenperlevel": 0.55,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 53,
      "attackdamageperlevel": 4,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 0
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Jhin.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 144,
      "y": 48
    },
    "description": "''Art requires a certain...cruelty.''<br><br>Jhin is a meticulous criminal psychopath who believes murder is art. Once an Ionian prisoner, but freed by shadowy elements within Ionia's ruling council, the serial killer now works as their cabal's ..."
  },
  {
    "id": "jinx",
    "key": "222",
    "name": "Jinx",
    "title": "the Loose Cannon",
    "tags": [
      "Marksman"
    ],
    "stats": {
      "hp": 517.76,
      "hpperlevel": 82,
      "mp": 245.6,
      "mpperlevel": 45,
      "movespeed": 325,
      "armor": 22.88,
      "armorperlevel": 3.5,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 525,
      "hpregen": 5.84,
      "hpregenperlevel": 0.5,
      "mpregen": 6.68,
      "mpregenperlevel": 1,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 58.46,
      "attackdamageperlevel": 2.41,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 1
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Jinx.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 192,
      "y": 48
    },
    "description": "Jinx lives to wreak havoc without a thought for the consequences, leaving a trail of mayhem and panic in her wake. A manic and impulsive criminal, she despises nothing more than boredom, and gleefully brings her own volatile brand of pandemonium to ..."
  },
  {
    "id": "kalista",
    "key": "429",
    "name": "Kalista",
    "title": "the Spear of Vengeance",
    "tags": [
      "Marksman"
    ],
    "stats": {
      "hp": 517.76,
      "hpperlevel": 83,
      "mp": 231.8,
      "mpperlevel": 35,
      "movespeed": 325,
      "armor": 19.012,
      "armorperlevel": 3.5,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 550,
      "hpregen": 6,
      "hpregenperlevel": 0.55,
      "mpregen": 6.3,
      "mpregenperlevel": 0.4,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 63,
      "attackdamageperlevel": 2.9,
      "attackspeedoffset": -0.03,
      "attackspeedperlevel": 2.5
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Kalista.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 240,
      "y": 48
    },
    "description": "''When wronged, we seek justice. When hurt, we strike back. When betrayed, the Spear of Vengeance strikes!''<br><br>A specter of wrath and retribution, Kalista is the undying spirit of vengeance, an armored nightmare summoned from the Shadow Isles to ..."
  },
  {
    "id": "karma",
    "key": "43",
    "name": "Karma",
    "title": "the Enlightened One",
    "tags": [
      "Mage",
      "Support"
    ],
    "stats": {
      "hp": 522.44,
      "hpperlevel": 83,
      "mp": 374,
      "mpperlevel": 50,
      "movespeed": 335,
      "armor": 20.384,
      "armorperlevel": 3.8,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 525,
      "hpregen": 5.62,
      "hpregenperlevel": 0.55,
      "mpregen": 8.5,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 53.544,
      "attackdamageperlevel": 3.3,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2.3
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Karma.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 288,
      "y": 48
    },
    "description": "Karma is a woman of indomitable will and unbound spiritual power. She is the soul of Ionia made manifest and an inspiring presence on the battlefield, shielding her allies and turning back her foes. A strong leader torn between tradition and ..."
  },
  {
    "id": "karthus",
    "key": "30",
    "name": "Karthus",
    "title": "the Deathsinger",
    "tags": [
      "Mage"
    ],
    "stats": {
      "hp": 516,
      "hpperlevel": 75,
      "mp": 372.48,
      "mpperlevel": 61,
      "movespeed": 335,
      "armor": 20.88,
      "armorperlevel": 3.5,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 450,
      "hpregen": 6.42,
      "hpregenperlevel": 0.55,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 45.66,
      "attackdamageperlevel": 3.25,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2.11
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Karthus.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 336,
      "y": 48
    },
    "description": "''Death is not the end of the journey, it is just the beginning...''<br><br>The harbinger of oblivion, Karthus is an undying spirit whose haunting songs are a prelude to the horror of his nightmarish appearance. The living fear the eternity of undeath,..."
  },
  {
    "id": "kassadin",
    "key": "38",
    "name": "Kassadin",
    "title": "the Void Walker",
    "tags": [
      "Assassin",
      "Mage"
    ],
    "stats": {
      "hp": 564.04,
      "hpperlevel": 78,
      "mp": 397.6,
      "mpperlevel": 67,
      "movespeed": 340,
      "armor": 23.376,
      "armorperlevel": 3.2,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 150,
      "hpregen": 7.79,
      "hpregenperlevel": 0.5,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 58.852,
      "attackdamageperlevel": 3.9,
      "attackspeedoffset": -0.023,
      "attackspeedperlevel": 3.7
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Kassadin.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 384,
      "y": 48
    },
    "description": "There is a place between dimensions and between worlds. To some it is known as the Outside, to others it is the Unknown. To most, however, it is called the Void. Despite its name, the Void is not an empty place, but rather the home of unspeakable ..."
  },
  {
    "id": "katarina",
    "key": "55",
    "name": "Katarina",
    "title": "the Sinister Blade",
    "tags": [
      "Assassin",
      "Mage"
    ],
    "stats": {
      "hp": 510,
      "hpperlevel": 83,
      "mp": 0,
      "mpperlevel": 0,
      "movespeed": 345,
      "armor": 26.88,
      "armorperlevel": 3.5,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 4.5,
      "hpregenperlevel": 0.55,
      "mpregen": 0,
      "mpregenperlevel": 0,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 58,
      "attackdamageperlevel": 3.2,
      "attackspeedoffset": -0.05,
      "attackspeedperlevel": 2.74
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Katarina.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 432,
      "y": 48
    },
    "description": "Driven by an intense killer instinct, Katarina uses her talents as an assassin for the glory of Noxus, and the continued elevation of her family. While her fervor drives her to ever-greater feats, it can sometimes lead her astray.<br><br>From ..."
  },
  {
    "id": "kayle",
    "key": "10",
    "name": "Kayle",
    "title": "The Judicator",
    "tags": [
      "Fighter",
      "Support"
    ],
    "stats": {
      "hp": 574.24,
      "hpperlevel": 93,
      "mp": 322.2,
      "mpperlevel": 40,
      "movespeed": 335,
      "armor": 26.88,
      "armorperlevel": 3.5,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 125,
      "hpregen": 8.26,
      "hpregenperlevel": 0.75,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 51,
      "attackdamageperlevel": 2.8,
      "attackspeedoffset": -0.02,
      "attackspeedperlevel": 2.2
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Kayle.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 0,
      "y": 96
    },
    "description": "In a world far away where an ancient war still rages, Kayle was a great hero - the strongest of an immortal race committed to destroying evil wherever it could be found. For ten thousand years, Kayle fought tirelessly for her people, wielding her ..."
  },
  {
    "id": "kennen",
    "key": "85",
    "name": "Kennen",
    "title": "the Heart of the Tempest",
    "tags": [
      "Mage",
      "Marksman"
    ],
    "stats": {
      "hp": 535.72,
      "hpperlevel": 79,
      "mp": 200,
      "mpperlevel": 0,
      "movespeed": 335,
      "armor": 24.3,
      "armorperlevel": 3.75,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 550,
      "hpregen": 5.59,
      "hpregenperlevel": 0.65,
      "mpregen": 50,
      "mpregenperlevel": 0,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 50.544,
      "attackdamageperlevel": 3.3,
      "attackspeedoffset": -0.0947,
      "attackspeedperlevel": 3.4
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Kennen.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 48,
      "y": 96
    },
    "description": "There exists an ancient order originating in the Ionian Isles dedicated to the preservation of balance. Order, chaos, light, darkness -- all things must exist in perfect harmony for such is the way of the universe. This order is known as the Kinkou ..."
  },
  {
    "id": "khazix",
    "key": "121",
    "name": "Kha'Zix",
    "title": "the Voidreaver",
    "tags": [
      "Assassin",
      "Fighter"
    ],
    "stats": {
      "hp": 572.8,
      "hpperlevel": 85,
      "mp": 327.2,
      "mpperlevel": 40,
      "movespeed": 350,
      "armor": 27,
      "armorperlevel": 3,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 7.51,
      "hpregenperlevel": 0.75,
      "mpregen": 7.59,
      "mpregenperlevel": 0.5,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 55.208,
      "attackdamageperlevel": 3.1,
      "attackspeedoffset": -0.065,
      "attackspeedperlevel": 2.7
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Khazix.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 96,
      "y": 96
    },
    "description": "A vicious Void predator, Kha'Zix infiltrated Valoran to devour the land's most promising creatures. With each kill he absorbs his prey's strength, evolving to grow more powerful. Kha'Zix hungers most to conquer and consume Rengar, the one beast he ..."
  },
  {
    "id": "kindred",
    "key": "203",
    "name": "Kindred",
    "title": "The Eternal Hunters",
    "tags": [
      "Marksman"
    ],
    "stats": {
      "hp": 540,
      "hpperlevel": 85,
      "mp": 300,
      "mpperlevel": 35,
      "movespeed": 325,
      "armor": 20,
      "armorperlevel": 3.5,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 500,
      "hpregen": 7,
      "hpregenperlevel": 0.55,
      "mpregen": 6.97,
      "mpregenperlevel": 0.4,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 54,
      "attackdamageperlevel": 1.7,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2.5
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Kindred.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 144,
      "y": 96
    },
    "description": "''Tell me again, little Lamb, which things are ours to take?''<br>''All things, Dear Wolf.''<br>Separate, but never parted, Kindred represents the twin essences of death. Lamb's arrow offers a swift release for those who accept their fate. Wolf hunts ..."
  },
  {
    "id": "kled",
    "key": "240",
    "name": "Kled",
    "title": "the Cantankerous Cavalier",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "stats": {
      "hp": 340,
      "hpperlevel": 70,
      "mp": 100,
      "mpperlevel": 0,
      "movespeed": 345,
      "armor": 26,
      "armorperlevel": 4,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 6,
      "hpregenperlevel": 0.75,
      "mpregen": 0,
      "mpregenperlevel": 0,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 55,
      "attackdamageperlevel": 3,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 3.5
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Kled.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion4.png",
      "x": 48,
      "y": 48
    },
    "description": "''A sane man would run . . . but I ain't the runnin' kind!''<br><br>A warrior as fearless as he is ornery, Kled is a popular folk hero in Noxus. Embodying the furious bravado of his nation, he is an icon beloved by the empire's soldiers, distrusted by ..."
  },
  {
    "id": "kogmaw",
    "key": "96",
    "name": "Kog'Maw",
    "title": "the Mouth of the Abyss",
    "tags": [
      "Marksman",
      "Mage"
    ],
    "stats": {
      "hp": 517.76,
      "hpperlevel": 82,
      "mp": 322.2,
      "mpperlevel": 40,
      "movespeed": 325,
      "armor": 19.88,
      "armorperlevel": 3.5,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 500,
      "hpregen": 5.92,
      "hpregenperlevel": 0.55,
      "mpregen": 8.675,
      "mpregenperlevel": 0.7,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 57.46,
      "attackdamageperlevel": 2.41,
      "attackspeedoffset": -0.06,
      "attackspeedperlevel": 2.65
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/KogMaw.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 192,
      "y": 96
    },
    "description": "''If that's just hungry, I don't want to see angry.''<br><br>When the prophet Malzahar was reborn in Icathia, he was led there by an ominous voice which thereafter anchored itself to his psyche. From within, this voice bestowed upon him terrible ..."
  },
  {
    "id": "leblanc",
    "key": "7",
    "name": "LeBlanc",
    "title": "the Deceiver",
    "tags": [
      "Assassin",
      "Mage"
    ],
    "stats": {
      "hp": 516,
      "hpperlevel": 75,
      "mp": 334,
      "mpperlevel": 50,
      "movespeed": 335,
      "armor": 21.88,
      "armorperlevel": 3.5,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 525,
      "hpregen": 7.42,
      "hpregenperlevel": 0.55,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 54.88,
      "attackdamageperlevel": 3.5,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 1.4
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Leblanc.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 240,
      "y": 96
    },
    "description": "Every city has its dark side, even one whose reputation is already of a questionable hue. Noxus - though its name is already invoked with a mixture of reverence and revulsion - is no exception to this simple truth. Deep within the winding dungeons ..."
  },
  {
    "id": "leesin",
    "key": "64",
    "name": "Lee Sin",
    "title": "the Blind Monk",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "stats": {
      "hp": 570.8,
      "hpperlevel": 85,
      "mp": 200,
      "mpperlevel": 0,
      "movespeed": 350,
      "armor": 24.216,
      "armorperlevel": 3.7,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 7.425,
      "hpregenperlevel": 0.7,
      "mpregen": 50,
      "mpregenperlevel": 0,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 61.176,
      "attackdamageperlevel": 3.2,
      "attackspeedoffset": -0.04,
      "attackspeedperlevel": 3
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/LeeSin.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 288,
      "y": 96
    },
    "description": "As a young teen, Lee Sin was intent on becoming a summoner. His will and dedication were unmatched by any of his peers, and his skill drew the attention of Reginald Ashram, the League's High Councilor at the time. While studying at the Arcanum Majoris,..."
  },
  {
    "id": "leona",
    "key": "89",
    "name": "Leona",
    "title": "the Radiant Dawn",
    "tags": [
      "Tank",
      "Support"
    ],
    "stats": {
      "hp": 576.16,
      "hpperlevel": 87,
      "mp": 302.2,
      "mpperlevel": 40,
      "movespeed": 335,
      "armor": 27.208,
      "armorperlevel": 3.6,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 8.425,
      "hpregenperlevel": 0.85,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 60.04,
      "attackdamageperlevel": 3,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2.9
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Leona.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 336,
      "y": 96
    },
    "description": "''If you would shine like a sun, first you must burn like one.''<br><br>Imbued with the fire of the sun, Leona is a warrior templar of the Solari who defends Mount Targon with her Zenith Blade and Shield of Daybreak. Her skin shimmers with starfire ..."
  },
  {
    "id": "lissandra",
    "key": "127",
    "name": "Lissandra",
    "title": "the Ice Witch",
    "tags": [
      "Mage"
    ],
    "stats": {
      "hp": 506.12,
      "hpperlevel": 75,
      "mp": 304,
      "mpperlevel": 50,
      "movespeed": 325,
      "armor": 20.216,
      "armorperlevel": 3.7,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 550,
      "hpregen": 6.92,
      "hpregenperlevel": 0.55,
      "mpregen": 5.67,
      "mpregenperlevel": 0.4,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 50.536,
      "attackdamageperlevel": 2.7,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 1.36
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Lissandra.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 384,
      "y": 96
    },
    "description": "Lissandra's magic twists the pure power of ice into something dark and terrible. With the force of her black ice, she does more than freeze - she impales and crushes those who oppose her. To the terrified denizens of the north, she is known only as ..."
  },
  {
    "id": "lucian",
    "key": "236",
    "name": "Lucian",
    "title": "the Purifier",
    "tags": [
      "Marksman"
    ],
    "stats": {
      "hp": 554.4,
      "hpperlevel": 80,
      "mp": 348.88,
      "mpperlevel": 38,
      "movespeed": 335,
      "armor": 24.04,
      "armorperlevel": 3,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 500,
      "hpregen": 6.19,
      "hpregenperlevel": 0.65,
      "mpregen": 8.175,
      "mpregenperlevel": 0.7,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 57.46,
      "attackdamageperlevel": 2.41,
      "attackspeedoffset": -0.02,
      "attackspeedperlevel": 3.3
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Lucian.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion1.png",
      "x": 432,
      "y": 96
    },
    "description": "Lucian wields relic weapons imbued with ancient power and stands a stalwart guardian against the undead. His cold conviction never wavers, even in the face of the maddening horrors he destroys beneath his hail of purifying fire. Lucian walks alone on ..."
  },
  {
    "id": "lulu",
    "key": "117",
    "name": "Lulu",
    "title": "the Fae Sorceress",
    "tags": [
      "Support",
      "Mage"
    ],
    "stats": {
      "hp": 552.76,
      "hpperlevel": 74,
      "mp": 350,
      "mpperlevel": 55,
      "movespeed": 330,
      "armor": 19.216,
      "armorperlevel": 3.7,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 550,
      "hpregen": 6.005,
      "hpregenperlevel": 0.6,
      "mpregen": 11,
      "mpregenperlevel": 0.6,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 46.368,
      "attackdamageperlevel": 2.6,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2.25
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Lulu.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 0,
      "y": 0
    },
    "description": "Perhaps more than any other champion in the League, Lulu marches to the beat of her own drum. During her youth in Bandle City, she spent most of her time wandering alone in the forest or lost in a daydream. It wasn't that she was antisocial; the ..."
  },
  {
    "id": "lux",
    "key": "99",
    "name": "Lux",
    "title": "the Lady of Luminosity",
    "tags": [
      "Mage",
      "Support"
    ],
    "stats": {
      "hp": 477.72,
      "hpperlevel": 79,
      "mp": 384,
      "mpperlevel": 47,
      "movespeed": 330,
      "armor": 18.72,
      "armorperlevel": 4,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 550,
      "hpregen": 5.42,
      "hpregenperlevel": 0.55,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 53.544,
      "attackdamageperlevel": 3.3,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 1.36
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Lux.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 48,
      "y": 0
    },
    "description": "Born to the prestigious Crownguards, the paragon family of Demacian service, Luxanna was destined for greatness. She grew up as the family's only daughter, and she immediately took to the advanced education and lavish parties required of families as ..."
  },
  {
    "id": "malphite",
    "key": "54",
    "name": "Malphite",
    "title": "Shard of the Monolith",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "stats": {
      "hp": 574.2,
      "hpperlevel": 90,
      "mp": 282.2,
      "mpperlevel": 40,
      "movespeed": 335,
      "armor": 28.3,
      "armorperlevel": 3.75,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 7,
      "hpregenperlevel": 0.55,
      "mpregen": 7.32,
      "mpregenperlevel": 0.55,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 61.97,
      "attackdamageperlevel": 3.375,
      "attackspeedoffset": -0.02,
      "attackspeedperlevel": 3.4
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Malphite.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 96,
      "y": 0
    },
    "description": "There is a world of perfect harmony, where all are part of the whole. The Monolith is the essence of all creation, and its denizens are but singular pieces of it. It is beautiful in its symmetry, and in its almost complete lack of uncertainty. The ..."
  },
  {
    "id": "malzahar",
    "key": "90",
    "name": "Malzahar",
    "title": "the Prophet of the Void",
    "tags": [
      "Mage",
      "Assassin"
    ],
    "stats": {
      "hp": 525,
      "hpperlevel": 75,
      "mp": 300,
      "mpperlevel": 55,
      "movespeed": 335,
      "armor": 20,
      "armorperlevel": 3.5,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 500,
      "hpregen": 6,
      "hpregenperlevel": 0.6,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 55,
      "attackdamageperlevel": 3,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 1.5
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Malzahar.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 144,
      "y": 0
    },
    "description": "Many men have gone mad beneath the glare of the Shurima sun, but it was during the night's chilling embrace that Malzahar relinquished his sanity. Malzahar was born a seer, blessed with the gift of prophecy. His talent, though unrefined, promised to ..."
  },
  {
    "id": "maokai",
    "key": "57",
    "name": "Maokai",
    "title": "the Twisted Treant",
    "tags": [
      "Tank",
      "Mage"
    ],
    "stats": {
      "hp": 572.2,
      "hpperlevel": 90,
      "mp": 377.28,
      "mpperlevel": 43,
      "movespeed": 335,
      "armor": 28.72,
      "armorperlevel": 4,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 7,
      "hpregenperlevel": 0.75,
      "mpregen": 7.205,
      "mpregenperlevel": 0.45,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 63.544,
      "attackdamageperlevel": 3.3,
      "attackspeedoffset": -0.1,
      "attackspeedperlevel": 2.125
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Maokai.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 192,
      "y": 0
    },
    "description": "''All around me are empty husks, soulless and unafraid... but I will bring them fear.''<br><br>Maokai is a rageful, towering treant who fights the unnatural horrors of the Shadow Isles. He was twisted into a force of vengeance after a magical ..."
  },
  {
    "id": "masteryi",
    "key": "11",
    "name": "Master Yi",
    "title": "the Wuju Bladesman",
    "tags": [
      "Assassin",
      "Fighter"
    ],
    "stats": {
      "hp": 598.56,
      "hpperlevel": 92,
      "mp": 250.56,
      "mpperlevel": 42,
      "movespeed": 355,
      "armor": 24.04,
      "armorperlevel": 3,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 7.59,
      "hpregenperlevel": 0.65,
      "mpregen": 7.255,
      "mpregenperlevel": 0.45,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 60.04,
      "attackdamageperlevel": 3,
      "attackspeedoffset": -0.08,
      "attackspeedperlevel": 2
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/MasterYi.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 240,
      "y": 0
    },
    "description": "Through the ancient martial art of Wuju, Master Yi has tempered his body and sharpened his mind until thought and action have become one. Though he chooses to enter into violence as a last resort, the grace and speed with which he wields his blade ..."
  },
  {
    "id": "missfortune",
    "key": "21",
    "name": "Miss Fortune",
    "title": "the Bounty Hunter",
    "tags": [
      "Marksman"
    ],
    "stats": {
      "hp": 530,
      "hpperlevel": 85,
      "mp": 325.84,
      "mpperlevel": 35,
      "movespeed": 325,
      "armor": 24.04,
      "armorperlevel": 3,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 550,
      "hpregen": 6.19,
      "hpregenperlevel": 0.65,
      "mpregen": 8.04,
      "mpregenperlevel": 0.65,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 46,
      "attackdamageperlevel": 1,
      "attackspeedoffset": -0.04734,
      "attackspeedperlevel": 3
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/MissFortune.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 288,
      "y": 0
    },
    "description": "''The bigger the risk, the bigger the bounty.''<br><br>Beauty and danger: There are few who can match Miss Fortune in either. One of Bilgewater's most infamous bounty hunters, she built her legend upon a swathe of bullet-riddled corpses and captured ..."
  },
  {
    "id": "monkeyking",
    "key": "62",
    "name": "Wukong",
    "title": "the Monkey King",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "stats": {
      "hp": 577.8,
      "hpperlevel": 85,
      "mp": 265.84,
      "mpperlevel": 38,
      "movespeed": 345,
      "armor": 24.88,
      "armorperlevel": 3.5,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 175,
      "hpregen": 6.19,
      "hpregenperlevel": 0.65,
      "mpregen": 8.04,
      "mpregenperlevel": 0.65,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 59.876,
      "attackdamageperlevel": 3.2,
      "attackspeedoffset": -0.05,
      "attackspeedperlevel": 3
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/MonkeyKing.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 336,
      "y": 0
    },
    "description": "During the chaos of the Rune Wars, an enormous runestone was lost deep within the Plague Jungles. It remained there, untouched for centuries, emanating a potent magic which infused nearby wildlife with sentience and vitality. A group of monkeys who ..."
  },
  {
    "id": "mordekaiser",
    "key": "82",
    "name": "Mordekaiser",
    "title": "the Iron Revenant",
    "tags": [
      "Fighter"
    ],
    "stats": {
      "hp": 525,
      "hpperlevel": 73,
      "mp": 0,
      "mpperlevel": 0,
      "movespeed": 325,
      "armor": 20,
      "armorperlevel": 3.75,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 175,
      "hpregen": 4,
      "hpregenperlevel": 0.3,
      "mpregen": 0,
      "mpregenperlevel": 0,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 61,
      "attackdamageperlevel": 5,
      "attackspeedoffset": 0.04,
      "attackspeedperlevel": 2.2
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Mordekaiser.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 384,
      "y": 0
    },
    "description": "''All things must die... and yet I live on.''<br><br>The baleful revenant Mordekaiser is among the most terrifying and hateful spirits haunting the Shadow Isles. He has existed for countless centuries, shielded from true death by necromantic sorcery ..."
  },
  {
    "id": "morgana",
    "key": "25",
    "name": "Morgana",
    "title": "Fallen Angel",
    "tags": [
      "Mage",
      "Support"
    ],
    "stats": {
      "hp": 547.48,
      "hpperlevel": 86,
      "mp": 340.8,
      "mpperlevel": 60,
      "movespeed": 335,
      "armor": 25.384,
      "armorperlevel": 3.8,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 450,
      "hpregen": 5.705,
      "hpregenperlevel": 0.6,
      "mpregen": 8.5,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 55.46,
      "attackdamageperlevel": 3.5,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 1.53
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Morgana.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 432,
      "y": 0
    },
    "description": "There is a world far away populated by graceful and beautiful winged beings gifted with immortality, where an ancient conflict still rages. Like so many conflicts, this war split families. One side proclaimed themselves as beings of perfect order and ..."
  },
  {
    "id": "nami",
    "key": "267",
    "name": "Nami",
    "title": "the Tidecaller",
    "tags": [
      "Support",
      "Mage"
    ],
    "stats": {
      "hp": 489.32,
      "hpperlevel": 74,
      "mp": 377.24,
      "mpperlevel": 43,
      "movespeed": 335,
      "armor": 19.72,
      "armorperlevel": 4,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 550,
      "hpregen": 5.42,
      "hpregenperlevel": 0.55,
      "mpregen": 11.5,
      "mpregenperlevel": 0.4,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 51.208,
      "attackdamageperlevel": 3.1,
      "attackspeedoffset": -0.03,
      "attackspeedperlevel": 2.61
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Nami.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 0,
      "y": 48
    },
    "description": "Nami channels the primal energies of the ocean, harnessing its mystical restorative properties and commanding the raw power of the tides themselves. Though many doubted her, Nami had the bravery and determination to take on a dangerous quest when no ..."
  },
  {
    "id": "nasus",
    "key": "75",
    "name": "Nasus",
    "title": "the Curator of the Sands",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "stats": {
      "hp": 561.2,
      "hpperlevel": 90,
      "mp": 325.6,
      "mpperlevel": 42,
      "movespeed": 350,
      "armor": 24.88,
      "armorperlevel": 3.5,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 9.01,
      "hpregenperlevel": 0.9,
      "mpregen": 7.44,
      "mpregenperlevel": 0.5,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 59.18,
      "attackdamageperlevel": 3.5,
      "attackspeedoffset": -0.02,
      "attackspeedperlevel": 3.48
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Nasus.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 48,
      "y": 48
    },
    "description": "''What was fallen will be great again.''<br><br>Nasus is an imposing, jackal-headed Ascended being from ancient Shurima, a heroic figure regarded as a demigod by the people of the desert. Fiercely intelligent, he was a guardian of knowledge and ..."
  },
  {
    "id": "nautilus",
    "key": "111",
    "name": "Nautilus",
    "title": "the Titan of the Depths",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "stats": {
      "hp": 576.48,
      "hpperlevel": 86,
      "mp": 334,
      "mpperlevel": 47,
      "movespeed": 325,
      "armor": 26.46,
      "armorperlevel": 3.75,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 175,
      "hpregen": 8.37,
      "hpregenperlevel": 0.55,
      "mpregen": 8.625,
      "mpregenperlevel": 0.7,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 57.544,
      "attackdamageperlevel": 3.3,
      "attackspeedoffset": 0.02,
      "attackspeedperlevel": 1
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Nautilus.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 96,
      "y": 48
    },
    "description": "Once, Nautilus was a sailor commissioned by the Institute of War to explore the uncharted reaches of the Guardian's Sea. This expedition took him deep into unknown waters where he and his crew found a vast section of black oozing liquid that none of ..."
  },
  {
    "id": "nidalee",
    "key": "76",
    "name": "Nidalee",
    "title": "the Bestial Huntress",
    "tags": [
      "Assassin",
      "Fighter"
    ],
    "stats": {
      "hp": 511.2,
      "hpperlevel": 80,
      "mp": 295.6,
      "mpperlevel": 45,
      "movespeed": 335,
      "armor": 22.88,
      "armorperlevel": 3.5,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 525,
      "hpregen": 6.005,
      "hpregenperlevel": 0.6,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 47.88,
      "attackdamageperlevel": 3.5,
      "attackspeedoffset": -0.02,
      "attackspeedperlevel": 3.22
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Nidalee.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 144,
      "y": 48
    },
    "description": "There are few dwellers, let alone champions, residing in the blasted and dangerous lands that lie south of the Great Barrier. Much of that world still bears the scars of past Runes Wars, especially the mysterious Kumungu Jungle. There are ..."
  },
  {
    "id": "nocturne",
    "key": "56",
    "name": "Nocturne",
    "title": "the Eternal Nightmare",
    "tags": [
      "Assassin",
      "Fighter"
    ],
    "stats": {
      "hp": 582.8,
      "hpperlevel": 85,
      "mp": 273.8,
      "mpperlevel": 35,
      "movespeed": 345,
      "armor": 26.88,
      "armorperlevel": 3.5,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 8.26,
      "hpregenperlevel": 0.75,
      "mpregen": 6.755,
      "mpregenperlevel": 0.45,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 59.208,
      "attackdamageperlevel": 3.1,
      "attackspeedoffset": -0.065,
      "attackspeedperlevel": 2.7
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Nocturne.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 192,
      "y": 48
    },
    "description": "Before Nocturne, people believed that dreams were figments of their imagination, meaningless images that flashed through the mind when one slept. This belief was put to the test when a rash of sleep-related incidents started afflicting summoners of ..."
  },
  {
    "id": "nunu",
    "key": "20",
    "name": "Nunu",
    "title": "the Yeti Rider",
    "tags": [
      "Support",
      "Fighter"
    ],
    "stats": {
      "hp": 598.28,
      "hpperlevel": 90,
      "mp": 283.56,
      "mpperlevel": 42,
      "movespeed": 350,
      "armor": 26.38,
      "armorperlevel": 3.5,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 8.39,
      "hpregenperlevel": 0.8,
      "mpregen": 7.44,
      "mpregenperlevel": 0.5,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 59,
      "attackdamageperlevel": 4,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2.25
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Nunu.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 240,
      "y": 48
    },
    "description": "Sometimes bonds of friendship become stronger than even bonds of blood. When those bonds link a fearless boy to a fearsome Yeti, the bond becomes a force to be reckoned with. Given the responsibility of taming a terrifying beast, Nunu forged a ..."
  },
  {
    "id": "olaf",
    "key": "2",
    "name": "Olaf",
    "title": "the Berserker",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "stats": {
      "hp": 597.24,
      "hpperlevel": 93,
      "mp": 315.6,
      "mpperlevel": 42,
      "movespeed": 350,
      "armor": 26.04,
      "armorperlevel": 3,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 8.51,
      "hpregenperlevel": 0.9,
      "mpregen": 7.465,
      "mpregenperlevel": 0.575,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 59.98,
      "attackdamageperlevel": 3.5,
      "attackspeedoffset": -0.1,
      "attackspeedperlevel": 2.7
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Olaf.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 288,
      "y": 48
    },
    "description": "Most men would say that death is a thing to be feared; none of those men would be Olaf. The Berserker lives only for the roar of a battle cry and the clash of steel. Spurred on by his hunger for glory and the looming curse of a forgettable death, Olaf ..."
  },
  {
    "id": "orianna",
    "key": "61",
    "name": "Orianna",
    "title": "the Lady of Clockwork",
    "tags": [
      "Mage",
      "Support"
    ],
    "stats": {
      "hp": 517.72,
      "hpperlevel": 79,
      "mp": 334,
      "mpperlevel": 50,
      "movespeed": 325,
      "armor": 17.04,
      "armorperlevel": 3,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 525,
      "hpregen": 6.87,
      "hpregenperlevel": 0.55,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 40.368,
      "attackdamageperlevel": 2.6,
      "attackspeedoffset": -0.05,
      "attackspeedperlevel": 3.5
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Orianna.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 336,
      "y": 48
    },
    "description": "There once was a Piltovian man named Corin Reveck who had a daughter named Orianna, whom he loved more than anything else in the world. Though Orianna had incredible talent for dancing, she was deeply fascinated by the champions of the League of ..."
  },
  {
    "id": "pantheon",
    "key": "80",
    "name": "Pantheon",
    "title": "the Artisan of War",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "stats": {
      "hp": 579.16,
      "hpperlevel": 87,
      "mp": 317.12,
      "mpperlevel": 31,
      "movespeed": 355,
      "armor": 27.652,
      "armorperlevel": 3.9,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 150,
      "hpregen": 7.84,
      "hpregenperlevel": 0.65,
      "mpregen": 7.355,
      "mpregenperlevel": 0.45,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 55.572,
      "attackdamageperlevel": 2.9,
      "attackspeedoffset": -0.03,
      "attackspeedperlevel": 2.95
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Pantheon.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 384,
      "y": 48
    },
    "description": "''Bring forth one true champion, or a hundred more like you, and then we shall have a battle that will be spoken of until the end of time.''<br><br>The peerless warrior known as Pantheon is a nigh-unstoppable paragon of battle. He was born among the ..."
  },
  {
    "id": "poppy",
    "key": "78",
    "name": "Poppy",
    "title": "Keeper of the Hammer",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "stats": {
      "hp": 540,
      "hpperlevel": 90,
      "mp": 280,
      "mpperlevel": 40,
      "movespeed": 345,
      "armor": 29,
      "armorperlevel": 3.5,
      "spellblock": 32,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 8,
      "hpregenperlevel": 0.8,
      "mpregen": 7,
      "mpregenperlevel": 0.7,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 56,
      "attackdamageperlevel": 4,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2.5
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Poppy.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 432,
      "y": 48
    },
    "description": "''I'm no hero. Just a yordle with a hammer.''<br><br>Runeterra has no shortage of valiant champions, but few are as tenacious as Poppy. Bearing a hammer twice the length of her body, this determined yordle has spent untold years searching for the ..."
  },
  {
    "id": "quinn",
    "key": "133",
    "name": "Quinn",
    "title": "Demacia's Wings",
    "tags": [
      "Marksman",
      "Fighter"
    ],
    "stats": {
      "hp": 532.8,
      "hpperlevel": 85,
      "mp": 268.8,
      "mpperlevel": 35,
      "movespeed": 335,
      "armor": 23.38,
      "armorperlevel": 3.5,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 525,
      "hpregen": 5.42,
      "hpregenperlevel": 0.55,
      "mpregen": 6.97,
      "mpregenperlevel": 0.4,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 54.46,
      "attackdamageperlevel": 2.41,
      "attackspeedoffset": -0.065,
      "attackspeedperlevel": 3.1
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Quinn.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 0,
      "y": 96
    },
    "description": "Quinn and Valor are an elite ranger team. With crossbow and claw, they undertake their nation's most dangerous missions deep within enemy territory, from swift reconnaissance to lethal strikes. The pair's unbreakable bond is deadly on the battlefield, ..."
  },
  {
    "id": "rammus",
    "key": "33",
    "name": "Rammus",
    "title": "the Armordillo",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "stats": {
      "hp": 564.48,
      "hpperlevel": 86,
      "mp": 310.44,
      "mpperlevel": 33,
      "movespeed": 335,
      "armor": 31.384,
      "armorperlevel": 4.3,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 7.92,
      "hpregenperlevel": 0.55,
      "mpregen": 7.84,
      "mpregenperlevel": 0.5,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 55.88,
      "attackdamageperlevel": 3.5,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2.215
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Rammus.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 48,
      "y": 96
    },
    "description": "''OK.''<br><br>Idolized by many, dismissed by some, mystifying to all, the curious being, Rammus, is an enigma. Protected by a spiked shell, Rammus inspires increasingly disparate theories on his origin wherever he goes - from demigod, to sacred ..."
  },
  {
    "id": "reksai",
    "key": "421",
    "name": "Rek'Sai",
    "title": "the Void Burrower",
    "tags": [
      "Fighter"
    ],
    "stats": {
      "hp": 570,
      "hpperlevel": 90,
      "mp": 100,
      "mpperlevel": 0,
      "movespeed": 335,
      "armor": 24,
      "armorperlevel": 3.4,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 175,
      "hpregen": 7.34,
      "hpregenperlevel": 0.65,
      "mpregen": 0,
      "mpregenperlevel": 0,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 55.628,
      "attackdamageperlevel": 3.35,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/RekSai.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 96,
      "y": 96
    },
    "description": "The largest and fiercest of her species, Rek'Sai is a merciless predator that tunnels through the earth to ambush and devour her prey. Her insatiable hunger has laid waste to entire regions of the once-great Shuriman empire. Merchants, traders and ..."
  },
  {
    "id": "renekton",
    "key": "58",
    "name": "Renekton",
    "title": "the Butcher of the Sands",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "stats": {
      "hp": 572.16,
      "hpperlevel": 87,
      "mp": 100,
      "mpperlevel": 0,
      "movespeed": 345,
      "armor": 25.584,
      "armorperlevel": 3.8,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 7.96,
      "hpregenperlevel": 0.75,
      "mpregen": 0,
      "mpregenperlevel": 0,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 58.328,
      "attackdamageperlevel": 3.1,
      "attackspeedoffset": -0.06,
      "attackspeedperlevel": 2.65
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Renekton.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 144,
      "y": 96
    },
    "description": "''Blood and vengeance.''<br><br>Renekton is a terrifying, rage-fueled Ascended being from the scorched deserts of Shurima. Once, he was his empire's most esteemed warrior, leading the armies of Shurima to countless victories. However, after the ..."
  },
  {
    "id": "rengar",
    "key": "107",
    "name": "Rengar",
    "title": "the Pridestalker",
    "tags": [
      "Assassin",
      "Fighter"
    ],
    "stats": {
      "hp": 586.2,
      "hpperlevel": 90,
      "mp": 5,
      "mpperlevel": 0,
      "movespeed": 345,
      "armor": 25.88,
      "armorperlevel": 3.5,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 4.27,
      "hpregenperlevel": 0.4,
      "mpregen": 0,
      "mpregenperlevel": 0,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 60.04,
      "attackdamageperlevel": 3,
      "attackspeedoffset": -0.08,
      "attackspeedperlevel": 2.85
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Rengar.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 192,
      "y": 96
    },
    "description": "On every wall of his den, the trophy hunter Rengar mounts the heads, horns, claws, and fangs of the most lethal creatures in Valoran. Though his collection is extensive, he remains unsatisfied, tirelessly seeking greater game. He takes time with every ..."
  },
  {
    "id": "riven",
    "key": "92",
    "name": "Riven",
    "title": "the Exile",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "stats": {
      "hp": 558.48,
      "hpperlevel": 86,
      "mp": 0,
      "mpperlevel": 0,
      "movespeed": 340,
      "armor": 24.376,
      "armorperlevel": 3.2,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 5.34,
      "hpregenperlevel": 0.5,
      "mpregen": 0,
      "mpregenperlevel": 0,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 56.04,
      "attackdamageperlevel": 3,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 3.5
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Riven.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 240,
      "y": 96
    },
    "description": "''There is a place between war and murder in which our demons lurk.''<br><br>In Noxus, any citizen may rise to power regardless of race, gender, or social standing - strength is all that matters. It was with committed faith in this ideal that Riven ..."
  },
  {
    "id": "rumble",
    "key": "68",
    "name": "Rumble",
    "title": "the Mechanized Menace",
    "tags": [
      "Fighter",
      "Mage"
    ],
    "stats": {
      "hp": 584.4,
      "hpperlevel": 80,
      "mp": 100,
      "mpperlevel": 0,
      "movespeed": 345,
      "armor": 25.88,
      "armorperlevel": 3.5,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 8.005,
      "hpregenperlevel": 0.6,
      "mpregen": 0,
      "mpregenperlevel": 0,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 61.036,
      "attackdamageperlevel": 3.2,
      "attackspeedoffset": -0.03,
      "attackspeedperlevel": 1.85
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Rumble.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 288,
      "y": 96
    },
    "description": "''Ugh, it's gonna take forever to scrape your face off my suit!''<br><br>Even amongst yordles, Rumble was always the runt of the litter. As such, he was used to being bullied. In order to survive, he had to be scrappier and more resourceful than his ..."
  },
  {
    "id": "ryze",
    "key": "13",
    "name": "Ryze",
    "title": "the Rune Mage",
    "tags": [
      "Mage",
      "Fighter"
    ],
    "stats": {
      "hp": 558.48,
      "hpperlevel": 86,
      "mp": 400,
      "mpperlevel": 50,
      "movespeed": 340,
      "armor": 21.552,
      "armorperlevel": 3,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 550,
      "hpregen": 7,
      "hpregenperlevel": 0.55,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 55.04,
      "attackdamageperlevel": 3,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2.112
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Ryze.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 336,
      "y": 96
    },
    "description": "''Take care with this world. What is made can be unmade.''<br><br>Widely considered one of the most adept sorcerers on Runeterra, Ryze is an ancient, hard-bitten archmage with an impossibly heavy burden to bear. Armed with a boundless constitution and ..."
  },
  {
    "id": "sejuani",
    "key": "113",
    "name": "Sejuani",
    "title": "the Winter's Wrath",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "stats": {
      "hp": 600,
      "hpperlevel": 95,
      "mp": 400,
      "mpperlevel": 40,
      "movespeed": 340,
      "armor": 29.54,
      "armorperlevel": 3,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 8.675,
      "hpregenperlevel": 0.85,
      "mpregen": 7.205,
      "mpregenperlevel": 0.45,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 57.544,
      "attackdamageperlevel": 3.3,
      "attackspeedoffset": -0.0672,
      "attackspeedperlevel": 1.44
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Sejuani.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 384,
      "y": 96
    },
    "description": "Sejuani was weaned on hardship and reared on barbarity. Where others succumbed to the harshness of the Freljord, she was tempered by it until pain became power, hunger an encouragement, and frost an ally in culling the weak. Through her ordeals, she ..."
  },
  {
    "id": "shaco",
    "key": "35",
    "name": "Shaco",
    "title": "the Demon Jester",
    "tags": [
      "Assassin"
    ],
    "stats": {
      "hp": 582.12,
      "hpperlevel": 84,
      "mp": 297.2,
      "mpperlevel": 40,
      "movespeed": 350,
      "armor": 24.88,
      "armorperlevel": 3.5,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 8.37,
      "hpregenperlevel": 0.55,
      "mpregen": 7.155,
      "mpregenperlevel": 0.45,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 57.58,
      "attackdamageperlevel": 3.5,
      "attackspeedoffset": -0.1,
      "attackspeedperlevel": 3
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Shaco.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion2.png",
      "x": 432,
      "y": 96
    },
    "description": "Most would say that death isn't funny. It isn't, unless you're Shaco - then it's hysterical. He is Valoran's first fully functioning homicidal comic; he jests until someone dies, and then he laughs. The figure that has come to be known as the Demon ..."
  },
  {
    "id": "shen",
    "key": "98",
    "name": "Shen",
    "title": "the Eye of Twilight",
    "tags": [
      "Tank",
      "Melee"
    ],
    "stats": {
      "hp": 540,
      "hpperlevel": 73,
      "mp": 400,
      "mpperlevel": 0,
      "movespeed": 340,
      "armor": 25,
      "armorperlevel": 2.6,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 8.5,
      "hpregenperlevel": 0.75,
      "mpregen": 50,
      "mpregenperlevel": 0,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 60,
      "attackdamageperlevel": 3,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Shen.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 0,
      "y": 0
    },
    "description": "''The Eye is blind to fear, to hate, to love - to all things that would sway equilibrium.''<br><br>Leader of a secret clan of mystic warriors, Shen serves as the Eye of Twilight, entrusted to enforce equilibrium in the world. Longing to remain free ..."
  },
  {
    "id": "shyvana",
    "key": "102",
    "name": "Shyvana",
    "title": "the Half-Dragon",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "stats": {
      "hp": 594.6,
      "hpperlevel": 95,
      "mp": 100,
      "mpperlevel": 0,
      "movespeed": 350,
      "armor": 27.628,
      "armorperlevel": 3.35,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 8.59,
      "hpregenperlevel": 0.8,
      "mpregen": 0,
      "mpregenperlevel": 0,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 60.712,
      "attackdamageperlevel": 3.4,
      "attackspeedoffset": -0.05,
      "attackspeedperlevel": 2.5
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Shyvana.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 48,
      "y": 0
    },
    "description": "A half-breed born from the union between dragon and human, Shyvana searched all her life for belonging. Persecution forged her into a brutal warrior, and those who dare stand against Shyvana face the fiery beast lurking just beneath her skin...."
  },
  {
    "id": "singed",
    "key": "27",
    "name": "Singed",
    "title": "the Mad Chemist",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "stats": {
      "hp": 542.76,
      "hpperlevel": 82,
      "mp": 290.6,
      "mpperlevel": 45,
      "movespeed": 345,
      "armor": 27.88,
      "armorperlevel": 3.5,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 8.02,
      "hpregenperlevel": 0.55,
      "mpregen": 7.52,
      "mpregenperlevel": 0.55,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 62.32,
      "attackdamageperlevel": 3.375,
      "attackspeedoffset": 0.02,
      "attackspeedperlevel": 1.81
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Singed.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 96,
      "y": 0
    },
    "description": "Singed descended from a long line of Zaun's revered chemists. Even in his youth, his talent for concocting potions far outstripped that of his peers, and he quickly distinguished himself from his less extraordinary chemist compatriots. It came as no ..."
  },
  {
    "id": "sion",
    "key": "14",
    "name": "Sion",
    "title": "The Undead Juggernaut",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "stats": {
      "hp": 542.64,
      "hpperlevel": 73,
      "mp": 325.6,
      "mpperlevel": 42,
      "movespeed": 345,
      "armor": 23.04,
      "armorperlevel": 3,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 175,
      "hpregen": 10.18,
      "hpregenperlevel": 0.8,
      "mpregen": 8.005,
      "mpregenperlevel": 0.6,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 59.72,
      "attackdamageperlevel": 4,
      "attackspeedoffset": -0.08,
      "attackspeedperlevel": 1.3
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Sion.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 144,
      "y": 0
    },
    "description": "BLOOD.<br><br>SMELL IT.<br><br>WANT. ACHING. NEED!<br><br>CLOSE NOW. THEY COME.<br><br>NO CHAINS? FREE! KILL!<br><br>IN REACH. YES! DIE! DIE!<br><br>Gone. Too quick. No fight. More. I want... more.<br><br>A voice? Unfamiliar. I see him. The Grand ..."
  },
  {
    "id": "sivir",
    "key": "15",
    "name": "Sivir",
    "title": "the Battle Mistress",
    "tags": [
      "Marksman"
    ],
    "stats": {
      "hp": 515.76,
      "hpperlevel": 82,
      "mp": 284,
      "mpperlevel": 50,
      "movespeed": 335,
      "armor": 22.21,
      "armorperlevel": 3.25,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 500,
      "hpregen": 5.17,
      "hpregenperlevel": 0.55,
      "mpregen": 8.01,
      "mpregenperlevel": 0.9,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 57.46,
      "attackdamageperlevel": 2.41,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 1.6
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Sivir.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 192,
      "y": 0
    },
    "description": "''I don't care what face is on your coin, as long as it pays.''<br><br>Sivir is a renowned fortune hunter and mercenary captain who plies her trade in the deserts of Shurima. Armed with her legendary jeweled crossblade, she has fought and won ..."
  },
  {
    "id": "skarner",
    "key": "72",
    "name": "Skarner",
    "title": "the Crystal Vanguard",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "stats": {
      "hp": 601.28,
      "hpperlevel": 90,
      "mp": 272.2,
      "mpperlevel": 40,
      "movespeed": 335,
      "armor": 29.384,
      "armorperlevel": 3.8,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 8.925,
      "hpregenperlevel": 0.85,
      "mpregen": 7.205,
      "mpregenperlevel": 0.45,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 57.156,
      "attackdamageperlevel": 4.5,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2.1
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Skarner.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 240,
      "y": 0
    },
    "description": "''We are one. We cannot be shattered.''<br><br>Skarner is an immense crystalline scorpion from a hidden valley in Shurima. Part of the ancient Brackern race, Skarner and his kin are known for their great wisdom and deep connection to the land, as ..."
  },
  {
    "id": "sona",
    "key": "37",
    "name": "Sona",
    "title": "Maven of the Strings",
    "tags": [
      "Support",
      "Mage"
    ],
    "stats": {
      "hp": 482.36,
      "hpperlevel": 77,
      "mp": 340.6,
      "mpperlevel": 45,
      "movespeed": 325,
      "armor": 20.544,
      "armorperlevel": 3.3,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 550,
      "hpregen": 5.42,
      "hpregenperlevel": 0.55,
      "mpregen": 11.5,
      "mpregenperlevel": 0.4,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 50.04,
      "attackdamageperlevel": 3,
      "attackspeedoffset": -0.03,
      "attackspeedperlevel": 2.3
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Sona.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 288,
      "y": 0
    },
    "description": "Sona has no memories of her true parents. As an infant, she was found abandoned on the doorstep of an Ionian adoption house, nestled atop an ancient instrument in an exquisite case of unknown origins. She was an unusually well-behaved child, always ..."
  },
  {
    "id": "soraka",
    "key": "16",
    "name": "Soraka",
    "title": "the Starchild",
    "tags": [
      "Support",
      "Mage"
    ],
    "stats": {
      "hp": 529.04,
      "hpperlevel": 78,
      "mp": 350.8,
      "mpperlevel": 60,
      "movespeed": 325,
      "armor": 23.384,
      "armorperlevel": 3.8,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 550,
      "hpregen": 2.5,
      "hpregenperlevel": 0.5,
      "mpregen": 11.5,
      "mpregenperlevel": 0.4,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 50.04,
      "attackdamageperlevel": 3,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2.14
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Soraka.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 336,
      "y": 0
    },
    "description": "A healer gifted with the magic of the stars, Soraka holds all living creatures close to her heart. She was once a celestial being, but she sacrificed her immortality and entered the world of mortals. So long as evil threatens life in Valoran, Soraka ..."
  },
  {
    "id": "swain",
    "key": "50",
    "name": "Swain",
    "title": "the Master Tactician",
    "tags": [
      "Mage",
      "Fighter"
    ],
    "stats": {
      "hp": 516.04,
      "hpperlevel": 90,
      "mp": 374,
      "mpperlevel": 47,
      "movespeed": 335,
      "armor": 22.72,
      "armorperlevel": 4,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 500,
      "hpregen": 7.84,
      "hpregenperlevel": 0.65,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 52.04,
      "attackdamageperlevel": 3,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2.11
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Swain.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 384,
      "y": 0
    },
    "description": "The earliest account of Swain's existence comes from a Noxian infirmary doctor's notes. According to them, Swain limped into the ward without cry or complaint; his right leg was snapped in half, with bone protruding from the skin. A small, scowling ..."
  },
  {
    "id": "syndra",
    "key": "134",
    "name": "Syndra",
    "title": "the Dark Sovereign",
    "tags": [
      "Mage",
      "Support"
    ],
    "stats": {
      "hp": 511.04,
      "hpperlevel": 78,
      "mp": 384,
      "mpperlevel": 60,
      "movespeed": 330,
      "armor": 24.712,
      "armorperlevel": 3.4,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 550,
      "hpregen": 6.505,
      "hpregenperlevel": 0.6,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 53.872,
      "attackdamageperlevel": 2.9,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Syndra.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 432,
      "y": 0
    },
    "description": "Born with immense magical potential, Syndra loves nothing more than exercising the incredible power at her command. With each passing day, her mastery of magical force grows more potent and devastating. Refusing any notion of balance or restraint, ..."
  },
  {
    "id": "tahmkench",
    "key": "223",
    "name": "Tahm Kench",
    "title": "the River King",
    "tags": [
      "Support",
      "Tank"
    ],
    "stats": {
      "hp": 610,
      "hpperlevel": 95,
      "mp": 325,
      "mpperlevel": 40,
      "movespeed": 335,
      "armor": 27,
      "armorperlevel": 3.5,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 175,
      "hpregen": 6.5,
      "hpregenperlevel": 0.55,
      "mpregen": 8,
      "mpregenperlevel": 1,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 56,
      "attackdamageperlevel": 3.2,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2.5
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/TahmKench.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 0,
      "y": 48
    },
    "description": "''The whole world's a river, and I'm its king.''<br>Tahm Kench travels Runeterra's waterways, feeding his insatiable appetite with the misery of the unsuspecting. The singularly charming gourmand savors every moment of his victims' suffering.  A deal ..."
  },
  {
    "id": "taliyah",
    "key": "163",
    "name": "Taliyah",
    "title": "the Stoneweaver",
    "tags": [
      "Mage",
      "Support"
    ],
    "stats": {
      "hp": 520,
      "hpperlevel": 75,
      "mp": 340,
      "mpperlevel": 60,
      "movespeed": 325,
      "armor": 20,
      "armorperlevel": 3,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 525,
      "hpregen": 7,
      "hpregenperlevel": 0.7,
      "mpregen": 7,
      "mpregenperlevel": 0.85,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 56,
      "attackdamageperlevel": 3.3,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 1.36
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Taliyah.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 48,
      "y": 48
    },
    "description": "Taliyah is a nomadic mage from Shurima who weaves stone with energetic enthusiasm and raw determination. Torn between teenage wonder and adult responsibility, she has crossed nearly all of Valoran on a journey to learn the true nature of her growing ..."
  },
  {
    "id": "talon",
    "key": "91",
    "name": "Talon",
    "title": "the Blade's Shadow",
    "tags": [
      "Assassin",
      "Fighter"
    ],
    "stats": {
      "hp": 582.8,
      "hpperlevel": 85,
      "mp": 377.2,
      "mpperlevel": 37,
      "movespeed": 350,
      "armor": 26.88,
      "armorperlevel": 3.5,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 8.51,
      "hpregenperlevel": 0.75,
      "mpregen": 7.59,
      "mpregenperlevel": 0.5,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 55.208,
      "attackdamageperlevel": 3.1,
      "attackspeedoffset": -0.065,
      "attackspeedperlevel": 2.7
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Talon.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 96,
      "y": 48
    },
    "description": "''The three deadliest blademasters in all of Valoran are bound to the house of Du Couteau: my father, myself, and Talon. Challenge us, if you dare.''<br>-- Katarina Du Couteau<br><br>Talon's earliest memories are the darkness of Noxus' underground ..."
  },
  {
    "id": "taric",
    "key": "44",
    "name": "Taric",
    "title": "the Shield of Valoran",
    "tags": [
      "Support",
      "Fighter"
    ],
    "stats": {
      "hp": 575,
      "hpperlevel": 90,
      "mp": 300,
      "mpperlevel": 60,
      "movespeed": 340,
      "armor": 25,
      "armorperlevel": 3.4,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 150,
      "hpregen": 6,
      "hpregenperlevel": 0.5,
      "mpregen": 5,
      "mpregenperlevel": 1,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 55,
      "attackdamageperlevel": 3.5,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Taric.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 144,
      "y": 48
    },
    "description": "''The best weapons are beautiful.''<br><br>Taric is the Aspect of the Protector, wielding incredible power as Runeterra's guardian of life, love, and beauty. Shamed by a dereliction of duty and exiled from his homeland Demacia, Taric ascended Mount ..."
  },
  {
    "id": "teemo",
    "key": "17",
    "name": "Teemo",
    "title": "the Swift Scout",
    "tags": [
      "Marksman",
      "Assassin"
    ],
    "stats": {
      "hp": 515.76,
      "hpperlevel": 82,
      "mp": 267.2,
      "mpperlevel": 40,
      "movespeed": 330,
      "armor": 24.3,
      "armorperlevel": 3.75,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 500,
      "hpregen": 5.74,
      "hpregenperlevel": 0.65,
      "mpregen": 7.205,
      "mpregenperlevel": 0.45,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 49.54,
      "attackdamageperlevel": 3,
      "attackspeedoffset": -0.0947,
      "attackspeedperlevel": 3.38
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Teemo.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 192,
      "y": 48
    },
    "description": "Teemo is a legend among his yordle brothers and sisters in Bandle City. As far as yordles are concerned, there is something just slightly off about him. While Teemo enjoys the companionship of other yordles, he also insists on frequent solo missions ..."
  },
  {
    "id": "thresh",
    "key": "412",
    "name": "Thresh",
    "title": "the Chain Warden",
    "tags": [
      "Support",
      "Fighter"
    ],
    "stats": {
      "hp": 560.52,
      "hpperlevel": 93,
      "mp": 273.92,
      "mpperlevel": 44,
      "movespeed": 335,
      "armor": 16,
      "armorperlevel": 0,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 450,
      "hpregen": 6.92,
      "hpregenperlevel": 0.55,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 47.696,
      "attackdamageperlevel": 2.2,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 3.5
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Thresh.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 240,
      "y": 48
    },
    "description": "''The mind is a wondrous thing to tear apart.''<br><br>Sadistic and cunning, Thresh is a restless spirit who prides himself on tormenting mortals and breaking them with slow, excruciating inventiveness. His victims suffer far beyond the point of death,..."
  },
  {
    "id": "tristana",
    "key": "18",
    "name": "Tristana",
    "title": "the Yordle Gunner",
    "tags": [
      "Marksman",
      "Assassin"
    ],
    "stats": {
      "hp": 542.76,
      "hpperlevel": 82,
      "mp": 246.76,
      "mpperlevel": 32,
      "movespeed": 325,
      "armor": 22,
      "armorperlevel": 3,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 550,
      "hpregen": 6.19,
      "hpregenperlevel": 0.65,
      "mpregen": 7.205,
      "mpregenperlevel": 0.45,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 56.96,
      "attackdamageperlevel": 2.41,
      "attackspeedoffset": -0.04734,
      "attackspeedperlevel": 1.5
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Tristana.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 288,
      "y": 48
    },
    "description": "Greatness comes in all shapes and sizes, as proven by this diminutive, cannon-wielding yordle. In a world fraught with turmoil, Tristana refuses to back down from any challenge. She represents the pinnacle of martial proficiency, unwavering courage, ..."
  },
  {
    "id": "trundle",
    "key": "48",
    "name": "Trundle",
    "title": "the Troll King",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "stats": {
      "hp": 616.28,
      "hpperlevel": 96,
      "mp": 281.6,
      "mpperlevel": 45,
      "movespeed": 350,
      "armor": 27.536,
      "armorperlevel": 2.7,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 175,
      "hpregen": 6,
      "hpregenperlevel": 0.75,
      "mpregen": 7.505,
      "mpregenperlevel": 0.6,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 60.04,
      "attackdamageperlevel": 3,
      "attackspeedoffset": -0.0672,
      "attackspeedperlevel": 2.9
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Trundle.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 336,
      "y": 48
    },
    "description": "Trundle is a hulking and devious troll with a mischievous streak. There is nothing he can't beat into submission and bend to his will, not even the ice itself. With his massive, frozen club, he chills his enemies to the core and runs them through with ..."
  },
  {
    "id": "tryndamere",
    "key": "23",
    "name": "Tryndamere",
    "title": "the Barbarian King",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "stats": {
      "hp": 625.64,
      "hpperlevel": 98,
      "mp": 100,
      "mpperlevel": 0,
      "movespeed": 345,
      "armor": 24.108,
      "armorperlevel": 3.1,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 8.51,
      "hpregenperlevel": 0.9,
      "mpregen": 0,
      "mpregenperlevel": 0,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 61.376,
      "attackdamageperlevel": 3.2,
      "attackspeedoffset": -0.0672,
      "attackspeedperlevel": 2.9
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Tryndamere.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 384,
      "y": 48
    },
    "description": "Fueled by his unbridled fury and rage, Tryndamere cuts his way through the tundra, mastering the art of battle by challenging the Freljord's greatest warriors. The wrathful barbarian seeks revenge on the one who decimated his clan and strikes down all ..."
  },
  {
    "id": "twistedfate",
    "key": "4",
    "name": "Twisted Fate",
    "title": "the Card Master",
    "tags": [
      "Mage"
    ],
    "stats": {
      "hp": 521.76,
      "hpperlevel": 82,
      "mp": 265.84,
      "mpperlevel": 38,
      "movespeed": 330,
      "armor": 20.542,
      "armorperlevel": 3.15,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 525,
      "hpregen": 5.505,
      "hpregenperlevel": 0.6,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 49.954,
      "attackdamageperlevel": 3.3,
      "attackspeedoffset": -0.04,
      "attackspeedperlevel": 3.22
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/TwistedFate.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 432,
      "y": 48
    },
    "description": "Twisted Fate is an infamous card sharp and swindler who has gambled and charmed his way across much of the known world, earning the enmity and admiration of the rich and foolish alike. He rarely takes things seriously, greeting each day with a mocking ..."
  },
  {
    "id": "twitch",
    "key": "29",
    "name": "Twitch",
    "title": "the Plague Rat",
    "tags": [
      "Marksman",
      "Assassin"
    ],
    "stats": {
      "hp": 525.08,
      "hpperlevel": 81,
      "mp": 287.2,
      "mpperlevel": 40,
      "movespeed": 330,
      "armor": 23.04,
      "armorperlevel": 3,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 550,
      "hpregen": 6.005,
      "hpregenperlevel": 0.6,
      "mpregen": 7.255,
      "mpregenperlevel": 0.45,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 55.46,
      "attackdamageperlevel": 2.41,
      "attackspeedoffset": -0.08,
      "attackspeedperlevel": 3.38
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Twitch.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 0,
      "y": 96
    },
    "description": "H.I.V.E. Incident Report<br>Code Violation: Industrial Homicide<br>Casefile Status: Unsolved<br>Investigating Agent: Rol, P.<br><br>Team responded to report of suspicious character, criminal activity; proceeded to Sump Works, Sector 90TZ. Sector 90TZ ..."
  },
  {
    "id": "udyr",
    "key": "77",
    "name": "Udyr",
    "title": "the Spirit Walker",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "stats": {
      "hp": 593.32,
      "hpperlevel": 99,
      "mp": 270.4,
      "mpperlevel": 30,
      "movespeed": 345,
      "armor": 25.47,
      "armorperlevel": 4,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 6,
      "hpregenperlevel": 0.75,
      "mpregen": 7.505,
      "mpregenperlevel": 0.45,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 58.286,
      "attackdamageperlevel": 3.2,
      "attackspeedoffset": -0.05,
      "attackspeedperlevel": 2.67
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Udyr.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 48,
      "y": 96
    },
    "description": "Udyr is more than a man; he is a vessel for the untamed power of four primal animal spirits. When tapping into the spirits' bestial natures, Udyr can harness their unique strengths: the tiger grants him speed and ferocity, the turtle resilience, the ..."
  },
  {
    "id": "urgot",
    "key": "6",
    "name": "Urgot",
    "title": "the Headsman's Pride",
    "tags": [
      "Marksman",
      "Fighter"
    ],
    "stats": {
      "hp": 586.52,
      "hpperlevel": 89,
      "mp": 312.4,
      "mpperlevel": 55,
      "movespeed": 335,
      "armor": 24.544,
      "armorperlevel": 3.3,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 425,
      "hpregen": 6.505,
      "hpregenperlevel": 0.6,
      "mpregen": 8.59,
      "mpregenperlevel": 0.65,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 54.05,
      "attackdamageperlevel": 3.6,
      "attackspeedoffset": -0.03,
      "attackspeedperlevel": 2.9
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Urgot.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 96,
      "y": 96
    },
    "description": "There are warriors who become great for their strength, cunning, or skill with arms. Others simply refuse to die. Urgot, once a great soldier of Noxus, may constitute a case in support of the latter. Prone to diving headlong into enemy battle lines, ..."
  },
  {
    "id": "varus",
    "key": "110",
    "name": "Varus",
    "title": "the Arrow of Retribution",
    "tags": [
      "Marksman",
      "Mage"
    ],
    "stats": {
      "hp": 537.76,
      "hpperlevel": 82,
      "mp": 360.48,
      "mpperlevel": 33,
      "movespeed": 330,
      "armor": 23.212,
      "armorperlevel": 3.4,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 575,
      "hpregen": 5.42,
      "hpregenperlevel": 0.55,
      "mpregen": 7.34,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 54.66,
      "attackdamageperlevel": 2.41,
      "attackspeedoffset": -0.05,
      "attackspeedperlevel": 3
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Varus.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 144,
      "y": 96
    },
    "description": "''The life of an arrow is fleeting, built of nothing but direction and intent.''<br><br>For his incomparable skill with the bow and his unquestioned sense of honor, Varus was chosen to be the warden of a sacred Ionian temple. The temple was built to ..."
  },
  {
    "id": "vayne",
    "key": "67",
    "name": "Vayne",
    "title": "the Night Hunter",
    "tags": [
      "Marksman",
      "Assassin"
    ],
    "stats": {
      "hp": 498.44,
      "hpperlevel": 83,
      "mp": 231.8,
      "mpperlevel": 35,
      "movespeed": 330,
      "armor": 19.012,
      "armorperlevel": 3.4,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 550,
      "hpregen": 5.42,
      "hpregenperlevel": 0.55,
      "mpregen": 6.97,
      "mpregenperlevel": 0.4,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 55.88,
      "attackdamageperlevel": 1.66,
      "attackspeedoffset": -0.05,
      "attackspeedperlevel": 4
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Vayne.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 192,
      "y": 96
    },
    "description": "The world is not always as civilized as people might think. There are still those who would follow the blackest paths of magic and become corrupted by the darker powers that flow through Runeterra. Shauna Vayne knows this fact well.<br><br>As a young ..."
  },
  {
    "id": "veigar",
    "key": "45",
    "name": "Veigar",
    "title": "the Tiny Master of Evil",
    "tags": [
      "Mage"
    ],
    "stats": {
      "hp": 492.76,
      "hpperlevel": 82,
      "mp": 392.4,
      "mpperlevel": 52,
      "movespeed": 340,
      "armor": 22.55,
      "armorperlevel": 3.75,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 525,
      "hpregen": 5.42,
      "hpregenperlevel": 0.55,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 50.71,
      "attackdamageperlevel": 2.625,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2.24
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Veigar.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 240,
      "y": 96
    },
    "description": "To most, thoughts of yordles do not conjure images to be feared. The easygoing half-pint race, though fierce, is often regarded with some degree of joviality. Their high-pitched voices and naturally cute forms inspire something of a protective ..."
  },
  {
    "id": "velkoz",
    "key": "161",
    "name": "Vel'Koz",
    "title": "the Eye of the Void",
    "tags": [
      "Mage"
    ],
    "stats": {
      "hp": 507.68,
      "hpperlevel": 76,
      "mp": 375.6,
      "mpperlevel": 42,
      "movespeed": 340,
      "armor": 21.88,
      "armorperlevel": 3.5,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 525,
      "hpregen": 5.42,
      "hpregenperlevel": 0.55,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 54.9379,
      "attackdamageperlevel": 3.14159,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 1.36
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Velkoz.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 288,
      "y": 96
    },
    "description": "I pass into the sudden glare. Blink. Blink, blink, blink. My eyes adjust and evaluate the landscape before me.<br><br>There's a scurrying. I look down to find a small, white creature standing on its hind legs, sniffing at my body. It intrigues me...."
  },
  {
    "id": "vi",
    "key": "254",
    "name": "Vi",
    "title": "the Piltover Enforcer",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "stats": {
      "hp": 582.8,
      "hpperlevel": 85,
      "mp": 295.6,
      "mpperlevel": 45,
      "movespeed": 345,
      "armor": 25.88,
      "armorperlevel": 3.5,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 9.01,
      "hpregenperlevel": 0.9,
      "mpregen": 8.09,
      "mpregenperlevel": 0.65,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 55.88,
      "attackdamageperlevel": 3.5,
      "attackspeedoffset": -0.03,
      "attackspeedperlevel": 2.5
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Vi.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 336,
      "y": 96
    },
    "description": "To Vi, every problem is just another brick wall to punch through with her gigantic hextech gauntlets. Though she grew up on the wrong side of the law, Vi now uses her criminal know-how to serve Piltover's police force. Vi's brash attitude, abrasive ..."
  },
  {
    "id": "viktor",
    "key": "112",
    "name": "Viktor",
    "title": "the Machine Herald",
    "tags": [
      "Mage"
    ],
    "stats": {
      "hp": 516.04,
      "hpperlevel": 78,
      "mp": 324,
      "mpperlevel": 50,
      "movespeed": 335,
      "armor": 22.72,
      "armorperlevel": 4,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 525,
      "hpregen": 7.84,
      "hpregenperlevel": 0.65,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 52.04,
      "attackdamageperlevel": 3,
      "attackspeedoffset": -0.05,
      "attackspeedperlevel": 2.11
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Viktor.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 384,
      "y": 96
    },
    "description": "Early in life, Viktor discovered his passion for science and invention, particularly in the field of mechanical automation. He attended Zaun's prestigious College of Techmaturgy and led the team that constructed Blitzcrank - a scientific breakthrough ..."
  },
  {
    "id": "vladimir",
    "key": "8",
    "name": "Vladimir",
    "title": "the Crimson Reaper",
    "tags": [
      "Mage",
      "Tank"
    ],
    "stats": {
      "hp": 525,
      "hpperlevel": 84,
      "mp": 2,
      "mpperlevel": 0,
      "movespeed": 330,
      "armor": 23,
      "armorperlevel": 3.3,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 450,
      "hpregen": 7.005,
      "hpregenperlevel": 0.6,
      "mpregen": 0,
      "mpregenperlevel": 0,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 52,
      "attackdamageperlevel": 3,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Vladimir.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion3.png",
      "x": 432,
      "y": 96
    },
    "description": "There is a temple hidden in the mountains between Noxus and the Tempest Flats, where the secrets of an ancient and terrifying sorcery are kept. The area surrounding the temple is littered with the exsanguinated corpses of those who have mistakenly ..."
  },
  {
    "id": "volibear",
    "key": "106",
    "name": "Volibear",
    "title": "the Thunder's Roar",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "stats": {
      "hp": 584.48,
      "hpperlevel": 86,
      "mp": 270.4,
      "mpperlevel": 30,
      "movespeed": 345,
      "armor": 26.38,
      "armorperlevel": 3.5,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 8.09,
      "hpregenperlevel": 0.65,
      "mpregen": 8.09,
      "mpregenperlevel": 0.65,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 59.544,
      "attackdamageperlevel": 3.3,
      "attackspeedoffset": -0.05,
      "attackspeedperlevel": 2.67
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Volibear.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion4.png",
      "x": 0,
      "y": 0
    },
    "description": "The unforgiving northern reaches of the Freljord are home to the Ursine, a fierce and warlike race that has endured the barren tundra for thousands of years. Their leader is a furious adversary who commands the force of lightning to strike fear within ..."
  },
  {
    "id": "warwick",
    "key": "19",
    "name": "Warwick",
    "title": "the Blood Hunter",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "stats": {
      "hp": 592.64,
      "hpperlevel": 98,
      "mp": 240.4,
      "mpperlevel": 30,
      "movespeed": 345,
      "armor": 25.88,
      "armorperlevel": 3.5,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 8.39,
      "hpregenperlevel": 0.8,
      "mpregen": 8.105,
      "mpregenperlevel": 0.6,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 62.43,
      "attackdamageperlevel": 3.375,
      "attackspeedoffset": -0.08,
      "attackspeedperlevel": 2.88
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Warwick.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion4.png",
      "x": 48,
      "y": 0
    },
    "description": "Warwick was once a man revered for his ability to track down human specimens for the darkest types of scientific research. When his ambitions exceeded his physical limits, he drank a dangerous elixir to transform himself into an unstoppable manhunter. ..."
  },
  {
    "id": "xerath",
    "key": "101",
    "name": "Xerath",
    "title": "the Magus Ascendant",
    "tags": [
      "Mage",
      "Assassin"
    ],
    "stats": {
      "hp": 514.4,
      "hpperlevel": 80,
      "mp": 366.96,
      "mpperlevel": 44,
      "movespeed": 340,
      "armor": 21.88,
      "armorperlevel": 3.5,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 525,
      "hpregen": 5.42,
      "hpregenperlevel": 0.55,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 54.7,
      "attackdamageperlevel": 3,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 1.36
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Xerath.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion4.png",
      "x": 96,
      "y": 0
    },
    "description": "''A lifetime as a slave has prepared me for eternity as your master.''<br><br>Xerath is an Ascended Magus of ancient Shurima, a being of arcane energy writhing in the broken shards of a magical sarcophagus. For millennia, he was trapped beneath the ..."
  },
  {
    "id": "xinzhao",
    "key": "5",
    "name": "Xin Zhao",
    "title": "the Seneschal of Demacia",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "stats": {
      "hp": 600,
      "hpperlevel": 92,
      "mp": 273.8,
      "mpperlevel": 35,
      "movespeed": 345,
      "armor": 25.88,
      "armorperlevel": 3.5,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 175,
      "hpregen": 8.175,
      "hpregenperlevel": 0.7,
      "mpregen": 7.255,
      "mpregenperlevel": 0.45,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 57.544,
      "attackdamageperlevel": 3.3,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2.6
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/XinZhao.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion4.png",
      "x": 144,
      "y": 0
    },
    "description": "''Death is inevitable, one can only avoid defeat.''<br><br>Whenever Jarvan III, the king of Demacia, delivers one of his rallying speeches from the glinting marble balcony atop the Royal Palace, Xin Zhao is at his side. Coined the Seneschal of Demacia,..."
  },
  {
    "id": "yasuo",
    "key": "157",
    "name": "Yasuo",
    "title": "the Unforgiven",
    "tags": [
      "Fighter",
      "Assassin"
    ],
    "stats": {
      "hp": 517.76,
      "hpperlevel": 82,
      "mp": 100,
      "mpperlevel": 0,
      "movespeed": 345,
      "armor": 24.712,
      "armorperlevel": 3.4,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 175,
      "hpregen": 6.51,
      "hpregenperlevel": 0.9,
      "mpregen": 0,
      "mpregenperlevel": 0,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 55.376,
      "attackdamageperlevel": 3.2,
      "attackspeedoffset": -0.067,
      "attackspeedperlevel": 2.5
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Yasuo.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion4.png",
      "x": 192,
      "y": 0
    },
    "description": "Yasuo is a man of resolve, an agile swordsman who wields the wind itself to cut down his foes. This once-proud warrior has been disgraced by a false accusation and forced into a desperate fight for survival. With the world turned against him, he will ..."
  },
  {
    "id": "yorick",
    "key": "83",
    "name": "Yorick",
    "title": "Shepherd of Souls",
    "tags": [
      "Fighter",
      "Tank"
    ],
    "stats": {
      "hp": 580,
      "hpperlevel": 100,
      "mp": 300,
      "mpperlevel": 40,
      "movespeed": 340,
      "armor": 30,
      "armorperlevel": 4,
      "spellblock": 32,
      "spellblockperlevel": 1.25,
      "attackrange": 175,
      "hpregen": 8,
      "hpregenperlevel": 0.8,
      "mpregen": 7.5,
      "mpregenperlevel": 0.75,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 57,
      "attackdamageperlevel": 5,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Yorick.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion4.png",
      "x": 240,
      "y": 0
    },
    "description": "''These isles… How they scream.''<br>The last survivor of a long-forgotten religious order, Yorick is both blessed and cursed with power over the dead. Trapped on the Shadow Isles, his only companions are the rotting corpses and shrieking spirits that ..."
  },
  {
    "id": "zac",
    "key": "154",
    "name": "Zac",
    "title": "the Secret Weapon",
    "tags": [
      "Tank",
      "Fighter"
    ],
    "stats": {
      "hp": 614.6,
      "hpperlevel": 95,
      "mp": 0,
      "mpperlevel": 0,
      "movespeed": 340,
      "armor": 23.88,
      "armorperlevel": 3.5,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 175,
      "hpregen": 7.92,
      "hpregenperlevel": 0.55,
      "mpregen": 0,
      "mpregenperlevel": 0,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 59.67,
      "attackdamageperlevel": 3.375,
      "attackspeedoffset": -0.02,
      "attackspeedperlevel": 1.6
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Zac.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion4.png",
      "x": 288,
      "y": 0
    },
    "description": "Zac is the product of a Zaun experiment to manufacture a hexchem-engineered supersoldier - the Zaun Amorphous Combatant. Combining brute strength with limitless flexibility, he is a versatile juggernaut: a creative fighter who bounces over obstacles ..."
  },
  {
    "id": "zed",
    "key": "238",
    "name": "Zed",
    "title": "the Master of Shadows",
    "tags": [
      "Assassin",
      "Fighter"
    ],
    "stats": {
      "hp": 579.4,
      "hpperlevel": 80,
      "mp": 200,
      "mpperlevel": 0,
      "movespeed": 345,
      "armor": 26.88,
      "armorperlevel": 3.5,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 7.09,
      "hpregenperlevel": 0.65,
      "mpregen": 50,
      "mpregenperlevel": 0,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 54.712,
      "attackdamageperlevel": 3.4,
      "attackspeedoffset": -0.03,
      "attackspeedperlevel": 2.1
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Zed.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion4.png",
      "x": 336,
      "y": 0
    },
    "description": "Zed is the first ninja in 200 years to unlock the ancient, forbidden ways. He defied his clan and master, casting off the balance and discipline that had shackled him all his life. Zed now offers power to those who embrace knowledge of the shadows, ..."
  },
  {
    "id": "ziggs",
    "key": "115",
    "name": "Ziggs",
    "title": "the Hexplosives Expert",
    "tags": [
      "Mage"
    ],
    "stats": {
      "hp": 524.4,
      "hpperlevel": 80,
      "mp": 384,
      "mpperlevel": 47,
      "movespeed": 325,
      "armor": 21.544,
      "armorperlevel": 3.3,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 550,
      "hpregen": 6.255,
      "hpregenperlevel": 0.6,
      "mpregen": 6,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 54.208,
      "attackdamageperlevel": 3.1,
      "attackspeedoffset": -0.04734,
      "attackspeedperlevel": 2
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Ziggs.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion4.png",
      "x": 384,
      "y": 0
    },
    "description": "Ziggs was born with a talent for tinkering, but his chaotic, hyperactive nature was unusual among yordle scientists. Aspiring to be a revered inventor like Heimerdinger, he rattled through ambitious projects with manic zeal, emboldened by both his ..."
  },
  {
    "id": "zilean",
    "key": "26",
    "name": "Zilean",
    "title": "the Chronokeeper",
    "tags": [
      "Support",
      "Mage"
    ],
    "stats": {
      "hp": 499.28,
      "hpperlevel": 77,
      "mp": 360.8,
      "mpperlevel": 60,
      "movespeed": 335,
      "armor": 19.134,
      "armorperlevel": 3.8,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 550,
      "hpregen": 5.44,
      "hpregenperlevel": 0.5,
      "mpregen": 8.5,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 51.64,
      "attackdamageperlevel": 3,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2.13
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Zilean.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion4.png",
      "x": 432,
      "y": 0
    },
    "description": "In the wastelands of Urtistan, there was once a great city. It perished long ago in a terrible Rune War, like most of the lands below the Great Barrier. Nevertheless, one man survived: a sorcerer named Zilean. Being obsessed with time, it was only ..."
  },
  {
    "id": "zyra",
    "key": "143",
    "name": "Zyra",
    "title": "Rise of the Thorns",
    "tags": [
      "Mage",
      "Support"
    ],
    "stats": {
      "hp": 499.32,
      "hpperlevel": 74,
      "mp": 334,
      "mpperlevel": 50,
      "movespeed": 340,
      "armor": 20.04,
      "armorperlevel": 3,
      "spellblock": 30,
      "spellblockperlevel": 0,
      "attackrange": 575,
      "hpregen": 5.69,
      "hpregenperlevel": 0.5,
      "mpregen": 8.5,
      "mpregenperlevel": 0.8,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 53.376,
      "attackdamageperlevel": 3.2,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2.11
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/champion/Zyra.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/champion4.png",
      "x": 0,
      "y": 48
    },
    "description": "Longing to take control of her fate, the ancient, dying plant Zyra transferred her consciousness into a human body for a second chance at life. Centuries ago, she and her kind dominated the Kumungu Jungle, using thorns and vines to consume any animal ..."
  }
]
},{}],23:[function(require,module,exports){
module.exports=[
  {
    "id": "barrier",
    "name": "Barrier",
    "description": "Shields your champion from 115-455 damage (depending on champion level) for 2 seconds.",
    "tooltip": "Temporarily shields {{ f1 }} damage from your champion for 2 seconds.",
    "cooldown": 180,
    "key": "21",
    "summonerLevel": 4,
    "maxammo": "-1",
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/spell/SummonerBarrier.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/spell0.png",
      "x": 0,
      "y": 0
    }
  },
  {
    "id": "boost",
    "name": "Cleanse",
    "description": "Removes all disables and summoner spell debuffs affecting your champion and lowers the duration of incoming disables by 65% for 3 seconds.",
    "tooltip": "Removes all disables and summoner spell debuffs affecting your champion and reduces the duration of disables by 65% for the next {{ f1 }} seconds.",
    "cooldown": 210,
    "key": "1",
    "summonerLevel": 6,
    "maxammo": "-1",
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/spell/SummonerBoost.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/spell0.png",
      "x": 48,
      "y": 0
    }
  },
  {
    "id": "dot",
    "name": "Ignite",
    "description": "Ignites target enemy champion, dealing 70-410 true damage (depending on champion level) over 5 seconds, grants you vision of the target, and reduces healing effects on them for the duration.",
    "tooltip": "Ignite deals <span class=\"colorFEFCFF\">{{ f1 }}</span> true damage to target enemy champion over 5 seconds, grants you vision of the target and applies Grievous Wounds for the duration.<br><br><i>(Grievous Wounds reduces healing effects by 40%. This vision does not reveal stealthed enemies.)</i>",
    "cooldown": 210,
    "key": "14",
    "summonerLevel": 10,
    "maxammo": "-1",
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/spell/SummonerDot.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/spell0.png",
      "x": 144,
      "y": 0
    }
  },
  {
    "id": "exhaust",
    "name": "Exhaust",
    "description": "Exhausts target enemy champion, reducing their Movement Speed and Attack Speed by 30%, their Armor and Magic Resist by 10, and their damage dealt by 40% for 2.5 seconds.",
    "tooltip": "Exhausts target enemy champion, reducing their Movement Speed and Attack Speed by {{ f3 }}%, their Armor and Magic Resist by {{ f4 }}, and their damage dealt by {{ f2 }}% for 2.5 seconds.",
    "cooldown": 210,
    "key": "3",
    "summonerLevel": 4,
    "maxammo": "-1",
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/spell/SummonerExhaust.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/spell0.png",
      "x": 192,
      "y": 0
    }
  },
  {
    "id": "flash",
    "name": "Flash",
    "description": "Teleports your champion a short distance toward your cursor's location.",
    "tooltip": "Teleports your champion a short distance toward your cursor's location.",
    "cooldown": 300,
    "key": "4",
    "summonerLevel": 8,
    "maxammo": "-1",
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/spell/SummonerFlash.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/spell0.png",
      "x": 240,
      "y": 0
    }
  },
  {
    "id": "haste",
    "name": "Ghost",
    "description": "Your champion can move through units and has 28-45% (depending on champion level) increased Movement Speed for 10 seconds.",
    "tooltip": "Your champion can move through units and has {{ f1 }}% increased Movement Speed for 10 seconds.",
    "cooldown": 180,
    "key": "6",
    "summonerLevel": 1,
    "maxammo": "-1",
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/spell/SummonerHaste.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/spell0.png",
      "x": 288,
      "y": 0
    }
  },
  {
    "id": "heal",
    "name": "Heal",
    "description": "Restores 90-345 Health (depending on champion level) and grants 30% Movement Speed for 1 second to you and target allied champion. This healing is halved for units recently affected by Summoner Heal.",
    "tooltip": "Restores {{ f1 }} Health and grants 30% Movement Speed for 1 second to your champion and target allied champion. This healing is halved for units recently affected by Summoner Heal.<br><br><span class=\"colorFFFF00\">If this spell cannot find a target, it will cast on the most wounded allied champion in range.</span>",
    "cooldown": 240,
    "key": "7",
    "summonerLevel": 1,
    "maxammo": "-1",
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/spell/SummonerHeal.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/spell0.png",
      "x": 336,
      "y": 0
    }
  },
  {
    "id": "mana",
    "name": "Clarity",
    "description": "Restores 50% of your champion's maximum Mana. Also restores allies for 25% of their maximum Mana.",
    "tooltip": "Restores {{ f1 }}% maximum Mana to your Champion and {{ f2 }}% to nearby allies.",
    "cooldown": 240,
    "key": "13",
    "summonerLevel": 1,
    "maxammo": "-1",
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/spell/SummonerMana.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/spell0.png",
      "x": 384,
      "y": 0
    }
  },
  {
    "id": "pororecall",
    "name": "To the King!",
    "description": "Quickly travel to the Poro King's side.",
    "tooltip": "<span class=\"colorFFE076\">Passive:</span> Hitting an enemy champion with a Poro gives your team a Poro Mark. Upon reaching 10 Poro Marks, your team summons the Poro King to fight alongside them. While the Poro King is active, no Poro Marks can be scored by either team.<br><br><span class=\"colorFFE076\">Active:</span> Quickly dash to King Poro's side. Can only be cast while the Poro King is summoned for your team. <br><br><i><span class=\"colorFDD017\">''Poros tug the heartstrings. The rest of you just comes along for the ride.''</span></i>",
    "cooldown": 10,
    "key": "30",
    "summonerLevel": 1,
    "maxammo": "-1",
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/spell/SummonerPoroRecall.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/spell0.png",
      "x": 432,
      "y": 0
    }
  },
  {
    "id": "porothrow",
    "name": "Poro Toss",
    "description": "Toss a Poro at your enemies. If it hits, you can quickly travel to your target as a follow up.",
    "tooltip": "Toss a Poro a long distance, dealing {{ f2 }} true damage to the first enemy unit hit. This ability can be recast for 3 seconds if it hits an enemy to dash to the target hit. Dashing to the target will reduce the cooldown of Poro Toss by 5 seconds.<br><br>Poros are not blocked by spell shields or wind walls because they are animals, not spells!<br><br><i><span class=\"colorFDD017\">''Poros are a model for Runeterran aerodynamics.''</span></i>",
    "cooldown": 20,
    "key": "31",
    "summonerLevel": 1,
    "maxammo": "-1",
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/spell/SummonerPoroThrow.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/spell0.png",
      "x": 0,
      "y": 48
    }
  },
  {
    "id": "smite",
    "name": "Smite",
    "description": "Deals 390-1000 true damage (depending on champion level) to target epic or large monster or enemy minion.",
    "tooltip": "Deals <span class=\"colorFEFCFF\">{{ f1 }}</span> true damage to target epic or large monster or enemy minion.<br><br>Smite regains a charge every {{ f3 }} seconds, up to a maximum of 2 charges.<br><br><i>Smiting Large Monsters instantly harvests additional bonuses based on the Monster. Mouse over large jungle monsters to see potential bonus rewards.</i>",
    "cooldown": 75,
    "key": "11",
    "summonerLevel": 10,
    "maxammo": "2",
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/spell/SummonerSmite.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/spell0.png",
      "x": 48,
      "y": 48
    }
  },
  {
    "id": "snowball",
    "name": "Mark",
    "description": "Throw a snowball in a straight line at your enemies. If it hits an enemy, they become marked and your champion can quickly travel to the marked target as a follow up.",
    "tooltip": "Throw a snowball a long distance, dealing {{ f1 }} true damage to the first enemy unit hit. If it hits an enemy, this ability can be recast for {{ f2 }} seconds to Dash to the tagged unit, dealing an additional {{ f5 }} true damage. Dashing to the target will reduce the cooldown of Mark by {{ f3 }}%.<br><br><span class=\"colorFFFF00\">Mark projectiles are not stopped by spell shields or projectile mitigation.</span>",
    "cooldown": 80,
    "key": "32",
    "summonerLevel": 1,
    "maxammo": "-1",
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/spell/SummonerSnowball.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/spell0.png",
      "x": 96,
      "y": 48
    }
  },
  {
    "id": "teleport",
    "name": "Teleport",
    "description": "After channeling for 4.5 seconds, teleports your champion to target allied structure, minion, or ward.",
    "tooltip": "After channeling for {{ f1 }} seconds, your champion teleports to target allied structure, minion, or ward.<br><br>You may reactivate Teleport to cancel it, placing it on a {{ f3 }} second cooldown.",
    "cooldown": 300,
    "key": "12",
    "summonerLevel": 6,
    "maxammo": "-1",
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/spell/SummonerTeleport.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.21.1/img/sprite/spell0.png",
      "x": 144,
      "y": 48
    }
  }
]
},{}],24:[function(require,module,exports){
function match(e,o){if(vendor)return vendor.call(e,o);for(var t=e.parentNode.querySelectorAll(o),r=0;r<t.length;++r)if(t[r]==e)return!0;return!1}var proto=Element.prototype,vendor=proto.matchesSelector||proto.webkitMatchesSelector||proto.mozMatchesSelector||proto.msMatchesSelector||proto.oMatchesSelector;module.exports=match;
},{}],25:[function(require,module,exports){
"use strict";function toElement(e){!range&&doc.createRange&&(range=doc.createRange(),range.selectNode(doc.body));var t;return range&&range.createContextualFragment?t=range.createContextualFragment(e):(t=doc.createElement("body"),t.innerHTML=e),t.childNodes[0]}function syncBooleanAttrProp(e,t,n){e[n]!==t[n]&&(e[n]=t[n],e[n]?e.setAttribute(n,""):e.removeAttribute(n,""))}function noop(){}function compareNodeNames(e,t){var n=e.nodeName,o=t.nodeName;return n===o||!!(t.actualize&&n.charCodeAt(0)<91&&o.charCodeAt(0)>90)&&n===o.toUpperCase()}function createElementNS(e,t){return t&&t!==NS_XHTML?doc.createElementNS(t,e):doc.createElement(e)}function morphAttrs(e,t){if(t.assignAttributes)t.assignAttributes(e);else{var n,o,r,a,i,d,l=t.attributes;for(n=l.length-1;n>=0;--n)o=l[n],r=o.name,a=o.namespaceURI,i=o.value,a?(r=o.localName||r,d=e.getAttributeNS(a,r),d!==i&&e.setAttributeNS(a,r,i)):(d=e.getAttribute(r),d!==i&&e.setAttribute(r,i));for(l=e.attributes,n=l.length-1;n>=0;--n)o=l[n],o.specified!==!1&&(r=o.name,a=o.namespaceURI,a?(r=o.localName||r,hasAttributeNS(t,a,r)||e.removeAttributeNS(a,r)):hasAttributeNS(t,null,r)||e.removeAttribute(r))}}function moveChildren(e,t){for(var n=e.firstChild;n;){var o=n.nextSibling;t.appendChild(n),n=o}return t}function defaultGetNodeKey(e){return e.id}function morphdom(e,t,n){function o(e){c?c.push(e):c=[e]}function r(e,t){if(e.nodeType===ELEMENT_NODE)for(var n=e.firstChild;n;){var a=void 0;t&&(a=N(n))?o(a):(v(n),n.firstChild&&r(n,t)),n=n.nextSibling}}function a(e,t,n){p(e)!==!1&&(t&&t.removeChild(e),v(e),r(e,n))}function i(e){if(e.nodeType===ELEMENT_NODE)for(var t=e.firstChild;t;){var n=N(t);n&&(A[n]=t),i(t),t=t.nextSibling}}function d(e){f(e);for(var t=e.firstChild;t;){var n=t.nextSibling,o=N(t);if(o){var r=A[o];r&&compareNodeNames(t,r)&&(t.parentNode.replaceChild(r,t),l(r,t))}d(t),t=n}}function l(n,r,i){var u,c=N(r);if(c&&delete A[c],!t.isSameNode||!t.isSameNode(e)){if(!i){if(m(n,r)===!1)return;if(morphAttrs(n,r),E(n),h(n,r)===!1)return}if("TEXTAREA"!==n.nodeName){var f,p,v,b,T=r.firstChild,g=n.firstChild;e:for(;T;){for(v=T.nextSibling,f=N(T);g;){if(p=g.nextSibling,T.isSameNode&&T.isSameNode(g)){T=v,g=p;continue e}u=N(g);var S=g.nodeType,C=void 0;if(S===T.nodeType&&(S===ELEMENT_NODE?(f?f!==u&&((b=A[f])?g.nextSibling===b?C=!1:(n.insertBefore(b,g),u?o(u):a(g,n,!0),p=g.nextSibling,g=b):C=!1):u&&(C=!1),C=C!==!1&&compareNodeNames(g,T),C&&l(g,T)):S!==TEXT_NODE&&S!=COMMENT_NODE||(C=!0,g.nodeValue=T.nodeValue)),C){T=v,g=p;continue e}u?o(u):a(g,n,!0),g=p}if(f&&(b=A[f])&&compareNodeNames(b,T))n.appendChild(b),l(b,T);else{var y=s(T);y!==!1&&(y&&(T=y),T.actualize&&(T=T.actualize(n.ownerDocument||doc)),n.appendChild(T),d(T))}T=v,g=p}for(;g;)p=g.nextSibling,(u=N(g))?o(u):a(g,n,!0),g=p}var O=specialElHandlers[n.nodeName];O&&O(n,r)}}if(n||(n={}),"string"==typeof t)if("#document"===e.nodeName||"HTML"===e.nodeName){var u=t;t=doc.createElement("html"),t.innerHTML=u}else t=toElement(t);var c,N=n.getNodeKey||defaultGetNodeKey,s=n.onBeforeNodeAdded||noop,f=n.onNodeAdded||noop,m=n.onBeforeElUpdated||noop,E=n.onElUpdated||noop,p=n.onBeforeNodeDiscarded||noop,v=n.onNodeDiscarded||noop,h=n.onBeforeElChildrenUpdated||noop,b=n.childrenOnly===!0,A={};i(e);var T=e,g=T.nodeType,S=t.nodeType;if(!b)if(g===ELEMENT_NODE)S===ELEMENT_NODE?compareNodeNames(e,t)||(v(e),T=moveChildren(e,createElementNS(t.nodeName,t.namespaceURI))):T=t;else if(g===TEXT_NODE||g===COMMENT_NODE){if(S===g)return T.nodeValue=t.nodeValue,T;T=t}if(T===t)v(e);else if(l(T,t,b),c)for(var C=0,y=c.length;C<y;C++){var O=A[c[C]];O&&a(O,O.parentNode,!1)}return!b&&T!==e&&e.parentNode&&(T.actualize&&(T=T.actualize(e.ownerDocument||doc)),e.parentNode.replaceChild(T,e)),T}var range,doc="undefined"!=typeof document&&document,testEl=doc?doc.body||doc.createElement("div"):{},NS_XHTML="http://www.w3.org/1999/xhtml",ELEMENT_NODE=1,TEXT_NODE=3,COMMENT_NODE=8,hasAttributeNS;hasAttributeNS=testEl.hasAttributeNS?function(e,t,n){return e.hasAttributeNS(t,n)}:testEl.hasAttribute?function(e,t,n){return e.hasAttribute(n)}:function(e,t,n){return!!e.getAttributeNode(n)};var specialElHandlers={OPTION:function(e,t){syncBooleanAttrProp(e,t,"selected")},INPUT:function(e,t){syncBooleanAttrProp(e,t,"checked"),syncBooleanAttrProp(e,t,"disabled"),e.value!==t.value&&(e.value=t.value),hasAttributeNS(t,null,"value")||e.removeAttribute("value")},TEXTAREA:function(e,t){var n=t.value;e.value!==n&&(e.value=n),e.firstChild&&(e.firstChild.nodeValue=n)}};module.exports=morphdom;

},{}],26:[function(require,module,exports){
function nanoraf(n,o){o||(o=window.requestAnimationFrame);var r=!1,u=!1,i=null;return function(l,a){null!==i||u||(u=!0,o(function(){u=!1,i&&(r=!0,n(i,a),r=!1,i=null)})),i=l}}const window=require(17);module.exports=nanoraf;

},{"17":17}],27:[function(require,module,exports){
function turnon(t,e){watch[t][0]&&0===watch[t][2]&&(watch[t][0](e),watch[t][2]=1)}function turnoff(t,e){watch[t][1]&&1===watch[t][2]&&(watch[t][1](e),watch[t][2]=0)}function eachAttr(t,e,a){var r=t.target.getAttribute(KEY_ATTR);return sameOrigin(t.oldValue,r)?void(watch[r]=watch[t.oldValue]):(watch[t.oldValue]&&a(t.oldValue,t.target),void(watch[r]&&e(r,t.target)))}function sameOrigin(t,e){return!(!t||!e)&&watch[t][3]===watch[e][3]}function eachMutation(t,e){for(var a=Object.keys(watch),r=0;r<t.length;r++){if(t[r]&&t[r].getAttribute&&t[r].getAttribute(KEY_ATTR)){var n=t[r].getAttribute(KEY_ATTR);a.forEach(function(a){n===a&&e(a,t[r])})}t[r].childNodes.length>0&&eachMutation(t[r].childNodes,e)}}var document=require(16),window=require(17),watch=Object.create(null),KEY_ID="onloadid"+(new Date%9e6).toString(36),KEY_ATTR="data-"+KEY_ID,INDEX=0;if(window&&window.MutationObserver){var observer=new MutationObserver(function(t){if(!(Object.keys(watch).length<1))for(var e=0;e<t.length;e++)t[e].attributeName!==KEY_ATTR?(eachMutation(t[e].removedNodes,turnoff),eachMutation(t[e].addedNodes,turnon)):eachAttr(t[e],turnon,turnoff)});observer.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeOldValue:!0,attributeFilter:[KEY_ATTR]})}module.exports=function t(e,a,r,n){return a=a||function(){},r=r||function(){},e.setAttribute(KEY_ATTR,"o"+INDEX),watch["o"+INDEX]=[a,r,0,n||t.caller],INDEX+=1,e};

},{"16":16,"17":17}],28:[function(require,module,exports){
"use strict";var repeat=require(32);module.exports=function(e,t,r){return e=e.toString(),"undefined"==typeof t?e:(r=0===r?"0":r?r.toString():" ",repeat(r,t-e.length)+e)};

},{"32":32}],29:[function(require,module,exports){
"use strict";var repeat=require(32);module.exports=function(e,r,t){var i="",n=r-e.length;if(n<=5&&!t)i="00000";else{if(!(n<=25)||t)return e+repeat(t||"0",n);i="000000000000000000000000000"}return e+i.slice(0,n)};

},{"32":32}],30:[function(require,module,exports){
var trim=require(38),forEach=require(15),isArray=function(r){return"[object Array]"===Object.prototype.toString.call(r)};module.exports=function(r){if(!r)return{};var e={};return forEach(trim(r).split("\n"),function(r){var t=r.indexOf(":"),i=trim(r.slice(0,t)).toLowerCase(),o=trim(r.slice(t+1));"undefined"==typeof e[i]?e[i]=o:isArray(e[i])?e[i].push(o):e[i]=[e[i],o]}),e};

},{"15":15,"38":38}],31:[function(require,module,exports){
function match(e){return e.trim().replace(/[\?|#].*$/,"").replace(/^(?:https?\:)\/\//,"").replace(/^.*?(\/.*)/,"$1").replace(/\/$/,"")}module.exports=match;
},{}],32:[function(require,module,exports){
"use strict";function repeat(e,r){if("string"!=typeof e)throw new TypeError("expected a string");if(1===r)return e;if(2===r)return e+e;var t=e.length*r;if(cache!==e||"undefined"==typeof cache)cache=e,res="";else if(res.length>=t)return res.substr(0,t);for(;t>res.length&&r>1;)1&r&&(res+=e),r>>=1,e+=e;return res+=e,res=res.substr(0,t)}var res="",cache;module.exports=repeat;

},{}],33:[function(require,module,exports){
function hash(o){window.onhashchange=function(n){o(window.location.hash)}}const window=require(17);module.exports=hash;

},{"17":17}],34:[function(require,module,exports){
function history(o){window.onpopstate=function(){o(document.location.href)}}const document=require(16),window=require(17);module.exports=history;

},{"16":16,"17":17}],35:[function(require,module,exports){
function href(o){window.onclick=function(e){const n=function o(e){if(e)return"a"!==e.localName?o(e.parentNode):void 0===e.href?o(e.parentNode):window.location.host!==e.host?o(e.parentNode):e}(e.target);if(n){e.preventDefault();const t=n.href.replace(/#$/,"");o(t),window.history.pushState({},null,t)}}}const window=require(17);module.exports=href;

},{"17":17}],36:[function(require,module,exports){
function sheetRouter(e,n,t){t=t?t(_createRoute):_createRoute,n||(n=e,e="");const r=wayfarer(e),a=n(t);return function e(n,t){if(Array.isArray(n[0]))n.forEach(function(n){e(n,t)});else if(n[1]){const a=n[0]?t.concat(n[0]).join("/"):t.length?t.join("/"):n[0];r.on(a,n[1]),e(n[2],t.concat(n[0]))}else if(Array.isArray(n[2]))e(n[2],t.concat(n[0]));else{const o=n[0]?t.concat(n[0]).join("/"):t.length?t.join("/"):n[0];r.on(o,n[2])}}(a,[]),function(e){const n=[].slice.call(arguments);return n[0]=pathname(n[0]),r.apply(null,n)}}function _createRoute(e,n,t){return t||(t=n,n=null),e=e.replace(/^\//,""),[e,n,t]}const pathname=require(31),wayfarer=require(40);module.exports=sheetRouter;

},{"31":31,"40":40}],37:[function(require,module,exports){
(function (global){
"use strict";!function(e,t){"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?module.exports=t():e.store=t()}(this,function(){function e(){try{return o in r&&r[o]}catch(e){return!1}}var t,n={},r="undefined"!=typeof window?window:global,i=r.document,o="localStorage",a="script";if(n.disabled=!1,n.version="1.3.20",n.set=function(e,t){},n.get=function(e,t){},n.has=function(e){return void 0!==n.get(e)},n.remove=function(e){},n.clear=function(){},n.transact=function(e,t,r){null==r&&(r=t,t=null),null==t&&(t={});var i=n.get(e,t);r(i),n.set(e,i)},n.getAll=function(){},n.forEach=function(){},n.serialize=function(e){return JSON.stringify(e)},n.deserialize=function(e){if("string"==typeof e)try{return JSON.parse(e)}catch(t){return e||void 0}},e())t=r[o],n.set=function(e,r){return void 0===r?n.remove(e):(t.setItem(e,n.serialize(r)),r)},n.get=function(e,r){var i=n.deserialize(t.getItem(e));return void 0===i?r:i},n.remove=function(e){t.removeItem(e)},n.clear=function(){t.clear()},n.getAll=function(){var e={};return n.forEach(function(t,n){e[t]=n}),e},n.forEach=function(e){for(var r=0;r<t.length;r++){var i=t.key(r);e(i,n.get(i))}};else if(i&&i.documentElement.addBehavior){var c,u;try{u=new ActiveXObject("htmlfile"),u.open(),u.write("<"+a+">document.w=window</"+a+'><iframe src="/favicon.ico"></iframe>'),u.close(),c=u.w.frames[0].document,t=c.createElement("div")}catch(e){t=i.createElement("div"),c=i.body}var f=function(e){return function(){var r=Array.prototype.slice.call(arguments,0);r.unshift(t),c.appendChild(t),t.addBehavior("#default#userData"),t.load(o);var i=e.apply(n,r);return c.removeChild(t),i}},l=new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]","g"),d=function(e){return e.replace(/^d/,"___$&").replace(l,"___")};n.set=f(function(e,t,r){return t=d(t),void 0===r?n.remove(t):(e.setAttribute(t,n.serialize(r)),e.save(o),r)}),n.get=f(function(e,t,r){t=d(t);var i=n.deserialize(e.getAttribute(t));return void 0===i?r:i}),n.remove=f(function(e,t){t=d(t),e.removeAttribute(t),e.save(o)}),n.clear=f(function(e){var t=e.XMLDocument.documentElement.attributes;e.load(o);for(var n=t.length-1;n>=0;n--)e.removeAttribute(t[n].name);e.save(o)}),n.getAll=function(e){var t={};return n.forEach(function(e,n){t[e]=n}),t},n.forEach=f(function(e,t){for(var r,i=e.XMLDocument.documentElement.attributes,o=0;r=i[o];++o)t(r.name,n.deserialize(e.getAttribute(r.name)))})}try{var s="__storejs__";n.set(s,s),n.get(s)!=s&&(n.disabled=!0),n.remove(s)}catch(e){n.disabled=!0}return n.enabled=!n.disabled,n});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],38:[function(require,module,exports){
function trim(r){return r.replace(/^\s*|\s*$/g,"")}exports=module.exports=trim,exports.left=function(r){return r.replace(/^\s*/,"")},exports.right=function(r){return r.replace(/\s*$/,"")};
},{}],39:[function(require,module,exports){
"use strict";module.exports=function(r,t){var n=0;return r=r||"",t=t||"",function(){return r+n++ +t}};

},{}],40:[function(require,module,exports){
function Wayfarer(r){function e(r,e){if(r=r||"/",e&&e._wayfarer&&e._trie)a.mount(r,e._trie.trie);else{const n=a.create(r);n.cb=e}return t}function t(r){const e=new Array(arguments.length);for(var t=1;t<e.length;t++)e[t]=arguments[t];const c=a.match(r);if(c&&c.cb)return e[0]=c.params,c.cb.apply(null,e);const i=a.match(n);if(i&&i.cb)return e[0]=i.params,i.cb.apply(null,e);throw new Error("route '"+r+"' did not match")}if(!(this instanceof Wayfarer))return new Wayfarer(r);const n=(r||"").replace(/^\//,""),a=trie();return t._trie=a,t.emit=t,t.on=e,t._wayfarer=!0,t}const trie=require(41);module.exports=Wayfarer;

},{"41":41}],41:[function(require,module,exports){
function Trie(){return this instanceof Trie?void(this.trie={nodes:{}}):new Trie}const mutate=require(44),xtend=require(43);module.exports=Trie,Trie.prototype.create=function(e){const n=e.replace(/^\//,"").split("/");return function e(n,t,o){const s=o[n];if(void 0===s)return t;var r=null;return/^:/.test(s)?(t.nodes.$$?r=t.nodes.$$:(r={nodes:{}},t.nodes.$$=r),t.name=s.replace(/^:/,"")):t.nodes[s]?r=t.nodes[s]:(r={nodes:{}},t.nodes[s]=r),e(n+1,r,o)}(0,this.trie,n)},Trie.prototype.match=function(e){const n=e.replace(/^\//,"").split("/"),t={};var o=function e(o,s){if(void 0!==s){const r=n[o];return void 0===r?s:s.nodes[r]?e(o+1,s.nodes[r]):s.name?(t[s.name]=r,e(o+1,s.nodes.$$)):e(o+1)}}(0,this.trie);if(o)return o=xtend(o),o.params=t,o},Trie.prototype.mount=function(e,n){const t=e.replace(/^\//,"").split("/");var o=null,s=null;if(1===t.length)s=t[0],o=this.create(s);else{const r=t.splice(0,t.length-1),i=r.join("/");s=t[0],o=this.create(i)}mutate(o.nodes,n.nodes),n.name&&(o.name=n.name),o.nodes[""]&&(Object.keys(o.nodes[""]).forEach(function(e){"nodes"!==e&&(o[e]=o.nodes[""][e])}),mutate(o.nodes,o.nodes[""].nodes),delete o.nodes[""].nodes)};

},{"43":43,"44":44}],42:[function(require,module,exports){
"use strict";function forEachArray(e,t){for(var r=0;r<e.length;r++)t(e[r])}function isEmpty(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0}function initParams(e,t,r){var n=e;return isFunction(t)?(r=t,"string"==typeof e&&(n={uri:e})):n=xtend(t,{uri:e}),n.callback=r,n}function createXHR(e,t,r){return t=initParams(e,t,r),_createXHR(t)}function _createXHR(e){function t(){4===u.readyState&&o()}function r(){var e=void 0;if(e=u.response?u.response:u.responseText||getXml(u),h)try{e=JSON.parse(e)}catch(e){}return e}function n(e){return clearTimeout(p),e instanceof Error||(e=new Error(""+(e||"Unknown XMLHttpRequest Error"))),e.statusCode=0,a(e,i)}function o(){if(!d){var t;clearTimeout(p),t=e.useXDR&&void 0===u.status?200:1223===u.status?204:u.status;var n=i,o=null;return 0!==t?(n={body:r(),statusCode:t,method:f,headers:{},url:l,rawRequest:u},u.getAllResponseHeaders&&(n.headers=parseHeaders(u.getAllResponseHeaders()))):o=new Error("Internal XMLHttpRequest Error"),a(o,n,n.body)}}if("undefined"==typeof e.callback)throw new Error("callback argument missing");var s=!1,a=function(t,r,n){s||(s=!0,e.callback(t,r,n))},i={body:void 0,headers:{},statusCode:0,method:f,url:l,rawRequest:u},u=e.xhr||null;u||(u=e.cors||e.useXDR?new createXHR.XDomainRequest:new createXHR.XMLHttpRequest);var c,d,p,l=u.url=e.uri||e.url,f=u.method=e.method||"GET",m=e.body||e.data||null,R=u.headers=e.headers||{},X=!!e.sync,h=!1;if("json"in e&&(h=!0,R.accept||R.Accept||(R.Accept="application/json"),"GET"!==f&&"HEAD"!==f&&(R["content-type"]||R["Content-Type"]||(R["Content-Type"]="application/json"),m=JSON.stringify(e.json))),u.onreadystatechange=t,u.onload=o,u.onerror=n,u.onprogress=function(){},u.ontimeout=n,u.open(f,l,!X,e.username,e.password),X||(u.withCredentials=!!e.withCredentials),!X&&e.timeout>0&&(p=setTimeout(function(){d=!0,u.abort("timeout");var e=new Error("XMLHttpRequest timeout");e.code="ETIMEDOUT",n(e)},e.timeout)),u.setRequestHeader)for(c in R)R.hasOwnProperty(c)&&u.setRequestHeader(c,R[c]);else if(e.headers&&!isEmpty(e.headers))throw new Error("Headers cannot be set on an XDomainRequest object");return"responseType"in e&&(u.responseType=e.responseType),"beforeSend"in e&&"function"==typeof e.beforeSend&&e.beforeSend(u),u.send(m),u}function getXml(e){if("document"===e.responseType)return e.responseXML;var t=204===e.status&&e.responseXML&&"parsererror"===e.responseXML.documentElement.nodeName;return""!==e.responseType||t?null:e.responseXML}function noop(){}var window=require(17),isFunction=require(21),parseHeaders=require(30),xtend=require(43);module.exports=createXHR,createXHR.XMLHttpRequest=window.XMLHttpRequest||noop,createXHR.XDomainRequest="withCredentials"in new createXHR.XMLHttpRequest?createXHR.XMLHttpRequest:window.XDomainRequest,forEachArray(["get","put","post","patch","head","delete"],function(e){createXHR["delete"===e?"del":e]=function(t,r,n){return r=initParams(t,r,n),r.method=e.toUpperCase(),_createXHR(r)}});

},{"17":17,"21":21,"30":30,"43":43}],43:[function(require,module,exports){
function extend(){for(var r={},e=0;e<arguments.length;e++){var t=arguments[e];for(var n in t)hasOwnProperty.call(t,n)&&(r[n]=t[n])}return r}module.exports=extend;var hasOwnProperty=Object.prototype.hasOwnProperty;

},{}],44:[function(require,module,exports){
function extend(r){for(var e=1;e<arguments.length;e++){var t=arguments[e];for(var n in t)hasOwnProperty.call(t,n)&&(r[n]=t[n])}return r}module.exports=extend;var hasOwnProperty=Object.prototype.hasOwnProperty;

},{}],45:[function(require,module,exports){
var bel=require(3),morphdom=require(25),defaultEvents=require(46);module.exports=bel,module.exports.update=function(e,t,u){function l(e,t){for(var l=u.events||defaultEvents,o=0;o<l.length;o++){var r=l[o];t[r]?e[r]=t[r]:e[r]&&(e[r]=void 0)}"INPUT"===e.nodeName&&"file"!==e.type||"SELECT"===e.nodeName?null===t.getAttribute("value")&&(t.value=e.value):"TEXTAREA"===e.nodeName&&null===t.getAttribute("value")&&(e.value=t.value)}return u||(u={}),u.events!==!1&&(u.onBeforeElUpdated||(u.onBeforeElUpdated=l)),morphdom(e,t,u)};

},{"25":25,"3":3,"46":46}],46:[function(require,module,exports){
module.exports=["onclick","ondblclick","onmousedown","onmouseup","onmouseover","onmousemove","onmouseout","ondragstart","ondrag","ondragenter","ondragleave","ondragover","ondrop","ondragend","onkeydown","onkeypress","onkeyup","onunload","onabort","onerror","onresize","onscroll","onselect","onchange","onsubmit","onreset","onfocus","onblur","oninput","oncontextmenu","onfocusin","onfocusout"];

},{}],47:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var _choo=require(7),_choo2=_interopRequireDefault(_choo),_fastclick=require(14),_fastclick2=_interopRequireDefault(_fastclick),_chooLog=require(5),_chooLog2=_interopRequireDefault(_chooLog),_api=require(49),_api2=_interopRequireDefault(_api),_app=require(50),_app2=_interopRequireDefault(_app),_game=require(51),_game2=_interopRequireDefault(_game),_welcome=require(53),_welcome2=_interopRequireDefault(_welcome),_ingame=require(52),_ingame2=_interopRequireDefault(_ingame),app=(0,_choo2.default)();app.use((0,_chooLog2.default)()),app.model(_api2.default),app.model(_app2.default),app.model(_game2.default),app.router(function(e){return[e("/",_welcome2.default),e("/ingame",_ingame2.default)]});var start=function(e){mixpanel.identify(e),mixpanel.people.increment("sessions");var a=app.start();document.body.appendChild(a),(0,_fastclick2.default)(document.body)};window.cordova?document.addEventListener("deviceready",function(){start(device.uuid),plugins.insomnia.keepAwake(),document.addEventListener("backbutton",function(){history.back()})}):start(-1);
},{"14":14,"49":49,"5":5,"50":50,"51":51,"52":52,"53":53,"7":7}],48:[function(require,module,exports){
"use strict";function renderIf(e,r,t){return e?t(r):""}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=renderIf;

},{}],49:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function createChampion(e){return _lolChampions2.default.find(function(r){return r.key===String(e)})}function createSpell(e){var r=_lolSpells2.default.find(function(r){return r.key===String(e)});return(0,_xtend2.default)({},r,{uid:uid(),state:"available",cooldown:0,refCooldown:r.cooldown})}Object.defineProperty(exports,"__esModule",{value:!0});var _lolChampions=require(22),_lolChampions2=_interopRequireDefault(_lolChampions),_lolSpells=require(23),_lolSpells2=_interopRequireDefault(_lolSpells),_store=require(37),_store2=_interopRequireDefault(_store),_uniqueid=require(39),_uniqueid2=_interopRequireDefault(_uniqueid),_xhr=require(42),_xhr2=_interopRequireDefault(_xhr),_xtend=require(43),_xtend2=_interopRequireDefault(_xtend),proxyUrl="https://wt-ngryman-gmail_com-0.run.webtask.io/riot-proxy",endpoint=function(e){var r=_store2.default.get("app:region");switch(e){case"summoner":return"/api/lol/"+r+"/v1.4/summoner/by-name";case"ennemies":return"/observer-mode/rest/consumer/getSpectatorGameInfo/"+r+"1"}},error=function(e,r,n,t){t({message:e,url:r,status:n})},uid=(0,_uniqueid2.default)();exports.default={namespace:"api",effects:{request:function(e,r,n,t){var o=_store2.default.get("app:region");return(0,_xhr2.default)(proxyUrl+"?url="+e+"&region="+o,{json:!0},function(e,r,n){null==n.status?t(null,n):t(n.status.status_code)})},summoner:function e(r,n,t,o){var e=_store2.default.get("api:summoner");if(null!=e&&e.name===r)return o(null,e);var u=endpoint("summoner")+"/"+r;t("api:request",u,function(e,n){if(e>400)return error("Unknown summoner",u,e,o);var t=n[r.toLowerCase().replace(/ /g,"")];return t?(_store2.default.set("api:summoner",t),void o(null,t)):error("No summoner found",u,e,o)})},game:function(e,r,n,t){var o=endpoint("ennemies")+"/"+e.id;n("api:request",o,function(r,n){if(r>400)return error("No live game found",o,r,t);if("CLASSIC"!==n.gameMode||"MATCHED_GAME"!==n.gameType)return error("Game mode not supported",o,r,t);var u=n.gameId,i=n.participants,l=i.find(function(r){return e.name===r.summonerName}).teamId,a=i.filter(function(e){return e.teamId!==l}).map(function(e){return{name:e.summonerName,champion:createChampion(e.championId),spells:[createSpell(e.spell1Id),createSpell(e.spell2Id)]}});t(null,{gameId:u,ennemies:a})})}}};
},{"22":22,"23":23,"37":37,"39":39,"42":42,"43":43}],50:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _store=require(37),_store2=_interopRequireDefault(_store),_xtend=require(43),_xtend2=_interopRequireDefault(_xtend),errTimeoutId=void 0;exports.default={namespace:"app",state:{title:"<em>No</em> Flash",tagline:"Track summoner spells",loading:!1,error:"",summoner:_store2.default.get("app:summoner")||"",region:_store2.default.get("app:region")||"EUW"},effects:{summoner:function(e,r,t,o){_store2.default.set("app:summoner",e),t("app:set",{summoner:e},o)},region:function(e,r,t,o){_store2.default.set("app:region",e),t("app:set",{region:e},o)},loading:function(e,r,t,o){t("app:set",{error:"",loading:!0},o)},error:function(e,r,t,o){t("app:set",{error:e.err.message,loading:!1},o),mixpanel.track("app:error",e.err),clearTimeout(errTimeoutId),errTimeoutId=setTimeout(function(){t("app:set",{error:"",loading:!1},o)},3e3)},clear:function(e,r,t,o){t("app:set",{error:"",loading:!1},o)}},reducers:{set:function(e,r){return(0,_xtend2.default)(r,e)}}};

},{"37":37,"43":43}],51:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _xtend=require(43),_xtend2=_interopRequireDefault(_xtend),spellAudio=new Audio("sounds/spell.ogg"),numCooldowns=0;exports.default={namespace:"game",state:{gameId:0,ennemies:[]},effects:{fetch:function(e,n,o,t){o("app:loading",function(){o("api:summoner",e,function(e,n){return e?o("app:error",{err:e},t):(mixpanel.people.set("$first_name",n.name),void o("api:game",n,function(e,n){return e?o("app:error",{err:e},t):void o("game:set",n,function(){o("app:clear",function(){mixpanel.people.increment("gamesPlayed"),mixpanel.people.union("gamesId",n.gameId),mixpanel.track("game:init",{gameId:n.gameId}),o("location:setLocation",{location:"/ingame"},t),history.pushState({},null,"/ingame")})})}))})})},cooldown:function(e,n,o,t){"cooldown"!==e.state?(numCooldowns++,o("game:startCooldown",e.uid,t)):o("game:decrementCooldown",{uid:e.uid,amount:10},t)}},reducers:{set:function(e,n){return e},startCooldown:function(e,n){return{ennemies:n.ennemies.map(function(o){return(0,_xtend2.default)(o,{spells:o.spells.map(function(o){return o.uid===e?(mixpanel.track("game:cooldown:start",{gameId:n.gameId,spell:o.id}),(0,_xtend2.default)({},o,{state:"cooldown",cooldown:o.refCooldown-1})):o})})})}},decrementCooldown:function(e,n){return{ennemies:n.ennemies.map(function(o){return(0,_xtend2.default)(o,{spells:o.spells.map(function(o){if("cooldown"!==o.state)return o;if(e.uid&&o.uid!==e.uid)return o;e.amount>1&&mixpanel.track("game:cooldown:decrement",{gameId:n.gameId,spell:o.id});var t=(0,_xtend2.default)({},o,{cooldown:o.cooldown-e.amount});return t.cooldown<=0&&(t.cooldown=0,t.state="available",numCooldowns--,spellAudio.play()),t})})})}},toggleFocus:function(e,n){return{ennemies:n.ennemies.map(function(o){if(o.name===e.name){var t=!o.focused;return mixpanel.track("game:focus",{gameId:n.gameId,focused:t}),(0,_xtend2.default)({},o,{focused:t})}return o})}}},subscriptions:{tick:function(e,n){setInterval(function(){0!==numCooldowns&&e("game:decrementCooldown",{amount:1},n)},1e3)}}};

},{"43":43}],52:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _taggedTemplateLiteral(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}Object.defineProperty(exports,"__esModule",{value:!0});var _templateObject=_taggedTemplateLiteral(['\n  <main class="ingame-page">\n    ',"\n  </main>\n"],['\n  <main class="ingame-page">\n    ',"\n  </main>\n"]),_html=require(6),_html2=_interopRequireDefault(_html),_ennemyList=require(55),_ennemyList2=_interopRequireDefault(_ennemyList);exports.default=function(e,t,n){return(0,_html2.default)(_templateObject,(0,_ennemyList2.default)(e.game,t,n))};

},{"55":55,"6":6}],53:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _taggedTemplateLiteral(e,n){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}function _defineProperty(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}Object.defineProperty(exports,"__esModule",{value:!0});var _templateObject=_taggedTemplateLiteral(["\n  <option ",">","</option>\n"],["\n  <option ",">","</option>\n"]),_templateObject2=_taggedTemplateLiteral(['\n  <div class="error-pane">',"</div>\n"],['\n  <div class="error-pane">',"</div>\n"]),_templateObject3=_taggedTemplateLiteral(['\n  <main class="welcome-page">\n    <div class="welcome-header">\n      <svg class="logo" width="96px" height="141px">\n        <use xlink:href="#icon-logo">\n      </svg>\n      <h1 class="title">noflash</h1>\n    </div>\n    <form class="welcome-form ','"\n      onsubmit=','}>\n      <fieldset class="fieldset">\n        <input\n          class="input"\n          value=','\n          placeholder="Summoner name"\n          ',"\n          oninput=",' />\n        <select class="regions" onchange=',">\n          ",'\n        </select>\n      </fieldset>\n      <button class="submit">Start</button>\n    </form>\n    ',"\n  </main>\n"],['\n  <main class="welcome-page">\n    <div class="welcome-header">\n      <svg class="logo" width="96px" height="141px">\n        <use xlink:href="#icon-logo">\n      </svg>\n      <h1 class="title">noflash</h1>\n    </div>\n    <form class="welcome-form ','"\n      onsubmit=','}>\n      <fieldset class="fieldset">\n        <input\n          class="input"\n          value=','\n          placeholder="Summoner name"\n          ',"\n          oninput=",' />\n        <select class="regions" onchange=',">\n          ",'\n        </select>\n      </fieldset>\n      <button class="submit">Start</button>\n    </form>\n    ',"\n  </main>\n"]),_html=require(6),_html2=_interopRequireDefault(_html),_classnames2=require(8),_classnames3=_interopRequireDefault(_classnames2),_renderIf=require(48),_renderIf2=_interopRequireDefault(_renderIf),regions=["BR","EUNE","EUW","JP","KR","LAN","LAS","NA","OCE","PBE","RU","TR"],handleSubmit=function(e,n,t){e.preventDefault(),n.app.summoner?t("game:fetch",n.app.summoner):t("app:error","Empty summoner name")},handleInput=function(e,n,t){t("app:summoner",e.target.value)},handleChange=function(e,n,t){t("app:region",e.target.value)},classVariants=function(e){return(0,_classnames3.default)(_defineProperty({},"-loading",e.app.loading))},renderRegion=function(e,n){return(0,_html2.default)(_templateObject,e===n.app.region?"selected":"",e)},renderError=function(e){return(0,_html2.default)(_templateObject2,e)};exports.default=function(e,n,t){return(0,_html2.default)(_templateObject3,classVariants(e),function(n){return handleSubmit(n,e,t)},e.app.summoner,e.app.loading?"disabled":"",function(n){return handleInput(n,e,t)},function(n){return handleChange(n,e,t)},regions.map(function(n){return renderRegion(n,e)}),(0,_renderIf2.default)(e.app.error,e.app.error,renderError))};

},{"48":48,"6":6,"8":8}],54:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _taggedTemplateLiteral(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function _defineProperty(e,t,l){return t in e?Object.defineProperty(e,t,{value:l,enumerable:!0,configurable:!0,writable:!0}):e[t]=l,e}Object.defineProperty(exports,"__esModule",{value:!0});var _templateObject=_taggedTemplateLiteral(['\n  <li class="ennemy-item ','"\n    onclick=','>\n    <div class="ennemy-meta">\n      <h2 class="champion">',"</h2>\n    </div>\n    ","\n  </li>\n"],['\n  <li class="ennemy-item ','"\n    onclick=','>\n    <div class="ennemy-meta">\n      <h2 class="champion">',"</h2>\n    </div>\n    ","\n  </li>\n"]),_html=require(6),_html2=_interopRequireDefault(_html),_classnames2=require(8),_classnames3=_interopRequireDefault(_classnames2),_closest=require(9),_closest2=_interopRequireDefault(_closest),_spellList=require(57),_spellList2=_interopRequireDefault(_spellList),handleClick=function(e,t,l){null==(0,_closest2.default)(e.target,".spell-item",!0)&&l("game:toggleFocus",t)},classVariants=function(e){return(0,_classnames3.default)(_defineProperty({},"-focused",e.focused))};exports.default=function(e,t,l){return(0,_html2.default)(_templateObject,classVariants(e),function(t){return handleClick(t,e,l)},e.champion.name,(0,_spellList2.default)(e,t,l))};
},{"57":57,"6":6,"8":8,"9":9}],55:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _taggedTemplateLiteral(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}Object.defineProperty(exports,"__esModule",{value:!0});var _templateObject=_taggedTemplateLiteral(['\n  <ul class="ennemy-list">\n    ',"\n  </ul>\n"],['\n  <ul class="ennemy-list">\n    ',"\n  </ul>\n"]),_html=require(6),_html2=_interopRequireDefault(_html),_closest=require(9),_closest2=_interopRequireDefault(_closest),_ennemyItem=require(54),_ennemyItem2=_interopRequireDefault(_ennemyItem),dragInfo=void 0,indexOf=function(e){return Array.prototype.indexOf.call(e.parentNode.childNodes,e)},handleDragStart=function(e){var t=(0,_closest2.default)(e.target,".ennemy-list");t.addEventListener("mousemove",handleDragMove),t.addEventListener("mouseup",handleDragEnd);var n=(0,_closest2.default)(e.target,".ennemy-item",!0);dragInfo={dragging:!1,start:e.clientY,index:indexOf(n),list:t,listItem:n}},handleDragMove=function(e){var t=dragInfo,n=t.list,r=t.listItem;if(!dragInfo.dragging&&Math.abs(e.clientY-dragInfo.start)>10&&(r.classList.add("-dragging"),dragInfo.dragging=!0),dragInfo.dragging){var a=(document.elementFromPoint(e.clientX,e.clientY),(0,_closest2.default)(e.target,".ennemy-item",!0));if(null!=a){var i=indexOf(a),l=a.nextElementSibling;i!==dragInfo.index&&(n.insertBefore(r,l),dragInfo.index=i)}}},handleDragEnd=function e(t){var n=dragInfo,r=n.list,a=n.listItem;a.classList.remove("-dragging"),a.style.transform="",r.removeEventListener("mousemove",handleDragMove),r.removeEventListener("mouseup",e)};exports.default=function(e,t,n){return(0,_html2.default)(_templateObject,e.ennemies.map(function(e){return(0,_ennemyItem2.default)(e,t,n)}))};

},{"54":54,"6":6,"9":9}],56:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _taggedTemplateLiteral(e,n){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}function _defineProperty(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}Object.defineProperty(exports,"__esModule",{value:!0});var _templateObject=_taggedTemplateLiteral(["\n    <g transform=",'\n      stroke-linecap="round"\n      vector-effect="non-scaling-stroke">\n      <circle class="progress-bg" cx="0" cy="0" r="50" />\n      <path class="progress" d=',"></path>\n    </g>\n  "],["\n    <g transform=",'\n      stroke-linecap="round"\n      vector-effect="non-scaling-stroke">\n      <circle class="progress-bg" cx="0" cy="0" r="50" />\n      <path class="progress" d=',"></path>\n    </g>\n  "]),_templateObject2=_taggedTemplateLiteral(['\n  <svg class="cooldown"\n    viewBox="-5 -5 110 110">\n    ',"\n  </svg>\n"],['\n  <svg class="cooldown"\n    viewBox="-5 -5 110 110">\n    ',"\n  </svg>\n"]),_templateObject3=_taggedTemplateLiteral(['\n  <li\n    class="spell-item ','"\n    onclick=',">\n    ",'\n    <svg class="icon">\n      <use xlink:href="#svg-','">\n    </svg>\n  </li>\n'],['\n  <li\n    class="spell-item ','"\n    onclick=',">\n    ",'\n    <svg class="icon">\n      <use xlink:href="#svg-','">\n    </svg>\n  </li>\n']),_html=require(6),_html2=_interopRequireDefault(_html),_classnames2=require(8),_classnames3=_interopRequireDefault(_classnames2),_renderIf=require(48),_renderIf2=_interopRequireDefault(_renderIf),handleClick=function(e,n,t){t("game:cooldown",n)},classVariants=function(e){var n;return(0,_classnames3.default)((n={},_defineProperty(n,"-"+e.id,!0),_defineProperty(n,"-"+e.state,!0),_defineProperty(n,"-time60",e.cooldown<=60&&e.cooldown>30),_defineProperty(n,"-time30",e.cooldown<=30&&e.cooldown>0),n))},drawCooldownPie=function(e){var n=50,t=1-e.cooldown/e.refCooldown,r=t*Math.PI*2,l=r>Math.PI?1:0,o=Math.sin(r)*n,a=Math.cos(r)*-n;return(0,_html2.default)(_templateObject,"translate("+n+", "+n+")","M 0 "+-n+" A "+n+" "+n+" 1 "+l+" 1 "+o+" "+a)},renderCooldown=function(e){return(0,_html2.default)(_templateObject2,drawCooldownPie(e))};exports.default=function(e,n,t){return(0,_html2.default)(_templateObject3,classVariants(e),function(n){return handleClick(n,e,t)},(0,_renderIf2.default)("cooldown"===e.state,e,renderCooldown),e.id)};
},{"48":48,"6":6,"8":8}],57:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _taggedTemplateLiteral(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}Object.defineProperty(exports,"__esModule",{value:!0});var _templateObject=_taggedTemplateLiteral(['\n  <ul class="spell-list">\n    ',"\n  </ul>\n"],['\n  <ul class="spell-list">\n    ',"\n  </ul>\n"]),_html=require(6),_html2=_interopRequireDefault(_html),_spellItem=require(56),_spellItem2=_interopRequireDefault(_spellItem);exports.default=function(e,t,l){return(0,_html2.default)(_templateObject,e.spells.map(function(e){return(0,_spellItem2.default)(e,t,l)}))};

},{"56":56,"6":6}]},{},[47]);
