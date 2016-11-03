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
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var _choo=require(7),_choo2=_interopRequireDefault(_choo),_fastclick=require(14),_fastclick2=_interopRequireDefault(_fastclick),_chooLog=require(5),_chooLog2=_interopRequireDefault(_chooLog),_api=require(49),_api2=_interopRequireDefault(_api),_app=require(50),_app2=_interopRequireDefault(_app),_game=require(51),_game2=_interopRequireDefault(_game),_welcome=require(53),_welcome2=_interopRequireDefault(_welcome),_ingame=require(52),_ingame2=_interopRequireDefault(_ingame),app=(0,_choo2.default)();app.use((0,_chooLog2.default)()),app.model(_api2.default),app.model(_app2.default),app.model(_game2.default),app.router(function(e){return[e("/",_welcome2.default),e("/ingame",_ingame2.default)]});var tree=app.start();document.body.appendChild(tree),(0,_fastclick2.default)(document.body),document.addEventListener("deviceready",function(){plugins.insomnia.keepAwake(),document.addEventListener("backbutton",function(){history.back()})});

},{"14":14,"49":49,"5":5,"50":50,"51":51,"52":52,"53":53,"7":7}],48:[function(require,module,exports){
"use strict";function renderIf(e,r,t){return e?t(r):""}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=renderIf;

},{}],49:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}function createChampion(e){return _lolChampions2.default.find(function(n){return n.key===String(e)})}function createSpell(e){var n=_lolSpells2.default.find(function(n){return n.key===String(e)});return(0,_xtend2.default)({},n,{uid:uid(),state:"available",cooldown:0,refCooldown:n.cooldown})}Object.defineProperty(exports,"__esModule",{value:!0});var _lolChampions=require(22),_lolChampions2=_interopRequireDefault(_lolChampions),_lolSpells=require(23),_lolSpells2=_interopRequireDefault(_lolSpells),_store=require(37),_store2=_interopRequireDefault(_store),_uniqueid=require(39),_uniqueid2=_interopRequireDefault(_uniqueid),_xhr=require(42),_xhr2=_interopRequireDefault(_xhr),_xtend=require(43),_xtend2=_interopRequireDefault(_xtend),proxyUrl="https://wt-ngryman-gmail_com-0.run.webtask.io/riot-proxy",endpoint=function(e){var n=_store2.default.get("app:region");switch(e){case"summoner":return"/api/lol/"+n+"/v1.4/summoner/by-name";case"ennemies":return"/observer-mode/rest/consumer/getSpectatorGameInfo/"+n+"1"}},uid=(0,_uniqueid2.default)();exports.default={namespace:"api",effects:{request:function(e,n,r,t){return(0,_xhr2.default)(proxyUrl+"?url="+e,{json:!0},function(e,n,r){null==r.status?t(null,r):t(r.status.status_code)})},summoner:function e(n,r,t,u){var e=_store2.default.get("api:summoner");return null!=e&&e.name===n?u(null,e):void t("api:request",endpoint("summoner")+"/"+n,function(e,r){if(e>400)return u("Unknown summoner");var t=r[n.toLowerCase().replace(/ /g,"")];return t?(_store2.default.set("api:summoner",t),void u(null,t)):u("No summoner found")})},ennemies:function(e,n,r,t){r("api:request",endpoint("ennemies")+"/"+e.id,function(n,r){if(n>400)return t("No live game found");if("CLASSIC"!==r.gameMode||"MATCHED_GAME"!==r.gameType)return t("Game mode not supported");var u=r.participants,o=u.find(function(n){return e.name===n.summonerName}).teamId,i=u.filter(function(e){return e.teamId!==o}).map(function(e){return{name:e.summonerName,champion:createChampion(e.championId),spells:[createSpell(e.spell1Id),createSpell(e.spell2Id)]}});t(null,i)})}}};

},{"22":22,"23":23,"37":37,"39":39,"42":42,"43":43}],50:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _store=require(37),_store2=_interopRequireDefault(_store),_xtend=require(43),_xtend2=_interopRequireDefault(_xtend),errTimeoutId=void 0;exports.default={namespace:"app",state:{title:"<em>No</em> Flash",tagline:"Track summoner spells",loading:!1,error:"",summoner:_store2.default.get("app:summoner")||"",region:_store2.default.get("app:region")||""},effects:{summoner:function(e,r,t,o){_store2.default.set("app:summoner",e),t("app:set",{summoner:e},o)},region:function(e,r,t,o){_store2.default.set("app:region",e),t("app:set",{region:e},o)},loading:function(e,r,t,o){t("app:set",{error:"",loading:!0},o)},error:function(e,r,t,o){t("app:set",{error:e.err,loading:!1},o),clearTimeout(errTimeoutId),errTimeoutId=setTimeout(function(){t("app:set",{error:"",loading:!1},o)},3e3)},clear:function(e,r,t,o){t("app:set",{error:"",loading:!1},o)}},reducers:{set:function(e,r){return(0,_xtend2.default)(r,e)}}};

},{"37":37,"43":43}],51:[function(require,module,exports){
"use strict";function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(exports,"__esModule",{value:!0});var _xtend=require(43),_xtend2=_interopRequireDefault(_xtend),spellAudio=new Audio("sounds/spell.ogg"),numCooldowns=0;exports.default={namespace:"game",state:{ennemies:[]},effects:{fetch:function(e,n,o,t){o("app:loading",function(){o("api:summoner",e,function(e,n){return e?o("app:error",{err:e},t):void o("api:ennemies",n,function(e,n){return e?o("app:error",{err:e},t):void o("game:ennemies",n,function(){o("app:clear",function(){o("location:setLocation",{location:"/ingame"},t),history.pushState({},null,"/ingame")})})})})})},cooldown:function(e,n,o,t){"cooldown"!==e.state?(numCooldowns++,o("game:startCooldown",e.uid,t)):o("game:decrementCooldown",{uid:e.uid,amount:10},t)}},reducers:{ennemies:function(e,n){return{ennemies:e}},startCooldown:function(e,n){return{ennemies:n.ennemies.map(function(n){return(0,_xtend2.default)(n,{spells:n.spells.map(function(n){return n.uid===e?(0,_xtend2.default)({},n,{state:"cooldown",cooldown:n.refCooldown-1}):n})})})}},decrementCooldown:function(e,n){return{ennemies:n.ennemies.map(function(n){return(0,_xtend2.default)(n,{spells:n.spells.map(function(n){if("cooldown"!==n.state)return n;if(e.uid&&n.uid!==e.uid)return n;var o=(0,_xtend2.default)({},n,{cooldown:n.cooldown-e.amount});return o.cooldown<=0&&(o.cooldown=0,o.state="available",numCooldowns--,spellAudio.play()),o})})})}},toggleFocus:function(e,n){return{ennemies:n.ennemies.map(function(n){return n.name===e.name?(0,_xtend2.default)({},n,{focused:!n.focused}):n})}}},subscriptions:{tick:function(e,n){setInterval(function(){0!==numCooldowns&&e("game:decrementCooldown",{amount:1},n)},1e3)}}};

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYmFycmFja3MvYXBwbHktaG9vay5qcyIsIm5vZGVfbW9kdWxlcy9iYXJyYWNrcy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9iZWwvaW5kZXguanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1yZXNvbHZlL2VtcHR5LmpzIiwibm9kZV9tb2R1bGVzL2Nob28tbG9nL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2Nob28vaHRtbC5qcyIsIm5vZGVfbW9kdWxlcy9jaG9vL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NsYXNzbmFtZXMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY2xvc2VzdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9kZWVwLWRpZmYvaW5kZXguanMiLCJub2RlX21vZHVsZXMvZGV0ZWN0LWJyb3dzZXIvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9kZXRlY3QtYnJvd3Nlci9saWIvZGV0ZWN0QnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9kb2N1bWVudC1yZWFkeS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9mYXN0Y2xpY2svbGliL2Zhc3RjbGljay5qcyIsIm5vZGVfbW9kdWxlcy9mb3ItZWFjaC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9nbG9iYWwvZG9jdW1lbnQuanMiLCJub2RlX21vZHVsZXMvZ2xvYmFsL3dpbmRvdy5qcyIsIm5vZGVfbW9kdWxlcy9oYXNoLW1hdGNoL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2h5cGVyc2NyaXB0LWF0dHJpYnV0ZS10by1wcm9wZXJ0eS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9oeXBlcngvaW5kZXguanMiLCJub2RlX21vZHVsZXMvaXMtZnVuY3Rpb24vaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9sLWNoYW1waW9ucy9jaGFtcGlvbnMuanNvbiIsIm5vZGVfbW9kdWxlcy9sb2wtc3BlbGxzL3NwZWxscy5qc29uIiwibm9kZV9tb2R1bGVzL21hdGNoZXMtc2VsZWN0b3IvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbW9ycGhkb20vc3JjL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL25hbm9yYWYvaW5kZXguanMiLCJub2RlX21vZHVsZXMvb24tbG9hZC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wYWQtbGVmdC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wYWQtcmlnaHQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcGFyc2UtaGVhZGVycy9wYXJzZS1oZWFkZXJzLmpzIiwibm9kZV9tb2R1bGVzL3BhdGhuYW1lLW1hdGNoL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlcGVhdC1zdHJpbmcvaW5kZXguanMiLCJub2RlX21vZHVsZXMvc2hlZXQtcm91dGVyL2hhc2guanMiLCJub2RlX21vZHVsZXMvc2hlZXQtcm91dGVyL2hpc3RvcnkuanMiLCJub2RlX21vZHVsZXMvc2hlZXQtcm91dGVyL2hyZWYuanMiLCJub2RlX21vZHVsZXMvc2hlZXQtcm91dGVyL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3N0b3JlL3N0b3JlLmpzIiwibm9kZV9tb2R1bGVzL3RyaW0vaW5kZXguanMiLCJub2RlX21vZHVsZXMvdW5pcXVlaWQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvd2F5ZmFyZXIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvd2F5ZmFyZXIvdHJpZS5qcyIsIm5vZGVfbW9kdWxlcy94aHIvaW5kZXguanMiLCJub2RlX21vZHVsZXMveHRlbmQvaW1tdXRhYmxlLmpzIiwibm9kZV9tb2R1bGVzL3h0ZW5kL211dGFibGUuanMiLCJub2RlX21vZHVsZXMveW8teW8vaW5kZXguanMiLCJub2RlX21vZHVsZXMveW8teW8vdXBkYXRlLWV2ZW50cy5qcyIsInNyYy9pbmRleC5qcyIsInNyYy9saWIvcmVuZGVyLWlmLmpzIiwic3JjL21vZGVscy9hcGkuanMiLCJzcmMvbW9kZWxzL2FwcC5qcyIsInNyYy9tb2RlbHMvZ2FtZS5qcyIsInNyYy9wYWdlcy9pbmdhbWUuanMiLCJzcmMvcGFnZXMvd2VsY29tZS5qcyIsInNyYy92aWV3cy9lbm5lbXktaXRlbS5qcyIsInNyYy92aWV3cy9lbm5lbXktbGlzdC5qcyIsInNyYy92aWV3cy9zcGVsbC1pdGVtLmpzIiwic3JjL3ZpZXdzL3NwZWxsLWxpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNJQSxRQUFTLFdBQVcsRUFBSyxFQUFNLEVBQU0sRUFBTSxFQUFNLEdBQy9DLEVBQUksUUFBUSxTQUFVLEdBQ3BCLEVBQUcsRUFBTSxFQUFNLEVBQU0sRUFBTSxLQU4vQixPQUFPLFFBQVU7OztBQ1VqQixRQUFTLFlBQVksR0FrQ25CLFFBQVMsR0FBSyxHQU1SLEVBQU0sZUFBZSxFQUFtQixLQUFLLEVBQU0sZUFDbkQsRUFBTSxTQUFTLEVBQWEsS0FBSyxZQUFZLEVBQU0sVUFDbkQsRUFBTSxVQUFVLEVBQWMsS0FBSyxFQUFNLFVBQ3pDLEVBQU0sbUJBQW1CLEVBQWtCLEtBQUssRUFBTSxtQkFDdEQsRUFBTSxrQkFBa0IsRUFBa0IsS0FBSyxFQUFNLGtCQUNyRCxFQUFNLGNBQWMsRUFBYSxLQUFLLEVBQU0sY0FDNUMsRUFBTSxhQUFhLEVBQVksS0FBSyxFQUFNLGFBS2hELFFBQVMsR0FBVSxHQUVqQixFQUFPLEtBQUssR0FLZCxRQUFTLEdBQVUsR0FDakIsRUFBTyxLQUdQLE1BQU0sR0FBUSxFQUFLLEtBQ25CLEtBQUssRUFBSyxPQUFTLEVBQUssVUFBVyxFQUFPLE1BQU8sT0FBTSxFQUNsRCxLQUFLLEVBQUssTUFBTyxNQUFPLFFBQU8sT0FBTyxNQUFNLEdBR2pELE1BQU0sTUFDQSxJQUlOLEdBQU8sUUFBUSxTQUFVLEdBQ3ZCLEtBQU0sR0FBSyxFQUFNLFNBQ2pCLEdBQVcsS0FBSyxFQUNoQixNQUFNLEdBQWEsRUFBTSxTQUNyQixJQUNGLEVBQVMsR0FBTSxFQUFTLE9BQ3hCLE1BQU0sRUFBSSxFQUFZLEdBQ3RCLEVBQVMsR0FBTSxNQUFNLEVBQVMsR0FBSyxFQUFN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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNpS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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K0VBRWUsU0FBQyxFQUFRLEVBQU0sR0FBZixPQUFBLEVBQUEsT0FBQSxTQUFBLGdCQUVULEVBQU8sT0FBTyxJQUFJLFNBQUEsR0FBQSxPQUFTLEVBQUEsWUFBQSxTQUFVLEVBQU8sRUFBTSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IGFwcGx5SG9va1xuXG4vLyBhcHBseSBhcmd1bWVudHMgb250byBhbiBhcnJheSBvZiBmdW5jdGlvbnMsIHVzZWZ1bCBmb3IgaG9va3Ncbi8vIChhcnIsIGFueT8sIGFueT8sIGFueT8sIGFueT8sIGFueT8pIC0+IG51bGxcbmZ1bmN0aW9uIGFwcGx5SG9vayAoYXJyLCBhcmcxLCBhcmcyLCBhcmczLCBhcmc0LCBhcmc1KSB7XG4gIGFyci5mb3JFYWNoKGZ1bmN0aW9uIChmbikge1xuICAgIGZuKGFyZzEsIGFyZzIsIGFyZzMsIGFyZzQsIGFyZzUpXG4gIH0pXG59XG4iLCJjb25zdCBtdXRhdGUgPSByZXF1aXJlKCd4dGVuZC9tdXRhYmxlJylcbmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpXG5jb25zdCB4dGVuZCA9IHJlcXVpcmUoJ3h0ZW5kJylcblxuY29uc3QgYXBwbHlIb29rID0gcmVxdWlyZSgnLi9hcHBseS1ob29rJylcblxubW9kdWxlLmV4cG9ydHMgPSBkaXNwYXRjaGVyXG5cbi8vIGluaXRpYWxpemUgYSBuZXcgYmFycmFja3MgaW5zdGFuY2Vcbi8vIG9iaiAtPiBvYmpcbmZ1bmN0aW9uIGRpc3BhdGNoZXIgKGhvb2tzKSB7XG4gIGhvb2tzID0gaG9va3MgfHwge31cbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBob29rcywgJ29iamVjdCcsICdiYXJyYWNrczogaG9va3Mgc2hvdWxkIGJlIHVuZGVmaW5lZCBvciBhbiBvYmplY3QnKVxuXG4gIGNvbnN0IG9uU3RhdGVDaGFuZ2VIb29rcyA9IFtdXG4gIGNvbnN0IG9uQWN0aW9uSG9va3MgPSBbXVxuICBjb25zdCBvbkVycm9ySG9va3MgPSBbXVxuXG4gIGNvbnN0IHN1YnNjcmlwdGlvbldyYXBzID0gW11cbiAgY29uc3QgaW5pdGlhbFN0YXRlV3JhcHMgPSBbXVxuICBjb25zdCByZWR1Y2VyV3JhcHMgPSBbXVxuICBjb25zdCBlZmZlY3RXcmFwcyA9IFtdXG5cbiAgdXNlKGhvb2tzKVxuXG4gIHZhciByZWR1Y2Vyc0NhbGxlZCA9IGZhbHNlXG4gIHZhciBlZmZlY3RzQ2FsbGVkID0gZmFsc2VcbiAgdmFyIHN0YXRlQ2FsbGVkID0gZmFsc2VcbiAgdmFyIHN1YnNDYWxsZWQgPSBmYWxzZVxuXG4gIGNvbnN0IHN1YnNjcmlwdGlvbnMgPSBzdGFydC5fc3Vic2NyaXB0aW9ucyA9IHt9XG4gIGNvbnN0IHJlZHVjZXJzID0gc3RhcnQuX3JlZHVjZXJzID0ge31cbiAgY29uc3QgZWZmZWN0cyA9IHN0YXJ0Ll9lZmZlY3RzID0ge31cbiAgY29uc3QgbW9kZWxzID0gc3RhcnQuX21vZGVscyA9IFtdXG4gIHZhciBfc3RhdGUgPSB7fVxuXG4gIHN0YXJ0Lm1vZGVsID0gc2V0TW9kZWxcbiAgc3RhcnQuc3RhdGUgPSBnZXRTdGF0ZVxuICBzdGFydC5zdGFydCA9IHN0YXJ0XG4gIHN0YXJ0LnVzZSA9IHVzZVxuICByZXR1cm4gc3RhcnRcblxuICAvLyBwdXNoIGFuIG9iamVjdCBvZiBob29rcyBvbnRvIGFuIGFycmF5XG4gIC8vIG9iaiAtPiBudWxsXG4gIGZ1bmN0aW9uIHVzZSAoaG9va3MpIHtcbiAgICBhc3NlcnQuZXF1YWwodHlwZW9mIGhvb2tzLCAnb2JqZWN0JywgJ2JhcnJhY2tzLnVzZTogaG9va3Mgc2hvdWxkIGJlIGFuIG9iamVjdCcpXG4gICAgYXNzZXJ0Lm9rKCFob29rcy5vbkVycm9yIHx8IHR5cGVvZiBob29rcy5vbkVycm9yID09PSAnZnVuY3Rpb24nLCAnYmFycmFja3MudXNlOiBvbkVycm9yIHNob3VsZCBiZSB1bmRlZmluZWQgb3IgYSBmdW5jdGlvbicpXG4gICAgYXNzZXJ0Lm9rKCFob29rcy5vbkFjdGlvbiB8fCB0eXBlb2YgaG9va3Mub25BY3Rpb24gPT09ICdmdW5jdGlvbicsICdiYXJyYWNrcy51c2U6IG9uQWN0aW9uIHNob3VsZCBiZSB1bmRlZmluZWQgb3IgYSBmdW5jdGlvbicpXG4gICAgYXNzZXJ0Lm9rKCFob29rcy5vblN0YXRlQ2hhbmdlIHx8IHR5cGVvZiBob29rcy5vblN0YXRlQ2hhbmdlID09PSAnZnVuY3Rpb24nLCAnYmFycmFja3MudXNlOiBvblN0YXRlQ2hhbmdlIHNob3VsZCBiZSB1bmRlZmluZWQgb3IgYSBmdW5jdGlvbicpXG5cbiAgICBpZiAoaG9va3Mub25TdGF0ZUNoYW5nZSkgb25TdGF0ZUNoYW5nZUhvb2tzLnB1c2goaG9va3Mub25TdGF0ZUNoYW5nZSlcbiAgICBpZiAoaG9va3Mub25FcnJvcikgb25FcnJvckhvb2tzLnB1c2god3JhcE9uRXJyb3IoaG9va3Mub25FcnJvcikpXG4gICAgaWYgKGhvb2tzLm9uQWN0aW9uKSBvbkFjdGlvbkhvb2tzLnB1c2goaG9va3Mub25BY3Rpb24pXG4gICAgaWYgKGhvb2tzLndyYXBTdWJzY3JpcHRpb25zKSBzdWJzY3JpcHRpb25XcmFwcy5wdXNoKGhvb2tzLndyYXBTdWJzY3JpcHRpb25zKVxuICAgIGlmIChob29rcy53cmFwSW5pdGlhbFN0YXRlKSBpbml0aWFsU3RhdGVXcmFwcy5wdXNoKGhvb2tzLndyYXBJbml0aWFsU3RhdGUpXG4gICAgaWYgKGhvb2tzLndyYXBSZWR1Y2VycykgcmVkdWNlcldyYXBzLnB1c2goaG9va3Mud3JhcFJlZHVjZXJzKVxuICAgIGlmIChob29rcy53cmFwRWZmZWN0cykgZWZmZWN0V3JhcHMucHVzaChob29rcy53cmFwRWZmZWN0cylcbiAgfVxuXG4gIC8vIHB1c2ggYSBtb2RlbCB0byBiZSBpbml0aWF0ZWRcbiAgLy8gb2JqIC0+IG51bGxcbiAgZnVuY3Rpb24gc2V0TW9kZWwgKG1vZGVsKSB7XG4gICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBtb2RlbCwgJ29iamVjdCcsICdiYXJyYWNrcy5zdG9yZS5tb2RlbDogbW9kZWwgc2hvdWxkIGJlIGFuIG9iamVjdCcpXG4gICAgbW9kZWxzLnB1c2gobW9kZWwpXG4gIH1cblxuICAvLyBnZXQgdGhlIGN1cnJlbnQgc3RhdGUgZnJvbSB0aGUgc3RvcmVcbiAgLy8gb2JqPyAtPiBvYmpcbiAgZnVuY3Rpb24gZ2V0U3RhdGUgKG9wdHMpIHtcbiAgICBvcHRzID0gb3B0cyB8fCB7fVxuICAgIGFzc2VydC5lcXVhbCh0eXBlb2Ygb3B0cywgJ29iamVjdCcsICdiYXJyYWNrcy5zdG9yZS5zdGF0ZTogb3B0cyBzaG91bGQgYmUgYW4gb2JqZWN0JylcblxuICAgIGNvbnN0IHN0YXRlID0gb3B0cy5zdGF0ZVxuICAgIGlmICghb3B0cy5zdGF0ZSAmJiBvcHRzLmZyZWV6ZSA9PT0gZmFsc2UpIHJldHVybiB4dGVuZChfc3RhdGUpXG4gICAgZWxzZSBpZiAoIW9wdHMuc3RhdGUpIHJldHVybiBPYmplY3QuZnJlZXplKHh0ZW5kKF9zdGF0ZSkpXG4gICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBzdGF0ZSwgJ29iamVjdCcsICdiYXJyYWNrcy5zdG9yZS5zdGF0ZTogc3RhdGUgc2hvdWxkIGJlIGFuIG9iamVjdCcpXG5cbiAgICBjb25zdCBuYW1lc3BhY2VzID0gW11cbiAgICBjb25zdCBuZXdTdGF0ZSA9IHt9XG5cbiAgICAvLyBhcHBseSBhbGwgZmllbGRzIGZyb20gdGhlIG1vZGVsLCBhbmQgbmFtZXNwYWNlZCBmaWVsZHMgZnJvbSB0aGUgcGFzc2VkXG4gICAgLy8gaW4gc3RhdGVcbiAgICBtb2RlbHMuZm9yRWFjaChmdW5jdGlvbiAobW9kZWwpIHtcbiAgICAgIGNvbnN0IG5zID0gbW9kZWwubmFtZXNwYWNlXG4gICAgICBuYW1lc3BhY2VzLnB1c2gobnMpXG4gICAgICBjb25zdCBtb2RlbFN0YXRlID0gbW9kZWwuc3RhdGUgfHwge31cbiAgICAgIGlmIChucykge1xuICAgICAgICBuZXdTdGF0ZVtuc10gPSBuZXdTdGF0ZVtuc10gfHwge31cbiAgICAgICAgYXBwbHkobnMsIG1vZGVsU3RhdGUsIG5ld1N0YXRlKVxuICAgICAgICBuZXdTdGF0ZVtuc10gPSB4dGVuZChuZXdTdGF0ZVtuc10sIHN0YXRlW25zXSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG11dGF0ZShuZXdTdGF0ZSwgbW9kZWxTdGF0ZSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gbm93IGFwcGx5IGFsbCBmaWVsZHMgdGhhdCB3ZXJlbid0IG5hbWVzcGFjZWQgZnJvbSB0aGUgcGFzc2VkIGluIHN0YXRlXG4gICAgT2JqZWN0LmtleXMoc3RhdGUpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgaWYgKG5hbWVzcGFjZXMuaW5kZXhPZihrZXkpICE9PSAtMSkgcmV0dXJuXG4gICAgICBuZXdTdGF0ZVtrZXldID0gc3RhdGVba2V5XVxuICAgIH0pXG5cbiAgICBjb25zdCB0bXBTdGF0ZSA9IHh0ZW5kKF9zdGF0ZSwgeHRlbmQoc3RhdGUsIG5ld1N0YXRlKSlcbiAgICBjb25zdCB3cmFwcGVkU3RhdGUgPSB3cmFwSG9vayh0bXBTdGF0ZSwgaW5pdGlhbFN0YXRlV3JhcHMpXG5cbiAgICByZXR1cm4gKG9wdHMuZnJlZXplID09PSBmYWxzZSlcbiAgICAgID8gd3JhcHBlZFN0YXRlXG4gICAgICA6IE9iamVjdC5mcmVlemUod3JhcHBlZFN0YXRlKVxuICB9XG5cbiAgLy8gaW5pdGlhbGl6ZSB0aGUgc3RvcmUgaG9va3MsIGdldCB0aGUgc2VuZCgpIGZ1bmN0aW9uXG4gIC8vIG9iaj8gLT4gZm5cbiAgZnVuY3Rpb24gc3RhcnQgKG9wdHMpIHtcbiAgICBvcHRzID0gb3B0cyB8fCB7fVxuICAgIGFzc2VydC5lcXVhbCh0eXBlb2Ygb3B0cywgJ29iamVjdCcsICdiYXJyYWNrcy5zdG9yZS5zdGFydDogb3B0cyBzaG91bGQgYmUgdW5kZWZpbmVkIG9yIGFuIG9iamVjdCcpXG5cbiAgICAvLyByZWdpc3RlciB2YWx1ZXMgZnJvbSB0aGUgbW9kZWxzXG4gICAgbW9kZWxzLmZvckVhY2goZnVuY3Rpb24gKG1vZGVsKSB7XG4gICAgICBjb25zdCBucyA9IG1vZGVsLm5hbWVzcGFjZVxuICAgICAgaWYgKCFzdGF0ZUNhbGxlZCAmJiBtb2RlbC5zdGF0ZSAmJiBvcHRzLnN0YXRlICE9PSBmYWxzZSkge1xuICAgICAgICBjb25zdCBtb2RlbFN0YXRlID0gbW9kZWwuc3RhdGUgfHwge31cbiAgICAgICAgaWYgKG5zKSB7XG4gICAgICAgICAgX3N0YXRlW25zXSA9IF9zdGF0ZVtuc10gfHwge31cbiAgICAgICAgICBhcHBseShucywgbW9kZWxTdGF0ZSwgX3N0YXRlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG11dGF0ZShfc3RhdGUsIG1vZGVsU3RhdGUpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghcmVkdWNlcnNDYWxsZWQgJiYgbW9kZWwucmVkdWNlcnMgJiYgb3B0cy5yZWR1Y2VycyAhPT0gZmFsc2UpIHtcbiAgICAgICAgYXBwbHkobnMsIG1vZGVsLnJlZHVjZXJzLCByZWR1Y2VycywgZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgcmV0dXJuIHdyYXBIb29rKGNiLCByZWR1Y2VyV3JhcHMpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBpZiAoIWVmZmVjdHNDYWxsZWQgJiYgbW9kZWwuZWZmZWN0cyAmJiBvcHRzLmVmZmVjdHMgIT09IGZhbHNlKSB7XG4gICAgICAgIGFwcGx5KG5zLCBtb2RlbC5lZmZlY3RzLCBlZmZlY3RzLCBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICByZXR1cm4gd3JhcEhvb2soY2IsIGVmZmVjdFdyYXBzKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgaWYgKCFzdWJzQ2FsbGVkICYmIG1vZGVsLnN1YnNjcmlwdGlvbnMgJiYgb3B0cy5zdWJzY3JpcHRpb25zICE9PSBmYWxzZSkge1xuICAgICAgICBhcHBseShucywgbW9kZWwuc3Vic2NyaXB0aW9ucywgc3Vic2NyaXB0aW9ucywgZnVuY3Rpb24gKGNiLCBrZXkpIHtcbiAgICAgICAgICBjb25zdCBzZW5kID0gY3JlYXRlU2VuZCgnc3Vic2NyaXB0aW9uOiAnICsgKG5zID8gbnMgKyAnOicgKyBrZXkgOiBrZXkpKVxuICAgICAgICAgIGNiID0gd3JhcEhvb2soY2IsIHN1YnNjcmlwdGlvbldyYXBzKVxuICAgICAgICAgIGNiKHNlbmQsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGFwcGx5SG9vayhvbkVycm9ySG9va3MsIGVyciwgX3N0YXRlLCBjcmVhdGVTZW5kKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgcmV0dXJuIGNiXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIHRoZSBzdGF0ZSB3cmFwIGlzIHNwZWNpYWwgYmVjYXVzZSB3ZSB3YW50IHRvIG9wZXJhdGUgb24gdGhlIGZ1bGxcbiAgICAvLyBzdGF0ZSByYXRoZXIgdGhhbiBpbmR2aWR1YWwgY2h1bmtzLCBzbyB3ZSBhcHBseSBpdCBvdXRzaWRlIHRoZSBsb29wXG4gICAgaWYgKCFzdGF0ZUNhbGxlZCAmJiBvcHRzLnN0YXRlICE9PSBmYWxzZSkge1xuICAgICAgX3N0YXRlID0gd3JhcEhvb2soX3N0YXRlLCBpbml0aWFsU3RhdGVXcmFwcylcbiAgICB9XG5cbiAgICBpZiAoIW9wdHMubm9TdWJzY3JpcHRpb25zKSBzdWJzQ2FsbGVkID0gdHJ1ZVxuICAgIGlmICghb3B0cy5ub1JlZHVjZXJzKSByZWR1Y2Vyc0NhbGxlZCA9IHRydWVcbiAgICBpZiAoIW9wdHMubm9FZmZlY3RzKSBlZmZlY3RzQ2FsbGVkID0gdHJ1ZVxuICAgIGlmICghb3B0cy5ub1N0YXRlKSBzdGF0ZUNhbGxlZCA9IHRydWVcblxuICAgIGlmICghb25FcnJvckhvb2tzLmxlbmd0aCkgb25FcnJvckhvb2tzLnB1c2god3JhcE9uRXJyb3IoZGVmYXVsdE9uRXJyb3IpKVxuXG4gICAgcmV0dXJuIGNyZWF0ZVNlbmRcblxuICAgIC8vIGNhbGwgYW4gYWN0aW9uIGZyb20gYSB2aWV3XG4gICAgLy8gKHN0ciwgYm9vbD8pIC0+IChzdHIsIGFueT8sIGZuPykgLT4gbnVsbFxuICAgIGZ1bmN0aW9uIGNyZWF0ZVNlbmQgKHNlbGZOYW1lLCBjYWxsT25FcnJvcikge1xuICAgICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBzZWxmTmFtZSwgJ3N0cmluZycsICdiYXJyYWNrcy5zdG9yZS5zdGFydC5jcmVhdGVTZW5kOiBzZWxmTmFtZSBzaG91bGQgYmUgYSBzdHJpbmcnKVxuICAgICAgYXNzZXJ0Lm9rKCFjYWxsT25FcnJvciB8fCB0eXBlb2YgY2FsbE9uRXJyb3IgPT09ICdib29sZWFuJywgJ2JhcnJhY2tzLnN0b3JlLnN0YXJ0LnNlbmQ6IGNhbGxPbkVycm9yIHNob3VsZCBiZSB1bmRlZmluZWQgb3IgYSBib29sZWFuJylcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNlbmQgKG5hbWUsIGRhdGEsIGNiKSB7XG4gICAgICAgIGlmICghY2IgJiYgIWNhbGxPbkVycm9yKSB7XG4gICAgICAgICAgY2IgPSBkYXRhXG4gICAgICAgICAgZGF0YSA9IG51bGxcbiAgICAgICAgfVxuICAgICAgICBkYXRhID0gKHR5cGVvZiBkYXRhID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiBkYXRhKVxuXG4gICAgICAgIGFzc2VydC5lcXVhbCh0eXBlb2YgbmFtZSwgJ3N0cmluZycsICdiYXJyYWNrcy5zdG9yZS5zdGFydC5zZW5kOiBuYW1lIHNob3VsZCBiZSBhIHN0cmluZycpXG4gICAgICAgIGFzc2VydC5vayghY2IgfHwgdHlwZW9mIGNiID09PSAnZnVuY3Rpb24nLCAnYmFycmFja3Muc3RvcmUuc3RhcnQuc2VuZDogY2Igc2hvdWxkIGJlIGEgZnVuY3Rpb24nKVxuXG4gICAgICAgIGNvbnN0IGRvbmUgPSBjYWxsT25FcnJvciA/IG9uRXJyb3JDYWxsYmFjayA6IGNiXG4gICAgICAgIF9zZW5kKG5hbWUsIGRhdGEsIHNlbGZOYW1lLCBkb25lKVxuXG4gICAgICAgIGZ1bmN0aW9uIG9uRXJyb3JDYWxsYmFjayAoZXJyKSB7XG4gICAgICAgICAgZXJyID0gZXJyIHx8IG51bGxcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICBhcHBseUhvb2sob25FcnJvckhvb2tzLCBlcnIsIF9zdGF0ZSwgZnVuY3Rpb24gY3JlYXRlU2VuZCAoc2VsZk5hbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNlbmQgKG5hbWUsIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBhc3NlcnQuZXF1YWwodHlwZW9mIG5hbWUsICdzdHJpbmcnLCAnYmFycmFja3Muc3RvcmUuc3RhcnQuc2VuZDogbmFtZSBzaG91bGQgYmUgYSBzdHJpbmcnKVxuICAgICAgICAgICAgICAgIGRhdGEgPSAodHlwZW9mIGRhdGEgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IGRhdGEpXG4gICAgICAgICAgICAgICAgX3NlbmQobmFtZSwgZGF0YSwgc2VsZk5hbWUsIGRvbmUpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gY2FsbCBhbiBhY3Rpb25cbiAgICAvLyAoc3RyLCBzdHIsIGFueSwgZm4pIC0+IG51bGxcbiAgICBmdW5jdGlvbiBfc2VuZCAobmFtZSwgZGF0YSwgY2FsbGVyLCBjYikge1xuICAgICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBuYW1lLCAnc3RyaW5nJywgJ2JhcnJhY2tzLl9zZW5kOiBuYW1lIHNob3VsZCBiZSBhIHN0cmluZycpXG4gICAgICBhc3NlcnQuZXF1YWwodHlwZW9mIGNhbGxlciwgJ3N0cmluZycsICdiYXJyYWNrcy5fc2VuZDogY2FsbGVyIHNob3VsZCBiZSBhIHN0cmluZycpXG4gICAgICBhc3NlcnQuZXF1YWwodHlwZW9mIGNiLCAnZnVuY3Rpb24nLCAnYmFycmFja3MuX3NlbmQ6IGNiIHNob3VsZCBiZSBhIGZ1bmN0aW9uJylcblxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByZWR1Y2Vyc0NhbGxlZCA9IGZhbHNlXG4gICAgICAgIHZhciBlZmZlY3RzQ2FsbGVkID0gZmFsc2VcbiAgICAgICAgY29uc3QgbmV3U3RhdGUgPSB4dGVuZChfc3RhdGUpXG5cbiAgICAgICAgaWYgKG9uQWN0aW9uSG9va3MubGVuZ3RoKSB7XG4gICAgICAgICAgYXBwbHlIb29rKG9uQWN0aW9uSG9va3MsIGRhdGEsIF9zdGF0ZSwgbmFtZSwgY2FsbGVyLCBjcmVhdGVTZW5kKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdmFsaWRhdGUgaWYgYSBuYW1lc3BhY2UgZXhpc3RzLiBOYW1lc3BhY2VzIGFyZSBkZWxpbWl0ZWQgYnkgJzonLlxuICAgICAgICB2YXIgYWN0aW9uTmFtZSA9IG5hbWVcbiAgICAgICAgaWYgKC86Ly50ZXN0KG5hbWUpKSB7XG4gICAgICAgICAgY29uc3QgYXJyID0gbmFtZS5zcGxpdCgnOicpXG4gICAgICAgICAgdmFyIG5zID0gYXJyLnNoaWZ0KClcbiAgICAgICAgICBhY3Rpb25OYW1lID0gYXJyLmpvaW4oJzonKVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgX3JlZHVjZXJzID0gbnMgPyByZWR1Y2Vyc1tuc10gOiByZWR1Y2Vyc1xuICAgICAgICBpZiAoX3JlZHVjZXJzICYmIF9yZWR1Y2Vyc1thY3Rpb25OYW1lXSkge1xuICAgICAgICAgIGlmIChucykge1xuICAgICAgICAgICAgY29uc3QgcmVkdWNlZFN0YXRlID0gX3JlZHVjZXJzW2FjdGlvbk5hbWVdKGRhdGEsIF9zdGF0ZVtuc10pXG4gICAgICAgICAgICBuZXdTdGF0ZVtuc10gPSB4dGVuZChfc3RhdGVbbnNdLCByZWR1Y2VkU3RhdGUpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG11dGF0ZShuZXdTdGF0ZSwgcmVkdWNlcnNbYWN0aW9uTmFtZV0oZGF0YSwgX3N0YXRlKSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVkdWNlcnNDYWxsZWQgPSB0cnVlXG4gICAgICAgICAgaWYgKG9uU3RhdGVDaGFuZ2VIb29rcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGFwcGx5SG9vayhvblN0YXRlQ2hhbmdlSG9va3MsIGRhdGEsIG5ld1N0YXRlLCBfc3RhdGUsIGFjdGlvbk5hbWUsIGNyZWF0ZVNlbmQpXG4gICAgICAgICAgfVxuICAgICAgICAgIF9zdGF0ZSA9IG5ld1N0YXRlXG4gICAgICAgICAgY2IobnVsbCwgbmV3U3RhdGUpXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBfZWZmZWN0cyA9IG5zID8gZWZmZWN0c1tuc10gOiBlZmZlY3RzXG4gICAgICAgIGlmICghcmVkdWNlcnNDYWxsZWQgJiYgX2VmZmVjdHMgJiYgX2VmZmVjdHNbYWN0aW9uTmFtZV0pIHtcbiAgICAgICAgICBjb25zdCBzZW5kID0gY3JlYXRlU2VuZCgnZWZmZWN0OiAnICsgbmFtZSlcbiAgICAgICAgICBpZiAobnMpIF9lZmZlY3RzW2FjdGlvbk5hbWVdKGRhdGEsIF9zdGF0ZVtuc10sIHNlbmQsIGNiKVxuICAgICAgICAgIGVsc2UgX2VmZmVjdHNbYWN0aW9uTmFtZV0oZGF0YSwgX3N0YXRlLCBzZW5kLCBjYilcbiAgICAgICAgICBlZmZlY3RzQ2FsbGVkID0gdHJ1ZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFyZWR1Y2Vyc0NhbGxlZCAmJiAhZWZmZWN0c0NhbGxlZCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgYWN0aW9uICcgKyBhY3Rpb25OYW1lKVxuICAgICAgICB9XG4gICAgICB9LCAwKVxuICAgIH1cbiAgfVxufVxuXG4vLyBjb21wb3NlIGFuIG9iamVjdCBjb25kaXRpb25hbGx5XG4vLyBvcHRpb25hbGx5IGNvbnRhaW5zIGEgbmFtZXNwYWNlXG4vLyB3aGljaCBpcyB1c2VkIHRvIG5lc3QgcHJvcGVydGllcy5cbi8vIChzdHIsIG9iaiwgb2JqLCBmbj8pIC0+IG51bGxcbmZ1bmN0aW9uIGFwcGx5IChucywgc291cmNlLCB0YXJnZXQsIHdyYXApIHtcbiAgaWYgKG5zICYmICF0YXJnZXRbbnNdKSB0YXJnZXRbbnNdID0ge31cbiAgT2JqZWN0LmtleXMoc291cmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICBjb25zdCBjYiA9IHdyYXAgPyB3cmFwKHNvdXJjZVtrZXldLCBrZXkpIDogc291cmNlW2tleV1cbiAgICBpZiAobnMpIHRhcmdldFtuc11ba2V5XSA9IGNiXG4gICAgZWxzZSB0YXJnZXRba2V5XSA9IGNiXG4gIH0pXG59XG5cbi8vIGhhbmRsZSBlcnJvcnMgYWxsIHRoZSB3YXkgYXQgdGhlIHRvcCBvZiB0aGUgdHJhY2Vcbi8vIGVycj8gLT4gbnVsbFxuZnVuY3Rpb24gZGVmYXVsdE9uRXJyb3IgKGVycikge1xuICB0aHJvdyBlcnJcbn1cblxuZnVuY3Rpb24gd3JhcE9uRXJyb3IgKG9uRXJyb3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIG9uRXJyb3JXcmFwIChlcnIsIHN0YXRlLCBjcmVhdGVTZW5kKSB7XG4gICAgaWYgKGVycikgb25FcnJvcihlcnIsIHN0YXRlLCBjcmVhdGVTZW5kKVxuICB9XG59XG5cbi8vIHRha2UgYSBhcHBseSBhbiBhcnJheSBvZiB0cmFuc2Zvcm1zIG9udG8gYSB2YWx1ZS4gVGhlIG5ldyB2YWx1ZVxuLy8gbXVzdCBiZSByZXR1cm5lZCBzeW5jaHJvbm91c2x5IGZyb20gdGhlIHRyYW5zZm9ybVxuLy8gKGFueSwgW2ZuXSkgLT4gYW55XG5mdW5jdGlvbiB3cmFwSG9vayAodmFsdWUsIHRyYW5zZm9ybXMpIHtcbiAgdHJhbnNmb3Jtcy5mb3JFYWNoKGZ1bmN0aW9uICh0cmFuc2Zvcm0pIHtcbiAgICB2YWx1ZSA9IHRyYW5zZm9ybSh2YWx1ZSlcbiAgfSlcbiAgcmV0dXJuIHZhbHVlXG59XG4iLCJ2YXIgZG9jdW1lbnQgPSByZXF1aXJlKCdnbG9iYWwvZG9jdW1lbnQnKVxyXG52YXIgaHlwZXJ4ID0gcmVxdWlyZSgnaHlwZXJ4JylcclxudmFyIG9ubG9hZCA9IHJlcXVpcmUoJ29uLWxvYWQnKVxyXG5cclxudmFyIFNWR05TID0gJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJ1xyXG52YXIgWExJTktOUyA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJ1xyXG5cclxudmFyIEJPT0xfUFJPUFMgPSB7XHJcbiAgYXV0b2ZvY3VzOiAxLFxyXG4gIGNoZWNrZWQ6IDEsXHJcbiAgZGVmYXVsdGNoZWNrZWQ6IDEsXHJcbiAgZGlzYWJsZWQ6IDEsXHJcbiAgZm9ybW5vdmFsaWRhdGU6IDEsXHJcbiAgaW5kZXRlcm1pbmF0ZTogMSxcclxuICByZWFkb25seTogMSxcclxuICByZXF1aXJlZDogMSxcclxuICBzZWxlY3RlZDogMSxcclxuICB3aWxsdmFsaWRhdGU6IDFcclxufVxyXG52YXIgU1ZHX1RBR1MgPSBbXHJcbiAgJ3N2ZycsXHJcbiAgJ2FsdEdseXBoJywgJ2FsdEdseXBoRGVmJywgJ2FsdEdseXBoSXRlbScsICdhbmltYXRlJywgJ2FuaW1hdGVDb2xvcicsXHJcbiAgJ2FuaW1hdGVNb3Rpb24nLCAnYW5pbWF0ZVRyYW5zZm9ybScsICdjaXJjbGUnLCAnY2xpcFBhdGgnLCAnY29sb3ItcHJvZmlsZScsXHJcbiAgJ2N1cnNvcicsICdkZWZzJywgJ2Rlc2MnLCAnZWxsaXBzZScsICdmZUJsZW5kJywgJ2ZlQ29sb3JNYXRyaXgnLFxyXG4gICdmZUNvbXBvbmVudFRyYW5zZmVyJywgJ2ZlQ29tcG9zaXRlJywgJ2ZlQ29udm9sdmVNYXRyaXgnLCAnZmVEaWZmdXNlTGlnaHRpbmcnLFxyXG4gICdmZURpc3BsYWNlbWVudE1hcCcsICdmZURpc3RhbnRMaWdodCcsICdmZUZsb29kJywgJ2ZlRnVuY0EnLCAnZmVGdW5jQicsXHJcbiAgJ2ZlRnVuY0cnLCAnZmVGdW5jUicsICdmZUdhdXNzaWFuQmx1cicsICdmZUltYWdlJywgJ2ZlTWVyZ2UnLCAnZmVNZXJnZU5vZGUnLFxyXG4gICdmZU1vcnBob2xvZ3knLCAnZmVPZmZzZXQnLCAnZmVQb2ludExpZ2h0JywgJ2ZlU3BlY3VsYXJMaWdodGluZycsXHJcbiAgJ2ZlU3BvdExpZ2h0JywgJ2ZlVGlsZScsICdmZVR1cmJ1bGVuY2UnLCAnZmlsdGVyJywgJ2ZvbnQnLCAnZm9udC1mYWNlJyxcclxuICAnZm9udC1mYWNlLWZvcm1hdCcsICdmb250LWZhY2UtbmFtZScsICdmb250LWZhY2Utc3JjJywgJ2ZvbnQtZmFjZS11cmknLFxyXG4gICdmb3JlaWduT2JqZWN0JywgJ2cnLCAnZ2x5cGgnLCAnZ2x5cGhSZWYnLCAnaGtlcm4nLCAnaW1hZ2UnLCAnbGluZScsXHJcbiAgJ2xpbmVhckdyYWRpZW50JywgJ21hcmtlcicsICdtYXNrJywgJ21ldGFkYXRhJywgJ21pc3NpbmctZ2x5cGgnLCAnbXBhdGgnLFxyXG4gICdwYXRoJywgJ3BhdHRlcm4nLCAncG9seWdvbicsICdwb2x5bGluZScsICdyYWRpYWxHcmFkaWVudCcsICdyZWN0JyxcclxuICAnc2V0JywgJ3N0b3AnLCAnc3dpdGNoJywgJ3N5bWJvbCcsICd0ZXh0JywgJ3RleHRQYXRoJywgJ3RpdGxlJywgJ3RyZWYnLFxyXG4gICd0c3BhbicsICd1c2UnLCAndmlldycsICd2a2VybidcclxuXVxyXG5cclxuZnVuY3Rpb24gYmVsQ3JlYXRlRWxlbWVudCAodGFnLCBwcm9wcywgY2hpbGRyZW4pIHtcclxuICB2YXIgZWxcclxuXHJcbiAgLy8gSWYgYW4gc3ZnIHRhZywgaXQgbmVlZHMgYSBuYW1lc3BhY2VcclxuICBpZiAoU1ZHX1RBR1MuaW5kZXhPZih0YWcpICE9PSAtMSkge1xyXG4gICAgcHJvcHMubmFtZXNwYWNlID0gU1ZHTlNcclxuICB9XHJcblxyXG4gIC8vIElmIHdlIGFyZSB1c2luZyBhIG5hbWVzcGFjZVxyXG4gIHZhciBucyA9IGZhbHNlXHJcbiAgaWYgKHByb3BzLm5hbWVzcGFjZSkge1xyXG4gICAgbnMgPSBwcm9wcy5uYW1lc3BhY2VcclxuICAgIGRlbGV0ZSBwcm9wcy5uYW1lc3BhY2VcclxuICB9XHJcblxyXG4gIC8vIENyZWF0ZSB0aGUgZWxlbWVudFxyXG4gIGlmIChucykge1xyXG4gICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMobnMsIHRhZylcclxuICB9IGVsc2Uge1xyXG4gICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZylcclxuICB9XHJcblxyXG4gIC8vIElmIGFkZGluZyBvbmxvYWQgZXZlbnRzXHJcbiAgaWYgKHByb3BzLm9ubG9hZCB8fCBwcm9wcy5vbnVubG9hZCkge1xyXG4gICAgdmFyIGxvYWQgPSBwcm9wcy5vbmxvYWQgfHwgZnVuY3Rpb24gKCkge31cclxuICAgIHZhciB1bmxvYWQgPSBwcm9wcy5vbnVubG9hZCB8fCBmdW5jdGlvbiAoKSB7fVxyXG4gICAgb25sb2FkKGVsLCBmdW5jdGlvbiBiZWxPbmxvYWQgKCkge1xyXG4gICAgICBsb2FkKGVsKVxyXG4gICAgfSwgZnVuY3Rpb24gYmVsT251bmxvYWQgKCkge1xyXG4gICAgICB1bmxvYWQoZWwpXHJcbiAgICB9LFxyXG4gICAgLy8gV2UgaGF2ZSB0byB1c2Ugbm9uLXN0YW5kYXJkIGBjYWxsZXJgIHRvIGZpbmQgd2hvIGludm9rZXMgYGJlbENyZWF0ZUVsZW1lbnRgXHJcbiAgICBiZWxDcmVhdGVFbGVtZW50LmNhbGxlci5jYWxsZXIuY2FsbGVyKVxyXG4gICAgZGVsZXRlIHByb3BzLm9ubG9hZFxyXG4gICAgZGVsZXRlIHByb3BzLm9udW5sb2FkXHJcbiAgfVxyXG5cclxuICAvLyBDcmVhdGUgdGhlIHByb3BlcnRpZXNcclxuICBmb3IgKHZhciBwIGluIHByb3BzKSB7XHJcbiAgICBpZiAocHJvcHMuaGFzT3duUHJvcGVydHkocCkpIHtcclxuICAgICAgdmFyIGtleSA9IHAudG9Mb3dlckNhc2UoKVxyXG4gICAgICB2YXIgdmFsID0gcHJvcHNbcF1cclxuICAgICAgLy8gTm9ybWFsaXplIGNsYXNzTmFtZVxyXG4gICAgICBpZiAoa2V5ID09PSAnY2xhc3NuYW1lJykge1xyXG4gICAgICAgIGtleSA9ICdjbGFzcydcclxuICAgICAgICBwID0gJ2NsYXNzJ1xyXG4gICAgICB9XHJcbiAgICAgIC8vIFRoZSBmb3IgYXR0cmlidXRlIGdldHMgdHJhbnNmb3JtZWQgdG8gaHRtbEZvciwgYnV0IHdlIGp1c3Qgc2V0IGFzIGZvclxyXG4gICAgICBpZiAocCA9PT0gJ2h0bWxGb3InKSB7XHJcbiAgICAgICAgcCA9ICdmb3InXHJcbiAgICAgIH1cclxuICAgICAgLy8gSWYgYSBwcm9wZXJ0eSBpcyBib29sZWFuLCBzZXQgaXRzZWxmIHRvIHRoZSBrZXlcclxuICAgICAgaWYgKEJPT0xfUFJPUFNba2V5XSkge1xyXG4gICAgICAgIGlmICh2YWwgPT09ICd0cnVlJykgdmFsID0ga2V5XHJcbiAgICAgICAgZWxzZSBpZiAodmFsID09PSAnZmFsc2UnKSBjb250aW51ZVxyXG4gICAgICB9XHJcbiAgICAgIC8vIElmIGEgcHJvcGVydHkgcHJlZmVycyBiZWluZyBzZXQgZGlyZWN0bHkgdnMgc2V0QXR0cmlidXRlXHJcbiAgICAgIGlmIChrZXkuc2xpY2UoMCwgMikgPT09ICdvbicpIHtcclxuICAgICAgICBlbFtwXSA9IHZhbFxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChucykge1xyXG4gICAgICAgICAgaWYgKHAgPT09ICd4bGluazpocmVmJykge1xyXG4gICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGVOUyhYTElOS05TLCBwLCB2YWwpXHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGVOUyhudWxsLCBwLCB2YWwpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShwLCB2YWwpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBmdW5jdGlvbiBhcHBlbmRDaGlsZCAoY2hpbGRzKSB7XHJcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoY2hpbGRzKSkgcmV0dXJuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICB2YXIgbm9kZSA9IGNoaWxkc1tpXVxyXG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShub2RlKSkge1xyXG4gICAgICAgIGFwcGVuZENoaWxkKG5vZGUpXHJcbiAgICAgICAgY29udGludWVcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHR5cGVvZiBub2RlID09PSAnbnVtYmVyJyB8fFxyXG4gICAgICAgIHR5cGVvZiBub2RlID09PSAnYm9vbGVhbicgfHxcclxuICAgICAgICBub2RlIGluc3RhbmNlb2YgRGF0ZSB8fFxyXG4gICAgICAgIG5vZGUgaW5zdGFuY2VvZiBSZWdFeHApIHtcclxuICAgICAgICBub2RlID0gbm9kZS50b1N0cmluZygpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICBpZiAoZWwubGFzdENoaWxkICYmIGVsLmxhc3RDaGlsZC5ub2RlTmFtZSA9PT0gJyN0ZXh0Jykge1xyXG4gICAgICAgICAgZWwubGFzdENoaWxkLm5vZGVWYWx1ZSArPSBub2RlXHJcbiAgICAgICAgICBjb250aW51ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBub2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobm9kZSlcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKG5vZGUgJiYgbm9kZS5ub2RlVHlwZSkge1xyXG4gICAgICAgIGVsLmFwcGVuZENoaWxkKG5vZGUpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgYXBwZW5kQ2hpbGQoY2hpbGRyZW4pXHJcblxyXG4gIHJldHVybiBlbFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGh5cGVyeChiZWxDcmVhdGVFbGVtZW50KVxyXG5tb2R1bGUuZXhwb3J0cy5jcmVhdGVFbGVtZW50ID0gYmVsQ3JlYXRlRWxlbWVudFxyXG4iLCJcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltVnRjSFI1TG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJaUxDSm1hV3hsSWpvaWIzVjBMbXB6TG0xaGNDSjkiLCJjb25zdCBkZWVwRGlmZiA9IHJlcXVpcmUoJ2RlZXAtZGlmZicpXG5jb25zdCBwYWRSaWdodCA9IHJlcXVpcmUoJ3BhZC1yaWdodCcpXG5jb25zdCBwYWRMZWZ0ID0gcmVxdWlyZSgncGFkLWxlZnQnKVxuY29uc3QgYnJvd3NlciA9IHJlcXVpcmUoJ2RldGVjdC1icm93c2VyJylcblxubW9kdWxlLmV4cG9ydHMgPSBjaG9vTG9nXG5cbi8vIGNvbG9ycyBmcm9tIGh0dHA6Ly9jbHJzLmNjL1xuY29uc3QgY29sb3JzID0ge1xuICBncmVlbjogJyMyRUNDNDAnLFxuICByZWQ6ICcjRkY0MTM2JyxcbiAgYmx1ZTogJyM3RkRCRkYnLFxuICBsaWdodEdyYXk6ICcjREREREREJyxcbiAgZ3JheTogJyNBQUFBQUEnLFxuICB5ZWxsb3c6ICcjRkZEQzAwJyxcbiAgZGVmYXVsdDogJyMyOTMwMzcnXG59XG5cbmNvbnN0IHBhZGRpbmdzID0ge1xuICB0eXBlOiA3LFxuICBhY3Rpb25UeXBlOiA3XG59XG5cbi8vIERldmVsb3BtZW50IGxvZ2dlciBmb3IgY2hvb1xuLy8gbnVsbCAtPiBvYmpcbmZ1bmN0aW9uIGNob29Mb2cgKCkge1xuICBjb25zdCBzdGFydFRpbWUgPSBEYXRlLm5vdygpXG5cbiAgcmV0dXJuIHtcbiAgICBvbkFjdGlvbjogb25BY3Rpb24sXG4gICAgb25FcnJvcjogb25FcnJvcixcbiAgICBvblN0YXRlQ2hhbmdlOiBvblN0YXRlQ2hhbmdlXG4gIH1cblxuICAvLyBoYW5kbGUgb25BY3Rpb24oKSBjYWxsc1xuICAvLyAob2JqLCBvYmosIHN0ciwgc3RyLCBmbikgLT4gbnVsbFxuICBmdW5jdGlvbiBvbkFjdGlvbiAoZGF0YSwgc3RhdGUsIG5hbWUsIHRyYWNlLCBjcmVhdGVTZW5kKSB7XG4gICAgY29uc3Qgc3BsaXQgPSB0cmFjZS5zcGxpdCgnOicpXG4gICAgY29uc3QgYWN0aW9uVHlwZSA9IHNwbGl0WzBdLnRyaW0oKVxuICAgIGNvbnN0IGNhbGxlciA9IHNwbGl0WzFdLnRyaW0oKVxuXG4gICAgY29uc3QgbGluZSA9IFtdXG4gICAgY29sb3JpZnkoJ2xpZ2h0R3JheScsIHJlbmRlclRpbWUoc3RhcnRUaW1lKSArICcgJywgbGluZSlcbiAgICBjb2xvcmlmeSgnZ3JheScsIHJlbmRlclR5cGUoJ2FjdGlvbicpICsgJyAnLCBsaW5lKVxuICAgIGNvbG9yaWZ5KCdncmF5JywgcmVuZGVyQWN0aW9uVHlwZShhY3Rpb25UeXBlKSArICcgJywgbGluZSlcblxuICAgIGNvbG9yaWZ5KCdkZWZhdWx0JywgXCInXCIgKyBjYWxsZXIgKyBcIidcIiwgbGluZSlcbiAgICBjb2xvcmlmeSgnZGVmYXVsdCcsICctPicsIGxpbmUpXG4gICAgY29sb3JpZnkoJ2RlZmF1bHQnLCBcIidcIiArIG5hbWUgKyBcIidcIiwgbGluZSlcblxuICAgIGlmIChncm91cENvbGxhcHNlU3VwcG9ydGVkKCkpIHtcbiAgICAgIGxvZ0dyb3VwKGxpbmUpXG4gICAgICBsb2dJbm5lcihuYW1lLCBkYXRhKVxuICAgICAgY29uc29sZS5ncm91cEVuZCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZyhsaW5lKVxuICAgICAgbG9nSW5uZXIobmFtZSwgZGF0YSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2dJbm5lciAobmFtZSwgYWN0aW9uKSB7XG4gICAgICBjb25zb2xlLmxvZygnYWN0aW9uIG5hbWU6JywgbmFtZSlcbiAgICAgIGNvbnNvbGUubG9nKCdkYXRhOicsIGRhdGEpXG4gICAgfVxuICB9XG5cbiAgLy8gaGFuZGxlIG9uRXJyb3IoKSBjYWxsc1xuICAvLyAoc3RyLCBvYmosIGZuKSAtPiBudWxsXG4gIGZ1bmN0aW9uIG9uRXJyb3IgKGVyciwgc3RhdGUsIGNyZWF0ZVNlbmQpIHtcbiAgICBjb25zdCBsaW5lID0gW11cbiAgICBjb2xvcmlmeSgnbGlnaHRHcmF5JywgcmVuZGVyVGltZShzdGFydFRpbWUpICsgJyAnLCBsaW5lKVxuICAgIGNvbG9yaWZ5KCdyZWQnLCByZW5kZXJUeXBlKCdlcnJvcicpICsgJyAnLCBsaW5lKVxuICAgIGNvbG9yaWZ5KCdkZWZhdWx0JywgZXJyLm1lc3NhZ2UgKyAnICcsIGxpbmUpXG5cbiAgICBpZiAoZ3JvdXBDb2xsYXBzZVN1cHBvcnRlZCgpKSB7XG4gICAgICBsb2dHcm91cChsaW5lKVxuICAgICAgbG9nSW5uZXIoZXJyKVxuICAgICAgY29uc29sZS5ncm91cEVuZCgpXG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZyhsaW5lKVxuICAgICAgbG9nSW5uZXIoZXJyKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvZ0lubmVyIChlcnIpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKVxuICAgIH1cbiAgfVxuXG4gIC8vIGhhbmRsZSBvblN0YXRlQ2hhbmdlKCkgY2FsbHNcbiAgLy8gKG9iaiwgb2JqLCBvYmosIGZuKSAtPiBudWxsXG4gIGZ1bmN0aW9uIG9uU3RhdGVDaGFuZ2UgKGRhdGEsIHN0YXRlLCBwcmV2LCBjcmVhdGVTZW5kKSB7XG4gICAgY29uc3QgZGlmZiA9IGRlZXBEaWZmKHByZXYsIHN0YXRlKSB8fCBbXVxuICAgIC8vIHdhcm4gaWYgdGhlcmUgaXMgbm8gZGlmZlxuICAgIGNvbnN0IGhhc1dhcm4gPSBkaWZmLmxlbmd0aCA9PT0gMFxuICAgIGNvbnN0IGlubGluZVRleHQgPSAoZnVuY3Rpb24gKGRpZmYpIHtcbiAgICAgIGlmIChoYXNXYXJuKSB7XG4gICAgICAgIHJldHVybiAnbm8gZGlmZidcbiAgICAgIH0gZWxzZSBpZiAoZGlmZi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuICdkaWZmJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuICdkaWZmcydcbiAgICAgIH1cbiAgICB9KShkaWZmKVxuXG4gICAgY29uc3QgbGluZSA9IFtdXG4gICAgY29sb3JpZnkoJ2xpZ2h0R3JheScsIHJlbmRlclRpbWUoc3RhcnRUaW1lKSArICcgJywgbGluZSlcbiAgICBjb2xvcmlmeShoYXNXYXJuID8gJ3llbGxvdycgOiAnZ3JheScsIHJlbmRlclR5cGUoJ3N0YXRlJykgKyAnICcsIGxpbmUpXG4gICAgY29sb3JpZnkoJ2RlZmF1bHQnLCAoaGFzV2FybiA/ICcnIDogZGlmZi5sZW5ndGggKyAnICcpICsgaW5saW5lVGV4dCwgbGluZSlcblxuICAgIGlmIChncm91cENvbGxhcHNlU3VwcG9ydGVkKCkpIHtcbiAgICAgIGxvZ0dyb3VwKGxpbmUpXG4gICAgICBsb2dJbm5lcihwcmV2LCBzdGF0ZSlcbiAgICAgIGNvbnNvbGUuZ3JvdXBFbmQoKVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2cobGluZSlcbiAgICAgIGxvZ0lubmVyKHByZXYsIHN0YXRlKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvZ0lubmVyIChwcmV2LCBzdGF0ZSkge1xuICAgICAgY29uc29sZS5sb2coJ3ByZXYgJywgcHJldilcbiAgICAgIGNvbnNvbGUubG9nKCdzdGF0ZScsIHN0YXRlKVxuICAgICAgaWYgKGhhc1dhcm4pIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdkaWZmICcsICdUaGVyZSBpcyBubyBkaWZmZXJlbmNlIGJldHdlZW4gc3RhdGVzJylcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdkaWZmICcsIGRpZmYpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vIGNyZWF0ZSBhIGNvbGxhcHNlZEdyb3VwIGxvZyBmcm9tIGFuIGFycmF5XG4vLyBzdHIgLT4gW3N0ciwgc3RyXVxuZnVuY3Rpb24gbG9nR3JvdXAgKGxpbmUpIHtcbiAgY29uc29sZS5ncm91cENvbGxhcHNlZC5hcHBseShjb25zb2xlLCBsaW5lKVxufVxuXG4vLyBjcmVhdGUgYSBjb25zb2xlIGxvZyBmcm9tIGFuIGFycmF5XG4vLyBzdHIgLT4gW3N0ciwgc3RyXVxuZnVuY3Rpb24gbG9nIChsaW5lKSB7XG4gIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIGxpbmUpXG59XG5cbi8vIGluZGVudCBtZXNzYWdlIHR5cGVzXG4vLyBzdHIgLT4gc3RyXG5mdW5jdGlvbiByZW5kZXJUeXBlIChtc2cpIHtcbiAgY29uc3QgbGVmdFBhZCA9IHBhZGRpbmdzLnR5cGVcbiAgY29uc3QgcmlnaHRQYWQgPSBwYWRkaW5ncy5hY3Rpb25UeXBlICsgbGVmdFBhZCArIDJcbiAgcmV0dXJuIChtc2cgPT09ICdzdGF0ZScgfHwgbXNnID09PSAnZXJyb3InKVxuICAgID8gcGFkUmlnaHQocGFkTGVmdChtc2csIGxlZnRQYWQsICcgJyksIHJpZ2h0UGFkLCAnICcpXG4gICAgOiBwYWRMZWZ0KG1zZywgbGVmdFBhZCwgJyAnKVxufVxuXG4vLyBpbmRlbnQgYWN0aW9uIHR5cGVzXG4vLyBzdHIgLT4gc3RyXG5mdW5jdGlvbiByZW5kZXJBY3Rpb25UeXBlIChtc2cpIHtcbiAgY29uc3QgcGFkZGluZyA9IHBhZGRpbmdzLmFjdGlvblR5cGVcbiAgaWYgKG1zZyA9PT0gJ3N1YnNjcmlwdGlvbicpIG1zZyA9ICdzdWJzJ1xuICByZXR1cm4gcGFkUmlnaHQobXNnLCBwYWRkaW5nLCAnICcpXG59XG5cbi8vIHRvSHRtbCArIGNoYWxrXG4vLyAoc3RyLCBzdHIsIFtzdHIsIC4uLnN0cl0pIC0+IFtzdHIsIHN0cl1cbmZ1bmN0aW9uIGNvbG9yaWZ5IChjb2xvciwgbGluZSwgcHJldikge1xuICB2YXIgbmV3TGluZSA9ICclYycgKyBsaW5lXG4gIHZhciBuZXdTdHlsZSA9ICdjb2xvcjogJyArIGNvbG9yc1tjb2xvcl0gKyAnOydcblxuICBpZiAoIXByZXYpIHtcbiAgICBwcmV2ID0gWyBuZXdMaW5lLCBuZXdTdHlsZSBdXG4gICAgcmV0dXJuIHByZXZcbiAgfVxuXG4gIGlmICghcHJldlswXSkgcHJldlswXSA9ICcnXG4gIHByZXZbMF0gKz0gJyAnICsgbmV3TGluZVxuXG4gIGlmICghcHJldlsxXSkgcHJldlsxXSA9ICcnXG4gIGlmIChicm93c2VyLm5hbWUgPT09ICdmaXJlZm94Jykge1xuICAgIHByZXZbMV0gKz0gJyAnICsgbmV3U3R5bGVcbiAgfSBlbHNlIHtcbiAgICBwcmV2LnB1c2gobmV3U3R5bGUpXG4gIH1cbiAgcmV0dXJuIHByZXZcbn1cblxuLy8gcmVuZGVyIHRoZSB0aW1lXG4vLyBudW0gLT4gbnVsbFxuZnVuY3Rpb24gcmVuZGVyVGltZSAoc3RhcnRUaW1lKSB7XG4gIHZhciBvZmZzZXQgPSBTdHJpbmcoTWF0aC5yb3VuZCgoRGF0ZS5ub3coKSAtIHN0YXJ0VGltZSkgLyAxMDAwKSAlIDEwMDAwKVxuICB2YXIgbXNnID0gJ1snICsgcGFkTGVmdChvZmZzZXQsIDQsICcwJykgKyAnXSdcbiAgcmV0dXJuIG1zZ1xufVxuXG5mdW5jdGlvbiBncm91cENvbGxhcHNlU3VwcG9ydGVkICgpIHtcbiAgcmV0dXJuIGNvbnNvbGUuZ3JvdXBDb2xsYXBzZWQgJiYgYnJvd3Nlci5uYW1lICE9PSAnZmlyZWZveCdcbn1cblxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCd5by15bycpXG4iLCJjb25zdCBoaXN0b3J5ID0gcmVxdWlyZSgnc2hlZXQtcm91dGVyL2hpc3RvcnknKVxuY29uc3Qgc2hlZXRSb3V0ZXIgPSByZXF1aXJlKCdzaGVldC1yb3V0ZXInKVxuY29uc3QgZG9jdW1lbnQgPSByZXF1aXJlKCdnbG9iYWwvZG9jdW1lbnQnKVxuY29uc3Qgb25SZWFkeSA9IHJlcXVpcmUoJ2RvY3VtZW50LXJlYWR5JylcbmNvbnN0IGhyZWYgPSByZXF1aXJlKCdzaGVldC1yb3V0ZXIvaHJlZicpXG5jb25zdCBoYXNoID0gcmVxdWlyZSgnc2hlZXQtcm91dGVyL2hhc2gnKVxuY29uc3QgaGFzaE1hdGNoID0gcmVxdWlyZSgnaGFzaC1tYXRjaCcpXG5jb25zdCBiYXJyYWNrcyA9IHJlcXVpcmUoJ2JhcnJhY2tzJylcbmNvbnN0IG5hbm9yYWYgPSByZXF1aXJlKCduYW5vcmFmJylcbmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpXG5jb25zdCB4dGVuZCA9IHJlcXVpcmUoJ3h0ZW5kJylcbmNvbnN0IHlvID0gcmVxdWlyZSgneW8teW8nKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNob29cblxuLy8gZnJhbWV3b3JrIGZvciBjcmVhdGluZyBzdHVyZHkgd2ViIGFwcGxpY2F0aW9uc1xuLy8gbnVsbCAtPiBmblxuZnVuY3Rpb24gY2hvbyAob3B0cykge1xuICBvcHRzID0gb3B0cyB8fCB7fVxuXG4gIGNvbnN0IF9zdG9yZSA9IHN0YXJ0Ll9zdG9yZSA9IGJhcnJhY2tzKClcbiAgdmFyIF9yb3V0ZXIgPSBzdGFydC5fcm91dGVyID0gbnVsbFxuICB2YXIgX2RlZmF1bHRSb3V0ZSA9IG51bGxcbiAgdmFyIF9yb290Tm9kZSA9IG51bGxcbiAgdmFyIF9yb3V0ZXMgPSBudWxsXG4gIHZhciBfZnJhbWUgPSBudWxsXG5cbiAgX3N0b3JlLnVzZSh7IG9uU3RhdGVDaGFuZ2U6IHJlbmRlciB9KVxuICBfc3RvcmUudXNlKG9wdHMpXG5cbiAgc3RhcnQudG9TdHJpbmcgPSB0b1N0cmluZ1xuICBzdGFydC5yb3V0ZXIgPSByb3V0ZXJcbiAgc3RhcnQubW9kZWwgPSBtb2RlbFxuICBzdGFydC5zdGFydCA9IHN0YXJ0XG4gIHN0YXJ0LnVzZSA9IHVzZVxuXG4gIHJldHVybiBzdGFydFxuXG4gIC8vIHJlbmRlciB0aGUgYXBwbGljYXRpb24gdG8gYSBzdHJpbmdcbiAgLy8gKHN0ciwgb2JqKSAtPiBzdHJcbiAgZnVuY3Rpb24gdG9TdHJpbmcgKHJvdXRlLCBzZXJ2ZXJTdGF0ZSkge1xuICAgIHNlcnZlclN0YXRlID0gc2VydmVyU3RhdGUgfHwge31cbiAgICBhc3NlcnQuZXF1YWwodHlwZW9mIHJvdXRlLCAnc3RyaW5nJywgJ2Nob28uYXBwLnRvU3RyaW5nOiByb3V0ZSBtdXN0IGJlIGEgc3RyaW5nJylcbiAgICBhc3NlcnQuZXF1YWwodHlwZW9mIHNlcnZlclN0YXRlLCAnb2JqZWN0JywgJ2Nob28uYXBwLnRvU3RyaW5nOiBzZXJ2ZXJTdGF0ZSBtdXN0IGJlIGFuIG9iamVjdCcpXG4gICAgX3N0b3JlLnN0YXJ0KHsgc3Vic2NyaXB0aW9uczogZmFsc2UsIHJlZHVjZXJzOiBmYWxzZSwgZWZmZWN0czogZmFsc2UgfSlcblxuICAgIGNvbnN0IHN0YXRlID0gX3N0b3JlLnN0YXRlKHsgc3RhdGU6IHNlcnZlclN0YXRlIH0pXG4gICAgY29uc3Qgcm91dGVyID0gY3JlYXRlUm91dGVyKF9kZWZhdWx0Um91dGUsIF9yb3V0ZXMsIGNyZWF0ZVNlbmQpXG4gICAgY29uc3QgdHJlZSA9IHJvdXRlcihyb3V0ZSwgc3RhdGUpXG4gICAgcmV0dXJuIHRyZWUub3V0ZXJIVE1MIHx8IHRyZWUudG9TdHJpbmcoKVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlU2VuZCAoKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gc2VuZCAoKSB7XG4gICAgICAgIGFzc2VydC5vayhmYWxzZSwgJ2Nob286IHNlbmQoKSBjYW5ub3QgYmUgY2FsbGVkIGZyb20gTm9kZScpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gc3RhcnQgdGhlIGFwcGxpY2F0aW9uXG4gIC8vIChzdHI/LCBvYmo/KSAtPiBET01Ob2RlXG4gIGZ1bmN0aW9uIHN0YXJ0IChzZWxlY3Rvciwgc3RhcnRPcHRzKSB7XG4gICAgaWYgKCFzdGFydE9wdHMgJiYgdHlwZW9mIHNlbGVjdG9yICE9PSAnc3RyaW5nJykge1xuICAgICAgc3RhcnRPcHRzID0gc2VsZWN0b3JcbiAgICAgIHNlbGVjdG9yID0gbnVsbFxuICAgIH1cbiAgICBzdGFydE9wdHMgPSBzdGFydE9wdHMgfHwge31cblxuICAgIF9zdG9yZS5tb2RlbChhcHBJbml0KHN0YXJ0T3B0cykpXG4gICAgY29uc3QgY3JlYXRlU2VuZCA9IF9zdG9yZS5zdGFydChzdGFydE9wdHMpXG4gICAgX3JvdXRlciA9IHN0YXJ0Ll9yb3V0ZXIgPSBjcmVhdGVSb3V0ZXIoX2RlZmF1bHRSb3V0ZSwgX3JvdXRlcywgY3JlYXRlU2VuZClcbiAgICBjb25zdCBzdGF0ZSA9IF9zdG9yZS5zdGF0ZSh7c3RhdGU6IHt9fSlcblxuICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgIGNvbnN0IHRyZWUgPSBfcm91dGVyKHN0YXRlLmxvY2F0aW9uLnBhdGhuYW1lLCBzdGF0ZSlcbiAgICAgIF9yb290Tm9kZSA9IHRyZWVcbiAgICAgIHJldHVybiB0cmVlXG4gICAgfSBlbHNlIHtcbiAgICAgIG9uUmVhZHkoZnVuY3Rpb24gb25SZWFkeSAoKSB7XG4gICAgICAgIGNvbnN0IG9sZFRyZWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxuICAgICAgICBhc3NlcnQub2sob2xkVHJlZSwgJ2NvdWxkIG5vdCBxdWVyeSBzZWxlY3RvcjogJyArIHNlbGVjdG9yKVxuICAgICAgICBjb25zdCBuZXdUcmVlID0gX3JvdXRlcihzdGF0ZS5sb2NhdGlvbi5wYXRobmFtZSwgc3RhdGUpXG4gICAgICAgIF9yb290Tm9kZSA9IHlvLnVwZGF0ZShvbGRUcmVlLCBuZXdUcmVlKVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICAvLyB1cGRhdGUgdGhlIERPTSBhZnRlciBldmVyeSBzdGF0ZSBtdXRhdGlvblxuICAvLyAob2JqLCBvYmosIG9iaiwgc3RyLCBmbikgLT4gbnVsbFxuICBmdW5jdGlvbiByZW5kZXIgKGRhdGEsIHN0YXRlLCBwcmV2LCBuYW1lLCBjcmVhdGVTZW5kKSB7XG4gICAgaWYgKCFfZnJhbWUpIHtcbiAgICAgIF9mcmFtZSA9IG5hbm9yYWYoZnVuY3Rpb24gKHN0YXRlLCBwcmV2KSB7XG4gICAgICAgIGNvbnN0IG5ld1RyZWUgPSBfcm91dGVyKHN0YXRlLmxvY2F0aW9uLnBhdGhuYW1lLCBzdGF0ZSwgcHJldilcbiAgICAgICAgX3Jvb3ROb2RlID0geW8udXBkYXRlKF9yb290Tm9kZSwgbmV3VHJlZSlcbiAgICAgIH0pXG4gICAgfVxuICAgIF9mcmFtZShzdGF0ZSwgcHJldilcbiAgfVxuXG4gIC8vIHJlZ2lzdGVyIGFsbCByb3V0ZXMgb24gdGhlIHJvdXRlclxuICAvLyAoc3RyPywgW2ZufFtmbl1dKSAtPiBvYmpcbiAgZnVuY3Rpb24gcm91dGVyIChkZWZhdWx0Um91dGUsIHJvdXRlcykge1xuICAgIF9kZWZhdWx0Um91dGUgPSBkZWZhdWx0Um91dGVcbiAgICBfcm91dGVzID0gcm91dGVzXG4gIH1cblxuICAvLyBjcmVhdGUgYSBuZXcgbW9kZWxcbiAgLy8gKHN0cj8sIG9iaikgLT4gbnVsbFxuICBmdW5jdGlvbiBtb2RlbCAobW9kZWwpIHtcbiAgICBfc3RvcmUubW9kZWwobW9kZWwpXG4gIH1cblxuICAvLyByZWdpc3RlciBhIHBsdWdpblxuICAvLyAob2JqKSAtPiBudWxsXG4gIGZ1bmN0aW9uIHVzZSAoaG9va3MpIHtcbiAgICBhc3NlcnQuZXF1YWwodHlwZW9mIGhvb2tzLCAnb2JqZWN0JywgJ2Nob28udXNlOiBob29rcyBzaG91bGQgYmUgYW4gb2JqZWN0JylcbiAgICBfc3RvcmUudXNlKGhvb2tzKVxuICB9XG5cbiAgLy8gY3JlYXRlIGEgbmV3IHJvdXRlciB3aXRoIGEgY3VzdG9tIGBjcmVhdGVSb3V0ZSgpYCBmdW5jdGlvblxuICAvLyAoc3RyPywgb2JqLCBmbj8pIC0+IG51bGxcbiAgZnVuY3Rpb24gY3JlYXRlUm91dGVyIChkZWZhdWx0Um91dGUsIHJvdXRlcywgY3JlYXRlU2VuZCkge1xuICAgIHZhciBwcmV2ID0geyBwYXJhbXM6IHt9IH1cbiAgICByZXR1cm4gc2hlZXRSb3V0ZXIoZGVmYXVsdFJvdXRlLCByb3V0ZXMsIGNyZWF0ZVJvdXRlKVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlUm91dGUgKHJvdXRlRm4pIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAocm91dGUsIGlubGluZSwgY2hpbGQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpbmxpbmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBpbmxpbmUgPSB3cmFwKGlubGluZSwgcm91dGUpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJvdXRlRm4ocm91dGUsIGlubGluZSwgY2hpbGQpXG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHdyYXAgKGNoaWxkLCByb3V0ZSkge1xuICAgICAgICBjb25zdCBzZW5kID0gY3JlYXRlU2VuZCgndmlldzogJyArIHJvdXRlLCB0cnVlKVxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gY2hvb1dyYXAgKHBhcmFtcywgc3RhdGUpIHtcbiAgICAgICAgICBjb25zdCBud1ByZXYgPSBwcmV2XG4gICAgICAgICAgY29uc3QgbndTdGF0ZSA9IHByZXYgPSB4dGVuZChzdGF0ZSwgeyBwYXJhbXM6IHBhcmFtcyB9KVxuICAgICAgICAgIGlmIChvcHRzLmZyZWV6ZSAhPT0gZmFsc2UpIE9iamVjdC5mcmVlemUobndTdGF0ZSlcbiAgICAgICAgICByZXR1cm4gY2hpbGQobndTdGF0ZSwgbndQcmV2LCBzZW5kKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vIGluaXRpYWwgYXBwbGljYXRpb24gc3RhdGUgbW9kZWxcbi8vIG9iaiAtPiBvYmpcbmZ1bmN0aW9uIGFwcEluaXQgKG9wdHMpIHtcbiAgY29uc3QgbG9jID0gZG9jdW1lbnQubG9jYXRpb25cbiAgY29uc3Qgc3RhdGUgPSB7IHBhdGhuYW1lOiAob3B0cy5oYXNoKSA/IGhhc2hNYXRjaChsb2MuaGFzaCkgOiBsb2MuaHJlZiB9XG4gIGNvbnN0IHJlZHVjZXJzID0ge1xuICAgIHNldExvY2F0aW9uOiBmdW5jdGlvbiBzZXRMb2NhdGlvbiAoZGF0YSwgc3RhdGUpIHtcbiAgICAgIHJldHVybiB7IHBhdGhuYW1lOiBkYXRhLmxvY2F0aW9uLnJlcGxhY2UoLyMuKi8sICcnKSB9XG4gICAgfVxuICB9XG4gIC8vIGlmIGhhc2ggcm91dGluZyBleHBsaWNpdGx5IGVuYWJsZWQsIHN1YnNjcmliZSB0byBpdFxuICBjb25zdCBzdWJzID0ge31cbiAgaWYgKG9wdHMuaGFzaCA9PT0gdHJ1ZSkge1xuICAgIHB1c2hMb2NhdGlvblN1YihmdW5jdGlvbiAobmF2aWdhdGUpIHtcbiAgICAgIGhhc2goZnVuY3Rpb24gKGZyYWdtZW50KSB7XG4gICAgICAgIG5hdmlnYXRlKGhhc2hNYXRjaChmcmFnbWVudCkpXG4gICAgICB9KVxuICAgIH0sICdoYW5kbGVIYXNoJywgc3VicylcbiAgfSBlbHNlIHtcbiAgICBpZiAob3B0cy5oaXN0b3J5ICE9PSBmYWxzZSkgcHVzaExvY2F0aW9uU3ViKGhpc3RvcnksICdoYW5kbGVIaXN0b3J5Jywgc3VicylcbiAgICBpZiAob3B0cy5ocmVmICE9PSBmYWxzZSkgcHVzaExvY2F0aW9uU3ViKGhyZWYsICdoYW5kbGVIcmVmJywgc3VicylcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbmFtZXNwYWNlOiAnbG9jYXRpb24nLFxuICAgIHN1YnNjcmlwdGlvbnM6IHN1YnMsXG4gICAgcmVkdWNlcnM6IHJlZHVjZXJzLFxuICAgIHN0YXRlOiBzdGF0ZVxuICB9XG5cbiAgLy8gY3JlYXRlIGEgbmV3IHN1YnNjcmlwdGlvbiB0aGF0IG1vZGlmaWVzXG4gIC8vICdhcHA6bG9jYXRpb24nIGFuZCBwdXNoIGl0IHRvIGJlIGxvYWRlZFxuICAvLyAoZm4sIG9iaikgLT4gbnVsbFxuICBmdW5jdGlvbiBwdXNoTG9jYXRpb25TdWIgKGNiLCBrZXksIG1vZGVsKSB7XG4gICAgbW9kZWxba2V5XSA9IGZ1bmN0aW9uIChzZW5kLCBkb25lKSB7XG4gICAgICBjYihmdW5jdGlvbiBuYXZpZ2F0ZSAocGF0aG5hbWUpIHtcbiAgICAgICAgc2VuZCgnbG9jYXRpb246c2V0TG9jYXRpb24nLCB7IGxvY2F0aW9uOiBwYXRobmFtZSB9LCBkb25lKVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cbiIsIi8qIVxuICBDb3B5cmlnaHQgKGMpIDIwMTYgSmVkIFdhdHNvbi5cbiAgTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIChNSVQpLCBzZWVcbiAgaHR0cDovL2plZHdhdHNvbi5naXRodWIuaW8vY2xhc3NuYW1lc1xuKi9cbi8qIGdsb2JhbCBkZWZpbmUgKi9cblxuKGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBoYXNPd24gPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxuXHRmdW5jdGlvbiBjbGFzc05hbWVzICgpIHtcblx0XHR2YXIgY2xhc3NlcyA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBhcmcgPSBhcmd1bWVudHNbaV07XG5cdFx0XHRpZiAoIWFyZykgY29udGludWU7XG5cblx0XHRcdHZhciBhcmdUeXBlID0gdHlwZW9mIGFyZztcblxuXHRcdFx0aWYgKGFyZ1R5cGUgPT09ICdzdHJpbmcnIHx8IGFyZ1R5cGUgPT09ICdudW1iZXInKSB7XG5cdFx0XHRcdGNsYXNzZXMucHVzaChhcmcpO1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFyZykpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGNsYXNzTmFtZXMuYXBwbHkobnVsbCwgYXJnKSk7XG5cdFx0XHR9IGVsc2UgaWYgKGFyZ1R5cGUgPT09ICdvYmplY3QnKSB7XG5cdFx0XHRcdGZvciAodmFyIGtleSBpbiBhcmcpIHtcblx0XHRcdFx0XHRpZiAoaGFzT3duLmNhbGwoYXJnLCBrZXkpICYmIGFyZ1trZXldKSB7XG5cdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goa2V5KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gY2xhc3Nlcy5qb2luKCcgJyk7XG5cdH1cblxuXHRpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGNsYXNzTmFtZXM7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZGVmaW5lLmFtZCA9PT0gJ29iamVjdCcgJiYgZGVmaW5lLmFtZCkge1xuXHRcdC8vIHJlZ2lzdGVyIGFzICdjbGFzc25hbWVzJywgY29uc2lzdGVudCB3aXRoIG5wbSBwYWNrYWdlIG5hbWVcblx0XHRkZWZpbmUoJ2NsYXNzbmFtZXMnLCBbXSwgZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIGNsYXNzTmFtZXM7XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LmNsYXNzTmFtZXMgPSBjbGFzc05hbWVzO1xuXHR9XG59KCkpO1xuIiwidmFyIG1hdGNoZXMgPSByZXF1aXJlKCdtYXRjaGVzLXNlbGVjdG9yJylcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGVsZW1lbnQsIHNlbGVjdG9yLCBjaGVja1lvU2VsZikge1xyXG4gIHZhciBwYXJlbnQgPSBjaGVja1lvU2VsZiA/IGVsZW1lbnQgOiBlbGVtZW50LnBhcmVudE5vZGVcclxuXHJcbiAgd2hpbGUgKHBhcmVudCAmJiBwYXJlbnQgIT09IGRvY3VtZW50KSB7XHJcbiAgICBpZiAobWF0Y2hlcyhwYXJlbnQsIHNlbGVjdG9yKSkgcmV0dXJuIHBhcmVudDtcclxuICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnROb2RlXHJcbiAgfVxyXG59XHJcbiIsIi8qIVxuICogZGVlcC1kaWZmLlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG47KGZ1bmN0aW9uKHJvb3QsIGZhY3RvcnkpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgIGRlZmluZShbXSwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZmFjdG9yeSgpO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIC8vIE5vZGUuIERvZXMgbm90IHdvcmsgd2l0aCBzdHJpY3QgQ29tbW9uSlMsIGJ1dFxuICAgIC8vIG9ubHkgQ29tbW9uSlMtbGlrZSBlbnZpcm9ubWVudHMgdGhhdCBzdXBwb3J0IG1vZHVsZS5leHBvcnRzLFxuICAgIC8vIGxpa2UgTm9kZS5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBCcm93c2VyIGdsb2JhbHMgKHJvb3QgaXMgd2luZG93KVxuICAgIHJvb3QuRGVlcERpZmYgPSBmYWN0b3J5KCk7XG4gIH1cbn0odGhpcywgZnVuY3Rpb24odW5kZWZpbmVkKSB7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgJHNjb3BlLCBjb25mbGljdCwgY29uZmxpY3RSZXNvbHV0aW9uID0gW107XG4gIGlmICh0eXBlb2YgZ2xvYmFsID09PSAnb2JqZWN0JyAmJiBnbG9iYWwpIHtcbiAgICAkc2NvcGUgPSBnbG9iYWw7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAkc2NvcGUgPSB3aW5kb3c7XG4gIH0gZWxzZSB7XG4gICAgJHNjb3BlID0ge307XG4gIH1cbiAgY29uZmxpY3QgPSAkc2NvcGUuRGVlcERpZmY7XG4gIGlmIChjb25mbGljdCkge1xuICAgIGNvbmZsaWN0UmVzb2x1dGlvbi5wdXNoKFxuICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgndW5kZWZpbmVkJyAhPT0gdHlwZW9mIGNvbmZsaWN0ICYmICRzY29wZS5EZWVwRGlmZiA9PT0gYWNjdW11bGF0ZURpZmYpIHtcbiAgICAgICAgICAkc2NvcGUuRGVlcERpZmYgPSBjb25mbGljdDtcbiAgICAgICAgICBjb25mbGljdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICAvLyBub2RlanMgY29tcGF0aWJsZSBvbiBzZXJ2ZXIgc2lkZSBhbmQgaW4gdGhlIGJyb3dzZXIuXG4gIGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yO1xuICAgIGN0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckN0b3IucHJvdG90eXBlLCB7XG4gICAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgICB2YWx1ZTogY3RvcixcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIERpZmYoa2luZCwgcGF0aCkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAna2luZCcsIHtcbiAgICAgIHZhbHVlOiBraW5kLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIGlmIChwYXRoICYmIHBhdGgubGVuZ3RoKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3BhdGgnLCB7XG4gICAgICAgIHZhbHVlOiBwYXRoLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBEaWZmRWRpdChwYXRoLCBvcmlnaW4sIHZhbHVlKSB7XG4gICAgRGlmZkVkaXQuc3VwZXJfLmNhbGwodGhpcywgJ0UnLCBwYXRoKTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2xocycsIHtcbiAgICAgIHZhbHVlOiBvcmlnaW4sXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdyaHMnLCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH1cbiAgaW5oZXJpdHMoRGlmZkVkaXQsIERpZmYpO1xuXG4gIGZ1bmN0aW9uIERpZmZOZXcocGF0aCwgdmFsdWUpIHtcbiAgICBEaWZmTmV3LnN1cGVyXy5jYWxsKHRoaXMsICdOJywgcGF0aCk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdyaHMnLCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH1cbiAgaW5oZXJpdHMoRGlmZk5ldywgRGlmZik7XG5cbiAgZnVuY3Rpb24gRGlmZkRlbGV0ZWQocGF0aCwgdmFsdWUpIHtcbiAgICBEaWZmRGVsZXRlZC5zdXBlcl8uY2FsbCh0aGlzLCAnRCcsIHBhdGgpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbGhzJywge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9XG4gIGluaGVyaXRzKERpZmZEZWxldGVkLCBEaWZmKTtcblxuICBmdW5jdGlvbiBEaWZmQXJyYXkocGF0aCwgaW5kZXgsIGl0ZW0pIHtcbiAgICBEaWZmQXJyYXkuc3VwZXJfLmNhbGwodGhpcywgJ0EnLCBwYXRoKTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2luZGV4Jywge1xuICAgICAgdmFsdWU6IGluZGV4LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAnaXRlbScsIHtcbiAgICAgIHZhbHVlOiBpdGVtLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9XG4gIGluaGVyaXRzKERpZmZBcnJheSwgRGlmZik7XG5cbiAgZnVuY3Rpb24gYXJyYXlSZW1vdmUoYXJyLCBmcm9tLCB0bykge1xuICAgIHZhciByZXN0ID0gYXJyLnNsaWNlKCh0byB8fCBmcm9tKSArIDEgfHwgYXJyLmxlbmd0aCk7XG4gICAgYXJyLmxlbmd0aCA9IGZyb20gPCAwID8gYXJyLmxlbmd0aCArIGZyb20gOiBmcm9tO1xuICAgIGFyci5wdXNoLmFwcGx5KGFyciwgcmVzdCk7XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWxUeXBlT2Yoc3ViamVjdCkge1xuICAgIHZhciB0eXBlID0gdHlwZW9mIHN1YmplY3Q7XG4gICAgaWYgKHR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG5cbiAgICBpZiAoc3ViamVjdCA9PT0gTWF0aCkge1xuICAgICAgcmV0dXJuICdtYXRoJztcbiAgICB9IGVsc2UgaWYgKHN1YmplY3QgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiAnbnVsbCc7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHN1YmplY3QpKSB7XG4gICAgICByZXR1cm4gJ2FycmF5JztcbiAgICB9IGVsc2UgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChzdWJqZWN0KSA9PT0gJ1tvYmplY3QgRGF0ZV0nKSB7XG4gICAgICByZXR1cm4gJ2RhdGUnO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHN1YmplY3QudG9TdHJpbmcgIT09ICd1bmRlZmluZWQnICYmIC9eXFwvLipcXC8vLnRlc3Qoc3ViamVjdC50b1N0cmluZygpKSkge1xuICAgICAgcmV0dXJuICdyZWdleHAnO1xuICAgIH1cbiAgICByZXR1cm4gJ29iamVjdCc7XG4gIH1cblxuICBmdW5jdGlvbiBkZWVwRGlmZihsaHMsIHJocywgY2hhbmdlcywgcHJlZmlsdGVyLCBwYXRoLCBrZXksIHN0YWNrKSB7XG4gICAgcGF0aCA9IHBhdGggfHwgW107XG4gICAgdmFyIGN1cnJlbnRQYXRoID0gcGF0aC5zbGljZSgwKTtcbiAgICBpZiAodHlwZW9mIGtleSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGlmIChwcmVmaWx0ZXIpIHtcbiAgICAgICAgaWYgKHR5cGVvZihwcmVmaWx0ZXIpID09PSAnZnVuY3Rpb24nICYmIHByZWZpbHRlcihjdXJyZW50UGF0aCwga2V5KSkgeyByZXR1cm47IH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mKHByZWZpbHRlcikgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgaWYgKHByZWZpbHRlci5wcmVmaWx0ZXIgJiYgcHJlZmlsdGVyLnByZWZpbHRlcihjdXJyZW50UGF0aCwga2V5KSkgeyByZXR1cm47IH1cbiAgICAgICAgICBpZiAocHJlZmlsdGVyLm5vcm1hbGl6ZSkge1xuICAgICAgICAgICAgdmFyIGFsdCA9IHByZWZpbHRlci5ub3JtYWxpemUoY3VycmVudFBhdGgsIGtleSwgbGhzLCByaHMpO1xuICAgICAgICAgICAgaWYgKGFsdCkge1xuICAgICAgICAgICAgICBsaHMgPSBhbHRbMF07XG4gICAgICAgICAgICAgIHJocyA9IGFsdFsxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGN1cnJlbnRQYXRoLnB1c2goa2V5KTtcbiAgICB9XG5cbiAgICAvLyBVc2Ugc3RyaW5nIGNvbXBhcmlzb24gZm9yIHJlZ2V4ZXNcbiAgICBpZiAocmVhbFR5cGVPZihsaHMpID09PSAncmVnZXhwJyAmJiByZWFsVHlwZU9mKHJocykgPT09ICdyZWdleHAnKSB7XG4gICAgICBsaHMgPSBsaHMudG9TdHJpbmcoKTtcbiAgICAgIHJocyA9IHJocy50b1N0cmluZygpO1xuICAgIH1cblxuICAgIHZhciBsdHlwZSA9IHR5cGVvZiBsaHM7XG4gICAgdmFyIHJ0eXBlID0gdHlwZW9mIHJocztcbiAgICBpZiAobHR5cGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBpZiAocnR5cGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNoYW5nZXMobmV3IERpZmZOZXcoY3VycmVudFBhdGgsIHJocykpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocnR5cGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjaGFuZ2VzKG5ldyBEaWZmRGVsZXRlZChjdXJyZW50UGF0aCwgbGhzKSk7XG4gICAgfSBlbHNlIGlmIChyZWFsVHlwZU9mKGxocykgIT09IHJlYWxUeXBlT2YocmhzKSkge1xuICAgICAgY2hhbmdlcyhuZXcgRGlmZkVkaXQoY3VycmVudFBhdGgsIGxocywgcmhzKSk7XG4gICAgfSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobGhzKSA9PT0gJ1tvYmplY3QgRGF0ZV0nICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChyaHMpID09PSAnW29iamVjdCBEYXRlXScgJiYgKChsaHMgLSByaHMpICE9PSAwKSkge1xuICAgICAgY2hhbmdlcyhuZXcgRGlmZkVkaXQoY3VycmVudFBhdGgsIGxocywgcmhzKSk7XG4gICAgfSBlbHNlIGlmIChsdHlwZSA9PT0gJ29iamVjdCcgJiYgbGhzICE9PSBudWxsICYmIHJocyAhPT0gbnVsbCkge1xuICAgICAgc3RhY2sgPSBzdGFjayB8fCBbXTtcbiAgICAgIGlmIChzdGFjay5pbmRleE9mKGxocykgPCAwKSB7XG4gICAgICAgIHN0YWNrLnB1c2gobGhzKTtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkobGhzKSkge1xuICAgICAgICAgIHZhciBpLCBsZW4gPSBsaHMubGVuZ3RoO1xuICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsaHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChpID49IHJocy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgY2hhbmdlcyhuZXcgRGlmZkFycmF5KGN1cnJlbnRQYXRoLCBpLCBuZXcgRGlmZkRlbGV0ZWQodW5kZWZpbmVkLCBsaHNbaV0pKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkZWVwRGlmZihsaHNbaV0sIHJoc1tpXSwgY2hhbmdlcywgcHJlZmlsdGVyLCBjdXJyZW50UGF0aCwgaSwgc3RhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB3aGlsZSAoaSA8IHJocy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNoYW5nZXMobmV3IERpZmZBcnJheShjdXJyZW50UGF0aCwgaSwgbmV3IERpZmZOZXcodW5kZWZpbmVkLCByaHNbaSsrXSkpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIGFrZXlzID0gT2JqZWN0LmtleXMobGhzKTtcbiAgICAgICAgICB2YXIgcGtleXMgPSBPYmplY3Qua2V5cyhyaHMpO1xuICAgICAgICAgIGFrZXlzLmZvckVhY2goZnVuY3Rpb24oaywgaSkge1xuICAgICAgICAgICAgdmFyIG90aGVyID0gcGtleXMuaW5kZXhPZihrKTtcbiAgICAgICAgICAgIGlmIChvdGhlciA+PSAwKSB7XG4gICAgICAgICAgICAgIGRlZXBEaWZmKGxoc1trXSwgcmhzW2tdLCBjaGFuZ2VzLCBwcmVmaWx0ZXIsIGN1cnJlbnRQYXRoLCBrLCBzdGFjayk7XG4gICAgICAgICAgICAgIHBrZXlzID0gYXJyYXlSZW1vdmUocGtleXMsIG90aGVyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGRlZXBEaWZmKGxoc1trXSwgdW5kZWZpbmVkLCBjaGFuZ2VzLCBwcmVmaWx0ZXIsIGN1cnJlbnRQYXRoLCBrLCBzdGFjayk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcGtleXMuZm9yRWFjaChmdW5jdGlvbihrKSB7XG4gICAgICAgICAgICBkZWVwRGlmZih1bmRlZmluZWQsIHJoc1trXSwgY2hhbmdlcywgcHJlZmlsdGVyLCBjdXJyZW50UGF0aCwgaywgc3RhY2spO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHN0YWNrLmxlbmd0aCA9IHN0YWNrLmxlbmd0aCAtIDE7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChsaHMgIT09IHJocykge1xuICAgICAgaWYgKCEobHR5cGUgPT09ICdudW1iZXInICYmIGlzTmFOKGxocykgJiYgaXNOYU4ocmhzKSkpIHtcbiAgICAgICAgY2hhbmdlcyhuZXcgRGlmZkVkaXQoY3VycmVudFBhdGgsIGxocywgcmhzKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWNjdW11bGF0ZURpZmYobGhzLCByaHMsIHByZWZpbHRlciwgYWNjdW0pIHtcbiAgICBhY2N1bSA9IGFjY3VtIHx8IFtdO1xuICAgIGRlZXBEaWZmKGxocywgcmhzLFxuICAgICAgZnVuY3Rpb24oZGlmZikge1xuICAgICAgICBpZiAoZGlmZikge1xuICAgICAgICAgIGFjY3VtLnB1c2goZGlmZik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwcmVmaWx0ZXIpO1xuICAgIHJldHVybiAoYWNjdW0ubGVuZ3RoKSA/IGFjY3VtIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgZnVuY3Rpb24gYXBwbHlBcnJheUNoYW5nZShhcnIsIGluZGV4LCBjaGFuZ2UpIHtcbiAgICBpZiAoY2hhbmdlLnBhdGggJiYgY2hhbmdlLnBhdGgubGVuZ3RoKSB7XG4gICAgICB2YXIgaXQgPSBhcnJbaW5kZXhdLFxuICAgICAgICAgIGksIHUgPSBjaGFuZ2UucGF0aC5sZW5ndGggLSAxO1xuICAgICAgZm9yIChpID0gMDsgaSA8IHU7IGkrKykge1xuICAgICAgICBpdCA9IGl0W2NoYW5nZS5wYXRoW2ldXTtcbiAgICAgIH1cbiAgICAgIHN3aXRjaCAoY2hhbmdlLmtpbmQpIHtcbiAgICAgICAgY2FzZSAnQSc6XG4gICAgICAgICAgYXBwbHlBcnJheUNoYW5nZShpdFtjaGFuZ2UucGF0aFtpXV0sIGNoYW5nZS5pbmRleCwgY2hhbmdlLml0ZW0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdEJzpcbiAgICAgICAgICBkZWxldGUgaXRbY2hhbmdlLnBhdGhbaV1dO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdFJzpcbiAgICAgICAgY2FzZSAnTic6XG4gICAgICAgICAgaXRbY2hhbmdlLnBhdGhbaV1dID0gY2hhbmdlLnJocztcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3dpdGNoIChjaGFuZ2Uua2luZCkge1xuICAgICAgICBjYXNlICdBJzpcbiAgICAgICAgICBhcHBseUFycmF5Q2hhbmdlKGFycltpbmRleF0sIGNoYW5nZS5pbmRleCwgY2hhbmdlLml0ZW0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdEJzpcbiAgICAgICAgICBhcnIgPSBhcnJheVJlbW92ZShhcnIsIGluZGV4KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRSc6XG4gICAgICAgIGNhc2UgJ04nOlxuICAgICAgICAgIGFycltpbmRleF0gPSBjaGFuZ2UucmhzO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgZnVuY3Rpb24gYXBwbHlDaGFuZ2UodGFyZ2V0LCBzb3VyY2UsIGNoYW5nZSkge1xuICAgIGlmICh0YXJnZXQgJiYgc291cmNlICYmIGNoYW5nZSAmJiBjaGFuZ2Uua2luZCkge1xuICAgICAgdmFyIGl0ID0gdGFyZ2V0LFxuICAgICAgICAgIGkgPSAtMSxcbiAgICAgICAgICBsYXN0ID0gY2hhbmdlLnBhdGggPyBjaGFuZ2UucGF0aC5sZW5ndGggLSAxIDogMDtcbiAgICAgIHdoaWxlICgrK2kgPCBsYXN0KSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRbY2hhbmdlLnBhdGhbaV1dID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGl0W2NoYW5nZS5wYXRoW2ldXSA9ICh0eXBlb2YgY2hhbmdlLnBhdGhbaV0gPT09ICdudW1iZXInKSA/IFtdIDoge307XG4gICAgICAgIH1cbiAgICAgICAgaXQgPSBpdFtjaGFuZ2UucGF0aFtpXV07XG4gICAgICB9XG4gICAgICBzd2l0Y2ggKGNoYW5nZS5raW5kKSB7XG4gICAgICAgIGNhc2UgJ0EnOlxuICAgICAgICAgIGFwcGx5QXJyYXlDaGFuZ2UoY2hhbmdlLnBhdGggPyBpdFtjaGFuZ2UucGF0aFtpXV0gOiBpdCwgY2hhbmdlLmluZGV4LCBjaGFuZ2UuaXRlbSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0QnOlxuICAgICAgICAgIGRlbGV0ZSBpdFtjaGFuZ2UucGF0aFtpXV07XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0UnOlxuICAgICAgICBjYXNlICdOJzpcbiAgICAgICAgICBpdFtjaGFuZ2UucGF0aFtpXV0gPSBjaGFuZ2UucmhzO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJldmVydEFycmF5Q2hhbmdlKGFyciwgaW5kZXgsIGNoYW5nZSkge1xuICAgIGlmIChjaGFuZ2UucGF0aCAmJiBjaGFuZ2UucGF0aC5sZW5ndGgpIHtcbiAgICAgIC8vIHRoZSBzdHJ1Y3R1cmUgb2YgdGhlIG9iamVjdCBhdCB0aGUgaW5kZXggaGFzIGNoYW5nZWQuLi5cbiAgICAgIHZhciBpdCA9IGFycltpbmRleF0sXG4gICAgICAgICAgaSwgdSA9IGNoYW5nZS5wYXRoLmxlbmd0aCAtIDE7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdTsgaSsrKSB7XG4gICAgICAgIGl0ID0gaXRbY2hhbmdlLnBhdGhbaV1dO1xuICAgICAgfVxuICAgICAgc3dpdGNoIChjaGFuZ2Uua2luZCkge1xuICAgICAgICBjYXNlICdBJzpcbiAgICAgICAgICByZXZlcnRBcnJheUNoYW5nZShpdFtjaGFuZ2UucGF0aFtpXV0sIGNoYW5nZS5pbmRleCwgY2hhbmdlLml0ZW0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdEJzpcbiAgICAgICAgICBpdFtjaGFuZ2UucGF0aFtpXV0gPSBjaGFuZ2UubGhzO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdFJzpcbiAgICAgICAgICBpdFtjaGFuZ2UucGF0aFtpXV0gPSBjaGFuZ2UubGhzO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdOJzpcbiAgICAgICAgICBkZWxldGUgaXRbY2hhbmdlLnBhdGhbaV1dO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyB0aGUgYXJyYXkgaXRlbSBpcyBkaWZmZXJlbnQuLi5cbiAgICAgIHN3aXRjaCAoY2hhbmdlLmtpbmQpIHtcbiAgICAgICAgY2FzZSAnQSc6XG4gICAgICAgICAgcmV2ZXJ0QXJyYXlDaGFuZ2UoYXJyW2luZGV4XSwgY2hhbmdlLmluZGV4LCBjaGFuZ2UuaXRlbSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0QnOlxuICAgICAgICAgIGFycltpbmRleF0gPSBjaGFuZ2UubGhzO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdFJzpcbiAgICAgICAgICBhcnJbaW5kZXhdID0gY2hhbmdlLmxocztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnTic6XG4gICAgICAgICAgYXJyID0gYXJyYXlSZW1vdmUoYXJyLCBpbmRleCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBmdW5jdGlvbiByZXZlcnRDaGFuZ2UodGFyZ2V0LCBzb3VyY2UsIGNoYW5nZSkge1xuICAgIGlmICh0YXJnZXQgJiYgc291cmNlICYmIGNoYW5nZSAmJiBjaGFuZ2Uua2luZCkge1xuICAgICAgdmFyIGl0ID0gdGFyZ2V0LFxuICAgICAgICAgIGksIHU7XG4gICAgICB1ID0gY2hhbmdlLnBhdGgubGVuZ3RoIC0gMTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB1OyBpKyspIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdFtjaGFuZ2UucGF0aFtpXV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaXRbY2hhbmdlLnBhdGhbaV1dID0ge307XG4gICAgICAgIH1cbiAgICAgICAgaXQgPSBpdFtjaGFuZ2UucGF0aFtpXV07XG4gICAgICB9XG4gICAgICBzd2l0Y2ggKGNoYW5nZS5raW5kKSB7XG4gICAgICAgIGNhc2UgJ0EnOlxuICAgICAgICAgIC8vIEFycmF5IHdhcyBtb2RpZmllZC4uLlxuICAgICAgICAgIC8vIGl0IHdpbGwgYmUgYW4gYXJyYXkuLi5cbiAgICAgICAgICByZXZlcnRBcnJheUNoYW5nZShpdFtjaGFuZ2UucGF0aFtpXV0sIGNoYW5nZS5pbmRleCwgY2hhbmdlLml0ZW0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdEJzpcbiAgICAgICAgICAvLyBJdGVtIHdhcyBkZWxldGVkLi4uXG4gICAgICAgICAgaXRbY2hhbmdlLnBhdGhbaV1dID0gY2hhbmdlLmxocztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRSc6XG4gICAgICAgICAgLy8gSXRlbSB3YXMgZWRpdGVkLi4uXG4gICAgICAgICAgaXRbY2hhbmdlLnBhdGhbaV1dID0gY2hhbmdlLmxocztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnTic6XG4gICAgICAgICAgLy8gSXRlbSBpcyBuZXcuLi5cbiAgICAgICAgICBkZWxldGUgaXRbY2hhbmdlLnBhdGhbaV1dO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGx5RGlmZih0YXJnZXQsIHNvdXJjZSwgZmlsdGVyKSB7XG4gICAgaWYgKHRhcmdldCAmJiBzb3VyY2UpIHtcbiAgICAgIHZhciBvbkNoYW5nZSA9IGZ1bmN0aW9uKGNoYW5nZSkge1xuICAgICAgICBpZiAoIWZpbHRlciB8fCBmaWx0ZXIodGFyZ2V0LCBzb3VyY2UsIGNoYW5nZSkpIHtcbiAgICAgICAgICBhcHBseUNoYW5nZSh0YXJnZXQsIHNvdXJjZSwgY2hhbmdlKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGRlZXBEaWZmKHRhcmdldCwgc291cmNlLCBvbkNoYW5nZSk7XG4gICAgfVxuICB9XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoYWNjdW11bGF0ZURpZmYsIHtcblxuICAgIGRpZmY6IHtcbiAgICAgIHZhbHVlOiBhY2N1bXVsYXRlRGlmZixcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9LFxuICAgIG9ic2VydmFibGVEaWZmOiB7XG4gICAgICB2YWx1ZTogZGVlcERpZmYsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSxcbiAgICBhcHBseURpZmY6IHtcbiAgICAgIHZhbHVlOiBhcHBseURpZmYsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSxcbiAgICBhcHBseUNoYW5nZToge1xuICAgICAgdmFsdWU6IGFwcGx5Q2hhbmdlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgcmV2ZXJ0Q2hhbmdlOiB7XG4gICAgICB2YWx1ZTogcmV2ZXJ0Q2hhbmdlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgaXNDb25mbGljdDoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBjb25mbGljdDtcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSxcbiAgICBub0NvbmZsaWN0OiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChjb25mbGljdFJlc29sdXRpb24pIHtcbiAgICAgICAgICBjb25mbGljdFJlc29sdXRpb24uZm9yRWFjaChmdW5jdGlvbihpdCkge1xuICAgICAgICAgICAgaXQoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBjb25mbGljdFJlc29sdXRpb24gPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2N1bXVsYXRlRGlmZjtcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gYWNjdW11bGF0ZURpZmY7XG59KSk7XG4iLCJ2YXIgZGV0ZWN0QnJvd3NlciA9IHJlcXVpcmUoJy4vbGliL2RldGVjdEJyb3dzZXInKTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZXRlY3RCcm93c2VyKG5hdmlnYXRvci51c2VyQWdlbnQpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZXRlY3RCcm93c2VyKHVzZXJBZ2VudFN0cmluZykge1xuICB2YXIgYnJvd3NlcnMgPSBbXG4gICAgWyAnZWRnZScsIC9FZGdlXFwvKFswLTlcXC5fXSspLyBdLFxuICAgIFsgJ2Nocm9tZScsIC8oPyFDaHJvbS4qT1BSKUNocm9tKD86ZXxpdW0pXFwvKFswLTlcXC5dKykoOj9cXHN8JCkvIF0sXG4gICAgWyAnY3Jpb3MnLCAvQ3JpT1NcXC8oWzAtOVxcLl0rKSg6P1xcc3wkKS8gXSxcbiAgICBbICdmaXJlZm94JywgL0ZpcmVmb3hcXC8oWzAtOVxcLl0rKSg/Olxcc3wkKS8gXSxcbiAgICBbICdvcGVyYScsIC9PcGVyYVxcLyhbMC05XFwuXSspKD86XFxzfCQpLyBdLFxuICAgIFsgJ29wZXJhJywgL09QUlxcLyhbMC05XFwuXSspKDo/XFxzfCQpJC8gXSxcbiAgICBbICdpZScsIC9UcmlkZW50XFwvN1xcLjAuKnJ2XFw6KFswLTlcXC5dKylcXCkuKkdlY2tvJC8gXSxcbiAgICBbICdpZScsIC9NU0lFXFxzKFswLTlcXC5dKyk7LipUcmlkZW50XFwvWzQtN10uMC8gXSxcbiAgICBbICdpZScsIC9NU0lFXFxzKDdcXC4wKS8gXSxcbiAgICBbICdiYjEwJywgL0JCMTA7XFxzVG91Y2guKlZlcnNpb25cXC8oWzAtOVxcLl0rKS8gXSxcbiAgICBbICdhbmRyb2lkJywgL0FuZHJvaWRcXHMoWzAtOVxcLl0rKS8gXSxcbiAgICBbICdpb3MnLCAvaVBhZC4qVmVyc2lvblxcLyhbMC05XFwuX10rKS8gXSxcbiAgICBbICdpb3MnLCAgL2lQaG9uZS4qVmVyc2lvblxcLyhbMC05XFwuX10rKS8gXSxcbiAgICBbICdzYWZhcmknLCAvVmVyc2lvblxcLyhbMC05XFwuX10rKS4qU2FmYXJpLyBdXG4gIF07XG5cbiAgdmFyIGkgPSAwLCBtYXBwZWQgPVtdO1xuICBmb3IgKGkgPSAwOyBpIDwgYnJvd3NlcnMubGVuZ3RoOyBpKyspIHtcbiAgICBicm93c2Vyc1tpXSA9IGNyZWF0ZU1hdGNoKGJyb3dzZXJzW2ldKTtcbiAgICBpZiAoaXNNYXRjaChicm93c2Vyc1tpXSkpIHtcbiAgICAgIG1hcHBlZC5wdXNoKGJyb3dzZXJzW2ldKTtcbiAgICB9XG4gIH1cblxuICB2YXIgbWF0Y2ggPSBtYXBwZWRbMF07XG4gIHZhciBwYXJ0cyA9IG1hdGNoICYmIG1hdGNoWzNdLnNwbGl0KC9bLl9dLykuc2xpY2UoMCwzKTtcblxuICB3aGlsZSAocGFydHMgJiYgcGFydHMubGVuZ3RoIDwgMykge1xuICAgIHBhcnRzLnB1c2goJzAnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZU1hdGNoKHBhaXIpIHtcbiAgICByZXR1cm4gcGFpci5jb25jYXQocGFpclsxXS5leGVjKHVzZXJBZ2VudFN0cmluZykpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNNYXRjaChwYWlyKSB7XG4gICAgcmV0dXJuICEhcGFpclsyXTtcbiAgfVxuXG4gIC8vIHJldHVybiB0aGUgbmFtZSBhbmQgdmVyc2lvblxuICByZXR1cm4ge1xuICAgIG5hbWU6IG1hdGNoICYmIG1hdGNoWzBdLFxuICAgIHZlcnNpb246IHBhcnRzICYmIHBhcnRzLmpvaW4oJy4nKSxcbiAgfTtcbn07XG4iLCIndXNlIHN0cmljdCdcblxudmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnZ2xvYmFsL2RvY3VtZW50JylcblxubW9kdWxlLmV4cG9ydHMgPSBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyID8gcmVhZHkgOiBub29wXG5cbmZ1bmN0aW9uIHJlYWR5IChjYWxsYmFjaykge1xuICB2YXIgc3RhdGUgPSBkb2N1bWVudC5yZWFkeVN0YXRlXG4gIGlmIChzdGF0ZSA9PT0gJ2NvbXBsZXRlJyB8fCBzdGF0ZSA9PT0gJ2ludGVyYWN0aXZlJykge1xuICAgIHJldHVybiBzZXRUaW1lb3V0KGNhbGxiYWNrLCAwKVxuICB9XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uIG9uTG9hZCAoKSB7XG4gICAgY2FsbGJhY2soKVxuICB9KVxufVxuXG5mdW5jdGlvbiBub29wICgpIHt9XG4iLCI7KGZ1bmN0aW9uICgpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdC8qKlxuXHQgKiBAcHJlc2VydmUgRmFzdENsaWNrOiBwb2x5ZmlsbCB0byByZW1vdmUgY2xpY2sgZGVsYXlzIG9uIGJyb3dzZXJzIHdpdGggdG91Y2ggVUlzLlxuXHQgKlxuXHQgKiBAY29kaW5nc3RhbmRhcmQgZnRsYWJzLWpzdjJcblx0ICogQGNvcHlyaWdodCBUaGUgRmluYW5jaWFsIFRpbWVzIExpbWl0ZWQgW0FsbCBSaWdodHMgUmVzZXJ2ZWRdXG5cdCAqIEBsaWNlbnNlIE1JVCBMaWNlbnNlIChzZWUgTElDRU5TRS50eHQpXG5cdCAqL1xuXG5cdC8qanNsaW50IGJyb3dzZXI6dHJ1ZSwgbm9kZTp0cnVlKi9cblx0LypnbG9iYWwgZGVmaW5lLCBFdmVudCwgTm9kZSovXG5cblxuXHQvKipcblx0ICogSW5zdGFudGlhdGUgZmFzdC1jbGlja2luZyBsaXN0ZW5lcnMgb24gdGhlIHNwZWNpZmllZCBsYXllci5cblx0ICpcblx0ICogQGNvbnN0cnVjdG9yXG5cdCAqIEBwYXJhbSB7RWxlbWVudH0gbGF5ZXIgVGhlIGxheWVyIHRvIGxpc3RlbiBvblxuXHQgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIHRvIG92ZXJyaWRlIHRoZSBkZWZhdWx0c1xuXHQgKi9cblx0ZnVuY3Rpb24gRmFzdENsaWNrKGxheWVyLCBvcHRpb25zKSB7XG5cdFx0dmFyIG9sZE9uQ2xpY2s7XG5cblx0XHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRcdC8qKlxuXHRcdCAqIFdoZXRoZXIgYSBjbGljayBpcyBjdXJyZW50bHkgYmVpbmcgdHJhY2tlZC5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIGJvb2xlYW5cblx0XHQgKi9cblx0XHR0aGlzLnRyYWNraW5nQ2xpY2sgPSBmYWxzZTtcblxuXG5cdFx0LyoqXG5cdFx0ICogVGltZXN0YW1wIGZvciB3aGVuIGNsaWNrIHRyYWNraW5nIHN0YXJ0ZWQuXG5cdFx0ICpcblx0XHQgKiBAdHlwZSBudW1iZXJcblx0XHQgKi9cblx0XHR0aGlzLnRyYWNraW5nQ2xpY2tTdGFydCA9IDA7XG5cblxuXHRcdC8qKlxuXHRcdCAqIFRoZSBlbGVtZW50IGJlaW5nIHRyYWNrZWQgZm9yIGEgY2xpY2suXG5cdFx0ICpcblx0XHQgKiBAdHlwZSBFdmVudFRhcmdldFxuXHRcdCAqL1xuXHRcdHRoaXMudGFyZ2V0RWxlbWVudCA9IG51bGw7XG5cblxuXHRcdC8qKlxuXHRcdCAqIFgtY29vcmRpbmF0ZSBvZiB0b3VjaCBzdGFydCBldmVudC5cblx0XHQgKlxuXHRcdCAqIEB0eXBlIG51bWJlclxuXHRcdCAqL1xuXHRcdHRoaXMudG91Y2hTdGFydFggPSAwO1xuXG5cblx0XHQvKipcblx0XHQgKiBZLWNvb3JkaW5hdGUgb2YgdG91Y2ggc3RhcnQgZXZlbnQuXG5cdFx0ICpcblx0XHQgKiBAdHlwZSBudW1iZXJcblx0XHQgKi9cblx0XHR0aGlzLnRvdWNoU3RhcnRZID0gMDtcblxuXG5cdFx0LyoqXG5cdFx0ICogSUQgb2YgdGhlIGxhc3QgdG91Y2gsIHJldHJpZXZlZCBmcm9tIFRvdWNoLmlkZW50aWZpZXIuXG5cdFx0ICpcblx0XHQgKiBAdHlwZSBudW1iZXJcblx0XHQgKi9cblx0XHR0aGlzLmxhc3RUb3VjaElkZW50aWZpZXIgPSAwO1xuXG5cblx0XHQvKipcblx0XHQgKiBUb3VjaG1vdmUgYm91bmRhcnksIGJleW9uZCB3aGljaCBhIGNsaWNrIHdpbGwgYmUgY2FuY2VsbGVkLlxuXHRcdCAqXG5cdFx0ICogQHR5cGUgbnVtYmVyXG5cdFx0ICovXG5cdFx0dGhpcy50b3VjaEJvdW5kYXJ5ID0gb3B0aW9ucy50b3VjaEJvdW5kYXJ5IHx8IDEwO1xuXG5cblx0XHQvKipcblx0XHQgKiBUaGUgRmFzdENsaWNrIGxheWVyLlxuXHRcdCAqXG5cdFx0ICogQHR5cGUgRWxlbWVudFxuXHRcdCAqL1xuXHRcdHRoaXMubGF5ZXIgPSBsYXllcjtcblxuXHRcdC8qKlxuXHRcdCAqIFRoZSBtaW5pbXVtIHRpbWUgYmV0d2VlbiB0YXAodG91Y2hzdGFydCBhbmQgdG91Y2hlbmQpIGV2ZW50c1xuXHRcdCAqXG5cdFx0ICogQHR5cGUgbnVtYmVyXG5cdFx0ICovXG5cdFx0dGhpcy50YXBEZWxheSA9IG9wdGlvbnMudGFwRGVsYXkgfHwgMjAwO1xuXG5cdFx0LyoqXG5cdFx0ICogVGhlIG1heGltdW0gdGltZSBmb3IgYSB0YXBcblx0XHQgKlxuXHRcdCAqIEB0eXBlIG51bWJlclxuXHRcdCAqL1xuXHRcdHRoaXMudGFwVGltZW91dCA9IG9wdGlvbnMudGFwVGltZW91dCB8fCA3MDA7XG5cblx0XHRpZiAoRmFzdENsaWNrLm5vdE5lZWRlZChsYXllcikpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBTb21lIG9sZCB2ZXJzaW9ucyBvZiBBbmRyb2lkIGRvbid0IGhhdmUgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmRcblx0XHRmdW5jdGlvbiBiaW5kKG1ldGhvZCwgY29udGV4dCkge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCkgeyByZXR1cm4gbWV0aG9kLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyk7IH07XG5cdFx0fVxuXG5cblx0XHR2YXIgbWV0aG9kcyA9IFsnb25Nb3VzZScsICdvbkNsaWNrJywgJ29uVG91Y2hTdGFydCcsICdvblRvdWNoTW92ZScsICdvblRvdWNoRW5kJywgJ29uVG91Y2hDYW5jZWwnXTtcblx0XHR2YXIgY29udGV4dCA9IHRoaXM7XG5cdFx0Zm9yICh2YXIgaSA9IDAsIGwgPSBtZXRob2RzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuXHRcdFx0Y29udGV4dFttZXRob2RzW2ldXSA9IGJpbmQoY29udGV4dFttZXRob2RzW2ldXSwgY29udGV4dCk7XG5cdFx0fVxuXG5cdFx0Ly8gU2V0IHVwIGV2ZW50IGhhbmRsZXJzIGFzIHJlcXVpcmVkXG5cdFx0aWYgKGRldmljZUlzQW5kcm9pZCkge1xuXHRcdFx0bGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgdGhpcy5vbk1vdXNlLCB0cnVlKTtcblx0XHRcdGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZSwgdHJ1ZSk7XG5cdFx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5vbk1vdXNlLCB0cnVlKTtcblx0XHR9XG5cblx0XHRsYXllci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGljaywgdHJ1ZSk7XG5cdFx0bGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMub25Ub3VjaFN0YXJ0LCBmYWxzZSk7XG5cdFx0bGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5vblRvdWNoTW92ZSwgZmFsc2UpO1xuXHRcdGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5vblRvdWNoRW5kLCBmYWxzZSk7XG5cdFx0bGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0aGlzLm9uVG91Y2hDYW5jZWwsIGZhbHNlKTtcblxuXHRcdC8vIEhhY2sgaXMgcmVxdWlyZWQgZm9yIGJyb3dzZXJzIHRoYXQgZG9uJ3Qgc3VwcG9ydCBFdmVudCNzdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24gKGUuZy4gQW5kcm9pZCAyKVxuXHRcdC8vIHdoaWNoIGlzIGhvdyBGYXN0Q2xpY2sgbm9ybWFsbHkgc3RvcHMgY2xpY2sgZXZlbnRzIGJ1YmJsaW5nIHRvIGNhbGxiYWNrcyByZWdpc3RlcmVkIG9uIHRoZSBGYXN0Q2xpY2tcblx0XHQvLyBsYXllciB3aGVuIHRoZXkgYXJlIGNhbmNlbGxlZC5cblx0XHRpZiAoIUV2ZW50LnByb3RvdHlwZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24pIHtcblx0XHRcdGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBjYWxsYmFjaywgY2FwdHVyZSkge1xuXHRcdFx0XHR2YXIgcm12ID0gTm9kZS5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lcjtcblx0XHRcdFx0aWYgKHR5cGUgPT09ICdjbGljaycpIHtcblx0XHRcdFx0XHRybXYuY2FsbChsYXllciwgdHlwZSwgY2FsbGJhY2suaGlqYWNrZWQgfHwgY2FsbGJhY2ssIGNhcHR1cmUpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJtdi5jYWxsKGxheWVyLCB0eXBlLCBjYWxsYmFjaywgY2FwdHVyZSk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdGxheWVyLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBjYWxsYmFjaywgY2FwdHVyZSkge1xuXHRcdFx0XHR2YXIgYWR2ID0gTm9kZS5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcjtcblx0XHRcdFx0aWYgKHR5cGUgPT09ICdjbGljaycpIHtcblx0XHRcdFx0XHRhZHYuY2FsbChsYXllciwgdHlwZSwgY2FsbGJhY2suaGlqYWNrZWQgfHwgKGNhbGxiYWNrLmhpamFja2VkID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0XHRcdFx0XHRcdGlmICghZXZlbnQucHJvcGFnYXRpb25TdG9wcGVkKSB7XG5cdFx0XHRcdFx0XHRcdGNhbGxiYWNrKGV2ZW50KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KSwgY2FwdHVyZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0YWR2LmNhbGwobGF5ZXIsIHR5cGUsIGNhbGxiYWNrLCBjYXB0dXJlKTtcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHQvLyBJZiBhIGhhbmRsZXIgaXMgYWxyZWFkeSBkZWNsYXJlZCBpbiB0aGUgZWxlbWVudCdzIG9uY2xpY2sgYXR0cmlidXRlLCBpdCB3aWxsIGJlIGZpcmVkIGJlZm9yZVxuXHRcdC8vIEZhc3RDbGljaydzIG9uQ2xpY2sgaGFuZGxlci4gRml4IHRoaXMgYnkgcHVsbGluZyBvdXQgdGhlIHVzZXItZGVmaW5lZCBoYW5kbGVyIGZ1bmN0aW9uIGFuZFxuXHRcdC8vIGFkZGluZyBpdCBhcyBsaXN0ZW5lci5cblx0XHRpZiAodHlwZW9mIGxheWVyLm9uY2xpY2sgPT09ICdmdW5jdGlvbicpIHtcblxuXHRcdFx0Ly8gQW5kcm9pZCBicm93c2VyIG9uIGF0IGxlYXN0IDMuMiByZXF1aXJlcyBhIG5ldyByZWZlcmVuY2UgdG8gdGhlIGZ1bmN0aW9uIGluIGxheWVyLm9uY2xpY2tcblx0XHRcdC8vIC0gdGhlIG9sZCBvbmUgd29uJ3Qgd29yayBpZiBwYXNzZWQgdG8gYWRkRXZlbnRMaXN0ZW5lciBkaXJlY3RseS5cblx0XHRcdG9sZE9uQ2xpY2sgPSBsYXllci5vbmNsaWNrO1xuXHRcdFx0bGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0XHRvbGRPbkNsaWNrKGV2ZW50KTtcblx0XHRcdH0sIGZhbHNlKTtcblx0XHRcdGxheWVyLm9uY2xpY2sgPSBudWxsO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQqIFdpbmRvd3MgUGhvbmUgOC4xIGZha2VzIHVzZXIgYWdlbnQgc3RyaW5nIHRvIGxvb2sgbGlrZSBBbmRyb2lkIGFuZCBpUGhvbmUuXG5cdCpcblx0KiBAdHlwZSBib29sZWFuXG5cdCovXG5cdHZhciBkZXZpY2VJc1dpbmRvd3NQaG9uZSA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihcIldpbmRvd3MgUGhvbmVcIikgPj0gMDtcblxuXHQvKipcblx0ICogQW5kcm9pZCByZXF1aXJlcyBleGNlcHRpb25zLlxuXHQgKlxuXHQgKiBAdHlwZSBib29sZWFuXG5cdCAqL1xuXHR2YXIgZGV2aWNlSXNBbmRyb2lkID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdBbmRyb2lkJykgPiAwICYmICFkZXZpY2VJc1dpbmRvd3NQaG9uZTtcblxuXG5cdC8qKlxuXHQgKiBpT1MgcmVxdWlyZXMgZXhjZXB0aW9ucy5cblx0ICpcblx0ICogQHR5cGUgYm9vbGVhblxuXHQgKi9cblx0dmFyIGRldmljZUlzSU9TID0gL2lQKGFkfGhvbmV8b2QpLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICYmICFkZXZpY2VJc1dpbmRvd3NQaG9uZTtcblxuXG5cdC8qKlxuXHQgKiBpT1MgNCByZXF1aXJlcyBhbiBleGNlcHRpb24gZm9yIHNlbGVjdCBlbGVtZW50cy5cblx0ICpcblx0ICogQHR5cGUgYm9vbGVhblxuXHQgKi9cblx0dmFyIGRldmljZUlzSU9TNCA9IGRldmljZUlzSU9TICYmICgvT1MgNF9cXGQoX1xcZCk/LykudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuXG5cdC8qKlxuXHQgKiBpT1MgNi4wLTcuKiByZXF1aXJlcyB0aGUgdGFyZ2V0IGVsZW1lbnQgdG8gYmUgbWFudWFsbHkgZGVyaXZlZFxuXHQgKlxuXHQgKiBAdHlwZSBib29sZWFuXG5cdCAqL1xuXHR2YXIgZGV2aWNlSXNJT1NXaXRoQmFkVGFyZ2V0ID0gZGV2aWNlSXNJT1MgJiYgKC9PUyBbNi03XV9cXGQvKS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG5cdC8qKlxuXHQgKiBCbGFja0JlcnJ5IHJlcXVpcmVzIGV4Y2VwdGlvbnMuXG5cdCAqXG5cdCAqIEB0eXBlIGJvb2xlYW5cblx0ICovXG5cdHZhciBkZXZpY2VJc0JsYWNrQmVycnkxMCA9IG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignQkIxMCcpID4gMDtcblxuXHQvKipcblx0ICogRGV0ZXJtaW5lIHdoZXRoZXIgYSBnaXZlbiBlbGVtZW50IHJlcXVpcmVzIGEgbmF0aXZlIGNsaWNrLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fEVsZW1lbnR9IHRhcmdldCBUYXJnZXQgRE9NIGVsZW1lbnRcblx0ICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudCBuZWVkcyBhIG5hdGl2ZSBjbGlja1xuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5uZWVkc0NsaWNrID0gZnVuY3Rpb24odGFyZ2V0KSB7XG5cdFx0c3dpdGNoICh0YXJnZXQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSkge1xuXG5cdFx0Ly8gRG9uJ3Qgc2VuZCBhIHN5bnRoZXRpYyBjbGljayB0byBkaXNhYmxlZCBpbnB1dHMgKGlzc3VlICM2Milcblx0XHRjYXNlICdidXR0b24nOlxuXHRcdGNhc2UgJ3NlbGVjdCc6XG5cdFx0Y2FzZSAndGV4dGFyZWEnOlxuXHRcdFx0aWYgKHRhcmdldC5kaXNhYmxlZCkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAnaW5wdXQnOlxuXG5cdFx0XHQvLyBGaWxlIGlucHV0cyBuZWVkIHJlYWwgY2xpY2tzIG9uIGlPUyA2IGR1ZSB0byBhIGJyb3dzZXIgYnVnIChpc3N1ZSAjNjgpXG5cdFx0XHRpZiAoKGRldmljZUlzSU9TICYmIHRhcmdldC50eXBlID09PSAnZmlsZScpIHx8IHRhcmdldC5kaXNhYmxlZCkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAnbGFiZWwnOlxuXHRcdGNhc2UgJ2lmcmFtZSc6IC8vIGlPUzggaG9tZXNjcmVlbiBhcHBzIGNhbiBwcmV2ZW50IGV2ZW50cyBidWJibGluZyBpbnRvIGZyYW1lc1xuXHRcdGNhc2UgJ3ZpZGVvJzpcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHJldHVybiAoL1xcYm5lZWRzY2xpY2tcXGIvKS50ZXN0KHRhcmdldC5jbGFzc05hbWUpO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIERldGVybWluZSB3aGV0aGVyIGEgZ2l2ZW4gZWxlbWVudCByZXF1aXJlcyBhIGNhbGwgdG8gZm9jdXMgdG8gc2ltdWxhdGUgY2xpY2sgaW50byBlbGVtZW50LlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fEVsZW1lbnR9IHRhcmdldCBUYXJnZXQgRE9NIGVsZW1lbnRcblx0ICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudCByZXF1aXJlcyBhIGNhbGwgdG8gZm9jdXMgdG8gc2ltdWxhdGUgbmF0aXZlIGNsaWNrLlxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5uZWVkc0ZvY3VzID0gZnVuY3Rpb24odGFyZ2V0KSB7XG5cdFx0c3dpdGNoICh0YXJnZXQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSkge1xuXHRcdGNhc2UgJ3RleHRhcmVhJzpcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdGNhc2UgJ3NlbGVjdCc6XG5cdFx0XHRyZXR1cm4gIWRldmljZUlzQW5kcm9pZDtcblx0XHRjYXNlICdpbnB1dCc6XG5cdFx0XHRzd2l0Y2ggKHRhcmdldC50eXBlKSB7XG5cdFx0XHRjYXNlICdidXR0b24nOlxuXHRcdFx0Y2FzZSAnY2hlY2tib3gnOlxuXHRcdFx0Y2FzZSAnZmlsZSc6XG5cdFx0XHRjYXNlICdpbWFnZSc6XG5cdFx0XHRjYXNlICdyYWRpbyc6XG5cdFx0XHRjYXNlICdzdWJtaXQnOlxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdC8vIE5vIHBvaW50IGluIGF0dGVtcHRpbmcgdG8gZm9jdXMgZGlzYWJsZWQgaW5wdXRzXG5cdFx0XHRyZXR1cm4gIXRhcmdldC5kaXNhYmxlZCAmJiAhdGFyZ2V0LnJlYWRPbmx5O1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRyZXR1cm4gKC9cXGJuZWVkc2ZvY3VzXFxiLykudGVzdCh0YXJnZXQuY2xhc3NOYW1lKTtcblx0XHR9XG5cdH07XG5cblxuXHQvKipcblx0ICogU2VuZCBhIGNsaWNrIGV2ZW50IHRvIHRoZSBzcGVjaWZpZWQgZWxlbWVudC5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudFRhcmdldHxFbGVtZW50fSB0YXJnZXRFbGVtZW50XG5cdCAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLnNlbmRDbGljayA9IGZ1bmN0aW9uKHRhcmdldEVsZW1lbnQsIGV2ZW50KSB7XG5cdFx0dmFyIGNsaWNrRXZlbnQsIHRvdWNoO1xuXG5cdFx0Ly8gT24gc29tZSBBbmRyb2lkIGRldmljZXMgYWN0aXZlRWxlbWVudCBuZWVkcyB0byBiZSBibHVycmVkIG90aGVyd2lzZSB0aGUgc3ludGhldGljIGNsaWNrIHdpbGwgaGF2ZSBubyBlZmZlY3QgKCMyNClcblx0XHRpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSB0YXJnZXRFbGVtZW50KSB7XG5cdFx0XHRkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKTtcblx0XHR9XG5cblx0XHR0b3VjaCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdO1xuXG5cdFx0Ly8gU3ludGhlc2lzZSBhIGNsaWNrIGV2ZW50LCB3aXRoIGFuIGV4dHJhIGF0dHJpYnV0ZSBzbyBpdCBjYW4gYmUgdHJhY2tlZFxuXHRcdGNsaWNrRXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnTW91c2VFdmVudHMnKTtcblx0XHRjbGlja0V2ZW50LmluaXRNb3VzZUV2ZW50KHRoaXMuZGV0ZXJtaW5lRXZlbnRUeXBlKHRhcmdldEVsZW1lbnQpLCB0cnVlLCB0cnVlLCB3aW5kb3csIDEsIHRvdWNoLnNjcmVlblgsIHRvdWNoLnNjcmVlblksIHRvdWNoLmNsaWVudFgsIHRvdWNoLmNsaWVudFksIGZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlLCAwLCBudWxsKTtcblx0XHRjbGlja0V2ZW50LmZvcndhcmRlZFRvdWNoRXZlbnQgPSB0cnVlO1xuXHRcdHRhcmdldEVsZW1lbnQuZGlzcGF0Y2hFdmVudChjbGlja0V2ZW50KTtcblx0fTtcblxuXHRGYXN0Q2xpY2sucHJvdG90eXBlLmRldGVybWluZUV2ZW50VHlwZSA9IGZ1bmN0aW9uKHRhcmdldEVsZW1lbnQpIHtcblxuXHRcdC8vSXNzdWUgIzE1OTogQW5kcm9pZCBDaHJvbWUgU2VsZWN0IEJveCBkb2VzIG5vdCBvcGVuIHdpdGggYSBzeW50aGV0aWMgY2xpY2sgZXZlbnRcblx0XHRpZiAoZGV2aWNlSXNBbmRyb2lkICYmIHRhcmdldEVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnc2VsZWN0Jykge1xuXHRcdFx0cmV0dXJuICdtb3VzZWRvd24nO1xuXHRcdH1cblxuXHRcdHJldHVybiAnY2xpY2snO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7RXZlbnRUYXJnZXR8RWxlbWVudH0gdGFyZ2V0RWxlbWVudFxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5mb2N1cyA9IGZ1bmN0aW9uKHRhcmdldEVsZW1lbnQpIHtcblx0XHR2YXIgbGVuZ3RoO1xuXG5cdFx0Ly8gSXNzdWUgIzE2MDogb24gaU9TIDcsIHNvbWUgaW5wdXQgZWxlbWVudHMgKGUuZy4gZGF0ZSBkYXRldGltZSBtb250aCkgdGhyb3cgYSB2YWd1ZSBUeXBlRXJyb3Igb24gc2V0U2VsZWN0aW9uUmFuZ2UuIFRoZXNlIGVsZW1lbnRzIGRvbid0IGhhdmUgYW4gaW50ZWdlciB2YWx1ZSBmb3IgdGhlIHNlbGVjdGlvblN0YXJ0IGFuZCBzZWxlY3Rpb25FbmQgcHJvcGVydGllcywgYnV0IHVuZm9ydHVuYXRlbHkgdGhhdCBjYW4ndCBiZSB1c2VkIGZvciBkZXRlY3Rpb24gYmVjYXVzZSBhY2Nlc3NpbmcgdGhlIHByb3BlcnRpZXMgYWxzbyB0aHJvd3MgYSBUeXBlRXJyb3IuIEp1c3QgY2hlY2sgdGhlIHR5cGUgaW5zdGVhZC4gRmlsZWQgYXMgQXBwbGUgYnVnICMxNTEyMjcyNC5cblx0XHRpZiAoZGV2aWNlSXNJT1MgJiYgdGFyZ2V0RWxlbWVudC5zZXRTZWxlY3Rpb25SYW5nZSAmJiB0YXJnZXRFbGVtZW50LnR5cGUuaW5kZXhPZignZGF0ZScpICE9PSAwICYmIHRhcmdldEVsZW1lbnQudHlwZSAhPT0gJ3RpbWUnICYmIHRhcmdldEVsZW1lbnQudHlwZSAhPT0gJ21vbnRoJykge1xuXHRcdFx0bGVuZ3RoID0gdGFyZ2V0RWxlbWVudC52YWx1ZS5sZW5ndGg7XG5cdFx0XHR0YXJnZXRFbGVtZW50LnNldFNlbGVjdGlvblJhbmdlKGxlbmd0aCwgbGVuZ3RoKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0RWxlbWVudC5mb2N1cygpO1xuXHRcdH1cblx0fTtcblxuXG5cdC8qKlxuXHQgKiBDaGVjayB3aGV0aGVyIHRoZSBnaXZlbiB0YXJnZXQgZWxlbWVudCBpcyBhIGNoaWxkIG9mIGEgc2Nyb2xsYWJsZSBsYXllciBhbmQgaWYgc28sIHNldCBhIGZsYWcgb24gaXQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnRUYXJnZXR8RWxlbWVudH0gdGFyZ2V0RWxlbWVudFxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS51cGRhdGVTY3JvbGxQYXJlbnQgPSBmdW5jdGlvbih0YXJnZXRFbGVtZW50KSB7XG5cdFx0dmFyIHNjcm9sbFBhcmVudCwgcGFyZW50RWxlbWVudDtcblxuXHRcdHNjcm9sbFBhcmVudCA9IHRhcmdldEVsZW1lbnQuZmFzdENsaWNrU2Nyb2xsUGFyZW50O1xuXG5cdFx0Ly8gQXR0ZW1wdCB0byBkaXNjb3ZlciB3aGV0aGVyIHRoZSB0YXJnZXQgZWxlbWVudCBpcyBjb250YWluZWQgd2l0aGluIGEgc2Nyb2xsYWJsZSBsYXllci4gUmUtY2hlY2sgaWYgdGhlXG5cdFx0Ly8gdGFyZ2V0IGVsZW1lbnQgd2FzIG1vdmVkIHRvIGFub3RoZXIgcGFyZW50LlxuXHRcdGlmICghc2Nyb2xsUGFyZW50IHx8ICFzY3JvbGxQYXJlbnQuY29udGFpbnModGFyZ2V0RWxlbWVudCkpIHtcblx0XHRcdHBhcmVudEVsZW1lbnQgPSB0YXJnZXRFbGVtZW50O1xuXHRcdFx0ZG8ge1xuXHRcdFx0XHRpZiAocGFyZW50RWxlbWVudC5zY3JvbGxIZWlnaHQgPiBwYXJlbnRFbGVtZW50Lm9mZnNldEhlaWdodCkge1xuXHRcdFx0XHRcdHNjcm9sbFBhcmVudCA9IHBhcmVudEVsZW1lbnQ7XG5cdFx0XHRcdFx0dGFyZ2V0RWxlbWVudC5mYXN0Q2xpY2tTY3JvbGxQYXJlbnQgPSBwYXJlbnRFbGVtZW50O1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cGFyZW50RWxlbWVudCA9IHBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudDtcblx0XHRcdH0gd2hpbGUgKHBhcmVudEVsZW1lbnQpO1xuXHRcdH1cblxuXHRcdC8vIEFsd2F5cyB1cGRhdGUgdGhlIHNjcm9sbCB0b3AgdHJhY2tlciBpZiBwb3NzaWJsZS5cblx0XHRpZiAoc2Nyb2xsUGFyZW50KSB7XG5cdFx0XHRzY3JvbGxQYXJlbnQuZmFzdENsaWNrTGFzdFNjcm9sbFRvcCA9IHNjcm9sbFBhcmVudC5zY3JvbGxUb3A7XG5cdFx0fVxuXHR9O1xuXG5cblx0LyoqXG5cdCAqIEBwYXJhbSB7RXZlbnRUYXJnZXR9IHRhcmdldEVsZW1lbnRcblx0ICogQHJldHVybnMge0VsZW1lbnR8RXZlbnRUYXJnZXR9XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLmdldFRhcmdldEVsZW1lbnRGcm9tRXZlbnRUYXJnZXQgPSBmdW5jdGlvbihldmVudFRhcmdldCkge1xuXG5cdFx0Ly8gT24gc29tZSBvbGRlciBicm93c2VycyAobm90YWJseSBTYWZhcmkgb24gaU9TIDQuMSAtIHNlZSBpc3N1ZSAjNTYpIHRoZSBldmVudCB0YXJnZXQgbWF5IGJlIGEgdGV4dCBub2RlLlxuXHRcdGlmIChldmVudFRhcmdldC5ub2RlVHlwZSA9PT0gTm9kZS5URVhUX05PREUpIHtcblx0XHRcdHJldHVybiBldmVudFRhcmdldC5wYXJlbnROb2RlO1xuXHRcdH1cblxuXHRcdHJldHVybiBldmVudFRhcmdldDtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBPbiB0b3VjaCBzdGFydCwgcmVjb3JkIHRoZSBwb3NpdGlvbiBhbmQgc2Nyb2xsIG9mZnNldC5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnRcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLm9uVG91Y2hTdGFydCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0dmFyIHRhcmdldEVsZW1lbnQsIHRvdWNoLCBzZWxlY3Rpb247XG5cblx0XHQvLyBJZ25vcmUgbXVsdGlwbGUgdG91Y2hlcywgb3RoZXJ3aXNlIHBpbmNoLXRvLXpvb20gaXMgcHJldmVudGVkIGlmIGJvdGggZmluZ2VycyBhcmUgb24gdGhlIEZhc3RDbGljayBlbGVtZW50IChpc3N1ZSAjMTExKS5cblx0XHRpZiAoZXZlbnQudGFyZ2V0VG91Y2hlcy5sZW5ndGggPiAxKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHR0YXJnZXRFbGVtZW50ID0gdGhpcy5nZXRUYXJnZXRFbGVtZW50RnJvbUV2ZW50VGFyZ2V0KGV2ZW50LnRhcmdldCk7XG5cdFx0dG91Y2ggPSBldmVudC50YXJnZXRUb3VjaGVzWzBdO1xuXG5cdFx0aWYgKGRldmljZUlzSU9TKSB7XG5cblx0XHRcdC8vIE9ubHkgdHJ1c3RlZCBldmVudHMgd2lsbCBkZXNlbGVjdCB0ZXh0IG9uIGlPUyAoaXNzdWUgIzQ5KVxuXHRcdFx0c2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuXHRcdFx0aWYgKHNlbGVjdGlvbi5yYW5nZUNvdW50ICYmICFzZWxlY3Rpb24uaXNDb2xsYXBzZWQpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdGlmICghZGV2aWNlSXNJT1M0KSB7XG5cblx0XHRcdFx0Ly8gV2VpcmQgdGhpbmdzIGhhcHBlbiBvbiBpT1Mgd2hlbiBhbiBhbGVydCBvciBjb25maXJtIGRpYWxvZyBpcyBvcGVuZWQgZnJvbSBhIGNsaWNrIGV2ZW50IGNhbGxiYWNrIChpc3N1ZSAjMjMpOlxuXHRcdFx0XHQvLyB3aGVuIHRoZSB1c2VyIG5leHQgdGFwcyBhbnl3aGVyZSBlbHNlIG9uIHRoZSBwYWdlLCBuZXcgdG91Y2hzdGFydCBhbmQgdG91Y2hlbmQgZXZlbnRzIGFyZSBkaXNwYXRjaGVkXG5cdFx0XHRcdC8vIHdpdGggdGhlIHNhbWUgaWRlbnRpZmllciBhcyB0aGUgdG91Y2ggZXZlbnQgdGhhdCBwcmV2aW91c2x5IHRyaWdnZXJlZCB0aGUgY2xpY2sgdGhhdCB0cmlnZ2VyZWQgdGhlIGFsZXJ0LlxuXHRcdFx0XHQvLyBTYWRseSwgdGhlcmUgaXMgYW4gaXNzdWUgb24gaU9TIDQgdGhhdCBjYXVzZXMgc29tZSBub3JtYWwgdG91Y2ggZXZlbnRzIHRvIGhhdmUgdGhlIHNhbWUgaWRlbnRpZmllciBhcyBhblxuXHRcdFx0XHQvLyBpbW1lZGlhdGVseSBwcmVjZWVkaW5nIHRvdWNoIGV2ZW50IChpc3N1ZSAjNTIpLCBzbyB0aGlzIGZpeCBpcyB1bmF2YWlsYWJsZSBvbiB0aGF0IHBsYXRmb3JtLlxuXHRcdFx0XHQvLyBJc3N1ZSAxMjA6IHRvdWNoLmlkZW50aWZpZXIgaXMgMCB3aGVuIENocm9tZSBkZXYgdG9vbHMgJ0VtdWxhdGUgdG91Y2ggZXZlbnRzJyBpcyBzZXQgd2l0aCBhbiBpT1MgZGV2aWNlIFVBIHN0cmluZyxcblx0XHRcdFx0Ly8gd2hpY2ggY2F1c2VzIGFsbCB0b3VjaCBldmVudHMgdG8gYmUgaWdub3JlZC4gQXMgdGhpcyBibG9jayBvbmx5IGFwcGxpZXMgdG8gaU9TLCBhbmQgaU9TIGlkZW50aWZpZXJzIGFyZSBhbHdheXMgbG9uZyxcblx0XHRcdFx0Ly8gcmFuZG9tIGludGVnZXJzLCBpdCdzIHNhZmUgdG8gdG8gY29udGludWUgaWYgdGhlIGlkZW50aWZpZXIgaXMgMCBoZXJlLlxuXHRcdFx0XHRpZiAodG91Y2guaWRlbnRpZmllciAmJiB0b3VjaC5pZGVudGlmaWVyID09PSB0aGlzLmxhc3RUb3VjaElkZW50aWZpZXIpIHtcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRoaXMubGFzdFRvdWNoSWRlbnRpZmllciA9IHRvdWNoLmlkZW50aWZpZXI7XG5cblx0XHRcdFx0Ly8gSWYgdGhlIHRhcmdldCBlbGVtZW50IGlzIGEgY2hpbGQgb2YgYSBzY3JvbGxhYmxlIGxheWVyICh1c2luZyAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2gpIGFuZDpcblx0XHRcdFx0Ly8gMSkgdGhlIHVzZXIgZG9lcyBhIGZsaW5nIHNjcm9sbCBvbiB0aGUgc2Nyb2xsYWJsZSBsYXllclxuXHRcdFx0XHQvLyAyKSB0aGUgdXNlciBzdG9wcyB0aGUgZmxpbmcgc2Nyb2xsIHdpdGggYW5vdGhlciB0YXBcblx0XHRcdFx0Ly8gdGhlbiB0aGUgZXZlbnQudGFyZ2V0IG9mIHRoZSBsYXN0ICd0b3VjaGVuZCcgZXZlbnQgd2lsbCBiZSB0aGUgZWxlbWVudCB0aGF0IHdhcyB1bmRlciB0aGUgdXNlcidzIGZpbmdlclxuXHRcdFx0XHQvLyB3aGVuIHRoZSBmbGluZyBzY3JvbGwgd2FzIHN0YXJ0ZWQsIGNhdXNpbmcgRmFzdENsaWNrIHRvIHNlbmQgYSBjbGljayBldmVudCB0byB0aGF0IGxheWVyIC0gdW5sZXNzIGEgY2hlY2tcblx0XHRcdFx0Ly8gaXMgbWFkZSB0byBlbnN1cmUgdGhhdCBhIHBhcmVudCBsYXllciB3YXMgbm90IHNjcm9sbGVkIGJlZm9yZSBzZW5kaW5nIGEgc3ludGhldGljIGNsaWNrIChpc3N1ZSAjNDIpLlxuXHRcdFx0XHR0aGlzLnVwZGF0ZVNjcm9sbFBhcmVudCh0YXJnZXRFbGVtZW50KTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHR0aGlzLnRyYWNraW5nQ2xpY2sgPSB0cnVlO1xuXHRcdHRoaXMudHJhY2tpbmdDbGlja1N0YXJ0ID0gZXZlbnQudGltZVN0YW1wO1xuXHRcdHRoaXMudGFyZ2V0RWxlbWVudCA9IHRhcmdldEVsZW1lbnQ7XG5cblx0XHR0aGlzLnRvdWNoU3RhcnRYID0gdG91Y2gucGFnZVg7XG5cdFx0dGhpcy50b3VjaFN0YXJ0WSA9IHRvdWNoLnBhZ2VZO1xuXG5cdFx0Ly8gUHJldmVudCBwaGFudG9tIGNsaWNrcyBvbiBmYXN0IGRvdWJsZS10YXAgKGlzc3VlICMzNilcblx0XHRpZiAoKGV2ZW50LnRpbWVTdGFtcCAtIHRoaXMubGFzdENsaWNrVGltZSkgPCB0aGlzLnRhcERlbGF5KSB7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIEJhc2VkIG9uIGEgdG91Y2htb3ZlIGV2ZW50IG9iamVjdCwgY2hlY2sgd2hldGhlciB0aGUgdG91Y2ggaGFzIG1vdmVkIHBhc3QgYSBib3VuZGFyeSBzaW5jZSBpdCBzdGFydGVkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUudG91Y2hIYXNNb3ZlZCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0dmFyIHRvdWNoID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0sIGJvdW5kYXJ5ID0gdGhpcy50b3VjaEJvdW5kYXJ5O1xuXG5cdFx0aWYgKE1hdGguYWJzKHRvdWNoLnBhZ2VYIC0gdGhpcy50b3VjaFN0YXJ0WCkgPiBib3VuZGFyeSB8fCBNYXRoLmFicyh0b3VjaC5wYWdlWSAtIHRoaXMudG91Y2hTdGFydFkpID4gYm91bmRhcnkpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBVcGRhdGUgdGhlIGxhc3QgcG9zaXRpb24uXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5vblRvdWNoTW92ZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG5cdFx0aWYgKCF0aGlzLnRyYWNraW5nQ2xpY2spIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIElmIHRoZSB0b3VjaCBoYXMgbW92ZWQsIGNhbmNlbCB0aGUgY2xpY2sgdHJhY2tpbmdcblx0XHRpZiAodGhpcy50YXJnZXRFbGVtZW50ICE9PSB0aGlzLmdldFRhcmdldEVsZW1lbnRGcm9tRXZlbnRUYXJnZXQoZXZlbnQudGFyZ2V0KSB8fCB0aGlzLnRvdWNoSGFzTW92ZWQoZXZlbnQpKSB7XG5cdFx0XHR0aGlzLnRyYWNraW5nQ2xpY2sgPSBmYWxzZTtcblx0XHRcdHRoaXMudGFyZ2V0RWxlbWVudCA9IG51bGw7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH07XG5cblxuXHQvKipcblx0ICogQXR0ZW1wdCB0byBmaW5kIHRoZSBsYWJlbGxlZCBjb250cm9sIGZvciB0aGUgZ2l2ZW4gbGFiZWwgZWxlbWVudC5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudFRhcmdldHxIVE1MTGFiZWxFbGVtZW50fSBsYWJlbEVsZW1lbnRcblx0ICogQHJldHVybnMge0VsZW1lbnR8bnVsbH1cblx0ICovXG5cdEZhc3RDbGljay5wcm90b3R5cGUuZmluZENvbnRyb2wgPSBmdW5jdGlvbihsYWJlbEVsZW1lbnQpIHtcblxuXHRcdC8vIEZhc3QgcGF0aCBmb3IgbmV3ZXIgYnJvd3NlcnMgc3VwcG9ydGluZyB0aGUgSFRNTDUgY29udHJvbCBhdHRyaWJ1dGVcblx0XHRpZiAobGFiZWxFbGVtZW50LmNvbnRyb2wgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuIGxhYmVsRWxlbWVudC5jb250cm9sO1xuXHRcdH1cblxuXHRcdC8vIEFsbCBicm93c2VycyB1bmRlciB0ZXN0IHRoYXQgc3VwcG9ydCB0b3VjaCBldmVudHMgYWxzbyBzdXBwb3J0IHRoZSBIVE1MNSBodG1sRm9yIGF0dHJpYnV0ZVxuXHRcdGlmIChsYWJlbEVsZW1lbnQuaHRtbEZvcikge1xuXHRcdFx0cmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxhYmVsRWxlbWVudC5odG1sRm9yKTtcblx0XHR9XG5cblx0XHQvLyBJZiBubyBmb3IgYXR0cmlidXRlIGV4aXN0cywgYXR0ZW1wdCB0byByZXRyaWV2ZSB0aGUgZmlyc3QgbGFiZWxsYWJsZSBkZXNjZW5kYW50IGVsZW1lbnRcblx0XHQvLyB0aGUgbGlzdCBvZiB3aGljaCBpcyBkZWZpbmVkIGhlcmU6IGh0dHA6Ly93d3cudzMub3JnL1RSL2h0bWw1L2Zvcm1zLmh0bWwjY2F0ZWdvcnktbGFiZWxcblx0XHRyZXR1cm4gbGFiZWxFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbiwgaW5wdXQ6bm90KFt0eXBlPWhpZGRlbl0pLCBrZXlnZW4sIG1ldGVyLCBvdXRwdXQsIHByb2dyZXNzLCBzZWxlY3QsIHRleHRhcmVhJyk7XG5cdH07XG5cblxuXHQvKipcblx0ICogT24gdG91Y2ggZW5kLCBkZXRlcm1pbmUgd2hldGhlciB0byBzZW5kIGEgY2xpY2sgZXZlbnQgYXQgb25jZS5cblx0ICpcblx0ICogQHBhcmFtIHtFdmVudH0gZXZlbnRcblx0ICogQHJldHVybnMge2Jvb2xlYW59XG5cdCAqL1xuXHRGYXN0Q2xpY2sucHJvdG90eXBlLm9uVG91Y2hFbmQgPSBmdW5jdGlvbihldmVudCkge1xuXHRcdHZhciBmb3JFbGVtZW50LCB0cmFja2luZ0NsaWNrU3RhcnQsIHRhcmdldFRhZ05hbWUsIHNjcm9sbFBhcmVudCwgdG91Y2gsIHRhcmdldEVsZW1lbnQgPSB0aGlzLnRhcmdldEVsZW1lbnQ7XG5cblx0XHRpZiAoIXRoaXMudHJhY2tpbmdDbGljaykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gUHJldmVudCBwaGFudG9tIGNsaWNrcyBvbiBmYXN0IGRvdWJsZS10YXAgKGlzc3VlICMzNilcblx0XHRpZiAoKGV2ZW50LnRpbWVTdGFtcCAtIHRoaXMubGFzdENsaWNrVGltZSkgPCB0aGlzLnRhcERlbGF5KSB7XG5cdFx0XHR0aGlzLmNhbmNlbE5leHRDbGljayA9IHRydWU7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAoKGV2ZW50LnRpbWVTdGFtcCAtIHRoaXMudHJhY2tpbmdDbGlja1N0YXJ0KSA+IHRoaXMudGFwVGltZW91dCkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gUmVzZXQgdG8gcHJldmVudCB3cm9uZyBjbGljayBjYW5jZWwgb24gaW5wdXQgKGlzc3VlICMxNTYpLlxuXHRcdHRoaXMuY2FuY2VsTmV4dENsaWNrID0gZmFsc2U7XG5cblx0XHR0aGlzLmxhc3RDbGlja1RpbWUgPSBldmVudC50aW1lU3RhbXA7XG5cblx0XHR0cmFja2luZ0NsaWNrU3RhcnQgPSB0aGlzLnRyYWNraW5nQ2xpY2tTdGFydDtcblx0XHR0aGlzLnRyYWNraW5nQ2xpY2sgPSBmYWxzZTtcblx0XHR0aGlzLnRyYWNraW5nQ2xpY2tTdGFydCA9IDA7XG5cblx0XHQvLyBPbiBzb21lIGlPUyBkZXZpY2VzLCB0aGUgdGFyZ2V0RWxlbWVudCBzdXBwbGllZCB3aXRoIHRoZSBldmVudCBpcyBpbnZhbGlkIGlmIHRoZSBsYXllclxuXHRcdC8vIGlzIHBlcmZvcm1pbmcgYSB0cmFuc2l0aW9uIG9yIHNjcm9sbCwgYW5kIGhhcyB0byBiZSByZS1kZXRlY3RlZCBtYW51YWxseS4gTm90ZSB0aGF0XG5cdFx0Ly8gZm9yIHRoaXMgdG8gZnVuY3Rpb24gY29ycmVjdGx5LCBpdCBtdXN0IGJlIGNhbGxlZCAqYWZ0ZXIqIHRoZSBldmVudCB0YXJnZXQgaXMgY2hlY2tlZCFcblx0XHQvLyBTZWUgaXNzdWUgIzU3OyBhbHNvIGZpbGVkIGFzIHJkYXI6Ly8xMzA0ODU4OSAuXG5cdFx0aWYgKGRldmljZUlzSU9TV2l0aEJhZFRhcmdldCkge1xuXHRcdFx0dG91Y2ggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcblxuXHRcdFx0Ly8gSW4gY2VydGFpbiBjYXNlcyBhcmd1bWVudHMgb2YgZWxlbWVudEZyb21Qb2ludCBjYW4gYmUgbmVnYXRpdmUsIHNvIHByZXZlbnQgc2V0dGluZyB0YXJnZXRFbGVtZW50IHRvIG51bGxcblx0XHRcdHRhcmdldEVsZW1lbnQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KHRvdWNoLnBhZ2VYIC0gd2luZG93LnBhZ2VYT2Zmc2V0LCB0b3VjaC5wYWdlWSAtIHdpbmRvdy5wYWdlWU9mZnNldCkgfHwgdGFyZ2V0RWxlbWVudDtcblx0XHRcdHRhcmdldEVsZW1lbnQuZmFzdENsaWNrU2Nyb2xsUGFyZW50ID0gdGhpcy50YXJnZXRFbGVtZW50LmZhc3RDbGlja1Njcm9sbFBhcmVudDtcblx0XHR9XG5cblx0XHR0YXJnZXRUYWdOYW1lID0gdGFyZ2V0RWxlbWVudC50YWdOYW1lLnRvTG93ZXJDYXNlKCk7XG5cdFx0aWYgKHRhcmdldFRhZ05hbWUgPT09ICdsYWJlbCcpIHtcblx0XHRcdGZvckVsZW1lbnQgPSB0aGlzLmZpbmRDb250cm9sKHRhcmdldEVsZW1lbnQpO1xuXHRcdFx0aWYgKGZvckVsZW1lbnQpIHtcblx0XHRcdFx0dGhpcy5mb2N1cyh0YXJnZXRFbGVtZW50KTtcblx0XHRcdFx0aWYgKGRldmljZUlzQW5kcm9pZCkge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHRhcmdldEVsZW1lbnQgPSBmb3JFbGVtZW50O1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAodGhpcy5uZWVkc0ZvY3VzKHRhcmdldEVsZW1lbnQpKSB7XG5cblx0XHRcdC8vIENhc2UgMTogSWYgdGhlIHRvdWNoIHN0YXJ0ZWQgYSB3aGlsZSBhZ28gKGJlc3QgZ3Vlc3MgaXMgMTAwbXMgYmFzZWQgb24gdGVzdHMgZm9yIGlzc3VlICMzNikgdGhlbiBmb2N1cyB3aWxsIGJlIHRyaWdnZXJlZCBhbnl3YXkuIFJldHVybiBlYXJseSBhbmQgdW5zZXQgdGhlIHRhcmdldCBlbGVtZW50IHJlZmVyZW5jZSBzbyB0aGF0IHRoZSBzdWJzZXF1ZW50IGNsaWNrIHdpbGwgYmUgYWxsb3dlZCB0aHJvdWdoLlxuXHRcdFx0Ly8gQ2FzZSAyOiBXaXRob3V0IHRoaXMgZXhjZXB0aW9uIGZvciBpbnB1dCBlbGVtZW50cyB0YXBwZWQgd2hlbiB0aGUgZG9jdW1lbnQgaXMgY29udGFpbmVkIGluIGFuIGlmcmFtZSwgdGhlbiBhbnkgaW5wdXR0ZWQgdGV4dCB3b24ndCBiZSB2aXNpYmxlIGV2ZW4gdGhvdWdoIHRoZSB2YWx1ZSBhdHRyaWJ1dGUgaXMgdXBkYXRlZCBhcyB0aGUgdXNlciB0eXBlcyAoaXNzdWUgIzM3KS5cblx0XHRcdGlmICgoZXZlbnQudGltZVN0YW1wIC0gdHJhY2tpbmdDbGlja1N0YXJ0KSA+IDEwMCB8fCAoZGV2aWNlSXNJT1MgJiYgd2luZG93LnRvcCAhPT0gd2luZG93ICYmIHRhcmdldFRhZ05hbWUgPT09ICdpbnB1dCcpKSB7XG5cdFx0XHRcdHRoaXMudGFyZ2V0RWxlbWVudCA9IG51bGw7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0dGhpcy5mb2N1cyh0YXJnZXRFbGVtZW50KTtcblx0XHRcdHRoaXMuc2VuZENsaWNrKHRhcmdldEVsZW1lbnQsIGV2ZW50KTtcblxuXHRcdFx0Ly8gU2VsZWN0IGVsZW1lbnRzIG5lZWQgdGhlIGV2ZW50IHRvIGdvIHRocm91Z2ggb24gaU9TIDQsIG90aGVyd2lzZSB0aGUgc2VsZWN0b3IgbWVudSB3b24ndCBvcGVuLlxuXHRcdFx0Ly8gQWxzbyB0aGlzIGJyZWFrcyBvcGVuaW5nIHNlbGVjdHMgd2hlbiBWb2ljZU92ZXIgaXMgYWN0aXZlIG9uIGlPUzYsIGlPUzcgKGFuZCBwb3NzaWJseSBvdGhlcnMpXG5cdFx0XHRpZiAoIWRldmljZUlzSU9TIHx8IHRhcmdldFRhZ05hbWUgIT09ICdzZWxlY3QnKSB7XG5cdFx0XHRcdHRoaXMudGFyZ2V0RWxlbWVudCA9IG51bGw7XG5cdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRpZiAoZGV2aWNlSXNJT1MgJiYgIWRldmljZUlzSU9TNCkge1xuXG5cdFx0XHQvLyBEb24ndCBzZW5kIGEgc3ludGhldGljIGNsaWNrIGV2ZW50IGlmIHRoZSB0YXJnZXQgZWxlbWVudCBpcyBjb250YWluZWQgd2l0aGluIGEgcGFyZW50IGxheWVyIHRoYXQgd2FzIHNjcm9sbGVkXG5cdFx0XHQvLyBhbmQgdGhpcyB0YXAgaXMgYmVpbmcgdXNlZCB0byBzdG9wIHRoZSBzY3JvbGxpbmcgKHVzdWFsbHkgaW5pdGlhdGVkIGJ5IGEgZmxpbmcgLSBpc3N1ZSAjNDIpLlxuXHRcdFx0c2Nyb2xsUGFyZW50ID0gdGFyZ2V0RWxlbWVudC5mYXN0Q2xpY2tTY3JvbGxQYXJlbnQ7XG5cdFx0XHRpZiAoc2Nyb2xsUGFyZW50ICYmIHNjcm9sbFBhcmVudC5mYXN0Q2xpY2tMYXN0U2Nyb2xsVG9wICE9PSBzY3JvbGxQYXJlbnQuc2Nyb2xsVG9wKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIFByZXZlbnQgdGhlIGFjdHVhbCBjbGljayBmcm9tIGdvaW5nIHRob3VnaCAtIHVubGVzcyB0aGUgdGFyZ2V0IG5vZGUgaXMgbWFya2VkIGFzIHJlcXVpcmluZ1xuXHRcdC8vIHJlYWwgY2xpY2tzIG9yIGlmIGl0IGlzIGluIHRoZSB3aGl0ZWxpc3QgaW4gd2hpY2ggY2FzZSBvbmx5IG5vbi1wcm9ncmFtbWF0aWMgY2xpY2tzIGFyZSBwZXJtaXR0ZWQuXG5cdFx0aWYgKCF0aGlzLm5lZWRzQ2xpY2sodGFyZ2V0RWxlbWVudCkpIHtcblx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHR0aGlzLnNlbmRDbGljayh0YXJnZXRFbGVtZW50LCBldmVudCk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xuXG5cblx0LyoqXG5cdCAqIE9uIHRvdWNoIGNhbmNlbCwgc3RvcCB0cmFja2luZyB0aGUgY2xpY2suXG5cdCAqXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5vblRvdWNoQ2FuY2VsID0gZnVuY3Rpb24oKSB7XG5cdFx0dGhpcy50cmFja2luZ0NsaWNrID0gZmFsc2U7XG5cdFx0dGhpcy50YXJnZXRFbGVtZW50ID0gbnVsbDtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmUgbW91c2UgZXZlbnRzIHdoaWNoIHNob3VsZCBiZSBwZXJtaXR0ZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5vbk1vdXNlID0gZnVuY3Rpb24oZXZlbnQpIHtcblxuXHRcdC8vIElmIGEgdGFyZ2V0IGVsZW1lbnQgd2FzIG5ldmVyIHNldCAoYmVjYXVzZSBhIHRvdWNoIGV2ZW50IHdhcyBuZXZlciBmaXJlZCkgYWxsb3cgdGhlIGV2ZW50XG5cdFx0aWYgKCF0aGlzLnRhcmdldEVsZW1lbnQpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGlmIChldmVudC5mb3J3YXJkZWRUb3VjaEV2ZW50KSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBQcm9ncmFtbWF0aWNhbGx5IGdlbmVyYXRlZCBldmVudHMgdGFyZ2V0aW5nIGEgc3BlY2lmaWMgZWxlbWVudCBzaG91bGQgYmUgcGVybWl0dGVkXG5cdFx0aWYgKCFldmVudC5jYW5jZWxhYmxlKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHQvLyBEZXJpdmUgYW5kIGNoZWNrIHRoZSB0YXJnZXQgZWxlbWVudCB0byBzZWUgd2hldGhlciB0aGUgbW91c2UgZXZlbnQgbmVlZHMgdG8gYmUgcGVybWl0dGVkO1xuXHRcdC8vIHVubGVzcyBleHBsaWNpdGx5IGVuYWJsZWQsIHByZXZlbnQgbm9uLXRvdWNoIGNsaWNrIGV2ZW50cyBmcm9tIHRyaWdnZXJpbmcgYWN0aW9ucyxcblx0XHQvLyB0byBwcmV2ZW50IGdob3N0L2RvdWJsZWNsaWNrcy5cblx0XHRpZiAoIXRoaXMubmVlZHNDbGljayh0aGlzLnRhcmdldEVsZW1lbnQpIHx8IHRoaXMuY2FuY2VsTmV4dENsaWNrKSB7XG5cblx0XHRcdC8vIFByZXZlbnQgYW55IHVzZXItYWRkZWQgbGlzdGVuZXJzIGRlY2xhcmVkIG9uIEZhc3RDbGljayBlbGVtZW50IGZyb20gYmVpbmcgZmlyZWQuXG5cdFx0XHRpZiAoZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKSB7XG5cdFx0XHRcdGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHQvLyBQYXJ0IG9mIHRoZSBoYWNrIGZvciBicm93c2VycyB0aGF0IGRvbid0IHN1cHBvcnQgRXZlbnQjc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIChlLmcuIEFuZHJvaWQgMilcblx0XHRcdFx0ZXZlbnQucHJvcGFnYXRpb25TdG9wcGVkID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQ2FuY2VsIHRoZSBldmVudFxuXHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gSWYgdGhlIG1vdXNlIGV2ZW50IGlzIHBlcm1pdHRlZCwgcmV0dXJuIHRydWUgZm9yIHRoZSBhY3Rpb24gdG8gZ28gdGhyb3VnaC5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fTtcblxuXG5cdC8qKlxuXHQgKiBPbiBhY3R1YWwgY2xpY2tzLCBkZXRlcm1pbmUgd2hldGhlciB0aGlzIGlzIGEgdG91Y2gtZ2VuZXJhdGVkIGNsaWNrLCBhIGNsaWNrIGFjdGlvbiBvY2N1cnJpbmdcblx0ICogbmF0dXJhbGx5IGFmdGVyIGEgZGVsYXkgYWZ0ZXIgYSB0b3VjaCAod2hpY2ggbmVlZHMgdG8gYmUgY2FuY2VsbGVkIHRvIGF2b2lkIGR1cGxpY2F0aW9uKSwgb3Jcblx0ICogYW4gYWN0dWFsIGNsaWNrIHdoaWNoIHNob3VsZCBiZSBwZXJtaXR0ZWQuXG5cdCAqXG5cdCAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50XG5cdCAqIEByZXR1cm5zIHtib29sZWFufVxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5vbkNsaWNrID0gZnVuY3Rpb24oZXZlbnQpIHtcblx0XHR2YXIgcGVybWl0dGVkO1xuXG5cdFx0Ly8gSXQncyBwb3NzaWJsZSBmb3IgYW5vdGhlciBGYXN0Q2xpY2stbGlrZSBsaWJyYXJ5IGRlbGl2ZXJlZCB3aXRoIHRoaXJkLXBhcnR5IGNvZGUgdG8gZmlyZSBhIGNsaWNrIGV2ZW50IGJlZm9yZSBGYXN0Q2xpY2sgZG9lcyAoaXNzdWUgIzQ0KS4gSW4gdGhhdCBjYXNlLCBzZXQgdGhlIGNsaWNrLXRyYWNraW5nIGZsYWcgYmFjayB0byBmYWxzZSBhbmQgcmV0dXJuIGVhcmx5LiBUaGlzIHdpbGwgY2F1c2Ugb25Ub3VjaEVuZCB0byByZXR1cm4gZWFybHkuXG5cdFx0aWYgKHRoaXMudHJhY2tpbmdDbGljaykge1xuXHRcdFx0dGhpcy50YXJnZXRFbGVtZW50ID0gbnVsbDtcblx0XHRcdHRoaXMudHJhY2tpbmdDbGljayA9IGZhbHNlO1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gVmVyeSBvZGQgYmVoYXZpb3VyIG9uIGlPUyAoaXNzdWUgIzE4KTogaWYgYSBzdWJtaXQgZWxlbWVudCBpcyBwcmVzZW50IGluc2lkZSBhIGZvcm0gYW5kIHRoZSB1c2VyIGhpdHMgZW50ZXIgaW4gdGhlIGlPUyBzaW11bGF0b3Igb3IgY2xpY2tzIHRoZSBHbyBidXR0b24gb24gdGhlIHBvcC11cCBPUyBrZXlib2FyZCB0aGUgYSBraW5kIG9mICdmYWtlJyBjbGljayBldmVudCB3aWxsIGJlIHRyaWdnZXJlZCB3aXRoIHRoZSBzdWJtaXQtdHlwZSBpbnB1dCBlbGVtZW50IGFzIHRoZSB0YXJnZXQuXG5cdFx0aWYgKGV2ZW50LnRhcmdldC50eXBlID09PSAnc3VibWl0JyAmJiBldmVudC5kZXRhaWwgPT09IDApIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHBlcm1pdHRlZCA9IHRoaXMub25Nb3VzZShldmVudCk7XG5cblx0XHQvLyBPbmx5IHVuc2V0IHRhcmdldEVsZW1lbnQgaWYgdGhlIGNsaWNrIGlzIG5vdCBwZXJtaXR0ZWQuIFRoaXMgd2lsbCBlbnN1cmUgdGhhdCB0aGUgY2hlY2sgZm9yICF0YXJnZXRFbGVtZW50IGluIG9uTW91c2UgZmFpbHMgYW5kIHRoZSBicm93c2VyJ3MgY2xpY2sgZG9lc24ndCBnbyB0aHJvdWdoLlxuXHRcdGlmICghcGVybWl0dGVkKSB7XG5cdFx0XHR0aGlzLnRhcmdldEVsZW1lbnQgPSBudWxsO1xuXHRcdH1cblxuXHRcdC8vIElmIGNsaWNrcyBhcmUgcGVybWl0dGVkLCByZXR1cm4gdHJ1ZSBmb3IgdGhlIGFjdGlvbiB0byBnbyB0aHJvdWdoLlxuXHRcdHJldHVybiBwZXJtaXR0ZWQ7XG5cdH07XG5cblxuXHQvKipcblx0ICogUmVtb3ZlIGFsbCBGYXN0Q2xpY2sncyBldmVudCBsaXN0ZW5lcnMuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHt2b2lkfVxuXHQgKi9cblx0RmFzdENsaWNrLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG5cdFx0dmFyIGxheWVyID0gdGhpcy5sYXllcjtcblxuXHRcdGlmIChkZXZpY2VJc0FuZHJvaWQpIHtcblx0XHRcdGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIHRoaXMub25Nb3VzZSwgdHJ1ZSk7XG5cdFx0XHRsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2UsIHRydWUpO1xuXHRcdFx0bGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMub25Nb3VzZSwgdHJ1ZSk7XG5cdFx0fVxuXG5cdFx0bGF5ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xpY2ssIHRydWUpO1xuXHRcdGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uVG91Y2hTdGFydCwgZmFsc2UpO1xuXHRcdGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMub25Ub3VjaE1vdmUsIGZhbHNlKTtcblx0XHRsYXllci5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMub25Ub3VjaEVuZCwgZmFsc2UpO1xuXHRcdGxheWVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy5vblRvdWNoQ2FuY2VsLCBmYWxzZSk7XG5cdH07XG5cblxuXHQvKipcblx0ICogQ2hlY2sgd2hldGhlciBGYXN0Q2xpY2sgaXMgbmVlZGVkLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGxheWVyIFRoZSBsYXllciB0byBsaXN0ZW4gb25cblx0ICovXG5cdEZhc3RDbGljay5ub3ROZWVkZWQgPSBmdW5jdGlvbihsYXllcikge1xuXHRcdHZhciBtZXRhVmlld3BvcnQ7XG5cdFx0dmFyIGNocm9tZVZlcnNpb247XG5cdFx0dmFyIGJsYWNrYmVycnlWZXJzaW9uO1xuXHRcdHZhciBmaXJlZm94VmVyc2lvbjtcblxuXHRcdC8vIERldmljZXMgdGhhdCBkb24ndCBzdXBwb3J0IHRvdWNoIGRvbid0IG5lZWQgRmFzdENsaWNrXG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cub250b3VjaHN0YXJ0ID09PSAndW5kZWZpbmVkJykge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0Ly8gQ2hyb21lIHZlcnNpb24gLSB6ZXJvIGZvciBvdGhlciBicm93c2Vyc1xuXHRcdGNocm9tZVZlcnNpb24gPSArKC9DaHJvbWVcXC8oWzAtOV0rKS8uZXhlYyhuYXZpZ2F0b3IudXNlckFnZW50KSB8fCBbLDBdKVsxXTtcblxuXHRcdGlmIChjaHJvbWVWZXJzaW9uKSB7XG5cblx0XHRcdGlmIChkZXZpY2VJc0FuZHJvaWQpIHtcblx0XHRcdFx0bWV0YVZpZXdwb3J0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPXZpZXdwb3J0XScpO1xuXG5cdFx0XHRcdGlmIChtZXRhVmlld3BvcnQpIHtcblx0XHRcdFx0XHQvLyBDaHJvbWUgb24gQW5kcm9pZCB3aXRoIHVzZXItc2NhbGFibGU9XCJub1wiIGRvZXNuJ3QgbmVlZCBGYXN0Q2xpY2sgKGlzc3VlICM4OSlcblx0XHRcdFx0XHRpZiAobWV0YVZpZXdwb3J0LmNvbnRlbnQuaW5kZXhPZigndXNlci1zY2FsYWJsZT1ubycpICE9PSAtMSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIENocm9tZSAzMiBhbmQgYWJvdmUgd2l0aCB3aWR0aD1kZXZpY2Utd2lkdGggb3IgbGVzcyBkb24ndCBuZWVkIEZhc3RDbGlja1xuXHRcdFx0XHRcdGlmIChjaHJvbWVWZXJzaW9uID4gMzEgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFdpZHRoIDw9IHdpbmRvdy5vdXRlcldpZHRoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0Ly8gQ2hyb21lIGRlc2t0b3AgZG9lc24ndCBuZWVkIEZhc3RDbGljayAoaXNzdWUgIzE1KVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKGRldmljZUlzQmxhY2tCZXJyeTEwKSB7XG5cdFx0XHRibGFja2JlcnJ5VmVyc2lvbiA9IG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1ZlcnNpb25cXC8oWzAtOV0qKVxcLihbMC05XSopLyk7XG5cblx0XHRcdC8vIEJsYWNrQmVycnkgMTAuMysgZG9lcyBub3QgcmVxdWlyZSBGYXN0Y2xpY2sgbGlicmFyeS5cblx0XHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mdGxhYnMvZmFzdGNsaWNrL2lzc3Vlcy8yNTFcblx0XHRcdGlmIChibGFja2JlcnJ5VmVyc2lvblsxXSA+PSAxMCAmJiBibGFja2JlcnJ5VmVyc2lvblsyXSA+PSAzKSB7XG5cdFx0XHRcdG1ldGFWaWV3cG9ydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21ldGFbbmFtZT12aWV3cG9ydF0nKTtcblxuXHRcdFx0XHRpZiAobWV0YVZpZXdwb3J0KSB7XG5cdFx0XHRcdFx0Ly8gdXNlci1zY2FsYWJsZT1ubyBlbGltaW5hdGVzIGNsaWNrIGRlbGF5LlxuXHRcdFx0XHRcdGlmIChtZXRhVmlld3BvcnQuY29udGVudC5pbmRleE9mKCd1c2VyLXNjYWxhYmxlPW5vJykgIT09IC0xKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gd2lkdGg9ZGV2aWNlLXdpZHRoIChvciBsZXNzIHRoYW4gZGV2aWNlLXdpZHRoKSBlbGltaW5hdGVzIGNsaWNrIGRlbGF5LlxuXHRcdFx0XHRcdGlmIChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsV2lkdGggPD0gd2luZG93Lm91dGVyV2lkdGgpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIElFMTAgd2l0aCAtbXMtdG91Y2gtYWN0aW9uOiBub25lIG9yIG1hbmlwdWxhdGlvbiwgd2hpY2ggZGlzYWJsZXMgZG91YmxlLXRhcC10by16b29tIChpc3N1ZSAjOTcpXG5cdFx0aWYgKGxheWVyLnN0eWxlLm1zVG91Y2hBY3Rpb24gPT09ICdub25lJyB8fCBsYXllci5zdHlsZS50b3VjaEFjdGlvbiA9PT0gJ21hbmlwdWxhdGlvbicpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIEZpcmVmb3ggdmVyc2lvbiAtIHplcm8gZm9yIG90aGVyIGJyb3dzZXJzXG5cdFx0ZmlyZWZveFZlcnNpb24gPSArKC9GaXJlZm94XFwvKFswLTldKykvLmV4ZWMobmF2aWdhdG9yLnVzZXJBZ2VudCkgfHwgWywwXSlbMV07XG5cblx0XHRpZiAoZmlyZWZveFZlcnNpb24gPj0gMjcpIHtcblx0XHRcdC8vIEZpcmVmb3ggMjcrIGRvZXMgbm90IGhhdmUgdGFwIGRlbGF5IGlmIHRoZSBjb250ZW50IGlzIG5vdCB6b29tYWJsZSAtIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTkyMjg5NlxuXG5cdFx0XHRtZXRhVmlld3BvcnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtZXRhW25hbWU9dmlld3BvcnRdJyk7XG5cdFx0XHRpZiAobWV0YVZpZXdwb3J0ICYmIChtZXRhVmlld3BvcnQuY29udGVudC5pbmRleE9mKCd1c2VyLXNjYWxhYmxlPW5vJykgIT09IC0xIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxXaWR0aCA8PSB3aW5kb3cub3V0ZXJXaWR0aCkpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gSUUxMTogcHJlZml4ZWQgLW1zLXRvdWNoLWFjdGlvbiBpcyBubyBsb25nZXIgc3VwcG9ydGVkIGFuZCBpdCdzIHJlY29tZW5kZWQgdG8gdXNlIG5vbi1wcmVmaXhlZCB2ZXJzaW9uXG5cdFx0Ly8gaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L3dpbmRvd3MvYXBwcy9IaDc2NzMxMy5hc3B4XG5cdFx0aWYgKGxheWVyLnN0eWxlLnRvdWNoQWN0aW9uID09PSAnbm9uZScgfHwgbGF5ZXIuc3R5bGUudG91Y2hBY3Rpb24gPT09ICdtYW5pcHVsYXRpb24nKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH07XG5cblxuXHQvKipcblx0ICogRmFjdG9yeSBtZXRob2QgZm9yIGNyZWF0aW5nIGEgRmFzdENsaWNrIG9iamVjdFxuXHQgKlxuXHQgKiBAcGFyYW0ge0VsZW1lbnR9IGxheWVyIFRoZSBsYXllciB0byBsaXN0ZW4gb25cblx0ICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBUaGUgb3B0aW9ucyB0byBvdmVycmlkZSB0aGUgZGVmYXVsdHNcblx0ICovXG5cdEZhc3RDbGljay5hdHRhY2ggPSBmdW5jdGlvbihsYXllciwgb3B0aW9ucykge1xuXHRcdHJldHVybiBuZXcgRmFzdENsaWNrKGxheWVyLCBvcHRpb25zKTtcblx0fTtcblxuXG5cdGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cblx0XHQvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG5cdFx0ZGVmaW5lKGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIEZhc3RDbGljaztcblx0XHR9KTtcblx0fSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gRmFzdENsaWNrLmF0dGFjaDtcblx0XHRtb2R1bGUuZXhwb3J0cy5GYXN0Q2xpY2sgPSBGYXN0Q2xpY2s7XG5cdH0gZWxzZSB7XG5cdFx0d2luZG93LkZhc3RDbGljayA9IEZhc3RDbGljaztcblx0fVxufSgpKTtcbiIsInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnaXMtZnVuY3Rpb24nKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZvckVhY2hcblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuXG5mdW5jdGlvbiBmb3JFYWNoKGxpc3QsIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgaWYgKCFpc0Z1bmN0aW9uKGl0ZXJhdG9yKSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdpdGVyYXRvciBtdXN0IGJlIGEgZnVuY3Rpb24nKVxuICAgIH1cblxuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykge1xuICAgICAgICBjb250ZXh0ID0gdGhpc1xuICAgIH1cbiAgICBcbiAgICBpZiAodG9TdHJpbmcuY2FsbChsaXN0KSA9PT0gJ1tvYmplY3QgQXJyYXldJylcbiAgICAgICAgZm9yRWFjaEFycmF5KGxpc3QsIGl0ZXJhdG9yLCBjb250ZXh0KVxuICAgIGVsc2UgaWYgKHR5cGVvZiBsaXN0ID09PSAnc3RyaW5nJylcbiAgICAgICAgZm9yRWFjaFN0cmluZyhsaXN0LCBpdGVyYXRvciwgY29udGV4dClcbiAgICBlbHNlXG4gICAgICAgIGZvckVhY2hPYmplY3QobGlzdCwgaXRlcmF0b3IsIGNvbnRleHQpXG59XG5cbmZ1bmN0aW9uIGZvckVhY2hBcnJheShhcnJheSwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoYXJyYXksIGkpKSB7XG4gICAgICAgICAgICBpdGVyYXRvci5jYWxsKGNvbnRleHQsIGFycmF5W2ldLCBpLCBhcnJheSlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gZm9yRWFjaFN0cmluZyhzdHJpbmcsIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHN0cmluZy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAvLyBubyBzdWNoIHRoaW5nIGFzIGEgc3BhcnNlIHN0cmluZy5cbiAgICAgICAgaXRlcmF0b3IuY2FsbChjb250ZXh0LCBzdHJpbmcuY2hhckF0KGkpLCBpLCBzdHJpbmcpXG4gICAgfVxufVxuXG5mdW5jdGlvbiBmb3JFYWNoT2JqZWN0KG9iamVjdCwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgICBmb3IgKHZhciBrIGluIG9iamVjdCkge1xuICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGspKSB7XG4gICAgICAgICAgICBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9iamVjdFtrXSwgaywgb2JqZWN0KVxuICAgICAgICB9XG4gICAgfVxufVxuIiwidmFyIHRvcExldmVsID0gdHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcgPyBnbG9iYWwgOlxuICAgIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDoge31cbnZhciBtaW5Eb2MgPSByZXF1aXJlKCdtaW4tZG9jdW1lbnQnKTtcblxuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGRvY3VtZW50O1xufSBlbHNlIHtcbiAgICB2YXIgZG9jY3kgPSB0b3BMZXZlbFsnX19HTE9CQUxfRE9DVU1FTlRfQ0FDSEVANCddO1xuXG4gICAgaWYgKCFkb2NjeSkge1xuICAgICAgICBkb2NjeSA9IHRvcExldmVsWydfX0dMT0JBTF9ET0NVTUVOVF9DQUNIRUA0J10gPSBtaW5Eb2M7XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBkb2NjeTtcbn1cbiIsImlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGdsb2JhbDtcbn0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpe1xuICAgIG1vZHVsZS5leHBvcnRzID0gc2VsZjtcbn0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7fTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFzaE1hdGNoIChoYXNoLCBwcmVmaXgpIHtcbiAgdmFyIHByZSA9IHByZWZpeCB8fCAnLyc7XG4gIGlmIChoYXNoLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHByZTtcbiAgaGFzaCA9IGhhc2gucmVwbGFjZSgnIycsICcnKTtcbiAgaGFzaCA9IGhhc2gucmVwbGFjZSgvXFwvJC8sICcnKVxuICBpZiAoaGFzaC5pbmRleE9mKCcvJykgIT0gMCkgaGFzaCA9ICcvJyArIGhhc2g7XG4gIGlmIChwcmUgPT0gJy8nKSByZXR1cm4gaGFzaDtcbiAgZWxzZSByZXR1cm4gaGFzaC5yZXBsYWNlKHByZSwgJycpO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBhdHRyaWJ1dGVUb1Byb3BlcnR5XG5cbnZhciB0cmFuc2Zvcm0gPSB7XG4gICdjbGFzcyc6ICdjbGFzc05hbWUnLFxuICAnZm9yJzogJ2h0bWxGb3InLFxuICAnaHR0cC1lcXVpdic6ICdodHRwRXF1aXYnXG59XG5cbmZ1bmN0aW9uIGF0dHJpYnV0ZVRvUHJvcGVydHkgKGgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0YWdOYW1lLCBhdHRycywgY2hpbGRyZW4pIHtcbiAgICBmb3IgKHZhciBhdHRyIGluIGF0dHJzKSB7XG4gICAgICBpZiAoYXR0ciBpbiB0cmFuc2Zvcm0pIHtcbiAgICAgICAgYXR0cnNbdHJhbnNmb3JtW2F0dHJdXSA9IGF0dHJzW2F0dHJdXG4gICAgICAgIGRlbGV0ZSBhdHRyc1thdHRyXVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaCh0YWdOYW1lLCBhdHRycywgY2hpbGRyZW4pXG4gIH1cbn1cbiIsInZhciBhdHRyVG9Qcm9wID0gcmVxdWlyZSgnaHlwZXJzY3JpcHQtYXR0cmlidXRlLXRvLXByb3BlcnR5JylcblxudmFyIFZBUiA9IDAsIFRFWFQgPSAxLCBPUEVOID0gMiwgQ0xPU0UgPSAzLCBBVFRSID0gNFxudmFyIEFUVFJfS0VZID0gNSwgQVRUUl9LRVlfVyA9IDZcbnZhciBBVFRSX1ZBTFVFX1cgPSA3LCBBVFRSX1ZBTFVFID0gOFxudmFyIEFUVFJfVkFMVUVfU1EgPSA5LCBBVFRSX1ZBTFVFX0RRID0gMTBcbnZhciBBVFRSX0VRID0gMTEsIEFUVFJfQlJFQUsgPSAxMlxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChoLCBvcHRzKSB7XG4gIGggPSBhdHRyVG9Qcm9wKGgpXG4gIGlmICghb3B0cykgb3B0cyA9IHt9XG4gIHZhciBjb25jYXQgPSBvcHRzLmNvbmNhdCB8fCBmdW5jdGlvbiAoYSwgYikge1xuICAgIHJldHVybiBTdHJpbmcoYSkgKyBTdHJpbmcoYilcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoc3RyaW5ncykge1xuICAgIHZhciBzdGF0ZSA9IFRFWFQsIHJlZyA9ICcnXG4gICAgdmFyIGFyZ2xlbiA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICB2YXIgcGFydHMgPSBbXVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaSA8IGFyZ2xlbiAtIDEpIHtcbiAgICAgICAgdmFyIGFyZyA9IGFyZ3VtZW50c1tpKzFdXG4gICAgICAgIHZhciBwID0gcGFyc2Uoc3RyaW5nc1tpXSlcbiAgICAgICAgdmFyIHhzdGF0ZSA9IHN0YXRlXG4gICAgICAgIGlmICh4c3RhdGUgPT09IEFUVFJfVkFMVUVfRFEpIHhzdGF0ZSA9IEFUVFJfVkFMVUVcbiAgICAgICAgaWYgKHhzdGF0ZSA9PT0gQVRUUl9WQUxVRV9TUSkgeHN0YXRlID0gQVRUUl9WQUxVRVxuICAgICAgICBpZiAoeHN0YXRlID09PSBBVFRSX1ZBTFVFX1cpIHhzdGF0ZSA9IEFUVFJfVkFMVUVcbiAgICAgICAgaWYgKHhzdGF0ZSA9PT0gQVRUUikgeHN0YXRlID0gQVRUUl9LRVlcbiAgICAgICAgcC5wdXNoKFsgVkFSLCB4c3RhdGUsIGFyZyBdKVxuICAgICAgICBwYXJ0cy5wdXNoLmFwcGx5KHBhcnRzLCBwKVxuICAgICAgfSBlbHNlIHBhcnRzLnB1c2guYXBwbHkocGFydHMsIHBhcnNlKHN0cmluZ3NbaV0pKVxuICAgIH1cblxuICAgIHZhciB0cmVlID0gW251bGwse30sW11dXG4gICAgdmFyIHN0YWNrID0gW1t0cmVlLC0xXV1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY3VyID0gc3RhY2tbc3RhY2subGVuZ3RoLTFdWzBdXG4gICAgICB2YXIgcCA9IHBhcnRzW2ldLCBzID0gcFswXVxuICAgICAgaWYgKHMgPT09IE9QRU4gJiYgL15cXC8vLnRlc3QocFsxXSkpIHtcbiAgICAgICAgdmFyIGl4ID0gc3RhY2tbc3RhY2subGVuZ3RoLTFdWzFdXG4gICAgICAgIGlmIChzdGFjay5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgc3RhY2sucG9wKClcbiAgICAgICAgICBzdGFja1tzdGFjay5sZW5ndGgtMV1bMF1bMl1baXhdID0gaChcbiAgICAgICAgICAgIGN1clswXSwgY3VyWzFdLCBjdXJbMl0ubGVuZ3RoID8gY3VyWzJdIDogdW5kZWZpbmVkXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHMgPT09IE9QRU4pIHtcbiAgICAgICAgdmFyIGMgPSBbcFsxXSx7fSxbXV1cbiAgICAgICAgY3VyWzJdLnB1c2goYylcbiAgICAgICAgc3RhY2sucHVzaChbYyxjdXJbMl0ubGVuZ3RoLTFdKVxuICAgICAgfSBlbHNlIGlmIChzID09PSBBVFRSX0tFWSB8fCAocyA9PT0gVkFSICYmIHBbMV0gPT09IEFUVFJfS0VZKSkge1xuICAgICAgICB2YXIga2V5ID0gJydcbiAgICAgICAgdmFyIGNvcHlLZXlcbiAgICAgICAgZm9yICg7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChwYXJ0c1tpXVswXSA9PT0gQVRUUl9LRVkpIHtcbiAgICAgICAgICAgIGtleSA9IGNvbmNhdChrZXksIHBhcnRzW2ldWzFdKVxuICAgICAgICAgIH0gZWxzZSBpZiAocGFydHNbaV1bMF0gPT09IFZBUiAmJiBwYXJ0c1tpXVsxXSA9PT0gQVRUUl9LRVkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFydHNbaV1bMl0gPT09ICdvYmplY3QnICYmICFrZXkpIHtcbiAgICAgICAgICAgICAgZm9yIChjb3B5S2V5IGluIHBhcnRzW2ldWzJdKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnRzW2ldWzJdLmhhc093blByb3BlcnR5KGNvcHlLZXkpICYmICFjdXJbMV1bY29weUtleV0pIHtcbiAgICAgICAgICAgICAgICAgIGN1clsxXVtjb3B5S2V5XSA9IHBhcnRzW2ldWzJdW2NvcHlLZXldXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBrZXkgPSBjb25jYXQoa2V5LCBwYXJ0c1tpXVsyXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgYnJlYWtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFydHNbaV1bMF0gPT09IEFUVFJfRVEpIGkrK1xuICAgICAgICB2YXIgaiA9IGlcbiAgICAgICAgZm9yICg7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChwYXJ0c1tpXVswXSA9PT0gQVRUUl9WQUxVRSB8fCBwYXJ0c1tpXVswXSA9PT0gQVRUUl9LRVkpIHtcbiAgICAgICAgICAgIGlmICghY3VyWzFdW2tleV0pIGN1clsxXVtrZXldID0gc3RyZm4ocGFydHNbaV1bMV0pXG4gICAgICAgICAgICBlbHNlIGN1clsxXVtrZXldID0gY29uY2F0KGN1clsxXVtrZXldLCBwYXJ0c1tpXVsxXSlcbiAgICAgICAgICB9IGVsc2UgaWYgKHBhcnRzW2ldWzBdID09PSBWQVJcbiAgICAgICAgICAmJiAocGFydHNbaV1bMV0gPT09IEFUVFJfVkFMVUUgfHwgcGFydHNbaV1bMV0gPT09IEFUVFJfS0VZKSkge1xuICAgICAgICAgICAgaWYgKCFjdXJbMV1ba2V5XSkgY3VyWzFdW2tleV0gPSBzdHJmbihwYXJ0c1tpXVsyXSlcbiAgICAgICAgICAgIGVsc2UgY3VyWzFdW2tleV0gPSBjb25jYXQoY3VyWzFdW2tleV0sIHBhcnRzW2ldWzJdKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoa2V5Lmxlbmd0aCAmJiAhY3VyWzFdW2tleV0gJiYgaSA9PT0galxuICAgICAgICAgICAgJiYgKHBhcnRzW2ldWzBdID09PSBDTE9TRSB8fCBwYXJ0c1tpXVswXSA9PT0gQVRUUl9CUkVBSykpIHtcbiAgICAgICAgICAgICAgLy8gaHR0cHM6Ly9odG1sLnNwZWMud2hhdHdnLm9yZy9tdWx0aXBhZ2UvaW5mcmFzdHJ1Y3R1cmUuaHRtbCNib29sZWFuLWF0dHJpYnV0ZXNcbiAgICAgICAgICAgICAgLy8gZW1wdHkgc3RyaW5nIGlzIGZhbHN5LCBub3Qgd2VsbCBiZWhhdmVkIHZhbHVlIGluIGJyb3dzZXJcbiAgICAgICAgICAgICAgY3VyWzFdW2tleV0gPSBrZXkudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocyA9PT0gQVRUUl9LRVkpIHtcbiAgICAgICAgY3VyWzFdW3BbMV1dID0gdHJ1ZVxuICAgICAgfSBlbHNlIGlmIChzID09PSBWQVIgJiYgcFsxXSA9PT0gQVRUUl9LRVkpIHtcbiAgICAgICAgY3VyWzFdW3BbMl1dID0gdHJ1ZVxuICAgICAgfSBlbHNlIGlmIChzID09PSBDTE9TRSkge1xuICAgICAgICBpZiAoc2VsZkNsb3NpbmcoY3VyWzBdKSAmJiBzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICB2YXIgaXggPSBzdGFja1tzdGFjay5sZW5ndGgtMV1bMV1cbiAgICAgICAgICBzdGFjay5wb3AoKVxuICAgICAgICAgIHN0YWNrW3N0YWNrLmxlbmd0aC0xXVswXVsyXVtpeF0gPSBoKFxuICAgICAgICAgICAgY3VyWzBdLCBjdXJbMV0sIGN1clsyXS5sZW5ndGggPyBjdXJbMl0gOiB1bmRlZmluZWRcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocyA9PT0gVkFSICYmIHBbMV0gPT09IFRFWFQpIHtcbiAgICAgICAgaWYgKHBbMl0gPT09IHVuZGVmaW5lZCB8fCBwWzJdID09PSBudWxsKSBwWzJdID0gJydcbiAgICAgICAgZWxzZSBpZiAoIXBbMl0pIHBbMl0gPSBjb25jYXQoJycsIHBbMl0pXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHBbMl1bMF0pKSB7XG4gICAgICAgICAgY3VyWzJdLnB1c2guYXBwbHkoY3VyWzJdLCBwWzJdKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGN1clsyXS5wdXNoKHBbMl0pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocyA9PT0gVEVYVCkge1xuICAgICAgICBjdXJbMl0ucHVzaChwWzFdKVxuICAgICAgfSBlbHNlIGlmIChzID09PSBBVFRSX0VRIHx8IHMgPT09IEFUVFJfQlJFQUspIHtcbiAgICAgICAgLy8gbm8tb3BcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5oYW5kbGVkOiAnICsgcylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHJlZVsyXS5sZW5ndGggPiAxICYmIC9eXFxzKiQvLnRlc3QodHJlZVsyXVswXSkpIHtcbiAgICAgIHRyZWVbMl0uc2hpZnQoKVxuICAgIH1cblxuICAgIGlmICh0cmVlWzJdLmxlbmd0aCA+IDJcbiAgICB8fCAodHJlZVsyXS5sZW5ndGggPT09IDIgJiYgL1xcUy8udGVzdCh0cmVlWzJdWzFdKSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ211bHRpcGxlIHJvb3QgZWxlbWVudHMgbXVzdCBiZSB3cmFwcGVkIGluIGFuIGVuY2xvc2luZyB0YWcnXG4gICAgICApXG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KHRyZWVbMl1bMF0pICYmIHR5cGVvZiB0cmVlWzJdWzBdWzBdID09PSAnc3RyaW5nJ1xuICAgICYmIEFycmF5LmlzQXJyYXkodHJlZVsyXVswXVsyXSkpIHtcbiAgICAgIHRyZWVbMl1bMF0gPSBoKHRyZWVbMl1bMF1bMF0sIHRyZWVbMl1bMF1bMV0sIHRyZWVbMl1bMF1bMl0pXG4gICAgfVxuICAgIHJldHVybiB0cmVlWzJdWzBdXG5cbiAgICBmdW5jdGlvbiBwYXJzZSAoc3RyKSB7XG4gICAgICB2YXIgcmVzID0gW11cbiAgICAgIGlmIChzdGF0ZSA9PT0gQVRUUl9WQUxVRV9XKSBzdGF0ZSA9IEFUVFJcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjID0gc3RyLmNoYXJBdChpKVxuICAgICAgICBpZiAoc3RhdGUgPT09IFRFWFQgJiYgYyA9PT0gJzwnKSB7XG4gICAgICAgICAgaWYgKHJlZy5sZW5ndGgpIHJlcy5wdXNoKFtURVhULCByZWddKVxuICAgICAgICAgIHJlZyA9ICcnXG4gICAgICAgICAgc3RhdGUgPSBPUEVOXG4gICAgICAgIH0gZWxzZSBpZiAoYyA9PT0gJz4nICYmICFxdW90KHN0YXRlKSkge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gT1BFTikge1xuICAgICAgICAgICAgcmVzLnB1c2goW09QRU4scmVnXSlcbiAgICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX0tFWSkge1xuICAgICAgICAgICAgcmVzLnB1c2goW0FUVFJfS0VZLHJlZ10pXG4gICAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9WQUxVRSAmJiByZWcubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXMucHVzaChbQVRUUl9WQUxVRSxyZWddKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXMucHVzaChbQ0xPU0VdKVxuICAgICAgICAgIHJlZyA9ICcnXG4gICAgICAgICAgc3RhdGUgPSBURVhUXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IFRFWFQpIHtcbiAgICAgICAgICByZWcgKz0gY1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBPUEVOICYmIC9cXHMvLnRlc3QoYykpIHtcbiAgICAgICAgICByZXMucHVzaChbT1BFTiwgcmVnXSlcbiAgICAgICAgICByZWcgPSAnJ1xuICAgICAgICAgIHN0YXRlID0gQVRUUlxuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBPUEVOKSB7XG4gICAgICAgICAgcmVnICs9IGNcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUiAmJiAvW1xcdy1dLy50ZXN0KGMpKSB7XG4gICAgICAgICAgc3RhdGUgPSBBVFRSX0tFWVxuICAgICAgICAgIHJlZyA9IGNcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUiAmJiAvXFxzLy50ZXN0KGMpKSB7XG4gICAgICAgICAgaWYgKHJlZy5sZW5ndGgpIHJlcy5wdXNoKFtBVFRSX0tFWSxyZWddKVxuICAgICAgICAgIHJlcy5wdXNoKFtBVFRSX0JSRUFLXSlcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9LRVkgJiYgL1xccy8udGVzdChjKSkge1xuICAgICAgICAgIHJlcy5wdXNoKFtBVFRSX0tFWSxyZWddKVxuICAgICAgICAgIHJlZyA9ICcnXG4gICAgICAgICAgc3RhdGUgPSBBVFRSX0tFWV9XXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfS0VZICYmIGMgPT09ICc9Jykge1xuICAgICAgICAgIHJlcy5wdXNoKFtBVFRSX0tFWSxyZWddLFtBVFRSX0VRXSlcbiAgICAgICAgICByZWcgPSAnJ1xuICAgICAgICAgIHN0YXRlID0gQVRUUl9WQUxVRV9XXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfS0VZKSB7XG4gICAgICAgICAgcmVnICs9IGNcbiAgICAgICAgfSBlbHNlIGlmICgoc3RhdGUgPT09IEFUVFJfS0VZX1cgfHwgc3RhdGUgPT09IEFUVFIpICYmIGMgPT09ICc9Jykge1xuICAgICAgICAgIHJlcy5wdXNoKFtBVFRSX0VRXSlcbiAgICAgICAgICBzdGF0ZSA9IEFUVFJfVkFMVUVfV1xuICAgICAgICB9IGVsc2UgaWYgKChzdGF0ZSA9PT0gQVRUUl9LRVlfVyB8fCBzdGF0ZSA9PT0gQVRUUikgJiYgIS9cXHMvLnRlc3QoYykpIHtcbiAgICAgICAgICByZXMucHVzaChbQVRUUl9CUkVBS10pXG4gICAgICAgICAgaWYgKC9bXFx3LV0vLnRlc3QoYykpIHtcbiAgICAgICAgICAgIHJlZyArPSBjXG4gICAgICAgICAgICBzdGF0ZSA9IEFUVFJfS0VZXG4gICAgICAgICAgfSBlbHNlIHN0YXRlID0gQVRUUlxuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX1ZBTFVFX1cgJiYgYyA9PT0gJ1wiJykge1xuICAgICAgICAgIHN0YXRlID0gQVRUUl9WQUxVRV9EUVxuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX1ZBTFVFX1cgJiYgYyA9PT0gXCInXCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEFUVFJfVkFMVUVfU1FcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9WQUxVRV9EUSAmJiBjID09PSAnXCInKSB7XG4gICAgICAgICAgcmVzLnB1c2goW0FUVFJfVkFMVUUscmVnXSxbQVRUUl9CUkVBS10pXG4gICAgICAgICAgcmVnID0gJydcbiAgICAgICAgICBzdGF0ZSA9IEFUVFJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9WQUxVRV9TUSAmJiBjID09PSBcIidcIikge1xuICAgICAgICAgIHJlcy5wdXNoKFtBVFRSX1ZBTFVFLHJlZ10sW0FUVFJfQlJFQUtdKVxuICAgICAgICAgIHJlZyA9ICcnXG4gICAgICAgICAgc3RhdGUgPSBBVFRSXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUVfVyAmJiAhL1xccy8udGVzdChjKSkge1xuICAgICAgICAgIHN0YXRlID0gQVRUUl9WQUxVRVxuICAgICAgICAgIGktLVxuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX1ZBTFVFICYmIC9cXHMvLnRlc3QoYykpIHtcbiAgICAgICAgICByZXMucHVzaChbQVRUUl9WQUxVRSxyZWddLFtBVFRSX0JSRUFLXSlcbiAgICAgICAgICByZWcgPSAnJ1xuICAgICAgICAgIHN0YXRlID0gQVRUUlxuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX1ZBTFVFIHx8IHN0YXRlID09PSBBVFRSX1ZBTFVFX1NRXG4gICAgICAgIHx8IHN0YXRlID09PSBBVFRSX1ZBTFVFX0RRKSB7XG4gICAgICAgICAgcmVnICs9IGNcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN0YXRlID09PSBURVhUICYmIHJlZy5sZW5ndGgpIHtcbiAgICAgICAgcmVzLnB1c2goW1RFWFQscmVnXSlcbiAgICAgICAgcmVnID0gJydcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUUgJiYgcmVnLmxlbmd0aCkge1xuICAgICAgICByZXMucHVzaChbQVRUUl9WQUxVRSxyZWddKVxuICAgICAgICByZWcgPSAnJ1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9WQUxVRV9EUSAmJiByZWcubGVuZ3RoKSB7XG4gICAgICAgIHJlcy5wdXNoKFtBVFRSX1ZBTFVFLHJlZ10pXG4gICAgICAgIHJlZyA9ICcnXG4gICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX1ZBTFVFX1NRICYmIHJlZy5sZW5ndGgpIHtcbiAgICAgICAgcmVzLnB1c2goW0FUVFJfVkFMVUUscmVnXSlcbiAgICAgICAgcmVnID0gJydcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfS0VZKSB7XG4gICAgICAgIHJlcy5wdXNoKFtBVFRSX0tFWSxyZWddKVxuICAgICAgICByZWcgPSAnJ1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0cmZuICh4KSB7XG4gICAgaWYgKHR5cGVvZiB4ID09PSAnZnVuY3Rpb24nKSByZXR1cm4geFxuICAgIGVsc2UgaWYgKHR5cGVvZiB4ID09PSAnc3RyaW5nJykgcmV0dXJuIHhcbiAgICBlbHNlIGlmICh4ICYmIHR5cGVvZiB4ID09PSAnb2JqZWN0JykgcmV0dXJuIHhcbiAgICBlbHNlIHJldHVybiBjb25jYXQoJycsIHgpXG4gIH1cbn1cblxuZnVuY3Rpb24gcXVvdCAoc3RhdGUpIHtcbiAgcmV0dXJuIHN0YXRlID09PSBBVFRSX1ZBTFVFX1NRIHx8IHN0YXRlID09PSBBVFRSX1ZBTFVFX0RRXG59XG5cbnZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5XG5mdW5jdGlvbiBoYXMgKG9iaiwga2V5KSB7IHJldHVybiBoYXNPd24uY2FsbChvYmosIGtleSkgfVxuXG52YXIgY2xvc2VSRSA9IFJlZ0V4cCgnXignICsgW1xuICAnYXJlYScsICdiYXNlJywgJ2Jhc2Vmb250JywgJ2Jnc291bmQnLCAnYnInLCAnY29sJywgJ2NvbW1hbmQnLCAnZW1iZWQnLFxuICAnZnJhbWUnLCAnaHInLCAnaW1nJywgJ2lucHV0JywgJ2lzaW5kZXgnLCAna2V5Z2VuJywgJ2xpbmsnLCAnbWV0YScsICdwYXJhbScsXG4gICdzb3VyY2UnLCAndHJhY2snLCAnd2JyJyxcbiAgLy8gU1ZHIFRBR1NcbiAgJ2FuaW1hdGUnLCAnYW5pbWF0ZVRyYW5zZm9ybScsICdjaXJjbGUnLCAnY3Vyc29yJywgJ2Rlc2MnLCAnZWxsaXBzZScsXG4gICdmZUJsZW5kJywgJ2ZlQ29sb3JNYXRyaXgnLCAnZmVDb21wb3NpdGUnLFxuICAnZmVDb252b2x2ZU1hdHJpeCcsICdmZURpZmZ1c2VMaWdodGluZycsICdmZURpc3BsYWNlbWVudE1hcCcsXG4gICdmZURpc3RhbnRMaWdodCcsICdmZUZsb29kJywgJ2ZlRnVuY0EnLCAnZmVGdW5jQicsICdmZUZ1bmNHJywgJ2ZlRnVuY1InLFxuICAnZmVHYXVzc2lhbkJsdXInLCAnZmVJbWFnZScsICdmZU1lcmdlTm9kZScsICdmZU1vcnBob2xvZ3knLFxuICAnZmVPZmZzZXQnLCAnZmVQb2ludExpZ2h0JywgJ2ZlU3BlY3VsYXJMaWdodGluZycsICdmZVNwb3RMaWdodCcsICdmZVRpbGUnLFxuICAnZmVUdXJidWxlbmNlJywgJ2ZvbnQtZmFjZS1mb3JtYXQnLCAnZm9udC1mYWNlLW5hbWUnLCAnZm9udC1mYWNlLXVyaScsXG4gICdnbHlwaCcsICdnbHlwaFJlZicsICdoa2VybicsICdpbWFnZScsICdsaW5lJywgJ21pc3NpbmctZ2x5cGgnLCAnbXBhdGgnLFxuICAncGF0aCcsICdwb2x5Z29uJywgJ3BvbHlsaW5lJywgJ3JlY3QnLCAnc2V0JywgJ3N0b3AnLCAndHJlZicsICd1c2UnLCAndmlldycsXG4gICd2a2Vybidcbl0uam9pbignfCcpICsgJykoPzpbXFwuI11bYS16QS1aMC05XFx1MDA3Ri1cXHVGRkZGXzotXSspKiQnKVxuZnVuY3Rpb24gc2VsZkNsb3NpbmcgKHRhZykgeyByZXR1cm4gY2xvc2VSRS50ZXN0KHRhZykgfVxuIiwibW9kdWxlLmV4cG9ydHMgPSBpc0Z1bmN0aW9uXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdcblxuZnVuY3Rpb24gaXNGdW5jdGlvbiAoZm4pIHtcbiAgdmFyIHN0cmluZyA9IHRvU3RyaW5nLmNhbGwoZm4pXG4gIHJldHVybiBzdHJpbmcgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXScgfHxcbiAgICAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nICYmIHN0cmluZyAhPT0gJ1tvYmplY3QgUmVnRXhwXScpIHx8XG4gICAgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgIC8vIElFOCBhbmQgYmVsb3dcbiAgICAgKGZuID09PSB3aW5kb3cuc2V0VGltZW91dCB8fFxuICAgICAgZm4gPT09IHdpbmRvdy5hbGVydCB8fFxuICAgICAgZm4gPT09IHdpbmRvdy5jb25maXJtIHx8XG4gICAgICBmbiA9PT0gd2luZG93LnByb21wdCkpXG59O1xuIiwibW9kdWxlLmV4cG9ydHM9W1xuICB7XG4gICAgXCJpZFwiOiBcImFhdHJveFwiLFxuICAgIFwia2V5XCI6IFwiMjY2XCIsXG4gICAgXCJuYW1lXCI6IFwiQWF0cm94XCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBEYXJraW4gQmxhZGVcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIlRhbmtcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUzNy44LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg1LFxuICAgICAgXCJtcFwiOiAxMDUuNixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0NSxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0NSxcbiAgICAgIFwiYXJtb3JcIjogMjQuMzg0LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuOCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDYuNTksXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjUsXG4gICAgICBcIm1wcmVnZW5cIjogMCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA2MC4zNzYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMixcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDQsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogM1xuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9BYXRyb3gucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogMCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiQWF0cm94IGlzIGEgbGVnZW5kYXJ5IHdhcnJpb3IsIG9uZSBvZiBvbmx5IGZpdmUgdGhhdCByZW1haW4gb2YgYW4gYW5jaWVudCByYWNlIGtub3duIGFzIHRoZSBEYXJraW4uIEhlIHdpZWxkcyBoaXMgbWFzc2l2ZSBibGFkZSB3aXRoIGdyYWNlIGFuZCBwb2lzZSwgc2xpY2luZyB0aHJvdWdoIGxlZ2lvbnMgaW4gYSBzdHlsZSB0aGF0IGlzIGh5cG5vdGljIHRvIGJlaG9sZC4gV2l0aCBlYWNoIGZvZSBmZWxsZWQsIEFhdHJveCdzIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiYWhyaVwiLFxuICAgIFwia2V5XCI6IFwiMTAzXCIsXG4gICAgXCJuYW1lXCI6IFwiQWhyaVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgTmluZS1UYWlsZWQgRm94XCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiLFxuICAgICAgXCJBc3Nhc3NpblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTE0LjQsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODAsXG4gICAgICBcIm1wXCI6IDMzNCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA1MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzMCxcbiAgICAgIFwiYXJtb3JcIjogMjAuODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDYuNTA1LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1My4wNCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDY1LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDJcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vQWhyaS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiA0OCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVW5saWtlIG90aGVyIGZveGVzIHRoYXQgcm9hbWVkIHRoZSB3b29kcyBvZiBzb3V0aGVybiBJb25pYSwgQWhyaSBoYWQgYWx3YXlzIGZlbHQgYSBzdHJhbmdlIGNvbm5lY3Rpb24gdG8gdGhlIG1hZ2ljYWwgd29ybGQgYXJvdW5kIGhlcjsgYSBjb25uZWN0aW9uIHRoYXQgd2FzIHNvbWVob3cgaW5jb21wbGV0ZS4gRGVlcCBpbnNpZGUsIHNoZSBmZWx0IHRoZSBza2luIHNoZSBoYWQgYmVlbiBib3JuIGludG8gd2FzIGFuIGlsbCBmaXQgZm9yIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiYWthbGlcIixcbiAgICBcImtleVwiOiBcIjg0XCIsXG4gICAgXCJuYW1lXCI6IFwiQWthbGlcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEZpc3Qgb2YgU2hhZG93XCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiQXNzYXNzaW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU4Ny44LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg1LFxuICAgICAgXCJtcFwiOiAyMDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM1MCxcbiAgICAgIFwiYXJtb3JcIjogMjYuMzgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOC4zNCxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNjUsXG4gICAgICBcIm1wcmVnZW5cIjogNTAsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTguMzc2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjIsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjEsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMy4xXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0FrYWxpLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDk2LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUaGVyZSBleGlzdHMgYW4gYW5jaWVudCBvcmRlciBvcmlnaW5hdGluZyBpbiB0aGUgSW9uaWFuIElzbGVzIGRlZGljYXRlZCB0byB0aGUgcHJlc2VydmF0aW9uIG9mIGJhbGFuY2UuIE9yZGVyLCBjaGFvcywgbGlnaHQsIGRhcmtuZXNzIC0tIGFsbCB0aGluZ3MgbXVzdCBleGlzdCBpbiBwZXJmZWN0IGhhcm1vbnkgZm9yIHN1Y2ggaXMgdGhlIHdheSBvZiB0aGUgdW5pdmVyc2UuIFRoaXMgb3JkZXIgaXMga25vd24gYXMgdGhlIEtpbmtvdSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImFsaXN0YXJcIixcbiAgICBcImtleVwiOiBcIjEyXCIsXG4gICAgXCJuYW1lXCI6IFwiQWxpc3RhclwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgTWlub3RhdXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJUYW5rXCIsXG4gICAgICBcIlN1cHBvcnRcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDYxMy4zNixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiAxMDYsXG4gICAgICBcIm1wXCI6IDI3OC44NCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAzOCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzMCxcbiAgICAgIFwiYXJtb3JcIjogMjQuMzgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOC42NzUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjg1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDguNSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDYxLjExMTYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuNjIsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi4xMjVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vQWxpc3Rhci5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiAxNDQsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkFzIHRoZSBtaWdodGllc3Qgd2FycmlvciB0byBldmVyIGVtZXJnZSBmcm9tIHRoZSBNaW5vdGF1ciB0cmliZXMgb2YgdGhlIEdyZWF0IEJhcnJpZXIsIEFsaXN0YXIgZGVmZW5kZWQgaGlzIHRyaWJlIGZyb20gVmFsb3JhbidzIG1hbnkgZGFuZ2VyczsgdGhhdCBpcywgdW50aWwgdGhlIGNvbWluZyBvZiB0aGUgTm94aWFuIGFybXkuIEFsaXN0YXIgd2FzIGx1cmVkIGZyb20gaGlzIHZpbGxhZ2UgYnkgdGhlIG1hY2hpbmF0aW9ucyBvZiAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImFtdW11XCIsXG4gICAgXCJrZXlcIjogXCIzMlwiLFxuICAgIFwibmFtZVwiOiBcIkFtdW11XCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBTYWQgTXVtbXlcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJUYW5rXCIsXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDYxMy4xMixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NCxcbiAgICAgIFwibXBcIjogMjg3LjIsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDIzLjU0NCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjgsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA4Ljg3NSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuODUsXG4gICAgICBcIm1wcmVnZW5cIjogNy4zOCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNTI1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTMuMzg0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjgsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjAyLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuMThcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vQW11bXUucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogMTkyLFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ1NvbGl0dWRlIGNhbiBiZSBsb25lbGllciB0aGFuIGRlYXRoLicnPGJyPjxicj5BIGxvbmVseSBhbmQgbWVsYW5jaG9seSBzb3VsIGZyb20gYW5jaWVudCBTaHVyaW1hLCBBbXVtdSByb2FtcyB0aGUgd29ybGQgaW4gc2VhcmNoIG9mIGEgZnJpZW5kLiBDdXJzZWQgYnkgYW4gYW5jaWVudCBzcGVsbCwgaGUgaXMgZG9vbWVkIHRvIHJlbWFpbiBhbG9uZSBmb3JldmVyLCBhcyBoaXMgdG91Y2ggaXMgZGVhdGggYW5kIGhpcyBhZmZlY3Rpb24gLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJhbml2aWFcIixcbiAgICBcImtleVwiOiBcIjM0XCIsXG4gICAgXCJuYW1lXCI6IFwiQW5pdmlhXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBDcnlvcGhvZW5peFwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIixcbiAgICAgIFwiU3VwcG9ydFwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNDY3LjYsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNzAsXG4gICAgICBcIm1wXCI6IDM5Ni4wNCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA1MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMyNSxcbiAgICAgIFwiYXJtb3JcIjogMjEuMjIsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogNCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDYwMCxcbiAgICAgIFwiaHByZWdlblwiOiA1LjU3LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTEuMzc2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjIsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMS42OFxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9Bbml2aWEucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogMjQwLFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJBbml2aWEgaXMgYSBiZWluZyBvZiB0aGUgY29sZGVzdCB3aW50ZXIsIGEgbXlzdGljYWwgZW1ib2RpbWVudCBvZiBpY2UgbWFnaWMsIGFuZCBhbiBhbmNpZW50IHByb3RlY3RvciBvZiB0aGUgRnJlbGpvcmQuIFNoZSBjb21tYW5kcyBhbGwgdGhlIHBvd2VyIGFuZCBmdXJ5IG9mIHRoZSBsYW5kIGl0c2VsZiwgY2FsbGluZyB0aGUgc25vdyBhbmQgYml0dGVyIHdpbmQgdG8gZGVmZW5kIGhlciBob21lIGZyb20gdGhvc2Ugd2hvIHdvdWxkIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiYW5uaWVcIixcbiAgICBcImtleVwiOiBcIjFcIixcbiAgICBcIm5hbWVcIjogXCJBbm5pZVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgRGFyayBDaGlsZFwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUxMS42OCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA3NixcbiAgICAgIFwibXBcIjogMzM0LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDUwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAxOS4yMixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiA0LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTc1LFxuICAgICAgXCJocHJlZ2VuXCI6IDUuNDIsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1MC40MSxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMi42MjUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAuMDgsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMS4zNlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9Bbm5pZS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiAyODgsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRoZXJlIGhhdmUgYWx3YXlzIGJlZW4gdGhvc2Ugd2l0aGluIE5veHVzIHdobyBkaWQgbm90IGFncmVlIHdpdGggdGhlIGV2aWxzIHBlcnBldHJhdGVkIGJ5IHRoZSBOb3hpYW4gSGlnaCBDb21tYW5kLiBUaGUgSGlnaCBDb21tYW5kIGhhZCBqdXN0IHB1dCBkb3duIGEgY291cCBhdHRlbXB0IGZyb20gdGhlIHNlbGYtcHJvY2xhaW1lZCBDcm93biBQcmluY2UgUmFzY2hhbGxpb24sIGFuZCBhIGNyYWNrZG93biBvbiBhbnkgZm9ybSBvZiAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImFzaGVcIixcbiAgICBcImtleVwiOiBcIjIyXCIsXG4gICAgXCJuYW1lXCI6IFwiQXNoZVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgRnJvc3QgQXJjaGVyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFya3NtYW5cIixcbiAgICAgIFwiU3VwcG9ydFwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTI3LjcyLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDc5LFxuICAgICAgXCJtcFwiOiAyODAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMzIsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMjUsXG4gICAgICBcImFybW9yXCI6IDIxLjIxMixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjQsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA2MDAsXG4gICAgICBcImhwcmVnZW5cIjogNS40MixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogNi45NyxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU2LjUwOCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMi4yNixcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDUsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMy4zM1xuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9Bc2hlLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDMzNixcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiV2l0aCBlYWNoIGFycm93IHNoZSBmaXJlcyBmcm9tIGhlciBhbmNpZW50IGljZS1lbmNoYW50ZWQgYm93LCBBc2hlIHByb3ZlcyBzaGUgaXMgYSBtYXN0ZXIgYXJjaGVyLiBTaGUgY2hvb3NlcyBlYWNoIHRhcmdldCBjYXJlZnVsbHksIHdhaXRzIGZvciB0aGUgcmlnaHQgbW9tZW50LCBhbmQgdGhlbiBzdHJpa2VzIHdpdGggcG93ZXIgYW5kIHByZWNpc2lvbi4gSXQgaXMgd2l0aCB0aGlzIHNhbWUgdmlzaW9uIGFuZCBmb2N1cyB0aGF0IHNoZSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImF1cmVsaW9uc29sXCIsXG4gICAgXCJrZXlcIjogXCIxMzZcIixcbiAgICBcIm5hbWVcIjogXCJBdXJlbGlvbiBTb2xcIixcbiAgICBcInRpdGxlXCI6IFwiVGhlIFN0YXIgRm9yZ2VyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiLFxuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NTAsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODAsXG4gICAgICBcIm1wXCI6IDM1MCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA1MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMyNSxcbiAgICAgIFwiYXJtb3JcIjogMTksXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy42LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDYuNSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNixcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTcsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMixcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAxLjM2XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0F1cmVsaW9uU29sLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDM4NCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiQXVyZWxpb24gU29swqBvbmNlwqBncmFjZWQgdGhlIHZhc3QgZW1wdGluZXNzIG9mIHRoZSBjb3Ntb3Mgd2l0aCBjZWxlc3RpYWwgd29uZGVycyBvZiBoaXMgb3duIGRldmlzaW5nLiBOb3csIGhlIGlzIGZvcmNlZCB0byB3aWVsZCBoaXMgYXdlc29tZSBwb3dlciBhdCB0aGUgYmVoZXN0IG9mIGEgc3BhY2UtZmFyaW5nIGVtcGlyZSB0aGF0IHRyaWNrZWQgaGltIGludG8gc2Vydml0dWRlLiBEZXNpcmluZyBhIHJldHVybiB0byBoaXMgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJhemlyXCIsXG4gICAgXCJrZXlcIjogXCIyNjhcIixcbiAgICBcIm5hbWVcIjogXCJBemlyXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBFbXBlcm9yIG9mIHRoZSBTYW5kc1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIixcbiAgICAgIFwiTWFya3NtYW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUyNC40LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgwLFxuICAgICAgXCJtcFwiOiAzNTAuNTYsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDIsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMjUsXG4gICAgICBcImFybW9yXCI6IDE5LjA0LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1MjUsXG4gICAgICBcImhwcmVnZW5cIjogNi45MixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUyLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAyLjgsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjAyLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDEuNVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9BemlyLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQzMixcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydTaHVyaW1hIHdhcyBvbmNlIHRoZSBnbG9yeSBvZiBSdW5ldGVycmEuIEkgd2lsbCBtYWtlIGl0IHNvIGFnYWluLicnPGJyPjxicj5BemlyIHdhcyBhIG1vcnRhbCBlbXBlcm9yIG9mIFNodXJpbWEgaW4gYSBmYXIgZGlzdGFudCBhZ2UsIGEgcHJvdWQgbWFuIHdobyBzdG9vZCBhdCB0aGUgY3VzcCBvZiBpbW1vcnRhbGl0eS4gSGlzIGh1YnJpcyBzYXcgaGltIGJldHJheWVkIGFuZCBtdXJkZXJlZCBhdCB0aGUgbW9tZW50IG9mIGhpcyAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImJhcmRcIixcbiAgICBcImtleVwiOiBcIjQzMlwiLFxuICAgIFwibmFtZVwiOiBcIkJhcmRcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFdhbmRlcmluZyBDYXJldGFrZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJTdXBwb3J0XCIsXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUzNSxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4OSxcbiAgICAgIFwibXBcIjogMzUwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDUwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzMwLFxuICAgICAgXCJhcm1vclwiOiAyNSxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiA0LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTAwLFxuICAgICAgXCJocHJlZ2VuXCI6IDUuNCxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNDUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1MixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0JhcmQucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogMCxcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkJhcmQgdHJhdmVscyB0aHJvdWdoIHJlYWxtcyBiZXlvbmQgdGhlIGltYWdpbmF0aW9uIG9mIG1vcnRhbCBiZWluZ3MuIFNvbWUgb2YgVmFsb3JhbidzIGdyZWF0ZXN0IHNjaG9sYXJzIGhhdmUgc3BlbnQgdGhlaXIgbGl2ZXMgdHJ5aW5nIHRvIHVuZGVyc3RhbmQgdGhlIG15c3RlcmllcyBoZSBlbWJvZGllcy4gVGhpcyBlbmlnbWF0aWMgc3Bpcml0IGhhcyBiZWVuIGdpdmVuIG1hbnkgbmFtZXMgdGhyb3VnaG91dCB0aGUgaGlzdG9yeSBvZiAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImJsaXR6Y3JhbmtcIixcbiAgICBcImtleVwiOiBcIjUzXCIsXG4gICAgXCJuYW1lXCI6IFwiQmxpdHpjcmFua1wiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgR3JlYXQgU3RlYW0gR29sZW1cIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJUYW5rXCIsXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU4Mi42LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDk1LFxuICAgICAgXCJtcFwiOiAyNjcuMixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMyNSxcbiAgICAgIFwiYXJtb3JcIjogMjQuMzgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogNCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDguNTEsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjc1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDguNSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDYxLjU0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMS4xM1xuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9CbGl0emNyYW5rLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQ4LFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiWmF1biBpcyBhIHBsYWNlIHdoZXJlIGJvdGggbWFnaWMgYW5kIHNjaWVuY2UgaGF2ZSBnb25lIGF3cnksIGFuZCB0aGUgdW5jaGVja2VkIG5hdHVyZSBvZiBleHBlcmltZW50YXRpb24gaGFzIHRha2VuIGl0cyB0b2xsLiBIb3dldmVyLCBaYXVuJ3MgbGVuaWVudCByZXN0cmljdGlvbnMgYWxsb3cgdGhlaXIgcmVzZWFyY2hlcnMgYW5kIGludmVudG9ycyB0aGUgbGVld2F5IHRvIHB1c2ggdGhlIGJvdW5kcyBvZiBzY2llbmNlIGF0IGFuIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiYnJhbmRcIixcbiAgICBcImtleVwiOiBcIjYzXCIsXG4gICAgXCJuYW1lXCI6IFwiQnJhbmRcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEJ1cm5pbmcgVmVuZ2VhbmNlXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTA3LjY4LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDc2LFxuICAgICAgXCJtcFwiOiAzNzUuNixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MixcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0MCxcbiAgICAgIFwiYXJtb3JcIjogMjEuODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDUuNDIsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDguMDA1LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC42LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTcuMDQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMS4zNlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9CcmFuZC5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiA5NixcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkluIGEgZmFyYXdheSBwbGFjZSBrbm93biBhcyBMb2tmYXIgdGhlcmUgd2FzIGEgc2VhZmFyaW5nIG1hcmF1ZGVyIGNhbGxlZCBLZWdhbiBSb2RoZS4gQXMgd2FzIGhpcyBwZW9wbGUncyB3YXksIEtlZ2FuIHNhaWxlZCBmYXIgYW5kIHdpZGUgd2l0aCBoaXMgZmVsbG93cywgc3RlYWxpbmcgdHJlYXN1cmVzIGZyb20gdGhvc2UgdW5sdWNreSBlbm91Z2ggdG8gY2F0Y2ggdGhlaXIgYXR0ZW50aW9uLiBUbyBzb21lLCBoZSB3YXMgYSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImJyYXVtXCIsXG4gICAgXCJrZXlcIjogXCIyMDFcIixcbiAgICBcIm5hbWVcIjogXCJCcmF1bVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgSGVhcnQgb2YgdGhlIEZyZWxqb3JkXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiU3VwcG9ydFwiLFxuICAgICAgXCJUYW5rXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NzYuMTYsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODcsXG4gICAgICBcIm1wXCI6IDMxMC42LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQ1LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAyNi43MixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiA0LjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA4LjE4LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMSxcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTUuMzc2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjIsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjAzLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDMuNVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9CcmF1bS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiAxNDQsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ1dvdWxkIHlvdSBsaWtlIGEgYmVkdGltZSBzdG9yeT8nJzxicj48YnI+JydHcmFuZG1hLCBJJ20gdG9vIG9sZCBmb3IgdGhhdC4nJzxicj48YnI+JydZb3UncmUgbmV2ZXIgdG9vIG9sZCB0byBiZSB0b2xkIGEgc3RvcnkuJyc8YnI+PGJyPlRoZSBnaXJsIHJlbHVjdGFudGx5IGNyYXdscyBpbnRvIGJlZCBhbmQgd2FpdHMsIGtub3dpbmcgc2hlIHdvbid0IHdpbiB0aGlzIGJhdHRsZS4gQSBiaXR0ZXIgd2luZCBob3dscyBvdXRzaWRlLCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImNhaXRseW5cIixcbiAgICBcImtleVwiOiBcIjUxXCIsXG4gICAgXCJuYW1lXCI6IFwiQ2FpdGx5blwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgU2hlcmlmZiBvZiBQaWx0b3ZlclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hcmtzbWFuXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MjQuNCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MCxcbiAgICAgIFwibXBcIjogMzEzLjcsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMzUsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMjUsXG4gICAgICBcImFybW9yXCI6IDIyLjg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDY1MCxcbiAgICAgIFwiaHByZWdlblwiOiA1LjY3LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA3LjQsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTMuNjYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDIuMTgsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAuMSxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiA0XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0NhaXRseW4ucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogMTkyLFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydHbyBhaGVhZCwgcnVuLiBJJ2xsIGdpdmUgeW91IGEgZml2ZSBtaW51dGUgaGVhZCBzdGFydC4nJzxicj48YnI+T25lIG9mIHRoZSByZWFzb25zIFBpbHRvdmVyIGlzIGtub3duIGFzIHRoZSBDaXR5IG9mIFByb2dyZXNzIGlzIGJlY2F1c2UgaXQgaGFzIGFuIGV4dHJhb3JkaW5hcmlseSBsb3cgY3JpbWUgcmF0ZS4gVGhpcyBoYXNuJ3QgYWx3YXlzIGJlZW4gdGhlIGNhc2U7IGJyaWdhbmRzIGFuZCB0aGlldmVzIG9mIGFsbCBzb3J0cyAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImNhc3Npb3BlaWFcIixcbiAgICBcImtleVwiOiBcIjY5XCIsXG4gICAgXCJuYW1lXCI6IFwiQ2Fzc2lvcGVpYVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgU2VycGVudCdzIEVtYnJhY2VcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MjUsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNzUsXG4gICAgICBcIm1wXCI6IDM3NSxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA2MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMyOCxcbiAgICAgIFwiYXJtb3JcIjogMjUsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDUuNSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNSxcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTMsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjAzNCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAxLjVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vQ2Fzc2lvcGVpYS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiAyNDAsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJDYXNzaW9wZWlhIGlzIGEgdGVycmlmeWluZyBjcmVhdHVyZSAtIGhhbGYgd29tYW4sIGhhbGYgc25ha2UgLSB3aG9zZSBzbGlnaHRlc3QgZ2xhbmNlIGJyaW5ncyBkZWF0aC4gVGhlIHlvdW5nZXN0IGRhdWdodGVyIG9mIG9uZSBvZiBOb3h1cycgbW9zdCBpbmZsdWVudGlhbCBmYW1pbGllcywgc2hlIHdhcyBvbmNlIGEgYmVhdXRpZnVsIGFuZCBjdW5uaW5nIHRlbXB0cmVzcyBjYXBhYmxlIG9mIG1hbmlwdWxhdGluZyB0aGUgaGFyZGVzdCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImNob2dhdGhcIixcbiAgICBcImtleVwiOiBcIjMxXCIsXG4gICAgXCJuYW1lXCI6IFwiQ2hvJ0dhdGhcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFRlcnJvciBvZiB0aGUgVm9pZFwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlRhbmtcIixcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTc0LjQsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODAsXG4gICAgICBcIm1wXCI6IDI3Mi4yLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQ1LFxuICAgICAgXCJhcm1vclwiOiAyOC44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA4LjkyNSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuODUsXG4gICAgICBcIm1wcmVnZW5cIjogNy4yMDUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjQ1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNjEuMTU2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiA0LjIsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMS40NFxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9DaG9nYXRoLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDI4OCxcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRoZXJlIGlzIGEgcGxhY2UgYmV0d2VlbiBkaW1lbnNpb25zLCBiZXR3ZWVuIHdvcmxkcy4gVG8gc29tZSBpdCBpcyBrbm93biBhcyB0aGUgT3V0c2lkZSwgdG8gb3RoZXJzIGl0IGlzIHRoZSBVbmtub3duLiBUbyB0aG9zZSB0aGF0IHRydWx5IGtub3csIGhvd2V2ZXIsIGl0IGlzIGNhbGxlZCB0aGUgVm9pZC4gRGVzcGl0ZSBpdHMgbmFtZSwgdGhlIFZvaWQgaXMgbm90IGFuIGVtcHR5IHBsYWNlLCBidXQgcmF0aGVyIHRoZSBob21lIG9mIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiY29ya2lcIixcbiAgICBcImtleVwiOiBcIjQyXCIsXG4gICAgXCJuYW1lXCI6IFwiQ29ya2lcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIERhcmluZyBCb21iYXJkaWVyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFya3NtYW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUxMi43NixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MixcbiAgICAgIFwibXBcIjogMzUwLjE2LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDM0LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzI1LFxuICAgICAgXCJhcm1vclwiOiAyMy4zOCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1NTAsXG4gICAgICBcImhwcmVnZW5cIjogNS40MixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogNy40MixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuM1xuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9Db3JraS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiAzMzYsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJXaGVuIEhlaW1lcmRpbmdlciBhbmQgaGlzIHlvcmRsZSBjb2xsZWFndWVzIG1pZ3JhdGVkIHRvIFBpbHRvdmVyLCB0aGV5IGVtYnJhY2VkIHNjaWVuY2UgYXMgYSB3YXkgb2YgbGlmZSwgYW5kIHRoZXkgaW1tZWRpYXRlbHkgbWFkZSBzZXZlcmFsIGdyb3VuZGJyZWFraW5nIGNvbnRyaWJ1dGlvbnMgdG8gdGhlIHRlY2htYXR1cmdpY2FsIGNvbW11bml0eS4gV2hhdCB5b3JkbGVzIGxhY2sgaW4gc3RhdHVyZSwgdGhleSBtYWtlIHVwIGZvciAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImRhcml1c1wiLFxuICAgIFwia2V5XCI6IFwiMTIyXCIsXG4gICAgXCJuYW1lXCI6IFwiRGFyaXVzXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBIYW5kIG9mIE5veHVzXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJUYW5rXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1ODIuMjQsXG4gICAgICBcImhwcGVybGV2ZWxcIjogMTAwLFxuICAgICAgXCJtcFwiOiAyNjMsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMzcuNSxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0MCxcbiAgICAgIFwiYXJtb3JcIjogMzAsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogNCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTc1LFxuICAgICAgXCJocHJlZ2VuXCI6IDkuODQ1LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC45NSxcbiAgICAgIFwibXByZWdlblwiOiA2LjU4NSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuMzUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAxXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0Rhcml1cy5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiAzODQsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUaGVyZSBpcyBubyBncmVhdGVyIHN5bWJvbCBvZiBOb3hpYW4gbWlnaHQgdGhhbiBEYXJpdXMsIHRoZSBuYXRpb24ncyBtb3N0IGZlYXJlZCBhbmQgYmF0dGxlLWhhcmRlbmVkIHdhcnJpb3IuIE9ycGhhbmVkIGF0IGEgeW91bmcgYWdlLCBEYXJpdXMgaGFkIHRvIGZpZ2h0IHRvIGtlZXAgaGltc2VsZiBhbmQgaGlzIHlvdW5nZXIgYnJvdGhlciBhbGl2ZS4gQnkgdGhlIHRpbWUgaGUgam9pbmVkIHRoZSBtaWxpdGFyeSwgaGUgaGFkIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZGlhbmFcIixcbiAgICBcImtleVwiOiBcIjEzMVwiLFxuICAgIFwibmFtZVwiOiBcIkRpYW5hXCIsXG4gICAgXCJ0aXRsZVwiOiBcIlNjb3JuIG9mIHRoZSBNb29uXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1ODkuMixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5MCxcbiAgICAgIFwibXBcIjogMjk3LjIsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDUsXG4gICAgICBcImFybW9yXCI6IDI2LjA0OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjYsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDE1MCxcbiAgICAgIFwiaHByZWdlblwiOiA3LjQyNSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuODUsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUzLjA0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuMjVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vRGlhbmEucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogNDMyLFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydJIGFtIHRoZSBsaWdodCBjb3Vyc2luZyBpbiB0aGUgc291bCBvZiB0aGUgbW9vbi4nJzxicj48YnI+QmVhcmluZyBoZXIgY3Jlc2NlbnQgbW9vbmJsYWRlLCBEaWFuYSBmaWdodHMgYXMgYSB3YXJyaW9yIG9mIHRoZSBMdW5hcmksIGEgZmFpdGggYWxsIGJ1dCBxdWFzaGVkIGluIHRoZSBsYW5kcyBhcm91bmQgTW91bnQgVGFyZ29uLiBDbGFkIGluIHNoaW1tZXJpbmcgYXJtb3IgdGhlIGNvbG9yIG9mIHdpbnRlciBzbm93IGF0IG5pZ2h0LCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImRyYXZlblwiLFxuICAgIFwia2V5XCI6IFwiMTE5XCIsXG4gICAgXCJuYW1lXCI6IFwiRHJhdmVuXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBHbG9yaW91cyBFeGVjdXRpb25lclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hcmtzbWFuXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NTcuNzYsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODIsXG4gICAgICBcIm1wXCI6IDM2MC41NixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAzOSxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzMCxcbiAgICAgIFwiYXJtb3JcIjogMjUuNTQ0LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuMyxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDU1MCxcbiAgICAgIFwiaHByZWdlblwiOiA2LjE3NSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNyxcbiAgICAgIFwibXByZWdlblwiOiA4LjA0LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC42NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU1LjgsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDIuOTEsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA4LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuN1xuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9EcmF2ZW4ucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogMCxcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlVubGlrZSBoaXMgYnJvdGhlciBEYXJpdXMsIHZpY3RvcnkgaW4gYmF0dGxlIHdhcyBuZXZlciBlbm91Z2ggZm9yIERyYXZlbi4gSGUgY3JhdmVkIHJlY29nbml0aW9uLCBhY2NsYWltLCBhbmQgZ2xvcnkuIEhlIGZpcnN0IHNvdWdodCBncmVhdG5lc3MgaW4gdGhlIE5veGlhbiBtaWxpdGFyeSwgYnV0IGhpcyBmbGFpciBmb3IgdGhlIGRyYW1hdGljIHdlbnQgc2V2ZXJlbHkgdW5kZXJhcHByZWNpYXRlZC4gVGhpcnN0aW5nIGZvciBhIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZHJtdW5kb1wiLFxuICAgIFwia2V5XCI6IFwiMzZcIixcbiAgICBcIm5hbWVcIjogXCJEci4gTXVuZG9cIixcbiAgICBcInRpdGxlXCI6IFwidGhlIE1hZG1hbiBvZiBaYXVuXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJUYW5rXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1ODIuNTIsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODksXG4gICAgICBcIm1wXCI6IDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0NSxcbiAgICAgIFwiYXJtb3JcIjogMjYuODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogNy43NixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNzUsXG4gICAgICBcIm1wcmVnZW5cIjogMCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA2MS4yNyxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjhcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vRHJNdW5kby5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiA0OCxcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnQmV3YXJlIHRoZSBNYWRtYW4gb2YgWmF1bi4gSW4gaGlzIGV5ZXMsIHlvdSBhcmUgYWxyZWFkeSBkZWFkJyc8YnI+PGJyPkl0IGlzIHNhaWQgdGhhdCB0aGUgbWFuIG5vdyBrbm93biBhcyBEci4gTXVuZG8gd2FzIGJvcm4gd2l0aG91dCBhbnkgc29ydCBvZiBjb25zY2llbmNlLiBJbnN0ZWFkLCBoZSBoYWQgYW4gdW5xdWVuY2hhYmxlIGRlc2lyZSB0byBpbmZsaWN0IHBhaW4gdGhyb3VnaCBleHBlcmltZW50YXRpb24uIEJ5IHRoZSB0aW1lIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZWtrb1wiLFxuICAgIFwia2V5XCI6IFwiMjQ1XCIsXG4gICAgXCJuYW1lXCI6IFwiRWtrb1wiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgQm95IFdobyBTaGF0dGVyZWQgVGltZVwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkFzc2Fzc2luXCIsXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU4MCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MCxcbiAgICAgIFwibXBcIjogMjgwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDUwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQwLFxuICAgICAgXCJhcm1vclwiOiAyNyxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDksXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjksXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU1LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDMuM1xuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9Fa2tvLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDk2LFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiQSBwcm9kaWd5IGZyb20gdGhlIHJvdWdoIHN0cmVldHMgb2YgWmF1biwgRWtrbyBtYW5pcHVsYXRlcyB0aW1lIHRvIHNwaW4gYW55IHNpdHVhdGlvbiB0byBoaXMgYWR2YW50YWdlLiBVc2luZyBoaXMgb3duIGludmVudGlvbiwgdGhlIFplcm8tRHJpdmUsIGhlIGV4cGxvcmVzIHRoZSBicmFuY2hpbmcgcG9zc2liaWxpdGllcyBvZiByZWFsaXR5LiBBcyB3ZWxsIGFzIGV4cGVyaW1lbnRpbmcgd2l0aCBtdWx0aS1kaW1lbnNpb25hbCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImVsaXNlXCIsXG4gICAgXCJrZXlcIjogXCI2MFwiLFxuICAgIFwibmFtZVwiOiBcIkVsaXNlXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBTcGlkZXIgUXVlZW5cIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCIsXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUyOS40LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgwLFxuICAgICAgXCJtcFwiOiAzMjQsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNTAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMjUsXG4gICAgICBcImFybW9yXCI6IDIyLjEyOCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjM1LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDUuNzA1LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1MC41NCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAxLjc1XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0VsaXNlLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDE0NCxcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnQmVhdXR5IGlzIHBvd2VyIHRvbywgYW5kIGNhbiBzdHJpa2Ugc3dpZnRlciB0aGFuIGFueSBzd29yZC4nJzxicj48YnI+RWxpc2UgaXMgYSBkZWFkbHkgcHJlZGF0b3Igd2hvIGR3ZWxscyBpbiBhIHNodXR0ZXJlZCwgbGlnaHRsZXNzIHBhbGFjZSwgZGVlcCBpbiB0aGUgSW1tb3J0YWwgQmFzdGlvbiBvZiBOb3h1cy4gT25jZSBzaGUgd2FzIG1vcnRhbCwgdGhlIG1pc3RyZXNzIG9mIGEgb25jZS1wb3dlcmZ1bCBob3VzZSwgYnV0IHRoZSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImV2ZWx5bm5cIixcbiAgICBcImtleVwiOiBcIjI4XCIsXG4gICAgXCJuYW1lXCI6IFwiRXZlbHlublwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgV2lkb3dtYWtlclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkFzc2Fzc2luXCIsXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUzMS4yLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDkwLFxuICAgICAgXCJtcFwiOiAzMTUuNixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MixcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0MCxcbiAgICAgIFwiYXJtb3JcIjogMjYuNSxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjgsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA5LjgyLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA4LjEwNSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNixcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUzLjg4LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMy42XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0V2ZWx5bm4ucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogMTkyLFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiU3dpZnQgYW5kIGxldGhhbCwgRXZlbHlubiBpcyBvbmUgb2YgdGhlIG1vc3QgZGVhZGx5IC0gYW5kIGV4cGVuc2l2ZSAtIGFzc2Fzc2lucyBpbiBhbGwgb2YgUnVuZXRlcnJhLiBBYmxlIHRvIG1lcmdlIHdpdGggdGhlIHNoYWRvd3MgYXQgd2lsbCwgc2hlIHBhdGllbnRseSBzdGFsa3MgaGVyIHByZXksIHdhaXRpbmcgZm9yIHRoZSByaWdodCBtb21lbnQgdG8gc3RyaWtlLiBXaGlsZSBFdmVseW5uIGlzIGNsZWFybHkgbm90IGVudGlyZWx5IC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZXpyZWFsXCIsXG4gICAgXCJrZXlcIjogXCI4MVwiLFxuICAgIFwibmFtZVwiOiBcIkV6cmVhbFwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgUHJvZGlnYWwgRXhwbG9yZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYXJrc21hblwiLFxuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA0ODQuNCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MCxcbiAgICAgIFwibXBcIjogMzYwLjYsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDIsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMjUsXG4gICAgICBcImFybW9yXCI6IDIxLjg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDU1MCxcbiAgICAgIFwiaHByZWdlblwiOiA2LjQyLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA4LjA5LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC42NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU1LjY2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAyLjQxLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuOFxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9FenJlYWwucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogMjQwLFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGhlIGludHJlcGlkIHlvdW5nIGFkdmVudHVyZXIgRXpyZWFsIGhhcyBleHBsb3JlZCBzb21lIG9mIHRoZSBtb3N0IHJlbW90ZSBhbmQgYWJhbmRvbmVkIGxvY2F0aW9ucyBvbiBSdW5ldGVycmEuIER1cmluZyBhbiBleHBlZGl0aW9uIHRvIHRoZSBidXJpZWQgcnVpbnMgb2YgYW5jaWVudCBTaHVyaW1hLCBoZSByZWNvdmVyZWQgYW4gYW11bGV0IG9mIGluY3JlZGlibGUgbXlzdGljYWwgcG93ZXIuIExpa2VseSBjb25zdHJ1Y3RlZCB0byBiZSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImZpZGRsZXN0aWNrc1wiLFxuICAgIFwia2V5XCI6IFwiOVwiLFxuICAgIFwibmFtZVwiOiBcIkZpZGRsZXN0aWNrc1wiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgSGFyYmluZ2VyIG9mIERvb21cIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCIsXG4gICAgICBcIlN1cHBvcnRcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUyNC40LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgwLFxuICAgICAgXCJtcFwiOiA0MDAuMTIsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNTYsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDIwLjg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDQ4MCxcbiAgICAgIFwiaHByZWdlblwiOiA1LjYwNSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNixcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNDguMzYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDIuNjI1LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuMTFcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vRmlkZGxlU3RpY2tzLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24wLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDI4OCxcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkZvciBuZWFybHkgdHdlbnR5IHllYXJzLCBGaWRkbGVzdGlja3MgaGFzIHN0b29kIGFsb25lIGluIHRoZSBlYXN0ZXJubW9zdCBzdW1tb25pbmcgY2hhbWJlciBvZiB0aGUgSW5zdGl0dXRlIG9mIFdhci4gT25seSB0aGUgYnVybmluZyBlbWVyYWxkIGxpZ2h0IG9mIGhpcyB1bmVhcnRobHkgZ2F6ZSBwaWVyY2VzIHRoZSBtdXN0eSBkYXJrbmVzcyBvZiBoaXMgZHVzdC1jb3ZlcmVkIGhvbWUuIEl0IGlzIGhlcmUgdGhhdCB0aGUgSGFyYmluZ2VyIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZmlvcmFcIixcbiAgICBcImtleVwiOiBcIjExNFwiLFxuICAgIFwibmFtZVwiOiBcIkZpb3JhXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBHcmFuZCBEdWVsaXN0XCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJBc3Nhc3NpblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTUwLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg1LFxuICAgICAgXCJtcFwiOiAzMDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDUsXG4gICAgICBcImFybW9yXCI6IDI0LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDguMjUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDgsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjcsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA2MCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4zLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDMuMlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9GaW9yYS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiAzMzYsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ0kgaGF2ZSBjb21lIHRvIGtpbGwgeW91IGZvciB0aGUgc2FrZSBvZiBob25vci4gQW5kIHRob3VnaCB5b3UgcG9zc2VzcyBub25lLCBzdGlsbCB5b3UgZGllLicnPGJyPlRoZSBtb3N0IGZlYXJlZCBkdWVsaXN0IGluIGFsbCBWYWxvcmFuLCBGaW9yYSBpcyBhcyByZW5vd25lZCBmb3IgaGVyIGJydXNxdWUgbWFubmVyIGFuZCBjdW5uaW5nIG1pbmQgYXMgc2hlIGlzIGZvciB0aGUgc3BlZWQgb2YgaGVyIGJsdWVzdGVlbCByYXBpZXIuIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZml6elwiLFxuICAgIFwia2V5XCI6IFwiMTA1XCIsXG4gICAgXCJuYW1lXCI6IFwiRml6elwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgVGlkYWwgVHJpY2tzdGVyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiQXNzYXNzaW5cIixcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTU4LjQ4LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg2LFxuICAgICAgXCJtcFwiOiAzMTcuMixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAzNyxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMjIuNDEyLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTc1LFxuICAgICAgXCJocHJlZ2VuXCI6IDguMTc1LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC43LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1OC4wNCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDUsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMy4xXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0ZpenoucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjAucG5nXCIsXG4gICAgICBcInhcIjogMzg0LFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiQ2VudHVyaWVzIGFnbywgYW4gYW5jaWVudCB3YXRlci1kd2VsbGluZyByYWNlIGJ1aWx0IGEgaGlkZGVuIGNpdHkgYmVuZWF0aCBhIG1vdW50YWluIGluIHRoZSBzZWEuIFRob3VnaCB0aGVzZSBjcmVhdHVyZXMgaGFkIHRoZWlyIGVuZW1pZXMsIHRoZSBjaXR5IHdhcyBhbiBpbXBlbmV0cmFibGUgZm9ydHJlc3MsIGFuZCwgaW4gdGhlIHNhZmV0eSBpdCBwcm92aWRlZCwgdGhleSBncmV3IGNvbXBsYWNlbnQuIEZpenosIGhvd2V2ZXIsIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZ2FsaW9cIixcbiAgICBcImtleVwiOiBcIjNcIixcbiAgICBcIm5hbWVcIjogXCJHYWxpb1wiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgU2VudGluZWwncyBTb3Jyb3dcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJUYW5rXCIsXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU3Ny44LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg1LFxuICAgICAgXCJtcFwiOiAzNjksXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDcsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDI2Ljg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDguNzEsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjc1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA2MS45NyxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4zNzUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjAyLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDEuMlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9HYWxpby5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMC5wbmdcIixcbiAgICAgIFwieFwiOiA0MzIsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ1RoZXJlIGlzIG5vIHN1Y2ggdGhpbmcgYXMgcmVkZW1wdGlvbi4gT25seSBwZW5hbmNlLicnPGJyPjxicj5Mb25nIGJlZm9yZSB0aGUgcmVndWxhdGlvbiBvZiBtYWdpYywgbWFnZXMgZXhwZXJpbWVudGVkIHdpdGggdGhlIGNyZWF0aW9uIG9mIGFydGlmaWNpYWwgbGlmZS4gTm93IGZvcmJpZGRlbiwgaW5zdGlsbGluZyBnb2xlbXMgd2l0aCByZWFzb24gd2FzIG9uY2Ugbm90IHNvIHVuY29tbW9uIGEgcHJhY3RpY2UgYW1vbmdzdCB0aGUgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJnYW5ncGxhbmtcIixcbiAgICBcImtleVwiOiBcIjQxXCIsXG4gICAgXCJuYW1lXCI6IFwiR2FuZ3BsYW5rXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBTYWx0d2F0ZXIgU2NvdXJnZVwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU0MCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MixcbiAgICAgIFwibXBcIjogMjgyLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQ1LFxuICAgICAgXCJhcm1vclwiOiAyNixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogNixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNixcbiAgICAgIFwibXByZWdlblwiOiA3LjUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjcsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzLjJcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vR2FuZ3BsYW5rLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDAsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnSSB3YXMgY3V0dGluZyB0aHJvYXRzIGFuZCBzaW5raW5nIE5veGlhbiB3YXIgZ2FsbGV5cyB3aGVuIHlvdSB3ZXJlIHN0aWxsIHBpc3NpbmcgeW91ciBicml0Y2hlcywgYm95LiBZb3UgZG9uJ3Qgd2FudCB0byB0YWtlIG1lIG9uLicnPGJyPjxicj5BcyB1bnByZWRpY3RhYmxlIGFzIGhlIGlzIGJydXRhbCwgdGhlIGRldGhyb25lZCByZWF2ZXIga2luZyBrbm93biBhcyBHYW5ncGxhbmsgaXMgZmVhcmVkIGZhciBhbmQgd2lkZS4gV2hlcmUgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJnYXJlblwiLFxuICAgIFwia2V5XCI6IFwiODZcIixcbiAgICBcIm5hbWVcIjogXCJHYXJlblwiLFxuICAgIFwidGl0bGVcIjogXCJUaGUgTWlnaHQgb2YgRGVtYWNpYVwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiVGFua1wiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNjE2LjI4LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg0LjI1LFxuICAgICAgXCJtcFwiOiAwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDAsXG4gICAgICBcImFybW9yXCI6IDI3LjUzNixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxNzUsXG4gICAgICBcImhwcmVnZW5cIjogNy44NCxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNSxcbiAgICAgIFwibXByZWdlblwiOiAwLFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU3Ljg4LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiA0LjUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi45XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0dhcmVuLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQ4LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUaHJvdWdob3V0IFZhbG9yYW4sIHRoZSByZXNvbHZlIG9mIERlbWFjaWEncyBtaWxpdGFyeSBpcyBhbHRlcm5hdGVseSBjZWxlYnJhdGVkIG9yIGRlc3Bpc2VkLCBidXQgYWx3YXlzIHJlc3BlY3RlZC4gVGhlaXIgJyd6ZXJvIHRvbGVyYW5jZScnIG1vcmFsIGNvZGUgaXMgc3RyaWN0bHkgdXBoZWxkIGJ5IGNpdmlsaWFucyBhbmQgc29sZGllcnMgYWxpa2UuIEluIGNvbWJhdCwgdGhpcyBtZWFucyBEZW1hY2lhbiB0cm9vcHMgbWF5IG5vdCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImduYXJcIixcbiAgICBcImtleVwiOiBcIjE1MFwiLFxuICAgIFwibmFtZVwiOiBcIkduYXJcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIE1pc3NpbmcgTGlua1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiVGFua1wiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTQwLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDY1LFxuICAgICAgXCJtcFwiOiAxMDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMyNSxcbiAgICAgIFwiYXJtb3JcIjogMjMsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMi41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTc1LFxuICAgICAgXCJocHJlZ2VuXCI6IDIuNSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNSxcbiAgICAgIFwibXByZWdlblwiOiAwLFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUxLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDZcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vR25hci5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiA5NixcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGhlIGp1bmdsZSBkb2VzIG5vdCBmb3JnaXZlIGJsaW5kbmVzcy4gRXZlcnkgYnJva2VuIGJyYW5jaCB0ZWxscyBhIHN0b3J5Ljxicj48YnI+SSd2ZSBodW50ZWQgZXZlcnkgY3JlYXR1cmUgdGhpcyBqdW5nbGUgaGFzIHRvIG9mZmVyLiBJIHdhcyBjZXJ0YWluIHRoZXJlIHdlcmUgbm8gY2hhbGxlbmdlcyBsZWZ0IGhlcmUsIGJ1dCBub3cgdGhlcmUgaXMgc29tZXRoaW5nIG5ldy4gRWFjaCB0cmFjayBpcyB0aGUgc2l6ZSBvZiBhIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZ3JhZ2FzXCIsXG4gICAgXCJrZXlcIjogXCI3OVwiLFxuICAgIFwibmFtZVwiOiBcIkdyYWdhc1wiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgUmFiYmxlIFJvdXNlclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTgzLjUyLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg5LFxuICAgICAgXCJtcFwiOiA0MDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDcsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzAsXG4gICAgICBcImFybW9yXCI6IDI2LjA0OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjYsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA1LjUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjUsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDYxLjM4LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA0LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuMDVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vR3JhZ2FzLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDE0NCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGhlIG9ubHkgdGhpbmcgbW9yZSBpbXBvcnRhbnQgdG8gR3JhZ2FzIHRoYW4gZmlnaHRpbmcgaXMgZHJpbmtpbmcuIEhpcyB1bnF1ZW5jaGFibGUgdGhpcnN0IGZvciBzdHJvbmdlciBhbGUgaGFzIGxlZCBoaW0gaW4gc2VhcmNoIG9mIHRoZSBtb3N0IHBvdGVudCBhbmQgdW5jb252ZW50aW9uYWwgaW5ncmVkaWVudHMgdG8gdG9zcyBpbiBoaXMgc3RpbGwuIEltcHVsc2l2ZSBhbmQgdW5wcmVkaWN0YWJsZSwgdGhpcyByb3dkeSBjYXJvdXNlciAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImdyYXZlc1wiLFxuICAgIFwia2V5XCI6IFwiMTA0XCIsXG4gICAgXCJuYW1lXCI6IFwiR3JhdmVzXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBPdXRsYXdcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYXJrc21hblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTUxLjEyLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg0LFxuICAgICAgXCJtcFwiOiAzMjIuMixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0MCxcbiAgICAgIFwiYXJtb3JcIjogMjQuMzc2LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDQyNSxcbiAgICAgIFwiaHByZWdlblwiOiA2LjY3NSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNyxcbiAgICAgIFwibXByZWdlblwiOiA3LjksXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjcsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA2MC44MyxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMi40MSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMC4zLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuNlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9HcmF2ZXMucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogMTkyLFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJNYWxjb2xtIEdyYXZlcyBpcyBhIHdhbnRlZCBtYW4gaW4gZXZlcnkgcmVhbG0sIGNpdHkgYW5kIGVtcGlyZSBoZSBoYXMgdmlzaXRlZC4gVG91Z2gsIHN0cm9uZy13aWxsZWQsIGFuZCBhYm92ZSBhbGwsIHJlbGVudGxlc3MsIHRocm91Z2ggaGlzIGxpZmUgb2YgY3JpbWUgaGUgaGFzIGFtYXNzZWQgKHRoZW4gaW52YXJpYWJseSBsb3N0KSBhIHNtYWxsIGZvcnR1bmUuXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJoZWNhcmltXCIsXG4gICAgXCJrZXlcIjogXCIxMjBcIixcbiAgICBcIm5hbWVcIjogXCJIZWNhcmltXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBTaGFkb3cgb2YgV2FyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJUYW5rXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1ODAsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTAsXG4gICAgICBcIm1wXCI6IDI3Ny4yLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQ1LFxuICAgICAgXCJhcm1vclwiOiAyNi43MixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiA0LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxNzUsXG4gICAgICBcImhwcmVnZW5cIjogNyxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNzUsXG4gICAgICBcIm1wcmVnZW5cIjogNi41LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC42LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTgsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMixcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDY3MixcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vSGVjYXJpbS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiAyNDAsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnQnJlYWsgdGhlaXIgcmFua3MgYW5kIHJpZGUgdGhlbSBkb3duIHdpdGhvdXQgbWVyY3kuIENydXNoIHRoZSBsaXZpbmcgYW5kIGZlYXN0IG9uIHRoZWlyIHRlcnJvci4nJzxicj48YnI+SGVjYXJpbSBpcyBhbiBhcm1vcmVkIGNvbG9zc3VzIHdobyBjaGFyZ2VzIGZyb20gdGhlIFNoYWRvdyBJc2xlcyBhdCB0aGUgaGVhZCBvZiBhIGRlYXRobHkgaG9zdCBvZiBzcGVjdHJhbCBob3JzZW1lbiB0byBodW50IHRoZSBsaXZpbmcuIEEgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJoZWltZXJkaW5nZXJcIixcbiAgICBcImtleVwiOiBcIjc0XCIsXG4gICAgXCJuYW1lXCI6IFwiSGVpbWVyZGluZ2VyXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBSZXZlcmVkIEludmVudG9yXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiLFxuICAgICAgXCJTdXBwb3J0XCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA0NzYsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNzUsXG4gICAgICBcIm1wXCI6IDMwNy4yLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQwLFxuICAgICAgXCJhcm1vclwiOiAxOS4wNCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDExLjAwNSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDEuNzUsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU1LjUzNixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMi43LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDEuMzZcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vSGVpbWVyZGluZ2VyLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDI4OCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiRnJvbSB0aGUgSm91cm5hbCBvZiBQcm9mZXNzb3IgQ2VjaWwgQi4gSGVpbWVyZGluZ2VyPGJyPjxicj4xMC4xNDxicj48YnI+MDk6MTU8YnI+PGJyPkN1cnJlbnQgbWV0ZW9yb2xvZ2ljYWwgY29uZGl0aW9ucyBpbiBCYW5kbGUgQ2l0eSBzZWVtIG9wdGltYWwuIEF0bW9zcGhlcmljIHByZXNzdXJlIGlzIGlkZWFsIGZvciB0b2RheSdzIGV4cGVyaW1lbnRzITxicj48YnI+UnVubmluZyBhIGZpZnRoIHRyaWFsIGZvciBteSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImlsbGFvaVwiLFxuICAgIFwia2V5XCI6IFwiNDIwXCIsXG4gICAgXCJuYW1lXCI6IFwiSWxsYW9pXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBLcmFrZW4gUHJpZXN0ZXNzXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJUYW5rXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1ODUuNixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5NSxcbiAgICAgIFwibXBcIjogMzAwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQwLFxuICAgICAgXCJhcm1vclwiOiAyNixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjgsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA5LjUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcIm1wcmVnZW5cIjogNy41LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC43NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDYwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiA1LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuNVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9JbGxhb2kucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogMzM2LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ0knbSBub3QgYmlnIG9uIHNlcm1vbnMuIEJyb2tlbiBib25lcyB0ZWFjaCBiZXR0ZXIgbGVzc29ucy4nJzxicj5JbGxhb2kncyBwb3dlcmZ1bCBwaHlzaXF1ZSBpcyBkd2FyZmVkIG9ubHkgYnkgaGVyIGluZG9taXRhYmxlIGZhaXRoLiBBcyB0aGUgcHJvcGhldCBvZiB0aGUgR3JlYXQgS3Jha2VuLCBzaGUgdXNlcyBhIGh1Z2UsIGdvbGRlbiBpZG9sIHRvIHJpcCBoZXIgZm9lcycgc3Bpcml0cyBmcm9tIHRoZWlyIGJvZGllcyBhbmQgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJpcmVsaWFcIixcbiAgICBcImtleVwiOiBcIjM5XCIsXG4gICAgXCJuYW1lXCI6IFwiSXJlbGlhXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBXaWxsIG9mIHRoZSBCbGFkZXNcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIkFzc2Fzc2luXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA2MDcuMixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5MCxcbiAgICAgIFwibXBcIjogMzM4LjgsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMzIsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDUsXG4gICAgICBcImFybW9yXCI6IDI1LjMsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy43NSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDguNTksXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjY1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDguMSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNjUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA2MS41NDQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDYsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMy4yXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0lyZWxpYS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiAzODQsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnVGhlIHN3b3JkIGZsb3VyaXNoZXMsIGFzIHRob3VnaCBwYWludGluZyB3aXRoIGJsb29kLicnPGJyPjxicj5UaGUgSW9uaWFucyBoYXZlIGRldmVsb3BlZCBzb21lIG9mIHRoZSBtb3N0IGJyZWF0aHRha2luZyBhbmQgZGVhZGx5IG1hcnRpYWwgYXJ0cyBpbiBhbGwgb2YgUnVuZXRlcnJhIC0ganVzdCBvbmUgbWFuaWZlc3RhdGlvbiBvZiB0aGVpciBwdXJzdWl0IG9mIGVubGlnaHRlbm1lbnQuIFRoZSBtb3N0IHJlbWFya2FibGUgYmxhZGUgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJpdmVyblwiLFxuICAgIFwia2V5XCI6IFwiNDI3XCIsXG4gICAgXCJuYW1lXCI6IFwiSXZlcm5cIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEdyZWVuIEZhdGhlclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlN1cHBvcnRcIixcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTgwLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDkwLFxuICAgICAgXCJtcFwiOiA0NTAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNjAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzAsXG4gICAgICBcImFybW9yXCI6IDIyLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDYuOSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuODUsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNzUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1MCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDMsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMy40XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0l2ZXJuLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb240LnBuZ1wiLFxuICAgICAgXCJ4XCI6IDk2LFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiSXZlcm4gQnJhbWJsZWZvb3QsIGtub3duIHRvIG1hbnkgYXMgdGhlIEdyZWVuIEZhdGhlciwgaXMgYSBwZWN1bGlhciBoYWxmIG1hbiwgaGFsZiB0cmVlIHdobyByb2FtcyBSdW5ldGVycmEncyBmb3Jlc3RzLCBjdWx0aXZhdGluZyBsaWZlIGV2ZXJ5d2hlcmUgaGUgZ29lcy4gSGUga25vd3MgdGhlIHNlY3JldHMgb2YgdGhlIG5hdHVyYWwgd29ybGQsIGFuZCBob2xkcyBkZWVwIGZyaWVuZHNoaXBzIHdpdGggYWxsIHRoaW5ncyB0aGF0IGdyb3csLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJqYW5uYVwiLFxuICAgIFwia2V5XCI6IFwiNDBcIixcbiAgICBcIm5hbWVcIjogXCJKYW5uYVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgU3Rvcm0ncyBGdXJ5XCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiU3VwcG9ydFwiLFxuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA0ODcuMDQsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNzgsXG4gICAgICBcIm1wXCI6IDQwOS41MixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA2NCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMTkuMzg0LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuOCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDQ3NSxcbiAgICAgIFwiaHByZWdlblwiOiA1LjQyLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiAxMS41LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC40LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTEuOTU2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAyLjk1LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuNjFcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vSmFubmEucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogNDMyLFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUaGVyZSBhcmUgdGhvc2Ugc29yY2VyZXJzIHdobyBnaXZlIHRoZW1zZWx2ZXMgb3ZlciB0byB0aGUgcHJpbWFsIHBvd2VycyBvZiBuYXR1cmUsIGZvcmdvaW5nIHRoZSBsZWFybmVkIHByYWN0aWNlIG9mIG1hZ2ljLiBTdWNoIGEgc29yY2VyZXNzIGlzIEphbm5hLCB3aG8gZmlyc3QgbGVhcm5lZCBtYWdpYyBhcyBhbiBvcnBoYW4gZ3Jvd2luZyB1cCBhbWlkc3QgdGhlIGNoYW9zIHRoYXQgaXMgdGhlIGNpdHktc3RhdGUgb2YgWmF1bi4gLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJqYXJ2YW5pdlwiLFxuICAgIFwia2V5XCI6IFwiNTlcIixcbiAgICBcIm5hbWVcIjogXCJKYXJ2YW4gSVZcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEV4ZW1wbGFyIG9mIERlbWFjaWFcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJUYW5rXCIsXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU3MS4yLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDkwLFxuICAgICAgXCJtcFwiOiAzMDIuMixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0MCxcbiAgICAgIFwiYXJtb3JcIjogMjksXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy42LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxNzUsXG4gICAgICBcImhwcmVnZW5cIjogOC4xNzUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjcsXG4gICAgICBcIm1wcmVnZW5cIjogNi43NTUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjQ1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTUuNzEyLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjQsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA1LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuNVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9KYXJ2YW5JVi5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiAwLFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydUaGVyZSBpcyBvbmx5IG9uZSB0cnV0aCwgYW5kIHlvdSB3aWxsIGZpbmQgaXQgYXQgdGhlIHBvaW50IG9mIG15IGxhbmNlLicnPGJyPjxicj5BcyB0aGUgcm95YWwgZmFtaWx5IG9mIERlbWFjaWEgZm9yIGNlbnR1cmllcywgbWVtYmVycyBvZiB0aGUgTGlnaHRzaGllbGQgbGluZSBoYXZlIHNwZW50IHRoZWlyIGxpdmVzIHdhZ2luZyB3YXIgYWdhaW5zdCBhbnkgd2hvIG9wcG9zZWQgRGVtYWNpYW4gZXRoaWNzLiBJdCBpcyBzYWlkIHRoYXQgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJqYXhcIixcbiAgICBcImtleVwiOiBcIjI0XCIsXG4gICAgXCJuYW1lXCI6IFwiSmF4XCIsXG4gICAgXCJ0aXRsZVwiOiBcIkdyYW5kbWFzdGVyIGF0IEFybXNcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIkFzc2Fzc2luXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1OTIuOCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NSxcbiAgICAgIFwibXBcIjogMzM4LjgsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMzIsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNTAsXG4gICAgICBcImFybW9yXCI6IDI3LjA0LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA4LjM3LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA3LjU3NSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNyxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDYxLjk3LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjM3NSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDIsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMy40XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0pheC5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiA0OCxcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkl0IGlzIHNlbGRvbSB0aGUgY2FzZSB3aGVyZSBhIGNoYW1waW9uIGlzIGRlZmluZWQgYnkgaGlzIGFjdGlvbnMgYWZ0ZXIgam9pbmluZyB0aGUgTGVhZ3VlIG9mIExlZ2VuZHMgcmF0aGVyIHRoYW4gYmVmb3JlLiBTdWNoIGlzIHRoZSBjYXNlIHdpdGggSmF4LCBmb3Igd2hvbSB0aGUgYXJndW1lbnQgY291bGQgYmUgbWFkZSB0aGF0IGhlIGlzIHRoZSBtb3N0IHByb2xpZmljIHRvdXJuYW1lbnQgZmlnaHRlciBjdXJyZW50bHkgYXQgdGhlIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiamF5Y2VcIixcbiAgICBcImtleVwiOiBcIjEyNlwiLFxuICAgIFwibmFtZVwiOiBcIkpheWNlXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBEZWZlbmRlciBvZiBUb21vcnJvd1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiTWFya3NtYW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU3MS4yLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDkwLFxuICAgICAgXCJtcFwiOiAzNTcuMixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAzNyxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMjIuMzgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDcuMzQsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUwLjM4LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA1LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDNcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vSmF5Y2UucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogOTYsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJBcm1lZCB3aXRoIHdpdCwgY2hhcm0sIGFuZCBoaXMgc2lnbmF0dXJlIHRyYW5zZm9ybWluZyBoYW1tZXIsIEpheWNlIGxpdmVzIHRvIHByb3RlY3QgaGlzIG5hdGl2ZSBQaWx0b3Zlci4gTG9uZyBiZWZvcmUgaGlzIG5hdGlvbiBjYWxsZWQgaGltIGEgaGVybywgaG93ZXZlciwgaGUgd2FzIGEgcHJvbWlzaW5nIHlvdW5nIGludmVudG9yLiBXaGVuIFBpbHRvdmVyIGNvbW1pc3Npb25lZCBoaW0gdG8gc3R1ZHkgYSByYXJlIGFyY2FuZSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImpoaW5cIixcbiAgICBcImtleVwiOiBcIjIwMlwiLFxuICAgIFwibmFtZVwiOiBcIkpoaW5cIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFZpcnR1b3NvXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFya3NtYW5cIixcbiAgICAgIFwiQXNzYXNzaW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU0MCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NSxcbiAgICAgIFwibXBcIjogMzAwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDUwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzMwLFxuICAgICAgXCJhcm1vclwiOiAyMCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1NTAsXG4gICAgICBcImhwcmVnZW5cIjogNixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUzLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiA0LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDBcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vSmhpbi5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiAxNDQsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ0FydCByZXF1aXJlcyBhIGNlcnRhaW4uLi5jcnVlbHR5LicnPGJyPjxicj5KaGluIGlzIGEgbWV0aWN1bG91cyBjcmltaW5hbCBwc3ljaG9wYXRoIHdobyBiZWxpZXZlcyBtdXJkZXIgaXMgYXJ0LiBPbmNlIGFuIElvbmlhbiBwcmlzb25lciwgYnV0IGZyZWVkIGJ5IHNoYWRvd3kgZWxlbWVudHMgd2l0aGluIElvbmlhJ3MgcnVsaW5nIGNvdW5jaWwsIHRoZSBzZXJpYWwga2lsbGVyIG5vdyB3b3JrcyBhcyB0aGVpciBjYWJhbCdzIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiamlueFwiLFxuICAgIFwia2V5XCI6IFwiMjIyXCIsXG4gICAgXCJuYW1lXCI6IFwiSmlueFwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgTG9vc2UgQ2Fubm9uXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFya3NtYW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUxNy43NixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MixcbiAgICAgIFwibXBcIjogMjQ1LjYsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDUsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMjUsXG4gICAgICBcImFybW9yXCI6IDIyLjg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDUyNSxcbiAgICAgIFwiaHByZWdlblwiOiA1Ljg0LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYuNjgsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAxLFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTguNDYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDIuNDEsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9KaW54LnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDE5MixcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkppbnggbGl2ZXMgdG8gd3JlYWsgaGF2b2Mgd2l0aG91dCBhIHRob3VnaHQgZm9yIHRoZSBjb25zZXF1ZW5jZXMsIGxlYXZpbmcgYSB0cmFpbCBvZiBtYXloZW0gYW5kIHBhbmljIGluIGhlciB3YWtlLiBBIG1hbmljIGFuZCBpbXB1bHNpdmUgY3JpbWluYWwsIHNoZSBkZXNwaXNlcyBub3RoaW5nIG1vcmUgdGhhbiBib3JlZG9tLCBhbmQgZ2xlZWZ1bGx5IGJyaW5ncyBoZXIgb3duIHZvbGF0aWxlIGJyYW5kIG9mIHBhbmRlbW9uaXVtIHRvIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwia2FsaXN0YVwiLFxuICAgIFwia2V5XCI6IFwiNDI5XCIsXG4gICAgXCJuYW1lXCI6IFwiS2FsaXN0YVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgU3BlYXIgb2YgVmVuZ2VhbmNlXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFya3NtYW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUxNy43NixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MyxcbiAgICAgIFwibXBcIjogMjMxLjgsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMzUsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMjUsXG4gICAgICBcImFybW9yXCI6IDE5LjAxMixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1NTAsXG4gICAgICBcImhwcmVnZW5cIjogNixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogNi4zLFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC40LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNjMsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDIuOSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDMsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi41XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0thbGlzdGEucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogMjQwLFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydXaGVuIHdyb25nZWQsIHdlIHNlZWsganVzdGljZS4gV2hlbiBodXJ0LCB3ZSBzdHJpa2UgYmFjay4gV2hlbiBiZXRyYXllZCwgdGhlIFNwZWFyIG9mIFZlbmdlYW5jZSBzdHJpa2VzIScnPGJyPjxicj5BIHNwZWN0ZXIgb2Ygd3JhdGggYW5kIHJldHJpYnV0aW9uLCBLYWxpc3RhIGlzIHRoZSB1bmR5aW5nIHNwaXJpdCBvZiB2ZW5nZWFuY2UsIGFuIGFybW9yZWQgbmlnaHRtYXJlIHN1bW1vbmVkIGZyb20gdGhlIFNoYWRvdyBJc2xlcyB0byAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImthcm1hXCIsXG4gICAgXCJrZXlcIjogXCI0M1wiLFxuICAgIFwibmFtZVwiOiBcIkthcm1hXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBFbmxpZ2h0ZW5lZCBPbmVcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCIsXG4gICAgICBcIlN1cHBvcnRcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUyMi40NCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MyxcbiAgICAgIFwibXBcIjogMzc0LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDUwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAyMC4zODQsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy44LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDUuNjIsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDguNSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUzLjU0NCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4zLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuM1xuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9LYXJtYS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiAyODgsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJLYXJtYSBpcyBhIHdvbWFuIG9mIGluZG9taXRhYmxlIHdpbGwgYW5kIHVuYm91bmQgc3Bpcml0dWFsIHBvd2VyLiBTaGUgaXMgdGhlIHNvdWwgb2YgSW9uaWEgbWFkZSBtYW5pZmVzdCBhbmQgYW4gaW5zcGlyaW5nIHByZXNlbmNlIG9uIHRoZSBiYXR0bGVmaWVsZCwgc2hpZWxkaW5nIGhlciBhbGxpZXMgYW5kIHR1cm5pbmcgYmFjayBoZXIgZm9lcy4gQSBzdHJvbmcgbGVhZGVyIHRvcm4gYmV0d2VlbiB0cmFkaXRpb24gYW5kIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwia2FydGh1c1wiLFxuICAgIFwia2V5XCI6IFwiMzBcIixcbiAgICBcIm5hbWVcIjogXCJLYXJ0aHVzXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBEZWF0aHNpbmdlclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUxNixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA3NSxcbiAgICAgIFwibXBcIjogMzcyLjQ4LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDYxLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAyMC44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA0NTAsXG4gICAgICBcImhwcmVnZW5cIjogNi40MixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDQ1LjY2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjI1LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuMTFcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vS2FydGh1cy5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiAzMzYsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ0RlYXRoIGlzIG5vdCB0aGUgZW5kIG9mIHRoZSBqb3VybmV5LCBpdCBpcyBqdXN0IHRoZSBiZWdpbm5pbmcuLi4nJzxicj48YnI+VGhlIGhhcmJpbmdlciBvZiBvYmxpdmlvbiwgS2FydGh1cyBpcyBhbiB1bmR5aW5nIHNwaXJpdCB3aG9zZSBoYXVudGluZyBzb25ncyBhcmUgYSBwcmVsdWRlIHRvIHRoZSBob3Jyb3Igb2YgaGlzIG5pZ2h0bWFyaXNoIGFwcGVhcmFuY2UuIFRoZSBsaXZpbmcgZmVhciB0aGUgZXRlcm5pdHkgb2YgdW5kZWF0aCwuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImthc3NhZGluXCIsXG4gICAgXCJrZXlcIjogXCIzOFwiLFxuICAgIFwibmFtZVwiOiBcIkthc3NhZGluXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBWb2lkIFdhbGtlclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkFzc2Fzc2luXCIsXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU2NC4wNCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA3OCxcbiAgICAgIFwibXBcIjogMzk3LjYsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNjcsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDAsXG4gICAgICBcImFybW9yXCI6IDIzLjM3NixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjIsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxNTAsXG4gICAgICBcImhwcmVnZW5cIjogNy43OSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNSxcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTguODUyLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjksXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjAyMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzLjdcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vS2Fzc2FkaW4ucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogMzg0LFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGhlcmUgaXMgYSBwbGFjZSBiZXR3ZWVuIGRpbWVuc2lvbnMgYW5kIGJldHdlZW4gd29ybGRzLiBUbyBzb21lIGl0IGlzIGtub3duIGFzIHRoZSBPdXRzaWRlLCB0byBvdGhlcnMgaXQgaXMgdGhlIFVua25vd24uIFRvIG1vc3QsIGhvd2V2ZXIsIGl0IGlzIGNhbGxlZCB0aGUgVm9pZC4gRGVzcGl0ZSBpdHMgbmFtZSwgdGhlIFZvaWQgaXMgbm90IGFuIGVtcHR5IHBsYWNlLCBidXQgcmF0aGVyIHRoZSBob21lIG9mIHVuc3BlYWthYmxlIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwia2F0YXJpbmFcIixcbiAgICBcImtleVwiOiBcIjU1XCIsXG4gICAgXCJuYW1lXCI6IFwiS2F0YXJpbmFcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFNpbmlzdGVyIEJsYWRlXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiQXNzYXNzaW5cIixcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTEwLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgzLFxuICAgICAgXCJtcFwiOiAwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDUsXG4gICAgICBcImFybW9yXCI6IDI2Ljg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDQuNSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogMCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1OCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4yLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjc0XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0thdGFyaW5hLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQzMixcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkRyaXZlbiBieSBhbiBpbnRlbnNlIGtpbGxlciBpbnN0aW5jdCwgS2F0YXJpbmEgdXNlcyBoZXIgdGFsZW50cyBhcyBhbiBhc3Nhc3NpbiBmb3IgdGhlIGdsb3J5IG9mIE5veHVzLCBhbmQgdGhlIGNvbnRpbnVlZCBlbGV2YXRpb24gb2YgaGVyIGZhbWlseS4gV2hpbGUgaGVyIGZlcnZvciBkcml2ZXMgaGVyIHRvIGV2ZXItZ3JlYXRlciBmZWF0cywgaXQgY2FuIHNvbWV0aW1lcyBsZWFkIGhlciBhc3RyYXkuPGJyPjxicj5Gcm9tIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwia2F5bGVcIixcbiAgICBcImtleVwiOiBcIjEwXCIsXG4gICAgXCJuYW1lXCI6IFwiS2F5bGVcIixcbiAgICBcInRpdGxlXCI6IFwiVGhlIEp1ZGljYXRvclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiU3VwcG9ydFwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTc0LjI0LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDkzLFxuICAgICAgXCJtcFwiOiAzMjIuMixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMjYuODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDguMjYsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjc1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1MSxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMi44LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wMixcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjJcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vS2F5bGUucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogMCxcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkluIGEgd29ybGQgZmFyIGF3YXkgd2hlcmUgYW4gYW5jaWVudCB3YXIgc3RpbGwgcmFnZXMsIEtheWxlIHdhcyBhIGdyZWF0IGhlcm8gLSB0aGUgc3Ryb25nZXN0IG9mIGFuIGltbW9ydGFsIHJhY2UgY29tbWl0dGVkIHRvIGRlc3Ryb3lpbmcgZXZpbCB3aGVyZXZlciBpdCBjb3VsZCBiZSBmb3VuZC4gRm9yIHRlbiB0aG91c2FuZCB5ZWFycywgS2F5bGUgZm91Z2h0IHRpcmVsZXNzbHkgZm9yIGhlciBwZW9wbGUsIHdpZWxkaW5nIGhlciAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImtlbm5lblwiLFxuICAgIFwia2V5XCI6IFwiODVcIixcbiAgICBcIm5hbWVcIjogXCJLZW5uZW5cIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEhlYXJ0IG9mIHRoZSBUZW1wZXN0XCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiLFxuICAgICAgXCJNYXJrc21hblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTM1LjcyLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDc5LFxuICAgICAgXCJtcFwiOiAyMDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMjQuMyxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjc1LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDUuNTksXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjY1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDUwLFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUwLjU0NCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4zLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wOTQ3LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDMuNFxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9LZW5uZW4ucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogNDgsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUaGVyZSBleGlzdHMgYW4gYW5jaWVudCBvcmRlciBvcmlnaW5hdGluZyBpbiB0aGUgSW9uaWFuIElzbGVzIGRlZGljYXRlZCB0byB0aGUgcHJlc2VydmF0aW9uIG9mIGJhbGFuY2UuIE9yZGVyLCBjaGFvcywgbGlnaHQsIGRhcmtuZXNzIC0tIGFsbCB0aGluZ3MgbXVzdCBleGlzdCBpbiBwZXJmZWN0IGhhcm1vbnkgZm9yIHN1Y2ggaXMgdGhlIHdheSBvZiB0aGUgdW5pdmVyc2UuIFRoaXMgb3JkZXIgaXMga25vd24gYXMgdGhlIEtpbmtvdSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImtoYXppeFwiLFxuICAgIFwia2V5XCI6IFwiMTIxXCIsXG4gICAgXCJuYW1lXCI6IFwiS2hhJ1ppeFwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgVm9pZHJlYXZlclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkFzc2Fzc2luXCIsXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU3Mi44LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg1LFxuICAgICAgXCJtcFwiOiAzMjcuMixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM1MCxcbiAgICAgIFwiYXJtb3JcIjogMjcsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMyxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDcuNTEsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjc1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuNTksXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NS4yMDgsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDY1LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuN1xuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9LaGF6aXgucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogOTYsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJBIHZpY2lvdXMgVm9pZCBwcmVkYXRvciwgS2hhJ1ppeCBpbmZpbHRyYXRlZCBWYWxvcmFuIHRvIGRldm91ciB0aGUgbGFuZCdzIG1vc3QgcHJvbWlzaW5nIGNyZWF0dXJlcy4gV2l0aCBlYWNoIGtpbGwgaGUgYWJzb3JicyBoaXMgcHJleSdzIHN0cmVuZ3RoLCBldm9sdmluZyB0byBncm93IG1vcmUgcG93ZXJmdWwuIEtoYSdaaXggaHVuZ2VycyBtb3N0IHRvIGNvbnF1ZXIgYW5kIGNvbnN1bWUgUmVuZ2FyLCB0aGUgb25lIGJlYXN0IGhlIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwia2luZHJlZFwiLFxuICAgIFwia2V5XCI6IFwiMjAzXCIsXG4gICAgXCJuYW1lXCI6IFwiS2luZHJlZFwiLFxuICAgIFwidGl0bGVcIjogXCJUaGUgRXRlcm5hbCBIdW50ZXJzXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFya3NtYW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU0MCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NSxcbiAgICAgIFwibXBcIjogMzAwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDM1LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzI1LFxuICAgICAgXCJhcm1vclwiOiAyMCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1MDAsXG4gICAgICBcImhwcmVnZW5cIjogNyxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogNi45NyxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAxLjcsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi41XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0tpbmRyZWQucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogMTQ0LFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydUZWxsIG1lIGFnYWluLCBsaXR0bGUgTGFtYiwgd2hpY2ggdGhpbmdzIGFyZSBvdXJzIHRvIHRha2U/Jyc8YnI+JydBbGwgdGhpbmdzLCBEZWFyIFdvbGYuJyc8YnI+U2VwYXJhdGUsIGJ1dCBuZXZlciBwYXJ0ZWQsIEtpbmRyZWQgcmVwcmVzZW50cyB0aGUgdHdpbiBlc3NlbmNlcyBvZiBkZWF0aC4gTGFtYidzIGFycm93IG9mZmVycyBhIHN3aWZ0IHJlbGVhc2UgZm9yIHRob3NlIHdobyBhY2NlcHQgdGhlaXIgZmF0ZS4gV29sZiBodW50cyAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImtsZWRcIixcbiAgICBcImtleVwiOiBcIjI0MFwiLFxuICAgIFwibmFtZVwiOiBcIktsZWRcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIENhbnRhbmtlcm91cyBDYXZhbGllclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiVGFua1wiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogMzQwLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDcwLFxuICAgICAgXCJtcFwiOiAxMDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0NSxcbiAgICAgIFwiYXJtb3JcIjogMjYsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogNCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDYsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjc1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDAsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTUsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMy41XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0tsZWQucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjQucG5nXCIsXG4gICAgICBcInhcIjogNDgsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ0Egc2FuZSBtYW4gd291bGQgcnVuIC4gLiAuIGJ1dCBJIGFpbid0IHRoZSBydW5uaW4nIGtpbmQhJyc8YnI+PGJyPkEgd2FycmlvciBhcyBmZWFybGVzcyBhcyBoZSBpcyBvcm5lcnksIEtsZWQgaXMgYSBwb3B1bGFyIGZvbGsgaGVybyBpbiBOb3h1cy4gRW1ib2R5aW5nIHRoZSBmdXJpb3VzIGJyYXZhZG8gb2YgaGlzIG5hdGlvbiwgaGUgaXMgYW4gaWNvbiBiZWxvdmVkIGJ5IHRoZSBlbXBpcmUncyBzb2xkaWVycywgZGlzdHJ1c3RlZCBieSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImtvZ21hd1wiLFxuICAgIFwia2V5XCI6IFwiOTZcIixcbiAgICBcIm5hbWVcIjogXCJLb2cnTWF3XCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBNb3V0aCBvZiB0aGUgQWJ5c3NcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYXJrc21hblwiLFxuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MTcuNzYsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODIsXG4gICAgICBcIm1wXCI6IDMyMi4yLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzI1LFxuICAgICAgXCJhcm1vclwiOiAxOS44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1MDAsXG4gICAgICBcImhwcmVnZW5cIjogNS45MixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogOC42NzUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjcsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1Ny40NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMi40MSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDYsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi42NVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9Lb2dNYXcucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogMTkyLFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydJZiB0aGF0J3MganVzdCBodW5ncnksIEkgZG9uJ3Qgd2FudCB0byBzZWUgYW5ncnkuJyc8YnI+PGJyPldoZW4gdGhlIHByb3BoZXQgTWFsemFoYXIgd2FzIHJlYm9ybiBpbiBJY2F0aGlhLCBoZSB3YXMgbGVkIHRoZXJlIGJ5IGFuIG9taW5vdXMgdm9pY2Ugd2hpY2ggdGhlcmVhZnRlciBhbmNob3JlZCBpdHNlbGYgdG8gaGlzIHBzeWNoZS4gRnJvbSB3aXRoaW4sIHRoaXMgdm9pY2UgYmVzdG93ZWQgdXBvbiBoaW0gdGVycmlibGUgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJsZWJsYW5jXCIsXG4gICAgXCJrZXlcIjogXCI3XCIsXG4gICAgXCJuYW1lXCI6IFwiTGVCbGFuY1wiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgRGVjZWl2ZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJBc3Nhc3NpblwiLFxuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MTYsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNzUsXG4gICAgICBcIm1wXCI6IDMzNCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA1MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMjEuODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDcuNDIsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NC44OCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDEuNFxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9MZWJsYW5jLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDI0MCxcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkV2ZXJ5IGNpdHkgaGFzIGl0cyBkYXJrIHNpZGUsIGV2ZW4gb25lIHdob3NlIHJlcHV0YXRpb24gaXMgYWxyZWFkeSBvZiBhIHF1ZXN0aW9uYWJsZSBodWUuIE5veHVzIC0gdGhvdWdoIGl0cyBuYW1lIGlzIGFscmVhZHkgaW52b2tlZCB3aXRoIGEgbWl4dHVyZSBvZiByZXZlcmVuY2UgYW5kIHJldnVsc2lvbiAtIGlzIG5vIGV4Y2VwdGlvbiB0byB0aGlzIHNpbXBsZSB0cnV0aC4gRGVlcCB3aXRoaW4gdGhlIHdpbmRpbmcgZHVuZ2VvbnMgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJsZWVzaW5cIixcbiAgICBcImtleVwiOiBcIjY0XCIsXG4gICAgXCJuYW1lXCI6IFwiTGVlIFNpblwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgQmxpbmQgTW9ua1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiQXNzYXNzaW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU3MC44LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg1LFxuICAgICAgXCJtcFwiOiAyMDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM1MCxcbiAgICAgIFwiYXJtb3JcIjogMjQuMjE2LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNyxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDcuNDI1LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC43LFxuICAgICAgXCJtcHJlZ2VuXCI6IDUwLFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDYxLjE3NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4yLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL0xlZVNpbi5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiAyODgsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJBcyBhIHlvdW5nIHRlZW4sIExlZSBTaW4gd2FzIGludGVudCBvbiBiZWNvbWluZyBhIHN1bW1vbmVyLiBIaXMgd2lsbCBhbmQgZGVkaWNhdGlvbiB3ZXJlIHVubWF0Y2hlZCBieSBhbnkgb2YgaGlzIHBlZXJzLCBhbmQgaGlzIHNraWxsIGRyZXcgdGhlIGF0dGVudGlvbiBvZiBSZWdpbmFsZCBBc2hyYW0sIHRoZSBMZWFndWUncyBIaWdoIENvdW5jaWxvciBhdCB0aGUgdGltZS4gV2hpbGUgc3R1ZHlpbmcgYXQgdGhlIEFyY2FudW0gTWFqb3JpcywuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImxlb25hXCIsXG4gICAgXCJrZXlcIjogXCI4OVwiLFxuICAgIFwibmFtZVwiOiBcIkxlb25hXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBSYWRpYW50IERhd25cIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJUYW5rXCIsXG4gICAgICBcIlN1cHBvcnRcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU3Ni4xNixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NyxcbiAgICAgIFwibXBcIjogMzAyLjIsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDI3LjIwOCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjYsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA4LjQyNSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuODUsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDYwLjA0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuOVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9MZW9uYS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMS5wbmdcIixcbiAgICAgIFwieFwiOiAzMzYsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ0lmIHlvdSB3b3VsZCBzaGluZSBsaWtlIGEgc3VuLCBmaXJzdCB5b3UgbXVzdCBidXJuIGxpa2Ugb25lLicnPGJyPjxicj5JbWJ1ZWQgd2l0aCB0aGUgZmlyZSBvZiB0aGUgc3VuLCBMZW9uYSBpcyBhIHdhcnJpb3IgdGVtcGxhciBvZiB0aGUgU29sYXJpIHdobyBkZWZlbmRzIE1vdW50IFRhcmdvbiB3aXRoIGhlciBaZW5pdGggQmxhZGUgYW5kIFNoaWVsZCBvZiBEYXlicmVhay4gSGVyIHNraW4gc2hpbW1lcnMgd2l0aCBzdGFyZmlyZSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImxpc3NhbmRyYVwiLFxuICAgIFwia2V5XCI6IFwiMTI3XCIsXG4gICAgXCJuYW1lXCI6IFwiTGlzc2FuZHJhXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBJY2UgV2l0Y2hcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MDYuMTIsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNzUsXG4gICAgICBcIm1wXCI6IDMwNCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA1MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMyNSxcbiAgICAgIFwiYXJtb3JcIjogMjAuMjE2LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNyxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDU1MCxcbiAgICAgIFwiaHByZWdlblwiOiA2LjkyLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA1LjY3LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC40LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTAuNTM2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAyLjcsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMS4zNlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9MaXNzYW5kcmEucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjEucG5nXCIsXG4gICAgICBcInhcIjogMzg0LFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiTGlzc2FuZHJhJ3MgbWFnaWMgdHdpc3RzIHRoZSBwdXJlIHBvd2VyIG9mIGljZSBpbnRvIHNvbWV0aGluZyBkYXJrIGFuZCB0ZXJyaWJsZS4gV2l0aCB0aGUgZm9yY2Ugb2YgaGVyIGJsYWNrIGljZSwgc2hlIGRvZXMgbW9yZSB0aGFuIGZyZWV6ZSAtIHNoZSBpbXBhbGVzIGFuZCBjcnVzaGVzIHRob3NlIHdobyBvcHBvc2UgaGVyLiBUbyB0aGUgdGVycmlmaWVkIGRlbml6ZW5zIG9mIHRoZSBub3J0aCwgc2hlIGlzIGtub3duIG9ubHkgYXMgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJsdWNpYW5cIixcbiAgICBcImtleVwiOiBcIjIzNlwiLFxuICAgIFwibmFtZVwiOiBcIkx1Y2lhblwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgUHVyaWZpZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYXJrc21hblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTU0LjQsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODAsXG4gICAgICBcIm1wXCI6IDM0OC44OCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAzOCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMjQuMDQsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMyxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDUwMCxcbiAgICAgIFwiaHByZWdlblwiOiA2LjE5LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42NSxcbiAgICAgIFwibXByZWdlblwiOiA4LjE3NSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNyxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU3LjQ2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAyLjQxLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wMixcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzLjNcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vTHVjaWFuLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24xLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQzMixcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkx1Y2lhbiB3aWVsZHMgcmVsaWMgd2VhcG9ucyBpbWJ1ZWQgd2l0aCBhbmNpZW50IHBvd2VyIGFuZCBzdGFuZHMgYSBzdGFsd2FydCBndWFyZGlhbiBhZ2FpbnN0IHRoZSB1bmRlYWQuIEhpcyBjb2xkIGNvbnZpY3Rpb24gbmV2ZXIgd2F2ZXJzLCBldmVuIGluIHRoZSBmYWNlIG9mIHRoZSBtYWRkZW5pbmcgaG9ycm9ycyBoZSBkZXN0cm95cyBiZW5lYXRoIGhpcyBoYWlsIG9mIHB1cmlmeWluZyBmaXJlLiBMdWNpYW4gd2Fsa3MgYWxvbmUgb24gLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJsdWx1XCIsXG4gICAgXCJrZXlcIjogXCIxMTdcIixcbiAgICBcIm5hbWVcIjogXCJMdWx1XCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBGYWUgU29yY2VyZXNzXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiU3VwcG9ydFwiLFxuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NTIuNzYsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNzQsXG4gICAgICBcIm1wXCI6IDM1MCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA1NSxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzMCxcbiAgICAgIFwiYXJtb3JcIjogMTkuMjE2LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNyxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDU1MCxcbiAgICAgIFwiaHByZWdlblwiOiA2LjAwNSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNixcbiAgICAgIFwibXByZWdlblwiOiAxMSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNixcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDQ2LjM2OCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMi42LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuMjVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vTHVsdS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiAwLFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJQZXJoYXBzIG1vcmUgdGhhbiBhbnkgb3RoZXIgY2hhbXBpb24gaW4gdGhlIExlYWd1ZSwgTHVsdSBtYXJjaGVzIHRvIHRoZSBiZWF0IG9mIGhlciBvd24gZHJ1bS4gRHVyaW5nIGhlciB5b3V0aCBpbiBCYW5kbGUgQ2l0eSwgc2hlIHNwZW50IG1vc3Qgb2YgaGVyIHRpbWUgd2FuZGVyaW5nIGFsb25lIGluIHRoZSBmb3Jlc3Qgb3IgbG9zdCBpbiBhIGRheWRyZWFtLiBJdCB3YXNuJ3QgdGhhdCBzaGUgd2FzIGFudGlzb2NpYWw7IHRoZSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImx1eFwiLFxuICAgIFwia2V5XCI6IFwiOTlcIixcbiAgICBcIm5hbWVcIjogXCJMdXhcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIExhZHkgb2YgTHVtaW5vc2l0eVwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIixcbiAgICAgIFwiU3VwcG9ydFwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNDc3LjcyLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDc5LFxuICAgICAgXCJtcFwiOiAzODQsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDcsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzAsXG4gICAgICBcImFybW9yXCI6IDE4LjcyLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDQsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1NTAsXG4gICAgICBcImhwcmVnZW5cIjogNS40MixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUzLjU0NCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4zLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDEuMzZcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vTHV4LnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQ4LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJCb3JuIHRvIHRoZSBwcmVzdGlnaW91cyBDcm93bmd1YXJkcywgdGhlIHBhcmFnb24gZmFtaWx5IG9mIERlbWFjaWFuIHNlcnZpY2UsIEx1eGFubmEgd2FzIGRlc3RpbmVkIGZvciBncmVhdG5lc3MuIFNoZSBncmV3IHVwIGFzIHRoZSBmYW1pbHkncyBvbmx5IGRhdWdodGVyLCBhbmQgc2hlIGltbWVkaWF0ZWx5IHRvb2sgdG8gdGhlIGFkdmFuY2VkIGVkdWNhdGlvbiBhbmQgbGF2aXNoIHBhcnRpZXMgcmVxdWlyZWQgb2YgZmFtaWxpZXMgYXMgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJtYWxwaGl0ZVwiLFxuICAgIFwia2V5XCI6IFwiNTRcIixcbiAgICBcIm5hbWVcIjogXCJNYWxwaGl0ZVwiLFxuICAgIFwidGl0bGVcIjogXCJTaGFyZCBvZiB0aGUgTW9ub2xpdGhcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJUYW5rXCIsXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU3NC4yLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDkwLFxuICAgICAgXCJtcFwiOiAyODIuMixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMjguMyxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjc1LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogNyxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogNy4zMixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA2MS45NyxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4zNzUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjAyLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDMuNFxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9NYWxwaGl0ZS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiA5NixcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGhlcmUgaXMgYSB3b3JsZCBvZiBwZXJmZWN0IGhhcm1vbnksIHdoZXJlIGFsbCBhcmUgcGFydCBvZiB0aGUgd2hvbGUuIFRoZSBNb25vbGl0aCBpcyB0aGUgZXNzZW5jZSBvZiBhbGwgY3JlYXRpb24sIGFuZCBpdHMgZGVuaXplbnMgYXJlIGJ1dCBzaW5ndWxhciBwaWVjZXMgb2YgaXQuIEl0IGlzIGJlYXV0aWZ1bCBpbiBpdHMgc3ltbWV0cnksIGFuZCBpbiBpdHMgYWxtb3N0IGNvbXBsZXRlIGxhY2sgb2YgdW5jZXJ0YWludHkuIFRoZSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIm1hbHphaGFyXCIsXG4gICAgXCJrZXlcIjogXCI5MFwiLFxuICAgIFwibmFtZVwiOiBcIk1hbHphaGFyXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBQcm9waGV0IG9mIHRoZSBWb2lkXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiLFxuICAgICAgXCJBc3Nhc3NpblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTI1LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDc1LFxuICAgICAgXCJtcFwiOiAzMDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNTUsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDIwLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDUwMCxcbiAgICAgIFwiaHByZWdlblwiOiA2LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NSxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAxLjVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vTWFsemFoYXIucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogMTQ0LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJNYW55IG1lbiBoYXZlIGdvbmUgbWFkIGJlbmVhdGggdGhlIGdsYXJlIG9mIHRoZSBTaHVyaW1hIHN1biwgYnV0IGl0IHdhcyBkdXJpbmcgdGhlIG5pZ2h0J3MgY2hpbGxpbmcgZW1icmFjZSB0aGF0IE1hbHphaGFyIHJlbGlucXVpc2hlZCBoaXMgc2FuaXR5LiBNYWx6YWhhciB3YXMgYm9ybiBhIHNlZXIsIGJsZXNzZWQgd2l0aCB0aGUgZ2lmdCBvZiBwcm9waGVjeS4gSGlzIHRhbGVudCwgdGhvdWdoIHVucmVmaW5lZCwgcHJvbWlzZWQgdG8gLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJtYW9rYWlcIixcbiAgICBcImtleVwiOiBcIjU3XCIsXG4gICAgXCJuYW1lXCI6IFwiTWFva2FpXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBUd2lzdGVkIFRyZWFudFwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlRhbmtcIixcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTcyLjIsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTAsXG4gICAgICBcIm1wXCI6IDM3Ny4yOCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MyxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMjguNzIsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogNCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDcsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjc1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuMjA1LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC40NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDYzLjU0NCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4zLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4xLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuMTI1XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL01hb2thaS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiAxOTIsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnQWxsIGFyb3VuZCBtZSBhcmUgZW1wdHkgaHVza3MsIHNvdWxsZXNzIGFuZCB1bmFmcmFpZC4uLiBidXQgSSB3aWxsIGJyaW5nIHRoZW0gZmVhci4nJzxicj48YnI+TWFva2FpIGlzIGEgcmFnZWZ1bCwgdG93ZXJpbmcgdHJlYW50IHdobyBmaWdodHMgdGhlIHVubmF0dXJhbCBob3Jyb3JzIG9mIHRoZSBTaGFkb3cgSXNsZXMuIEhlIHdhcyB0d2lzdGVkIGludG8gYSBmb3JjZSBvZiB2ZW5nZWFuY2UgYWZ0ZXIgYSBtYWdpY2FsIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwibWFzdGVyeWlcIixcbiAgICBcImtleVwiOiBcIjExXCIsXG4gICAgXCJuYW1lXCI6IFwiTWFzdGVyIFlpXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBXdWp1IEJsYWRlc21hblwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkFzc2Fzc2luXCIsXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU5OC41NixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5MixcbiAgICAgIFwibXBcIjogMjUwLjU2LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQyLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzU1LFxuICAgICAgXCJhcm1vclwiOiAyNC4wNCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogNy41OSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNjUsXG4gICAgICBcIm1wcmVnZW5cIjogNy4yNTUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjQ1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNjAuMDQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA4LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDJcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vTWFzdGVyWWkucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogMjQwLFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUaHJvdWdoIHRoZSBhbmNpZW50IG1hcnRpYWwgYXJ0IG9mIFd1anUsIE1hc3RlciBZaSBoYXMgdGVtcGVyZWQgaGlzIGJvZHkgYW5kIHNoYXJwZW5lZCBoaXMgbWluZCB1bnRpbCB0aG91Z2h0IGFuZCBhY3Rpb24gaGF2ZSBiZWNvbWUgb25lLiBUaG91Z2ggaGUgY2hvb3NlcyB0byBlbnRlciBpbnRvIHZpb2xlbmNlIGFzIGEgbGFzdCByZXNvcnQsIHRoZSBncmFjZSBhbmQgc3BlZWQgd2l0aCB3aGljaCBoZSB3aWVsZHMgaGlzIGJsYWRlIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwibWlzc2ZvcnR1bmVcIixcbiAgICBcImtleVwiOiBcIjIxXCIsXG4gICAgXCJuYW1lXCI6IFwiTWlzcyBGb3J0dW5lXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBCb3VudHkgSHVudGVyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFya3NtYW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUzMCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NSxcbiAgICAgIFwibXBcIjogMzI1Ljg0LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDM1LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzI1LFxuICAgICAgXCJhcm1vclwiOiAyNC4wNCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDYuMTksXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjY1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDguMDQsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjY1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNDYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDEsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA0NzM0LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDNcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vTWlzc0ZvcnR1bmUucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogMjg4LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ1RoZSBiaWdnZXIgdGhlIHJpc2ssIHRoZSBiaWdnZXIgdGhlIGJvdW50eS4nJzxicj48YnI+QmVhdXR5IGFuZCBkYW5nZXI6IFRoZXJlIGFyZSBmZXcgd2hvIGNhbiBtYXRjaCBNaXNzIEZvcnR1bmUgaW4gZWl0aGVyLiBPbmUgb2YgQmlsZ2V3YXRlcidzIG1vc3QgaW5mYW1vdXMgYm91bnR5IGh1bnRlcnMsIHNoZSBidWlsdCBoZXIgbGVnZW5kIHVwb24gYSBzd2F0aGUgb2YgYnVsbGV0LXJpZGRsZWQgY29ycHNlcyBhbmQgY2FwdHVyZWQgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJtb25rZXlraW5nXCIsXG4gICAgXCJrZXlcIjogXCI2MlwiLFxuICAgIFwibmFtZVwiOiBcIld1a29uZ1wiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgTW9ua2V5IEtpbmdcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIlRhbmtcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU3Ny44LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg1LFxuICAgICAgXCJtcFwiOiAyNjUuODQsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMzgsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDUsXG4gICAgICBcImFybW9yXCI6IDI0Ljg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTc1LFxuICAgICAgXCJocHJlZ2VuXCI6IDYuMTksXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjY1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDguMDQsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjY1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTkuODc2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjIsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA1LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDNcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vTW9ua2V5S2luZy5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiAzMzYsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkR1cmluZyB0aGUgY2hhb3Mgb2YgdGhlIFJ1bmUgV2FycywgYW4gZW5vcm1vdXMgcnVuZXN0b25lIHdhcyBsb3N0IGRlZXAgd2l0aGluIHRoZSBQbGFndWUgSnVuZ2xlcy4gSXQgcmVtYWluZWQgdGhlcmUsIHVudG91Y2hlZCBmb3IgY2VudHVyaWVzLCBlbWFuYXRpbmcgYSBwb3RlbnQgbWFnaWMgd2hpY2ggaW5mdXNlZCBuZWFyYnkgd2lsZGxpZmUgd2l0aCBzZW50aWVuY2UgYW5kIHZpdGFsaXR5LiBBIGdyb3VwIG9mIG1vbmtleXMgd2hvIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwibW9yZGVrYWlzZXJcIixcbiAgICBcImtleVwiOiBcIjgyXCIsXG4gICAgXCJuYW1lXCI6IFwiTW9yZGVrYWlzZXJcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIElyb24gUmV2ZW5hbnRcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MjUsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNzMsXG4gICAgICBcIm1wXCI6IDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMyNSxcbiAgICAgIFwiYXJtb3JcIjogMjAsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy43NSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTc1LFxuICAgICAgXCJocHJlZ2VuXCI6IDQsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjMsXG4gICAgICBcIm1wcmVnZW5cIjogMCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA2MSxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMC4wNCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjJcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vTW9yZGVrYWlzZXIucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogMzg0LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ0FsbCB0aGluZ3MgbXVzdCBkaWUuLi4gYW5kIHlldCBJIGxpdmUgb24uJyc8YnI+PGJyPlRoZSBiYWxlZnVsIHJldmVuYW50IE1vcmRla2Fpc2VyIGlzIGFtb25nIHRoZSBtb3N0IHRlcnJpZnlpbmcgYW5kIGhhdGVmdWwgc3Bpcml0cyBoYXVudGluZyB0aGUgU2hhZG93IElzbGVzLiBIZSBoYXMgZXhpc3RlZCBmb3IgY291bnRsZXNzIGNlbnR1cmllcywgc2hpZWxkZWQgZnJvbSB0cnVlIGRlYXRoIGJ5IG5lY3JvbWFudGljIHNvcmNlcnkgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJtb3JnYW5hXCIsXG4gICAgXCJrZXlcIjogXCIyNVwiLFxuICAgIFwibmFtZVwiOiBcIk1vcmdhbmFcIixcbiAgICBcInRpdGxlXCI6IFwiRmFsbGVuIEFuZ2VsXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiLFxuICAgICAgXCJTdXBwb3J0XCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NDcuNDgsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODYsXG4gICAgICBcIm1wXCI6IDM0MC44LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDYwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAyNS4zODQsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy44LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNDUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDUuNzA1LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42LFxuICAgICAgXCJtcHJlZ2VuXCI6IDguNSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU1LjQ2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMS41M1xuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9Nb3JnYW5hLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQzMixcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGhlcmUgaXMgYSB3b3JsZCBmYXIgYXdheSBwb3B1bGF0ZWQgYnkgZ3JhY2VmdWwgYW5kIGJlYXV0aWZ1bCB3aW5nZWQgYmVpbmdzIGdpZnRlZCB3aXRoIGltbW9ydGFsaXR5LCB3aGVyZSBhbiBhbmNpZW50IGNvbmZsaWN0IHN0aWxsIHJhZ2VzLiBMaWtlIHNvIG1hbnkgY29uZmxpY3RzLCB0aGlzIHdhciBzcGxpdCBmYW1pbGllcy4gT25lIHNpZGUgcHJvY2xhaW1lZCB0aGVtc2VsdmVzIGFzIGJlaW5ncyBvZiBwZXJmZWN0IG9yZGVyIGFuZCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIm5hbWlcIixcbiAgICBcImtleVwiOiBcIjI2N1wiLFxuICAgIFwibmFtZVwiOiBcIk5hbWlcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFRpZGVjYWxsZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJTdXBwb3J0XCIsXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDQ4OS4zMixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA3NCxcbiAgICAgIFwibXBcIjogMzc3LjI0LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQzLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAxOS43MixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiA0LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDUuNDIsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDExLjUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjQsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1MS4yMDgsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDMsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi42MVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9OYW1pLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDAsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJOYW1pIGNoYW5uZWxzIHRoZSBwcmltYWwgZW5lcmdpZXMgb2YgdGhlIG9jZWFuLCBoYXJuZXNzaW5nIGl0cyBteXN0aWNhbCByZXN0b3JhdGl2ZSBwcm9wZXJ0aWVzIGFuZCBjb21tYW5kaW5nIHRoZSByYXcgcG93ZXIgb2YgdGhlIHRpZGVzIHRoZW1zZWx2ZXMuIFRob3VnaCBtYW55IGRvdWJ0ZWQgaGVyLCBOYW1pIGhhZCB0aGUgYnJhdmVyeSBhbmQgZGV0ZXJtaW5hdGlvbiB0byB0YWtlIG9uIGEgZGFuZ2Vyb3VzIHF1ZXN0IHdoZW4gbm8gLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJuYXN1c1wiLFxuICAgIFwia2V5XCI6IFwiNzVcIixcbiAgICBcIm5hbWVcIjogXCJOYXN1c1wiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgQ3VyYXRvciBvZiB0aGUgU2FuZHNcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIlRhbmtcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU2MS4yLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDkwLFxuICAgICAgXCJtcFwiOiAzMjUuNixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MixcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM1MCxcbiAgICAgIFwiYXJtb3JcIjogMjQuODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOS4wMSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuOSxcbiAgICAgIFwibXByZWdlblwiOiA3LjQ0LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC41LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTkuMTgsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDIsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMy40OFxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9OYXN1cy5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiA0OCxcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnV2hhdCB3YXMgZmFsbGVuIHdpbGwgYmUgZ3JlYXQgYWdhaW4uJyc8YnI+PGJyPk5hc3VzIGlzIGFuIGltcG9zaW5nLCBqYWNrYWwtaGVhZGVkIEFzY2VuZGVkIGJlaW5nIGZyb20gYW5jaWVudCBTaHVyaW1hLCBhIGhlcm9pYyBmaWd1cmUgcmVnYXJkZWQgYXMgYSBkZW1pZ29kIGJ5IHRoZSBwZW9wbGUgb2YgdGhlIGRlc2VydC4gRmllcmNlbHkgaW50ZWxsaWdlbnQsIGhlIHdhcyBhIGd1YXJkaWFuIG9mIGtub3dsZWRnZSBhbmQgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJuYXV0aWx1c1wiLFxuICAgIFwia2V5XCI6IFwiMTExXCIsXG4gICAgXCJuYW1lXCI6IFwiTmF1dGlsdXNcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFRpdGFuIG9mIHRoZSBEZXB0aHNcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJUYW5rXCIsXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU3Ni40OCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NixcbiAgICAgIFwibXBcIjogMzM0LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQ3LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzI1LFxuICAgICAgXCJhcm1vclwiOiAyNi40NixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjc1LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxNzUsXG4gICAgICBcImhwcmVnZW5cIjogOC4zNyxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogOC42MjUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjcsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1Ny41NDQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMC4wMixcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAxXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL05hdXRpbHVzLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDk2LFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiT25jZSwgTmF1dGlsdXMgd2FzIGEgc2FpbG9yIGNvbW1pc3Npb25lZCBieSB0aGUgSW5zdGl0dXRlIG9mIFdhciB0byBleHBsb3JlIHRoZSB1bmNoYXJ0ZWQgcmVhY2hlcyBvZiB0aGUgR3VhcmRpYW4ncyBTZWEuIFRoaXMgZXhwZWRpdGlvbiB0b29rIGhpbSBkZWVwIGludG8gdW5rbm93biB3YXRlcnMgd2hlcmUgaGUgYW5kIGhpcyBjcmV3IGZvdW5kIGEgdmFzdCBzZWN0aW9uIG9mIGJsYWNrIG9vemluZyBsaXF1aWQgdGhhdCBub25lIG9mIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwibmlkYWxlZVwiLFxuICAgIFwia2V5XCI6IFwiNzZcIixcbiAgICBcIm5hbWVcIjogXCJOaWRhbGVlXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBCZXN0aWFsIEh1bnRyZXNzXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiQXNzYXNzaW5cIixcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTExLjIsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODAsXG4gICAgICBcIm1wXCI6IDI5NS42LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQ1LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAyMi44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1MjUsXG4gICAgICBcImhwcmVnZW5cIjogNi4wMDUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjYsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDQ3Ljg4LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjAyLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDMuMjJcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vTmlkYWxlZS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiAxNDQsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUaGVyZSBhcmUgZmV3IGR3ZWxsZXJzLCBsZXQgYWxvbmUgY2hhbXBpb25zLCByZXNpZGluZyBpbiB0aGUgYmxhc3RlZCBhbmQgZGFuZ2Vyb3VzIGxhbmRzIHRoYXQgbGllIHNvdXRoIG9mIHRoZSBHcmVhdCBCYXJyaWVyLiBNdWNoIG9mIHRoYXQgd29ybGQgc3RpbGwgYmVhcnMgdGhlIHNjYXJzIG9mIHBhc3QgUnVuZXMgV2FycywgZXNwZWNpYWxseSB0aGUgbXlzdGVyaW91cyBLdW11bmd1IEp1bmdsZS4gVGhlcmUgYXJlIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwibm9jdHVybmVcIixcbiAgICBcImtleVwiOiBcIjU2XCIsXG4gICAgXCJuYW1lXCI6IFwiTm9jdHVybmVcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEV0ZXJuYWwgTmlnaHRtYXJlXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiQXNzYXNzaW5cIixcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTgyLjgsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODUsXG4gICAgICBcIm1wXCI6IDI3My44LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDM1LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQ1LFxuICAgICAgXCJhcm1vclwiOiAyNi44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA4LjI2LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC43NSxcbiAgICAgIFwibXByZWdlblwiOiA2Ljc1NSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNDUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1OS4yMDgsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDY1LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuN1xuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9Ob2N0dXJuZS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiAxOTIsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJCZWZvcmUgTm9jdHVybmUsIHBlb3BsZSBiZWxpZXZlZCB0aGF0IGRyZWFtcyB3ZXJlIGZpZ21lbnRzIG9mIHRoZWlyIGltYWdpbmF0aW9uLCBtZWFuaW5nbGVzcyBpbWFnZXMgdGhhdCBmbGFzaGVkIHRocm91Z2ggdGhlIG1pbmQgd2hlbiBvbmUgc2xlcHQuIFRoaXMgYmVsaWVmIHdhcyBwdXQgdG8gdGhlIHRlc3Qgd2hlbiBhIHJhc2ggb2Ygc2xlZXAtcmVsYXRlZCBpbmNpZGVudHMgc3RhcnRlZCBhZmZsaWN0aW5nIHN1bW1vbmVycyBvZiAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIm51bnVcIixcbiAgICBcImtleVwiOiBcIjIwXCIsXG4gICAgXCJuYW1lXCI6IFwiTnVudVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgWWV0aSBSaWRlclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlN1cHBvcnRcIixcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTk4LjI4LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDkwLFxuICAgICAgXCJtcFwiOiAyODMuNTYsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDIsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNTAsXG4gICAgICBcImFybW9yXCI6IDI2LjM4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDguMzksXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcIm1wcmVnZW5cIjogNy40NCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU5LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiA0LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuMjVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vTnVudS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiAyNDAsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJTb21ldGltZXMgYm9uZHMgb2YgZnJpZW5kc2hpcCBiZWNvbWUgc3Ryb25nZXIgdGhhbiBldmVuIGJvbmRzIG9mIGJsb29kLiBXaGVuIHRob3NlIGJvbmRzIGxpbmsgYSBmZWFybGVzcyBib3kgdG8gYSBmZWFyc29tZSBZZXRpLCB0aGUgYm9uZCBiZWNvbWVzIGEgZm9yY2UgdG8gYmUgcmVja29uZWQgd2l0aC4gR2l2ZW4gdGhlIHJlc3BvbnNpYmlsaXR5IG9mIHRhbWluZyBhIHRlcnJpZnlpbmcgYmVhc3QsIE51bnUgZm9yZ2VkIGEgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJvbGFmXCIsXG4gICAgXCJrZXlcIjogXCIyXCIsXG4gICAgXCJuYW1lXCI6IFwiT2xhZlwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgQmVyc2Vya2VyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJUYW5rXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1OTcuMjQsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTMsXG4gICAgICBcIm1wXCI6IDMxNS42LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQyLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzUwLFxuICAgICAgXCJhcm1vclwiOiAyNi4wNCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOC41MSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuOSxcbiAgICAgIFwibXByZWdlblwiOiA3LjQ2NSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNTc1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTkuOTgsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMSxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjdcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vT2xhZi5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiAyODgsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJNb3N0IG1lbiB3b3VsZCBzYXkgdGhhdCBkZWF0aCBpcyBhIHRoaW5nIHRvIGJlIGZlYXJlZDsgbm9uZSBvZiB0aG9zZSBtZW4gd291bGQgYmUgT2xhZi4gVGhlIEJlcnNlcmtlciBsaXZlcyBvbmx5IGZvciB0aGUgcm9hciBvZiBhIGJhdHRsZSBjcnkgYW5kIHRoZSBjbGFzaCBvZiBzdGVlbC4gU3B1cnJlZCBvbiBieSBoaXMgaHVuZ2VyIGZvciBnbG9yeSBhbmQgdGhlIGxvb21pbmcgY3Vyc2Ugb2YgYSBmb3JnZXR0YWJsZSBkZWF0aCwgT2xhZiAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIm9yaWFubmFcIixcbiAgICBcImtleVwiOiBcIjYxXCIsXG4gICAgXCJuYW1lXCI6IFwiT3JpYW5uYVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgTGFkeSBvZiBDbG9ja3dvcmtcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCIsXG4gICAgICBcIlN1cHBvcnRcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUxNy43MixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA3OSxcbiAgICAgIFwibXBcIjogMzM0LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDUwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzI1LFxuICAgICAgXCJhcm1vclwiOiAxNy4wNCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDYuODcsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA0MC4zNjgsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDIuNixcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDUsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMy41XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL09yaWFubmEucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogMzM2LFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGhlcmUgb25jZSB3YXMgYSBQaWx0b3ZpYW4gbWFuIG5hbWVkIENvcmluIFJldmVjayB3aG8gaGFkIGEgZGF1Z2h0ZXIgbmFtZWQgT3JpYW5uYSwgd2hvbSBoZSBsb3ZlZCBtb3JlIHRoYW4gYW55dGhpbmcgZWxzZSBpbiB0aGUgd29ybGQuIFRob3VnaCBPcmlhbm5hIGhhZCBpbmNyZWRpYmxlIHRhbGVudCBmb3IgZGFuY2luZywgc2hlIHdhcyBkZWVwbHkgZmFzY2luYXRlZCBieSB0aGUgY2hhbXBpb25zIG9mIHRoZSBMZWFndWUgb2YgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJwYW50aGVvblwiLFxuICAgIFwia2V5XCI6IFwiODBcIixcbiAgICBcIm5hbWVcIjogXCJQYW50aGVvblwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgQXJ0aXNhbiBvZiBXYXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIkFzc2Fzc2luXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NzkuMTYsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODcsXG4gICAgICBcIm1wXCI6IDMxNy4xMixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAzMSxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM1NSxcbiAgICAgIFwiYXJtb3JcIjogMjcuNjUyLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuOSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDcuODQsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjY1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuMzU1LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC40NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU1LjU3MixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMi45LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjk1XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1BhbnRoZW9uLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDM4NCxcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnQnJpbmcgZm9ydGggb25lIHRydWUgY2hhbXBpb24sIG9yIGEgaHVuZHJlZCBtb3JlIGxpa2UgeW91LCBhbmQgdGhlbiB3ZSBzaGFsbCBoYXZlIGEgYmF0dGxlIHRoYXQgd2lsbCBiZSBzcG9rZW4gb2YgdW50aWwgdGhlIGVuZCBvZiB0aW1lLicnPGJyPjxicj5UaGUgcGVlcmxlc3Mgd2FycmlvciBrbm93biBhcyBQYW50aGVvbiBpcyBhIG5pZ2gtdW5zdG9wcGFibGUgcGFyYWdvbiBvZiBiYXR0bGUuIEhlIHdhcyBib3JuIGFtb25nIHRoZSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInBvcHB5XCIsXG4gICAgXCJrZXlcIjogXCI3OFwiLFxuICAgIFwibmFtZVwiOiBcIlBvcHB5XCIsXG4gICAgXCJ0aXRsZVwiOiBcIktlZXBlciBvZiB0aGUgSGFtbWVyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiVGFua1wiLFxuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NDAsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTAsXG4gICAgICBcIm1wXCI6IDI4MCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0NSxcbiAgICAgIFwiYXJtb3JcIjogMjksXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDgsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcIm1wcmVnZW5cIjogNyxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNyxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiA0LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuNVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9Qb3BweS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiA0MzIsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ0knbSBubyBoZXJvLiBKdXN0IGEgeW9yZGxlIHdpdGggYSBoYW1tZXIuJyc8YnI+PGJyPlJ1bmV0ZXJyYSBoYXMgbm8gc2hvcnRhZ2Ugb2YgdmFsaWFudCBjaGFtcGlvbnMsIGJ1dCBmZXcgYXJlIGFzIHRlbmFjaW91cyBhcyBQb3BweS4gQmVhcmluZyBhIGhhbW1lciB0d2ljZSB0aGUgbGVuZ3RoIG9mIGhlciBib2R5LCB0aGlzIGRldGVybWluZWQgeW9yZGxlIGhhcyBzcGVudCB1bnRvbGQgeWVhcnMgc2VhcmNoaW5nIGZvciB0aGUgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJxdWlublwiLFxuICAgIFwia2V5XCI6IFwiMTMzXCIsXG4gICAgXCJuYW1lXCI6IFwiUXVpbm5cIixcbiAgICBcInRpdGxlXCI6IFwiRGVtYWNpYSdzIFdpbmdzXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFya3NtYW5cIixcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTMyLjgsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODUsXG4gICAgICBcIm1wXCI6IDI2OC44LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDM1LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAyMy4zOCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1MjUsXG4gICAgICBcImhwcmVnZW5cIjogNS40MixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogNi45NyxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU0LjQ2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAyLjQxLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNjUsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMy4xXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1F1aW5uLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDAsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJRdWlubiBhbmQgVmFsb3IgYXJlIGFuIGVsaXRlIHJhbmdlciB0ZWFtLiBXaXRoIGNyb3NzYm93IGFuZCBjbGF3LCB0aGV5IHVuZGVydGFrZSB0aGVpciBuYXRpb24ncyBtb3N0IGRhbmdlcm91cyBtaXNzaW9ucyBkZWVwIHdpdGhpbiBlbmVteSB0ZXJyaXRvcnksIGZyb20gc3dpZnQgcmVjb25uYWlzc2FuY2UgdG8gbGV0aGFsIHN0cmlrZXMuIFRoZSBwYWlyJ3MgdW5icmVha2FibGUgYm9uZCBpcyBkZWFkbHkgb24gdGhlIGJhdHRsZWZpZWxkLCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInJhbW11c1wiLFxuICAgIFwia2V5XCI6IFwiMzNcIixcbiAgICBcIm5hbWVcIjogXCJSYW1tdXNcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEFybW9yZGlsbG9cIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJUYW5rXCIsXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU2NC40OCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NixcbiAgICAgIFwibXBcIjogMzEwLjQ0LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDMzLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAzMS4zODQsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogNC4zLFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogNy45MixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogNy44NCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU1Ljg4LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi4yMTVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vUmFtbXVzLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQ4LFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydPSy4nJzxicj48YnI+SWRvbGl6ZWQgYnkgbWFueSwgZGlzbWlzc2VkIGJ5IHNvbWUsIG15c3RpZnlpbmcgdG8gYWxsLCB0aGUgY3VyaW91cyBiZWluZywgUmFtbXVzLCBpcyBhbiBlbmlnbWEuIFByb3RlY3RlZCBieSBhIHNwaWtlZCBzaGVsbCwgUmFtbXVzIGluc3BpcmVzIGluY3JlYXNpbmdseSBkaXNwYXJhdGUgdGhlb3JpZXMgb24gaGlzIG9yaWdpbiB3aGVyZXZlciBoZSBnb2VzIC0gZnJvbSBkZW1pZ29kLCB0byBzYWNyZWQgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJyZWtzYWlcIixcbiAgICBcImtleVwiOiBcIjQyMVwiLFxuICAgIFwibmFtZVwiOiBcIlJlaydTYWlcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFZvaWQgQnVycm93ZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NzAsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTAsXG4gICAgICBcIm1wXCI6IDEwMCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAyNCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjQsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDE3NSxcbiAgICAgIFwiaHByZWdlblwiOiA3LjM0LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42NSxcbiAgICAgIFwibXByZWdlblwiOiAwLFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU1LjYyOCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4zNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1Jla1NhaS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiA5NixcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRoZSBsYXJnZXN0IGFuZCBmaWVyY2VzdCBvZiBoZXIgc3BlY2llcywgUmVrJ1NhaSBpcyBhIG1lcmNpbGVzcyBwcmVkYXRvciB0aGF0IHR1bm5lbHMgdGhyb3VnaCB0aGUgZWFydGggdG8gYW1idXNoIGFuZCBkZXZvdXIgaGVyIHByZXkuIEhlciBpbnNhdGlhYmxlIGh1bmdlciBoYXMgbGFpZCB3YXN0ZSB0byBlbnRpcmUgcmVnaW9ucyBvZiB0aGUgb25jZS1ncmVhdCBTaHVyaW1hbiBlbXBpcmUuIE1lcmNoYW50cywgdHJhZGVycyBhbmQgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJyZW5la3RvblwiLFxuICAgIFwia2V5XCI6IFwiNThcIixcbiAgICBcIm5hbWVcIjogXCJSZW5la3RvblwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgQnV0Y2hlciBvZiB0aGUgU2FuZHNcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIlRhbmtcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU3Mi4xNixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NyxcbiAgICAgIFwibXBcIjogMTAwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDUsXG4gICAgICBcImFybW9yXCI6IDI1LjU4NCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjgsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA3Ljk2LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC43NSxcbiAgICAgIFwibXByZWdlblwiOiAwLFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU4LjMyOCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4xLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNixcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjY1XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1JlbmVrdG9uLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDE0NCxcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnQmxvb2QgYW5kIHZlbmdlYW5jZS4nJzxicj48YnI+UmVuZWt0b24gaXMgYSB0ZXJyaWZ5aW5nLCByYWdlLWZ1ZWxlZCBBc2NlbmRlZCBiZWluZyBmcm9tIHRoZSBzY29yY2hlZCBkZXNlcnRzIG9mIFNodXJpbWEuIE9uY2UsIGhlIHdhcyBoaXMgZW1waXJlJ3MgbW9zdCBlc3RlZW1lZCB3YXJyaW9yLCBsZWFkaW5nIHRoZSBhcm1pZXMgb2YgU2h1cmltYSB0byBjb3VudGxlc3MgdmljdG9yaWVzLiBIb3dldmVyLCBhZnRlciB0aGUgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJyZW5nYXJcIixcbiAgICBcImtleVwiOiBcIjEwN1wiLFxuICAgIFwibmFtZVwiOiBcIlJlbmdhclwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgUHJpZGVzdGFsa2VyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiQXNzYXNzaW5cIixcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTg2LjIsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTAsXG4gICAgICBcIm1wXCI6IDUsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0NSxcbiAgICAgIFwiYXJtb3JcIjogMjUuODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogNC4yNyxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNCxcbiAgICAgIFwibXByZWdlblwiOiAwLFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDYwLjA0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wOCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjg1XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1Jlbmdhci5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiAxOTIsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJPbiBldmVyeSB3YWxsIG9mIGhpcyBkZW4sIHRoZSB0cm9waHkgaHVudGVyIFJlbmdhciBtb3VudHMgdGhlIGhlYWRzLCBob3JucywgY2xhd3MsIGFuZCBmYW5ncyBvZiB0aGUgbW9zdCBsZXRoYWwgY3JlYXR1cmVzIGluIFZhbG9yYW4uIFRob3VnaCBoaXMgY29sbGVjdGlvbiBpcyBleHRlbnNpdmUsIGhlIHJlbWFpbnMgdW5zYXRpc2ZpZWQsIHRpcmVsZXNzbHkgc2Vla2luZyBncmVhdGVyIGdhbWUuIEhlIHRha2VzIHRpbWUgd2l0aCBldmVyeSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInJpdmVuXCIsXG4gICAgXCJrZXlcIjogXCI5MlwiLFxuICAgIFwibmFtZVwiOiBcIlJpdmVuXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBFeGlsZVwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiQXNzYXNzaW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU1OC40OCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NixcbiAgICAgIFwibXBcIjogMCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQwLFxuICAgICAgXCJhcm1vclwiOiAyNC4zNzYsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy4yLFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogNS4zNCxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNSxcbiAgICAgIFwibXByZWdlblwiOiAwLFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU2LjA0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDMuNVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9SaXZlbi5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMi5wbmdcIixcbiAgICAgIFwieFwiOiAyNDAsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ1RoZXJlIGlzIGEgcGxhY2UgYmV0d2VlbiB3YXIgYW5kIG11cmRlciBpbiB3aGljaCBvdXIgZGVtb25zIGx1cmsuJyc8YnI+PGJyPkluIE5veHVzLCBhbnkgY2l0aXplbiBtYXkgcmlzZSB0byBwb3dlciByZWdhcmRsZXNzIG9mIHJhY2UsIGdlbmRlciwgb3Igc29jaWFsIHN0YW5kaW5nIC0gc3RyZW5ndGggaXMgYWxsIHRoYXQgbWF0dGVycy4gSXQgd2FzIHdpdGggY29tbWl0dGVkIGZhaXRoIGluIHRoaXMgaWRlYWwgdGhhdCBSaXZlbiAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInJ1bWJsZVwiLFxuICAgIFwia2V5XCI6IFwiNjhcIixcbiAgICBcIm5hbWVcIjogXCJSdW1ibGVcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIE1lY2hhbml6ZWQgTWVuYWNlXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1ODQuNCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MCxcbiAgICAgIFwibXBcIjogMTAwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDUsXG4gICAgICBcImFybW9yXCI6IDI1Ljg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDguMDA1LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42LFxuICAgICAgXCJtcHJlZ2VuXCI6IDAsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNjEuMDM2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjIsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjAzLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDEuODVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vUnVtYmxlLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDI4OCxcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnVWdoLCBpdCdzIGdvbm5hIHRha2UgZm9yZXZlciB0byBzY3JhcGUgeW91ciBmYWNlIG9mZiBteSBzdWl0IScnPGJyPjxicj5FdmVuIGFtb25nc3QgeW9yZGxlcywgUnVtYmxlIHdhcyBhbHdheXMgdGhlIHJ1bnQgb2YgdGhlIGxpdHRlci4gQXMgc3VjaCwgaGUgd2FzIHVzZWQgdG8gYmVpbmcgYnVsbGllZC4gSW4gb3JkZXIgdG8gc3Vydml2ZSwgaGUgaGFkIHRvIGJlIHNjcmFwcGllciBhbmQgbW9yZSByZXNvdXJjZWZ1bCB0aGFuIGhpcyAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInJ5emVcIixcbiAgICBcImtleVwiOiBcIjEzXCIsXG4gICAgXCJuYW1lXCI6IFwiUnl6ZVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgUnVuZSBNYWdlXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiLFxuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NTguNDgsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODYsXG4gICAgICBcIm1wXCI6IDQwMCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA1MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0MCxcbiAgICAgIFwiYXJtb3JcIjogMjEuNTUyLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1NTAsXG4gICAgICBcImhwcmVnZW5cIjogNyxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU1LjA0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuMTEyXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1J5emUucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjIucG5nXCIsXG4gICAgICBcInhcIjogMzM2LFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydUYWtlIGNhcmUgd2l0aCB0aGlzIHdvcmxkLiBXaGF0IGlzIG1hZGUgY2FuIGJlIHVubWFkZS4nJzxicj48YnI+V2lkZWx5IGNvbnNpZGVyZWQgb25lIG9mIHRoZSBtb3N0IGFkZXB0IHNvcmNlcmVycyBvbiBSdW5ldGVycmEsIFJ5emUgaXMgYW4gYW5jaWVudCwgaGFyZC1iaXR0ZW4gYXJjaG1hZ2Ugd2l0aCBhbiBpbXBvc3NpYmx5IGhlYXZ5IGJ1cmRlbiB0byBiZWFyLiBBcm1lZCB3aXRoIGEgYm91bmRsZXNzIGNvbnN0aXR1dGlvbiBhbmQgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJzZWp1YW5pXCIsXG4gICAgXCJrZXlcIjogXCIxMTNcIixcbiAgICBcIm5hbWVcIjogXCJTZWp1YW5pXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBXaW50ZXIncyBXcmF0aFwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlRhbmtcIixcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNjAwLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDk1LFxuICAgICAgXCJtcFwiOiA0MDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDAsXG4gICAgICBcImFybW9yXCI6IDI5LjU0LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA4LjY3NSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuODUsXG4gICAgICBcIm1wcmVnZW5cIjogNy4yMDUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjQ1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTcuNTQ0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA2NzIsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMS40NFxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9TZWp1YW5pLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDM4NCxcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlNlanVhbmkgd2FzIHdlYW5lZCBvbiBoYXJkc2hpcCBhbmQgcmVhcmVkIG9uIGJhcmJhcml0eS4gV2hlcmUgb3RoZXJzIHN1Y2N1bWJlZCB0byB0aGUgaGFyc2huZXNzIG9mIHRoZSBGcmVsam9yZCwgc2hlIHdhcyB0ZW1wZXJlZCBieSBpdCB1bnRpbCBwYWluIGJlY2FtZSBwb3dlciwgaHVuZ2VyIGFuIGVuY291cmFnZW1lbnQsIGFuZCBmcm9zdCBhbiBhbGx5IGluIGN1bGxpbmcgdGhlIHdlYWsuIFRocm91Z2ggaGVyIG9yZGVhbHMsIHNoZSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInNoYWNvXCIsXG4gICAgXCJrZXlcIjogXCIzNVwiLFxuICAgIFwibmFtZVwiOiBcIlNoYWNvXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBEZW1vbiBKZXN0ZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJBc3Nhc3NpblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTgyLjEyLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg0LFxuICAgICAgXCJtcFwiOiAyOTcuMixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM1MCxcbiAgICAgIFwiYXJtb3JcIjogMjQuODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOC4zNyxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogNy4xNTUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjQ1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTcuNTgsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMSxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAzXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1NoYWNvLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24yLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQzMixcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIk1vc3Qgd291bGQgc2F5IHRoYXQgZGVhdGggaXNuJ3QgZnVubnkuIEl0IGlzbid0LCB1bmxlc3MgeW91J3JlIFNoYWNvIC0gdGhlbiBpdCdzIGh5c3RlcmljYWwuIEhlIGlzIFZhbG9yYW4ncyBmaXJzdCBmdWxseSBmdW5jdGlvbmluZyBob21pY2lkYWwgY29taWM7IGhlIGplc3RzIHVudGlsIHNvbWVvbmUgZGllcywgYW5kIHRoZW4gaGUgbGF1Z2hzLiBUaGUgZmlndXJlIHRoYXQgaGFzIGNvbWUgdG8gYmUga25vd24gYXMgdGhlIERlbW9uIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwic2hlblwiLFxuICAgIFwia2V5XCI6IFwiOThcIixcbiAgICBcIm5hbWVcIjogXCJTaGVuXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBFeWUgb2YgVHdpbGlnaHRcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJUYW5rXCIsXG4gICAgICBcIk1lbGVlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NDAsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNzMsXG4gICAgICBcIm1wXCI6IDQwMCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQwLFxuICAgICAgXCJhcm1vclwiOiAyNSxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAyLjYsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA4LjUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjc1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDUwLFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDYwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDJcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vU2hlbi5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiAwLFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ1RoZSBFeWUgaXMgYmxpbmQgdG8gZmVhciwgdG8gaGF0ZSwgdG8gbG92ZSAtIHRvIGFsbCB0aGluZ3MgdGhhdCB3b3VsZCBzd2F5IGVxdWlsaWJyaXVtLicnPGJyPjxicj5MZWFkZXIgb2YgYSBzZWNyZXQgY2xhbiBvZiBteXN0aWMgd2FycmlvcnMsIFNoZW4gc2VydmVzIGFzIHRoZSBFeWUgb2YgVHdpbGlnaHQsIGVudHJ1c3RlZCB0byBlbmZvcmNlIGVxdWlsaWJyaXVtIGluIHRoZSB3b3JsZC4gTG9uZ2luZyB0byByZW1haW4gZnJlZSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInNoeXZhbmFcIixcbiAgICBcImtleVwiOiBcIjEwMlwiLFxuICAgIFwibmFtZVwiOiBcIlNoeXZhbmFcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEhhbGYtRHJhZ29uXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJUYW5rXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1OTQuNixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5NSxcbiAgICAgIFwibXBcIjogMTAwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNTAsXG4gICAgICBcImFybW9yXCI6IDI3LjYyOCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjM1LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOC41OSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwibXByZWdlblwiOiAwLFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDYwLjcxMixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy40LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vU2h5dmFuYS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiA0OCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiQSBoYWxmLWJyZWVkIGJvcm4gZnJvbSB0aGUgdW5pb24gYmV0d2VlbiBkcmFnb24gYW5kIGh1bWFuLCBTaHl2YW5hIHNlYXJjaGVkIGFsbCBoZXIgbGlmZSBmb3IgYmVsb25naW5nLiBQZXJzZWN1dGlvbiBmb3JnZWQgaGVyIGludG8gYSBicnV0YWwgd2FycmlvciwgYW5kIHRob3NlIHdobyBkYXJlIHN0YW5kIGFnYWluc3QgU2h5dmFuYSBmYWNlIHRoZSBmaWVyeSBiZWFzdCBsdXJraW5nIGp1c3QgYmVuZWF0aCBoZXIgc2tpbi4uLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInNpbmdlZFwiLFxuICAgIFwia2V5XCI6IFwiMjdcIixcbiAgICBcIm5hbWVcIjogXCJTaW5nZWRcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIE1hZCBDaGVtaXN0XCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiVGFua1wiLFxuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NDIuNzYsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODIsXG4gICAgICBcIm1wXCI6IDI5MC42LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQ1LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQ1LFxuICAgICAgXCJhcm1vclwiOiAyNy44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA4LjAyLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA3LjUyLFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDYyLjMyLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjM3NSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMC4wMixcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAxLjgxXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1NpbmdlZC5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiA5NixcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiU2luZ2VkIGRlc2NlbmRlZCBmcm9tIGEgbG9uZyBsaW5lIG9mIFphdW4ncyByZXZlcmVkIGNoZW1pc3RzLiBFdmVuIGluIGhpcyB5b3V0aCwgaGlzIHRhbGVudCBmb3IgY29uY29jdGluZyBwb3Rpb25zIGZhciBvdXRzdHJpcHBlZCB0aGF0IG9mIGhpcyBwZWVycywgYW5kIGhlIHF1aWNrbHkgZGlzdGluZ3Vpc2hlZCBoaW1zZWxmIGZyb20gaGlzIGxlc3MgZXh0cmFvcmRpbmFyeSBjaGVtaXN0IGNvbXBhdHJpb3RzLiBJdCBjYW1lIGFzIG5vIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwic2lvblwiLFxuICAgIFwia2V5XCI6IFwiMTRcIixcbiAgICBcIm5hbWVcIjogXCJTaW9uXCIsXG4gICAgXCJ0aXRsZVwiOiBcIlRoZSBVbmRlYWQgSnVnZ2VybmF1dFwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlRhbmtcIixcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTQyLjY0LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDczLFxuICAgICAgXCJtcFwiOiAzMjUuNixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MixcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0NSxcbiAgICAgIFwiYXJtb3JcIjogMjMuMDQsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMyxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTc1LFxuICAgICAgXCJocHJlZ2VuXCI6IDEwLjE4LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJtcHJlZ2VuXCI6IDguMDA1LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC42LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTkuNzIsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDQsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA4LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDEuM1xuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9TaW9uLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDE0NCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiQkxPT0QuPGJyPjxicj5TTUVMTCBJVC48YnI+PGJyPldBTlQuIEFDSElORy4gTkVFRCE8YnI+PGJyPkNMT1NFIE5PVy4gVEhFWSBDT01FLjxicj48YnI+Tk8gQ0hBSU5TPyBGUkVFISBLSUxMITxicj48YnI+SU4gUkVBQ0guIFlFUyEgRElFISBESUUhPGJyPjxicj5Hb25lLiBUb28gcXVpY2suIE5vIGZpZ2h0LiBNb3JlLiBJIHdhbnQuLi4gbW9yZS48YnI+PGJyPkEgdm9pY2U/IFVuZmFtaWxpYXIuIEkgc2VlIGhpbS4gVGhlIEdyYW5kIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwic2l2aXJcIixcbiAgICBcImtleVwiOiBcIjE1XCIsXG4gICAgXCJuYW1lXCI6IFwiU2l2aXJcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEJhdHRsZSBNaXN0cmVzc1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hcmtzbWFuXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MTUuNzYsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODIsXG4gICAgICBcIm1wXCI6IDI4NCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA1MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMjIuMjEsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy4yNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDUwMCxcbiAgICAgIFwiaHByZWdlblwiOiA1LjE3LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA4LjAxLFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC45LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTcuNDYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDIuNDEsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMS42XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1NpdmlyLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDE5MixcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydJIGRvbid0IGNhcmUgd2hhdCBmYWNlIGlzIG9uIHlvdXIgY29pbiwgYXMgbG9uZyBhcyBpdCBwYXlzLicnPGJyPjxicj5TaXZpciBpcyBhIHJlbm93bmVkIGZvcnR1bmUgaHVudGVyIGFuZCBtZXJjZW5hcnkgY2FwdGFpbiB3aG8gcGxpZXMgaGVyIHRyYWRlIGluIHRoZSBkZXNlcnRzIG9mIFNodXJpbWEuIEFybWVkIHdpdGggaGVyIGxlZ2VuZGFyeSBqZXdlbGVkIGNyb3NzYmxhZGUsIHNoZSBoYXMgZm91Z2h0IGFuZCB3b24gLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJza2FybmVyXCIsXG4gICAgXCJrZXlcIjogXCI3MlwiLFxuICAgIFwibmFtZVwiOiBcIlNrYXJuZXJcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIENyeXN0YWwgVmFuZ3VhcmRcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIlRhbmtcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDYwMS4yOCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5MCxcbiAgICAgIFwibXBcIjogMjcyLjIsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDI5LjM4NCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjgsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA4LjkyNSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuODUsXG4gICAgICBcIm1wcmVnZW5cIjogNy4yMDUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjQ1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTcuMTU2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiA0LjUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi4xXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1NrYXJuZXIucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogMjQwLFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ1dlIGFyZSBvbmUuIFdlIGNhbm5vdCBiZSBzaGF0dGVyZWQuJyc8YnI+PGJyPlNrYXJuZXIgaXMgYW4gaW1tZW5zZSBjcnlzdGFsbGluZSBzY29ycGlvbiBmcm9tIGEgaGlkZGVuIHZhbGxleSBpbiBTaHVyaW1hLiBQYXJ0IG9mIHRoZSBhbmNpZW50IEJyYWNrZXJuIHJhY2UsIFNrYXJuZXIgYW5kIGhpcyBraW4gYXJlIGtub3duIGZvciB0aGVpciBncmVhdCB3aXNkb20gYW5kIGRlZXAgY29ubmVjdGlvbiB0byB0aGUgbGFuZCwgYXMgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJzb25hXCIsXG4gICAgXCJrZXlcIjogXCIzN1wiLFxuICAgIFwibmFtZVwiOiBcIlNvbmFcIixcbiAgICBcInRpdGxlXCI6IFwiTWF2ZW4gb2YgdGhlIFN0cmluZ3NcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJTdXBwb3J0XCIsXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDQ4Mi4zNixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA3NyxcbiAgICAgIFwibXBcIjogMzQwLjYsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDUsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMjUsXG4gICAgICBcImFybW9yXCI6IDIwLjU0NCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjMsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1NTAsXG4gICAgICBcImhwcmVnZW5cIjogNS40MixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogMTEuNSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUwLjA0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjNcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vU29uYS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiAyODgsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlNvbmEgaGFzIG5vIG1lbW9yaWVzIG9mIGhlciB0cnVlIHBhcmVudHMuIEFzIGFuIGluZmFudCwgc2hlIHdhcyBmb3VuZCBhYmFuZG9uZWQgb24gdGhlIGRvb3JzdGVwIG9mIGFuIElvbmlhbiBhZG9wdGlvbiBob3VzZSwgbmVzdGxlZCBhdG9wIGFuIGFuY2llbnQgaW5zdHJ1bWVudCBpbiBhbiBleHF1aXNpdGUgY2FzZSBvZiB1bmtub3duIG9yaWdpbnMuIFNoZSB3YXMgYW4gdW51c3VhbGx5IHdlbGwtYmVoYXZlZCBjaGlsZCwgYWx3YXlzIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwic29yYWthXCIsXG4gICAgXCJrZXlcIjogXCIxNlwiLFxuICAgIFwibmFtZVwiOiBcIlNvcmFrYVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgU3RhcmNoaWxkXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiU3VwcG9ydFwiLFxuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MjkuMDQsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNzgsXG4gICAgICBcIm1wXCI6IDM1MC44LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDYwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzI1LFxuICAgICAgXCJhcm1vclwiOiAyMy4zODQsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy44LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDIuNSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNSxcbiAgICAgIFwibXByZWdlblwiOiAxMS41LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC40LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTAuMDQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi4xNFxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9Tb3Jha2EucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogMzM2LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJBIGhlYWxlciBnaWZ0ZWQgd2l0aCB0aGUgbWFnaWMgb2YgdGhlIHN0YXJzLCBTb3Jha2EgaG9sZHMgYWxsIGxpdmluZyBjcmVhdHVyZXMgY2xvc2UgdG8gaGVyIGhlYXJ0LiBTaGUgd2FzIG9uY2UgYSBjZWxlc3RpYWwgYmVpbmcsIGJ1dCBzaGUgc2FjcmlmaWNlZCBoZXIgaW1tb3J0YWxpdHkgYW5kIGVudGVyZWQgdGhlIHdvcmxkIG9mIG1vcnRhbHMuIFNvIGxvbmcgYXMgZXZpbCB0aHJlYXRlbnMgbGlmZSBpbiBWYWxvcmFuLCBTb3Jha2EgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJzd2FpblwiLFxuICAgIFwia2V5XCI6IFwiNTBcIixcbiAgICBcIm5hbWVcIjogXCJTd2FpblwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgTWFzdGVyIFRhY3RpY2lhblwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIixcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTE2LjA0LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDkwLFxuICAgICAgXCJtcFwiOiAzNzQsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDcsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDIyLjcyLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDQsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1MDAsXG4gICAgICBcImhwcmVnZW5cIjogNy44NCxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNjUsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUyLjA0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuMTFcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vU3dhaW4ucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogMzg0LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUaGUgZWFybGllc3QgYWNjb3VudCBvZiBTd2FpbidzIGV4aXN0ZW5jZSBjb21lcyBmcm9tIGEgTm94aWFuIGluZmlybWFyeSBkb2N0b3IncyBub3Rlcy4gQWNjb3JkaW5nIHRvIHRoZW0sIFN3YWluIGxpbXBlZCBpbnRvIHRoZSB3YXJkIHdpdGhvdXQgY3J5IG9yIGNvbXBsYWludDsgaGlzIHJpZ2h0IGxlZyB3YXMgc25hcHBlZCBpbiBoYWxmLCB3aXRoIGJvbmUgcHJvdHJ1ZGluZyBmcm9tIHRoZSBza2luLiBBIHNtYWxsLCBzY293bGluZyAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInN5bmRyYVwiLFxuICAgIFwia2V5XCI6IFwiMTM0XCIsXG4gICAgXCJuYW1lXCI6IFwiU3luZHJhXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBEYXJrIFNvdmVyZWlnblwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIixcbiAgICAgIFwiU3VwcG9ydFwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTExLjA0LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDc4LFxuICAgICAgXCJtcFwiOiAzODQsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNjAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzAsXG4gICAgICBcImFybW9yXCI6IDI0LjcxMixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjQsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1NTAsXG4gICAgICBcImhwcmVnZW5cIjogNi41MDUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjYsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUzLjg3MixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMi45LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDJcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vU3luZHJhLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQzMixcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiQm9ybiB3aXRoIGltbWVuc2UgbWFnaWNhbCBwb3RlbnRpYWwsIFN5bmRyYSBsb3ZlcyBub3RoaW5nIG1vcmUgdGhhbiBleGVyY2lzaW5nIHRoZSBpbmNyZWRpYmxlIHBvd2VyIGF0IGhlciBjb21tYW5kLiBXaXRoIGVhY2ggcGFzc2luZyBkYXksIGhlciBtYXN0ZXJ5IG9mIG1hZ2ljYWwgZm9yY2UgZ3Jvd3MgbW9yZSBwb3RlbnQgYW5kIGRldmFzdGF0aW5nLiBSZWZ1c2luZyBhbnkgbm90aW9uIG9mIGJhbGFuY2Ugb3IgcmVzdHJhaW50LCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInRhaG1rZW5jaFwiLFxuICAgIFwia2V5XCI6IFwiMjIzXCIsXG4gICAgXCJuYW1lXCI6IFwiVGFobSBLZW5jaFwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgUml2ZXIgS2luZ1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIlN1cHBvcnRcIixcbiAgICAgIFwiVGFua1wiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNjEwLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDk1LFxuICAgICAgXCJtcFwiOiAzMjUsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDI3LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTc1LFxuICAgICAgXCJocHJlZ2VuXCI6IDYuNSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogOCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDEsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4yLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuNVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9UYWhtS2VuY2gucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogMCxcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnVGhlIHdob2xlIHdvcmxkJ3MgYSByaXZlciwgYW5kIEknbSBpdHMga2luZy4nJzxicj5UYWhtIEtlbmNoIHRyYXZlbHMgUnVuZXRlcnJhJ3Mgd2F0ZXJ3YXlzLCBmZWVkaW5nIGhpcyBpbnNhdGlhYmxlIGFwcGV0aXRlIHdpdGggdGhlIG1pc2VyeSBvZiB0aGUgdW5zdXNwZWN0aW5nLiBUaGUgc2luZ3VsYXJseSBjaGFybWluZyBnb3VybWFuZCBzYXZvcnMgZXZlcnkgbW9tZW50IG9mIGhpcyB2aWN0aW1zJyBzdWZmZXJpbmcuICBBIGRlYWwgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ0YWxpeWFoXCIsXG4gICAgXCJrZXlcIjogXCIxNjNcIixcbiAgICBcIm5hbWVcIjogXCJUYWxpeWFoXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBTdG9uZXdlYXZlclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIixcbiAgICAgIFwiU3VwcG9ydFwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTIwLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDc1LFxuICAgICAgXCJtcFwiOiAzNDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNjAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMjUsXG4gICAgICBcImFybW9yXCI6IDIwLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1MjUsXG4gICAgICBcImhwcmVnZW5cIjogNyxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNyxcbiAgICAgIFwibXByZWdlblwiOiA3LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMS4zNlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9UYWxpeWFoLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQ4LFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGFsaXlhaCBpcyBhIG5vbWFkaWMgbWFnZSBmcm9tIFNodXJpbWEgd2hvIHdlYXZlcyBzdG9uZSB3aXRoIGVuZXJnZXRpYyBlbnRodXNpYXNtIGFuZCByYXcgZGV0ZXJtaW5hdGlvbi4gVG9ybiBiZXR3ZWVuIHRlZW5hZ2Ugd29uZGVyIGFuZCBhZHVsdCByZXNwb25zaWJpbGl0eSwgc2hlIGhhcyBjcm9zc2VkIG5lYXJseSBhbGwgb2YgVmFsb3JhbiBvbiBhIGpvdXJuZXkgdG8gbGVhcm4gdGhlIHRydWUgbmF0dXJlIG9mIGhlciBncm93aW5nIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidGFsb25cIixcbiAgICBcImtleVwiOiBcIjkxXCIsXG4gICAgXCJuYW1lXCI6IFwiVGFsb25cIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEJsYWRlJ3MgU2hhZG93XCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiQXNzYXNzaW5cIixcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTgyLjgsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODUsXG4gICAgICBcIm1wXCI6IDM3Ny4yLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDM3LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzUwLFxuICAgICAgXCJhcm1vclwiOiAyNi44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA4LjUxLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC43NSxcbiAgICAgIFwibXByZWdlblwiOiA3LjU5LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC41LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTUuMjA4LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjEsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA2NSxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjdcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vVGFsb24ucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogOTYsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ1RoZSB0aHJlZSBkZWFkbGllc3QgYmxhZGVtYXN0ZXJzIGluIGFsbCBvZiBWYWxvcmFuIGFyZSBib3VuZCB0byB0aGUgaG91c2Ugb2YgRHUgQ291dGVhdTogbXkgZmF0aGVyLCBteXNlbGYsIGFuZCBUYWxvbi4gQ2hhbGxlbmdlIHVzLCBpZiB5b3UgZGFyZS4nJzxicj4tLSBLYXRhcmluYSBEdSBDb3V0ZWF1PGJyPjxicj5UYWxvbidzIGVhcmxpZXN0IG1lbW9yaWVzIGFyZSB0aGUgZGFya25lc3Mgb2YgTm94dXMnIHVuZGVyZ3JvdW5kIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidGFyaWNcIixcbiAgICBcImtleVwiOiBcIjQ0XCIsXG4gICAgXCJuYW1lXCI6IFwiVGFyaWNcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFNoaWVsZCBvZiBWYWxvcmFuXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiU3VwcG9ydFwiLFxuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NzUsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTAsXG4gICAgICBcIm1wXCI6IDMwMCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA2MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0MCxcbiAgICAgIFwiYXJtb3JcIjogMjUsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy40LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxNTAsXG4gICAgICBcImhwcmVnZW5cIjogNixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNSxcbiAgICAgIFwibXByZWdlblwiOiA1LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU1LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9UYXJpYy5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiAxNDQsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ1RoZSBiZXN0IHdlYXBvbnMgYXJlIGJlYXV0aWZ1bC4nJzxicj48YnI+VGFyaWMgaXMgdGhlIEFzcGVjdCBvZiB0aGUgUHJvdGVjdG9yLCB3aWVsZGluZyBpbmNyZWRpYmxlIHBvd2VyIGFzIFJ1bmV0ZXJyYSdzIGd1YXJkaWFuIG9mIGxpZmUsIGxvdmUsIGFuZCBiZWF1dHkuIFNoYW1lZCBieSBhIGRlcmVsaWN0aW9uIG9mIGR1dHkgYW5kIGV4aWxlZCBmcm9tIGhpcyBob21lbGFuZCBEZW1hY2lhLCBUYXJpYyBhc2NlbmRlZCBNb3VudCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInRlZW1vXCIsXG4gICAgXCJrZXlcIjogXCIxN1wiLFxuICAgIFwibmFtZVwiOiBcIlRlZW1vXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBTd2lmdCBTY291dFwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hcmtzbWFuXCIsXG4gICAgICBcIkFzc2Fzc2luXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MTUuNzYsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODIsXG4gICAgICBcIm1wXCI6IDI2Ny4yLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzMwLFxuICAgICAgXCJhcm1vclwiOiAyNC4zLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNzUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1MDAsXG4gICAgICBcImhwcmVnZW5cIjogNS43NCxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNjUsXG4gICAgICBcIm1wcmVnZW5cIjogNy4yMDUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjQ1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNDkuNTQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA5NDcsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMy4zOFxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9UZWVtby5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiAxOTIsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUZWVtbyBpcyBhIGxlZ2VuZCBhbW9uZyBoaXMgeW9yZGxlIGJyb3RoZXJzIGFuZCBzaXN0ZXJzIGluIEJhbmRsZSBDaXR5LiBBcyBmYXIgYXMgeW9yZGxlcyBhcmUgY29uY2VybmVkLCB0aGVyZSBpcyBzb21ldGhpbmcganVzdCBzbGlnaHRseSBvZmYgYWJvdXQgaGltLiBXaGlsZSBUZWVtbyBlbmpveXMgdGhlIGNvbXBhbmlvbnNoaXAgb2Ygb3RoZXIgeW9yZGxlcywgaGUgYWxzbyBpbnNpc3RzIG9uIGZyZXF1ZW50IHNvbG8gbWlzc2lvbnMgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ0aHJlc2hcIixcbiAgICBcImtleVwiOiBcIjQxMlwiLFxuICAgIFwibmFtZVwiOiBcIlRocmVzaFwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgQ2hhaW4gV2FyZGVuXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiU3VwcG9ydFwiLFxuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1NjAuNTIsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTMsXG4gICAgICBcIm1wXCI6IDI3My45MixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0NCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMTYsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDQ1MCxcbiAgICAgIFwiaHByZWdlblwiOiA2LjkyLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNDcuNjk2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAyLjIsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMy41XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1RocmVzaC5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiAyNDAsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ1RoZSBtaW5kIGlzIGEgd29uZHJvdXMgdGhpbmcgdG8gdGVhciBhcGFydC4nJzxicj48YnI+U2FkaXN0aWMgYW5kIGN1bm5pbmcsIFRocmVzaCBpcyBhIHJlc3RsZXNzIHNwaXJpdCB3aG8gcHJpZGVzIGhpbXNlbGYgb24gdG9ybWVudGluZyBtb3J0YWxzIGFuZCBicmVha2luZyB0aGVtIHdpdGggc2xvdywgZXhjcnVjaWF0aW5nIGludmVudGl2ZW5lc3MuIEhpcyB2aWN0aW1zIHN1ZmZlciBmYXIgYmV5b25kIHRoZSBwb2ludCBvZiBkZWF0aCwuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInRyaXN0YW5hXCIsXG4gICAgXCJrZXlcIjogXCIxOFwiLFxuICAgIFwibmFtZVwiOiBcIlRyaXN0YW5hXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBZb3JkbGUgR3VubmVyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFya3NtYW5cIixcbiAgICAgIFwiQXNzYXNzaW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU0Mi43NixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MixcbiAgICAgIFwibXBcIjogMjQ2Ljc2LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDMyLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzI1LFxuICAgICAgXCJhcm1vclwiOiAyMixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDYuMTksXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjY1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuMjA1LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC40NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU2Ljk2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAyLjQxLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNDczNCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAxLjVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vVHJpc3RhbmEucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogMjg4LFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiR3JlYXRuZXNzIGNvbWVzIGluIGFsbCBzaGFwZXMgYW5kIHNpemVzLCBhcyBwcm92ZW4gYnkgdGhpcyBkaW1pbnV0aXZlLCBjYW5ub24td2llbGRpbmfCoHlvcmRsZS4gSW4gYSB3b3JsZCBmcmF1Z2h0IHdpdGggdHVybW9pbCwgVHJpc3RhbmEgcmVmdXNlcyB0byBiYWNrIGRvd24gZnJvbSBhbnkgY2hhbGxlbmdlLiBTaGUgcmVwcmVzZW50cyB0aGUgcGlubmFjbGUgb2YgbWFydGlhbCBwcm9maWNpZW5jeSwgdW53YXZlcmluZyBjb3VyYWdlLCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInRydW5kbGVcIixcbiAgICBcImtleVwiOiBcIjQ4XCIsXG4gICAgXCJuYW1lXCI6IFwiVHJ1bmRsZVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgVHJvbGwgS2luZ1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiVGFua1wiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNjE2LjI4LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDk2LFxuICAgICAgXCJtcFwiOiAyODEuNixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0NSxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM1MCxcbiAgICAgIFwiYXJtb3JcIjogMjcuNTM2LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDIuNyxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTc1LFxuICAgICAgXCJocHJlZ2VuXCI6IDYsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjc1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuNTA1LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC42LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNjAuMDQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA2NzIsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi45XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1RydW5kbGUucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogMzM2LFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVHJ1bmRsZSBpcyBhIGh1bGtpbmcgYW5kIGRldmlvdXMgdHJvbGwgd2l0aCBhIG1pc2NoaWV2b3VzIHN0cmVhay4gVGhlcmUgaXMgbm90aGluZyBoZSBjYW4ndCBiZWF0IGludG8gc3VibWlzc2lvbiBhbmQgYmVuZCB0byBoaXMgd2lsbCwgbm90IGV2ZW4gdGhlIGljZSBpdHNlbGYuIFdpdGggaGlzIG1hc3NpdmUsIGZyb3plbiBjbHViLCBoZSBjaGlsbHMgaGlzIGVuZW1pZXMgdG8gdGhlIGNvcmUgYW5kIHJ1bnMgdGhlbSB0aHJvdWdoIHdpdGggLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ0cnluZGFtZXJlXCIsXG4gICAgXCJrZXlcIjogXCIyM1wiLFxuICAgIFwibmFtZVwiOiBcIlRyeW5kYW1lcmVcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEJhcmJhcmlhbiBLaW5nXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJBc3Nhc3NpblwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNjI1LjY0LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDk4LFxuICAgICAgXCJtcFwiOiAxMDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0NSxcbiAgICAgIFwiYXJtb3JcIjogMjQuMTA4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuMSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDguNTEsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjksXG4gICAgICBcIm1wcmVnZW5cIjogMCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA2MS4zNzYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMixcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDY3MixcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjlcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vVHJ5bmRhbWVyZS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiAzODQsXG4gICAgICBcInlcIjogNDhcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJGdWVsZWQgYnkgaGlzIHVuYnJpZGxlZCBmdXJ5IGFuZCByYWdlLCBUcnluZGFtZXJlIGN1dHMgaGlzIHdheSB0aHJvdWdoIHRoZSB0dW5kcmEsIG1hc3RlcmluZyB0aGUgYXJ0IG9mIGJhdHRsZSBieSBjaGFsbGVuZ2luZyB0aGUgRnJlbGpvcmQncyBncmVhdGVzdCB3YXJyaW9ycy4gVGhlIHdyYXRoZnVsIGJhcmJhcmlhbiBzZWVrcyByZXZlbmdlIG9uIHRoZSBvbmUgd2hvIGRlY2ltYXRlZCBoaXMgY2xhbiBhbmQgc3RyaWtlcyBkb3duIGFsbCAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInR3aXN0ZWRmYXRlXCIsXG4gICAgXCJrZXlcIjogXCI0XCIsXG4gICAgXCJuYW1lXCI6IFwiVHdpc3RlZCBGYXRlXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBDYXJkIE1hc3RlclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUyMS43NixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MixcbiAgICAgIFwibXBcIjogMjY1Ljg0LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDM4LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzMwLFxuICAgICAgXCJhcm1vclwiOiAyMC41NDIsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy4xNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDUyNSxcbiAgICAgIFwiaHByZWdlblwiOiA1LjUwNSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNixcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNDkuOTU0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA0LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDMuMjJcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vVHdpc3RlZEZhdGUucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogNDMyLFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVHdpc3RlZCBGYXRlIGlzIGFuIGluZmFtb3VzIGNhcmQgc2hhcnAgYW5kIHN3aW5kbGVyIHdobyBoYXMgZ2FtYmxlZCBhbmQgY2hhcm1lZCBoaXMgd2F5IGFjcm9zcyBtdWNoIG9mIHRoZSBrbm93biB3b3JsZCwgZWFybmluZyB0aGUgZW5taXR5IGFuZCBhZG1pcmF0aW9uIG9mIHRoZSByaWNoIGFuZCBmb29saXNoIGFsaWtlLiBIZSByYXJlbHkgdGFrZXMgdGhpbmdzIHNlcmlvdXNseSwgZ3JlZXRpbmcgZWFjaCBkYXkgd2l0aCBhIG1vY2tpbmcgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ0d2l0Y2hcIixcbiAgICBcImtleVwiOiBcIjI5XCIsXG4gICAgXCJuYW1lXCI6IFwiVHdpdGNoXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBQbGFndWUgUmF0XCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFya3NtYW5cIixcbiAgICAgIFwiQXNzYXNzaW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUyNS4wOCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MSxcbiAgICAgIFwibXBcIjogMjg3LjIsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzAsXG4gICAgICBcImFybW9yXCI6IDIzLjA0LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1NTAsXG4gICAgICBcImhwcmVnZW5cIjogNi4wMDUsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjYsXG4gICAgICBcIm1wcmVnZW5cIjogNy4yNTUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjQ1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTUuNDYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDIuNDEsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA4LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDMuMzhcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vVHdpdGNoLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDAsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJILkkuVi5FLiBJbmNpZGVudCBSZXBvcnQ8YnI+Q29kZSBWaW9sYXRpb246IEluZHVzdHJpYWwgSG9taWNpZGU8YnI+Q2FzZWZpbGUgU3RhdHVzOiBVbnNvbHZlZDxicj5JbnZlc3RpZ2F0aW5nIEFnZW50OiBSb2wsIFAuPGJyPjxicj5UZWFtIHJlc3BvbmRlZCB0byByZXBvcnQgb2Ygc3VzcGljaW91cyBjaGFyYWN0ZXIsIGNyaW1pbmFsIGFjdGl2aXR5OyBwcm9jZWVkZWQgdG8gU3VtcCBXb3JrcywgU2VjdG9yIDkwVFouIFNlY3RvciA5MFRaIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidWR5clwiLFxuICAgIFwia2V5XCI6IFwiNzdcIixcbiAgICBcIm5hbWVcIjogXCJVZHlyXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBTcGlyaXQgV2Fsa2VyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJUYW5rXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1OTMuMzIsXG4gICAgICBcImhwcGVybGV2ZWxcIjogOTksXG4gICAgICBcIm1wXCI6IDI3MC40LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDMwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQ1LFxuICAgICAgXCJhcm1vclwiOiAyNS40NyxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiA0LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogNixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNzUsXG4gICAgICBcIm1wcmVnZW5cIjogNy41MDUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjQ1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTguMjg2LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjIsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA1LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuNjdcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vVWR5ci5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiA0OCxcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlVkeXIgaXMgbW9yZSB0aGFuIGEgbWFuOyBoZSBpcyBhIHZlc3NlbCBmb3IgdGhlIHVudGFtZWQgcG93ZXIgb2YgZm91ciBwcmltYWwgYW5pbWFsIHNwaXJpdHMuIFdoZW4gdGFwcGluZyBpbnRvIHRoZSBzcGlyaXRzJyBiZXN0aWFsIG5hdHVyZXMsIFVkeXIgY2FuIGhhcm5lc3MgdGhlaXIgdW5pcXVlIHN0cmVuZ3RoczogdGhlIHRpZ2VyIGdyYW50cyBoaW0gc3BlZWQgYW5kIGZlcm9jaXR5LCB0aGUgdHVydGxlIHJlc2lsaWVuY2UsIHRoZSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInVyZ290XCIsXG4gICAgXCJrZXlcIjogXCI2XCIsXG4gICAgXCJuYW1lXCI6IFwiVXJnb3RcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEhlYWRzbWFuJ3MgUHJpZGVcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYXJrc21hblwiLFxuICAgICAgXCJGaWdodGVyXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1ODYuNTIsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODksXG4gICAgICBcIm1wXCI6IDMxMi40LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDU1LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzM1LFxuICAgICAgXCJhcm1vclwiOiAyNC41NDQsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy4zLFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNDI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDYuNTA1LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42LFxuICAgICAgXCJtcHJlZ2VuXCI6IDguNTksXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjY1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTQuMDUsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuNixcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDMsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi45XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1VyZ290LnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDk2LFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGhlcmUgYXJlIHdhcnJpb3JzIHdobyBiZWNvbWUgZ3JlYXQgZm9yIHRoZWlyIHN0cmVuZ3RoLCBjdW5uaW5nLCBvciBza2lsbCB3aXRoIGFybXMuIE90aGVycyBzaW1wbHkgcmVmdXNlIHRvIGRpZS4gVXJnb3QsIG9uY2UgYSBncmVhdCBzb2xkaWVyIG9mIE5veHVzLCBtYXkgY29uc3RpdHV0ZSBhIGNhc2UgaW4gc3VwcG9ydCBvZiB0aGUgbGF0dGVyLiBQcm9uZSB0byBkaXZpbmcgaGVhZGxvbmcgaW50byBlbmVteSBiYXR0bGUgbGluZXMsIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwidmFydXNcIixcbiAgICBcImtleVwiOiBcIjExMFwiLFxuICAgIFwibmFtZVwiOiBcIlZhcnVzXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBBcnJvdyBvZiBSZXRyaWJ1dGlvblwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hcmtzbWFuXCIsXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDUzNy43NixcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MixcbiAgICAgIFwibXBcIjogMzYwLjQ4LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDMzLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzMwLFxuICAgICAgXCJhcm1vclwiOiAyMy4yMTIsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy40LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTc1LFxuICAgICAgXCJocHJlZ2VuXCI6IDUuNDIsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuMzQsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NC42NixcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMi40MSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDUsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogM1xuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9WYXJ1cy5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uMy5wbmdcIixcbiAgICAgIFwieFwiOiAxNDQsXG4gICAgICBcInlcIjogOTZcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ1RoZSBsaWZlIG9mIGFuIGFycm93IGlzIGZsZWV0aW5nLCBidWlsdCBvZiBub3RoaW5nIGJ1dCBkaXJlY3Rpb24gYW5kIGludGVudC4nJzxicj48YnI+Rm9yIGhpcyBpbmNvbXBhcmFibGUgc2tpbGwgd2l0aCB0aGUgYm93IGFuZCBoaXMgdW5xdWVzdGlvbmVkIHNlbnNlIG9mIGhvbm9yLCBWYXJ1cyB3YXMgY2hvc2VuIHRvIGJlIHRoZSB3YXJkZW4gb2YgYSBzYWNyZWQgSW9uaWFuIHRlbXBsZS4gVGhlIHRlbXBsZSB3YXMgYnVpbHQgdG8gLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ2YXluZVwiLFxuICAgIFwia2V5XCI6IFwiNjdcIixcbiAgICBcIm5hbWVcIjogXCJWYXluZVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgTmlnaHQgSHVudGVyXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFya3NtYW5cIixcbiAgICAgIFwiQXNzYXNzaW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDQ5OC40NCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MyxcbiAgICAgIFwibXBcIjogMjMxLjgsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMzUsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzAsXG4gICAgICBcImFybW9yXCI6IDE5LjAxMixcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjQsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1NTAsXG4gICAgICBcImhwcmVnZW5cIjogNS40MixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogNi45NyxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU1Ljg4LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAxLjY2LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wNSxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiA0XG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1ZheW5lLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDE5MixcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRoZSB3b3JsZCBpcyBub3QgYWx3YXlzIGFzIGNpdmlsaXplZCBhcyBwZW9wbGUgbWlnaHQgdGhpbmsuIFRoZXJlIGFyZSBzdGlsbCB0aG9zZSB3aG8gd291bGQgZm9sbG93IHRoZSBibGFja2VzdCBwYXRocyBvZiBtYWdpYyBhbmQgYmVjb21lIGNvcnJ1cHRlZCBieSB0aGUgZGFya2VyIHBvd2VycyB0aGF0IGZsb3cgdGhyb3VnaCBSdW5ldGVycmEuIFNoYXVuYSBWYXluZSBrbm93cyB0aGlzIGZhY3Qgd2VsbC48YnI+PGJyPkFzIGEgeW91bmcgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ2ZWlnYXJcIixcbiAgICBcImtleVwiOiBcIjQ1XCIsXG4gICAgXCJuYW1lXCI6IFwiVmVpZ2FyXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBUaW55IE1hc3RlciBvZiBFdmlsXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNDkyLjc2LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDgyLFxuICAgICAgXCJtcFwiOiAzOTIuNCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA1MixcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0MCxcbiAgICAgIFwiYXJtb3JcIjogMjIuNTUsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy43NSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDUyNSxcbiAgICAgIFwiaHByZWdlblwiOiA1LjQyLFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC41NSxcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTAuNzEsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDIuNjI1LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuMjRcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vVmVpZ2FyLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDI0MCxcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlRvIG1vc3QsIHRob3VnaHRzIG9mIHlvcmRsZXMgZG8gbm90IGNvbmp1cmUgaW1hZ2VzIHRvIGJlIGZlYXJlZC4gVGhlIGVhc3lnb2luZyBoYWxmLXBpbnQgcmFjZSwgdGhvdWdoIGZpZXJjZSwgaXMgb2Z0ZW4gcmVnYXJkZWQgd2l0aCBzb21lIGRlZ3JlZSBvZiBqb3ZpYWxpdHkuIFRoZWlyIGhpZ2gtcGl0Y2hlZCB2b2ljZXMgYW5kIG5hdHVyYWxseSBjdXRlIGZvcm1zIGluc3BpcmUgc29tZXRoaW5nIG9mIGEgcHJvdGVjdGl2ZSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInZlbGtvelwiLFxuICAgIFwia2V5XCI6IFwiMTYxXCIsXG4gICAgXCJuYW1lXCI6IFwiVmVsJ0tvelwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgRXllIG9mIHRoZSBWb2lkXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiTWFnZVwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTA3LjY4LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDc2LFxuICAgICAgXCJtcFwiOiAzNzUuNixcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA0MixcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0MCxcbiAgICAgIFwiYXJtb3JcIjogMjEuODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDUuNDIsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NC45Mzc5LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjE0MTU5LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDEuMzZcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vVmVsa296LnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDI4OCxcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkkgcGFzcyBpbnRvIHRoZSBzdWRkZW4gZ2xhcmUuIEJsaW5rLiBCbGluaywgYmxpbmssIGJsaW5rLiBNeSBleWVzIGFkanVzdCBhbmQgZXZhbHVhdGUgdGhlIGxhbmRzY2FwZSBiZWZvcmUgbWUuPGJyPjxicj5UaGVyZSdzIGEgc2N1cnJ5aW5nLiBJIGxvb2sgZG93biB0byBmaW5kIGEgc21hbGwsIHdoaXRlIGNyZWF0dXJlIHN0YW5kaW5nIG9uIGl0cyBoaW5kIGxlZ3MsIHNuaWZmaW5nIGF0IG15IGJvZHkuIEl0IGludHJpZ3VlcyBtZS4uLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInZpXCIsXG4gICAgXCJrZXlcIjogXCIyNTRcIixcbiAgICBcIm5hbWVcIjogXCJWaVwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgUGlsdG92ZXIgRW5mb3JjZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIkFzc2Fzc2luXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1ODIuOCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NSxcbiAgICAgIFwibXBcIjogMjk1LjYsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDUsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDUsXG4gICAgICBcImFybW9yXCI6IDI1Ljg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDkuMDEsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjksXG4gICAgICBcIm1wcmVnZW5cIjogOC4wOSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNjUsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NS44OCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjVcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vVmkucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogMzM2LFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVG8gVmksIGV2ZXJ5IHByb2JsZW0gaXMganVzdCBhbm90aGVyIGJyaWNrIHdhbGwgdG8gcHVuY2ggdGhyb3VnaCB3aXRoIGhlciBnaWdhbnRpYyBoZXh0ZWNoIGdhdW50bGV0cy4gVGhvdWdoIHNoZSBncmV3IHVwIG9uIHRoZSB3cm9uZyBzaWRlIG9mIHRoZSBsYXcsIFZpIG5vdyB1c2VzIGhlciBjcmltaW5hbCBrbm93LWhvdyB0byBzZXJ2ZSBQaWx0b3ZlcidzIHBvbGljZSBmb3JjZS4gVmkncyBicmFzaCBhdHRpdHVkZSwgYWJyYXNpdmUgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ2aWt0b3JcIixcbiAgICBcImtleVwiOiBcIjExMlwiLFxuICAgIFwibmFtZVwiOiBcIlZpa3RvclwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgTWFjaGluZSBIZXJhbGRcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MTYuMDQsXG4gICAgICBcImhwcGVybGV2ZWxcIjogNzgsXG4gICAgICBcIm1wXCI6IDMyNCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiA1MCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDMzNSxcbiAgICAgIFwiYXJtb3JcIjogMjIuNzIsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogNCxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDUyNSxcbiAgICAgIFwiaHByZWdlblwiOiA3Ljg0LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42NSxcbiAgICAgIFwibXByZWdlblwiOiA2LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC44LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTIuMDQsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA1LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuMTFcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vVmlrdG9yLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb24zLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDM4NCxcbiAgICAgIFwieVwiOiA5NlxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkVhcmx5IGluIGxpZmUsIFZpa3RvciBkaXNjb3ZlcmVkIGhpcyBwYXNzaW9uIGZvciBzY2llbmNlIGFuZCBpbnZlbnRpb24sIHBhcnRpY3VsYXJseSBpbiB0aGUgZmllbGQgb2YgbWVjaGFuaWNhbCBhdXRvbWF0aW9uLiBIZSBhdHRlbmRlZCBaYXVuJ3MgcHJlc3RpZ2lvdXMgQ29sbGVnZSBvZiBUZWNobWF0dXJneSBhbmQgbGVkIHRoZSB0ZWFtIHRoYXQgY29uc3RydWN0ZWQgQmxpdHpjcmFuayAtIGEgc2NpZW50aWZpYyBicmVha3Rocm91Z2ggLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ2bGFkaW1pclwiLFxuICAgIFwia2V5XCI6IFwiOFwiLFxuICAgIFwibmFtZVwiOiBcIlZsYWRpbWlyXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBDcmltc29uIFJlYXBlclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIixcbiAgICAgIFwiVGFua1wiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTI1LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDg0LFxuICAgICAgXCJtcFwiOiAyLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzAsXG4gICAgICBcImFybW9yXCI6IDIzLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuMyxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMCxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDQ1MCxcbiAgICAgIFwiaHByZWdlblwiOiA3LjAwNSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNixcbiAgICAgIFwibXByZWdlblwiOiAwLFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDUyLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDJcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vVmxhZGltaXIucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjMucG5nXCIsXG4gICAgICBcInhcIjogNDMyLFxuICAgICAgXCJ5XCI6IDk2XG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGhlcmUgaXMgYSB0ZW1wbGUgaGlkZGVuIGluIHRoZSBtb3VudGFpbnMgYmV0d2VlbiBOb3h1cyBhbmQgdGhlIFRlbXBlc3QgRmxhdHMsIHdoZXJlIHRoZSBzZWNyZXRzIG9mIGFuIGFuY2llbnQgYW5kIHRlcnJpZnlpbmcgc29yY2VyeSBhcmUga2VwdC4gVGhlIGFyZWEgc3Vycm91bmRpbmcgdGhlIHRlbXBsZSBpcyBsaXR0ZXJlZCB3aXRoIHRoZSBleHNhbmd1aW5hdGVkIGNvcnBzZXMgb2YgdGhvc2Ugd2hvIGhhdmUgbWlzdGFrZW5seSAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInZvbGliZWFyXCIsXG4gICAgXCJrZXlcIjogXCIxMDZcIixcbiAgICBcIm5hbWVcIjogXCJWb2xpYmVhclwiLFxuICAgIFwidGl0bGVcIjogXCJ0aGUgVGh1bmRlcidzIFJvYXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIlRhbmtcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDU4NC40OCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4NixcbiAgICAgIFwibXBcIjogMjcwLjQsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMzAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDUsXG4gICAgICBcImFybW9yXCI6IDI2LjM4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTI1LFxuICAgICAgXCJocHJlZ2VuXCI6IDguMDksXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjY1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDguMDksXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjY1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTkuNTQ0LFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IC0wLjA1LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuNjdcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vVm9saWJlYXIucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjQucG5nXCIsXG4gICAgICBcInhcIjogMCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGhlIHVuZm9yZ2l2aW5nIG5vcnRoZXJuIHJlYWNoZXMgb2YgdGhlIEZyZWxqb3JkIGFyZSBob21lIHRvIHRoZSBVcnNpbmUsIGEgZmllcmNlIGFuZCB3YXJsaWtlIHJhY2UgdGhhdCBoYXMgZW5kdXJlZCB0aGUgYmFycmVuIHR1bmRyYSBmb3IgdGhvdXNhbmRzIG9mIHllYXJzLiBUaGVpciBsZWFkZXIgaXMgYSBmdXJpb3VzIGFkdmVyc2FyeSB3aG8gY29tbWFuZHMgdGhlIGZvcmNlIG9mIGxpZ2h0bmluZyB0byBzdHJpa2UgZmVhciB3aXRoaW4gLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ3YXJ3aWNrXCIsXG4gICAgXCJrZXlcIjogXCIxOVwiLFxuICAgIFwibmFtZVwiOiBcIldhcndpY2tcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIEJsb29kIEh1bnRlclwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiVGFua1wiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTkyLjY0LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDk4LFxuICAgICAgXCJtcFwiOiAyNDAuNCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAzMCxcbiAgICAgIFwibW92ZXNwZWVkXCI6IDM0NSxcbiAgICAgIFwiYXJtb3JcIjogMjUuODgsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy41LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMyLjEsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxMjUsXG4gICAgICBcImhwcmVnZW5cIjogOC4zOSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwibXByZWdlblwiOiA4LjEwNSxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuNixcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDYyLjQzLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VwZXJsZXZlbFwiOiAzLjM3NSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDgsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi44OFxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9XYXJ3aWNrLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb240LnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQ4LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJXYXJ3aWNrIHdhcyBvbmNlIGEgbWFuIHJldmVyZWQgZm9yIGhpcyBhYmlsaXR5IHRvIHRyYWNrIGRvd24gaHVtYW4gc3BlY2ltZW5zIGZvciB0aGUgZGFya2VzdCB0eXBlcyBvZiBzY2llbnRpZmljIHJlc2VhcmNoLiBXaGVuIGhpcyBhbWJpdGlvbnMgZXhjZWVkZWQgaGlzIHBoeXNpY2FsIGxpbWl0cywgaGUgZHJhbmsgYSBkYW5nZXJvdXMgZWxpeGlyIHRvIHRyYW5zZm9ybSBoaW1zZWxmIGludG8gYW4gdW5zdG9wcGFibGUgbWFuaHVudGVyLiAuLi5cIlxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInhlcmF0aFwiLFxuICAgIFwia2V5XCI6IFwiMTAxXCIsXG4gICAgXCJuYW1lXCI6IFwiWGVyYXRoXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBNYWd1cyBBc2NlbmRhbnRcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCIsXG4gICAgICBcIkFzc2Fzc2luXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MTQuNCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MCxcbiAgICAgIFwibXBcIjogMzY2Ljk2LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQ0LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQwLFxuICAgICAgXCJhcm1vclwiOiAyMS44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1MjUsXG4gICAgICBcImhwcmVnZW5cIjogNS40MixcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNTUsXG4gICAgICBcIm1wcmVnZW5cIjogNixcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU0LjcsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMS4zNlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9YZXJhdGgucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjQucG5nXCIsXG4gICAgICBcInhcIjogOTYsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIicnQSBsaWZldGltZSBhcyBhIHNsYXZlIGhhcyBwcmVwYXJlZCBtZSBmb3IgZXRlcm5pdHkgYXMgeW91ciBtYXN0ZXIuJyc8YnI+PGJyPlhlcmF0aCBpcyBhbiBBc2NlbmRlZCBNYWd1cyBvZiBhbmNpZW50IFNodXJpbWEsIGEgYmVpbmcgb2YgYXJjYW5lIGVuZXJneSB3cml0aGluZyBpbiB0aGUgYnJva2VuIHNoYXJkcyBvZiBhIG1hZ2ljYWwgc2FyY29waGFndXMuIEZvciBtaWxsZW5uaWEsIGhlIHdhcyB0cmFwcGVkIGJlbmVhdGggdGhlIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwieGluemhhb1wiLFxuICAgIFwia2V5XCI6IFwiNVwiLFxuICAgIFwibmFtZVwiOiBcIlhpbiBaaGFvXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBTZW5lc2NoYWwgb2YgRGVtYWNpYVwiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIkZpZ2h0ZXJcIixcbiAgICAgIFwiQXNzYXNzaW5cIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDYwMCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA5MixcbiAgICAgIFwibXBcIjogMjczLjgsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogMzUsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDUsXG4gICAgICBcImFybW9yXCI6IDI1Ljg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTc1LFxuICAgICAgXCJocHJlZ2VuXCI6IDguMTc1LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC43LFxuICAgICAgXCJtcHJlZ2VuXCI6IDcuMjU1LFxuICAgICAgXCJtcHJlZ2VucGVybGV2ZWxcIjogMC40NSxcbiAgICAgIFwiY3JpdFwiOiAwLFxuICAgICAgXCJjcml0cGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlXCI6IDU3LjU0NCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMy4zLFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAwLFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuNlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9YaW5aaGFvLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb240LnBuZ1wiLFxuICAgICAgXCJ4XCI6IDE0NCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiJydEZWF0aCBpcyBpbmV2aXRhYmxlLCBvbmUgY2FuIG9ubHkgYXZvaWQgZGVmZWF0LicnPGJyPjxicj5XaGVuZXZlciBKYXJ2YW4gSUlJLCB0aGUga2luZyBvZiBEZW1hY2lhLCBkZWxpdmVycyBvbmUgb2YgaGlzIHJhbGx5aW5nIHNwZWVjaGVzIGZyb20gdGhlIGdsaW50aW5nIG1hcmJsZSBiYWxjb255IGF0b3AgdGhlIFJveWFsIFBhbGFjZSwgWGluIFpoYW8gaXMgYXQgaGlzIHNpZGUuIENvaW5lZCB0aGUgU2VuZXNjaGFsIG9mIERlbWFjaWEsLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ5YXN1b1wiLFxuICAgIFwia2V5XCI6IFwiMTU3XCIsXG4gICAgXCJuYW1lXCI6IFwiWWFzdW9cIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFVuZm9yZ2l2ZW5cIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJGaWdodGVyXCIsXG4gICAgICBcIkFzc2Fzc2luXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MTcuNzYsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODIsXG4gICAgICBcIm1wXCI6IDEwMCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQ1LFxuICAgICAgXCJhcm1vclwiOiAyNC43MTIsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy40LFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTc1LFxuICAgICAgXCJocHJlZ2VuXCI6IDYuNTEsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjksXG4gICAgICBcIm1wcmVnZW5cIjogMCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NS4zNzYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMixcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDY3LFxuICAgICAgXCJhdHRhY2tzcGVlZHBlcmxldmVsXCI6IDIuNVxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9ZYXN1by5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uNC5wbmdcIixcbiAgICAgIFwieFwiOiAxOTIsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIllhc3VvIGlzIGEgbWFuIG9mIHJlc29sdmUsIGFuIGFnaWxlIHN3b3Jkc21hbiB3aG8gd2llbGRzIHRoZSB3aW5kIGl0c2VsZiB0byBjdXQgZG93biBoaXMgZm9lcy4gVGhpcyBvbmNlLXByb3VkIHdhcnJpb3IgaGFzIGJlZW4gZGlzZ3JhY2VkIGJ5IGEgZmFsc2UgYWNjdXNhdGlvbiBhbmQgZm9yY2VkIGludG8gYSBkZXNwZXJhdGUgZmlnaHQgZm9yIHN1cnZpdmFsLiBXaXRoIHRoZSB3b3JsZCB0dXJuZWQgYWdhaW5zdCBoaW0sIGhlIHdpbGwgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ5b3JpY2tcIixcbiAgICBcImtleVwiOiBcIjgzXCIsXG4gICAgXCJuYW1lXCI6IFwiWW9yaWNrXCIsXG4gICAgXCJ0aXRsZVwiOiBcIlNoZXBoZXJkIG9mIFNvdWxzXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiRmlnaHRlclwiLFxuICAgICAgXCJUYW5rXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1ODAsXG4gICAgICBcImhwcGVybGV2ZWxcIjogMTAwLFxuICAgICAgXCJtcFwiOiAzMDAsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDAsXG4gICAgICBcImFybW9yXCI6IDMwLFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDQsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAxLjI1LFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiAxNzUsXG4gICAgICBcImhwcmVnZW5cIjogOCxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuOCxcbiAgICAgIFwibXByZWdlblwiOiA3LjUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjc1LFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTcsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDUsXG4gICAgICBcImF0dGFja3NwZWVkb2Zmc2V0XCI6IDAsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9Zb3JpY2sucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjQucG5nXCIsXG4gICAgICBcInhcIjogMjQwLFxuICAgICAgXCJ5XCI6IDBcbiAgICB9LFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCInJ1RoZXNlIGlzbGVz4oCmIEhvdyB0aGV5IHNjcmVhbS4nJzxicj5UaGUgbGFzdCBzdXJ2aXZvciBvZiBhIGxvbmctZm9yZ290dGVuIHJlbGlnaW91cyBvcmRlciwgWW9yaWNrIGlzIGJvdGggYmxlc3NlZCBhbmQgY3Vyc2VkIHdpdGggcG93ZXIgb3ZlciB0aGUgZGVhZC4gVHJhcHBlZCBvbiB0aGUgU2hhZG93IElzbGVzLCBoaXMgb25seSBjb21wYW5pb25zIGFyZSB0aGUgcm90dGluZyBjb3Jwc2VzIGFuZCBzaHJpZWtpbmcgc3Bpcml0cyB0aGF0IC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiemFjXCIsXG4gICAgXCJrZXlcIjogXCIxNTRcIixcbiAgICBcIm5hbWVcIjogXCJaYWNcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIFNlY3JldCBXZWFwb25cIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJUYW5rXCIsXG4gICAgICBcIkZpZ2h0ZXJcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDYxNC42LFxuICAgICAgXCJocHBlcmxldmVsXCI6IDk1LFxuICAgICAgXCJtcFwiOiAwLFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDAsXG4gICAgICBcImFybW9yXCI6IDIzLjg4LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMuNSxcbiAgICAgIFwic3BlbGxibG9ja1wiOiAzMi4xLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMS4yNSxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogMTc1LFxuICAgICAgXCJocHJlZ2VuXCI6IDcuOTIsXG4gICAgICBcImhwcmVnZW5wZXJsZXZlbFwiOiAwLjU1LFxuICAgICAgXCJtcHJlZ2VuXCI6IDAsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLFxuICAgICAgXCJjcml0XCI6IDAsXG4gICAgICBcImNyaXRwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tkYW1hZ2VcIjogNTkuNjcsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMzc1LFxuICAgICAgXCJhdHRhY2tzcGVlZG9mZnNldFwiOiAtMC4wMixcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAxLjZcbiAgICB9LFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvY2hhbXBpb24vWmFjLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvY2hhbXBpb240LnBuZ1wiLFxuICAgICAgXCJ4XCI6IDI4OCxcbiAgICAgIFwieVwiOiAwXG4gICAgfSxcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiWmFjIGlzIHRoZSBwcm9kdWN0IG9mIGEgWmF1biBleHBlcmltZW50IHRvIG1hbnVmYWN0dXJlIGEgaGV4Y2hlbS1lbmdpbmVlcmVkIHN1cGVyc29sZGllciAtIHRoZSBaYXVuIEFtb3JwaG91cyBDb21iYXRhbnQuIENvbWJpbmluZyBicnV0ZSBzdHJlbmd0aCB3aXRoIGxpbWl0bGVzcyBmbGV4aWJpbGl0eSwgaGUgaXMgYSB2ZXJzYXRpbGUganVnZ2VybmF1dDogYSBjcmVhdGl2ZSBmaWdodGVyIHdobyBib3VuY2VzIG92ZXIgb2JzdGFjbGVzIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiemVkXCIsXG4gICAgXCJrZXlcIjogXCIyMzhcIixcbiAgICBcIm5hbWVcIjogXCJaZWRcIixcbiAgICBcInRpdGxlXCI6IFwidGhlIE1hc3RlciBvZiBTaGFkb3dzXCIsXG4gICAgXCJ0YWdzXCI6IFtcbiAgICAgIFwiQXNzYXNzaW5cIixcbiAgICAgIFwiRmlnaHRlclwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNTc5LjQsXG4gICAgICBcImhwcGVybGV2ZWxcIjogODAsXG4gICAgICBcIm1wXCI6IDIwMCxcbiAgICAgIFwibXBwZXJsZXZlbFwiOiAwLFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzQ1LFxuICAgICAgXCJhcm1vclwiOiAyNi44OCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjUsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzIuMSxcbiAgICAgIFwic3BlbGxibG9ja3BlcmxldmVsXCI6IDEuMjUsXG4gICAgICBcImF0dGFja3JhbmdlXCI6IDEyNSxcbiAgICAgIFwiaHByZWdlblwiOiA3LjA5LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42NSxcbiAgICAgIFwibXByZWdlblwiOiA1MCxcbiAgICAgIFwibXByZWdlbnBlcmxldmVsXCI6IDAsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NC43MTIsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuNCxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDMsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMi4xXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1plZC5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uNC5wbmdcIixcbiAgICAgIFwieFwiOiAzMzYsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlplZCBpcyB0aGUgZmlyc3QgbmluamEgaW4gMjAwIHllYXJzIHRvIHVubG9jayB0aGUgYW5jaWVudCwgZm9yYmlkZGVuIHdheXMuIEhlIGRlZmllZCBoaXMgY2xhbiBhbmQgbWFzdGVyLCBjYXN0aW5nIG9mZiB0aGUgYmFsYW5jZSBhbmQgZGlzY2lwbGluZSB0aGF0IGhhZCBzaGFja2xlZCBoaW0gYWxsIGhpcyBsaWZlLiBaZWQgbm93IG9mZmVycyBwb3dlciB0byB0aG9zZSB3aG8gZW1icmFjZSBrbm93bGVkZ2Ugb2YgdGhlIHNoYWRvd3MsIC4uLlwiXG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiemlnZ3NcIixcbiAgICBcImtleVwiOiBcIjExNVwiLFxuICAgIFwibmFtZVwiOiBcIlppZ2dzXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBIZXhwbG9zaXZlcyBFeHBlcnRcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJNYWdlXCJcbiAgICBdLFxuICAgIFwic3RhdHNcIjoge1xuICAgICAgXCJocFwiOiA1MjQuNCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA4MCxcbiAgICAgIFwibXBcIjogMzg0LFxuICAgICAgXCJtcHBlcmxldmVsXCI6IDQ3LFxuICAgICAgXCJtb3Zlc3BlZWRcIjogMzI1LFxuICAgICAgXCJhcm1vclwiOiAyMS41NDQsXG4gICAgICBcImFybW9ycGVybGV2ZWxcIjogMy4zLFxuICAgICAgXCJzcGVsbGJsb2NrXCI6IDMwLFxuICAgICAgXCJzcGVsbGJsb2NrcGVybGV2ZWxcIjogMCxcbiAgICAgIFwiYXR0YWNrcmFuZ2VcIjogNTUwLFxuICAgICAgXCJocHJlZ2VuXCI6IDYuMjU1LFxuICAgICAgXCJocHJlZ2VucGVybGV2ZWxcIjogMC42LFxuICAgICAgXCJtcHJlZ2VuXCI6IDYsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1NC4yMDgsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMSxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogLTAuMDQ3MzQsXG4gICAgICBcImF0dGFja3NwZWVkcGVybGV2ZWxcIjogMlxuICAgIH0sXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9jaGFtcGlvbi9aaWdncy5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uNC5wbmdcIixcbiAgICAgIFwieFwiOiAzODQsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlppZ2dzIHdhcyBib3JuIHdpdGggYSB0YWxlbnQgZm9yIHRpbmtlcmluZywgYnV0IGhpcyBjaGFvdGljLCBoeXBlcmFjdGl2ZSBuYXR1cmUgd2FzIHVudXN1YWwgYW1vbmcgeW9yZGxlIHNjaWVudGlzdHMuIEFzcGlyaW5nIHRvIGJlIGEgcmV2ZXJlZCBpbnZlbnRvciBsaWtlIEhlaW1lcmRpbmdlciwgaGUgcmF0dGxlZCB0aHJvdWdoIGFtYml0aW91cyBwcm9qZWN0cyB3aXRoIG1hbmljIHplYWwsIGVtYm9sZGVuZWQgYnkgYm90aCBoaXMgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ6aWxlYW5cIixcbiAgICBcImtleVwiOiBcIjI2XCIsXG4gICAgXCJuYW1lXCI6IFwiWmlsZWFuXCIsXG4gICAgXCJ0aXRsZVwiOiBcInRoZSBDaHJvbm9rZWVwZXJcIixcbiAgICBcInRhZ3NcIjogW1xuICAgICAgXCJTdXBwb3J0XCIsXG4gICAgICBcIk1hZ2VcIlxuICAgIF0sXG4gICAgXCJzdGF0c1wiOiB7XG4gICAgICBcImhwXCI6IDQ5OS4yOCxcbiAgICAgIFwiaHBwZXJsZXZlbFwiOiA3NyxcbiAgICAgIFwibXBcIjogMzYwLjgsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNjAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzMzUsXG4gICAgICBcImFybW9yXCI6IDE5LjEzNCxcbiAgICAgIFwiYXJtb3JwZXJsZXZlbFwiOiAzLjgsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1NTAsXG4gICAgICBcImhwcmVnZW5cIjogNS40NCxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNSxcbiAgICAgIFwibXByZWdlblwiOiA4LjUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1MS42NCxcbiAgICAgIFwiYXR0YWNrZGFtYWdlcGVybGV2ZWxcIjogMyxcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjEzXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1ppbGVhbi5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL2NoYW1waW9uNC5wbmdcIixcbiAgICAgIFwieFwiOiA0MzIsXG4gICAgICBcInlcIjogMFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkluIHRoZSB3YXN0ZWxhbmRzIG9mIFVydGlzdGFuLCB0aGVyZSB3YXMgb25jZSBhIGdyZWF0IGNpdHkuIEl0IHBlcmlzaGVkIGxvbmcgYWdvIGluIGEgdGVycmlibGUgUnVuZSBXYXIsIGxpa2UgbW9zdCBvZiB0aGUgbGFuZHMgYmVsb3cgdGhlIEdyZWF0IEJhcnJpZXIuIE5ldmVydGhlbGVzcywgb25lIG1hbiBzdXJ2aXZlZDogYSBzb3JjZXJlciBuYW1lZCBaaWxlYW4uIEJlaW5nIG9ic2Vzc2VkIHdpdGggdGltZSwgaXQgd2FzIG9ubHkgLi4uXCJcbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJ6eXJhXCIsXG4gICAgXCJrZXlcIjogXCIxNDNcIixcbiAgICBcIm5hbWVcIjogXCJaeXJhXCIsXG4gICAgXCJ0aXRsZVwiOiBcIlJpc2Ugb2YgdGhlIFRob3Juc1wiLFxuICAgIFwidGFnc1wiOiBbXG4gICAgICBcIk1hZ2VcIixcbiAgICAgIFwiU3VwcG9ydFwiXG4gICAgXSxcbiAgICBcInN0YXRzXCI6IHtcbiAgICAgIFwiaHBcIjogNDk5LjMyLFxuICAgICAgXCJocHBlcmxldmVsXCI6IDc0LFxuICAgICAgXCJtcFwiOiAzMzQsXG4gICAgICBcIm1wcGVybGV2ZWxcIjogNTAsXG4gICAgICBcIm1vdmVzcGVlZFwiOiAzNDAsXG4gICAgICBcImFybW9yXCI6IDIwLjA0LFxuICAgICAgXCJhcm1vcnBlcmxldmVsXCI6IDMsXG4gICAgICBcInNwZWxsYmxvY2tcIjogMzAsXG4gICAgICBcInNwZWxsYmxvY2twZXJsZXZlbFwiOiAwLFxuICAgICAgXCJhdHRhY2tyYW5nZVwiOiA1NzUsXG4gICAgICBcImhwcmVnZW5cIjogNS42OSxcbiAgICAgIFwiaHByZWdlbnBlcmxldmVsXCI6IDAuNSxcbiAgICAgIFwibXByZWdlblwiOiA4LjUsXG4gICAgICBcIm1wcmVnZW5wZXJsZXZlbFwiOiAwLjgsXG4gICAgICBcImNyaXRcIjogMCxcbiAgICAgIFwiY3JpdHBlcmxldmVsXCI6IDAsXG4gICAgICBcImF0dGFja2RhbWFnZVwiOiA1My4zNzYsXG4gICAgICBcImF0dGFja2RhbWFnZXBlcmxldmVsXCI6IDMuMixcbiAgICAgIFwiYXR0YWNrc3BlZWRvZmZzZXRcIjogMCxcbiAgICAgIFwiYXR0YWNrc3BlZWRwZXJsZXZlbFwiOiAyLjExXG4gICAgfSxcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL2NoYW1waW9uL1p5cmEucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9jaGFtcGlvbjQucG5nXCIsXG4gICAgICBcInhcIjogMCxcbiAgICAgIFwieVwiOiA0OFxuICAgIH0sXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIkxvbmdpbmcgdG8gdGFrZSBjb250cm9sIG9mIGhlciBmYXRlLCB0aGUgYW5jaWVudCwgZHlpbmcgcGxhbnQgWnlyYSB0cmFuc2ZlcnJlZCBoZXIgY29uc2Npb3VzbmVzcyBpbnRvIGEgaHVtYW4gYm9keSBmb3IgYSBzZWNvbmQgY2hhbmNlIGF0IGxpZmUuIENlbnR1cmllcyBhZ28sIHNoZSBhbmQgaGVyIGtpbmQgZG9taW5hdGVkIHRoZSBLdW11bmd1IEp1bmdsZSwgdXNpbmcgdGhvcm5zIGFuZCB2aW5lcyB0byBjb25zdW1lIGFueSBhbmltYWwgLi4uXCJcbiAgfVxuXSIsIm1vZHVsZS5leHBvcnRzPVtcbiAge1xuICAgIFwiaWRcIjogXCJiYXJyaWVyXCIsXG4gICAgXCJuYW1lXCI6IFwiQmFycmllclwiLFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJTaGllbGRzIHlvdXIgY2hhbXBpb24gZnJvbSAxMTUtNDU1IGRhbWFnZSAoZGVwZW5kaW5nIG9uIGNoYW1waW9uIGxldmVsKSBmb3IgMiBzZWNvbmRzLlwiLFxuICAgIFwidG9vbHRpcFwiOiBcIlRlbXBvcmFyaWx5IHNoaWVsZHMge3sgZjEgfX0gZGFtYWdlIGZyb20geW91ciBjaGFtcGlvbiBmb3IgMiBzZWNvbmRzLlwiLFxuICAgIFwiY29vbGRvd25cIjogMTgwLFxuICAgIFwia2V5XCI6IFwiMjFcIixcbiAgICBcInN1bW1vbmVyTGV2ZWxcIjogNCxcbiAgICBcIm1heGFtbW9cIjogXCItMVwiLFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3BlbGwvU3VtbW9uZXJCYXJyaWVyLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvc3BlbGwwLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDAsXG4gICAgICBcInlcIjogMFxuICAgIH1cbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJib29zdFwiLFxuICAgIFwibmFtZVwiOiBcIkNsZWFuc2VcIixcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiUmVtb3ZlcyBhbGwgZGlzYWJsZXMgYW5kIHN1bW1vbmVyIHNwZWxsIGRlYnVmZnMgYWZmZWN0aW5nIHlvdXIgY2hhbXBpb24gYW5kIGxvd2VycyB0aGUgZHVyYXRpb24gb2YgaW5jb21pbmcgZGlzYWJsZXMgYnkgNjUlIGZvciAzIHNlY29uZHMuXCIsXG4gICAgXCJ0b29sdGlwXCI6IFwiUmVtb3ZlcyBhbGwgZGlzYWJsZXMgYW5kIHN1bW1vbmVyIHNwZWxsIGRlYnVmZnMgYWZmZWN0aW5nIHlvdXIgY2hhbXBpb24gYW5kIHJlZHVjZXMgdGhlIGR1cmF0aW9uIG9mIGRpc2FibGVzIGJ5IDY1JSBmb3IgdGhlIG5leHQge3sgZjEgfX0gc2Vjb25kcy5cIixcbiAgICBcImNvb2xkb3duXCI6IDIxMCxcbiAgICBcImtleVwiOiBcIjFcIixcbiAgICBcInN1bW1vbmVyTGV2ZWxcIjogNixcbiAgICBcIm1heGFtbW9cIjogXCItMVwiLFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3BlbGwvU3VtbW9uZXJCb29zdC5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL3NwZWxsMC5wbmdcIixcbiAgICAgIFwieFwiOiA0OCxcbiAgICAgIFwieVwiOiAwXG4gICAgfVxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcImRvdFwiLFxuICAgIFwibmFtZVwiOiBcIklnbml0ZVwiLFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJJZ25pdGVzIHRhcmdldCBlbmVteSBjaGFtcGlvbiwgZGVhbGluZyA3MC00MTAgdHJ1ZSBkYW1hZ2UgKGRlcGVuZGluZyBvbiBjaGFtcGlvbiBsZXZlbCkgb3ZlciA1IHNlY29uZHMsIGdyYW50cyB5b3UgdmlzaW9uIG9mIHRoZSB0YXJnZXQsIGFuZCByZWR1Y2VzIGhlYWxpbmcgZWZmZWN0cyBvbiB0aGVtIGZvciB0aGUgZHVyYXRpb24uXCIsXG4gICAgXCJ0b29sdGlwXCI6IFwiSWduaXRlIGRlYWxzIDxzcGFuIGNsYXNzPVxcXCJjb2xvckZFRkNGRlxcXCI+e3sgZjEgfX08L3NwYW4+IHRydWUgZGFtYWdlIHRvIHRhcmdldCBlbmVteSBjaGFtcGlvbiBvdmVyIDUgc2Vjb25kcywgZ3JhbnRzIHlvdSB2aXNpb24gb2YgdGhlIHRhcmdldCBhbmQgYXBwbGllcyBHcmlldm91cyBXb3VuZHMgZm9yIHRoZSBkdXJhdGlvbi48YnI+PGJyPjxpPihHcmlldm91cyBXb3VuZHMgcmVkdWNlcyBoZWFsaW5nIGVmZmVjdHMgYnkgNDAlLiBUaGlzIHZpc2lvbiBkb2VzIG5vdCByZXZlYWwgc3RlYWx0aGVkIGVuZW1pZXMuKTwvaT5cIixcbiAgICBcImNvb2xkb3duXCI6IDIxMCxcbiAgICBcImtleVwiOiBcIjE0XCIsXG4gICAgXCJzdW1tb25lckxldmVsXCI6IDEwLFxuICAgIFwibWF4YW1tb1wiOiBcIi0xXCIsXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcGVsbC9TdW1tb25lckRvdC5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL3NwZWxsMC5wbmdcIixcbiAgICAgIFwieFwiOiAxNDQsXG4gICAgICBcInlcIjogMFxuICAgIH1cbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJleGhhdXN0XCIsXG4gICAgXCJuYW1lXCI6IFwiRXhoYXVzdFwiLFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJFeGhhdXN0cyB0YXJnZXQgZW5lbXkgY2hhbXBpb24sIHJlZHVjaW5nIHRoZWlyIE1vdmVtZW50IFNwZWVkIGFuZCBBdHRhY2sgU3BlZWQgYnkgMzAlLCB0aGVpciBBcm1vciBhbmQgTWFnaWMgUmVzaXN0IGJ5IDEwLCBhbmQgdGhlaXIgZGFtYWdlIGRlYWx0IGJ5IDQwJSBmb3IgMi41IHNlY29uZHMuXCIsXG4gICAgXCJ0b29sdGlwXCI6IFwiRXhoYXVzdHMgdGFyZ2V0IGVuZW15IGNoYW1waW9uLCByZWR1Y2luZyB0aGVpciBNb3ZlbWVudCBTcGVlZCBhbmQgQXR0YWNrIFNwZWVkIGJ5IHt7IGYzIH19JSwgdGhlaXIgQXJtb3IgYW5kIE1hZ2ljIFJlc2lzdCBieSB7eyBmNCB9fSwgYW5kIHRoZWlyIGRhbWFnZSBkZWFsdCBieSB7eyBmMiB9fSUgZm9yIDIuNSBzZWNvbmRzLlwiLFxuICAgIFwiY29vbGRvd25cIjogMjEwLFxuICAgIFwia2V5XCI6IFwiM1wiLFxuICAgIFwic3VtbW9uZXJMZXZlbFwiOiA0LFxuICAgIFwibWF4YW1tb1wiOiBcIi0xXCIsXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcGVsbC9TdW1tb25lckV4aGF1c3QucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9zcGVsbDAucG5nXCIsXG4gICAgICBcInhcIjogMTkyLFxuICAgICAgXCJ5XCI6IDBcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiZmxhc2hcIixcbiAgICBcIm5hbWVcIjogXCJGbGFzaFwiLFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUZWxlcG9ydHMgeW91ciBjaGFtcGlvbiBhIHNob3J0IGRpc3RhbmNlIHRvd2FyZCB5b3VyIGN1cnNvcidzIGxvY2F0aW9uLlwiLFxuICAgIFwidG9vbHRpcFwiOiBcIlRlbGVwb3J0cyB5b3VyIGNoYW1waW9uIGEgc2hvcnQgZGlzdGFuY2UgdG93YXJkIHlvdXIgY3Vyc29yJ3MgbG9jYXRpb24uXCIsXG4gICAgXCJjb29sZG93blwiOiAzMDAsXG4gICAgXCJrZXlcIjogXCI0XCIsXG4gICAgXCJzdW1tb25lckxldmVsXCI6IDgsXG4gICAgXCJtYXhhbW1vXCI6IFwiLTFcIixcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3NwZWxsL1N1bW1vbmVyRmxhc2gucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9zcGVsbDAucG5nXCIsXG4gICAgICBcInhcIjogMjQwLFxuICAgICAgXCJ5XCI6IDBcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiaGFzdGVcIixcbiAgICBcIm5hbWVcIjogXCJHaG9zdFwiLFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJZb3VyIGNoYW1waW9uIGNhbiBtb3ZlIHRocm91Z2ggdW5pdHMgYW5kIGhhcyAyOC00NSUgKGRlcGVuZGluZyBvbiBjaGFtcGlvbiBsZXZlbCkgaW5jcmVhc2VkIE1vdmVtZW50IFNwZWVkIGZvciAxMCBzZWNvbmRzLlwiLFxuICAgIFwidG9vbHRpcFwiOiBcIllvdXIgY2hhbXBpb24gY2FuIG1vdmUgdGhyb3VnaCB1bml0cyBhbmQgaGFzIHt7IGYxIH19JSBpbmNyZWFzZWQgTW92ZW1lbnQgU3BlZWQgZm9yIDEwIHNlY29uZHMuXCIsXG4gICAgXCJjb29sZG93blwiOiAxODAsXG4gICAgXCJrZXlcIjogXCI2XCIsXG4gICAgXCJzdW1tb25lckxldmVsXCI6IDEsXG4gICAgXCJtYXhhbW1vXCI6IFwiLTFcIixcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3NwZWxsL1N1bW1vbmVySGFzdGUucG5nXCIsXG4gICAgXCJzcHJpdGVcIjoge1xuICAgICAgXCJ1cmxcIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3Nwcml0ZS9zcGVsbDAucG5nXCIsXG4gICAgICBcInhcIjogMjg4LFxuICAgICAgXCJ5XCI6IDBcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwiaGVhbFwiLFxuICAgIFwibmFtZVwiOiBcIkhlYWxcIixcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiUmVzdG9yZXMgOTAtMzQ1IEhlYWx0aCAoZGVwZW5kaW5nIG9uIGNoYW1waW9uIGxldmVsKSBhbmQgZ3JhbnRzIDMwJSBNb3ZlbWVudCBTcGVlZCBmb3IgMSBzZWNvbmQgdG8geW91IGFuZCB0YXJnZXQgYWxsaWVkIGNoYW1waW9uLiBUaGlzIGhlYWxpbmcgaXMgaGFsdmVkIGZvciB1bml0cyByZWNlbnRseSBhZmZlY3RlZCBieSBTdW1tb25lciBIZWFsLlwiLFxuICAgIFwidG9vbHRpcFwiOiBcIlJlc3RvcmVzIHt7IGYxIH19IEhlYWx0aCBhbmQgZ3JhbnRzIDMwJSBNb3ZlbWVudCBTcGVlZCBmb3IgMSBzZWNvbmQgdG8geW91ciBjaGFtcGlvbiBhbmQgdGFyZ2V0IGFsbGllZCBjaGFtcGlvbi4gVGhpcyBoZWFsaW5nIGlzIGhhbHZlZCBmb3IgdW5pdHMgcmVjZW50bHkgYWZmZWN0ZWQgYnkgU3VtbW9uZXIgSGVhbC48YnI+PGJyPjxzcGFuIGNsYXNzPVxcXCJjb2xvckZGRkYwMFxcXCI+SWYgdGhpcyBzcGVsbCBjYW5ub3QgZmluZCBhIHRhcmdldCwgaXQgd2lsbCBjYXN0IG9uIHRoZSBtb3N0IHdvdW5kZWQgYWxsaWVkIGNoYW1waW9uIGluIHJhbmdlLjwvc3Bhbj5cIixcbiAgICBcImNvb2xkb3duXCI6IDI0MCxcbiAgICBcImtleVwiOiBcIjdcIixcbiAgICBcInN1bW1vbmVyTGV2ZWxcIjogMSxcbiAgICBcIm1heGFtbW9cIjogXCItMVwiLFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3BlbGwvU3VtbW9uZXJIZWFsLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvc3BlbGwwLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDMzNixcbiAgICAgIFwieVwiOiAwXG4gICAgfVxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcIm1hbmFcIixcbiAgICBcIm5hbWVcIjogXCJDbGFyaXR5XCIsXG4gICAgXCJkZXNjcmlwdGlvblwiOiBcIlJlc3RvcmVzIDUwJSBvZiB5b3VyIGNoYW1waW9uJ3MgbWF4aW11bSBNYW5hLiBBbHNvIHJlc3RvcmVzIGFsbGllcyBmb3IgMjUlIG9mIHRoZWlyIG1heGltdW0gTWFuYS5cIixcbiAgICBcInRvb2x0aXBcIjogXCJSZXN0b3JlcyB7eyBmMSB9fSUgbWF4aW11bSBNYW5hIHRvIHlvdXIgQ2hhbXBpb24gYW5kIHt7IGYyIH19JSB0byBuZWFyYnkgYWxsaWVzLlwiLFxuICAgIFwiY29vbGRvd25cIjogMjQwLFxuICAgIFwia2V5XCI6IFwiMTNcIixcbiAgICBcInN1bW1vbmVyTGV2ZWxcIjogMSxcbiAgICBcIm1heGFtbW9cIjogXCItMVwiLFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3BlbGwvU3VtbW9uZXJNYW5hLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvc3BlbGwwLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDM4NCxcbiAgICAgIFwieVwiOiAwXG4gICAgfVxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInBvcm9yZWNhbGxcIixcbiAgICBcIm5hbWVcIjogXCJUbyB0aGUgS2luZyFcIixcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiUXVpY2tseSB0cmF2ZWwgdG8gdGhlIFBvcm8gS2luZydzIHNpZGUuXCIsXG4gICAgXCJ0b29sdGlwXCI6IFwiPHNwYW4gY2xhc3M9XFxcImNvbG9yRkZFMDc2XFxcIj5QYXNzaXZlOjwvc3Bhbj4gSGl0dGluZyBhbiBlbmVteSBjaGFtcGlvbiB3aXRoIGEgUG9ybyBnaXZlcyB5b3VyIHRlYW0gYSBQb3JvIE1hcmsuIFVwb24gcmVhY2hpbmcgMTAgUG9ybyBNYXJrcywgeW91ciB0ZWFtIHN1bW1vbnMgdGhlIFBvcm8gS2luZyB0byBmaWdodCBhbG9uZ3NpZGUgdGhlbS4gV2hpbGUgdGhlIFBvcm8gS2luZyBpcyBhY3RpdmUsIG5vIFBvcm8gTWFya3MgY2FuIGJlIHNjb3JlZCBieSBlaXRoZXIgdGVhbS48YnI+PGJyPjxzcGFuIGNsYXNzPVxcXCJjb2xvckZGRTA3NlxcXCI+QWN0aXZlOjwvc3Bhbj4gUXVpY2tseSBkYXNoIHRvIEtpbmcgUG9ybydzIHNpZGUuIENhbiBvbmx5IGJlIGNhc3Qgd2hpbGUgdGhlIFBvcm8gS2luZyBpcyBzdW1tb25lZCBmb3IgeW91ciB0ZWFtLiA8YnI+PGJyPjxpPjxzcGFuIGNsYXNzPVxcXCJjb2xvckZERDAxN1xcXCI+JydQb3JvcyB0dWcgdGhlIGhlYXJ0c3RyaW5ncy4gVGhlIHJlc3Qgb2YgeW91IGp1c3QgY29tZXMgYWxvbmcgZm9yIHRoZSByaWRlLicnPC9zcGFuPjwvaT5cIixcbiAgICBcImNvb2xkb3duXCI6IDEwLFxuICAgIFwia2V5XCI6IFwiMzBcIixcbiAgICBcInN1bW1vbmVyTGV2ZWxcIjogMSxcbiAgICBcIm1heGFtbW9cIjogXCItMVwiLFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3BlbGwvU3VtbW9uZXJQb3JvUmVjYWxsLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvc3BlbGwwLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDQzMixcbiAgICAgIFwieVwiOiAwXG4gICAgfVxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInBvcm90aHJvd1wiLFxuICAgIFwibmFtZVwiOiBcIlBvcm8gVG9zc1wiLFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJUb3NzIGEgUG9ybyBhdCB5b3VyIGVuZW1pZXMuIElmIGl0IGhpdHMsIHlvdSBjYW4gcXVpY2tseSB0cmF2ZWwgdG8geW91ciB0YXJnZXQgYXMgYSBmb2xsb3cgdXAuXCIsXG4gICAgXCJ0b29sdGlwXCI6IFwiVG9zcyBhIFBvcm8gYSBsb25nIGRpc3RhbmNlLCBkZWFsaW5nIHt7IGYyIH19IHRydWUgZGFtYWdlIHRvIHRoZSBmaXJzdCBlbmVteSB1bml0IGhpdC4gVGhpcyBhYmlsaXR5IGNhbiBiZSByZWNhc3QgZm9yIDMgc2Vjb25kcyBpZiBpdCBoaXRzIGFuIGVuZW15IHRvIGRhc2ggdG8gdGhlIHRhcmdldCBoaXQuIERhc2hpbmcgdG8gdGhlIHRhcmdldCB3aWxsIHJlZHVjZSB0aGUgY29vbGRvd24gb2YgUG9ybyBUb3NzIGJ5IDUgc2Vjb25kcy48YnI+PGJyPlBvcm9zIGFyZSBub3QgYmxvY2tlZCBieSBzcGVsbCBzaGllbGRzIG9yIHdpbmQgd2FsbHMgYmVjYXVzZSB0aGV5IGFyZSBhbmltYWxzLCBub3Qgc3BlbGxzITxicj48YnI+PGk+PHNwYW4gY2xhc3M9XFxcImNvbG9yRkREMDE3XFxcIj4nJ1Bvcm9zIGFyZSBhIG1vZGVsIGZvciBSdW5ldGVycmFuIGFlcm9keW5hbWljcy4nJzwvc3Bhbj48L2k+XCIsXG4gICAgXCJjb29sZG93blwiOiAyMCxcbiAgICBcImtleVwiOiBcIjMxXCIsXG4gICAgXCJzdW1tb25lckxldmVsXCI6IDEsXG4gICAgXCJtYXhhbW1vXCI6IFwiLTFcIixcbiAgICBcImljb25cIjogXCJodHRwOi8vZGRyYWdvbi5sZWFndWVvZmxlZ2VuZHMuY29tL2Nkbi82LjIxLjEvaW1nL3NwZWxsL1N1bW1vbmVyUG9yb1Rocm93LnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvc3BlbGwwLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDAsXG4gICAgICBcInlcIjogNDhcbiAgICB9XG4gIH0sXG4gIHtcbiAgICBcImlkXCI6IFwic21pdGVcIixcbiAgICBcIm5hbWVcIjogXCJTbWl0ZVwiLFxuICAgIFwiZGVzY3JpcHRpb25cIjogXCJEZWFscyAzOTAtMTAwMCB0cnVlIGRhbWFnZSAoZGVwZW5kaW5nIG9uIGNoYW1waW9uIGxldmVsKSB0byB0YXJnZXQgZXBpYyBvciBsYXJnZSBtb25zdGVyIG9yIGVuZW15IG1pbmlvbi5cIixcbiAgICBcInRvb2x0aXBcIjogXCJEZWFscyA8c3BhbiBjbGFzcz1cXFwiY29sb3JGRUZDRkZcXFwiPnt7IGYxIH19PC9zcGFuPiB0cnVlIGRhbWFnZSB0byB0YXJnZXQgZXBpYyBvciBsYXJnZSBtb25zdGVyIG9yIGVuZW15IG1pbmlvbi48YnI+PGJyPlNtaXRlIHJlZ2FpbnMgYSBjaGFyZ2UgZXZlcnkge3sgZjMgfX0gc2Vjb25kcywgdXAgdG8gYSBtYXhpbXVtIG9mIDIgY2hhcmdlcy48YnI+PGJyPjxpPlNtaXRpbmcgTGFyZ2UgTW9uc3RlcnMgaW5zdGFudGx5IGhhcnZlc3RzIGFkZGl0aW9uYWwgYm9udXNlcyBiYXNlZCBvbiB0aGUgTW9uc3Rlci4gTW91c2Ugb3ZlciBsYXJnZSBqdW5nbGUgbW9uc3RlcnMgdG8gc2VlIHBvdGVudGlhbCBib251cyByZXdhcmRzLjwvaT5cIixcbiAgICBcImNvb2xkb3duXCI6IDc1LFxuICAgIFwia2V5XCI6IFwiMTFcIixcbiAgICBcInN1bW1vbmVyTGV2ZWxcIjogMTAsXG4gICAgXCJtYXhhbW1vXCI6IFwiMlwiLFxuICAgIFwiaWNvblwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3BlbGwvU3VtbW9uZXJTbWl0ZS5wbmdcIixcbiAgICBcInNwcml0ZVwiOiB7XG4gICAgICBcInVybFwiOiBcImh0dHA6Ly9kZHJhZ29uLmxlYWd1ZW9mbGVnZW5kcy5jb20vY2RuLzYuMjEuMS9pbWcvc3ByaXRlL3NwZWxsMC5wbmdcIixcbiAgICAgIFwieFwiOiA0OCxcbiAgICAgIFwieVwiOiA0OFxuICAgIH1cbiAgfSxcbiAge1xuICAgIFwiaWRcIjogXCJzbm93YmFsbFwiLFxuICAgIFwibmFtZVwiOiBcIk1hcmtcIixcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiVGhyb3cgYSBzbm93YmFsbCBpbiBhIHN0cmFpZ2h0IGxpbmUgYXQgeW91ciBlbmVtaWVzLiBJZiBpdCBoaXRzIGFuIGVuZW15LCB0aGV5IGJlY29tZSBtYXJrZWQgYW5kIHlvdXIgY2hhbXBpb24gY2FuIHF1aWNrbHkgdHJhdmVsIHRvIHRoZSBtYXJrZWQgdGFyZ2V0IGFzIGEgZm9sbG93IHVwLlwiLFxuICAgIFwidG9vbHRpcFwiOiBcIlRocm93IGEgc25vd2JhbGwgYSBsb25nIGRpc3RhbmNlLCBkZWFsaW5nIHt7IGYxIH19IHRydWUgZGFtYWdlIHRvIHRoZSBmaXJzdCBlbmVteSB1bml0IGhpdC4gSWYgaXQgaGl0cyBhbiBlbmVteSwgdGhpcyBhYmlsaXR5IGNhbiBiZSByZWNhc3QgZm9yIHt7IGYyIH19IHNlY29uZHMgdG8gRGFzaCB0byB0aGUgdGFnZ2VkIHVuaXQsIGRlYWxpbmcgYW4gYWRkaXRpb25hbCB7eyBmNSB9fSB0cnVlIGRhbWFnZS4gRGFzaGluZyB0byB0aGUgdGFyZ2V0IHdpbGwgcmVkdWNlIHRoZSBjb29sZG93biBvZiBNYXJrIGJ5IHt7IGYzIH19JS48YnI+PGJyPjxzcGFuIGNsYXNzPVxcXCJjb2xvckZGRkYwMFxcXCI+TWFyayBwcm9qZWN0aWxlcyBhcmUgbm90IHN0b3BwZWQgYnkgc3BlbGwgc2hpZWxkcyBvciBwcm9qZWN0aWxlIG1pdGlnYXRpb24uPC9zcGFuPlwiLFxuICAgIFwiY29vbGRvd25cIjogODAsXG4gICAgXCJrZXlcIjogXCIzMlwiLFxuICAgIFwic3VtbW9uZXJMZXZlbFwiOiAxLFxuICAgIFwibWF4YW1tb1wiOiBcIi0xXCIsXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcGVsbC9TdW1tb25lclNub3diYWxsLnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvc3BlbGwwLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDk2LFxuICAgICAgXCJ5XCI6IDQ4XG4gICAgfVxuICB9LFxuICB7XG4gICAgXCJpZFwiOiBcInRlbGVwb3J0XCIsXG4gICAgXCJuYW1lXCI6IFwiVGVsZXBvcnRcIixcbiAgICBcImRlc2NyaXB0aW9uXCI6IFwiQWZ0ZXIgY2hhbm5lbGluZyBmb3IgNC41IHNlY29uZHMsIHRlbGVwb3J0cyB5b3VyIGNoYW1waW9uIHRvIHRhcmdldCBhbGxpZWQgc3RydWN0dXJlLCBtaW5pb24sIG9yIHdhcmQuXCIsXG4gICAgXCJ0b29sdGlwXCI6IFwiQWZ0ZXIgY2hhbm5lbGluZyBmb3Ige3sgZjEgfX0gc2Vjb25kcywgeW91ciBjaGFtcGlvbiB0ZWxlcG9ydHMgdG8gdGFyZ2V0IGFsbGllZCBzdHJ1Y3R1cmUsIG1pbmlvbiwgb3Igd2FyZC48YnI+PGJyPllvdSBtYXkgcmVhY3RpdmF0ZSBUZWxlcG9ydCB0byBjYW5jZWwgaXQsIHBsYWNpbmcgaXQgb24gYSB7eyBmMyB9fSBzZWNvbmQgY29vbGRvd24uXCIsXG4gICAgXCJjb29sZG93blwiOiAzMDAsXG4gICAgXCJrZXlcIjogXCIxMlwiLFxuICAgIFwic3VtbW9uZXJMZXZlbFwiOiA2LFxuICAgIFwibWF4YW1tb1wiOiBcIi0xXCIsXG4gICAgXCJpY29uXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcGVsbC9TdW1tb25lclRlbGVwb3J0LnBuZ1wiLFxuICAgIFwic3ByaXRlXCI6IHtcbiAgICAgIFwidXJsXCI6IFwiaHR0cDovL2RkcmFnb24ubGVhZ3Vlb2ZsZWdlbmRzLmNvbS9jZG4vNi4yMS4xL2ltZy9zcHJpdGUvc3BlbGwwLnBuZ1wiLFxuICAgICAgXCJ4XCI6IDE0NCxcbiAgICAgIFwieVwiOiA0OFxuICAgIH1cbiAgfVxuXSIsIlxyXG4vKipcclxuICogRWxlbWVudCBwcm90b3R5cGUuXHJcbiAqL1xyXG5cclxudmFyIHByb3RvID0gRWxlbWVudC5wcm90b3R5cGU7XHJcblxyXG4vKipcclxuICogVmVuZG9yIGZ1bmN0aW9uLlxyXG4gKi9cclxuXHJcbnZhciB2ZW5kb3IgPSBwcm90by5tYXRjaGVzU2VsZWN0b3JcclxuICB8fCBwcm90by53ZWJraXRNYXRjaGVzU2VsZWN0b3JcclxuICB8fCBwcm90by5tb3pNYXRjaGVzU2VsZWN0b3JcclxuICB8fCBwcm90by5tc01hdGNoZXNTZWxlY3RvclxyXG4gIHx8IHByb3RvLm9NYXRjaGVzU2VsZWN0b3I7XHJcblxyXG4vKipcclxuICogRXhwb3NlIGBtYXRjaCgpYC5cclxuICovXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG1hdGNoO1xyXG5cclxuLyoqXHJcbiAqIE1hdGNoIGBlbGAgdG8gYHNlbGVjdG9yYC5cclxuICpcclxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxyXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcclxuICogQHJldHVybiB7Qm9vbGVhbn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5mdW5jdGlvbiBtYXRjaChlbCwgc2VsZWN0b3IpIHtcclxuICBpZiAodmVuZG9yKSByZXR1cm4gdmVuZG9yLmNhbGwoZWwsIHNlbGVjdG9yKTtcclxuICB2YXIgbm9kZXMgPSBlbC5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyArK2kpIHtcclxuICAgIGlmIChub2Rlc1tpXSA9PSBlbCkgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG4gIHJldHVybiBmYWxzZTtcclxufSIsIid1c2Ugc3RyaWN0Jztcbi8vIENyZWF0ZSBhIHJhbmdlIG9iamVjdCBmb3IgZWZmaWNlbnRseSByZW5kZXJpbmcgc3RyaW5ncyB0byBlbGVtZW50cy5cbnZhciByYW5nZTtcblxudmFyIGRvYyA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQ7XG5cbnZhciB0ZXN0RWwgPSBkb2MgP1xuICAgIGRvYy5ib2R5IHx8IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKSA6XG4gICAge307XG5cbnZhciBOU19YSFRNTCA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJztcblxudmFyIEVMRU1FTlRfTk9ERSA9IDE7XG52YXIgVEVYVF9OT0RFID0gMztcbnZhciBDT01NRU5UX05PREUgPSA4O1xuXG4vLyBGaXhlcyA8aHR0cHM6Ly9naXRodWIuY29tL3BhdHJpY2stc3RlZWxlLWlkZW0vbW9ycGhkb20vaXNzdWVzLzMyPlxuLy8gKElFNysgc3VwcG9ydCkgPD1JRTcgZG9lcyBub3Qgc3VwcG9ydCBlbC5oYXNBdHRyaWJ1dGUobmFtZSlcbnZhciBoYXNBdHRyaWJ1dGVOUztcblxuaWYgKHRlc3RFbC5oYXNBdHRyaWJ1dGVOUykge1xuICAgIGhhc0F0dHJpYnV0ZU5TID0gZnVuY3Rpb24oZWwsIG5hbWVzcGFjZVVSSSwgbmFtZSkge1xuICAgICAgICByZXR1cm4gZWwuaGFzQXR0cmlidXRlTlMobmFtZXNwYWNlVVJJLCBuYW1lKTtcbiAgICB9O1xufSBlbHNlIGlmICh0ZXN0RWwuaGFzQXR0cmlidXRlKSB7XG4gICAgaGFzQXR0cmlidXRlTlMgPSBmdW5jdGlvbihlbCwgbmFtZXNwYWNlVVJJLCBuYW1lKSB7XG4gICAgICAgIHJldHVybiBlbC5oYXNBdHRyaWJ1dGUobmFtZSk7XG4gICAgfTtcbn0gZWxzZSB7XG4gICAgaGFzQXR0cmlidXRlTlMgPSBmdW5jdGlvbihlbCwgbmFtZXNwYWNlVVJJLCBuYW1lKSB7XG4gICAgICAgIHJldHVybiAhIWVsLmdldEF0dHJpYnV0ZU5vZGUobmFtZSk7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gdG9FbGVtZW50KHN0cikge1xuICAgIGlmICghcmFuZ2UgJiYgZG9jLmNyZWF0ZVJhbmdlKSB7XG4gICAgICAgIHJhbmdlID0gZG9jLmNyZWF0ZVJhbmdlKCk7XG4gICAgICAgIHJhbmdlLnNlbGVjdE5vZGUoZG9jLmJvZHkpO1xuICAgIH1cblxuICAgIHZhciBmcmFnbWVudDtcbiAgICBpZiAocmFuZ2UgJiYgcmFuZ2UuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KSB7XG4gICAgICAgIGZyYWdtZW50ID0gcmFuZ2UuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KHN0cik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZnJhZ21lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCgnYm9keScpO1xuICAgICAgICBmcmFnbWVudC5pbm5lckhUTUwgPSBzdHI7XG4gICAgfVxuICAgIHJldHVybiBmcmFnbWVudC5jaGlsZE5vZGVzWzBdO1xufVxuXG5mdW5jdGlvbiBzeW5jQm9vbGVhbkF0dHJQcm9wKGZyb21FbCwgdG9FbCwgbmFtZSkge1xuICAgIGlmIChmcm9tRWxbbmFtZV0gIT09IHRvRWxbbmFtZV0pIHtcbiAgICAgICAgZnJvbUVsW25hbWVdID0gdG9FbFtuYW1lXTtcbiAgICAgICAgaWYgKGZyb21FbFtuYW1lXSkge1xuICAgICAgICAgICAgZnJvbUVsLnNldEF0dHJpYnV0ZShuYW1lLCAnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmcm9tRWwucmVtb3ZlQXR0cmlidXRlKG5hbWUsICcnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxudmFyIHNwZWNpYWxFbEhhbmRsZXJzID0ge1xuICAgIC8qKlxuICAgICAqIE5lZWRlZCBmb3IgSUUuIEFwcGFyZW50bHkgSUUgZG9lc24ndCB0aGluayB0aGF0IFwic2VsZWN0ZWRcIiBpcyBhblxuICAgICAqIGF0dHJpYnV0ZSB3aGVuIHJlYWRpbmcgb3ZlciB0aGUgYXR0cmlidXRlcyB1c2luZyBzZWxlY3RFbC5hdHRyaWJ1dGVzXG4gICAgICovXG4gICAgT1BUSU9OOiBmdW5jdGlvbihmcm9tRWwsIHRvRWwpIHtcbiAgICAgICAgc3luY0Jvb2xlYW5BdHRyUHJvcChmcm9tRWwsIHRvRWwsICdzZWxlY3RlZCcpO1xuICAgIH0sXG4gICAgLyoqXG4gICAgICogVGhlIFwidmFsdWVcIiBhdHRyaWJ1dGUgaXMgc3BlY2lhbCBmb3IgdGhlIDxpbnB1dD4gZWxlbWVudCBzaW5jZSBpdCBzZXRzXG4gICAgICogdGhlIGluaXRpYWwgdmFsdWUuIENoYW5naW5nIHRoZSBcInZhbHVlXCIgYXR0cmlidXRlIHdpdGhvdXQgY2hhbmdpbmcgdGhlXG4gICAgICogXCJ2YWx1ZVwiIHByb3BlcnR5IHdpbGwgaGF2ZSBubyBlZmZlY3Qgc2luY2UgaXQgaXMgb25seSB1c2VkIHRvIHRoZSBzZXQgdGhlXG4gICAgICogaW5pdGlhbCB2YWx1ZS4gIFNpbWlsYXIgZm9yIHRoZSBcImNoZWNrZWRcIiBhdHRyaWJ1dGUsIGFuZCBcImRpc2FibGVkXCIuXG4gICAgICovXG4gICAgSU5QVVQ6IGZ1bmN0aW9uKGZyb21FbCwgdG9FbCkge1xuICAgICAgICBzeW5jQm9vbGVhbkF0dHJQcm9wKGZyb21FbCwgdG9FbCwgJ2NoZWNrZWQnKTtcbiAgICAgICAgc3luY0Jvb2xlYW5BdHRyUHJvcChmcm9tRWwsIHRvRWwsICdkaXNhYmxlZCcpO1xuXG4gICAgICAgIGlmIChmcm9tRWwudmFsdWUgIT09IHRvRWwudmFsdWUpIHtcbiAgICAgICAgICAgIGZyb21FbC52YWx1ZSA9IHRvRWwudmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWhhc0F0dHJpYnV0ZU5TKHRvRWwsIG51bGwsICd2YWx1ZScpKSB7XG4gICAgICAgICAgICBmcm9tRWwucmVtb3ZlQXR0cmlidXRlKCd2YWx1ZScpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIFRFWFRBUkVBOiBmdW5jdGlvbihmcm9tRWwsIHRvRWwpIHtcbiAgICAgICAgdmFyIG5ld1ZhbHVlID0gdG9FbC52YWx1ZTtcbiAgICAgICAgaWYgKGZyb21FbC52YWx1ZSAhPT0gbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIGZyb21FbC52YWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZyb21FbC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICBmcm9tRWwuZmlyc3RDaGlsZC5ub2RlVmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0d28gbm9kZSdzIG5hbWVzIGFyZSB0aGUgc2FtZS5cbiAqXG4gKiBOT1RFOiBXZSBkb24ndCBib3RoZXIgY2hlY2tpbmcgYG5hbWVzcGFjZVVSSWAgYmVjYXVzZSB5b3Ugd2lsbCBuZXZlciBmaW5kIHR3byBIVE1MIGVsZW1lbnRzIHdpdGggdGhlIHNhbWVcbiAqICAgICAgIG5vZGVOYW1lIGFuZCBkaWZmZXJlbnQgbmFtZXNwYWNlIFVSSXMuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBhXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGIgVGhlIHRhcmdldCBlbGVtZW50XG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBjb21wYXJlTm9kZU5hbWVzKGZyb21FbCwgdG9FbCkge1xuICAgIHZhciBmcm9tTm9kZU5hbWUgPSBmcm9tRWwubm9kZU5hbWU7XG4gICAgdmFyIHRvTm9kZU5hbWUgPSB0b0VsLm5vZGVOYW1lO1xuXG4gICAgaWYgKGZyb21Ob2RlTmFtZSA9PT0gdG9Ob2RlTmFtZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodG9FbC5hY3R1YWxpemUgJiZcbiAgICAgICAgZnJvbU5vZGVOYW1lLmNoYXJDb2RlQXQoMCkgPCA5MSAmJiAvKiBmcm9tIHRhZyBuYW1lIGlzIHVwcGVyIGNhc2UgKi9cbiAgICAgICAgdG9Ob2RlTmFtZS5jaGFyQ29kZUF0KDApID4gOTAgLyogdGFyZ2V0IHRhZyBuYW1lIGlzIGxvd2VyIGNhc2UgKi8pIHtcbiAgICAgICAgLy8gSWYgdGhlIHRhcmdldCBlbGVtZW50IGlzIGEgdmlydHVhbCBET00gbm9kZSB0aGVuIHdlIG1heSBuZWVkIHRvIG5vcm1hbGl6ZSB0aGUgdGFnIG5hbWVcbiAgICAgICAgLy8gYmVmb3JlIGNvbXBhcmluZy4gTm9ybWFsIEhUTUwgZWxlbWVudHMgdGhhdCBhcmUgaW4gdGhlIFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiXG4gICAgICAgIC8vIGFyZSBjb252ZXJ0ZWQgdG8gdXBwZXIgY2FzZVxuICAgICAgICByZXR1cm4gZnJvbU5vZGVOYW1lID09PSB0b05vZGVOYW1lLnRvVXBwZXJDYXNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDcmVhdGUgYW4gZWxlbWVudCwgb3B0aW9uYWxseSB3aXRoIGEga25vd24gbmFtZXNwYWNlIFVSSS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSB0aGUgZWxlbWVudCBuYW1lLCBlLmcuICdkaXYnIG9yICdzdmcnXG4gKiBAcGFyYW0ge3N0cmluZ30gW25hbWVzcGFjZVVSSV0gdGhlIGVsZW1lbnQncyBuYW1lc3BhY2UgVVJJLCBpLmUuIHRoZSB2YWx1ZSBvZlxuICogaXRzIGB4bWxuc2AgYXR0cmlidXRlIG9yIGl0cyBpbmZlcnJlZCBuYW1lc3BhY2UuXG4gKlxuICogQHJldHVybiB7RWxlbWVudH1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlRWxlbWVudE5TKG5hbWUsIG5hbWVzcGFjZVVSSSkge1xuICAgIHJldHVybiAhbmFtZXNwYWNlVVJJIHx8IG5hbWVzcGFjZVVSSSA9PT0gTlNfWEhUTUwgP1xuICAgICAgICBkb2MuY3JlYXRlRWxlbWVudChuYW1lKSA6XG4gICAgICAgIGRvYy5jcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlVVJJLCBuYW1lKTtcbn1cblxuLyoqXG4gKiBMb29wIG92ZXIgYWxsIG9mIHRoZSBhdHRyaWJ1dGVzIG9uIHRoZSB0YXJnZXQgbm9kZSBhbmQgbWFrZSBzdXJlIHRoZSBvcmlnaW5hbFxuICogRE9NIG5vZGUgaGFzIHRoZSBzYW1lIGF0dHJpYnV0ZXMuIElmIGFuIGF0dHJpYnV0ZSBmb3VuZCBvbiB0aGUgb3JpZ2luYWwgbm9kZVxuICogaXMgbm90IG9uIHRoZSBuZXcgbm9kZSB0aGVuIHJlbW92ZSBpdCBmcm9tIHRoZSBvcmlnaW5hbCBub2RlLlxuICpcbiAqIEBwYXJhbSAge0VsZW1lbnR9IGZyb21Ob2RlXG4gKiBAcGFyYW0gIHtFbGVtZW50fSB0b05vZGVcbiAqL1xuZnVuY3Rpb24gbW9ycGhBdHRycyhmcm9tTm9kZSwgdG9Ob2RlKSB7XG4gICAgdmFyIGF0dHJzID0gdG9Ob2RlLmF0dHJpYnV0ZXM7XG4gICAgdmFyIGk7XG4gICAgdmFyIGF0dHI7XG4gICAgdmFyIGF0dHJOYW1lO1xuICAgIHZhciBhdHRyTmFtZXNwYWNlVVJJO1xuICAgIHZhciBhdHRyVmFsdWU7XG4gICAgdmFyIGZyb21WYWx1ZTtcblxuICAgIGlmICh0b05vZGUuYXNzaWduQXR0cmlidXRlcykge1xuICAgICAgICB0b05vZGUuYXNzaWduQXR0cmlidXRlcyhmcm9tTm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChpID0gYXR0cnMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgIGF0dHIgPSBhdHRyc1tpXTtcbiAgICAgICAgICAgIGF0dHJOYW1lID0gYXR0ci5uYW1lO1xuICAgICAgICAgICAgYXR0ck5hbWVzcGFjZVVSSSA9IGF0dHIubmFtZXNwYWNlVVJJO1xuICAgICAgICAgICAgYXR0clZhbHVlID0gYXR0ci52YWx1ZTtcblxuICAgICAgICAgICAgaWYgKGF0dHJOYW1lc3BhY2VVUkkpIHtcbiAgICAgICAgICAgICAgICBhdHRyTmFtZSA9IGF0dHIubG9jYWxOYW1lIHx8IGF0dHJOYW1lO1xuICAgICAgICAgICAgICAgIGZyb21WYWx1ZSA9IGZyb21Ob2RlLmdldEF0dHJpYnV0ZU5TKGF0dHJOYW1lc3BhY2VVUkksIGF0dHJOYW1lKTtcblxuICAgICAgICAgICAgICAgIGlmIChmcm9tVmFsdWUgIT09IGF0dHJWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBmcm9tTm9kZS5zZXRBdHRyaWJ1dGVOUyhhdHRyTmFtZXNwYWNlVVJJLCBhdHRyTmFtZSwgYXR0clZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZyb21WYWx1ZSA9IGZyb21Ob2RlLmdldEF0dHJpYnV0ZShhdHRyTmFtZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoZnJvbVZhbHVlICE9PSBhdHRyVmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbU5vZGUuc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyVmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJlbW92ZSBhbnkgZXh0cmEgYXR0cmlidXRlcyBmb3VuZCBvbiB0aGUgb3JpZ2luYWwgRE9NIGVsZW1lbnQgdGhhdFxuICAgIC8vIHdlcmVuJ3QgZm91bmQgb24gdGhlIHRhcmdldCBlbGVtZW50LlxuICAgIGF0dHJzID0gZnJvbU5vZGUuYXR0cmlidXRlcztcblxuICAgIGZvciAoaSA9IGF0dHJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIGF0dHIgPSBhdHRyc1tpXTtcbiAgICAgICAgaWYgKGF0dHIuc3BlY2lmaWVkICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgYXR0ck5hbWUgPSBhdHRyLm5hbWU7XG4gICAgICAgICAgICBhdHRyTmFtZXNwYWNlVVJJID0gYXR0ci5uYW1lc3BhY2VVUkk7XG5cbiAgICAgICAgICAgIGlmIChhdHRyTmFtZXNwYWNlVVJJKSB7XG4gICAgICAgICAgICAgICAgYXR0ck5hbWUgPSBhdHRyLmxvY2FsTmFtZSB8fCBhdHRyTmFtZTtcblxuICAgICAgICAgICAgICAgIGlmICghaGFzQXR0cmlidXRlTlModG9Ob2RlLCBhdHRyTmFtZXNwYWNlVVJJLCBhdHRyTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbU5vZGUucmVtb3ZlQXR0cmlidXRlTlMoYXR0ck5hbWVzcGFjZVVSSSwgYXR0ck5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCFoYXNBdHRyaWJ1dGVOUyh0b05vZGUsIG51bGwsIGF0dHJOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICBmcm9tTm9kZS5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBDb3BpZXMgdGhlIGNoaWxkcmVuIG9mIG9uZSBET00gZWxlbWVudCB0byBhbm90aGVyIERPTSBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIG1vdmVDaGlsZHJlbihmcm9tRWwsIHRvRWwpIHtcbiAgICB2YXIgY3VyQ2hpbGQgPSBmcm9tRWwuZmlyc3RDaGlsZDtcbiAgICB3aGlsZSAoY3VyQ2hpbGQpIHtcbiAgICAgICAgdmFyIG5leHRDaGlsZCA9IGN1ckNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICB0b0VsLmFwcGVuZENoaWxkKGN1ckNoaWxkKTtcbiAgICAgICAgY3VyQ2hpbGQgPSBuZXh0Q2hpbGQ7XG4gICAgfVxuICAgIHJldHVybiB0b0VsO1xufVxuXG5mdW5jdGlvbiBkZWZhdWx0R2V0Tm9kZUtleShub2RlKSB7XG4gICAgcmV0dXJuIG5vZGUuaWQ7XG59XG5cbmZ1bmN0aW9uIG1vcnBoZG9tKGZyb21Ob2RlLCB0b05vZGUsIG9wdGlvbnMpIHtcbiAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdG9Ob2RlID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAoZnJvbU5vZGUubm9kZU5hbWUgPT09ICcjZG9jdW1lbnQnIHx8IGZyb21Ob2RlLm5vZGVOYW1lID09PSAnSFRNTCcpIHtcbiAgICAgICAgICAgIHZhciB0b05vZGVIdG1sID0gdG9Ob2RlO1xuICAgICAgICAgICAgdG9Ob2RlID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2h0bWwnKTtcbiAgICAgICAgICAgIHRvTm9kZS5pbm5lckhUTUwgPSB0b05vZGVIdG1sO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9Ob2RlID0gdG9FbGVtZW50KHRvTm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgZ2V0Tm9kZUtleSA9IG9wdGlvbnMuZ2V0Tm9kZUtleSB8fCBkZWZhdWx0R2V0Tm9kZUtleTtcbiAgICB2YXIgb25CZWZvcmVOb2RlQWRkZWQgPSBvcHRpb25zLm9uQmVmb3JlTm9kZUFkZGVkIHx8IG5vb3A7XG4gICAgdmFyIG9uTm9kZUFkZGVkID0gb3B0aW9ucy5vbk5vZGVBZGRlZCB8fCBub29wO1xuICAgIHZhciBvbkJlZm9yZUVsVXBkYXRlZCA9IG9wdGlvbnMub25CZWZvcmVFbFVwZGF0ZWQgfHwgbm9vcDtcbiAgICB2YXIgb25FbFVwZGF0ZWQgPSBvcHRpb25zLm9uRWxVcGRhdGVkIHx8IG5vb3A7XG4gICAgdmFyIG9uQmVmb3JlTm9kZURpc2NhcmRlZCA9IG9wdGlvbnMub25CZWZvcmVOb2RlRGlzY2FyZGVkIHx8IG5vb3A7XG4gICAgdmFyIG9uTm9kZURpc2NhcmRlZCA9IG9wdGlvbnMub25Ob2RlRGlzY2FyZGVkIHx8IG5vb3A7XG4gICAgdmFyIG9uQmVmb3JlRWxDaGlsZHJlblVwZGF0ZWQgPSBvcHRpb25zLm9uQmVmb3JlRWxDaGlsZHJlblVwZGF0ZWQgfHwgbm9vcDtcbiAgICB2YXIgY2hpbGRyZW5Pbmx5ID0gb3B0aW9ucy5jaGlsZHJlbk9ubHkgPT09IHRydWU7XG5cbiAgICAvLyBUaGlzIG9iamVjdCBpcyB1c2VkIGFzIGEgbG9va3VwIHRvIHF1aWNrbHkgZmluZCBhbGwga2V5ZWQgZWxlbWVudHMgaW4gdGhlIG9yaWdpbmFsIERPTSB0cmVlLlxuICAgIHZhciBmcm9tTm9kZXNMb29rdXAgPSB7fTtcbiAgICB2YXIga2V5ZWRSZW1vdmFsTGlzdDtcblxuICAgIGZ1bmN0aW9uIGFkZEtleWVkUmVtb3ZhbChrZXkpIHtcbiAgICAgICAgaWYgKGtleWVkUmVtb3ZhbExpc3QpIHtcbiAgICAgICAgICAgIGtleWVkUmVtb3ZhbExpc3QucHVzaChrZXkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAga2V5ZWRSZW1vdmFsTGlzdCA9IFtrZXldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd2Fsa0Rpc2NhcmRlZENoaWxkTm9kZXMobm9kZSwgc2tpcEtleWVkTm9kZXMpIHtcbiAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgdmFyIGN1ckNoaWxkID0gbm9kZS5maXJzdENoaWxkO1xuICAgICAgICAgICAgd2hpbGUgKGN1ckNoaWxkKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNraXBLZXllZE5vZGVzICYmIChrZXkgPSBnZXROb2RlS2V5KGN1ckNoaWxkKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgd2UgYXJlIHNraXBwaW5nIGtleWVkIG5vZGVzIHRoZW4gd2UgYWRkIHRoZSBrZXlcbiAgICAgICAgICAgICAgICAgICAgLy8gdG8gYSBsaXN0IHNvIHRoYXQgaXQgY2FuIGJlIGhhbmRsZWQgYXQgdGhlIHZlcnkgZW5kLlxuICAgICAgICAgICAgICAgICAgICBhZGRLZXllZFJlbW92YWwoa2V5KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBPbmx5IHJlcG9ydCB0aGUgbm9kZSBhcyBkaXNjYXJkZWQgaWYgaXQgaXMgbm90IGtleWVkLiBXZSBkbyB0aGlzIGJlY2F1c2VcbiAgICAgICAgICAgICAgICAgICAgLy8gYXQgdGhlIGVuZCB3ZSBsb29wIHRocm91Z2ggYWxsIGtleWVkIGVsZW1lbnRzIHRoYXQgd2VyZSB1bm1hdGNoZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gYW5kIHRoZW4gZGlzY2FyZCB0aGVtIGluIG9uZSBmaW5hbCBwYXNzLlxuICAgICAgICAgICAgICAgICAgICBvbk5vZGVEaXNjYXJkZWQoY3VyQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VyQ2hpbGQuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2Fsa0Rpc2NhcmRlZENoaWxkTm9kZXMoY3VyQ2hpbGQsIHNraXBLZXllZE5vZGVzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGN1ckNoaWxkID0gY3VyQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGEgRE9NIG5vZGUgb3V0IG9mIHRoZSBvcmlnaW5hbCBET01cbiAgICAgKlxuICAgICAqIEBwYXJhbSAge05vZGV9IG5vZGUgVGhlIG5vZGUgdG8gcmVtb3ZlXG4gICAgICogQHBhcmFtICB7Tm9kZX0gcGFyZW50Tm9kZSBUaGUgbm9kZXMgcGFyZW50XG4gICAgICogQHBhcmFtICB7Qm9vbGVhbn0gc2tpcEtleWVkTm9kZXMgSWYgdHJ1ZSB0aGVuIGVsZW1lbnRzIHdpdGgga2V5cyB3aWxsIGJlIHNraXBwZWQgYW5kIG5vdCBkaXNjYXJkZWQuXG4gICAgICogQHJldHVybiB7dW5kZWZpbmVkfVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlbW92ZU5vZGUobm9kZSwgcGFyZW50Tm9kZSwgc2tpcEtleWVkTm9kZXMpIHtcbiAgICAgICAgaWYgKG9uQmVmb3JlTm9kZURpc2NhcmRlZChub2RlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwYXJlbnROb2RlKSB7XG4gICAgICAgICAgICBwYXJlbnROb2RlLnJlbW92ZUNoaWxkKG5vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgb25Ob2RlRGlzY2FyZGVkKG5vZGUpO1xuICAgICAgICB3YWxrRGlzY2FyZGVkQ2hpbGROb2Rlcyhub2RlLCBza2lwS2V5ZWROb2Rlcyk7XG4gICAgfVxuXG4gICAgLy8gLy8gVHJlZVdhbGtlciBpbXBsZW1lbnRhdGlvbiBpcyBubyBmYXN0ZXIsIGJ1dCBrZWVwaW5nIHRoaXMgYXJvdW5kIGluIGNhc2UgdGhpcyBjaGFuZ2VzIGluIHRoZSBmdXR1cmVcbiAgICAvLyBmdW5jdGlvbiBpbmRleFRyZWUocm9vdCkge1xuICAgIC8vICAgICB2YXIgdHJlZVdhbGtlciA9IGRvY3VtZW50LmNyZWF0ZVRyZWVXYWxrZXIoXG4gICAgLy8gICAgICAgICByb290LFxuICAgIC8vICAgICAgICAgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQpO1xuICAgIC8vXG4gICAgLy8gICAgIHZhciBlbDtcbiAgICAvLyAgICAgd2hpbGUoKGVsID0gdHJlZVdhbGtlci5uZXh0Tm9kZSgpKSkge1xuICAgIC8vICAgICAgICAgdmFyIGtleSA9IGdldE5vZGVLZXkoZWwpO1xuICAgIC8vICAgICAgICAgaWYgKGtleSkge1xuICAgIC8vICAgICAgICAgICAgIGZyb21Ob2Rlc0xvb2t1cFtrZXldID0gZWw7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG5cbiAgICAvLyAvLyBOb2RlSXRlcmF0b3IgaW1wbGVtZW50YXRpb24gaXMgbm8gZmFzdGVyLCBidXQga2VlcGluZyB0aGlzIGFyb3VuZCBpbiBjYXNlIHRoaXMgY2hhbmdlcyBpbiB0aGUgZnV0dXJlXG4gICAgLy9cbiAgICAvLyBmdW5jdGlvbiBpbmRleFRyZWUobm9kZSkge1xuICAgIC8vICAgICB2YXIgbm9kZUl0ZXJhdG9yID0gZG9jdW1lbnQuY3JlYXRlTm9kZUl0ZXJhdG9yKG5vZGUsIE5vZGVGaWx0ZXIuU0hPV19FTEVNRU5UKTtcbiAgICAvLyAgICAgdmFyIGVsO1xuICAgIC8vICAgICB3aGlsZSgoZWwgPSBub2RlSXRlcmF0b3IubmV4dE5vZGUoKSkpIHtcbiAgICAvLyAgICAgICAgIHZhciBrZXkgPSBnZXROb2RlS2V5KGVsKTtcbiAgICAvLyAgICAgICAgIGlmIChrZXkpIHtcbiAgICAvLyAgICAgICAgICAgICBmcm9tTm9kZXNMb29rdXBba2V5XSA9IGVsO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy8gfVxuXG4gICAgZnVuY3Rpb24gaW5kZXhUcmVlKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgdmFyIGN1ckNoaWxkID0gbm9kZS5maXJzdENoaWxkO1xuICAgICAgICAgICAgd2hpbGUgKGN1ckNoaWxkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IGdldE5vZGVLZXkoY3VyQ2hpbGQpO1xuICAgICAgICAgICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbU5vZGVzTG9va3VwW2tleV0gPSBjdXJDaGlsZDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBXYWxrIHJlY3Vyc2l2ZWx5XG4gICAgICAgICAgICAgICAgaW5kZXhUcmVlKGN1ckNoaWxkKTtcblxuICAgICAgICAgICAgICAgIGN1ckNoaWxkID0gY3VyQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpbmRleFRyZWUoZnJvbU5vZGUpO1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlTm9kZUFkZGVkKGVsKSB7XG4gICAgICAgIG9uTm9kZUFkZGVkKGVsKTtcblxuICAgICAgICB2YXIgY3VyQ2hpbGQgPSBlbC5maXJzdENoaWxkO1xuICAgICAgICB3aGlsZSAoY3VyQ2hpbGQpIHtcbiAgICAgICAgICAgIHZhciBuZXh0U2libGluZyA9IGN1ckNoaWxkLm5leHRTaWJsaW5nO1xuXG4gICAgICAgICAgICB2YXIga2V5ID0gZ2V0Tm9kZUtleShjdXJDaGlsZCk7XG4gICAgICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHVubWF0Y2hlZEZyb21FbCA9IGZyb21Ob2Rlc0xvb2t1cFtrZXldO1xuICAgICAgICAgICAgICAgIGlmICh1bm1hdGNoZWRGcm9tRWwgJiYgY29tcGFyZU5vZGVOYW1lcyhjdXJDaGlsZCwgdW5tYXRjaGVkRnJvbUVsKSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJDaGlsZC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZCh1bm1hdGNoZWRGcm9tRWwsIGN1ckNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgbW9ycGhFbCh1bm1hdGNoZWRGcm9tRWwsIGN1ckNoaWxkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGhhbmRsZU5vZGVBZGRlZChjdXJDaGlsZCk7XG4gICAgICAgICAgICBjdXJDaGlsZCA9IG5leHRTaWJsaW5nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW9ycGhFbChmcm9tRWwsIHRvRWwsIGNoaWxkcmVuT25seSkge1xuICAgICAgICB2YXIgdG9FbEtleSA9IGdldE5vZGVLZXkodG9FbCk7XG4gICAgICAgIHZhciBjdXJGcm9tTm9kZUtleTtcblxuICAgICAgICBpZiAodG9FbEtleSkge1xuICAgICAgICAgICAgLy8gSWYgYW4gZWxlbWVudCB3aXRoIGFuIElEIGlzIGJlaW5nIG1vcnBoZWQgdGhlbiBpdCBpcyB3aWxsIGJlIGluIHRoZSBmaW5hbFxuICAgICAgICAgICAgLy8gRE9NIHNvIGNsZWFyIGl0IG91dCBvZiB0aGUgc2F2ZWQgZWxlbWVudHMgY29sbGVjdGlvblxuICAgICAgICAgICAgZGVsZXRlIGZyb21Ob2Rlc0xvb2t1cFt0b0VsS2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0b05vZGUuaXNTYW1lTm9kZSAmJiB0b05vZGUuaXNTYW1lTm9kZShmcm9tTm9kZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY2hpbGRyZW5Pbmx5KSB7XG4gICAgICAgICAgICBpZiAob25CZWZvcmVFbFVwZGF0ZWQoZnJvbUVsLCB0b0VsKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1vcnBoQXR0cnMoZnJvbUVsLCB0b0VsKTtcbiAgICAgICAgICAgIG9uRWxVcGRhdGVkKGZyb21FbCk7XG5cbiAgICAgICAgICAgIGlmIChvbkJlZm9yZUVsQ2hpbGRyZW5VcGRhdGVkKGZyb21FbCwgdG9FbCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZyb21FbC5ub2RlTmFtZSAhPT0gJ1RFWFRBUkVBJykge1xuICAgICAgICAgICAgdmFyIGN1clRvTm9kZUNoaWxkID0gdG9FbC5maXJzdENoaWxkO1xuICAgICAgICAgICAgdmFyIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tRWwuZmlyc3RDaGlsZDtcbiAgICAgICAgICAgIHZhciBjdXJUb05vZGVLZXk7XG5cbiAgICAgICAgICAgIHZhciBmcm9tTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICB2YXIgdG9OZXh0U2libGluZztcbiAgICAgICAgICAgIHZhciBtYXRjaGluZ0Zyb21FbDtcblxuICAgICAgICAgICAgb3V0ZXI6IHdoaWxlIChjdXJUb05vZGVDaGlsZCkge1xuICAgICAgICAgICAgICAgIHRvTmV4dFNpYmxpbmcgPSBjdXJUb05vZGVDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgICBjdXJUb05vZGVLZXkgPSBnZXROb2RlS2V5KGN1clRvTm9kZUNoaWxkKTtcblxuICAgICAgICAgICAgICAgIHdoaWxlIChjdXJGcm9tTm9kZUNoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyb21OZXh0U2libGluZyA9IGN1ckZyb21Ob2RlQ2hpbGQubmV4dFNpYmxpbmc7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1clRvTm9kZUNoaWxkLmlzU2FtZU5vZGUgJiYgY3VyVG9Ob2RlQ2hpbGQuaXNTYW1lTm9kZShjdXJGcm9tTm9kZUNoaWxkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VyVG9Ob2RlQ2hpbGQgPSB0b05leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIG91dGVyO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVLZXkgPSBnZXROb2RlS2V5KGN1ckZyb21Ob2RlQ2hpbGQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBjdXJGcm9tTm9kZVR5cGUgPSBjdXJGcm9tTm9kZUNoaWxkLm5vZGVUeXBlO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBpc0NvbXBhdGlibGUgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckZyb21Ob2RlVHlwZSA9PT0gY3VyVG9Ob2RlQ2hpbGQubm9kZVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJGcm9tTm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJvdGggbm9kZXMgYmVpbmcgY29tcGFyZWQgYXJlIEVsZW1lbnQgbm9kZXNcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJUb05vZGVLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIHRhcmdldCBub2RlIGhhcyBhIGtleSBzbyB3ZSB3YW50IHRvIG1hdGNoIGl0IHVwIHdpdGggdGhlIGNvcnJlY3QgZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpbiB0aGUgb3JpZ2luYWwgRE9NIHRyZWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1clRvTm9kZUtleSAhPT0gY3VyRnJvbU5vZGVLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBjdXJyZW50IGVsZW1lbnQgaW4gdGhlIG9yaWdpbmFsIERPTSB0cmVlIGRvZXMgbm90IGhhdmUgYSBtYXRjaGluZyBrZXkgc29cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxldCdzIGNoZWNrIG91ciBsb29rdXAgdG8gc2VlIGlmIHRoZXJlIGlzIGEgbWF0Y2hpbmcgZWxlbWVudCBpbiB0aGUgb3JpZ2luYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERPTSB0cmVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKG1hdGNoaW5nRnJvbUVsID0gZnJvbU5vZGVzTG9va3VwW2N1clRvTm9kZUtleV0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckZyb21Ob2RlQ2hpbGQubmV4dFNpYmxpbmcgPT09IG1hdGNoaW5nRnJvbUVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNwZWNpYWwgY2FzZSBmb3Igc2luZ2xlIGVsZW1lbnQgcmVtb3ZhbHMuIFRvIGF2b2lkIHJlbW92aW5nIHRoZSBvcmlnaW5hbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBET00gbm9kZSBvdXQgb2YgdGhlIHRyZWUgKHNpbmNlIHRoYXQgY2FuIGJyZWFrIENTUyB0cmFuc2l0aW9ucywgZXRjLiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdlIHdpbGwgaW5zdGVhZCBkaXNjYXJkIHRoZSBjdXJyZW50IG5vZGUgYW5kIHdhaXQgdW50aWwgdGhlIG5leHRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXRlcmF0aW9uIHRvIHByb3Blcmx5IG1hdGNoIHVwIHRoZSBrZXllZCB0YXJnZXQgZWxlbWVudCB3aXRoIGl0cyBtYXRjaGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBlbGVtZW50IGluIHRoZSBvcmlnaW5hbCB0cmVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGF0aWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlIGZvdW5kIGEgbWF0Y2hpbmcga2V5ZWQgZWxlbWVudCBzb21ld2hlcmUgaW4gdGhlIG9yaWdpbmFsIERPTSB0cmVlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBMZXQncyBtb3ZpbmcgdGhlIG9yaWdpbmFsIERPTSBub2RlIGludG8gdGhlIGN1cnJlbnQgcG9zaXRpb24gYW5kIG1vcnBoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGl0LlxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5PVEU6IFdlIHVzZSBpbnNlcnRCZWZvcmUgaW5zdGVhZCBvZiByZXBsYWNlQ2hpbGQgYmVjYXVzZSB3ZSB3YW50IHRvIGdvIHRocm91Z2hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGByZW1vdmVOb2RlKClgIGZ1bmN0aW9uIGZvciB0aGUgbm9kZSB0aGF0IGlzIGJlaW5nIGRpc2NhcmRlZCBzbyB0aGF0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFsbCBsaWZlY3ljbGUgaG9va3MgYXJlIGNvcnJlY3RseSBpbnZva2VkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb21FbC5pbnNlcnRCZWZvcmUobWF0Y2hpbmdGcm9tRWwsIGN1ckZyb21Ob2RlQ2hpbGQpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJGcm9tTm9kZUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2luY2UgdGhlIG5vZGUgaXMga2V5ZWQgaXQgbWlnaHQgYmUgbWF0Y2hlZCB1cCBsYXRlciBzbyB3ZSBkZWZlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGFjdHVhbCByZW1vdmFsIHRvIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRLZXllZFJlbW92YWwoY3VyRnJvbU5vZGVLZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTk9URTogd2Ugc2tpcCBuZXN0ZWQga2V5ZWQgbm9kZXMgZnJvbSBiZWluZyByZW1vdmVkIHNpbmNlIHRoZXJlIGlzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICBzdGlsbCBhIGNoYW5jZSB0aGV5IHdpbGwgYmUgbWF0Y2hlZCB1cCBsYXRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTm9kZShjdXJGcm9tTm9kZUNoaWxkLCBmcm9tRWwsIHRydWUgLyogc2tpcCBrZXllZCBub2RlcyAqLyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tTmV4dFNpYmxpbmcgPSBjdXJGcm9tTm9kZUNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gbWF0Y2hpbmdGcm9tRWw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgbm9kZXMgYXJlIG5vdCBjb21wYXRpYmxlIHNpbmNlIHRoZSBcInRvXCIgbm9kZSBoYXMgYSBrZXkgYW5kIHRoZXJlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXMgbm8gbWF0Y2hpbmcga2V5ZWQgbm9kZSBpbiB0aGUgc291cmNlIHRyZWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBhdGlibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VyRnJvbU5vZGVLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIG9yaWdpbmFsIGhhcyBhIGtleVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBhdGlibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBhdGlibGUgPSBpc0NvbXBhdGlibGUgIT09IGZhbHNlICYmIGNvbXBhcmVOb2RlTmFtZXMoY3VyRnJvbU5vZGVDaGlsZCwgY3VyVG9Ob2RlQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0NvbXBhdGlibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgZm91bmQgY29tcGF0aWJsZSBET00gZWxlbWVudHMgc28gdHJhbnNmb3JtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoZSBjdXJyZW50IFwiZnJvbVwiIG5vZGUgdG8gbWF0Y2ggdGhlIGN1cnJlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGFyZ2V0IERPTSBub2RlLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3JwaEVsKGN1ckZyb21Ob2RlQ2hpbGQsIGN1clRvTm9kZUNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VyRnJvbU5vZGVUeXBlID09PSBURVhUX05PREUgfHwgY3VyRnJvbU5vZGVUeXBlID09IENPTU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJvdGggbm9kZXMgYmVpbmcgY29tcGFyZWQgYXJlIFRleHQgb3IgQ29tbWVudCBub2Rlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGF0aWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2ltcGx5IHVwZGF0ZSBub2RlVmFsdWUgb24gdGhlIG9yaWdpbmFsIG5vZGUgdG9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjaGFuZ2UgdGhlIHRleHQgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkLm5vZGVWYWx1ZSA9IGN1clRvTm9kZUNoaWxkLm5vZGVWYWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0NvbXBhdGlibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFkdmFuY2UgYm90aCB0aGUgXCJ0b1wiIGNoaWxkIGFuZCB0aGUgXCJmcm9tXCIgY2hpbGQgc2luY2Ugd2UgZm91bmQgYSBtYXRjaFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VyVG9Ob2RlQ2hpbGQgPSB0b05leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIG91dGVyO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gTm8gY29tcGF0aWJsZSBtYXRjaCBzbyByZW1vdmUgdGhlIG9sZCBub2RlIGZyb20gdGhlIERPTSBhbmQgY29udGludWUgdHJ5aW5nIHRvIGZpbmQgYVxuICAgICAgICAgICAgICAgICAgICAvLyBtYXRjaCBpbiB0aGUgb3JpZ2luYWwgRE9NLiBIb3dldmVyLCB3ZSBvbmx5IGRvIHRoaXMgaWYgdGhlIGZyb20gbm9kZSBpcyBub3Qga2V5ZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gc2luY2UgaXQgaXMgcG9zc2libGUgdGhhdCBhIGtleWVkIG5vZGUgbWlnaHQgbWF0Y2ggdXAgd2l0aCBhIG5vZGUgc29tZXdoZXJlIGVsc2UgaW4gdGhlXG4gICAgICAgICAgICAgICAgICAgIC8vIHRhcmdldCB0cmVlIGFuZCB3ZSBkb24ndCB3YW50IHRvIGRpc2NhcmQgaXQganVzdCB5ZXQgc2luY2UgaXQgc3RpbGwgbWlnaHQgZmluZCBhXG4gICAgICAgICAgICAgICAgICAgIC8vIGhvbWUgaW4gdGhlIGZpbmFsIERPTSB0cmVlLiBBZnRlciBldmVyeXRoaW5nIGlzIGRvbmUgd2Ugd2lsbCByZW1vdmUgYW55IGtleWVkIG5vZGVzXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoYXQgZGlkbid0IGZpbmQgYSBob21lXG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJGcm9tTm9kZUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2luY2UgdGhlIG5vZGUgaXMga2V5ZWQgaXQgbWlnaHQgYmUgbWF0Y2hlZCB1cCBsYXRlciBzbyB3ZSBkZWZlclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGFjdHVhbCByZW1vdmFsIHRvIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgICAgICBhZGRLZXllZFJlbW92YWwoY3VyRnJvbU5vZGVLZXkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTk9URTogd2Ugc2tpcCBuZXN0ZWQga2V5ZWQgbm9kZXMgZnJvbSBiZWluZyByZW1vdmVkIHNpbmNlIHRoZXJlIGlzXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgICBzdGlsbCBhIGNoYW5jZSB0aGV5IHdpbGwgYmUgbWF0Y2hlZCB1cCBsYXRlclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTm9kZShjdXJGcm9tTm9kZUNoaWxkLCBmcm9tRWwsIHRydWUgLyogc2tpcCBrZXllZCBub2RlcyAqLyk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIElmIHdlIGdvdCB0aGlzIGZhciB0aGVuIHdlIGRpZCBub3QgZmluZCBhIGNhbmRpZGF0ZSBtYXRjaCBmb3JcbiAgICAgICAgICAgICAgICAvLyBvdXIgXCJ0byBub2RlXCIgYW5kIHdlIGV4aGF1c3RlZCBhbGwgb2YgdGhlIGNoaWxkcmVuIFwiZnJvbVwiXG4gICAgICAgICAgICAgICAgLy8gbm9kZXMuIFRoZXJlZm9yZSwgd2Ugd2lsbCBqdXN0IGFwcGVuZCB0aGUgY3VycmVudCBcInRvXCIgbm9kZVxuICAgICAgICAgICAgICAgIC8vIHRvIHRoZSBlbmRcbiAgICAgICAgICAgICAgICBpZiAoY3VyVG9Ob2RlS2V5ICYmIChtYXRjaGluZ0Zyb21FbCA9IGZyb21Ob2Rlc0xvb2t1cFtjdXJUb05vZGVLZXldKSAmJiBjb21wYXJlTm9kZU5hbWVzKG1hdGNoaW5nRnJvbUVsLCBjdXJUb05vZGVDaGlsZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbUVsLmFwcGVuZENoaWxkKG1hdGNoaW5nRnJvbUVsKTtcbiAgICAgICAgICAgICAgICAgICAgbW9ycGhFbChtYXRjaGluZ0Zyb21FbCwgY3VyVG9Ob2RlQ2hpbGQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvbkJlZm9yZU5vZGVBZGRlZFJlc3VsdCA9IG9uQmVmb3JlTm9kZUFkZGVkKGN1clRvTm9kZUNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9uQmVmb3JlTm9kZUFkZGVkUmVzdWx0ICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uQmVmb3JlTm9kZUFkZGVkUmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyVG9Ob2RlQ2hpbGQgPSBvbkJlZm9yZU5vZGVBZGRlZFJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1clRvTm9kZUNoaWxkLmFjdHVhbGl6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1clRvTm9kZUNoaWxkID0gY3VyVG9Ob2RlQ2hpbGQuYWN0dWFsaXplKGZyb21FbC5vd25lckRvY3VtZW50IHx8IGRvYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmcm9tRWwuYXBwZW5kQ2hpbGQoY3VyVG9Ob2RlQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlTm9kZUFkZGVkKGN1clRvTm9kZUNoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGN1clRvTm9kZUNoaWxkID0gdG9OZXh0U2libGluZztcbiAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBXZSBoYXZlIHByb2Nlc3NlZCBhbGwgb2YgdGhlIFwidG8gbm9kZXNcIi4gSWYgY3VyRnJvbU5vZGVDaGlsZCBpc1xuICAgICAgICAgICAgLy8gbm9uLW51bGwgdGhlbiB3ZSBzdGlsbCBoYXZlIHNvbWUgZnJvbSBub2RlcyBsZWZ0IG92ZXIgdGhhdCBuZWVkXG4gICAgICAgICAgICAvLyB0byBiZSByZW1vdmVkXG4gICAgICAgICAgICB3aGlsZSAoY3VyRnJvbU5vZGVDaGlsZCkge1xuICAgICAgICAgICAgICAgIGZyb21OZXh0U2libGluZyA9IGN1ckZyb21Ob2RlQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgaWYgKChjdXJGcm9tTm9kZUtleSA9IGdldE5vZGVLZXkoY3VyRnJvbU5vZGVDaGlsZCkpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNpbmNlIHRoZSBub2RlIGlzIGtleWVkIGl0IG1pZ2h0IGJlIG1hdGNoZWQgdXAgbGF0ZXIgc28gd2UgZGVmZXJcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGFjdHVhbCByZW1vdmFsIHRvIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgIGFkZEtleWVkUmVtb3ZhbChjdXJGcm9tTm9kZUtleSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTk9URTogd2Ugc2tpcCBuZXN0ZWQga2V5ZWQgbm9kZXMgZnJvbSBiZWluZyByZW1vdmVkIHNpbmNlIHRoZXJlIGlzXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgIHN0aWxsIGEgY2hhbmNlIHRoZXkgd2lsbCBiZSBtYXRjaGVkIHVwIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZU5vZGUoY3VyRnJvbU5vZGVDaGlsZCwgZnJvbUVsLCB0cnVlIC8qIHNraXAga2V5ZWQgbm9kZXMgKi8pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNwZWNpYWxFbEhhbmRsZXIgPSBzcGVjaWFsRWxIYW5kbGVyc1tmcm9tRWwubm9kZU5hbWVdO1xuICAgICAgICBpZiAoc3BlY2lhbEVsSGFuZGxlcikge1xuICAgICAgICAgICAgc3BlY2lhbEVsSGFuZGxlcihmcm9tRWwsIHRvRWwpO1xuICAgICAgICB9XG4gICAgfSAvLyBFTkQ6IG1vcnBoRWwoLi4uKVxuXG4gICAgdmFyIG1vcnBoZWROb2RlID0gZnJvbU5vZGU7XG4gICAgdmFyIG1vcnBoZWROb2RlVHlwZSA9IG1vcnBoZWROb2RlLm5vZGVUeXBlO1xuICAgIHZhciB0b05vZGVUeXBlID0gdG9Ob2RlLm5vZGVUeXBlO1xuXG4gICAgaWYgKCFjaGlsZHJlbk9ubHkpIHtcbiAgICAgICAgLy8gSGFuZGxlIHRoZSBjYXNlIHdoZXJlIHdlIGFyZSBnaXZlbiB0d28gRE9NIG5vZGVzIHRoYXQgYXJlIG5vdFxuICAgICAgICAvLyBjb21wYXRpYmxlIChlLmcuIDxkaXY+IC0tPiA8c3Bhbj4gb3IgPGRpdj4gLS0+IFRFWFQpXG4gICAgICAgIGlmIChtb3JwaGVkTm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgaWYgKHRvTm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgICAgIGlmICghY29tcGFyZU5vZGVOYW1lcyhmcm9tTm9kZSwgdG9Ob2RlKSkge1xuICAgICAgICAgICAgICAgICAgICBvbk5vZGVEaXNjYXJkZWQoZnJvbU5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBtb3JwaGVkTm9kZSA9IG1vdmVDaGlsZHJlbihmcm9tTm9kZSwgY3JlYXRlRWxlbWVudE5TKHRvTm9kZS5ub2RlTmFtZSwgdG9Ob2RlLm5hbWVzcGFjZVVSSSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gR29pbmcgZnJvbSBhbiBlbGVtZW50IG5vZGUgdG8gYSB0ZXh0IG5vZGVcbiAgICAgICAgICAgICAgICBtb3JwaGVkTm9kZSA9IHRvTm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChtb3JwaGVkTm9kZVR5cGUgPT09IFRFWFRfTk9ERSB8fCBtb3JwaGVkTm9kZVR5cGUgPT09IENPTU1FTlRfTk9ERSkgeyAvLyBUZXh0IG9yIGNvbW1lbnQgbm9kZVxuICAgICAgICAgICAgaWYgKHRvTm9kZVR5cGUgPT09IG1vcnBoZWROb2RlVHlwZSkge1xuICAgICAgICAgICAgICAgIG1vcnBoZWROb2RlLm5vZGVWYWx1ZSA9IHRvTm9kZS5ub2RlVmFsdWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vcnBoZWROb2RlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBUZXh0IG5vZGUgdG8gc29tZXRoaW5nIGVsc2VcbiAgICAgICAgICAgICAgICBtb3JwaGVkTm9kZSA9IHRvTm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChtb3JwaGVkTm9kZSA9PT0gdG9Ob2RlKSB7XG4gICAgICAgIC8vIFRoZSBcInRvIG5vZGVcIiB3YXMgbm90IGNvbXBhdGlibGUgd2l0aCB0aGUgXCJmcm9tIG5vZGVcIiBzbyB3ZSBoYWQgdG9cbiAgICAgICAgLy8gdG9zcyBvdXQgdGhlIFwiZnJvbSBub2RlXCIgYW5kIHVzZSB0aGUgXCJ0byBub2RlXCJcbiAgICAgICAgb25Ob2RlRGlzY2FyZGVkKGZyb21Ob2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBtb3JwaEVsKG1vcnBoZWROb2RlLCB0b05vZGUsIGNoaWxkcmVuT25seSk7XG5cbiAgICAgICAgLy8gV2Ugbm93IG5lZWQgdG8gbG9vcCBvdmVyIGFueSBrZXllZCBub2RlcyB0aGF0IG1pZ2h0IG5lZWQgdG8gYmVcbiAgICAgICAgLy8gcmVtb3ZlZC4gV2Ugb25seSBkbyB0aGUgcmVtb3ZhbCBpZiB3ZSBrbm93IHRoYXQgdGhlIGtleWVkIG5vZGVcbiAgICAgICAgLy8gbmV2ZXIgZm91bmQgYSBtYXRjaC4gV2hlbiBhIGtleWVkIG5vZGUgaXMgbWF0Y2hlZCB1cCB3ZSByZW1vdmVcbiAgICAgICAgLy8gaXQgb3V0IG9mIGZyb21Ob2Rlc0xvb2t1cCBhbmQgd2UgdXNlIGZyb21Ob2Rlc0xvb2t1cCB0byBkZXRlcm1pbmVcbiAgICAgICAgLy8gaWYgYSBrZXllZCBub2RlIGhhcyBiZWVuIG1hdGNoZWQgdXAgb3Igbm90XG4gICAgICAgIGlmIChrZXllZFJlbW92YWxMaXN0KSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpPTAsIGxlbj1rZXllZFJlbW92YWxMaXN0Lmxlbmd0aDsgaTxsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBlbFRvUmVtb3ZlID0gZnJvbU5vZGVzTG9va3VwW2tleWVkUmVtb3ZhbExpc3RbaV1dO1xuICAgICAgICAgICAgICAgIGlmIChlbFRvUmVtb3ZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZU5vZGUoZWxUb1JlbW92ZSwgZWxUb1JlbW92ZS5wYXJlbnROb2RlLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFjaGlsZHJlbk9ubHkgJiYgbW9ycGhlZE5vZGUgIT09IGZyb21Ob2RlICYmIGZyb21Ob2RlLnBhcmVudE5vZGUpIHtcbiAgICAgICAgaWYgKG1vcnBoZWROb2RlLmFjdHVhbGl6ZSkge1xuICAgICAgICAgICAgbW9ycGhlZE5vZGUgPSBtb3JwaGVkTm9kZS5hY3R1YWxpemUoZnJvbU5vZGUub3duZXJEb2N1bWVudCB8fCBkb2MpO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHdlIGhhZCB0byBzd2FwIG91dCB0aGUgZnJvbSBub2RlIHdpdGggYSBuZXcgbm9kZSBiZWNhdXNlIHRoZSBvbGRcbiAgICAgICAgLy8gbm9kZSB3YXMgbm90IGNvbXBhdGlibGUgd2l0aCB0aGUgdGFyZ2V0IG5vZGUgdGhlbiB3ZSBuZWVkIHRvXG4gICAgICAgIC8vIHJlcGxhY2UgdGhlIG9sZCBET00gbm9kZSBpbiB0aGUgb3JpZ2luYWwgRE9NIHRyZWUuIFRoaXMgaXMgb25seVxuICAgICAgICAvLyBwb3NzaWJsZSBpZiB0aGUgb3JpZ2luYWwgRE9NIG5vZGUgd2FzIHBhcnQgb2YgYSBET00gdHJlZSB3aGljaFxuICAgICAgICAvLyB3ZSBrbm93IGlzIHRoZSBjYXNlIGlmIGl0IGhhcyBhIHBhcmVudCBub2RlLlxuICAgICAgICBmcm9tTm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChtb3JwaGVkTm9kZSwgZnJvbU5vZGUpO1xuICAgIH1cblxuICAgIHJldHVybiBtb3JwaGVkTm9kZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtb3JwaGRvbTtcbiIsImNvbnN0IHdpbmRvdyA9IHJlcXVpcmUoJ2dsb2JhbC93aW5kb3cnKVxuY29uc3QgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0JylcblxubW9kdWxlLmV4cG9ydHMgPSBuYW5vcmFmXG5cbi8vIE9ubHkgY2FsbCBSQUYgd2hlbiBuZWVkZWRcbi8vIChmbiwgZm4/KSAtPiBmblxuZnVuY3Rpb24gbmFub3JhZiAocmVuZGVyLCByYWYpIHtcbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiByZW5kZXIsICdmdW5jdGlvbicsICduYW5vcmFmOiByZW5kZXIgc2hvdWxkIGJlIGEgZnVuY3Rpb24nKVxuICBhc3NlcnQub2sodHlwZW9mIHJhZiA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgcmFmID09PSAndW5kZWZpbmVkJywgJ25hbm9yYWY6IHJhZiBzaG91bGQgYmUgYSBmdW5jdGlvbiBvciB1bmRlZmluZWQnKVxuXG4gIGlmICghcmFmKSB7IHJhZiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfVxuXG4gIHZhciBpblJlbmRlcmluZ1RyYW5zYWN0aW9uID0gZmFsc2VcbiAgdmFyIHJlZHJhd1NjaGVkdWxlZCA9IGZhbHNlXG4gIHZhciBjdXJyZW50U3RhdGUgPSBudWxsXG5cbiAgLy8gcGFzcyBuZXcgc3RhdGUgdG8gYmUgcmVuZGVyZWRcbiAgLy8gKG9iaiwgb2JqPykgLT4gbnVsbFxuICByZXR1cm4gZnVuY3Rpb24gZnJhbWUgKHN0YXRlLCBwcmV2KSB7XG4gICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBzdGF0ZSwgJ29iamVjdCcsICduYW5vcmFmOiBzdGF0ZSBzaG91bGQgYmUgYW4gb2JqZWN0JylcbiAgICBhc3NlcnQuZXF1YWwodHlwZW9mIHByZXYsICdvYmplY3QnLCAnbmFub3JhZjogcHJldiBzaG91bGQgYmUgYW4gb2JqZWN0JylcbiAgICBhc3NlcnQuZXF1YWwoaW5SZW5kZXJpbmdUcmFuc2FjdGlvbiwgZmFsc2UsICduYW5vcmFmOiBpbmZpbml0ZSBsb29wIGRldGVjdGVkJylcblxuICAgIC8vIHJlcXVlc3QgYSByZWRyYXcgZm9yIG5leHQgZnJhbWVcbiAgICBpZiAoY3VycmVudFN0YXRlID09PSBudWxsICYmICFyZWRyYXdTY2hlZHVsZWQpIHtcbiAgICAgIHJlZHJhd1NjaGVkdWxlZCA9IHRydWVcblxuICAgICAgcmFmKGZ1bmN0aW9uIHJlZHJhdyAoKSB7XG4gICAgICAgIHJlZHJhd1NjaGVkdWxlZCA9IGZhbHNlXG4gICAgICAgIGlmICghY3VycmVudFN0YXRlKSByZXR1cm5cblxuICAgICAgICBpblJlbmRlcmluZ1RyYW5zYWN0aW9uID0gdHJ1ZVxuICAgICAgICByZW5kZXIoY3VycmVudFN0YXRlLCBwcmV2KVxuICAgICAgICBpblJlbmRlcmluZ1RyYW5zYWN0aW9uID0gZmFsc2VcblxuICAgICAgICBjdXJyZW50U3RhdGUgPSBudWxsXG4gICAgICB9KVxuICAgIH1cblxuICAgIC8vIHVwZGF0ZSBkYXRhIGZvciByZWRyYXdcbiAgICBjdXJyZW50U3RhdGUgPSBzdGF0ZVxuICB9XG59XG4iLCIvKiBnbG9iYWwgTXV0YXRpb25PYnNlcnZlciAqL1xudmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnZ2xvYmFsL2RvY3VtZW50JylcbnZhciB3aW5kb3cgPSByZXF1aXJlKCdnbG9iYWwvd2luZG93JylcbnZhciB3YXRjaCA9IE9iamVjdC5jcmVhdGUobnVsbClcbnZhciBLRVlfSUQgPSAnb25sb2FkaWQnICsgKG5ldyBEYXRlKCkgJSA5ZTYpLnRvU3RyaW5nKDM2KVxudmFyIEtFWV9BVFRSID0gJ2RhdGEtJyArIEtFWV9JRFxudmFyIElOREVYID0gMFxuXG5pZiAod2luZG93ICYmIHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyKSB7XG4gIHZhciBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICBpZiAoT2JqZWN0LmtleXMod2F0Y2gpLmxlbmd0aCA8IDEpIHJldHVyblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbXV0YXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobXV0YXRpb25zW2ldLmF0dHJpYnV0ZU5hbWUgPT09IEtFWV9BVFRSKSB7XG4gICAgICAgIGVhY2hBdHRyKG11dGF0aW9uc1tpXSwgdHVybm9uLCB0dXJub2ZmKVxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgZWFjaE11dGF0aW9uKG11dGF0aW9uc1tpXS5yZW1vdmVkTm9kZXMsIHR1cm5vZmYpXG4gICAgICBlYWNoTXV0YXRpb24obXV0YXRpb25zW2ldLmFkZGVkTm9kZXMsIHR1cm5vbilcbiAgICB9XG4gIH0pXG4gIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xuICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICBzdWJ0cmVlOiB0cnVlLFxuICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgYXR0cmlidXRlT2xkVmFsdWU6IHRydWUsXG4gICAgYXR0cmlidXRlRmlsdGVyOiBbS0VZX0FUVFJdXG4gIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gb25sb2FkIChlbCwgb24sIG9mZiwgY2FsbGVyKSB7XG4gIG9uID0gb24gfHwgZnVuY3Rpb24gKCkge31cbiAgb2ZmID0gb2ZmIHx8IGZ1bmN0aW9uICgpIHt9XG4gIGVsLnNldEF0dHJpYnV0ZShLRVlfQVRUUiwgJ28nICsgSU5ERVgpXG4gIHdhdGNoWydvJyArIElOREVYXSA9IFtvbiwgb2ZmLCAwLCBjYWxsZXIgfHwgb25sb2FkLmNhbGxlcl1cbiAgSU5ERVggKz0gMVxuICByZXR1cm4gZWxcbn1cblxuZnVuY3Rpb24gdHVybm9uIChpbmRleCwgZWwpIHtcbiAgaWYgKHdhdGNoW2luZGV4XVswXSAmJiB3YXRjaFtpbmRleF1bMl0gPT09IDApIHtcbiAgICB3YXRjaFtpbmRleF1bMF0oZWwpXG4gICAgd2F0Y2hbaW5kZXhdWzJdID0gMVxuICB9XG59XG5cbmZ1bmN0aW9uIHR1cm5vZmYgKGluZGV4LCBlbCkge1xuICBpZiAod2F0Y2hbaW5kZXhdWzFdICYmIHdhdGNoW2luZGV4XVsyXSA9PT0gMSkge1xuICAgIHdhdGNoW2luZGV4XVsxXShlbClcbiAgICB3YXRjaFtpbmRleF1bMl0gPSAwXG4gIH1cbn1cblxuZnVuY3Rpb24gZWFjaEF0dHIgKG11dGF0aW9uLCBvbiwgb2ZmKSB7XG4gIHZhciBuZXdWYWx1ZSA9IG11dGF0aW9uLnRhcmdldC5nZXRBdHRyaWJ1dGUoS0VZX0FUVFIpXG4gIGlmIChzYW1lT3JpZ2luKG11dGF0aW9uLm9sZFZhbHVlLCBuZXdWYWx1ZSkpIHtcbiAgICB3YXRjaFtuZXdWYWx1ZV0gPSB3YXRjaFttdXRhdGlvbi5vbGRWYWx1ZV1cbiAgICByZXR1cm5cbiAgfVxuICBpZiAod2F0Y2hbbXV0YXRpb24ub2xkVmFsdWVdKSB7XG4gICAgb2ZmKG11dGF0aW9uLm9sZFZhbHVlLCBtdXRhdGlvbi50YXJnZXQpXG4gIH1cbiAgaWYgKHdhdGNoW25ld1ZhbHVlXSkge1xuICAgIG9uKG5ld1ZhbHVlLCBtdXRhdGlvbi50YXJnZXQpXG4gIH1cbn1cblxuZnVuY3Rpb24gc2FtZU9yaWdpbiAob2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gIGlmICghb2xkVmFsdWUgfHwgIW5ld1ZhbHVlKSByZXR1cm4gZmFsc2VcbiAgcmV0dXJuIHdhdGNoW29sZFZhbHVlXVszXSA9PT0gd2F0Y2hbbmV3VmFsdWVdWzNdXG59XG5cbmZ1bmN0aW9uIGVhY2hNdXRhdGlvbiAobm9kZXMsIGZuKSB7XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMod2F0Y2gpXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAobm9kZXNbaV0gJiYgbm9kZXNbaV0uZ2V0QXR0cmlidXRlICYmIG5vZGVzW2ldLmdldEF0dHJpYnV0ZShLRVlfQVRUUikpIHtcbiAgICAgIHZhciBvbmxvYWRpZCA9IG5vZGVzW2ldLmdldEF0dHJpYnV0ZShLRVlfQVRUUilcbiAgICAgIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgICBpZiAob25sb2FkaWQgPT09IGspIHtcbiAgICAgICAgICBmbihrLCBub2Rlc1tpXSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgaWYgKG5vZGVzW2ldLmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgZWFjaE11dGF0aW9uKG5vZGVzW2ldLmNoaWxkTm9kZXMsIGZuKVxuICAgIH1cbiAgfVxufVxuIiwiLyohXG4gKiBwYWQtbGVmdCA8aHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvcGFkLWxlZnQ+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUsIEpvbiBTY2hsaW5rZXJ0LlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHJlcGVhdCA9IHJlcXVpcmUoJ3JlcGVhdC1zdHJpbmcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYWRMZWZ0KHN0ciwgbnVtLCBjaCkge1xuICBzdHIgPSBzdHIudG9TdHJpbmcoKTtcblxuICBpZiAodHlwZW9mIG51bSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbiAgaWYgKGNoID09PSAwKSB7XG4gICAgY2ggPSAnMCc7XG4gIH0gZWxzZSBpZiAoY2gpIHtcbiAgICBjaCA9IGNoLnRvU3RyaW5nKCk7XG4gIH0gZWxzZSB7XG4gICAgY2ggPSAnICc7XG4gIH1cblxuICByZXR1cm4gcmVwZWF0KGNoLCBudW0gLSBzdHIubGVuZ3RoKSArIHN0cjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciByZXBlYXQgPSByZXF1aXJlKCdyZXBlYXQtc3RyaW5nJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFkTGVmdCh2YWwsIG51bSwgc3RyKSB7XG4gIHZhciBwYWRkaW5nID0gJyc7XG4gIHZhciBkaWZmID0gbnVtIC0gdmFsLmxlbmd0aDtcblxuICAvLyBCcmVha3BvaW50cyBiYXNlZCBvbiBiZW5jaG1hcmtzIHRvIHVzZSB0aGUgZmFzdGVzdCBhcHByb2FjaFxuICAvLyBmb3IgdGhlIGdpdmVuIG51bWJlciBvZiB6ZXJvc1xuICBpZiAoZGlmZiA8PSA1ICYmICFzdHIpIHtcbiAgICBwYWRkaW5nID0gJzAwMDAwJztcbiAgfSBlbHNlIGlmIChkaWZmIDw9IDI1ICYmICFzdHIpIHtcbiAgICBwYWRkaW5nID0gJzAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHZhbCArIHJlcGVhdChzdHIgfHwgJzAnLCBkaWZmKTtcbiAgfVxuXG4gIHJldHVybiB2YWwgKyBwYWRkaW5nLnNsaWNlKDAsIGRpZmYpO1xufTtcbiIsInZhciB0cmltID0gcmVxdWlyZSgndHJpbScpXG4gICwgZm9yRWFjaCA9IHJlcXVpcmUoJ2Zvci1lYWNoJylcbiAgLCBpc0FycmF5ID0gZnVuY3Rpb24oYXJnKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChoZWFkZXJzKSB7XG4gIGlmICghaGVhZGVycylcbiAgICByZXR1cm4ge31cblxuICB2YXIgcmVzdWx0ID0ge31cblxuICBmb3JFYWNoKFxuICAgICAgdHJpbShoZWFkZXJzKS5zcGxpdCgnXFxuJylcbiAgICAsIGZ1bmN0aW9uIChyb3cpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gcm93LmluZGV4T2YoJzonKVxuICAgICAgICAgICwga2V5ID0gdHJpbShyb3cuc2xpY2UoMCwgaW5kZXgpKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgLCB2YWx1ZSA9IHRyaW0ocm93LnNsaWNlKGluZGV4ICsgMSkpXG5cbiAgICAgICAgaWYgKHR5cGVvZihyZXN1bHRba2V5XSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgcmVzdWx0W2tleV0gPSB2YWx1ZVxuICAgICAgICB9IGVsc2UgaWYgKGlzQXJyYXkocmVzdWx0W2tleV0pKSB7XG4gICAgICAgICAgcmVzdWx0W2tleV0ucHVzaCh2YWx1ZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHRba2V5XSA9IFsgcmVzdWx0W2tleV0sIHZhbHVlIF1cbiAgICAgICAgfVxuICAgICAgfVxuICApXG5cbiAgcmV0dXJuIHJlc3VsdFxufSIsImNvbnN0IGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpXG5cbm1vZHVsZS5leHBvcnRzID0gbWF0Y2hcblxuLy8gZ2V0IHVybCBwYXRoIHNlY3Rpb24gZnJvbSBhIHVybFxuLy8gc3RyaXAgcXVlcnlzdHJpbmdzIC8gaGFzaGVzXG4vLyBzdHJpcCBwcm90b2NvbFxuLy8gc3RyaXAgaG9zdG5hbWUgYW5kIHBvcnQgKGJvdGggaXAgYW5kIHJvdXRlKVxuLy8gc3RyIC0+IHN0clxuZnVuY3Rpb24gbWF0Y2ggKHJvdXRlKSB7XG4gIGFzc2VydC5lcXVhbCh0eXBlb2Ygcm91dGUsICdzdHJpbmcnKVxuXG4gIHJldHVybiByb3V0ZS50cmltKClcbiAgICAucmVwbGFjZSgvW1xcP3wjXS4qJC8sICcnKVxuICAgIC5yZXBsYWNlKC9eKD86aHR0cHM/XFw6KVxcL1xcLy8sICcnKVxuICAgIC5yZXBsYWNlKC9eLio/KFxcLy4qKS8sICckMScpXG4gICAgLnJlcGxhY2UoL1xcLyQvLCAnJylcbn1cbiIsIi8qIVxuICogcmVwZWF0LXN0cmluZyA8aHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvcmVwZWF0LXN0cmluZz5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSwgSm9uIFNjaGxpbmtlcnQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFJlc3VsdHMgY2FjaGVcbiAqL1xuXG52YXIgcmVzID0gJyc7XG52YXIgY2FjaGU7XG5cbi8qKlxuICogRXhwb3NlIGByZXBlYXRgXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSByZXBlYXQ7XG5cbi8qKlxuICogUmVwZWF0IHRoZSBnaXZlbiBgc3RyaW5nYCB0aGUgc3BlY2lmaWVkIGBudW1iZXJgXG4gKiBvZiB0aW1lcy5cbiAqXG4gKiAqKkV4YW1wbGU6KipcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlcGVhdCA9IHJlcXVpcmUoJ3JlcGVhdC1zdHJpbmcnKTtcbiAqIHJlcGVhdCgnQScsIDUpO1xuICogLy89PiBBQUFBQVxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGBzdHJpbmdgIFRoZSBzdHJpbmcgdG8gcmVwZWF0XG4gKiBAcGFyYW0ge051bWJlcn0gYG51bWJlcmAgVGhlIG51bWJlciBvZiB0aW1lcyB0byByZXBlYXQgdGhlIHN0cmluZ1xuICogQHJldHVybiB7U3RyaW5nfSBSZXBlYXRlZCBzdHJpbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gcmVwZWF0KHN0ciwgbnVtKSB7XG4gIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ3JlcGVhdC1zdHJpbmcgZXhwZWN0cyBhIHN0cmluZy4nKTtcbiAgfVxuXG4gIC8vIGNvdmVyIGNvbW1vbiwgcXVpY2sgdXNlIGNhc2VzXG4gIGlmIChudW0gPT09IDEpIHJldHVybiBzdHI7XG4gIGlmIChudW0gPT09IDIpIHJldHVybiBzdHIgKyBzdHI7XG5cbiAgdmFyIG1heCA9IHN0ci5sZW5ndGggKiBudW07XG4gIGlmIChjYWNoZSAhPT0gc3RyIHx8IHR5cGVvZiBjYWNoZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjYWNoZSA9IHN0cjtcbiAgICByZXMgPSAnJztcbiAgfVxuXG4gIHdoaWxlIChtYXggPiByZXMubGVuZ3RoICYmIG51bSA+IDApIHtcbiAgICBpZiAobnVtICYgMSkge1xuICAgICAgcmVzICs9IHN0cjtcbiAgICB9XG5cbiAgICBudW0gPj49IDE7XG4gICAgaWYgKCFudW0pIGJyZWFrO1xuICAgIHN0ciArPSBzdHI7XG4gIH1cblxuICByZXR1cm4gcmVzLnN1YnN0cigwLCBtYXgpO1xufVxuXG4iLCJjb25zdCB3aW5kb3cgPSByZXF1aXJlKCdnbG9iYWwvd2luZG93JylcbmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpXG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaFxuXG4vLyBsaXN0ZW4gdG8gd2luZG93IGhhc2hjaGFuZ2UgZXZlbnRzXG4vLyBhbmQgdXBkYXRlIHJvdXRlciBhY2NvcmRpbmdseVxuLy8gZm4oY2IpIC0+IG51bGxcbmZ1bmN0aW9uIGhhc2ggKGNiKSB7XG4gIGFzc2VydC5lcXVhbCh0eXBlb2YgY2IsICdmdW5jdGlvbicsICdjYiBtdXN0IGJlIGEgZnVuY3Rpb24nKVxuICB3aW5kb3cub25oYXNoY2hhbmdlID0gZnVuY3Rpb24gKGUpIHtcbiAgICBjYih3aW5kb3cubG9jYXRpb24uaGFzaClcbiAgfVxufVxuIiwiY29uc3QgZG9jdW1lbnQgPSByZXF1aXJlKCdnbG9iYWwvZG9jdW1lbnQnKVxuY29uc3Qgd2luZG93ID0gcmVxdWlyZSgnZ2xvYmFsL3dpbmRvdycpXG5jb25zdCBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhpc3RvcnlcblxuLy8gbGlzdGVuIHRvIGh0bWw1IHB1c2hzdGF0ZSBldmVudHNcbi8vIGFuZCB1cGRhdGUgcm91dGVyIGFjY29yZGluZ2x5XG4vLyBmbihzdHIpIC0+IG51bGxcbmZ1bmN0aW9uIGhpc3RvcnkgKGNiKSB7XG4gIGFzc2VydC5lcXVhbCh0eXBlb2YgY2IsICdmdW5jdGlvbicsICdjYiBtdXN0IGJlIGEgZnVuY3Rpb24nKVxuICB3aW5kb3cub25wb3BzdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBjYihkb2N1bWVudC5sb2NhdGlvbi5ocmVmKVxuICB9XG59XG4iLCJjb25zdCB3aW5kb3cgPSByZXF1aXJlKCdnbG9iYWwvd2luZG93JylcbmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpXG5cbm1vZHVsZS5leHBvcnRzID0gaHJlZlxuXG4vLyBoYW5kbGUgYSBjbGljayBpZiBpcyBhbmNob3IgdGFnIHdpdGggYW4gaHJlZlxuLy8gYW5kIHVybCBsaXZlcyBvbiB0aGUgc2FtZSBkb21haW4uIFJlcGxhY2VzXG4vLyB0cmFpbGluZyAnIycgc28gZW1wdHkgbGlua3Mgd29yayBhcyBleHBlY3RlZC5cbi8vIGZuKHN0cikgLT4gbnVsbFxuZnVuY3Rpb24gaHJlZiAoY2IpIHtcbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBjYiwgJ2Z1bmN0aW9uJywgJ2NiIG11c3QgYmUgYSBmdW5jdGlvbicpXG5cbiAgd2luZG93Lm9uY2xpY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgIGNvbnN0IG5vZGUgPSAoZnVuY3Rpb24gdHJhdmVyc2UgKG5vZGUpIHtcbiAgICAgIGlmICghbm9kZSkgcmV0dXJuXG4gICAgICBpZiAobm9kZS5sb2NhbE5hbWUgIT09ICdhJykgcmV0dXJuIHRyYXZlcnNlKG5vZGUucGFyZW50Tm9kZSlcbiAgICAgIGlmIChub2RlLmhyZWYgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRyYXZlcnNlKG5vZGUucGFyZW50Tm9kZSlcbiAgICAgIGlmICh3aW5kb3cubG9jYXRpb24uaG9zdCAhPT0gbm9kZS5ob3N0KSByZXR1cm4gdHJhdmVyc2Uobm9kZS5wYXJlbnROb2RlKVxuICAgICAgcmV0dXJuIG5vZGVcbiAgICB9KShlLnRhcmdldClcblxuICAgIGlmICghbm9kZSkgcmV0dXJuXG5cbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBjb25zdCBocmVmID0gbm9kZS5ocmVmLnJlcGxhY2UoLyMkLywgJycpXG4gICAgY2IoaHJlZilcbiAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe30sIG51bGwsIGhyZWYpXG4gIH1cbn1cbiIsImNvbnN0IHBhdGhuYW1lID0gcmVxdWlyZSgncGF0aG5hbWUtbWF0Y2gnKVxuY29uc3Qgd2F5ZmFyZXIgPSByZXF1aXJlKCd3YXlmYXJlcicpXG5jb25zdCBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNoZWV0Um91dGVyXG5cbi8vIEZhc3QsIG1vZHVsYXIgY2xpZW50IHJvdXRlclxuLy8gZm4oc3RyLCBhbnlbLi5dLCBmbj8pIC0+IGZuKHN0ciwgYW55Wy4uXSlcbmZ1bmN0aW9uIHNoZWV0Um91dGVyIChkZnQsIGNyZWF0ZVRyZWUsIGNyZWF0ZVJvdXRlKSB7XG4gIGNyZWF0ZVJvdXRlID0gKGNyZWF0ZVJvdXRlID8gY3JlYXRlUm91dGUoX2NyZWF0ZVJvdXRlKSA6IF9jcmVhdGVSb3V0ZSlcblxuICBpZiAoIWNyZWF0ZVRyZWUpIHtcbiAgICBjcmVhdGVUcmVlID0gZGZ0XG4gICAgZGZ0ID0gJydcbiAgfVxuXG4gIGFzc2VydC5lcXVhbCh0eXBlb2YgZGZ0LCAnc3RyaW5nJywgJ3NoZWV0LXJvdXRlcjogZGZ0IG11c3QgYmUgYSBzdHJpbmcnKVxuICBhc3NlcnQuZXF1YWwodHlwZW9mIGNyZWF0ZVRyZWUsICdmdW5jdGlvbicsICdzaGVldC1yb3V0ZXI6IGNyZWF0ZVRyZWUgbXVzdCBiZSBhIGZ1bmN0aW9uJylcbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBjcmVhdGVSb3V0ZSwgJ2Z1bmN0aW9uJywgJ3NoZWV0LXJvdXRlcjogY3JlYXRlUm91dGUgbXVzdCBiZSBhIGZ1bmN0aW9uJylcblxuICBjb25zdCByb3V0ZXIgPSB3YXlmYXJlcihkZnQpXG4gIGNvbnN0IHRyZWUgPSBjcmVhdGVUcmVlKGNyZWF0ZVJvdXRlKVxuXG4gIC8vIHJlZ2lzdGVyIHRyZWUgaW4gcm91dGVyXG4gIDsoZnVuY3Rpb24gd2FsayAodHJlZSwgcm91dGUpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0cmVlWzBdKSkge1xuICAgICAgLy8gd2FsayBvdmVyIGFsbCByb3V0ZXMgYXQgdGhlIHJvb3Qgb2YgdGhlIHRyZWVcbiAgICAgIHRyZWUuZm9yRWFjaChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICB3YWxrKG5vZGUsIHJvdXRlKVxuICAgICAgfSlcbiAgICB9IGVsc2UgaWYgKHRyZWVbMV0pIHtcbiAgICAgIC8vIGhhbmRsZSBpbmxpbmUgZnVuY3Rpb25zIGFzIGFyZ3NcbiAgICAgIGNvbnN0IGlubmVyUm91dGUgPSB0cmVlWzBdXG4gICAgICAgID8gcm91dGUuY29uY2F0KHRyZWVbMF0pLmpvaW4oJy8nKVxuICAgICAgICA6IHJvdXRlLmxlbmd0aCA/IHJvdXRlLmpvaW4oJy8nKSA6IHRyZWVbMF1cbiAgICAgIHJvdXRlci5vbihpbm5lclJvdXRlLCB0cmVlWzFdKVxuICAgICAgd2Fsayh0cmVlWzJdLCByb3V0ZS5jb25jYXQodHJlZVswXSkpXG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHRyZWVbMl0pKSB7XG4gICAgICAvLyB0cmF2ZXJzZSBhbmQgYXBwZW5kIHJvdXRlXG4gICAgICB3YWxrKHRyZWVbMl0sIHJvdXRlLmNvbmNhdCh0cmVlWzBdKSlcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gcmVnaXN0ZXIgcGF0aCBpbiByb3V0ZXJcbiAgICAgIGNvbnN0IG53Um91dGUgPSB0cmVlWzBdXG4gICAgICAgID8gcm91dGUuY29uY2F0KHRyZWVbMF0pLmpvaW4oJy8nKVxuICAgICAgICA6IHJvdXRlLmxlbmd0aCA/IHJvdXRlLmpvaW4oJy8nKSA6IHRyZWVbMF1cbiAgICAgIHJvdXRlci5vbihud1JvdXRlLCB0cmVlWzJdKVxuICAgIH1cbiAgfSkodHJlZSwgW10pXG5cbiAgLy8gbWF0Y2ggYSByb3V0ZSBvbiB0aGUgcm91dGVyXG4gIHJldHVybiBmdW5jdGlvbiBtYXRjaCAocm91dGUpIHtcbiAgICBhc3NlcnQuZXF1YWwodHlwZW9mIHJvdXRlLCAnc3RyaW5nJywgJ3JvdXRlIG11c3QgYmUgYSBzdHJpbmcnKVxuICAgIGNvbnN0IGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cylcbiAgICBhcmdzWzBdID0gcGF0aG5hbWUoYXJnc1swXSlcbiAgICByZXR1cm4gcm91dGVyLmFwcGx5KG51bGwsIGFyZ3MpXG4gIH1cbn1cblxuLy8gcmVnaXN0ZXIgcmVndWxhciByb3V0ZVxuZnVuY3Rpb24gX2NyZWF0ZVJvdXRlIChyb3V0ZSwgaW5saW5lLCBjaGlsZCkge1xuICBpZiAoIWNoaWxkKSB7XG4gICAgY2hpbGQgPSBpbmxpbmVcbiAgICBpbmxpbmUgPSBudWxsXG4gIH1cbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiByb3V0ZSwgJ3N0cmluZycsICdyb3V0ZSBtdXN0IGJlIGEgc3RyaW5nJylcbiAgYXNzZXJ0Lm9rKGNoaWxkLCAnY2hpbGQgZXhpc3RzJylcbiAgcm91dGUgPSByb3V0ZS5yZXBsYWNlKC9eXFwvLywgJycpXG4gIHJldHVybiBbIHJvdXRlLCBpbmxpbmUsIGNoaWxkIF1cbn1cbiIsIlwidXNlIHN0cmljdFwiXG4vLyBNb2R1bGUgZXhwb3J0IHBhdHRlcm4gZnJvbVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3VtZGpzL3VtZC9ibG9iL21hc3Rlci9yZXR1cm5FeHBvcnRzLmpzXG47KGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgICAgIGRlZmluZShbXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gTm9kZS4gRG9lcyBub3Qgd29yayB3aXRoIHN0cmljdCBDb21tb25KUywgYnV0XG4gICAgICAgIC8vIG9ubHkgQ29tbW9uSlMtbGlrZSBlbnZpcm9ubWVudHMgdGhhdCBzdXBwb3J0IG1vZHVsZS5leHBvcnRzLFxuICAgICAgICAvLyBsaWtlIE5vZGUuXG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEJyb3dzZXIgZ2xvYmFscyAocm9vdCBpcyB3aW5kb3cpXG4gICAgICAgIHJvb3Quc3RvcmUgPSBmYWN0b3J5KCk7XG4gIH1cbn0odGhpcywgZnVuY3Rpb24gKCkge1xuXHRcblx0Ly8gU3RvcmUuanNcblx0dmFyIHN0b3JlID0ge30sXG5cdFx0d2luID0gKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWwpLFxuXHRcdGRvYyA9IHdpbi5kb2N1bWVudCxcblx0XHRsb2NhbFN0b3JhZ2VOYW1lID0gJ2xvY2FsU3RvcmFnZScsXG5cdFx0c2NyaXB0VGFnID0gJ3NjcmlwdCcsXG5cdFx0c3RvcmFnZVxuXG5cdHN0b3JlLmRpc2FibGVkID0gZmFsc2Vcblx0c3RvcmUudmVyc2lvbiA9ICcxLjMuMjAnXG5cdHN0b3JlLnNldCA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHt9XG5cdHN0b3JlLmdldCA9IGZ1bmN0aW9uKGtleSwgZGVmYXVsdFZhbCkge31cblx0c3RvcmUuaGFzID0gZnVuY3Rpb24oa2V5KSB7IHJldHVybiBzdG9yZS5nZXQoa2V5KSAhPT0gdW5kZWZpbmVkIH1cblx0c3RvcmUucmVtb3ZlID0gZnVuY3Rpb24oa2V5KSB7fVxuXHRzdG9yZS5jbGVhciA9IGZ1bmN0aW9uKCkge31cblx0c3RvcmUudHJhbnNhY3QgPSBmdW5jdGlvbihrZXksIGRlZmF1bHRWYWwsIHRyYW5zYWN0aW9uRm4pIHtcblx0XHRpZiAodHJhbnNhY3Rpb25GbiA9PSBudWxsKSB7XG5cdFx0XHR0cmFuc2FjdGlvbkZuID0gZGVmYXVsdFZhbFxuXHRcdFx0ZGVmYXVsdFZhbCA9IG51bGxcblx0XHR9XG5cdFx0aWYgKGRlZmF1bHRWYWwgPT0gbnVsbCkge1xuXHRcdFx0ZGVmYXVsdFZhbCA9IHt9XG5cdFx0fVxuXHRcdHZhciB2YWwgPSBzdG9yZS5nZXQoa2V5LCBkZWZhdWx0VmFsKVxuXHRcdHRyYW5zYWN0aW9uRm4odmFsKVxuXHRcdHN0b3JlLnNldChrZXksIHZhbClcblx0fVxuXHRzdG9yZS5nZXRBbGwgPSBmdW5jdGlvbigpIHt9XG5cdHN0b3JlLmZvckVhY2ggPSBmdW5jdGlvbigpIHt9XG5cblx0c3RvcmUuc2VyaWFsaXplID0gZnVuY3Rpb24odmFsdWUpIHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkodmFsdWUpXG5cdH1cblx0c3RvcmUuZGVzZXJpYWxpemUgPSBmdW5jdGlvbih2YWx1ZSkge1xuXHRcdGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHsgcmV0dXJuIHVuZGVmaW5lZCB9XG5cdFx0dHJ5IHsgcmV0dXJuIEpTT04ucGFyc2UodmFsdWUpIH1cblx0XHRjYXRjaChlKSB7IHJldHVybiB2YWx1ZSB8fCB1bmRlZmluZWQgfVxuXHR9XG5cblx0Ly8gRnVuY3Rpb25zIHRvIGVuY2Fwc3VsYXRlIHF1ZXN0aW9uYWJsZSBGaXJlRm94IDMuNi4xMyBiZWhhdmlvclxuXHQvLyB3aGVuIGFib3V0LmNvbmZpZzo6ZG9tLnN0b3JhZ2UuZW5hYmxlZCA9PT0gZmFsc2Vcblx0Ly8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJjdXN3ZXN0aW4vc3RvcmUuanMvaXNzdWVzI2lzc3VlLzEzXG5cdGZ1bmN0aW9uIGlzTG9jYWxTdG9yYWdlTmFtZVN1cHBvcnRlZCgpIHtcblx0XHR0cnkgeyByZXR1cm4gKGxvY2FsU3RvcmFnZU5hbWUgaW4gd2luICYmIHdpbltsb2NhbFN0b3JhZ2VOYW1lXSkgfVxuXHRcdGNhdGNoKGVycikgeyByZXR1cm4gZmFsc2UgfVxuXHR9XG5cblx0aWYgKGlzTG9jYWxTdG9yYWdlTmFtZVN1cHBvcnRlZCgpKSB7XG5cdFx0c3RvcmFnZSA9IHdpbltsb2NhbFN0b3JhZ2VOYW1lXVxuXHRcdHN0b3JlLnNldCA9IGZ1bmN0aW9uKGtleSwgdmFsKSB7XG5cdFx0XHRpZiAodmFsID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHN0b3JlLnJlbW92ZShrZXkpIH1cblx0XHRcdHN0b3JhZ2Uuc2V0SXRlbShrZXksIHN0b3JlLnNlcmlhbGl6ZSh2YWwpKVxuXHRcdFx0cmV0dXJuIHZhbFxuXHRcdH1cblx0XHRzdG9yZS5nZXQgPSBmdW5jdGlvbihrZXksIGRlZmF1bHRWYWwpIHtcblx0XHRcdHZhciB2YWwgPSBzdG9yZS5kZXNlcmlhbGl6ZShzdG9yYWdlLmdldEl0ZW0oa2V5KSlcblx0XHRcdHJldHVybiAodmFsID09PSB1bmRlZmluZWQgPyBkZWZhdWx0VmFsIDogdmFsKVxuXHRcdH1cblx0XHRzdG9yZS5yZW1vdmUgPSBmdW5jdGlvbihrZXkpIHsgc3RvcmFnZS5yZW1vdmVJdGVtKGtleSkgfVxuXHRcdHN0b3JlLmNsZWFyID0gZnVuY3Rpb24oKSB7IHN0b3JhZ2UuY2xlYXIoKSB9XG5cdFx0c3RvcmUuZ2V0QWxsID0gZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgcmV0ID0ge31cblx0XHRcdHN0b3JlLmZvckVhY2goZnVuY3Rpb24oa2V5LCB2YWwpIHtcblx0XHRcdFx0cmV0W2tleV0gPSB2YWxcblx0XHRcdH0pXG5cdFx0XHRyZXR1cm4gcmV0XG5cdFx0fVxuXHRcdHN0b3JlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaykge1xuXHRcdFx0Zm9yICh2YXIgaT0wOyBpPHN0b3JhZ2UubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIGtleSA9IHN0b3JhZ2Uua2V5KGkpXG5cdFx0XHRcdGNhbGxiYWNrKGtleSwgc3RvcmUuZ2V0KGtleSkpXG5cdFx0XHR9XG5cdFx0fVxuXHR9IGVsc2UgaWYgKGRvYyAmJiBkb2MuZG9jdW1lbnRFbGVtZW50LmFkZEJlaGF2aW9yKSB7XG5cdFx0dmFyIHN0b3JhZ2VPd25lcixcblx0XHRcdHN0b3JhZ2VDb250YWluZXJcblx0XHQvLyBTaW5jZSAjdXNlckRhdGEgc3RvcmFnZSBhcHBsaWVzIG9ubHkgdG8gc3BlY2lmaWMgcGF0aHMsIHdlIG5lZWQgdG9cblx0XHQvLyBzb21laG93IGxpbmsgb3VyIGRhdGEgdG8gYSBzcGVjaWZpYyBwYXRoLiAgV2UgY2hvb3NlIC9mYXZpY29uLmljb1xuXHRcdC8vIGFzIGEgcHJldHR5IHNhZmUgb3B0aW9uLCBzaW5jZSBhbGwgYnJvd3NlcnMgYWxyZWFkeSBtYWtlIGEgcmVxdWVzdCB0b1xuXHRcdC8vIHRoaXMgVVJMIGFueXdheSBhbmQgYmVpbmcgYSA0MDQgd2lsbCBub3QgaHVydCB1cyBoZXJlLiAgV2Ugd3JhcCBhblxuXHRcdC8vIGlmcmFtZSBwb2ludGluZyB0byB0aGUgZmF2aWNvbiBpbiBhbiBBY3RpdmVYT2JqZWN0KGh0bWxmaWxlKSBvYmplY3Rcblx0XHQvLyAoc2VlOiBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvYWE3NTI1NzQodj1WUy44NSkuYXNweClcblx0XHQvLyBzaW5jZSB0aGUgaWZyYW1lIGFjY2VzcyBydWxlcyBhcHBlYXIgdG8gYWxsb3cgZGlyZWN0IGFjY2VzcyBhbmRcblx0XHQvLyBtYW5pcHVsYXRpb24gb2YgdGhlIGRvY3VtZW50IGVsZW1lbnQsIGV2ZW4gZm9yIGEgNDA0IHBhZ2UuICBUaGlzXG5cdFx0Ly8gZG9jdW1lbnQgY2FuIGJlIHVzZWQgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBkb2N1bWVudCAod2hpY2ggd291bGRcblx0XHQvLyBoYXZlIGJlZW4gbGltaXRlZCB0byB0aGUgY3VycmVudCBwYXRoKSB0byBwZXJmb3JtICN1c2VyRGF0YSBzdG9yYWdlLlxuXHRcdHRyeSB7XG5cdFx0XHRzdG9yYWdlQ29udGFpbmVyID0gbmV3IEFjdGl2ZVhPYmplY3QoJ2h0bWxmaWxlJylcblx0XHRcdHN0b3JhZ2VDb250YWluZXIub3BlbigpXG5cdFx0XHRzdG9yYWdlQ29udGFpbmVyLndyaXRlKCc8JytzY3JpcHRUYWcrJz5kb2N1bWVudC53PXdpbmRvdzwvJytzY3JpcHRUYWcrJz48aWZyYW1lIHNyYz1cIi9mYXZpY29uLmljb1wiPjwvaWZyYW1lPicpXG5cdFx0XHRzdG9yYWdlQ29udGFpbmVyLmNsb3NlKClcblx0XHRcdHN0b3JhZ2VPd25lciA9IHN0b3JhZ2VDb250YWluZXIudy5mcmFtZXNbMF0uZG9jdW1lbnRcblx0XHRcdHN0b3JhZ2UgPSBzdG9yYWdlT3duZXIuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdC8vIHNvbWVob3cgQWN0aXZlWE9iamVjdCBpbnN0YW50aWF0aW9uIGZhaWxlZCAocGVyaGFwcyBzb21lIHNwZWNpYWxcblx0XHRcdC8vIHNlY3VyaXR5IHNldHRpbmdzIG9yIG90aGVyd3NlKSwgZmFsbCBiYWNrIHRvIHBlci1wYXRoIHN0b3JhZ2Vcblx0XHRcdHN0b3JhZ2UgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0XHRcdHN0b3JhZ2VPd25lciA9IGRvYy5ib2R5XG5cdFx0fVxuXHRcdHZhciB3aXRoSUVTdG9yYWdlID0gZnVuY3Rpb24oc3RvcmVGdW5jdGlvbikge1xuXHRcdFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHRcdFx0XHR2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMClcblx0XHRcdFx0YXJncy51bnNoaWZ0KHN0b3JhZ2UpXG5cdFx0XHRcdC8vIFNlZSBodHRwOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXM1MzEwODEodj1WUy44NSkuYXNweFxuXHRcdFx0XHQvLyBhbmQgaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L21zNTMxNDI0KHY9VlMuODUpLmFzcHhcblx0XHRcdFx0c3RvcmFnZU93bmVyLmFwcGVuZENoaWxkKHN0b3JhZ2UpXG5cdFx0XHRcdHN0b3JhZ2UuYWRkQmVoYXZpb3IoJyNkZWZhdWx0I3VzZXJEYXRhJylcblx0XHRcdFx0c3RvcmFnZS5sb2FkKGxvY2FsU3RvcmFnZU5hbWUpXG5cdFx0XHRcdHZhciByZXN1bHQgPSBzdG9yZUZ1bmN0aW9uLmFwcGx5KHN0b3JlLCBhcmdzKVxuXHRcdFx0XHRzdG9yYWdlT3duZXIucmVtb3ZlQ2hpbGQoc3RvcmFnZSlcblx0XHRcdFx0cmV0dXJuIHJlc3VsdFxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIEluIElFNywga2V5cyBjYW5ub3Qgc3RhcnQgd2l0aCBhIGRpZ2l0IG9yIGNvbnRhaW4gY2VydGFpbiBjaGFycy5cblx0XHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL21hcmN1c3dlc3Rpbi9zdG9yZS5qcy9pc3N1ZXMvNDBcblx0XHQvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL21hcmN1c3dlc3Rpbi9zdG9yZS5qcy9pc3N1ZXMvODNcblx0XHR2YXIgZm9yYmlkZGVuQ2hhcnNSZWdleCA9IG5ldyBSZWdFeHAoXCJbIVxcXCIjJCUmJygpKissL1xcXFxcXFxcOjs8PT4/QFtcXFxcXV5ge3x9fl1cIiwgXCJnXCIpXG5cdFx0dmFyIGllS2V5Rml4ID0gZnVuY3Rpb24oa2V5KSB7XG5cdFx0XHRyZXR1cm4ga2V5LnJlcGxhY2UoL15kLywgJ19fXyQmJykucmVwbGFjZShmb3JiaWRkZW5DaGFyc1JlZ2V4LCAnX19fJylcblx0XHR9XG5cdFx0c3RvcmUuc2V0ID0gd2l0aElFU3RvcmFnZShmdW5jdGlvbihzdG9yYWdlLCBrZXksIHZhbCkge1xuXHRcdFx0a2V5ID0gaWVLZXlGaXgoa2V5KVxuXHRcdFx0aWYgKHZhbCA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiBzdG9yZS5yZW1vdmUoa2V5KSB9XG5cdFx0XHRzdG9yYWdlLnNldEF0dHJpYnV0ZShrZXksIHN0b3JlLnNlcmlhbGl6ZSh2YWwpKVxuXHRcdFx0c3RvcmFnZS5zYXZlKGxvY2FsU3RvcmFnZU5hbWUpXG5cdFx0XHRyZXR1cm4gdmFsXG5cdFx0fSlcblx0XHRzdG9yZS5nZXQgPSB3aXRoSUVTdG9yYWdlKGZ1bmN0aW9uKHN0b3JhZ2UsIGtleSwgZGVmYXVsdFZhbCkge1xuXHRcdFx0a2V5ID0gaWVLZXlGaXgoa2V5KVxuXHRcdFx0dmFyIHZhbCA9IHN0b3JlLmRlc2VyaWFsaXplKHN0b3JhZ2UuZ2V0QXR0cmlidXRlKGtleSkpXG5cdFx0XHRyZXR1cm4gKHZhbCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdFZhbCA6IHZhbClcblx0XHR9KVxuXHRcdHN0b3JlLnJlbW92ZSA9IHdpdGhJRVN0b3JhZ2UoZnVuY3Rpb24oc3RvcmFnZSwga2V5KSB7XG5cdFx0XHRrZXkgPSBpZUtleUZpeChrZXkpXG5cdFx0XHRzdG9yYWdlLnJlbW92ZUF0dHJpYnV0ZShrZXkpXG5cdFx0XHRzdG9yYWdlLnNhdmUobG9jYWxTdG9yYWdlTmFtZSlcblx0XHR9KVxuXHRcdHN0b3JlLmNsZWFyID0gd2l0aElFU3RvcmFnZShmdW5jdGlvbihzdG9yYWdlKSB7XG5cdFx0XHR2YXIgYXR0cmlidXRlcyA9IHN0b3JhZ2UuWE1MRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmF0dHJpYnV0ZXNcblx0XHRcdHN0b3JhZ2UubG9hZChsb2NhbFN0b3JhZ2VOYW1lKVxuXHRcdFx0Zm9yICh2YXIgaT1hdHRyaWJ1dGVzLmxlbmd0aC0xOyBpPj0wOyBpLS0pIHtcblx0XHRcdFx0c3RvcmFnZS5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlc1tpXS5uYW1lKVxuXHRcdFx0fVxuXHRcdFx0c3RvcmFnZS5zYXZlKGxvY2FsU3RvcmFnZU5hbWUpXG5cdFx0fSlcblx0XHRzdG9yZS5nZXRBbGwgPSBmdW5jdGlvbihzdG9yYWdlKSB7XG5cdFx0XHR2YXIgcmV0ID0ge31cblx0XHRcdHN0b3JlLmZvckVhY2goZnVuY3Rpb24oa2V5LCB2YWwpIHtcblx0XHRcdFx0cmV0W2tleV0gPSB2YWxcblx0XHRcdH0pXG5cdFx0XHRyZXR1cm4gcmV0XG5cdFx0fVxuXHRcdHN0b3JlLmZvckVhY2ggPSB3aXRoSUVTdG9yYWdlKGZ1bmN0aW9uKHN0b3JhZ2UsIGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgYXR0cmlidXRlcyA9IHN0b3JhZ2UuWE1MRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmF0dHJpYnV0ZXNcblx0XHRcdGZvciAodmFyIGk9MCwgYXR0cjsgYXR0cj1hdHRyaWJ1dGVzW2ldOyArK2kpIHtcblx0XHRcdFx0Y2FsbGJhY2soYXR0ci5uYW1lLCBzdG9yZS5kZXNlcmlhbGl6ZShzdG9yYWdlLmdldEF0dHJpYnV0ZShhdHRyLm5hbWUpKSlcblx0XHRcdH1cblx0XHR9KVxuXHR9XG5cblx0dHJ5IHtcblx0XHR2YXIgdGVzdEtleSA9ICdfX3N0b3JlanNfXydcblx0XHRzdG9yZS5zZXQodGVzdEtleSwgdGVzdEtleSlcblx0XHRpZiAoc3RvcmUuZ2V0KHRlc3RLZXkpICE9IHRlc3RLZXkpIHsgc3RvcmUuZGlzYWJsZWQgPSB0cnVlIH1cblx0XHRzdG9yZS5yZW1vdmUodGVzdEtleSlcblx0fSBjYXRjaChlKSB7XG5cdFx0c3RvcmUuZGlzYWJsZWQgPSB0cnVlXG5cdH1cblx0c3RvcmUuZW5hYmxlZCA9ICFzdG9yZS5kaXNhYmxlZFxuXHRcblx0cmV0dXJuIHN0b3JlXG59KSk7XG4iLCJcbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHRyaW07XG5cbmZ1bmN0aW9uIHRyaW0oc3RyKXtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzKnxcXHMqJC9nLCAnJyk7XG59XG5cbmV4cG9ydHMubGVmdCA9IGZ1bmN0aW9uKHN0cil7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJyk7XG59O1xuXG5leHBvcnRzLnJpZ2h0ID0gZnVuY3Rpb24oc3RyKXtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9cXHMqJC8sICcnKTtcbn07XG4iLCIndXNlIHN0cmljdCdcblxuLyoqXG4gKiBHZW5lcmF0ZSBhIGZ1bmN0aW9uIGZvciBzZXF1ZW5jZXMgb2YgcmUtdXNhYmxlIElEcy5cbiAqXG4gKiBAcGFyYW0gcHJlZml4IHtzdHJpbmd9XG4gKiBAcGFyYW0gc3VmZml4IHtzdHJpbmd9XG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHByZWZpeCwgc3VmZml4KSB7XG4gIHZhciBpZCA9IDBcblxuICBwcmVmaXggPSBwcmVmaXggfHwgJydcbiAgc3VmZml4ID0gc3VmZml4IHx8ICcnXG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gcHJlZml4ICsgKGlkKyspICsgc3VmZml4XG4gIH1cbn1cbiIsImNvbnN0IGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpXG5jb25zdCB0cmllID0gcmVxdWlyZSgnLi90cmllJylcblxubW9kdWxlLmV4cG9ydHMgPSBXYXlmYXJlclxuXG4vLyBjcmVhdGUgYSByb3V0ZXJcbi8vIHN0ciAtPiBvYmpcbmZ1bmN0aW9uIFdheWZhcmVyIChkZnQpIHtcbiAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFdheWZhcmVyKSkgcmV0dXJuIG5ldyBXYXlmYXJlcihkZnQpXG5cbiAgY29uc3QgX2RlZmF1bHQgPSAoZGZ0IHx8ICcnKS5yZXBsYWNlKC9eXFwvLywgJycpXG4gIGNvbnN0IF90cmllID0gdHJpZSgpXG5cbiAgZW1pdC5fdHJpZSA9IF90cmllXG4gIGVtaXQuZW1pdCA9IGVtaXRcbiAgZW1pdC5vbiA9IG9uXG4gIGVtaXQuX3dheWZhcmVyID0gdHJ1ZVxuXG4gIHJldHVybiBlbWl0XG5cbiAgLy8gZGVmaW5lIGEgcm91dGVcbiAgLy8gKHN0ciwgZm4pIC0+IG9ialxuICBmdW5jdGlvbiBvbiAocm91dGUsIGNiKSB7XG4gICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiByb3V0ZSwgJ3N0cmluZycpXG4gICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBjYiwgJ2Z1bmN0aW9uJylcblxuICAgIHJvdXRlID0gcm91dGUgfHwgJy8nXG5cbiAgICBpZiAoY2IgJiYgY2IuX3dheWZhcmVyICYmIGNiLl90cmllKSB7XG4gICAgICBfdHJpZS5tb3VudChyb3V0ZSwgY2IuX3RyaWUudHJpZSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgbm9kZSA9IF90cmllLmNyZWF0ZShyb3V0ZSlcbiAgICAgIG5vZGUuY2IgPSBjYlxuICAgIH1cblxuICAgIHJldHVybiBlbWl0XG4gIH1cblxuICAvLyBtYXRjaCBhbmQgY2FsbCBhIHJvdXRlXG4gIC8vIChzdHIsIG9iaj8pIC0+IG51bGxcbiAgZnVuY3Rpb24gZW1pdCAocm91dGUpIHtcbiAgICBhc3NlcnQubm90RXF1YWwocm91dGUsIHVuZGVmaW5lZCwgXCIncm91dGUnIG11c3QgYmUgZGVmaW5lZFwiKVxuICAgIGNvbnN0IGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aClcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaV1cbiAgICB9XG5cbiAgICBjb25zdCBub2RlID0gX3RyaWUubWF0Y2gocm91dGUpXG4gICAgaWYgKG5vZGUgJiYgbm9kZS5jYikge1xuICAgICAgYXJnc1swXSA9IG5vZGUucGFyYW1zXG4gICAgICByZXR1cm4gbm9kZS5jYi5hcHBseShudWxsLCBhcmdzKVxuICAgIH1cblxuICAgIGNvbnN0IGRmdCA9IF90cmllLm1hdGNoKF9kZWZhdWx0KVxuICAgIGlmIChkZnQgJiYgZGZ0LmNiKSB7XG4gICAgICBhcmdzWzBdID0gZGZ0LnBhcmFtc1xuICAgICAgcmV0dXJuIGRmdC5jYi5hcHBseShudWxsLCBhcmdzKVxuICAgIH1cblxuICAgIHRocm93IG5ldyBFcnJvcihcInJvdXRlICdcIiArIHJvdXRlICsgXCInIGRpZCBub3QgbWF0Y2hcIilcbiAgfVxufVxuIiwiY29uc3QgbXV0YXRlID0gcmVxdWlyZSgneHRlbmQvbXV0YWJsZScpXG5jb25zdCBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKVxuY29uc3QgeHRlbmQgPSByZXF1aXJlKCd4dGVuZCcpXG5cbm1vZHVsZS5leHBvcnRzID0gVHJpZVxuXG4vLyBjcmVhdGUgYSBuZXcgdHJpZVxuLy8gbnVsbCAtPiBvYmpcbmZ1bmN0aW9uIFRyaWUgKCkge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgVHJpZSkpIHJldHVybiBuZXcgVHJpZSgpXG4gIHRoaXMudHJpZSA9IHsgbm9kZXM6IHt9IH1cbn1cblxuLy8gY3JlYXRlIGEgbm9kZSBvbiB0aGUgdHJpZSBhdCByb3V0ZVxuLy8gYW5kIHJldHVybiBhIG5vZGVcbi8vIHN0ciAtPiBudWxsXG5UcmllLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAocm91dGUpIHtcbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiByb3V0ZSwgJ3N0cmluZycsICdyb3V0ZSBzaG91bGQgYmUgYSBzdHJpbmcnKVxuICAvLyBzdHJpcCBsZWFkaW5nICcvJyBhbmQgc3BsaXQgcm91dGVzXG4gIGNvbnN0IHJvdXRlcyA9IHJvdXRlLnJlcGxhY2UoL15cXC8vLCAnJykuc3BsaXQoJy8nKVxuICByZXR1cm4gKGZ1bmN0aW9uIGNyZWF0ZU5vZGUgKGluZGV4LCB0cmllLCByb3V0ZXMpIHtcbiAgICBjb25zdCByb3V0ZSA9IHJvdXRlc1tpbmRleF1cblxuICAgIGlmIChyb3V0ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdHJpZVxuXG4gICAgdmFyIG5vZGUgPSBudWxsXG4gICAgaWYgKC9eOi8udGVzdChyb3V0ZSkpIHtcbiAgICAgIC8vIGlmIG5vZGUgaXMgYSBuYW1lIG1hdGNoLCBzZXQgbmFtZSBhbmQgYXBwZW5kIHRvICc6JyBub2RlXG4gICAgICBpZiAoIXRyaWUubm9kZXNbJyQkJ10pIHtcbiAgICAgICAgbm9kZSA9IHsgbm9kZXM6IHt9IH1cbiAgICAgICAgdHJpZS5ub2Rlc1snJCQnXSA9IG5vZGVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGUgPSB0cmllLm5vZGVzWyckJCddXG4gICAgICB9XG4gICAgICB0cmllLm5hbWUgPSByb3V0ZS5yZXBsYWNlKC9eOi8sICcnKVxuICAgIH0gZWxzZSBpZiAoIXRyaWUubm9kZXNbcm91dGVdKSB7XG4gICAgICBub2RlID0geyBub2Rlczoge30gfVxuICAgICAgdHJpZS5ub2Rlc1tyb3V0ZV0gPSBub2RlXG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUgPSB0cmllLm5vZGVzW3JvdXRlXVxuICAgIH1cblxuICAgIC8vIHdlIG11c3QgcmVjdXJzZSBkZWVwZXJcbiAgICByZXR1cm4gY3JlYXRlTm9kZShpbmRleCArIDEsIG5vZGUsIHJvdXRlcylcbiAgfSkoMCwgdGhpcy50cmllLCByb3V0ZXMpXG59XG5cbi8vIG1hdGNoIGEgcm91dGUgb24gdGhlIHRyaWVcbi8vIGFuZCByZXR1cm4gdGhlIG5vZGVcbi8vIHN0ciAtPiBvYmpcblRyaWUucHJvdG90eXBlLm1hdGNoID0gZnVuY3Rpb24gKHJvdXRlKSB7XG4gIGFzc2VydC5lcXVhbCh0eXBlb2Ygcm91dGUsICdzdHJpbmcnLCAncm91dGUgc2hvdWxkIGJlIGEgc3RyaW5nJylcblxuICBjb25zdCByb3V0ZXMgPSByb3V0ZS5yZXBsYWNlKC9eXFwvLywgJycpLnNwbGl0KCcvJylcbiAgY29uc3QgcGFyYW1zID0ge31cblxuICB2YXIgbm9kZSA9IChmdW5jdGlvbiBzZWFyY2ggKGluZGV4LCB0cmllKSB7XG4gICAgLy8gZWl0aGVyIHRoZXJlJ3Mgbm8gbWF0Y2gsIG9yIHdlJ3JlIGRvbmUgc2VhcmNoaW5nXG4gICAgaWYgKHRyaWUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHVuZGVmaW5lZFxuICAgIGNvbnN0IHJvdXRlID0gcm91dGVzW2luZGV4XVxuICAgIGlmIChyb3V0ZSA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdHJpZVxuXG4gICAgaWYgKHRyaWUubm9kZXNbcm91dGVdKSB7XG4gICAgICAvLyBtYXRjaCByZWd1bGFyIHJvdXRlcyBmaXJzdFxuICAgICAgcmV0dXJuIHNlYXJjaChpbmRleCArIDEsIHRyaWUubm9kZXNbcm91dGVdKVxuICAgIH0gZWxzZSBpZiAodHJpZS5uYW1lKSB7XG4gICAgICAvLyBtYXRjaCBuYW1lZCByb3V0ZXNcbiAgICAgIHBhcmFtc1t0cmllLm5hbWVdID0gcm91dGVcbiAgICAgIHJldHVybiBzZWFyY2goaW5kZXggKyAxLCB0cmllLm5vZGVzWyckJCddKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBubyBtYXRjaGVzIGZvdW5kXG4gICAgICByZXR1cm4gc2VhcmNoKGluZGV4ICsgMSlcbiAgICB9XG4gIH0pKDAsIHRoaXMudHJpZSlcblxuICBpZiAoIW5vZGUpIHJldHVybiB1bmRlZmluZWRcbiAgbm9kZSA9IHh0ZW5kKG5vZGUpXG4gIG5vZGUucGFyYW1zID0gcGFyYW1zXG4gIHJldHVybiBub2RlXG59XG5cbi8vIG1vdW50IGEgdHJpZSBvbnRvIGEgbm9kZSBhdCByb3V0ZVxuLy8gKHN0ciwgb2JqKSAtPiBudWxsXG5UcmllLnByb3RvdHlwZS5tb3VudCA9IGZ1bmN0aW9uIChyb3V0ZSwgdHJpZSkge1xuICBhc3NlcnQuZXF1YWwodHlwZW9mIHJvdXRlLCAnc3RyaW5nJywgJ3JvdXRlIHNob3VsZCBiZSBhIHN0cmluZycpXG4gIGFzc2VydC5lcXVhbCh0eXBlb2YgdHJpZSwgJ29iamVjdCcsICd0cmllIHNob3VsZCBiZSBhIG9iamVjdCcpXG5cbiAgY29uc3Qgc3BsaXQgPSByb3V0ZS5yZXBsYWNlKC9eXFwvLywgJycpLnNwbGl0KCcvJylcbiAgdmFyIG5vZGUgPSBudWxsXG4gIHZhciBrZXkgPSBudWxsXG5cbiAgaWYgKHNwbGl0Lmxlbmd0aCA9PT0gMSkge1xuICAgIGtleSA9IHNwbGl0WzBdXG4gICAgbm9kZSA9IHRoaXMuY3JlYXRlKGtleSlcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBoZWFkQXJyID0gc3BsaXQuc3BsaWNlKDAsIHNwbGl0Lmxlbmd0aCAtIDEpXG4gICAgY29uc3QgaGVhZCA9IGhlYWRBcnIuam9pbignLycpXG4gICAga2V5ID0gc3BsaXRbMF1cbiAgICBub2RlID0gdGhpcy5jcmVhdGUoaGVhZClcbiAgfVxuXG4gIG11dGF0ZShub2RlLm5vZGVzLCB0cmllLm5vZGVzKVxuICBpZiAodHJpZS5uYW1lKSBub2RlLm5hbWUgPSB0cmllLm5hbWVcblxuICAvLyBkZWxlZ2F0ZSBwcm9wZXJ0aWVzIGZyb20gJy8nIHRvIHRoZSBuZXcgbm9kZVxuICAvLyAnLycgY2Fubm90IGJlIHJlYWNoZWQgb25jZSBtb3VudGVkXG4gIGlmIChub2RlLm5vZGVzWycnXSkge1xuICAgIE9iamVjdC5rZXlzKG5vZGUubm9kZXNbJyddKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGlmIChrZXkgPT09ICdub2RlcycpIHJldHVyblxuICAgICAgbm9kZVtrZXldID0gbm9kZS5ub2Rlc1snJ11ba2V5XVxuICAgIH0pXG4gICAgbXV0YXRlKG5vZGUubm9kZXMsIG5vZGUubm9kZXNbJyddLm5vZGVzKVxuICAgIGRlbGV0ZSBub2RlLm5vZGVzWycnXS5ub2Rlc1xuICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciB3aW5kb3cgPSByZXF1aXJlKFwiZ2xvYmFsL3dpbmRvd1wiKVxudmFyIGlzRnVuY3Rpb24gPSByZXF1aXJlKFwiaXMtZnVuY3Rpb25cIilcbnZhciBwYXJzZUhlYWRlcnMgPSByZXF1aXJlKFwicGFyc2UtaGVhZGVyc1wiKVxudmFyIHh0ZW5kID0gcmVxdWlyZShcInh0ZW5kXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlWEhSXG5jcmVhdGVYSFIuWE1MSHR0cFJlcXVlc3QgPSB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgfHwgbm9vcFxuY3JlYXRlWEhSLlhEb21haW5SZXF1ZXN0ID0gXCJ3aXRoQ3JlZGVudGlhbHNcIiBpbiAobmV3IGNyZWF0ZVhIUi5YTUxIdHRwUmVxdWVzdCgpKSA/IGNyZWF0ZVhIUi5YTUxIdHRwUmVxdWVzdCA6IHdpbmRvdy5YRG9tYWluUmVxdWVzdFxuXG5mb3JFYWNoQXJyYXkoW1wiZ2V0XCIsIFwicHV0XCIsIFwicG9zdFwiLCBcInBhdGNoXCIsIFwiaGVhZFwiLCBcImRlbGV0ZVwiXSwgZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgY3JlYXRlWEhSW21ldGhvZCA9PT0gXCJkZWxldGVcIiA/IFwiZGVsXCIgOiBtZXRob2RdID0gZnVuY3Rpb24odXJpLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgICAgICBvcHRpb25zID0gaW5pdFBhcmFtcyh1cmksIG9wdGlvbnMsIGNhbGxiYWNrKVxuICAgICAgICBvcHRpb25zLm1ldGhvZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpXG4gICAgICAgIHJldHVybiBfY3JlYXRlWEhSKG9wdGlvbnMpXG4gICAgfVxufSlcblxuZnVuY3Rpb24gZm9yRWFjaEFycmF5KGFycmF5LCBpdGVyYXRvcikge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaXRlcmF0b3IoYXJyYXlbaV0pXG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0VtcHR5KG9iail7XG4gICAgZm9yKHZhciBpIGluIG9iail7XG4gICAgICAgIGlmKG9iai5oYXNPd25Qcm9wZXJ0eShpKSkgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHJldHVybiB0cnVlXG59XG5cbmZ1bmN0aW9uIGluaXRQYXJhbXModXJpLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIHZhciBwYXJhbXMgPSB1cmlcblxuICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbnMpKSB7XG4gICAgICAgIGNhbGxiYWNrID0gb3B0aW9uc1xuICAgICAgICBpZiAodHlwZW9mIHVyaSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgcGFyYW1zID0ge3VyaTp1cml9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBwYXJhbXMgPSB4dGVuZChvcHRpb25zLCB7dXJpOiB1cml9KVxuICAgIH1cblxuICAgIHBhcmFtcy5jYWxsYmFjayA9IGNhbGxiYWNrXG4gICAgcmV0dXJuIHBhcmFtc1xufVxuXG5mdW5jdGlvbiBjcmVhdGVYSFIodXJpLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIG9wdGlvbnMgPSBpbml0UGFyYW1zKHVyaSwgb3B0aW9ucywgY2FsbGJhY2spXG4gICAgcmV0dXJuIF9jcmVhdGVYSFIob3B0aW9ucylcbn1cblxuZnVuY3Rpb24gX2NyZWF0ZVhIUihvcHRpb25zKSB7XG4gICAgaWYodHlwZW9mIG9wdGlvbnMuY2FsbGJhY2sgPT09IFwidW5kZWZpbmVkXCIpe1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjYWxsYmFjayBhcmd1bWVudCBtaXNzaW5nXCIpXG4gICAgfVxuXG4gICAgdmFyIGNhbGxlZCA9IGZhbHNlXG4gICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gY2JPbmNlKGVyciwgcmVzcG9uc2UsIGJvZHkpe1xuICAgICAgICBpZighY2FsbGVkKXtcbiAgICAgICAgICAgIGNhbGxlZCA9IHRydWVcbiAgICAgICAgICAgIG9wdGlvbnMuY2FsbGJhY2soZXJyLCByZXNwb25zZSwgYm9keSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlYWR5c3RhdGVjaGFuZ2UoKSB7XG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgICAgbG9hZEZ1bmMoKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Qm9keSgpIHtcbiAgICAgICAgLy8gQ2hyb21lIHdpdGggcmVxdWVzdFR5cGU9YmxvYiB0aHJvd3MgZXJyb3JzIGFycm91bmQgd2hlbiBldmVuIHRlc3RpbmcgYWNjZXNzIHRvIHJlc3BvbnNlVGV4dFxuICAgICAgICB2YXIgYm9keSA9IHVuZGVmaW5lZFxuXG4gICAgICAgIGlmICh4aHIucmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGJvZHkgPSB4aHIucmVzcG9uc2VcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJvZHkgPSB4aHIucmVzcG9uc2VUZXh0IHx8IGdldFhtbCh4aHIpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNKc29uKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGJvZHkgPSBKU09OLnBhcnNlKGJvZHkpXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGJvZHlcbiAgICB9XG5cbiAgICB2YXIgZmFpbHVyZVJlc3BvbnNlID0ge1xuICAgICAgICAgICAgICAgIGJvZHk6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7fSxcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiAwLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICAgICAgICAgIHVybDogdXJpLFxuICAgICAgICAgICAgICAgIHJhd1JlcXVlc3Q6IHhoclxuICAgICAgICAgICAgfVxuXG4gICAgZnVuY3Rpb24gZXJyb3JGdW5jKGV2dCkge1xuICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dFRpbWVyKVxuICAgICAgICBpZighKGV2dCBpbnN0YW5jZW9mIEVycm9yKSl7XG4gICAgICAgICAgICBldnQgPSBuZXcgRXJyb3IoXCJcIiArIChldnQgfHwgXCJVbmtub3duIFhNTEh0dHBSZXF1ZXN0IEVycm9yXCIpIClcbiAgICAgICAgfVxuICAgICAgICBldnQuc3RhdHVzQ29kZSA9IDBcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGV2dCwgZmFpbHVyZVJlc3BvbnNlKVxuICAgIH1cblxuICAgIC8vIHdpbGwgbG9hZCB0aGUgZGF0YSAmIHByb2Nlc3MgdGhlIHJlc3BvbnNlIGluIGEgc3BlY2lhbCByZXNwb25zZSBvYmplY3RcbiAgICBmdW5jdGlvbiBsb2FkRnVuYygpIHtcbiAgICAgICAgaWYgKGFib3J0ZWQpIHJldHVyblxuICAgICAgICB2YXIgc3RhdHVzXG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0VGltZXIpXG4gICAgICAgIGlmKG9wdGlvbnMudXNlWERSICYmIHhoci5zdGF0dXM9PT11bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vSUU4IENPUlMgR0VUIHN1Y2Nlc3NmdWwgcmVzcG9uc2UgZG9lc24ndCBoYXZlIGEgc3RhdHVzIGZpZWxkLCBidXQgYm9keSBpcyBmaW5lXG4gICAgICAgICAgICBzdGF0dXMgPSAyMDBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXR1cyA9ICh4aHIuc3RhdHVzID09PSAxMjIzID8gMjA0IDogeGhyLnN0YXR1cylcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVzcG9uc2UgPSBmYWlsdXJlUmVzcG9uc2VcbiAgICAgICAgdmFyIGVyciA9IG51bGxcblxuICAgICAgICBpZiAoc3RhdHVzICE9PSAwKXtcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge1xuICAgICAgICAgICAgICAgIGJvZHk6IGdldEJvZHkoKSxcbiAgICAgICAgICAgICAgICBzdGF0dXNDb2RlOiBzdGF0dXMsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge30sXG4gICAgICAgICAgICAgICAgdXJsOiB1cmksXG4gICAgICAgICAgICAgICAgcmF3UmVxdWVzdDogeGhyXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKXsgLy9yZW1lbWJlciB4aHIgY2FuIGluIGZhY3QgYmUgWERSIGZvciBDT1JTIGluIElFXG4gICAgICAgICAgICAgICAgcmVzcG9uc2UuaGVhZGVycyA9IHBhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlcnIgPSBuZXcgRXJyb3IoXCJJbnRlcm5hbCBYTUxIdHRwUmVxdWVzdCBFcnJvclwiKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIsIHJlc3BvbnNlLCByZXNwb25zZS5ib2R5KVxuICAgIH1cblxuICAgIHZhciB4aHIgPSBvcHRpb25zLnhociB8fCBudWxsXG5cbiAgICBpZiAoIXhocikge1xuICAgICAgICBpZiAob3B0aW9ucy5jb3JzIHx8IG9wdGlvbnMudXNlWERSKSB7XG4gICAgICAgICAgICB4aHIgPSBuZXcgY3JlYXRlWEhSLlhEb21haW5SZXF1ZXN0KClcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICB4aHIgPSBuZXcgY3JlYXRlWEhSLlhNTEh0dHBSZXF1ZXN0KClcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBrZXlcbiAgICB2YXIgYWJvcnRlZFxuICAgIHZhciB1cmkgPSB4aHIudXJsID0gb3B0aW9ucy51cmkgfHwgb3B0aW9ucy51cmxcbiAgICB2YXIgbWV0aG9kID0geGhyLm1ldGhvZCA9IG9wdGlvbnMubWV0aG9kIHx8IFwiR0VUXCJcbiAgICB2YXIgYm9keSA9IG9wdGlvbnMuYm9keSB8fCBvcHRpb25zLmRhdGEgfHwgbnVsbFxuICAgIHZhciBoZWFkZXJzID0geGhyLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgfHwge31cbiAgICB2YXIgc3luYyA9ICEhb3B0aW9ucy5zeW5jXG4gICAgdmFyIGlzSnNvbiA9IGZhbHNlXG4gICAgdmFyIHRpbWVvdXRUaW1lclxuXG4gICAgaWYgKFwianNvblwiIGluIG9wdGlvbnMpIHtcbiAgICAgICAgaXNKc29uID0gdHJ1ZVxuICAgICAgICBoZWFkZXJzW1wiYWNjZXB0XCJdIHx8IGhlYWRlcnNbXCJBY2NlcHRcIl0gfHwgKGhlYWRlcnNbXCJBY2NlcHRcIl0gPSBcImFwcGxpY2F0aW9uL2pzb25cIikgLy9Eb24ndCBvdmVycmlkZSBleGlzdGluZyBhY2NlcHQgaGVhZGVyIGRlY2xhcmVkIGJ5IHVzZXJcbiAgICAgICAgaWYgKG1ldGhvZCAhPT0gXCJHRVRcIiAmJiBtZXRob2QgIT09IFwiSEVBRFwiKSB7XG4gICAgICAgICAgICBoZWFkZXJzW1wiY29udGVudC10eXBlXCJdIHx8IGhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0gfHwgKGhlYWRlcnNbXCJDb250ZW50LVR5cGVcIl0gPSBcImFwcGxpY2F0aW9uL2pzb25cIikgLy9Eb24ndCBvdmVycmlkZSBleGlzdGluZyBhY2NlcHQgaGVhZGVyIGRlY2xhcmVkIGJ5IHVzZXJcbiAgICAgICAgICAgIGJvZHkgPSBKU09OLnN0cmluZ2lmeShvcHRpb25zLmpzb24pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gcmVhZHlzdGF0ZWNoYW5nZVxuICAgIHhoci5vbmxvYWQgPSBsb2FkRnVuY1xuICAgIHhoci5vbmVycm9yID0gZXJyb3JGdW5jXG4gICAgLy8gSUU5IG11c3QgaGF2ZSBvbnByb2dyZXNzIGJlIHNldCB0byBhIHVuaXF1ZSBmdW5jdGlvbi5cbiAgICB4aHIub25wcm9ncmVzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gSUUgbXVzdCBkaWVcbiAgICB9XG4gICAgeGhyLm9udGltZW91dCA9IGVycm9yRnVuY1xuICAgIHhoci5vcGVuKG1ldGhvZCwgdXJpLCAhc3luYywgb3B0aW9ucy51c2VybmFtZSwgb3B0aW9ucy5wYXNzd29yZClcbiAgICAvL2hhcyB0byBiZSBhZnRlciBvcGVuXG4gICAgaWYoIXN5bmMpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9ICEhb3B0aW9ucy53aXRoQ3JlZGVudGlhbHNcbiAgICB9XG4gICAgLy8gQ2Fubm90IHNldCB0aW1lb3V0IHdpdGggc3luYyByZXF1ZXN0XG4gICAgLy8gbm90IHNldHRpbmcgdGltZW91dCBvbiB0aGUgeGhyIG9iamVjdCwgYmVjYXVzZSBvZiBvbGQgd2Via2l0cyBldGMuIG5vdCBoYW5kbGluZyB0aGF0IGNvcnJlY3RseVxuICAgIC8vIGJvdGggbnBtJ3MgcmVxdWVzdCBhbmQganF1ZXJ5IDEueCB1c2UgdGhpcyBraW5kIG9mIHRpbWVvdXQsIHNvIHRoaXMgaXMgYmVpbmcgY29uc2lzdGVudFxuICAgIGlmICghc3luYyAmJiBvcHRpb25zLnRpbWVvdXQgPiAwICkge1xuICAgICAgICB0aW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBhYm9ydGVkPXRydWUvL0lFOSBtYXkgc3RpbGwgY2FsbCByZWFkeXN0YXRlY2hhbmdlXG4gICAgICAgICAgICB4aHIuYWJvcnQoXCJ0aW1lb3V0XCIpXG4gICAgICAgICAgICB2YXIgZSA9IG5ldyBFcnJvcihcIlhNTEh0dHBSZXF1ZXN0IHRpbWVvdXRcIilcbiAgICAgICAgICAgIGUuY29kZSA9IFwiRVRJTUVET1VUXCJcbiAgICAgICAgICAgIGVycm9yRnVuYyhlKVxuICAgICAgICB9LCBvcHRpb25zLnRpbWVvdXQgKVxuICAgIH1cblxuICAgIGlmICh4aHIuc2V0UmVxdWVzdEhlYWRlcikge1xuICAgICAgICBmb3Ioa2V5IGluIGhlYWRlcnMpe1xuICAgICAgICAgICAgaWYoaGVhZGVycy5oYXNPd25Qcm9wZXJ0eShrZXkpKXtcbiAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihrZXksIGhlYWRlcnNba2V5XSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3B0aW9ucy5oZWFkZXJzICYmICFpc0VtcHR5KG9wdGlvbnMuaGVhZGVycykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSGVhZGVycyBjYW5ub3QgYmUgc2V0IG9uIGFuIFhEb21haW5SZXF1ZXN0IG9iamVjdFwiKVxuICAgIH1cblxuICAgIGlmIChcInJlc3BvbnNlVHlwZVwiIGluIG9wdGlvbnMpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9IG9wdGlvbnMucmVzcG9uc2VUeXBlXG4gICAgfVxuXG4gICAgaWYgKFwiYmVmb3JlU2VuZFwiIGluIG9wdGlvbnMgJiZcbiAgICAgICAgdHlwZW9mIG9wdGlvbnMuYmVmb3JlU2VuZCA9PT0gXCJmdW5jdGlvblwiXG4gICAgKSB7XG4gICAgICAgIG9wdGlvbnMuYmVmb3JlU2VuZCh4aHIpXG4gICAgfVxuXG4gICAgeGhyLnNlbmQoYm9keSlcblxuICAgIHJldHVybiB4aHJcblxuXG59XG5cbmZ1bmN0aW9uIGdldFhtbCh4aHIpIHtcbiAgICBpZiAoeGhyLnJlc3BvbnNlVHlwZSA9PT0gXCJkb2N1bWVudFwiKSB7XG4gICAgICAgIHJldHVybiB4aHIucmVzcG9uc2VYTUxcbiAgICB9XG4gICAgdmFyIGZpcmVmb3hCdWdUYWtlbkVmZmVjdCA9IHhoci5zdGF0dXMgPT09IDIwNCAmJiB4aHIucmVzcG9uc2VYTUwgJiYgeGhyLnJlc3BvbnNlWE1MLmRvY3VtZW50RWxlbWVudC5ub2RlTmFtZSA9PT0gXCJwYXJzZXJlcnJvclwiXG4gICAgaWYgKHhoci5yZXNwb25zZVR5cGUgPT09IFwiXCIgJiYgIWZpcmVmb3hCdWdUYWtlbkVmZmVjdCkge1xuICAgICAgICByZXR1cm4geGhyLnJlc3BvbnNlWE1MXG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGxcbn1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGV4dGVuZFxuXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG5mdW5jdGlvbiBleHRlbmQoKSB7XG4gICAgdmFyIHRhcmdldCA9IHt9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldXG5cbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldFxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBleHRlbmRcblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gZXh0ZW5kKHRhcmdldCkge1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV1cblxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0XG59XG4iLCJ2YXIgYmVsID0gcmVxdWlyZSgnYmVsJykgLy8gdHVybnMgdGVtcGxhdGUgdGFnIGludG8gRE9NIGVsZW1lbnRzXG52YXIgbW9ycGhkb20gPSByZXF1aXJlKCdtb3JwaGRvbScpIC8vIGVmZmljaWVudGx5IGRpZmZzICsgbW9ycGhzIHR3byBET00gZWxlbWVudHNcbnZhciBkZWZhdWx0RXZlbnRzID0gcmVxdWlyZSgnLi91cGRhdGUtZXZlbnRzLmpzJykgLy8gZGVmYXVsdCBldmVudHMgdG8gYmUgY29waWVkIHdoZW4gZG9tIGVsZW1lbnRzIHVwZGF0ZVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJlbFxuXG4vLyBUT0RPIG1vdmUgdGhpcyArIGRlZmF1bHRFdmVudHMgdG8gYSBuZXcgbW9kdWxlIG9uY2Ugd2UgcmVjZWl2ZSBtb3JlIGZlZWRiYWNrXG5tb2R1bGUuZXhwb3J0cy51cGRhdGUgPSBmdW5jdGlvbiAoZnJvbU5vZGUsIHRvTm9kZSwgb3B0cykge1xuICBpZiAoIW9wdHMpIG9wdHMgPSB7fVxuICBpZiAob3B0cy5ldmVudHMgIT09IGZhbHNlKSB7XG4gICAgaWYgKCFvcHRzLm9uQmVmb3JlRWxVcGRhdGVkKSBvcHRzLm9uQmVmb3JlRWxVcGRhdGVkID0gY29waWVyXG4gIH1cblxuICByZXR1cm4gbW9ycGhkb20oZnJvbU5vZGUsIHRvTm9kZSwgb3B0cylcblxuICAvLyBtb3JwaGRvbSBvbmx5IGNvcGllcyBhdHRyaWJ1dGVzLiB3ZSBkZWNpZGVkIHdlIGFsc28gd2FudGVkIHRvIGNvcHkgZXZlbnRzXG4gIC8vIHRoYXQgY2FuIGJlIHNldCB2aWEgYXR0cmlidXRlc1xuICBmdW5jdGlvbiBjb3BpZXIgKGYsIHQpIHtcbiAgICAvLyBjb3B5IGV2ZW50czpcbiAgICB2YXIgZXZlbnRzID0gb3B0cy5ldmVudHMgfHwgZGVmYXVsdEV2ZW50c1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZXYgPSBldmVudHNbaV1cbiAgICAgIGlmICh0W2V2XSkgeyAvLyBpZiBuZXcgZWxlbWVudCBoYXMgYSB3aGl0ZWxpc3RlZCBhdHRyaWJ1dGVcbiAgICAgICAgZltldl0gPSB0W2V2XSAvLyB1cGRhdGUgZXhpc3RpbmcgZWxlbWVudFxuICAgICAgfSBlbHNlIGlmIChmW2V2XSkgeyAvLyBpZiBleGlzdGluZyBlbGVtZW50IGhhcyBpdCBhbmQgbmV3IG9uZSBkb2VzbnRcbiAgICAgICAgZltldl0gPSB1bmRlZmluZWQgLy8gcmVtb3ZlIGl0IGZyb20gZXhpc3RpbmcgZWxlbWVudFxuICAgICAgfVxuICAgIH1cbiAgICAvLyBjb3B5IHZhbHVlcyBmb3IgZm9ybSBlbGVtZW50c1xuICAgIGlmICgoZi5ub2RlTmFtZSA9PT0gJ0lOUFVUJyAmJiBmLnR5cGUgIT09ICdmaWxlJykgfHwgZi5ub2RlTmFtZSA9PT0gJ1NFTEVDVCcpIHtcbiAgICAgIGlmICh0LmdldEF0dHJpYnV0ZSgndmFsdWUnKSA9PT0gbnVsbCkgdC52YWx1ZSA9IGYudmFsdWVcbiAgICB9IGVsc2UgaWYgKGYubm9kZU5hbWUgPT09ICdURVhUQVJFQScpIHtcbiAgICAgIGlmICh0LmdldEF0dHJpYnV0ZSgndmFsdWUnKSA9PT0gbnVsbCkgZi52YWx1ZSA9IHQudmFsdWVcbiAgICB9XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gW1xuICAvLyBhdHRyaWJ1dGUgZXZlbnRzIChjYW4gYmUgc2V0IHdpdGggYXR0cmlidXRlcylcbiAgJ29uY2xpY2snLFxuICAnb25kYmxjbGljaycsXG4gICdvbm1vdXNlZG93bicsXG4gICdvbm1vdXNldXAnLFxuICAnb25tb3VzZW92ZXInLFxuICAnb25tb3VzZW1vdmUnLFxuICAnb25tb3VzZW91dCcsXG4gICdvbmRyYWdzdGFydCcsXG4gICdvbmRyYWcnLFxuICAnb25kcmFnZW50ZXInLFxuICAnb25kcmFnbGVhdmUnLFxuICAnb25kcmFnb3ZlcicsXG4gICdvbmRyb3AnLFxuICAnb25kcmFnZW5kJyxcbiAgJ29ua2V5ZG93bicsXG4gICdvbmtleXByZXNzJyxcbiAgJ29ua2V5dXAnLFxuICAnb251bmxvYWQnLFxuICAnb25hYm9ydCcsXG4gICdvbmVycm9yJyxcbiAgJ29ucmVzaXplJyxcbiAgJ29uc2Nyb2xsJyxcbiAgJ29uc2VsZWN0JyxcbiAgJ29uY2hhbmdlJyxcbiAgJ29uc3VibWl0JyxcbiAgJ29ucmVzZXQnLFxuICAnb25mb2N1cycsXG4gICdvbmJsdXInLFxuICAnb25pbnB1dCcsXG4gIC8vIG90aGVyIGNvbW1vbiBldmVudHNcbiAgJ29uY29udGV4dG1lbnUnLFxuICAnb25mb2N1c2luJyxcbiAgJ29uZm9jdXNvdXQnXG5dXG4iLCJpbXBvcnQgY2hvbyBmcm9tICdjaG9vJ1xuaW1wb3J0IGZhc3RjbGljayBmcm9tICdmYXN0Y2xpY2snXG5pbXBvcnQgbG9nIGZyb20gJ2Nob28tbG9nJ1xuaW1wb3J0IGFwaU1vZGVsIGZyb20gJ34vbW9kZWxzL2FwaSdcbmltcG9ydCBhcHBNb2RlbCBmcm9tICd+L21vZGVscy9hcHAnXG5pbXBvcnQgZ2FtZU1vZGVsIGZyb20gJ34vbW9kZWxzL2dhbWUnXG5pbXBvcnQgd2VsY29tZVBhZ2UgZnJvbSAnfi9wYWdlcy93ZWxjb21lJ1xuaW1wb3J0IGluZ2FtZVBhZ2UgZnJvbSAnfi9wYWdlcy9pbmdhbWUnXG5cbmNvbnN0IGFwcCA9IGNob28oKVxuYXBwLnVzZShsb2coKSlcblxuYXBwLm1vZGVsKGFwaU1vZGVsKVxuYXBwLm1vZGVsKGFwcE1vZGVsKVxuYXBwLm1vZGVsKGdhbWVNb2RlbClcblxuLy8gVE9ETzogd2FpdCBmb3IgY2hvbyB0byBtYWtlIGhhc2ggcm91dGluZyByZWFsbHkgd29ya1xuYXBwLnJvdXRlcihyb3V0ZSA9PiBbXG4gIHJvdXRlKCcvJywgd2VsY29tZVBhZ2UpLFxuICByb3V0ZSgnL2luZ2FtZScsIGluZ2FtZVBhZ2UpXG5dKVxuXG5jb25zdCB0cmVlID0gYXBwLnN0YXJ0KClcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodHJlZSlcbmZhc3RjbGljayhkb2N1bWVudC5ib2R5KVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdkZXZpY2VyZWFkeScsICgpID0+IHtcbiAgcGx1Z2lucy5pbnNvbW5pYS5rZWVwQXdha2UoKVxuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2JhY2tidXR0b24nLCAoKSA9PiB7XG4gICAgaGlzdG9yeS5iYWNrKClcbiAgfSlcbn0pXG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZW5kZXJJZihjb25kaXRpb24sIHN0YXRlLCByZW5kZXJlcikge1xuICByZXR1cm4gKGNvbmRpdGlvbiA/IHJlbmRlcmVyKHN0YXRlKSA6ICcnKVxufVxuIiwiaW1wb3J0IGNoYW1waW9ucyBmcm9tICdsb2wtY2hhbXBpb25zJ1xuaW1wb3J0IHNwZWxscyBmcm9tICdsb2wtc3BlbGxzJ1xuaW1wb3J0IHN0b3JlIGZyb20gJ3N0b3JlJ1xuaW1wb3J0IHVuaXF1ZWlkIGZyb20gJ3VuaXF1ZWlkJ1xuaW1wb3J0IHhociBmcm9tICd4aHInXG5pbXBvcnQgeHRlbmQgZnJvbSAneHRlbmQnXG5cbmNvbnN0IHByb3h5VXJsID0gJ2h0dHBzOi8vd3QtbmdyeW1hbi1nbWFpbF9jb20tMC5ydW4ud2VidGFzay5pby9yaW90LXByb3h5J1xuXG5jb25zdCBlbmRwb2ludCA9IChuYW1lKSA9PiB7XG4gIGNvbnN0IHJlZ2lvbiA9IHN0b3JlLmdldCgnYXBwOnJlZ2lvbicpXG4gIHN3aXRjaCAobmFtZSkge1xuICAgIGNhc2UgJ3N1bW1vbmVyJzpcbiAgICAgIHJldHVybiBgL2FwaS9sb2wvJHtyZWdpb259L3YxLjQvc3VtbW9uZXIvYnktbmFtZWBcbiAgICBjYXNlICdlbm5lbWllcyc6XG4gICAgICByZXR1cm4gYC9vYnNlcnZlci1tb2RlL3Jlc3QvY29uc3VtZXIvZ2V0U3BlY3RhdG9yR2FtZUluZm8vJHtyZWdpb259MWBcbiAgfVxufVxuXG5jb25zdCB1aWQgPSB1bmlxdWVpZCgpXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZXNwYWNlOiAnYXBpJyxcbiAgZWZmZWN0czoge1xuICAgIHJlcXVlc3Q6ICh1cmwsIHN0YXRlLCBzZW5kLCBkb25lKSA9PiB7XG4gICAgICByZXR1cm4geGhyKGAke3Byb3h5VXJsfT91cmw9JHt1cmx9YCwgeyBqc29uOiB0cnVlIH0sXG4gICAgICAoZXJyLCByZXMsIGJvZHkpID0+IHtcbiAgICAgICAgaWYgKG51bGwgPT0gYm9keS5zdGF0dXMpIHtcbiAgICAgICAgICBkb25lKG51bGwsIGJvZHkpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZG9uZShib2R5LnN0YXR1cy5zdGF0dXNfY29kZSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9LFxuICAgIHN1bW1vbmVyOiAobmFtZSwgc3RhdGUsIHNlbmQsIGRvbmUpID0+IHtcbiAgICAgIGNvbnN0IHN1bW1vbmVyID0gc3RvcmUuZ2V0KCdhcGk6c3VtbW9uZXInKVxuICAgICAgaWYgKG51bGwgIT0gc3VtbW9uZXIgJiYgc3VtbW9uZXIubmFtZSA9PT0gbmFtZSlcbiAgICAgICAgcmV0dXJuIGRvbmUobnVsbCwgc3VtbW9uZXIpXG5cbiAgICAgIHNlbmQoJ2FwaTpyZXF1ZXN0JywgYCR7ZW5kcG9pbnQoJ3N1bW1vbmVyJyl9LyR7bmFtZX1gLFxuICAgICAgKGVyciwgYm9keSkgPT4ge1xuICAgICAgICBpZiAoZXJyID4gNDAwKVxuICAgICAgICAgIHJldHVybiBkb25lKCdVbmtub3duIHN1bW1vbmVyJylcblxuICAgICAgICBjb25zdCBzdW1tb25lciA9IGJvZHlbbmFtZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyAvZywgJycpXVxuICAgICAgICBpZiAoIXN1bW1vbmVyKVxuICAgICAgICAgIHJldHVybiBkb25lKCdObyBzdW1tb25lciBmb3VuZCcpXG5cbiAgICAgICAgc3RvcmUuc2V0KCdhcGk6c3VtbW9uZXInLCBzdW1tb25lcilcblxuICAgICAgICBkb25lKG51bGwsIHN1bW1vbmVyKVxuICAgICAgfSlcbiAgICB9LFxuICAgIGVubmVtaWVzOiAoc3VtbW9uZXIsIHN0YXRlLCBzZW5kLCBkb25lKSA9PiB7XG4gICAgICBzZW5kKCdhcGk6cmVxdWVzdCcsIGAke2VuZHBvaW50KCdlbm5lbWllcycpfS8ke3N1bW1vbmVyLmlkfWAsXG4gICAgICAoZXJyLCBib2R5KSA9PiB7XG4gICAgICAgIGlmIChlcnIgPiA0MDApXG4gICAgICAgICAgcmV0dXJuIGRvbmUoJ05vIGxpdmUgZ2FtZSBmb3VuZCcpXG5cbiAgICAgICAgaWYgKCdDTEFTU0lDJyAhPT0gYm9keS5nYW1lTW9kZSB8fCAnTUFUQ0hFRF9HQU1FJyAhPT0gYm9keS5nYW1lVHlwZSlcbiAgICAgICAgICByZXR1cm4gZG9uZSgnR2FtZSBtb2RlIG5vdCBzdXBwb3J0ZWQnKVxuXG4gICAgICAgIGNvbnN0IHsgcGFydGljaXBhbnRzIH0gPSBib2R5XG5cbiAgICAgICAgY29uc3Qgc3VtbW9uZXJUZWFtID0gcGFydGljaXBhbnRzXG4gICAgICAgICAgLmZpbmQocGFydGljaXBhbnQgPT4gc3VtbW9uZXIubmFtZSA9PT0gcGFydGljaXBhbnQuc3VtbW9uZXJOYW1lKVxuICAgICAgICAgIC50ZWFtSWRcblxuICAgICAgICBjb25zdCBlbm5lbWllcyA9IHBhcnRpY2lwYW50c1xuICAgICAgICAgIC5maWx0ZXIocGFydGljaXBhbnQgPT4gcGFydGljaXBhbnQudGVhbUlkICE9PSBzdW1tb25lclRlYW0pXG4gICAgICAgICAgLm1hcChwYXJ0aWNpcGFudCA9PiAoe1xuICAgICAgICAgICAgbmFtZTogcGFydGljaXBhbnQuc3VtbW9uZXJOYW1lLFxuICAgICAgICAgICAgY2hhbXBpb246IGNyZWF0ZUNoYW1waW9uKHBhcnRpY2lwYW50LmNoYW1waW9uSWQpLFxuICAgICAgICAgICAgc3BlbGxzOiBbXG4gICAgICAgICAgICAgIGNyZWF0ZVNwZWxsKHBhcnRpY2lwYW50LnNwZWxsMUlkKSxcbiAgICAgICAgICAgICAgY3JlYXRlU3BlbGwocGFydGljaXBhbnQuc3BlbGwySWQpXG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSkpXG5cbiAgICAgICAgZG9uZShudWxsLCBlbm5lbWllcylcbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNoYW1waW9uKGlkKSB7XG4gIHJldHVybiBjaGFtcGlvbnMuZmluZChjID0+IGMua2V5ID09PSBTdHJpbmcoaWQpKVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTcGVsbChpZCkge1xuICBjb25zdCBzcGVsbCA9IHNwZWxscy5maW5kKHMgPT4gcy5rZXkgPT09IFN0cmluZyhpZCkpXG4gIHJldHVybiB4dGVuZCh7fSwgc3BlbGwsIHtcbiAgICB1aWQ6IHVpZCgpLFxuICAgIHN0YXRlOiAnYXZhaWxhYmxlJyxcbiAgICBjb29sZG93bjogMCxcbiAgICByZWZDb29sZG93bjogc3BlbGwuY29vbGRvd25cbiAgfSlcbn1cbiIsImltcG9ydCBzdG9yZSBmcm9tICdzdG9yZSdcbmltcG9ydCB4dGVuZCBmcm9tICd4dGVuZCdcblxubGV0IGVyclRpbWVvdXRJZFxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIG5hbWVzcGFjZTogJ2FwcCcsXG4gIHN0YXRlOiB7XG4gICAgdGl0bGU6ICc8ZW0+Tm88L2VtPiBGbGFzaCcsXG4gICAgdGFnbGluZTogJ1RyYWNrIHN1bW1vbmVyIHNwZWxscycsXG4gICAgbG9hZGluZzogZmFsc2UsXG4gICAgZXJyb3I6ICcnLFxuICAgIHN1bW1vbmVyOiBzdG9yZS5nZXQoJ2FwcDpzdW1tb25lcicpIHx8ICcnLFxuICAgIHJlZ2lvbjogc3RvcmUuZ2V0KCdhcHA6cmVnaW9uJykgfHwgJydcbiAgfSxcbiAgZWZmZWN0czoge1xuICAgIHN1bW1vbmVyOiAoc3VtbW9uZXIsIHN0YXRlLCBzZW5kLCBkb25lKSA9PiB7XG4gICAgICBzdG9yZS5zZXQoJ2FwcDpzdW1tb25lcicsIHN1bW1vbmVyKVxuICAgICAgc2VuZCgnYXBwOnNldCcsIHsgc3VtbW9uZXIgfSwgZG9uZSlcbiAgICB9LFxuICAgIHJlZ2lvbjogKHJlZ2lvbiwgc3RhdGUsIHNlbmQsIGRvbmUpID0+IHtcbiAgICAgIHN0b3JlLnNldCgnYXBwOnJlZ2lvbicsIHJlZ2lvbilcbiAgICAgIHNlbmQoJ2FwcDpzZXQnLCB7IHJlZ2lvbiB9LCBkb25lKVxuICAgIH0sXG4gICAgbG9hZGluZzogKGRhdGEsIHN0YXRlLCBzZW5kLCBkb25lKSA9PiB7XG4gICAgICBzZW5kKCdhcHA6c2V0JywgeyBlcnJvcjogJycsIGxvYWRpbmc6IHRydWUgfSwgZG9uZSlcbiAgICB9LFxuICAgIGVycm9yOiAoZGF0YSwgc3RhdGUsIHNlbmQsIGRvbmUpID0+IHtcbiAgICAgIHNlbmQoJ2FwcDpzZXQnLCB7IGVycm9yOiBkYXRhLmVyciwgbG9hZGluZzogZmFsc2UgfSwgZG9uZSlcblxuICAgICAgY2xlYXJUaW1lb3V0KGVyclRpbWVvdXRJZClcbiAgICAgIGVyclRpbWVvdXRJZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzZW5kKCdhcHA6c2V0JywgeyBlcnJvcjogJycsIGxvYWRpbmc6IGZhbHNlIH0sIGRvbmUpXG4gICAgICB9LCAzMDAwKVxuICAgIH0sXG4gICAgY2xlYXI6IChkYXRhLCBzdGF0ZSwgc2VuZCwgZG9uZSkgPT4ge1xuICAgICAgc2VuZCgnYXBwOnNldCcsIHsgZXJyb3I6ICcnLCBsb2FkaW5nOiBmYWxzZSB9LCBkb25lKVxuICAgIH1cbiAgfSxcbiAgcmVkdWNlcnM6IHtcbiAgICBzZXQ6IChkYXRhLCBzdGF0ZSkgPT4geHRlbmQoc3RhdGUsIGRhdGEpXG4gIH1cbn1cbiIsImltcG9ydCB4dGVuZCBmcm9tICd4dGVuZCdcblxuY29uc3Qgc3BlbGxBdWRpbyA9IG5ldyBBdWRpbygnc291bmRzL3NwZWxsLm9nZycpXG5cbmxldCBudW1Db29sZG93bnMgPSAwXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZXNwYWNlOiAnZ2FtZScsXG4gIHN0YXRlOiB7XG4gICAgZW5uZW1pZXM6IFtdXG4gIH0sXG4gIGVmZmVjdHM6IHtcbiAgICBmZXRjaDogKG5hbWUsIHN0YXRlLCBzZW5kLCBkb25lKSA9PiB7XG4gICAgICBzZW5kKCdhcHA6bG9hZGluZycsICgpID0+IHtcbiAgICAgICAgc2VuZCgnYXBpOnN1bW1vbmVyJywgbmFtZSwgKGVyciwgc3VtbW9uZXIpID0+IHtcbiAgICAgICAgICBpZiAoZXJyKSByZXR1cm4gc2VuZCgnYXBwOmVycm9yJywgeyBlcnIgfSwgZG9uZSlcblxuICAgICAgICAgIHNlbmQoJ2FwaTplbm5lbWllcycsIHN1bW1vbmVyLCAoZXJyLCBlbm5lbWllcykgPT4ge1xuICAgICAgICAgICAgaWYgKGVycikgcmV0dXJuIHNlbmQoJ2FwcDplcnJvcicsIHsgZXJyIH0sIGRvbmUpXG5cbiAgICAgICAgICAgIHNlbmQoJ2dhbWU6ZW5uZW1pZXMnLCBlbm5lbWllcywgKCkgPT4ge1xuICAgICAgICAgICAgICBzZW5kKCdhcHA6Y2xlYXInLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgc2VuZCgnbG9jYXRpb246c2V0TG9jYXRpb24nLCB7IGxvY2F0aW9uOiAnL2luZ2FtZScgfSwgZG9uZSlcbiAgICAgICAgICAgICAgICBoaXN0b3J5LnB1c2hTdGF0ZSh7fSwgbnVsbCwgJy9pbmdhbWUnKVxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9LFxuICAgIGNvb2xkb3duOiAoc3BlbGwsIHN0YXRlLCBzZW5kLCBkb25lKSA9PiB7XG4gICAgICBpZiAoJ2Nvb2xkb3duJyAhPT0gc3BlbGwuc3RhdGUpIHtcbiAgICAgICAgbnVtQ29vbGRvd25zKytcbiAgICAgICAgc2VuZCgnZ2FtZTpzdGFydENvb2xkb3duJywgc3BlbGwudWlkLCBkb25lKVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHNlbmQoJ2dhbWU6ZGVjcmVtZW50Q29vbGRvd24nLCB7IHVpZDogc3BlbGwudWlkLCBhbW91bnQ6IDEwIH0sIGRvbmUpXG4gICAgICB9XG4gICAgfVxuICB9LFxuICByZWR1Y2Vyczoge1xuICAgIGVubmVtaWVzOiAoZW5uZW1pZXMsIHN0YXRlKSA9PiAoeyBlbm5lbWllcyB9KSxcbiAgICBzdGFydENvb2xkb3duOiAodWlkLCBzdGF0ZSkgPT4gKHtcbiAgICAgIGVubmVtaWVzOiBzdGF0ZS5lbm5lbWllcy5tYXAoZW5uZW15ID0+IHh0ZW5kKGVubmVteSwge1xuICAgICAgICBzcGVsbHM6IGVubmVteS5zcGVsbHMubWFwKHNwZWxsID0+IHtcbiAgICAgICAgICBpZiAoc3BlbGwudWlkID09PSB1aWQpIHtcbiAgICAgICAgICAgIHJldHVybiB4dGVuZCh7fSwgc3BlbGwsIHtcbiAgICAgICAgICAgICAgc3RhdGU6ICdjb29sZG93bicsXG4gICAgICAgICAgICAgIGNvb2xkb3duOiBzcGVsbC5yZWZDb29sZG93biAtIDFcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHNwZWxsXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSkpXG4gICAgfSksXG4gICAgZGVjcmVtZW50Q29vbGRvd246IChkYXRhLCBzdGF0ZSkgPT4gKHtcbiAgICAgIGVubmVtaWVzOiBzdGF0ZS5lbm5lbWllcy5tYXAoZW5uZW15ID0+IHh0ZW5kKGVubmVteSwge1xuICAgICAgICBzcGVsbHM6IGVubmVteS5zcGVsbHMubWFwKHNwZWxsID0+IHtcbiAgICAgICAgICBpZiAoJ2Nvb2xkb3duJyAhPT0gc3BlbGwuc3RhdGUpIHJldHVybiBzcGVsbFxuICAgICAgICAgIGlmIChkYXRhLnVpZCAmJiBzcGVsbC51aWQgIT09IGRhdGEudWlkKSByZXR1cm4gc3BlbGxcblxuICAgICAgICAgIGNvbnN0IG5ld1NwZWxsID0geHRlbmQoe30sIHNwZWxsLCB7XG4gICAgICAgICAgICBjb29sZG93bjogc3BlbGwuY29vbGRvd24gLSBkYXRhLmFtb3VudFxuICAgICAgICAgIH0pXG5cbiAgICAgICAgICBpZiAobmV3U3BlbGwuY29vbGRvd24gPD0gMCkge1xuICAgICAgICAgICAgbmV3U3BlbGwuY29vbGRvd24gPSAwXG4gICAgICAgICAgICBuZXdTcGVsbC5zdGF0ZSA9ICdhdmFpbGFibGUnXG4gICAgICAgICAgICBudW1Db29sZG93bnMtLVxuXG4gICAgICAgICAgICBzcGVsbEF1ZGlvLnBsYXkoKVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBuZXdTcGVsbFxuICAgICAgICB9KVxuICAgICAgfSkpXG4gICAgfSksXG4gICAgdG9nZ2xlRm9jdXM6IChkYXRhLCBzdGF0ZSkgPT4gKHtcbiAgICAgIGVubmVtaWVzOiBzdGF0ZS5lbm5lbWllcy5tYXAoZW5uZW15ID0+IHtcbiAgICAgICAgaWYgKGVubmVteS5uYW1lID09PSBkYXRhLm5hbWUpIHtcbiAgICAgICAgICByZXR1cm4geHRlbmQoe30sIGVubmVteSwgeyBmb2N1c2VkOiAhZW5uZW15LmZvY3VzZWQgfSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZW5uZW15XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSlcbiAgfSxcbiAgc3Vic2NyaXB0aW9uczoge1xuICAgIHRpY2s6IChzZW5kLCBkb25lKSA9PiB7XG4gICAgICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgIGlmICgwICE9PSBudW1Db29sZG93bnMpIHtcbiAgICAgICAgICBzZW5kKCdnYW1lOmRlY3JlbWVudENvb2xkb3duJywgeyBhbW91bnQ6IDEgfSwgZG9uZSlcbiAgICAgICAgfVxuICAgICAgfSwgMTAwMClcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBodG1sIGZyb20gJ2Nob28vaHRtbCdcbmltcG9ydCBlbm5lbXlMaXN0IGZyb20gJ34vdmlld3MvZW5uZW15LWxpc3QnXG5cbmV4cG9ydCBkZWZhdWx0IChzdGF0ZSwgcHJldiwgc2VuZCkgPT4gaHRtbGBcbiAgPG1haW4gY2xhc3M9XCJpbmdhbWUtcGFnZVwiPlxuICAgICR7ZW5uZW15TGlzdChzdGF0ZS5nYW1lLCBwcmV2LCBzZW5kKX1cbiAgPC9tYWluPlxuYFxuIiwiaW1wb3J0IGh0bWwgZnJvbSAnY2hvby9odG1sJ1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcydcbmltcG9ydCByZW5kZXJJZiBmcm9tICd+L2xpYi9yZW5kZXItaWYnXG5cbmNvbnN0IHJlZ2lvbnMgPSBbXG4gICdCUicsICdFVU5FJywgJ0VVVycsICdKUCcsICdLUicsICdMQU4nLCAnTEFTJywgJ05BJywgJ09DRScsICdQQkUnLCAnUlUnLCAnVFInXG5dXG5cbmNvbnN0IGhhbmRsZVN1Ym1pdCA9IChlLCBzdGF0ZSwgc2VuZCkgPT4ge1xuICBlLnByZXZlbnREZWZhdWx0KClcblxuICBpZiAoc3RhdGUuYXBwLnN1bW1vbmVyKSB7XG4gICAgc2VuZCgnZ2FtZTpmZXRjaCcsIHN0YXRlLmFwcC5zdW1tb25lcilcbiAgfVxuICBlbHNlIHtcbiAgICBzZW5kKCdhcHA6ZXJyb3InLCAnRW1wdHkgc3VtbW9uZXIgbmFtZScpXG4gIH1cbn1cblxuY29uc3QgaGFuZGxlSW5wdXQgPSAoZSwgc3RhdGUsIHNlbmQpID0+IHtcbiAgc2VuZCgnYXBwOnN1bW1vbmVyJywgZS50YXJnZXQudmFsdWUpXG59XG5cbmNvbnN0IGhhbmRsZUNoYW5nZSA9IChlLCBzdGF0ZSwgc2VuZCkgPT4ge1xuICBzZW5kKCdhcHA6cmVnaW9uJywgZS50YXJnZXQudmFsdWUpXG59XG5cbmNvbnN0IGNsYXNzVmFyaWFudHMgPSAoc3RhdGUpID0+IGNsYXNzbmFtZXMoe1xuICBbYC1sb2FkaW5nYF06IHN0YXRlLmFwcC5sb2FkaW5nXG59KVxuXG5jb25zdCByZW5kZXJSZWdpb24gPSAocmVnaW9uLCBzdGF0ZSkgPT4gaHRtbGBcbiAgPG9wdGlvbiAke3JlZ2lvbiA9PT0gc3RhdGUuYXBwLnJlZ2lvbiA/ICdzZWxlY3RlZCcgOiAnJ30+JHtyZWdpb259PC9vcHRpb24+XG5gXG5cbmNvbnN0IHJlbmRlckVycm9yID0gKGVycm9yKSA9PiBodG1sYFxuICA8ZGl2IGNsYXNzPVwiZXJyb3ItcGFuZVwiPiR7ZXJyb3J9PC9kaXY+XG5gXG5cbmV4cG9ydCBkZWZhdWx0IChzdGF0ZSwgcHJldiwgc2VuZCkgPT4gaHRtbGBcbiAgPG1haW4gY2xhc3M9XCJ3ZWxjb21lLXBhZ2VcIj5cbiAgICA8ZGl2IGNsYXNzPVwid2VsY29tZS1oZWFkZXJcIj5cbiAgICAgIDxoMSBjbGFzcz1cInRpdGxlXCI+PGVtPk5vPC9lbT5GbGFzaDwvaDE+XG4gICAgICA8YmxvY2txdW90ZSBjbGFzcz1cInRhZ2xpbmVcIj4ke3N0YXRlLmFwcC50YWdsaW5lfTwvYmxvY2txdW90ZT5cbiAgICA8L2Rpdj5cbiAgICA8Zm9ybSBjbGFzcz1cIndlbGNvbWUtZm9ybSAke2NsYXNzVmFyaWFudHMoc3RhdGUpfVwiXG4gICAgICBvbnN1Ym1pdD0ke2UgPT4gaGFuZGxlU3VibWl0KGUsIHN0YXRlLCBzZW5kKX19PlxuICAgICAgPGZpZWxkc2V0IGNsYXNzPVwiZmllbGRzZXRcIj5cbiAgICAgICAgPGxhYmVsIGNsYXNzPVwibGFiZWxcIj5cbiAgICAgICAgICBTdW1tb25lciBuYW1lXG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjbGFzcz1cImlucHV0XCJcbiAgICAgICAgICAgIHZhbHVlPSR7c3RhdGUuYXBwLnN1bW1vbmVyfVxuICAgICAgICAgICAgJHtzdGF0ZS5hcHAubG9hZGluZyA/ICdkaXNhYmxlZCcgOiAnJ31cbiAgICAgICAgICAgIG9uaW5wdXQ9JHtlID0+IGhhbmRsZUlucHV0KGUsIHN0YXRlLCBzZW5kKX0gLz5cbiAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgPHNlbGVjdCBjbGFzcz1cInJlZ2lvbnNcIiBvbmNoYW5nZT0ke2UgPT4gaGFuZGxlQ2hhbmdlKGUsIHN0YXRlLCBzZW5kKX0+XG4gICAgICAgICAgJHtyZWdpb25zLm1hcChyZWdpb24gPT4gcmVuZGVyUmVnaW9uKHJlZ2lvbiwgc3RhdGUpKX1cbiAgICAgICAgPC9zZWxlY3Q+XG4gICAgICA8L2ZpZWxkc2V0PlxuICAgICAgPGJ1dHRvbiBjbGFzcz1cInN1Ym1pdFwiPlN0YXJ0PC9idXR0b24+XG4gICAgPC9mb3JtPlxuICAgICR7cmVuZGVySWYoc3RhdGUuYXBwLmVycm9yLCBzdGF0ZS5hcHAuZXJyb3IsIHJlbmRlckVycm9yKX1cbiAgPC9tYWluPlxuYFxuIiwiaW1wb3J0IGh0bWwgZnJvbSAnY2hvby9odG1sJ1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcydcbmltcG9ydCBjbG9zZXN0IGZyb20gJ2Nsb3Nlc3QnXG5pbXBvcnQgc3BlbGxMaXN0IGZyb20gJy4vc3BlbGwtbGlzdCdcblxuY29uc3QgaGFuZGxlQ2xpY2sgPSAoZSwgZW5uZW15LCBzZW5kKSA9PiB7XG4gIGlmIChudWxsID09IGNsb3Nlc3QoZS50YXJnZXQsICcuc3BlbGwtaXRlbScsIHRydWUpKSB7XG4gICAgc2VuZCgnZ2FtZTp0b2dnbGVGb2N1cycsIGVubmVteSlcbiAgfVxufVxuXG5jb25zdCBjbGFzc1ZhcmlhbnRzID0gKGVubmVteSkgPT4gY2xhc3NuYW1lcyh7XG4gIFtgLWZvY3VzZWRgXTogZW5uZW15LmZvY3VzZWRcbn0pXG5cbmV4cG9ydCBkZWZhdWx0IChlbm5lbXksIHByZXYsIHNlbmQpID0+IGh0bWxgXG4gIDxsaSBjbGFzcz1cImVubmVteS1pdGVtICR7Y2xhc3NWYXJpYW50cyhlbm5lbXkpfVwiXG4gICAgb25jbGljaz0ke2UgPT4gaGFuZGxlQ2xpY2soZSwgZW5uZW15LCBzZW5kKX0+XG4gICAgPGRpdiBjbGFzcz1cImVubmVteS1tZXRhXCI+XG4gICAgICA8aDIgY2xhc3M9XCJjaGFtcGlvblwiPiR7ZW5uZW15LmNoYW1waW9uLm5hbWV9PC9oMj5cbiAgICA8L2Rpdj5cbiAgICAke3NwZWxsTGlzdChlbm5lbXksIHByZXYsIHNlbmQpfVxuICA8L2xpPlxuYFxuIiwiaW1wb3J0IGh0bWwgZnJvbSAnY2hvby9odG1sJ1xuaW1wb3J0IGNsb3Nlc3QgZnJvbSAnY2xvc2VzdCdcbmltcG9ydCBlbm5lbXlJdGVtIGZyb20gJy4vZW5uZW15LWl0ZW0nXG5cbmxldCBkcmFnSW5mb1xuXG5jb25zdCBpbmRleE9mID0gKGVsKSA9PiBBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKFxuICBlbC5wYXJlbnROb2RlLmNoaWxkTm9kZXMsIGVsKVxuXG5jb25zdCBoYW5kbGVEcmFnU3RhcnQgPSAoZSkgPT4ge1xuICBjb25zdCBsaXN0ID0gY2xvc2VzdChlLnRhcmdldCwgJy5lbm5lbXktbGlzdCcpXG4gIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgaGFuZGxlRHJhZ01vdmUpXG4gIGxpc3QuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGhhbmRsZURyYWdFbmQpXG5cbiAgY29uc3QgbGlzdEl0ZW0gPSBjbG9zZXN0KGUudGFyZ2V0LCAnLmVubmVteS1pdGVtJywgdHJ1ZSlcblxuICBkcmFnSW5mbyA9IHtcbiAgICBkcmFnZ2luZzogZmFsc2UsXG4gICAgc3RhcnQ6IGUuY2xpZW50WSxcbiAgICBpbmRleDogaW5kZXhPZihsaXN0SXRlbSksXG4gICAgbGlzdCxcbiAgICBsaXN0SXRlbVxuICB9XG59XG5cbmNvbnN0IGhhbmRsZURyYWdNb3ZlID0gKGUpID0+IHtcbiAgY29uc3QgeyBsaXN0LCBsaXN0SXRlbSB9ID0gZHJhZ0luZm9cblxuICBpZiAoIWRyYWdJbmZvLmRyYWdnaW5nICYmIE1hdGguYWJzKGUuY2xpZW50WSAtIGRyYWdJbmZvLnN0YXJ0KSA+IDEwKSB7XG4gICAgbGlzdEl0ZW0uY2xhc3NMaXN0LmFkZCgnLWRyYWdnaW5nJylcbiAgICBkcmFnSW5mby5kcmFnZ2luZyA9IHRydWVcbiAgfVxuXG4gIGlmIChkcmFnSW5mby5kcmFnZ2luZykge1xuICAgIGNvbnN0IGhvdmVyRWwgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGUuY2xpZW50WCwgZS5jbGllbnRZKVxuICAgIGNvbnN0IGhvdmVySXRlbSA9IGNsb3Nlc3QoZS50YXJnZXQsICcuZW5uZW15LWl0ZW0nLCB0cnVlKVxuXG4gICAgaWYgKG51bGwgIT0gaG92ZXJJdGVtKSB7XG4gICAgICBjb25zdCBkZXN0SW5kZXggPSBpbmRleE9mKGhvdmVySXRlbSlcbiAgICAgIGNvbnN0IGRlc3RJdGVtID0gaG92ZXJJdGVtLm5leHRFbGVtZW50U2libGluZ1xuXG4gICAgICBpZiAoZGVzdEluZGV4ICE9PSBkcmFnSW5mby5pbmRleCkge1xuICAgICAgICBsaXN0Lmluc2VydEJlZm9yZShsaXN0SXRlbSwgZGVzdEl0ZW0pXG4gICAgICAgIGRyYWdJbmZvLmluZGV4ID0gZGVzdEluZGV4XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGhhbmRsZURyYWdFbmQgPSAoZSkgPT4ge1xuICBjb25zdCB7IGxpc3QsIGxpc3RJdGVtIH0gPSBkcmFnSW5mb1xuXG4gIGxpc3RJdGVtLmNsYXNzTGlzdC5yZW1vdmUoJy1kcmFnZ2luZycpXG4gIGxpc3RJdGVtLnN0eWxlLnRyYW5zZm9ybSA9ICcnXG5cbiAgbGlzdC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBoYW5kbGVEcmFnTW92ZSlcbiAgbGlzdC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgaGFuZGxlRHJhZ0VuZClcbn1cblxuZXhwb3J0IGRlZmF1bHQgKGdhbWUsIHByZXYsIHNlbmQpID0+IGh0bWxgXG4gIDx1bCBjbGFzcz1cImVubmVteS1saXN0XCI+XG4gICAgJHtnYW1lLmVubmVtaWVzLm1hcChlbm5lbXkgPT4gZW5uZW15SXRlbShlbm5lbXksIHByZXYsIHNlbmQpKX1cbiAgPC91bD5cbmBcbiIsImltcG9ydCBodG1sIGZyb20gJ2Nob28vaHRtbCdcbmltcG9ydCBjbGFzc25hbWVzIGZyb20gJ2NsYXNzbmFtZXMnXG5pbXBvcnQgcmVuZGVySWYgZnJvbSAnfi9saWIvcmVuZGVyLWlmJ1xuXG5jb25zdCBoYW5kbGVDbGljayA9IChlLCBzcGVsbCwgc2VuZCkgPT4ge1xuICBzZW5kKCdnYW1lOmNvb2xkb3duJywgc3BlbGwpXG59XG5cbmNvbnN0IGNsYXNzVmFyaWFudHMgPSAoc3BlbGwpID0+IGNsYXNzbmFtZXMoe1xuICBbYC0ke3NwZWxsLmlkfWBdOiB0cnVlLFxuICBbYC0ke3NwZWxsLnN0YXRlfWBdOiB0cnVlLFxuICBbYC10aW1lNjBgXTogc3BlbGwuY29vbGRvd24gPD0gNjAgJiYgc3BlbGwuY29vbGRvd24gPiAzMCxcbiAgW2AtdGltZTMwYF06IHNwZWxsLmNvb2xkb3duIDw9IDMwICYmIHNwZWxsLmNvb2xkb3duID4gMFxufSlcblxuY29uc3QgZHJhd0Nvb2xkb3duUGllID0gKHNwZWxsKSA9PiB7XG4gIGNvbnN0IHIgPSA1MFxuICBjb25zdCB0ID0gMSAtIHNwZWxsLmNvb2xkb3duIC8gc3BlbGwucmVmQ29vbGRvd25cbiAgY29uc3QgYSA9IHQgKiBNYXRoLlBJICogMlxuICBjb25zdCBtID0gYSA+IE1hdGguUEkgPyAxIDogMFxuICBjb25zdCB4ID0gTWF0aC5zaW4oYSkgKiByXG4gIGNvbnN0IHkgPSBNYXRoLmNvcyhhKSAqIC1yXG5cbiAgcmV0dXJuIGh0bWxgXG4gICAgPGcgdHJhbnNmb3JtPSR7YHRyYW5zbGF0ZSgke3J9LCAke3J9KWB9XG4gICAgICBzdHJva2UtbGluZWNhcD1cInJvdW5kXCJcbiAgICAgIHZlY3Rvci1lZmZlY3Q9XCJub24tc2NhbGluZy1zdHJva2VcIj5cbiAgICAgIDxjaXJjbGUgY2xhc3M9XCJwcm9ncmVzcy1iZ1wiIGN4PVwiMFwiIGN5PVwiMFwiIHI9XCI1MFwiIC8+XG4gICAgICA8cGF0aCBjbGFzcz1cInByb2dyZXNzXCIgZD0ke2BNIDAgJHstcn0gQSAke3J9ICR7cn0gMSAke219IDEgJHt4fSAke3l9YH0+PC9wYXRoPlxuICAgIDwvZz5cbiAgYFxufVxuXG5jb25zdCByZW5kZXJDb29sZG93biA9IChzcGVsbCkgPT4gaHRtbGBcbiAgPHN2ZyBjbGFzcz1cImNvb2xkb3duXCJcbiAgICB2aWV3Qm94PVwiLTUgLTUgMTEwIDExMFwiPlxuICAgICR7ZHJhd0Nvb2xkb3duUGllKHNwZWxsKX1cbiAgPC9zdmc+XG5gXG5cbmV4cG9ydCBkZWZhdWx0IChzcGVsbCwgcHJldiwgc2VuZCkgPT4gaHRtbGBcbiAgPGxpXG4gICAgY2xhc3M9XCJzcGVsbC1pdGVtICR7Y2xhc3NWYXJpYW50cyhzcGVsbCl9XCJcbiAgICBvbmNsaWNrPSR7ZSA9PiBoYW5kbGVDbGljayhlLCBzcGVsbCwgc2VuZCl9PlxuICAgICR7cmVuZGVySWYoJ2Nvb2xkb3duJyA9PT0gc3BlbGwuc3RhdGUsIHNwZWxsLCByZW5kZXJDb29sZG93bil9XG4gICAgPHN2ZyBjbGFzcz1cImljb25cIj5cbiAgICAgIDx1c2UgeGxpbms6aHJlZj1cIiNzdmctJHtzcGVsbC5pZH1cIj5cbiAgICA8L3N2Zz5cbiAgPC9saT5cbmBcbiIsImltcG9ydCBodG1sIGZyb20gJ2Nob28vaHRtbCdcbmltcG9ydCBzcGVsbEl0ZW0gZnJvbSAnLi9zcGVsbC1pdGVtJ1xuXG5leHBvcnQgZGVmYXVsdCAoZW5uZW15LCBwcmV2LCBzZW5kKSA9PiBodG1sYFxuICA8dWwgY2xhc3M9XCJzcGVsbC1saXN0XCI+XG4gICAgJHtlbm5lbXkuc3BlbGxzLm1hcChzcGVsbCA9PiBzcGVsbEl0ZW0oc3BlbGwsIHByZXYsIHNlbmQpKX1cbiAgPC91bD5cbmBcbiJdfQ==
