(function () {
'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var choo = createCommonjsModule(function (module, exports) {
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof commonjsGlobal!=="undefined"){g=commonjsGlobal}else if(typeof self!=="undefined"){g=self}else{g=this}g.choo = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof commonjsRequire=="function"&&commonjsRequire;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof commonjsRequire=="function"&&commonjsRequire;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var history = require('sheet-router/history');
var sheetRouter = require('sheet-router');
var document = require('global/document');
var onReady = require('document-ready');
var href = require('sheet-router/href');
var hash = require('sheet-router/hash');
var hashMatch = require('hash-match');
var barracks = require('barracks');
var nanoraf = require('nanoraf');
var assert = require('assert');
var xtend = require('xtend');
var yo = require('yo-yo');

module.exports = choo;

// framework for creating sturdy web applications
// null -> fn
function choo(opts) {
  opts = opts || {};

  var _store = start._store = barracks();
  var _router = start._router = null;
  var _defaultRoute = null;
  var _rootNode = null;
  var _routes = null;
  var _frame = null;

  _store.use({ onStateChange: render });
  _store.use(opts);

  start.toString = toString;
  start.router = router;
  start.model = model;
  start.start = start;
  start.use = use;

  return start;

  // render the application to a string
  // (str, obj) -> str
  function toString(route, serverState) {
    serverState = serverState || {};
    assert.equal(typeof route, 'string', 'choo.app.toString: route must be a string');
    assert.equal(typeof serverState, 'object', 'choo.app.toString: serverState must be an object');
    _store.start({ subscriptions: false, reducers: false, effects: false });

    var state = _store.state({ state: serverState });
    var router = createRouter(_defaultRoute, _routes, createSend);
    var tree = router(route, state);
    return tree.outerHTML || tree.toString();

    function createSend() {
      return function send() {
        assert.ok(false, 'choo: send() cannot be called from Node');
      };
    }
  }

  // start the application
  // (str?, obj?) -> DOMNode
  function start(selector, startOpts) {
    if (!startOpts && typeof selector !== 'string') {
      startOpts = selector;
      selector = null;
    }
    startOpts = startOpts || {};

    _store.model(appInit(startOpts));
    var createSend = _store.start(startOpts);
    _router = start._router = createRouter(_defaultRoute, _routes, createSend);
    var state = _store.state({ state: {} });

    if (!selector) {
      var tree = _router(state.location.pathname, state);
      _rootNode = tree;
      return tree;
    } else {
      onReady(function onReady() {
        var oldTree = document.querySelector(selector);
        assert.ok(oldTree, 'could not query selector: ' + selector);
        var newTree = _router(state.location.pathname, state);
        _rootNode = yo.update(oldTree, newTree);
      });
    }
  }

  // update the DOM after every state mutation
  // (obj, obj, obj, str, fn) -> null
  function render(data, state, prev, name, createSend) {
    if (!_frame) {
      _frame = nanoraf(function (state, prev) {
        var newTree = _router(state.location.pathname, state, prev);
        _rootNode = yo.update(_rootNode, newTree);
      });
    }
    _frame(state, prev);
  }

  // register all routes on the router
  // (str?, [fn|[fn]]) -> obj
  function router(defaultRoute, routes) {
    _defaultRoute = defaultRoute;
    _routes = routes;
  }

  // create a new model
  // (str?, obj) -> null
  function model(model) {
    _store.model(model);
  }

  // register a plugin
  // (obj) -> null
  function use(hooks) {
    assert.equal(typeof hooks, 'object', 'choo.use: hooks should be an object');
    _store.use(hooks);
  }

  // create a new router with a custom `createRoute()` function
  // (str?, obj, fn?) -> null
  function createRouter(defaultRoute, routes, createSend) {
    var prev = { params: {} };
    return sheetRouter(defaultRoute, routes, createRoute);

    function createRoute(routeFn) {
      return function (route, inline, child) {
        if (typeof inline === 'function') {
          inline = wrap(inline, route);
        }
        return routeFn(route, inline, child);
      };

      function wrap(child, route) {
        var send = createSend('view: ' + route, true);
        return function chooWrap(params, state) {
          var nwPrev = prev;
          var nwState = prev = xtend(state, { params: params });
          if (opts.freeze !== false) Object.freeze(nwState);
          return child(nwState, nwPrev, send);
        };
      }
    }
  }
}

// initial application state model
// obj -> obj
function appInit(opts) {
  var loc = document.location;
  var state = { pathname: opts.hash ? hashMatch(loc.hash) : loc.href };
  var reducers = {
    setLocation: function setLocation(data, state) {
      return { pathname: data.location.replace(/#.*/, '') };
    }
  };
  // if hash routing explicitly enabled, subscribe to it
  var subs = {};
  if (opts.hash === true) {
    pushLocationSub(function (navigate) {
      hash(function (fragment) {
        navigate(hashMatch(fragment));
      });
    }, 'handleHash', subs);
  } else {
    if (opts.history !== false) pushLocationSub(history, 'handleHistory', subs);
    if (opts.href !== false) pushLocationSub(href, 'handleHref', subs);
  }

  return {
    namespace: 'location',
    subscriptions: subs,
    reducers: reducers,
    state: state
  };

  // create a new subscription that modifies
  // 'app:location' and push it to be loaded
  // (fn, obj) -> null
  function pushLocationSub(cb, key, model) {
    model[key] = function (send, done) {
      cb(function navigate(pathname) {
        send('location:setLocation', { location: pathname }, done);
      });
    };
  }
}
},{"assert":2,"barracks":4,"document-ready":7,"global/document":8,"hash-match":10,"nanoraf":13,"sheet-router":18,"sheet-router/hash":15,"sheet-router/history":16,"sheet-router/href":17,"xtend":23,"yo-yo":25}],2:[function(require,module,exports){
// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// when used in node, this will actually load the util module we depend on
// versus loading the builtin util module as happens otherwise
// this is a bug in node module loading as far as I am concerned
var util = require('util/');

var pSlice = Array.prototype.slice;
var hasOwn = Object.prototype.hasOwnProperty;

// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.

var assert = module.exports = ok;

// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
//                             actual: actual,
//                             expected: expected })

assert.AssertionError = function AssertionError(options) {
  this.name = 'AssertionError';
  this.actual = options.actual;
  this.expected = options.expected;
  this.operator = options.operator;
  if (options.message) {
    this.message = options.message;
    this.generatedMessage = false;
  } else {
    this.message = getMessage(this);
    this.generatedMessage = true;
  }
  var stackStartFunction = options.stackStartFunction || fail;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, stackStartFunction);
  } else {
    // non v8 browsers so we can have a stacktrace
    var err = new Error();
    if (err.stack) {
      var out = err.stack;

      // try to strip useless frames
      var fn_name = stackStartFunction.name;
      var idx = out.indexOf('\n' + fn_name);
      if (idx >= 0) {
        // once we have located the function frame
        // we need to strip out everything before it (and its line)
        var next_line = out.indexOf('\n', idx + 1);
        out = out.substring(next_line + 1);
      }

      this.stack = out;
    }
  }
};

// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);

function replacer(key, value) {
  if (util.isUndefined(value)) {
    return '' + value;
  }
  if (util.isNumber(value) && !isFinite(value)) {
    return value.toString();
  }
  if (util.isFunction(value) || util.isRegExp(value)) {
    return value.toString();
  }
  return value;
}

function truncate(s, n) {
  if (util.isString(s)) {
    return s.length < n ? s : s.slice(0, n);
  } else {
    return s;
  }
}

function getMessage(self) {
  return truncate(JSON.stringify(self.actual, replacer), 128) + ' ' + self.operator + ' ' + truncate(JSON.stringify(self.expected, replacer), 128);
}

// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.

// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided.  All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.

function fail(actual, expected, message, operator, stackStartFunction) {
  throw new assert.AssertionError({
    message: message,
    actual: actual,
    expected: expected,
    operator: operator,
    stackStartFunction: stackStartFunction
  });
}

// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;

// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.

function ok(value, message) {
  if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;

// 5. The equality assertion tests shallow, coercive equality with
// ==.
// assert.equal(actual, expected, message_opt);

assert.equal = function equal(actual, expected, message) {
  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};

// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);

assert.notEqual = function notEqual(actual, expected, message) {
  if (actual == expected) {
    fail(actual, expected, message, '!=', assert.notEqual);
  }
};

// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);

assert.deepEqual = function deepEqual(actual, expected, message) {
  if (!_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
  }
};

function _deepEqual(actual, expected) {
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (util.isBuffer(actual) && util.isBuffer(expected)) {
    if (actual.length != expected.length) return false;

    for (var i = 0; i < actual.length; i++) {
      if (actual[i] !== expected[i]) return false;
    }

    return true;

    // 7.2. If the expected value is a Date object, the actual value is
    // equivalent if it is also a Date object that refers to the same time.
  } else if (util.isDate(actual) && util.isDate(expected)) {
    return actual.getTime() === expected.getTime();

    // 7.3 If the expected value is a RegExp object, the actual value is
    // equivalent if it is also a RegExp object with the same source and
    // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
    return actual.source === expected.source && actual.global === expected.global && actual.multiline === expected.multiline && actual.lastIndex === expected.lastIndex && actual.ignoreCase === expected.ignoreCase;

    // 7.4. Other pairs that do not both pass typeof value == 'object',
    // equivalence is determined by ==.
  } else if (!util.isObject(actual) && !util.isObject(expected)) {
    return actual == expected;

    // 7.5 For all other Object pairs, including Array objects, equivalence is
    // determined by having the same number of owned properties (as verified
    // with Object.prototype.hasOwnProperty.call), the same set of keys
    // (although not necessarily the same order), equivalent values for every
    // corresponding key, and an identical 'prototype' property. Note: this
    // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected);
  }
}

function isArguments(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
}

function objEquiv(a, b) {
  if (util.isNullOrUndefined(a) || util.isNullOrUndefined(b)) return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  // if one is a primitive, the other must be same
  if (util.isPrimitive(a) || util.isPrimitive(b)) {
    return a === b;
  }
  var aIsArgs = isArguments(a),
      bIsArgs = isArguments(b);
  if (aIsArgs && !bIsArgs || !aIsArgs && bIsArgs) return false;
  if (aIsArgs) {
    a = pSlice.call(a);
    b = pSlice.call(b);
    return _deepEqual(a, b);
  }
  var ka = objectKeys(a),
      kb = objectKeys(b),
      key,
      i;
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length) return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i]) return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!_deepEqual(a[key], b[key])) return false;
  }
  return true;
}

// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);

assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
  if (_deepEqual(actual, expected)) {
    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
  }
};

// 9. The strict equality assertion tests strict equality, as determined by ===.
// assert.strictEqual(actual, expected, message_opt);

assert.strictEqual = function strictEqual(actual, expected, message) {
  if (actual !== expected) {
    fail(actual, expected, message, '===', assert.strictEqual);
  }
};

// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
  if (actual === expected) {
    fail(actual, expected, message, '!==', assert.notStrictEqual);
  }
};

function expectedException(actual, expected) {
  if (!actual || !expected) {
    return false;
  }

  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
    return expected.test(actual);
  } else if (actual instanceof expected) {
    return true;
  } else if (expected.call({}, actual) === true) {
    return true;
  }

  return false;
}

function _throws(shouldThrow, block, expected, message) {
  var actual;

  if (util.isString(expected)) {
    message = expected;
    expected = null;
  }

  try {
    block();
  } catch (e) {
    actual = e;
  }

  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') + (message ? ' ' + message : '.');

  if (shouldThrow && !actual) {
    fail(actual, expected, 'Missing expected exception' + message);
  }

  if (!shouldThrow && expectedException(actual, expected)) {
    fail(actual, expected, 'Got unwanted exception' + message);
  }

  if (shouldThrow && actual && expected && !expectedException(actual, expected) || !shouldThrow && actual) {
    throw actual;
  }
}

// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function (block, /*optional*/error, /*optional*/message) {
  _throws.apply(this, [true].concat(pSlice.call(arguments)));
};

// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function (block, /*optional*/message) {
  _throws.apply(this, [false].concat(pSlice.call(arguments)));
};

assert.ifError = function (err) {
  if (err) {
    throw err;
  }
};

var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    if (hasOwn.call(obj, key)) keys.push(key);
  }
  return keys;
};
},{"util/":20}],3:[function(require,module,exports){
module.exports = applyHook;

// apply arguments onto an array of functions, useful for hooks
// (arr, any?, any?, any?, any?, any?) -> null
function applyHook(arr, arg1, arg2, arg3, arg4, arg5) {
  arr.forEach(function (fn) {
    fn(arg1, arg2, arg3, arg4, arg5);
  });
}
},{}],4:[function(require,module,exports){
var mutate = require('xtend/mutable');
var assert = require('assert');
var xtend = require('xtend');

var applyHook = require('./apply-hook');

module.exports = dispatcher;

// initialize a new barracks instance
// obj -> obj
function dispatcher(hooks) {
  hooks = hooks || {};
  assert.equal(typeof hooks, 'object', 'barracks: hooks should be undefined or an object');

  var onStateChangeHooks = [];
  var onActionHooks = [];
  var onErrorHooks = [];

  var subscriptionWraps = [];
  var initialStateWraps = [];
  var reducerWraps = [];
  var effectWraps = [];

  use(hooks);

  var reducersCalled = false;
  var effectsCalled = false;
  var stateCalled = false;
  var subsCalled = false;

  var subscriptions = start._subscriptions = {};
  var reducers = start._reducers = {};
  var effects = start._effects = {};
  var models = start._models = [];
  var _state = {};

  start.model = setModel;
  start.state = getState;
  start.start = start;
  start.use = use;
  return start;

  // push an object of hooks onto an array
  // obj -> null
  function use(hooks) {
    assert.equal(typeof hooks, 'object', 'barracks.use: hooks should be an object');
    assert.ok(!hooks.onError || typeof hooks.onError === 'function', 'barracks.use: onError should be undefined or a function');
    assert.ok(!hooks.onAction || typeof hooks.onAction === 'function', 'barracks.use: onAction should be undefined or a function');
    assert.ok(!hooks.onStateChange || typeof hooks.onStateChange === 'function', 'barracks.use: onStateChange should be undefined or a function');

    if (hooks.onStateChange) onStateChangeHooks.push(hooks.onStateChange);
    if (hooks.onError) onErrorHooks.push(wrapOnError(hooks.onError));
    if (hooks.onAction) onActionHooks.push(hooks.onAction);
    if (hooks.wrapSubscriptions) subscriptionWraps.push(hooks.wrapSubscriptions);
    if (hooks.wrapInitialState) initialStateWraps.push(hooks.wrapInitialState);
    if (hooks.wrapReducers) reducerWraps.push(hooks.wrapReducers);
    if (hooks.wrapEffects) effectWraps.push(hooks.wrapEffects);
  }

  // push a model to be initiated
  // obj -> null
  function setModel(model) {
    assert.equal(typeof model, 'object', 'barracks.store.model: model should be an object');
    models.push(model);
  }

  // get the current state from the store
  // obj? -> obj
  function getState(opts) {
    opts = opts || {};
    assert.equal(typeof opts, 'object', 'barracks.store.state: opts should be an object');

    var state = opts.state;
    if (!opts.state && opts.freeze === false) return xtend(_state);else if (!opts.state) return Object.freeze(xtend(_state));
    assert.equal(typeof state, 'object', 'barracks.store.state: state should be an object');

    var namespaces = [];
    var newState = {};

    // apply all fields from the model, and namespaced fields from the passed
    // in state
    models.forEach(function (model) {
      var ns = model.namespace;
      namespaces.push(ns);
      var modelState = model.state || {};
      if (ns) {
        newState[ns] = newState[ns] || {};
        apply(ns, modelState, newState);
        newState[ns] = xtend(newState[ns], state[ns]);
      } else {
        mutate(newState, modelState);
      }
    });

    // now apply all fields that weren't namespaced from the passed in state
    Object.keys(state).forEach(function (key) {
      if (namespaces.indexOf(key) !== -1) return;
      newState[key] = state[key];
    });

    var tmpState = xtend(_state, xtend(state, newState));
    var wrappedState = wrapHook(tmpState, initialStateWraps);

    return opts.freeze === false ? wrappedState : Object.freeze(wrappedState);
  }

  // initialize the store hooks, get the send() function
  // obj? -> fn
  function start(opts) {
    opts = opts || {};
    assert.equal(typeof opts, 'object', 'barracks.store.start: opts should be undefined or an object');

    // register values from the models
    models.forEach(function (model) {
      var ns = model.namespace;
      if (!stateCalled && model.state && opts.state !== false) {
        var modelState = model.state || {};
        if (ns) {
          _state[ns] = _state[ns] || {};
          apply(ns, modelState, _state);
        } else {
          mutate(_state, modelState);
        }
      }
      if (!reducersCalled && model.reducers && opts.reducers !== false) {
        apply(ns, model.reducers, reducers, function (cb) {
          return wrapHook(cb, reducerWraps);
        });
      }
      if (!effectsCalled && model.effects && opts.effects !== false) {
        apply(ns, model.effects, effects, function (cb) {
          return wrapHook(cb, effectWraps);
        });
      }
      if (!subsCalled && model.subscriptions && opts.subscriptions !== false) {
        apply(ns, model.subscriptions, subscriptions, function (cb, key) {
          var send = createSend('subscription: ' + (ns ? ns + ':' + key : key));
          cb = wrapHook(cb, subscriptionWraps);
          cb(send, function (err) {
            applyHook(onErrorHooks, err);
          });
          return cb;
        });
      }
    });

    // the state wrap is special because we want to operate on the full
    // state rather than indvidual chunks, so we apply it outside the loop
    if (!stateCalled && opts.state !== false) {
      _state = wrapHook(_state, initialStateWraps);
    }

    if (!opts.noSubscriptions) subsCalled = true;
    if (!opts.noReducers) reducersCalled = true;
    if (!opts.noEffects) effectsCalled = true;
    if (!opts.noState) stateCalled = true;

    if (!onErrorHooks.length) onErrorHooks.push(wrapOnError(defaultOnError));

    return createSend;

    // call an action from a view
    // (str, bool?) -> (str, any?, fn?) -> null
    function createSend(selfName, callOnError) {
      assert.equal(typeof selfName, 'string', 'barracks.store.start.createSend: selfName should be a string');
      assert.ok(!callOnError || typeof callOnError === 'boolean', 'barracks.store.start.send: callOnError should be undefined or a boolean');

      return function send(name, data, cb) {
        if (!cb && !callOnError) {
          cb = data;
          data = null;
        }
        data = typeof data === 'undefined' ? null : data;

        assert.equal(typeof name, 'string', 'barracks.store.start.send: name should be a string');
        assert.ok(!cb || typeof cb === 'function', 'barracks.store.start.send: cb should be a function');

        var done = callOnError ? onErrorCallback : cb;
        _send(name, data, selfName, done);

        function onErrorCallback(err) {
          err = err || null;
          if (err) {
            applyHook(onErrorHooks, err, _state, function createSend(selfName) {
              return function send(name, data) {
                assert.equal(typeof name, 'string', 'barracks.store.start.send: name should be a string');
                data = typeof data === 'undefined' ? null : data;
                _send(name, data, selfName, done);
              };
            });
          }
        }
      };
    }

    // call an action
    // (str, str, any, fn) -> null
    function _send(name, data, caller, cb) {
      assert.equal(typeof name, 'string', 'barracks._send: name should be a string');
      assert.equal(typeof caller, 'string', 'barracks._send: caller should be a string');
      assert.equal(typeof cb, 'function', 'barracks._send: cb should be a function');

      setTimeout(function () {
        var reducersCalled = false;
        var effectsCalled = false;
        var newState = xtend(_state);

        if (onActionHooks.length) {
          applyHook(onActionHooks, data, _state, name, caller, createSend);
        }

        // validate if a namespace exists. Namespaces are delimited by ':'.
        var actionName = name;
        if (/:/.test(name)) {
          var arr = name.split(':');
          var ns = arr.shift();
          actionName = arr.join(':');
        }

        var _reducers = ns ? reducers[ns] : reducers;
        if (_reducers && _reducers[actionName]) {
          if (ns) {
            var reducedState = _reducers[actionName](data, _state[ns]);
            newState[ns] = xtend(_state[ns], reducedState);
          } else {
            mutate(newState, reducers[actionName](data, _state));
          }
          reducersCalled = true;
          if (onStateChangeHooks.length) {
            applyHook(onStateChangeHooks, data, newState, _state, actionName, createSend);
          }
          _state = newState;
          cb(null, newState);
        }

        var _effects = ns ? effects[ns] : effects;
        if (!reducersCalled && _effects && _effects[actionName]) {
          var send = createSend('effect: ' + name);
          if (ns) _effects[actionName](data, _state[ns], send, cb);else _effects[actionName](data, _state, send, cb);
          effectsCalled = true;
        }

        if (!reducersCalled && !effectsCalled) {
          throw new Error('Could not find action ' + actionName);
        }
      }, 0);
    }
  }
}

// compose an object conditionally
// optionally contains a namespace
// which is used to nest properties.
// (str, obj, obj, fn?) -> null
function apply(ns, source, target, wrap) {
  if (ns && !target[ns]) target[ns] = {};
  Object.keys(source).forEach(function (key) {
    var cb = wrap ? wrap(source[key], key) : source[key];
    if (ns) target[ns][key] = cb;else target[key] = cb;
  });
}

// handle errors all the way at the top of the trace
// err? -> null
function defaultOnError(err) {
  throw err;
}

function wrapOnError(onError) {
  return function onErrorWrap(err, state, createSend) {
    if (err) onError(err, state, createSend);
  };
}

// take a apply an array of transforms onto a value. The new value
// must be returned synchronously from the transform
// (any, [fn]) -> any
function wrapHook(value, transforms) {
  transforms.forEach(function (transform) {
    value = transform(value);
  });
  return value;
}
},{"./apply-hook":3,"assert":2,"xtend":23,"xtend/mutable":24}],5:[function(require,module,exports){

},{}],6:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

(function () {
    try {
        cachedSetTimeout = setTimeout;
    } catch (e) {
        cachedSetTimeout = function () {
            throw new Error('setTimeout is not defined');
        };
    }
    try {
        cachedClearTimeout = clearTimeout;
    } catch (e) {
        cachedClearTimeout = function () {
            throw new Error('clearTimeout is not defined');
        };
    }
})();
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = cachedSetTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    cachedClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        cachedSetTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};
},{}],7:[function(require,module,exports){
'use strict';

var document = require('global/document');

module.exports = document.addEventListener ? ready : noop;

function ready(callback) {
  if (document.readyState === 'complete') {
    return setTimeout(callback, 0);
  }

  document.addEventListener('DOMContentLoaded', function onLoad() {
    callback();
  });
}

function noop() {}
},{"global/document":8}],8:[function(require,module,exports){
(function (global){
var topLevel = typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : {};
var minDoc = require('min-document');

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}
}).call(this,typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"min-document":5}],9:[function(require,module,exports){
(function (global){
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof global !== "undefined") {
    module.exports = global;
} else if (typeof self !== "undefined") {
    module.exports = self;
} else {
    module.exports = {};
}
}).call(this,typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],10:[function(require,module,exports){
module.exports = function hashMatch(hash, prefix) {
  var pre = prefix || '/';
  if (hash.length === 0) return pre;
  hash = hash.replace('#', '');
  hash = hash.replace(/\/$/, '');
  if (hash.indexOf('/') != 0) hash = '/' + hash;
  if (pre == '/') return hash;else return hash.replace(pre, '');
};
},{}],11:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function () {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}
},{}],12:[function(require,module,exports){
// Create a range object for efficently rendering strings to elements.
var range;

var testEl = typeof document !== 'undefined' ? document.body || document.createElement('div') : {};

var XHTML = 'http://www.w3.org/1999/xhtml';
var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;

// Fixes <https://github.com/patrick-steele-idem/morphdom/issues/32>
// (IE7+ support) <=IE7 does not support el.hasAttribute(name)
var hasAttributeNS;

if (testEl.hasAttributeNS) {
    hasAttributeNS = function (el, namespaceURI, name) {
        return el.hasAttributeNS(namespaceURI, name);
    };
} else if (testEl.hasAttribute) {
    hasAttributeNS = function (el, namespaceURI, name) {
        return el.hasAttribute(name);
    };
} else {
    hasAttributeNS = function (el, namespaceURI, name) {
        return !!el.getAttributeNode(name);
    };
}

function empty(o) {
    for (var k in o) {
        if (o.hasOwnProperty(k)) {
            return false;
        }
    }
    return true;
}

function toElement(str) {
    if (!range && document.createRange) {
        range = document.createRange();
        range.selectNode(document.body);
    }

    var fragment;
    if (range && range.createContextualFragment) {
        fragment = range.createContextualFragment(str);
    } else {
        fragment = document.createElement('body');
        fragment.innerHTML = str;
    }
    return fragment.childNodes[0];
}

var specialElHandlers = {
    /**
     * Needed for IE. Apparently IE doesn't think that "selected" is an
     * attribute when reading over the attributes using selectEl.attributes
     */
    OPTION: function (fromEl, toEl) {
        fromEl.selected = toEl.selected;
        if (fromEl.selected) {
            fromEl.setAttribute('selected', '');
        } else {
            fromEl.removeAttribute('selected', '');
        }
    },
    /**
     * The "value" attribute is special for the <input> element since it sets
     * the initial value. Changing the "value" attribute without changing the
     * "value" property will have no effect since it is only used to the set the
     * initial value.  Similar for the "checked" attribute, and "disabled".
     */
    INPUT: function (fromEl, toEl) {
        fromEl.checked = toEl.checked;
        if (fromEl.checked) {
            fromEl.setAttribute('checked', '');
        } else {
            fromEl.removeAttribute('checked');
        }

        if (fromEl.value !== toEl.value) {
            fromEl.value = toEl.value;
        }

        if (!hasAttributeNS(toEl, null, 'value')) {
            fromEl.removeAttribute('value');
        }

        fromEl.disabled = toEl.disabled;
        if (fromEl.disabled) {
            fromEl.setAttribute('disabled', '');
        } else {
            fromEl.removeAttribute('disabled');
        }
    },

    TEXTAREA: function (fromEl, toEl) {
        var newValue = toEl.value;
        if (fromEl.value !== newValue) {
            fromEl.value = newValue;
        }

        if (fromEl.firstChild) {
            fromEl.firstChild.nodeValue = newValue;
        }
    }
};

function noop() {}

/**
 * Returns true if two node's names and namespace URIs are the same.
 *
 * @param {Element} a
 * @param {Element} b
 * @return {boolean}
 */
var compareNodeNames = function (a, b) {
    return a.nodeName === b.nodeName && a.namespaceURI === b.namespaceURI;
};

/**
 * Create an element, optionally with a known namespace URI.
 *
 * @param {string} name the element name, e.g. 'div' or 'svg'
 * @param {string} [namespaceURI] the element's namespace URI, i.e. the value of
 * its `xmlns` attribute or its inferred namespace.
 *
 * @return {Element}
 */
function createElementNS(name, namespaceURI) {
    return !namespaceURI || namespaceURI === XHTML ? document.createElement(name) : document.createElementNS(namespaceURI, name);
}

/**
 * Loop over all of the attributes on the target node and make sure the original
 * DOM node has the same attributes. If an attribute found on the original node
 * is not on the new node then remove it from the original node.
 *
 * @param  {Element} fromNode
 * @param  {Element} toNode
 */
function morphAttrs(fromNode, toNode) {
    var attrs = toNode.attributes;
    var i;
    var attr;
    var attrName;
    var attrNamespaceURI;
    var attrValue;
    var fromValue;

    for (i = attrs.length - 1; i >= 0; i--) {
        attr = attrs[i];
        attrName = attr.name;
        attrValue = attr.value;
        attrNamespaceURI = attr.namespaceURI;

        if (attrNamespaceURI) {
            attrName = attr.localName || attrName;
            fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);
        } else {
            fromValue = fromNode.getAttribute(attrName);
        }

        if (fromValue !== attrValue) {
            if (attrNamespaceURI) {
                fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
            } else {
                fromNode.setAttribute(attrName, attrValue);
            }
        }
    }

    // Remove any extra attributes found on the original DOM element that
    // weren't found on the target element.
    attrs = fromNode.attributes;

    for (i = attrs.length - 1; i >= 0; i--) {
        attr = attrs[i];
        if (attr.specified !== false) {
            attrName = attr.name;
            attrNamespaceURI = attr.namespaceURI;

            if (!hasAttributeNS(toNode, attrNamespaceURI, attrNamespaceURI ? attrName = attr.localName || attrName : attrName)) {
                if (attrNamespaceURI) {
                    fromNode.removeAttributeNS(attrNamespaceURI, attr.localName);
                } else {
                    fromNode.removeAttribute(attrName);
                }
            }
        }
    }
}

/**
 * Copies the children of one DOM element to another DOM element
 */
function moveChildren(fromEl, toEl) {
    var curChild = fromEl.firstChild;
    while (curChild) {
        var nextChild = curChild.nextSibling;
        toEl.appendChild(curChild);
        curChild = nextChild;
    }
    return toEl;
}

function defaultGetNodeKey(node) {
    return node.id;
}

function morphdom(fromNode, toNode, options) {
    if (!options) {
        options = {};
    }

    if (typeof toNode === 'string') {
        if (fromNode.nodeName === '#document' || fromNode.nodeName === 'HTML') {
            var toNodeHtml = toNode;
            toNode = document.createElement('html');
            toNode.innerHTML = toNodeHtml;
        } else {
            toNode = toElement(toNode);
        }
    }

    // XXX optimization: if the nodes are equal, don't morph them
    /*
    if (fromNode.isEqualNode(toNode)) {
      return fromNode;
    }
    */

    var savedEls = {}; // Used to save off DOM elements with IDs
    var unmatchedEls = {};
    var getNodeKey = options.getNodeKey || defaultGetNodeKey;
    var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
    var onNodeAdded = options.onNodeAdded || noop;
    var onBeforeElUpdated = options.onBeforeElUpdated || options.onBeforeMorphEl || noop;
    var onElUpdated = options.onElUpdated || noop;
    var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
    var onNodeDiscarded = options.onNodeDiscarded || noop;
    var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || options.onBeforeMorphElChildren || noop;
    var childrenOnly = options.childrenOnly === true;
    var movedEls = [];

    function removeNodeHelper(node, nestedInSavedEl) {
        var id = getNodeKey(node);
        // If the node has an ID then save it off since we will want
        // to reuse it in case the target DOM tree has a DOM element
        // with the same ID
        if (id) {
            savedEls[id] = node;
        } else if (!nestedInSavedEl) {
            // If we are not nested in a saved element then we know that this node has been
            // completely discarded and will not exist in the final DOM.
            onNodeDiscarded(node);
        }

        if (node.nodeType === ELEMENT_NODE) {
            var curChild = node.firstChild;
            while (curChild) {
                removeNodeHelper(curChild, nestedInSavedEl || id);
                curChild = curChild.nextSibling;
            }
        }
    }

    function walkDiscardedChildNodes(node) {
        if (node.nodeType === ELEMENT_NODE) {
            var curChild = node.firstChild;
            while (curChild) {

                if (!getNodeKey(curChild)) {
                    // We only want to handle nodes that don't have an ID to avoid double
                    // walking the same saved element.

                    onNodeDiscarded(curChild);

                    // Walk recursively
                    walkDiscardedChildNodes(curChild);
                }

                curChild = curChild.nextSibling;
            }
        }
    }

    function removeNode(node, parentNode, alreadyVisited) {
        if (onBeforeNodeDiscarded(node) === false) {
            return;
        }

        parentNode.removeChild(node);
        if (alreadyVisited) {
            if (!getNodeKey(node)) {
                onNodeDiscarded(node);
                walkDiscardedChildNodes(node);
            }
        } else {
            removeNodeHelper(node);
        }
    }

    function morphEl(fromEl, toEl, alreadyVisited, childrenOnly) {
        var toElKey = getNodeKey(toEl);
        if (toElKey) {
            // If an element with an ID is being morphed then it is will be in the final
            // DOM so clear it out of the saved elements collection
            delete savedEls[toElKey];
        }

        if (!childrenOnly) {
            if (onBeforeElUpdated(fromEl, toEl) === false) {
                return;
            }

            morphAttrs(fromEl, toEl);
            onElUpdated(fromEl);

            if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
                return;
            }
        }

        if (fromEl.nodeName !== 'TEXTAREA') {
            var curToNodeChild = toEl.firstChild;
            var curFromNodeChild = fromEl.firstChild;
            var curToNodeId;

            var fromNextSibling;
            var toNextSibling;
            var savedEl;
            var unmatchedEl;

            outer: while (curToNodeChild) {
                toNextSibling = curToNodeChild.nextSibling;
                curToNodeId = getNodeKey(curToNodeChild);

                while (curFromNodeChild) {
                    var curFromNodeId = getNodeKey(curFromNodeChild);
                    fromNextSibling = curFromNodeChild.nextSibling;

                    if (!alreadyVisited) {
                        if (curFromNodeId && (unmatchedEl = unmatchedEls[curFromNodeId])) {
                            unmatchedEl.parentNode.replaceChild(curFromNodeChild, unmatchedEl);
                            morphEl(curFromNodeChild, unmatchedEl, alreadyVisited);
                            curFromNodeChild = fromNextSibling;
                            continue;
                        }
                    }

                    var curFromNodeType = curFromNodeChild.nodeType;

                    if (curFromNodeType === curToNodeChild.nodeType) {
                        var isCompatible = false;

                        // Both nodes being compared are Element nodes
                        if (curFromNodeType === ELEMENT_NODE) {
                            if (compareNodeNames(curFromNodeChild, curToNodeChild)) {
                                // We have compatible DOM elements
                                if (curFromNodeId || curToNodeId) {
                                    // If either DOM element has an ID then we
                                    // handle those differently since we want to
                                    // match up by ID
                                    if (curToNodeId === curFromNodeId) {
                                        isCompatible = true;
                                    }
                                } else {
                                    isCompatible = true;
                                }
                            }

                            if (isCompatible) {
                                // We found compatible DOM elements so transform
                                // the current "from" node to match the current
                                // target DOM node.
                                morphEl(curFromNodeChild, curToNodeChild, alreadyVisited);
                            }
                            // Both nodes being compared are Text or Comment nodes
                        } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                            isCompatible = true;
                            // Simply update nodeValue on the original node to
                            // change the text value
                            curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                        }

                        if (isCompatible) {
                            curToNodeChild = toNextSibling;
                            curFromNodeChild = fromNextSibling;
                            continue outer;
                        }
                    }

                    // No compatible match so remove the old node from the DOM
                    // and continue trying to find a match in the original DOM
                    removeNode(curFromNodeChild, fromEl, alreadyVisited);
                    curFromNodeChild = fromNextSibling;
                }

                if (curToNodeId) {
                    if (savedEl = savedEls[curToNodeId]) {
                        if (compareNodeNames(savedEl, curToNodeChild)) {
                            morphEl(savedEl, curToNodeChild, true);
                            // We want to append the saved element instead
                            curToNodeChild = savedEl;
                        } else {
                            delete savedEls[curToNodeId];
                            onNodeDiscarded(savedEl);
                        }
                    } else {
                        // The current DOM element in the target tree has an ID
                        // but we did not find a match in any of the
                        // corresponding siblings. We just put the target
                        // element in the old DOM tree but if we later find an
                        // element in the old DOM tree that has a matching ID
                        // then we will replace the target element with the
                        // corresponding old element and morph the old element
                        unmatchedEls[curToNodeId] = curToNodeChild;
                    }
                }

                // If we got this far then we did not find a candidate match for
                // our "to node" and we exhausted all of the children "from"
                // nodes. Therefore, we will just append the current "to node"
                // to the end
                if (onBeforeNodeAdded(curToNodeChild) !== false) {
                    fromEl.appendChild(curToNodeChild);
                    onNodeAdded(curToNodeChild);
                }

                if (curToNodeChild.nodeType === ELEMENT_NODE && (curToNodeId || curToNodeChild.firstChild)) {
                    // The element that was just added to the original DOM may
                    // have some nested elements with a key/ID that needs to be
                    // matched up with other elements. We'll add the element to
                    // a list so that we can later process the nested elements
                    // if there are any unmatched keyed elements that were
                    // discarded
                    movedEls.push(curToNodeChild);
                }

                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
            }

            // We have processed all of the "to nodes". If curFromNodeChild is
            // non-null then we still have some from nodes left over that need
            // to be removed
            while (curFromNodeChild) {
                fromNextSibling = curFromNodeChild.nextSibling;
                removeNode(curFromNodeChild, fromEl, alreadyVisited);
                curFromNodeChild = fromNextSibling;
            }
        }

        var specialElHandler = specialElHandlers[fromEl.nodeName];
        if (specialElHandler) {
            specialElHandler(fromEl, toEl);
        }
    } // END: morphEl(...)

    var morphedNode = fromNode;
    var morphedNodeType = morphedNode.nodeType;
    var toNodeType = toNode.nodeType;

    if (!childrenOnly) {
        // Handle the case where we are given two DOM nodes that are not
        // compatible (e.g. <div> --> <span> or <div> --> TEXT)
        if (morphedNodeType === ELEMENT_NODE) {
            if (toNodeType === ELEMENT_NODE) {
                if (!compareNodeNames(fromNode, toNode)) {
                    onNodeDiscarded(fromNode);
                    morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
                }
            } else {
                // Going from an element node to a text node
                morphedNode = toNode;
            }
        } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) {
            // Text or comment node
            if (toNodeType === morphedNodeType) {
                morphedNode.nodeValue = toNode.nodeValue;
                return morphedNode;
            } else {
                // Text node to something else
                morphedNode = toNode;
            }
        }
    }

    if (morphedNode === toNode) {
        // The "to node" was not compatible with the "from node" so we had to
        // toss out the "from node" and use the "to node"
        onNodeDiscarded(fromNode);
    } else {
        morphEl(morphedNode, toNode, false, childrenOnly);

        /**
         * What we will do here is walk the tree for the DOM element that was
         * moved from the target DOM tree to the original DOM tree and we will
         * look for keyed elements that could be matched to keyed elements that
         * were earlier discarded.  If we find a match then we will move the
         * saved element into the final DOM tree.
         */
        var handleMovedEl = function (el) {
            var curChild = el.firstChild;
            while (curChild) {
                var nextSibling = curChild.nextSibling;

                var key = getNodeKey(curChild);
                if (key) {
                    var savedEl = savedEls[key];
                    if (savedEl && compareNodeNames(curChild, savedEl)) {
                        curChild.parentNode.replaceChild(savedEl, curChild);
                        // true: already visited the saved el tree
                        morphEl(savedEl, curChild, true);
                        curChild = nextSibling;
                        if (empty(savedEls)) {
                            return false;
                        }
                        continue;
                    }
                }

                if (curChild.nodeType === ELEMENT_NODE) {
                    handleMovedEl(curChild);
                }

                curChild = nextSibling;
            }
        };

        // The loop below is used to possibly match up any discarded
        // elements in the original DOM tree with elemenets from the
        // target tree that were moved over without visiting their
        // children
        if (!empty(savedEls)) {
            handleMovedElsLoop: while (movedEls.length) {
                var movedElsTemp = movedEls;
                movedEls = [];
                for (var i = 0; i < movedElsTemp.length; i++) {
                    if (handleMovedEl(movedElsTemp[i]) === false) {
                        // There are no more unmatched elements so completely end
                        // the loop
                        break handleMovedElsLoop;
                    }
                }
            }
        }

        // Fire the "onNodeDiscarded" event for any saved elements
        // that never found a new home in the morphed DOM
        for (var savedElId in savedEls) {
            if (savedEls.hasOwnProperty(savedElId)) {
                var savedEl = savedEls[savedElId];
                onNodeDiscarded(savedEl);
                walkDiscardedChildNodes(savedEl);
            }
        }
    }

    if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
        // If we had to swap out the from node with a new node because the old
        // node was not compatible with the target node then we need to
        // replace the old DOM node in the original DOM tree. This is only
        // possible if the original DOM node was part of a DOM tree which
        // we know is the case if it has a parent node.
        fromNode.parentNode.replaceChild(morphedNode, fromNode);
    }

    return morphedNode;
}

module.exports = morphdom;
},{}],13:[function(require,module,exports){
var window = require('global/window');
var assert = require('assert');

module.exports = nanoraf;

// Only call RAF when needed
// (fn, fn?) -> fn
function nanoraf(render, raf) {
  assert.equal(typeof render, 'function', 'nanoraf: render should be a function');
  assert.ok(typeof raf === 'function' || typeof raf === 'undefined', 'nanoraf: raf should be a function or undefined');

  if (!raf) {
    raf = window.requestAnimationFrame;
  }

  var inRenderingTransaction = false;
  var redrawScheduled = false;
  var currentState = null;

  // pass new state to be rendered
  // (obj, obj?) -> null
  return function frame(state, prev) {
    assert.equal(typeof state, 'object', 'nanoraf: state should be an object');
    assert.equal(typeof prev, 'object', 'nanoraf: prev should be an object');
    assert.equal(inRenderingTransaction, false, 'nanoraf: infinite loop detected');

    // request a redraw for next frame
    if (currentState === null && !redrawScheduled) {
      redrawScheduled = true;

      raf(function redraw() {
        redrawScheduled = false;
        if (!currentState) return;

        inRenderingTransaction = true;
        render(currentState, prev);
        inRenderingTransaction = false;

        currentState = null;
      });
    }

    // update data for redraw
    currentState = state;
  };
}
},{"assert":2,"global/window":9}],14:[function(require,module,exports){
var assert = require('assert');

module.exports = match;

// get url path section from a url
// strip querystrings / hashes
// strip protocol
// strip hostname and port (both ip and route)
// str -> str
function match(route) {
  assert.equal(typeof route, 'string');

  return route.trim().replace(/[\?|#].*$/, '').replace(/^(?:https?\:)\/\//, '').replace(/^(?:[\w+(?:-\w+)+.])+(?:[\:0-9]{4,5})?/, '').replace(/\/$/, '');
}
},{"assert":2}],15:[function(require,module,exports){
var window = require('global/window');
var assert = require('assert');

module.exports = hash;

// listen to window hashchange events
// and update router accordingly
// fn(cb) -> null
function hash(cb) {
  assert.equal(typeof cb, 'function', 'cb must be a function');
  window.onhashchange = function (e) {
    cb(window.location.hash);
  };
}
},{"assert":2,"global/window":9}],16:[function(require,module,exports){
var document = require('global/document');
var window = require('global/window');
var assert = require('assert');

module.exports = history;

// listen to html5 pushstate events
// and update router accordingly
// fn(str) -> null
function history(cb) {
  assert.equal(typeof cb, 'function', 'cb must be a function');
  window.onpopstate = function () {
    cb(document.location.href);
  };
}
},{"assert":2,"global/document":8,"global/window":9}],17:[function(require,module,exports){
var window = require('global/window');
var assert = require('assert');

module.exports = href;

// handle a click if is anchor tag with an href
// and url lives on the same domain. Replaces
// trailing '#' so empty links work as expected.
// fn(str) -> null
function href(cb) {
  assert.equal(typeof cb, 'function', 'cb must be a function');

  window.onclick = function (e) {
    var node = function traverse(node) {
      if (!node) return;
      if (node.localName !== 'a') return traverse(node.parentNode);
      if (node.href === undefined) return traverse(node.parentNode);
      if (window.location.host !== node.host) return traverse(node.parentNode);
      return node;
    }(e.target);

    if (!node) return;

    e.preventDefault();
    var href = node.href.replace(/#$/, '');
    cb(href);
    window.history.pushState({}, null, href);
  };
}
},{"assert":2,"global/window":9}],18:[function(require,module,exports){
var pathname = require('pathname-match');
var wayfarer = require('wayfarer');
var assert = require('assert');

module.exports = sheetRouter;

// Fast, modular client router
// fn(str, any[..], fn?) -> fn(str, any[..])
function sheetRouter(dft, createTree, createRoute) {
  createRoute = createRoute ? createRoute(_createRoute) : _createRoute;

  if (!createTree) {
    createTree = dft;
    dft = '';
  }

  assert.equal(typeof dft, 'string', 'sheet-router: dft must be a string');
  assert.equal(typeof createTree, 'function', 'sheet-router: createTree must be a function');
  assert.equal(typeof createRoute, 'function', 'sheet-router: createRoute must be a function');

  var router = wayfarer(dft);
  var tree = createTree(createRoute)

  // register tree in router
  ;(function walk(tree, route) {
    if (Array.isArray(tree[0])) {
      // walk over all routes at the root of the tree
      tree.forEach(function (node) {
        walk(node, route);
      });
    } else if (tree[1]) {
      // handle inline functions as args
      var innerRoute = tree[0] ? route.concat(tree[0]).join('/') : route.length ? route.join('/') : tree[0];
      router.on(innerRoute, tree[1]);
      walk(tree[2], route.concat(tree[0]));
    } else if (Array.isArray(tree[2])) {
      // traverse and append route
      walk(tree[2], route.concat(tree[0]));
    } else {
      // register path in router
      var nwRoute = tree[0] ? route.concat(tree[0]).join('/') : route.length ? route.join('/') : tree[0];
      router.on(nwRoute, tree[2]);
    }
  })(tree, []);

  // match a route on the router
  return function match(route) {
    assert.equal(typeof route, 'string', 'route must be a string');
    var args = [].slice.call(arguments);
    args[0] = pathname(args[0]);
    return router.apply(null, args);
  };
}

// register regular route
function _createRoute(route, inline, child) {
  if (!child) {
    child = inline;
    inline = null;
  }
  assert.equal(typeof route, 'string', 'route must be a string');
  assert.ok(child, 'child exists');
  route = route.replace(/^\//, '');
  return [route, inline, child];
}
},{"assert":2,"pathname-match":14,"wayfarer":21}],19:[function(require,module,exports){
module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
};
},{}],20:[function(require,module,exports){
(function (process,global){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function (f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function (x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s':
        return String(args[i++]);
      case '%d':
        return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};

// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function (fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function () {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};

var debugs = {};
var debugEnviron;
exports.debuglog = function (set) {
  if (isUndefined(debugEnviron)) debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function () {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function () {};
    }
  }
  return debugs[set];
};

/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;

// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold': [1, 22],
  'italic': [3, 23],
  'underline': [4, 24],
  'inverse': [7, 27],
  'white': [37, 39],
  'grey': [90, 39],
  'black': [30, 39],
  'blue': [34, 39],
  'cyan': [36, 39],
  'green': [32, 39],
  'magenta': [35, 39],
  'red': [31, 39],
  'yellow': [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};

function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}

function stylizeNoColor(str, styleType) {
  return str;
}

function arrayToHash(array) {
  var hash = {};

  array.forEach(function (val, idx) {
    hash[val] = true;
  });

  return hash;
}

function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect && value && isFunction(value.inspect) &&
  // Filter out the util module, it's inspect function is special
  value.inspect !== exports.inspect &&
  // Also filter out any prototype objects using the circular check.
  !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '',
      array = false,
      braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function (key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}

function formatPrimitive(ctx, value) {
  if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value)) return ctx.stylize('' + value, 'number');
  if (isBoolean(value)) return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value)) return ctx.stylize('null', 'null');
}

function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}

function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function (key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
    }
  });
  return output;
}

function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function (line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function (line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}

function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function (prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || // ES6 symbol
  typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('./support/isBuffer');

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}

// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function () {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};

/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = require('inherits');

exports._extend = function (origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
}).call(this,require('_process'),typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./support/isBuffer":19,"_process":6,"inherits":11}],21:[function(require,module,exports){
var assert = require('assert');
var trie = require('./trie');

module.exports = Wayfarer;

// create a router
// str -> obj
function Wayfarer(dft) {
  if (!(this instanceof Wayfarer)) return new Wayfarer(dft);

  var _default = (dft || '').replace(/^\//, '');
  var _trie = trie();

  emit._trie = _trie;
  emit.emit = emit;
  emit.on = on;
  emit._wayfarer = true;

  return emit;

  // define a route
  // (str, fn) -> obj
  function on(route, cb) {
    assert.equal(typeof route, 'string');
    assert.equal(typeof cb, 'function');

    route = route || '/';

    if (cb && cb._wayfarer && cb._trie) {
      _trie.mount(route, cb._trie.trie);
    } else {
      var node = _trie.create(route);
      node.cb = cb;
    }

    return emit;
  }

  // match and call a route
  // (str, obj?) -> null
  function emit(route) {
    assert.notEqual(route, undefined, "'route' must be defined");
    var args = Array.prototype.slice.apply(arguments);

    var node = _trie.match(route);
    if (node && node.cb) {
      args[0] = node.params;
      return node.cb.apply(null, args);
    }

    var dft = _trie.match(_default);
    if (dft && dft.cb) {
      args[0] = dft.params;
      return dft.cb.apply(null, args);
    }

    throw new Error("route '" + route + "' did not match");
  }
}
},{"./trie":22,"assert":2}],22:[function(require,module,exports){
var mutate = require('xtend/mutable');
var assert = require('assert');
var xtend = require('xtend');

module.exports = Trie;

// create a new trie
// null -> obj
function Trie() {
  if (!(this instanceof Trie)) return new Trie();
  this.trie = { nodes: {} };
}

// create a node on the trie at route
// and return a node
// str -> null
Trie.prototype.create = function (route) {
  assert.equal(typeof route, 'string', 'route should be a string');
  // strip leading '/' and split routes
  var routes = route.replace(/^\//, '').split('/');
  return function createNode(index, trie, routes) {
    var route = routes[index];

    if (route === undefined) return trie;

    var node = null;
    if (/^:/.test(route)) {
      // if node is a name match, set name and append to ':' node
      if (!trie.nodes['$$']) {
        node = { nodes: {} };
        trie.nodes['$$'] = node;
      } else {
        node = trie.nodes['$$'];
      }
      trie.name = route.replace(/^:/, '');
    } else if (!trie.nodes[route]) {
      node = { nodes: {} };
      trie.nodes[route] = node;
    } else {
      node = trie.nodes[route];
    }

    // we must recurse deeper
    return createNode(index + 1, node, routes);
  }(0, this.trie, routes);
};

// match a route on the trie
// and return the node
// str -> obj
Trie.prototype.match = function (route) {
  assert.equal(typeof route, 'string', 'route should be a string');

  var routes = route.replace(/^\//, '').split('/');
  var params = {};

  var node = function search(index, trie) {
    // either there's no match, or we're done searching
    if (trie === undefined) return undefined;
    var route = routes[index];
    if (route === undefined) return trie;

    if (trie.nodes[route]) {
      // match regular routes first
      return search(index + 1, trie.nodes[route]);
    } else if (trie.name) {
      // match named routes
      params[trie.name] = route;
      return search(index + 1, trie.nodes['$$']);
    } else {
      // no matches found
      return search(index + 1);
    }
  }(0, this.trie);

  if (!node) return undefined;
  node = xtend(node);
  node.params = params;
  return node;
};

// mount a trie onto a node at route
// (str, obj) -> null
Trie.prototype.mount = function (route, trie) {
  assert.equal(typeof route, 'string', 'route should be a string');
  assert.equal(typeof trie, 'object', 'trie should be a object');

  var split = route.replace(/^\//, '').split('/');
  var node = null;
  var key = null;

  if (split.length === 1) {
    key = split[0];
    node = this.create(key);
  } else {
    var headArr = split.splice(0, split.length - 1);
    var head = headArr.join('/');
    key = split[0];
    node = this.create(head);
  }

  mutate(node.nodes, trie.nodes);
  if (trie.name) node.name = trie.name;

  // delegate properties from '/' to the new node
  // '/' cannot be reached once mounted
  if (node.nodes['']) {
    Object.keys(node.nodes['']).forEach(function (key) {
      if (key === 'nodes') return;
      node[key] = node.nodes[''][key];
    });
    mutate(node.nodes, node.nodes[''].nodes);
    delete node.nodes[''].nodes;
  }
};
},{"assert":2,"xtend":23,"xtend/mutable":24}],23:[function(require,module,exports){
module.exports = extend;

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {};

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }

    return target;
}
},{}],24:[function(require,module,exports){
module.exports = extend;

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }

    return target;
}
},{}],25:[function(require,module,exports){
var bel = {}; // turns template tag into DOM elements
var morphdom = require('morphdom'); // efficiently diffs + morphs two DOM elements
var defaultEvents = require('./update-events.js'); // default events to be copied when dom elements update

module.exports = bel;

// TODO move this + defaultEvents to a new module once we receive more feedback
module.exports.update = function (fromNode, toNode, opts) {
  if (!opts) opts = {};
  if (opts.events !== false) {
    if (!opts.onBeforeMorphEl) opts.onBeforeMorphEl = copier;
  }

  return morphdom(fromNode, toNode, opts);

  // morphdom only copies attributes. we decided we also wanted to copy events
  // that can be set via attributes
  function copier(f, t) {
    // copy events:
    var events = opts.events || defaultEvents;
    for (var i = 0; i < events.length; i++) {
      var ev = events[i];
      if (t[ev]) {
        // if new element has a whitelisted attribute
        f[ev] = t[ev]; // update existing element
      } else if (f[ev]) {
        // if existing element has it and new one doesnt
        f[ev] = undefined; // remove it from existing element
      }
    }
    // copy values for form elements
    if (f.nodeName === 'INPUT' && f.type !== 'file' || f.nodeName === 'TEXTAREA' || f.nodeName === 'SELECT') {
      if (t.getAttribute('value') === null) t.value = f.value;
    }
  }
};
},{"./update-events.js":26,"morphdom":12}],26:[function(require,module,exports){
module.exports = [
// attribute events (can be set with attributes)
'onclick', 'ondblclick', 'onmousedown', 'onmouseup', 'onmouseover', 'onmousemove', 'onmouseout', 'ondragstart', 'ondrag', 'ondragenter', 'ondragleave', 'ondragover', 'ondrop', 'ondragend', 'onkeydown', 'onkeypress', 'onkeyup', 'onunload', 'onabort', 'onerror', 'onresize', 'onscroll', 'onselect', 'onchange', 'onsubmit', 'onreset', 'onfocus', 'onblur', 'oninput',
// other common events
'oncontextmenu', 'onfocusin', 'onfocusout'];
},{}]},{},[1])(1)
});
});

const error = (data, state) => {
  return { error: data };
};

var appModel = {
  namespace: 'app',
  state: {
    title: 'No Flash',
    tagline: 'Track summoner spells',
    error: ''
  },
  reducers: { error }
};

var immutable = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

const decrementCooldown = (spell, amount) => {
  const newSpell = immutable({}, spell, { cooldown: spell.cooldown - amount });
  if (newSpell.cooldown <= 0) {
    newSpell.cooldown = 0;
    newSpell.state = 'available';
  }
  return newSpell;
};

const summoner = (data, state) => ({ summoner: data });

const ennemies = (data, state) => ({ ennemies: data });

const updateSpell = (data, state) => ({
  ennemies: state.ennemies.map(ennemy => {
    ennemy.spells = ennemy.spells.map(spell => {
      if (spell.uid === data.uid) {
        return immutable({}, spell, data);
      }
      return spell;
    });
    return ennemy;
  })
});

const decrementSpellCooldown = (data, state) => ({
  ennemies: state.ennemies.map(ennemy => {
    ennemy.spells = ennemy.spells.map(spell => {
      if (spell.uid === data.uid && 'cooldown' === spell.state) {
        return decrementCooldown(spell, data.amount);
      }
      return spell;
    });
    return ennemy;
  })
});

const decrementAllSpellsCooldown = (amount, state) => ({
  ennemies: state.ennemies.map(ennemy => {
    ennemy.spells = ennemy.spells.map(spell => {
      if ('cooldown' === spell.state) {
        return decrementCooldown(spell, amount);
      }
      return spell;
    });
    return ennemy;
  })
});

var reducers = Object.freeze({
  summoner: summoner,
  ennemies: ennemies,
  updateSpell: updateSpell,
  decrementSpellCooldown: decrementSpellCooldown,
  decrementAllSpellsCooldown: decrementAllSpellsCooldown
});

(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var list = this.map[name]
    if (!list) {
      list = []
      this.map[name] = list
    }
    list.push(value)
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    var values = this.map[normalizeName(name)]
    return values ? values[0] : null
  }

  Headers.prototype.getAll = function(name) {
    return this.map[normalizeName(name)] || []
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)]
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this)
      }, this)
    }, this)
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    reader.readAsArrayBuffer(blob)
    return fileReaderReady(reader)
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    reader.readAsText(blob)
    return fileReaderReady(reader)
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (!body) {
        this._bodyText = ''
      } else if (support.arrayBuffer && ArrayBuffer.prototype.isPrototypeOf(body)) {
        // Only support ArrayBuffers for POST method.
        // Receiving ArrayBuffers happens via Blobs, instead.
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        return this.blob().then(readBlobAsArrayBuffer)
      }

      this.text = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return readBlobAsText(this._bodyBlob)
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as text')
        } else {
          return Promise.resolve(this._bodyText)
        }
      }
    } else {
      this.text = function() {
        var rejected = consumed(this)
        return rejected ? rejected : Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body
    if (Request.prototype.isPrototypeOf(input)) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    } else {
      this.url = input
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this)
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function headers(xhr) {
    var head = new Headers()
    var pairs = (xhr.getAllResponseHeaders() || '').trim().split('\n')
    pairs.forEach(function(header) {
      var split = header.trim().split(':')
      var key = split.shift().trim()
      var value = split.join(':').trim()
      head.append(key, value)
    })
    return head
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = options.status
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = options.statusText
    this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input
      } else {
        request = new Request(input, init)
      }

      var xhr = new XMLHttpRequest()

      function responseURL() {
        if ('responseURL' in xhr) {
          return xhr.responseURL
        }

        // Avoid security warnings on getResponseHeader when not allowed by CORS
        if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
          return xhr.getResponseHeader('X-Request-URL')
        }

        return
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: headers(xhr),
          url: responseURL()
        }
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : undefined);

var champions = [
  {
    "id": "aatrox",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Aatrox.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 0,
      "y": 0
    },
    "description": "Aatrox is a legendary warrior, one of only five that remain of an ancient race known as the Darkin. He wields his massive blade with grace and poise, slicing through legions in a style that is hypnotic to behold. With each foe felled, Aatrox's ..."
  },
  {
    "id": "ahri",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Ahri.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 48,
      "y": 0
    },
    "description": "Unlike other foxes that roamed the woods of southern Ionia, Ahri had always felt a strange connection to the magical world around her; a connection that was somehow incomplete. Deep inside, she felt the skin she had been born into was an ill fit for ..."
  },
  {
    "id": "akali",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Akali.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 96,
      "y": 0
    },
    "description": "There exists an ancient order originating in the Ionian Isles dedicated to the preservation of balance. Order, chaos, light, darkness -- all things must exist in perfect harmony for such is the way of the universe. This order is known as the Kinkou ..."
  },
  {
    "id": "alistar",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Alistar.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 144,
      "y": 0
    },
    "description": "As the mightiest warrior to ever emerge from the Minotaur tribes of the Great Barrier, Alistar defended his tribe from Valoran's many dangers; that is, until the coming of the Noxian army. Alistar was lured from his village by the machinations of ..."
  },
  {
    "id": "amumu",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Amumu.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 192,
      "y": 0
    },
    "description": "''Solitude can be lonelier than death.''<br><br>A lonely and melancholy soul from ancient Shurima, Amumu roams the world in search of a friend. Cursed by an ancient spell, he is doomed to remain alone forever, as his touch is death and his affection ..."
  },
  {
    "id": "anivia",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Anivia.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 240,
      "y": 0
    },
    "description": "Anivia is a being of the coldest winter, a mystical embodiment of ice magic, and an ancient protector of the Freljord. She commands all the power and fury of the land itself, calling the snow and bitter wind to defend her home from those who would ..."
  },
  {
    "id": "annie",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Annie.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 288,
      "y": 0
    },
    "description": "There have always been those within Noxus who did not agree with the evils perpetrated by the Noxian High Command. The High Command had just put down a coup attempt from the self-proclaimed Crown Prince Raschallion, and a crackdown on any form of ..."
  },
  {
    "id": "ashe",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Ashe.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 336,
      "y": 0
    },
    "description": "With each arrow she fires from her ancient ice-enchanted bow, Ashe proves she is a master archer. She chooses each target carefully, waits for the right moment, and then strikes with power and precision. It is with this same vision and focus that she ..."
  },
  {
    "id": "aurelionsol",
    "name": "Aurelion Sol",
    "title": "The Star Forger",
    "tags": [
      "Mage",
      "Figher"
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/AurelionSol.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 384,
      "y": 0
    },
    "description": "Aurelion Sol once graced the vast emptiness of the cosmos with celestial wonders of his own devising. Now, he is forced to wield his awesome power at the behest of a space-faring empire that tricked him into servitude. Desiring a return to his ..."
  },
  {
    "id": "azir",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Azir.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 432,
      "y": 0
    },
    "description": "''Shurima was once the glory of Runeterra. I will make it so again.''<br><br>Azir was a mortal emperor of Shurima in a far distant age, a proud man who stood at the cusp of immortality. His hubris saw him betrayed and murdered at the moment of his ..."
  },
  {
    "id": "bard",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Bard.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 0,
      "y": 48
    },
    "description": "Bard travels through realms beyond the imagination of mortal beings. Some of Valoran's greatest scholars have spent their lives trying to understand the mysteries he embodies. This enigmatic spirit has been given many names throughout the history of ..."
  },
  {
    "id": "blitzcrank",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Blitzcrank.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 48,
      "y": 48
    },
    "description": "Zaun is a place where both magic and science have gone awry, and the unchecked nature of experimentation has taken its toll. However, Zaun's lenient restrictions allow their researchers and inventors the leeway to push the bounds of science at an ..."
  },
  {
    "id": "brand",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Brand.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 96,
      "y": 48
    },
    "description": "In a faraway place known as Lokfar there was a seafaring marauder called Kegan Rodhe. As was his people's way, Kegan sailed far and wide with his fellows, stealing treasures from those unlucky enough to catch their attention. To some, he was a ..."
  },
  {
    "id": "braum",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Braum.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 144,
      "y": 48
    },
    "description": "''Would you like a bedtime story?''<br><br>''Grandma, I'm too old for that.''<br><br>''You're never too old to be told a story.''<br><br>The girl reluctantly crawls into bed and waits, knowing she won't win this battle. A bitter wind howls outside, ..."
  },
  {
    "id": "caitlyn",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Caitlyn.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 192,
      "y": 48
    },
    "description": "''Go ahead, run. I'll give you a five minute head start.''<br><br>One of the reasons Piltover is known as the City of Progress is because it has an extraordinarily low crime rate. This hasn't always been the case; brigands and thieves of all sorts ..."
  },
  {
    "id": "cassiopeia",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Cassiopeia.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 240,
      "y": 48
    },
    "description": "Cassiopeia is a terrifying creature - half woman, half snake - whose slightest glance brings death. The youngest daughter of one of Noxus' most influential families, she was once a beautiful and cunning temptress capable of manipulating the hardest ..."
  },
  {
    "id": "chogath",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Chogath.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 288,
      "y": 48
    },
    "description": "There is a place between dimensions, between worlds. To some it is known as the Outside, to others it is the Unknown. To those that truly know, however, it is called the Void. Despite its name, the Void is not an empty place, but rather the home of ..."
  },
  {
    "id": "corki",
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
      "attackdamageperlevel": 2.5,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2.3
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Corki.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 336,
      "y": 48
    },
    "description": "When Heimerdinger and his yordle colleagues migrated to Piltover, they embraced science as a way of life, and they immediately made several groundbreaking contributions to the techmaturgical community. What yordles lack in stature, they make up for ..."
  },
  {
    "id": "darius",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Darius.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 384,
      "y": 48
    },
    "description": "There is no greater symbol of Noxian might than Darius, the nation's most feared and battle-hardened warrior. Orphaned at a young age, Darius had to fight to keep himself and his younger brother alive. By the time he joined the military, he had ..."
  },
  {
    "id": "diana",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Diana.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 432,
      "y": 48
    },
    "description": "''I am the light coursing in the soul of the moon.''<br><br>Bearing her crescent moonblade, Diana fights as a warrior of the Lunari, a faith all but quashed in the lands around Mount Targon. Clad in shimmering armor the color of winter snow at night, ..."
  },
  {
    "id": "draven",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Draven.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 0,
      "y": 96
    },
    "description": "Unlike his brother Darius, victory in battle was never enough for Draven. He craved recognition, acclaim, and glory. He first sought greatness in the Noxian military, but his flair for the dramatic went severely underappreciated. Thirsting for a ..."
  },
  {
    "id": "drmundo",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/DrMundo.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 48,
      "y": 96
    },
    "description": "''Beware the Madman of Zaun. In his eyes, you are already dead''<br><br>It is said that the man now known as Dr. Mundo was born without any sort of conscience. Instead, he had an unquenchable desire to inflict pain through experimentation. By the time ..."
  },
  {
    "id": "ekko",
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
      "attackdamage": 59,
      "attackdamageperlevel": 3,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 3.3
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Ekko.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 96,
      "y": 96
    },
    "description": "A prodigy from the rough streets of Zaun, Ekko manipulates time to spin any situation to his advantage. Using his own invention, the Zero-Drive, he explores the branching possibilities of reality. As well as experimenting with multi-dimensional ..."
  },
  {
    "id": "elise",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Elise.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 144,
      "y": 96
    },
    "description": "Elise's entrancing beauty and grace conceal the pitiless, black heart of a deadly predator. With ruthless cunning, she lures the unsuspecting with promises of favor from the spider god. Having exchanged her humanity to become something far more ..."
  },
  {
    "id": "evelynn",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Evelynn.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 192,
      "y": 96
    },
    "description": "Swift and lethal, Evelynn is one of the most deadly - and expensive - assassins in all of Runeterra. Able to merge with the shadows at will, she patiently stalks her prey, waiting for the right moment to strike. While Evelynn is clearly not entirely ..."
  },
  {
    "id": "ezreal",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Ezreal.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 240,
      "y": 96
    },
    "description": "The intrepid young adventurer Ezreal has explored some of the most remote and abandoned locations on Runeterra. During an expedition to the buried ruins of ancient Shurima, he recovered an amulet of incredible mystical power. Likely constructed to be ..."
  },
  {
    "id": "fiddlesticks",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/FiddleSticks.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 288,
      "y": 96
    },
    "description": "For nearly twenty years, Fiddlesticks has stood alone in the easternmost summoning chamber of the Institute of War. Only the burning emerald light of his unearthly gaze pierces the musty darkness of his dust-covered home. It is here that the Harbinger ..."
  },
  {
    "id": "fiora",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Fiora.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 336,
      "y": 96
    },
    "description": "''I have come to kill you for the sake of honor. And though you possess none, still you die.''<br>The most feared duelist in all Valoran, Fiora is as renowned for her brusque manner and cunning mind as she is for the speed of her bluesteel rapier. ..."
  },
  {
    "id": "fizz",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Fizz.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 384,
      "y": 96
    },
    "description": "Centuries ago, an ancient water-dwelling race built a hidden city beneath a mountain in the sea. Though these creatures had their enemies, the city was an impenetrable fortress, and, in the safety it provided, they grew complacent. Fizz, however, ..."
  },
  {
    "id": "galio",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Galio.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion0.png",
      "x": 432,
      "y": 96
    },
    "description": "''There is no such thing as redemption. Only penance.''<br><br>Long before the regulation of magic, mages experimented with the creation of artificial life. Now forbidden, instilling golems with reason was once not so uncommon a practice amongst the ..."
  },
  {
    "id": "gangplank",
    "name": "Gangplank",
    "title": "the Saltwater Scourge",
    "tags": [
      "Fighter"
    ],
    "stats": {
      "hp": 580,
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Gangplank.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 0,
      "y": 0
    },
    "description": "''I was cutting throats and sinking Noxian war galleys when you were still pissing your britches, boy. You don't want to take me on.''<br><br>As unpredictable as he is brutal, the dethroned reaver king known as Gangplank is feared far and wide. Where ..."
  },
  {
    "id": "garen",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Garen.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 48,
      "y": 0
    },
    "description": "Throughout Valoran, the resolve of Demacia's military is alternately celebrated or despised, but always respected. Their ''zero tolerance'' moral code is strictly upheld by civilians and soldiers alike. In combat, this means Demacian troops may not ..."
  },
  {
    "id": "gnar",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Gnar.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 96,
      "y": 0
    },
    "description": "The jungle does not forgive blindness. Every broken branch tells a story.<br><br>I've hunted every creature this jungle has to offer. I was certain there were no challenges left here, but now there is something new. Each track is the size of a ..."
  },
  {
    "id": "gragas",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Gragas.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 144,
      "y": 0
    },
    "description": "The only thing more important to Gragas than fighting is drinking. His unquenchable thirst for stronger ale has led him in search of the most potent and unconventional ingredients to toss in his still. Impulsive and unpredictable, this rowdy carouser ..."
  },
  {
    "id": "graves",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Graves.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 192,
      "y": 0
    },
    "description": "Malcolm Graves is a wanted man in every realm, city-state, and empire he has visited. Tough, strong-willed, and above all, relentless, through his life of crime he has amassed (then invariably lost) a small fortune."
  },
  {
    "id": "hecarim",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Hecarim.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 240,
      "y": 0
    },
    "description": "''Break their ranks and ride them down without mercy. Crush the living and feast on their terror.''<br><br>Hecarim is an armored colossus who charges from the Shadow Isles at the head of a deathly host of spectral horsemen to hunt the living. A ..."
  },
  {
    "id": "heimerdinger",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Heimerdinger.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 288,
      "y": 0
    },
    "description": "From the Journal of Professor Cecil B. Heimerdinger<br><br>10.14<br><br>09:15<br><br>Current meteorological conditions in Bandle City seem optimal. Atmospheric pressure is ideal for today's experiments!<br><br>Running a fifth trial for my ..."
  },
  {
    "id": "illaoi",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Illaoi.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 336,
      "y": 0
    },
    "description": "''I'm not big on sermons. Broken bones teach better lessons.''<br>Illaoi's powerful physique is dwarfed only by her indomitable faith. As the prophet of the Great Kraken, she uses a huge, golden idol to rip her foes' spirits from their bodies and ..."
  },
  {
    "id": "irelia",
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
      "mpregen": 8.09,
      "mpregenperlevel": 0.65,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 61.544,
      "attackdamageperlevel": 3.3,
      "attackspeedoffset": -0.06,
      "attackspeedperlevel": 3.2
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Irelia.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 384,
      "y": 0
    },
    "description": "''The sword flourishes, as though painting with blood.''<br><br>The Ionians have developed some of the most breathtaking and deadly martial arts in all of Runeterra - just one manifestation of their pursuit of enlightenment. The most remarkable blade ..."
  },
  {
    "id": "janna",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Janna.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 432,
      "y": 0
    },
    "description": "There are those sorcerers who give themselves over to the primal powers of nature, forgoing the learned practice of magic. Such a sorceress is Janna, who first learned magic as an orphan growing up amidst the chaos that is the city-state of Zaun. ..."
  },
  {
    "id": "jarvaniv",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/JarvanIV.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 0,
      "y": 48
    },
    "description": "''There is only one truth, and you will find it at the point of my lance.''<br><br>As the royal family of Demacia for centuries, members of the Lightshield line have spent their lives waging war against any who opposed Demacian ethics. It is said that ..."
  },
  {
    "id": "jax",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Jax.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 48,
      "y": 48
    },
    "description": "It is seldom the case where a champion is defined by his actions after joining the League of Legends rather than before. Such is the case with Jax, for whom the argument could be made that he is the most prolific tournament fighter currently at the ..."
  },
  {
    "id": "jayce",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Jayce.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 96,
      "y": 48
    },
    "description": "Armed with wit, charm, and his signature transforming hammer, Jayce lives to protect his native Piltover. Long before his nation called him a hero, however, he was a promising young inventor. When Piltover commissioned him to study a rare arcane ..."
  },
  {
    "id": "jhin",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Jhin.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 144,
      "y": 48
    },
    "description": "''Art requires a certain...cruelty.''<br><br>Jhin is a meticulous criminal psychopath who believes murder is art. Once an Ionian prisoner, but freed by shadowy elements within Ionia's ruling council, the serial killer now works as their cabal's ..."
  },
  {
    "id": "jinx",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Jinx.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 192,
      "y": 48
    },
    "description": "Jinx lives to wreak havoc without a thought for the consequences, leaving a trail of mayhem and panic in her wake. A manic and impulsive criminal, she despises nothing more than boredom, and gleefully brings her own volatile brand of pandemonium to ..."
  },
  {
    "id": "kalista",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Kalista.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 240,
      "y": 48
    },
    "description": "''When wronged, we seek justice. When hurt, we strike back. When betrayed, the Spear of Vengeance strikes!''<br><br>A specter of wrath and retribution, Kalista is the undying spirit of vengeance, an armored nightmare summoned from the Shadow Isles to ..."
  },
  {
    "id": "karma",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Karma.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 288,
      "y": 48
    },
    "description": "Karma is a woman of indomitable will and unbound spiritual power. She is the soul of Ionia made manifest and an inspiring presence on the battlefield, shielding her allies and turning back her foes. A strong leader torn between tradition and ..."
  },
  {
    "id": "karthus",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Karthus.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 336,
      "y": 48
    },
    "description": "''Death is not the end of the journey, it is just the beginning...''<br><br>The harbinger of oblivion, Karthus is an undying spirit whose haunting songs are a prelude to the horror of his nightmarish appearance. The living fear the eternity of undeath,..."
  },
  {
    "id": "kassadin",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Kassadin.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 384,
      "y": 48
    },
    "description": "There is a place between dimensions and between worlds. To some it is known as the Outside, to others it is the Unknown. To most, however, it is called the Void. Despite its name, the Void is not an empty place, but rather the home of unspeakable ..."
  },
  {
    "id": "katarina",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Katarina.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 432,
      "y": 48
    },
    "description": "Driven by an intense killer instinct, Katarina uses her talents as an assassin for the glory of Noxus, and the continued elevation of her family. While her fervor drives her to ever-greater feats, it can sometimes lead her astray.<br><br>From ..."
  },
  {
    "id": "kayle",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Kayle.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 0,
      "y": 96
    },
    "description": "In a world far away where an ancient war still rages, Kayle was a great hero - the strongest of an immortal race committed to destroying evil wherever it could be found. For ten thousand years, Kayle fought tirelessly for her people, wielding her ..."
  },
  {
    "id": "kennen",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Kennen.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 48,
      "y": 96
    },
    "description": "There exists an ancient order originating in the Ionian Isles dedicated to the preservation of balance. Order, chaos, light, darkness -- all things must exist in perfect harmony for such is the way of the universe. This order is known as the Kinkou ..."
  },
  {
    "id": "khazix",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Khazix.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 96,
      "y": 96
    },
    "description": "A vicious Void predator, Kha'Zix infiltrated Valoran to devour the land's most promising creatures. With each kill he absorbs his prey's strength, evolving to grow more powerful. Kha'Zix hungers most to conquer and consume Rengar, the one beast he ..."
  },
  {
    "id": "kindred",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Kindred.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 144,
      "y": 96
    },
    "description": "''Tell me again, little Lamb, which things are ours to take?''<br>''All things, Dear Wolf.''<br>Separate, but never parted, Kindred represents the twin essences of death. Lamb's arrow offers a swift release for those who accept their fate. Wolf hunts ..."
  },
  {
    "id": "kogmaw",
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
      "attackspeedoffset": 0,
      "attackspeedperlevel": 3.5
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/KogMaw.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 192,
      "y": 96
    },
    "description": "''If that's just hungry, I don't want to see angry.''<br><br>When the prophet Malzahar was reborn in Icathia, he was led there by an ominous voice which thereafter anchored itself to his psyche. From within, this voice bestowed upon him terrible ..."
  },
  {
    "id": "leblanc",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Leblanc.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 240,
      "y": 96
    },
    "description": "Every city has its dark side, even one whose reputation is already of a questionable hue. Noxus - though its name is already invoked with a mixture of reverence and revulsion - is no exception to this simple truth. Deep within the winding dungeons ..."
  },
  {
    "id": "leesin",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/LeeSin.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 288,
      "y": 96
    },
    "description": "As a young teen, Lee Sin was intent on becoming a summoner. His will and dedication were unmatched by any of his peers, and his skill drew the attention of Reginald Ashram, the League's High Councilor at the time. While studying at the Arcanum Majoris,..."
  },
  {
    "id": "leona",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Leona.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 336,
      "y": 96
    },
    "description": "''If you would shine like a sun, first you must burn like one.''<br><br>Imbued with the fire of the sun, Leona is a warrior templar of the Solari who defends Mount Targon with her Zenith Blade and Shield of Daybreak. Her skin shimmers with starfire ..."
  },
  {
    "id": "lissandra",
    "name": "Lissandra",
    "title": "the Ice Witch",
    "tags": [
      "Mage"
    ],
    "stats": {
      "hp": 506.12,
      "hpperlevel": 84,
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Lissandra.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 384,
      "y": 96
    },
    "description": "Lissandra's magic twists the pure power of ice into something dark and terrible. With the force of her black ice, she does more than freeze - she impales and crushes those who oppose her. To the terrified denizens of the north, she is known only as ..."
  },
  {
    "id": "lucian",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Lucian.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion1.png",
      "x": 432,
      "y": 96
    },
    "description": "Lucian wields relic weapons imbued with ancient power and stands a stalwart guardian against the undead. His cold conviction never wavers, even in the face of the maddening horrors he destroys beneath his hail of purifying fire. Lucian walks alone on ..."
  },
  {
    "id": "lulu",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Lulu.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 0,
      "y": 0
    },
    "description": "Perhaps more than any other champion in the League, Lulu marches to the beat of her own drum. During her youth in Bandle City, she spent most of her time wandering alone in the forest or lost in a daydream. It wasn't that she was antisocial; the ..."
  },
  {
    "id": "lux",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Lux.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 48,
      "y": 0
    },
    "description": "Born to the prestigious Crownguards, the paragon family of Demacian service, Luxanna was destined for greatness. She grew up as the family's only daughter, and she immediately took to the advanced education and lavish parties required of families as ..."
  },
  {
    "id": "malphite",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Malphite.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 96,
      "y": 0
    },
    "description": "There is a world of perfect harmony, where all are part of the whole. The Monolith is the essence of all creation, and its denizens are but singular pieces of it. It is beautiful in its symmetry, and in its almost complete lack of uncertainty. The ..."
  },
  {
    "id": "malzahar",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Malzahar.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 144,
      "y": 0
    },
    "description": "Many men have gone mad beneath the glare of the Shurima sun, but it was during the night's chilling embrace that Malzahar relinquished his sanity. Malzahar was born a seer, blessed with the gift of prophecy. His talent, though unrefined, promised to ..."
  },
  {
    "id": "maokai",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Maokai.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 192,
      "y": 0
    },
    "description": "Maokai was once a peaceful nature spirit dwelling in an idyllic forest, but the arrogance of humans brought an end to that life. Now he is a gnarled shadow of his former self, twisted by dark magics that defied the natural order of life and death. ..."
  },
  {
    "id": "masteryi",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/MasterYi.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 240,
      "y": 0
    },
    "description": "Through the ancient martial art of Wuju, Master Yi has tempered his body and sharpened his mind until thought and action have become one. Though he chooses to enter into violence as a last resort, the grace and speed with which he wields his blade ..."
  },
  {
    "id": "missfortune",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/MissFortune.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 288,
      "y": 0
    },
    "description": "''The bigger the risk, the bigger the bounty.''<br><br>Beauty and danger: There are few who can match Miss Fortune in either. One of Bilgewater's most infamous bounty hunters, she built her legend upon a swathe of bullet-riddled corpses and captured ..."
  },
  {
    "id": "monkeyking",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/MonkeyKing.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 336,
      "y": 0
    },
    "description": "During the chaos of the Rune Wars, an enormous runestone was lost deep within the Plague Jungles. It remained there, untouched for centuries, emanating a potent magic which infused nearby wildlife with sentience and vitality. A group of monkeys who ..."
  },
  {
    "id": "mordekaiser",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Mordekaiser.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 384,
      "y": 0
    },
    "description": "''All things must die... and yet I live on.''<br><br>The baleful revenant Mordekaiser is among the most terrifying and hateful spirits haunting the Shadow Isles. He has existed for countless centuries, shielded from true death by necromantic sorcery ..."
  },
  {
    "id": "morgana",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Morgana.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 432,
      "y": 0
    },
    "description": "There is a world far away populated by graceful and beautiful winged beings gifted with immortality, where an ancient conflict still rages. Like so many conflicts, this war split families. One side proclaimed themselves as beings of perfect order and ..."
  },
  {
    "id": "nami",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Nami.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 0,
      "y": 48
    },
    "description": "Nami channels the primal energies of the ocean, harnessing its mystical restorative properties and commanding the raw power of the tides themselves. Though many doubted her, Nami had the bravery and determination to take on a dangerous quest when no ..."
  },
  {
    "id": "nasus",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Nasus.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 48,
      "y": 48
    },
    "description": "''What was fallen will be great again.''<br><br>Nasus is an imposing, jackal-headed Ascended being from ancient Shurima, a heroic figure regarded as a demigod by the people of the desert. Fiercely intelligent, he was a guardian of knowledge and ..."
  },
  {
    "id": "nautilus",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Nautilus.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 96,
      "y": 48
    },
    "description": "Once, Nautilus was a sailor commissioned by the Institute of War to explore the uncharted reaches of the Guardian's Sea. This expedition took him deep into unknown waters where he and his crew found a vast section of black oozing liquid that none of ..."
  },
  {
    "id": "nidalee",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Nidalee.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 144,
      "y": 48
    },
    "description": "There are few dwellers, let alone champions, residing in the blasted and dangerous lands that lie south of the Great Barrier. Much of that world still bears the scars of past Runes Wars, especially the mysterious Kumungu Jungle. There are ..."
  },
  {
    "id": "nocturne",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Nocturne.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 192,
      "y": 48
    },
    "description": "Before Nocturne, people believed that dreams were figments of their imagination, meaningless images that flashed through the mind when one slept. This belief was put to the test when a rash of sleep-related incidents started afflicting summoners of ..."
  },
  {
    "id": "nunu",
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
      "attackdamage": 56.856,
      "attackdamageperlevel": 3.45,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 2.25
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Nunu.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 240,
      "y": 48
    },
    "description": "Sometimes bonds of friendship become stronger than even bonds of blood. When those bonds link a fearless boy to a fearsome Yeti, the bond becomes a force to be reckoned with. Given the responsibility of taming a terrifying beast, Nunu forged a ..."
  },
  {
    "id": "olaf",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Olaf.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 288,
      "y": 48
    },
    "description": "Most men would say that death is a thing to be feared; none of those men would be Olaf. The Berserker lives only for the roar of a battle cry and the clash of steel. Spurred on by his hunger for glory and the looming curse of a forgettable death, Olaf ..."
  },
  {
    "id": "orianna",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Orianna.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 336,
      "y": 48
    },
    "description": "There once was a Piltovian man named Corin Reveck who had a daughter named Orianna, whom he loved more than anything else in the world. Though Orianna had incredible talent for dancing, she was deeply fascinated by the champions of the League of ..."
  },
  {
    "id": "pantheon",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Pantheon.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 384,
      "y": 48
    },
    "description": "''Bring forth one true champion, or a hundred more like you, and then we shall have a battle that will be spoken of until the end of time.''<br><br>The peerless warrior known as Pantheon is a nigh-unstoppable paragon of battle. He was born among the ..."
  },
  {
    "id": "poppy",
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
      "movespeed": 340,
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Poppy.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 432,
      "y": 48
    },
    "description": "''I'm no hero. Just a yordle with a hammer.''<br><br>Runeterra has no shortage of valiant champions, but few are as tenacious as Poppy. Bearing a hammer twice the length of her body, this determined yordle has spent untold years searching for the ..."
  },
  {
    "id": "quinn",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Quinn.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 0,
      "y": 96
    },
    "description": "Quinn and Valor are an elite ranger team. With crossbow and claw, they undertake their nation's most dangerous missions deep within enemy territory, from swift reconnaissance to lethal strikes. The pair's unbreakable bond is deadly on the battlefield, ..."
  },
  {
    "id": "rammus",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Rammus.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 48,
      "y": 96
    },
    "description": "''OK.''<br><br>Idolized by many, dismissed by some, mystifying to all, the curious being, Rammus, is an enigma. Protected by a spiked shell, Rammus inspires increasingly disparate theories on his origin wherever he goes - from demigod, to sacred ..."
  },
  {
    "id": "reksai",
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
      "armor": 28.3,
      "armorperlevel": 3.75,
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/RekSai.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 96,
      "y": 96
    },
    "description": "The largest and fiercest of her species, Rek'Sai is a merciless predator that tunnels through the earth to ambush and devour her prey. Her insatiable hunger has laid waste to entire regions of the once-great Shuriman empire. Merchants, traders and ..."
  },
  {
    "id": "renekton",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Renekton.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 144,
      "y": 96
    },
    "description": "''Blood and vengeance.''<br><br>Renekton is a terrifying, rage-fueled Ascended being from the scorched deserts of Shurima. Once, he was his empire's most esteemed warrior, leading the armies of Shurima to countless victories. However, after the ..."
  },
  {
    "id": "rengar",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Rengar.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 192,
      "y": 96
    },
    "description": "On every wall of his den, the trophy hunter Rengar mounts the heads, horns, claws, and fangs of the most lethal creatures in Valoran. Though his collection is extensive, he remains unsatisfied, tirelessly seeking greater game. He takes time with every ..."
  },
  {
    "id": "riven",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Riven.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 240,
      "y": 96
    },
    "description": "''There is a place between war and murder in which our demons lurk.''<br><br>In Noxus, any citizen may rise to power regardless of race, gender, or social standing - strength is all that matters. It was with committed faith in this ideal that Riven ..."
  },
  {
    "id": "rumble",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Rumble.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 288,
      "y": 96
    },
    "description": "''Ugh, it's gonna take forever to scrape your face off my suit!''<br><br>Even amongst yordles, Rumble was always the runt of the litter. As such, he was used to being bullied. In order to survive, he had to be scrappier and more resourceful than his ..."
  },
  {
    "id": "ryze",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Ryze.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 336,
      "y": 96
    },
    "description": "''Take care with this world. What is made can be unmade.''<br><br>Widely considered one of the most adept sorcerers on Runeterra, Ryze is an ancient, hard-bitten archmage with an impossibly heavy burden to bear. Armed with a boundless constitution and ..."
  },
  {
    "id": "sejuani",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Sejuani.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 384,
      "y": 96
    },
    "description": "Sejuani was weaned on hardship and reared on barbarity. Where others succumbed to the harshness of the Freljord, she was tempered by it until pain became power, hunger an encouragement, and frost an ally in culling the weak. Through her ordeals, she ..."
  },
  {
    "id": "shaco",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Shaco.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion2.png",
      "x": 432,
      "y": 96
    },
    "description": "Most would say that death isn't funny. It isn't, unless you're Shaco - then it's hysterical. He is Valoran's first fully functioning homicidal comic; he jests until someone dies, and then he laughs. The figure that has come to be known as the Demon ..."
  },
  {
    "id": "shen",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Shen.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 0,
      "y": 0
    },
    "description": "''The Eye is blind to fear, to hate, to love - to all things that would sway equilibrium.''<br><br>Leader of a secret clan of mystic warriors, Shen serves as the Eye of Twilight, entrusted to enforce equilibrium in the world. Longing to remain free ..."
  },
  {
    "id": "shyvana",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Shyvana.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 48,
      "y": 0
    },
    "description": "A half-breed born from the union between dragon and human, Shyvana searched all her life for belonging. Persecution forged her into a brutal warrior, and those who dare stand against Shyvana face the fiery beast lurking just beneath her skin...."
  },
  {
    "id": "singed",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Singed.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 96,
      "y": 0
    },
    "description": "Singed descended from a long line of Zaun's revered chemists. Even in his youth, his talent for concocting potions far outstripped that of his peers, and he quickly distinguished himself from his less extraordinary chemist compatriots. It came as no ..."
  },
  {
    "id": "sion",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Sion.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 144,
      "y": 0
    },
    "description": "BLOOD.<br><br>SMELL IT.<br><br>WANT. ACHING. NEED!<br><br>CLOSE NOW. THEY COME.<br><br>NO CHAINS? FREE! KILL!<br><br>IN REACH. YES! DIE! DIE!<br><br>Gone. Too quick. No fight. More. I want... more.<br><br>A voice? Unfamiliar. I see him. The Grand ..."
  },
  {
    "id": "sivir",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Sivir.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 192,
      "y": 0
    },
    "description": "''I don't care what face is on your coin, as long as it pays.''<br><br>Sivir is a renowned fortune hunter and mercenary captain who plies her trade in the deserts of Shurima. Armed with her legendary jeweled crossblade, she has fought and won ..."
  },
  {
    "id": "skarner",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Skarner.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 240,
      "y": 0
    },
    "description": "''We are one. We cannot be shattered.''<br><br>Skarner is an immense crystalline scorpion from a hidden valley in Shurima. Part of the ancient Brackern race, Skarner and his kin are known for their great wisdom and deep connection to the land, as ..."
  },
  {
    "id": "sona",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Sona.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 288,
      "y": 0
    },
    "description": "Sona has no memories of her true parents. As an infant, she was found abandoned on the doorstep of an Ionian adoption house, nestled atop an ancient instrument in an exquisite case of unknown origins. She was an unusually well-behaved child, always ..."
  },
  {
    "id": "soraka",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Soraka.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 336,
      "y": 0
    },
    "description": "A healer gifted with the magic of the stars, Soraka holds all living creatures close to her heart. She was once a celestial being, but she sacrificed her immortality and entered the world of mortals. So long as evil threatens life in Valoran, Soraka ..."
  },
  {
    "id": "swain",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Swain.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 384,
      "y": 0
    },
    "description": "The earliest account of Swain's existence comes from a Noxian infirmary doctor's notes. According to them, Swain limped into the ward without cry or complaint; his right leg was snapped in half, with bone protruding from the skin. A small, scowling ..."
  },
  {
    "id": "syndra",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Syndra.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 432,
      "y": 0
    },
    "description": "Born with immense magical potential, Syndra loves nothing more than exercising the incredible power at her command. With each passing day, her mastery of magical force grows more potent and devastating. Refusing any notion of balance or restraint, ..."
  },
  {
    "id": "tahmkench",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/TahmKench.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 0,
      "y": 48
    },
    "description": "''The whole world's a river, and I'm its king.''<br>Tahm Kench travels Runeterra's waterways, feeding his insatiable appetite with the misery of the unsuspecting. The singularly charming gourmand savors every moment of his victims' suffering.  A deal ..."
  },
  {
    "id": "taliyah",
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
      "hpregen": 6,
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Taliyah.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 48,
      "y": 48
    },
    "description": "Taliyah is a nomadic mage from Shurima who weaves stone with energetic enthusiasm and raw determination. Torn between teenage wonder and adult responsibility, she has crossed nearly all of Valoran on a journey to learn the true nature of her growing ..."
  },
  {
    "id": "talon",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Talon.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 96,
      "y": 48
    },
    "description": "''The three deadliest blademasters in all of Valoran are bound to the house of Du Couteau: my father, myself, and Talon. Challenge us, if you dare.''<br>-- Katarina Du Couteau<br><br>Talon's earliest memories are the darkness of Noxus' underground ..."
  },
  {
    "id": "taric",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Taric.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 144,
      "y": 48
    },
    "description": "''The best weapons are beautiful.''<br><br>Taric is the Aspect of the Protector, wielding incredible power as Runeterra's guardian of life, love, and beauty. Shamed by a dereliction of duty and exiled from his homeland Demacia, Taric ascended Mount ..."
  },
  {
    "id": "teemo",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Teemo.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 192,
      "y": 48
    },
    "description": "Teemo is a legend among his yordle brothers and sisters in Bandle City. As far as yordles are concerned, there is something just slightly off about him. While Teemo enjoys the companionship of other yordles, he also insists on frequent solo missions ..."
  },
  {
    "id": "thresh",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Thresh.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 240,
      "y": 48
    },
    "description": "''The mind is a wondrous thing to tear apart.''<br><br>Sadistic and cunning, Thresh is a restless spirit who prides himself on tormenting mortals and breaking them with slow, excruciating inventiveness. His victims suffer far beyond the point of death,..."
  },
  {
    "id": "tristana",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Tristana.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 288,
      "y": 48
    },
    "description": "Greatness comes in all shapes and sizes, as proven by this diminutive, cannon-wielding yordle. In a world fraught with turmoil, Tristana refuses to back down from any challenge. She represents the pinnacle of martial proficiency, unwavering courage, ..."
  },
  {
    "id": "trundle",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Trundle.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 336,
      "y": 48
    },
    "description": "Trundle is a hulking and devious troll with a mischievous streak. There is nothing he can't beat into submission and bend to his will, not even the ice itself. With his massive, frozen club, he chills his enemies to the core and runs them through with ..."
  },
  {
    "id": "tryndamere",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Tryndamere.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 384,
      "y": 48
    },
    "description": "Fueled by his unbridled fury and rage, Tryndamere cuts his way through the tundra, mastering the art of battle by challenging the Freljord's greatest warriors. The wrathful barbarian seeks revenge on the one who decimated his clan and strikes down all ..."
  },
  {
    "id": "twistedfate",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/TwistedFate.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 432,
      "y": 48
    },
    "description": "Twisted Fate is an infamous card sharp and swindler who has gambled and charmed his way across much of the known world, earning the enmity and admiration of the rich and foolish alike. He rarely takes things seriously, greeting each day with a mocking ..."
  },
  {
    "id": "twitch",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Twitch.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 0,
      "y": 96
    },
    "description": "H.I.V.E. Incident Report<br>Code Violation: Industrial Homicide<br>Casefile Status: Unsolved<br>Investigating Agent: Rol, P.<br><br>Team responded to report of suspicious character, criminal activity; proceeded to Sump Works, Sector 90TZ. Sector 90TZ ..."
  },
  {
    "id": "udyr",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Udyr.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 48,
      "y": 96
    },
    "description": "Udyr is more than a man; he is a vessel for the untamed power of four primal animal spirits. When tapping into the spirits' bestial natures, Udyr can harness their unique strengths: the tiger grants him speed and ferocity, the turtle resilience, the ..."
  },
  {
    "id": "urgot",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Urgot.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 96,
      "y": 96
    },
    "description": "There are warriors who become great for their strength, cunning, or skill with arms. Others simply refuse to die. Urgot, once a great soldier of Noxus, may constitute a case in support of the latter. Prone to diving headlong into enemy battle lines, ..."
  },
  {
    "id": "varus",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Varus.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 144,
      "y": 96
    },
    "description": "''The life of an arrow is fleeting, built of nothing but direction and intent.''<br><br>For his incomparable skill with the bow and his unquestioned sense of honor, Varus was chosen to be the warden of a sacred Ionian temple. The temple was built to ..."
  },
  {
    "id": "vayne",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Vayne.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 192,
      "y": 96
    },
    "description": "The world is not always as civilized as people might think. There are still those who would follow the blackest paths of magic and become corrupted by the darker powers that flow through Runeterra. Shauna Vayne knows this fact well.<br><br>As a young ..."
  },
  {
    "id": "veigar",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Veigar.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 240,
      "y": 96
    },
    "description": "To most, thoughts of yordles do not conjure images to be feared. The easygoing half-pint race, though fierce, is often regarded with some degree of joviality. Their high-pitched voices and naturally cute forms inspire something of a protective ..."
  },
  {
    "id": "velkoz",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Velkoz.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 288,
      "y": 96
    },
    "description": "I pass into the sudden glare. Blink. Blink, blink, blink. My eyes adjust and evaluate the landscape before me.<br><br>There's a scurrying. I look down to find a small, white creature standing on its hind legs, sniffing at my body. It intrigues me...."
  },
  {
    "id": "vi",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Vi.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 336,
      "y": 96
    },
    "description": "To Vi, every problem is just another brick wall to punch through with her gigantic hextech gauntlets. Though she grew up on the wrong side of the law, Vi now uses her criminal know-how to serve Piltover's police force. Vi's brash attitude, abrasive ..."
  },
  {
    "id": "viktor",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Viktor.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 384,
      "y": 96
    },
    "description": "Early in life, Viktor discovered his passion for science and invention, particularly in the field of mechanical automation. He attended Zaun's prestigious College of Techmaturgy and led the team that constructed Blitzcrank - a scientific breakthrough ..."
  },
  {
    "id": "vladimir",
    "name": "Vladimir",
    "title": "the Crimson Reaper",
    "tags": [
      "Mage",
      "Tank"
    ],
    "stats": {
      "hp": 550,
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Vladimir.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion3.png",
      "x": 432,
      "y": 96
    },
    "description": "There is a temple hidden in the mountains between Noxus and the Tempest Flats, where the secrets of an ancient and terrifying sorcery are kept. The area surrounding the temple is littered with the exsanguinated corpses of those who have mistakenly ..."
  },
  {
    "id": "volibear",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Volibear.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion4.png",
      "x": 0,
      "y": 0
    },
    "description": "The unforgiving northern reaches of the Freljord are home to the Ursine, a fierce and warlike race that has endured the barren tundra for thousands of years. Their leader is a furious adversary who commands the force of lightning to strike fear within ..."
  },
  {
    "id": "warwick",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Warwick.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion4.png",
      "x": 48,
      "y": 0
    },
    "description": "Warwick was once a man revered for his ability to track down human specimens for the darkest types of scientific research. When his ambitions exceeded his physical limits, he drank a dangerous elixir to transform himself into an unstoppable manhunter. ..."
  },
  {
    "id": "xerath",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Xerath.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion4.png",
      "x": 96,
      "y": 0
    },
    "description": "''A lifetime as a slave has prepared me for eternity as your master.''<br><br>Xerath is an Ascended Magus of ancient Shurima, a being of arcane energy writhing in the broken shards of a magical sarcophagus. For millennia, he was trapped beneath the ..."
  },
  {
    "id": "xinzhao",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/XinZhao.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion4.png",
      "x": 144,
      "y": 0
    },
    "description": "''Death is inevitable, one can only avoid defeat.''<br><br>Whenever Jarvan III, the king of Demacia, delivers one of his rallying speeches from the glinting marble balcony atop the Royal Palace, Xin Zhao is at his side. Coined the Seneschal of Demacia,..."
  },
  {
    "id": "yasuo",
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
      "attackspeedoffset": -0.05,
      "attackspeedperlevel": 3.2
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Yasuo.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion4.png",
      "x": 192,
      "y": 0
    },
    "description": "Yasuo is a man of resolve, an agile swordsman who wields the wind itself to cut down his foes. This once-proud warrior has been disgraced by a false accusation and forced into a desperate fight for survival. With the world turned against him, he will ..."
  },
  {
    "id": "yorick",
    "name": "Yorick",
    "title": "the Gravedigger",
    "tags": [
      "Fighter",
      "Mage"
    ],
    "stats": {
      "hp": 563.8,
      "hpperlevel": 85,
      "mp": 293.8,
      "mpperlevel": 35,
      "movespeed": 345,
      "armor": 25.048,
      "armorperlevel": 3.6,
      "spellblock": 32.1,
      "spellblockperlevel": 1.25,
      "attackrange": 125,
      "hpregen": 8.175,
      "hpregenperlevel": 0.7,
      "mpregen": 6.755,
      "mpregenperlevel": 0.45,
      "crit": 0,
      "critperlevel": 0,
      "attackdamage": 57.58,
      "attackdamageperlevel": 3.5,
      "attackspeedoffset": 0,
      "attackspeedperlevel": 3
    },
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Yorick.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion4.png",
      "x": 240,
      "y": 0
    },
    "description": "A terrifying and tragic figure, Yorick is a ghoulish being that exists on the edge of mortality. Some say he was the last of his family line, dying without an heir to continue its legacy, and that he was cursed to continue his family's duty even after ..."
  },
  {
    "id": "zac",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Zac.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion4.png",
      "x": 288,
      "y": 0
    },
    "description": "Zac is the product of a Zaun experiment to manufacture a hexchem-engineered supersoldier - the Zaun Amorphous Combatant. Combining brute strength with limitless flexibility, he is a versatile juggernaut: a creative fighter who bounces over obstacles ..."
  },
  {
    "id": "zed",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Zed.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion4.png",
      "x": 336,
      "y": 0
    },
    "description": "Zed is the first ninja in 200 years to unlock the ancient, forbidden ways. He defied his clan and master, casting off the balance and discipline that had shackled him all his life. Zed now offers power to those who embrace knowledge of the shadows, ..."
  },
  {
    "id": "ziggs",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Ziggs.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion4.png",
      "x": 384,
      "y": 0
    },
    "description": "Ziggs was born with a talent for tinkering, but his chaotic, hyperactive nature was unusual among yordle scientists. Aspiring to be a revered inventor like Heimerdinger, he rattled through ambitious projects with manic zeal, emboldened by both his ..."
  },
  {
    "id": "zilean",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Zilean.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion4.png",
      "x": 432,
      "y": 0
    },
    "description": "In the wastelands of Urtistan, there was once a great city. It perished long ago in a terrible Rune War, like most of the lands below the Great Barrier. Nevertheless, one man survived: a sorcerer named Zilean. Being obsessed with time, it was only ..."
  },
  {
    "id": "zyra",
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
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/champion/Zyra.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/champion4.png",
      "x": 0,
      "y": 48
    },
    "description": "Longing to take control of her fate, the ancient, dying plant Zyra transferred her consciousness into a human body for a second chance at life. Centuries ago, she and her kind dominated the Kumungu Jungle, using thorns and vines to consume any animal ..."
  }
];

var spells = [
  {
    "id": "barrier",
    "name": "Barrier",
    "description": "Shields your champion for 115-455 (depending on champion level) for 2 seconds.",
    "tooltip": "Temporarily shields {{ f1 }} damage from your champion for 2 seconds.",
    "cooldown": 210,
    "summonerLevel": 4,
    "maxammo": "-1",
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/spell/SummonerBarrier.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/spell0.png",
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
    "summonerLevel": 6,
    "maxammo": "-1",
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/spell/SummonerBoost.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/spell0.png",
      "x": 48,
      "y": 0
    }
  },
  {
    "id": "clairvoyance",
    "name": "Clairvoyance",
    "description": "Reveals a small area of the map for your team for 5 seconds.",
    "tooltip": "Reveals a small area of the map for your team for {{ f1 }} seconds.",
    "cooldown": 240,
    "summonerLevel": 8,
    "maxammo": "-1",
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/spell/SummonerClairvoyance.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/spell0.png",
      "x": 96,
      "y": 0
    }
  },
  {
    "id": "dot",
    "name": "Ignite",
    "description": "Ignites target enemy champion, dealing 70-410 true damage (depending on champion level) over 5 seconds, grants you vision of the target, and reduces healing effects on them for the duration.",
    "tooltip": "Ignite deals <span class=\"colorFEFCFF\">{{ f1 }}</span> true damage to target enemy champion over 5 seconds, grants you vision of the target and applies Grievous Wounds for the duration.<br><br><i>(Grievous Wounds reduces healing effects by 40%. This vision does not reveal stealthed enemies.)</i>",
    "cooldown": 180,
    "summonerLevel": 10,
    "maxammo": "-1",
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/spell/SummonerDot.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/spell0.png",
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
    "summonerLevel": 4,
    "maxammo": "-1",
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/spell/SummonerExhaust.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/spell0.png",
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
    "summonerLevel": 8,
    "maxammo": "-1",
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/spell/SummonerFlash.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/spell0.png",
      "x": 240,
      "y": 0
    }
  },
  {
    "id": "haste",
    "name": "Ghost",
    "description": "Your champion can move through units and has 28-45% (depending on champion level) increased Movement Speed for 10 seconds.",
    "tooltip": "Your champion can move through units and has {{ f1 }}% increased Movement Speed for 10 seconds.",
    "cooldown": 210,
    "summonerLevel": 1,
    "maxammo": "-1",
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/spell/SummonerHaste.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/spell0.png",
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
    "summonerLevel": 1,
    "maxammo": "-1",
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/spell/SummonerHeal.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/spell0.png",
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
    "summonerLevel": 1,
    "maxammo": "-1",
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/spell/SummonerMana.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/spell0.png",
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
    "summonerLevel": 1,
    "maxammo": "-1",
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/spell/SummonerPoroRecall.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/spell0.png",
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
    "summonerLevel": 1,
    "maxammo": "-1",
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/spell/SummonerPoroThrow.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/spell0.png",
      "x": 0,
      "y": 48
    }
  },
  {
    "id": "smite",
    "name": "Smite",
    "description": "Deals 390-1000 true damage (depending on champion level) to target epic or large monster or enemy minion.",
    "tooltip": "Deals <span class=\"colorFEFCFF\">{{ f1 }}</span> true damage to target epic or large monster or enemy minion.<br><br>Smite regains a charge every {{ f3 }} seconds, up to a maximum of 2 charges.<br><br><i>Smiting Large Monsters instantly harvests additional bonuses based on the Monster. Mouse over large jungle monsters to see potential bonus rewards.</i>",
    "cooldown": 90,
    "summonerLevel": 10,
    "maxammo": "2",
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/spell/SummonerSmite.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/spell0.png",
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
    "summonerLevel": 1,
    "maxammo": "-1",
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/spell/SummonerSnowball.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/spell0.png",
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
    "summonerLevel": 6,
    "maxammo": "-1",
    "icon": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/spell/SummonerTeleport.png",
    "sprite": {
      "url": "http://ddragon.leagueoflegends.com/cdn/6.15.1/img/sprite/spell0.png",
      "x": 144,
      "y": 48
    }
  }
];

/**
 * Generate a function for sequences of re-usable IDs.
 *
 * @param prefix {string}
 * @param suffix {string}
 * @returns {Function}
 */
var index = function (prefix, suffix) {
  var id = 0

  prefix = prefix || ''
  suffix = suffix || ''

  return function () {
    return prefix + (id++) + suffix
  }
}

const uid = index();

const apiKey = '81d00796-d2a2-4e8e-b112-2c20c7ef60c0';
const baseUrl = 'https://euw.api.pvp.net';
const apiUrl = `${ baseUrl }/api/lol/euw/v1.4`;

const fetchSummoner = name => {
  const url = `${ apiUrl }/summoner/by-name/${ name }?api_key=${ apiKey }`;

  return new Promise((resolve, reject) => {
    resolve({
      id: 72517081,
      name: "ngrygod",
      profileIconId: 956,
      revisionDate: 1476704800000,
      summonerLevel: 30
    });
    return;

    // TODO: fetch
    // http(url, (err, res, body) => {
    //   const json = JSON.parse(body)
    //   const summoner = json[name.toLowerCase()]
    //
    //   if (summoner) {
    //     resolve(summoner)
    //   }
    //   else {
    //     reject('No summoner found.')
    //   }
    // })
  });
};

const createSpell = id => {
  const spell = spells.find(s => s.id === id);
  return immutable({}, spell, {
    uid: uid(),
    state: 'available',
    cooldown: 0,
    refCooldown: spell.cooldown
  });
};

const fetchEnnemies = summoner => {
  const url = `${ apiUrl }/observer-mode/rest/consumer/getSpectatorGameInfo/EUW1/${ summoner.id }?api_key=${ apiKey }`;

  return new Promise((resolve, reject) => {
    resolve([{
      name: 'Vocyfera12',
      role: 'Top',
      champion: champions.find(c => c.id === 'jax'),
      spells: [createSpell('teleport'), createSpell('haste')]
    }, {
      name: 'phuctran',
      role: 'Jungle',
      champion: champions.find(c => c.id === 'olaf'),
      spells: [createSpell('smite'), createSpell('haste')]
    }, {
      name: 'Mr Over',
      role: 'Mid',
      champion: champions.find(c => c.id === 'leblanc'),
      spells: [createSpell('dot'), createSpell('flash')]
    }, {
      name: 'ngrygod',
      role: 'ADC',
      champion: champions.find(c => c.id === 'lucian'),
      spells: [createSpell('heal'), createSpell('flash')]
    }, {
      name: 'xxatomexx',
      role: 'Support',
      champion: champions.find(c => c.id === 'leona'),
      spells: [createSpell('exhaust'), createSpell('flash')]
    }]);
    return;

    // TODO: fetch
    // http(`https://crossorigin.me/${url}`, (err, res, body) => {
    //   if (403 === res.statusCode) return reject('No live game found.')
    //
    //   const json = JSON.parse(body)
    //   const ennemies = json.participants.map(participant => ({
    //     summonerName: participant.summonerName,
    //     championId: participant.championId,
    //     spell1Id: participant.spell1Id,
    //     spell2Id: participant.spell2Id
    //   }))
    //   console.log(ennemies)
    //
    //   resolve(ennemies)
    // })
  });
};

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();

var asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new Promise(function (resolve, reject) {
      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          return Promise.resolve(value).then(function (value) {
            step("next", value);
          }, function (err) {
            step("throw", err);
          });
        }
      }

      return step("next");
    });
  };
};

const fetch = (() => {
  var _ref = asyncToGenerator(function* (data, state, send, done) {
    try {
      const summoner = yield fetchSummoner(state.summoner);
      const ennemies = yield fetchEnnemies(summoner);

      send('game:summoner', summoner, done);
      send('game:ennemies', ennemies, function () {
        send('location:setLocation', { location: '/ingame' }, done);
      });
    } catch (err) {
      send('app:error', err, done);
    }
  });

  return function fetch(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
})();



var effects = Object.freeze({
  fetch: fetch
});

const tick = (send, done) => {
  setInterval(() => {
    send('game:decrementAllSpellsCooldown', 1, done);
  }, 1000);
};

var subscriptions = Object.freeze({
  tick: tick
});

var gameModel = {
  namespace: 'game',
  state: { summoner: '', ennemies: [] },
  reducers,
  effects,
  subscriptions
};

var slice = Array.prototype.slice

var __moduleExports$5 = iterativelyWalk

function iterativelyWalk(nodes, cb) {
    if (!('length' in nodes)) {
        nodes = [nodes]
    }
    
    nodes = slice.call(nodes)

    while(nodes.length) {
        var node = nodes.shift(),
            ret = cb(node)

        if (ret) {
            return ret
        }

        if (node.childNodes && node.childNodes.length) {
            nodes = slice.call(node.childNodes).concat(nodes)
        }
    }
}

var __moduleExports$6 = Comment$1

function Comment$1(data, owner) {
    if (!(this instanceof Comment$1)) {
        return new Comment$1(data, owner)
    }

    this.data = data
    this.nodeValue = data
    this.length = data.length
    this.ownerDocument = owner || null
}

Comment$1.prototype.nodeType = 8
Comment$1.prototype.nodeName = "#comment"

Comment$1.prototype.toString = function _Comment_toString() {
    return "[object Comment]"
}

var __moduleExports$7 = DOMText$1

function DOMText$1(value, owner) {
    if (!(this instanceof DOMText$1)) {
        return new DOMText$1(value)
    }

    this.data = value || ""
    this.length = this.data.length
    this.ownerDocument = owner || null
}

DOMText$1.prototype.type = "DOMTextNode"
DOMText$1.prototype.nodeType = 3
DOMText$1.prototype.nodeName = "#text"

DOMText$1.prototype.toString = function _Text_toString() {
    return this.data
}

DOMText$1.prototype.replaceData = function replaceData(index, length, value) {
    var current = this.data
    var left = current.substring(0, index)
    var right = current.substring(index + length, current.length)
    this.data = left + value + right
    this.length = this.data.length
}

var __moduleExports$9 = dispatchEvent$2

function dispatchEvent$2(ev) {
    var elem = this
    var type = ev.type

    if (!ev.target) {
        ev.target = elem
    }

    if (!elem.listeners) {
        elem.listeners = {}
    }

    var listeners = elem.listeners[type]

    if (listeners) {
        return listeners.forEach(function (listener) {
            ev.currentTarget = elem
            if (typeof listener === 'function') {
                listener(ev)
            } else {
                listener.handleEvent(ev)
            }
        })
    }

    if (elem.parentNode) {
        elem.parentNode.dispatchEvent(ev)
    }
}

var __moduleExports$10 = addEventListener$2

function addEventListener$2(type, listener) {
    var elem = this

    if (!elem.listeners) {
        elem.listeners = {}
    }

    if (!elem.listeners[type]) {
        elem.listeners[type] = []
    }

    if (elem.listeners[type].indexOf(listener) === -1) {
        elem.listeners[type].push(listener)
    }
}

var __moduleExports$11 = removeEventListener$2

function removeEventListener$2(type, listener) {
    var elem = this

    if (!elem.listeners) {
        return
    }

    if (!elem.listeners[type]) {
        return
    }

    var list = elem.listeners[type]
    var index = list.indexOf(listener)
    if (index !== -1) {
        list.splice(index, 1)
    }
}

var __moduleExports$12 = serializeNode$1

var voidElements = ["area","base","br","col","embed","hr","img","input","keygen","link","menuitem","meta","param","source","track","wbr"];

function serializeNode$1(node) {
    switch (node.nodeType) {
        case 3:
            return escapeText(node.data)
        case 8:
            return "<!--" + node.data + "-->"
        default:
            return serializeElement(node)
    }
}

function serializeElement(elem) {
    var strings = []

    var tagname = elem.tagName

    if (elem.namespaceURI === "http://www.w3.org/1999/xhtml") {
        tagname = tagname.toLowerCase()
    }

    strings.push("<" + tagname + properties(elem) + datasetify(elem))

    if (voidElements.indexOf(tagname) > -1) {
        strings.push(" />")
    } else {
        strings.push(">")

        if (elem.childNodes.length) {
            strings.push.apply(strings, elem.childNodes.map(serializeNode$1))
        } else if (elem.textContent || elem.innerText) {
            strings.push(escapeText(elem.textContent || elem.innerText))
        } else if (elem.innerHTML) {
            strings.push(elem.innerHTML)
        }

        strings.push("</" + tagname + ">")
    }

    return strings.join("")
}

function isProperty(elem, key) {
    var type = typeof elem[key]

    if (key === "style" && Object.keys(elem.style).length > 0) {
      return true
    }

    return elem.hasOwnProperty(key) &&
        (type === "string" || type === "boolean" || type === "number") &&
        key !== "nodeName" && key !== "className" && key !== "tagName" &&
        key !== "textContent" && key !== "innerText" && key !== "namespaceURI" &&  key !== "innerHTML"
}

function stylify(styles) {
    if (typeof styles === 'string') return styles
    var attr = ""
    Object.keys(styles).forEach(function (key) {
        var value = styles[key]
        key = key.replace(/[A-Z]/g, function(c) {
            return "-" + c.toLowerCase();
        })
        attr += key + ":" + value + ";"
    })
    return attr
}

function datasetify(elem) {
    var ds = elem.dataset
    var props = []

    for (var key in ds) {
        props.push({ name: "data-" + key, value: ds[key] })
    }

    return props.length ? stringify(props) : ""
}

function stringify(list) {
    var attributes = []
    list.forEach(function (tuple) {
        var name = tuple.name
        var value = tuple.value

        if (name === "style") {
            value = stylify(value)
        }

        attributes.push(name + "=" + "\"" + escapeAttributeValue(value) + "\"")
    })

    return attributes.length ? " " + attributes.join(" ") : ""
}

function properties(elem) {
    var props = []
    for (var key in elem) {
        if (isProperty(elem, key)) {
            props.push({ name: key, value: elem[key] })
        }
    }

    for (var ns in elem._attributes) {
      for (var attribute in elem._attributes[ns]) {
        var prop = elem._attributes[ns][attribute]
        var name = (prop.prefix ? prop.prefix + ":" : "") + attribute
        props.push({ name: name, value: prop.value })
      }
    }

    if (elem.className) {
        props.push({ name: "class", value: elem.className })
    }

    return props.length ? stringify(props) : ""
}

function escapeText(s) {
    var str = '';

    if (typeof(s) === 'string') { 
        str = s; 
    } else if (s) {
        str = s.toString();
    }

    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
}

function escapeAttributeValue(str) {
    return escapeText(str).replace(/"/g, "&quot;")
}

var domWalk$1 = __moduleExports$5
var dispatchEvent$1 = __moduleExports$9
var addEventListener$1 = __moduleExports$10
var removeEventListener$1 = __moduleExports$11
var serializeNode = __moduleExports$12

var htmlns = "http://www.w3.org/1999/xhtml"

var __moduleExports$8 = DOMElement$1

function DOMElement$1(tagName, owner, namespace) {
    if (!(this instanceof DOMElement$1)) {
        return new DOMElement$1(tagName)
    }

    var ns = namespace === undefined ? htmlns : (namespace || null)

    this.tagName = ns === htmlns ? String(tagName).toUpperCase() : tagName
    this.nodeName = this.tagName
    this.className = ""
    this.dataset = {}
    this.childNodes = []
    this.parentNode = null
    this.style = {}
    this.ownerDocument = owner || null
    this.namespaceURI = ns
    this._attributes = {}

    if (this.tagName === 'INPUT') {
      this.type = 'text'
    }
}

DOMElement$1.prototype.type = "DOMElement"
DOMElement$1.prototype.nodeType = 1

DOMElement$1.prototype.appendChild = function _Element_appendChild(child) {
    if (child.parentNode) {
        child.parentNode.removeChild(child)
    }

    this.childNodes.push(child)
    child.parentNode = this

    return child
}

DOMElement$1.prototype.replaceChild =
    function _Element_replaceChild(elem, needle) {
        // TODO: Throw NotFoundError if needle.parentNode !== this

        if (elem.parentNode) {
            elem.parentNode.removeChild(elem)
        }

        var index = this.childNodes.indexOf(needle)

        needle.parentNode = null
        this.childNodes[index] = elem
        elem.parentNode = this

        return needle
    }

DOMElement$1.prototype.removeChild = function _Element_removeChild(elem) {
    // TODO: Throw NotFoundError if elem.parentNode !== this

    var index = this.childNodes.indexOf(elem)
    this.childNodes.splice(index, 1)

    elem.parentNode = null
    return elem
}

DOMElement$1.prototype.insertBefore =
    function _Element_insertBefore(elem, needle) {
        // TODO: Throw NotFoundError if referenceElement is a dom node
        // and parentNode !== this

        if (elem.parentNode) {
            elem.parentNode.removeChild(elem)
        }

        var index = needle === null || needle === undefined ?
            -1 :
            this.childNodes.indexOf(needle)

        if (index > -1) {
            this.childNodes.splice(index, 0, elem)
        } else {
            this.childNodes.push(elem)
        }

        elem.parentNode = this
        return elem
    }

DOMElement$1.prototype.setAttributeNS =
    function _Element_setAttributeNS(namespace, name, value) {
        var prefix = null
        var localName = name
        var colonPosition = name.indexOf(":")
        if (colonPosition > -1) {
            prefix = name.substr(0, colonPosition)
            localName = name.substr(colonPosition + 1)
        }
        if (this.tagName === 'INPUT' && name === 'type') {
          this.type = value;
        }
        else {
          var attributes = this._attributes[namespace] || (this._attributes[namespace] = {})
          attributes[localName] = {value: value, prefix: prefix}
        }
    }

DOMElement$1.prototype.getAttributeNS =
    function _Element_getAttributeNS(namespace, name) {
        var attributes = this._attributes[namespace];
        var value = attributes && attributes[name] && attributes[name].value
        if (this.tagName === 'INPUT' && name === 'type') {
          return this.type;
        }
        if (typeof value !== "string") {
            return null
        }
        return value
    }

DOMElement$1.prototype.removeAttributeNS =
    function _Element_removeAttributeNS(namespace, name) {
        var attributes = this._attributes[namespace];
        if (attributes) {
            delete attributes[name]
        }
    }

DOMElement$1.prototype.hasAttributeNS =
    function _Element_hasAttributeNS(namespace, name) {
        var attributes = this._attributes[namespace]
        return !!attributes && name in attributes;
    }

DOMElement$1.prototype.setAttribute = function _Element_setAttribute(name, value) {
    return this.setAttributeNS(null, name, value)
}

DOMElement$1.prototype.getAttribute = function _Element_getAttribute(name) {
    return this.getAttributeNS(null, name)
}

DOMElement$1.prototype.removeAttribute = function _Element_removeAttribute(name) {
    return this.removeAttributeNS(null, name)
}

DOMElement$1.prototype.hasAttribute = function _Element_hasAttribute(name) {
    return this.hasAttributeNS(null, name)
}

DOMElement$1.prototype.removeEventListener = removeEventListener$1
DOMElement$1.prototype.addEventListener = addEventListener$1
DOMElement$1.prototype.dispatchEvent = dispatchEvent$1

// Un-implemented
DOMElement$1.prototype.focus = function _Element_focus() {
    return void 0
}

DOMElement$1.prototype.toString = function _Element_toString() {
    return serializeNode(this)
}

DOMElement$1.prototype.getElementsByClassName = function _Element_getElementsByClassName(classNames) {
    var classes = classNames.split(" ");
    var elems = []

    domWalk$1(this, function (node) {
        if (node.nodeType === 1) {
            var nodeClassName = node.className || ""
            var nodeClasses = nodeClassName.split(" ")

            if (classes.every(function (item) {
                return nodeClasses.indexOf(item) !== -1
            })) {
                elems.push(node)
            }
        }
    })

    return elems
}

DOMElement$1.prototype.getElementsByTagName = function _Element_getElementsByTagName(tagName) {
    tagName = tagName.toLowerCase()
    var elems = []

    domWalk$1(this.childNodes, function (node) {
        if (node.nodeType === 1 && (tagName === '*' || node.tagName.toLowerCase() === tagName)) {
            elems.push(node)
        }
    })

    return elems
}

DOMElement$1.prototype.contains = function _Element_contains(element) {
    return domWalk$1(this, function (node) {
        return element === node
    }) || false
}

var DOMElement$2 = __moduleExports$8

var __moduleExports$13 = DocumentFragment$1

function DocumentFragment$1(owner) {
    if (!(this instanceof DocumentFragment$1)) {
        return new DocumentFragment$1()
    }

    this.childNodes = []
    this.parentNode = null
    this.ownerDocument = owner || null
}

DocumentFragment$1.prototype.type = "DocumentFragment"
DocumentFragment$1.prototype.nodeType = 11
DocumentFragment$1.prototype.nodeName = "#document-fragment"

DocumentFragment$1.prototype.appendChild  = DOMElement$2.prototype.appendChild
DocumentFragment$1.prototype.replaceChild = DOMElement$2.prototype.replaceChild
DocumentFragment$1.prototype.removeChild  = DOMElement$2.prototype.removeChild

DocumentFragment$1.prototype.toString =
    function _DocumentFragment_toString() {
        return this.childNodes.map(function (node) {
            return String(node)
        }).join("")
    }

var __moduleExports$14 = Event$1

function Event$1(family) {}

Event$1.prototype.initEvent = function _Event_initEvent(type, bubbles, cancelable) {
    this.type = type
    this.bubbles = bubbles
    this.cancelable = cancelable
}

Event$1.prototype.preventDefault = function _Event_preventDefault() {
    
}

var domWalk = __moduleExports$5

var Comment = __moduleExports$6
var DOMText = __moduleExports$7
var DOMElement = __moduleExports$8
var DocumentFragment = __moduleExports$13
var Event = __moduleExports$14
var dispatchEvent = __moduleExports$9
var addEventListener = __moduleExports$10
var removeEventListener = __moduleExports$11

var __moduleExports$4 = Document$1;

function Document$1() {
    if (!(this instanceof Document$1)) {
        return new Document$1();
    }

    this.head = this.createElement("head")
    this.body = this.createElement("body")
    this.documentElement = this.createElement("html")
    this.documentElement.appendChild(this.head)
    this.documentElement.appendChild(this.body)
    this.childNodes = [this.documentElement]
    this.nodeType = 9
}

var proto = Document$1.prototype;
proto.createTextNode = function createTextNode(value) {
    return new DOMText(value, this)
}

proto.createElementNS = function createElementNS(namespace, tagName) {
    var ns = namespace === null ? null : String(namespace)
    return new DOMElement(tagName, this, ns)
}

proto.createElement = function createElement(tagName) {
    return new DOMElement(tagName, this)
}

proto.createDocumentFragment = function createDocumentFragment() {
    return new DocumentFragment(this)
}

proto.createEvent = function createEvent(family) {
    return new Event(family)
}

proto.createComment = function createComment(data) {
    return new Comment(data, this)
}

proto.getElementById = function getElementById(id) {
    id = String(id)

    var result = domWalk(this.childNodes, function (node) {
        if (String(node.id) === id) {
            return node
        }
    })

    return result || null
}

proto.getElementsByClassName = DOMElement.prototype.getElementsByClassName
proto.getElementsByTagName = DOMElement.prototype.getElementsByTagName
proto.contains = DOMElement.prototype.contains

proto.removeEventListener = removeEventListener
proto.addEventListener = addEventListener
proto.dispatchEvent = dispatchEvent

var Document = __moduleExports$4;

var __moduleExports$3 = new Document();

var __moduleExports$2 = createCommonjsModule(function (module) {
var topLevel = typeof commonjsGlobal !== 'undefined' ? commonjsGlobal :
    typeof window !== 'undefined' ? window : {}
var minDoc = __moduleExports$3;

if (typeof document !== 'undefined') {
    module.exports = document;
} else {
    var doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }

    module.exports = doccy;
}
});

var __moduleExports$16 = attributeToProperty

var transform = {
  'class': 'className',
  'for': 'htmlFor',
  'http-equiv': 'httpEquiv'
}

function attributeToProperty (h) {
  return function (tagName, attrs, children) {
    for (var attr in attrs) {
      if (attr in transform) {
        attrs[transform[attr]] = attrs[attr]
        delete attrs[attr]
      }
    }
    return h(tagName, attrs, children)
  }
}

var attrToProp = __moduleExports$16

var VAR = 0;
var TEXT = 1;
var OPEN = 2;
var CLOSE = 3;
var ATTR = 4;
var ATTR_KEY = 5;
var ATTR_KEY_W = 6;
var ATTR_VALUE_W = 7;
var ATTR_VALUE = 8;
var ATTR_VALUE_SQ = 9;
var ATTR_VALUE_DQ = 10;
var ATTR_EQ = 11;
var ATTR_BREAK = 12;
var __moduleExports$15 = function (h, opts) {
  h = attrToProp(h)
  if (!opts) opts = {}
  var concat = opts.concat || function (a, b) {
    return String(a) + String(b)
  }

  return function (strings) {
    var state = TEXT, reg = ''
    var arglen = arguments.length
    var parts = []

    for (var i = 0; i < strings.length; i++) {
      if (i < arglen - 1) {
        var arg = arguments[i+1]
        var p = parse(strings[i])
        var xstate = state
        if (xstate === ATTR_VALUE_DQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_SQ) xstate = ATTR_VALUE
        if (xstate === ATTR_VALUE_W) xstate = ATTR_VALUE
        if (xstate === ATTR) xstate = ATTR_KEY
        p.push([ VAR, xstate, arg ])
        parts.push.apply(parts, p)
      } else parts.push.apply(parts, parse(strings[i]))
    }

    var tree = [null,{},[]]
    var stack = [[tree,-1]]
    for (var i = 0; i < parts.length; i++) {
      var cur = stack[stack.length-1][0]
      var p = parts[i], s = p[0]
      if (s === OPEN && /^\//.test(p[1])) {
        var ix = stack[stack.length-1][1]
        if (stack.length > 1) {
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === OPEN) {
        var c = [p[1],{},[]]
        cur[2].push(c)
        stack.push([c,cur[2].length-1])
      } else if (s === ATTR_KEY || (s === VAR && p[1] === ATTR_KEY)) {
        var key = ''
        var copyKey
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_KEY) {
            key = concat(key, parts[i][1])
          } else if (parts[i][0] === VAR && parts[i][1] === ATTR_KEY) {
            if (typeof parts[i][2] === 'object' && !key) {
              for (copyKey in parts[i][2]) {
                if (parts[i][2].hasOwnProperty(copyKey) && !cur[1][copyKey]) {
                  cur[1][copyKey] = parts[i][2][copyKey]
                }
              }
            } else {
              key = concat(key, parts[i][2])
            }
          } else break
        }
        if (parts[i][0] === ATTR_EQ) i++
        var j = i
        for (; i < parts.length; i++) {
          if (parts[i][0] === ATTR_VALUE || parts[i][0] === ATTR_KEY) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][1])
            else cur[1][key] = concat(cur[1][key], parts[i][1])
          } else if (parts[i][0] === VAR
          && (parts[i][1] === ATTR_VALUE || parts[i][1] === ATTR_KEY)) {
            if (!cur[1][key]) cur[1][key] = strfn(parts[i][2])
            else cur[1][key] = concat(cur[1][key], parts[i][2])
          } else {
            if (key.length && !cur[1][key] && i === j
            && (parts[i][0] === CLOSE || parts[i][0] === ATTR_BREAK)) {
              // https://html.spec.whatwg.org/multipage/infrastructure.html#boolean-attributes
              // empty string is falsy, not well behaved value in browser
              cur[1][key] = key.toLowerCase()
            }
            break
          }
        }
      } else if (s === ATTR_KEY) {
        cur[1][p[1]] = true
      } else if (s === VAR && p[1] === ATTR_KEY) {
        cur[1][p[2]] = true
      } else if (s === CLOSE) {
        if (selfClosing(cur[0]) && stack.length) {
          var ix = stack[stack.length-1][1]
          stack.pop()
          stack[stack.length-1][0][2][ix] = h(
            cur[0], cur[1], cur[2].length ? cur[2] : undefined
          )
        }
      } else if (s === VAR && p[1] === TEXT) {
        if (p[2] === undefined || p[2] === null) p[2] = ''
        else if (!p[2]) p[2] = concat('', p[2])
        if (Array.isArray(p[2][0])) {
          cur[2].push.apply(cur[2], p[2])
        } else {
          cur[2].push(p[2])
        }
      } else if (s === TEXT) {
        cur[2].push(p[1])
      } else if (s === ATTR_EQ || s === ATTR_BREAK) {
        // no-op
      } else {
        throw new Error('unhandled: ' + s)
      }
    }

    if (tree[2].length > 1 && /^\s*$/.test(tree[2][0])) {
      tree[2].shift()
    }

    if (tree[2].length > 2
    || (tree[2].length === 2 && /\S/.test(tree[2][1]))) {
      throw new Error(
        'multiple root elements must be wrapped in an enclosing tag'
      )
    }
    if (Array.isArray(tree[2][0]) && typeof tree[2][0][0] === 'string'
    && Array.isArray(tree[2][0][2])) {
      tree[2][0] = h(tree[2][0][0], tree[2][0][1], tree[2][0][2])
    }
    return tree[2][0]

    function parse (str) {
      var res = []
      if (state === ATTR_VALUE_W) state = ATTR
      for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i)
        if (state === TEXT && c === '<') {
          if (reg.length) res.push([TEXT, reg])
          reg = ''
          state = OPEN
        } else if (c === '>' && !quot(state)) {
          if (state === OPEN) {
            res.push([OPEN,reg])
          } else if (state === ATTR_KEY) {
            res.push([ATTR_KEY,reg])
          } else if (state === ATTR_VALUE && reg.length) {
            res.push([ATTR_VALUE,reg])
          }
          res.push([CLOSE])
          reg = ''
          state = TEXT
        } else if (state === TEXT) {
          reg += c
        } else if (state === OPEN && /\s/.test(c)) {
          res.push([OPEN, reg])
          reg = ''
          state = ATTR
        } else if (state === OPEN) {
          reg += c
        } else if (state === ATTR && /[\w-]/.test(c)) {
          state = ATTR_KEY
          reg = c
        } else if (state === ATTR && /\s/.test(c)) {
          if (reg.length) res.push([ATTR_KEY,reg])
          res.push([ATTR_BREAK])
        } else if (state === ATTR_KEY && /\s/.test(c)) {
          res.push([ATTR_KEY,reg])
          reg = ''
          state = ATTR_KEY_W
        } else if (state === ATTR_KEY && c === '=') {
          res.push([ATTR_KEY,reg],[ATTR_EQ])
          reg = ''
          state = ATTR_VALUE_W
        } else if (state === ATTR_KEY) {
          reg += c
        } else if ((state === ATTR_KEY_W || state === ATTR) && c === '=') {
          res.push([ATTR_EQ])
          state = ATTR_VALUE_W
        } else if ((state === ATTR_KEY_W || state === ATTR) && !/\s/.test(c)) {
          res.push([ATTR_BREAK])
          if (/[\w-]/.test(c)) {
            reg += c
            state = ATTR_KEY
          } else state = ATTR
        } else if (state === ATTR_VALUE_W && c === '"') {
          state = ATTR_VALUE_DQ
        } else if (state === ATTR_VALUE_W && c === "'") {
          state = ATTR_VALUE_SQ
        } else if (state === ATTR_VALUE_DQ && c === '"') {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_SQ && c === "'") {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE_W && !/\s/.test(c)) {
          state = ATTR_VALUE
          i--
        } else if (state === ATTR_VALUE && /\s/.test(c)) {
          res.push([ATTR_VALUE,reg],[ATTR_BREAK])
          reg = ''
          state = ATTR
        } else if (state === ATTR_VALUE || state === ATTR_VALUE_SQ
        || state === ATTR_VALUE_DQ) {
          reg += c
        }
      }
      if (state === TEXT && reg.length) {
        res.push([TEXT,reg])
        reg = ''
      } else if (state === ATTR_VALUE && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_DQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_VALUE_SQ && reg.length) {
        res.push([ATTR_VALUE,reg])
        reg = ''
      } else if (state === ATTR_KEY) {
        res.push([ATTR_KEY,reg])
        reg = ''
      }
      return res
    }
  }

  function strfn (x) {
    if (typeof x === 'function') return x
    else if (typeof x === 'string') return x
    else if (x && typeof x === 'object') return x
    else return concat('', x)
  }
}

function quot (state) {
  return state === ATTR_VALUE_SQ || state === ATTR_VALUE_DQ
}

var closeRE = RegExp('^(' + [
  'area', 'base', 'basefont', 'bgsound', 'br', 'col', 'command', 'embed',
  'frame', 'hr', 'img', 'input', 'isindex', 'keygen', 'link', 'meta', 'param',
  'source', 'track', 'wbr',
  // SVG TAGS
  'animate', 'animateTransform', 'circle', 'cursor', 'desc', 'ellipse',
  'feBlend', 'feColorMatrix', 'feComposite',
  'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap',
  'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR',
  'feGaussianBlur', 'feImage', 'feMergeNode', 'feMorphology',
  'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile',
  'feTurbulence', 'font-face-format', 'font-face-name', 'font-face-uri',
  'glyph', 'glyphRef', 'hkern', 'image', 'line', 'missing-glyph', 'mpath',
  'path', 'polygon', 'polyline', 'rect', 'set', 'stop', 'tref', 'use', 'view',
  'vkern'
].join('|') + ')(?:[\.#][a-zA-Z0-9\u007F-\uFFFF_:-]+)*$')
function selfClosing (tag) { return closeRE.test(tag) }

var __moduleExports$18 = createCommonjsModule(function (module) {
if (typeof window !== "undefined") {
    module.exports = window;
} else if (typeof commonjsGlobal !== "undefined") {
    module.exports = commonjsGlobal;
} else if (typeof self !== "undefined"){
    module.exports = self;
} else {
    module.exports = {};
}
});

/* global MutationObserver */
var document$2 = __moduleExports$2
var window$1 = __moduleExports$18
var watch = Object.create(null)
var KEY_ID = 'onloadid' + (new Date() % 9e6).toString(36)
var KEY_ATTR = 'data-' + KEY_ID
var INDEX = 0

if (window$1 && window$1.MutationObserver) {
  var observer = new MutationObserver(function (mutations) {
    if (Object.keys(watch).length < 1) return
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].attributeName === KEY_ATTR) {
        eachAttr(mutations[i], turnon, turnoff)
        continue
      }
      eachMutation(mutations[i].removedNodes, turnoff)
      eachMutation(mutations[i].addedNodes, turnon)
    }
  })
  observer.observe(document$2.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeOldValue: true,
    attributeFilter: [KEY_ATTR]
  })
}

var __moduleExports$17 = function onload (el, on, off, caller) {
  on = on || function () {}
  off = off || function () {}
  el.setAttribute(KEY_ATTR, 'o' + INDEX)
  watch['o' + INDEX] = [on, off, 0, caller || onload.caller]
  INDEX += 1
  return el
}

function turnon (index, el) {
  if (watch[index][0] && watch[index][2] === 0) {
    watch[index][0](el)
    watch[index][2] = 1
  }
}

function turnoff (index, el) {
  if (watch[index][1] && watch[index][2] === 1) {
    watch[index][1](el)
    watch[index][2] = 0
  }
}

function eachAttr (mutation, on, off) {
  var newValue = mutation.target.getAttribute(KEY_ATTR)
  if (sameOrigin(mutation.oldValue, newValue)) {
    watch[newValue] = watch[mutation.oldValue]
    return
  }
  if (watch[mutation.oldValue]) {
    off(mutation.oldValue, mutation.target)
  }
  if (watch[newValue]) {
    on(newValue, mutation.target)
  }
}

function sameOrigin (oldValue, newValue) {
  if (!oldValue || !newValue) return false
  return watch[oldValue][3] === watch[newValue][3]
}

function eachMutation (nodes, fn) {
  var keys = Object.keys(watch)
  for (var i = 0; i < nodes.length; i++) {
    if (nodes[i] && nodes[i].getAttribute && nodes[i].getAttribute(KEY_ATTR)) {
      var onloadid = nodes[i].getAttribute(KEY_ATTR)
      keys.forEach(function (k) {
        if (onloadid === k) {
          fn(k, nodes[i])
        }
      })
    }
    if (nodes[i].childNodes.length > 0) {
      eachMutation(nodes[i].childNodes, fn)
    }
  }
}

var document$1 = __moduleExports$2
var hyperx = __moduleExports$15
var onload = __moduleExports$17

var SVGNS = 'http://www.w3.org/2000/svg'
var XLINKNS = 'http://www.w3.org/1999/xlink'

var BOOL_PROPS = {
  autofocus: 1,
  checked: 1,
  defaultchecked: 1,
  disabled: 1,
  formnovalidate: 1,
  indeterminate: 1,
  readonly: 1,
  required: 1,
  selected: 1,
  willvalidate: 1
}
var SVG_TAGS = [
  'svg',
  'altGlyph', 'altGlyphDef', 'altGlyphItem', 'animate', 'animateColor',
  'animateMotion', 'animateTransform', 'circle', 'clipPath', 'color-profile',
  'cursor', 'defs', 'desc', 'ellipse', 'feBlend', 'feColorMatrix',
  'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting',
  'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB',
  'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode',
  'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting',
  'feSpotLight', 'feTile', 'feTurbulence', 'filter', 'font', 'font-face',
  'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri',
  'foreignObject', 'g', 'glyph', 'glyphRef', 'hkern', 'image', 'line',
  'linearGradient', 'marker', 'mask', 'metadata', 'missing-glyph', 'mpath',
  'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect',
  'set', 'stop', 'switch', 'symbol', 'text', 'textPath', 'title', 'tref',
  'tspan', 'use', 'view', 'vkern'
]

function belCreateElement (tag, props, children) {
  var el

  // If an svg tag, it needs a namespace
  if (SVG_TAGS.indexOf(tag) !== -1) {
    props.namespace = SVGNS
  }

  // If we are using a namespace
  var ns = false
  if (props.namespace) {
    ns = props.namespace
    delete props.namespace
  }

  // Create the element
  if (ns) {
    el = document$1.createElementNS(ns, tag)
  } else {
    el = document$1.createElement(tag)
  }

  // If adding onload events
  if (props.onload || props.onunload) {
    var load = props.onload || function () {}
    var unload = props.onunload || function () {}
    onload(el, function belOnload () {
      load(el)
    }, function belOnunload () {
      unload(el)
    },
    // We have to use non-standard `caller` to find who invokes `belCreateElement`
    belCreateElement.caller.caller.caller)
    delete props.onload
    delete props.onunload
  }

  // Create the properties
  for (var p in props) {
    if (props.hasOwnProperty(p)) {
      var key = p.toLowerCase()
      var val = props[p]
      // Normalize className
      if (key === 'classname') {
        key = 'class'
        p = 'class'
      }
      // The for attribute gets transformed to htmlFor, but we just set as for
      if (p === 'htmlFor') {
        p = 'for'
      }
      // If a property is boolean, set itself to the key
      if (BOOL_PROPS[key]) {
        if (val === 'true') val = key
        else if (val === 'false') continue
      }
      // If a property prefers being set directly vs setAttribute
      if (key.slice(0, 2) === 'on') {
        el[p] = val
      } else {
        if (ns) {
          if (p === 'xlink:href') {
            el.setAttributeNS(XLINKNS, p, val)
          } else {
            el.setAttributeNS(null, p, val)
          }
        } else {
          el.setAttribute(p, val)
        }
      }
    }
  }

  function appendChild (childs) {
    if (!Array.isArray(childs)) return
    for (var i = 0; i < childs.length; i++) {
      var node = childs[i]
      if (Array.isArray(node)) {
        appendChild(node)
        continue
      }

      if (typeof node === 'number' ||
        typeof node === 'boolean' ||
        node instanceof Date ||
        node instanceof RegExp) {
        node = node.toString()
      }

      if (typeof node === 'string') {
        if (el.lastChild && el.lastChild.nodeName === '#text') {
          el.lastChild.nodeValue += node
          continue
        }
        node = document$1.createTextNode(node)
      }

      if (node && node.nodeType) {
        el.appendChild(node)
      }
    }
  }
  appendChild(children)

  return el
}

var __moduleExports$1 = hyperx(belCreateElement)
var createElement = belCreateElement

__moduleExports$1.createElement = createElement;

// Create a range object for efficently rendering strings to elements.
var range;

var doc = typeof document !== 'undefined' && document;

var testEl = doc ?
    doc.body || doc.createElement('div') :
    {};

var NS_XHTML = 'http://www.w3.org/1999/xhtml';

var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var COMMENT_NODE = 8;

// Fixes <https://github.com/patrick-steele-idem/morphdom/issues/32>
// (IE7+ support) <=IE7 does not support el.hasAttribute(name)
var hasAttributeNS;

if (testEl.hasAttributeNS) {
    hasAttributeNS = function(el, namespaceURI, name) {
        return el.hasAttributeNS(namespaceURI, name);
    };
} else if (testEl.hasAttribute) {
    hasAttributeNS = function(el, namespaceURI, name) {
        return el.hasAttribute(name);
    };
} else {
    hasAttributeNS = function(el, namespaceURI, name) {
        return !!el.getAttributeNode(name);
    };
}

function toElement(str) {
    if (!range && doc.createRange) {
        range = doc.createRange();
        range.selectNode(doc.body);
    }

    var fragment;
    if (range && range.createContextualFragment) {
        fragment = range.createContextualFragment(str);
    } else {
        fragment = doc.createElement('body');
        fragment.innerHTML = str;
    }
    return fragment.childNodes[0];
}

function syncBooleanAttrProp(fromEl, toEl, name) {
    if (fromEl[name] !== toEl[name]) {
        fromEl[name] = toEl[name];
        if (fromEl[name]) {
            fromEl.setAttribute(name, '');
        } else {
            fromEl.removeAttribute(name, '');
        }
    }
}

var specialElHandlers = {
    /**
     * Needed for IE. Apparently IE doesn't think that "selected" is an
     * attribute when reading over the attributes using selectEl.attributes
     */
    OPTION: function(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'selected');
    },
    /**
     * The "value" attribute is special for the <input> element since it sets
     * the initial value. Changing the "value" attribute without changing the
     * "value" property will have no effect since it is only used to the set the
     * initial value.  Similar for the "checked" attribute, and "disabled".
     */
    INPUT: function(fromEl, toEl) {
        syncBooleanAttrProp(fromEl, toEl, 'checked');
        syncBooleanAttrProp(fromEl, toEl, 'disabled');

        if (fromEl.value !== toEl.value) {
            fromEl.value = toEl.value;
        }

        if (!hasAttributeNS(toEl, null, 'value')) {
            fromEl.removeAttribute('value');
        }
    },

    TEXTAREA: function(fromEl, toEl) {
        var newValue = toEl.value;
        if (fromEl.value !== newValue) {
            fromEl.value = newValue;
        }

        if (fromEl.firstChild) {
            fromEl.firstChild.nodeValue = newValue;
        }
    }
};

function noop() {}

/**
 * Returns true if two node's names are the same.
 *
 * NOTE: We don't bother checking `namespaceURI` because you will never find two HTML elements with the same
 *       nodeName and different namespace URIs.
 *
 * @param {Element} a
 * @param {Element} b The target element
 * @return {boolean}
 */
function compareNodeNames(fromEl, toEl) {
    var fromNodeName = fromEl.nodeName;
    var toNodeName = toEl.nodeName;

    if (fromNodeName === toNodeName) {
        return true;
    }

    if (toEl.actualize &&
        fromNodeName.charCodeAt(0) < 91 && /* from tag name is upper case */
        toNodeName.charCodeAt(0) > 90 /* target tag name is lower case */) {
        // If the target element is a virtual DOM node then we may need to normalize the tag name
        // before comparing. Normal HTML elements that are in the "http://www.w3.org/1999/xhtml"
        // are converted to upper case
        return fromNodeName === toNodeName.toUpperCase();
    } else {
        return false;
    }
}

/**
 * Create an element, optionally with a known namespace URI.
 *
 * @param {string} name the element name, e.g. 'div' or 'svg'
 * @param {string} [namespaceURI] the element's namespace URI, i.e. the value of
 * its `xmlns` attribute or its inferred namespace.
 *
 * @return {Element}
 */
function createElementNS(name, namespaceURI) {
    return !namespaceURI || namespaceURI === NS_XHTML ?
        doc.createElement(name) :
        doc.createElementNS(namespaceURI, name);
}

/**
 * Loop over all of the attributes on the target node and make sure the original
 * DOM node has the same attributes. If an attribute found on the original node
 * is not on the new node then remove it from the original node.
 *
 * @param  {Element} fromNode
 * @param  {Element} toNode
 */
function morphAttrs(fromNode, toNode) {
    var attrs = toNode.attributes;
    var i;
    var attr;
    var attrName;
    var attrNamespaceURI;
    var attrValue;
    var fromValue;

    if (toNode.assignAttributes) {
        toNode.assignAttributes(fromNode);
    } else {
        for (i = attrs.length - 1; i >= 0; --i) {
            attr = attrs[i];
            attrName = attr.name;
            attrNamespaceURI = attr.namespaceURI;
            attrValue = attr.value;

            if (attrNamespaceURI) {
                attrName = attr.localName || attrName;
                fromValue = fromNode.getAttributeNS(attrNamespaceURI, attrName);

                if (fromValue !== attrValue) {
                    fromNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
                }
            } else {
                fromValue = fromNode.getAttribute(attrName);

                if (fromValue !== attrValue) {
                    fromNode.setAttribute(attrName, attrValue);
                }
            }
        }
    }

    // Remove any extra attributes found on the original DOM element that
    // weren't found on the target element.
    attrs = fromNode.attributes;

    for (i = attrs.length - 1; i >= 0; --i) {
        attr = attrs[i];
        if (attr.specified !== false) {
            attrName = attr.name;
            attrNamespaceURI = attr.namespaceURI;

            if (attrNamespaceURI) {
                attrName = attr.localName || attrName;

                if (!hasAttributeNS(toNode, attrNamespaceURI, attrName)) {
                    fromNode.removeAttributeNS(attrNamespaceURI, attrName);
                }
            } else {
                if (!hasAttributeNS(toNode, null, attrName)) {
                    fromNode.removeAttribute(attrName);
                }
            }
        }
    }
}

/**
 * Copies the children of one DOM element to another DOM element
 */
function moveChildren(fromEl, toEl) {
    var curChild = fromEl.firstChild;
    while (curChild) {
        var nextChild = curChild.nextSibling;
        toEl.appendChild(curChild);
        curChild = nextChild;
    }
    return toEl;
}

function defaultGetNodeKey(node) {
    return node.id;
}

function morphdom$1(fromNode, toNode, options) {
    if (!options) {
        options = {};
    }

    if (typeof toNode === 'string') {
        if (fromNode.nodeName === '#document' || fromNode.nodeName === 'HTML') {
            var toNodeHtml = toNode;
            toNode = doc.createElement('html');
            toNode.innerHTML = toNodeHtml;
        } else {
            toNode = toElement(toNode);
        }
    }

    var getNodeKey = options.getNodeKey || defaultGetNodeKey;
    var onBeforeNodeAdded = options.onBeforeNodeAdded || noop;
    var onNodeAdded = options.onNodeAdded || noop;
    var onBeforeElUpdated = options.onBeforeElUpdated || noop;
    var onElUpdated = options.onElUpdated || noop;
    var onBeforeNodeDiscarded = options.onBeforeNodeDiscarded || noop;
    var onNodeDiscarded = options.onNodeDiscarded || noop;
    var onBeforeElChildrenUpdated = options.onBeforeElChildrenUpdated || noop;
    var childrenOnly = options.childrenOnly === true;

    // This object is used as a lookup to quickly find all keyed elements in the original DOM tree.
    var fromNodesLookup = {};
    var keyedRemovalList;

    function addKeyedRemoval(key) {
        if (keyedRemovalList) {
            keyedRemovalList.push(key);
        } else {
            keyedRemovalList = [key];
        }
    }

    function walkDiscardedChildNodes(node, skipKeyedNodes) {
        if (node.nodeType === ELEMENT_NODE) {
            var curChild = node.firstChild;
            while (curChild) {

                var key = undefined;

                if (skipKeyedNodes && (key = getNodeKey(curChild))) {
                    // If we are skipping keyed nodes then we add the key
                    // to a list so that it can be handled at the very end.
                    addKeyedRemoval(key);
                } else {
                    // Only report the node as discarded if it is not keyed. We do this because
                    // at the end we loop through all keyed elements that were unmatched
                    // and then discard them in one final pass.
                    onNodeDiscarded(curChild);
                    if (curChild.firstChild) {
                        walkDiscardedChildNodes(curChild, skipKeyedNodes);
                    }
                }

                curChild = curChild.nextSibling;
            }
        }
    }

    /**
     * Removes a DOM node out of the original DOM
     *
     * @param  {Node} node The node to remove
     * @param  {Node} parentNode The nodes parent
     * @param  {Boolean} skipKeyedNodes If true then elements with keys will be skipped and not discarded.
     * @return {undefined}
     */
    function removeNode(node, parentNode, skipKeyedNodes) {
        if (onBeforeNodeDiscarded(node) === false) {
            return;
        }

        if (parentNode) {
            parentNode.removeChild(node);
        }

        onNodeDiscarded(node);
        walkDiscardedChildNodes(node, skipKeyedNodes);
    }

    // // TreeWalker implementation is no faster, but keeping this around in case this changes in the future
    // function indexTree(root) {
    //     var treeWalker = document.createTreeWalker(
    //         root,
    //         NodeFilter.SHOW_ELEMENT);
    //
    //     var el;
    //     while((el = treeWalker.nextNode())) {
    //         var key = getNodeKey(el);
    //         if (key) {
    //             fromNodesLookup[key] = el;
    //         }
    //     }
    // }

    // // NodeIterator implementation is no faster, but keeping this around in case this changes in the future
    //
    // function indexTree(node) {
    //     var nodeIterator = document.createNodeIterator(node, NodeFilter.SHOW_ELEMENT);
    //     var el;
    //     while((el = nodeIterator.nextNode())) {
    //         var key = getNodeKey(el);
    //         if (key) {
    //             fromNodesLookup[key] = el;
    //         }
    //     }
    // }

    function indexTree(node) {
        if (node.nodeType === ELEMENT_NODE) {
            var curChild = node.firstChild;
            while (curChild) {
                var key = getNodeKey(curChild);
                if (key) {
                    fromNodesLookup[key] = curChild;
                }

                // Walk recursively
                indexTree(curChild);

                curChild = curChild.nextSibling;
            }
        }
    }

    indexTree(fromNode);

    function handleNodeAdded(el) {
        onNodeAdded(el);

        var curChild = el.firstChild;
        while (curChild) {
            var nextSibling = curChild.nextSibling;

            var key = getNodeKey(curChild);
            if (key) {
                var unmatchedFromEl = fromNodesLookup[key];
                if (unmatchedFromEl && compareNodeNames(curChild, unmatchedFromEl)) {
                    curChild.parentNode.replaceChild(unmatchedFromEl, curChild);
                    morphEl(unmatchedFromEl, curChild);
                }
            }

            handleNodeAdded(curChild);
            curChild = nextSibling;
        }
    }

    function morphEl(fromEl, toEl, childrenOnly) {
        var toElKey = getNodeKey(toEl);
        var curFromNodeKey;

        if (toElKey) {
            // If an element with an ID is being morphed then it is will be in the final
            // DOM so clear it out of the saved elements collection
            delete fromNodesLookup[toElKey];
        }

        if (toNode.isSameNode && toNode.isSameNode(fromNode)) {
            return;
        }

        if (!childrenOnly) {
            if (onBeforeElUpdated(fromEl, toEl) === false) {
                return;
            }

            morphAttrs(fromEl, toEl);
            onElUpdated(fromEl);

            if (onBeforeElChildrenUpdated(fromEl, toEl) === false) {
                return;
            }
        }

        if (fromEl.nodeName !== 'TEXTAREA') {
            var curToNodeChild = toEl.firstChild;
            var curFromNodeChild = fromEl.firstChild;
            var curToNodeKey;

            var fromNextSibling;
            var toNextSibling;
            var matchingFromEl;

            outer: while (curToNodeChild) {
                toNextSibling = curToNodeChild.nextSibling;
                curToNodeKey = getNodeKey(curToNodeChild);

                while (curFromNodeChild) {
                    fromNextSibling = curFromNodeChild.nextSibling;

                    if (curToNodeChild.isSameNode && curToNodeChild.isSameNode(curFromNodeChild)) {
                        curToNodeChild = toNextSibling;
                        curFromNodeChild = fromNextSibling;
                        continue outer;
                    }

                    curFromNodeKey = getNodeKey(curFromNodeChild);

                    var curFromNodeType = curFromNodeChild.nodeType;

                    var isCompatible = undefined;

                    if (curFromNodeType === curToNodeChild.nodeType) {
                        if (curFromNodeType === ELEMENT_NODE) {
                            // Both nodes being compared are Element nodes

                            if (curToNodeKey) {
                                // The target node has a key so we want to match it up with the correct element
                                // in the original DOM tree
                                if (curToNodeKey !== curFromNodeKey) {
                                    // The current element in the original DOM tree does not have a matching key so
                                    // let's check our lookup to see if there is a matching element in the original
                                    // DOM tree
                                    if ((matchingFromEl = fromNodesLookup[curToNodeKey])) {
                                        if (curFromNodeChild.nextSibling === matchingFromEl) {
                                            // Special case for single element removals. To avoid removing the original
                                            // DOM node out of the tree (since that can break CSS transitions, etc.),
                                            // we will instead discard the current node and wait until the next
                                            // iteration to properly match up the keyed target element with its matching
                                            // element in the original tree
                                            isCompatible = false;
                                        } else {
                                            // We found a matching keyed element somewhere in the original DOM tree.
                                            // Let's moving the original DOM node into the current position and morph
                                            // it.

                                            // NOTE: We use insertBefore instead of replaceChild because we want to go through
                                            // the `removeNode()` function for the node that is being discarded so that
                                            // all lifecycle hooks are correctly invoked
                                            fromEl.insertBefore(matchingFromEl, curFromNodeChild);

                                            if (curFromNodeKey) {
                                                // Since the node is keyed it might be matched up later so we defer
                                                // the actual removal to later
                                                addKeyedRemoval(curFromNodeKey);
                                            } else {
                                                // NOTE: we skip nested keyed nodes from being removed since there is
                                                //       still a chance they will be matched up later
                                                removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);

                                            }
                                            fromNextSibling = curFromNodeChild.nextSibling;
                                            curFromNodeChild = matchingFromEl;
                                        }
                                    } else {
                                        // The nodes are not compatible since the "to" node has a key and there
                                        // is no matching keyed node in the source tree
                                        isCompatible = false;
                                    }
                                }
                            } else if (curFromNodeKey) {
                                // The original has a key
                                isCompatible = false;
                            }

                            isCompatible = isCompatible !== false && compareNodeNames(curFromNodeChild, curToNodeChild);
                            if (isCompatible) {
                                // We found compatible DOM elements so transform
                                // the current "from" node to match the current
                                // target DOM node.
                                morphEl(curFromNodeChild, curToNodeChild);
                            }

                        } else if (curFromNodeType === TEXT_NODE || curFromNodeType == COMMENT_NODE) {
                            // Both nodes being compared are Text or Comment nodes
                            isCompatible = true;
                            // Simply update nodeValue on the original node to
                            // change the text value
                            curFromNodeChild.nodeValue = curToNodeChild.nodeValue;
                        }
                    }

                    if (isCompatible) {
                        // Advance both the "to" child and the "from" child since we found a match
                        curToNodeChild = toNextSibling;
                        curFromNodeChild = fromNextSibling;
                        continue outer;
                    }

                    // No compatible match so remove the old node from the DOM and continue trying to find a
                    // match in the original DOM. However, we only do this if the from node is not keyed
                    // since it is possible that a keyed node might match up with a node somewhere else in the
                    // target tree and we don't want to discard it just yet since it still might find a
                    // home in the final DOM tree. After everything is done we will remove any keyed nodes
                    // that didn't find a home
                    if (curFromNodeKey) {
                        // Since the node is keyed it might be matched up later so we defer
                        // the actual removal to later
                        addKeyedRemoval(curFromNodeKey);
                    } else {
                        // NOTE: we skip nested keyed nodes from being removed since there is
                        //       still a chance they will be matched up later
                        removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                    }

                    curFromNodeChild = fromNextSibling;
                }

                // If we got this far then we did not find a candidate match for
                // our "to node" and we exhausted all of the children "from"
                // nodes. Therefore, we will just append the current "to" node
                // to the end
                if (curToNodeKey && (matchingFromEl = fromNodesLookup[curToNodeKey]) && compareNodeNames(matchingFromEl, curToNodeChild)) {
                    fromEl.appendChild(matchingFromEl);
                    morphEl(matchingFromEl, curToNodeChild);
                } else {
                    var onBeforeNodeAddedResult = onBeforeNodeAdded(curToNodeChild);
                    if (onBeforeNodeAddedResult !== false) {
                        if (onBeforeNodeAddedResult) {
                            curToNodeChild = onBeforeNodeAddedResult;
                        }

                        if (curToNodeChild.actualize) {
                            curToNodeChild = curToNodeChild.actualize(fromEl.ownerDocument || doc);
                        }
                        fromEl.appendChild(curToNodeChild);
                        handleNodeAdded(curToNodeChild);
                    }
                }

                curToNodeChild = toNextSibling;
                curFromNodeChild = fromNextSibling;
            }

            // We have processed all of the "to nodes". If curFromNodeChild is
            // non-null then we still have some from nodes left over that need
            // to be removed
            while (curFromNodeChild) {
                fromNextSibling = curFromNodeChild.nextSibling;
                if ((curFromNodeKey = getNodeKey(curFromNodeChild))) {
                    // Since the node is keyed it might be matched up later so we defer
                    // the actual removal to later
                    addKeyedRemoval(curFromNodeKey);
                } else {
                    // NOTE: we skip nested keyed nodes from being removed since there is
                    //       still a chance they will be matched up later
                    removeNode(curFromNodeChild, fromEl, true /* skip keyed nodes */);
                }
                curFromNodeChild = fromNextSibling;
            }
        }

        var specialElHandler = specialElHandlers[fromEl.nodeName];
        if (specialElHandler) {
            specialElHandler(fromEl, toEl);
        }
    } // END: morphEl(...)

    var morphedNode = fromNode;
    var morphedNodeType = morphedNode.nodeType;
    var toNodeType = toNode.nodeType;

    if (!childrenOnly) {
        // Handle the case where we are given two DOM nodes that are not
        // compatible (e.g. <div> --> <span> or <div> --> TEXT)
        if (morphedNodeType === ELEMENT_NODE) {
            if (toNodeType === ELEMENT_NODE) {
                if (!compareNodeNames(fromNode, toNode)) {
                    onNodeDiscarded(fromNode);
                    morphedNode = moveChildren(fromNode, createElementNS(toNode.nodeName, toNode.namespaceURI));
                }
            } else {
                // Going from an element node to a text node
                morphedNode = toNode;
            }
        } else if (morphedNodeType === TEXT_NODE || morphedNodeType === COMMENT_NODE) { // Text or comment node
            if (toNodeType === morphedNodeType) {
                morphedNode.nodeValue = toNode.nodeValue;
                return morphedNode;
            } else {
                // Text node to something else
                morphedNode = toNode;
            }
        }
    }

    if (morphedNode === toNode) {
        // The "to node" was not compatible with the "from node" so we had to
        // toss out the "from node" and use the "to node"
        onNodeDiscarded(fromNode);
    } else {
        morphEl(morphedNode, toNode, childrenOnly);

        // We now need to loop over any keyed nodes that might need to be
        // removed. We only do the removal if we know that the keyed node
        // never found a match. When a keyed node is matched up we remove
        // it out of fromNodesLookup and we use fromNodesLookup to determine
        // if a keyed node has been matched up or not
        if (keyedRemovalList) {
            for (var i=0, len=keyedRemovalList.length; i<len; i++) {
                var elToRemove = fromNodesLookup[keyedRemovalList[i]];
                if (elToRemove) {
                    removeNode(elToRemove, elToRemove.parentNode, false);
                }
            }
        }
    }

    if (!childrenOnly && morphedNode !== fromNode && fromNode.parentNode) {
        if (morphedNode.actualize) {
            morphedNode = morphedNode.actualize(fromNode.ownerDocument || doc);
        }
        // If we had to swap out the from node with a new node because the old
        // node was not compatible with the target node then we need to
        // replace the old DOM node in the original DOM tree. This is only
        // possible if the original DOM node was part of a DOM tree which
        // we know is the case if it has a parent node.
        fromNode.parentNode.replaceChild(morphedNode, fromNode);
    }

    return morphedNode;
}

var __moduleExports$19 = morphdom$1;

var __moduleExports$20 = [
  // attribute events (can be set with attributes)
  'onclick',
  'ondblclick',
  'onmousedown',
  'onmouseup',
  'onmouseover',
  'onmousemove',
  'onmouseout',
  'ondragstart',
  'ondrag',
  'ondragenter',
  'ondragleave',
  'ondragover',
  'ondrop',
  'ondragend',
  'onkeydown',
  'onkeypress',
  'onkeyup',
  'onunload',
  'onabort',
  'onerror',
  'onresize',
  'onscroll',
  'onselect',
  'onchange',
  'onsubmit',
  'onreset',
  'onfocus',
  'onblur',
  'oninput',
  // other common events
  'oncontextmenu',
  'onfocusin',
  'onfocusout'
]

var bel = __moduleExports$1 // turns template tag into DOM elements
var morphdom = __moduleExports$19 // efficiently diffs + morphs two DOM elements
var defaultEvents = __moduleExports$20 // default events to be copied when dom elements update

var __moduleExports = bel

// TODO move this + defaultEvents to a new module once we receive more feedback
var update = function (fromNode, toNode, opts) {
  if (!opts) opts = {}
  if (opts.events !== false) {
    if (!opts.onBeforeElUpdated) opts.onBeforeElUpdated = copier
  }

  return morphdom(fromNode, toNode, opts)

  // morphdom only copies attributes. we decided we also wanted to copy events
  // that can be set via attributes
  function copier (f, t) {
    // copy events:
    var events = opts.events || defaultEvents
    for (var i = 0; i < events.length; i++) {
      var ev = events[i]
      if (t[ev]) { // if new element has a whitelisted attribute
        f[ev] = t[ev] // update existing element
      } else if (f[ev]) { // if existing element has it and new one doesnt
        f[ev] = undefined // remove it from existing element
      }
    }
    // copy values for form elements
    if ((f.nodeName === 'INPUT' && f.type !== 'file') || f.nodeName === 'SELECT') {
      if (t.getAttribute('value') === null) t.value = f.value
    } else if (f.nodeName === 'TEXTAREA') {
      if (t.getAttribute('value') === null) f.value = t.value
    }
  }
}

__moduleExports.update = update;

var html = __moduleExports

const handleInput = (e, state, send) => {
  send('game:summoner', e.target.value);
};

const handleClick = (e, state, send) => {
  send('game:fetch');
};

var welcomePage = ((state, prev, send) => html`
  <main class="welcome-page">
    <div class="welcome-header">
      <h1 class="title">${ state.app.title }</h1>
      <blockquote class="tagline">${ state.app.tagline }</blockquote>
    </div>
    <div class="welcome-form">
      <label class="label">
        Summoner name
        <input
          class="input"
          value="ngrygod"
          oninput=${ e => handleInput(e, state, send) } />
      </label>
      <button
        class="submit"
        onclick=${ e => handleClick(e, state, send) }>Start</button>
    </div>
    <div class="error">${ state.app.error }</div>
  </main>
`);

var index$1 = createCommonjsModule(function (module) {
/*!
  Copyright (c) 2016 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg)) {
				classes.push(classNames.apply(null, arg));
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = classNames;
	} else if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {
		// register as 'classnames', consistent with npm package name
		define('classnames', [], function () {
			return classNames;
		});
	} else {
		window.classNames = classNames;
	}
}());
});

const handleClick$1 = (e, spell, send) => {
  if ('cooldown' === spell.state) {
    send('game:decrementSpellCooldown', {
      uid: spell.uid,
      amount: 10
    });
  } else {
    send('game:updateSpell', {
      uid: spell.uid,
      state: 'cooldown',
      cooldown: spell.refCooldown - 100
    });
  }
};

const classVariants = spell => index$1({
  [`-${ spell.id }`]: true,
  [`-${ spell.state }`]: true,
  [`-time60`]: spell.cooldown <= 60 && spell.cooldown > 30,
  [`-time30`]: spell.cooldown <= 30 && spell.cooldown > 0
});

const renderIf = (condition, state, renderer) => condition ? renderer(state) : '';

const drawCooldownPie = spell => {
  const r = 50;
  const t = 1 - spell.cooldown / spell.refCooldown;
  const a = t * Math.PI * 2;
  const m = a > Math.PI ? 1 : 0;
  const x = Math.sin(a) * r;
  const y = Math.cos(a) * -r;

  return html`
    <g transform=${ `translate(${ r }, ${ r })` }>
      <path className="timer" d=${ `M 0 ${ -r } A ${ r } ${ r } 1 ${ m } 1 ${ x } ${ y }` }></path>
    </g>
  `;
};

const renderCooldown = spell => html`
  <svg class="cooldown"
    viewBox="-5 -5 110 110"
    vectorEffect="non-scaling-stroke"
    strokeLinecap="round">
    ${ drawCooldownPie(spell) }
  </svg>
`;

var spellItem = ((spell, prev, send) => html`
  <li
    class="spell-item ${ classVariants(spell) }"
    onclick=${ e => handleClick$1(e, spell, send) }>
    ${ renderIf('cooldown' === spell.state, spell, renderCooldown) }
    <svg class="icon">
      <use xlink:href="#svg-${ spell.id }">
    </svg>
  </li>
`);

var spellList = ((ennemy, prev, send) => html`
  <ul class="spell-list">
    ${ ennemy.spells.map(spell => spellItem(spell, prev, send)) }
  </ul>
`);

var ennemyItem = ((ennemy, prev, send) => html`
  <li class="ennemy-item">
    <div class="ennemy-meta">
      <h2 class="role">${ ennemy.role }</h2>
      <strong class="champion">${ ennemy.champion.name }</strong>
    </div>
    ${ spellList(ennemy, prev, send) }
  </li>
`);

var ennemyList = ((game, prev, send) => html`
  <ul class="ennemy-list">
    ${ game.ennemies.map(ennemy => ennemyItem(ennemy, prev, send)) }
  </ul>
`);

var ingamePage = ((state, prev, send) => html`
  <main class="ingame-page">
    ${ ennemyList(state.game, prev, send) }
  </main>
`);

const app = choo();

app.model(appModel);
app.model(gameModel);

// TODO: wait for choo to make hash routing really work
app.router(route => [route('/', welcomePage), route('/ingame', ingamePage)]);

const tree = app.start();
document.body.appendChild(tree);

}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9jaG9vL2Rpc3QvY2hvby5qcyIsIi4uL2FwcC9tb2RlbHMvYXBwLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3h0ZW5kL2ltbXV0YWJsZS5qcyIsIi4uL2FwcC9tb2RlbHMvZ2FtZS9yZWR1Y2Vycy5qcyIsIi4uL25vZGVfbW9kdWxlcy93aGF0d2ctZmV0Y2gvZmV0Y2guanMiLCIuLi9ub2RlX21vZHVsZXMvdW5pcXVlaWQvaW5kZXguanMiLCIuLi9hcHAvbGliL3Jpb3QuanMiLCIuLi9hcHAvbW9kZWxzL2dhbWUvZWZmZWN0cy5qcyIsIi4uL2FwcC9tb2RlbHMvZ2FtZS9zdWJzY3JpcHRpb25zLmpzIiwiLi4vYXBwL21vZGVscy9nYW1lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RvbS13YWxrL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL21pbi1kb2N1bWVudC9kb20tY29tbWVudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9taW4tZG9jdW1lbnQvZG9tLXRleHQuanMiLCIuLi9ub2RlX21vZHVsZXMvbWluLWRvY3VtZW50L2V2ZW50L2Rpc3BhdGNoLWV2ZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL21pbi1kb2N1bWVudC9ldmVudC9hZGQtZXZlbnQtbGlzdGVuZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvbWluLWRvY3VtZW50L2V2ZW50L3JlbW92ZS1ldmVudC1saXN0ZW5lci5qcyIsIi4uL25vZGVfbW9kdWxlcy9taW4tZG9jdW1lbnQvc2VyaWFsaXplLmpzIiwiLi4vbm9kZV9tb2R1bGVzL21pbi1kb2N1bWVudC9kb20tZWxlbWVudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9taW4tZG9jdW1lbnQvZG9tLWZyYWdtZW50LmpzIiwiLi4vbm9kZV9tb2R1bGVzL21pbi1kb2N1bWVudC9ldmVudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9taW4tZG9jdW1lbnQvZG9jdW1lbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvbWluLWRvY3VtZW50L2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsb2JhbC9kb2N1bWVudC5qcyIsIi4uL25vZGVfbW9kdWxlcy9oeXBlcnNjcmlwdC1hdHRyaWJ1dGUtdG8tcHJvcGVydHkvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvaHlwZXJ4L2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2dsb2JhbC93aW5kb3cuanMiLCIuLi9ub2RlX21vZHVsZXMvb24tbG9hZC9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9iZWwvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvbW9ycGhkb20vc3JjL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3lvLXlvL3VwZGF0ZS1ldmVudHMuanMiLCIuLi9ub2RlX21vZHVsZXMveW8teW8vaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvY2hvby9odG1sLmpzIiwiLi4vYXBwL3BhZ2VzL3dlbGNvbWUuanMiLCIuLi9ub2RlX21vZHVsZXMvY2xhc3NuYW1lcy9pbmRleC5qcyIsIi4uL2FwcC92aWV3cy9zcGVsbC1pdGVtLmpzIiwiLi4vYXBwL3ZpZXdzL3NwZWxsLWxpc3QuanMiLCIuLi9hcHAvdmlld3MvZW5uZW15LWl0ZW0uanMiLCIuLi9hcHAvdmlld3MvZW5uZW15LWxpc3QuanMiLCIuLi9hcHAvcGFnZXMvaW5nYW1lLmpzIiwiLi4vYXBwL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc31nLmNob28gPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgaGlzdG9yeSA9IHJlcXVpcmUoJ3NoZWV0LXJvdXRlci9oaXN0b3J5Jyk7XG52YXIgc2hlZXRSb3V0ZXIgPSByZXF1aXJlKCdzaGVldC1yb3V0ZXInKTtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJ2dsb2JhbC9kb2N1bWVudCcpO1xudmFyIG9uUmVhZHkgPSByZXF1aXJlKCdkb2N1bWVudC1yZWFkeScpO1xudmFyIGhyZWYgPSByZXF1aXJlKCdzaGVldC1yb3V0ZXIvaHJlZicpO1xudmFyIGhhc2ggPSByZXF1aXJlKCdzaGVldC1yb3V0ZXIvaGFzaCcpO1xudmFyIGhhc2hNYXRjaCA9IHJlcXVpcmUoJ2hhc2gtbWF0Y2gnKTtcbnZhciBiYXJyYWNrcyA9IHJlcXVpcmUoJ2JhcnJhY2tzJyk7XG52YXIgbmFub3JhZiA9IHJlcXVpcmUoJ25hbm9yYWYnKTtcbnZhciBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKTtcbnZhciB4dGVuZCA9IHJlcXVpcmUoJ3h0ZW5kJyk7XG52YXIgeW8gPSByZXF1aXJlKCd5by15bycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNob287XG5cbi8vIGZyYW1ld29yayBmb3IgY3JlYXRpbmcgc3R1cmR5IHdlYiBhcHBsaWNhdGlvbnNcbi8vIG51bGwgLT4gZm5cbmZ1bmN0aW9uIGNob28ob3B0cykge1xuICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICB2YXIgX3N0b3JlID0gc3RhcnQuX3N0b3JlID0gYmFycmFja3MoKTtcbiAgdmFyIF9yb3V0ZXIgPSBzdGFydC5fcm91dGVyID0gbnVsbDtcbiAgdmFyIF9kZWZhdWx0Um91dGUgPSBudWxsO1xuICB2YXIgX3Jvb3ROb2RlID0gbnVsbDtcbiAgdmFyIF9yb3V0ZXMgPSBudWxsO1xuICB2YXIgX2ZyYW1lID0gbnVsbDtcblxuICBfc3RvcmUudXNlKHsgb25TdGF0ZUNoYW5nZTogcmVuZGVyIH0pO1xuICBfc3RvcmUudXNlKG9wdHMpO1xuXG4gIHN0YXJ0LnRvU3RyaW5nID0gdG9TdHJpbmc7XG4gIHN0YXJ0LnJvdXRlciA9IHJvdXRlcjtcbiAgc3RhcnQubW9kZWwgPSBtb2RlbDtcbiAgc3RhcnQuc3RhcnQgPSBzdGFydDtcbiAgc3RhcnQudXNlID0gdXNlO1xuXG4gIHJldHVybiBzdGFydDtcblxuICAvLyByZW5kZXIgdGhlIGFwcGxpY2F0aW9uIHRvIGEgc3RyaW5nXG4gIC8vIChzdHIsIG9iaikgLT4gc3RyXG4gIGZ1bmN0aW9uIHRvU3RyaW5nKHJvdXRlLCBzZXJ2ZXJTdGF0ZSkge1xuICAgIHNlcnZlclN0YXRlID0gc2VydmVyU3RhdGUgfHwge307XG4gICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiByb3V0ZSwgJ3N0cmluZycsICdjaG9vLmFwcC50b1N0cmluZzogcm91dGUgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgIGFzc2VydC5lcXVhbCh0eXBlb2Ygc2VydmVyU3RhdGUsICdvYmplY3QnLCAnY2hvby5hcHAudG9TdHJpbmc6IHNlcnZlclN0YXRlIG11c3QgYmUgYW4gb2JqZWN0Jyk7XG4gICAgX3N0b3JlLnN0YXJ0KHsgc3Vic2NyaXB0aW9uczogZmFsc2UsIHJlZHVjZXJzOiBmYWxzZSwgZWZmZWN0czogZmFsc2UgfSk7XG5cbiAgICB2YXIgc3RhdGUgPSBfc3RvcmUuc3RhdGUoeyBzdGF0ZTogc2VydmVyU3RhdGUgfSk7XG4gICAgdmFyIHJvdXRlciA9IGNyZWF0ZVJvdXRlcihfZGVmYXVsdFJvdXRlLCBfcm91dGVzLCBjcmVhdGVTZW5kKTtcbiAgICB2YXIgdHJlZSA9IHJvdXRlcihyb3V0ZSwgc3RhdGUpO1xuICAgIHJldHVybiB0cmVlLm91dGVySFRNTCB8fCB0cmVlLnRvU3RyaW5nKCk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVTZW5kKCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNlbmQoKSB7XG4gICAgICAgIGFzc2VydC5vayhmYWxzZSwgJ2Nob286IHNlbmQoKSBjYW5ub3QgYmUgY2FsbGVkIGZyb20gTm9kZScpO1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICAvLyBzdGFydCB0aGUgYXBwbGljYXRpb25cbiAgLy8gKHN0cj8sIG9iaj8pIC0+IERPTU5vZGVcbiAgZnVuY3Rpb24gc3RhcnQoc2VsZWN0b3IsIHN0YXJ0T3B0cykge1xuICAgIGlmICghc3RhcnRPcHRzICYmIHR5cGVvZiBzZWxlY3RvciAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHN0YXJ0T3B0cyA9IHNlbGVjdG9yO1xuICAgICAgc2VsZWN0b3IgPSBudWxsO1xuICAgIH1cbiAgICBzdGFydE9wdHMgPSBzdGFydE9wdHMgfHwge307XG5cbiAgICBfc3RvcmUubW9kZWwoYXBwSW5pdChzdGFydE9wdHMpKTtcbiAgICB2YXIgY3JlYXRlU2VuZCA9IF9zdG9yZS5zdGFydChzdGFydE9wdHMpO1xuICAgIF9yb3V0ZXIgPSBzdGFydC5fcm91dGVyID0gY3JlYXRlUm91dGVyKF9kZWZhdWx0Um91dGUsIF9yb3V0ZXMsIGNyZWF0ZVNlbmQpO1xuICAgIHZhciBzdGF0ZSA9IF9zdG9yZS5zdGF0ZSh7IHN0YXRlOiB7fSB9KTtcblxuICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgIHZhciB0cmVlID0gX3JvdXRlcihzdGF0ZS5sb2NhdGlvbi5wYXRobmFtZSwgc3RhdGUpO1xuICAgICAgX3Jvb3ROb2RlID0gdHJlZTtcbiAgICAgIHJldHVybiB0cmVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBvblJlYWR5KGZ1bmN0aW9uIG9uUmVhZHkoKSB7XG4gICAgICAgIHZhciBvbGRUcmVlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIGFzc2VydC5vayhvbGRUcmVlLCAnY291bGQgbm90IHF1ZXJ5IHNlbGVjdG9yOiAnICsgc2VsZWN0b3IpO1xuICAgICAgICB2YXIgbmV3VHJlZSA9IF9yb3V0ZXIoc3RhdGUubG9jYXRpb24ucGF0aG5hbWUsIHN0YXRlKTtcbiAgICAgICAgX3Jvb3ROb2RlID0geW8udXBkYXRlKG9sZFRyZWUsIG5ld1RyZWUpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLy8gdXBkYXRlIHRoZSBET00gYWZ0ZXIgZXZlcnkgc3RhdGUgbXV0YXRpb25cbiAgLy8gKG9iaiwgb2JqLCBvYmosIHN0ciwgZm4pIC0+IG51bGxcbiAgZnVuY3Rpb24gcmVuZGVyKGRhdGEsIHN0YXRlLCBwcmV2LCBuYW1lLCBjcmVhdGVTZW5kKSB7XG4gICAgaWYgKCFfZnJhbWUpIHtcbiAgICAgIF9mcmFtZSA9IG5hbm9yYWYoZnVuY3Rpb24gKHN0YXRlLCBwcmV2KSB7XG4gICAgICAgIHZhciBuZXdUcmVlID0gX3JvdXRlcihzdGF0ZS5sb2NhdGlvbi5wYXRobmFtZSwgc3RhdGUsIHByZXYpO1xuICAgICAgICBfcm9vdE5vZGUgPSB5by51cGRhdGUoX3Jvb3ROb2RlLCBuZXdUcmVlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBfZnJhbWUoc3RhdGUsIHByZXYpO1xuICB9XG5cbiAgLy8gcmVnaXN0ZXIgYWxsIHJvdXRlcyBvbiB0aGUgcm91dGVyXG4gIC8vIChzdHI/LCBbZm58W2ZuXV0pIC0+IG9ialxuICBmdW5jdGlvbiByb3V0ZXIoZGVmYXVsdFJvdXRlLCByb3V0ZXMpIHtcbiAgICBfZGVmYXVsdFJvdXRlID0gZGVmYXVsdFJvdXRlO1xuICAgIF9yb3V0ZXMgPSByb3V0ZXM7XG4gIH1cblxuICAvLyBjcmVhdGUgYSBuZXcgbW9kZWxcbiAgLy8gKHN0cj8sIG9iaikgLT4gbnVsbFxuICBmdW5jdGlvbiBtb2RlbChtb2RlbCkge1xuICAgIF9zdG9yZS5tb2RlbChtb2RlbCk7XG4gIH1cblxuICAvLyByZWdpc3RlciBhIHBsdWdpblxuICAvLyAob2JqKSAtPiBudWxsXG4gIGZ1bmN0aW9uIHVzZShob29rcykge1xuICAgIGFzc2VydC5lcXVhbCh0eXBlb2YgaG9va3MsICdvYmplY3QnLCAnY2hvby51c2U6IGhvb2tzIHNob3VsZCBiZSBhbiBvYmplY3QnKTtcbiAgICBfc3RvcmUudXNlKGhvb2tzKTtcbiAgfVxuXG4gIC8vIGNyZWF0ZSBhIG5ldyByb3V0ZXIgd2l0aCBhIGN1c3RvbSBgY3JlYXRlUm91dGUoKWAgZnVuY3Rpb25cbiAgLy8gKHN0cj8sIG9iaiwgZm4/KSAtPiBudWxsXG4gIGZ1bmN0aW9uIGNyZWF0ZVJvdXRlcihkZWZhdWx0Um91dGUsIHJvdXRlcywgY3JlYXRlU2VuZCkge1xuICAgIHZhciBwcmV2ID0geyBwYXJhbXM6IHt9IH07XG4gICAgcmV0dXJuIHNoZWV0Um91dGVyKGRlZmF1bHRSb3V0ZSwgcm91dGVzLCBjcmVhdGVSb3V0ZSk7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVSb3V0ZShyb3V0ZUZuKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKHJvdXRlLCBpbmxpbmUsIGNoaWxkKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaW5saW5lID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgaW5saW5lID0gd3JhcChpbmxpbmUsIHJvdXRlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcm91dGVGbihyb3V0ZSwgaW5saW5lLCBjaGlsZCk7XG4gICAgICB9O1xuXG4gICAgICBmdW5jdGlvbiB3cmFwKGNoaWxkLCByb3V0ZSkge1xuICAgICAgICB2YXIgc2VuZCA9IGNyZWF0ZVNlbmQoJ3ZpZXc6ICcgKyByb3V0ZSwgdHJ1ZSk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBjaG9vV3JhcChwYXJhbXMsIHN0YXRlKSB7XG4gICAgICAgICAgdmFyIG53UHJldiA9IHByZXY7XG4gICAgICAgICAgdmFyIG53U3RhdGUgPSBwcmV2ID0geHRlbmQoc3RhdGUsIHsgcGFyYW1zOiBwYXJhbXMgfSk7XG4gICAgICAgICAgaWYgKG9wdHMuZnJlZXplICE9PSBmYWxzZSkgT2JqZWN0LmZyZWV6ZShud1N0YXRlKTtcbiAgICAgICAgICByZXR1cm4gY2hpbGQobndTdGF0ZSwgbndQcmV2LCBzZW5kKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gaW5pdGlhbCBhcHBsaWNhdGlvbiBzdGF0ZSBtb2RlbFxuLy8gb2JqIC0+IG9ialxuZnVuY3Rpb24gYXBwSW5pdChvcHRzKSB7XG4gIHZhciBsb2MgPSBkb2N1bWVudC5sb2NhdGlvbjtcbiAgdmFyIHN0YXRlID0geyBwYXRobmFtZTogb3B0cy5oYXNoID8gaGFzaE1hdGNoKGxvYy5oYXNoKSA6IGxvYy5ocmVmIH07XG4gIHZhciByZWR1Y2VycyA9IHtcbiAgICBzZXRMb2NhdGlvbjogZnVuY3Rpb24gc2V0TG9jYXRpb24oZGF0YSwgc3RhdGUpIHtcbiAgICAgIHJldHVybiB7IHBhdGhuYW1lOiBkYXRhLmxvY2F0aW9uLnJlcGxhY2UoLyMuKi8sICcnKSB9O1xuICAgIH1cbiAgfTtcbiAgLy8gaWYgaGFzaCByb3V0aW5nIGV4cGxpY2l0bHkgZW5hYmxlZCwgc3Vic2NyaWJlIHRvIGl0XG4gIHZhciBzdWJzID0ge307XG4gIGlmIChvcHRzLmhhc2ggPT09IHRydWUpIHtcbiAgICBwdXNoTG9jYXRpb25TdWIoZnVuY3Rpb24gKG5hdmlnYXRlKSB7XG4gICAgICBoYXNoKGZ1bmN0aW9uIChmcmFnbWVudCkge1xuICAgICAgICBuYXZpZ2F0ZShoYXNoTWF0Y2goZnJhZ21lbnQpKTtcbiAgICAgIH0pO1xuICAgIH0sICdoYW5kbGVIYXNoJywgc3Vicyk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKG9wdHMuaGlzdG9yeSAhPT0gZmFsc2UpIHB1c2hMb2NhdGlvblN1YihoaXN0b3J5LCAnaGFuZGxlSGlzdG9yeScsIHN1YnMpO1xuICAgIGlmIChvcHRzLmhyZWYgIT09IGZhbHNlKSBwdXNoTG9jYXRpb25TdWIoaHJlZiwgJ2hhbmRsZUhyZWYnLCBzdWJzKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbmFtZXNwYWNlOiAnbG9jYXRpb24nLFxuICAgIHN1YnNjcmlwdGlvbnM6IHN1YnMsXG4gICAgcmVkdWNlcnM6IHJlZHVjZXJzLFxuICAgIHN0YXRlOiBzdGF0ZVxuICB9O1xuXG4gIC8vIGNyZWF0ZSBhIG5ldyBzdWJzY3JpcHRpb24gdGhhdCBtb2RpZmllc1xuICAvLyAnYXBwOmxvY2F0aW9uJyBhbmQgcHVzaCBpdCB0byBiZSBsb2FkZWRcbiAgLy8gKGZuLCBvYmopIC0+IG51bGxcbiAgZnVuY3Rpb24gcHVzaExvY2F0aW9uU3ViKGNiLCBrZXksIG1vZGVsKSB7XG4gICAgbW9kZWxba2V5XSA9IGZ1bmN0aW9uIChzZW5kLCBkb25lKSB7XG4gICAgICBjYihmdW5jdGlvbiBuYXZpZ2F0ZShwYXRobmFtZSkge1xuICAgICAgICBzZW5kKCdsb2NhdGlvbjpzZXRMb2NhdGlvbicsIHsgbG9jYXRpb246IHBhdGhuYW1lIH0sIGRvbmUpO1xuICAgICAgfSk7XG4gICAgfTtcbiAgfVxufVxufSx7XCJhc3NlcnRcIjoyLFwiYmFycmFja3NcIjo0LFwiZG9jdW1lbnQtcmVhZHlcIjo3LFwiZ2xvYmFsL2RvY3VtZW50XCI6OCxcImhhc2gtbWF0Y2hcIjoxMCxcIm5hbm9yYWZcIjoxMyxcInNoZWV0LXJvdXRlclwiOjE4LFwic2hlZXQtcm91dGVyL2hhc2hcIjoxNSxcInNoZWV0LXJvdXRlci9oaXN0b3J5XCI6MTYsXCJzaGVldC1yb3V0ZXIvaHJlZlwiOjE3LFwieHRlbmRcIjoyMyxcInlvLXlvXCI6MjV9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbi8vIGh0dHA6Ly93aWtpLmNvbW1vbmpzLm9yZy93aWtpL1VuaXRfVGVzdGluZy8xLjBcbi8vXG4vLyBUSElTIElTIE5PVCBURVNURUQgTk9SIExJS0VMWSBUTyBXT1JLIE9VVFNJREUgVjghXG4vL1xuLy8gT3JpZ2luYWxseSBmcm9tIG5hcndoYWwuanMgKGh0dHA6Ly9uYXJ3aGFsanMub3JnKVxuLy8gQ29weXJpZ2h0IChjKSAyMDA5IFRob21hcyBSb2JpbnNvbiA8Mjgwbm9ydGguY29tPlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlICdTb2Z0d2FyZScpLCB0b1xuLy8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGVcbi8vIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vclxuLy8gc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCAnQVMgSVMnLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU5cbi8vIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT05cbi8vIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4vLyB3aGVuIHVzZWQgaW4gbm9kZSwgdGhpcyB3aWxsIGFjdHVhbGx5IGxvYWQgdGhlIHV0aWwgbW9kdWxlIHdlIGRlcGVuZCBvblxuLy8gdmVyc3VzIGxvYWRpbmcgdGhlIGJ1aWx0aW4gdXRpbCBtb2R1bGUgYXMgaGFwcGVucyBvdGhlcndpc2Vcbi8vIHRoaXMgaXMgYSBidWcgaW4gbm9kZSBtb2R1bGUgbG9hZGluZyBhcyBmYXIgYXMgSSBhbSBjb25jZXJuZWRcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbC8nKTtcblxudmFyIHBTbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vLyAxLiBUaGUgYXNzZXJ0IG1vZHVsZSBwcm92aWRlcyBmdW5jdGlvbnMgdGhhdCB0aHJvd1xuLy8gQXNzZXJ0aW9uRXJyb3IncyB3aGVuIHBhcnRpY3VsYXIgY29uZGl0aW9ucyBhcmUgbm90IG1ldC4gVGhlXG4vLyBhc3NlcnQgbW9kdWxlIG11c3QgY29uZm9ybSB0byB0aGUgZm9sbG93aW5nIGludGVyZmFjZS5cblxudmFyIGFzc2VydCA9IG1vZHVsZS5leHBvcnRzID0gb2s7XG5cbi8vIDIuIFRoZSBBc3NlcnRpb25FcnJvciBpcyBkZWZpbmVkIGluIGFzc2VydC5cbi8vIG5ldyBhc3NlcnQuQXNzZXJ0aW9uRXJyb3IoeyBtZXNzYWdlOiBtZXNzYWdlLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdHVhbDogYWN0dWFsLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCB9KVxuXG5hc3NlcnQuQXNzZXJ0aW9uRXJyb3IgPSBmdW5jdGlvbiBBc3NlcnRpb25FcnJvcihvcHRpb25zKSB7XG4gIHRoaXMubmFtZSA9ICdBc3NlcnRpb25FcnJvcic7XG4gIHRoaXMuYWN0dWFsID0gb3B0aW9ucy5hY3R1YWw7XG4gIHRoaXMuZXhwZWN0ZWQgPSBvcHRpb25zLmV4cGVjdGVkO1xuICB0aGlzLm9wZXJhdG9yID0gb3B0aW9ucy5vcGVyYXRvcjtcbiAgaWYgKG9wdGlvbnMubWVzc2FnZSkge1xuICAgIHRoaXMubWVzc2FnZSA9IG9wdGlvbnMubWVzc2FnZTtcbiAgICB0aGlzLmdlbmVyYXRlZE1lc3NhZ2UgPSBmYWxzZTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLm1lc3NhZ2UgPSBnZXRNZXNzYWdlKHRoaXMpO1xuICAgIHRoaXMuZ2VuZXJhdGVkTWVzc2FnZSA9IHRydWU7XG4gIH1cbiAgdmFyIHN0YWNrU3RhcnRGdW5jdGlvbiA9IG9wdGlvbnMuc3RhY2tTdGFydEZ1bmN0aW9uIHx8IGZhaWw7XG5cbiAgaWYgKEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKSB7XG4gICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgc3RhY2tTdGFydEZ1bmN0aW9uKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBub24gdjggYnJvd3NlcnMgc28gd2UgY2FuIGhhdmUgYSBzdGFja3RyYWNlXG4gICAgdmFyIGVyciA9IG5ldyBFcnJvcigpO1xuICAgIGlmIChlcnIuc3RhY2spIHtcbiAgICAgIHZhciBvdXQgPSBlcnIuc3RhY2s7XG5cbiAgICAgIC8vIHRyeSB0byBzdHJpcCB1c2VsZXNzIGZyYW1lc1xuICAgICAgdmFyIGZuX25hbWUgPSBzdGFja1N0YXJ0RnVuY3Rpb24ubmFtZTtcbiAgICAgIHZhciBpZHggPSBvdXQuaW5kZXhPZignXFxuJyArIGZuX25hbWUpO1xuICAgICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICAgIC8vIG9uY2Ugd2UgaGF2ZSBsb2NhdGVkIHRoZSBmdW5jdGlvbiBmcmFtZVxuICAgICAgICAvLyB3ZSBuZWVkIHRvIHN0cmlwIG91dCBldmVyeXRoaW5nIGJlZm9yZSBpdCAoYW5kIGl0cyBsaW5lKVxuICAgICAgICB2YXIgbmV4dF9saW5lID0gb3V0LmluZGV4T2YoJ1xcbicsIGlkeCArIDEpO1xuICAgICAgICBvdXQgPSBvdXQuc3Vic3RyaW5nKG5leHRfbGluZSArIDEpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnN0YWNrID0gb3V0O1xuICAgIH1cbiAgfVxufTtcblxuLy8gYXNzZXJ0LkFzc2VydGlvbkVycm9yIGluc3RhbmNlb2YgRXJyb3JcbnV0aWwuaW5oZXJpdHMoYXNzZXJ0LkFzc2VydGlvbkVycm9yLCBFcnJvcik7XG5cbmZ1bmN0aW9uIHJlcGxhY2VyKGtleSwgdmFsdWUpIHtcbiAgaWYgKHV0aWwuaXNVbmRlZmluZWQodmFsdWUpKSB7XG4gICAgcmV0dXJuICcnICsgdmFsdWU7XG4gIH1cbiAgaWYgKHV0aWwuaXNOdW1iZXIodmFsdWUpICYmICFpc0Zpbml0ZSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUudG9TdHJpbmcoKTtcbiAgfVxuICBpZiAodXRpbC5pc0Z1bmN0aW9uKHZhbHVlKSB8fCB1dGlsLmlzUmVnRXhwKHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZS50b1N0cmluZygpO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gdHJ1bmNhdGUocywgbikge1xuICBpZiAodXRpbC5pc1N0cmluZyhzKSkge1xuICAgIHJldHVybiBzLmxlbmd0aCA8IG4gPyBzIDogcy5zbGljZSgwLCBuKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gcztcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRNZXNzYWdlKHNlbGYpIHtcbiAgcmV0dXJuIHRydW5jYXRlKEpTT04uc3RyaW5naWZ5KHNlbGYuYWN0dWFsLCByZXBsYWNlciksIDEyOCkgKyAnICcgKyBzZWxmLm9wZXJhdG9yICsgJyAnICsgdHJ1bmNhdGUoSlNPTi5zdHJpbmdpZnkoc2VsZi5leHBlY3RlZCwgcmVwbGFjZXIpLCAxMjgpO1xufVxuXG4vLyBBdCBwcmVzZW50IG9ubHkgdGhlIHRocmVlIGtleXMgbWVudGlvbmVkIGFib3ZlIGFyZSB1c2VkIGFuZFxuLy8gdW5kZXJzdG9vZCBieSB0aGUgc3BlYy4gSW1wbGVtZW50YXRpb25zIG9yIHN1YiBtb2R1bGVzIGNhbiBwYXNzXG4vLyBvdGhlciBrZXlzIHRvIHRoZSBBc3NlcnRpb25FcnJvcidzIGNvbnN0cnVjdG9yIC0gdGhleSB3aWxsIGJlXG4vLyBpZ25vcmVkLlxuXG4vLyAzLiBBbGwgb2YgdGhlIGZvbGxvd2luZyBmdW5jdGlvbnMgbXVzdCB0aHJvdyBhbiBBc3NlcnRpb25FcnJvclxuLy8gd2hlbiBhIGNvcnJlc3BvbmRpbmcgY29uZGl0aW9uIGlzIG5vdCBtZXQsIHdpdGggYSBtZXNzYWdlIHRoYXRcbi8vIG1heSBiZSB1bmRlZmluZWQgaWYgbm90IHByb3ZpZGVkLiAgQWxsIGFzc2VydGlvbiBtZXRob2RzIHByb3ZpZGVcbi8vIGJvdGggdGhlIGFjdHVhbCBhbmQgZXhwZWN0ZWQgdmFsdWVzIHRvIHRoZSBhc3NlcnRpb24gZXJyb3IgZm9yXG4vLyBkaXNwbGF5IHB1cnBvc2VzLlxuXG5mdW5jdGlvbiBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsIG9wZXJhdG9yLCBzdGFja1N0YXJ0RnVuY3Rpb24pIHtcbiAgdGhyb3cgbmV3IGFzc2VydC5Bc3NlcnRpb25FcnJvcih7XG4gICAgbWVzc2FnZTogbWVzc2FnZSxcbiAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgb3BlcmF0b3I6IG9wZXJhdG9yLFxuICAgIHN0YWNrU3RhcnRGdW5jdGlvbjogc3RhY2tTdGFydEZ1bmN0aW9uXG4gIH0pO1xufVxuXG4vLyBFWFRFTlNJT04hIGFsbG93cyBmb3Igd2VsbCBiZWhhdmVkIGVycm9ycyBkZWZpbmVkIGVsc2V3aGVyZS5cbmFzc2VydC5mYWlsID0gZmFpbDtcblxuLy8gNC4gUHVyZSBhc3NlcnRpb24gdGVzdHMgd2hldGhlciBhIHZhbHVlIGlzIHRydXRoeSwgYXMgZGV0ZXJtaW5lZFxuLy8gYnkgISFndWFyZC5cbi8vIGFzc2VydC5vayhndWFyZCwgbWVzc2FnZV9vcHQpO1xuLy8gVGhpcyBzdGF0ZW1lbnQgaXMgZXF1aXZhbGVudCB0byBhc3NlcnQuZXF1YWwodHJ1ZSwgISFndWFyZCxcbi8vIG1lc3NhZ2Vfb3B0KTsuIFRvIHRlc3Qgc3RyaWN0bHkgZm9yIHRoZSB2YWx1ZSB0cnVlLCB1c2Vcbi8vIGFzc2VydC5zdHJpY3RFcXVhbCh0cnVlLCBndWFyZCwgbWVzc2FnZV9vcHQpOy5cblxuZnVuY3Rpb24gb2sodmFsdWUsIG1lc3NhZ2UpIHtcbiAgaWYgKCF2YWx1ZSkgZmFpbCh2YWx1ZSwgdHJ1ZSwgbWVzc2FnZSwgJz09JywgYXNzZXJ0Lm9rKTtcbn1cbmFzc2VydC5vayA9IG9rO1xuXG4vLyA1LiBUaGUgZXF1YWxpdHkgYXNzZXJ0aW9uIHRlc3RzIHNoYWxsb3csIGNvZXJjaXZlIGVxdWFsaXR5IHdpdGhcbi8vID09LlxuLy8gYXNzZXJ0LmVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0LmVxdWFsID0gZnVuY3Rpb24gZXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYWN0dWFsICE9IGV4cGVjdGVkKSBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICc9PScsIGFzc2VydC5lcXVhbCk7XG59O1xuXG4vLyA2LiBUaGUgbm9uLWVxdWFsaXR5IGFzc2VydGlvbiB0ZXN0cyBmb3Igd2hldGhlciB0d28gb2JqZWN0cyBhcmUgbm90IGVxdWFsXG4vLyB3aXRoICE9IGFzc2VydC5ub3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC5ub3RFcXVhbCA9IGZ1bmN0aW9uIG5vdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFjdHVhbCA9PSBleHBlY3RlZCkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJyE9JywgYXNzZXJ0Lm5vdEVxdWFsKTtcbiAgfVxufTtcblxuLy8gNy4gVGhlIGVxdWl2YWxlbmNlIGFzc2VydGlvbiB0ZXN0cyBhIGRlZXAgZXF1YWxpdHkgcmVsYXRpb24uXG4vLyBhc3NlcnQuZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0LmRlZXBFcXVhbCA9IGZ1bmN0aW9uIGRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlKSB7XG4gIGlmICghX2RlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkKSkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJ2RlZXBFcXVhbCcsIGFzc2VydC5kZWVwRXF1YWwpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBfZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpIHtcbiAgLy8gNy4xLiBBbGwgaWRlbnRpY2FsIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgYXMgZGV0ZXJtaW5lZCBieSA9PT0uXG4gIGlmIChhY3R1YWwgPT09IGV4cGVjdGVkKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAodXRpbC5pc0J1ZmZlcihhY3R1YWwpICYmIHV0aWwuaXNCdWZmZXIoZXhwZWN0ZWQpKSB7XG4gICAgaWYgKGFjdHVhbC5sZW5ndGggIT0gZXhwZWN0ZWQubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFjdHVhbC5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGFjdHVhbFtpXSAhPT0gZXhwZWN0ZWRbaV0pIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcblxuICAgIC8vIDcuMi4gSWYgdGhlIGV4cGVjdGVkIHZhbHVlIGlzIGEgRGF0ZSBvYmplY3QsIHRoZSBhY3R1YWwgdmFsdWUgaXNcbiAgICAvLyBlcXVpdmFsZW50IGlmIGl0IGlzIGFsc28gYSBEYXRlIG9iamVjdCB0aGF0IHJlZmVycyB0byB0aGUgc2FtZSB0aW1lLlxuICB9IGVsc2UgaWYgKHV0aWwuaXNEYXRlKGFjdHVhbCkgJiYgdXRpbC5pc0RhdGUoZXhwZWN0ZWQpKSB7XG4gICAgcmV0dXJuIGFjdHVhbC5nZXRUaW1lKCkgPT09IGV4cGVjdGVkLmdldFRpbWUoKTtcblxuICAgIC8vIDcuMyBJZiB0aGUgZXhwZWN0ZWQgdmFsdWUgaXMgYSBSZWdFeHAgb2JqZWN0LCB0aGUgYWN0dWFsIHZhbHVlIGlzXG4gICAgLy8gZXF1aXZhbGVudCBpZiBpdCBpcyBhbHNvIGEgUmVnRXhwIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNvdXJjZSBhbmRcbiAgICAvLyBwcm9wZXJ0aWVzIChgZ2xvYmFsYCwgYG11bHRpbGluZWAsIGBsYXN0SW5kZXhgLCBgaWdub3JlQ2FzZWApLlxuICB9IGVsc2UgaWYgKHV0aWwuaXNSZWdFeHAoYWN0dWFsKSAmJiB1dGlsLmlzUmVnRXhwKGV4cGVjdGVkKSkge1xuICAgIHJldHVybiBhY3R1YWwuc291cmNlID09PSBleHBlY3RlZC5zb3VyY2UgJiYgYWN0dWFsLmdsb2JhbCA9PT0gZXhwZWN0ZWQuZ2xvYmFsICYmIGFjdHVhbC5tdWx0aWxpbmUgPT09IGV4cGVjdGVkLm11bHRpbGluZSAmJiBhY3R1YWwubGFzdEluZGV4ID09PSBleHBlY3RlZC5sYXN0SW5kZXggJiYgYWN0dWFsLmlnbm9yZUNhc2UgPT09IGV4cGVjdGVkLmlnbm9yZUNhc2U7XG5cbiAgICAvLyA3LjQuIE90aGVyIHBhaXJzIHRoYXQgZG8gbm90IGJvdGggcGFzcyB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcsXG4gICAgLy8gZXF1aXZhbGVuY2UgaXMgZGV0ZXJtaW5lZCBieSA9PS5cbiAgfSBlbHNlIGlmICghdXRpbC5pc09iamVjdChhY3R1YWwpICYmICF1dGlsLmlzT2JqZWN0KGV4cGVjdGVkKSkge1xuICAgIHJldHVybiBhY3R1YWwgPT0gZXhwZWN0ZWQ7XG5cbiAgICAvLyA3LjUgRm9yIGFsbCBvdGhlciBPYmplY3QgcGFpcnMsIGluY2x1ZGluZyBBcnJheSBvYmplY3RzLCBlcXVpdmFsZW5jZSBpc1xuICAgIC8vIGRldGVybWluZWQgYnkgaGF2aW5nIHRoZSBzYW1lIG51bWJlciBvZiBvd25lZCBwcm9wZXJ0aWVzIChhcyB2ZXJpZmllZFxuICAgIC8vIHdpdGggT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKSwgdGhlIHNhbWUgc2V0IG9mIGtleXNcbiAgICAvLyAoYWx0aG91Z2ggbm90IG5lY2Vzc2FyaWx5IHRoZSBzYW1lIG9yZGVyKSwgZXF1aXZhbGVudCB2YWx1ZXMgZm9yIGV2ZXJ5XG4gICAgLy8gY29ycmVzcG9uZGluZyBrZXksIGFuZCBhbiBpZGVudGljYWwgJ3Byb3RvdHlwZScgcHJvcGVydHkuIE5vdGU6IHRoaXNcbiAgICAvLyBhY2NvdW50cyBmb3IgYm90aCBuYW1lZCBhbmQgaW5kZXhlZCBwcm9wZXJ0aWVzIG9uIEFycmF5cy5cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb2JqRXF1aXYoYWN0dWFsLCBleHBlY3RlZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNBcmd1bWVudHMob2JqZWN0KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqZWN0KSA9PSAnW29iamVjdCBBcmd1bWVudHNdJztcbn1cblxuZnVuY3Rpb24gb2JqRXF1aXYoYSwgYikge1xuICBpZiAodXRpbC5pc051bGxPclVuZGVmaW5lZChhKSB8fCB1dGlsLmlzTnVsbE9yVW5kZWZpbmVkKGIpKSByZXR1cm4gZmFsc2U7XG4gIC8vIGFuIGlkZW50aWNhbCAncHJvdG90eXBlJyBwcm9wZXJ0eS5cbiAgaWYgKGEucHJvdG90eXBlICE9PSBiLnByb3RvdHlwZSkgcmV0dXJuIGZhbHNlO1xuICAvLyBpZiBvbmUgaXMgYSBwcmltaXRpdmUsIHRoZSBvdGhlciBtdXN0IGJlIHNhbWVcbiAgaWYgKHV0aWwuaXNQcmltaXRpdmUoYSkgfHwgdXRpbC5pc1ByaW1pdGl2ZShiKSkge1xuICAgIHJldHVybiBhID09PSBiO1xuICB9XG4gIHZhciBhSXNBcmdzID0gaXNBcmd1bWVudHMoYSksXG4gICAgICBiSXNBcmdzID0gaXNBcmd1bWVudHMoYik7XG4gIGlmIChhSXNBcmdzICYmICFiSXNBcmdzIHx8ICFhSXNBcmdzICYmIGJJc0FyZ3MpIHJldHVybiBmYWxzZTtcbiAgaWYgKGFJc0FyZ3MpIHtcbiAgICBhID0gcFNsaWNlLmNhbGwoYSk7XG4gICAgYiA9IHBTbGljZS5jYWxsKGIpO1xuICAgIHJldHVybiBfZGVlcEVxdWFsKGEsIGIpO1xuICB9XG4gIHZhciBrYSA9IG9iamVjdEtleXMoYSksXG4gICAgICBrYiA9IG9iamVjdEtleXMoYiksXG4gICAgICBrZXksXG4gICAgICBpO1xuICAvLyBoYXZpbmcgdGhlIHNhbWUgbnVtYmVyIG9mIG93bmVkIHByb3BlcnRpZXMgKGtleXMgaW5jb3Jwb3JhdGVzXG4gIC8vIGhhc093blByb3BlcnR5KVxuICBpZiAoa2EubGVuZ3RoICE9IGtiLmxlbmd0aCkgcmV0dXJuIGZhbHNlO1xuICAvL3RoZSBzYW1lIHNldCBvZiBrZXlzIChhbHRob3VnaCBub3QgbmVjZXNzYXJpbHkgdGhlIHNhbWUgb3JkZXIpLFxuICBrYS5zb3J0KCk7XG4gIGtiLnNvcnQoKTtcbiAgLy9+fn5jaGVhcCBrZXkgdGVzdFxuICBmb3IgKGkgPSBrYS5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGlmIChrYVtpXSAhPSBrYltpXSkgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vZXF1aXZhbGVudCB2YWx1ZXMgZm9yIGV2ZXJ5IGNvcnJlc3BvbmRpbmcga2V5LCBhbmRcbiAgLy9+fn5wb3NzaWJseSBleHBlbnNpdmUgZGVlcCB0ZXN0XG4gIGZvciAoaSA9IGthLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAga2V5ID0ga2FbaV07XG4gICAgaWYgKCFfZGVlcEVxdWFsKGFba2V5XSwgYltrZXldKSkgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vLyA4LiBUaGUgbm9uLWVxdWl2YWxlbmNlIGFzc2VydGlvbiB0ZXN0cyBmb3IgYW55IGRlZXAgaW5lcXVhbGl0eS5cbi8vIGFzc2VydC5ub3REZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZV9vcHQpO1xuXG5hc3NlcnQubm90RGVlcEVxdWFsID0gZnVuY3Rpb24gbm90RGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKF9kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCkpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICdub3REZWVwRXF1YWwnLCBhc3NlcnQubm90RGVlcEVxdWFsKTtcbiAgfVxufTtcblxuLy8gOS4gVGhlIHN0cmljdCBlcXVhbGl0eSBhc3NlcnRpb24gdGVzdHMgc3RyaWN0IGVxdWFsaXR5LCBhcyBkZXRlcm1pbmVkIGJ5ID09PS5cbi8vIGFzc2VydC5zdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC5zdHJpY3RFcXVhbCA9IGZ1bmN0aW9uIHN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgaWYgKGFjdHVhbCAhPT0gZXhwZWN0ZWQpIHtcbiAgICBmYWlsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsICc9PT0nLCBhc3NlcnQuc3RyaWN0RXF1YWwpO1xuICB9XG59O1xuXG4vLyAxMC4gVGhlIHN0cmljdCBub24tZXF1YWxpdHkgYXNzZXJ0aW9uIHRlc3RzIGZvciBzdHJpY3QgaW5lcXVhbGl0eSwgYXNcbi8vIGRldGVybWluZWQgYnkgIT09LiAgYXNzZXJ0Lm5vdFN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2Vfb3B0KTtcblxuYXNzZXJ0Lm5vdFN0cmljdEVxdWFsID0gZnVuY3Rpb24gbm90U3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSkge1xuICBpZiAoYWN0dWFsID09PSBleHBlY3RlZCkge1xuICAgIGZhaWwoYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgJyE9PScsIGFzc2VydC5ub3RTdHJpY3RFcXVhbCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGV4cGVjdGVkRXhjZXB0aW9uKGFjdHVhbCwgZXhwZWN0ZWQpIHtcbiAgaWYgKCFhY3R1YWwgfHwgIWV4cGVjdGVkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChleHBlY3RlZCkgPT0gJ1tvYmplY3QgUmVnRXhwXScpIHtcbiAgICByZXR1cm4gZXhwZWN0ZWQudGVzdChhY3R1YWwpO1xuICB9IGVsc2UgaWYgKGFjdHVhbCBpbnN0YW5jZW9mIGV4cGVjdGVkKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSBpZiAoZXhwZWN0ZWQuY2FsbCh7fSwgYWN0dWFsKSA9PT0gdHJ1ZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBfdGhyb3dzKHNob3VsZFRocm93LCBibG9jaywgZXhwZWN0ZWQsIG1lc3NhZ2UpIHtcbiAgdmFyIGFjdHVhbDtcblxuICBpZiAodXRpbC5pc1N0cmluZyhleHBlY3RlZCkpIHtcbiAgICBtZXNzYWdlID0gZXhwZWN0ZWQ7XG4gICAgZXhwZWN0ZWQgPSBudWxsO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBibG9jaygpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgYWN0dWFsID0gZTtcbiAgfVxuXG4gIG1lc3NhZ2UgPSAoZXhwZWN0ZWQgJiYgZXhwZWN0ZWQubmFtZSA/ICcgKCcgKyBleHBlY3RlZC5uYW1lICsgJykuJyA6ICcuJykgKyAobWVzc2FnZSA/ICcgJyArIG1lc3NhZ2UgOiAnLicpO1xuXG4gIGlmIChzaG91bGRUaHJvdyAmJiAhYWN0dWFsKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCAnTWlzc2luZyBleHBlY3RlZCBleGNlcHRpb24nICsgbWVzc2FnZSk7XG4gIH1cblxuICBpZiAoIXNob3VsZFRocm93ICYmIGV4cGVjdGVkRXhjZXB0aW9uKGFjdHVhbCwgZXhwZWN0ZWQpKSB7XG4gICAgZmFpbChhY3R1YWwsIGV4cGVjdGVkLCAnR290IHVud2FudGVkIGV4Y2VwdGlvbicgKyBtZXNzYWdlKTtcbiAgfVxuXG4gIGlmIChzaG91bGRUaHJvdyAmJiBhY3R1YWwgJiYgZXhwZWN0ZWQgJiYgIWV4cGVjdGVkRXhjZXB0aW9uKGFjdHVhbCwgZXhwZWN0ZWQpIHx8ICFzaG91bGRUaHJvdyAmJiBhY3R1YWwpIHtcbiAgICB0aHJvdyBhY3R1YWw7XG4gIH1cbn1cblxuLy8gMTEuIEV4cGVjdGVkIHRvIHRocm93IGFuIGVycm9yOlxuLy8gYXNzZXJ0LnRocm93cyhibG9jaywgRXJyb3Jfb3B0LCBtZXNzYWdlX29wdCk7XG5cbmFzc2VydC50aHJvd3MgPSBmdW5jdGlvbiAoYmxvY2ssIC8qb3B0aW9uYWwqL2Vycm9yLCAvKm9wdGlvbmFsKi9tZXNzYWdlKSB7XG4gIF90aHJvd3MuYXBwbHkodGhpcywgW3RydWVdLmNvbmNhdChwU2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG59O1xuXG4vLyBFWFRFTlNJT04hIFRoaXMgaXMgYW5ub3lpbmcgdG8gd3JpdGUgb3V0c2lkZSB0aGlzIG1vZHVsZS5cbmFzc2VydC5kb2VzTm90VGhyb3cgPSBmdW5jdGlvbiAoYmxvY2ssIC8qb3B0aW9uYWwqL21lc3NhZ2UpIHtcbiAgX3Rocm93cy5hcHBseSh0aGlzLCBbZmFsc2VdLmNvbmNhdChwU2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG59O1xuXG5hc3NlcnQuaWZFcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgaWYgKGVycikge1xuICAgIHRocm93IGVycjtcbiAgfVxufTtcblxudmFyIG9iamVjdEtleXMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiAob2JqKSB7XG4gIHZhciBrZXlzID0gW107XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICBpZiAoaGFzT3duLmNhbGwob2JqLCBrZXkpKSBrZXlzLnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4ga2V5cztcbn07XG59LHtcInV0aWwvXCI6MjB9XSwzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbm1vZHVsZS5leHBvcnRzID0gYXBwbHlIb29rO1xuXG4vLyBhcHBseSBhcmd1bWVudHMgb250byBhbiBhcnJheSBvZiBmdW5jdGlvbnMsIHVzZWZ1bCBmb3IgaG9va3Ncbi8vIChhcnIsIGFueT8sIGFueT8sIGFueT8sIGFueT8sIGFueT8pIC0+IG51bGxcbmZ1bmN0aW9uIGFwcGx5SG9vayhhcnIsIGFyZzEsIGFyZzIsIGFyZzMsIGFyZzQsIGFyZzUpIHtcbiAgYXJyLmZvckVhY2goZnVuY3Rpb24gKGZuKSB7XG4gICAgZm4oYXJnMSwgYXJnMiwgYXJnMywgYXJnNCwgYXJnNSk7XG4gIH0pO1xufVxufSx7fV0sNDpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgbXV0YXRlID0gcmVxdWlyZSgneHRlbmQvbXV0YWJsZScpO1xudmFyIGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpO1xudmFyIHh0ZW5kID0gcmVxdWlyZSgneHRlbmQnKTtcblxudmFyIGFwcGx5SG9vayA9IHJlcXVpcmUoJy4vYXBwbHktaG9vaycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRpc3BhdGNoZXI7XG5cbi8vIGluaXRpYWxpemUgYSBuZXcgYmFycmFja3MgaW5zdGFuY2Vcbi8vIG9iaiAtPiBvYmpcbmZ1bmN0aW9uIGRpc3BhdGNoZXIoaG9va3MpIHtcbiAgaG9va3MgPSBob29rcyB8fCB7fTtcbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBob29rcywgJ29iamVjdCcsICdiYXJyYWNrczogaG9va3Mgc2hvdWxkIGJlIHVuZGVmaW5lZCBvciBhbiBvYmplY3QnKTtcblxuICB2YXIgb25TdGF0ZUNoYW5nZUhvb2tzID0gW107XG4gIHZhciBvbkFjdGlvbkhvb2tzID0gW107XG4gIHZhciBvbkVycm9ySG9va3MgPSBbXTtcblxuICB2YXIgc3Vic2NyaXB0aW9uV3JhcHMgPSBbXTtcbiAgdmFyIGluaXRpYWxTdGF0ZVdyYXBzID0gW107XG4gIHZhciByZWR1Y2VyV3JhcHMgPSBbXTtcbiAgdmFyIGVmZmVjdFdyYXBzID0gW107XG5cbiAgdXNlKGhvb2tzKTtcblxuICB2YXIgcmVkdWNlcnNDYWxsZWQgPSBmYWxzZTtcbiAgdmFyIGVmZmVjdHNDYWxsZWQgPSBmYWxzZTtcbiAgdmFyIHN0YXRlQ2FsbGVkID0gZmFsc2U7XG4gIHZhciBzdWJzQ2FsbGVkID0gZmFsc2U7XG5cbiAgdmFyIHN1YnNjcmlwdGlvbnMgPSBzdGFydC5fc3Vic2NyaXB0aW9ucyA9IHt9O1xuICB2YXIgcmVkdWNlcnMgPSBzdGFydC5fcmVkdWNlcnMgPSB7fTtcbiAgdmFyIGVmZmVjdHMgPSBzdGFydC5fZWZmZWN0cyA9IHt9O1xuICB2YXIgbW9kZWxzID0gc3RhcnQuX21vZGVscyA9IFtdO1xuICB2YXIgX3N0YXRlID0ge307XG5cbiAgc3RhcnQubW9kZWwgPSBzZXRNb2RlbDtcbiAgc3RhcnQuc3RhdGUgPSBnZXRTdGF0ZTtcbiAgc3RhcnQuc3RhcnQgPSBzdGFydDtcbiAgc3RhcnQudXNlID0gdXNlO1xuICByZXR1cm4gc3RhcnQ7XG5cbiAgLy8gcHVzaCBhbiBvYmplY3Qgb2YgaG9va3Mgb250byBhbiBhcnJheVxuICAvLyBvYmogLT4gbnVsbFxuICBmdW5jdGlvbiB1c2UoaG9va3MpIHtcbiAgICBhc3NlcnQuZXF1YWwodHlwZW9mIGhvb2tzLCAnb2JqZWN0JywgJ2JhcnJhY2tzLnVzZTogaG9va3Mgc2hvdWxkIGJlIGFuIG9iamVjdCcpO1xuICAgIGFzc2VydC5vayghaG9va3Mub25FcnJvciB8fCB0eXBlb2YgaG9va3Mub25FcnJvciA9PT0gJ2Z1bmN0aW9uJywgJ2JhcnJhY2tzLnVzZTogb25FcnJvciBzaG91bGQgYmUgdW5kZWZpbmVkIG9yIGEgZnVuY3Rpb24nKTtcbiAgICBhc3NlcnQub2soIWhvb2tzLm9uQWN0aW9uIHx8IHR5cGVvZiBob29rcy5vbkFjdGlvbiA9PT0gJ2Z1bmN0aW9uJywgJ2JhcnJhY2tzLnVzZTogb25BY3Rpb24gc2hvdWxkIGJlIHVuZGVmaW5lZCBvciBhIGZ1bmN0aW9uJyk7XG4gICAgYXNzZXJ0Lm9rKCFob29rcy5vblN0YXRlQ2hhbmdlIHx8IHR5cGVvZiBob29rcy5vblN0YXRlQ2hhbmdlID09PSAnZnVuY3Rpb24nLCAnYmFycmFja3MudXNlOiBvblN0YXRlQ2hhbmdlIHNob3VsZCBiZSB1bmRlZmluZWQgb3IgYSBmdW5jdGlvbicpO1xuXG4gICAgaWYgKGhvb2tzLm9uU3RhdGVDaGFuZ2UpIG9uU3RhdGVDaGFuZ2VIb29rcy5wdXNoKGhvb2tzLm9uU3RhdGVDaGFuZ2UpO1xuICAgIGlmIChob29rcy5vbkVycm9yKSBvbkVycm9ySG9va3MucHVzaCh3cmFwT25FcnJvcihob29rcy5vbkVycm9yKSk7XG4gICAgaWYgKGhvb2tzLm9uQWN0aW9uKSBvbkFjdGlvbkhvb2tzLnB1c2goaG9va3Mub25BY3Rpb24pO1xuICAgIGlmIChob29rcy53cmFwU3Vic2NyaXB0aW9ucykgc3Vic2NyaXB0aW9uV3JhcHMucHVzaChob29rcy53cmFwU3Vic2NyaXB0aW9ucyk7XG4gICAgaWYgKGhvb2tzLndyYXBJbml0aWFsU3RhdGUpIGluaXRpYWxTdGF0ZVdyYXBzLnB1c2goaG9va3Mud3JhcEluaXRpYWxTdGF0ZSk7XG4gICAgaWYgKGhvb2tzLndyYXBSZWR1Y2VycykgcmVkdWNlcldyYXBzLnB1c2goaG9va3Mud3JhcFJlZHVjZXJzKTtcbiAgICBpZiAoaG9va3Mud3JhcEVmZmVjdHMpIGVmZmVjdFdyYXBzLnB1c2goaG9va3Mud3JhcEVmZmVjdHMpO1xuICB9XG5cbiAgLy8gcHVzaCBhIG1vZGVsIHRvIGJlIGluaXRpYXRlZFxuICAvLyBvYmogLT4gbnVsbFxuICBmdW5jdGlvbiBzZXRNb2RlbChtb2RlbCkge1xuICAgIGFzc2VydC5lcXVhbCh0eXBlb2YgbW9kZWwsICdvYmplY3QnLCAnYmFycmFja3Muc3RvcmUubW9kZWw6IG1vZGVsIHNob3VsZCBiZSBhbiBvYmplY3QnKTtcbiAgICBtb2RlbHMucHVzaChtb2RlbCk7XG4gIH1cblxuICAvLyBnZXQgdGhlIGN1cnJlbnQgc3RhdGUgZnJvbSB0aGUgc3RvcmVcbiAgLy8gb2JqPyAtPiBvYmpcbiAgZnVuY3Rpb24gZ2V0U3RhdGUob3B0cykge1xuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgIGFzc2VydC5lcXVhbCh0eXBlb2Ygb3B0cywgJ29iamVjdCcsICdiYXJyYWNrcy5zdG9yZS5zdGF0ZTogb3B0cyBzaG91bGQgYmUgYW4gb2JqZWN0Jyk7XG5cbiAgICB2YXIgc3RhdGUgPSBvcHRzLnN0YXRlO1xuICAgIGlmICghb3B0cy5zdGF0ZSAmJiBvcHRzLmZyZWV6ZSA9PT0gZmFsc2UpIHJldHVybiB4dGVuZChfc3RhdGUpO2Vsc2UgaWYgKCFvcHRzLnN0YXRlKSByZXR1cm4gT2JqZWN0LmZyZWV6ZSh4dGVuZChfc3RhdGUpKTtcbiAgICBhc3NlcnQuZXF1YWwodHlwZW9mIHN0YXRlLCAnb2JqZWN0JywgJ2JhcnJhY2tzLnN0b3JlLnN0YXRlOiBzdGF0ZSBzaG91bGQgYmUgYW4gb2JqZWN0Jyk7XG5cbiAgICB2YXIgbmFtZXNwYWNlcyA9IFtdO1xuICAgIHZhciBuZXdTdGF0ZSA9IHt9O1xuXG4gICAgLy8gYXBwbHkgYWxsIGZpZWxkcyBmcm9tIHRoZSBtb2RlbCwgYW5kIG5hbWVzcGFjZWQgZmllbGRzIGZyb20gdGhlIHBhc3NlZFxuICAgIC8vIGluIHN0YXRlXG4gICAgbW9kZWxzLmZvckVhY2goZnVuY3Rpb24gKG1vZGVsKSB7XG4gICAgICB2YXIgbnMgPSBtb2RlbC5uYW1lc3BhY2U7XG4gICAgICBuYW1lc3BhY2VzLnB1c2gobnMpO1xuICAgICAgdmFyIG1vZGVsU3RhdGUgPSBtb2RlbC5zdGF0ZSB8fCB7fTtcbiAgICAgIGlmIChucykge1xuICAgICAgICBuZXdTdGF0ZVtuc10gPSBuZXdTdGF0ZVtuc10gfHwge307XG4gICAgICAgIGFwcGx5KG5zLCBtb2RlbFN0YXRlLCBuZXdTdGF0ZSk7XG4gICAgICAgIG5ld1N0YXRlW25zXSA9IHh0ZW5kKG5ld1N0YXRlW25zXSwgc3RhdGVbbnNdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG11dGF0ZShuZXdTdGF0ZSwgbW9kZWxTdGF0ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBub3cgYXBwbHkgYWxsIGZpZWxkcyB0aGF0IHdlcmVuJ3QgbmFtZXNwYWNlZCBmcm9tIHRoZSBwYXNzZWQgaW4gc3RhdGVcbiAgICBPYmplY3Qua2V5cyhzdGF0ZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBpZiAobmFtZXNwYWNlcy5pbmRleE9mKGtleSkgIT09IC0xKSByZXR1cm47XG4gICAgICBuZXdTdGF0ZVtrZXldID0gc3RhdGVba2V5XTtcbiAgICB9KTtcblxuICAgIHZhciB0bXBTdGF0ZSA9IHh0ZW5kKF9zdGF0ZSwgeHRlbmQoc3RhdGUsIG5ld1N0YXRlKSk7XG4gICAgdmFyIHdyYXBwZWRTdGF0ZSA9IHdyYXBIb29rKHRtcFN0YXRlLCBpbml0aWFsU3RhdGVXcmFwcyk7XG5cbiAgICByZXR1cm4gb3B0cy5mcmVlemUgPT09IGZhbHNlID8gd3JhcHBlZFN0YXRlIDogT2JqZWN0LmZyZWV6ZSh3cmFwcGVkU3RhdGUpO1xuICB9XG5cbiAgLy8gaW5pdGlhbGl6ZSB0aGUgc3RvcmUgaG9va3MsIGdldCB0aGUgc2VuZCgpIGZ1bmN0aW9uXG4gIC8vIG9iaj8gLT4gZm5cbiAgZnVuY3Rpb24gc3RhcnQob3B0cykge1xuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgIGFzc2VydC5lcXVhbCh0eXBlb2Ygb3B0cywgJ29iamVjdCcsICdiYXJyYWNrcy5zdG9yZS5zdGFydDogb3B0cyBzaG91bGQgYmUgdW5kZWZpbmVkIG9yIGFuIG9iamVjdCcpO1xuXG4gICAgLy8gcmVnaXN0ZXIgdmFsdWVzIGZyb20gdGhlIG1vZGVsc1xuICAgIG1vZGVscy5mb3JFYWNoKGZ1bmN0aW9uIChtb2RlbCkge1xuICAgICAgdmFyIG5zID0gbW9kZWwubmFtZXNwYWNlO1xuICAgICAgaWYgKCFzdGF0ZUNhbGxlZCAmJiBtb2RlbC5zdGF0ZSAmJiBvcHRzLnN0YXRlICE9PSBmYWxzZSkge1xuICAgICAgICB2YXIgbW9kZWxTdGF0ZSA9IG1vZGVsLnN0YXRlIHx8IHt9O1xuICAgICAgICBpZiAobnMpIHtcbiAgICAgICAgICBfc3RhdGVbbnNdID0gX3N0YXRlW25zXSB8fCB7fTtcbiAgICAgICAgICBhcHBseShucywgbW9kZWxTdGF0ZSwgX3N0YXRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtdXRhdGUoX3N0YXRlLCBtb2RlbFN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCFyZWR1Y2Vyc0NhbGxlZCAmJiBtb2RlbC5yZWR1Y2VycyAmJiBvcHRzLnJlZHVjZXJzICE9PSBmYWxzZSkge1xuICAgICAgICBhcHBseShucywgbW9kZWwucmVkdWNlcnMsIHJlZHVjZXJzLCBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgICByZXR1cm4gd3JhcEhvb2soY2IsIHJlZHVjZXJXcmFwcyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKCFlZmZlY3RzQ2FsbGVkICYmIG1vZGVsLmVmZmVjdHMgJiYgb3B0cy5lZmZlY3RzICE9PSBmYWxzZSkge1xuICAgICAgICBhcHBseShucywgbW9kZWwuZWZmZWN0cywgZWZmZWN0cywgZnVuY3Rpb24gKGNiKSB7XG4gICAgICAgICAgcmV0dXJuIHdyYXBIb29rKGNiLCBlZmZlY3RXcmFwcyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKCFzdWJzQ2FsbGVkICYmIG1vZGVsLnN1YnNjcmlwdGlvbnMgJiYgb3B0cy5zdWJzY3JpcHRpb25zICE9PSBmYWxzZSkge1xuICAgICAgICBhcHBseShucywgbW9kZWwuc3Vic2NyaXB0aW9ucywgc3Vic2NyaXB0aW9ucywgZnVuY3Rpb24gKGNiLCBrZXkpIHtcbiAgICAgICAgICB2YXIgc2VuZCA9IGNyZWF0ZVNlbmQoJ3N1YnNjcmlwdGlvbjogJyArIChucyA/IG5zICsgJzonICsga2V5IDoga2V5KSk7XG4gICAgICAgICAgY2IgPSB3cmFwSG9vayhjYiwgc3Vic2NyaXB0aW9uV3JhcHMpO1xuICAgICAgICAgIGNiKHNlbmQsIGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgIGFwcGx5SG9vayhvbkVycm9ySG9va3MsIGVycik7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIGNiO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIHRoZSBzdGF0ZSB3cmFwIGlzIHNwZWNpYWwgYmVjYXVzZSB3ZSB3YW50IHRvIG9wZXJhdGUgb24gdGhlIGZ1bGxcbiAgICAvLyBzdGF0ZSByYXRoZXIgdGhhbiBpbmR2aWR1YWwgY2h1bmtzLCBzbyB3ZSBhcHBseSBpdCBvdXRzaWRlIHRoZSBsb29wXG4gICAgaWYgKCFzdGF0ZUNhbGxlZCAmJiBvcHRzLnN0YXRlICE9PSBmYWxzZSkge1xuICAgICAgX3N0YXRlID0gd3JhcEhvb2soX3N0YXRlLCBpbml0aWFsU3RhdGVXcmFwcyk7XG4gICAgfVxuXG4gICAgaWYgKCFvcHRzLm5vU3Vic2NyaXB0aW9ucykgc3Vic0NhbGxlZCA9IHRydWU7XG4gICAgaWYgKCFvcHRzLm5vUmVkdWNlcnMpIHJlZHVjZXJzQ2FsbGVkID0gdHJ1ZTtcbiAgICBpZiAoIW9wdHMubm9FZmZlY3RzKSBlZmZlY3RzQ2FsbGVkID0gdHJ1ZTtcbiAgICBpZiAoIW9wdHMubm9TdGF0ZSkgc3RhdGVDYWxsZWQgPSB0cnVlO1xuXG4gICAgaWYgKCFvbkVycm9ySG9va3MubGVuZ3RoKSBvbkVycm9ySG9va3MucHVzaCh3cmFwT25FcnJvcihkZWZhdWx0T25FcnJvcikpO1xuXG4gICAgcmV0dXJuIGNyZWF0ZVNlbmQ7XG5cbiAgICAvLyBjYWxsIGFuIGFjdGlvbiBmcm9tIGEgdmlld1xuICAgIC8vIChzdHIsIGJvb2w/KSAtPiAoc3RyLCBhbnk/LCBmbj8pIC0+IG51bGxcbiAgICBmdW5jdGlvbiBjcmVhdGVTZW5kKHNlbGZOYW1lLCBjYWxsT25FcnJvcikge1xuICAgICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBzZWxmTmFtZSwgJ3N0cmluZycsICdiYXJyYWNrcy5zdG9yZS5zdGFydC5jcmVhdGVTZW5kOiBzZWxmTmFtZSBzaG91bGQgYmUgYSBzdHJpbmcnKTtcbiAgICAgIGFzc2VydC5vayghY2FsbE9uRXJyb3IgfHwgdHlwZW9mIGNhbGxPbkVycm9yID09PSAnYm9vbGVhbicsICdiYXJyYWNrcy5zdG9yZS5zdGFydC5zZW5kOiBjYWxsT25FcnJvciBzaG91bGQgYmUgdW5kZWZpbmVkIG9yIGEgYm9vbGVhbicpO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gc2VuZChuYW1lLCBkYXRhLCBjYikge1xuICAgICAgICBpZiAoIWNiICYmICFjYWxsT25FcnJvcikge1xuICAgICAgICAgIGNiID0gZGF0YTtcbiAgICAgICAgICBkYXRhID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBkYXRhID0gdHlwZW9mIGRhdGEgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IGRhdGE7XG5cbiAgICAgICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBuYW1lLCAnc3RyaW5nJywgJ2JhcnJhY2tzLnN0b3JlLnN0YXJ0LnNlbmQ6IG5hbWUgc2hvdWxkIGJlIGEgc3RyaW5nJyk7XG4gICAgICAgIGFzc2VydC5vayghY2IgfHwgdHlwZW9mIGNiID09PSAnZnVuY3Rpb24nLCAnYmFycmFja3Muc3RvcmUuc3RhcnQuc2VuZDogY2Igc2hvdWxkIGJlIGEgZnVuY3Rpb24nKTtcblxuICAgICAgICB2YXIgZG9uZSA9IGNhbGxPbkVycm9yID8gb25FcnJvckNhbGxiYWNrIDogY2I7XG4gICAgICAgIF9zZW5kKG5hbWUsIGRhdGEsIHNlbGZOYW1lLCBkb25lKTtcblxuICAgICAgICBmdW5jdGlvbiBvbkVycm9yQ2FsbGJhY2soZXJyKSB7XG4gICAgICAgICAgZXJyID0gZXJyIHx8IG51bGw7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgYXBwbHlIb29rKG9uRXJyb3JIb29rcywgZXJyLCBfc3RhdGUsIGZ1bmN0aW9uIGNyZWF0ZVNlbmQoc2VsZk5hbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNlbmQobmFtZSwgZGF0YSkge1xuICAgICAgICAgICAgICAgIGFzc2VydC5lcXVhbCh0eXBlb2YgbmFtZSwgJ3N0cmluZycsICdiYXJyYWNrcy5zdG9yZS5zdGFydC5zZW5kOiBuYW1lIHNob3VsZCBiZSBhIHN0cmluZycpO1xuICAgICAgICAgICAgICAgIGRhdGEgPSB0eXBlb2YgZGF0YSA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogZGF0YTtcbiAgICAgICAgICAgICAgICBfc2VuZChuYW1lLCBkYXRhLCBzZWxmTmFtZSwgZG9uZSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gY2FsbCBhbiBhY3Rpb25cbiAgICAvLyAoc3RyLCBzdHIsIGFueSwgZm4pIC0+IG51bGxcbiAgICBmdW5jdGlvbiBfc2VuZChuYW1lLCBkYXRhLCBjYWxsZXIsIGNiKSB7XG4gICAgICBhc3NlcnQuZXF1YWwodHlwZW9mIG5hbWUsICdzdHJpbmcnLCAnYmFycmFja3MuX3NlbmQ6IG5hbWUgc2hvdWxkIGJlIGEgc3RyaW5nJyk7XG4gICAgICBhc3NlcnQuZXF1YWwodHlwZW9mIGNhbGxlciwgJ3N0cmluZycsICdiYXJyYWNrcy5fc2VuZDogY2FsbGVyIHNob3VsZCBiZSBhIHN0cmluZycpO1xuICAgICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBjYiwgJ2Z1bmN0aW9uJywgJ2JhcnJhY2tzLl9zZW5kOiBjYiBzaG91bGQgYmUgYSBmdW5jdGlvbicpO1xuXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlZHVjZXJzQ2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHZhciBlZmZlY3RzQ2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHZhciBuZXdTdGF0ZSA9IHh0ZW5kKF9zdGF0ZSk7XG5cbiAgICAgICAgaWYgKG9uQWN0aW9uSG9va3MubGVuZ3RoKSB7XG4gICAgICAgICAgYXBwbHlIb29rKG9uQWN0aW9uSG9va3MsIGRhdGEsIF9zdGF0ZSwgbmFtZSwgY2FsbGVyLCBjcmVhdGVTZW5kKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZhbGlkYXRlIGlmIGEgbmFtZXNwYWNlIGV4aXN0cy4gTmFtZXNwYWNlcyBhcmUgZGVsaW1pdGVkIGJ5ICc6Jy5cbiAgICAgICAgdmFyIGFjdGlvbk5hbWUgPSBuYW1lO1xuICAgICAgICBpZiAoLzovLnRlc3QobmFtZSkpIHtcbiAgICAgICAgICB2YXIgYXJyID0gbmFtZS5zcGxpdCgnOicpO1xuICAgICAgICAgIHZhciBucyA9IGFyci5zaGlmdCgpO1xuICAgICAgICAgIGFjdGlvbk5hbWUgPSBhcnIuam9pbignOicpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIF9yZWR1Y2VycyA9IG5zID8gcmVkdWNlcnNbbnNdIDogcmVkdWNlcnM7XG4gICAgICAgIGlmIChfcmVkdWNlcnMgJiYgX3JlZHVjZXJzW2FjdGlvbk5hbWVdKSB7XG4gICAgICAgICAgaWYgKG5zKSB7XG4gICAgICAgICAgICB2YXIgcmVkdWNlZFN0YXRlID0gX3JlZHVjZXJzW2FjdGlvbk5hbWVdKGRhdGEsIF9zdGF0ZVtuc10pO1xuICAgICAgICAgICAgbmV3U3RhdGVbbnNdID0geHRlbmQoX3N0YXRlW25zXSwgcmVkdWNlZFN0YXRlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbXV0YXRlKG5ld1N0YXRlLCByZWR1Y2Vyc1thY3Rpb25OYW1lXShkYXRhLCBfc3RhdGUpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVkdWNlcnNDYWxsZWQgPSB0cnVlO1xuICAgICAgICAgIGlmIChvblN0YXRlQ2hhbmdlSG9va3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBhcHBseUhvb2sob25TdGF0ZUNoYW5nZUhvb2tzLCBkYXRhLCBuZXdTdGF0ZSwgX3N0YXRlLCBhY3Rpb25OYW1lLCBjcmVhdGVTZW5kKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgX3N0YXRlID0gbmV3U3RhdGU7XG4gICAgICAgICAgY2IobnVsbCwgbmV3U3RhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIF9lZmZlY3RzID0gbnMgPyBlZmZlY3RzW25zXSA6IGVmZmVjdHM7XG4gICAgICAgIGlmICghcmVkdWNlcnNDYWxsZWQgJiYgX2VmZmVjdHMgJiYgX2VmZmVjdHNbYWN0aW9uTmFtZV0pIHtcbiAgICAgICAgICB2YXIgc2VuZCA9IGNyZWF0ZVNlbmQoJ2VmZmVjdDogJyArIG5hbWUpO1xuICAgICAgICAgIGlmIChucykgX2VmZmVjdHNbYWN0aW9uTmFtZV0oZGF0YSwgX3N0YXRlW25zXSwgc2VuZCwgY2IpO2Vsc2UgX2VmZmVjdHNbYWN0aW9uTmFtZV0oZGF0YSwgX3N0YXRlLCBzZW5kLCBjYik7XG4gICAgICAgICAgZWZmZWN0c0NhbGxlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXJlZHVjZXJzQ2FsbGVkICYmICFlZmZlY3RzQ2FsbGVkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCBhY3Rpb24gJyArIGFjdGlvbk5hbWUpO1xuICAgICAgICB9XG4gICAgICB9LCAwKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gY29tcG9zZSBhbiBvYmplY3QgY29uZGl0aW9uYWxseVxuLy8gb3B0aW9uYWxseSBjb250YWlucyBhIG5hbWVzcGFjZVxuLy8gd2hpY2ggaXMgdXNlZCB0byBuZXN0IHByb3BlcnRpZXMuXG4vLyAoc3RyLCBvYmosIG9iaiwgZm4/KSAtPiBudWxsXG5mdW5jdGlvbiBhcHBseShucywgc291cmNlLCB0YXJnZXQsIHdyYXApIHtcbiAgaWYgKG5zICYmICF0YXJnZXRbbnNdKSB0YXJnZXRbbnNdID0ge307XG4gIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgdmFyIGNiID0gd3JhcCA/IHdyYXAoc291cmNlW2tleV0sIGtleSkgOiBzb3VyY2Vba2V5XTtcbiAgICBpZiAobnMpIHRhcmdldFtuc11ba2V5XSA9IGNiO2Vsc2UgdGFyZ2V0W2tleV0gPSBjYjtcbiAgfSk7XG59XG5cbi8vIGhhbmRsZSBlcnJvcnMgYWxsIHRoZSB3YXkgYXQgdGhlIHRvcCBvZiB0aGUgdHJhY2Vcbi8vIGVycj8gLT4gbnVsbFxuZnVuY3Rpb24gZGVmYXVsdE9uRXJyb3IoZXJyKSB7XG4gIHRocm93IGVycjtcbn1cblxuZnVuY3Rpb24gd3JhcE9uRXJyb3Iob25FcnJvcikge1xuICByZXR1cm4gZnVuY3Rpb24gb25FcnJvcldyYXAoZXJyLCBzdGF0ZSwgY3JlYXRlU2VuZCkge1xuICAgIGlmIChlcnIpIG9uRXJyb3IoZXJyLCBzdGF0ZSwgY3JlYXRlU2VuZCk7XG4gIH07XG59XG5cbi8vIHRha2UgYSBhcHBseSBhbiBhcnJheSBvZiB0cmFuc2Zvcm1zIG9udG8gYSB2YWx1ZS4gVGhlIG5ldyB2YWx1ZVxuLy8gbXVzdCBiZSByZXR1cm5lZCBzeW5jaHJvbm91c2x5IGZyb20gdGhlIHRyYW5zZm9ybVxuLy8gKGFueSwgW2ZuXSkgLT4gYW55XG5mdW5jdGlvbiB3cmFwSG9vayh2YWx1ZSwgdHJhbnNmb3Jtcykge1xuICB0cmFuc2Zvcm1zLmZvckVhY2goZnVuY3Rpb24gKHRyYW5zZm9ybSkge1xuICAgIHZhbHVlID0gdHJhbnNmb3JtKHZhbHVlKTtcbiAgfSk7XG4gIHJldHVybiB2YWx1ZTtcbn1cbn0se1wiLi9hcHBseS1ob29rXCI6MyxcImFzc2VydFwiOjIsXCJ4dGVuZFwiOjIzLFwieHRlbmQvbXV0YWJsZVwiOjI0fV0sNTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5cbn0se31dLDY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaXMgbm90IGRlZmluZWQnKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaXMgbm90IGRlZmluZWQnKTtcbiAgICAgICAgfTtcbiAgICB9XG59KSgpO1xudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gY2FjaGVkU2V0VGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUgKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGNhY2hlZENsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gJy8nO1xufTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAwO1xufTtcbn0se31dLDc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZG9jdW1lbnQgPSByZXF1aXJlKCdnbG9iYWwvZG9jdW1lbnQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyID8gcmVhZHkgOiBub29wO1xuXG5mdW5jdGlvbiByZWFkeShjYWxsYmFjaykge1xuICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgIHJldHVybiBzZXRUaW1lb3V0KGNhbGxiYWNrLCAwKTtcbiAgfVxuXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiBvbkxvYWQoKSB7XG4gICAgY2FsbGJhY2soKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxufSx7XCJnbG9iYWwvZG9jdW1lbnRcIjo4fV0sODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKGdsb2JhbCl7XG52YXIgdG9wTGV2ZWwgPSB0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJyA/IGdsb2JhbCA6IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDoge307XG52YXIgbWluRG9jID0gcmVxdWlyZSgnbWluLWRvY3VtZW50Jyk7XG5cbmlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBkb2N1bWVudDtcbn0gZWxzZSB7XG4gICAgdmFyIGRvY2N5ID0gdG9wTGV2ZWxbJ19fR0xPQkFMX0RPQ1VNRU5UX0NBQ0hFQDQnXTtcblxuICAgIGlmICghZG9jY3kpIHtcbiAgICAgICAgZG9jY3kgPSB0b3BMZXZlbFsnX19HTE9CQUxfRE9DVU1FTlRfQ0FDSEVANCddID0gbWluRG9jO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gZG9jY3k7XG59XG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbn0se1wibWluLWRvY3VtZW50XCI6NX1dLDk6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChnbG9iYWwpe1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZ2xvYmFsO1xufSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gc2VsZjtcbn0gZWxzZSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSB7fTtcbn1cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxufSx7fV0sMTA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYXNoTWF0Y2goaGFzaCwgcHJlZml4KSB7XG4gIHZhciBwcmUgPSBwcmVmaXggfHwgJy8nO1xuICBpZiAoaGFzaC5sZW5ndGggPT09IDApIHJldHVybiBwcmU7XG4gIGhhc2ggPSBoYXNoLnJlcGxhY2UoJyMnLCAnJyk7XG4gIGhhc2ggPSBoYXNoLnJlcGxhY2UoL1xcLyQvLCAnJyk7XG4gIGlmIChoYXNoLmluZGV4T2YoJy8nKSAhPSAwKSBoYXNoID0gJy8nICsgaGFzaDtcbiAgaWYgKHByZSA9PSAnLycpIHJldHVybiBoYXNoO2Vsc2UgcmV0dXJuIGhhc2gucmVwbGFjZShwcmUsICcnKTtcbn07XG59LHt9XSwxMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5pZiAodHlwZW9mIE9iamVjdC5jcmVhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgLy8gaW1wbGVtZW50YXRpb24gZnJvbSBzdGFuZGFyZCBub2RlLmpzICd1dGlsJyBtb2R1bGVcbiAgbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvcjtcbiAgICBjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDdG9yLnByb3RvdHlwZSwge1xuICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgdmFsdWU6IGN0b3IsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59IGVsc2Uge1xuICAvLyBvbGQgc2Nob29sIHNoaW0gZm9yIG9sZCBicm93c2Vyc1xuICBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGluaGVyaXRzKGN0b3IsIHN1cGVyQ3Rvcikge1xuICAgIGN0b3Iuc3VwZXJfID0gc3VwZXJDdG9yO1xuICAgIHZhciBUZW1wQ3RvciA9IGZ1bmN0aW9uICgpIHt9O1xuICAgIFRlbXBDdG9yLnByb3RvdHlwZSA9IHN1cGVyQ3Rvci5wcm90b3R5cGU7XG4gICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgVGVtcEN0b3IoKTtcbiAgICBjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGN0b3I7XG4gIH07XG59XG59LHt9XSwxMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4vLyBDcmVhdGUgYSByYW5nZSBvYmplY3QgZm9yIGVmZmljZW50bHkgcmVuZGVyaW5nIHN0cmluZ3MgdG8gZWxlbWVudHMuXG52YXIgcmFuZ2U7XG5cbnZhciB0ZXN0RWwgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnID8gZG9jdW1lbnQuYm9keSB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSA6IHt9O1xuXG52YXIgWEhUTUwgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCc7XG52YXIgRUxFTUVOVF9OT0RFID0gMTtcbnZhciBURVhUX05PREUgPSAzO1xudmFyIENPTU1FTlRfTk9ERSA9IDg7XG5cbi8vIEZpeGVzIDxodHRwczovL2dpdGh1Yi5jb20vcGF0cmljay1zdGVlbGUtaWRlbS9tb3JwaGRvbS9pc3N1ZXMvMzI+XG4vLyAoSUU3KyBzdXBwb3J0KSA8PUlFNyBkb2VzIG5vdCBzdXBwb3J0IGVsLmhhc0F0dHJpYnV0ZShuYW1lKVxudmFyIGhhc0F0dHJpYnV0ZU5TO1xuXG5pZiAodGVzdEVsLmhhc0F0dHJpYnV0ZU5TKSB7XG4gICAgaGFzQXR0cmlidXRlTlMgPSBmdW5jdGlvbiAoZWwsIG5hbWVzcGFjZVVSSSwgbmFtZSkge1xuICAgICAgICByZXR1cm4gZWwuaGFzQXR0cmlidXRlTlMobmFtZXNwYWNlVVJJLCBuYW1lKTtcbiAgICB9O1xufSBlbHNlIGlmICh0ZXN0RWwuaGFzQXR0cmlidXRlKSB7XG4gICAgaGFzQXR0cmlidXRlTlMgPSBmdW5jdGlvbiAoZWwsIG5hbWVzcGFjZVVSSSwgbmFtZSkge1xuICAgICAgICByZXR1cm4gZWwuaGFzQXR0cmlidXRlKG5hbWUpO1xuICAgIH07XG59IGVsc2Uge1xuICAgIGhhc0F0dHJpYnV0ZU5TID0gZnVuY3Rpb24gKGVsLCBuYW1lc3BhY2VVUkksIG5hbWUpIHtcbiAgICAgICAgcmV0dXJuICEhZWwuZ2V0QXR0cmlidXRlTm9kZShuYW1lKTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBlbXB0eShvKSB7XG4gICAgZm9yICh2YXIgayBpbiBvKSB7XG4gICAgICAgIGlmIChvLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHRvRWxlbWVudChzdHIpIHtcbiAgICBpZiAoIXJhbmdlICYmIGRvY3VtZW50LmNyZWF0ZVJhbmdlKSB7XG4gICAgICAgIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgcmFuZ2Uuc2VsZWN0Tm9kZShkb2N1bWVudC5ib2R5KTtcbiAgICB9XG5cbiAgICB2YXIgZnJhZ21lbnQ7XG4gICAgaWYgKHJhbmdlICYmIHJhbmdlLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudCkge1xuICAgICAgICBmcmFnbWVudCA9IHJhbmdlLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChzdHIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYm9keScpO1xuICAgICAgICBmcmFnbWVudC5pbm5lckhUTUwgPSBzdHI7XG4gICAgfVxuICAgIHJldHVybiBmcmFnbWVudC5jaGlsZE5vZGVzWzBdO1xufVxuXG52YXIgc3BlY2lhbEVsSGFuZGxlcnMgPSB7XG4gICAgLyoqXG4gICAgICogTmVlZGVkIGZvciBJRS4gQXBwYXJlbnRseSBJRSBkb2Vzbid0IHRoaW5rIHRoYXQgXCJzZWxlY3RlZFwiIGlzIGFuXG4gICAgICogYXR0cmlidXRlIHdoZW4gcmVhZGluZyBvdmVyIHRoZSBhdHRyaWJ1dGVzIHVzaW5nIHNlbGVjdEVsLmF0dHJpYnV0ZXNcbiAgICAgKi9cbiAgICBPUFRJT046IGZ1bmN0aW9uIChmcm9tRWwsIHRvRWwpIHtcbiAgICAgICAgZnJvbUVsLnNlbGVjdGVkID0gdG9FbC5zZWxlY3RlZDtcbiAgICAgICAgaWYgKGZyb21FbC5zZWxlY3RlZCkge1xuICAgICAgICAgICAgZnJvbUVsLnNldEF0dHJpYnV0ZSgnc2VsZWN0ZWQnLCAnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmcm9tRWwucmVtb3ZlQXR0cmlidXRlKCdzZWxlY3RlZCcsICcnKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLyoqXG4gICAgICogVGhlIFwidmFsdWVcIiBhdHRyaWJ1dGUgaXMgc3BlY2lhbCBmb3IgdGhlIDxpbnB1dD4gZWxlbWVudCBzaW5jZSBpdCBzZXRzXG4gICAgICogdGhlIGluaXRpYWwgdmFsdWUuIENoYW5naW5nIHRoZSBcInZhbHVlXCIgYXR0cmlidXRlIHdpdGhvdXQgY2hhbmdpbmcgdGhlXG4gICAgICogXCJ2YWx1ZVwiIHByb3BlcnR5IHdpbGwgaGF2ZSBubyBlZmZlY3Qgc2luY2UgaXQgaXMgb25seSB1c2VkIHRvIHRoZSBzZXQgdGhlXG4gICAgICogaW5pdGlhbCB2YWx1ZS4gIFNpbWlsYXIgZm9yIHRoZSBcImNoZWNrZWRcIiBhdHRyaWJ1dGUsIGFuZCBcImRpc2FibGVkXCIuXG4gICAgICovXG4gICAgSU5QVVQ6IGZ1bmN0aW9uIChmcm9tRWwsIHRvRWwpIHtcbiAgICAgICAgZnJvbUVsLmNoZWNrZWQgPSB0b0VsLmNoZWNrZWQ7XG4gICAgICAgIGlmIChmcm9tRWwuY2hlY2tlZCkge1xuICAgICAgICAgICAgZnJvbUVsLnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsICcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZyb21FbC5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmcm9tRWwudmFsdWUgIT09IHRvRWwudmFsdWUpIHtcbiAgICAgICAgICAgIGZyb21FbC52YWx1ZSA9IHRvRWwudmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWhhc0F0dHJpYnV0ZU5TKHRvRWwsIG51bGwsICd2YWx1ZScpKSB7XG4gICAgICAgICAgICBmcm9tRWwucmVtb3ZlQXR0cmlidXRlKCd2YWx1ZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnJvbUVsLmRpc2FibGVkID0gdG9FbC5kaXNhYmxlZDtcbiAgICAgICAgaWYgKGZyb21FbC5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZnJvbUVsLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmcm9tRWwucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIFRFWFRBUkVBOiBmdW5jdGlvbiAoZnJvbUVsLCB0b0VsKSB7XG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IHRvRWwudmFsdWU7XG4gICAgICAgIGlmIChmcm9tRWwudmFsdWUgIT09IG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBmcm9tRWwudmFsdWUgPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmcm9tRWwuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgZnJvbUVsLmZpcnN0Q2hpbGQubm9kZVZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdHdvIG5vZGUncyBuYW1lcyBhbmQgbmFtZXNwYWNlIFVSSXMgYXJlIHRoZSBzYW1lLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gYVxuICogQHBhcmFtIHtFbGVtZW50fSBiXG4gKiBAcmV0dXJuIHtib29sZWFufVxuICovXG52YXIgY29tcGFyZU5vZGVOYW1lcyA9IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGEubm9kZU5hbWUgPT09IGIubm9kZU5hbWUgJiYgYS5uYW1lc3BhY2VVUkkgPT09IGIubmFtZXNwYWNlVVJJO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYW4gZWxlbWVudCwgb3B0aW9uYWxseSB3aXRoIGEga25vd24gbmFtZXNwYWNlIFVSSS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSB0aGUgZWxlbWVudCBuYW1lLCBlLmcuICdkaXYnIG9yICdzdmcnXG4gKiBAcGFyYW0ge3N0cmluZ30gW25hbWVzcGFjZVVSSV0gdGhlIGVsZW1lbnQncyBuYW1lc3BhY2UgVVJJLCBpLmUuIHRoZSB2YWx1ZSBvZlxuICogaXRzIGB4bWxuc2AgYXR0cmlidXRlIG9yIGl0cyBpbmZlcnJlZCBuYW1lc3BhY2UuXG4gKlxuICogQHJldHVybiB7RWxlbWVudH1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlRWxlbWVudE5TKG5hbWUsIG5hbWVzcGFjZVVSSSkge1xuICAgIHJldHVybiAhbmFtZXNwYWNlVVJJIHx8IG5hbWVzcGFjZVVSSSA9PT0gWEhUTUwgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUpIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKG5hbWVzcGFjZVVSSSwgbmFtZSk7XG59XG5cbi8qKlxuICogTG9vcCBvdmVyIGFsbCBvZiB0aGUgYXR0cmlidXRlcyBvbiB0aGUgdGFyZ2V0IG5vZGUgYW5kIG1ha2Ugc3VyZSB0aGUgb3JpZ2luYWxcbiAqIERPTSBub2RlIGhhcyB0aGUgc2FtZSBhdHRyaWJ1dGVzLiBJZiBhbiBhdHRyaWJ1dGUgZm91bmQgb24gdGhlIG9yaWdpbmFsIG5vZGVcbiAqIGlzIG5vdCBvbiB0aGUgbmV3IG5vZGUgdGhlbiByZW1vdmUgaXQgZnJvbSB0aGUgb3JpZ2luYWwgbm9kZS5cbiAqXG4gKiBAcGFyYW0gIHtFbGVtZW50fSBmcm9tTm9kZVxuICogQHBhcmFtICB7RWxlbWVudH0gdG9Ob2RlXG4gKi9cbmZ1bmN0aW9uIG1vcnBoQXR0cnMoZnJvbU5vZGUsIHRvTm9kZSkge1xuICAgIHZhciBhdHRycyA9IHRvTm9kZS5hdHRyaWJ1dGVzO1xuICAgIHZhciBpO1xuICAgIHZhciBhdHRyO1xuICAgIHZhciBhdHRyTmFtZTtcbiAgICB2YXIgYXR0ck5hbWVzcGFjZVVSSTtcbiAgICB2YXIgYXR0clZhbHVlO1xuICAgIHZhciBmcm9tVmFsdWU7XG5cbiAgICBmb3IgKGkgPSBhdHRycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBhdHRyID0gYXR0cnNbaV07XG4gICAgICAgIGF0dHJOYW1lID0gYXR0ci5uYW1lO1xuICAgICAgICBhdHRyVmFsdWUgPSBhdHRyLnZhbHVlO1xuICAgICAgICBhdHRyTmFtZXNwYWNlVVJJID0gYXR0ci5uYW1lc3BhY2VVUkk7XG5cbiAgICAgICAgaWYgKGF0dHJOYW1lc3BhY2VVUkkpIHtcbiAgICAgICAgICAgIGF0dHJOYW1lID0gYXR0ci5sb2NhbE5hbWUgfHwgYXR0ck5hbWU7XG4gICAgICAgICAgICBmcm9tVmFsdWUgPSBmcm9tTm9kZS5nZXRBdHRyaWJ1dGVOUyhhdHRyTmFtZXNwYWNlVVJJLCBhdHRyTmFtZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmcm9tVmFsdWUgPSBmcm9tTm9kZS5nZXRBdHRyaWJ1dGUoYXR0ck5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZyb21WYWx1ZSAhPT0gYXR0clZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoYXR0ck5hbWVzcGFjZVVSSSkge1xuICAgICAgICAgICAgICAgIGZyb21Ob2RlLnNldEF0dHJpYnV0ZU5TKGF0dHJOYW1lc3BhY2VVUkksIGF0dHJOYW1lLCBhdHRyVmFsdWUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmcm9tTm9kZS5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJWYWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgYW55IGV4dHJhIGF0dHJpYnV0ZXMgZm91bmQgb24gdGhlIG9yaWdpbmFsIERPTSBlbGVtZW50IHRoYXRcbiAgICAvLyB3ZXJlbid0IGZvdW5kIG9uIHRoZSB0YXJnZXQgZWxlbWVudC5cbiAgICBhdHRycyA9IGZyb21Ob2RlLmF0dHJpYnV0ZXM7XG5cbiAgICBmb3IgKGkgPSBhdHRycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBhdHRyID0gYXR0cnNbaV07XG4gICAgICAgIGlmIChhdHRyLnNwZWNpZmllZCAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGF0dHJOYW1lID0gYXR0ci5uYW1lO1xuICAgICAgICAgICAgYXR0ck5hbWVzcGFjZVVSSSA9IGF0dHIubmFtZXNwYWNlVVJJO1xuXG4gICAgICAgICAgICBpZiAoIWhhc0F0dHJpYnV0ZU5TKHRvTm9kZSwgYXR0ck5hbWVzcGFjZVVSSSwgYXR0ck5hbWVzcGFjZVVSSSA/IGF0dHJOYW1lID0gYXR0ci5sb2NhbE5hbWUgfHwgYXR0ck5hbWUgOiBhdHRyTmFtZSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXR0ck5hbWVzcGFjZVVSSSkge1xuICAgICAgICAgICAgICAgICAgICBmcm9tTm9kZS5yZW1vdmVBdHRyaWJ1dGVOUyhhdHRyTmFtZXNwYWNlVVJJLCBhdHRyLmxvY2FsTmFtZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbU5vZGUucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogQ29waWVzIHRoZSBjaGlsZHJlbiBvZiBvbmUgRE9NIGVsZW1lbnQgdG8gYW5vdGhlciBET00gZWxlbWVudFxuICovXG5mdW5jdGlvbiBtb3ZlQ2hpbGRyZW4oZnJvbUVsLCB0b0VsKSB7XG4gICAgdmFyIGN1ckNoaWxkID0gZnJvbUVsLmZpcnN0Q2hpbGQ7XG4gICAgd2hpbGUgKGN1ckNoaWxkKSB7XG4gICAgICAgIHZhciBuZXh0Q2hpbGQgPSBjdXJDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgdG9FbC5hcHBlbmRDaGlsZChjdXJDaGlsZCk7XG4gICAgICAgIGN1ckNoaWxkID0gbmV4dENoaWxkO1xuICAgIH1cbiAgICByZXR1cm4gdG9FbDtcbn1cblxuZnVuY3Rpb24gZGVmYXVsdEdldE5vZGVLZXkobm9kZSkge1xuICAgIHJldHVybiBub2RlLmlkO1xufVxuXG5mdW5jdGlvbiBtb3JwaGRvbShmcm9tTm9kZSwgdG9Ob2RlLCBvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHRvTm9kZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKGZyb21Ob2RlLm5vZGVOYW1lID09PSAnI2RvY3VtZW50JyB8fCBmcm9tTm9kZS5ub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgICAgICAgICB2YXIgdG9Ob2RlSHRtbCA9IHRvTm9kZTtcbiAgICAgICAgICAgIHRvTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2h0bWwnKTtcbiAgICAgICAgICAgIHRvTm9kZS5pbm5lckhUTUwgPSB0b05vZGVIdG1sO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9Ob2RlID0gdG9FbGVtZW50KHRvTm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBYWFggb3B0aW1pemF0aW9uOiBpZiB0aGUgbm9kZXMgYXJlIGVxdWFsLCBkb24ndCBtb3JwaCB0aGVtXG4gICAgLypcbiAgICBpZiAoZnJvbU5vZGUuaXNFcXVhbE5vZGUodG9Ob2RlKSkge1xuICAgICAgcmV0dXJuIGZyb21Ob2RlO1xuICAgIH1cbiAgICAqL1xuXG4gICAgdmFyIHNhdmVkRWxzID0ge307IC8vIFVzZWQgdG8gc2F2ZSBvZmYgRE9NIGVsZW1lbnRzIHdpdGggSURzXG4gICAgdmFyIHVubWF0Y2hlZEVscyA9IHt9O1xuICAgIHZhciBnZXROb2RlS2V5ID0gb3B0aW9ucy5nZXROb2RlS2V5IHx8IGRlZmF1bHRHZXROb2RlS2V5O1xuICAgIHZhciBvbkJlZm9yZU5vZGVBZGRlZCA9IG9wdGlvbnMub25CZWZvcmVOb2RlQWRkZWQgfHwgbm9vcDtcbiAgICB2YXIgb25Ob2RlQWRkZWQgPSBvcHRpb25zLm9uTm9kZUFkZGVkIHx8IG5vb3A7XG4gICAgdmFyIG9uQmVmb3JlRWxVcGRhdGVkID0gb3B0aW9ucy5vbkJlZm9yZUVsVXBkYXRlZCB8fCBvcHRpb25zLm9uQmVmb3JlTW9ycGhFbCB8fCBub29wO1xuICAgIHZhciBvbkVsVXBkYXRlZCA9IG9wdGlvbnMub25FbFVwZGF0ZWQgfHwgbm9vcDtcbiAgICB2YXIgb25CZWZvcmVOb2RlRGlzY2FyZGVkID0gb3B0aW9ucy5vbkJlZm9yZU5vZGVEaXNjYXJkZWQgfHwgbm9vcDtcbiAgICB2YXIgb25Ob2RlRGlzY2FyZGVkID0gb3B0aW9ucy5vbk5vZGVEaXNjYXJkZWQgfHwgbm9vcDtcbiAgICB2YXIgb25CZWZvcmVFbENoaWxkcmVuVXBkYXRlZCA9IG9wdGlvbnMub25CZWZvcmVFbENoaWxkcmVuVXBkYXRlZCB8fCBvcHRpb25zLm9uQmVmb3JlTW9ycGhFbENoaWxkcmVuIHx8IG5vb3A7XG4gICAgdmFyIGNoaWxkcmVuT25seSA9IG9wdGlvbnMuY2hpbGRyZW5Pbmx5ID09PSB0cnVlO1xuICAgIHZhciBtb3ZlZEVscyA9IFtdO1xuXG4gICAgZnVuY3Rpb24gcmVtb3ZlTm9kZUhlbHBlcihub2RlLCBuZXN0ZWRJblNhdmVkRWwpIHtcbiAgICAgICAgdmFyIGlkID0gZ2V0Tm9kZUtleShub2RlKTtcbiAgICAgICAgLy8gSWYgdGhlIG5vZGUgaGFzIGFuIElEIHRoZW4gc2F2ZSBpdCBvZmYgc2luY2Ugd2Ugd2lsbCB3YW50XG4gICAgICAgIC8vIHRvIHJldXNlIGl0IGluIGNhc2UgdGhlIHRhcmdldCBET00gdHJlZSBoYXMgYSBET00gZWxlbWVudFxuICAgICAgICAvLyB3aXRoIHRoZSBzYW1lIElEXG4gICAgICAgIGlmIChpZCkge1xuICAgICAgICAgICAgc2F2ZWRFbHNbaWRdID0gbm9kZTtcbiAgICAgICAgfSBlbHNlIGlmICghbmVzdGVkSW5TYXZlZEVsKSB7XG4gICAgICAgICAgICAvLyBJZiB3ZSBhcmUgbm90IG5lc3RlZCBpbiBhIHNhdmVkIGVsZW1lbnQgdGhlbiB3ZSBrbm93IHRoYXQgdGhpcyBub2RlIGhhcyBiZWVuXG4gICAgICAgICAgICAvLyBjb21wbGV0ZWx5IGRpc2NhcmRlZCBhbmQgd2lsbCBub3QgZXhpc3QgaW4gdGhlIGZpbmFsIERPTS5cbiAgICAgICAgICAgIG9uTm9kZURpc2NhcmRlZChub2RlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgIHZhciBjdXJDaGlsZCA9IG5vZGUuZmlyc3RDaGlsZDtcbiAgICAgICAgICAgIHdoaWxlIChjdXJDaGlsZCkge1xuICAgICAgICAgICAgICAgIHJlbW92ZU5vZGVIZWxwZXIoY3VyQ2hpbGQsIG5lc3RlZEluU2F2ZWRFbCB8fCBpZCk7XG4gICAgICAgICAgICAgICAgY3VyQ2hpbGQgPSBjdXJDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdhbGtEaXNjYXJkZWRDaGlsZE5vZGVzKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgdmFyIGN1ckNoaWxkID0gbm9kZS5maXJzdENoaWxkO1xuICAgICAgICAgICAgd2hpbGUgKGN1ckNoaWxkKSB7XG5cbiAgICAgICAgICAgICAgICBpZiAoIWdldE5vZGVLZXkoY3VyQ2hpbGQpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIG9ubHkgd2FudCB0byBoYW5kbGUgbm9kZXMgdGhhdCBkb24ndCBoYXZlIGFuIElEIHRvIGF2b2lkIGRvdWJsZVxuICAgICAgICAgICAgICAgICAgICAvLyB3YWxraW5nIHRoZSBzYW1lIHNhdmVkIGVsZW1lbnQuXG5cbiAgICAgICAgICAgICAgICAgICAgb25Ob2RlRGlzY2FyZGVkKGN1ckNoaWxkKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBXYWxrIHJlY3Vyc2l2ZWx5XG4gICAgICAgICAgICAgICAgICAgIHdhbGtEaXNjYXJkZWRDaGlsZE5vZGVzKGN1ckNoaWxkKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjdXJDaGlsZCA9IGN1ckNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlTm9kZShub2RlLCBwYXJlbnROb2RlLCBhbHJlYWR5VmlzaXRlZCkge1xuICAgICAgICBpZiAob25CZWZvcmVOb2RlRGlzY2FyZGVkKG5vZGUpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICAgICAgaWYgKGFscmVhZHlWaXNpdGVkKSB7XG4gICAgICAgICAgICBpZiAoIWdldE5vZGVLZXkobm9kZSkpIHtcbiAgICAgICAgICAgICAgICBvbk5vZGVEaXNjYXJkZWQobm9kZSk7XG4gICAgICAgICAgICAgICAgd2Fsa0Rpc2NhcmRlZENoaWxkTm9kZXMobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZW1vdmVOb2RlSGVscGVyKG5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW9ycGhFbChmcm9tRWwsIHRvRWwsIGFscmVhZHlWaXNpdGVkLCBjaGlsZHJlbk9ubHkpIHtcbiAgICAgICAgdmFyIHRvRWxLZXkgPSBnZXROb2RlS2V5KHRvRWwpO1xuICAgICAgICBpZiAodG9FbEtleSkge1xuICAgICAgICAgICAgLy8gSWYgYW4gZWxlbWVudCB3aXRoIGFuIElEIGlzIGJlaW5nIG1vcnBoZWQgdGhlbiBpdCBpcyB3aWxsIGJlIGluIHRoZSBmaW5hbFxuICAgICAgICAgICAgLy8gRE9NIHNvIGNsZWFyIGl0IG91dCBvZiB0aGUgc2F2ZWQgZWxlbWVudHMgY29sbGVjdGlvblxuICAgICAgICAgICAgZGVsZXRlIHNhdmVkRWxzW3RvRWxLZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjaGlsZHJlbk9ubHkpIHtcbiAgICAgICAgICAgIGlmIChvbkJlZm9yZUVsVXBkYXRlZChmcm9tRWwsIHRvRWwpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbW9ycGhBdHRycyhmcm9tRWwsIHRvRWwpO1xuICAgICAgICAgICAgb25FbFVwZGF0ZWQoZnJvbUVsKTtcblxuICAgICAgICAgICAgaWYgKG9uQmVmb3JlRWxDaGlsZHJlblVwZGF0ZWQoZnJvbUVsLCB0b0VsKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZnJvbUVsLm5vZGVOYW1lICE9PSAnVEVYVEFSRUEnKSB7XG4gICAgICAgICAgICB2YXIgY3VyVG9Ob2RlQ2hpbGQgPSB0b0VsLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICB2YXIgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21FbC5maXJzdENoaWxkO1xuICAgICAgICAgICAgdmFyIGN1clRvTm9kZUlkO1xuXG4gICAgICAgICAgICB2YXIgZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgdmFyIHRvTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICB2YXIgc2F2ZWRFbDtcbiAgICAgICAgICAgIHZhciB1bm1hdGNoZWRFbDtcblxuICAgICAgICAgICAgb3V0ZXI6IHdoaWxlIChjdXJUb05vZGVDaGlsZCkge1xuICAgICAgICAgICAgICAgIHRvTmV4dFNpYmxpbmcgPSBjdXJUb05vZGVDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgICBjdXJUb05vZGVJZCA9IGdldE5vZGVLZXkoY3VyVG9Ob2RlQ2hpbGQpO1xuXG4gICAgICAgICAgICAgICAgd2hpbGUgKGN1ckZyb21Ob2RlQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1ckZyb21Ob2RlSWQgPSBnZXROb2RlS2V5KGN1ckZyb21Ob2RlQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBmcm9tTmV4dFNpYmxpbmcgPSBjdXJGcm9tTm9kZUNoaWxkLm5leHRTaWJsaW5nO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICghYWxyZWFkeVZpc2l0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJGcm9tTm9kZUlkICYmICh1bm1hdGNoZWRFbCA9IHVubWF0Y2hlZEVsc1tjdXJGcm9tTm9kZUlkXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bm1hdGNoZWRFbC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChjdXJGcm9tTm9kZUNoaWxkLCB1bm1hdGNoZWRFbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9ycGhFbChjdXJGcm9tTm9kZUNoaWxkLCB1bm1hdGNoZWRFbCwgYWxyZWFkeVZpc2l0ZWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB2YXIgY3VyRnJvbU5vZGVUeXBlID0gY3VyRnJvbU5vZGVDaGlsZC5ub2RlVHlwZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VyRnJvbU5vZGVUeXBlID09PSBjdXJUb05vZGVDaGlsZC5ub2RlVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlzQ29tcGF0aWJsZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBCb3RoIG5vZGVzIGJlaW5nIGNvbXBhcmVkIGFyZSBFbGVtZW50IG5vZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyRnJvbU5vZGVUeXBlID09PSBFTEVNRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tcGFyZU5vZGVOYW1lcyhjdXJGcm9tTm9kZUNoaWxkLCBjdXJUb05vZGVDaGlsZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgaGF2ZSBjb21wYXRpYmxlIERPTSBlbGVtZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyRnJvbU5vZGVJZCB8fCBjdXJUb05vZGVJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gSWYgZWl0aGVyIERPTSBlbGVtZW50IGhhcyBhbiBJRCB0aGVuIHdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBoYW5kbGUgdGhvc2UgZGlmZmVyZW50bHkgc2luY2Ugd2Ugd2FudCB0b1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbWF0Y2ggdXAgYnkgSURcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJUb05vZGVJZCA9PT0gY3VyRnJvbU5vZGVJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGF0aWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBhdGlibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzQ29tcGF0aWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBmb3VuZCBjb21wYXRpYmxlIERPTSBlbGVtZW50cyBzbyB0cmFuc2Zvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGN1cnJlbnQgXCJmcm9tXCIgbm9kZSB0byBtYXRjaCB0aGUgY3VycmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0YXJnZXQgRE9NIG5vZGUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vcnBoRWwoY3VyRnJvbU5vZGVDaGlsZCwgY3VyVG9Ob2RlQ2hpbGQsIGFscmVhZHlWaXNpdGVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQm90aCBub2RlcyBiZWluZyBjb21wYXJlZCBhcmUgVGV4dCBvciBDb21tZW50IG5vZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGN1ckZyb21Ob2RlVHlwZSA9PT0gVEVYVF9OT0RFIHx8IGN1ckZyb21Ob2RlVHlwZSA9PSBDT01NRU5UX05PREUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc0NvbXBhdGlibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNpbXBseSB1cGRhdGUgbm9kZVZhbHVlIG9uIHRoZSBvcmlnaW5hbCBub2RlIHRvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2hhbmdlIHRoZSB0ZXh0IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZC5ub2RlVmFsdWUgPSBjdXJUb05vZGVDaGlsZC5ub2RlVmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0NvbXBhdGlibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJUb05vZGVDaGlsZCA9IHRvTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZSBvdXRlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIE5vIGNvbXBhdGlibGUgbWF0Y2ggc28gcmVtb3ZlIHRoZSBvbGQgbm9kZSBmcm9tIHRoZSBET01cbiAgICAgICAgICAgICAgICAgICAgLy8gYW5kIGNvbnRpbnVlIHRyeWluZyB0byBmaW5kIGEgbWF0Y2ggaW4gdGhlIG9yaWdpbmFsIERPTVxuICAgICAgICAgICAgICAgICAgICByZW1vdmVOb2RlKGN1ckZyb21Ob2RlQ2hpbGQsIGZyb21FbCwgYWxyZWFkeVZpc2l0ZWQpO1xuICAgICAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjdXJUb05vZGVJZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2F2ZWRFbCA9IHNhdmVkRWxzW2N1clRvTm9kZUlkXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbXBhcmVOb2RlTmFtZXMoc2F2ZWRFbCwgY3VyVG9Ob2RlQ2hpbGQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9ycGhFbChzYXZlZEVsLCBjdXJUb05vZGVDaGlsZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2Ugd2FudCB0byBhcHBlbmQgdGhlIHNhdmVkIGVsZW1lbnQgaW5zdGVhZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1clRvTm9kZUNoaWxkID0gc2F2ZWRFbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHNhdmVkRWxzW2N1clRvTm9kZUlkXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbk5vZGVEaXNjYXJkZWQoc2F2ZWRFbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgY3VycmVudCBET00gZWxlbWVudCBpbiB0aGUgdGFyZ2V0IHRyZWUgaGFzIGFuIElEXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBidXQgd2UgZGlkIG5vdCBmaW5kIGEgbWF0Y2ggaW4gYW55IG9mIHRoZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29ycmVzcG9uZGluZyBzaWJsaW5ncy4gV2UganVzdCBwdXQgdGhlIHRhcmdldFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZWxlbWVudCBpbiB0aGUgb2xkIERPTSB0cmVlIGJ1dCBpZiB3ZSBsYXRlciBmaW5kIGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBlbGVtZW50IGluIHRoZSBvbGQgRE9NIHRyZWUgdGhhdCBoYXMgYSBtYXRjaGluZyBJRFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlbiB3ZSB3aWxsIHJlcGxhY2UgdGhlIHRhcmdldCBlbGVtZW50IHdpdGggdGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb3JyZXNwb25kaW5nIG9sZCBlbGVtZW50IGFuZCBtb3JwaCB0aGUgb2xkIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIHVubWF0Y2hlZEVsc1tjdXJUb05vZGVJZF0gPSBjdXJUb05vZGVDaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIElmIHdlIGdvdCB0aGlzIGZhciB0aGVuIHdlIGRpZCBub3QgZmluZCBhIGNhbmRpZGF0ZSBtYXRjaCBmb3JcbiAgICAgICAgICAgICAgICAvLyBvdXIgXCJ0byBub2RlXCIgYW5kIHdlIGV4aGF1c3RlZCBhbGwgb2YgdGhlIGNoaWxkcmVuIFwiZnJvbVwiXG4gICAgICAgICAgICAgICAgLy8gbm9kZXMuIFRoZXJlZm9yZSwgd2Ugd2lsbCBqdXN0IGFwcGVuZCB0aGUgY3VycmVudCBcInRvIG5vZGVcIlxuICAgICAgICAgICAgICAgIC8vIHRvIHRoZSBlbmRcbiAgICAgICAgICAgICAgICBpZiAob25CZWZvcmVOb2RlQWRkZWQoY3VyVG9Ob2RlQ2hpbGQpICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBmcm9tRWwuYXBwZW5kQ2hpbGQoY3VyVG9Ob2RlQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBvbk5vZGVBZGRlZChjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGN1clRvTm9kZUNoaWxkLm5vZGVUeXBlID09PSBFTEVNRU5UX05PREUgJiYgKGN1clRvTm9kZUlkIHx8IGN1clRvTm9kZUNoaWxkLmZpcnN0Q2hpbGQpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBlbGVtZW50IHRoYXQgd2FzIGp1c3QgYWRkZWQgdG8gdGhlIG9yaWdpbmFsIERPTSBtYXlcbiAgICAgICAgICAgICAgICAgICAgLy8gaGF2ZSBzb21lIG5lc3RlZCBlbGVtZW50cyB3aXRoIGEga2V5L0lEIHRoYXQgbmVlZHMgdG8gYmVcbiAgICAgICAgICAgICAgICAgICAgLy8gbWF0Y2hlZCB1cCB3aXRoIG90aGVyIGVsZW1lbnRzLiBXZSdsbCBhZGQgdGhlIGVsZW1lbnQgdG9cbiAgICAgICAgICAgICAgICAgICAgLy8gYSBsaXN0IHNvIHRoYXQgd2UgY2FuIGxhdGVyIHByb2Nlc3MgdGhlIG5lc3RlZCBlbGVtZW50c1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0aGVyZSBhcmUgYW55IHVubWF0Y2hlZCBrZXllZCBlbGVtZW50cyB0aGF0IHdlcmVcbiAgICAgICAgICAgICAgICAgICAgLy8gZGlzY2FyZGVkXG4gICAgICAgICAgICAgICAgICAgIG1vdmVkRWxzLnB1c2goY3VyVG9Ob2RlQ2hpbGQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGN1clRvTm9kZUNoaWxkID0gdG9OZXh0U2libGluZztcbiAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBXZSBoYXZlIHByb2Nlc3NlZCBhbGwgb2YgdGhlIFwidG8gbm9kZXNcIi4gSWYgY3VyRnJvbU5vZGVDaGlsZCBpc1xuICAgICAgICAgICAgLy8gbm9uLW51bGwgdGhlbiB3ZSBzdGlsbCBoYXZlIHNvbWUgZnJvbSBub2RlcyBsZWZ0IG92ZXIgdGhhdCBuZWVkXG4gICAgICAgICAgICAvLyB0byBiZSByZW1vdmVkXG4gICAgICAgICAgICB3aGlsZSAoY3VyRnJvbU5vZGVDaGlsZCkge1xuICAgICAgICAgICAgICAgIGZyb21OZXh0U2libGluZyA9IGN1ckZyb21Ob2RlQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgcmVtb3ZlTm9kZShjdXJGcm9tTm9kZUNoaWxkLCBmcm9tRWwsIGFscmVhZHlWaXNpdGVkKTtcbiAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNwZWNpYWxFbEhhbmRsZXIgPSBzcGVjaWFsRWxIYW5kbGVyc1tmcm9tRWwubm9kZU5hbWVdO1xuICAgICAgICBpZiAoc3BlY2lhbEVsSGFuZGxlcikge1xuICAgICAgICAgICAgc3BlY2lhbEVsSGFuZGxlcihmcm9tRWwsIHRvRWwpO1xuICAgICAgICB9XG4gICAgfSAvLyBFTkQ6IG1vcnBoRWwoLi4uKVxuXG4gICAgdmFyIG1vcnBoZWROb2RlID0gZnJvbU5vZGU7XG4gICAgdmFyIG1vcnBoZWROb2RlVHlwZSA9IG1vcnBoZWROb2RlLm5vZGVUeXBlO1xuICAgIHZhciB0b05vZGVUeXBlID0gdG9Ob2RlLm5vZGVUeXBlO1xuXG4gICAgaWYgKCFjaGlsZHJlbk9ubHkpIHtcbiAgICAgICAgLy8gSGFuZGxlIHRoZSBjYXNlIHdoZXJlIHdlIGFyZSBnaXZlbiB0d28gRE9NIG5vZGVzIHRoYXQgYXJlIG5vdFxuICAgICAgICAvLyBjb21wYXRpYmxlIChlLmcuIDxkaXY+IC0tPiA8c3Bhbj4gb3IgPGRpdj4gLS0+IFRFWFQpXG4gICAgICAgIGlmIChtb3JwaGVkTm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgaWYgKHRvTm9kZVR5cGUgPT09IEVMRU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgICAgIGlmICghY29tcGFyZU5vZGVOYW1lcyhmcm9tTm9kZSwgdG9Ob2RlKSkge1xuICAgICAgICAgICAgICAgICAgICBvbk5vZGVEaXNjYXJkZWQoZnJvbU5vZGUpO1xuICAgICAgICAgICAgICAgICAgICBtb3JwaGVkTm9kZSA9IG1vdmVDaGlsZHJlbihmcm9tTm9kZSwgY3JlYXRlRWxlbWVudE5TKHRvTm9kZS5ub2RlTmFtZSwgdG9Ob2RlLm5hbWVzcGFjZVVSSSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gR29pbmcgZnJvbSBhbiBlbGVtZW50IG5vZGUgdG8gYSB0ZXh0IG5vZGVcbiAgICAgICAgICAgICAgICBtb3JwaGVkTm9kZSA9IHRvTm9kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChtb3JwaGVkTm9kZVR5cGUgPT09IFRFWFRfTk9ERSB8fCBtb3JwaGVkTm9kZVR5cGUgPT09IENPTU1FTlRfTk9ERSkge1xuICAgICAgICAgICAgLy8gVGV4dCBvciBjb21tZW50IG5vZGVcbiAgICAgICAgICAgIGlmICh0b05vZGVUeXBlID09PSBtb3JwaGVkTm9kZVR5cGUpIHtcbiAgICAgICAgICAgICAgICBtb3JwaGVkTm9kZS5ub2RlVmFsdWUgPSB0b05vZGUubm9kZVZhbHVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBtb3JwaGVkTm9kZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gVGV4dCBub2RlIHRvIHNvbWV0aGluZyBlbHNlXG4gICAgICAgICAgICAgICAgbW9ycGhlZE5vZGUgPSB0b05vZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAobW9ycGhlZE5vZGUgPT09IHRvTm9kZSkge1xuICAgICAgICAvLyBUaGUgXCJ0byBub2RlXCIgd2FzIG5vdCBjb21wYXRpYmxlIHdpdGggdGhlIFwiZnJvbSBub2RlXCIgc28gd2UgaGFkIHRvXG4gICAgICAgIC8vIHRvc3Mgb3V0IHRoZSBcImZyb20gbm9kZVwiIGFuZCB1c2UgdGhlIFwidG8gbm9kZVwiXG4gICAgICAgIG9uTm9kZURpc2NhcmRlZChmcm9tTm9kZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbW9ycGhFbChtb3JwaGVkTm9kZSwgdG9Ob2RlLCBmYWxzZSwgY2hpbGRyZW5Pbmx5KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogV2hhdCB3ZSB3aWxsIGRvIGhlcmUgaXMgd2FsayB0aGUgdHJlZSBmb3IgdGhlIERPTSBlbGVtZW50IHRoYXQgd2FzXG4gICAgICAgICAqIG1vdmVkIGZyb20gdGhlIHRhcmdldCBET00gdHJlZSB0byB0aGUgb3JpZ2luYWwgRE9NIHRyZWUgYW5kIHdlIHdpbGxcbiAgICAgICAgICogbG9vayBmb3Iga2V5ZWQgZWxlbWVudHMgdGhhdCBjb3VsZCBiZSBtYXRjaGVkIHRvIGtleWVkIGVsZW1lbnRzIHRoYXRcbiAgICAgICAgICogd2VyZSBlYXJsaWVyIGRpc2NhcmRlZC4gIElmIHdlIGZpbmQgYSBtYXRjaCB0aGVuIHdlIHdpbGwgbW92ZSB0aGVcbiAgICAgICAgICogc2F2ZWQgZWxlbWVudCBpbnRvIHRoZSBmaW5hbCBET00gdHJlZS5cbiAgICAgICAgICovXG4gICAgICAgIHZhciBoYW5kbGVNb3ZlZEVsID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICB2YXIgY3VyQ2hpbGQgPSBlbC5maXJzdENoaWxkO1xuICAgICAgICAgICAgd2hpbGUgKGN1ckNoaWxkKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5leHRTaWJsaW5nID0gY3VyQ2hpbGQubmV4dFNpYmxpbmc7XG5cbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gZ2V0Tm9kZUtleShjdXJDaGlsZCk7XG4gICAgICAgICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2F2ZWRFbCA9IHNhdmVkRWxzW2tleV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChzYXZlZEVsICYmIGNvbXBhcmVOb2RlTmFtZXMoY3VyQ2hpbGQsIHNhdmVkRWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJDaGlsZC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChzYXZlZEVsLCBjdXJDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0cnVlOiBhbHJlYWR5IHZpc2l0ZWQgdGhlIHNhdmVkIGVsIHRyZWVcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vcnBoRWwoc2F2ZWRFbCwgY3VyQ2hpbGQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VyQ2hpbGQgPSBuZXh0U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbXB0eShzYXZlZEVscykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjdXJDaGlsZC5ub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZU1vdmVkRWwoY3VyQ2hpbGQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGN1ckNoaWxkID0gbmV4dFNpYmxpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gVGhlIGxvb3AgYmVsb3cgaXMgdXNlZCB0byBwb3NzaWJseSBtYXRjaCB1cCBhbnkgZGlzY2FyZGVkXG4gICAgICAgIC8vIGVsZW1lbnRzIGluIHRoZSBvcmlnaW5hbCBET00gdHJlZSB3aXRoIGVsZW1lbmV0cyBmcm9tIHRoZVxuICAgICAgICAvLyB0YXJnZXQgdHJlZSB0aGF0IHdlcmUgbW92ZWQgb3ZlciB3aXRob3V0IHZpc2l0aW5nIHRoZWlyXG4gICAgICAgIC8vIGNoaWxkcmVuXG4gICAgICAgIGlmICghZW1wdHkoc2F2ZWRFbHMpKSB7XG4gICAgICAgICAgICBoYW5kbGVNb3ZlZEVsc0xvb3A6IHdoaWxlIChtb3ZlZEVscy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgbW92ZWRFbHNUZW1wID0gbW92ZWRFbHM7XG4gICAgICAgICAgICAgICAgbW92ZWRFbHMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1vdmVkRWxzVGVtcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaGFuZGxlTW92ZWRFbChtb3ZlZEVsc1RlbXBbaV0pID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlcmUgYXJlIG5vIG1vcmUgdW5tYXRjaGVkIGVsZW1lbnRzIHNvIGNvbXBsZXRlbHkgZW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgbG9vcFxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgaGFuZGxlTW92ZWRFbHNMb29wO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmlyZSB0aGUgXCJvbk5vZGVEaXNjYXJkZWRcIiBldmVudCBmb3IgYW55IHNhdmVkIGVsZW1lbnRzXG4gICAgICAgIC8vIHRoYXQgbmV2ZXIgZm91bmQgYSBuZXcgaG9tZSBpbiB0aGUgbW9ycGhlZCBET01cbiAgICAgICAgZm9yICh2YXIgc2F2ZWRFbElkIGluIHNhdmVkRWxzKSB7XG4gICAgICAgICAgICBpZiAoc2F2ZWRFbHMuaGFzT3duUHJvcGVydHkoc2F2ZWRFbElkKSkge1xuICAgICAgICAgICAgICAgIHZhciBzYXZlZEVsID0gc2F2ZWRFbHNbc2F2ZWRFbElkXTtcbiAgICAgICAgICAgICAgICBvbk5vZGVEaXNjYXJkZWQoc2F2ZWRFbCk7XG4gICAgICAgICAgICAgICAgd2Fsa0Rpc2NhcmRlZENoaWxkTm9kZXMoc2F2ZWRFbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWNoaWxkcmVuT25seSAmJiBtb3JwaGVkTm9kZSAhPT0gZnJvbU5vZGUgJiYgZnJvbU5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgICAvLyBJZiB3ZSBoYWQgdG8gc3dhcCBvdXQgdGhlIGZyb20gbm9kZSB3aXRoIGEgbmV3IG5vZGUgYmVjYXVzZSB0aGUgb2xkXG4gICAgICAgIC8vIG5vZGUgd2FzIG5vdCBjb21wYXRpYmxlIHdpdGggdGhlIHRhcmdldCBub2RlIHRoZW4gd2UgbmVlZCB0b1xuICAgICAgICAvLyByZXBsYWNlIHRoZSBvbGQgRE9NIG5vZGUgaW4gdGhlIG9yaWdpbmFsIERPTSB0cmVlLiBUaGlzIGlzIG9ubHlcbiAgICAgICAgLy8gcG9zc2libGUgaWYgdGhlIG9yaWdpbmFsIERPTSBub2RlIHdhcyBwYXJ0IG9mIGEgRE9NIHRyZWUgd2hpY2hcbiAgICAgICAgLy8gd2Uga25vdyBpcyB0aGUgY2FzZSBpZiBpdCBoYXMgYSBwYXJlbnQgbm9kZS5cbiAgICAgICAgZnJvbU5vZGUucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobW9ycGhlZE5vZGUsIGZyb21Ob2RlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbW9ycGhlZE5vZGU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbW9ycGhkb207XG59LHt9XSwxMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgd2luZG93ID0gcmVxdWlyZSgnZ2xvYmFsL3dpbmRvdycpO1xudmFyIGFzc2VydCA9IHJlcXVpcmUoJ2Fzc2VydCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5hbm9yYWY7XG5cbi8vIE9ubHkgY2FsbCBSQUYgd2hlbiBuZWVkZWRcbi8vIChmbiwgZm4/KSAtPiBmblxuZnVuY3Rpb24gbmFub3JhZihyZW5kZXIsIHJhZikge1xuICBhc3NlcnQuZXF1YWwodHlwZW9mIHJlbmRlciwgJ2Z1bmN0aW9uJywgJ25hbm9yYWY6IHJlbmRlciBzaG91bGQgYmUgYSBmdW5jdGlvbicpO1xuICBhc3NlcnQub2sodHlwZW9mIHJhZiA9PT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgcmFmID09PSAndW5kZWZpbmVkJywgJ25hbm9yYWY6IHJhZiBzaG91bGQgYmUgYSBmdW5jdGlvbiBvciB1bmRlZmluZWQnKTtcblxuICBpZiAoIXJhZikge1xuICAgIHJhZiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG4gIH1cblxuICB2YXIgaW5SZW5kZXJpbmdUcmFuc2FjdGlvbiA9IGZhbHNlO1xuICB2YXIgcmVkcmF3U2NoZWR1bGVkID0gZmFsc2U7XG4gIHZhciBjdXJyZW50U3RhdGUgPSBudWxsO1xuXG4gIC8vIHBhc3MgbmV3IHN0YXRlIHRvIGJlIHJlbmRlcmVkXG4gIC8vIChvYmosIG9iaj8pIC0+IG51bGxcbiAgcmV0dXJuIGZ1bmN0aW9uIGZyYW1lKHN0YXRlLCBwcmV2KSB7XG4gICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBzdGF0ZSwgJ29iamVjdCcsICduYW5vcmFmOiBzdGF0ZSBzaG91bGQgYmUgYW4gb2JqZWN0Jyk7XG4gICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBwcmV2LCAnb2JqZWN0JywgJ25hbm9yYWY6IHByZXYgc2hvdWxkIGJlIGFuIG9iamVjdCcpO1xuICAgIGFzc2VydC5lcXVhbChpblJlbmRlcmluZ1RyYW5zYWN0aW9uLCBmYWxzZSwgJ25hbm9yYWY6IGluZmluaXRlIGxvb3AgZGV0ZWN0ZWQnKTtcblxuICAgIC8vIHJlcXVlc3QgYSByZWRyYXcgZm9yIG5leHQgZnJhbWVcbiAgICBpZiAoY3VycmVudFN0YXRlID09PSBudWxsICYmICFyZWRyYXdTY2hlZHVsZWQpIHtcbiAgICAgIHJlZHJhd1NjaGVkdWxlZCA9IHRydWU7XG5cbiAgICAgIHJhZihmdW5jdGlvbiByZWRyYXcoKSB7XG4gICAgICAgIHJlZHJhd1NjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICBpZiAoIWN1cnJlbnRTdGF0ZSkgcmV0dXJuO1xuXG4gICAgICAgIGluUmVuZGVyaW5nVHJhbnNhY3Rpb24gPSB0cnVlO1xuICAgICAgICByZW5kZXIoY3VycmVudFN0YXRlLCBwcmV2KTtcbiAgICAgICAgaW5SZW5kZXJpbmdUcmFuc2FjdGlvbiA9IGZhbHNlO1xuXG4gICAgICAgIGN1cnJlbnRTdGF0ZSA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyB1cGRhdGUgZGF0YSBmb3IgcmVkcmF3XG4gICAgY3VycmVudFN0YXRlID0gc3RhdGU7XG4gIH07XG59XG59LHtcImFzc2VydFwiOjIsXCJnbG9iYWwvd2luZG93XCI6OX1dLDE0OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBtYXRjaDtcblxuLy8gZ2V0IHVybCBwYXRoIHNlY3Rpb24gZnJvbSBhIHVybFxuLy8gc3RyaXAgcXVlcnlzdHJpbmdzIC8gaGFzaGVzXG4vLyBzdHJpcCBwcm90b2NvbFxuLy8gc3RyaXAgaG9zdG5hbWUgYW5kIHBvcnQgKGJvdGggaXAgYW5kIHJvdXRlKVxuLy8gc3RyIC0+IHN0clxuZnVuY3Rpb24gbWF0Y2gocm91dGUpIHtcbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiByb3V0ZSwgJ3N0cmluZycpO1xuXG4gIHJldHVybiByb3V0ZS50cmltKCkucmVwbGFjZSgvW1xcP3wjXS4qJC8sICcnKS5yZXBsYWNlKC9eKD86aHR0cHM/XFw6KVxcL1xcLy8sICcnKS5yZXBsYWNlKC9eKD86W1xcdysoPzotXFx3KykrLl0pKyg/OltcXDowLTldezQsNX0pPy8sICcnKS5yZXBsYWNlKC9cXC8kLywgJycpO1xufVxufSx7XCJhc3NlcnRcIjoyfV0sMTU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyIHdpbmRvdyA9IHJlcXVpcmUoJ2dsb2JhbC93aW5kb3cnKTtcbnZhciBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoO1xuXG4vLyBsaXN0ZW4gdG8gd2luZG93IGhhc2hjaGFuZ2UgZXZlbnRzXG4vLyBhbmQgdXBkYXRlIHJvdXRlciBhY2NvcmRpbmdseVxuLy8gZm4oY2IpIC0+IG51bGxcbmZ1bmN0aW9uIGhhc2goY2IpIHtcbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBjYiwgJ2Z1bmN0aW9uJywgJ2NiIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuICB3aW5kb3cub25oYXNoY2hhbmdlID0gZnVuY3Rpb24gKGUpIHtcbiAgICBjYih3aW5kb3cubG9jYXRpb24uaGFzaCk7XG4gIH07XG59XG59LHtcImFzc2VydFwiOjIsXCJnbG9iYWwvd2luZG93XCI6OX1dLDE2OltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciBkb2N1bWVudCA9IHJlcXVpcmUoJ2dsb2JhbC9kb2N1bWVudCcpO1xudmFyIHdpbmRvdyA9IHJlcXVpcmUoJ2dsb2JhbC93aW5kb3cnKTtcbnZhciBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBoaXN0b3J5O1xuXG4vLyBsaXN0ZW4gdG8gaHRtbDUgcHVzaHN0YXRlIGV2ZW50c1xuLy8gYW5kIHVwZGF0ZSByb3V0ZXIgYWNjb3JkaW5nbHlcbi8vIGZuKHN0cikgLT4gbnVsbFxuZnVuY3Rpb24gaGlzdG9yeShjYikge1xuICBhc3NlcnQuZXF1YWwodHlwZW9mIGNiLCAnZnVuY3Rpb24nLCAnY2IgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIHdpbmRvdy5vbnBvcHN0YXRlID0gZnVuY3Rpb24gKCkge1xuICAgIGNiKGRvY3VtZW50LmxvY2F0aW9uLmhyZWYpO1xuICB9O1xufVxufSx7XCJhc3NlcnRcIjoyLFwiZ2xvYmFsL2RvY3VtZW50XCI6OCxcImdsb2JhbC93aW5kb3dcIjo5fV0sMTc6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyIHdpbmRvdyA9IHJlcXVpcmUoJ2dsb2JhbC93aW5kb3cnKTtcbnZhciBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBocmVmO1xuXG4vLyBoYW5kbGUgYSBjbGljayBpZiBpcyBhbmNob3IgdGFnIHdpdGggYW4gaHJlZlxuLy8gYW5kIHVybCBsaXZlcyBvbiB0aGUgc2FtZSBkb21haW4uIFJlcGxhY2VzXG4vLyB0cmFpbGluZyAnIycgc28gZW1wdHkgbGlua3Mgd29yayBhcyBleHBlY3RlZC5cbi8vIGZuKHN0cikgLT4gbnVsbFxuZnVuY3Rpb24gaHJlZihjYikge1xuICBhc3NlcnQuZXF1YWwodHlwZW9mIGNiLCAnZnVuY3Rpb24nLCAnY2IgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgd2luZG93Lm9uY2xpY2sgPSBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBub2RlID0gZnVuY3Rpb24gdHJhdmVyc2Uobm9kZSkge1xuICAgICAgaWYgKCFub2RlKSByZXR1cm47XG4gICAgICBpZiAobm9kZS5sb2NhbE5hbWUgIT09ICdhJykgcmV0dXJuIHRyYXZlcnNlKG5vZGUucGFyZW50Tm9kZSk7XG4gICAgICBpZiAobm9kZS5ocmVmID09PSB1bmRlZmluZWQpIHJldHVybiB0cmF2ZXJzZShub2RlLnBhcmVudE5vZGUpO1xuICAgICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5ob3N0ICE9PSBub2RlLmhvc3QpIHJldHVybiB0cmF2ZXJzZShub2RlLnBhcmVudE5vZGUpO1xuICAgICAgcmV0dXJuIG5vZGU7XG4gICAgfShlLnRhcmdldCk7XG5cbiAgICBpZiAoIW5vZGUpIHJldHVybjtcblxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB2YXIgaHJlZiA9IG5vZGUuaHJlZi5yZXBsYWNlKC8jJC8sICcnKTtcbiAgICBjYihocmVmKTtcbiAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe30sIG51bGwsIGhyZWYpO1xuICB9O1xufVxufSx7XCJhc3NlcnRcIjoyLFwiZ2xvYmFsL3dpbmRvd1wiOjl9XSwxODpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgcGF0aG5hbWUgPSByZXF1aXJlKCdwYXRobmFtZS1tYXRjaCcpO1xudmFyIHdheWZhcmVyID0gcmVxdWlyZSgnd2F5ZmFyZXInKTtcbnZhciBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBzaGVldFJvdXRlcjtcblxuLy8gRmFzdCwgbW9kdWxhciBjbGllbnQgcm91dGVyXG4vLyBmbihzdHIsIGFueVsuLl0sIGZuPykgLT4gZm4oc3RyLCBhbnlbLi5dKVxuZnVuY3Rpb24gc2hlZXRSb3V0ZXIoZGZ0LCBjcmVhdGVUcmVlLCBjcmVhdGVSb3V0ZSkge1xuICBjcmVhdGVSb3V0ZSA9IGNyZWF0ZVJvdXRlID8gY3JlYXRlUm91dGUoX2NyZWF0ZVJvdXRlKSA6IF9jcmVhdGVSb3V0ZTtcblxuICBpZiAoIWNyZWF0ZVRyZWUpIHtcbiAgICBjcmVhdGVUcmVlID0gZGZ0O1xuICAgIGRmdCA9ICcnO1xuICB9XG5cbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBkZnQsICdzdHJpbmcnLCAnc2hlZXQtcm91dGVyOiBkZnQgbXVzdCBiZSBhIHN0cmluZycpO1xuICBhc3NlcnQuZXF1YWwodHlwZW9mIGNyZWF0ZVRyZWUsICdmdW5jdGlvbicsICdzaGVldC1yb3V0ZXI6IGNyZWF0ZVRyZWUgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gIGFzc2VydC5lcXVhbCh0eXBlb2YgY3JlYXRlUm91dGUsICdmdW5jdGlvbicsICdzaGVldC1yb3V0ZXI6IGNyZWF0ZVJvdXRlIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciByb3V0ZXIgPSB3YXlmYXJlcihkZnQpO1xuICB2YXIgdHJlZSA9IGNyZWF0ZVRyZWUoY3JlYXRlUm91dGUpXG5cbiAgLy8gcmVnaXN0ZXIgdHJlZSBpbiByb3V0ZXJcbiAgOyhmdW5jdGlvbiB3YWxrKHRyZWUsIHJvdXRlKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodHJlZVswXSkpIHtcbiAgICAgIC8vIHdhbGsgb3ZlciBhbGwgcm91dGVzIGF0IHRoZSByb290IG9mIHRoZSB0cmVlXG4gICAgICB0cmVlLmZvckVhY2goZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgd2Fsayhub2RlLCByb3V0ZSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHRyZWVbMV0pIHtcbiAgICAgIC8vIGhhbmRsZSBpbmxpbmUgZnVuY3Rpb25zIGFzIGFyZ3NcbiAgICAgIHZhciBpbm5lclJvdXRlID0gdHJlZVswXSA/IHJvdXRlLmNvbmNhdCh0cmVlWzBdKS5qb2luKCcvJykgOiByb3V0ZS5sZW5ndGggPyByb3V0ZS5qb2luKCcvJykgOiB0cmVlWzBdO1xuICAgICAgcm91dGVyLm9uKGlubmVyUm91dGUsIHRyZWVbMV0pO1xuICAgICAgd2Fsayh0cmVlWzJdLCByb3V0ZS5jb25jYXQodHJlZVswXSkpO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSh0cmVlWzJdKSkge1xuICAgICAgLy8gdHJhdmVyc2UgYW5kIGFwcGVuZCByb3V0ZVxuICAgICAgd2Fsayh0cmVlWzJdLCByb3V0ZS5jb25jYXQodHJlZVswXSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZWdpc3RlciBwYXRoIGluIHJvdXRlclxuICAgICAgdmFyIG53Um91dGUgPSB0cmVlWzBdID8gcm91dGUuY29uY2F0KHRyZWVbMF0pLmpvaW4oJy8nKSA6IHJvdXRlLmxlbmd0aCA/IHJvdXRlLmpvaW4oJy8nKSA6IHRyZWVbMF07XG4gICAgICByb3V0ZXIub24obndSb3V0ZSwgdHJlZVsyXSk7XG4gICAgfVxuICB9KSh0cmVlLCBbXSk7XG5cbiAgLy8gbWF0Y2ggYSByb3V0ZSBvbiB0aGUgcm91dGVyXG4gIHJldHVybiBmdW5jdGlvbiBtYXRjaChyb3V0ZSkge1xuICAgIGFzc2VydC5lcXVhbCh0eXBlb2Ygcm91dGUsICdzdHJpbmcnLCAncm91dGUgbXVzdCBiZSBhIHN0cmluZycpO1xuICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIGFyZ3NbMF0gPSBwYXRobmFtZShhcmdzWzBdKTtcbiAgICByZXR1cm4gcm91dGVyLmFwcGx5KG51bGwsIGFyZ3MpO1xuICB9O1xufVxuXG4vLyByZWdpc3RlciByZWd1bGFyIHJvdXRlXG5mdW5jdGlvbiBfY3JlYXRlUm91dGUocm91dGUsIGlubGluZSwgY2hpbGQpIHtcbiAgaWYgKCFjaGlsZCkge1xuICAgIGNoaWxkID0gaW5saW5lO1xuICAgIGlubGluZSA9IG51bGw7XG4gIH1cbiAgYXNzZXJ0LmVxdWFsKHR5cGVvZiByb3V0ZSwgJ3N0cmluZycsICdyb3V0ZSBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gIGFzc2VydC5vayhjaGlsZCwgJ2NoaWxkIGV4aXN0cycpO1xuICByb3V0ZSA9IHJvdXRlLnJlcGxhY2UoL15cXC8vLCAnJyk7XG4gIHJldHVybiBbcm91dGUsIGlubGluZSwgY2hpbGRdO1xufVxufSx7XCJhc3NlcnRcIjoyLFwicGF0aG5hbWUtbWF0Y2hcIjoxNCxcIndheWZhcmVyXCI6MjF9XSwxOTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQnVmZmVyKGFyZykge1xuICByZXR1cm4gYXJnICYmIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIHR5cGVvZiBhcmcuY29weSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgYXJnLmZpbGwgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIGFyZy5yZWFkVUludDggPT09ICdmdW5jdGlvbic7XG59O1xufSx7fV0sMjA6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCl7XG4vLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxudmFyIGZvcm1hdFJlZ0V4cCA9IC8lW3NkaiVdL2c7XG5leHBvcnRzLmZvcm1hdCA9IGZ1bmN0aW9uIChmKSB7XG4gIGlmICghaXNTdHJpbmcoZikpIHtcbiAgICB2YXIgb2JqZWN0cyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBvYmplY3RzLnB1c2goaW5zcGVjdChhcmd1bWVudHNbaV0pKTtcbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdHMuam9pbignICcpO1xuICB9XG5cbiAgdmFyIGkgPSAxO1xuICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgdmFyIGxlbiA9IGFyZ3MubGVuZ3RoO1xuICB2YXIgc3RyID0gU3RyaW5nKGYpLnJlcGxhY2UoZm9ybWF0UmVnRXhwLCBmdW5jdGlvbiAoeCkge1xuICAgIGlmICh4ID09PSAnJSUnKSByZXR1cm4gJyUnO1xuICAgIGlmIChpID49IGxlbikgcmV0dXJuIHg7XG4gICAgc3dpdGNoICh4KSB7XG4gICAgICBjYXNlICclcyc6XG4gICAgICAgIHJldHVybiBTdHJpbmcoYXJnc1tpKytdKTtcbiAgICAgIGNhc2UgJyVkJzpcbiAgICAgICAgcmV0dXJuIE51bWJlcihhcmdzW2krK10pO1xuICAgICAgY2FzZSAnJWonOlxuICAgICAgICB0cnkge1xuICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShhcmdzW2krK10pO1xuICAgICAgICB9IGNhdGNoIChfKSB7XG4gICAgICAgICAgcmV0dXJuICdbQ2lyY3VsYXJdJztcbiAgICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHg7XG4gICAgfVxuICB9KTtcbiAgZm9yICh2YXIgeCA9IGFyZ3NbaV07IGkgPCBsZW47IHggPSBhcmdzWysraV0pIHtcbiAgICBpZiAoaXNOdWxsKHgpIHx8ICFpc09iamVjdCh4KSkge1xuICAgICAgc3RyICs9ICcgJyArIHg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0ciArPSAnICcgKyBpbnNwZWN0KHgpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3RyO1xufTtcblxuLy8gTWFyayB0aGF0IGEgbWV0aG9kIHNob3VsZCBub3QgYmUgdXNlZC5cbi8vIFJldHVybnMgYSBtb2RpZmllZCBmdW5jdGlvbiB3aGljaCB3YXJucyBvbmNlIGJ5IGRlZmF1bHQuXG4vLyBJZiAtLW5vLWRlcHJlY2F0aW9uIGlzIHNldCwgdGhlbiBpdCBpcyBhIG5vLW9wLlxuZXhwb3J0cy5kZXByZWNhdGUgPSBmdW5jdGlvbiAoZm4sIG1zZykge1xuICAvLyBBbGxvdyBmb3IgZGVwcmVjYXRpbmcgdGhpbmdzIGluIHRoZSBwcm9jZXNzIG9mIHN0YXJ0aW5nIHVwLlxuICBpZiAoaXNVbmRlZmluZWQoZ2xvYmFsLnByb2Nlc3MpKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBleHBvcnRzLmRlcHJlY2F0ZShmbiwgbXNnKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH07XG4gIH1cblxuICBpZiAocHJvY2Vzcy5ub0RlcHJlY2F0aW9uID09PSB0cnVlKSB7XG4gICAgcmV0dXJuIGZuO1xuICB9XG5cbiAgdmFyIHdhcm5lZCA9IGZhbHNlO1xuICBmdW5jdGlvbiBkZXByZWNhdGVkKCkge1xuICAgIGlmICghd2FybmVkKSB7XG4gICAgICBpZiAocHJvY2Vzcy50aHJvd0RlcHJlY2F0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtc2cpO1xuICAgICAgfSBlbHNlIGlmIChwcm9jZXNzLnRyYWNlRGVwcmVjYXRpb24pIHtcbiAgICAgICAgY29uc29sZS50cmFjZShtc2cpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xuICAgICAgfVxuICAgICAgd2FybmVkID0gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH1cblxuICByZXR1cm4gZGVwcmVjYXRlZDtcbn07XG5cbnZhciBkZWJ1Z3MgPSB7fTtcbnZhciBkZWJ1Z0Vudmlyb247XG5leHBvcnRzLmRlYnVnbG9nID0gZnVuY3Rpb24gKHNldCkge1xuICBpZiAoaXNVbmRlZmluZWQoZGVidWdFbnZpcm9uKSkgZGVidWdFbnZpcm9uID0gcHJvY2Vzcy5lbnYuTk9ERV9ERUJVRyB8fCAnJztcbiAgc2V0ID0gc2V0LnRvVXBwZXJDYXNlKCk7XG4gIGlmICghZGVidWdzW3NldF0pIHtcbiAgICBpZiAobmV3IFJlZ0V4cCgnXFxcXGInICsgc2V0ICsgJ1xcXFxiJywgJ2knKS50ZXN0KGRlYnVnRW52aXJvbikpIHtcbiAgICAgIHZhciBwaWQgPSBwcm9jZXNzLnBpZDtcbiAgICAgIGRlYnVnc1tzZXRdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbXNnID0gZXhwb3J0cy5mb3JtYXQuYXBwbHkoZXhwb3J0cywgYXJndW1lbnRzKTtcbiAgICAgICAgY29uc29sZS5lcnJvcignJXMgJWQ6ICVzJywgc2V0LCBwaWQsIG1zZyk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWJ1Z3Nbc2V0XSA9IGZ1bmN0aW9uICgpIHt9O1xuICAgIH1cbiAgfVxuICByZXR1cm4gZGVidWdzW3NldF07XG59O1xuXG4vKipcbiAqIEVjaG9zIHRoZSB2YWx1ZSBvZiBhIHZhbHVlLiBUcnlzIHRvIHByaW50IHRoZSB2YWx1ZSBvdXRcbiAqIGluIHRoZSBiZXN0IHdheSBwb3NzaWJsZSBnaXZlbiB0aGUgZGlmZmVyZW50IHR5cGVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBwcmludCBvdXQuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0cyBPcHRpb25hbCBvcHRpb25zIG9iamVjdCB0aGF0IGFsdGVycyB0aGUgb3V0cHV0LlxuICovXG4vKiBsZWdhY3k6IG9iaiwgc2hvd0hpZGRlbiwgZGVwdGgsIGNvbG9ycyovXG5mdW5jdGlvbiBpbnNwZWN0KG9iaiwgb3B0cykge1xuICAvLyBkZWZhdWx0IG9wdGlvbnNcbiAgdmFyIGN0eCA9IHtcbiAgICBzZWVuOiBbXSxcbiAgICBzdHlsaXplOiBzdHlsaXplTm9Db2xvclxuICB9O1xuICAvLyBsZWdhY3kuLi5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPj0gMykgY3R4LmRlcHRoID0gYXJndW1lbnRzWzJdO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+PSA0KSBjdHguY29sb3JzID0gYXJndW1lbnRzWzNdO1xuICBpZiAoaXNCb29sZWFuKG9wdHMpKSB7XG4gICAgLy8gbGVnYWN5Li4uXG4gICAgY3R4LnNob3dIaWRkZW4gPSBvcHRzO1xuICB9IGVsc2UgaWYgKG9wdHMpIHtcbiAgICAvLyBnb3QgYW4gXCJvcHRpb25zXCIgb2JqZWN0XG4gICAgZXhwb3J0cy5fZXh0ZW5kKGN0eCwgb3B0cyk7XG4gIH1cbiAgLy8gc2V0IGRlZmF1bHQgb3B0aW9uc1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LnNob3dIaWRkZW4pKSBjdHguc2hvd0hpZGRlbiA9IGZhbHNlO1xuICBpZiAoaXNVbmRlZmluZWQoY3R4LmRlcHRoKSkgY3R4LmRlcHRoID0gMjtcbiAgaWYgKGlzVW5kZWZpbmVkKGN0eC5jb2xvcnMpKSBjdHguY29sb3JzID0gZmFsc2U7XG4gIGlmIChpc1VuZGVmaW5lZChjdHguY3VzdG9tSW5zcGVjdCkpIGN0eC5jdXN0b21JbnNwZWN0ID0gdHJ1ZTtcbiAgaWYgKGN0eC5jb2xvcnMpIGN0eC5zdHlsaXplID0gc3R5bGl6ZVdpdGhDb2xvcjtcbiAgcmV0dXJuIGZvcm1hdFZhbHVlKGN0eCwgb2JqLCBjdHguZGVwdGgpO1xufVxuZXhwb3J0cy5pbnNwZWN0ID0gaW5zcGVjdDtcblxuLy8gaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9BTlNJX2VzY2FwZV9jb2RlI2dyYXBoaWNzXG5pbnNwZWN0LmNvbG9ycyA9IHtcbiAgJ2JvbGQnOiBbMSwgMjJdLFxuICAnaXRhbGljJzogWzMsIDIzXSxcbiAgJ3VuZGVybGluZSc6IFs0LCAyNF0sXG4gICdpbnZlcnNlJzogWzcsIDI3XSxcbiAgJ3doaXRlJzogWzM3LCAzOV0sXG4gICdncmV5JzogWzkwLCAzOV0sXG4gICdibGFjayc6IFszMCwgMzldLFxuICAnYmx1ZSc6IFszNCwgMzldLFxuICAnY3lhbic6IFszNiwgMzldLFxuICAnZ3JlZW4nOiBbMzIsIDM5XSxcbiAgJ21hZ2VudGEnOiBbMzUsIDM5XSxcbiAgJ3JlZCc6IFszMSwgMzldLFxuICAneWVsbG93JzogWzMzLCAzOV1cbn07XG5cbi8vIERvbid0IHVzZSAnYmx1ZScgbm90IHZpc2libGUgb24gY21kLmV4ZVxuaW5zcGVjdC5zdHlsZXMgPSB7XG4gICdzcGVjaWFsJzogJ2N5YW4nLFxuICAnbnVtYmVyJzogJ3llbGxvdycsXG4gICdib29sZWFuJzogJ3llbGxvdycsXG4gICd1bmRlZmluZWQnOiAnZ3JleScsXG4gICdudWxsJzogJ2JvbGQnLFxuICAnc3RyaW5nJzogJ2dyZWVuJyxcbiAgJ2RhdGUnOiAnbWFnZW50YScsXG4gIC8vIFwibmFtZVwiOiBpbnRlbnRpb25hbGx5IG5vdCBzdHlsaW5nXG4gICdyZWdleHAnOiAncmVkJ1xufTtcblxuZnVuY3Rpb24gc3R5bGl6ZVdpdGhDb2xvcihzdHIsIHN0eWxlVHlwZSkge1xuICB2YXIgc3R5bGUgPSBpbnNwZWN0LnN0eWxlc1tzdHlsZVR5cGVdO1xuXG4gIGlmIChzdHlsZSkge1xuICAgIHJldHVybiAnXFx1MDAxYlsnICsgaW5zcGVjdC5jb2xvcnNbc3R5bGVdWzBdICsgJ20nICsgc3RyICsgJ1xcdTAwMWJbJyArIGluc3BlY3QuY29sb3JzW3N0eWxlXVsxXSArICdtJztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG59XG5cbmZ1bmN0aW9uIHN0eWxpemVOb0NvbG9yKHN0ciwgc3R5bGVUeXBlKSB7XG4gIHJldHVybiBzdHI7XG59XG5cbmZ1bmN0aW9uIGFycmF5VG9IYXNoKGFycmF5KSB7XG4gIHZhciBoYXNoID0ge307XG5cbiAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbiAodmFsLCBpZHgpIHtcbiAgICBoYXNoW3ZhbF0gPSB0cnVlO1xuICB9KTtcblxuICByZXR1cm4gaGFzaDtcbn1cblxuZnVuY3Rpb24gZm9ybWF0VmFsdWUoY3R4LCB2YWx1ZSwgcmVjdXJzZVRpbWVzKSB7XG4gIC8vIFByb3ZpZGUgYSBob29rIGZvciB1c2VyLXNwZWNpZmllZCBpbnNwZWN0IGZ1bmN0aW9ucy5cbiAgLy8gQ2hlY2sgdGhhdCB2YWx1ZSBpcyBhbiBvYmplY3Qgd2l0aCBhbiBpbnNwZWN0IGZ1bmN0aW9uIG9uIGl0XG4gIGlmIChjdHguY3VzdG9tSW5zcGVjdCAmJiB2YWx1ZSAmJiBpc0Z1bmN0aW9uKHZhbHVlLmluc3BlY3QpICYmXG4gIC8vIEZpbHRlciBvdXQgdGhlIHV0aWwgbW9kdWxlLCBpdCdzIGluc3BlY3QgZnVuY3Rpb24gaXMgc3BlY2lhbFxuICB2YWx1ZS5pbnNwZWN0ICE9PSBleHBvcnRzLmluc3BlY3QgJiZcbiAgLy8gQWxzbyBmaWx0ZXIgb3V0IGFueSBwcm90b3R5cGUgb2JqZWN0cyB1c2luZyB0aGUgY2lyY3VsYXIgY2hlY2suXG4gICEodmFsdWUuY29uc3RydWN0b3IgJiYgdmFsdWUuY29uc3RydWN0b3IucHJvdG90eXBlID09PSB2YWx1ZSkpIHtcbiAgICB2YXIgcmV0ID0gdmFsdWUuaW5zcGVjdChyZWN1cnNlVGltZXMsIGN0eCk7XG4gICAgaWYgKCFpc1N0cmluZyhyZXQpKSB7XG4gICAgICByZXQgPSBmb3JtYXRWYWx1ZShjdHgsIHJldCwgcmVjdXJzZVRpbWVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbiAgfVxuXG4gIC8vIFByaW1pdGl2ZSB0eXBlcyBjYW5ub3QgaGF2ZSBwcm9wZXJ0aWVzXG4gIHZhciBwcmltaXRpdmUgPSBmb3JtYXRQcmltaXRpdmUoY3R4LCB2YWx1ZSk7XG4gIGlmIChwcmltaXRpdmUpIHtcbiAgICByZXR1cm4gcHJpbWl0aXZlO1xuICB9XG5cbiAgLy8gTG9vayB1cCB0aGUga2V5cyBvZiB0aGUgb2JqZWN0LlxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKTtcbiAgdmFyIHZpc2libGVLZXlzID0gYXJyYXlUb0hhc2goa2V5cyk7XG5cbiAgaWYgKGN0eC5zaG93SGlkZGVuKSB7XG4gICAga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHZhbHVlKTtcbiAgfVxuXG4gIC8vIElFIGRvZXNuJ3QgbWFrZSBlcnJvciBmaWVsZHMgbm9uLWVudW1lcmFibGVcbiAgLy8gaHR0cDovL21zZG4ubWljcm9zb2Z0LmNvbS9lbi11cy9saWJyYXJ5L2llL2R3dzUyc2J0KHY9dnMuOTQpLmFzcHhcbiAgaWYgKGlzRXJyb3IodmFsdWUpICYmIChrZXlzLmluZGV4T2YoJ21lc3NhZ2UnKSA+PSAwIHx8IGtleXMuaW5kZXhPZignZGVzY3JpcHRpb24nKSA+PSAwKSkge1xuICAgIHJldHVybiBmb3JtYXRFcnJvcih2YWx1ZSk7XG4gIH1cblxuICAvLyBTb21lIHR5cGUgb2Ygb2JqZWN0IHdpdGhvdXQgcHJvcGVydGllcyBjYW4gYmUgc2hvcnRjdXR0ZWQuXG4gIGlmIChrZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgdmFyIG5hbWUgPSB2YWx1ZS5uYW1lID8gJzogJyArIHZhbHVlLm5hbWUgOiAnJztcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnW0Z1bmN0aW9uJyArIG5hbWUgKyAnXScsICdzcGVjaWFsJyk7XG4gICAgfVxuICAgIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG4gICAgfVxuICAgIGlmIChpc0RhdGUodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY3R4LnN0eWxpemUoRGF0ZS5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSksICdkYXRlJyk7XG4gICAgfVxuICAgIGlmIChpc0Vycm9yKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGZvcm1hdEVycm9yKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICB2YXIgYmFzZSA9ICcnLFxuICAgICAgYXJyYXkgPSBmYWxzZSxcbiAgICAgIGJyYWNlcyA9IFsneycsICd9J107XG5cbiAgLy8gTWFrZSBBcnJheSBzYXkgdGhhdCB0aGV5IGFyZSBBcnJheVxuICBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICBhcnJheSA9IHRydWU7XG4gICAgYnJhY2VzID0gWydbJywgJ10nXTtcbiAgfVxuXG4gIC8vIE1ha2UgZnVuY3Rpb25zIHNheSB0aGF0IHRoZXkgYXJlIGZ1bmN0aW9uc1xuICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICB2YXIgbiA9IHZhbHVlLm5hbWUgPyAnOiAnICsgdmFsdWUubmFtZSA6ICcnO1xuICAgIGJhc2UgPSAnIFtGdW5jdGlvbicgKyBuICsgJ10nO1xuICB9XG5cbiAgLy8gTWFrZSBSZWdFeHBzIHNheSB0aGF0IHRoZXkgYXJlIFJlZ0V4cHNcbiAgaWYgKGlzUmVnRXhwKHZhbHVlKSkge1xuICAgIGJhc2UgPSAnICcgKyBSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpO1xuICB9XG5cbiAgLy8gTWFrZSBkYXRlcyB3aXRoIHByb3BlcnRpZXMgZmlyc3Qgc2F5IHRoZSBkYXRlXG4gIGlmIChpc0RhdGUodmFsdWUpKSB7XG4gICAgYmFzZSA9ICcgJyArIERhdGUucHJvdG90eXBlLnRvVVRDU3RyaW5nLmNhbGwodmFsdWUpO1xuICB9XG5cbiAgLy8gTWFrZSBlcnJvciB3aXRoIG1lc3NhZ2UgZmlyc3Qgc2F5IHRoZSBlcnJvclxuICBpZiAoaXNFcnJvcih2YWx1ZSkpIHtcbiAgICBiYXNlID0gJyAnICsgZm9ybWF0RXJyb3IodmFsdWUpO1xuICB9XG5cbiAgaWYgKGtleXMubGVuZ3RoID09PSAwICYmICghYXJyYXkgfHwgdmFsdWUubGVuZ3RoID09IDApKSB7XG4gICAgcmV0dXJuIGJyYWNlc1swXSArIGJhc2UgKyBicmFjZXNbMV07XG4gIH1cblxuICBpZiAocmVjdXJzZVRpbWVzIDwgMCkge1xuICAgIGlmIChpc1JlZ0V4cCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZShSZWdFeHAucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpLCAncmVnZXhwJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjdHguc3R5bGl6ZSgnW09iamVjdF0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuXG4gIGN0eC5zZWVuLnB1c2godmFsdWUpO1xuXG4gIHZhciBvdXRwdXQ7XG4gIGlmIChhcnJheSkge1xuICAgIG91dHB1dCA9IGZvcm1hdEFycmF5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIGtleXMpO1xuICB9IGVsc2Uge1xuICAgIG91dHB1dCA9IGtleXMubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJldHVybiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KTtcbiAgICB9KTtcbiAgfVxuXG4gIGN0eC5zZWVuLnBvcCgpO1xuXG4gIHJldHVybiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcyk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFByaW1pdGl2ZShjdHgsIHZhbHVlKSB7XG4gIGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkpIHJldHVybiBjdHguc3R5bGl6ZSgndW5kZWZpbmVkJywgJ3VuZGVmaW5lZCcpO1xuICBpZiAoaXNTdHJpbmcodmFsdWUpKSB7XG4gICAgdmFyIHNpbXBsZSA9ICdcXCcnICsgSlNPTi5zdHJpbmdpZnkodmFsdWUpLnJlcGxhY2UoL15cInxcIiQvZywgJycpLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKS5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJykgKyAnXFwnJztcbiAgICByZXR1cm4gY3R4LnN0eWxpemUoc2ltcGxlLCAnc3RyaW5nJyk7XG4gIH1cbiAgaWYgKGlzTnVtYmVyKHZhbHVlKSkgcmV0dXJuIGN0eC5zdHlsaXplKCcnICsgdmFsdWUsICdudW1iZXInKTtcbiAgaWYgKGlzQm9vbGVhbih2YWx1ZSkpIHJldHVybiBjdHguc3R5bGl6ZSgnJyArIHZhbHVlLCAnYm9vbGVhbicpO1xuICAvLyBGb3Igc29tZSByZWFzb24gdHlwZW9mIG51bGwgaXMgXCJvYmplY3RcIiwgc28gc3BlY2lhbCBjYXNlIGhlcmUuXG4gIGlmIChpc051bGwodmFsdWUpKSByZXR1cm4gY3R4LnN0eWxpemUoJ251bGwnLCAnbnVsbCcpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRFcnJvcih2YWx1ZSkge1xuICByZXR1cm4gJ1snICsgRXJyb3IucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpICsgJ10nO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRBcnJheShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXlzKSB7XG4gIHZhciBvdXRwdXQgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB2YWx1ZS5sZW5ndGg7IGkgPCBsOyArK2kpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkodmFsdWUsIFN0cmluZyhpKSkpIHtcbiAgICAgIG91dHB1dC5wdXNoKGZvcm1hdFByb3BlcnR5KGN0eCwgdmFsdWUsIHJlY3Vyc2VUaW1lcywgdmlzaWJsZUtleXMsIFN0cmluZyhpKSwgdHJ1ZSkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdXRwdXQucHVzaCgnJyk7XG4gICAgfVxuICB9XG4gIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKCFrZXkubWF0Y2goL15cXGQrJC8pKSB7XG4gICAgICBvdXRwdXQucHVzaChmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIHRydWUpKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gb3V0cHV0O1xufVxuXG5mdW5jdGlvbiBmb3JtYXRQcm9wZXJ0eShjdHgsIHZhbHVlLCByZWN1cnNlVGltZXMsIHZpc2libGVLZXlzLCBrZXksIGFycmF5KSB7XG4gIHZhciBuYW1lLCBzdHIsIGRlc2M7XG4gIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHZhbHVlLCBrZXkpIHx8IHsgdmFsdWU6IHZhbHVlW2tleV0gfTtcbiAgaWYgKGRlc2MuZ2V0KSB7XG4gICAgaWYgKGRlc2Muc2V0KSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW0dldHRlci9TZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tHZXR0ZXJdJywgJ3NwZWNpYWwnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGRlc2Muc2V0KSB7XG4gICAgICBzdHIgPSBjdHguc3R5bGl6ZSgnW1NldHRlcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuICBpZiAoIWhhc093blByb3BlcnR5KHZpc2libGVLZXlzLCBrZXkpKSB7XG4gICAgbmFtZSA9ICdbJyArIGtleSArICddJztcbiAgfVxuICBpZiAoIXN0cikge1xuICAgIGlmIChjdHguc2Vlbi5pbmRleE9mKGRlc2MudmFsdWUpIDwgMCkge1xuICAgICAgaWYgKGlzTnVsbChyZWN1cnNlVGltZXMpKSB7XG4gICAgICAgIHN0ciA9IGZvcm1hdFZhbHVlKGN0eCwgZGVzYy52YWx1ZSwgbnVsbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdHIgPSBmb3JtYXRWYWx1ZShjdHgsIGRlc2MudmFsdWUsIHJlY3Vyc2VUaW1lcyAtIDEpO1xuICAgICAgfVxuICAgICAgaWYgKHN0ci5pbmRleE9mKCdcXG4nKSA+IC0xKSB7XG4gICAgICAgIGlmIChhcnJheSkge1xuICAgICAgICAgIHN0ciA9IHN0ci5zcGxpdCgnXFxuJykubWFwKGZ1bmN0aW9uIChsaW5lKSB7XG4gICAgICAgICAgICByZXR1cm4gJyAgJyArIGxpbmU7XG4gICAgICAgICAgfSkuam9pbignXFxuJykuc3Vic3RyKDIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0ciA9ICdcXG4nICsgc3RyLnNwbGl0KCdcXG4nKS5tYXAoZnVuY3Rpb24gKGxpbmUpIHtcbiAgICAgICAgICAgIHJldHVybiAnICAgJyArIGxpbmU7XG4gICAgICAgICAgfSkuam9pbignXFxuJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3RyID0gY3R4LnN0eWxpemUoJ1tDaXJjdWxhcl0nLCAnc3BlY2lhbCcpO1xuICAgIH1cbiAgfVxuICBpZiAoaXNVbmRlZmluZWQobmFtZSkpIHtcbiAgICBpZiAoYXJyYXkgJiYga2V5Lm1hdGNoKC9eXFxkKyQvKSkge1xuICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgbmFtZSA9IEpTT04uc3RyaW5naWZ5KCcnICsga2V5KTtcbiAgICBpZiAobmFtZS5tYXRjaCgvXlwiKFthLXpBLVpfXVthLXpBLVpfMC05XSopXCIkLykpIHtcbiAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cigxLCBuYW1lLmxlbmd0aCAtIDIpO1xuICAgICAgbmFtZSA9IGN0eC5zdHlsaXplKG5hbWUsICduYW1lJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoLycvZywgXCJcXFxcJ1wiKS5yZXBsYWNlKC9cXFxcXCIvZywgJ1wiJykucmVwbGFjZSgvKF5cInxcIiQpL2csIFwiJ1wiKTtcbiAgICAgIG5hbWUgPSBjdHguc3R5bGl6ZShuYW1lLCAnc3RyaW5nJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5hbWUgKyAnOiAnICsgc3RyO1xufVxuXG5mdW5jdGlvbiByZWR1Y2VUb1NpbmdsZVN0cmluZyhvdXRwdXQsIGJhc2UsIGJyYWNlcykge1xuICB2YXIgbnVtTGluZXNFc3QgPSAwO1xuICB2YXIgbGVuZ3RoID0gb3V0cHV0LnJlZHVjZShmdW5jdGlvbiAocHJldiwgY3VyKSB7XG4gICAgbnVtTGluZXNFc3QrKztcbiAgICBpZiAoY3VyLmluZGV4T2YoJ1xcbicpID49IDApIG51bUxpbmVzRXN0Kys7XG4gICAgcmV0dXJuIHByZXYgKyBjdXIucmVwbGFjZSgvXFx1MDAxYlxcW1xcZFxcZD9tL2csICcnKS5sZW5ndGggKyAxO1xuICB9LCAwKTtcblxuICBpZiAobGVuZ3RoID4gNjApIHtcbiAgICByZXR1cm4gYnJhY2VzWzBdICsgKGJhc2UgPT09ICcnID8gJycgOiBiYXNlICsgJ1xcbiAnKSArICcgJyArIG91dHB1dC5qb2luKCcsXFxuICAnKSArICcgJyArIGJyYWNlc1sxXTtcbiAgfVxuXG4gIHJldHVybiBicmFjZXNbMF0gKyBiYXNlICsgJyAnICsgb3V0cHV0LmpvaW4oJywgJykgKyAnICcgKyBicmFjZXNbMV07XG59XG5cbi8vIE5PVEU6IFRoZXNlIHR5cGUgY2hlY2tpbmcgZnVuY3Rpb25zIGludGVudGlvbmFsbHkgZG9uJ3QgdXNlIGBpbnN0YW5jZW9mYFxuLy8gYmVjYXVzZSBpdCBpcyBmcmFnaWxlIGFuZCBjYW4gYmUgZWFzaWx5IGZha2VkIHdpdGggYE9iamVjdC5jcmVhdGUoKWAuXG5mdW5jdGlvbiBpc0FycmF5KGFyKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KGFyKTtcbn1cbmV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XG5cbmZ1bmN0aW9uIGlzQm9vbGVhbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdib29sZWFuJztcbn1cbmV4cG9ydHMuaXNCb29sZWFuID0gaXNCb29sZWFuO1xuXG5mdW5jdGlvbiBpc051bGwoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGw7XG59XG5leHBvcnRzLmlzTnVsbCA9IGlzTnVsbDtcblxuZnVuY3Rpb24gaXNOdWxsT3JVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNOdWxsT3JVbmRlZmluZWQgPSBpc051bGxPclVuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNOdW1iZXIoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnbnVtYmVyJztcbn1cbmV4cG9ydHMuaXNOdW1iZXIgPSBpc051bWJlcjtcblxuZnVuY3Rpb24gaXNTdHJpbmcoYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3RyaW5nJztcbn1cbmV4cG9ydHMuaXNTdHJpbmcgPSBpc1N0cmluZztcblxuZnVuY3Rpb24gaXNTeW1ib2woYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnc3ltYm9sJztcbn1cbmV4cG9ydHMuaXNTeW1ib2wgPSBpc1N5bWJvbDtcblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbmV4cG9ydHMuaXNVbmRlZmluZWQgPSBpc1VuZGVmaW5lZDtcblxuZnVuY3Rpb24gaXNSZWdFeHAocmUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHJlKSAmJiBvYmplY3RUb1N0cmluZyhyZSkgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufVxuZXhwb3J0cy5pc1JlZ0V4cCA9IGlzUmVnRXhwO1xuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cbmV4cG9ydHMuaXNPYmplY3QgPSBpc09iamVjdDtcblxuZnVuY3Rpb24gaXNEYXRlKGQpIHtcbiAgcmV0dXJuIGlzT2JqZWN0KGQpICYmIG9iamVjdFRvU3RyaW5nKGQpID09PSAnW29iamVjdCBEYXRlXSc7XG59XG5leHBvcnRzLmlzRGF0ZSA9IGlzRGF0ZTtcblxuZnVuY3Rpb24gaXNFcnJvcihlKSB7XG4gIHJldHVybiBpc09iamVjdChlKSAmJiAob2JqZWN0VG9TdHJpbmcoZSkgPT09ICdbb2JqZWN0IEVycm9yXScgfHwgZSBpbnN0YW5jZW9mIEVycm9yKTtcbn1cbmV4cG9ydHMuaXNFcnJvciA9IGlzRXJyb3I7XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gaXNGdW5jdGlvbjtcblxuZnVuY3Rpb24gaXNQcmltaXRpdmUoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IG51bGwgfHwgdHlwZW9mIGFyZyA9PT0gJ2Jvb2xlYW4nIHx8IHR5cGVvZiBhcmcgPT09ICdudW1iZXInIHx8IHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBhcmcgPT09ICdzeW1ib2wnIHx8IC8vIEVTNiBzeW1ib2xcbiAgdHlwZW9mIGFyZyA9PT0gJ3VuZGVmaW5lZCc7XG59XG5leHBvcnRzLmlzUHJpbWl0aXZlID0gaXNQcmltaXRpdmU7XG5cbmV4cG9ydHMuaXNCdWZmZXIgPSByZXF1aXJlKCcuL3N1cHBvcnQvaXNCdWZmZXInKTtcblxuZnVuY3Rpb24gb2JqZWN0VG9TdHJpbmcobykge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pO1xufVxuXG5mdW5jdGlvbiBwYWQobikge1xuICByZXR1cm4gbiA8IDEwID8gJzAnICsgbi50b1N0cmluZygxMCkgOiBuLnRvU3RyaW5nKDEwKTtcbn1cblxudmFyIG1vbnRocyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW4nLCAnSnVsJywgJ0F1ZycsICdTZXAnLCAnT2N0JywgJ05vdicsICdEZWMnXTtcblxuLy8gMjYgRmViIDE2OjE5OjM0XG5mdW5jdGlvbiB0aW1lc3RhbXAoKSB7XG4gIHZhciBkID0gbmV3IERhdGUoKTtcbiAgdmFyIHRpbWUgPSBbcGFkKGQuZ2V0SG91cnMoKSksIHBhZChkLmdldE1pbnV0ZXMoKSksIHBhZChkLmdldFNlY29uZHMoKSldLmpvaW4oJzonKTtcbiAgcmV0dXJuIFtkLmdldERhdGUoKSwgbW9udGhzW2QuZ2V0TW9udGgoKV0sIHRpbWVdLmpvaW4oJyAnKTtcbn1cblxuLy8gbG9nIGlzIGp1c3QgYSB0aGluIHdyYXBwZXIgdG8gY29uc29sZS5sb2cgdGhhdCBwcmVwZW5kcyBhIHRpbWVzdGFtcFxuZXhwb3J0cy5sb2cgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnNvbGUubG9nKCclcyAtICVzJywgdGltZXN0YW1wKCksIGV4cG9ydHMuZm9ybWF0LmFwcGx5KGV4cG9ydHMsIGFyZ3VtZW50cykpO1xufTtcblxuLyoqXG4gKiBJbmhlcml0IHRoZSBwcm90b3R5cGUgbWV0aG9kcyBmcm9tIG9uZSBjb25zdHJ1Y3RvciBpbnRvIGFub3RoZXIuXG4gKlxuICogVGhlIEZ1bmN0aW9uLnByb3RvdHlwZS5pbmhlcml0cyBmcm9tIGxhbmcuanMgcmV3cml0dGVuIGFzIGEgc3RhbmRhbG9uZVxuICogZnVuY3Rpb24gKG5vdCBvbiBGdW5jdGlvbi5wcm90b3R5cGUpLiBOT1RFOiBJZiB0aGlzIGZpbGUgaXMgdG8gYmUgbG9hZGVkXG4gKiBkdXJpbmcgYm9vdHN0cmFwcGluZyB0aGlzIGZ1bmN0aW9uIG5lZWRzIHRvIGJlIHJld3JpdHRlbiB1c2luZyBzb21lIG5hdGl2ZVxuICogZnVuY3Rpb25zIGFzIHByb3RvdHlwZSBzZXR1cCB1c2luZyBub3JtYWwgSmF2YVNjcmlwdCBkb2VzIG5vdCB3b3JrIGFzXG4gKiBleHBlY3RlZCBkdXJpbmcgYm9vdHN0cmFwcGluZyAoc2VlIG1pcnJvci5qcyBpbiByMTE0OTAzKS5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjdG9yIENvbnN0cnVjdG9yIGZ1bmN0aW9uIHdoaWNoIG5lZWRzIHRvIGluaGVyaXQgdGhlXG4gKiAgICAgcHJvdG90eXBlLlxuICogQHBhcmFtIHtmdW5jdGlvbn0gc3VwZXJDdG9yIENvbnN0cnVjdG9yIGZ1bmN0aW9uIHRvIGluaGVyaXQgcHJvdG90eXBlIGZyb20uXG4gKi9cbmV4cG9ydHMuaW5oZXJpdHMgPSByZXF1aXJlKCdpbmhlcml0cycpO1xuXG5leHBvcnRzLl9leHRlbmQgPSBmdW5jdGlvbiAob3JpZ2luLCBhZGQpIHtcbiAgLy8gRG9uJ3QgZG8gYW55dGhpbmcgaWYgYWRkIGlzbid0IGFuIG9iamVjdFxuICBpZiAoIWFkZCB8fCAhaXNPYmplY3QoYWRkKSkgcmV0dXJuIG9yaWdpbjtcblxuICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKGFkZCk7XG4gIHZhciBpID0ga2V5cy5sZW5ndGg7XG4gIHdoaWxlIChpLS0pIHtcbiAgICBvcmlnaW5ba2V5c1tpXV0gPSBhZGRba2V5c1tpXV07XG4gIH1cbiAgcmV0dXJuIG9yaWdpbjtcbn07XG5cbmZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG59XG59KS5jYWxsKHRoaXMscmVxdWlyZSgnX3Byb2Nlc3MnKSx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxufSx7XCIuL3N1cHBvcnQvaXNCdWZmZXJcIjoxOSxcIl9wcm9jZXNzXCI6NixcImluaGVyaXRzXCI6MTF9XSwyMTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgYXNzZXJ0ID0gcmVxdWlyZSgnYXNzZXJ0Jyk7XG52YXIgdHJpZSA9IHJlcXVpcmUoJy4vdHJpZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdheWZhcmVyO1xuXG4vLyBjcmVhdGUgYSByb3V0ZXJcbi8vIHN0ciAtPiBvYmpcbmZ1bmN0aW9uIFdheWZhcmVyKGRmdCkge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgV2F5ZmFyZXIpKSByZXR1cm4gbmV3IFdheWZhcmVyKGRmdCk7XG5cbiAgdmFyIF9kZWZhdWx0ID0gKGRmdCB8fCAnJykucmVwbGFjZSgvXlxcLy8sICcnKTtcbiAgdmFyIF90cmllID0gdHJpZSgpO1xuXG4gIGVtaXQuX3RyaWUgPSBfdHJpZTtcbiAgZW1pdC5lbWl0ID0gZW1pdDtcbiAgZW1pdC5vbiA9IG9uO1xuICBlbWl0Ll93YXlmYXJlciA9IHRydWU7XG5cbiAgcmV0dXJuIGVtaXQ7XG5cbiAgLy8gZGVmaW5lIGEgcm91dGVcbiAgLy8gKHN0ciwgZm4pIC0+IG9ialxuICBmdW5jdGlvbiBvbihyb3V0ZSwgY2IpIHtcbiAgICBhc3NlcnQuZXF1YWwodHlwZW9mIHJvdXRlLCAnc3RyaW5nJyk7XG4gICAgYXNzZXJ0LmVxdWFsKHR5cGVvZiBjYiwgJ2Z1bmN0aW9uJyk7XG5cbiAgICByb3V0ZSA9IHJvdXRlIHx8ICcvJztcblxuICAgIGlmIChjYiAmJiBjYi5fd2F5ZmFyZXIgJiYgY2IuX3RyaWUpIHtcbiAgICAgIF90cmllLm1vdW50KHJvdXRlLCBjYi5fdHJpZS50cmllKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG5vZGUgPSBfdHJpZS5jcmVhdGUocm91dGUpO1xuICAgICAgbm9kZS5jYiA9IGNiO1xuICAgIH1cblxuICAgIHJldHVybiBlbWl0O1xuICB9XG5cbiAgLy8gbWF0Y2ggYW5kIGNhbGwgYSByb3V0ZVxuICAvLyAoc3RyLCBvYmo/KSAtPiBudWxsXG4gIGZ1bmN0aW9uIGVtaXQocm91dGUpIHtcbiAgICBhc3NlcnQubm90RXF1YWwocm91dGUsIHVuZGVmaW5lZCwgXCIncm91dGUnIG11c3QgYmUgZGVmaW5lZFwiKTtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5hcHBseShhcmd1bWVudHMpO1xuXG4gICAgdmFyIG5vZGUgPSBfdHJpZS5tYXRjaChyb3V0ZSk7XG4gICAgaWYgKG5vZGUgJiYgbm9kZS5jYikge1xuICAgICAgYXJnc1swXSA9IG5vZGUucGFyYW1zO1xuICAgICAgcmV0dXJuIG5vZGUuY2IuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgfVxuXG4gICAgdmFyIGRmdCA9IF90cmllLm1hdGNoKF9kZWZhdWx0KTtcbiAgICBpZiAoZGZ0ICYmIGRmdC5jYikge1xuICAgICAgYXJnc1swXSA9IGRmdC5wYXJhbXM7XG4gICAgICByZXR1cm4gZGZ0LmNiLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgIH1cblxuICAgIHRocm93IG5ldyBFcnJvcihcInJvdXRlICdcIiArIHJvdXRlICsgXCInIGRpZCBub3QgbWF0Y2hcIik7XG4gIH1cbn1cbn0se1wiLi90cmllXCI6MjIsXCJhc3NlcnRcIjoyfV0sMjI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyIG11dGF0ZSA9IHJlcXVpcmUoJ3h0ZW5kL211dGFibGUnKTtcbnZhciBhc3NlcnQgPSByZXF1aXJlKCdhc3NlcnQnKTtcbnZhciB4dGVuZCA9IHJlcXVpcmUoJ3h0ZW5kJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gVHJpZTtcblxuLy8gY3JlYXRlIGEgbmV3IHRyaWVcbi8vIG51bGwgLT4gb2JqXG5mdW5jdGlvbiBUcmllKCkge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgVHJpZSkpIHJldHVybiBuZXcgVHJpZSgpO1xuICB0aGlzLnRyaWUgPSB7IG5vZGVzOiB7fSB9O1xufVxuXG4vLyBjcmVhdGUgYSBub2RlIG9uIHRoZSB0cmllIGF0IHJvdXRlXG4vLyBhbmQgcmV0dXJuIGEgbm9kZVxuLy8gc3RyIC0+IG51bGxcblRyaWUucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uIChyb3V0ZSkge1xuICBhc3NlcnQuZXF1YWwodHlwZW9mIHJvdXRlLCAnc3RyaW5nJywgJ3JvdXRlIHNob3VsZCBiZSBhIHN0cmluZycpO1xuICAvLyBzdHJpcCBsZWFkaW5nICcvJyBhbmQgc3BsaXQgcm91dGVzXG4gIHZhciByb3V0ZXMgPSByb3V0ZS5yZXBsYWNlKC9eXFwvLywgJycpLnNwbGl0KCcvJyk7XG4gIHJldHVybiBmdW5jdGlvbiBjcmVhdGVOb2RlKGluZGV4LCB0cmllLCByb3V0ZXMpIHtcbiAgICB2YXIgcm91dGUgPSByb3V0ZXNbaW5kZXhdO1xuXG4gICAgaWYgKHJvdXRlID09PSB1bmRlZmluZWQpIHJldHVybiB0cmllO1xuXG4gICAgdmFyIG5vZGUgPSBudWxsO1xuICAgIGlmICgvXjovLnRlc3Qocm91dGUpKSB7XG4gICAgICAvLyBpZiBub2RlIGlzIGEgbmFtZSBtYXRjaCwgc2V0IG5hbWUgYW5kIGFwcGVuZCB0byAnOicgbm9kZVxuICAgICAgaWYgKCF0cmllLm5vZGVzWyckJCddKSB7XG4gICAgICAgIG5vZGUgPSB7IG5vZGVzOiB7fSB9O1xuICAgICAgICB0cmllLm5vZGVzWyckJCddID0gbm9kZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vZGUgPSB0cmllLm5vZGVzWyckJCddO1xuICAgICAgfVxuICAgICAgdHJpZS5uYW1lID0gcm91dGUucmVwbGFjZSgvXjovLCAnJyk7XG4gICAgfSBlbHNlIGlmICghdHJpZS5ub2Rlc1tyb3V0ZV0pIHtcbiAgICAgIG5vZGUgPSB7IG5vZGVzOiB7fSB9O1xuICAgICAgdHJpZS5ub2Rlc1tyb3V0ZV0gPSBub2RlO1xuICAgIH0gZWxzZSB7XG4gICAgICBub2RlID0gdHJpZS5ub2Rlc1tyb3V0ZV07XG4gICAgfVxuXG4gICAgLy8gd2UgbXVzdCByZWN1cnNlIGRlZXBlclxuICAgIHJldHVybiBjcmVhdGVOb2RlKGluZGV4ICsgMSwgbm9kZSwgcm91dGVzKTtcbiAgfSgwLCB0aGlzLnRyaWUsIHJvdXRlcyk7XG59O1xuXG4vLyBtYXRjaCBhIHJvdXRlIG9uIHRoZSB0cmllXG4vLyBhbmQgcmV0dXJuIHRoZSBub2RlXG4vLyBzdHIgLT4gb2JqXG5UcmllLnByb3RvdHlwZS5tYXRjaCA9IGZ1bmN0aW9uIChyb3V0ZSkge1xuICBhc3NlcnQuZXF1YWwodHlwZW9mIHJvdXRlLCAnc3RyaW5nJywgJ3JvdXRlIHNob3VsZCBiZSBhIHN0cmluZycpO1xuXG4gIHZhciByb3V0ZXMgPSByb3V0ZS5yZXBsYWNlKC9eXFwvLywgJycpLnNwbGl0KCcvJyk7XG4gIHZhciBwYXJhbXMgPSB7fTtcblxuICB2YXIgbm9kZSA9IGZ1bmN0aW9uIHNlYXJjaChpbmRleCwgdHJpZSkge1xuICAgIC8vIGVpdGhlciB0aGVyZSdzIG5vIG1hdGNoLCBvciB3ZSdyZSBkb25lIHNlYXJjaGluZ1xuICAgIGlmICh0cmllID09PSB1bmRlZmluZWQpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgdmFyIHJvdXRlID0gcm91dGVzW2luZGV4XTtcbiAgICBpZiAocm91dGUgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRyaWU7XG5cbiAgICBpZiAodHJpZS5ub2Rlc1tyb3V0ZV0pIHtcbiAgICAgIC8vIG1hdGNoIHJlZ3VsYXIgcm91dGVzIGZpcnN0XG4gICAgICByZXR1cm4gc2VhcmNoKGluZGV4ICsgMSwgdHJpZS5ub2Rlc1tyb3V0ZV0pO1xuICAgIH0gZWxzZSBpZiAodHJpZS5uYW1lKSB7XG4gICAgICAvLyBtYXRjaCBuYW1lZCByb3V0ZXNcbiAgICAgIHBhcmFtc1t0cmllLm5hbWVdID0gcm91dGU7XG4gICAgICByZXR1cm4gc2VhcmNoKGluZGV4ICsgMSwgdHJpZS5ub2Rlc1snJCQnXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG5vIG1hdGNoZXMgZm91bmRcbiAgICAgIHJldHVybiBzZWFyY2goaW5kZXggKyAxKTtcbiAgICB9XG4gIH0oMCwgdGhpcy50cmllKTtcblxuICBpZiAoIW5vZGUpIHJldHVybiB1bmRlZmluZWQ7XG4gIG5vZGUgPSB4dGVuZChub2RlKTtcbiAgbm9kZS5wYXJhbXMgPSBwYXJhbXM7XG4gIHJldHVybiBub2RlO1xufTtcblxuLy8gbW91bnQgYSB0cmllIG9udG8gYSBub2RlIGF0IHJvdXRlXG4vLyAoc3RyLCBvYmopIC0+IG51bGxcblRyaWUucHJvdG90eXBlLm1vdW50ID0gZnVuY3Rpb24gKHJvdXRlLCB0cmllKSB7XG4gIGFzc2VydC5lcXVhbCh0eXBlb2Ygcm91dGUsICdzdHJpbmcnLCAncm91dGUgc2hvdWxkIGJlIGEgc3RyaW5nJyk7XG4gIGFzc2VydC5lcXVhbCh0eXBlb2YgdHJpZSwgJ29iamVjdCcsICd0cmllIHNob3VsZCBiZSBhIG9iamVjdCcpO1xuXG4gIHZhciBzcGxpdCA9IHJvdXRlLnJlcGxhY2UoL15cXC8vLCAnJykuc3BsaXQoJy8nKTtcbiAgdmFyIG5vZGUgPSBudWxsO1xuICB2YXIga2V5ID0gbnVsbDtcblxuICBpZiAoc3BsaXQubGVuZ3RoID09PSAxKSB7XG4gICAga2V5ID0gc3BsaXRbMF07XG4gICAgbm9kZSA9IHRoaXMuY3JlYXRlKGtleSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIGhlYWRBcnIgPSBzcGxpdC5zcGxpY2UoMCwgc3BsaXQubGVuZ3RoIC0gMSk7XG4gICAgdmFyIGhlYWQgPSBoZWFkQXJyLmpvaW4oJy8nKTtcbiAgICBrZXkgPSBzcGxpdFswXTtcbiAgICBub2RlID0gdGhpcy5jcmVhdGUoaGVhZCk7XG4gIH1cblxuICBtdXRhdGUobm9kZS5ub2RlcywgdHJpZS5ub2Rlcyk7XG4gIGlmICh0cmllLm5hbWUpIG5vZGUubmFtZSA9IHRyaWUubmFtZTtcblxuICAvLyBkZWxlZ2F0ZSBwcm9wZXJ0aWVzIGZyb20gJy8nIHRvIHRoZSBuZXcgbm9kZVxuICAvLyAnLycgY2Fubm90IGJlIHJlYWNoZWQgb25jZSBtb3VudGVkXG4gIGlmIChub2RlLm5vZGVzWycnXSkge1xuICAgIE9iamVjdC5rZXlzKG5vZGUubm9kZXNbJyddKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGlmIChrZXkgPT09ICdub2RlcycpIHJldHVybjtcbiAgICAgIG5vZGVba2V5XSA9IG5vZGUubm9kZXNbJyddW2tleV07XG4gICAgfSk7XG4gICAgbXV0YXRlKG5vZGUubm9kZXMsIG5vZGUubm9kZXNbJyddLm5vZGVzKTtcbiAgICBkZWxldGUgbm9kZS5ub2Rlc1snJ10ubm9kZXM7XG4gIH1cbn07XG59LHtcImFzc2VydFwiOjIsXCJ4dGVuZFwiOjIzLFwieHRlbmQvbXV0YWJsZVwiOjI0fV0sMjM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBleHRlbmQ7XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIGV4dGVuZCgpIHtcbiAgICB2YXIgdGFyZ2V0ID0ge307XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xufVxufSx7fV0sMjQ6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBleHRlbmQ7XG5cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbmZ1bmN0aW9uIGV4dGVuZCh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xufVxufSx7fV0sMjU6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyIGJlbCA9IHt9OyAvLyB0dXJucyB0ZW1wbGF0ZSB0YWcgaW50byBET00gZWxlbWVudHNcbnZhciBtb3JwaGRvbSA9IHJlcXVpcmUoJ21vcnBoZG9tJyk7IC8vIGVmZmljaWVudGx5IGRpZmZzICsgbW9ycGhzIHR3byBET00gZWxlbWVudHNcbnZhciBkZWZhdWx0RXZlbnRzID0gcmVxdWlyZSgnLi91cGRhdGUtZXZlbnRzLmpzJyk7IC8vIGRlZmF1bHQgZXZlbnRzIHRvIGJlIGNvcGllZCB3aGVuIGRvbSBlbGVtZW50cyB1cGRhdGVcblxubW9kdWxlLmV4cG9ydHMgPSBiZWw7XG5cbi8vIFRPRE8gbW92ZSB0aGlzICsgZGVmYXVsdEV2ZW50cyB0byBhIG5ldyBtb2R1bGUgb25jZSB3ZSByZWNlaXZlIG1vcmUgZmVlZGJhY2tcbm1vZHVsZS5leHBvcnRzLnVwZGF0ZSA9IGZ1bmN0aW9uIChmcm9tTm9kZSwgdG9Ob2RlLCBvcHRzKSB7XG4gIGlmICghb3B0cykgb3B0cyA9IHt9O1xuICBpZiAob3B0cy5ldmVudHMgIT09IGZhbHNlKSB7XG4gICAgaWYgKCFvcHRzLm9uQmVmb3JlTW9ycGhFbCkgb3B0cy5vbkJlZm9yZU1vcnBoRWwgPSBjb3BpZXI7XG4gIH1cblxuICByZXR1cm4gbW9ycGhkb20oZnJvbU5vZGUsIHRvTm9kZSwgb3B0cyk7XG5cbiAgLy8gbW9ycGhkb20gb25seSBjb3BpZXMgYXR0cmlidXRlcy4gd2UgZGVjaWRlZCB3ZSBhbHNvIHdhbnRlZCB0byBjb3B5IGV2ZW50c1xuICAvLyB0aGF0IGNhbiBiZSBzZXQgdmlhIGF0dHJpYnV0ZXNcbiAgZnVuY3Rpb24gY29waWVyKGYsIHQpIHtcbiAgICAvLyBjb3B5IGV2ZW50czpcbiAgICB2YXIgZXZlbnRzID0gb3B0cy5ldmVudHMgfHwgZGVmYXVsdEV2ZW50cztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGV2ID0gZXZlbnRzW2ldO1xuICAgICAgaWYgKHRbZXZdKSB7XG4gICAgICAgIC8vIGlmIG5ldyBlbGVtZW50IGhhcyBhIHdoaXRlbGlzdGVkIGF0dHJpYnV0ZVxuICAgICAgICBmW2V2XSA9IHRbZXZdOyAvLyB1cGRhdGUgZXhpc3RpbmcgZWxlbWVudFxuICAgICAgfSBlbHNlIGlmIChmW2V2XSkge1xuICAgICAgICAvLyBpZiBleGlzdGluZyBlbGVtZW50IGhhcyBpdCBhbmQgbmV3IG9uZSBkb2VzbnRcbiAgICAgICAgZltldl0gPSB1bmRlZmluZWQ7IC8vIHJlbW92ZSBpdCBmcm9tIGV4aXN0aW5nIGVsZW1lbnRcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gY29weSB2YWx1ZXMgZm9yIGZvcm0gZWxlbWVudHNcbiAgICBpZiAoZi5ub2RlTmFtZSA9PT0gJ0lOUFVUJyAmJiBmLnR5cGUgIT09ICdmaWxlJyB8fCBmLm5vZGVOYW1lID09PSAnVEVYVEFSRUEnIHx8IGYubm9kZU5hbWUgPT09ICdTRUxFQ1QnKSB7XG4gICAgICBpZiAodC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykgPT09IG51bGwpIHQudmFsdWUgPSBmLnZhbHVlO1xuICAgIH1cbiAgfVxufTtcbn0se1wiLi91cGRhdGUtZXZlbnRzLmpzXCI6MjYsXCJtb3JwaGRvbVwiOjEyfV0sMjY6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xubW9kdWxlLmV4cG9ydHMgPSBbXG4vLyBhdHRyaWJ1dGUgZXZlbnRzIChjYW4gYmUgc2V0IHdpdGggYXR0cmlidXRlcylcbidvbmNsaWNrJywgJ29uZGJsY2xpY2snLCAnb25tb3VzZWRvd24nLCAnb25tb3VzZXVwJywgJ29ubW91c2VvdmVyJywgJ29ubW91c2Vtb3ZlJywgJ29ubW91c2VvdXQnLCAnb25kcmFnc3RhcnQnLCAnb25kcmFnJywgJ29uZHJhZ2VudGVyJywgJ29uZHJhZ2xlYXZlJywgJ29uZHJhZ292ZXInLCAnb25kcm9wJywgJ29uZHJhZ2VuZCcsICdvbmtleWRvd24nLCAnb25rZXlwcmVzcycsICdvbmtleXVwJywgJ29udW5sb2FkJywgJ29uYWJvcnQnLCAnb25lcnJvcicsICdvbnJlc2l6ZScsICdvbnNjcm9sbCcsICdvbnNlbGVjdCcsICdvbmNoYW5nZScsICdvbnN1Ym1pdCcsICdvbnJlc2V0JywgJ29uZm9jdXMnLCAnb25ibHVyJywgJ29uaW5wdXQnLFxuLy8gb3RoZXIgY29tbW9uIGV2ZW50c1xuJ29uY29udGV4dG1lbnUnLCAnb25mb2N1c2luJywgJ29uZm9jdXNvdXQnXTtcbn0se31dfSx7fSxbMV0pKDEpXG59KTsiLCJjb25zdCBlcnJvciA9IChkYXRhLCBzdGF0ZSkgPT4ge1xuICByZXR1cm4geyBlcnJvcjogZGF0YSB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZXNwYWNlOiAnYXBwJyxcbiAgc3RhdGU6IHtcbiAgICB0aXRsZTogJ05vIEZsYXNoJyxcbiAgICB0YWdsaW5lOiAnVHJhY2sgc3VtbW9uZXIgc3BlbGxzJyxcbiAgICBlcnJvcjogJydcbiAgfSxcbiAgcmVkdWNlcnM6IHsgZXJyb3IgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBleHRlbmRcblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxuZnVuY3Rpb24gZXh0ZW5kKCkge1xuICAgIHZhciB0YXJnZXQgPSB7fVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXVxuXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXRcbn1cbiIsImltcG9ydCB4dGVuZCBmcm9tICd4dGVuZCdcblxuY29uc3QgZGVjcmVtZW50Q29vbGRvd24gPSAoc3BlbGwsIGFtb3VudCkgPT4ge1xuICBjb25zdCBuZXdTcGVsbCA9IHh0ZW5kKHt9LCBzcGVsbCwgeyBjb29sZG93bjogc3BlbGwuY29vbGRvd24gLSBhbW91bnQgfSlcbiAgaWYgKG5ld1NwZWxsLmNvb2xkb3duIDw9IDApIHtcbiAgICBuZXdTcGVsbC5jb29sZG93biA9IDBcbiAgICBuZXdTcGVsbC5zdGF0ZSA9ICdhdmFpbGFibGUnXG4gIH1cbiAgcmV0dXJuIG5ld1NwZWxsXG59XG5cbmV4cG9ydCBjb25zdCBzdW1tb25lciA9IChkYXRhLCBzdGF0ZSkgPT4gKHsgc3VtbW9uZXI6IGRhdGEgfSlcblxuZXhwb3J0IGNvbnN0IGVubmVtaWVzID0gKGRhdGEsIHN0YXRlKSA9PiAoeyBlbm5lbWllczogZGF0YSB9KVxuXG5leHBvcnQgY29uc3QgdXBkYXRlU3BlbGwgPSAoZGF0YSwgc3RhdGUpID0+ICh7XG4gIGVubmVtaWVzOiBzdGF0ZS5lbm5lbWllcy5tYXAoZW5uZW15ID0+IHtcbiAgICBlbm5lbXkuc3BlbGxzID0gZW5uZW15LnNwZWxscy5tYXAoc3BlbGwgPT4ge1xuICAgICAgaWYgKHNwZWxsLnVpZCA9PT0gZGF0YS51aWQpIHtcbiAgICAgICAgcmV0dXJuIHh0ZW5kKHt9LCBzcGVsbCwgZGF0YSlcbiAgICAgIH1cbiAgICAgIHJldHVybiBzcGVsbFxuICAgIH0pXG4gICAgcmV0dXJuIGVubmVteVxuICB9KVxufSlcblxuZXhwb3J0IGNvbnN0IGRlY3JlbWVudFNwZWxsQ29vbGRvd24gPSAoZGF0YSwgc3RhdGUpID0+ICh7XG4gIGVubmVtaWVzOiBzdGF0ZS5lbm5lbWllcy5tYXAoZW5uZW15ID0+IHtcbiAgICBlbm5lbXkuc3BlbGxzID0gZW5uZW15LnNwZWxscy5tYXAoc3BlbGwgPT4ge1xuICAgICAgaWYgKHNwZWxsLnVpZCA9PT0gZGF0YS51aWQgJiYgJ2Nvb2xkb3duJyA9PT0gc3BlbGwuc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIGRlY3JlbWVudENvb2xkb3duKHNwZWxsLCBkYXRhLmFtb3VudClcbiAgICAgIH1cbiAgICAgIHJldHVybiBzcGVsbFxuICAgIH0pXG4gICAgcmV0dXJuIGVubmVteVxuICB9KVxufSlcblxuZXhwb3J0IGNvbnN0IGRlY3JlbWVudEFsbFNwZWxsc0Nvb2xkb3duID0gKGFtb3VudCwgc3RhdGUpID0+ICh7XG4gIGVubmVtaWVzOiBzdGF0ZS5lbm5lbWllcy5tYXAoZW5uZW15ID0+IHtcbiAgICBlbm5lbXkuc3BlbGxzID0gZW5uZW15LnNwZWxscy5tYXAoc3BlbGwgPT4ge1xuICAgICAgaWYgKCdjb29sZG93bicgPT09IHNwZWxsLnN0YXRlKSB7XG4gICAgICAgIHJldHVybiBkZWNyZW1lbnRDb29sZG93bihzcGVsbCwgYW1vdW50KVxuICAgICAgfVxuICAgICAgcmV0dXJuIHNwZWxsXG4gICAgfSlcbiAgICByZXR1cm4gZW5uZW15XG4gIH0pXG59KVxuIiwiKGZ1bmN0aW9uKHNlbGYpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGlmIChzZWxmLmZldGNoKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgc3VwcG9ydCA9IHtcbiAgICBzZWFyY2hQYXJhbXM6ICdVUkxTZWFyY2hQYXJhbXMnIGluIHNlbGYsXG4gICAgaXRlcmFibGU6ICdTeW1ib2wnIGluIHNlbGYgJiYgJ2l0ZXJhdG9yJyBpbiBTeW1ib2wsXG4gICAgYmxvYjogJ0ZpbGVSZWFkZXInIGluIHNlbGYgJiYgJ0Jsb2InIGluIHNlbGYgJiYgKGZ1bmN0aW9uKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbmV3IEJsb2IoKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pKCksXG4gICAgZm9ybURhdGE6ICdGb3JtRGF0YScgaW4gc2VsZixcbiAgICBhcnJheUJ1ZmZlcjogJ0FycmF5QnVmZmVyJyBpbiBzZWxmXG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVOYW1lKG5hbWUpIHtcbiAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICBuYW1lID0gU3RyaW5nKG5hbWUpXG4gICAgfVxuICAgIGlmICgvW15hLXowLTlcXC0jJCUmJyorLlxcXl9gfH5dL2kudGVzdChuYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBjaGFyYWN0ZXIgaW4gaGVhZGVyIGZpZWxkIG5hbWUnKVxuICAgIH1cbiAgICByZXR1cm4gbmFtZS50b0xvd2VyQ2FzZSgpXG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSlcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICAvLyBCdWlsZCBhIGRlc3RydWN0aXZlIGl0ZXJhdG9yIGZvciB0aGUgdmFsdWUgbGlzdFxuICBmdW5jdGlvbiBpdGVyYXRvckZvcihpdGVtcykge1xuICAgIHZhciBpdGVyYXRvciA9IHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBpdGVtcy5zaGlmdCgpXG4gICAgICAgIHJldHVybiB7ZG9uZTogdmFsdWUgPT09IHVuZGVmaW5lZCwgdmFsdWU6IHZhbHVlfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgICBpdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvclxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpdGVyYXRvclxuICB9XG5cbiAgZnVuY3Rpb24gSGVhZGVycyhoZWFkZXJzKSB7XG4gICAgdGhpcy5tYXAgPSB7fVxuXG4gICAgaWYgKGhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzKSB7XG4gICAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgdmFsdWUpXG4gICAgICB9LCB0aGlzKVxuXG4gICAgfSBlbHNlIGlmIChoZWFkZXJzKSB7XG4gICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhoZWFkZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgaGVhZGVyc1tuYW1lXSlcbiAgICAgIH0sIHRoaXMpXG4gICAgfVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICBuYW1lID0gbm9ybWFsaXplTmFtZShuYW1lKVxuICAgIHZhbHVlID0gbm9ybWFsaXplVmFsdWUodmFsdWUpXG4gICAgdmFyIGxpc3QgPSB0aGlzLm1hcFtuYW1lXVxuICAgIGlmICghbGlzdCkge1xuICAgICAgbGlzdCA9IFtdXG4gICAgICB0aGlzLm1hcFtuYW1lXSA9IGxpc3RcbiAgICB9XG4gICAgbGlzdC5wdXNoKHZhbHVlKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGVbJ2RlbGV0ZSddID0gZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciB2YWx1ZXMgPSB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXVxuICAgIHJldHVybiB2YWx1ZXMgPyB2YWx1ZXNbMF0gOiBudWxsXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5nZXRBbGwgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldIHx8IFtdXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwLmhhc093blByb3BlcnR5KG5vcm1hbGl6ZU5hbWUobmFtZSkpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldID0gW25vcm1hbGl6ZVZhbHVlKHZhbHVlKV1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMubWFwKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHRoaXMubWFwW25hbWVdLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB2YWx1ZSwgbmFtZSwgdGhpcylcbiAgICAgIH0sIHRoaXMpXG4gICAgfSwgdGhpcylcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkgeyBpdGVtcy5wdXNoKG5hbWUpIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHsgaXRlbXMucHVzaCh2YWx1ZSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHsgaXRlbXMucHVzaChbbmFtZSwgdmFsdWVdKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgSGVhZGVycy5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN1bWVkKGJvZHkpIHtcbiAgICBpZiAoYm9keS5ib2R5VXNlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpKVxuICAgIH1cbiAgICBib2R5LmJvZHlVc2VkID0gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsZVJlYWRlclJlYWR5KHJlYWRlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZShyZWFkZXIucmVzdWx0KVxuICAgICAgfVxuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc0FycmF5QnVmZmVyKGJsb2IpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKVxuICAgIHJldHVybiBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc1RleHQoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgcmVhZGVyLnJlYWRBc1RleHQoYmxvYilcbiAgICByZXR1cm4gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgfVxuXG4gIGZ1bmN0aW9uIEJvZHkoKSB7XG4gICAgdGhpcy5ib2R5VXNlZCA9IGZhbHNlXG5cbiAgICB0aGlzLl9pbml0Qm9keSA9IGZ1bmN0aW9uKGJvZHkpIHtcbiAgICAgIHRoaXMuX2JvZHlJbml0ID0gYm9keVxuICAgICAgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5ibG9iICYmIEJsb2IucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUJsb2IgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuZm9ybURhdGEgJiYgRm9ybURhdGEucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUZvcm1EYXRhID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5LnRvU3RyaW5nKClcbiAgICAgIH0gZWxzZSBpZiAoIWJvZHkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSAnJ1xuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIEFycmF5QnVmZmVyLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgIC8vIE9ubHkgc3VwcG9ydCBBcnJheUJ1ZmZlcnMgZm9yIFBPU1QgbWV0aG9kLlxuICAgICAgICAvLyBSZWNlaXZpbmcgQXJyYXlCdWZmZXJzIGhhcHBlbnMgdmlhIEJsb2JzLCBpbnN0ZWFkLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnN1cHBvcnRlZCBCb2R5SW5pdCB0eXBlJylcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkge1xuICAgICAgICBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ3RleHQvcGxhaW47Y2hhcnNldD1VVEYtOCcpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUJsb2IgJiYgdGhpcy5fYm9keUJsb2IudHlwZSkge1xuICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsIHRoaXMuX2JvZHlCbG9iLnR5cGUpXG4gICAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04JylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXBwb3J0LmJsb2IpIHtcbiAgICAgIHRoaXMuYmxvYiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0ZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keUJsb2IpXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUZvcm1EYXRhKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIGJsb2InKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IEJsb2IoW3RoaXMuX2JvZHlUZXh0XSkpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5hcnJheUJ1ZmZlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ibG9iKCkudGhlbihyZWFkQmxvYkFzQXJyYXlCdWZmZXIpXG4gICAgICB9XG5cbiAgICAgIHRoaXMudGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0ZWRcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICAgIHJldHVybiByZWFkQmxvYkFzVGV4dCh0aGlzLl9ib2R5QmxvYilcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgdGV4dCcpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5VGV4dClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcylcbiAgICAgICAgcmV0dXJuIHJlamVjdGVkID8gcmVqZWN0ZWQgOiBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keVRleHQpXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuZm9ybURhdGEpIHtcbiAgICAgIHRoaXMuZm9ybURhdGEgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oZGVjb2RlKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuanNvbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oSlNPTi5wYXJzZSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLy8gSFRUUCBtZXRob2RzIHdob3NlIGNhcGl0YWxpemF0aW9uIHNob3VsZCBiZSBub3JtYWxpemVkXG4gIHZhciBtZXRob2RzID0gWydERUxFVEUnLCAnR0VUJywgJ0hFQUQnLCAnT1BUSU9OUycsICdQT1NUJywgJ1BVVCddXG5cbiAgZnVuY3Rpb24gbm9ybWFsaXplTWV0aG9kKG1ldGhvZCkge1xuICAgIHZhciB1cGNhc2VkID0gbWV0aG9kLnRvVXBwZXJDYXNlKClcbiAgICByZXR1cm4gKG1ldGhvZHMuaW5kZXhPZih1cGNhc2VkKSA+IC0xKSA/IHVwY2FzZWQgOiBtZXRob2RcbiAgfVxuXG4gIGZ1bmN0aW9uIFJlcXVlc3QoaW5wdXQsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICAgIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5XG4gICAgaWYgKFJlcXVlc3QucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoaW5wdXQpKSB7XG4gICAgICBpZiAoaW5wdXQuYm9keVVzZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQWxyZWFkeSByZWFkJylcbiAgICAgIH1cbiAgICAgIHRoaXMudXJsID0gaW5wdXQudXJsXG4gICAgICB0aGlzLmNyZWRlbnRpYWxzID0gaW5wdXQuY3JlZGVudGlhbHNcbiAgICAgIGlmICghb3B0aW9ucy5oZWFkZXJzKSB7XG4gICAgICAgIHRoaXMuaGVhZGVycyA9IG5ldyBIZWFkZXJzKGlucHV0LmhlYWRlcnMpXG4gICAgICB9XG4gICAgICB0aGlzLm1ldGhvZCA9IGlucHV0Lm1ldGhvZFxuICAgICAgdGhpcy5tb2RlID0gaW5wdXQubW9kZVxuICAgICAgaWYgKCFib2R5KSB7XG4gICAgICAgIGJvZHkgPSBpbnB1dC5fYm9keUluaXRcbiAgICAgICAgaW5wdXQuYm9keVVzZWQgPSB0cnVlXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXJsID0gaW5wdXRcbiAgICB9XG5cbiAgICB0aGlzLmNyZWRlbnRpYWxzID0gb3B0aW9ucy5jcmVkZW50aWFscyB8fCB0aGlzLmNyZWRlbnRpYWxzIHx8ICdvbWl0J1xuICAgIGlmIChvcHRpb25zLmhlYWRlcnMgfHwgIXRoaXMuaGVhZGVycykge1xuICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICAgIH1cbiAgICB0aGlzLm1ldGhvZCA9IG5vcm1hbGl6ZU1ldGhvZChvcHRpb25zLm1ldGhvZCB8fCB0aGlzLm1ldGhvZCB8fCAnR0VUJylcbiAgICB0aGlzLm1vZGUgPSBvcHRpb25zLm1vZGUgfHwgdGhpcy5tb2RlIHx8IG51bGxcbiAgICB0aGlzLnJlZmVycmVyID0gbnVsbFxuXG4gICAgaWYgKCh0aGlzLm1ldGhvZCA9PT0gJ0dFVCcgfHwgdGhpcy5tZXRob2QgPT09ICdIRUFEJykgJiYgYm9keSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9keSBub3QgYWxsb3dlZCBmb3IgR0VUIG9yIEhFQUQgcmVxdWVzdHMnKVxuICAgIH1cbiAgICB0aGlzLl9pbml0Qm9keShib2R5KVxuICB9XG5cbiAgUmVxdWVzdC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFJlcXVlc3QodGhpcylcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlY29kZShib2R5KSB7XG4gICAgdmFyIGZvcm0gPSBuZXcgRm9ybURhdGEoKVxuICAgIGJvZHkudHJpbSgpLnNwbGl0KCcmJykuZm9yRWFjaChmdW5jdGlvbihieXRlcykge1xuICAgICAgaWYgKGJ5dGVzKSB7XG4gICAgICAgIHZhciBzcGxpdCA9IGJ5dGVzLnNwbGl0KCc9JylcbiAgICAgICAgdmFyIG5hbWUgPSBzcGxpdC5zaGlmdCgpLnJlcGxhY2UoL1xcKy9nLCAnICcpXG4gICAgICAgIHZhciB2YWx1ZSA9IHNwbGl0LmpvaW4oJz0nKS5yZXBsYWNlKC9cXCsvZywgJyAnKVxuICAgICAgICBmb3JtLmFwcGVuZChkZWNvZGVVUklDb21wb25lbnQobmFtZSksIGRlY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZm9ybVxuICB9XG5cbiAgZnVuY3Rpb24gaGVhZGVycyh4aHIpIHtcbiAgICB2YXIgaGVhZCA9IG5ldyBIZWFkZXJzKClcbiAgICB2YXIgcGFpcnMgPSAoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpIHx8ICcnKS50cmltKCkuc3BsaXQoJ1xcbicpXG4gICAgcGFpcnMuZm9yRWFjaChmdW5jdGlvbihoZWFkZXIpIHtcbiAgICAgIHZhciBzcGxpdCA9IGhlYWRlci50cmltKCkuc3BsaXQoJzonKVxuICAgICAgdmFyIGtleSA9IHNwbGl0LnNoaWZ0KCkudHJpbSgpXG4gICAgICB2YXIgdmFsdWUgPSBzcGxpdC5qb2luKCc6JykudHJpbSgpXG4gICAgICBoZWFkLmFwcGVuZChrZXksIHZhbHVlKVxuICAgIH0pXG4gICAgcmV0dXJuIGhlYWRcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXF1ZXN0LnByb3RvdHlwZSlcblxuICBmdW5jdGlvbiBSZXNwb25zZShib2R5SW5pdCwgb3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHt9XG4gICAgfVxuXG4gICAgdGhpcy50eXBlID0gJ2RlZmF1bHQnXG4gICAgdGhpcy5zdGF0dXMgPSBvcHRpb25zLnN0YXR1c1xuICAgIHRoaXMub2sgPSB0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDBcbiAgICB0aGlzLnN0YXR1c1RleHQgPSBvcHRpb25zLnN0YXR1c1RleHRcbiAgICB0aGlzLmhlYWRlcnMgPSBvcHRpb25zLmhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzID8gb3B0aW9ucy5oZWFkZXJzIDogbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICAgIHRoaXMudXJsID0gb3B0aW9ucy51cmwgfHwgJydcbiAgICB0aGlzLl9pbml0Qm9keShib2R5SW5pdClcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXNwb25zZS5wcm90b3R5cGUpXG5cbiAgUmVzcG9uc2UucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZSh0aGlzLl9ib2R5SW5pdCwge1xuICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgIHN0YXR1c1RleHQ6IHRoaXMuc3RhdHVzVGV4dCxcbiAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHRoaXMuaGVhZGVycyksXG4gICAgICB1cmw6IHRoaXMudXJsXG4gICAgfSlcbiAgfVxuXG4gIFJlc3BvbnNlLmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IDAsIHN0YXR1c1RleHQ6ICcnfSlcbiAgICByZXNwb25zZS50eXBlID0gJ2Vycm9yJ1xuICAgIHJldHVybiByZXNwb25zZVxuICB9XG5cbiAgdmFyIHJlZGlyZWN0U3RhdHVzZXMgPSBbMzAxLCAzMDIsIDMwMywgMzA3LCAzMDhdXG5cbiAgUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbih1cmwsIHN0YXR1cykge1xuICAgIGlmIChyZWRpcmVjdFN0YXR1c2VzLmluZGV4T2Yoc3RhdHVzKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHN0YXR1cyBjb2RlJylcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IHN0YXR1cywgaGVhZGVyczoge2xvY2F0aW9uOiB1cmx9fSlcbiAgfVxuXG4gIHNlbGYuSGVhZGVycyA9IEhlYWRlcnNcbiAgc2VsZi5SZXF1ZXN0ID0gUmVxdWVzdFxuICBzZWxmLlJlc3BvbnNlID0gUmVzcG9uc2VcblxuICBzZWxmLmZldGNoID0gZnVuY3Rpb24oaW5wdXQsIGluaXQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVxdWVzdFxuICAgICAgaWYgKFJlcXVlc3QucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoaW5wdXQpICYmICFpbml0KSB7XG4gICAgICAgIHJlcXVlc3QgPSBpbnB1dFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KVxuICAgICAgfVxuXG4gICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcblxuICAgICAgZnVuY3Rpb24gcmVzcG9uc2VVUkwoKSB7XG4gICAgICAgIGlmICgncmVzcG9uc2VVUkwnIGluIHhocikge1xuICAgICAgICAgIHJldHVybiB4aHIucmVzcG9uc2VVUkxcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEF2b2lkIHNlY3VyaXR5IHdhcm5pbmdzIG9uIGdldFJlc3BvbnNlSGVhZGVyIHdoZW4gbm90IGFsbG93ZWQgYnkgQ09SU1xuICAgICAgICBpZiAoL15YLVJlcXVlc3QtVVJMOi9tLnRlc3QoeGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSkge1xuICAgICAgICAgIHJldHVybiB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ1gtUmVxdWVzdC1VUkwnKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgc3RhdHVzOiB4aHIuc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgICAgIGhlYWRlcnM6IGhlYWRlcnMoeGhyKSxcbiAgICAgICAgICB1cmw6IHJlc3BvbnNlVVJMKClcbiAgICAgICAgfVxuICAgICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICByZXNvbHZlKG5ldyBSZXNwb25zZShib2R5LCBvcHRpb25zKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfVxuXG4gICAgICB4aHIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgcmVxdWVzdC51cmwsIHRydWUpXG5cbiAgICAgIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnaW5jbHVkZScpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKCdyZXNwb25zZVR5cGUnIGluIHhociAmJiBzdXBwb3J0LmJsb2IpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJ1xuICAgICAgfVxuXG4gICAgICByZXF1ZXN0LmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZSlcbiAgICAgIH0pXG5cbiAgICAgIHhoci5zZW5kKHR5cGVvZiByZXF1ZXN0Ll9ib2R5SW5pdCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogcmVxdWVzdC5fYm9keUluaXQpXG4gICAgfSlcbiAgfVxuICBzZWxmLmZldGNoLnBvbHlmaWxsID0gdHJ1ZVxufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMpO1xuIiwiJ3VzZSBzdHJpY3QnXG5cbi8qKlxuICogR2VuZXJhdGUgYSBmdW5jdGlvbiBmb3Igc2VxdWVuY2VzIG9mIHJlLXVzYWJsZSBJRHMuXG4gKlxuICogQHBhcmFtIHByZWZpeCB7c3RyaW5nfVxuICogQHBhcmFtIHN1ZmZpeCB7c3RyaW5nfVxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChwcmVmaXgsIHN1ZmZpeCkge1xuICB2YXIgaWQgPSAwXG5cbiAgcHJlZml4ID0gcHJlZml4IHx8ICcnXG4gIHN1ZmZpeCA9IHN1ZmZpeCB8fCAnJ1xuXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHByZWZpeCArIChpZCsrKSArIHN1ZmZpeFxuICB9XG59XG4iLCJpbXBvcnQgZmV0Y2ggZnJvbSAnd2hhdHdnLWZldGNoJ1xuaW1wb3J0IGNoYW1waW9ucyBmcm9tICdsb2wtY2hhbXBpb25zJ1xuaW1wb3J0IHNwZWxscyBmcm9tICdsb2wtc3BlbGxzJ1xuaW1wb3J0IHVuaXF1ZWlkIGZyb20gJ3VuaXF1ZWlkJ1xuaW1wb3J0IHh0ZW5kIGZyb20gJ3h0ZW5kJ1xuXG5jb25zdCB1aWQgPSB1bmlxdWVpZCgpXG5cbmNvbnN0IGFwaUtleSA9ICc4MWQwMDc5Ni1kMmEyLTRlOGUtYjExMi0yYzIwYzdlZjYwYzAnXG5jb25zdCBiYXNlVXJsID0gJ2h0dHBzOi8vZXV3LmFwaS5wdnAubmV0J1xuY29uc3QgYXBpVXJsID0gYCR7YmFzZVVybH0vYXBpL2xvbC9ldXcvdjEuNGBcblxuZXhwb3J0IGNvbnN0IGZldGNoU3VtbW9uZXIgPSAobmFtZSkgPT4ge1xuICBjb25zdCB1cmwgPSBgJHthcGlVcmx9L3N1bW1vbmVyL2J5LW5hbWUvJHtuYW1lfT9hcGlfa2V5PSR7YXBpS2V5fWBcblxuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHJlc29sdmUoe1xuICAgICAgaWQ6IDcyNTE3MDgxLFxuICAgICAgbmFtZTogXCJuZ3J5Z29kXCIsXG4gICAgICBwcm9maWxlSWNvbklkOiA5NTYsXG4gICAgICByZXZpc2lvbkRhdGU6IDE0NzY3MDQ4MDAwMDAsXG4gICAgICBzdW1tb25lckxldmVsOiAzMFxuICAgIH0pXG4gICAgcmV0dXJuXG5cbiAgICAvLyBUT0RPOiBmZXRjaFxuICAgIC8vIGh0dHAodXJsLCAoZXJyLCByZXMsIGJvZHkpID0+IHtcbiAgICAvLyAgIGNvbnN0IGpzb24gPSBKU09OLnBhcnNlKGJvZHkpXG4gICAgLy8gICBjb25zdCBzdW1tb25lciA9IGpzb25bbmFtZS50b0xvd2VyQ2FzZSgpXVxuICAgIC8vXG4gICAgLy8gICBpZiAoc3VtbW9uZXIpIHtcbiAgICAvLyAgICAgcmVzb2x2ZShzdW1tb25lcilcbiAgICAvLyAgIH1cbiAgICAvLyAgIGVsc2Uge1xuICAgIC8vICAgICByZWplY3QoJ05vIHN1bW1vbmVyIGZvdW5kLicpXG4gICAgLy8gICB9XG4gICAgLy8gfSlcbiAgfSlcbn1cblxuY29uc3QgY3JlYXRlU3BlbGwgPSAoaWQpID0+IHtcbiAgY29uc3Qgc3BlbGwgPSBzcGVsbHMuZmluZChzID0+IHMuaWQgPT09IGlkKVxuICByZXR1cm4geHRlbmQoe30sIHNwZWxsLCB7XG4gICAgdWlkOiB1aWQoKSxcbiAgICBzdGF0ZTogJ2F2YWlsYWJsZScsXG4gICAgY29vbGRvd246IDAsXG4gICAgcmVmQ29vbGRvd246IHNwZWxsLmNvb2xkb3duXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBmZXRjaEVubmVtaWVzID0gKHN1bW1vbmVyKSA9PiB7XG4gIGNvbnN0IHVybCA9IGAke2FwaVVybH0vb2JzZXJ2ZXItbW9kZS9yZXN0L2NvbnN1bWVyL2dldFNwZWN0YXRvckdhbWVJbmZvL0VVVzEvJHtzdW1tb25lci5pZH0/YXBpX2tleT0ke2FwaUtleX1gXG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICByZXNvbHZlKFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ1ZvY3lmZXJhMTInLFxuICAgICAgICByb2xlOiAnVG9wJyxcbiAgICAgICAgY2hhbXBpb246IGNoYW1waW9ucy5maW5kKGMgPT4gYy5pZCA9PT0gJ2pheCcpLFxuICAgICAgICBzcGVsbHM6IFtcbiAgICAgICAgICBjcmVhdGVTcGVsbCgndGVsZXBvcnQnKSxcbiAgICAgICAgICBjcmVhdGVTcGVsbCgnaGFzdGUnKVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAncGh1Y3RyYW4nLFxuICAgICAgICByb2xlOiAnSnVuZ2xlJyxcbiAgICAgICAgY2hhbXBpb246IGNoYW1waW9ucy5maW5kKGMgPT4gYy5pZCA9PT0gJ29sYWYnKSxcbiAgICAgICAgc3BlbGxzOiBbXG4gICAgICAgICAgY3JlYXRlU3BlbGwoJ3NtaXRlJyksXG4gICAgICAgICAgY3JlYXRlU3BlbGwoJ2hhc3RlJylcbiAgICAgICAgXVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ01yIE92ZXInLFxuICAgICAgICByb2xlOiAnTWlkJyxcbiAgICAgICAgY2hhbXBpb246IGNoYW1waW9ucy5maW5kKGMgPT4gYy5pZCA9PT0gJ2xlYmxhbmMnKSxcbiAgICAgICAgc3BlbGxzOiBbXG4gICAgICAgICAgY3JlYXRlU3BlbGwoJ2RvdCcpLFxuICAgICAgICAgIGNyZWF0ZVNwZWxsKCdmbGFzaCcpXG4gICAgICAgIF1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICduZ3J5Z29kJyxcbiAgICAgICAgcm9sZTogJ0FEQycsXG4gICAgICAgIGNoYW1waW9uOiBjaGFtcGlvbnMuZmluZChjID0+IGMuaWQgPT09ICdsdWNpYW4nKSxcbiAgICAgICAgc3BlbGxzOiBbXG4gICAgICAgICAgY3JlYXRlU3BlbGwoJ2hlYWwnKSxcbiAgICAgICAgICBjcmVhdGVTcGVsbCgnZmxhc2gnKVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAneHhhdG9tZXh4JyxcbiAgICAgICAgcm9sZTogJ1N1cHBvcnQnLFxuICAgICAgICBjaGFtcGlvbjogY2hhbXBpb25zLmZpbmQoYyA9PiBjLmlkID09PSAnbGVvbmEnKSxcbiAgICAgICAgc3BlbGxzOiBbXG4gICAgICAgICAgY3JlYXRlU3BlbGwoJ2V4aGF1c3QnKSxcbiAgICAgICAgICBjcmVhdGVTcGVsbCgnZmxhc2gnKVxuICAgICAgICBdXG4gICAgICB9XG4gICAgXSlcbiAgICByZXR1cm5cblxuICAgIC8vIFRPRE86IGZldGNoXG4gICAgLy8gaHR0cChgaHR0cHM6Ly9jcm9zc29yaWdpbi5tZS8ke3VybH1gLCAoZXJyLCByZXMsIGJvZHkpID0+IHtcbiAgICAvLyAgIGlmICg0MDMgPT09IHJlcy5zdGF0dXNDb2RlKSByZXR1cm4gcmVqZWN0KCdObyBsaXZlIGdhbWUgZm91bmQuJylcbiAgICAvL1xuICAgIC8vICAgY29uc3QganNvbiA9IEpTT04ucGFyc2UoYm9keSlcbiAgICAvLyAgIGNvbnN0IGVubmVtaWVzID0ganNvbi5wYXJ0aWNpcGFudHMubWFwKHBhcnRpY2lwYW50ID0+ICh7XG4gICAgLy8gICAgIHN1bW1vbmVyTmFtZTogcGFydGljaXBhbnQuc3VtbW9uZXJOYW1lLFxuICAgIC8vICAgICBjaGFtcGlvbklkOiBwYXJ0aWNpcGFudC5jaGFtcGlvbklkLFxuICAgIC8vICAgICBzcGVsbDFJZDogcGFydGljaXBhbnQuc3BlbGwxSWQsXG4gICAgLy8gICAgIHNwZWxsMklkOiBwYXJ0aWNpcGFudC5zcGVsbDJJZFxuICAgIC8vICAgfSkpXG4gICAgLy8gICBjb25zb2xlLmxvZyhlbm5lbWllcylcbiAgICAvL1xuICAgIC8vICAgcmVzb2x2ZShlbm5lbWllcylcbiAgICAvLyB9KVxuICB9KVxufVxuIiwiaW1wb3J0IHsgZmV0Y2hTdW1tb25lciwgZmV0Y2hFbm5lbWllcyB9IGZyb20gJy4uLy4uL2xpYi9yaW90J1xuXG5leHBvcnQgY29uc3QgZmV0Y2ggPSBhc3luYyAoZGF0YSwgc3RhdGUsIHNlbmQsIGRvbmUpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBzdW1tb25lciA9IGF3YWl0IGZldGNoU3VtbW9uZXIoc3RhdGUuc3VtbW9uZXIpXG4gICAgY29uc3QgZW5uZW1pZXMgPSBhd2FpdCBmZXRjaEVubmVtaWVzKHN1bW1vbmVyKVxuXG4gICAgc2VuZCgnZ2FtZTpzdW1tb25lcicsIHN1bW1vbmVyLCBkb25lKVxuICAgIHNlbmQoJ2dhbWU6ZW5uZW1pZXMnLCBlbm5lbWllcywgKCkgPT4ge1xuICAgICAgc2VuZCgnbG9jYXRpb246c2V0TG9jYXRpb24nLCB7IGxvY2F0aW9uOiAnL2luZ2FtZScgfSwgZG9uZSlcbiAgICB9KVxuICB9XG4gIGNhdGNoIChlcnIpIHtcbiAgICBzZW5kKCdhcHA6ZXJyb3InLCBlcnIsIGRvbmUpXG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCB0aWNrID0gKHNlbmQsIGRvbmUpID0+IHtcbiAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIHNlbmQoJ2dhbWU6ZGVjcmVtZW50QWxsU3BlbGxzQ29vbGRvd24nLCAxLCBkb25lKVxuICB9LCAxMDAwKVxufVxuIiwiaW1wb3J0ICogYXMgcmVkdWNlcnMgZnJvbSAnLi9nYW1lL3JlZHVjZXJzJ1xuaW1wb3J0ICogYXMgZWZmZWN0cyBmcm9tICcuL2dhbWUvZWZmZWN0cydcbmltcG9ydCAqIGFzIHN1YnNjcmlwdGlvbnMgZnJvbSAnLi9nYW1lL3N1YnNjcmlwdGlvbnMnXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgbmFtZXNwYWNlOiAnZ2FtZScsXG4gIHN0YXRlOiB7IHN1bW1vbmVyOiAnJywgZW5uZW1pZXM6IFtdIH0sXG4gIHJlZHVjZXJzLFxuICBlZmZlY3RzLFxuICBzdWJzY3JpcHRpb25zXG59XG4iLCJ2YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2VcblxubW9kdWxlLmV4cG9ydHMgPSBpdGVyYXRpdmVseVdhbGtcblxuZnVuY3Rpb24gaXRlcmF0aXZlbHlXYWxrKG5vZGVzLCBjYikge1xuICAgIGlmICghKCdsZW5ndGgnIGluIG5vZGVzKSkge1xuICAgICAgICBub2RlcyA9IFtub2Rlc11cbiAgICB9XG4gICAgXG4gICAgbm9kZXMgPSBzbGljZS5jYWxsKG5vZGVzKVxuXG4gICAgd2hpbGUobm9kZXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBub2RlID0gbm9kZXMuc2hpZnQoKSxcbiAgICAgICAgICAgIHJldCA9IGNiKG5vZGUpXG5cbiAgICAgICAgaWYgKHJldCkge1xuICAgICAgICAgICAgcmV0dXJuIHJldFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5vZGUuY2hpbGROb2RlcyAmJiBub2RlLmNoaWxkTm9kZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBub2RlcyA9IHNsaWNlLmNhbGwobm9kZS5jaGlsZE5vZGVzKS5jb25jYXQobm9kZXMpXG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IENvbW1lbnRcblxuZnVuY3Rpb24gQ29tbWVudChkYXRhLCBvd25lcikge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBDb21tZW50KSkge1xuICAgICAgICByZXR1cm4gbmV3IENvbW1lbnQoZGF0YSwgb3duZXIpXG4gICAgfVxuXG4gICAgdGhpcy5kYXRhID0gZGF0YVxuICAgIHRoaXMubm9kZVZhbHVlID0gZGF0YVxuICAgIHRoaXMubGVuZ3RoID0gZGF0YS5sZW5ndGhcbiAgICB0aGlzLm93bmVyRG9jdW1lbnQgPSBvd25lciB8fCBudWxsXG59XG5cbkNvbW1lbnQucHJvdG90eXBlLm5vZGVUeXBlID0gOFxuQ29tbWVudC5wcm90b3R5cGUubm9kZU5hbWUgPSBcIiNjb21tZW50XCJcblxuQ29tbWVudC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiBfQ29tbWVudF90b1N0cmluZygpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IENvbW1lbnRdXCJcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gRE9NVGV4dFxuXG5mdW5jdGlvbiBET01UZXh0KHZhbHVlLCBvd25lcikge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBET01UZXh0KSkge1xuICAgICAgICByZXR1cm4gbmV3IERPTVRleHQodmFsdWUpXG4gICAgfVxuXG4gICAgdGhpcy5kYXRhID0gdmFsdWUgfHwgXCJcIlxuICAgIHRoaXMubGVuZ3RoID0gdGhpcy5kYXRhLmxlbmd0aFxuICAgIHRoaXMub3duZXJEb2N1bWVudCA9IG93bmVyIHx8IG51bGxcbn1cblxuRE9NVGV4dC5wcm90b3R5cGUudHlwZSA9IFwiRE9NVGV4dE5vZGVcIlxuRE9NVGV4dC5wcm90b3R5cGUubm9kZVR5cGUgPSAzXG5ET01UZXh0LnByb3RvdHlwZS5ub2RlTmFtZSA9IFwiI3RleHRcIlxuXG5ET01UZXh0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIF9UZXh0X3RvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLmRhdGFcbn1cblxuRE9NVGV4dC5wcm90b3R5cGUucmVwbGFjZURhdGEgPSBmdW5jdGlvbiByZXBsYWNlRGF0YShpbmRleCwgbGVuZ3RoLCB2YWx1ZSkge1xuICAgIHZhciBjdXJyZW50ID0gdGhpcy5kYXRhXG4gICAgdmFyIGxlZnQgPSBjdXJyZW50LnN1YnN0cmluZygwLCBpbmRleClcbiAgICB2YXIgcmlnaHQgPSBjdXJyZW50LnN1YnN0cmluZyhpbmRleCArIGxlbmd0aCwgY3VycmVudC5sZW5ndGgpXG4gICAgdGhpcy5kYXRhID0gbGVmdCArIHZhbHVlICsgcmlnaHRcbiAgICB0aGlzLmxlbmd0aCA9IHRoaXMuZGF0YS5sZW5ndGhcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gZGlzcGF0Y2hFdmVudFxuXG5mdW5jdGlvbiBkaXNwYXRjaEV2ZW50KGV2KSB7XG4gICAgdmFyIGVsZW0gPSB0aGlzXG4gICAgdmFyIHR5cGUgPSBldi50eXBlXG5cbiAgICBpZiAoIWV2LnRhcmdldCkge1xuICAgICAgICBldi50YXJnZXQgPSBlbGVtXG4gICAgfVxuXG4gICAgaWYgKCFlbGVtLmxpc3RlbmVycykge1xuICAgICAgICBlbGVtLmxpc3RlbmVycyA9IHt9XG4gICAgfVxuXG4gICAgdmFyIGxpc3RlbmVycyA9IGVsZW0ubGlzdGVuZXJzW3R5cGVdXG5cbiAgICBpZiAobGlzdGVuZXJzKSB7XG4gICAgICAgIHJldHVybiBsaXN0ZW5lcnMuZm9yRWFjaChmdW5jdGlvbiAobGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGV2LmN1cnJlbnRUYXJnZXQgPSBlbGVtXG4gICAgICAgICAgICBpZiAodHlwZW9mIGxpc3RlbmVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIoZXYpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyLmhhbmRsZUV2ZW50KGV2KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGlmIChlbGVtLnBhcmVudE5vZGUpIHtcbiAgICAgICAgZWxlbS5wYXJlbnROb2RlLmRpc3BhdGNoRXZlbnQoZXYpXG4gICAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBhZGRFdmVudExpc3RlbmVyXG5cbmZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXIodHlwZSwgbGlzdGVuZXIpIHtcbiAgICB2YXIgZWxlbSA9IHRoaXNcblxuICAgIGlmICghZWxlbS5saXN0ZW5lcnMpIHtcbiAgICAgICAgZWxlbS5saXN0ZW5lcnMgPSB7fVxuICAgIH1cblxuICAgIGlmICghZWxlbS5saXN0ZW5lcnNbdHlwZV0pIHtcbiAgICAgICAgZWxlbS5saXN0ZW5lcnNbdHlwZV0gPSBbXVxuICAgIH1cblxuICAgIGlmIChlbGVtLmxpc3RlbmVyc1t0eXBlXS5pbmRleE9mKGxpc3RlbmVyKSA9PT0gLTEpIHtcbiAgICAgICAgZWxlbS5saXN0ZW5lcnNbdHlwZV0ucHVzaChsaXN0ZW5lcilcbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlbW92ZUV2ZW50TGlzdGVuZXJcblxuZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcikge1xuICAgIHZhciBlbGVtID0gdGhpc1xuXG4gICAgaWYgKCFlbGVtLmxpc3RlbmVycykge1xuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoIWVsZW0ubGlzdGVuZXJzW3R5cGVdKSB7XG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHZhciBsaXN0ID0gZWxlbS5saXN0ZW5lcnNbdHlwZV1cbiAgICB2YXIgaW5kZXggPSBsaXN0LmluZGV4T2YobGlzdGVuZXIpXG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICBsaXN0LnNwbGljZShpbmRleCwgMSlcbiAgICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHNlcmlhbGl6ZU5vZGVcblxudmFyIHZvaWRFbGVtZW50cyA9IFtcImFyZWFcIixcImJhc2VcIixcImJyXCIsXCJjb2xcIixcImVtYmVkXCIsXCJoclwiLFwiaW1nXCIsXCJpbnB1dFwiLFwia2V5Z2VuXCIsXCJsaW5rXCIsXCJtZW51aXRlbVwiLFwibWV0YVwiLFwicGFyYW1cIixcInNvdXJjZVwiLFwidHJhY2tcIixcIndiclwiXTtcblxuZnVuY3Rpb24gc2VyaWFsaXplTm9kZShub2RlKSB7XG4gICAgc3dpdGNoIChub2RlLm5vZGVUeXBlKSB7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIHJldHVybiBlc2NhcGVUZXh0KG5vZGUuZGF0YSlcbiAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgcmV0dXJuIFwiPCEtLVwiICsgbm9kZS5kYXRhICsgXCItLT5cIlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHNlcmlhbGl6ZUVsZW1lbnQobm9kZSlcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZUVsZW1lbnQoZWxlbSkge1xuICAgIHZhciBzdHJpbmdzID0gW11cblxuICAgIHZhciB0YWduYW1lID0gZWxlbS50YWdOYW1lXG5cbiAgICBpZiAoZWxlbS5uYW1lc3BhY2VVUkkgPT09IFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbFwiKSB7XG4gICAgICAgIHRhZ25hbWUgPSB0YWduYW1lLnRvTG93ZXJDYXNlKClcbiAgICB9XG5cbiAgICBzdHJpbmdzLnB1c2goXCI8XCIgKyB0YWduYW1lICsgcHJvcGVydGllcyhlbGVtKSArIGRhdGFzZXRpZnkoZWxlbSkpXG5cbiAgICBpZiAodm9pZEVsZW1lbnRzLmluZGV4T2YodGFnbmFtZSkgPiAtMSkge1xuICAgICAgICBzdHJpbmdzLnB1c2goXCIgLz5cIilcbiAgICB9IGVsc2Uge1xuICAgICAgICBzdHJpbmdzLnB1c2goXCI+XCIpXG5cbiAgICAgICAgaWYgKGVsZW0uY2hpbGROb2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHN0cmluZ3MucHVzaC5hcHBseShzdHJpbmdzLCBlbGVtLmNoaWxkTm9kZXMubWFwKHNlcmlhbGl6ZU5vZGUpKVxuICAgICAgICB9IGVsc2UgaWYgKGVsZW0udGV4dENvbnRlbnQgfHwgZWxlbS5pbm5lclRleHQpIHtcbiAgICAgICAgICAgIHN0cmluZ3MucHVzaChlc2NhcGVUZXh0KGVsZW0udGV4dENvbnRlbnQgfHwgZWxlbS5pbm5lclRleHQpKVxuICAgICAgICB9IGVsc2UgaWYgKGVsZW0uaW5uZXJIVE1MKSB7XG4gICAgICAgICAgICBzdHJpbmdzLnB1c2goZWxlbS5pbm5lckhUTUwpXG4gICAgICAgIH1cblxuICAgICAgICBzdHJpbmdzLnB1c2goXCI8L1wiICsgdGFnbmFtZSArIFwiPlwiKVxuICAgIH1cblxuICAgIHJldHVybiBzdHJpbmdzLmpvaW4oXCJcIilcbn1cblxuZnVuY3Rpb24gaXNQcm9wZXJ0eShlbGVtLCBrZXkpIHtcbiAgICB2YXIgdHlwZSA9IHR5cGVvZiBlbGVtW2tleV1cblxuICAgIGlmIChrZXkgPT09IFwic3R5bGVcIiAmJiBPYmplY3Qua2V5cyhlbGVtLnN0eWxlKS5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHJldHVybiBlbGVtLmhhc093blByb3BlcnR5KGtleSkgJiZcbiAgICAgICAgKHR5cGUgPT09IFwic3RyaW5nXCIgfHwgdHlwZSA9PT0gXCJib29sZWFuXCIgfHwgdHlwZSA9PT0gXCJudW1iZXJcIikgJiZcbiAgICAgICAga2V5ICE9PSBcIm5vZGVOYW1lXCIgJiYga2V5ICE9PSBcImNsYXNzTmFtZVwiICYmIGtleSAhPT0gXCJ0YWdOYW1lXCIgJiZcbiAgICAgICAga2V5ICE9PSBcInRleHRDb250ZW50XCIgJiYga2V5ICE9PSBcImlubmVyVGV4dFwiICYmIGtleSAhPT0gXCJuYW1lc3BhY2VVUklcIiAmJiAga2V5ICE9PSBcImlubmVySFRNTFwiXG59XG5cbmZ1bmN0aW9uIHN0eWxpZnkoc3R5bGVzKSB7XG4gICAgaWYgKHR5cGVvZiBzdHlsZXMgPT09ICdzdHJpbmcnKSByZXR1cm4gc3R5bGVzXG4gICAgdmFyIGF0dHIgPSBcIlwiXG4gICAgT2JqZWN0LmtleXMoc3R5bGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gc3R5bGVzW2tleV1cbiAgICAgICAga2V5ID0ga2V5LnJlcGxhY2UoL1tBLVpdL2csIGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgICAgIHJldHVybiBcIi1cIiArIGMudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgfSlcbiAgICAgICAgYXR0ciArPSBrZXkgKyBcIjpcIiArIHZhbHVlICsgXCI7XCJcbiAgICB9KVxuICAgIHJldHVybiBhdHRyXG59XG5cbmZ1bmN0aW9uIGRhdGFzZXRpZnkoZWxlbSkge1xuICAgIHZhciBkcyA9IGVsZW0uZGF0YXNldFxuICAgIHZhciBwcm9wcyA9IFtdXG5cbiAgICBmb3IgKHZhciBrZXkgaW4gZHMpIHtcbiAgICAgICAgcHJvcHMucHVzaCh7IG5hbWU6IFwiZGF0YS1cIiArIGtleSwgdmFsdWU6IGRzW2tleV0gfSlcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvcHMubGVuZ3RoID8gc3RyaW5naWZ5KHByb3BzKSA6IFwiXCJcbn1cblxuZnVuY3Rpb24gc3RyaW5naWZ5KGxpc3QpIHtcbiAgICB2YXIgYXR0cmlidXRlcyA9IFtdXG4gICAgbGlzdC5mb3JFYWNoKGZ1bmN0aW9uICh0dXBsZSkge1xuICAgICAgICB2YXIgbmFtZSA9IHR1cGxlLm5hbWVcbiAgICAgICAgdmFyIHZhbHVlID0gdHVwbGUudmFsdWVcblxuICAgICAgICBpZiAobmFtZSA9PT0gXCJzdHlsZVwiKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHN0eWxpZnkodmFsdWUpXG4gICAgICAgIH1cblxuICAgICAgICBhdHRyaWJ1dGVzLnB1c2gobmFtZSArIFwiPVwiICsgXCJcXFwiXCIgKyBlc2NhcGVBdHRyaWJ1dGVWYWx1ZSh2YWx1ZSkgKyBcIlxcXCJcIilcbiAgICB9KVxuXG4gICAgcmV0dXJuIGF0dHJpYnV0ZXMubGVuZ3RoID8gXCIgXCIgKyBhdHRyaWJ1dGVzLmpvaW4oXCIgXCIpIDogXCJcIlxufVxuXG5mdW5jdGlvbiBwcm9wZXJ0aWVzKGVsZW0pIHtcbiAgICB2YXIgcHJvcHMgPSBbXVxuICAgIGZvciAodmFyIGtleSBpbiBlbGVtKSB7XG4gICAgICAgIGlmIChpc1Byb3BlcnR5KGVsZW0sIGtleSkpIHtcbiAgICAgICAgICAgIHByb3BzLnB1c2goeyBuYW1lOiBrZXksIHZhbHVlOiBlbGVtW2tleV0gfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIG5zIGluIGVsZW0uX2F0dHJpYnV0ZXMpIHtcbiAgICAgIGZvciAodmFyIGF0dHJpYnV0ZSBpbiBlbGVtLl9hdHRyaWJ1dGVzW25zXSkge1xuICAgICAgICB2YXIgcHJvcCA9IGVsZW0uX2F0dHJpYnV0ZXNbbnNdW2F0dHJpYnV0ZV1cbiAgICAgICAgdmFyIG5hbWUgPSAocHJvcC5wcmVmaXggPyBwcm9wLnByZWZpeCArIFwiOlwiIDogXCJcIikgKyBhdHRyaWJ1dGVcbiAgICAgICAgcHJvcHMucHVzaCh7IG5hbWU6IG5hbWUsIHZhbHVlOiBwcm9wLnZhbHVlIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGVsZW0uY2xhc3NOYW1lKSB7XG4gICAgICAgIHByb3BzLnB1c2goeyBuYW1lOiBcImNsYXNzXCIsIHZhbHVlOiBlbGVtLmNsYXNzTmFtZSB9KVxuICAgIH1cblxuICAgIHJldHVybiBwcm9wcy5sZW5ndGggPyBzdHJpbmdpZnkocHJvcHMpIDogXCJcIlxufVxuXG5mdW5jdGlvbiBlc2NhcGVUZXh0KHMpIHtcbiAgICB2YXIgc3RyID0gJyc7XG5cbiAgICBpZiAodHlwZW9mKHMpID09PSAnc3RyaW5nJykgeyBcbiAgICAgICAgc3RyID0gczsgXG4gICAgfSBlbHNlIGlmIChzKSB7XG4gICAgICAgIHN0ciA9IHMudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc3RyXG4gICAgICAgIC5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIilcbiAgICAgICAgLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpXG4gICAgICAgIC5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKVxufVxuXG5mdW5jdGlvbiBlc2NhcGVBdHRyaWJ1dGVWYWx1ZShzdHIpIHtcbiAgICByZXR1cm4gZXNjYXBlVGV4dChzdHIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpXG59XG4iLCJ2YXIgZG9tV2FsayA9IHJlcXVpcmUoXCJkb20td2Fsa1wiKVxudmFyIGRpc3BhdGNoRXZlbnQgPSByZXF1aXJlKFwiLi9ldmVudC9kaXNwYXRjaC1ldmVudC5qc1wiKVxudmFyIGFkZEV2ZW50TGlzdGVuZXIgPSByZXF1aXJlKFwiLi9ldmVudC9hZGQtZXZlbnQtbGlzdGVuZXIuanNcIilcbnZhciByZW1vdmVFdmVudExpc3RlbmVyID0gcmVxdWlyZShcIi4vZXZlbnQvcmVtb3ZlLWV2ZW50LWxpc3RlbmVyLmpzXCIpXG52YXIgc2VyaWFsaXplTm9kZSA9IHJlcXVpcmUoXCIuL3NlcmlhbGl6ZS5qc1wiKVxuXG52YXIgaHRtbG5zID0gXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCJcblxubW9kdWxlLmV4cG9ydHMgPSBET01FbGVtZW50XG5cbmZ1bmN0aW9uIERPTUVsZW1lbnQodGFnTmFtZSwgb3duZXIsIG5hbWVzcGFjZSkge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBET01FbGVtZW50KSkge1xuICAgICAgICByZXR1cm4gbmV3IERPTUVsZW1lbnQodGFnTmFtZSlcbiAgICB9XG5cbiAgICB2YXIgbnMgPSBuYW1lc3BhY2UgPT09IHVuZGVmaW5lZCA/IGh0bWxucyA6IChuYW1lc3BhY2UgfHwgbnVsbClcblxuICAgIHRoaXMudGFnTmFtZSA9IG5zID09PSBodG1sbnMgPyBTdHJpbmcodGFnTmFtZSkudG9VcHBlckNhc2UoKSA6IHRhZ05hbWVcbiAgICB0aGlzLm5vZGVOYW1lID0gdGhpcy50YWdOYW1lXG4gICAgdGhpcy5jbGFzc05hbWUgPSBcIlwiXG4gICAgdGhpcy5kYXRhc2V0ID0ge31cbiAgICB0aGlzLmNoaWxkTm9kZXMgPSBbXVxuICAgIHRoaXMucGFyZW50Tm9kZSA9IG51bGxcbiAgICB0aGlzLnN0eWxlID0ge31cbiAgICB0aGlzLm93bmVyRG9jdW1lbnQgPSBvd25lciB8fCBudWxsXG4gICAgdGhpcy5uYW1lc3BhY2VVUkkgPSBuc1xuICAgIHRoaXMuX2F0dHJpYnV0ZXMgPSB7fVxuXG4gICAgaWYgKHRoaXMudGFnTmFtZSA9PT0gJ0lOUFVUJykge1xuICAgICAgdGhpcy50eXBlID0gJ3RleHQnXG4gICAgfVxufVxuXG5ET01FbGVtZW50LnByb3RvdHlwZS50eXBlID0gXCJET01FbGVtZW50XCJcbkRPTUVsZW1lbnQucHJvdG90eXBlLm5vZGVUeXBlID0gMVxuXG5ET01FbGVtZW50LnByb3RvdHlwZS5hcHBlbmRDaGlsZCA9IGZ1bmN0aW9uIF9FbGVtZW50X2FwcGVuZENoaWxkKGNoaWxkKSB7XG4gICAgaWYgKGNoaWxkLnBhcmVudE5vZGUpIHtcbiAgICAgICAgY2hpbGQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjaGlsZClcbiAgICB9XG5cbiAgICB0aGlzLmNoaWxkTm9kZXMucHVzaChjaGlsZClcbiAgICBjaGlsZC5wYXJlbnROb2RlID0gdGhpc1xuXG4gICAgcmV0dXJuIGNoaWxkXG59XG5cbkRPTUVsZW1lbnQucHJvdG90eXBlLnJlcGxhY2VDaGlsZCA9XG4gICAgZnVuY3Rpb24gX0VsZW1lbnRfcmVwbGFjZUNoaWxkKGVsZW0sIG5lZWRsZSkge1xuICAgICAgICAvLyBUT0RPOiBUaHJvdyBOb3RGb3VuZEVycm9yIGlmIG5lZWRsZS5wYXJlbnROb2RlICE9PSB0aGlzXG5cbiAgICAgICAgaWYgKGVsZW0ucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgZWxlbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW0pXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmNoaWxkTm9kZXMuaW5kZXhPZihuZWVkbGUpXG5cbiAgICAgICAgbmVlZGxlLnBhcmVudE5vZGUgPSBudWxsXG4gICAgICAgIHRoaXMuY2hpbGROb2Rlc1tpbmRleF0gPSBlbGVtXG4gICAgICAgIGVsZW0ucGFyZW50Tm9kZSA9IHRoaXNcblxuICAgICAgICByZXR1cm4gbmVlZGxlXG4gICAgfVxuXG5ET01FbGVtZW50LnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uIF9FbGVtZW50X3JlbW92ZUNoaWxkKGVsZW0pIHtcbiAgICAvLyBUT0RPOiBUaHJvdyBOb3RGb3VuZEVycm9yIGlmIGVsZW0ucGFyZW50Tm9kZSAhPT0gdGhpc1xuXG4gICAgdmFyIGluZGV4ID0gdGhpcy5jaGlsZE5vZGVzLmluZGV4T2YoZWxlbSlcbiAgICB0aGlzLmNoaWxkTm9kZXMuc3BsaWNlKGluZGV4LCAxKVxuXG4gICAgZWxlbS5wYXJlbnROb2RlID0gbnVsbFxuICAgIHJldHVybiBlbGVtXG59XG5cbkRPTUVsZW1lbnQucHJvdG90eXBlLmluc2VydEJlZm9yZSA9XG4gICAgZnVuY3Rpb24gX0VsZW1lbnRfaW5zZXJ0QmVmb3JlKGVsZW0sIG5lZWRsZSkge1xuICAgICAgICAvLyBUT0RPOiBUaHJvdyBOb3RGb3VuZEVycm9yIGlmIHJlZmVyZW5jZUVsZW1lbnQgaXMgYSBkb20gbm9kZVxuICAgICAgICAvLyBhbmQgcGFyZW50Tm9kZSAhPT0gdGhpc1xuXG4gICAgICAgIGlmIChlbGVtLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIGVsZW0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtKVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGluZGV4ID0gbmVlZGxlID09PSBudWxsIHx8IG5lZWRsZSA9PT0gdW5kZWZpbmVkID9cbiAgICAgICAgICAgIC0xIDpcbiAgICAgICAgICAgIHRoaXMuY2hpbGROb2Rlcy5pbmRleE9mKG5lZWRsZSlcblxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5jaGlsZE5vZGVzLnNwbGljZShpbmRleCwgMCwgZWxlbSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2hpbGROb2Rlcy5wdXNoKGVsZW0pXG4gICAgICAgIH1cblxuICAgICAgICBlbGVtLnBhcmVudE5vZGUgPSB0aGlzXG4gICAgICAgIHJldHVybiBlbGVtXG4gICAgfVxuXG5ET01FbGVtZW50LnByb3RvdHlwZS5zZXRBdHRyaWJ1dGVOUyA9XG4gICAgZnVuY3Rpb24gX0VsZW1lbnRfc2V0QXR0cmlidXRlTlMobmFtZXNwYWNlLCBuYW1lLCB2YWx1ZSkge1xuICAgICAgICB2YXIgcHJlZml4ID0gbnVsbFxuICAgICAgICB2YXIgbG9jYWxOYW1lID0gbmFtZVxuICAgICAgICB2YXIgY29sb25Qb3NpdGlvbiA9IG5hbWUuaW5kZXhPZihcIjpcIilcbiAgICAgICAgaWYgKGNvbG9uUG9zaXRpb24gPiAtMSkge1xuICAgICAgICAgICAgcHJlZml4ID0gbmFtZS5zdWJzdHIoMCwgY29sb25Qb3NpdGlvbilcbiAgICAgICAgICAgIGxvY2FsTmFtZSA9IG5hbWUuc3Vic3RyKGNvbG9uUG9zaXRpb24gKyAxKVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnRhZ05hbWUgPT09ICdJTlBVVCcgJiYgbmFtZSA9PT0gJ3R5cGUnKSB7XG4gICAgICAgICAgdGhpcy50eXBlID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSB0aGlzLl9hdHRyaWJ1dGVzW25hbWVzcGFjZV0gfHwgKHRoaXMuX2F0dHJpYnV0ZXNbbmFtZXNwYWNlXSA9IHt9KVxuICAgICAgICAgIGF0dHJpYnV0ZXNbbG9jYWxOYW1lXSA9IHt2YWx1ZTogdmFsdWUsIHByZWZpeDogcHJlZml4fVxuICAgICAgICB9XG4gICAgfVxuXG5ET01FbGVtZW50LnByb3RvdHlwZS5nZXRBdHRyaWJ1dGVOUyA9XG4gICAgZnVuY3Rpb24gX0VsZW1lbnRfZ2V0QXR0cmlidXRlTlMobmFtZXNwYWNlLCBuYW1lKSB7XG4gICAgICAgIHZhciBhdHRyaWJ1dGVzID0gdGhpcy5fYXR0cmlidXRlc1tuYW1lc3BhY2VdO1xuICAgICAgICB2YXIgdmFsdWUgPSBhdHRyaWJ1dGVzICYmIGF0dHJpYnV0ZXNbbmFtZV0gJiYgYXR0cmlidXRlc1tuYW1lXS52YWx1ZVxuICAgICAgICBpZiAodGhpcy50YWdOYW1lID09PSAnSU5QVVQnICYmIG5hbWUgPT09ICd0eXBlJykge1xuICAgICAgICAgIHJldHVybiB0aGlzLnR5cGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGxcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG5cbkRPTUVsZW1lbnQucHJvdG90eXBlLnJlbW92ZUF0dHJpYnV0ZU5TID1cbiAgICBmdW5jdGlvbiBfRWxlbWVudF9yZW1vdmVBdHRyaWJ1dGVOUyhuYW1lc3BhY2UsIG5hbWUpIHtcbiAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSB0aGlzLl9hdHRyaWJ1dGVzW25hbWVzcGFjZV07XG4gICAgICAgIGlmIChhdHRyaWJ1dGVzKSB7XG4gICAgICAgICAgICBkZWxldGUgYXR0cmlidXRlc1tuYW1lXVxuICAgICAgICB9XG4gICAgfVxuXG5ET01FbGVtZW50LnByb3RvdHlwZS5oYXNBdHRyaWJ1dGVOUyA9XG4gICAgZnVuY3Rpb24gX0VsZW1lbnRfaGFzQXR0cmlidXRlTlMobmFtZXNwYWNlLCBuYW1lKSB7XG4gICAgICAgIHZhciBhdHRyaWJ1dGVzID0gdGhpcy5fYXR0cmlidXRlc1tuYW1lc3BhY2VdXG4gICAgICAgIHJldHVybiAhIWF0dHJpYnV0ZXMgJiYgbmFtZSBpbiBhdHRyaWJ1dGVzO1xuICAgIH1cblxuRE9NRWxlbWVudC5wcm90b3R5cGUuc2V0QXR0cmlidXRlID0gZnVuY3Rpb24gX0VsZW1lbnRfc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMuc2V0QXR0cmlidXRlTlMobnVsbCwgbmFtZSwgdmFsdWUpXG59XG5cbkRPTUVsZW1lbnQucHJvdG90eXBlLmdldEF0dHJpYnV0ZSA9IGZ1bmN0aW9uIF9FbGVtZW50X2dldEF0dHJpYnV0ZShuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlTlMobnVsbCwgbmFtZSlcbn1cblxuRE9NRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlQXR0cmlidXRlID0gZnVuY3Rpb24gX0VsZW1lbnRfcmVtb3ZlQXR0cmlidXRlKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5yZW1vdmVBdHRyaWJ1dGVOUyhudWxsLCBuYW1lKVxufVxuXG5ET01FbGVtZW50LnByb3RvdHlwZS5oYXNBdHRyaWJ1dGUgPSBmdW5jdGlvbiBfRWxlbWVudF9oYXNBdHRyaWJ1dGUobmFtZSkge1xuICAgIHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZU5TKG51bGwsIG5hbWUpXG59XG5cbkRPTUVsZW1lbnQucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSByZW1vdmVFdmVudExpc3RlbmVyXG5ET01FbGVtZW50LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gYWRkRXZlbnRMaXN0ZW5lclxuRE9NRWxlbWVudC5wcm90b3R5cGUuZGlzcGF0Y2hFdmVudCA9IGRpc3BhdGNoRXZlbnRcblxuLy8gVW4taW1wbGVtZW50ZWRcbkRPTUVsZW1lbnQucHJvdG90eXBlLmZvY3VzID0gZnVuY3Rpb24gX0VsZW1lbnRfZm9jdXMoKSB7XG4gICAgcmV0dXJuIHZvaWQgMFxufVxuXG5ET01FbGVtZW50LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIF9FbGVtZW50X3RvU3RyaW5nKCkge1xuICAgIHJldHVybiBzZXJpYWxpemVOb2RlKHRoaXMpXG59XG5cbkRPTUVsZW1lbnQucHJvdG90eXBlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUgPSBmdW5jdGlvbiBfRWxlbWVudF9nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZXMpIHtcbiAgICB2YXIgY2xhc3NlcyA9IGNsYXNzTmFtZXMuc3BsaXQoXCIgXCIpO1xuICAgIHZhciBlbGVtcyA9IFtdXG5cbiAgICBkb21XYWxrKHRoaXMsIGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSAxKSB7XG4gICAgICAgICAgICB2YXIgbm9kZUNsYXNzTmFtZSA9IG5vZGUuY2xhc3NOYW1lIHx8IFwiXCJcbiAgICAgICAgICAgIHZhciBub2RlQ2xhc3NlcyA9IG5vZGVDbGFzc05hbWUuc3BsaXQoXCIgXCIpXG5cbiAgICAgICAgICAgIGlmIChjbGFzc2VzLmV2ZXJ5KGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVDbGFzc2VzLmluZGV4T2YoaXRlbSkgIT09IC0xXG4gICAgICAgICAgICB9KSkge1xuICAgICAgICAgICAgICAgIGVsZW1zLnB1c2gobm9kZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gZWxlbXNcbn1cblxuRE9NRWxlbWVudC5wcm90b3R5cGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUgPSBmdW5jdGlvbiBfRWxlbWVudF9nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWdOYW1lKSB7XG4gICAgdGFnTmFtZSA9IHRhZ05hbWUudG9Mb3dlckNhc2UoKVxuICAgIHZhciBlbGVtcyA9IFtdXG5cbiAgICBkb21XYWxrKHRoaXMuY2hpbGROb2RlcywgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEgJiYgKHRhZ05hbWUgPT09ICcqJyB8fCBub2RlLnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gdGFnTmFtZSkpIHtcbiAgICAgICAgICAgIGVsZW1zLnB1c2gobm9kZSlcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gZWxlbXNcbn1cblxuRE9NRWxlbWVudC5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbiBfRWxlbWVudF9jb250YWlucyhlbGVtZW50KSB7XG4gICAgcmV0dXJuIGRvbVdhbGsodGhpcywgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQgPT09IG5vZGVcbiAgICB9KSB8fCBmYWxzZVxufVxuIiwidmFyIERPTUVsZW1lbnQgPSByZXF1aXJlKFwiLi9kb20tZWxlbWVudC5qc1wiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IERvY3VtZW50RnJhZ21lbnRcblxuZnVuY3Rpb24gRG9jdW1lbnRGcmFnbWVudChvd25lcikge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBEb2N1bWVudEZyYWdtZW50KSkge1xuICAgICAgICByZXR1cm4gbmV3IERvY3VtZW50RnJhZ21lbnQoKVxuICAgIH1cblxuICAgIHRoaXMuY2hpbGROb2RlcyA9IFtdXG4gICAgdGhpcy5wYXJlbnROb2RlID0gbnVsbFxuICAgIHRoaXMub3duZXJEb2N1bWVudCA9IG93bmVyIHx8IG51bGxcbn1cblxuRG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGUudHlwZSA9IFwiRG9jdW1lbnRGcmFnbWVudFwiXG5Eb2N1bWVudEZyYWdtZW50LnByb3RvdHlwZS5ub2RlVHlwZSA9IDExXG5Eb2N1bWVudEZyYWdtZW50LnByb3RvdHlwZS5ub2RlTmFtZSA9IFwiI2RvY3VtZW50LWZyYWdtZW50XCJcblxuRG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGUuYXBwZW5kQ2hpbGQgID0gRE9NRWxlbWVudC5wcm90b3R5cGUuYXBwZW5kQ2hpbGRcbkRvY3VtZW50RnJhZ21lbnQucHJvdG90eXBlLnJlcGxhY2VDaGlsZCA9IERPTUVsZW1lbnQucHJvdG90eXBlLnJlcGxhY2VDaGlsZFxuRG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgID0gRE9NRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlQ2hpbGRcblxuRG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGUudG9TdHJpbmcgPVxuICAgIGZ1bmN0aW9uIF9Eb2N1bWVudEZyYWdtZW50X3RvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZE5vZGVzLm1hcChmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhub2RlKVxuICAgICAgICB9KS5qb2luKFwiXCIpXG4gICAgfVxuIiwibW9kdWxlLmV4cG9ydHMgPSBFdmVudFxuXG5mdW5jdGlvbiBFdmVudChmYW1pbHkpIHt9XG5cbkV2ZW50LnByb3RvdHlwZS5pbml0RXZlbnQgPSBmdW5jdGlvbiBfRXZlbnRfaW5pdEV2ZW50KHR5cGUsIGJ1YmJsZXMsIGNhbmNlbGFibGUpIHtcbiAgICB0aGlzLnR5cGUgPSB0eXBlXG4gICAgdGhpcy5idWJibGVzID0gYnViYmxlc1xuICAgIHRoaXMuY2FuY2VsYWJsZSA9IGNhbmNlbGFibGVcbn1cblxuRXZlbnQucHJvdG90eXBlLnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24gX0V2ZW50X3ByZXZlbnREZWZhdWx0KCkge1xuICAgIFxufVxuIiwidmFyIGRvbVdhbGsgPSByZXF1aXJlKFwiZG9tLXdhbGtcIilcblxudmFyIENvbW1lbnQgPSByZXF1aXJlKFwiLi9kb20tY29tbWVudC5qc1wiKVxudmFyIERPTVRleHQgPSByZXF1aXJlKFwiLi9kb20tdGV4dC5qc1wiKVxudmFyIERPTUVsZW1lbnQgPSByZXF1aXJlKFwiLi9kb20tZWxlbWVudC5qc1wiKVxudmFyIERvY3VtZW50RnJhZ21lbnQgPSByZXF1aXJlKFwiLi9kb20tZnJhZ21lbnQuanNcIilcbnZhciBFdmVudCA9IHJlcXVpcmUoXCIuL2V2ZW50LmpzXCIpXG52YXIgZGlzcGF0Y2hFdmVudCA9IHJlcXVpcmUoXCIuL2V2ZW50L2Rpc3BhdGNoLWV2ZW50LmpzXCIpXG52YXIgYWRkRXZlbnRMaXN0ZW5lciA9IHJlcXVpcmUoXCIuL2V2ZW50L2FkZC1ldmVudC1saXN0ZW5lci5qc1wiKVxudmFyIHJlbW92ZUV2ZW50TGlzdGVuZXIgPSByZXF1aXJlKFwiLi9ldmVudC9yZW1vdmUtZXZlbnQtbGlzdGVuZXIuanNcIilcblxubW9kdWxlLmV4cG9ydHMgPSBEb2N1bWVudDtcblxuZnVuY3Rpb24gRG9jdW1lbnQoKSB7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIERvY3VtZW50KSkge1xuICAgICAgICByZXR1cm4gbmV3IERvY3VtZW50KCk7XG4gICAgfVxuXG4gICAgdGhpcy5oZWFkID0gdGhpcy5jcmVhdGVFbGVtZW50KFwiaGVhZFwiKVxuICAgIHRoaXMuYm9keSA9IHRoaXMuY3JlYXRlRWxlbWVudChcImJvZHlcIilcbiAgICB0aGlzLmRvY3VtZW50RWxlbWVudCA9IHRoaXMuY3JlYXRlRWxlbWVudChcImh0bWxcIilcbiAgICB0aGlzLmRvY3VtZW50RWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmhlYWQpXG4gICAgdGhpcy5kb2N1bWVudEVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5ib2R5KVxuICAgIHRoaXMuY2hpbGROb2RlcyA9IFt0aGlzLmRvY3VtZW50RWxlbWVudF1cbiAgICB0aGlzLm5vZGVUeXBlID0gOVxufVxuXG52YXIgcHJvdG8gPSBEb2N1bWVudC5wcm90b3R5cGU7XG5wcm90by5jcmVhdGVUZXh0Tm9kZSA9IGZ1bmN0aW9uIGNyZWF0ZVRleHROb2RlKHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBET01UZXh0KHZhbHVlLCB0aGlzKVxufVxuXG5wcm90by5jcmVhdGVFbGVtZW50TlMgPSBmdW5jdGlvbiBjcmVhdGVFbGVtZW50TlMobmFtZXNwYWNlLCB0YWdOYW1lKSB7XG4gICAgdmFyIG5zID0gbmFtZXNwYWNlID09PSBudWxsID8gbnVsbCA6IFN0cmluZyhuYW1lc3BhY2UpXG4gICAgcmV0dXJuIG5ldyBET01FbGVtZW50KHRhZ05hbWUsIHRoaXMsIG5zKVxufVxuXG5wcm90by5jcmVhdGVFbGVtZW50ID0gZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWdOYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBET01FbGVtZW50KHRhZ05hbWUsIHRoaXMpXG59XG5cbnByb3RvLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQgPSBmdW5jdGlvbiBjcmVhdGVEb2N1bWVudEZyYWdtZW50KCkge1xuICAgIHJldHVybiBuZXcgRG9jdW1lbnRGcmFnbWVudCh0aGlzKVxufVxuXG5wcm90by5jcmVhdGVFdmVudCA9IGZ1bmN0aW9uIGNyZWF0ZUV2ZW50KGZhbWlseSkge1xuICAgIHJldHVybiBuZXcgRXZlbnQoZmFtaWx5KVxufVxuXG5wcm90by5jcmVhdGVDb21tZW50ID0gZnVuY3Rpb24gY3JlYXRlQ29tbWVudChkYXRhKSB7XG4gICAgcmV0dXJuIG5ldyBDb21tZW50KGRhdGEsIHRoaXMpXG59XG5cbnByb3RvLmdldEVsZW1lbnRCeUlkID0gZnVuY3Rpb24gZ2V0RWxlbWVudEJ5SWQoaWQpIHtcbiAgICBpZCA9IFN0cmluZyhpZClcblxuICAgIHZhciByZXN1bHQgPSBkb21XYWxrKHRoaXMuY2hpbGROb2RlcywgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICAgICAgaWYgKFN0cmluZyhub2RlLmlkKSA9PT0gaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBub2RlXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIHJlc3VsdCB8fCBudWxsXG59XG5cbnByb3RvLmdldEVsZW1lbnRzQnlDbGFzc05hbWUgPSBET01FbGVtZW50LnByb3RvdHlwZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lXG5wcm90by5nZXRFbGVtZW50c0J5VGFnTmFtZSA9IERPTUVsZW1lbnQucHJvdG90eXBlLmdldEVsZW1lbnRzQnlUYWdOYW1lXG5wcm90by5jb250YWlucyA9IERPTUVsZW1lbnQucHJvdG90eXBlLmNvbnRhaW5zXG5cbnByb3RvLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSByZW1vdmVFdmVudExpc3RlbmVyXG5wcm90by5hZGRFdmVudExpc3RlbmVyID0gYWRkRXZlbnRMaXN0ZW5lclxucHJvdG8uZGlzcGF0Y2hFdmVudCA9IGRpc3BhdGNoRXZlbnRcbiIsInZhciBEb2N1bWVudCA9IHJlcXVpcmUoJy4vZG9jdW1lbnQuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZXcgRG9jdW1lbnQoKTtcbiIsInZhciB0b3BMZXZlbCA9IHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnID8gZ2xvYmFsIDpcbiAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHt9XG52YXIgbWluRG9jID0gcmVxdWlyZSgnbWluLWRvY3VtZW50Jyk7XG5cbmlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBkb2N1bWVudDtcbn0gZWxzZSB7XG4gICAgdmFyIGRvY2N5ID0gdG9wTGV2ZWxbJ19fR0xPQkFMX0RPQ1VNRU5UX0NBQ0hFQDQnXTtcblxuICAgIGlmICghZG9jY3kpIHtcbiAgICAgICAgZG9jY3kgPSB0b3BMZXZlbFsnX19HTE9CQUxfRE9DVU1FTlRfQ0FDSEVANCddID0gbWluRG9jO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gZG9jY3k7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGF0dHJpYnV0ZVRvUHJvcGVydHlcblxudmFyIHRyYW5zZm9ybSA9IHtcbiAgJ2NsYXNzJzogJ2NsYXNzTmFtZScsXG4gICdmb3InOiAnaHRtbEZvcicsXG4gICdodHRwLWVxdWl2JzogJ2h0dHBFcXVpdidcbn1cblxuZnVuY3Rpb24gYXR0cmlidXRlVG9Qcm9wZXJ0eSAoaCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHRhZ05hbWUsIGF0dHJzLCBjaGlsZHJlbikge1xuICAgIGZvciAodmFyIGF0dHIgaW4gYXR0cnMpIHtcbiAgICAgIGlmIChhdHRyIGluIHRyYW5zZm9ybSkge1xuICAgICAgICBhdHRyc1t0cmFuc2Zvcm1bYXR0cl1dID0gYXR0cnNbYXR0cl1cbiAgICAgICAgZGVsZXRlIGF0dHJzW2F0dHJdXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBoKHRhZ05hbWUsIGF0dHJzLCBjaGlsZHJlbilcbiAgfVxufVxuIiwidmFyIGF0dHJUb1Byb3AgPSByZXF1aXJlKCdoeXBlcnNjcmlwdC1hdHRyaWJ1dGUtdG8tcHJvcGVydHknKVxuXG52YXIgVkFSID0gMCwgVEVYVCA9IDEsIE9QRU4gPSAyLCBDTE9TRSA9IDMsIEFUVFIgPSA0XG52YXIgQVRUUl9LRVkgPSA1LCBBVFRSX0tFWV9XID0gNlxudmFyIEFUVFJfVkFMVUVfVyA9IDcsIEFUVFJfVkFMVUUgPSA4XG52YXIgQVRUUl9WQUxVRV9TUSA9IDksIEFUVFJfVkFMVUVfRFEgPSAxMFxudmFyIEFUVFJfRVEgPSAxMSwgQVRUUl9CUkVBSyA9IDEyXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGgsIG9wdHMpIHtcbiAgaCA9IGF0dHJUb1Byb3AoaClcbiAgaWYgKCFvcHRzKSBvcHRzID0ge31cbiAgdmFyIGNvbmNhdCA9IG9wdHMuY29uY2F0IHx8IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIFN0cmluZyhhKSArIFN0cmluZyhiKVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChzdHJpbmdzKSB7XG4gICAgdmFyIHN0YXRlID0gVEVYVCwgcmVnID0gJydcbiAgICB2YXIgYXJnbGVuID0gYXJndW1lbnRzLmxlbmd0aFxuICAgIHZhciBwYXJ0cyA9IFtdXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmluZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChpIDwgYXJnbGVuIC0gMSkge1xuICAgICAgICB2YXIgYXJnID0gYXJndW1lbnRzW2krMV1cbiAgICAgICAgdmFyIHAgPSBwYXJzZShzdHJpbmdzW2ldKVxuICAgICAgICB2YXIgeHN0YXRlID0gc3RhdGVcbiAgICAgICAgaWYgKHhzdGF0ZSA9PT0gQVRUUl9WQUxVRV9EUSkgeHN0YXRlID0gQVRUUl9WQUxVRVxuICAgICAgICBpZiAoeHN0YXRlID09PSBBVFRSX1ZBTFVFX1NRKSB4c3RhdGUgPSBBVFRSX1ZBTFVFXG4gICAgICAgIGlmICh4c3RhdGUgPT09IEFUVFJfVkFMVUVfVykgeHN0YXRlID0gQVRUUl9WQUxVRVxuICAgICAgICBpZiAoeHN0YXRlID09PSBBVFRSKSB4c3RhdGUgPSBBVFRSX0tFWVxuICAgICAgICBwLnB1c2goWyBWQVIsIHhzdGF0ZSwgYXJnIF0pXG4gICAgICAgIHBhcnRzLnB1c2guYXBwbHkocGFydHMsIHApXG4gICAgICB9IGVsc2UgcGFydHMucHVzaC5hcHBseShwYXJ0cywgcGFyc2Uoc3RyaW5nc1tpXSkpXG4gICAgfVxuXG4gICAgdmFyIHRyZWUgPSBbbnVsbCx7fSxbXV1cbiAgICB2YXIgc3RhY2sgPSBbW3RyZWUsLTFdXVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjdXIgPSBzdGFja1tzdGFjay5sZW5ndGgtMV1bMF1cbiAgICAgIHZhciBwID0gcGFydHNbaV0sIHMgPSBwWzBdXG4gICAgICBpZiAocyA9PT0gT1BFTiAmJiAvXlxcLy8udGVzdChwWzFdKSkge1xuICAgICAgICB2YXIgaXggPSBzdGFja1tzdGFjay5sZW5ndGgtMV1bMV1cbiAgICAgICAgaWYgKHN0YWNrLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBzdGFjay5wb3AoKVxuICAgICAgICAgIHN0YWNrW3N0YWNrLmxlbmd0aC0xXVswXVsyXVtpeF0gPSBoKFxuICAgICAgICAgICAgY3VyWzBdLCBjdXJbMV0sIGN1clsyXS5sZW5ndGggPyBjdXJbMl0gOiB1bmRlZmluZWRcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocyA9PT0gT1BFTikge1xuICAgICAgICB2YXIgYyA9IFtwWzFdLHt9LFtdXVxuICAgICAgICBjdXJbMl0ucHVzaChjKVxuICAgICAgICBzdGFjay5wdXNoKFtjLGN1clsyXS5sZW5ndGgtMV0pXG4gICAgICB9IGVsc2UgaWYgKHMgPT09IEFUVFJfS0VZIHx8IChzID09PSBWQVIgJiYgcFsxXSA9PT0gQVRUUl9LRVkpKSB7XG4gICAgICAgIHZhciBrZXkgPSAnJ1xuICAgICAgICB2YXIgY29weUtleVxuICAgICAgICBmb3IgKDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHBhcnRzW2ldWzBdID09PSBBVFRSX0tFWSkge1xuICAgICAgICAgICAga2V5ID0gY29uY2F0KGtleSwgcGFydHNbaV1bMV0pXG4gICAgICAgICAgfSBlbHNlIGlmIChwYXJ0c1tpXVswXSA9PT0gVkFSICYmIHBhcnRzW2ldWzFdID09PSBBVFRSX0tFWSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJ0c1tpXVsyXSA9PT0gJ29iamVjdCcgJiYgIWtleSkge1xuICAgICAgICAgICAgICBmb3IgKGNvcHlLZXkgaW4gcGFydHNbaV1bMl0pIHtcbiAgICAgICAgICAgICAgICBpZiAocGFydHNbaV1bMl0uaGFzT3duUHJvcGVydHkoY29weUtleSkgJiYgIWN1clsxXVtjb3B5S2V5XSkge1xuICAgICAgICAgICAgICAgICAgY3VyWzFdW2NvcHlLZXldID0gcGFydHNbaV1bMl1bY29weUtleV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGtleSA9IGNvbmNhdChrZXksIHBhcnRzW2ldWzJdKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBicmVha1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJ0c1tpXVswXSA9PT0gQVRUUl9FUSkgaSsrXG4gICAgICAgIHZhciBqID0gaVxuICAgICAgICBmb3IgKDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHBhcnRzW2ldWzBdID09PSBBVFRSX1ZBTFVFIHx8IHBhcnRzW2ldWzBdID09PSBBVFRSX0tFWSkge1xuICAgICAgICAgICAgaWYgKCFjdXJbMV1ba2V5XSkgY3VyWzFdW2tleV0gPSBzdHJmbihwYXJ0c1tpXVsxXSlcbiAgICAgICAgICAgIGVsc2UgY3VyWzFdW2tleV0gPSBjb25jYXQoY3VyWzFdW2tleV0sIHBhcnRzW2ldWzFdKVxuICAgICAgICAgIH0gZWxzZSBpZiAocGFydHNbaV1bMF0gPT09IFZBUlxuICAgICAgICAgICYmIChwYXJ0c1tpXVsxXSA9PT0gQVRUUl9WQUxVRSB8fCBwYXJ0c1tpXVsxXSA9PT0gQVRUUl9LRVkpKSB7XG4gICAgICAgICAgICBpZiAoIWN1clsxXVtrZXldKSBjdXJbMV1ba2V5XSA9IHN0cmZuKHBhcnRzW2ldWzJdKVxuICAgICAgICAgICAgZWxzZSBjdXJbMV1ba2V5XSA9IGNvbmNhdChjdXJbMV1ba2V5XSwgcGFydHNbaV1bMl0pXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChrZXkubGVuZ3RoICYmICFjdXJbMV1ba2V5XSAmJiBpID09PSBqXG4gICAgICAgICAgICAmJiAocGFydHNbaV1bMF0gPT09IENMT1NFIHx8IHBhcnRzW2ldWzBdID09PSBBVFRSX0JSRUFLKSkge1xuICAgICAgICAgICAgICAvLyBodHRwczovL2h0bWwuc3BlYy53aGF0d2cub3JnL211bHRpcGFnZS9pbmZyYXN0cnVjdHVyZS5odG1sI2Jvb2xlYW4tYXR0cmlidXRlc1xuICAgICAgICAgICAgICAvLyBlbXB0eSBzdHJpbmcgaXMgZmFsc3ksIG5vdCB3ZWxsIGJlaGF2ZWQgdmFsdWUgaW4gYnJvd3NlclxuICAgICAgICAgICAgICBjdXJbMV1ba2V5XSA9IGtleS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzID09PSBBVFRSX0tFWSkge1xuICAgICAgICBjdXJbMV1bcFsxXV0gPSB0cnVlXG4gICAgICB9IGVsc2UgaWYgKHMgPT09IFZBUiAmJiBwWzFdID09PSBBVFRSX0tFWSkge1xuICAgICAgICBjdXJbMV1bcFsyXV0gPSB0cnVlXG4gICAgICB9IGVsc2UgaWYgKHMgPT09IENMT1NFKSB7XG4gICAgICAgIGlmIChzZWxmQ2xvc2luZyhjdXJbMF0pICYmIHN0YWNrLmxlbmd0aCkge1xuICAgICAgICAgIHZhciBpeCA9IHN0YWNrW3N0YWNrLmxlbmd0aC0xXVsxXVxuICAgICAgICAgIHN0YWNrLnBvcCgpXG4gICAgICAgICAgc3RhY2tbc3RhY2subGVuZ3RoLTFdWzBdWzJdW2l4XSA9IGgoXG4gICAgICAgICAgICBjdXJbMF0sIGN1clsxXSwgY3VyWzJdLmxlbmd0aCA/IGN1clsyXSA6IHVuZGVmaW5lZFxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzID09PSBWQVIgJiYgcFsxXSA9PT0gVEVYVCkge1xuICAgICAgICBpZiAocFsyXSA9PT0gdW5kZWZpbmVkIHx8IHBbMl0gPT09IG51bGwpIHBbMl0gPSAnJ1xuICAgICAgICBlbHNlIGlmICghcFsyXSkgcFsyXSA9IGNvbmNhdCgnJywgcFsyXSlcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkocFsyXVswXSkpIHtcbiAgICAgICAgICBjdXJbMl0ucHVzaC5hcHBseShjdXJbMl0sIHBbMl0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3VyWzJdLnB1c2gocFsyXSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzID09PSBURVhUKSB7XG4gICAgICAgIGN1clsyXS5wdXNoKHBbMV0pXG4gICAgICB9IGVsc2UgaWYgKHMgPT09IEFUVFJfRVEgfHwgcyA9PT0gQVRUUl9CUkVBSykge1xuICAgICAgICAvLyBuby1vcFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bmhhbmRsZWQ6ICcgKyBzKVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0cmVlWzJdLmxlbmd0aCA+IDEgJiYgL15cXHMqJC8udGVzdCh0cmVlWzJdWzBdKSkge1xuICAgICAgdHJlZVsyXS5zaGlmdCgpXG4gICAgfVxuXG4gICAgaWYgKHRyZWVbMl0ubGVuZ3RoID4gMlxuICAgIHx8ICh0cmVlWzJdLmxlbmd0aCA9PT0gMiAmJiAvXFxTLy50ZXN0KHRyZWVbMl1bMV0pKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnbXVsdGlwbGUgcm9vdCBlbGVtZW50cyBtdXN0IGJlIHdyYXBwZWQgaW4gYW4gZW5jbG9zaW5nIHRhZydcbiAgICAgIClcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodHJlZVsyXVswXSkgJiYgdHlwZW9mIHRyZWVbMl1bMF1bMF0gPT09ICdzdHJpbmcnXG4gICAgJiYgQXJyYXkuaXNBcnJheSh0cmVlWzJdWzBdWzJdKSkge1xuICAgICAgdHJlZVsyXVswXSA9IGgodHJlZVsyXVswXVswXSwgdHJlZVsyXVswXVsxXSwgdHJlZVsyXVswXVsyXSlcbiAgICB9XG4gICAgcmV0dXJuIHRyZWVbMl1bMF1cblxuICAgIGZ1bmN0aW9uIHBhcnNlIChzdHIpIHtcbiAgICAgIHZhciByZXMgPSBbXVxuICAgICAgaWYgKHN0YXRlID09PSBBVFRSX1ZBTFVFX1cpIHN0YXRlID0gQVRUUlxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGMgPSBzdHIuY2hhckF0KGkpXG4gICAgICAgIGlmIChzdGF0ZSA9PT0gVEVYVCAmJiBjID09PSAnPCcpIHtcbiAgICAgICAgICBpZiAocmVnLmxlbmd0aCkgcmVzLnB1c2goW1RFWFQsIHJlZ10pXG4gICAgICAgICAgcmVnID0gJydcbiAgICAgICAgICBzdGF0ZSA9IE9QRU5cbiAgICAgICAgfSBlbHNlIGlmIChjID09PSAnPicgJiYgIXF1b3Qoc3RhdGUpKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBPUEVOKSB7XG4gICAgICAgICAgICByZXMucHVzaChbT1BFTixyZWddKVxuICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfS0VZKSB7XG4gICAgICAgICAgICByZXMucHVzaChbQVRUUl9LRVkscmVnXSlcbiAgICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX1ZBTFVFICYmIHJlZy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlcy5wdXNoKFtBVFRSX1ZBTFVFLHJlZ10pXG4gICAgICAgICAgfVxuICAgICAgICAgIHJlcy5wdXNoKFtDTE9TRV0pXG4gICAgICAgICAgcmVnID0gJydcbiAgICAgICAgICBzdGF0ZSA9IFRFWFRcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gVEVYVCkge1xuICAgICAgICAgIHJlZyArPSBjXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IE9QRU4gJiYgL1xccy8udGVzdChjKSkge1xuICAgICAgICAgIHJlcy5wdXNoKFtPUEVOLCByZWddKVxuICAgICAgICAgIHJlZyA9ICcnXG4gICAgICAgICAgc3RhdGUgPSBBVFRSXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IE9QRU4pIHtcbiAgICAgICAgICByZWcgKz0gY1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSICYmIC9bXFx3LV0vLnRlc3QoYykpIHtcbiAgICAgICAgICBzdGF0ZSA9IEFUVFJfS0VZXG4gICAgICAgICAgcmVnID0gY1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSICYmIC9cXHMvLnRlc3QoYykpIHtcbiAgICAgICAgICBpZiAocmVnLmxlbmd0aCkgcmVzLnB1c2goW0FUVFJfS0VZLHJlZ10pXG4gICAgICAgICAgcmVzLnB1c2goW0FUVFJfQlJFQUtdKVxuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX0tFWSAmJiAvXFxzLy50ZXN0KGMpKSB7XG4gICAgICAgICAgcmVzLnB1c2goW0FUVFJfS0VZLHJlZ10pXG4gICAgICAgICAgcmVnID0gJydcbiAgICAgICAgICBzdGF0ZSA9IEFUVFJfS0VZX1dcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9LRVkgJiYgYyA9PT0gJz0nKSB7XG4gICAgICAgICAgcmVzLnB1c2goW0FUVFJfS0VZLHJlZ10sW0FUVFJfRVFdKVxuICAgICAgICAgIHJlZyA9ICcnXG4gICAgICAgICAgc3RhdGUgPSBBVFRSX1ZBTFVFX1dcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9LRVkpIHtcbiAgICAgICAgICByZWcgKz0gY1xuICAgICAgICB9IGVsc2UgaWYgKChzdGF0ZSA9PT0gQVRUUl9LRVlfVyB8fCBzdGF0ZSA9PT0gQVRUUikgJiYgYyA9PT0gJz0nKSB7XG4gICAgICAgICAgcmVzLnB1c2goW0FUVFJfRVFdKVxuICAgICAgICAgIHN0YXRlID0gQVRUUl9WQUxVRV9XXG4gICAgICAgIH0gZWxzZSBpZiAoKHN0YXRlID09PSBBVFRSX0tFWV9XIHx8IHN0YXRlID09PSBBVFRSKSAmJiAhL1xccy8udGVzdChjKSkge1xuICAgICAgICAgIHJlcy5wdXNoKFtBVFRSX0JSRUFLXSlcbiAgICAgICAgICBpZiAoL1tcXHctXS8udGVzdChjKSkge1xuICAgICAgICAgICAgcmVnICs9IGNcbiAgICAgICAgICAgIHN0YXRlID0gQVRUUl9LRVlcbiAgICAgICAgICB9IGVsc2Ugc3RhdGUgPSBBVFRSXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUVfVyAmJiBjID09PSAnXCInKSB7XG4gICAgICAgICAgc3RhdGUgPSBBVFRSX1ZBTFVFX0RRXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUVfVyAmJiBjID09PSBcIidcIikge1xuICAgICAgICAgIHN0YXRlID0gQVRUUl9WQUxVRV9TUVxuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX1ZBTFVFX0RRICYmIGMgPT09ICdcIicpIHtcbiAgICAgICAgICByZXMucHVzaChbQVRUUl9WQUxVRSxyZWddLFtBVFRSX0JSRUFLXSlcbiAgICAgICAgICByZWcgPSAnJ1xuICAgICAgICAgIHN0YXRlID0gQVRUUlxuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX1ZBTFVFX1NRICYmIGMgPT09IFwiJ1wiKSB7XG4gICAgICAgICAgcmVzLnB1c2goW0FUVFJfVkFMVUUscmVnXSxbQVRUUl9CUkVBS10pXG4gICAgICAgICAgcmVnID0gJydcbiAgICAgICAgICBzdGF0ZSA9IEFUVFJcbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9WQUxVRV9XICYmICEvXFxzLy50ZXN0KGMpKSB7XG4gICAgICAgICAgc3RhdGUgPSBBVFRSX1ZBTFVFXG4gICAgICAgICAgaS0tXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUUgJiYgL1xccy8udGVzdChjKSkge1xuICAgICAgICAgIHJlcy5wdXNoKFtBVFRSX1ZBTFVFLHJlZ10sW0FUVFJfQlJFQUtdKVxuICAgICAgICAgIHJlZyA9ICcnXG4gICAgICAgICAgc3RhdGUgPSBBVFRSXG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUUgfHwgc3RhdGUgPT09IEFUVFJfVkFMVUVfU1FcbiAgICAgICAgfHwgc3RhdGUgPT09IEFUVFJfVkFMVUVfRFEpIHtcbiAgICAgICAgICByZWcgKz0gY1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3RhdGUgPT09IFRFWFQgJiYgcmVnLmxlbmd0aCkge1xuICAgICAgICByZXMucHVzaChbVEVYVCxyZWddKVxuICAgICAgICByZWcgPSAnJ1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9WQUxVRSAmJiByZWcubGVuZ3RoKSB7XG4gICAgICAgIHJlcy5wdXNoKFtBVFRSX1ZBTFVFLHJlZ10pXG4gICAgICAgIHJlZyA9ICcnXG4gICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSBBVFRSX1ZBTFVFX0RRICYmIHJlZy5sZW5ndGgpIHtcbiAgICAgICAgcmVzLnB1c2goW0FUVFJfVkFMVUUscmVnXSlcbiAgICAgICAgcmVnID0gJydcbiAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT09IEFUVFJfVkFMVUVfU1EgJiYgcmVnLmxlbmd0aCkge1xuICAgICAgICByZXMucHVzaChbQVRUUl9WQUxVRSxyZWddKVxuICAgICAgICByZWcgPSAnJ1xuICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PT0gQVRUUl9LRVkpIHtcbiAgICAgICAgcmVzLnB1c2goW0FUVFJfS0VZLHJlZ10pXG4gICAgICAgIHJlZyA9ICcnXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc3RyZm4gKHgpIHtcbiAgICBpZiAodHlwZW9mIHggPT09ICdmdW5jdGlvbicpIHJldHVybiB4XG4gICAgZWxzZSBpZiAodHlwZW9mIHggPT09ICdzdHJpbmcnKSByZXR1cm4geFxuICAgIGVsc2UgaWYgKHggJiYgdHlwZW9mIHggPT09ICdvYmplY3QnKSByZXR1cm4geFxuICAgIGVsc2UgcmV0dXJuIGNvbmNhdCgnJywgeClcbiAgfVxufVxuXG5mdW5jdGlvbiBxdW90IChzdGF0ZSkge1xuICByZXR1cm4gc3RhdGUgPT09IEFUVFJfVkFMVUVfU1EgfHwgc3RhdGUgPT09IEFUVFJfVkFMVUVfRFFcbn1cblxudmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHlcbmZ1bmN0aW9uIGhhcyAob2JqLCBrZXkpIHsgcmV0dXJuIGhhc093bi5jYWxsKG9iaiwga2V5KSB9XG5cbnZhciBjbG9zZVJFID0gUmVnRXhwKCdeKCcgKyBbXG4gICdhcmVhJywgJ2Jhc2UnLCAnYmFzZWZvbnQnLCAnYmdzb3VuZCcsICdicicsICdjb2wnLCAnY29tbWFuZCcsICdlbWJlZCcsXG4gICdmcmFtZScsICdocicsICdpbWcnLCAnaW5wdXQnLCAnaXNpbmRleCcsICdrZXlnZW4nLCAnbGluaycsICdtZXRhJywgJ3BhcmFtJyxcbiAgJ3NvdXJjZScsICd0cmFjaycsICd3YnInLFxuICAvLyBTVkcgVEFHU1xuICAnYW5pbWF0ZScsICdhbmltYXRlVHJhbnNmb3JtJywgJ2NpcmNsZScsICdjdXJzb3InLCAnZGVzYycsICdlbGxpcHNlJyxcbiAgJ2ZlQmxlbmQnLCAnZmVDb2xvck1hdHJpeCcsICdmZUNvbXBvc2l0ZScsXG4gICdmZUNvbnZvbHZlTWF0cml4JywgJ2ZlRGlmZnVzZUxpZ2h0aW5nJywgJ2ZlRGlzcGxhY2VtZW50TWFwJyxcbiAgJ2ZlRGlzdGFudExpZ2h0JywgJ2ZlRmxvb2QnLCAnZmVGdW5jQScsICdmZUZ1bmNCJywgJ2ZlRnVuY0cnLCAnZmVGdW5jUicsXG4gICdmZUdhdXNzaWFuQmx1cicsICdmZUltYWdlJywgJ2ZlTWVyZ2VOb2RlJywgJ2ZlTW9ycGhvbG9neScsXG4gICdmZU9mZnNldCcsICdmZVBvaW50TGlnaHQnLCAnZmVTcGVjdWxhckxpZ2h0aW5nJywgJ2ZlU3BvdExpZ2h0JywgJ2ZlVGlsZScsXG4gICdmZVR1cmJ1bGVuY2UnLCAnZm9udC1mYWNlLWZvcm1hdCcsICdmb250LWZhY2UtbmFtZScsICdmb250LWZhY2UtdXJpJyxcbiAgJ2dseXBoJywgJ2dseXBoUmVmJywgJ2hrZXJuJywgJ2ltYWdlJywgJ2xpbmUnLCAnbWlzc2luZy1nbHlwaCcsICdtcGF0aCcsXG4gICdwYXRoJywgJ3BvbHlnb24nLCAncG9seWxpbmUnLCAncmVjdCcsICdzZXQnLCAnc3RvcCcsICd0cmVmJywgJ3VzZScsICd2aWV3JyxcbiAgJ3ZrZXJuJ1xuXS5qb2luKCd8JykgKyAnKSg/OltcXC4jXVthLXpBLVowLTlcXHUwMDdGLVxcdUZGRkZfOi1dKykqJCcpXG5mdW5jdGlvbiBzZWxmQ2xvc2luZyAodGFnKSB7IHJldHVybiBjbG9zZVJFLnRlc3QodGFnKSB9XG4iLCJpZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIG1vZHVsZS5leHBvcnRzID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBnbG9iYWw7XG59IGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKXtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHNlbGY7XG59IGVsc2Uge1xuICAgIG1vZHVsZS5leHBvcnRzID0ge307XG59XG4iLCIvKiBnbG9iYWwgTXV0YXRpb25PYnNlcnZlciAqL1xudmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnZ2xvYmFsL2RvY3VtZW50JylcbnZhciB3aW5kb3cgPSByZXF1aXJlKCdnbG9iYWwvd2luZG93JylcbnZhciB3YXRjaCA9IE9iamVjdC5jcmVhdGUobnVsbClcbnZhciBLRVlfSUQgPSAnb25sb2FkaWQnICsgKG5ldyBEYXRlKCkgJSA5ZTYpLnRvU3RyaW5nKDM2KVxudmFyIEtFWV9BVFRSID0gJ2RhdGEtJyArIEtFWV9JRFxudmFyIElOREVYID0gMFxuXG5pZiAod2luZG93ICYmIHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyKSB7XG4gIHZhciBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uIChtdXRhdGlvbnMpIHtcbiAgICBpZiAoT2JqZWN0LmtleXMod2F0Y2gpLmxlbmd0aCA8IDEpIHJldHVyblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbXV0YXRpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobXV0YXRpb25zW2ldLmF0dHJpYnV0ZU5hbWUgPT09IEtFWV9BVFRSKSB7XG4gICAgICAgIGVhY2hBdHRyKG11dGF0aW9uc1tpXSwgdHVybm9uLCB0dXJub2ZmKVxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgZWFjaE11dGF0aW9uKG11dGF0aW9uc1tpXS5yZW1vdmVkTm9kZXMsIHR1cm5vZmYpXG4gICAgICBlYWNoTXV0YXRpb24obXV0YXRpb25zW2ldLmFkZGVkTm9kZXMsIHR1cm5vbilcbiAgICB9XG4gIH0pXG4gIG9ic2VydmVyLm9ic2VydmUoZG9jdW1lbnQuYm9keSwge1xuICAgIGNoaWxkTGlzdDogdHJ1ZSxcbiAgICBzdWJ0cmVlOiB0cnVlLFxuICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgYXR0cmlidXRlT2xkVmFsdWU6IHRydWUsXG4gICAgYXR0cmlidXRlRmlsdGVyOiBbS0VZX0FUVFJdXG4gIH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gb25sb2FkIChlbCwgb24sIG9mZiwgY2FsbGVyKSB7XG4gIG9uID0gb24gfHwgZnVuY3Rpb24gKCkge31cbiAgb2ZmID0gb2ZmIHx8IGZ1bmN0aW9uICgpIHt9XG4gIGVsLnNldEF0dHJpYnV0ZShLRVlfQVRUUiwgJ28nICsgSU5ERVgpXG4gIHdhdGNoWydvJyArIElOREVYXSA9IFtvbiwgb2ZmLCAwLCBjYWxsZXIgfHwgb25sb2FkLmNhbGxlcl1cbiAgSU5ERVggKz0gMVxuICByZXR1cm4gZWxcbn1cblxuZnVuY3Rpb24gdHVybm9uIChpbmRleCwgZWwpIHtcbiAgaWYgKHdhdGNoW2luZGV4XVswXSAmJiB3YXRjaFtpbmRleF1bMl0gPT09IDApIHtcbiAgICB3YXRjaFtpbmRleF1bMF0oZWwpXG4gICAgd2F0Y2hbaW5kZXhdWzJdID0gMVxuICB9XG59XG5cbmZ1bmN0aW9uIHR1cm5vZmYgKGluZGV4LCBlbCkge1xuICBpZiAod2F0Y2hbaW5kZXhdWzFdICYmIHdhdGNoW2luZGV4XVsyXSA9PT0gMSkge1xuICAgIHdhdGNoW2luZGV4XVsxXShlbClcbiAgICB3YXRjaFtpbmRleF1bMl0gPSAwXG4gIH1cbn1cblxuZnVuY3Rpb24gZWFjaEF0dHIgKG11dGF0aW9uLCBvbiwgb2ZmKSB7XG4gIHZhciBuZXdWYWx1ZSA9IG11dGF0aW9uLnRhcmdldC5nZXRBdHRyaWJ1dGUoS0VZX0FUVFIpXG4gIGlmIChzYW1lT3JpZ2luKG11dGF0aW9uLm9sZFZhbHVlLCBuZXdWYWx1ZSkpIHtcbiAgICB3YXRjaFtuZXdWYWx1ZV0gPSB3YXRjaFttdXRhdGlvbi5vbGRWYWx1ZV1cbiAgICByZXR1cm5cbiAgfVxuICBpZiAod2F0Y2hbbXV0YXRpb24ub2xkVmFsdWVdKSB7XG4gICAgb2ZmKG11dGF0aW9uLm9sZFZhbHVlLCBtdXRhdGlvbi50YXJnZXQpXG4gIH1cbiAgaWYgKHdhdGNoW25ld1ZhbHVlXSkge1xuICAgIG9uKG5ld1ZhbHVlLCBtdXRhdGlvbi50YXJnZXQpXG4gIH1cbn1cblxuZnVuY3Rpb24gc2FtZU9yaWdpbiAob2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gIGlmICghb2xkVmFsdWUgfHwgIW5ld1ZhbHVlKSByZXR1cm4gZmFsc2VcbiAgcmV0dXJuIHdhdGNoW29sZFZhbHVlXVszXSA9PT0gd2F0Y2hbbmV3VmFsdWVdWzNdXG59XG5cbmZ1bmN0aW9uIGVhY2hNdXRhdGlvbiAobm9kZXMsIGZuKSB7XG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMod2F0Y2gpXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAobm9kZXNbaV0gJiYgbm9kZXNbaV0uZ2V0QXR0cmlidXRlICYmIG5vZGVzW2ldLmdldEF0dHJpYnV0ZShLRVlfQVRUUikpIHtcbiAgICAgIHZhciBvbmxvYWRpZCA9IG5vZGVzW2ldLmdldEF0dHJpYnV0ZShLRVlfQVRUUilcbiAgICAgIGtleXMuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgICBpZiAob25sb2FkaWQgPT09IGspIHtcbiAgICAgICAgICBmbihrLCBub2Rlc1tpXSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgaWYgKG5vZGVzW2ldLmNoaWxkTm9kZXMubGVuZ3RoID4gMCkge1xuICAgICAgZWFjaE11dGF0aW9uKG5vZGVzW2ldLmNoaWxkTm9kZXMsIGZuKVxuICAgIH1cbiAgfVxufVxuIiwidmFyIGRvY3VtZW50ID0gcmVxdWlyZSgnZ2xvYmFsL2RvY3VtZW50JylcclxudmFyIGh5cGVyeCA9IHJlcXVpcmUoJ2h5cGVyeCcpXHJcbnZhciBvbmxvYWQgPSByZXF1aXJlKCdvbi1sb2FkJylcclxuXHJcbnZhciBTVkdOUyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZydcclxudmFyIFhMSU5LTlMgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaydcclxuXHJcbnZhciBCT09MX1BST1BTID0ge1xyXG4gIGF1dG9mb2N1czogMSxcclxuICBjaGVja2VkOiAxLFxyXG4gIGRlZmF1bHRjaGVja2VkOiAxLFxyXG4gIGRpc2FibGVkOiAxLFxyXG4gIGZvcm1ub3ZhbGlkYXRlOiAxLFxyXG4gIGluZGV0ZXJtaW5hdGU6IDEsXHJcbiAgcmVhZG9ubHk6IDEsXHJcbiAgcmVxdWlyZWQ6IDEsXHJcbiAgc2VsZWN0ZWQ6IDEsXHJcbiAgd2lsbHZhbGlkYXRlOiAxXHJcbn1cclxudmFyIFNWR19UQUdTID0gW1xyXG4gICdzdmcnLFxyXG4gICdhbHRHbHlwaCcsICdhbHRHbHlwaERlZicsICdhbHRHbHlwaEl0ZW0nLCAnYW5pbWF0ZScsICdhbmltYXRlQ29sb3InLFxyXG4gICdhbmltYXRlTW90aW9uJywgJ2FuaW1hdGVUcmFuc2Zvcm0nLCAnY2lyY2xlJywgJ2NsaXBQYXRoJywgJ2NvbG9yLXByb2ZpbGUnLFxyXG4gICdjdXJzb3InLCAnZGVmcycsICdkZXNjJywgJ2VsbGlwc2UnLCAnZmVCbGVuZCcsICdmZUNvbG9yTWF0cml4JyxcclxuICAnZmVDb21wb25lbnRUcmFuc2ZlcicsICdmZUNvbXBvc2l0ZScsICdmZUNvbnZvbHZlTWF0cml4JywgJ2ZlRGlmZnVzZUxpZ2h0aW5nJyxcclxuICAnZmVEaXNwbGFjZW1lbnRNYXAnLCAnZmVEaXN0YW50TGlnaHQnLCAnZmVGbG9vZCcsICdmZUZ1bmNBJywgJ2ZlRnVuY0InLFxyXG4gICdmZUZ1bmNHJywgJ2ZlRnVuY1InLCAnZmVHYXVzc2lhbkJsdXInLCAnZmVJbWFnZScsICdmZU1lcmdlJywgJ2ZlTWVyZ2VOb2RlJyxcclxuICAnZmVNb3JwaG9sb2d5JywgJ2ZlT2Zmc2V0JywgJ2ZlUG9pbnRMaWdodCcsICdmZVNwZWN1bGFyTGlnaHRpbmcnLFxyXG4gICdmZVNwb3RMaWdodCcsICdmZVRpbGUnLCAnZmVUdXJidWxlbmNlJywgJ2ZpbHRlcicsICdmb250JywgJ2ZvbnQtZmFjZScsXHJcbiAgJ2ZvbnQtZmFjZS1mb3JtYXQnLCAnZm9udC1mYWNlLW5hbWUnLCAnZm9udC1mYWNlLXNyYycsICdmb250LWZhY2UtdXJpJyxcclxuICAnZm9yZWlnbk9iamVjdCcsICdnJywgJ2dseXBoJywgJ2dseXBoUmVmJywgJ2hrZXJuJywgJ2ltYWdlJywgJ2xpbmUnLFxyXG4gICdsaW5lYXJHcmFkaWVudCcsICdtYXJrZXInLCAnbWFzaycsICdtZXRhZGF0YScsICdtaXNzaW5nLWdseXBoJywgJ21wYXRoJyxcclxuICAncGF0aCcsICdwYXR0ZXJuJywgJ3BvbHlnb24nLCAncG9seWxpbmUnLCAncmFkaWFsR3JhZGllbnQnLCAncmVjdCcsXHJcbiAgJ3NldCcsICdzdG9wJywgJ3N3aXRjaCcsICdzeW1ib2wnLCAndGV4dCcsICd0ZXh0UGF0aCcsICd0aXRsZScsICd0cmVmJyxcclxuICAndHNwYW4nLCAndXNlJywgJ3ZpZXcnLCAndmtlcm4nXHJcbl1cclxuXHJcbmZ1bmN0aW9uIGJlbENyZWF0ZUVsZW1lbnQgKHRhZywgcHJvcHMsIGNoaWxkcmVuKSB7XHJcbiAgdmFyIGVsXHJcblxyXG4gIC8vIElmIGFuIHN2ZyB0YWcsIGl0IG5lZWRzIGEgbmFtZXNwYWNlXHJcbiAgaWYgKFNWR19UQUdTLmluZGV4T2YodGFnKSAhPT0gLTEpIHtcclxuICAgIHByb3BzLm5hbWVzcGFjZSA9IFNWR05TXHJcbiAgfVxyXG5cclxuICAvLyBJZiB3ZSBhcmUgdXNpbmcgYSBuYW1lc3BhY2VcclxuICB2YXIgbnMgPSBmYWxzZVxyXG4gIGlmIChwcm9wcy5uYW1lc3BhY2UpIHtcclxuICAgIG5zID0gcHJvcHMubmFtZXNwYWNlXHJcbiAgICBkZWxldGUgcHJvcHMubmFtZXNwYWNlXHJcbiAgfVxyXG5cclxuICAvLyBDcmVhdGUgdGhlIGVsZW1lbnRcclxuICBpZiAobnMpIHtcclxuICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKG5zLCB0YWcpXHJcbiAgfSBlbHNlIHtcclxuICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpXHJcbiAgfVxyXG5cclxuICAvLyBJZiBhZGRpbmcgb25sb2FkIGV2ZW50c1xyXG4gIGlmIChwcm9wcy5vbmxvYWQgfHwgcHJvcHMub251bmxvYWQpIHtcclxuICAgIHZhciBsb2FkID0gcHJvcHMub25sb2FkIHx8IGZ1bmN0aW9uICgpIHt9XHJcbiAgICB2YXIgdW5sb2FkID0gcHJvcHMub251bmxvYWQgfHwgZnVuY3Rpb24gKCkge31cclxuICAgIG9ubG9hZChlbCwgZnVuY3Rpb24gYmVsT25sb2FkICgpIHtcclxuICAgICAgbG9hZChlbClcclxuICAgIH0sIGZ1bmN0aW9uIGJlbE9udW5sb2FkICgpIHtcclxuICAgICAgdW5sb2FkKGVsKVxyXG4gICAgfSxcclxuICAgIC8vIFdlIGhhdmUgdG8gdXNlIG5vbi1zdGFuZGFyZCBgY2FsbGVyYCB0byBmaW5kIHdobyBpbnZva2VzIGBiZWxDcmVhdGVFbGVtZW50YFxyXG4gICAgYmVsQ3JlYXRlRWxlbWVudC5jYWxsZXIuY2FsbGVyLmNhbGxlcilcclxuICAgIGRlbGV0ZSBwcm9wcy5vbmxvYWRcclxuICAgIGRlbGV0ZSBwcm9wcy5vbnVubG9hZFxyXG4gIH1cclxuXHJcbiAgLy8gQ3JlYXRlIHRoZSBwcm9wZXJ0aWVzXHJcbiAgZm9yICh2YXIgcCBpbiBwcm9wcykge1xyXG4gICAgaWYgKHByb3BzLmhhc093blByb3BlcnR5KHApKSB7XHJcbiAgICAgIHZhciBrZXkgPSBwLnRvTG93ZXJDYXNlKClcclxuICAgICAgdmFyIHZhbCA9IHByb3BzW3BdXHJcbiAgICAgIC8vIE5vcm1hbGl6ZSBjbGFzc05hbWVcclxuICAgICAgaWYgKGtleSA9PT0gJ2NsYXNzbmFtZScpIHtcclxuICAgICAgICBrZXkgPSAnY2xhc3MnXHJcbiAgICAgICAgcCA9ICdjbGFzcydcclxuICAgICAgfVxyXG4gICAgICAvLyBUaGUgZm9yIGF0dHJpYnV0ZSBnZXRzIHRyYW5zZm9ybWVkIHRvIGh0bWxGb3IsIGJ1dCB3ZSBqdXN0IHNldCBhcyBmb3JcclxuICAgICAgaWYgKHAgPT09ICdodG1sRm9yJykge1xyXG4gICAgICAgIHAgPSAnZm9yJ1xyXG4gICAgICB9XHJcbiAgICAgIC8vIElmIGEgcHJvcGVydHkgaXMgYm9vbGVhbiwgc2V0IGl0c2VsZiB0byB0aGUga2V5XHJcbiAgICAgIGlmIChCT09MX1BST1BTW2tleV0pIHtcclxuICAgICAgICBpZiAodmFsID09PSAndHJ1ZScpIHZhbCA9IGtleVxyXG4gICAgICAgIGVsc2UgaWYgKHZhbCA9PT0gJ2ZhbHNlJykgY29udGludWVcclxuICAgICAgfVxyXG4gICAgICAvLyBJZiBhIHByb3BlcnR5IHByZWZlcnMgYmVpbmcgc2V0IGRpcmVjdGx5IHZzIHNldEF0dHJpYnV0ZVxyXG4gICAgICBpZiAoa2V5LnNsaWNlKDAsIDIpID09PSAnb24nKSB7XHJcbiAgICAgICAgZWxbcF0gPSB2YWxcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAobnMpIHtcclxuICAgICAgICAgIGlmIChwID09PSAneGxpbms6aHJlZicpIHtcclxuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlTlMoWExJTktOUywgcCwgdmFsKVxyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlTlMobnVsbCwgcCwgdmFsKVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUocCwgdmFsKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZnVuY3Rpb24gYXBwZW5kQ2hpbGQgKGNoaWxkcykge1xyXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KGNoaWxkcykpIHJldHVyblxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIG5vZGUgPSBjaGlsZHNbaV1cclxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkobm9kZSkpIHtcclxuICAgICAgICBhcHBlbmRDaGlsZChub2RlKVxyXG4gICAgICAgIGNvbnRpbnVlXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0eXBlb2Ygbm9kZSA9PT0gJ251bWJlcicgfHxcclxuICAgICAgICB0eXBlb2Ygbm9kZSA9PT0gJ2Jvb2xlYW4nIHx8XHJcbiAgICAgICAgbm9kZSBpbnN0YW5jZW9mIERhdGUgfHxcclxuICAgICAgICBub2RlIGluc3RhbmNlb2YgUmVnRXhwKSB7XHJcbiAgICAgICAgbm9kZSA9IG5vZGUudG9TdHJpbmcoKVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodHlwZW9mIG5vZGUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgaWYgKGVsLmxhc3RDaGlsZCAmJiBlbC5sYXN0Q2hpbGQubm9kZU5hbWUgPT09ICcjdGV4dCcpIHtcclxuICAgICAgICAgIGVsLmxhc3RDaGlsZC5ub2RlVmFsdWUgKz0gbm9kZVxyXG4gICAgICAgICAgY29udGludWVcclxuICAgICAgICB9XHJcbiAgICAgICAgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG5vZGUpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChub2RlICYmIG5vZGUubm9kZVR5cGUpIHtcclxuICAgICAgICBlbC5hcHBlbmRDaGlsZChub2RlKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGFwcGVuZENoaWxkKGNoaWxkcmVuKVxyXG5cclxuICByZXR1cm4gZWxcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBoeXBlcngoYmVsQ3JlYXRlRWxlbWVudClcclxubW9kdWxlLmV4cG9ydHMuY3JlYXRlRWxlbWVudCA9IGJlbENyZWF0ZUVsZW1lbnRcclxuIiwiJ3VzZSBzdHJpY3QnO1xuLy8gQ3JlYXRlIGEgcmFuZ2Ugb2JqZWN0IGZvciBlZmZpY2VudGx5IHJlbmRlcmluZyBzdHJpbmdzIHRvIGVsZW1lbnRzLlxudmFyIHJhbmdlO1xuXG52YXIgZG9jID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudDtcblxudmFyIHRlc3RFbCA9IGRvYyA/XG4gICAgZG9jLmJvZHkgfHwgZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpIDpcbiAgICB7fTtcblxudmFyIE5TX1hIVE1MID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnO1xuXG52YXIgRUxFTUVOVF9OT0RFID0gMTtcbnZhciBURVhUX05PREUgPSAzO1xudmFyIENPTU1FTlRfTk9ERSA9IDg7XG5cbi8vIEZpeGVzIDxodHRwczovL2dpdGh1Yi5jb20vcGF0cmljay1zdGVlbGUtaWRlbS9tb3JwaGRvbS9pc3N1ZXMvMzI+XG4vLyAoSUU3KyBzdXBwb3J0KSA8PUlFNyBkb2VzIG5vdCBzdXBwb3J0IGVsLmhhc0F0dHJpYnV0ZShuYW1lKVxudmFyIGhhc0F0dHJpYnV0ZU5TO1xuXG5pZiAodGVzdEVsLmhhc0F0dHJpYnV0ZU5TKSB7XG4gICAgaGFzQXR0cmlidXRlTlMgPSBmdW5jdGlvbihlbCwgbmFtZXNwYWNlVVJJLCBuYW1lKSB7XG4gICAgICAgIHJldHVybiBlbC5oYXNBdHRyaWJ1dGVOUyhuYW1lc3BhY2VVUkksIG5hbWUpO1xuICAgIH07XG59IGVsc2UgaWYgKHRlc3RFbC5oYXNBdHRyaWJ1dGUpIHtcbiAgICBoYXNBdHRyaWJ1dGVOUyA9IGZ1bmN0aW9uKGVsLCBuYW1lc3BhY2VVUkksIG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGVsLmhhc0F0dHJpYnV0ZShuYW1lKTtcbiAgICB9O1xufSBlbHNlIHtcbiAgICBoYXNBdHRyaWJ1dGVOUyA9IGZ1bmN0aW9uKGVsLCBuYW1lc3BhY2VVUkksIG5hbWUpIHtcbiAgICAgICAgcmV0dXJuICEhZWwuZ2V0QXR0cmlidXRlTm9kZShuYW1lKTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiB0b0VsZW1lbnQoc3RyKSB7XG4gICAgaWYgKCFyYW5nZSAmJiBkb2MuY3JlYXRlUmFuZ2UpIHtcbiAgICAgICAgcmFuZ2UgPSBkb2MuY3JlYXRlUmFuZ2UoKTtcbiAgICAgICAgcmFuZ2Uuc2VsZWN0Tm9kZShkb2MuYm9keSk7XG4gICAgfVxuXG4gICAgdmFyIGZyYWdtZW50O1xuICAgIGlmIChyYW5nZSAmJiByYW5nZS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQpIHtcbiAgICAgICAgZnJhZ21lbnQgPSByYW5nZS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoc3RyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmcmFnbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdib2R5Jyk7XG4gICAgICAgIGZyYWdtZW50LmlubmVySFRNTCA9IHN0cjtcbiAgICB9XG4gICAgcmV0dXJuIGZyYWdtZW50LmNoaWxkTm9kZXNbMF07XG59XG5cbmZ1bmN0aW9uIHN5bmNCb29sZWFuQXR0clByb3AoZnJvbUVsLCB0b0VsLCBuYW1lKSB7XG4gICAgaWYgKGZyb21FbFtuYW1lXSAhPT0gdG9FbFtuYW1lXSkge1xuICAgICAgICBmcm9tRWxbbmFtZV0gPSB0b0VsW25hbWVdO1xuICAgICAgICBpZiAoZnJvbUVsW25hbWVdKSB7XG4gICAgICAgICAgICBmcm9tRWwuc2V0QXR0cmlidXRlKG5hbWUsICcnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZyb21FbC5yZW1vdmVBdHRyaWJ1dGUobmFtZSwgJycpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG52YXIgc3BlY2lhbEVsSGFuZGxlcnMgPSB7XG4gICAgLyoqXG4gICAgICogTmVlZGVkIGZvciBJRS4gQXBwYXJlbnRseSBJRSBkb2Vzbid0IHRoaW5rIHRoYXQgXCJzZWxlY3RlZFwiIGlzIGFuXG4gICAgICogYXR0cmlidXRlIHdoZW4gcmVhZGluZyBvdmVyIHRoZSBhdHRyaWJ1dGVzIHVzaW5nIHNlbGVjdEVsLmF0dHJpYnV0ZXNcbiAgICAgKi9cbiAgICBPUFRJT046IGZ1bmN0aW9uKGZyb21FbCwgdG9FbCkge1xuICAgICAgICBzeW5jQm9vbGVhbkF0dHJQcm9wKGZyb21FbCwgdG9FbCwgJ3NlbGVjdGVkJyk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBUaGUgXCJ2YWx1ZVwiIGF0dHJpYnV0ZSBpcyBzcGVjaWFsIGZvciB0aGUgPGlucHV0PiBlbGVtZW50IHNpbmNlIGl0IHNldHNcbiAgICAgKiB0aGUgaW5pdGlhbCB2YWx1ZS4gQ2hhbmdpbmcgdGhlIFwidmFsdWVcIiBhdHRyaWJ1dGUgd2l0aG91dCBjaGFuZ2luZyB0aGVcbiAgICAgKiBcInZhbHVlXCIgcHJvcGVydHkgd2lsbCBoYXZlIG5vIGVmZmVjdCBzaW5jZSBpdCBpcyBvbmx5IHVzZWQgdG8gdGhlIHNldCB0aGVcbiAgICAgKiBpbml0aWFsIHZhbHVlLiAgU2ltaWxhciBmb3IgdGhlIFwiY2hlY2tlZFwiIGF0dHJpYnV0ZSwgYW5kIFwiZGlzYWJsZWRcIi5cbiAgICAgKi9cbiAgICBJTlBVVDogZnVuY3Rpb24oZnJvbUVsLCB0b0VsKSB7XG4gICAgICAgIHN5bmNCb29sZWFuQXR0clByb3AoZnJvbUVsLCB0b0VsLCAnY2hlY2tlZCcpO1xuICAgICAgICBzeW5jQm9vbGVhbkF0dHJQcm9wKGZyb21FbCwgdG9FbCwgJ2Rpc2FibGVkJyk7XG5cbiAgICAgICAgaWYgKGZyb21FbC52YWx1ZSAhPT0gdG9FbC52YWx1ZSkge1xuICAgICAgICAgICAgZnJvbUVsLnZhbHVlID0gdG9FbC52YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaGFzQXR0cmlidXRlTlModG9FbCwgbnVsbCwgJ3ZhbHVlJykpIHtcbiAgICAgICAgICAgIGZyb21FbC5yZW1vdmVBdHRyaWJ1dGUoJ3ZhbHVlJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgVEVYVEFSRUE6IGZ1bmN0aW9uKGZyb21FbCwgdG9FbCkge1xuICAgICAgICB2YXIgbmV3VmFsdWUgPSB0b0VsLnZhbHVlO1xuICAgICAgICBpZiAoZnJvbUVsLnZhbHVlICE9PSBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgZnJvbUVsLnZhbHVlID0gbmV3VmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZnJvbUVsLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIGZyb21FbC5maXJzdENoaWxkLm5vZGVWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIHR3byBub2RlJ3MgbmFtZXMgYXJlIHRoZSBzYW1lLlxuICpcbiAqIE5PVEU6IFdlIGRvbid0IGJvdGhlciBjaGVja2luZyBgbmFtZXNwYWNlVVJJYCBiZWNhdXNlIHlvdSB3aWxsIG5ldmVyIGZpbmQgdHdvIEhUTUwgZWxlbWVudHMgd2l0aCB0aGUgc2FtZVxuICogICAgICAgbm9kZU5hbWUgYW5kIGRpZmZlcmVudCBuYW1lc3BhY2UgVVJJcy5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGFcbiAqIEBwYXJhbSB7RWxlbWVudH0gYiBUaGUgdGFyZ2V0IGVsZW1lbnRcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmVOb2RlTmFtZXMoZnJvbUVsLCB0b0VsKSB7XG4gICAgdmFyIGZyb21Ob2RlTmFtZSA9IGZyb21FbC5ub2RlTmFtZTtcbiAgICB2YXIgdG9Ob2RlTmFtZSA9IHRvRWwubm9kZU5hbWU7XG5cbiAgICBpZiAoZnJvbU5vZGVOYW1lID09PSB0b05vZGVOYW1lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0b0VsLmFjdHVhbGl6ZSAmJlxuICAgICAgICBmcm9tTm9kZU5hbWUuY2hhckNvZGVBdCgwKSA8IDkxICYmIC8qIGZyb20gdGFnIG5hbWUgaXMgdXBwZXIgY2FzZSAqL1xuICAgICAgICB0b05vZGVOYW1lLmNoYXJDb2RlQXQoMCkgPiA5MCAvKiB0YXJnZXQgdGFnIG5hbWUgaXMgbG93ZXIgY2FzZSAqLykge1xuICAgICAgICAvLyBJZiB0aGUgdGFyZ2V0IGVsZW1lbnQgaXMgYSB2aXJ0dWFsIERPTSBub2RlIHRoZW4gd2UgbWF5IG5lZWQgdG8gbm9ybWFsaXplIHRoZSB0YWcgbmFtZVxuICAgICAgICAvLyBiZWZvcmUgY29tcGFyaW5nLiBOb3JtYWwgSFRNTCBlbGVtZW50cyB0aGF0IGFyZSBpbiB0aGUgXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCJcbiAgICAgICAgLy8gYXJlIGNvbnZlcnRlZCB0byB1cHBlciBjYXNlXG4gICAgICAgIHJldHVybiBmcm9tTm9kZU5hbWUgPT09IHRvTm9kZU5hbWUudG9VcHBlckNhc2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG4vKipcbiAqIENyZWF0ZSBhbiBlbGVtZW50LCBvcHRpb25hbGx5IHdpdGggYSBrbm93biBuYW1lc3BhY2UgVVJJLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIHRoZSBlbGVtZW50IG5hbWUsIGUuZy4gJ2Rpdicgb3IgJ3N2ZydcbiAqIEBwYXJhbSB7c3RyaW5nfSBbbmFtZXNwYWNlVVJJXSB0aGUgZWxlbWVudCdzIG5hbWVzcGFjZSBVUkksIGkuZS4gdGhlIHZhbHVlIG9mXG4gKiBpdHMgYHhtbG5zYCBhdHRyaWJ1dGUgb3IgaXRzIGluZmVycmVkIG5hbWVzcGFjZS5cbiAqXG4gKiBAcmV0dXJuIHtFbGVtZW50fVxuICovXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50TlMobmFtZSwgbmFtZXNwYWNlVVJJKSB7XG4gICAgcmV0dXJuICFuYW1lc3BhY2VVUkkgfHwgbmFtZXNwYWNlVVJJID09PSBOU19YSFRNTCA/XG4gICAgICAgIGRvYy5jcmVhdGVFbGVtZW50KG5hbWUpIDpcbiAgICAgICAgZG9jLmNyZWF0ZUVsZW1lbnROUyhuYW1lc3BhY2VVUkksIG5hbWUpO1xufVxuXG4vKipcbiAqIExvb3Agb3ZlciBhbGwgb2YgdGhlIGF0dHJpYnV0ZXMgb24gdGhlIHRhcmdldCBub2RlIGFuZCBtYWtlIHN1cmUgdGhlIG9yaWdpbmFsXG4gKiBET00gbm9kZSBoYXMgdGhlIHNhbWUgYXR0cmlidXRlcy4gSWYgYW4gYXR0cmlidXRlIGZvdW5kIG9uIHRoZSBvcmlnaW5hbCBub2RlXG4gKiBpcyBub3Qgb24gdGhlIG5ldyBub2RlIHRoZW4gcmVtb3ZlIGl0IGZyb20gdGhlIG9yaWdpbmFsIG5vZGUuXG4gKlxuICogQHBhcmFtICB7RWxlbWVudH0gZnJvbU5vZGVcbiAqIEBwYXJhbSAge0VsZW1lbnR9IHRvTm9kZVxuICovXG5mdW5jdGlvbiBtb3JwaEF0dHJzKGZyb21Ob2RlLCB0b05vZGUpIHtcbiAgICB2YXIgYXR0cnMgPSB0b05vZGUuYXR0cmlidXRlcztcbiAgICB2YXIgaTtcbiAgICB2YXIgYXR0cjtcbiAgICB2YXIgYXR0ck5hbWU7XG4gICAgdmFyIGF0dHJOYW1lc3BhY2VVUkk7XG4gICAgdmFyIGF0dHJWYWx1ZTtcbiAgICB2YXIgZnJvbVZhbHVlO1xuXG4gICAgaWYgKHRvTm9kZS5hc3NpZ25BdHRyaWJ1dGVzKSB7XG4gICAgICAgIHRvTm9kZS5hc3NpZ25BdHRyaWJ1dGVzKGZyb21Ob2RlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGkgPSBhdHRycy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgICAgYXR0ciA9IGF0dHJzW2ldO1xuICAgICAgICAgICAgYXR0ck5hbWUgPSBhdHRyLm5hbWU7XG4gICAgICAgICAgICBhdHRyTmFtZXNwYWNlVVJJID0gYXR0ci5uYW1lc3BhY2VVUkk7XG4gICAgICAgICAgICBhdHRyVmFsdWUgPSBhdHRyLnZhbHVlO1xuXG4gICAgICAgICAgICBpZiAoYXR0ck5hbWVzcGFjZVVSSSkge1xuICAgICAgICAgICAgICAgIGF0dHJOYW1lID0gYXR0ci5sb2NhbE5hbWUgfHwgYXR0ck5hbWU7XG4gICAgICAgICAgICAgICAgZnJvbVZhbHVlID0gZnJvbU5vZGUuZ2V0QXR0cmlidXRlTlMoYXR0ck5hbWVzcGFjZVVSSSwgYXR0ck5hbWUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZyb21WYWx1ZSAhPT0gYXR0clZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyb21Ob2RlLnNldEF0dHJpYnV0ZU5TKGF0dHJOYW1lc3BhY2VVUkksIGF0dHJOYW1lLCBhdHRyVmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZnJvbVZhbHVlID0gZnJvbU5vZGUuZ2V0QXR0cmlidXRlKGF0dHJOYW1lKTtcblxuICAgICAgICAgICAgICAgIGlmIChmcm9tVmFsdWUgIT09IGF0dHJWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBmcm9tTm9kZS5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJWYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGFueSBleHRyYSBhdHRyaWJ1dGVzIGZvdW5kIG9uIHRoZSBvcmlnaW5hbCBET00gZWxlbWVudCB0aGF0XG4gICAgLy8gd2VyZW4ndCBmb3VuZCBvbiB0aGUgdGFyZ2V0IGVsZW1lbnQuXG4gICAgYXR0cnMgPSBmcm9tTm9kZS5hdHRyaWJ1dGVzO1xuXG4gICAgZm9yIChpID0gYXR0cnMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgYXR0ciA9IGF0dHJzW2ldO1xuICAgICAgICBpZiAoYXR0ci5zcGVjaWZpZWQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBhdHRyTmFtZSA9IGF0dHIubmFtZTtcbiAgICAgICAgICAgIGF0dHJOYW1lc3BhY2VVUkkgPSBhdHRyLm5hbWVzcGFjZVVSSTtcblxuICAgICAgICAgICAgaWYgKGF0dHJOYW1lc3BhY2VVUkkpIHtcbiAgICAgICAgICAgICAgICBhdHRyTmFtZSA9IGF0dHIubG9jYWxOYW1lIHx8IGF0dHJOYW1lO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFoYXNBdHRyaWJ1dGVOUyh0b05vZGUsIGF0dHJOYW1lc3BhY2VVUkksIGF0dHJOYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICBmcm9tTm9kZS5yZW1vdmVBdHRyaWJ1dGVOUyhhdHRyTmFtZXNwYWNlVVJJLCBhdHRyTmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIWhhc0F0dHJpYnV0ZU5TKHRvTm9kZSwgbnVsbCwgYXR0ck5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyb21Ob2RlLnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIENvcGllcyB0aGUgY2hpbGRyZW4gb2Ygb25lIERPTSBlbGVtZW50IHRvIGFub3RoZXIgRE9NIGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gbW92ZUNoaWxkcmVuKGZyb21FbCwgdG9FbCkge1xuICAgIHZhciBjdXJDaGlsZCA9IGZyb21FbC5maXJzdENoaWxkO1xuICAgIHdoaWxlIChjdXJDaGlsZCkge1xuICAgICAgICB2YXIgbmV4dENoaWxkID0gY3VyQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgIHRvRWwuYXBwZW5kQ2hpbGQoY3VyQ2hpbGQpO1xuICAgICAgICBjdXJDaGlsZCA9IG5leHRDaGlsZDtcbiAgICB9XG4gICAgcmV0dXJuIHRvRWw7XG59XG5cbmZ1bmN0aW9uIGRlZmF1bHRHZXROb2RlS2V5KG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5pZDtcbn1cblxuZnVuY3Rpb24gbW9ycGhkb20oZnJvbU5vZGUsIHRvTm9kZSwgb3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0ge307XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB0b05vZGUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmIChmcm9tTm9kZS5ub2RlTmFtZSA9PT0gJyNkb2N1bWVudCcgfHwgZnJvbU5vZGUubm9kZU5hbWUgPT09ICdIVE1MJykge1xuICAgICAgICAgICAgdmFyIHRvTm9kZUh0bWwgPSB0b05vZGU7XG4gICAgICAgICAgICB0b05vZGUgPSBkb2MuY3JlYXRlRWxlbWVudCgnaHRtbCcpO1xuICAgICAgICAgICAgdG9Ob2RlLmlubmVySFRNTCA9IHRvTm9kZUh0bWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b05vZGUgPSB0b0VsZW1lbnQodG9Ob2RlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBnZXROb2RlS2V5ID0gb3B0aW9ucy5nZXROb2RlS2V5IHx8IGRlZmF1bHRHZXROb2RlS2V5O1xuICAgIHZhciBvbkJlZm9yZU5vZGVBZGRlZCA9IG9wdGlvbnMub25CZWZvcmVOb2RlQWRkZWQgfHwgbm9vcDtcbiAgICB2YXIgb25Ob2RlQWRkZWQgPSBvcHRpb25zLm9uTm9kZUFkZGVkIHx8IG5vb3A7XG4gICAgdmFyIG9uQmVmb3JlRWxVcGRhdGVkID0gb3B0aW9ucy5vbkJlZm9yZUVsVXBkYXRlZCB8fCBub29wO1xuICAgIHZhciBvbkVsVXBkYXRlZCA9IG9wdGlvbnMub25FbFVwZGF0ZWQgfHwgbm9vcDtcbiAgICB2YXIgb25CZWZvcmVOb2RlRGlzY2FyZGVkID0gb3B0aW9ucy5vbkJlZm9yZU5vZGVEaXNjYXJkZWQgfHwgbm9vcDtcbiAgICB2YXIgb25Ob2RlRGlzY2FyZGVkID0gb3B0aW9ucy5vbk5vZGVEaXNjYXJkZWQgfHwgbm9vcDtcbiAgICB2YXIgb25CZWZvcmVFbENoaWxkcmVuVXBkYXRlZCA9IG9wdGlvbnMub25CZWZvcmVFbENoaWxkcmVuVXBkYXRlZCB8fCBub29wO1xuICAgIHZhciBjaGlsZHJlbk9ubHkgPSBvcHRpb25zLmNoaWxkcmVuT25seSA9PT0gdHJ1ZTtcblxuICAgIC8vIFRoaXMgb2JqZWN0IGlzIHVzZWQgYXMgYSBsb29rdXAgdG8gcXVpY2tseSBmaW5kIGFsbCBrZXllZCBlbGVtZW50cyBpbiB0aGUgb3JpZ2luYWwgRE9NIHRyZWUuXG4gICAgdmFyIGZyb21Ob2Rlc0xvb2t1cCA9IHt9O1xuICAgIHZhciBrZXllZFJlbW92YWxMaXN0O1xuXG4gICAgZnVuY3Rpb24gYWRkS2V5ZWRSZW1vdmFsKGtleSkge1xuICAgICAgICBpZiAoa2V5ZWRSZW1vdmFsTGlzdCkge1xuICAgICAgICAgICAga2V5ZWRSZW1vdmFsTGlzdC5wdXNoKGtleSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBrZXllZFJlbW92YWxMaXN0ID0gW2tleV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3YWxrRGlzY2FyZGVkQ2hpbGROb2Rlcyhub2RlLCBza2lwS2V5ZWROb2Rlcykge1xuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICB2YXIgY3VyQ2hpbGQgPSBub2RlLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICB3aGlsZSAoY3VyQ2hpbGQpIHtcblxuICAgICAgICAgICAgICAgIHZhciBrZXkgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2tpcEtleWVkTm9kZXMgJiYgKGtleSA9IGdldE5vZGVLZXkoY3VyQ2hpbGQpKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB3ZSBhcmUgc2tpcHBpbmcga2V5ZWQgbm9kZXMgdGhlbiB3ZSBhZGQgdGhlIGtleVxuICAgICAgICAgICAgICAgICAgICAvLyB0byBhIGxpc3Qgc28gdGhhdCBpdCBjYW4gYmUgaGFuZGxlZCBhdCB0aGUgdmVyeSBlbmQuXG4gICAgICAgICAgICAgICAgICAgIGFkZEtleWVkUmVtb3ZhbChrZXkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE9ubHkgcmVwb3J0IHRoZSBub2RlIGFzIGRpc2NhcmRlZCBpZiBpdCBpcyBub3Qga2V5ZWQuIFdlIGRvIHRoaXMgYmVjYXVzZVxuICAgICAgICAgICAgICAgICAgICAvLyBhdCB0aGUgZW5kIHdlIGxvb3AgdGhyb3VnaCBhbGwga2V5ZWQgZWxlbWVudHMgdGhhdCB3ZXJlIHVubWF0Y2hlZFxuICAgICAgICAgICAgICAgICAgICAvLyBhbmQgdGhlbiBkaXNjYXJkIHRoZW0gaW4gb25lIGZpbmFsIHBhc3MuXG4gICAgICAgICAgICAgICAgICAgIG9uTm9kZURpc2NhcmRlZChjdXJDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJDaGlsZC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3YWxrRGlzY2FyZGVkQ2hpbGROb2RlcyhjdXJDaGlsZCwgc2tpcEtleWVkTm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY3VyQ2hpbGQgPSBjdXJDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBET00gbm9kZSBvdXQgb2YgdGhlIG9yaWdpbmFsIERPTVxuICAgICAqXG4gICAgICogQHBhcmFtICB7Tm9kZX0gbm9kZSBUaGUgbm9kZSB0byByZW1vdmVcbiAgICAgKiBAcGFyYW0gIHtOb2RlfSBwYXJlbnROb2RlIFRoZSBub2RlcyBwYXJlbnRcbiAgICAgKiBAcGFyYW0gIHtCb29sZWFufSBza2lwS2V5ZWROb2RlcyBJZiB0cnVlIHRoZW4gZWxlbWVudHMgd2l0aCBrZXlzIHdpbGwgYmUgc2tpcHBlZCBhbmQgbm90IGRpc2NhcmRlZC5cbiAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR9XG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVtb3ZlTm9kZShub2RlLCBwYXJlbnROb2RlLCBza2lwS2V5ZWROb2Rlcykge1xuICAgICAgICBpZiAob25CZWZvcmVOb2RlRGlzY2FyZGVkKG5vZGUpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobm9kZSk7XG4gICAgICAgIH1cblxuICAgICAgICBvbk5vZGVEaXNjYXJkZWQobm9kZSk7XG4gICAgICAgIHdhbGtEaXNjYXJkZWRDaGlsZE5vZGVzKG5vZGUsIHNraXBLZXllZE5vZGVzKTtcbiAgICB9XG5cbiAgICAvLyAvLyBUcmVlV2Fsa2VyIGltcGxlbWVudGF0aW9uIGlzIG5vIGZhc3RlciwgYnV0IGtlZXBpbmcgdGhpcyBhcm91bmQgaW4gY2FzZSB0aGlzIGNoYW5nZXMgaW4gdGhlIGZ1dHVyZVxuICAgIC8vIGZ1bmN0aW9uIGluZGV4VHJlZShyb290KSB7XG4gICAgLy8gICAgIHZhciB0cmVlV2Fsa2VyID0gZG9jdW1lbnQuY3JlYXRlVHJlZVdhbGtlcihcbiAgICAvLyAgICAgICAgIHJvb3QsXG4gICAgLy8gICAgICAgICBOb2RlRmlsdGVyLlNIT1dfRUxFTUVOVCk7XG4gICAgLy9cbiAgICAvLyAgICAgdmFyIGVsO1xuICAgIC8vICAgICB3aGlsZSgoZWwgPSB0cmVlV2Fsa2VyLm5leHROb2RlKCkpKSB7XG4gICAgLy8gICAgICAgICB2YXIga2V5ID0gZ2V0Tm9kZUtleShlbCk7XG4gICAgLy8gICAgICAgICBpZiAoa2V5KSB7XG4gICAgLy8gICAgICAgICAgICAgZnJvbU5vZGVzTG9va3VwW2tleV0gPSBlbDtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vIH1cblxuICAgIC8vIC8vIE5vZGVJdGVyYXRvciBpbXBsZW1lbnRhdGlvbiBpcyBubyBmYXN0ZXIsIGJ1dCBrZWVwaW5nIHRoaXMgYXJvdW5kIGluIGNhc2UgdGhpcyBjaGFuZ2VzIGluIHRoZSBmdXR1cmVcbiAgICAvL1xuICAgIC8vIGZ1bmN0aW9uIGluZGV4VHJlZShub2RlKSB7XG4gICAgLy8gICAgIHZhciBub2RlSXRlcmF0b3IgPSBkb2N1bWVudC5jcmVhdGVOb2RlSXRlcmF0b3Iobm9kZSwgTm9kZUZpbHRlci5TSE9XX0VMRU1FTlQpO1xuICAgIC8vICAgICB2YXIgZWw7XG4gICAgLy8gICAgIHdoaWxlKChlbCA9IG5vZGVJdGVyYXRvci5uZXh0Tm9kZSgpKSkge1xuICAgIC8vICAgICAgICAgdmFyIGtleSA9IGdldE5vZGVLZXkoZWwpO1xuICAgIC8vICAgICAgICAgaWYgKGtleSkge1xuICAgIC8vICAgICAgICAgICAgIGZyb21Ob2Rlc0xvb2t1cFtrZXldID0gZWw7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG5cbiAgICBmdW5jdGlvbiBpbmRleFRyZWUobm9kZSkge1xuICAgICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICB2YXIgY3VyQ2hpbGQgPSBub2RlLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICB3aGlsZSAoY3VyQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gZ2V0Tm9kZUtleShjdXJDaGlsZCk7XG4gICAgICAgICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgICAgICAgICBmcm9tTm9kZXNMb29rdXBba2V5XSA9IGN1ckNoaWxkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFdhbGsgcmVjdXJzaXZlbHlcbiAgICAgICAgICAgICAgICBpbmRleFRyZWUoY3VyQ2hpbGQpO1xuXG4gICAgICAgICAgICAgICAgY3VyQ2hpbGQgPSBjdXJDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluZGV4VHJlZShmcm9tTm9kZSk7XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVOb2RlQWRkZWQoZWwpIHtcbiAgICAgICAgb25Ob2RlQWRkZWQoZWwpO1xuXG4gICAgICAgIHZhciBjdXJDaGlsZCA9IGVsLmZpcnN0Q2hpbGQ7XG4gICAgICAgIHdoaWxlIChjdXJDaGlsZCkge1xuICAgICAgICAgICAgdmFyIG5leHRTaWJsaW5nID0gY3VyQ2hpbGQubmV4dFNpYmxpbmc7XG5cbiAgICAgICAgICAgIHZhciBrZXkgPSBnZXROb2RlS2V5KGN1ckNoaWxkKTtcbiAgICAgICAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdW5tYXRjaGVkRnJvbUVsID0gZnJvbU5vZGVzTG9va3VwW2tleV07XG4gICAgICAgICAgICAgICAgaWYgKHVubWF0Y2hlZEZyb21FbCAmJiBjb21wYXJlTm9kZU5hbWVzKGN1ckNoaWxkLCB1bm1hdGNoZWRGcm9tRWwpKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1ckNoaWxkLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHVubWF0Y2hlZEZyb21FbCwgY3VyQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBtb3JwaEVsKHVubWF0Y2hlZEZyb21FbCwgY3VyQ2hpbGQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaGFuZGxlTm9kZUFkZGVkKGN1ckNoaWxkKTtcbiAgICAgICAgICAgIGN1ckNoaWxkID0gbmV4dFNpYmxpbmc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb3JwaEVsKGZyb21FbCwgdG9FbCwgY2hpbGRyZW5Pbmx5KSB7XG4gICAgICAgIHZhciB0b0VsS2V5ID0gZ2V0Tm9kZUtleSh0b0VsKTtcbiAgICAgICAgdmFyIGN1ckZyb21Ob2RlS2V5O1xuXG4gICAgICAgIGlmICh0b0VsS2V5KSB7XG4gICAgICAgICAgICAvLyBJZiBhbiBlbGVtZW50IHdpdGggYW4gSUQgaXMgYmVpbmcgbW9ycGhlZCB0aGVuIGl0IGlzIHdpbGwgYmUgaW4gdGhlIGZpbmFsXG4gICAgICAgICAgICAvLyBET00gc28gY2xlYXIgaXQgb3V0IG9mIHRoZSBzYXZlZCBlbGVtZW50cyBjb2xsZWN0aW9uXG4gICAgICAgICAgICBkZWxldGUgZnJvbU5vZGVzTG9va3VwW3RvRWxLZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRvTm9kZS5pc1NhbWVOb2RlICYmIHRvTm9kZS5pc1NhbWVOb2RlKGZyb21Ob2RlKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjaGlsZHJlbk9ubHkpIHtcbiAgICAgICAgICAgIGlmIChvbkJlZm9yZUVsVXBkYXRlZChmcm9tRWwsIHRvRWwpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbW9ycGhBdHRycyhmcm9tRWwsIHRvRWwpO1xuICAgICAgICAgICAgb25FbFVwZGF0ZWQoZnJvbUVsKTtcblxuICAgICAgICAgICAgaWYgKG9uQmVmb3JlRWxDaGlsZHJlblVwZGF0ZWQoZnJvbUVsLCB0b0VsKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZnJvbUVsLm5vZGVOYW1lICE9PSAnVEVYVEFSRUEnKSB7XG4gICAgICAgICAgICB2YXIgY3VyVG9Ob2RlQ2hpbGQgPSB0b0VsLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICB2YXIgY3VyRnJvbU5vZGVDaGlsZCA9IGZyb21FbC5maXJzdENoaWxkO1xuICAgICAgICAgICAgdmFyIGN1clRvTm9kZUtleTtcblxuICAgICAgICAgICAgdmFyIGZyb21OZXh0U2libGluZztcbiAgICAgICAgICAgIHZhciB0b05leHRTaWJsaW5nO1xuICAgICAgICAgICAgdmFyIG1hdGNoaW5nRnJvbUVsO1xuXG4gICAgICAgICAgICBvdXRlcjogd2hpbGUgKGN1clRvTm9kZUNoaWxkKSB7XG4gICAgICAgICAgICAgICAgdG9OZXh0U2libGluZyA9IGN1clRvTm9kZUNoaWxkLm5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGN1clRvTm9kZUtleSA9IGdldE5vZGVLZXkoY3VyVG9Ob2RlQ2hpbGQpO1xuXG4gICAgICAgICAgICAgICAgd2hpbGUgKGN1ckZyb21Ob2RlQ2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbU5leHRTaWJsaW5nID0gY3VyRnJvbU5vZGVDaGlsZC5uZXh0U2libGluZztcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VyVG9Ob2RlQ2hpbGQuaXNTYW1lTm9kZSAmJiBjdXJUb05vZGVDaGlsZC5pc1NhbWVOb2RlKGN1ckZyb21Ob2RlQ2hpbGQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJUb05vZGVDaGlsZCA9IHRvTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUtleSA9IGdldE5vZGVLZXkoY3VyRnJvbU5vZGVDaGlsZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGN1ckZyb21Ob2RlVHlwZSA9IGN1ckZyb21Ob2RlQ2hpbGQubm9kZVR5cGU7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIGlzQ29tcGF0aWJsZSA9IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoY3VyRnJvbU5vZGVUeXBlID09PSBjdXJUb05vZGVDaGlsZC5ub2RlVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckZyb21Ob2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQm90aCBub2RlcyBiZWluZyBjb21wYXJlZCBhcmUgRWxlbWVudCBub2Rlc1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1clRvTm9kZUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgdGFyZ2V0IG5vZGUgaGFzIGEga2V5IHNvIHdlIHdhbnQgdG8gbWF0Y2ggaXQgdXAgd2l0aCB0aGUgY29ycmVjdCBlbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGluIHRoZSBvcmlnaW5hbCBET00gdHJlZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyVG9Ob2RlS2V5ICE9PSBjdXJGcm9tTm9kZUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGN1cnJlbnQgZWxlbWVudCBpbiB0aGUgb3JpZ2luYWwgRE9NIHRyZWUgZG9lcyBub3QgaGF2ZSBhIG1hdGNoaW5nIGtleSBzb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0J3MgY2hlY2sgb3VyIGxvb2t1cCB0byBzZWUgaWYgdGhlcmUgaXMgYSBtYXRjaGluZyBlbGVtZW50IGluIHRoZSBvcmlnaW5hbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRE9NIHRyZWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgobWF0Y2hpbmdGcm9tRWwgPSBmcm9tTm9kZXNMb29rdXBbY3VyVG9Ob2RlS2V5XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyRnJvbU5vZGVDaGlsZC5uZXh0U2libGluZyA9PT0gbWF0Y2hpbmdGcm9tRWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3BlY2lhbCBjYXNlIGZvciBzaW5nbGUgZWxlbWVudCByZW1vdmFscy4gVG8gYXZvaWQgcmVtb3ZpbmcgdGhlIG9yaWdpbmFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIERPTSBub2RlIG91dCBvZiB0aGUgdHJlZSAoc2luY2UgdGhhdCBjYW4gYnJlYWsgQ1NTIHRyYW5zaXRpb25zLCBldGMuKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2Ugd2lsbCBpbnN0ZWFkIGRpc2NhcmQgdGhlIGN1cnJlbnQgbm9kZSBhbmQgd2FpdCB1bnRpbCB0aGUgbmV4dFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpdGVyYXRpb24gdG8gcHJvcGVybHkgbWF0Y2ggdXAgdGhlIGtleWVkIHRhcmdldCBlbGVtZW50IHdpdGggaXRzIG1hdGNoaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVsZW1lbnQgaW4gdGhlIG9yaWdpbmFsIHRyZWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDb21wYXRpYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2UgZm91bmQgYSBtYXRjaGluZyBrZXllZCBlbGVtZW50IHNvbWV3aGVyZSBpbiB0aGUgb3JpZ2luYWwgRE9NIHRyZWUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIExldCdzIG1vdmluZyB0aGUgb3JpZ2luYWwgRE9NIG5vZGUgaW50byB0aGUgY3VycmVudCBwb3NpdGlvbiBhbmQgbW9ycGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaXQuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTk9URTogV2UgdXNlIGluc2VydEJlZm9yZSBpbnN0ZWFkIG9mIHJlcGxhY2VDaGlsZCBiZWNhdXNlIHdlIHdhbnQgdG8gZ28gdGhyb3VnaFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgYHJlbW92ZU5vZGUoKWAgZnVuY3Rpb24gZm9yIHRoZSBub2RlIHRoYXQgaXMgYmVpbmcgZGlzY2FyZGVkIHNvIHRoYXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWxsIGxpZmVjeWNsZSBob29rcyBhcmUgY29ycmVjdGx5IGludm9rZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnJvbUVsLmluc2VydEJlZm9yZShtYXRjaGluZ0Zyb21FbCwgY3VyRnJvbU5vZGVDaGlsZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckZyb21Ob2RlS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTaW5jZSB0aGUgbm9kZSBpcyBrZXllZCBpdCBtaWdodCBiZSBtYXRjaGVkIHVwIGxhdGVyIHNvIHdlIGRlZmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgYWN0dWFsIHJlbW92YWwgdG8gbGF0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZEtleWVkUmVtb3ZhbChjdXJGcm9tTm9kZUtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiB3ZSBza2lwIG5lc3RlZCBrZXllZCBub2RlcyBmcm9tIGJlaW5nIHJlbW92ZWQgc2luY2UgdGhlcmUgaXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgIHN0aWxsIGEgY2hhbmNlIHRoZXkgd2lsbCBiZSBtYXRjaGVkIHVwIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVOb2RlKGN1ckZyb21Ob2RlQ2hpbGQsIGZyb21FbCwgdHJ1ZSAvKiBza2lwIGtleWVkIG5vZGVzICovKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb21OZXh0U2libGluZyA9IGN1ckZyb21Ob2RlQ2hpbGQubmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQgPSBtYXRjaGluZ0Zyb21FbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBub2RlcyBhcmUgbm90IGNvbXBhdGlibGUgc2luY2UgdGhlIFwidG9cIiBub2RlIGhhcyBhIGtleSBhbmQgdGhlcmVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpcyBubyBtYXRjaGluZyBrZXllZCBub2RlIGluIHRoZSBzb3VyY2UgdHJlZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGF0aWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJGcm9tTm9kZUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgb3JpZ2luYWwgaGFzIGEga2V5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGF0aWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQ29tcGF0aWJsZSA9IGlzQ29tcGF0aWJsZSAhPT0gZmFsc2UgJiYgY29tcGFyZU5vZGVOYW1lcyhjdXJGcm9tTm9kZUNoaWxkLCBjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzQ29tcGF0aWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBmb3VuZCBjb21wYXRpYmxlIERPTSBlbGVtZW50cyBzbyB0cmFuc2Zvcm1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGN1cnJlbnQgXCJmcm9tXCIgbm9kZSB0byBtYXRjaCB0aGUgY3VycmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB0YXJnZXQgRE9NIG5vZGUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vcnBoRWwoY3VyRnJvbU5vZGVDaGlsZCwgY3VyVG9Ob2RlQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJGcm9tTm9kZVR5cGUgPT09IFRFWFRfTk9ERSB8fCBjdXJGcm9tTm9kZVR5cGUgPT0gQ09NTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQm90aCBub2RlcyBiZWluZyBjb21wYXJlZCBhcmUgVGV4dCBvciBDb21tZW50IG5vZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNDb21wYXRpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTaW1wbHkgdXBkYXRlIG5vZGVWYWx1ZSBvbiB0aGUgb3JpZ2luYWwgbm9kZSB0b1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNoYW5nZSB0aGUgdGV4dCB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQubm9kZVZhbHVlID0gY3VyVG9Ob2RlQ2hpbGQubm9kZVZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzQ29tcGF0aWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWR2YW5jZSBib3RoIHRoZSBcInRvXCIgY2hpbGQgYW5kIHRoZSBcImZyb21cIiBjaGlsZCBzaW5jZSB3ZSBmb3VuZCBhIG1hdGNoXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJUb05vZGVDaGlsZCA9IHRvTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJGcm9tTm9kZUNoaWxkID0gZnJvbU5leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWUgb3V0ZXI7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBObyBjb21wYXRpYmxlIG1hdGNoIHNvIHJlbW92ZSB0aGUgb2xkIG5vZGUgZnJvbSB0aGUgRE9NIGFuZCBjb250aW51ZSB0cnlpbmcgdG8gZmluZCBhXG4gICAgICAgICAgICAgICAgICAgIC8vIG1hdGNoIGluIHRoZSBvcmlnaW5hbCBET00uIEhvd2V2ZXIsIHdlIG9ubHkgZG8gdGhpcyBpZiB0aGUgZnJvbSBub2RlIGlzIG5vdCBrZXllZFxuICAgICAgICAgICAgICAgICAgICAvLyBzaW5jZSBpdCBpcyBwb3NzaWJsZSB0aGF0IGEga2V5ZWQgbm9kZSBtaWdodCBtYXRjaCB1cCB3aXRoIGEgbm9kZSBzb21ld2hlcmUgZWxzZSBpbiB0aGVcbiAgICAgICAgICAgICAgICAgICAgLy8gdGFyZ2V0IHRyZWUgYW5kIHdlIGRvbid0IHdhbnQgdG8gZGlzY2FyZCBpdCBqdXN0IHlldCBzaW5jZSBpdCBzdGlsbCBtaWdodCBmaW5kIGFcbiAgICAgICAgICAgICAgICAgICAgLy8gaG9tZSBpbiB0aGUgZmluYWwgRE9NIHRyZWUuIEFmdGVyIGV2ZXJ5dGhpbmcgaXMgZG9uZSB3ZSB3aWxsIHJlbW92ZSBhbnkga2V5ZWQgbm9kZXNcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhhdCBkaWRuJ3QgZmluZCBhIGhvbWVcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1ckZyb21Ob2RlS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTaW5jZSB0aGUgbm9kZSBpcyBrZXllZCBpdCBtaWdodCBiZSBtYXRjaGVkIHVwIGxhdGVyIHNvIHdlIGRlZmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGUgYWN0dWFsIHJlbW92YWwgdG8gbGF0ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZEtleWVkUmVtb3ZhbChjdXJGcm9tTm9kZUtleSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiB3ZSBza2lwIG5lc3RlZCBrZXllZCBub2RlcyBmcm9tIGJlaW5nIHJlbW92ZWQgc2luY2UgdGhlcmUgaXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgIHN0aWxsIGEgY2hhbmNlIHRoZXkgd2lsbCBiZSBtYXRjaGVkIHVwIGxhdGVyXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVOb2RlKGN1ckZyb21Ob2RlQ2hpbGQsIGZyb21FbCwgdHJ1ZSAvKiBza2lwIGtleWVkIG5vZGVzICovKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgZ290IHRoaXMgZmFyIHRoZW4gd2UgZGlkIG5vdCBmaW5kIGEgY2FuZGlkYXRlIG1hdGNoIGZvclxuICAgICAgICAgICAgICAgIC8vIG91ciBcInRvIG5vZGVcIiBhbmQgd2UgZXhoYXVzdGVkIGFsbCBvZiB0aGUgY2hpbGRyZW4gXCJmcm9tXCJcbiAgICAgICAgICAgICAgICAvLyBub2Rlcy4gVGhlcmVmb3JlLCB3ZSB3aWxsIGp1c3QgYXBwZW5kIHRoZSBjdXJyZW50IFwidG9cIiBub2RlXG4gICAgICAgICAgICAgICAgLy8gdG8gdGhlIGVuZFxuICAgICAgICAgICAgICAgIGlmIChjdXJUb05vZGVLZXkgJiYgKG1hdGNoaW5nRnJvbUVsID0gZnJvbU5vZGVzTG9va3VwW2N1clRvTm9kZUtleV0pICYmIGNvbXBhcmVOb2RlTmFtZXMobWF0Y2hpbmdGcm9tRWwsIGN1clRvTm9kZUNoaWxkKSkge1xuICAgICAgICAgICAgICAgICAgICBmcm9tRWwuYXBwZW5kQ2hpbGQobWF0Y2hpbmdGcm9tRWwpO1xuICAgICAgICAgICAgICAgICAgICBtb3JwaEVsKG1hdGNoaW5nRnJvbUVsLCBjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9uQmVmb3JlTm9kZUFkZGVkUmVzdWx0ID0gb25CZWZvcmVOb2RlQWRkZWQoY3VyVG9Ob2RlQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAob25CZWZvcmVOb2RlQWRkZWRSZXN1bHQgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob25CZWZvcmVOb2RlQWRkZWRSZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJUb05vZGVDaGlsZCA9IG9uQmVmb3JlTm9kZUFkZGVkUmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VyVG9Ob2RlQ2hpbGQuYWN0dWFsaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VyVG9Ob2RlQ2hpbGQgPSBjdXJUb05vZGVDaGlsZC5hY3R1YWxpemUoZnJvbUVsLm93bmVyRG9jdW1lbnQgfHwgZG9jKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZyb21FbC5hcHBlbmRDaGlsZChjdXJUb05vZGVDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVOb2RlQWRkZWQoY3VyVG9Ob2RlQ2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY3VyVG9Ob2RlQ2hpbGQgPSB0b05leHRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFdlIGhhdmUgcHJvY2Vzc2VkIGFsbCBvZiB0aGUgXCJ0byBub2Rlc1wiLiBJZiBjdXJGcm9tTm9kZUNoaWxkIGlzXG4gICAgICAgICAgICAvLyBub24tbnVsbCB0aGVuIHdlIHN0aWxsIGhhdmUgc29tZSBmcm9tIG5vZGVzIGxlZnQgb3ZlciB0aGF0IG5lZWRcbiAgICAgICAgICAgIC8vIHRvIGJlIHJlbW92ZWRcbiAgICAgICAgICAgIHdoaWxlIChjdXJGcm9tTm9kZUNoaWxkKSB7XG4gICAgICAgICAgICAgICAgZnJvbU5leHRTaWJsaW5nID0gY3VyRnJvbU5vZGVDaGlsZC5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgICBpZiAoKGN1ckZyb21Ob2RlS2V5ID0gZ2V0Tm9kZUtleShjdXJGcm9tTm9kZUNoaWxkKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2luY2UgdGhlIG5vZGUgaXMga2V5ZWQgaXQgbWlnaHQgYmUgbWF0Y2hlZCB1cCBsYXRlciBzbyB3ZSBkZWZlclxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgYWN0dWFsIHJlbW92YWwgdG8gbGF0ZXJcbiAgICAgICAgICAgICAgICAgICAgYWRkS2V5ZWRSZW1vdmFsKGN1ckZyb21Ob2RlS2V5KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBOT1RFOiB3ZSBza2lwIG5lc3RlZCBrZXllZCBub2RlcyBmcm9tIGJlaW5nIHJlbW92ZWQgc2luY2UgdGhlcmUgaXNcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgc3RpbGwgYSBjaGFuY2UgdGhleSB3aWxsIGJlIG1hdGNoZWQgdXAgbGF0ZXJcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTm9kZShjdXJGcm9tTm9kZUNoaWxkLCBmcm9tRWwsIHRydWUgLyogc2tpcCBrZXllZCBub2RlcyAqLyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGN1ckZyb21Ob2RlQ2hpbGQgPSBmcm9tTmV4dFNpYmxpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3BlY2lhbEVsSGFuZGxlciA9IHNwZWNpYWxFbEhhbmRsZXJzW2Zyb21FbC5ub2RlTmFtZV07XG4gICAgICAgIGlmIChzcGVjaWFsRWxIYW5kbGVyKSB7XG4gICAgICAgICAgICBzcGVjaWFsRWxIYW5kbGVyKGZyb21FbCwgdG9FbCk7XG4gICAgICAgIH1cbiAgICB9IC8vIEVORDogbW9ycGhFbCguLi4pXG5cbiAgICB2YXIgbW9ycGhlZE5vZGUgPSBmcm9tTm9kZTtcbiAgICB2YXIgbW9ycGhlZE5vZGVUeXBlID0gbW9ycGhlZE5vZGUubm9kZVR5cGU7XG4gICAgdmFyIHRvTm9kZVR5cGUgPSB0b05vZGUubm9kZVR5cGU7XG5cbiAgICBpZiAoIWNoaWxkcmVuT25seSkge1xuICAgICAgICAvLyBIYW5kbGUgdGhlIGNhc2Ugd2hlcmUgd2UgYXJlIGdpdmVuIHR3byBET00gbm9kZXMgdGhhdCBhcmUgbm90XG4gICAgICAgIC8vIGNvbXBhdGlibGUgKGUuZy4gPGRpdj4gLS0+IDxzcGFuPiBvciA8ZGl2PiAtLT4gVEVYVClcbiAgICAgICAgaWYgKG1vcnBoZWROb2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICBpZiAodG9Ob2RlVHlwZSA9PT0gRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjb21wYXJlTm9kZU5hbWVzKGZyb21Ob2RlLCB0b05vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uTm9kZURpc2NhcmRlZChmcm9tTm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIG1vcnBoZWROb2RlID0gbW92ZUNoaWxkcmVuKGZyb21Ob2RlLCBjcmVhdGVFbGVtZW50TlModG9Ob2RlLm5vZGVOYW1lLCB0b05vZGUubmFtZXNwYWNlVVJJKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBHb2luZyBmcm9tIGFuIGVsZW1lbnQgbm9kZSB0byBhIHRleHQgbm9kZVxuICAgICAgICAgICAgICAgIG1vcnBoZWROb2RlID0gdG9Ob2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG1vcnBoZWROb2RlVHlwZSA9PT0gVEVYVF9OT0RFIHx8IG1vcnBoZWROb2RlVHlwZSA9PT0gQ09NTUVOVF9OT0RFKSB7IC8vIFRleHQgb3IgY29tbWVudCBub2RlXG4gICAgICAgICAgICBpZiAodG9Ob2RlVHlwZSA9PT0gbW9ycGhlZE5vZGVUeXBlKSB7XG4gICAgICAgICAgICAgICAgbW9ycGhlZE5vZGUubm9kZVZhbHVlID0gdG9Ob2RlLm5vZGVWYWx1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9ycGhlZE5vZGU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFRleHQgbm9kZSB0byBzb21ldGhpbmcgZWxzZVxuICAgICAgICAgICAgICAgIG1vcnBoZWROb2RlID0gdG9Ob2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG1vcnBoZWROb2RlID09PSB0b05vZGUpIHtcbiAgICAgICAgLy8gVGhlIFwidG8gbm9kZVwiIHdhcyBub3QgY29tcGF0aWJsZSB3aXRoIHRoZSBcImZyb20gbm9kZVwiIHNvIHdlIGhhZCB0b1xuICAgICAgICAvLyB0b3NzIG91dCB0aGUgXCJmcm9tIG5vZGVcIiBhbmQgdXNlIHRoZSBcInRvIG5vZGVcIlxuICAgICAgICBvbk5vZGVEaXNjYXJkZWQoZnJvbU5vZGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG1vcnBoRWwobW9ycGhlZE5vZGUsIHRvTm9kZSwgY2hpbGRyZW5Pbmx5KTtcblxuICAgICAgICAvLyBXZSBub3cgbmVlZCB0byBsb29wIG92ZXIgYW55IGtleWVkIG5vZGVzIHRoYXQgbWlnaHQgbmVlZCB0byBiZVxuICAgICAgICAvLyByZW1vdmVkLiBXZSBvbmx5IGRvIHRoZSByZW1vdmFsIGlmIHdlIGtub3cgdGhhdCB0aGUga2V5ZWQgbm9kZVxuICAgICAgICAvLyBuZXZlciBmb3VuZCBhIG1hdGNoLiBXaGVuIGEga2V5ZWQgbm9kZSBpcyBtYXRjaGVkIHVwIHdlIHJlbW92ZVxuICAgICAgICAvLyBpdCBvdXQgb2YgZnJvbU5vZGVzTG9va3VwIGFuZCB3ZSB1c2UgZnJvbU5vZGVzTG9va3VwIHRvIGRldGVybWluZVxuICAgICAgICAvLyBpZiBhIGtleWVkIG5vZGUgaGFzIGJlZW4gbWF0Y2hlZCB1cCBvciBub3RcbiAgICAgICAgaWYgKGtleWVkUmVtb3ZhbExpc3QpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGk9MCwgbGVuPWtleWVkUmVtb3ZhbExpc3QubGVuZ3RoOyBpPGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsVG9SZW1vdmUgPSBmcm9tTm9kZXNMb29rdXBba2V5ZWRSZW1vdmFsTGlzdFtpXV07XG4gICAgICAgICAgICAgICAgaWYgKGVsVG9SZW1vdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlTm9kZShlbFRvUmVtb3ZlLCBlbFRvUmVtb3ZlLnBhcmVudE5vZGUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWNoaWxkcmVuT25seSAmJiBtb3JwaGVkTm9kZSAhPT0gZnJvbU5vZGUgJiYgZnJvbU5vZGUucGFyZW50Tm9kZSkge1xuICAgICAgICBpZiAobW9ycGhlZE5vZGUuYWN0dWFsaXplKSB7XG4gICAgICAgICAgICBtb3JwaGVkTm9kZSA9IG1vcnBoZWROb2RlLmFjdHVhbGl6ZShmcm9tTm9kZS5vd25lckRvY3VtZW50IHx8IGRvYyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgd2UgaGFkIHRvIHN3YXAgb3V0IHRoZSBmcm9tIG5vZGUgd2l0aCBhIG5ldyBub2RlIGJlY2F1c2UgdGhlIG9sZFxuICAgICAgICAvLyBub2RlIHdhcyBub3QgY29tcGF0aWJsZSB3aXRoIHRoZSB0YXJnZXQgbm9kZSB0aGVuIHdlIG5lZWQgdG9cbiAgICAgICAgLy8gcmVwbGFjZSB0aGUgb2xkIERPTSBub2RlIGluIHRoZSBvcmlnaW5hbCBET00gdHJlZS4gVGhpcyBpcyBvbmx5XG4gICAgICAgIC8vIHBvc3NpYmxlIGlmIHRoZSBvcmlnaW5hbCBET00gbm9kZSB3YXMgcGFydCBvZiBhIERPTSB0cmVlIHdoaWNoXG4gICAgICAgIC8vIHdlIGtub3cgaXMgdGhlIGNhc2UgaWYgaXQgaGFzIGEgcGFyZW50IG5vZGUuXG4gICAgICAgIGZyb21Ob2RlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG1vcnBoZWROb2RlLCBmcm9tTm9kZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vcnBoZWROb2RlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1vcnBoZG9tO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gIC8vIGF0dHJpYnV0ZSBldmVudHMgKGNhbiBiZSBzZXQgd2l0aCBhdHRyaWJ1dGVzKVxuICAnb25jbGljaycsXG4gICdvbmRibGNsaWNrJyxcbiAgJ29ubW91c2Vkb3duJyxcbiAgJ29ubW91c2V1cCcsXG4gICdvbm1vdXNlb3ZlcicsXG4gICdvbm1vdXNlbW92ZScsXG4gICdvbm1vdXNlb3V0JyxcbiAgJ29uZHJhZ3N0YXJ0JyxcbiAgJ29uZHJhZycsXG4gICdvbmRyYWdlbnRlcicsXG4gICdvbmRyYWdsZWF2ZScsXG4gICdvbmRyYWdvdmVyJyxcbiAgJ29uZHJvcCcsXG4gICdvbmRyYWdlbmQnLFxuICAnb25rZXlkb3duJyxcbiAgJ29ua2V5cHJlc3MnLFxuICAnb25rZXl1cCcsXG4gICdvbnVubG9hZCcsXG4gICdvbmFib3J0JyxcbiAgJ29uZXJyb3InLFxuICAnb25yZXNpemUnLFxuICAnb25zY3JvbGwnLFxuICAnb25zZWxlY3QnLFxuICAnb25jaGFuZ2UnLFxuICAnb25zdWJtaXQnLFxuICAnb25yZXNldCcsXG4gICdvbmZvY3VzJyxcbiAgJ29uYmx1cicsXG4gICdvbmlucHV0JyxcbiAgLy8gb3RoZXIgY29tbW9uIGV2ZW50c1xuICAnb25jb250ZXh0bWVudScsXG4gICdvbmZvY3VzaW4nLFxuICAnb25mb2N1c291dCdcbl1cbiIsInZhciBiZWwgPSByZXF1aXJlKCdiZWwnKSAvLyB0dXJucyB0ZW1wbGF0ZSB0YWcgaW50byBET00gZWxlbWVudHNcbnZhciBtb3JwaGRvbSA9IHJlcXVpcmUoJ21vcnBoZG9tJykgLy8gZWZmaWNpZW50bHkgZGlmZnMgKyBtb3JwaHMgdHdvIERPTSBlbGVtZW50c1xudmFyIGRlZmF1bHRFdmVudHMgPSByZXF1aXJlKCcuL3VwZGF0ZS1ldmVudHMuanMnKSAvLyBkZWZhdWx0IGV2ZW50cyB0byBiZSBjb3BpZWQgd2hlbiBkb20gZWxlbWVudHMgdXBkYXRlXG5cbm1vZHVsZS5leHBvcnRzID0gYmVsXG5cbi8vIFRPRE8gbW92ZSB0aGlzICsgZGVmYXVsdEV2ZW50cyB0byBhIG5ldyBtb2R1bGUgb25jZSB3ZSByZWNlaXZlIG1vcmUgZmVlZGJhY2tcbm1vZHVsZS5leHBvcnRzLnVwZGF0ZSA9IGZ1bmN0aW9uIChmcm9tTm9kZSwgdG9Ob2RlLCBvcHRzKSB7XG4gIGlmICghb3B0cykgb3B0cyA9IHt9XG4gIGlmIChvcHRzLmV2ZW50cyAhPT0gZmFsc2UpIHtcbiAgICBpZiAoIW9wdHMub25CZWZvcmVFbFVwZGF0ZWQpIG9wdHMub25CZWZvcmVFbFVwZGF0ZWQgPSBjb3BpZXJcbiAgfVxuXG4gIHJldHVybiBtb3JwaGRvbShmcm9tTm9kZSwgdG9Ob2RlLCBvcHRzKVxuXG4gIC8vIG1vcnBoZG9tIG9ubHkgY29waWVzIGF0dHJpYnV0ZXMuIHdlIGRlY2lkZWQgd2UgYWxzbyB3YW50ZWQgdG8gY29weSBldmVudHNcbiAgLy8gdGhhdCBjYW4gYmUgc2V0IHZpYSBhdHRyaWJ1dGVzXG4gIGZ1bmN0aW9uIGNvcGllciAoZiwgdCkge1xuICAgIC8vIGNvcHkgZXZlbnRzOlxuICAgIHZhciBldmVudHMgPSBvcHRzLmV2ZW50cyB8fCBkZWZhdWx0RXZlbnRzXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBldiA9IGV2ZW50c1tpXVxuICAgICAgaWYgKHRbZXZdKSB7IC8vIGlmIG5ldyBlbGVtZW50IGhhcyBhIHdoaXRlbGlzdGVkIGF0dHJpYnV0ZVxuICAgICAgICBmW2V2XSA9IHRbZXZdIC8vIHVwZGF0ZSBleGlzdGluZyBlbGVtZW50XG4gICAgICB9IGVsc2UgaWYgKGZbZXZdKSB7IC8vIGlmIGV4aXN0aW5nIGVsZW1lbnQgaGFzIGl0IGFuZCBuZXcgb25lIGRvZXNudFxuICAgICAgICBmW2V2XSA9IHVuZGVmaW5lZCAvLyByZW1vdmUgaXQgZnJvbSBleGlzdGluZyBlbGVtZW50XG4gICAgICB9XG4gICAgfVxuICAgIC8vIGNvcHkgdmFsdWVzIGZvciBmb3JtIGVsZW1lbnRzXG4gICAgaWYgKChmLm5vZGVOYW1lID09PSAnSU5QVVQnICYmIGYudHlwZSAhPT0gJ2ZpbGUnKSB8fCBmLm5vZGVOYW1lID09PSAnU0VMRUNUJykge1xuICAgICAgaWYgKHQuZ2V0QXR0cmlidXRlKCd2YWx1ZScpID09PSBudWxsKSB0LnZhbHVlID0gZi52YWx1ZVxuICAgIH0gZWxzZSBpZiAoZi5ub2RlTmFtZSA9PT0gJ1RFWFRBUkVBJykge1xuICAgICAgaWYgKHQuZ2V0QXR0cmlidXRlKCd2YWx1ZScpID09PSBudWxsKSBmLnZhbHVlID0gdC52YWx1ZVxuICAgIH1cbiAgfVxufVxuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCd5by15bycpXG4iLCJpbXBvcnQgaHRtbCBmcm9tICdjaG9vL2h0bWwnXG5cbmNvbnN0IGhhbmRsZUlucHV0ID0gKGUsIHN0YXRlLCBzZW5kKSA9PiB7XG4gIHNlbmQoJ2dhbWU6c3VtbW9uZXInLCBlLnRhcmdldC52YWx1ZSlcbn1cblxuY29uc3QgaGFuZGxlQ2xpY2sgPSAoZSwgc3RhdGUsIHNlbmQpID0+IHtcbiAgc2VuZCgnZ2FtZTpmZXRjaCcpXG59XG5cbmV4cG9ydCBkZWZhdWx0IChzdGF0ZSwgcHJldiwgc2VuZCkgPT4gaHRtbGBcbiAgPG1haW4gY2xhc3M9XCJ3ZWxjb21lLXBhZ2VcIj5cbiAgICA8ZGl2IGNsYXNzPVwid2VsY29tZS1oZWFkZXJcIj5cbiAgICAgIDxoMSBjbGFzcz1cInRpdGxlXCI+JHtzdGF0ZS5hcHAudGl0bGV9PC9oMT5cbiAgICAgIDxibG9ja3F1b3RlIGNsYXNzPVwidGFnbGluZVwiPiR7c3RhdGUuYXBwLnRhZ2xpbmV9PC9ibG9ja3F1b3RlPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJ3ZWxjb21lLWZvcm1cIj5cbiAgICAgIDxsYWJlbCBjbGFzcz1cImxhYmVsXCI+XG4gICAgICAgIFN1bW1vbmVyIG5hbWVcbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgY2xhc3M9XCJpbnB1dFwiXG4gICAgICAgICAgdmFsdWU9XCJuZ3J5Z29kXCJcbiAgICAgICAgICBvbmlucHV0PSR7ZSA9PiBoYW5kbGVJbnB1dChlLCBzdGF0ZSwgc2VuZCl9IC8+XG4gICAgICA8L2xhYmVsPlxuICAgICAgPGJ1dHRvblxuICAgICAgICBjbGFzcz1cInN1Ym1pdFwiXG4gICAgICAgIG9uY2xpY2s9JHtlID0+IGhhbmRsZUNsaWNrKGUsIHN0YXRlLCBzZW5kKX0+U3RhcnQ8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiZXJyb3JcIj4ke3N0YXRlLmFwcC5lcnJvcn08L2Rpdj5cbiAgPC9tYWluPlxuYFxuIiwiLyohXG4gIENvcHlyaWdodCAoYykgMjAxNiBKZWQgV2F0c29uLlxuICBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgKE1JVCksIHNlZVxuICBodHRwOi8vamVkd2F0c29uLmdpdGh1Yi5pby9jbGFzc25hbWVzXG4qL1xuLyogZ2xvYmFsIGRlZmluZSAqL1xuXG4oZnVuY3Rpb24gKCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGhhc093biA9IHt9Lmhhc093blByb3BlcnR5O1xuXG5cdGZ1bmN0aW9uIGNsYXNzTmFtZXMgKCkge1xuXHRcdHZhciBjbGFzc2VzID0gW107XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGFyZyA9IGFyZ3VtZW50c1tpXTtcblx0XHRcdGlmICghYXJnKSBjb250aW51ZTtcblxuXHRcdFx0dmFyIGFyZ1R5cGUgPSB0eXBlb2YgYXJnO1xuXG5cdFx0XHRpZiAoYXJnVHlwZSA9PT0gJ3N0cmluZycgfHwgYXJnVHlwZSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGFyZyk7XG5cdFx0XHR9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoYXJnKSkge1xuXHRcdFx0XHRjbGFzc2VzLnB1c2goY2xhc3NOYW1lcy5hcHBseShudWxsLCBhcmcpKTtcblx0XHRcdH0gZWxzZSBpZiAoYXJnVHlwZSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0Zm9yICh2YXIga2V5IGluIGFyZykge1xuXHRcdFx0XHRcdGlmIChoYXNPd24uY2FsbChhcmcsIGtleSkgJiYgYXJnW2tleV0pIHtcblx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChrZXkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiBjbGFzc2VzLmpvaW4oJyAnKTtcblx0fVxuXG5cdGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykge1xuXHRcdG1vZHVsZS5leHBvcnRzID0gY2xhc3NOYW1lcztcblx0fSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBkZWZpbmUuYW1kID09PSAnb2JqZWN0JyAmJiBkZWZpbmUuYW1kKSB7XG5cdFx0Ly8gcmVnaXN0ZXIgYXMgJ2NsYXNzbmFtZXMnLCBjb25zaXN0ZW50IHdpdGggbnBtIHBhY2thZ2UgbmFtZVxuXHRcdGRlZmluZSgnY2xhc3NuYW1lcycsIFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gY2xhc3NOYW1lcztcblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHR3aW5kb3cuY2xhc3NOYW1lcyA9IGNsYXNzTmFtZXM7XG5cdH1cbn0oKSk7XG4iLCJpbXBvcnQgaHRtbCBmcm9tICdjaG9vL2h0bWwnXG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJ1xuXG5jb25zdCBoYW5kbGVDbGljayA9IChlLCBzcGVsbCwgc2VuZCkgPT4ge1xuICBpZiAoJ2Nvb2xkb3duJyA9PT0gc3BlbGwuc3RhdGUpIHtcbiAgICBzZW5kKCdnYW1lOmRlY3JlbWVudFNwZWxsQ29vbGRvd24nLCB7XG4gICAgICB1aWQ6IHNwZWxsLnVpZCxcbiAgICAgIGFtb3VudDogMTBcbiAgICB9KVxuICB9XG4gIGVsc2Uge1xuICAgIHNlbmQoJ2dhbWU6dXBkYXRlU3BlbGwnLCB7XG4gICAgICB1aWQ6IHNwZWxsLnVpZCxcbiAgICAgIHN0YXRlOiAnY29vbGRvd24nLFxuICAgICAgY29vbGRvd246IHNwZWxsLnJlZkNvb2xkb3duIC0gMTAwXG4gICAgfSlcbiAgfVxufVxuXG5jb25zdCBjbGFzc1ZhcmlhbnRzID0gKHNwZWxsKSA9PiBjbGFzc25hbWVzKHtcbiAgW2AtJHtzcGVsbC5pZH1gXTogdHJ1ZSxcbiAgW2AtJHtzcGVsbC5zdGF0ZX1gXTogdHJ1ZSxcbiAgW2AtdGltZTYwYF06IHNwZWxsLmNvb2xkb3duIDw9IDYwICYmIHNwZWxsLmNvb2xkb3duID4gMzAsXG4gIFtgLXRpbWUzMGBdOiBzcGVsbC5jb29sZG93biA8PSAzMCAmJiBzcGVsbC5jb29sZG93biA+IDAsXG59KVxuXG5jb25zdCByZW5kZXJJZiA9IChjb25kaXRpb24sIHN0YXRlLCByZW5kZXJlcikgPT4gY29uZGl0aW9uXG4gID8gcmVuZGVyZXIoc3RhdGUpXG4gIDogJydcblxuY29uc3QgZHJhd0Nvb2xkb3duUGllID0gKHNwZWxsKSA9PiB7XG4gIGNvbnN0IHIgPSA1MFxuICBjb25zdCB0ID0gMSAtIHNwZWxsLmNvb2xkb3duIC8gc3BlbGwucmVmQ29vbGRvd25cbiAgY29uc3QgYSA9IHQgKiBNYXRoLlBJICogMlxuICBjb25zdCBtID0gYSA+IE1hdGguUEkgPyAxIDogMFxuICBjb25zdCB4ID0gTWF0aC5zaW4oYSkgKiByXG4gIGNvbnN0IHkgPSBNYXRoLmNvcyhhKSAqIC1yXG5cbiAgcmV0dXJuIGh0bWxgXG4gICAgPGcgdHJhbnNmb3JtPSR7YHRyYW5zbGF0ZSgke3J9LCAke3J9KWB9PlxuICAgICAgPHBhdGggY2xhc3NOYW1lPVwidGltZXJcIiBkPSR7YE0gMCAkey1yfSBBICR7cn0gJHtyfSAxICR7bX0gMSAke3h9ICR7eX1gfT48L3BhdGg+XG4gICAgPC9nPlxuICBgXG59XG5cbmNvbnN0IHJlbmRlckNvb2xkb3duID0gKHNwZWxsKSA9PiBodG1sYFxuICA8c3ZnIGNsYXNzPVwiY29vbGRvd25cIlxuICAgIHZpZXdCb3g9XCItNSAtNSAxMTAgMTEwXCJcbiAgICB2ZWN0b3JFZmZlY3Q9XCJub24tc2NhbGluZy1zdHJva2VcIlxuICAgIHN0cm9rZUxpbmVjYXA9XCJyb3VuZFwiPlxuICAgICR7ZHJhd0Nvb2xkb3duUGllKHNwZWxsKX1cbiAgPC9zdmc+XG5gXG5cbmV4cG9ydCBkZWZhdWx0IChzcGVsbCwgcHJldiwgc2VuZCkgPT4gaHRtbGBcbiAgPGxpXG4gICAgY2xhc3M9XCJzcGVsbC1pdGVtICR7Y2xhc3NWYXJpYW50cyhzcGVsbCl9XCJcbiAgICBvbmNsaWNrPSR7ZSA9PiBoYW5kbGVDbGljayhlLCBzcGVsbCwgc2VuZCl9PlxuICAgICR7cmVuZGVySWYoJ2Nvb2xkb3duJyA9PT0gc3BlbGwuc3RhdGUsIHNwZWxsLCByZW5kZXJDb29sZG93bil9XG4gICAgPHN2ZyBjbGFzcz1cImljb25cIj5cbiAgICAgIDx1c2UgeGxpbms6aHJlZj1cIiNzdmctJHtzcGVsbC5pZH1cIj5cbiAgICA8L3N2Zz5cbiAgPC9saT5cbmBcbiIsImltcG9ydCBodG1sIGZyb20gJ2Nob28vaHRtbCdcbmltcG9ydCBzcGVsbEl0ZW0gZnJvbSAnLi4vdmlld3Mvc3BlbGwtaXRlbSdcblxuZXhwb3J0IGRlZmF1bHQgKGVubmVteSwgcHJldiwgc2VuZCkgPT4gaHRtbGBcbiAgPHVsIGNsYXNzPVwic3BlbGwtbGlzdFwiPlxuICAgICR7ZW5uZW15LnNwZWxscy5tYXAoc3BlbGwgPT4gc3BlbGxJdGVtKHNwZWxsLCBwcmV2LCBzZW5kKSl9XG4gIDwvdWw+XG5gXG4iLCJpbXBvcnQgaHRtbCBmcm9tICdjaG9vL2h0bWwnXG5pbXBvcnQgc3BlbGxMaXN0IGZyb20gJy4uL3ZpZXdzL3NwZWxsLWxpc3QnXG5cbmV4cG9ydCBkZWZhdWx0IChlbm5lbXksIHByZXYsIHNlbmQpID0+IGh0bWxgXG4gIDxsaSBjbGFzcz1cImVubmVteS1pdGVtXCI+XG4gICAgPGRpdiBjbGFzcz1cImVubmVteS1tZXRhXCI+XG4gICAgICA8aDIgY2xhc3M9XCJyb2xlXCI+JHtlbm5lbXkucm9sZX08L2gyPlxuICAgICAgPHN0cm9uZyBjbGFzcz1cImNoYW1waW9uXCI+JHtlbm5lbXkuY2hhbXBpb24ubmFtZX08L3N0cm9uZz5cbiAgICA8L2Rpdj5cbiAgICAke3NwZWxsTGlzdChlbm5lbXksIHByZXYsIHNlbmQpfVxuICA8L2xpPlxuYFxuIiwiaW1wb3J0IGh0bWwgZnJvbSAnY2hvby9odG1sJ1xuaW1wb3J0IGVubmVteUl0ZW0gZnJvbSAnLi4vdmlld3MvZW5uZW15LWl0ZW0nXG5cbmV4cG9ydCBkZWZhdWx0IChnYW1lLCBwcmV2LCBzZW5kKSA9PiBodG1sYFxuICA8dWwgY2xhc3M9XCJlbm5lbXktbGlzdFwiPlxuICAgICR7Z2FtZS5lbm5lbWllcy5tYXAoZW5uZW15ID0+IGVubmVteUl0ZW0oZW5uZW15LCBwcmV2LCBzZW5kKSl9XG4gIDwvdWw+XG5gXG4iLCJpbXBvcnQgaHRtbCBmcm9tICdjaG9vL2h0bWwnXG5pbXBvcnQgZW5uZW15TGlzdCBmcm9tICcuLi92aWV3cy9lbm5lbXktbGlzdCdcblxuZXhwb3J0IGRlZmF1bHQgKHN0YXRlLCBwcmV2LCBzZW5kKSA9PiBodG1sYFxuICA8bWFpbiBjbGFzcz1cImluZ2FtZS1wYWdlXCI+XG4gICAgJHtlbm5lbXlMaXN0KHN0YXRlLmdhbWUsIHByZXYsIHNlbmQpfVxuICA8L21haW4+XG5gXG4iLCJpbXBvcnQgY2hvbyBmcm9tICdjaG9vL2Rpc3QvY2hvbydcblxuaW1wb3J0IGFwcE1vZGVsIGZyb20gJy4vbW9kZWxzL2FwcCdcbmltcG9ydCBnYW1lTW9kZWwgZnJvbSAnLi9tb2RlbHMvZ2FtZSdcblxuaW1wb3J0IHdlbGNvbWVQYWdlIGZyb20gJy4vcGFnZXMvd2VsY29tZSdcbmltcG9ydCBpbmdhbWVQYWdlIGZyb20gJy4vcGFnZXMvaW5nYW1lJ1xuXG5jb25zdCBhcHAgPSBjaG9vKClcblxuYXBwLm1vZGVsKGFwcE1vZGVsKVxuYXBwLm1vZGVsKGdhbWVNb2RlbClcblxuLy8gVE9ETzogd2FpdCBmb3IgY2hvbyB0byBtYWtlIGhhc2ggcm91dGluZyByZWFsbHkgd29ya1xuYXBwLnJvdXRlcihyb3V0ZSA9PiBbXG4gIHJvdXRlKCcvJywgd2VsY29tZVBhZ2UpLFxuICByb3V0ZSgnL2luZ2FtZScsIGluZ2FtZVBhZ2UpXG5dKVxuXG5jb25zdCB0cmVlID0gYXBwLnN0YXJ0KClcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodHJlZSlcbiJdLCJuYW1lcyI6WyJnbG9iYWwiLCJyZXF1aXJlIiwiZXJyb3IiLCJkYXRhIiwic3RhdGUiLCJkZWNyZW1lbnRDb29sZG93biIsInNwZWxsIiwiYW1vdW50IiwibmV3U3BlbGwiLCJ4dGVuZCIsImNvb2xkb3duIiwic3VtbW9uZXIiLCJlbm5lbWllcyIsInVwZGF0ZVNwZWxsIiwibWFwIiwiZW5uZW15Iiwic3BlbGxzIiwidWlkIiwiZGVjcmVtZW50U3BlbGxDb29sZG93biIsImRlY3JlbWVudEFsbFNwZWxsc0Nvb2xkb3duIiwidW5pcXVlaWQiLCJhcGlLZXkiLCJiYXNlVXJsIiwiYXBpVXJsIiwiZmV0Y2hTdW1tb25lciIsIm5hbWUiLCJ1cmwiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNyZWF0ZVNwZWxsIiwiaWQiLCJmaW5kIiwicyIsImZldGNoRW5uZW1pZXMiLCJjaGFtcGlvbnMiLCJjIiwiZmV0Y2giLCJzZW5kIiwiZG9uZSIsImxvY2F0aW9uIiwiZXJyIiwidGljayIsIkNvbW1lbnQiLCJET01UZXh0IiwiZGlzcGF0Y2hFdmVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwic2VyaWFsaXplTm9kZSIsImRvbVdhbGsiLCJyZXF1aXJlJCQ0IiwicmVxdWlyZSQkMyIsInJlcXVpcmUkJDIiLCJyZXF1aXJlJCQxIiwicmVxdWlyZSQkMCIsIkRPTUVsZW1lbnQiLCJEb2N1bWVudEZyYWdtZW50IiwiRXZlbnQiLCJyZXF1aXJlJCQ4IiwicmVxdWlyZSQkNyIsInJlcXVpcmUkJDYiLCJyZXF1aXJlJCQ1IiwiRG9jdW1lbnQiLCJkb2N1bWVudCIsIndpbmRvdyIsIm1vcnBoZG9tIiwiaGFuZGxlSW5wdXQiLCJlIiwidGFyZ2V0IiwidmFsdWUiLCJoYW5kbGVDbGljayIsInByZXYiLCJodG1sIiwiYXBwIiwidGl0bGUiLCJ0YWdsaW5lIiwicmVmQ29vbGRvd24iLCJjbGFzc1ZhcmlhbnRzIiwiY2xhc3NuYW1lcyIsInJlbmRlcklmIiwiY29uZGl0aW9uIiwicmVuZGVyZXIiLCJkcmF3Q29vbGRvd25QaWUiLCJyIiwidCIsImEiLCJNYXRoIiwiUEkiLCJtIiwieCIsInNpbiIsInkiLCJjb3MiLCJyZW5kZXJDb29sZG93biIsInNwZWxsSXRlbSIsInJvbGUiLCJjaGFtcGlvbiIsInNwZWxsTGlzdCIsImdhbWUiLCJlbm5lbXlJdGVtIiwiZW5uZW15TGlzdCIsImNob28iLCJtb2RlbCIsImFwcE1vZGVsIiwiZ2FtZU1vZGVsIiwicm91dGVyIiwicm91dGUiLCJ3ZWxjb21lUGFnZSIsImluZ2FtZVBhZ2UiLCJ0cmVlIiwic3RhcnQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxPQUFPLEdBQUcsUUFBUSxFQUFFLE9BQU8sTUFBTSxHQUFHLFdBQVcsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEdBQUcsT0FBTyxNQUFNLEdBQUcsVUFBVSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLE9BQU8sTUFBTSxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLE9BQU9BLGNBQU0sR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUNBLGNBQU0sQ0FBQyxLQUFLLEdBQUcsT0FBTyxJQUFJLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPQyxlQUFPLEVBQUUsVUFBVSxFQUFFQSxlQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENB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Q0FBQyxDQUFDLENBQUMsRUFBRTs7TUFFMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLElBQUksRUFBRTtRQUMzQixJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO09BQ25CLENBQUMsQ0FBQztLQUNKLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7O01BRWxCLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQ3RHLE1BQU0sQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3RDLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFOztNQUVqQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUN0QyxNQUFNOztNQUVMLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQ25HLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzdCO0dBQ0YsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7OztFQUdiLE9BQU8sU0FBUyxLQUFLLENBQUMsS0FBSyxFQUFFO0lBQzNCLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsUUFBUSxFQUFFLHdCQUF3QixDQUFDLENBQUM7SUFDL0QsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDcEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1QixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0dBQ2pDLENBQUM7Q0FDSDs7O0FBR0QsU0FBUyxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7RUFDMUMsSUFBSSxDQUFDLEtBQUssRUFBRTtJQUNWLEtBQUssR0FBRyxNQUFNLENBQUM7SUFDZixNQUFNLEdBQUcsSUFBSSxDQUFDO0dBQ2Y7RUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxFQUFFLFFBQVEsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO0VBQy9ELE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0VBQ2pDLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztFQUNqQyxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztDQUMvQjtDQUNBLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO0FBQ3RGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsU0FBUyxRQUFRLENBQUMsR0FBRyxFQUFFO0VBQ3RDLE9BQU8sR0FBRyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxPQUFPLEdBQUcsQ0FBQyxJQUFJLEtBQUssVUFBVSxJQUFJLE9BQU8sR0FBRyxDQUFDLElBQUksS0FBSyxVQUFVLElBQUksT0FBTyxHQUFHLENBQUMsU0FBUyxLQUFLLFVBQVUsQ0FBQztDQUNsSixDQUFDO0NBQ0QsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO0FBQzFDLENBQUMsVUFBVSxPQUFPLENBQUMsTUFBTSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0IxQixJQUFJLFlBQVksR0FBRyxVQUFVLENBQUM7QUFDOUIsT0FBTyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsRUFBRTtFQUM1QixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBQ2hCLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNqQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtNQUN6QyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3JDO0lBQ0QsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0dBQzFCOztFQUVELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUNWLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQztFQUNyQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0VBQ3RCLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLFVBQVUsQ0FBQyxFQUFFO0lBQ3JELElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxPQUFPLEdBQUcsQ0FBQztJQUMzQixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkIsUUFBUSxDQUFDO01BQ1AsS0FBSyxJQUFJO1FBQ1AsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztNQUMzQixLQUFLLElBQUk7UUFDUCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO01BQzNCLEtBQUssSUFBSTtRQUNQLElBQUk7VUFDRixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNsQyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1VBQ1YsT0FBTyxZQUFZLENBQUM7U0FDckI7TUFDSDtRQUNFLE9BQU8sQ0FBQyxDQUFDO0tBQ1o7R0FDRixDQUFDLENBQUM7RUFDSCxLQUFLLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtJQUM1QyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtNQUM3QixHQUFHLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztLQUNoQixNQUFNO01BQ0wsR0FBRyxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDekI7R0FDRjtFQUNELE9BQU8sR0FBRyxDQUFDO0NBQ1osQ0FBQzs7Ozs7QUFLRixPQUFPLENBQUMsU0FBUyxHQUFHLFVBQVUsRUFBRSxFQUFFLEdBQUcsRUFBRTs7RUFFckMsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0lBQy9CLE9BQU8sWUFBWTtNQUNqQixPQUFPLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7S0FDMUQsQ0FBQztHQUNIOztFQUVELElBQUksT0FBTyxDQUFDLGFBQWEsS0FBSyxJQUFJLEVBQUU7SUFDbEMsT0FBTyxFQUFFLENBQUM7R0FDWDs7RUFFRCxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7RUFDbkIsU0FBUyxVQUFVLEdBQUc7SUFDcEIsSUFBSSxDQUFDLE1BQU0sRUFBRTtNQUNYLElBQUksT0FBTyxDQUFDLGdCQUFnQixFQUFFO1FBQzVCLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7T0FDdEIsTUFBTSxJQUFJLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRTtRQUNuQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO09BQ3BCLE1BQU07UUFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO09BQ3BCO01BQ0QsTUFBTSxHQUFHLElBQUksQ0FBQztLQUNmO0lBQ0QsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztHQUNsQzs7RUFFRCxPQUFPLFVBQVUsQ0FBQztDQUNuQixDQUFDOztBQUVGLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNoQixJQUFJLFlBQVksQ0FBQztBQUNqQixPQUFPLENBQUMsUUFBUSxHQUFHLFVBQVUsR0FBRyxFQUFFO0VBQ2hDLElBQUksV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFLFlBQVksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUM7RUFDM0UsR0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztFQUN4QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO0lBQ2hCLElBQUksSUFBSSxNQUFNLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFO01BQzNELElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7TUFDdEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFlBQVk7UUFDeEIsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ25ELE9BQU8sQ0FBQyxLQUFLLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7T0FDM0MsQ0FBQztLQUNILE1BQU07TUFDTCxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsWUFBWSxFQUFFLENBQUM7S0FDOUI7R0FDRjtFQUNELE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ3BCLENBQUM7Ozs7Ozs7Ozs7QUFVRixTQUFTLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFOztFQUUxQixJQUFJLEdBQUcsR0FBRztJQUNSLElBQUksRUFBRSxFQUFFO0lBQ1IsT0FBTyxFQUFFLGNBQWM7R0FDeEIsQ0FBQzs7RUFFRixJQUFJLFNBQVMsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3BELElBQUksU0FBUyxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDckQsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUU7O0lBRW5CLEdBQUcsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0dBQ3ZCLE1BQU0sSUFBSSxJQUFJLEVBQUU7O0lBRWYsT0FBTyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7R0FDNUI7O0VBRUQsSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0VBQ3hELElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztFQUMxQyxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7RUFDaEQsSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO0VBQzdELElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDO0VBQy9DLE9BQU8sV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQ3pDO0FBQ0QsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7OztBQUcxQixPQUFPLENBQUMsTUFBTSxHQUFHO0VBQ2YsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztFQUNmLFFBQVEsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7RUFDakIsV0FBVyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztFQUNwQixTQUFTLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO0VBQ2xCLE9BQU8sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFDakIsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUNoQixPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0VBQ2pCLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFDaEIsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUNoQixPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0VBQ2pCLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7RUFDbkIsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztFQUNmLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7Q0FDbkIsQ0FBQzs7O0FBR0YsT0FBTyxDQUFDLE1BQU0sR0FBRztFQUNmLFNBQVMsRUFBRSxNQUFNO0VBQ2pCLFFBQVEsRUFBRSxRQUFRO0VBQ2xCLFNBQVMsRUFBRSxRQUFRO0VBQ25CLFdBQVcsRUFBRSxNQUFNO0VBQ25CLE1BQU0sRUFBRSxNQUFNO0VBQ2QsUUFBUSxFQUFFLE9BQU87RUFDakIsTUFBTSxFQUFFLFNBQVM7O0VBRWpCLFFBQVEsRUFBRSxLQUFLO0NBQ2hCLENBQUM7O0FBRUYsU0FBUyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFO0VBQ3hDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7O0VBRXRDLElBQUksS0FBSyxFQUFFO0lBQ1QsT0FBTyxTQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLFNBQVMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztHQUN0RyxNQUFNO0lBQ0wsT0FBTyxHQUFHLENBQUM7R0FDWjtDQUNGOztBQUVELFNBQVMsY0FBYyxDQUFDLEdBQUcsRUFBRSxTQUFTLEVBQUU7RUFDdEMsT0FBTyxHQUFHLENBQUM7Q0FDWjs7QUFFRCxTQUFTLFdBQVcsQ0FBQyxLQUFLLEVBQUU7RUFDMUIsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDOztFQUVkLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFO0lBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUM7R0FDbEIsQ0FBQyxDQUFDOztFQUVILE9BQU8sSUFBSSxDQUFDO0NBQ2I7O0FBRUQsU0FBUyxXQUFXLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUU7OztFQUc3QyxJQUFJLEdBQUcsQ0FBQyxhQUFhLElBQUksS0FBSyxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDOztFQUUzRCxLQUFLLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxPQUFPOztFQUVqQyxFQUFFLEtBQUssQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEtBQUssS0FBSyxDQUFDLEVBQUU7SUFDN0QsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRTtNQUNsQixHQUFHLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7S0FDM0M7SUFDRCxPQUFPLEdBQUcsQ0FBQztHQUNaOzs7RUFHRCxJQUFJLFNBQVMsR0FBRyxlQUFlLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0VBQzVDLElBQUksU0FBUyxFQUFFO0lBQ2IsT0FBTyxTQUFTLENBQUM7R0FDbEI7OztFQUdELElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7RUFDOUIsSUFBSSxXQUFXLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDOztFQUVwQyxJQUFJLEdBQUcsQ0FBQyxVQUFVLEVBQUU7SUFDbEIsSUFBSSxHQUFHLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztHQUMxQzs7OztFQUlELElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7SUFDeEYsT0FBTyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7R0FDM0I7OztFQUdELElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7SUFDckIsSUFBSSxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUU7TUFDckIsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7TUFDL0MsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLFdBQVcsR0FBRyxJQUFJLEdBQUcsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0tBQ3pEO0lBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7TUFDbkIsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztLQUNyRTtJQUNELElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO01BQ2pCLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FDakU7SUFDRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtNQUNsQixPQUFPLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUMzQjtHQUNGOztFQUVELElBQUksSUFBSSxHQUFHLEVBQUU7TUFDVCxLQUFLLEdBQUcsS0FBSztNQUNiLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQzs7O0VBR3hCLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO0lBQ2xCLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDYixNQUFNLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7R0FDckI7OztFQUdELElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFFO0lBQ3JCLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQzVDLElBQUksR0FBRyxZQUFZLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQztHQUMvQjs7O0VBR0QsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7SUFDbkIsSUFBSSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7R0FDcEQ7OztFQUdELElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO0lBQ2pCLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0dBQ3JEOzs7RUFHRCxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtJQUNsQixJQUFJLEdBQUcsR0FBRyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztHQUNqQzs7RUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEVBQUU7SUFDdEQsT0FBTyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztHQUNyQzs7RUFFRCxJQUFJLFlBQVksR0FBRyxDQUFDLEVBQUU7SUFDcEIsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7TUFDbkIsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztLQUNyRSxNQUFNO01BQ0wsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztLQUMzQztHQUNGOztFQUVELEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOztFQUVyQixJQUFJLE1BQU0sQ0FBQztFQUNYLElBQUksS0FBSyxFQUFFO0lBQ1QsTUFBTSxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7R0FDbkUsTUFBTTtJQUNMLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxFQUFFO01BQy9CLE9BQU8sY0FBYyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDMUUsQ0FBQyxDQUFDO0dBQ0o7O0VBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7RUFFZixPQUFPLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7Q0FDbkQ7O0FBRUQsU0FBUyxlQUFlLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRTtFQUNuQyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0VBQ3JFLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO0lBQ25CLElBQUksTUFBTSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUNqSCxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0dBQ3RDO0VBQ0QsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7RUFDOUQsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxLQUFLLEVBQUUsU0FBUyxDQUFDLENBQUM7O0VBRWhFLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7Q0FDdkQ7O0FBRUQsU0FBUyxXQUFXLENBQUMsS0FBSyxFQUFFO0VBQzFCLE9BQU8sR0FBRyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUM7Q0FDekQ7O0FBRUQsU0FBUyxXQUFXLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLElBQUksRUFBRTtFQUNoRSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7RUFDaEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRTtJQUM1QyxJQUFJLGNBQWMsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7TUFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQ3JGLE1BQU07TUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ2pCO0dBQ0Y7RUFDRCxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxFQUFFO0lBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO01BQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUMvRTtHQUNGLENBQUMsQ0FBQztFQUNILE9BQU8sTUFBTSxDQUFDO0NBQ2Y7O0FBRUQsU0FBUyxjQUFjLENBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUU7RUFDekUsSUFBSSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQztFQUNwQixJQUFJLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztFQUM1RSxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7SUFDWixJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7TUFDWixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxTQUFTLENBQUMsQ0FBQztLQUNqRCxNQUFNO01BQ0wsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0tBQzFDO0dBQ0YsTUFBTTtJQUNMLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRTtNQUNaLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBQztLQUMxQztHQUNGO0VBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLEVBQUU7SUFDckMsSUFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0dBQ3hCO0VBQ0QsSUFBSSxDQUFDLEdBQUcsRUFBRTtJQUNSLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtNQUNwQyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUN4QixHQUFHLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO09BQzFDLE1BQU07UUFDTCxHQUFHLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLFlBQVksR0FBRyxDQUFDLENBQUMsQ0FBQztPQUN0RDtNQUNELElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtRQUMxQixJQUFJLEtBQUssRUFBRTtVQUNULEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksRUFBRTtZQUN4QyxPQUFPLElBQUksR0FBRyxJQUFJLENBQUM7V0FDcEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDekIsTUFBTTtVQUNMLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLEVBQUU7WUFDL0MsT0FBTyxLQUFLLEdBQUcsSUFBSSxDQUFDO1dBQ3JCLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDZjtPQUNGO0tBQ0YsTUFBTTtNQUNMLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxTQUFTLENBQUMsQ0FBQztLQUM1QztHQUNGO0VBQ0QsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDckIsSUFBSSxLQUFLLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTtNQUMvQixPQUFPLEdBQUcsQ0FBQztLQUNaO0lBQ0QsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxFQUFFO01BQzlDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO01BQ3ZDLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztLQUNsQyxNQUFNO01BQ0wsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztNQUMvRSxJQUFJLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDcEM7R0FDRjs7RUFFRCxPQUFPLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDO0NBQzFCOztBQUVELFNBQVMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7RUFDbEQsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0VBQ3BCLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxJQUFJLEVBQUUsR0FBRyxFQUFFO0lBQzlDLFdBQVcsRUFBRSxDQUFDO0lBQ2QsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLEVBQUUsQ0FBQztJQUMxQyxPQUFPLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7R0FDN0QsRUFBRSxDQUFDLENBQUMsQ0FBQzs7RUFFTixJQUFJLE1BQU0sR0FBRyxFQUFFLEVBQUU7SUFDZixPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztHQUNyRzs7RUFFRCxPQUFPLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNyRTs7OztBQUlELFNBQVMsT0FBTyxDQUFDLEVBQUUsRUFBRTtFQUNuQixPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDMUI7QUFDRCxPQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzs7QUFFMUIsU0FBUyxTQUFTLENBQUMsR0FBRyxFQUFFO0VBQ3RCLE9BQU8sT0FBTyxHQUFHLEtBQUssU0FBUyxDQUFDO0NBQ2pDO0FBQ0QsT0FBTyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7O0FBRTlCLFNBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRTtFQUNuQixPQUFPLEdBQUcsS0FBSyxJQUFJLENBQUM7Q0FDckI7QUFDRCxPQUFPLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7QUFFeEIsU0FBUyxpQkFBaUIsQ0FBQyxHQUFHLEVBQUU7RUFDOUIsT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDO0NBQ3BCO0FBQ0QsT0FBTyxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDOztBQUU5QyxTQUFTLFFBQVEsQ0FBQyxHQUFHLEVBQUU7RUFDckIsT0FBTyxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUM7Q0FDaEM7QUFDRCxPQUFPLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQzs7QUFFNUIsU0FBUyxRQUFRLENBQUMsR0FBRyxFQUFFO0VBQ3JCLE9BQU8sT0FBTyxHQUFHLEtBQUssUUFBUSxDQUFDO0NBQ2hDO0FBQ0QsT0FBTyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7O0FBRTVCLFNBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRTtFQUNyQixPQUFPLE9BQU8sR0FBRyxLQUFLLFFBQVEsQ0FBQztDQUNoQztBQUNELE9BQU8sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDOztBQUU1QixTQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUU7RUFDeEIsT0FBTyxHQUFHLEtBQUssS0FBSyxDQUFDLENBQUM7Q0FDdkI7QUFDRCxPQUFPLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQzs7QUFFbEMsU0FBUyxRQUFRLENBQUMsRUFBRSxFQUFFO0VBQ3BCLE9BQU8sUUFBUSxDQUFDLEVBQUUsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxFQUFFLENBQUMsS0FBSyxpQkFBaUIsQ0FBQztDQUNqRTtBQUNELE9BQU8sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDOztBQUU1QixTQUFTLFFBQVEsQ0FBQyxHQUFHLEVBQUU7RUFDckIsT0FBTyxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksR0FBRyxLQUFLLElBQUksQ0FBQztDQUNoRDtBQUNELE9BQU8sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDOztBQUU1QixTQUFTLE1BQU0sQ0FBQyxDQUFDLEVBQUU7RUFDakIsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksY0FBYyxDQUFDLENBQUMsQ0FBQyxLQUFLLGVBQWUsQ0FBQztDQUM3RDtBQUNELE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOztBQUV4QixTQUFTLE9BQU8sQ0FBQyxDQUFDLEVBQUU7RUFDbEIsT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssY0FBYyxDQUFDLENBQUMsQ0FBQyxLQUFLLGdCQUFnQixJQUFJLENBQUMsWUFBWSxLQUFLLENBQUMsQ0FBQztDQUN0RjtBQUNELE9BQU8sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOztBQUUxQixTQUFTLFVBQVUsQ0FBQyxHQUFHLEVBQUU7RUFDdkIsT0FBTyxPQUFPLEdBQUcsS0FBSyxVQUFVLENBQUM7Q0FDbEM7QUFDRCxPQUFPLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQzs7QUFFaEMsU0FBUyxXQUFXLENBQUMsR0FBRyxFQUFFO0VBQ3hCLE9BQU8sR0FBRyxLQUFLLElBQUksSUFBSSxPQUFPLEdBQUcsS0FBSyxTQUFTLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRO0VBQ2hJLE9BQU8sR0FBRyxLQUFLLFdBQVcsQ0FBQztDQUM1QjtBQUNELE9BQU8sQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDOztBQUVsQyxPQUFPLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDOztBQUVqRCxTQUFTLGNBQWMsQ0FBQyxDQUFDLEVBQUU7RUFDekIsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDMUM7O0FBRUQsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFO0VBQ2QsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7Q0FDdkQ7O0FBRUQsSUFBSSxNQUFNLEdBQUcsQ0FBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDOzs7QUFHbEcsU0FBUyxTQUFTLEdBQUc7RUFDbkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztFQUNuQixJQUFJLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ25GLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUM1RDs7O0FBR0QsT0FBTyxDQUFDLEdBQUcsR0FBRyxZQUFZO0VBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO0NBQy9FLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQWVGLE9BQU8sQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDOztBQUV2QyxPQUFPLENBQUMsT0FBTyxHQUFHLFVBQVUsTUFBTSxFQUFFLEdBQUcsRUFBRTs7RUFFdkMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBRSxPQUFPLE1BQU0sQ0FBQzs7RUFFMUMsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztFQUM1QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0VBQ3BCLE9BQU8sQ0FBQyxFQUFFLEVBQUU7SUFDVixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0dBQ2hDO0VBQ0QsT0FBTyxNQUFNLENBQUM7Q0FDZixDQUFDOztBQUVGLFNBQVMsY0FBYyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUU7RUFDakMsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQ3hEO0NBQ0EsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPQSxjQUFNLEtBQUssV0FBVyxHQUFHQSxjQUFNLEdBQUcsT0FBTyxJQUFJLEtBQUssV0FBVyxHQUFHLElBQUksR0FBRyxPQUFPLE1BQU0sS0FBSyxXQUFXLEdBQUcsTUFBTSxHQUFHLEVBQUUsQ0FBQztDQUMxSixDQUFDLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztBQUM1RixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDL0IsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUU3QixNQUFNLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQzs7OztBQUkxQixTQUFTLFFBQVEsQ0FBQyxHQUFHLEVBQUU7RUFDckIsSUFBSSxFQUFFLElBQUksWUFBWSxRQUFRLENBQUMsRUFBRSxPQUFPLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztFQUUxRCxJQUFJLFFBQVEsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztFQUM5QyxJQUFJLEtBQUssR0FBRyxJQUFJLEVBQUUsQ0FBQzs7RUFFbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7RUFDbkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7RUFDakIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7RUFDYixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzs7RUFFdEIsT0FBTyxJQUFJLENBQUM7Ozs7RUFJWixTQUFTLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFO0lBQ3JCLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDckMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQzs7SUFFcEMsS0FBSyxHQUFHLEtBQUssSUFBSSxHQUFHLENBQUM7O0lBRXJCLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxTQUFTLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRTtNQUNsQyxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ25DLE1BQU07TUFDTCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO01BQy9CLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0tBQ2Q7O0lBRUQsT0FBTyxJQUFJLENBQUM7R0FDYjs7OztFQUlELFNBQVMsSUFBSSxDQUFDLEtBQUssRUFBRTtJQUNuQixNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUseUJBQXlCLENBQUMsQ0FBQztJQUM3RCxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7O0lBRWxELElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDOUIsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRTtNQUNuQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztNQUN0QixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNsQzs7SUFFRCxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxFQUFFLEVBQUU7TUFDakIsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7TUFDckIsT0FBTyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDakM7O0lBRUQsTUFBTSxJQUFJLEtBQUssQ0FBQyxTQUFTLEdBQUcsS0FBSyxHQUFHLGlCQUFpQixDQUFDLENBQUM7R0FDeEQ7Q0FDRjtDQUNBLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDaEUsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3RDLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMvQixJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRTdCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDOzs7O0FBSXRCLFNBQVMsSUFBSSxHQUFHO0VBQ2QsSUFBSSxFQUFFLElBQUksWUFBWSxJQUFJLENBQUMsRUFBRSxPQUFPLElBQUksSUFBSSxFQUFFLENBQUM7RUFDL0MsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQztDQUMzQjs7Ozs7QUFLRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxVQUFVLEtBQUssRUFBRTtFQUN2QyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxFQUFFLFFBQVEsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDOztFQUVqRSxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7RUFDakQsT0FBTyxTQUFTLFVBQVUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTtJQUM5QyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7O0lBRTFCLElBQUksS0FBSyxLQUFLLFNBQVMsRUFBRSxPQUFPLElBQUksQ0FBQzs7SUFFckMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ2hCLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTs7TUFFcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDckIsSUFBSSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO09BQ3pCLE1BQU07UUFDTCxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUN6QjtNQUNELElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDckMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtNQUM3QixJQUFJLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLENBQUM7TUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7S0FDMUIsTUFBTTtNQUNMLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzFCOzs7SUFHRCxPQUFPLFVBQVUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztHQUM1QyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0NBQ3pCLENBQUM7Ozs7O0FBS0YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsVUFBVSxLQUFLLEVBQUU7RUFDdEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRSxRQUFRLEVBQUUsMEJBQTBCLENBQUMsQ0FBQzs7RUFFakUsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ2pELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQzs7RUFFaEIsSUFBSSxJQUFJLEdBQUcsU0FBUyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRTs7SUFFdEMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFLE9BQU8sU0FBUyxDQUFDO0lBQ3pDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMxQixJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUUsT0FBTyxJQUFJLENBQUM7O0lBRXJDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTs7TUFFckIsT0FBTyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDN0MsTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7O01BRXBCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO01BQzFCLE9BQU8sTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQzVDLE1BQU07O01BRUwsT0FBTyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQzFCO0dBQ0YsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztFQUVoQixJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sU0FBUyxDQUFDO0VBQzVCLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7RUFDckIsT0FBTyxJQUFJLENBQUM7Q0FDYixDQUFDOzs7O0FBSUYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsVUFBVSxLQUFLLEVBQUUsSUFBSSxFQUFFO0VBQzVDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsUUFBUSxFQUFFLDBCQUEwQixDQUFDLENBQUM7RUFDakUsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksRUFBRSxRQUFRLEVBQUUseUJBQXlCLENBQUMsQ0FBQzs7RUFFL0QsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0VBQ2hELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztFQUNoQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7O0VBRWYsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtJQUN0QixHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2YsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7R0FDekIsTUFBTTtJQUNMLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDaEQsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2YsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7R0FDMUI7O0VBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0VBQy9CLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7RUFJckMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0lBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEdBQUcsRUFBRTtNQUNqRCxJQUFJLEdBQUcsS0FBSyxPQUFPLEVBQUUsT0FBTztNQUM1QixJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNqQyxDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7R0FDN0I7Q0FDRixDQUFDO0NBQ0QsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxTQUFTLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO0FBQ2xGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDOztBQUV4QixJQUFJLGNBQWMsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQzs7QUFFckQsU0FBUyxNQUFNLEdBQUc7SUFDZCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7O0lBRWhCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3ZDLElBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7UUFFMUIsS0FBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLEVBQUU7WUFDcEIsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDbEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUM3QjtTQUNKO0tBQ0o7O0lBRUQsT0FBTyxNQUFNLENBQUM7Q0FDakI7Q0FDQSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDMUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7O0FBRXhCLElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDOztBQUVyRCxTQUFTLE1BQU0sQ0FBQyxNQUFNLEVBQUU7SUFDcEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdkMsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDOztRQUUxQixLQUFLLElBQUksR0FBRyxJQUFJLE1BQU0sRUFBRTtZQUNwQixJQUFJLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxFQUFFO2dCQUNsQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQzdCO1NBQ0o7S0FDSjs7SUFFRCxPQUFPLE1BQU0sQ0FBQztDQUNqQjtDQUNBLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsU0FBUyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztBQUMxQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7QUFDYixJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDbkMsSUFBSSxhQUFhLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7O0FBRWxELE1BQU0sQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDOzs7QUFHckIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsVUFBVSxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRTtFQUN4RCxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksR0FBRyxFQUFFLENBQUM7RUFDckIsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLEtBQUssRUFBRTtJQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQztHQUMxRDs7RUFFRCxPQUFPLFFBQVEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDOzs7O0VBSXhDLFNBQVMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7O0lBRXBCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUksYUFBYSxDQUFDO0lBQzFDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO01BQ3RDLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUNuQixJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTs7UUFFVCxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO09BQ2YsTUFBTSxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTs7UUFFaEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQztPQUNuQjtLQUNGOztJQUVELElBQUksQ0FBQyxDQUFDLFFBQVEsS0FBSyxPQUFPLElBQUksQ0FBQyxDQUFDLElBQUksS0FBSyxNQUFNLElBQUksQ0FBQyxDQUFDLFFBQVEsS0FBSyxVQUFVLElBQUksQ0FBQyxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7TUFDdkcsSUFBSSxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7S0FDekQ7R0FDRjtDQUNGLENBQUM7Q0FDRCxDQUFDLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDL0UsTUFBTSxDQUFDLE9BQU8sR0FBRzs7QUFFakIsU0FBUyxFQUFFLFlBQVksRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLFNBQVM7O0FBRTFXLGVBQWUsRUFBRSxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUM7Q0FDM0MsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2hCLENBQUM7OztBQ25qRkYsTUFBTUUsUUFBUSxDQUFDQyxJQUFELEVBQU9DLEtBQVAsS0FBaUI7U0FDdEIsRUFBRUYsT0FBT0MsSUFBVCxFQUFQO0NBREY7O0FBSUEsZUFBZTthQUNGLEtBREU7U0FFTjtXQUNFLFVBREY7YUFFSSx1QkFGSjtXQUdFO0dBTEk7WUFPSCxFQUFFRCxLQUFGO0NBUFo7O0FDSkEsYUFBYyxHQUFHLE1BQU07O0FBRXZCLElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDOztBQUVyRCxTQUFTLE1BQU0sR0FBRztJQUNkLElBQUksTUFBTSxHQUFHLEVBQUU7O0lBRWYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDdkMsSUFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQzs7UUFFekIsS0FBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLEVBQUU7WUFDcEIsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsRUFBRTtnQkFDbEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUM7YUFDNUI7U0FDSjtLQUNKOztJQUVELE9BQU8sTUFBTTtDQUNoQjs7QUNoQkQsTUFBTUcsb0JBQW9CLENBQUNDLEtBQUQsRUFBUUMsTUFBUixLQUFtQjtRQUNyQ0MsV0FBV0MsVUFBTSxFQUFOLEVBQVVILEtBQVYsRUFBaUIsRUFBRUksVUFBVUosTUFBTUksUUFBTixHQUFpQkgsTUFBN0IsRUFBakIsQ0FBakI7TUFDSUMsU0FBU0UsUUFBVCxJQUFxQixDQUF6QixFQUE0QjthQUNqQkEsUUFBVCxHQUFvQixDQUFwQjthQUNTTixLQUFULEdBQWlCLFdBQWpCOztTQUVLSSxRQUFQO0NBTkY7O0FBU0EsQUFBTyxNQUFNRyxXQUFXLENBQUNSLElBQUQsRUFBT0MsS0FBUCxNQUFrQixFQUFFTyxVQUFVUixJQUFaLEVBQWxCLENBQWpCOztBQUVQLEFBQU8sTUFBTVMsV0FBVyxDQUFDVCxJQUFELEVBQU9DLEtBQVAsTUFBa0IsRUFBRVEsVUFBVVQsSUFBWixFQUFsQixDQUFqQjs7QUFFUCxBQUFPLE1BQU1VLGNBQWMsQ0FBQ1YsSUFBRCxFQUFPQyxLQUFQLE1BQWtCO1lBQ2pDQSxNQUFNUSxRQUFOLENBQWVFLEdBQWYsQ0FBbUJDLFVBQVU7V0FDOUJDLE1BQVAsR0FBZ0JELE9BQU9DLE1BQVAsQ0FBY0YsR0FBZCxDQUFrQlIsU0FBUztVQUNyQ0EsTUFBTVcsR0FBTixLQUFjZCxLQUFLYyxHQUF2QixFQUE0QjtlQUNuQlIsVUFBTSxFQUFOLEVBQVVILEtBQVYsRUFBaUJILElBQWpCLENBQVA7O2FBRUtHLEtBQVA7S0FKYyxDQUFoQjtXQU1PUyxNQUFQO0dBUFE7Q0FEZSxDQUFwQjs7QUFZUCxBQUFPLE1BQU1HLHlCQUF5QixDQUFDZixJQUFELEVBQU9DLEtBQVAsTUFBa0I7WUFDNUNBLE1BQU1RLFFBQU4sQ0FBZUUsR0FBZixDQUFtQkMsVUFBVTtXQUM5QkMsTUFBUCxHQUFnQkQsT0FBT0MsTUFBUCxDQUFjRixHQUFkLENBQWtCUixTQUFTO1VBQ3JDQSxNQUFNVyxHQUFOLEtBQWNkLEtBQUtjLEdBQW5CLElBQTBCLGVBQWVYLE1BQU1GLEtBQW5ELEVBQTBEO2VBQ2pEQyxrQkFBa0JDLEtBQWxCLEVBQXlCSCxLQUFLSSxNQUE5QixDQUFQOzthQUVLRCxLQUFQO0tBSmMsQ0FBaEI7V0FNT1MsTUFBUDtHQVBRO0NBRDBCLENBQS9COztBQVlQLEFBQU8sTUFBTUksNkJBQTZCLENBQUNaLE1BQUQsRUFBU0gsS0FBVCxNQUFvQjtZQUNsREEsTUFBTVEsUUFBTixDQUFlRSxHQUFmLENBQW1CQyxVQUFVO1dBQzlCQyxNQUFQLEdBQWdCRCxPQUFPQyxNQUFQLENBQWNGLEdBQWQsQ0FBa0JSLFNBQVM7VUFDckMsZUFBZUEsTUFBTUYsS0FBekIsRUFBZ0M7ZUFDdkJDLGtCQUFrQkMsS0FBbEIsRUFBeUJDLE1BQXpCLENBQVA7O2FBRUtELEtBQVA7S0FKYyxDQUFoQjtXQU1PUyxNQUFQO0dBUFE7Q0FEOEIsQ0FBbkM7Ozs7Ozs7Ozs7QUN2Q1AsQ0FBQyxTQUFTLElBQUksRUFBRTtFQUNkLFlBQVksQ0FBQzs7RUFFYixJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7SUFDZCxNQUFNO0dBQ1A7O0VBRUQsSUFBSSxPQUFPLEdBQUc7SUFDWixZQUFZLEVBQUUsaUJBQWlCLElBQUksSUFBSTtJQUN2QyxRQUFRLEVBQUUsUUFBUSxJQUFJLElBQUksSUFBSSxVQUFVLElBQUksTUFBTTtJQUNsRCxJQUFJLEVBQUUsWUFBWSxJQUFJLElBQUksSUFBSSxNQUFNLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVztNQUMxRCxJQUFJO1FBQ0YsSUFBSSxJQUFJLEVBQUU7UUFDVixPQUFPLElBQUk7T0FDWixDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ1QsT0FBTyxLQUFLO09BQ2I7S0FDRixDQUFDLEVBQUU7SUFDSixRQUFRLEVBQUUsVUFBVSxJQUFJLElBQUk7SUFDNUIsV0FBVyxFQUFFLGFBQWEsSUFBSSxJQUFJO0dBQ25DOztFQUVELFNBQVMsYUFBYSxDQUFDLElBQUksRUFBRTtJQUMzQixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtNQUM1QixJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNwQjtJQUNELElBQUksNEJBQTRCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO01BQzNDLE1BQU0sSUFBSSxTQUFTLENBQUMsd0NBQXdDLENBQUM7S0FDOUQ7SUFDRCxPQUFPLElBQUksQ0FBQyxXQUFXLEVBQUU7R0FDMUI7O0VBRUQsU0FBUyxjQUFjLENBQUMsS0FBSyxFQUFFO0lBQzdCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO01BQzdCLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO0tBQ3RCO0lBQ0QsT0FBTyxLQUFLO0dBQ2I7OztFQUdELFNBQVMsV0FBVyxDQUFDLEtBQUssRUFBRTtJQUMxQixJQUFJLFFBQVEsR0FBRztNQUNiLElBQUksRUFBRSxXQUFXO1FBQ2YsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssRUFBRTtRQUN6QixPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUssS0FBSyxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztPQUNqRDtLQUNGOztJQUVELElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtNQUNwQixRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFdBQVc7UUFDckMsT0FBTyxRQUFRO09BQ2hCO0tBQ0Y7O0lBRUQsT0FBTyxRQUFRO0dBQ2hCOztFQUVELFNBQVMsT0FBTyxDQUFDLE9BQU8sRUFBRTtJQUN4QixJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUU7O0lBRWIsSUFBSSxPQUFPLFlBQVksT0FBTyxFQUFFO01BQzlCLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLEVBQUUsSUFBSSxFQUFFO1FBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQztPQUN6QixFQUFFLElBQUksQ0FBQzs7S0FFVCxNQUFNLElBQUksT0FBTyxFQUFFO01BQ2xCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLEVBQUU7UUFDekQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO09BQ2pDLEVBQUUsSUFBSSxDQUFDO0tBQ1Q7R0FDRjs7RUFFRCxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxTQUFTLElBQUksRUFBRSxLQUFLLEVBQUU7SUFDL0MsSUFBSSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUM7SUFDMUIsS0FBSyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUM7SUFDN0IsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7SUFDekIsSUFBSSxDQUFDLElBQUksRUFBRTtNQUNULElBQUksR0FBRyxFQUFFO01BQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJO0tBQ3RCO0lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7R0FDakI7O0VBRUQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsR0FBRyxTQUFTLElBQUksRUFBRTtJQUMzQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQ3JDOztFQUVELE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLFNBQVMsSUFBSSxFQUFFO0lBQ3JDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFDLE9BQU8sTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJO0dBQ2pDOztFQUVELE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLFNBQVMsSUFBSSxFQUFFO0lBQ3hDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFO0dBQzNDOztFQUVELE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLFNBQVMsSUFBSSxFQUFFO0lBQ3JDLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQ3BEOztFQUVELE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLFNBQVMsSUFBSSxFQUFFLEtBQUssRUFBRTtJQUM1QyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO0dBQ3hEOztFQUVELE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLFNBQVMsUUFBUSxFQUFFLE9BQU8sRUFBRTtJQUN0RCxNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksRUFBRTtNQUMxRCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLEtBQUssRUFBRTtRQUNyQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztPQUMxQyxFQUFFLElBQUksQ0FBQztLQUNULEVBQUUsSUFBSSxDQUFDO0dBQ1Q7O0VBRUQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsV0FBVztJQUNsQyxJQUFJLEtBQUssR0FBRyxFQUFFO0lBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7SUFDeEQsT0FBTyxXQUFXLENBQUMsS0FBSyxDQUFDO0dBQzFCOztFQUVELE9BQU8sQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLFdBQVc7SUFDcEMsSUFBSSxLQUFLLEdBQUcsRUFBRTtJQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLEVBQUUsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7SUFDbkQsT0FBTyxXQUFXLENBQUMsS0FBSyxDQUFDO0dBQzFCOztFQUVELE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLFdBQVc7SUFDckMsSUFBSSxLQUFLLEdBQUcsRUFBRTtJQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7SUFDakUsT0FBTyxXQUFXLENBQUMsS0FBSyxDQUFDO0dBQzFCOztFQUVELElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtJQUNwQixPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU87R0FDL0Q7O0VBRUQsU0FBUyxRQUFRLENBQUMsSUFBSSxFQUFFO0lBQ3RCLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtNQUNqQixPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUM7S0FDckQ7SUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUk7R0FDckI7O0VBRUQsU0FBUyxlQUFlLENBQUMsTUFBTSxFQUFFO0lBQy9CLE9BQU8sSUFBSSxPQUFPLENBQUMsU0FBUyxPQUFPLEVBQUUsTUFBTSxFQUFFO01BQzNDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsV0FBVztRQUN6QixPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztPQUN2QjtNQUNELE1BQU0sQ0FBQyxPQUFPLEdBQUcsV0FBVztRQUMxQixNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztPQUNyQjtLQUNGLENBQUM7R0FDSDs7RUFFRCxTQUFTLHFCQUFxQixDQUFDLElBQUksRUFBRTtJQUNuQyxJQUFJLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRTtJQUM3QixNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDO0lBQzlCLE9BQU8sZUFBZSxDQUFDLE1BQU0sQ0FBQztHQUMvQjs7RUFFRCxTQUFTLGNBQWMsQ0FBQyxJQUFJLEVBQUU7SUFDNUIsSUFBSSxNQUFNLEdBQUcsSUFBSSxVQUFVLEVBQUU7SUFDN0IsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7SUFDdkIsT0FBTyxlQUFlLENBQUMsTUFBTSxDQUFDO0dBQy9COztFQUVELFNBQVMsSUFBSSxHQUFHO0lBQ2QsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLOztJQUVyQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsSUFBSSxFQUFFO01BQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSTtNQUNyQixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUk7T0FDdEIsTUFBTSxJQUFJLE9BQU8sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDN0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJO09BQ3RCLE1BQU0sSUFBSSxPQUFPLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3JFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSTtPQUMxQixNQUFNLElBQUksT0FBTyxDQUFDLFlBQVksSUFBSSxlQUFlLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNoRixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUU7T0FDakMsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ2hCLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRTtPQUNwQixNQUFNLElBQUksT0FBTyxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRTs7O09BRzVFLE1BQU07UUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLDJCQUEyQixDQUFDO09BQzdDOztNQUVELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsRUFBRTtRQUNyQyxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtVQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsMEJBQTBCLENBQUM7U0FDN0QsTUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUU7VUFDaEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1NBQ3RELE1BQU0sSUFBSSxPQUFPLENBQUMsWUFBWSxJQUFJLGVBQWUsQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFO1VBQ2hGLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxpREFBaUQsQ0FBQztTQUNwRjtPQUNGO0tBQ0Y7O0lBRUQsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFO01BQ2hCLElBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVztRQUNyQixJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBQzdCLElBQUksUUFBUSxFQUFFO1VBQ1osT0FBTyxRQUFRO1NBQ2hCOztRQUVELElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtVQUNsQixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUN2QyxNQUFNLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtVQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLHNDQUFzQyxDQUFDO1NBQ3hELE1BQU07VUFDTCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztTQUNuRDtPQUNGOztNQUVELElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVztRQUM1QixPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUM7T0FDL0M7O01BRUQsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXO1FBQ3JCLElBQUksUUFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDN0IsSUFBSSxRQUFRLEVBQUU7VUFDWixPQUFPLFFBQVE7U0FDaEI7O1FBRUQsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1VBQ2xCLE9BQU8sY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDdEMsTUFBTSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7VUFDN0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQztTQUN4RCxNQUFNO1VBQ0wsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDdkM7T0FDRjtLQUNGLE1BQU07TUFDTCxJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVc7UUFDckIsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztRQUM3QixPQUFPLFFBQVEsR0FBRyxRQUFRLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO09BQzdEO0tBQ0Y7O0lBRUQsSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFO01BQ3BCLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVztRQUN6QixPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO09BQ2hDO0tBQ0Y7O0lBRUQsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXO01BQ3JCLE9BQU8sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ3BDOztJQUVELE9BQU8sSUFBSTtHQUNaOzs7RUFHRCxJQUFJLE9BQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDOztFQUVqRSxTQUFTLGVBQWUsQ0FBQyxNQUFNLEVBQUU7SUFDL0IsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRTtJQUNsQyxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sR0FBRyxNQUFNO0dBQzFEOztFQUVELFNBQVMsT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUU7SUFDL0IsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFO0lBQ3ZCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJO0lBQ3ZCLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUU7TUFDMUMsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO1FBQ2xCLE1BQU0sSUFBSSxTQUFTLENBQUMsY0FBYyxDQUFDO09BQ3BDO01BQ0QsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRztNQUNwQixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXO01BQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO1FBQ3BCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztPQUMxQztNQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU07TUFDMUIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSTtNQUN0QixJQUFJLENBQUMsSUFBSSxFQUFFO1FBQ1QsSUFBSSxHQUFHLEtBQUssQ0FBQyxTQUFTO1FBQ3RCLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSTtPQUN0QjtLQUNGLE1BQU07TUFDTCxJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUs7S0FDakI7O0lBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksTUFBTTtJQUNwRSxJQUFJLE9BQU8sQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO01BQ3BDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztLQUM1QztJQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUM7SUFDckUsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSTtJQUM3QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUk7O0lBRXBCLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxJQUFJLElBQUksRUFBRTtNQUM3RCxNQUFNLElBQUksU0FBUyxDQUFDLDJDQUEyQyxDQUFDO0tBQ2pFO0lBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7R0FDckI7O0VBRUQsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsV0FBVztJQUNuQyxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQztHQUN6Qjs7RUFFRCxTQUFTLE1BQU0sQ0FBQyxJQUFJLEVBQUU7SUFDcEIsSUFBSSxJQUFJLEdBQUcsSUFBSSxRQUFRLEVBQUU7SUFDekIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLEVBQUU7TUFDN0MsSUFBSSxLQUFLLEVBQUU7UUFDVCxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUM1QixJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7UUFDNUMsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztRQUMvQyxJQUFJLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxFQUFFLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO09BQ2pFO0tBQ0YsQ0FBQztJQUNGLE9BQU8sSUFBSTtHQUNaOztFQUVELFNBQVMsT0FBTyxDQUFDLEdBQUcsRUFBRTtJQUNwQixJQUFJLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRTtJQUN4QixJQUFJLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7SUFDbEUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLE1BQU0sRUFBRTtNQUM3QixJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztNQUNwQyxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxFQUFFO01BQzlCLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFO01BQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQztLQUN4QixDQUFDO0lBQ0YsT0FBTyxJQUFJO0dBQ1o7O0VBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDOztFQUU1QixTQUFTLFFBQVEsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFO0lBQ25DLElBQUksQ0FBQyxPQUFPLEVBQUU7TUFDWixPQUFPLEdBQUcsRUFBRTtLQUNiOztJQUVELElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUztJQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNO0lBQzVCLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHO0lBQ2pELElBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVU7SUFDcEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxZQUFZLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7SUFDbEcsSUFBSSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxJQUFJLEVBQUU7SUFDNUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7R0FDekI7O0VBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDOztFQUU3QixRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssR0FBRyxXQUFXO0lBQ3BDLE9BQU8sSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtNQUNsQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU07TUFDbkIsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO01BQzNCLE9BQU8sRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO01BQ2xDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztLQUNkLENBQUM7R0FDSDs7RUFFRCxRQUFRLENBQUMsS0FBSyxHQUFHLFdBQVc7SUFDMUIsSUFBSSxRQUFRLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDOUQsUUFBUSxDQUFDLElBQUksR0FBRyxPQUFPO0lBQ3ZCLE9BQU8sUUFBUTtHQUNoQjs7RUFFRCxJQUFJLGdCQUFnQixHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQzs7RUFFaEQsUUFBUSxDQUFDLFFBQVEsR0FBRyxTQUFTLEdBQUcsRUFBRSxNQUFNLEVBQUU7SUFDeEMsSUFBSSxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7TUFDM0MsTUFBTSxJQUFJLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQztLQUM1Qzs7SUFFRCxPQUFPLElBQUksUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7R0FDdEU7O0VBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPO0VBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTztFQUN0QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVE7O0VBRXhCLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxLQUFLLEVBQUUsSUFBSSxFQUFFO0lBQ2pDLE9BQU8sSUFBSSxPQUFPLENBQUMsU0FBUyxPQUFPLEVBQUUsTUFBTSxFQUFFO01BQzNDLElBQUksT0FBTztNQUNYLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDbkQsT0FBTyxHQUFHLEtBQUs7T0FDaEIsTUFBTTtRQUNMLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDO09BQ25DOztNQUVELElBQUksR0FBRyxHQUFHLElBQUksY0FBYyxFQUFFOztNQUU5QixTQUFTLFdBQVcsR0FBRztRQUNyQixJQUFJLGFBQWEsSUFBSSxHQUFHLEVBQUU7VUFDeEIsT0FBTyxHQUFHLENBQUMsV0FBVztTQUN2Qjs7O1FBR0QsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLENBQUMsRUFBRTtVQUN4RCxPQUFPLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUM7U0FDOUM7O1FBRUQsTUFBTTtPQUNQOztNQUVELEdBQUcsQ0FBQyxNQUFNLEdBQUcsV0FBVztRQUN0QixJQUFJLE9BQU8sR0FBRztVQUNaLE1BQU0sRUFBRSxHQUFHLENBQUMsTUFBTTtVQUNsQixVQUFVLEVBQUUsR0FBRyxDQUFDLFVBQVU7VUFDMUIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUM7VUFDckIsR0FBRyxFQUFFLFdBQVcsRUFBRTtTQUNuQjtRQUNELElBQUksSUFBSSxHQUFHLFVBQVUsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsWUFBWTtRQUM5RCxPQUFPLENBQUMsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO09BQ3JDOztNQUVELEdBQUcsQ0FBQyxPQUFPLEdBQUcsV0FBVztRQUN2QixNQUFNLENBQUMsSUFBSSxTQUFTLENBQUMsd0JBQXdCLENBQUMsQ0FBQztPQUNoRDs7TUFFRCxHQUFHLENBQUMsU0FBUyxHQUFHLFdBQVc7UUFDekIsTUFBTSxDQUFDLElBQUksU0FBUyxDQUFDLHdCQUF3QixDQUFDLENBQUM7T0FDaEQ7O01BRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDOztNQUUzQyxJQUFJLE9BQU8sQ0FBQyxXQUFXLEtBQUssU0FBUyxFQUFFO1FBQ3JDLEdBQUcsQ0FBQyxlQUFlLEdBQUcsSUFBSTtPQUMzQjs7TUFFRCxJQUFJLGNBQWMsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksRUFBRTtRQUN6QyxHQUFHLENBQUMsWUFBWSxHQUFHLE1BQU07T0FDMUI7O01BRUQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxLQUFLLEVBQUUsSUFBSSxFQUFFO1FBQzVDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDO09BQ2xDLENBQUM7O01BRUYsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLE9BQU8sQ0FBQyxTQUFTLEtBQUssV0FBVyxHQUFHLElBQUksR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO0tBQzlFLENBQUM7R0FDSDtFQUNELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLElBQUk7Q0FDM0IsQ0FBQyxDQUFDLE9BQU8sSUFBSSxLQUFLLFdBQVcsR0FBRyxJQUFJLEdBQUcsU0FBSSxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZhOUMsU0FBYyxHQUFHLFVBQVUsTUFBTSxFQUFFLE1BQU0sRUFBRTtFQUN6QyxJQUFJLEVBQUUsR0FBRyxDQUFDOztFQUVWLE1BQU0sR0FBRyxNQUFNLElBQUksRUFBRTtFQUNyQixNQUFNLEdBQUcsTUFBTSxJQUFJ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