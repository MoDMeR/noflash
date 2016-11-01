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
"use strict";function toElement(e){!range&&doc.createRange&&(range=doc.createRange(),range.selectNode(doc.body));var t;return range&&range.createContextualFragment?t=range.createContextualFragment(e):(t=doc.createElement("body"),t.innerHTML=e),t.childNodes[0]}function syncBooleanAttrProp(e,t,n){e[n]!==t[n]&&(e[n]=t[n],e[n]?e.setAttribute(n,""):e.removeAttribute(n,""))}function noop(){}function compareNodeNames(e,t){var n=e.nodeName,o=t.nodeName;return n===o||!!(t.actualize&&n.charCodeAt(0)<91&&o.charCodeAt(0)>90)&&n===o.toUpperCase()}function createElementNS(e,t){return t&&t!==NS_XHTML?doc.createElementNS(t,e):doc.createElement(e)}function morphAttrs(e,t){var n,o,r,a,i,d,l=t.attributes;if(t.assignAttributes)t.assignAttributes(e);else for(n=l.length-1;n>=0;--n)o=l[n],r=o.name,a=o.namespaceURI,i=o.value,a?(r=o.localName||r,d=e.getAttributeNS(a,r),d!==i&&e.setAttributeNS(a,r,i)):(d=e.getAttribute(r),d!==i&&e.setAttribute(r,i));for(l=e.attributes,n=l.length-1;n>=0;--n)o=l[n],o.specified!==!1&&(r=o.name,a=o.namespaceURI,a?(r=o.localName||r,hasAttributeNS(t,a,r)||e.removeAttributeNS(a,r)):hasAttributeNS(t,null,r)||e.removeAttribute(r))}function moveChildren(e,t){for(var n=e.firstChild;n;){var o=n.nextSibling;t.appendChild(n),n=o}return t}function defaultGetNodeKey(e){return e.id}function morphdom(e,t,n){function o(e){c?c.push(e):c=[e]}function r(e,t){if(e.nodeType===ELEMENT_NODE)for(var n=e.firstChild;n;){var a=void 0;t&&(a=N(n))?o(a):(v(n),n.firstChild&&r(n,t)),n=n.nextSibling}}function a(e,t,n){p(e)!==!1&&(t&&t.removeChild(e),v(e),r(e,n))}function i(e){if(e.nodeType===ELEMENT_NODE)for(var t=e.firstChild;t;){var n=N(t);n&&(A[n]=t),i(t),t=t.nextSibling}}function d(e){f(e);for(var t=e.firstChild;t;){var n=t.nextSibling,o=N(t);if(o){var r=A[o];r&&compareNodeNames(t,r)&&(t.parentNode.replaceChild(r,t),l(r,t))}d(t),t=n}}function l(n,r,i){var u,c=N(r);if(c&&delete A[c],!t.isSameNode||!t.isSameNode(e)){if(!i){if(m(n,r)===!1)return;if(morphAttrs(n,r),E(n),h(n,r)===!1)return}if("TEXTAREA"!==n.nodeName){var f,p,v,b,T=r.firstChild,g=n.firstChild;e:for(;T;){for(v=T.nextSibling,f=N(T);g;){if(p=g.nextSibling,T.isSameNode&&T.isSameNode(g)){T=v,g=p;continue e}u=N(g);var S=g.nodeType,C=void 0;if(S===T.nodeType&&(S===ELEMENT_NODE?(f?f!==u&&((b=A[f])?g.nextSibling===b?C=!1:(n.insertBefore(b,g),u?o(u):a(g,n,!0),p=g.nextSibling,g=b):C=!1):u&&(C=!1),C=C!==!1&&compareNodeNames(g,T),C&&l(g,T)):S!==TEXT_NODE&&S!=COMMENT_NODE||(C=!0,g.nodeValue=T.nodeValue)),C){T=v,g=p;continue e}u?o(u):a(g,n,!0),g=p}if(f&&(b=A[f])&&compareNodeNames(b,T))n.appendChild(b),l(b,T);else{var y=s(T);y!==!1&&(y&&(T=y),T.actualize&&(T=T.actualize(n.ownerDocument||doc)),n.appendChild(T),d(T))}T=v,g=p}for(;g;)p=g.nextSibling,(u=N(g))?o(u):a(g,n,!0),g=p}var O=specialElHandlers[n.nodeName];O&&O(n,r)}}if(n||(n={}),"string"==typeof t)if("#document"===e.nodeName||"HTML"===e.nodeName){var u=t;t=doc.createElement("html"),t.innerHTML=u}else t=toElement(t);var c,N=n.getNodeKey||defaultGetNodeKey,s=n.onBeforeNodeAdded||noop,f=n.onNodeAdded||noop,m=n.onBeforeElUpdated||noop,E=n.onElUpdated||noop,p=n.onBeforeNodeDiscarded||noop,v=n.onNodeDiscarded||noop,h=n.onBeforeElChildrenUpdated||noop,b=n.childrenOnly===!0,A={};i(e);var T=e,g=T.nodeType,S=t.nodeType;if(!b)if(g===ELEMENT_NODE)S===ELEMENT_NODE?compareNodeNames(e,t)||(v(e),T=moveChildren(e,createElementNS(t.nodeName,t.namespaceURI))):T=t;else if(g===TEXT_NODE||g===COMMENT_NODE){if(S===g)return T.nodeValue=t.nodeValue,T;T=t}if(T===t)v(e);else if(l(T,t,b),c)for(var C=0,y=c.length;C<y;C++){var O=A[c[C]];O&&a(O,O.parentNode,!1)}return!b&&T!==e&&e.parentNode&&(T.actualize&&(T=T.actualize(e.ownerDocument||doc)),e.parentNode.replaceChild(T,e)),T}var range,doc="undefined"!=typeof document&&document,testEl=doc?doc.body||doc.createElement("div"):{},NS_XHTML="http://www.w3.org/1999/xhtml",ELEMENT_NODE=1,TEXT_NODE=3,COMMENT_NODE=8,hasAttributeNS;hasAttributeNS=testEl.hasAttributeNS?function(e,t,n){return e.hasAttributeNS(t,n)}:testEl.hasAttribute?function(e,t,n){return e.hasAttribute(n)}:function(e,t,n){return!!e.getAttributeNode(n)};var specialElHandlers={OPTION:function(e,t){syncBooleanAttrProp(e,t,"selected")},INPUT:function(e,t){syncBooleanAttrProp(e,t,"checked"),syncBooleanAttrProp(e,t,"disabled"),e.value!==t.value&&(e.value=t.value),hasAttributeNS(t,null,"value")||e.removeAttribute("value")},TEXTAREA:function(e,t){var n=t.value;e.value!==n&&(e.value=n),e.firstChild&&(e.firstChild.nodeValue=n)}};module.exports=morphdom;

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
"use strict";function repeat(e,r){if("string"!=typeof e)throw new TypeError("repeat-string expects a string.");if(1===r)return e;if(2===r)return e+e;var t=e.length*r;for(cache===e&&"undefined"!=typeof cache||(cache=e,res="");t>res.length&&r>0&&(1&r&&(res+=e),r>>=1);)e+=e;return res.substr(0,t)}var res="",cache;module.exports=repeat;

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
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var _choo=require(7),_choo2=_interopRequireDefault(_choo),_fastclick=require(14),_fastclick2=_interopRequireDefault(_fastclick),_chooLog=require(5),_chooLog2=_interopRequireDefault(_chooLog),_api=require(49),_api2=_interopRequireDefault(_api),_app=require(50),_app2=_interopRequireDefault(_app),_game=require(51),_game2=_interopRequireDefault(_game),_welcome=require(53),_welcome2=_interopRequireDefault(_welcome),_ingame=require(52),_ingame2=_interopRequireDefault(_ingame),app=(0,_choo2.default)();app.use((0,_chooLog2.default)()),app.model(_api2.default),app.model(_app2.default),app.model(_game2.default),app.router(function(e){return[e("/",_welcome2.default),e("/ingame",_ingame2.default)]});var tree=app.start();document.body.appendChild(tree),(0,_fastclick2.default)(document.body),document.addEventListener("deviceready",function(){document.addEventListener("backbutton",function(){history.back()})});

},{"14":14,"49":49,"5":5,"50":50,"51":51,"52":52,"53":53,"7":7}],48:[function(require,module,exports){
"use strict";function renderIf(e,r,t){return e?t(r):""}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=renderIf;

},{}],49:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function createChampion(e){return _lolChampions2.default.find(function(n){return n.key===String(e)})}function createSpell(e){var n=_lolSpells2.default.find(function(n){return n.key===String(e)});return(0,_xtend2.default)({},n,{uid:uid(),state:"available",cooldown:0,refCooldown:n.cooldown})}Object.defineProperty(exports,"__esModule",{value:!0});var _lolChampions=require(22),_lolChampions2=_interopRequireDefault(_lolChampions),_lolSpells=require(23),_lolSpells2=_interopRequireDefault(_lolSpells),_store=require(37),_store2=_interopRequireDefault(_store),_uniqueid=require(39),_uniqueid2=_interopRequireDefault(_uniqueid),_xhr=require(42),_xhr2=_interopRequireDefault(_xhr),_xtend=require(43),_xtend2=_interopRequireDefault(_xtend),proxyUrl="https://wt-ngryman-gmail_com-0.run.webtask.io/riot-proxy",endpoint=function(e){var n=_store2.default.get("app:region");switch(e){case"summoner":return"/api/lol/"+n+"/v1.4/summoner/by-name";case"ennemies":return"/observer-mode/rest/consumer/getSpectatorGameInfo/"+n+"1"}},uid=(0,_uniqueid2.default)();exports.default={namespace:"api",effects:{request:function(e,n,r,t){return(0,_xhr2.default)(proxyUrl+"?url="+e,{json:!0},function(e,n,r){null==r.status?t(null,r):t(r.status.status_code)})},summoner:function e(n,r,t,u){var e=_store2.default.get("api:summoner");return null!=e&&e.name===n?u(null,e):void t("api:request",endpoint("summoner")+"/"+n,function(e,r){if(e>400)return u("Unknown summoner");var t=r[n.toLowerCase().replace(/ /g,"")];return t?(_store2.default.set("api:summoner",t),void u(null,t)):u("No summoner found")})},ennemies:function(e,n,r,t){r("api:request",endpoint("ennemies")+"/"+e.id,function(n,r){if(n>400)return t("No live game found");if("CLASSIC"!==r.gameMode||"MATCHED_GAME"!==r.gameType)return t("Game mode not supported");var u=r.participants,o=u.find(function(n){return e.name===n.summonerName}).teamId,i=u.filter(function(e){return e.teamId!==o}).map(function(e){return{name:e.summonerName,champion:createChampion(e.championId),spells:[createSpell(e.spell1Id),createSpell(e.spell2Id)]}});t(null,i)})}}};

},{"22":22,"23":23,"37":37,"39":39,"42":42,"43":43}],50:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _store=require(37),_store2=_interopRequireDefault(_store),_xtend=require(43),_xtend2=_interopRequireDefault(_xtend),errTimeoutId=void 0;exports.default={namespace:"app",state:{title:"<em>No</em> Flash",tagline:"Track summoner spells",loading:!1,error:"",summoner:_store2.default.get("app:summoner")||"",region:_store2.default.get("app:region")||""},effects:{summoner:function(e,r,t,o){_store2.default.set("app:summoner",e),t("app:set",{summoner:e},o)},region:function(e,r,t,o){_store2.default.set("app:region",e),t("app:set",{region:e},o)},loading:function(e,r,t,o){t("app:set",{error:"",loading:!0},o)},error:function(e,r,t,o){t("app:set",{error:e.err,loading:!1},o),clearTimeout(errTimeoutId),errTimeoutId=setTimeout(function(){t("app:set",{error:"",loading:!1},o)},3e3)},clear:function(e,r,t,o){t("app:set",{error:"",loading:!1},o)}},reducers:{set:function(e,r){return(0,_xtend2.default)(r,e)}}};

},{"37":37,"43":43}],51:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _xtend=require(43),_xtend2=_interopRequireDefault(_xtend),numCooldowns=0;exports.default={namespace:"game",state:{ennemies:[]},effects:{fetch:function(e,n,o,t){o("app:loading",function(){o("api:summoner",e,function(e,n){return e?o("app:error",{err:e},t):void o("api:ennemies",n,function(e,n){return e?o("app:error",{err:e},t):void o("game:ennemies",n,function(){o("app:clear",function(){o("location:setLocation",{location:"/ingame"},t),history.pushState({},null,"/ingame")})})})})})},cooldown:function(e,n,o,t){"cooldown"!==e.state?(numCooldowns++,o("game:startCooldown",e.uid,t)):o("game:decrementCooldown",{uid:e.uid,amount:10},t)}},reducers:{ennemies:function(e,n){return{ennemies:e}},startCooldown:function(e,n){return{ennemies:n.ennemies.map(function(n){return(0,_xtend2.default)(n,{spells:n.spells.map(function(n){return n.uid===e?(0,_xtend2.default)({},n,{state:"cooldown",cooldown:n.refCooldown-1}):n})})})}},decrementCooldown:function(e,n){return{ennemies:n.ennemies.map(function(n){return(0,_xtend2.default)(n,{spells:n.spells.map(function(n){if("cooldown"!==n.state)return n;if(e.uid&&n.uid!==e.uid)return n;var o=(0,_xtend2.default)({},n,{cooldown:n.cooldown-e.amount});return o.cooldown<=0&&(o.cooldown=0,o.state="available",numCooldowns--),o})})})}},toggleFocus:function(e,n){return{ennemies:n.ennemies.map(function(n){return n.name===e.name?(0,_xtend2.default)({},n,{focused:!n.focused}):n})}}},subscriptions:{tick:function(e,n){setInterval(function(){0!==numCooldowns&&e("game:decrementCooldown",{amount:1},n)},1e3)}}};

},{"43":43}],52:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _taggedTemplateLiteral(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}Object.defineProperty(exports,"__esModule",{value:!0});var _templateObject=_taggedTemplateLiteral(['\n  <main class="ingame-page">\n    ',"\n  </main>\n"],['\n  <main class="ingame-page">\n    ',"\n  </main>\n"]),_html=require(6),_html2=_interopRequireDefault(_html),_ennemyList=require(55),_ennemyList2=_interopRequireDefault(_ennemyList);exports.default=function(e,t,n){return(0,_html2.default)(_templateObject,(0,_ennemyList2.default)(e.game,t,n))};

},{"55":55,"6":6}],53:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _taggedTemplateLiteral(e,n){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}function _defineProperty(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}Object.defineProperty(exports,"__esModule",{value:!0});var _templateObject=_taggedTemplateLiteral(["\n  <option ",">","</option>\n"],["\n  <option ",">","</option>\n"]),_templateObject2=_taggedTemplateLiteral(['\n  <div class="error-pane">',"</div>\n"],['\n  <div class="error-pane">',"</div>\n"]),_templateObject3=_taggedTemplateLiteral(['\n  <main class="welcome-page">\n    <div class="welcome-header">\n      <h1 class="title"><em>No</em>Flash</h1>\n      <blockquote class="tagline">','</blockquote>\n    </div>\n    <form class="welcome-form ','"\n      onsubmit=','}>\n      <fieldset class="fieldset">\n        <label class="label">\n          Summoner name\n          <input\n            class="input"\n            value=',"\n            ","\n            oninput=",' />\n        </label>\n        <select class="regions" onchange=',">\n          ",'\n        </select>\n      </fieldset>\n      <button class="submit">Start</button>\n    </form>\n    ',"\n  </main>\n"],['\n  <main class="welcome-page">\n    <div class="welcome-header">\n      <h1 class="title"><em>No</em>Flash</h1>\n      <blockquote class="tagline">','</blockquote>\n    </div>\n    <form class="welcome-form ','"\n      onsubmit=','}>\n      <fieldset class="fieldset">\n        <label class="label">\n          Summoner name\n          <input\n            class="input"\n            value=',"\n            ","\n            oninput=",' />\n        </label>\n        <select class="regions" onchange=',">\n          ",'\n        </select>\n      </fieldset>\n      <button class="submit">Start</button>\n    </form>\n    ',"\n  </main>\n"]),_html=require(6),_html2=_interopRequireDefault(_html),_classnames2=require(8),_classnames3=_interopRequireDefault(_classnames2),_renderIf=require(48),_renderIf2=_interopRequireDefault(_renderIf),regions=["BR","EUNE","EUW","JP","KR","LAN","LAS","NA","OCE","PBE","RU","TR"],handleSubmit=function(e,n,t){e.preventDefault(),n.app.summoner?t("game:fetch",n.app.summoner):t("app:error","Empty summoner name")},handleInput=function(e,n,t){t("app:summoner",e.target.value)},handleChange=function(e,n,t){t("app:region",e.target.value)},classVariants=function(e){return(0,_classnames3.default)(_defineProperty({},"-loading",e.app.loading))},renderRegion=function(e,n){return(0,_html2.default)(_templateObject,e===n.app.region?"selected":"",e)},renderError=function(e){return(0,_html2.default)(_templateObject2,e)};exports.default=function(e,n,t){return(0,_html2.default)(_templateObject3,e.app.tagline,classVariants(e),function(n){return handleSubmit(n,e,t)},e.app.summoner,e.app.loading?"disabled":"",function(n){return handleInput(n,e,t)},function(n){return handleChange(n,e,t)},regions.map(function(n){return renderRegion(n,e)}),(0,_renderIf2.default)(e.app.error,e.app.error,renderError))};

},{"48":48,"6":6,"8":8}],54:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _taggedTemplateLiteral(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}function _defineProperty(e,t,l){return t in e?Object.defineProperty(e,t,{value:l,enumerable:!0,configurable:!0,writable:!0}):e[t]=l,e}Object.defineProperty(exports,"__esModule",{value:!0});var _templateObject=_taggedTemplateLiteral(['\n  <li class="ennemy-item ','"\n    onclick=','>\n    <div class="ennemy-meta">\n      <h2 class="champion">',"</h2>\n    </div>\n    ","\n  </li>\n"],['\n  <li class="ennemy-item ','"\n    onclick=','>\n    <div class="ennemy-meta">\n      <h2 class="champion">',"</h2>\n    </div>\n    ","\n  </li>\n"]),_html=require(6),_html2=_interopRequireDefault(_html),_classnames2=require(8),_classnames3=_interopRequireDefault(_classnames2),_closest=require(9),_closest2=_interopRequireDefault(_closest),_spellList=require(57),_spellList2=_interopRequireDefault(_spellList),handleClick=function(e,t,l){null==(0,_closest2.default)(e.target,".spell-item",!0)&&l("game:toggleFocus",t)},classVariants=function(e){return(0,_classnames3.default)(_defineProperty({},"-focused",e.focused))};exports.default=function(e,t,l){return(0,_html2.default)(_templateObject,classVariants(e),function(t){return handleClick(t,e,l)},e.champion.name,(0,_spellList2.default)(e,t,l))};

},{"57":57,"6":6,"8":8,"9":9}],55:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _taggedTemplateLiteral(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}Object.defineProperty(exports,"__esModule",{value:!0});var _templateObject=_taggedTemplateLiteral(['\n  <ul class="ennemy-list">\n    ',"\n  </ul>\n"],['\n  <ul class="ennemy-list">\n    ',"\n  </ul>\n"]),_html=require(6),_html2=_interopRequireDefault(_html),_closest=require(9),_closest2=_interopRequireDefault(_closest),_ennemyItem=require(54),_ennemyItem2=_interopRequireDefault(_ennemyItem),dragInfo=void 0,indexOf=function(e){return Array.prototype.indexOf.call(e.parentNode.childNodes,e)},handleDragStart=function(e){var t=(0,_closest2.default)(e.target,".ennemy-list");t.addEventListener("mousemove",handleDragMove),t.addEventListener("mouseup",handleDragEnd);var n=(0,_closest2.default)(e.target,".ennemy-item",!0);dragInfo={dragging:!1,start:e.clientY,index:indexOf(n),list:t,listItem:n}},handleDragMove=function(e){var t=dragInfo,n=t.list,r=t.listItem;if(!dragInfo.dragging&&Math.abs(e.clientY-dragInfo.start)>10&&(r.classList.add("-dragging"),dragInfo.dragging=!0),dragInfo.dragging){var a=(document.elementFromPoint(e.clientX,e.clientY),(0,_closest2.default)(e.target,".ennemy-item",!0));if(null!=a){var i=indexOf(a),l=a.nextElementSibling;i!==dragInfo.index&&(n.insertBefore(r,l),dragInfo.index=i)}}},handleDragEnd=function e(t){var n=dragInfo,r=n.list,a=n.listItem;a.classList.remove("-dragging"),a.style.transform="",r.removeEventListener("mousemove",handleDragMove),r.removeEventListener("mouseup",e)};exports.default=function(e,t,n){return(0,_html2.default)(_templateObject,e.ennemies.map(function(e){return(0,_ennemyItem2.default)(e,t,n)}))};

},{"54":54,"6":6,"9":9}],56:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _taggedTemplateLiteral(e,n){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(n)}}))}function _defineProperty(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}Object.defineProperty(exports,"__esModule",{value:!0});var _templateObject=_taggedTemplateLiteral(["\n    <g transform=",'\n      stroke-linecap="round"\n      vector-effect="non-scaling-stroke">\n      <circle class="progress-bg" cx="0" cy="0" r="50" />\n      <path class="progress" d=',"></path>\n    </g>\n  "],["\n    <g transform=",'\n      stroke-linecap="round"\n      vector-effect="non-scaling-stroke">\n      <circle class="progress-bg" cx="0" cy="0" r="50" />\n      <path class="progress" d=',"></path>\n    </g>\n  "]),_templateObject2=_taggedTemplateLiteral(['\n  <svg class="cooldown"\n    viewBox="-5 -5 110 110">\n    ',"\n  </svg>\n"],['\n  <svg class="cooldown"\n    viewBox="-5 -5 110 110">\n    ',"\n  </svg>\n"]),_templateObject3=_taggedTemplateLiteral(['\n  <li\n    class="spell-item ','"\n    onclick=',">\n    ",'\n    <svg class="icon">\n      <use xlink:href="#svg-','">\n    </svg>\n  </li>\n'],['\n  <li\n    class="spell-item ','"\n    onclick=',">\n    ",'\n    <svg class="icon">\n      <use xlink:href="#svg-','">\n    </svg>\n  </li>\n']),_html=require(6),_html2=_interopRequireDefault(_html),_classnames2=require(8),_classnames3=_interopRequireDefault(_classnames2),_renderIf=require(48),_renderIf2=_interopRequireDefault(_renderIf),handleClick=function(e,n,t){t("game:cooldown",n)},classVariants=function(e){var n;return(0,_classnames3.default)((n={},_defineProperty(n,"-"+e.id,!0),_defineProperty(n,"-"+e.state,!0),_defineProperty(n,"-time60",e.cooldown<=60&&e.cooldown>30),_defineProperty(n,"-time30",e.cooldown<=30&&e.cooldown>0),n))},drawCooldownPie=function(e){var n=50,t=1-e.cooldown/e.refCooldown,r=t*Math.PI*2,l=r>Math.PI?1:0,o=Math.sin(r)*n,a=Math.cos(r)*-n;return(0,_html2.default)(_templateObject,"translate("+n+", "+n+")","M 0 "+-n+" A "+n+" "+n+" 1 "+l+" 1 "+o+" "+a)},renderCooldown=function(e){return(0,_html2.default)(_templateObject2,drawCooldownPie(e))};exports.default=function(e,n,t){return(0,_html2.default)(_templateObject3,classVariants(e),function(n){return handleClick(n,e,t)},(0,_renderIf2.default)("cooldown"===e.state,e,renderCooldown),e.id)};

},{"48":48,"6":6,"8":8}],57:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function _taggedTemplateLiteral(e,t){return Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}Object.defineProperty(exports,"__esModule",{value:!0});var _templateObject=_taggedTemplateLiteral(['\n  <ul class="spell-list">\n    ',"\n  </ul>\n"],['\n  <ul class="spell-list">\n    ',"\n  </ul>\n"]),_html=require(6),_html2=_interopRequireDefault(_html),_spellItem=require(56),_spellItem2=_interopRequireDefault(_spellItem);exports.default=function(e,t,l){return(0,_html2.default)(_templateObject,e.spells.map(function(e){return(0,_spellItem2.default)(e,t,l)}))};

},{"56":56,"6":6}]},{},[47])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYmFycmFja3MvYXBwbHktaG9vay5qcyIsIm5vZGVfbW9kdWxlcy9iYXJyYWNrcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9iZWwvaW5kZXguanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2Nob28tbG9nL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Nob28vaHRtbC5qcyIsIm5vZGVfbW9kdWxlcy9jaG9vL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NsYXNzbmFtZXMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2xvc2VzdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kZWVwLWRpZmYvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZGV0ZWN0LWJyb3dzZXIvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9kZXRlY3QtYnJvd3Nlci9saWIvZGV0ZWN0QnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9kb2N1bWVudC1yZWFkeS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9mYXN0Y2xpY2svbGliL2Zhc3RjbGljay5qcyIsIm5vZGVfbW9kdWxlcy9mb3ItZWFjaC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9nbG9iYWwvZG9jdW1lbnQuanMiLCJub2RlX21vZHVsZXMvZ2xvYmFsL3dpbmRvdy5qcyIsIm5vZGVfbW9kdWxlcy9oYXNoLW1hdGNoL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2h5cGVyc2NyaXB0LWF0dHJpYnV0ZS10by1wcm9wZXJ0eS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9oeXBlcngvaW5kZXguanMiLCJub2RlX21vZHVsZXMvaXMtZnVuY3Rpb24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9sLWNoYW1waW9ucy9jaGFtcGlvbnMuanNvbiIsIm5vZGVfbW9kdWxlcy9sb2wtc3BlbGxzL3NwZWxscy5qc29uIiwibm9kZV9tb2R1bGVzL21hdGNoZXMtc2VsZWN0b3IvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbW9ycGhkb20vc3JjL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL25hbm9yYWYvaW5kZXguanMiLCJub2RlX21vZHVsZXMvb24tbG9hZC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wYWQtbGVmdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wYWQtcmlnaHQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcGFyc2UtaGVhZGVycy9wYXJzZS1oZWFkZXJzLmpzIiwibm9kZV9tb2R1bGVzL3BhdGhuYW1lLW1hdGNoL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlcGVhdC1zdHJpbmcvaW5kZXguanMiLCJub2RlX21vZHVsZXMvc2hlZXQtcm91dGVyL2hhc2guanMiLCJub2RlX21vZHVsZXMvc2hlZXQtcm91dGVyL2hpc3RvcnkuanMiLCJub2RlX21vZHVsZXMvc2hlZXQtcm91dGVyL2hyZWYuanMiLCJub2RlX21vZHVsZXMvc2hlZXQtcm91dGVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3N0b3JlL3N0b3JlLmpzIiwibm9kZV9tb2R1bGVzL3RyaW0vaW5kZXguanMiLCJub2RlX21vZHVsZXMvdW5pcXVlaWQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvd2F5ZmFyZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvd2F5ZmFyZXIvdHJpZS5qcyIsIm5vZGVfbW9kdWxlcy94aHIvaW5kZXguanMiLCJub2RlX21vZHVsZXMveHRlbmQvaW1tdXRhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3h0ZW5kL211dGFibGUuanMiLCJub2RlX21vZHVsZXMveW8teW8vaW5kZXguanMiLCJub2RlX21vZHVsZXMveW8teW8vdXBkYXRlLWV2ZW50cy5qcyIsInNyYy9pbmRleC5qcyIsInNyYy9saWIvcmVuZGVyLWlmLmpzIiwic3JjL21vZGVscy9hcGkuanMiLCJzcmMvbW9kZWxzL2FwcC5qcyIsInNyYy9tb2RlbHMvZ2FtZS5qcyIsInNyYy9wYWdlcy9pbmdhbWUuanMiLCJzcmMvcGFnZXMvd2VsY29tZS5qcyIsInNyYy92aWV3cy9lbm5lbXktaXRlbS5qcyIsInNyYy92aWV3cy9lbm5lbXktbGlzdC5qcyIsInNyYy92aWV3cy9zcGVsbC1pdGVtLmpzIiwic3JjL3ZpZXdzL3NwZWxsLWxpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNJQSxRQUFTLFdBQVcsRUFBSyxFQUFNLEVBQU0sRUFBTSxFQUFNLEdBQy9DLEVBQUksUUFBUSxTQUFVLEdBQ3BCLEVBQUcsRUFBTSxFQUFNLEVBQU0sRUFBTSxLQU4vQixPQUFPLFFBQVU7OztBQ1VqQixRQUFTLFlBQVksR0FrQ25CLFFBQVMsR0FBSyxHQU1SLEVBQU0sZUFBZSxFQUFtQixLQUFLLEVBQU0sZUFDbkQsRUFBTSxTQUFTLEVBQWEsS0FBSyxZQUFZLEVBQU0sVUFDbkQsRUFBTSxVQUFVLEVBQWMsS0FBSyxFQUFNLFVBQ3pDLEVBQU0sbUJBQW1CLEVBQWtCLEtBQUssRUFBTSxtQkFDdEQsRUFBTSxrQkFBa0IsRUFBa0IsS0FBSyxFQUFNLGtCQUNyRCxFQUFNLGNBQWMsRUFBYSxLQUFLLEVBQU0sY0FDNUMsRUFBTSxhQUFhLEVBQVksS0FBSyxFQUFNLGFBS2hELFFBQVMsR0FBVSxHQUVqQixFQUFPLEtBQUssR0FLZCxRQUFTLEdBQVUsR0FDakIsRUFBTyxLQUdQLE1BQU0sR0FBUSxFQUFLLEtBQ25CLEtBQUssRUFBSyxPQUFTLEVBQUssVUFBVyxFQUFPLE1BQU8sT0FBTSxFQUNsRCxLQUFLLEVBQUssTUFBTyxNQUFPLFFBQU8sT0FBTyxNQUFNLEdBR2pELE1BQU0sTUFDQSxJQUlOLEdBQU8sUUFBUSxTQUFVLEdBQ3ZCLEtBQU0sR0FBSyxFQUFNLFNBQ2pCLEdBQVcsS0FBSyxFQUNoQixNQUFNLEdBQWEsRUFBTSxTQUNyQixJQUNGLEVBQVMsR0FBTSxFQUFTLE9BQ3hCLE1BQU0sRUFBSSxFQUFZLEdBQ3RCLEVBQVMsR0FBTSxNQUFNLEVBQVMsR0FBSyxFQUFN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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNpS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QkFFVCxFQUFPLE9BQU8sSUFBSSxTQUFBLEdBQUEsT0FBUyxFQUFBLFlBQUEsU0FBVSxFQUFPLEVBQU0iLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBhcHBseUhvb2tcblxuLy8gYXBwbHkgYXJndW1lbnRzIG9udG8gYW4gYXJyYXkgb2YgZnVuY3Rpb25zLCB1c2VmdWwgZm9yIGhvb2tzXG4vLyAoYXJyLCBhbnk/LCBhbnk/LCBhbnk/LCBhbnk/LCBhbnk/KSAtPiBudWxsXG5mdW5jdGlvbiBhcHBseUhvb2sgKGFyciwgYXJnMSwgYXJnMiwgYXJnMywgYXJnNCwgYXJnNSkge1xuICBhcnIuZm9yRWFjaChmdW5jdGlvbiAoZm4pIHtcbiAgICBmbihhcmcxLCBhcmcyLCBhcmczLCBhcmc0LCBhcmc1KVxuICB9KVxufVxuIiwiY29uc3QgbXV0YXRlID0gcmVxdWlyZSgneHRlbmQvbXV0YWJsZScpXG5jb25zdCBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKVxuY29uc3QgeHRlbmQgPSByZXF1aXJlKCd4dGVuZCcpXG5cbmNvbnN0IGFwcGx5SG9vayA9IHJlcXVpcmUoJy4vYXBwbHktaG9vaycpXG5cbm1vZHVsZS5leHBvcnRzID0gZGlzcGF0Y2hlclxuXG4vLyBpbml0aWFsaXplIGEgbmV3IGJhcnJhY2tzIGluc3RhbmNlXG4vLyBvYmogLT4gb2JqXG5mdW5jdGlvbiBkaXNwYXRjaGVyIChob29rcykge1xuICBob29rcyA9IGhvb2tzIHx8IHt9XG4gIGFzc2VydC5lcXVhbCh0eXBlb2YgaG9va3MsICdvYmplY3QnLCAnYmFycmFja3M6IGhvb2tzIHNob3VsZCBiZSB1bmRlZmluZWQgb3IgYW4gb2JqZWN0JylcblxuICBjb25zdCBvblN0YXRlQ2hhbmdlSG9va3MgPSBbXVxuICBjb25zdCBvbkFjdGlvbkhvb2tzID0gW11cbiAgY29uc3Qgb25FcnJvckhvb2tzID0gW11cblxuICBjb25zdCBzdWJzY3JpcHRpb25XcmFwcyA9IFtdXG4gIGNvbnN0IGluaXRpYWxTdGF0ZVdyYXBzID0gW11cbiAgY29uc3QgcmVkdWNlcldyYXBzID0gW11cbiAgY29uc3QgZWZmZWN0V3JhcHMgPSBbXVxuXG4gIHVzZShob29rcylcblxuICB2YXIgcmVkdWNlcnNDYWxsZWQgPSBmYWxzZVxuICB2YXIgZWZmZWN0c0NhbGxlZCA9IGZhbHNlXG4gIHZhciBzdGF0ZUNhbGxlZCA9IGZhbHNlXG4gIHZhciBzdWJzQ2FsbGVkID0gZmFsc2VcblxuICBjb25zdCBzdWJzY3JpcHRpb25zID0gc3RhcnQuX3N1YnNjcmlwdGlvbnMgPSB7fVxuICBjb25zdCByZWR1Y2VycyA9IHN0YXJ0Ll9yZWR1Y2VycyA9IHt9XG4gIGNvbnN0IGVmZmVjdHMgPSBzdGFydC5fZWZmZWN0cyA9IHt9XG4gIGNvbnN0IG1vZGVscyA9IHN0YXJ0Ll9tb2RlbHMgPSBbXVxuICB2YXIgX3N0YXRlID0ge31cblxuICBzdGFydC5tb2RlbCA9IHNldE1vZGVsXG4gIHN0YXJ0LnN0YXRlID0gZ2V0U3RhdGVcbiAgc3RhcnQuc3RhcnQgPSBzdGFydFxuICBzdGFydC51c2UgPSB1c2VcbiAgcmV0dXJuIHN0YXJ0XG5cbiAgLy8gcHVzaCBhbiBvYmplY3Qgb2YgaG9va3Mgb250byBhbiBhcnJheVxuICAvLyBvYmogLT4gbnVsbFxuICBmdW5jdGlvbiB1c2UgKGhvb2tzKSB7XG4gICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBob29rcywgJ29iamVjdCcsICdiYXJyYWNrcy51c2U6IGhvb2tzIHNob3VsZCBiZSBhbiBvYmplY3QnKVxuICAgIGFzc2VydC5vayghaG9va3Mub25FcnJvciB8fCB0eXBlb2YgaG9va3Mub25FcnJvciA9PT0gJ2Z1bmN0aW9uJywgJ2JhcnJhY2tzLnVzZTogb25FcnJvciBzaG91bGQgYmUgdW5kZWZpbmVkIG9yIGEgZnVuY3Rpb24nKVxuICAgIGFzc2VydC5vayghaG9va3Mub25BY3Rpb24gfHwgdHlwZW9mIGhvb2tzLm9uQWN0aW9uID09PSAnZnVuY3Rpb24nLCAnYmFycmFja3MudXNlOiBvbkFjdGlvbiBzaG91bGQgYmUgdW5kZWZpbmVkIG9yIGEgZnVuY3Rpb24nKVxuICAgIGFzc2VydC5vayghaG9va3Mub25TdGF0ZUNoYW5nZSB8fCB0eXBlb2YgaG9va3Mub25TdGF0ZUNoYW5nZSA9PT0gJ2Z1bmN0aW9uJywgJ2JhcnJhY2tzLnVzZTogb25TdGF0ZUNoYW5nZSBzaG91bGQgYmUgdW5kZWZpbmVkIG9yIGEgZnVuY3Rpb24nKVxuXG4gICAgaWYgKGhvb2tzLm9uU3RhdGVDaGFuZ2UpIG9uU3RhdGVDaGFuZ2VIb29rcy5wdXNoKGhvb2tzLm9uU3RhdGVDaGFuZ2UpXG4gICAgaWYgKGhvb2tzLm9uRXJyb3IpIG9uRXJyb3JIb29rcy5wdXNoKHdyYXBPbkVycm9yKGhvb2tzLm9uRXJyb3IpKVxuICAgIGlmIChob29rcy5vbkFjdGlvbikgb25BY3Rpb25Ib29rcy5wdXNoKGhvb2tzLm9uQWN0aW9uKVxuICAgIGlmIChob29rcy53cmFwU3Vic2NyaXB0aW9ucykgc3Vic2NyaXB0aW9uV3JhcHMucHVzaChob29rcy53cmFwU3Vic2NyaXB0aW9ucylcbiAgICBpZiAoaG9va3Mud3JhcEluaXRpYWxTdGF0ZSkgaW5pdGlhbFN0YXRlV3JhcHMucHVzaChob29rcy53cmFwSW5pdGlhbFN0YXRlKVxuICAgIGlmIChob29rcy53cmFwUmVkdWNlcnMpIHJlZHVjZXJXcmFwcy5wdXNoKGhvb2tzLndyYXBSZWR1Y2VycylcbiAgICBpZiAoaG9va3Mud3JhcEVmZmVjdHMpIGVmZmVjdFdyYXBzLnB1c2goaG9va3Mud3JhcEVmZmVjdHMpXG4gIH1cblxuICAvLyBwdXNoIGEgbW9kZWwgdG8gYmUgaW5pdGlhdGVkXG4gIC8vIG9iaiAtPiBudWxsXG4gIGZ1bmN0aW9uIHNldE1vZGVsIChtb2RlbCkge1xuICAgIGFzc2VydC5lcXVhbCh0eXBlb2YgbW9kZWwsICdvYmplY3QnLCAnYmFycmFja3Muc3RvcmUubW9kZWw6IG1vZGVsIHNob3VsZCBiZSBhbiBvYmplY3QnKVxuICAgIG1vZGVscy5wdXNoKG1vZGVsKVxuICB9XG5cbiAgLy8gZ2V0IHRoZSBjdXJyZW50IHN0YXRlIGZyb20gdGhlIHN0b3JlXG4gIC8vIG9iaj8gLT4gb2JqXG4gIGZ1bmN0aW9uIGdldFN0YXRlIChvcHRzKSB7XG4gICAgb3B0cyA9IG9wdHMgfHwge31cbiAgICBhc3NlcnQuZXF1YWwodHlwZW9mIG9wdHMsICdvYmplY3QnLCAnYmFycmFja3Muc3RvcmUuc3RhdGU6IG9wdHMgc2hvdWxkIGJlIGFuIG9iamVjdCcpXG5cbiAgICBjb25zdCBzdGF0ZSA9IG9wdHMuc3RhdGVcbiAgICBpZiAoIW9wdHMuc3RhdGUgJiYgb3B0cy5mcmVlemUgPT09IGZhbHNlKSByZXR1cm4geHRlbmQoX3N0YXRlKVxuICAgIGVsc2UgaWYgKCFvcHRzLnN0YXRlKSByZXR1cm4gT2JqZWN0LmZyZWV6ZSh4dGVuZChfc3RhdGUpKVxuICAgIGFzc2VydC5lcXVhbCh0eXBlb2Ygc3RhdGUsICdvYmplY3QnLCAnYmFycmFja3Muc3RvcmUuc3RhdGU6IHN0YXRlIHNob3VsZCBiZSBhbiBvYmplY3QnKVxuXG4gICAgY29uc3QgbmFtZXNwYWNlcyA9IFtdXG4gICAgY29uc3QgbmV3U3RhdGUgPSB7fVxuXG4gICAgLy8gYXBwbHkgYWxsIGZpZWxkcyBmcm9tIHRoZSBtb2RlbCwgYW5kIG5hbWVzcGFjZWQgZmllbGRzIGZyb20gdGhlIHBhc3NlZFxuICAgIC8vIGluIHN0YXRlXG4gICAgbW9kZWxzLmZvckVhY2goZnVuY3Rpb24gKG1vZGVsKSB7XG4gICAgICBjb25zdCBucyA9IG1vZGVsLm5hbWVzcGFjZVxuICAgICAgbmFtZXNwYWNlcy5wdXNoKG5zKVxuICAgICAgY29uc3QgbW9kZWxTdGF0ZSA9IG1vZGVsLnN0YXRlIHx8IHt9XG4gICAgICBpZiAobnMpIHtcbiAgICAgICAgbmV3U3RhdGVbbnNdID0gbmV3U3RhdGVbbnNdIHx8IHt9XG4gICAgICAgIGFwcGx5KG5zLCBtb2RlbFN0YXRlLCBuZXdTdGF0ZSlcbiAgICAgICAgbmV3U3RhdGVbbnNdID0geHRlbmQobmV3U3RhdGVbbnNdLCBzdGF0ZVtuc10pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtdXRhdGUobmV3U3RhdGUsIG1vZGVsU3RhdGUpXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIG5vdyBhcHBseSBhbGwgZmllbGRzIHRoYXQgd2VyZW4ndCBuYW1lc3BhY2VkIGZyb20gdGhlIHBhc3NlZCBpbiBzdGF0ZVxuICAgIE9iamVjdC5rZXlzKHN0YXRlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGlmIChuYW1lc3BhY2VzLmluZGV4T2Yoa2V5KSAhPT0gLTEpIHJldHVyblxuICAgICAgbmV3U3RhdGVba2V5XSA9IHN0YXRlW2tleV1cbiAgICB9KVxuXG4gICAgY29uc3QgdG1wU3RhdGUgPSB4dGVuZChfc3RhdGUsIHh0ZW5kKHN0YXRlLCBuZXdTdGF0ZSkpXG4gICAgY29uc3Qgd3JhcHBlZFN0YXRlID0gd3JhcEhvb2sodG1wU3RhdGUsIGluaXRpYWxTdGF0ZVdyYXBzKVxuXG4gICAgcmV0dXJuIChvcHRzLmZyZWV6ZSA9PT0gZmFsc2UpXG4gICAgICA/IHdyYXBwZWRTdGF0ZVxuICAgICAgOiBPYmplY3QuZnJlZXplKHdyYXBwZWRTdGF0ZSlcbiAgfVxuXG4gIC8vIGluaXRpYWxpemUgdGhlIHN0b3JlIGhvb2tzLCBnZXQgdGhlIHNlbmQoKSBmdW5jdGlvblxuICAvLyBvYmo/IC0+IGZuXG4gIGZ1bmN0aW9uIHN0YXJ0IChvcHRzKSB7XG4gICAgb3B0cyA9IG9wdHMgfHwge31cbiAgICBhc3NlcnQuZXF1YWwodHlwZW9mIG9wdHMsICdvYmplY3QnLCAnYmFycmFja3Muc3RvcmUuc3RhcnQ6IG9wdHMgc2hvdWxkIGJlIHVuZGVmaW5lZCBvciBhbiBvYmplY3QnKVxuXG4gICAgLy8gcmVnaXN0ZXIgdmFsdWVzIGZyb20gdGhlIG1vZGVsc1xuICAgIG1vZGVscy5mb3JFYWNoKGZ1bmN0aW9uIChtb2RlbCkge1xuICAgICAgY29uc3QgbnMgPSBtb2RlbC5uYW1lc3BhY2VcbiAgICAgIGlmICghc3RhdGVDYWxsZWQgJiYgbW9kZWwuc3RhdGUgJiYgb3B0cy5zdGF0ZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgbW9kZWxTdGF0ZSA9IG1vZGVsLnN0YXRlIHx8IHt9XG4gICAgICAgIGlmIChucykge1xuICAgICAgICAgIF9zdGF0ZVtuc10gPSBfc3RhdGVbbnNdIHx8IHt9XG4gICAgICAgICAgYXBwbHkobnMsIG1vZGVsU3RhdGUsIF9zdGF0ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtdXRhdGUoX3N0YXRlLCBtb2RlbFN0YXRlKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIXJlZHVjZXJzQ2FsbGVkICYmIG1vZGVsLnJlZHVjZXJzICYmIG9wdHMucmVkdWNlcnMgIT09IGZhbHNlKSB7XG4gICAgICAgIGFwcGx5KG5zLCBtb2RlbC5yZWR1Y2VycywgcmVkdWNlcnMsIGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgIHJldHVybiB3cmFwSG9vayhjYiwgcmVkdWNlcldyYXBzKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgaWYgKCFlZmZlY3RzQ2FsbGVkICYmIG1vZGVsLmVmZmVjdHMgJiYgb3B0cy5lZmZlY3RzICE9PSBmYWxzZSkge1xuICAgICAgICBhcHBseShucywgbW9kZWwuZWZmZWN0cywgZWZmZWN0cywgZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgcmV0dXJuIHdyYXBIb29rKGNiLCBlZmZlY3RXcmFwcylcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGlmICghc3Vic0NhbGxlZCAmJiBtb2RlbC5zdWJzY3JpcHRpb25zICYmIG9wdHMuc3Vic2NyaXB0aW9ucyAhPT0gZmFsc2UpIHtcbiAgICAgICAgYXBwbHkobnMsIG1vZGVsLnN1YnNjcmlwdGlvbnMsIHN1YnNjcmlwdGlvbnMsIGZ1bmN0aW9uIChjYiwga2V5KSB7XG4gICAgICAgICAgY29uc3Qgc2VuZCA9IGNyZWF0ZVNlbmQoJ3N1YnNjcmlwdGlvbjogJyArIChucyA/IG5zICsgJzonICsga2V5IDoga2V5KSlcbiAgICAgICAgICBjYiA9IHdyYXBIb29rKGNiLCBzdWJzY3JpcHRpb25XcmFwcylcbiAgICAgICAgICBjYihzZW5kLCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICBhcHBseUhvb2sob25FcnJvckhvb2tzLCBlcnIsIF9zdGF0ZSwgY3JlYXRlU2VuZClcbiAgICAgICAgICB9KVxuICAgICAgICAgIHJldHVybiBjYlxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyB0aGUgc3RhdGUgd3JhcCBpcyBzcGVjaWFsIGJlY2F1c2Ugd2Ugd2FudCB0byBvcGVyYXRlIG9uIHRoZSBmdWxsXG4gICAgLy8gc3RhdGUgcmF0aGVyIHRoYW4gaW5kdmlkdWFsIGNodW5rcywgc28gd2UgYXBwbHkgaXQgb3V0c2lkZSB0aGUgbG9vcFxuICAgIGlmICghc3RhdGVDYWxsZWQgJiYgb3B0cy5zdGF0ZSAhPT0gZmFsc2UpIHtcbiAgICAgIF9zdGF0ZSA9IHdyYXBIb29rKF9zdGF0ZSwgaW5pdGlhbFN0YXRlV3JhcHMpXG4gICAgfVxuXG4gICAgaWYgKCFvcHRzLm5vU3Vic2NyaXB0aW9ucykgc3Vic0NhbGxlZCA9IHRydWVcbiAgICBpZiAoIW9wdHMubm9SZWR1Y2VycykgcmVkdWNlcnNDYWxsZWQgPSB0cnVlXG4gICAgaWYgKCFvcHRzLm5vRWZmZWN0cykgZWZmZWN0c0NhbGxlZCA9IHRydWVcbiAgICBpZiAoIW9wdHMubm9TdGF0ZSkgc3RhdGVDYWxsZWQgPSB0cnVlXG5cbiAgICBpZiAoIW9uRXJyb3JIb29rcy5sZW5ndGgpIG9uRXJyb3JIb29rcy5wdXNoKHdyYXBPbkVycm9yKGRlZmF1bHRPbkVycm9yKSlcblxuICAgIHJldHVybiBjcmVhdGVTZW5kXG5cbiAgICAvLyBjYWxsIGFuIGFjdGlvbiBmcm9tIGEgdmlld1xuICAgIC8vIChzdHIsIGJvb2w/KSAtPiAoc3RyLCBhbnk/LCBmbj8pIC0+IG51bGxcbiAgICBmdW5jdGlvbiBjcmVhdGVTZW5kIChzZWxmTmFtZSwgY2FsbE9uRXJyb3IpIHtcbiAgICAgIGFzc2VydC5lcXVhbCh0eXBlb2Ygc2VsZk5hbWUsICdzdHJpbmcnLCAnYmFycmFja3Muc3RvcmUuc3RhcnQuY3JlYXRlU2VuZDogc2VsZk5hbWUgc2hvdWxkIGJlIGEgc3RyaW5nJylcbiAgICAgIGFzc2VydC5vayghY2FsbE9uRXJyb3IgfHwgdHlwZW9mIGNhbGxPbkVycm9yID09PSAnYm9vbGVhbicsICdiYXJyYWNrcy5zdG9yZS5zdGFydC5zZW5kOiBjYWxsT25FcnJvciBzaG91bGQgYmUgdW5kZWZpbmVkIG9yIGEgYm9vbGVhbicpXG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiBzZW5kIChuYW1lLCBkYXRhLCBjYikge1xuICAgICAgICBpZiAoIWNiICYmICFjYWxsT25FcnJvcikge1xuICAgICAgICAgIGNiID0gZGF0YVxuICAgICAgICAgIGRhdGEgPSBudWxsXG4gICAgICAgIH1cbiAgICAgICAgZGF0YSA9ICh0eXBlb2YgZGF0YSA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogZGF0YSlcblxuICAgICAgICBhc3NlcnQuZXF1YWwodHlwZW9mIG5hbWUsICdzdHJpbmcnLCAnYmFycmFja3Muc3RvcmUuc3RhcnQuc2VuZDogbmFtZSBzaG91bGQgYmUgYSBzdHJpbmcnKVxuICAgICAgICBhc3NlcnQub2soIWNiIHx8IHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJywgJ2JhcnJhY2tzLnN0b3JlLnN0YXJ0LnNlbmQ6IGNiIHNob3VsZCBiZSBhIGZ1bmN0aW9uJylcblxuICAgICAgICBjb25zdCBkb25lID0gY2FsbE9uRXJyb3IgPyBvbkVycm9yQ2FsbGJhY2sgOiBjYlxuICAgICAgICBfc2VuZChuYW1lLCBkYXRhLCBzZWxmTmFtZSwgZG9uZSlcblxuICAgICAgICBmdW5jdGlvbiBvbkVycm9yQ2FsbGJhY2sgKGVycikge1xuICAgICAgICAgIGVyciA9IGVyciB8fCBudWxsXG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgYXBwbHlIb29rKG9uRXJyb3JIb29rcywgZXJyLCBfc3RhdGUsIGZ1bmN0aW9uIGNyZWF0ZVNlbmQgKHNlbGZOYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBzZW5kIChuYW1lLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBuYW1lLCAnc3RyaW5nJywgJ2JhcnJhY2tzLnN0b3JlLnN0YXJ0LnNlbmQ6IG5hbWUgc2hvdWxkIGJlIGEgc3RyaW5nJylcbiAgICAgICAgICAgICAgICBkYXRhID0gKHR5cGVvZiBkYXRhID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiBkYXRhKVxuICAgICAgICAgICAgICAgIF9zZW5kKG5hbWUsIGRhdGEsIHNlbGZOYW1lLCBkb25lKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNhbGwgYW4gYWN0aW9uXG4gICAgLy8gKHN0ciwgc3RyLCBhbnksIGZuKSAtPiBudWxsXG4gICAgZnVuY3Rpb24gX3NlbmQgKG5hbWUsIGRhdGEsIGNhbGxlciwgY2IpIHtcbiAgICAgIGFzc2VydC5lcXVhbCh0eXBlb2YgbmFtZSwgJ3N0cmluZycsICdiYXJyYWNrcy5fc2VuZDogbmFtZSBzaG91bGQgYmUgYSBzdHJpbmcnKVxuICAgICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBjYWxsZXIsICdzdHJpbmcnLCAnYmFycmFja3MuX3NlbmQ6IGNhbGxlciBzaG91bGQgYmUgYSBzdHJpbmcnKVxuICAgICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBjYiwgJ2Z1bmN0aW9uJywgJ2JhcnJhY2tzLl9zZW5kOiBjYiBzaG91bGQgYmUgYSBmdW5jdGlvbicpXG5cbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmVkdWNlcnNDYWxsZWQgPSBmYWxzZVxuICAgICAgICB2YXIgZWZmZWN0c0NhbGxlZCA9IGZhbHNlXG4gICAgICAgIGNvbnN0IG5ld1N0YXRlID0geHRlbmQoX3N0YXRlKVxuXG4gICAgICAgIGlmIChvbkFjdGlvbkhvb2tzLmxlbmd0aCkge1xuICAgICAgICAgIGFwcGx5SG9vayhvbkFjdGlvbkhvb2tzLCBkYXRhLCBfc3RhdGUsIG5hbWUsIGNhbGxlciwgY3JlYXRlU2VuZClcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZhbGlkYXRlIGlmIGEgbmFtZXNwYWNlIGV4aXN0cy4gTmFtZXNwYWNlcyBhcmUgZGVsaW1pdGVkIGJ5ICc6Jy5cbiAgICAgICAgdmFyIGFjdGlvbk5hbWUgPSBuYW1lXG4gICAgICAgIGlmICgvOi8udGVzdChuYW1lKSkge1xuICAgICAgICAgIGNvbnN0IGFyciA9IG5hbWUuc3BsaXQoJzonKVxuICAgICAgICAgIHZhciBucyA9IGFyci5zaGlmdCgpXG4gICAgICAgICAgYWN0aW9uTmFtZSA9IGFyci5qb2luKCc6JylcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IF9yZWR1Y2VycyA9IG5zID8gcmVkdWNlcnNbbnNdIDogcmVkdWNlcnNcbiAgICAgICAgaWYgKF9yZWR1Y2VycyAmJiBfcmVkdWNlcnNbYWN0aW9uTmFtZV0pIHtcbiAgICAgICAgICBpZiAobnMpIHtcbiAgICAgICAgICAgIGNvbnN0IHJlZHVjZWRTdGF0ZSA9IF9yZWR1Y2Vyc1thY3Rpb25OYW1lXShkYXRhLCBfc3RhdGVbbnNdKVxuICAgICAgICAgICAgbmV3U3RhdGVbbnNdID0geHRlbmQoX3N0YXRlW25zXSwgcmVkdWNlZFN0YXRlKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtdXRhdGUobmV3U3RhdGUsIHJlZHVjZXJzW2FjdGlvbk5hbWVdKGRhdGEsIF9zdGF0ZSkpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJlZHVjZXJzQ2FsbGVkID0gdHJ1ZVxuICAgICAgICAgIGlmIChvblN0YXRlQ2hhbmdlSG9va3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBhcHBseUhvb2sob25TdGF0ZUNoYW5nZUhvb2tzLCBkYXRhLCBuZXdTdGF0ZSwgX3N0YXRlLCBhY3Rpb25OYW1lLCBjcmVhdGVTZW5kKVxuICAgICAgICAgIH1cbiAgICAgICAgICBfc3RhdGUgPSBuZXdTdGF0ZVxuICAgICAgICAgIGNiKG51bGwsIG5ld1N0YXRlKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgX2VmZmVjdHMgPSBucyA/IGVmZmVjdHNbbnNdIDogZWZmZWN0c1xuICAgICAgICBpZiAoIXJlZHVjZXJzQ2FsbGVkICYmIF9lZmZlY3RzICYmIF9lZmZlY3RzW2FjdGlvbk5hbWVdKSB7XG4gICAgICAgICAgY29uc3Qgc2VuZCA9IGNyZWF0ZVNlbmQoJ2VmZmVjdDogJyArIG5hbWUpXG4gICAgICAgICAgaWYgKG5zKSBfZWZmZWN0c1thY3Rpb25OYW1lXShkYXRhLCBfc3RhdGVbbnNdLCBzZW5kLCBjYilcbiAgICAgICAgICBlbHNlIF9lZmZlY3RzW2FjdGlvbk5hbWVdKGRhdGEsIF9zdGF0ZSwgc2VuZCwgY2IpXG4gICAgICAgICAgZWZmZWN0c0NhbGxlZCA9IHRydWVcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcmVkdWNlcnNDYWxsZWQgJiYgIWVmZmVjdHNDYWxsZWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIGFjdGlvbiAnICsgYWN0aW9uTmFtZSlcbiAgICAgICAgfVxuICAgICAgfSwgMClcbiAgICB9XG4gIH1cbn1cblxuLy8gY29tcG9zZSBhbiBvYmplY3QgY29uZGl0aW9uYWxseVxuLy8gb3B0aW9uYWxseSBjb250YWlucyBhIG5hbWVzcGFjZVxuLy8gd2hpY2ggaXMgdXNlZCB0byBuZXN0IHByb3BlcnRpZXMuXG4vLyAoc3RyLCBvYmosIG9iaiwgZm4/KSAtPiBudWxsXG5mdW5jdGlvbiBhcHBseSAobnMsIHNvdXJjZSwgdGFyZ2V0LCB3cmFwKSB7XG4gIGlmIChucyAmJiAhdGFyZ2V0W25zXSkgdGFyZ2V0W25zXSA9IHt9XG4gIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgY29uc3QgY2IgPSB3cmFwID8gd3JhcChzb3VyY2Vba2V5XSwga2V5KSA6IHNvdXJjZVtrZXldXG4gICAgaWYgKG5zKSB0YXJnZXRbbnNdW2tleV0gPSBjYlxuICAgIGVsc2UgdGFyZ2V0W2tleV0gPSBjYlxuICB9KVxufVxuXG4vLyBoYW5kbGUgZXJyb3JzIGFsbCB0aGUgd2F5IGF0IHRoZSB0b3Agb2YgdGhlIHRyYWNlXG4vLyBlcnI/IC0+IG51bGxcbmZ1bmN0aW9uIGRlZmF1bHRPbkVycm9yIChlcnIpIHtcbiAgdGhyb3cgZXJyXG59XG5cbmZ1bmN0aW9uIHdyYXBPbkVycm9yIChvbkVycm9yKSB7XG4gIHJldHVybiBmdW5jdGlvbiBvbkVycm9yV3JhcCAoZXJyLCBzdGF0ZSwgY3JlYXRlU2VuZCkge1xuICAgIGlmIChlcnIpIG9uRXJyb3IoZXJyLCBzdGF0ZSwgY3JlYXRlU2VuZClcbiAgfVxufVxuXG4vLyB0YWtlIGEgYXBwbHkgYW4gYXJyYXkgb2YgdHJhbnNmb3JtcyBvbnRvIGEgdmFsdWUuIFRoZSBuZXcgdmFsdWVcbi8vIG11c3QgYmUgcmV0dXJuZWQgc3luY2hyb25vdXNseSBmcm9tIHRoZSB0cmFuc2Zvcm1cbi8vIChhbnksIFtmbl0pIC0+IGFueVxuZnVuY3Rpb24gd3JhcEhvb2sgKHZhbHVlLCB0cmFuc2Zvcm1zKSB7XG4gIHRyYW5zZm9ybXMuZm9yRWFjaChmdW5jdGlvbiAodHJhbnNmb3JtKSB7XG4gICAgdmFsdWUgPSB0cmFuc2Zvcm0odmFsdWUpXG4gIH0pXG4gIHJldHVybiB2YWx1ZVxufVxuIiwidmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnZ2xvYmFsL2RvY3VtZW50JylcclxudmFyIGh5cGVyeCA9IHJlcXVpcmUoJ2h5cGVyeCcpXHJcbnZhciBvbmxvYWQgPSByZXF1aXJlKCdvbi1sb2FkJylcclxuXHJcbnZhciBTVkdOUyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZydcclxudmFyIFhMSU5LTlMgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaydcclxuXHJcbnZhciBCT09MX1BST1BTID0ge1xyXG4gIGF1dG9mb2N1czogMSxcclxuICBjaGVja2VkOiAxLFxyXG4gIGRlZmF1bHRjaGVja2VkOiAxLFxyXG4gIGRpc2FibGVkOiAxLFxyXG4gIGZvcm1ub3ZhbGlkYXRlOiAxLFxyXG4gIGluZGV0ZXJtaW5hdGU6IDEsXHJcbiAgcmVhZG9ubHk6IDEsXHJcbiAgcmVxdWlyZWQ6IDEsXHJcbiAgc2VsZWN0ZWQ6IDEsXHJcbiAgd2lsbHZhbGlkYXRlOiAxXHJcbn1cclxudmFyIFNWR19UQUdTID0gW1xyXG4gICdzdmcnLFxyXG4gICdhbHRHbHlwaCcsICdhbHRHbHlwaERlZicsICdhbHRHbHlwaEl0ZW0nLCAnYW5pbWF0ZScsICdhbmltYXRlQ29sb3InLFxyXG4gICdhbmltYXRlTW90aW9uJywgJ2FuaW1hdGVUcmFuc2Zvcm0nLCAnY2lyY2xlJywgJ2NsaXBQYXRoJywgJ2NvbG9yLXByb2ZpbGUnLFxyXG4gICdjdXJzb3InLCAnZGVmcycsICdkZXNjJywgJ2VsbGlwc2UnLCAnZmVCbGVuZCcsICdmZUNvbG9yTWF0cml4JyxcclxuICAnZmVDb21wb25lbnRUcmFuc2ZlcicsICdmZUNvbXBvc2l0ZScsICdmZUNvbnZvbHZlTWF0cml4JywgJ2ZlRGlmZnVzZUxpZ2h0aW5nJyxcclxuICAnZmVEaXNwbGFjZW1lbnRNYXAnLCAnZmVEaXN0YW50TGlnaHQnLCAnZmVGbG9vZCcsICdmZUZ1bmNBJywgJ2ZlRnVuY0InLFxyXG4gICdmZUZ1bmNHJywgJ2ZlRnVuY1InLCAnZmVHYXVzc2lhbkJsdXInLCAnZmVJbWFnZScsICdmZU1lcmdlJywgJ2ZlTWVyZ2VOb2RlJyxcclxuICAnZmVNb3JwaG9sb2d5JywgJ2ZlT2Zmc2V0JywgJ2ZlUG9pbnRMaWdodCcsICdmZVNwZWN1bGFyTGlnaHRpbmcnLFxyXG4gICdmZVNwb3RMaWdodCcsICdmZVRpbGUnLCAnZmVUdXJidWxlbmNlJywgJ2ZpbHRlcicsICdmb250JywgJ2ZvbnQtZmFjZScsXHJcbiAgJ2ZvbnQtZmFjZS1mb3JtYXQnLCAnZm9udC1mYWNlLW5hbWUnLCAnZm9udC1mYWNlLXNyYycsICdmb250LWZhY2UtdXJpJyxcclxuICAnZm9yZWlnbk9iamVjdCcsICdnJywgJ2dseXBoJywgJ2dseXBoUmVmJywgJ2hrZXJuJywgJ2ltYWdlJywgJ2xpbmUnLFxyXG4gICdsaW5lYXJHcmFkaWVudCcsICdtYXJrZXInLCAnbWFzaycsICdtZXRhZGF0YScsICdtaXNzaW5nLWdseXBoJywgJ21wYXRoJyxcclxuICAncGF0aCcsICdwYXR0ZXJuJywgJ3BvbHlnb24nLCAncG9seWxpbmUnLCAncmFkaWFsR3JhZGllbnQnLCAncmVjdCcsXHJcbiAgJ3NldCcsICdzdG9wJywgJ3N3aXRjaCcsICdzeW1ib2wnLCAndGV4dCcsICd0ZXh0UGF0aCcsICd0aXRsZScsICd0cmVmJyxcclxuICAndHNwYW4nLCAndXNlJywgJ3ZpZXcnLCAndmtlcm4nXHJcbl1cclxuXHJcbmZ1bmN0aW9uIGJlbENyZWF0ZUVsZW1lbnQgKHRhZywgcHJvcHMsIGNoaWxkcmVuKSB7XHJcbiAgdmFyIGVsXHJcblxyXG4gIC8vIElmIGFuIHN2ZyB0YWcsIGl0IG5lZWRzIGEgbmFtZXNwYWNlXHJcbiAgaWYgKFNWR19UQUdTLmluZGV4T2YodGFnKSAhPT0gLTEpIHtcclxuICAgIHByb3BzLm5hbWVzcGFjZSA9IFNWR05TXHJcbiAgfVxyXG5cclxuICAvLyBJZiB3ZSBhcmUgdXNpbmcgYSBuYW1lc3BhY2VcclxuICB2YXIgbnMgPSBmYWxzZVxyXG4gIGlmIChwcm9wcy5uYW1lc3BhY2UpIHtcclxuICAgIG5zID0gcHJvcHMubmFtZXNwYWNlXHJcbiAgICBkZWxldGUgcHJvcHMubmFtZXNwYWNlXHJcbiAgfVxyXG5cclxuICAvLyBDcmVhdGUgdGhlIGVsZW1lbnRcclxuICBpZiAobnMpIHtcclxuICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKG5zLCB0YWcpXHJcbiAgfSBlbHNlIHtcclxuICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpXHJcbiAgfVxyXG5cclxuICAvLyBJZiBhZGRpbmcgb25sb2FkIGV2ZW50c1xyXG4gIGlmIChwcm9wcy5vbmxvYWQgfHwgcHJvcHMub251bmxvYWQpIHtcclxuICAgIHZhciBsb2FkID0gcHJvcHMub25sb2FkIHx8IGZ1bmN0aW9uICgpIHt9XHJcbiAgICB2YXIgdW5sb2FkID0gcHJvcHMub251bmxvYWQgfHwgZnVuY3Rpb24gKCkge31cclxuICAgIG9ubG9hZChlbCwgZnVuY3Rpb24gYmVsT25sb2FkICgpIHtcclxuICAgICAgbG9hZChlbClcclxuICAgIH0sIGZ1bmN0aW9uIGJlbE9udW5sb2FkICgpIHtcclxuICAgICAgdW5sb2FkKGVsKVxyXG4gICAgfSxcclxuICAgIC8vIFdlIGhhdmUgdG8gdXNlIG5vbi1zdGFuZGFyZCBgY2FsbGVyYCB0byBmaW5kIHdobyBpbnZva2VzIGBiZWxDcmVhdGVFbGVtZW50YFxyXG4gICAgYmVsQ3JlYXRlRWxlbWVudC5jYWxsZXIuY2FsbGVyLmNhbGxlcilcclxuICAgIGRlbGV0ZSBwcm9wcy5vbmxvYWRcclxuICAgIGRlbGV0ZSBwcm9wcy5vbnVubG9hZFxyXG4gIH1cclxuXHJcbiAgLy8gQ3JlYXRlIHRoZSBwcm9wZXJ0aWVzXHJcbiAgZm9yICh2YXIgcCBpbiBwcm9wcykge1xyXG4gICAgaWYgKHByb3BzLmhhc093blByb3BlcnR5KHApKSB7XHJcbiAgICAgIHZhciBrZXkgPSBwLnRvTG93ZXJDYXNlKClcclxuICAgICAgdmFyIHZhbCA9IHByb3BzW3BdXHJcbiAgICAgIC8vIE5vcm1hbGl6ZSBjbGFzc05hbWVcclxuICAgICAgaWYgKGtleSA9PT0gJ2NsYXNzbmFtZScpIHtcclxuICAgICAgICBrZXkgPSAnY2xhc3MnXHJcbiAgICAgICAgcCA9ICdjbGFzcydcclxuICAgICAgfVxyXG4gICAgICAvLyBUaGUgZm9yIGF0dHJpYnV0ZSBnZXRzIHRyYW5zZm9ybWVkIHRvIGh0bWxGb3IsIGJ1dCB3ZSBqdXN0IHNldCBhcyBmb3JcclxuICAgICAgaWYgKHAgPT09ICdodG1sRm9yJykge1xyXG4gICAgICAgIHAgPSAnZm9yJ1xyXG4gICAgICB9XHJcbiAgICAgIC8vIElmIGEgcHJvcGVydHkgaXMgYm9vbGVhbiwgc2V0IGl0c2VsZiB0byB0aGUga2V5XHJcbiAgICAgIGlmIChCT09MX1BST1BTW2tleV0pIHtcclxuICAgICAgICBpZiAodmFsID09PSAndHJ1ZScpIHZhbCA9IGtleVxyXG4gICAgICAgIGVsc2UgaWYgKHZhbCA9PT0gJ2ZhbHNlJykgY29udGludWVcclxuICAgICAgfVxyXG4gICAgICAvLyBJZiBhIHByb3BlcnR5IHByZWZlcnMgYmVpbmcgc2V0IGRpcmVjdGx5IHZzIHNldEF0dHJpYnV0ZVxyXG4gICAgICBpZiAoa2V5LnNsaWNlKDAsIDIpID09PSAnb24nKSB7XHJcbiAgICAgICAgZWxbcF0gPSB2YWxcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAobnMpIHtcclxuICAgICAgICAgIGlmIChwID09PSAneGxpbms6aHJlZicpIHtcclxuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlTlMoWExJTktOUywgcCwgdmFsKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlTlMobnVsbCwgcCwgdmFsKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUocCwgdmFsKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYXBwZW5kQ2hpbGQgKGNoaWxkcykge1xyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNoaWxkcykpIHJldHVyblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIG5vZGUgPSBjaGlsZHNbaV1cclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHtcclxuICAgICAgICBhcHBlbmRDaGlsZChub2RlKVxyXG4gICAgICAgIGNvbnRpbnVlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ251bWJlcicgfHxcclxuICAgICAgICB0eXBlb2Ygbm9kZSA9PT0gJ2Jvb2xlYW4nIHx8XHJcbiAgICAgICAgbm9kZSBpbnN0YW5jZW9mIERhdGUgfHxcclxuICAgICAgICBub2RlIGluc3RhbmNlb2YgUmVnRXhwKSB7XHJcbiAgICAgICAgbm9kZSA9IG5vZGUudG9TdHJpbmcoKVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodHlwZW9mIG5vZGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgaWYgKGVsLmxhc3RDaGlsZCAmJiBlbC5sYXN0Q2hpbGQubm9kZU5hbWUgPT09ICcjdGV4dCcpIHtcclxuICAgICAgICAgIGVsLmxhc3RDaGlsZC5ub2RlVmFsdWUgKz0gbm9kZVxyXG4gICAgICAgICAgY29udGludWVcclxuICAgICAgICB9XHJcbiAgICAgICAgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5vZGUpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChub2RlICYmIG5vZGUubm9kZVR5cGUpIHtcclxuICAgICAgICBlbC5hcHBlbmRDaGlsZChub2RlKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGFwcGVuZENoaWxkKGNoaWxkcmVuKVxyXG5cclxuICByZXR1cm4gZWxcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBoeXBlcngoYmVsQ3JlYXRlRWxlbWVudClcclxubW9kdWxlLmV4cG9ydHMuY3JlYXRlRWxlbWVudCA9IGJlbENyZWF0ZUVsZW1lbnRcclxuIiwiXG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbVZ0Y0hSNUxtcHpJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSWlMQ0ptYVd4bElqb2liM1YwTG1wekxtMWhjQ0o5IiwiY29uc3QgZGVlcERpZmYgPSByZXF1aXJlKCdkZWVwLWRpZmYnKVxuY29uc3QgcGFkUmlnaHQgPSByZXF1aXJlKCdwYWQtcmlnaHQnKVxuY29uc3QgcGFkTGVmdCA9IHJlcXVpcmUoJ3BhZC1sZWZ0JylcbmNvbnN0IGJyb3dzZXIgPSByZXF1aXJlKCdkZXRlY3QtYnJvd3NlcicpXG5cbm1vZHVsZS5leHBvcnRzID0gY2hvb0xvZ1xuXG4vLyBjb2xvcnMgZnJvbSBodHRwOi8vY2xycy5jYy9cbmNvbnN0IGNvbG9ycyA9IHtcbiAgZ3JlZW46ICcjMkVDQzQwJyxcbiAgcmVkOiAnI0ZGNDEzNicsXG4gIGJsdWU6ICcjN0ZEQkZGJyxcbiAgbGlnaHRHcmF5OiAnI0RERERERCcsXG4gIGdyYXk6ICcjQUFBQUFBJyxcbiAgeWVsbG93OiAnI0ZGREMwMCcsXG4gIGRlZmF1bHQ6ICcjMjkzMDM3J1xufVxuXG5jb25zdCBwYWRkaW5ncyA9IHtcbiAgdHlwZTogNyxcbiAgYWN0aW9uVHlwZTogN1xufVxuXG4vLyBEZXZlbG9wbWVudCBsb2dnZXIgZm9yIGNob29cbi8vIG51bGwgLT4gb2JqXG5mdW5jdGlvbiBjaG9vTG9nICgpIHtcbiAgY29uc3Qgc3RhcnRUaW1lID0gRGF0ZS5ub3coKVxuXG4gIHJldHVybiB7XG4gICAgb25BY3Rpb246IG9uQWN0aW9uLFxuICAgIG9uRXJyb3I6IG9uRXJyb3IsXG4gICAgb25TdGF0ZUNoYW5nZTogb25TdGF0ZUNoYW5nZVxuICB9XG5cbiAgLy8gaGFuZGxlIG9uQWN0aW9uKCkgY2FsbHNcbiAgLy8gKG9iaiwgb2JqLCBzdHIsIHN0ciwgZm4pIC0+IG51bGxcbiAgZnVuY3Rpb24gb25BY3Rpb24gKGRhdGEsIHN0YXRlLCBuYW1lLCB0cmFjZSwgY3JlYXRlU2VuZCkge1xuICAgIGNvbnN0IHNwbGl0ID0gdHJhY2Uuc3BsaXQoJzonKVxuICAgIGNvbnN0IGFjdGlvblR5cGUgPSBzcGxpdFswXS50cmltKClcbiAgICBjb25zdCBjYWxsZXIgPSBzcGxpdFsxXS50cmltKClcblxuICAgIGNvbnN0IGxpbmUgPSBbXVxuICAgIGNvbG9yaWZ5KCdsaWdodEdyYXknLCByZW5kZXJUaW1lKHN0YXJ0VGltZSkgKyAnICcsIGxpbmUpXG4gICAgY29sb3JpZnkoJ2dyYXknLCByZW5kZXJUeXBlKCdhY3Rpb24nKSArICcgJywgbGluZSlcbiAgICBjb2xvcmlmeSgnZ3JheScsIHJlbmRlckFjdGlvblR5cGUoYWN0aW9uVHlwZSkgKyAnICcsIGxpbmUpXG5cbiAgICBjb2xvcmlmeSgnZGVmYXVsdCcsIFwiJ1wiICsgY2FsbGVyICsgXCInXCIsIGxpbmUpXG4gICAgY29sb3JpZnkoJ2RlZmF1bHQnLCAnLT4nLCBsaW5lKVxuICAgIGNvbG9yaWZ5KCdkZWZhdWx0JywgXCInXCIgKyBuYW1lICsgXCInXCIsIGxpbmUpXG5cbiAgICBpZiAoZ3JvdXBDb2xsYXBzZVN1cHBvcnRlZCgpKSB7XG4gICAgICBsb2dHcm91cChsaW5lKVxuICAgICAgbG9nSW5uZXIobmFtZSwgZGF0YSlcbiAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2cobGluZSlcbiAgICAgIGxvZ0lubmVyKG5hbWUsIGRhdGEpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9nSW5uZXIgKG5hbWUsIGFjdGlvbikge1xuICAgICAgY29uc29sZS5sb2coJ2FjdGlvbiBuYW1lOicsIG5hbWUpXG4gICAgICBjb25zb2xlLmxvZygnZGF0YTonLCBkYXRhKVxuICAgIH1cbiAgfVxuXG4gIC8vIGhhbmRsZSBvbkVycm9yKCkgY2FsbHNcbiAgLy8gKHN0ciwgb2JqLCBmbikgLT4gbnVsbFxuICBmdW5jdGlvbiBvbkVycm9yIChlcnIsIHN0YXRlLCBjcmVhdGVTZW5kKSB7XG4gICAgY29uc3QgbGluZSA9IFtdXG4gICAgY29sb3JpZnkoJ2xpZ2h0R3JheScsIHJlbmRlclRpbWUoc3RhcnRUaW1lKSArICcgJywgbGluZSlcbiAgICBjb2xvcmlmeSgncmVkJywgcmVuZGVyVHlwZSgnZXJyb3InKSArICcgJywgbGluZSlcbiAgICBjb2xvcmlmeSgnZGVmYXVsdCcsIGVyci5tZXNzYWdlICsgJyAnLCBsaW5lKVxuXG4gICAgaWYgKGdyb3VwQ29sbGFwc2VTdXBwb3J0ZWQoKSkge1xuICAgICAgbG9nR3JvdXAobGluZSlcbiAgICAgIGxvZ0lubmVyKGVycilcbiAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2cobGluZSlcbiAgICAgIGxvZ0lubmVyKGVycilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2dJbm5lciAoZXJyKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGVycilcbiAgICB9XG4gIH1cblxuICAvLyBoYW5kbGUgb25TdGF0ZUNoYW5nZSgpIGNhbGxzXG4gIC8vIChvYmosIG9iaiwgb2JqLCBmbikgLT4gbnVsbFxuICBmdW5jdGlvbiBvblN0YXRlQ2hhbmdlIChkYXRhLCBzdGF0ZSwgcHJldiwgY3JlYXRlU2VuZCkge1xuICAgIGNvbnN0IGRpZmYgPSBkZWVwRGlmZihwcmV2LCBzdGF0ZSkgfHwgW11cbiAgICAvLyB3YXJuIGlmIHRoZXJlIGlzIG5vIGRpZmZcbiAgICBjb25zdCBoYXNXYXJuID0gZGlmZi5sZW5ndGggPT09IDBcbiAgICBjb25zdCBpbmxpbmVUZXh0ID0gKGZ1bmN0aW9uIChkaWZmKSB7XG4gICAgICBpZiAoaGFzV2Fybikge1xuICAgICAgICByZXR1cm4gJ25vIGRpZmYnXG4gICAgICB9IGVsc2UgaWYgKGRpZmYubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiAnZGlmZidcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAnZGlmZnMnXG4gICAgICB9XG4gICAgfSkoZGlmZilcblxuICAgIGNvbnN0IGxpbmUgPSBbXVxuICAgIGNvbG9yaWZ5KCdsaWdodEdyYXknLCByZW5kZXJUaW1lKHN0YXJ0VGltZSkgKyAnICcsIGxpbmUpXG4gICAgY29sb3JpZnkoaGFzV2FybiA/ICd5ZWxsb3cnIDogJ2dyYXknLCByZW5kZXJUeXBlKCdzdGF0ZScpICsgJyAnLCBsaW5lKVxuICAgIGNvbG9yaWZ5KCdkZWZhdWx0JywgKGhhc1dhcm4gPyAnJyA6IGRpZmYubGVuZ3RoICsgJyAnKSArIGlubGluZVRleHQsIGxpbmUpXG5cbiAgICBpZiAoZ3JvdXBDb2xsYXBzZVN1cHBvcnRlZCgpKSB7XG4gICAgICBsb2dHcm91cChsaW5lKVxuICAgICAgbG9nSW5uZXIocHJldiwgc3RhdGUpXG4gICAgICBjb25zb2xlLmdyb3VwRW5kKClcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nKGxpbmUpXG4gICAgICBsb2dJbm5lcihwcmV2LCBzdGF0ZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2dJbm5lciAocHJldiwgc3RhdGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdwcmV2ICcsIHByZXYpXG4gICAgICBjb25zb2xlLmxvZygnc3RhdGUnLCBzdGF0ZSlcbiAgICAgIGlmIChoYXNXYXJuKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignZGlmZiAnLCAnVGhlcmUgaXMgbm8gZGlmZmVyZW5jZSBiZXR3ZWVuIHN0YXRlcycpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZygnZGlmZiAnLCBkaWZmKVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBjcmVhdGUgYSBjb2xsYXBzZWRHcm91cCBsb2cgZnJvbSBhbiBhcnJheVxuLy8gc3RyIC0+IFtzdHIsIHN0cl1cbmZ1bmN0aW9uIGxvZ0dyb3VwIChsaW5lKSB7XG4gIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQuYXBwbHkoY29uc29sZSwgbGluZSlcbn1cblxuLy8gY3JlYXRlIGEgY29uc29sZSBsb2cgZnJvbSBhbiBhcnJheVxuLy8gc3RyIC0+IFtzdHIsIHN0cl1cbmZ1bmN0aW9uIGxvZyAobGluZSkge1xuICBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBsaW5lKVxufVxuXG4vLyBpbmRlbnQgbWVzc2FnZSB0eXBlc1xuLy8gc3RyIC0+IHN0clxuZnVuY3Rpb24gcmVuZGVyVHlwZSAobXNnKSB7XG4gIGNvbnN0IGxlZnRQYWQgPSBwYWRkaW5ncy50eXBlXG4gIGNvbnN0IHJpZ2h0UGFkID0gcGFkZGluZ3MuYWN0aW9uVHlwZSArIGxlZnRQYWQgKyAyXG4gIHJldHVybiAobXNnID09PSAnc3RhdGUnIHx8IG1zZyA9PT0gJ2Vycm9yJylcbiAgICA/IHBhZFJpZ2h0KHBhZExlZnQobXNnLCBsZWZ0UGFkLCAnICcpLCByaWdodFBhZCwgJyAnKVxuICAgIDogcGFkTGVmdChtc2csIGxlZnRQYWQsICcgJylcbn1cblxuLy8gaW5kZW50IGFjdGlvbiB0eXBlc1xuLy8gc3RyIC0+IHN0clxuZnVuY3Rpb24gcmVuZGVyQWN0aW9uVHlwZSAobXNnKSB7XG4gIGNvbnN0IHBhZGRpbmcgPSBwYWRkaW5ncy5hY3Rpb25UeXBlXG4gIGlmIChtc2cgPT09ICdzdWJzY3JpcHRpb24nKSBtc2cgPSAnc3VicydcbiAgcmV0dXJuIHBhZFJpZ2h0KG1zZywgcGFkZGluZywgJyAnKVxufVxuXG4vLyB0b0h0bWwgKyBjaGFsa1xuLy8gKHN0ciwgc3RyLCBbc3RyLCAuLi5zdHJdKSAtPiBbc3RyLCBzdHJdXG5mdW5jdGlvbiBjb2xvcmlmeSAoY29sb3IsIGxpbmUsIHByZXYpIHtcbiAgdmFyIG5ld0xpbmUgPSAnJWMnICsgbGluZVxuICB2YXIgbmV3U3R5bGUgPSAnY29sb3I6ICcgKyBjb2xvcnNbY29sb3JdICsgJzsnXG5cbiAgaWYgKCFwcmV2KSB7XG4gICAgcHJldiA9IFsgbmV3TGluZSwgbmV3U3R5bGUgXVxuICAgIHJldHVybiBwcmV2XG4gIH1cblxuICBpZiAoIXByZXZbMF0pIHByZXZbMF0gPSAnJ1xuICBwcmV2WzBdICs9ICcgJyArIG5ld0xpbmVcblxuICBpZiAoIXByZXZbMV0pIHByZXZbMV0gPSAnJ1xuICBpZiAoYnJvd3Nlci5uYW1lID09PSAnZmlyZWZveCcpIHtcbiAgICBwcmV2WzFdICs9ICcgJyArIG5ld1N0eWxlXG4gIH0gZWxzZSB7XG4gICAgcHJldi5wdXNoKG5ld1N0eWxlKVxuICB9XG4gIHJldHVybiBwcmV2XG59XG5cbi8vIHJlbmRlciB0aGUgdGltZVxuLy8gbnVtIC0+IG51bGxcbmZ1bmN0aW9uIHJlbmRlclRpbWUgKHN0YXJ0VGltZSkge1xuICB2YXIgb2Zmc2V0ID0gU3RyaW5nKE1hdGgucm91bmQoKERhdGUubm93KCkgLSBzdGFydFRpbWUpIC8gMTAwMCkgJSAxMDAwMClcbiAgdmFyIG1zZyA9ICdbJyArIHBhZExlZnQob2Zmc2V0LCA0LCAnMCcpICsgJ10nXG4gIHJldHVybiBtc2dcbn1cblxuZnVuY3Rpb24gZ3JvdXBDb2xsYXBzZVN1cHBvcnRlZCAoKSB7XG4gIHJldHVybiBjb25zb2xlLmdyb3VwQ29sbGFwc2VkICYmIGJyb3dzZXIubmFtZSAhPT0gJ2ZpcmVmb3gnXG59XG5cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgneW8teW8nKVxuIiwiY29uc3QgaGlzdG9yeSA9IHJlcXVpcmUoJ3NoZWV0LXJvdXRlci9oaXN0b3J5JylcbmNvbnN0IHNoZWV0Um91dGVyID0gcmVxdWlyZSgnc2hlZXQtcm91dGVyJylcbmNvbnN0IGRvY3VtZW50ID0gcmVxdWlyZSgnZ2xvYmFsL2RvY3VtZW50JylcbmNvbnN0IG9uUmVhZHkgPSByZXF1aXJlKCdkb2N1bWVudC1yZWFkeScpXG5jb25zdCBocmVmID0gcmVxdWlyZSgnc2hlZXQtcm91dGVyL2hyZWYnKVxuY29uc3QgaGFzaCA9IHJlcXVpcmUoJ3NoZWV0LXJvdXRlci9oYXNoJylcbmNvbnN0IGhhc2hNYXRjaCA9IHJlcXVpcmUoJ2hhc2gtbWF0Y2gnKVxuY29uc3QgYmFycmFja3MgPSByZXF1aXJlKCdiYXJyYWNrcycpXG5jb25zdCBuYW5vcmFmID0gcmVxdWlyZSgnbmFub3JhZicpXG5jb25zdCBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKVxuY29uc3QgeHRlbmQgPSByZXF1aXJlKCd4dGVuZCcpXG5jb25zdCB5byA9IHJlcXVpcmUoJ3lvLXlvJylcblxubW9kdWxlLmV4cG9ydHMgPSBjaG9vXG5cbi8vIGZyYW1ld29yayBmb3IgY3JlYXRpbmcgc3R1cmR5IHdlYiBhcHBsaWNhdGlvbnNcbi8vIG51bGwgLT4gZm5cbmZ1bmN0aW9uIGNob28gKG9wdHMpIHtcbiAgb3B0cyA9IG9wdHMgfHwge31cblxuICBjb25zdCBfc3RvcmUgPSBzdGFydC5fc3RvcmUgPSBiYXJyYWNrcygpXG4gIHZhciBfcm91dGVyID0gc3RhcnQuX3JvdXRlciA9IG51bGxcbiAgdmFyIF9kZWZhdWx0Um91dGUgPSBudWxsXG4gIHZhciBfcm9vdE5vZGUgPSBudWxsXG4gIHZhciBfcm91dGVzID0gbnVsbFxuICB2YXIgX2ZyYW1lID0gbnVsbFxuXG4gIF9zdG9yZS51c2UoeyBvblN0YXRlQ2hhbmdlOiByZW5kZXIgfSlcbiAgX3N0b3JlLnVzZShvcHRzKVxuXG4gIHN0YXJ0LnRvU3RyaW5nID0gdG9TdHJpbmdcbiAgc3RhcnQucm91dGVyID0gcm91dGVyXG4gIHN0YXJ0Lm1vZGVsID0gbW9kZWxcbiAgc3RhcnQuc3RhcnQgPSBzdGFydFxuICBzdGFydC51c2UgPSB1c2VcblxuICByZXR1cm4gc3RhcnRcblxuICAvLyByZW5kZXIgdGhlIGFwcGxpY2F0aW9uIHRvIGEgc3RyaW5nXG4gIC8vIChzdHIsIG9iaikgLT4gc3RyXG4gIGZ1bmN0aW9uIHRvU3RyaW5nIChyb3V0ZSwgc2VydmVyU3RhdGUpIHtcbiAgICBzZXJ2ZXJTdGF0ZSA9IHNlcnZlclN0YXRlIHx8IHt9XG4gICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiByb3V0ZSwgJ3N0cmluZycsICdjaG9vLmFwcC50b1N0cmluZzogcm91dGUgbXVzdCBiZSBhIHN0cmluZycpXG4gICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBzZXJ2ZXJTdGF0ZSwgJ29iamVjdCcsICdjaG9vLmFwcC50b1N0cmluZzogc2VydmVyU3RhdGUgbXVzdCBiZSBhbiBvYmplY3QnKVxuICAgIF9zdG9yZS5zdGFydCh7IHN1YnNjcmlwdGlvbnM6IGZhbHNlLCByZWR1Y2VyczogZmFsc2UsIGVmZmVjdHM6IGZhbHNlIH0pXG5cbiAgICBjb25zdCBzdGF0ZSA9IF9zdG9yZS5zdGF0ZSh7IHN0YXRlOiBzZXJ2ZXJTdGF0ZSB9KVxuICAgIGNvbnN0IHJvdXRlciA9IGNyZWF0ZVJvdXRlcihfZGVmYXVsdFJvdXRlLCBfcm91dGVzLCBjcmVhdGVTZW5kKVxuICAgIGNvbnN0IHRyZWUgPSByb3V0ZXIocm91dGUsIHN0YXRlKVxuICAgIHJldHVybiB0cmVlLm91dGVySFRNTCB8fCB0cmVlLnRvU3RyaW5nKClcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVNlbmQgKCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNlbmQgKCkge1xuICAgICAgICBhc3NlcnQub2soZmFsc2UsICdjaG9vOiBzZW5kKCkgY2Fubm90IGJlIGNhbGxlZCBmcm9tIE5vZGUnKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIHN0YXJ0IHRoZSBhcHBsaWNhdGlvblxuICAvLyAoc3RyPywgb2JqPykgLT4gRE9NTm9kZVxuICBmdW5jdGlvbiBzdGFydCAoc2VsZWN0b3IsIHN0YXJ0T3B0cykge1xuICAgIGlmICghc3RhcnRPcHRzICYmIHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHN0YXJ0T3B0cyA9IHNlbGVjdG9yXG4gICAgICBzZWxlY3RvciA9IG51bGxcbiAgICB9XG4gICAgc3RhcnRPcHRzID0gc3RhcnRPcHRzIHx8IHt9XG5cbiAgICBfc3RvcmUubW9kZWwoYXBwSW5pdChzdGFydE9wdHMpKVxuICAgIGNvbnN0IGNyZWF0ZVNlbmQgPSBfc3RvcmUuc3RhcnQoc3RhcnRPcHRzKVxuICAgIF9yb3V0ZXIgPSBzdGFydC5fcm91dGVyID0gY3JlYXRlUm91dGVyKF9kZWZhdWx0Um91dGUsIF9yb3V0ZXMsIGNyZWF0ZVNlbmQpXG4gICAgY29uc3Qgc3RhdGUgPSBfc3RvcmUuc3RhdGUoe3N0YXRlOiB7fX0pXG5cbiAgICBpZiAoIXNlbGVjdG9yKSB7XG4gICAgICBjb25zdCB0cmVlID0gX3JvdXRlcihzdGF0ZS5sb2NhdGlvbi5wYXRobmFtZSwgc3RhdGUpXG4gICAgICBfcm9vdE5vZGUgPSB0cmVlXG4gICAgICByZXR1cm4gdHJlZVxuICAgIH0gZWxzZSB7XG4gICAgICBvblJlYWR5KGZ1bmN0aW9uIG9uUmVhZHkgKCkge1xuICAgICAgICBjb25zdCBvbGRUcmVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcilcbiAgICAgICAgYXNzZXJ0Lm9rKG9sZFRyZWUsICdjb3VsZCBub3QgcXVlcnkgc2VsZWN0b3I6ICcgKyBzZWxlY3RvcilcbiAgICAgICAgY29uc3QgbmV3VHJlZSA9IF9yb3V0ZXIoc3RhdGUubG9jYXRpb24ucGF0aG5hbWUsIHN0YXRlKVxuICAgICAgICBfcm9vdE5vZGUgPSB5by51cGRhdGUob2xkVHJlZSwgbmV3VHJlZSlcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLy8gdXBkYXRlIHRoZSBET00gYWZ0ZXIgZXZlcnkgc3RhdGUgbXV0YXRpb25cbiAgLy8gKG9iaiwgb2JqLCBvYmosIHN0ciwgZm4pIC0+IG51bGxcbiAgZnVuY3Rpb24gcmVuZGVyIChkYXRhLCBzdGF0ZSwgcHJldiwgbmFtZSwgY3JlYXRlU2VuZCkge1xuICAgIGlmICghX2ZyYW1lKSB7XG4gICAgICBfZnJhbWUgPSBuYW5vcmFmKGZ1bmN0aW9uIChzdGF0ZSwgcHJldikge1xuICAgICAgICBjb25zdCBuZXdUcmVlID0gX3JvdXRlcihzdGF0ZS5sb2NhdGlvbi5wYXRobmFtZSwgc3RhdGUsIHByZXYpXG4gICAgICAgIF9yb290Tm9kZSA9IHlvLnVwZGF0ZShfcm9vdE5vZGUsIG5ld1RyZWUpXG4gICAgICB9KVxuICAgIH1cbiAgICBfZnJhbWUoc3RhdGUsIHByZXYpXG4gIH1cblxuICAvLyByZWdpc3RlciBhbGwgcm91dGVzIG9uIHRoZSByb3V0ZXJcbiAgLy8gKHN0cj8sIFtmbnxbZm5dXSkgLT4gb2JqXG4gIGZ1bmN0aW9uIHJvdXRlciAoZGVmYXVsdFJvdXRlLCByb3V0ZXMpIHtcbiAgICBfZGVmYXVsdFJvdXRlID0gZGVmYXVsdFJvdXRlXG4gICAgX3JvdXRlcyA9IHJvdXRlc1xuICB9XG5cbiAgLy8gY3JlYXRlIGEgbmV3IG1vZGVsXG4gIC8vIChzdHI/LCBvYmopIC0+IG51bGxcbiAgZnVuY3Rpb24gbW9kZWwgKG1vZGVsKSB7XG4gICAgX3N0b3JlLm1vZGVsKG1vZGVsKVxuICB9XG5cbiAgLy8gcmVnaXN0ZXIgYSBwbHVnaW5cbiAgLy8gKG9iaikgLT4gbnVsbFxuICBmdW5jdGlvbiB1c2UgKGhvb2tzKSB7XG4gICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBob29rcywgJ29iamVjdCcsICdjaG9vLnVzZTogaG9va3Mgc2hvdWxkIGJlIGFuIG9iamVjdCcpXG4gICAgX3N0b3JlLnVzZShob29rcylcbiAgfVxuXG4gIC8vIGNyZWF0ZSBhIG5ldyByb3V0ZXIgd2l0aCBhIGN1c3RvbSBgY3JlYXRlUm91dGUoKWAgZnVuY3Rpb25cbiAgLy8gKHN0cj8sIG9iaiwgZm4/KSAtPiBudWxsXG4gIGZ1bmN0aW9uIGNyZWF0ZVJvdXRlciAoZGVmYXVsdFJvdXRlLCByb3V0ZXMsIGNyZWF0ZVNlbmQpIHtcbiAgICB2YXIgcHJldiA9IHsgcGFyYW1zOiB7fSB9XG4gICAgcmV0dXJuIHNoZWV0Um91dGVyKGRlZmF1bHRSb3V0ZSwgcm91dGVzLCBjcmVhdGVSb3V0ZSlcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVJvdXRlIChyb3V0ZUZuKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHJvdXRlLCBpbmxpbmUsIGNoaWxkKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaW5saW5lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgaW5saW5lID0gd3JhcChpbmxpbmUsIHJvdXRlKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByb3V0ZUZuKHJvdXRlLCBpbmxpbmUsIGNoaWxkKVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB3cmFwIChjaGlsZCwgcm91dGUpIHtcbiAgICAgICAgY29uc3Qgc2VuZCA9IGNyZWF0ZVNlbmQoJ3ZpZXc6ICcgKyByb3V0ZSwgdHJ1ZSlcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGNob29XcmFwIChwYXJhbXMsIHN0YXRlKSB7XG4gICAgICAgICAgY29uc3QgbndQcmV2ID0gcHJldlxuICAgICAgICAgIGNvbnN0IG53U3RhdGUgPSBwcmV2ID0geHRlbmQoc3RhdGUsIHsgcGFyYW1zOiBwYXJhbXMgfSlcbiAgICAgICAgICBpZiAob3B0cy5mcmVlemUgIT09IGZhbHNlKSBPYmplY3QuZnJlZXplKG53U3RhdGUpXG4gICAgICAgICAgcmV0dXJuIGNoaWxkKG53U3RhdGUsIG53UHJldiwgc2VuZClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBpbml0aWFsIGFwcGxpY2F0aW9uIHN0YXRlIG1vZGVsXG4vLyBvYmogLT4gb2JqXG5mdW5jdGlvbiBhcHBJbml0IChvcHRzKSB7XG4gIGNvbnN0IGxvYyA9IGRvY3VtZW50LmxvY2F0aW9uXG4gIGNvbnN0IHN0YXRlID0geyBwYXRobmFtZTogKG9wdHMuaGFzaCkgPyBoYXNoTWF0Y2gobG9jLmhhc2gpIDogbG9jLmhyZWYgfVxuICBjb25zdCByZWR1Y2VycyA9IHtcbiAgICBzZXRMb2NhdGlvbjogZnVuY3Rpb24gc2V0TG9jYXRpb24gKGRhdGEsIHN0YXRlKSB7XG4gICAgICByZXR1cm4geyBwYXRobmFtZTogZGF0YS5sb2NhdGlvbi5yZXBsYWNlKC8jLiovLCAnJykgfVxuICAgIH1cbiAgfVxuICAvLyBpZiBoYXNoIHJvdXRpbmcgZXhwbGljaXRseSBlbmFibGVkLCBzdWJzY3JpYmUgdG8gaXRcbiAgY29uc3Qgc3VicyA9IHt9XG4gIGlmIChvcHRzLmhhc2ggPT09IHRydWUpIHtcbiAgICBwdXNoTG9jYXRpb25TdWIoZnVuY3Rpb24gKG5hdmlnYXRlKSB7XG4gICAgICBoYXNoKGZ1bmN0aW9uIChmcmFnbWVudCkge1xuICAgICAgICBuYXZpZ2F0ZShoYXNoTWF0Y2goZnJhZ21lbnQpKVxuICAgICAgfSlcbiAgICB9LCAnaGFuZGxlSGFzaCcsIHN1YnMpXG4gIH0gZWxzZSB7XG4gICAgaWYgKG9wdHMuaGlzdG9yeSAhPT0gZmFsc2UpIHB1c2hMb2NhdGlvblN1YihoaXN0b3J5LCAnaGFuZGxlSGlzdG9yeScsIHN1YnMpXG4gICAgaWYgKG9wdHMuaHJlZiAhPT0gZmFsc2UpIHB1c2hMb2NhdGlvblN1YihocmVmLCAnaGFuZGxlSHJlZicsIHN1YnMpXG4gIH1cblxuICByZXR1cm4ge1xuICAgIG5hbWVzcGFjZTogJ2xvY2F0aW9uJyxcbiAgICBzdWJzY3JpcHRpb25zOiBzdWJzLFxuICAgIHJlZHVjZXJzOiByZWR1Y2VycyxcbiAgICBzdGF0ZTogc3RhdGVcbiAgfVxuXG4gIC8vIGNyZWF0ZSBhIG5ldyBzdWJzY3JpcHRpb24gdGhhdCBtb2RpZmllc1xuICAvLyAnYXBwOmxvY2F0aW9uJyBhbmQgcHVzaCBpdCB0byBiZSBsb2FkZWRcbiAgLy8gKGZuLCBvYmopIC0+IG51bGxcbiAgZnVuY3Rpb24gcHVzaExvY2F0aW9uU3ViIChjYiwga2V5LCBtb2RlbCkge1xuICAgIG1vZGVsW2tleV0gPSBmdW5jdGlvbiAoc2VuZCwgZG9uZSkge1xuICAgICAgY2IoZnVuY3Rpb24gbmF2aWdhdGUgKHBhdGhuYW1lKSB7XG4gICAgICAgIHNlbmQoJ2xvY2F0aW9uOnNldExvY2F0aW9uJywgeyBsb2NhdGlvbjogcGF0aG5hbWUgfSwgZG9uZSlcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG4iLCIvKiFcbiAgQ29weXJpZ2h0IChjKSAyMDE2IEplZCBXYXRzb24uXG4gIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZSAoTUlUKSwgc2VlXG4gIGh0dHA6Ly9qZWR3YXRzb24uZ2l0aHViLmlvL2NsYXNzbmFtZXNcbiovXG4vKiBnbG9iYWwgZGVmaW5lICovXG5cbihmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgaGFzT3duID0ge30uaGFzT3duUHJvcGVydHk7XG5cblx0ZnVuY3Rpb24gY2xhc3NOYW1lcyAoKSB7XG5cdFx0dmFyIGNsYXNzZXMgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgYXJnID0gYXJndW1lbnRzW2ldO1xuXHRcdFx0aWYgKCFhcmcpIGNvbnRpbnVlO1xuXG5cdFx0XHR2YXIgYXJnVHlwZSA9IHR5cGVvZiBhcmc7XG5cblx0XHRcdGlmIChhcmdUeXBlID09PSAnc3RyaW5nJyB8fCBhcmdUeXBlID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goYXJnKTtcblx0XHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhcmcpKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChjbGFzc05hbWVzLmFwcGx5KG51bGwsIGFyZykpO1xuXHRcdFx0fSBlbHNlIGlmIChhcmdUeXBlID09PSAnb2JqZWN0Jykge1xuXHRcdFx0XHRmb3IgKHZhciBrZXkgaW4gYXJnKSB7XG5cdFx0XHRcdFx0aWYgKGhhc093bi5jYWxsKGFyZywga2V5KSAmJiBhcmdba2V5XSkge1xuXHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGtleSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGNsYXNzZXMuam9pbignICcpO1xuXHR9XG5cblx0aWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBjbGFzc05hbWVzO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblx0XHQvLyByZWdpc3RlciBhcyAnY2xhc3NuYW1lcycsIGNvbnNpc3RlbnQgd2l0aCBucG0gcGFja2FnZSBuYW1lXG5cdFx0ZGVmaW5lKCdjbGFzc25hbWVzJywgW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBjbGFzc05hbWVzO1xuXHRcdH0pO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5jbGFzc05hbWVzID0gY2xhc3NOYW1lcztcblx0fVxufSgpKTtcbiIsInZhciBtYXRjaGVzID0gcmVxdWlyZSgnbWF0Y2hlcy1zZWxlY3RvcicpXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlbGVtZW50LCBzZWxlY3RvciwgY2hlY2tZb1NlbGYpIHtcclxuICB2YXIgcGFyZW50ID0gY2hlY2tZb1NlbGYgPyBlbGVtZW50IDogZWxlbWVudC5wYXJlbnROb2RlXHJcblxyXG4gIHdoaWxlIChwYXJlbnQgJiYgcGFyZW50ICE9PSBkb2N1bWVudCkge1xyXG4gICAgaWYgKG1hdGNoZXMocGFyZW50LCBzZWxlY3RvcikpIHJldHVybiBwYXJlbnQ7XHJcbiAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZVxyXG4gIH1cclxufVxyXG4iLCIvKiFcbiAqIGRlZXAtZGlmZi5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuOyhmdW5jdGlvbihyb290LCBmYWN0b3J5KSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICBkZWZpbmUoW10sIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyBOb2RlLiBEb2VzIG5vdCB3b3JrIHdpdGggc3RyaWN0IENvbW1vbkpTLCBidXRcbiAgICAvLyBvbmx5IENvbW1vbkpTLWxpa2UgZW52aXJvbm1lbnRzIHRoYXQgc3VwcG9ydCBtb2R1bGUuZXhwb3J0cyxcbiAgICAvLyBsaWtlIE5vZGUuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gQnJvd3NlciBnbG9iYWxzIChyb290IGlzIHdpbmRvdylcbiAgICByb290LkRlZXBEaWZmID0gZmFjdG9yeSgpO1xuICB9XG59KHRoaXMsIGZ1bmN0aW9uKHVuZGVmaW5lZCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyICRzY29wZSwgY29uZmxpY3QsIGNvbmZsaWN0UmVzb2x1dGlvbiA9IFtdO1xuICBpZiAodHlwZW9mIGdsb2JhbCA9PT0gJ29iamVjdCcgJiYgZ2xvYmFsKSB7XG4gICAgJHNjb3BlID0gZ2xvYmFsO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgJHNjb3BlID0gd2luZG93O1xuICB9IGVsc2Uge1xuICAgICRzY29wZSA9IHt9O1xuICB9XG4gIGNvbmZsaWN0ID0gJHNjb3BlLkRlZXBEaWZmO1xuICBpZiAoY29uZmxpY3QpIHtcbiAgICBjb25mbGljdFJlc29sdXRpb24ucHVzaChcbiAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBjb25mbGljdCAmJiAkc2NvcGUuRGVlcERpZmYgPT09IGFjY3VtdWxhdGVEaWZmKSB7XG4gICAgICAgICAgJHNjb3BlLkRlZXBEaWZmID0gY29uZmxpY3Q7XG4gICAgICAgICAgY29uZmxpY3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgLy8gbm9kZWpzIGNvbXBhdGlibGUgb24gc2VydmVyIHNpZGUgYW5kIGluIHRoZSBicm93c2VyLlxuICBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvcjtcbiAgICBjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDdG9yLnByb3RvdHlwZSwge1xuICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgdmFsdWU6IGN0b3IsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBEaWZmKGtpbmQsIHBhdGgpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2tpbmQnLCB7XG4gICAgICB2YWx1ZToga2luZCxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBpZiAocGF0aCAmJiBwYXRoLmxlbmd0aCkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdwYXRoJywge1xuICAgICAgICB2YWx1ZTogcGF0aCxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gRGlmZkVkaXQocGF0aCwgb3JpZ2luLCB2YWx1ZSkge1xuICAgIERpZmZFZGl0LnN1cGVyXy5jYWxsKHRoaXMsICdFJywgcGF0aCk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdsaHMnLCB7XG4gICAgICB2YWx1ZTogb3JpZ2luLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAncmhzJywge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9XG4gIGluaGVyaXRzKERpZmZFZGl0LCBEaWZmKTtcblxuICBmdW5jdGlvbiBEaWZmTmV3KHBhdGgsIHZhbHVlKSB7XG4gICAgRGlmZk5ldy5zdXBlcl8uY2FsbCh0aGlzLCAnTicsIHBhdGgpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAncmhzJywge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9XG4gIGluaGVyaXRzKERpZmZOZXcsIERpZmYpO1xuXG4gIGZ1bmN0aW9uIERpZmZEZWxldGVkKHBhdGgsIHZhbHVlKSB7XG4gICAgRGlmZkRlbGV0ZWQuc3VwZXJfLmNhbGwodGhpcywgJ0QnLCBwYXRoKTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2xocycsIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KTtcbiAgfVxuICBpbmhlcml0cyhEaWZmRGVsZXRlZCwgRGlmZik7XG5cbiAgZnVuY3Rpb24gRGlmZkFycmF5KHBhdGgsIGluZGV4LCBpdGVtKSB7XG4gICAgRGlmZkFycmF5LnN1cGVyXy5jYWxsKHRoaXMsICdBJywgcGF0aCk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdpbmRleCcsIHtcbiAgICAgIHZhbHVlOiBpbmRleCxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2l0ZW0nLCB7XG4gICAgICB2YWx1ZTogaXRlbSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KTtcbiAgfVxuICBpbmhlcml0cyhEaWZmQXJyYXksIERpZmYpO1xuXG4gIGZ1bmN0aW9uIGFycmF5UmVtb3ZlKGFyciwgZnJvbSwgdG8pIHtcbiAgICB2YXIgcmVzdCA9IGFyci5zbGljZSgodG8gfHwgZnJvbSkgKyAxIHx8IGFyci5sZW5ndGgpO1xuICAgIGFyci5sZW5ndGggPSBmcm9tIDwgMCA/IGFyci5sZW5ndGggKyBmcm9tIDogZnJvbTtcbiAgICBhcnIucHVzaC5hcHBseShhcnIsIHJlc3QpO1xuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBmdW5jdGlvbiByZWFsVHlwZU9mKHN1YmplY3QpIHtcbiAgICB2YXIgdHlwZSA9IHR5cGVvZiBzdWJqZWN0O1xuICAgIGlmICh0eXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuXG4gICAgaWYgKHN1YmplY3QgPT09IE1hdGgpIHtcbiAgICAgIHJldHVybiAnbWF0aCc7XG4gICAgfSBlbHNlIGlmIChzdWJqZWN0ID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJ251bGwnO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShzdWJqZWN0KSkge1xuICAgICAgcmV0dXJuICdhcnJheSc7XG4gICAgfSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ViamVjdCkgPT09ICdbb2JqZWN0IERhdGVdJykge1xuICAgICAgcmV0dXJuICdkYXRlJztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzdWJqZWN0LnRvU3RyaW5nICE9PSAndW5kZWZpbmVkJyAmJiAvXlxcLy4qXFwvLy50ZXN0KHN1YmplY3QudG9TdHJpbmcoKSkpIHtcbiAgICAgIHJldHVybiAncmVnZXhwJztcbiAgICB9XG4gICAgcmV0dXJuICdvYmplY3QnO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVlcERpZmYobGhzLCByaHMsIGNoYW5nZXMsIHByZWZpbHRlciwgcGF0aCwga2V5LCBzdGFjaykge1xuICAgIHBhdGggPSBwYXRoIHx8IFtdO1xuICAgIHZhciBjdXJyZW50UGF0aCA9IHBhdGguc2xpY2UoMCk7XG4gICAgaWYgKHR5cGVvZiBrZXkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBpZiAocHJlZmlsdGVyKSB7XG4gICAgICAgIGlmICh0eXBlb2YocHJlZmlsdGVyKSA9PT0gJ2Z1bmN0aW9uJyAmJiBwcmVmaWx0ZXIoY3VycmVudFBhdGgsIGtleSkpIHsgcmV0dXJuOyB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZihwcmVmaWx0ZXIpID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGlmIChwcmVmaWx0ZXIucHJlZmlsdGVyICYmIHByZWZpbHRlci5wcmVmaWx0ZXIoY3VycmVudFBhdGgsIGtleSkpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgaWYgKHByZWZpbHRlci5ub3JtYWxpemUpIHtcbiAgICAgICAgICAgIHZhciBhbHQgPSBwcmVmaWx0ZXIubm9ybWFsaXplKGN1cnJlbnRQYXRoLCBrZXksIGxocywgcmhzKTtcbiAgICAgICAgICAgIGlmIChhbHQpIHtcbiAgICAgICAgICAgICAgbGhzID0gYWx0WzBdO1xuICAgICAgICAgICAgICByaHMgPSBhbHRbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjdXJyZW50UGF0aC5wdXNoKGtleSk7XG4gICAgfVxuXG4gICAgLy8gVXNlIHN0cmluZyBjb21wYXJpc29uIGZvciByZWdleGVzXG4gICAgaWYgKHJlYWxUeXBlT2YobGhzKSA9PT0gJ3JlZ2V4cCcgJiYgcmVhbFR5cGVPZihyaHMpID09PSAncmVnZXhwJykge1xuICAgICAgbGhzID0gbGhzLnRvU3RyaW5nKCk7XG4gICAgICByaHMgPSByaHMudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICB2YXIgbHR5cGUgPSB0eXBlb2YgbGhzO1xuICAgIHZhciBydHlwZSA9IHR5cGVvZiByaHM7XG4gICAgaWYgKGx0eXBlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgaWYgKHJ0eXBlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjaGFuZ2VzKG5ldyBEaWZmTmV3KGN1cnJlbnRQYXRoLCByaHMpKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJ0eXBlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgY2hhbmdlcyhuZXcgRGlmZkRlbGV0ZWQoY3VycmVudFBhdGgsIGxocykpO1xuICAgIH0gZWxzZSBpZiAocmVhbFR5cGVPZihsaHMpICE9PSByZWFsVHlwZU9mKHJocykpIHtcbiAgICAgIGNoYW5nZXMobmV3IERpZmZFZGl0KGN1cnJlbnRQYXRoLCBsaHMsIHJocykpO1xuICAgIH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGxocykgPT09ICdbb2JqZWN0IERhdGVdJyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocmhzKSA9PT0gJ1tvYmplY3QgRGF0ZV0nICYmICgobGhzIC0gcmhzKSAhPT0gMCkpIHtcbiAgICAgIGNoYW5nZXMobmV3IERpZmZFZGl0KGN1cnJlbnRQYXRoLCBsaHMsIHJocykpO1xuICAgIH0gZWxzZSBpZiAobHR5cGUgPT09ICdvYmplY3QnICYmIGxocyAhPT0gbnVsbCAmJiByaHMgIT09IG51bGwpIHtcbiAgICAgIHN0YWNrID0gc3RhY2sgfHwgW107XG4gICAgICBpZiAoc3RhY2suaW5kZXhPZihsaHMpIDwgMCkge1xuICAgICAgICBzdGFjay5wdXNoKGxocyk7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGxocykpIHtcbiAgICAgICAgICB2YXIgaSwgbGVuID0gbGhzLmxlbmd0aDtcbiAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA+PSByaHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGNoYW5nZXMobmV3IERpZmZBcnJheShjdXJyZW50UGF0aCwgaSwgbmV3IERpZmZEZWxldGVkKHVuZGVmaW5lZCwgbGhzW2ldKSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZGVlcERpZmYobGhzW2ldLCByaHNbaV0sIGNoYW5nZXMsIHByZWZpbHRlciwgY3VycmVudFBhdGgsIGksIHN0YWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgd2hpbGUgKGkgPCByaHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjaGFuZ2VzKG5ldyBEaWZmQXJyYXkoY3VycmVudFBhdGgsIGksIG5ldyBEaWZmTmV3KHVuZGVmaW5lZCwgcmhzW2krK10pKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBha2V5cyA9IE9iamVjdC5rZXlzKGxocyk7XG4gICAgICAgICAgdmFyIHBrZXlzID0gT2JqZWN0LmtleXMocmhzKTtcbiAgICAgICAgICBha2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGssIGkpIHtcbiAgICAgICAgICAgIHZhciBvdGhlciA9IHBrZXlzLmluZGV4T2Yoayk7XG4gICAgICAgICAgICBpZiAob3RoZXIgPj0gMCkge1xuICAgICAgICAgICAgICBkZWVwRGlmZihsaHNba10sIHJoc1trXSwgY2hhbmdlcywgcHJlZmlsdGVyLCBjdXJyZW50UGF0aCwgaywgc3RhY2spO1xuICAgICAgICAgICAgICBwa2V5cyA9IGFycmF5UmVtb3ZlKHBrZXlzLCBvdGhlcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkZWVwRGlmZihsaHNba10sIHVuZGVmaW5lZCwgY2hhbmdlcywgcHJlZmlsdGVyLCBjdXJyZW50UGF0aCwgaywgc3RhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHBrZXlzLmZvckVhY2goZnVuY3Rpb24oaykge1xuICAgICAgICAgICAgZGVlcERpZmYodW5kZWZpbmVkLCByaHNba10sIGNoYW5nZXMsIHByZWZpbHRlciwgY3VycmVudFBhdGgsIGssIHN0YWNrKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBzdGFjay5sZW5ndGggPSBzdGFjay5sZW5ndGggLSAxO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobGhzICE9PSByaHMpIHtcbiAgICAgIGlmICghKGx0eXBlID09PSAnbnVtYmVyJyAmJiBpc05hTihsaHMpICYmIGlzTmFOKHJocykpKSB7XG4gICAgICAgIGNoYW5nZXMobmV3IERpZmZFZGl0KGN1cnJlbnRQYXRoLCBsaHMsIHJocykpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFjY3VtdWxhdGVEaWZmKGxocywgcmhzLCBwcmVmaWx0ZXIsIGFjY3VtKSB7XG4gICAgYWNjdW0gPSBhY2N1bSB8fCBbXTtcbiAgICBkZWVwRGlmZihsaHMsIHJocyxcbiAgICAgIGZ1bmN0aW9uKGRpZmYpIHtcbiAgICAgICAgaWYgKGRpZmYpIHtcbiAgICAgICAgICBhY2N1bS5wdXNoKGRpZmYpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcHJlZmlsdGVyKTtcbiAgICByZXR1cm4gKGFjY3VtLmxlbmd0aCkgPyBhY2N1bSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGx5QXJyYXlDaGFuZ2UoYXJyLCBpbmRleCwgY2hhbmdlKSB7XG4gICAgaWYgKGNoYW5nZS5wYXRoICYmIGNoYW5nZS5wYXRoLmxlbmd0aCkge1xuICAgICAgdmFyIGl0ID0gYXJyW2luZGV4XSxcbiAgICAgICAgICBpLCB1ID0gY2hhbmdlLnBhdGgubGVuZ3RoIC0gMTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB1OyBpKyspIHtcbiAgICAgICAgaXQgPSBpdFtjaGFuZ2UucGF0aFtpXV07XG4gICAgICB9XG4gICAgICBzd2l0Y2ggKGNoYW5nZS5raW5kKSB7XG4gICAgICAgIGNhc2UgJ0EnOlxuICAgICAgICAgIGFwcGx5QXJyYXlDaGFuZ2UoaXRbY2hhbmdlLnBhdGhbaV1dLCBjaGFuZ2UuaW5kZXgsIGNoYW5nZS5pdGVtKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRCc6XG4gICAgICAgICAgZGVsZXRlIGl0W2NoYW5nZS5wYXRoW2ldXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRSc6XG4gICAgICAgIGNhc2UgJ04nOlxuICAgICAgICAgIGl0W2NoYW5nZS5wYXRoW2ldXSA9IGNoYW5nZS5yaHM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCAoY2hhbmdlLmtpbmQpIHtcbiAgICAgICAgY2FzZSAnQSc6XG4gICAgICAgICAgYXBwbHlBcnJheUNoYW5nZShhcnJbaW5kZXhdLCBjaGFuZ2UuaW5kZXgsIGNoYW5nZS5pdGVtKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRCc6XG4gICAgICAgICAgYXJyID0gYXJyYXlSZW1vdmUoYXJyLCBpbmRleCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0UnOlxuICAgICAgICBjYXNlICdOJzpcbiAgICAgICAgICBhcnJbaW5kZXhdID0gY2hhbmdlLnJocztcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGx5Q2hhbmdlKHRhcmdldCwgc291cmNlLCBjaGFuZ2UpIHtcbiAgICBpZiAodGFyZ2V0ICYmIHNvdXJjZSAmJiBjaGFuZ2UgJiYgY2hhbmdlLmtpbmQpIHtcbiAgICAgIHZhciBpdCA9IHRhcmdldCxcbiAgICAgICAgICBpID0gLTEsXG4gICAgICAgICAgbGFzdCA9IGNoYW5nZS5wYXRoID8gY2hhbmdlLnBhdGgubGVuZ3RoIC0gMSA6IDA7XG4gICAgICB3aGlsZSAoKytpIDwgbGFzdCkge1xuICAgICAgICBpZiAodHlwZW9mIGl0W2NoYW5nZS5wYXRoW2ldXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpdFtjaGFuZ2UucGF0aFtpXV0gPSAodHlwZW9mIGNoYW5nZS5wYXRoW2ldID09PSAnbnVtYmVyJykgPyBbXSA6IHt9O1xuICAgICAgICB9XG4gICAgICAgIGl0ID0gaXRbY2hhbmdlLnBhdGhbaV1dO1xuICAgICAgfVxuICAgICAgc3dpdGNoIChjaGFuZ2Uua2luZCkge1xuICAgICAgICBjYXNlICdBJzpcbiAgICAgICAgICBhcHBseUFycmF5Q2hhbmdlKGNoYW5nZS5wYXRoID8gaXRbY2hhbmdlLnBhdGhbaV1dIDogaXQsIGNoYW5nZS5pbmRleCwgY2hhbmdlLml0ZW0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdEJzpcbiAgICAgICAgICBkZWxldGUgaXRbY2hhbmdlLnBhdGhbaV1dO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdFJzpcbiAgICAgICAgY2FzZSAnTic6XG4gICAgICAgICAgaXRbY2hhbmdlLnBhdGhbaV1dID0gY2hhbmdlLnJocztcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZXZlcnRBcnJheUNoYW5nZShhcnIsIGluZGV4LCBjaGFuZ2UpIHtcbiAgICBpZiAoY2hhbmdlLnBhdGggJiYgY2hhbmdlLnBhdGgubGVuZ3RoKSB7XG4gICAgICAvLyB0aGUgc3RydWN0dXJlIG9mIHRoZSBvYmplY3QgYXQgdGhlIGluZGV4IGhhcyBjaGFuZ2VkLi4uXG4gICAgICB2YXIgaXQgPSBhcnJbaW5kZXhdLFxuICAgICAgICAgIGksIHUgPSBjaGFuZ2UucGF0aC5sZW5ndGggLSAxO1xuICAgICAgZm9yIChpID0gMDsgaSA8IHU7IGkrKykge1xuICAgICAgICBpdCA9IGl0W2NoYW5nZS5wYXRoW2ldXTtcbiAgICAgIH1cbiAgICAgIHN3aXRjaCAoY2hhbmdlLmtpbmQpIHtcbiAgICAgICAgY2FzZSAnQSc6XG4gICAgICAgICAgcmV2ZXJ0QXJyYXlDaGFuZ2UoaXRbY2hhbmdlLnBhdGhbaV1dLCBjaGFuZ2UuaW5kZXgsIGNoYW5nZS5pdGVtKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRCc6XG4gICAgICAgICAgaXRbY2hhbmdlLnBhdGhbaV1dID0gY2hhbmdlLmxocztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRSc6XG4gICAgICAgICAgaXRbY2hhbmdlLnBhdGhbaV1dID0gY2hhbmdlLmxocztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnTic6XG4gICAgICAgICAgZGVsZXRlIGl0W2NoYW5nZS5wYXRoW2ldXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdGhlIGFycmF5IGl0ZW0gaXMgZGlmZmVyZW50Li4uXG4gICAgICBzd2l0Y2ggKGNoYW5nZS5raW5kKSB7XG4gICAgICAgIGNhc2UgJ0EnOlxuICAgICAgICAgIHJldmVydEFycmF5Q2hhbmdlKGFycltpbmRleF0sIGNoYW5nZS5pbmRleCwgY2hhbmdlLml0ZW0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdEJzpcbiAgICAgICAgICBhcnJbaW5kZXhdID0gY2hhbmdlLmxocztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRSc6XG4gICAgICAgICAgYXJyW2luZGV4XSA9IGNoYW5nZS5saHM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ04nOlxuICAgICAgICAgIGFyciA9IGFycmF5UmVtb3ZlKGFyciwgaW5kZXgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgZnVuY3Rpb24gcmV2ZXJ0Q2hhbmdlKHRhcmdldCwgc291cmNlLCBjaGFuZ2UpIHtcbiAgICBpZiAodGFyZ2V0ICYmIHNvdXJjZSAmJiBjaGFuZ2UgJiYgY2hhbmdlLmtpbmQpIHtcbiAgICAgIHZhciBpdCA9IHRhcmdldCxcbiAgICAgICAgICBpLCB1O1xuICAgICAgdSA9IGNoYW5nZS5wYXRoLmxlbmd0aCAtIDE7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdTsgaSsrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRbY2hhbmdlLnBhdGhbaV1dID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGl0W2NoYW5nZS5wYXRoW2ldXSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIGl0ID0gaXRbY2hhbmdlLnBhdGhbaV1dO1xuICAgICAgfVxuICAgICAgc3dpdGNoIChjaGFuZ2Uua2luZCkge1xuICAgICAgICBjYXNlICdBJzpcbiAgICAgICAgICAvLyBBcnJheSB3YXMgbW9kaWZpZWQuLi5cbiAgICAgICAgICAvLyBpdCB3aWxsIGJlIGFuIGFycmF5Li4uXG4gICAgICAgICAgcmV2ZXJ0QXJyYXlDaGFuZ2UoaXRbY2hhbmdlLnBhdGhbaV1dLCBjaGFuZ2UuaW5kZXgsIGNoYW5nZS5pdGVtKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRCc6XG4gICAgICAgICAgLy8gSXRlbSB3YXMgZGVsZXRlZC4uLlxuICAgICAgICAgIGl0W2NoYW5nZS5wYXRoW2ldXSA9IGNoYW5nZS5saHM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0UnOlxuICAgICAgICAgIC8vIEl0ZW0gd2FzIGVkaXRlZC4uLlxuICAgICAgICAgIGl0W2NoYW5nZS5wYXRoW2ldXSA9IGNoYW5nZS5saHM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ04nOlxuICAgICAgICAgIC8vIEl0ZW0gaXMgbmV3Li4uXG4gICAgICAgICAgZGVsZXRlIGl0W2NoYW5nZS5wYXRoW2ldXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhcHBseURpZmYodGFyZ2V0LCBzb3VyY2UsIGZpbHRlcikge1xuICAgIGlmICh0YXJnZXQgJiYgc291cmNlKSB7XG4gICAgICB2YXIgb25DaGFuZ2UgPSBmdW5jdGlvbihjaGFuZ2UpIHtcbiAgICAgICAgaWYgKCFmaWx0ZXIgfHwgZmlsdGVyKHRhcmdldCwgc291cmNlLCBjaGFuZ2UpKSB7XG4gICAgICAgICAgYXBwbHlDaGFuZ2UodGFyZ2V0LCBzb3VyY2UsIGNoYW5nZSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBkZWVwRGlmZih0YXJnZXQsIHNvdXJjZSwgb25DaGFuZ2UpO1xuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGFjY3VtdWxhdGVEaWZmLCB7XG5cbiAgICBkaWZmOiB7XG4gICAgICB2YWx1ZTogYWNjdW11bGF0ZURpZmYsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSxcbiAgICBvYnNlcnZhYmxlRGlmZjoge1xuICAgICAgdmFsdWU6IGRlZXBEaWZmLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgYXBwbHlEaWZmOiB7XG4gICAgICB2YWx1ZTogYXBwbHlEaWZmLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgYXBwbHlDaGFuZ2U6IHtcbiAgICAgIHZhbHVlOiBhcHBseUNoYW5nZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9LFxuICAgIHJldmVydENoYW5nZToge1xuICAgICAgdmFsdWU6IHJldmVydENoYW5nZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9LFxuICAgIGlzQ29uZmxpY3Q6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICd1bmRlZmluZWQnICE9PSB0eXBlb2YgY29uZmxpY3Q7XG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgbm9Db25mbGljdDoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoY29uZmxpY3RSZXNvbHV0aW9uKSB7XG4gICAgICAgICAgY29uZmxpY3RSZXNvbHV0aW9uLmZvckVhY2goZnVuY3Rpb24oaXQpIHtcbiAgICAgICAgICAgIGl0KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY29uZmxpY3RSZXNvbHV0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjdW11bGF0ZURpZmY7XG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGFjY3VtdWxhdGVEaWZmO1xufSkpO1xuIiwidmFyIGRldGVjdEJyb3dzZXIgPSByZXF1aXJlKCcuL2xpYi9kZXRlY3RCcm93c2VyJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZGV0ZWN0QnJvd3NlcihuYXZpZ2F0b3IudXNlckFnZW50KTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGV0ZWN0QnJvd3Nlcih1c2VyQWdlbnRTdHJpbmcpIHtcbiAgdmFyIGJyb3dzZXJzID0gW1xuICAgIFsgJ2VkZ2UnLCAvRWRnZVxcLyhbMC05XFwuX10rKS8gXSxcbiAgICBbICdjaHJvbWUnLCAvKD8hQ2hyb20uKk9QUilDaHJvbSg/OmV8aXVtKVxcLyhbMC05XFwuXSspKDo/XFxzfCQpLyBdLFxuICAgIFsgJ2NyaW9zJywgL0NyaU9TXFwvKFswLTlcXC5dKykoOj9cXHN8JCkvIF0sXG4gICAgWyAnZmlyZWZveCcsIC9GaXJlZm94XFwvKFswLTlcXC5dKykoPzpcXHN8JCkvIF0sXG4gICAgWyAnb3BlcmEnLCAvT3BlcmFcXC8oWzAtOVxcLl0rKSg/Olxcc3wkKS8gXSxcbiAgICBbICdvcGVyYScsIC9PUFJcXC8oWzAtOVxcLl0rKSg6P1xcc3wkKSQvIF0sXG4gICAgWyAnaWUnLCAvVHJpZGVudFxcLzdcXC4wLipydlxcOihbMC05XFwuXSspXFwpLipHZWNrbyQvIF0sXG4gICAgWyAnaWUnLCAvTVNJRVxccyhbMC05XFwuXSspOy4qVHJpZGVudFxcL1s0LTddLjAvIF0sXG4gICAgWyAnaWUnLCAvTVNJRVxccyg3XFwuMCkvIF0sXG4gICAgWyAnYmIxMCcsIC9CQjEwO1xcc1RvdWNoLipWZXJzaW9uXFwvKFswLTlcXC5dKykvIF0sXG4gICAgWyAnYW5kcm9pZCcsIC9BbmRyb2lkXFxzKFswLTlcXC5dKykvIF0sXG4gICAgWyAnaW9zJywgL2lQYWQuKlZlcnNpb25cXC8oWzAtOVxcLl9dKykvIF0sXG4gICAgWyAnaW9zJywgIC9pUGhvbmUuKlZlcnNpb25cXC8oWzAtOVxcLl9dKykvIF0sXG4gICAgWyAnc2FmYXJpJywgL1ZlcnNpb25cXC8oWzAtOVxcLl9dKykuKlNhZmFyaS8gXVxuICBdO1xuXG4gIHZhciBpID0gMCwgbWFwcGVkID1bXTtcbiAgZm9yIChpID0gMDsgaSA8IGJyb3dzZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgYnJvd3NlcnNbaV0gPSBjcmVhdGVNYXRjaChicm93c2Vyc1tpXSk7XG4gICAgaWYgKGlzTWF0Y2goYnJvd3NlcnNbaV0pKSB7XG4gICAgICBtYXBwZWQucHVzaChicm93c2Vyc1tpXSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIG1hdGNoID0gbWFwcGVkWzBdO1xuICB2YXIgcGFydHMgPSBtYXRjaCAmJiBtYXRjaFszXS5zcGxpdCgvWy5fXS8pLnNsaWNlKDAsMyk7XG5cbiAgd2hpbGUgKHBhcnRzICYmIHBhcnRzLmxlbmd0aCA8IDMpIHtcbiAgICBwYXJ0cy5wdXNoKCcwJyk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVNYXRjaChwYWlyKSB7XG4gICAgcmV0dXJuIHBhaXIuY29uY2F0KHBhaXJbMV0uZXhlYyh1c2VyQWdlbnRTdHJpbmcpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTWF0Y2gocGFpcikge1xuICAgIHJldHVybiAhIXBhaXJbMl07XG4gIH1cblxuICAvLyByZXR1cm4gdGhlIG5hbWUgYW5kIHZlcnNpb25cbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBtYXRjaCAmJiBtYXRjaFswXSxcbiAgICB2ZXJzaW9uOiBwYXJ0cyAmJiBwYXJ0cy5qb2luKCcuJyksXG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJ2dsb2JhbC9kb2N1bWVudCcpXG5cbm1vZHVsZS5leHBvcnRzID0gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciA/IHJlYWR5IDogbm9vcFxuXG5mdW5jdGlvbiByZWFkeSAoY2FsbGJhY2spIHtcbiAgdmFyIHN0YXRlID0gZG9jdW1lbnQucmVhZHlTdGF0ZVxuICBpZiAoc3RhdGUgPT09ICdjb21wbGV0ZScgfHwgc3RhdGUgPT09ICdpbnRlcmFjdGl2ZScpIHtcbiAgICByZXR1cm4gc2V0VGltZW91dChjYWxsYmFjaywgMClcbiAgfVxuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiBvbkxvYWQgKCkge1xuICAgIGNhbGxiYWNrKClcbiAgfSlcbn1cblxuZnVuY3Rpb24gbm9vcCAoKSB7fVxuIiwiOyhmdW5jdGlvbiAoKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHQvKipcblx0ICogQHByZXNlcnZlIEZhc3RDbGljazogcG9seWZpbGwgdG8gcmVtb3ZlIGNsaWNrIGRlbGF5cyBvbiBicm93c2VycyB3aXRoIHRvdWNoIFVJcy5cblx0ICpcblx0ICogQGNvZGluZ3N0YW5kYXJkIGZ0bGFicy1qc3YyXG5cdCAqIEBjb3B5cmlnaHQgVGhlIEZpbmFuY2lhbCBUaW1lcyBMaW1pdGVkIFtBbGwgUmlnaHRzIFJlc2VydmVkXVxuXHQgKiBAbGljZW5zZSBNSVQgTGljZW5zZSAoc2VlIExJQ0VOU0UudHh0KVxuXHQgKi9cblxuXHQvKmpzbGludCBicm93c2VyOnRydWUsIG5vZGU6dHJ1ZSovXG5cdC8qZ2xvYmFsIGRlZmluZSwgRXZlbnQsIE5vZGUqL1xuXG5cblx0LyoqXG5cdCAqIEluc3RhbnRpYXRlIGZhc3QtY2xpY2tpbmcgbGlzdGVuZXJzIG9uIHRoZSBzcGVjaWZpZWQgbGF5ZXIuXG5cdCAqXG5cdCAqIEBjb25zdHJ1Y3RvclxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGxheWVyIFRoZSBsYXllciB0byBsaXN0ZW4gb25cblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBUaGUgb3B0aW9ucyB0byBvdmVycmlkZSB0aGUgZGVmYXVsdHNcblx0ICovXG5cdGZ1bmN0aW9uIEZhc3RDbGljayhsYXllciwgb3B0aW9ucykge1xuXHRcdHZhciBvbGRPbkNsaWNrO1xuXG5cdFx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0XHQvKipcblx0XHQgKiBXaGV0aGVyIGEgY2xpY2sgaXMgY3VycmVudGx5IGJlaW5nIHRyYWNrZWQuXG5cdFx0ICpcblx0XHQgKiBAdHlwZSBib29sZWFuXG5cdFx0ICovXG5cdFx0dGhpcy50cmFja2luZ0NsaWNrID0gZmFsc2U7XG5cblxuXHRcdC8qKlxuXHRcdCAqIFRpbWVzdGFtcCBmb3Igd2hlbiBjbGljayB0cmFja2luZyBzdGFydGVkLlxuXHRcdCAqXG5cdFx0ICogQHR5cGUgbnVtYmVyXG5cdFx0ICovXG5cdFx0dGhpcy50cmFja2luZ0NsaWNrU3RhcnQgPSAwO1xuXG5cblx0XHQvKipcblx0XHQgKiBUaGUgZWxlbWVudCBiZWluZyB0cmFja2VkIGZvciBhIGNsaWNrLlxuXHRcdCAqXG5cdFx0ICogQHR5cGUgRXZlbnRUYXJnZXRcblx0XHQgKi9cblx0XHR0aGlzLnRhcmdldEVsZW1lbnQgPSBudWxsO1xuXG5cblx0XHQvKipcblx0XHQgKiBYLWNvb3JkaW5hdGUgb2YgdG91Y2ggc3RhcnQgZXZlbnQuXG5cdFx0ICpcblx0XHQgKiBAdHlwZSBudW1iZXJcblx0XHQgKi9cblx0XHR0aGlzLnRvdWNoU3RhcnRYID0gMDtcblxuXG5cdFx0LyoqXG5cdFx0ICogWS1jb29yZGluYXRlIG9mIHRvdWNoIHN0YXJ0IGV2ZW50LlxuXHRcdCAqXG5cdFx0ICogQHR5cGUgbnVtYmVyXG5cdFx0ICovXG5cdFx0dGhpcy50b3VjaFN0YXJ0WSA9IDA7XG5cblxuXHRcdC8qKlxuXHRcdCAqIElEIG9mIHRoZSBsYXN0IHRvdWNoLCByZXRyaWV2ZWQgZnJvbSBUb3VjaC5pZGVudGlmaWVyLlxuXHRcdCAqXG5cdFx0ICogQHR5cGUgbnVtYmVyXG5cdFx0ICovXG5cdFx0dGhpcy5sYXN0VG91Y2hJZGVudGlmaWVyID0gMDtcblxuXG5cdFx0LyoqXG5cdFx0ICogVG91Y2htb3ZlIGJvdW5kYXJ5LCBiZXlvbmQgd2hpY2ggYSBjbGljayB3aWxsIGJlIGNhbmNlbGxlZC5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIG51bWJlclxuXHRcdCAqL1xuXHRcdHRoaXMudG91Y2hCb3VuZGFyeSA9IG9wdGlvbnMudG91Y2hCb3VuZGFyeSB8fCAxMDtcblxuXG5cdFx0LyoqXG5cdFx0ICogVGhlIEZhc3RDbGljayBsYXllci5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIEVsZW1lbnRcblx0XHQgKi9cblx0XHR0aGlzLmxheWVyID0gbGF5ZXI7XG5cblx0XHQvKipcblx0XHQgKiBUaGUgbWluaW11bSB0aW1lIGJldHdlZW4gdGFwKHRvdWNoc3RhcnQgYW5kIHRvdWNoZW5kKSBldmVudHNcblx0XHQgKlxuXHRcdCAqIEB0eXBlIG51bWJlclxuXHRcdCAqL1xuXHRcdHRoaXMudGFwRGVsYXkgPSBvcHRpb25zLnRhcERlbGF5IHx8IDIwMDtcblxuXHRcdC8qKlxuXHRcdCAqIFRoZSBtYXhpbXVtIHRpbWUgZm9yIGEgdGFwXG5cdFx0ICpcblx0XHQgKiBAdHlwZSBudW1iZXJcblx0XHQgKi9cblx0XHR0aGlzLnRhcFRpbWVvdXQgPSBvcHRpb25zLnRhcFRpbWVvdXQgfHwgNzAwO1xuXG5cdFx0aWYgKEZhc3RDbGljay5ub3ROZWVkZWQobGF5ZXIpKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gU29tZSBvbGQgdmVyc2lvbnMgb2YgQW5kcm9pZCBkb24ndCBoYXZlIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kXG5cdFx0ZnVuY3Rpb24gYmluZChtZXRob2QsIGNvbnRleHQpIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ldGhvZC5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpOyB9O1xuXHRcdH1cblxuXG5cdFx0dmFyIG1ldGhvZHMgPSBbJ29uTW91c2UnLCAnb25DbGljaycsICdvblRvdWNoU3RhcnQnLCAnb25Ub3VjaE1vdmUnLCAnb25Ub3VjaEVuZCcsICdvblRvdWNoQ2FuY2VsJ107XG5cdFx0dmFyIGNvbnRleHQgPSB0aGlzO1xuXHRcdGZvciAodmFyIGkgPSAwLCBsID0gbWV0aG9kcy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcblx0XHRcdGNvbnRleHRbbWV0aG9kc1tpXV0gPSBiaW5kKGNvbnRleHRbbWV0aG9kc1tpXV0sIGNvbnRleHQpO1xuXHRcdH1cblxuXHRcdC8vIFNldCB1cCBldmVudCBoYW5kbGVycyBhcyByZXF1aXJlZFxuXHRcdGlmIChkZXZpY2VJc0FuZHJvaWQpIHtcblx0XHRcdGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIHRoaXMub25Nb3VzZSwgdHJ1ZSk7XG5cdFx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2UsIHRydWUpO1xuXHRcdFx0bGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25Nb3VzZSwgdHJ1ZSk7XG5cdFx0fVxuXG5cdFx0bGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xpY2ssIHRydWUpO1xuXHRcdGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uVG91Y2hTdGFydCwgZmFsc2UpO1xuXHRcdGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMub25Ub3VjaE1vdmUsIGZhbHNlKTtcblx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMub25Ub3VjaEVuZCwgZmFsc2UpO1xuXHRcdGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy5vblRvdWNoQ2FuY2VsLCBmYWxzZSk7XG5cblx0XHQvLyBIYWNrIGlzIHJlcXVpcmVkIGZvciBicm93c2VycyB0aGF0IGRvbid0IHN1cHBvcnQgRXZlbnQjc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIChlLmcuIEFuZHJvaWQgMilcblx0XHQvLyB3aGljaCBpcyBob3cgRmFzdENsaWNrIG5vcm1hbGx5IHN0b3BzIGNsaWNrIGV2ZW50cyBidWJibGluZyB0byBjYWxsYmFja3MgcmVnaXN0ZXJlZCBvbiB0aGUgRmFzdENsaWNrXG5cdFx0Ly8gbGF5ZXIgd2hlbiB0aGV5IGFyZSBjYW5jZWxsZWQuXG5cdFx0aWYgKCFFdmVudC5wcm90b3R5cGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKSB7XG5cdFx0XHRsYXllci5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgY2FsbGJhY2ssIGNhcHR1cmUpIHtcblx0XHRcdFx0dmFyIHJtdiA9IE5vZGUucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXI7XG5cdFx0XHRcdGlmICh0eXBlID09PSAnY2xpY2snKSB7XG5cdFx0XHRcdFx0cm12LmNhbGwobGF5ZXIsIHR5cGUsIGNhbGxiYWNrLmhpamFja2VkIHx8IGNhbGxiYWNrLCBjYXB0dXJlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRybXYuY2FsbChsYXllciwgdHlwZSwgY2FsbGJhY2ssIGNhcHR1cmUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgY2FsbGJhY2ssIGNhcHR1cmUpIHtcblx0XHRcdFx0dmFyIGFkdiA9IE5vZGUucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXI7XG5cdFx0XHRcdGlmICh0eXBlID09PSAnY2xpY2snKSB7XG5cdFx0XHRcdFx0YWR2LmNhbGwobGF5ZXIsIHR5cGUsIGNhbGxiYWNrLmhpamFja2VkIHx8IChjYWxsYmFjay5oaWphY2tlZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRpZiAoIWV2ZW50LnByb3BhZ2F0aW9uU3RvcHBlZCkge1xuXHRcdFx0XHRcdFx0XHRjYWxsYmFjayhldmVudCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSksIGNhcHR1cmUpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGFkdi5jYWxsKGxheWVyLCB0eXBlLCBjYWxsYmFjaywgY2FwdHVyZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0Ly8gSWYgYSBoYW5kbGVyIGlzIGFscmVhZHkgZGVjbGFyZWQgaW4gdGhlIGVsZW1lbnQncyBvbmNsaWNrIGF0dHJpYnV0ZSwgaXQgd2lsbCBiZSBmaXJlZCBiZWZvcmVcblx0XHQvLyBGYXN0Q2xpY2sncyBvbkNsaWNrIGhhbmRsZXIuIEZpeCB0aGlzIGJ5IHB1bGxpbmcgb3V0IHRoZSB1c2VyLWRlZmluZWQgaGFuZGxlciBmdW5jdGlvbiBhbmRcblx0XHQvLyBhZGRpbmcgaXQgYXMgbGlzdGVuZXIuXG5cdFx0aWYgKHR5cGVvZiBsYXllci5vbmNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG5cblx0XHRcdC8vIEFuZHJvaWQgYnJvd3NlciBvbiBhdCBsZWFzdCAzLjIgcmVxdWlyZXMgYSBuZXcgcmVmZXJlbmNlIHRvIHRoZSBmdW5jdGlvbiBpbiBsYXllci5vbmNsaWNrXG5cdFx0XHQvLyAtIHRoZSBvbGQgb25lIHdvbid0IHdvcmsgaWYgcGFzc2VkIHRvIGFkZEV2ZW50TGlzdGVuZXIgZGlyZWN0bHkuXG5cdFx0XHRvbGRPbkNsaWNrID0gbGF5ZXIub25jbGljaztcblx0XHRcdGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0b2xkT25DbGljayhldmVudCk7XG5cdFx0XHR9LCBmYWxzZSk7XG5cdFx0XHRsYXllci5vbmNsaWNrID0gbnVsbDtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0KiBXaW5kb3dzIFBob25lIDguMSBmYWtlcyB1c2VyIGFnZW50IHN0cmluZyB0byBsb29rIGxpa2UgQW5kcm9pZCBhbmQgaVBob25lLlxuXHQqXG5cdCogQHR5cGUgYm9vbGVhblxuXHQqL1xuXHR2YXIgZGV2aWNlSXNXaW5kb3dzUGhvbmUgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoXCJXaW5kb3dzIFBob25lXCIpID49IDA7XG5cblx0LyoqXG5cdCAqIEFuZHJvaWQgcmVxdWlyZXMgZXhjZXB0aW9ucy5cblx0ICpcblx0ICogQHR5cGUgYm9vbGVhblxuXHQgKi9cblx0dmFyIGRldmljZUlzQW5kcm9pZCA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQW5kcm9pZCcpID4gMCAmJiAhZGV2aWNlSXNXaW5kb3dzUGhvbmU7XG5cblxuXHQvKipcblx0ICogaU9TIHJlcXVpcmVzIGV4Y2VwdGlvbnMuXG5cdCAqXG5cdCAqIEB0eXBlIGJvb2xlYW5cblx0ICovXG5cdHZhciBkZXZpY2VJc0lPUyA9IC9pUChhZHxob25lfG9kKS8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSAmJiAhZGV2aWNlSXNXaW5kb3dzUGhvbmU7XG5cblxuXHQvKipcblx0ICogaU9TIDQgcmVxdWlyZXMgYW4gZXhjZXB0aW9uIGZvciBzZWxlY3QgZWxlbWVudHMuXG5cdCAqXG5cdCAqIEB0eXBlIGJvb2xlYW5cblx0ICovXG5cdHZhciBkZXZpY2VJc0lPUzQgPSBkZXZpY2VJc0lPUyAmJiAoL09TIDRfXFxkKF9cXGQpPy8pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cblxuXHQvKipcblx0ICogaU9TIDYuMC03LiogcmVxdWlyZXMgdGhlIHRhcmdldCBlbGVtZW50IHRvIGJlIG1hbnVhbGx5IGRlcml2ZWRcblx0ICpcblx0ICogQHR5cGUgYm9vbGVhblxuXHQgKi9cblx0dmFyIGRldmljZUlzSU9TV2l0aEJhZFRhcmdldCA9IGRldmljZUlzSU9TICYmICgvT1MgWzYtN11fXFxkLykudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuXHQvKipcblx0ICogQmxhY2tCZXJyeSByZXF1aXJlcyBleGNlcHRpb25zLlxuXHQgKlxuXHQgKiBAdHlwZSBib29sZWFuXG5cdCAqL1xuXHR2YXIgZGV2aWNlSXNCbGFja0JlcnJ5MTAgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0JCMTAnKSA+IDA7XG5cblx0LyoqXG5cdCAqIERldGVybWluZSB3aGV0aGVyIGEgZ2l2ZW4gZWxlbWVudCByZXF1aXJlcyBhIG5hdGl2ZSBjbGljay5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudFRhcmdldHxFbGVtZW50fSB0YXJnZXQgVGFyZ2V0IERPTSBlbGVtZW50XG5cdCAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnQgbmVlZHMgYSBuYXRpdmUgY2xpY2tcblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUubmVlZHNDbGljayA9IGZ1bmN0aW9uKHRhcmdldCkge1xuXHRcdHN3aXRjaCAodGFyZ2V0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpIHtcblxuXHRcdC8vIERvbid0IHNlbmQgYSBzeW50aGV0aWMgY2xpY2sgdG8gZGlzYWJsZWQgaW5wdXRzIChpc3N1ZSAjNjIpXG5cdFx0Y2FzZSAnYnV0dG9uJzpcblx0XHRjYXNlICdzZWxlY3QnOlxuXHRcdGNhc2UgJ3RleHRhcmVhJzpcblx0XHRcdGlmICh0YXJnZXQuZGlzYWJsZWQpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ2lucHV0JzpcblxuXHRcdFx0Ly8gRmlsZSBpbnB1dHMgbmVlZCByZWFsIGNsaWNrcyBvbiBpT1MgNiBkdWUgdG8gYSBicm93c2VyIGJ1ZyAoaXNzdWUgIzY4KVxuXHRcdFx0aWYgKChkZXZpY2VJc0lPUyAmJiB0YXJnZXQudHlwZSA9PT0gJ2ZpbGUnKSB8fCB0YXJnZXQuZGlzYWJsZWQpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgJ2xhYmVsJzpcblx0XHRjYXNlICdpZnJhbWUnOiAvLyBpT1M4IGhvbWVzY3JlZW4gYXBwcyBjYW4gcHJldmVudCBldmVudHMgYnViYmxpbmcgaW50byBmcmFtZXNcblx0XHRjYXNlICd2aWRlbyc6XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gKC9cXGJuZWVkc2NsaWNrXFxiLykudGVzdCh0YXJnZXQuY2xhc3NOYW1lKTtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmUgd2hldGhlciBhIGdpdmVuIGVsZW1lbnQgcmVxdWlyZXMgYSBjYWxsIHRvIGZvY3VzIHRvIHNpbXVsYXRlIGNsaWNrIGludG8gZWxlbWVudC5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudFRhcmdldHxFbGVtZW50fSB0YXJnZXQgVGFyZ2V0IERPTSBlbGVtZW50XG5cdCAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnQgcmVxdWlyZXMgYSBjYWxsIHRvIGZvY3VzIHRvIHNpbXVsYXRlIG5hdGl2ZSBjbGljay5cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUubmVlZHNGb2N1cyA9IGZ1bmN0aW9uKHRhcmdldCkge1xuXHRcdHN3aXRjaCAodGFyZ2V0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkpIHtcblx0XHRjYXNlICd0ZXh0YXJlYSc6XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRjYXNlICdzZWxlY3QnOlxuXHRcdFx0cmV0dXJuICFkZXZpY2VJc0FuZHJvaWQ7XG5cdFx0Y2FzZSAnaW5wdXQnOlxuXHRcdFx0c3dpdGNoICh0YXJnZXQudHlwZSkge1xuXHRcdFx0Y2FzZSAnYnV0dG9uJzpcblx0XHRcdGNhc2UgJ2NoZWNrYm94Jzpcblx0XHRcdGNhc2UgJ2ZpbGUnOlxuXHRcdFx0Y2FzZSAnaW1hZ2UnOlxuXHRcdFx0Y2FzZSAncmFkaW8nOlxuXHRcdFx0Y2FzZSAnc3VibWl0Jzpcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBObyBwb2ludCBpbiBhdHRlbXB0aW5nIHRvIGZvY3VzIGRpc2FibGVkIGlucHV0c1xuXHRcdFx0cmV0dXJuICF0YXJnZXQuZGlzYWJsZWQgJiYgIXRhcmdldC5yZWFkT25seTtcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuICgvXFxibmVlZHNmb2N1c1xcYi8pLnRlc3QodGFyZ2V0LmNsYXNzTmFtZSk7XG5cdFx0fVxuXHR9O1xuXG5cblx0LyoqXG5cdCAqIFNlbmQgYSBjbGljayBldmVudCB0byB0aGUgc3BlY2lmaWVkIGVsZW1lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnRUYXJnZXR8RWxlbWVudH0gdGFyZ2V0RWxlbWVudFxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5zZW5kQ2xpY2sgPSBmdW5jdGlvbih0YXJnZXRFbGVtZW50LCBldmVudCkge1xuXHRcdHZhciBjbGlja0V2ZW50LCB0b3VjaDtcblxuXHRcdC8vIE9uIHNvbWUgQW5kcm9pZCBkZXZpY2VzIGFjdGl2ZUVsZW1lbnQgbmVlZHMgdG8gYmUgYmx1cnJlZCBvdGhlcndpc2UgdGhlIHN5bnRoZXRpYyBjbGljayB3aWxsIGhhdmUgbm8gZWZmZWN0ICgjMjQpXG5cdFx0aWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gdGFyZ2V0RWxlbWVudCkge1xuXHRcdFx0ZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCk7XG5cdFx0fVxuXG5cdFx0dG91Y2ggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcblxuXHRcdC8vIFN5bnRoZXNpc2UgYSBjbGljayBldmVudCwgd2l0aCBhbiBleHRyYSBhdHRyaWJ1dGUgc28gaXQgY2FuIGJlIHRyYWNrZWRcblx0XHRjbGlja0V2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ01vdXNlRXZlbnRzJyk7XG5cdFx0Y2xpY2tFdmVudC5pbml0TW91c2VFdmVudCh0aGlzLmRldGVybWluZUV2ZW50VHlwZSh0YXJnZXRFbGVtZW50KSwgdHJ1ZSwgdHJ1ZSwgd2luZG93LCAxLCB0b3VjaC5zY3JlZW5YLCB0b3VjaC5zY3JlZW5ZLCB0b3VjaC5jbGllbnRYLCB0b3VjaC5jbGllbnRZLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgMCwgbnVsbCk7XG5cdFx0Y2xpY2tFdmVudC5mb3J3YXJkZWRUb3VjaEV2ZW50ID0gdHJ1ZTtcblx0XHR0YXJnZXRFbGVtZW50LmRpc3BhdGNoRXZlbnQoY2xpY2tFdmVudCk7XG5cdH07XG5cblx0RmFzdENsaWNrLnByb3RvdHlwZS5kZXRlcm1pbmVFdmVudFR5cGUgPSBmdW5jdGlvbih0YXJnZXRFbGVtZW50KSB7XG5cblx0XHQvL0lzc3VlICMxNTk6IEFuZHJvaWQgQ2hyb21lIFNlbGVjdCBCb3ggZG9lcyBub3Qgb3BlbiB3aXRoIGEgc3ludGhldGljIGNsaWNrIGV2ZW50XG5cdFx0aWYgKGRldmljZUlzQW5kcm9pZCAmJiB0YXJnZXRFbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3NlbGVjdCcpIHtcblx0XHRcdHJldHVybiAnbW91c2Vkb3duJztcblx0XHR9XG5cblx0XHRyZXR1cm4gJ2NsaWNrJztcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fEVsZW1lbnR9IHRhcmdldEVsZW1lbnRcblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUuZm9jdXMgPSBmdW5jdGlvbih0YXJnZXRFbGVtZW50KSB7XG5cdFx0dmFyIGxlbmd0aDtcblxuXHRcdC8vIElzc3VlICMxNjA6IG9uIGlPUyA3LCBzb21lIGlucHV0IGVsZW1lbnRzIChlLmcuIGRhdGUgZGF0ZXRpbWUgbW9udGgpIHRocm93IGEgdmFndWUgVHlwZUVycm9yIG9uIHNldFNlbGVjdGlvblJhbmdlLiBUaGVzZSBlbGVtZW50cyBkb24ndCBoYXZlIGFuIGludGVnZXIgdmFsdWUgZm9yIHRoZSBzZWxlY3Rpb25TdGFydCBhbmQgc2VsZWN0aW9uRW5kIHByb3BlcnRpZXMsIGJ1dCB1bmZvcnR1bmF0ZWx5IHRoYXQgY2FuJ3QgYmUgdXNlZCBmb3IgZGV0ZWN0aW9uIGJlY2F1c2UgYWNjZXNzaW5nIHRoZSBwcm9wZXJ0aWVzIGFsc28gdGhyb3dzIGEgVHlwZUVycm9yLiBKdXN0IGNoZWNrIHRoZSB0eXBlIGluc3RlYWQuIEZpbGVkIGFzIEFwcGxlIGJ1ZyAjMTUxMjI3MjQuXG5cdFx0aWYgKGRldmljZUlzSU9TICYmIHRhcmdldEVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UgJiYgdGFyZ2V0RWxlbWVudC50eXBlLmluZGV4T2YoJ2RhdGUnKSAhPT0gMCAmJiB0YXJnZXRFbGVtZW50LnR5cGUgIT09ICd0aW1lJyAmJiB0YXJnZXRFbGVtZW50LnR5cGUgIT09ICdtb250aCcpIHtcblx0XHRcdGxlbmd0aCA9IHRhcmdldEVsZW1lbnQudmFsdWUubGVuZ3RoO1xuXHRcdFx0dGFyZ2V0RWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZShsZW5ndGgsIGxlbmd0aCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldEVsZW1lbnQuZm9jdXMoKTtcblx0XHR9XG5cdH07XG5cblxuXHQvKipcblx0ICogQ2hlY2sgd2hldGhlciB0aGUgZ2l2ZW4gdGFyZ2V0IGVsZW1lbnQgaXMgYSBjaGlsZCBvZiBhIHNjcm9sbGFibGUgbGF5ZXIgYW5kIGlmIHNvLCBzZXQgYSBmbGFnIG9uIGl0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fEVsZW1lbnR9IHRhcmdldEVsZW1lbnRcblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUudXBkYXRlU2Nyb2xsUGFyZW50ID0gZnVuY3Rpb24odGFyZ2V0RWxlbWVudCkge1xuXHRcdHZhciBzY3JvbGxQYXJlbnQsIHBhcmVudEVsZW1lbnQ7XG5cblx0XHRzY3JvbGxQYXJlbnQgPSB0YXJnZXRFbGVtZW50LmZhc3RDbGlja1Njcm9sbFBhcmVudDtcblxuXHRcdC8vIEF0dGVtcHQgdG8gZGlzY292ZXIgd2hldGhlciB0aGUgdGFyZ2V0IGVsZW1lbnQgaXMgY29udGFpbmVkIHdpdGhpbiBhIHNjcm9sbGFibGUgbGF5ZXIuIFJlLWNoZWNrIGlmIHRoZVxuXHRcdC8vIHRhcmdldCBlbGVtZW50IHdhcyBtb3ZlZCB0byBhbm90aGVyIHBhcmVudC5cblx0XHRpZiAoIXNjcm9sbFBhcmVudCB8fCAhc2Nyb2xsUGFyZW50LmNvbnRhaW5zKHRhcmdldEVsZW1lbnQpKSB7XG5cdFx0XHRwYXJlbnRFbGVtZW50ID0gdGFyZ2V0RWxlbWVudDtcblx0XHRcdGRvIHtcblx0XHRcdFx0aWYgKHBhcmVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0ID4gcGFyZW50RWxlbWVudC5vZmZzZXRIZWlnaHQpIHtcblx0XHRcdFx0XHRzY3JvbGxQYXJlbnQgPSBwYXJlbnRFbGVtZW50O1xuXHRcdFx0XHRcdHRhcmdldEVsZW1lbnQuZmFzdENsaWNrU2Nyb2xsUGFyZW50ID0gcGFyZW50RWxlbWVudDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHBhcmVudEVsZW1lbnQgPSBwYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cdFx0XHR9IHdoaWxlIChwYXJlbnRFbGVtZW50KTtcblx0XHR9XG5cblx0XHQvLyBBbHdheXMgdXBkYXRlIHRoZSBzY3JvbGwgdG9wIHRyYWNrZXIgaWYgcG9zc2libGUuXG5cdFx0aWYgKHNjcm9sbFBhcmVudCkge1xuXHRcdFx0c2Nyb2xsUGFyZW50LmZhc3RDbGlja0xhc3RTY3JvbGxUb3AgPSBzY3JvbGxQYXJlbnQuc2Nyb2xsVG9wO1xuXHRcdH1cblx0fTtcblxuXG5cdC8qKlxuXHQgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fSB0YXJnZXRFbGVtZW50XG5cdCAqIEByZXR1cm5zIHtFbGVtZW50fEV2ZW50VGFyZ2V0fVxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5nZXRUYXJnZXRFbGVtZW50RnJvbUV2ZW50VGFyZ2V0ID0gZnVuY3Rpb24oZXZlbnRUYXJnZXQpIHtcblxuXHRcdC8vIE9uIHNvbWUgb2xkZXIgYnJvd3NlcnMgKG5vdGFibHkgU2FmYXJpIG9uIGlPUyA0LjEgLSBzZWUgaXNzdWUgIzU2KSB0aGUgZXZlbnQgdGFyZ2V0IG1heSBiZSBhIHRleHQgbm9kZS5cblx0XHRpZiAoZXZlbnRUYXJnZXQubm9kZVR5cGUgPT09IE5vZGUuVEVYVF9OT0RFKSB7XG5cdFx0XHRyZXR1cm4gZXZlbnRUYXJnZXQucGFyZW50Tm9kZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZXZlbnRUYXJnZXQ7XG5cdH07XG5cblxuXHQvKipcblx0ICogT24gdG91Y2ggc3RhcnQsIHJlY29yZCB0aGUgcG9zaXRpb24gYW5kIHNjcm9sbCBvZmZzZXQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5vblRvdWNoU3RhcnQgPSBmdW5jdGlvbihldmVudCkge1xuXHRcdHZhciB0YXJnZXRFbGVtZW50LCB0b3VjaCwgc2VsZWN0aW9uO1xuXG5cdFx0Ly8gSWdub3JlIG11bHRpcGxlIHRvdWNoZXMsIG90aGVyd2lzZSBwaW5jaC10by16b29tIGlzIHByZXZlbnRlZCBpZiBib3RoIGZpbmdlcnMgYXJlIG9uIHRoZSBGYXN0Q2xpY2sgZWxlbWVudCAoaXNzdWUgIzExMSkuXG5cdFx0aWYgKGV2ZW50LnRhcmdldFRvdWNoZXMubGVuZ3RoID4gMSkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0dGFyZ2V0RWxlbWVudCA9IHRoaXMuZ2V0VGFyZ2V0RWxlbWVudEZyb21FdmVudFRhcmdldChldmVudC50YXJnZXQpO1xuXHRcdHRvdWNoID0gZXZlbnQudGFyZ2V0VG91Y2hlc1swXTtcblxuXHRcdGlmIChkZXZpY2VJc0lPUykge1xuXG5cdFx0XHQvLyBPbmx5IHRydXN0ZWQgZXZlbnRzIHdpbGwgZGVzZWxlY3QgdGV4dCBvbiBpT1MgKGlzc3VlICM0OSlcblx0XHRcdHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcblx0XHRcdGlmIChzZWxlY3Rpb24ucmFuZ2VDb3VudCAmJiAhc2VsZWN0aW9uLmlzQ29sbGFwc2VkKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoIWRldmljZUlzSU9TNCkge1xuXG5cdFx0XHRcdC8vIFdlaXJkIHRoaW5ncyBoYXBwZW4gb24gaU9TIHdoZW4gYW4gYWxlcnQgb3IgY29uZmlybSBkaWFsb2cgaXMgb3BlbmVkIGZyb20gYSBjbGljayBldmVudCBjYWxsYmFjayAoaXNzdWUgIzIzKTpcblx0XHRcdFx0Ly8gd2hlbiB0aGUgdXNlciBuZXh0IHRhcHMgYW55d2hlcmUgZWxzZSBvbiB0aGUgcGFnZSwgbmV3IHRvdWNoc3RhcnQgYW5kIHRvdWNoZW5kIGV2ZW50cyBhcmUgZGlzcGF0Y2hlZFxuXHRcdFx0XHQvLyB3aXRoIHRoZSBzYW1lIGlkZW50aWZpZXIgYXMgdGhlIHRvdWNoIGV2ZW50IHRoYXQgcHJldmlvdXNseSB0cmlnZ2VyZWQgdGhlIGNsaWNrIHRoYXQgdHJpZ2dlcmVkIHRoZSBhbGVydC5cblx0XHRcdFx0Ly8gU2FkbHksIHRoZXJlIGlzIGFuIGlzc3VlIG9uIGlPUyA0IHRoYXQgY2F1c2VzIHNvbWUgbm9ybWFsIHRvdWNoIGV2ZW50cyB0byBoYXZlIHRoZSBzYW1lIGlkZW50aWZpZXIgYXMgYW5cblx0XHRcdFx0Ly8gaW1tZWRpYXRlbHkgcHJlY2VlZGluZyB0b3VjaCBldmVudCAoaXNzdWUgIzUyKSwgc28gdGhpcyBmaXggaXMgdW5hdmFpbGFibGUgb24gdGhhdCBwbGF0Zm9ybS5cblx0XHRcdFx0Ly8gSXNzdWUgMTIwOiB0b3VjaC5pZGVudGlmaWVyIGlzIDAgd2hlbiBDaHJvbWUgZGV2IHRvb2xzICdFbXVsYXRlIHRvdWNoIGV2ZW50cycgaXMgc2V0IHdpdGggYW4gaU9TIGRldmljZSBVQSBzdHJpbmcsXG5cdFx0XHRcdC8vIHdoaWNoIGNhdXNlcyBhbGwgdG91Y2ggZXZlbnRzIHRvIGJlIGlnbm9yZWQuIEFzIHRoaXMgYmxvY2sgb25seSBhcHBsaWVzIHRvIGlPUywgYW5kIGlPUyBpZGVudGlmaWVycyBhcmUgYWx3YXlzIGxvbmcsXG5cdFx0XHRcdC8vIHJhbmRvbSBpbnRlZ2VycywgaXQncyBzYWZlIHRvIHRvIGNvbnRpbnVlIGlmIHRoZSBpZGVudGlmaWVyIGlzIDAgaGVyZS5cblx0XHRcdFx0aWYgKHRvdWNoLmlkZW50aWZpZXIgJiYgdG91Y2guaWRlbnRpZmllciA9PT0gdGhpcy5sYXN0VG91Y2hJZGVudGlmaWVyKSB7XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLmxhc3RUb3VjaElkZW50aWZpZXIgPSB0b3VjaC5pZGVudGlmaWVyO1xuXG5cdFx0XHRcdC8vIElmIHRoZSB0YXJnZXQgZWxlbWVudCBpcyBhIGNoaWxkIG9mIGEgc2Nyb2xsYWJsZSBsYXllciAodXNpbmcgLXdlYmtpdC1vdmVyZmxvdy1zY3JvbGxpbmc6IHRvdWNoKSBhbmQ6XG5cdFx0XHRcdC8vIDEpIHRoZSB1c2VyIGRvZXMgYSBmbGluZyBzY3JvbGwgb24gdGhlIHNjcm9sbGFibGUgbGF5ZXJcblx0XHRcdFx0Ly8gMikgdGhlIHVzZXIgc3RvcHMgdGhlIGZsaW5nIHNjcm9sbCB3aXRoIGFub3RoZXIgdGFwXG5cdFx0XHRcdC8vIHRoZW4gdGhlIGV2ZW50LnRhcmdldCBvZiB0aGUgbGFzdCAndG91Y2hlbmQnIGV2ZW50IHdpbGwgYmUgdGhlIGVsZW1lbnQgdGhhdCB3YXMgdW5kZXIgdGhlIHVzZXIncyBmaW5nZXJcblx0XHRcdFx0Ly8gd2hlbiB0aGUgZmxpbmcgc2Nyb2xsIHdhcyBzdGFydGVkLCBjYXVzaW5nIEZhc3RDbGljayB0byBzZW5kIGEgY2xpY2sgZXZlbnQgdG8gdGhhdCBsYXllciAtIHVubGVzcyBhIGNoZWNrXG5cdFx0XHRcdC8vIGlzIG1hZGUgdG8gZW5zdXJlIHRoYXQgYSBwYXJlbnQgbGF5ZXIgd2FzIG5vdCBzY3JvbGxlZCBiZWZvcmUgc2VuZGluZyBhIHN5bnRoZXRpYyBjbGljayAoaXNzdWUgIzQyKS5cblx0XHRcdFx0dGhpcy51cGRhdGVTY3JvbGxQYXJlbnQodGFyZ2V0RWxlbWVudCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0dGhpcy50cmFja2luZ0NsaWNrID0gdHJ1ZTtcblx0XHR0aGlzLnRyYWNraW5nQ2xpY2tTdGFydCA9IGV2ZW50LnRpbWVTdGFtcDtcblx0XHR0aGlzLnRhcmdldEVsZW1lbnQgPSB0YXJnZXRFbGVtZW50O1xuXG5cdFx0dGhpcy50b3VjaFN0YXJ0WCA9IHRvdWNoLnBhZ2VYO1xuXHRcdHRoaXMudG91Y2hTdGFydFkgPSB0b3VjaC5wYWdlWTtcblxuXHRcdC8vIFByZXZlbnQgcGhhbnRvbSBjbGlja3Mgb24gZmFzdCBkb3VibGUtdGFwIChpc3N1ZSAjMzYpXG5cdFx0aWYgKChldmVudC50aW1lU3RhbXAgLSB0aGlzLmxhc3RDbGlja1RpbWUpIDwgdGhpcy50YXBEZWxheSkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBCYXNlZCBvbiBhIHRvdWNobW92ZSBldmVudCBvYmplY3QsIGNoZWNrIHdoZXRoZXIgdGhlIHRvdWNoIGhhcyBtb3ZlZCBwYXN0IGEgYm91bmRhcnkgc2luY2UgaXQgc3RhcnRlZC5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnRcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLnRvdWNoSGFzTW92ZWQgPSBmdW5jdGlvbihldmVudCkge1xuXHRcdHZhciB0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLCBib3VuZGFyeSA9IHRoaXMudG91Y2hCb3VuZGFyeTtcblxuXHRcdGlmIChNYXRoLmFicyh0b3VjaC5wYWdlWCAtIHRoaXMudG91Y2hTdGFydFgpID4gYm91bmRhcnkgfHwgTWF0aC5hYnModG91Y2gucGFnZVkgLSB0aGlzLnRvdWNoU3RhcnRZKSA+IGJvdW5kYXJ5KSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblxuXHQvKipcblx0ICogVXBkYXRlIHRoZSBsYXN0IHBvc2l0aW9uLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUub25Ub3VjaE1vdmUgPSBmdW5jdGlvbihldmVudCkge1xuXHRcdGlmICghdGhpcy50cmFja2luZ0NsaWNrKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBJZiB0aGUgdG91Y2ggaGFzIG1vdmVkLCBjYW5jZWwgdGhlIGNsaWNrIHRyYWNraW5nXG5cdFx0aWYgKHRoaXMudGFyZ2V0RWxlbWVudCAhPT0gdGhpcy5nZXRUYXJnZXRFbGVtZW50RnJvbUV2ZW50VGFyZ2V0KGV2ZW50LnRhcmdldCkgfHwgdGhpcy50b3VjaEhhc01vdmVkKGV2ZW50KSkge1xuXHRcdFx0dGhpcy50cmFja2luZ0NsaWNrID0gZmFsc2U7XG5cdFx0XHR0aGlzLnRhcmdldEVsZW1lbnQgPSBudWxsO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIEF0dGVtcHQgdG8gZmluZCB0aGUgbGFiZWxsZWQgY29udHJvbCBmb3IgdGhlIGdpdmVuIGxhYmVsIGVsZW1lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnRUYXJnZXR8SFRNTExhYmVsRWxlbWVudH0gbGFiZWxFbGVtZW50XG5cdCAqIEByZXR1cm5zIHtFbGVtZW50fG51bGx9XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLmZpbmRDb250cm9sID0gZnVuY3Rpb24obGFiZWxFbGVtZW50KSB7XG5cblx0XHQvLyBGYXN0IHBhdGggZm9yIG5ld2VyIGJyb3dzZXJzIHN1cHBvcnRpbmcgdGhlIEhUTUw1IGNvbnRyb2wgYXR0cmlidXRlXG5cdFx0aWYgKGxhYmVsRWxlbWVudC5jb250cm9sICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiBsYWJlbEVsZW1lbnQuY29udHJvbDtcblx0XHR9XG5cblx0XHQvLyBBbGwgYnJvd3NlcnMgdW5kZXIgdGVzdCB0aGF0IHN1cHBvcnQgdG91Y2ggZXZlbnRzIGFsc28gc3VwcG9ydCB0aGUgSFRNTDUgaHRtbEZvciBhdHRyaWJ1dGVcblx0XHRpZiAobGFiZWxFbGVtZW50Lmh0bWxGb3IpIHtcblx0XHRcdHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChsYWJlbEVsZW1lbnQuaHRtbEZvcik7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgbm8gZm9yIGF0dHJpYnV0ZSBleGlzdHMsIGF0dGVtcHQgdG8gcmV0cmlldmUgdGhlIGZpcnN0IGxhYmVsbGFibGUgZGVzY2VuZGFudCBlbGVtZW50XG5cdFx0Ly8gdGhlIGxpc3Qgb2Ygd2hpY2ggaXMgZGVmaW5lZCBoZXJlOiBodHRwOi8vd3d3LnczLm9yZy9UUi9odG1sNS9mb3Jtcy5odG1sI2NhdGVnb3J5LWxhYmVsXG5cdFx0cmV0dXJuIGxhYmVsRWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b24sIGlucHV0Om5vdChbdHlwZT1oaWRkZW5dKSwga2V5Z2VuLCBtZXRlciwgb3V0cHV0LCBwcm9ncmVzcywgc2VsZWN0LCB0ZXh0YXJlYScpO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIE9uIHRvdWNoIGVuZCwgZGV0ZXJtaW5lIHdoZXRoZXIgdG8gc2VuZCBhIGNsaWNrIGV2ZW50IGF0IG9uY2UuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5vblRvdWNoRW5kID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0XHR2YXIgZm9yRWxlbWVudCwgdHJhY2tpbmdDbGlja1N0YXJ0LCB0YXJnZXRUYWdOYW1lLCBzY3JvbGxQYXJlbnQsIHRvdWNoLCB0YXJnZXRFbGVtZW50ID0gdGhpcy50YXJnZXRFbGVtZW50O1xuXG5cdFx0aWYgKCF0aGlzLnRyYWNraW5nQ2xpY2spIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIFByZXZlbnQgcGhhbnRvbSBjbGlja3Mgb24gZmFzdCBkb3VibGUtdGFwIChpc3N1ZSAjMzYpXG5cdFx0aWYgKChldmVudC50aW1lU3RhbXAgLSB0aGlzLmxhc3RDbGlja1RpbWUpIDwgdGhpcy50YXBEZWxheSkge1xuXHRcdFx0dGhpcy5jYW5jZWxOZXh0Q2xpY2sgPSB0cnVlO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKChldmVudC50aW1lU3RhbXAgLSB0aGlzLnRyYWNraW5nQ2xpY2tTdGFydCkgPiB0aGlzLnRhcFRpbWVvdXQpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIFJlc2V0IHRvIHByZXZlbnQgd3JvbmcgY2xpY2sgY2FuY2VsIG9uIGlucHV0IChpc3N1ZSAjMTU2KS5cblx0XHR0aGlzLmNhbmNlbE5leHRDbGljayA9IGZhbHNlO1xuXG5cdFx0dGhpcy5sYXN0Q2xpY2tUaW1lID0gZXZlbnQudGltZVN0YW1wO1xuXG5cdFx0dHJhY2tpbmdDbGlja1N0YXJ0ID0gdGhpcy50cmFja2luZ0NsaWNrU3RhcnQ7XG5cdFx0dGhpcy50cmFja2luZ0NsaWNrID0gZmFsc2U7XG5cdFx0dGhpcy50cmFja2luZ0NsaWNrU3RhcnQgPSAwO1xuXG5cdFx0Ly8gT24gc29tZSBpT1MgZGV2aWNlcywgdGhlIHRhcmdldEVsZW1lbnQgc3VwcGxpZWQgd2l0aCB0aGUgZXZlbnQgaXMgaW52YWxpZCBpZiB0aGUgbGF5ZXJcblx0XHQvLyBpcyBwZXJmb3JtaW5nIGEgdHJhbnNpdGlvbiBvciBzY3JvbGwsIGFuZCBoYXMgdG8gYmUgcmUtZGV0ZWN0ZWQgbWFudWFsbHkuIE5vdGUgdGhhdFxuXHRcdC8vIGZvciB0aGlzIHRvIGZ1bmN0aW9uIGNvcnJlY3RseSwgaXQgbXVzdCBiZSBjYWxsZWQgKmFmdGVyKiB0aGUgZXZlbnQgdGFyZ2V0IGlzIGNoZWNrZWQhXG5cdFx0Ly8gU2VlIGlzc3VlICM1NzsgYWxzbyBmaWxlZCBhcyByZGFyOi8vMTMwNDg1ODkgLlxuXHRcdGlmIChkZXZpY2VJc0lPU1dpdGhCYWRUYXJnZXQpIHtcblx0XHRcdHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG5cblx0XHRcdC8vIEluIGNlcnRhaW4gY2FzZXMgYXJndW1lbnRzIG9mIGVsZW1lbnRGcm9tUG9pbnQgY2FuIGJlIG5lZ2F0aXZlLCBzbyBwcmV2ZW50IHNldHRpbmcgdGFyZ2V0RWxlbWVudCB0byBudWxsXG5cdFx0XHR0YXJnZXRFbGVtZW50ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludCh0b3VjaC5wYWdlWCAtIHdpbmRvdy5wYWdlWE9mZnNldCwgdG91Y2gucGFnZVkgLSB3aW5kb3cucGFnZVlPZmZzZXQpIHx8IHRhcmdldEVsZW1lbnQ7XG5cdFx0XHR0YXJnZXRFbGVtZW50LmZhc3RDbGlja1Njcm9sbFBhcmVudCA9IHRoaXMudGFyZ2V0RWxlbWVudC5mYXN0Q2xpY2tTY3JvbGxQYXJlbnQ7XG5cdFx0fVxuXG5cdFx0dGFyZ2V0VGFnTmFtZSA9IHRhcmdldEVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdGlmICh0YXJnZXRUYWdOYW1lID09PSAnbGFiZWwnKSB7XG5cdFx0XHRmb3JFbGVtZW50ID0gdGhpcy5maW5kQ29udHJvbCh0YXJnZXRFbGVtZW50KTtcblx0XHRcdGlmIChmb3JFbGVtZW50KSB7XG5cdFx0XHRcdHRoaXMuZm9jdXModGFyZ2V0RWxlbWVudCk7XG5cdFx0XHRcdGlmIChkZXZpY2VJc0FuZHJvaWQpIHtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0YXJnZXRFbGVtZW50ID0gZm9yRWxlbWVudDtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKHRoaXMubmVlZHNGb2N1cyh0YXJnZXRFbGVtZW50KSkge1xuXG5cdFx0XHQvLyBDYXNlIDE6IElmIHRoZSB0b3VjaCBzdGFydGVkIGEgd2hpbGUgYWdvIChiZXN0IGd1ZXNzIGlzIDEwMG1zIGJhc2VkIG9uIHRlc3RzIGZvciBpc3N1ZSAjMzYpIHRoZW4gZm9jdXMgd2lsbCBiZSB0cmlnZ2VyZWQgYW55d2F5LiBSZXR1cm4gZWFybHkgYW5kIHVuc2V0IHRoZSB0YXJnZXQgZWxlbWVudCByZWZlcmVuY2Ugc28gdGhhdCB0aGUgc3Vic2VxdWVudCBjbGljayB3aWxsIGJlIGFsbG93ZWQgdGhyb3VnaC5cblx0XHRcdC8vIENhc2UgMjogV2l0aG91dCB0aGlzIGV4Y2VwdGlvbiBmb3IgaW5wdXQgZWxlbWVudHMgdGFwcGVkIHdoZW4gdGhlIGRvY3VtZW50IGlzIGNvbnRhaW5lZCBpbiBhbiBpZnJhbWUsIHRoZW4gYW55IGlucHV0dGVkIHRleHQgd29uJ3QgYmUgdmlzaWJsZSBldmVuIHRob3VnaCB0aGUgdmFsdWUgYXR0cmlidXRlIGlzIHVwZGF0ZWQgYXMgdGhlIHVzZXIgdHlwZXMgKGlzc3VlICMzNykuXG5cdFx0XHRpZiAoKGV2ZW50LnRpbWVTdGFtcCAtIHRyYWNraW5nQ2xpY2tTdGFydCkgPiAxMDAgfHwgKGRldmljZUlzSU9TICYmIHdpbmRvdy50b3AgIT09IHdpbmRvdyAmJiB0YXJnZXRUYWdOYW1lID09PSAnaW5wdXQnKSkge1xuXHRcdFx0XHR0aGlzLnRhcmdldEVsZW1lbnQgPSBudWxsO1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuZm9jdXModGFyZ2V0RWxlbWVudCk7XG5cdFx0XHR0aGlzLnNlbmRDbGljayh0YXJnZXRFbGVtZW50LCBldmVudCk7XG5cblx0XHRcdC8vIFNlbGVjdCBlbGVtZW50cyBuZWVkIHRoZSBldmVudCB0byBnbyB0aHJvdWdoIG9uIGlPUyA0LCBvdGhlcndpc2UgdGhlIHNlbGVjdG9yIG1lbnUgd29uJ3Qgb3Blbi5cblx0XHRcdC8vIEFsc28gdGhpcyBicmVha3Mgb3BlbmluZyBzZWxlY3RzIHdoZW4gVm9pY2VPdmVyIGlzIGFjdGl2ZSBvbiBpT1M2LCBpT1M3IChhbmQgcG9zc2libHkgb3RoZXJzKVxuXHRcdFx0aWYgKCFkZXZpY2VJc0lPUyB8fCB0YXJnZXRUYWdOYW1lICE9PSAnc2VsZWN0Jykge1xuXHRcdFx0XHR0aGlzLnRhcmdldEVsZW1lbnQgPSBudWxsO1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKGRldmljZUlzSU9TICYmICFkZXZpY2VJc0lPUzQpIHtcblxuXHRcdFx0Ly8gRG9uJ3Qgc2VuZCBhIHN5bnRoZXRpYyBjbGljayBldmVudCBpZiB0aGUgdGFyZ2V0IGVsZW1lbnQgaXMgY29udGFpbmVkIHdpdGhpbiBhIHBhcmVudCBsYXllciB0aGF0IHdhcyBzY3JvbGxlZFxuXHRcdFx0Ly8gYW5kIHRoaXMgdGFwIGlzIGJlaW5nIHVzZWQgdG8gc3RvcCB0aGUgc2Nyb2xsaW5nICh1c3VhbGx5IGluaXRpYXRlZCBieSBhIGZsaW5nIC0gaXNzdWUgIzQyKS5cblx0XHRcdHNjcm9sbFBhcmVudCA9IHRhcmdldEVsZW1lbnQuZmFzdENsaWNrU2Nyb2xsUGFyZW50O1xuXHRcdFx0aWYgKHNjcm9sbFBhcmVudCAmJiBzY3JvbGxQYXJlbnQuZmFzdENsaWNrTGFzdFNjcm9sbFRvcCAhPT0gc2Nyb2xsUGFyZW50LnNjcm9sbFRvcCkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBQcmV2ZW50IHRoZSBhY3R1YWwgY2xpY2sgZnJvbSBnb2luZyB0aG91Z2ggLSB1bmxlc3MgdGhlIHRhcmdldCBub2RlIGlzIG1hcmtlZCBhcyByZXF1aXJpbmdcblx0XHQvLyByZWFsIGNsaWNrcyBvciBpZiBpdCBpcyBpbiB0aGUgd2hpdGVsaXN0IGluIHdoaWNoIGNhc2Ugb25seSBub24tcHJvZ3JhbW1hdGljIGNsaWNrcyBhcmUgcGVybWl0dGVkLlxuXHRcdGlmICghdGhpcy5uZWVkc0NsaWNrKHRhcmdldEVsZW1lbnQpKSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0dGhpcy5zZW5kQ2xpY2sodGFyZ2V0RWxlbWVudCwgZXZlbnQpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBPbiB0b3VjaCBjYW5jZWwsIHN0b3AgdHJhY2tpbmcgdGhlIGNsaWNrLlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUub25Ub3VjaENhbmNlbCA9IGZ1bmN0aW9uKCkge1xuXHRcdHRoaXMudHJhY2tpbmdDbGljayA9IGZhbHNlO1xuXHRcdHRoaXMudGFyZ2V0RWxlbWVudCA9IG51bGw7XG5cdH07XG5cblxuXHQvKipcblx0ICogRGV0ZXJtaW5lIG1vdXNlIGV2ZW50cyB3aGljaCBzaG91bGQgYmUgcGVybWl0dGVkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUub25Nb3VzZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cblx0XHQvLyBJZiBhIHRhcmdldCBlbGVtZW50IHdhcyBuZXZlciBzZXQgKGJlY2F1c2UgYSB0b3VjaCBldmVudCB3YXMgbmV2ZXIgZmlyZWQpIGFsbG93IHRoZSBldmVudFxuXHRcdGlmICghdGhpcy50YXJnZXRFbGVtZW50KSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAoZXZlbnQuZm9yd2FyZGVkVG91Y2hFdmVudCkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gUHJvZ3JhbW1hdGljYWxseSBnZW5lcmF0ZWQgZXZlbnRzIHRhcmdldGluZyBhIHNwZWNpZmljIGVsZW1lbnQgc2hvdWxkIGJlIHBlcm1pdHRlZFxuXHRcdGlmICghZXZlbnQuY2FuY2VsYWJsZSkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gRGVyaXZlIGFuZCBjaGVjayB0aGUgdGFyZ2V0IGVsZW1lbnQgdG8gc2VlIHdoZXRoZXIgdGhlIG1vdXNlIGV2ZW50IG5lZWRzIHRvIGJlIHBlcm1pdHRlZDtcblx0XHQvLyB1bmxlc3MgZXhwbGljaXRseSBlbmFibGVkLCBwcmV2ZW50IG5vbi10b3VjaCBjbGljayBldmVudHMgZnJvbSB0cmlnZ2VyaW5nIGFjdGlvbnMsXG5cdFx0Ly8gdG8gcHJldmVudCBnaG9zdC9kb3VibGVjbGlja3MuXG5cdFx0aWYgKCF0aGlzLm5lZWRzQ2xpY2sodGhpcy50YXJnZXRFbGVtZW50KSB8fCB0aGlzLmNhbmNlbE5leHRDbGljaykge1xuXG5cdFx0XHQvLyBQcmV2ZW50IGFueSB1c2VyLWFkZGVkIGxpc3RlbmVycyBkZWNsYXJlZCBvbiBGYXN0Q2xpY2sgZWxlbWVudCBmcm9tIGJlaW5nIGZpcmVkLlxuXHRcdFx0aWYgKGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbikge1xuXHRcdFx0XHRldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0Ly8gUGFydCBvZiB0aGUgaGFjayBmb3IgYnJvd3NlcnMgdGhhdCBkb24ndCBzdXBwb3J0IEV2ZW50I3N0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiAoZS5nLiBBbmRyb2lkIDIpXG5cdFx0XHRcdGV2ZW50LnByb3BhZ2F0aW9uU3RvcHBlZCA9IHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdC8vIENhbmNlbCB0aGUgZXZlbnRcblx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIElmIHRoZSBtb3VzZSBldmVudCBpcyBwZXJtaXR0ZWQsIHJldHVybiB0cnVlIGZvciB0aGUgYWN0aW9uIHRvIGdvIHRocm91Z2guXG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG5cblxuXHQvKipcblx0ICogT24gYWN0dWFsIGNsaWNrcywgZGV0ZXJtaW5lIHdoZXRoZXIgdGhpcyBpcyBhIHRvdWNoLWdlbmVyYXRlZCBjbGljaywgYSBjbGljayBhY3Rpb24gb2NjdXJyaW5nXG5cdCAqIG5hdHVyYWxseSBhZnRlciBhIGRlbGF5IGFmdGVyIGEgdG91Y2ggKHdoaWNoIG5lZWRzIHRvIGJlIGNhbmNlbGxlZCB0byBhdm9pZCBkdXBsaWNhdGlvbiksIG9yXG5cdCAqIGFuIGFjdHVhbCBjbGljayB3aGljaCBzaG91bGQgYmUgcGVybWl0dGVkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUub25DbGljayA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0dmFyIHBlcm1pdHRlZDtcblxuXHRcdC8vIEl0J3MgcG9zc2libGUgZm9yIGFub3RoZXIgRmFzdENsaWNrLWxpa2UgbGlicmFyeSBkZWxpdmVyZWQgd2l0aCB0aGlyZC1wYXJ0eSBjb2RlIHRvIGZpcmUgYSBjbGljayBldmVudCBiZWZvcmUgRmFzdENsaWNrIGRvZXMgKGlzc3VlICM0NCkuIEluIHRoYXQgY2FzZSwgc2V0IHRoZSBjbGljay10cmFja2luZyBmbGFnIGJhY2sgdG8gZmFsc2UgYW5kIHJldHVybiBlYXJseS4gVGhpcyB3aWxsIGNhdXNlIG9uVG91Y2hFbmQgdG8gcmV0dXJuIGVhcmx5LlxuXHRcdGlmICh0aGlzLnRyYWNraW5nQ2xpY2spIHtcblx0XHRcdHRoaXMudGFyZ2V0RWxlbWVudCA9IG51bGw7XG5cdFx0XHR0aGlzLnRyYWNraW5nQ2xpY2sgPSBmYWxzZTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIFZlcnkgb2RkIGJlaGF2aW91ciBvbiBpT1MgKGlzc3VlICMxOCk6IGlmIGEgc3VibWl0IGVsZW1lbnQgaXMgcHJlc2VudCBpbnNpZGUgYSBmb3JtIGFuZCB0aGUgdXNlciBoaXRzIGVudGVyIGluIHRoZSBpT1Mgc2ltdWxhdG9yIG9yIGNsaWNrcyB0aGUgR28gYnV0dG9uIG9uIHRoZSBwb3AtdXAgT1Mga2V5Ym9hcmQgdGhlIGEga2luZCBvZiAnZmFrZScgY2xpY2sgZXZlbnQgd2lsbCBiZSB0cmlnZ2VyZWQgd2l0aCB0aGUgc3VibWl0LXR5cGUgaW5wdXQgZWxlbWVudCBhcyB0aGUgdGFyZ2V0LlxuXHRcdGlmIChldmVudC50YXJnZXQudHlwZSA9PT0gJ3N1Ym1pdCcgJiYgZXZlbnQuZGV0YWlsID09PSAwKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRwZXJtaXR0ZWQgPSB0aGlzLm9uTW91c2UoZXZlbnQpO1xuXG5cdFx0Ly8gT25seSB1bnNldCB0YXJnZXRFbGVtZW50IGlmIHRoZSBjbGljayBpcyBub3QgcGVybWl0dGVkLiBUaGlzIHdpbGwgZW5zdXJlIHRoYXQgdGhlIGNoZWNrIGZvciAhdGFyZ2V0RWxlbWVudCBpbiBvbk1vdXNlIGZhaWxzIGFuZCB0aGUgYnJvd3NlcidzIGNsaWNrIGRvZXNuJ3QgZ28gdGhyb3VnaC5cblx0XHRpZiAoIXBlcm1pdHRlZCkge1xuXHRcdFx0dGhpcy50YXJnZXRFbGVtZW50ID0gbnVsbDtcblx0XHR9XG5cblx0XHQvLyBJZiBjbGlja3MgYXJlIHBlcm1pdHRlZCwgcmV0dXJuIHRydWUgZm9yIHRoZSBhY3Rpb24gdG8gZ28gdGhyb3VnaC5cblx0XHRyZXR1cm4gcGVybWl0dGVkO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIFJlbW92ZSBhbGwgRmFzdENsaWNrJ3MgZXZlbnQgbGlzdGVuZXJzLlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7dm9pZH1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBsYXllciA9IHRoaXMubGF5ZXI7XG5cblx0XHRpZiAoZGV2aWNlSXNBbmRyb2lkKSB7XG5cdFx0XHRsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCB0aGlzLm9uTW91c2UsIHRydWUpO1xuXHRcdFx0bGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlLCB0cnVlKTtcblx0XHRcdGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uTW91c2UsIHRydWUpO1xuXHRcdH1cblxuXHRcdGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNsaWNrLCB0cnVlKTtcblx0XHRsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5vblRvdWNoU3RhcnQsIGZhbHNlKTtcblx0XHRsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm9uVG91Y2hNb3ZlLCBmYWxzZSk7XG5cdFx0bGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLm9uVG91Y2hFbmQsIGZhbHNlKTtcblx0XHRsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMub25Ub3VjaENhbmNlbCwgZmFsc2UpO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIENoZWNrIHdoZXRoZXIgRmFzdENsaWNrIGlzIG5lZWRlZC5cblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBsYXllciBUaGUgbGF5ZXIgdG8gbGlzdGVuIG9uXG5cdCAqL1xuXHRGYXN0Q2xpY2subm90TmVlZGVkID0gZnVuY3Rpb24obGF5ZXIpIHtcblx0XHR2YXIgbWV0YVZpZXdwb3J0O1xuXHRcdHZhciBjaHJvbWVWZXJzaW9uO1xuXHRcdHZhciBibGFja2JlcnJ5VmVyc2lvbjtcblx0XHR2YXIgZmlyZWZveFZlcnNpb247XG5cblx0XHQvLyBEZXZpY2VzIHRoYXQgZG9uJ3Qgc3VwcG9ydCB0b3VjaCBkb24ndCBuZWVkIEZhc3RDbGlja1xuXHRcdGlmICh0eXBlb2Ygd2luZG93Lm9udG91Y2hzdGFydCA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIENocm9tZSB2ZXJzaW9uIC0gemVybyBmb3Igb3RoZXIgYnJvd3NlcnNcblx0XHRjaHJvbWVWZXJzaW9uID0gKygvQ2hyb21lXFwvKFswLTldKykvLmV4ZWMobmF2aWdhdG9yLnVzZXJBZ2VudCkgfHwgWywwXSlbMV07XG5cblx0XHRpZiAoY2hyb21lVmVyc2lvbikge1xuXG5cdFx0XHRpZiAoZGV2aWNlSXNBbmRyb2lkKSB7XG5cdFx0XHRcdG1ldGFWaWV3cG9ydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT12aWV3cG9ydF0nKTtcblxuXHRcdFx0XHRpZiAobWV0YVZpZXdwb3J0KSB7XG5cdFx0XHRcdFx0Ly8gQ2hyb21lIG9uIEFuZHJvaWQgd2l0aCB1c2VyLXNjYWxhYmxlPVwibm9cIiBkb2Vzbid0IG5lZWQgRmFzdENsaWNrIChpc3N1ZSAjODkpXG5cdFx0XHRcdFx0aWYgKG1ldGFWaWV3cG9ydC5jb250ZW50LmluZGV4T2YoJ3VzZXItc2NhbGFibGU9bm8nKSAhPT0gLTEpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBDaHJvbWUgMzIgYW5kIGFib3ZlIHdpdGggd2lkdGg9ZGV2aWNlLXdpZHRoIG9yIGxlc3MgZG9uJ3QgbmVlZCBGYXN0Q2xpY2tcblx0XHRcdFx0XHRpZiAoY2hyb21lVmVyc2lvbiA+IDMxICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxXaWR0aCA8PSB3aW5kb3cub3V0ZXJXaWR0aCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdC8vIENocm9tZSBkZXNrdG9wIGRvZXNuJ3QgbmVlZCBGYXN0Q2xpY2sgKGlzc3VlICMxNSlcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChkZXZpY2VJc0JsYWNrQmVycnkxMCkge1xuXHRcdFx0YmxhY2tiZXJyeVZlcnNpb24gPSBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9WZXJzaW9uXFwvKFswLTldKilcXC4oWzAtOV0qKS8pO1xuXG5cdFx0XHQvLyBCbGFja0JlcnJ5IDEwLjMrIGRvZXMgbm90IHJlcXVpcmUgRmFzdGNsaWNrIGxpYnJhcnkuXG5cdFx0XHQvLyBodHRwczovL2dpdGh1Yi5jb20vZnRsYWJzL2Zhc3RjbGljay9pc3N1ZXMvMjUxXG5cdFx0XHRpZiAoYmxhY2tiZXJyeVZlcnNpb25bMV0gPj0gMTAgJiYgYmxhY2tiZXJyeVZlcnNpb25bMl0gPj0gMykge1xuXHRcdFx0XHRtZXRhVmlld3BvcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9dmlld3BvcnRdJyk7XG5cblx0XHRcdFx0aWYgKG1ldGFWaWV3cG9ydCkge1xuXHRcdFx0XHRcdC8vIHVzZXItc2NhbGFibGU9bm8gZWxpbWluYXRlcyBjbGljayBkZWxheS5cblx0XHRcdFx0XHRpZiAobWV0YVZpZXdwb3J0LmNvbnRlbnQuaW5kZXhPZigndXNlci1zY2FsYWJsZT1ubycpICE9PSAtMSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIHdpZHRoPWRldmljZS13aWR0aCAob3IgbGVzcyB0aGFuIGRldmljZS13aWR0aCkgZWxpbWluYXRlcyBjbGljayBkZWxheS5cblx0XHRcdFx0XHRpZiAoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFdpZHRoIDw9IHdpbmRvdy5vdXRlcldpZHRoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBJRTEwIHdpdGggLW1zLXRvdWNoLWFjdGlvbjogbm9uZSBvciBtYW5pcHVsYXRpb24sIHdoaWNoIGRpc2FibGVzIGRvdWJsZS10YXAtdG8tem9vbSAoaXNzdWUgIzk3KVxuXHRcdGlmIChsYXllci5zdHlsZS5tc1RvdWNoQWN0aW9uID09PSAnbm9uZScgfHwgbGF5ZXIuc3R5bGUudG91Y2hBY3Rpb24gPT09ICdtYW5pcHVsYXRpb24nKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBGaXJlZm94IHZlcnNpb24gLSB6ZXJvIGZvciBvdGhlciBicm93c2Vyc1xuXHRcdGZpcmVmb3hWZXJzaW9uID0gKygvRmlyZWZveFxcLyhbMC05XSspLy5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQpIHx8IFssMF0pWzFdO1xuXG5cdFx0aWYgKGZpcmVmb3hWZXJzaW9uID49IDI3KSB7XG5cdFx0XHQvLyBGaXJlZm94IDI3KyBkb2VzIG5vdCBoYXZlIHRhcCBkZWxheSBpZiB0aGUgY29udGVudCBpcyBub3Qgem9vbWFibGUgLSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD05MjI4OTZcblxuXHRcdFx0bWV0YVZpZXdwb3J0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPXZpZXdwb3J0XScpO1xuXHRcdFx0aWYgKG1ldGFWaWV3cG9ydCAmJiAobWV0YVZpZXdwb3J0LmNvbnRlbnQuaW5kZXhPZigndXNlci1zY2FsYWJsZT1ubycpICE9PSAtMSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsV2lkdGggPD0gd2luZG93Lm91dGVyV2lkdGgpKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIElFMTE6IHByZWZpeGVkIC1tcy10b3VjaC1hY3Rpb24gaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCBhbmQgaXQncyByZWNvbWVuZGVkIHRvIHVzZSBub24tcHJlZml4ZWQgdmVyc2lvblxuXHRcdC8vIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS93aW5kb3dzL2FwcHMvSGg3NjczMTMuYXNweFxuXHRcdGlmIChsYXllci5zdHlsZS50b3VjaEFjdGlvbiA9PT0gJ25vbmUnIHx8IGxheWVyLnN0eWxlLnRvdWNoQWN0aW9uID09PSAnbWFuaXB1bGF0aW9uJykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIEZhY3RvcnkgbWV0aG9kIGZvciBjcmVhdGluZyBhIEZhc3RDbGljayBvYmplY3Rcblx0ICpcblx0ICogQHBhcmFtIHtFbGVtZW50fSBsYXllciBUaGUgbGF5ZXIgdG8gbGlzdGVuIG9uXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHRzXG5cdCAqL1xuXHRGYXN0Q2xpY2suYXR0YWNoID0gZnVuY3Rpb24obGF5ZXIsIG9wdGlvbnMpIHtcblx0XHRyZXR1cm4gbmV3IEZhc3RDbGljayhsYXllciwgb3B0aW9ucyk7XG5cdH07XG5cblxuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXG5cdFx0Ly8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuXHRcdGRlZmluZShmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBGYXN0Q2xpY2s7XG5cdFx0fSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IEZhc3RDbGljay5hdHRhY2g7XG5cdFx0bW9kdWxlLmV4cG9ydHMuRmFzdENsaWNrID0gRmFzdENsaWNrO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5GYXN0Q2xpY2sgPSBGYXN0Q2xpY2s7XG5cdH1cbn0oKSk7XG4iLCJ2YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJ2lzLWZ1bmN0aW9uJylcblxubW9kdWxlLmV4cG9ydHMgPSBmb3JFYWNoXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHlcblxuZnVuY3Rpb24gZm9yRWFjaChsaXN0LCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIGlmICghaXNGdW5jdGlvbihpdGVyYXRvcikpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignaXRlcmF0b3IgbXVzdCBiZSBhIGZ1bmN0aW9uJylcbiAgICB9XG5cbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgY29udGV4dCA9IHRoaXNcbiAgICB9XG4gICAgXG4gICAgaWYgKHRvU3RyaW5nLmNhbGwobGlzdCkgPT09ICdbb2JqZWN0IEFycmF5XScpXG4gICAgICAgIGZvckVhY2hBcnJheShsaXN0LCBpdGVyYXRvciwgY29udGV4dClcbiAgICBlbHNlIGlmICh0eXBlb2YgbGlzdCA9PT0gJ3N0cmluZycpXG4gICAgICAgIGZvckVhY2hTdHJpbmcobGlzdCwgaXRlcmF0b3IsIGNvbnRleHQpXG4gICAgZWxzZVxuICAgICAgICBmb3JFYWNoT2JqZWN0KGxpc3QsIGl0ZXJhdG9yLCBjb250ZXh0KVxufVxuXG5mdW5jdGlvbiBmb3JFYWNoQXJyYXkoYXJyYXksIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGFycmF5LCBpKSkge1xuICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBhcnJheVtpXSwgaSwgYXJyYXkpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZvckVhY2hTdHJpbmcoc3RyaW5nLCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzdHJpbmcubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgLy8gbm8gc3VjaCB0aGluZyBhcyBhIHNwYXJzZSBzdHJpbmcuXG4gICAgICAgIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgc3RyaW5nLmNoYXJBdChpKSwgaSwgc3RyaW5nKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZm9yRWFjaE9iamVjdChvYmplY3QsIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgZm9yICh2YXIgayBpbiBvYmplY3QpIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrKSkge1xuICAgICAgICAgICAgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmplY3Rba10sIGssIG9iamVjdClcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsInZhciB0b3BMZXZlbCA9IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDpcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHt9XG52YXIgbWluRG9jID0gcmVxdWlyZSgnbWluLWRvY3VtZW50Jyk7XG5cbmlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBkb2N1bWVudDtcbn0gZWxzZSB7XG4gICAgdmFyIGRvY2N5ID0gdG9wTGV2ZWxbJ19fR0xPQkFMX0RPQ1VNRU5UX0NBQ0hFQDQnXTtcblxuICAgIGlmICghZG9jY3kpIHtcbiAgICAgICAgZG9jY3kgPSB0b3BMZXZlbFsnX19HTE9CQUxfRE9DVU1FTlRfQ0FDSEVANCddID0gbWluRG9jO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gZG9jY3k7XG59XG4iLCJpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBnbG9iYWw7XG59IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKXtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHNlbGY7XG59IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0ge307XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhc2hNYXRjaCAoaGFzaCwgcHJlZml4KSB7XG4gIHZhciBwcmUgPSBwcmVmaXggfHwgJy8nO1xuICBpZiAoaGFzaC5sZW5ndGggPT09IDApIHJldHVybiBwcmU7XG4gIGhhc2ggPSBoYXNoLnJlcGxhY2UoJyMnLCAnJyk7XG4gIGhhc2ggPSBoYXNoLnJlcGxhY2UoL1xcLyQvLCAnJylcbiAgaWYgKGhhc2guaW5kZXhPZignLycpICE9IDApIGhhc2ggPSAnLycgKyBoYXNoO1xuICBpZiAocHJlID09ICcvJykgcmV0dXJuIGhhc2g7XG4gIGVsc2UgcmV0dXJuIGhhc2gucmVwbGFjZShwcmUsICcnKTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gYXR0cmlidXRlVG9Qcm9wZXJ0eVxuXG52YXIgdHJhbnNmb3JtID0ge1xuICAnY2xhc3MnOiAnY2xhc3NOYW1lJyxcbiAgJ2Zvcic6ICdodG1sRm9yJyxcbiAgJ2h0dHAtZXF1aXYnOiAnaHR0cEVxdWl2J1xufVxuXG5mdW5jdGlvbiBhdHRyaWJ1dGVUb1Byb3BlcnR5IChoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAodGFnTmFtZSwgYXR0cnMsIGNoaWxkcmVuKSB7XG4gICAgZm9yICh2YXIgYXR0ciBpbiBhdHRycykge1xuICAgICAgaWYgKGF0dHIgaW4gdHJhbnNmb3JtKSB7XG4gICAgICAgIGF0dHJzW3RyYW5zZm9ybVthdHRyXV0gPSBhdHRyc1thdHRyXVxuICAgICAgICBkZWxldGUgYXR0cnNbYXR0cl1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGgodGFnTmFtZSwgYXR0cnMsIGNoaWxkcmVuKVxuICB9XG59XG4iLCJ2YXIgYXR0clRvUHJvcCA9IHJlcXVpcmUoJ2h5cGVyc2NyaXB0LWF0dHJpYnV0ZS10by1wcm9wZXJ0eScpXG5cbnZhciBWQVIgPSAwLCBURVhUID0gMSwgT1BFTiA9IDIsIENMT1NFID0gMywgQVRUUiA9IDRcbnZhciBBVFRSX0tFWSA9IDUsIEFUVFJfS0VZX1cgPSA2XG52YXIgQVRUUl9WQUxVRV9XID0gNywgQVRUUl9WQUxVRSA9IDhcbnZhciBBVFRSX1ZBTFVFX1NRID0gOSwgQVRUUl9WQUxVRV9EUSA9IDEwXG52YXIgQVRUUl9FUSA9IDExLCBBVFRSX0JSRUFLID0gMTJcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaCwgb3B0cykge1xuICBoID0gYXR0clRvUHJvcChoKVxuICBpZiAoIW9wdHMpIG9wdHMgPSB7fVxuICB2YXIgY29uY2F0ID0gb3B0cy5jb25jYXQgfHwgZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gU3RyaW5nKGEpICsgU3RyaW5nKGIpXG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKHN0cmluZ3MpIHtcbiAgICB2YXIgc3RhdGUgPSBURVhULCByZWcgPSAnJ1xuICAgIHZhciBhcmdsZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgdmFyIHBhcnRzID0gW11cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGkgPCBhcmdsZW4gLSAxKSB7XG4gICAgICAgIHZhciBhcmcgPSBhcmd1bWVudHNbaSsxXVxuICAgICAgICB2YXIgcCA9IHBhcnNlKHN0cmluZ3NbaV0pXG4gICAgICAgIHZhciB4c3RhdGUgPSBzdGF0ZVxuICAgICAgICBpZiAoeHN0YXRlID09PSBBVFRSX1ZBTFVFX0RRKSB4c3RhdGUgPSBBVFRSX1ZBTFVFXG4gICAgICAgIGlmICh4c3RhdGUgPT09IEFUVFJfVkFMVUVfU1EpIHhzdGF0ZSA9IEFUVFJfVkFMVUVcbiAgICAgICAgaWYgKHhzdGF0ZSA9PT0gQVRUUl9WQUxVRV9XKSB4c3RhdGUgPSBBVFRSX1ZBTFVFXG4gICAgICAgIGlmICh4c3RhdGUgPT09IEFUVFIpIHhzdGF0ZSA9IEFUVFJfS0VZXG4gICAgICAgIHAucHVzaChbIFZBUiwgeHN0YXRlLCBhcmcgXSlcbiAgICAgICAgcGFydHMucHVzaC5hcHBseShwYXJ0cywgcClcbiAgICAgIH0gZWxzZSBwYXJ0cy5wdXNoLmFwcGx5KHBhcnRzLCBwYXJzZShzdHJpbmdzW2ldKSlcbiAgICB9XG5cbiAgICB2YXIgdHJlZSA9IFtudWxsLHt9LFtdXVxuICAgIHZhciBzdGFjayA9IFtbdHJlZSwtMV1dXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGN1ciA9IHN0YWNrW3N0YWNrLmxlbmd0aC0xXVswXVxuICAgICAgdmFyIHAgPSBwYXJ0c1tpXSwgcyA9IHBbMF1cbiAgICAgIGlmIChzID09PSBPUEVOICYmIC9eXFwvLy50ZXN0KHBbMV0pKSB7XG4gICAgICAgIHZhciBpeCA9IHN0YWNrW3N0YWNrLmxlbmd0aC0xXVsxXVxuICAgICAgICBpZiAoc3RhY2subGVuZ3RoID4gMSkge1xuICAgICAgICAgIHN0YWNrLnBvcCgpXG4gICAgICAgICAgc3RhY2tbc3RhY2subGVuZ3RoLTFdWzBdWzJdW2l4XSA9IGgoXG4gICAgICAgICAgICBjdXJbMF0sIGN1clsxXSwgY3VyWzJdLmxlbmd0aCA/IGN1clsyXSA6IHVuZGVmaW5lZFxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzID09PSBPUEVOKSB7XG4gICAgICAgIHZhciBjID0gW3BbMV0se30sW11dXG4gICAgICAgIGN1clsyXS5wdXNoKGMpXG4gICAgICAgIHN0YWNrLnB1c2goW2MsY3VyWzJdLmxlbmd0aC0xXSlcbiAgICAgIH0gZWxzZSBpZiAocyA9PT0gQVRUUl9LRVkgfHwgKHMgPT09IFZBUiAmJiBwWzFdID09PSBBVFRSX0tFWSkpIHtcbiAgICAgICAgdmFyIGtleSA9ICcnXG4gICAgICAgIHZhciBjb3B5S2V5XG4gICAgICAgIGZvciAoOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAocGFydHNbaV1bMF0gPT09IEFUVFJfS0VZKSB7XG4gICAgICAgICAgICBrZXkgPSBjb25jYXQoa2V5LCBwYXJ0c1tpXVsxXSlcbiAgICAgICAgICB9IGVsc2UgaWYgKHBhcnRzW2ldWzBdID09PSBWQVIgJiYgcGFydHNbaV1bMV0gPT09IEFUVFJfS0VZKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcnRzW2ldWzJdID09PSAnb2JqZWN0JyAmJiAha2V5KSB7XG4gICAgICAgICAgICAgIGZvciAoY29weUtleSBpbiBwYXJ0c1tpXVsyXSkge1xuICAgICAgICAgICAgICAgIGlmIChwYXJ0c1tpXVsyXS5oYXNPd25Qcm9wZXJ0eShjb3B5S2V5KSAmJiAhY3VyWzFdW2NvcHlLZXldKSB7XG4gICAgICAgICAgICAgICAgICBjdXJbMV1bY29weUtleV0gPSBwYXJ0c1tpXVsyXVtjb3B5S2V5XVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAga2V5ID0gY29uY2F0KGtleSwgcGFydHNbaV1bMl0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGJyZWFrXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcnRzW2ldWzBdID09PSBBVFRSX0VRKSBpKytcbiAgICAgICAgdmFyIGogPSBpXG4gICAgICAgIGZvciAoOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAocGFydHNbaV1bMF0gPT09IEFUVFJfVkFMVUUgfHwgcGFydHNbaV1bMF0gPT09IEFUVFJfS0VZKSB7XG4gICAgICAgICAgICBpZiAoIWN1clsxXVtrZXldKSBjdXJbMV1ba2V5XSA9IHN0cmZuKHBhcnRzW2ldWzFdKVxuICAgICAgICAgICAgZWxzZSBjdXJbMV1ba2V5XSA9IGNvbmNhdChjdXJbMV1ba2V5XSwgcGFydHNbaV1bMV0pXG4gICAgICAgICAgfSBlbHNlIGlmIChwYXJ0c1tpXVswXSA9PT0gVkFSXG4gICAgICAgICAgJiYgKHBhcnRzW2ldWzFdID09PSBBVFRSX1ZBTFVFIHx8IHBhcnRzW2ldWzFdID09PSBBVFRSX0tFWSkpIHtcbiAgICAgICAgICAgIGlmICghY3VyWzFdW2tleV0pIGN1clsxXVtrZXldID0gc3RyZm4ocGFydHNbaV1bMl0pXG4gICAgICAgICAgICBlbHNlIGN1clsxXVtrZXldID0gY29uY2F0KGN1clsxXVtrZXldLCBwYXJ0c1tpXVsyXSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGtleS5sZW5ndGggJiYgIWN1clsxXVtrZXldICYmIGkgPT09IGpcbiAgICAgICAgICAgICYmIChwYXJ0c1tpXVswXSA9PT0gQ0xPU0UgfHwgcGFydHNbaV1bMF0gPT09IEFUVFJfQlJFQUspKSB7XG4gICAgICAgICAgICAgIC8vIGh0dHBzOi8vaHRtbC5zcGVjLndoYXR3Zy5vcmcvbXVsdGlwYWdlL2luZnJhc3RydWN0dXJlLmh0bWwjYm9vbGVhbi1hdHRyaWJ1dGVzXG4gICAgICAgICAgICAgIC8vIGVtcHR5IHN0cmluZyBpcyBmYWxzeSwgbm90IHdlbGwgYmVoYXZlZCB2YWx1ZSBpbiBicm93c2VyXG4gICAgICAgICAgICAgIGN1clsxXVtrZXldID0ga2V5LnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHMgPT09IEFUVFJfS0VZKSB7XG4gICAgICAgIGN1clsxXVtwWzFdXSA9IHRydWVcbiAgICAgIH0gZWxzZSBpZiAocyA9PT0gVkFSICYmIHBbMV0gPT09IEFUVFJfS0VZKSB7XG4gICAgICAgIGN1clsxXVtwWzJdXSA9IHRydWVcbiAgICAgIH0gZWxzZSBpZiAocyA9PT0gQ0xPU0UpIHtcbiAgICAgICAgaWYgKHNlbGZDbG9zaW5nKGN1clswXSkgJiYgc3RhY2subGVuZ3RoKSB7XG4gICAgICAgICAgdmFyIGl4ID0gc3RhY2tbc3RhY2subGVuZ3RoLTFdWzFdXG4gICAgICAgICAgc3RhY2sucG9wKClcbiAgICAgICAgICBzdGFja1tzdGFjay5sZW5ndGgtMV1bMF1bMl1baXhdID0gaChcbiAgICAgICAgICAgIGN1clswXSwgY3VyWzFdLCBjdXJbMl0ubGVuZ3RoID8gY3VyWzJdIDogdW5kZWZpbmVkXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHMgPT09IFZBUiAmJiBwWzFdID09PSBURVhUKSB7XG4gICAgICAgIGlmIChwWzJdID09PSB1bmRlZmluZWQgfHwgcFsyXSA9PT0gbnVsbCkgcFsyXSA9ICcnXG4gICAgICAgIGVsc2UgaWYgKCFwWzJdKSBwWzJdID0gY29uY2F0KCcnLCBwWzJdKVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShwWzJdWzBdKSkge1xuICAgICAgICAgIGN1clsyXS5wdXNoLmFwcGx5KGN1clsyXSwgcFsyXSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjdXJbMl0ucHVzaChwWzJdKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHMgPT09IFRFWFQpIHtcbiAgICAgICAgY3VyWzJdLnB1c2gocFsxXSlcbiAgICAgIH0gZWxzZSBpZiAocyA9PT0gQVRUUl9FUSB8fCBzID09PSBBVFRSX0JSRUFLKSB7XG4gICAgICAgIC8vIG5vLW9wXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VuaGFuZGxlZDogJyArIHMpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRyZWVbMl0ubGVuZ3RoID4gMSAmJiAvXlxccyokLy50ZXN0KHRyZWVbMl1bMF0pKSB7XG4gICAgICB0cmVlWzJdLnNoaWZ0KClcbiAgICB9XG5cbiAgICBpZiAodHJlZVsyXS5sZW5ndGggPiAyXG4gICAgfHwgKHRyZWVbMl0ubGVuZ3RoID09PSAyICYmIC9cXFMvLnRlc3QodHJlZVsyXVsxXSkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdtdWx0aXBsZSByb290IGVsZW1lbnRzIG11c3QgYmUgd3JhcHBlZCBpbiBhbiBlbmNsb3NpbmcgdGFnJ1xuICAgICAgKVxuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0cmVlWzJdWzBdKSAmJiB0eXBlb2YgdHJlZVsyXVswXVswXSA9PT0gJ3N0cmluZydcbiAgICAmJiBBcnJheS5pc0FycmF5KHRyZWVbMl1bMF1bMl0pKSB7XG4gICAgICB0cmVlWzJdWzBdID0gaCh0cmVlWzJdWzBdWzBdLCB0cmVlWzJdWzBdWzFdLCB0cmVlWzJdWzBdWzJdKVxuICAgIH1cbiAgICByZXR1cm4gdHJlZVsyXVswXVxuXG4gICAgZnVuY3Rpb24gcGFyc2UgKHN0cikge1xuICAgICAgdmFyIHJlcyA9IFtdXG4gICAgICBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUVfVykgc3RhdGUgPSBBVFRSXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYyA9IHN0ci5jaGFyQXQoaSlcbiAgICAgICAgaWYgKHN0YXRlID09PSBURVhUICYmIGMgPT09ICc8Jykge1xuICAgICAgICAgIGlmIChyZWcubGVuZ3RoKSByZXMucHVzaChbVEVYVCwgcmVnXSlcbiAgICAgICAgICByZWcgPSAnJ1xuICAgICAgICAgIHN0YXRlID0gT1BFTlxuICAgICAgICB9IGVsc2UgaWYgKGMgPT09ICc+JyAmJiAhcXVvdChzdGF0ZSkpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IE9QRU4pIHtcbiAgICAgICAgICAgIHJlcy5wdXNoKFtPUEVOLHJlZ10pXG4gICAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9LRVkpIHtcbiAgICAgICAgICAgIHJlcy5wdXNoKFtBVFRSX0tFWSxyZWddKVxuICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUUgJiYgcmVnLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVzLnB1c2goW0FUVFJfVkFMVUUscmVnXSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzLnB1c2goW0NMT1NFXSlcbiAgICAgICAgICByZWcgPSAnJ1xuICAgICAgICAgIHN0YXRlID0gVEVYVFxuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBURVhUKSB7XG4gICAgICAgICAgcmVnICs9IGNcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gT1BFTiAmJiAvXFxzLy50ZXN0KGMpKSB7XG4gICAgICAgICAgcmVzLnB1c2goW09QRU4sIHJlZ10pXG4gICAgICAgICAgcmVnID0gJydcbiAgICAgICAgICBzdGF0ZSA9IEFUVFJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gT1BFTikge1xuICAgICAgICAgIHJlZyArPSBjXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFIgJiYgL1tcXHctXS8udGVzdChjKSkge1xuICAgICAgICAgIHN0YXRlID0gQVRUUl9LRVlcbiAgICAgICAgICByZWcgPSBjXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFIgJiYgL1xccy8udGVzdChjKSkge1xuICAgICAgICAgIGlmIChyZWcubGVuZ3RoKSByZXMucHVzaChbQVRUUl9LRVkscmVnXSlcbiAgICAgICAgICByZXMucHVzaChbQVRUUl9CUkVBS10pXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfS0VZICYmIC9cXHMvLnRlc3QoYykpIHtcbiAgICAgICAgICByZXMucHVzaChbQVRUUl9LRVkscmVnXSlcbiAgICAgICAgICByZWcgPSAnJ1xuICAgICAgICAgIHN0YXRlID0gQVRUUl9LRVlfV1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX0tFWSAmJiBjID09PSAnPScpIHtcbiAgICAgICAgICByZXMucHVzaChbQVRUUl9LRVkscmVnXSxbQVRUUl9FUV0pXG4gICAgICAgICAgcmVnID0gJydcbiAgICAgICAgICBzdGF0ZSA9IEFUVFJfVkFMVUVfV1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX0tFWSkge1xuICAgICAgICAgIHJlZyArPSBjXG4gICAgICAgIH0gZWxzZSBpZiAoKHN0YXRlID09PSBBVFRSX0tFWV9XIHx8IHN0YXRlID09PSBBVFRSKSAmJiBjID09PSAnPScpIHtcbiAgICAgICAgICByZXMucHVzaChbQVRUUl9FUV0pXG4gICAgICAgICAgc3RhdGUgPSBBVFRSX1ZBTFVFX1dcbiAgICAgICAgfSBlbHNlIGlmICgoc3RhdGUgPT09IEFUVFJfS0VZX1cgfHwgc3RhdGUgPT09IEFUVFIpICYmICEvXFxzLy50ZXN0KGMpKSB7XG4gICAgICAgICAgcmVzLnB1c2goW0FUVFJfQlJFQUtdKVxuICAgICAgICAgIGlmICgvW1xcdy1dLy50ZXN0KGMpKSB7XG4gICAgICAgICAgICByZWcgKz0gY1xuICAgICAgICAgICAgc3RhdGUgPSBBVFRSX0tFWVxuICAgICAgICAgIH0gZWxzZSBzdGF0ZSA9IEFUVFJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9WQUxVRV9XICYmIGMgPT09ICdcIicpIHtcbiAgICAgICAgICBzdGF0ZSA9IEFUVFJfVkFMVUVfRFFcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9WQUxVRV9XICYmIGMgPT09IFwiJ1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBBVFRSX1ZBTFVFX1NRXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUVfRFEgJiYgYyA9PT0gJ1wiJykge1xuICAgICAgICAgIHJlcy5wdXNoKFtBVFRSX1ZBTFVFLHJlZ10sW0FUVFJfQlJFQUtdKVxuICAgICAgICAgIHJlZyA9ICcnXG4gICAgICAgICAgc3RhdGUgPSBBVFRSXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUVfU1EgJiYgYyA9PT0gXCInXCIpIHtcbiAgICAgICAgICByZXMucHVzaChbQVRUUl9WQUxVRSxyZWddLFtBVFRSX0JSRUFLXSlcbiAgICAgICAgICByZWcgPSAnJ1xuICAgICAgICAgIHN0YXRlID0gQVRUUlxuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX1ZBTFVFX1cgJiYgIS9cXHMvLnRlc3QoYykpIHtcbiAgICAgICAgICBzdGF0ZSA9IEFUVFJfVkFMVUVcbiAgICAgICAgICBpLS1cbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9WQUxVRSAmJiAvXFxzLy50ZXN0KGMpKSB7XG4gICAgICAgICAgcmVzLnB1c2goW0FUVFJfVkFMVUUscmVnXSxbQVRUUl9CUkVBS10pXG4gICAgICAgICAgcmVnID0gJydcbiAgICAgICAgICBzdGF0ZSA9IEFUVFJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9WQUxVRSB8fCBzdGF0ZSA9PT0gQVRUUl9WQUxVRV9TUVxuICAgICAgICB8fCBzdGF0ZSA9PT0gQVRUUl9WQUxVRV9EUSkge1xuICAgICAgICAgIHJlZyArPSBjXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdGF0ZSA9PT0gVEVYVCAmJiByZWcubGVuZ3RoKSB7XG4gICAgICAgIHJlcy5wdXNoKFtURVhULHJlZ10pXG4gICAgICAgIHJlZyA9ICcnXG4gICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX1ZBTFVFICYmIHJlZy5sZW5ndGgpIHtcbiAgICAgICAgcmVzLnB1c2goW0FUVFJfVkFMVUUscmVnXSlcbiAgICAgICAgcmVnID0gJydcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUVfRFEgJiYgcmVnLmxlbmd0aCkge1xuICAgICAgICByZXMucHVzaChbQVRUUl9WQUxVRSxyZWddKVxuICAgICAgICByZWcgPSAnJ1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9WQUxVRV9TUSAmJiByZWcubGVuZ3RoKSB7XG4gICAgICAgIHJlcy5wdXNoKFtBVFRSX1ZBTFVFLHJlZ10pXG4gICAgICAgIHJlZyA9ICcnXG4gICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX0tFWSkge1xuICAgICAgICByZXMucHVzaChbQVRUUl9LRVkscmVnXSlcbiAgICAgICAgcmVnID0gJydcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzdHJmbiAoeCkge1xuICAgIGlmICh0eXBlb2YgeCA9PT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHhcbiAgICBlbHNlIGlmICh0eXBlb2YgeCA9PT0gJ3N0cmluZycpIHJldHVybiB4XG4gICAgZWxzZSBpZiAoeCAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCcpIHJldHVybiB4XG4gICAgZWxzZSByZXR1cm4gY29uY2F0KCcnLCB4KVxuICB9XG59XG5cbmZ1bmN0aW9uIHF1b3QgKHN0YXRlKSB7XG4gIHJldHVybiBzdGF0ZSA9PT0gQVRUUl9WQUxVRV9TUSB8fCBzdGF0ZSA9PT0gQVRUUl9WQUxVRV9EUVxufVxuXG52YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuZnVuY3Rpb24gaGFzIChvYmosIGtleSkgeyByZXR1cm4gaGFzT3duLmNhbGwob2JqLCBrZXkpIH1cblxudmFyIGNsb3NlUkUgPSBSZWdFeHAoJ14oJyArIFtcbiAgJ2FyZWEnLCAnYmFzZScsICdiYXNlZm9udCcsICdiZ3NvdW5kJywgJ2JyJywgJ2NvbCcsICdjb21tYW5kJywgJ2VtYmVkJyxcbiAgJ2ZyYW1lJywgJ2hyJywgJ2ltZycsICdpbnB1dCcsICdpc2luZGV4JywgJ2tleWdlbicsICdsaW5rJywgJ21ldGEnLCAncGFyYW0nLFxuICAnc291cmNlJywgJ3RyYWNrJywgJ3dicicsXG4gIC8vIFNWRyBUQUdTXG4gICdhbmltYXRlJywgJ2FuaW1hdGVUcmFuc2Zvcm0nLCAnY2lyY2xlJywgJ2N1cnNvcicsICdkZXNjJywgJ2VsbGlwc2UnLFxuICAnZmVCbGVuZCcsICdmZUNvbG9yTWF0cml4JywgJ2ZlQ29tcG9zaXRlJyxcbiAgJ2ZlQ29udm9sdmVNYXRyaXgnLCAnZmVEaWZmdXNlTGlnaHRpbmcnLCAnZmVEaXNwbGFjZW1lbnRNYXAnLFxuICAnZmVEaXN0YW50TGlnaHQnLCAnZmVGbG9vZCcsICdmZUZ1bmNBJywgJ2ZlRnVuY0InLCAnZmVGdW5jRycsICdmZUZ1bmNSJyxcbiAgJ2ZlR2F1c3NpYW5CbHVyJywgJ2ZlSW1hZ2UnLCAnZmVNZXJnZU5vZGUnLCAnZmVNb3JwaG9sb2d5JyxcbiAgJ2ZlT2Zmc2V0JywgJ2ZlUG9pbnRMaWdodCcsICdmZVNwZWN1bGFyTGlnaHRpbmcnLCAnZmVTcG90TGlnaHQnLCAnZmVUaWxlJyxcbiAgJ2ZlVHVyYnVsZW5jZScsICdmb250LWZhY2UtZm9ybWF0JywgJ2ZvbnQtZmFjZS1uYW1lJywgJ2ZvbnQtZmFjZS11cmknLFxuICAnZ2x5cGgnLCAnZ2x5cGhSZWYnLCAnaGtlcm4nLCAnaW1hZ2UnLCAnbGluZScsICdtaXNzaW5nLWdseXBoJywgJ21wYXRoJyxcbiAgJ3BhdGgnLCAncG9seWdvbicsICdwb2x5bGluZScsICdyZWN0JywgJ3NldCcsICdzdG9wJywgJ3RyZWYnLCAndXNlJywgJ3ZpZXcnLFxuICAndmtlcm4nXG5dLmpvaW4oJ3wnKSArICcpKD86W1xcLiNdW2EtekEtWjAtOVxcdTAwN0YtXFx1RkZGRl86LV0rKSokJylcbmZ1bmN0aW9uIHNlbGZDbG9zaW5nICh0YWcpIHsgcmV0dXJuIGNsb3NlUkUudGVzdCh0YWcpIH1cbiIsIm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvblxuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24gKGZuKSB7XG4gIHZhciBzdHJpbmcgPSB0b1N0cmluZy5jYWxsKGZuKVxuICByZXR1cm4gc3RyaW5nID09PSAnW29iamVjdCBGdW5jdGlvbl0nIHx8XG4gICAgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJyAmJiBzdHJpbmcgIT09ICdbb2JqZWN0IFJlZ0V4cF0nKSB8fFxuICAgICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAvLyBJRTggYW5kIGJlbG93XG4gICAgIChmbiA9PT0gd2luZG93LnNldFRpbWVvdXQgfHxcbiAgICAgIGZuID09PSB3aW5kb3cuYWxlcnQgfHxcbiAgICAgIGZuID09PSB3aW5kb3cuY29uZmlybSB8fFxuICAgICAgZm4gPT09IHdpbmRvdy5wcm9tcHQpKVxufTtcbiIsIm1vZHVsZS5leHBvcnRzPVtcbiAge1xuICAgIFwiaWRcIjogXCJhYXRyb3hcIixcbiAgICBcImtleVwiOiBcIjI2NlwiLFxuICAgIFwibmFtZVwiOiBcIkFhdHJveFwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgRGFya2luIEJsYWRlXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJUYW5rXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MzcuOCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NSxcbiAgICAgIFwibXBcIjogMTA1LjYsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDUsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDUsXG4gICAgICBcImFybW9yXCI6IDI0LjM4NCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjgsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDE1MCxcbiAgICAgIFwiaHByZWdlblwiOiA2LjU5LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41LFxuICAgICAgXCJtcHJlZ2VuXCI6IDAsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNjAuMzc2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjIsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA0LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDNcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vQWF0cm94LnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDAsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkFhdHJveCBpcyBhIGxlZ2VuZGFyeSB3YXJyaW9yLCBvbmUgb2Ygb25seSBmaXZlIHRoYXQgcmVtYWluIG9mIGFuIGFuY2llbnQgcmFjZSBrbm93biBhcyB0aGUgRGFya2luLiBIZSB3aWVsZHMgaGlzIG1hc3NpdmUgYmxhZGUgd2l0aCBncmFjZSBhbmQgcG9pc2UsIHNsaWNpbmcgdGhyb3VnaCBsZWdpb25zIGluIGEgc3R5bGUgdGhhdCBpcyBoeXBub3RpYyB0byBiZWhvbGQuIFdpdGggZWFjaCBmb2UgZmVsbGVkLCBBYXRyb3gncyAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImFocmlcIixcbiAgICBcImtleVwiOiBcIjEwM1wiLFxuICAgIFwibmFtZVwiOiBcIkFocmlcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIE5pbmUtVGFpbGVkIEZveFwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIixcbiAgICAgIFwiQXNzYXNzaW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUxNC40LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgwLFxuICAgICAgXCJtcFwiOiAzMzQsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNTAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzAsXG4gICAgICBcImFybW9yXCI6IDIwLjg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDU1MCxcbiAgICAgIFwiaHByZWdlblwiOiA2LjUwNSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNixcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTMuMDQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA2NSxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0FocmkucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogNDgsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlVubGlrZSBvdGhlciBmb3hlcyB0aGF0IHJvYW1lZCB0aGUgd29vZHMgb2Ygc291dGhlcm4gSW9uaWEsIEFocmkgaGFkIGFsd2F5cyBmZWx0IGEgc3RyYW5nZSBjb25uZWN0aW9uIHRvIHRoZSBtYWdpY2FsIHdvcmxkIGFyb3VuZCBoZXI7IGEgY29ubmVjdGlvbiB0aGF0IHdhcyBzb21laG93IGluY29tcGxldGUuIERlZXAgaW5zaWRlLCBzaGUgZmVsdCB0aGUgc2tpbiBzaGUgaGFkIGJlZW4gYm9ybiBpbnRvIHdhcyBhbiBpbGwgZml0IGZvciAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImFrYWxpXCIsXG4gICAgXCJrZXlcIjogXCI4NFwiLFxuICAgIFwibmFtZVwiOiBcIkFrYWxpXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBGaXN0IG9mIFNoYWRvd1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkFzc2Fzc2luXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1ODcuOCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NSxcbiAgICAgIFwibXBcIjogMjAwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNTAsXG4gICAgICBcImFybW9yXCI6IDI2LjM4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDguMzQsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjY1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDUwLFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU4LjM3NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4yLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4xLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDMuMVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9Ba2FsaS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiA5NixcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGhlcmUgZXhpc3RzIGFuIGFuY2llbnQgb3JkZXIgb3JpZ2luYXRpbmcgaW4gdGhlIElvbmlhbiBJc2xlcyBkZWRpY2F0ZWQgdG8gdGhlIHByZXNlcnZhdGlvbiBvZiBiYWxhbmNlLiBPcmRlciwgY2hhb3MsIGxpZ2h0LCBkYXJrbmVzcyAtLSBhbGwgdGhpbmdzIG11c3QgZXhpc3QgaW4gcGVyZmVjdCBoYXJtb255IGZvciBzdWNoIGlzIHRoZSB3YXkgb2YgdGhlIHVuaXZlcnNlLiBUaGlzIG9yZGVyIGlzIGtub3duIGFzIHRoZSBLaW5rb3UgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJhbGlzdGFyXCIsXG4gICAgXCJrZXlcIjogXCIxMlwiLFxuICAgIFwibmFtZVwiOiBcIkFsaXN0YXJcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIE1pbm90YXVyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiVGFua1wiLFxuICAgICAgXCJTdXBwb3J0XCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA2MTMuMzYsXG4gICAgICBcImhwcGVybGV2ZWxcIjogMTA2LFxuICAgICAgXCJtcFwiOiAyNzguODQsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMzgsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzAsXG4gICAgICBcImFybW9yXCI6IDI0LjM4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDguNjc1LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC44NSxcbiAgICAgIFwibXByZWdlblwiOiA4LjUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA2MS4xMTE2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjYyLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuMTI1XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0FsaXN0YXIucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogMTQ0LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJBcyB0aGUgbWlnaHRpZXN0IHdhcnJpb3IgdG8gZXZlciBlbWVyZ2UgZnJvbSB0aGUgTWlub3RhdXIgdHJpYmVzIG9mIHRoZSBHcmVhdCBCYXJyaWVyLCBBbGlzdGFyIGRlZmVuZGVkIGhpcyB0cmliZSBmcm9tIFZhbG9yYW4ncyBtYW55IGRhbmdlcnM7IHRoYXQgaXMsIHVudGlsIHRoZSBjb21pbmcgb2YgdGhlIE5veGlhbiBhcm15LiBBbGlzdGFyIHdhcyBsdXJlZCBmcm9tIGhpcyB2aWxsYWdlIGJ5IHRoZSBtYWNoaW5hdGlvbnMgb2YgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJhbXVtdVwiLFxuICAgIFwia2V5XCI6IFwiMzJcIixcbiAgICBcIm5hbWVcIjogXCJBbXVtdVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgU2FkIE11bW15XCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiVGFua1wiLFxuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA2MTMuMTIsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODQsXG4gICAgICBcIm1wXCI6IDI4Ny4yLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAyMy41NDQsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy44LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOC44NzUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjg1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuMzgsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjUyNSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUzLjM4NCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy44LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wMixcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjE4XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0FtdW11LnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDE5MixcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydTb2xpdHVkZSBjYW4gYmUgbG9uZWxpZXIgdGhhbiBkZWF0aC4nJzxicj48YnI+QSBsb25lbHkgYW5kIG1lbGFuY2hvbHkgc291bCBmcm9tIGFuY2llbnQgU2h1cmltYSwgQW11bXUgcm9hbXMgdGhlIHdvcmxkIGluIHNlYXJjaCBvZiBhIGZyaWVuZC4gQ3Vyc2VkIGJ5IGFuIGFuY2llbnQgc3BlbGwsIGhlIGlzIGRvb21lZCB0byByZW1haW4gYWxvbmUgZm9yZXZlciwgYXMgaGlzIHRvdWNoIGlzIGRlYXRoIGFuZCBoaXMgYWZmZWN0aW9uIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiYW5pdmlhXCIsXG4gICAgXCJrZXlcIjogXCIzNFwiLFxuICAgIFwibmFtZVwiOiBcIkFuaXZpYVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgQ3J5b3Bob2VuaXhcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCIsXG4gICAgICBcIlN1cHBvcnRcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDQ2Ny42LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDcwLFxuICAgICAgXCJtcFwiOiAzOTYuMDQsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNTAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMjUsXG4gICAgICBcImFybW9yXCI6IDIxLjIyLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDQsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA2MDAsXG4gICAgICBcImhwcmVnZW5cIjogNS41NyxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUxLjM3NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4yLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDEuNjhcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vQW5pdmlhLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDI0MCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiQW5pdmlhIGlzIGEgYmVpbmcgb2YgdGhlIGNvbGRlc3Qgd2ludGVyLCBhIG15c3RpY2FsIGVtYm9kaW1lbnQgb2YgaWNlIG1hZ2ljLCBhbmQgYW4gYW5jaWVudCBwcm90ZWN0b3Igb2YgdGhlIEZyZWxqb3JkLiBTaGUgY29tbWFuZHMgYWxsIHRoZSBwb3dlciBhbmQgZnVyeSBvZiB0aGUgbGFuZCBpdHNlbGYsIGNhbGxpbmcgdGhlIHNub3cgYW5kIGJpdHRlciB3aW5kIHRvIGRlZmVuZCBoZXIgaG9tZSBmcm9tIHRob3NlIHdobyB3b3VsZCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImFubmllXCIsXG4gICAgXCJrZXlcIjogXCIxXCIsXG4gICAgXCJuYW1lXCI6IFwiQW5uaWVcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIERhcmsgQ2hpbGRcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MTEuNjgsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNzYsXG4gICAgICBcIm1wXCI6IDMzNCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA1MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMTkuMjIsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogNCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDU3NSxcbiAgICAgIFwiaHByZWdlblwiOiA1LjQyLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTAuNDEsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDIuNjI1LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLjA4LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDEuMzZcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vQW5uaWUucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogMjg4LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUaGVyZSBoYXZlIGFsd2F5cyBiZWVuIHRob3NlIHdpdGhpbiBOb3h1cyB3aG8gZGlkIG5vdCBhZ3JlZSB3aXRoIHRoZSBldmlscyBwZXJwZXRyYXRlZCBieSB0aGUgTm94aWFuIEhpZ2ggQ29tbWFuZC4gVGhlIEhpZ2ggQ29tbWFuZCBoYWQganVzdCBwdXQgZG93biBhIGNvdXAgYXR0ZW1wdCBmcm9tIHRoZSBzZWxmLXByb2NsYWltZWQgQ3Jvd24gUHJpbmNlIFJhc2NoYWxsaW9uLCBhbmQgYSBjcmFja2Rvd24gb24gYW55IGZvcm0gb2YgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJhc2hlXCIsXG4gICAgXCJrZXlcIjogXCIyMlwiLFxuICAgIFwibmFtZVwiOiBcIkFzaGVcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEZyb3N0IEFyY2hlclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hcmtzbWFuXCIsXG4gICAgICBcIlN1cHBvcnRcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUyNy43MixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA3OSxcbiAgICAgIFwibXBcIjogMjgwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDMyLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzI1LFxuICAgICAgXCJhcm1vclwiOiAyMS4yMTIsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy40LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNjAwLFxuICAgICAgXCJocHJlZ2VuXCI6IDUuNDIsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYuOTcsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjQsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1Ni41MDgsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDIuMjYsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA1LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDMuMzNcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vQXNoZS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiAzMzYsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIldpdGggZWFjaCBhcnJvdyBzaGUgZmlyZXMgZnJvbSBoZXIgYW5jaWVudCBpY2UtZW5jaGFudGVkIGJvdywgQXNoZSBwcm92ZXMgc2hlIGlzIGEgbWFzdGVyIGFyY2hlci4gU2hlIGNob29zZXMgZWFjaCB0YXJnZXQgY2FyZWZ1bGx5LCB3YWl0cyBmb3IgdGhlIHJpZ2h0IG1vbWVudCwgYW5kIHRoZW4gc3RyaWtlcyB3aXRoIHBvd2VyIGFuZCBwcmVjaXNpb24uIEl0IGlzIHdpdGggdGhpcyBzYW1lIHZpc2lvbiBhbmQgZm9jdXMgdGhhdCBzaGUgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJhdXJlbGlvbnNvbFwiLFxuICAgIFwia2V5XCI6IFwiMTM2XCIsXG4gICAgXCJuYW1lXCI6IFwiQXVyZWxpb24gU29sXCIsXG4gICAgXCJ0aXRsZVwiOiBcIlRoZSBTdGFyIEZvcmdlclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIixcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTUwLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgwLFxuICAgICAgXCJtcFwiOiAzNTAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNTAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMjUsXG4gICAgICBcImFybW9yXCI6IDE5LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNixcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDU1MCxcbiAgICAgIFwiaHByZWdlblwiOiA2LjUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjYsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU3LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjIsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMS4zNlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9BdXJlbGlvblNvbC5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiAzODQsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkF1cmVsaW9uIFNvbMKgb25jZcKgZ3JhY2VkIHRoZSB2YXN0IGVtcHRpbmVzcyBvZiB0aGUgY29zbW9zIHdpdGggY2VsZXN0aWFsIHdvbmRlcnMgb2YgaGlzIG93biBkZXZpc2luZy4gTm93LCBoZSBpcyBmb3JjZWQgdG8gd2llbGQgaGlzIGF3ZXNvbWUgcG93ZXIgYXQgdGhlIGJlaGVzdCBvZiBhIHNwYWNlLWZhcmluZyBlbXBpcmUgdGhhdCB0cmlja2VkIGhpbSBpbnRvIHNlcnZpdHVkZS4gRGVzaXJpbmcgYSByZXR1cm4gdG8gaGlzIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiYXppclwiLFxuICAgIFwia2V5XCI6IFwiMjY4XCIsXG4gICAgXCJuYW1lXCI6IFwiQXppclwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgRW1wZXJvciBvZiB0aGUgU2FuZHNcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCIsXG4gICAgICBcIk1hcmtzbWFuXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MjQuNCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MCxcbiAgICAgIFwibXBcIjogMzUwLjU2LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQyLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzI1LFxuICAgICAgXCJhcm1vclwiOiAxOS4wNCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDYuOTIsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1MixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMi44LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wMixcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAxLjVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vQXppci5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiA0MzIsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnU2h1cmltYSB3YXMgb25jZSB0aGUgZ2xvcnkgb2YgUnVuZXRlcnJhLiBJIHdpbGwgbWFrZSBpdCBzbyBhZ2Fpbi4nJzxicj48YnI+QXppciB3YXMgYSBtb3J0YWwgZW1wZXJvciBvZiBTaHVyaW1hIGluIGEgZmFyIGRpc3RhbnQgYWdlLCBhIHByb3VkIG1hbiB3aG8gc3Rvb2QgYXQgdGhlIGN1c3Agb2YgaW1tb3J0YWxpdHkuIEhpcyBodWJyaXMgc2F3IGhpbSBiZXRyYXllZCBhbmQgbXVyZGVyZWQgYXQgdGhlIG1vbWVudCBvZiBoaXMgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJiYXJkXCIsXG4gICAgXCJrZXlcIjogXCI0MzJcIixcbiAgICBcIm5hbWVcIjogXCJCYXJkXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBXYW5kZXJpbmcgQ2FyZXRha2VyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiU3VwcG9ydFwiLFxuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MzUsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODksXG4gICAgICBcIm1wXCI6IDM1MCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA1MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzMCxcbiAgICAgIFwiYXJtb3JcIjogMjUsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogNCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDUwMCxcbiAgICAgIFwiaHByZWdlblwiOiA1LjQsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjQ1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTIsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9CYXJkLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDAsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJCYXJkIHRyYXZlbHMgdGhyb3VnaCByZWFsbXMgYmV5b25kIHRoZSBpbWFnaW5hdGlvbiBvZiBtb3J0YWwgYmVpbmdzLiBTb21lIG9mIFZhbG9yYW4ncyBncmVhdGVzdCBzY2hvbGFycyBoYXZlIHNwZW50IHRoZWlyIGxpdmVzIHRyeWluZyB0byB1bmRlcnN0YW5kIHRoZSBteXN0ZXJpZXMgaGUgZW1ib2RpZXMuIFRoaXMgZW5pZ21hdGljIHNwaXJpdCBoYXMgYmVlbiBnaXZlbiBtYW55IG5hbWVzIHRocm91Z2hvdXQgdGhlIGhpc3Rvcnkgb2YgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJibGl0emNyYW5rXCIsXG4gICAgXCJrZXlcIjogXCI1M1wiLFxuICAgIFwibmFtZVwiOiBcIkJsaXR6Y3JhbmtcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEdyZWF0IFN0ZWFtIEdvbGVtXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiVGFua1wiLFxuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1ODIuNixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5NSxcbiAgICAgIFwibXBcIjogMjY3LjIsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMjUsXG4gICAgICBcImFybW9yXCI6IDI0LjM4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDQsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA4LjUxLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC43NSxcbiAgICAgIFwibXByZWdlblwiOiA4LjUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA2MS41NCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDEuMTNcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vQmxpdHpjcmFuay5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiA0OCxcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlphdW4gaXMgYSBwbGFjZSB3aGVyZSBib3RoIG1hZ2ljIGFuZCBzY2llbmNlIGhhdmUgZ29uZSBhd3J5LCBhbmQgdGhlIHVuY2hlY2tlZCBuYXR1cmUgb2YgZXhwZXJpbWVudGF0aW9uIGhhcyB0YWtlbiBpdHMgdG9sbC4gSG93ZXZlciwgWmF1bidzIGxlbmllbnQgcmVzdHJpY3Rpb25zIGFsbG93IHRoZWlyIHJlc2VhcmNoZXJzIGFuZCBpbnZlbnRvcnMgdGhlIGxlZXdheSB0byBwdXNoIHRoZSBib3VuZHMgb2Ygc2NpZW5jZSBhdCBhbiAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImJyYW5kXCIsXG4gICAgXCJrZXlcIjogXCI2M1wiLFxuICAgIFwibmFtZVwiOiBcIkJyYW5kXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBCdXJuaW5nIFZlbmdlYW5jZVwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUwNy42OCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA3NixcbiAgICAgIFwibXBcIjogMzc1LjYsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDIsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDAsXG4gICAgICBcImFybW9yXCI6IDIxLjg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDU1MCxcbiAgICAgIFwiaHByZWdlblwiOiA1LjQyLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA4LjAwNSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNixcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU3LjA0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDEuMzZcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vQnJhbmQucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogOTYsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJJbiBhIGZhcmF3YXkgcGxhY2Uga25vd24gYXMgTG9rZmFyIHRoZXJlIHdhcyBhIHNlYWZhcmluZyBtYXJhdWRlciBjYWxsZWQgS2VnYW4gUm9kaGUuIEFzIHdhcyBoaXMgcGVvcGxlJ3Mgd2F5LCBLZWdhbiBzYWlsZWQgZmFyIGFuZCB3aWRlIHdpdGggaGlzIGZlbGxvd3MsIHN0ZWFsaW5nIHRyZWFzdXJlcyBmcm9tIHRob3NlIHVubHVja3kgZW5vdWdoIHRvIGNhdGNoIHRoZWlyIGF0dGVudGlvbi4gVG8gc29tZSwgaGUgd2FzIGEgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJicmF1bVwiLFxuICAgIFwia2V5XCI6IFwiMjAxXCIsXG4gICAgXCJuYW1lXCI6IFwiQnJhdW1cIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEhlYXJ0IG9mIHRoZSBGcmVsam9yZFwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlN1cHBvcnRcIixcbiAgICAgIFwiVGFua1wiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTc2LjE2LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg3LFxuICAgICAgXCJtcFwiOiAzMTAuNixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0NSxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMjYuNzIsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogNC41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOC4xOCxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDEsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU1LjM3NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4yLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzLjVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vQnJhdW0ucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogMTQ0LFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydXb3VsZCB5b3UgbGlrZSBhIGJlZHRpbWUgc3Rvcnk/Jyc8YnI+PGJyPicnR3JhbmRtYSwgSSdtIHRvbyBvbGQgZm9yIHRoYXQuJyc8YnI+PGJyPicnWW91J3JlIG5ldmVyIHRvbyBvbGQgdG8gYmUgdG9sZCBhIHN0b3J5LicnPGJyPjxicj5UaGUgZ2lybCByZWx1Y3RhbnRseSBjcmF3bHMgaW50byBiZWQgYW5kIHdhaXRzLCBrbm93aW5nIHNoZSB3b24ndCB3aW4gdGhpcyBiYXR0bGUuIEEgYml0dGVyIHdpbmQgaG93bHMgb3V0c2lkZSwgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJjYWl0bHluXCIsXG4gICAgXCJrZXlcIjogXCI1MVwiLFxuICAgIFwibmFtZVwiOiBcIkNhaXRseW5cIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFNoZXJpZmYgb2YgUGlsdG92ZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYXJrc21hblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTI0LjQsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODAsXG4gICAgICBcIm1wXCI6IDMxMy43LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDM1LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzI1LFxuICAgICAgXCJhcm1vclwiOiAyMi44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA2NTAsXG4gICAgICBcImhwcmVnZW5cIjogNS42NyxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogNy40LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUzLjY2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAyLjE4LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLjEsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogNFxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9DYWl0bHluLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDE5MixcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnR28gYWhlYWQsIHJ1bi4gSSdsbCBnaXZlIHlvdSBhIGZpdmUgbWludXRlIGhlYWQgc3RhcnQuJyc8YnI+PGJyPk9uZSBvZiB0aGUgcmVhc29ucyBQaWx0b3ZlciBpcyBrbm93biBhcyB0aGUgQ2l0eSBvZiBQcm9ncmVzcyBpcyBiZWNhdXNlIGl0IGhhcyBhbiBleHRyYW9yZGluYXJpbHkgbG93IGNyaW1lIHJhdGUuIFRoaXMgaGFzbid0IGFsd2F5cyBiZWVuIHRoZSBjYXNlOyBicmlnYW5kcyBhbmQgdGhpZXZlcyBvZiBhbGwgc29ydHMgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJjYXNzaW9wZWlhXCIsXG4gICAgXCJrZXlcIjogXCI2OVwiLFxuICAgIFwibmFtZVwiOiBcIkNhc3Npb3BlaWFcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFNlcnBlbnQncyBFbWJyYWNlXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTI1LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDc1LFxuICAgICAgXCJtcFwiOiAzNzUsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNjAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMjgsXG4gICAgICBcImFybW9yXCI6IDI1LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDU1MCxcbiAgICAgIFwiaHByZWdlblwiOiA1LjUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjUsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUzLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wMzQsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMS41XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0Nhc3Npb3BlaWEucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogMjQwLFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiQ2Fzc2lvcGVpYSBpcyBhIHRlcnJpZnlpbmcgY3JlYXR1cmUgLSBoYWxmIHdvbWFuLCBoYWxmIHNuYWtlIC0gd2hvc2Ugc2xpZ2h0ZXN0IGdsYW5jZSBicmluZ3MgZGVhdGguIFRoZSB5b3VuZ2VzdCBkYXVnaHRlciBvZiBvbmUgb2YgTm94dXMnIG1vc3QgaW5mbHVlbnRpYWwgZmFtaWxpZXMsIHNoZSB3YXMgb25jZSBhIGJlYXV0aWZ1bCBhbmQgY3VubmluZyB0ZW1wdHJlc3MgY2FwYWJsZSBvZiBtYW5pcHVsYXRpbmcgdGhlIGhhcmRlc3QgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJjaG9nYXRoXCIsXG4gICAgXCJrZXlcIjogXCIzMVwiLFxuICAgIFwibmFtZVwiOiBcIkNobydHYXRoXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBUZXJyb3Igb2YgdGhlIFZvaWRcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJUYW5rXCIsXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU3NC40LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgwLFxuICAgICAgXCJtcFwiOiAyNzIuMixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0NSxcbiAgICAgIFwiYXJtb3JcIjogMjguODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOC45MjUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjg1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuMjA1LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC40NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDYxLjE1NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogNC4yLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDEuNDRcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vQ2hvZ2F0aC5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiAyODgsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUaGVyZSBpcyBhIHBsYWNlIGJldHdlZW4gZGltZW5zaW9ucywgYmV0d2VlbiB3b3JsZHMuIFRvIHNvbWUgaXQgaXMga25vd24gYXMgdGhlIE91dHNpZGUsIHRvIG90aGVycyBpdCBpcyB0aGUgVW5rbm93bi4gVG8gdGhvc2UgdGhhdCB0cnVseSBrbm93LCBob3dldmVyLCBpdCBpcyBjYWxsZWQgdGhlIFZvaWQuIERlc3BpdGUgaXRzIG5hbWUsIHRoZSBWb2lkIGlzIG5vdCBhbiBlbXB0eSBwbGFjZSwgYnV0IHJhdGhlciB0aGUgaG9tZSBvZiAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImNvcmtpXCIsXG4gICAgXCJrZXlcIjogXCI0MlwiLFxuICAgIFwibmFtZVwiOiBcIkNvcmtpXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBEYXJpbmcgQm9tYmFyZGllclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hcmtzbWFuXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MTIuNzYsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODIsXG4gICAgICBcIm1wXCI6IDM1MC4xNixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAzNCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMyNSxcbiAgICAgIFwiYXJtb3JcIjogMjMuMzgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDUuNDIsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuNDIsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjNcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vQ29ya2kucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogMzM2LFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiV2hlbiBIZWltZXJkaW5nZXIgYW5kIGhpcyB5b3JkbGUgY29sbGVhZ3VlcyBtaWdyYXRlZCB0byBQaWx0b3ZlciwgdGhleSBlbWJyYWNlZCBzY2llbmNlIGFzIGEgd2F5IG9mIGxpZmUsIGFuZCB0aGV5IGltbWVkaWF0ZWx5IG1hZGUgc2V2ZXJhbCBncm91bmRicmVha2luZyBjb250cmlidXRpb25zIHRvIHRoZSB0ZWNobWF0dXJnaWNhbCBjb21tdW5pdHkuIFdoYXQgeW9yZGxlcyBsYWNrIGluIHN0YXR1cmUsIHRoZXkgbWFrZSB1cCBmb3IgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJkYXJpdXNcIixcbiAgICBcImtleVwiOiBcIjEyMlwiLFxuICAgIFwibmFtZVwiOiBcIkRhcml1c1wiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgSGFuZCBvZiBOb3h1c1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiVGFua1wiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTgyLjI0LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDEwMCxcbiAgICAgIFwibXBcIjogMjYzLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDM3LjUsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDAsXG4gICAgICBcImFybW9yXCI6IDMwLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDQsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDE3NSxcbiAgICAgIFwiaHByZWdlblwiOiA5Ljg0NSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuOTUsXG4gICAgICBcIm1wcmVnZW5cIjogNi41ODUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjM1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9EYXJpdXMucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogMzg0LFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGhlcmUgaXMgbm8gZ3JlYXRlciBzeW1ib2wgb2YgTm94aWFuIG1pZ2h0IHRoYW4gRGFyaXVzLCB0aGUgbmF0aW9uJ3MgbW9zdCBmZWFyZWQgYW5kIGJhdHRsZS1oYXJkZW5lZCB3YXJyaW9yLiBPcnBoYW5lZCBhdCBhIHlvdW5nIGFnZSwgRGFyaXVzIGhhZCB0byBmaWdodCB0byBrZWVwIGhpbXNlbGYgYW5kIGhpcyB5b3VuZ2VyIGJyb3RoZXIgYWxpdmUuIEJ5IHRoZSB0aW1lIGhlIGpvaW5lZCB0aGUgbWlsaXRhcnksIGhlIGhhZCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImRpYW5hXCIsXG4gICAgXCJrZXlcIjogXCIxMzFcIixcbiAgICBcIm5hbWVcIjogXCJEaWFuYVwiLFxuICAgIFwidGl0bGVcIjogXCJTY29ybiBvZiB0aGUgTW9vblwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTg5LjIsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTAsXG4gICAgICBcIm1wXCI6IDI5Ny4yLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQ1LFxuICAgICAgXCJhcm1vclwiOiAyNi4wNDgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy42LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxNTAsXG4gICAgICBcImhwcmVnZW5cIjogNy40MjUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjg1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1My4wNCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjI1XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0RpYW5hLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQzMixcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnSSBhbSB0aGUgbGlnaHQgY291cnNpbmcgaW4gdGhlIHNvdWwgb2YgdGhlIG1vb24uJyc8YnI+PGJyPkJlYXJpbmcgaGVyIGNyZXNjZW50IG1vb25ibGFkZSwgRGlhbmEgZmlnaHRzIGFzIGEgd2FycmlvciBvZiB0aGUgTHVuYXJpLCBhIGZhaXRoIGFsbCBidXQgcXVhc2hlZCBpbiB0aGUgbGFuZHMgYXJvdW5kIE1vdW50IFRhcmdvbi4gQ2xhZCBpbiBzaGltbWVyaW5nIGFybW9yIHRoZSBjb2xvciBvZiB3aW50ZXIgc25vdyBhdCBuaWdodCwgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJkcmF2ZW5cIixcbiAgICBcImtleVwiOiBcIjExOVwiLFxuICAgIFwibmFtZVwiOiBcIkRyYXZlblwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgR2xvcmlvdXMgRXhlY3V0aW9uZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYXJrc21hblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTU3Ljc2LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgyLFxuICAgICAgXCJtcFwiOiAzNjAuNTYsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMzksXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzAsXG4gICAgICBcImFybW9yXCI6IDI1LjU0NCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjMsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1NTAsXG4gICAgICBcImhwcmVnZW5cIjogNi4xNzUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjcsXG4gICAgICBcIm1wcmVnZW5cIjogOC4wNCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNjUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NS44LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAyLjkxLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wOCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjdcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vRHJhdmVuLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDAsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJVbmxpa2UgaGlzIGJyb3RoZXIgRGFyaXVzLCB2aWN0b3J5IGluIGJhdHRsZSB3YXMgbmV2ZXIgZW5vdWdoIGZvciBEcmF2ZW4uIEhlIGNyYXZlZCByZWNvZ25pdGlvbiwgYWNjbGFpbSwgYW5kIGdsb3J5LiBIZSBmaXJzdCBzb3VnaHQgZ3JlYXRuZXNzIGluIHRoZSBOb3hpYW4gbWlsaXRhcnksIGJ1dCBoaXMgZmxhaXIgZm9yIHRoZSBkcmFtYXRpYyB3ZW50IHNldmVyZWx5IHVuZGVyYXBwcmVjaWF0ZWQuIFRoaXJzdGluZyBmb3IgYSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImRybXVuZG9cIixcbiAgICBcImtleVwiOiBcIjM2XCIsXG4gICAgXCJuYW1lXCI6IFwiRHIuIE11bmRvXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBNYWRtYW4gb2YgWmF1blwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiVGFua1wiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTgyLjUyLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg5LFxuICAgICAgXCJtcFwiOiAwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDUsXG4gICAgICBcImFybW9yXCI6IDI2Ljg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDcuNzYsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjc1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDAsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNjEuMjcsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi44XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0RyTXVuZG8ucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogNDgsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ0Jld2FyZSB0aGUgTWFkbWFuIG9mIFphdW4uIEluIGhpcyBleWVzLCB5b3UgYXJlIGFscmVhZHkgZGVhZCcnPGJyPjxicj5JdCBpcyBzYWlkIHRoYXQgdGhlIG1hbiBub3cga25vd24gYXMgRHIuIE11bmRvIHdhcyBib3JuIHdpdGhvdXQgYW55IHNvcnQgb2YgY29uc2NpZW5jZS4gSW5zdGVhZCwgaGUgaGFkIGFuIHVucXVlbmNoYWJsZSBkZXNpcmUgdG8gaW5mbGljdCBwYWluIHRocm91Z2ggZXhwZXJpbWVudGF0aW9uLiBCeSB0aGUgdGltZSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImVra29cIixcbiAgICBcImtleVwiOiBcIjI0NVwiLFxuICAgIFwibmFtZVwiOiBcIkVra29cIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEJveSBXaG8gU2hhdHRlcmVkIFRpbWVcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJBc3Nhc3NpblwiLFxuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1ODAsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODAsXG4gICAgICBcIm1wXCI6IDI4MCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA1MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0MCxcbiAgICAgIFwiYXJtb3JcIjogMjcsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMyxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMixcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA5LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC45LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NSxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzLjNcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vRWtrby5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiA5NixcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkEgcHJvZGlneSBmcm9tIHRoZSByb3VnaCBzdHJlZXRzIG9mIFphdW4sIEVra28gbWFuaXB1bGF0ZXMgdGltZSB0byBzcGluIGFueSBzaXR1YXRpb24gdG8gaGlzIGFkdmFudGFnZS4gVXNpbmcgaGlzIG93biBpbnZlbnRpb24sIHRoZSBaZXJvLURyaXZlLCBoZSBleHBsb3JlcyB0aGUgYnJhbmNoaW5nIHBvc3NpYmlsaXRpZXMgb2YgcmVhbGl0eS4gQXMgd2VsbCBhcyBleHBlcmltZW50aW5nIHdpdGggbXVsdGktZGltZW5zaW9uYWwgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJlbGlzZVwiLFxuICAgIFwia2V5XCI6IFwiNjBcIixcbiAgICBcIm5hbWVcIjogXCJFbGlzZVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgU3BpZGVyIFF1ZWVuXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiLFxuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MjkuNCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MCxcbiAgICAgIFwibXBcIjogMzI0LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDUwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzI1LFxuICAgICAgXCJhcm1vclwiOiAyMi4xMjgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy4zNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDU1MCxcbiAgICAgIFwiaHByZWdlblwiOiA1LjcwNSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNixcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTAuNTQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMS43NVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9FbGlzZS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiAxNDQsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ0JlYXV0eSBpcyBwb3dlciB0b28sIGFuZCBjYW4gc3RyaWtlIHN3aWZ0ZXIgdGhhbiBhbnkgc3dvcmQuJyc8YnI+PGJyPkVsaXNlIGlzIGEgZGVhZGx5IHByZWRhdG9yIHdobyBkd2VsbHMgaW4gYSBzaHV0dGVyZWQsIGxpZ2h0bGVzcyBwYWxhY2UsIGRlZXAgaW4gdGhlIEltbW9ydGFsIEJhc3Rpb24gb2YgTm94dXMuIE9uY2Ugc2hlIHdhcyBtb3J0YWwsIHRoZSBtaXN0cmVzcyBvZiBhIG9uY2UtcG93ZXJmdWwgaG91c2UsIGJ1dCB0aGUgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJldmVseW5uXCIsXG4gICAgXCJrZXlcIjogXCIyOFwiLFxuICAgIFwibmFtZVwiOiBcIkV2ZWx5bm5cIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFdpZG93bWFrZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJBc3Nhc3NpblwiLFxuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MzEuMixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5MCxcbiAgICAgIFwibXBcIjogMzE1LjYsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDIsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDAsXG4gICAgICBcImFybW9yXCI6IDI2LjUsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy44LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOS44MixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogOC4xMDUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjYsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1My44OCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDMuNlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9FdmVseW5uLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDE5MixcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlN3aWZ0IGFuZCBsZXRoYWwsIEV2ZWx5bm4gaXMgb25lIG9mIHRoZSBtb3N0IGRlYWRseSAtIGFuZCBleHBlbnNpdmUgLSBhc3Nhc3NpbnMgaW4gYWxsIG9mIFJ1bmV0ZXJyYS4gQWJsZSB0byBtZXJnZSB3aXRoIHRoZSBzaGFkb3dzIGF0IHdpbGwsIHNoZSBwYXRpZW50bHkgc3RhbGtzIGhlciBwcmV5LCB3YWl0aW5nIGZvciB0aGUgcmlnaHQgbW9tZW50IHRvIHN0cmlrZS4gV2hpbGUgRXZlbHlubiBpcyBjbGVhcmx5IG5vdCBlbnRpcmVseSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImV6cmVhbFwiLFxuICAgIFwia2V5XCI6IFwiODFcIixcbiAgICBcIm5hbWVcIjogXCJFenJlYWxcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFByb2RpZ2FsIEV4cGxvcmVyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFya3NtYW5cIixcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNDg0LjQsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODAsXG4gICAgICBcIm1wXCI6IDM2MC42LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQyLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzI1LFxuICAgICAgXCJhcm1vclwiOiAyMS44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1NTAsXG4gICAgICBcImhwcmVnZW5cIjogNi40MixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogOC4wOSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNjUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NS42NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMi40MSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjhcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vRXpyZWFsLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDI0MCxcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRoZSBpbnRyZXBpZCB5b3VuZyBhZHZlbnR1cmVyIEV6cmVhbCBoYXMgZXhwbG9yZWQgc29tZSBvZiB0aGUgbW9zdCByZW1vdGUgYW5kIGFiYW5kb25lZCBsb2NhdGlvbnMgb24gUnVuZXRlcnJhLiBEdXJpbmcgYW4gZXhwZWRpdGlvbiB0byB0aGUgYnVyaWVkIHJ1aW5zIG9mIGFuY2llbnQgU2h1cmltYSwgaGUgcmVjb3ZlcmVkIGFuIGFtdWxldCBvZiBpbmNyZWRpYmxlIG15c3RpY2FsIHBvd2VyLiBMaWtlbHkgY29uc3RydWN0ZWQgdG8gYmUgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJmaWRkbGVzdGlja3NcIixcbiAgICBcImtleVwiOiBcIjlcIixcbiAgICBcIm5hbWVcIjogXCJGaWRkbGVzdGlja3NcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEhhcmJpbmdlciBvZiBEb29tXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiLFxuICAgICAgXCJTdXBwb3J0XCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MjQuNCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MCxcbiAgICAgIFwibXBcIjogNDAwLjEyLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDU2LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAyMC44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA0ODAsXG4gICAgICBcImhwcmVnZW5cIjogNS42MDUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjYsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDQ4LjM2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAyLjYyNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjExXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0ZpZGRsZVN0aWNrcy5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiAyODgsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJGb3IgbmVhcmx5IHR3ZW50eSB5ZWFycywgRmlkZGxlc3RpY2tzIGhhcyBzdG9vZCBhbG9uZSBpbiB0aGUgZWFzdGVybm1vc3Qgc3VtbW9uaW5nIGNoYW1iZXIgb2YgdGhlIEluc3RpdHV0ZSBvZiBXYXIuIE9ubHkgdGhlIGJ1cm5pbmcgZW1lcmFsZCBsaWdodCBvZiBoaXMgdW5lYXJ0aGx5IGdhemUgcGllcmNlcyB0aGUgbXVzdHkgZGFya25lc3Mgb2YgaGlzIGR1c3QtY292ZXJlZCBob21lLiBJdCBpcyBoZXJlIHRoYXQgdGhlIEhhcmJpbmdlciAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImZpb3JhXCIsXG4gICAgXCJrZXlcIjogXCIxMTRcIixcbiAgICBcIm5hbWVcIjogXCJGaW9yYVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgR3JhbmQgRHVlbGlzdFwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiQXNzYXNzaW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU1MCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NSxcbiAgICAgIFwibXBcIjogMzAwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQ1LFxuICAgICAgXCJhcm1vclwiOiAyNCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDE1MCxcbiAgICAgIFwiaHByZWdlblwiOiA4LjI1LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA4LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC43LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNjAsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzLjJcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vRmlvcmEucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogMzM2LFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydJIGhhdmUgY29tZSB0byBraWxsIHlvdSBmb3IgdGhlIHNha2Ugb2YgaG9ub3IuIEFuZCB0aG91Z2ggeW91IHBvc3Nlc3Mgbm9uZSwgc3RpbGwgeW91IGRpZS4nJzxicj5UaGUgbW9zdCBmZWFyZWQgZHVlbGlzdCBpbiBhbGwgVmFsb3JhbiwgRmlvcmEgaXMgYXMgcmVub3duZWQgZm9yIGhlciBicnVzcXVlIG1hbm5lciBhbmQgY3VubmluZyBtaW5kIGFzIHNoZSBpcyBmb3IgdGhlIHNwZWVkIG9mIGhlciBibHVlc3RlZWwgcmFwaWVyLiAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImZpenpcIixcbiAgICBcImtleVwiOiBcIjEwNVwiLFxuICAgIFwibmFtZVwiOiBcIkZpenpcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFRpZGFsIFRyaWNrc3RlclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkFzc2Fzc2luXCIsXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU1OC40OCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NixcbiAgICAgIFwibXBcIjogMzE3LjIsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMzcsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDIyLjQxMixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjQsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDE3NSxcbiAgICAgIFwiaHByZWdlblwiOiA4LjE3NSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNyxcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTguMDQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA1LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDMuMVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9GaXp6LnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDM4NCxcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkNlbnR1cmllcyBhZ28sIGFuIGFuY2llbnQgd2F0ZXItZHdlbGxpbmcgcmFjZSBidWlsdCBhIGhpZGRlbiBjaXR5IGJlbmVhdGggYSBtb3VudGFpbiBpbiB0aGUgc2VhLiBUaG91Z2ggdGhlc2UgY3JlYXR1cmVzIGhhZCB0aGVpciBlbmVtaWVzLCB0aGUgY2l0eSB3YXMgYW4gaW1wZW5ldHJhYmxlIGZvcnRyZXNzLCBhbmQsIGluIHRoZSBzYWZldHkgaXQgcHJvdmlkZWQsIHRoZXkgZ3JldyBjb21wbGFjZW50LiBGaXp6LCBob3dldmVyLCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImdhbGlvXCIsXG4gICAgXCJrZXlcIjogXCIzXCIsXG4gICAgXCJuYW1lXCI6IFwiR2FsaW9cIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFNlbnRpbmVsJ3MgU29ycm93XCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiVGFua1wiLFxuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NzcuOCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NSxcbiAgICAgIFwibXBcIjogMzY5LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQ3LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAyNi44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA4LjcxLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC43NSxcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNjEuOTcsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMzc1LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wMixcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAxLjJcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vR2FsaW8ucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogNDMyLFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydUaGVyZSBpcyBubyBzdWNoIHRoaW5nIGFzIHJlZGVtcHRpb24uIE9ubHkgcGVuYW5jZS4nJzxicj48YnI+TG9uZyBiZWZvcmUgdGhlIHJlZ3VsYXRpb24gb2YgbWFnaWMsIG1hZ2VzIGV4cGVyaW1lbnRlZCB3aXRoIHRoZSBjcmVhdGlvbiBvZiBhcnRpZmljaWFsIGxpZmUuIE5vdyBmb3JiaWRkZW4sIGluc3RpbGxpbmcgZ29sZW1zIHdpdGggcmVhc29uIHdhcyBvbmNlIG5vdCBzbyB1bmNvbW1vbiBhIHByYWN0aWNlIGFtb25nc3QgdGhlIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZ2FuZ3BsYW5rXCIsXG4gICAgXCJrZXlcIjogXCI0MVwiLFxuICAgIFwibmFtZVwiOiBcIkdhbmdwbGFua1wiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgU2FsdHdhdGVyIFNjb3VyZ2VcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NDAsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODIsXG4gICAgICBcIm1wXCI6IDI4MixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0NSxcbiAgICAgIFwiYXJtb3JcIjogMjYsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMyxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDYsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjYsXG4gICAgICBcIm1wcmVnZW5cIjogNy41LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC43LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMy4yXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0dhbmdwbGFuay5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiAwLFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ0kgd2FzIGN1dHRpbmcgdGhyb2F0cyBhbmQgc2lua2luZyBOb3hpYW4gd2FyIGdhbGxleXMgd2hlbiB5b3Ugd2VyZSBzdGlsbCBwaXNzaW5nIHlvdXIgYnJpdGNoZXMsIGJveS4gWW91IGRvbid0IHdhbnQgdG8gdGFrZSBtZSBvbi4nJzxicj48YnI+QXMgdW5wcmVkaWN0YWJsZSBhcyBoZSBpcyBicnV0YWwsIHRoZSBkZXRocm9uZWQgcmVhdmVyIGtpbmcga25vd24gYXMgR2FuZ3BsYW5rIGlzIGZlYXJlZCBmYXIgYW5kIHdpZGUuIFdoZXJlIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZ2FyZW5cIixcbiAgICBcImtleVwiOiBcIjg2XCIsXG4gICAgXCJuYW1lXCI6IFwiR2FyZW5cIixcbiAgICBcInRpdGxlXCI6IFwiVGhlIE1pZ2h0IG9mIERlbWFjaWFcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIlRhbmtcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDYxNi4yOCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NC4yNSxcbiAgICAgIFwibXBcIjogMCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQwLFxuICAgICAgXCJhcm1vclwiOiAyNy41MzYsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMyxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTc1LFxuICAgICAgXCJocHJlZ2VuXCI6IDcuODQsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjUsXG4gICAgICBcIm1wcmVnZW5cIjogMCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1Ny44OCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogNC41LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuOVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9HYXJlbi5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiA0OCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGhyb3VnaG91dCBWYWxvcmFuLCB0aGUgcmVzb2x2ZSBvZiBEZW1hY2lhJ3MgbWlsaXRhcnkgaXMgYWx0ZXJuYXRlbHkgY2VsZWJyYXRlZCBvciBkZXNwaXNlZCwgYnV0IGFsd2F5cyByZXNwZWN0ZWQuIFRoZWlyICcnemVybyB0b2xlcmFuY2UnJyBtb3JhbCBjb2RlIGlzIHN0cmljdGx5IHVwaGVsZCBieSBjaXZpbGlhbnMgYW5kIHNvbGRpZXJzIGFsaWtlLiBJbiBjb21iYXQsIHRoaXMgbWVhbnMgRGVtYWNpYW4gdHJvb3BzIG1heSBub3QgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJnbmFyXCIsXG4gICAgXCJrZXlcIjogXCIxNTBcIixcbiAgICBcIm5hbWVcIjogXCJHbmFyXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBNaXNzaW5nIExpbmtcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIlRhbmtcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU0MCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA2NSxcbiAgICAgIFwibXBcIjogMTAwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMjUsXG4gICAgICBcImFybW9yXCI6IDIzLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDIuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDE3NSxcbiAgICAgIFwiaHByZWdlblwiOiAyLjUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjUsXG4gICAgICBcIm1wcmVnZW5cIjogMCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1MSxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiA2XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0duYXIucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogOTYsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRoZSBqdW5nbGUgZG9lcyBub3QgZm9yZ2l2ZSBibGluZG5lc3MuIEV2ZXJ5IGJyb2tlbiBicmFuY2ggdGVsbHMgYSBzdG9yeS48YnI+PGJyPkkndmUgaHVudGVkIGV2ZXJ5IGNyZWF0dXJlIHRoaXMganVuZ2xlIGhhcyB0byBvZmZlci4gSSB3YXMgY2VydGFpbiB0aGVyZSB3ZXJlIG5vIGNoYWxsZW5nZXMgbGVmdCBoZXJlLCBidXQgbm93IHRoZXJlIGlzIHNvbWV0aGluZyBuZXcuIEVhY2ggdHJhY2sgaXMgdGhlIHNpemUgb2YgYSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImdyYWdhc1wiLFxuICAgIFwia2V5XCI6IFwiNzlcIixcbiAgICBcIm5hbWVcIjogXCJHcmFnYXNcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFJhYmJsZSBSb3VzZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU4My41MixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4OSxcbiAgICAgIFwibXBcIjogNDAwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQ3LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzMwLFxuICAgICAgXCJhcm1vclwiOiAyNi4wNDgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy42LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogNS41LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA2MS4zOCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjA1XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0dyYWdhcy5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiAxNDQsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRoZSBvbmx5IHRoaW5nIG1vcmUgaW1wb3J0YW50IHRvIEdyYWdhcyB0aGFuIGZpZ2h0aW5nIGlzIGRyaW5raW5nLiBIaXMgdW5xdWVuY2hhYmxlIHRoaXJzdCBmb3Igc3Ryb25nZXIgYWxlIGhhcyBsZWQgaGltIGluIHNlYXJjaCBvZiB0aGUgbW9zdCBwb3RlbnQgYW5kIHVuY29udmVudGlvbmFsIGluZ3JlZGllbnRzIHRvIHRvc3MgaW4gaGlzIHN0aWxsLiBJbXB1bHNpdmUgYW5kIHVucHJlZGljdGFibGUsIHRoaXMgcm93ZHkgY2Fyb3VzZXIgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJncmF2ZXNcIixcbiAgICBcImtleVwiOiBcIjEwNFwiLFxuICAgIFwibmFtZVwiOiBcIkdyYXZlc1wiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgT3V0bGF3XCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFya3NtYW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU1MS4xMixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NCxcbiAgICAgIFwibXBcIjogMzIyLjIsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDAsXG4gICAgICBcImFybW9yXCI6IDI0LjM3NixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjQsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA0MjUsXG4gICAgICBcImhwcmVnZW5cIjogNi42NzUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjcsXG4gICAgICBcIm1wcmVnZW5cIjogNy45LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC43LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNjAuODMsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDIuNDEsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAuMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjZcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vR3JhdmVzLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDE5MixcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiTWFsY29sbSBHcmF2ZXMgaXMgYSB3YW50ZWQgbWFuIGluIGV2ZXJ5IHJlYWxtLCBjaXR5IGFuZCBlbXBpcmUgaGUgaGFzIHZpc2l0ZWQuIFRvdWdoLCBzdHJvbmctd2lsbGVkLCBhbmQgYWJvdmUgYWxsLCByZWxlbnRsZXNzLCB0aHJvdWdoIGhpcyBsaWZlIG9mIGNyaW1lIGhlIGhhcyBhbWFzc2VkICh0aGVuIGludmFyaWFibHkgbG9zdCkgYSBzbWFsbCBmb3J0dW5lLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiaGVjYXJpbVwiLFxuICAgIFwia2V5XCI6IFwiMTIwXCIsXG4gICAgXCJuYW1lXCI6IFwiSGVjYXJpbVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgU2hhZG93IG9mIFdhclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiVGFua1wiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTgwLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDkwLFxuICAgICAgXCJtcFwiOiAyNzcuMixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0NSxcbiAgICAgIFwiYXJtb3JcIjogMjYuNzIsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogNCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTc1LFxuICAgICAgXCJocHJlZ2VuXCI6IDcsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjc1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYuNSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNixcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU4LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjIsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA2NzIsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi41XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0hlY2FyaW0ucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogMjQwLFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ0JyZWFrIHRoZWlyIHJhbmtzIGFuZCByaWRlIHRoZW0gZG93biB3aXRob3V0IG1lcmN5LiBDcnVzaCB0aGUgbGl2aW5nIGFuZCBmZWFzdCBvbiB0aGVpciB0ZXJyb3IuJyc8YnI+PGJyPkhlY2FyaW0gaXMgYW4gYXJtb3JlZCBjb2xvc3N1cyB3aG8gY2hhcmdlcyBmcm9tIHRoZSBTaGFkb3cgSXNsZXMgYXQgdGhlIGhlYWQgb2YgYSBkZWF0aGx5IGhvc3Qgb2Ygc3BlY3RyYWwgaG9yc2VtZW4gdG8gaHVudCB0aGUgbGl2aW5nLiBBIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiaGVpbWVyZGluZ2VyXCIsXG4gICAgXCJrZXlcIjogXCI3NFwiLFxuICAgIFwibmFtZVwiOiBcIkhlaW1lcmRpbmdlclwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgUmV2ZXJlZCBJbnZlbnRvclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIixcbiAgICAgIFwiU3VwcG9ydFwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNDc2LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDc1LFxuICAgICAgXCJtcFwiOiAzMDcuMixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0MCxcbiAgICAgIFwiYXJtb3JcIjogMTkuMDQsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMyxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDU1MCxcbiAgICAgIFwiaHByZWdlblwiOiAxMS4wMDUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAxLjc1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NS41MzYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDIuNyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAxLjM2XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0hlaW1lcmRpbmdlci5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiAyODgsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkZyb20gdGhlIEpvdXJuYWwgb2YgUHJvZmVzc29yIENlY2lsIEIuIEhlaW1lcmRpbmdlcjxicj48YnI+MTAuMTQ8YnI+PGJyPjA5OjE1PGJyPjxicj5DdXJyZW50IG1ldGVvcm9sb2dpY2FsIGNvbmRpdGlvbnMgaW4gQmFuZGxlIENpdHkgc2VlbSBvcHRpbWFsLiBBdG1vc3BoZXJpYyBwcmVzc3VyZSBpcyBpZGVhbCBmb3IgdG9kYXkncyBleHBlcmltZW50cyE8YnI+PGJyPlJ1bm5pbmcgYSBmaWZ0aCB0cmlhbCBmb3IgbXkgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJpbGxhb2lcIixcbiAgICBcImtleVwiOiBcIjQyMFwiLFxuICAgIFwibmFtZVwiOiBcIklsbGFvaVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgS3Jha2VuIFByaWVzdGVzc1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiVGFua1wiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTg1LjYsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTUsXG4gICAgICBcIm1wXCI6IDMwMCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0MCxcbiAgICAgIFwiYXJtb3JcIjogMjYsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy44LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOS41LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuNSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNzUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA2MCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vSWxsYW9pLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDMzNixcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydJJ20gbm90IGJpZyBvbiBzZXJtb25zLiBCcm9rZW4gYm9uZXMgdGVhY2ggYmV0dGVyIGxlc3NvbnMuJyc8YnI+SWxsYW9pJ3MgcG93ZXJmdWwgcGh5c2lxdWUgaXMgZHdhcmZlZCBvbmx5IGJ5IGhlciBpbmRvbWl0YWJsZSBmYWl0aC4gQXMgdGhlIHByb3BoZXQgb2YgdGhlIEdyZWF0IEtyYWtlbiwgc2hlIHVzZXMgYSBodWdlLCBnb2xkZW4gaWRvbCB0byByaXAgaGVyIGZvZXMnIHNwaXJpdHMgZnJvbSB0aGVpciBib2RpZXMgYW5kIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiaXJlbGlhXCIsXG4gICAgXCJrZXlcIjogXCIzOVwiLFxuICAgIFwibmFtZVwiOiBcIklyZWxpYVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgV2lsbCBvZiB0aGUgQmxhZGVzXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJBc3Nhc3NpblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNjA3LjIsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTAsXG4gICAgICBcIm1wXCI6IDMzOC44LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDMyLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQ1LFxuICAgICAgXCJhcm1vclwiOiAyNS4zLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNzUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA4LjU5LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42NSxcbiAgICAgIFwibXByZWdlblwiOiA4LjEsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjY1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNjEuNTQ0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA2LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDMuMlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9JcmVsaWEucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogMzg0LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ1RoZSBzd29yZCBmbG91cmlzaGVzLCBhcyB0aG91Z2ggcGFpbnRpbmcgd2l0aCBibG9vZC4nJzxicj48YnI+VGhlIElvbmlhbnMgaGF2ZSBkZXZlbG9wZWQgc29tZSBvZiB0aGUgbW9zdCBicmVhdGh0YWtpbmcgYW5kIGRlYWRseSBtYXJ0aWFsIGFydHMgaW4gYWxsIG9mIFJ1bmV0ZXJyYSAtIGp1c3Qgb25lIG1hbmlmZXN0YXRpb24gb2YgdGhlaXIgcHVyc3VpdCBvZiBlbmxpZ2h0ZW5tZW50LiBUaGUgbW9zdCByZW1hcmthYmxlIGJsYWRlIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiaXZlcm5cIixcbiAgICBcImtleVwiOiBcIjQyN1wiLFxuICAgIFwibmFtZVwiOiBcIkl2ZXJuXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBHcmVlbiBGYXRoZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJTdXBwb3J0XCIsXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU4MCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5MCxcbiAgICAgIFwibXBcIjogNDUwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDYwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzMwLFxuICAgICAgXCJhcm1vclwiOiAyMixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA2LjksXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjg1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjc1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTAsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjAzLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDMuNFxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9JdmVybi5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uNC5wbmdcIixcbiAgICAgIFwieFwiOiA5NixcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkl2ZXJuIEJyYW1ibGVmb290LCBrbm93biB0byBtYW55IGFzIHRoZSBHcmVlbiBGYXRoZXIsIGlzIGEgcGVjdWxpYXIgaGFsZiBtYW4sIGhhbGYgdHJlZSB3aG8gcm9hbXMgUnVuZXRlcnJhJ3MgZm9yZXN0cywgY3VsdGl2YXRpbmcgbGlmZSBldmVyeXdoZXJlIGhlIGdvZXMuIEhlIGtub3dzIHRoZSBzZWNyZXRzIG9mIHRoZSBuYXR1cmFsIHdvcmxkLCBhbmQgaG9sZHMgZGVlcCBmcmllbmRzaGlwcyB3aXRoIGFsbCB0aGluZ3MgdGhhdCBncm93LC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiamFubmFcIixcbiAgICBcImtleVwiOiBcIjQwXCIsXG4gICAgXCJuYW1lXCI6IFwiSmFubmFcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFN0b3JtJ3MgRnVyeVwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlN1cHBvcnRcIixcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNDg3LjA0LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDc4LFxuICAgICAgXCJtcFwiOiA0MDkuNTIsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNjQsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDE5LjM4NCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjgsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA0NzUsXG4gICAgICBcImhwcmVnZW5cIjogNS40MixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogMTEuNSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUxLjk1NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMi45NSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjYxXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0phbm5hLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQzMixcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGhlcmUgYXJlIHRob3NlIHNvcmNlcmVycyB3aG8gZ2l2ZSB0aGVtc2VsdmVzIG92ZXIgdG8gdGhlIHByaW1hbCBwb3dlcnMgb2YgbmF0dXJlLCBmb3Jnb2luZyB0aGUgbGVhcm5lZCBwcmFjdGljZSBvZiBtYWdpYy4gU3VjaCBhIHNvcmNlcmVzcyBpcyBKYW5uYSwgd2hvIGZpcnN0IGxlYXJuZWQgbWFnaWMgYXMgYW4gb3JwaGFuIGdyb3dpbmcgdXAgYW1pZHN0IHRoZSBjaGFvcyB0aGF0IGlzIHRoZSBjaXR5LXN0YXRlIG9mIFphdW4uIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiamFydmFuaXZcIixcbiAgICBcImtleVwiOiBcIjU5XCIsXG4gICAgXCJuYW1lXCI6IFwiSmFydmFuIElWXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBFeGVtcGxhciBvZiBEZW1hY2lhXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiVGFua1wiLFxuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NzEuMixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5MCxcbiAgICAgIFwibXBcIjogMzAyLjIsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDAsXG4gICAgICBcImFybW9yXCI6IDI5LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNixcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTc1LFxuICAgICAgXCJocHJlZ2VuXCI6IDguMTc1LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC43LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYuNzU1LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC40NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU1LjcxMixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy40LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vSmFydmFuSVYucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogMCxcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnVGhlcmUgaXMgb25seSBvbmUgdHJ1dGgsIGFuZCB5b3Ugd2lsbCBmaW5kIGl0IGF0IHRoZSBwb2ludCBvZiBteSBsYW5jZS4nJzxicj48YnI+QXMgdGhlIHJveWFsIGZhbWlseSBvZiBEZW1hY2lhIGZvciBjZW50dXJpZXMsIG1lbWJlcnMgb2YgdGhlIExpZ2h0c2hpZWxkIGxpbmUgaGF2ZSBzcGVudCB0aGVpciBsaXZlcyB3YWdpbmcgd2FyIGFnYWluc3QgYW55IHdobyBvcHBvc2VkIERlbWFjaWFuIGV0aGljcy4gSXQgaXMgc2FpZCB0aGF0IC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiamF4XCIsXG4gICAgXCJrZXlcIjogXCIyNFwiLFxuICAgIFwibmFtZVwiOiBcIkpheFwiLFxuICAgIFwidGl0bGVcIjogXCJHcmFuZG1hc3RlciBhdCBBcm1zXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJBc3Nhc3NpblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTkyLjgsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODUsXG4gICAgICBcIm1wXCI6IDMzOC44LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDMyLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzUwLFxuICAgICAgXCJhcm1vclwiOiAyNy4wNCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOC4zNyxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogNy41NzUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjcsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA2MS45NyxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4zNzUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjAyLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDMuNFxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9KYXgucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogNDgsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJJdCBpcyBzZWxkb20gdGhlIGNhc2Ugd2hlcmUgYSBjaGFtcGlvbiBpcyBkZWZpbmVkIGJ5IGhpcyBhY3Rpb25zIGFmdGVyIGpvaW5pbmcgdGhlIExlYWd1ZSBvZiBMZWdlbmRzIHJhdGhlciB0aGFuIGJlZm9yZS4gU3VjaCBpcyB0aGUgY2FzZSB3aXRoIEpheCwgZm9yIHdob20gdGhlIGFyZ3VtZW50IGNvdWxkIGJlIG1hZGUgdGhhdCBoZSBpcyB0aGUgbW9zdCBwcm9saWZpYyB0b3VybmFtZW50IGZpZ2h0ZXIgY3VycmVudGx5IGF0IHRoZSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImpheWNlXCIsXG4gICAgXCJrZXlcIjogXCIxMjZcIixcbiAgICBcIm5hbWVcIjogXCJKYXljZVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgRGVmZW5kZXIgb2YgVG9tb3Jyb3dcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIk1hcmtzbWFuXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NzEuMixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5MCxcbiAgICAgIFwibXBcIjogMzU3LjIsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMzcsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDIyLjM4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA3LjM0LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1MC4zOCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0pheWNlLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDk2LFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiQXJtZWQgd2l0aCB3aXQsIGNoYXJtLCBhbmQgaGlzIHNpZ25hdHVyZSB0cmFuc2Zvcm1pbmcgaGFtbWVyLCBKYXljZSBsaXZlcyB0byBwcm90ZWN0IGhpcyBuYXRpdmUgUGlsdG92ZXIuIExvbmcgYmVmb3JlIGhpcyBuYXRpb24gY2FsbGVkIGhpbSBhIGhlcm8sIGhvd2V2ZXIsIGhlIHdhcyBhIHByb21pc2luZyB5b3VuZyBpbnZlbnRvci4gV2hlbiBQaWx0b3ZlciBjb21taXNzaW9uZWQgaGltIHRvIHN0dWR5IGEgcmFyZSBhcmNhbmUgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJqaGluXCIsXG4gICAgXCJrZXlcIjogXCIyMDJcIixcbiAgICBcIm5hbWVcIjogXCJKaGluXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBWaXJ0dW9zb1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hcmtzbWFuXCIsXG4gICAgICBcIkFzc2Fzc2luXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NDAsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODUsXG4gICAgICBcIm1wXCI6IDMwMCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA1MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzMCxcbiAgICAgIFwiYXJtb3JcIjogMjAsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDYsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1MyxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogNCxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAwXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0poaW4ucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogMTQ0LFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydBcnQgcmVxdWlyZXMgYSBjZXJ0YWluLi4uY3J1ZWx0eS4nJzxicj48YnI+SmhpbiBpcyBhIG1ldGljdWxvdXMgY3JpbWluYWwgcHN5Y2hvcGF0aCB3aG8gYmVsaWV2ZXMgbXVyZGVyIGlzIGFydC4gT25jZSBhbiBJb25pYW4gcHJpc29uZXIsIGJ1dCBmcmVlZCBieSBzaGFkb3d5IGVsZW1lbnRzIHdpdGhpbiBJb25pYSdzIHJ1bGluZyBjb3VuY2lsLCB0aGUgc2VyaWFsIGtpbGxlciBub3cgd29ya3MgYXMgdGhlaXIgY2FiYWwncyAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImppbnhcIixcbiAgICBcImtleVwiOiBcIjIyMlwiLFxuICAgIFwibmFtZVwiOiBcIkppbnhcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIExvb3NlIENhbm5vblwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hcmtzbWFuXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MTcuNzYsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODIsXG4gICAgICBcIm1wXCI6IDI0NS42LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQ1LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzI1LFxuICAgICAgXCJhcm1vclwiOiAyMi44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1MjUsXG4gICAgICBcImhwcmVnZW5cIjogNS44NCxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNSxcbiAgICAgIFwibXByZWdlblwiOiA2LjY4LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU4LjQ2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAyLjQxLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDFcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vSmlueC5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiAxOTIsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJKaW54IGxpdmVzIHRvIHdyZWFrIGhhdm9jIHdpdGhvdXQgYSB0aG91Z2h0IGZvciB0aGUgY29uc2VxdWVuY2VzLCBsZWF2aW5nIGEgdHJhaWwgb2YgbWF5aGVtIGFuZCBwYW5pYyBpbiBoZXIgd2FrZS4gQSBtYW5pYyBhbmQgaW1wdWxzaXZlIGNyaW1pbmFsLCBzaGUgZGVzcGlzZXMgbm90aGluZyBtb3JlIHRoYW4gYm9yZWRvbSwgYW5kIGdsZWVmdWxseSBicmluZ3MgaGVyIG93biB2b2xhdGlsZSBicmFuZCBvZiBwYW5kZW1vbml1bSB0byAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImthbGlzdGFcIixcbiAgICBcImtleVwiOiBcIjQyOVwiLFxuICAgIFwibmFtZVwiOiBcIkthbGlzdGFcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFNwZWFyIG9mIFZlbmdlYW5jZVwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hcmtzbWFuXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MTcuNzYsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODMsXG4gICAgICBcIm1wXCI6IDIzMS44LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDM1LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzI1LFxuICAgICAgXCJhcm1vclwiOiAxOS4wMTIsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDYsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYuMyxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDYzLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAyLjksXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjAzLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuNVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9LYWxpc3RhLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDI0MCxcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnV2hlbiB3cm9uZ2VkLCB3ZSBzZWVrIGp1c3RpY2UuIFdoZW4gaHVydCwgd2Ugc3RyaWtlIGJhY2suIFdoZW4gYmV0cmF5ZWQsIHRoZSBTcGVhciBvZiBWZW5nZWFuY2Ugc3RyaWtlcyEnJzxicj48YnI+QSBzcGVjdGVyIG9mIHdyYXRoIGFuZCByZXRyaWJ1dGlvbiwgS2FsaXN0YSBpcyB0aGUgdW5keWluZyBzcGlyaXQgb2YgdmVuZ2VhbmNlLCBhbiBhcm1vcmVkIG5pZ2h0bWFyZSBzdW1tb25lZCBmcm9tIHRoZSBTaGFkb3cgSXNsZXMgdG8gLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJrYXJtYVwiLFxuICAgIFwia2V5XCI6IFwiNDNcIixcbiAgICBcIm5hbWVcIjogXCJLYXJtYVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgRW5saWdodGVuZWQgT25lXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiLFxuICAgICAgXCJTdXBwb3J0XCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MjIuNDQsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODMsXG4gICAgICBcIm1wXCI6IDM3NCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA1MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMjAuMzg0LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuOCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDUyNSxcbiAgICAgIFwiaHByZWdlblwiOiA1LjYyLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA4LjUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1My41NDQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjNcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vS2FybWEucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogMjg4LFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiS2FybWEgaXMgYSB3b21hbiBvZiBpbmRvbWl0YWJsZSB3aWxsIGFuZCB1bmJvdW5kIHNwaXJpdHVhbCBwb3dlci4gU2hlIGlzIHRoZSBzb3VsIG9mIElvbmlhIG1hZGUgbWFuaWZlc3QgYW5kIGFuIGluc3BpcmluZyBwcmVzZW5jZSBvbiB0aGUgYmF0dGxlZmllbGQsIHNoaWVsZGluZyBoZXIgYWxsaWVzIGFuZCB0dXJuaW5nIGJhY2sgaGVyIGZvZXMuIEEgc3Ryb25nIGxlYWRlciB0b3JuIGJldHdlZW4gdHJhZGl0aW9uIGFuZCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImthcnRodXNcIixcbiAgICBcImtleVwiOiBcIjMwXCIsXG4gICAgXCJuYW1lXCI6IFwiS2FydGh1c1wiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgRGVhdGhzaW5nZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MTYsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNzUsXG4gICAgICBcIm1wXCI6IDM3Mi40OCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA2MSxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMjAuODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNDUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDYuNDIsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA0NS42NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4yNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjExXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0thcnRodXMucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogMzM2LFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydEZWF0aCBpcyBub3QgdGhlIGVuZCBvZiB0aGUgam91cm5leSwgaXQgaXMganVzdCB0aGUgYmVnaW5uaW5nLi4uJyc8YnI+PGJyPlRoZSBoYXJiaW5nZXIgb2Ygb2JsaXZpb24sIEthcnRodXMgaXMgYW4gdW5keWluZyBzcGlyaXQgd2hvc2UgaGF1bnRpbmcgc29uZ3MgYXJlIGEgcHJlbHVkZSB0byB0aGUgaG9ycm9yIG9mIGhpcyBuaWdodG1hcmlzaCBhcHBlYXJhbmNlLiBUaGUgbGl2aW5nIGZlYXIgdGhlIGV0ZXJuaXR5IG9mIHVuZGVhdGgsLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJrYXNzYWRpblwiLFxuICAgIFwia2V5XCI6IFwiMzhcIixcbiAgICBcIm5hbWVcIjogXCJLYXNzYWRpblwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgVm9pZCBXYWxrZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJBc3Nhc3NpblwiLFxuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NjQuMDQsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNzgsXG4gICAgICBcIm1wXCI6IDM5Ny42LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDY3LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQwLFxuICAgICAgXCJhcm1vclwiOiAyMy4zNzYsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy4yLFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDcuNzksXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjUsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU4Ljg1MixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy45LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wMjMsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMy43XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0thc3NhZGluLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDM4NCxcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRoZXJlIGlzIGEgcGxhY2UgYmV0d2VlbiBkaW1lbnNpb25zIGFuZCBiZXR3ZWVuIHdvcmxkcy4gVG8gc29tZSBpdCBpcyBrbm93biBhcyB0aGUgT3V0c2lkZSwgdG8gb3RoZXJzIGl0IGlzIHRoZSBVbmtub3duLiBUbyBtb3N0LCBob3dldmVyLCBpdCBpcyBjYWxsZWQgdGhlIFZvaWQuIERlc3BpdGUgaXRzIG5hbWUsIHRoZSBWb2lkIGlzIG5vdCBhbiBlbXB0eSBwbGFjZSwgYnV0IHJhdGhlciB0aGUgaG9tZSBvZiB1bnNwZWFrYWJsZSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImthdGFyaW5hXCIsXG4gICAgXCJrZXlcIjogXCI1NVwiLFxuICAgIFwibmFtZVwiOiBcIkthdGFyaW5hXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBTaW5pc3RlciBCbGFkZVwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkFzc2Fzc2luXCIsXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUxMCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MyxcbiAgICAgIFwibXBcIjogMCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQ1LFxuICAgICAgXCJhcm1vclwiOiAyNi44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA0LjUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDAsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTgsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMixcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDUsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi43NFxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9LYXRhcmluYS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiA0MzIsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJEcml2ZW4gYnkgYW4gaW50ZW5zZSBraWxsZXIgaW5zdGluY3QsIEthdGFyaW5hIHVzZXMgaGVyIHRhbGVudHMgYXMgYW4gYXNzYXNzaW4gZm9yIHRoZSBnbG9yeSBvZiBOb3h1cywgYW5kIHRoZSBjb250aW51ZWQgZWxldmF0aW9uIG9mIGhlciBmYW1pbHkuIFdoaWxlIGhlciBmZXJ2b3IgZHJpdmVzIGhlciB0byBldmVyLWdyZWF0ZXIgZmVhdHMsIGl0IGNhbiBzb21ldGltZXMgbGVhZCBoZXIgYXN0cmF5Ljxicj48YnI+RnJvbSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImtheWxlXCIsXG4gICAgXCJrZXlcIjogXCIxMFwiLFxuICAgIFwibmFtZVwiOiBcIktheWxlXCIsXG4gICAgXCJ0aXRsZVwiOiBcIlRoZSBKdWRpY2F0b3JcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIlN1cHBvcnRcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU3NC4yNCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5MyxcbiAgICAgIFwibXBcIjogMzIyLjIsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDI2Ljg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA4LjI2LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC43NSxcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTEsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDIuOCxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDIsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi4yXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0theWxlLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDAsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJJbiBhIHdvcmxkIGZhciBhd2F5IHdoZXJlIGFuIGFuY2llbnQgd2FyIHN0aWxsIHJhZ2VzLCBLYXlsZSB3YXMgYSBncmVhdCBoZXJvIC0gdGhlIHN0cm9uZ2VzdCBvZiBhbiBpbW1vcnRhbCByYWNlIGNvbW1pdHRlZCB0byBkZXN0cm95aW5nIGV2aWwgd2hlcmV2ZXIgaXQgY291bGQgYmUgZm91bmQuIEZvciB0ZW4gdGhvdXNhbmQgeWVhcnMsIEtheWxlIGZvdWdodCB0aXJlbGVzc2x5IGZvciBoZXIgcGVvcGxlLCB3aWVsZGluZyBoZXIgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJrZW5uZW5cIixcbiAgICBcImtleVwiOiBcIjg1XCIsXG4gICAgXCJuYW1lXCI6IFwiS2VubmVuXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBIZWFydCBvZiB0aGUgVGVtcGVzdFwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIixcbiAgICAgIFwiTWFya3NtYW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUzNS43MixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA3OSxcbiAgICAgIFwibXBcIjogMjAwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDI0LjMsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy43NSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDU1MCxcbiAgICAgIFwiaHByZWdlblwiOiA1LjU5LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42NSxcbiAgICAgIFwibXByZWdlblwiOiA1MCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1MC41NDQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDk0NyxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzLjRcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vS2VubmVuLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQ4LFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGhlcmUgZXhpc3RzIGFuIGFuY2llbnQgb3JkZXIgb3JpZ2luYXRpbmcgaW4gdGhlIElvbmlhbiBJc2xlcyBkZWRpY2F0ZWQgdG8gdGhlIHByZXNlcnZhdGlvbiBvZiBiYWxhbmNlLiBPcmRlciwgY2hhb3MsIGxpZ2h0LCBkYXJrbmVzcyAtLSBhbGwgdGhpbmdzIG11c3QgZXhpc3QgaW4gcGVyZmVjdCBoYXJtb255IGZvciBzdWNoIGlzIHRoZSB3YXkgb2YgdGhlIHVuaXZlcnNlLiBUaGlzIG9yZGVyIGlzIGtub3duIGFzIHRoZSBLaW5rb3UgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJraGF6aXhcIixcbiAgICBcImtleVwiOiBcIjEyMVwiLFxuICAgIFwibmFtZVwiOiBcIktoYSdaaXhcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFZvaWRyZWF2ZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJBc3Nhc3NpblwiLFxuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NzIuOCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NSxcbiAgICAgIFwibXBcIjogMzI3LjIsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNTAsXG4gICAgICBcImFybW9yXCI6IDI3LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA3LjUxLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC43NSxcbiAgICAgIFwibXByZWdlblwiOiA3LjU5LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC41LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTUuMjA4LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjEsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA2NSxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjdcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vS2hheml4LnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDk2LFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiQSB2aWNpb3VzIFZvaWQgcHJlZGF0b3IsIEtoYSdaaXggaW5maWx0cmF0ZWQgVmFsb3JhbiB0byBkZXZvdXIgdGhlIGxhbmQncyBtb3N0IHByb21pc2luZyBjcmVhdHVyZXMuIFdpdGggZWFjaCBraWxsIGhlIGFic29yYnMgaGlzIHByZXkncyBzdHJlbmd0aCwgZXZvbHZpbmcgdG8gZ3JvdyBtb3JlIHBvd2VyZnVsLiBLaGEnWml4IGh1bmdlcnMgbW9zdCB0byBjb25xdWVyIGFuZCBjb25zdW1lIFJlbmdhciwgdGhlIG9uZSBiZWFzdCBoZSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImtpbmRyZWRcIixcbiAgICBcImtleVwiOiBcIjIwM1wiLFxuICAgIFwibmFtZVwiOiBcIktpbmRyZWRcIixcbiAgICBcInRpdGxlXCI6IFwiVGhlIEV0ZXJuYWwgSHVudGVyc1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hcmtzbWFuXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NDAsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODUsXG4gICAgICBcIm1wXCI6IDMwMCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAzNSxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMyNSxcbiAgICAgIFwiYXJtb3JcIjogMjAsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTAwLFxuICAgICAgXCJocHJlZ2VuXCI6IDcsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYuOTcsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjQsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMS43LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuNVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9LaW5kcmVkLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDE0NCxcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnVGVsbCBtZSBhZ2FpbiwgbGl0dGxlIExhbWIsIHdoaWNoIHRoaW5ncyBhcmUgb3VycyB0byB0YWtlPycnPGJyPicnQWxsIHRoaW5ncywgRGVhciBXb2xmLicnPGJyPlNlcGFyYXRlLCBidXQgbmV2ZXIgcGFydGVkLCBLaW5kcmVkIHJlcHJlc2VudHMgdGhlIHR3aW4gZXNzZW5jZXMgb2YgZGVhdGguIExhbWIncyBhcnJvdyBvZmZlcnMgYSBzd2lmdCByZWxlYXNlIGZvciB0aG9zZSB3aG8gYWNjZXB0IHRoZWlyIGZhdGUuIFdvbGYgaHVudHMgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJrbGVkXCIsXG4gICAgXCJrZXlcIjogXCIyNDBcIixcbiAgICBcIm5hbWVcIjogXCJLbGVkXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBDYW50YW5rZXJvdXMgQ2F2YWxpZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIlRhbmtcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDM0MCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA3MCxcbiAgICAgIFwibXBcIjogMTAwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDUsXG4gICAgICBcImFybW9yXCI6IDI2LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDQsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA2LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC43NSxcbiAgICAgIFwibXByZWdlblwiOiAwLFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU1LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDMuNVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9LbGVkLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb240LnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQ4LFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydBIHNhbmUgbWFuIHdvdWxkIHJ1biAuIC4gLiBidXQgSSBhaW4ndCB0aGUgcnVubmluJyBraW5kIScnPGJyPjxicj5BIHdhcnJpb3IgYXMgZmVhcmxlc3MgYXMgaGUgaXMgb3JuZXJ5LCBLbGVkIGlzIGEgcG9wdWxhciBmb2xrIGhlcm8gaW4gTm94dXMuIEVtYm9keWluZyB0aGUgZnVyaW91cyBicmF2YWRvIG9mIGhpcyBuYXRpb24sIGhlIGlzIGFuIGljb24gYmVsb3ZlZCBieSB0aGUgZW1waXJlJ3Mgc29sZGllcnMsIGRpc3RydXN0ZWQgYnkgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJrb2dtYXdcIixcbiAgICBcImtleVwiOiBcIjk2XCIsXG4gICAgXCJuYW1lXCI6IFwiS29nJ01hd1wiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgTW91dGggb2YgdGhlIEFieXNzXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFya3NtYW5cIixcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTE3Ljc2LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgyLFxuICAgICAgXCJtcFwiOiAzMjIuMixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMyNSxcbiAgICAgIFwiYXJtb3JcIjogMTkuODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTAwLFxuICAgICAgXCJocHJlZ2VuXCI6IDUuOTIsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDguNjc1LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC43LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTcuNDYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDIuNDEsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA2LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuNjVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vS29nTWF3LnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDE5MixcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnSWYgdGhhdCdzIGp1c3QgaHVuZ3J5LCBJIGRvbid0IHdhbnQgdG8gc2VlIGFuZ3J5LicnPGJyPjxicj5XaGVuIHRoZSBwcm9waGV0IE1hbHphaGFyIHdhcyByZWJvcm4gaW4gSWNhdGhpYSwgaGUgd2FzIGxlZCB0aGVyZSBieSBhbiBvbWlub3VzIHZvaWNlIHdoaWNoIHRoZXJlYWZ0ZXIgYW5jaG9yZWQgaXRzZWxmIHRvIGhpcyBwc3ljaGUuIEZyb20gd2l0aGluLCB0aGlzIHZvaWNlIGJlc3Rvd2VkIHVwb24gaGltIHRlcnJpYmxlIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwibGVibGFuY1wiLFxuICAgIFwia2V5XCI6IFwiN1wiLFxuICAgIFwibmFtZVwiOiBcIkxlQmxhbmNcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIERlY2VpdmVyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiQXNzYXNzaW5cIixcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTE2LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDc1LFxuICAgICAgXCJtcFwiOiAzMzQsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNTAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDIxLjg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDUyNSxcbiAgICAgIFwiaHByZWdlblwiOiA3LjQyLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTQuODgsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAxLjRcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vTGVibGFuYy5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiAyNDAsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJFdmVyeSBjaXR5IGhhcyBpdHMgZGFyayBzaWRlLCBldmVuIG9uZSB3aG9zZSByZXB1dGF0aW9uIGlzIGFscmVhZHkgb2YgYSBxdWVzdGlvbmFibGUgaHVlLiBOb3h1cyAtIHRob3VnaCBpdHMgbmFtZSBpcyBhbHJlYWR5IGludm9rZWQgd2l0aCBhIG1peHR1cmUgb2YgcmV2ZXJlbmNlIGFuZCByZXZ1bHNpb24gLSBpcyBubyBleGNlcHRpb24gdG8gdGhpcyBzaW1wbGUgdHJ1dGguIERlZXAgd2l0aGluIHRoZSB3aW5kaW5nIGR1bmdlb25zIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwibGVlc2luXCIsXG4gICAgXCJrZXlcIjogXCI2NFwiLFxuICAgIFwibmFtZVwiOiBcIkxlZSBTaW5cIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEJsaW5kIE1vbmtcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIkFzc2Fzc2luXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NzAuOCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NSxcbiAgICAgIFwibXBcIjogMjAwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNTAsXG4gICAgICBcImFybW9yXCI6IDI0LjIxNixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjcsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA3LjQyNSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNyxcbiAgICAgIFwibXByZWdlblwiOiA1MCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA2MS4xNzYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMixcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDQsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogM1xuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9MZWVTaW4ucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogMjg4LFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiQXMgYSB5b3VuZyB0ZWVuLCBMZWUgU2luIHdhcyBpbnRlbnQgb24gYmVjb21pbmcgYSBzdW1tb25lci4gSGlzIHdpbGwgYW5kIGRlZGljYXRpb24gd2VyZSB1bm1hdGNoZWQgYnkgYW55IG9mIGhpcyBwZWVycywgYW5kIGhpcyBza2lsbCBkcmV3IHRoZSBhdHRlbnRpb24gb2YgUmVnaW5hbGQgQXNocmFtLCB0aGUgTGVhZ3VlJ3MgSGlnaCBDb3VuY2lsb3IgYXQgdGhlIHRpbWUuIFdoaWxlIHN0dWR5aW5nIGF0IHRoZSBBcmNhbnVtIE1ham9yaXMsLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJsZW9uYVwiLFxuICAgIFwia2V5XCI6IFwiODlcIixcbiAgICBcIm5hbWVcIjogXCJMZW9uYVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgUmFkaWFudCBEYXduXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiVGFua1wiLFxuICAgICAgXCJTdXBwb3J0XCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NzYuMTYsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODcsXG4gICAgICBcIm1wXCI6IDMwMi4yLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAyNy4yMDgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy42LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOC40MjUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjg1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA2MC4wNCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjlcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vTGVvbmEucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogMzM2LFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydJZiB5b3Ugd291bGQgc2hpbmUgbGlrZSBhIHN1biwgZmlyc3QgeW91IG11c3QgYnVybiBsaWtlIG9uZS4nJzxicj48YnI+SW1idWVkIHdpdGggdGhlIGZpcmUgb2YgdGhlIHN1biwgTGVvbmEgaXMgYSB3YXJyaW9yIHRlbXBsYXIgb2YgdGhlIFNvbGFyaSB3aG8gZGVmZW5kcyBNb3VudCBUYXJnb24gd2l0aCBoZXIgWmVuaXRoIEJsYWRlIGFuZCBTaGllbGQgb2YgRGF5YnJlYWsuIEhlciBza2luIHNoaW1tZXJzIHdpdGggc3RhcmZpcmUgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJsaXNzYW5kcmFcIixcbiAgICBcImtleVwiOiBcIjEyN1wiLFxuICAgIFwibmFtZVwiOiBcIkxpc3NhbmRyYVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgSWNlIFdpdGNoXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTA2LjEyLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDc1LFxuICAgICAgXCJtcFwiOiAzMDQsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNTAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMjUsXG4gICAgICBcImFybW9yXCI6IDIwLjIxNixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjcsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1NTAsXG4gICAgICBcImhwcmVnZW5cIjogNi45MixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogNS42NyxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUwLjUzNixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMi43LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDEuMzZcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vTGlzc2FuZHJhLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDM4NCxcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkxpc3NhbmRyYSdzIG1hZ2ljIHR3aXN0cyB0aGUgcHVyZSBwb3dlciBvZiBpY2UgaW50byBzb21ldGhpbmcgZGFyayBhbmQgdGVycmlibGUuIFdpdGggdGhlIGZvcmNlIG9mIGhlciBibGFjayBpY2UsIHNoZSBkb2VzIG1vcmUgdGhhbiBmcmVlemUgLSBzaGUgaW1wYWxlcyBhbmQgY3J1c2hlcyB0aG9zZSB3aG8gb3Bwb3NlIGhlci4gVG8gdGhlIHRlcnJpZmllZCBkZW5pemVucyBvZiB0aGUgbm9ydGgsIHNoZSBpcyBrbm93biBvbmx5IGFzIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwibHVjaWFuXCIsXG4gICAgXCJrZXlcIjogXCIyMzZcIixcbiAgICBcIm5hbWVcIjogXCJMdWNpYW5cIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFB1cmlmaWVyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFya3NtYW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU1NC40LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgwLFxuICAgICAgXCJtcFwiOiAzNDguODgsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMzgsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDI0LjA0LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1MDAsXG4gICAgICBcImhwcmVnZW5cIjogNi4xOSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNjUsXG4gICAgICBcIm1wcmVnZW5cIjogOC4xNzUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjcsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1Ny40NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMi40MSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDIsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMy4zXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0x1Y2lhbi5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiA0MzIsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJMdWNpYW4gd2llbGRzIHJlbGljIHdlYXBvbnMgaW1idWVkIHdpdGggYW5jaWVudCBwb3dlciBhbmQgc3RhbmRzIGEgc3RhbHdhcnQgZ3VhcmRpYW4gYWdhaW5zdCB0aGUgdW5kZWFkLiBIaXMgY29sZCBjb252aWN0aW9uIG5ldmVyIHdhdmVycywgZXZlbiBpbiB0aGUgZmFjZSBvZiB0aGUgbWFkZGVuaW5nIGhvcnJvcnMgaGUgZGVzdHJveXMgYmVuZWF0aCBoaXMgaGFpbCBvZiBwdXJpZnlpbmcgZmlyZS4gTHVjaWFuIHdhbGtzIGFsb25lIG9uIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwibHVsdVwiLFxuICAgIFwia2V5XCI6IFwiMTE3XCIsXG4gICAgXCJuYW1lXCI6IFwiTHVsdVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgRmFlIFNvcmNlcmVzc1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlN1cHBvcnRcIixcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTUyLjc2LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDc0LFxuICAgICAgXCJtcFwiOiAzNTAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNTUsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzAsXG4gICAgICBcImFybW9yXCI6IDE5LjIxNixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjcsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1NTAsXG4gICAgICBcImhwcmVnZW5cIjogNi4wMDUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjYsXG4gICAgICBcIm1wcmVnZW5cIjogMTEsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjYsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA0Ni4zNjgsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDIuNixcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjI1XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0x1bHUucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogMCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiUGVyaGFwcyBtb3JlIHRoYW4gYW55IG90aGVyIGNoYW1waW9uIGluIHRoZSBMZWFndWUsIEx1bHUgbWFyY2hlcyB0byB0aGUgYmVhdCBvZiBoZXIgb3duIGRydW0uIER1cmluZyBoZXIgeW91dGggaW4gQmFuZGxlIENpdHksIHNoZSBzcGVudCBtb3N0IG9mIGhlciB0aW1lIHdhbmRlcmluZyBhbG9uZSBpbiB0aGUgZm9yZXN0IG9yIGxvc3QgaW4gYSBkYXlkcmVhbS4gSXQgd2Fzbid0IHRoYXQgc2hlIHdhcyBhbnRpc29jaWFsOyB0aGUgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJsdXhcIixcbiAgICBcImtleVwiOiBcIjk5XCIsXG4gICAgXCJuYW1lXCI6IFwiTHV4XCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBMYWR5IG9mIEx1bWlub3NpdHlcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCIsXG4gICAgICBcIlN1cHBvcnRcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDQ3Ny43MixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA3OSxcbiAgICAgIFwibXBcIjogMzg0LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQ3LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzMwLFxuICAgICAgXCJhcm1vclwiOiAxOC43MixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiA0LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDUuNDIsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1My41NDQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAxLjM2XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0x1eC5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiA0OCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiQm9ybiB0byB0aGUgcHJlc3RpZ2lvdXMgQ3Jvd25ndWFyZHMsIHRoZSBwYXJhZ29uIGZhbWlseSBvZiBEZW1hY2lhbiBzZXJ2aWNlLCBMdXhhbm5hIHdhcyBkZXN0aW5lZCBmb3IgZ3JlYXRuZXNzLiBTaGUgZ3JldyB1cCBhcyB0aGUgZmFtaWx5J3Mgb25seSBkYXVnaHRlciwgYW5kIHNoZSBpbW1lZGlhdGVseSB0b29rIHRvIHRoZSBhZHZhbmNlZCBlZHVjYXRpb24gYW5kIGxhdmlzaCBwYXJ0aWVzIHJlcXVpcmVkIG9mIGZhbWlsaWVzIGFzIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwibWFscGhpdGVcIixcbiAgICBcImtleVwiOiBcIjU0XCIsXG4gICAgXCJuYW1lXCI6IFwiTWFscGhpdGVcIixcbiAgICBcInRpdGxlXCI6IFwiU2hhcmQgb2YgdGhlIE1vbm9saXRoXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiVGFua1wiLFxuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NzQuMixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5MCxcbiAgICAgIFwibXBcIjogMjgyLjIsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDI4LjMsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy43NSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDcsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuMzIsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNjEuOTcsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMzc1LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wMixcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzLjRcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vTWFscGhpdGUucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogOTYsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRoZXJlIGlzIGEgd29ybGQgb2YgcGVyZmVjdCBoYXJtb255LCB3aGVyZSBhbGwgYXJlIHBhcnQgb2YgdGhlIHdob2xlLiBUaGUgTW9ub2xpdGggaXMgdGhlIGVzc2VuY2Ugb2YgYWxsIGNyZWF0aW9uLCBhbmQgaXRzIGRlbml6ZW5zIGFyZSBidXQgc2luZ3VsYXIgcGllY2VzIG9mIGl0LiBJdCBpcyBiZWF1dGlmdWwgaW4gaXRzIHN5bW1ldHJ5LCBhbmQgaW4gaXRzIGFsbW9zdCBjb21wbGV0ZSBsYWNrIG9mIHVuY2VydGFpbnR5LiBUaGUgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJtYWx6YWhhclwiLFxuICAgIFwia2V5XCI6IFwiOTBcIixcbiAgICBcIm5hbWVcIjogXCJNYWx6YWhhclwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgUHJvcGhldCBvZiB0aGUgVm9pZFwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIixcbiAgICAgIFwiQXNzYXNzaW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUyNSxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA3NSxcbiAgICAgIFwibXBcIjogMzAwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDU1LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAyMCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1MDAsXG4gICAgICBcImhwcmVnZW5cIjogNixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNixcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTUsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMS41XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL01hbHphaGFyLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDE0NCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiTWFueSBtZW4gaGF2ZSBnb25lIG1hZCBiZW5lYXRoIHRoZSBnbGFyZSBvZiB0aGUgU2h1cmltYSBzdW4sIGJ1dCBpdCB3YXMgZHVyaW5nIHRoZSBuaWdodCdzIGNoaWxsaW5nIGVtYnJhY2UgdGhhdCBNYWx6YWhhciByZWxpbnF1aXNoZWQgaGlzIHNhbml0eS4gTWFsemFoYXIgd2FzIGJvcm4gYSBzZWVyLCBibGVzc2VkIHdpdGggdGhlIGdpZnQgb2YgcHJvcGhlY3kuIEhpcyB0YWxlbnQsIHRob3VnaCB1bnJlZmluZWQsIHByb21pc2VkIHRvIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwibWFva2FpXCIsXG4gICAgXCJrZXlcIjogXCI1N1wiLFxuICAgIFwibmFtZVwiOiBcIk1hb2thaVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgVHdpc3RlZCBUcmVhbnRcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJUYW5rXCIsXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU3Mi4yLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDkwLFxuICAgICAgXCJtcFwiOiAzNzcuMjgsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDMsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDI4LjcyLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDQsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA3LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC43NSxcbiAgICAgIFwibXByZWdlblwiOiA3LjIwNSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNDUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA2My41NDQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMSxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjEyNVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9NYW9rYWkucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogMTkyLFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ0FsbCBhcm91bmQgbWUgYXJlIGVtcHR5IGh1c2tzLCBzb3VsbGVzcyBhbmQgdW5hZnJhaWQuLi4gYnV0IEkgd2lsbCBicmluZyB0aGVtIGZlYXIuJyc8YnI+PGJyPk1hb2thaSBpcyBhIHJhZ2VmdWwsIHRvd2VyaW5nIHRyZWFudCB3aG8gZmlnaHRzIHRoZSB1bm5hdHVyYWwgaG9ycm9ycyBvZiB0aGUgU2hhZG93IElzbGVzLiBIZSB3YXMgdHdpc3RlZCBpbnRvIGEgZm9yY2Ugb2YgdmVuZ2VhbmNlIGFmdGVyIGEgbWFnaWNhbCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIm1hc3RlcnlpXCIsXG4gICAgXCJrZXlcIjogXCIxMVwiLFxuICAgIFwibmFtZVwiOiBcIk1hc3RlciBZaVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgV3VqdSBCbGFkZXNtYW5cIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJBc3Nhc3NpblwiLFxuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1OTguNTYsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTIsXG4gICAgICBcIm1wXCI6IDI1MC41NixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MixcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM1NSxcbiAgICAgIFwiYXJtb3JcIjogMjQuMDQsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMyxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDcuNTksXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjY1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuMjU1LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC40NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDYwLjA0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wOCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL01hc3RlcllpLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDI0MCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGhyb3VnaCB0aGUgYW5jaWVudCBtYXJ0aWFsIGFydCBvZiBXdWp1LCBNYXN0ZXIgWWkgaGFzIHRlbXBlcmVkIGhpcyBib2R5IGFuZCBzaGFycGVuZWQgaGlzIG1pbmQgdW50aWwgdGhvdWdodCBhbmQgYWN0aW9uIGhhdmUgYmVjb21lIG9uZS4gVGhvdWdoIGhlIGNob29zZXMgdG8gZW50ZXIgaW50byB2aW9sZW5jZSBhcyBhIGxhc3QgcmVzb3J0LCB0aGUgZ3JhY2UgYW5kIHNwZWVkIHdpdGggd2hpY2ggaGUgd2llbGRzIGhpcyBibGFkZSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIm1pc3Nmb3J0dW5lXCIsXG4gICAgXCJrZXlcIjogXCIyMVwiLFxuICAgIFwibmFtZVwiOiBcIk1pc3MgRm9ydHVuZVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgQm91bnR5IEh1bnRlclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hcmtzbWFuXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MzAsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODUsXG4gICAgICBcIm1wXCI6IDMyNS44NCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAzNSxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMyNSxcbiAgICAgIFwiYXJtb3JcIjogMjQuMDQsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMyxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDU1MCxcbiAgICAgIFwiaHByZWdlblwiOiA2LjE5LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42NSxcbiAgICAgIFwibXByZWdlblwiOiA4LjA0LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC42NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDQ2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAxLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNDczNCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL01pc3NGb3J0dW5lLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDI4OCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydUaGUgYmlnZ2VyIHRoZSByaXNrLCB0aGUgYmlnZ2VyIHRoZSBib3VudHkuJyc8YnI+PGJyPkJlYXV0eSBhbmQgZGFuZ2VyOiBUaGVyZSBhcmUgZmV3IHdobyBjYW4gbWF0Y2ggTWlzcyBGb3J0dW5lIGluIGVpdGhlci4gT25lIG9mIEJpbGdld2F0ZXIncyBtb3N0IGluZmFtb3VzIGJvdW50eSBodW50ZXJzLCBzaGUgYnVpbHQgaGVyIGxlZ2VuZCB1cG9uIGEgc3dhdGhlIG9mIGJ1bGxldC1yaWRkbGVkIGNvcnBzZXMgYW5kIGNhcHR1cmVkIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwibW9ua2V5a2luZ1wiLFxuICAgIFwia2V5XCI6IFwiNjJcIixcbiAgICBcIm5hbWVcIjogXCJXdWtvbmdcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIE1vbmtleSBLaW5nXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJUYW5rXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NzcuOCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NSxcbiAgICAgIFwibXBcIjogMjY1Ljg0LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDM4LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQ1LFxuICAgICAgXCJhcm1vclwiOiAyNC44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDE3NSxcbiAgICAgIFwiaHByZWdlblwiOiA2LjE5LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42NSxcbiAgICAgIFwibXByZWdlblwiOiA4LjA0LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC42NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU5Ljg3NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4yLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL01vbmtleUtpbmcucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogMzM2LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJEdXJpbmcgdGhlIGNoYW9zIG9mIHRoZSBSdW5lIFdhcnMsIGFuIGVub3Jtb3VzIHJ1bmVzdG9uZSB3YXMgbG9zdCBkZWVwIHdpdGhpbiB0aGUgUGxhZ3VlIEp1bmdsZXMuIEl0IHJlbWFpbmVkIHRoZXJlLCB1bnRvdWNoZWQgZm9yIGNlbnR1cmllcywgZW1hbmF0aW5nIGEgcG90ZW50IG1hZ2ljIHdoaWNoIGluZnVzZWQgbmVhcmJ5IHdpbGRsaWZlIHdpdGggc2VudGllbmNlIGFuZCB2aXRhbGl0eS4gQSBncm91cCBvZiBtb25rZXlzIHdobyAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIm1vcmRla2Fpc2VyXCIsXG4gICAgXCJrZXlcIjogXCI4MlwiLFxuICAgIFwibmFtZVwiOiBcIk1vcmRla2Fpc2VyXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBJcm9uIFJldmVuYW50XCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTI1LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDczLFxuICAgICAgXCJtcFwiOiAwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMjUsXG4gICAgICBcImFybW9yXCI6IDIwLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNzUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDE3NSxcbiAgICAgIFwiaHByZWdlblwiOiA0LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC4zLFxuICAgICAgXCJtcHJlZ2VuXCI6IDAsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNjEsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAuMDQsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi4yXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL01vcmRla2Fpc2VyLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDM4NCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydBbGwgdGhpbmdzIG11c3QgZGllLi4uIGFuZCB5ZXQgSSBsaXZlIG9uLicnPGJyPjxicj5UaGUgYmFsZWZ1bCByZXZlbmFudCBNb3JkZWthaXNlciBpcyBhbW9uZyB0aGUgbW9zdCB0ZXJyaWZ5aW5nIGFuZCBoYXRlZnVsIHNwaXJpdHMgaGF1bnRpbmcgdGhlIFNoYWRvdyBJc2xlcy4gSGUgaGFzIGV4aXN0ZWQgZm9yIGNvdW50bGVzcyBjZW50dXJpZXMsIHNoaWVsZGVkIGZyb20gdHJ1ZSBkZWF0aCBieSBuZWNyb21hbnRpYyBzb3JjZXJ5IC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwibW9yZ2FuYVwiLFxuICAgIFwia2V5XCI6IFwiMjVcIixcbiAgICBcIm5hbWVcIjogXCJNb3JnYW5hXCIsXG4gICAgXCJ0aXRsZVwiOiBcIkZhbGxlbiBBbmdlbFwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIixcbiAgICAgIFwiU3VwcG9ydFwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTQ3LjQ4LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg2LFxuICAgICAgXCJtcFwiOiAzNDAuOCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA2MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMjUuMzg0LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuOCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDQ1MCxcbiAgICAgIFwiaHByZWdlblwiOiA1LjcwNSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNixcbiAgICAgIFwibXByZWdlblwiOiA4LjUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NS40NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDEuNTNcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vTW9yZ2FuYS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiA0MzIsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRoZXJlIGlzIGEgd29ybGQgZmFyIGF3YXkgcG9wdWxhdGVkIGJ5IGdyYWNlZnVsIGFuZCBiZWF1dGlmdWwgd2luZ2VkIGJlaW5ncyBnaWZ0ZWQgd2l0aCBpbW1vcnRhbGl0eSwgd2hlcmUgYW4gYW5jaWVudCBjb25mbGljdCBzdGlsbCByYWdlcy4gTGlrZSBzbyBtYW55IGNvbmZsaWN0cywgdGhpcyB3YXIgc3BsaXQgZmFtaWxpZXMuIE9uZSBzaWRlIHByb2NsYWltZWQgdGhlbXNlbHZlcyBhcyBiZWluZ3Mgb2YgcGVyZmVjdCBvcmRlciBhbmQgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJuYW1pXCIsXG4gICAgXCJrZXlcIjogXCIyNjdcIixcbiAgICBcIm5hbWVcIjogXCJOYW1pXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBUaWRlY2FsbGVyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiU3VwcG9ydFwiLFxuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA0ODkuMzIsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNzQsXG4gICAgICBcIm1wXCI6IDM3Ny4yNCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MyxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMTkuNzIsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogNCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDU1MCxcbiAgICAgIFwiaHByZWdlblwiOiA1LjQyLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiAxMS41LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC40LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTEuMjA4LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjEsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjAzLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuNjFcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vTmFtaS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiAwLFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiTmFtaSBjaGFubmVscyB0aGUgcHJpbWFsIGVuZXJnaWVzIG9mIHRoZSBvY2VhbiwgaGFybmVzc2luZyBpdHMgbXlzdGljYWwgcmVzdG9yYXRpdmUgcHJvcGVydGllcyBhbmQgY29tbWFuZGluZyB0aGUgcmF3IHBvd2VyIG9mIHRoZSB0aWRlcyB0aGVtc2VsdmVzLiBUaG91Z2ggbWFueSBkb3VidGVkIGhlciwgTmFtaSBoYWQgdGhlIGJyYXZlcnkgYW5kIGRldGVybWluYXRpb24gdG8gdGFrZSBvbiBhIGRhbmdlcm91cyBxdWVzdCB3aGVuIG5vIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwibmFzdXNcIixcbiAgICBcImtleVwiOiBcIjc1XCIsXG4gICAgXCJuYW1lXCI6IFwiTmFzdXNcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEN1cmF0b3Igb2YgdGhlIFNhbmRzXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJUYW5rXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NjEuMixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5MCxcbiAgICAgIFwibXBcIjogMzI1LjYsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDIsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNTAsXG4gICAgICBcImFybW9yXCI6IDI0Ljg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDkuMDEsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjksXG4gICAgICBcIm1wcmVnZW5cIjogNy40NCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU5LjE4LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjAyLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDMuNDhcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vTmFzdXMucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogNDgsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ1doYXQgd2FzIGZhbGxlbiB3aWxsIGJlIGdyZWF0IGFnYWluLicnPGJyPjxicj5OYXN1cyBpcyBhbiBpbXBvc2luZywgamFja2FsLWhlYWRlZCBBc2NlbmRlZCBiZWluZyBmcm9tIGFuY2llbnQgU2h1cmltYSwgYSBoZXJvaWMgZmlndXJlIHJlZ2FyZGVkIGFzIGEgZGVtaWdvZCBieSB0aGUgcGVvcGxlIG9mIHRoZSBkZXNlcnQuIEZpZXJjZWx5IGludGVsbGlnZW50LCBoZSB3YXMgYSBndWFyZGlhbiBvZiBrbm93bGVkZ2UgYW5kIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwibmF1dGlsdXNcIixcbiAgICBcImtleVwiOiBcIjExMVwiLFxuICAgIFwibmFtZVwiOiBcIk5hdXRpbHVzXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBUaXRhbiBvZiB0aGUgRGVwdGhzXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiVGFua1wiLFxuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NzYuNDgsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODYsXG4gICAgICBcIm1wXCI6IDMzNCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0NyxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMyNSxcbiAgICAgIFwiYXJtb3JcIjogMjYuNDYsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy43NSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTc1LFxuICAgICAgXCJocHJlZ2VuXCI6IDguMzcsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDguNjI1LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC43LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTcuNTQ0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAuMDIsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9OYXV0aWx1cy5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiA5NixcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIk9uY2UsIE5hdXRpbHVzIHdhcyBhIHNhaWxvciBjb21taXNzaW9uZWQgYnkgdGhlIEluc3RpdHV0ZSBvZiBXYXIgdG8gZXhwbG9yZSB0aGUgdW5jaGFydGVkIHJlYWNoZXMgb2YgdGhlIEd1YXJkaWFuJ3MgU2VhLiBUaGlzIGV4cGVkaXRpb24gdG9vayBoaW0gZGVlcCBpbnRvIHVua25vd24gd2F0ZXJzIHdoZXJlIGhlIGFuZCBoaXMgY3JldyBmb3VuZCBhIHZhc3Qgc2VjdGlvbiBvZiBibGFjayBvb3ppbmcgbGlxdWlkIHRoYXQgbm9uZSBvZiAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIm5pZGFsZWVcIixcbiAgICBcImtleVwiOiBcIjc2XCIsXG4gICAgXCJuYW1lXCI6IFwiTmlkYWxlZVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgQmVzdGlhbCBIdW50cmVzc1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkFzc2Fzc2luXCIsXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUxMS4yLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgwLFxuICAgICAgXCJtcFwiOiAyOTUuNixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0NSxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMjIuODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDYuMDA1LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA0Ny44OCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wMixcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzLjIyXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL05pZGFsZWUucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogMTQ0LFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGhlcmUgYXJlIGZldyBkd2VsbGVycywgbGV0IGFsb25lIGNoYW1waW9ucywgcmVzaWRpbmcgaW4gdGhlIGJsYXN0ZWQgYW5kIGRhbmdlcm91cyBsYW5kcyB0aGF0IGxpZSBzb3V0aCBvZiB0aGUgR3JlYXQgQmFycmllci4gTXVjaCBvZiB0aGF0IHdvcmxkIHN0aWxsIGJlYXJzIHRoZSBzY2FycyBvZiBwYXN0IFJ1bmVzIFdhcnMsIGVzcGVjaWFsbHkgdGhlIG15c3RlcmlvdXMgS3VtdW5ndSBKdW5nbGUuIFRoZXJlIGFyZSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIm5vY3R1cm5lXCIsXG4gICAgXCJrZXlcIjogXCI1NlwiLFxuICAgIFwibmFtZVwiOiBcIk5vY3R1cm5lXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBFdGVybmFsIE5pZ2h0bWFyZVwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkFzc2Fzc2luXCIsXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU4Mi44LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg1LFxuICAgICAgXCJtcFwiOiAyNzMuOCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAzNSxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0NSxcbiAgICAgIFwiYXJtb3JcIjogMjYuODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOC4yNixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNzUsXG4gICAgICBcIm1wcmVnZW5cIjogNi43NTUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjQ1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTkuMjA4LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjEsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA2NSxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjdcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vTm9jdHVybmUucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogMTkyLFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiQmVmb3JlIE5vY3R1cm5lLCBwZW9wbGUgYmVsaWV2ZWQgdGhhdCBkcmVhbXMgd2VyZSBmaWdtZW50cyBvZiB0aGVpciBpbWFnaW5hdGlvbiwgbWVhbmluZ2xlc3MgaW1hZ2VzIHRoYXQgZmxhc2hlZCB0aHJvdWdoIHRoZSBtaW5kIHdoZW4gb25lIHNsZXB0LiBUaGlzIGJlbGllZiB3YXMgcHV0IHRvIHRoZSB0ZXN0IHdoZW4gYSByYXNoIG9mIHNsZWVwLXJlbGF0ZWQgaW5jaWRlbnRzIHN0YXJ0ZWQgYWZmbGljdGluZyBzdW1tb25lcnMgb2YgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJudW51XCIsXG4gICAgXCJrZXlcIjogXCIyMFwiLFxuICAgIFwibmFtZVwiOiBcIk51bnVcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFlldGkgUmlkZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJTdXBwb3J0XCIsXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU5OC4yOCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5MCxcbiAgICAgIFwibXBcIjogMjgzLjU2LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQyLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzUwLFxuICAgICAgXCJhcm1vclwiOiAyNi4zOCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA4LjM5LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuNDQsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1OSxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogNCxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjI1XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL051bnUucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogMjQwLFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiU29tZXRpbWVzIGJvbmRzIG9mIGZyaWVuZHNoaXAgYmVjb21lIHN0cm9uZ2VyIHRoYW4gZXZlbiBib25kcyBvZiBibG9vZC4gV2hlbiB0aG9zZSBib25kcyBsaW5rIGEgZmVhcmxlc3MgYm95IHRvIGEgZmVhcnNvbWUgWWV0aSwgdGhlIGJvbmQgYmVjb21lcyBhIGZvcmNlIHRvIGJlIHJlY2tvbmVkIHdpdGguIEdpdmVuIHRoZSByZXNwb25zaWJpbGl0eSBvZiB0YW1pbmcgYSB0ZXJyaWZ5aW5nIGJlYXN0LCBOdW51IGZvcmdlZCBhIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwib2xhZlwiLFxuICAgIFwia2V5XCI6IFwiMlwiLFxuICAgIFwibmFtZVwiOiBcIk9sYWZcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEJlcnNlcmtlclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiVGFua1wiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTk3LjI0LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDkzLFxuICAgICAgXCJtcFwiOiAzMTUuNixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MixcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM1MCxcbiAgICAgIFwiYXJtb3JcIjogMjYuMDQsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMyxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDguNTEsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjksXG4gICAgICBcIm1wcmVnZW5cIjogNy40NjUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjU3NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU5Ljk4LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjEsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi43XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL09sYWYucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogMjg4LFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiTW9zdCBtZW4gd291bGQgc2F5IHRoYXQgZGVhdGggaXMgYSB0aGluZyB0byBiZSBmZWFyZWQ7IG5vbmUgb2YgdGhvc2UgbWVuIHdvdWxkIGJlIE9sYWYuIFRoZSBCZXJzZXJrZXIgbGl2ZXMgb25seSBmb3IgdGhlIHJvYXIgb2YgYSBiYXR0bGUgY3J5IGFuZCB0aGUgY2xhc2ggb2Ygc3RlZWwuIFNwdXJyZWQgb24gYnkgaGlzIGh1bmdlciBmb3IgZ2xvcnkgYW5kIHRoZSBsb29taW5nIGN1cnNlIG9mIGEgZm9yZ2V0dGFibGUgZGVhdGgsIE9sYWYgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJvcmlhbm5hXCIsXG4gICAgXCJrZXlcIjogXCI2MVwiLFxuICAgIFwibmFtZVwiOiBcIk9yaWFubmFcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIExhZHkgb2YgQ2xvY2t3b3JrXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiLFxuICAgICAgXCJTdXBwb3J0XCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MTcuNzIsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNzksXG4gICAgICBcIm1wXCI6IDMzNCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA1MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMyNSxcbiAgICAgIFwiYXJtb3JcIjogMTcuMDQsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMyxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDUyNSxcbiAgICAgIFwiaHByZWdlblwiOiA2Ljg3LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNDAuMzY4LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAyLjYsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA1LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDMuNVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9Pcmlhbm5hLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDMzNixcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRoZXJlIG9uY2Ugd2FzIGEgUGlsdG92aWFuIG1hbiBuYW1lZCBDb3JpbiBSZXZlY2sgd2hvIGhhZCBhIGRhdWdodGVyIG5hbWVkIE9yaWFubmEsIHdob20gaGUgbG92ZWQgbW9yZSB0aGFuIGFueXRoaW5nIGVsc2UgaW4gdGhlIHdvcmxkLiBUaG91Z2ggT3JpYW5uYSBoYWQgaW5jcmVkaWJsZSB0YWxlbnQgZm9yIGRhbmNpbmcsIHNoZSB3YXMgZGVlcGx5IGZhc2NpbmF0ZWQgYnkgdGhlIGNoYW1waW9ucyBvZiB0aGUgTGVhZ3VlIG9mIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicGFudGhlb25cIixcbiAgICBcImtleVwiOiBcIjgwXCIsXG4gICAgXCJuYW1lXCI6IFwiUGFudGhlb25cIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEFydGlzYW4gb2YgV2FyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJBc3Nhc3NpblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTc5LjE2LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg3LFxuICAgICAgXCJtcFwiOiAzMTcuMTIsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMzEsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNTUsXG4gICAgICBcImFybW9yXCI6IDI3LjY1MixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjksXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDE1MCxcbiAgICAgIFwiaHByZWdlblwiOiA3Ljg0LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42NSxcbiAgICAgIFwibXByZWdlblwiOiA3LjM1NSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNDUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NS41NzIsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDIuOSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDMsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi45NVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9QYW50aGVvbi5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiAzODQsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ0JyaW5nIGZvcnRoIG9uZSB0cnVlIGNoYW1waW9uLCBvciBhIGh1bmRyZWQgbW9yZSBsaWtlIHlvdSwgYW5kIHRoZW4gd2Ugc2hhbGwgaGF2ZSBhIGJhdHRsZSB0aGF0IHdpbGwgYmUgc3Bva2VuIG9mIHVudGlsIHRoZSBlbmQgb2YgdGltZS4nJzxicj48YnI+VGhlIHBlZXJsZXNzIHdhcnJpb3Iga25vd24gYXMgUGFudGhlb24gaXMgYSBuaWdoLXVuc3RvcHBhYmxlIHBhcmFnb24gb2YgYmF0dGxlLiBIZSB3YXMgYm9ybiBhbW9uZyB0aGUgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJwb3BweVwiLFxuICAgIFwia2V5XCI6IFwiNzhcIixcbiAgICBcIm5hbWVcIjogXCJQb3BweVwiLFxuICAgIFwidGl0bGVcIjogXCJLZWVwZXIgb2YgdGhlIEhhbW1lclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlRhbmtcIixcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTQwLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDkwLFxuICAgICAgXCJtcFwiOiAyODAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDUsXG4gICAgICBcImFybW9yXCI6IDI5LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMixcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA4LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjcsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogNCxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vUG9wcHkucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogNDMyLFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydJJ20gbm8gaGVyby4gSnVzdCBhIHlvcmRsZSB3aXRoIGEgaGFtbWVyLicnPGJyPjxicj5SdW5ldGVycmEgaGFzIG5vIHNob3J0YWdlIG9mIHZhbGlhbnQgY2hhbXBpb25zLCBidXQgZmV3IGFyZSBhcyB0ZW5hY2lvdXMgYXMgUG9wcHkuIEJlYXJpbmcgYSBoYW1tZXIgdHdpY2UgdGhlIGxlbmd0aCBvZiBoZXIgYm9keSwgdGhpcyBkZXRlcm1pbmVkIHlvcmRsZSBoYXMgc3BlbnQgdW50b2xkIHllYXJzIHNlYXJjaGluZyBmb3IgdGhlIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicXVpbm5cIixcbiAgICBcImtleVwiOiBcIjEzM1wiLFxuICAgIFwibmFtZVwiOiBcIlF1aW5uXCIsXG4gICAgXCJ0aXRsZVwiOiBcIkRlbWFjaWEncyBXaW5nc1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hcmtzbWFuXCIsXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUzMi44LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg1LFxuICAgICAgXCJtcFwiOiAyNjguOCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAzNSxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMjMuMzgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDUuNDIsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYuOTcsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjQsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NC40NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMi40MSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDY1LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDMuMVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9RdWlubi5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiAwLFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiUXVpbm4gYW5kIFZhbG9yIGFyZSBhbiBlbGl0ZSByYW5nZXIgdGVhbS4gV2l0aCBjcm9zc2JvdyBhbmQgY2xhdywgdGhleSB1bmRlcnRha2UgdGhlaXIgbmF0aW9uJ3MgbW9zdCBkYW5nZXJvdXMgbWlzc2lvbnMgZGVlcCB3aXRoaW4gZW5lbXkgdGVycml0b3J5LCBmcm9tIHN3aWZ0IHJlY29ubmFpc3NhbmNlIHRvIGxldGhhbCBzdHJpa2VzLiBUaGUgcGFpcidzIHVuYnJlYWthYmxlIGJvbmQgaXMgZGVhZGx5IG9uIHRoZSBiYXR0bGVmaWVsZCwgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJyYW1tdXNcIixcbiAgICBcImtleVwiOiBcIjMzXCIsXG4gICAgXCJuYW1lXCI6IFwiUmFtbXVzXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBBcm1vcmRpbGxvXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiVGFua1wiLFxuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NjQuNDgsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODYsXG4gICAgICBcIm1wXCI6IDMxMC40NCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAzMyxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMzEuMzg0LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDQuMyxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDcuOTIsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuODQsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NS44OCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuMjE1XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1JhbW11cy5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiA0OCxcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnT0suJyc8YnI+PGJyPklkb2xpemVkIGJ5IG1hbnksIGRpc21pc3NlZCBieSBzb21lLCBteXN0aWZ5aW5nIHRvIGFsbCwgdGhlIGN1cmlvdXMgYmVpbmcsIFJhbW11cywgaXMgYW4gZW5pZ21hLiBQcm90ZWN0ZWQgYnkgYSBzcGlrZWQgc2hlbGwsIFJhbW11cyBpbnNwaXJlcyBpbmNyZWFzaW5nbHkgZGlzcGFyYXRlIHRoZW9yaWVzIG9uIGhpcyBvcmlnaW4gd2hlcmV2ZXIgaGUgZ29lcyAtIGZyb20gZGVtaWdvZCwgdG8gc2FjcmVkIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicmVrc2FpXCIsXG4gICAgXCJrZXlcIjogXCI0MjFcIixcbiAgICBcIm5hbWVcIjogXCJSZWsnU2FpXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBWb2lkIEJ1cnJvd2VyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTcwLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDkwLFxuICAgICAgXCJtcFwiOiAxMDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMjQsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy40LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxNzUsXG4gICAgICBcImhwcmVnZW5cIjogNy4zNCxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNjUsXG4gICAgICBcIm1wcmVnZW5cIjogMCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NS42MjgsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMzUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9SZWtTYWkucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogOTYsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUaGUgbGFyZ2VzdCBhbmQgZmllcmNlc3Qgb2YgaGVyIHNwZWNpZXMsIFJlaydTYWkgaXMgYSBtZXJjaWxlc3MgcHJlZGF0b3IgdGhhdCB0dW5uZWxzIHRocm91Z2ggdGhlIGVhcnRoIHRvIGFtYnVzaCBhbmQgZGV2b3VyIGhlciBwcmV5LiBIZXIgaW5zYXRpYWJsZSBodW5nZXIgaGFzIGxhaWQgd2FzdGUgdG8gZW50aXJlIHJlZ2lvbnMgb2YgdGhlIG9uY2UtZ3JlYXQgU2h1cmltYW4gZW1waXJlLiBNZXJjaGFudHMsIHRyYWRlcnMgYW5kIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicmVuZWt0b25cIixcbiAgICBcImtleVwiOiBcIjU4XCIsXG4gICAgXCJuYW1lXCI6IFwiUmVuZWt0b25cIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEJ1dGNoZXIgb2YgdGhlIFNhbmRzXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJUYW5rXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NzIuMTYsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODcsXG4gICAgICBcIm1wXCI6IDEwMCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQ1LFxuICAgICAgXCJhcm1vclwiOiAyNS41ODQsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy44LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogNy45NixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNzUsXG4gICAgICBcIm1wcmVnZW5cIjogMCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1OC4zMjgsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDYsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi42NVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9SZW5la3Rvbi5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiAxNDQsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ0Jsb29kIGFuZCB2ZW5nZWFuY2UuJyc8YnI+PGJyPlJlbmVrdG9uIGlzIGEgdGVycmlmeWluZywgcmFnZS1mdWVsZWQgQXNjZW5kZWQgYmVpbmcgZnJvbSB0aGUgc2NvcmNoZWQgZGVzZXJ0cyBvZiBTaHVyaW1hLiBPbmNlLCBoZSB3YXMgaGlzIGVtcGlyZSdzIG1vc3QgZXN0ZWVtZWQgd2FycmlvciwgbGVhZGluZyB0aGUgYXJtaWVzIG9mIFNodXJpbWEgdG8gY291bnRsZXNzIHZpY3Rvcmllcy4gSG93ZXZlciwgYWZ0ZXIgdGhlIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicmVuZ2FyXCIsXG4gICAgXCJrZXlcIjogXCIxMDdcIixcbiAgICBcIm5hbWVcIjogXCJSZW5nYXJcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFByaWRlc3RhbGtlclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkFzc2Fzc2luXCIsXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU4Ni4yLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDkwLFxuICAgICAgXCJtcFwiOiA1LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDUsXG4gICAgICBcImFybW9yXCI6IDI1Ljg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDQuMjcsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjQsXG4gICAgICBcIm1wcmVnZW5cIjogMCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA2MC4wNCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDgsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi44NVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9SZW5nYXIucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogMTkyLFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiT24gZXZlcnkgd2FsbCBvZiBoaXMgZGVuLCB0aGUgdHJvcGh5IGh1bnRlciBSZW5nYXIgbW91bnRzIHRoZSBoZWFkcywgaG9ybnMsIGNsYXdzLCBhbmQgZmFuZ3Mgb2YgdGhlIG1vc3QgbGV0aGFsIGNyZWF0dXJlcyBpbiBWYWxvcmFuLiBUaG91Z2ggaGlzIGNvbGxlY3Rpb24gaXMgZXh0ZW5zaXZlLCBoZSByZW1haW5zIHVuc2F0aXNmaWVkLCB0aXJlbGVzc2x5IHNlZWtpbmcgZ3JlYXRlciBnYW1lLiBIZSB0YWtlcyB0aW1lIHdpdGggZXZlcnkgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJyaXZlblwiLFxuICAgIFwia2V5XCI6IFwiOTJcIixcbiAgICBcIm5hbWVcIjogXCJSaXZlblwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgRXhpbGVcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIkFzc2Fzc2luXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NTguNDgsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODYsXG4gICAgICBcIm1wXCI6IDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0MCxcbiAgICAgIFwiYXJtb3JcIjogMjQuMzc2LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuMixcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDUuMzQsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjUsXG4gICAgICBcIm1wcmVnZW5cIjogMCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1Ni4wNCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzLjVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vUml2ZW4ucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogMjQwLFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydUaGVyZSBpcyBhIHBsYWNlIGJldHdlZW4gd2FyIGFuZCBtdXJkZXIgaW4gd2hpY2ggb3VyIGRlbW9ucyBsdXJrLicnPGJyPjxicj5JbiBOb3h1cywgYW55IGNpdGl6ZW4gbWF5IHJpc2UgdG8gcG93ZXIgcmVnYXJkbGVzcyBvZiByYWNlLCBnZW5kZXIsIG9yIHNvY2lhbCBzdGFuZGluZyAtIHN0cmVuZ3RoIGlzIGFsbCB0aGF0IG1hdHRlcnMuIEl0IHdhcyB3aXRoIGNvbW1pdHRlZCBmYWl0aCBpbiB0aGlzIGlkZWFsIHRoYXQgUml2ZW4gLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJydW1ibGVcIixcbiAgICBcImtleVwiOiBcIjY4XCIsXG4gICAgXCJuYW1lXCI6IFwiUnVtYmxlXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBNZWNoYW5pemVkIE1lbmFjZVwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTg0LjQsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODAsXG4gICAgICBcIm1wXCI6IDEwMCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQ1LFxuICAgICAgXCJhcm1vclwiOiAyNS44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA4LjAwNSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNixcbiAgICAgIFwibXByZWdlblwiOiAwLFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDYxLjAzNixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4yLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAxLjg1XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1J1bWJsZS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiAyODgsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ1VnaCwgaXQncyBnb25uYSB0YWtlIGZvcmV2ZXIgdG8gc2NyYXBlIHlvdXIgZmFjZSBvZmYgbXkgc3VpdCEnJzxicj48YnI+RXZlbiBhbW9uZ3N0IHlvcmRsZXMsIFJ1bWJsZSB3YXMgYWx3YXlzIHRoZSBydW50IG9mIHRoZSBsaXR0ZXIuIEFzIHN1Y2gsIGhlIHdhcyB1c2VkIHRvIGJlaW5nIGJ1bGxpZWQuIEluIG9yZGVyIHRvIHN1cnZpdmUsIGhlIGhhZCB0byBiZSBzY3JhcHBpZXIgYW5kIG1vcmUgcmVzb3VyY2VmdWwgdGhhbiBoaXMgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJyeXplXCIsXG4gICAgXCJrZXlcIjogXCIxM1wiLFxuICAgIFwibmFtZVwiOiBcIlJ5emVcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFJ1bmUgTWFnZVwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIixcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTU4LjQ4LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg2LFxuICAgICAgXCJtcFwiOiA0MDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNTAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDAsXG4gICAgICBcImFybW9yXCI6IDIxLjU1MixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDcsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NS4wNCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjExMlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9SeXplLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDMzNixcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnVGFrZSBjYXJlIHdpdGggdGhpcyB3b3JsZC4gV2hhdCBpcyBtYWRlIGNhbiBiZSB1bm1hZGUuJyc8YnI+PGJyPldpZGVseSBjb25zaWRlcmVkIG9uZSBvZiB0aGUgbW9zdCBhZGVwdCBzb3JjZXJlcnMgb24gUnVuZXRlcnJhLCBSeXplIGlzIGFuIGFuY2llbnQsIGhhcmQtYml0dGVuIGFyY2htYWdlIHdpdGggYW4gaW1wb3NzaWJseSBoZWF2eSBidXJkZW4gdG8gYmVhci4gQXJtZWQgd2l0aCBhIGJvdW5kbGVzcyBjb25zdGl0dXRpb24gYW5kIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwic2VqdWFuaVwiLFxuICAgIFwia2V5XCI6IFwiMTEzXCIsXG4gICAgXCJuYW1lXCI6IFwiU2VqdWFuaVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgV2ludGVyJ3MgV3JhdGhcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJUYW5rXCIsXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDYwMCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5NSxcbiAgICAgIFwibXBcIjogNDAwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQwLFxuICAgICAgXCJhcm1vclwiOiAyOS41NCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOC42NzUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjg1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuMjA1LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC40NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU3LjU0NCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4zLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNjcyLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDEuNDRcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vU2VqdWFuaS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiAzODQsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJTZWp1YW5pIHdhcyB3ZWFuZWQgb24gaGFyZHNoaXAgYW5kIHJlYXJlZCBvbiBiYXJiYXJpdHkuIFdoZXJlIG90aGVycyBzdWNjdW1iZWQgdG8gdGhlIGhhcnNobmVzcyBvZiB0aGUgRnJlbGpvcmQsIHNoZSB3YXMgdGVtcGVyZWQgYnkgaXQgdW50aWwgcGFpbiBiZWNhbWUgcG93ZXIsIGh1bmdlciBhbiBlbmNvdXJhZ2VtZW50LCBhbmQgZnJvc3QgYW4gYWxseSBpbiBjdWxsaW5nIHRoZSB3ZWFrLiBUaHJvdWdoIGhlciBvcmRlYWxzLCBzaGUgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJzaGFjb1wiLFxuICAgIFwia2V5XCI6IFwiMzVcIixcbiAgICBcIm5hbWVcIjogXCJTaGFjb1wiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgRGVtb24gSmVzdGVyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiQXNzYXNzaW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU4Mi4xMixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NCxcbiAgICAgIFwibXBcIjogMjk3LjIsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNTAsXG4gICAgICBcImFybW9yXCI6IDI0Ljg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDguMzcsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuMTU1LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC40NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU3LjU4LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjEsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogM1xuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9TaGFjby5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiA0MzIsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJNb3N0IHdvdWxkIHNheSB0aGF0IGRlYXRoIGlzbid0IGZ1bm55LiBJdCBpc24ndCwgdW5sZXNzIHlvdSdyZSBTaGFjbyAtIHRoZW4gaXQncyBoeXN0ZXJpY2FsLiBIZSBpcyBWYWxvcmFuJ3MgZmlyc3QgZnVsbHkgZnVuY3Rpb25pbmcgaG9taWNpZGFsIGNvbWljOyBoZSBqZXN0cyB1bnRpbCBzb21lb25lIGRpZXMsIGFuZCB0aGVuIGhlIGxhdWdocy4gVGhlIGZpZ3VyZSB0aGF0IGhhcyBjb21lIHRvIGJlIGtub3duIGFzIHRoZSBEZW1vbiAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInNoZW5cIixcbiAgICBcImtleVwiOiBcIjk4XCIsXG4gICAgXCJuYW1lXCI6IFwiU2hlblwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgRXllIG9mIFR3aWxpZ2h0XCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiVGFua1wiLFxuICAgICAgXCJNZWxlZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTQwLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDczLFxuICAgICAgXCJtcFwiOiA0MDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0MCxcbiAgICAgIFwiYXJtb3JcIjogMjUsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMi42LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOC41LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC43NSxcbiAgICAgIFwibXByZWdlblwiOiA1MCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA2MCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1NoZW4ucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogMCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydUaGUgRXllIGlzIGJsaW5kIHRvIGZlYXIsIHRvIGhhdGUsIHRvIGxvdmUgLSB0byBhbGwgdGhpbmdzIHRoYXQgd291bGQgc3dheSBlcXVpbGlicml1bS4nJzxicj48YnI+TGVhZGVyIG9mIGEgc2VjcmV0IGNsYW4gb2YgbXlzdGljIHdhcnJpb3JzLCBTaGVuIHNlcnZlcyBhcyB0aGUgRXllIG9mIFR3aWxpZ2h0LCBlbnRydXN0ZWQgdG8gZW5mb3JjZSBlcXVpbGlicml1bSBpbiB0aGUgd29ybGQuIExvbmdpbmcgdG8gcmVtYWluIGZyZWUgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJzaHl2YW5hXCIsXG4gICAgXCJrZXlcIjogXCIxMDJcIixcbiAgICBcIm5hbWVcIjogXCJTaHl2YW5hXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBIYWxmLURyYWdvblwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiVGFua1wiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTk0LjYsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTUsXG4gICAgICBcIm1wXCI6IDEwMCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzUwLFxuICAgICAgXCJhcm1vclwiOiAyNy42MjgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy4zNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDguNTksXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcIm1wcmVnZW5cIjogMCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA2MC43MTIsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuNCxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDUsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi41XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1NoeXZhbmEucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogNDgsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkEgaGFsZi1icmVlZCBib3JuIGZyb20gdGhlIHVuaW9uIGJldHdlZW4gZHJhZ29uIGFuZCBodW1hbiwgU2h5dmFuYSBzZWFyY2hlZCBhbGwgaGVyIGxpZmUgZm9yIGJlbG9uZ2luZy4gUGVyc2VjdXRpb24gZm9yZ2VkIGhlciBpbnRvIGEgYnJ1dGFsIHdhcnJpb3IsIGFuZCB0aG9zZSB3aG8gZGFyZSBzdGFuZCBhZ2FpbnN0IFNoeXZhbmEgZmFjZSB0aGUgZmllcnkgYmVhc3QgbHVya2luZyBqdXN0IGJlbmVhdGggaGVyIHNraW4uLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJzaW5nZWRcIixcbiAgICBcImtleVwiOiBcIjI3XCIsXG4gICAgXCJuYW1lXCI6IFwiU2luZ2VkXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBNYWQgQ2hlbWlzdFwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlRhbmtcIixcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTQyLjc2LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgyLFxuICAgICAgXCJtcFwiOiAyOTAuNixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0NSxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0NSxcbiAgICAgIFwiYXJtb3JcIjogMjcuODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOC4wMixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogNy41MixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA2Mi4zMixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4zNzUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAuMDIsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMS44MVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9TaW5nZWQucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogOTYsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlNpbmdlZCBkZXNjZW5kZWQgZnJvbSBhIGxvbmcgbGluZSBvZiBaYXVuJ3MgcmV2ZXJlZCBjaGVtaXN0cy4gRXZlbiBpbiBoaXMgeW91dGgsIGhpcyB0YWxlbnQgZm9yIGNvbmNvY3RpbmcgcG90aW9ucyBmYXIgb3V0c3RyaXBwZWQgdGhhdCBvZiBoaXMgcGVlcnMsIGFuZCBoZSBxdWlja2x5IGRpc3Rpbmd1aXNoZWQgaGltc2VsZiBmcm9tIGhpcyBsZXNzIGV4dHJhb3JkaW5hcnkgY2hlbWlzdCBjb21wYXRyaW90cy4gSXQgY2FtZSBhcyBubyAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInNpb25cIixcbiAgICBcImtleVwiOiBcIjE0XCIsXG4gICAgXCJuYW1lXCI6IFwiU2lvblwiLFxuICAgIFwidGl0bGVcIjogXCJUaGUgVW5kZWFkIEp1Z2dlcm5hdXRcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJUYW5rXCIsXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU0Mi42NCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA3MyxcbiAgICAgIFwibXBcIjogMzI1LjYsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDIsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDUsXG4gICAgICBcImFybW9yXCI6IDIzLjA0LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDE3NSxcbiAgICAgIFwiaHByZWdlblwiOiAxMC4xOCxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwibXByZWdlblwiOiA4LjAwNSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNixcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU5LjcyLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiA0LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wOCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAxLjNcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vU2lvbi5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiAxNDQsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkJMT09ELjxicj48YnI+U01FTEwgSVQuPGJyPjxicj5XQU5ULiBBQ0hJTkcuIE5FRUQhPGJyPjxicj5DTE9TRSBOT1cuIFRIRVkgQ09NRS48YnI+PGJyPk5PIENIQUlOUz8gRlJFRSEgS0lMTCE8YnI+PGJyPklOIFJFQUNILiBZRVMhIERJRSEgRElFITxicj48YnI+R29uZS4gVG9vIHF1aWNrLiBObyBmaWdodC4gTW9yZS4gSSB3YW50Li4uIG1vcmUuPGJyPjxicj5BIHZvaWNlPyBVbmZhbWlsaWFyLiBJIHNlZSBoaW0uIFRoZSBHcmFuZCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInNpdmlyXCIsXG4gICAgXCJrZXlcIjogXCIxNVwiLFxuICAgIFwibmFtZVwiOiBcIlNpdmlyXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBCYXR0bGUgTWlzdHJlc3NcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYXJrc21hblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTE1Ljc2LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgyLFxuICAgICAgXCJtcFwiOiAyODQsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNTAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDIyLjIxLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuMjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1MDAsXG4gICAgICBcImhwcmVnZW5cIjogNS4xNyxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogOC4wMSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU3LjQ2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAyLjQxLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDEuNlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9TaXZpci5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiAxOTIsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnSSBkb24ndCBjYXJlIHdoYXQgZmFjZSBpcyBvbiB5b3VyIGNvaW4sIGFzIGxvbmcgYXMgaXQgcGF5cy4nJzxicj48YnI+U2l2aXIgaXMgYSByZW5vd25lZCBmb3J0dW5lIGh1bnRlciBhbmQgbWVyY2VuYXJ5IGNhcHRhaW4gd2hvIHBsaWVzIGhlciB0cmFkZSBpbiB0aGUgZGVzZXJ0cyBvZiBTaHVyaW1hLiBBcm1lZCB3aXRoIGhlciBsZWdlbmRhcnkgamV3ZWxlZCBjcm9zc2JsYWRlLCBzaGUgaGFzIGZvdWdodCBhbmQgd29uIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwic2thcm5lclwiLFxuICAgIFwia2V5XCI6IFwiNzJcIixcbiAgICBcIm5hbWVcIjogXCJTa2FybmVyXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBDcnlzdGFsIFZhbmd1YXJkXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJUYW5rXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA2MDEuMjgsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTAsXG4gICAgICBcIm1wXCI6IDI3Mi4yLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAyOS4zODQsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy44LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOC45MjUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjg1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuMjA1LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC40NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU3LjE1NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogNC41LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuMVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9Ta2FybmVyLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDI0MCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydXZSBhcmUgb25lLiBXZSBjYW5ub3QgYmUgc2hhdHRlcmVkLicnPGJyPjxicj5Ta2FybmVyIGlzIGFuIGltbWVuc2UgY3J5c3RhbGxpbmUgc2NvcnBpb24gZnJvbSBhIGhpZGRlbiB2YWxsZXkgaW4gU2h1cmltYS4gUGFydCBvZiB0aGUgYW5jaWVudCBCcmFja2VybiByYWNlLCBTa2FybmVyIGFuZCBoaXMga2luIGFyZSBrbm93biBmb3IgdGhlaXIgZ3JlYXQgd2lzZG9tIGFuZCBkZWVwIGNvbm5lY3Rpb24gdG8gdGhlIGxhbmQsIGFzIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwic29uYVwiLFxuICAgIFwia2V5XCI6IFwiMzdcIixcbiAgICBcIm5hbWVcIjogXCJTb25hXCIsXG4gICAgXCJ0aXRsZVwiOiBcIk1hdmVuIG9mIHRoZSBTdHJpbmdzXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiU3VwcG9ydFwiLFxuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA0ODIuMzYsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNzcsXG4gICAgICBcIm1wXCI6IDM0MC42LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQ1LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzI1LFxuICAgICAgXCJhcm1vclwiOiAyMC41NDQsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy4zLFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDUuNDIsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDExLjUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjQsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1MC4wNCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDMsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi4zXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1NvbmEucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogMjg4LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJTb25hIGhhcyBubyBtZW1vcmllcyBvZiBoZXIgdHJ1ZSBwYXJlbnRzLiBBcyBhbiBpbmZhbnQsIHNoZSB3YXMgZm91bmQgYWJhbmRvbmVkIG9uIHRoZSBkb29yc3RlcCBvZiBhbiBJb25pYW4gYWRvcHRpb24gaG91c2UsIG5lc3RsZWQgYXRvcCBhbiBhbmNpZW50IGluc3RydW1lbnQgaW4gYW4gZXhxdWlzaXRlIGNhc2Ugb2YgdW5rbm93biBvcmlnaW5zLiBTaGUgd2FzIGFuIHVudXN1YWxseSB3ZWxsLWJlaGF2ZWQgY2hpbGQsIGFsd2F5cyAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInNvcmFrYVwiLFxuICAgIFwia2V5XCI6IFwiMTZcIixcbiAgICBcIm5hbWVcIjogXCJTb3Jha2FcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFN0YXJjaGlsZFwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlN1cHBvcnRcIixcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTI5LjA0LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDc4LFxuICAgICAgXCJtcFwiOiAzNTAuOCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA2MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMyNSxcbiAgICAgIFwiYXJtb3JcIjogMjMuMzg0LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuOCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDU1MCxcbiAgICAgIFwiaHByZWdlblwiOiAyLjUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjUsXG4gICAgICBcIm1wcmVnZW5cIjogMTEuNSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUwLjA0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuMTRcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vU29yYWthLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDMzNixcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiQSBoZWFsZXIgZ2lmdGVkIHdpdGggdGhlIG1hZ2ljIG9mIHRoZSBzdGFycywgU29yYWthIGhvbGRzIGFsbCBsaXZpbmcgY3JlYXR1cmVzIGNsb3NlIHRvIGhlciBoZWFydC4gU2hlIHdhcyBvbmNlIGEgY2VsZXN0aWFsIGJlaW5nLCBidXQgc2hlIHNhY3JpZmljZWQgaGVyIGltbW9ydGFsaXR5IGFuZCBlbnRlcmVkIHRoZSB3b3JsZCBvZiBtb3J0YWxzLiBTbyBsb25nIGFzIGV2aWwgdGhyZWF0ZW5zIGxpZmUgaW4gVmFsb3JhbiwgU29yYWthIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwic3dhaW5cIixcbiAgICBcImtleVwiOiBcIjUwXCIsXG4gICAgXCJuYW1lXCI6IFwiU3dhaW5cIixcbiAgICBcInRpdGxlXCI6IFwidGhlIE1hc3RlciBUYWN0aWNpYW5cIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCIsXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUxNi4wNCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5MCxcbiAgICAgIFwibXBcIjogMzc0LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQ3LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAyMi43MixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiA0LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTAwLFxuICAgICAgXCJocHJlZ2VuXCI6IDcuODQsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjY1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1Mi4wNCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjExXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1N3YWluLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDM4NCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGhlIGVhcmxpZXN0IGFjY291bnQgb2YgU3dhaW4ncyBleGlzdGVuY2UgY29tZXMgZnJvbSBhIE5veGlhbiBpbmZpcm1hcnkgZG9jdG9yJ3Mgbm90ZXMuIEFjY29yZGluZyB0byB0aGVtLCBTd2FpbiBsaW1wZWQgaW50byB0aGUgd2FyZCB3aXRob3V0IGNyeSBvciBjb21wbGFpbnQ7IGhpcyByaWdodCBsZWcgd2FzIHNuYXBwZWQgaW4gaGFsZiwgd2l0aCBib25lIHByb3RydWRpbmcgZnJvbSB0aGUgc2tpbi4gQSBzbWFsbCwgc2Nvd2xpbmcgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJzeW5kcmFcIixcbiAgICBcImtleVwiOiBcIjEzNFwiLFxuICAgIFwibmFtZVwiOiBcIlN5bmRyYVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgRGFyayBTb3ZlcmVpZ25cIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCIsXG4gICAgICBcIlN1cHBvcnRcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUxMS4wNCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA3OCxcbiAgICAgIFwibXBcIjogMzg0LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDYwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzMwLFxuICAgICAgXCJhcm1vclwiOiAyNC43MTIsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy40LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDYuNTA1LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1My44NzIsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDIuOSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1N5bmRyYS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiA0MzIsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkJvcm4gd2l0aCBpbW1lbnNlIG1hZ2ljYWwgcG90ZW50aWFsLCBTeW5kcmEgbG92ZXMgbm90aGluZyBtb3JlIHRoYW4gZXhlcmNpc2luZyB0aGUgaW5jcmVkaWJsZSBwb3dlciBhdCBoZXIgY29tbWFuZC4gV2l0aCBlYWNoIHBhc3NpbmcgZGF5LCBoZXIgbWFzdGVyeSBvZiBtYWdpY2FsIGZvcmNlIGdyb3dzIG1vcmUgcG90ZW50IGFuZCBkZXZhc3RhdGluZy4gUmVmdXNpbmcgYW55IG5vdGlvbiBvZiBiYWxhbmNlIG9yIHJlc3RyYWludCwgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ0YWhta2VuY2hcIixcbiAgICBcImtleVwiOiBcIjIyM1wiLFxuICAgIFwibmFtZVwiOiBcIlRhaG0gS2VuY2hcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFJpdmVyIEtpbmdcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJTdXBwb3J0XCIsXG4gICAgICBcIlRhbmtcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDYxMCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5NSxcbiAgICAgIFwibXBcIjogMzI1LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAyNyxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDE3NSxcbiAgICAgIFwiaHByZWdlblwiOiA2LjUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDgsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAxLFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMixcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vVGFobUtlbmNoLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDAsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ1RoZSB3aG9sZSB3b3JsZCdzIGEgcml2ZXIsIGFuZCBJJ20gaXRzIGtpbmcuJyc8YnI+VGFobSBLZW5jaCB0cmF2ZWxzIFJ1bmV0ZXJyYSdzIHdhdGVyd2F5cywgZmVlZGluZyBoaXMgaW5zYXRpYWJsZSBhcHBldGl0ZSB3aXRoIHRoZSBtaXNlcnkgb2YgdGhlIHVuc3VzcGVjdGluZy4gVGhlIHNpbmd1bGFybHkgY2hhcm1pbmcgZ291cm1hbmQgc2F2b3JzIGV2ZXJ5IG1vbWVudCBvZiBoaXMgdmljdGltcycgc3VmZmVyaW5nLiAgQSBkZWFsIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidGFsaXlhaFwiLFxuICAgIFwia2V5XCI6IFwiMTYzXCIsXG4gICAgXCJuYW1lXCI6IFwiVGFsaXlhaFwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgU3RvbmV3ZWF2ZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCIsXG4gICAgICBcIlN1cHBvcnRcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUyMCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA3NSxcbiAgICAgIFwibXBcIjogMzQwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDYwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzI1LFxuICAgICAgXCJhcm1vclwiOiAyMCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDcsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjcsXG4gICAgICBcIm1wcmVnZW5cIjogNyxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuODUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4zLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDEuMzZcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vVGFsaXlhaC5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiA0OCxcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRhbGl5YWggaXMgYSBub21hZGljIG1hZ2UgZnJvbSBTaHVyaW1hIHdobyB3ZWF2ZXMgc3RvbmUgd2l0aCBlbmVyZ2V0aWMgZW50aHVzaWFzbSBhbmQgcmF3IGRldGVybWluYXRpb24uIFRvcm4gYmV0d2VlbiB0ZWVuYWdlIHdvbmRlciBhbmQgYWR1bHQgcmVzcG9uc2liaWxpdHksIHNoZSBoYXMgY3Jvc3NlZCBuZWFybHkgYWxsIG9mIFZhbG9yYW4gb24gYSBqb3VybmV5IHRvIGxlYXJuIHRoZSB0cnVlIG5hdHVyZSBvZiBoZXIgZ3Jvd2luZyAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInRhbG9uXCIsXG4gICAgXCJrZXlcIjogXCI5MVwiLFxuICAgIFwibmFtZVwiOiBcIlRhbG9uXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBCbGFkZSdzIFNoYWRvd1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkFzc2Fzc2luXCIsXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU4Mi44LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg1LFxuICAgICAgXCJtcFwiOiAzNzcuMixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAzNyxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM1MCxcbiAgICAgIFwiYXJtb3JcIjogMjYuODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOC41MSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNzUsXG4gICAgICBcIm1wcmVnZW5cIjogNy41OSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU1LjIwOCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4xLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNjUsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi43XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1RhbG9uLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDk2LFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydUaGUgdGhyZWUgZGVhZGxpZXN0IGJsYWRlbWFzdGVycyBpbiBhbGwgb2YgVmFsb3JhbiBhcmUgYm91bmQgdG8gdGhlIGhvdXNlIG9mIER1IENvdXRlYXU6IG15IGZhdGhlciwgbXlzZWxmLCBhbmQgVGFsb24uIENoYWxsZW5nZSB1cywgaWYgeW91IGRhcmUuJyc8YnI+LS0gS2F0YXJpbmEgRHUgQ291dGVhdTxicj48YnI+VGFsb24ncyBlYXJsaWVzdCBtZW1vcmllcyBhcmUgdGhlIGRhcmtuZXNzIG9mIE5veHVzJyB1bmRlcmdyb3VuZCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInRhcmljXCIsXG4gICAgXCJrZXlcIjogXCI0NFwiLFxuICAgIFwibmFtZVwiOiBcIlRhcmljXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBTaGllbGQgb2YgVmFsb3JhblwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlN1cHBvcnRcIixcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTc1LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDkwLFxuICAgICAgXCJtcFwiOiAzMDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNjAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDAsXG4gICAgICBcImFybW9yXCI6IDI1LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDYsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjUsXG4gICAgICBcIm1wcmVnZW5cIjogNSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDEsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NSxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDJcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vVGFyaWMucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogMTQ0LFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydUaGUgYmVzdCB3ZWFwb25zIGFyZSBiZWF1dGlmdWwuJyc8YnI+PGJyPlRhcmljIGlzIHRoZSBBc3BlY3Qgb2YgdGhlIFByb3RlY3Rvciwgd2llbGRpbmcgaW5jcmVkaWJsZSBwb3dlciBhcyBSdW5ldGVycmEncyBndWFyZGlhbiBvZiBsaWZlLCBsb3ZlLCBhbmQgYmVhdXR5LiBTaGFtZWQgYnkgYSBkZXJlbGljdGlvbiBvZiBkdXR5IGFuZCBleGlsZWQgZnJvbSBoaXMgaG9tZWxhbmQgRGVtYWNpYSwgVGFyaWMgYXNjZW5kZWQgTW91bnQgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ0ZWVtb1wiLFxuICAgIFwia2V5XCI6IFwiMTdcIixcbiAgICBcIm5hbWVcIjogXCJUZWVtb1wiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgU3dpZnQgU2NvdXRcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYXJrc21hblwiLFxuICAgICAgXCJBc3Nhc3NpblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTE1Ljc2LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgyLFxuICAgICAgXCJtcFwiOiAyNjcuMixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzMCxcbiAgICAgIFwiYXJtb3JcIjogMjQuMyxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjc1LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTAwLFxuICAgICAgXCJocHJlZ2VuXCI6IDUuNzQsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjY1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuMjA1LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC40NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDQ5LjU0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wOTQ3LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDMuMzhcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vVGVlbW8ucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogMTkyLFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGVlbW8gaXMgYSBsZWdlbmQgYW1vbmcgaGlzIHlvcmRsZSBicm90aGVycyBhbmQgc2lzdGVycyBpbiBCYW5kbGUgQ2l0eS4gQXMgZmFyIGFzIHlvcmRsZXMgYXJlIGNvbmNlcm5lZCwgdGhlcmUgaXMgc29tZXRoaW5nIGp1c3Qgc2xpZ2h0bHkgb2ZmIGFib3V0IGhpbS4gV2hpbGUgVGVlbW8gZW5qb3lzIHRoZSBjb21wYW5pb25zaGlwIG9mIG90aGVyIHlvcmRsZXMsIGhlIGFsc28gaW5zaXN0cyBvbiBmcmVxdWVudCBzb2xvIG1pc3Npb25zIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidGhyZXNoXCIsXG4gICAgXCJrZXlcIjogXCI0MTJcIixcbiAgICBcIm5hbWVcIjogXCJUaHJlc2hcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIENoYWluIFdhcmRlblwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlN1cHBvcnRcIixcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTYwLjUyLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDkzLFxuICAgICAgXCJtcFwiOiAyNzMuOTIsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDQsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDE2LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDAsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA0NTAsXG4gICAgICBcImhwcmVnZW5cIjogNi45MixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDQ3LjY5NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMi4yLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDMuNVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9UaHJlc2gucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogMjQwLFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydUaGUgbWluZCBpcyBhIHdvbmRyb3VzIHRoaW5nIHRvIHRlYXIgYXBhcnQuJyc8YnI+PGJyPlNhZGlzdGljIGFuZCBjdW5uaW5nLCBUaHJlc2ggaXMgYSByZXN0bGVzcyBzcGlyaXQgd2hvIHByaWRlcyBoaW1zZWxmIG9uIHRvcm1lbnRpbmcgbW9ydGFscyBhbmQgYnJlYWtpbmcgdGhlbSB3aXRoIHNsb3csIGV4Y3J1Y2lhdGluZyBpbnZlbnRpdmVuZXNzLiBIaXMgdmljdGltcyBzdWZmZXIgZmFyIGJleW9uZCB0aGUgcG9pbnQgb2YgZGVhdGgsLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ0cmlzdGFuYVwiLFxuICAgIFwia2V5XCI6IFwiMThcIixcbiAgICBcIm5hbWVcIjogXCJUcmlzdGFuYVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgWW9yZGxlIEd1bm5lclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hcmtzbWFuXCIsXG4gICAgICBcIkFzc2Fzc2luXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NDIuNzYsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODIsXG4gICAgICBcIm1wXCI6IDI0Ni43NixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAzMixcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMyNSxcbiAgICAgIFwiYXJtb3JcIjogMjIsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMyxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDU1MCxcbiAgICAgIFwiaHByZWdlblwiOiA2LjE5LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42NSxcbiAgICAgIFwibXByZWdlblwiOiA3LjIwNSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNDUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1Ni45NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMi40MSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDQ3MzQsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMS41XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1RyaXN0YW5hLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDI4OCxcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkdyZWF0bmVzcyBjb21lcyBpbiBhbGwgc2hhcGVzIGFuZCBzaXplcywgYXMgcHJvdmVuIGJ5IHRoaXMgZGltaW51dGl2ZSwgY2Fubm9uLXdpZWxkaW5nwqB5b3JkbGUuIEluIGEgd29ybGQgZnJhdWdodCB3aXRoIHR1cm1vaWwsIFRyaXN0YW5hIHJlZnVzZXMgdG8gYmFjayBkb3duIGZyb20gYW55IGNoYWxsZW5nZS4gU2hlIHJlcHJlc2VudHMgdGhlIHBpbm5hY2xlIG9mIG1hcnRpYWwgcHJvZmljaWVuY3ksIHVud2F2ZXJpbmcgY291cmFnZSwgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ0cnVuZGxlXCIsXG4gICAgXCJrZXlcIjogXCI0OFwiLFxuICAgIFwibmFtZVwiOiBcIlRydW5kbGVcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFRyb2xsIEtpbmdcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIlRhbmtcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDYxNi4yOCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5NixcbiAgICAgIFwibXBcIjogMjgxLjYsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDUsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNTAsXG4gICAgICBcImFybW9yXCI6IDI3LjUzNixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAyLjcsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDE3NSxcbiAgICAgIFwiaHByZWdlblwiOiA2LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC43NSxcbiAgICAgIFwibXByZWdlblwiOiA3LjUwNSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNixcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDYwLjA0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNjcyLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuOVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9UcnVuZGxlLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDMzNixcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRydW5kbGUgaXMgYSBodWxraW5nIGFuZCBkZXZpb3VzIHRyb2xsIHdpdGggYSBtaXNjaGlldm91cyBzdHJlYWsuIFRoZXJlIGlzIG5vdGhpbmcgaGUgY2FuJ3QgYmVhdCBpbnRvIHN1Ym1pc3Npb24gYW5kIGJlbmQgdG8gaGlzIHdpbGwsIG5vdCBldmVuIHRoZSBpY2UgaXRzZWxmLiBXaXRoIGhpcyBtYXNzaXZlLCBmcm96ZW4gY2x1YiwgaGUgY2hpbGxzIGhpcyBlbmVtaWVzIHRvIHRoZSBjb3JlIGFuZCBydW5zIHRoZW0gdGhyb3VnaCB3aXRoIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidHJ5bmRhbWVyZVwiLFxuICAgIFwia2V5XCI6IFwiMjNcIixcbiAgICBcIm5hbWVcIjogXCJUcnluZGFtZXJlXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBCYXJiYXJpYW4gS2luZ1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiQXNzYXNzaW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDYyNS42NCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5OCxcbiAgICAgIFwibXBcIjogMTAwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDUsXG4gICAgICBcImFybW9yXCI6IDI0LjEwOCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjEsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA4LjUxLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC45LFxuICAgICAgXCJtcHJlZ2VuXCI6IDAsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNjEuMzc2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjIsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA2NzIsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi45XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1RyeW5kYW1lcmUucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogMzg0LFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiRnVlbGVkIGJ5IGhpcyB1bmJyaWRsZWQgZnVyeSBhbmQgcmFnZSwgVHJ5bmRhbWVyZSBjdXRzIGhpcyB3YXkgdGhyb3VnaCB0aGUgdHVuZHJhLCBtYXN0ZXJpbmcgdGhlIGFydCBvZiBiYXR0bGUgYnkgY2hhbGxlbmdpbmcgdGhlIEZyZWxqb3JkJ3MgZ3JlYXRlc3Qgd2FycmlvcnMuIFRoZSB3cmF0aGZ1bCBiYXJiYXJpYW4gc2Vla3MgcmV2ZW5nZSBvbiB0aGUgb25lIHdobyBkZWNpbWF0ZWQgaGlzIGNsYW4gYW5kIHN0cmlrZXMgZG93biBhbGwgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ0d2lzdGVkZmF0ZVwiLFxuICAgIFwia2V5XCI6IFwiNFwiLFxuICAgIFwibmFtZVwiOiBcIlR3aXN0ZWQgRmF0ZVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgQ2FyZCBNYXN0ZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MjEuNzYsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODIsXG4gICAgICBcIm1wXCI6IDI2NS44NCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAzOCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzMCxcbiAgICAgIFwiYXJtb3JcIjogMjAuNTQyLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuMTUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1MjUsXG4gICAgICBcImhwcmVnZW5cIjogNS41MDUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjYsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDQ5Ljk1NCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4zLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzLjIyXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1R3aXN0ZWRGYXRlLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQzMixcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlR3aXN0ZWQgRmF0ZSBpcyBhbiBpbmZhbW91cyBjYXJkIHNoYXJwIGFuZCBzd2luZGxlciB3aG8gaGFzIGdhbWJsZWQgYW5kIGNoYXJtZWQgaGlzIHdheSBhY3Jvc3MgbXVjaCBvZiB0aGUga25vd24gd29ybGQsIGVhcm5pbmcgdGhlIGVubWl0eSBhbmQgYWRtaXJhdGlvbiBvZiB0aGUgcmljaCBhbmQgZm9vbGlzaCBhbGlrZS4gSGUgcmFyZWx5IHRha2VzIHRoaW5ncyBzZXJpb3VzbHksIGdyZWV0aW5nIGVhY2ggZGF5IHdpdGggYSBtb2NraW5nIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidHdpdGNoXCIsXG4gICAgXCJrZXlcIjogXCIyOVwiLFxuICAgIFwibmFtZVwiOiBcIlR3aXRjaFwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgUGxhZ3VlIFJhdFwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hcmtzbWFuXCIsXG4gICAgICBcIkFzc2Fzc2luXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MjUuMDgsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODEsXG4gICAgICBcIm1wXCI6IDI4Ny4yLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzMwLFxuICAgICAgXCJhcm1vclwiOiAyMy4wNCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDYuMDA1LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuMjU1LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC40NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU1LjQ2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAyLjQxLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wOCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzLjM4XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1R3aXRjaC5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiAwLFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiSC5JLlYuRS4gSW5jaWRlbnQgUmVwb3J0PGJyPkNvZGUgVmlvbGF0aW9uOiBJbmR1c3RyaWFsIEhvbWljaWRlPGJyPkNhc2VmaWxlIFN0YXR1czogVW5zb2x2ZWQ8YnI+SW52ZXN0aWdhdGluZyBBZ2VudDogUm9sLCBQLjxicj48YnI+VGVhbSByZXNwb25kZWQgdG8gcmVwb3J0IG9mIHN1c3BpY2lvdXMgY2hhcmFjdGVyLCBjcmltaW5hbCBhY3Rpdml0eTsgcHJvY2VlZGVkIHRvIFN1bXAgV29ya3MsIFNlY3RvciA5MFRaLiBTZWN0b3IgOTBUWiAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInVkeXJcIixcbiAgICBcImtleVwiOiBcIjc3XCIsXG4gICAgXCJuYW1lXCI6IFwiVWR5clwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgU3Bpcml0IFdhbGtlclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiVGFua1wiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTkzLjMyLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDk5LFxuICAgICAgXCJtcFwiOiAyNzAuNCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAzMCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0NSxcbiAgICAgIFwiYXJtb3JcIjogMjUuNDcsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogNCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDYsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjc1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuNTA1LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC40NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU4LjI4NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4yLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjY3XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1VkeXIucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogNDgsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJVZHlyIGlzIG1vcmUgdGhhbiBhIG1hbjsgaGUgaXMgYSB2ZXNzZWwgZm9yIHRoZSB1bnRhbWVkIHBvd2VyIG9mIGZvdXIgcHJpbWFsIGFuaW1hbCBzcGlyaXRzLiBXaGVuIHRhcHBpbmcgaW50byB0aGUgc3Bpcml0cycgYmVzdGlhbCBuYXR1cmVzLCBVZHlyIGNhbiBoYXJuZXNzIHRoZWlyIHVuaXF1ZSBzdHJlbmd0aHM6IHRoZSB0aWdlciBncmFudHMgaGltIHNwZWVkIGFuZCBmZXJvY2l0eSwgdGhlIHR1cnRsZSByZXNpbGllbmNlLCB0aGUgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ1cmdvdFwiLFxuICAgIFwia2V5XCI6IFwiNlwiLFxuICAgIFwibmFtZVwiOiBcIlVyZ290XCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBIZWFkc21hbidzIFByaWRlXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFya3NtYW5cIixcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTg2LjUyLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg5LFxuICAgICAgXCJtcFwiOiAzMTIuNCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA1NSxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMjQuNTQ0LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuMyxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDQyNSxcbiAgICAgIFwiaHByZWdlblwiOiA2LjUwNSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNixcbiAgICAgIFwibXByZWdlblwiOiA4LjU5LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC42NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU0LjA1LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjYsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjAzLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuOVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9VcmdvdC5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiA5NixcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRoZXJlIGFyZSB3YXJyaW9ycyB3aG8gYmVjb21lIGdyZWF0IGZvciB0aGVpciBzdHJlbmd0aCwgY3VubmluZywgb3Igc2tpbGwgd2l0aCBhcm1zLiBPdGhlcnMgc2ltcGx5IHJlZnVzZSB0byBkaWUuIFVyZ290LCBvbmNlIGEgZ3JlYXQgc29sZGllciBvZiBOb3h1cywgbWF5IGNvbnN0aXR1dGUgYSBjYXNlIGluIHN1cHBvcnQgb2YgdGhlIGxhdHRlci4gUHJvbmUgdG8gZGl2aW5nIGhlYWRsb25nIGludG8gZW5lbXkgYmF0dGxlIGxpbmVzLCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInZhcnVzXCIsXG4gICAgXCJrZXlcIjogXCIxMTBcIixcbiAgICBcIm5hbWVcIjogXCJWYXJ1c1wiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgQXJyb3cgb2YgUmV0cmlidXRpb25cIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYXJrc21hblwiLFxuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MzcuNzYsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODIsXG4gICAgICBcIm1wXCI6IDM2MC40OCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAzMyxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzMCxcbiAgICAgIFwiYXJtb3JcIjogMjMuMjEyLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDU3NSxcbiAgICAgIFwiaHByZWdlblwiOiA1LjQyLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA3LjM0LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTQuNjYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDIuNDEsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA1LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDNcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vVmFydXMucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogMTQ0LFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydUaGUgbGlmZSBvZiBhbiBhcnJvdyBpcyBmbGVldGluZywgYnVpbHQgb2Ygbm90aGluZyBidXQgZGlyZWN0aW9uIGFuZCBpbnRlbnQuJyc8YnI+PGJyPkZvciBoaXMgaW5jb21wYXJhYmxlIHNraWxsIHdpdGggdGhlIGJvdyBhbmQgaGlzIHVucXVlc3Rpb25lZCBzZW5zZSBvZiBob25vciwgVmFydXMgd2FzIGNob3NlbiB0byBiZSB0aGUgd2FyZGVuIG9mIGEgc2FjcmVkIElvbmlhbiB0ZW1wbGUuIFRoZSB0ZW1wbGUgd2FzIGJ1aWx0IHRvIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidmF5bmVcIixcbiAgICBcImtleVwiOiBcIjY3XCIsXG4gICAgXCJuYW1lXCI6IFwiVmF5bmVcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIE5pZ2h0IEh1bnRlclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hcmtzbWFuXCIsXG4gICAgICBcIkFzc2Fzc2luXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA0OTguNDQsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODMsXG4gICAgICBcIm1wXCI6IDIzMS44LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDM1LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzMwLFxuICAgICAgXCJhcm1vclwiOiAxOS4wMTIsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy40LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDUuNDIsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYuOTcsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjQsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NS44OCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMS42NixcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDUsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogNFxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9WYXluZS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiAxOTIsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUaGUgd29ybGQgaXMgbm90IGFsd2F5cyBhcyBjaXZpbGl6ZWQgYXMgcGVvcGxlIG1pZ2h0IHRoaW5rLiBUaGVyZSBhcmUgc3RpbGwgdGhvc2Ugd2hvIHdvdWxkIGZvbGxvdyB0aGUgYmxhY2tlc3QgcGF0aHMgb2YgbWFnaWMgYW5kIGJlY29tZSBjb3JydXB0ZWQgYnkgdGhlIGRhcmtlciBwb3dlcnMgdGhhdCBmbG93IHRocm91Z2ggUnVuZXRlcnJhLiBTaGF1bmEgVmF5bmUga25vd3MgdGhpcyBmYWN0IHdlbGwuPGJyPjxicj5BcyBhIHlvdW5nIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidmVpZ2FyXCIsXG4gICAgXCJrZXlcIjogXCI0NVwiLFxuICAgIFwibmFtZVwiOiBcIlZlaWdhclwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgVGlueSBNYXN0ZXIgb2YgRXZpbFwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDQ5Mi43NixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MixcbiAgICAgIFwibXBcIjogMzkyLjQsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNTIsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDAsXG4gICAgICBcImFybW9yXCI6IDIyLjU1LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNzUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1MjUsXG4gICAgICBcImhwcmVnZW5cIjogNS40MixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUwLjcxLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAyLjYyNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjI0XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1ZlaWdhci5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiAyNDAsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUbyBtb3N0LCB0aG91Z2h0cyBvZiB5b3JkbGVzIGRvIG5vdCBjb25qdXJlIGltYWdlcyB0byBiZSBmZWFyZWQuIFRoZSBlYXN5Z29pbmcgaGFsZi1waW50IHJhY2UsIHRob3VnaCBmaWVyY2UsIGlzIG9mdGVuIHJlZ2FyZGVkIHdpdGggc29tZSBkZWdyZWUgb2Ygam92aWFsaXR5LiBUaGVpciBoaWdoLXBpdGNoZWQgdm9pY2VzIGFuZCBuYXR1cmFsbHkgY3V0ZSBmb3JtcyBpbnNwaXJlIHNvbWV0aGluZyBvZiBhIHByb3RlY3RpdmUgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ2ZWxrb3pcIixcbiAgICBcImtleVwiOiBcIjE2MVwiLFxuICAgIFwibmFtZVwiOiBcIlZlbCdLb3pcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEV5ZSBvZiB0aGUgVm9pZFwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUwNy42OCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA3NixcbiAgICAgIFwibXBcIjogMzc1LjYsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDIsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDAsXG4gICAgICBcImFybW9yXCI6IDIxLjg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDUyNSxcbiAgICAgIFwiaHByZWdlblwiOiA1LjQyLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTQuOTM3OSxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4xNDE1OSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAxLjM2XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1ZlbGtvei5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiAyODgsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJJIHBhc3MgaW50byB0aGUgc3VkZGVuIGdsYXJlLiBCbGluay4gQmxpbmssIGJsaW5rLCBibGluay4gTXkgZXllcyBhZGp1c3QgYW5kIGV2YWx1YXRlIHRoZSBsYW5kc2NhcGUgYmVmb3JlIG1lLjxicj48YnI+VGhlcmUncyBhIHNjdXJyeWluZy4gSSBsb29rIGRvd24gdG8gZmluZCBhIHNtYWxsLCB3aGl0ZSBjcmVhdHVyZSBzdGFuZGluZyBvbiBpdHMgaGluZCBsZWdzLCBzbmlmZmluZyBhdCBteSBib2R5LiBJdCBpbnRyaWd1ZXMgbWUuLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ2aVwiLFxuICAgIFwia2V5XCI6IFwiMjU0XCIsXG4gICAgXCJuYW1lXCI6IFwiVmlcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFBpbHRvdmVyIEVuZm9yY2VyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJBc3Nhc3NpblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTgyLjgsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODUsXG4gICAgICBcIm1wXCI6IDI5NS42LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQ1LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQ1LFxuICAgICAgXCJhcm1vclwiOiAyNS44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA5LjAxLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC45LFxuICAgICAgXCJtcHJlZ2VuXCI6IDguMDksXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjY1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTUuODgsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDMsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi41XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1ZpLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDMzNixcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRvIFZpLCBldmVyeSBwcm9ibGVtIGlzIGp1c3QgYW5vdGhlciBicmljayB3YWxsIHRvIHB1bmNoIHRocm91Z2ggd2l0aCBoZXIgZ2lnYW50aWMgaGV4dGVjaCBnYXVudGxldHMuIFRob3VnaCBzaGUgZ3JldyB1cCBvbiB0aGUgd3Jvbmcgc2lkZSBvZiB0aGUgbGF3LCBWaSBub3cgdXNlcyBoZXIgY3JpbWluYWwga25vdy1ob3cgdG8gc2VydmUgUGlsdG92ZXIncyBwb2xpY2UgZm9yY2UuIFZpJ3MgYnJhc2ggYXR0aXR1ZGUsIGFicmFzaXZlIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidmlrdG9yXCIsXG4gICAgXCJrZXlcIjogXCIxMTJcIixcbiAgICBcIm5hbWVcIjogXCJWaWt0b3JcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIE1hY2hpbmUgSGVyYWxkXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTE2LjA0LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDc4LFxuICAgICAgXCJtcFwiOiAzMjQsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNTAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDIyLjcyLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDQsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1MjUsXG4gICAgICBcImhwcmVnZW5cIjogNy44NCxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNjUsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUyLjA0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjExXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1Zpa3Rvci5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiAzODQsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJFYXJseSBpbiBsaWZlLCBWaWt0b3IgZGlzY292ZXJlZCBoaXMgcGFzc2lvbiBmb3Igc2NpZW5jZSBhbmQgaW52ZW50aW9uLCBwYXJ0aWN1bGFybHkgaW4gdGhlIGZpZWxkIG9mIG1lY2hhbmljYWwgYXV0b21hdGlvbi4gSGUgYXR0ZW5kZWQgWmF1bidzIHByZXN0aWdpb3VzIENvbGxlZ2Ugb2YgVGVjaG1hdHVyZ3kgYW5kIGxlZCB0aGUgdGVhbSB0aGF0IGNvbnN0cnVjdGVkIEJsaXR6Y3JhbmsgLSBhIHNjaWVudGlmaWMgYnJlYWt0aHJvdWdoIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidmxhZGltaXJcIixcbiAgICBcImtleVwiOiBcIjhcIixcbiAgICBcIm5hbWVcIjogXCJWbGFkaW1pclwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgQ3JpbXNvbiBSZWFwZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCIsXG4gICAgICBcIlRhbmtcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUyNSxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NCxcbiAgICAgIFwibXBcIjogMixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzMwLFxuICAgICAgXCJhcm1vclwiOiAyMyxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjMsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA0NTAsXG4gICAgICBcImhwcmVnZW5cIjogNy4wMDUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjYsXG4gICAgICBcIm1wcmVnZW5cIjogMCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1MixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1ZsYWRpbWlyLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQzMixcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRoZXJlIGlzIGEgdGVtcGxlIGhpZGRlbiBpbiB0aGUgbW91bnRhaW5zIGJldHdlZW4gTm94dXMgYW5kIHRoZSBUZW1wZXN0IEZsYXRzLCB3aGVyZSB0aGUgc2VjcmV0cyBvZiBhbiBhbmNpZW50IGFuZCB0ZXJyaWZ5aW5nIHNvcmNlcnkgYXJlIGtlcHQuIFRoZSBhcmVhIHN1cnJvdW5kaW5nIHRoZSB0ZW1wbGUgaXMgbGl0dGVyZWQgd2l0aCB0aGUgZXhzYW5ndWluYXRlZCBjb3Jwc2VzIG9mIHRob3NlIHdobyBoYXZlIG1pc3Rha2VubHkgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ2b2xpYmVhclwiLFxuICAgIFwia2V5XCI6IFwiMTA2XCIsXG4gICAgXCJuYW1lXCI6IFwiVm9saWJlYXJcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFRodW5kZXIncyBSb2FyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJUYW5rXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1ODQuNDgsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODYsXG4gICAgICBcIm1wXCI6IDI3MC40LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDMwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQ1LFxuICAgICAgXCJhcm1vclwiOiAyNi4zOCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA4LjA5LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42NSxcbiAgICAgIFwibXByZWdlblwiOiA4LjA5LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC42NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU5LjU0NCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4zLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjY3XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1ZvbGliZWFyLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb240LnBuZ1wiLFxuICAgICAgXCJ4XCI6IDAsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRoZSB1bmZvcmdpdmluZyBub3J0aGVybiByZWFjaGVzIG9mIHRoZSBGcmVsam9yZCBhcmUgaG9tZSB0byB0aGUgVXJzaW5lLCBhIGZpZXJjZSBhbmQgd2FybGlrZSByYWNlIHRoYXQgaGFzIGVuZHVyZWQgdGhlIGJhcnJlbiB0dW5kcmEgZm9yIHRob3VzYW5kcyBvZiB5ZWFycy4gVGhlaXIgbGVhZGVyIGlzIGEgZnVyaW91cyBhZHZlcnNhcnkgd2hvIGNvbW1hbmRzIHRoZSBmb3JjZSBvZiBsaWdodG5pbmcgdG8gc3RyaWtlIGZlYXIgd2l0aGluIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwid2Fyd2lja1wiLFxuICAgIFwia2V5XCI6IFwiMTlcIixcbiAgICBcIm5hbWVcIjogXCJXYXJ3aWNrXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBCbG9vZCBIdW50ZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIlRhbmtcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU5Mi42NCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5OCxcbiAgICAgIFwibXBcIjogMjQwLjQsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMzAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDUsXG4gICAgICBcImFybW9yXCI6IDI1Ljg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDguMzksXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcIm1wcmVnZW5cIjogOC4xMDUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjYsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA2Mi40MyxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4zNzUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA4LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuODhcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vV2Fyd2ljay5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uNC5wbmdcIixcbiAgICAgIFwieFwiOiA0OCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiV2Fyd2ljayB3YXMgb25jZSBhIG1hbiByZXZlcmVkIGZvciBoaXMgYWJpbGl0eSB0byB0cmFjayBkb3duIGh1bWFuIHNwZWNpbWVucyBmb3IgdGhlIGRhcmtlc3QgdHlwZXMgb2Ygc2NpZW50aWZpYyByZXNlYXJjaC4gV2hlbiBoaXMgYW1iaXRpb25zIGV4Y2VlZGVkIGhpcyBwaHlzaWNhbCBsaW1pdHMsIGhlIGRyYW5rIGEgZGFuZ2Vyb3VzIGVsaXhpciB0byB0cmFuc2Zvcm0gaGltc2VsZiBpbnRvIGFuIHVuc3RvcHBhYmxlIG1hbmh1bnRlci4gLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ4ZXJhdGhcIixcbiAgICBcImtleVwiOiBcIjEwMVwiLFxuICAgIFwibmFtZVwiOiBcIlhlcmF0aFwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgTWFndXMgQXNjZW5kYW50XCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiLFxuICAgICAgXCJBc3Nhc3NpblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTE0LjQsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODAsXG4gICAgICBcIm1wXCI6IDM2Ni45NixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0NCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0MCxcbiAgICAgIFwiYXJtb3JcIjogMjEuODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDUuNDIsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NC43LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDEuMzZcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vWGVyYXRoLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb240LnBuZ1wiLFxuICAgICAgXCJ4XCI6IDk2LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ0EgbGlmZXRpbWUgYXMgYSBzbGF2ZSBoYXMgcHJlcGFyZWQgbWUgZm9yIGV0ZXJuaXR5IGFzIHlvdXIgbWFzdGVyLicnPGJyPjxicj5YZXJhdGggaXMgYW4gQXNjZW5kZWQgTWFndXMgb2YgYW5jaWVudCBTaHVyaW1hLCBhIGJlaW5nIG9mIGFyY2FuZSBlbmVyZ3kgd3JpdGhpbmcgaW4gdGhlIGJyb2tlbiBzaGFyZHMgb2YgYSBtYWdpY2FsIHNhcmNvcGhhZ3VzLiBGb3IgbWlsbGVubmlhLCBoZSB3YXMgdHJhcHBlZCBiZW5lYXRoIHRoZSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInhpbnpoYW9cIixcbiAgICBcImtleVwiOiBcIjVcIixcbiAgICBcIm5hbWVcIjogXCJYaW4gWmhhb1wiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgU2VuZXNjaGFsIG9mIERlbWFjaWFcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIkFzc2Fzc2luXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA2MDAsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTIsXG4gICAgICBcIm1wXCI6IDI3My44LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDM1LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQ1LFxuICAgICAgXCJhcm1vclwiOiAyNS44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDE3NSxcbiAgICAgIFwiaHByZWdlblwiOiA4LjE3NSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNyxcbiAgICAgIFwibXByZWdlblwiOiA3LjI1NSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNDUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1Ny41NDQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjZcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vWGluWmhhby5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uNC5wbmdcIixcbiAgICAgIFwieFwiOiAxNDQsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnRGVhdGggaXMgaW5ldml0YWJsZSwgb25lIGNhbiBvbmx5IGF2b2lkIGRlZmVhdC4nJzxicj48YnI+V2hlbmV2ZXIgSmFydmFuIElJSSwgdGhlIGtpbmcgb2YgRGVtYWNpYSwgZGVsaXZlcnMgb25lIG9mIGhpcyByYWxseWluZyBzcGVlY2hlcyBmcm9tIHRoZSBnbGludGluZyBtYXJibGUgYmFsY29ueSBhdG9wIHRoZSBSb3lhbCBQYWxhY2UsIFhpbiBaaGFvIGlzIGF0IGhpcyBzaWRlLiBDb2luZWQgdGhlIFNlbmVzY2hhbCBvZiBEZW1hY2lhLC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwieWFzdW9cIixcbiAgICBcImtleVwiOiBcIjE1N1wiLFxuICAgIFwibmFtZVwiOiBcIllhc3VvXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBVbmZvcmdpdmVuXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJBc3Nhc3NpblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTE3Ljc2LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgyLFxuICAgICAgXCJtcFwiOiAxMDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0NSxcbiAgICAgIFwiYXJtb3JcIjogMjQuNzEyLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDE3NSxcbiAgICAgIFwiaHByZWdlblwiOiA2LjUxLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC45LFxuICAgICAgXCJtcHJlZ2VuXCI6IDAsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTUuMzc2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjIsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA2NyxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vWWFzdW8ucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjQucG5nXCIsXG4gICAgICBcInhcIjogMTkyLFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJZYXN1byBpcyBhIG1hbiBvZiByZXNvbHZlLCBhbiBhZ2lsZSBzd29yZHNtYW4gd2hvIHdpZWxkcyB0aGUgd2luZCBpdHNlbGYgdG8gY3V0IGRvd24gaGlzIGZvZXMuIFRoaXMgb25jZS1wcm91ZCB3YXJyaW9yIGhhcyBiZWVuIGRpc2dyYWNlZCBieSBhIGZhbHNlIGFjY3VzYXRpb24gYW5kIGZvcmNlZCBpbnRvIGEgZGVzcGVyYXRlIGZpZ2h0IGZvciBzdXJ2aXZhbC4gV2l0aCB0aGUgd29ybGQgdHVybmVkIGFnYWluc3QgaGltLCBoZSB3aWxsIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwieW9yaWNrXCIsXG4gICAgXCJrZXlcIjogXCI4M1wiLFxuICAgIFwibmFtZVwiOiBcIllvcmlja1wiLFxuICAgIFwidGl0bGVcIjogXCJTaGVwaGVyZCBvZiBTb3Vsc1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiVGFua1wiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTgwLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDEwMCxcbiAgICAgIFwibXBcIjogMzAwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQwLFxuICAgICAgXCJhcm1vclwiOiAzMCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiA0LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTc1LFxuICAgICAgXCJocHJlZ2VuXCI6IDgsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcIm1wcmVnZW5cIjogNy41LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC43NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU3LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiA1LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDJcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vWW9yaWNrLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb240LnBuZ1wiLFxuICAgICAgXCJ4XCI6IDI0MCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydUaGVzZSBpc2xlc+KApiBIb3cgdGhleSBzY3JlYW0uJyc8YnI+VGhlIGxhc3Qgc3Vydml2b3Igb2YgYSBsb25nLWZvcmdvdHRlbiByZWxpZ2lvdXMgb3JkZXIsIFlvcmljayBpcyBib3RoIGJsZXNzZWQgYW5kIGN1cnNlZCB3aXRoIHBvd2VyIG92ZXIgdGhlIGRlYWQuIFRyYXBwZWQgb24gdGhlIFNoYWRvdyBJc2xlcywgaGlzIG9ubHkgY29tcGFuaW9ucyBhcmUgdGhlIHJvdHRpbmcgY29ycHNlcyBhbmQgc2hyaWVraW5nIHNwaXJpdHMgdGhhdCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInphY1wiLFxuICAgIFwia2V5XCI6IFwiMTU0XCIsXG4gICAgXCJuYW1lXCI6IFwiWmFjXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBTZWNyZXQgV2VhcG9uXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiVGFua1wiLFxuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA2MTQuNixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5NSxcbiAgICAgIFwibXBcIjogMCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQwLFxuICAgICAgXCJhcm1vclwiOiAyMy44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDE3NSxcbiAgICAgIFwiaHByZWdlblwiOiA3LjkyLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiAwLFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU5LjY3LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjM3NSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDIsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMS42XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1phYy5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uNC5wbmdcIixcbiAgICAgIFwieFwiOiAyODgsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlphYyBpcyB0aGUgcHJvZHVjdCBvZiBhIFphdW4gZXhwZXJpbWVudCB0byBtYW51ZmFjdHVyZSBhIGhleGNoZW0tZW5naW5lZXJlZCBzdXBlcnNvbGRpZXIgLSB0aGUgWmF1biBBbW9ycGhvdXMgQ29tYmF0YW50LiBDb21iaW5pbmcgYnJ1dGUgc3RyZW5ndGggd2l0aCBsaW1pdGxlc3MgZmxleGliaWxpdHksIGhlIGlzIGEgdmVyc2F0aWxlIGp1Z2dlcm5hdXQ6IGEgY3JlYXRpdmUgZmlnaHRlciB3aG8gYm91bmNlcyBvdmVyIG9ic3RhY2xlcyAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInplZFwiLFxuICAgIFwia2V5XCI6IFwiMjM4XCIsXG4gICAgXCJuYW1lXCI6IFwiWmVkXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBNYXN0ZXIgb2YgU2hhZG93c1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkFzc2Fzc2luXCIsXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU3OS40LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgwLFxuICAgICAgXCJtcFwiOiAyMDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0NSxcbiAgICAgIFwiYXJtb3JcIjogMjYuODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogNy4wOSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNjUsXG4gICAgICBcIm1wcmVnZW5cIjogNTAsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTQuNzEyLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjQsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjAzLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuMVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9aZWQucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjQucG5nXCIsXG4gICAgICBcInhcIjogMzM2LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJaZWQgaXMgdGhlIGZpcnN0IG5pbmphIGluIDIwMCB5ZWFycyB0byB1bmxvY2sgdGhlIGFuY2llbnQsIGZvcmJpZGRlbiB3YXlzLiBIZSBkZWZpZWQgaGlzIGNsYW4gYW5kIG1hc3RlciwgY2FzdGluZyBvZmYgdGhlIGJhbGFuY2UgYW5kIGRpc2NpcGxpbmUgdGhhdCBoYWQgc2hhY2tsZWQgaGltIGFsbCBoaXMgbGlmZS4gWmVkIG5vdyBvZmZlcnMgcG93ZXIgdG8gdGhvc2Ugd2hvIGVtYnJhY2Uga25vd2xlZGdlIG9mIHRoZSBzaGFkb3dzLCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInppZ2dzXCIsXG4gICAgXCJrZXlcIjogXCIxMTVcIixcbiAgICBcIm5hbWVcIjogXCJaaWdnc1wiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgSGV4cGxvc2l2ZXMgRXhwZXJ0XCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTI0LjQsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODAsXG4gICAgICBcIm1wXCI6IDM4NCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0NyxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMyNSxcbiAgICAgIFwiYXJtb3JcIjogMjEuNTQ0LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuMyxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDU1MCxcbiAgICAgIFwiaHByZWdlblwiOiA2LjI1NSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNixcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTQuMjA4LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjEsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA0NzM0LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDJcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vWmlnZ3MucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjQucG5nXCIsXG4gICAgICBcInhcIjogMzg0LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJaaWdncyB3YXMgYm9ybiB3aXRoIGEgdGFsZW50IGZvciB0aW5rZXJpbmcsIGJ1dCBoaXMgY2hhb3RpYywgaHlwZXJhY3RpdmUgbmF0dXJlIHdhcyB1bnVzdWFsIGFtb25nIHlvcmRsZSBzY2llbnRpc3RzLiBBc3BpcmluZyB0byBiZSBhIHJldmVyZWQgaW52ZW50b3IgbGlrZSBIZWltZXJkaW5nZXIsIGhlIHJhdHRsZWQgdGhyb3VnaCBhbWJpdGlvdXMgcHJvamVjdHMgd2l0aCBtYW5pYyB6ZWFsLCBlbWJvbGRlbmVkIGJ5IGJvdGggaGlzIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiemlsZWFuXCIsXG4gICAgXCJrZXlcIjogXCIyNlwiLFxuICAgIFwibmFtZVwiOiBcIlppbGVhblwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgQ2hyb25va2VlcGVyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiU3VwcG9ydFwiLFxuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA0OTkuMjgsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNzcsXG4gICAgICBcIm1wXCI6IDM2MC44LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDYwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAxOS4xMzQsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy44LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDUuNDQsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjUsXG4gICAgICBcIm1wcmVnZW5cIjogOC41LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTEuNjQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi4xM1xuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9aaWxlYW4ucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjQucG5nXCIsXG4gICAgICBcInhcIjogNDMyLFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJJbiB0aGUgd2FzdGVsYW5kcyBvZiBVcnRpc3RhbiwgdGhlcmUgd2FzIG9uY2UgYSBncmVhdCBjaXR5LiBJdCBwZXJpc2hlZCBsb25nIGFnbyBpbiBhIHRlcnJpYmxlIFJ1bmUgV2FyLCBsaWtlIG1vc3Qgb2YgdGhlIGxhbmRzIGJlbG93IHRoZSBHcmVhdCBCYXJyaWVyLiBOZXZlcnRoZWxlc3MsIG9uZSBtYW4gc3Vydml2ZWQ6IGEgc29yY2VyZXIgbmFtZWQgWmlsZWFuLiBCZWluZyBvYnNlc3NlZCB3aXRoIHRpbWUsIGl0IHdhcyBvbmx5IC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwienlyYVwiLFxuICAgIFwia2V5XCI6IFwiMTQzXCIsXG4gICAgXCJuYW1lXCI6IFwiWnlyYVwiLFxuICAgIFwidGl0bGVcIjogXCJSaXNlIG9mIHRoZSBUaG9ybnNcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCIsXG4gICAgICBcIlN1cHBvcnRcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDQ5OS4zMixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA3NCxcbiAgICAgIFwibXBcIjogMzM0LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDUwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQwLFxuICAgICAgXCJhcm1vclwiOiAyMC4wNCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTc1LFxuICAgICAgXCJocHJlZ2VuXCI6IDUuNjksXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjUsXG4gICAgICBcIm1wcmVnZW5cIjogOC41LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTMuMzc2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjIsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi4xMVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9aeXJhLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb240LnBuZ1wiLFxuICAgICAgXCJ4XCI6IDAsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJMb25naW5nIHRvIHRha2UgY29udHJvbCBvZiBoZXIgZmF0ZSwgdGhlIGFuY2llbnQsIGR5aW5nIHBsYW50IFp5cmEgdHJhbnNmZXJyZWQgaGVyIGNvbnNjaW91c25lc3MgaW50byBhIGh1bWFuIGJvZHkgZm9yIGEgc2Vjb25kIGNoYW5jZSBhdCBsaWZlLiBDZW50dXJpZXMgYWdvLCBzaGUgYW5kIGhlciBraW5kIGRvbWluYXRlZCB0aGUgS3VtdW5ndSBKdW5nbGUsIHVzaW5nIHRob3JucyBhbmQgdmluZXMgdG8gY29uc3VtZSBhbnkgYW5pbWFsIC4uLlwiXG4gIH1cbl0iLCJtb2R1bGUuZXhwb3J0cz1bXG4gIHtcbiAgICBcImlkXCI6IFwiYmFycmllclwiLFxuICAgIFwibmFtZVwiOiBcIkJhcnJpZXJcIixcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiU2hpZWxkcyB5b3VyIGNoYW1waW9uIGZyb20gMTE1LTQ1NSBkYW1hZ2UgKGRlcGVuZGluZyBvbiBjaGFtcGlvbiBsZXZlbCkgZm9yIDIgc2Vjb25kcy5cIixcbiAgICBcInRvb2x0aXBcIjogXCJUZW1wb3JhcmlseSBzaGllbGRzIHt7IGYxIH19IGRhbWFnZSBmcm9tIHlvdXIgY2hhbXBpb24gZm9yIDIgc2Vjb25kcy5cIixcbiAgICBcImNvb2xkb3duXCI6IDE4MCxcbiAgICBcImtleVwiOiBcIjIxXCIsXG4gICAgXCJzdW1tb25lckxldmVsXCI6IDQsXG4gICAgXCJtYXhhbW1vXCI6IFwiLTFcIixcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3NwZWxsL1N1bW1vbmVyQmFycmllci5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL3NwZWxsMC5wbmdcIixcbiAgICAgIFwieFwiOiAwLFxuICAgICAgXCJ5XCI6IDBcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiYm9vc3RcIixcbiAgICBcIm5hbWVcIjogXCJDbGVhbnNlXCIsXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlJlbW92ZXMgYWxsIGRpc2FibGVzIGFuZCBzdW1tb25lciBzcGVsbCBkZWJ1ZmZzIGFmZmVjdGluZyB5b3VyIGNoYW1waW9uIGFuZCBsb3dlcnMgdGhlIGR1cmF0aW9uIG9mIGluY29taW5nIGRpc2FibGVzIGJ5IDY1JSBmb3IgMyBzZWNvbmRzLlwiLFxuICAgIFwidG9vbHRpcFwiOiBcIlJlbW92ZXMgYWxsIGRpc2FibGVzIGFuZCBzdW1tb25lciBzcGVsbCBkZWJ1ZmZzIGFmZmVjdGluZyB5b3VyIGNoYW1waW9uIGFuZCByZWR1Y2VzIHRoZSBkdXJhdGlvbiBvZiBkaXNhYmxlcyBieSA2NSUgZm9yIHRoZSBuZXh0IHt7IGYxIH19IHNlY29uZHMuXCIsXG4gICAgXCJjb29sZG93blwiOiAyMTAsXG4gICAgXCJrZXlcIjogXCIxXCIsXG4gICAgXCJzdW1tb25lckxldmVsXCI6IDYsXG4gICAgXCJtYXhhbW1vXCI6IFwiLTFcIixcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3NwZWxsL1N1bW1vbmVyQm9vc3QucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9zcGVsbDAucG5nXCIsXG4gICAgICBcInhcIjogNDgsXG4gICAgICBcInlcIjogMFxuICAgIH1cbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJkb3RcIixcbiAgICBcIm5hbWVcIjogXCJJZ25pdGVcIixcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiSWduaXRlcyB0YXJnZXQgZW5lbXkgY2hhbXBpb24sIGRlYWxpbmcgNzAtNDEwIHRydWUgZGFtYWdlIChkZXBlbmRpbmcgb24gY2hhbXBpb24gbGV2ZWwpIG92ZXIgNSBzZWNvbmRzLCBncmFudHMgeW91IHZpc2lvbiBvZiB0aGUgdGFyZ2V0LCBhbmQgcmVkdWNlcyBoZWFsaW5nIGVmZmVjdHMgb24gdGhlbSBmb3IgdGhlIGR1cmF0aW9uLlwiLFxuICAgIFwidG9vbHRpcFwiOiBcIklnbml0ZSBkZWFscyA8c3BhbiBjbGFzcz1cXFwiY29sb3JGRUZDRkZcXFwiPnt7IGYxIH19PC9zcGFuPiB0cnVlIGRhbWFnZSB0byB0YXJnZXQgZW5lbXkgY2hhbXBpb24gb3ZlciA1IHNlY29uZHMsIGdyYW50cyB5b3UgdmlzaW9uIG9mIHRoZSB0YXJnZXQgYW5kIGFwcGxpZXMgR3JpZXZvdXMgV291bmRzIGZvciB0aGUgZHVyYXRpb24uPGJyPjxicj48aT4oR3JpZXZvdXMgV291bmRzIHJlZHVjZXMgaGVhbGluZyBlZmZlY3RzIGJ5IDQwJS4gVGhpcyB2aXNpb24gZG9lcyBub3QgcmV2ZWFsIHN0ZWFsdGhlZCBlbmVtaWVzLik8L2k+XCIsXG4gICAgXCJjb29sZG93blwiOiAyMTAsXG4gICAgXCJrZXlcIjogXCIxNFwiLFxuICAgIFwic3VtbW9uZXJMZXZlbFwiOiAxMCxcbiAgICBcIm1heGFtbW9cIjogXCItMVwiLFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3BlbGwvU3VtbW9uZXJEb3QucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9zcGVsbDAucG5nXCIsXG4gICAgICBcInhcIjogMTQ0LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZXhoYXVzdFwiLFxuICAgIFwibmFtZVwiOiBcIkV4aGF1c3RcIixcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiRXhoYXVzdHMgdGFyZ2V0IGVuZW15IGNoYW1waW9uLCByZWR1Y2luZyB0aGVpciBNb3ZlbWVudCBTcGVlZCBhbmQgQXR0YWNrIFNwZWVkIGJ5IDMwJSwgdGhlaXIgQXJtb3IgYW5kIE1hZ2ljIFJlc2lzdCBieSAxMCwgYW5kIHRoZWlyIGRhbWFnZSBkZWFsdCBieSA0MCUgZm9yIDIuNSBzZWNvbmRzLlwiLFxuICAgIFwidG9vbHRpcFwiOiBcIkV4aGF1c3RzIHRhcmdldCBlbmVteSBjaGFtcGlvbiwgcmVkdWNpbmcgdGhlaXIgTW92ZW1lbnQgU3BlZWQgYW5kIEF0dGFjayBTcGVlZCBieSB7eyBmMyB9fSUsIHRoZWlyIEFybW9yIGFuZCBNYWdpYyBSZXNpc3QgYnkge3sgZjQgfX0sIGFuZCB0aGVpciBkYW1hZ2UgZGVhbHQgYnkge3sgZjIgfX0lIGZvciAyLjUgc2Vjb25kcy5cIixcbiAgICBcImNvb2xkb3duXCI6IDIxMCxcbiAgICBcImtleVwiOiBcIjNcIixcbiAgICBcInN1bW1vbmVyTGV2ZWxcIjogNCxcbiAgICBcIm1heGFtbW9cIjogXCItMVwiLFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3BlbGwvU3VtbW9uZXJFeGhhdXN0LnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvc3BlbGwwLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDE5MixcbiAgICAgIFwieVwiOiAwXG4gICAgfVxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImZsYXNoXCIsXG4gICAgXCJuYW1lXCI6IFwiRmxhc2hcIixcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGVsZXBvcnRzIHlvdXIgY2hhbXBpb24gYSBzaG9ydCBkaXN0YW5jZSB0b3dhcmQgeW91ciBjdXJzb3IncyBsb2NhdGlvbi5cIixcbiAgICBcInRvb2x0aXBcIjogXCJUZWxlcG9ydHMgeW91ciBjaGFtcGlvbiBhIHNob3J0IGRpc3RhbmNlIHRvd2FyZCB5b3VyIGN1cnNvcidzIGxvY2F0aW9uLlwiLFxuICAgIFwiY29vbGRvd25cIjogMzAwLFxuICAgIFwia2V5XCI6IFwiNFwiLFxuICAgIFwic3VtbW9uZXJMZXZlbFwiOiA4LFxuICAgIFwibWF4YW1tb1wiOiBcIi0xXCIsXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcGVsbC9TdW1tb25lckZsYXNoLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvc3BlbGwwLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDI0MCxcbiAgICAgIFwieVwiOiAwXG4gICAgfVxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImhhc3RlXCIsXG4gICAgXCJuYW1lXCI6IFwiR2hvc3RcIixcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiWW91ciBjaGFtcGlvbiBjYW4gbW92ZSB0aHJvdWdoIHVuaXRzIGFuZCBoYXMgMjgtNDUlIChkZXBlbmRpbmcgb24gY2hhbXBpb24gbGV2ZWwpIGluY3JlYXNlZCBNb3ZlbWVudCBTcGVlZCBmb3IgMTAgc2Vjb25kcy5cIixcbiAgICBcInRvb2x0aXBcIjogXCJZb3VyIGNoYW1waW9uIGNhbiBtb3ZlIHRocm91Z2ggdW5pdHMgYW5kIGhhcyB7eyBmMSB9fSUgaW5jcmVhc2VkIE1vdmVtZW50IFNwZWVkIGZvciAxMCBzZWNvbmRzLlwiLFxuICAgIFwiY29vbGRvd25cIjogMTgwLFxuICAgIFwia2V5XCI6IFwiNlwiLFxuICAgIFwic3VtbW9uZXJMZXZlbFwiOiAxLFxuICAgIFwibWF4YW1tb1wiOiBcIi0xXCIsXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcGVsbC9TdW1tb25lckhhc3RlLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvc3BlbGwwLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDI4OCxcbiAgICAgIFwieVwiOiAwXG4gICAgfVxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImhlYWxcIixcbiAgICBcIm5hbWVcIjogXCJIZWFsXCIsXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlJlc3RvcmVzIDkwLTM0NSBIZWFsdGggKGRlcGVuZGluZyBvbiBjaGFtcGlvbiBsZXZlbCkgYW5kIGdyYW50cyAzMCUgTW92ZW1lbnQgU3BlZWQgZm9yIDEgc2Vjb25kIHRvIHlvdSBhbmQgdGFyZ2V0IGFsbGllZCBjaGFtcGlvbi4gVGhpcyBoZWFsaW5nIGlzIGhhbHZlZCBmb3IgdW5pdHMgcmVjZW50bHkgYWZmZWN0ZWQgYnkgU3VtbW9uZXIgSGVhbC5cIixcbiAgICBcInRvb2x0aXBcIjogXCJSZXN0b3JlcyB7eyBmMSB9fSBIZWFsdGggYW5kIGdyYW50cyAzMCUgTW92ZW1lbnQgU3BlZWQgZm9yIDEgc2Vjb25kIHRvIHlvdXIgY2hhbXBpb24gYW5kIHRhcmdldCBhbGxpZWQgY2hhbXBpb24uIFRoaXMgaGVhbGluZyBpcyBoYWx2ZWQgZm9yIHVuaXRzIHJlY2VudGx5IGFmZmVjdGVkIGJ5IFN1bW1vbmVyIEhlYWwuPGJyPjxicj48c3BhbiBjbGFzcz1cXFwiY29sb3JGRkZGMDBcXFwiPklmIHRoaXMgc3BlbGwgY2Fubm90IGZpbmQgYSB0YXJnZXQsIGl0IHdpbGwgY2FzdCBvbiB0aGUgbW9zdCB3b3VuZGVkIGFsbGllZCBjaGFtcGlvbiBpbiByYW5nZS48L3NwYW4+XCIsXG4gICAgXCJjb29sZG93blwiOiAyNDAsXG4gICAgXCJrZXlcIjogXCI3XCIsXG4gICAgXCJzdW1tb25lckxldmVsXCI6IDEsXG4gICAgXCJtYXhhbW1vXCI6IFwiLTFcIixcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3NwZWxsL1N1bW1vbmVySGVhbC5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL3NwZWxsMC5wbmdcIixcbiAgICAgIFwieFwiOiAzMzYsXG4gICAgICBcInlcIjogMFxuICAgIH1cbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJtYW5hXCIsXG4gICAgXCJuYW1lXCI6IFwiQ2xhcml0eVwiLFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJSZXN0b3JlcyA1MCUgb2YgeW91ciBjaGFtcGlvbidzIG1heGltdW0gTWFuYS4gQWxzbyByZXN0b3JlcyBhbGxpZXMgZm9yIDI1JSBvZiB0aGVpciBtYXhpbXVtIE1hbmEuXCIsXG4gICAgXCJ0b29sdGlwXCI6IFwiUmVzdG9yZXMge3sgZjEgfX0lIG1heGltdW0gTWFuYSB0byB5b3VyIENoYW1waW9uIGFuZCB7eyBmMiB9fSUgdG8gbmVhcmJ5IGFsbGllcy5cIixcbiAgICBcImNvb2xkb3duXCI6IDI0MCxcbiAgICBcImtleVwiOiBcIjEzXCIsXG4gICAgXCJzdW1tb25lckxldmVsXCI6IDEsXG4gICAgXCJtYXhhbW1vXCI6IFwiLTFcIixcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3NwZWxsL1N1bW1vbmVyTWFuYS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL3NwZWxsMC5wbmdcIixcbiAgICAgIFwieFwiOiAzODQsXG4gICAgICBcInlcIjogMFxuICAgIH1cbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJwb3JvcmVjYWxsXCIsXG4gICAgXCJuYW1lXCI6IFwiVG8gdGhlIEtpbmchXCIsXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlF1aWNrbHkgdHJhdmVsIHRvIHRoZSBQb3JvIEtpbmcncyBzaWRlLlwiLFxuICAgIFwidG9vbHRpcFwiOiBcIjxzcGFuIGNsYXNzPVxcXCJjb2xvckZGRTA3NlxcXCI+UGFzc2l2ZTo8L3NwYW4+IEhpdHRpbmcgYW4gZW5lbXkgY2hhbXBpb24gd2l0aCBhIFBvcm8gZ2l2ZXMgeW91ciB0ZWFtIGEgUG9ybyBNYXJrLiBVcG9uIHJlYWNoaW5nIDEwIFBvcm8gTWFya3MsIHlvdXIgdGVhbSBzdW1tb25zIHRoZSBQb3JvIEtpbmcgdG8gZmlnaHQgYWxvbmdzaWRlIHRoZW0uIFdoaWxlIHRoZSBQb3JvIEtpbmcgaXMgYWN0aXZlLCBubyBQb3JvIE1hcmtzIGNhbiBiZSBzY29yZWQgYnkgZWl0aGVyIHRlYW0uPGJyPjxicj48c3BhbiBjbGFzcz1cXFwiY29sb3JGRkUwNzZcXFwiPkFjdGl2ZTo8L3NwYW4+IFF1aWNrbHkgZGFzaCB0byBLaW5nIFBvcm8ncyBzaWRlLiBDYW4gb25seSBiZSBjYXN0IHdoaWxlIHRoZSBQb3JvIEtpbmcgaXMgc3VtbW9uZWQgZm9yIHlvdXIgdGVhbS4gPGJyPjxicj48aT48c3BhbiBjbGFzcz1cXFwiY29sb3JGREQwMTdcXFwiPicnUG9yb3MgdHVnIHRoZSBoZWFydHN0cmluZ3MuIFRoZSByZXN0IG9mIHlvdSBqdXN0IGNvbWVzIGFsb25nIGZvciB0aGUgcmlkZS4nJzwvc3Bhbj48L2k+XCIsXG4gICAgXCJjb29sZG93blwiOiAxMCxcbiAgICBcImtleVwiOiBcIjMwXCIsXG4gICAgXCJzdW1tb25lckxldmVsXCI6IDEsXG4gICAgXCJtYXhhbW1vXCI6IFwiLTFcIixcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3NwZWxsL1N1bW1vbmVyUG9yb1JlY2FsbC5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL3NwZWxsMC5wbmdcIixcbiAgICAgIFwieFwiOiA0MzIsXG4gICAgICBcInlcIjogMFxuICAgIH1cbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJwb3JvdGhyb3dcIixcbiAgICBcIm5hbWVcIjogXCJQb3JvIFRvc3NcIixcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVG9zcyBhIFBvcm8gYXQgeW91ciBlbmVtaWVzLiBJZiBpdCBoaXRzLCB5b3UgY2FuIHF1aWNrbHkgdHJhdmVsIHRvIHlvdXIgdGFyZ2V0IGFzIGEgZm9sbG93IHVwLlwiLFxuICAgIFwidG9vbHRpcFwiOiBcIlRvc3MgYSBQb3JvIGEgbG9uZyBkaXN0YW5jZSwgZGVhbGluZyB7eyBmMiB9fSB0cnVlIGRhbWFnZSB0byB0aGUgZmlyc3QgZW5lbXkgdW5pdCBoaXQuIFRoaXMgYWJpbGl0eSBjYW4gYmUgcmVjYXN0IGZvciAzIHNlY29uZHMgaWYgaXQgaGl0cyBhbiBlbmVteSB0byBkYXNoIHRvIHRoZSB0YXJnZXQgaGl0LiBEYXNoaW5nIHRvIHRoZSB0YXJnZXQgd2lsbCByZWR1Y2UgdGhlIGNvb2xkb3duIG9mIFBvcm8gVG9zcyBieSA1IHNlY29uZHMuPGJyPjxicj5Qb3JvcyBhcmUgbm90IGJsb2NrZWQgYnkgc3BlbGwgc2hpZWxkcyBvciB3aW5kIHdhbGxzIGJlY2F1c2UgdGhleSBhcmUgYW5pbWFscywgbm90IHNwZWxscyE8YnI+PGJyPjxpPjxzcGFuIGNsYXNzPVxcXCJjb2xvckZERDAxN1xcXCI+JydQb3JvcyBhcmUgYSBtb2RlbCBmb3IgUnVuZXRlcnJhbiBhZXJvZHluYW1pY3MuJyc8L3NwYW4+PC9pPlwiLFxuICAgIFwiY29vbGRvd25cIjogMjAsXG4gICAgXCJrZXlcIjogXCIzMVwiLFxuICAgIFwic3VtbW9uZXJMZXZlbFwiOiAxLFxuICAgIFwibWF4YW1tb1wiOiBcIi0xXCIsXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcGVsbC9TdW1tb25lclBvcm9UaHJvdy5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL3NwZWxsMC5wbmdcIixcbiAgICAgIFwieFwiOiAwLFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfVxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInNtaXRlXCIsXG4gICAgXCJuYW1lXCI6IFwiU21pdGVcIixcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiRGVhbHMgMzkwLTEwMDAgdHJ1ZSBkYW1hZ2UgKGRlcGVuZGluZyBvbiBjaGFtcGlvbiBsZXZlbCkgdG8gdGFyZ2V0IGVwaWMgb3IgbGFyZ2UgbW9uc3RlciBvciBlbmVteSBtaW5pb24uXCIsXG4gICAgXCJ0b29sdGlwXCI6IFwiRGVhbHMgPHNwYW4gY2xhc3M9XFxcImNvbG9yRkVGQ0ZGXFxcIj57eyBmMSB9fTwvc3Bhbj4gdHJ1ZSBkYW1hZ2UgdG8gdGFyZ2V0IGVwaWMgb3IgbGFyZ2UgbW9uc3RlciBvciBlbmVteSBtaW5pb24uPGJyPjxicj5TbWl0ZSByZWdhaW5zIGEgY2hhcmdlIGV2ZXJ5IHt7IGYzIH19IHNlY29uZHMsIHVwIHRvIGEgbWF4aW11bSBvZiAyIGNoYXJnZXMuPGJyPjxicj48aT5TbWl0aW5nIExhcmdlIE1vbnN0ZXJzIGluc3RhbnRseSBoYXJ2ZXN0cyBhZGRpdGlvbmFsIGJvbnVzZXMgYmFzZWQgb24gdGhlIE1vbnN0ZXIuIE1vdXNlIG92ZXIgbGFyZ2UganVuZ2xlIG1vbnN0ZXJzIHRvIHNlZSBwb3RlbnRpYWwgYm9udXMgcmV3YXJkcy48L2k+XCIsXG4gICAgXCJjb29sZG93blwiOiA3NSxcbiAgICBcImtleVwiOiBcIjExXCIsXG4gICAgXCJzdW1tb25lckxldmVsXCI6IDEwLFxuICAgIFwibWF4YW1tb1wiOiBcIjJcIixcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3NwZWxsL1N1bW1vbmVyU21pdGUucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9zcGVsbDAucG5nXCIsXG4gICAgICBcInhcIjogNDgsXG4gICAgICBcInlcIjogNDhcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwic25vd2JhbGxcIixcbiAgICBcIm5hbWVcIjogXCJNYXJrXCIsXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRocm93IGEgc25vd2JhbGwgaW4gYSBzdHJhaWdodCBsaW5lIGF0IHlvdXIgZW5lbWllcy4gSWYgaXQgaGl0cyBhbiBlbmVteSwgdGhleSBiZWNvbWUgbWFya2VkIGFuZCB5b3VyIGNoYW1waW9uIGNhbiBxdWlja2x5IHRyYXZlbCB0byB0aGUgbWFya2VkIHRhcmdldCBhcyBhIGZvbGxvdyB1cC5cIixcbiAgICBcInRvb2x0aXBcIjogXCJUaHJvdyBhIHNub3diYWxsIGEgbG9uZyBkaXN0YW5jZSwgZGVhbGluZyB7eyBmMSB9fSB0cnVlIGRhbWFnZSB0byB0aGUgZmlyc3QgZW5lbXkgdW5pdCBoaXQuIElmIGl0IGhpdHMgYW4gZW5lbXksIHRoaXMgYWJpbGl0eSBjYW4gYmUgcmVjYXN0IGZvciB7eyBmMiB9fSBzZWNvbmRzIHRvIERhc2ggdG8gdGhlIHRhZ2dlZCB1bml0LCBkZWFsaW5nIGFuIGFkZGl0aW9uYWwge3sgZjUgfX0gdHJ1ZSBkYW1hZ2UuIERhc2hpbmcgdG8gdGhlIHRhcmdldCB3aWxsIHJlZHVjZSB0aGUgY29vbGRvd24gb2YgTWFyayBieSB7eyBmMyB9fSUuPGJyPjxicj48c3BhbiBjbGFzcz1cXFwiY29sb3JGRkZGMDBcXFwiPk1hcmsgcHJvamVjdGlsZXMgYXJlIG5vdCBzdG9wcGVkIGJ5IHNwZWxsIHNoaWVsZHMgb3IgcHJvamVjdGlsZSBtaXRpZ2F0aW9uLjwvc3Bhbj5cIixcbiAgICBcImNvb2xkb3duXCI6IDgwLFxuICAgIFwia2V5XCI6IFwiMzJcIixcbiAgICBcInN1bW1vbmVyTGV2ZWxcIjogMSxcbiAgICBcIm1heGFtbW9cIjogXCItMVwiLFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3BlbGwvU3VtbW9uZXJTbm93YmFsbC5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL3NwZWxsMC5wbmdcIixcbiAgICAgIFwieFwiOiA5NixcbiAgICAgIFwieVwiOiA0OFxuICAgIH1cbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ0ZWxlcG9ydFwiLFxuICAgIFwibmFtZVwiOiBcIlRlbGVwb3J0XCIsXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkFmdGVyIGNoYW5uZWxpbmcgZm9yIDQuNSBzZWNvbmRzLCB0ZWxlcG9ydHMgeW91ciBjaGFtcGlvbiB0byB0YXJnZXQgYWxsaWVkIHN0cnVjdHVyZSwgbWluaW9uLCBvciB3YXJkLlwiLFxuICAgIFwidG9vbHRpcFwiOiBcIkFmdGVyIGNoYW5uZWxpbmcgZm9yIHt7IGYxIH19IHNlY29uZHMsIHlvdXIgY2hhbXBpb24gdGVsZXBvcnRzIHRvIHRhcmdldCBhbGxpZWQgc3RydWN0dXJlLCBtaW5pb24sIG9yIHdhcmQuPGJyPjxicj5Zb3UgbWF5IHJlYWN0aXZhdGUgVGVsZXBvcnQgdG8gY2FuY2VsIGl0LCBwbGFjaW5nIGl0IG9uIGEge3sgZjMgfX0gc2Vjb25kIGNvb2xkb3duLlwiLFxuICAgIFwiY29vbGRvd25cIjogMzAwLFxuICAgIFwia2V5XCI6IFwiMTJcIixcbiAgICBcInN1bW1vbmVyTGV2ZWxcIjogNixcbiAgICBcIm1heGFtbW9cIjogXCItMVwiLFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3BlbGwvU3VtbW9uZXJUZWxlcG9ydC5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL3NwZWxsMC5wbmdcIixcbiAgICAgIFwieFwiOiAxNDQsXG4gICAgICBcInlcIjogNDhcbiAgICB9XG4gIH1cbl0iLCJcclxuLyoqXHJcbiAqIEVsZW1lbnQgcHJvdG90eXBlLlxyXG4gKi9cclxuXHJcbnZhciBwcm90byA9IEVsZW1lbnQucHJvdG90eXBlO1xyXG5cclxuLyoqXHJcbiAqIFZlbmRvciBmdW5jdGlvbi5cclxuICovXHJcblxyXG52YXIgdmVuZG9yID0gcHJvdG8ubWF0Y2hlc1NlbGVjdG9yXHJcbiAgfHwgcHJvdG8ud2Via2l0TWF0Y2hlc1NlbGVjdG9yXHJcbiAgfHwgcHJvdG8ubW96TWF0Y2hlc1NlbGVjdG9yXHJcbiAgfHwgcHJvdG8ubXNNYXRjaGVzU2VsZWN0b3JcclxuICB8fCBwcm90by5vTWF0Y2hlc1NlbGVjdG9yO1xyXG5cclxuLyoqXHJcbiAqIEV4cG9zZSBgbWF0Y2goKWAuXHJcbiAqL1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBtYXRjaDtcclxuXHJcbi8qKlxyXG4gKiBNYXRjaCBgZWxgIHRvIGBzZWxlY3RvcmAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxcclxuICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gbWF0Y2goZWwsIHNlbGVjdG9yKSB7XHJcbiAgaWYgKHZlbmRvcikgcmV0dXJuIHZlbmRvci5jYWxsKGVsLCBzZWxlY3Rvcik7XHJcbiAgdmFyIG5vZGVzID0gZWwucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgKytpKSB7XHJcbiAgICBpZiAobm9kZXNbaV0gPT0gZWwpIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICByZXR1cm4gZmFsc2U7XHJcbn0iLCIndXNlIHN0cmljdCc7XG4vLyBDcmVhdGUgYSByYW5nZSBvYmplY3QgZm9yIGVmZmljZW50bHkgcmVuZGVyaW5nIHN0cmluZ3MgdG8gZWxlbWVudHMuXG52YXIgcmFuZ2U7XG5cbnZhciBkb2MgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50O1xuXG52YXIgdGVzdEVsID0gZG9jID9cbiAgICBkb2MuYm9keSB8fCBkb2MuY3JlYXRlRWxlbWVudCgnZGl2JykgOlxuICAgIHt9O1xuXG52YXIgTlNfWEhUTUwgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCc7XG5cbnZhciBFTEVNRU5UX05PREUgPSAxO1xudmFyIFRFWFRfTk9ERSA9IDM7XG52YXIgQ09NTUVOVF9OT0RFID0gODtcblxuLy8gRml4ZXMgPGh0dHBzOi8vZ2l0aHViLmNvbS9wYXRyaWNrLXN0ZWVsZS1pZGVtL21vcnBoZG9tL2lzc3Vlcy8zMj5cbi8vIChJRTcrIHN1cHBvcnQpIDw9SUU3IGRvZXMgbm90IHN1cHBvcnQgZWwuaGFzQXR0cmlidXRlKG5hbWUpXG52YXIgaGFzQXR0cmlidXRlTlM7XG5cbmlmICh0ZXN0RWwuaGFzQXR0cmlidXRlTlMpIHtcbiAgICBoYXNBdHRyaWJ1dGVOUyA9IGZ1bmN0aW9uKGVsLCBuYW1lc3BhY2VVUkksIG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGVsLmhhc0F0dHJpYnV0ZU5TKG5hbWVzcGFjZVVSSSwgbmFtZSk7XG4gICAgfTtcbn0gZWxzZSBpZiAodGVzdEVsLmhhc0F0dHJpYnV0ZSkge1xuICAgIGhhc0F0dHJpYnV0ZU5TID0gZnVuY3Rpb24oZWwsIG5hbWVzcGFjZVVSSSwgbmFtZSkge1xuICAgICAgICByZXR1cm4gZWwuaGFzQXR0cmlidXRlKG5hbWUpO1xuICAgIH07XG59IGVsc2Uge1xuICAgIGhhc0F0dHJpYnV0ZU5TID0gZnVuY3Rpb24oZWwsIG5hbWVzcGFjZVVSSSwgbmFtZSkge1xuICAgICAgICByZXR1cm4gISFlbC5nZXRBdHRyaWJ1dGVOb2RlKG5hbWUpO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIHRvRWxlbWVudChzdHIpIHtcbiAgICBpZiAoIXJhbmdlICYmIGRvYy5jcmVhdGVSYW5nZSkge1xuICAgICAgICByYW5nZSA9IGRvYy5jcmVhdGVSYW5nZSgpO1xuICAgICAgICByYW5nZS5zZWxlY3ROb2RlKGRvYy5ib2R5KTtcbiAgICB9XG5cbiAgICB2YXIgZnJhZ21lbnQ7XG4gICAgaWYgKHJhbmdlICYmIHJhbmdlLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudCkge1xuICAgICAgICBmcmFnbWVudCA9IHJhbmdlLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChzdHIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZyYWdtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2JvZHknKTtcbiAgICAgICAgZnJhZ21lbnQuaW5uZXJIVE1MID0gc3RyO1xuICAgIH1cbiAgICByZXR1cm4gZnJhZ21lbnQuY2hpbGROb2Rlc1swXTtcbn1cblxuZnVuY3Rpb24gc3luY0Jvb2xlYW5BdHRyUHJvcChmcm9tRWwsIHRvRWwsIG5hbWUpIHtcbiAgICBpZiAoZnJvbUVsW25hbWVdICE9PSB0b0VsW25hbWVdKSB7XG4gICAgICAgIGZyb21FbFtuYW1lXSA9IHRvRWxbbmFtZV07XG4gICAgICAgIGlmIChmcm9tRWxbbmFtZV0pIHtcbiAgICAgICAgICAgIGZyb21FbC5zZXRBdHRyaWJ1dGUobmFtZSwgJycpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnJvbUVsLnJlbW92ZUF0dHJpYnV0ZShuYW1lLCAnJyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbnZhciBzcGVjaWFsRWxIYW5kbGVycyA9IHtcbiAgICAvKipcbiAgICAgKiBOZWVkZWQgZm9yIElFLiBBcHBhcmVudGx5IElFIGRvZXNuJ3QgdGhpbmsgdGhhdCBcInNlbGVjdGVkXCIgaXMgYW5cbiAgICAgKiBhdHRyaWJ1dGUgd2hlbiByZWFkaW5nIG92ZXIgdGhlIGF0dHJpYnV0ZXMgdXNpbmcgc2VsZWN0RWwuYXR0cmlidXRlc1xuICAgICAqL1xuICAgIE9QVElPTjogZnVuY3Rpb24oZnJvbUVsLCB0b0VsKSB7XG4gICAgICAgIHN5bmNCb29sZWFuQXR0clByb3AoZnJvbUVsLCB0b0VsLCAnc2VsZWN0ZWQnKTtcbiAgICB9LFxuICAgIC8qKlxuICAgICAqIFRoZSBcInZhbHVlXCIgYXR0cmlidXRlIGlzIHNwZWNpYWwgZm9yIHRoZSA8aW5wdXQ+IGVsZW1lbnQgc2luY2UgaXQgc2V0c1xuICAgICAqIHRoZSBpbml0aWFsIHZhbHVlLiBDaGFuZ2luZyB0aGUgXCJ2YWx1ZVwiIGF0dHJpYnV0ZSB3aXRob3V0IGNoYW5naW5nIHRoZVxuICAgICAqIFwidmFsdWVcIiBwcm9wZXJ0eSB3aWxsIGhhdmUgbm8gZWZmZWN0IHNpbmNlIGl0IGlzIG9ubHkgdXNlZCB0byB0aGUgc2V0IHRoZVxuICAgICAqIGluaXRpYWwgdmFsdWUuICBTaW1pbGFyIGZvciB0aGUgXCJjaGVja2VkXCIgYXR0cmlidXRlLCBhbmQgXCJkaXNhYmxlZFwiLlxuICAgICAqL1xuICAgIElOUFVUOiBmdW5jdGlvbihmcm9tRWwsIHRvRWwpIHtcbiAgICAgICAgc3luY0Jvb2xlYW5BdHRyUHJvcChmcm9tRWwsIHRvRWwsICdjaGVja2VkJyk7XG4gICAgICAgIHN5bmNCb29sZWFuQXR0clByb3AoZnJvbUVsLCB0b0VsLCAnZGlzYWJsZWQnKTtcblxuICAgICAgICBpZiAoZnJvbUVsLnZhbHVlICE9PSB0b0VsLnZhbHVlKSB7XG4gICAgICAgICAgICBmcm9tRWwudmFsdWUgPSB0b0VsLnZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFoYXNBdHRyaWJ1dGVOUyh0b0VsLCBudWxsLCAndmFsdWUnKSkge1xuICAgICAgICAgICAgZnJvbUVsLnJlbW92ZUF0dHJpYnV0ZSgndmFsdWUnKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBURVhUQVJFQTogZnVuY3Rpb24oZnJvbUVsLCB0b0VsKSB7XG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IHRvRWwudmFsdWU7XG4gICAgICAgIGlmIChmcm9tRWwudmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBmcm9tRWwudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmcm9tRWwuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgZnJvbUVsLmZpcnN0Q2hpbGQubm9kZVZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdHdvIG5vZGUncyBuYW1lcyBhcmUgdGhlIHNhbWUuXG4gKlxuICogTk9URTogV2UgZG9uJ3QgYm90aGVyIGNoZWNraW5nIGBuYW1lc3BhY2VVUklgIGJlY2F1c2UgeW91IHdpbGwgbmV2ZXIgZmluZCB0d28gSFRNTCBlbGVtZW50cyB3aXRoIHRoZSBzYW1lXG4gKiAgICAgICBub2RlTmFtZSBhbmQgZGlmZmVyZW50IG5hbWVzcGFjZSBVUklzLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gYVxuICogQHBhcmFtIHtFbGVtZW50fSBiIFRoZSB0YXJnZXQgZWxlbWVudFxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gY29tcGFyZU5vZGVOYW1lcyhmcm9tRWwsIHRvRWwpIHtcbiAgICB2YXIgZnJvbU5vZGVOYW1lID0gZnJvbUVsLm5vZGVOYW1lO1xuICAgIHZhciB0b05vZGVOYW1lID0gdG9FbC5ub2RlTmFtZTtcblxuICAgIGlmIChmcm9tTm9kZU5hbWUgPT09IHRvTm9kZU5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHRvRWwuYWN0dWFsaXplICYmXG4gICAgICAgIGZyb21Ob2RlTmFtZS5jaGFyQ29kZUF0KDApIDwgOTEgJiYgLyogZnJvbSB0YWcgbmFtZSBpcyB1cHBlciBjYXNlICovXG4gICAgICAgIHRvTm9kZU5hbWUuY2hhckNvZGVBdCgwKSA+IDkwIC8qIHRhcmdldCB0YWcgbmFtZSBpcyBsb3dlciBjYXNlICovKSB7XG4gICAgICAgIC8vIElmIHRoZSB0YXJnZXQgZWxlbWVudCBpcyBhIHZpcnR1YWwgRE9NIG5vZGUgdGhlbiB3ZSBtYXkgbmVlZCB0byBub3JtYWxpemUgdGhlIHRhZyBuYW1lXG4gICAgICAgIC8vIGJlZm9yZSBjb21wYXJpbmcuIE5vcm1hbCBIVE1MIGVsZW1lbnRzIHRoYXQgYXJlIGluIHRoZSBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIlxuICAgICAgICAvLyBhcmUgY29udmVydGVkIHRvIHVwcGVyIGNhc2VcbiAgICAgICAgcmV0dXJuIGZyb21Ob2RlTmFtZSA9PT0gdG9Ob2RlTmFtZS50b1VwcGVyQ2FzZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbi8qKlxuICogQ3JlYXRlIGFuIGVsZW1lbnQsIG9wdGlvbmFsbHkgd2l0aCBhIGtub3duIG5hbWVzcGFjZSBVUkkuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgdGhlIGVsZW1lbnQgbmFtZSwgZS5nLiAnZGl2JyBvciAnc3ZnJ1xuICogQHBhcmFtIHtzdHJpbmd9IFtuYW1lc3BhY2VVUkldIHRoZSBlbGVtZW50J3MgbmFtZXNwYWNlIFVSSSwgaS5lLiB0aGUgdmFsdWUgb2ZcbiAqIGl0cyBgeG1sbnNgIGF0dHJpYnV0ZSBvciBpdHMgaW5mZXJyZWQgbmFtZXNwYWNlLlxuICpcbiAqIEByZXR1cm4ge0VsZW1lbnR9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnROUyhuYW1lLCBuYW1lc3BhY2VVUkkpIHtcbiAgICByZXR1cm4gIW5hbWVzcGFjZVVSSSB8fCBuYW1lc3BhY2VVUkkgPT09IE5TX1hIVE1MID9cbiAgICAgICAgZG9jLmNyZWF0ZUVsZW1lbnQobmFtZSkgOlxuICAgICAgICBkb2MuY3JlYXRlRWxlbWVudE5TKG5hbWVzcGFjZVVSSSwgbmFtZSk7XG59XG5cbi8qKlxuICogTG9vcCBvdmVyIGFsbCBvZiB0aGUgYXR0cmlidXRlcyBvbiB0aGUgdGFyZ2V0IG5vZGUgYW5kIG1ha2Ugc3VyZSB0aGUgb3JpZ2luYWxcbiAqIERPTSBub2RlIGhhcyB0aGUgc2FtZSBhdHRyaWJ1dGVzLiBJZiBhbiBhdHRyaWJ1dGUgZm91bmQgb24gdGhlIG9yaWdpbmFsIG5vZGVcbiAqIGlzIG5vdCBvbiB0aGUgbmV3IG5vZGUgdGhlbiByZW1vdmUgaXQgZnJvbSB0aGUgb3JpZ2luYWwgbm9kZS5cbiAqXG4gKiBAcGFyYW0gIHtFbGVtZW50fSBmcm9tTm9kZVxuICogQHBhcmFtICB7RWxlbWVudH0gdG9Ob2RlXG4gKi9cbmZ1bmN0aW9uIG1vcnBoQXR0cnMoZnJvbU5vZGUsIHRvTm9kZSkge1xuICAgIHZhciBhdHRycyA9IHRvTm9kZS5hdHRyaWJ1dGVzO1xuICAgIHZhciBpO1xuICAgIHZhciBhdHRyO1xuICAgIHZhciBhdHRyTmFtZTtcbiAgICB2YXIgYXR0ck5hbWVzcGFjZVVSSTtcbiAgICB2YXIgYXR0clZhbHVlO1xuICAgIHZhciBmcm9tVmFsdWU7XG5cbiAgICBpZiAodG9Ob2RlLmFzc2lnbkF0dHJpYnV0ZXMpIHtcbiAgICAgICAgdG9Ob2RlLmFzc2lnbkF0dHJpYnV0ZXMoZnJvbU5vZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoaSA9IGF0dHJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICBhdHRyID0gYXR0cnNbaV07XG4gICAgICAgICAgICBhdHRyTmFtZSA9IGF0dHIubmFtZTtcbiAgICAgICAgICAgIGF0dHJOYW1lc3BhY2VVUkkgPSBhdHRyLm5hbWVzcGFjZVVSSTtcbiAgICAgICAgICAgIGF0dHJWYWx1ZSA9IGF0dHIudmFsdWU7XG5cbiAgICAgICAgICAgIGlmIChhdHRyTmFtZXNwYWNlVVJJKSB7XG4gICAgICAgICAgICAgICAgYXR0ck5hbWUgPSBhdHRyLmxvY2FsTmFtZSB8fCBhdHRyTmFtZTtcbiAgICAgICAgICAgICAgICBmcm9tVmFsdWUgPSBmcm9tTm9kZS5nZXRBdHRyaWJ1dGVOUyhhdHRyTmFtZXNwYWNlVVJJLCBhdHRyTmFtZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZnJvbVZhbHVlICE9PSBhdHRyVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbU5vZGUuc2V0QXR0cmlidXRlTlMoYXR0ck5hbWVzcGFjZVVSSSwgYXR0ck5hbWUsIGF0dHJWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmcm9tVmFsdWUgPSBmcm9tTm9kZS5nZXRBdHRyaWJ1dGUoYXR0ck5hbWUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZyb21WYWx1ZSAhPT0gYXR0clZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyb21Ob2RlLnNldEF0dHJpYnV0ZShhdHRyTmFtZSwgYXR0clZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgYW55IGV4dHJhIGF0dHJpYnV0ZXMgZm91bmQgb24gdGhlIG9yaWdpbmFsIERPTSBlbGVtZW50IHRoYXRcbiAgICAvLyB3ZXJlbid0IGZvdW5kIG9uIHRoZSB0YXJnZXQgZWxlbWVudC5cbiAgICBhdHRycyA9IGZyb21Ob2RlLmF0dHJpYnV0ZXM7XG5cbiAgICBmb3IgKGkgPSBhdHRycy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICBhdHRyID0gYXR0cnNbaV07XG4gICAgICAgIGlmIChhdHRyLnNwZWNpZmllZCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGF0dHJOYW1lID0gYXR0ci5uYW1lO1xuICAgICAgICAgICAgYXR0ck5hbWVzcGFjZVVSSSA9IGF0dHIubmFtZXNwYWNlVVJJO1xuXG4gICAgICAgICAgICBpZiAoYXR0ck5hbWVzcGFjZVVSSSkge1xuICAgICAgICAgICAgICAgIGF0dHJOYW1lID0gYXR0ci5sb2NhbE5hbWUgfHwgYXR0ck5hbWU7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWhhc0F0dHJpYnV0ZU5TKHRvTm9kZSwgYXR0ck5hbWVzcGFjZVVSSSwgYXR0ck5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyb21Ob2RlLnJlbW92ZUF0dHJpYnV0ZU5TKGF0dHJOYW1lc3BhY2VVUkksIGF0dHJOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICghaGFzQXR0cmlidXRlTlModG9Ob2RlLCBudWxsLCBhdHRyTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbU5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogQ29waWVzIHRoZSBjaGlsZHJlbiBvZiBvbmUgRE9NIGVsZW1lbnQgdG8gYW5vdGhlciBET00gZWxlbWVudFxuICovXG5mdW5jdGlvbiBtb3ZlQ2hpbGRyZW4oZnJvbUVsLCB0b0VsKSB7XG4gICAgdmFyIGN1ckNoaWxkID0gZnJvbUVsLmZpcnN0Q2hpbGQ7XG4gICAgd2hpbGUgKGN1ckNoaWxkKSB7XG4gICAgICAgIHZhciBuZXh0Q2hpbGQgPSBjdXJDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgdG9FbC5hcHBlbmRDaGlsZChjdXJDaGlsZCk7XG4gICAgICAgIGN1ckNoaWxkID0gbmV4dENoaWxkO1xuICAgIH1cbiAgICByZXR1cm4gdG9FbDtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdEdldE5vZGVLZXkobm9kZSkge1xuICAgIHJldHVybiBub2RlLmlkO1xufVxuXG5mdW5jdGlvbiBtb3JwaGRvbShmcm9tTm9kZSwgdG9Ob2RlLCBvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHRvTm9kZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKGZyb21Ob2RlLm5vZGVOYW1lID09PSAnI2RvY3VtZW50JyB8fCBmcm9tTm9kZS5ub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgICAgICAgICB2YXIgdG9Ob2RlSHRtbCA9IHRvTm9kZTtcbiAgICAgICAgICAgIHRvTm9kZSA9IGRvYy5jcmVhdGVFbGVtZW50KCdodG1sJyk7XG4gICAgICAgICAgICB0b05vZGUuaW5uZXJIVE1MID0gdG9Ob2RlSHRtbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvTm9kZSA9IHRvRWxlbWVudCh0b05vZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGdldE5vZGVLZXkgPSBvcHRpb25zLmdldE5vZGVLZXkgfHwgZGVmYXVsdEdldE5vZGVLZXk7XG4gICAgdmFyIG9uQmVmb3JlTm9kZUFkZGVkID0gb3B0aW9ucy5vbkJlZm9yZU5vZGVBZGRlZCB8fCBub29wO1xuICAgIHZhciBvbk5vZGVBZGRlZCA9IG9wdGlvbnMub25Ob2RlQWRkZWQgfHwgbm9vcDtcbiAgICB2YXIgb25CZWZvcmVFbFVwZGF0ZWQgPSBvcHRpb25zLm9uQmVmb3JlRWxVcGRhdGVkIHx8IG5vb3A7XG4gICAgdmFyIG9uRWxVcGRhdGVkID0gb3B0aW9ucy5vbkVsVXBkYXRlZCB8fCBub29wO1xuICAgIHZhciBvbkJlZm9yZU5vZGVEaXNjYXJkZWQgPSBvcHRpb25zLm9uQmVmb3JlTm9kZURpc2NhcmRlZCB8fCBub29wO1xuICAgIHZhciBvbk5vZGVEaXNjYXJkZWQgPSBvcHRpb25zLm9uTm9kZURpc2NhcmRlZCB8fCBub29wO1xuICAgIHZhciBvbkJlZm9yZUVsQ2hpbGRyZW5VcGRhdGVkID0gb3B0aW9ucy5vbkJlZm9yZUVsQ2hpbGRyZW5VcGRhdGVkIHx8IG5vb3A7XG4gICAgdmFyIGNoaWxkcmVuT25seSA9IG9wdGlvbnMuY2hpbGRyZW5Pbmx5ID09PSB0cnVlO1xuXG4gICAgLy8gVGhpcyBvYmplY3QgaXMgdXNlZCBhcyBhIGxvb2t1cCB0byBxdWlja2x5IGZpbmQgYWxsIGtleWVkIGVsZW1lbnRzIGluIHRoZSBvcmlnaW5hbCBET00gdHJlZS5cbiAgICB2YXIgZnJvbU5vZGVzTG9va3VwID0ge307XG4gICAgdmFyIGtleWVkUmVtb3ZhbExpc3Q7XG5cbiAgICBmdW5jdGlvbiBhZGRLZXllZFJlbW92YWwoa2V5KSB7XG4gICAgICAgIGlmIChrZXllZFJlbW92YWxMaXN0KSB7XG4gICAgICAgICAgICBrZXllZFJlbW92YWxMaXN0LnB1c2goa2V5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGtleWVkUmVtb3ZhbExpc3QgPSBba2V5XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdhbGtEaXNjYXJkZWRDaGlsZE5vZGVzKG5vZGUsIHNraXBLZXllZE5vZGVzKSB7XG4gICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgIHZhciBjdXJDaGlsZCA9IG5vZGUuZmlyc3RDaGlsZDtcbiAgICAgICAgICAgIHdoaWxlIChjdXJDaGlsZCkge1xuXG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgIGlmIChza2lwS2V5ZWROb2RlcyAmJiAoa2V5ID0gZ2V0Tm9kZUtleShjdXJDaGlsZCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIElmIHdlIGFyZSBza2lwcGluZyBrZXllZCBub2RlcyB0aGVuIHdlIGFkZCB0aGUga2V5XG4gICAgICAgICAgICAgICAgICAgIC8vIHRvIGEgbGlzdCBzbyB0aGF0IGl0IGNhbiBiZSBoYW5kbGVkIGF0IHRoZSB2ZXJ5IGVuZC5cbiAgICAgICAgICAgICAgICAgICAgYWRkS2V5ZWRSZW1vdmFsKGtleSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gT25seSByZXBvcnQgdGhlIG5vZGUgYXMgZGlzY2FyZGVkIGlmIGl0IGlzIG5vdCBrZXllZC4gV2UgZG8gdGhpcyBiZWNhdXNlXG4gICAgICAgICAgICAgICAgICAgIC8vIGF0IHRoZSBlbmQgd2UgbG9vcCB0aHJvdWdoIGFsbCBrZXllZCBlbGVtZW50cyB0aGF0IHdlcmUgdW5tYXRjaGVkXG4gICAgICAgICAgICAgICAgICAgIC8vIGFuZCB0aGVuIGRpc2NhcmQgdGhlbSBpbiBvbmUgZmluYWwgcGFzcy5cbiAgICAgICAgICAgICAgICAgICAgb25Ob2RlRGlzY2FyZGVkKGN1ckNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckNoaWxkLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhbGtEaXNjYXJkZWRDaGlsZE5vZGVzKGN1ckNoaWxkLCBza2lwS2V5ZWROb2Rlcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjdXJDaGlsZCA9IGN1ckNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIERPTSBub2RlIG91dCBvZiB0aGUgb3JpZ2luYWwgRE9NXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBub2RlIFRoZSBub2RlIHRvIHJlbW92ZVxuICAgICAqIEBwYXJhbSAge05vZGV9IHBhcmVudE5vZGUgVGhlIG5vZGVzIHBhcmVudFxuICAgICAqIEBwYXJhbSAge0Jvb2xlYW59IHNraXBLZXllZE5vZGVzIElmIHRydWUgdGhlbiBlbGVtZW50cyB3aXRoIGtleXMgd2lsbCBiZSBza2lwcGVkIGFuZCBub3QgZGlzY2FyZGVkLlxuICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZW1vdmVOb2RlKG5vZGUsIHBhcmVudE5vZGUsIHNraXBLZXllZE5vZGVzKSB7XG4gICAgICAgIGlmIChvbkJlZm9yZU5vZGVEaXNjYXJkZWQobm9kZSkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgcGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG9uTm9kZURpc2NhcmRlZChub2RlKTtcbiAgICAgICAgd2Fsa0Rpc2NhcmRlZENoaWxkTm9kZXMobm9kZSwgc2tpcEtleWVkTm9kZXMpO1xuICAgIH1cblxuICAgIC8vIC8vIFRyZWVXYWxrZXIgaW1wbGVtZW50YXRpb24gaXMgbm8gZmFzdGVyLCBidXQga2VlcGluZyB0aGlzIGFyb3VuZCBpbiBjYXNlIHRoaXMgY2hhbmdlcyBpbiB0aGUgZnV0dXJlXG4gICAgLy8gZnVuY3Rpb24gaW5kZXhUcmVlKHJvb3QpIHtcbiAgICAvLyAgICAgdmFyIHRyZWVXYWxrZXIgPSBkb2N1bWVudC5jcmVhdGVUcmVlV2Fsa2VyKFxuICAgIC8vICAgICAgICAgcm9vdCxcbiAgICAvLyAgICAgICAgIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5UKTtcbiAgICAvL1xuICAgIC8vICAgICB2YXIgZWw7XG4gICAgLy8gICAgIHdoaWxlKChlbCA9IHRyZWVXYWxrZXIubmV4dE5vZGUoKSkpIHtcbiAgICAvLyAgICAgICAgIHZhciBrZXkgPSBnZXROb2RlS2V5KGVsKTtcbiAgICAvLyAgICAgICAgIGlmIChrZXkpIHtcbiAgICAvLyAgICAgICAgICAgICBmcm9tTm9kZXNMb29rdXBba2V5XSA9IGVsO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy8gfVxuXG4gICAgLy8gLy8gTm9kZUl0ZXJhdG9yIGltcGxlbWVudGF0aW9uIGlzIG5vIGZhc3RlciwgYnV0IGtlZXBpbmcgdGhpcyBhcm91bmQgaW4gY2FzZSB0aGlzIGNoYW5nZXMgaW4gdGhlIGZ1dHVyZVxuICAgIC8vXG4gICAgLy8gZnVuY3Rpb24gaW5kZXhUcmVlKG5vZGUpIHtcbiAgICAvLyAgICAgdmFyIG5vZGVJdGVyYXRvciA9IGRvY3VtZW50LmNyZWF0ZU5vZGVJdGVyYXRvcihub2RlLCBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCk7XG4gICAgLy8gICAgIHZhciBlbDtcbiAgICAvLyAgICAgd2hpbGUoKGVsID0gbm9kZUl0ZXJhdG9yLm5leHROb2RlKCkpKSB7XG4gICAgLy8gICAgICAgICB2YXIga2V5ID0gZ2V0Tm9kZUtleShlbCk7XG4gICAgLy8gICAgICAgICBpZiAoa2V5KSB7XG4gICAgLy8gICAgICAgICAgICAgZnJvbU5vZGVzTG9va3VwW2tleV0gPSBlbDtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vIH1cblxuICAgIGZ1bmN0aW9uIGluZGV4VHJlZShub2RlKSB7XG4gICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgIHZhciBjdXJDaGlsZCA9IG5vZGUuZmlyc3RDaGlsZDtcbiAgICAgICAgICAgIHdoaWxlIChjdXJDaGlsZCkge1xuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBnZXROb2RlS2V5KGN1ckNoaWxkKTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGZyb21Ob2Rlc0xvb2t1cFtrZXldID0gY3VyQ2hpbGQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gV2FsayByZWN1cnNpdmVseVxuICAgICAgICAgICAgICAgIGluZGV4VHJlZShjdXJDaGlsZCk7XG5cbiAgICAgICAgICAgICAgICBjdXJDaGlsZCA9IGN1ckNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5kZXhUcmVlKGZyb21Ob2RlKTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZU5vZGVBZGRlZChlbCkge1xuICAgICAgICBvbk5vZGVBZGRlZChlbCk7XG5cbiAgICAgICAgdmFyIGN1ckNoaWxkID0gZWwuZmlyc3RDaGlsZDtcbiAgICAgICAgd2hpbGUgKGN1ckNoaWxkKSB7XG4gICAgICAgICAgICB2YXIgbmV4dFNpYmxpbmcgPSBjdXJDaGlsZC5uZXh0U2libGluZztcblxuICAgICAgICAgICAgdmFyIGtleSA9IGdldE5vZGVLZXkoY3VyQ2hpbGQpO1xuICAgICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgICAgIHZhciB1bm1hdGNoZWRGcm9tRWwgPSBmcm9tTm9kZXNMb29rdXBba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAodW5tYXRjaGVkRnJvbUVsICYmIGNvbXBhcmVOb2RlTmFtZXMoY3VyQ2hpbGQsIHVubWF0Y2hlZEZyb21FbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VyQ2hpbGQucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQodW5tYXRjaGVkRnJvbUVsLCBjdXJDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIG1vcnBoRWwodW5tYXRjaGVkRnJvbUVsLCBjdXJDaGlsZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBoYW5kbGVOb2RlQWRkZWQoY3VyQ2hpbGQpO1xuICAgICAgICAgICAgY3VyQ2hpbGQgPSBuZXh0U2libGluZztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vcnBoRWwoZnJvbUVsLCB0b0VsLCBjaGlsZHJlbk9ubHkpIHtcbiAgICAgICAgdmFyIHRvRWxLZXkgPSBnZXROb2RlS2V5KHRvRWwpO1xuICAgICAgICB2YXIgY3VyRnJvbU5vZGVLZXk7XG5cbiAgICAgICAgaWYgKHRvRWxLZXkpIHtcbiAgICAgICAgICAgIC8vIElmIGFuIGVsZW1lbnQgd2l0aCBhbiBJRCBpcyBiZWluZyBtb3JwaGVkIHRoZW4gaXQgaXMgd2lsbCBiZSBpbiB0aGUgZmluYWxcbiAgICAgICAgICAgIC8vIERPTSBzbyBjbGVhciBpdCBvdXQgb2YgdGhlIHNhdmVkIGVsZW1lbnRzIGNvbGxlY3Rpb25cbiAgICAgICAgICAgIGRlbGV0ZSBmcm9tTm9kZXNMb29rdXBbdG9FbEtleV07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodG9Ob2RlLmlzU2FtZU5vZGUgJiYgdG9Ob2RlLmlzU2FtZU5vZGUoZnJvbU5vZGUpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWNoaWxkcmVuT25seSkge1xuICAgICAgICAgICAgaWYgKG9uQmVmb3JlRWxVcGRhdGVkKGZyb21FbCwgdG9FbCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtb3JwaEF0dHJzKGZyb21FbCwgdG9FbCk7XG4gICAgICAgICAgICBvbkVsVXBkYXRlZChmcm9tRWwpO1xuXG4gICAgICAgICAgICBpZiAob25CZWZvcmVFbENoaWxkcmVuVXBkYXRlZChmcm9tRWwsIHRvRWwpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmcm9tRWwubm9kZU5hbWUgIT09ICdURVhUQVJFQScpIHtcbiAgICAgICAgICAgIHZhciBjdXJUb05vZGVDaGlsZCA9IHRvRWwuZmlyc3RDaGlsZDtcbiAgICAgICAgICAgIHZhciBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbUVsLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICB2YXIgY3VyVG9Ob2RlS2V5O1xuXG4gICAgICAgICAgICB2YXIgZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgdmFyIHRvTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICB2YXIgbWF0Y2hpbmdGcm9tRWw7XG5cbiAgICAgICAgICAgIG91dGVyOiB3aGlsZSAoY3VyVG9Ob2RlQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICB0b05leHRTaWJsaW5nID0gY3VyVG9Ob2RlQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgY3VyVG9Ob2RlS2V5ID0gZ2V0Tm9kZUtleShjdXJUb05vZGVDaGlsZCk7XG5cbiAgICAgICAgICAgICAgICB3aGlsZSAoY3VyRnJvbU5vZGVDaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICBmcm9tTmV4dFNpYmxpbmcgPSBjdXJGcm9tTm9kZUNoaWxkLm5leHRTaWJsaW5nO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJUb05vZGVDaGlsZC5pc1NhbWVOb2RlICYmIGN1clRvTm9kZUNoaWxkLmlzU2FtZU5vZGUoY3VyRnJvbU5vZGVDaGlsZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1clRvTm9kZUNoaWxkID0gdG9OZXh0U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZSBvdXRlcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlS2V5ID0gZ2V0Tm9kZUtleShjdXJGcm9tTm9kZUNoaWxkKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgY3VyRnJvbU5vZGVUeXBlID0gY3VyRnJvbU5vZGVDaGlsZC5ub2RlVHlwZTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgaXNDb21wYXRpYmxlID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJGcm9tTm9kZVR5cGUgPT09IGN1clRvTm9kZUNoaWxkLm5vZGVUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyRnJvbU5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBCb3RoIG5vZGVzIGJlaW5nIGNvbXBhcmVkIGFyZSBFbGVtZW50IG5vZGVzXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyVG9Ob2RlS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSB0YXJnZXQgbm9kZSBoYXMgYSBrZXkgc28gd2Ugd2FudCB0byBtYXRjaCBpdCB1cCB3aXRoIHRoZSBjb3JyZWN0IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaW4gdGhlIG9yaWdpbmFsIERPTSB0cmVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJUb05vZGVLZXkgIT09IGN1ckZyb21Ob2RlS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgY3VycmVudCBlbGVtZW50IGluIHRoZSBvcmlnaW5hbCBET00gdHJlZSBkb2VzIG5vdCBoYXZlIGEgbWF0Y2hpbmcga2V5IHNvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQncyBjaGVjayBvdXIgbG9va3VwIHRvIHNlZSBpZiB0aGVyZSBpcyBhIG1hdGNoaW5nIGVsZW1lbnQgaW4gdGhlIG9yaWdpbmFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBET00gdHJlZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChtYXRjaGluZ0Zyb21FbCA9IGZyb21Ob2Rlc0xvb2t1cFtjdXJUb05vZGVLZXldKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJGcm9tTm9kZUNoaWxkLm5leHRTaWJsaW5nID09PSBtYXRjaGluZ0Zyb21FbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTcGVjaWFsIGNhc2UgZm9yIHNpbmdsZSBlbGVtZW50IHJlbW92YWxzLiBUbyBhdm9pZCByZW1vdmluZyB0aGUgb3JpZ2luYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRE9NIG5vZGUgb3V0IG9mIHRoZSB0cmVlIChzaW5jZSB0aGF0IGNhbiBicmVhayBDU1MgdHJhbnNpdGlvbnMsIGV0Yy4pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSB3aWxsIGluc3RlYWQgZGlzY2FyZCB0aGUgY3VycmVudCBub2RlIGFuZCB3YWl0IHVudGlsIHRoZSBuZXh0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGl0ZXJhdGlvbiB0byBwcm9wZXJseSBtYXRjaCB1cCB0aGUga2V5ZWQgdGFyZ2V0IGVsZW1lbnQgd2l0aCBpdHMgbWF0Y2hpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZWxlbWVudCBpbiB0aGUgb3JpZ2luYWwgdHJlZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBhdGlibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBmb3VuZCBhIG1hdGNoaW5nIGtleWVkIGVsZW1lbnQgc29tZXdoZXJlIGluIHRoZSBvcmlnaW5hbCBET00gdHJlZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTGV0J3MgbW92aW5nIHRoZSBvcmlnaW5hbCBET00gbm9kZSBpbnRvIHRoZSBjdXJyZW50IHBvc2l0aW9uIGFuZCBtb3JwaFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpdC5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiBXZSB1c2UgaW5zZXJ0QmVmb3JlIGluc3RlYWQgb2YgcmVwbGFjZUNoaWxkIGJlY2F1c2Ugd2Ugd2FudCB0byBnbyB0aHJvdWdoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBgcmVtb3ZlTm9kZSgpYCBmdW5jdGlvbiBmb3IgdGhlIG5vZGUgdGhhdCBpcyBiZWluZyBkaXNjYXJkZWQgc28gdGhhdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBhbGwgbGlmZWN5Y2xlIGhvb2tzIGFyZSBjb3JyZWN0bHkgaW52b2tlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tRWwuaW5zZXJ0QmVmb3JlKG1hdGNoaW5nRnJvbUVsLCBjdXJGcm9tTm9kZUNoaWxkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyRnJvbU5vZGVLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBub2RlIGlzIGtleWVkIGl0IG1pZ2h0IGJlIG1hdGNoZWQgdXAgbGF0ZXIgc28gd2UgZGVmZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBhY3R1YWwgcmVtb3ZhbCB0byBsYXRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWRkS2V5ZWRSZW1vdmFsKGN1ckZyb21Ob2RlS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IHdlIHNraXAgbmVzdGVkIGtleWVkIG5vZGVzIGZyb20gYmVpbmcgcmVtb3ZlZCBzaW5jZSB0aGVyZSBpc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgc3RpbGwgYSBjaGFuY2UgdGhleSB3aWxsIGJlIG1hdGNoZWQgdXAgbGF0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZU5vZGUoY3VyRnJvbU5vZGVDaGlsZCwgZnJvbUVsLCB0cnVlIC8qIHNraXAga2V5ZWQgbm9kZXMgKi8pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbU5leHRTaWJsaW5nID0gY3VyRnJvbU5vZGVDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IG1hdGNoaW5nRnJvbUVsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIG5vZGVzIGFyZSBub3QgY29tcGF0aWJsZSBzaW5jZSB0aGUgXCJ0b1wiIG5vZGUgaGFzIGEga2V5IGFuZCB0aGVyZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlzIG5vIG1hdGNoaW5nIGtleWVkIG5vZGUgaW4gdGhlIHNvdXJjZSB0cmVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDb21wYXRpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1ckZyb21Ob2RlS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBvcmlnaW5hbCBoYXMgYSBrZXlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDb21wYXRpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDb21wYXRpYmxlID0gaXNDb21wYXRpYmxlICE9PSBmYWxzZSAmJiBjb21wYXJlTm9kZU5hbWVzKGN1ckZyb21Ob2RlQ2hpbGQsIGN1clRvTm9kZUNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNDb21wYXRpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGZvdW5kIGNvbXBhdGlibGUgRE9NIGVsZW1lbnRzIHNvIHRyYW5zZm9ybVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgY3VycmVudCBcImZyb21cIiBub2RlIHRvIG1hdGNoIHRoZSBjdXJyZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRhcmdldCBET00gbm9kZS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9ycGhFbChjdXJGcm9tTm9kZUNoaWxkLCBjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1ckZyb21Ob2RlVHlwZSA9PT0gVEVYVF9OT0RFIHx8IGN1ckZyb21Ob2RlVHlwZSA9PSBDT01NRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBCb3RoIG5vZGVzIGJlaW5nIGNvbXBhcmVkIGFyZSBUZXh0IG9yIENvbW1lbnQgbm9kZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBhdGlibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNpbXBseSB1cGRhdGUgbm9kZVZhbHVlIG9uIHRoZSBvcmlnaW5hbCBub2RlIHRvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hhbmdlIHRoZSB0ZXh0IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZC5ub2RlVmFsdWUgPSBjdXJUb05vZGVDaGlsZC5ub2RlVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNDb21wYXRpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBZHZhbmNlIGJvdGggdGhlIFwidG9cIiBjaGlsZCBhbmQgdGhlIFwiZnJvbVwiIGNoaWxkIHNpbmNlIHdlIGZvdW5kIGEgbWF0Y2hcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1clRvTm9kZUNoaWxkID0gdG9OZXh0U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZSBvdXRlcjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIE5vIGNvbXBhdGlibGUgbWF0Y2ggc28gcmVtb3ZlIHRoZSBvbGQgbm9kZSBmcm9tIHRoZSBET00gYW5kIGNvbnRpbnVlIHRyeWluZyB0byBmaW5kIGFcbiAgICAgICAgICAgICAgICAgICAgLy8gbWF0Y2ggaW4gdGhlIG9yaWdpbmFsIERPTS4gSG93ZXZlciwgd2Ugb25seSBkbyB0aGlzIGlmIHRoZSBmcm9tIG5vZGUgaXMgbm90IGtleWVkXG4gICAgICAgICAgICAgICAgICAgIC8vIHNpbmNlIGl0IGlzIHBvc3NpYmxlIHRoYXQgYSBrZXllZCBub2RlIG1pZ2h0IG1hdGNoIHVwIHdpdGggYSBub2RlIHNvbWV3aGVyZSBlbHNlIGluIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyB0YXJnZXQgdHJlZSBhbmQgd2UgZG9uJ3Qgd2FudCB0byBkaXNjYXJkIGl0IGp1c3QgeWV0IHNpbmNlIGl0IHN0aWxsIG1pZ2h0IGZpbmQgYVxuICAgICAgICAgICAgICAgICAgICAvLyBob21lIGluIHRoZSBmaW5hbCBET00gdHJlZS4gQWZ0ZXIgZXZlcnl0aGluZyBpcyBkb25lIHdlIHdpbGwgcmVtb3ZlIGFueSBrZXllZCBub2Rlc1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGF0IGRpZG4ndCBmaW5kIGEgaG9tZVxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VyRnJvbU5vZGVLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBub2RlIGlzIGtleWVkIGl0IG1pZ2h0IGJlIG1hdGNoZWQgdXAgbGF0ZXIgc28gd2UgZGVmZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBhY3R1YWwgcmVtb3ZhbCB0byBsYXRlclxuICAgICAgICAgICAgICAgICAgICAgICAgYWRkS2V5ZWRSZW1vdmFsKGN1ckZyb21Ob2RlS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IHdlIHNraXAgbmVzdGVkIGtleWVkIG5vZGVzIGZyb20gYmVpbmcgcmVtb3ZlZCBzaW5jZSB0aGVyZSBpc1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgc3RpbGwgYSBjaGFuY2UgdGhleSB3aWxsIGJlIG1hdGNoZWQgdXAgbGF0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbW92ZU5vZGUoY3VyRnJvbU5vZGVDaGlsZCwgZnJvbUVsLCB0cnVlIC8qIHNraXAga2V5ZWQgbm9kZXMgKi8pO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBnb3QgdGhpcyBmYXIgdGhlbiB3ZSBkaWQgbm90IGZpbmQgYSBjYW5kaWRhdGUgbWF0Y2ggZm9yXG4gICAgICAgICAgICAgICAgLy8gb3VyIFwidG8gbm9kZVwiIGFuZCB3ZSBleGhhdXN0ZWQgYWxsIG9mIHRoZSBjaGlsZHJlbiBcImZyb21cIlxuICAgICAgICAgICAgICAgIC8vIG5vZGVzLiBUaGVyZWZvcmUsIHdlIHdpbGwganVzdCBhcHBlbmQgdGhlIGN1cnJlbnQgXCJ0b1wiIG5vZGVcbiAgICAgICAgICAgICAgICAvLyB0byB0aGUgZW5kXG4gICAgICAgICAgICAgICAgaWYgKGN1clRvTm9kZUtleSAmJiAobWF0Y2hpbmdGcm9tRWwgPSBmcm9tTm9kZXNMb29rdXBbY3VyVG9Ob2RlS2V5XSkgJiYgY29tcGFyZU5vZGVOYW1lcyhtYXRjaGluZ0Zyb21FbCwgY3VyVG9Ob2RlQ2hpbGQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyb21FbC5hcHBlbmRDaGlsZChtYXRjaGluZ0Zyb21FbCk7XG4gICAgICAgICAgICAgICAgICAgIG1vcnBoRWwobWF0Y2hpbmdGcm9tRWwsIGN1clRvTm9kZUNoaWxkKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb25CZWZvcmVOb2RlQWRkZWRSZXN1bHQgPSBvbkJlZm9yZU5vZGVBZGRlZChjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvbkJlZm9yZU5vZGVBZGRlZFJlc3VsdCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbkJlZm9yZU5vZGVBZGRlZFJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1clRvTm9kZUNoaWxkID0gb25CZWZvcmVOb2RlQWRkZWRSZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJUb05vZGVDaGlsZC5hY3R1YWxpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJUb05vZGVDaGlsZCA9IGN1clRvTm9kZUNoaWxkLmFjdHVhbGl6ZShmcm9tRWwub3duZXJEb2N1bWVudCB8fCBkb2MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZnJvbUVsLmFwcGVuZENoaWxkKGN1clRvTm9kZUNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZU5vZGVBZGRlZChjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjdXJUb05vZGVDaGlsZCA9IHRvTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gV2UgaGF2ZSBwcm9jZXNzZWQgYWxsIG9mIHRoZSBcInRvIG5vZGVzXCIuIElmIGN1ckZyb21Ob2RlQ2hpbGQgaXNcbiAgICAgICAgICAgIC8vIG5vbi1udWxsIHRoZW4gd2Ugc3RpbGwgaGF2ZSBzb21lIGZyb20gbm9kZXMgbGVmdCBvdmVyIHRoYXQgbmVlZFxuICAgICAgICAgICAgLy8gdG8gYmUgcmVtb3ZlZFxuICAgICAgICAgICAgd2hpbGUgKGN1ckZyb21Ob2RlQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICBmcm9tTmV4dFNpYmxpbmcgPSBjdXJGcm9tTm9kZUNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGlmICgoY3VyRnJvbU5vZGVLZXkgPSBnZXROb2RlS2V5KGN1ckZyb21Ob2RlQ2hpbGQpKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTaW5jZSB0aGUgbm9kZSBpcyBrZXllZCBpdCBtaWdodCBiZSBtYXRjaGVkIHVwIGxhdGVyIHNvIHdlIGRlZmVyXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBhY3R1YWwgcmVtb3ZhbCB0byBsYXRlclxuICAgICAgICAgICAgICAgICAgICBhZGRLZXllZFJlbW92YWwoY3VyRnJvbU5vZGVLZXkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IHdlIHNraXAgbmVzdGVkIGtleWVkIG5vZGVzIGZyb20gYmVpbmcgcmVtb3ZlZCBzaW5jZSB0aGVyZSBpc1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICBzdGlsbCBhIGNoYW5jZSB0aGV5IHdpbGwgYmUgbWF0Y2hlZCB1cCBsYXRlclxuICAgICAgICAgICAgICAgICAgICByZW1vdmVOb2RlKGN1ckZyb21Ob2RlQ2hpbGQsIGZyb21FbCwgdHJ1ZSAvKiBza2lwIGtleWVkIG5vZGVzICovKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzcGVjaWFsRWxIYW5kbGVyID0gc3BlY2lhbEVsSGFuZGxlcnNbZnJvbUVsLm5vZGVOYW1lXTtcbiAgICAgICAgaWYgKHNwZWNpYWxFbEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHNwZWNpYWxFbEhhbmRsZXIoZnJvbUVsLCB0b0VsKTtcbiAgICAgICAgfVxuICAgIH0gLy8gRU5EOiBtb3JwaEVsKC4uLilcblxuICAgIHZhciBtb3JwaGVkTm9kZSA9IGZyb21Ob2RlO1xuICAgIHZhciBtb3JwaGVkTm9kZVR5cGUgPSBtb3JwaGVkTm9kZS5ub2RlVHlwZTtcbiAgICB2YXIgdG9Ob2RlVHlwZSA9IHRvTm9kZS5ub2RlVHlwZTtcblxuICAgIGlmICghY2hpbGRyZW5Pbmx5KSB7XG4gICAgICAgIC8vIEhhbmRsZSB0aGUgY2FzZSB3aGVyZSB3ZSBhcmUgZ2l2ZW4gdHdvIERPTSBub2RlcyB0aGF0IGFyZSBub3RcbiAgICAgICAgLy8gY29tcGF0aWJsZSAoZS5nLiA8ZGl2PiAtLT4gPHNwYW4+IG9yIDxkaXY+IC0tPiBURVhUKVxuICAgICAgICBpZiAobW9ycGhlZE5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgIGlmICh0b05vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbXBhcmVOb2RlTmFtZXMoZnJvbU5vZGUsIHRvTm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgb25Ob2RlRGlzY2FyZGVkKGZyb21Ob2RlKTtcbiAgICAgICAgICAgICAgICAgICAgbW9ycGhlZE5vZGUgPSBtb3ZlQ2hpbGRyZW4oZnJvbU5vZGUsIGNyZWF0ZUVsZW1lbnROUyh0b05vZGUubm9kZU5hbWUsIHRvTm9kZS5uYW1lc3BhY2VVUkkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEdvaW5nIGZyb20gYW4gZWxlbWVudCBub2RlIHRvIGEgdGV4dCBub2RlXG4gICAgICAgICAgICAgICAgbW9ycGhlZE5vZGUgPSB0b05vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobW9ycGhlZE5vZGVUeXBlID09PSBURVhUX05PREUgfHwgbW9ycGhlZE5vZGVUeXBlID09PSBDT01NRU5UX05PREUpIHsgLy8gVGV4dCBvciBjb21tZW50IG5vZGVcbiAgICAgICAgICAgIGlmICh0b05vZGVUeXBlID09PSBtb3JwaGVkTm9kZVR5cGUpIHtcbiAgICAgICAgICAgICAgICBtb3JwaGVkTm9kZS5ub2RlVmFsdWUgPSB0b05vZGUubm9kZVZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBtb3JwaGVkTm9kZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gVGV4dCBub2RlIHRvIHNvbWV0aGluZyBlbHNlXG4gICAgICAgICAgICAgICAgbW9ycGhlZE5vZGUgPSB0b05vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobW9ycGhlZE5vZGUgPT09IHRvTm9kZSkge1xuICAgICAgICAvLyBUaGUgXCJ0byBub2RlXCIgd2FzIG5vdCBjb21wYXRpYmxlIHdpdGggdGhlIFwiZnJvbSBub2RlXCIgc28gd2UgaGFkIHRvXG4gICAgICAgIC8vIHRvc3Mgb3V0IHRoZSBcImZyb20gbm9kZVwiIGFuZCB1c2UgdGhlIFwidG8gbm9kZVwiXG4gICAgICAgIG9uTm9kZURpc2NhcmRlZChmcm9tTm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbW9ycGhFbChtb3JwaGVkTm9kZSwgdG9Ob2RlLCBjaGlsZHJlbk9ubHkpO1xuXG4gICAgICAgIC8vIFdlIG5vdyBuZWVkIHRvIGxvb3Agb3ZlciBhbnkga2V5ZWQgbm9kZXMgdGhhdCBtaWdodCBuZWVkIHRvIGJlXG4gICAgICAgIC8vIHJlbW92ZWQuIFdlIG9ubHkgZG8gdGhlIHJlbW92YWwgaWYgd2Uga25vdyB0aGF0IHRoZSBrZXllZCBub2RlXG4gICAgICAgIC8vIG5ldmVyIGZvdW5kIGEgbWF0Y2guIFdoZW4gYSBrZXllZCBub2RlIGlzIG1hdGNoZWQgdXAgd2UgcmVtb3ZlXG4gICAgICAgIC8vIGl0IG91dCBvZiBmcm9tTm9kZXNMb29rdXAgYW5kIHdlIHVzZSBmcm9tTm9kZXNMb29rdXAgdG8gZGV0ZXJtaW5lXG4gICAgICAgIC8vIGlmIGEga2V5ZWQgbm9kZSBoYXMgYmVlbiBtYXRjaGVkIHVwIG9yIG5vdFxuICAgICAgICBpZiAoa2V5ZWRSZW1vdmFsTGlzdCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaT0wLCBsZW49a2V5ZWRSZW1vdmFsTGlzdC5sZW5ndGg7IGk8bGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxUb1JlbW92ZSA9IGZyb21Ob2Rlc0xvb2t1cFtrZXllZFJlbW92YWxMaXN0W2ldXTtcbiAgICAgICAgICAgICAgICBpZiAoZWxUb1JlbW92ZSkge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVOb2RlKGVsVG9SZW1vdmUsIGVsVG9SZW1vdmUucGFyZW50Tm9kZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICghY2hpbGRyZW5Pbmx5ICYmIG1vcnBoZWROb2RlICE9PSBmcm9tTm9kZSAmJiBmcm9tTm9kZS5wYXJlbnROb2RlKSB7XG4gICAgICAgIGlmIChtb3JwaGVkTm9kZS5hY3R1YWxpemUpIHtcbiAgICAgICAgICAgIG1vcnBoZWROb2RlID0gbW9ycGhlZE5vZGUuYWN0dWFsaXplKGZyb21Ob2RlLm93bmVyRG9jdW1lbnQgfHwgZG9jKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB3ZSBoYWQgdG8gc3dhcCBvdXQgdGhlIGZyb20gbm9kZSB3aXRoIGEgbmV3IG5vZGUgYmVjYXVzZSB0aGUgb2xkXG4gICAgICAgIC8vIG5vZGUgd2FzIG5vdCBjb21wYXRpYmxlIHdpdGggdGhlIHRhcmdldCBub2RlIHRoZW4gd2UgbmVlZCB0b1xuICAgICAgICAvLyByZXBsYWNlIHRoZSBvbGQgRE9NIG5vZGUgaW4gdGhlIG9yaWdpbmFsIERPTSB0cmVlLiBUaGlzIGlzIG9ubHlcbiAgICAgICAgLy8gcG9zc2libGUgaWYgdGhlIG9yaWdpbmFsIERPTSBub2RlIHdhcyBwYXJ0IG9mIGEgRE9NIHRyZWUgd2hpY2hcbiAgICAgICAgLy8gd2Uga25vdyBpcyB0aGUgY2FzZSBpZiBpdCBoYXMgYSBwYXJlbnQgbm9kZS5cbiAgICAgICAgZnJvbU5vZGUucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobW9ycGhlZE5vZGUsIGZyb21Ob2RlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbW9ycGhlZE5vZGU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbW9ycGhkb207XG4iLCJjb25zdCB3aW5kb3cgPSByZXF1aXJlKCdnbG9iYWwvd2luZG93JylcbmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpXG5cbm1vZHVsZS5leHBvcnRzID0gbmFub3JhZlxuXG4vLyBPbmx5IGNhbGwgUkFGIHdoZW4gbmVlZGVkXG4vLyAoZm4sIGZuPykgLT4gZm5cbmZ1bmN0aW9uIG5hbm9yYWYgKHJlbmRlciwgcmFmKSB7XG4gIGFzc2VydC5lcXVhbCh0eXBlb2YgcmVuZGVyLCAnZnVuY3Rpb24nLCAnbmFub3JhZjogcmVuZGVyIHNob3VsZCBiZSBhIGZ1bmN0aW9uJylcbiAgYXNzZXJ0Lm9rKHR5cGVvZiByYWYgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIHJhZiA9PT0gJ3VuZGVmaW5lZCcsICduYW5vcmFmOiByYWYgc2hvdWxkIGJlIGEgZnVuY3Rpb24gb3IgdW5kZWZpbmVkJylcblxuICBpZiAoIXJhZikgeyByYWYgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIH1cblxuICB2YXIgaW5SZW5kZXJpbmdUcmFuc2FjdGlvbiA9IGZhbHNlXG4gIHZhciByZWRyYXdTY2hlZHVsZWQgPSBmYWxzZVxuICB2YXIgY3VycmVudFN0YXRlID0gbnVsbFxuXG4gIC8vIHBhc3MgbmV3IHN0YXRlIHRvIGJlIHJlbmRlcmVkXG4gIC8vIChvYmosIG9iaj8pIC0+IG51bGxcbiAgcmV0dXJuIGZ1bmN0aW9uIGZyYW1lIChzdGF0ZSwgcHJldikge1xuICAgIGFzc2VydC5lcXVhbCh0eXBlb2Ygc3RhdGUsICdvYmplY3QnLCAnbmFub3JhZjogc3RhdGUgc2hvdWxkIGJlIGFuIG9iamVjdCcpXG4gICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBwcmV2LCAnb2JqZWN0JywgJ25hbm9yYWY6IHByZXYgc2hvdWxkIGJlIGFuIG9iamVjdCcpXG4gICAgYXNzZXJ0LmVxdWFsKGluUmVuZGVyaW5nVHJhbnNhY3Rpb24sIGZhbHNlLCAnbmFub3JhZjogaW5maW5pdGUgbG9vcCBkZXRlY3RlZCcpXG5cbiAgICAvLyByZXF1ZXN0IGEgcmVkcmF3IGZvciBuZXh0IGZyYW1lXG4gICAgaWYgKGN1cnJlbnRTdGF0ZSA9PT0gbnVsbCAmJiAhcmVkcmF3U2NoZWR1bGVkKSB7XG4gICAgICByZWRyYXdTY2hlZHVsZWQgPSB0cnVlXG5cbiAgICAgIHJhZihmdW5jdGlvbiByZWRyYXcgKCkge1xuICAgICAgICByZWRyYXdTY2hlZHVsZWQgPSBmYWxzZVxuICAgICAgICBpZiAoIWN1cnJlbnRTdGF0ZSkgcmV0dXJuXG5cbiAgICAgICAgaW5SZW5kZXJpbmdUcmFuc2FjdGlvbiA9IHRydWVcbiAgICAgICAgcmVuZGVyKGN1cnJlbnRTdGF0ZSwgcHJldilcbiAgICAgICAgaW5SZW5kZXJpbmdUcmFuc2FjdGlvbiA9IGZhbHNlXG5cbiAgICAgICAgY3VycmVudFN0YXRlID0gbnVsbFxuICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgZGF0YSBmb3IgcmVkcmF3XG4gICAgY3VycmVudFN0YXRlID0gc3RhdGVcbiAgfVxufVxuIiwiLyogZ2xvYmFsIE11dGF0aW9uT2JzZXJ2ZXIgKi9cbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJ2dsb2JhbC9kb2N1bWVudCcpXG52YXIgd2luZG93ID0gcmVxdWlyZSgnZ2xvYmFsL3dpbmRvdycpXG52YXIgd2F0Y2ggPSBPYmplY3QuY3JlYXRlKG51bGwpXG52YXIgS0VZX0lEID0gJ29ubG9hZGlkJyArIChuZXcgRGF0ZSgpICUgOWU2KS50b1N0cmluZygzNilcbnZhciBLRVlfQVRUUiA9ICdkYXRhLScgKyBLRVlfSURcbnZhciBJTkRFWCA9IDBcblxuaWYgKHdpbmRvdyAmJiB3aW5kb3cuTXV0YXRpb25PYnNlcnZlcikge1xuICB2YXIgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XG4gICAgaWYgKE9iamVjdC5rZXlzKHdhdGNoKS5sZW5ndGggPCAxKSByZXR1cm5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG11dGF0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKG11dGF0aW9uc1tpXS5hdHRyaWJ1dGVOYW1lID09PSBLRVlfQVRUUikge1xuICAgICAgICBlYWNoQXR0cihtdXRhdGlvbnNbaV0sIHR1cm5vbiwgdHVybm9mZilcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIGVhY2hNdXRhdGlvbihtdXRhdGlvbnNbaV0ucmVtb3ZlZE5vZGVzLCB0dXJub2ZmKVxuICAgICAgZWFjaE11dGF0aW9uKG11dGF0aW9uc1tpXS5hZGRlZE5vZGVzLCB0dXJub24pXG4gICAgfVxuICB9KVxuICBvYnNlcnZlci5vYnNlcnZlKGRvY3VtZW50LmJvZHksIHtcbiAgICBjaGlsZExpc3Q6IHRydWUsXG4gICAgc3VidHJlZTogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgIGF0dHJpYnV0ZU9sZFZhbHVlOiB0cnVlLFxuICAgIGF0dHJpYnV0ZUZpbHRlcjogW0tFWV9BVFRSXVxuICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG9ubG9hZCAoZWwsIG9uLCBvZmYsIGNhbGxlcikge1xuICBvbiA9IG9uIHx8IGZ1bmN0aW9uICgpIHt9XG4gIG9mZiA9IG9mZiB8fCBmdW5jdGlvbiAoKSB7fVxuICBlbC5zZXRBdHRyaWJ1dGUoS0VZX0FUVFIsICdvJyArIElOREVYKVxuICB3YXRjaFsnbycgKyBJTkRFWF0gPSBbb24sIG9mZiwgMCwgY2FsbGVyIHx8IG9ubG9hZC5jYWxsZXJdXG4gIElOREVYICs9IDFcbiAgcmV0dXJuIGVsXG59XG5cbmZ1bmN0aW9uIHR1cm5vbiAoaW5kZXgsIGVsKSB7XG4gIGlmICh3YXRjaFtpbmRleF1bMF0gJiYgd2F0Y2hbaW5kZXhdWzJdID09PSAwKSB7XG4gICAgd2F0Y2hbaW5kZXhdWzBdKGVsKVxuICAgIHdhdGNoW2luZGV4XVsyXSA9IDFcbiAgfVxufVxuXG5mdW5jdGlvbiB0dXJub2ZmIChpbmRleCwgZWwpIHtcbiAgaWYgKHdhdGNoW2luZGV4XVsxXSAmJiB3YXRjaFtpbmRleF1bMl0gPT09IDEpIHtcbiAgICB3YXRjaFtpbmRleF1bMV0oZWwpXG4gICAgd2F0Y2hbaW5kZXhdWzJdID0gMFxuICB9XG59XG5cbmZ1bmN0aW9uIGVhY2hBdHRyIChtdXRhdGlvbiwgb24sIG9mZikge1xuICB2YXIgbmV3VmFsdWUgPSBtdXRhdGlvbi50YXJnZXQuZ2V0QXR0cmlidXRlKEtFWV9BVFRSKVxuICBpZiAoc2FtZU9yaWdpbihtdXRhdGlvbi5vbGRWYWx1ZSwgbmV3VmFsdWUpKSB7XG4gICAgd2F0Y2hbbmV3VmFsdWVdID0gd2F0Y2hbbXV0YXRpb24ub2xkVmFsdWVdXG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKHdhdGNoW211dGF0aW9uLm9sZFZhbHVlXSkge1xuICAgIG9mZihtdXRhdGlvbi5vbGRWYWx1ZSwgbXV0YXRpb24udGFyZ2V0KVxuICB9XG4gIGlmICh3YXRjaFtuZXdWYWx1ZV0pIHtcbiAgICBvbihuZXdWYWx1ZSwgbXV0YXRpb24udGFyZ2V0KVxuICB9XG59XG5cbmZ1bmN0aW9uIHNhbWVPcmlnaW4gKG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICBpZiAoIW9sZFZhbHVlIHx8ICFuZXdWYWx1ZSkgcmV0dXJuIGZhbHNlXG4gIHJldHVybiB3YXRjaFtvbGRWYWx1ZV1bM10gPT09IHdhdGNoW25ld1ZhbHVlXVszXVxufVxuXG5mdW5jdGlvbiBlYWNoTXV0YXRpb24gKG5vZGVzLCBmbikge1xuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHdhdGNoKVxuICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKG5vZGVzW2ldICYmIG5vZGVzW2ldLmdldEF0dHJpYnV0ZSAmJiBub2Rlc1tpXS5nZXRBdHRyaWJ1dGUoS0VZX0FUVFIpKSB7XG4gICAgICB2YXIgb25sb2FkaWQgPSBub2Rlc1tpXS5nZXRBdHRyaWJ1dGUoS0VZX0FUVFIpXG4gICAgICBrZXlzLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICAgICAgaWYgKG9ubG9hZGlkID09PSBrKSB7XG4gICAgICAgICAgZm4oaywgbm9kZXNbaV0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIGlmIChub2Rlc1tpXS5jaGlsZE5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGVhY2hNdXRhdGlvbihub2Rlc1tpXS5jaGlsZE5vZGVzLCBmbilcbiAgICB9XG4gIH1cbn1cbiIsIi8qIVxuICogcGFkLWxlZnQgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25zY2hsaW5rZXJ0L3BhZC1sZWZ0PlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE1LCBKb24gU2NobGlua2VydC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciByZXBlYXQgPSByZXF1aXJlKCdyZXBlYXQtc3RyaW5nJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFkTGVmdChzdHIsIG51bSwgY2gpIHtcbiAgc3RyID0gc3RyLnRvU3RyaW5nKCk7XG5cbiAgaWYgKHR5cGVvZiBudW0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIHN0cjtcbiAgfVxuXG4gIGlmIChjaCA9PT0gMCkge1xuICAgIGNoID0gJzAnO1xuICB9IGVsc2UgaWYgKGNoKSB7XG4gICAgY2ggPSBjaC50b1N0cmluZygpO1xuICB9IGVsc2Uge1xuICAgIGNoID0gJyAnO1xuICB9XG5cbiAgcmV0dXJuIHJlcGVhdChjaCwgbnVtIC0gc3RyLmxlbmd0aCkgKyBzdHI7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVwZWF0ID0gcmVxdWlyZSgncmVwZWF0LXN0cmluZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhZExlZnQodmFsLCBudW0sIHN0cikge1xuICB2YXIgcGFkZGluZyA9ICcnO1xuICB2YXIgZGlmZiA9IG51bSAtIHZhbC5sZW5ndGg7XG5cbiAgLy8gQnJlYWtwb2ludHMgYmFzZWQgb24gYmVuY2htYXJrcyB0byB1c2UgdGhlIGZhc3Rlc3QgYXBwcm9hY2hcbiAgLy8gZm9yIHRoZSBnaXZlbiBudW1iZXIgb2YgemVyb3NcbiAgaWYgKGRpZmYgPD0gNSAmJiAhc3RyKSB7XG4gICAgcGFkZGluZyA9ICcwMDAwMCc7XG4gIH0gZWxzZSBpZiAoZGlmZiA8PSAyNSAmJiAhc3RyKSB7XG4gICAgcGFkZGluZyA9ICcwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAnO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB2YWwgKyByZXBlYXQoc3RyIHx8ICcwJywgZGlmZik7XG4gIH1cblxuICByZXR1cm4gdmFsICsgcGFkZGluZy5zbGljZSgwLCBkaWZmKTtcbn07XG4iLCJ2YXIgdHJpbSA9IHJlcXVpcmUoJ3RyaW0nKVxuICAsIGZvckVhY2ggPSByZXF1aXJlKCdmb3ItZWFjaCcpXG4gICwgaXNBcnJheSA9IGZ1bmN0aW9uKGFyZykge1xuICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmcpID09PSAnW29iamVjdCBBcnJheV0nO1xuICAgIH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaGVhZGVycykge1xuICBpZiAoIWhlYWRlcnMpXG4gICAgcmV0dXJuIHt9XG5cbiAgdmFyIHJlc3VsdCA9IHt9XG5cbiAgZm9yRWFjaChcbiAgICAgIHRyaW0oaGVhZGVycykuc3BsaXQoJ1xcbicpXG4gICAgLCBmdW5jdGlvbiAocm93KSB7XG4gICAgICAgIHZhciBpbmRleCA9IHJvdy5pbmRleE9mKCc6JylcbiAgICAgICAgICAsIGtleSA9IHRyaW0ocm93LnNsaWNlKDAsIGluZGV4KSkudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICwgdmFsdWUgPSB0cmltKHJvdy5zbGljZShpbmRleCArIDEpKVxuXG4gICAgICAgIGlmICh0eXBlb2YocmVzdWx0W2tleV0pID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHJlc3VsdFtrZXldID0gdmFsdWVcbiAgICAgICAgfSBlbHNlIGlmIChpc0FycmF5KHJlc3VsdFtrZXldKSkge1xuICAgICAgICAgIHJlc3VsdFtrZXldLnB1c2godmFsdWUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzdWx0W2tleV0gPSBbIHJlc3VsdFtrZXldLCB2YWx1ZSBdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgKVxuXG4gIHJldHVybiByZXN1bHRcbn0iLCJjb25zdCBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hdGNoXG5cbi8vIGdldCB1cmwgcGF0aCBzZWN0aW9uIGZyb20gYSB1cmxcbi8vIHN0cmlwIHF1ZXJ5c3RyaW5ncyAvIGhhc2hlc1xuLy8gc3RyaXAgcHJvdG9jb2xcbi8vIHN0cmlwIGhvc3RuYW1lIGFuZCBwb3J0IChib3RoIGlwIGFuZCByb3V0ZSlcbi8vIHN0ciAtPiBzdHJcbmZ1bmN0aW9uIG1hdGNoIChyb3V0ZSkge1xuICBhc3NlcnQuZXF1YWwodHlwZW9mIHJvdXRlLCAnc3RyaW5nJylcblxuICByZXR1cm4gcm91dGUudHJpbSgpXG4gICAgLnJlcGxhY2UoL1tcXD98I10uKiQvLCAnJylcbiAgICAucmVwbGFjZSgvXig/Omh0dHBzP1xcOilcXC9cXC8vLCAnJylcbiAgICAucmVwbGFjZSgvXi4qPyhcXC8uKikvLCAnJDEnKVxuICAgIC5yZXBsYWNlKC9cXC8kLywgJycpXG59XG4iLCIvKiFcbiAqIHJlcGVhdC1zdHJpbmcgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25zY2hsaW5rZXJ0L3JlcGVhdC1zdHJpbmc+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUsIEpvbiBTY2hsaW5rZXJ0LlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBSZXN1bHRzIGNhY2hlXG4gKi9cblxudmFyIHJlcyA9ICcnO1xudmFyIGNhY2hlO1xuXG4vKipcbiAqIEV4cG9zZSBgcmVwZWF0YFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gcmVwZWF0O1xuXG4vKipcbiAqIFJlcGVhdCB0aGUgZ2l2ZW4gYHN0cmluZ2AgdGhlIHNwZWNpZmllZCBgbnVtYmVyYFxuICogb2YgdGltZXMuXG4gKlxuICogKipFeGFtcGxlOioqXG4gKlxuICogYGBganNcbiAqIHZhciByZXBlYXQgPSByZXF1aXJlKCdyZXBlYXQtc3RyaW5nJyk7XG4gKiByZXBlYXQoJ0EnLCA1KTtcbiAqIC8vPT4gQUFBQUFcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBgc3RyaW5nYCBUaGUgc3RyaW5nIHRvIHJlcGVhdFxuICogQHBhcmFtIHtOdW1iZXJ9IGBudW1iZXJgIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gcmVwZWF0IHRoZSBzdHJpbmdcbiAqIEByZXR1cm4ge1N0cmluZ30gUmVwZWF0ZWQgc3RyaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIHJlcGVhdChzdHIsIG51bSkge1xuICBpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdyZXBlYXQtc3RyaW5nIGV4cGVjdHMgYSBzdHJpbmcuJyk7XG4gIH1cblxuICAvLyBjb3ZlciBjb21tb24sIHF1aWNrIHVzZSBjYXNlc1xuICBpZiAobnVtID09PSAxKSByZXR1cm4gc3RyO1xuICBpZiAobnVtID09PSAyKSByZXR1cm4gc3RyICsgc3RyO1xuXG4gIHZhciBtYXggPSBzdHIubGVuZ3RoICogbnVtO1xuICBpZiAoY2FjaGUgIT09IHN0ciB8fCB0eXBlb2YgY2FjaGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgY2FjaGUgPSBzdHI7XG4gICAgcmVzID0gJyc7XG4gIH1cblxuICB3aGlsZSAobWF4ID4gcmVzLmxlbmd0aCAmJiBudW0gPiAwKSB7XG4gICAgaWYgKG51bSAmIDEpIHtcbiAgICAgIHJlcyArPSBzdHI7XG4gICAgfVxuXG4gICAgbnVtID4+PSAxO1xuICAgIGlmICghbnVtKSBicmVhaztcbiAgICBzdHIgKz0gc3RyO1xuICB9XG5cbiAgcmV0dXJuIHJlcy5zdWJzdHIoMCwgbWF4KTtcbn1cblxuIiwiY29uc3Qgd2luZG93ID0gcmVxdWlyZSgnZ2xvYmFsL3dpbmRvdycpXG5jb25zdCBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2hcblxuLy8gbGlzdGVuIHRvIHdpbmRvdyBoYXNoY2hhbmdlIGV2ZW50c1xuLy8gYW5kIHVwZGF0ZSByb3V0ZXIgYWNjb3JkaW5nbHlcbi8vIGZuKGNiKSAtPiBudWxsXG5mdW5jdGlvbiBoYXNoIChjYikge1xuICBhc3NlcnQuZXF1YWwodHlwZW9mIGNiLCAnZnVuY3Rpb24nLCAnY2IgbXVzdCBiZSBhIGZ1bmN0aW9uJylcbiAgd2luZG93Lm9uaGFzaGNoYW5nZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgY2Iod2luZG93LmxvY2F0aW9uLmhhc2gpXG4gIH1cbn1cbiIsImNvbnN0IGRvY3VtZW50ID0gcmVxdWlyZSgnZ2xvYmFsL2RvY3VtZW50JylcbmNvbnN0IHdpbmRvdyA9IHJlcXVpcmUoJ2dsb2JhbC93aW5kb3cnKVxuY29uc3QgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0JylcblxubW9kdWxlLmV4cG9ydHMgPSBoaXN0b3J5XG5cbi8vIGxpc3RlbiB0byBodG1sNSBwdXNoc3RhdGUgZXZlbnRzXG4vLyBhbmQgdXBkYXRlIHJvdXRlciBhY2NvcmRpbmdseVxuLy8gZm4oc3RyKSAtPiBudWxsXG5mdW5jdGlvbiBoaXN0b3J5IChjYikge1xuICBhc3NlcnQuZXF1YWwodHlwZW9mIGNiLCAnZnVuY3Rpb24nLCAnY2IgbXVzdCBiZSBhIGZ1bmN0aW9uJylcbiAgd2luZG93Lm9ucG9wc3RhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgY2IoZG9jdW1lbnQubG9jYXRpb24uaHJlZilcbiAgfVxufVxuIiwiY29uc3Qgd2luZG93ID0gcmVxdWlyZSgnZ2xvYmFsL3dpbmRvdycpXG5jb25zdCBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhyZWZcblxuLy8gaGFuZGxlIGEgY2xpY2sgaWYgaXMgYW5jaG9yIHRhZyB3aXRoIGFuIGhyZWZcbi8vIGFuZCB1cmwgbGl2ZXMgb24gdGhlIHNhbWUgZG9tYWluLiBSZXBsYWNlc1xuLy8gdHJhaWxpbmcgJyMnIHNvIGVtcHR5IGxpbmtzIHdvcmsgYXMgZXhwZWN0ZWQuXG4vLyBmbihzdHIpIC0+IG51bGxcbmZ1bmN0aW9uIGhyZWYgKGNiKSB7XG4gIGFzc2VydC5lcXVhbCh0eXBlb2YgY2IsICdmdW5jdGlvbicsICdjYiBtdXN0IGJlIGEgZnVuY3Rpb24nKVxuXG4gIHdpbmRvdy5vbmNsaWNrID0gZnVuY3Rpb24gKGUpIHtcbiAgICBjb25zdCBub2RlID0gKGZ1bmN0aW9uIHRyYXZlcnNlIChub2RlKSB7XG4gICAgICBpZiAoIW5vZGUpIHJldHVyblxuICAgICAgaWYgKG5vZGUubG9jYWxOYW1lICE9PSAnYScpIHJldHVybiB0cmF2ZXJzZShub2RlLnBhcmVudE5vZGUpXG4gICAgICBpZiAobm9kZS5ocmVmID09PSB1bmRlZmluZWQpIHJldHVybiB0cmF2ZXJzZShub2RlLnBhcmVudE5vZGUpXG4gICAgICBpZiAod2luZG93LmxvY2F0aW9uLmhvc3QgIT09IG5vZGUuaG9zdCkgcmV0dXJuIHRyYXZlcnNlKG5vZGUucGFyZW50Tm9kZSlcbiAgICAgIHJldHVybiBub2RlXG4gICAgfSkoZS50YXJnZXQpXG5cbiAgICBpZiAoIW5vZGUpIHJldHVyblxuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgY29uc3QgaHJlZiA9IG5vZGUuaHJlZi5yZXBsYWNlKC8jJC8sICcnKVxuICAgIGNiKGhyZWYpXG4gICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHt9LCBudWxsLCBocmVmKVxuICB9XG59XG4iLCJjb25zdCBwYXRobmFtZSA9IHJlcXVpcmUoJ3BhdGhuYW1lLW1hdGNoJylcbmNvbnN0IHdheWZhcmVyID0gcmVxdWlyZSgnd2F5ZmFyZXInKVxuY29uc3QgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0JylcblxubW9kdWxlLmV4cG9ydHMgPSBzaGVldFJvdXRlclxuXG4vLyBGYXN0LCBtb2R1bGFyIGNsaWVudCByb3V0ZXJcbi8vIGZuKHN0ciwgYW55Wy4uXSwgZm4/KSAtPiBmbihzdHIsIGFueVsuLl0pXG5mdW5jdGlvbiBzaGVldFJvdXRlciAoZGZ0LCBjcmVhdGVUcmVlLCBjcmVhdGVSb3V0ZSkge1xuICBjcmVhdGVSb3V0ZSA9IChjcmVhdGVSb3V0ZSA/IGNyZWF0ZVJvdXRlKF9jcmVhdGVSb3V0ZSkgOiBfY3JlYXRlUm91dGUpXG5cbiAgaWYgKCFjcmVhdGVUcmVlKSB7XG4gICAgY3JlYXRlVHJlZSA9IGRmdFxuICAgIGRmdCA9ICcnXG4gIH1cblxuICBhc3NlcnQuZXF1YWwodHlwZW9mIGRmdCwgJ3N0cmluZycsICdzaGVldC1yb3V0ZXI6IGRmdCBtdXN0IGJlIGEgc3RyaW5nJylcbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBjcmVhdGVUcmVlLCAnZnVuY3Rpb24nLCAnc2hlZXQtcm91dGVyOiBjcmVhdGVUcmVlIG11c3QgYmUgYSBmdW5jdGlvbicpXG4gIGFzc2VydC5lcXVhbCh0eXBlb2YgY3JlYXRlUm91dGUsICdmdW5jdGlvbicsICdzaGVldC1yb3V0ZXI6IGNyZWF0ZVJvdXRlIG11c3QgYmUgYSBmdW5jdGlvbicpXG5cbiAgY29uc3Qgcm91dGVyID0gd2F5ZmFyZXIoZGZ0KVxuICBjb25zdCB0cmVlID0gY3JlYXRlVHJlZShjcmVhdGVSb3V0ZSlcblxuICAvLyByZWdpc3RlciB0cmVlIGluIHJvdXRlclxuICA7KGZ1bmN0aW9uIHdhbGsgKHRyZWUsIHJvdXRlKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodHJlZVswXSkpIHtcbiAgICAgIC8vIHdhbGsgb3ZlciBhbGwgcm91dGVzIGF0IHRoZSByb290IG9mIHRoZSB0cmVlXG4gICAgICB0cmVlLmZvckVhY2goZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgd2Fsayhub2RlLCByb3V0ZSlcbiAgICAgIH0pXG4gICAgfSBlbHNlIGlmICh0cmVlWzFdKSB7XG4gICAgICAvLyBoYW5kbGUgaW5saW5lIGZ1bmN0aW9ucyBhcyBhcmdzXG4gICAgICBjb25zdCBpbm5lclJvdXRlID0gdHJlZVswXVxuICAgICAgICA/IHJvdXRlLmNvbmNhdCh0cmVlWzBdKS5qb2luKCcvJylcbiAgICAgICAgOiByb3V0ZS5sZW5ndGggPyByb3V0ZS5qb2luKCcvJykgOiB0cmVlWzBdXG4gICAgICByb3V0ZXIub24oaW5uZXJSb3V0ZSwgdHJlZVsxXSlcbiAgICAgIHdhbGsodHJlZVsyXSwgcm91dGUuY29uY2F0KHRyZWVbMF0pKVxuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0cmVlWzJdKSkge1xuICAgICAgLy8gdHJhdmVyc2UgYW5kIGFwcGVuZCByb3V0ZVxuICAgICAgd2Fsayh0cmVlWzJdLCByb3V0ZS5jb25jYXQodHJlZVswXSkpXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHJlZ2lzdGVyIHBhdGggaW4gcm91dGVyXG4gICAgICBjb25zdCBud1JvdXRlID0gdHJlZVswXVxuICAgICAgICA/IHJvdXRlLmNvbmNhdCh0cmVlWzBdKS5qb2luKCcvJylcbiAgICAgICAgOiByb3V0ZS5sZW5ndGggPyByb3V0ZS5qb2luKCcvJykgOiB0cmVlWzBdXG4gICAgICByb3V0ZXIub24obndSb3V0ZSwgdHJlZVsyXSlcbiAgICB9XG4gIH0pKHRyZWUsIFtdKVxuXG4gIC8vIG1hdGNoIGEgcm91dGUgb24gdGhlIHJvdXRlclxuICByZXR1cm4gZnVuY3Rpb24gbWF0Y2ggKHJvdXRlKSB7XG4gICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiByb3V0ZSwgJ3N0cmluZycsICdyb3V0ZSBtdXN0IGJlIGEgc3RyaW5nJylcbiAgICBjb25zdCBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpXG4gICAgYXJnc1swXSA9IHBhdGhuYW1lKGFyZ3NbMF0pXG4gICAgcmV0dXJuIHJvdXRlci5hcHBseShudWxsLCBhcmdzKVxuICB9XG59XG5cbi8vIHJlZ2lzdGVyIHJlZ3VsYXIgcm91dGVcbmZ1bmN0aW9uIF9jcmVhdGVSb3V0ZSAocm91dGUsIGlubGluZSwgY2hpbGQpIHtcbiAgaWYgKCFjaGlsZCkge1xuICAgIGNoaWxkID0gaW5saW5lXG4gICAgaW5saW5lID0gbnVsbFxuICB9XG4gIGFzc2VydC5lcXVhbCh0eXBlb2Ygcm91dGUsICdzdHJpbmcnLCAncm91dGUgbXVzdCBiZSBhIHN0cmluZycpXG4gIGFzc2VydC5vayhjaGlsZCwgJ2NoaWxkIGV4aXN0cycpXG4gIHJvdXRlID0gcm91dGUucmVwbGFjZSgvXlxcLy8sICcnKVxuICByZXR1cm4gWyByb3V0ZSwgaW5saW5lLCBjaGlsZCBdXG59XG4iLCJcInVzZSBzdHJpY3RcIlxuLy8gTW9kdWxlIGV4cG9ydCBwYXR0ZXJuIGZyb21cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS91bWRqcy91bWQvYmxvYi9tYXN0ZXIvcmV0dXJuRXhwb3J0cy5qc1xuOyhmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgICAgICBkZWZpbmUoW10sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIE5vZGUuIERvZXMgbm90IHdvcmsgd2l0aCBzdHJpY3QgQ29tbW9uSlMsIGJ1dFxuICAgICAgICAvLyBvbmx5IENvbW1vbkpTLWxpa2UgZW52aXJvbm1lbnRzIHRoYXQgc3VwcG9ydCBtb2R1bGUuZXhwb3J0cyxcbiAgICAgICAgLy8gbGlrZSBOb2RlLlxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBCcm93c2VyIGdsb2JhbHMgKHJvb3QgaXMgd2luZG93KVxuICAgICAgICByb290LnN0b3JlID0gZmFjdG9yeSgpO1xuICB9XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcblx0XG5cdC8vIFN0b3JlLmpzXG5cdHZhciBzdG9yZSA9IHt9LFxuXHRcdHdpbiA9ICh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnID8gd2luZG93IDogZ2xvYmFsKSxcblx0XHRkb2MgPSB3aW4uZG9jdW1lbnQsXG5cdFx0bG9jYWxTdG9yYWdlTmFtZSA9ICdsb2NhbFN0b3JhZ2UnLFxuXHRcdHNjcmlwdFRhZyA9ICdzY3JpcHQnLFxuXHRcdHN0b3JhZ2VcblxuXHRzdG9yZS5kaXNhYmxlZCA9IGZhbHNlXG5cdHN0b3JlLnZlcnNpb24gPSAnMS4zLjIwJ1xuXHRzdG9yZS5zZXQgPSBmdW5jdGlvbihrZXksIHZhbHVlKSB7fVxuXHRzdG9yZS5nZXQgPSBmdW5jdGlvbihrZXksIGRlZmF1bHRWYWwpIHt9XG5cdHN0b3JlLmhhcyA9IGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gc3RvcmUuZ2V0KGtleSkgIT09IHVuZGVmaW5lZCB9XG5cdHN0b3JlLnJlbW92ZSA9IGZ1bmN0aW9uKGtleSkge31cblx0c3RvcmUuY2xlYXIgPSBmdW5jdGlvbigpIHt9XG5cdHN0b3JlLnRyYW5zYWN0ID0gZnVuY3Rpb24oa2V5LCBkZWZhdWx0VmFsLCB0cmFuc2FjdGlvbkZuKSB7XG5cdFx0aWYgKHRyYW5zYWN0aW9uRm4gPT0gbnVsbCkge1xuXHRcdFx0dHJhbnNhY3Rpb25GbiA9IGRlZmF1bHRWYWxcblx0XHRcdGRlZmF1bHRWYWwgPSBudWxsXG5cdFx0fVxuXHRcdGlmIChkZWZhdWx0VmFsID09IG51bGwpIHtcblx0XHRcdGRlZmF1bHRWYWwgPSB7fVxuXHRcdH1cblx0XHR2YXIgdmFsID0gc3RvcmUuZ2V0KGtleSwgZGVmYXVsdFZhbClcblx0XHR0cmFuc2FjdGlvbkZuKHZhbClcblx0XHRzdG9yZS5zZXQoa2V5LCB2YWwpXG5cdH1cblx0c3RvcmUuZ2V0QWxsID0gZnVuY3Rpb24oKSB7fVxuXHRzdG9yZS5mb3JFYWNoID0gZnVuY3Rpb24oKSB7fVxuXG5cdHN0b3JlLnNlcmlhbGl6ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0cmV0dXJuIEpTT04uc3RyaW5naWZ5KHZhbHVlKVxuXHR9XG5cdHN0b3JlLmRlc2VyaWFsaXplID0gZnVuY3Rpb24odmFsdWUpIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSB7IHJldHVybiB1bmRlZmluZWQgfVxuXHRcdHRyeSB7IHJldHVybiBKU09OLnBhcnNlKHZhbHVlKSB9XG5cdFx0Y2F0Y2goZSkgeyByZXR1cm4gdmFsdWUgfHwgdW5kZWZpbmVkIH1cblx0fVxuXG5cdC8vIEZ1bmN0aW9ucyB0byBlbmNhcHN1bGF0ZSBxdWVzdGlvbmFibGUgRmlyZUZveCAzLjYuMTMgYmVoYXZpb3Jcblx0Ly8gd2hlbiBhYm91dC5jb25maWc6OmRvbS5zdG9yYWdlLmVuYWJsZWQgPT09IGZhbHNlXG5cdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbWFyY3Vzd2VzdGluL3N0b3JlLmpzL2lzc3VlcyNpc3N1ZS8xM1xuXHRmdW5jdGlvbiBpc0xvY2FsU3RvcmFnZU5hbWVTdXBwb3J0ZWQoKSB7XG5cdFx0dHJ5IHsgcmV0dXJuIChsb2NhbFN0b3JhZ2VOYW1lIGluIHdpbiAmJiB3aW5bbG9jYWxTdG9yYWdlTmFtZV0pIH1cblx0XHRjYXRjaChlcnIpIHsgcmV0dXJuIGZhbHNlIH1cblx0fVxuXG5cdGlmIChpc0xvY2FsU3RvcmFnZU5hbWVTdXBwb3J0ZWQoKSkge1xuXHRcdHN0b3JhZ2UgPSB3aW5bbG9jYWxTdG9yYWdlTmFtZV1cblx0XHRzdG9yZS5zZXQgPSBmdW5jdGlvbihrZXksIHZhbCkge1xuXHRcdFx0aWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiBzdG9yZS5yZW1vdmUoa2V5KSB9XG5cdFx0XHRzdG9yYWdlLnNldEl0ZW0oa2V5LCBzdG9yZS5zZXJpYWxpemUodmFsKSlcblx0XHRcdHJldHVybiB2YWxcblx0XHR9XG5cdFx0c3RvcmUuZ2V0ID0gZnVuY3Rpb24oa2V5LCBkZWZhdWx0VmFsKSB7XG5cdFx0XHR2YXIgdmFsID0gc3RvcmUuZGVzZXJpYWxpemUoc3RvcmFnZS5nZXRJdGVtKGtleSkpXG5cdFx0XHRyZXR1cm4gKHZhbCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdFZhbCA6IHZhbClcblx0XHR9XG5cdFx0c3RvcmUucmVtb3ZlID0gZnVuY3Rpb24oa2V5KSB7IHN0b3JhZ2UucmVtb3ZlSXRlbShrZXkpIH1cblx0XHRzdG9yZS5jbGVhciA9IGZ1bmN0aW9uKCkgeyBzdG9yYWdlLmNsZWFyKCkgfVxuXHRcdHN0b3JlLmdldEFsbCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHJldCA9IHt9XG5cdFx0XHRzdG9yZS5mb3JFYWNoKGZ1bmN0aW9uKGtleSwgdmFsKSB7XG5cdFx0XHRcdHJldFtrZXldID0gdmFsXG5cdFx0XHR9KVxuXHRcdFx0cmV0dXJuIHJldFxuXHRcdH1cblx0XHRzdG9yZS5mb3JFYWNoID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcblx0XHRcdGZvciAodmFyIGk9MDsgaTxzdG9yYWdlLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHZhciBrZXkgPSBzdG9yYWdlLmtleShpKVxuXHRcdFx0XHRjYWxsYmFjayhrZXksIHN0b3JlLmdldChrZXkpKVxuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIGlmIChkb2MgJiYgZG9jLmRvY3VtZW50RWxlbWVudC5hZGRCZWhhdmlvcikge1xuXHRcdHZhciBzdG9yYWdlT3duZXIsXG5cdFx0XHRzdG9yYWdlQ29udGFpbmVyXG5cdFx0Ly8gU2luY2UgI3VzZXJEYXRhIHN0b3JhZ2UgYXBwbGllcyBvbmx5IHRvIHNwZWNpZmljIHBhdGhzLCB3ZSBuZWVkIHRvXG5cdFx0Ly8gc29tZWhvdyBsaW5rIG91ciBkYXRhIHRvIGEgc3BlY2lmaWMgcGF0aC4gIFdlIGNob29zZSAvZmF2aWNvbi5pY29cblx0XHQvLyBhcyBhIHByZXR0eSBzYWZlIG9wdGlvbiwgc2luY2UgYWxsIGJyb3dzZXJzIGFscmVhZHkgbWFrZSBhIHJlcXVlc3QgdG9cblx0XHQvLyB0aGlzIFVSTCBhbnl3YXkgYW5kIGJlaW5nIGEgNDA0IHdpbGwgbm90IGh1cnQgdXMgaGVyZS4gIFdlIHdyYXAgYW5cblx0XHQvLyBpZnJhbWUgcG9pbnRpbmcgdG8gdGhlIGZhdmljb24gaW4gYW4gQWN0aXZlWE9iamVjdChodG1sZmlsZSkgb2JqZWN0XG5cdFx0Ly8gKHNlZTogaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2FhNzUyNTc0KHY9VlMuODUpLmFzcHgpXG5cdFx0Ly8gc2luY2UgdGhlIGlmcmFtZSBhY2Nlc3MgcnVsZXMgYXBwZWFyIHRvIGFsbG93IGRpcmVjdCBhY2Nlc3MgYW5kXG5cdFx0Ly8gbWFuaXB1bGF0aW9uIG9mIHRoZSBkb2N1bWVudCBlbGVtZW50LCBldmVuIGZvciBhIDQwNCBwYWdlLiAgVGhpc1xuXHRcdC8vIGRvY3VtZW50IGNhbiBiZSB1c2VkIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgZG9jdW1lbnQgKHdoaWNoIHdvdWxkXG5cdFx0Ly8gaGF2ZSBiZWVuIGxpbWl0ZWQgdG8gdGhlIGN1cnJlbnQgcGF0aCkgdG8gcGVyZm9ybSAjdXNlckRhdGEgc3RvcmFnZS5cblx0XHR0cnkge1xuXHRcdFx0c3RvcmFnZUNvbnRhaW5lciA9IG5ldyBBY3RpdmVYT2JqZWN0KCdodG1sZmlsZScpXG5cdFx0XHRzdG9yYWdlQ29udGFpbmVyLm9wZW4oKVxuXHRcdFx0c3RvcmFnZUNvbnRhaW5lci53cml0ZSgnPCcrc2NyaXB0VGFnKyc+ZG9jdW1lbnQudz13aW5kb3c8Lycrc2NyaXB0VGFnKyc+PGlmcmFtZSBzcmM9XCIvZmF2aWNvbi5pY29cIj48L2lmcmFtZT4nKVxuXHRcdFx0c3RvcmFnZUNvbnRhaW5lci5jbG9zZSgpXG5cdFx0XHRzdG9yYWdlT3duZXIgPSBzdG9yYWdlQ29udGFpbmVyLncuZnJhbWVzWzBdLmRvY3VtZW50XG5cdFx0XHRzdG9yYWdlID0gc3RvcmFnZU93bmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdFx0fSBjYXRjaChlKSB7XG5cdFx0XHQvLyBzb21laG93IEFjdGl2ZVhPYmplY3QgaW5zdGFudGlhdGlvbiBmYWlsZWQgKHBlcmhhcHMgc29tZSBzcGVjaWFsXG5cdFx0XHQvLyBzZWN1cml0eSBzZXR0aW5ncyBvciBvdGhlcndzZSksIGZhbGwgYmFjayB0byBwZXItcGF0aCBzdG9yYWdlXG5cdFx0XHRzdG9yYWdlID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdFx0XHRzdG9yYWdlT3duZXIgPSBkb2MuYm9keVxuXHRcdH1cblx0XHR2YXIgd2l0aElFU3RvcmFnZSA9IGZ1bmN0aW9uKHN0b3JlRnVuY3Rpb24pIHtcblx0XHRcdHJldHVybiBmdW5jdGlvbigpIHtcblx0XHRcdFx0dmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDApXG5cdFx0XHRcdGFyZ3MudW5zaGlmdChzdG9yYWdlKVxuXHRcdFx0XHQvLyBTZWUgaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zNTMxMDgxKHY9VlMuODUpLmFzcHhcblx0XHRcdFx0Ly8gYW5kIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczUzMTQyNCh2PVZTLjg1KS5hc3B4XG5cdFx0XHRcdHN0b3JhZ2VPd25lci5hcHBlbmRDaGlsZChzdG9yYWdlKVxuXHRcdFx0XHRzdG9yYWdlLmFkZEJlaGF2aW9yKCcjZGVmYXVsdCN1c2VyRGF0YScpXG5cdFx0XHRcdHN0b3JhZ2UubG9hZChsb2NhbFN0b3JhZ2VOYW1lKVxuXHRcdFx0XHR2YXIgcmVzdWx0ID0gc3RvcmVGdW5jdGlvbi5hcHBseShzdG9yZSwgYXJncylcblx0XHRcdFx0c3RvcmFnZU93bmVyLnJlbW92ZUNoaWxkKHN0b3JhZ2UpXG5cdFx0XHRcdHJldHVybiByZXN1bHRcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBJbiBJRTcsIGtleXMgY2Fubm90IHN0YXJ0IHdpdGggYSBkaWdpdCBvciBjb250YWluIGNlcnRhaW4gY2hhcnMuXG5cdFx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJjdXN3ZXN0aW4vc3RvcmUuanMvaXNzdWVzLzQwXG5cdFx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJjdXN3ZXN0aW4vc3RvcmUuanMvaXNzdWVzLzgzXG5cdFx0dmFyIGZvcmJpZGRlbkNoYXJzUmVnZXggPSBuZXcgUmVnRXhwKFwiWyFcXFwiIyQlJicoKSorLC9cXFxcXFxcXDo7PD0+P0BbXFxcXF1eYHt8fX5dXCIsIFwiZ1wiKVxuXHRcdHZhciBpZUtleUZpeCA9IGZ1bmN0aW9uKGtleSkge1xuXHRcdFx0cmV0dXJuIGtleS5yZXBsYWNlKC9eZC8sICdfX18kJicpLnJlcGxhY2UoZm9yYmlkZGVuQ2hhcnNSZWdleCwgJ19fXycpXG5cdFx0fVxuXHRcdHN0b3JlLnNldCA9IHdpdGhJRVN0b3JhZ2UoZnVuY3Rpb24oc3RvcmFnZSwga2V5LCB2YWwpIHtcblx0XHRcdGtleSA9IGllS2V5Rml4KGtleSlcblx0XHRcdGlmICh2YWwgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gc3RvcmUucmVtb3ZlKGtleSkgfVxuXHRcdFx0c3RvcmFnZS5zZXRBdHRyaWJ1dGUoa2V5LCBzdG9yZS5zZXJpYWxpemUodmFsKSlcblx0XHRcdHN0b3JhZ2Uuc2F2ZShsb2NhbFN0b3JhZ2VOYW1lKVxuXHRcdFx0cmV0dXJuIHZhbFxuXHRcdH0pXG5cdFx0c3RvcmUuZ2V0ID0gd2l0aElFU3RvcmFnZShmdW5jdGlvbihzdG9yYWdlLCBrZXksIGRlZmF1bHRWYWwpIHtcblx0XHRcdGtleSA9IGllS2V5Rml4KGtleSlcblx0XHRcdHZhciB2YWwgPSBzdG9yZS5kZXNlcmlhbGl6ZShzdG9yYWdlLmdldEF0dHJpYnV0ZShrZXkpKVxuXHRcdFx0cmV0dXJuICh2YWwgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRWYWwgOiB2YWwpXG5cdFx0fSlcblx0XHRzdG9yZS5yZW1vdmUgPSB3aXRoSUVTdG9yYWdlKGZ1bmN0aW9uKHN0b3JhZ2UsIGtleSkge1xuXHRcdFx0a2V5ID0gaWVLZXlGaXgoa2V5KVxuXHRcdFx0c3RvcmFnZS5yZW1vdmVBdHRyaWJ1dGUoa2V5KVxuXHRcdFx0c3RvcmFnZS5zYXZlKGxvY2FsU3RvcmFnZU5hbWUpXG5cdFx0fSlcblx0XHRzdG9yZS5jbGVhciA9IHdpdGhJRVN0b3JhZ2UoZnVuY3Rpb24oc3RvcmFnZSkge1xuXHRcdFx0dmFyIGF0dHJpYnV0ZXMgPSBzdG9yYWdlLlhNTERvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hdHRyaWJ1dGVzXG5cdFx0XHRzdG9yYWdlLmxvYWQobG9jYWxTdG9yYWdlTmFtZSlcblx0XHRcdGZvciAodmFyIGk9YXR0cmlidXRlcy5sZW5ndGgtMTsgaT49MDsgaS0tKSB7XG5cdFx0XHRcdHN0b3JhZ2UucmVtb3ZlQXR0cmlidXRlKGF0dHJpYnV0ZXNbaV0ubmFtZSlcblx0XHRcdH1cblx0XHRcdHN0b3JhZ2Uuc2F2ZShsb2NhbFN0b3JhZ2VOYW1lKVxuXHRcdH0pXG5cdFx0c3RvcmUuZ2V0QWxsID0gZnVuY3Rpb24oc3RvcmFnZSkge1xuXHRcdFx0dmFyIHJldCA9IHt9XG5cdFx0XHRzdG9yZS5mb3JFYWNoKGZ1bmN0aW9uKGtleSwgdmFsKSB7XG5cdFx0XHRcdHJldFtrZXldID0gdmFsXG5cdFx0XHR9KVxuXHRcdFx0cmV0dXJuIHJldFxuXHRcdH1cblx0XHRzdG9yZS5mb3JFYWNoID0gd2l0aElFU3RvcmFnZShmdW5jdGlvbihzdG9yYWdlLCBjYWxsYmFjaykge1xuXHRcdFx0dmFyIGF0dHJpYnV0ZXMgPSBzdG9yYWdlLlhNTERvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hdHRyaWJ1dGVzXG5cdFx0XHRmb3IgKHZhciBpPTAsIGF0dHI7IGF0dHI9YXR0cmlidXRlc1tpXTsgKytpKSB7XG5cdFx0XHRcdGNhbGxiYWNrKGF0dHIubmFtZSwgc3RvcmUuZGVzZXJpYWxpemUoc3RvcmFnZS5nZXRBdHRyaWJ1dGUoYXR0ci5uYW1lKSkpXG5cdFx0XHR9XG5cdFx0fSlcblx0fVxuXG5cdHRyeSB7XG5cdFx0dmFyIHRlc3RLZXkgPSAnX19zdG9yZWpzX18nXG5cdFx0c3RvcmUuc2V0KHRlc3RLZXksIHRlc3RLZXkpXG5cdFx0aWYgKHN0b3JlLmdldCh0ZXN0S2V5KSAhPSB0ZXN0S2V5KSB7IHN0b3JlLmRpc2FibGVkID0gdHJ1ZSB9XG5cdFx0c3RvcmUucmVtb3ZlKHRlc3RLZXkpXG5cdH0gY2F0Y2goZSkge1xuXHRcdHN0b3JlLmRpc2FibGVkID0gdHJ1ZVxuXHR9XG5cdHN0b3JlLmVuYWJsZWQgPSAhc3RvcmUuZGlzYWJsZWRcblx0XG5cdHJldHVybiBzdG9yZVxufSkpO1xuIiwiXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB0cmltO1xuXG5mdW5jdGlvbiB0cmltKHN0cil7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyp8XFxzKiQvZywgJycpO1xufVxuXG5leHBvcnRzLmxlZnQgPSBmdW5jdGlvbihzdHIpe1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqLywgJycpO1xufTtcblxuZXhwb3J0cy5yaWdodCA9IGZ1bmN0aW9uKHN0cil7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnXG5cbi8qKlxuICogR2VuZXJhdGUgYSBmdW5jdGlvbiBmb3Igc2VxdWVuY2VzIG9mIHJlLXVzYWJsZSBJRHMuXG4gKlxuICogQHBhcmFtIHByZWZpeCB7c3RyaW5nfVxuICogQHBhcmFtIHN1ZmZpeCB7c3RyaW5nfVxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwcmVmaXgsIHN1ZmZpeCkge1xuICB2YXIgaWQgPSAwXG5cbiAgcHJlZml4ID0gcHJlZml4IHx8ICcnXG4gIHN1ZmZpeCA9IHN1ZmZpeCB8fCAnJ1xuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHByZWZpeCArIChpZCsrKSArIHN1ZmZpeFxuICB9XG59XG4iLCJjb25zdCBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKVxuY29uc3QgdHJpZSA9IHJlcXVpcmUoJy4vdHJpZScpXG5cbm1vZHVsZS5leHBvcnRzID0gV2F5ZmFyZXJcblxuLy8gY3JlYXRlIGEgcm91dGVyXG4vLyBzdHIgLT4gb2JqXG5mdW5jdGlvbiBXYXlmYXJlciAoZGZ0KSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBXYXlmYXJlcikpIHJldHVybiBuZXcgV2F5ZmFyZXIoZGZ0KVxuXG4gIGNvbnN0IF9kZWZhdWx0ID0gKGRmdCB8fCAnJykucmVwbGFjZSgvXlxcLy8sICcnKVxuICBjb25zdCBfdHJpZSA9IHRyaWUoKVxuXG4gIGVtaXQuX3RyaWUgPSBfdHJpZVxuICBlbWl0LmVtaXQgPSBlbWl0XG4gIGVtaXQub24gPSBvblxuICBlbWl0Ll93YXlmYXJlciA9IHRydWVcblxuICByZXR1cm4gZW1pdFxuXG4gIC8vIGRlZmluZSBhIHJvdXRlXG4gIC8vIChzdHIsIGZuKSAtPiBvYmpcbiAgZnVuY3Rpb24gb24gKHJvdXRlLCBjYikge1xuICAgIGFzc2VydC5lcXVhbCh0eXBlb2Ygcm91dGUsICdzdHJpbmcnKVxuICAgIGFzc2VydC5lcXVhbCh0eXBlb2YgY2IsICdmdW5jdGlvbicpXG5cbiAgICByb3V0ZSA9IHJvdXRlIHx8ICcvJ1xuXG4gICAgaWYgKGNiICYmIGNiLl93YXlmYXJlciAmJiBjYi5fdHJpZSkge1xuICAgICAgX3RyaWUubW91bnQocm91dGUsIGNiLl90cmllLnRyaWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IG5vZGUgPSBfdHJpZS5jcmVhdGUocm91dGUpXG4gICAgICBub2RlLmNiID0gY2JcbiAgICB9XG5cbiAgICByZXR1cm4gZW1pdFxuICB9XG5cbiAgLy8gbWF0Y2ggYW5kIGNhbGwgYSByb3V0ZVxuICAvLyAoc3RyLCBvYmo/KSAtPiBudWxsXG4gIGZ1bmN0aW9uIGVtaXQgKHJvdXRlKSB7XG4gICAgYXNzZXJ0Lm5vdEVxdWFsKHJvdXRlLCB1bmRlZmluZWQsIFwiJ3JvdXRlJyBtdXN0IGJlIGRlZmluZWRcIilcbiAgICBjb25zdCBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2ldXG4gICAgfVxuXG4gICAgY29uc3Qgbm9kZSA9IF90cmllLm1hdGNoKHJvdXRlKVxuICAgIGlmIChub2RlICYmIG5vZGUuY2IpIHtcbiAgICAgIGFyZ3NbMF0gPSBub2RlLnBhcmFtc1xuICAgICAgcmV0dXJuIG5vZGUuY2IuYXBwbHkobnVsbCwgYXJncylcbiAgICB9XG5cbiAgICBjb25zdCBkZnQgPSBfdHJpZS5tYXRjaChfZGVmYXVsdClcbiAgICBpZiAoZGZ0ICYmIGRmdC5jYikge1xuICAgICAgYXJnc1swXSA9IGRmdC5wYXJhbXNcbiAgICAgIHJldHVybiBkZnQuY2IuYXBwbHkobnVsbCwgYXJncylcbiAgICB9XG5cbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJyb3V0ZSAnXCIgKyByb3V0ZSArIFwiJyBkaWQgbm90IG1hdGNoXCIpXG4gIH1cbn1cbiIsImNvbnN0IG11dGF0ZSA9IHJlcXVpcmUoJ3h0ZW5kL211dGFibGUnKVxuY29uc3QgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0JylcbmNvbnN0IHh0ZW5kID0gcmVxdWlyZSgneHRlbmQnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRyaWVcblxuLy8gY3JlYXRlIGEgbmV3IHRyaWVcbi8vIG51bGwgLT4gb2JqXG5mdW5jdGlvbiBUcmllICgpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFRyaWUpKSByZXR1cm4gbmV3IFRyaWUoKVxuICB0aGlzLnRyaWUgPSB7IG5vZGVzOiB7fSB9XG59XG5cbi8vIGNyZWF0ZSBhIG5vZGUgb24gdGhlIHRyaWUgYXQgcm91dGVcbi8vIGFuZCByZXR1cm4gYSBub2RlXG4vLyBzdHIgLT4gbnVsbFxuVHJpZS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24gKHJvdXRlKSB7XG4gIGFzc2VydC5lcXVhbCh0eXBlb2Ygcm91dGUsICdzdHJpbmcnLCAncm91dGUgc2hvdWxkIGJlIGEgc3RyaW5nJylcbiAgLy8gc3RyaXAgbGVhZGluZyAnLycgYW5kIHNwbGl0IHJvdXRlc1xuICBjb25zdCByb3V0ZXMgPSByb3V0ZS5yZXBsYWNlKC9eXFwvLywgJycpLnNwbGl0KCcvJylcbiAgcmV0dXJuIChmdW5jdGlvbiBjcmVhdGVOb2RlIChpbmRleCwgdHJpZSwgcm91dGVzKSB7XG4gICAgY29uc3Qgcm91dGUgPSByb3V0ZXNbaW5kZXhdXG5cbiAgICBpZiAocm91dGUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRyaWVcblxuICAgIHZhciBub2RlID0gbnVsbFxuICAgIGlmICgvXjovLnRlc3Qocm91dGUpKSB7XG4gICAgICAvLyBpZiBub2RlIGlzIGEgbmFtZSBtYXRjaCwgc2V0IG5hbWUgYW5kIGFwcGVuZCB0byAnOicgbm9kZVxuICAgICAgaWYgKCF0cmllLm5vZGVzWyckJCddKSB7XG4gICAgICAgIG5vZGUgPSB7IG5vZGVzOiB7fSB9XG4gICAgICAgIHRyaWUubm9kZXNbJyQkJ10gPSBub2RlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub2RlID0gdHJpZS5ub2Rlc1snJCQnXVxuICAgICAgfVxuICAgICAgdHJpZS5uYW1lID0gcm91dGUucmVwbGFjZSgvXjovLCAnJylcbiAgICB9IGVsc2UgaWYgKCF0cmllLm5vZGVzW3JvdXRlXSkge1xuICAgICAgbm9kZSA9IHsgbm9kZXM6IHt9IH1cbiAgICAgIHRyaWUubm9kZXNbcm91dGVdID0gbm9kZVxuICAgIH0gZWxzZSB7XG4gICAgICBub2RlID0gdHJpZS5ub2Rlc1tyb3V0ZV1cbiAgICB9XG5cbiAgICAvLyB3ZSBtdXN0IHJlY3Vyc2UgZGVlcGVyXG4gICAgcmV0dXJuIGNyZWF0ZU5vZGUoaW5kZXggKyAxLCBub2RlLCByb3V0ZXMpXG4gIH0pKDAsIHRoaXMudHJpZSwgcm91dGVzKVxufVxuXG4vLyBtYXRjaCBhIHJvdXRlIG9uIHRoZSB0cmllXG4vLyBhbmQgcmV0dXJuIHRoZSBub2RlXG4vLyBzdHIgLT4gb2JqXG5UcmllLnByb3RvdHlwZS5tYXRjaCA9IGZ1bmN0aW9uIChyb3V0ZSkge1xuICBhc3NlcnQuZXF1YWwodHlwZW9mIHJvdXRlLCAnc3RyaW5nJywgJ3JvdXRlIHNob3VsZCBiZSBhIHN0cmluZycpXG5cbiAgY29uc3Qgcm91dGVzID0gcm91dGUucmVwbGFjZSgvXlxcLy8sICcnKS5zcGxpdCgnLycpXG4gIGNvbnN0IHBhcmFtcyA9IHt9XG5cbiAgdmFyIG5vZGUgPSAoZnVuY3Rpb24gc2VhcmNoIChpbmRleCwgdHJpZSkge1xuICAgIC8vIGVpdGhlciB0aGVyZSdzIG5vIG1hdGNoLCBvciB3ZSdyZSBkb25lIHNlYXJjaGluZ1xuICAgIGlmICh0cmllID09PSB1bmRlZmluZWQpIHJldHVybiB1bmRlZmluZWRcbiAgICBjb25zdCByb3V0ZSA9IHJvdXRlc1tpbmRleF1cbiAgICBpZiAocm91dGUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRyaWVcblxuICAgIGlmICh0cmllLm5vZGVzW3JvdXRlXSkge1xuICAgICAgLy8gbWF0Y2ggcmVndWxhciByb3V0ZXMgZmlyc3RcbiAgICAgIHJldHVybiBzZWFyY2goaW5kZXggKyAxLCB0cmllLm5vZGVzW3JvdXRlXSlcbiAgICB9IGVsc2UgaWYgKHRyaWUubmFtZSkge1xuICAgICAgLy8gbWF0Y2ggbmFtZWQgcm91dGVzXG4gICAgICBwYXJhbXNbdHJpZS5uYW1lXSA9IHJvdXRlXG4gICAgICByZXR1cm4gc2VhcmNoKGluZGV4ICsgMSwgdHJpZS5ub2Rlc1snJCQnXSlcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gbm8gbWF0Y2hlcyBmb3VuZFxuICAgICAgcmV0dXJuIHNlYXJjaChpbmRleCArIDEpXG4gICAgfVxuICB9KSgwLCB0aGlzLnRyaWUpXG5cbiAgaWYgKCFub2RlKSByZXR1cm4gdW5kZWZpbmVkXG4gIG5vZGUgPSB4dGVuZChub2RlKVxuICBub2RlLnBhcmFtcyA9IHBhcmFtc1xuICByZXR1cm4gbm9kZVxufVxuXG4vLyBtb3VudCBhIHRyaWUgb250byBhIG5vZGUgYXQgcm91dGVcbi8vIChzdHIsIG9iaikgLT4gbnVsbFxuVHJpZS5wcm90b3R5cGUubW91bnQgPSBmdW5jdGlvbiAocm91dGUsIHRyaWUpIHtcbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiByb3V0ZSwgJ3N0cmluZycsICdyb3V0ZSBzaG91bGQgYmUgYSBzdHJpbmcnKVxuICBhc3NlcnQuZXF1YWwodHlwZW9mIHRyaWUsICdvYmplY3QnLCAndHJpZSBzaG91bGQgYmUgYSBvYmplY3QnKVxuXG4gIGNvbnN0IHNwbGl0ID0gcm91dGUucmVwbGFjZSgvXlxcLy8sICcnKS5zcGxpdCgnLycpXG4gIHZhciBub2RlID0gbnVsbFxuICB2YXIga2V5ID0gbnVsbFxuXG4gIGlmIChzcGxpdC5sZW5ndGggPT09IDEpIHtcbiAgICBrZXkgPSBzcGxpdFswXVxuICAgIG5vZGUgPSB0aGlzLmNyZWF0ZShrZXkpXG4gIH0gZWxzZSB7XG4gICAgY29uc3QgaGVhZEFyciA9IHNwbGl0LnNwbGljZSgwLCBzcGxpdC5sZW5ndGggLSAxKVxuICAgIGNvbnN0IGhlYWQgPSBoZWFkQXJyLmpvaW4oJy8nKVxuICAgIGtleSA9IHNwbGl0WzBdXG4gICAgbm9kZSA9IHRoaXMuY3JlYXRlKGhlYWQpXG4gIH1cblxuICBtdXRhdGUobm9kZS5ub2RlcywgdHJpZS5ub2RlcylcbiAgaWYgKHRyaWUubmFtZSkgbm9kZS5uYW1lID0gdHJpZS5uYW1lXG5cbiAgLy8gZGVsZWdhdGUgcHJvcGVydGllcyBmcm9tICcvJyB0byB0aGUgbmV3IG5vZGVcbiAgLy8gJy8nIGNhbm5vdCBiZSByZWFjaGVkIG9uY2UgbW91bnRlZFxuICBpZiAobm9kZS5ub2Rlc1snJ10pIHtcbiAgICBPYmplY3Qua2V5cyhub2RlLm5vZGVzWycnXSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBpZiAoa2V5ID09PSAnbm9kZXMnKSByZXR1cm5cbiAgICAgIG5vZGVba2V5XSA9IG5vZGUubm9kZXNbJyddW2tleV1cbiAgICB9KVxuICAgIG11dGF0ZShub2RlLm5vZGVzLCBub2RlLm5vZGVzWycnXS5ub2RlcylcbiAgICBkZWxldGUgbm9kZS5ub2Rlc1snJ10ubm9kZXNcbiAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgd2luZG93ID0gcmVxdWlyZShcImdsb2JhbC93aW5kb3dcIilcbnZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZShcImlzLWZ1bmN0aW9uXCIpXG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZShcInBhcnNlLWhlYWRlcnNcIilcbnZhciB4dGVuZCA9IHJlcXVpcmUoXCJ4dGVuZFwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVhIUlxuY3JlYXRlWEhSLlhNTEh0dHBSZXF1ZXN0ID0gd2luZG93LlhNTEh0dHBSZXF1ZXN0IHx8IG5vb3BcbmNyZWF0ZVhIUi5YRG9tYWluUmVxdWVzdCA9IFwid2l0aENyZWRlbnRpYWxzXCIgaW4gKG5ldyBjcmVhdGVYSFIuWE1MSHR0cFJlcXVlc3QoKSkgPyBjcmVhdGVYSFIuWE1MSHR0cFJlcXVlc3QgOiB3aW5kb3cuWERvbWFpblJlcXVlc3RcblxuZm9yRWFjaEFycmF5KFtcImdldFwiLCBcInB1dFwiLCBcInBvc3RcIiwgXCJwYXRjaFwiLCBcImhlYWRcIiwgXCJkZWxldGVcIl0sIGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgIGNyZWF0ZVhIUlttZXRob2QgPT09IFwiZGVsZXRlXCIgPyBcImRlbFwiIDogbWV0aG9kXSA9IGZ1bmN0aW9uKHVyaSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICAgICAgb3B0aW9ucyA9IGluaXRQYXJhbXModXJpLCBvcHRpb25zLCBjYWxsYmFjaylcbiAgICAgICAgb3B0aW9ucy5tZXRob2QgPSBtZXRob2QudG9VcHBlckNhc2UoKVxuICAgICAgICByZXR1cm4gX2NyZWF0ZVhIUihvcHRpb25zKVxuICAgIH1cbn0pXG5cbmZ1bmN0aW9uIGZvckVhY2hBcnJheShhcnJheSwgaXRlcmF0b3IpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGl0ZXJhdG9yKGFycmF5W2ldKVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaXNFbXB0eShvYmope1xuICAgIGZvcih2YXIgaSBpbiBvYmope1xuICAgICAgICBpZihvYmouaGFzT3duUHJvcGVydHkoaSkpIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZVxufVxuXG5mdW5jdGlvbiBpbml0UGFyYW1zKHVyaSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICB2YXIgcGFyYW1zID0gdXJpXG5cbiAgICBpZiAoaXNGdW5jdGlvbihvcHRpb25zKSkge1xuICAgICAgICBjYWxsYmFjayA9IG9wdGlvbnNcbiAgICAgICAgaWYgKHR5cGVvZiB1cmkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHBhcmFtcyA9IHt1cmk6dXJpfVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcGFyYW1zID0geHRlbmQob3B0aW9ucywge3VyaTogdXJpfSlcbiAgICB9XG5cbiAgICBwYXJhbXMuY2FsbGJhY2sgPSBjYWxsYmFja1xuICAgIHJldHVybiBwYXJhbXNcbn1cblxuZnVuY3Rpb24gY3JlYXRlWEhSKHVyaSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICBvcHRpb25zID0gaW5pdFBhcmFtcyh1cmksIG9wdGlvbnMsIGNhbGxiYWNrKVxuICAgIHJldHVybiBfY3JlYXRlWEhSKG9wdGlvbnMpXG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVYSFIob3B0aW9ucykge1xuICAgIGlmKHR5cGVvZiBvcHRpb25zLmNhbGxiYWNrID09PSBcInVuZGVmaW5lZFwiKXtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FsbGJhY2sgYXJndW1lbnQgbWlzc2luZ1wiKVxuICAgIH1cblxuICAgIHZhciBjYWxsZWQgPSBmYWxzZVxuICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uIGNiT25jZShlcnIsIHJlc3BvbnNlLCBib2R5KXtcbiAgICAgICAgaWYoIWNhbGxlZCl7XG4gICAgICAgICAgICBjYWxsZWQgPSB0cnVlXG4gICAgICAgICAgICBvcHRpb25zLmNhbGxiYWNrKGVyciwgcmVzcG9uc2UsIGJvZHkpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWFkeXN0YXRlY2hhbmdlKCkge1xuICAgICAgICBpZiAoeGhyLnJlYWR5U3RhdGUgPT09IDQpIHtcbiAgICAgICAgICAgIGxvYWRGdW5jKClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEJvZHkoKSB7XG4gICAgICAgIC8vIENocm9tZSB3aXRoIHJlcXVlc3RUeXBlPWJsb2IgdGhyb3dzIGVycm9ycyBhcnJvdW5kIHdoZW4gZXZlbiB0ZXN0aW5nIGFjY2VzcyB0byByZXNwb25zZVRleHRcbiAgICAgICAgdmFyIGJvZHkgPSB1bmRlZmluZWRcblxuICAgICAgICBpZiAoeGhyLnJlc3BvbnNlKSB7XG4gICAgICAgICAgICBib2R5ID0geGhyLnJlc3BvbnNlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBib2R5ID0geGhyLnJlc3BvbnNlVGV4dCB8fCBnZXRYbWwoeGhyKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzSnNvbikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBib2R5ID0gSlNPTi5wYXJzZShib2R5KVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBib2R5XG4gICAgfVxuXG4gICAgdmFyIGZhaWx1cmVSZXNwb25zZSA9IHtcbiAgICAgICAgICAgICAgICBib2R5OiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge30sXG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogMCxcbiAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgICAgICB1cmw6IHVyaSxcbiAgICAgICAgICAgICAgICByYXdSZXF1ZXN0OiB4aHJcbiAgICAgICAgICAgIH1cblxuICAgIGZ1bmN0aW9uIGVycm9yRnVuYyhldnQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRUaW1lcilcbiAgICAgICAgaWYoIShldnQgaW5zdGFuY2VvZiBFcnJvcikpe1xuICAgICAgICAgICAgZXZ0ID0gbmV3IEVycm9yKFwiXCIgKyAoZXZ0IHx8IFwiVW5rbm93biBYTUxIdHRwUmVxdWVzdCBFcnJvclwiKSApXG4gICAgICAgIH1cbiAgICAgICAgZXZ0LnN0YXR1c0NvZGUgPSAwXG4gICAgICAgIHJldHVybiBjYWxsYmFjayhldnQsIGZhaWx1cmVSZXNwb25zZSlcbiAgICB9XG5cbiAgICAvLyB3aWxsIGxvYWQgdGhlIGRhdGEgJiBwcm9jZXNzIHRoZSByZXNwb25zZSBpbiBhIHNwZWNpYWwgcmVzcG9uc2Ugb2JqZWN0XG4gICAgZnVuY3Rpb24gbG9hZEZ1bmMoKSB7XG4gICAgICAgIGlmIChhYm9ydGVkKSByZXR1cm5cbiAgICAgICAgdmFyIHN0YXR1c1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dFRpbWVyKVxuICAgICAgICBpZihvcHRpb25zLnVzZVhEUiAmJiB4aHIuc3RhdHVzPT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvL0lFOCBDT1JTIEdFVCBzdWNjZXNzZnVsIHJlc3BvbnNlIGRvZXNuJ3QgaGF2ZSBhIHN0YXR1cyBmaWVsZCwgYnV0IGJvZHkgaXMgZmluZVxuICAgICAgICAgICAgc3RhdHVzID0gMjAwXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGF0dXMgPSAoeGhyLnN0YXR1cyA9PT0gMTIyMyA/IDIwNCA6IHhoci5zdGF0dXMpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3BvbnNlID0gZmFpbHVyZVJlc3BvbnNlXG4gICAgICAgIHZhciBlcnIgPSBudWxsXG5cbiAgICAgICAgaWYgKHN0YXR1cyAhPT0gMCl7XG4gICAgICAgICAgICByZXNwb25zZSA9IHtcbiAgICAgICAgICAgICAgICBib2R5OiBnZXRCb2R5KCksXG4gICAgICAgICAgICAgICAgc3RhdHVzQ29kZTogc3RhdHVzLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgICAgICAgICAgIHVybDogdXJpLFxuICAgICAgICAgICAgICAgIHJhd1JlcXVlc3Q6IHhoclxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycyl7IC8vcmVtZW1iZXIgeGhyIGNhbiBpbiBmYWN0IGJlIFhEUiBmb3IgQ09SUyBpbiBJRVxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmhlYWRlcnMgPSBwYXJzZUhlYWRlcnMoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXJyID0gbmV3IEVycm9yKFwiSW50ZXJuYWwgWE1MSHR0cFJlcXVlc3QgRXJyb3JcIilcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyLCByZXNwb25zZSwgcmVzcG9uc2UuYm9keSlcbiAgICB9XG5cbiAgICB2YXIgeGhyID0gb3B0aW9ucy54aHIgfHwgbnVsbFxuXG4gICAgaWYgKCF4aHIpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuY29ycyB8fCBvcHRpb25zLnVzZVhEUikge1xuICAgICAgICAgICAgeGhyID0gbmV3IGNyZWF0ZVhIUi5YRG9tYWluUmVxdWVzdCgpXG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgeGhyID0gbmV3IGNyZWF0ZVhIUi5YTUxIdHRwUmVxdWVzdCgpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIga2V5XG4gICAgdmFyIGFib3J0ZWRcbiAgICB2YXIgdXJpID0geGhyLnVybCA9IG9wdGlvbnMudXJpIHx8IG9wdGlvbnMudXJsXG4gICAgdmFyIG1ldGhvZCA9IHhoci5tZXRob2QgPSBvcHRpb25zLm1ldGhvZCB8fCBcIkdFVFwiXG4gICAgdmFyIGJvZHkgPSBvcHRpb25zLmJvZHkgfHwgb3B0aW9ucy5kYXRhIHx8IG51bGxcbiAgICB2YXIgaGVhZGVycyA9IHhoci5oZWFkZXJzID0gb3B0aW9ucy5oZWFkZXJzIHx8IHt9XG4gICAgdmFyIHN5bmMgPSAhIW9wdGlvbnMuc3luY1xuICAgIHZhciBpc0pzb24gPSBmYWxzZVxuICAgIHZhciB0aW1lb3V0VGltZXJcblxuICAgIGlmIChcImpzb25cIiBpbiBvcHRpb25zKSB7XG4gICAgICAgIGlzSnNvbiA9IHRydWVcbiAgICAgICAgaGVhZGVyc1tcImFjY2VwdFwiXSB8fCBoZWFkZXJzW1wiQWNjZXB0XCJdIHx8IChoZWFkZXJzW1wiQWNjZXB0XCJdID0gXCJhcHBsaWNhdGlvbi9qc29uXCIpIC8vRG9uJ3Qgb3ZlcnJpZGUgZXhpc3RpbmcgYWNjZXB0IGhlYWRlciBkZWNsYXJlZCBieSB1c2VyXG4gICAgICAgIGlmIChtZXRob2QgIT09IFwiR0VUXCIgJiYgbWV0aG9kICE9PSBcIkhFQURcIikge1xuICAgICAgICAgICAgaGVhZGVyc1tcImNvbnRlbnQtdHlwZVwiXSB8fCBoZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdIHx8IChoZWFkZXJzW1wiQ29udGVudC1UeXBlXCJdID0gXCJhcHBsaWNhdGlvbi9qc29uXCIpIC8vRG9uJ3Qgb3ZlcnJpZGUgZXhpc3RpbmcgYWNjZXB0IGhlYWRlciBkZWNsYXJlZCBieSB1c2VyXG4gICAgICAgICAgICBib2R5ID0gSlNPTi5zdHJpbmdpZnkob3B0aW9ucy5qc29uKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IHJlYWR5c3RhdGVjaGFuZ2VcbiAgICB4aHIub25sb2FkID0gbG9hZEZ1bmNcbiAgICB4aHIub25lcnJvciA9IGVycm9yRnVuY1xuICAgIC8vIElFOSBtdXN0IGhhdmUgb25wcm9ncmVzcyBiZSBzZXQgdG8gYSB1bmlxdWUgZnVuY3Rpb24uXG4gICAgeGhyLm9ucHJvZ3Jlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIElFIG11c3QgZGllXG4gICAgfVxuICAgIHhoci5vbnRpbWVvdXQgPSBlcnJvckZ1bmNcbiAgICB4aHIub3BlbihtZXRob2QsIHVyaSwgIXN5bmMsIG9wdGlvbnMudXNlcm5hbWUsIG9wdGlvbnMucGFzc3dvcmQpXG4gICAgLy9oYXMgdG8gYmUgYWZ0ZXIgb3BlblxuICAgIGlmKCFzeW5jKSB7XG4gICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSAhIW9wdGlvbnMud2l0aENyZWRlbnRpYWxzXG4gICAgfVxuICAgIC8vIENhbm5vdCBzZXQgdGltZW91dCB3aXRoIHN5bmMgcmVxdWVzdFxuICAgIC8vIG5vdCBzZXR0aW5nIHRpbWVvdXQgb24gdGhlIHhociBvYmplY3QsIGJlY2F1c2Ugb2Ygb2xkIHdlYmtpdHMgZXRjLiBub3QgaGFuZGxpbmcgdGhhdCBjb3JyZWN0bHlcbiAgICAvLyBib3RoIG5wbSdzIHJlcXVlc3QgYW5kIGpxdWVyeSAxLnggdXNlIHRoaXMga2luZCBvZiB0aW1lb3V0LCBzbyB0aGlzIGlzIGJlaW5nIGNvbnNpc3RlbnRcbiAgICBpZiAoIXN5bmMgJiYgb3B0aW9ucy50aW1lb3V0ID4gMCApIHtcbiAgICAgICAgdGltZW91dFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgYWJvcnRlZD10cnVlLy9JRTkgbWF5IHN0aWxsIGNhbGwgcmVhZHlzdGF0ZWNoYW5nZVxuICAgICAgICAgICAgeGhyLmFib3J0KFwidGltZW91dFwiKVxuICAgICAgICAgICAgdmFyIGUgPSBuZXcgRXJyb3IoXCJYTUxIdHRwUmVxdWVzdCB0aW1lb3V0XCIpXG4gICAgICAgICAgICBlLmNvZGUgPSBcIkVUSU1FRE9VVFwiXG4gICAgICAgICAgICBlcnJvckZ1bmMoZSlcbiAgICAgICAgfSwgb3B0aW9ucy50aW1lb3V0IClcbiAgICB9XG5cbiAgICBpZiAoeGhyLnNldFJlcXVlc3RIZWFkZXIpIHtcbiAgICAgICAgZm9yKGtleSBpbiBoZWFkZXJzKXtcbiAgICAgICAgICAgIGlmKGhlYWRlcnMuaGFzT3duUHJvcGVydHkoa2V5KSl7XG4gICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoa2V5LCBoZWFkZXJzW2tleV0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMuaGVhZGVycyAmJiAhaXNFbXB0eShvcHRpb25zLmhlYWRlcnMpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkhlYWRlcnMgY2Fubm90IGJlIHNldCBvbiBhbiBYRG9tYWluUmVxdWVzdCBvYmplY3RcIilcbiAgICB9XG5cbiAgICBpZiAoXCJyZXNwb25zZVR5cGVcIiBpbiBvcHRpb25zKSB7XG4gICAgICAgIHhoci5yZXNwb25zZVR5cGUgPSBvcHRpb25zLnJlc3BvbnNlVHlwZVxuICAgIH1cblxuICAgIGlmIChcImJlZm9yZVNlbmRcIiBpbiBvcHRpb25zICYmXG4gICAgICAgIHR5cGVvZiBvcHRpb25zLmJlZm9yZVNlbmQgPT09IFwiZnVuY3Rpb25cIlxuICAgICkge1xuICAgICAgICBvcHRpb25zLmJlZm9yZVNlbmQoeGhyKVxuICAgIH1cblxuICAgIHhoci5zZW5kKGJvZHkpXG5cbiAgICByZXR1cm4geGhyXG5cblxufVxuXG5mdW5jdGlvbiBnZXRYbWwoeGhyKSB7XG4gICAgaWYgKHhoci5yZXNwb25zZVR5cGUgPT09IFwiZG9jdW1lbnRcIikge1xuICAgICAgICByZXR1cm4geGhyLnJlc3BvbnNlWE1MXG4gICAgfVxuICAgIHZhciBmaXJlZm94QnVnVGFrZW5FZmZlY3QgPSB4aHIuc3RhdHVzID09PSAyMDQgJiYgeGhyLnJlc3BvbnNlWE1MICYmIHhoci5yZXNwb25zZVhNTC5kb2N1bWVudEVsZW1lbnQubm9kZU5hbWUgPT09IFwicGFyc2VyZXJyb3JcIlxuICAgIGlmICh4aHIucmVzcG9uc2VUeXBlID09PSBcIlwiICYmICFmaXJlZm94QnVnVGFrZW5FZmZlY3QpIHtcbiAgICAgICAgcmV0dXJuIHhoci5yZXNwb25zZVhNTFxuICAgIH1cblxuICAgIHJldHVybiBudWxsXG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuIiwibW9kdWxlLmV4cG9ydHMgPSBleHRlbmRcblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gZXh0ZW5kKCkge1xuICAgIHZhciB0YXJnZXQgPSB7fVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXVxuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXRcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kXG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIGV4dGVuZCh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldXG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldFxufVxuIiwidmFyIGJlbCA9IHJlcXVpcmUoJ2JlbCcpIC8vIHR1cm5zIHRlbXBsYXRlIHRhZyBpbnRvIERPTSBlbGVtZW50c1xudmFyIG1vcnBoZG9tID0gcmVxdWlyZSgnbW9ycGhkb20nKSAvLyBlZmZpY2llbnRseSBkaWZmcyArIG1vcnBocyB0d28gRE9NIGVsZW1lbnRzXG52YXIgZGVmYXVsdEV2ZW50cyA9IHJlcXVpcmUoJy4vdXBkYXRlLWV2ZW50cy5qcycpIC8vIGRlZmF1bHQgZXZlbnRzIHRvIGJlIGNvcGllZCB3aGVuIGRvbSBlbGVtZW50cyB1cGRhdGVcblxubW9kdWxlLmV4cG9ydHMgPSBiZWxcblxuLy8gVE9ETyBtb3ZlIHRoaXMgKyBkZWZhdWx0RXZlbnRzIHRvIGEgbmV3IG1vZHVsZSBvbmNlIHdlIHJlY2VpdmUgbW9yZSBmZWVkYmFja1xubW9kdWxlLmV4cG9ydHMudXBkYXRlID0gZnVuY3Rpb24gKGZyb21Ob2RlLCB0b05vZGUsIG9wdHMpIHtcbiAgaWYgKCFvcHRzKSBvcHRzID0ge31cbiAgaWYgKG9wdHMuZXZlbnRzICE9PSBmYWxzZSkge1xuICAgIGlmICghb3B0cy5vbkJlZm9yZUVsVXBkYXRlZCkgb3B0cy5vbkJlZm9yZUVsVXBkYXRlZCA9IGNvcGllclxuICB9XG5cbiAgcmV0dXJuIG1vcnBoZG9tKGZyb21Ob2RlLCB0b05vZGUsIG9wdHMpXG5cbiAgLy8gbW9ycGhkb20gb25seSBjb3BpZXMgYXR0cmlidXRlcy4gd2UgZGVjaWRlZCB3ZSBhbHNvIHdhbnRlZCB0byBjb3B5IGV2ZW50c1xuICAvLyB0aGF0IGNhbiBiZSBzZXQgdmlhIGF0dHJpYnV0ZXNcbiAgZnVuY3Rpb24gY29waWVyIChmLCB0KSB7XG4gICAgLy8gY29weSBldmVudHM6XG4gICAgdmFyIGV2ZW50cyA9IG9wdHMuZXZlbnRzIHx8IGRlZmF1bHRFdmVudHNcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGV2ID0gZXZlbnRzW2ldXG4gICAgICBpZiAodFtldl0pIHsgLy8gaWYgbmV3IGVsZW1lbnQgaGFzIGEgd2hpdGVsaXN0ZWQgYXR0cmlidXRlXG4gICAgICAgIGZbZXZdID0gdFtldl0gLy8gdXBkYXRlIGV4aXN0aW5nIGVsZW1lbnRcbiAgICAgIH0gZWxzZSBpZiAoZltldl0pIHsgLy8gaWYgZXhpc3RpbmcgZWxlbWVudCBoYXMgaXQgYW5kIG5ldyBvbmUgZG9lc250XG4gICAgICAgIGZbZXZdID0gdW5kZWZpbmVkIC8vIHJlbW92ZSBpdCBmcm9tIGV4aXN0aW5nIGVsZW1lbnRcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gY29weSB2YWx1ZXMgZm9yIGZvcm0gZWxlbWVudHNcbiAgICBpZiAoKGYubm9kZU5hbWUgPT09ICdJTlBVVCcgJiYgZi50eXBlICE9PSAnZmlsZScpIHx8IGYubm9kZU5hbWUgPT09ICdTRUxFQ1QnKSB7XG4gICAgICBpZiAodC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgPT09IG51bGwpIHQudmFsdWUgPSBmLnZhbHVlXG4gICAgfSBlbHNlIGlmIChmLm5vZGVOYW1lID09PSAnVEVYVEFSRUEnKSB7XG4gICAgICBpZiAodC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgPT09IG51bGwpIGYudmFsdWUgPSB0LnZhbHVlXG4gICAgfVxuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAgLy8gYXR0cmlidXRlIGV2ZW50cyAoY2FuIGJlIHNldCB3aXRoIGF0dHJpYnV0ZXMpXG4gICdvbmNsaWNrJyxcbiAgJ29uZGJsY2xpY2snLFxuICAnb25tb3VzZWRvd24nLFxuICAnb25tb3VzZXVwJyxcbiAgJ29ubW91c2VvdmVyJyxcbiAgJ29ubW91c2Vtb3ZlJyxcbiAgJ29ubW91c2VvdXQnLFxuICAnb25kcmFnc3RhcnQnLFxuICAnb25kcmFnJyxcbiAgJ29uZHJhZ2VudGVyJyxcbiAgJ29uZHJhZ2xlYXZlJyxcbiAgJ29uZHJhZ292ZXInLFxuICAnb25kcm9wJyxcbiAgJ29uZHJhZ2VuZCcsXG4gICdvbmtleWRvd24nLFxuICAnb25rZXlwcmVzcycsXG4gICdvbmtleXVwJyxcbiAgJ29udW5sb2FkJyxcbiAgJ29uYWJvcnQnLFxuICAnb25lcnJvcicsXG4gICdvbnJlc2l6ZScsXG4gICdvbnNjcm9sbCcsXG4gICdvbnNlbGVjdCcsXG4gICdvbmNoYW5nZScsXG4gICdvbnN1Ym1pdCcsXG4gICdvbnJlc2V0JyxcbiAgJ29uZm9jdXMnLFxuICAnb25ibHVyJyxcbiAgJ29uaW5wdXQnLFxuICAvLyBvdGhlciBjb21tb24gZXZlbnRzXG4gICdvbmNvbnRleHRtZW51JyxcbiAgJ29uZm9jdXNpbicsXG4gICdvbmZvY3Vzb3V0J1xuXVxuIiwiaW1wb3J0IGNob28gZnJvbSAnY2hvbydcbmltcG9ydCBmYXN0Y2xpY2sgZnJvbSAnZmFzdGNsaWNrJ1xuaW1wb3J0IGxvZyBmcm9tICdjaG9vLWxvZydcbmltcG9ydCBhcGlNb2RlbCBmcm9tICd+L21vZGVscy9hcGknXG5pbXBvcnQgYXBwTW9kZWwgZnJvbSAnfi9tb2RlbHMvYXBwJ1xuaW1wb3J0IGdhbWVNb2RlbCBmcm9tICd+L21vZGVscy9nYW1lJ1xuaW1wb3J0IHdlbGNvbWVQYWdlIGZyb20gJ34vcGFnZXMvd2VsY29tZSdcbmltcG9ydCBpbmdhbWVQYWdlIGZyb20gJ34vcGFnZXMvaW5nYW1lJ1xuXG5jb25zdCBhcHAgPSBjaG9vKClcbmFwcC51c2UobG9nKCkpXG5cbmFwcC5tb2RlbChhcGlNb2RlbClcbmFwcC5tb2RlbChhcHBNb2RlbClcbmFwcC5tb2RlbChnYW1lTW9kZWwpXG5cbi8vIFRPRE86IHdhaXQgZm9yIGNob28gdG8gbWFrZSBoYXNoIHJvdXRpbmcgcmVhbGx5IHdvcmtcbmFwcC5yb3V0ZXIocm91dGUgPT4gW1xuICByb3V0ZSgnLycsIHdlbGNvbWVQYWdlKSxcbiAgcm91dGUoJy9pbmdhbWUnLCBpbmdhbWVQYWdlKVxuXSlcblxuY29uc3QgdHJlZSA9IGFwcC5zdGFydCgpXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRyZWUpXG5mYXN0Y2xpY2soZG9jdW1lbnQuYm9keSlcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZGV2aWNlcmVhZHknLCAoKSA9PiB7XG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2JhY2tidXR0b24nLCAoKSA9PiB7XG4gICAgaGlzdG9yeS5iYWNrKClcbiAgfSlcbn0pXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXJJZihjb25kaXRpb24sIHN0YXRlLCByZW5kZXJlcikge1xuICByZXR1cm4gKGNvbmRpdGlvbiA/IHJlbmRlcmVyKHN0YXRlKSA6ICcnKVxufVxuIiwiaW1wb3J0IGNoYW1waW9ucyBmcm9tICdsb2wtY2hhbXBpb25zJ1xuaW1wb3J0IHNwZWxscyBmcm9tICdsb2wtc3BlbGxzJ1xuaW1wb3J0IHN0b3JlIGZyb20gJ3N0b3JlJ1xuaW1wb3J0IHVuaXF1ZWlkIGZyb20gJ3VuaXF1ZWlkJ1xuaW1wb3J0IHhociBmcm9tICd4aHInXG5pbXBvcnQgeHRlbmQgZnJvbSAneHRlbmQnXG5cbmNvbnN0IHByb3h5VXJsID0gJ2h0dHBzOi8vd3QtbmdyeW1hbi1nbWFpbF9jb20tMC5ydW4ud2VidGFzay5pby9yaW90LXByb3h5J1xuXG5jb25zdCBlbmRwb2ludCA9IChuYW1lKSA9PiB7XG4gIGNvbnN0IHJlZ2lvbiA9IHN0b3JlLmdldCgnYXBwOnJlZ2lvbicpXG4gIHN3aXRjaCAobmFtZSkge1xuICAgIGNhc2UgJ3N1bW1vbmVyJzpcbiAgICAgIHJldHVybiBgL2FwaS9sb2wvJHtyZWdpb259L3YxLjQvc3VtbW9uZXIvYnktbmFtZWBcbiAgICBjYXNlICdlbm5lbWllcyc6XG4gICAgICByZXR1cm4gYC9vYnNlcnZlci1tb2RlL3Jlc3QvY29uc3VtZXIvZ2V0U3BlY3RhdG9yR2FtZUluZm8vJHtyZWdpb259MWBcbiAgfVxufVxuXG5jb25zdCB1aWQgPSB1bmlxdWVpZCgpXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZXNwYWNlOiAnYXBpJyxcbiAgZWZmZWN0czoge1xuICAgIHJlcXVlc3Q6ICh1cmwsIHN0YXRlLCBzZW5kLCBkb25lKSA9PiB7XG4gICAgICByZXR1cm4geGhyKGAke3Byb3h5VXJsfT91cmw9JHt1cmx9YCwgeyBqc29uOiB0cnVlIH0sXG4gICAgICAoZXJyLCByZXMsIGJvZHkpID0+IHtcbiAgICAgICAgaWYgKG51bGwgPT0gYm9keS5zdGF0dXMpIHtcbiAgICAgICAgICBkb25lKG51bGwsIGJvZHkpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZG9uZShib2R5LnN0YXR1cy5zdGF0dXNfY29kZSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIHN1bW1vbmVyOiAobmFtZSwgc3RhdGUsIHNlbmQsIGRvbmUpID0+IHtcbiAgICAgIGNvbnN0IHN1bW1vbmVyID0gc3RvcmUuZ2V0KCdhcGk6c3VtbW9uZXInKVxuICAgICAgaWYgKG51bGwgIT0gc3VtbW9uZXIgJiYgc3VtbW9uZXIubmFtZSA9PT0gbmFtZSlcbiAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgc3VtbW9uZXIpXG5cbiAgICAgIHNlbmQoJ2FwaTpyZXF1ZXN0JywgYCR7ZW5kcG9pbnQoJ3N1bW1vbmVyJyl9LyR7bmFtZX1gLFxuICAgICAgKGVyciwgYm9keSkgPT4ge1xuICAgICAgICBpZiAoZXJyID4gNDAwKVxuICAgICAgICAgIHJldHVybiBkb25lKCdVbmtub3duIHN1bW1vbmVyJylcblxuICAgICAgICBjb25zdCBzdW1tb25lciA9IGJvZHlbbmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyAvZywgJycpXVxuICAgICAgICBpZiAoIXN1bW1vbmVyKVxuICAgICAgICAgIHJldHVybiBkb25lKCdObyBzdW1tb25lciBmb3VuZCcpXG5cbiAgICAgICAgc3RvcmUuc2V0KCdhcGk6c3VtbW9uZXInLCBzdW1tb25lcilcblxuICAgICAgICBkb25lKG51bGwsIHN1bW1vbmVyKVxuICAgICAgfSlcbiAgICB9LFxuICAgIGVubmVtaWVzOiAoc3VtbW9uZXIsIHN0YXRlLCBzZW5kLCBkb25lKSA9PiB7XG4gICAgICBzZW5kKCdhcGk6cmVxdWVzdCcsIGAke2VuZHBvaW50KCdlbm5lbWllcycpfS8ke3N1bW1vbmVyLmlkfWAsXG4gICAgICAoZXJyLCBib2R5KSA9PiB7XG4gICAgICAgIGlmIChlcnIgPiA0MDApXG4gICAgICAgICAgcmV0dXJuIGRvbmUoJ05vIGxpdmUgZ2FtZSBmb3VuZCcpXG5cbiAgICAgICAgaWYgKCdDTEFTU0lDJyAhPT0gYm9keS5nYW1lTW9kZSB8fCAnTUFUQ0hFRF9HQU1FJyAhPT0gYm9keS5nYW1lVHlwZSlcbiAgICAgICAgICByZXR1cm4gZG9uZSgnR2FtZSBtb2RlIG5vdCBzdXBwb3J0ZWQnKVxuXG4gICAgICAgIGNvbnN0IHsgcGFydGljaXBhbnRzIH0gPSBib2R5XG5cbiAgICAgICAgY29uc3Qgc3VtbW9uZXJUZWFtID0gcGFydGljaXBhbnRzXG4gICAgICAgICAgLmZpbmQocGFydGljaXBhbnQgPT4gc3VtbW9uZXIubmFtZSA9PT0gcGFydGljaXBhbnQuc3VtbW9uZXJOYW1lKVxuICAgICAgICAgIC50ZWFtSWRcblxuICAgICAgICBjb25zdCBlbm5lbWllcyA9IHBhcnRpY2lwYW50c1xuICAgICAgICAgIC5maWx0ZXIocGFydGljaXBhbnQgPT4gcGFydGljaXBhbnQudGVhbUlkICE9PSBzdW1tb25lclRlYW0pXG4gICAgICAgICAgLm1hcChwYXJ0aWNpcGFudCA9PiAoe1xuICAgICAgICAgICAgbmFtZTogcGFydGljaXBhbnQuc3VtbW9uZXJOYW1lLFxuICAgICAgICAgICAgY2hhbXBpb246IGNyZWF0ZUNoYW1waW9uKHBhcnRpY2lwYW50LmNoYW1waW9uSWQpLFxuICAgICAgICAgICAgc3BlbGxzOiBbXG4gICAgICAgICAgICAgIGNyZWF0ZVNwZWxsKHBhcnRpY2lwYW50LnNwZWxsMUlkKSxcbiAgICAgICAgICAgICAgY3JlYXRlU3BlbGwocGFydGljaXBhbnQuc3BlbGwySWQpXG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSkpXG5cbiAgICAgICAgZG9uZShudWxsLCBlbm5lbWllcylcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNoYW1waW9uKGlkKSB7XG4gIHJldHVybiBjaGFtcGlvbnMuZmluZChjID0+IGMua2V5ID09PSBTdHJpbmcoaWQpKVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTcGVsbChpZCkge1xuICBjb25zdCBzcGVsbCA9IHNwZWxscy5maW5kKHMgPT4gcy5rZXkgPT09IFN0cmluZyhpZCkpXG4gIHJldHVybiB4dGVuZCh7fSwgc3BlbGwsIHtcbiAgICB1aWQ6IHVpZCgpLFxuICAgIHN0YXRlOiAnYXZhaWxhYmxlJyxcbiAgICBjb29sZG93bjogMCxcbiAgICByZWZDb29sZG93bjogc3BlbGwuY29vbGRvd25cbiAgfSlcbn1cbiIsImltcG9ydCBzdG9yZSBmcm9tICdzdG9yZSdcbmltcG9ydCB4dGVuZCBmcm9tICd4dGVuZCdcblxubGV0IGVyclRpbWVvdXRJZFxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWVzcGFjZTogJ2FwcCcsXG4gIHN0YXRlOiB7XG4gICAgdGl0bGU6ICc8ZW0+Tm88L2VtPiBGbGFzaCcsXG4gICAgdGFnbGluZTogJ1RyYWNrIHN1bW1vbmVyIHNwZWxscycsXG4gICAgbG9hZGluZzogZmFsc2UsXG4gICAgZXJyb3I6ICcnLFxuICAgIHN1bW1vbmVyOiBzdG9yZS5nZXQoJ2FwcDpzdW1tb25lcicpIHx8ICcnLFxuICAgIHJlZ2lvbjogc3RvcmUuZ2V0KCdhcHA6cmVnaW9uJykgfHwgJydcbiAgfSxcbiAgZWZmZWN0czoge1xuICAgIHN1bW1vbmVyOiAoc3VtbW9uZXIsIHN0YXRlLCBzZW5kLCBkb25lKSA9PiB7XG4gICAgICBzdG9yZS5zZXQoJ2FwcDpzdW1tb25lcicsIHN1bW1vbmVyKVxuICAgICAgc2VuZCgnYXBwOnNldCcsIHsgc3VtbW9uZXIgfSwgZG9uZSlcbiAgICB9LFxuICAgIHJlZ2lvbjogKHJlZ2lvbiwgc3RhdGUsIHNlbmQsIGRvbmUpID0+IHtcbiAgICAgIHN0b3JlLnNldCgnYXBwOnJlZ2lvbicsIHJlZ2lvbilcbiAgICAgIHNlbmQoJ2FwcDpzZXQnLCB7IHJlZ2lvbiB9LCBkb25lKVxuICAgIH0sXG4gICAgbG9hZGluZzogKGRhdGEsIHN0YXRlLCBzZW5kLCBkb25lKSA9PiB7XG4gICAgICBzZW5kKCdhcHA6c2V0JywgeyBlcnJvcjogJycsIGxvYWRpbmc6IHRydWUgfSwgZG9uZSlcbiAgICB9LFxuICAgIGVycm9yOiAoZGF0YSwgc3RhdGUsIHNlbmQsIGRvbmUpID0+IHtcbiAgICAgIHNlbmQoJ2FwcDpzZXQnLCB7IGVycm9yOiBkYXRhLmVyciwgbG9hZGluZzogZmFsc2UgfSwgZG9uZSlcblxuICAgICAgY2xlYXJUaW1lb3V0KGVyclRpbWVvdXRJZClcbiAgICAgIGVyclRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzZW5kKCdhcHA6c2V0JywgeyBlcnJvcjogJycsIGxvYWRpbmc6IGZhbHNlIH0sIGRvbmUpXG4gICAgICB9LCAzMDAwKVxuICAgIH0sXG4gICAgY2xlYXI6IChkYXRhLCBzdGF0ZSwgc2VuZCwgZG9uZSkgPT4ge1xuICAgICAgc2VuZCgnYXBwOnNldCcsIHsgZXJyb3I6ICcnLCBsb2FkaW5nOiBmYWxzZSB9LCBkb25lKVxuICAgIH1cbiAgfSxcbiAgcmVkdWNlcnM6IHtcbiAgICBzZXQ6IChkYXRhLCBzdGF0ZSkgPT4geHRlbmQoc3RhdGUsIGRhdGEpXG4gIH1cbn1cbiIsImltcG9ydCB4dGVuZCBmcm9tICd4dGVuZCdcblxubGV0IG51bUNvb2xkb3ducyA9IDBcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lc3BhY2U6ICdnYW1lJyxcbiAgc3RhdGU6IHtcbiAgICBlbm5lbWllczogW11cbiAgfSxcbiAgZWZmZWN0czoge1xuICAgIGZldGNoOiAobmFtZSwgc3RhdGUsIHNlbmQsIGRvbmUpID0+IHtcbiAgICAgIHNlbmQoJ2FwcDpsb2FkaW5nJywgKCkgPT4ge1xuICAgICAgICBzZW5kKCdhcGk6c3VtbW9uZXInLCBuYW1lLCAoZXJyLCBzdW1tb25lcikgPT4ge1xuICAgICAgICAgIGlmIChlcnIpIHJldHVybiBzZW5kKCdhcHA6ZXJyb3InLCB7IGVyciB9LCBkb25lKVxuXG4gICAgICAgICAgc2VuZCgnYXBpOmVubmVtaWVzJywgc3VtbW9uZXIsIChlcnIsIGVubmVtaWVzKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gc2VuZCgnYXBwOmVycm9yJywgeyBlcnIgfSwgZG9uZSlcblxuICAgICAgICAgICAgc2VuZCgnZ2FtZTplbm5lbWllcycsIGVubmVtaWVzLCAoKSA9PiB7XG4gICAgICAgICAgICAgIHNlbmQoJ2FwcDpjbGVhcicsICgpID0+IHtcbiAgICAgICAgICAgICAgICBzZW5kKCdsb2NhdGlvbjpzZXRMb2NhdGlvbicsIHsgbG9jYXRpb246ICcvaW5nYW1lJyB9LCBkb25lKVxuICAgICAgICAgICAgICAgIGhpc3RvcnkucHVzaFN0YXRlKHt9LCBudWxsLCAnL2luZ2FtZScpXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIH0sXG4gICAgY29vbGRvd246IChzcGVsbCwgc3RhdGUsIHNlbmQsIGRvbmUpID0+IHtcbiAgICAgIGlmICgnY29vbGRvd24nICE9PSBzcGVsbC5zdGF0ZSkge1xuICAgICAgICBudW1Db29sZG93bnMrK1xuICAgICAgICBzZW5kKCdnYW1lOnN0YXJ0Q29vbGRvd24nLCBzcGVsbC51aWQsIGRvbmUpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgc2VuZCgnZ2FtZTpkZWNyZW1lbnRDb29sZG93bicsIHsgdWlkOiBzcGVsbC51aWQsIGFtb3VudDogMTAgfSwgZG9uZSlcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIHJlZHVjZXJzOiB7XG4gICAgZW5uZW1pZXM6IChlbm5lbWllcywgc3RhdGUpID0+ICh7IGVubmVtaWVzIH0pLFxuICAgIHN0YXJ0Q29vbGRvd246ICh1aWQsIHN0YXRlKSA9PiAoe1xuICAgICAgZW5uZW1pZXM6IHN0YXRlLmVubmVtaWVzLm1hcChlbm5lbXkgPT4geHRlbmQoZW5uZW15LCB7XG4gICAgICAgIHNwZWxsczogZW5uZW15LnNwZWxscy5tYXAoc3BlbGwgPT4ge1xuICAgICAgICAgIGlmIChzcGVsbC51aWQgPT09IHVpZCkge1xuICAgICAgICAgICAgcmV0dXJuIHh0ZW5kKHt9LCBzcGVsbCwge1xuICAgICAgICAgICAgICBzdGF0ZTogJ2Nvb2xkb3duJyxcbiAgICAgICAgICAgICAgY29vbGRvd246IHNwZWxsLnJlZkNvb2xkb3duIC0gMVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc3BlbGxcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICB9KSlcbiAgICB9KSxcbiAgICBkZWNyZW1lbnRDb29sZG93bjogKGRhdGEsIHN0YXRlKSA9PiAoe1xuICAgICAgZW5uZW1pZXM6IHN0YXRlLmVubmVtaWVzLm1hcChlbm5lbXkgPT4geHRlbmQoZW5uZW15LCB7XG4gICAgICAgIHNwZWxsczogZW5uZW15LnNwZWxscy5tYXAoc3BlbGwgPT4ge1xuICAgICAgICAgIGlmICgnY29vbGRvd24nICE9PSBzcGVsbC5zdGF0ZSkgcmV0dXJuIHNwZWxsXG4gICAgICAgICAgaWYgKGRhdGEudWlkICYmIHNwZWxsLnVpZCAhPT0gZGF0YS51aWQpIHJldHVybiBzcGVsbFxuXG4gICAgICAgICAgY29uc3QgbmV3U3BlbGwgPSB4dGVuZCh7fSwgc3BlbGwsIHtcbiAgICAgICAgICAgIGNvb2xkb3duOiBzcGVsbC5jb29sZG93biAtIGRhdGEuYW1vdW50XG4gICAgICAgICAgfSlcblxuICAgICAgICAgIGlmIChuZXdTcGVsbC5jb29sZG93biA8PSAwKSB7XG4gICAgICAgICAgICBuZXdTcGVsbC5jb29sZG93biA9IDBcbiAgICAgICAgICAgIG5ld1NwZWxsLnN0YXRlID0gJ2F2YWlsYWJsZSdcbiAgICAgICAgICAgIG51bUNvb2xkb3ducy0tXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG5ld1NwZWxsXG4gICAgICAgIH0pXG4gICAgICB9KSlcbiAgICB9KSxcbiAgICB0b2dnbGVGb2N1czogKGRhdGEsIHN0YXRlKSA9PiAoe1xuICAgICAgZW5uZW1pZXM6IHN0YXRlLmVubmVtaWVzLm1hcChlbm5lbXkgPT4ge1xuICAgICAgICBpZiAoZW5uZW15Lm5hbWUgPT09IGRhdGEubmFtZSkge1xuICAgICAgICAgIHJldHVybiB4dGVuZCh7fSwgZW5uZW15LCB7IGZvY3VzZWQ6ICFlbm5lbXkuZm9jdXNlZCB9KVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJldHVybiBlbm5lbXlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuICB9LFxuICBzdWJzY3JpcHRpb25zOiB7XG4gICAgdGljazogKHNlbmQsIGRvbmUpID0+IHtcbiAgICAgIHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgaWYgKDAgIT09IG51bUNvb2xkb3ducykge1xuICAgICAgICAgIHNlbmQoJ2dhbWU6ZGVjcmVtZW50Q29vbGRvd24nLCB7IGFtb3VudDogMSB9LCBkb25lKVxuICAgICAgICB9XG4gICAgICB9LCAxMDAwKVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IGh0bWwgZnJvbSAnY2hvby9odG1sJ1xuaW1wb3J0IGVubmVteUxpc3QgZnJvbSAnfi92aWV3cy9lbm5lbXktbGlzdCdcblxuZXhwb3J0IGRlZmF1bHQgKHN0YXRlLCBwcmV2LCBzZW5kKSA9PiBodG1sYFxuICA8bWFpbiBjbGFzcz1cImluZ2FtZS1wYWdlXCI+XG4gICAgJHtlbm5lbXlMaXN0KHN0YXRlLmdhbWUsIHByZXYsIHNlbmQpfVxuICA8L21haW4+XG5gXG4iLCJpbXBvcnQgaHRtbCBmcm9tICdjaG9vL2h0bWwnXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJ1xuaW1wb3J0IHJlbmRlcklmIGZyb20gJ34vbGliL3JlbmRlci1pZidcblxuY29uc3QgcmVnaW9ucyA9IFtcbiAgJ0JSJywgJ0VVTkUnLCAnRVVXJywgJ0pQJywgJ0tSJywgJ0xBTicsICdMQVMnLCAnTkEnLCAnT0NFJywgJ1BCRScsICdSVScsICdUUidcbl1cblxuY29uc3QgaGFuZGxlU3VibWl0ID0gKGUsIHN0YXRlLCBzZW5kKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKVxuXG4gIGlmIChzdGF0ZS5hcHAuc3VtbW9uZXIpIHtcbiAgICBzZW5kKCdnYW1lOmZldGNoJywgc3RhdGUuYXBwLnN1bW1vbmVyKVxuICB9XG4gIGVsc2Uge1xuICAgIHNlbmQoJ2FwcDplcnJvcicsICdFbXB0eSBzdW1tb25lciBuYW1lJylcbiAgfVxufVxuXG5jb25zdCBoYW5kbGVJbnB1dCA9IChlLCBzdGF0ZSwgc2VuZCkgPT4ge1xuICBzZW5kKCdhcHA6c3VtbW9uZXInLCBlLnRhcmdldC52YWx1ZSlcbn1cblxuY29uc3QgaGFuZGxlQ2hhbmdlID0gKGUsIHN0YXRlLCBzZW5kKSA9PiB7XG4gIHNlbmQoJ2FwcDpyZWdpb24nLCBlLnRhcmdldC52YWx1ZSlcbn1cblxuY29uc3QgY2xhc3NWYXJpYW50cyA9IChzdGF0ZSkgPT4gY2xhc3NuYW1lcyh7XG4gIFtgLWxvYWRpbmdgXTogc3RhdGUuYXBwLmxvYWRpbmdcbn0pXG5cbmNvbnN0IHJlbmRlclJlZ2lvbiA9IChyZWdpb24sIHN0YXRlKSA9PiBodG1sYFxuICA8b3B0aW9uICR7cmVnaW9uID09PSBzdGF0ZS5hcHAucmVnaW9uID8gJ3NlbGVjdGVkJyA6ICcnfT4ke3JlZ2lvbn08L29wdGlvbj5cbmBcblxuY29uc3QgcmVuZGVyRXJyb3IgPSAoZXJyb3IpID0+IGh0bWxgXG4gIDxkaXYgY2xhc3M9XCJlcnJvci1wYW5lXCI+JHtlcnJvcn08L2Rpdj5cbmBcblxuZXhwb3J0IGRlZmF1bHQgKHN0YXRlLCBwcmV2LCBzZW5kKSA9PiBodG1sYFxuICA8bWFpbiBjbGFzcz1cIndlbGNvbWUtcGFnZVwiPlxuICAgIDxkaXYgY2xhc3M9XCJ3ZWxjb21lLWhlYWRlclwiPlxuICAgICAgPGgxIGNsYXNzPVwidGl0bGVcIj48ZW0+Tm88L2VtPkZsYXNoPC9oMT5cbiAgICAgIDxibG9ja3F1b3RlIGNsYXNzPVwidGFnbGluZVwiPiR7c3RhdGUuYXBwLnRhZ2xpbmV9PC9ibG9ja3F1b3RlPlxuICAgIDwvZGl2PlxuICAgIDxmb3JtIGNsYXNzPVwid2VsY29tZS1mb3JtICR7Y2xhc3NWYXJpYW50cyhzdGF0ZSl9XCJcbiAgICAgIG9uc3VibWl0PSR7ZSA9PiBoYW5kbGVTdWJtaXQoZSwgc3RhdGUsIHNlbmQpfX0+XG4gICAgICA8ZmllbGRzZXQgY2xhc3M9XCJmaWVsZHNldFwiPlxuICAgICAgICA8bGFiZWwgY2xhc3M9XCJsYWJlbFwiPlxuICAgICAgICAgIFN1bW1vbmVyIG5hbWVcbiAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgIGNsYXNzPVwiaW5wdXRcIlxuICAgICAgICAgICAgdmFsdWU9JHtzdGF0ZS5hcHAuc3VtbW9uZXJ9XG4gICAgICAgICAgICAke3N0YXRlLmFwcC5sb2FkaW5nID8gJ2Rpc2FibGVkJyA6ICcnfVxuICAgICAgICAgICAgb25pbnB1dD0ke2UgPT4gaGFuZGxlSW5wdXQoZSwgc3RhdGUsIHNlbmQpfSAvPlxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8c2VsZWN0IGNsYXNzPVwicmVnaW9uc1wiIG9uY2hhbmdlPSR7ZSA9PiBoYW5kbGVDaGFuZ2UoZSwgc3RhdGUsIHNlbmQpfT5cbiAgICAgICAgICAke3JlZ2lvbnMubWFwKHJlZ2lvbiA9PiByZW5kZXJSZWdpb24ocmVnaW9uLCBzdGF0ZSkpfVxuICAgICAgICA8L3NlbGVjdD5cbiAgICAgIDwvZmllbGRzZXQ+XG4gICAgICA8YnV0dG9uIGNsYXNzPVwic3VibWl0XCI+U3RhcnQ8L2J1dHRvbj5cbiAgICA8L2Zvcm0+XG4gICAgJHtyZW5kZXJJZihzdGF0ZS5hcHAuZXJyb3IsIHN0YXRlLmFwcC5lcnJvciwgcmVuZGVyRXJyb3IpfVxuICA8L21haW4+XG5gXG4iLCJpbXBvcnQgaHRtbCBmcm9tICdjaG9vL2h0bWwnXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJ1xuaW1wb3J0IGNsb3Nlc3QgZnJvbSAnY2xvc2VzdCdcbmltcG9ydCBzcGVsbExpc3QgZnJvbSAnLi9zcGVsbC1saXN0J1xuXG5jb25zdCBoYW5kbGVDbGljayA9IChlLCBlbm5lbXksIHNlbmQpID0+IHtcbiAgaWYgKG51bGwgPT0gY2xvc2VzdChlLnRhcmdldCwgJy5zcGVsbC1pdGVtJywgdHJ1ZSkpIHtcbiAgICBzZW5kKCdnYW1lOnRvZ2dsZUZvY3VzJywgZW5uZW15KVxuICB9XG59XG5cbmNvbnN0IGNsYXNzVmFyaWFudHMgPSAoZW5uZW15KSA9PiBjbGFzc25hbWVzKHtcbiAgW2AtZm9jdXNlZGBdOiBlbm5lbXkuZm9jdXNlZFxufSlcblxuZXhwb3J0IGRlZmF1bHQgKGVubmVteSwgcHJldiwgc2VuZCkgPT4gaHRtbGBcbiAgPGxpIGNsYXNzPVwiZW5uZW15LWl0ZW0gJHtjbGFzc1ZhcmlhbnRzKGVubmVteSl9XCJcbiAgICBvbmNsaWNrPSR7ZSA9PiBoYW5kbGVDbGljayhlLCBlbm5lbXksIHNlbmQpfT5cbiAgICA8ZGl2IGNsYXNzPVwiZW5uZW15LW1ldGFcIj5cbiAgICAgIDxoMiBjbGFzcz1cImNoYW1waW9uXCI+JHtlbm5lbXkuY2hhbXBpb24ubmFtZX08L2gyPlxuICAgIDwvZGl2PlxuICAgICR7c3BlbGxMaXN0KGVubmVteSwgcHJldiwgc2VuZCl9XG4gIDwvbGk+XG5gXG4iLCJpbXBvcnQgaHRtbCBmcm9tICdjaG9vL2h0bWwnXG5pbXBvcnQgY2xvc2VzdCBmcm9tICdjbG9zZXN0J1xuaW1wb3J0IGVubmVteUl0ZW0gZnJvbSAnLi9lbm5lbXktaXRlbSdcblxubGV0IGRyYWdJbmZvXG5cbmNvbnN0IGluZGV4T2YgPSAoZWwpID0+IEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoXG4gIGVsLnBhcmVudE5vZGUuY2hpbGROb2RlcywgZWwpXG5cbmNvbnN0IGhhbmRsZURyYWdTdGFydCA9IChlKSA9PiB7XG4gIGNvbnN0IGxpc3QgPSBjbG9zZXN0KGUudGFyZ2V0LCAnLmVubmVteS1saXN0JylcbiAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBoYW5kbGVEcmFnTW92ZSlcbiAgbGlzdC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgaGFuZGxlRHJhZ0VuZClcblxuICBjb25zdCBsaXN0SXRlbSA9IGNsb3Nlc3QoZS50YXJnZXQsICcuZW5uZW15LWl0ZW0nLCB0cnVlKVxuXG4gIGRyYWdJbmZvID0ge1xuICAgIGRyYWdnaW5nOiBmYWxzZSxcbiAgICBzdGFydDogZS5jbGllbnRZLFxuICAgIGluZGV4OiBpbmRleE9mKGxpc3RJdGVtKSxcbiAgICBsaXN0LFxuICAgIGxpc3RJdGVtXG4gIH1cbn1cblxuY29uc3QgaGFuZGxlRHJhZ01vdmUgPSAoZSkgPT4ge1xuICBjb25zdCB7IGxpc3QsIGxpc3RJdGVtIH0gPSBkcmFnSW5mb1xuXG4gIGlmICghZHJhZ0luZm8uZHJhZ2dpbmcgJiYgTWF0aC5hYnMoZS5jbGllbnRZIC0gZHJhZ0luZm8uc3RhcnQpID4gMTApIHtcbiAgICBsaXN0SXRlbS5jbGFzc0xpc3QuYWRkKCctZHJhZ2dpbmcnKVxuICAgIGRyYWdJbmZvLmRyYWdnaW5nID0gdHJ1ZVxuICB9XG5cbiAgaWYgKGRyYWdJbmZvLmRyYWdnaW5nKSB7XG4gICAgY29uc3QgaG92ZXJFbCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoZS5jbGllbnRYLCBlLmNsaWVudFkpXG4gICAgY29uc3QgaG92ZXJJdGVtID0gY2xvc2VzdChlLnRhcmdldCwgJy5lbm5lbXktaXRlbScsIHRydWUpXG5cbiAgICBpZiAobnVsbCAhPSBob3Zlckl0ZW0pIHtcbiAgICAgIGNvbnN0IGRlc3RJbmRleCA9IGluZGV4T2YoaG92ZXJJdGVtKVxuICAgICAgY29uc3QgZGVzdEl0ZW0gPSBob3Zlckl0ZW0ubmV4dEVsZW1lbnRTaWJsaW5nXG5cbiAgICAgIGlmIChkZXN0SW5kZXggIT09IGRyYWdJbmZvLmluZGV4KSB7XG4gICAgICAgIGxpc3QuaW5zZXJ0QmVmb3JlKGxpc3RJdGVtLCBkZXN0SXRlbSlcbiAgICAgICAgZHJhZ0luZm8uaW5kZXggPSBkZXN0SW5kZXhcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuY29uc3QgaGFuZGxlRHJhZ0VuZCA9IChlKSA9PiB7XG4gIGNvbnN0IHsgbGlzdCwgbGlzdEl0ZW0gfSA9IGRyYWdJbmZvXG5cbiAgbGlzdEl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnLWRyYWdnaW5nJylcbiAgbGlzdEl0ZW0uc3R5bGUudHJhbnNmb3JtID0gJydcblxuICBsaXN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGhhbmRsZURyYWdNb3ZlKVxuICBsaXN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBoYW5kbGVEcmFnRW5kKVxufVxuXG5leHBvcnQgZGVmYXVsdCAoZ2FtZSwgcHJldiwgc2VuZCkgPT4gaHRtbGBcbiAgPHVsIGNsYXNzPVwiZW5uZW15LWxpc3RcIj5cbiAgICAke2dhbWUuZW5uZW1pZXMubWFwKGVubmVteSA9PiBlbm5lbXlJdGVtKGVubmVteSwgcHJldiwgc2VuZCkpfVxuICA8L3VsPlxuYFxuIiwiaW1wb3J0IGh0bWwgZnJvbSAnY2hvby9odG1sJ1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcydcbmltcG9ydCByZW5kZXJJZiBmcm9tICd+L2xpYi9yZW5kZXItaWYnXG5cbmNvbnN0IGhhbmRsZUNsaWNrID0gKGUsIHNwZWxsLCBzZW5kKSA9PiB7XG4gIHNlbmQoJ2dhbWU6Y29vbGRvd24nLCBzcGVsbClcbn1cblxuY29uc3QgY2xhc3NWYXJpYW50cyA9IChzcGVsbCkgPT4gY2xhc3NuYW1lcyh7XG4gIFtgLSR7c3BlbGwuaWR9YF06IHRydWUsXG4gIFtgLSR7c3BlbGwuc3RhdGV9YF06IHRydWUsXG4gIFtgLXRpbWU2MGBdOiBzcGVsbC5jb29sZG93biA8PSA2MCAmJiBzcGVsbC5jb29sZG93biA+IDMwLFxuICBbYC10aW1lMzBgXTogc3BlbGwuY29vbGRvd24gPD0gMzAgJiYgc3BlbGwuY29vbGRvd24gPiAwXG59KVxuXG5jb25zdCBkcmF3Q29vbGRvd25QaWUgPSAoc3BlbGwpID0+IHtcbiAgY29uc3QgciA9IDUwXG4gIGNvbnN0IHQgPSAxIC0gc3BlbGwuY29vbGRvd24gLyBzcGVsbC5yZWZDb29sZG93blxuICBjb25zdCBhID0gdCAqIE1hdGguUEkgKiAyXG4gIGNvbnN0IG0gPSBhID4gTWF0aC5QSSA/IDEgOiAwXG4gIGNvbnN0IHggPSBNYXRoLnNpbihhKSAqIHJcbiAgY29uc3QgeSA9IE1hdGguY29zKGEpICogLXJcblxuICByZXR1cm4gaHRtbGBcbiAgICA8ZyB0cmFuc2Zvcm09JHtgdHJhbnNsYXRlKCR7cn0sICR7cn0pYH1cbiAgICAgIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIlxuICAgICAgdmVjdG9yLWVmZmVjdD1cIm5vbi1zY2FsaW5nLXN0cm9rZVwiPlxuICAgICAgPGNpcmNsZSBjbGFzcz1cInByb2dyZXNzLWJnXCIgY3g9XCIwXCIgY3k9XCIwXCIgcj1cIjUwXCIgLz5cbiAgICAgIDxwYXRoIGNsYXNzPVwicHJvZ3Jlc3NcIiBkPSR7YE0gMCAkey1yfSBBICR7cn0gJHtyfSAxICR7bX0gMSAke3h9ICR7eX1gfT48L3BhdGg+XG4gICAgPC9nPlxuICBgXG59XG5cbmNvbnN0IHJlbmRlckNvb2xkb3duID0gKHNwZWxsKSA9PiBodG1sYFxuICA8c3ZnIGNsYXNzPVwiY29vbGRvd25cIlxuICAgIHZpZXdCb3g9XCItNSAtNSAxMTAgMTEwXCI+XG4gICAgJHtkcmF3Q29vbGRvd25QaWUoc3BlbGwpfVxuICA8L3N2Zz5cbmBcblxuZXhwb3J0IGRlZmF1bHQgKHNwZWxsLCBwcmV2LCBzZW5kKSA9PiBodG1sYFxuICA8bGlcbiAgICBjbGFzcz1cInNwZWxsLWl0ZW0gJHtjbGFzc1ZhcmlhbnRzKHNwZWxsKX1cIlxuICAgIG9uY2xpY2s9JHtlID0+IGhhbmRsZUNsaWNrKGUsIHNwZWxsLCBzZW5kKX0+XG4gICAgJHtyZW5kZXJJZignY29vbGRvd24nID09PSBzcGVsbC5zdGF0ZSwgc3BlbGwsIHJlbmRlckNvb2xkb3duKX1cbiAgICA8c3ZnIGNsYXNzPVwiaWNvblwiPlxuICAgICAgPHVzZSB4bGluazpocmVmPVwiI3N2Zy0ke3NwZWxsLmlkfVwiPlxuICAgIDwvc3ZnPlxuICA8L2xpPlxuYFxuIiwiaW1wb3J0IGh0bWwgZnJvbSAnY2hvby9odG1sJ1xuaW1wb3J0IHNwZWxsSXRlbSBmcm9tICcuL3NwZWxsLWl0ZW0nXG5cbmV4cG9ydCBkZWZhdWx0IChlbm5lbXksIHByZXYsIHNlbmQpID0+IGh0bWxgXG4gIDx1bCBjbGFzcz1cInNwZWxsLWxpc3RcIj5cbiAgICAke2VubmVteS5zcGVsbHMubWFwKHNwZWxsID0+IHNwZWxsSXRlbShzcGVsbCwgcHJldiwgc2VuZCkpfVxuICA8L3VsPlxuYFxuIl19
