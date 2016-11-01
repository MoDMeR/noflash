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
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var _choo=require(7),_choo2=_interopRequireDefault(_choo),_fastclick=require(14),_fastclick2=_interopRequireDefault(_fastclick),_chooLog=require(5),_chooLog2=_interopRequireDefault(_chooLog),_api=require(49),_api2=_interopRequireDefault(_api),_app=require(50),_app2=_interopRequireDefault(_app),_game=require(51),_game2=_interopRequireDefault(_game),_welcome=require(53),_welcome2=_interopRequireDefault(_welcome),_ingame=require(52),_ingame2=_interopRequireDefault(_ingame),app=(0,_choo2.default)();app.use((0,_chooLog2.default)()),app.model(_api2.default),app.model(_app2.default),app.model(_game2.default),app.router(function(e){return[e("/",_welcome2.default),e("/ingame",_ingame2.default)]});var tree=app.start();document.body.appendChild(tree),(0,_fastclick2.default)(document.body),document.addEventListener("deviceready",function(){document.addEventListener("backbutton",function(){history.back()}),"android"==cordova.platformId&&StatusBar.backgroundColorByHexString("#121637")});

},{"14":14,"49":49,"5":5,"50":50,"51":51,"52":52,"53":53,"7":7}],48:[function(require,module,exports){
"use strict";function renderIf(e,r,t){return e?t(r):""}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=renderIf;

},{}],49:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function createChampion(e){return _lolChampions2.default.find(function(n){return n.key===String(e)})}function createSpell(e){var n=_lolSpells2.default.find(function(n){return n.key===String(e)});return(0,_xtend2.default)({},n,{uid:uid(),state:"available",cooldown:0,refCooldown:n.cooldown})}Object.defineProperty(exports,"__esModule",{value:!0});var _lolChampions=require(22),_lolChampions2=_interopRequireDefault(_lolChampions),_lolSpells=require(23),_lolSpells2=_interopRequireDefault(_lolSpells),_store=require(37),_store2=_interopRequireDefault(_store),_uniqueid=require(39),_uniqueid2=_interopRequireDefault(_uniqueid),_xhr=require(42),_xhr2=_interopRequireDefault(_xhr),_xtend=require(43),_xtend2=_interopRequireDefault(_xtend),proxyUrl="https://wt-ngryman-gmail_com-0.run.webtask.io/riot-proxy",endpoint=function(e){var n=_store2.default.get("app:region");switch(e){case"summoner":return"/api/lol/"+n+"/v1.4/summoner/by-name";case"ennemies":return"/observer-mode/rest/consumer/getSpectatorGameInfo/"+n+"1"}},uid=(0,_uniqueid2.default)();exports.default={namespace:"api",effects:{request:function(e,n,r,t){return(0,_xhr2.default)(proxyUrl+"?url="+e,{json:!0},function(e,n,r){null==r.status?t(null,r):t(r.status.status_code)})},summoner:function e(n,r,t,u){var e=_store2.default.get("api:summoner");return null!=e&&e.name===n?u(null,e):void t("api:request",endpoint("summoner")+"/"+n,function(e,r){if(403===e||404===e)return u("Unknown summoner");var t=r[n.toLowerCase().replace(/ /g,"")];return t?(_store2.default.set("api:summoner",t),void u(null,t)):u("No summoner found")})},ennemies:function(e,n,r,t){r("api:request",endpoint("ennemies")+"/"+e.id,function(n,r){if(404===n)return t("No live game found");var u=r.participants;if(1===u.length)return t("Game mode not supported");var o=u.find(function(n){return e.name===n.summonerName}).teamId,i=u.filter(function(e){return e.teamId!==o}).map(function(e){return{name:e.summonerName,champion:createChampion(e.championId),spells:[createSpell(e.spell1Id),createSpell(e.spell2Id)]}});t(null,i)})}}};

},{"22":22,"23":23,"37":37,"39":39,"42":42,"43":43}],50:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _store=require(37),_store2=_interopRequireDefault(_store),_xtend=require(43),_xtend2=_interopRequireDefault(_xtend),errTimeoutId=void 0;exports.default={namespace:"app",state:{title:"<em>No</em> Flash",tagline:"Track summoner spells",loading:!1,error:"",summoner:_store2.default.get("app:summoner")||"",region:_store2.default.get("app:region")||""},effects:{summoner:function(e,r,t,o){_store2.default.set("app:summoner",e),t("app:set",{summoner:e},o)},region:function(e,r,t,o){_store2.default.set("app:region",e),t("app:set",{region:e},o)},loading:function(e,r,t,o){t("app:set",{error:"",loading:!0},o)},error:function(e,r,t,o){t("app:set",{error:e.err,loading:!1},o),clearTimeout(errTimeoutId),errTimeoutId=setTimeout(function(){t("app:set",{error:"",loading:!1},o)},3e3)}},reducers:{set:function(e,r){return(0,_xtend2.default)(r,e)}}};

},{"37":37,"43":43}],51:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _xtend=require(43),_xtend2=_interopRequireDefault(_xtend),numCooldowns=0;exports.default={namespace:"game",state:{ennemies:[]},effects:{fetch:function(e,n,o,t){o("app:loading",function(){o("api:summoner",e,function(e,n){return e?o("app:error",{err:e},t):void o("api:ennemies",n,function(e,n){return e?o("app:error",{err:e},t):void o("game:ennemies",n,function(){o("location:setLocation",{location:"/ingame"},t)})})})})},cooldown:function(e,n,o,t){"cooldown"!==e.state?(numCooldowns++,o("game:startCooldown",e.uid,t)):o("game:decrementCooldown",{uid:e.uid,amount:10},t)}},reducers:{ennemies:function(e,n){return{ennemies:e}},startCooldown:function(e,n){return{ennemies:n.ennemies.map(function(n){return(0,_xtend2.default)(n,{spells:n.spells.map(function(n){return n.uid===e?(0,_xtend2.default)({},n,{state:"cooldown",cooldown:n.refCooldown-1}):n})})})}},decrementCooldown:function(e,n){return{ennemies:n.ennemies.map(function(n){return(0,_xtend2.default)(n,{spells:n.spells.map(function(n){if("cooldown"!==n.state)return n;if(e.uid&&n.uid!==e.uid)return n;var o=(0,_xtend2.default)({},n,{cooldown:n.cooldown-e.amount});return o.cooldown<=0&&(o.cooldown=0,o.state="available",numCooldowns--),o})})})}},toggleFocus:function(e,n){return{ennemies:n.ennemies.map(function(n){return n.name===e.name?(0,_xtend2.default)({},n,{focused:!n.focused}):n})}}},subscriptions:{tick:function(e,n){setInterval(function(){0!==numCooldowns&&e("game:decrementCooldown",{amount:1},n)},1e3)}}};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYmFycmFja3MvYXBwbHktaG9vay5qcyIsIm5vZGVfbW9kdWxlcy9iYXJyYWNrcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9iZWwvaW5kZXguanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2Nob28tbG9nL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Nob28vaHRtbC5qcyIsIm5vZGVfbW9kdWxlcy9jaG9vL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NsYXNzbmFtZXMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2xvc2VzdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kZWVwLWRpZmYvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZGV0ZWN0LWJyb3dzZXIvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9kZXRlY3QtYnJvd3Nlci9saWIvZGV0ZWN0QnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9kb2N1bWVudC1yZWFkeS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9mYXN0Y2xpY2svbGliL2Zhc3RjbGljay5qcyIsIm5vZGVfbW9kdWxlcy9mb3ItZWFjaC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9nbG9iYWwvZG9jdW1lbnQuanMiLCJub2RlX21vZHVsZXMvZ2xvYmFsL3dpbmRvdy5qcyIsIm5vZGVfbW9kdWxlcy9oYXNoLW1hdGNoL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2h5cGVyc2NyaXB0LWF0dHJpYnV0ZS10by1wcm9wZXJ0eS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9oeXBlcngvaW5kZXguanMiLCJub2RlX21vZHVsZXMvaXMtZnVuY3Rpb24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9sLWNoYW1waW9ucy9jaGFtcGlvbnMuanNvbiIsIm5vZGVfbW9kdWxlcy9sb2wtc3BlbGxzL3NwZWxscy5qc29uIiwibm9kZV9tb2R1bGVzL21hdGNoZXMtc2VsZWN0b3IvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbW9ycGhkb20vc3JjL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL25hbm9yYWYvaW5kZXguanMiLCJub2RlX21vZHVsZXMvb24tbG9hZC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wYWQtbGVmdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wYWQtcmlnaHQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcGFyc2UtaGVhZGVycy9wYXJzZS1oZWFkZXJzLmpzIiwibm9kZV9tb2R1bGVzL3BhdGhuYW1lLW1hdGNoL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlcGVhdC1zdHJpbmcvaW5kZXguanMiLCJub2RlX21vZHVsZXMvc2hlZXQtcm91dGVyL2hhc2guanMiLCJub2RlX21vZHVsZXMvc2hlZXQtcm91dGVyL2hpc3RvcnkuanMiLCJub2RlX21vZHVsZXMvc2hlZXQtcm91dGVyL2hyZWYuanMiLCJub2RlX21vZHVsZXMvc2hlZXQtcm91dGVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3N0b3JlL3N0b3JlLmpzIiwibm9kZV9tb2R1bGVzL3RyaW0vaW5kZXguanMiLCJub2RlX21vZHVsZXMvdW5pcXVlaWQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvd2F5ZmFyZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvd2F5ZmFyZXIvdHJpZS5qcyIsIm5vZGVfbW9kdWxlcy94aHIvaW5kZXguanMiLCJub2RlX21vZHVsZXMveHRlbmQvaW1tdXRhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3h0ZW5kL211dGFibGUuanMiLCJub2RlX21vZHVsZXMveW8teW8vaW5kZXguanMiLCJub2RlX21vZHVsZXMveW8teW8vdXBkYXRlLWV2ZW50cy5qcyIsInNyYy9pbmRleC5qcyIsInNyYy9saWIvcmVuZGVyLWlmLmpzIiwic3JjL21vZGVscy9hcGkuanMiLCJzcmMvbW9kZWxzL2FwcC5qcyIsInNyYy9tb2RlbHMvZ2FtZS5qcyIsInNyYy9wYWdlcy9pbmdhbWUuanMiLCJzcmMvcGFnZXMvd2VsY29tZS5qcyIsInNyYy92aWV3cy9lbm5lbXktaXRlbS5qcyIsInNyYy92aWV3cy9lbm5lbXktbGlzdC5qcyIsInNyYy92aWV3cy9zcGVsbC1pdGVtLmpzIiwic3JjL3ZpZXdzL3NwZWxsLWxpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNJQSxRQUFTLFdBQVcsRUFBSyxFQUFNLEVBQU0sRUFBTSxFQUFNLEdBQy9DLEVBQUksUUFBUSxTQUFVLEdBQ3BCLEVBQUcsRUFBTSxFQUFNLEVBQU0sRUFBTSxLQU4vQixPQUFPLFFBQVU7OztBQ1VqQixRQUFTLFlBQVksR0FrQ25CLFFBQVMsR0FBSyxHQU1SLEVBQU0sZUFBZSxFQUFtQixLQUFLLEVBQU0sZUFDbkQsRUFBTSxTQUFTLEVBQWEsS0FBSyxZQUFZLEVBQU0sVUFDbkQsRUFBTSxVQUFVLEVBQWMsS0FBSyxFQUFNLFVBQ3pDLEVBQU0sbUJBQW1CLEVBQWtCLEtBQUssRUFBTSxtQkFDdEQsRUFBTSxrQkFBa0IsRUFBa0IsS0FBSyxFQUFNLGtCQUNyRCxFQUFNLGNBQWMsRUFBYSxLQUFLLEVBQU0sY0FDNUMsRUFBTSxhQUFhLEVBQVksS0FBSyxFQUFNLGFBS2hELFFBQVMsR0FBVSxHQUVqQixFQUFPLEtBQUssR0FLZCxRQUFTLEdBQVUsR0FDakIsRUFBTyxLQUdQLE1BQU0sR0FBUSxFQUFLLEtBQ25CLEtBQUssRUFBSyxPQUFTLEVBQUssVUFBVyxFQUFPLE1BQU8sT0FBTSxFQUNsRCxLQUFLLEVBQUssTUFBTyxNQUFPLFFBQU8sT0FBTyxNQUFNLEdBR2pELE1BQU0sTUFDQSxJQUlOLEdBQU8sUUFBUSxTQUFVLEdBQ3ZCLEtBQU0sR0FBSyxFQUFNLFNBQ2pCLEdBQVcsS0FBSyxFQUNoQixNQUFNLEdBQWEsRUFBTSxTQUNyQixJQUNGLEVBQVMsR0FBTSxFQUFTLE9BQ3hCLE1BQU0sRUFBSSxFQUFZLEdBQ3RCLEVBQVMsR0FBTSxNQUFNLEVBQVMsR0FBSyxFQUFNLEtBRXpDLE9BQU8sRUFBVSxLQUtyQixPQUFPLEtBQUssR0FBTyxRQUFRLFNBQVUsR0FDL0IsRUFBVyxRQUFRLE1BQVMsSUFDaEMsRUFBUyxHQUFPLEVBQU0sS0FHeEIsTUFBTSxHQUFXLE1BQU0sRUFBUSxNQUFNLEVBQU8sSUFDdEMsRUFBZSxTQUFTLEVBQVUsRUFFeEMsT0FBUSxHQUFLLFVBQVcsRUFDcEIsRUFDQSxPQUFPLE9BQU8sR0FLcEIsUUFBUyxHQUFPLEdBdURkLFFBQVMsR0FBWSxFQUFVLEdBSTdCLE1BQU8sVUFBZSxFQUFNLEVBQU0sR0FhaEMsUUFBUyxHQUFpQixHQUN4QixFQUFNLEdBQU8sS0FDVCxHQUNGLFVBQVUsRUFBYyxFQUFLLEVBQVEsU0FBcUIsR0FDeEQsTUFBTyxVQUFlLEVBQU0sR0FFMUIsRUFBd0IsbUJBQVQsR0FBdUIsS0FBTyxFQUM3QyxFQUFNLEVBQU0sRUFBTSxFQUFVLE1BbkIvQixHQUFPLElBQ1YsRUFBSyxFQUNMLEVBQU8sTUFFVCxFQUF3QixtQkFBVCxHQUF1QixLQUFPLENBSzdDLE1BQU0sR0FBTyxFQUFjLEVBQWtCLENBQzdDLEdBQU0sRUFBTSxFQUFNLEVBQVUsSUFtQmhDLFFBQVMsR0FBTyxFQUFNLEVBQU0sRUFBUSxHQUtsQyxXQUFXLFdBQ1QsR0FBSSxJQUFpQixFQUNqQixHQUFnQixDQUNwQixNQUFNLEdBQVcsTUFBTSxFQUVuQixHQUFjLFFBQ2hCLFVBQVUsRUFBZSxFQUFNLEVBQVEsRUFBTSxFQUFRLEVBSXZELElBQUksR0FBYSxDQUNqQixJQUFJLElBQUksS0FBSyxHQUFPLENBQ2xCLEtBQU0sR0FBTSxFQUFLLE1BQU0sSUFDdkIsSUFBSSxHQUFLLEVBQUksT0FDYixHQUFhLEVBQUksS0FBSyxLQUd4QixLQUFNLEdBQVksRUFBSyxFQUFTLEdBQU0sQ0FDdEMsSUFBSSxHQUFhLEVBQVUsR0FBYSxDQUN0QyxHQUFJLEVBQUksQ0FDTixLQUFNLEdBQWUsRUFBVSxHQUFZLEVBQU0sRUFBTyxHQUN4RCxHQUFTLEdBQU0sTUFBTSxFQUFPLEdBQUssT0FFakMsUUFBTyxFQUFVLEVBQVMsR0FBWSxFQUFNLEdBRTlDLElBQWlCLEVBQ2IsRUFBbUIsUUFDckIsVUFBVSxFQUFvQixFQUFNLEVBQVUsRUFBUSxFQUFZLEdBRXBFLEVBQVMsRUFDVCxFQUFHLEtBQU0sR0FHWCxLQUFNLEdBQVcsRUFBSyxFQUFRLEdBQU0sQ0FDcEMsS0FBSyxHQUFrQixHQUFZLEVBQVMsR0FBYSxDQUN2RCxLQUFNLEdBQU8sRUFBVyxXQUFhLEVBQ2pDLEdBQUksRUFBUyxHQUFZLEVBQU0sRUFBTyxHQUFLLEVBQU0sR0FDaEQsRUFBUyxHQUFZLEVBQU0sRUFBUSxFQUFNLEdBQzlDLEdBQWdCLEVBR2xCLElBQUssSUFBbUIsRUFDdEIsS0FBTSxJQUFJLE9BQU0seUJBQTJCLElBRTVDLEdBdkZMLE1BbERBLEdBQU8sTUFJUCxFQUFPLFFBQVEsU0FBVSxHQUN2QixLQUFNLEdBQUssRUFBTSxTQUNqQixLQUFLLEdBQWUsRUFBTSxPQUFTLEVBQUssU0FBVSxFQUFPLENBQ3ZELEtBQU0sR0FBYSxFQUFNLFNBQ3JCLElBQ0YsRUFBTyxHQUFNLEVBQU8sT0FDcEIsTUFBTSxFQUFJLEVBQVksSUFFdEIsT0FBTyxFQUFRLElBR2QsR0FBa0IsRUFBTSxVQUFZLEVBQUssWUFBYSxHQUN6RCxNQUFNLEVBQUksRUFBTSxTQUFVLEVBQVUsU0FBVSxHQUM1QyxNQUFPLFVBQVMsRUFBSSxNQUduQixHQUFpQixFQUFNLFNBQVcsRUFBSyxXQUFZLEdBQ3RELE1BQU0sRUFBSSxFQUFNLFFBQVMsRUFBUyxTQUFVLEdBQzFDLE1BQU8sVUFBUyxFQUFJLE1BR25CLEdBQWMsRUFBTSxlQUFpQixFQUFLLGlCQUFrQixHQUMvRCxNQUFNLEVBQUksRUFBTSxjQUFlLEVBQWUsU0FBVSxFQUFJLEdBQzFELEtBQU0sR0FBTyxFQUFXLGtCQUFvQixFQUFLLEVBQUssSUFBTSxFQUFNLEdBS2xFLE9BSkEsR0FBSyxTQUFTLEVBQUksR0FDbEIsRUFBRyxFQUFNLFNBQVUsR0FDakIsVUFBVSxFQUFjLEVBQUssRUFBUSxLQUVoQyxNQU9SLEdBQWUsRUFBSyxTQUFVLElBQ2pDLEVBQVMsU0FBUyxFQUFRLElBR3ZCLEVBQUssa0JBQWlCLEdBQWEsR0FDbkMsRUFBSyxhQUFZLEdBQWlCLEdBQ2xDLEVBQUssWUFBVyxHQUFnQixHQUNoQyxFQUFLLFVBQVMsR0FBYyxHQUU1QixFQUFhLFFBQVEsRUFBYSxLQUFLLFlBQVksaUJBRWpELEVBdkpULEVBQVEsS0FHUixNQUFNLE1BQ0EsS0FDQSxLQUVBLEtBQ0EsS0FDQSxLQUNBLElBRU4sR0FBSSxFQUVKLElBQUksSUFBaUIsRUFDakIsR0FBZ0IsRUFDaEIsR0FBYyxFQUNkLEdBQWEsQ0FFakIsTUFBTSxHQUFnQixFQUFNLGtCQUN0QixFQUFXLEVBQU0sYUFDakIsRUFBVSxFQUFNLFlBQ2hCLEVBQVMsRUFBTSxVQUNyQixJQUFJLEtBTUosT0FKQSxHQUFNLE1BQVEsRUFDZCxFQUFNLE1BQVEsRUFDZCxFQUFNLE1BQVEsRUFDZCxFQUFNLElBQU0sRUFDTCxFQTBOVCxRQUFTLE9BQU8sRUFBSSxFQUFRLEVBQVEsR0FDOUIsSUFBTyxFQUFPLEtBQUssRUFBTyxPQUM5QixPQUFPLEtBQUssR0FBUSxRQUFRLFNBQVUsR0FDcEMsS0FBTSxHQUFLLEVBQU8sRUFBSyxFQUFPLEdBQU0sR0FBTyxFQUFPLEVBQzlDLEdBQUksRUFBTyxHQUFJLEdBQU8sRUFDckIsRUFBTyxHQUFPLElBTXZCLFFBQVMsZ0JBQWdCLEdBQ3ZCLEtBQU0sR0FHUixRQUFTLGFBQWEsR0FDcEIsTUFBTyxVQUFzQixFQUFLLEVBQU8sR0FDbkMsR0FBSyxFQUFRLEVBQUssRUFBTyxJQU9qQyxRQUFTLFVBQVUsRUFBTyxHQUl4QixNQUhBLEdBQVcsUUFBUSxTQUFVLEdBQzNCLEVBQVEsRUFBVSxLQUViLEVBOVJULEtBQU0sUUFBUyxRQUFRLGlCQUVqQixNQUFRLFFBQVEsU0FFaEIsVUFBWSxRQUFRLGVBRTFCLFFBQU8sUUFBVTs7O0FDK0JqQixRQUFTLGtCQUFrQixFQUFLLEVBQU8sR0F5RXJDLFFBQVMsR0FBYSxHQUNwQixHQUFLLE1BQU0sUUFBUSxHQUNuQixJQUFLLEdBQUksR0FBSSxFQUFHLEVBQUksRUFBTyxPQUFRLElBQUssQ0FDdEMsR0FBSSxHQUFPLEVBQU8sRUFDbEIsSUFBSSxNQUFNLFFBQVEsR0FDaEIsRUFBWSxPQURkLENBWUEsSUFQb0IsZ0JBQVQsSUFDTyxpQkFBVCxJQUNQLFlBQWdCLE9BQ2hCLFlBQWdCLFdBQ2hCLEVBQU8sRUFBSyxZQUdNLGdCQUFULEdBQW1CLENBQzVCLEdBQUksRUFBRyxXQUF1QyxVQUExQixFQUFHLFVBQVUsU0FBc0IsQ0FDckQsRUFBRyxVQUFVLFdBQWEsQ0FDMUIsVUFFRixFQUFPLFNBQVMsZUFBZSxHQUc3QixHQUFRLEVBQUssVUFDZixFQUFHLFlBQVksS0FqR3JCLEdBQUksRUFHQSxVQUFTLFFBQVEsTUFBUyxJQUM1QixFQUFNLFVBQVksTUFJcEIsSUFBSSxJQUFLLENBY1QsSUFiSSxFQUFNLFlBQ1IsRUFBSyxFQUFNLGdCQUNKLEdBQU0sV0FLYixFQURFLEVBQ0csU0FBUyxnQkFBZ0IsRUFBSSxHQUU3QixTQUFTLGNBQWMsR0FJMUIsRUFBTSxRQUFVLEVBQU0sU0FBVSxDQUNsQyxHQUFJLEdBQU8sRUFBTSxRQUFVLGFBQ3ZCLEVBQVMsRUFBTSxVQUFZLFlBQy9CLFFBQU8sRUFBSSxXQUNULEVBQUssSUFDSixXQUNELEVBQU8sSUFHVCxpQkFBaUIsT0FBTyxPQUFPLGNBQ3hCLEdBQU0sYUFDTixHQUFNLFNBSWYsSUFBQSxHQUFTLEtBQUssR0FDWixHQUFJLEVBQU0sZUFBZSxHQUFJLENBQzNCLEdBQUksR0FBTSxFQUFFLGNBQ1IsRUFBTSxFQUFNLEVBV2hCLElBVFksY0FBUixJQUNGLEVBQU0sUUFDTixFQUFJLFNBR0ksWUFBTixJQUNGLEVBQUksT0FHRixXQUFXLEdBQ2IsR0FBWSxTQUFSLEVBQWdCLEVBQU0sTUFDckIsSUFBWSxVQUFSLEVBQWlCLFFBR0osUUFBcEIsRUFBSSxNQUFNLEVBQUcsR0FDZixFQUFHLEdBQUssRUFFSixFQUNRLGVBQU4sRUFDRixFQUFHLGVBQWUsUUFBUyxFQUFHLEdBRTlCLEVBQUcsZUFBZSxLQUFNLEVBQUcsR0FHN0IsRUFBRyxhQUFhLEVBQUcsR0FxQzNCLE1BRkEsR0FBWSxHQUVMLEVBN0lULEdBQUksVUFBVyxRQUFRLG1CQUNuQixPQUFTLFFBQVEsVUFDakIsT0FBUyxRQUFRLFdBRWpCLE1BQVEsNkJBQ1IsUUFBVSwrQkFFVixZQUNGLFVBQVcsRUFDWCxRQUFTLEVBQ1QsZUFBZ0IsRUFDaEIsU0FBVSxFQUNWLGVBQWdCLEVBQ2hCLGNBQWUsRUFDZixTQUFVLEVBQ1YsU0FBVSxFQUNWLFNBQVUsRUFDVixhQUFjLEdBRVosVUFDRixNQUNBLFdBQVksY0FBZSxlQUFnQixVQUFXLGVBQ3RELGdCQUFpQixtQkFBb0IsU0FBVSxXQUFZLGdCQUMzRCxTQUFVLE9BQVEsT0FBUSxVQUFXLFVBQVcsZ0JBQ2hELHNCQUF1QixjQUFlLG1CQUFvQixvQkFDMUQsb0JBQXFCLGlCQUFrQixVQUFXLFVBQVcsVUFDN0QsVUFBVyxVQUFXLGlCQUFrQixVQUFXLFVBQVcsY0FDOUQsZUFBZ0IsV0FBWSxlQUFnQixxQkFDNUMsY0FBZSxTQUFVLGVBQWdCLFNBQVUsT0FBUSxZQUMzRCxtQkFBb0IsaUJBQWtCLGdCQUFpQixnQkFDdkQsZ0JBQWlCLElBQUssUUFBUyxXQUFZLFFBQVMsUUFBUyxPQUM3RCxpQkFBa0IsU0FBVSxPQUFRLFdBQVksZ0JBQWlCLFFBQ2pFLE9BQVEsVUFBVyxVQUFXLFdBQVksaUJBQWtCLE9BQzVELE1BQU8sT0FBUSxTQUFVLFNBQVUsT0FBUSxXQUFZLFFBQVMsT0FDaEUsUUFBUyxNQUFPLE9BQVEsUUE4RzFCLFFBQU8sUUFBVSxPQUFPLGtCQUN4QixPQUFPLFFBQVEsY0FBZ0I7OztBQ2pKL0I7QUFDQTtBQUNBLEFDdUJBLFFBQVMsV0FXUCxRQUFTLEdBQVUsRUFBTSxFQUFPLEVBQU0sRUFBTyxHQXVCM0MsUUFBUyxHQUFVLEVBQU0sR0FDdkIsUUFBUSxJQUFJLGVBQWdCLEdBQzVCLFFBQVEsSUFBSSxRQUFTLEdBeEJ2QixLQUFNLEdBQVEsRUFBTSxNQUFNLEtBQ3BCLEVBQWEsRUFBTSxHQUFHLE9BQ3RCLEVBQVMsRUFBTSxHQUFHLE9BRWxCLElBQ04sVUFBUyxZQUFhLFdBQVcsR0FBYSxJQUFLLEdBQ25ELFNBQVMsT0FBUSxXQUFXLFVBQVksSUFBSyxHQUM3QyxTQUFTLE9BQVEsaUJBQWlCLEdBQWMsSUFBSyxHQUVyRCxTQUFTLFVBQVcsSUFBTSxFQUFTLElBQUssR0FDeEMsU0FBUyxVQUFXLEtBQU0sR0FDMUIsU0FBUyxVQUFXLElBQU0sRUFBTyxJQUFLLEdBRWxDLDBCQUNGLFNBQVMsR0FDVCxFQUFTLEVBQU0sR0FDZixRQUFRLGFBRVIsSUFBSSxHQUNKLEVBQVMsRUFBTSxJQVduQixRQUFTLEdBQVMsRUFBSyxFQUFPLEdBZTVCLFFBQVMsR0FBVSxHQUNqQixRQUFRLE1BQU0sR0FmaEIsS0FBTSxLQUNOLFVBQVMsWUFBYSxXQUFXLEdBQWEsSUFBSyxHQUNuRCxTQUFTLE1BQU8sV0FBVyxTQUFXLElBQUssR0FDM0MsU0FBUyxVQUFXLEVBQUksUUFBVSxJQUFLLEdBRW5DLDBCQUNGLFNBQVMsR0FDVCxFQUFTLEdBQ1QsUUFBUSxhQUVSLElBQUksR0FDSixFQUFTLElBVWIsUUFBUyxHQUFlLEVBQU0sRUFBTyxFQUFNLEdBNEJ6QyxRQUFTLEdBQVUsRUFBTSxHQUN2QixRQUFRLElBQUksUUFBUyxHQUNyQixRQUFRLElBQUksUUFBUyxHQUNqQixFQUNGLFFBQVEsS0FBSyxRQUFTLHlDQUV0QixRQUFRLElBQUksUUFBUyxHQWpDekIsS0FBTSxHQUFPLFNBQVMsRUFBTSxPQUV0QixFQUEwQixJQUFoQixFQUFLLE9BQ2YsRUFBYyxTQUFVLEdBQzVCLE1BQUksR0FDSyxVQUNrQixJQUFoQixFQUFLLE9BQ1AsT0FFQSxTQUVSLEdBRUcsSUFDTixVQUFTLFlBQWEsV0FBVyxHQUFhLElBQUssR0FDbkQsU0FBUyxFQUFVLFNBQVcsT0FBUSxXQUFXLFNBQVcsSUFBSyxHQUNqRSxTQUFTLFdBQVksRUFBVSxHQUFLLEVBQUssT0FBUyxLQUFPLEVBQVksR0FFakUsMEJBQ0YsU0FBUyxHQUNULEVBQVMsRUFBTSxHQUNmLFFBQVEsYUFFUixJQUFJLEdBQ0osRUFBUyxFQUFNLElBeEZuQixLQUFNLEdBQVksS0FBSyxLQUV2QixRQUNFLFNBQVUsRUFDVixRQUFTLEVBQ1QsY0FBZSxHQW9HbkIsUUFBUyxVQUFVLEdBQ2pCLFFBQVEsZUFBZSxNQUFNLFFBQVMsR0FLeEMsUUFBUyxLQUFLLEdBQ1osUUFBUSxJQUFJLE1BQU0sUUFBUyxHQUs3QixRQUFTLFlBQVksR0FDbkIsS0FBTSxHQUFVLFNBQVMsS0FDbkIsRUFBVyxTQUFTLFdBQWEsRUFBVSxDQUNqRCxPQUFnQixVQUFSLEdBQTJCLFVBQVIsRUFDdkIsU0FBUyxRQUFRLEVBQUssRUFBUyxLQUFNLEVBQVUsS0FDL0MsUUFBUSxFQUFLLEVBQVMsS0FLNUIsUUFBUyxrQkFBa0IsR0FDekIsS0FBTSxHQUFVLFNBQVMsVUFFekIsT0FEWSxpQkFBUixJQUF3QixFQUFNLFFBQzNCLFNBQVMsRUFBSyxFQUFTLEtBS2hDLFFBQVMsVUFBVSxFQUFPLEVBQU0sR0FDOUIsR0FBSSxHQUFVLEtBQU8sRUFDakIsRUFBVyxVQUFZLE9BQU8sR0FBUyxHQUUzQyxPQUFLLElBS0EsRUFBSyxLQUFJLEVBQUssR0FBSyxJQUN4QixFQUFLLElBQU0sSUFBTSxFQUVaLEVBQUssS0FBSSxFQUFLLEdBQUssSUFDSCxZQUFqQixRQUFRLEtBQ1YsRUFBSyxJQUFNLElBQU0sRUFFakIsRUFBSyxLQUFLLEdBRUwsR0FiTCxHQUFTLEVBQVMsR0FrQnRCLFFBQVMsWUFBWSxHQUNuQixHQUFJLEdBQVMsT0FBTyxLQUFLLE9BQU8sS0FBSyxNQUFRLEdBQWEsS0FBUSxLQUM5RCxFQUFNLElBQU0sUUFBUSxFQUFRLEVBQUcsS0FBTyxHQUMxQyxPQUFPLEdBR1QsUUFBUywwQkFDUCxNQUFPLFNBQVEsZ0JBQW1DLFlBQWpCLFFBQVEsS0EvTDNDLEtBQU0sVUFBVyxRQUFRLGFBQ25CLFNBQVcsUUFBUSxhQUNuQixRQUFVLFFBQVEsWUFDbEIsUUFBVSxRQUFRLGlCQUV4QixRQUFPLFFBQVUsT0FHakIsTUFBTSxTQUNKLE1BQU8sVUFDUCxJQUFLLFVBQ0wsS0FBTSxVQUNOLFVBQVcsVUFDWCxLQUFNLFVBQ04sT0FBUSxVQUNSLFFBQVMsV0FHTCxVQUNKLEtBQU0sRUFDTixXQUFZOzs7QUNwQmQsT0FBTyxRQUFVLFFBQVE7OztBQ2lCekIsUUFBUyxNQUFNLEdBdUJiLFFBQVMsR0FBVSxFQUFPLEdBV3hCLFFBQVMsS0FDUCxNQUFPLGNBWFQsRUFBYyxNQUdkLEVBQU8sT0FBUSxlQUFlLEVBQU8sVUFBVSxFQUFPLFNBQVMsR0FFL0QsTUFBTSxHQUFRLEVBQU8sT0FBUSxNQUFPLElBQzlCLEVBQVMsRUFBYSxFQUFlLEVBQVMsR0FDOUMsRUFBTyxFQUFPLEVBQU8sRUFDM0IsT0FBTyxHQUFLLFdBQWEsRUFBSyxXQVdoQyxRQUFTLEdBQU8sRUFBVSxHQUNuQixHQUFpQyxnQkFBYixLQUN2QixFQUFZLEVBQ1osRUFBVyxNQUViLEVBQVksTUFFWixFQUFPLE1BQU0sUUFBUSxHQUNyQixNQUFNLEdBQWEsRUFBTyxNQUFNLEVBQ2hDLEdBQVUsRUFBTSxRQUFVLEVBQWEsRUFBZSxFQUFTLEVBQy9ELE1BQU0sR0FBUSxFQUFPLE9BQU8sVUFFNUIsS0FBSyxFQUFVLENBQ2IsS0FBTSxHQUFPLEVBQVEsRUFBTSxTQUFTLFNBQVUsRUFFOUMsT0FEQSxHQUFZLEVBQ0wsRUFFUCxRQUFRLFdBQ04sS0FBTSxHQUFVLFNBQVMsY0FBYyxHQUVqQyxFQUFVLEVBQVEsRUFBTSxTQUFTLFNBQVUsRUFDakQsR0FBWSxHQUFHLE9BQU8sRUFBUyxLQU9yQyxRQUFTLEdBQVEsRUFBTSxFQUFPLEVBQU0sRUFBTSxHQUNuQyxJQUNILEVBQVMsUUFBUSxTQUFVLEVBQU8sR0FDaEMsS0FBTSxHQUFVLEVBQVEsRUFBTSxTQUFTLFNBQVUsRUFBTyxFQUN4RCxHQUFZLEdBQUcsT0FBTyxFQUFXLE1BR3JDLEVBQU8sRUFBTyxHQUtoQixRQUFTLEdBQVEsRUFBYyxHQUM3QixFQUFnQixFQUNoQixFQUFVLEVBS1osUUFBUyxHQUFPLEdBQ2QsRUFBTyxNQUFNLEdBS2YsUUFBUyxHQUFLLEdBRVosRUFBTyxJQUFJLEdBS2IsUUFBUyxHQUFjLEVBQWMsRUFBUSxHQUkzQyxRQUFTLEdBQWEsR0FRcEIsUUFBUyxHQUFNLEVBQU8sR0FDcEIsS0FBTSxHQUFPLEVBQVcsU0FBVyxHQUFPLEVBQzFDLE9BQU8sVUFBbUIsRUFBUSxHQUNoQyxLQUFNLEdBQVMsRUFDVCxFQUFVLEVBQU8sTUFBTSxHQUFTLE9BQVEsR0FFOUMsT0FESSxHQUFLLFVBQVcsR0FBTyxPQUFPLE9BQU8sR0FDbEMsRUFBTSxFQUFTLEVBQVEsSUFibEMsTUFBTyxVQUFVLEVBQU8sRUFBUSxHQUk5QixNQUhzQixrQkFBWCxLQUNULEVBQVMsRUFBSyxFQUFRLElBRWpCLEVBQVEsRUFBTyxFQUFRLElBUmxDLEdBQUksSUFBUyxVQUNiLE9BQU8sYUFBWSxFQUFjLEVBQVEsR0F4RzNDLEVBQU8sS0FFUCxNQUFNLEdBQVMsRUFBTSxPQUFTLFVBQzlCLElBQUksR0FBVSxFQUFNLFFBQVUsS0FDMUIsRUFBZ0IsS0FDaEIsRUFBWSxLQUNaLEVBQVUsS0FDVixFQUFTLElBV2IsT0FUQSxHQUFPLEtBQU0sY0FBZSxJQUM1QixFQUFPLElBQUksR0FFWCxFQUFNLFNBQVcsRUFDakIsRUFBTSxPQUFTLEVBQ2YsRUFBTSxNQUFRLEVBQ2QsRUFBTSxNQUFRLEVBQ2QsRUFBTSxJQUFNLEVBRUwsRUErR1QsUUFBUyxTQUFTLEdBK0JoQixRQUFTLEdBQWlCLEVBQUksRUFBSyxHQUNqQyxFQUFNLEdBQU8sU0FBVSxFQUFNLEdBQzNCLEVBQUcsU0FBbUIsR0FDcEIsRUFBSyx3QkFBMEIsU0FBVSxHQUFZLE1BakMzRCxLQUFNLEdBQU0sU0FBUyxTQUNmLEdBQVUsU0FBVyxFQUFLLEtBQVEsVUFBVSxFQUFJLE1BQVEsRUFBSSxNQUM1RCxHQUNKLFlBQWEsU0FBc0IsRUFBTSxHQUN2QyxPQUFTLFNBQVUsRUFBSyxTQUFTLFFBQVEsTUFBTyxPQUk5QyxJQVlOLE9BWEksR0FBSyxRQUFTLEVBQ2hCLEVBQWdCLFNBQVUsR0FDeEIsS0FBSyxTQUFVLEdBQ2IsRUFBUyxVQUFVLE9BRXBCLGFBQWMsSUFFYixFQUFLLFdBQVksR0FBTyxFQUFnQixRQUFTLGdCQUFpQixHQUNsRSxFQUFLLFFBQVMsR0FBTyxFQUFnQixLQUFNLGFBQWMsS0FJN0QsVUFBVyxXQUNYLGNBQWUsRUFDZixTQUFVLEVBQ1YsTUFBTyxHQTVLWCxLQUFNLFNBQVUsUUFBUSx3QkFDbEIsWUFBYyxRQUFRLGdCQUN0QixTQUFXLFFBQVEsbUJBQ25CLFFBQVUsUUFBUSxrQkFDbEIsS0FBTyxRQUFRLHFCQUNmLEtBQU8sUUFBUSxxQkFDZixVQUFZLFFBQVEsY0FDcEIsU0FBVyxRQUFRLFlBQ25CLFFBQVUsUUFBUSxXQUVsQixNQUFRLFFBQVEsU0FDaEIsR0FBSyxRQUFRLFFBRW5CLFFBQU8sUUFBVTs7O0NDTmhCLFdBQ0EsWUFJQSxTQUFTLEtBR1IsSUFBSyxHQUZELE1BRUssRUFBSSxFQUFHLEVBQUksVUFBVSxPQUFRLElBQUssQ0FDMUMsR0FBSSxHQUFNLFVBQVUsRUFDcEIsSUFBSyxFQUFMLENBRUEsR0FBSSxTQUFpQixFQUVyQixJQUFnQixXQUFaLEdBQW9DLFdBQVosRUFDM0IsRUFBUSxLQUFLLE9BQ1AsSUFBSSxNQUFNLFFBQVEsR0FDeEIsRUFBUSxLQUFLLEVBQVcsTUFBTSxLQUFNLFFBQzlCLElBQWdCLFdBQVosRUFDVixJQUFBLEdBQVMsS0FBTyxHQUNYLEVBQU8sS0FBSyxFQUFLLElBQVEsRUFBSSxJQUNoQyxFQUFRLEtBQUssSUFNakIsTUFBTyxHQUFRLEtBQUssS0F4QnJCLEdBQUksTUFBWSxjQTJCTSxvQkFBWCxTQUEwQixPQUFPLFFBQzNDLE9BQU8sUUFBVSxFQUNXLGtCQUFYLFNBQStDLGdCQUFmLFFBQU8sS0FBb0IsT0FBTyxJQUVuRixPQUFPLGdCQUFrQixXQUN4QixNQUFPLEtBR1IsT0FBTyxXQUFhOzs7QUM3Q3RCLEdBQUksU0FBVSxRQUFRLG1CQUV0QixRQUFPLFFBQVUsU0FBVSxFQUFTLEVBQVUsR0FHNUMsSUFGQSxHQUFJLEdBQVMsRUFBYyxFQUFVLEVBQVEsV0FFdEMsR0FBVSxJQUFXLFVBQVUsQ0FDcEMsR0FBSSxRQUFRLEVBQVEsR0FBVyxNQUFPLEVBQ3RDLEdBQVMsRUFBTzs7OztDQ0hsQixTQUFTLEVBQU0sR0FDZixZQUNzQixtQkFBWCxTQUF5QixPQUFPLElBRXpDLFVBQVcsV0FDVCxNQUFPLE9BRW1CLGdCQUFaLFNBSWhCLE9BQU8sUUFBVSxJQUdqQixFQUFLLFNBQVcsS0FFbEIsS0FBTSxTQUFTLEdBQ2YsWUFzQkEsU0FBUyxHQUFTLEVBQU0sR0FDdEIsRUFBSyxPQUFTLEVBQ2QsRUFBSyxVQUFZLE9BQU8sT0FBTyxFQUFVLFdBQ3ZDLGFBQ0UsTUFBTyxFQUNQLFlBQVksRUFDWixVQUFVLEVBQ1YsY0FBYyxLQUtwQixRQUFTLEdBQUssRUFBTSxHQUNsQixPQUFPLGVBQWUsS0FBTSxRQUMxQixNQUFPLEVBQ1AsWUFBWSxJQUVWLEdBQVEsRUFBSyxRQUNmLE9BQU8sZUFBZSxLQUFNLFFBQzFCLE1BQU8sRUFDUCxZQUFZLElBS2xCLFFBQVMsR0FBUyxFQUFNLEVBQVEsR0FDOUIsRUFBUyxPQUFPLEtBQUssS0FBTSxJQUFLLEdBQ2hDLE9BQU8sZUFBZSxLQUFNLE9BQzFCLE1BQU8sRUFDUCxZQUFZLElBRWQsT0FBTyxlQUFlLEtBQU0sT0FDMUIsTUFBTyxFQUNQLFlBQVksSUFLaEIsUUFBUyxHQUFRLEVBQU0sR0FDckIsRUFBUSxPQUFPLEtBQUssS0FBTSxJQUFLLEdBQy9CLE9BQU8sZUFBZSxLQUFNLE9BQzFCLE1BQU8sRUFDUCxZQUFZLElBS2hCLFFBQVMsR0FBWSxFQUFNLEdBQ3pCLEVBQVksT0FBTyxLQUFLLEtBQU0sSUFBSyxHQUNuQyxPQUFPLGVBQWUsS0FBTSxPQUMxQixNQUFPLEVBQ1AsWUFBWSxJQUtoQixRQUFTLEdBQVUsRUFBTSxFQUFPLEdBQzlCLEVBQVUsT0FBTyxLQUFLLEtBQU0sSUFBSyxHQUNqQyxPQUFPLGVBQWUsS0FBTSxTQUMxQixNQUFPLEVBQ1AsWUFBWSxJQUVkLE9BQU8sZUFBZSxLQUFNLFFBQzFCLE1BQU8sRUFDUCxZQUFZLElBS2hCLFFBQVMsR0FBWSxFQUFLLEVBQU0sR0FDOUIsR0FBSSxHQUFPLEVBQUksT0FBTyxHQUFNLEdBQVEsR0FBSyxFQUFJLE9BRzdDLE9BRkEsR0FBSSxPQUFTLEVBQU8sRUFBSSxFQUFJLE9BQVMsRUFBTyxFQUM1QyxFQUFJLEtBQUssTUFBTSxFQUFLLEdBQ2IsRUFHVCxRQUFTLEdBQVcsR0FDbEIsR0FBSSxTQUFjLEVBQ2xCLE9BQWEsV0FBVCxFQUNLLEVBR0wsSUFBWSxLQUNQLE9BQ2MsT0FBWixFQUNGLE9BQ0UsTUFBTSxRQUFRLEdBQ2hCLFFBQzhDLGtCQUE1QyxPQUFPLFVBQVUsU0FBUyxLQUFLLEdBQ2pDLE9BQzhCLG1CQUFyQixHQUFRLFVBQTRCLFVBQVUsS0FBSyxFQUFRLFlBQ3BFLFNBRUYsU0FHVCxRQUFTLEdBQVMsRUFBSyxFQUFLLEVBQVMsRUFBVyxFQUFNLEVBQUssR0FDekQsRUFBTyxLQUNQLElBQUksR0FBYyxFQUFLLE1BQU0sRUFDN0IsSUFBbUIsbUJBQVIsR0FBcUIsQ0FDOUIsR0FBSSxFQUFXLENBQ2IsR0FBMEIsa0JBQWYsSUFBNkIsRUFBVSxFQUFhLEdBQVEsTUFDbEUsSUFBMEIsZ0JBQWYsR0FBeUIsQ0FDdkMsR0FBSSxFQUFVLFdBQWEsRUFBVSxVQUFVLEVBQWEsR0FBUSxNQUNwRSxJQUFJLEVBQVUsVUFBVyxDQUN2QixHQUFJLEdBQU0sRUFBVSxVQUFVLEVBQWEsRUFBSyxFQUFLLEVBQ2pELEtBQ0YsRUFBTSxFQUFJLEdBQ1YsRUFBTSxFQUFJLE1BS2xCLEVBQVksS0FBSyxHQUlLLFdBQXBCLEVBQVcsSUFBeUMsV0FBcEIsRUFBVyxLQUM3QyxFQUFNLEVBQUksV0FDVixFQUFNLEVBQUksV0FHWixJQUFJLFNBQWUsR0FDZixRQUFlLEVBQ25CLElBQWMsY0FBVixFQUNZLGNBQVYsR0FDRixFQUFRLEdBQUksR0FBUSxFQUFhLFFBRTlCLElBQWMsY0FBVixFQUNULEVBQVEsR0FBSSxHQUFZLEVBQWEsUUFDaEMsSUFBSSxFQUFXLEtBQVMsRUFBVyxHQUN4QyxFQUFRLEdBQUksR0FBUyxFQUFhLEVBQUssUUFDbEMsSUFBNEMsa0JBQXhDLE9BQU8sVUFBVSxTQUFTLEtBQUssSUFBb0Usa0JBQXhDLE9BQU8sVUFBVSxTQUFTLEtBQUssSUFBOEIsRUFBTSxJQUFTLEVBQ2hKLEVBQVEsR0FBSSxHQUFTLEVBQWEsRUFBSyxRQUNsQyxJQUFjLFdBQVYsR0FBOEIsT0FBUixHQUF3QixPQUFSLEdBRS9DLEdBREEsRUFBUSxNQUNKLEVBQU0sUUFBUSxHQUFPLEVBQUcsQ0FFMUIsR0FEQSxFQUFNLEtBQUssR0FDUCxNQUFNLFFBQVEsR0FBTSxDQUN0QixHQUFJLEVBQVMsR0FBSSxNQUNqQixLQUFLLEVBQUksRUFBRyxFQUFJLEVBQUksT0FBUSxJQUN0QixHQUFLLEVBQUksT0FDWCxFQUFRLEdBQUksR0FBVSxFQUFhLEVBQUcsR0FBSSxHQUFZLEVBQVcsRUFBSSxNQUVyRSxFQUFTLEVBQUksR0FBSSxFQUFJLEdBQUksRUFBUyxFQUFXLEVBQWEsRUFBRyxFQUdqRSxNQUFPLEVBQUksRUFBSSxRQUNiLEVBQVEsR0FBSSxHQUFVLEVBQWEsRUFBRyxHQUFJLEdBQVEsRUFBVyxFQUFJLFlBRTlELENBQ0wsR0FBSSxHQUFRLE9BQU8sS0FBSyxHQUNwQixFQUFRLE9BQU8sS0FBSyxFQUN4QixHQUFNLFFBQVEsU0FBUyxFQUFHLEdBQ3hCLEdBQUksR0FBUSxFQUFNLFFBQVEsRUFDdEIsSUFBUyxHQUNYLEVBQVMsRUFBSSxHQUFJLEVBQUksR0FBSSxFQUFTLEVBQVcsRUFBYSxFQUFHLEdBQzdELEVBQVEsRUFBWSxFQUFPLElBRTNCLEVBQVMsRUFBSSxHQUFJLEVBQVcsRUFBUyxFQUFXLEVBQWEsRUFBRyxLQUdwRSxFQUFNLFFBQVEsU0FBUyxHQUNyQixFQUFTLEVBQVcsRUFBSSxHQUFJLEVBQVMsRUFBVyxFQUFhLEVBQUcsS0FHcEUsRUFBTSxPQUFTLEVBQU0sT0FBUyxPQUV2QixLQUFRLElBQ0QsV0FBVixHQUFzQixNQUFNLElBQVEsTUFBTSxJQUM5QyxFQUFRLEdBQUksR0FBUyxFQUFhLEVBQUssS0FLN0MsUUFBUyxHQUFlLEVBQUssRUFBSyxFQUFXLEdBUzNDLE1BUkEsR0FBUSxNQUNSLEVBQVMsRUFBSyxFQUNaLFNBQVMsR0FDSCxHQUNGLEVBQU0sS0FBSyxJQUdmLEdBQ00sRUFBTSxPQUFVLEVBQVEsRUFHbEMsUUFBUyxHQUFpQixFQUFLLEVBQU8sR0FDcEMsR0FBSSxFQUFPLE1BQVEsRUFBTyxLQUFLLE9BQVEsQ0FDckMsR0FDSSxHQURBLEVBQUssRUFBSSxHQUNOLEVBQUksRUFBTyxLQUFLLE9BQVMsQ0FDaEMsS0FBSyxFQUFJLEVBQUcsRUFBSSxFQUFHLElBQ2pCLEVBQUssRUFBRyxFQUFPLEtBQUssR0FFdEIsUUFBUSxFQUFPLE1BQ2IsSUFBSyxJQUNILEVBQWlCLEVBQUcsRUFBTyxLQUFLLElBQUssRUFBTyxNQUFPLEVBQU8sS0FDMUQsTUFDRixLQUFLLFVBQ0ksR0FBRyxFQUFPLEtBQUssR0FDdEIsTUFDRixLQUFLLElBQ0wsSUFBSyxJQUNILEVBQUcsRUFBTyxLQUFLLElBQU0sRUFBTyxTQUloQyxRQUFRLEVBQU8sTUFDYixJQUFLLElBQ0gsRUFBaUIsRUFBSSxHQUFRLEVBQU8sTUFBTyxFQUFPLEtBQ2xELE1BQ0YsS0FBSyxJQUNILEVBQU0sRUFBWSxFQUFLLEVBQ3ZCLE1BQ0YsS0FBSyxJQUNMLElBQUssSUFDSCxFQUFJLEdBQVMsRUFBTyxJQUkxQixNQUFPLEdBR1QsUUFBUyxHQUFZLEVBQVEsRUFBUSxHQUNuQyxHQUFJLEdBQVUsR0FBVSxHQUFVLEVBQU8sS0FBTSxDQUk3QyxJQUhBLEdBQUksR0FBSyxFQUNMLEdBQUksRUFDSixFQUFPLEVBQU8sS0FBTyxFQUFPLEtBQUssT0FBUyxFQUFJLElBQ3pDLEVBQUksR0FDdUIsbUJBQXZCLEdBQUcsRUFBTyxLQUFLLE1BQ3hCLEVBQUcsRUFBTyxLQUFLLElBQWlDLGdCQUFuQixHQUFPLEtBQUssVUFFM0MsRUFBSyxFQUFHLEVBQU8sS0FBSyxHQUV0QixRQUFRLEVBQU8sTUFDYixJQUFLLElBQ0gsRUFBaUIsRUFBTyxLQUFPLEVBQUcsRUFBTyxLQUFLLElBQU0sRUFBSSxFQUFPLE1BQU8sRUFBTyxLQUM3RSxNQUNGLEtBQUssVUFDSSxHQUFHLEVBQU8sS0FBSyxHQUN0QixNQUNGLEtBQUssSUFDTCxJQUFLLElBQ0gsRUFBRyxFQUFPLEtBQUssSUFBTSxFQUFPLE1BTXBDLFFBQVMsR0FBa0IsRUFBSyxFQUFPLEdBQ3JDLEdBQUksRUFBTyxNQUFRLEVBQU8sS0FBSyxPQUFRLENBRXJDLEdBQ0ksR0FEQSxFQUFLLEVBQUksR0FDTixFQUFJLEVBQU8sS0FBSyxPQUFTLENBQ2hDLEtBQUssRUFBSSxFQUFHLEVBQUksRUFBRyxJQUNqQixFQUFLLEVBQUcsRUFBTyxLQUFLLEdBRXRCLFFBQVEsRUFBTyxNQUNiLElBQUssSUFDSCxFQUFrQixFQUFHLEVBQU8sS0FBSyxJQUFLLEVBQU8sTUFBTyxFQUFPLEtBQzNELE1BQ0YsS0FBSyxJQUNILEVBQUcsRUFBTyxLQUFLLElBQU0sRUFBTyxHQUM1QixNQUNGLEtBQUssSUFDSCxFQUFHLEVBQU8sS0FBSyxJQUFNLEVBQU8sR0FDNUIsTUFDRixLQUFLLFVBQ0ksR0FBRyxFQUFPLEtBQUssU0FLMUIsUUFBUSxFQUFPLE1BQ2IsSUFBSyxJQUNILEVBQWtCLEVBQUksR0FBUSxFQUFPLE1BQU8sRUFBTyxLQUNuRCxNQUNGLEtBQUssSUFDSCxFQUFJLEdBQVMsRUFBTyxHQUNwQixNQUNGLEtBQUssSUFDSCxFQUFJLEdBQVMsRUFBTyxHQUNwQixNQUNGLEtBQUssSUFDSCxFQUFNLEVBQVksRUFBSyxHQUk3QixNQUFPLEdBR1QsUUFBUyxHQUFhLEVBQVEsRUFBUSxHQUNwQyxHQUFJLEdBQVUsR0FBVSxHQUFVLEVBQU8sS0FBTSxDQUM3QyxHQUNJLEdBQUcsRUFESCxFQUFLLENBR1QsS0FEQSxFQUFJLEVBQU8sS0FBSyxPQUFTLEVBQ3BCLEVBQUksRUFBRyxFQUFJLEVBQUcsSUFDaUIsbUJBQXZCLEdBQUcsRUFBTyxLQUFLLE1BQ3hCLEVBQUcsRUFBTyxLQUFLLFFBRWpCLEVBQUssRUFBRyxFQUFPLEtBQUssR0FFdEIsUUFBUSxFQUFPLE1BQ2IsSUFBSyxJQUdILEVBQWtCLEVBQUcsRUFBTyxLQUFLLElBQUssRUFBTyxNQUFPLEVBQU8sS0FDM0QsTUFDRixLQUFLLElBRUgsRUFBRyxFQUFPLEtBQUssSUFBTSxFQUFPLEdBQzVCLE1BQ0YsS0FBSyxJQUVILEVBQUcsRUFBTyxLQUFLLElBQU0sRUFBTyxHQUM1QixNQUNGLEtBQUssVUFFSSxHQUFHLEVBQU8sS0FBSyxNQU05QixRQUFTLEdBQVUsRUFBUSxFQUFRLEdBQ2pDLEdBQUksR0FBVSxFQUFRLENBQ3BCLEdBQUksR0FBVyxTQUFTLEdBQ2pCLElBQVUsRUFBTyxFQUFRLEVBQVEsSUFDcEMsRUFBWSxFQUFRLEVBQVEsR0FHaEMsR0FBUyxFQUFRLEVBQVEsSUEvVjdCLEdBQUksR0FBUSxFQUFVLElBNll0QixPQTNZRSxHQURvQixnQkFBWCxTQUF1QixPQUN2QixPQUNrQixtQkFBWCxRQUNQLFVBSVgsRUFBVyxFQUFPLFNBQ2QsR0FDRixFQUFtQixLQUNqQixXQUNNLG1CQUF1QixJQUFZLEVBQU8sV0FBYSxJQUN6RCxFQUFPLFNBQVcsRUFDbEIsRUFBVyxLQTBDbkIsRUFBUyxFQUFVLEdBU25CLEVBQVMsRUFBUyxHQVNsQixFQUFTLEVBQWEsR0FhdEIsRUFBUyxFQUFXLEdBNFFwQixPQUFPLGlCQUFpQixHQUV0QixNQUNFLE1BQU8sRUFDUCxZQUFZLEdBRWQsZ0JBQ0UsTUFBTyxFQUNQLFlBQVksR0FFZCxXQUNFLE1BQU8sRUFDUCxZQUFZLEdBRWQsYUFDRSxNQUFPLEVBQ1AsWUFBWSxHQUVkLGNBQ0UsTUFBTyxFQUNQLFlBQVksR0FFZCxZQUNFLE1BQU8sV0FDTCxNQUFPLG1CQUF1QixJQUVoQyxZQUFZLEdBRWQsWUFDRSxNQUFPLFdBT0wsTUFOSSxLQUNGLEVBQW1CLFFBQVEsU0FBUyxHQUNsQyxNQUVGLEVBQXFCLE1BRWhCLEdBRVQsWUFBWSxLQUlUOzs7OztBQ3BhVCxHQUFJLGVBQWdCLFFBQVEsc0JBRTVCLFFBQU8sUUFBVSxjQUFjLFVBQVU7OztBQ0Z6QyxPQUFPLFFBQVUsU0FBdUIsR0FpQ3RDLFFBQVMsR0FBWSxHQUNuQixNQUFPLEdBQUssT0FBTyxFQUFLLEdBQUcsS0FBSyxJQUdsQyxRQUFTLEdBQVEsR0FDZixRQUFTLEVBQUssR0FyQ2hCLEdBQUksS0FDQSxPQUFRLHNCQUNSLFNBQVUscURBQ1YsUUFBUyw4QkFDVCxVQUFXLGdDQUNYLFFBQVMsOEJBQ1QsUUFBUyw2QkFDVCxLQUFNLDRDQUNOLEtBQU0sd0NBQ04sS0FBTSxpQkFDTixPQUFRLHNDQUNSLFVBQVcsd0JBQ1gsTUFBTywrQkFDUCxNQUFRLGlDQUNSLFNBQVUsaUNBR1YsRUFBSSxFQUFHLElBQ1gsS0FBSyxFQUFJLEVBQUcsRUFBSSxFQUFTLE9BQVEsSUFDL0IsRUFBUyxHQUFLLEVBQVksRUFBUyxJQUMvQixFQUFRLEVBQVMsS0FDbkIsRUFBTyxLQUFLLEVBQVMsR0FPekIsS0FIQSxHQUFJLEdBQVEsRUFBTyxHQUNmLEVBQVEsR0FBUyxFQUFNLEdBQUcsTUFBTSxRQUFRLE1BQU0sRUFBRSxHQUU3QyxHQUFTLEVBQU0sT0FBUyxHQUM3QixFQUFNLEtBQUssSUFZYixRQUNFLEtBQU0sR0FBUyxFQUFNLEdBQ3JCLFFBQVMsR0FBUyxFQUFNLEtBQUs7OztBQzVDakMsWUFNQSxTQUFTLE9BQU8sR0FDZCxHQUFJLEdBQVEsU0FBUyxVQUNyQixPQUFjLGFBQVYsR0FBa0MsZ0JBQVYsRUFDbkIsV0FBVyxFQUFVLE9BRzlCLFVBQVMsaUJBQWlCLG1CQUFvQixXQUM1QyxNQUlKLFFBQVMsU0FmVCxHQUFJLFVBQVcsUUFBUSxrQkFFdkIsUUFBTyxRQUFVLFNBQVMsaUJBQW1CLE1BQVE7OztDQ0puRCxXQUNELFlBcUJBLFNBQVMsR0FBVSxFQUFPLEdBdUZ6QixRQUFTLEdBQUssRUFBUSxHQUNyQixNQUFPLFlBQWEsTUFBTyxHQUFPLE1BQU0sRUFBUyxZQXZGbEQsR0FBSSxFQWlGSixJQS9FQSxFQUFVLE1BT1YsS0FBSyxlQUFnQixFQVFyQixLQUFLLG1CQUFxQixFQVExQixLQUFLLGNBQWdCLEtBUXJCLEtBQUssWUFBYyxFQVFuQixLQUFLLFlBQWMsRUFRbkIsS0FBSyxvQkFBc0IsRUFRM0IsS0FBSyxjQUFnQixFQUFRLGVBQWlCLEdBUTlDLEtBQUssTUFBUSxFQU9iLEtBQUssU0FBVyxFQUFRLFVBQVksSUFPcEMsS0FBSyxXQUFhLEVBQVEsWUFBYyxLQUVwQyxFQUFVLFVBQVUsR0FBeEIsQ0FZQSxJQUFLLEdBRkQsSUFBVyxVQUFXLFVBQVcsZUFBZ0IsY0FBZSxhQUFjLGlCQUM5RSxFQUFVLEtBQ0wsRUFBSSxFQUFHLEVBQUksRUFBUSxPQUFRLEVBQUksRUFBRyxJQUMxQyxFQUFRLEVBQVEsSUFBTSxFQUFLLEVBQVEsRUFBUSxJQUFLLEVBSTdDLEtBQ0gsRUFBTSxpQkFBaUIsWUFBYSxLQUFLLFNBQVMsR0FDbEQsRUFBTSxpQkFBaUIsWUFBYSxLQUFLLFNBQVMsR0FDbEQsRUFBTSxpQkFBaUIsVUFBVyxLQUFLLFNBQVMsSUFHakQsRUFBTSxpQkFBaUIsUUFBUyxLQUFLLFNBQVMsR0FDOUMsRUFBTSxpQkFBaUIsYUFBYyxLQUFLLGNBQWMsR0FDeEQsRUFBTSxpQkFBaUIsWUFBYSxLQUFLLGFBQWEsR0FDdEQsRUFBTSxpQkFBaUIsV0FBWSxLQUFLLFlBQVksR0FDcEQsRUFBTSxpQkFBaUIsY0FBZSxLQUFLLGVBQWUsR0FLckQsTUFBTSxVQUFVLDJCQUNwQixFQUFNLG9CQUFzQixTQUFTLEVBQU0sRUFBVSxHQUNwRCxHQUFJLEdBQU0sS0FBSyxVQUFVLG1CQUNaLFdBQVQsRUFDSCxFQUFJLEtBQUssRUFBTyxFQUFNLEVBQVMsVUFBWSxFQUFVLEdBRXJELEVBQUksS0FBSyxFQUFPLEVBQU0sRUFBVSxJQUlsQyxFQUFNLGlCQUFtQixTQUFTLEVBQU0sRUFBVSxHQUNqRCxHQUFJLEdBQU0sS0FBSyxVQUFVLGdCQUNaLFdBQVQsRUFDSCxFQUFJLEtBQUssRUFBTyxFQUFNLEVBQVMsV0FBYSxFQUFTLFNBQVcsU0FBUyxHQUNuRSxFQUFNLG9CQUNWLEVBQVMsS0FFUCxHQUVKLEVBQUksS0FBSyxFQUFPLEVBQU0sRUFBVSxLQVFOLGtCQUFsQixHQUFNLFVBSWhCLEVBQWEsRUFBTSxRQUNuQixFQUFNLGlCQUFpQixRQUFTLFNBQVMsR0FDeEMsRUFBVyxLQUNULEdBQ0gsRUFBTSxRQUFVLE9BU2xCLEdBQUksR0FBdUIsVUFBVSxVQUFVLFFBQVEsa0JBQW9CLEVBT3ZFLEVBQWtCLFVBQVUsVUFBVSxRQUFRLFdBQWEsSUFBTSxFQVFqRSxFQUFjLGlCQUFpQixLQUFLLFVBQVUsYUFBZSxFQVE3RCxFQUFlLEdBQWdCLGdCQUFpQixLQUFLLFVBQVUsV0FRL0QsRUFBMkIsR0FBZ0IsY0FBZSxLQUFLLFVBQVUsV0FPekUsRUFBdUIsVUFBVSxVQUFVLFFBQVEsUUFBVSxDQVFqRSxHQUFVLFVBQVUsV0FBYSxTQUFTLEdBQ3pDLE9BQVEsRUFBTyxTQUFTLGVBR3hCLElBQUssU0FDTCxJQUFLLFNBQ0wsSUFBSyxXQUNKLEdBQUksRUFBTyxTQUNWLE9BQU8sQ0FHUixNQUNELEtBQUssUUFHSixHQUFLLEdBQStCLFNBQWhCLEVBQU8sTUFBb0IsRUFBTyxTQUNyRCxPQUFPLENBR1IsTUFDRCxLQUFLLFFBQ0wsSUFBSyxTQUNMLElBQUssUUFDSixPQUFPLEVBR1IsTUFBUSxpQkFBa0IsS0FBSyxFQUFPLFlBVXZDLEVBQVUsVUFBVSxXQUFhLFNBQVMsR0FDekMsT0FBUSxFQUFPLFNBQVMsZUFDeEIsSUFBSyxXQUNKLE9BQU8sQ0FDUixLQUFLLFNBQ0osT0FBUSxDQUNULEtBQUssUUFDSixPQUFRLEVBQU8sTUFDZixJQUFLLFNBQ0wsSUFBSyxXQUNMLElBQUssT0FDTCxJQUFLLFFBQ0wsSUFBSyxRQUNMLElBQUssU0FDSixPQUFPLEVBSVIsT0FBUSxFQUFPLFdBQWEsRUFBTyxRQUNwQyxTQUNDLE1BQVEsaUJBQWtCLEtBQUssRUFBTyxhQVd4QyxFQUFVLFVBQVUsVUFBWSxTQUFTLEVBQWUsR0FDdkQsR0FBSSxHQUFZLENBR1osVUFBUyxlQUFpQixTQUFTLGdCQUFrQixHQUN4RCxTQUFTLGNBQWMsT0FHeEIsRUFBUSxFQUFNLGVBQWUsR0FHN0IsRUFBYSxTQUFTLFlBQVksZUFDbEMsRUFBVyxlQUFlLEtBQUssbUJBQW1CLElBQWdCLEdBQU0sRUFBTSxPQUFRLEVBQUcsRUFBTSxRQUFTLEVBQU0sUUFBUyxFQUFNLFFBQVMsRUFBTSxTQUFTLEdBQU8sR0FBTyxHQUFPLEVBQU8sRUFBRyxNQUNwTCxFQUFXLHFCQUFzQixFQUNqQyxFQUFjLGNBQWMsSUFHN0IsRUFBVSxVQUFVLG1CQUFxQixTQUFTLEdBR2pELE1BQUksSUFBMkQsV0FBeEMsRUFBYyxRQUFRLGNBQ3JDLFlBR0QsU0FPUixFQUFVLFVBQVUsTUFBUSxTQUFTLEdBQ3BDLEdBQUksRUFHQSxJQUFlLEVBQWMsbUJBQTRELElBQXZDLEVBQWMsS0FBSyxRQUFRLFNBQXdDLFNBQXZCLEVBQWMsTUFBMEMsVUFBdkIsRUFBYyxNQUNoSixFQUFTLEVBQWMsTUFBTSxPQUM3QixFQUFjLGtCQUFrQixFQUFRLElBRXhDLEVBQWMsU0FVaEIsRUFBVSxVQUFVLG1CQUFxQixTQUFTLEdBQ2pELEdBQUksR0FBYyxDQU1sQixJQUpBLEVBQWUsRUFBYyx1QkFJeEIsSUFBaUIsRUFBYSxTQUFTLEdBQWdCLENBQzNELEVBQWdCLENBQ2hCLEdBQUcsQ0FDRixHQUFJLEVBQWMsYUFBZSxFQUFjLGFBQWMsQ0FDNUQsRUFBZSxFQUNmLEVBQWMsc0JBQXdCLENBQ3RDLE9BR0QsRUFBZ0IsRUFBYyxvQkFDdEIsR0FJTixJQUNILEVBQWEsdUJBQXlCLEVBQWEsWUFTckQsRUFBVSxVQUFVLGdDQUFrQyxTQUFTLEdBRzlELE1BQUksR0FBWSxXQUFhLEtBQUssVUFDMUIsRUFBWSxXQUdiLEdBVVIsRUFBVSxVQUFVLGFBQWUsU0FBUyxHQUMzQyxHQUFJLEdBQWUsRUFBTyxDQUcxQixJQUFJLEVBQU0sY0FBYyxPQUFTLEVBQ2hDLE9BQU8sQ0FNUixJQUhBLEVBQWdCLEtBQUssZ0NBQWdDLEVBQU0sUUFDM0QsRUFBUSxFQUFNLGNBQWMsR0FFeEIsRUFBYSxDQUloQixHQURBLEVBQVksT0FBTyxlQUNmLEVBQVUsYUFBZSxFQUFVLFlBQ3RDLE9BQU8sQ0FHUixLQUFLLEVBQWMsQ0FVbEIsR0FBSSxFQUFNLFlBQWMsRUFBTSxhQUFlLEtBQUssb0JBRWpELE1BREEsR0FBTSxrQkFDQyxDQUdSLE1BQUssb0JBQXNCLEVBQU0sV0FRakMsS0FBSyxtQkFBbUIsSUFnQjFCLE1BWkEsTUFBSyxlQUFnQixFQUNyQixLQUFLLG1CQUFxQixFQUFNLFVBQ2hDLEtBQUssY0FBZ0IsRUFFckIsS0FBSyxZQUFjLEVBQU0sTUFDekIsS0FBSyxZQUFjLEVBQU0sTUFHcEIsRUFBTSxVQUFZLEtBQUssY0FBaUIsS0FBSyxVQUNqRCxFQUFNLGtCQUdBLEdBVVIsRUFBVSxVQUFVLGNBQWdCLFNBQVMsR0FDNUMsR0FBSSxHQUFRLEVBQU0sZUFBZSxHQUFJLEVBQVcsS0FBSyxhQUVyRCxPQUFJLE1BQUssSUFBSSxFQUFNLE1BQVEsS0FBSyxhQUFlLEdBQVksS0FBSyxJQUFJLEVBQU0sTUFBUSxLQUFLLGFBQWUsR0FjdkcsRUFBVSxVQUFVLFlBQWMsU0FBUyxHQUMxQyxPQUFLLEtBQUssaUJBS04sS0FBSyxnQkFBa0IsS0FBSyxnQ0FBZ0MsRUFBTSxTQUFXLEtBQUssY0FBYyxNQUNuRyxLQUFLLGVBQWdCLEVBQ3JCLEtBQUssY0FBZ0IsT0FHZixJQVVSLEVBQVUsVUFBVSxZQUFjLFNBQVMsR0FHMUMsTUFBNkIsVUFBekIsRUFBYSxRQUNULEVBQWEsUUFJakIsRUFBYSxRQUNULFNBQVMsZUFBZSxFQUFhLFNBS3RDLEVBQWEsY0FBYyx3RkFVbkMsRUFBVSxVQUFVLFdBQWEsU0FBUyxHQUN6QyxHQUFJLEdBQVksRUFBb0IsRUFBZSxFQUFjLEVBQU8sRUFBZ0IsS0FBSyxhQUU3RixLQUFLLEtBQUssY0FDVCxPQUFPLENBSVIsSUFBSyxFQUFNLFVBQVksS0FBSyxjQUFpQixLQUFLLFNBRWpELE1BREEsTUFBSyxpQkFBa0IsR0FDaEIsQ0FHUixJQUFLLEVBQU0sVUFBWSxLQUFLLG1CQUFzQixLQUFLLFdBQ3RELE9BQU8sQ0F5QlIsSUFyQkEsS0FBSyxpQkFBa0IsRUFFdkIsS0FBSyxjQUFnQixFQUFNLFVBRTNCLEVBQXFCLEtBQUssbUJBQzFCLEtBQUssZUFBZ0IsRUFDckIsS0FBSyxtQkFBcUIsRUFNdEIsSUFDSCxFQUFRLEVBQU0sZUFBZSxHQUc3QixFQUFnQixTQUFTLGlCQUFpQixFQUFNLE1BQVEsT0FBTyxZQUFhLEVBQU0sTUFBUSxPQUFPLGNBQWdCLEVBQ2pILEVBQWMsc0JBQXdCLEtBQUssY0FBYyx1QkFHMUQsRUFBZ0IsRUFBYyxRQUFRLGNBQ2hCLFVBQWxCLEdBRUgsR0FEQSxFQUFhLEtBQUssWUFBWSxHQUNkLENBRWYsR0FEQSxLQUFLLE1BQU0sR0FDUCxFQUNILE9BQU8sQ0FHUixHQUFnQixPQUVYLElBQUksS0FBSyxXQUFXLEdBSTFCLE1BQUssR0FBTSxVQUFZLEVBQXNCLEtBQVEsR0FBZSxPQUFPLE1BQVEsUUFBNEIsVUFBbEIsR0FDNUYsS0FBSyxjQUFnQixNQUNkLElBR1IsS0FBSyxNQUFNLEdBQ1gsS0FBSyxVQUFVLEVBQWUsR0FJekIsR0FBaUMsV0FBbEIsSUFDbkIsS0FBSyxjQUFnQixLQUNyQixFQUFNLG1CQUdBLEVBR1IsVUFBSSxHQUFnQixJQUluQixFQUFlLEVBQWMsdUJBQ3pCLEdBQWdCLEVBQWEseUJBQTJCLEVBQWEsY0FPckUsS0FBSyxXQUFXLEtBQ3BCLEVBQU0saUJBQ04sS0FBSyxVQUFVLEVBQWUsS0FHeEIsSUFTUixFQUFVLFVBQVUsY0FBZ0IsV0FDbkMsS0FBSyxlQUFnQixFQUNyQixLQUFLLGNBQWdCLE1BVXRCLEVBQVUsVUFBVSxRQUFVLFNBQVMsR0FHdEMsT0FBSyxLQUFLLGtCQUlOLEVBQU0sdUJBS0wsRUFBTSxnQkFPTixLQUFLLFdBQVcsS0FBSyxnQkFBa0IsS0FBSyxtQkFHNUMsRUFBTSx5QkFDVCxFQUFNLDJCQUlOLEVBQU0sb0JBQXFCLEVBSTVCLEVBQU0sa0JBQ04sRUFBTSxrQkFFQyxPQWdCVCxFQUFVLFVBQVUsUUFBVSxTQUFTLEdBQ3RDLEdBQUksRUFHSixPQUFJLE1BQUssZUFDUixLQUFLLGNBQWdCLEtBQ3JCLEtBQUssZUFBZ0IsR0FDZCxHQUlrQixXQUF0QixFQUFNLE9BQU8sTUFBc0MsSUFBakIsRUFBTSxTQUk1QyxFQUFZLEtBQUssUUFBUSxHQUdwQixJQUNKLEtBQUssY0FBZ0IsTUFJZixJQVNSLEVBQVUsVUFBVSxRQUFVLFdBQzdCLEdBQUksR0FBUSxLQUFLLEtBRWIsS0FDSCxFQUFNLG9CQUFvQixZQUFhLEtBQUssU0FBUyxHQUNyRCxFQUFNLG9CQUFvQixZQUFhLEtBQUssU0FBUyxHQUNyRCxFQUFNLG9CQUFvQixVQUFXLEtBQUssU0FBUyxJQUdwRCxFQUFNLG9CQUFvQixRQUFTLEtBQUssU0FBUyxHQUNqRCxFQUFNLG9CQUFvQixhQUFjLEtBQUssY0FBYyxHQUMzRCxFQUFNLG9CQUFvQixZQUFhLEtBQUssYUFBYSxHQUN6RCxFQUFNLG9CQUFvQixXQUFZLEtBQUssWUFBWSxHQUN2RCxFQUFNLG9CQUFvQixjQUFlLEtBQUssZUFBZSxJQVM5RCxFQUFVLFVBQVksU0FBUyxHQUM5QixHQUFJLEdBQ0EsRUFDQSxFQUNBLENBR0osSUFBbUMsbUJBQXhCLFFBQU8sYUFDakIsT0FBTyxDQU1SLElBRkEsSUFBa0IsbUJBQW1CLEtBQUssVUFBVSxhQUFjLENBQUUsSUFBSSxHQUVyRCxDQUVsQixJQUFJLEVBZ0JILE9BQU8sQ0FiUCxJQUZBLEVBQWUsU0FBUyxjQUFjLHVCQUVwQixDQUVqQixHQUFJLEVBQWEsUUFBUSxRQUFRLHVCQUF3QixFQUN4RCxPQUFPLENBR1IsSUFBSSxFQUFnQixJQUFNLFNBQVMsZ0JBQWdCLGFBQWUsT0FBTyxXQUN4RSxPQUFPLEdBVVgsR0FBSSxJQUNILEVBQW9CLFVBQVUsVUFBVSxNQUFNLCtCQUkxQyxFQUFrQixJQUFNLElBQU0sRUFBa0IsSUFBTSxJQUN6RCxFQUFlLFNBQVMsY0FBYyx5QkFFcEIsQ0FFakIsR0FBSSxFQUFhLFFBQVEsUUFBUSx1QkFBd0IsRUFDeEQsT0FBTyxDQUdSLElBQUksU0FBUyxnQkFBZ0IsYUFBZSxPQUFPLFdBQ2xELE9BQU8sRUFPWCxNQUFrQyxTQUE5QixFQUFNLE1BQU0sZUFBd0QsaUJBQTVCLEVBQU0sTUFBTSxjQUt4RCxJQUFtQixvQkFBb0IsS0FBSyxVQUFVLGFBQWMsQ0FBRSxJQUFJLE1BRXRFLEdBQWtCLEtBR3JCLEVBQWUsU0FBUyxjQUFjLHVCQUNsQyxJQUFpQixFQUFhLFFBQVEsUUFBUSx1QkFBd0IsR0FBTSxTQUFTLGdCQUFnQixhQUFlLE9BQU8sZ0JBT2hHLFNBQTVCLEVBQU0sTUFBTSxhQUFzRCxpQkFBNUIsRUFBTSxNQUFNLGVBY3ZELEVBQVUsT0FBUyxTQUFTLEVBQU8sR0FDbEMsTUFBTyxJQUFJLEdBQVUsRUFBTyxJQUlQLGtCQUFYLFNBQStDLGdCQUFmLFFBQU8sS0FBb0IsT0FBTyxJQUc1RSxPQUFPLFdBQ04sTUFBTyxLQUVvQixtQkFBWCxTQUEwQixPQUFPLFNBQ2xELE9BQU8sUUFBVSxFQUFVLE9BQzNCLE9BQU8sUUFBUSxVQUFZLEdBRTNCLE9BQU8sVUFBWTs7O0FDL3pCckIsUUFBUyxTQUFRLEVBQU0sRUFBVSxHQUM3QixJQUFLLFdBQVcsR0FDWixLQUFNLElBQUksV0FBVSw4QkFHcEIsV0FBVSxPQUFTLElBQ25CLEVBQVUsTUFHYyxtQkFBeEIsU0FBUyxLQUFLLEdBQ2QsYUFBYSxFQUFNLEVBQVUsR0FDUixnQkFBVCxHQUNaLGNBQWMsRUFBTSxFQUFVLEdBRTlCLGNBQWMsRUFBTSxFQUFVLEdBR3RDLFFBQVMsY0FBYSxFQUFPLEVBQVUsR0FDbkMsSUFBSyxHQUFJLEdBQUksRUFBRyxFQUFNLEVBQU0sT0FBUSxFQUFJLEVBQUssSUFDckMsZUFBZSxLQUFLLEVBQU8sSUFDM0IsRUFBUyxLQUFLLEVBQVMsRUFBTSxHQUFJLEVBQUcsR0FLaEQsUUFBUyxlQUFjLEVBQVEsRUFBVSxHQUNyQyxJQUFLLEdBQUksR0FBSSxFQUFHLEVBQU0sRUFBTyxPQUFRLEVBQUksRUFBSyxJQUUxQyxFQUFTLEtBQUssRUFBUyxFQUFPLE9BQU8sR0FBSSxFQUFHLEdBSXBELFFBQVMsZUFBYyxFQUFRLEVBQVUsR0FDckMsSUFBQSxHQUFTLEtBQUssR0FDTixlQUFlLEtBQUssRUFBUSxJQUM1QixFQUFTLEtBQUssRUFBUyxFQUFPLEdBQUksRUFBRyxHQTFDakQsR0FBSSxZQUFhLFFBQVEsY0FFekIsUUFBTyxRQUFVLE9BRWpCLElBQUksVUFBVyxPQUFPLFVBQVUsU0FDNUIsZUFBaUIsT0FBTyxVQUFVOzs7O0FDTHRDLEdBQUksVUFBNkIsbUJBQVgsUUFBeUIsT0FDekIsbUJBQVgsUUFBeUIsVUFDaEMsT0FBUyxRQUFRLGVBRXJCLElBQXdCLG1CQUFiLFVBQ1AsT0FBTyxRQUFVLGFBQ2QsQ0FDSCxHQUFJLE9BQVEsU0FBUyw0QkFFaEIsU0FDRCxNQUFRLFNBQVMsNkJBQStCLFFBR3BELE9BQU8sUUFBVTs7Ozs7O0FDYkMsbUJBQVgsUUFDUCxPQUFPLFFBQVUsT0FDUSxtQkFBWCxRQUNkLE9BQU8sUUFBVSxPQUNNLG1CQUFULE1BQ2QsT0FBTyxRQUFVLEtBRWpCLE9BQU87Ozs7O0FDUFgsT0FBTyxRQUFVLFNBQW9CLEVBQU0sR0FDekMsR0FBSSxHQUFNLEdBQVUsR0FDcEIsT0FBb0IsS0FBaEIsRUFBSyxPQUFxQixHQUM5QixFQUFPLEVBQUssUUFBUSxJQUFLLElBQ3pCLEVBQU8sRUFBSyxRQUFRLE1BQU8sSUFDRixHQUFyQixFQUFLLFFBQVEsT0FBVyxFQUFPLElBQU0sR0FDOUIsS0FBUCxFQUFtQixFQUNYLEVBQUssUUFBUSxFQUFLOzs7QUNDaEMsUUFBUyxxQkFBcUIsR0FDNUIsTUFBTyxVQUFVLEVBQVMsRUFBTyxHQUMvQixJQUFBLEdBQVMsS0FBUSxHQUNYLElBQVEsYUFDVixFQUFNLFVBQVUsSUFBUyxFQUFNLFNBQ3hCLEdBQU0sR0FHakIsT0FBTyxHQUFFLEVBQVMsRUFBTyxJQWhCN0IsT0FBTyxRQUFVLG1CQUVqQixJQUFJLFlBQ0YsTUFBUyxZQUNULElBQU8sVUFDUCxhQUFjOzs7QUMwT2hCLFFBQVMsTUFBTSxHQUNiLE1BQU8sS0FBVSxlQUFpQixJQUFVLGNBSTlDLFFBQVMsS0FBSyxFQUFLLEdBQU8sTUFBTyxRQUFPLEtBQUssRUFBSyxHQWtCbEQsUUFBUyxhQUFhLEdBQU8sTUFBTyxTQUFRLEtBQUssR0F0UWpELEdBQUksWUFBYSxRQUFRLHFDQUVyQixJQUFNLEVBQUcsS0FBTyxFQUFHLEtBQU8sRUFBRyxNQUFRLEVBQUcsS0FBTyxFQUMvQyxTQUFXLEVBQUcsV0FBYSxFQUMzQixhQUFlLEVBQUcsV0FBYSxFQUMvQixjQUFnQixFQUFHLGNBQWdCLEdBQ25DLFFBQVUsR0FBSSxXQUFhLEVBRS9CLFFBQU8sUUFBVSxTQUFVLEVBQUcsR0ErTjVCLFFBQVMsR0FBTyxHQUNkLE1BQWlCLGtCQUFOLEdBQXlCLEVBQ2QsZ0JBQU4sR0FBdUIsRUFDOUIsR0FBa0IsZ0JBQU4sR0FBdUIsRUFDaEMsRUFBTyxHQUFJLEdBbE96QixFQUFJLFdBQVcsR0FDVixJQUFNLEtBQ1gsSUFBSSxHQUFTLEVBQUssUUFBVSxTQUFVLEVBQUcsR0FDdkMsTUFBTyxRQUFPLEdBQUssT0FBTyxHQUc1QixPQUFPLFVBQVUsR0F1SGYsUUFBUyxHQUFPLEdBQ2QsR0FBSSxLQUNBLEtBQVUsZUFBYyxFQUFRLEtBQ3BDLEtBQUssR0FBSSxHQUFJLEVBQUcsRUFBSSxFQUFJLE9BQVEsSUFBSyxDQUNuQyxHQUFJLEdBQUksRUFBSSxPQUFPLEVBQ2YsS0FBVSxNQUFjLE1BQU4sR0FDaEIsRUFBSSxRQUFRLEVBQUksTUFBTSxLQUFNLElBQ2hDLEVBQU0sR0FDTixFQUFRLE1BQ08sTUFBTixHQUFjLEtBQUssR0FXbkIsSUFBVSxLQUNuQixHQUFPLEVBQ0UsSUFBVSxNQUFRLEtBQUssS0FBSyxJQUNyQyxFQUFJLE1BQU0sS0FBTSxJQUNoQixFQUFNLEdBQ04sRUFBUSxNQUNDLElBQVUsS0FDbkIsR0FBTyxFQUNFLElBQVUsTUFBUSxRQUFRLEtBQUssSUFDeEMsRUFBUSxTQUNSLEVBQU0sR0FDRyxJQUFVLE1BQVEsS0FBSyxLQUFLLElBQ2pDLEVBQUksUUFBUSxFQUFJLE1BQU0sU0FBUyxJQUNuQyxFQUFJLE1BQU0sY0FDRCxJQUFVLFVBQVksS0FBSyxLQUFLLElBQ3pDLEVBQUksTUFBTSxTQUFTLElBQ25CLEVBQU0sR0FDTixFQUFRLFlBQ0MsSUFBVSxVQUFrQixNQUFOLEdBQy9CLEVBQUksTUFBTSxTQUFTLElBQU0sVUFDekIsRUFBTSxHQUNOLEVBQVEsY0FDQyxJQUFVLFNBQ25CLEdBQU8sRUFDRyxJQUFVLFlBQWMsSUFBVSxNQUFlLE1BQU4sRUFHM0MsSUFBVSxZQUFjLElBQVUsTUFBVSxLQUFLLEtBQUssR0FNdkQsSUFBVSxjQUFzQixNQUFOLEVBQ25DLEVBQVEsY0FDQyxJQUFVLGNBQXNCLE1BQU4sRUFDbkMsRUFBUSxjQUNDLElBQVUsZUFBdUIsTUFBTixHQUNwQyxFQUFJLE1BQU0sV0FBVyxJQUFNLGFBQzNCLEVBQU0sR0FDTixFQUFRLE1BQ0MsSUFBVSxlQUF1QixNQUFOLEdBQ3BDLEVBQUksTUFBTSxXQUFXLElBQU0sYUFDM0IsRUFBTSxHQUNOLEVBQVEsTUFDQyxJQUFVLGNBQWlCLEtBQUssS0FBSyxHQUdyQyxJQUFVLFlBQWMsS0FBSyxLQUFLLElBQzNDLEVBQUksTUFBTSxXQUFXLElBQU0sYUFDM0IsRUFBTSxHQUNOLEVBQVEsTUFDQyxJQUFVLFlBQWMsSUFBVSxlQUMxQyxJQUFVLGdCQUNYLEdBQU8sSUFSUCxFQUFRLFdBQ1IsTUFuQkEsRUFBSSxNQUFNLGFBQ04sUUFBUSxLQUFLLElBQ2YsR0FBTyxFQUNQLEVBQVEsVUFDSCxFQUFRLE9BUGYsRUFBSSxNQUFNLFVBQ1YsRUFBUSxlQXBDSixJQUFVLEtBQ1osRUFBSSxNQUFNLEtBQUssSUFDTixJQUFVLFNBQ25CLEVBQUksTUFBTSxTQUFTLElBQ1YsSUFBVSxZQUFjLEVBQUksUUFDckMsRUFBSSxNQUFNLFdBQVcsSUFFdkIsRUFBSSxNQUFNLFFBQ1YsRUFBTSxHQUNOLEVBQVEsTUEwRVosTUFoQkksS0FBVSxNQUFRLEVBQUksUUFDeEIsRUFBSSxNQUFNLEtBQUssSUFDZixFQUFNLElBQ0csSUFBVSxZQUFjLEVBQUksUUFDckMsRUFBSSxNQUFNLFdBQVcsSUFDckIsRUFBTSxJQUNHLElBQVUsZUFBaUIsRUFBSSxRQUN4QyxFQUFJLE1BQU0sV0FBVyxJQUNyQixFQUFNLElBQ0csSUFBVSxlQUFpQixFQUFJLFFBQ3hDLEVBQUksTUFBTSxXQUFXLElBQ3JCLEVBQU0sSUFDRyxJQUFVLFdBQ25CLEVBQUksTUFBTSxTQUFTLElBQ25CLEVBQU0sSUFFRCxFQS9NVCxJQUFLLEdBSkQsR0FBUSxLQUFNLEVBQU0sR0FDcEIsRUFBUyxVQUFVLE9BQ25CLEtBRUssRUFBSSxFQUFHLEVBQUksRUFBUSxPQUFRLElBQ2xDLEdBQUksRUFBSSxFQUFTLEVBQUcsQ0FDbEIsR0FBSSxHQUFNLFVBQVUsRUFBRSxHQUNsQixFQUFJLEVBQU0sRUFBUSxJQUNsQixFQUFTLENBQ1QsS0FBVyxnQkFBZSxFQUFTLFlBQ25DLElBQVcsZ0JBQWUsRUFBUyxZQUNuQyxJQUFXLGVBQWMsRUFBUyxZQUNsQyxJQUFXLE9BQU0sRUFBUyxVQUM5QixFQUFFLE1BQU8sSUFBSyxFQUFRLElBQ3RCLEVBQU0sS0FBSyxNQUFNLEVBQU8sT0FDbkIsR0FBTSxLQUFLLE1BQU0sRUFBTyxFQUFNLEVBQVEsSUFLL0MsS0FBSyxHQUZELElBQVEsWUFDUixJQUFVLEdBQUssSUFDVixFQUFJLEVBQUcsRUFBSSxFQUFNLE9BQVEsSUFBSyxDQUNyQyxHQUFJLEdBQU0sRUFBTSxFQUFNLE9BQU8sR0FBRyxHQUM1QixFQUFJLEVBQU0sR0FBSSxFQUFJLEVBQUUsRUFDeEIsSUFBSSxJQUFNLE1BQVEsTUFBTSxLQUFLLEVBQUUsSUFBSyxDQUNsQyxHQUFJLEdBQUssRUFBTSxFQUFNLE9BQU8sR0FBRyxFQUMzQixHQUFNLE9BQVMsSUFDakIsRUFBTSxNQUNOLEVBQU0sRUFBTSxPQUFPLEdBQUcsR0FBRyxHQUFHLEdBQU0sRUFDaEMsRUFBSSxHQUFJLEVBQUksR0FBSSxFQUFJLEdBQUcsT0FBUyxFQUFJLEdBQUssYUFHeEMsSUFBSSxJQUFNLEtBQU0sQ0FDckIsR0FBSSxJQUFLLEVBQUUsU0FDWCxHQUFJLEdBQUcsS0FBSyxHQUNaLEVBQU0sTUFBTSxFQUFFLEVBQUksR0FBRyxPQUFPLFFBQ3ZCLElBQUksSUFBTSxVQUFhLElBQU0sS0FBTyxFQUFFLEtBQU8sU0FBVyxDQUc3RCxJQUZBLEdBQ0ksR0FEQSxFQUFNLEdBRUgsRUFBSSxFQUFNLE9BQVEsSUFDdkIsR0FBSSxFQUFNLEdBQUcsS0FBTyxTQUNsQixFQUFNLEVBQU8sRUFBSyxFQUFNLEdBQUcsUUFDdEIsQ0FBQSxHQUFJLEVBQU0sR0FBRyxLQUFPLEtBQU8sRUFBTSxHQUFHLEtBQU8sU0FVM0MsS0FUTCxJQUEyQixnQkFBaEIsR0FBTSxHQUFHLElBQW9CLEVBT3RDLEVBQU0sRUFBTyxFQUFLLEVBQU0sR0FBRyxRQU4zQixLQUFLLElBQVcsR0FBTSxHQUFHLEdBQ25CLEVBQU0sR0FBRyxHQUFHLGVBQWUsS0FBYSxFQUFJLEdBQUcsS0FDakQsRUFBSSxHQUFHLEdBQVcsRUFBTSxHQUFHLEdBQUcsSUFRcEMsRUFBTSxHQUFHLEtBQU8sU0FBUyxHQUU3QixLQURBLEdBQUksR0FBSSxFQUNELEVBQUksRUFBTSxPQUFRLElBQ3ZCLEdBQUksRUFBTSxHQUFHLEtBQU8sWUFBYyxFQUFNLEdBQUcsS0FBTyxTQUMzQyxFQUFJLEdBQUcsR0FDUCxFQUFJLEdBQUcsR0FBTyxFQUFPLEVBQUksR0FBRyxHQUFNLEVBQU0sR0FBRyxJQUQ5QixFQUFJLEdBQUcsR0FBTyxFQUFNLEVBQU0sR0FBRyxRQUUxQyxDQUFBLEdBQUksRUFBTSxHQUFHLEtBQU8sS0FDdkIsRUFBTSxHQUFHLEtBQU8sWUFBYyxFQUFNLEdBQUcsS0FBTyxTQUczQyxFQUNELEVBQUksUUFBVyxFQUFJLEdBQUcsSUFBUSxJQUFNLEdBQ3BDLEVBQU0sR0FBRyxLQUFPLE9BQVMsRUFBTSxHQUFHLEtBQU8sYUFHM0MsRUFBSSxHQUFHLEdBQU8sRUFBSSxjQUVwQixPQVRLLEVBQUksR0FBRyxHQUNQLEVBQUksR0FBRyxHQUFPLEVBQU8sRUFBSSxHQUFHLEdBQU0sRUFBTSxHQUFHLElBRDlCLEVBQUksR0FBRyxHQUFPLEVBQU0sRUFBTSxHQUFHLFNBWTlDLElBQUksSUFBTSxTQUNmLEVBQUksR0FBRyxFQUFFLEtBQU0sTUFDVixJQUFJLElBQU0sS0FBTyxFQUFFLEtBQU8sU0FDL0IsRUFBSSxHQUFHLEVBQUUsS0FBTSxNQUNWLElBQUksSUFBTSxPQUNmLEdBQUksWUFBWSxFQUFJLEtBQU8sRUFBTSxPQUFRLENBQ3ZDLEdBQUksR0FBSyxFQUFNLEVBQU0sT0FBTyxHQUFHLEVBQy9CLEdBQU0sTUFDTixFQUFNLEVBQU0sT0FBTyxHQUFHLEdBQUcsR0FBRyxHQUFNLEVBQ2hDLEVBQUksR0FBSSxFQUFJLEdBQUksRUFBSSxHQUFHLE9BQVMsRUFBSSxHQUFLLGFBR3hDLElBQUksSUFBTSxLQUFPLEVBQUUsS0FBTyxLQUNsQixTQUFULEVBQUUsSUFBNkIsT0FBVCxFQUFFLEdBQWEsRUFBRSxHQUFLLEdBQ3RDLEVBQUUsS0FBSSxFQUFFLEdBQUssRUFBTyxHQUFJLEVBQUUsS0FDaEMsTUFBTSxRQUFRLEVBQUUsR0FBRyxJQUNyQixFQUFJLEdBQUcsS0FBSyxNQUFNLEVBQUksR0FBSSxFQUFFLElBRTVCLEVBQUksR0FBRyxLQUFLLEVBQUUsUUFFWCxJQUFJLElBQU0sS0FDZixFQUFJLEdBQUcsS0FBSyxFQUFFLFFBQ1QsSUFBSSxJQUFNLFNBQVcsSUFBTSxXQUdoQyxLQUFNLElBQUksT0FBTSxjQUFnQixHQVFwQyxHQUpJLEVBQUssR0FBRyxPQUFTLEdBQUssUUFBUSxLQUFLLEVBQUssR0FBRyxLQUM3QyxFQUFLLEdBQUcsUUFHTixFQUFLLEdBQUcsT0FBUyxHQUNFLElBQW5CLEVBQUssR0FBRyxRQUFnQixLQUFLLEtBQUssRUFBSyxHQUFHLElBQzVDLEtBQU0sSUFBSSxPQUNSLDZEQU9KLE9BSkksT0FBTSxRQUFRLEVBQUssR0FBRyxLQUFnQyxnQkFBbEIsR0FBSyxHQUFHLEdBQUcsSUFDaEQsTUFBTSxRQUFRLEVBQUssR0FBRyxHQUFHLE1BQzFCLEVBQUssR0FBRyxHQUFLLEVBQUUsRUFBSyxHQUFHLEdBQUcsR0FBSSxFQUFLLEdBQUcsR0FBRyxHQUFJLEVBQUssR0FBRyxHQUFHLEtBRW5ELEVBQUssR0FBRyxJQStHbkIsSUFBSSxRQUFTLE9BQU8sVUFBVSxlQUcxQixRQUFVLE9BQU8sTUFDbkIsT0FBUSxPQUFRLFdBQVksVUFBVyxLQUFNLE1BQU8sVUFBVyxRQUMvRCxRQUFTLEtBQU0sTUFBTyxRQUFTLFVBQVcsU0FBVSxPQUFRLE9BQVEsUUFDcEUsU0FBVSxRQUFTLE1BRW5CLFVBQVcsbUJBQW9CLFNBQVUsU0FBVSxPQUFRLFVBQzNELFVBQVcsZ0JBQWlCLGNBQzVCLG1CQUFvQixvQkFBcUIsb0JBQ3pDLGlCQUFrQixVQUFXLFVBQVcsVUFBVyxVQUFXLFVBQzlELGlCQUFrQixVQUFXLGNBQWUsZUFDNUMsV0FBWSxlQUFnQixxQkFBc0IsY0FBZSxTQUNqRSxlQUFnQixtQkFBb0IsaUJBQWtCLGdCQUN0RCxRQUFTLFdBQVksUUFBUyxRQUFTLE9BQVEsZ0JBQWlCLFFBQ2hFLE9BQVEsVUFBVyxXQUFZLE9BQVEsTUFBTyxPQUFRLE9BQVEsTUFBTyxPQUNyRSxTQUNBLEtBQUssS0FBTzs7O0FDalFkLFFBQVMsWUFBWSxHQUNuQixHQUFJLEdBQVMsU0FBUyxLQUFLLEVBQzNCLE9BQWtCLHNCQUFYLEdBQ1Usa0JBQVAsSUFBZ0Msb0JBQVgsR0FDVixtQkFBWCxVQUVOLElBQU8sT0FBTyxZQUNkLElBQU8sT0FBTyxPQUNkLElBQU8sT0FBTyxTQUNkLElBQU8sT0FBTyxRQWJwQixPQUFPLFFBQVUsVUFFakIsSUFBSSxVQUFXLE9BQU8sVUFBVTs7O0FDRmhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNpS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pMQSxRQUFTLE9BQU0sRUFBSSxHQUNqQixHQUFJLE9BQVEsTUFBTyxRQUFPLEtBQUssRUFBSSxFQUVuQyxLQUFLLEdBREQsR0FBUSxFQUFHLFdBQVcsaUJBQWlCLEdBQ2xDLEVBQUksRUFBRyxFQUFJLEVBQU0sU0FBVSxFQUNsQyxHQUFJLEVBQU0sSUFBTSxFQUFJLE9BQU8sQ0FFN0IsUUFBTyxFQWpDVCxHQUFJLE9BQVEsUUFBUSxVQU1oQixPQUFTLE1BQU0saUJBQ2QsTUFBTSx1QkFDTixNQUFNLG9CQUNOLE1BQU0sbUJBQ04sTUFBTSxnQkFNWCxRQUFPLFFBQVU7OztBQ3JCakIsWUFrQ0EsU0FBUyxXQUFVLElBQ1YsT0FBUyxJQUFJLGNBQ2QsTUFBUSxJQUFJLGNBQ1osTUFBTSxXQUFXLElBQUksTUFHekIsSUFBSSxFQU9KLE9BTkksUUFBUyxNQUFNLHlCQUNmLEVBQVcsTUFBTSx5QkFBeUIsSUFFMUMsRUFBVyxJQUFJLGNBQWMsUUFDN0IsRUFBUyxVQUFZLEdBRWxCLEVBQVMsV0FBVyxHQUcvQixRQUFTLHFCQUFvQixFQUFRLEVBQU0sR0FDbkMsRUFBTyxLQUFVLEVBQUssS0FDdEIsRUFBTyxHQUFRLEVBQUssR0FDaEIsRUFBTyxHQUNQLEVBQU8sYUFBYSxFQUFNLElBRTFCLEVBQU8sZ0JBQWdCLEVBQU0sS0E0Q3pDLFFBQVMsU0FZVCxRQUFTLGtCQUFpQixFQUFRLEdBQzlCLEdBQUksR0FBZSxFQUFPLFNBQ3RCLEVBQWEsRUFBSyxRQUV0QixPQUFJLEtBQWlCLE1BSWpCLEVBQUssV0FDTCxFQUFhLFdBQVcsR0FBSyxJQUM3QixFQUFXLFdBQVcsR0FBSyxLQUlwQixJQUFpQixFQUFXLGNBZTNDLFFBQVMsaUJBQWdCLEVBQU0sR0FDM0IsTUFBUSxJQUFnQixJQUFpQixTQUVyQyxJQUFJLGdCQUFnQixFQUFjLEdBRGxDLElBQUksY0FBYyxHQVkxQixRQUFTLFlBQVcsRUFBVSxHQUMxQixHQUNJLEdBQ0EsRUFDQSxFQUNBLEVBQ0EsRUFDQSxFQU5BLEVBQVEsRUFBTyxVQVFuQixJQUFJLEVBQU8saUJBQ1AsRUFBTyxpQkFBaUIsT0FFeEIsS0FBSyxFQUFJLEVBQU0sT0FBUyxFQUFHLEdBQUssSUFBSyxFQUNqQyxFQUFPLEVBQU0sR0FDYixFQUFXLEVBQUssS0FDaEIsRUFBbUIsRUFBSyxhQUN4QixFQUFZLEVBQUssTUFFYixHQUNBLEVBQVcsRUFBSyxXQUFhLEVBQzdCLEVBQVksRUFBUyxlQUFlLEVBQWtCLEdBRWxELElBQWMsR0FDZCxFQUFTLGVBQWUsRUFBa0IsRUFBVSxLQUd4RCxFQUFZLEVBQVMsYUFBYSxHQUU5QixJQUFjLEdBQ2QsRUFBUyxhQUFhLEVBQVUsR0FVaEQsS0FGQSxFQUFRLEVBQVMsV0FFWixFQUFJLEVBQU0sT0FBUyxFQUFHLEdBQUssSUFBSyxFQUNqQyxFQUFPLEVBQU0sR0FDVCxFQUFLLGFBQWMsSUFDbkIsRUFBVyxFQUFLLEtBQ2hCLEVBQW1CLEVBQUssYUFFcEIsR0FDQSxFQUFXLEVBQUssV0FBYSxFQUV4QixlQUFlLEVBQVEsRUFBa0IsSUFDMUMsRUFBUyxrQkFBa0IsRUFBa0IsSUFHNUMsZUFBZSxFQUFRLEtBQU0sSUFDOUIsRUFBUyxnQkFBZ0IsSUFVN0MsUUFBUyxjQUFhLEVBQVEsR0FFMUIsSUFEQSxHQUFJLEdBQVcsRUFBTyxXQUNmLEdBQVUsQ0FDYixHQUFJLEdBQVksRUFBUyxXQUN6QixHQUFLLFlBQVksR0FDakIsRUFBVyxFQUVmLE1BQU8sR0FHWCxRQUFTLG1CQUFrQixHQUN2QixNQUFPLEdBQUssR0FHaEIsUUFBUyxVQUFTLEVBQVUsRUFBUSxHQTZCaEMsUUFBUyxHQUFnQixHQUNqQixFQUNBLEVBQWlCLEtBQUssR0FFdEIsR0FBb0IsR0FJNUIsUUFBUyxHQUF3QixFQUFNLEdBQ25DLEdBQUksRUFBSyxXQUFhLGFBRWxCLElBREEsR0FBSSxHQUFXLEVBQUssV0FDYixHQUFVLENBRWIsR0FBSSxHQUFNLE1BRU4sS0FBbUIsRUFBTSxFQUFXLElBR3BDLEVBQWdCLElBS2hCLEVBQWdCLEdBQ1osRUFBUyxZQUNULEVBQXdCLEVBQVUsSUFJMUMsRUFBVyxFQUFTLGFBYWhDLFFBQVMsR0FBVyxFQUFNLEVBQVksR0FDOUIsRUFBc0IsTUFBVSxJQUloQyxHQUNBLEVBQVcsWUFBWSxHQUczQixFQUFnQixHQUNoQixFQUF3QixFQUFNLElBK0JsQyxRQUFTLEdBQVUsR0FDZixHQUFJLEVBQUssV0FBYSxhQUVsQixJQURBLEdBQUksR0FBVyxFQUFLLFdBQ2IsR0FBVSxDQUNiLEdBQUksR0FBTSxFQUFXLEVBQ2pCLEtBQ0EsRUFBZ0IsR0FBTyxHQUkzQixFQUFVLEdBRVYsRUFBVyxFQUFTLGFBT2hDLFFBQVMsR0FBZ0IsR0FDckIsRUFBWSxFQUdaLEtBREEsR0FBSSxHQUFXLEVBQUcsV0FDWCxHQUFVLENBQ2IsR0FBSSxHQUFjLEVBQVMsWUFFdkIsRUFBTSxFQUFXLEVBQ3JCLElBQUksRUFBSyxDQUNMLEdBQUksR0FBa0IsRUFBZ0IsRUFDbEMsSUFBbUIsaUJBQWlCLEVBQVUsS0FDOUMsRUFBUyxXQUFXLGFBQWEsRUFBaUIsR0FDbEQsRUFBUSxFQUFpQixJQUlqQyxFQUFnQixHQUNoQixFQUFXLEdBSW5CLFFBQVMsR0FBUSxFQUFRLEVBQU0sR0FDM0IsR0FDSSxHQURBLEVBQVUsRUFBVyxFQVN6QixJQU5JLFNBR08sR0FBZ0IsSUFHdkIsRUFBTyxhQUFjLEVBQU8sV0FBVyxHQUEzQyxDQUlBLElBQUssRUFBYyxDQUNmLEdBQUksRUFBa0IsRUFBUSxNQUFVLEVBQ3BDLE1BTUosSUFIQSxXQUFXLEVBQVEsR0FDbkIsRUFBWSxHQUVSLEVBQTBCLEVBQVEsTUFBVSxFQUM1QyxPQUlSLEdBQXdCLGFBQXBCLEVBQU8sU0FBeUIsQ0FDaEMsR0FFSSxHQUVBLEVBQ0EsRUFDQSxFQU5BLEVBQWlCLEVBQUssV0FDdEIsRUFBbUIsRUFBTyxVQU85QixHQUFPLEtBQU8sR0FBZ0IsQ0FJMUIsSUFIQSxFQUFnQixFQUFlLFlBQy9CLEVBQWUsRUFBVyxHQUVuQixHQUFrQixDQUdyQixHQUZBLEVBQWtCLEVBQWlCLFlBRS9CLEVBQWUsWUFBYyxFQUFlLFdBQVcsR0FBbUIsQ0FDMUUsRUFBaUIsRUFDakIsRUFBbUIsQ0FDbkIsU0FBQSxHQUdKLEVBQWlCLEVBQVcsRUFFNUIsSUFBSSxHQUFrQixFQUFpQixTQUVuQyxFQUFlLE1Bd0VuQixJQXRFSSxJQUFvQixFQUFlLFdBQy9CLElBQW9CLGNBR2hCLEVBR0ksSUFBaUIsS0FJWixFQUFpQixFQUFnQixJQUM5QixFQUFpQixjQUFnQixFQU1qQyxHQUFlLEdBU2YsRUFBTyxhQUFhLEVBQWdCLEdBRWhDLEVBR0EsRUFBZ0IsR0FJaEIsRUFBVyxFQUFrQixHQUFRLEdBR3pDLEVBQWtCLEVBQWlCLFlBQ25DLEVBQW1CLEdBS3ZCLEdBQWUsR0FHaEIsSUFFUCxHQUFlLEdBR25CLEVBQWUsS0FBaUIsR0FBUyxpQkFBaUIsRUFBa0IsR0FDeEUsR0FJQSxFQUFRLEVBQWtCLElBR3ZCLElBQW9CLFdBQWEsR0FBbUIsZUFFM0QsR0FBZSxFQUdmLEVBQWlCLFVBQVksRUFBZSxZQUloRCxFQUFjLENBRWQsRUFBaUIsRUFDakIsRUFBbUIsQ0FDbkIsU0FBQSxHQVNBLEVBR0EsRUFBZ0IsR0FJaEIsRUFBVyxFQUFrQixHQUFRLEdBR3pDLEVBQW1CLEVBT3ZCLEdBQUksSUFBaUIsRUFBaUIsRUFBZ0IsS0FBa0IsaUJBQWlCLEVBQWdCLEdBQ3JHLEVBQU8sWUFBWSxHQUNuQixFQUFRLEVBQWdCLE9BQ3JCLENBQ0gsR0FBSSxHQUEwQixFQUFrQixFQUM1QyxNQUE0QixJQUN4QixJQUNBLEVBQWlCLEdBR2pCLEVBQWUsWUFDZixFQUFpQixFQUFlLFVBQVUsRUFBTyxlQUFpQixNQUV0RSxFQUFPLFlBQVksR0FDbkIsRUFBZ0IsSUFJeEIsRUFBaUIsRUFDakIsRUFBbUIsRUFNdkIsS0FBTyxHQUNILEVBQWtCLEVBQWlCLGFBQzlCLEVBQWlCLEVBQVcsSUFHN0IsRUFBZ0IsR0FJaEIsRUFBVyxFQUFrQixHQUFRLEdBRXpDLEVBQW1CLEVBSTNCLEdBQUksR0FBbUIsa0JBQWtCLEVBQU8sU0FDNUMsSUFDQSxFQUFpQixFQUFRLElBeFZqQyxHQUpLLElBQ0QsTUFHa0IsZ0JBQVgsR0FDUCxHQUEwQixjQUF0QixFQUFTLFVBQWtELFNBQXRCLEVBQVMsU0FBcUIsQ0FDbkUsR0FBSSxHQUFhLENBQ2pCLEdBQVMsSUFBSSxjQUFjLFFBQzNCLEVBQU8sVUFBWSxNQUVuQixHQUFTLFVBQVUsRUFJM0IsSUFZSSxHQVpBLEVBQWEsRUFBUSxZQUFjLGtCQUNuQyxFQUFvQixFQUFRLG1CQUFxQixLQUNqRCxFQUFjLEVBQVEsYUFBZSxLQUNyQyxFQUFvQixFQUFRLG1CQUFxQixLQUNqRCxFQUFjLEVBQVEsYUFBZSxLQUNyQyxFQUF3QixFQUFRLHVCQUF5QixLQUN6RCxFQUFrQixFQUFRLGlCQUFtQixLQUM3QyxFQUE0QixFQUFRLDJCQUE2QixLQUNqRSxFQUFlLEVBQVEsZ0JBQWlCLEVBR3hDLElBdUdKLEdBQVUsRUFnT1YsSUFBSSxHQUFjLEVBQ2QsRUFBa0IsRUFBWSxTQUM5QixFQUFhLEVBQU8sUUFFeEIsS0FBSyxFQUdELEdBQUksSUFBb0IsYUFDaEIsSUFBZSxhQUNWLGlCQUFpQixFQUFVLEtBQzVCLEVBQWdCLEdBQ2hCLEVBQWMsYUFBYSxFQUFVLGdCQUFnQixFQUFPLFNBQVUsRUFBTyxnQkFJakYsRUFBYyxNQUVmLElBQUksSUFBb0IsV0FBYSxJQUFvQixhQUFjLENBQzFFLEdBQUksSUFBZSxFQUVmLE1BREEsR0FBWSxVQUFZLEVBQU8sVUFDeEIsQ0FHUCxHQUFjLEVBSzFCLEdBQUksSUFBZ0IsRUFHaEIsRUFBZ0IsT0FTaEIsSUFQQSxFQUFRLEVBQWEsRUFBUSxHQU96QixFQUNBLElBQUssR0FBSSxHQUFFLEVBQUcsRUFBSSxFQUFpQixPQUFRLEVBQUUsRUFBSyxJQUFLLENBQ25ELEdBQUksR0FBYSxFQUFnQixFQUFpQixHQUM5QyxJQUNBLEVBQVcsRUFBWSxFQUFXLFlBQVksR0FrQjlELE9BWkssR0FBZ0IsSUFBZ0IsR0FBWSxFQUFTLGFBQ2xELEVBQVksWUFDWixFQUFjLEVBQVksVUFBVSxFQUFTLGVBQWlCLE1BT2xFLEVBQVMsV0FBVyxhQUFhLEVBQWEsSUFHM0MsRUFyb0JYLEdBQUksT0FFQSxJQUEwQixtQkFBYixXQUE0QixTQUV6QyxPQUFTLElBQ1QsSUFBSSxNQUFRLElBQUksY0FBYyxVQUc5QixTQUFXLCtCQUVYLGFBQWUsRUFDZixVQUFZLEVBQ1osYUFBZSxFQUlmLGNBR0EsZ0JBREEsT0FBTyxlQUNVLFNBQVMsRUFBSSxFQUFjLEdBQ3hDLE1BQU8sR0FBRyxlQUFlLEVBQWMsSUFFcEMsT0FBTyxhQUNHLFNBQVMsRUFBSSxFQUFjLEdBQ3hDLE1BQU8sR0FBRyxhQUFhLElBR1YsU0FBUyxFQUFJLEVBQWMsR0FDeEMsUUFBUyxFQUFHLGlCQUFpQixHQStCckMsSUFBSSxvQkFLQSxPQUFRLFNBQVMsRUFBUSxHQUNyQixvQkFBb0IsRUFBUSxFQUFNLGFBUXRDLE1BQU8sU0FBUyxFQUFRLEdBQ3BCLG9CQUFvQixFQUFRLEVBQU0sV0FDbEMsb0JBQW9CLEVBQVEsRUFBTSxZQUU5QixFQUFPLFFBQVUsRUFBSyxRQUN0QixFQUFPLE1BQVEsRUFBSyxPQUduQixlQUFlLEVBQU0sS0FBTSxVQUM1QixFQUFPLGdCQUFnQixVQUkvQixTQUFVLFNBQVMsRUFBUSxHQUN2QixHQUFJLEdBQVcsRUFBSyxLQUNoQixHQUFPLFFBQVUsSUFDakIsRUFBTyxNQUFRLEdBR2YsRUFBTyxhQUNQLEVBQU8sV0FBVyxVQUFZLElBMmlCMUMsUUFBTyxRQUFVOzs7QUNub0JqQixRQUFTLFNBQVMsRUFBUSxHQUluQixJQUFPLEVBQU0sT0FBTyxzQkFFekIsSUFBSSxJQUF5QixFQUN6QixHQUFrQixFQUNsQixFQUFlLElBSW5CLE9BQU8sVUFBZ0IsRUFBTyxHQU1QLE9BQWpCLEdBQTBCLElBQzVCLEdBQWtCLEVBRWxCLEVBQUksV0FDRixHQUFrQixFQUNiLElBRUwsR0FBeUIsRUFDekIsRUFBTyxFQUFjLEdBQ3JCLEdBQXlCLEVBRXpCLEVBQWUsU0FLbkIsRUFBZSxHQXpDbkIsS0FBTSxRQUFTLFFBQVEsZ0JBR3ZCLFFBQU8sUUFBVTs7O0FDbUNqQixRQUFTLFFBQVEsRUFBTyxHQUNsQixNQUFNLEdBQU8sSUFBMEIsSUFBcEIsTUFBTSxHQUFPLEtBQ2xDLE1BQU0sR0FBTyxHQUFHLEdBQ2hCLE1BQU0sR0FBTyxHQUFLLEdBSXRCLFFBQVMsU0FBUyxFQUFPLEdBQ25CLE1BQU0sR0FBTyxJQUEwQixJQUFwQixNQUFNLEdBQU8sS0FDbEMsTUFBTSxHQUFPLEdBQUcsR0FDaEIsTUFBTSxHQUFPLEdBQUssR0FJdEIsUUFBUyxVQUFVLEVBQVUsRUFBSSxHQUMvQixHQUFJLEdBQVcsRUFBUyxPQUFPLGFBQWEsU0FDNUMsT0FBSSxZQUFXLEVBQVMsU0FBVSxRQUNoQyxNQUFNLEdBQVksTUFBTSxFQUFTLFlBRy9CLE1BQU0sRUFBUyxXQUNqQixFQUFJLEVBQVMsU0FBVSxFQUFTLGFBRTlCLE1BQU0sSUFDUixFQUFHLEVBQVUsRUFBUyxVQUkxQixRQUFTLFlBQVksRUFBVSxHQUM3QixTQUFLLElBQWEsSUFDWCxNQUFNLEdBQVUsS0FBTyxNQUFNLEdBQVUsR0FHaEQsUUFBUyxjQUFjLEVBQU8sR0FFNUIsSUFBSyxHQURELEdBQU8sT0FBTyxLQUFLLE9BQ2QsRUFBSSxFQUFHLEVBQUksRUFBTSxPQUFRLElBQUssQ0FDckMsR0FBSSxFQUFNLElBQU0sRUFBTSxHQUFHLGNBQWdCLEVBQU0sR0FBRyxhQUFhLFVBQVcsQ0FDeEUsR0FBSSxHQUFXLEVBQU0sR0FBRyxhQUFhLFNBQ3JDLEdBQUssUUFBUSxTQUFVLEdBQ2pCLElBQWEsR0FDZixFQUFHLEVBQUcsRUFBTSxNQUlkLEVBQU0sR0FBRyxXQUFXLE9BQVMsR0FDL0IsYUFBYSxFQUFNLEdBQUcsV0FBWSxJQWxGeEMsR0FBSSxVQUFXLFFBQVEsbUJBQ25CLE9BQVMsUUFBUSxpQkFDakIsTUFBUSxPQUFPLE9BQU8sTUFDdEIsT0FBUyxZQUFjLEdBQUksTUFBUyxLQUFLLFNBQVMsSUFDbEQsU0FBVyxRQUFVLE9BQ3JCLE1BQVEsQ0FFWixJQUFJLFFBQVUsT0FBTyxpQkFBa0IsQ0FDckMsR0FBSSxVQUFXLEdBQUksa0JBQWlCLFNBQVUsR0FDNUMsS0FBSSxPQUFPLEtBQUssT0FBTyxPQUFTLEdBQ2hDLElBQUssR0FBSSxHQUFJLEVBQUcsRUFBSSxFQUFVLE9BQVEsSUFDaEMsRUFBVSxHQUFHLGdCQUFrQixVQUluQyxhQUFhLEVBQVUsR0FBRyxhQUFjLFNBQ3hDLGFBQWEsRUFBVSxHQUFHLFdBQVksU0FKcEMsU0FBUyxFQUFVLEdBQUksT0FBUSxVQU9yQyxVQUFTLFFBQVEsU0FBUyxNQUN4QixXQUFXLEVBQ1gsU0FBUyxFQUNULFlBQVksRUFDWixtQkFBbUIsRUFDbkIsaUJBQWtCLFlBSXRCLE9BQU8sUUFBVSxRQUFTLEdBQVEsRUFBSSxFQUFJLEVBQUssR0FNN0MsTUFMQSxHQUFLLEdBQU0sYUFDWCxFQUFNLEdBQU8sYUFDYixFQUFHLGFBQWEsU0FBVSxJQUFNLE9BQ2hDLE1BQU0sSUFBTSxRQUFVLEVBQUksRUFBSyxFQUFHLEdBQVUsRUFBTyxRQUNuRCxPQUFTLEVBQ0Y7OztBQzVCVCxZQUVBLElBQUksUUFBUyxRQUFRLGdCQUVyQixRQUFPLFFBQVUsU0FBaUIsRUFBSyxFQUFLLEdBRzFDLE1BRkEsR0FBTSxFQUFJLFdBRVMsbUJBQVIsR0FDRixHQUlQLEVBRFMsSUFBUCxFQUNHLElBQ0ksRUFDSixFQUFHLFdBRUgsSUFHQSxPQUFPLEVBQUksRUFBTSxFQUFJLFFBQVU7OztBQzFCeEMsWUFFQSxJQUFJLFFBQVMsUUFBUSxnQkFFckIsUUFBTyxRQUFVLFNBQWlCLEVBQUssRUFBSyxHQUMxQyxHQUFJLEdBQVUsR0FDVixFQUFPLEVBQU0sRUFBSSxNQUlyQixJQUFJLEdBQVEsSUFBTSxFQUNoQixFQUFVLFlBQ0wsQ0FBQSxLQUFJLEdBQVEsS0FBTyxFQUd4QixNQUFPLEdBQU0sT0FBTyxHQUFPLElBQUssRUFGaEMsR0FBVSw4QkFLWixNQUFPLEdBQU0sRUFBUSxNQUFNLEVBQUc7OztBQ2xCaEMsR0FBSSxNQUFPLFFBQVEsUUFDZixRQUFVLFFBQVEsWUFDbEIsUUFBVSxTQUFTLEdBQ2pCLE1BQStDLG1CQUF4QyxPQUFPLFVBQVUsU0FBUyxLQUFLLEdBRzVDLFFBQU8sUUFBVSxTQUFVLEdBQ3pCLElBQUssRUFDSCxRQUVGLElBQUksS0FtQkosT0FqQkEsU0FDSSxLQUFLLEdBQVMsTUFBTSxNQUNwQixTQUFVLEdBQ1IsR0FBSSxHQUFRLEVBQUksUUFBUSxLQUNwQixFQUFNLEtBQUssRUFBSSxNQUFNLEVBQUcsSUFBUSxjQUNoQyxFQUFRLEtBQUssRUFBSSxNQUFNLEVBQVEsR0FFUCxvQkFBakIsR0FBTyxHQUNoQixFQUFPLEdBQU8sRUFDTCxRQUFRLEVBQU8sSUFDeEIsRUFBTyxHQUFLLEtBQUssR0FFakIsRUFBTyxJQUFTLEVBQU8sR0FBTSxLQUs5Qjs7O0FDcEJULFFBQVMsT0FBTyxHQUdkLE1BQU8sR0FBTSxPQUNWLFFBQVEsWUFBYSxJQUNyQixRQUFRLG9CQUFxQixJQUM3QixRQUFRLGFBQWMsTUFDdEIsUUFBUSxNQUFPLElBZHBCLE9BQU8sUUFBVTs7O0FDS2pCLFlBaUNBLFNBQVMsUUFBTyxFQUFLLEdBQ25CLEdBQW1CLGdCQUFSLEdBQ1QsS0FBTSxJQUFJLFdBQVUsa0NBSXRCLElBQVksSUFBUixFQUFXLE1BQU8sRUFDdEIsSUFBWSxJQUFSLEVBQVcsTUFBTyxHQUFNLENBRTVCLElBQUksR0FBTSxFQUFJLE9BQVMsQ0FNdkIsS0FMSSxRQUFVLEdBQXdCLG1CQUFWLFNBQzFCLE1BQVEsRUFDUixJQUFNLElBR0QsRUFBTSxJQUFJLFFBQVUsRUFBTSxJQUNyQixFQUFOLElBQ0YsS0FBTyxHQUdULElBQVEsSUFFUixHQUFPLENBR1QsT0FBTyxLQUFJLE9BQU8sRUFBRyxHQXBEdkIsR0FBSSxLQUFNLEdBQ04sS0FNSixRQUFPLFFBQVU7OztBQ1pqQixRQUFTLE1BQU0sR0FFYixPQUFPLGFBQWUsU0FBVSxHQUM5QixFQUFHLE9BQU8sU0FBUyxPQVh2QixLQUFNLFFBQVMsUUFBUSxnQkFHdkIsUUFBTyxRQUFVOzs7QUNNakIsUUFBUyxTQUFTLEdBRWhCLE9BQU8sV0FBYSxXQUNsQixFQUFHLFNBQVMsU0FBUyxPQVp6QixLQUFNLFVBQVcsUUFBUSxtQkFDbkIsT0FBUyxRQUFRLGdCQUd2QixRQUFPLFFBQVU7OztBQ0tqQixRQUFTLE1BQU0sR0FHYixPQUFPLFFBQVUsU0FBVSxHQUN6QixLQUFNLEdBQVEsUUFBUyxHQUFVLEdBQy9CLEdBQUssRUFDTCxNQUF1QixNQUFuQixFQUFLLFVBQTBCLEVBQVMsRUFBSyxZQUMvQixTQUFkLEVBQUssS0FBMkIsRUFBUyxFQUFLLFlBQzlDLE9BQU8sU0FBUyxPQUFTLEVBQUssS0FBYSxFQUFTLEVBQUssWUFDdEQsR0FDTixFQUFFLE9BRUwsSUFBSyxFQUFMLENBRUEsRUFBRSxnQkFDRixNQUFNLEdBQU8sRUFBSyxLQUFLLFFBQVEsS0FBTSxHQUNyQyxHQUFHLEdBQ0gsT0FBTyxRQUFRLGFBQWMsS0FBTSxLQTFCdkMsS0FBTSxRQUFTLFFBQVEsZ0JBR3ZCLFFBQU8sUUFBVTs7O0FDS2pCLFFBQVMsYUFBYSxFQUFLLEVBQVksR0FDckMsRUFBZSxFQUFjLEVBQVksY0FBZ0IsYUFFcEQsSUFDSCxFQUFhLEVBQ2IsRUFBTSxHQU9SLE1BQU0sR0FBUyxTQUFTLEdBQ2xCLEVBQU8sRUFBVyxFQTZCeEIsT0ExQkUsU0FBUyxHQUFNLEVBQU0sR0FDckIsR0FBSSxNQUFNLFFBQVEsRUFBSyxJQUVyQixFQUFLLFFBQVEsU0FBVSxHQUNyQixFQUFLLEVBQU0sU0FFUixJQUFJLEVBQUssR0FBSSxDQUVsQixLQUFNLEdBQWEsRUFBSyxHQUNwQixFQUFNLE9BQU8sRUFBSyxJQUFJLEtBQUssS0FDM0IsRUFBTSxPQUFTLEVBQU0sS0FBSyxLQUFPLEVBQUssRUFDMUMsR0FBTyxHQUFHLEVBQVksRUFBSyxJQUMzQixFQUFLLEVBQUssR0FBSSxFQUFNLE9BQU8sRUFBSyxTQUMzQixJQUFJLE1BQU0sUUFBUSxFQUFLLElBRTVCLEVBQUssRUFBSyxHQUFJLEVBQU0sT0FBTyxFQUFLLFNBQzNCLENBRUwsS0FBTSxHQUFVLEVBQUssR0FDakIsRUFBTSxPQUFPLEVBQUssSUFBSSxLQUFLLEtBQzNCLEVBQU0sT0FBUyxFQUFNLEtBQUssS0FBTyxFQUFLLEVBQzFDLEdBQU8sR0FBRyxFQUFTLEVBQUssTUFFekIsTUFHSSxTQUFnQixHQUVyQixLQUFNLE1BQVUsTUFBTSxLQUFLLFVBRTNCLE9BREEsR0FBSyxHQUFLLFNBQVMsRUFBSyxJQUNqQixFQUFPLE1BQU0sS0FBTSxJQUs5QixRQUFTLGNBQWMsRUFBTyxFQUFRLEdBUXBDLE1BUEssS0FDSCxFQUFRLEVBQ1IsRUFBUyxNQUlYLEVBQVEsRUFBTSxRQUFRLE1BQU8sS0FDcEIsRUFBTyxFQUFRLEdBbkUxQixLQUFNLFVBQVcsUUFBUSxrQkFDbkIsU0FBVyxRQUFRLFdBR3pCLFFBQU8sUUFBVTs7OztBQ0pqQixjQUdFLFNBQVUsRUFBTSxHQUNRLGtCQUFYLFNBQXlCLE9BQU8sSUFFdkMsVUFBVyxHQUNlLGdCQUFaLFNBSWQsT0FBTyxRQUFVLElBR2pCLEVBQUssTUFBUSxLQUVuQixLQUFNLFdBNENQLFFBQVMsS0FDUixJQUFNLE1BQVEsS0FBb0IsSUFBTyxFQUFJLEdBQzdDLE1BQU0sR0FBTyxPQUFPLEdBM0NyQixHQUtDLEdBTEcsS0FDSCxFQUF3QixtQkFBVixRQUF3QixPQUFTLE9BQy9DLEVBQU0sRUFBSSxTQUNWLEVBQW1CLGVBQ25CLEVBQVksUUEwQ2IsSUF2Q0EsRUFBTSxVQUFXLEVBQ2pCLEVBQU0sUUFBVSxTQUNoQixFQUFNLElBQU0sU0FBUyxFQUFLLEtBQzFCLEVBQU0sSUFBTSxTQUFTLEVBQUssS0FDMUIsRUFBTSxJQUFNLFNBQVMsR0FBTyxNQUEwQixVQUFuQixFQUFNLElBQUksSUFDN0MsRUFBTSxPQUFTLFNBQVMsS0FDeEIsRUFBTSxNQUFRLGFBQ2QsRUFBTSxTQUFXLFNBQVMsRUFBSyxFQUFZLEdBQ3JCLE1BQWpCLElBQ0gsRUFBZ0IsRUFDaEIsRUFBYSxNQUVJLE1BQWQsSUFDSCxLQUVELElBQUksR0FBTSxFQUFNLElBQUksRUFBSyxFQUN6QixHQUFjLEdBQ2QsRUFBTSxJQUFJLEVBQUssSUFFaEIsRUFBTSxPQUFTLGFBQ2YsRUFBTSxRQUFVLGFBRWhCLEVBQU0sVUFBWSxTQUFTLEdBQzFCLE1BQU8sTUFBSyxVQUFVLElBRXZCLEVBQU0sWUFBYyxTQUFTLEdBQzVCLEdBQW9CLGdCQUFULEdBQ1gsSUFBTSxNQUFPLE1BQUssTUFBTSxHQUN4QixNQUFNLEdBQUssTUFBTyxJQUFTLFNBV3hCLElBQ0gsRUFBVSxFQUFJLEdBQ2QsRUFBTSxJQUFNLFNBQVMsRUFBSyxHQUN6QixNQUFZLFVBQVIsRUFBNEIsRUFBTSxPQUFPLElBQzdDLEVBQVEsUUFBUSxFQUFLLEVBQU0sVUFBVSxJQUM5QixJQUVSLEVBQU0sSUFBTSxTQUFTLEVBQUssR0FDekIsR0FBSSxHQUFNLEVBQU0sWUFBWSxFQUFRLFFBQVEsR0FDNUMsT0FBZ0IsVUFBUixFQUFvQixFQUFhLEdBRTFDLEVBQU0sT0FBUyxTQUFTLEdBQU8sRUFBUSxXQUFXLElBQ2xELEVBQU0sTUFBUSxXQUFhLEVBQVEsU0FDbkMsRUFBTSxPQUFTLFdBQ2QsR0FBSSxLQUlKLE9BSEEsR0FBTSxRQUFRLFNBQVMsRUFBSyxHQUMzQixFQUFJLEdBQU8sSUFFTCxHQUVSLEVBQU0sUUFBVSxTQUFTLEdBQ3hCLElBQUssR0FBSSxHQUFFLEVBQUcsRUFBRSxFQUFRLE9BQVEsSUFBSyxDQUNwQyxHQUFJLEdBQU0sRUFBUSxJQUFJLEVBQ3RCLEdBQVMsRUFBSyxFQUFNLElBQUksVUFHcEIsSUFBSSxHQUFPLEVBQUksZ0JBQWdCLFlBQWEsQ0FDbEQsR0FBSSxHQUNILENBV0QsS0FDQyxFQUFtQixHQUFJLGVBQWMsWUFDckMsRUFBaUIsT0FDakIsRUFBaUIsTUFBTSxJQUFJLEVBQVUsdUJBQXVCLEVBQVUseUNBQ3RFLEVBQWlCLFFBQ2pCLEVBQWUsRUFBaUIsRUFBRSxPQUFPLEdBQUcsU0FDNUMsRUFBVSxFQUFhLGNBQWMsT0FDcEMsTUFBTSxHQUdQLEVBQVUsRUFBSSxjQUFjLE9BQzVCLEVBQWUsRUFBSSxLQUVwQixHQUFJLEdBQWdCLFNBQVMsR0FDNUIsTUFBTyxZQUNOLEdBQUksR0FBTyxNQUFNLFVBQVUsTUFBTSxLQUFLLFVBQVcsRUFDakQsR0FBSyxRQUFRLEdBR2IsRUFBYSxZQUFZLEdBQ3pCLEVBQVEsWUFBWSxxQkFDcEIsRUFBUSxLQUFLLEVBQ2IsSUFBSSxHQUFTLEVBQWMsTUFBTSxFQUFPLEVBRXhDLE9BREEsR0FBYSxZQUFZLEdBQ2xCLElBT0wsRUFBc0IsR0FBSSxRQUFPLHdDQUF5QyxLQUMxRSxFQUFXLFNBQVMsR0FDdkIsTUFBTyxHQUFJLFFBQVEsS0FBTSxTQUFTLFFBQVEsRUFBcUIsT0FFaEUsR0FBTSxJQUFNLEVBQWMsU0FBUyxFQUFTLEVBQUssR0FFaEQsTUFEQSxHQUFNLEVBQVMsR0FDSCxTQUFSLEVBQTRCLEVBQU0sT0FBTyxJQUM3QyxFQUFRLGFBQWEsRUFBSyxFQUFNLFVBQVUsSUFDMUMsRUFBUSxLQUFLLEdBQ04sS0FFUixFQUFNLElBQU0sRUFBYyxTQUFTLEVBQVMsRUFBSyxHQUNoRCxFQUFNLEVBQVMsRUFDZixJQUFJLEdBQU0sRUFBTSxZQUFZLEVBQVEsYUFBYSxHQUNqRCxPQUFnQixVQUFSLEVBQW9CLEVBQWEsSUFFMUMsRUFBTSxPQUFTLEVBQWMsU0FBUyxFQUFTLEdBQzlDLEVBQU0sRUFBUyxHQUNmLEVBQVEsZ0JBQWdCLEdBQ3hCLEVBQVEsS0FBSyxLQUVkLEVBQU0sTUFBUSxFQUFjLFNBQVMsR0FDcEMsR0FBSSxHQUFhLEVBQVEsWUFBWSxnQkFBZ0IsVUFDckQsR0FBUSxLQUFLLEVBQ2IsS0FBSyxHQUFJLEdBQUUsRUFBVyxPQUFPLEVBQUcsR0FBRyxFQUFHLElBQ3JDLEVBQVEsZ0JBQWdCLEVBQVcsR0FBRyxLQUV2QyxHQUFRLEtBQUssS0FFZCxFQUFNLE9BQVMsU0FBUyxHQUN2QixHQUFJLEtBSUosT0FIQSxHQUFNLFFBQVEsU0FBUyxFQUFLLEdBQzNCLEVBQUksR0FBTyxJQUVMLEdBRVIsRUFBTSxRQUFVLEVBQWMsU0FBUyxFQUFTLEdBRS9DLElBQUssR0FBUyxHQURWLEVBQWEsRUFBUSxZQUFZLGdCQUFnQixXQUM1QyxFQUFFLEVBQVMsRUFBSyxFQUFXLEtBQU0sRUFDekMsRUFBUyxFQUFLLEtBQU0sRUFBTSxZQUFZLEVBQVEsYUFBYSxFQUFLLFVBS25FLElBQ0MsR0FBSSxHQUFVLGFBQ2QsR0FBTSxJQUFJLEVBQVMsR0FDZixFQUFNLElBQUksSUFBWSxJQUFXLEVBQU0sVUFBVyxHQUN0RCxFQUFNLE9BQU8sR0FDWixNQUFNLEdBQ1AsRUFBTSxVQUFXLEVBSWxCLE1BRkEsR0FBTSxTQUFXLEVBQU0sU0FFaEI7Ozs7O0FDMUxSLFFBQVMsTUFBSyxHQUNaLE1BQU8sR0FBSSxRQUFRLGFBQWMsSUFIbkMsUUFBVSxPQUFPLFFBQVUsS0FNM0IsUUFBUSxLQUFPLFNBQVMsR0FDdEIsTUFBTyxHQUFJLFFBQVEsT0FBUSxLQUc3QixRQUFRLE1BQVEsU0FBUyxHQUN2QixNQUFPLEdBQUksUUFBUSxPQUFROzs7QUNaN0IsWUFTQSxRQUFPLFFBQVUsU0FBVSxFQUFRLEdBQ2pDLEdBQUksR0FBSyxDQUtULE9BSEEsR0FBUyxHQUFVLEdBQ25CLEVBQVMsR0FBVSxHQUVaLFdBQ0wsTUFBTyxHQUFVLEtBQVE7OztBQ1Q3QixRQUFTLFVBQVUsR0FlakIsUUFBUyxHQUFJLEVBQU8sR0FNbEIsR0FGQSxFQUFRLEdBQVMsSUFFYixHQUFNLEVBQUcsV0FBYSxFQUFHLE1BQzNCLEVBQU0sTUFBTSxFQUFPLEVBQUcsTUFBTSxVQUN2QixDQUNMLEtBQU0sR0FBTyxFQUFNLE9BQU8sRUFDMUIsR0FBSyxHQUFLLEVBR1osTUFBTyxHQUtULFFBQVMsR0FBTSxHQUViLEtBQU0sR0FBTyxHQUFJLE9BQU0sVUFBVSxPQUNqQyxLQUFLLEdBQUksR0FBSSxFQUFHLEVBQUksRUFBSyxPQUFRLElBQy9CLEVBQUssR0FBSyxVQUFVLEVBR3RCLE1BQU0sR0FBTyxFQUFNLE1BQU0sRUFDekIsSUFBSSxHQUFRLEVBQUssR0FFZixNQURBLEdBQUssR0FBSyxFQUFLLE9BQ1IsRUFBSyxHQUFHLE1BQU0sS0FBTSxFQUc3QixNQUFNLEdBQU0sRUFBTSxNQUFNLEVBQ3hCLElBQUksR0FBTyxFQUFJLEdBRWIsTUFEQSxHQUFLLEdBQUssRUFBSSxPQUNQLEVBQUksR0FBRyxNQUFNLEtBQU0sRUFHNUIsTUFBTSxJQUFJLE9BQU0sVUFBWSxFQUFRLG1CQW5EdEMsS0FBTSxlQUFnQixXQUFXLE1BQU8sSUFBSSxVQUFTLEVBRXJELE1BQU0sSUFBWSxHQUFPLElBQUksUUFBUSxNQUFPLElBQ3RDLEVBQVEsTUFPZCxPQUxBLEdBQUssTUFBUSxFQUNiLEVBQUssS0FBTyxFQUNaLEVBQUssR0FBSyxFQUNWLEVBQUssV0FBWSxFQUVWLEVBakJULEtBQU0sTUFBTyxRQUFRLFNBRXJCLFFBQU8sUUFBVTs7O0FDS2pCLFFBQVMsUUFDUCxNQUFNLGdCQUFnQixXQUN0QixLQUFLLE1BQVMsV0FEc0IsR0FBSSxNQVQxQyxLQUFNLFFBQVMsUUFBUSxpQkFFakIsTUFBUSxRQUFRLFFBRXRCLFFBQU8sUUFBVSxLQVlqQixLQUFLLFVBQVUsT0FBUyxTQUFVLEdBR2hDLEtBQU0sR0FBUyxFQUFNLFFBQVEsTUFBTyxJQUFJLE1BQU0sSUFDOUMsT0FBUSxTQUFTLEdBQVksRUFBTyxFQUFNLEdBQ3hDLEtBQU0sR0FBUSxFQUFPLEVBRXJCLElBQWMsU0FBVixFQUFxQixNQUFPLEVBRWhDLElBQUksR0FBTyxJQWtCWCxPQWpCSSxLQUFLLEtBQUssSUFFUCxFQUFLLE1BQUwsR0FJSCxFQUFPLEVBQUssTUFBTCxJQUhQLEdBQVMsVUFDVCxFQUFLLE1BQUwsR0FBbUIsR0FJckIsRUFBSyxLQUFPLEVBQU0sUUFBUSxLQUFNLEtBQ3RCLEVBQUssTUFBTSxHQUlyQixFQUFPLEVBQUssTUFBTSxJQUhsQixHQUFTLFVBQ1QsRUFBSyxNQUFNLEdBQVMsR0FNZixFQUFXLEVBQVEsRUFBRyxFQUFNLElBQ2xDLEVBQUcsS0FBSyxLQUFNLElBTW5CLEtBQUssVUFBVSxNQUFRLFNBQVUsR0FHL0IsS0FBTSxHQUFTLEVBQU0sUUFBUSxNQUFPLElBQUksTUFBTSxLQUN4QyxJQUVOLElBQUksR0FBUSxRQUFTLEdBQVEsRUFBTyxHQUVsQyxHQUFhLFNBQVQsRUFBSixDQUNBLEtBQU0sR0FBUSxFQUFPLEVBQ3JCLE9BQWMsVUFBVixFQUE0QixFQUU1QixFQUFLLE1BQU0sR0FFTixFQUFPLEVBQVEsRUFBRyxFQUFLLE1BQU0sSUFDM0IsRUFBSyxNQUVkLEVBQU8sRUFBSyxNQUFRLEVBQ2IsRUFBTyxFQUFRLEVBQUcsRUFBSyxNQUFMLEtBR2xCLEVBQU8sRUFBUSxLQUV2QixFQUFHLEtBQUssS0FFWCxJQUFLLEVBR0wsTUFGQSxHQUFPLE1BQU0sR0FDYixFQUFLLE9BQVMsRUFDUCxHQUtULEtBQUssVUFBVSxNQUFRLFNBQVUsRUFBTyxHQUl0QyxLQUFNLEdBQVEsRUFBTSxRQUFRLE1BQU8sSUFBSSxNQUFNLElBQzdDLElBQUksR0FBTyxLQUNQLEVBQU0sSUFFVixJQUFxQixJQUFqQixFQUFNLE9BQ1IsRUFBTSxFQUFNLEdBQ1osRUFBTyxLQUFLLE9BQU8sT0FDZCxDQUNMLEtBQU0sR0FBVSxFQUFNLE9BQU8sRUFBRyxFQUFNLE9BQVMsR0FDekMsRUFBTyxFQUFRLEtBQUssSUFDMUIsR0FBTSxFQUFNLEdBQ1osRUFBTyxLQUFLLE9BQU8sR0FHckIsT0FBTyxFQUFLLE1BQU8sRUFBSyxPQUNwQixFQUFLLE9BQU0sRUFBSyxLQUFPLEVBQUssTUFJNUIsRUFBSyxNQUFNLE1BQ2IsT0FBTyxLQUFLLEVBQUssTUFBTSxLQUFLLFFBQVEsU0FBVSxHQUNoQyxVQUFSLElBQ0osRUFBSyxHQUFPLEVBQUssTUFBTSxJQUFJLE1BRTdCLE9BQU8sRUFBSyxNQUFPLEVBQUssTUFBTSxJQUFJLGFBQzNCLEdBQUssTUFBTSxJQUFJOzs7QUNoSDFCLFlBa0JBLFNBQVMsY0FBYSxFQUFPLEdBQ3pCLElBQUssR0FBSSxHQUFJLEVBQUcsRUFBSSxFQUFNLE9BQVEsSUFDOUIsRUFBUyxFQUFNLElBSXZCLFFBQVMsU0FBUSxHQUNiLElBQUEsR0FBUSxLQUFLLEdBQ1QsR0FBRyxFQUFJLGVBQWUsR0FBSSxPQUFPLENBRXJDLFFBQU8sRUFHWCxRQUFTLFlBQVcsRUFBSyxFQUFTLEdBQzlCLEdBQUksR0FBUyxDQVliLE9BVkksWUFBVyxJQUNYLEVBQVcsRUFDUSxnQkFBUixLQUNQLEdBQVUsSUFBSSxLQUdsQixFQUFTLE1BQU0sR0FBVSxJQUFLLElBR2xDLEVBQU8sU0FBVyxFQUNYLEVBR1gsUUFBUyxXQUFVLEVBQUssRUFBUyxHQUU3QixNQURBLEdBQVUsV0FBVyxFQUFLLEVBQVMsR0FDNUIsV0FBVyxHQUd0QixRQUFTLFlBQVcsR0FhaEIsUUFBUyxLQUNrQixJQUFuQixFQUFJLFlBQ0osSUFJUixRQUFTLEtBRUwsR0FBSSxHQUFPLE1BUVgsSUFMSSxFQURBLEVBQUksU0FDRyxFQUFJLFNBRUosRUFBSSxjQUFnQixPQUFPLEdBR2xDLEVBQ0EsSUFDSSxFQUFPLEtBQUssTUFBTSxHQUNwQixNQUFPLElBR2IsTUFBTyxHQVlYLFFBQVMsR0FBVSxHQU1mLE1BTEEsY0FBYSxHQUNSLFlBQWUsU0FDaEIsRUFBTSxHQUFJLE9BQU0sSUFBTSxHQUFPLGtDQUVqQyxFQUFJLFdBQWEsRUFDVixFQUFTLEVBQUssR0FJekIsUUFBUyxLQUNMLElBQUksRUFBSixDQUNBLEdBQUksRUFDSixjQUFhLEdBR1QsRUFGRCxFQUFRLFFBQXVCLFNBQWIsRUFBSSxPQUVaLElBRWdCLE9BQWYsRUFBSSxPQUFrQixJQUFNLEVBQUksTUFFOUMsSUFBSSxHQUFXLEVBQ1gsRUFBTSxJQWlCVixPQWZlLEtBQVgsR0FDQSxHQUNJLEtBQU0sSUFDTixXQUFZLEVBQ1osT0FBUSxFQUNSLFdBQ0EsSUFBSyxFQUNMLFdBQVksR0FFYixFQUFJLHdCQUNILEVBQVMsUUFBVSxhQUFhLEVBQUksMkJBR3hDLEVBQU0sR0FBSSxPQUFNLGlDQUViLEVBQVMsRUFBSyxFQUFVLEVBQVMsT0FwRjVDLEdBQStCLG1CQUFyQixHQUFRLFNBQ2QsS0FBTSxJQUFJLE9BQU0sNEJBR3BCLElBQUksSUFBUyxFQUNULEVBQVcsU0FBZ0IsRUFBSyxFQUFVLEdBQ3RDLElBQ0EsR0FBUyxFQUNULEVBQVEsU0FBUyxFQUFLLEVBQVUsS0E2QnBDLEdBQ1EsS0FBTSxPQUNOLFdBQ0EsV0FBWSxFQUNaLE9BQVEsRUFDUixJQUFLLEVBQ0wsV0FBWSxHQTRDcEIsRUFBTSxFQUFRLEtBQU8sSUFFcEIsS0FFRyxFQURBLEVBQVEsTUFBUSxFQUFRLE9BQ2xCLEdBQUksV0FBVSxlQUVkLEdBQUksV0FBVSxlQUk1QixJQUFJLEdBQ0EsRUFPQSxFQU5BLEVBQU0sRUFBSSxJQUFNLEVBQVEsS0FBTyxFQUFRLElBQ3ZDLEVBQVMsRUFBSSxPQUFTLEVBQVEsUUFBVSxNQUN4QyxFQUFPLEVBQVEsTUFBUSxFQUFRLE1BQVEsS0FDdkMsRUFBVSxFQUFJLFFBQVUsRUFBUSxZQUNoQyxJQUFTLEVBQVEsS0FDakIsR0FBUyxDQXNDYixJQW5DSSxRQUFVLEtBQ1YsR0FBUyxFQUNULEVBQUEsUUFBcUIsRUFBQSxTQUFzQixFQUFBLE9BQW9CLG9CQUNoRCxRQUFYLEdBQStCLFNBQVgsSUFDcEIsRUFBUSxpQkFBbUIsRUFBUSxrQkFBb0IsRUFBUSxnQkFBa0Isb0JBQ2pGLEVBQU8sS0FBSyxVQUFVLEVBQVEsUUFJdEMsRUFBSSxtQkFBcUIsRUFDekIsRUFBSSxPQUFTLEVBQ2IsRUFBSSxRQUFVLEVBRWQsRUFBSSxXQUFhLGFBR2pCLEVBQUksVUFBWSxFQUNoQixFQUFJLEtBQUssRUFBUSxHQUFNLEVBQU0sRUFBUSxTQUFVLEVBQVEsVUFFbkQsSUFDQSxFQUFJLGtCQUFvQixFQUFRLGtCQUsvQixHQUFRLEVBQVEsUUFBVSxJQUMzQixFQUFlLFdBQVcsV0FDdEIsR0FBUSxFQUNSLEVBQUksTUFBTSxVQUNWLElBQUksR0FBSSxHQUFJLE9BQU0seUJBQ2xCLEdBQUUsS0FBTyxZQUNULEVBQVUsSUFDWCxFQUFRLFVBR1gsRUFBSSxpQkFDSixJQUFJLElBQU8sR0FDSixFQUFRLGVBQWUsSUFDdEIsRUFBSSxpQkFBaUIsRUFBSyxFQUFRLFFBR3ZDLElBQUksRUFBUSxVQUFZLFFBQVEsRUFBUSxTQUMzQyxLQUFNLElBQUksT0FBTSxvREFlcEIsT0FaSSxnQkFBa0IsS0FDbEIsRUFBSSxhQUFlLEVBQVEsY0FHM0IsY0FBZ0IsSUFDYyxrQkFBdkIsR0FBUSxZQUVmLEVBQVEsV0FBVyxHQUd2QixFQUFJLEtBQUssR0FFRixFQUtYLFFBQVMsUUFBTyxHQUNaLEdBQXlCLGFBQXJCLEVBQUksYUFDSixNQUFPLEdBQUksV0FFZixJQUFJLEdBQXVDLE1BQWYsRUFBSSxRQUFrQixFQUFJLGFBQTRELGdCQUE3QyxFQUFJLFlBQVksZ0JBQWdCLFFBQ3JHLE9BQXlCLEtBQXJCLEVBQUksY0FBd0IsRUFJekIsS0FISSxFQUFJLFlBTW5CLFFBQVMsU0F6T1QsR0FBSSxRQUFTLFFBQVEsaUJBQ2pCLFdBQWEsUUFBUSxlQUNyQixhQUFlLFFBQVEsaUJBQ3ZCLE1BQVEsUUFBUSxRQUVwQixRQUFPLFFBQVUsVUFDakIsVUFBVSxlQUFpQixPQUFPLGdCQUFrQixLQUNwRCxVQUFVLGVBQWlCLG1CQUFzQixJQUFJLFdBQVUsZUFBb0IsVUFBVSxlQUFpQixPQUFPLGVBRXJILGNBQWMsTUFBTyxNQUFPLE9BQVEsUUFBUyxPQUFRLFVBQVcsU0FBUyxHQUNyRSxVQUFxQixXQUFYLEVBQXNCLE1BQVEsR0FBVSxTQUFTLEVBQUssRUFBUyxHQUdyRSxNQUZBLEdBQVUsV0FBVyxFQUFLLEVBQVMsR0FDbkMsRUFBUSxPQUFTLEVBQU8sY0FDakIsV0FBVzs7O0FDVjFCLFFBQVMsVUFHTCxJQUFLLEdBRkQsTUFFSyxFQUFJLEVBQUcsRUFBSSxVQUFVLE9BQVEsSUFBSyxDQUN2QyxHQUFJLEdBQVMsVUFBVSxFQUV2QixLQUFBLEdBQVMsS0FBTyxHQUNSLGVBQWUsS0FBSyxFQUFRLEtBQzVCLEVBQU8sR0FBTyxFQUFPLElBS2pDLE1BQU8sR0FqQlgsT0FBTyxRQUFVLE1BRWpCLElBQUksZ0JBQWlCLE9BQU8sVUFBVTs7O0FDRXRDLFFBQVMsUUFBTyxHQUNaLElBQUssR0FBSSxHQUFJLEVBQUcsRUFBSSxVQUFVLE9BQVEsSUFBSyxDQUN2QyxHQUFJLEdBQVMsVUFBVSxFQUV2QixLQUFBLEdBQVMsS0FBTyxHQUNSLGVBQWUsS0FBSyxFQUFRLEtBQzVCLEVBQU8sR0FBTyxFQUFPLElBS2pDLE1BQU8sR0FmWCxPQUFPLFFBQVUsTUFFakIsSUFBSSxnQkFBaUIsT0FBTyxVQUFVOzs7QUNGdEMsR0FBSSxLQUFNLFFBQVEsT0FDZCxTQUFXLFFBQVEsWUFDbkIsY0FBZ0IsUUFBUSxxQkFFNUIsUUFBTyxRQUFVLElBR2pCLE9BQU8sUUFBUSxPQUFTLFNBQVUsRUFBVSxFQUFRLEdBVWxELFFBQVMsR0FBUSxFQUFHLEdBR2xCLElBQUssR0FERCxHQUFTLEVBQUssUUFBVSxjQUNuQixFQUFJLEVBQUcsRUFBSSxFQUFPLE9BQVEsSUFBSyxDQUN0QyxHQUFJLEdBQUssRUFBTyxFQUNaLEdBQUUsR0FDSixFQUFFLEdBQU0sRUFBRSxHQUNELEVBQUUsS0FDWCxFQUFFLEdBQU0sUUFJUSxVQUFmLEVBQUUsVUFBbUMsU0FBWCxFQUFFLE1BQW1DLFdBQWYsRUFBRSxTQUNyQixPQUE1QixFQUFFLGFBQWEsV0FBbUIsRUFBRSxNQUFRLEVBQUUsT0FDMUIsYUFBZixFQUFFLFVBQ3FCLE9BQTVCLEVBQUUsYUFBYSxXQUFtQixFQUFFLE1BQVEsRUFBRSxPQW5CdEQsTUFMSyxLQUFNLE1BQ1AsRUFBSyxVQUFXLElBQ2IsRUFBSyxvQkFBbUIsRUFBSyxrQkFBb0IsSUFHakQsU0FBUyxFQUFVLEVBQVE7OztBQ2JwQyxPQUFPLFNBRUwsVUFDQSxhQUNBLGNBQ0EsWUFDQSxjQUNBLGNBQ0EsYUFDQSxjQUNBLFNBQ0EsY0FDQSxjQUNBLGFBQ0EsU0FDQSxZQUNBLFlBQ0EsYUFDQSxVQUNBLFdBQ0EsVUFDQSxVQUNBLFdBQ0EsV0FDQSxXQUNBLFdBQ0EsV0FDQSxVQUNBLFVBQ0EsU0FDQSxVQUVBLGdCQUNBLFlBQ0E7OztxRkNsQ0YsR0FBQSxPQUFBLFFBQUEsNkNBQ0EsV0FBQSxRQUFBLDREQUNBLFNBQUEsUUFBQSx1REFDQSxLQUFBLFFBQUEsbURBQ0EsS0FBQSxRQUFBLG1EQUNBLE1BQUEsUUFBQSxzREFDQSxTQUFBLFFBQUEsOERBQ0EsUUFBQSxRQUFBLDJEQUVNLEtBQU0sRUFBQSxPQUFBLFVBQ1osS0FBSSxLQUFJLEVBQUEsVUFBQSxZQUVSLElBQUksTUFBSixNQUFBLFNBQ0EsSUFBSSxNQUFKLE1BQUEsU0FDQSxJQUFJLE1BQUosT0FBQSxTQUdBLElBQUksT0FBTyxTQUFBLEdBQUEsT0FDVCxFQUFNLElBQU4sVUFBQSxTQUNBLEVBQU0sVUFBTixTQUFBLFdBR0YsSUFBTSxNQUFPLElBQUksT0FDakIsVUFBUyxLQUFLLFlBQVksT0FDMUIsRUFBQSxZQUFBLFNBQVUsU0FBUyxNQUVuQixTQUFTLGlCQUFpQixjQUFlLFdBQ3ZDLFNBQVMsaUJBQWlCLGFBQWMsV0FDdEMsUUFBUSxTQUdnQixXQUF0QixRQUFRLFlBQ1YsVUFBVSwyQkFBMkI7OztZQ2hDMUIsU0FBUyxVQUFTLEVBQVcsRUFBTyxHQUNqRCxNQUFRLEdBQVksRUFBUyxHQUFTLDBFQURoQjs7O3FGQ3FGeEIsUUFBUyxnQkFBZSxHQUN0QixNQUFPLGdCQUFBLFFBQVUsS0FBSyxTQUFBLEdBQUEsTUFBSyxHQUFFLE1BQVEsT0FBTyxLQUc5QyxRQUFTLGFBQVksR0FDbkIsR0FBTSxHQUFRLFlBQUEsUUFBTyxLQUFLLFNBQUEsR0FBQSxNQUFLLEdBQUUsTUFBUSxPQUFPLElBQ2hELFFBQU8sRUFBQSxRQUFBLFlBQVUsR0FDZixJQUFLLE1BQ0wsTUFBTyxZQUNQLFNBQVUsRUFDVixZQUFhLEVBQU0saUVBL0Z2QixJQUFBLGVBQUEsUUFBQSxzRUFDQSxXQUFBLFFBQUEsNkRBQ0EsT0FBQSxRQUFBLGdEQUNBLFVBQUEsUUFBQSx5REFDQSxLQUFBLFFBQUEsMENBQ0EsT0FBQSxRQUFBLGdEQUVNLFNBQVcsMkRBRVgsU0FBVyxTQUFDLEdBQ2hCLEdBQU0sR0FBUyxRQUFBLFFBQU0sSUFBSSxhQUN6QixRQUFRLEdBQ04sSUFBSyxXQUNILE1BQUEsWUFBbUIsRUFBbkIsd0JBQ0YsS0FBSyxXQUNILE1BQUEscURBQTRELEVBQTVELE1BSUEsS0FBTSxFQUFBLFdBQUEsNEJBR1YsVUFBVyxNQUNYLFNBQ0UsUUFBUyxTQUFDLEVBQUssRUFBTyxFQUFNLEdBQzFCLE9BQU8sRUFBQSxNQUFBLFNBQU8sU0FBUCxRQUF1QixHQUFTLE1BQU0sR0FDN0MsU0FBQyxFQUFLLEVBQUssR0FDTCxNQUFRLEVBQUssT0FDZixFQUFLLEtBQU0sR0FHWCxFQUFLLEVBQUssT0FBTyxnQkFJdkIsU0FBVSxRQUFBLEdBQUMsRUFBTSxFQUFPLEVBQU0sR0FDNUIsR0FBTSxHQUFXLFFBQUEsUUFBTSxJQUFJLGVBQzNCLE9BQUksT0FBUSxHQUFZLEVBQVMsT0FBUyxFQUNqQyxFQUFLLEtBQU0sT0FFcEIsR0FBSyxjQUFrQixTQUFTLFlBQWhDLElBQStDLEVBQy9DLFNBQUMsRUFBSyxHQUNKLEdBQUksTUFBUSxHQUFPLE1BQVEsRUFDekIsTUFBTyxHQUFLLG1CQUVkLElBQU0sR0FBVyxFQUFLLEVBQUssY0FBYyxRQUFRLEtBQU0sSUFDdkQsT0FBSyxJQUdMLFFBQUEsUUFBTSxJQUFJLGVBQWdCLE9BRTFCLEdBQUssS0FBTSxJQUpGLEVBQUssd0JBT2xCLFNBQVUsU0FBQyxFQUFVLEVBQU8sRUFBTSxHQUNoQyxFQUFLLGNBQWtCLFNBQVMsWUFBaEMsSUFBK0MsRUFBUyxHQUN4RCxTQUFDLEVBQUssR0FDSixHQUFJLE1BQVEsRUFDVixNQUFPLEdBQUsscUJBRkQsSUFJTCxHQUFpQixFQUFqQixZQUNSLElBQUksSUFBTSxFQUFhLE9BQ3JCLE1BQU8sR0FBSywwQkFFZCxJQUFNLEdBQWUsRUFDbEIsS0FBSyxTQUFBLEdBQUEsTUFBZSxHQUFTLE9BQVMsRUFBWSxlQUNsRCxPQUVHLEVBQVcsRUFDZCxPQUFPLFNBQUEsR0FBQSxNQUFlLEdBQVksU0FBVyxJQUM3QyxJQUFJLFNBQUEsR0FBQSxPQUNILEtBQU0sRUFBWSxhQUNsQixTQUFVLGVBQWUsRUFBWSxZQUNyQyxRQUNFLFlBQVksRUFBWSxVQUN4QixZQUFZLEVBQVksYUFJOUIsR0FBSyxLQUFNOzs7MklDL0VuQixJQUFBLFFBQUEsUUFBQSxnREFDQSxPQUFBLFFBQUEsZ0RBRUksYUFBQSx3QkFHRixVQUFXLE1BQ1gsT0FDRSxNQUFPLG9CQUNQLFFBQVMsd0JBQ1QsU0FBUyxFQUNULE1BQU8sR0FDUCxTQUFVLFFBQUEsUUFBTSxJQUFJLGlCQUFtQixHQUN2QyxPQUFRLFFBQUEsUUFBTSxJQUFJLGVBQWlCLElBRXJDLFNBQ0UsU0FBVSxTQUFDLEVBQVUsRUFBTyxFQUFNLEdBQ2hDLFFBQUEsUUFBTSxJQUFJLGVBQWdCLEdBQzFCLEVBQUssV0FBYSxTQUFBLEdBQVksSUFFaEMsT0FBUSxTQUFDLEVBQVEsRUFBTyxFQUFNLEdBQzVCLFFBQUEsUUFBTSxJQUFJLGFBQWMsR0FDeEIsRUFBSyxXQUFhLE9BQUEsR0FBVSxJQUU5QixRQUFTLFNBQUMsRUFBTSxFQUFPLEVBQU0sR0FDM0IsRUFBSyxXQUFhLE1BQU8sR0FBSSxTQUFTLEdBQVEsSUFFaEQsTUFBTyxTQUFDLEVBQU0sRUFBTyxFQUFNLEdBQ3pCLEVBQUssV0FBYSxNQUFPLEVBQUssSUFBSyxTQUFTLEdBQVMsR0FFckQsYUFBYSxjQUNiLGFBQWUsV0FBVyxXQUN4QixFQUFLLFdBQWEsTUFBTyxHQUFJLFNBQVMsR0FBUyxJQUM5QyxPQUdQLFVBQ0UsSUFBSyxTQUFDLEVBQU0sR0FBUCxPQUFpQixFQUFBLFFBQUEsU0FBTSxFQUFPOzs7MklDckN2QyxJQUFBLFFBQUEsUUFBQSxnREFFSSxhQUFlLG1CQUdqQixVQUFXLE9BQ1gsT0FDRSxhQUVGLFNBQ0UsTUFBTyxTQUFDLEVBQU0sRUFBTyxFQUFNLEdBQ3pCLEVBQUssY0FBZSxXQUNsQixFQUFLLGVBQWdCLEVBQU0sU0FBQyxFQUFLLEdBQy9CLE1BQUksR0FBWSxFQUFLLGFBQWUsSUFBQSxHQUFPLE9BRTNDLEdBQUssZUFBZ0IsRUFBVSxTQUFDLEVBQUssR0FDbkMsTUFBSSxHQUFZLEVBQUssYUFBZSxJQUFBLEdBQU8sT0FFM0MsR0FBSyxnQkFBaUIsRUFBVSxXQUM5QixFQUFLLHdCQUEwQixTQUFVLFdBQWEsWUFNaEUsU0FBVSxTQUFDLEVBQU8sRUFBTyxFQUFNLEdBQ3pCLGFBQWUsRUFBTSxPQUN2QixlQUNBLEVBQUsscUJBQXNCLEVBQU0sSUFBSyxJQUd0QyxFQUFLLDBCQUE0QixJQUFLLEVBQU0sSUFBSyxPQUFRLElBQU0sS0FJckUsVUFDRSxTQUFVLFNBQUMsRUFBVSxHQUFYLE9BQXdCLFNBQUEsSUFDbEMsY0FBZSxTQUFDLEVBQUssR0FBTixPQUNiLFNBQVUsRUFBTSxTQUFTLElBQUksU0FBQSxHQUFBLE9BQVUsRUFBQSxRQUFBLFNBQU0sR0FDM0MsT0FBUSxFQUFPLE9BQU8sSUFBSSxTQUFBLEdBQ3hCLE1BQUksR0FBTSxNQUFRLEdBQ1QsRUFBQSxRQUFBLFlBQVUsR0FDZixNQUFPLFdBQ1AsU0FBVSxFQUFNLFlBQWMsSUFJekIsVUFLZixrQkFBbUIsU0FBQyxFQUFNLEdBQVAsT0FDakIsU0FBVSxFQUFNLFNBQVMsSUFBSSxTQUFBLEdBQUEsT0FBVSxFQUFBLFFBQUEsU0FBTSxHQUMzQyxPQUFRLEVBQU8sT0FBTyxJQUFJLFNBQUEsR0FDeEIsR0FBSSxhQUFlLEVBQU0sTUFBTyxNQUFPLEVBQ3ZDLElBQUksRUFBSyxLQUFPLEVBQU0sTUFBUSxFQUFLLElBQUssTUFBTyxFQUUvQyxJQUFNLElBQVcsRUFBQSxRQUFBLFlBQVUsR0FDekIsU0FBVSxFQUFNLFNBQVcsRUFBSyxRQVNsQyxPQU5JLEdBQVMsVUFBWSxJQUN2QixFQUFTLFNBQVcsRUFDcEIsRUFBUyxNQUFRLFlBQ2pCLGdCQUdLLFVBSWIsWUFBYSxTQUFDLEVBQU0sR0FBUCxPQUNYLFNBQVUsRUFBTSxTQUFTLElBQUksU0FBQSxHQUMzQixNQUFJLEdBQU8sT0FBUyxFQUFLLE1BQ2hCLEVBQUEsUUFBQSxZQUFVLEdBQVUsU0FBVSxFQUFPLFVBR3JDLE9BS2YsZUFDRSxLQUFNLFNBQUMsRUFBTSxHQUNYLFlBQVksV0FDTixJQUFNLGNBQ1IsRUFBSywwQkFBNEIsT0FBUSxHQUFLLElBRS9DOzs7K1pDekZULE1BQUEsUUFBQSxrREFDQSxZQUFBLFFBQUEsMkZBRWUsU0FBQyxFQUFPLEVBQU0sR0FBZCxPQUFBLEVBQUEsT0FBQSxTQUFBLGlCQUVULEVBQUEsYUFBQSxTQUFXLEVBQU0sS0FBTSxFQUFNOzs7cTZEQ0xuQyxNQUFBLFFBQUEsa0RBQ0EsYUFBQSxRQUFBLGdFQUNBLFVBQUEsUUFBQSxtRUFFTSxTQUNKLEtBQU0sT0FBUSxNQUFPLEtBQU0sS0FBTSxNQUFPLE1BQU8sS0FBTSxNQUFPLE1BQU8sS0FBTSxNQUdyRSxhQUFlLFNBQUMsRUFBRyxFQUFPLEdBQzlCLEVBQUUsaUJBRUUsRUFBTSxJQUFJLFNBQ1osRUFBSyxhQUFjLEVBQU0sSUFBSSxVQUc3QixFQUFLLFlBQWEsd0JBSWhCLFlBQWMsU0FBQyxFQUFHLEVBQU8sR0FDN0IsRUFBSyxlQUFnQixFQUFFLE9BQU8sUUFHMUIsYUFBZSxTQUFDLEVBQUcsRUFBTyxHQUM5QixFQUFLLGFBQWMsRUFBRSxPQUFPLFFBR3hCLGNBQWdCLFNBQUMsR0FBRCxPQUFXLEVBQUEsYUFBQSxTQUFBLG1CQUFBLFdBQ2pCLEVBQU0sSUFBSSxXQUdwQixhQUFlLFNBQUMsRUFBUSxHQUFULE9BQUEsRUFBQSxPQUFBLFNBQUEsZ0JBQ1QsSUFBVyxFQUFNLElBQUksT0FBUyxXQUFhLEdBQU0sSUFHdkQsWUFBYyxTQUFDLEdBQUQsT0FBQSxFQUFBLE9BQUEsU0FBQSxpQkFDUSxvQkFHYixTQUFDLEVBQU8sRUFBTSxHQUFkLE9BQUEsRUFBQSxPQUFBLFNBQUEsaUJBSXFCLEVBQU0sSUFBSSxRQUVkLGNBQWMsR0FDN0IsU0FBQSxHQUFBLE1BQUssY0FBYSxFQUFHLEVBQU8sSUFNekIsRUFBTSxJQUFJLFNBQ2hCLEVBQU0sSUFBSSxRQUFVLFdBQWEsR0FDekIsU0FBQSxHQUFBLE1BQUssYUFBWSxFQUFHLEVBQU8sSUFFTixTQUFBLEdBQUEsTUFBSyxjQUFhLEVBQUcsRUFBTyxJQUMzRCxRQUFRLElBQUksU0FBQSxHQUFBLE1BQVUsY0FBYSxFQUFRLE1BS2pELEVBQUEsV0FBQSxTQUFTLEVBQU0sSUFBSSxNQUFPLEVBQU0sSUFBSSxNQUFPOzs7dXVCQzlEakQsTUFBQSxRQUFBLGtEQUNBLGFBQUEsUUFBQSxnRUFDQSxTQUFBLFFBQUEsc0RBQ0EsV0FBQSxRQUFBLCtEQUVNLFlBQWMsU0FBQyxFQUFHLEVBQVEsR0FDMUIsT0FBUSxFQUFBLFVBQUEsU0FBUSxFQUFFLE9BQVEsZUFBZSxJQUMzQyxFQUFLLG1CQUFvQixJQUl2QixjQUFnQixTQUFDLEdBQUQsT0FBWSxFQUFBLGFBQUEsU0FBQSxtQkFBQSxXQUNsQixFQUFPLDJCQUdSLFNBQUMsRUFBUSxFQUFNLEdBQWYsT0FBQSxFQUFBLE9BQUEsU0FBQSxnQkFDWSxjQUFjLEdBQzNCLFNBQUEsR0FBQSxNQUFLLGFBQVksRUFBRyxFQUFRLElBRWIsRUFBTyxTQUFTLE1BRXZDLEVBQUEsWUFBQSxTQUFVLEVBQVEsRUFBTTs7O3VaQ3JCOUIsTUFBQSxRQUFBLGtEQUNBLFNBQUEsUUFBQSxzREFDQSxZQUFBLFFBQUEsa0VBRUksU0FBQSxPQUVFLFFBQVUsU0FBQyxHQUFELE1BQVEsT0FBTSxVQUFVLFFBQVEsS0FDOUMsRUFBRyxXQUFXLFdBQVksSUFFdEIsZ0JBQWtCLFNBQUMsR0FDdkIsR0FBTSxJQUFPLEVBQUEsVUFBQSxTQUFRLEVBQUUsT0FBUSxlQUMvQixHQUFLLGlCQUFpQixZQUFhLGdCQUNuQyxFQUFLLGlCQUFpQixVQUFXLGNBRWpDLElBQU0sSUFBVyxFQUFBLFVBQUEsU0FBUSxFQUFFLE9BQVEsZ0JBQWdCLEVBRW5ELFdBQ0UsVUFBVSxFQUNWLE1BQU8sRUFBRSxRQUNULE1BQU8sUUFBUSxHQUNmLEtBQUEsRUFDQSxTQUFBLElBSUUsZUFBaUIsU0FBQyxHQUFNLEdBQUEsR0FDRCxTQUFuQixFQURvQixFQUNwQixLQUFNLEVBRGMsRUFDZCxRQU9kLEtBTEssU0FBUyxVQUFZLEtBQUssSUFBSSxFQUFFLFFBQVUsU0FBUyxPQUFTLEtBQy9ELEVBQVMsVUFBVSxJQUFJLGFBQ3ZCLFNBQVMsVUFBVyxHQUdsQixTQUFTLFNBQVUsQ0FDckIsR0FDTSxJQURVLFNBQVMsaUJBQWlCLEVBQUUsUUFBUyxFQUFFLFVBQ3JDLEVBQUEsVUFBQSxTQUFRLEVBQUUsT0FBUSxnQkFBZ0IsR0FFcEQsSUFBSSxNQUFRLEVBQVcsQ0FDckIsR0FBTSxHQUFZLFFBQVEsR0FDcEIsRUFBVyxFQUFVLGtCQUV2QixLQUFjLFNBQVMsUUFDekIsRUFBSyxhQUFhLEVBQVUsR0FDNUIsU0FBUyxNQUFRLE1BTW5CLGNBQWdCLFFBQWhCLEdBQWlCLEdBQU0sR0FBQSxHQUNBLFNBQW5CLEVBRG1CLEVBQ25CLEtBQU0sRUFEYSxFQUNiLFFBRWQsR0FBUyxVQUFVLE9BQU8sYUFDMUIsRUFBUyxNQUFNLFVBQVksR0FFM0IsRUFBSyxvQkFBb0IsWUFBYSxnQkFDdEMsRUFBSyxvQkFBb0IsVUFBVyxvQkFHdkIsU0FBQyxFQUFNLEVBQU0sR0FBYixPQUFBLEVBQUEsT0FBQSxTQUFBLGdCQUVULEVBQUssU0FBUyxJQUFJLFNBQUEsR0FBQSxPQUFVLEVBQUEsYUFBQSxTQUFXLEVBQVEsRUFBTTs7O200Q0M3RDNELE1BQUEsUUFBQSxrREFDQSxhQUFBLFFBQUEsZ0VBQ0EsVUFBQSxRQUFBLG1FQUVNLFlBQWMsU0FBQyxFQUFHLEVBQU8sR0FDN0IsRUFBSyxnQkFBaUIsSUFHbEIsY0FBZ0IsU0FBQyxHQUFELEdBQUEsRUFBQSxRQUFXLEVBQUEsYUFBQSxVQUFBLEtBQUEsZ0JBQUEsRUFBQSxJQUMxQixFQUFNLElBQU8sR0FEYSxnQkFBQSxFQUFBLElBRTFCLEVBQU0sT0FBVSxHQUZVLGdCQUFBLEVBQUEsVUFHbEIsRUFBTSxVQUFZLElBQU0sRUFBTSxTQUFXLElBSHZCLGdCQUFBLEVBQUEsVUFJbEIsRUFBTSxVQUFZLElBQU0sRUFBTSxTQUFXLEdBSnZCLEtBTzNCLGdCQUFrQixTQUFDLEdBQ3ZCLEdBQU0sR0FBSSxHQUNKLEVBQUksRUFBSSxFQUFNLFNBQVcsRUFBTSxZQUMvQixFQUFJLEVBQUksS0FBSyxHQUFLLEVBQ2xCLEVBQUksRUFBSSxLQUFLLEdBQUssRUFBSSxFQUN0QixFQUFJLEtBQUssSUFBSSxHQUFLLEVBQ2xCLEVBQUksS0FBSyxJQUFJLElBQU0sQ0FFekIsUUFBQSxFQUFBLE9BQUEsU0FBQSxnQkFBQSxhQUM4QixFQUQ5QixLQUNvQyxFQURwQyxJQUFBLFFBS3VDLEVBTHZDLE1BSzhDLEVBTDlDLElBS21ELEVBTG5ELE1BSzBELEVBTDFELE1BS2lFLEVBTGpFLElBS3NFLElBS2xFLGVBQWlCLFNBQUMsR0FBRCxPQUFBLEVBQUEsT0FBQSxTQUFBLGlCQUdqQixnQkFBZ0IscUJBSVAsU0FBQyxFQUFPLEVBQU0sR0FBZCxPQUFBLEVBQUEsT0FBQSxTQUFBLGlCQUVTLGNBQWMsR0FDeEIsU0FBQSxHQUFBLE1BQUssYUFBWSxFQUFHLEVBQU8sS0FDbkMsRUFBQSxXQUFBLFNBQVMsYUFBZSxFQUFNLE1BQU8sRUFBTyxnQkFFcEIsRUFBTTs7O3FaQzlDcEMsTUFBQSxRQUFBLGtEQUNBLFdBQUEsUUFBQSwrRUFFZSxTQUFDLEVBQVEsRUFBTSxHQUFmLE9BQUEsRUFBQSxPQUFBLFNBQUEsZ0JBRVQsRUFBTyxPQUFPLElBQUksU0FBQSxHQUFBLE9BQVMsRUFBQSxZQUFBLFNBQVUsRUFBTyxFQUFNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gYXBwbHlIb29rXG5cbi8vIGFwcGx5IGFyZ3VtZW50cyBvbnRvIGFuIGFycmF5IG9mIGZ1bmN0aW9ucywgdXNlZnVsIGZvciBob29rc1xuLy8gKGFyciwgYW55PywgYW55PywgYW55PywgYW55PywgYW55PykgLT4gbnVsbFxuZnVuY3Rpb24gYXBwbHlIb29rIChhcnIsIGFyZzEsIGFyZzIsIGFyZzMsIGFyZzQsIGFyZzUpIHtcbiAgYXJyLmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XG4gICAgZm4oYXJnMSwgYXJnMiwgYXJnMywgYXJnNCwgYXJnNSlcbiAgfSlcbn1cbiIsImNvbnN0IG11dGF0ZSA9IHJlcXVpcmUoJ3h0ZW5kL211dGFibGUnKVxuY29uc3QgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0JylcbmNvbnN0IHh0ZW5kID0gcmVxdWlyZSgneHRlbmQnKVxuXG5jb25zdCBhcHBseUhvb2sgPSByZXF1aXJlKCcuL2FwcGx5LWhvb2snKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRpc3BhdGNoZXJcblxuLy8gaW5pdGlhbGl6ZSBhIG5ldyBiYXJyYWNrcyBpbnN0YW5jZVxuLy8gb2JqIC0+IG9ialxuZnVuY3Rpb24gZGlzcGF0Y2hlciAoaG9va3MpIHtcbiAgaG9va3MgPSBob29rcyB8fCB7fVxuICBhc3NlcnQuZXF1YWwodHlwZW9mIGhvb2tzLCAnb2JqZWN0JywgJ2JhcnJhY2tzOiBob29rcyBzaG91bGQgYmUgdW5kZWZpbmVkIG9yIGFuIG9iamVjdCcpXG5cbiAgY29uc3Qgb25TdGF0ZUNoYW5nZUhvb2tzID0gW11cbiAgY29uc3Qgb25BY3Rpb25Ib29rcyA9IFtdXG4gIGNvbnN0IG9uRXJyb3JIb29rcyA9IFtdXG5cbiAgY29uc3Qgc3Vic2NyaXB0aW9uV3JhcHMgPSBbXVxuICBjb25zdCBpbml0aWFsU3RhdGVXcmFwcyA9IFtdXG4gIGNvbnN0IHJlZHVjZXJXcmFwcyA9IFtdXG4gIGNvbnN0IGVmZmVjdFdyYXBzID0gW11cblxuICB1c2UoaG9va3MpXG5cbiAgdmFyIHJlZHVjZXJzQ2FsbGVkID0gZmFsc2VcbiAgdmFyIGVmZmVjdHNDYWxsZWQgPSBmYWxzZVxuICB2YXIgc3RhdGVDYWxsZWQgPSBmYWxzZVxuICB2YXIgc3Vic0NhbGxlZCA9IGZhbHNlXG5cbiAgY29uc3Qgc3Vic2NyaXB0aW9ucyA9IHN0YXJ0Ll9zdWJzY3JpcHRpb25zID0ge31cbiAgY29uc3QgcmVkdWNlcnMgPSBzdGFydC5fcmVkdWNlcnMgPSB7fVxuICBjb25zdCBlZmZlY3RzID0gc3RhcnQuX2VmZmVjdHMgPSB7fVxuICBjb25zdCBtb2RlbHMgPSBzdGFydC5fbW9kZWxzID0gW11cbiAgdmFyIF9zdGF0ZSA9IHt9XG5cbiAgc3RhcnQubW9kZWwgPSBzZXRNb2RlbFxuICBzdGFydC5zdGF0ZSA9IGdldFN0YXRlXG4gIHN0YXJ0LnN0YXJ0ID0gc3RhcnRcbiAgc3RhcnQudXNlID0gdXNlXG4gIHJldHVybiBzdGFydFxuXG4gIC8vIHB1c2ggYW4gb2JqZWN0IG9mIGhvb2tzIG9udG8gYW4gYXJyYXlcbiAgLy8gb2JqIC0+IG51bGxcbiAgZnVuY3Rpb24gdXNlIChob29rcykge1xuICAgIGFzc2VydC5lcXVhbCh0eXBlb2YgaG9va3MsICdvYmplY3QnLCAnYmFycmFja3MudXNlOiBob29rcyBzaG91bGQgYmUgYW4gb2JqZWN0JylcbiAgICBhc3NlcnQub2soIWhvb2tzLm9uRXJyb3IgfHwgdHlwZW9mIGhvb2tzLm9uRXJyb3IgPT09ICdmdW5jdGlvbicsICdiYXJyYWNrcy51c2U6IG9uRXJyb3Igc2hvdWxkIGJlIHVuZGVmaW5lZCBvciBhIGZ1bmN0aW9uJylcbiAgICBhc3NlcnQub2soIWhvb2tzLm9uQWN0aW9uIHx8IHR5cGVvZiBob29rcy5vbkFjdGlvbiA9PT0gJ2Z1bmN0aW9uJywgJ2JhcnJhY2tzLnVzZTogb25BY3Rpb24gc2hvdWxkIGJlIHVuZGVmaW5lZCBvciBhIGZ1bmN0aW9uJylcbiAgICBhc3NlcnQub2soIWhvb2tzLm9uU3RhdGVDaGFuZ2UgfHwgdHlwZW9mIGhvb2tzLm9uU3RhdGVDaGFuZ2UgPT09ICdmdW5jdGlvbicsICdiYXJyYWNrcy51c2U6IG9uU3RhdGVDaGFuZ2Ugc2hvdWxkIGJlIHVuZGVmaW5lZCBvciBhIGZ1bmN0aW9uJylcblxuICAgIGlmIChob29rcy5vblN0YXRlQ2hhbmdlKSBvblN0YXRlQ2hhbmdlSG9va3MucHVzaChob29rcy5vblN0YXRlQ2hhbmdlKVxuICAgIGlmIChob29rcy5vbkVycm9yKSBvbkVycm9ySG9va3MucHVzaCh3cmFwT25FcnJvcihob29rcy5vbkVycm9yKSlcbiAgICBpZiAoaG9va3Mub25BY3Rpb24pIG9uQWN0aW9uSG9va3MucHVzaChob29rcy5vbkFjdGlvbilcbiAgICBpZiAoaG9va3Mud3JhcFN1YnNjcmlwdGlvbnMpIHN1YnNjcmlwdGlvbldyYXBzLnB1c2goaG9va3Mud3JhcFN1YnNjcmlwdGlvbnMpXG4gICAgaWYgKGhvb2tzLndyYXBJbml0aWFsU3RhdGUpIGluaXRpYWxTdGF0ZVdyYXBzLnB1c2goaG9va3Mud3JhcEluaXRpYWxTdGF0ZSlcbiAgICBpZiAoaG9va3Mud3JhcFJlZHVjZXJzKSByZWR1Y2VyV3JhcHMucHVzaChob29rcy53cmFwUmVkdWNlcnMpXG4gICAgaWYgKGhvb2tzLndyYXBFZmZlY3RzKSBlZmZlY3RXcmFwcy5wdXNoKGhvb2tzLndyYXBFZmZlY3RzKVxuICB9XG5cbiAgLy8gcHVzaCBhIG1vZGVsIHRvIGJlIGluaXRpYXRlZFxuICAvLyBvYmogLT4gbnVsbFxuICBmdW5jdGlvbiBzZXRNb2RlbCAobW9kZWwpIHtcbiAgICBhc3NlcnQuZXF1YWwodHlwZW9mIG1vZGVsLCAnb2JqZWN0JywgJ2JhcnJhY2tzLnN0b3JlLm1vZGVsOiBtb2RlbCBzaG91bGQgYmUgYW4gb2JqZWN0JylcbiAgICBtb2RlbHMucHVzaChtb2RlbClcbiAgfVxuXG4gIC8vIGdldCB0aGUgY3VycmVudCBzdGF0ZSBmcm9tIHRoZSBzdG9yZVxuICAvLyBvYmo/IC0+IG9ialxuICBmdW5jdGlvbiBnZXRTdGF0ZSAob3B0cykge1xuICAgIG9wdHMgPSBvcHRzIHx8IHt9XG4gICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBvcHRzLCAnb2JqZWN0JywgJ2JhcnJhY2tzLnN0b3JlLnN0YXRlOiBvcHRzIHNob3VsZCBiZSBhbiBvYmplY3QnKVxuXG4gICAgY29uc3Qgc3RhdGUgPSBvcHRzLnN0YXRlXG4gICAgaWYgKCFvcHRzLnN0YXRlICYmIG9wdHMuZnJlZXplID09PSBmYWxzZSkgcmV0dXJuIHh0ZW5kKF9zdGF0ZSlcbiAgICBlbHNlIGlmICghb3B0cy5zdGF0ZSkgcmV0dXJuIE9iamVjdC5mcmVlemUoeHRlbmQoX3N0YXRlKSlcbiAgICBhc3NlcnQuZXF1YWwodHlwZW9mIHN0YXRlLCAnb2JqZWN0JywgJ2JhcnJhY2tzLnN0b3JlLnN0YXRlOiBzdGF0ZSBzaG91bGQgYmUgYW4gb2JqZWN0JylcblxuICAgIGNvbnN0IG5hbWVzcGFjZXMgPSBbXVxuICAgIGNvbnN0IG5ld1N0YXRlID0ge31cblxuICAgIC8vIGFwcGx5IGFsbCBmaWVsZHMgZnJvbSB0aGUgbW9kZWwsIGFuZCBuYW1lc3BhY2VkIGZpZWxkcyBmcm9tIHRoZSBwYXNzZWRcbiAgICAvLyBpbiBzdGF0ZVxuICAgIG1vZGVscy5mb3JFYWNoKGZ1bmN0aW9uIChtb2RlbCkge1xuICAgICAgY29uc3QgbnMgPSBtb2RlbC5uYW1lc3BhY2VcbiAgICAgIG5hbWVzcGFjZXMucHVzaChucylcbiAgICAgIGNvbnN0IG1vZGVsU3RhdGUgPSBtb2RlbC5zdGF0ZSB8fCB7fVxuICAgICAgaWYgKG5zKSB7XG4gICAgICAgIG5ld1N0YXRlW25zXSA9IG5ld1N0YXRlW25zXSB8fCB7fVxuICAgICAgICBhcHBseShucywgbW9kZWxTdGF0ZSwgbmV3U3RhdGUpXG4gICAgICAgIG5ld1N0YXRlW25zXSA9IHh0ZW5kKG5ld1N0YXRlW25zXSwgc3RhdGVbbnNdKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbXV0YXRlKG5ld1N0YXRlLCBtb2RlbFN0YXRlKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBub3cgYXBwbHkgYWxsIGZpZWxkcyB0aGF0IHdlcmVuJ3QgbmFtZXNwYWNlZCBmcm9tIHRoZSBwYXNzZWQgaW4gc3RhdGVcbiAgICBPYmplY3Qua2V5cyhzdGF0ZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBpZiAobmFtZXNwYWNlcy5pbmRleE9mKGtleSkgIT09IC0xKSByZXR1cm5cbiAgICAgIG5ld1N0YXRlW2tleV0gPSBzdGF0ZVtrZXldXG4gICAgfSlcblxuICAgIGNvbnN0IHRtcFN0YXRlID0geHRlbmQoX3N0YXRlLCB4dGVuZChzdGF0ZSwgbmV3U3RhdGUpKVxuICAgIGNvbnN0IHdyYXBwZWRTdGF0ZSA9IHdyYXBIb29rKHRtcFN0YXRlLCBpbml0aWFsU3RhdGVXcmFwcylcblxuICAgIHJldHVybiAob3B0cy5mcmVlemUgPT09IGZhbHNlKVxuICAgICAgPyB3cmFwcGVkU3RhdGVcbiAgICAgIDogT2JqZWN0LmZyZWV6ZSh3cmFwcGVkU3RhdGUpXG4gIH1cblxuICAvLyBpbml0aWFsaXplIHRoZSBzdG9yZSBob29rcywgZ2V0IHRoZSBzZW5kKCkgZnVuY3Rpb25cbiAgLy8gb2JqPyAtPiBmblxuICBmdW5jdGlvbiBzdGFydCAob3B0cykge1xuICAgIG9wdHMgPSBvcHRzIHx8IHt9XG4gICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBvcHRzLCAnb2JqZWN0JywgJ2JhcnJhY2tzLnN0b3JlLnN0YXJ0OiBvcHRzIHNob3VsZCBiZSB1bmRlZmluZWQgb3IgYW4gb2JqZWN0JylcblxuICAgIC8vIHJlZ2lzdGVyIHZhbHVlcyBmcm9tIHRoZSBtb2RlbHNcbiAgICBtb2RlbHMuZm9yRWFjaChmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgIGNvbnN0IG5zID0gbW9kZWwubmFtZXNwYWNlXG4gICAgICBpZiAoIXN0YXRlQ2FsbGVkICYmIG1vZGVsLnN0YXRlICYmIG9wdHMuc3RhdGUgIT09IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IG1vZGVsU3RhdGUgPSBtb2RlbC5zdGF0ZSB8fCB7fVxuICAgICAgICBpZiAobnMpIHtcbiAgICAgICAgICBfc3RhdGVbbnNdID0gX3N0YXRlW25zXSB8fCB7fVxuICAgICAgICAgIGFwcGx5KG5zLCBtb2RlbFN0YXRlLCBfc3RhdGUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbXV0YXRlKF9zdGF0ZSwgbW9kZWxTdGF0ZSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFyZWR1Y2Vyc0NhbGxlZCAmJiBtb2RlbC5yZWR1Y2VycyAmJiBvcHRzLnJlZHVjZXJzICE9PSBmYWxzZSkge1xuICAgICAgICBhcHBseShucywgbW9kZWwucmVkdWNlcnMsIHJlZHVjZXJzLCBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICByZXR1cm4gd3JhcEhvb2soY2IsIHJlZHVjZXJXcmFwcylcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGlmICghZWZmZWN0c0NhbGxlZCAmJiBtb2RlbC5lZmZlY3RzICYmIG9wdHMuZWZmZWN0cyAhPT0gZmFsc2UpIHtcbiAgICAgICAgYXBwbHkobnMsIG1vZGVsLmVmZmVjdHMsIGVmZmVjdHMsIGZ1bmN0aW9uIChjYikge1xuICAgICAgICAgIHJldHVybiB3cmFwSG9vayhjYiwgZWZmZWN0V3JhcHMpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBpZiAoIXN1YnNDYWxsZWQgJiYgbW9kZWwuc3Vic2NyaXB0aW9ucyAmJiBvcHRzLnN1YnNjcmlwdGlvbnMgIT09IGZhbHNlKSB7XG4gICAgICAgIGFwcGx5KG5zLCBtb2RlbC5zdWJzY3JpcHRpb25zLCBzdWJzY3JpcHRpb25zLCBmdW5jdGlvbiAoY2IsIGtleSkge1xuICAgICAgICAgIGNvbnN0IHNlbmQgPSBjcmVhdGVTZW5kKCdzdWJzY3JpcHRpb246ICcgKyAobnMgPyBucyArICc6JyArIGtleSA6IGtleSkpXG4gICAgICAgICAgY2IgPSB3cmFwSG9vayhjYiwgc3Vic2NyaXB0aW9uV3JhcHMpXG4gICAgICAgICAgY2Ioc2VuZCwgZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgYXBwbHlIb29rKG9uRXJyb3JIb29rcywgZXJyLCBfc3RhdGUsIGNyZWF0ZVNlbmQpXG4gICAgICAgICAgfSlcbiAgICAgICAgICByZXR1cm4gY2JcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gdGhlIHN0YXRlIHdyYXAgaXMgc3BlY2lhbCBiZWNhdXNlIHdlIHdhbnQgdG8gb3BlcmF0ZSBvbiB0aGUgZnVsbFxuICAgIC8vIHN0YXRlIHJhdGhlciB0aGFuIGluZHZpZHVhbCBjaHVua3MsIHNvIHdlIGFwcGx5IGl0IG91dHNpZGUgdGhlIGxvb3BcbiAgICBpZiAoIXN0YXRlQ2FsbGVkICYmIG9wdHMuc3RhdGUgIT09IGZhbHNlKSB7XG4gICAgICBfc3RhdGUgPSB3cmFwSG9vayhfc3RhdGUsIGluaXRpYWxTdGF0ZVdyYXBzKVxuICAgIH1cblxuICAgIGlmICghb3B0cy5ub1N1YnNjcmlwdGlvbnMpIHN1YnNDYWxsZWQgPSB0cnVlXG4gICAgaWYgKCFvcHRzLm5vUmVkdWNlcnMpIHJlZHVjZXJzQ2FsbGVkID0gdHJ1ZVxuICAgIGlmICghb3B0cy5ub0VmZmVjdHMpIGVmZmVjdHNDYWxsZWQgPSB0cnVlXG4gICAgaWYgKCFvcHRzLm5vU3RhdGUpIHN0YXRlQ2FsbGVkID0gdHJ1ZVxuXG4gICAgaWYgKCFvbkVycm9ySG9va3MubGVuZ3RoKSBvbkVycm9ySG9va3MucHVzaCh3cmFwT25FcnJvcihkZWZhdWx0T25FcnJvcikpXG5cbiAgICByZXR1cm4gY3JlYXRlU2VuZFxuXG4gICAgLy8gY2FsbCBhbiBhY3Rpb24gZnJvbSBhIHZpZXdcbiAgICAvLyAoc3RyLCBib29sPykgLT4gKHN0ciwgYW55PywgZm4/KSAtPiBudWxsXG4gICAgZnVuY3Rpb24gY3JlYXRlU2VuZCAoc2VsZk5hbWUsIGNhbGxPbkVycm9yKSB7XG4gICAgICBhc3NlcnQuZXF1YWwodHlwZW9mIHNlbGZOYW1lLCAnc3RyaW5nJywgJ2JhcnJhY2tzLnN0b3JlLnN0YXJ0LmNyZWF0ZVNlbmQ6IHNlbGZOYW1lIHNob3VsZCBiZSBhIHN0cmluZycpXG4gICAgICBhc3NlcnQub2soIWNhbGxPbkVycm9yIHx8IHR5cGVvZiBjYWxsT25FcnJvciA9PT0gJ2Jvb2xlYW4nLCAnYmFycmFja3Muc3RvcmUuc3RhcnQuc2VuZDogY2FsbE9uRXJyb3Igc2hvdWxkIGJlIHVuZGVmaW5lZCBvciBhIGJvb2xlYW4nKVxuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gc2VuZCAobmFtZSwgZGF0YSwgY2IpIHtcbiAgICAgICAgaWYgKCFjYiAmJiAhY2FsbE9uRXJyb3IpIHtcbiAgICAgICAgICBjYiA9IGRhdGFcbiAgICAgICAgICBkYXRhID0gbnVsbFxuICAgICAgICB9XG4gICAgICAgIGRhdGEgPSAodHlwZW9mIGRhdGEgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IGRhdGEpXG5cbiAgICAgICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBuYW1lLCAnc3RyaW5nJywgJ2JhcnJhY2tzLnN0b3JlLnN0YXJ0LnNlbmQ6IG5hbWUgc2hvdWxkIGJlIGEgc3RyaW5nJylcbiAgICAgICAgYXNzZXJ0Lm9rKCFjYiB8fCB0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicsICdiYXJyYWNrcy5zdG9yZS5zdGFydC5zZW5kOiBjYiBzaG91bGQgYmUgYSBmdW5jdGlvbicpXG5cbiAgICAgICAgY29uc3QgZG9uZSA9IGNhbGxPbkVycm9yID8gb25FcnJvckNhbGxiYWNrIDogY2JcbiAgICAgICAgX3NlbmQobmFtZSwgZGF0YSwgc2VsZk5hbWUsIGRvbmUpXG5cbiAgICAgICAgZnVuY3Rpb24gb25FcnJvckNhbGxiYWNrIChlcnIpIHtcbiAgICAgICAgICBlcnIgPSBlcnIgfHwgbnVsbFxuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIGFwcGx5SG9vayhvbkVycm9ySG9va3MsIGVyciwgX3N0YXRlLCBmdW5jdGlvbiBjcmVhdGVTZW5kIChzZWxmTmFtZSkge1xuICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gc2VuZCAobmFtZSwgZGF0YSkge1xuICAgICAgICAgICAgICAgIGFzc2VydC5lcXVhbCh0eXBlb2YgbmFtZSwgJ3N0cmluZycsICdiYXJyYWNrcy5zdG9yZS5zdGFydC5zZW5kOiBuYW1lIHNob3VsZCBiZSBhIHN0cmluZycpXG4gICAgICAgICAgICAgICAgZGF0YSA9ICh0eXBlb2YgZGF0YSA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogZGF0YSlcbiAgICAgICAgICAgICAgICBfc2VuZChuYW1lLCBkYXRhLCBzZWxmTmFtZSwgZG9uZSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjYWxsIGFuIGFjdGlvblxuICAgIC8vIChzdHIsIHN0ciwgYW55LCBmbikgLT4gbnVsbFxuICAgIGZ1bmN0aW9uIF9zZW5kIChuYW1lLCBkYXRhLCBjYWxsZXIsIGNiKSB7XG4gICAgICBhc3NlcnQuZXF1YWwodHlwZW9mIG5hbWUsICdzdHJpbmcnLCAnYmFycmFja3MuX3NlbmQ6IG5hbWUgc2hvdWxkIGJlIGEgc3RyaW5nJylcbiAgICAgIGFzc2VydC5lcXVhbCh0eXBlb2YgY2FsbGVyLCAnc3RyaW5nJywgJ2JhcnJhY2tzLl9zZW5kOiBjYWxsZXIgc2hvdWxkIGJlIGEgc3RyaW5nJylcbiAgICAgIGFzc2VydC5lcXVhbCh0eXBlb2YgY2IsICdmdW5jdGlvbicsICdiYXJyYWNrcy5fc2VuZDogY2Igc2hvdWxkIGJlIGEgZnVuY3Rpb24nKVxuXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlZHVjZXJzQ2FsbGVkID0gZmFsc2VcbiAgICAgICAgdmFyIGVmZmVjdHNDYWxsZWQgPSBmYWxzZVxuICAgICAgICBjb25zdCBuZXdTdGF0ZSA9IHh0ZW5kKF9zdGF0ZSlcblxuICAgICAgICBpZiAob25BY3Rpb25Ib29rcy5sZW5ndGgpIHtcbiAgICAgICAgICBhcHBseUhvb2sob25BY3Rpb25Ib29rcywgZGF0YSwgX3N0YXRlLCBuYW1lLCBjYWxsZXIsIGNyZWF0ZVNlbmQpXG4gICAgICAgIH1cblxuICAgICAgICAvLyB2YWxpZGF0ZSBpZiBhIG5hbWVzcGFjZSBleGlzdHMuIE5hbWVzcGFjZXMgYXJlIGRlbGltaXRlZCBieSAnOicuXG4gICAgICAgIHZhciBhY3Rpb25OYW1lID0gbmFtZVxuICAgICAgICBpZiAoLzovLnRlc3QobmFtZSkpIHtcbiAgICAgICAgICBjb25zdCBhcnIgPSBuYW1lLnNwbGl0KCc6JylcbiAgICAgICAgICB2YXIgbnMgPSBhcnIuc2hpZnQoKVxuICAgICAgICAgIGFjdGlvbk5hbWUgPSBhcnIuam9pbignOicpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBfcmVkdWNlcnMgPSBucyA/IHJlZHVjZXJzW25zXSA6IHJlZHVjZXJzXG4gICAgICAgIGlmIChfcmVkdWNlcnMgJiYgX3JlZHVjZXJzW2FjdGlvbk5hbWVdKSB7XG4gICAgICAgICAgaWYgKG5zKSB7XG4gICAgICAgICAgICBjb25zdCByZWR1Y2VkU3RhdGUgPSBfcmVkdWNlcnNbYWN0aW9uTmFtZV0oZGF0YSwgX3N0YXRlW25zXSlcbiAgICAgICAgICAgIG5ld1N0YXRlW25zXSA9IHh0ZW5kKF9zdGF0ZVtuc10sIHJlZHVjZWRTdGF0ZSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbXV0YXRlKG5ld1N0YXRlLCByZWR1Y2Vyc1thY3Rpb25OYW1lXShkYXRhLCBfc3RhdGUpKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZWR1Y2Vyc0NhbGxlZCA9IHRydWVcbiAgICAgICAgICBpZiAob25TdGF0ZUNoYW5nZUhvb2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgYXBwbHlIb29rKG9uU3RhdGVDaGFuZ2VIb29rcywgZGF0YSwgbmV3U3RhdGUsIF9zdGF0ZSwgYWN0aW9uTmFtZSwgY3JlYXRlU2VuZClcbiAgICAgICAgICB9XG4gICAgICAgICAgX3N0YXRlID0gbmV3U3RhdGVcbiAgICAgICAgICBjYihudWxsLCBuZXdTdGF0ZSlcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IF9lZmZlY3RzID0gbnMgPyBlZmZlY3RzW25zXSA6IGVmZmVjdHNcbiAgICAgICAgaWYgKCFyZWR1Y2Vyc0NhbGxlZCAmJiBfZWZmZWN0cyAmJiBfZWZmZWN0c1thY3Rpb25OYW1lXSkge1xuICAgICAgICAgIGNvbnN0IHNlbmQgPSBjcmVhdGVTZW5kKCdlZmZlY3Q6ICcgKyBuYW1lKVxuICAgICAgICAgIGlmIChucykgX2VmZmVjdHNbYWN0aW9uTmFtZV0oZGF0YSwgX3N0YXRlW25zXSwgc2VuZCwgY2IpXG4gICAgICAgICAgZWxzZSBfZWZmZWN0c1thY3Rpb25OYW1lXShkYXRhLCBfc3RhdGUsIHNlbmQsIGNiKVxuICAgICAgICAgIGVmZmVjdHNDYWxsZWQgPSB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXJlZHVjZXJzQ2FsbGVkICYmICFlZmZlY3RzQ2FsbGVkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCBhY3Rpb24gJyArIGFjdGlvbk5hbWUpXG4gICAgICAgIH1cbiAgICAgIH0sIDApXG4gICAgfVxuICB9XG59XG5cbi8vIGNvbXBvc2UgYW4gb2JqZWN0IGNvbmRpdGlvbmFsbHlcbi8vIG9wdGlvbmFsbHkgY29udGFpbnMgYSBuYW1lc3BhY2Vcbi8vIHdoaWNoIGlzIHVzZWQgdG8gbmVzdCBwcm9wZXJ0aWVzLlxuLy8gKHN0ciwgb2JqLCBvYmosIGZuPykgLT4gbnVsbFxuZnVuY3Rpb24gYXBwbHkgKG5zLCBzb3VyY2UsIHRhcmdldCwgd3JhcCkge1xuICBpZiAobnMgJiYgIXRhcmdldFtuc10pIHRhcmdldFtuc10gPSB7fVxuICBPYmplY3Qua2V5cyhzb3VyY2UpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIGNvbnN0IGNiID0gd3JhcCA/IHdyYXAoc291cmNlW2tleV0sIGtleSkgOiBzb3VyY2Vba2V5XVxuICAgIGlmIChucykgdGFyZ2V0W25zXVtrZXldID0gY2JcbiAgICBlbHNlIHRhcmdldFtrZXldID0gY2JcbiAgfSlcbn1cblxuLy8gaGFuZGxlIGVycm9ycyBhbGwgdGhlIHdheSBhdCB0aGUgdG9wIG9mIHRoZSB0cmFjZVxuLy8gZXJyPyAtPiBudWxsXG5mdW5jdGlvbiBkZWZhdWx0T25FcnJvciAoZXJyKSB7XG4gIHRocm93IGVyclxufVxuXG5mdW5jdGlvbiB3cmFwT25FcnJvciAob25FcnJvcikge1xuICByZXR1cm4gZnVuY3Rpb24gb25FcnJvcldyYXAgKGVyciwgc3RhdGUsIGNyZWF0ZVNlbmQpIHtcbiAgICBpZiAoZXJyKSBvbkVycm9yKGVyciwgc3RhdGUsIGNyZWF0ZVNlbmQpXG4gIH1cbn1cblxuLy8gdGFrZSBhIGFwcGx5IGFuIGFycmF5IG9mIHRyYW5zZm9ybXMgb250byBhIHZhbHVlLiBUaGUgbmV3IHZhbHVlXG4vLyBtdXN0IGJlIHJldHVybmVkIHN5bmNocm9ub3VzbHkgZnJvbSB0aGUgdHJhbnNmb3JtXG4vLyAoYW55LCBbZm5dKSAtPiBhbnlcbmZ1bmN0aW9uIHdyYXBIb29rICh2YWx1ZSwgdHJhbnNmb3Jtcykge1xuICB0cmFuc2Zvcm1zLmZvckVhY2goZnVuY3Rpb24gKHRyYW5zZm9ybSkge1xuICAgIHZhbHVlID0gdHJhbnNmb3JtKHZhbHVlKVxuICB9KVxuICByZXR1cm4gdmFsdWVcbn1cbiIsInZhciBkb2N1bWVudCA9IHJlcXVpcmUoJ2dsb2JhbC9kb2N1bWVudCcpXHJcbnZhciBoeXBlcnggPSByZXF1aXJlKCdoeXBlcngnKVxyXG52YXIgb25sb2FkID0gcmVxdWlyZSgnb24tbG9hZCcpXHJcblxyXG52YXIgU1ZHTlMgPSAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnXHJcbnZhciBYTElOS05TID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnXHJcblxyXG52YXIgQk9PTF9QUk9QUyA9IHtcclxuICBhdXRvZm9jdXM6IDEsXHJcbiAgY2hlY2tlZDogMSxcclxuICBkZWZhdWx0Y2hlY2tlZDogMSxcclxuICBkaXNhYmxlZDogMSxcclxuICBmb3Jtbm92YWxpZGF0ZTogMSxcclxuICBpbmRldGVybWluYXRlOiAxLFxyXG4gIHJlYWRvbmx5OiAxLFxyXG4gIHJlcXVpcmVkOiAxLFxyXG4gIHNlbGVjdGVkOiAxLFxyXG4gIHdpbGx2YWxpZGF0ZTogMVxyXG59XHJcbnZhciBTVkdfVEFHUyA9IFtcclxuICAnc3ZnJyxcclxuICAnYWx0R2x5cGgnLCAnYWx0R2x5cGhEZWYnLCAnYWx0R2x5cGhJdGVtJywgJ2FuaW1hdGUnLCAnYW5pbWF0ZUNvbG9yJyxcclxuICAnYW5pbWF0ZU1vdGlvbicsICdhbmltYXRlVHJhbnNmb3JtJywgJ2NpcmNsZScsICdjbGlwUGF0aCcsICdjb2xvci1wcm9maWxlJyxcclxuICAnY3Vyc29yJywgJ2RlZnMnLCAnZGVzYycsICdlbGxpcHNlJywgJ2ZlQmxlbmQnLCAnZmVDb2xvck1hdHJpeCcsXHJcbiAgJ2ZlQ29tcG9uZW50VHJhbnNmZXInLCAnZmVDb21wb3NpdGUnLCAnZmVDb252b2x2ZU1hdHJpeCcsICdmZURpZmZ1c2VMaWdodGluZycsXHJcbiAgJ2ZlRGlzcGxhY2VtZW50TWFwJywgJ2ZlRGlzdGFudExpZ2h0JywgJ2ZlRmxvb2QnLCAnZmVGdW5jQScsICdmZUZ1bmNCJyxcclxuICAnZmVGdW5jRycsICdmZUZ1bmNSJywgJ2ZlR2F1c3NpYW5CbHVyJywgJ2ZlSW1hZ2UnLCAnZmVNZXJnZScsICdmZU1lcmdlTm9kZScsXHJcbiAgJ2ZlTW9ycGhvbG9neScsICdmZU9mZnNldCcsICdmZVBvaW50TGlnaHQnLCAnZmVTcGVjdWxhckxpZ2h0aW5nJyxcclxuICAnZmVTcG90TGlnaHQnLCAnZmVUaWxlJywgJ2ZlVHVyYnVsZW5jZScsICdmaWx0ZXInLCAnZm9udCcsICdmb250LWZhY2UnLFxyXG4gICdmb250LWZhY2UtZm9ybWF0JywgJ2ZvbnQtZmFjZS1uYW1lJywgJ2ZvbnQtZmFjZS1zcmMnLCAnZm9udC1mYWNlLXVyaScsXHJcbiAgJ2ZvcmVpZ25PYmplY3QnLCAnZycsICdnbHlwaCcsICdnbHlwaFJlZicsICdoa2VybicsICdpbWFnZScsICdsaW5lJyxcclxuICAnbGluZWFyR3JhZGllbnQnLCAnbWFya2VyJywgJ21hc2snLCAnbWV0YWRhdGEnLCAnbWlzc2luZy1nbHlwaCcsICdtcGF0aCcsXHJcbiAgJ3BhdGgnLCAncGF0dGVybicsICdwb2x5Z29uJywgJ3BvbHlsaW5lJywgJ3JhZGlhbEdyYWRpZW50JywgJ3JlY3QnLFxyXG4gICdzZXQnLCAnc3RvcCcsICdzd2l0Y2gnLCAnc3ltYm9sJywgJ3RleHQnLCAndGV4dFBhdGgnLCAndGl0bGUnLCAndHJlZicsXHJcbiAgJ3RzcGFuJywgJ3VzZScsICd2aWV3JywgJ3ZrZXJuJ1xyXG5dXHJcblxyXG5mdW5jdGlvbiBiZWxDcmVhdGVFbGVtZW50ICh0YWcsIHByb3BzLCBjaGlsZHJlbikge1xyXG4gIHZhciBlbFxyXG5cclxuICAvLyBJZiBhbiBzdmcgdGFnLCBpdCBuZWVkcyBhIG5hbWVzcGFjZVxyXG4gIGlmIChTVkdfVEFHUy5pbmRleE9mKHRhZykgIT09IC0xKSB7XHJcbiAgICBwcm9wcy5uYW1lc3BhY2UgPSBTVkdOU1xyXG4gIH1cclxuXHJcbiAgLy8gSWYgd2UgYXJlIHVzaW5nIGEgbmFtZXNwYWNlXHJcbiAgdmFyIG5zID0gZmFsc2VcclxuICBpZiAocHJvcHMubmFtZXNwYWNlKSB7XHJcbiAgICBucyA9IHByb3BzLm5hbWVzcGFjZVxyXG4gICAgZGVsZXRlIHByb3BzLm5hbWVzcGFjZVxyXG4gIH1cclxuXHJcbiAgLy8gQ3JlYXRlIHRoZSBlbGVtZW50XHJcbiAgaWYgKG5zKSB7XHJcbiAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhucywgdGFnKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKVxyXG4gIH1cclxuXHJcbiAgLy8gSWYgYWRkaW5nIG9ubG9hZCBldmVudHNcclxuICBpZiAocHJvcHMub25sb2FkIHx8IHByb3BzLm9udW5sb2FkKSB7XHJcbiAgICB2YXIgbG9hZCA9IHByb3BzLm9ubG9hZCB8fCBmdW5jdGlvbiAoKSB7fVxyXG4gICAgdmFyIHVubG9hZCA9IHByb3BzLm9udW5sb2FkIHx8IGZ1bmN0aW9uICgpIHt9XHJcbiAgICBvbmxvYWQoZWwsIGZ1bmN0aW9uIGJlbE9ubG9hZCAoKSB7XHJcbiAgICAgIGxvYWQoZWwpXHJcbiAgICB9LCBmdW5jdGlvbiBiZWxPbnVubG9hZCAoKSB7XHJcbiAgICAgIHVubG9hZChlbClcclxuICAgIH0sXHJcbiAgICAvLyBXZSBoYXZlIHRvIHVzZSBub24tc3RhbmRhcmQgYGNhbGxlcmAgdG8gZmluZCB3aG8gaW52b2tlcyBgYmVsQ3JlYXRlRWxlbWVudGBcclxuICAgIGJlbENyZWF0ZUVsZW1lbnQuY2FsbGVyLmNhbGxlci5jYWxsZXIpXHJcbiAgICBkZWxldGUgcHJvcHMub25sb2FkXHJcbiAgICBkZWxldGUgcHJvcHMub251bmxvYWRcclxuICB9XHJcblxyXG4gIC8vIENyZWF0ZSB0aGUgcHJvcGVydGllc1xyXG4gIGZvciAodmFyIHAgaW4gcHJvcHMpIHtcclxuICAgIGlmIChwcm9wcy5oYXNPd25Qcm9wZXJ0eShwKSkge1xyXG4gICAgICB2YXIga2V5ID0gcC50b0xvd2VyQ2FzZSgpXHJcbiAgICAgIHZhciB2YWwgPSBwcm9wc1twXVxyXG4gICAgICAvLyBOb3JtYWxpemUgY2xhc3NOYW1lXHJcbiAgICAgIGlmIChrZXkgPT09ICdjbGFzc25hbWUnKSB7XHJcbiAgICAgICAga2V5ID0gJ2NsYXNzJ1xyXG4gICAgICAgIHAgPSAnY2xhc3MnXHJcbiAgICAgIH1cclxuICAgICAgLy8gVGhlIGZvciBhdHRyaWJ1dGUgZ2V0cyB0cmFuc2Zvcm1lZCB0byBodG1sRm9yLCBidXQgd2UganVzdCBzZXQgYXMgZm9yXHJcbiAgICAgIGlmIChwID09PSAnaHRtbEZvcicpIHtcclxuICAgICAgICBwID0gJ2ZvcidcclxuICAgICAgfVxyXG4gICAgICAvLyBJZiBhIHByb3BlcnR5IGlzIGJvb2xlYW4sIHNldCBpdHNlbGYgdG8gdGhlIGtleVxyXG4gICAgICBpZiAoQk9PTF9QUk9QU1trZXldKSB7XHJcbiAgICAgICAgaWYgKHZhbCA9PT0gJ3RydWUnKSB2YWwgPSBrZXlcclxuICAgICAgICBlbHNlIGlmICh2YWwgPT09ICdmYWxzZScpIGNvbnRpbnVlXHJcbiAgICAgIH1cclxuICAgICAgLy8gSWYgYSBwcm9wZXJ0eSBwcmVmZXJzIGJlaW5nIHNldCBkaXJlY3RseSB2cyBzZXRBdHRyaWJ1dGVcclxuICAgICAgaWYgKGtleS5zbGljZSgwLCAyKSA9PT0gJ29uJykge1xyXG4gICAgICAgIGVsW3BdID0gdmFsXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKG5zKSB7XHJcbiAgICAgICAgICBpZiAocCA9PT0gJ3hsaW5rOmhyZWYnKSB7XHJcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZU5TKFhMSU5LTlMsIHAsIHZhbClcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZU5TKG51bGwsIHAsIHZhbClcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgZWwuc2V0QXR0cmlidXRlKHAsIHZhbClcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIGFwcGVuZENoaWxkIChjaGlsZHMpIHtcclxuICAgIGlmICghQXJyYXkuaXNBcnJheShjaGlsZHMpKSByZXR1cm5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHZhciBub2RlID0gY2hpbGRzW2ldXHJcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG5vZGUpKSB7XHJcbiAgICAgICAgYXBwZW5kQ2hpbGQobm9kZSlcclxuICAgICAgICBjb250aW51ZVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodHlwZW9mIG5vZGUgPT09ICdudW1iZXInIHx8XHJcbiAgICAgICAgdHlwZW9mIG5vZGUgPT09ICdib29sZWFuJyB8fFxyXG4gICAgICAgIG5vZGUgaW5zdGFuY2VvZiBEYXRlIHx8XHJcbiAgICAgICAgbm9kZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xyXG4gICAgICAgIG5vZGUgPSBub2RlLnRvU3RyaW5nKClcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHR5cGVvZiBub2RlID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgIGlmIChlbC5sYXN0Q2hpbGQgJiYgZWwubGFzdENoaWxkLm5vZGVOYW1lID09PSAnI3RleHQnKSB7XHJcbiAgICAgICAgICBlbC5sYXN0Q2hpbGQubm9kZVZhbHVlICs9IG5vZGVcclxuICAgICAgICAgIGNvbnRpbnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIG5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShub2RlKVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAobm9kZSAmJiBub2RlLm5vZGVUeXBlKSB7XHJcbiAgICAgICAgZWwuYXBwZW5kQ2hpbGQobm9kZSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBhcHBlbmRDaGlsZChjaGlsZHJlbilcclxuXHJcbiAgcmV0dXJuIGVsXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gaHlwZXJ4KGJlbENyZWF0ZUVsZW1lbnQpXHJcbm1vZHVsZS5leHBvcnRzLmNyZWF0ZUVsZW1lbnQgPSBiZWxDcmVhdGVFbGVtZW50XHJcbiIsIlxuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW1WdGNIUjVMbXB6SWwwc0ltNWhiV1Z6SWpwYlhTd2liV0Z3Y0dsdVozTWlPaUlpTENKbWFXeGxJam9pYjNWMExtcHpMbTFoY0NKOSIsImNvbnN0IGRlZXBEaWZmID0gcmVxdWlyZSgnZGVlcC1kaWZmJylcbmNvbnN0IHBhZFJpZ2h0ID0gcmVxdWlyZSgncGFkLXJpZ2h0JylcbmNvbnN0IHBhZExlZnQgPSByZXF1aXJlKCdwYWQtbGVmdCcpXG5jb25zdCBicm93c2VyID0gcmVxdWlyZSgnZGV0ZWN0LWJyb3dzZXInKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNob29Mb2dcblxuLy8gY29sb3JzIGZyb20gaHR0cDovL2NscnMuY2MvXG5jb25zdCBjb2xvcnMgPSB7XG4gIGdyZWVuOiAnIzJFQ0M0MCcsXG4gIHJlZDogJyNGRjQxMzYnLFxuICBibHVlOiAnIzdGREJGRicsXG4gIGxpZ2h0R3JheTogJyNEREREREQnLFxuICBncmF5OiAnI0FBQUFBQScsXG4gIHllbGxvdzogJyNGRkRDMDAnLFxuICBkZWZhdWx0OiAnIzI5MzAzNydcbn1cblxuY29uc3QgcGFkZGluZ3MgPSB7XG4gIHR5cGU6IDcsXG4gIGFjdGlvblR5cGU6IDdcbn1cblxuLy8gRGV2ZWxvcG1lbnQgbG9nZ2VyIGZvciBjaG9vXG4vLyBudWxsIC0+IG9ialxuZnVuY3Rpb24gY2hvb0xvZyAoKSB7XG4gIGNvbnN0IHN0YXJ0VGltZSA9IERhdGUubm93KClcblxuICByZXR1cm4ge1xuICAgIG9uQWN0aW9uOiBvbkFjdGlvbixcbiAgICBvbkVycm9yOiBvbkVycm9yLFxuICAgIG9uU3RhdGVDaGFuZ2U6IG9uU3RhdGVDaGFuZ2VcbiAgfVxuXG4gIC8vIGhhbmRsZSBvbkFjdGlvbigpIGNhbGxzXG4gIC8vIChvYmosIG9iaiwgc3RyLCBzdHIsIGZuKSAtPiBudWxsXG4gIGZ1bmN0aW9uIG9uQWN0aW9uIChkYXRhLCBzdGF0ZSwgbmFtZSwgdHJhY2UsIGNyZWF0ZVNlbmQpIHtcbiAgICBjb25zdCBzcGxpdCA9IHRyYWNlLnNwbGl0KCc6JylcbiAgICBjb25zdCBhY3Rpb25UeXBlID0gc3BsaXRbMF0udHJpbSgpXG4gICAgY29uc3QgY2FsbGVyID0gc3BsaXRbMV0udHJpbSgpXG5cbiAgICBjb25zdCBsaW5lID0gW11cbiAgICBjb2xvcmlmeSgnbGlnaHRHcmF5JywgcmVuZGVyVGltZShzdGFydFRpbWUpICsgJyAnLCBsaW5lKVxuICAgIGNvbG9yaWZ5KCdncmF5JywgcmVuZGVyVHlwZSgnYWN0aW9uJykgKyAnICcsIGxpbmUpXG4gICAgY29sb3JpZnkoJ2dyYXknLCByZW5kZXJBY3Rpb25UeXBlKGFjdGlvblR5cGUpICsgJyAnLCBsaW5lKVxuXG4gICAgY29sb3JpZnkoJ2RlZmF1bHQnLCBcIidcIiArIGNhbGxlciArIFwiJ1wiLCBsaW5lKVxuICAgIGNvbG9yaWZ5KCdkZWZhdWx0JywgJy0+JywgbGluZSlcbiAgICBjb2xvcmlmeSgnZGVmYXVsdCcsIFwiJ1wiICsgbmFtZSArIFwiJ1wiLCBsaW5lKVxuXG4gICAgaWYgKGdyb3VwQ29sbGFwc2VTdXBwb3J0ZWQoKSkge1xuICAgICAgbG9nR3JvdXAobGluZSlcbiAgICAgIGxvZ0lubmVyKG5hbWUsIGRhdGEpXG4gICAgICBjb25zb2xlLmdyb3VwRW5kKClcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nKGxpbmUpXG4gICAgICBsb2dJbm5lcihuYW1lLCBkYXRhKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvZ0lubmVyIChuYW1lLCBhY3Rpb24pIHtcbiAgICAgIGNvbnNvbGUubG9nKCdhY3Rpb24gbmFtZTonLCBuYW1lKVxuICAgICAgY29uc29sZS5sb2coJ2RhdGE6JywgZGF0YSlcbiAgICB9XG4gIH1cblxuICAvLyBoYW5kbGUgb25FcnJvcigpIGNhbGxzXG4gIC8vIChzdHIsIG9iaiwgZm4pIC0+IG51bGxcbiAgZnVuY3Rpb24gb25FcnJvciAoZXJyLCBzdGF0ZSwgY3JlYXRlU2VuZCkge1xuICAgIGNvbnN0IGxpbmUgPSBbXVxuICAgIGNvbG9yaWZ5KCdsaWdodEdyYXknLCByZW5kZXJUaW1lKHN0YXJ0VGltZSkgKyAnICcsIGxpbmUpXG4gICAgY29sb3JpZnkoJ3JlZCcsIHJlbmRlclR5cGUoJ2Vycm9yJykgKyAnICcsIGxpbmUpXG4gICAgY29sb3JpZnkoJ2RlZmF1bHQnLCBlcnIubWVzc2FnZSArICcgJywgbGluZSlcblxuICAgIGlmIChncm91cENvbGxhcHNlU3VwcG9ydGVkKCkpIHtcbiAgICAgIGxvZ0dyb3VwKGxpbmUpXG4gICAgICBsb2dJbm5lcihlcnIpXG4gICAgICBjb25zb2xlLmdyb3VwRW5kKClcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nKGxpbmUpXG4gICAgICBsb2dJbm5lcihlcnIpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9nSW5uZXIgKGVycikge1xuICAgICAgY29uc29sZS5lcnJvcihlcnIpXG4gICAgfVxuICB9XG5cbiAgLy8gaGFuZGxlIG9uU3RhdGVDaGFuZ2UoKSBjYWxsc1xuICAvLyAob2JqLCBvYmosIG9iaiwgZm4pIC0+IG51bGxcbiAgZnVuY3Rpb24gb25TdGF0ZUNoYW5nZSAoZGF0YSwgc3RhdGUsIHByZXYsIGNyZWF0ZVNlbmQpIHtcbiAgICBjb25zdCBkaWZmID0gZGVlcERpZmYocHJldiwgc3RhdGUpIHx8IFtdXG4gICAgLy8gd2FybiBpZiB0aGVyZSBpcyBubyBkaWZmXG4gICAgY29uc3QgaGFzV2FybiA9IGRpZmYubGVuZ3RoID09PSAwXG4gICAgY29uc3QgaW5saW5lVGV4dCA9IChmdW5jdGlvbiAoZGlmZikge1xuICAgICAgaWYgKGhhc1dhcm4pIHtcbiAgICAgICAgcmV0dXJuICdubyBkaWZmJ1xuICAgICAgfSBlbHNlIGlmIChkaWZmLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gJ2RpZmYnXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gJ2RpZmZzJ1xuICAgICAgfVxuICAgIH0pKGRpZmYpXG5cbiAgICBjb25zdCBsaW5lID0gW11cbiAgICBjb2xvcmlmeSgnbGlnaHRHcmF5JywgcmVuZGVyVGltZShzdGFydFRpbWUpICsgJyAnLCBsaW5lKVxuICAgIGNvbG9yaWZ5KGhhc1dhcm4gPyAneWVsbG93JyA6ICdncmF5JywgcmVuZGVyVHlwZSgnc3RhdGUnKSArICcgJywgbGluZSlcbiAgICBjb2xvcmlmeSgnZGVmYXVsdCcsIChoYXNXYXJuID8gJycgOiBkaWZmLmxlbmd0aCArICcgJykgKyBpbmxpbmVUZXh0LCBsaW5lKVxuXG4gICAgaWYgKGdyb3VwQ29sbGFwc2VTdXBwb3J0ZWQoKSkge1xuICAgICAgbG9nR3JvdXAobGluZSlcbiAgICAgIGxvZ0lubmVyKHByZXYsIHN0YXRlKVxuICAgICAgY29uc29sZS5ncm91cEVuZCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZyhsaW5lKVxuICAgICAgbG9nSW5uZXIocHJldiwgc3RhdGUpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9nSW5uZXIgKHByZXYsIHN0YXRlKSB7XG4gICAgICBjb25zb2xlLmxvZygncHJldiAnLCBwcmV2KVxuICAgICAgY29uc29sZS5sb2coJ3N0YXRlJywgc3RhdGUpXG4gICAgICBpZiAoaGFzV2Fybikge1xuICAgICAgICBjb25zb2xlLndhcm4oJ2RpZmYgJywgJ1RoZXJlIGlzIG5vIGRpZmZlcmVuY2UgYmV0d2VlbiBzdGF0ZXMnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2RpZmYgJywgZGlmZilcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gY3JlYXRlIGEgY29sbGFwc2VkR3JvdXAgbG9nIGZyb20gYW4gYXJyYXlcbi8vIHN0ciAtPiBbc3RyLCBzdHJdXG5mdW5jdGlvbiBsb2dHcm91cCAobGluZSkge1xuICBjb25zb2xlLmdyb3VwQ29sbGFwc2VkLmFwcGx5KGNvbnNvbGUsIGxpbmUpXG59XG5cbi8vIGNyZWF0ZSBhIGNvbnNvbGUgbG9nIGZyb20gYW4gYXJyYXlcbi8vIHN0ciAtPiBbc3RyLCBzdHJdXG5mdW5jdGlvbiBsb2cgKGxpbmUpIHtcbiAgY29uc29sZS5sb2cuYXBwbHkoY29uc29sZSwgbGluZSlcbn1cblxuLy8gaW5kZW50IG1lc3NhZ2UgdHlwZXNcbi8vIHN0ciAtPiBzdHJcbmZ1bmN0aW9uIHJlbmRlclR5cGUgKG1zZykge1xuICBjb25zdCBsZWZ0UGFkID0gcGFkZGluZ3MudHlwZVxuICBjb25zdCByaWdodFBhZCA9IHBhZGRpbmdzLmFjdGlvblR5cGUgKyBsZWZ0UGFkICsgMlxuICByZXR1cm4gKG1zZyA9PT0gJ3N0YXRlJyB8fCBtc2cgPT09ICdlcnJvcicpXG4gICAgPyBwYWRSaWdodChwYWRMZWZ0KG1zZywgbGVmdFBhZCwgJyAnKSwgcmlnaHRQYWQsICcgJylcbiAgICA6IHBhZExlZnQobXNnLCBsZWZ0UGFkLCAnICcpXG59XG5cbi8vIGluZGVudCBhY3Rpb24gdHlwZXNcbi8vIHN0ciAtPiBzdHJcbmZ1bmN0aW9uIHJlbmRlckFjdGlvblR5cGUgKG1zZykge1xuICBjb25zdCBwYWRkaW5nID0gcGFkZGluZ3MuYWN0aW9uVHlwZVxuICBpZiAobXNnID09PSAnc3Vic2NyaXB0aW9uJykgbXNnID0gJ3N1YnMnXG4gIHJldHVybiBwYWRSaWdodChtc2csIHBhZGRpbmcsICcgJylcbn1cblxuLy8gdG9IdG1sICsgY2hhbGtcbi8vIChzdHIsIHN0ciwgW3N0ciwgLi4uc3RyXSkgLT4gW3N0ciwgc3RyXVxuZnVuY3Rpb24gY29sb3JpZnkgKGNvbG9yLCBsaW5lLCBwcmV2KSB7XG4gIHZhciBuZXdMaW5lID0gJyVjJyArIGxpbmVcbiAgdmFyIG5ld1N0eWxlID0gJ2NvbG9yOiAnICsgY29sb3JzW2NvbG9yXSArICc7J1xuXG4gIGlmICghcHJldikge1xuICAgIHByZXYgPSBbIG5ld0xpbmUsIG5ld1N0eWxlIF1cbiAgICByZXR1cm4gcHJldlxuICB9XG5cbiAgaWYgKCFwcmV2WzBdKSBwcmV2WzBdID0gJydcbiAgcHJldlswXSArPSAnICcgKyBuZXdMaW5lXG5cbiAgaWYgKCFwcmV2WzFdKSBwcmV2WzFdID0gJydcbiAgaWYgKGJyb3dzZXIubmFtZSA9PT0gJ2ZpcmVmb3gnKSB7XG4gICAgcHJldlsxXSArPSAnICcgKyBuZXdTdHlsZVxuICB9IGVsc2Uge1xuICAgIHByZXYucHVzaChuZXdTdHlsZSlcbiAgfVxuICByZXR1cm4gcHJldlxufVxuXG4vLyByZW5kZXIgdGhlIHRpbWVcbi8vIG51bSAtPiBudWxsXG5mdW5jdGlvbiByZW5kZXJUaW1lIChzdGFydFRpbWUpIHtcbiAgdmFyIG9mZnNldCA9IFN0cmluZyhNYXRoLnJvdW5kKChEYXRlLm5vdygpIC0gc3RhcnRUaW1lKSAvIDEwMDApICUgMTAwMDApXG4gIHZhciBtc2cgPSAnWycgKyBwYWRMZWZ0KG9mZnNldCwgNCwgJzAnKSArICddJ1xuICByZXR1cm4gbXNnXG59XG5cbmZ1bmN0aW9uIGdyb3VwQ29sbGFwc2VTdXBwb3J0ZWQgKCkge1xuICByZXR1cm4gY29uc29sZS5ncm91cENvbGxhcHNlZCAmJiBicm93c2VyLm5hbWUgIT09ICdmaXJlZm94J1xufVxuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJ3lvLXlvJylcbiIsImNvbnN0IGhpc3RvcnkgPSByZXF1aXJlKCdzaGVldC1yb3V0ZXIvaGlzdG9yeScpXG5jb25zdCBzaGVldFJvdXRlciA9IHJlcXVpcmUoJ3NoZWV0LXJvdXRlcicpXG5jb25zdCBkb2N1bWVudCA9IHJlcXVpcmUoJ2dsb2JhbC9kb2N1bWVudCcpXG5jb25zdCBvblJlYWR5ID0gcmVxdWlyZSgnZG9jdW1lbnQtcmVhZHknKVxuY29uc3QgaHJlZiA9IHJlcXVpcmUoJ3NoZWV0LXJvdXRlci9ocmVmJylcbmNvbnN0IGhhc2ggPSByZXF1aXJlKCdzaGVldC1yb3V0ZXIvaGFzaCcpXG5jb25zdCBoYXNoTWF0Y2ggPSByZXF1aXJlKCdoYXNoLW1hdGNoJylcbmNvbnN0IGJhcnJhY2tzID0gcmVxdWlyZSgnYmFycmFja3MnKVxuY29uc3QgbmFub3JhZiA9IHJlcXVpcmUoJ25hbm9yYWYnKVxuY29uc3QgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0JylcbmNvbnN0IHh0ZW5kID0gcmVxdWlyZSgneHRlbmQnKVxuY29uc3QgeW8gPSByZXF1aXJlKCd5by15bycpXG5cbm1vZHVsZS5leHBvcnRzID0gY2hvb1xuXG4vLyBmcmFtZXdvcmsgZm9yIGNyZWF0aW5nIHN0dXJkeSB3ZWIgYXBwbGljYXRpb25zXG4vLyBudWxsIC0+IGZuXG5mdW5jdGlvbiBjaG9vIChvcHRzKSB7XG4gIG9wdHMgPSBvcHRzIHx8IHt9XG5cbiAgY29uc3QgX3N0b3JlID0gc3RhcnQuX3N0b3JlID0gYmFycmFja3MoKVxuICB2YXIgX3JvdXRlciA9IHN0YXJ0Ll9yb3V0ZXIgPSBudWxsXG4gIHZhciBfZGVmYXVsdFJvdXRlID0gbnVsbFxuICB2YXIgX3Jvb3ROb2RlID0gbnVsbFxuICB2YXIgX3JvdXRlcyA9IG51bGxcbiAgdmFyIF9mcmFtZSA9IG51bGxcblxuICBfc3RvcmUudXNlKHsgb25TdGF0ZUNoYW5nZTogcmVuZGVyIH0pXG4gIF9zdG9yZS51c2Uob3B0cylcblxuICBzdGFydC50b1N0cmluZyA9IHRvU3RyaW5nXG4gIHN0YXJ0LnJvdXRlciA9IHJvdXRlclxuICBzdGFydC5tb2RlbCA9IG1vZGVsXG4gIHN0YXJ0LnN0YXJ0ID0gc3RhcnRcbiAgc3RhcnQudXNlID0gdXNlXG5cbiAgcmV0dXJuIHN0YXJ0XG5cbiAgLy8gcmVuZGVyIHRoZSBhcHBsaWNhdGlvbiB0byBhIHN0cmluZ1xuICAvLyAoc3RyLCBvYmopIC0+IHN0clxuICBmdW5jdGlvbiB0b1N0cmluZyAocm91dGUsIHNlcnZlclN0YXRlKSB7XG4gICAgc2VydmVyU3RhdGUgPSBzZXJ2ZXJTdGF0ZSB8fCB7fVxuICAgIGFzc2VydC5lcXVhbCh0eXBlb2Ygcm91dGUsICdzdHJpbmcnLCAnY2hvby5hcHAudG9TdHJpbmc6IHJvdXRlIG11c3QgYmUgYSBzdHJpbmcnKVxuICAgIGFzc2VydC5lcXVhbCh0eXBlb2Ygc2VydmVyU3RhdGUsICdvYmplY3QnLCAnY2hvby5hcHAudG9TdHJpbmc6IHNlcnZlclN0YXRlIG11c3QgYmUgYW4gb2JqZWN0JylcbiAgICBfc3RvcmUuc3RhcnQoeyBzdWJzY3JpcHRpb25zOiBmYWxzZSwgcmVkdWNlcnM6IGZhbHNlLCBlZmZlY3RzOiBmYWxzZSB9KVxuXG4gICAgY29uc3Qgc3RhdGUgPSBfc3RvcmUuc3RhdGUoeyBzdGF0ZTogc2VydmVyU3RhdGUgfSlcbiAgICBjb25zdCByb3V0ZXIgPSBjcmVhdGVSb3V0ZXIoX2RlZmF1bHRSb3V0ZSwgX3JvdXRlcywgY3JlYXRlU2VuZClcbiAgICBjb25zdCB0cmVlID0gcm91dGVyKHJvdXRlLCBzdGF0ZSlcbiAgICByZXR1cm4gdHJlZS5vdXRlckhUTUwgfHwgdHJlZS50b1N0cmluZygpXG5cbiAgICBmdW5jdGlvbiBjcmVhdGVTZW5kICgpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBzZW5kICgpIHtcbiAgICAgICAgYXNzZXJ0Lm9rKGZhbHNlLCAnY2hvbzogc2VuZCgpIGNhbm5vdCBiZSBjYWxsZWQgZnJvbSBOb2RlJylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBzdGFydCB0aGUgYXBwbGljYXRpb25cbiAgLy8gKHN0cj8sIG9iaj8pIC0+IERPTU5vZGVcbiAgZnVuY3Rpb24gc3RhcnQgKHNlbGVjdG9yLCBzdGFydE9wdHMpIHtcbiAgICBpZiAoIXN0YXJ0T3B0cyAmJiB0eXBlb2Ygc2VsZWN0b3IgIT09ICdzdHJpbmcnKSB7XG4gICAgICBzdGFydE9wdHMgPSBzZWxlY3RvclxuICAgICAgc2VsZWN0b3IgPSBudWxsXG4gICAgfVxuICAgIHN0YXJ0T3B0cyA9IHN0YXJ0T3B0cyB8fCB7fVxuXG4gICAgX3N0b3JlLm1vZGVsKGFwcEluaXQoc3RhcnRPcHRzKSlcbiAgICBjb25zdCBjcmVhdGVTZW5kID0gX3N0b3JlLnN0YXJ0KHN0YXJ0T3B0cylcbiAgICBfcm91dGVyID0gc3RhcnQuX3JvdXRlciA9IGNyZWF0ZVJvdXRlcihfZGVmYXVsdFJvdXRlLCBfcm91dGVzLCBjcmVhdGVTZW5kKVxuICAgIGNvbnN0IHN0YXRlID0gX3N0b3JlLnN0YXRlKHtzdGF0ZToge319KVxuXG4gICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgY29uc3QgdHJlZSA9IF9yb3V0ZXIoc3RhdGUubG9jYXRpb24ucGF0aG5hbWUsIHN0YXRlKVxuICAgICAgX3Jvb3ROb2RlID0gdHJlZVxuICAgICAgcmV0dXJuIHRyZWVcbiAgICB9IGVsc2Uge1xuICAgICAgb25SZWFkeShmdW5jdGlvbiBvblJlYWR5ICgpIHtcbiAgICAgICAgY29uc3Qgb2xkVHJlZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG4gICAgICAgIGFzc2VydC5vayhvbGRUcmVlLCAnY291bGQgbm90IHF1ZXJ5IHNlbGVjdG9yOiAnICsgc2VsZWN0b3IpXG4gICAgICAgIGNvbnN0IG5ld1RyZWUgPSBfcm91dGVyKHN0YXRlLmxvY2F0aW9uLnBhdGhuYW1lLCBzdGF0ZSlcbiAgICAgICAgX3Jvb3ROb2RlID0geW8udXBkYXRlKG9sZFRyZWUsIG5ld1RyZWUpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8vIHVwZGF0ZSB0aGUgRE9NIGFmdGVyIGV2ZXJ5IHN0YXRlIG11dGF0aW9uXG4gIC8vIChvYmosIG9iaiwgb2JqLCBzdHIsIGZuKSAtPiBudWxsXG4gIGZ1bmN0aW9uIHJlbmRlciAoZGF0YSwgc3RhdGUsIHByZXYsIG5hbWUsIGNyZWF0ZVNlbmQpIHtcbiAgICBpZiAoIV9mcmFtZSkge1xuICAgICAgX2ZyYW1lID0gbmFub3JhZihmdW5jdGlvbiAoc3RhdGUsIHByZXYpIHtcbiAgICAgICAgY29uc3QgbmV3VHJlZSA9IF9yb3V0ZXIoc3RhdGUubG9jYXRpb24ucGF0aG5hbWUsIHN0YXRlLCBwcmV2KVxuICAgICAgICBfcm9vdE5vZGUgPSB5by51cGRhdGUoX3Jvb3ROb2RlLCBuZXdUcmVlKVxuICAgICAgfSlcbiAgICB9XG4gICAgX2ZyYW1lKHN0YXRlLCBwcmV2KVxuICB9XG5cbiAgLy8gcmVnaXN0ZXIgYWxsIHJvdXRlcyBvbiB0aGUgcm91dGVyXG4gIC8vIChzdHI/LCBbZm58W2ZuXV0pIC0+IG9ialxuICBmdW5jdGlvbiByb3V0ZXIgKGRlZmF1bHRSb3V0ZSwgcm91dGVzKSB7XG4gICAgX2RlZmF1bHRSb3V0ZSA9IGRlZmF1bHRSb3V0ZVxuICAgIF9yb3V0ZXMgPSByb3V0ZXNcbiAgfVxuXG4gIC8vIGNyZWF0ZSBhIG5ldyBtb2RlbFxuICAvLyAoc3RyPywgb2JqKSAtPiBudWxsXG4gIGZ1bmN0aW9uIG1vZGVsIChtb2RlbCkge1xuICAgIF9zdG9yZS5tb2RlbChtb2RlbClcbiAgfVxuXG4gIC8vIHJlZ2lzdGVyIGEgcGx1Z2luXG4gIC8vIChvYmopIC0+IG51bGxcbiAgZnVuY3Rpb24gdXNlIChob29rcykge1xuICAgIGFzc2VydC5lcXVhbCh0eXBlb2YgaG9va3MsICdvYmplY3QnLCAnY2hvby51c2U6IGhvb2tzIHNob3VsZCBiZSBhbiBvYmplY3QnKVxuICAgIF9zdG9yZS51c2UoaG9va3MpXG4gIH1cblxuICAvLyBjcmVhdGUgYSBuZXcgcm91dGVyIHdpdGggYSBjdXN0b20gYGNyZWF0ZVJvdXRlKClgIGZ1bmN0aW9uXG4gIC8vIChzdHI/LCBvYmosIGZuPykgLT4gbnVsbFxuICBmdW5jdGlvbiBjcmVhdGVSb3V0ZXIgKGRlZmF1bHRSb3V0ZSwgcm91dGVzLCBjcmVhdGVTZW5kKSB7XG4gICAgdmFyIHByZXYgPSB7IHBhcmFtczoge30gfVxuICAgIHJldHVybiBzaGVldFJvdXRlcihkZWZhdWx0Um91dGUsIHJvdXRlcywgY3JlYXRlUm91dGUpXG5cbiAgICBmdW5jdGlvbiBjcmVhdGVSb3V0ZSAocm91dGVGbikge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChyb3V0ZSwgaW5saW5lLCBjaGlsZCkge1xuICAgICAgICBpZiAodHlwZW9mIGlubGluZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGlubGluZSA9IHdyYXAoaW5saW5lLCByb3V0ZSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcm91dGVGbihyb3V0ZSwgaW5saW5lLCBjaGlsZClcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gd3JhcCAoY2hpbGQsIHJvdXRlKSB7XG4gICAgICAgIGNvbnN0IHNlbmQgPSBjcmVhdGVTZW5kKCd2aWV3OiAnICsgcm91dGUsIHRydWUpXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBjaG9vV3JhcCAocGFyYW1zLCBzdGF0ZSkge1xuICAgICAgICAgIGNvbnN0IG53UHJldiA9IHByZXZcbiAgICAgICAgICBjb25zdCBud1N0YXRlID0gcHJldiA9IHh0ZW5kKHN0YXRlLCB7IHBhcmFtczogcGFyYW1zIH0pXG4gICAgICAgICAgaWYgKG9wdHMuZnJlZXplICE9PSBmYWxzZSkgT2JqZWN0LmZyZWV6ZShud1N0YXRlKVxuICAgICAgICAgIHJldHVybiBjaGlsZChud1N0YXRlLCBud1ByZXYsIHNlbmQpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gaW5pdGlhbCBhcHBsaWNhdGlvbiBzdGF0ZSBtb2RlbFxuLy8gb2JqIC0+IG9ialxuZnVuY3Rpb24gYXBwSW5pdCAob3B0cykge1xuICBjb25zdCBsb2MgPSBkb2N1bWVudC5sb2NhdGlvblxuICBjb25zdCBzdGF0ZSA9IHsgcGF0aG5hbWU6IChvcHRzLmhhc2gpID8gaGFzaE1hdGNoKGxvYy5oYXNoKSA6IGxvYy5ocmVmIH1cbiAgY29uc3QgcmVkdWNlcnMgPSB7XG4gICAgc2V0TG9jYXRpb246IGZ1bmN0aW9uIHNldExvY2F0aW9uIChkYXRhLCBzdGF0ZSkge1xuICAgICAgcmV0dXJuIHsgcGF0aG5hbWU6IGRhdGEubG9jYXRpb24ucmVwbGFjZSgvIy4qLywgJycpIH1cbiAgICB9XG4gIH1cbiAgLy8gaWYgaGFzaCByb3V0aW5nIGV4cGxpY2l0bHkgZW5hYmxlZCwgc3Vic2NyaWJlIHRvIGl0XG4gIGNvbnN0IHN1YnMgPSB7fVxuICBpZiAob3B0cy5oYXNoID09PSB0cnVlKSB7XG4gICAgcHVzaExvY2F0aW9uU3ViKGZ1bmN0aW9uIChuYXZpZ2F0ZSkge1xuICAgICAgaGFzaChmdW5jdGlvbiAoZnJhZ21lbnQpIHtcbiAgICAgICAgbmF2aWdhdGUoaGFzaE1hdGNoKGZyYWdtZW50KSlcbiAgICAgIH0pXG4gICAgfSwgJ2hhbmRsZUhhc2gnLCBzdWJzKVxuICB9IGVsc2Uge1xuICAgIGlmIChvcHRzLmhpc3RvcnkgIT09IGZhbHNlKSBwdXNoTG9jYXRpb25TdWIoaGlzdG9yeSwgJ2hhbmRsZUhpc3RvcnknLCBzdWJzKVxuICAgIGlmIChvcHRzLmhyZWYgIT09IGZhbHNlKSBwdXNoTG9jYXRpb25TdWIoaHJlZiwgJ2hhbmRsZUhyZWYnLCBzdWJzKVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lc3BhY2U6ICdsb2NhdGlvbicsXG4gICAgc3Vic2NyaXB0aW9uczogc3VicyxcbiAgICByZWR1Y2VyczogcmVkdWNlcnMsXG4gICAgc3RhdGU6IHN0YXRlXG4gIH1cblxuICAvLyBjcmVhdGUgYSBuZXcgc3Vic2NyaXB0aW9uIHRoYXQgbW9kaWZpZXNcbiAgLy8gJ2FwcDpsb2NhdGlvbicgYW5kIHB1c2ggaXQgdG8gYmUgbG9hZGVkXG4gIC8vIChmbiwgb2JqKSAtPiBudWxsXG4gIGZ1bmN0aW9uIHB1c2hMb2NhdGlvblN1YiAoY2IsIGtleSwgbW9kZWwpIHtcbiAgICBtb2RlbFtrZXldID0gZnVuY3Rpb24gKHNlbmQsIGRvbmUpIHtcbiAgICAgIGNiKGZ1bmN0aW9uIG5hdmlnYXRlIChwYXRobmFtZSkge1xuICAgICAgICBzZW5kKCdsb2NhdGlvbjpzZXRMb2NhdGlvbicsIHsgbG9jYXRpb246IHBhdGhuYW1lIH0sIGRvbmUpXG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuIiwiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNiBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5cdGZ1bmN0aW9uIGNsYXNzTmFtZXMgKCkge1xuXHRcdHZhciBjbGFzc2VzID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdGlmICghYXJnKSBjb250aW51ZTtcblxuXHRcdFx0dmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnO1xuXG5cdFx0XHRpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGFyZyk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpKTtcblx0XHRcdH0gZWxzZSBpZiAoYXJnVHlwZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG5cdH1cbn0oKSk7XG4iLCJ2YXIgbWF0Y2hlcyA9IHJlcXVpcmUoJ21hdGNoZXMtc2VsZWN0b3InKVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZWxlbWVudCwgc2VsZWN0b3IsIGNoZWNrWW9TZWxmKSB7XHJcbiAgdmFyIHBhcmVudCA9IGNoZWNrWW9TZWxmID8gZWxlbWVudCA6IGVsZW1lbnQucGFyZW50Tm9kZVxyXG5cclxuICB3aGlsZSAocGFyZW50ICYmIHBhcmVudCAhPT0gZG9jdW1lbnQpIHtcclxuICAgIGlmIChtYXRjaGVzKHBhcmVudCwgc2VsZWN0b3IpKSByZXR1cm4gcGFyZW50O1xyXG4gICAgcGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGVcclxuICB9XHJcbn1cclxuIiwiLyohXG4gKiBkZWVwLWRpZmYuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cbjsoZnVuY3Rpb24ocm9vdCwgZmFjdG9yeSkge1xuICAndXNlIHN0cmljdCc7XG4gIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgZGVmaW5lKFtdLCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gTm9kZS4gRG9lcyBub3Qgd29yayB3aXRoIHN0cmljdCBDb21tb25KUywgYnV0XG4gICAgLy8gb25seSBDb21tb25KUy1saWtlIGVudmlyb25tZW50cyB0aGF0IHN1cHBvcnQgbW9kdWxlLmV4cG9ydHMsXG4gICAgLy8gbGlrZSBOb2RlLlxuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9IGVsc2Uge1xuICAgIC8vIEJyb3dzZXIgZ2xvYmFscyAocm9vdCBpcyB3aW5kb3cpXG4gICAgcm9vdC5EZWVwRGlmZiA9IGZhY3RvcnkoKTtcbiAgfVxufSh0aGlzLCBmdW5jdGlvbih1bmRlZmluZWQpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciAkc2NvcGUsIGNvbmZsaWN0LCBjb25mbGljdFJlc29sdXRpb24gPSBbXTtcbiAgaWYgKHR5cGVvZiBnbG9iYWwgPT09ICdvYmplY3QnICYmIGdsb2JhbCkge1xuICAgICRzY29wZSA9IGdsb2JhbDtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICRzY29wZSA9IHdpbmRvdztcbiAgfSBlbHNlIHtcbiAgICAkc2NvcGUgPSB7fTtcbiAgfVxuICBjb25mbGljdCA9ICRzY29wZS5EZWVwRGlmZjtcbiAgaWYgKGNvbmZsaWN0KSB7XG4gICAgY29uZmxpY3RSZXNvbHV0aW9uLnB1c2goXG4gICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCd1bmRlZmluZWQnICE9PSB0eXBlb2YgY29uZmxpY3QgJiYgJHNjb3BlLkRlZXBEaWZmID09PSBhY2N1bXVsYXRlRGlmZikge1xuICAgICAgICAgICRzY29wZS5EZWVwRGlmZiA9IGNvbmZsaWN0O1xuICAgICAgICAgIGNvbmZsaWN0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIC8vIG5vZGVqcyBjb21wYXRpYmxlIG9uIHNlcnZlciBzaWRlIGFuZCBpbiB0aGUgYnJvd3Nlci5cbiAgZnVuY3Rpb24gaW5oZXJpdHMoY3Rvciwgc3VwZXJDdG9yKSB7XG4gICAgY3Rvci5zdXBlcl8gPSBzdXBlckN0b3I7XG4gICAgY3Rvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ3Rvci5wcm90b3R5cGUsIHtcbiAgICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICAgIHZhbHVlOiBjdG9yLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gRGlmZihraW5kLCBwYXRoKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdraW5kJywge1xuICAgICAgdmFsdWU6IGtpbmQsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgaWYgKHBhdGggJiYgcGF0aC5sZW5ndGgpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAncGF0aCcsIHtcbiAgICAgICAgdmFsdWU6IHBhdGgsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIERpZmZFZGl0KHBhdGgsIG9yaWdpbiwgdmFsdWUpIHtcbiAgICBEaWZmRWRpdC5zdXBlcl8uY2FsbCh0aGlzLCAnRScsIHBhdGgpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbGhzJywge1xuICAgICAgdmFsdWU6IG9yaWdpbixcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3JocycsIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KTtcbiAgfVxuICBpbmhlcml0cyhEaWZmRWRpdCwgRGlmZik7XG5cbiAgZnVuY3Rpb24gRGlmZk5ldyhwYXRoLCB2YWx1ZSkge1xuICAgIERpZmZOZXcuc3VwZXJfLmNhbGwodGhpcywgJ04nLCBwYXRoKTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3JocycsIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KTtcbiAgfVxuICBpbmhlcml0cyhEaWZmTmV3LCBEaWZmKTtcblxuICBmdW5jdGlvbiBEaWZmRGVsZXRlZChwYXRoLCB2YWx1ZSkge1xuICAgIERpZmZEZWxldGVkLnN1cGVyXy5jYWxsKHRoaXMsICdEJywgcGF0aCk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdsaHMnLCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH1cbiAgaW5oZXJpdHMoRGlmZkRlbGV0ZWQsIERpZmYpO1xuXG4gIGZ1bmN0aW9uIERpZmZBcnJheShwYXRoLCBpbmRleCwgaXRlbSkge1xuICAgIERpZmZBcnJheS5zdXBlcl8uY2FsbCh0aGlzLCAnQScsIHBhdGgpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnaW5kZXgnLCB7XG4gICAgICB2YWx1ZTogaW5kZXgsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdpdGVtJywge1xuICAgICAgdmFsdWU6IGl0ZW0sXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH1cbiAgaW5oZXJpdHMoRGlmZkFycmF5LCBEaWZmKTtcblxuICBmdW5jdGlvbiBhcnJheVJlbW92ZShhcnIsIGZyb20sIHRvKSB7XG4gICAgdmFyIHJlc3QgPSBhcnIuc2xpY2UoKHRvIHx8IGZyb20pICsgMSB8fCBhcnIubGVuZ3RoKTtcbiAgICBhcnIubGVuZ3RoID0gZnJvbSA8IDAgPyBhcnIubGVuZ3RoICsgZnJvbSA6IGZyb207XG4gICAgYXJyLnB1c2guYXBwbHkoYXJyLCByZXN0KTtcbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhbFR5cGVPZihzdWJqZWN0KSB7XG4gICAgdmFyIHR5cGUgPSB0eXBlb2Ygc3ViamVjdDtcbiAgICBpZiAodHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cblxuICAgIGlmIChzdWJqZWN0ID09PSBNYXRoKSB7XG4gICAgICByZXR1cm4gJ21hdGgnO1xuICAgIH0gZWxzZSBpZiAoc3ViamVjdCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuICdudWxsJztcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoc3ViamVjdCkpIHtcbiAgICAgIHJldHVybiAnYXJyYXknO1xuICAgIH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN1YmplY3QpID09PSAnW29iamVjdCBEYXRlXScpIHtcbiAgICAgIHJldHVybiAnZGF0ZSc7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygc3ViamVjdC50b1N0cmluZyAhPT0gJ3VuZGVmaW5lZCcgJiYgL15cXC8uKlxcLy8udGVzdChzdWJqZWN0LnRvU3RyaW5nKCkpKSB7XG4gICAgICByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgfVxuICAgIHJldHVybiAnb2JqZWN0JztcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlZXBEaWZmKGxocywgcmhzLCBjaGFuZ2VzLCBwcmVmaWx0ZXIsIHBhdGgsIGtleSwgc3RhY2spIHtcbiAgICBwYXRoID0gcGF0aCB8fCBbXTtcbiAgICB2YXIgY3VycmVudFBhdGggPSBwYXRoLnNsaWNlKDApO1xuICAgIGlmICh0eXBlb2Yga2V5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaWYgKHByZWZpbHRlcikge1xuICAgICAgICBpZiAodHlwZW9mKHByZWZpbHRlcikgPT09ICdmdW5jdGlvbicgJiYgcHJlZmlsdGVyKGN1cnJlbnRQYXRoLCBrZXkpKSB7IHJldHVybjsgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YocHJlZmlsdGVyKSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBpZiAocHJlZmlsdGVyLnByZWZpbHRlciAmJiBwcmVmaWx0ZXIucHJlZmlsdGVyKGN1cnJlbnRQYXRoLCBrZXkpKSB7IHJldHVybjsgfVxuICAgICAgICAgIGlmIChwcmVmaWx0ZXIubm9ybWFsaXplKSB7XG4gICAgICAgICAgICB2YXIgYWx0ID0gcHJlZmlsdGVyLm5vcm1hbGl6ZShjdXJyZW50UGF0aCwga2V5LCBsaHMsIHJocyk7XG4gICAgICAgICAgICBpZiAoYWx0KSB7XG4gICAgICAgICAgICAgIGxocyA9IGFsdFswXTtcbiAgICAgICAgICAgICAgcmhzID0gYWx0WzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY3VycmVudFBhdGgucHVzaChrZXkpO1xuICAgIH1cblxuICAgIC8vIFVzZSBzdHJpbmcgY29tcGFyaXNvbiBmb3IgcmVnZXhlc1xuICAgIGlmIChyZWFsVHlwZU9mKGxocykgPT09ICdyZWdleHAnICYmIHJlYWxUeXBlT2YocmhzKSA9PT0gJ3JlZ2V4cCcpIHtcbiAgICAgIGxocyA9IGxocy50b1N0cmluZygpO1xuICAgICAgcmhzID0gcmhzLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgdmFyIGx0eXBlID0gdHlwZW9mIGxocztcbiAgICB2YXIgcnR5cGUgPSB0eXBlb2YgcmhzO1xuICAgIGlmIChsdHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGlmIChydHlwZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY2hhbmdlcyhuZXcgRGlmZk5ldyhjdXJyZW50UGF0aCwgcmhzKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChydHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNoYW5nZXMobmV3IERpZmZEZWxldGVkKGN1cnJlbnRQYXRoLCBsaHMpKTtcbiAgICB9IGVsc2UgaWYgKHJlYWxUeXBlT2YobGhzKSAhPT0gcmVhbFR5cGVPZihyaHMpKSB7XG4gICAgICBjaGFuZ2VzKG5ldyBEaWZmRWRpdChjdXJyZW50UGF0aCwgbGhzLCByaHMpKTtcbiAgICB9IGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChsaHMpID09PSAnW29iamVjdCBEYXRlXScgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHJocykgPT09ICdbb2JqZWN0IERhdGVdJyAmJiAoKGxocyAtIHJocykgIT09IDApKSB7XG4gICAgICBjaGFuZ2VzKG5ldyBEaWZmRWRpdChjdXJyZW50UGF0aCwgbGhzLCByaHMpKTtcbiAgICB9IGVsc2UgaWYgKGx0eXBlID09PSAnb2JqZWN0JyAmJiBsaHMgIT09IG51bGwgJiYgcmhzICE9PSBudWxsKSB7XG4gICAgICBzdGFjayA9IHN0YWNrIHx8IFtdO1xuICAgICAgaWYgKHN0YWNrLmluZGV4T2YobGhzKSA8IDApIHtcbiAgICAgICAgc3RhY2sucHVzaChsaHMpO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShsaHMpKSB7XG4gICAgICAgICAgdmFyIGksIGxlbiA9IGxocy5sZW5ndGg7XG4gICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxocy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGkgPj0gcmhzLmxlbmd0aCkge1xuICAgICAgICAgICAgICBjaGFuZ2VzKG5ldyBEaWZmQXJyYXkoY3VycmVudFBhdGgsIGksIG5ldyBEaWZmRGVsZXRlZCh1bmRlZmluZWQsIGxoc1tpXSkpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRlZXBEaWZmKGxoc1tpXSwgcmhzW2ldLCBjaGFuZ2VzLCBwcmVmaWx0ZXIsIGN1cnJlbnRQYXRoLCBpLCBzdGFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHdoaWxlIChpIDwgcmhzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2hhbmdlcyhuZXcgRGlmZkFycmF5KGN1cnJlbnRQYXRoLCBpLCBuZXcgRGlmZk5ldyh1bmRlZmluZWQsIHJoc1tpKytdKSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgYWtleXMgPSBPYmplY3Qua2V5cyhsaHMpO1xuICAgICAgICAgIHZhciBwa2V5cyA9IE9iamVjdC5rZXlzKHJocyk7XG4gICAgICAgICAgYWtleXMuZm9yRWFjaChmdW5jdGlvbihrLCBpKSB7XG4gICAgICAgICAgICB2YXIgb3RoZXIgPSBwa2V5cy5pbmRleE9mKGspO1xuICAgICAgICAgICAgaWYgKG90aGVyID49IDApIHtcbiAgICAgICAgICAgICAgZGVlcERpZmYobGhzW2tdLCByaHNba10sIGNoYW5nZXMsIHByZWZpbHRlciwgY3VycmVudFBhdGgsIGssIHN0YWNrKTtcbiAgICAgICAgICAgICAgcGtleXMgPSBhcnJheVJlbW92ZShwa2V5cywgb3RoZXIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZGVlcERpZmYobGhzW2tdLCB1bmRlZmluZWQsIGNoYW5nZXMsIHByZWZpbHRlciwgY3VycmVudFBhdGgsIGssIHN0YWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBwa2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGspIHtcbiAgICAgICAgICAgIGRlZXBEaWZmKHVuZGVmaW5lZCwgcmhzW2tdLCBjaGFuZ2VzLCBwcmVmaWx0ZXIsIGN1cnJlbnRQYXRoLCBrLCBzdGFjayk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgc3RhY2subGVuZ3RoID0gc3RhY2subGVuZ3RoIC0gMTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGxocyAhPT0gcmhzKSB7XG4gICAgICBpZiAoIShsdHlwZSA9PT0gJ251bWJlcicgJiYgaXNOYU4obGhzKSAmJiBpc05hTihyaHMpKSkge1xuICAgICAgICBjaGFuZ2VzKG5ldyBEaWZmRWRpdChjdXJyZW50UGF0aCwgbGhzLCByaHMpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhY2N1bXVsYXRlRGlmZihsaHMsIHJocywgcHJlZmlsdGVyLCBhY2N1bSkge1xuICAgIGFjY3VtID0gYWNjdW0gfHwgW107XG4gICAgZGVlcERpZmYobGhzLCByaHMsXG4gICAgICBmdW5jdGlvbihkaWZmKSB7XG4gICAgICAgIGlmIChkaWZmKSB7XG4gICAgICAgICAgYWNjdW0ucHVzaChkaWZmKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHByZWZpbHRlcik7XG4gICAgcmV0dXJuIChhY2N1bS5sZW5ndGgpID8gYWNjdW0gOiB1bmRlZmluZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBhcHBseUFycmF5Q2hhbmdlKGFyciwgaW5kZXgsIGNoYW5nZSkge1xuICAgIGlmIChjaGFuZ2UucGF0aCAmJiBjaGFuZ2UucGF0aC5sZW5ndGgpIHtcbiAgICAgIHZhciBpdCA9IGFycltpbmRleF0sXG4gICAgICAgICAgaSwgdSA9IGNoYW5nZS5wYXRoLmxlbmd0aCAtIDE7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdTsgaSsrKSB7XG4gICAgICAgIGl0ID0gaXRbY2hhbmdlLnBhdGhbaV1dO1xuICAgICAgfVxuICAgICAgc3dpdGNoIChjaGFuZ2Uua2luZCkge1xuICAgICAgICBjYXNlICdBJzpcbiAgICAgICAgICBhcHBseUFycmF5Q2hhbmdlKGl0W2NoYW5nZS5wYXRoW2ldXSwgY2hhbmdlLmluZGV4LCBjaGFuZ2UuaXRlbSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0QnOlxuICAgICAgICAgIGRlbGV0ZSBpdFtjaGFuZ2UucGF0aFtpXV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0UnOlxuICAgICAgICBjYXNlICdOJzpcbiAgICAgICAgICBpdFtjaGFuZ2UucGF0aFtpXV0gPSBjaGFuZ2UucmhzO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKGNoYW5nZS5raW5kKSB7XG4gICAgICAgIGNhc2UgJ0EnOlxuICAgICAgICAgIGFwcGx5QXJyYXlDaGFuZ2UoYXJyW2luZGV4XSwgY2hhbmdlLmluZGV4LCBjaGFuZ2UuaXRlbSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0QnOlxuICAgICAgICAgIGFyciA9IGFycmF5UmVtb3ZlKGFyciwgaW5kZXgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdFJzpcbiAgICAgICAgY2FzZSAnTic6XG4gICAgICAgICAgYXJyW2luZGV4XSA9IGNoYW5nZS5yaHM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBmdW5jdGlvbiBhcHBseUNoYW5nZSh0YXJnZXQsIHNvdXJjZSwgY2hhbmdlKSB7XG4gICAgaWYgKHRhcmdldCAmJiBzb3VyY2UgJiYgY2hhbmdlICYmIGNoYW5nZS5raW5kKSB7XG4gICAgICB2YXIgaXQgPSB0YXJnZXQsXG4gICAgICAgICAgaSA9IC0xLFxuICAgICAgICAgIGxhc3QgPSBjaGFuZ2UucGF0aCA/IGNoYW5nZS5wYXRoLmxlbmd0aCAtIDEgOiAwO1xuICAgICAgd2hpbGUgKCsraSA8IGxhc3QpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdFtjaGFuZ2UucGF0aFtpXV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaXRbY2hhbmdlLnBhdGhbaV1dID0gKHR5cGVvZiBjaGFuZ2UucGF0aFtpXSA9PT0gJ251bWJlcicpID8gW10gOiB7fTtcbiAgICAgICAgfVxuICAgICAgICBpdCA9IGl0W2NoYW5nZS5wYXRoW2ldXTtcbiAgICAgIH1cbiAgICAgIHN3aXRjaCAoY2hhbmdlLmtpbmQpIHtcbiAgICAgICAgY2FzZSAnQSc6XG4gICAgICAgICAgYXBwbHlBcnJheUNoYW5nZShjaGFuZ2UucGF0aCA/IGl0W2NoYW5nZS5wYXRoW2ldXSA6IGl0LCBjaGFuZ2UuaW5kZXgsIGNoYW5nZS5pdGVtKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRCc6XG4gICAgICAgICAgZGVsZXRlIGl0W2NoYW5nZS5wYXRoW2ldXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRSc6XG4gICAgICAgIGNhc2UgJ04nOlxuICAgICAgICAgIGl0W2NoYW5nZS5wYXRoW2ldXSA9IGNoYW5nZS5yaHM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmV2ZXJ0QXJyYXlDaGFuZ2UoYXJyLCBpbmRleCwgY2hhbmdlKSB7XG4gICAgaWYgKGNoYW5nZS5wYXRoICYmIGNoYW5nZS5wYXRoLmxlbmd0aCkge1xuICAgICAgLy8gdGhlIHN0cnVjdHVyZSBvZiB0aGUgb2JqZWN0IGF0IHRoZSBpbmRleCBoYXMgY2hhbmdlZC4uLlxuICAgICAgdmFyIGl0ID0gYXJyW2luZGV4XSxcbiAgICAgICAgICBpLCB1ID0gY2hhbmdlLnBhdGgubGVuZ3RoIC0gMTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB1OyBpKyspIHtcbiAgICAgICAgaXQgPSBpdFtjaGFuZ2UucGF0aFtpXV07XG4gICAgICB9XG4gICAgICBzd2l0Y2ggKGNoYW5nZS5raW5kKSB7XG4gICAgICAgIGNhc2UgJ0EnOlxuICAgICAgICAgIHJldmVydEFycmF5Q2hhbmdlKGl0W2NoYW5nZS5wYXRoW2ldXSwgY2hhbmdlLmluZGV4LCBjaGFuZ2UuaXRlbSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0QnOlxuICAgICAgICAgIGl0W2NoYW5nZS5wYXRoW2ldXSA9IGNoYW5nZS5saHM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0UnOlxuICAgICAgICAgIGl0W2NoYW5nZS5wYXRoW2ldXSA9IGNoYW5nZS5saHM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ04nOlxuICAgICAgICAgIGRlbGV0ZSBpdFtjaGFuZ2UucGF0aFtpXV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHRoZSBhcnJheSBpdGVtIGlzIGRpZmZlcmVudC4uLlxuICAgICAgc3dpdGNoIChjaGFuZ2Uua2luZCkge1xuICAgICAgICBjYXNlICdBJzpcbiAgICAgICAgICByZXZlcnRBcnJheUNoYW5nZShhcnJbaW5kZXhdLCBjaGFuZ2UuaW5kZXgsIGNoYW5nZS5pdGVtKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRCc6XG4gICAgICAgICAgYXJyW2luZGV4XSA9IGNoYW5nZS5saHM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0UnOlxuICAgICAgICAgIGFycltpbmRleF0gPSBjaGFuZ2UubGhzO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdOJzpcbiAgICAgICAgICBhcnIgPSBhcnJheVJlbW92ZShhcnIsIGluZGV4KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJldmVydENoYW5nZSh0YXJnZXQsIHNvdXJjZSwgY2hhbmdlKSB7XG4gICAgaWYgKHRhcmdldCAmJiBzb3VyY2UgJiYgY2hhbmdlICYmIGNoYW5nZS5raW5kKSB7XG4gICAgICB2YXIgaXQgPSB0YXJnZXQsXG4gICAgICAgICAgaSwgdTtcbiAgICAgIHUgPSBjaGFuZ2UucGF0aC5sZW5ndGggLSAxO1xuICAgICAgZm9yIChpID0gMDsgaSA8IHU7IGkrKykge1xuICAgICAgICBpZiAodHlwZW9mIGl0W2NoYW5nZS5wYXRoW2ldXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpdFtjaGFuZ2UucGF0aFtpXV0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBpdCA9IGl0W2NoYW5nZS5wYXRoW2ldXTtcbiAgICAgIH1cbiAgICAgIHN3aXRjaCAoY2hhbmdlLmtpbmQpIHtcbiAgICAgICAgY2FzZSAnQSc6XG4gICAgICAgICAgLy8gQXJyYXkgd2FzIG1vZGlmaWVkLi4uXG4gICAgICAgICAgLy8gaXQgd2lsbCBiZSBhbiBhcnJheS4uLlxuICAgICAgICAgIHJldmVydEFycmF5Q2hhbmdlKGl0W2NoYW5nZS5wYXRoW2ldXSwgY2hhbmdlLmluZGV4LCBjaGFuZ2UuaXRlbSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0QnOlxuICAgICAgICAgIC8vIEl0ZW0gd2FzIGRlbGV0ZWQuLi5cbiAgICAgICAgICBpdFtjaGFuZ2UucGF0aFtpXV0gPSBjaGFuZ2UubGhzO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdFJzpcbiAgICAgICAgICAvLyBJdGVtIHdhcyBlZGl0ZWQuLi5cbiAgICAgICAgICBpdFtjaGFuZ2UucGF0aFtpXV0gPSBjaGFuZ2UubGhzO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdOJzpcbiAgICAgICAgICAvLyBJdGVtIGlzIG5ldy4uLlxuICAgICAgICAgIGRlbGV0ZSBpdFtjaGFuZ2UucGF0aFtpXV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYXBwbHlEaWZmKHRhcmdldCwgc291cmNlLCBmaWx0ZXIpIHtcbiAgICBpZiAodGFyZ2V0ICYmIHNvdXJjZSkge1xuICAgICAgdmFyIG9uQ2hhbmdlID0gZnVuY3Rpb24oY2hhbmdlKSB7XG4gICAgICAgIGlmICghZmlsdGVyIHx8IGZpbHRlcih0YXJnZXQsIHNvdXJjZSwgY2hhbmdlKSkge1xuICAgICAgICAgIGFwcGx5Q2hhbmdlKHRhcmdldCwgc291cmNlLCBjaGFuZ2UpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgZGVlcERpZmYodGFyZ2V0LCBzb3VyY2UsIG9uQ2hhbmdlKTtcbiAgICB9XG4gIH1cblxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhhY2N1bXVsYXRlRGlmZiwge1xuXG4gICAgZGlmZjoge1xuICAgICAgdmFsdWU6IGFjY3VtdWxhdGVEaWZmLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgb2JzZXJ2YWJsZURpZmY6IHtcbiAgICAgIHZhbHVlOiBkZWVwRGlmZixcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9LFxuICAgIGFwcGx5RGlmZjoge1xuICAgICAgdmFsdWU6IGFwcGx5RGlmZixcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9LFxuICAgIGFwcGx5Q2hhbmdlOiB7XG4gICAgICB2YWx1ZTogYXBwbHlDaGFuZ2UsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSxcbiAgICByZXZlcnRDaGFuZ2U6IHtcbiAgICAgIHZhbHVlOiByZXZlcnRDaGFuZ2UsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSxcbiAgICBpc0NvbmZsaWN0OiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiAndW5kZWZpbmVkJyAhPT0gdHlwZW9mIGNvbmZsaWN0O1xuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9LFxuICAgIG5vQ29uZmxpY3Q6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGNvbmZsaWN0UmVzb2x1dGlvbikge1xuICAgICAgICAgIGNvbmZsaWN0UmVzb2x1dGlvbi5mb3JFYWNoKGZ1bmN0aW9uKGl0KSB7XG4gICAgICAgICAgICBpdCgpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGNvbmZsaWN0UmVzb2x1dGlvbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjY3VtdWxhdGVEaWZmO1xuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBhY2N1bXVsYXRlRGlmZjtcbn0pKTtcbiIsInZhciBkZXRlY3RCcm93c2VyID0gcmVxdWlyZSgnLi9saWIvZGV0ZWN0QnJvd3NlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRldGVjdEJyb3dzZXIobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRldGVjdEJyb3dzZXIodXNlckFnZW50U3RyaW5nKSB7XG4gIHZhciBicm93c2VycyA9IFtcbiAgICBbICdlZGdlJywgL0VkZ2VcXC8oWzAtOVxcLl9dKykvIF0sXG4gICAgWyAnY2hyb21lJywgLyg/IUNocm9tLipPUFIpQ2hyb20oPzplfGl1bSlcXC8oWzAtOVxcLl0rKSg6P1xcc3wkKS8gXSxcbiAgICBbICdjcmlvcycsIC9DcmlPU1xcLyhbMC05XFwuXSspKDo/XFxzfCQpLyBdLFxuICAgIFsgJ2ZpcmVmb3gnLCAvRmlyZWZveFxcLyhbMC05XFwuXSspKD86XFxzfCQpLyBdLFxuICAgIFsgJ29wZXJhJywgL09wZXJhXFwvKFswLTlcXC5dKykoPzpcXHN8JCkvIF0sXG4gICAgWyAnb3BlcmEnLCAvT1BSXFwvKFswLTlcXC5dKykoOj9cXHN8JCkkLyBdLFxuICAgIFsgJ2llJywgL1RyaWRlbnRcXC83XFwuMC4qcnZcXDooWzAtOVxcLl0rKVxcKS4qR2Vja28kLyBdLFxuICAgIFsgJ2llJywgL01TSUVcXHMoWzAtOVxcLl0rKTsuKlRyaWRlbnRcXC9bNC03XS4wLyBdLFxuICAgIFsgJ2llJywgL01TSUVcXHMoN1xcLjApLyBdLFxuICAgIFsgJ2JiMTAnLCAvQkIxMDtcXHNUb3VjaC4qVmVyc2lvblxcLyhbMC05XFwuXSspLyBdLFxuICAgIFsgJ2FuZHJvaWQnLCAvQW5kcm9pZFxccyhbMC05XFwuXSspLyBdLFxuICAgIFsgJ2lvcycsIC9pUGFkLipWZXJzaW9uXFwvKFswLTlcXC5fXSspLyBdLFxuICAgIFsgJ2lvcycsICAvaVBob25lLipWZXJzaW9uXFwvKFswLTlcXC5fXSspLyBdLFxuICAgIFsgJ3NhZmFyaScsIC9WZXJzaW9uXFwvKFswLTlcXC5fXSspLipTYWZhcmkvIF1cbiAgXTtcblxuICB2YXIgaSA9IDAsIG1hcHBlZCA9W107XG4gIGZvciAoaSA9IDA7IGkgPCBicm93c2Vycy5sZW5ndGg7IGkrKykge1xuICAgIGJyb3dzZXJzW2ldID0gY3JlYXRlTWF0Y2goYnJvd3NlcnNbaV0pO1xuICAgIGlmIChpc01hdGNoKGJyb3dzZXJzW2ldKSkge1xuICAgICAgbWFwcGVkLnB1c2goYnJvd3NlcnNbaV0pO1xuICAgIH1cbiAgfVxuXG4gIHZhciBtYXRjaCA9IG1hcHBlZFswXTtcbiAgdmFyIHBhcnRzID0gbWF0Y2ggJiYgbWF0Y2hbM10uc3BsaXQoL1suX10vKS5zbGljZSgwLDMpO1xuXG4gIHdoaWxlIChwYXJ0cyAmJiBwYXJ0cy5sZW5ndGggPCAzKSB7XG4gICAgcGFydHMucHVzaCgnMCcpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlTWF0Y2gocGFpcikge1xuICAgIHJldHVybiBwYWlyLmNvbmNhdChwYWlyWzFdLmV4ZWModXNlckFnZW50U3RyaW5nKSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc01hdGNoKHBhaXIpIHtcbiAgICByZXR1cm4gISFwYWlyWzJdO1xuICB9XG5cbiAgLy8gcmV0dXJuIHRoZSBuYW1lIGFuZCB2ZXJzaW9uXG4gIHJldHVybiB7XG4gICAgbmFtZTogbWF0Y2ggJiYgbWF0Y2hbMF0sXG4gICAgdmVyc2lvbjogcGFydHMgJiYgcGFydHMuam9pbignLicpLFxuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgZG9jdW1lbnQgPSByZXF1aXJlKCdnbG9iYWwvZG9jdW1lbnQnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgPyByZWFkeSA6IG5vb3BcblxuZnVuY3Rpb24gcmVhZHkgKGNhbGxiYWNrKSB7XG4gIHZhciBzdGF0ZSA9IGRvY3VtZW50LnJlYWR5U3RhdGVcbiAgaWYgKHN0YXRlID09PSAnY29tcGxldGUnIHx8IHN0YXRlID09PSAnaW50ZXJhY3RpdmUnKSB7XG4gICAgcmV0dXJuIHNldFRpbWVvdXQoY2FsbGJhY2ssIDApXG4gIH1cblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gb25Mb2FkICgpIHtcbiAgICBjYWxsYmFjaygpXG4gIH0pXG59XG5cbmZ1bmN0aW9uIG5vb3AgKCkge31cbiIsIjsoZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0LyoqXG5cdCAqIEBwcmVzZXJ2ZSBGYXN0Q2xpY2s6IHBvbHlmaWxsIHRvIHJlbW92ZSBjbGljayBkZWxheXMgb24gYnJvd3NlcnMgd2l0aCB0b3VjaCBVSXMuXG5cdCAqXG5cdCAqIEBjb2RpbmdzdGFuZGFyZCBmdGxhYnMtanN2MlxuXHQgKiBAY29weXJpZ2h0IFRoZSBGaW5hbmNpYWwgVGltZXMgTGltaXRlZCBbQWxsIFJpZ2h0cyBSZXNlcnZlZF1cblx0ICogQGxpY2Vuc2UgTUlUIExpY2Vuc2UgKHNlZSBMSUNFTlNFLnR4dClcblx0ICovXG5cblx0Lypqc2xpbnQgYnJvd3Nlcjp0cnVlLCBub2RlOnRydWUqL1xuXHQvKmdsb2JhbCBkZWZpbmUsIEV2ZW50LCBOb2RlKi9cblxuXG5cdC8qKlxuXHQgKiBJbnN0YW50aWF0ZSBmYXN0LWNsaWNraW5nIGxpc3RlbmVycyBvbiB0aGUgc3BlY2lmaWVkIGxheWVyLlxuXHQgKlxuXHQgKiBAY29uc3RydWN0b3Jcblx0ICogQHBhcmFtIHtFbGVtZW50fSBsYXllciBUaGUgbGF5ZXIgdG8gbGlzdGVuIG9uXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgdG8gb3ZlcnJpZGUgdGhlIGRlZmF1bHRzXG5cdCAqL1xuXHRmdW5jdGlvbiBGYXN0Q2xpY2sobGF5ZXIsIG9wdGlvbnMpIHtcblx0XHR2YXIgb2xkT25DbGljaztcblxuXHRcdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdFx0LyoqXG5cdFx0ICogV2hldGhlciBhIGNsaWNrIGlzIGN1cnJlbnRseSBiZWluZyB0cmFja2VkLlxuXHRcdCAqXG5cdFx0ICogQHR5cGUgYm9vbGVhblxuXHRcdCAqL1xuXHRcdHRoaXMudHJhY2tpbmdDbGljayA9IGZhbHNlO1xuXG5cblx0XHQvKipcblx0XHQgKiBUaW1lc3RhbXAgZm9yIHdoZW4gY2xpY2sgdHJhY2tpbmcgc3RhcnRlZC5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIG51bWJlclxuXHRcdCAqL1xuXHRcdHRoaXMudHJhY2tpbmdDbGlja1N0YXJ0ID0gMDtcblxuXG5cdFx0LyoqXG5cdFx0ICogVGhlIGVsZW1lbnQgYmVpbmcgdHJhY2tlZCBmb3IgYSBjbGljay5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIEV2ZW50VGFyZ2V0XG5cdFx0ICovXG5cdFx0dGhpcy50YXJnZXRFbGVtZW50ID0gbnVsbDtcblxuXG5cdFx0LyoqXG5cdFx0ICogWC1jb29yZGluYXRlIG9mIHRvdWNoIHN0YXJ0IGV2ZW50LlxuXHRcdCAqXG5cdFx0ICogQHR5cGUgbnVtYmVyXG5cdFx0ICovXG5cdFx0dGhpcy50b3VjaFN0YXJ0WCA9IDA7XG5cblxuXHRcdC8qKlxuXHRcdCAqIFktY29vcmRpbmF0ZSBvZiB0b3VjaCBzdGFydCBldmVudC5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIG51bWJlclxuXHRcdCAqL1xuXHRcdHRoaXMudG91Y2hTdGFydFkgPSAwO1xuXG5cblx0XHQvKipcblx0XHQgKiBJRCBvZiB0aGUgbGFzdCB0b3VjaCwgcmV0cmlldmVkIGZyb20gVG91Y2guaWRlbnRpZmllci5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIG51bWJlclxuXHRcdCAqL1xuXHRcdHRoaXMubGFzdFRvdWNoSWRlbnRpZmllciA9IDA7XG5cblxuXHRcdC8qKlxuXHRcdCAqIFRvdWNobW92ZSBib3VuZGFyeSwgYmV5b25kIHdoaWNoIGEgY2xpY2sgd2lsbCBiZSBjYW5jZWxsZWQuXG5cdFx0ICpcblx0XHQgKiBAdHlwZSBudW1iZXJcblx0XHQgKi9cblx0XHR0aGlzLnRvdWNoQm91bmRhcnkgPSBvcHRpb25zLnRvdWNoQm91bmRhcnkgfHwgMTA7XG5cblxuXHRcdC8qKlxuXHRcdCAqIFRoZSBGYXN0Q2xpY2sgbGF5ZXIuXG5cdFx0ICpcblx0XHQgKiBAdHlwZSBFbGVtZW50XG5cdFx0ICovXG5cdFx0dGhpcy5sYXllciA9IGxheWVyO1xuXG5cdFx0LyoqXG5cdFx0ICogVGhlIG1pbmltdW0gdGltZSBiZXR3ZWVuIHRhcCh0b3VjaHN0YXJ0IGFuZCB0b3VjaGVuZCkgZXZlbnRzXG5cdFx0ICpcblx0XHQgKiBAdHlwZSBudW1iZXJcblx0XHQgKi9cblx0XHR0aGlzLnRhcERlbGF5ID0gb3B0aW9ucy50YXBEZWxheSB8fCAyMDA7XG5cblx0XHQvKipcblx0XHQgKiBUaGUgbWF4aW11bSB0aW1lIGZvciBhIHRhcFxuXHRcdCAqXG5cdFx0ICogQHR5cGUgbnVtYmVyXG5cdFx0ICovXG5cdFx0dGhpcy50YXBUaW1lb3V0ID0gb3B0aW9ucy50YXBUaW1lb3V0IHx8IDcwMDtcblxuXHRcdGlmIChGYXN0Q2xpY2subm90TmVlZGVkKGxheWVyKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdC8vIFNvbWUgb2xkIHZlcnNpb25zIG9mIEFuZHJvaWQgZG9uJ3QgaGF2ZSBGdW5jdGlvbi5wcm90b3R5cGUuYmluZFxuXHRcdGZ1bmN0aW9uIGJpbmQobWV0aG9kLCBjb250ZXh0KSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiBtZXRob2QuYXBwbHkoY29udGV4dCwgYXJndW1lbnRzKTsgfTtcblx0XHR9XG5cblxuXHRcdHZhciBtZXRob2RzID0gWydvbk1vdXNlJywgJ29uQ2xpY2snLCAnb25Ub3VjaFN0YXJ0JywgJ29uVG91Y2hNb3ZlJywgJ29uVG91Y2hFbmQnLCAnb25Ub3VjaENhbmNlbCddO1xuXHRcdHZhciBjb250ZXh0ID0gdGhpcztcblx0XHRmb3IgKHZhciBpID0gMCwgbCA9IG1ldGhvZHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG5cdFx0XHRjb250ZXh0W21ldGhvZHNbaV1dID0gYmluZChjb250ZXh0W21ldGhvZHNbaV1dLCBjb250ZXh0KTtcblx0XHR9XG5cblx0XHQvLyBTZXQgdXAgZXZlbnQgaGFuZGxlcnMgYXMgcmVxdWlyZWRcblx0XHRpZiAoZGV2aWNlSXNBbmRyb2lkKSB7XG5cdFx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCB0aGlzLm9uTW91c2UsIHRydWUpO1xuXHRcdFx0bGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlLCB0cnVlKTtcblx0XHRcdGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLm9uTW91c2UsIHRydWUpO1xuXHRcdH1cblxuXHRcdGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNsaWNrLCB0cnVlKTtcblx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5vblRvdWNoU3RhcnQsIGZhbHNlKTtcblx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLm9uVG91Y2hNb3ZlLCBmYWxzZSk7XG5cdFx0bGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLm9uVG91Y2hFbmQsIGZhbHNlKTtcblx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMub25Ub3VjaENhbmNlbCwgZmFsc2UpO1xuXG5cdFx0Ly8gSGFjayBpcyByZXF1aXJlZCBmb3IgYnJvd3NlcnMgdGhhdCBkb24ndCBzdXBwb3J0IEV2ZW50I3N0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiAoZS5nLiBBbmRyb2lkIDIpXG5cdFx0Ly8gd2hpY2ggaXMgaG93IEZhc3RDbGljayBub3JtYWxseSBzdG9wcyBjbGljayBldmVudHMgYnViYmxpbmcgdG8gY2FsbGJhY2tzIHJlZ2lzdGVyZWQgb24gdGhlIEZhc3RDbGlja1xuXHRcdC8vIGxheWVyIHdoZW4gdGhleSBhcmUgY2FuY2VsbGVkLlxuXHRcdGlmICghRXZlbnQucHJvdG90eXBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbikge1xuXHRcdFx0bGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGNhbGxiYWNrLCBjYXB0dXJlKSB7XG5cdFx0XHRcdHZhciBybXYgPSBOb2RlLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyO1xuXHRcdFx0XHRpZiAodHlwZSA9PT0gJ2NsaWNrJykge1xuXHRcdFx0XHRcdHJtdi5jYWxsKGxheWVyLCB0eXBlLCBjYWxsYmFjay5oaWphY2tlZCB8fCBjYWxsYmFjaywgY2FwdHVyZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cm12LmNhbGwobGF5ZXIsIHR5cGUsIGNhbGxiYWNrLCBjYXB0dXJlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0bGF5ZXIuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGNhbGxiYWNrLCBjYXB0dXJlKSB7XG5cdFx0XHRcdHZhciBhZHYgPSBOb2RlLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyO1xuXHRcdFx0XHRpZiAodHlwZSA9PT0gJ2NsaWNrJykge1xuXHRcdFx0XHRcdGFkdi5jYWxsKGxheWVyLCB0eXBlLCBjYWxsYmFjay5oaWphY2tlZCB8fCAoY2FsbGJhY2suaGlqYWNrZWQgPSBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRcdFx0aWYgKCFldmVudC5wcm9wYWdhdGlvblN0b3BwZWQpIHtcblx0XHRcdFx0XHRcdFx0Y2FsbGJhY2soZXZlbnQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pLCBjYXB0dXJlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRhZHYuY2FsbChsYXllciwgdHlwZSwgY2FsbGJhY2ssIGNhcHR1cmUpO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH1cblxuXHRcdC8vIElmIGEgaGFuZGxlciBpcyBhbHJlYWR5IGRlY2xhcmVkIGluIHRoZSBlbGVtZW50J3Mgb25jbGljayBhdHRyaWJ1dGUsIGl0IHdpbGwgYmUgZmlyZWQgYmVmb3JlXG5cdFx0Ly8gRmFzdENsaWNrJ3Mgb25DbGljayBoYW5kbGVyLiBGaXggdGhpcyBieSBwdWxsaW5nIG91dCB0aGUgdXNlci1kZWZpbmVkIGhhbmRsZXIgZnVuY3Rpb24gYW5kXG5cdFx0Ly8gYWRkaW5nIGl0IGFzIGxpc3RlbmVyLlxuXHRcdGlmICh0eXBlb2YgbGF5ZXIub25jbGljayA9PT0gJ2Z1bmN0aW9uJykge1xuXG5cdFx0XHQvLyBBbmRyb2lkIGJyb3dzZXIgb24gYXQgbGVhc3QgMy4yIHJlcXVpcmVzIGEgbmV3IHJlZmVyZW5jZSB0byB0aGUgZnVuY3Rpb24gaW4gbGF5ZXIub25jbGlja1xuXHRcdFx0Ly8gLSB0aGUgb2xkIG9uZSB3b24ndCB3b3JrIGlmIHBhc3NlZCB0byBhZGRFdmVudExpc3RlbmVyIGRpcmVjdGx5LlxuXHRcdFx0b2xkT25DbGljayA9IGxheWVyLm9uY2xpY2s7XG5cdFx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0XHRcdG9sZE9uQ2xpY2soZXZlbnQpO1xuXHRcdFx0fSwgZmFsc2UpO1xuXHRcdFx0bGF5ZXIub25jbGljayA9IG51bGw7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCogV2luZG93cyBQaG9uZSA4LjEgZmFrZXMgdXNlciBhZ2VudCBzdHJpbmcgdG8gbG9vayBsaWtlIEFuZHJvaWQgYW5kIGlQaG9uZS5cblx0KlxuXHQqIEB0eXBlIGJvb2xlYW5cblx0Ki9cblx0dmFyIGRldmljZUlzV2luZG93c1Bob25lID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKFwiV2luZG93cyBQaG9uZVwiKSA+PSAwO1xuXG5cdC8qKlxuXHQgKiBBbmRyb2lkIHJlcXVpcmVzIGV4Y2VwdGlvbnMuXG5cdCAqXG5cdCAqIEB0eXBlIGJvb2xlYW5cblx0ICovXG5cdHZhciBkZXZpY2VJc0FuZHJvaWQgPSBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ0FuZHJvaWQnKSA+IDAgJiYgIWRldmljZUlzV2luZG93c1Bob25lO1xuXG5cblx0LyoqXG5cdCAqIGlPUyByZXF1aXJlcyBleGNlcHRpb25zLlxuXHQgKlxuXHQgKiBAdHlwZSBib29sZWFuXG5cdCAqL1xuXHR2YXIgZGV2aWNlSXNJT1MgPSAvaVAoYWR8aG9uZXxvZCkvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgIWRldmljZUlzV2luZG93c1Bob25lO1xuXG5cblx0LyoqXG5cdCAqIGlPUyA0IHJlcXVpcmVzIGFuIGV4Y2VwdGlvbiBmb3Igc2VsZWN0IGVsZW1lbnRzLlxuXHQgKlxuXHQgKiBAdHlwZSBib29sZWFuXG5cdCAqL1xuXHR2YXIgZGV2aWNlSXNJT1M0ID0gZGV2aWNlSXNJT1MgJiYgKC9PUyA0X1xcZChfXFxkKT8vKS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG5cblx0LyoqXG5cdCAqIGlPUyA2LjAtNy4qIHJlcXVpcmVzIHRoZSB0YXJnZXQgZWxlbWVudCB0byBiZSBtYW51YWxseSBkZXJpdmVkXG5cdCAqXG5cdCAqIEB0eXBlIGJvb2xlYW5cblx0ICovXG5cdHZhciBkZXZpY2VJc0lPU1dpdGhCYWRUYXJnZXQgPSBkZXZpY2VJc0lPUyAmJiAoL09TIFs2LTddX1xcZC8pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cblx0LyoqXG5cdCAqIEJsYWNrQmVycnkgcmVxdWlyZXMgZXhjZXB0aW9ucy5cblx0ICpcblx0ICogQHR5cGUgYm9vbGVhblxuXHQgKi9cblx0dmFyIGRldmljZUlzQmxhY2tCZXJyeTEwID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdCQjEwJykgPiAwO1xuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmUgd2hldGhlciBhIGdpdmVuIGVsZW1lbnQgcmVxdWlyZXMgYSBuYXRpdmUgY2xpY2suXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnRUYXJnZXR8RWxlbWVudH0gdGFyZ2V0IFRhcmdldCBET00gZWxlbWVudFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW50IG5lZWRzIGEgbmF0aXZlIGNsaWNrXG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLm5lZWRzQ2xpY2sgPSBmdW5jdGlvbih0YXJnZXQpIHtcblx0XHRzd2l0Y2ggKHRhcmdldC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSB7XG5cblx0XHQvLyBEb24ndCBzZW5kIGEgc3ludGhldGljIGNsaWNrIHRvIGRpc2FibGVkIGlucHV0cyAoaXNzdWUgIzYyKVxuXHRcdGNhc2UgJ2J1dHRvbic6XG5cdFx0Y2FzZSAnc2VsZWN0Jzpcblx0XHRjYXNlICd0ZXh0YXJlYSc6XG5cdFx0XHRpZiAodGFyZ2V0LmRpc2FibGVkKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRicmVhaztcblx0XHRjYXNlICdpbnB1dCc6XG5cblx0XHRcdC8vIEZpbGUgaW5wdXRzIG5lZWQgcmVhbCBjbGlja3Mgb24gaU9TIDYgZHVlIHRvIGEgYnJvd3NlciBidWcgKGlzc3VlICM2OClcblx0XHRcdGlmICgoZGV2aWNlSXNJT1MgJiYgdGFyZ2V0LnR5cGUgPT09ICdmaWxlJykgfHwgdGFyZ2V0LmRpc2FibGVkKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRicmVhaztcblx0XHRjYXNlICdsYWJlbCc6XG5cdFx0Y2FzZSAnaWZyYW1lJzogLy8gaU9TOCBob21lc2NyZWVuIGFwcHMgY2FuIHByZXZlbnQgZXZlbnRzIGJ1YmJsaW5nIGludG8gZnJhbWVzXG5cdFx0Y2FzZSAndmlkZW8nOlxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICgvXFxibmVlZHNjbGlja1xcYi8pLnRlc3QodGFyZ2V0LmNsYXNzTmFtZSk7XG5cdH07XG5cblxuXHQvKipcblx0ICogRGV0ZXJtaW5lIHdoZXRoZXIgYSBnaXZlbiBlbGVtZW50IHJlcXVpcmVzIGEgY2FsbCB0byBmb2N1cyB0byBzaW11bGF0ZSBjbGljayBpbnRvIGVsZW1lbnQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnRUYXJnZXR8RWxlbWVudH0gdGFyZ2V0IFRhcmdldCBET00gZWxlbWVudFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBlbGVtZW50IHJlcXVpcmVzIGEgY2FsbCB0byBmb2N1cyB0byBzaW11bGF0ZSBuYXRpdmUgY2xpY2suXG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLm5lZWRzRm9jdXMgPSBmdW5jdGlvbih0YXJnZXQpIHtcblx0XHRzd2l0Y2ggKHRhcmdldC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSB7XG5cdFx0Y2FzZSAndGV4dGFyZWEnOlxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0Y2FzZSAnc2VsZWN0Jzpcblx0XHRcdHJldHVybiAhZGV2aWNlSXNBbmRyb2lkO1xuXHRcdGNhc2UgJ2lucHV0Jzpcblx0XHRcdHN3aXRjaCAodGFyZ2V0LnR5cGUpIHtcblx0XHRcdGNhc2UgJ2J1dHRvbic6XG5cdFx0XHRjYXNlICdjaGVja2JveCc6XG5cdFx0XHRjYXNlICdmaWxlJzpcblx0XHRcdGNhc2UgJ2ltYWdlJzpcblx0XHRcdGNhc2UgJ3JhZGlvJzpcblx0XHRcdGNhc2UgJ3N1Ym1pdCc6XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gTm8gcG9pbnQgaW4gYXR0ZW1wdGluZyB0byBmb2N1cyBkaXNhYmxlZCBpbnB1dHNcblx0XHRcdHJldHVybiAhdGFyZ2V0LmRpc2FibGVkICYmICF0YXJnZXQucmVhZE9ubHk7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiAoL1xcYm5lZWRzZm9jdXNcXGIvKS50ZXN0KHRhcmdldC5jbGFzc05hbWUpO1xuXHRcdH1cblx0fTtcblxuXG5cdC8qKlxuXHQgKiBTZW5kIGEgY2xpY2sgZXZlbnQgdG8gdGhlIHNwZWNpZmllZCBlbGVtZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fEVsZW1lbnR9IHRhcmdldEVsZW1lbnRcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnRcblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUuc2VuZENsaWNrID0gZnVuY3Rpb24odGFyZ2V0RWxlbWVudCwgZXZlbnQpIHtcblx0XHR2YXIgY2xpY2tFdmVudCwgdG91Y2g7XG5cblx0XHQvLyBPbiBzb21lIEFuZHJvaWQgZGV2aWNlcyBhY3RpdmVFbGVtZW50IG5lZWRzIHRvIGJlIGJsdXJyZWQgb3RoZXJ3aXNlIHRoZSBzeW50aGV0aWMgY2xpY2sgd2lsbCBoYXZlIG5vIGVmZmVjdCAoIzI0KVxuXHRcdGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IHRhcmdldEVsZW1lbnQpIHtcblx0XHRcdGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xuXHRcdH1cblxuXHRcdHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG5cblx0XHQvLyBTeW50aGVzaXNlIGEgY2xpY2sgZXZlbnQsIHdpdGggYW4gZXh0cmEgYXR0cmlidXRlIHNvIGl0IGNhbiBiZSB0cmFja2VkXG5cdFx0Y2xpY2tFdmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdNb3VzZUV2ZW50cycpO1xuXHRcdGNsaWNrRXZlbnQuaW5pdE1vdXNlRXZlbnQodGhpcy5kZXRlcm1pbmVFdmVudFR5cGUodGFyZ2V0RWxlbWVudCksIHRydWUsIHRydWUsIHdpbmRvdywgMSwgdG91Y2guc2NyZWVuWCwgdG91Y2guc2NyZWVuWSwgdG91Y2guY2xpZW50WCwgdG91Y2guY2xpZW50WSwgZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2UsIDAsIG51bGwpO1xuXHRcdGNsaWNrRXZlbnQuZm9yd2FyZGVkVG91Y2hFdmVudCA9IHRydWU7XG5cdFx0dGFyZ2V0RWxlbWVudC5kaXNwYXRjaEV2ZW50KGNsaWNrRXZlbnQpO1xuXHR9O1xuXG5cdEZhc3RDbGljay5wcm90b3R5cGUuZGV0ZXJtaW5lRXZlbnRUeXBlID0gZnVuY3Rpb24odGFyZ2V0RWxlbWVudCkge1xuXG5cdFx0Ly9Jc3N1ZSAjMTU5OiBBbmRyb2lkIENocm9tZSBTZWxlY3QgQm94IGRvZXMgbm90IG9wZW4gd2l0aCBhIHN5bnRoZXRpYyBjbGljayBldmVudFxuXHRcdGlmIChkZXZpY2VJc0FuZHJvaWQgJiYgdGFyZ2V0RWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdzZWxlY3QnKSB7XG5cdFx0XHRyZXR1cm4gJ21vdXNlZG93bic7XG5cdFx0fVxuXG5cdFx0cmV0dXJuICdjbGljayc7XG5cdH07XG5cblxuXHQvKipcblx0ICogQHBhcmFtIHtFdmVudFRhcmdldHxFbGVtZW50fSB0YXJnZXRFbGVtZW50XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLmZvY3VzID0gZnVuY3Rpb24odGFyZ2V0RWxlbWVudCkge1xuXHRcdHZhciBsZW5ndGg7XG5cblx0XHQvLyBJc3N1ZSAjMTYwOiBvbiBpT1MgNywgc29tZSBpbnB1dCBlbGVtZW50cyAoZS5nLiBkYXRlIGRhdGV0aW1lIG1vbnRoKSB0aHJvdyBhIHZhZ3VlIFR5cGVFcnJvciBvbiBzZXRTZWxlY3Rpb25SYW5nZS4gVGhlc2UgZWxlbWVudHMgZG9uJ3QgaGF2ZSBhbiBpbnRlZ2VyIHZhbHVlIGZvciB0aGUgc2VsZWN0aW9uU3RhcnQgYW5kIHNlbGVjdGlvbkVuZCBwcm9wZXJ0aWVzLCBidXQgdW5mb3J0dW5hdGVseSB0aGF0IGNhbid0IGJlIHVzZWQgZm9yIGRldGVjdGlvbiBiZWNhdXNlIGFjY2Vzc2luZyB0aGUgcHJvcGVydGllcyBhbHNvIHRocm93cyBhIFR5cGVFcnJvci4gSnVzdCBjaGVjayB0aGUgdHlwZSBpbnN0ZWFkLiBGaWxlZCBhcyBBcHBsZSBidWcgIzE1MTIyNzI0LlxuXHRcdGlmIChkZXZpY2VJc0lPUyAmJiB0YXJnZXRFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlICYmIHRhcmdldEVsZW1lbnQudHlwZS5pbmRleE9mKCdkYXRlJykgIT09IDAgJiYgdGFyZ2V0RWxlbWVudC50eXBlICE9PSAndGltZScgJiYgdGFyZ2V0RWxlbWVudC50eXBlICE9PSAnbW9udGgnKSB7XG5cdFx0XHRsZW5ndGggPSB0YXJnZXRFbGVtZW50LnZhbHVlLmxlbmd0aDtcblx0XHRcdHRhcmdldEVsZW1lbnQuc2V0U2VsZWN0aW9uUmFuZ2UobGVuZ3RoLCBsZW5ndGgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0YXJnZXRFbGVtZW50LmZvY3VzKCk7XG5cdFx0fVxuXHR9O1xuXG5cblx0LyoqXG5cdCAqIENoZWNrIHdoZXRoZXIgdGhlIGdpdmVuIHRhcmdldCBlbGVtZW50IGlzIGEgY2hpbGQgb2YgYSBzY3JvbGxhYmxlIGxheWVyIGFuZCBpZiBzbywgc2V0IGEgZmxhZyBvbiBpdC5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudFRhcmdldHxFbGVtZW50fSB0YXJnZXRFbGVtZW50XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLnVwZGF0ZVNjcm9sbFBhcmVudCA9IGZ1bmN0aW9uKHRhcmdldEVsZW1lbnQpIHtcblx0XHR2YXIgc2Nyb2xsUGFyZW50LCBwYXJlbnRFbGVtZW50O1xuXG5cdFx0c2Nyb2xsUGFyZW50ID0gdGFyZ2V0RWxlbWVudC5mYXN0Q2xpY2tTY3JvbGxQYXJlbnQ7XG5cblx0XHQvLyBBdHRlbXB0IHRvIGRpc2NvdmVyIHdoZXRoZXIgdGhlIHRhcmdldCBlbGVtZW50IGlzIGNvbnRhaW5lZCB3aXRoaW4gYSBzY3JvbGxhYmxlIGxheWVyLiBSZS1jaGVjayBpZiB0aGVcblx0XHQvLyB0YXJnZXQgZWxlbWVudCB3YXMgbW92ZWQgdG8gYW5vdGhlciBwYXJlbnQuXG5cdFx0aWYgKCFzY3JvbGxQYXJlbnQgfHwgIXNjcm9sbFBhcmVudC5jb250YWlucyh0YXJnZXRFbGVtZW50KSkge1xuXHRcdFx0cGFyZW50RWxlbWVudCA9IHRhcmdldEVsZW1lbnQ7XG5cdFx0XHRkbyB7XG5cdFx0XHRcdGlmIChwYXJlbnRFbGVtZW50LnNjcm9sbEhlaWdodCA+IHBhcmVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0KSB7XG5cdFx0XHRcdFx0c2Nyb2xsUGFyZW50ID0gcGFyZW50RWxlbWVudDtcblx0XHRcdFx0XHR0YXJnZXRFbGVtZW50LmZhc3RDbGlja1Njcm9sbFBhcmVudCA9IHBhcmVudEVsZW1lbnQ7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRwYXJlbnRFbGVtZW50ID0gcGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXHRcdFx0fSB3aGlsZSAocGFyZW50RWxlbWVudCk7XG5cdFx0fVxuXG5cdFx0Ly8gQWx3YXlzIHVwZGF0ZSB0aGUgc2Nyb2xsIHRvcCB0cmFja2VyIGlmIHBvc3NpYmxlLlxuXHRcdGlmIChzY3JvbGxQYXJlbnQpIHtcblx0XHRcdHNjcm9sbFBhcmVudC5mYXN0Q2xpY2tMYXN0U2Nyb2xsVG9wID0gc2Nyb2xsUGFyZW50LnNjcm9sbFRvcDtcblx0XHR9XG5cdH07XG5cblxuXHQvKipcblx0ICogQHBhcmFtIHtFdmVudFRhcmdldH0gdGFyZ2V0RWxlbWVudFxuXHQgKiBAcmV0dXJucyB7RWxlbWVudHxFdmVudFRhcmdldH1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUuZ2V0VGFyZ2V0RWxlbWVudEZyb21FdmVudFRhcmdldCA9IGZ1bmN0aW9uKGV2ZW50VGFyZ2V0KSB7XG5cblx0XHQvLyBPbiBzb21lIG9sZGVyIGJyb3dzZXJzIChub3RhYmx5IFNhZmFyaSBvbiBpT1MgNC4xIC0gc2VlIGlzc3VlICM1NikgdGhlIGV2ZW50IHRhcmdldCBtYXkgYmUgYSB0ZXh0IG5vZGUuXG5cdFx0aWYgKGV2ZW50VGFyZ2V0Lm5vZGVUeXBlID09PSBOb2RlLlRFWFRfTk9ERSkge1xuXHRcdFx0cmV0dXJuIGV2ZW50VGFyZ2V0LnBhcmVudE5vZGU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGV2ZW50VGFyZ2V0O1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIE9uIHRvdWNoIHN0YXJ0LCByZWNvcmQgdGhlIHBvc2l0aW9uIGFuZCBzY3JvbGwgb2Zmc2V0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUub25Ub3VjaFN0YXJ0ID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0XHR2YXIgdGFyZ2V0RWxlbWVudCwgdG91Y2gsIHNlbGVjdGlvbjtcblxuXHRcdC8vIElnbm9yZSBtdWx0aXBsZSB0b3VjaGVzLCBvdGhlcndpc2UgcGluY2gtdG8tem9vbSBpcyBwcmV2ZW50ZWQgaWYgYm90aCBmaW5nZXJzIGFyZSBvbiB0aGUgRmFzdENsaWNrIGVsZW1lbnQgKGlzc3VlICMxMTEpLlxuXHRcdGlmIChldmVudC50YXJnZXRUb3VjaGVzLmxlbmd0aCA+IDEpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHRhcmdldEVsZW1lbnQgPSB0aGlzLmdldFRhcmdldEVsZW1lbnRGcm9tRXZlbnRUYXJnZXQoZXZlbnQudGFyZ2V0KTtcblx0XHR0b3VjaCA9IGV2ZW50LnRhcmdldFRvdWNoZXNbMF07XG5cblx0XHRpZiAoZGV2aWNlSXNJT1MpIHtcblxuXHRcdFx0Ly8gT25seSB0cnVzdGVkIGV2ZW50cyB3aWxsIGRlc2VsZWN0IHRleHQgb24gaU9TIChpc3N1ZSAjNDkpXG5cdFx0XHRzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG5cdFx0XHRpZiAoc2VsZWN0aW9uLnJhbmdlQ291bnQgJiYgIXNlbGVjdGlvbi5pc0NvbGxhcHNlZCkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCFkZXZpY2VJc0lPUzQpIHtcblxuXHRcdFx0XHQvLyBXZWlyZCB0aGluZ3MgaGFwcGVuIG9uIGlPUyB3aGVuIGFuIGFsZXJ0IG9yIGNvbmZpcm0gZGlhbG9nIGlzIG9wZW5lZCBmcm9tIGEgY2xpY2sgZXZlbnQgY2FsbGJhY2sgKGlzc3VlICMyMyk6XG5cdFx0XHRcdC8vIHdoZW4gdGhlIHVzZXIgbmV4dCB0YXBzIGFueXdoZXJlIGVsc2Ugb24gdGhlIHBhZ2UsIG5ldyB0b3VjaHN0YXJ0IGFuZCB0b3VjaGVuZCBldmVudHMgYXJlIGRpc3BhdGNoZWRcblx0XHRcdFx0Ly8gd2l0aCB0aGUgc2FtZSBpZGVudGlmaWVyIGFzIHRoZSB0b3VjaCBldmVudCB0aGF0IHByZXZpb3VzbHkgdHJpZ2dlcmVkIHRoZSBjbGljayB0aGF0IHRyaWdnZXJlZCB0aGUgYWxlcnQuXG5cdFx0XHRcdC8vIFNhZGx5LCB0aGVyZSBpcyBhbiBpc3N1ZSBvbiBpT1MgNCB0aGF0IGNhdXNlcyBzb21lIG5vcm1hbCB0b3VjaCBldmVudHMgdG8gaGF2ZSB0aGUgc2FtZSBpZGVudGlmaWVyIGFzIGFuXG5cdFx0XHRcdC8vIGltbWVkaWF0ZWx5IHByZWNlZWRpbmcgdG91Y2ggZXZlbnQgKGlzc3VlICM1MiksIHNvIHRoaXMgZml4IGlzIHVuYXZhaWxhYmxlIG9uIHRoYXQgcGxhdGZvcm0uXG5cdFx0XHRcdC8vIElzc3VlIDEyMDogdG91Y2guaWRlbnRpZmllciBpcyAwIHdoZW4gQ2hyb21lIGRldiB0b29scyAnRW11bGF0ZSB0b3VjaCBldmVudHMnIGlzIHNldCB3aXRoIGFuIGlPUyBkZXZpY2UgVUEgc3RyaW5nLFxuXHRcdFx0XHQvLyB3aGljaCBjYXVzZXMgYWxsIHRvdWNoIGV2ZW50cyB0byBiZSBpZ25vcmVkLiBBcyB0aGlzIGJsb2NrIG9ubHkgYXBwbGllcyB0byBpT1MsIGFuZCBpT1MgaWRlbnRpZmllcnMgYXJlIGFsd2F5cyBsb25nLFxuXHRcdFx0XHQvLyByYW5kb20gaW50ZWdlcnMsIGl0J3Mgc2FmZSB0byB0byBjb250aW51ZSBpZiB0aGUgaWRlbnRpZmllciBpcyAwIGhlcmUuXG5cdFx0XHRcdGlmICh0b3VjaC5pZGVudGlmaWVyICYmIHRvdWNoLmlkZW50aWZpZXIgPT09IHRoaXMubGFzdFRvdWNoSWRlbnRpZmllcikge1xuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGhpcy5sYXN0VG91Y2hJZGVudGlmaWVyID0gdG91Y2guaWRlbnRpZmllcjtcblxuXHRcdFx0XHQvLyBJZiB0aGUgdGFyZ2V0IGVsZW1lbnQgaXMgYSBjaGlsZCBvZiBhIHNjcm9sbGFibGUgbGF5ZXIgKHVzaW5nIC13ZWJraXQtb3ZlcmZsb3ctc2Nyb2xsaW5nOiB0b3VjaCkgYW5kOlxuXHRcdFx0XHQvLyAxKSB0aGUgdXNlciBkb2VzIGEgZmxpbmcgc2Nyb2xsIG9uIHRoZSBzY3JvbGxhYmxlIGxheWVyXG5cdFx0XHRcdC8vIDIpIHRoZSB1c2VyIHN0b3BzIHRoZSBmbGluZyBzY3JvbGwgd2l0aCBhbm90aGVyIHRhcFxuXHRcdFx0XHQvLyB0aGVuIHRoZSBldmVudC50YXJnZXQgb2YgdGhlIGxhc3QgJ3RvdWNoZW5kJyBldmVudCB3aWxsIGJlIHRoZSBlbGVtZW50IHRoYXQgd2FzIHVuZGVyIHRoZSB1c2VyJ3MgZmluZ2VyXG5cdFx0XHRcdC8vIHdoZW4gdGhlIGZsaW5nIHNjcm9sbCB3YXMgc3RhcnRlZCwgY2F1c2luZyBGYXN0Q2xpY2sgdG8gc2VuZCBhIGNsaWNrIGV2ZW50IHRvIHRoYXQgbGF5ZXIgLSB1bmxlc3MgYSBjaGVja1xuXHRcdFx0XHQvLyBpcyBtYWRlIHRvIGVuc3VyZSB0aGF0IGEgcGFyZW50IGxheWVyIHdhcyBub3Qgc2Nyb2xsZWQgYmVmb3JlIHNlbmRpbmcgYSBzeW50aGV0aWMgY2xpY2sgKGlzc3VlICM0MikuXG5cdFx0XHRcdHRoaXMudXBkYXRlU2Nyb2xsUGFyZW50KHRhcmdldEVsZW1lbnQpO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHRoaXMudHJhY2tpbmdDbGljayA9IHRydWU7XG5cdFx0dGhpcy50cmFja2luZ0NsaWNrU3RhcnQgPSBldmVudC50aW1lU3RhbXA7XG5cdFx0dGhpcy50YXJnZXRFbGVtZW50ID0gdGFyZ2V0RWxlbWVudDtcblxuXHRcdHRoaXMudG91Y2hTdGFydFggPSB0b3VjaC5wYWdlWDtcblx0XHR0aGlzLnRvdWNoU3RhcnRZID0gdG91Y2gucGFnZVk7XG5cblx0XHQvLyBQcmV2ZW50IHBoYW50b20gY2xpY2tzIG9uIGZhc3QgZG91YmxlLXRhcCAoaXNzdWUgIzM2KVxuXHRcdGlmICgoZXZlbnQudGltZVN0YW1wIC0gdGhpcy5sYXN0Q2xpY2tUaW1lKSA8IHRoaXMudGFwRGVsYXkpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG5cblxuXHQvKipcblx0ICogQmFzZWQgb24gYSB0b3VjaG1vdmUgZXZlbnQgb2JqZWN0LCBjaGVjayB3aGV0aGVyIHRoZSB0b3VjaCBoYXMgbW92ZWQgcGFzdCBhIGJvdW5kYXJ5IHNpbmNlIGl0IHN0YXJ0ZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS50b3VjaEhhc01vdmVkID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0XHR2YXIgdG91Y2ggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXSwgYm91bmRhcnkgPSB0aGlzLnRvdWNoQm91bmRhcnk7XG5cblx0XHRpZiAoTWF0aC5hYnModG91Y2gucGFnZVggLSB0aGlzLnRvdWNoU3RhcnRYKSA+IGJvdW5kYXJ5IHx8IE1hdGguYWJzKHRvdWNoLnBhZ2VZIC0gdGhpcy50b3VjaFN0YXJ0WSkgPiBib3VuZGFyeSkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIFVwZGF0ZSB0aGUgbGFzdCBwb3NpdGlvbi5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnRcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLm9uVG91Y2hNb3ZlID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRpZiAoIXRoaXMudHJhY2tpbmdDbGljaykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgdGhlIHRvdWNoIGhhcyBtb3ZlZCwgY2FuY2VsIHRoZSBjbGljayB0cmFja2luZ1xuXHRcdGlmICh0aGlzLnRhcmdldEVsZW1lbnQgIT09IHRoaXMuZ2V0VGFyZ2V0RWxlbWVudEZyb21FdmVudFRhcmdldChldmVudC50YXJnZXQpIHx8IHRoaXMudG91Y2hIYXNNb3ZlZChldmVudCkpIHtcblx0XHRcdHRoaXMudHJhY2tpbmdDbGljayA9IGZhbHNlO1xuXHRcdFx0dGhpcy50YXJnZXRFbGVtZW50ID0gbnVsbDtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBBdHRlbXB0IHRvIGZpbmQgdGhlIGxhYmVsbGVkIGNvbnRyb2wgZm9yIHRoZSBnaXZlbiBsYWJlbCBlbGVtZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fEhUTUxMYWJlbEVsZW1lbnR9IGxhYmVsRWxlbWVudFxuXHQgKiBAcmV0dXJucyB7RWxlbWVudHxudWxsfVxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5maW5kQ29udHJvbCA9IGZ1bmN0aW9uKGxhYmVsRWxlbWVudCkge1xuXG5cdFx0Ly8gRmFzdCBwYXRoIGZvciBuZXdlciBicm93c2VycyBzdXBwb3J0aW5nIHRoZSBIVE1MNSBjb250cm9sIGF0dHJpYnV0ZVxuXHRcdGlmIChsYWJlbEVsZW1lbnQuY29udHJvbCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRyZXR1cm4gbGFiZWxFbGVtZW50LmNvbnRyb2w7XG5cdFx0fVxuXG5cdFx0Ly8gQWxsIGJyb3dzZXJzIHVuZGVyIHRlc3QgdGhhdCBzdXBwb3J0IHRvdWNoIGV2ZW50cyBhbHNvIHN1cHBvcnQgdGhlIEhUTUw1IGh0bWxGb3IgYXR0cmlidXRlXG5cdFx0aWYgKGxhYmVsRWxlbWVudC5odG1sRm9yKSB7XG5cdFx0XHRyZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGFiZWxFbGVtZW50Lmh0bWxGb3IpO1xuXHRcdH1cblxuXHRcdC8vIElmIG5vIGZvciBhdHRyaWJ1dGUgZXhpc3RzLCBhdHRlbXB0IHRvIHJldHJpZXZlIHRoZSBmaXJzdCBsYWJlbGxhYmxlIGRlc2NlbmRhbnQgZWxlbWVudFxuXHRcdC8vIHRoZSBsaXN0IG9mIHdoaWNoIGlzIGRlZmluZWQgaGVyZTogaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDUvZm9ybXMuaHRtbCNjYXRlZ29yeS1sYWJlbFxuXHRcdHJldHVybiBsYWJlbEVsZW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uLCBpbnB1dDpub3QoW3R5cGU9aGlkZGVuXSksIGtleWdlbiwgbWV0ZXIsIG91dHB1dCwgcHJvZ3Jlc3MsIHNlbGVjdCwgdGV4dGFyZWEnKTtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBPbiB0b3VjaCBlbmQsIGRldGVybWluZSB3aGV0aGVyIHRvIHNlbmQgYSBjbGljayBldmVudCBhdCBvbmNlLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUub25Ub3VjaEVuZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0dmFyIGZvckVsZW1lbnQsIHRyYWNraW5nQ2xpY2tTdGFydCwgdGFyZ2V0VGFnTmFtZSwgc2Nyb2xsUGFyZW50LCB0b3VjaCwgdGFyZ2V0RWxlbWVudCA9IHRoaXMudGFyZ2V0RWxlbWVudDtcblxuXHRcdGlmICghdGhpcy50cmFja2luZ0NsaWNrKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBQcmV2ZW50IHBoYW50b20gY2xpY2tzIG9uIGZhc3QgZG91YmxlLXRhcCAoaXNzdWUgIzM2KVxuXHRcdGlmICgoZXZlbnQudGltZVN0YW1wIC0gdGhpcy5sYXN0Q2xpY2tUaW1lKSA8IHRoaXMudGFwRGVsYXkpIHtcblx0XHRcdHRoaXMuY2FuY2VsTmV4dENsaWNrID0gdHJ1ZTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGlmICgoZXZlbnQudGltZVN0YW1wIC0gdGhpcy50cmFja2luZ0NsaWNrU3RhcnQpID4gdGhpcy50YXBUaW1lb3V0KSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBSZXNldCB0byBwcmV2ZW50IHdyb25nIGNsaWNrIGNhbmNlbCBvbiBpbnB1dCAoaXNzdWUgIzE1NikuXG5cdFx0dGhpcy5jYW5jZWxOZXh0Q2xpY2sgPSBmYWxzZTtcblxuXHRcdHRoaXMubGFzdENsaWNrVGltZSA9IGV2ZW50LnRpbWVTdGFtcDtcblxuXHRcdHRyYWNraW5nQ2xpY2tTdGFydCA9IHRoaXMudHJhY2tpbmdDbGlja1N0YXJ0O1xuXHRcdHRoaXMudHJhY2tpbmdDbGljayA9IGZhbHNlO1xuXHRcdHRoaXMudHJhY2tpbmdDbGlja1N0YXJ0ID0gMDtcblxuXHRcdC8vIE9uIHNvbWUgaU9TIGRldmljZXMsIHRoZSB0YXJnZXRFbGVtZW50IHN1cHBsaWVkIHdpdGggdGhlIGV2ZW50IGlzIGludmFsaWQgaWYgdGhlIGxheWVyXG5cdFx0Ly8gaXMgcGVyZm9ybWluZyBhIHRyYW5zaXRpb24gb3Igc2Nyb2xsLCBhbmQgaGFzIHRvIGJlIHJlLWRldGVjdGVkIG1hbnVhbGx5LiBOb3RlIHRoYXRcblx0XHQvLyBmb3IgdGhpcyB0byBmdW5jdGlvbiBjb3JyZWN0bHksIGl0IG11c3QgYmUgY2FsbGVkICphZnRlciogdGhlIGV2ZW50IHRhcmdldCBpcyBjaGVja2VkIVxuXHRcdC8vIFNlZSBpc3N1ZSAjNTc7IGFsc28gZmlsZWQgYXMgcmRhcjovLzEzMDQ4NTg5IC5cblx0XHRpZiAoZGV2aWNlSXNJT1NXaXRoQmFkVGFyZ2V0KSB7XG5cdFx0XHR0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuXG5cdFx0XHQvLyBJbiBjZXJ0YWluIGNhc2VzIGFyZ3VtZW50cyBvZiBlbGVtZW50RnJvbVBvaW50IGNhbiBiZSBuZWdhdGl2ZSwgc28gcHJldmVudCBzZXR0aW5nIHRhcmdldEVsZW1lbnQgdG8gbnVsbFxuXHRcdFx0dGFyZ2V0RWxlbWVudCA9IGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQodG91Y2gucGFnZVggLSB3aW5kb3cucGFnZVhPZmZzZXQsIHRvdWNoLnBhZ2VZIC0gd2luZG93LnBhZ2VZT2Zmc2V0KSB8fCB0YXJnZXRFbGVtZW50O1xuXHRcdFx0dGFyZ2V0RWxlbWVudC5mYXN0Q2xpY2tTY3JvbGxQYXJlbnQgPSB0aGlzLnRhcmdldEVsZW1lbnQuZmFzdENsaWNrU2Nyb2xsUGFyZW50O1xuXHRcdH1cblxuXHRcdHRhcmdldFRhZ05hbWUgPSB0YXJnZXRFbGVtZW50LnRhZ05hbWUudG9Mb3dlckNhc2UoKTtcblx0XHRpZiAodGFyZ2V0VGFnTmFtZSA9PT0gJ2xhYmVsJykge1xuXHRcdFx0Zm9yRWxlbWVudCA9IHRoaXMuZmluZENvbnRyb2wodGFyZ2V0RWxlbWVudCk7XG5cdFx0XHRpZiAoZm9yRWxlbWVudCkge1xuXHRcdFx0XHR0aGlzLmZvY3VzKHRhcmdldEVsZW1lbnQpO1xuXHRcdFx0XHRpZiAoZGV2aWNlSXNBbmRyb2lkKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0dGFyZ2V0RWxlbWVudCA9IGZvckVsZW1lbnQ7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICh0aGlzLm5lZWRzRm9jdXModGFyZ2V0RWxlbWVudCkpIHtcblxuXHRcdFx0Ly8gQ2FzZSAxOiBJZiB0aGUgdG91Y2ggc3RhcnRlZCBhIHdoaWxlIGFnbyAoYmVzdCBndWVzcyBpcyAxMDBtcyBiYXNlZCBvbiB0ZXN0cyBmb3IgaXNzdWUgIzM2KSB0aGVuIGZvY3VzIHdpbGwgYmUgdHJpZ2dlcmVkIGFueXdheS4gUmV0dXJuIGVhcmx5IGFuZCB1bnNldCB0aGUgdGFyZ2V0IGVsZW1lbnQgcmVmZXJlbmNlIHNvIHRoYXQgdGhlIHN1YnNlcXVlbnQgY2xpY2sgd2lsbCBiZSBhbGxvd2VkIHRocm91Z2guXG5cdFx0XHQvLyBDYXNlIDI6IFdpdGhvdXQgdGhpcyBleGNlcHRpb24gZm9yIGlucHV0IGVsZW1lbnRzIHRhcHBlZCB3aGVuIHRoZSBkb2N1bWVudCBpcyBjb250YWluZWQgaW4gYW4gaWZyYW1lLCB0aGVuIGFueSBpbnB1dHRlZCB0ZXh0IHdvbid0IGJlIHZpc2libGUgZXZlbiB0aG91Z2ggdGhlIHZhbHVlIGF0dHJpYnV0ZSBpcyB1cGRhdGVkIGFzIHRoZSB1c2VyIHR5cGVzIChpc3N1ZSAjMzcpLlxuXHRcdFx0aWYgKChldmVudC50aW1lU3RhbXAgLSB0cmFja2luZ0NsaWNrU3RhcnQpID4gMTAwIHx8IChkZXZpY2VJc0lPUyAmJiB3aW5kb3cudG9wICE9PSB3aW5kb3cgJiYgdGFyZ2V0VGFnTmFtZSA9PT0gJ2lucHV0JykpIHtcblx0XHRcdFx0dGhpcy50YXJnZXRFbGVtZW50ID0gbnVsbDtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLmZvY3VzKHRhcmdldEVsZW1lbnQpO1xuXHRcdFx0dGhpcy5zZW5kQ2xpY2sodGFyZ2V0RWxlbWVudCwgZXZlbnQpO1xuXG5cdFx0XHQvLyBTZWxlY3QgZWxlbWVudHMgbmVlZCB0aGUgZXZlbnQgdG8gZ28gdGhyb3VnaCBvbiBpT1MgNCwgb3RoZXJ3aXNlIHRoZSBzZWxlY3RvciBtZW51IHdvbid0IG9wZW4uXG5cdFx0XHQvLyBBbHNvIHRoaXMgYnJlYWtzIG9wZW5pbmcgc2VsZWN0cyB3aGVuIFZvaWNlT3ZlciBpcyBhY3RpdmUgb24gaU9TNiwgaU9TNyAoYW5kIHBvc3NpYmx5IG90aGVycylcblx0XHRcdGlmICghZGV2aWNlSXNJT1MgfHwgdGFyZ2V0VGFnTmFtZSAhPT0gJ3NlbGVjdCcpIHtcblx0XHRcdFx0dGhpcy50YXJnZXRFbGVtZW50ID0gbnVsbDtcblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGlmIChkZXZpY2VJc0lPUyAmJiAhZGV2aWNlSXNJT1M0KSB7XG5cblx0XHRcdC8vIERvbid0IHNlbmQgYSBzeW50aGV0aWMgY2xpY2sgZXZlbnQgaWYgdGhlIHRhcmdldCBlbGVtZW50IGlzIGNvbnRhaW5lZCB3aXRoaW4gYSBwYXJlbnQgbGF5ZXIgdGhhdCB3YXMgc2Nyb2xsZWRcblx0XHRcdC8vIGFuZCB0aGlzIHRhcCBpcyBiZWluZyB1c2VkIHRvIHN0b3AgdGhlIHNjcm9sbGluZyAodXN1YWxseSBpbml0aWF0ZWQgYnkgYSBmbGluZyAtIGlzc3VlICM0MikuXG5cdFx0XHRzY3JvbGxQYXJlbnQgPSB0YXJnZXRFbGVtZW50LmZhc3RDbGlja1Njcm9sbFBhcmVudDtcblx0XHRcdGlmIChzY3JvbGxQYXJlbnQgJiYgc2Nyb2xsUGFyZW50LmZhc3RDbGlja0xhc3RTY3JvbGxUb3AgIT09IHNjcm9sbFBhcmVudC5zY3JvbGxUb3ApIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gUHJldmVudCB0aGUgYWN0dWFsIGNsaWNrIGZyb20gZ29pbmcgdGhvdWdoIC0gdW5sZXNzIHRoZSB0YXJnZXQgbm9kZSBpcyBtYXJrZWQgYXMgcmVxdWlyaW5nXG5cdFx0Ly8gcmVhbCBjbGlja3Mgb3IgaWYgaXQgaXMgaW4gdGhlIHdoaXRlbGlzdCBpbiB3aGljaCBjYXNlIG9ubHkgbm9uLXByb2dyYW1tYXRpYyBjbGlja3MgYXJlIHBlcm1pdHRlZC5cblx0XHRpZiAoIXRoaXMubmVlZHNDbGljayh0YXJnZXRFbGVtZW50KSkge1xuXHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdHRoaXMuc2VuZENsaWNrKHRhcmdldEVsZW1lbnQsIGV2ZW50KTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblxuXHQvKipcblx0ICogT24gdG91Y2ggY2FuY2VsLCBzdG9wIHRyYWNraW5nIHRoZSBjbGljay5cblx0ICpcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLm9uVG91Y2hDYW5jZWwgPSBmdW5jdGlvbigpIHtcblx0XHR0aGlzLnRyYWNraW5nQ2xpY2sgPSBmYWxzZTtcblx0XHR0aGlzLnRhcmdldEVsZW1lbnQgPSBudWxsO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIERldGVybWluZSBtb3VzZSBldmVudHMgd2hpY2ggc2hvdWxkIGJlIHBlcm1pdHRlZC5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnRcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLm9uTW91c2UgPSBmdW5jdGlvbihldmVudCkge1xuXG5cdFx0Ly8gSWYgYSB0YXJnZXQgZWxlbWVudCB3YXMgbmV2ZXIgc2V0IChiZWNhdXNlIGEgdG91Y2ggZXZlbnQgd2FzIG5ldmVyIGZpcmVkKSBhbGxvdyB0aGUgZXZlbnRcblx0XHRpZiAoIXRoaXMudGFyZ2V0RWxlbWVudCkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKGV2ZW50LmZvcndhcmRlZFRvdWNoRXZlbnQpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIFByb2dyYW1tYXRpY2FsbHkgZ2VuZXJhdGVkIGV2ZW50cyB0YXJnZXRpbmcgYSBzcGVjaWZpYyBlbGVtZW50IHNob3VsZCBiZSBwZXJtaXR0ZWRcblx0XHRpZiAoIWV2ZW50LmNhbmNlbGFibGUpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIERlcml2ZSBhbmQgY2hlY2sgdGhlIHRhcmdldCBlbGVtZW50IHRvIHNlZSB3aGV0aGVyIHRoZSBtb3VzZSBldmVudCBuZWVkcyB0byBiZSBwZXJtaXR0ZWQ7XG5cdFx0Ly8gdW5sZXNzIGV4cGxpY2l0bHkgZW5hYmxlZCwgcHJldmVudCBub24tdG91Y2ggY2xpY2sgZXZlbnRzIGZyb20gdHJpZ2dlcmluZyBhY3Rpb25zLFxuXHRcdC8vIHRvIHByZXZlbnQgZ2hvc3QvZG91YmxlY2xpY2tzLlxuXHRcdGlmICghdGhpcy5uZWVkc0NsaWNrKHRoaXMudGFyZ2V0RWxlbWVudCkgfHwgdGhpcy5jYW5jZWxOZXh0Q2xpY2spIHtcblxuXHRcdFx0Ly8gUHJldmVudCBhbnkgdXNlci1hZGRlZCBsaXN0ZW5lcnMgZGVjbGFyZWQgb24gRmFzdENsaWNrIGVsZW1lbnQgZnJvbSBiZWluZyBmaXJlZC5cblx0XHRcdGlmIChldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24pIHtcblx0XHRcdFx0ZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdC8vIFBhcnQgb2YgdGhlIGhhY2sgZm9yIGJyb3dzZXJzIHRoYXQgZG9uJ3Qgc3VwcG9ydCBFdmVudCNzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24gKGUuZy4gQW5kcm9pZCAyKVxuXHRcdFx0XHRldmVudC5wcm9wYWdhdGlvblN0b3BwZWQgPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDYW5jZWwgdGhlIGV2ZW50XG5cdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBJZiB0aGUgbW91c2UgZXZlbnQgaXMgcGVybWl0dGVkLCByZXR1cm4gdHJ1ZSBmb3IgdGhlIGFjdGlvbiB0byBnbyB0aHJvdWdoLlxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIE9uIGFjdHVhbCBjbGlja3MsIGRldGVybWluZSB3aGV0aGVyIHRoaXMgaXMgYSB0b3VjaC1nZW5lcmF0ZWQgY2xpY2ssIGEgY2xpY2sgYWN0aW9uIG9jY3VycmluZ1xuXHQgKiBuYXR1cmFsbHkgYWZ0ZXIgYSBkZWxheSBhZnRlciBhIHRvdWNoICh3aGljaCBuZWVkcyB0byBiZSBjYW5jZWxsZWQgdG8gYXZvaWQgZHVwbGljYXRpb24pLCBvclxuXHQgKiBhbiBhY3R1YWwgY2xpY2sgd2hpY2ggc2hvdWxkIGJlIHBlcm1pdHRlZC5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnRcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLm9uQ2xpY2sgPSBmdW5jdGlvbihldmVudCkge1xuXHRcdHZhciBwZXJtaXR0ZWQ7XG5cblx0XHQvLyBJdCdzIHBvc3NpYmxlIGZvciBhbm90aGVyIEZhc3RDbGljay1saWtlIGxpYnJhcnkgZGVsaXZlcmVkIHdpdGggdGhpcmQtcGFydHkgY29kZSB0byBmaXJlIGEgY2xpY2sgZXZlbnQgYmVmb3JlIEZhc3RDbGljayBkb2VzIChpc3N1ZSAjNDQpLiBJbiB0aGF0IGNhc2UsIHNldCB0aGUgY2xpY2stdHJhY2tpbmcgZmxhZyBiYWNrIHRvIGZhbHNlIGFuZCByZXR1cm4gZWFybHkuIFRoaXMgd2lsbCBjYXVzZSBvblRvdWNoRW5kIHRvIHJldHVybiBlYXJseS5cblx0XHRpZiAodGhpcy50cmFja2luZ0NsaWNrKSB7XG5cdFx0XHR0aGlzLnRhcmdldEVsZW1lbnQgPSBudWxsO1xuXHRcdFx0dGhpcy50cmFja2luZ0NsaWNrID0gZmFsc2U7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBWZXJ5IG9kZCBiZWhhdmlvdXIgb24gaU9TIChpc3N1ZSAjMTgpOiBpZiBhIHN1Ym1pdCBlbGVtZW50IGlzIHByZXNlbnQgaW5zaWRlIGEgZm9ybSBhbmQgdGhlIHVzZXIgaGl0cyBlbnRlciBpbiB0aGUgaU9TIHNpbXVsYXRvciBvciBjbGlja3MgdGhlIEdvIGJ1dHRvbiBvbiB0aGUgcG9wLXVwIE9TIGtleWJvYXJkIHRoZSBhIGtpbmQgb2YgJ2Zha2UnIGNsaWNrIGV2ZW50IHdpbGwgYmUgdHJpZ2dlcmVkIHdpdGggdGhlIHN1Ym1pdC10eXBlIGlucHV0IGVsZW1lbnQgYXMgdGhlIHRhcmdldC5cblx0XHRpZiAoZXZlbnQudGFyZ2V0LnR5cGUgPT09ICdzdWJtaXQnICYmIGV2ZW50LmRldGFpbCA9PT0gMCkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0cGVybWl0dGVkID0gdGhpcy5vbk1vdXNlKGV2ZW50KTtcblxuXHRcdC8vIE9ubHkgdW5zZXQgdGFyZ2V0RWxlbWVudCBpZiB0aGUgY2xpY2sgaXMgbm90IHBlcm1pdHRlZC4gVGhpcyB3aWxsIGVuc3VyZSB0aGF0IHRoZSBjaGVjayBmb3IgIXRhcmdldEVsZW1lbnQgaW4gb25Nb3VzZSBmYWlscyBhbmQgdGhlIGJyb3dzZXIncyBjbGljayBkb2Vzbid0IGdvIHRocm91Z2guXG5cdFx0aWYgKCFwZXJtaXR0ZWQpIHtcblx0XHRcdHRoaXMudGFyZ2V0RWxlbWVudCA9IG51bGw7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgY2xpY2tzIGFyZSBwZXJtaXR0ZWQsIHJldHVybiB0cnVlIGZvciB0aGUgYWN0aW9uIHRvIGdvIHRocm91Z2guXG5cdFx0cmV0dXJuIHBlcm1pdHRlZDtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBSZW1vdmUgYWxsIEZhc3RDbGljaydzIGV2ZW50IGxpc3RlbmVycy5cblx0ICpcblx0ICogQHJldHVybnMge3ZvaWR9XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcblx0XHR2YXIgbGF5ZXIgPSB0aGlzLmxheWVyO1xuXG5cdFx0aWYgKGRldmljZUlzQW5kcm9pZCkge1xuXHRcdFx0bGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgdGhpcy5vbk1vdXNlLCB0cnVlKTtcblx0XHRcdGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZSwgdHJ1ZSk7XG5cdFx0XHRsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5vbk1vdXNlLCB0cnVlKTtcblx0XHR9XG5cblx0XHRsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGljaywgdHJ1ZSk7XG5cdFx0bGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMub25Ub3VjaFN0YXJ0LCBmYWxzZSk7XG5cdFx0bGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5vblRvdWNoTW92ZSwgZmFsc2UpO1xuXHRcdGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5vblRvdWNoRW5kLCBmYWxzZSk7XG5cdFx0bGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0aGlzLm9uVG91Y2hDYW5jZWwsIGZhbHNlKTtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBDaGVjayB3aGV0aGVyIEZhc3RDbGljayBpcyBuZWVkZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gbGF5ZXIgVGhlIGxheWVyIHRvIGxpc3RlbiBvblxuXHQgKi9cblx0RmFzdENsaWNrLm5vdE5lZWRlZCA9IGZ1bmN0aW9uKGxheWVyKSB7XG5cdFx0dmFyIG1ldGFWaWV3cG9ydDtcblx0XHR2YXIgY2hyb21lVmVyc2lvbjtcblx0XHR2YXIgYmxhY2tiZXJyeVZlcnNpb247XG5cdFx0dmFyIGZpcmVmb3hWZXJzaW9uO1xuXG5cdFx0Ly8gRGV2aWNlcyB0aGF0IGRvbid0IHN1cHBvcnQgdG91Y2ggZG9uJ3QgbmVlZCBGYXN0Q2xpY2tcblx0XHRpZiAodHlwZW9mIHdpbmRvdy5vbnRvdWNoc3RhcnQgPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBDaHJvbWUgdmVyc2lvbiAtIHplcm8gZm9yIG90aGVyIGJyb3dzZXJzXG5cdFx0Y2hyb21lVmVyc2lvbiA9ICsoL0Nocm9tZVxcLyhbMC05XSspLy5leGVjKG5hdmlnYXRvci51c2VyQWdlbnQpIHx8IFssMF0pWzFdO1xuXG5cdFx0aWYgKGNocm9tZVZlcnNpb24pIHtcblxuXHRcdFx0aWYgKGRldmljZUlzQW5kcm9pZCkge1xuXHRcdFx0XHRtZXRhVmlld3BvcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9dmlld3BvcnRdJyk7XG5cblx0XHRcdFx0aWYgKG1ldGFWaWV3cG9ydCkge1xuXHRcdFx0XHRcdC8vIENocm9tZSBvbiBBbmRyb2lkIHdpdGggdXNlci1zY2FsYWJsZT1cIm5vXCIgZG9lc24ndCBuZWVkIEZhc3RDbGljayAoaXNzdWUgIzg5KVxuXHRcdFx0XHRcdGlmIChtZXRhVmlld3BvcnQuY29udGVudC5pbmRleE9mKCd1c2VyLXNjYWxhYmxlPW5vJykgIT09IC0xKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gQ2hyb21lIDMyIGFuZCBhYm92ZSB3aXRoIHdpZHRoPWRldmljZS13aWR0aCBvciBsZXNzIGRvbid0IG5lZWQgRmFzdENsaWNrXG5cdFx0XHRcdFx0aWYgKGNocm9tZVZlcnNpb24gPiAzMSAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsV2lkdGggPD0gd2luZG93Lm91dGVyV2lkdGgpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHQvLyBDaHJvbWUgZGVza3RvcCBkb2Vzbid0IG5lZWQgRmFzdENsaWNrIChpc3N1ZSAjMTUpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiAoZGV2aWNlSXNCbGFja0JlcnJ5MTApIHtcblx0XHRcdGJsYWNrYmVycnlWZXJzaW9uID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvVmVyc2lvblxcLyhbMC05XSopXFwuKFswLTldKikvKTtcblxuXHRcdFx0Ly8gQmxhY2tCZXJyeSAxMC4zKyBkb2VzIG5vdCByZXF1aXJlIEZhc3RjbGljayBsaWJyYXJ5LlxuXHRcdFx0Ly8gaHR0cHM6Ly9naXRodWIuY29tL2Z0bGFicy9mYXN0Y2xpY2svaXNzdWVzLzI1MVxuXHRcdFx0aWYgKGJsYWNrYmVycnlWZXJzaW9uWzFdID49IDEwICYmIGJsYWNrYmVycnlWZXJzaW9uWzJdID49IDMpIHtcblx0XHRcdFx0bWV0YVZpZXdwb3J0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPXZpZXdwb3J0XScpO1xuXG5cdFx0XHRcdGlmIChtZXRhVmlld3BvcnQpIHtcblx0XHRcdFx0XHQvLyB1c2VyLXNjYWxhYmxlPW5vIGVsaW1pbmF0ZXMgY2xpY2sgZGVsYXkuXG5cdFx0XHRcdFx0aWYgKG1ldGFWaWV3cG9ydC5jb250ZW50LmluZGV4T2YoJ3VzZXItc2NhbGFibGU9bm8nKSAhPT0gLTEpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyB3aWR0aD1kZXZpY2Utd2lkdGggKG9yIGxlc3MgdGhhbiBkZXZpY2Utd2lkdGgpIGVsaW1pbmF0ZXMgY2xpY2sgZGVsYXkuXG5cdFx0XHRcdFx0aWYgKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxXaWR0aCA8PSB3aW5kb3cub3V0ZXJXaWR0aCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gSUUxMCB3aXRoIC1tcy10b3VjaC1hY3Rpb246IG5vbmUgb3IgbWFuaXB1bGF0aW9uLCB3aGljaCBkaXNhYmxlcyBkb3VibGUtdGFwLXRvLXpvb20gKGlzc3VlICM5Nylcblx0XHRpZiAobGF5ZXIuc3R5bGUubXNUb3VjaEFjdGlvbiA9PT0gJ25vbmUnIHx8IGxheWVyLnN0eWxlLnRvdWNoQWN0aW9uID09PSAnbWFuaXB1bGF0aW9uJykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gRmlyZWZveCB2ZXJzaW9uIC0gemVybyBmb3Igb3RoZXIgYnJvd3NlcnNcblx0XHRmaXJlZm94VmVyc2lvbiA9ICsoL0ZpcmVmb3hcXC8oWzAtOV0rKS8uZXhlYyhuYXZpZ2F0b3IudXNlckFnZW50KSB8fCBbLDBdKVsxXTtcblxuXHRcdGlmIChmaXJlZm94VmVyc2lvbiA+PSAyNykge1xuXHRcdFx0Ly8gRmlyZWZveCAyNysgZG9lcyBub3QgaGF2ZSB0YXAgZGVsYXkgaWYgdGhlIGNvbnRlbnQgaXMgbm90IHpvb21hYmxlIC0gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9OTIyODk2XG5cblx0XHRcdG1ldGFWaWV3cG9ydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT12aWV3cG9ydF0nKTtcblx0XHRcdGlmIChtZXRhVmlld3BvcnQgJiYgKG1ldGFWaWV3cG9ydC5jb250ZW50LmluZGV4T2YoJ3VzZXItc2NhbGFibGU9bm8nKSAhPT0gLTEgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFdpZHRoIDw9IHdpbmRvdy5vdXRlcldpZHRoKSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBJRTExOiBwcmVmaXhlZCAtbXMtdG91Y2gtYWN0aW9uIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQgYW5kIGl0J3MgcmVjb21lbmRlZCB0byB1c2Ugbm9uLXByZWZpeGVkIHZlcnNpb25cblx0XHQvLyBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvd2luZG93cy9hcHBzL0hoNzY3MzEzLmFzcHhcblx0XHRpZiAobGF5ZXIuc3R5bGUudG91Y2hBY3Rpb24gPT09ICdub25lJyB8fCBsYXllci5zdHlsZS50b3VjaEFjdGlvbiA9PT0gJ21hbmlwdWxhdGlvbicpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBGYWN0b3J5IG1ldGhvZCBmb3IgY3JlYXRpbmcgYSBGYXN0Q2xpY2sgb2JqZWN0XG5cdCAqXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gbGF5ZXIgVGhlIGxheWVyIHRvIGxpc3RlbiBvblxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0c1xuXHQgKi9cblx0RmFzdENsaWNrLmF0dGFjaCA9IGZ1bmN0aW9uKGxheWVyLCBvcHRpb25zKSB7XG5cdFx0cmV0dXJuIG5ldyBGYXN0Q2xpY2sobGF5ZXIsIG9wdGlvbnMpO1xuXHR9O1xuXG5cblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGRlZmluZS5hbWQgPT09ICdvYmplY3QnICYmIGRlZmluZS5hbWQpIHtcblxuXHRcdC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cblx0XHRkZWZpbmUoZnVuY3Rpb24oKSB7XG5cdFx0XHRyZXR1cm4gRmFzdENsaWNrO1xuXHRcdH0pO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBGYXN0Q2xpY2suYXR0YWNoO1xuXHRcdG1vZHVsZS5leHBvcnRzLkZhc3RDbGljayA9IEZhc3RDbGljaztcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuRmFzdENsaWNrID0gRmFzdENsaWNrO1xuXHR9XG59KCkpO1xuIiwidmFyIGlzRnVuY3Rpb24gPSByZXF1aXJlKCdpcy1mdW5jdGlvbicpXG5cbm1vZHVsZS5leHBvcnRzID0gZm9yRWFjaFxuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5XG5cbmZ1bmN0aW9uIGZvckVhY2gobGlzdCwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICBpZiAoIWlzRnVuY3Rpb24oaXRlcmF0b3IpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2l0ZXJhdG9yIG11c3QgYmUgYSBmdW5jdGlvbicpXG4gICAgfVxuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XG4gICAgICAgIGNvbnRleHQgPSB0aGlzXG4gICAgfVxuICAgIFxuICAgIGlmICh0b1N0cmluZy5jYWxsKGxpc3QpID09PSAnW29iamVjdCBBcnJheV0nKVxuICAgICAgICBmb3JFYWNoQXJyYXkobGlzdCwgaXRlcmF0b3IsIGNvbnRleHQpXG4gICAgZWxzZSBpZiAodHlwZW9mIGxpc3QgPT09ICdzdHJpbmcnKVxuICAgICAgICBmb3JFYWNoU3RyaW5nKGxpc3QsIGl0ZXJhdG9yLCBjb250ZXh0KVxuICAgIGVsc2VcbiAgICAgICAgZm9yRWFjaE9iamVjdChsaXN0LCBpdGVyYXRvciwgY29udGV4dClcbn1cblxuZnVuY3Rpb24gZm9yRWFjaEFycmF5KGFycmF5LCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChhcnJheSwgaSkpIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgYXJyYXlbaV0sIGksIGFycmF5KVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBmb3JFYWNoU3RyaW5nKHN0cmluZywgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc3RyaW5nLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIC8vIG5vIHN1Y2ggdGhpbmcgYXMgYSBzcGFyc2Ugc3RyaW5nLlxuICAgICAgICBpdGVyYXRvci5jYWxsKGNvbnRleHQsIHN0cmluZy5jaGFyQXQoaSksIGksIHN0cmluZylcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZvckVhY2hPYmplY3Qob2JqZWN0LCBpdGVyYXRvciwgY29udGV4dCkge1xuICAgIGZvciAodmFyIGsgaW4gb2JqZWN0KSB7XG4gICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgaykpIHtcbiAgICAgICAgICAgIGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqZWN0W2tdLCBrLCBvYmplY3QpXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJ2YXIgdG9wTGV2ZWwgPSB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6XG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB7fVxudmFyIG1pbkRvYyA9IHJlcXVpcmUoJ21pbi1kb2N1bWVudCcpO1xuXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZG9jdW1lbnQ7XG59IGVsc2Uge1xuICAgIHZhciBkb2NjeSA9IHRvcExldmVsWydfX0dMT0JBTF9ET0NVTUVOVF9DQUNIRUA0J107XG5cbiAgICBpZiAoIWRvY2N5KSB7XG4gICAgICAgIGRvY2N5ID0gdG9wTGV2ZWxbJ19fR0xPQkFMX0RPQ1VNRU5UX0NBQ0hFQDQnXSA9IG1pbkRvYztcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGRvY2N5O1xufVxuIiwiaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsO1xufSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBzZWxmO1xufSBlbHNlIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHt9O1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYXNoTWF0Y2ggKGhhc2gsIHByZWZpeCkge1xuICB2YXIgcHJlID0gcHJlZml4IHx8ICcvJztcbiAgaWYgKGhhc2gubGVuZ3RoID09PSAwKSByZXR1cm4gcHJlO1xuICBoYXNoID0gaGFzaC5yZXBsYWNlKCcjJywgJycpO1xuICBoYXNoID0gaGFzaC5yZXBsYWNlKC9cXC8kLywgJycpXG4gIGlmIChoYXNoLmluZGV4T2YoJy8nKSAhPSAwKSBoYXNoID0gJy8nICsgaGFzaDtcbiAgaWYgKHByZSA9PSAnLycpIHJldHVybiBoYXNoO1xuICBlbHNlIHJldHVybiBoYXNoLnJlcGxhY2UocHJlLCAnJyk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGF0dHJpYnV0ZVRvUHJvcGVydHlcblxudmFyIHRyYW5zZm9ybSA9IHtcbiAgJ2NsYXNzJzogJ2NsYXNzTmFtZScsXG4gICdmb3InOiAnaHRtbEZvcicsXG4gICdodHRwLWVxdWl2JzogJ2h0dHBFcXVpdidcbn1cblxuZnVuY3Rpb24gYXR0cmlidXRlVG9Qcm9wZXJ0eSAoaCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHRhZ05hbWUsIGF0dHJzLCBjaGlsZHJlbikge1xuICAgIGZvciAodmFyIGF0dHIgaW4gYXR0cnMpIHtcbiAgICAgIGlmIChhdHRyIGluIHRyYW5zZm9ybSkge1xuICAgICAgICBhdHRyc1t0cmFuc2Zvcm1bYXR0cl1dID0gYXR0cnNbYXR0cl1cbiAgICAgICAgZGVsZXRlIGF0dHJzW2F0dHJdXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBoKHRhZ05hbWUsIGF0dHJzLCBjaGlsZHJlbilcbiAgfVxufVxuIiwidmFyIGF0dHJUb1Byb3AgPSByZXF1aXJlKCdoeXBlcnNjcmlwdC1hdHRyaWJ1dGUtdG8tcHJvcGVydHknKVxuXG52YXIgVkFSID0gMCwgVEVYVCA9IDEsIE9QRU4gPSAyLCBDTE9TRSA9IDMsIEFUVFIgPSA0XG52YXIgQVRUUl9LRVkgPSA1LCBBVFRSX0tFWV9XID0gNlxudmFyIEFUVFJfVkFMVUVfVyA9IDcsIEFUVFJfVkFMVUUgPSA4XG52YXIgQVRUUl9WQUxVRV9TUSA9IDksIEFUVFJfVkFMVUVfRFEgPSAxMFxudmFyIEFUVFJfRVEgPSAxMSwgQVRUUl9CUkVBSyA9IDEyXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGgsIG9wdHMpIHtcbiAgaCA9IGF0dHJUb1Byb3AoaClcbiAgaWYgKCFvcHRzKSBvcHRzID0ge31cbiAgdmFyIGNvbmNhdCA9IG9wdHMuY29uY2F0IHx8IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIFN0cmluZyhhKSArIFN0cmluZyhiKVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChzdHJpbmdzKSB7XG4gICAgdmFyIHN0YXRlID0gVEVYVCwgcmVnID0gJydcbiAgICB2YXIgYXJnbGVuID0gYXJndW1lbnRzLmxlbmd0aFxuICAgIHZhciBwYXJ0cyA9IFtdXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmluZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpIDwgYXJnbGVuIC0gMSkge1xuICAgICAgICB2YXIgYXJnID0gYXJndW1lbnRzW2krMV1cbiAgICAgICAgdmFyIHAgPSBwYXJzZShzdHJpbmdzW2ldKVxuICAgICAgICB2YXIgeHN0YXRlID0gc3RhdGVcbiAgICAgICAgaWYgKHhzdGF0ZSA9PT0gQVRUUl9WQUxVRV9EUSkgeHN0YXRlID0gQVRUUl9WQUxVRVxuICAgICAgICBpZiAoeHN0YXRlID09PSBBVFRSX1ZBTFVFX1NRKSB4c3RhdGUgPSBBVFRSX1ZBTFVFXG4gICAgICAgIGlmICh4c3RhdGUgPT09IEFUVFJfVkFMVUVfVykgeHN0YXRlID0gQVRUUl9WQUxVRVxuICAgICAgICBpZiAoeHN0YXRlID09PSBBVFRSKSB4c3RhdGUgPSBBVFRSX0tFWVxuICAgICAgICBwLnB1c2goWyBWQVIsIHhzdGF0ZSwgYXJnIF0pXG4gICAgICAgIHBhcnRzLnB1c2guYXBwbHkocGFydHMsIHApXG4gICAgICB9IGVsc2UgcGFydHMucHVzaC5hcHBseShwYXJ0cywgcGFyc2Uoc3RyaW5nc1tpXSkpXG4gICAgfVxuXG4gICAgdmFyIHRyZWUgPSBbbnVsbCx7fSxbXV1cbiAgICB2YXIgc3RhY2sgPSBbW3RyZWUsLTFdXVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjdXIgPSBzdGFja1tzdGFjay5sZW5ndGgtMV1bMF1cbiAgICAgIHZhciBwID0gcGFydHNbaV0sIHMgPSBwWzBdXG4gICAgICBpZiAocyA9PT0gT1BFTiAmJiAvXlxcLy8udGVzdChwWzFdKSkge1xuICAgICAgICB2YXIgaXggPSBzdGFja1tzdGFjay5sZW5ndGgtMV1bMV1cbiAgICAgICAgaWYgKHN0YWNrLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBzdGFjay5wb3AoKVxuICAgICAgICAgIHN0YWNrW3N0YWNrLmxlbmd0aC0xXVswXVsyXVtpeF0gPSBoKFxuICAgICAgICAgICAgY3VyWzBdLCBjdXJbMV0sIGN1clsyXS5sZW5ndGggPyBjdXJbMl0gOiB1bmRlZmluZWRcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocyA9PT0gT1BFTikge1xuICAgICAgICB2YXIgYyA9IFtwWzFdLHt9LFtdXVxuICAgICAgICBjdXJbMl0ucHVzaChjKVxuICAgICAgICBzdGFjay5wdXNoKFtjLGN1clsyXS5sZW5ndGgtMV0pXG4gICAgICB9IGVsc2UgaWYgKHMgPT09IEFUVFJfS0VZIHx8IChzID09PSBWQVIgJiYgcFsxXSA9PT0gQVRUUl9LRVkpKSB7XG4gICAgICAgIHZhciBrZXkgPSAnJ1xuICAgICAgICB2YXIgY29weUtleVxuICAgICAgICBmb3IgKDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHBhcnRzW2ldWzBdID09PSBBVFRSX0tFWSkge1xuICAgICAgICAgICAga2V5ID0gY29uY2F0KGtleSwgcGFydHNbaV1bMV0pXG4gICAgICAgICAgfSBlbHNlIGlmIChwYXJ0c1tpXVswXSA9PT0gVkFSICYmIHBhcnRzW2ldWzFdID09PSBBVFRSX0tFWSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJ0c1tpXVsyXSA9PT0gJ29iamVjdCcgJiYgIWtleSkge1xuICAgICAgICAgICAgICBmb3IgKGNvcHlLZXkgaW4gcGFydHNbaV1bMl0pIHtcbiAgICAgICAgICAgICAgICBpZiAocGFydHNbaV1bMl0uaGFzT3duUHJvcGVydHkoY29weUtleSkgJiYgIWN1clsxXVtjb3B5S2V5XSkge1xuICAgICAgICAgICAgICAgICAgY3VyWzFdW2NvcHlLZXldID0gcGFydHNbaV1bMl1bY29weUtleV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGtleSA9IGNvbmNhdChrZXksIHBhcnRzW2ldWzJdKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBicmVha1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJ0c1tpXVswXSA9PT0gQVRUUl9FUSkgaSsrXG4gICAgICAgIHZhciBqID0gaVxuICAgICAgICBmb3IgKDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHBhcnRzW2ldWzBdID09PSBBVFRSX1ZBTFVFIHx8IHBhcnRzW2ldWzBdID09PSBBVFRSX0tFWSkge1xuICAgICAgICAgICAgaWYgKCFjdXJbMV1ba2V5XSkgY3VyWzFdW2tleV0gPSBzdHJmbihwYXJ0c1tpXVsxXSlcbiAgICAgICAgICAgIGVsc2UgY3VyWzFdW2tleV0gPSBjb25jYXQoY3VyWzFdW2tleV0sIHBhcnRzW2ldWzFdKVxuICAgICAgICAgIH0gZWxzZSBpZiAocGFydHNbaV1bMF0gPT09IFZBUlxuICAgICAgICAgICYmIChwYXJ0c1tpXVsxXSA9PT0gQVRUUl9WQUxVRSB8fCBwYXJ0c1tpXVsxXSA9PT0gQVRUUl9LRVkpKSB7XG4gICAgICAgICAgICBpZiAoIWN1clsxXVtrZXldKSBjdXJbMV1ba2V5XSA9IHN0cmZuKHBhcnRzW2ldWzJdKVxuICAgICAgICAgICAgZWxzZSBjdXJbMV1ba2V5XSA9IGNvbmNhdChjdXJbMV1ba2V5XSwgcGFydHNbaV1bMl0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChrZXkubGVuZ3RoICYmICFjdXJbMV1ba2V5XSAmJiBpID09PSBqXG4gICAgICAgICAgICAmJiAocGFydHNbaV1bMF0gPT09IENMT1NFIHx8IHBhcnRzW2ldWzBdID09PSBBVFRSX0JSRUFLKSkge1xuICAgICAgICAgICAgICAvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9pbmZyYXN0cnVjdHVyZS5odG1sI2Jvb2xlYW4tYXR0cmlidXRlc1xuICAgICAgICAgICAgICAvLyBlbXB0eSBzdHJpbmcgaXMgZmFsc3ksIG5vdCB3ZWxsIGJlaGF2ZWQgdmFsdWUgaW4gYnJvd3NlclxuICAgICAgICAgICAgICBjdXJbMV1ba2V5XSA9IGtleS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzID09PSBBVFRSX0tFWSkge1xuICAgICAgICBjdXJbMV1bcFsxXV0gPSB0cnVlXG4gICAgICB9IGVsc2UgaWYgKHMgPT09IFZBUiAmJiBwWzFdID09PSBBVFRSX0tFWSkge1xuICAgICAgICBjdXJbMV1bcFsyXV0gPSB0cnVlXG4gICAgICB9IGVsc2UgaWYgKHMgPT09IENMT1NFKSB7XG4gICAgICAgIGlmIChzZWxmQ2xvc2luZyhjdXJbMF0pICYmIHN0YWNrLmxlbmd0aCkge1xuICAgICAgICAgIHZhciBpeCA9IHN0YWNrW3N0YWNrLmxlbmd0aC0xXVsxXVxuICAgICAgICAgIHN0YWNrLnBvcCgpXG4gICAgICAgICAgc3RhY2tbc3RhY2subGVuZ3RoLTFdWzBdWzJdW2l4XSA9IGgoXG4gICAgICAgICAgICBjdXJbMF0sIGN1clsxXSwgY3VyWzJdLmxlbmd0aCA/IGN1clsyXSA6IHVuZGVmaW5lZFxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzID09PSBWQVIgJiYgcFsxXSA9PT0gVEVYVCkge1xuICAgICAgICBpZiAocFsyXSA9PT0gdW5kZWZpbmVkIHx8IHBbMl0gPT09IG51bGwpIHBbMl0gPSAnJ1xuICAgICAgICBlbHNlIGlmICghcFsyXSkgcFsyXSA9IGNvbmNhdCgnJywgcFsyXSlcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocFsyXVswXSkpIHtcbiAgICAgICAgICBjdXJbMl0ucHVzaC5hcHBseShjdXJbMl0sIHBbMl0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3VyWzJdLnB1c2gocFsyXSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzID09PSBURVhUKSB7XG4gICAgICAgIGN1clsyXS5wdXNoKHBbMV0pXG4gICAgICB9IGVsc2UgaWYgKHMgPT09IEFUVFJfRVEgfHwgcyA9PT0gQVRUUl9CUkVBSykge1xuICAgICAgICAvLyBuby1vcFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmhhbmRsZWQ6ICcgKyBzKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0cmVlWzJdLmxlbmd0aCA+IDEgJiYgL15cXHMqJC8udGVzdCh0cmVlWzJdWzBdKSkge1xuICAgICAgdHJlZVsyXS5zaGlmdCgpXG4gICAgfVxuXG4gICAgaWYgKHRyZWVbMl0ubGVuZ3RoID4gMlxuICAgIHx8ICh0cmVlWzJdLmxlbmd0aCA9PT0gMiAmJiAvXFxTLy50ZXN0KHRyZWVbMl1bMV0pKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnbXVsdGlwbGUgcm9vdCBlbGVtZW50cyBtdXN0IGJlIHdyYXBwZWQgaW4gYW4gZW5jbG9zaW5nIHRhZydcbiAgICAgIClcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodHJlZVsyXVswXSkgJiYgdHlwZW9mIHRyZWVbMl1bMF1bMF0gPT09ICdzdHJpbmcnXG4gICAgJiYgQXJyYXkuaXNBcnJheSh0cmVlWzJdWzBdWzJdKSkge1xuICAgICAgdHJlZVsyXVswXSA9IGgodHJlZVsyXVswXVswXSwgdHJlZVsyXVswXVsxXSwgdHJlZVsyXVswXVsyXSlcbiAgICB9XG4gICAgcmV0dXJuIHRyZWVbMl1bMF1cblxuICAgIGZ1bmN0aW9uIHBhcnNlIChzdHIpIHtcbiAgICAgIHZhciByZXMgPSBbXVxuICAgICAgaWYgKHN0YXRlID09PSBBVFRSX1ZBTFVFX1cpIHN0YXRlID0gQVRUUlxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGMgPSBzdHIuY2hhckF0KGkpXG4gICAgICAgIGlmIChzdGF0ZSA9PT0gVEVYVCAmJiBjID09PSAnPCcpIHtcbiAgICAgICAgICBpZiAocmVnLmxlbmd0aCkgcmVzLnB1c2goW1RFWFQsIHJlZ10pXG4gICAgICAgICAgcmVnID0gJydcbiAgICAgICAgICBzdGF0ZSA9IE9QRU5cbiAgICAgICAgfSBlbHNlIGlmIChjID09PSAnPicgJiYgIXF1b3Qoc3RhdGUpKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBPUEVOKSB7XG4gICAgICAgICAgICByZXMucHVzaChbT1BFTixyZWddKVxuICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfS0VZKSB7XG4gICAgICAgICAgICByZXMucHVzaChbQVRUUl9LRVkscmVnXSlcbiAgICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX1ZBTFVFICYmIHJlZy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlcy5wdXNoKFtBVFRSX1ZBTFVFLHJlZ10pXG4gICAgICAgICAgfVxuICAgICAgICAgIHJlcy5wdXNoKFtDTE9TRV0pXG4gICAgICAgICAgcmVnID0gJydcbiAgICAgICAgICBzdGF0ZSA9IFRFWFRcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gVEVYVCkge1xuICAgICAgICAgIHJlZyArPSBjXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IE9QRU4gJiYgL1xccy8udGVzdChjKSkge1xuICAgICAgICAgIHJlcy5wdXNoKFtPUEVOLCByZWddKVxuICAgICAgICAgIHJlZyA9ICcnXG4gICAgICAgICAgc3RhdGUgPSBBVFRSXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IE9QRU4pIHtcbiAgICAgICAgICByZWcgKz0gY1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSICYmIC9bXFx3LV0vLnRlc3QoYykpIHtcbiAgICAgICAgICBzdGF0ZSA9IEFUVFJfS0VZXG4gICAgICAgICAgcmVnID0gY1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSICYmIC9cXHMvLnRlc3QoYykpIHtcbiAgICAgICAgICBpZiAocmVnLmxlbmd0aCkgcmVzLnB1c2goW0FUVFJfS0VZLHJlZ10pXG4gICAgICAgICAgcmVzLnB1c2goW0FUVFJfQlJFQUtdKVxuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX0tFWSAmJiAvXFxzLy50ZXN0KGMpKSB7XG4gICAgICAgICAgcmVzLnB1c2goW0FUVFJfS0VZLHJlZ10pXG4gICAgICAgICAgcmVnID0gJydcbiAgICAgICAgICBzdGF0ZSA9IEFUVFJfS0VZX1dcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9LRVkgJiYgYyA9PT0gJz0nKSB7XG4gICAgICAgICAgcmVzLnB1c2goW0FUVFJfS0VZLHJlZ10sW0FUVFJfRVFdKVxuICAgICAgICAgIHJlZyA9ICcnXG4gICAgICAgICAgc3RhdGUgPSBBVFRSX1ZBTFVFX1dcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9LRVkpIHtcbiAgICAgICAgICByZWcgKz0gY1xuICAgICAgICB9IGVsc2UgaWYgKChzdGF0ZSA9PT0gQVRUUl9LRVlfVyB8fCBzdGF0ZSA9PT0gQVRUUikgJiYgYyA9PT0gJz0nKSB7XG4gICAgICAgICAgcmVzLnB1c2goW0FUVFJfRVFdKVxuICAgICAgICAgIHN0YXRlID0gQVRUUl9WQUxVRV9XXG4gICAgICAgIH0gZWxzZSBpZiAoKHN0YXRlID09PSBBVFRSX0tFWV9XIHx8IHN0YXRlID09PSBBVFRSKSAmJiAhL1xccy8udGVzdChjKSkge1xuICAgICAgICAgIHJlcy5wdXNoKFtBVFRSX0JSRUFLXSlcbiAgICAgICAgICBpZiAoL1tcXHctXS8udGVzdChjKSkge1xuICAgICAgICAgICAgcmVnICs9IGNcbiAgICAgICAgICAgIHN0YXRlID0gQVRUUl9LRVlcbiAgICAgICAgICB9IGVsc2Ugc3RhdGUgPSBBVFRSXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUVfVyAmJiBjID09PSAnXCInKSB7XG4gICAgICAgICAgc3RhdGUgPSBBVFRSX1ZBTFVFX0RRXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUVfVyAmJiBjID09PSBcIidcIikge1xuICAgICAgICAgIHN0YXRlID0gQVRUUl9WQUxVRV9TUVxuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX1ZBTFVFX0RRICYmIGMgPT09ICdcIicpIHtcbiAgICAgICAgICByZXMucHVzaChbQVRUUl9WQUxVRSxyZWddLFtBVFRSX0JSRUFLXSlcbiAgICAgICAgICByZWcgPSAnJ1xuICAgICAgICAgIHN0YXRlID0gQVRUUlxuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX1ZBTFVFX1NRICYmIGMgPT09IFwiJ1wiKSB7XG4gICAgICAgICAgcmVzLnB1c2goW0FUVFJfVkFMVUUscmVnXSxbQVRUUl9CUkVBS10pXG4gICAgICAgICAgcmVnID0gJydcbiAgICAgICAgICBzdGF0ZSA9IEFUVFJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9WQUxVRV9XICYmICEvXFxzLy50ZXN0KGMpKSB7XG4gICAgICAgICAgc3RhdGUgPSBBVFRSX1ZBTFVFXG4gICAgICAgICAgaS0tXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUUgJiYgL1xccy8udGVzdChjKSkge1xuICAgICAgICAgIHJlcy5wdXNoKFtBVFRSX1ZBTFVFLHJlZ10sW0FUVFJfQlJFQUtdKVxuICAgICAgICAgIHJlZyA9ICcnXG4gICAgICAgICAgc3RhdGUgPSBBVFRSXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUUgfHwgc3RhdGUgPT09IEFUVFJfVkFMVUVfU1FcbiAgICAgICAgfHwgc3RhdGUgPT09IEFUVFJfVkFMVUVfRFEpIHtcbiAgICAgICAgICByZWcgKz0gY1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3RhdGUgPT09IFRFWFQgJiYgcmVnLmxlbmd0aCkge1xuICAgICAgICByZXMucHVzaChbVEVYVCxyZWddKVxuICAgICAgICByZWcgPSAnJ1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9WQUxVRSAmJiByZWcubGVuZ3RoKSB7XG4gICAgICAgIHJlcy5wdXNoKFtBVFRSX1ZBTFVFLHJlZ10pXG4gICAgICAgIHJlZyA9ICcnXG4gICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX1ZBTFVFX0RRICYmIHJlZy5sZW5ndGgpIHtcbiAgICAgICAgcmVzLnB1c2goW0FUVFJfVkFMVUUscmVnXSlcbiAgICAgICAgcmVnID0gJydcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUVfU1EgJiYgcmVnLmxlbmd0aCkge1xuICAgICAgICByZXMucHVzaChbQVRUUl9WQUxVRSxyZWddKVxuICAgICAgICByZWcgPSAnJ1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9LRVkpIHtcbiAgICAgICAgcmVzLnB1c2goW0FUVFJfS0VZLHJlZ10pXG4gICAgICAgIHJlZyA9ICcnXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc3RyZm4gKHgpIHtcbiAgICBpZiAodHlwZW9mIHggPT09ICdmdW5jdGlvbicpIHJldHVybiB4XG4gICAgZWxzZSBpZiAodHlwZW9mIHggPT09ICdzdHJpbmcnKSByZXR1cm4geFxuICAgIGVsc2UgaWYgKHggJiYgdHlwZW9mIHggPT09ICdvYmplY3QnKSByZXR1cm4geFxuICAgIGVsc2UgcmV0dXJuIGNvbmNhdCgnJywgeClcbiAgfVxufVxuXG5mdW5jdGlvbiBxdW90IChzdGF0ZSkge1xuICByZXR1cm4gc3RhdGUgPT09IEFUVFJfVkFMVUVfU1EgfHwgc3RhdGUgPT09IEFUVFJfVkFMVUVfRFFcbn1cblxudmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHlcbmZ1bmN0aW9uIGhhcyAob2JqLCBrZXkpIHsgcmV0dXJuIGhhc093bi5jYWxsKG9iaiwga2V5KSB9XG5cbnZhciBjbG9zZVJFID0gUmVnRXhwKCdeKCcgKyBbXG4gICdhcmVhJywgJ2Jhc2UnLCAnYmFzZWZvbnQnLCAnYmdzb3VuZCcsICdicicsICdjb2wnLCAnY29tbWFuZCcsICdlbWJlZCcsXG4gICdmcmFtZScsICdocicsICdpbWcnLCAnaW5wdXQnLCAnaXNpbmRleCcsICdrZXlnZW4nLCAnbGluaycsICdtZXRhJywgJ3BhcmFtJyxcbiAgJ3NvdXJjZScsICd0cmFjaycsICd3YnInLFxuICAvLyBTVkcgVEFHU1xuICAnYW5pbWF0ZScsICdhbmltYXRlVHJhbnNmb3JtJywgJ2NpcmNsZScsICdjdXJzb3InLCAnZGVzYycsICdlbGxpcHNlJyxcbiAgJ2ZlQmxlbmQnLCAnZmVDb2xvck1hdHJpeCcsICdmZUNvbXBvc2l0ZScsXG4gICdmZUNvbnZvbHZlTWF0cml4JywgJ2ZlRGlmZnVzZUxpZ2h0aW5nJywgJ2ZlRGlzcGxhY2VtZW50TWFwJyxcbiAgJ2ZlRGlzdGFudExpZ2h0JywgJ2ZlRmxvb2QnLCAnZmVGdW5jQScsICdmZUZ1bmNCJywgJ2ZlRnVuY0cnLCAnZmVGdW5jUicsXG4gICdmZUdhdXNzaWFuQmx1cicsICdmZUltYWdlJywgJ2ZlTWVyZ2VOb2RlJywgJ2ZlTW9ycGhvbG9neScsXG4gICdmZU9mZnNldCcsICdmZVBvaW50TGlnaHQnLCAnZmVTcGVjdWxhckxpZ2h0aW5nJywgJ2ZlU3BvdExpZ2h0JywgJ2ZlVGlsZScsXG4gICdmZVR1cmJ1bGVuY2UnLCAnZm9udC1mYWNlLWZvcm1hdCcsICdmb250LWZhY2UtbmFtZScsICdmb250LWZhY2UtdXJpJyxcbiAgJ2dseXBoJywgJ2dseXBoUmVmJywgJ2hrZXJuJywgJ2ltYWdlJywgJ2xpbmUnLCAnbWlzc2luZy1nbHlwaCcsICdtcGF0aCcsXG4gICdwYXRoJywgJ3BvbHlnb24nLCAncG9seWxpbmUnLCAncmVjdCcsICdzZXQnLCAnc3RvcCcsICd0cmVmJywgJ3VzZScsICd2aWV3JyxcbiAgJ3ZrZXJuJ1xuXS5qb2luKCd8JykgKyAnKSg/OltcXC4jXVthLXpBLVowLTlcXHUwMDdGLVxcdUZGRkZfOi1dKykqJCcpXG5mdW5jdGlvbiBzZWxmQ2xvc2luZyAodGFnKSB7IHJldHVybiBjbG9zZVJFLnRlc3QodGFnKSB9XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGlzRnVuY3Rpb25cblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xuXG5mdW5jdGlvbiBpc0Z1bmN0aW9uIChmbikge1xuICB2YXIgc3RyaW5nID0gdG9TdHJpbmcuY2FsbChmbilcbiAgcmV0dXJuIHN0cmluZyA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJyB8fFxuICAgICh0eXBlb2YgZm4gPT09ICdmdW5jdGlvbicgJiYgc3RyaW5nICE9PSAnW29iamVjdCBSZWdFeHBdJykgfHxcbiAgICAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgLy8gSUU4IGFuZCBiZWxvd1xuICAgICAoZm4gPT09IHdpbmRvdy5zZXRUaW1lb3V0IHx8XG4gICAgICBmbiA9PT0gd2luZG93LmFsZXJ0IHx8XG4gICAgICBmbiA9PT0gd2luZG93LmNvbmZpcm0gfHxcbiAgICAgIGZuID09PSB3aW5kb3cucHJvbXB0KSlcbn07XG4iLCJtb2R1bGUuZXhwb3J0cz1bXG4gIHtcbiAgICBcImlkXCI6IFwiYWF0cm94XCIsXG4gICAgXCJrZXlcIjogXCIyNjZcIixcbiAgICBcIm5hbWVcIjogXCJBYXRyb3hcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIERhcmtpbiBCbGFkZVwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiVGFua1wiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTM3LjgsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODUsXG4gICAgICBcIm1wXCI6IDEwNS42LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQ1LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQ1LFxuICAgICAgXCJhcm1vclwiOiAyNC4zODQsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy44LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxNTAsXG4gICAgICBcImhwcmVnZW5cIjogNi41OSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNSxcbiAgICAgIFwibXByZWdlblwiOiAwLFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDYwLjM3NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4yLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0FhdHJveC5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiAwLFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJBYXRyb3ggaXMgYSBsZWdlbmRhcnkgd2Fycmlvciwgb25lIG9mIG9ubHkgZml2ZSB0aGF0IHJlbWFpbiBvZiBhbiBhbmNpZW50IHJhY2Uga25vd24gYXMgdGhlIERhcmtpbi4gSGUgd2llbGRzIGhpcyBtYXNzaXZlIGJsYWRlIHdpdGggZ3JhY2UgYW5kIHBvaXNlLCBzbGljaW5nIHRocm91Z2ggbGVnaW9ucyBpbiBhIHN0eWxlIHRoYXQgaXMgaHlwbm90aWMgdG8gYmVob2xkLiBXaXRoIGVhY2ggZm9lIGZlbGxlZCwgQWF0cm94J3MgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJhaHJpXCIsXG4gICAgXCJrZXlcIjogXCIxMDNcIixcbiAgICBcIm5hbWVcIjogXCJBaHJpXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBOaW5lLVRhaWxlZCBGb3hcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCIsXG4gICAgICBcIkFzc2Fzc2luXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MTQuNCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MCxcbiAgICAgIFwibXBcIjogMzM0LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDUwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzMwLFxuICAgICAgXCJhcm1vclwiOiAyMC44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1NTAsXG4gICAgICBcImhwcmVnZW5cIjogNi41MDUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjYsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUzLjA0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNjUsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9BaHJpLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQ4LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJVbmxpa2Ugb3RoZXIgZm94ZXMgdGhhdCByb2FtZWQgdGhlIHdvb2RzIG9mIHNvdXRoZXJuIElvbmlhLCBBaHJpIGhhZCBhbHdheXMgZmVsdCBhIHN0cmFuZ2UgY29ubmVjdGlvbiB0byB0aGUgbWFnaWNhbCB3b3JsZCBhcm91bmQgaGVyOyBhIGNvbm5lY3Rpb24gdGhhdCB3YXMgc29tZWhvdyBpbmNvbXBsZXRlLiBEZWVwIGluc2lkZSwgc2hlIGZlbHQgdGhlIHNraW4gc2hlIGhhZCBiZWVuIGJvcm4gaW50byB3YXMgYW4gaWxsIGZpdCBmb3IgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJha2FsaVwiLFxuICAgIFwia2V5XCI6IFwiODRcIixcbiAgICBcIm5hbWVcIjogXCJBa2FsaVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgRmlzdCBvZiBTaGFkb3dcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJBc3Nhc3NpblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTg3LjgsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODUsXG4gICAgICBcIm1wXCI6IDIwMCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzUwLFxuICAgICAgXCJhcm1vclwiOiAyNi4zOCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA4LjM0LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42NSxcbiAgICAgIFwibXByZWdlblwiOiA1MCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1OC4zNzYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMixcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMSxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzLjFcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vQWthbGkucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogOTYsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRoZXJlIGV4aXN0cyBhbiBhbmNpZW50IG9yZGVyIG9yaWdpbmF0aW5nIGluIHRoZSBJb25pYW4gSXNsZXMgZGVkaWNhdGVkIHRvIHRoZSBwcmVzZXJ2YXRpb24gb2YgYmFsYW5jZS4gT3JkZXIsIGNoYW9zLCBsaWdodCwgZGFya25lc3MgLS0gYWxsIHRoaW5ncyBtdXN0IGV4aXN0IGluIHBlcmZlY3QgaGFybW9ueSBmb3Igc3VjaCBpcyB0aGUgd2F5IG9mIHRoZSB1bml2ZXJzZS4gVGhpcyBvcmRlciBpcyBrbm93biBhcyB0aGUgS2lua291IC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiYWxpc3RhclwiLFxuICAgIFwia2V5XCI6IFwiMTJcIixcbiAgICBcIm5hbWVcIjogXCJBbGlzdGFyXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBNaW5vdGF1clwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlRhbmtcIixcbiAgICAgIFwiU3VwcG9ydFwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNjEzLjM2LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDEwNixcbiAgICAgIFwibXBcIjogMjc4Ljg0LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDM4LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzMwLFxuICAgICAgXCJhcm1vclwiOiAyNC4zOCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA4LjY3NSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuODUsXG4gICAgICBcIm1wcmVnZW5cIjogOC41LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNjEuMTExNixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy42MixcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjEyNVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9BbGlzdGFyLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDE0NCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiQXMgdGhlIG1pZ2h0aWVzdCB3YXJyaW9yIHRvIGV2ZXIgZW1lcmdlIGZyb20gdGhlIE1pbm90YXVyIHRyaWJlcyBvZiB0aGUgR3JlYXQgQmFycmllciwgQWxpc3RhciBkZWZlbmRlZCBoaXMgdHJpYmUgZnJvbSBWYWxvcmFuJ3MgbWFueSBkYW5nZXJzOyB0aGF0IGlzLCB1bnRpbCB0aGUgY29taW5nIG9mIHRoZSBOb3hpYW4gYXJteS4gQWxpc3RhciB3YXMgbHVyZWQgZnJvbSBoaXMgdmlsbGFnZSBieSB0aGUgbWFjaGluYXRpb25zIG9mIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiYW11bXVcIixcbiAgICBcImtleVwiOiBcIjMyXCIsXG4gICAgXCJuYW1lXCI6IFwiQW11bXVcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFNhZCBNdW1teVwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlRhbmtcIixcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNjEzLjEyLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg0LFxuICAgICAgXCJtcFwiOiAyODcuMixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMjMuNTQ0LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuOCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDguODc1LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC44NSxcbiAgICAgIFwibXByZWdlblwiOiA3LjM4LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC41MjUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1My4zODQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuOCxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDIsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi4xOFxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9BbXVtdS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiAxOTIsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnU29saXR1ZGUgY2FuIGJlIGxvbmVsaWVyIHRoYW4gZGVhdGguJyc8YnI+PGJyPkEgbG9uZWx5IGFuZCBtZWxhbmNob2x5IHNvdWwgZnJvbSBhbmNpZW50IFNodXJpbWEsIEFtdW11IHJvYW1zIHRoZSB3b3JsZCBpbiBzZWFyY2ggb2YgYSBmcmllbmQuIEN1cnNlZCBieSBhbiBhbmNpZW50IHNwZWxsLCBoZSBpcyBkb29tZWQgdG8gcmVtYWluIGFsb25lIGZvcmV2ZXIsIGFzIGhpcyB0b3VjaCBpcyBkZWF0aCBhbmQgaGlzIGFmZmVjdGlvbiAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImFuaXZpYVwiLFxuICAgIFwia2V5XCI6IFwiMzRcIixcbiAgICBcIm5hbWVcIjogXCJBbml2aWFcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIENyeW9waG9lbml4XCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiLFxuICAgICAgXCJTdXBwb3J0XCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA0NjcuNixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA3MCxcbiAgICAgIFwibXBcIjogMzk2LjA0LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDUwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzI1LFxuICAgICAgXCJhcm1vclwiOiAyMS4yMixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiA0LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNjAwLFxuICAgICAgXCJocHJlZ2VuXCI6IDUuNTcsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1MS4zNzYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMixcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAxLjY4XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0FuaXZpYS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiAyNDAsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkFuaXZpYSBpcyBhIGJlaW5nIG9mIHRoZSBjb2xkZXN0IHdpbnRlciwgYSBteXN0aWNhbCBlbWJvZGltZW50IG9mIGljZSBtYWdpYywgYW5kIGFuIGFuY2llbnQgcHJvdGVjdG9yIG9mIHRoZSBGcmVsam9yZC4gU2hlIGNvbW1hbmRzIGFsbCB0aGUgcG93ZXIgYW5kIGZ1cnkgb2YgdGhlIGxhbmQgaXRzZWxmLCBjYWxsaW5nIHRoZSBzbm93IGFuZCBiaXR0ZXIgd2luZCB0byBkZWZlbmQgaGVyIGhvbWUgZnJvbSB0aG9zZSB3aG8gd291bGQgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJhbm5pZVwiLFxuICAgIFwia2V5XCI6IFwiMVwiLFxuICAgIFwibmFtZVwiOiBcIkFubmllXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBEYXJrIENoaWxkXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTExLjY4LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDc2LFxuICAgICAgXCJtcFwiOiAzMzQsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNTAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDE5LjIyLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDQsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1NzUsXG4gICAgICBcImhwcmVnZW5cIjogNS40MixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUwLjQxLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAyLjYyNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMC4wOCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAxLjM2XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0FubmllLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDI4OCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGhlcmUgaGF2ZSBhbHdheXMgYmVlbiB0aG9zZSB3aXRoaW4gTm94dXMgd2hvIGRpZCBub3QgYWdyZWUgd2l0aCB0aGUgZXZpbHMgcGVycGV0cmF0ZWQgYnkgdGhlIE5veGlhbiBIaWdoIENvbW1hbmQuIFRoZSBIaWdoIENvbW1hbmQgaGFkIGp1c3QgcHV0IGRvd24gYSBjb3VwIGF0dGVtcHQgZnJvbSB0aGUgc2VsZi1wcm9jbGFpbWVkIENyb3duIFByaW5jZSBSYXNjaGFsbGlvbiwgYW5kIGEgY3JhY2tkb3duIG9uIGFueSBmb3JtIG9mIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiYXNoZVwiLFxuICAgIFwia2V5XCI6IFwiMjJcIixcbiAgICBcIm5hbWVcIjogXCJBc2hlXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBGcm9zdCBBcmNoZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYXJrc21hblwiLFxuICAgICAgXCJTdXBwb3J0XCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MjcuNzIsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNzksXG4gICAgICBcIm1wXCI6IDI4MCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAzMixcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMyNSxcbiAgICAgIFwiYXJtb3JcIjogMjEuMjEyLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDYwMCxcbiAgICAgIFwiaHByZWdlblwiOiA1LjQyLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA2Ljk3LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC40LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTYuNTA4LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAyLjI2LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzLjMzXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0FzaGUucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogMzM2LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJXaXRoIGVhY2ggYXJyb3cgc2hlIGZpcmVzIGZyb20gaGVyIGFuY2llbnQgaWNlLWVuY2hhbnRlZCBib3csIEFzaGUgcHJvdmVzIHNoZSBpcyBhIG1hc3RlciBhcmNoZXIuIFNoZSBjaG9vc2VzIGVhY2ggdGFyZ2V0IGNhcmVmdWxseSwgd2FpdHMgZm9yIHRoZSByaWdodCBtb21lbnQsIGFuZCB0aGVuIHN0cmlrZXMgd2l0aCBwb3dlciBhbmQgcHJlY2lzaW9uLiBJdCBpcyB3aXRoIHRoaXMgc2FtZSB2aXNpb24gYW5kIGZvY3VzIHRoYXQgc2hlIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiYXVyZWxpb25zb2xcIixcbiAgICBcImtleVwiOiBcIjEzNlwiLFxuICAgIFwibmFtZVwiOiBcIkF1cmVsaW9uIFNvbFwiLFxuICAgIFwidGl0bGVcIjogXCJUaGUgU3RhciBGb3JnZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCIsXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU1MCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MCxcbiAgICAgIFwibXBcIjogMzUwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDUwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzI1LFxuICAgICAgXCJhcm1vclwiOiAxOSxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjYsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1NTAsXG4gICAgICBcImhwcmVnZW5cIjogNi41LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NyxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4yLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDEuMzZcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vQXVyZWxpb25Tb2wucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogMzg0LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJBdXJlbGlvbiBTb2zCoG9uY2XCoGdyYWNlZCB0aGUgdmFzdCBlbXB0aW5lc3Mgb2YgdGhlIGNvc21vcyB3aXRoIGNlbGVzdGlhbCB3b25kZXJzIG9mIGhpcyBvd24gZGV2aXNpbmcuIE5vdywgaGUgaXMgZm9yY2VkIHRvIHdpZWxkIGhpcyBhd2Vzb21lIHBvd2VyIGF0IHRoZSBiZWhlc3Qgb2YgYSBzcGFjZS1mYXJpbmcgZW1waXJlIHRoYXQgdHJpY2tlZCBoaW0gaW50byBzZXJ2aXR1ZGUuIERlc2lyaW5nIGEgcmV0dXJuIHRvIGhpcyAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImF6aXJcIixcbiAgICBcImtleVwiOiBcIjI2OFwiLFxuICAgIFwibmFtZVwiOiBcIkF6aXJcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEVtcGVyb3Igb2YgdGhlIFNhbmRzXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiLFxuICAgICAgXCJNYXJrc21hblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTI0LjQsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODAsXG4gICAgICBcIm1wXCI6IDM1MC41NixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MixcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMyNSxcbiAgICAgIFwiYXJtb3JcIjogMTkuMDQsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMyxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDUyNSxcbiAgICAgIFwiaHByZWdlblwiOiA2LjkyLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTIsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDIuOCxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDIsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMS41XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0F6aXIucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogNDMyLFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ1NodXJpbWEgd2FzIG9uY2UgdGhlIGdsb3J5IG9mIFJ1bmV0ZXJyYS4gSSB3aWxsIG1ha2UgaXQgc28gYWdhaW4uJyc8YnI+PGJyPkF6aXIgd2FzIGEgbW9ydGFsIGVtcGVyb3Igb2YgU2h1cmltYSBpbiBhIGZhciBkaXN0YW50IGFnZSwgYSBwcm91ZCBtYW4gd2hvIHN0b29kIGF0IHRoZSBjdXNwIG9mIGltbW9ydGFsaXR5LiBIaXMgaHVicmlzIHNhdyBoaW0gYmV0cmF5ZWQgYW5kIG11cmRlcmVkIGF0IHRoZSBtb21lbnQgb2YgaGlzIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiYmFyZFwiLFxuICAgIFwia2V5XCI6IFwiNDMyXCIsXG4gICAgXCJuYW1lXCI6IFwiQmFyZFwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgV2FuZGVyaW5nIENhcmV0YWtlclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlN1cHBvcnRcIixcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTM1LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg5LFxuICAgICAgXCJtcFwiOiAzNTAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNTAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzAsXG4gICAgICBcImFybW9yXCI6IDI1LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDQsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1MDAsXG4gICAgICBcImhwcmVnZW5cIjogNS40LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC40NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUyLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDJcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vQmFyZC5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiAwLFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiQmFyZCB0cmF2ZWxzIHRocm91Z2ggcmVhbG1zIGJleW9uZCB0aGUgaW1hZ2luYXRpb24gb2YgbW9ydGFsIGJlaW5ncy4gU29tZSBvZiBWYWxvcmFuJ3MgZ3JlYXRlc3Qgc2Nob2xhcnMgaGF2ZSBzcGVudCB0aGVpciBsaXZlcyB0cnlpbmcgdG8gdW5kZXJzdGFuZCB0aGUgbXlzdGVyaWVzIGhlIGVtYm9kaWVzLiBUaGlzIGVuaWdtYXRpYyBzcGlyaXQgaGFzIGJlZW4gZ2l2ZW4gbWFueSBuYW1lcyB0aHJvdWdob3V0IHRoZSBoaXN0b3J5IG9mIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiYmxpdHpjcmFua1wiLFxuICAgIFwia2V5XCI6IFwiNTNcIixcbiAgICBcIm5hbWVcIjogXCJCbGl0emNyYW5rXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBHcmVhdCBTdGVhbSBHb2xlbVwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlRhbmtcIixcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTgyLjYsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTUsXG4gICAgICBcIm1wXCI6IDI2Ny4yLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzI1LFxuICAgICAgXCJhcm1vclwiOiAyNC4zOCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiA0LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOC41MSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNzUsXG4gICAgICBcIm1wcmVnZW5cIjogOC41LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNjEuNTQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAxLjEzXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0JsaXR6Y3JhbmsucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogNDgsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJaYXVuIGlzIGEgcGxhY2Ugd2hlcmUgYm90aCBtYWdpYyBhbmQgc2NpZW5jZSBoYXZlIGdvbmUgYXdyeSwgYW5kIHRoZSB1bmNoZWNrZWQgbmF0dXJlIG9mIGV4cGVyaW1lbnRhdGlvbiBoYXMgdGFrZW4gaXRzIHRvbGwuIEhvd2V2ZXIsIFphdW4ncyBsZW5pZW50IHJlc3RyaWN0aW9ucyBhbGxvdyB0aGVpciByZXNlYXJjaGVycyBhbmQgaW52ZW50b3JzIHRoZSBsZWV3YXkgdG8gcHVzaCB0aGUgYm91bmRzIG9mIHNjaWVuY2UgYXQgYW4gLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJicmFuZFwiLFxuICAgIFwia2V5XCI6IFwiNjNcIixcbiAgICBcIm5hbWVcIjogXCJCcmFuZFwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgQnVybmluZyBWZW5nZWFuY2VcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MDcuNjgsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNzYsXG4gICAgICBcIm1wXCI6IDM3NS42LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQyLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQwLFxuICAgICAgXCJhcm1vclwiOiAyMS44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1NTAsXG4gICAgICBcImhwcmVnZW5cIjogNS40MixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogOC4wMDUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjYsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1Ny4wNCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAxLjM2XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0JyYW5kLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDk2LFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiSW4gYSBmYXJhd2F5IHBsYWNlIGtub3duIGFzIExva2ZhciB0aGVyZSB3YXMgYSBzZWFmYXJpbmcgbWFyYXVkZXIgY2FsbGVkIEtlZ2FuIFJvZGhlLiBBcyB3YXMgaGlzIHBlb3BsZSdzIHdheSwgS2VnYW4gc2FpbGVkIGZhciBhbmQgd2lkZSB3aXRoIGhpcyBmZWxsb3dzLCBzdGVhbGluZyB0cmVhc3VyZXMgZnJvbSB0aG9zZSB1bmx1Y2t5IGVub3VnaCB0byBjYXRjaCB0aGVpciBhdHRlbnRpb24uIFRvIHNvbWUsIGhlIHdhcyBhIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiYnJhdW1cIixcbiAgICBcImtleVwiOiBcIjIwMVwiLFxuICAgIFwibmFtZVwiOiBcIkJyYXVtXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBIZWFydCBvZiB0aGUgRnJlbGpvcmRcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJTdXBwb3J0XCIsXG4gICAgICBcIlRhbmtcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU3Ni4xNixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NyxcbiAgICAgIFwibXBcIjogMzEwLjYsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDUsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDI2LjcyLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDQuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDguMTgsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAxLFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NS4zNzYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMixcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDMsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMy41XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0JyYXVtLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDE0NCxcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnV291bGQgeW91IGxpa2UgYSBiZWR0aW1lIHN0b3J5PycnPGJyPjxicj4nJ0dyYW5kbWEsIEknbSB0b28gb2xkIGZvciB0aGF0LicnPGJyPjxicj4nJ1lvdSdyZSBuZXZlciB0b28gb2xkIHRvIGJlIHRvbGQgYSBzdG9yeS4nJzxicj48YnI+VGhlIGdpcmwgcmVsdWN0YW50bHkgY3Jhd2xzIGludG8gYmVkIGFuZCB3YWl0cywga25vd2luZyBzaGUgd29uJ3Qgd2luIHRoaXMgYmF0dGxlLiBBIGJpdHRlciB3aW5kIGhvd2xzIG91dHNpZGUsIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiY2FpdGx5blwiLFxuICAgIFwia2V5XCI6IFwiNTFcIixcbiAgICBcIm5hbWVcIjogXCJDYWl0bHluXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBTaGVyaWZmIG9mIFBpbHRvdmVyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFya3NtYW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUyNC40LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgwLFxuICAgICAgXCJtcFwiOiAzMTMuNyxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAzNSxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMyNSxcbiAgICAgIFwiYXJtb3JcIjogMjIuODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNjUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDUuNjcsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuNCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1My42NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMi4xOCxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMC4xLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDRcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vQ2FpdGx5bi5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiAxOTIsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ0dvIGFoZWFkLCBydW4uIEknbGwgZ2l2ZSB5b3UgYSBmaXZlIG1pbnV0ZSBoZWFkIHN0YXJ0LicnPGJyPjxicj5PbmUgb2YgdGhlIHJlYXNvbnMgUGlsdG92ZXIgaXMga25vd24gYXMgdGhlIENpdHkgb2YgUHJvZ3Jlc3MgaXMgYmVjYXVzZSBpdCBoYXMgYW4gZXh0cmFvcmRpbmFyaWx5IGxvdyBjcmltZSByYXRlLiBUaGlzIGhhc24ndCBhbHdheXMgYmVlbiB0aGUgY2FzZTsgYnJpZ2FuZHMgYW5kIHRoaWV2ZXMgb2YgYWxsIHNvcnRzIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiY2Fzc2lvcGVpYVwiLFxuICAgIFwia2V5XCI6IFwiNjlcIixcbiAgICBcIm5hbWVcIjogXCJDYXNzaW9wZWlhXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBTZXJwZW50J3MgRW1icmFjZVwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUyNSxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA3NSxcbiAgICAgIFwibXBcIjogMzc1LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDYwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzI4LFxuICAgICAgXCJhcm1vclwiOiAyNSxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1NTAsXG4gICAgICBcImhwcmVnZW5cIjogNS41LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1MyxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDM0LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDEuNVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9DYXNzaW9wZWlhLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDI0MCxcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkNhc3Npb3BlaWEgaXMgYSB0ZXJyaWZ5aW5nIGNyZWF0dXJlIC0gaGFsZiB3b21hbiwgaGFsZiBzbmFrZSAtIHdob3NlIHNsaWdodGVzdCBnbGFuY2UgYnJpbmdzIGRlYXRoLiBUaGUgeW91bmdlc3QgZGF1Z2h0ZXIgb2Ygb25lIG9mIE5veHVzJyBtb3N0IGluZmx1ZW50aWFsIGZhbWlsaWVzLCBzaGUgd2FzIG9uY2UgYSBiZWF1dGlmdWwgYW5kIGN1bm5pbmcgdGVtcHRyZXNzIGNhcGFibGUgb2YgbWFuaXB1bGF0aW5nIHRoZSBoYXJkZXN0IC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiY2hvZ2F0aFwiLFxuICAgIFwia2V5XCI6IFwiMzFcIixcbiAgICBcIm5hbWVcIjogXCJDaG8nR2F0aFwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgVGVycm9yIG9mIHRoZSBWb2lkXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiVGFua1wiLFxuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NzQuNCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MCxcbiAgICAgIFwibXBcIjogMjcyLjIsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDUsXG4gICAgICBcImFybW9yXCI6IDI4Ljg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDguOTI1LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC44NSxcbiAgICAgIFwibXByZWdlblwiOiA3LjIwNSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNDUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA2MS4xNTYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDQuMixcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAxLjQ0XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0Nob2dhdGgucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogMjg4LFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGhlcmUgaXMgYSBwbGFjZSBiZXR3ZWVuIGRpbWVuc2lvbnMsIGJldHdlZW4gd29ybGRzLiBUbyBzb21lIGl0IGlzIGtub3duIGFzIHRoZSBPdXRzaWRlLCB0byBvdGhlcnMgaXQgaXMgdGhlIFVua25vd24uIFRvIHRob3NlIHRoYXQgdHJ1bHkga25vdywgaG93ZXZlciwgaXQgaXMgY2FsbGVkIHRoZSBWb2lkLiBEZXNwaXRlIGl0cyBuYW1lLCB0aGUgVm9pZCBpcyBub3QgYW4gZW1wdHkgcGxhY2UsIGJ1dCByYXRoZXIgdGhlIGhvbWUgb2YgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJjb3JraVwiLFxuICAgIFwia2V5XCI6IFwiNDJcIixcbiAgICBcIm5hbWVcIjogXCJDb3JraVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgRGFyaW5nIEJvbWJhcmRpZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYXJrc21hblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTEyLjc2LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgyLFxuICAgICAgXCJtcFwiOiAzNTAuMTYsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMzQsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMjUsXG4gICAgICBcImFybW9yXCI6IDIzLjM4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDU1MCxcbiAgICAgIFwiaHByZWdlblwiOiA1LjQyLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA3LjQyLFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi4zXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0NvcmtpLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDMzNixcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIldoZW4gSGVpbWVyZGluZ2VyIGFuZCBoaXMgeW9yZGxlIGNvbGxlYWd1ZXMgbWlncmF0ZWQgdG8gUGlsdG92ZXIsIHRoZXkgZW1icmFjZWQgc2NpZW5jZSBhcyBhIHdheSBvZiBsaWZlLCBhbmQgdGhleSBpbW1lZGlhdGVseSBtYWRlIHNldmVyYWwgZ3JvdW5kYnJlYWtpbmcgY29udHJpYnV0aW9ucyB0byB0aGUgdGVjaG1hdHVyZ2ljYWwgY29tbXVuaXR5LiBXaGF0IHlvcmRsZXMgbGFjayBpbiBzdGF0dXJlLCB0aGV5IG1ha2UgdXAgZm9yIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZGFyaXVzXCIsXG4gICAgXCJrZXlcIjogXCIxMjJcIixcbiAgICBcIm5hbWVcIjogXCJEYXJpdXNcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEhhbmQgb2YgTm94dXNcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIlRhbmtcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU4Mi4yNCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiAxMDAsXG4gICAgICBcIm1wXCI6IDI2MyxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAzNy41LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQwLFxuICAgICAgXCJhcm1vclwiOiAzMCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiA0LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxNzUsXG4gICAgICBcImhwcmVnZW5cIjogOS44NDUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjk1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYuNTg1LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC4zNSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiA1LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDFcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vRGFyaXVzLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDM4NCxcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRoZXJlIGlzIG5vIGdyZWF0ZXIgc3ltYm9sIG9mIE5veGlhbiBtaWdodCB0aGFuIERhcml1cywgdGhlIG5hdGlvbidzIG1vc3QgZmVhcmVkIGFuZCBiYXR0bGUtaGFyZGVuZWQgd2Fycmlvci4gT3JwaGFuZWQgYXQgYSB5b3VuZyBhZ2UsIERhcml1cyBoYWQgdG8gZmlnaHQgdG8ga2VlcCBoaW1zZWxmIGFuZCBoaXMgeW91bmdlciBicm90aGVyIGFsaXZlLiBCeSB0aGUgdGltZSBoZSBqb2luZWQgdGhlIG1pbGl0YXJ5LCBoZSBoYWQgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJkaWFuYVwiLFxuICAgIFwia2V5XCI6IFwiMTMxXCIsXG4gICAgXCJuYW1lXCI6IFwiRGlhbmFcIixcbiAgICBcInRpdGxlXCI6IFwiU2Nvcm4gb2YgdGhlIE1vb25cIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU4OS4yLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDkwLFxuICAgICAgXCJtcFwiOiAyOTcuMixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0NSxcbiAgICAgIFwiYXJtb3JcIjogMjYuMDQ4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNixcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDcuNDI1LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC44NSxcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTMuMDQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi4yNVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9EaWFuYS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiA0MzIsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ0kgYW0gdGhlIGxpZ2h0IGNvdXJzaW5nIGluIHRoZSBzb3VsIG9mIHRoZSBtb29uLicnPGJyPjxicj5CZWFyaW5nIGhlciBjcmVzY2VudCBtb29uYmxhZGUsIERpYW5hIGZpZ2h0cyBhcyBhIHdhcnJpb3Igb2YgdGhlIEx1bmFyaSwgYSBmYWl0aCBhbGwgYnV0IHF1YXNoZWQgaW4gdGhlIGxhbmRzIGFyb3VuZCBNb3VudCBUYXJnb24uIENsYWQgaW4gc2hpbW1lcmluZyBhcm1vciB0aGUgY29sb3Igb2Ygd2ludGVyIHNub3cgYXQgbmlnaHQsIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZHJhdmVuXCIsXG4gICAgXCJrZXlcIjogXCIxMTlcIixcbiAgICBcIm5hbWVcIjogXCJEcmF2ZW5cIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEdsb3Jpb3VzIEV4ZWN1dGlvbmVyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFya3NtYW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU1Ny43NixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MixcbiAgICAgIFwibXBcIjogMzYwLjU2LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDM5LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzMwLFxuICAgICAgXCJhcm1vclwiOiAyNS41NDQsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy4zLFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDYuMTc1LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC43LFxuICAgICAgXCJtcHJlZ2VuXCI6IDguMDQsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjY1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTUuOCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMi45MSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDgsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi43XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0RyYXZlbi5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiAwLFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVW5saWtlIGhpcyBicm90aGVyIERhcml1cywgdmljdG9yeSBpbiBiYXR0bGUgd2FzIG5ldmVyIGVub3VnaCBmb3IgRHJhdmVuLiBIZSBjcmF2ZWQgcmVjb2duaXRpb24sIGFjY2xhaW0sIGFuZCBnbG9yeS4gSGUgZmlyc3Qgc291Z2h0IGdyZWF0bmVzcyBpbiB0aGUgTm94aWFuIG1pbGl0YXJ5LCBidXQgaGlzIGZsYWlyIGZvciB0aGUgZHJhbWF0aWMgd2VudCBzZXZlcmVseSB1bmRlcmFwcHJlY2lhdGVkLiBUaGlyc3RpbmcgZm9yIGEgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJkcm11bmRvXCIsXG4gICAgXCJrZXlcIjogXCIzNlwiLFxuICAgIFwibmFtZVwiOiBcIkRyLiBNdW5kb1wiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgTWFkbWFuIG9mIFphdW5cIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIlRhbmtcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU4Mi41MixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4OSxcbiAgICAgIFwibXBcIjogMCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQ1LFxuICAgICAgXCJhcm1vclwiOiAyNi44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA3Ljc2LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC43NSxcbiAgICAgIFwibXByZWdlblwiOiAwLFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDYxLjI3LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuOFxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9Eck11bmRvLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQ4LFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydCZXdhcmUgdGhlIE1hZG1hbiBvZiBaYXVuLiBJbiBoaXMgZXllcywgeW91IGFyZSBhbHJlYWR5IGRlYWQnJzxicj48YnI+SXQgaXMgc2FpZCB0aGF0IHRoZSBtYW4gbm93IGtub3duIGFzIERyLiBNdW5kbyB3YXMgYm9ybiB3aXRob3V0IGFueSBzb3J0IG9mIGNvbnNjaWVuY2UuIEluc3RlYWQsIGhlIGhhZCBhbiB1bnF1ZW5jaGFibGUgZGVzaXJlIHRvIGluZmxpY3QgcGFpbiB0aHJvdWdoIGV4cGVyaW1lbnRhdGlvbi4gQnkgdGhlIHRpbWUgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJla2tvXCIsXG4gICAgXCJrZXlcIjogXCIyNDVcIixcbiAgICBcIm5hbWVcIjogXCJFa2tvXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBCb3kgV2hvIFNoYXR0ZXJlZCBUaW1lXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiQXNzYXNzaW5cIixcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTgwLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgwLFxuICAgICAgXCJtcFwiOiAyODAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNTAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDAsXG4gICAgICBcImFybW9yXCI6IDI3LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuOSxcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTUsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMy4zXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0Vra28ucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogOTYsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJBIHByb2RpZ3kgZnJvbSB0aGUgcm91Z2ggc3RyZWV0cyBvZiBaYXVuLCBFa2tvIG1hbmlwdWxhdGVzIHRpbWUgdG8gc3BpbiBhbnkgc2l0dWF0aW9uIHRvIGhpcyBhZHZhbnRhZ2UuIFVzaW5nIGhpcyBvd24gaW52ZW50aW9uLCB0aGUgWmVyby1Ecml2ZSwgaGUgZXhwbG9yZXMgdGhlIGJyYW5jaGluZyBwb3NzaWJpbGl0aWVzIG9mIHJlYWxpdHkuIEFzIHdlbGwgYXMgZXhwZXJpbWVudGluZyB3aXRoIG11bHRpLWRpbWVuc2lvbmFsIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZWxpc2VcIixcbiAgICBcImtleVwiOiBcIjYwXCIsXG4gICAgXCJuYW1lXCI6IFwiRWxpc2VcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFNwaWRlciBRdWVlblwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIixcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTI5LjQsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODAsXG4gICAgICBcIm1wXCI6IDMyNCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA1MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMyNSxcbiAgICAgIFwiYXJtb3JcIjogMjIuMTI4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuMzUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1NTAsXG4gICAgICBcImhwcmVnZW5cIjogNS43MDUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjYsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUwLjU0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDEuNzVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vRWxpc2UucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogMTQ0LFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydCZWF1dHkgaXMgcG93ZXIgdG9vLCBhbmQgY2FuIHN0cmlrZSBzd2lmdGVyIHRoYW4gYW55IHN3b3JkLicnPGJyPjxicj5FbGlzZSBpcyBhIGRlYWRseSBwcmVkYXRvciB3aG8gZHdlbGxzIGluIGEgc2h1dHRlcmVkLCBsaWdodGxlc3MgcGFsYWNlLCBkZWVwIGluIHRoZSBJbW1vcnRhbCBCYXN0aW9uIG9mIE5veHVzLiBPbmNlIHNoZSB3YXMgbW9ydGFsLCB0aGUgbWlzdHJlc3Mgb2YgYSBvbmNlLXBvd2VyZnVsIGhvdXNlLCBidXQgdGhlIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZXZlbHlublwiLFxuICAgIFwia2V5XCI6IFwiMjhcIixcbiAgICBcIm5hbWVcIjogXCJFdmVseW5uXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBXaWRvd21ha2VyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiQXNzYXNzaW5cIixcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTMxLjIsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTAsXG4gICAgICBcIm1wXCI6IDMxNS42LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQyLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQwLFxuICAgICAgXCJhcm1vclwiOiAyNi41LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuOCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDkuODIsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDguMTA1LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC42LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTMuODgsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzLjZcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vRXZlbHlubi5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiAxOTIsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJTd2lmdCBhbmQgbGV0aGFsLCBFdmVseW5uIGlzIG9uZSBvZiB0aGUgbW9zdCBkZWFkbHkgLSBhbmQgZXhwZW5zaXZlIC0gYXNzYXNzaW5zIGluIGFsbCBvZiBSdW5ldGVycmEuIEFibGUgdG8gbWVyZ2Ugd2l0aCB0aGUgc2hhZG93cyBhdCB3aWxsLCBzaGUgcGF0aWVudGx5IHN0YWxrcyBoZXIgcHJleSwgd2FpdGluZyBmb3IgdGhlIHJpZ2h0IG1vbWVudCB0byBzdHJpa2UuIFdoaWxlIEV2ZWx5bm4gaXMgY2xlYXJseSBub3QgZW50aXJlbHkgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJlenJlYWxcIixcbiAgICBcImtleVwiOiBcIjgxXCIsXG4gICAgXCJuYW1lXCI6IFwiRXpyZWFsXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBQcm9kaWdhbCBFeHBsb3JlclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hcmtzbWFuXCIsXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDQ4NC40LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgwLFxuICAgICAgXCJtcFwiOiAzNjAuNixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MixcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMyNSxcbiAgICAgIFwiYXJtb3JcIjogMjEuODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDYuNDIsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDguMDksXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjY1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTUuNjYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDIuNDEsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi44XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0V6cmVhbC5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiAyNDAsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUaGUgaW50cmVwaWQgeW91bmcgYWR2ZW50dXJlciBFenJlYWwgaGFzIGV4cGxvcmVkIHNvbWUgb2YgdGhlIG1vc3QgcmVtb3RlIGFuZCBhYmFuZG9uZWQgbG9jYXRpb25zIG9uIFJ1bmV0ZXJyYS4gRHVyaW5nIGFuIGV4cGVkaXRpb24gdG8gdGhlIGJ1cmllZCBydWlucyBvZiBhbmNpZW50IFNodXJpbWEsIGhlIHJlY292ZXJlZCBhbiBhbXVsZXQgb2YgaW5jcmVkaWJsZSBteXN0aWNhbCBwb3dlci4gTGlrZWx5IGNvbnN0cnVjdGVkIHRvIGJlIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZmlkZGxlc3RpY2tzXCIsXG4gICAgXCJrZXlcIjogXCI5XCIsXG4gICAgXCJuYW1lXCI6IFwiRmlkZGxlc3RpY2tzXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBIYXJiaW5nZXIgb2YgRG9vbVwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIixcbiAgICAgIFwiU3VwcG9ydFwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTI0LjQsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODAsXG4gICAgICBcIm1wXCI6IDQwMC4xMixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA1NixcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMjAuODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNDgwLFxuICAgICAgXCJocHJlZ2VuXCI6IDUuNjA1LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA0OC4zNixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMi42MjUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi4xMVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9GaWRkbGVTdGlja3MucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogMjg4LFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiRm9yIG5lYXJseSB0d2VudHkgeWVhcnMsIEZpZGRsZXN0aWNrcyBoYXMgc3Rvb2QgYWxvbmUgaW4gdGhlIGVhc3Rlcm5tb3N0IHN1bW1vbmluZyBjaGFtYmVyIG9mIHRoZSBJbnN0aXR1dGUgb2YgV2FyLiBPbmx5IHRoZSBidXJuaW5nIGVtZXJhbGQgbGlnaHQgb2YgaGlzIHVuZWFydGhseSBnYXplIHBpZXJjZXMgdGhlIG11c3R5IGRhcmtuZXNzIG9mIGhpcyBkdXN0LWNvdmVyZWQgaG9tZS4gSXQgaXMgaGVyZSB0aGF0IHRoZSBIYXJiaW5nZXIgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJmaW9yYVwiLFxuICAgIFwia2V5XCI6IFwiMTE0XCIsXG4gICAgXCJuYW1lXCI6IFwiRmlvcmFcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEdyYW5kIER1ZWxpc3RcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIkFzc2Fzc2luXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NTAsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODUsXG4gICAgICBcIm1wXCI6IDMwMCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0NSxcbiAgICAgIFwiYXJtb3JcIjogMjQsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxNTAsXG4gICAgICBcImhwcmVnZW5cIjogOC4yNSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogOCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNyxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDYwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMy4yXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0Zpb3JhLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDMzNixcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnSSBoYXZlIGNvbWUgdG8ga2lsbCB5b3UgZm9yIHRoZSBzYWtlIG9mIGhvbm9yLiBBbmQgdGhvdWdoIHlvdSBwb3NzZXNzIG5vbmUsIHN0aWxsIHlvdSBkaWUuJyc8YnI+VGhlIG1vc3QgZmVhcmVkIGR1ZWxpc3QgaW4gYWxsIFZhbG9yYW4sIEZpb3JhIGlzIGFzIHJlbm93bmVkIGZvciBoZXIgYnJ1c3F1ZSBtYW5uZXIgYW5kIGN1bm5pbmcgbWluZCBhcyBzaGUgaXMgZm9yIHRoZSBzcGVlZCBvZiBoZXIgYmx1ZXN0ZWVsIHJhcGllci4gLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJmaXp6XCIsXG4gICAgXCJrZXlcIjogXCIxMDVcIixcbiAgICBcIm5hbWVcIjogXCJGaXp6XCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBUaWRhbCBUcmlja3N0ZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJBc3Nhc3NpblwiLFxuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NTguNDgsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODYsXG4gICAgICBcIm1wXCI6IDMxNy4yLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDM3LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAyMi40MTIsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy40LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxNzUsXG4gICAgICBcImhwcmVnZW5cIjogOC4xNzUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjcsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU4LjA0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzLjFcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vRml6ei5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiAzODQsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJDZW50dXJpZXMgYWdvLCBhbiBhbmNpZW50IHdhdGVyLWR3ZWxsaW5nIHJhY2UgYnVpbHQgYSBoaWRkZW4gY2l0eSBiZW5lYXRoIGEgbW91bnRhaW4gaW4gdGhlIHNlYS4gVGhvdWdoIHRoZXNlIGNyZWF0dXJlcyBoYWQgdGhlaXIgZW5lbWllcywgdGhlIGNpdHkgd2FzIGFuIGltcGVuZXRyYWJsZSBmb3J0cmVzcywgYW5kLCBpbiB0aGUgc2FmZXR5IGl0IHByb3ZpZGVkLCB0aGV5IGdyZXcgY29tcGxhY2VudC4gRml6eiwgaG93ZXZlciwgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJnYWxpb1wiLFxuICAgIFwia2V5XCI6IFwiM1wiLFxuICAgIFwibmFtZVwiOiBcIkdhbGlvXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBTZW50aW5lbCdzIFNvcnJvd1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlRhbmtcIixcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTc3LjgsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODUsXG4gICAgICBcIm1wXCI6IDM2OSxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0NyxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMjYuODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOC43MSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNzUsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDYxLjk3LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjM3NSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDIsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMS4yXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0dhbGlvLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQzMixcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnVGhlcmUgaXMgbm8gc3VjaCB0aGluZyBhcyByZWRlbXB0aW9uLiBPbmx5IHBlbmFuY2UuJyc8YnI+PGJyPkxvbmcgYmVmb3JlIHRoZSByZWd1bGF0aW9uIG9mIG1hZ2ljLCBtYWdlcyBleHBlcmltZW50ZWQgd2l0aCB0aGUgY3JlYXRpb24gb2YgYXJ0aWZpY2lhbCBsaWZlLiBOb3cgZm9yYmlkZGVuLCBpbnN0aWxsaW5nIGdvbGVtcyB3aXRoIHJlYXNvbiB3YXMgb25jZSBub3Qgc28gdW5jb21tb24gYSBwcmFjdGljZSBhbW9uZ3N0IHRoZSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImdhbmdwbGFua1wiLFxuICAgIFwia2V5XCI6IFwiNDFcIixcbiAgICBcIm5hbWVcIjogXCJHYW5ncGxhbmtcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFNhbHR3YXRlciBTY291cmdlXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTQwLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgyLFxuICAgICAgXCJtcFwiOiAyODIsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDUsXG4gICAgICBcImFybW9yXCI6IDI2LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA2LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuNSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNyxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDMuMlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9HYW5ncGxhbmsucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogMCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydJIHdhcyBjdXR0aW5nIHRocm9hdHMgYW5kIHNpbmtpbmcgTm94aWFuIHdhciBnYWxsZXlzIHdoZW4geW91IHdlcmUgc3RpbGwgcGlzc2luZyB5b3VyIGJyaXRjaGVzLCBib3kuIFlvdSBkb24ndCB3YW50IHRvIHRha2UgbWUgb24uJyc8YnI+PGJyPkFzIHVucHJlZGljdGFibGUgYXMgaGUgaXMgYnJ1dGFsLCB0aGUgZGV0aHJvbmVkIHJlYXZlciBraW5nIGtub3duIGFzIEdhbmdwbGFuayBpcyBmZWFyZWQgZmFyIGFuZCB3aWRlLiBXaGVyZSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImdhcmVuXCIsXG4gICAgXCJrZXlcIjogXCI4NlwiLFxuICAgIFwibmFtZVwiOiBcIkdhcmVuXCIsXG4gICAgXCJ0aXRsZVwiOiBcIlRoZSBNaWdodCBvZiBEZW1hY2lhXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJUYW5rXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA2MTYuMjgsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODQuMjUsXG4gICAgICBcIm1wXCI6IDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0MCxcbiAgICAgIFwiYXJtb3JcIjogMjcuNTM2LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDE3NSxcbiAgICAgIFwiaHByZWdlblwiOiA3Ljg0LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41LFxuICAgICAgXCJtcHJlZ2VuXCI6IDAsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTcuODgsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDQuNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjlcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vR2FyZW4ucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogNDgsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRocm91Z2hvdXQgVmFsb3JhbiwgdGhlIHJlc29sdmUgb2YgRGVtYWNpYSdzIG1pbGl0YXJ5IGlzIGFsdGVybmF0ZWx5IGNlbGVicmF0ZWQgb3IgZGVzcGlzZWQsIGJ1dCBhbHdheXMgcmVzcGVjdGVkLiBUaGVpciAnJ3plcm8gdG9sZXJhbmNlJycgbW9yYWwgY29kZSBpcyBzdHJpY3RseSB1cGhlbGQgYnkgY2l2aWxpYW5zIGFuZCBzb2xkaWVycyBhbGlrZS4gSW4gY29tYmF0LCB0aGlzIG1lYW5zIERlbWFjaWFuIHRyb29wcyBtYXkgbm90IC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZ25hclwiLFxuICAgIFwia2V5XCI6IFwiMTUwXCIsXG4gICAgXCJuYW1lXCI6IFwiR25hclwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgTWlzc2luZyBMaW5rXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJUYW5rXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NDAsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNjUsXG4gICAgICBcIm1wXCI6IDEwMCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzI1LFxuICAgICAgXCJhcm1vclwiOiAyMyxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAyLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxNzUsXG4gICAgICBcImhwcmVnZW5cIjogMi41LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41LFxuICAgICAgXCJtcHJlZ2VuXCI6IDAsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTEsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogNlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9HbmFyLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDk2LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUaGUganVuZ2xlIGRvZXMgbm90IGZvcmdpdmUgYmxpbmRuZXNzLiBFdmVyeSBicm9rZW4gYnJhbmNoIHRlbGxzIGEgc3RvcnkuPGJyPjxicj5JJ3ZlIGh1bnRlZCBldmVyeSBjcmVhdHVyZSB0aGlzIGp1bmdsZSBoYXMgdG8gb2ZmZXIuIEkgd2FzIGNlcnRhaW4gdGhlcmUgd2VyZSBubyBjaGFsbGVuZ2VzIGxlZnQgaGVyZSwgYnV0IG5vdyB0aGVyZSBpcyBzb21ldGhpbmcgbmV3LiBFYWNoIHRyYWNrIGlzIHRoZSBzaXplIG9mIGEgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJncmFnYXNcIixcbiAgICBcImtleVwiOiBcIjc5XCIsXG4gICAgXCJuYW1lXCI6IFwiR3JhZ2FzXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBSYWJibGUgUm91c2VyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1ODMuNTIsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODksXG4gICAgICBcIm1wXCI6IDQwMCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0NyxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzMCxcbiAgICAgIFwiYXJtb3JcIjogMjYuMDQ4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNixcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDUuNSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNSxcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNjEuMzgsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDQsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi4wNVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9HcmFnYXMucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogMTQ0LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUaGUgb25seSB0aGluZyBtb3JlIGltcG9ydGFudCB0byBHcmFnYXMgdGhhbiBmaWdodGluZyBpcyBkcmlua2luZy4gSGlzIHVucXVlbmNoYWJsZSB0aGlyc3QgZm9yIHN0cm9uZ2VyIGFsZSBoYXMgbGVkIGhpbSBpbiBzZWFyY2ggb2YgdGhlIG1vc3QgcG90ZW50IGFuZCB1bmNvbnZlbnRpb25hbCBpbmdyZWRpZW50cyB0byB0b3NzIGluIGhpcyBzdGlsbC4gSW1wdWxzaXZlIGFuZCB1bnByZWRpY3RhYmxlLCB0aGlzIHJvd2R5IGNhcm91c2VyIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZ3JhdmVzXCIsXG4gICAgXCJrZXlcIjogXCIxMDRcIixcbiAgICBcIm5hbWVcIjogXCJHcmF2ZXNcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIE91dGxhd1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hcmtzbWFuXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NTEuMTIsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODQsXG4gICAgICBcIm1wXCI6IDMyMi4yLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQwLFxuICAgICAgXCJhcm1vclwiOiAyNC4zNzYsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy40LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNDI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDYuNjc1LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC43LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuOSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNyxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDYwLjgzLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAyLjQxLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLjMsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi42XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0dyYXZlcy5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiAxOTIsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIk1hbGNvbG0gR3JhdmVzIGlzIGEgd2FudGVkIG1hbiBpbiBldmVyeSByZWFsbSwgY2l0eSBhbmQgZW1waXJlIGhlIGhhcyB2aXNpdGVkLiBUb3VnaCwgc3Ryb25nLXdpbGxlZCwgYW5kIGFib3ZlIGFsbCwgcmVsZW50bGVzcywgdGhyb3VnaCBoaXMgbGlmZSBvZiBjcmltZSBoZSBoYXMgYW1hc3NlZCAodGhlbiBpbnZhcmlhYmx5IGxvc3QpIGEgc21hbGwgZm9ydHVuZS5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImhlY2FyaW1cIixcbiAgICBcImtleVwiOiBcIjEyMFwiLFxuICAgIFwibmFtZVwiOiBcIkhlY2FyaW1cIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFNoYWRvdyBvZiBXYXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIlRhbmtcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU4MCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5MCxcbiAgICAgIFwibXBcIjogMjc3LjIsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDUsXG4gICAgICBcImFybW9yXCI6IDI2LjcyLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDQsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDE3NSxcbiAgICAgIFwiaHByZWdlblwiOiA3LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC43NSxcbiAgICAgIFwibXByZWdlblwiOiA2LjUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjYsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1OCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4yLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNjcyLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuNVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9IZWNhcmltLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDI0MCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydCcmVhayB0aGVpciByYW5rcyBhbmQgcmlkZSB0aGVtIGRvd24gd2l0aG91dCBtZXJjeS4gQ3J1c2ggdGhlIGxpdmluZyBhbmQgZmVhc3Qgb24gdGhlaXIgdGVycm9yLicnPGJyPjxicj5IZWNhcmltIGlzIGFuIGFybW9yZWQgY29sb3NzdXMgd2hvIGNoYXJnZXMgZnJvbSB0aGUgU2hhZG93IElzbGVzIGF0IHRoZSBoZWFkIG9mIGEgZGVhdGhseSBob3N0IG9mIHNwZWN0cmFsIGhvcnNlbWVuIHRvIGh1bnQgdGhlIGxpdmluZy4gQSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImhlaW1lcmRpbmdlclwiLFxuICAgIFwia2V5XCI6IFwiNzRcIixcbiAgICBcIm5hbWVcIjogXCJIZWltZXJkaW5nZXJcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFJldmVyZWQgSW52ZW50b3JcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCIsXG4gICAgICBcIlN1cHBvcnRcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDQ3NixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA3NSxcbiAgICAgIFwibXBcIjogMzA3LjIsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDAsXG4gICAgICBcImFybW9yXCI6IDE5LjA0LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1NTAsXG4gICAgICBcImhwcmVnZW5cIjogMTEuMDA1LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMS43NSxcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTUuNTM2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAyLjcsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMS4zNlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9IZWltZXJkaW5nZXIucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogMjg4LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJGcm9tIHRoZSBKb3VybmFsIG9mIFByb2Zlc3NvciBDZWNpbCBCLiBIZWltZXJkaW5nZXI8YnI+PGJyPjEwLjE0PGJyPjxicj4wOToxNTxicj48YnI+Q3VycmVudCBtZXRlb3JvbG9naWNhbCBjb25kaXRpb25zIGluIEJhbmRsZSBDaXR5IHNlZW0gb3B0aW1hbC4gQXRtb3NwaGVyaWMgcHJlc3N1cmUgaXMgaWRlYWwgZm9yIHRvZGF5J3MgZXhwZXJpbWVudHMhPGJyPjxicj5SdW5uaW5nIGEgZmlmdGggdHJpYWwgZm9yIG15IC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiaWxsYW9pXCIsXG4gICAgXCJrZXlcIjogXCI0MjBcIixcbiAgICBcIm5hbWVcIjogXCJJbGxhb2lcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEtyYWtlbiBQcmllc3Rlc3NcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIlRhbmtcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU4NS42LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDk1LFxuICAgICAgXCJtcFwiOiAzMDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDAsXG4gICAgICBcImFybW9yXCI6IDI2LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuOCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDkuNSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwibXByZWdlblwiOiA3LjUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjc1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNjAsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi41XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0lsbGFvaS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiAzMzYsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnSSdtIG5vdCBiaWcgb24gc2VybW9ucy4gQnJva2VuIGJvbmVzIHRlYWNoIGJldHRlciBsZXNzb25zLicnPGJyPklsbGFvaSdzIHBvd2VyZnVsIHBoeXNpcXVlIGlzIGR3YXJmZWQgb25seSBieSBoZXIgaW5kb21pdGFibGUgZmFpdGguIEFzIHRoZSBwcm9waGV0IG9mIHRoZSBHcmVhdCBLcmFrZW4sIHNoZSB1c2VzIGEgaHVnZSwgZ29sZGVuIGlkb2wgdG8gcmlwIGhlciBmb2VzJyBzcGlyaXRzIGZyb20gdGhlaXIgYm9kaWVzIGFuZCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImlyZWxpYVwiLFxuICAgIFwia2V5XCI6IFwiMzlcIixcbiAgICBcIm5hbWVcIjogXCJJcmVsaWFcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFdpbGwgb2YgdGhlIEJsYWRlc1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiQXNzYXNzaW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDYwNy4yLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDkwLFxuICAgICAgXCJtcFwiOiAzMzguOCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAzMixcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0NSxcbiAgICAgIFwiYXJtb3JcIjogMjUuMyxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjc1LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOC41OSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNjUsXG4gICAgICBcIm1wcmVnZW5cIjogOC4xLFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC42NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDYxLjU0NCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4zLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNixcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzLjJcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vSXJlbGlhLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDM4NCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydUaGUgc3dvcmQgZmxvdXJpc2hlcywgYXMgdGhvdWdoIHBhaW50aW5nIHdpdGggYmxvb2QuJyc8YnI+PGJyPlRoZSBJb25pYW5zIGhhdmUgZGV2ZWxvcGVkIHNvbWUgb2YgdGhlIG1vc3QgYnJlYXRodGFraW5nIGFuZCBkZWFkbHkgbWFydGlhbCBhcnRzIGluIGFsbCBvZiBSdW5ldGVycmEgLSBqdXN0IG9uZSBtYW5pZmVzdGF0aW9uIG9mIHRoZWlyIHB1cnN1aXQgb2YgZW5saWdodGVubWVudC4gVGhlIG1vc3QgcmVtYXJrYWJsZSBibGFkZSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIml2ZXJuXCIsXG4gICAgXCJrZXlcIjogXCI0MjdcIixcbiAgICBcIm5hbWVcIjogXCJJdmVyblwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgR3JlZW4gRmF0aGVyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiU3VwcG9ydFwiLFxuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1ODAsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTAsXG4gICAgICBcIm1wXCI6IDQ1MCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA2MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzMCxcbiAgICAgIFwiYXJtb3JcIjogMjIsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogNi45LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC44NSxcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC43NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzLjRcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vSXZlcm4ucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjQucG5nXCIsXG4gICAgICBcInhcIjogOTYsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJJdmVybiBCcmFtYmxlZm9vdCwga25vd24gdG8gbWFueSBhcyB0aGUgR3JlZW4gRmF0aGVyLCBpcyBhIHBlY3VsaWFyIGhhbGYgbWFuLCBoYWxmIHRyZWUgd2hvIHJvYW1zIFJ1bmV0ZXJyYSdzIGZvcmVzdHMsIGN1bHRpdmF0aW5nIGxpZmUgZXZlcnl3aGVyZSBoZSBnb2VzLiBIZSBrbm93cyB0aGUgc2VjcmV0cyBvZiB0aGUgbmF0dXJhbCB3b3JsZCwgYW5kIGhvbGRzIGRlZXAgZnJpZW5kc2hpcHMgd2l0aCBhbGwgdGhpbmdzIHRoYXQgZ3JvdywuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImphbm5hXCIsXG4gICAgXCJrZXlcIjogXCI0MFwiLFxuICAgIFwibmFtZVwiOiBcIkphbm5hXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBTdG9ybSdzIEZ1cnlcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJTdXBwb3J0XCIsXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDQ4Ny4wNCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA3OCxcbiAgICAgIFwibXBcIjogNDA5LjUyLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDY0LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAxOS4zODQsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy44LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNDc1LFxuICAgICAgXCJocHJlZ2VuXCI6IDUuNDIsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDExLjUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjQsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1MS45NTYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDIuOTUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi42MVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9KYW5uYS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiA0MzIsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRoZXJlIGFyZSB0aG9zZSBzb3JjZXJlcnMgd2hvIGdpdmUgdGhlbXNlbHZlcyBvdmVyIHRvIHRoZSBwcmltYWwgcG93ZXJzIG9mIG5hdHVyZSwgZm9yZ29pbmcgdGhlIGxlYXJuZWQgcHJhY3RpY2Ugb2YgbWFnaWMuIFN1Y2ggYSBzb3JjZXJlc3MgaXMgSmFubmEsIHdobyBmaXJzdCBsZWFybmVkIG1hZ2ljIGFzIGFuIG9ycGhhbiBncm93aW5nIHVwIGFtaWRzdCB0aGUgY2hhb3MgdGhhdCBpcyB0aGUgY2l0eS1zdGF0ZSBvZiBaYXVuLiAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImphcnZhbml2XCIsXG4gICAgXCJrZXlcIjogXCI1OVwiLFxuICAgIFwibmFtZVwiOiBcIkphcnZhbiBJVlwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgRXhlbXBsYXIgb2YgRGVtYWNpYVwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlRhbmtcIixcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTcxLjIsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTAsXG4gICAgICBcIm1wXCI6IDMwMi4yLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQwLFxuICAgICAgXCJhcm1vclwiOiAyOSxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjYsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDE3NSxcbiAgICAgIFwiaHByZWdlblwiOiA4LjE3NSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNyxcbiAgICAgIFwibXByZWdlblwiOiA2Ljc1NSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNDUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NS43MTIsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuNCxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDUsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi41XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0phcnZhbklWLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDAsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ1RoZXJlIGlzIG9ubHkgb25lIHRydXRoLCBhbmQgeW91IHdpbGwgZmluZCBpdCBhdCB0aGUgcG9pbnQgb2YgbXkgbGFuY2UuJyc8YnI+PGJyPkFzIHRoZSByb3lhbCBmYW1pbHkgb2YgRGVtYWNpYSBmb3IgY2VudHVyaWVzLCBtZW1iZXJzIG9mIHRoZSBMaWdodHNoaWVsZCBsaW5lIGhhdmUgc3BlbnQgdGhlaXIgbGl2ZXMgd2FnaW5nIHdhciBhZ2FpbnN0IGFueSB3aG8gb3Bwb3NlZCBEZW1hY2lhbiBldGhpY3MuIEl0IGlzIHNhaWQgdGhhdCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImpheFwiLFxuICAgIFwia2V5XCI6IFwiMjRcIixcbiAgICBcIm5hbWVcIjogXCJKYXhcIixcbiAgICBcInRpdGxlXCI6IFwiR3JhbmRtYXN0ZXIgYXQgQXJtc1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiQXNzYXNzaW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU5Mi44LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg1LFxuICAgICAgXCJtcFwiOiAzMzguOCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAzMixcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM1MCxcbiAgICAgIFwiYXJtb3JcIjogMjcuMDQsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMyxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDguMzcsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuNTc1LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC43LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNjEuOTcsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMzc1LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wMixcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzLjRcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vSmF4LnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQ4LFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiSXQgaXMgc2VsZG9tIHRoZSBjYXNlIHdoZXJlIGEgY2hhbXBpb24gaXMgZGVmaW5lZCBieSBoaXMgYWN0aW9ucyBhZnRlciBqb2luaW5nIHRoZSBMZWFndWUgb2YgTGVnZW5kcyByYXRoZXIgdGhhbiBiZWZvcmUuIFN1Y2ggaXMgdGhlIGNhc2Ugd2l0aCBKYXgsIGZvciB3aG9tIHRoZSBhcmd1bWVudCBjb3VsZCBiZSBtYWRlIHRoYXQgaGUgaXMgdGhlIG1vc3QgcHJvbGlmaWMgdG91cm5hbWVudCBmaWdodGVyIGN1cnJlbnRseSBhdCB0aGUgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJqYXljZVwiLFxuICAgIFwia2V5XCI6IFwiMTI2XCIsXG4gICAgXCJuYW1lXCI6IFwiSmF5Y2VcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIERlZmVuZGVyIG9mIFRvbW9ycm93XCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJNYXJrc21hblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTcxLjIsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTAsXG4gICAgICBcIm1wXCI6IDM1Ny4yLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDM3LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAyMi4zOCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogNy4zNCxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTAuMzgsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDUsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogM1xuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9KYXljZS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiA5NixcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkFybWVkIHdpdGggd2l0LCBjaGFybSwgYW5kIGhpcyBzaWduYXR1cmUgdHJhbnNmb3JtaW5nIGhhbW1lciwgSmF5Y2UgbGl2ZXMgdG8gcHJvdGVjdCBoaXMgbmF0aXZlIFBpbHRvdmVyLiBMb25nIGJlZm9yZSBoaXMgbmF0aW9uIGNhbGxlZCBoaW0gYSBoZXJvLCBob3dldmVyLCBoZSB3YXMgYSBwcm9taXNpbmcgeW91bmcgaW52ZW50b3IuIFdoZW4gUGlsdG92ZXIgY29tbWlzc2lvbmVkIGhpbSB0byBzdHVkeSBhIHJhcmUgYXJjYW5lIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiamhpblwiLFxuICAgIFwia2V5XCI6IFwiMjAyXCIsXG4gICAgXCJuYW1lXCI6IFwiSmhpblwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgVmlydHVvc29cIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYXJrc21hblwiLFxuICAgICAgXCJBc3Nhc3NpblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTQwLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg1LFxuICAgICAgXCJtcFwiOiAzMDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNTAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzAsXG4gICAgICBcImFybW9yXCI6IDIwLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDU1MCxcbiAgICAgIFwiaHByZWdlblwiOiA2LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTMsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDQsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMFxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9KaGluLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDE0NCxcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnQXJ0IHJlcXVpcmVzIGEgY2VydGFpbi4uLmNydWVsdHkuJyc8YnI+PGJyPkpoaW4gaXMgYSBtZXRpY3Vsb3VzIGNyaW1pbmFsIHBzeWNob3BhdGggd2hvIGJlbGlldmVzIG11cmRlciBpcyBhcnQuIE9uY2UgYW4gSW9uaWFuIHByaXNvbmVyLCBidXQgZnJlZWQgYnkgc2hhZG93eSBlbGVtZW50cyB3aXRoaW4gSW9uaWEncyBydWxpbmcgY291bmNpbCwgdGhlIHNlcmlhbCBraWxsZXIgbm93IHdvcmtzIGFzIHRoZWlyIGNhYmFsJ3MgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJqaW54XCIsXG4gICAgXCJrZXlcIjogXCIyMjJcIixcbiAgICBcIm5hbWVcIjogXCJKaW54XCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBMb29zZSBDYW5ub25cIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYXJrc21hblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTE3Ljc2LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgyLFxuICAgICAgXCJtcFwiOiAyNDUuNixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0NSxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMyNSxcbiAgICAgIFwiYXJtb3JcIjogMjIuODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDUuODQsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjUsXG4gICAgICBcIm1wcmVnZW5cIjogNi42OCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDEsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1OC40NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMi40MSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAxXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0ppbngucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogMTkyLFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiSmlueCBsaXZlcyB0byB3cmVhayBoYXZvYyB3aXRob3V0IGEgdGhvdWdodCBmb3IgdGhlIGNvbnNlcXVlbmNlcywgbGVhdmluZyBhIHRyYWlsIG9mIG1heWhlbSBhbmQgcGFuaWMgaW4gaGVyIHdha2UuIEEgbWFuaWMgYW5kIGltcHVsc2l2ZSBjcmltaW5hbCwgc2hlIGRlc3Bpc2VzIG5vdGhpbmcgbW9yZSB0aGFuIGJvcmVkb20sIGFuZCBnbGVlZnVsbHkgYnJpbmdzIGhlciBvd24gdm9sYXRpbGUgYnJhbmQgb2YgcGFuZGVtb25pdW0gdG8gLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJrYWxpc3RhXCIsXG4gICAgXCJrZXlcIjogXCI0MjlcIixcbiAgICBcIm5hbWVcIjogXCJLYWxpc3RhXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBTcGVhciBvZiBWZW5nZWFuY2VcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYXJrc21hblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTE3Ljc2LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgzLFxuICAgICAgXCJtcFwiOiAyMzEuOCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAzNSxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMyNSxcbiAgICAgIFwiYXJtb3JcIjogMTkuMDEyLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDU1MCxcbiAgICAgIFwiaHByZWdlblwiOiA2LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA2LjMsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjQsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA2MyxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMi45LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vS2FsaXN0YS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiAyNDAsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ1doZW4gd3JvbmdlZCwgd2Ugc2VlayBqdXN0aWNlLiBXaGVuIGh1cnQsIHdlIHN0cmlrZSBiYWNrLiBXaGVuIGJldHJheWVkLCB0aGUgU3BlYXIgb2YgVmVuZ2VhbmNlIHN0cmlrZXMhJyc8YnI+PGJyPkEgc3BlY3RlciBvZiB3cmF0aCBhbmQgcmV0cmlidXRpb24sIEthbGlzdGEgaXMgdGhlIHVuZHlpbmcgc3Bpcml0IG9mIHZlbmdlYW5jZSwgYW4gYXJtb3JlZCBuaWdodG1hcmUgc3VtbW9uZWQgZnJvbSB0aGUgU2hhZG93IElzbGVzIHRvIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwia2FybWFcIixcbiAgICBcImtleVwiOiBcIjQzXCIsXG4gICAgXCJuYW1lXCI6IFwiS2FybWFcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEVubGlnaHRlbmVkIE9uZVwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIixcbiAgICAgIFwiU3VwcG9ydFwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTIyLjQ0LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgzLFxuICAgICAgXCJtcFwiOiAzNzQsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNTAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDIwLjM4NCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjgsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1MjUsXG4gICAgICBcImhwcmVnZW5cIjogNS42MixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogOC41LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTMuNTQ0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi4zXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0thcm1hLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDI4OCxcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkthcm1hIGlzIGEgd29tYW4gb2YgaW5kb21pdGFibGUgd2lsbCBhbmQgdW5ib3VuZCBzcGlyaXR1YWwgcG93ZXIuIFNoZSBpcyB0aGUgc291bCBvZiBJb25pYSBtYWRlIG1hbmlmZXN0IGFuZCBhbiBpbnNwaXJpbmcgcHJlc2VuY2Ugb24gdGhlIGJhdHRsZWZpZWxkLCBzaGllbGRpbmcgaGVyIGFsbGllcyBhbmQgdHVybmluZyBiYWNrIGhlciBmb2VzLiBBIHN0cm9uZyBsZWFkZXIgdG9ybiBiZXR3ZWVuIHRyYWRpdGlvbiBhbmQgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJrYXJ0aHVzXCIsXG4gICAgXCJrZXlcIjogXCIzMFwiLFxuICAgIFwibmFtZVwiOiBcIkthcnRodXNcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIERlYXRoc2luZ2VyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTE2LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDc1LFxuICAgICAgXCJtcFwiOiAzNzIuNDgsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNjEsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDIwLjg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDQ1MCxcbiAgICAgIFwiaHByZWdlblwiOiA2LjQyLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNDUuNjYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMjUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi4xMVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9LYXJ0aHVzLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDMzNixcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnRGVhdGggaXMgbm90IHRoZSBlbmQgb2YgdGhlIGpvdXJuZXksIGl0IGlzIGp1c3QgdGhlIGJlZ2lubmluZy4uLicnPGJyPjxicj5UaGUgaGFyYmluZ2VyIG9mIG9ibGl2aW9uLCBLYXJ0aHVzIGlzIGFuIHVuZHlpbmcgc3Bpcml0IHdob3NlIGhhdW50aW5nIHNvbmdzIGFyZSBhIHByZWx1ZGUgdG8gdGhlIGhvcnJvciBvZiBoaXMgbmlnaHRtYXJpc2ggYXBwZWFyYW5jZS4gVGhlIGxpdmluZyBmZWFyIHRoZSBldGVybml0eSBvZiB1bmRlYXRoLC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwia2Fzc2FkaW5cIixcbiAgICBcImtleVwiOiBcIjM4XCIsXG4gICAgXCJuYW1lXCI6IFwiS2Fzc2FkaW5cIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFZvaWQgV2Fsa2VyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiQXNzYXNzaW5cIixcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTY0LjA0LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDc4LFxuICAgICAgXCJtcFwiOiAzOTcuNixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA2NyxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0MCxcbiAgICAgIFwiYXJtb3JcIjogMjMuMzc2LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuMixcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDE1MCxcbiAgICAgIFwiaHByZWdlblwiOiA3Ljc5LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1OC44NTIsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuOSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDIzLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDMuN1xuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9LYXNzYWRpbi5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiAzODQsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUaGVyZSBpcyBhIHBsYWNlIGJldHdlZW4gZGltZW5zaW9ucyBhbmQgYmV0d2VlbiB3b3JsZHMuIFRvIHNvbWUgaXQgaXMga25vd24gYXMgdGhlIE91dHNpZGUsIHRvIG90aGVycyBpdCBpcyB0aGUgVW5rbm93bi4gVG8gbW9zdCwgaG93ZXZlciwgaXQgaXMgY2FsbGVkIHRoZSBWb2lkLiBEZXNwaXRlIGl0cyBuYW1lLCB0aGUgVm9pZCBpcyBub3QgYW4gZW1wdHkgcGxhY2UsIGJ1dCByYXRoZXIgdGhlIGhvbWUgb2YgdW5zcGVha2FibGUgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJrYXRhcmluYVwiLFxuICAgIFwia2V5XCI6IFwiNTVcIixcbiAgICBcIm5hbWVcIjogXCJLYXRhcmluYVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgU2luaXN0ZXIgQmxhZGVcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJBc3Nhc3NpblwiLFxuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MTAsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODMsXG4gICAgICBcIm1wXCI6IDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0NSxcbiAgICAgIFwiYXJtb3JcIjogMjYuODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogNC41LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiAwLFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU4LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjIsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA1LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuNzRcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vS2F0YXJpbmEucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogNDMyLFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiRHJpdmVuIGJ5IGFuIGludGVuc2Uga2lsbGVyIGluc3RpbmN0LCBLYXRhcmluYSB1c2VzIGhlciB0YWxlbnRzIGFzIGFuIGFzc2Fzc2luIGZvciB0aGUgZ2xvcnkgb2YgTm94dXMsIGFuZCB0aGUgY29udGludWVkIGVsZXZhdGlvbiBvZiBoZXIgZmFtaWx5LiBXaGlsZSBoZXIgZmVydm9yIGRyaXZlcyBoZXIgdG8gZXZlci1ncmVhdGVyIGZlYXRzLCBpdCBjYW4gc29tZXRpbWVzIGxlYWQgaGVyIGFzdHJheS48YnI+PGJyPkZyb20gLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJrYXlsZVwiLFxuICAgIFwia2V5XCI6IFwiMTBcIixcbiAgICBcIm5hbWVcIjogXCJLYXlsZVwiLFxuICAgIFwidGl0bGVcIjogXCJUaGUgSnVkaWNhdG9yXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJTdXBwb3J0XCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NzQuMjQsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTMsXG4gICAgICBcIm1wXCI6IDMyMi4yLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAyNi44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOC4yNixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNzUsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUxLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAyLjgsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjAyLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuMlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9LYXlsZS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiAwLFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiSW4gYSB3b3JsZCBmYXIgYXdheSB3aGVyZSBhbiBhbmNpZW50IHdhciBzdGlsbCByYWdlcywgS2F5bGUgd2FzIGEgZ3JlYXQgaGVybyAtIHRoZSBzdHJvbmdlc3Qgb2YgYW4gaW1tb3J0YWwgcmFjZSBjb21taXR0ZWQgdG8gZGVzdHJveWluZyBldmlsIHdoZXJldmVyIGl0IGNvdWxkIGJlIGZvdW5kLiBGb3IgdGVuIHRob3VzYW5kIHllYXJzLCBLYXlsZSBmb3VnaHQgdGlyZWxlc3NseSBmb3IgaGVyIHBlb3BsZSwgd2llbGRpbmcgaGVyIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwia2VubmVuXCIsXG4gICAgXCJrZXlcIjogXCI4NVwiLFxuICAgIFwibmFtZVwiOiBcIktlbm5lblwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgSGVhcnQgb2YgdGhlIFRlbXBlc3RcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCIsXG4gICAgICBcIk1hcmtzbWFuXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MzUuNzIsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNzksXG4gICAgICBcIm1wXCI6IDIwMCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAyNC4zLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNzUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1NTAsXG4gICAgICBcImhwcmVnZW5cIjogNS41OSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNjUsXG4gICAgICBcIm1wcmVnZW5cIjogNTAsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTAuNTQ0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA5NDcsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMy40XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0tlbm5lbi5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiA0OCxcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRoZXJlIGV4aXN0cyBhbiBhbmNpZW50IG9yZGVyIG9yaWdpbmF0aW5nIGluIHRoZSBJb25pYW4gSXNsZXMgZGVkaWNhdGVkIHRvIHRoZSBwcmVzZXJ2YXRpb24gb2YgYmFsYW5jZS4gT3JkZXIsIGNoYW9zLCBsaWdodCwgZGFya25lc3MgLS0gYWxsIHRoaW5ncyBtdXN0IGV4aXN0IGluIHBlcmZlY3QgaGFybW9ueSBmb3Igc3VjaCBpcyB0aGUgd2F5IG9mIHRoZSB1bml2ZXJzZS4gVGhpcyBvcmRlciBpcyBrbm93biBhcyB0aGUgS2lua291IC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwia2hheml4XCIsXG4gICAgXCJrZXlcIjogXCIxMjFcIixcbiAgICBcIm5hbWVcIjogXCJLaGEnWml4XCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBWb2lkcmVhdmVyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiQXNzYXNzaW5cIixcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTcyLjgsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODUsXG4gICAgICBcIm1wXCI6IDMyNy4yLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzUwLFxuICAgICAgXCJhcm1vclwiOiAyNyxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogNy41MSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNzUsXG4gICAgICBcIm1wcmVnZW5cIjogNy41OSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU1LjIwOCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4xLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNjUsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi43XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0toYXppeC5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiA5NixcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkEgdmljaW91cyBWb2lkIHByZWRhdG9yLCBLaGEnWml4IGluZmlsdHJhdGVkIFZhbG9yYW4gdG8gZGV2b3VyIHRoZSBsYW5kJ3MgbW9zdCBwcm9taXNpbmcgY3JlYXR1cmVzLiBXaXRoIGVhY2gga2lsbCBoZSBhYnNvcmJzIGhpcyBwcmV5J3Mgc3RyZW5ndGgsIGV2b2x2aW5nIHRvIGdyb3cgbW9yZSBwb3dlcmZ1bC4gS2hhJ1ppeCBodW5nZXJzIG1vc3QgdG8gY29ucXVlciBhbmQgY29uc3VtZSBSZW5nYXIsIHRoZSBvbmUgYmVhc3QgaGUgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJraW5kcmVkXCIsXG4gICAgXCJrZXlcIjogXCIyMDNcIixcbiAgICBcIm5hbWVcIjogXCJLaW5kcmVkXCIsXG4gICAgXCJ0aXRsZVwiOiBcIlRoZSBFdGVybmFsIEh1bnRlcnNcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYXJrc21hblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTQwLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg1LFxuICAgICAgXCJtcFwiOiAzMDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMzUsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMjUsXG4gICAgICBcImFybW9yXCI6IDIwLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDUwMCxcbiAgICAgIFwiaHByZWdlblwiOiA3LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA2Ljk3LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC40LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDEuNyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vS2luZHJlZC5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiAxNDQsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ1RlbGwgbWUgYWdhaW4sIGxpdHRsZSBMYW1iLCB3aGljaCB0aGluZ3MgYXJlIG91cnMgdG8gdGFrZT8nJzxicj4nJ0FsbCB0aGluZ3MsIERlYXIgV29sZi4nJzxicj5TZXBhcmF0ZSwgYnV0IG5ldmVyIHBhcnRlZCwgS2luZHJlZCByZXByZXNlbnRzIHRoZSB0d2luIGVzc2VuY2VzIG9mIGRlYXRoLiBMYW1iJ3MgYXJyb3cgb2ZmZXJzIGEgc3dpZnQgcmVsZWFzZSBmb3IgdGhvc2Ugd2hvIGFjY2VwdCB0aGVpciBmYXRlLiBXb2xmIGh1bnRzIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwia2xlZFwiLFxuICAgIFwia2V5XCI6IFwiMjQwXCIsXG4gICAgXCJuYW1lXCI6IFwiS2xlZFwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgQ2FudGFua2Vyb3VzIENhdmFsaWVyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJUYW5rXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiAzNDAsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNzAsXG4gICAgICBcIm1wXCI6IDEwMCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQ1LFxuICAgICAgXCJhcm1vclwiOiAyNixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiA0LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogNixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNzUsXG4gICAgICBcIm1wcmVnZW5cIjogMCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NSxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzLjVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vS2xlZC5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uNC5wbmdcIixcbiAgICAgIFwieFwiOiA0OCxcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnQSBzYW5lIG1hbiB3b3VsZCBydW4gLiAuIC4gYnV0IEkgYWluJ3QgdGhlIHJ1bm5pbicga2luZCEnJzxicj48YnI+QSB3YXJyaW9yIGFzIGZlYXJsZXNzIGFzIGhlIGlzIG9ybmVyeSwgS2xlZCBpcyBhIHBvcHVsYXIgZm9sayBoZXJvIGluIE5veHVzLiBFbWJvZHlpbmcgdGhlIGZ1cmlvdXMgYnJhdmFkbyBvZiBoaXMgbmF0aW9uLCBoZSBpcyBhbiBpY29uIGJlbG92ZWQgYnkgdGhlIGVtcGlyZSdzIHNvbGRpZXJzLCBkaXN0cnVzdGVkIGJ5IC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwia29nbWF3XCIsXG4gICAgXCJrZXlcIjogXCI5NlwiLFxuICAgIFwibmFtZVwiOiBcIktvZydNYXdcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIE1vdXRoIG9mIHRoZSBBYnlzc1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hcmtzbWFuXCIsXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUxNy43NixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MixcbiAgICAgIFwibXBcIjogMzIyLjIsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMjUsXG4gICAgICBcImFybW9yXCI6IDE5Ljg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDUwMCxcbiAgICAgIFwiaHByZWdlblwiOiA1LjkyLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA4LjY3NSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNyxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU3LjQ2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAyLjQxLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNixcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjY1XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0tvZ01hdy5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiAxOTIsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ0lmIHRoYXQncyBqdXN0IGh1bmdyeSwgSSBkb24ndCB3YW50IHRvIHNlZSBhbmdyeS4nJzxicj48YnI+V2hlbiB0aGUgcHJvcGhldCBNYWx6YWhhciB3YXMgcmVib3JuIGluIEljYXRoaWEsIGhlIHdhcyBsZWQgdGhlcmUgYnkgYW4gb21pbm91cyB2b2ljZSB3aGljaCB0aGVyZWFmdGVyIGFuY2hvcmVkIGl0c2VsZiB0byBoaXMgcHN5Y2hlLiBGcm9tIHdpdGhpbiwgdGhpcyB2b2ljZSBiZXN0b3dlZCB1cG9uIGhpbSB0ZXJyaWJsZSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImxlYmxhbmNcIixcbiAgICBcImtleVwiOiBcIjdcIixcbiAgICBcIm5hbWVcIjogXCJMZUJsYW5jXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBEZWNlaXZlclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkFzc2Fzc2luXCIsXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUxNixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA3NSxcbiAgICAgIFwibXBcIjogMzM0LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDUwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAyMS44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1MjUsXG4gICAgICBcImhwcmVnZW5cIjogNy40MixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU0Ljg4LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMS40XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0xlYmxhbmMucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogMjQwLFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiRXZlcnkgY2l0eSBoYXMgaXRzIGRhcmsgc2lkZSwgZXZlbiBvbmUgd2hvc2UgcmVwdXRhdGlvbiBpcyBhbHJlYWR5IG9mIGEgcXVlc3Rpb25hYmxlIGh1ZS4gTm94dXMgLSB0aG91Z2ggaXRzIG5hbWUgaXMgYWxyZWFkeSBpbnZva2VkIHdpdGggYSBtaXh0dXJlIG9mIHJldmVyZW5jZSBhbmQgcmV2dWxzaW9uIC0gaXMgbm8gZXhjZXB0aW9uIHRvIHRoaXMgc2ltcGxlIHRydXRoLiBEZWVwIHdpdGhpbiB0aGUgd2luZGluZyBkdW5nZW9ucyAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImxlZXNpblwiLFxuICAgIFwia2V5XCI6IFwiNjRcIixcbiAgICBcIm5hbWVcIjogXCJMZWUgU2luXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBCbGluZCBNb25rXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJBc3Nhc3NpblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTcwLjgsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODUsXG4gICAgICBcIm1wXCI6IDIwMCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzUwLFxuICAgICAgXCJhcm1vclwiOiAyNC4yMTYsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy43LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogNy40MjUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjcsXG4gICAgICBcIm1wcmVnZW5cIjogNTAsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNjEuMTc2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjIsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA0LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDNcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vTGVlU2luLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDI4OCxcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkFzIGEgeW91bmcgdGVlbiwgTGVlIFNpbiB3YXMgaW50ZW50IG9uIGJlY29taW5nIGEgc3VtbW9uZXIuIEhpcyB3aWxsIGFuZCBkZWRpY2F0aW9uIHdlcmUgdW5tYXRjaGVkIGJ5IGFueSBvZiBoaXMgcGVlcnMsIGFuZCBoaXMgc2tpbGwgZHJldyB0aGUgYXR0ZW50aW9uIG9mIFJlZ2luYWxkIEFzaHJhbSwgdGhlIExlYWd1ZSdzIEhpZ2ggQ291bmNpbG9yIGF0IHRoZSB0aW1lLiBXaGlsZSBzdHVkeWluZyBhdCB0aGUgQXJjYW51bSBNYWpvcmlzLC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwibGVvbmFcIixcbiAgICBcImtleVwiOiBcIjg5XCIsXG4gICAgXCJuYW1lXCI6IFwiTGVvbmFcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFJhZGlhbnQgRGF3blwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlRhbmtcIixcbiAgICAgIFwiU3VwcG9ydFwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTc2LjE2LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg3LFxuICAgICAgXCJtcFwiOiAzMDIuMixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMjcuMjA4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNixcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDguNDI1LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC44NSxcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNjAuMDQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi45XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0xlb25hLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDMzNixcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnSWYgeW91IHdvdWxkIHNoaW5lIGxpa2UgYSBzdW4sIGZpcnN0IHlvdSBtdXN0IGJ1cm4gbGlrZSBvbmUuJyc8YnI+PGJyPkltYnVlZCB3aXRoIHRoZSBmaXJlIG9mIHRoZSBzdW4sIExlb25hIGlzIGEgd2FycmlvciB0ZW1wbGFyIG9mIHRoZSBTb2xhcmkgd2hvIGRlZmVuZHMgTW91bnQgVGFyZ29uIHdpdGggaGVyIFplbml0aCBCbGFkZSBhbmQgU2hpZWxkIG9mIERheWJyZWFrLiBIZXIgc2tpbiBzaGltbWVycyB3aXRoIHN0YXJmaXJlIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwibGlzc2FuZHJhXCIsXG4gICAgXCJrZXlcIjogXCIxMjdcIixcbiAgICBcIm5hbWVcIjogXCJMaXNzYW5kcmFcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEljZSBXaXRjaFwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUwNi4xMixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA3NSxcbiAgICAgIFwibXBcIjogMzA0LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDUwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzI1LFxuICAgICAgXCJhcm1vclwiOiAyMC4yMTYsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy43LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDYuOTIsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDUuNjcsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjQsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1MC41MzYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDIuNyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAxLjM2XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0xpc3NhbmRyYS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiAzODQsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJMaXNzYW5kcmEncyBtYWdpYyB0d2lzdHMgdGhlIHB1cmUgcG93ZXIgb2YgaWNlIGludG8gc29tZXRoaW5nIGRhcmsgYW5kIHRlcnJpYmxlLiBXaXRoIHRoZSBmb3JjZSBvZiBoZXIgYmxhY2sgaWNlLCBzaGUgZG9lcyBtb3JlIHRoYW4gZnJlZXplIC0gc2hlIGltcGFsZXMgYW5kIGNydXNoZXMgdGhvc2Ugd2hvIG9wcG9zZSBoZXIuIFRvIHRoZSB0ZXJyaWZpZWQgZGVuaXplbnMgb2YgdGhlIG5vcnRoLCBzaGUgaXMga25vd24gb25seSBhcyAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImx1Y2lhblwiLFxuICAgIFwia2V5XCI6IFwiMjM2XCIsXG4gICAgXCJuYW1lXCI6IFwiTHVjaWFuXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBQdXJpZmllclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hcmtzbWFuXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NTQuNCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MCxcbiAgICAgIFwibXBcIjogMzQ4Ljg4LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDM4LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAyNC4wNCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTAwLFxuICAgICAgXCJocHJlZ2VuXCI6IDYuMTksXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjY1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDguMTc1LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC43LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTcuNDYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDIuNDEsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjAyLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDMuM1xuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9MdWNpYW4ucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogNDMyLFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiTHVjaWFuIHdpZWxkcyByZWxpYyB3ZWFwb25zIGltYnVlZCB3aXRoIGFuY2llbnQgcG93ZXIgYW5kIHN0YW5kcyBhIHN0YWx3YXJ0IGd1YXJkaWFuIGFnYWluc3QgdGhlIHVuZGVhZC4gSGlzIGNvbGQgY29udmljdGlvbiBuZXZlciB3YXZlcnMsIGV2ZW4gaW4gdGhlIGZhY2Ugb2YgdGhlIG1hZGRlbmluZyBob3Jyb3JzIGhlIGRlc3Ryb3lzIGJlbmVhdGggaGlzIGhhaWwgb2YgcHVyaWZ5aW5nIGZpcmUuIEx1Y2lhbiB3YWxrcyBhbG9uZSBvbiAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImx1bHVcIixcbiAgICBcImtleVwiOiBcIjExN1wiLFxuICAgIFwibmFtZVwiOiBcIkx1bHVcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEZhZSBTb3JjZXJlc3NcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJTdXBwb3J0XCIsXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU1Mi43NixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA3NCxcbiAgICAgIFwibXBcIjogMzUwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDU1LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzMwLFxuICAgICAgXCJhcm1vclwiOiAxOS4yMTYsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy43LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDYuMDA1LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42LFxuICAgICAgXCJtcHJlZ2VuXCI6IDExLFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC42LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNDYuMzY4LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAyLjYsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi4yNVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9MdWx1LnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDAsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlBlcmhhcHMgbW9yZSB0aGFuIGFueSBvdGhlciBjaGFtcGlvbiBpbiB0aGUgTGVhZ3VlLCBMdWx1IG1hcmNoZXMgdG8gdGhlIGJlYXQgb2YgaGVyIG93biBkcnVtLiBEdXJpbmcgaGVyIHlvdXRoIGluIEJhbmRsZSBDaXR5LCBzaGUgc3BlbnQgbW9zdCBvZiBoZXIgdGltZSB3YW5kZXJpbmcgYWxvbmUgaW4gdGhlIGZvcmVzdCBvciBsb3N0IGluIGEgZGF5ZHJlYW0uIEl0IHdhc24ndCB0aGF0IHNoZSB3YXMgYW50aXNvY2lhbDsgdGhlIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwibHV4XCIsXG4gICAgXCJrZXlcIjogXCI5OVwiLFxuICAgIFwibmFtZVwiOiBcIkx1eFwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgTGFkeSBvZiBMdW1pbm9zaXR5XCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiLFxuICAgICAgXCJTdXBwb3J0XCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA0NzcuNzIsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNzksXG4gICAgICBcIm1wXCI6IDM4NCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0NyxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzMCxcbiAgICAgIFwiYXJtb3JcIjogMTguNzIsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogNCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDU1MCxcbiAgICAgIFwiaHByZWdlblwiOiA1LjQyLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTMuNTQ0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMS4zNlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9MdXgucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogNDgsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkJvcm4gdG8gdGhlIHByZXN0aWdpb3VzIENyb3duZ3VhcmRzLCB0aGUgcGFyYWdvbiBmYW1pbHkgb2YgRGVtYWNpYW4gc2VydmljZSwgTHV4YW5uYSB3YXMgZGVzdGluZWQgZm9yIGdyZWF0bmVzcy4gU2hlIGdyZXcgdXAgYXMgdGhlIGZhbWlseSdzIG9ubHkgZGF1Z2h0ZXIsIGFuZCBzaGUgaW1tZWRpYXRlbHkgdG9vayB0byB0aGUgYWR2YW5jZWQgZWR1Y2F0aW9uIGFuZCBsYXZpc2ggcGFydGllcyByZXF1aXJlZCBvZiBmYW1pbGllcyBhcyAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIm1hbHBoaXRlXCIsXG4gICAgXCJrZXlcIjogXCI1NFwiLFxuICAgIFwibmFtZVwiOiBcIk1hbHBoaXRlXCIsXG4gICAgXCJ0aXRsZVwiOiBcIlNoYXJkIG9mIHRoZSBNb25vbGl0aFwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlRhbmtcIixcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTc0LjIsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTAsXG4gICAgICBcIm1wXCI6IDI4Mi4yLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAyOC4zLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNzUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA3LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA3LjMyLFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDYxLjk3LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjM3NSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDIsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMy40XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL01hbHBoaXRlLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDk2LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUaGVyZSBpcyBhIHdvcmxkIG9mIHBlcmZlY3QgaGFybW9ueSwgd2hlcmUgYWxsIGFyZSBwYXJ0IG9mIHRoZSB3aG9sZS4gVGhlIE1vbm9saXRoIGlzIHRoZSBlc3NlbmNlIG9mIGFsbCBjcmVhdGlvbiwgYW5kIGl0cyBkZW5pemVucyBhcmUgYnV0IHNpbmd1bGFyIHBpZWNlcyBvZiBpdC4gSXQgaXMgYmVhdXRpZnVsIGluIGl0cyBzeW1tZXRyeSwgYW5kIGluIGl0cyBhbG1vc3QgY29tcGxldGUgbGFjayBvZiB1bmNlcnRhaW50eS4gVGhlIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwibWFsemFoYXJcIixcbiAgICBcImtleVwiOiBcIjkwXCIsXG4gICAgXCJuYW1lXCI6IFwiTWFsemFoYXJcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFByb3BoZXQgb2YgdGhlIFZvaWRcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCIsXG4gICAgICBcIkFzc2Fzc2luXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MjUsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNzUsXG4gICAgICBcIm1wXCI6IDMwMCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA1NSxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMjAsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTAwLFxuICAgICAgXCJocHJlZ2VuXCI6IDYsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjYsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU1LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDEuNVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9NYWx6YWhhci5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiAxNDQsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIk1hbnkgbWVuIGhhdmUgZ29uZSBtYWQgYmVuZWF0aCB0aGUgZ2xhcmUgb2YgdGhlIFNodXJpbWEgc3VuLCBidXQgaXQgd2FzIGR1cmluZyB0aGUgbmlnaHQncyBjaGlsbGluZyBlbWJyYWNlIHRoYXQgTWFsemFoYXIgcmVsaW5xdWlzaGVkIGhpcyBzYW5pdHkuIE1hbHphaGFyIHdhcyBib3JuIGEgc2VlciwgYmxlc3NlZCB3aXRoIHRoZSBnaWZ0IG9mIHByb3BoZWN5LiBIaXMgdGFsZW50LCB0aG91Z2ggdW5yZWZpbmVkLCBwcm9taXNlZCB0byAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIm1hb2thaVwiLFxuICAgIFwia2V5XCI6IFwiNTdcIixcbiAgICBcIm5hbWVcIjogXCJNYW9rYWlcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFR3aXN0ZWQgVHJlYW50XCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiVGFua1wiLFxuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NzIuMixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5MCxcbiAgICAgIFwibXBcIjogMzc3LjI4LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQzLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAyOC43MixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiA0LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogNyxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNzUsXG4gICAgICBcIm1wcmVnZW5cIjogNy4yMDUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjQ1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNjMuNTQ0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjEsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi4xMjVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vTWFva2FpLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDE5MixcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydBbGwgYXJvdW5kIG1lIGFyZSBlbXB0eSBodXNrcywgc291bGxlc3MgYW5kIHVuYWZyYWlkLi4uIGJ1dCBJIHdpbGwgYnJpbmcgdGhlbSBmZWFyLicnPGJyPjxicj5NYW9rYWkgaXMgYSByYWdlZnVsLCB0b3dlcmluZyB0cmVhbnQgd2hvIGZpZ2h0cyB0aGUgdW5uYXR1cmFsIGhvcnJvcnMgb2YgdGhlIFNoYWRvdyBJc2xlcy4gSGUgd2FzIHR3aXN0ZWQgaW50byBhIGZvcmNlIG9mIHZlbmdlYW5jZSBhZnRlciBhIG1hZ2ljYWwgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJtYXN0ZXJ5aVwiLFxuICAgIFwia2V5XCI6IFwiMTFcIixcbiAgICBcIm5hbWVcIjogXCJNYXN0ZXIgWWlcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFd1anUgQmxhZGVzbWFuXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiQXNzYXNzaW5cIixcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTk4LjU2LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDkyLFxuICAgICAgXCJtcFwiOiAyNTAuNTYsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDIsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNTUsXG4gICAgICBcImFybW9yXCI6IDI0LjA0LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA3LjU5LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42NSxcbiAgICAgIFwibXByZWdlblwiOiA3LjI1NSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNDUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA2MC4wNCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDgsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9NYXN0ZXJZaS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiAyNDAsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRocm91Z2ggdGhlIGFuY2llbnQgbWFydGlhbCBhcnQgb2YgV3VqdSwgTWFzdGVyIFlpIGhhcyB0ZW1wZXJlZCBoaXMgYm9keSBhbmQgc2hhcnBlbmVkIGhpcyBtaW5kIHVudGlsIHRob3VnaHQgYW5kIGFjdGlvbiBoYXZlIGJlY29tZSBvbmUuIFRob3VnaCBoZSBjaG9vc2VzIHRvIGVudGVyIGludG8gdmlvbGVuY2UgYXMgYSBsYXN0IHJlc29ydCwgdGhlIGdyYWNlIGFuZCBzcGVlZCB3aXRoIHdoaWNoIGhlIHdpZWxkcyBoaXMgYmxhZGUgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJtaXNzZm9ydHVuZVwiLFxuICAgIFwia2V5XCI6IFwiMjFcIixcbiAgICBcIm5hbWVcIjogXCJNaXNzIEZvcnR1bmVcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEJvdW50eSBIdW50ZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYXJrc21hblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTMwLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg1LFxuICAgICAgXCJtcFwiOiAzMjUuODQsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMzUsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMjUsXG4gICAgICBcImFybW9yXCI6IDI0LjA0LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1NTAsXG4gICAgICBcImhwcmVnZW5cIjogNi4xOSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNjUsXG4gICAgICBcIm1wcmVnZW5cIjogOC4wNCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNjUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA0NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDQ3MzQsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogM1xuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9NaXNzRm9ydHVuZS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiAyODgsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnVGhlIGJpZ2dlciB0aGUgcmlzaywgdGhlIGJpZ2dlciB0aGUgYm91bnR5LicnPGJyPjxicj5CZWF1dHkgYW5kIGRhbmdlcjogVGhlcmUgYXJlIGZldyB3aG8gY2FuIG1hdGNoIE1pc3MgRm9ydHVuZSBpbiBlaXRoZXIuIE9uZSBvZiBCaWxnZXdhdGVyJ3MgbW9zdCBpbmZhbW91cyBib3VudHkgaHVudGVycywgc2hlIGJ1aWx0IGhlciBsZWdlbmQgdXBvbiBhIHN3YXRoZSBvZiBidWxsZXQtcmlkZGxlZCBjb3Jwc2VzIGFuZCBjYXB0dXJlZCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIm1vbmtleWtpbmdcIixcbiAgICBcImtleVwiOiBcIjYyXCIsXG4gICAgXCJuYW1lXCI6IFwiV3Vrb25nXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBNb25rZXkgS2luZ1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiVGFua1wiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTc3LjgsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODUsXG4gICAgICBcIm1wXCI6IDI2NS44NCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAzOCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0NSxcbiAgICAgIFwiYXJtb3JcIjogMjQuODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxNzUsXG4gICAgICBcImhwcmVnZW5cIjogNi4xOSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNjUsXG4gICAgICBcIm1wcmVnZW5cIjogOC4wNCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNjUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1OS44NzYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMixcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDUsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogM1xuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9Nb25rZXlLaW5nLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDMzNixcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiRHVyaW5nIHRoZSBjaGFvcyBvZiB0aGUgUnVuZSBXYXJzLCBhbiBlbm9ybW91cyBydW5lc3RvbmUgd2FzIGxvc3QgZGVlcCB3aXRoaW4gdGhlIFBsYWd1ZSBKdW5nbGVzLiBJdCByZW1haW5lZCB0aGVyZSwgdW50b3VjaGVkIGZvciBjZW50dXJpZXMsIGVtYW5hdGluZyBhIHBvdGVudCBtYWdpYyB3aGljaCBpbmZ1c2VkIG5lYXJieSB3aWxkbGlmZSB3aXRoIHNlbnRpZW5jZSBhbmQgdml0YWxpdHkuIEEgZ3JvdXAgb2YgbW9ua2V5cyB3aG8gLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJtb3JkZWthaXNlclwiLFxuICAgIFwia2V5XCI6IFwiODJcIixcbiAgICBcIm5hbWVcIjogXCJNb3JkZWthaXNlclwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgSXJvbiBSZXZlbmFudFwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUyNSxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA3MyxcbiAgICAgIFwibXBcIjogMCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzI1LFxuICAgICAgXCJhcm1vclwiOiAyMCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjc1LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxNzUsXG4gICAgICBcImhwcmVnZW5cIjogNCxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuMyxcbiAgICAgIFwibXByZWdlblwiOiAwLFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDYxLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiA1LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLjA0LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuMlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9Nb3JkZWthaXNlci5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiAzODQsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnQWxsIHRoaW5ncyBtdXN0IGRpZS4uLiBhbmQgeWV0IEkgbGl2ZSBvbi4nJzxicj48YnI+VGhlIGJhbGVmdWwgcmV2ZW5hbnQgTW9yZGVrYWlzZXIgaXMgYW1vbmcgdGhlIG1vc3QgdGVycmlmeWluZyBhbmQgaGF0ZWZ1bCBzcGlyaXRzIGhhdW50aW5nIHRoZSBTaGFkb3cgSXNsZXMuIEhlIGhhcyBleGlzdGVkIGZvciBjb3VudGxlc3MgY2VudHVyaWVzLCBzaGllbGRlZCBmcm9tIHRydWUgZGVhdGggYnkgbmVjcm9tYW50aWMgc29yY2VyeSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIm1vcmdhbmFcIixcbiAgICBcImtleVwiOiBcIjI1XCIsXG4gICAgXCJuYW1lXCI6IFwiTW9yZ2FuYVwiLFxuICAgIFwidGl0bGVcIjogXCJGYWxsZW4gQW5nZWxcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCIsXG4gICAgICBcIlN1cHBvcnRcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU0Ny40OCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NixcbiAgICAgIFwibXBcIjogMzQwLjgsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNjAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDI1LjM4NCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjgsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA0NTAsXG4gICAgICBcImhwcmVnZW5cIjogNS43MDUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjYsXG4gICAgICBcIm1wcmVnZW5cIjogOC41LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTUuNDYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAxLjUzXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL01vcmdhbmEucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogNDMyLFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUaGVyZSBpcyBhIHdvcmxkIGZhciBhd2F5IHBvcHVsYXRlZCBieSBncmFjZWZ1bCBhbmQgYmVhdXRpZnVsIHdpbmdlZCBiZWluZ3MgZ2lmdGVkIHdpdGggaW1tb3J0YWxpdHksIHdoZXJlIGFuIGFuY2llbnQgY29uZmxpY3Qgc3RpbGwgcmFnZXMuIExpa2Ugc28gbWFueSBjb25mbGljdHMsIHRoaXMgd2FyIHNwbGl0IGZhbWlsaWVzLiBPbmUgc2lkZSBwcm9jbGFpbWVkIHRoZW1zZWx2ZXMgYXMgYmVpbmdzIG9mIHBlcmZlY3Qgb3JkZXIgYW5kIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwibmFtaVwiLFxuICAgIFwia2V5XCI6IFwiMjY3XCIsXG4gICAgXCJuYW1lXCI6IFwiTmFtaVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgVGlkZWNhbGxlclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlN1cHBvcnRcIixcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNDg5LjMyLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDc0LFxuICAgICAgXCJtcFwiOiAzNzcuMjQsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDMsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDE5LjcyLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDQsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1NTAsXG4gICAgICBcImhwcmVnZW5cIjogNS40MixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogMTEuNSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUxLjIwOCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4xLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjYxXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL05hbWkucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogMCxcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIk5hbWkgY2hhbm5lbHMgdGhlIHByaW1hbCBlbmVyZ2llcyBvZiB0aGUgb2NlYW4sIGhhcm5lc3NpbmcgaXRzIG15c3RpY2FsIHJlc3RvcmF0aXZlIHByb3BlcnRpZXMgYW5kIGNvbW1hbmRpbmcgdGhlIHJhdyBwb3dlciBvZiB0aGUgdGlkZXMgdGhlbXNlbHZlcy4gVGhvdWdoIG1hbnkgZG91YnRlZCBoZXIsIE5hbWkgaGFkIHRoZSBicmF2ZXJ5IGFuZCBkZXRlcm1pbmF0aW9uIHRvIHRha2Ugb24gYSBkYW5nZXJvdXMgcXVlc3Qgd2hlbiBubyAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIm5hc3VzXCIsXG4gICAgXCJrZXlcIjogXCI3NVwiLFxuICAgIFwibmFtZVwiOiBcIk5hc3VzXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBDdXJhdG9yIG9mIHRoZSBTYW5kc1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiVGFua1wiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTYxLjIsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTAsXG4gICAgICBcIm1wXCI6IDMyNS42LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQyLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzUwLFxuICAgICAgXCJhcm1vclwiOiAyNC44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA5LjAxLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC45LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuNDQsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1OS4xOCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wMixcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzLjQ4XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL05hc3VzLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQ4LFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydXaGF0IHdhcyBmYWxsZW4gd2lsbCBiZSBncmVhdCBhZ2Fpbi4nJzxicj48YnI+TmFzdXMgaXMgYW4gaW1wb3NpbmcsIGphY2thbC1oZWFkZWQgQXNjZW5kZWQgYmVpbmcgZnJvbSBhbmNpZW50IFNodXJpbWEsIGEgaGVyb2ljIGZpZ3VyZSByZWdhcmRlZCBhcyBhIGRlbWlnb2QgYnkgdGhlIHBlb3BsZSBvZiB0aGUgZGVzZXJ0LiBGaWVyY2VseSBpbnRlbGxpZ2VudCwgaGUgd2FzIGEgZ3VhcmRpYW4gb2Yga25vd2xlZGdlIGFuZCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIm5hdXRpbHVzXCIsXG4gICAgXCJrZXlcIjogXCIxMTFcIixcbiAgICBcIm5hbWVcIjogXCJOYXV0aWx1c1wiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgVGl0YW4gb2YgdGhlIERlcHRoc1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlRhbmtcIixcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTc2LjQ4LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg2LFxuICAgICAgXCJtcFwiOiAzMzQsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDcsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMjUsXG4gICAgICBcImFybW9yXCI6IDI2LjQ2LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNzUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDE3NSxcbiAgICAgIFwiaHByZWdlblwiOiA4LjM3LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA4LjYyNSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNyxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU3LjU0NCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4zLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLjAyLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDFcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vTmF1dGlsdXMucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogOTYsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJPbmNlLCBOYXV0aWx1cyB3YXMgYSBzYWlsb3IgY29tbWlzc2lvbmVkIGJ5IHRoZSBJbnN0aXR1dGUgb2YgV2FyIHRvIGV4cGxvcmUgdGhlIHVuY2hhcnRlZCByZWFjaGVzIG9mIHRoZSBHdWFyZGlhbidzIFNlYS4gVGhpcyBleHBlZGl0aW9uIHRvb2sgaGltIGRlZXAgaW50byB1bmtub3duIHdhdGVycyB3aGVyZSBoZSBhbmQgaGlzIGNyZXcgZm91bmQgYSB2YXN0IHNlY3Rpb24gb2YgYmxhY2sgb296aW5nIGxpcXVpZCB0aGF0IG5vbmUgb2YgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJuaWRhbGVlXCIsXG4gICAgXCJrZXlcIjogXCI3NlwiLFxuICAgIFwibmFtZVwiOiBcIk5pZGFsZWVcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEJlc3RpYWwgSHVudHJlc3NcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJBc3Nhc3NpblwiLFxuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MTEuMixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MCxcbiAgICAgIFwibXBcIjogMjk1LjYsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDUsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDIyLjg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDUyNSxcbiAgICAgIFwiaHByZWdlblwiOiA2LjAwNSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNixcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNDcuODgsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDIsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMy4yMlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9OaWRhbGVlLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDE0NCxcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRoZXJlIGFyZSBmZXcgZHdlbGxlcnMsIGxldCBhbG9uZSBjaGFtcGlvbnMsIHJlc2lkaW5nIGluIHRoZSBibGFzdGVkIGFuZCBkYW5nZXJvdXMgbGFuZHMgdGhhdCBsaWUgc291dGggb2YgdGhlIEdyZWF0IEJhcnJpZXIuIE11Y2ggb2YgdGhhdCB3b3JsZCBzdGlsbCBiZWFycyB0aGUgc2NhcnMgb2YgcGFzdCBSdW5lcyBXYXJzLCBlc3BlY2lhbGx5IHRoZSBteXN0ZXJpb3VzIEt1bXVuZ3UgSnVuZ2xlLiBUaGVyZSBhcmUgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJub2N0dXJuZVwiLFxuICAgIFwia2V5XCI6IFwiNTZcIixcbiAgICBcIm5hbWVcIjogXCJOb2N0dXJuZVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgRXRlcm5hbCBOaWdodG1hcmVcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJBc3Nhc3NpblwiLFxuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1ODIuOCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NSxcbiAgICAgIFwibXBcIjogMjczLjgsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMzUsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDUsXG4gICAgICBcImFybW9yXCI6IDI2Ljg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDguMjYsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjc1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYuNzU1LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC40NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU5LjIwOCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4xLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNjUsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi43XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL05vY3R1cm5lLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDE5MixcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkJlZm9yZSBOb2N0dXJuZSwgcGVvcGxlIGJlbGlldmVkIHRoYXQgZHJlYW1zIHdlcmUgZmlnbWVudHMgb2YgdGhlaXIgaW1hZ2luYXRpb24sIG1lYW5pbmdsZXNzIGltYWdlcyB0aGF0IGZsYXNoZWQgdGhyb3VnaCB0aGUgbWluZCB3aGVuIG9uZSBzbGVwdC4gVGhpcyBiZWxpZWYgd2FzIHB1dCB0byB0aGUgdGVzdCB3aGVuIGEgcmFzaCBvZiBzbGVlcC1yZWxhdGVkIGluY2lkZW50cyBzdGFydGVkIGFmZmxpY3Rpbmcgc3VtbW9uZXJzIG9mIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwibnVudVwiLFxuICAgIFwia2V5XCI6IFwiMjBcIixcbiAgICBcIm5hbWVcIjogXCJOdW51XCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBZZXRpIFJpZGVyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiU3VwcG9ydFwiLFxuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1OTguMjgsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTAsXG4gICAgICBcIm1wXCI6IDI4My41NixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MixcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM1MCxcbiAgICAgIFwiYXJtb3JcIjogMjYuMzgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOC4zOSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwibXByZWdlblwiOiA3LjQ0LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC41LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTksXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDQsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi4yNVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9OdW51LnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDI0MCxcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlNvbWV0aW1lcyBib25kcyBvZiBmcmllbmRzaGlwIGJlY29tZSBzdHJvbmdlciB0aGFuIGV2ZW4gYm9uZHMgb2YgYmxvb2QuIFdoZW4gdGhvc2UgYm9uZHMgbGluayBhIGZlYXJsZXNzIGJveSB0byBhIGZlYXJzb21lIFlldGksIHRoZSBib25kIGJlY29tZXMgYSBmb3JjZSB0byBiZSByZWNrb25lZCB3aXRoLiBHaXZlbiB0aGUgcmVzcG9uc2liaWxpdHkgb2YgdGFtaW5nIGEgdGVycmlmeWluZyBiZWFzdCwgTnVudSBmb3JnZWQgYSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIm9sYWZcIixcbiAgICBcImtleVwiOiBcIjJcIixcbiAgICBcIm5hbWVcIjogXCJPbGFmXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBCZXJzZXJrZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIlRhbmtcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU5Ny4yNCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5MyxcbiAgICAgIFwibXBcIjogMzE1LjYsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDIsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNTAsXG4gICAgICBcImFybW9yXCI6IDI2LjA0LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA4LjUxLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC45LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuNDY1LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC41NzUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1OS45OCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4xLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuN1xuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9PbGFmLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDI4OCxcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIk1vc3QgbWVuIHdvdWxkIHNheSB0aGF0IGRlYXRoIGlzIGEgdGhpbmcgdG8gYmUgZmVhcmVkOyBub25lIG9mIHRob3NlIG1lbiB3b3VsZCBiZSBPbGFmLiBUaGUgQmVyc2Vya2VyIGxpdmVzIG9ubHkgZm9yIHRoZSByb2FyIG9mIGEgYmF0dGxlIGNyeSBhbmQgdGhlIGNsYXNoIG9mIHN0ZWVsLiBTcHVycmVkIG9uIGJ5IGhpcyBodW5nZXIgZm9yIGdsb3J5IGFuZCB0aGUgbG9vbWluZyBjdXJzZSBvZiBhIGZvcmdldHRhYmxlIGRlYXRoLCBPbGFmIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwib3JpYW5uYVwiLFxuICAgIFwia2V5XCI6IFwiNjFcIixcbiAgICBcIm5hbWVcIjogXCJPcmlhbm5hXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBMYWR5IG9mIENsb2Nrd29ya1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIixcbiAgICAgIFwiU3VwcG9ydFwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTE3LjcyLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDc5LFxuICAgICAgXCJtcFwiOiAzMzQsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNTAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMjUsXG4gICAgICBcImFybW9yXCI6IDE3LjA0LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1MjUsXG4gICAgICBcImhwcmVnZW5cIjogNi44NyxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDQwLjM2OCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMi42LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzLjVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vT3JpYW5uYS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiAzMzYsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUaGVyZSBvbmNlIHdhcyBhIFBpbHRvdmlhbiBtYW4gbmFtZWQgQ29yaW4gUmV2ZWNrIHdobyBoYWQgYSBkYXVnaHRlciBuYW1lZCBPcmlhbm5hLCB3aG9tIGhlIGxvdmVkIG1vcmUgdGhhbiBhbnl0aGluZyBlbHNlIGluIHRoZSB3b3JsZC4gVGhvdWdoIE9yaWFubmEgaGFkIGluY3JlZGlibGUgdGFsZW50IGZvciBkYW5jaW5nLCBzaGUgd2FzIGRlZXBseSBmYXNjaW5hdGVkIGJ5IHRoZSBjaGFtcGlvbnMgb2YgdGhlIExlYWd1ZSBvZiAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInBhbnRoZW9uXCIsXG4gICAgXCJrZXlcIjogXCI4MFwiLFxuICAgIFwibmFtZVwiOiBcIlBhbnRoZW9uXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBBcnRpc2FuIG9mIFdhclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiQXNzYXNzaW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU3OS4xNixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NyxcbiAgICAgIFwibXBcIjogMzE3LjEyLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDMxLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzU1LFxuICAgICAgXCJhcm1vclwiOiAyNy42NTIsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy45LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxNTAsXG4gICAgICBcImhwcmVnZW5cIjogNy44NCxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNjUsXG4gICAgICBcIm1wcmVnZW5cIjogNy4zNTUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjQ1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTUuNTcyLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAyLjksXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjAzLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuOTVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vUGFudGhlb24ucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogMzg0LFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydCcmluZyBmb3J0aCBvbmUgdHJ1ZSBjaGFtcGlvbiwgb3IgYSBodW5kcmVkIG1vcmUgbGlrZSB5b3UsIGFuZCB0aGVuIHdlIHNoYWxsIGhhdmUgYSBiYXR0bGUgdGhhdCB3aWxsIGJlIHNwb2tlbiBvZiB1bnRpbCB0aGUgZW5kIG9mIHRpbWUuJyc8YnI+PGJyPlRoZSBwZWVybGVzcyB3YXJyaW9yIGtub3duIGFzIFBhbnRoZW9uIGlzIGEgbmlnaC11bnN0b3BwYWJsZSBwYXJhZ29uIG9mIGJhdHRsZS4gSGUgd2FzIGJvcm4gYW1vbmcgdGhlIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicG9wcHlcIixcbiAgICBcImtleVwiOiBcIjc4XCIsXG4gICAgXCJuYW1lXCI6IFwiUG9wcHlcIixcbiAgICBcInRpdGxlXCI6IFwiS2VlcGVyIG9mIHRoZSBIYW1tZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJUYW5rXCIsXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU0MCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5MCxcbiAgICAgIFwibXBcIjogMjgwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQ1LFxuICAgICAgXCJhcm1vclwiOiAyOSxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOCxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwibXByZWdlblwiOiA3LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC43LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDQsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi41XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1BvcHB5LnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQzMixcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnSSdtIG5vIGhlcm8uIEp1c3QgYSB5b3JkbGUgd2l0aCBhIGhhbW1lci4nJzxicj48YnI+UnVuZXRlcnJhIGhhcyBubyBzaG9ydGFnZSBvZiB2YWxpYW50IGNoYW1waW9ucywgYnV0IGZldyBhcmUgYXMgdGVuYWNpb3VzIGFzIFBvcHB5LiBCZWFyaW5nIGEgaGFtbWVyIHR3aWNlIHRoZSBsZW5ndGggb2YgaGVyIGJvZHksIHRoaXMgZGV0ZXJtaW5lZCB5b3JkbGUgaGFzIHNwZW50IHVudG9sZCB5ZWFycyBzZWFyY2hpbmcgZm9yIHRoZSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInF1aW5uXCIsXG4gICAgXCJrZXlcIjogXCIxMzNcIixcbiAgICBcIm5hbWVcIjogXCJRdWlublwiLFxuICAgIFwidGl0bGVcIjogXCJEZW1hY2lhJ3MgV2luZ3NcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYXJrc21hblwiLFxuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MzIuOCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NSxcbiAgICAgIFwibXBcIjogMjY4LjgsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMzUsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDIzLjM4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDUyNSxcbiAgICAgIFwiaHByZWdlblwiOiA1LjQyLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA2Ljk3LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC40LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTQuNDYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDIuNDEsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA2NSxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzLjFcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vUXVpbm4ucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogMCxcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlF1aW5uIGFuZCBWYWxvciBhcmUgYW4gZWxpdGUgcmFuZ2VyIHRlYW0uIFdpdGggY3Jvc3Nib3cgYW5kIGNsYXcsIHRoZXkgdW5kZXJ0YWtlIHRoZWlyIG5hdGlvbidzIG1vc3QgZGFuZ2Vyb3VzIG1pc3Npb25zIGRlZXAgd2l0aGluIGVuZW15IHRlcnJpdG9yeSwgZnJvbSBzd2lmdCByZWNvbm5haXNzYW5jZSB0byBsZXRoYWwgc3RyaWtlcy4gVGhlIHBhaXIncyB1bmJyZWFrYWJsZSBib25kIGlzIGRlYWRseSBvbiB0aGUgYmF0dGxlZmllbGQsIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicmFtbXVzXCIsXG4gICAgXCJrZXlcIjogXCIzM1wiLFxuICAgIFwibmFtZVwiOiBcIlJhbW11c1wiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgQXJtb3JkaWxsb1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlRhbmtcIixcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTY0LjQ4LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg2LFxuICAgICAgXCJtcFwiOiAzMTAuNDQsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMzMsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDMxLjM4NCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiA0LjMsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA3LjkyLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA3Ljg0LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC41LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTUuODgsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjIxNVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9SYW1tdXMucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogNDgsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ09LLicnPGJyPjxicj5JZG9saXplZCBieSBtYW55LCBkaXNtaXNzZWQgYnkgc29tZSwgbXlzdGlmeWluZyB0byBhbGwsIHRoZSBjdXJpb3VzIGJlaW5nLCBSYW1tdXMsIGlzIGFuIGVuaWdtYS4gUHJvdGVjdGVkIGJ5IGEgc3Bpa2VkIHNoZWxsLCBSYW1tdXMgaW5zcGlyZXMgaW5jcmVhc2luZ2x5IGRpc3BhcmF0ZSB0aGVvcmllcyBvbiBoaXMgb3JpZ2luIHdoZXJldmVyIGhlIGdvZXMgLSBmcm9tIGRlbWlnb2QsIHRvIHNhY3JlZCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInJla3NhaVwiLFxuICAgIFwia2V5XCI6IFwiNDIxXCIsXG4gICAgXCJuYW1lXCI6IFwiUmVrJ1NhaVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgVm9pZCBCdXJyb3dlclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU3MCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5MCxcbiAgICAgIFwibXBcIjogMTAwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDI0LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTc1LFxuICAgICAgXCJocHJlZ2VuXCI6IDcuMzQsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjY1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDAsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTUuNjI4LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjM1LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDJcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vUmVrU2FpLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDk2LFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGhlIGxhcmdlc3QgYW5kIGZpZXJjZXN0IG9mIGhlciBzcGVjaWVzLCBSZWsnU2FpIGlzIGEgbWVyY2lsZXNzIHByZWRhdG9yIHRoYXQgdHVubmVscyB0aHJvdWdoIHRoZSBlYXJ0aCB0byBhbWJ1c2ggYW5kIGRldm91ciBoZXIgcHJleS4gSGVyIGluc2F0aWFibGUgaHVuZ2VyIGhhcyBsYWlkIHdhc3RlIHRvIGVudGlyZSByZWdpb25zIG9mIHRoZSBvbmNlLWdyZWF0IFNodXJpbWFuIGVtcGlyZS4gTWVyY2hhbnRzLCB0cmFkZXJzIGFuZCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInJlbmVrdG9uXCIsXG4gICAgXCJrZXlcIjogXCI1OFwiLFxuICAgIFwibmFtZVwiOiBcIlJlbmVrdG9uXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBCdXRjaGVyIG9mIHRoZSBTYW5kc1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiVGFua1wiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTcyLjE2LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg3LFxuICAgICAgXCJtcFwiOiAxMDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0NSxcbiAgICAgIFwiYXJtb3JcIjogMjUuNTg0LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuOCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDcuOTYsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjc1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDAsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTguMzI4LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjEsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA2LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuNjVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vUmVuZWt0b24ucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogMTQ0LFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydCbG9vZCBhbmQgdmVuZ2VhbmNlLicnPGJyPjxicj5SZW5la3RvbiBpcyBhIHRlcnJpZnlpbmcsIHJhZ2UtZnVlbGVkIEFzY2VuZGVkIGJlaW5nIGZyb20gdGhlIHNjb3JjaGVkIGRlc2VydHMgb2YgU2h1cmltYS4gT25jZSwgaGUgd2FzIGhpcyBlbXBpcmUncyBtb3N0IGVzdGVlbWVkIHdhcnJpb3IsIGxlYWRpbmcgdGhlIGFybWllcyBvZiBTaHVyaW1hIHRvIGNvdW50bGVzcyB2aWN0b3JpZXMuIEhvd2V2ZXIsIGFmdGVyIHRoZSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInJlbmdhclwiLFxuICAgIFwia2V5XCI6IFwiMTA3XCIsXG4gICAgXCJuYW1lXCI6IFwiUmVuZ2FyXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBQcmlkZXN0YWxrZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJBc3Nhc3NpblwiLFxuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1ODYuMixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5MCxcbiAgICAgIFwibXBcIjogNSxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQ1LFxuICAgICAgXCJhcm1vclwiOiAyNS44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA0LjI3LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC40LFxuICAgICAgXCJtcHJlZ2VuXCI6IDAsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNjAuMDQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA4LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuODVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vUmVuZ2FyLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDE5MixcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIk9uIGV2ZXJ5IHdhbGwgb2YgaGlzIGRlbiwgdGhlIHRyb3BoeSBodW50ZXIgUmVuZ2FyIG1vdW50cyB0aGUgaGVhZHMsIGhvcm5zLCBjbGF3cywgYW5kIGZhbmdzIG9mIHRoZSBtb3N0IGxldGhhbCBjcmVhdHVyZXMgaW4gVmFsb3Jhbi4gVGhvdWdoIGhpcyBjb2xsZWN0aW9uIGlzIGV4dGVuc2l2ZSwgaGUgcmVtYWlucyB1bnNhdGlzZmllZCwgdGlyZWxlc3NseSBzZWVraW5nIGdyZWF0ZXIgZ2FtZS4gSGUgdGFrZXMgdGltZSB3aXRoIGV2ZXJ5IC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicml2ZW5cIixcbiAgICBcImtleVwiOiBcIjkyXCIsXG4gICAgXCJuYW1lXCI6IFwiUml2ZW5cIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEV4aWxlXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJBc3Nhc3NpblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTU4LjQ4LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg2LFxuICAgICAgXCJtcFwiOiAwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDAsXG4gICAgICBcImFybW9yXCI6IDI0LjM3NixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjIsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA1LjM0LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41LFxuICAgICAgXCJtcHJlZ2VuXCI6IDAsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTYuMDQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMy41XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1JpdmVuLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDI0MCxcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnVGhlcmUgaXMgYSBwbGFjZSBiZXR3ZWVuIHdhciBhbmQgbXVyZGVyIGluIHdoaWNoIG91ciBkZW1vbnMgbHVyay4nJzxicj48YnI+SW4gTm94dXMsIGFueSBjaXRpemVuIG1heSByaXNlIHRvIHBvd2VyIHJlZ2FyZGxlc3Mgb2YgcmFjZSwgZ2VuZGVyLCBvciBzb2NpYWwgc3RhbmRpbmcgLSBzdHJlbmd0aCBpcyBhbGwgdGhhdCBtYXR0ZXJzLiBJdCB3YXMgd2l0aCBjb21taXR0ZWQgZmFpdGggaW4gdGhpcyBpZGVhbCB0aGF0IFJpdmVuIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicnVtYmxlXCIsXG4gICAgXCJrZXlcIjogXCI2OFwiLFxuICAgIFwibmFtZVwiOiBcIlJ1bWJsZVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgTWVjaGFuaXplZCBNZW5hY2VcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU4NC40LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgwLFxuICAgICAgXCJtcFwiOiAxMDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0NSxcbiAgICAgIFwiYXJtb3JcIjogMjUuODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOC4wMDUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjYsXG4gICAgICBcIm1wcmVnZW5cIjogMCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA2MS4wMzYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMixcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDMsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMS44NVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9SdW1ibGUucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogMjg4LFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydVZ2gsIGl0J3MgZ29ubmEgdGFrZSBmb3JldmVyIHRvIHNjcmFwZSB5b3VyIGZhY2Ugb2ZmIG15IHN1aXQhJyc8YnI+PGJyPkV2ZW4gYW1vbmdzdCB5b3JkbGVzLCBSdW1ibGUgd2FzIGFsd2F5cyB0aGUgcnVudCBvZiB0aGUgbGl0dGVyLiBBcyBzdWNoLCBoZSB3YXMgdXNlZCB0byBiZWluZyBidWxsaWVkLiBJbiBvcmRlciB0byBzdXJ2aXZlLCBoZSBoYWQgdG8gYmUgc2NyYXBwaWVyIGFuZCBtb3JlIHJlc291cmNlZnVsIHRoYW4gaGlzIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicnl6ZVwiLFxuICAgIFwia2V5XCI6IFwiMTNcIixcbiAgICBcIm5hbWVcIjogXCJSeXplXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBSdW5lIE1hZ2VcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCIsXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU1OC40OCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NixcbiAgICAgIFwibXBcIjogNDAwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDUwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQwLFxuICAgICAgXCJhcm1vclwiOiAyMS41NTIsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMyxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDU1MCxcbiAgICAgIFwiaHByZWdlblwiOiA3LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTUuMDQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi4xMTJcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vUnl6ZS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiAzMzYsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ1Rha2UgY2FyZSB3aXRoIHRoaXMgd29ybGQuIFdoYXQgaXMgbWFkZSBjYW4gYmUgdW5tYWRlLicnPGJyPjxicj5XaWRlbHkgY29uc2lkZXJlZCBvbmUgb2YgdGhlIG1vc3QgYWRlcHQgc29yY2VyZXJzIG9uIFJ1bmV0ZXJyYSwgUnl6ZSBpcyBhbiBhbmNpZW50LCBoYXJkLWJpdHRlbiBhcmNobWFnZSB3aXRoIGFuIGltcG9zc2libHkgaGVhdnkgYnVyZGVuIHRvIGJlYXIuIEFybWVkIHdpdGggYSBib3VuZGxlc3MgY29uc3RpdHV0aW9uIGFuZCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInNlanVhbmlcIixcbiAgICBcImtleVwiOiBcIjExM1wiLFxuICAgIFwibmFtZVwiOiBcIlNlanVhbmlcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFdpbnRlcidzIFdyYXRoXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiVGFua1wiLFxuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA2MDAsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTUsXG4gICAgICBcIm1wXCI6IDQwMCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0MCxcbiAgICAgIFwiYXJtb3JcIjogMjkuNTQsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMyxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDguNjc1LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC44NSxcbiAgICAgIFwibXByZWdlblwiOiA3LjIwNSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNDUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1Ny41NDQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDY3MixcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAxLjQ0XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1NlanVhbmkucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogMzg0LFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiU2VqdWFuaSB3YXMgd2VhbmVkIG9uIGhhcmRzaGlwIGFuZCByZWFyZWQgb24gYmFyYmFyaXR5LiBXaGVyZSBvdGhlcnMgc3VjY3VtYmVkIHRvIHRoZSBoYXJzaG5lc3Mgb2YgdGhlIEZyZWxqb3JkLCBzaGUgd2FzIHRlbXBlcmVkIGJ5IGl0IHVudGlsIHBhaW4gYmVjYW1lIHBvd2VyLCBodW5nZXIgYW4gZW5jb3VyYWdlbWVudCwgYW5kIGZyb3N0IGFuIGFsbHkgaW4gY3VsbGluZyB0aGUgd2Vhay4gVGhyb3VnaCBoZXIgb3JkZWFscywgc2hlIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwic2hhY29cIixcbiAgICBcImtleVwiOiBcIjM1XCIsXG4gICAgXCJuYW1lXCI6IFwiU2hhY29cIixcbiAgICBcInRpdGxlXCI6IFwidGhlIERlbW9uIEplc3RlclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkFzc2Fzc2luXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1ODIuMTIsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODQsXG4gICAgICBcIm1wXCI6IDI5Ny4yLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzUwLFxuICAgICAgXCJhcm1vclwiOiAyNC44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA4LjM3LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA3LjE1NSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNDUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1Ny41OCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4xLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDNcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vU2hhY28ucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogNDMyLFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiTW9zdCB3b3VsZCBzYXkgdGhhdCBkZWF0aCBpc24ndCBmdW5ueS4gSXQgaXNuJ3QsIHVubGVzcyB5b3UncmUgU2hhY28gLSB0aGVuIGl0J3MgaHlzdGVyaWNhbC4gSGUgaXMgVmFsb3JhbidzIGZpcnN0IGZ1bGx5IGZ1bmN0aW9uaW5nIGhvbWljaWRhbCBjb21pYzsgaGUgamVzdHMgdW50aWwgc29tZW9uZSBkaWVzLCBhbmQgdGhlbiBoZSBsYXVnaHMuIFRoZSBmaWd1cmUgdGhhdCBoYXMgY29tZSB0byBiZSBrbm93biBhcyB0aGUgRGVtb24gLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJzaGVuXCIsXG4gICAgXCJrZXlcIjogXCI5OFwiLFxuICAgIFwibmFtZVwiOiBcIlNoZW5cIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEV5ZSBvZiBUd2lsaWdodFwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlRhbmtcIixcbiAgICAgIFwiTWVsZWVcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU0MCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA3MyxcbiAgICAgIFwibXBcIjogNDAwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDAsXG4gICAgICBcImFybW9yXCI6IDI1LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDIuNixcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDguNSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNzUsXG4gICAgICBcIm1wcmVnZW5cIjogNTAsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNjAsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9TaGVuLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDAsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnVGhlIEV5ZSBpcyBibGluZCB0byBmZWFyLCB0byBoYXRlLCB0byBsb3ZlIC0gdG8gYWxsIHRoaW5ncyB0aGF0IHdvdWxkIHN3YXkgZXF1aWxpYnJpdW0uJyc8YnI+PGJyPkxlYWRlciBvZiBhIHNlY3JldCBjbGFuIG9mIG15c3RpYyB3YXJyaW9ycywgU2hlbiBzZXJ2ZXMgYXMgdGhlIEV5ZSBvZiBUd2lsaWdodCwgZW50cnVzdGVkIHRvIGVuZm9yY2UgZXF1aWxpYnJpdW0gaW4gdGhlIHdvcmxkLiBMb25naW5nIHRvIHJlbWFpbiBmcmVlIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwic2h5dmFuYVwiLFxuICAgIFwia2V5XCI6IFwiMTAyXCIsXG4gICAgXCJuYW1lXCI6IFwiU2h5dmFuYVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgSGFsZi1EcmFnb25cIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIlRhbmtcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU5NC42LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDk1LFxuICAgICAgXCJtcFwiOiAxMDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM1MCxcbiAgICAgIFwiYXJtb3JcIjogMjcuNjI4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuMzUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA4LjU5LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJtcHJlZ2VuXCI6IDAsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNjAuNzEyLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjQsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA1LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuNVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9TaHl2YW5hLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQ4LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJBIGhhbGYtYnJlZWQgYm9ybiBmcm9tIHRoZSB1bmlvbiBiZXR3ZWVuIGRyYWdvbiBhbmQgaHVtYW4sIFNoeXZhbmEgc2VhcmNoZWQgYWxsIGhlciBsaWZlIGZvciBiZWxvbmdpbmcuIFBlcnNlY3V0aW9uIGZvcmdlZCBoZXIgaW50byBhIGJydXRhbCB3YXJyaW9yLCBhbmQgdGhvc2Ugd2hvIGRhcmUgc3RhbmQgYWdhaW5zdCBTaHl2YW5hIGZhY2UgdGhlIGZpZXJ5IGJlYXN0IGx1cmtpbmcganVzdCBiZW5lYXRoIGhlciBza2luLi4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwic2luZ2VkXCIsXG4gICAgXCJrZXlcIjogXCIyN1wiLFxuICAgIFwibmFtZVwiOiBcIlNpbmdlZFwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgTWFkIENoZW1pc3RcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJUYW5rXCIsXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU0Mi43NixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MixcbiAgICAgIFwibXBcIjogMjkwLjYsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDUsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDUsXG4gICAgICBcImFybW9yXCI6IDI3Ljg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDguMDIsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuNTIsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNjIuMzIsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMzc1LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLjAyLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDEuODFcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vU2luZ2VkLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDk2LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJTaW5nZWQgZGVzY2VuZGVkIGZyb20gYSBsb25nIGxpbmUgb2YgWmF1bidzIHJldmVyZWQgY2hlbWlzdHMuIEV2ZW4gaW4gaGlzIHlvdXRoLCBoaXMgdGFsZW50IGZvciBjb25jb2N0aW5nIHBvdGlvbnMgZmFyIG91dHN0cmlwcGVkIHRoYXQgb2YgaGlzIHBlZXJzLCBhbmQgaGUgcXVpY2tseSBkaXN0aW5ndWlzaGVkIGhpbXNlbGYgZnJvbSBoaXMgbGVzcyBleHRyYW9yZGluYXJ5IGNoZW1pc3QgY29tcGF0cmlvdHMuIEl0IGNhbWUgYXMgbm8gLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJzaW9uXCIsXG4gICAgXCJrZXlcIjogXCIxNFwiLFxuICAgIFwibmFtZVwiOiBcIlNpb25cIixcbiAgICBcInRpdGxlXCI6IFwiVGhlIFVuZGVhZCBKdWdnZXJuYXV0XCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiVGFua1wiLFxuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NDIuNjQsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNzMsXG4gICAgICBcIm1wXCI6IDMyNS42LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQyLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQ1LFxuICAgICAgXCJhcm1vclwiOiAyMy4wNCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxNzUsXG4gICAgICBcImhwcmVnZW5cIjogMTAuMTgsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcIm1wcmVnZW5cIjogOC4wMDUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjYsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1OS43MixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogNCxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDgsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMS4zXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1Npb24ucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogMTQ0LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJCTE9PRC48YnI+PGJyPlNNRUxMIElULjxicj48YnI+V0FOVC4gQUNISU5HLiBORUVEITxicj48YnI+Q0xPU0UgTk9XLiBUSEVZIENPTUUuPGJyPjxicj5OTyBDSEFJTlM/IEZSRUUhIEtJTEwhPGJyPjxicj5JTiBSRUFDSC4gWUVTISBESUUhIERJRSE8YnI+PGJyPkdvbmUuIFRvbyBxdWljay4gTm8gZmlnaHQuIE1vcmUuIEkgd2FudC4uLiBtb3JlLjxicj48YnI+QSB2b2ljZT8gVW5mYW1pbGlhci4gSSBzZWUgaGltLiBUaGUgR3JhbmQgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJzaXZpclwiLFxuICAgIFwia2V5XCI6IFwiMTVcIixcbiAgICBcIm5hbWVcIjogXCJTaXZpclwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgQmF0dGxlIE1pc3RyZXNzXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFya3NtYW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUxNS43NixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MixcbiAgICAgIFwibXBcIjogMjg0LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDUwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAyMi4yMSxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjI1LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTAwLFxuICAgICAgXCJocHJlZ2VuXCI6IDUuMTcsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDguMDEsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjksXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1Ny40NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMi40MSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAxLjZcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vU2l2aXIucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogMTkyLFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ0kgZG9uJ3QgY2FyZSB3aGF0IGZhY2UgaXMgb24geW91ciBjb2luLCBhcyBsb25nIGFzIGl0IHBheXMuJyc8YnI+PGJyPlNpdmlyIGlzIGEgcmVub3duZWQgZm9ydHVuZSBodW50ZXIgYW5kIG1lcmNlbmFyeSBjYXB0YWluIHdobyBwbGllcyBoZXIgdHJhZGUgaW4gdGhlIGRlc2VydHMgb2YgU2h1cmltYS4gQXJtZWQgd2l0aCBoZXIgbGVnZW5kYXJ5IGpld2VsZWQgY3Jvc3NibGFkZSwgc2hlIGhhcyBmb3VnaHQgYW5kIHdvbiAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInNrYXJuZXJcIixcbiAgICBcImtleVwiOiBcIjcyXCIsXG4gICAgXCJuYW1lXCI6IFwiU2thcm5lclwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgQ3J5c3RhbCBWYW5ndWFyZFwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiVGFua1wiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNjAxLjI4LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDkwLFxuICAgICAgXCJtcFwiOiAyNzIuMixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMjkuMzg0LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuOCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDguOTI1LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC44NSxcbiAgICAgIFwibXByZWdlblwiOiA3LjIwNSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNDUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1Ny4xNTYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDQuNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjFcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vU2thcm5lci5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiAyNDAsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnV2UgYXJlIG9uZS4gV2UgY2Fubm90IGJlIHNoYXR0ZXJlZC4nJzxicj48YnI+U2thcm5lciBpcyBhbiBpbW1lbnNlIGNyeXN0YWxsaW5lIHNjb3JwaW9uIGZyb20gYSBoaWRkZW4gdmFsbGV5IGluIFNodXJpbWEuIFBhcnQgb2YgdGhlIGFuY2llbnQgQnJhY2tlcm4gcmFjZSwgU2thcm5lciBhbmQgaGlzIGtpbiBhcmUga25vd24gZm9yIHRoZWlyIGdyZWF0IHdpc2RvbSBhbmQgZGVlcCBjb25uZWN0aW9uIHRvIHRoZSBsYW5kLCBhcyAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInNvbmFcIixcbiAgICBcImtleVwiOiBcIjM3XCIsXG4gICAgXCJuYW1lXCI6IFwiU29uYVwiLFxuICAgIFwidGl0bGVcIjogXCJNYXZlbiBvZiB0aGUgU3RyaW5nc1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlN1cHBvcnRcIixcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNDgyLjM2LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDc3LFxuICAgICAgXCJtcFwiOiAzNDAuNixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0NSxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMyNSxcbiAgICAgIFwiYXJtb3JcIjogMjAuNTQ0LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuMyxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDU1MCxcbiAgICAgIFwiaHByZWdlblwiOiA1LjQyLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiAxMS41LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC40LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTAuMDQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjAzLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuM1xuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9Tb25hLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDI4OCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiU29uYSBoYXMgbm8gbWVtb3JpZXMgb2YgaGVyIHRydWUgcGFyZW50cy4gQXMgYW4gaW5mYW50LCBzaGUgd2FzIGZvdW5kIGFiYW5kb25lZCBvbiB0aGUgZG9vcnN0ZXAgb2YgYW4gSW9uaWFuIGFkb3B0aW9uIGhvdXNlLCBuZXN0bGVkIGF0b3AgYW4gYW5jaWVudCBpbnN0cnVtZW50IGluIGFuIGV4cXVpc2l0ZSBjYXNlIG9mIHVua25vd24gb3JpZ2lucy4gU2hlIHdhcyBhbiB1bnVzdWFsbHkgd2VsbC1iZWhhdmVkIGNoaWxkLCBhbHdheXMgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJzb3Jha2FcIixcbiAgICBcImtleVwiOiBcIjE2XCIsXG4gICAgXCJuYW1lXCI6IFwiU29yYWthXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBTdGFyY2hpbGRcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJTdXBwb3J0XCIsXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUyOS4wNCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA3OCxcbiAgICAgIFwibXBcIjogMzUwLjgsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNjAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMjUsXG4gICAgICBcImFybW9yXCI6IDIzLjM4NCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjgsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1NTAsXG4gICAgICBcImhwcmVnZW5cIjogMi41LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41LFxuICAgICAgXCJtcHJlZ2VuXCI6IDExLjUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjQsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1MC4wNCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjE0XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1NvcmFrYS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiAzMzYsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkEgaGVhbGVyIGdpZnRlZCB3aXRoIHRoZSBtYWdpYyBvZiB0aGUgc3RhcnMsIFNvcmFrYSBob2xkcyBhbGwgbGl2aW5nIGNyZWF0dXJlcyBjbG9zZSB0byBoZXIgaGVhcnQuIFNoZSB3YXMgb25jZSBhIGNlbGVzdGlhbCBiZWluZywgYnV0IHNoZSBzYWNyaWZpY2VkIGhlciBpbW1vcnRhbGl0eSBhbmQgZW50ZXJlZCB0aGUgd29ybGQgb2YgbW9ydGFscy4gU28gbG9uZyBhcyBldmlsIHRocmVhdGVucyBsaWZlIGluIFZhbG9yYW4sIFNvcmFrYSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInN3YWluXCIsXG4gICAgXCJrZXlcIjogXCI1MFwiLFxuICAgIFwibmFtZVwiOiBcIlN3YWluXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBNYXN0ZXIgVGFjdGljaWFuXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiLFxuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MTYuMDQsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTAsXG4gICAgICBcIm1wXCI6IDM3NCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0NyxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMjIuNzIsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogNCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDUwMCxcbiAgICAgIFwiaHByZWdlblwiOiA3Ljg0LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42NSxcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTIuMDQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi4xMVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9Td2Fpbi5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiAzODQsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRoZSBlYXJsaWVzdCBhY2NvdW50IG9mIFN3YWluJ3MgZXhpc3RlbmNlIGNvbWVzIGZyb20gYSBOb3hpYW4gaW5maXJtYXJ5IGRvY3RvcidzIG5vdGVzLiBBY2NvcmRpbmcgdG8gdGhlbSwgU3dhaW4gbGltcGVkIGludG8gdGhlIHdhcmQgd2l0aG91dCBjcnkgb3IgY29tcGxhaW50OyBoaXMgcmlnaHQgbGVnIHdhcyBzbmFwcGVkIGluIGhhbGYsIHdpdGggYm9uZSBwcm90cnVkaW5nIGZyb20gdGhlIHNraW4uIEEgc21hbGwsIHNjb3dsaW5nIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwic3luZHJhXCIsXG4gICAgXCJrZXlcIjogXCIxMzRcIixcbiAgICBcIm5hbWVcIjogXCJTeW5kcmFcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIERhcmsgU292ZXJlaWduXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiLFxuICAgICAgXCJTdXBwb3J0XCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MTEuMDQsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNzgsXG4gICAgICBcIm1wXCI6IDM4NCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA2MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzMCxcbiAgICAgIFwiYXJtb3JcIjogMjQuNzEyLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDU1MCxcbiAgICAgIFwiaHByZWdlblwiOiA2LjUwNSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNixcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTMuODcyLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAyLjksXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9TeW5kcmEucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogNDMyLFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJCb3JuIHdpdGggaW1tZW5zZSBtYWdpY2FsIHBvdGVudGlhbCwgU3luZHJhIGxvdmVzIG5vdGhpbmcgbW9yZSB0aGFuIGV4ZXJjaXNpbmcgdGhlIGluY3JlZGlibGUgcG93ZXIgYXQgaGVyIGNvbW1hbmQuIFdpdGggZWFjaCBwYXNzaW5nIGRheSwgaGVyIG1hc3Rlcnkgb2YgbWFnaWNhbCBmb3JjZSBncm93cyBtb3JlIHBvdGVudCBhbmQgZGV2YXN0YXRpbmcuIFJlZnVzaW5nIGFueSBub3Rpb24gb2YgYmFsYW5jZSBvciByZXN0cmFpbnQsIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidGFobWtlbmNoXCIsXG4gICAgXCJrZXlcIjogXCIyMjNcIixcbiAgICBcIm5hbWVcIjogXCJUYWhtIEtlbmNoXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBSaXZlciBLaW5nXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiU3VwcG9ydFwiLFxuICAgICAgXCJUYW5rXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA2MTAsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTUsXG4gICAgICBcIm1wXCI6IDMyNSxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMjcsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxNzUsXG4gICAgICBcImhwcmVnZW5cIjogNi41LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA4LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjIsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi41XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1RhaG1LZW5jaC5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiAwLFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydUaGUgd2hvbGUgd29ybGQncyBhIHJpdmVyLCBhbmQgSSdtIGl0cyBraW5nLicnPGJyPlRhaG0gS2VuY2ggdHJhdmVscyBSdW5ldGVycmEncyB3YXRlcndheXMsIGZlZWRpbmcgaGlzIGluc2F0aWFibGUgYXBwZXRpdGUgd2l0aCB0aGUgbWlzZXJ5IG9mIHRoZSB1bnN1c3BlY3RpbmcuIFRoZSBzaW5ndWxhcmx5IGNoYXJtaW5nIGdvdXJtYW5kIHNhdm9ycyBldmVyeSBtb21lbnQgb2YgaGlzIHZpY3RpbXMnIHN1ZmZlcmluZy4gIEEgZGVhbCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInRhbGl5YWhcIixcbiAgICBcImtleVwiOiBcIjE2M1wiLFxuICAgIFwibmFtZVwiOiBcIlRhbGl5YWhcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFN0b25ld2VhdmVyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiLFxuICAgICAgXCJTdXBwb3J0XCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MjAsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNzUsXG4gICAgICBcIm1wXCI6IDM0MCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA2MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMyNSxcbiAgICAgIFwiYXJtb3JcIjogMjAsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMyxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDUyNSxcbiAgICAgIFwiaHByZWdlblwiOiA3LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC43LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjg1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAxLjM2XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1RhbGl5YWgucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogNDgsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUYWxpeWFoIGlzIGEgbm9tYWRpYyBtYWdlIGZyb20gU2h1cmltYSB3aG8gd2VhdmVzIHN0b25lIHdpdGggZW5lcmdldGljIGVudGh1c2lhc20gYW5kIHJhdyBkZXRlcm1pbmF0aW9uLiBUb3JuIGJldHdlZW4gdGVlbmFnZSB3b25kZXIgYW5kIGFkdWx0IHJlc3BvbnNpYmlsaXR5LCBzaGUgaGFzIGNyb3NzZWQgbmVhcmx5IGFsbCBvZiBWYWxvcmFuIG9uIGEgam91cm5leSB0byBsZWFybiB0aGUgdHJ1ZSBuYXR1cmUgb2YgaGVyIGdyb3dpbmcgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ0YWxvblwiLFxuICAgIFwia2V5XCI6IFwiOTFcIixcbiAgICBcIm5hbWVcIjogXCJUYWxvblwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgQmxhZGUncyBTaGFkb3dcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJBc3Nhc3NpblwiLFxuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1ODIuOCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NSxcbiAgICAgIFwibXBcIjogMzc3LjIsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMzcsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNTAsXG4gICAgICBcImFybW9yXCI6IDI2Ljg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDguNTEsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjc1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuNTksXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NS4yMDgsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDY1LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuN1xuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9UYWxvbi5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiA5NixcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnVGhlIHRocmVlIGRlYWRsaWVzdCBibGFkZW1hc3RlcnMgaW4gYWxsIG9mIFZhbG9yYW4gYXJlIGJvdW5kIHRvIHRoZSBob3VzZSBvZiBEdSBDb3V0ZWF1OiBteSBmYXRoZXIsIG15c2VsZiwgYW5kIFRhbG9uLiBDaGFsbGVuZ2UgdXMsIGlmIHlvdSBkYXJlLicnPGJyPi0tIEthdGFyaW5hIER1IENvdXRlYXU8YnI+PGJyPlRhbG9uJ3MgZWFybGllc3QgbWVtb3JpZXMgYXJlIHRoZSBkYXJrbmVzcyBvZiBOb3h1cycgdW5kZXJncm91bmQgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ0YXJpY1wiLFxuICAgIFwia2V5XCI6IFwiNDRcIixcbiAgICBcIm5hbWVcIjogXCJUYXJpY1wiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgU2hpZWxkIG9mIFZhbG9yYW5cIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJTdXBwb3J0XCIsXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU3NSxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5MCxcbiAgICAgIFwibXBcIjogMzAwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDYwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQwLFxuICAgICAgXCJhcm1vclwiOiAyNSxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjQsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDE1MCxcbiAgICAgIFwiaHByZWdlblwiOiA2LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41LFxuICAgICAgXCJtcHJlZ2VuXCI6IDUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAxLFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTUsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1RhcmljLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDE0NCxcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnVGhlIGJlc3Qgd2VhcG9ucyBhcmUgYmVhdXRpZnVsLicnPGJyPjxicj5UYXJpYyBpcyB0aGUgQXNwZWN0IG9mIHRoZSBQcm90ZWN0b3IsIHdpZWxkaW5nIGluY3JlZGlibGUgcG93ZXIgYXMgUnVuZXRlcnJhJ3MgZ3VhcmRpYW4gb2YgbGlmZSwgbG92ZSwgYW5kIGJlYXV0eS4gU2hhbWVkIGJ5IGEgZGVyZWxpY3Rpb24gb2YgZHV0eSBhbmQgZXhpbGVkIGZyb20gaGlzIGhvbWVsYW5kIERlbWFjaWEsIFRhcmljIGFzY2VuZGVkIE1vdW50IC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidGVlbW9cIixcbiAgICBcImtleVwiOiBcIjE3XCIsXG4gICAgXCJuYW1lXCI6IFwiVGVlbW9cIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFN3aWZ0IFNjb3V0XCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFya3NtYW5cIixcbiAgICAgIFwiQXNzYXNzaW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUxNS43NixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MixcbiAgICAgIFwibXBcIjogMjY3LjIsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzAsXG4gICAgICBcImFybW9yXCI6IDI0LjMsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy43NSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDUwMCxcbiAgICAgIFwiaHByZWdlblwiOiA1Ljc0LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42NSxcbiAgICAgIFwibXByZWdlblwiOiA3LjIwNSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNDUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA0OS41NCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDk0NyxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzLjM4XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1RlZW1vLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDE5MixcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRlZW1vIGlzIGEgbGVnZW5kIGFtb25nIGhpcyB5b3JkbGUgYnJvdGhlcnMgYW5kIHNpc3RlcnMgaW4gQmFuZGxlIENpdHkuIEFzIGZhciBhcyB5b3JkbGVzIGFyZSBjb25jZXJuZWQsIHRoZXJlIGlzIHNvbWV0aGluZyBqdXN0IHNsaWdodGx5IG9mZiBhYm91dCBoaW0uIFdoaWxlIFRlZW1vIGVuam95cyB0aGUgY29tcGFuaW9uc2hpcCBvZiBvdGhlciB5b3JkbGVzLCBoZSBhbHNvIGluc2lzdHMgb24gZnJlcXVlbnQgc29sbyBtaXNzaW9ucyAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInRocmVzaFwiLFxuICAgIFwia2V5XCI6IFwiNDEyXCIsXG4gICAgXCJuYW1lXCI6IFwiVGhyZXNoXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBDaGFpbiBXYXJkZW5cIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJTdXBwb3J0XCIsXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU2MC41MixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5MyxcbiAgICAgIFwibXBcIjogMjczLjkyLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQ0LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAxNixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNDUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDYuOTIsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA0Ny42OTYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDIuMixcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzLjVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vVGhyZXNoLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDI0MCxcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnVGhlIG1pbmQgaXMgYSB3b25kcm91cyB0aGluZyB0byB0ZWFyIGFwYXJ0LicnPGJyPjxicj5TYWRpc3RpYyBhbmQgY3VubmluZywgVGhyZXNoIGlzIGEgcmVzdGxlc3Mgc3Bpcml0IHdobyBwcmlkZXMgaGltc2VsZiBvbiB0b3JtZW50aW5nIG1vcnRhbHMgYW5kIGJyZWFraW5nIHRoZW0gd2l0aCBzbG93LCBleGNydWNpYXRpbmcgaW52ZW50aXZlbmVzcy4gSGlzIHZpY3RpbXMgc3VmZmVyIGZhciBiZXlvbmQgdGhlIHBvaW50IG9mIGRlYXRoLC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidHJpc3RhbmFcIixcbiAgICBcImtleVwiOiBcIjE4XCIsXG4gICAgXCJuYW1lXCI6IFwiVHJpc3RhbmFcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFlvcmRsZSBHdW5uZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYXJrc21hblwiLFxuICAgICAgXCJBc3Nhc3NpblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTQyLjc2LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgyLFxuICAgICAgXCJtcFwiOiAyNDYuNzYsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMzIsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMjUsXG4gICAgICBcImFybW9yXCI6IDIyLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1NTAsXG4gICAgICBcImhwcmVnZW5cIjogNi4xOSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNjUsXG4gICAgICBcIm1wcmVnZW5cIjogNy4yMDUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjQ1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTYuOTYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDIuNDEsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA0NzM0LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDEuNVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9UcmlzdGFuYS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiAyODgsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJHcmVhdG5lc3MgY29tZXMgaW4gYWxsIHNoYXBlcyBhbmQgc2l6ZXMsIGFzIHByb3ZlbiBieSB0aGlzIGRpbWludXRpdmUsIGNhbm5vbi13aWVsZGluZ8KgeW9yZGxlLiBJbiBhIHdvcmxkIGZyYXVnaHQgd2l0aCB0dXJtb2lsLCBUcmlzdGFuYSByZWZ1c2VzIHRvIGJhY2sgZG93biBmcm9tIGFueSBjaGFsbGVuZ2UuIFNoZSByZXByZXNlbnRzIHRoZSBwaW5uYWNsZSBvZiBtYXJ0aWFsIHByb2ZpY2llbmN5LCB1bndhdmVyaW5nIGNvdXJhZ2UsIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidHJ1bmRsZVwiLFxuICAgIFwia2V5XCI6IFwiNDhcIixcbiAgICBcIm5hbWVcIjogXCJUcnVuZGxlXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBUcm9sbCBLaW5nXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJUYW5rXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA2MTYuMjgsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTYsXG4gICAgICBcIm1wXCI6IDI4MS42LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQ1LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzUwLFxuICAgICAgXCJhcm1vclwiOiAyNy41MzYsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMi43LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxNzUsXG4gICAgICBcImhwcmVnZW5cIjogNixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNzUsXG4gICAgICBcIm1wcmVnZW5cIjogNy41MDUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjYsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA2MC4wNCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDY3MixcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjlcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vVHJ1bmRsZS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiAzMzYsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUcnVuZGxlIGlzIGEgaHVsa2luZyBhbmQgZGV2aW91cyB0cm9sbCB3aXRoIGEgbWlzY2hpZXZvdXMgc3RyZWFrLiBUaGVyZSBpcyBub3RoaW5nIGhlIGNhbid0IGJlYXQgaW50byBzdWJtaXNzaW9uIGFuZCBiZW5kIHRvIGhpcyB3aWxsLCBub3QgZXZlbiB0aGUgaWNlIGl0c2VsZi4gV2l0aCBoaXMgbWFzc2l2ZSwgZnJvemVuIGNsdWIsIGhlIGNoaWxscyBoaXMgZW5lbWllcyB0byB0aGUgY29yZSBhbmQgcnVucyB0aGVtIHRocm91Z2ggd2l0aCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInRyeW5kYW1lcmVcIixcbiAgICBcImtleVwiOiBcIjIzXCIsXG4gICAgXCJuYW1lXCI6IFwiVHJ5bmRhbWVyZVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgQmFyYmFyaWFuIEtpbmdcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIkFzc2Fzc2luXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA2MjUuNjQsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTgsXG4gICAgICBcIm1wXCI6IDEwMCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQ1LFxuICAgICAgXCJhcm1vclwiOiAyNC4xMDgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy4xLFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOC41MSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuOSxcbiAgICAgIFwibXByZWdlblwiOiAwLFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDYxLjM3NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4yLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNjcyLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuOVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9UcnluZGFtZXJlLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDM4NCxcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkZ1ZWxlZCBieSBoaXMgdW5icmlkbGVkIGZ1cnkgYW5kIHJhZ2UsIFRyeW5kYW1lcmUgY3V0cyBoaXMgd2F5IHRocm91Z2ggdGhlIHR1bmRyYSwgbWFzdGVyaW5nIHRoZSBhcnQgb2YgYmF0dGxlIGJ5IGNoYWxsZW5naW5nIHRoZSBGcmVsam9yZCdzIGdyZWF0ZXN0IHdhcnJpb3JzLiBUaGUgd3JhdGhmdWwgYmFyYmFyaWFuIHNlZWtzIHJldmVuZ2Ugb24gdGhlIG9uZSB3aG8gZGVjaW1hdGVkIGhpcyBjbGFuIGFuZCBzdHJpa2VzIGRvd24gYWxsIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidHdpc3RlZGZhdGVcIixcbiAgICBcImtleVwiOiBcIjRcIixcbiAgICBcIm5hbWVcIjogXCJUd2lzdGVkIEZhdGVcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIENhcmQgTWFzdGVyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTIxLjc2LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgyLFxuICAgICAgXCJtcFwiOiAyNjUuODQsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMzgsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzAsXG4gICAgICBcImFybW9yXCI6IDIwLjU0MixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjE1LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDUuNTA1LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA0OS45NTQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDQsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMy4yMlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9Ud2lzdGVkRmF0ZS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiA0MzIsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUd2lzdGVkIEZhdGUgaXMgYW4gaW5mYW1vdXMgY2FyZCBzaGFycCBhbmQgc3dpbmRsZXIgd2hvIGhhcyBnYW1ibGVkIGFuZCBjaGFybWVkIGhpcyB3YXkgYWNyb3NzIG11Y2ggb2YgdGhlIGtub3duIHdvcmxkLCBlYXJuaW5nIHRoZSBlbm1pdHkgYW5kIGFkbWlyYXRpb24gb2YgdGhlIHJpY2ggYW5kIGZvb2xpc2ggYWxpa2UuIEhlIHJhcmVseSB0YWtlcyB0aGluZ3Mgc2VyaW91c2x5LCBncmVldGluZyBlYWNoIGRheSB3aXRoIGEgbW9ja2luZyAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInR3aXRjaFwiLFxuICAgIFwia2V5XCI6IFwiMjlcIixcbiAgICBcIm5hbWVcIjogXCJUd2l0Y2hcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFBsYWd1ZSBSYXRcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYXJrc21hblwiLFxuICAgICAgXCJBc3Nhc3NpblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTI1LjA4LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgxLFxuICAgICAgXCJtcFwiOiAyODcuMixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzMCxcbiAgICAgIFwiYXJtb3JcIjogMjMuMDQsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMyxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDU1MCxcbiAgICAgIFwiaHByZWdlblwiOiA2LjAwNSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNixcbiAgICAgIFwibXByZWdlblwiOiA3LjI1NSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNDUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NS40NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMi40MSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDgsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMy4zOFxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9Ud2l0Y2gucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogMCxcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkguSS5WLkUuIEluY2lkZW50IFJlcG9ydDxicj5Db2RlIFZpb2xhdGlvbjogSW5kdXN0cmlhbCBIb21pY2lkZTxicj5DYXNlZmlsZSBTdGF0dXM6IFVuc29sdmVkPGJyPkludmVzdGlnYXRpbmcgQWdlbnQ6IFJvbCwgUC48YnI+PGJyPlRlYW0gcmVzcG9uZGVkIHRvIHJlcG9ydCBvZiBzdXNwaWNpb3VzIGNoYXJhY3RlciwgY3JpbWluYWwgYWN0aXZpdHk7IHByb2NlZWRlZCB0byBTdW1wIFdvcmtzLCBTZWN0b3IgOTBUWi4gU2VjdG9yIDkwVFogLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ1ZHlyXCIsXG4gICAgXCJrZXlcIjogXCI3N1wiLFxuICAgIFwibmFtZVwiOiBcIlVkeXJcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFNwaXJpdCBXYWxrZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIlRhbmtcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU5My4zMixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5OSxcbiAgICAgIFwibXBcIjogMjcwLjQsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMzAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDUsXG4gICAgICBcImFybW9yXCI6IDI1LjQ3LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDQsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA2LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC43NSxcbiAgICAgIFwibXByZWdlblwiOiA3LjUwNSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNDUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1OC4yODYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMixcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDUsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi42N1xuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9VZHlyLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQ4LFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVWR5ciBpcyBtb3JlIHRoYW4gYSBtYW47IGhlIGlzIGEgdmVzc2VsIGZvciB0aGUgdW50YW1lZCBwb3dlciBvZiBmb3VyIHByaW1hbCBhbmltYWwgc3Bpcml0cy4gV2hlbiB0YXBwaW5nIGludG8gdGhlIHNwaXJpdHMnIGJlc3RpYWwgbmF0dXJlcywgVWR5ciBjYW4gaGFybmVzcyB0aGVpciB1bmlxdWUgc3RyZW5ndGhzOiB0aGUgdGlnZXIgZ3JhbnRzIGhpbSBzcGVlZCBhbmQgZmVyb2NpdHksIHRoZSB0dXJ0bGUgcmVzaWxpZW5jZSwgdGhlIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidXJnb3RcIixcbiAgICBcImtleVwiOiBcIjZcIixcbiAgICBcIm5hbWVcIjogXCJVcmdvdFwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgSGVhZHNtYW4ncyBQcmlkZVwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hcmtzbWFuXCIsXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU4Ni41MixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4OSxcbiAgICAgIFwibXBcIjogMzEyLjQsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNTUsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDI0LjU0NCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjMsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA0MjUsXG4gICAgICBcImhwcmVnZW5cIjogNi41MDUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjYsXG4gICAgICBcIm1wcmVnZW5cIjogOC41OSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNjUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NC4wNSxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy42LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjlcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vVXJnb3QucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogOTYsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUaGVyZSBhcmUgd2FycmlvcnMgd2hvIGJlY29tZSBncmVhdCBmb3IgdGhlaXIgc3RyZW5ndGgsIGN1bm5pbmcsIG9yIHNraWxsIHdpdGggYXJtcy4gT3RoZXJzIHNpbXBseSByZWZ1c2UgdG8gZGllLiBVcmdvdCwgb25jZSBhIGdyZWF0IHNvbGRpZXIgb2YgTm94dXMsIG1heSBjb25zdGl0dXRlIGEgY2FzZSBpbiBzdXBwb3J0IG9mIHRoZSBsYXR0ZXIuIFByb25lIHRvIGRpdmluZyBoZWFkbG9uZyBpbnRvIGVuZW15IGJhdHRsZSBsaW5lcywgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ2YXJ1c1wiLFxuICAgIFwia2V5XCI6IFwiMTEwXCIsXG4gICAgXCJuYW1lXCI6IFwiVmFydXNcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEFycm93IG9mIFJldHJpYnV0aW9uXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFya3NtYW5cIixcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTM3Ljc2LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgyLFxuICAgICAgXCJtcFwiOiAzNjAuNDgsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMzMsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzAsXG4gICAgICBcImFybW9yXCI6IDIzLjIxMixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjQsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1NzUsXG4gICAgICBcImhwcmVnZW5cIjogNS40MixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogNy4zNCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU0LjY2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAyLjQxLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1ZhcnVzLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDE0NCxcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnVGhlIGxpZmUgb2YgYW4gYXJyb3cgaXMgZmxlZXRpbmcsIGJ1aWx0IG9mIG5vdGhpbmcgYnV0IGRpcmVjdGlvbiBhbmQgaW50ZW50LicnPGJyPjxicj5Gb3IgaGlzIGluY29tcGFyYWJsZSBza2lsbCB3aXRoIHRoZSBib3cgYW5kIGhpcyB1bnF1ZXN0aW9uZWQgc2Vuc2Ugb2YgaG9ub3IsIFZhcnVzIHdhcyBjaG9zZW4gdG8gYmUgdGhlIHdhcmRlbiBvZiBhIHNhY3JlZCBJb25pYW4gdGVtcGxlLiBUaGUgdGVtcGxlIHdhcyBidWlsdCB0byAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInZheW5lXCIsXG4gICAgXCJrZXlcIjogXCI2N1wiLFxuICAgIFwibmFtZVwiOiBcIlZheW5lXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBOaWdodCBIdW50ZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYXJrc21hblwiLFxuICAgICAgXCJBc3Nhc3NpblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNDk4LjQ0LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgzLFxuICAgICAgXCJtcFwiOiAyMzEuOCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAzNSxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzMCxcbiAgICAgIFwiYXJtb3JcIjogMTkuMDEyLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDU1MCxcbiAgICAgIFwiaHByZWdlblwiOiA1LjQyLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA2Ljk3LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC40LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTUuODgsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDEuNjYsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA1LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDRcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vVmF5bmUucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogMTkyLFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGhlIHdvcmxkIGlzIG5vdCBhbHdheXMgYXMgY2l2aWxpemVkIGFzIHBlb3BsZSBtaWdodCB0aGluay4gVGhlcmUgYXJlIHN0aWxsIHRob3NlIHdobyB3b3VsZCBmb2xsb3cgdGhlIGJsYWNrZXN0IHBhdGhzIG9mIG1hZ2ljIGFuZCBiZWNvbWUgY29ycnVwdGVkIGJ5IHRoZSBkYXJrZXIgcG93ZXJzIHRoYXQgZmxvdyB0aHJvdWdoIFJ1bmV0ZXJyYS4gU2hhdW5hIFZheW5lIGtub3dzIHRoaXMgZmFjdCB3ZWxsLjxicj48YnI+QXMgYSB5b3VuZyAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInZlaWdhclwiLFxuICAgIFwia2V5XCI6IFwiNDVcIixcbiAgICBcIm5hbWVcIjogXCJWZWlnYXJcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFRpbnkgTWFzdGVyIG9mIEV2aWxcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA0OTIuNzYsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODIsXG4gICAgICBcIm1wXCI6IDM5Mi40LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDUyLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQwLFxuICAgICAgXCJhcm1vclwiOiAyMi41NSxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjc1LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDUuNDIsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1MC43MSxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMi42MjUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi4yNFxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9WZWlnYXIucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogMjQwLFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVG8gbW9zdCwgdGhvdWdodHMgb2YgeW9yZGxlcyBkbyBub3QgY29uanVyZSBpbWFnZXMgdG8gYmUgZmVhcmVkLiBUaGUgZWFzeWdvaW5nIGhhbGYtcGludCByYWNlLCB0aG91Z2ggZmllcmNlLCBpcyBvZnRlbiByZWdhcmRlZCB3aXRoIHNvbWUgZGVncmVlIG9mIGpvdmlhbGl0eS4gVGhlaXIgaGlnaC1waXRjaGVkIHZvaWNlcyBhbmQgbmF0dXJhbGx5IGN1dGUgZm9ybXMgaW5zcGlyZSBzb21ldGhpbmcgb2YgYSBwcm90ZWN0aXZlIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidmVsa296XCIsXG4gICAgXCJrZXlcIjogXCIxNjFcIixcbiAgICBcIm5hbWVcIjogXCJWZWwnS296XCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBFeWUgb2YgdGhlIFZvaWRcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MDcuNjgsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNzYsXG4gICAgICBcIm1wXCI6IDM3NS42LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQyLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQwLFxuICAgICAgXCJhcm1vclwiOiAyMS44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1MjUsXG4gICAgICBcImhwcmVnZW5cIjogNS40MixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU0LjkzNzksXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMTQxNTksXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMS4zNlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9WZWxrb3oucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogMjg4LFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiSSBwYXNzIGludG8gdGhlIHN1ZGRlbiBnbGFyZS4gQmxpbmsuIEJsaW5rLCBibGluaywgYmxpbmsuIE15IGV5ZXMgYWRqdXN0IGFuZCBldmFsdWF0ZSB0aGUgbGFuZHNjYXBlIGJlZm9yZSBtZS48YnI+PGJyPlRoZXJlJ3MgYSBzY3VycnlpbmcuIEkgbG9vayBkb3duIHRvIGZpbmQgYSBzbWFsbCwgd2hpdGUgY3JlYXR1cmUgc3RhbmRpbmcgb24gaXRzIGhpbmQgbGVncywgc25pZmZpbmcgYXQgbXkgYm9keS4gSXQgaW50cmlndWVzIG1lLi4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidmlcIixcbiAgICBcImtleVwiOiBcIjI1NFwiLFxuICAgIFwibmFtZVwiOiBcIlZpXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBQaWx0b3ZlciBFbmZvcmNlclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiQXNzYXNzaW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU4Mi44LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg1LFxuICAgICAgXCJtcFwiOiAyOTUuNixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0NSxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0NSxcbiAgICAgIFwiYXJtb3JcIjogMjUuODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOS4wMSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuOSxcbiAgICAgIFwibXByZWdlblwiOiA4LjA5LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC42NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU1Ljg4LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjAzLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuNVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9WaS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiAzMzYsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUbyBWaSwgZXZlcnkgcHJvYmxlbSBpcyBqdXN0IGFub3RoZXIgYnJpY2sgd2FsbCB0byBwdW5jaCB0aHJvdWdoIHdpdGggaGVyIGdpZ2FudGljIGhleHRlY2ggZ2F1bnRsZXRzLiBUaG91Z2ggc2hlIGdyZXcgdXAgb24gdGhlIHdyb25nIHNpZGUgb2YgdGhlIGxhdywgVmkgbm93IHVzZXMgaGVyIGNyaW1pbmFsIGtub3ctaG93IHRvIHNlcnZlIFBpbHRvdmVyJ3MgcG9saWNlIGZvcmNlLiBWaSdzIGJyYXNoIGF0dGl0dWRlLCBhYnJhc2l2ZSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInZpa3RvclwiLFxuICAgIFwia2V5XCI6IFwiMTEyXCIsXG4gICAgXCJuYW1lXCI6IFwiVmlrdG9yXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBNYWNoaW5lIEhlcmFsZFwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUxNi4wNCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA3OCxcbiAgICAgIFwibXBcIjogMzI0LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDUwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAyMi43MixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiA0LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDcuODQsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjY1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1Mi4wNCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDUsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi4xMVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9WaWt0b3IucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogMzg0LFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiRWFybHkgaW4gbGlmZSwgVmlrdG9yIGRpc2NvdmVyZWQgaGlzIHBhc3Npb24gZm9yIHNjaWVuY2UgYW5kIGludmVudGlvbiwgcGFydGljdWxhcmx5IGluIHRoZSBmaWVsZCBvZiBtZWNoYW5pY2FsIGF1dG9tYXRpb24uIEhlIGF0dGVuZGVkIFphdW4ncyBwcmVzdGlnaW91cyBDb2xsZWdlIG9mIFRlY2htYXR1cmd5IGFuZCBsZWQgdGhlIHRlYW0gdGhhdCBjb25zdHJ1Y3RlZCBCbGl0emNyYW5rIC0gYSBzY2llbnRpZmljIGJyZWFrdGhyb3VnaCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInZsYWRpbWlyXCIsXG4gICAgXCJrZXlcIjogXCI4XCIsXG4gICAgXCJuYW1lXCI6IFwiVmxhZGltaXJcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIENyaW1zb24gUmVhcGVyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiLFxuICAgICAgXCJUYW5rXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MjUsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODQsXG4gICAgICBcIm1wXCI6IDIsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzMCxcbiAgICAgIFwiYXJtb3JcIjogMjMsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy4zLFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNDUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDcuMDA1LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42LFxuICAgICAgXCJtcHJlZ2VuXCI6IDAsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTIsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9WbGFkaW1pci5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiA0MzIsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUaGVyZSBpcyBhIHRlbXBsZSBoaWRkZW4gaW4gdGhlIG1vdW50YWlucyBiZXR3ZWVuIE5veHVzIGFuZCB0aGUgVGVtcGVzdCBGbGF0cywgd2hlcmUgdGhlIHNlY3JldHMgb2YgYW4gYW5jaWVudCBhbmQgdGVycmlmeWluZyBzb3JjZXJ5IGFyZSBrZXB0LiBUaGUgYXJlYSBzdXJyb3VuZGluZyB0aGUgdGVtcGxlIGlzIGxpdHRlcmVkIHdpdGggdGhlIGV4c2FuZ3VpbmF0ZWQgY29ycHNlcyBvZiB0aG9zZSB3aG8gaGF2ZSBtaXN0YWtlbmx5IC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidm9saWJlYXJcIixcbiAgICBcImtleVwiOiBcIjEwNlwiLFxuICAgIFwibmFtZVwiOiBcIlZvbGliZWFyXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBUaHVuZGVyJ3MgUm9hclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiVGFua1wiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTg0LjQ4LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg2LFxuICAgICAgXCJtcFwiOiAyNzAuNCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAzMCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0NSxcbiAgICAgIFwiYXJtb3JcIjogMjYuMzgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOC4wOSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNjUsXG4gICAgICBcIm1wcmVnZW5cIjogOC4wOSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNjUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1OS41NDQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDUsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi42N1xuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9Wb2xpYmVhci5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uNC5wbmdcIixcbiAgICAgIFwieFwiOiAwLFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUaGUgdW5mb3JnaXZpbmcgbm9ydGhlcm4gcmVhY2hlcyBvZiB0aGUgRnJlbGpvcmQgYXJlIGhvbWUgdG8gdGhlIFVyc2luZSwgYSBmaWVyY2UgYW5kIHdhcmxpa2UgcmFjZSB0aGF0IGhhcyBlbmR1cmVkIHRoZSBiYXJyZW4gdHVuZHJhIGZvciB0aG91c2FuZHMgb2YgeWVhcnMuIFRoZWlyIGxlYWRlciBpcyBhIGZ1cmlvdXMgYWR2ZXJzYXJ5IHdobyBjb21tYW5kcyB0aGUgZm9yY2Ugb2YgbGlnaHRuaW5nIHRvIHN0cmlrZSBmZWFyIHdpdGhpbiAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIndhcndpY2tcIixcbiAgICBcImtleVwiOiBcIjE5XCIsXG4gICAgXCJuYW1lXCI6IFwiV2Fyd2lja1wiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgQmxvb2QgSHVudGVyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJUYW5rXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1OTIuNjQsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTgsXG4gICAgICBcIm1wXCI6IDI0MC40LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDMwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQ1LFxuICAgICAgXCJhcm1vclwiOiAyNS44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA4LjM5LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJtcHJlZ2VuXCI6IDguMTA1LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC42LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNjIuNDMsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMzc1LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wOCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjg4XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1dhcndpY2sucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjQucG5nXCIsXG4gICAgICBcInhcIjogNDgsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIldhcndpY2sgd2FzIG9uY2UgYSBtYW4gcmV2ZXJlZCBmb3IgaGlzIGFiaWxpdHkgdG8gdHJhY2sgZG93biBodW1hbiBzcGVjaW1lbnMgZm9yIHRoZSBkYXJrZXN0IHR5cGVzIG9mIHNjaWVudGlmaWMgcmVzZWFyY2guIFdoZW4gaGlzIGFtYml0aW9ucyBleGNlZWRlZCBoaXMgcGh5c2ljYWwgbGltaXRzLCBoZSBkcmFuayBhIGRhbmdlcm91cyBlbGl4aXIgdG8gdHJhbnNmb3JtIGhpbXNlbGYgaW50byBhbiB1bnN0b3BwYWJsZSBtYW5odW50ZXIuIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwieGVyYXRoXCIsXG4gICAgXCJrZXlcIjogXCIxMDFcIixcbiAgICBcIm5hbWVcIjogXCJYZXJhdGhcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIE1hZ3VzIEFzY2VuZGFudFwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIixcbiAgICAgIFwiQXNzYXNzaW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUxNC40LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgwLFxuICAgICAgXCJtcFwiOiAzNjYuOTYsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDQsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDAsXG4gICAgICBcImFybW9yXCI6IDIxLjg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDUyNSxcbiAgICAgIFwiaHByZWdlblwiOiA1LjQyLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTQuNyxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAxLjM2XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1hlcmF0aC5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uNC5wbmdcIixcbiAgICAgIFwieFwiOiA5NixcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydBIGxpZmV0aW1lIGFzIGEgc2xhdmUgaGFzIHByZXBhcmVkIG1lIGZvciBldGVybml0eSBhcyB5b3VyIG1hc3Rlci4nJzxicj48YnI+WGVyYXRoIGlzIGFuIEFzY2VuZGVkIE1hZ3VzIG9mIGFuY2llbnQgU2h1cmltYSwgYSBiZWluZyBvZiBhcmNhbmUgZW5lcmd5IHdyaXRoaW5nIGluIHRoZSBicm9rZW4gc2hhcmRzIG9mIGEgbWFnaWNhbCBzYXJjb3BoYWd1cy4gRm9yIG1pbGxlbm5pYSwgaGUgd2FzIHRyYXBwZWQgYmVuZWF0aCB0aGUgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ4aW56aGFvXCIsXG4gICAgXCJrZXlcIjogXCI1XCIsXG4gICAgXCJuYW1lXCI6IFwiWGluIFpoYW9cIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFNlbmVzY2hhbCBvZiBEZW1hY2lhXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJBc3Nhc3NpblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNjAwLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDkyLFxuICAgICAgXCJtcFwiOiAyNzMuOCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAzNSxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0NSxcbiAgICAgIFwiYXJtb3JcIjogMjUuODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxNzUsXG4gICAgICBcImhwcmVnZW5cIjogOC4xNzUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjcsXG4gICAgICBcIm1wcmVnZW5cIjogNy4yNTUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjQ1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTcuNTQ0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi42XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1hpblpoYW8ucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjQucG5nXCIsXG4gICAgICBcInhcIjogMTQ0LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ0RlYXRoIGlzIGluZXZpdGFibGUsIG9uZSBjYW4gb25seSBhdm9pZCBkZWZlYXQuJyc8YnI+PGJyPldoZW5ldmVyIEphcnZhbiBJSUksIHRoZSBraW5nIG9mIERlbWFjaWEsIGRlbGl2ZXJzIG9uZSBvZiBoaXMgcmFsbHlpbmcgc3BlZWNoZXMgZnJvbSB0aGUgZ2xpbnRpbmcgbWFyYmxlIGJhbGNvbnkgYXRvcCB0aGUgUm95YWwgUGFsYWNlLCBYaW4gWmhhbyBpcyBhdCBoaXMgc2lkZS4gQ29pbmVkIHRoZSBTZW5lc2NoYWwgb2YgRGVtYWNpYSwuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInlhc3VvXCIsXG4gICAgXCJrZXlcIjogXCIxNTdcIixcbiAgICBcIm5hbWVcIjogXCJZYXN1b1wiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgVW5mb3JnaXZlblwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiQXNzYXNzaW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUxNy43NixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MixcbiAgICAgIFwibXBcIjogMTAwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDUsXG4gICAgICBcImFybW9yXCI6IDI0LjcxMixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjQsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxNzUsXG4gICAgICBcImhwcmVnZW5cIjogNi41MSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuOSxcbiAgICAgIFwibXByZWdlblwiOiAwLFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU1LjM3NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4yLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNjcsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi41XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1lhc3VvLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb240LnBuZ1wiLFxuICAgICAgXCJ4XCI6IDE5MixcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiWWFzdW8gaXMgYSBtYW4gb2YgcmVzb2x2ZSwgYW4gYWdpbGUgc3dvcmRzbWFuIHdobyB3aWVsZHMgdGhlIHdpbmQgaXRzZWxmIHRvIGN1dCBkb3duIGhpcyBmb2VzLiBUaGlzIG9uY2UtcHJvdWQgd2FycmlvciBoYXMgYmVlbiBkaXNncmFjZWQgYnkgYSBmYWxzZSBhY2N1c2F0aW9uIGFuZCBmb3JjZWQgaW50byBhIGRlc3BlcmF0ZSBmaWdodCBmb3Igc3Vydml2YWwuIFdpdGggdGhlIHdvcmxkIHR1cm5lZCBhZ2FpbnN0IGhpbSwgaGUgd2lsbCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInlvcmlja1wiLFxuICAgIFwia2V5XCI6IFwiODNcIixcbiAgICBcIm5hbWVcIjogXCJZb3JpY2tcIixcbiAgICBcInRpdGxlXCI6IFwiU2hlcGhlcmQgb2YgU291bHNcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIlRhbmtcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU4MCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiAxMDAsXG4gICAgICBcIm1wXCI6IDMwMCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0MCxcbiAgICAgIFwiYXJtb3JcIjogMzAsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogNCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMixcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDE3NSxcbiAgICAgIFwiaHByZWdlblwiOiA4LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuNSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNzUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NyxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1lvcmljay5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uNC5wbmdcIixcbiAgICAgIFwieFwiOiAyNDAsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnVGhlc2UgaXNsZXPigKYgSG93IHRoZXkgc2NyZWFtLicnPGJyPlRoZSBsYXN0IHN1cnZpdm9yIG9mIGEgbG9uZy1mb3Jnb3R0ZW4gcmVsaWdpb3VzIG9yZGVyLCBZb3JpY2sgaXMgYm90aCBibGVzc2VkIGFuZCBjdXJzZWQgd2l0aCBwb3dlciBvdmVyIHRoZSBkZWFkLiBUcmFwcGVkIG9uIHRoZSBTaGFkb3cgSXNsZXMsIGhpcyBvbmx5IGNvbXBhbmlvbnMgYXJlIHRoZSByb3R0aW5nIGNvcnBzZXMgYW5kIHNocmlla2luZyBzcGlyaXRzIHRoYXQgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ6YWNcIixcbiAgICBcImtleVwiOiBcIjE1NFwiLFxuICAgIFwibmFtZVwiOiBcIlphY1wiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgU2VjcmV0IFdlYXBvblwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlRhbmtcIixcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNjE0LjYsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTUsXG4gICAgICBcIm1wXCI6IDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0MCxcbiAgICAgIFwiYXJtb3JcIjogMjMuODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxNzUsXG4gICAgICBcImhwcmVnZW5cIjogNy45MixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogMCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1OS42NyxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4zNzUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjAyLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDEuNlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9aYWMucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjQucG5nXCIsXG4gICAgICBcInhcIjogMjg4LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJaYWMgaXMgdGhlIHByb2R1Y3Qgb2YgYSBaYXVuIGV4cGVyaW1lbnQgdG8gbWFudWZhY3R1cmUgYSBoZXhjaGVtLWVuZ2luZWVyZWQgc3VwZXJzb2xkaWVyIC0gdGhlIFphdW4gQW1vcnBob3VzIENvbWJhdGFudC4gQ29tYmluaW5nIGJydXRlIHN0cmVuZ3RoIHdpdGggbGltaXRsZXNzIGZsZXhpYmlsaXR5LCBoZSBpcyBhIHZlcnNhdGlsZSBqdWdnZXJuYXV0OiBhIGNyZWF0aXZlIGZpZ2h0ZXIgd2hvIGJvdW5jZXMgb3ZlciBvYnN0YWNsZXMgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ6ZWRcIixcbiAgICBcImtleVwiOiBcIjIzOFwiLFxuICAgIFwibmFtZVwiOiBcIlplZFwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgTWFzdGVyIG9mIFNoYWRvd3NcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJBc3Nhc3NpblwiLFxuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NzkuNCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MCxcbiAgICAgIFwibXBcIjogMjAwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDUsXG4gICAgICBcImFybW9yXCI6IDI2Ljg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDcuMDksXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjY1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDUwLFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU0LjcxMixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy40LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjFcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vWmVkLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb240LnBuZ1wiLFxuICAgICAgXCJ4XCI6IDMzNixcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiWmVkIGlzIHRoZSBmaXJzdCBuaW5qYSBpbiAyMDAgeWVhcnMgdG8gdW5sb2NrIHRoZSBhbmNpZW50LCBmb3JiaWRkZW4gd2F5cy4gSGUgZGVmaWVkIGhpcyBjbGFuIGFuZCBtYXN0ZXIsIGNhc3Rpbmcgb2ZmIHRoZSBiYWxhbmNlIGFuZCBkaXNjaXBsaW5lIHRoYXQgaGFkIHNoYWNrbGVkIGhpbSBhbGwgaGlzIGxpZmUuIFplZCBub3cgb2ZmZXJzIHBvd2VyIHRvIHRob3NlIHdobyBlbWJyYWNlIGtub3dsZWRnZSBvZiB0aGUgc2hhZG93cywgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ6aWdnc1wiLFxuICAgIFwia2V5XCI6IFwiMTE1XCIsXG4gICAgXCJuYW1lXCI6IFwiWmlnZ3NcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEhleHBsb3NpdmVzIEV4cGVydFwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUyNC40LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgwLFxuICAgICAgXCJtcFwiOiAzODQsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDcsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMjUsXG4gICAgICBcImFybW9yXCI6IDIxLjU0NCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjMsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1NTAsXG4gICAgICBcImhwcmVnZW5cIjogNi4yNTUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjYsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU0LjIwOCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4xLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNDczNCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1ppZ2dzLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb240LnBuZ1wiLFxuICAgICAgXCJ4XCI6IDM4NCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiWmlnZ3Mgd2FzIGJvcm4gd2l0aCBhIHRhbGVudCBmb3IgdGlua2VyaW5nLCBidXQgaGlzIGNoYW90aWMsIGh5cGVyYWN0aXZlIG5hdHVyZSB3YXMgdW51c3VhbCBhbW9uZyB5b3JkbGUgc2NpZW50aXN0cy4gQXNwaXJpbmcgdG8gYmUgYSByZXZlcmVkIGludmVudG9yIGxpa2UgSGVpbWVyZGluZ2VyLCBoZSByYXR0bGVkIHRocm91Z2ggYW1iaXRpb3VzIHByb2plY3RzIHdpdGggbWFuaWMgemVhbCwgZW1ib2xkZW5lZCBieSBib3RoIGhpcyAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInppbGVhblwiLFxuICAgIFwia2V5XCI6IFwiMjZcIixcbiAgICBcIm5hbWVcIjogXCJaaWxlYW5cIixcbiAgICBcInRpdGxlXCI6IFwidGhlIENocm9ub2tlZXBlclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlN1cHBvcnRcIixcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNDk5LjI4LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDc3LFxuICAgICAgXCJtcFwiOiAzNjAuOCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA2MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMTkuMTM0LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuOCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDU1MCxcbiAgICAgIFwiaHByZWdlblwiOiA1LjQ0LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41LFxuICAgICAgXCJtcHJlZ2VuXCI6IDguNSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUxLjY0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuMTNcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vWmlsZWFuLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb240LnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQzMixcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiSW4gdGhlIHdhc3RlbGFuZHMgb2YgVXJ0aXN0YW4sIHRoZXJlIHdhcyBvbmNlIGEgZ3JlYXQgY2l0eS4gSXQgcGVyaXNoZWQgbG9uZyBhZ28gaW4gYSB0ZXJyaWJsZSBSdW5lIFdhciwgbGlrZSBtb3N0IG9mIHRoZSBsYW5kcyBiZWxvdyB0aGUgR3JlYXQgQmFycmllci4gTmV2ZXJ0aGVsZXNzLCBvbmUgbWFuIHN1cnZpdmVkOiBhIHNvcmNlcmVyIG5hbWVkIFppbGVhbi4gQmVpbmcgb2JzZXNzZWQgd2l0aCB0aW1lLCBpdCB3YXMgb25seSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInp5cmFcIixcbiAgICBcImtleVwiOiBcIjE0M1wiLFxuICAgIFwibmFtZVwiOiBcIlp5cmFcIixcbiAgICBcInRpdGxlXCI6IFwiUmlzZSBvZiB0aGUgVGhvcm5zXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiLFxuICAgICAgXCJTdXBwb3J0XCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA0OTkuMzIsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNzQsXG4gICAgICBcIm1wXCI6IDMzNCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA1MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0MCxcbiAgICAgIFwiYXJtb3JcIjogMjAuMDQsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMyxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDU3NSxcbiAgICAgIFwiaHByZWdlblwiOiA1LjY5LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41LFxuICAgICAgXCJtcHJlZ2VuXCI6IDguNSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUzLjM3NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4yLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuMTFcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vWnlyYS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uNC5wbmdcIixcbiAgICAgIFwieFwiOiAwLFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiTG9uZ2luZyB0byB0YWtlIGNvbnRyb2wgb2YgaGVyIGZhdGUsIHRoZSBhbmNpZW50LCBkeWluZyBwbGFudCBaeXJhIHRyYW5zZmVycmVkIGhlciBjb25zY2lvdXNuZXNzIGludG8gYSBodW1hbiBib2R5IGZvciBhIHNlY29uZCBjaGFuY2UgYXQgbGlmZS4gQ2VudHVyaWVzIGFnbywgc2hlIGFuZCBoZXIga2luZCBkb21pbmF0ZWQgdGhlIEt1bXVuZ3UgSnVuZ2xlLCB1c2luZyB0aG9ybnMgYW5kIHZpbmVzIHRvIGNvbnN1bWUgYW55IGFuaW1hbCAuLi5cIlxuICB9XG5dIiwibW9kdWxlLmV4cG9ydHM9W1xuICB7XG4gICAgXCJpZFwiOiBcImJhcnJpZXJcIixcbiAgICBcIm5hbWVcIjogXCJCYXJyaWVyXCIsXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlNoaWVsZHMgeW91ciBjaGFtcGlvbiBmcm9tIDExNS00NTUgZGFtYWdlIChkZXBlbmRpbmcgb24gY2hhbXBpb24gbGV2ZWwpIGZvciAyIHNlY29uZHMuXCIsXG4gICAgXCJ0b29sdGlwXCI6IFwiVGVtcG9yYXJpbHkgc2hpZWxkcyB7eyBmMSB9fSBkYW1hZ2UgZnJvbSB5b3VyIGNoYW1waW9uIGZvciAyIHNlY29uZHMuXCIsXG4gICAgXCJjb29sZG93blwiOiAxODAsXG4gICAgXCJrZXlcIjogXCIyMVwiLFxuICAgIFwic3VtbW9uZXJMZXZlbFwiOiA0LFxuICAgIFwibWF4YW1tb1wiOiBcIi0xXCIsXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcGVsbC9TdW1tb25lckJhcnJpZXIucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9zcGVsbDAucG5nXCIsXG4gICAgICBcInhcIjogMCxcbiAgICAgIFwieVwiOiAwXG4gICAgfVxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImJvb3N0XCIsXG4gICAgXCJuYW1lXCI6IFwiQ2xlYW5zZVwiLFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJSZW1vdmVzIGFsbCBkaXNhYmxlcyBhbmQgc3VtbW9uZXIgc3BlbGwgZGVidWZmcyBhZmZlY3RpbmcgeW91ciBjaGFtcGlvbiBhbmQgbG93ZXJzIHRoZSBkdXJhdGlvbiBvZiBpbmNvbWluZyBkaXNhYmxlcyBieSA2NSUgZm9yIDMgc2Vjb25kcy5cIixcbiAgICBcInRvb2x0aXBcIjogXCJSZW1vdmVzIGFsbCBkaXNhYmxlcyBhbmQgc3VtbW9uZXIgc3BlbGwgZGVidWZmcyBhZmZlY3RpbmcgeW91ciBjaGFtcGlvbiBhbmQgcmVkdWNlcyB0aGUgZHVyYXRpb24gb2YgZGlzYWJsZXMgYnkgNjUlIGZvciB0aGUgbmV4dCB7eyBmMSB9fSBzZWNvbmRzLlwiLFxuICAgIFwiY29vbGRvd25cIjogMjEwLFxuICAgIFwia2V5XCI6IFwiMVwiLFxuICAgIFwic3VtbW9uZXJMZXZlbFwiOiA2LFxuICAgIFwibWF4YW1tb1wiOiBcIi0xXCIsXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcGVsbC9TdW1tb25lckJvb3N0LnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvc3BlbGwwLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQ4LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZG90XCIsXG4gICAgXCJuYW1lXCI6IFwiSWduaXRlXCIsXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIklnbml0ZXMgdGFyZ2V0IGVuZW15IGNoYW1waW9uLCBkZWFsaW5nIDcwLTQxMCB0cnVlIGRhbWFnZSAoZGVwZW5kaW5nIG9uIGNoYW1waW9uIGxldmVsKSBvdmVyIDUgc2Vjb25kcywgZ3JhbnRzIHlvdSB2aXNpb24gb2YgdGhlIHRhcmdldCwgYW5kIHJlZHVjZXMgaGVhbGluZyBlZmZlY3RzIG9uIHRoZW0gZm9yIHRoZSBkdXJhdGlvbi5cIixcbiAgICBcInRvb2x0aXBcIjogXCJJZ25pdGUgZGVhbHMgPHNwYW4gY2xhc3M9XFxcImNvbG9yRkVGQ0ZGXFxcIj57eyBmMSB9fTwvc3Bhbj4gdHJ1ZSBkYW1hZ2UgdG8gdGFyZ2V0IGVuZW15IGNoYW1waW9uIG92ZXIgNSBzZWNvbmRzLCBncmFudHMgeW91IHZpc2lvbiBvZiB0aGUgdGFyZ2V0IGFuZCBhcHBsaWVzIEdyaWV2b3VzIFdvdW5kcyBmb3IgdGhlIGR1cmF0aW9uLjxicj48YnI+PGk+KEdyaWV2b3VzIFdvdW5kcyByZWR1Y2VzIGhlYWxpbmcgZWZmZWN0cyBieSA0MCUuIFRoaXMgdmlzaW9uIGRvZXMgbm90IHJldmVhbCBzdGVhbHRoZWQgZW5lbWllcy4pPC9pPlwiLFxuICAgIFwiY29vbGRvd25cIjogMjEwLFxuICAgIFwia2V5XCI6IFwiMTRcIixcbiAgICBcInN1bW1vbmVyTGV2ZWxcIjogMTAsXG4gICAgXCJtYXhhbW1vXCI6IFwiLTFcIixcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3NwZWxsL1N1bW1vbmVyRG90LnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvc3BlbGwwLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDE0NCxcbiAgICAgIFwieVwiOiAwXG4gICAgfVxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImV4aGF1c3RcIixcbiAgICBcIm5hbWVcIjogXCJFeGhhdXN0XCIsXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkV4aGF1c3RzIHRhcmdldCBlbmVteSBjaGFtcGlvbiwgcmVkdWNpbmcgdGhlaXIgTW92ZW1lbnQgU3BlZWQgYW5kIEF0dGFjayBTcGVlZCBieSAzMCUsIHRoZWlyIEFybW9yIGFuZCBNYWdpYyBSZXNpc3QgYnkgMTAsIGFuZCB0aGVpciBkYW1hZ2UgZGVhbHQgYnkgNDAlIGZvciAyLjUgc2Vjb25kcy5cIixcbiAgICBcInRvb2x0aXBcIjogXCJFeGhhdXN0cyB0YXJnZXQgZW5lbXkgY2hhbXBpb24sIHJlZHVjaW5nIHRoZWlyIE1vdmVtZW50IFNwZWVkIGFuZCBBdHRhY2sgU3BlZWQgYnkge3sgZjMgfX0lLCB0aGVpciBBcm1vciBhbmQgTWFnaWMgUmVzaXN0IGJ5IHt7IGY0IH19LCBhbmQgdGhlaXIgZGFtYWdlIGRlYWx0IGJ5IHt7IGYyIH19JSBmb3IgMi41IHNlY29uZHMuXCIsXG4gICAgXCJjb29sZG93blwiOiAyMTAsXG4gICAgXCJrZXlcIjogXCIzXCIsXG4gICAgXCJzdW1tb25lckxldmVsXCI6IDQsXG4gICAgXCJtYXhhbW1vXCI6IFwiLTFcIixcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3NwZWxsL1N1bW1vbmVyRXhoYXVzdC5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL3NwZWxsMC5wbmdcIixcbiAgICAgIFwieFwiOiAxOTIsXG4gICAgICBcInlcIjogMFxuICAgIH1cbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJmbGFzaFwiLFxuICAgIFwibmFtZVwiOiBcIkZsYXNoXCIsXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRlbGVwb3J0cyB5b3VyIGNoYW1waW9uIGEgc2hvcnQgZGlzdGFuY2UgdG93YXJkIHlvdXIgY3Vyc29yJ3MgbG9jYXRpb24uXCIsXG4gICAgXCJ0b29sdGlwXCI6IFwiVGVsZXBvcnRzIHlvdXIgY2hhbXBpb24gYSBzaG9ydCBkaXN0YW5jZSB0b3dhcmQgeW91ciBjdXJzb3IncyBsb2NhdGlvbi5cIixcbiAgICBcImNvb2xkb3duXCI6IDMwMCxcbiAgICBcImtleVwiOiBcIjRcIixcbiAgICBcInN1bW1vbmVyTGV2ZWxcIjogOCxcbiAgICBcIm1heGFtbW9cIjogXCItMVwiLFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3BlbGwvU3VtbW9uZXJGbGFzaC5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL3NwZWxsMC5wbmdcIixcbiAgICAgIFwieFwiOiAyNDAsXG4gICAgICBcInlcIjogMFxuICAgIH1cbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJoYXN0ZVwiLFxuICAgIFwibmFtZVwiOiBcIkdob3N0XCIsXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIllvdXIgY2hhbXBpb24gY2FuIG1vdmUgdGhyb3VnaCB1bml0cyBhbmQgaGFzIDI4LTQ1JSAoZGVwZW5kaW5nIG9uIGNoYW1waW9uIGxldmVsKSBpbmNyZWFzZWQgTW92ZW1lbnQgU3BlZWQgZm9yIDEwIHNlY29uZHMuXCIsXG4gICAgXCJ0b29sdGlwXCI6IFwiWW91ciBjaGFtcGlvbiBjYW4gbW92ZSB0aHJvdWdoIHVuaXRzIGFuZCBoYXMge3sgZjEgfX0lIGluY3JlYXNlZCBNb3ZlbWVudCBTcGVlZCBmb3IgMTAgc2Vjb25kcy5cIixcbiAgICBcImNvb2xkb3duXCI6IDE4MCxcbiAgICBcImtleVwiOiBcIjZcIixcbiAgICBcInN1bW1vbmVyTGV2ZWxcIjogMSxcbiAgICBcIm1heGFtbW9cIjogXCItMVwiLFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3BlbGwvU3VtbW9uZXJIYXN0ZS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL3NwZWxsMC5wbmdcIixcbiAgICAgIFwieFwiOiAyODgsXG4gICAgICBcInlcIjogMFxuICAgIH1cbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJoZWFsXCIsXG4gICAgXCJuYW1lXCI6IFwiSGVhbFwiLFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJSZXN0b3JlcyA5MC0zNDUgSGVhbHRoIChkZXBlbmRpbmcgb24gY2hhbXBpb24gbGV2ZWwpIGFuZCBncmFudHMgMzAlIE1vdmVtZW50IFNwZWVkIGZvciAxIHNlY29uZCB0byB5b3UgYW5kIHRhcmdldCBhbGxpZWQgY2hhbXBpb24uIFRoaXMgaGVhbGluZyBpcyBoYWx2ZWQgZm9yIHVuaXRzIHJlY2VudGx5IGFmZmVjdGVkIGJ5IFN1bW1vbmVyIEhlYWwuXCIsXG4gICAgXCJ0b29sdGlwXCI6IFwiUmVzdG9yZXMge3sgZjEgfX0gSGVhbHRoIGFuZCBncmFudHMgMzAlIE1vdmVtZW50IFNwZWVkIGZvciAxIHNlY29uZCB0byB5b3VyIGNoYW1waW9uIGFuZCB0YXJnZXQgYWxsaWVkIGNoYW1waW9uLiBUaGlzIGhlYWxpbmcgaXMgaGFsdmVkIGZvciB1bml0cyByZWNlbnRseSBhZmZlY3RlZCBieSBTdW1tb25lciBIZWFsLjxicj48YnI+PHNwYW4gY2xhc3M9XFxcImNvbG9yRkZGRjAwXFxcIj5JZiB0aGlzIHNwZWxsIGNhbm5vdCBmaW5kIGEgdGFyZ2V0LCBpdCB3aWxsIGNhc3Qgb24gdGhlIG1vc3Qgd291bmRlZCBhbGxpZWQgY2hhbXBpb24gaW4gcmFuZ2UuPC9zcGFuPlwiLFxuICAgIFwiY29vbGRvd25cIjogMjQwLFxuICAgIFwia2V5XCI6IFwiN1wiLFxuICAgIFwic3VtbW9uZXJMZXZlbFwiOiAxLFxuICAgIFwibWF4YW1tb1wiOiBcIi0xXCIsXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcGVsbC9TdW1tb25lckhlYWwucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9zcGVsbDAucG5nXCIsXG4gICAgICBcInhcIjogMzM2LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwibWFuYVwiLFxuICAgIFwibmFtZVwiOiBcIkNsYXJpdHlcIixcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiUmVzdG9yZXMgNTAlIG9mIHlvdXIgY2hhbXBpb24ncyBtYXhpbXVtIE1hbmEuIEFsc28gcmVzdG9yZXMgYWxsaWVzIGZvciAyNSUgb2YgdGhlaXIgbWF4aW11bSBNYW5hLlwiLFxuICAgIFwidG9vbHRpcFwiOiBcIlJlc3RvcmVzIHt7IGYxIH19JSBtYXhpbXVtIE1hbmEgdG8geW91ciBDaGFtcGlvbiBhbmQge3sgZjIgfX0lIHRvIG5lYXJieSBhbGxpZXMuXCIsXG4gICAgXCJjb29sZG93blwiOiAyNDAsXG4gICAgXCJrZXlcIjogXCIxM1wiLFxuICAgIFwic3VtbW9uZXJMZXZlbFwiOiAxLFxuICAgIFwibWF4YW1tb1wiOiBcIi0xXCIsXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcGVsbC9TdW1tb25lck1hbmEucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9zcGVsbDAucG5nXCIsXG4gICAgICBcInhcIjogMzg0LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicG9yb3JlY2FsbFwiLFxuICAgIFwibmFtZVwiOiBcIlRvIHRoZSBLaW5nIVwiLFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJRdWlja2x5IHRyYXZlbCB0byB0aGUgUG9ybyBLaW5nJ3Mgc2lkZS5cIixcbiAgICBcInRvb2x0aXBcIjogXCI8c3BhbiBjbGFzcz1cXFwiY29sb3JGRkUwNzZcXFwiPlBhc3NpdmU6PC9zcGFuPiBIaXR0aW5nIGFuIGVuZW15IGNoYW1waW9uIHdpdGggYSBQb3JvIGdpdmVzIHlvdXIgdGVhbSBhIFBvcm8gTWFyay4gVXBvbiByZWFjaGluZyAxMCBQb3JvIE1hcmtzLCB5b3VyIHRlYW0gc3VtbW9ucyB0aGUgUG9ybyBLaW5nIHRvIGZpZ2h0IGFsb25nc2lkZSB0aGVtLiBXaGlsZSB0aGUgUG9ybyBLaW5nIGlzIGFjdGl2ZSwgbm8gUG9ybyBNYXJrcyBjYW4gYmUgc2NvcmVkIGJ5IGVpdGhlciB0ZWFtLjxicj48YnI+PHNwYW4gY2xhc3M9XFxcImNvbG9yRkZFMDc2XFxcIj5BY3RpdmU6PC9zcGFuPiBRdWlja2x5IGRhc2ggdG8gS2luZyBQb3JvJ3Mgc2lkZS4gQ2FuIG9ubHkgYmUgY2FzdCB3aGlsZSB0aGUgUG9ybyBLaW5nIGlzIHN1bW1vbmVkIGZvciB5b3VyIHRlYW0uIDxicj48YnI+PGk+PHNwYW4gY2xhc3M9XFxcImNvbG9yRkREMDE3XFxcIj4nJ1Bvcm9zIHR1ZyB0aGUgaGVhcnRzdHJpbmdzLiBUaGUgcmVzdCBvZiB5b3UganVzdCBjb21lcyBhbG9uZyBmb3IgdGhlIHJpZGUuJyc8L3NwYW4+PC9pPlwiLFxuICAgIFwiY29vbGRvd25cIjogMTAsXG4gICAgXCJrZXlcIjogXCIzMFwiLFxuICAgIFwic3VtbW9uZXJMZXZlbFwiOiAxLFxuICAgIFwibWF4YW1tb1wiOiBcIi0xXCIsXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcGVsbC9TdW1tb25lclBvcm9SZWNhbGwucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9zcGVsbDAucG5nXCIsXG4gICAgICBcInhcIjogNDMyLFxuICAgICAgXCJ5XCI6IDBcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwicG9yb3Rocm93XCIsXG4gICAgXCJuYW1lXCI6IFwiUG9ybyBUb3NzXCIsXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRvc3MgYSBQb3JvIGF0IHlvdXIgZW5lbWllcy4gSWYgaXQgaGl0cywgeW91IGNhbiBxdWlja2x5IHRyYXZlbCB0byB5b3VyIHRhcmdldCBhcyBhIGZvbGxvdyB1cC5cIixcbiAgICBcInRvb2x0aXBcIjogXCJUb3NzIGEgUG9ybyBhIGxvbmcgZGlzdGFuY2UsIGRlYWxpbmcge3sgZjIgfX0gdHJ1ZSBkYW1hZ2UgdG8gdGhlIGZpcnN0IGVuZW15IHVuaXQgaGl0LiBUaGlzIGFiaWxpdHkgY2FuIGJlIHJlY2FzdCBmb3IgMyBzZWNvbmRzIGlmIGl0IGhpdHMgYW4gZW5lbXkgdG8gZGFzaCB0byB0aGUgdGFyZ2V0IGhpdC4gRGFzaGluZyB0byB0aGUgdGFyZ2V0IHdpbGwgcmVkdWNlIHRoZSBjb29sZG93biBvZiBQb3JvIFRvc3MgYnkgNSBzZWNvbmRzLjxicj48YnI+UG9yb3MgYXJlIG5vdCBibG9ja2VkIGJ5IHNwZWxsIHNoaWVsZHMgb3Igd2luZCB3YWxscyBiZWNhdXNlIHRoZXkgYXJlIGFuaW1hbHMsIG5vdCBzcGVsbHMhPGJyPjxicj48aT48c3BhbiBjbGFzcz1cXFwiY29sb3JGREQwMTdcXFwiPicnUG9yb3MgYXJlIGEgbW9kZWwgZm9yIFJ1bmV0ZXJyYW4gYWVyb2R5bmFtaWNzLicnPC9zcGFuPjwvaT5cIixcbiAgICBcImNvb2xkb3duXCI6IDIwLFxuICAgIFwia2V5XCI6IFwiMzFcIixcbiAgICBcInN1bW1vbmVyTGV2ZWxcIjogMSxcbiAgICBcIm1heGFtbW9cIjogXCItMVwiLFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3BlbGwvU3VtbW9uZXJQb3JvVGhyb3cucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9zcGVsbDAucG5nXCIsXG4gICAgICBcInhcIjogMCxcbiAgICAgIFwieVwiOiA0OFxuICAgIH1cbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJzbWl0ZVwiLFxuICAgIFwibmFtZVwiOiBcIlNtaXRlXCIsXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkRlYWxzIDM5MC0xMDAwIHRydWUgZGFtYWdlIChkZXBlbmRpbmcgb24gY2hhbXBpb24gbGV2ZWwpIHRvIHRhcmdldCBlcGljIG9yIGxhcmdlIG1vbnN0ZXIgb3IgZW5lbXkgbWluaW9uLlwiLFxuICAgIFwidG9vbHRpcFwiOiBcIkRlYWxzIDxzcGFuIGNsYXNzPVxcXCJjb2xvckZFRkNGRlxcXCI+e3sgZjEgfX08L3NwYW4+IHRydWUgZGFtYWdlIHRvIHRhcmdldCBlcGljIG9yIGxhcmdlIG1vbnN0ZXIgb3IgZW5lbXkgbWluaW9uLjxicj48YnI+U21pdGUgcmVnYWlucyBhIGNoYXJnZSBldmVyeSB7eyBmMyB9fSBzZWNvbmRzLCB1cCB0byBhIG1heGltdW0gb2YgMiBjaGFyZ2VzLjxicj48YnI+PGk+U21pdGluZyBMYXJnZSBNb25zdGVycyBpbnN0YW50bHkgaGFydmVzdHMgYWRkaXRpb25hbCBib251c2VzIGJhc2VkIG9uIHRoZSBNb25zdGVyLiBNb3VzZSBvdmVyIGxhcmdlIGp1bmdsZSBtb25zdGVycyB0byBzZWUgcG90ZW50aWFsIGJvbnVzIHJld2FyZHMuPC9pPlwiLFxuICAgIFwiY29vbGRvd25cIjogNzUsXG4gICAgXCJrZXlcIjogXCIxMVwiLFxuICAgIFwic3VtbW9uZXJMZXZlbFwiOiAxMCxcbiAgICBcIm1heGFtbW9cIjogXCIyXCIsXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcGVsbC9TdW1tb25lclNtaXRlLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvc3BlbGwwLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQ4LFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfVxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInNub3diYWxsXCIsXG4gICAgXCJuYW1lXCI6IFwiTWFya1wiLFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUaHJvdyBhIHNub3diYWxsIGluIGEgc3RyYWlnaHQgbGluZSBhdCB5b3VyIGVuZW1pZXMuIElmIGl0IGhpdHMgYW4gZW5lbXksIHRoZXkgYmVjb21lIG1hcmtlZCBhbmQgeW91ciBjaGFtcGlvbiBjYW4gcXVpY2tseSB0cmF2ZWwgdG8gdGhlIG1hcmtlZCB0YXJnZXQgYXMgYSBmb2xsb3cgdXAuXCIsXG4gICAgXCJ0b29sdGlwXCI6IFwiVGhyb3cgYSBzbm93YmFsbCBhIGxvbmcgZGlzdGFuY2UsIGRlYWxpbmcge3sgZjEgfX0gdHJ1ZSBkYW1hZ2UgdG8gdGhlIGZpcnN0IGVuZW15IHVuaXQgaGl0LiBJZiBpdCBoaXRzIGFuIGVuZW15LCB0aGlzIGFiaWxpdHkgY2FuIGJlIHJlY2FzdCBmb3Ige3sgZjIgfX0gc2Vjb25kcyB0byBEYXNoIHRvIHRoZSB0YWdnZWQgdW5pdCwgZGVhbGluZyBhbiBhZGRpdGlvbmFsIHt7IGY1IH19IHRydWUgZGFtYWdlLiBEYXNoaW5nIHRvIHRoZSB0YXJnZXQgd2lsbCByZWR1Y2UgdGhlIGNvb2xkb3duIG9mIE1hcmsgYnkge3sgZjMgfX0lLjxicj48YnI+PHNwYW4gY2xhc3M9XFxcImNvbG9yRkZGRjAwXFxcIj5NYXJrIHByb2plY3RpbGVzIGFyZSBub3Qgc3RvcHBlZCBieSBzcGVsbCBzaGllbGRzIG9yIHByb2plY3RpbGUgbWl0aWdhdGlvbi48L3NwYW4+XCIsXG4gICAgXCJjb29sZG93blwiOiA4MCxcbiAgICBcImtleVwiOiBcIjMyXCIsXG4gICAgXCJzdW1tb25lckxldmVsXCI6IDEsXG4gICAgXCJtYXhhbW1vXCI6IFwiLTFcIixcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3NwZWxsL1N1bW1vbmVyU25vd2JhbGwucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9zcGVsbDAucG5nXCIsXG4gICAgICBcInhcIjogOTYsXG4gICAgICBcInlcIjogNDhcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidGVsZXBvcnRcIixcbiAgICBcIm5hbWVcIjogXCJUZWxlcG9ydFwiLFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJBZnRlciBjaGFubmVsaW5nIGZvciA0LjUgc2Vjb25kcywgdGVsZXBvcnRzIHlvdXIgY2hhbXBpb24gdG8gdGFyZ2V0IGFsbGllZCBzdHJ1Y3R1cmUsIG1pbmlvbiwgb3Igd2FyZC5cIixcbiAgICBcInRvb2x0aXBcIjogXCJBZnRlciBjaGFubmVsaW5nIGZvciB7eyBmMSB9fSBzZWNvbmRzLCB5b3VyIGNoYW1waW9uIHRlbGVwb3J0cyB0byB0YXJnZXQgYWxsaWVkIHN0cnVjdHVyZSwgbWluaW9uLCBvciB3YXJkLjxicj48YnI+WW91IG1heSByZWFjdGl2YXRlIFRlbGVwb3J0IHRvIGNhbmNlbCBpdCwgcGxhY2luZyBpdCBvbiBhIHt7IGYzIH19IHNlY29uZCBjb29sZG93bi5cIixcbiAgICBcImNvb2xkb3duXCI6IDMwMCxcbiAgICBcImtleVwiOiBcIjEyXCIsXG4gICAgXCJzdW1tb25lckxldmVsXCI6IDYsXG4gICAgXCJtYXhhbW1vXCI6IFwiLTFcIixcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3NwZWxsL1N1bW1vbmVyVGVsZXBvcnQucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9zcGVsbDAucG5nXCIsXG4gICAgICBcInhcIjogMTQ0LFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfVxuICB9XG5dIiwiXHJcbi8qKlxyXG4gKiBFbGVtZW50IHByb3RvdHlwZS5cclxuICovXHJcblxyXG52YXIgcHJvdG8gPSBFbGVtZW50LnByb3RvdHlwZTtcclxuXHJcbi8qKlxyXG4gKiBWZW5kb3IgZnVuY3Rpb24uXHJcbiAqL1xyXG5cclxudmFyIHZlbmRvciA9IHByb3RvLm1hdGNoZXNTZWxlY3RvclxyXG4gIHx8IHByb3RvLndlYmtpdE1hdGNoZXNTZWxlY3RvclxyXG4gIHx8IHByb3RvLm1vek1hdGNoZXNTZWxlY3RvclxyXG4gIHx8IHByb3RvLm1zTWF0Y2hlc1NlbGVjdG9yXHJcbiAgfHwgcHJvdG8ub01hdGNoZXNTZWxlY3RvcjtcclxuXHJcbi8qKlxyXG4gKiBFeHBvc2UgYG1hdGNoKClgLlxyXG4gKi9cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbWF0Y2g7XHJcblxyXG4vKipcclxuICogTWF0Y2ggYGVsYCB0byBgc2VsZWN0b3JgLlxyXG4gKlxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxyXG4gKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIG1hdGNoKGVsLCBzZWxlY3Rvcikge1xyXG4gIGlmICh2ZW5kb3IpIHJldHVybiB2ZW5kb3IuY2FsbChlbCwgc2VsZWN0b3IpO1xyXG4gIHZhciBub2RlcyA9IGVsLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7ICsraSkge1xyXG4gICAgaWYgKG5vZGVzW2ldID09IGVsKSByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59IiwiJ3VzZSBzdHJpY3QnO1xuLy8gQ3JlYXRlIGEgcmFuZ2Ugb2JqZWN0IGZvciBlZmZpY2VudGx5IHJlbmRlcmluZyBzdHJpbmdzIHRvIGVsZW1lbnRzLlxudmFyIHJhbmdlO1xuXG52YXIgZG9jID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudDtcblxudmFyIHRlc3RFbCA9IGRvYyA/XG4gICAgZG9jLmJvZHkgfHwgZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpIDpcbiAgICB7fTtcblxudmFyIE5TX1hIVE1MID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnO1xuXG52YXIgRUxFTUVOVF9OT0RFID0gMTtcbnZhciBURVhUX05PREUgPSAzO1xudmFyIENPTU1FTlRfTk9ERSA9IDg7XG5cbi8vIEZpeGVzIDxodHRwczovL2dpdGh1Yi5jb20vcGF0cmljay1zdGVlbGUtaWRlbS9tb3JwaGRvbS9pc3N1ZXMvMzI+XG4vLyAoSUU3KyBzdXBwb3J0KSA8PUlFNyBkb2VzIG5vdCBzdXBwb3J0IGVsLmhhc0F0dHJpYnV0ZShuYW1lKVxudmFyIGhhc0F0dHJpYnV0ZU5TO1xuXG5pZiAodGVzdEVsLmhhc0F0dHJpYnV0ZU5TKSB7XG4gICAgaGFzQXR0cmlidXRlTlMgPSBmdW5jdGlvbihlbCwgbmFtZXNwYWNlVVJJLCBuYW1lKSB7XG4gICAgICAgIHJldHVybiBlbC5oYXNBdHRyaWJ1dGVOUyhuYW1lc3BhY2VVUkksIG5hbWUpO1xuICAgIH07XG59IGVsc2UgaWYgKHRlc3RFbC5oYXNBdHRyaWJ1dGUpIHtcbiAgICBoYXNBdHRyaWJ1dGVOUyA9IGZ1bmN0aW9uKGVsLCBuYW1lc3BhY2VVUkksIG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGVsLmhhc0F0dHJpYnV0ZShuYW1lKTtcbiAgICB9O1xufSBlbHNlIHtcbiAgICBoYXNBdHRyaWJ1dGVOUyA9IGZ1bmN0aW9uKGVsLCBuYW1lc3BhY2VVUkksIG5hbWUpIHtcbiAgICAgICAgcmV0dXJuICEhZWwuZ2V0QXR0cmlidXRlTm9kZShuYW1lKTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiB0b0VsZW1lbnQoc3RyKSB7XG4gICAgaWYgKCFyYW5nZSAmJiBkb2MuY3JlYXRlUmFuZ2UpIHtcbiAgICAgICAgcmFuZ2UgPSBkb2MuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgcmFuZ2Uuc2VsZWN0Tm9kZShkb2MuYm9keSk7XG4gICAgfVxuXG4gICAgdmFyIGZyYWdtZW50O1xuICAgIGlmIChyYW5nZSAmJiByYW5nZS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQpIHtcbiAgICAgICAgZnJhZ21lbnQgPSByYW5nZS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoc3RyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmcmFnbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdib2R5Jyk7XG4gICAgICAgIGZyYWdtZW50LmlubmVySFRNTCA9IHN0cjtcbiAgICB9XG4gICAgcmV0dXJuIGZyYWdtZW50LmNoaWxkTm9kZXNbMF07XG59XG5cbmZ1bmN0aW9uIHN5bmNCb29sZWFuQXR0clByb3AoZnJvbUVsLCB0b0VsLCBuYW1lKSB7XG4gICAgaWYgKGZyb21FbFtuYW1lXSAhPT0gdG9FbFtuYW1lXSkge1xuICAgICAgICBmcm9tRWxbbmFtZV0gPSB0b0VsW25hbWVdO1xuICAgICAgICBpZiAoZnJvbUVsW25hbWVdKSB7XG4gICAgICAgICAgICBmcm9tRWwuc2V0QXR0cmlidXRlKG5hbWUsICcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZyb21FbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSwgJycpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG52YXIgc3BlY2lhbEVsSGFuZGxlcnMgPSB7XG4gICAgLyoqXG4gICAgICogTmVlZGVkIGZvciBJRS4gQXBwYXJlbnRseSBJRSBkb2Vzbid0IHRoaW5rIHRoYXQgXCJzZWxlY3RlZFwiIGlzIGFuXG4gICAgICogYXR0cmlidXRlIHdoZW4gcmVhZGluZyBvdmVyIHRoZSBhdHRyaWJ1dGVzIHVzaW5nIHNlbGVjdEVsLmF0dHJpYnV0ZXNcbiAgICAgKi9cbiAgICBPUFRJT046IGZ1bmN0aW9uKGZyb21FbCwgdG9FbCkge1xuICAgICAgICBzeW5jQm9vbGVhbkF0dHJQcm9wKGZyb21FbCwgdG9FbCwgJ3NlbGVjdGVkJyk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBUaGUgXCJ2YWx1ZVwiIGF0dHJpYnV0ZSBpcyBzcGVjaWFsIGZvciB0aGUgPGlucHV0PiBlbGVtZW50IHNpbmNlIGl0IHNldHNcbiAgICAgKiB0aGUgaW5pdGlhbCB2YWx1ZS4gQ2hhbmdpbmcgdGhlIFwidmFsdWVcIiBhdHRyaWJ1dGUgd2l0aG91dCBjaGFuZ2luZyB0aGVcbiAgICAgKiBcInZhbHVlXCIgcHJvcGVydHkgd2lsbCBoYXZlIG5vIGVmZmVjdCBzaW5jZSBpdCBpcyBvbmx5IHVzZWQgdG8gdGhlIHNldCB0aGVcbiAgICAgKiBpbml0aWFsIHZhbHVlLiAgU2ltaWxhciBmb3IgdGhlIFwiY2hlY2tlZFwiIGF0dHJpYnV0ZSwgYW5kIFwiZGlzYWJsZWRcIi5cbiAgICAgKi9cbiAgICBJTlBVVDogZnVuY3Rpb24oZnJvbUVsLCB0b0VsKSB7XG4gICAgICAgIHN5bmNCb29sZWFuQXR0clByb3AoZnJvbUVsLCB0b0VsLCAnY2hlY2tlZCcpO1xuICAgICAgICBzeW5jQm9vbGVhbkF0dHJQcm9wKGZyb21FbCwgdG9FbCwgJ2Rpc2FibGVkJyk7XG5cbiAgICAgICAgaWYgKGZyb21FbC52YWx1ZSAhPT0gdG9FbC52YWx1ZSkge1xuICAgICAgICAgICAgZnJvbUVsLnZhbHVlID0gdG9FbC52YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaGFzQXR0cmlidXRlTlModG9FbCwgbnVsbCwgJ3ZhbHVlJykpIHtcbiAgICAgICAgICAgIGZyb21FbC5yZW1vdmVBdHRyaWJ1dGUoJ3ZhbHVlJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgVEVYVEFSRUE6IGZ1bmN0aW9uKGZyb21FbCwgdG9FbCkge1xuICAgICAgICB2YXIgbmV3VmFsdWUgPSB0b0VsLnZhbHVlO1xuICAgICAgICBpZiAoZnJvbUVsLnZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgZnJvbUVsLnZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZnJvbUVsLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIGZyb21FbC5maXJzdENoaWxkLm5vZGVWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHR3byBub2RlJ3MgbmFtZXMgYXJlIHRoZSBzYW1lLlxuICpcbiAqIE5PVEU6IFdlIGRvbid0IGJvdGhlciBjaGVja2luZyBgbmFtZXNwYWNlVVJJYCBiZWNhdXNlIHlvdSB3aWxsIG5ldmVyIGZpbmQgdHdvIEhUTUwgZWxlbWVudHMgd2l0aCB0aGUgc2FtZVxuICogICAgICAgbm9kZU5hbWUgYW5kIGRpZmZlcmVudCBuYW1lc3BhY2UgVVJJcy5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGFcbiAqIEBwYXJhbSB7RWxlbWVudH0gYiBUaGUgdGFyZ2V0IGVsZW1lbnRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmVOb2RlTmFtZXMoZnJvbUVsLCB0b0VsKSB7XG4gICAgdmFyIGZyb21Ob2RlTmFtZSA9IGZyb21FbC5ub2RlTmFtZTtcbiAgICB2YXIgdG9Ob2RlTmFtZSA9IHRvRWwubm9kZU5hbWU7XG5cbiAgICBpZiAoZnJvbU5vZGVOYW1lID09PSB0b05vZGVOYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0b0VsLmFjdHVhbGl6ZSAmJlxuICAgICAgICBmcm9tTm9kZU5hbWUuY2hhckNvZGVBdCgwKSA8IDkxICYmIC8qIGZyb20gdGFnIG5hbWUgaXMgdXBwZXIgY2FzZSAqL1xuICAgICAgICB0b05vZGVOYW1lLmNoYXJDb2RlQXQoMCkgPiA5MCAvKiB0YXJnZXQgdGFnIG5hbWUgaXMgbG93ZXIgY2FzZSAqLykge1xuICAgICAgICAvLyBJZiB0aGUgdGFyZ2V0IGVsZW1lbnQgaXMgYSB2aXJ0dWFsIERPTSBub2RlIHRoZW4gd2UgbWF5IG5lZWQgdG8gbm9ybWFsaXplIHRoZSB0YWcgbmFtZVxuICAgICAgICAvLyBiZWZvcmUgY29tcGFyaW5nLiBOb3JtYWwgSFRNTCBlbGVtZW50cyB0aGF0IGFyZSBpbiB0aGUgXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCJcbiAgICAgICAgLy8gYXJlIGNvbnZlcnRlZCB0byB1cHBlciBjYXNlXG4gICAgICAgIHJldHVybiBmcm9tTm9kZU5hbWUgPT09IHRvTm9kZU5hbWUudG9VcHBlckNhc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG4vKipcbiAqIENyZWF0ZSBhbiBlbGVtZW50LCBvcHRpb25hbGx5IHdpdGggYSBrbm93biBuYW1lc3BhY2UgVVJJLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIHRoZSBlbGVtZW50IG5hbWUsIGUuZy4gJ2Rpdicgb3IgJ3N2ZydcbiAqIEBwYXJhbSB7c3RyaW5nfSBbbmFtZXNwYWNlVVJJXSB0aGUgZWxlbWVudCdzIG5hbWVzcGFjZSBVUkksIGkuZS4gdGhlIHZhbHVlIG9mXG4gKiBpdHMgYHhtbG5zYCBhdHRyaWJ1dGUgb3IgaXRzIGluZmVycmVkIG5hbWVzcGFjZS5cbiAqXG4gKiBAcmV0dXJuIHtFbGVtZW50fVxuICovXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50TlMobmFtZSwgbmFtZXNwYWNlVVJJKSB7XG4gICAgcmV0dXJuICFuYW1lc3BhY2VVUkkgfHwgbmFtZXNwYWNlVVJJID09PSBOU19YSFRNTCA/XG4gICAgICAgIGRvYy5jcmVhdGVFbGVtZW50KG5hbWUpIDpcbiAgICAgICAgZG9jLmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2VVUkksIG5hbWUpO1xufVxuXG4vKipcbiAqIExvb3Agb3ZlciBhbGwgb2YgdGhlIGF0dHJpYnV0ZXMgb24gdGhlIHRhcmdldCBub2RlIGFuZCBtYWtlIHN1cmUgdGhlIG9yaWdpbmFsXG4gKiBET00gbm9kZSBoYXMgdGhlIHNhbWUgYXR0cmlidXRlcy4gSWYgYW4gYXR0cmlidXRlIGZvdW5kIG9uIHRoZSBvcmlnaW5hbCBub2RlXG4gKiBpcyBub3Qgb24gdGhlIG5ldyBub2RlIHRoZW4gcmVtb3ZlIGl0IGZyb20gdGhlIG9yaWdpbmFsIG5vZGUuXG4gKlxuICogQHBhcmFtICB7RWxlbWVudH0gZnJvbU5vZGVcbiAqIEBwYXJhbSAge0VsZW1lbnR9IHRvTm9kZVxuICovXG5mdW5jdGlvbiBtb3JwaEF0dHJzKGZyb21Ob2RlLCB0b05vZGUpIHtcbiAgICB2YXIgYXR0cnMgPSB0b05vZGUuYXR0cmlidXRlcztcbiAgICB2YXIgaTtcbiAgICB2YXIgYXR0cjtcbiAgICB2YXIgYXR0ck5hbWU7XG4gICAgdmFyIGF0dHJOYW1lc3BhY2VVUkk7XG4gICAgdmFyIGF0dHJWYWx1ZTtcbiAgICB2YXIgZnJvbVZhbHVlO1xuXG4gICAgaWYgKHRvTm9kZS5hc3NpZ25BdHRyaWJ1dGVzKSB7XG4gICAgICAgIHRvTm9kZS5hc3NpZ25BdHRyaWJ1dGVzKGZyb21Ob2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGkgPSBhdHRycy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgYXR0ciA9IGF0dHJzW2ldO1xuICAgICAgICAgICAgYXR0ck5hbWUgPSBhdHRyLm5hbWU7XG4gICAgICAgICAgICBhdHRyTmFtZXNwYWNlVVJJID0gYXR0ci5uYW1lc3BhY2VVUkk7XG4gICAgICAgICAgICBhdHRyVmFsdWUgPSBhdHRyLnZhbHVlO1xuXG4gICAgICAgICAgICBpZiAoYXR0ck5hbWVzcGFjZVVSSSkge1xuICAgICAgICAgICAgICAgIGF0dHJOYW1lID0gYXR0ci5sb2NhbE5hbWUgfHwgYXR0ck5hbWU7XG4gICAgICAgICAgICAgICAgZnJvbVZhbHVlID0gZnJvbU5vZGUuZ2V0QXR0cmlidXRlTlMoYXR0ck5hbWVzcGFjZVVSSSwgYXR0ck5hbWUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZyb21WYWx1ZSAhPT0gYXR0clZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyb21Ob2RlLnNldEF0dHJpYnV0ZU5TKGF0dHJOYW1lc3BhY2VVUkksIGF0dHJOYW1lLCBhdHRyVmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZnJvbVZhbHVlID0gZnJvbU5vZGUuZ2V0QXR0cmlidXRlKGF0dHJOYW1lKTtcblxuICAgICAgICAgICAgICAgIGlmIChmcm9tVmFsdWUgIT09IGF0dHJWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBmcm9tTm9kZS5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGFueSBleHRyYSBhdHRyaWJ1dGVzIGZvdW5kIG9uIHRoZSBvcmlnaW5hbCBET00gZWxlbWVudCB0aGF0XG4gICAgLy8gd2VyZW4ndCBmb3VuZCBvbiB0aGUgdGFyZ2V0IGVsZW1lbnQuXG4gICAgYXR0cnMgPSBmcm9tTm9kZS5hdHRyaWJ1dGVzO1xuXG4gICAgZm9yIChpID0gYXR0cnMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgYXR0ciA9IGF0dHJzW2ldO1xuICAgICAgICBpZiAoYXR0ci5zcGVjaWZpZWQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBhdHRyTmFtZSA9IGF0dHIubmFtZTtcbiAgICAgICAgICAgIGF0dHJOYW1lc3BhY2VVUkkgPSBhdHRyLm5hbWVzcGFjZVVSSTtcblxuICAgICAgICAgICAgaWYgKGF0dHJOYW1lc3BhY2VVUkkpIHtcbiAgICAgICAgICAgICAgICBhdHRyTmFtZSA9IGF0dHIubG9jYWxOYW1lIHx8IGF0dHJOYW1lO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFoYXNBdHRyaWJ1dGVOUyh0b05vZGUsIGF0dHJOYW1lc3BhY2VVUkksIGF0dHJOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICBmcm9tTm9kZS5yZW1vdmVBdHRyaWJ1dGVOUyhhdHRyTmFtZXNwYWNlVVJJLCBhdHRyTmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIWhhc0F0dHJpYnV0ZU5TKHRvTm9kZSwgbnVsbCwgYXR0ck5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyb21Ob2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIENvcGllcyB0aGUgY2hpbGRyZW4gb2Ygb25lIERPTSBlbGVtZW50IHRvIGFub3RoZXIgRE9NIGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gbW92ZUNoaWxkcmVuKGZyb21FbCwgdG9FbCkge1xuICAgIHZhciBjdXJDaGlsZCA9IGZyb21FbC5maXJzdENoaWxkO1xuICAgIHdoaWxlIChjdXJDaGlsZCkge1xuICAgICAgICB2YXIgbmV4dENoaWxkID0gY3VyQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgIHRvRWwuYXBwZW5kQ2hpbGQoY3VyQ2hpbGQpO1xuICAgICAgICBjdXJDaGlsZCA9IG5leHRDaGlsZDtcbiAgICB9XG4gICAgcmV0dXJuIHRvRWw7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRHZXROb2RlS2V5KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5pZDtcbn1cblxuZnVuY3Rpb24gbW9ycGhkb20oZnJvbU5vZGUsIHRvTm9kZSwgb3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0ge307XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0b05vZGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmIChmcm9tTm9kZS5ub2RlTmFtZSA9PT0gJyNkb2N1bWVudCcgfHwgZnJvbU5vZGUubm9kZU5hbWUgPT09ICdIVE1MJykge1xuICAgICAgICAgICAgdmFyIHRvTm9kZUh0bWwgPSB0b05vZGU7XG4gICAgICAgICAgICB0b05vZGUgPSBkb2MuY3JlYXRlRWxlbWVudCgnaHRtbCcpO1xuICAgICAgICAgICAgdG9Ob2RlLmlubmVySFRNTCA9IHRvTm9kZUh0bWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b05vZGUgPSB0b0VsZW1lbnQodG9Ob2RlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBnZXROb2RlS2V5ID0gb3B0aW9ucy5nZXROb2RlS2V5IHx8IGRlZmF1bHRHZXROb2RlS2V5O1xuICAgIHZhciBvbkJlZm9yZU5vZGVBZGRlZCA9IG9wdGlvbnMub25CZWZvcmVOb2RlQWRkZWQgfHwgbm9vcDtcbiAgICB2YXIgb25Ob2RlQWRkZWQgPSBvcHRpb25zLm9uTm9kZUFkZGVkIHx8IG5vb3A7XG4gICAgdmFyIG9uQmVmb3JlRWxVcGRhdGVkID0gb3B0aW9ucy5vbkJlZm9yZUVsVXBkYXRlZCB8fCBub29wO1xuICAgIHZhciBvbkVsVXBkYXRlZCA9IG9wdGlvbnMub25FbFVwZGF0ZWQgfHwgbm9vcDtcbiAgICB2YXIgb25CZWZvcmVOb2RlRGlzY2FyZGVkID0gb3B0aW9ucy5vbkJlZm9yZU5vZGVEaXNjYXJkZWQgfHwgbm9vcDtcbiAgICB2YXIgb25Ob2RlRGlzY2FyZGVkID0gb3B0aW9ucy5vbk5vZGVEaXNjYXJkZWQgfHwgbm9vcDtcbiAgICB2YXIgb25CZWZvcmVFbENoaWxkcmVuVXBkYXRlZCA9IG9wdGlvbnMub25CZWZvcmVFbENoaWxkcmVuVXBkYXRlZCB8fCBub29wO1xuICAgIHZhciBjaGlsZHJlbk9ubHkgPSBvcHRpb25zLmNoaWxkcmVuT25seSA9PT0gdHJ1ZTtcblxuICAgIC8vIFRoaXMgb2JqZWN0IGlzIHVzZWQgYXMgYSBsb29rdXAgdG8gcXVpY2tseSBmaW5kIGFsbCBrZXllZCBlbGVtZW50cyBpbiB0aGUgb3JpZ2luYWwgRE9NIHRyZWUuXG4gICAgdmFyIGZyb21Ob2Rlc0xvb2t1cCA9IHt9O1xuICAgIHZhciBrZXllZFJlbW92YWxMaXN0O1xuXG4gICAgZnVuY3Rpb24gYWRkS2V5ZWRSZW1vdmFsKGtleSkge1xuICAgICAgICBpZiAoa2V5ZWRSZW1vdmFsTGlzdCkge1xuICAgICAgICAgICAga2V5ZWRSZW1vdmFsTGlzdC5wdXNoKGtleSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBrZXllZFJlbW92YWxMaXN0ID0gW2tleV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3YWxrRGlzY2FyZGVkQ2hpbGROb2Rlcyhub2RlLCBza2lwS2V5ZWROb2Rlcykge1xuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICB2YXIgY3VyQ2hpbGQgPSBub2RlLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICB3aGlsZSAoY3VyQ2hpbGQpIHtcblxuICAgICAgICAgICAgICAgIHZhciBrZXkgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2tpcEtleWVkTm9kZXMgJiYgKGtleSA9IGdldE5vZGVLZXkoY3VyQ2hpbGQpKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSBhcmUgc2tpcHBpbmcga2V5ZWQgbm9kZXMgdGhlbiB3ZSBhZGQgdGhlIGtleVxuICAgICAgICAgICAgICAgICAgICAvLyB0byBhIGxpc3Qgc28gdGhhdCBpdCBjYW4gYmUgaGFuZGxlZCBhdCB0aGUgdmVyeSBlbmQuXG4gICAgICAgICAgICAgICAgICAgIGFkZEtleWVkUmVtb3ZhbChrZXkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE9ubHkgcmVwb3J0IHRoZSBub2RlIGFzIGRpc2NhcmRlZCBpZiBpdCBpcyBub3Qga2V5ZWQuIFdlIGRvIHRoaXMgYmVjYXVzZVxuICAgICAgICAgICAgICAgICAgICAvLyBhdCB0aGUgZW5kIHdlIGxvb3AgdGhyb3VnaCBhbGwga2V5ZWQgZWxlbWVudHMgdGhhdCB3ZXJlIHVubWF0Y2hlZFxuICAgICAgICAgICAgICAgICAgICAvLyBhbmQgdGhlbiBkaXNjYXJkIHRoZW0gaW4gb25lIGZpbmFsIHBhc3MuXG4gICAgICAgICAgICAgICAgICAgIG9uTm9kZURpc2NhcmRlZChjdXJDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJDaGlsZC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3YWxrRGlzY2FyZGVkQ2hpbGROb2RlcyhjdXJDaGlsZCwgc2tpcEtleWVkTm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY3VyQ2hpbGQgPSBjdXJDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBET00gbm9kZSBvdXQgb2YgdGhlIG9yaWdpbmFsIERPTVxuICAgICAqXG4gICAgICogQHBhcmFtICB7Tm9kZX0gbm9kZSBUaGUgbm9kZSB0byByZW1vdmVcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBwYXJlbnROb2RlIFRoZSBub2RlcyBwYXJlbnRcbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufSBza2lwS2V5ZWROb2RlcyBJZiB0cnVlIHRoZW4gZWxlbWVudHMgd2l0aCBrZXlzIHdpbGwgYmUgc2tpcHBlZCBhbmQgbm90IGRpc2NhcmRlZC5cbiAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVtb3ZlTm9kZShub2RlLCBwYXJlbnROb2RlLCBza2lwS2V5ZWROb2Rlcykge1xuICAgICAgICBpZiAob25CZWZvcmVOb2RlRGlzY2FyZGVkKG5vZGUpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBvbk5vZGVEaXNjYXJkZWQobm9kZSk7XG4gICAgICAgIHdhbGtEaXNjYXJkZWRDaGlsZE5vZGVzKG5vZGUsIHNraXBLZXllZE5vZGVzKTtcbiAgICB9XG5cbiAgICAvLyAvLyBUcmVlV2Fsa2VyIGltcGxlbWVudGF0aW9uIGlzIG5vIGZhc3RlciwgYnV0IGtlZXBpbmcgdGhpcyBhcm91bmQgaW4gY2FzZSB0aGlzIGNoYW5nZXMgaW4gdGhlIGZ1dHVyZVxuICAgIC8vIGZ1bmN0aW9uIGluZGV4VHJlZShyb290KSB7XG4gICAgLy8gICAgIHZhciB0cmVlV2Fsa2VyID0gZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihcbiAgICAvLyAgICAgICAgIHJvb3QsXG4gICAgLy8gICAgICAgICBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCk7XG4gICAgLy9cbiAgICAvLyAgICAgdmFyIGVsO1xuICAgIC8vICAgICB3aGlsZSgoZWwgPSB0cmVlV2Fsa2VyLm5leHROb2RlKCkpKSB7XG4gICAgLy8gICAgICAgICB2YXIga2V5ID0gZ2V0Tm9kZUtleShlbCk7XG4gICAgLy8gICAgICAgICBpZiAoa2V5KSB7XG4gICAgLy8gICAgICAgICAgICAgZnJvbU5vZGVzTG9va3VwW2tleV0gPSBlbDtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vIH1cblxuICAgIC8vIC8vIE5vZGVJdGVyYXRvciBpbXBsZW1lbnRhdGlvbiBpcyBubyBmYXN0ZXIsIGJ1dCBrZWVwaW5nIHRoaXMgYXJvdW5kIGluIGNhc2UgdGhpcyBjaGFuZ2VzIGluIHRoZSBmdXR1cmVcbiAgICAvL1xuICAgIC8vIGZ1bmN0aW9uIGluZGV4VHJlZShub2RlKSB7XG4gICAgLy8gICAgIHZhciBub2RlSXRlcmF0b3IgPSBkb2N1bWVudC5jcmVhdGVOb2RlSXRlcmF0b3Iobm9kZSwgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQpO1xuICAgIC8vICAgICB2YXIgZWw7XG4gICAgLy8gICAgIHdoaWxlKChlbCA9IG5vZGVJdGVyYXRvci5uZXh0Tm9kZSgpKSkge1xuICAgIC8vICAgICAgICAgdmFyIGtleSA9IGdldE5vZGVLZXkoZWwpO1xuICAgIC8vICAgICAgICAgaWYgKGtleSkge1xuICAgIC8vICAgICAgICAgICAgIGZyb21Ob2Rlc0xvb2t1cFtrZXldID0gZWw7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG5cbiAgICBmdW5jdGlvbiBpbmRleFRyZWUobm9kZSkge1xuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICB2YXIgY3VyQ2hpbGQgPSBub2RlLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICB3aGlsZSAoY3VyQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gZ2V0Tm9kZUtleShjdXJDaGlsZCk7XG4gICAgICAgICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgICAgICAgICBmcm9tTm9kZXNMb29rdXBba2V5XSA9IGN1ckNoaWxkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFdhbGsgcmVjdXJzaXZlbHlcbiAgICAgICAgICAgICAgICBpbmRleFRyZWUoY3VyQ2hpbGQpO1xuXG4gICAgICAgICAgICAgICAgY3VyQ2hpbGQgPSBjdXJDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluZGV4VHJlZShmcm9tTm9kZSk7XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVOb2RlQWRkZWQoZWwpIHtcbiAgICAgICAgb25Ob2RlQWRkZWQoZWwpO1xuXG4gICAgICAgIHZhciBjdXJDaGlsZCA9IGVsLmZpcnN0Q2hpbGQ7XG4gICAgICAgIHdoaWxlIChjdXJDaGlsZCkge1xuICAgICAgICAgICAgdmFyIG5leHRTaWJsaW5nID0gY3VyQ2hpbGQubmV4dFNpYmxpbmc7XG5cbiAgICAgICAgICAgIHZhciBrZXkgPSBnZXROb2RlS2V5KGN1ckNoaWxkKTtcbiAgICAgICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdW5tYXRjaGVkRnJvbUVsID0gZnJvbU5vZGVzTG9va3VwW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKHVubWF0Y2hlZEZyb21FbCAmJiBjb21wYXJlTm9kZU5hbWVzKGN1ckNoaWxkLCB1bm1hdGNoZWRGcm9tRWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1ckNoaWxkLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHVubWF0Y2hlZEZyb21FbCwgY3VyQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBtb3JwaEVsKHVubWF0Y2hlZEZyb21FbCwgY3VyQ2hpbGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaGFuZGxlTm9kZUFkZGVkKGN1ckNoaWxkKTtcbiAgICAgICAgICAgIGN1ckNoaWxkID0gbmV4dFNpYmxpbmc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb3JwaEVsKGZyb21FbCwgdG9FbCwgY2hpbGRyZW5Pbmx5KSB7XG4gICAgICAgIHZhciB0b0VsS2V5ID0gZ2V0Tm9kZUtleSh0b0VsKTtcbiAgICAgICAgdmFyIGN1ckZyb21Ob2RlS2V5O1xuXG4gICAgICAgIGlmICh0b0VsS2V5KSB7XG4gICAgICAgICAgICAvLyBJZiBhbiBlbGVtZW50IHdpdGggYW4gSUQgaXMgYmVpbmcgbW9ycGhlZCB0aGVuIGl0IGlzIHdpbGwgYmUgaW4gdGhlIGZpbmFsXG4gICAgICAgICAgICAvLyBET00gc28gY2xlYXIgaXQgb3V0IG9mIHRoZSBzYXZlZCBlbGVtZW50cyBjb2xsZWN0aW9uXG4gICAgICAgICAgICBkZWxldGUgZnJvbU5vZGVzTG9va3VwW3RvRWxLZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRvTm9kZS5pc1NhbWVOb2RlICYmIHRvTm9kZS5pc1NhbWVOb2RlKGZyb21Ob2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjaGlsZHJlbk9ubHkpIHtcbiAgICAgICAgICAgIGlmIChvbkJlZm9yZUVsVXBkYXRlZChmcm9tRWwsIHRvRWwpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbW9ycGhBdHRycyhmcm9tRWwsIHRvRWwpO1xuICAgICAgICAgICAgb25FbFVwZGF0ZWQoZnJvbUVsKTtcblxuICAgICAgICAgICAgaWYgKG9uQmVmb3JlRWxDaGlsZHJlblVwZGF0ZWQoZnJvbUVsLCB0b0VsKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZnJvbUVsLm5vZGVOYW1lICE9PSAnVEVYVEFSRUEnKSB7XG4gICAgICAgICAgICB2YXIgY3VyVG9Ob2RlQ2hpbGQgPSB0b0VsLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICB2YXIgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21FbC5maXJzdENoaWxkO1xuICAgICAgICAgICAgdmFyIGN1clRvTm9kZUtleTtcblxuICAgICAgICAgICAgdmFyIGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgIHZhciB0b05leHRTaWJsaW5nO1xuICAgICAgICAgICAgdmFyIG1hdGNoaW5nRnJvbUVsO1xuXG4gICAgICAgICAgICBvdXRlcjogd2hpbGUgKGN1clRvTm9kZUNoaWxkKSB7XG4gICAgICAgICAgICAgICAgdG9OZXh0U2libGluZyA9IGN1clRvTm9kZUNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGN1clRvTm9kZUtleSA9IGdldE5vZGVLZXkoY3VyVG9Ob2RlQ2hpbGQpO1xuXG4gICAgICAgICAgICAgICAgd2hpbGUgKGN1ckZyb21Ob2RlQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbU5leHRTaWJsaW5nID0gY3VyRnJvbU5vZGVDaGlsZC5uZXh0U2libGluZztcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VyVG9Ob2RlQ2hpbGQuaXNTYW1lTm9kZSAmJiBjdXJUb05vZGVDaGlsZC5pc1NhbWVOb2RlKGN1ckZyb21Ob2RlQ2hpbGQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJUb05vZGVDaGlsZCA9IHRvTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUtleSA9IGdldE5vZGVLZXkoY3VyRnJvbU5vZGVDaGlsZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1ckZyb21Ob2RlVHlwZSA9IGN1ckZyb21Ob2RlQ2hpbGQubm9kZVR5cGU7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzQ29tcGF0aWJsZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VyRnJvbU5vZGVUeXBlID09PSBjdXJUb05vZGVDaGlsZC5ub2RlVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckZyb21Ob2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQm90aCBub2RlcyBiZWluZyBjb21wYXJlZCBhcmUgRWxlbWVudCBub2Rlc1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1clRvTm9kZUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgdGFyZ2V0IG5vZGUgaGFzIGEga2V5IHNvIHdlIHdhbnQgdG8gbWF0Y2ggaXQgdXAgd2l0aCB0aGUgY29ycmVjdCBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGluIHRoZSBvcmlnaW5hbCBET00gdHJlZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyVG9Ob2RlS2V5ICE9PSBjdXJGcm9tTm9kZUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGN1cnJlbnQgZWxlbWVudCBpbiB0aGUgb3JpZ2luYWwgRE9NIHRyZWUgZG9lcyBub3QgaGF2ZSBhIG1hdGNoaW5nIGtleSBzb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0J3MgY2hlY2sgb3VyIGxvb2t1cCB0byBzZWUgaWYgdGhlcmUgaXMgYSBtYXRjaGluZyBlbGVtZW50IGluIHRoZSBvcmlnaW5hbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRE9NIHRyZWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobWF0Y2hpbmdGcm9tRWwgPSBmcm9tTm9kZXNMb29rdXBbY3VyVG9Ob2RlS2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyRnJvbU5vZGVDaGlsZC5uZXh0U2libGluZyA9PT0gbWF0Y2hpbmdGcm9tRWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3BlY2lhbCBjYXNlIGZvciBzaW5nbGUgZWxlbWVudCByZW1vdmFscy4gVG8gYXZvaWQgcmVtb3ZpbmcgdGhlIG9yaWdpbmFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERPTSBub2RlIG91dCBvZiB0aGUgdHJlZSAoc2luY2UgdGhhdCBjYW4gYnJlYWsgQ1NTIHRyYW5zaXRpb25zLCBldGMuKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2Ugd2lsbCBpbnN0ZWFkIGRpc2NhcmQgdGhlIGN1cnJlbnQgbm9kZSBhbmQgd2FpdCB1bnRpbCB0aGUgbmV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpdGVyYXRpb24gdG8gcHJvcGVybHkgbWF0Y2ggdXAgdGhlIGtleWVkIHRhcmdldCBlbGVtZW50IHdpdGggaXRzIG1hdGNoaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVsZW1lbnQgaW4gdGhlIG9yaWdpbmFsIHRyZWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDb21wYXRpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgZm91bmQgYSBtYXRjaGluZyBrZXllZCBlbGVtZW50IHNvbWV3aGVyZSBpbiB0aGUgb3JpZ2luYWwgRE9NIHRyZWUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIExldCdzIG1vdmluZyB0aGUgb3JpZ2luYWwgRE9NIG5vZGUgaW50byB0aGUgY3VycmVudCBwb3NpdGlvbiBhbmQgbW9ycGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXQuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTk9URTogV2UgdXNlIGluc2VydEJlZm9yZSBpbnN0ZWFkIG9mIHJlcGxhY2VDaGlsZCBiZWNhdXNlIHdlIHdhbnQgdG8gZ28gdGhyb3VnaFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgYHJlbW92ZU5vZGUoKWAgZnVuY3Rpb24gZm9yIHRoZSBub2RlIHRoYXQgaXMgYmVpbmcgZGlzY2FyZGVkIHNvIHRoYXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWxsIGxpZmVjeWNsZSBob29rcyBhcmUgY29ycmVjdGx5IGludm9rZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbUVsLmluc2VydEJlZm9yZShtYXRjaGluZ0Zyb21FbCwgY3VyRnJvbU5vZGVDaGlsZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckZyb21Ob2RlS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTaW5jZSB0aGUgbm9kZSBpcyBrZXllZCBpdCBtaWdodCBiZSBtYXRjaGVkIHVwIGxhdGVyIHNvIHdlIGRlZmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgYWN0dWFsIHJlbW92YWwgdG8gbGF0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZEtleWVkUmVtb3ZhbChjdXJGcm9tTm9kZUtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiB3ZSBza2lwIG5lc3RlZCBrZXllZCBub2RlcyBmcm9tIGJlaW5nIHJlbW92ZWQgc2luY2UgdGhlcmUgaXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgIHN0aWxsIGEgY2hhbmNlIHRoZXkgd2lsbCBiZSBtYXRjaGVkIHVwIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVOb2RlKGN1ckZyb21Ob2RlQ2hpbGQsIGZyb21FbCwgdHJ1ZSAvKiBza2lwIGtleWVkIG5vZGVzICovKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb21OZXh0U2libGluZyA9IGN1ckZyb21Ob2RlQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQgPSBtYXRjaGluZ0Zyb21FbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBub2RlcyBhcmUgbm90IGNvbXBhdGlibGUgc2luY2UgdGhlIFwidG9cIiBub2RlIGhhcyBhIGtleSBhbmQgdGhlcmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpcyBubyBtYXRjaGluZyBrZXllZCBub2RlIGluIHRoZSBzb3VyY2UgdHJlZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGF0aWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJGcm9tTm9kZUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgb3JpZ2luYWwgaGFzIGEga2V5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGF0aWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGF0aWJsZSA9IGlzQ29tcGF0aWJsZSAhPT0gZmFsc2UgJiYgY29tcGFyZU5vZGVOYW1lcyhjdXJGcm9tTm9kZUNoaWxkLCBjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzQ29tcGF0aWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBmb3VuZCBjb21wYXRpYmxlIERPTSBlbGVtZW50cyBzbyB0cmFuc2Zvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGN1cnJlbnQgXCJmcm9tXCIgbm9kZSB0byBtYXRjaCB0aGUgY3VycmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0YXJnZXQgRE9NIG5vZGUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vcnBoRWwoY3VyRnJvbU5vZGVDaGlsZCwgY3VyVG9Ob2RlQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJGcm9tTm9kZVR5cGUgPT09IFRFWFRfTk9ERSB8fCBjdXJGcm9tTm9kZVR5cGUgPT0gQ09NTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQm90aCBub2RlcyBiZWluZyBjb21wYXJlZCBhcmUgVGV4dCBvciBDb21tZW50IG5vZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDb21wYXRpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTaW1wbHkgdXBkYXRlIG5vZGVWYWx1ZSBvbiB0aGUgb3JpZ2luYWwgbm9kZSB0b1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNoYW5nZSB0aGUgdGV4dCB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQubm9kZVZhbHVlID0gY3VyVG9Ob2RlQ2hpbGQubm9kZVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzQ29tcGF0aWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWR2YW5jZSBib3RoIHRoZSBcInRvXCIgY2hpbGQgYW5kIHRoZSBcImZyb21cIiBjaGlsZCBzaW5jZSB3ZSBmb3VuZCBhIG1hdGNoXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJUb05vZGVDaGlsZCA9IHRvTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBObyBjb21wYXRpYmxlIG1hdGNoIHNvIHJlbW92ZSB0aGUgb2xkIG5vZGUgZnJvbSB0aGUgRE9NIGFuZCBjb250aW51ZSB0cnlpbmcgdG8gZmluZCBhXG4gICAgICAgICAgICAgICAgICAgIC8vIG1hdGNoIGluIHRoZSBvcmlnaW5hbCBET00uIEhvd2V2ZXIsIHdlIG9ubHkgZG8gdGhpcyBpZiB0aGUgZnJvbSBub2RlIGlzIG5vdCBrZXllZFxuICAgICAgICAgICAgICAgICAgICAvLyBzaW5jZSBpdCBpcyBwb3NzaWJsZSB0aGF0IGEga2V5ZWQgbm9kZSBtaWdodCBtYXRjaCB1cCB3aXRoIGEgbm9kZSBzb21ld2hlcmUgZWxzZSBpbiB0aGVcbiAgICAgICAgICAgICAgICAgICAgLy8gdGFyZ2V0IHRyZWUgYW5kIHdlIGRvbid0IHdhbnQgdG8gZGlzY2FyZCBpdCBqdXN0IHlldCBzaW5jZSBpdCBzdGlsbCBtaWdodCBmaW5kIGFcbiAgICAgICAgICAgICAgICAgICAgLy8gaG9tZSBpbiB0aGUgZmluYWwgRE9NIHRyZWUuIEFmdGVyIGV2ZXJ5dGhpbmcgaXMgZG9uZSB3ZSB3aWxsIHJlbW92ZSBhbnkga2V5ZWQgbm9kZXNcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhhdCBkaWRuJ3QgZmluZCBhIGhvbWVcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckZyb21Ob2RlS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTaW5jZSB0aGUgbm9kZSBpcyBrZXllZCBpdCBtaWdodCBiZSBtYXRjaGVkIHVwIGxhdGVyIHNvIHdlIGRlZmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgYWN0dWFsIHJlbW92YWwgdG8gbGF0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZEtleWVkUmVtb3ZhbChjdXJGcm9tTm9kZUtleSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiB3ZSBza2lwIG5lc3RlZCBrZXllZCBub2RlcyBmcm9tIGJlaW5nIHJlbW92ZWQgc2luY2UgdGhlcmUgaXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgIHN0aWxsIGEgY2hhbmNlIHRoZXkgd2lsbCBiZSBtYXRjaGVkIHVwIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVOb2RlKGN1ckZyb21Ob2RlQ2hpbGQsIGZyb21FbCwgdHJ1ZSAvKiBza2lwIGtleWVkIG5vZGVzICovKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgZ290IHRoaXMgZmFyIHRoZW4gd2UgZGlkIG5vdCBmaW5kIGEgY2FuZGlkYXRlIG1hdGNoIGZvclxuICAgICAgICAgICAgICAgIC8vIG91ciBcInRvIG5vZGVcIiBhbmQgd2UgZXhoYXVzdGVkIGFsbCBvZiB0aGUgY2hpbGRyZW4gXCJmcm9tXCJcbiAgICAgICAgICAgICAgICAvLyBub2Rlcy4gVGhlcmVmb3JlLCB3ZSB3aWxsIGp1c3QgYXBwZW5kIHRoZSBjdXJyZW50IFwidG9cIiBub2RlXG4gICAgICAgICAgICAgICAgLy8gdG8gdGhlIGVuZFxuICAgICAgICAgICAgICAgIGlmIChjdXJUb05vZGVLZXkgJiYgKG1hdGNoaW5nRnJvbUVsID0gZnJvbU5vZGVzTG9va3VwW2N1clRvTm9kZUtleV0pICYmIGNvbXBhcmVOb2RlTmFtZXMobWF0Y2hpbmdGcm9tRWwsIGN1clRvTm9kZUNoaWxkKSkge1xuICAgICAgICAgICAgICAgICAgICBmcm9tRWwuYXBwZW5kQ2hpbGQobWF0Y2hpbmdGcm9tRWwpO1xuICAgICAgICAgICAgICAgICAgICBtb3JwaEVsKG1hdGNoaW5nRnJvbUVsLCBjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9uQmVmb3JlTm9kZUFkZGVkUmVzdWx0ID0gb25CZWZvcmVOb2RlQWRkZWQoY3VyVG9Ob2RlQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAob25CZWZvcmVOb2RlQWRkZWRSZXN1bHQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob25CZWZvcmVOb2RlQWRkZWRSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJUb05vZGVDaGlsZCA9IG9uQmVmb3JlTm9kZUFkZGVkUmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyVG9Ob2RlQ2hpbGQuYWN0dWFsaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyVG9Ob2RlQ2hpbGQgPSBjdXJUb05vZGVDaGlsZC5hY3R1YWxpemUoZnJvbUVsLm93bmVyRG9jdW1lbnQgfHwgZG9jKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZyb21FbC5hcHBlbmRDaGlsZChjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVOb2RlQWRkZWQoY3VyVG9Ob2RlQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY3VyVG9Ob2RlQ2hpbGQgPSB0b05leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFdlIGhhdmUgcHJvY2Vzc2VkIGFsbCBvZiB0aGUgXCJ0byBub2Rlc1wiLiBJZiBjdXJGcm9tTm9kZUNoaWxkIGlzXG4gICAgICAgICAgICAvLyBub24tbnVsbCB0aGVuIHdlIHN0aWxsIGhhdmUgc29tZSBmcm9tIG5vZGVzIGxlZnQgb3ZlciB0aGF0IG5lZWRcbiAgICAgICAgICAgIC8vIHRvIGJlIHJlbW92ZWRcbiAgICAgICAgICAgIHdoaWxlIChjdXJGcm9tTm9kZUNoaWxkKSB7XG4gICAgICAgICAgICAgICAgZnJvbU5leHRTaWJsaW5nID0gY3VyRnJvbU5vZGVDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgICBpZiAoKGN1ckZyb21Ob2RlS2V5ID0gZ2V0Tm9kZUtleShjdXJGcm9tTm9kZUNoaWxkKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2luY2UgdGhlIG5vZGUgaXMga2V5ZWQgaXQgbWlnaHQgYmUgbWF0Y2hlZCB1cCBsYXRlciBzbyB3ZSBkZWZlclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgYWN0dWFsIHJlbW92YWwgdG8gbGF0ZXJcbiAgICAgICAgICAgICAgICAgICAgYWRkS2V5ZWRSZW1vdmFsKGN1ckZyb21Ob2RlS2V5KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiB3ZSBza2lwIG5lc3RlZCBrZXllZCBub2RlcyBmcm9tIGJlaW5nIHJlbW92ZWQgc2luY2UgdGhlcmUgaXNcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgc3RpbGwgYSBjaGFuY2UgdGhleSB3aWxsIGJlIG1hdGNoZWQgdXAgbGF0ZXJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTm9kZShjdXJGcm9tTm9kZUNoaWxkLCBmcm9tRWwsIHRydWUgLyogc2tpcCBrZXllZCBub2RlcyAqLyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3BlY2lhbEVsSGFuZGxlciA9IHNwZWNpYWxFbEhhbmRsZXJzW2Zyb21FbC5ub2RlTmFtZV07XG4gICAgICAgIGlmIChzcGVjaWFsRWxIYW5kbGVyKSB7XG4gICAgICAgICAgICBzcGVjaWFsRWxIYW5kbGVyKGZyb21FbCwgdG9FbCk7XG4gICAgICAgIH1cbiAgICB9IC8vIEVORDogbW9ycGhFbCguLi4pXG5cbiAgICB2YXIgbW9ycGhlZE5vZGUgPSBmcm9tTm9kZTtcbiAgICB2YXIgbW9ycGhlZE5vZGVUeXBlID0gbW9ycGhlZE5vZGUubm9kZVR5cGU7XG4gICAgdmFyIHRvTm9kZVR5cGUgPSB0b05vZGUubm9kZVR5cGU7XG5cbiAgICBpZiAoIWNoaWxkcmVuT25seSkge1xuICAgICAgICAvLyBIYW5kbGUgdGhlIGNhc2Ugd2hlcmUgd2UgYXJlIGdpdmVuIHR3byBET00gbm9kZXMgdGhhdCBhcmUgbm90XG4gICAgICAgIC8vIGNvbXBhdGlibGUgKGUuZy4gPGRpdj4gLS0+IDxzcGFuPiBvciA8ZGl2PiAtLT4gVEVYVClcbiAgICAgICAgaWYgKG1vcnBoZWROb2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICBpZiAodG9Ob2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjb21wYXJlTm9kZU5hbWVzKGZyb21Ob2RlLCB0b05vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uTm9kZURpc2NhcmRlZChmcm9tTm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIG1vcnBoZWROb2RlID0gbW92ZUNoaWxkcmVuKGZyb21Ob2RlLCBjcmVhdGVFbGVtZW50TlModG9Ob2RlLm5vZGVOYW1lLCB0b05vZGUubmFtZXNwYWNlVVJJKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBHb2luZyBmcm9tIGFuIGVsZW1lbnQgbm9kZSB0byBhIHRleHQgbm9kZVxuICAgICAgICAgICAgICAgIG1vcnBoZWROb2RlID0gdG9Ob2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG1vcnBoZWROb2RlVHlwZSA9PT0gVEVYVF9OT0RFIHx8IG1vcnBoZWROb2RlVHlwZSA9PT0gQ09NTUVOVF9OT0RFKSB7IC8vIFRleHQgb3IgY29tbWVudCBub2RlXG4gICAgICAgICAgICBpZiAodG9Ob2RlVHlwZSA9PT0gbW9ycGhlZE5vZGVUeXBlKSB7XG4gICAgICAgICAgICAgICAgbW9ycGhlZE5vZGUubm9kZVZhbHVlID0gdG9Ob2RlLm5vZGVWYWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9ycGhlZE5vZGU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFRleHQgbm9kZSB0byBzb21ldGhpbmcgZWxzZVxuICAgICAgICAgICAgICAgIG1vcnBoZWROb2RlID0gdG9Ob2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG1vcnBoZWROb2RlID09PSB0b05vZGUpIHtcbiAgICAgICAgLy8gVGhlIFwidG8gbm9kZVwiIHdhcyBub3QgY29tcGF0aWJsZSB3aXRoIHRoZSBcImZyb20gbm9kZVwiIHNvIHdlIGhhZCB0b1xuICAgICAgICAvLyB0b3NzIG91dCB0aGUgXCJmcm9tIG5vZGVcIiBhbmQgdXNlIHRoZSBcInRvIG5vZGVcIlxuICAgICAgICBvbk5vZGVEaXNjYXJkZWQoZnJvbU5vZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG1vcnBoRWwobW9ycGhlZE5vZGUsIHRvTm9kZSwgY2hpbGRyZW5Pbmx5KTtcblxuICAgICAgICAvLyBXZSBub3cgbmVlZCB0byBsb29wIG92ZXIgYW55IGtleWVkIG5vZGVzIHRoYXQgbWlnaHQgbmVlZCB0byBiZVxuICAgICAgICAvLyByZW1vdmVkLiBXZSBvbmx5IGRvIHRoZSByZW1vdmFsIGlmIHdlIGtub3cgdGhhdCB0aGUga2V5ZWQgbm9kZVxuICAgICAgICAvLyBuZXZlciBmb3VuZCBhIG1hdGNoLiBXaGVuIGEga2V5ZWQgbm9kZSBpcyBtYXRjaGVkIHVwIHdlIHJlbW92ZVxuICAgICAgICAvLyBpdCBvdXQgb2YgZnJvbU5vZGVzTG9va3VwIGFuZCB3ZSB1c2UgZnJvbU5vZGVzTG9va3VwIHRvIGRldGVybWluZVxuICAgICAgICAvLyBpZiBhIGtleWVkIG5vZGUgaGFzIGJlZW4gbWF0Y2hlZCB1cCBvciBub3RcbiAgICAgICAgaWYgKGtleWVkUmVtb3ZhbExpc3QpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGk9MCwgbGVuPWtleWVkUmVtb3ZhbExpc3QubGVuZ3RoOyBpPGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsVG9SZW1vdmUgPSBmcm9tTm9kZXNMb29rdXBba2V5ZWRSZW1vdmFsTGlzdFtpXV07XG4gICAgICAgICAgICAgICAgaWYgKGVsVG9SZW1vdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTm9kZShlbFRvUmVtb3ZlLCBlbFRvUmVtb3ZlLnBhcmVudE5vZGUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWNoaWxkcmVuT25seSAmJiBtb3JwaGVkTm9kZSAhPT0gZnJvbU5vZGUgJiYgZnJvbU5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgICBpZiAobW9ycGhlZE5vZGUuYWN0dWFsaXplKSB7XG4gICAgICAgICAgICBtb3JwaGVkTm9kZSA9IG1vcnBoZWROb2RlLmFjdHVhbGl6ZShmcm9tTm9kZS5vd25lckRvY3VtZW50IHx8IGRvYyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgd2UgaGFkIHRvIHN3YXAgb3V0IHRoZSBmcm9tIG5vZGUgd2l0aCBhIG5ldyBub2RlIGJlY2F1c2UgdGhlIG9sZFxuICAgICAgICAvLyBub2RlIHdhcyBub3QgY29tcGF0aWJsZSB3aXRoIHRoZSB0YXJnZXQgbm9kZSB0aGVuIHdlIG5lZWQgdG9cbiAgICAgICAgLy8gcmVwbGFjZSB0aGUgb2xkIERPTSBub2RlIGluIHRoZSBvcmlnaW5hbCBET00gdHJlZS4gVGhpcyBpcyBvbmx5XG4gICAgICAgIC8vIHBvc3NpYmxlIGlmIHRoZSBvcmlnaW5hbCBET00gbm9kZSB3YXMgcGFydCBvZiBhIERPTSB0cmVlIHdoaWNoXG4gICAgICAgIC8vIHdlIGtub3cgaXMgdGhlIGNhc2UgaWYgaXQgaGFzIGEgcGFyZW50IG5vZGUuXG4gICAgICAgIGZyb21Ob2RlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG1vcnBoZWROb2RlLCBmcm9tTm9kZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vcnBoZWROb2RlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1vcnBoZG9tO1xuIiwiY29uc3Qgd2luZG93ID0gcmVxdWlyZSgnZ2xvYmFsL3dpbmRvdycpXG5jb25zdCBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5hbm9yYWZcblxuLy8gT25seSBjYWxsIFJBRiB3aGVuIG5lZWRlZFxuLy8gKGZuLCBmbj8pIC0+IGZuXG5mdW5jdGlvbiBuYW5vcmFmIChyZW5kZXIsIHJhZikge1xuICBhc3NlcnQuZXF1YWwodHlwZW9mIHJlbmRlciwgJ2Z1bmN0aW9uJywgJ25hbm9yYWY6IHJlbmRlciBzaG91bGQgYmUgYSBmdW5jdGlvbicpXG4gIGFzc2VydC5vayh0eXBlb2YgcmFmID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiByYWYgPT09ICd1bmRlZmluZWQnLCAnbmFub3JhZjogcmFmIHNob3VsZCBiZSBhIGZ1bmN0aW9uIG9yIHVuZGVmaW5lZCcpXG5cbiAgaWYgKCFyYWYpIHsgcmFmID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB9XG5cbiAgdmFyIGluUmVuZGVyaW5nVHJhbnNhY3Rpb24gPSBmYWxzZVxuICB2YXIgcmVkcmF3U2NoZWR1bGVkID0gZmFsc2VcbiAgdmFyIGN1cnJlbnRTdGF0ZSA9IG51bGxcblxuICAvLyBwYXNzIG5ldyBzdGF0ZSB0byBiZSByZW5kZXJlZFxuICAvLyAob2JqLCBvYmo/KSAtPiBudWxsXG4gIHJldHVybiBmdW5jdGlvbiBmcmFtZSAoc3RhdGUsIHByZXYpIHtcbiAgICBhc3NlcnQuZXF1YWwodHlwZW9mIHN0YXRlLCAnb2JqZWN0JywgJ25hbm9yYWY6IHN0YXRlIHNob3VsZCBiZSBhbiBvYmplY3QnKVxuICAgIGFzc2VydC5lcXVhbCh0eXBlb2YgcHJldiwgJ29iamVjdCcsICduYW5vcmFmOiBwcmV2IHNob3VsZCBiZSBhbiBvYmplY3QnKVxuICAgIGFzc2VydC5lcXVhbChpblJlbmRlcmluZ1RyYW5zYWN0aW9uLCBmYWxzZSwgJ25hbm9yYWY6IGluZmluaXRlIGxvb3AgZGV0ZWN0ZWQnKVxuXG4gICAgLy8gcmVxdWVzdCBhIHJlZHJhdyBmb3IgbmV4dCBmcmFtZVxuICAgIGlmIChjdXJyZW50U3RhdGUgPT09IG51bGwgJiYgIXJlZHJhd1NjaGVkdWxlZCkge1xuICAgICAgcmVkcmF3U2NoZWR1bGVkID0gdHJ1ZVxuXG4gICAgICByYWYoZnVuY3Rpb24gcmVkcmF3ICgpIHtcbiAgICAgICAgcmVkcmF3U2NoZWR1bGVkID0gZmFsc2VcbiAgICAgICAgaWYgKCFjdXJyZW50U3RhdGUpIHJldHVyblxuXG4gICAgICAgIGluUmVuZGVyaW5nVHJhbnNhY3Rpb24gPSB0cnVlXG4gICAgICAgIHJlbmRlcihjdXJyZW50U3RhdGUsIHByZXYpXG4gICAgICAgIGluUmVuZGVyaW5nVHJhbnNhY3Rpb24gPSBmYWxzZVxuXG4gICAgICAgIGN1cnJlbnRTdGF0ZSA9IG51bGxcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIGRhdGEgZm9yIHJlZHJhd1xuICAgIGN1cnJlbnRTdGF0ZSA9IHN0YXRlXG4gIH1cbn1cbiIsIi8qIGdsb2JhbCBNdXRhdGlvbk9ic2VydmVyICovXG52YXIgZG9jdW1lbnQgPSByZXF1aXJlKCdnbG9iYWwvZG9jdW1lbnQnKVxudmFyIHdpbmRvdyA9IHJlcXVpcmUoJ2dsb2JhbC93aW5kb3cnKVxudmFyIHdhdGNoID0gT2JqZWN0LmNyZWF0ZShudWxsKVxudmFyIEtFWV9JRCA9ICdvbmxvYWRpZCcgKyAobmV3IERhdGUoKSAlIDllNikudG9TdHJpbmcoMzYpXG52YXIgS0VZX0FUVFIgPSAnZGF0YS0nICsgS0VZX0lEXG52YXIgSU5ERVggPSAwXG5cbmlmICh3aW5kb3cgJiYgd2luZG93Lk11dGF0aW9uT2JzZXJ2ZXIpIHtcbiAgdmFyIG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgIGlmIChPYmplY3Qua2V5cyh3YXRjaCkubGVuZ3RoIDwgMSkgcmV0dXJuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtdXRhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChtdXRhdGlvbnNbaV0uYXR0cmlidXRlTmFtZSA9PT0gS0VZX0FUVFIpIHtcbiAgICAgICAgZWFjaEF0dHIobXV0YXRpb25zW2ldLCB0dXJub24sIHR1cm5vZmYpXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICBlYWNoTXV0YXRpb24obXV0YXRpb25zW2ldLnJlbW92ZWROb2RlcywgdHVybm9mZilcbiAgICAgIGVhY2hNdXRhdGlvbihtdXRhdGlvbnNbaV0uYWRkZWROb2RlcywgdHVybm9uKVxuICAgIH1cbiAgfSlcbiAgb2JzZXJ2ZXIub2JzZXJ2ZShkb2N1bWVudC5ib2R5LCB7XG4gICAgY2hpbGRMaXN0OiB0cnVlLFxuICAgIHN1YnRyZWU6IHRydWUsXG4gICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVPbGRWYWx1ZTogdHJ1ZSxcbiAgICBhdHRyaWJ1dGVGaWx0ZXI6IFtLRVlfQVRUUl1cbiAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBvbmxvYWQgKGVsLCBvbiwgb2ZmLCBjYWxsZXIpIHtcbiAgb24gPSBvbiB8fCBmdW5jdGlvbiAoKSB7fVxuICBvZmYgPSBvZmYgfHwgZnVuY3Rpb24gKCkge31cbiAgZWwuc2V0QXR0cmlidXRlKEtFWV9BVFRSLCAnbycgKyBJTkRFWClcbiAgd2F0Y2hbJ28nICsgSU5ERVhdID0gW29uLCBvZmYsIDAsIGNhbGxlciB8fCBvbmxvYWQuY2FsbGVyXVxuICBJTkRFWCArPSAxXG4gIHJldHVybiBlbFxufVxuXG5mdW5jdGlvbiB0dXJub24gKGluZGV4LCBlbCkge1xuICBpZiAod2F0Y2hbaW5kZXhdWzBdICYmIHdhdGNoW2luZGV4XVsyXSA9PT0gMCkge1xuICAgIHdhdGNoW2luZGV4XVswXShlbClcbiAgICB3YXRjaFtpbmRleF1bMl0gPSAxXG4gIH1cbn1cblxuZnVuY3Rpb24gdHVybm9mZiAoaW5kZXgsIGVsKSB7XG4gIGlmICh3YXRjaFtpbmRleF1bMV0gJiYgd2F0Y2hbaW5kZXhdWzJdID09PSAxKSB7XG4gICAgd2F0Y2hbaW5kZXhdWzFdKGVsKVxuICAgIHdhdGNoW2luZGV4XVsyXSA9IDBcbiAgfVxufVxuXG5mdW5jdGlvbiBlYWNoQXR0ciAobXV0YXRpb24sIG9uLCBvZmYpIHtcbiAgdmFyIG5ld1ZhbHVlID0gbXV0YXRpb24udGFyZ2V0LmdldEF0dHJpYnV0ZShLRVlfQVRUUilcbiAgaWYgKHNhbWVPcmlnaW4obXV0YXRpb24ub2xkVmFsdWUsIG5ld1ZhbHVlKSkge1xuICAgIHdhdGNoW25ld1ZhbHVlXSA9IHdhdGNoW211dGF0aW9uLm9sZFZhbHVlXVxuICAgIHJldHVyblxuICB9XG4gIGlmICh3YXRjaFttdXRhdGlvbi5vbGRWYWx1ZV0pIHtcbiAgICBvZmYobXV0YXRpb24ub2xkVmFsdWUsIG11dGF0aW9uLnRhcmdldClcbiAgfVxuICBpZiAod2F0Y2hbbmV3VmFsdWVdKSB7XG4gICAgb24obmV3VmFsdWUsIG11dGF0aW9uLnRhcmdldClcbiAgfVxufVxuXG5mdW5jdGlvbiBzYW1lT3JpZ2luIChvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgaWYgKCFvbGRWYWx1ZSB8fCAhbmV3VmFsdWUpIHJldHVybiBmYWxzZVxuICByZXR1cm4gd2F0Y2hbb2xkVmFsdWVdWzNdID09PSB3YXRjaFtuZXdWYWx1ZV1bM11cbn1cblxuZnVuY3Rpb24gZWFjaE11dGF0aW9uIChub2RlcywgZm4pIHtcbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyh3YXRjaClcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChub2Rlc1tpXSAmJiBub2Rlc1tpXS5nZXRBdHRyaWJ1dGUgJiYgbm9kZXNbaV0uZ2V0QXR0cmlidXRlKEtFWV9BVFRSKSkge1xuICAgICAgdmFyIG9ubG9hZGlkID0gbm9kZXNbaV0uZ2V0QXR0cmlidXRlKEtFWV9BVFRSKVxuICAgICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrKSB7XG4gICAgICAgIGlmIChvbmxvYWRpZCA9PT0gaykge1xuICAgICAgICAgIGZuKGssIG5vZGVzW2ldKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBpZiAobm9kZXNbaV0uY2hpbGROb2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICBlYWNoTXV0YXRpb24obm9kZXNbaV0uY2hpbGROb2RlcywgZm4pXG4gICAgfVxuICB9XG59XG4iLCIvKiFcbiAqIHBhZC1sZWZ0IDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9wYWQtbGVmdD5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSwgSm9uIFNjaGxpbmtlcnQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVwZWF0ID0gcmVxdWlyZSgncmVwZWF0LXN0cmluZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhZExlZnQoc3RyLCBudW0sIGNoKSB7XG4gIHN0ciA9IHN0ci50b1N0cmluZygpO1xuXG4gIGlmICh0eXBlb2YgbnVtID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICBpZiAoY2ggPT09IDApIHtcbiAgICBjaCA9ICcwJztcbiAgfSBlbHNlIGlmIChjaCkge1xuICAgIGNoID0gY2gudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICBjaCA9ICcgJztcbiAgfVxuXG4gIHJldHVybiByZXBlYXQoY2gsIG51bSAtIHN0ci5sZW5ndGgpICsgc3RyO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJlcGVhdCA9IHJlcXVpcmUoJ3JlcGVhdC1zdHJpbmcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYWRMZWZ0KHZhbCwgbnVtLCBzdHIpIHtcbiAgdmFyIHBhZGRpbmcgPSAnJztcbiAgdmFyIGRpZmYgPSBudW0gLSB2YWwubGVuZ3RoO1xuXG4gIC8vIEJyZWFrcG9pbnRzIGJhc2VkIG9uIGJlbmNobWFya3MgdG8gdXNlIHRoZSBmYXN0ZXN0IGFwcHJvYWNoXG4gIC8vIGZvciB0aGUgZ2l2ZW4gbnVtYmVyIG9mIHplcm9zXG4gIGlmIChkaWZmIDw9IDUgJiYgIXN0cikge1xuICAgIHBhZGRpbmcgPSAnMDAwMDAnO1xuICB9IGVsc2UgaWYgKGRpZmYgPD0gMjUgJiYgIXN0cikge1xuICAgIHBhZGRpbmcgPSAnMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdmFsICsgcmVwZWF0KHN0ciB8fCAnMCcsIGRpZmYpO1xuICB9XG5cbiAgcmV0dXJuIHZhbCArIHBhZGRpbmcuc2xpY2UoMCwgZGlmZik7XG59O1xuIiwidmFyIHRyaW0gPSByZXF1aXJlKCd0cmltJylcbiAgLCBmb3JFYWNoID0gcmVxdWlyZSgnZm9yLWVhY2gnKVxuICAsIGlzQXJyYXkgPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJnKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGhlYWRlcnMpIHtcbiAgaWYgKCFoZWFkZXJzKVxuICAgIHJldHVybiB7fVxuXG4gIHZhciByZXN1bHQgPSB7fVxuXG4gIGZvckVhY2goXG4gICAgICB0cmltKGhlYWRlcnMpLnNwbGl0KCdcXG4nKVxuICAgICwgZnVuY3Rpb24gKHJvdykge1xuICAgICAgICB2YXIgaW5kZXggPSByb3cuaW5kZXhPZignOicpXG4gICAgICAgICAgLCBrZXkgPSB0cmltKHJvdy5zbGljZSgwLCBpbmRleCkpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAsIHZhbHVlID0gdHJpbShyb3cuc2xpY2UoaW5kZXggKyAxKSlcblxuICAgICAgICBpZiAodHlwZW9mKHJlc3VsdFtrZXldKSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IHZhbHVlXG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShyZXN1bHRba2V5XSkpIHtcbiAgICAgICAgICByZXN1bHRba2V5XS5wdXNoKHZhbHVlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdFtrZXldID0gWyByZXN1bHRba2V5XSwgdmFsdWUgXVxuICAgICAgICB9XG4gICAgICB9XG4gIClcblxuICByZXR1cm4gcmVzdWx0XG59IiwiY29uc3QgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0JylcblxubW9kdWxlLmV4cG9ydHMgPSBtYXRjaFxuXG4vLyBnZXQgdXJsIHBhdGggc2VjdGlvbiBmcm9tIGEgdXJsXG4vLyBzdHJpcCBxdWVyeXN0cmluZ3MgLyBoYXNoZXNcbi8vIHN0cmlwIHByb3RvY29sXG4vLyBzdHJpcCBob3N0bmFtZSBhbmQgcG9ydCAoYm90aCBpcCBhbmQgcm91dGUpXG4vLyBzdHIgLT4gc3RyXG5mdW5jdGlvbiBtYXRjaCAocm91dGUpIHtcbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiByb3V0ZSwgJ3N0cmluZycpXG5cbiAgcmV0dXJuIHJvdXRlLnRyaW0oKVxuICAgIC5yZXBsYWNlKC9bXFw/fCNdLiokLywgJycpXG4gICAgLnJlcGxhY2UoL14oPzpodHRwcz9cXDopXFwvXFwvLywgJycpXG4gICAgLnJlcGxhY2UoL14uKj8oXFwvLiopLywgJyQxJylcbiAgICAucmVwbGFjZSgvXFwvJC8sICcnKVxufVxuIiwiLyohXG4gKiByZXBlYXQtc3RyaW5nIDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9yZXBlYXQtc3RyaW5nPlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE1LCBKb24gU2NobGlua2VydC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogUmVzdWx0cyBjYWNoZVxuICovXG5cbnZhciByZXMgPSAnJztcbnZhciBjYWNoZTtcblxuLyoqXG4gKiBFeHBvc2UgYHJlcGVhdGBcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcGVhdDtcblxuLyoqXG4gKiBSZXBlYXQgdGhlIGdpdmVuIGBzdHJpbmdgIHRoZSBzcGVjaWZpZWQgYG51bWJlcmBcbiAqIG9mIHRpbWVzLlxuICpcbiAqICoqRXhhbXBsZToqKlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVwZWF0ID0gcmVxdWlyZSgncmVwZWF0LXN0cmluZycpO1xuICogcmVwZWF0KCdBJywgNSk7XG4gKiAvLz0+IEFBQUFBXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYHN0cmluZ2AgVGhlIHN0cmluZyB0byByZXBlYXRcbiAqIEBwYXJhbSB7TnVtYmVyfSBgbnVtYmVyYCBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIHJlcGVhdCB0aGUgc3RyaW5nXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFJlcGVhdGVkIHN0cmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiByZXBlYXQoc3RyLCBudW0pIHtcbiAgaWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcigncmVwZWF0LXN0cmluZyBleHBlY3RzIGEgc3RyaW5nLicpO1xuICB9XG5cbiAgLy8gY292ZXIgY29tbW9uLCBxdWljayB1c2UgY2FzZXNcbiAgaWYgKG51bSA9PT0gMSkgcmV0dXJuIHN0cjtcbiAgaWYgKG51bSA9PT0gMikgcmV0dXJuIHN0ciArIHN0cjtcblxuICB2YXIgbWF4ID0gc3RyLmxlbmd0aCAqIG51bTtcbiAgaWYgKGNhY2hlICE9PSBzdHIgfHwgdHlwZW9mIGNhY2hlID09PSAndW5kZWZpbmVkJykge1xuICAgIGNhY2hlID0gc3RyO1xuICAgIHJlcyA9ICcnO1xuICB9XG5cbiAgd2hpbGUgKG1heCA+IHJlcy5sZW5ndGggJiYgbnVtID4gMCkge1xuICAgIGlmIChudW0gJiAxKSB7XG4gICAgICByZXMgKz0gc3RyO1xuICAgIH1cblxuICAgIG51bSA+Pj0gMTtcbiAgICBpZiAoIW51bSkgYnJlYWs7XG4gICAgc3RyICs9IHN0cjtcbiAgfVxuXG4gIHJldHVybiByZXMuc3Vic3RyKDAsIG1heCk7XG59XG5cbiIsImNvbnN0IHdpbmRvdyA9IHJlcXVpcmUoJ2dsb2JhbC93aW5kb3cnKVxuY29uc3QgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0JylcblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoXG5cbi8vIGxpc3RlbiB0byB3aW5kb3cgaGFzaGNoYW5nZSBldmVudHNcbi8vIGFuZCB1cGRhdGUgcm91dGVyIGFjY29yZGluZ2x5XG4vLyBmbihjYikgLT4gbnVsbFxuZnVuY3Rpb24gaGFzaCAoY2IpIHtcbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBjYiwgJ2Z1bmN0aW9uJywgJ2NiIG11c3QgYmUgYSBmdW5jdGlvbicpXG4gIHdpbmRvdy5vbmhhc2hjaGFuZ2UgPSBmdW5jdGlvbiAoZSkge1xuICAgIGNiKHdpbmRvdy5sb2NhdGlvbi5oYXNoKVxuICB9XG59XG4iLCJjb25zdCBkb2N1bWVudCA9IHJlcXVpcmUoJ2dsb2JhbC9kb2N1bWVudCcpXG5jb25zdCB3aW5kb3cgPSByZXF1aXJlKCdnbG9iYWwvd2luZG93JylcbmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpXG5cbm1vZHVsZS5leHBvcnRzID0gaGlzdG9yeVxuXG4vLyBsaXN0ZW4gdG8gaHRtbDUgcHVzaHN0YXRlIGV2ZW50c1xuLy8gYW5kIHVwZGF0ZSByb3V0ZXIgYWNjb3JkaW5nbHlcbi8vIGZuKHN0cikgLT4gbnVsbFxuZnVuY3Rpb24gaGlzdG9yeSAoY2IpIHtcbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBjYiwgJ2Z1bmN0aW9uJywgJ2NiIG11c3QgYmUgYSBmdW5jdGlvbicpXG4gIHdpbmRvdy5vbnBvcHN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgIGNiKGRvY3VtZW50LmxvY2F0aW9uLmhyZWYpXG4gIH1cbn1cbiIsImNvbnN0IHdpbmRvdyA9IHJlcXVpcmUoJ2dsb2JhbC93aW5kb3cnKVxuY29uc3QgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0JylcblxubW9kdWxlLmV4cG9ydHMgPSBocmVmXG5cbi8vIGhhbmRsZSBhIGNsaWNrIGlmIGlzIGFuY2hvciB0YWcgd2l0aCBhbiBocmVmXG4vLyBhbmQgdXJsIGxpdmVzIG9uIHRoZSBzYW1lIGRvbWFpbi4gUmVwbGFjZXNcbi8vIHRyYWlsaW5nICcjJyBzbyBlbXB0eSBsaW5rcyB3b3JrIGFzIGV4cGVjdGVkLlxuLy8gZm4oc3RyKSAtPiBudWxsXG5mdW5jdGlvbiBocmVmIChjYikge1xuICBhc3NlcnQuZXF1YWwodHlwZW9mIGNiLCAnZnVuY3Rpb24nLCAnY2IgbXVzdCBiZSBhIGZ1bmN0aW9uJylcblxuICB3aW5kb3cub25jbGljayA9IGZ1bmN0aW9uIChlKSB7XG4gICAgY29uc3Qgbm9kZSA9IChmdW5jdGlvbiB0cmF2ZXJzZSAobm9kZSkge1xuICAgICAgaWYgKCFub2RlKSByZXR1cm5cbiAgICAgIGlmIChub2RlLmxvY2FsTmFtZSAhPT0gJ2EnKSByZXR1cm4gdHJhdmVyc2Uobm9kZS5wYXJlbnROb2RlKVxuICAgICAgaWYgKG5vZGUuaHJlZiA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdHJhdmVyc2Uobm9kZS5wYXJlbnROb2RlKVxuICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0ICE9PSBub2RlLmhvc3QpIHJldHVybiB0cmF2ZXJzZShub2RlLnBhcmVudE5vZGUpXG4gICAgICByZXR1cm4gbm9kZVxuICAgIH0pKGUudGFyZ2V0KVxuXG4gICAgaWYgKCFub2RlKSByZXR1cm5cblxuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIGNvbnN0IGhyZWYgPSBub2RlLmhyZWYucmVwbGFjZSgvIyQvLCAnJylcbiAgICBjYihocmVmKVxuICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7fSwgbnVsbCwgaHJlZilcbiAgfVxufVxuIiwiY29uc3QgcGF0aG5hbWUgPSByZXF1aXJlKCdwYXRobmFtZS1tYXRjaCcpXG5jb25zdCB3YXlmYXJlciA9IHJlcXVpcmUoJ3dheWZhcmVyJylcbmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpXG5cbm1vZHVsZS5leHBvcnRzID0gc2hlZXRSb3V0ZXJcblxuLy8gRmFzdCwgbW9kdWxhciBjbGllbnQgcm91dGVyXG4vLyBmbihzdHIsIGFueVsuLl0sIGZuPykgLT4gZm4oc3RyLCBhbnlbLi5dKVxuZnVuY3Rpb24gc2hlZXRSb3V0ZXIgKGRmdCwgY3JlYXRlVHJlZSwgY3JlYXRlUm91dGUpIHtcbiAgY3JlYXRlUm91dGUgPSAoY3JlYXRlUm91dGUgPyBjcmVhdGVSb3V0ZShfY3JlYXRlUm91dGUpIDogX2NyZWF0ZVJvdXRlKVxuXG4gIGlmICghY3JlYXRlVHJlZSkge1xuICAgIGNyZWF0ZVRyZWUgPSBkZnRcbiAgICBkZnQgPSAnJ1xuICB9XG5cbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBkZnQsICdzdHJpbmcnLCAnc2hlZXQtcm91dGVyOiBkZnQgbXVzdCBiZSBhIHN0cmluZycpXG4gIGFzc2VydC5lcXVhbCh0eXBlb2YgY3JlYXRlVHJlZSwgJ2Z1bmN0aW9uJywgJ3NoZWV0LXJvdXRlcjogY3JlYXRlVHJlZSBtdXN0IGJlIGEgZnVuY3Rpb24nKVxuICBhc3NlcnQuZXF1YWwodHlwZW9mIGNyZWF0ZVJvdXRlLCAnZnVuY3Rpb24nLCAnc2hlZXQtcm91dGVyOiBjcmVhdGVSb3V0ZSBtdXN0IGJlIGEgZnVuY3Rpb24nKVxuXG4gIGNvbnN0IHJvdXRlciA9IHdheWZhcmVyKGRmdClcbiAgY29uc3QgdHJlZSA9IGNyZWF0ZVRyZWUoY3JlYXRlUm91dGUpXG5cbiAgLy8gcmVnaXN0ZXIgdHJlZSBpbiByb3V0ZXJcbiAgOyhmdW5jdGlvbiB3YWxrICh0cmVlLCByb3V0ZSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRyZWVbMF0pKSB7XG4gICAgICAvLyB3YWxrIG92ZXIgYWxsIHJvdXRlcyBhdCB0aGUgcm9vdCBvZiB0aGUgdHJlZVxuICAgICAgdHJlZS5mb3JFYWNoKGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIHdhbGsobm9kZSwgcm91dGUpXG4gICAgICB9KVxuICAgIH0gZWxzZSBpZiAodHJlZVsxXSkge1xuICAgICAgLy8gaGFuZGxlIGlubGluZSBmdW5jdGlvbnMgYXMgYXJnc1xuICAgICAgY29uc3QgaW5uZXJSb3V0ZSA9IHRyZWVbMF1cbiAgICAgICAgPyByb3V0ZS5jb25jYXQodHJlZVswXSkuam9pbignLycpXG4gICAgICAgIDogcm91dGUubGVuZ3RoID8gcm91dGUuam9pbignLycpIDogdHJlZVswXVxuICAgICAgcm91dGVyLm9uKGlubmVyUm91dGUsIHRyZWVbMV0pXG4gICAgICB3YWxrKHRyZWVbMl0sIHJvdXRlLmNvbmNhdCh0cmVlWzBdKSlcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkodHJlZVsyXSkpIHtcbiAgICAgIC8vIHRyYXZlcnNlIGFuZCBhcHBlbmQgcm91dGVcbiAgICAgIHdhbGsodHJlZVsyXSwgcm91dGUuY29uY2F0KHRyZWVbMF0pKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZWdpc3RlciBwYXRoIGluIHJvdXRlclxuICAgICAgY29uc3QgbndSb3V0ZSA9IHRyZWVbMF1cbiAgICAgICAgPyByb3V0ZS5jb25jYXQodHJlZVswXSkuam9pbignLycpXG4gICAgICAgIDogcm91dGUubGVuZ3RoID8gcm91dGUuam9pbignLycpIDogdHJlZVswXVxuICAgICAgcm91dGVyLm9uKG53Um91dGUsIHRyZWVbMl0pXG4gICAgfVxuICB9KSh0cmVlLCBbXSlcblxuICAvLyBtYXRjaCBhIHJvdXRlIG9uIHRoZSByb3V0ZXJcbiAgcmV0dXJuIGZ1bmN0aW9uIG1hdGNoIChyb3V0ZSkge1xuICAgIGFzc2VydC5lcXVhbCh0eXBlb2Ygcm91dGUsICdzdHJpbmcnLCAncm91dGUgbXVzdCBiZSBhIHN0cmluZycpXG4gICAgY29uc3QgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuICAgIGFyZ3NbMF0gPSBwYXRobmFtZShhcmdzWzBdKVxuICAgIHJldHVybiByb3V0ZXIuYXBwbHkobnVsbCwgYXJncylcbiAgfVxufVxuXG4vLyByZWdpc3RlciByZWd1bGFyIHJvdXRlXG5mdW5jdGlvbiBfY3JlYXRlUm91dGUgKHJvdXRlLCBpbmxpbmUsIGNoaWxkKSB7XG4gIGlmICghY2hpbGQpIHtcbiAgICBjaGlsZCA9IGlubGluZVxuICAgIGlubGluZSA9IG51bGxcbiAgfVxuICBhc3NlcnQuZXF1YWwodHlwZW9mIHJvdXRlLCAnc3RyaW5nJywgJ3JvdXRlIG11c3QgYmUgYSBzdHJpbmcnKVxuICBhc3NlcnQub2soY2hpbGQsICdjaGlsZCBleGlzdHMnKVxuICByb3V0ZSA9IHJvdXRlLnJlcGxhY2UoL15cXC8vLCAnJylcbiAgcmV0dXJuIFsgcm91dGUsIGlubGluZSwgY2hpbGQgXVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCJcbi8vIE1vZHVsZSBleHBvcnQgcGF0dGVybiBmcm9tXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdW1kanMvdW1kL2Jsb2IvbWFzdGVyL3JldHVybkV4cG9ydHMuanNcbjsoZnVuY3Rpb24gKHJvb3QsIGZhY3RvcnkpIHtcbiAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICAgICAgZGVmaW5lKFtdLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAvLyBOb2RlLiBEb2VzIG5vdCB3b3JrIHdpdGggc3RyaWN0IENvbW1vbkpTLCBidXRcbiAgICAgICAgLy8gb25seSBDb21tb25KUy1saWtlIGVudmlyb25tZW50cyB0aGF0IHN1cHBvcnQgbW9kdWxlLmV4cG9ydHMsXG4gICAgICAgIC8vIGxpa2UgTm9kZS5cbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQnJvd3NlciBnbG9iYWxzIChyb290IGlzIHdpbmRvdylcbiAgICAgICAgcm9vdC5zdG9yZSA9IGZhY3RvcnkoKTtcbiAgfVxufSh0aGlzLCBmdW5jdGlvbiAoKSB7XG5cdFxuXHQvLyBTdG9yZS5qc1xuXHR2YXIgc3RvcmUgPSB7fSxcblx0XHR3aW4gPSAodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbCksXG5cdFx0ZG9jID0gd2luLmRvY3VtZW50LFxuXHRcdGxvY2FsU3RvcmFnZU5hbWUgPSAnbG9jYWxTdG9yYWdlJyxcblx0XHRzY3JpcHRUYWcgPSAnc2NyaXB0Jyxcblx0XHRzdG9yYWdlXG5cblx0c3RvcmUuZGlzYWJsZWQgPSBmYWxzZVxuXHRzdG9yZS52ZXJzaW9uID0gJzEuMy4yMCdcblx0c3RvcmUuc2V0ID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge31cblx0c3RvcmUuZ2V0ID0gZnVuY3Rpb24oa2V5LCBkZWZhdWx0VmFsKSB7fVxuXHRzdG9yZS5oYXMgPSBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHN0b3JlLmdldChrZXkpICE9PSB1bmRlZmluZWQgfVxuXHRzdG9yZS5yZW1vdmUgPSBmdW5jdGlvbihrZXkpIHt9XG5cdHN0b3JlLmNsZWFyID0gZnVuY3Rpb24oKSB7fVxuXHRzdG9yZS50cmFuc2FjdCA9IGZ1bmN0aW9uKGtleSwgZGVmYXVsdFZhbCwgdHJhbnNhY3Rpb25Gbikge1xuXHRcdGlmICh0cmFuc2FjdGlvbkZuID09IG51bGwpIHtcblx0XHRcdHRyYW5zYWN0aW9uRm4gPSBkZWZhdWx0VmFsXG5cdFx0XHRkZWZhdWx0VmFsID0gbnVsbFxuXHRcdH1cblx0XHRpZiAoZGVmYXVsdFZhbCA9PSBudWxsKSB7XG5cdFx0XHRkZWZhdWx0VmFsID0ge31cblx0XHR9XG5cdFx0dmFyIHZhbCA9IHN0b3JlLmdldChrZXksIGRlZmF1bHRWYWwpXG5cdFx0dHJhbnNhY3Rpb25Gbih2YWwpXG5cdFx0c3RvcmUuc2V0KGtleSwgdmFsKVxuXHR9XG5cdHN0b3JlLmdldEFsbCA9IGZ1bmN0aW9uKCkge31cblx0c3RvcmUuZm9yRWFjaCA9IGZ1bmN0aW9uKCkge31cblxuXHRzdG9yZS5zZXJpYWxpemUgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh2YWx1ZSlcblx0fVxuXHRzdG9yZS5kZXNlcmlhbGl6ZSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cdFx0aWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgeyByZXR1cm4gdW5kZWZpbmVkIH1cblx0XHR0cnkgeyByZXR1cm4gSlNPTi5wYXJzZSh2YWx1ZSkgfVxuXHRcdGNhdGNoKGUpIHsgcmV0dXJuIHZhbHVlIHx8IHVuZGVmaW5lZCB9XG5cdH1cblxuXHQvLyBGdW5jdGlvbnMgdG8gZW5jYXBzdWxhdGUgcXVlc3Rpb25hYmxlIEZpcmVGb3ggMy42LjEzIGJlaGF2aW9yXG5cdC8vIHdoZW4gYWJvdXQuY29uZmlnOjpkb20uc3RvcmFnZS5lbmFibGVkID09PSBmYWxzZVxuXHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL21hcmN1c3dlc3Rpbi9zdG9yZS5qcy9pc3N1ZXMjaXNzdWUvMTNcblx0ZnVuY3Rpb24gaXNMb2NhbFN0b3JhZ2VOYW1lU3VwcG9ydGVkKCkge1xuXHRcdHRyeSB7IHJldHVybiAobG9jYWxTdG9yYWdlTmFtZSBpbiB3aW4gJiYgd2luW2xvY2FsU3RvcmFnZU5hbWVdKSB9XG5cdFx0Y2F0Y2goZXJyKSB7IHJldHVybiBmYWxzZSB9XG5cdH1cblxuXHRpZiAoaXNMb2NhbFN0b3JhZ2VOYW1lU3VwcG9ydGVkKCkpIHtcblx0XHRzdG9yYWdlID0gd2luW2xvY2FsU3RvcmFnZU5hbWVdXG5cdFx0c3RvcmUuc2V0ID0gZnVuY3Rpb24oa2V5LCB2YWwpIHtcblx0XHRcdGlmICh2YWwgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gc3RvcmUucmVtb3ZlKGtleSkgfVxuXHRcdFx0c3RvcmFnZS5zZXRJdGVtKGtleSwgc3RvcmUuc2VyaWFsaXplKHZhbCkpXG5cdFx0XHRyZXR1cm4gdmFsXG5cdFx0fVxuXHRcdHN0b3JlLmdldCA9IGZ1bmN0aW9uKGtleSwgZGVmYXVsdFZhbCkge1xuXHRcdFx0dmFyIHZhbCA9IHN0b3JlLmRlc2VyaWFsaXplKHN0b3JhZ2UuZ2V0SXRlbShrZXkpKVxuXHRcdFx0cmV0dXJuICh2YWwgPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRWYWwgOiB2YWwpXG5cdFx0fVxuXHRcdHN0b3JlLnJlbW92ZSA9IGZ1bmN0aW9uKGtleSkgeyBzdG9yYWdlLnJlbW92ZUl0ZW0oa2V5KSB9XG5cdFx0c3RvcmUuY2xlYXIgPSBmdW5jdGlvbigpIHsgc3RvcmFnZS5jbGVhcigpIH1cblx0XHRzdG9yZS5nZXRBbGwgPSBmdW5jdGlvbigpIHtcblx0XHRcdHZhciByZXQgPSB7fVxuXHRcdFx0c3RvcmUuZm9yRWFjaChmdW5jdGlvbihrZXksIHZhbCkge1xuXHRcdFx0XHRyZXRba2V5XSA9IHZhbFxuXHRcdFx0fSlcblx0XHRcdHJldHVybiByZXRcblx0XHR9XG5cdFx0c3RvcmUuZm9yRWFjaCA9IGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG5cdFx0XHRmb3IgKHZhciBpPTA7IGk8c3RvcmFnZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHR2YXIga2V5ID0gc3RvcmFnZS5rZXkoaSlcblx0XHRcdFx0Y2FsbGJhY2soa2V5LCBzdG9yZS5nZXQoa2V5KSlcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSBpZiAoZG9jICYmIGRvYy5kb2N1bWVudEVsZW1lbnQuYWRkQmVoYXZpb3IpIHtcblx0XHR2YXIgc3RvcmFnZU93bmVyLFxuXHRcdFx0c3RvcmFnZUNvbnRhaW5lclxuXHRcdC8vIFNpbmNlICN1c2VyRGF0YSBzdG9yYWdlIGFwcGxpZXMgb25seSB0byBzcGVjaWZpYyBwYXRocywgd2UgbmVlZCB0b1xuXHRcdC8vIHNvbWVob3cgbGluayBvdXIgZGF0YSB0byBhIHNwZWNpZmljIHBhdGguICBXZSBjaG9vc2UgL2Zhdmljb24uaWNvXG5cdFx0Ly8gYXMgYSBwcmV0dHkgc2FmZSBvcHRpb24sIHNpbmNlIGFsbCBicm93c2VycyBhbHJlYWR5IG1ha2UgYSByZXF1ZXN0IHRvXG5cdFx0Ly8gdGhpcyBVUkwgYW55d2F5IGFuZCBiZWluZyBhIDQwNCB3aWxsIG5vdCBodXJ0IHVzIGhlcmUuICBXZSB3cmFwIGFuXG5cdFx0Ly8gaWZyYW1lIHBvaW50aW5nIHRvIHRoZSBmYXZpY29uIGluIGFuIEFjdGl2ZVhPYmplY3QoaHRtbGZpbGUpIG9iamVjdFxuXHRcdC8vIChzZWU6IGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9hYTc1MjU3NCh2PVZTLjg1KS5hc3B4KVxuXHRcdC8vIHNpbmNlIHRoZSBpZnJhbWUgYWNjZXNzIHJ1bGVzIGFwcGVhciB0byBhbGxvdyBkaXJlY3QgYWNjZXNzIGFuZFxuXHRcdC8vIG1hbmlwdWxhdGlvbiBvZiB0aGUgZG9jdW1lbnQgZWxlbWVudCwgZXZlbiBmb3IgYSA0MDQgcGFnZS4gIFRoaXNcblx0XHQvLyBkb2N1bWVudCBjYW4gYmUgdXNlZCBpbnN0ZWFkIG9mIHRoZSBjdXJyZW50IGRvY3VtZW50ICh3aGljaCB3b3VsZFxuXHRcdC8vIGhhdmUgYmVlbiBsaW1pdGVkIHRvIHRoZSBjdXJyZW50IHBhdGgpIHRvIHBlcmZvcm0gI3VzZXJEYXRhIHN0b3JhZ2UuXG5cdFx0dHJ5IHtcblx0XHRcdHN0b3JhZ2VDb250YWluZXIgPSBuZXcgQWN0aXZlWE9iamVjdCgnaHRtbGZpbGUnKVxuXHRcdFx0c3RvcmFnZUNvbnRhaW5lci5vcGVuKClcblx0XHRcdHN0b3JhZ2VDb250YWluZXIud3JpdGUoJzwnK3NjcmlwdFRhZysnPmRvY3VtZW50Lnc9d2luZG93PC8nK3NjcmlwdFRhZysnPjxpZnJhbWUgc3JjPVwiL2Zhdmljb24uaWNvXCI+PC9pZnJhbWU+Jylcblx0XHRcdHN0b3JhZ2VDb250YWluZXIuY2xvc2UoKVxuXHRcdFx0c3RvcmFnZU93bmVyID0gc3RvcmFnZUNvbnRhaW5lci53LmZyYW1lc1swXS5kb2N1bWVudFxuXHRcdFx0c3RvcmFnZSA9IHN0b3JhZ2VPd25lci5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0Ly8gc29tZWhvdyBBY3RpdmVYT2JqZWN0IGluc3RhbnRpYXRpb24gZmFpbGVkIChwZXJoYXBzIHNvbWUgc3BlY2lhbFxuXHRcdFx0Ly8gc2VjdXJpdHkgc2V0dGluZ3Mgb3Igb3RoZXJ3c2UpLCBmYWxsIGJhY2sgdG8gcGVyLXBhdGggc3RvcmFnZVxuXHRcdFx0c3RvcmFnZSA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRcdFx0c3RvcmFnZU93bmVyID0gZG9jLmJvZHlcblx0XHR9XG5cdFx0dmFyIHdpdGhJRVN0b3JhZ2UgPSBmdW5jdGlvbihzdG9yZUZ1bmN0aW9uKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKVxuXHRcdFx0XHRhcmdzLnVuc2hpZnQoc3RvcmFnZSlcblx0XHRcdFx0Ly8gU2VlIGh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczUzMTA4MSh2PVZTLjg1KS5hc3B4XG5cdFx0XHRcdC8vIGFuZCBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXM1MzE0MjQodj1WUy44NSkuYXNweFxuXHRcdFx0XHRzdG9yYWdlT3duZXIuYXBwZW5kQ2hpbGQoc3RvcmFnZSlcblx0XHRcdFx0c3RvcmFnZS5hZGRCZWhhdmlvcignI2RlZmF1bHQjdXNlckRhdGEnKVxuXHRcdFx0XHRzdG9yYWdlLmxvYWQobG9jYWxTdG9yYWdlTmFtZSlcblx0XHRcdFx0dmFyIHJlc3VsdCA9IHN0b3JlRnVuY3Rpb24uYXBwbHkoc3RvcmUsIGFyZ3MpXG5cdFx0XHRcdHN0b3JhZ2VPd25lci5yZW1vdmVDaGlsZChzdG9yYWdlKVxuXHRcdFx0XHRyZXR1cm4gcmVzdWx0XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gSW4gSUU3LCBrZXlzIGNhbm5vdCBzdGFydCB3aXRoIGEgZGlnaXQgb3IgY29udGFpbiBjZXJ0YWluIGNoYXJzLlxuXHRcdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbWFyY3Vzd2VzdGluL3N0b3JlLmpzL2lzc3Vlcy80MFxuXHRcdC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vbWFyY3Vzd2VzdGluL3N0b3JlLmpzL2lzc3Vlcy84M1xuXHRcdHZhciBmb3JiaWRkZW5DaGFyc1JlZ2V4ID0gbmV3IFJlZ0V4cChcIlshXFxcIiMkJSYnKCkqKywvXFxcXFxcXFw6Ozw9Pj9AW1xcXFxdXmB7fH1+XVwiLCBcImdcIilcblx0XHR2YXIgaWVLZXlGaXggPSBmdW5jdGlvbihrZXkpIHtcblx0XHRcdHJldHVybiBrZXkucmVwbGFjZSgvXmQvLCAnX19fJCYnKS5yZXBsYWNlKGZvcmJpZGRlbkNoYXJzUmVnZXgsICdfX18nKVxuXHRcdH1cblx0XHRzdG9yZS5zZXQgPSB3aXRoSUVTdG9yYWdlKGZ1bmN0aW9uKHN0b3JhZ2UsIGtleSwgdmFsKSB7XG5cdFx0XHRrZXkgPSBpZUtleUZpeChrZXkpXG5cdFx0XHRpZiAodmFsID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHN0b3JlLnJlbW92ZShrZXkpIH1cblx0XHRcdHN0b3JhZ2Uuc2V0QXR0cmlidXRlKGtleSwgc3RvcmUuc2VyaWFsaXplKHZhbCkpXG5cdFx0XHRzdG9yYWdlLnNhdmUobG9jYWxTdG9yYWdlTmFtZSlcblx0XHRcdHJldHVybiB2YWxcblx0XHR9KVxuXHRcdHN0b3JlLmdldCA9IHdpdGhJRVN0b3JhZ2UoZnVuY3Rpb24oc3RvcmFnZSwga2V5LCBkZWZhdWx0VmFsKSB7XG5cdFx0XHRrZXkgPSBpZUtleUZpeChrZXkpXG5cdFx0XHR2YXIgdmFsID0gc3RvcmUuZGVzZXJpYWxpemUoc3RvcmFnZS5nZXRBdHRyaWJ1dGUoa2V5KSlcblx0XHRcdHJldHVybiAodmFsID09PSB1bmRlZmluZWQgPyBkZWZhdWx0VmFsIDogdmFsKVxuXHRcdH0pXG5cdFx0c3RvcmUucmVtb3ZlID0gd2l0aElFU3RvcmFnZShmdW5jdGlvbihzdG9yYWdlLCBrZXkpIHtcblx0XHRcdGtleSA9IGllS2V5Rml4KGtleSlcblx0XHRcdHN0b3JhZ2UucmVtb3ZlQXR0cmlidXRlKGtleSlcblx0XHRcdHN0b3JhZ2Uuc2F2ZShsb2NhbFN0b3JhZ2VOYW1lKVxuXHRcdH0pXG5cdFx0c3RvcmUuY2xlYXIgPSB3aXRoSUVTdG9yYWdlKGZ1bmN0aW9uKHN0b3JhZ2UpIHtcblx0XHRcdHZhciBhdHRyaWJ1dGVzID0gc3RvcmFnZS5YTUxEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXR0cmlidXRlc1xuXHRcdFx0c3RvcmFnZS5sb2FkKGxvY2FsU3RvcmFnZU5hbWUpXG5cdFx0XHRmb3IgKHZhciBpPWF0dHJpYnV0ZXMubGVuZ3RoLTE7IGk+PTA7IGktLSkge1xuXHRcdFx0XHRzdG9yYWdlLnJlbW92ZUF0dHJpYnV0ZShhdHRyaWJ1dGVzW2ldLm5hbWUpXG5cdFx0XHR9XG5cdFx0XHRzdG9yYWdlLnNhdmUobG9jYWxTdG9yYWdlTmFtZSlcblx0XHR9KVxuXHRcdHN0b3JlLmdldEFsbCA9IGZ1bmN0aW9uKHN0b3JhZ2UpIHtcblx0XHRcdHZhciByZXQgPSB7fVxuXHRcdFx0c3RvcmUuZm9yRWFjaChmdW5jdGlvbihrZXksIHZhbCkge1xuXHRcdFx0XHRyZXRba2V5XSA9IHZhbFxuXHRcdFx0fSlcblx0XHRcdHJldHVybiByZXRcblx0XHR9XG5cdFx0c3RvcmUuZm9yRWFjaCA9IHdpdGhJRVN0b3JhZ2UoZnVuY3Rpb24oc3RvcmFnZSwgY2FsbGJhY2spIHtcblx0XHRcdHZhciBhdHRyaWJ1dGVzID0gc3RvcmFnZS5YTUxEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXR0cmlidXRlc1xuXHRcdFx0Zm9yICh2YXIgaT0wLCBhdHRyOyBhdHRyPWF0dHJpYnV0ZXNbaV07ICsraSkge1xuXHRcdFx0XHRjYWxsYmFjayhhdHRyLm5hbWUsIHN0b3JlLmRlc2VyaWFsaXplKHN0b3JhZ2UuZ2V0QXR0cmlidXRlKGF0dHIubmFtZSkpKVxuXHRcdFx0fVxuXHRcdH0pXG5cdH1cblxuXHR0cnkge1xuXHRcdHZhciB0ZXN0S2V5ID0gJ19fc3RvcmVqc19fJ1xuXHRcdHN0b3JlLnNldCh0ZXN0S2V5LCB0ZXN0S2V5KVxuXHRcdGlmIChzdG9yZS5nZXQodGVzdEtleSkgIT0gdGVzdEtleSkgeyBzdG9yZS5kaXNhYmxlZCA9IHRydWUgfVxuXHRcdHN0b3JlLnJlbW92ZSh0ZXN0S2V5KVxuXHR9IGNhdGNoKGUpIHtcblx0XHRzdG9yZS5kaXNhYmxlZCA9IHRydWVcblx0fVxuXHRzdG9yZS5lbmFibGVkID0gIXN0b3JlLmRpc2FibGVkXG5cdFxuXHRyZXR1cm4gc3RvcmVcbn0pKTtcbiIsIlxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gdHJpbTtcblxuZnVuY3Rpb24gdHJpbShzdHIpe1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMqfFxccyokL2csICcnKTtcbn1cblxuZXhwb3J0cy5sZWZ0ID0gZnVuY3Rpb24oc3RyKXtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKi8sICcnKTtcbn07XG5cbmV4cG9ydHMucmlnaHQgPSBmdW5jdGlvbihzdHIpe1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL1xccyokLywgJycpO1xufTtcbiIsIid1c2Ugc3RyaWN0J1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgZnVuY3Rpb24gZm9yIHNlcXVlbmNlcyBvZiByZS11c2FibGUgSURzLlxuICpcbiAqIEBwYXJhbSBwcmVmaXgge3N0cmluZ31cbiAqIEBwYXJhbSBzdWZmaXgge3N0cmluZ31cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAocHJlZml4LCBzdWZmaXgpIHtcbiAgdmFyIGlkID0gMFxuXG4gIHByZWZpeCA9IHByZWZpeCB8fCAnJ1xuICBzdWZmaXggPSBzdWZmaXggfHwgJydcblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBwcmVmaXggKyAoaWQrKykgKyBzdWZmaXhcbiAgfVxufVxuIiwiY29uc3QgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0JylcbmNvbnN0IHRyaWUgPSByZXF1aXJlKCcuL3RyaWUnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFdheWZhcmVyXG5cbi8vIGNyZWF0ZSBhIHJvdXRlclxuLy8gc3RyIC0+IG9ialxuZnVuY3Rpb24gV2F5ZmFyZXIgKGRmdCkge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgV2F5ZmFyZXIpKSByZXR1cm4gbmV3IFdheWZhcmVyKGRmdClcblxuICBjb25zdCBfZGVmYXVsdCA9IChkZnQgfHwgJycpLnJlcGxhY2UoL15cXC8vLCAnJylcbiAgY29uc3QgX3RyaWUgPSB0cmllKClcblxuICBlbWl0Ll90cmllID0gX3RyaWVcbiAgZW1pdC5lbWl0ID0gZW1pdFxuICBlbWl0Lm9uID0gb25cbiAgZW1pdC5fd2F5ZmFyZXIgPSB0cnVlXG5cbiAgcmV0dXJuIGVtaXRcblxuICAvLyBkZWZpbmUgYSByb3V0ZVxuICAvLyAoc3RyLCBmbikgLT4gb2JqXG4gIGZ1bmN0aW9uIG9uIChyb3V0ZSwgY2IpIHtcbiAgICBhc3NlcnQuZXF1YWwodHlwZW9mIHJvdXRlLCAnc3RyaW5nJylcbiAgICBhc3NlcnQuZXF1YWwodHlwZW9mIGNiLCAnZnVuY3Rpb24nKVxuXG4gICAgcm91dGUgPSByb3V0ZSB8fCAnLydcblxuICAgIGlmIChjYiAmJiBjYi5fd2F5ZmFyZXIgJiYgY2IuX3RyaWUpIHtcbiAgICAgIF90cmllLm1vdW50KHJvdXRlLCBjYi5fdHJpZS50cmllKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBub2RlID0gX3RyaWUuY3JlYXRlKHJvdXRlKVxuICAgICAgbm9kZS5jYiA9IGNiXG4gICAgfVxuXG4gICAgcmV0dXJuIGVtaXRcbiAgfVxuXG4gIC8vIG1hdGNoIGFuZCBjYWxsIGEgcm91dGVcbiAgLy8gKHN0ciwgb2JqPykgLT4gbnVsbFxuICBmdW5jdGlvbiBlbWl0IChyb3V0ZSkge1xuICAgIGFzc2VydC5ub3RFcXVhbChyb3V0ZSwgdW5kZWZpbmVkLCBcIidyb3V0ZScgbXVzdCBiZSBkZWZpbmVkXCIpXG4gICAgY29uc3QgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoKVxuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXVxuICAgIH1cblxuICAgIGNvbnN0IG5vZGUgPSBfdHJpZS5tYXRjaChyb3V0ZSlcbiAgICBpZiAobm9kZSAmJiBub2RlLmNiKSB7XG4gICAgICBhcmdzWzBdID0gbm9kZS5wYXJhbXNcbiAgICAgIHJldHVybiBub2RlLmNiLmFwcGx5KG51bGwsIGFyZ3MpXG4gICAgfVxuXG4gICAgY29uc3QgZGZ0ID0gX3RyaWUubWF0Y2goX2RlZmF1bHQpXG4gICAgaWYgKGRmdCAmJiBkZnQuY2IpIHtcbiAgICAgIGFyZ3NbMF0gPSBkZnQucGFyYW1zXG4gICAgICByZXR1cm4gZGZ0LmNiLmFwcGx5KG51bGwsIGFyZ3MpXG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKFwicm91dGUgJ1wiICsgcm91dGUgKyBcIicgZGlkIG5vdCBtYXRjaFwiKVxuICB9XG59XG4iLCJjb25zdCBtdXRhdGUgPSByZXF1aXJlKCd4dGVuZC9tdXRhYmxlJylcbmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpXG5jb25zdCB4dGVuZCA9IHJlcXVpcmUoJ3h0ZW5kJylcblxubW9kdWxlLmV4cG9ydHMgPSBUcmllXG5cbi8vIGNyZWF0ZSBhIG5ldyB0cmllXG4vLyBudWxsIC0+IG9ialxuZnVuY3Rpb24gVHJpZSAoKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBUcmllKSkgcmV0dXJuIG5ldyBUcmllKClcbiAgdGhpcy50cmllID0geyBub2Rlczoge30gfVxufVxuXG4vLyBjcmVhdGUgYSBub2RlIG9uIHRoZSB0cmllIGF0IHJvdXRlXG4vLyBhbmQgcmV0dXJuIGEgbm9kZVxuLy8gc3RyIC0+IG51bGxcblRyaWUucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChyb3V0ZSkge1xuICBhc3NlcnQuZXF1YWwodHlwZW9mIHJvdXRlLCAnc3RyaW5nJywgJ3JvdXRlIHNob3VsZCBiZSBhIHN0cmluZycpXG4gIC8vIHN0cmlwIGxlYWRpbmcgJy8nIGFuZCBzcGxpdCByb3V0ZXNcbiAgY29uc3Qgcm91dGVzID0gcm91dGUucmVwbGFjZSgvXlxcLy8sICcnKS5zcGxpdCgnLycpXG4gIHJldHVybiAoZnVuY3Rpb24gY3JlYXRlTm9kZSAoaW5kZXgsIHRyaWUsIHJvdXRlcykge1xuICAgIGNvbnN0IHJvdXRlID0gcm91dGVzW2luZGV4XVxuXG4gICAgaWYgKHJvdXRlID09PSB1bmRlZmluZWQpIHJldHVybiB0cmllXG5cbiAgICB2YXIgbm9kZSA9IG51bGxcbiAgICBpZiAoL146Ly50ZXN0KHJvdXRlKSkge1xuICAgICAgLy8gaWYgbm9kZSBpcyBhIG5hbWUgbWF0Y2gsIHNldCBuYW1lIGFuZCBhcHBlbmQgdG8gJzonIG5vZGVcbiAgICAgIGlmICghdHJpZS5ub2Rlc1snJCQnXSkge1xuICAgICAgICBub2RlID0geyBub2Rlczoge30gfVxuICAgICAgICB0cmllLm5vZGVzWyckJCddID0gbm9kZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZSA9IHRyaWUubm9kZXNbJyQkJ11cbiAgICAgIH1cbiAgICAgIHRyaWUubmFtZSA9IHJvdXRlLnJlcGxhY2UoL146LywgJycpXG4gICAgfSBlbHNlIGlmICghdHJpZS5ub2Rlc1tyb3V0ZV0pIHtcbiAgICAgIG5vZGUgPSB7IG5vZGVzOiB7fSB9XG4gICAgICB0cmllLm5vZGVzW3JvdXRlXSA9IG5vZGVcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZSA9IHRyaWUubm9kZXNbcm91dGVdXG4gICAgfVxuXG4gICAgLy8gd2UgbXVzdCByZWN1cnNlIGRlZXBlclxuICAgIHJldHVybiBjcmVhdGVOb2RlKGluZGV4ICsgMSwgbm9kZSwgcm91dGVzKVxuICB9KSgwLCB0aGlzLnRyaWUsIHJvdXRlcylcbn1cblxuLy8gbWF0Y2ggYSByb3V0ZSBvbiB0aGUgdHJpZVxuLy8gYW5kIHJldHVybiB0aGUgbm9kZVxuLy8gc3RyIC0+IG9ialxuVHJpZS5wcm90b3R5cGUubWF0Y2ggPSBmdW5jdGlvbiAocm91dGUpIHtcbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiByb3V0ZSwgJ3N0cmluZycsICdyb3V0ZSBzaG91bGQgYmUgYSBzdHJpbmcnKVxuXG4gIGNvbnN0IHJvdXRlcyA9IHJvdXRlLnJlcGxhY2UoL15cXC8vLCAnJykuc3BsaXQoJy8nKVxuICBjb25zdCBwYXJhbXMgPSB7fVxuXG4gIHZhciBub2RlID0gKGZ1bmN0aW9uIHNlYXJjaCAoaW5kZXgsIHRyaWUpIHtcbiAgICAvLyBlaXRoZXIgdGhlcmUncyBubyBtYXRjaCwgb3Igd2UncmUgZG9uZSBzZWFyY2hpbmdcbiAgICBpZiAodHJpZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgY29uc3Qgcm91dGUgPSByb3V0ZXNbaW5kZXhdXG4gICAgaWYgKHJvdXRlID09PSB1bmRlZmluZWQpIHJldHVybiB0cmllXG5cbiAgICBpZiAodHJpZS5ub2Rlc1tyb3V0ZV0pIHtcbiAgICAgIC8vIG1hdGNoIHJlZ3VsYXIgcm91dGVzIGZpcnN0XG4gICAgICByZXR1cm4gc2VhcmNoKGluZGV4ICsgMSwgdHJpZS5ub2Rlc1tyb3V0ZV0pXG4gICAgfSBlbHNlIGlmICh0cmllLm5hbWUpIHtcbiAgICAgIC8vIG1hdGNoIG5hbWVkIHJvdXRlc1xuICAgICAgcGFyYW1zW3RyaWUubmFtZV0gPSByb3V0ZVxuICAgICAgcmV0dXJuIHNlYXJjaChpbmRleCArIDEsIHRyaWUubm9kZXNbJyQkJ10pXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG5vIG1hdGNoZXMgZm91bmRcbiAgICAgIHJldHVybiBzZWFyY2goaW5kZXggKyAxKVxuICAgIH1cbiAgfSkoMCwgdGhpcy50cmllKVxuXG4gIGlmICghbm9kZSkgcmV0dXJuIHVuZGVmaW5lZFxuICBub2RlID0geHRlbmQobm9kZSlcbiAgbm9kZS5wYXJhbXMgPSBwYXJhbXNcbiAgcmV0dXJuIG5vZGVcbn1cblxuLy8gbW91bnQgYSB0cmllIG9udG8gYSBub2RlIGF0IHJvdXRlXG4vLyAoc3RyLCBvYmopIC0+IG51bGxcblRyaWUucHJvdG90eXBlLm1vdW50ID0gZnVuY3Rpb24gKHJvdXRlLCB0cmllKSB7XG4gIGFzc2VydC5lcXVhbCh0eXBlb2Ygcm91dGUsICdzdHJpbmcnLCAncm91dGUgc2hvdWxkIGJlIGEgc3RyaW5nJylcbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiB0cmllLCAnb2JqZWN0JywgJ3RyaWUgc2hvdWxkIGJlIGEgb2JqZWN0JylcblxuICBjb25zdCBzcGxpdCA9IHJvdXRlLnJlcGxhY2UoL15cXC8vLCAnJykuc3BsaXQoJy8nKVxuICB2YXIgbm9kZSA9IG51bGxcbiAgdmFyIGtleSA9IG51bGxcblxuICBpZiAoc3BsaXQubGVuZ3RoID09PSAxKSB7XG4gICAga2V5ID0gc3BsaXRbMF1cbiAgICBub2RlID0gdGhpcy5jcmVhdGUoa2V5KVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGhlYWRBcnIgPSBzcGxpdC5zcGxpY2UoMCwgc3BsaXQubGVuZ3RoIC0gMSlcbiAgICBjb25zdCBoZWFkID0gaGVhZEFyci5qb2luKCcvJylcbiAgICBrZXkgPSBzcGxpdFswXVxuICAgIG5vZGUgPSB0aGlzLmNyZWF0ZShoZWFkKVxuICB9XG5cbiAgbXV0YXRlKG5vZGUubm9kZXMsIHRyaWUubm9kZXMpXG4gIGlmICh0cmllLm5hbWUpIG5vZGUubmFtZSA9IHRyaWUubmFtZVxuXG4gIC8vIGRlbGVnYXRlIHByb3BlcnRpZXMgZnJvbSAnLycgdG8gdGhlIG5ldyBub2RlXG4gIC8vICcvJyBjYW5ub3QgYmUgcmVhY2hlZCBvbmNlIG1vdW50ZWRcbiAgaWYgKG5vZGUubm9kZXNbJyddKSB7XG4gICAgT2JqZWN0LmtleXMobm9kZS5ub2Rlc1snJ10pLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgaWYgKGtleSA9PT0gJ25vZGVzJykgcmV0dXJuXG4gICAgICBub2RlW2tleV0gPSBub2RlLm5vZGVzWycnXVtrZXldXG4gICAgfSlcbiAgICBtdXRhdGUobm9kZS5ub2Rlcywgbm9kZS5ub2Rlc1snJ10ubm9kZXMpXG4gICAgZGVsZXRlIG5vZGUubm9kZXNbJyddLm5vZGVzXG4gIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIHdpbmRvdyA9IHJlcXVpcmUoXCJnbG9iYWwvd2luZG93XCIpXG52YXIgaXNGdW5jdGlvbiA9IHJlcXVpcmUoXCJpcy1mdW5jdGlvblwiKVxudmFyIHBhcnNlSGVhZGVycyA9IHJlcXVpcmUoXCJwYXJzZS1oZWFkZXJzXCIpXG52YXIgeHRlbmQgPSByZXF1aXJlKFwieHRlbmRcIilcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVYSFJcbmNyZWF0ZVhIUi5YTUxIdHRwUmVxdWVzdCA9IHdpbmRvdy5YTUxIdHRwUmVxdWVzdCB8fCBub29wXG5jcmVhdGVYSFIuWERvbWFpblJlcXVlc3QgPSBcIndpdGhDcmVkZW50aWFsc1wiIGluIChuZXcgY3JlYXRlWEhSLlhNTEh0dHBSZXF1ZXN0KCkpID8gY3JlYXRlWEhSLlhNTEh0dHBSZXF1ZXN0IDogd2luZG93LlhEb21haW5SZXF1ZXN0XG5cbmZvckVhY2hBcnJheShbXCJnZXRcIiwgXCJwdXRcIiwgXCJwb3N0XCIsIFwicGF0Y2hcIiwgXCJoZWFkXCIsIFwiZGVsZXRlXCJdLCBmdW5jdGlvbihtZXRob2QpIHtcbiAgICBjcmVhdGVYSFJbbWV0aG9kID09PSBcImRlbGV0ZVwiID8gXCJkZWxcIiA6IG1ldGhvZF0gPSBmdW5jdGlvbih1cmksIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgICAgIG9wdGlvbnMgPSBpbml0UGFyYW1zKHVyaSwgb3B0aW9ucywgY2FsbGJhY2spXG4gICAgICAgIG9wdGlvbnMubWV0aG9kID0gbWV0aG9kLnRvVXBwZXJDYXNlKClcbiAgICAgICAgcmV0dXJuIF9jcmVhdGVYSFIob3B0aW9ucylcbiAgICB9XG59KVxuXG5mdW5jdGlvbiBmb3JFYWNoQXJyYXkoYXJyYXksIGl0ZXJhdG9yKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpdGVyYXRvcihhcnJheVtpXSlcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGlzRW1wdHkob2JqKXtcbiAgICBmb3IodmFyIGkgaW4gb2JqKXtcbiAgICAgICAgaWYob2JqLmhhc093blByb3BlcnR5KGkpKSByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbn1cblxuZnVuY3Rpb24gaW5pdFBhcmFtcyh1cmksIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHBhcmFtcyA9IHVyaVxuXG4gICAgaWYgKGlzRnVuY3Rpb24ob3B0aW9ucykpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBvcHRpb25zXG4gICAgICAgIGlmICh0eXBlb2YgdXJpID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBwYXJhbXMgPSB7dXJpOnVyaX1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmFtcyA9IHh0ZW5kKG9wdGlvbnMsIHt1cmk6IHVyaX0pXG4gICAgfVxuXG4gICAgcGFyYW1zLmNhbGxiYWNrID0gY2FsbGJhY2tcbiAgICByZXR1cm4gcGFyYW1zXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVhIUih1cmksIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgb3B0aW9ucyA9IGluaXRQYXJhbXModXJpLCBvcHRpb25zLCBjYWxsYmFjaylcbiAgICByZXR1cm4gX2NyZWF0ZVhIUihvcHRpb25zKVxufVxuXG5mdW5jdGlvbiBfY3JlYXRlWEhSKG9wdGlvbnMpIHtcbiAgICBpZih0eXBlb2Ygb3B0aW9ucy5jYWxsYmFjayA9PT0gXCJ1bmRlZmluZWRcIil7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbGxiYWNrIGFyZ3VtZW50IG1pc3NpbmdcIilcbiAgICB9XG5cbiAgICB2YXIgY2FsbGVkID0gZmFsc2VcbiAgICB2YXIgY2FsbGJhY2sgPSBmdW5jdGlvbiBjYk9uY2UoZXJyLCByZXNwb25zZSwgYm9keSl7XG4gICAgICAgIGlmKCFjYWxsZWQpe1xuICAgICAgICAgICAgY2FsbGVkID0gdHJ1ZVxuICAgICAgICAgICAgb3B0aW9ucy5jYWxsYmFjayhlcnIsIHJlc3BvbnNlLCBib2R5KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVhZHlzdGF0ZWNoYW5nZSgpIHtcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICAgICAgICBsb2FkRnVuYygpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRCb2R5KCkge1xuICAgICAgICAvLyBDaHJvbWUgd2l0aCByZXF1ZXN0VHlwZT1ibG9iIHRocm93cyBlcnJvcnMgYXJyb3VuZCB3aGVuIGV2ZW4gdGVzdGluZyBhY2Nlc3MgdG8gcmVzcG9uc2VUZXh0XG4gICAgICAgIHZhciBib2R5ID0gdW5kZWZpbmVkXG5cbiAgICAgICAgaWYgKHhoci5yZXNwb25zZSkge1xuICAgICAgICAgICAgYm9keSA9IHhoci5yZXNwb25zZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYm9keSA9IHhoci5yZXNwb25zZVRleHQgfHwgZ2V0WG1sKHhocilcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0pzb24pIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgYm9keSA9IEpTT04ucGFyc2UoYm9keSlcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYm9keVxuICAgIH1cblxuICAgIHZhciBmYWlsdXJlUmVzcG9uc2UgPSB7XG4gICAgICAgICAgICAgICAgYm9keTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IDAsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgICAgICAgICAgdXJsOiB1cmksXG4gICAgICAgICAgICAgICAgcmF3UmVxdWVzdDogeGhyXG4gICAgICAgICAgICB9XG5cbiAgICBmdW5jdGlvbiBlcnJvckZ1bmMoZXZ0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0VGltZXIpXG4gICAgICAgIGlmKCEoZXZ0IGluc3RhbmNlb2YgRXJyb3IpKXtcbiAgICAgICAgICAgIGV2dCA9IG5ldyBFcnJvcihcIlwiICsgKGV2dCB8fCBcIlVua25vd24gWE1MSHR0cFJlcXVlc3QgRXJyb3JcIikgKVxuICAgICAgICB9XG4gICAgICAgIGV2dC5zdGF0dXNDb2RlID0gMFxuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXZ0LCBmYWlsdXJlUmVzcG9uc2UpXG4gICAgfVxuXG4gICAgLy8gd2lsbCBsb2FkIHRoZSBkYXRhICYgcHJvY2VzcyB0aGUgcmVzcG9uc2UgaW4gYSBzcGVjaWFsIHJlc3BvbnNlIG9iamVjdFxuICAgIGZ1bmN0aW9uIGxvYWRGdW5jKCkge1xuICAgICAgICBpZiAoYWJvcnRlZCkgcmV0dXJuXG4gICAgICAgIHZhciBzdGF0dXNcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXRUaW1lcilcbiAgICAgICAgaWYob3B0aW9ucy51c2VYRFIgJiYgeGhyLnN0YXR1cz09PXVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy9JRTggQ09SUyBHRVQgc3VjY2Vzc2Z1bCByZXNwb25zZSBkb2Vzbid0IGhhdmUgYSBzdGF0dXMgZmllbGQsIGJ1dCBib2R5IGlzIGZpbmVcbiAgICAgICAgICAgIHN0YXR1cyA9IDIwMFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhdHVzID0gKHhoci5zdGF0dXMgPT09IDEyMjMgPyAyMDQgOiB4aHIuc3RhdHVzKVxuICAgICAgICB9XG4gICAgICAgIHZhciByZXNwb25zZSA9IGZhaWx1cmVSZXNwb25zZVxuICAgICAgICB2YXIgZXJyID0gbnVsbFxuXG4gICAgICAgIGlmIChzdGF0dXMgIT09IDApe1xuICAgICAgICAgICAgcmVzcG9uc2UgPSB7XG4gICAgICAgICAgICAgICAgYm9keTogZ2V0Qm9keSgpLFxuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IHN0YXR1cyxcbiAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7fSxcbiAgICAgICAgICAgICAgICB1cmw6IHVyaSxcbiAgICAgICAgICAgICAgICByYXdSZXF1ZXN0OiB4aHJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMpeyAvL3JlbWVtYmVyIHhociBjYW4gaW4gZmFjdCBiZSBYRFIgZm9yIENPUlMgaW4gSUVcbiAgICAgICAgICAgICAgICByZXNwb25zZS5oZWFkZXJzID0gcGFyc2VIZWFkZXJzKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVyciA9IG5ldyBFcnJvcihcIkludGVybmFsIFhNTEh0dHBSZXF1ZXN0IEVycm9yXCIpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVyciwgcmVzcG9uc2UsIHJlc3BvbnNlLmJvZHkpXG4gICAgfVxuXG4gICAgdmFyIHhociA9IG9wdGlvbnMueGhyIHx8IG51bGxcblxuICAgIGlmICgheGhyKSB7XG4gICAgICAgIGlmIChvcHRpb25zLmNvcnMgfHwgb3B0aW9ucy51c2VYRFIpIHtcbiAgICAgICAgICAgIHhociA9IG5ldyBjcmVhdGVYSFIuWERvbWFpblJlcXVlc3QoKVxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHhociA9IG5ldyBjcmVhdGVYSFIuWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGtleVxuICAgIHZhciBhYm9ydGVkXG4gICAgdmFyIHVyaSA9IHhoci51cmwgPSBvcHRpb25zLnVyaSB8fCBvcHRpb25zLnVybFxuICAgIHZhciBtZXRob2QgPSB4aHIubWV0aG9kID0gb3B0aW9ucy5tZXRob2QgfHwgXCJHRVRcIlxuICAgIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5IHx8IG9wdGlvbnMuZGF0YSB8fCBudWxsXG4gICAgdmFyIGhlYWRlcnMgPSB4aHIuaGVhZGVycyA9IG9wdGlvbnMuaGVhZGVycyB8fCB7fVxuICAgIHZhciBzeW5jID0gISFvcHRpb25zLnN5bmNcbiAgICB2YXIgaXNKc29uID0gZmFsc2VcbiAgICB2YXIgdGltZW91dFRpbWVyXG5cbiAgICBpZiAoXCJqc29uXCIgaW4gb3B0aW9ucykge1xuICAgICAgICBpc0pzb24gPSB0cnVlXG4gICAgICAgIGhlYWRlcnNbXCJhY2NlcHRcIl0gfHwgaGVhZGVyc1tcIkFjY2VwdFwiXSB8fCAoaGVhZGVyc1tcIkFjY2VwdFwiXSA9IFwiYXBwbGljYXRpb24vanNvblwiKSAvL0Rvbid0IG92ZXJyaWRlIGV4aXN0aW5nIGFjY2VwdCBoZWFkZXIgZGVjbGFyZWQgYnkgdXNlclxuICAgICAgICBpZiAobWV0aG9kICE9PSBcIkdFVFwiICYmIG1ldGhvZCAhPT0gXCJIRUFEXCIpIHtcbiAgICAgICAgICAgIGhlYWRlcnNbXCJjb250ZW50LXR5cGVcIl0gfHwgaGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXSB8fCAoaGVhZGVyc1tcIkNvbnRlbnQtVHlwZVwiXSA9IFwiYXBwbGljYXRpb24vanNvblwiKSAvL0Rvbid0IG92ZXJyaWRlIGV4aXN0aW5nIGFjY2VwdCBoZWFkZXIgZGVjbGFyZWQgYnkgdXNlclxuICAgICAgICAgICAgYm9keSA9IEpTT04uc3RyaW5naWZ5KG9wdGlvbnMuanNvbilcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSByZWFkeXN0YXRlY2hhbmdlXG4gICAgeGhyLm9ubG9hZCA9IGxvYWRGdW5jXG4gICAgeGhyLm9uZXJyb3IgPSBlcnJvckZ1bmNcbiAgICAvLyBJRTkgbXVzdCBoYXZlIG9ucHJvZ3Jlc3MgYmUgc2V0IHRvIGEgdW5pcXVlIGZ1bmN0aW9uLlxuICAgIHhoci5vbnByb2dyZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBJRSBtdXN0IGRpZVxuICAgIH1cbiAgICB4aHIub250aW1lb3V0ID0gZXJyb3JGdW5jXG4gICAgeGhyLm9wZW4obWV0aG9kLCB1cmksICFzeW5jLCBvcHRpb25zLnVzZXJuYW1lLCBvcHRpb25zLnBhc3N3b3JkKVxuICAgIC8vaGFzIHRvIGJlIGFmdGVyIG9wZW5cbiAgICBpZighc3luYykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gISFvcHRpb25zLndpdGhDcmVkZW50aWFsc1xuICAgIH1cbiAgICAvLyBDYW5ub3Qgc2V0IHRpbWVvdXQgd2l0aCBzeW5jIHJlcXVlc3RcbiAgICAvLyBub3Qgc2V0dGluZyB0aW1lb3V0IG9uIHRoZSB4aHIgb2JqZWN0LCBiZWNhdXNlIG9mIG9sZCB3ZWJraXRzIGV0Yy4gbm90IGhhbmRsaW5nIHRoYXQgY29ycmVjdGx5XG4gICAgLy8gYm90aCBucG0ncyByZXF1ZXN0IGFuZCBqcXVlcnkgMS54IHVzZSB0aGlzIGtpbmQgb2YgdGltZW91dCwgc28gdGhpcyBpcyBiZWluZyBjb25zaXN0ZW50XG4gICAgaWYgKCFzeW5jICYmIG9wdGlvbnMudGltZW91dCA+IDAgKSB7XG4gICAgICAgIHRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGFib3J0ZWQ9dHJ1ZS8vSUU5IG1heSBzdGlsbCBjYWxsIHJlYWR5c3RhdGVjaGFuZ2VcbiAgICAgICAgICAgIHhoci5hYm9ydChcInRpbWVvdXRcIilcbiAgICAgICAgICAgIHZhciBlID0gbmV3IEVycm9yKFwiWE1MSHR0cFJlcXVlc3QgdGltZW91dFwiKVxuICAgICAgICAgICAgZS5jb2RlID0gXCJFVElNRURPVVRcIlxuICAgICAgICAgICAgZXJyb3JGdW5jKGUpXG4gICAgICAgIH0sIG9wdGlvbnMudGltZW91dCApXG4gICAgfVxuXG4gICAgaWYgKHhoci5zZXRSZXF1ZXN0SGVhZGVyKSB7XG4gICAgICAgIGZvcihrZXkgaW4gaGVhZGVycyl7XG4gICAgICAgICAgICBpZihoZWFkZXJzLmhhc093blByb3BlcnR5KGtleSkpe1xuICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgaGVhZGVyc1trZXldKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLmhlYWRlcnMgJiYgIWlzRW1wdHkob3B0aW9ucy5oZWFkZXJzKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJIZWFkZXJzIGNhbm5vdCBiZSBzZXQgb24gYW4gWERvbWFpblJlcXVlc3Qgb2JqZWN0XCIpXG4gICAgfVxuXG4gICAgaWYgKFwicmVzcG9uc2VUeXBlXCIgaW4gb3B0aW9ucykge1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gb3B0aW9ucy5yZXNwb25zZVR5cGVcbiAgICB9XG5cbiAgICBpZiAoXCJiZWZvcmVTZW5kXCIgaW4gb3B0aW9ucyAmJlxuICAgICAgICB0eXBlb2Ygb3B0aW9ucy5iZWZvcmVTZW5kID09PSBcImZ1bmN0aW9uXCJcbiAgICApIHtcbiAgICAgICAgb3B0aW9ucy5iZWZvcmVTZW5kKHhocilcbiAgICB9XG5cbiAgICB4aHIuc2VuZChib2R5KVxuXG4gICAgcmV0dXJuIHhoclxuXG5cbn1cblxuZnVuY3Rpb24gZ2V0WG1sKHhocikge1xuICAgIGlmICh4aHIucmVzcG9uc2VUeXBlID09PSBcImRvY3VtZW50XCIpIHtcbiAgICAgICAgcmV0dXJuIHhoci5yZXNwb25zZVhNTFxuICAgIH1cbiAgICB2YXIgZmlyZWZveEJ1Z1Rha2VuRWZmZWN0ID0geGhyLnN0YXR1cyA9PT0gMjA0ICYmIHhoci5yZXNwb25zZVhNTCAmJiB4aHIucmVzcG9uc2VYTUwuZG9jdW1lbnRFbGVtZW50Lm5vZGVOYW1lID09PSBcInBhcnNlcmVycm9yXCJcbiAgICBpZiAoeGhyLnJlc3BvbnNlVHlwZSA9PT0gXCJcIiAmJiAhZmlyZWZveEJ1Z1Rha2VuRWZmZWN0KSB7XG4gICAgICAgIHJldHVybiB4aHIucmVzcG9uc2VYTUxcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbFxufVxuXG5mdW5jdGlvbiBub29wKCkge31cbiIsIm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kXG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIGV4dGVuZCgpIHtcbiAgICB2YXIgdGFyZ2V0ID0ge31cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV1cblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGV4dGVuZFxuXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5mdW5jdGlvbiBleHRlbmQodGFyZ2V0KSB7XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXVxuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXRcbn1cbiIsInZhciBiZWwgPSByZXF1aXJlKCdiZWwnKSAvLyB0dXJucyB0ZW1wbGF0ZSB0YWcgaW50byBET00gZWxlbWVudHNcbnZhciBtb3JwaGRvbSA9IHJlcXVpcmUoJ21vcnBoZG9tJykgLy8gZWZmaWNpZW50bHkgZGlmZnMgKyBtb3JwaHMgdHdvIERPTSBlbGVtZW50c1xudmFyIGRlZmF1bHRFdmVudHMgPSByZXF1aXJlKCcuL3VwZGF0ZS1ldmVudHMuanMnKSAvLyBkZWZhdWx0IGV2ZW50cyB0byBiZSBjb3BpZWQgd2hlbiBkb20gZWxlbWVudHMgdXBkYXRlXG5cbm1vZHVsZS5leHBvcnRzID0gYmVsXG5cbi8vIFRPRE8gbW92ZSB0aGlzICsgZGVmYXVsdEV2ZW50cyB0byBhIG5ldyBtb2R1bGUgb25jZSB3ZSByZWNlaXZlIG1vcmUgZmVlZGJhY2tcbm1vZHVsZS5leHBvcnRzLnVwZGF0ZSA9IGZ1bmN0aW9uIChmcm9tTm9kZSwgdG9Ob2RlLCBvcHRzKSB7XG4gIGlmICghb3B0cykgb3B0cyA9IHt9XG4gIGlmIChvcHRzLmV2ZW50cyAhPT0gZmFsc2UpIHtcbiAgICBpZiAoIW9wdHMub25CZWZvcmVFbFVwZGF0ZWQpIG9wdHMub25CZWZvcmVFbFVwZGF0ZWQgPSBjb3BpZXJcbiAgfVxuXG4gIHJldHVybiBtb3JwaGRvbShmcm9tTm9kZSwgdG9Ob2RlLCBvcHRzKVxuXG4gIC8vIG1vcnBoZG9tIG9ubHkgY29waWVzIGF0dHJpYnV0ZXMuIHdlIGRlY2lkZWQgd2UgYWxzbyB3YW50ZWQgdG8gY29weSBldmVudHNcbiAgLy8gdGhhdCBjYW4gYmUgc2V0IHZpYSBhdHRyaWJ1dGVzXG4gIGZ1bmN0aW9uIGNvcGllciAoZiwgdCkge1xuICAgIC8vIGNvcHkgZXZlbnRzOlxuICAgIHZhciBldmVudHMgPSBvcHRzLmV2ZW50cyB8fCBkZWZhdWx0RXZlbnRzXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBldiA9IGV2ZW50c1tpXVxuICAgICAgaWYgKHRbZXZdKSB7IC8vIGlmIG5ldyBlbGVtZW50IGhhcyBhIHdoaXRlbGlzdGVkIGF0dHJpYnV0ZVxuICAgICAgICBmW2V2XSA9IHRbZXZdIC8vIHVwZGF0ZSBleGlzdGluZyBlbGVtZW50XG4gICAgICB9IGVsc2UgaWYgKGZbZXZdKSB7IC8vIGlmIGV4aXN0aW5nIGVsZW1lbnQgaGFzIGl0IGFuZCBuZXcgb25lIGRvZXNudFxuICAgICAgICBmW2V2XSA9IHVuZGVmaW5lZCAvLyByZW1vdmUgaXQgZnJvbSBleGlzdGluZyBlbGVtZW50XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGNvcHkgdmFsdWVzIGZvciBmb3JtIGVsZW1lbnRzXG4gICAgaWYgKChmLm5vZGVOYW1lID09PSAnSU5QVVQnICYmIGYudHlwZSAhPT0gJ2ZpbGUnKSB8fCBmLm5vZGVOYW1lID09PSAnU0VMRUNUJykge1xuICAgICAgaWYgKHQuZ2V0QXR0cmlidXRlKCd2YWx1ZScpID09PSBudWxsKSB0LnZhbHVlID0gZi52YWx1ZVxuICAgIH0gZWxzZSBpZiAoZi5ub2RlTmFtZSA9PT0gJ1RFWFRBUkVBJykge1xuICAgICAgaWYgKHQuZ2V0QXR0cmlidXRlKCd2YWx1ZScpID09PSBudWxsKSBmLnZhbHVlID0gdC52YWx1ZVxuICAgIH1cbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gIC8vIGF0dHJpYnV0ZSBldmVudHMgKGNhbiBiZSBzZXQgd2l0aCBhdHRyaWJ1dGVzKVxuICAnb25jbGljaycsXG4gICdvbmRibGNsaWNrJyxcbiAgJ29ubW91c2Vkb3duJyxcbiAgJ29ubW91c2V1cCcsXG4gICdvbm1vdXNlb3ZlcicsXG4gICdvbm1vdXNlbW92ZScsXG4gICdvbm1vdXNlb3V0JyxcbiAgJ29uZHJhZ3N0YXJ0JyxcbiAgJ29uZHJhZycsXG4gICdvbmRyYWdlbnRlcicsXG4gICdvbmRyYWdsZWF2ZScsXG4gICdvbmRyYWdvdmVyJyxcbiAgJ29uZHJvcCcsXG4gICdvbmRyYWdlbmQnLFxuICAnb25rZXlkb3duJyxcbiAgJ29ua2V5cHJlc3MnLFxuICAnb25rZXl1cCcsXG4gICdvbnVubG9hZCcsXG4gICdvbmFib3J0JyxcbiAgJ29uZXJyb3InLFxuICAnb25yZXNpemUnLFxuICAnb25zY3JvbGwnLFxuICAnb25zZWxlY3QnLFxuICAnb25jaGFuZ2UnLFxuICAnb25zdWJtaXQnLFxuICAnb25yZXNldCcsXG4gICdvbmZvY3VzJyxcbiAgJ29uYmx1cicsXG4gICdvbmlucHV0JyxcbiAgLy8gb3RoZXIgY29tbW9uIGV2ZW50c1xuICAnb25jb250ZXh0bWVudScsXG4gICdvbmZvY3VzaW4nLFxuICAnb25mb2N1c291dCdcbl1cbiIsImltcG9ydCBjaG9vIGZyb20gJ2Nob28nXG5pbXBvcnQgZmFzdGNsaWNrIGZyb20gJ2Zhc3RjbGljaydcbmltcG9ydCBsb2cgZnJvbSAnY2hvby1sb2cnXG5pbXBvcnQgYXBpTW9kZWwgZnJvbSAnfi9tb2RlbHMvYXBpJ1xuaW1wb3J0IGFwcE1vZGVsIGZyb20gJ34vbW9kZWxzL2FwcCdcbmltcG9ydCBnYW1lTW9kZWwgZnJvbSAnfi9tb2RlbHMvZ2FtZSdcbmltcG9ydCB3ZWxjb21lUGFnZSBmcm9tICd+L3BhZ2VzL3dlbGNvbWUnXG5pbXBvcnQgaW5nYW1lUGFnZSBmcm9tICd+L3BhZ2VzL2luZ2FtZSdcblxuY29uc3QgYXBwID0gY2hvbygpXG5hcHAudXNlKGxvZygpKVxuXG5hcHAubW9kZWwoYXBpTW9kZWwpXG5hcHAubW9kZWwoYXBwTW9kZWwpXG5hcHAubW9kZWwoZ2FtZU1vZGVsKVxuXG4vLyBUT0RPOiB3YWl0IGZvciBjaG9vIHRvIG1ha2UgaGFzaCByb3V0aW5nIHJlYWxseSB3b3JrXG5hcHAucm91dGVyKHJvdXRlID0+IFtcbiAgcm91dGUoJy8nLCB3ZWxjb21lUGFnZSksXG4gIHJvdXRlKCcvaW5nYW1lJywgaW5nYW1lUGFnZSlcbl0pXG5cbmNvbnN0IHRyZWUgPSBhcHAuc3RhcnQoKVxuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0cmVlKVxuZmFzdGNsaWNrKGRvY3VtZW50LmJvZHkpXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RldmljZXJlYWR5JywgKCkgPT4ge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdiYWNrYnV0dG9uJywgKCkgPT4ge1xuICAgIGhpc3RvcnkuYmFjaygpXG4gIH0pXG5cbiAgaWYgKGNvcmRvdmEucGxhdGZvcm1JZCA9PSAnYW5kcm9pZCcpIHtcbiAgICBTdGF0dXNCYXIuYmFja2dyb3VuZENvbG9yQnlIZXhTdHJpbmcoJyMxMjE2MzcnKTtcbiAgfVxufSlcbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlbmRlcklmKGNvbmRpdGlvbiwgc3RhdGUsIHJlbmRlcmVyKSB7XG4gIHJldHVybiAoY29uZGl0aW9uID8gcmVuZGVyZXIoc3RhdGUpIDogJycpXG59XG4iLCJpbXBvcnQgY2hhbXBpb25zIGZyb20gJ2xvbC1jaGFtcGlvbnMnXG5pbXBvcnQgc3BlbGxzIGZyb20gJ2xvbC1zcGVsbHMnXG5pbXBvcnQgc3RvcmUgZnJvbSAnc3RvcmUnXG5pbXBvcnQgdW5pcXVlaWQgZnJvbSAndW5pcXVlaWQnXG5pbXBvcnQgeGhyIGZyb20gJ3hocidcbmltcG9ydCB4dGVuZCBmcm9tICd4dGVuZCdcblxuY29uc3QgcHJveHlVcmwgPSAnaHR0cHM6Ly93dC1uZ3J5bWFuLWdtYWlsX2NvbS0wLnJ1bi53ZWJ0YXNrLmlvL3Jpb3QtcHJveHknXG5cbmNvbnN0IGVuZHBvaW50ID0gKG5hbWUpID0+IHtcbiAgY29uc3QgcmVnaW9uID0gc3RvcmUuZ2V0KCdhcHA6cmVnaW9uJylcbiAgc3dpdGNoIChuYW1lKSB7XG4gICAgY2FzZSAnc3VtbW9uZXInOlxuICAgICAgcmV0dXJuIGAvYXBpL2xvbC8ke3JlZ2lvbn0vdjEuNC9zdW1tb25lci9ieS1uYW1lYFxuICAgIGNhc2UgJ2VubmVtaWVzJzpcbiAgICAgIHJldHVybiBgL29ic2VydmVyLW1vZGUvcmVzdC9jb25zdW1lci9nZXRTcGVjdGF0b3JHYW1lSW5mby8ke3JlZ2lvbn0xYFxuICB9XG59XG5cbmNvbnN0IHVpZCA9IHVuaXF1ZWlkKClcblxuZXhwb3J0IGRlZmF1bHQge1xuICBuYW1lc3BhY2U6ICdhcGknLFxuICBlZmZlY3RzOiB7XG4gICAgcmVxdWVzdDogKHVybCwgc3RhdGUsIHNlbmQsIGRvbmUpID0+IHtcbiAgICAgIHJldHVybiB4aHIoYCR7cHJveHlVcmx9P3VybD0ke3VybH1gLCB7IGpzb246IHRydWUgfSxcbiAgICAgIChlcnIsIHJlcywgYm9keSkgPT4ge1xuICAgICAgICBpZiAobnVsbCA9PSBib2R5LnN0YXR1cykge1xuICAgICAgICAgIGRvbmUobnVsbCwgYm9keSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkb25lKGJvZHkuc3RhdHVzLnN0YXR1c19jb2RlKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgc3VtbW9uZXI6IChuYW1lLCBzdGF0ZSwgc2VuZCwgZG9uZSkgPT4ge1xuICAgICAgY29uc3Qgc3VtbW9uZXIgPSBzdG9yZS5nZXQoJ2FwaTpzdW1tb25lcicpXG4gICAgICBpZiAobnVsbCAhPSBzdW1tb25lciAmJiBzdW1tb25lci5uYW1lID09PSBuYW1lKVxuICAgICAgICByZXR1cm4gZG9uZShudWxsLCBzdW1tb25lcilcblxuICAgICAgc2VuZCgnYXBpOnJlcXVlc3QnLCBgJHtlbmRwb2ludCgnc3VtbW9uZXInKX0vJHtuYW1lfWAsXG4gICAgICAoZXJyLCBib2R5KSA9PiB7XG4gICAgICAgIGlmICg0MDMgPT09IGVyciB8fCA0MDQgPT09IGVycilcbiAgICAgICAgICByZXR1cm4gZG9uZSgnVW5rbm93biBzdW1tb25lcicpXG5cbiAgICAgICAgY29uc3Qgc3VtbW9uZXIgPSBib2R5W25hbWUudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC8gL2csICcnKV1cbiAgICAgICAgaWYgKCFzdW1tb25lcilcbiAgICAgICAgICByZXR1cm4gZG9uZSgnTm8gc3VtbW9uZXIgZm91bmQnKVxuXG4gICAgICAgIHN0b3JlLnNldCgnYXBpOnN1bW1vbmVyJywgc3VtbW9uZXIpXG5cbiAgICAgICAgZG9uZShudWxsLCBzdW1tb25lcilcbiAgICAgIH0pXG4gICAgfSxcbiAgICBlbm5lbWllczogKHN1bW1vbmVyLCBzdGF0ZSwgc2VuZCwgZG9uZSkgPT4ge1xuICAgICAgc2VuZCgnYXBpOnJlcXVlc3QnLCBgJHtlbmRwb2ludCgnZW5uZW1pZXMnKX0vJHtzdW1tb25lci5pZH1gLFxuICAgICAgKGVyciwgYm9keSkgPT4ge1xuICAgICAgICBpZiAoNDA0ID09PSBlcnIpXG4gICAgICAgICAgcmV0dXJuIGRvbmUoJ05vIGxpdmUgZ2FtZSBmb3VuZCcpXG5cbiAgICAgICAgY29uc3QgeyBwYXJ0aWNpcGFudHMgfSA9IGJvZHlcbiAgICAgICAgaWYgKDEgPT09IHBhcnRpY2lwYW50cy5sZW5ndGgpXG4gICAgICAgICAgcmV0dXJuIGRvbmUoJ0dhbWUgbW9kZSBub3Qgc3VwcG9ydGVkJylcblxuICAgICAgICBjb25zdCBzdW1tb25lclRlYW0gPSBwYXJ0aWNpcGFudHNcbiAgICAgICAgICAuZmluZChwYXJ0aWNpcGFudCA9PiBzdW1tb25lci5uYW1lID09PSBwYXJ0aWNpcGFudC5zdW1tb25lck5hbWUpXG4gICAgICAgICAgLnRlYW1JZFxuXG4gICAgICAgIGNvbnN0IGVubmVtaWVzID0gcGFydGljaXBhbnRzXG4gICAgICAgICAgLmZpbHRlcihwYXJ0aWNpcGFudCA9PiBwYXJ0aWNpcGFudC50ZWFtSWQgIT09IHN1bW1vbmVyVGVhbSlcbiAgICAgICAgICAubWFwKHBhcnRpY2lwYW50ID0+ICh7XG4gICAgICAgICAgICBuYW1lOiBwYXJ0aWNpcGFudC5zdW1tb25lck5hbWUsXG4gICAgICAgICAgICBjaGFtcGlvbjogY3JlYXRlQ2hhbXBpb24ocGFydGljaXBhbnQuY2hhbXBpb25JZCksXG4gICAgICAgICAgICBzcGVsbHM6IFtcbiAgICAgICAgICAgICAgY3JlYXRlU3BlbGwocGFydGljaXBhbnQuc3BlbGwxSWQpLFxuICAgICAgICAgICAgICBjcmVhdGVTcGVsbChwYXJ0aWNpcGFudC5zcGVsbDJJZClcbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9KSlcblxuICAgICAgICBkb25lKG51bGwsIGVubmVtaWVzKVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlQ2hhbXBpb24oaWQpIHtcbiAgcmV0dXJuIGNoYW1waW9ucy5maW5kKGMgPT4gYy5rZXkgPT09IFN0cmluZyhpZCkpXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNwZWxsKGlkKSB7XG4gIGNvbnN0IHNwZWxsID0gc3BlbGxzLmZpbmQocyA9PiBzLmtleSA9PT0gU3RyaW5nKGlkKSlcbiAgcmV0dXJuIHh0ZW5kKHt9LCBzcGVsbCwge1xuICAgIHVpZDogdWlkKCksXG4gICAgc3RhdGU6ICdhdmFpbGFibGUnLFxuICAgIGNvb2xkb3duOiAwLFxuICAgIHJlZkNvb2xkb3duOiBzcGVsbC5jb29sZG93blxuICB9KVxufVxuIiwiaW1wb3J0IHN0b3JlIGZyb20gJ3N0b3JlJ1xuaW1wb3J0IHh0ZW5kIGZyb20gJ3h0ZW5kJ1xuXG5sZXQgZXJyVGltZW91dElkXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZXNwYWNlOiAnYXBwJyxcbiAgc3RhdGU6IHtcbiAgICB0aXRsZTogJzxlbT5ObzwvZW0+IEZsYXNoJyxcbiAgICB0YWdsaW5lOiAnVHJhY2sgc3VtbW9uZXIgc3BlbGxzJyxcbiAgICBsb2FkaW5nOiBmYWxzZSxcbiAgICBlcnJvcjogJycsXG4gICAgc3VtbW9uZXI6IHN0b3JlLmdldCgnYXBwOnN1bW1vbmVyJykgfHwgJycsXG4gICAgcmVnaW9uOiBzdG9yZS5nZXQoJ2FwcDpyZWdpb24nKSB8fCAnJ1xuICB9LFxuICBlZmZlY3RzOiB7XG4gICAgc3VtbW9uZXI6IChzdW1tb25lciwgc3RhdGUsIHNlbmQsIGRvbmUpID0+IHtcbiAgICAgIHN0b3JlLnNldCgnYXBwOnN1bW1vbmVyJywgc3VtbW9uZXIpXG4gICAgICBzZW5kKCdhcHA6c2V0JywgeyBzdW1tb25lciB9LCBkb25lKVxuICAgIH0sXG4gICAgcmVnaW9uOiAocmVnaW9uLCBzdGF0ZSwgc2VuZCwgZG9uZSkgPT4ge1xuICAgICAgc3RvcmUuc2V0KCdhcHA6cmVnaW9uJywgcmVnaW9uKVxuICAgICAgc2VuZCgnYXBwOnNldCcsIHsgcmVnaW9uIH0sIGRvbmUpXG4gICAgfSxcbiAgICBsb2FkaW5nOiAoZGF0YSwgc3RhdGUsIHNlbmQsIGRvbmUpID0+IHtcbiAgICAgIHNlbmQoJ2FwcDpzZXQnLCB7IGVycm9yOiAnJywgbG9hZGluZzogdHJ1ZSB9LCBkb25lKVxuICAgIH0sXG4gICAgZXJyb3I6IChkYXRhLCBzdGF0ZSwgc2VuZCwgZG9uZSkgPT4ge1xuICAgICAgc2VuZCgnYXBwOnNldCcsIHsgZXJyb3I6IGRhdGEuZXJyLCBsb2FkaW5nOiBmYWxzZSB9LCBkb25lKVxuXG4gICAgICBjbGVhclRpbWVvdXQoZXJyVGltZW91dElkKVxuICAgICAgZXJyVGltZW91dElkID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHNlbmQoJ2FwcDpzZXQnLCB7IGVycm9yOiAnJywgbG9hZGluZzogZmFsc2UgfSwgZG9uZSlcbiAgICAgIH0sIDMwMDApXG4gICAgfVxuICB9LFxuICByZWR1Y2Vyczoge1xuICAgIHNldDogKGRhdGEsIHN0YXRlKSA9PiB4dGVuZChzdGF0ZSwgZGF0YSlcbiAgfVxufVxuIiwiaW1wb3J0IHh0ZW5kIGZyb20gJ3h0ZW5kJ1xuXG5sZXQgbnVtQ29vbGRvd25zID0gMFxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWVzcGFjZTogJ2dhbWUnLFxuICBzdGF0ZToge1xuICAgIGVubmVtaWVzOiBbXVxuICB9LFxuICBlZmZlY3RzOiB7XG4gICAgZmV0Y2g6IChuYW1lLCBzdGF0ZSwgc2VuZCwgZG9uZSkgPT4ge1xuICAgICAgc2VuZCgnYXBwOmxvYWRpbmcnLCAoKSA9PiB7XG4gICAgICAgIHNlbmQoJ2FwaTpzdW1tb25lcicsIG5hbWUsIChlcnIsIHN1bW1vbmVyKSA9PiB7XG4gICAgICAgICAgaWYgKGVycikgcmV0dXJuIHNlbmQoJ2FwcDplcnJvcicsIHsgZXJyIH0sIGRvbmUpXG5cbiAgICAgICAgICBzZW5kKCdhcGk6ZW5uZW1pZXMnLCBzdW1tb25lciwgKGVyciwgZW5uZW1pZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHJldHVybiBzZW5kKCdhcHA6ZXJyb3InLCB7IGVyciB9LCBkb25lKVxuXG4gICAgICAgICAgICBzZW5kKCdnYW1lOmVubmVtaWVzJywgZW5uZW1pZXMsICgpID0+IHtcbiAgICAgICAgICAgICAgc2VuZCgnbG9jYXRpb246c2V0TG9jYXRpb24nLCB7IGxvY2F0aW9uOiAnL2luZ2FtZScgfSwgZG9uZSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgfSxcbiAgICBjb29sZG93bjogKHNwZWxsLCBzdGF0ZSwgc2VuZCwgZG9uZSkgPT4ge1xuICAgICAgaWYgKCdjb29sZG93bicgIT09IHNwZWxsLnN0YXRlKSB7XG4gICAgICAgIG51bUNvb2xkb3ducysrXG4gICAgICAgIHNlbmQoJ2dhbWU6c3RhcnRDb29sZG93bicsIHNwZWxsLnVpZCwgZG9uZSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBzZW5kKCdnYW1lOmRlY3JlbWVudENvb2xkb3duJywgeyB1aWQ6IHNwZWxsLnVpZCwgYW1vdW50OiAxMCB9LCBkb25lKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgcmVkdWNlcnM6IHtcbiAgICBlbm5lbWllczogKGVubmVtaWVzLCBzdGF0ZSkgPT4gKHsgZW5uZW1pZXMgfSksXG4gICAgc3RhcnRDb29sZG93bjogKHVpZCwgc3RhdGUpID0+ICh7XG4gICAgICBlbm5lbWllczogc3RhdGUuZW5uZW1pZXMubWFwKGVubmVteSA9PiB4dGVuZChlbm5lbXksIHtcbiAgICAgICAgc3BlbGxzOiBlbm5lbXkuc3BlbGxzLm1hcChzcGVsbCA9PiB7XG4gICAgICAgICAgaWYgKHNwZWxsLnVpZCA9PT0gdWlkKSB7XG4gICAgICAgICAgICByZXR1cm4geHRlbmQoe30sIHNwZWxsLCB7XG4gICAgICAgICAgICAgIHN0YXRlOiAnY29vbGRvd24nLFxuICAgICAgICAgICAgICBjb29sZG93bjogc3BlbGwucmVmQ29vbGRvd24gLSAxXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzcGVsbFxuICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgIH0pKVxuICAgIH0pLFxuICAgIGRlY3JlbWVudENvb2xkb3duOiAoZGF0YSwgc3RhdGUpID0+ICh7XG4gICAgICBlbm5lbWllczogc3RhdGUuZW5uZW1pZXMubWFwKGVubmVteSA9PiB4dGVuZChlbm5lbXksIHtcbiAgICAgICAgc3BlbGxzOiBlbm5lbXkuc3BlbGxzLm1hcChzcGVsbCA9PiB7XG4gICAgICAgICAgaWYgKCdjb29sZG93bicgIT09IHNwZWxsLnN0YXRlKSByZXR1cm4gc3BlbGxcbiAgICAgICAgICBpZiAoZGF0YS51aWQgJiYgc3BlbGwudWlkICE9PSBkYXRhLnVpZCkgcmV0dXJuIHNwZWxsXG5cbiAgICAgICAgICBjb25zdCBuZXdTcGVsbCA9IHh0ZW5kKHt9LCBzcGVsbCwge1xuICAgICAgICAgICAgY29vbGRvd246IHNwZWxsLmNvb2xkb3duIC0gZGF0YS5hbW91bnRcbiAgICAgICAgICB9KVxuXG4gICAgICAgICAgaWYgKG5ld1NwZWxsLmNvb2xkb3duIDw9IDApIHtcbiAgICAgICAgICAgIG5ld1NwZWxsLmNvb2xkb3duID0gMFxuICAgICAgICAgICAgbmV3U3BlbGwuc3RhdGUgPSAnYXZhaWxhYmxlJ1xuICAgICAgICAgICAgbnVtQ29vbGRvd25zLS1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gbmV3U3BlbGxcbiAgICAgICAgfSlcbiAgICAgIH0pKVxuICAgIH0pLFxuICAgIHRvZ2dsZUZvY3VzOiAoZGF0YSwgc3RhdGUpID0+ICh7XG4gICAgICBlbm5lbWllczogc3RhdGUuZW5uZW1pZXMubWFwKGVubmVteSA9PiB7XG4gICAgICAgIGlmIChlbm5lbXkubmFtZSA9PT0gZGF0YS5uYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIHh0ZW5kKHt9LCBlbm5lbXksIHsgZm9jdXNlZDogIWVubmVteS5mb2N1c2VkIH0pXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGVubmVteVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0pXG4gIH0sXG4gIHN1YnNjcmlwdGlvbnM6IHtcbiAgICB0aWNrOiAoc2VuZCwgZG9uZSkgPT4ge1xuICAgICAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICBpZiAoMCAhPT0gbnVtQ29vbGRvd25zKSB7XG4gICAgICAgICAgc2VuZCgnZ2FtZTpkZWNyZW1lbnRDb29sZG93bicsIHsgYW1vdW50OiAxIH0sIGRvbmUpXG4gICAgICAgIH1cbiAgICAgIH0sIDEwMDApXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgaHRtbCBmcm9tICdjaG9vL2h0bWwnXG5pbXBvcnQgZW5uZW15TGlzdCBmcm9tICd+L3ZpZXdzL2VubmVteS1saXN0J1xuXG5leHBvcnQgZGVmYXVsdCAoc3RhdGUsIHByZXYsIHNlbmQpID0+IGh0bWxgXG4gIDxtYWluIGNsYXNzPVwiaW5nYW1lLXBhZ2VcIj5cbiAgICAke2VubmVteUxpc3Qoc3RhdGUuZ2FtZSwgcHJldiwgc2VuZCl9XG4gIDwvbWFpbj5cbmBcbiIsImltcG9ydCBodG1sIGZyb20gJ2Nob28vaHRtbCdcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnXG5pbXBvcnQgcmVuZGVySWYgZnJvbSAnfi9saWIvcmVuZGVyLWlmJ1xuXG5jb25zdCByZWdpb25zID0gW1xuICAnQlInLCAnRVVORScsICdFVVcnLCAnSlAnLCAnS1InLCAnTEFOJywgJ0xBUycsICdOQScsICdPQ0UnLCAnUEJFJywgJ1JVJywgJ1RSJ1xuXVxuXG5jb25zdCBoYW5kbGVTdWJtaXQgPSAoZSwgc3RhdGUsIHNlbmQpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgaWYgKHN0YXRlLmFwcC5zdW1tb25lcikge1xuICAgIHNlbmQoJ2dhbWU6ZmV0Y2gnLCBzdGF0ZS5hcHAuc3VtbW9uZXIpXG4gIH1cbiAgZWxzZSB7XG4gICAgc2VuZCgnYXBwOmVycm9yJywgJ0VtcHR5IHN1bW1vbmVyIG5hbWUnKVxuICB9XG59XG5cbmNvbnN0IGhhbmRsZUlucHV0ID0gKGUsIHN0YXRlLCBzZW5kKSA9PiB7XG4gIHNlbmQoJ2FwcDpzdW1tb25lcicsIGUudGFyZ2V0LnZhbHVlKVxufVxuXG5jb25zdCBoYW5kbGVDaGFuZ2UgPSAoZSwgc3RhdGUsIHNlbmQpID0+IHtcbiAgc2VuZCgnYXBwOnJlZ2lvbicsIGUudGFyZ2V0LnZhbHVlKVxufVxuXG5jb25zdCBjbGFzc1ZhcmlhbnRzID0gKHN0YXRlKSA9PiBjbGFzc25hbWVzKHtcbiAgW2AtbG9hZGluZ2BdOiBzdGF0ZS5hcHAubG9hZGluZ1xufSlcblxuY29uc3QgcmVuZGVyUmVnaW9uID0gKHJlZ2lvbiwgc3RhdGUpID0+IGh0bWxgXG4gIDxvcHRpb24gJHtyZWdpb24gPT09IHN0YXRlLmFwcC5yZWdpb24gPyAnc2VsZWN0ZWQnIDogJyd9PiR7cmVnaW9ufTwvb3B0aW9uPlxuYFxuXG5jb25zdCByZW5kZXJFcnJvciA9IChlcnJvcikgPT4gaHRtbGBcbiAgPGRpdiBjbGFzcz1cImVycm9yLXBhbmVcIj4ke2Vycm9yfTwvZGl2PlxuYFxuXG5leHBvcnQgZGVmYXVsdCAoc3RhdGUsIHByZXYsIHNlbmQpID0+IGh0bWxgXG4gIDxtYWluIGNsYXNzPVwid2VsY29tZS1wYWdlXCI+XG4gICAgPGRpdiBjbGFzcz1cIndlbGNvbWUtaGVhZGVyXCI+XG4gICAgICA8aDEgY2xhc3M9XCJ0aXRsZVwiPjxlbT5ObzwvZW0+Rmxhc2g8L2gxPlxuICAgICAgPGJsb2NrcXVvdGUgY2xhc3M9XCJ0YWdsaW5lXCI+JHtzdGF0ZS5hcHAudGFnbGluZX08L2Jsb2NrcXVvdGU+XG4gICAgPC9kaXY+XG4gICAgPGZvcm0gY2xhc3M9XCJ3ZWxjb21lLWZvcm0gJHtjbGFzc1ZhcmlhbnRzKHN0YXRlKX1cIlxuICAgICAgb25zdWJtaXQ9JHtlID0+IGhhbmRsZVN1Ym1pdChlLCBzdGF0ZSwgc2VuZCl9fT5cbiAgICAgIDxmaWVsZHNldCBjbGFzcz1cImZpZWxkc2V0XCI+XG4gICAgICAgIDxsYWJlbCBjbGFzcz1cImxhYmVsXCI+XG4gICAgICAgICAgU3VtbW9uZXIgbmFtZVxuICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgY2xhc3M9XCJpbnB1dFwiXG4gICAgICAgICAgICB2YWx1ZT0ke3N0YXRlLmFwcC5zdW1tb25lcn1cbiAgICAgICAgICAgICR7c3RhdGUuYXBwLmxvYWRpbmcgPyAnZGlzYWJsZWQnIDogJyd9XG4gICAgICAgICAgICBvbmlucHV0PSR7ZSA9PiBoYW5kbGVJbnB1dChlLCBzdGF0ZSwgc2VuZCl9IC8+XG4gICAgICAgIDwvbGFiZWw+XG4gICAgICAgIDxzZWxlY3QgY2xhc3M9XCJyZWdpb25zXCIgb25jaGFuZ2U9JHtlID0+IGhhbmRsZUNoYW5nZShlLCBzdGF0ZSwgc2VuZCl9PlxuICAgICAgICAgICR7cmVnaW9ucy5tYXAocmVnaW9uID0+IHJlbmRlclJlZ2lvbihyZWdpb24sIHN0YXRlKSl9XG4gICAgICAgIDwvc2VsZWN0PlxuICAgICAgPC9maWVsZHNldD5cbiAgICAgIDxidXR0b24gY2xhc3M9XCJzdWJtaXRcIj5TdGFydDwvYnV0dG9uPlxuICAgIDwvZm9ybT5cbiAgICAke3JlbmRlcklmKHN0YXRlLmFwcC5lcnJvciwgc3RhdGUuYXBwLmVycm9yLCByZW5kZXJFcnJvcil9XG4gIDwvbWFpbj5cbmBcbiIsImltcG9ydCBodG1sIGZyb20gJ2Nob28vaHRtbCdcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnXG5pbXBvcnQgY2xvc2VzdCBmcm9tICdjbG9zZXN0J1xuaW1wb3J0IHNwZWxsTGlzdCBmcm9tICcuL3NwZWxsLWxpc3QnXG5cbmNvbnN0IGhhbmRsZUNsaWNrID0gKGUsIGVubmVteSwgc2VuZCkgPT4ge1xuICBpZiAobnVsbCA9PSBjbG9zZXN0KGUudGFyZ2V0LCAnLnNwZWxsLWl0ZW0nLCB0cnVlKSkge1xuICAgIHNlbmQoJ2dhbWU6dG9nZ2xlRm9jdXMnLCBlbm5lbXkpXG4gIH1cbn1cblxuY29uc3QgY2xhc3NWYXJpYW50cyA9IChlbm5lbXkpID0+IGNsYXNzbmFtZXMoe1xuICBbYC1mb2N1c2VkYF06IGVubmVteS5mb2N1c2VkXG59KVxuXG5leHBvcnQgZGVmYXVsdCAoZW5uZW15LCBwcmV2LCBzZW5kKSA9PiBodG1sYFxuICA8bGkgY2xhc3M9XCJlbm5lbXktaXRlbSAke2NsYXNzVmFyaWFudHMoZW5uZW15KX1cIlxuICAgIG9uY2xpY2s9JHtlID0+IGhhbmRsZUNsaWNrKGUsIGVubmVteSwgc2VuZCl9PlxuICAgIDxkaXYgY2xhc3M9XCJlbm5lbXktbWV0YVwiPlxuICAgICAgPGgyIGNsYXNzPVwiY2hhbXBpb25cIj4ke2VubmVteS5jaGFtcGlvbi5uYW1lfTwvaDI+XG4gICAgPC9kaXY+XG4gICAgJHtzcGVsbExpc3QoZW5uZW15LCBwcmV2LCBzZW5kKX1cbiAgPC9saT5cbmBcbiIsImltcG9ydCBodG1sIGZyb20gJ2Nob28vaHRtbCdcbmltcG9ydCBjbG9zZXN0IGZyb20gJ2Nsb3Nlc3QnXG5pbXBvcnQgZW5uZW15SXRlbSBmcm9tICcuL2VubmVteS1pdGVtJ1xuXG5sZXQgZHJhZ0luZm9cblxuY29uc3QgaW5kZXhPZiA9IChlbCkgPT4gQXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChcbiAgZWwucGFyZW50Tm9kZS5jaGlsZE5vZGVzLCBlbClcblxuY29uc3QgaGFuZGxlRHJhZ1N0YXJ0ID0gKGUpID0+IHtcbiAgY29uc3QgbGlzdCA9IGNsb3Nlc3QoZS50YXJnZXQsICcuZW5uZW15LWxpc3QnKVxuICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGhhbmRsZURyYWdNb3ZlKVxuICBsaXN0LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBoYW5kbGVEcmFnRW5kKVxuXG4gIGNvbnN0IGxpc3RJdGVtID0gY2xvc2VzdChlLnRhcmdldCwgJy5lbm5lbXktaXRlbScsIHRydWUpXG5cbiAgZHJhZ0luZm8gPSB7XG4gICAgZHJhZ2dpbmc6IGZhbHNlLFxuICAgIHN0YXJ0OiBlLmNsaWVudFksXG4gICAgaW5kZXg6IGluZGV4T2YobGlzdEl0ZW0pLFxuICAgIGxpc3QsXG4gICAgbGlzdEl0ZW1cbiAgfVxufVxuXG5jb25zdCBoYW5kbGVEcmFnTW92ZSA9IChlKSA9PiB7XG4gIGNvbnN0IHsgbGlzdCwgbGlzdEl0ZW0gfSA9IGRyYWdJbmZvXG5cbiAgaWYgKCFkcmFnSW5mby5kcmFnZ2luZyAmJiBNYXRoLmFicyhlLmNsaWVudFkgLSBkcmFnSW5mby5zdGFydCkgPiAxMCkge1xuICAgIGxpc3RJdGVtLmNsYXNzTGlzdC5hZGQoJy1kcmFnZ2luZycpXG4gICAgZHJhZ0luZm8uZHJhZ2dpbmcgPSB0cnVlXG4gIH1cblxuICBpZiAoZHJhZ0luZm8uZHJhZ2dpbmcpIHtcbiAgICBjb25zdCBob3ZlckVsID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChlLmNsaWVudFgsIGUuY2xpZW50WSlcbiAgICBjb25zdCBob3Zlckl0ZW0gPSBjbG9zZXN0KGUudGFyZ2V0LCAnLmVubmVteS1pdGVtJywgdHJ1ZSlcblxuICAgIGlmIChudWxsICE9IGhvdmVySXRlbSkge1xuICAgICAgY29uc3QgZGVzdEluZGV4ID0gaW5kZXhPZihob3Zlckl0ZW0pXG4gICAgICBjb25zdCBkZXN0SXRlbSA9IGhvdmVySXRlbS5uZXh0RWxlbWVudFNpYmxpbmdcblxuICAgICAgaWYgKGRlc3RJbmRleCAhPT0gZHJhZ0luZm8uaW5kZXgpIHtcbiAgICAgICAgbGlzdC5pbnNlcnRCZWZvcmUobGlzdEl0ZW0sIGRlc3RJdGVtKVxuICAgICAgICBkcmFnSW5mby5pbmRleCA9IGRlc3RJbmRleFxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBoYW5kbGVEcmFnRW5kID0gKGUpID0+IHtcbiAgY29uc3QgeyBsaXN0LCBsaXN0SXRlbSB9ID0gZHJhZ0luZm9cblxuICBsaXN0SXRlbS5jbGFzc0xpc3QucmVtb3ZlKCctZHJhZ2dpbmcnKVxuICBsaXN0SXRlbS5zdHlsZS50cmFuc2Zvcm0gPSAnJ1xuXG4gIGxpc3QucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgaGFuZGxlRHJhZ01vdmUpXG4gIGxpc3QucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGhhbmRsZURyYWdFbmQpXG59XG5cbmV4cG9ydCBkZWZhdWx0IChnYW1lLCBwcmV2LCBzZW5kKSA9PiBodG1sYFxuICA8dWwgY2xhc3M9XCJlbm5lbXktbGlzdFwiPlxuICAgICR7Z2FtZS5lbm5lbWllcy5tYXAoZW5uZW15ID0+IGVubmVteUl0ZW0oZW5uZW15LCBwcmV2LCBzZW5kKSl9XG4gIDwvdWw+XG5gXG4iLCJpbXBvcnQgaHRtbCBmcm9tICdjaG9vL2h0bWwnXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJ1xuaW1wb3J0IHJlbmRlcklmIGZyb20gJ34vbGliL3JlbmRlci1pZidcblxuY29uc3QgaGFuZGxlQ2xpY2sgPSAoZSwgc3BlbGwsIHNlbmQpID0+IHtcbiAgc2VuZCgnZ2FtZTpjb29sZG93bicsIHNwZWxsKVxufVxuXG5jb25zdCBjbGFzc1ZhcmlhbnRzID0gKHNwZWxsKSA9PiBjbGFzc25hbWVzKHtcbiAgW2AtJHtzcGVsbC5pZH1gXTogdHJ1ZSxcbiAgW2AtJHtzcGVsbC5zdGF0ZX1gXTogdHJ1ZSxcbiAgW2AtdGltZTYwYF06IHNwZWxsLmNvb2xkb3duIDw9IDYwICYmIHNwZWxsLmNvb2xkb3duID4gMzAsXG4gIFtgLXRpbWUzMGBdOiBzcGVsbC5jb29sZG93biA8PSAzMCAmJiBzcGVsbC5jb29sZG93biA+IDBcbn0pXG5cbmNvbnN0IGRyYXdDb29sZG93blBpZSA9IChzcGVsbCkgPT4ge1xuICBjb25zdCByID0gNTBcbiAgY29uc3QgdCA9IDEgLSBzcGVsbC5jb29sZG93biAvIHNwZWxsLnJlZkNvb2xkb3duXG4gIGNvbnN0IGEgPSB0ICogTWF0aC5QSSAqIDJcbiAgY29uc3QgbSA9IGEgPiBNYXRoLlBJID8gMSA6IDBcbiAgY29uc3QgeCA9IE1hdGguc2luKGEpICogclxuICBjb25zdCB5ID0gTWF0aC5jb3MoYSkgKiAtclxuXG4gIHJldHVybiBodG1sYFxuICAgIDxnIHRyYW5zZm9ybT0ke2B0cmFuc2xhdGUoJHtyfSwgJHtyfSlgfVxuICAgICAgc3Ryb2tlLWxpbmVjYXA9XCJyb3VuZFwiXG4gICAgICB2ZWN0b3ItZWZmZWN0PVwibm9uLXNjYWxpbmctc3Ryb2tlXCI+XG4gICAgICA8Y2lyY2xlIGNsYXNzPVwicHJvZ3Jlc3MtYmdcIiBjeD1cIjBcIiBjeT1cIjBcIiByPVwiNTBcIiAvPlxuICAgICAgPHBhdGggY2xhc3M9XCJwcm9ncmVzc1wiIGQ9JHtgTSAwICR7LXJ9IEEgJHtyfSAke3J9IDEgJHttfSAxICR7eH0gJHt5fWB9PjwvcGF0aD5cbiAgICA8L2c+XG4gIGBcbn1cblxuY29uc3QgcmVuZGVyQ29vbGRvd24gPSAoc3BlbGwpID0+IGh0bWxgXG4gIDxzdmcgY2xhc3M9XCJjb29sZG93blwiXG4gICAgdmlld0JveD1cIi01IC01IDExMCAxMTBcIj5cbiAgICAke2RyYXdDb29sZG93blBpZShzcGVsbCl9XG4gIDwvc3ZnPlxuYFxuXG5leHBvcnQgZGVmYXVsdCAoc3BlbGwsIHByZXYsIHNlbmQpID0+IGh0bWxgXG4gIDxsaVxuICAgIGNsYXNzPVwic3BlbGwtaXRlbSAke2NsYXNzVmFyaWFudHMoc3BlbGwpfVwiXG4gICAgb25jbGljaz0ke2UgPT4gaGFuZGxlQ2xpY2soZSwgc3BlbGwsIHNlbmQpfT5cbiAgICAke3JlbmRlcklmKCdjb29sZG93bicgPT09IHNwZWxsLnN0YXRlLCBzcGVsbCwgcmVuZGVyQ29vbGRvd24pfVxuICAgIDxzdmcgY2xhc3M9XCJpY29uXCI+XG4gICAgICA8dXNlIHhsaW5rOmhyZWY9XCIjc3ZnLSR7c3BlbGwuaWR9XCI+XG4gICAgPC9zdmc+XG4gIDwvbGk+XG5gXG4iLCJpbXBvcnQgaHRtbCBmcm9tICdjaG9vL2h0bWwnXG5pbXBvcnQgc3BlbGxJdGVtIGZyb20gJy4vc3BlbGwtaXRlbSdcblxuZXhwb3J0IGRlZmF1bHQgKGVubmVteSwgcHJldiwgc2VuZCkgPT4gaHRtbGBcbiAgPHVsIGNsYXNzPVwic3BlbGwtbGlzdFwiPlxuICAgICR7ZW5uZW15LnNwZWxscy5tYXAoc3BlbGwgPT4gc3BlbGxJdGVtKHNwZWxsLCBwcmV2LCBzZW5kKSl9XG4gIDwvdWw+XG5gXG4iXX0=
