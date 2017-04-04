/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(2);

	var _vue2 = _interopRequireDefault(_vue);

	var _vueMultianalytics = __webpack_require__(3);

	var _vueMultianalytics2 = _interopRequireDefault(_vueMultianalytics);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var gaConfig = {
	  appName: 'Test', // Mandatory
	  appVersion: '0.1', // Mandatory
	  trackingId: 'UA-96678006-1', // Mandatory
	  globalDimensions: [],
	  globalMetrics: [],
	  debug: true
	};

	var mixpanelConfig = {
	  token: '933572e86a323c77cf71d8c2d376fc5e',
	  debug: true
	};

	_vue2.default.use(_vueMultianalytics2.default, {
	  modules: {
	    ga: gaConfig,
	    mixpanel: mixpanelConfig
	  }
	});
	var template = '\n  <div>\n    <div>{{message}}</div>\n    <button @click="trackView()">Track View</button>\n    <button @click="trackEvent()">Track Event</button>\n    <button @click="trackException()">Track Exception</button>\n  </div>\n';
	var app = new _vue2.default({
	  el: '#app',
	  template: template,
	  data: {
	    message: 'Hello MultiAnalytics'
	  },
	  mounted: function mounted() {
	    console.log(this.$ma);
	  },

	  methods: {
	    trackEvent: function trackEvent() {
	      this.$ma.trackEvent({ action: 'test category', category: 'clicks', properties: { interesting: true } });
	    },
	    trackView: function trackView() {
	      this.$ma.trackView({ viewName: 'test view' });
	    },
	    trackException: function trackException() {
	      this.$ma.trackException({ description: 'test exception', isFatal: true });
	    }
	  }
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * Vue.js v2.2.6
	 * (c) 2014-2017 Evan You
	 * Released under the MIT License.
	 */
	(function (global, factory) {
		 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.Vue = factory());
	}(this, (function () { 'use strict';

	/*  */

	/**
	 * Convert a value to a string that is actually rendered.
	 */
	function _toString (val) {
	  return val == null
	    ? ''
	    : typeof val === 'object'
	      ? JSON.stringify(val, null, 2)
	      : String(val)
	}

	/**
	 * Convert a input value to a number for persistence.
	 * If the conversion fails, return original string.
	 */
	function toNumber (val) {
	  var n = parseFloat(val);
	  return isNaN(n) ? val : n
	}

	/**
	 * Make a map and return a function for checking if a key
	 * is in that map.
	 */
	function makeMap (
	  str,
	  expectsLowerCase
	) {
	  var map = Object.create(null);
	  var list = str.split(',');
	  for (var i = 0; i < list.length; i++) {
	    map[list[i]] = true;
	  }
	  return expectsLowerCase
	    ? function (val) { return map[val.toLowerCase()]; }
	    : function (val) { return map[val]; }
	}

	/**
	 * Check if a tag is a built-in tag.
	 */
	var isBuiltInTag = makeMap('slot,component', true);

	/**
	 * Remove an item from an array
	 */
	function remove (arr, item) {
	  if (arr.length) {
	    var index = arr.indexOf(item);
	    if (index > -1) {
	      return arr.splice(index, 1)
	    }
	  }
	}

	/**
	 * Check whether the object has the property.
	 */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwn (obj, key) {
	  return hasOwnProperty.call(obj, key)
	}

	/**
	 * Check if value is primitive
	 */
	function isPrimitive (value) {
	  return typeof value === 'string' || typeof value === 'number'
	}

	/**
	 * Create a cached version of a pure function.
	 */
	function cached (fn) {
	  var cache = Object.create(null);
	  return (function cachedFn (str) {
	    var hit = cache[str];
	    return hit || (cache[str] = fn(str))
	  })
	}

	/**
	 * Camelize a hyphen-delimited string.
	 */
	var camelizeRE = /-(\w)/g;
	var camelize = cached(function (str) {
	  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
	});

	/**
	 * Capitalize a string.
	 */
	var capitalize = cached(function (str) {
	  return str.charAt(0).toUpperCase() + str.slice(1)
	});

	/**
	 * Hyphenate a camelCase string.
	 */
	var hyphenateRE = /([^-])([A-Z])/g;
	var hyphenate = cached(function (str) {
	  return str
	    .replace(hyphenateRE, '$1-$2')
	    .replace(hyphenateRE, '$1-$2')
	    .toLowerCase()
	});

	/**
	 * Simple bind, faster than native
	 */
	function bind (fn, ctx) {
	  function boundFn (a) {
	    var l = arguments.length;
	    return l
	      ? l > 1
	        ? fn.apply(ctx, arguments)
	        : fn.call(ctx, a)
	      : fn.call(ctx)
	  }
	  // record original fn length
	  boundFn._length = fn.length;
	  return boundFn
	}

	/**
	 * Convert an Array-like object to a real Array.
	 */
	function toArray (list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret
	}

	/**
	 * Mix properties into target object.
	 */
	function extend (to, _from) {
	  for (var key in _from) {
	    to[key] = _from[key];
	  }
	  return to
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 */
	function isObject (obj) {
	  return obj !== null && typeof obj === 'object'
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 */
	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';
	function isPlainObject (obj) {
	  return toString.call(obj) === OBJECT_STRING
	}

	/**
	 * Merge an Array of Objects into a single Object.
	 */
	function toObject (arr) {
	  var res = {};
	  for (var i = 0; i < arr.length; i++) {
	    if (arr[i]) {
	      extend(res, arr[i]);
	    }
	  }
	  return res
	}

	/**
	 * Perform no operation.
	 */
	function noop () {}

	/**
	 * Always return false.
	 */
	var no = function () { return false; };

	/**
	 * Return same value
	 */
	var identity = function (_) { return _; };

	/**
	 * Generate a static keys string from compiler modules.
	 */
	function genStaticKeys (modules) {
	  return modules.reduce(function (keys, m) {
	    return keys.concat(m.staticKeys || [])
	  }, []).join(',')
	}

	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 */
	function looseEqual (a, b) {
	  var isObjectA = isObject(a);
	  var isObjectB = isObject(b);
	  if (isObjectA && isObjectB) {
	    try {
	      return JSON.stringify(a) === JSON.stringify(b)
	    } catch (e) {
	      // possible circular reference
	      return a === b
	    }
	  } else if (!isObjectA && !isObjectB) {
	    return String(a) === String(b)
	  } else {
	    return false
	  }
	}

	function looseIndexOf (arr, val) {
	  for (var i = 0; i < arr.length; i++) {
	    if (looseEqual(arr[i], val)) { return i }
	  }
	  return -1
	}

	/**
	 * Ensure a function is called only once.
	 */
	function once (fn) {
	  var called = false;
	  return function () {
	    if (!called) {
	      called = true;
	      fn();
	    }
	  }
	}

	/*  */

	var config = {
	  /**
	   * Option merge strategies (used in core/util/options)
	   */
	  optionMergeStrategies: Object.create(null),

	  /**
	   * Whether to suppress warnings.
	   */
	  silent: false,

	  /**
	   * Show production mode tip message on boot?
	   */
	  productionTip: "development" !== 'production',

	  /**
	   * Whether to enable devtools
	   */
	  devtools: "development" !== 'production',

	  /**
	   * Whether to record perf
	   */
	  performance: false,

	  /**
	   * Error handler for watcher errors
	   */
	  errorHandler: null,

	  /**
	   * Ignore certain custom elements
	   */
	  ignoredElements: [],

	  /**
	   * Custom user key aliases for v-on
	   */
	  keyCodes: Object.create(null),

	  /**
	   * Check if a tag is reserved so that it cannot be registered as a
	   * component. This is platform-dependent and may be overwritten.
	   */
	  isReservedTag: no,

	  /**
	   * Check if a tag is an unknown element.
	   * Platform-dependent.
	   */
	  isUnknownElement: no,

	  /**
	   * Get the namespace of an element
	   */
	  getTagNamespace: noop,

	  /**
	   * Parse the real tag name for the specific platform.
	   */
	  parsePlatformTagName: identity,

	  /**
	   * Check if an attribute must be bound using property, e.g. value
	   * Platform-dependent.
	   */
	  mustUseProp: no,

	  /**
	   * List of asset types that a component can own.
	   */
	  _assetTypes: [
	    'component',
	    'directive',
	    'filter'
	  ],

	  /**
	   * List of lifecycle hooks.
	   */
	  _lifecycleHooks: [
	    'beforeCreate',
	    'created',
	    'beforeMount',
	    'mounted',
	    'beforeUpdate',
	    'updated',
	    'beforeDestroy',
	    'destroyed',
	    'activated',
	    'deactivated'
	  ],

	  /**
	   * Max circular updates allowed in a scheduler flush cycle.
	   */
	  _maxUpdateCount: 100
	};

	/*  */

	var emptyObject = Object.freeze({});

	/**
	 * Check if a string starts with $ or _
	 */
	function isReserved (str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F
	}

	/**
	 * Define a property.
	 */
	function def (obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}

	/**
	 * Parse simple path.
	 */
	var bailRE = /[^\w.$]/;
	function parsePath (path) {
	  if (bailRE.test(path)) {
	    return
	  }
	  var segments = path.split('.');
	  return function (obj) {
	    for (var i = 0; i < segments.length; i++) {
	      if (!obj) { return }
	      obj = obj[segments[i]];
	    }
	    return obj
	  }
	}

	/*  */
	/* globals MutationObserver */

	// can we use __proto__?
	var hasProto = '__proto__' in {};

	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined';
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE = UA && /msie|trident/.test(UA);
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isEdge = UA && UA.indexOf('edge/') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;
	var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
	var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

	// this needs to be lazy-evaled because vue may be required before
	// vue-server-renderer can set VUE_ENV
	var _isServer;
	var isServerRendering = function () {
	  if (_isServer === undefined) {
	    /* istanbul ignore if */
	    if (!inBrowser && typeof global !== 'undefined') {
	      // detect presence of vue-server-renderer and avoid
	      // Webpack shimming the process
	      _isServer = global['process'].env.VUE_ENV === 'server';
	    } else {
	      _isServer = false;
	    }
	  }
	  return _isServer
	};

	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	/* istanbul ignore next */
	function isNative (Ctor) {
	  return /native code/.test(Ctor.toString())
	}

	var hasSymbol =
	  typeof Symbol !== 'undefined' && isNative(Symbol) &&
	  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

	/**
	 * Defer a task to execute it asynchronously.
	 */
	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;

	  function nextTickHandler () {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks.length = 0;
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }

	  // the nextTick behavior leverages the microtask queue, which can be accessed
	  // via either native Promise.then or MutationObserver.
	  // MutationObserver has wider support, however it is seriously bugged in
	  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
	  // completely stops working after triggering a few times... so, if native
	  // Promise is available, we will use it:
	  /* istanbul ignore if */
	  if (typeof Promise !== 'undefined' && isNative(Promise)) {
	    var p = Promise.resolve();
	    var logError = function (err) { console.error(err); };
	    timerFunc = function () {
	      p.then(nextTickHandler).catch(logError);
	      // in problematic UIWebViews, Promise.then doesn't completely break, but
	      // it can get stuck in a weird state where callbacks are pushed into the
	      // microtask queue but the queue isn't being flushed, until the browser
	      // needs to do some other work, e.g. handle a timer. Therefore we can
	      // "force" the microtask queue to be flushed by adding an empty timer.
	      if (isIOS) { setTimeout(noop); }
	    };
	  } else if (typeof MutationObserver !== 'undefined' && (
	    isNative(MutationObserver) ||
	    // PhantomJS and iOS 7.x
	    MutationObserver.toString() === '[object MutationObserverConstructor]'
	  )) {
	    // use MutationObserver where native Promise is not available,
	    // e.g. PhantomJS IE11, iOS7, Android 4.4
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(String(counter));
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = String(counter);
	    };
	  } else {
	    // fallback to setTimeout
	    /* istanbul ignore next */
	    timerFunc = function () {
	      setTimeout(nextTickHandler, 0);
	    };
	  }

	  return function queueNextTick (cb, ctx) {
	    var _resolve;
	    callbacks.push(function () {
	      if (cb) { cb.call(ctx); }
	      if (_resolve) { _resolve(ctx); }
	    });
	    if (!pending) {
	      pending = true;
	      timerFunc();
	    }
	    if (!cb && typeof Promise !== 'undefined') {
	      return new Promise(function (resolve) {
	        _resolve = resolve;
	      })
	    }
	  }
	})();

	var _Set;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && isNative(Set)) {
	  // use native Set when available.
	  _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = (function () {
	    function Set () {
	      this.set = Object.create(null);
	    }
	    Set.prototype.has = function has (key) {
	      return this.set[key] === true
	    };
	    Set.prototype.add = function add (key) {
	      this.set[key] = true;
	    };
	    Set.prototype.clear = function clear () {
	      this.set = Object.create(null);
	    };

	    return Set;
	  }());
	}

	var warn = noop;
	var tip = noop;
	var formatComponentName;

	{
	  var hasConsole = typeof console !== 'undefined';
	  var classifyRE = /(?:^|[-_])(\w)/g;
	  var classify = function (str) { return str
	    .replace(classifyRE, function (c) { return c.toUpperCase(); })
	    .replace(/[-_]/g, ''); };

	  warn = function (msg, vm) {
	    if (hasConsole && (!config.silent)) {
	      console.error("[Vue warn]: " + msg + " " + (
	        vm ? formatLocation(formatComponentName(vm)) : ''
	      ));
	    }
	  };

	  tip = function (msg, vm) {
	    if (hasConsole && (!config.silent)) {
	      console.warn("[Vue tip]: " + msg + " " + (
	        vm ? formatLocation(formatComponentName(vm)) : ''
	      ));
	    }
	  };

	  formatComponentName = function (vm, includeFile) {
	    if (vm.$root === vm) {
	      return '<Root>'
	    }
	    var name = typeof vm === 'string'
	      ? vm
	      : typeof vm === 'function' && vm.options
	        ? vm.options.name
	        : vm._isVue
	          ? vm.$options.name || vm.$options._componentTag
	          : vm.name;

	    var file = vm._isVue && vm.$options.__file;
	    if (!name && file) {
	      var match = file.match(/([^/\\]+)\.vue$/);
	      name = match && match[1];
	    }

	    return (
	      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
	      (file && includeFile !== false ? (" at " + file) : '')
	    )
	  };

	  var formatLocation = function (str) {
	    if (str === "<Anonymous>") {
	      str += " - use the \"name\" option for better debugging messages.";
	    }
	    return ("\n(found in " + str + ")")
	  };
	}

	/*  */


	var uid$1 = 0;

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 */
	var Dep = function Dep () {
	  this.id = uid$1++;
	  this.subs = [];
	};

	Dep.prototype.addSub = function addSub (sub) {
	  this.subs.push(sub);
	};

	Dep.prototype.removeSub = function removeSub (sub) {
	  remove(this.subs, sub);
	};

	Dep.prototype.depend = function depend () {
	  if (Dep.target) {
	    Dep.target.addDep(this);
	  }
	};

	Dep.prototype.notify = function notify () {
	  // stabilize the subscriber list first
	  var subs = this.subs.slice();
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;
	var targetStack = [];

	function pushTarget (_target) {
	  if (Dep.target) { targetStack.push(Dep.target); }
	  Dep.target = _target;
	}

	function popTarget () {
	  Dep.target = targetStack.pop();
	}

	/*
	 * not type checking this file because flow doesn't play well with
	 * dynamically accessing methods on Array prototype
	 */

	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto);[
	  'push',
	  'pop',
	  'shift',
	  'unshift',
	  'splice',
	  'sort',
	  'reverse'
	]
	.forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator () {
	    var arguments$1 = arguments;

	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments$1[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break
	      case 'unshift':
	        inserted = args;
	        break
	      case 'splice':
	        inserted = args.slice(2);
	        break
	    }
	    if (inserted) { ob.observeArray(inserted); }
	    // notify change
	    ob.dep.notify();
	    return result
	  });
	});

	/*  */

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However when passing down props,
	 * we don't want to force conversion because the value may be a nested value
	 * under a frozen data structure. Converting it would defeat the optimization.
	 */
	var observerState = {
	  shouldConvert: true,
	  isSettingProps: false
	};

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 */
	var Observer = function Observer (value) {
	  this.value = value;
	  this.dep = new Dep();
	  this.vmCount = 0;
	  def(value, '__ob__', this);
	  if (Array.isArray(value)) {
	    var augment = hasProto
	      ? protoAugment
	      : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	};

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 */
	Observer.prototype.walk = function walk (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0; i < keys.length; i++) {
	    defineReactive$$1(obj, keys[i], obj[keys[i]]);
	  }
	};

	/**
	 * Observe a list of Array items.
	 */
	Observer.prototype.observeArray = function observeArray (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 */
	function protoAugment (target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 */
	/* istanbul ignore next */
	function copyAugment (target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 */
	function observe (value, asRootData) {
	  if (!isObject(value)) {
	    return
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (
	    observerState.shouldConvert &&
	    !isServerRendering() &&
	    (Array.isArray(value) || isPlainObject(value)) &&
	    Object.isExtensible(value) &&
	    !value._isVue
	  ) {
	    ob = new Observer(value);
	  }
	  if (asRootData && ob) {
	    ob.vmCount++;
	  }
	  return ob
	}

	/**
	 * Define a reactive property on an Object.
	 */
	function defineReactive$$1 (
	  obj,
	  key,
	  val,
	  customSetter
	) {
	  var dep = new Dep();

	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return
	  }

	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;

	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter () {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (Array.isArray(value)) {
	          dependArray(value);
	        }
	      }
	      return value
	    },
	    set: function reactiveSetter (newVal) {
	      var value = getter ? getter.call(obj) : val;
	      /* eslint-disable no-self-compare */
	      if (newVal === value || (newVal !== newVal && value !== value)) {
	        return
	      }
	      /* eslint-enable no-self-compare */
	      if ("development" !== 'production' && customSetter) {
	        customSetter();
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}

	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 */
	function set (target, key, val) {
	  if (Array.isArray(target) && typeof key === 'number') {
	    target.length = Math.max(target.length, key);
	    target.splice(key, 1, val);
	    return val
	  }
	  if (hasOwn(target, key)) {
	    target[key] = val;
	    return val
	  }
	  var ob = (target ).__ob__;
	  if (target._isVue || (ob && ob.vmCount)) {
	    "development" !== 'production' && warn(
	      'Avoid adding reactive properties to a Vue instance or its root $data ' +
	      'at runtime - declare it upfront in the data option.'
	    );
	    return val
	  }
	  if (!ob) {
	    target[key] = val;
	    return val
	  }
	  defineReactive$$1(ob.value, key, val);
	  ob.dep.notify();
	  return val
	}

	/**
	 * Delete a property and trigger change if necessary.
	 */
	function del (target, key) {
	  if (Array.isArray(target) && typeof key === 'number') {
	    target.splice(key, 1);
	    return
	  }
	  var ob = (target ).__ob__;
	  if (target._isVue || (ob && ob.vmCount)) {
	    "development" !== 'production' && warn(
	      'Avoid deleting properties on a Vue instance or its root $data ' +
	      '- just set it to null.'
	    );
	    return
	  }
	  if (!hasOwn(target, key)) {
	    return
	  }
	  delete target[key];
	  if (!ob) {
	    return
	  }
	  ob.dep.notify();
	}

	/**
	 * Collect dependencies on array elements when the array is touched, since
	 * we cannot intercept array element access like property getters.
	 */
	function dependArray (value) {
	  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
	    e = value[i];
	    e && e.__ob__ && e.__ob__.dep.depend();
	    if (Array.isArray(e)) {
	      dependArray(e);
	    }
	  }
	}

	/*  */

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 */
	var strats = config.optionMergeStrategies;

	/**
	 * Options with restrictions
	 */
	{
	  strats.el = strats.propsData = function (parent, child, vm, key) {
	    if (!vm) {
	      warn(
	        "option \"" + key + "\" can only be used during instance " +
	        'creation with the `new` keyword.'
	      );
	    }
	    return defaultStrat(parent, child)
	  };
	}

	/**
	 * Helper that recursively merges two data objects together.
	 */
	function mergeData (to, from) {
	  if (!from) { return to }
	  var key, toVal, fromVal;
	  var keys = Object.keys(from);
	  for (var i = 0; i < keys.length; i++) {
	    key = keys[i];
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to
	}

	/**
	 * Data
	 */
	strats.data = function (
	  parentVal,
	  childVal,
	  vm
	) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal
	    }
	    if (typeof childVal !== 'function') {
	      "development" !== 'production' && warn(
	        'The "data" option should be a function ' +
	        'that returns a per-instance value in component ' +
	        'definitions.',
	        vm
	      );
	      return parentVal
	    }
	    if (!parentVal) {
	      return childVal
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn () {
	      return mergeData(
	        childVal.call(this),
	        parentVal.call(this)
	      )
	    }
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn () {
	      // instance merge
	      var instanceData = typeof childVal === 'function'
	        ? childVal.call(vm)
	        : childVal;
	      var defaultData = typeof parentVal === 'function'
	        ? parentVal.call(vm)
	        : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData)
	      } else {
	        return defaultData
	      }
	    }
	  }
	};

	/**
	 * Hooks and props are merged as arrays.
	 */
	function mergeHook (
	  parentVal,
	  childVal
	) {
	  return childVal
	    ? parentVal
	      ? parentVal.concat(childVal)
	      : Array.isArray(childVal)
	        ? childVal
	        : [childVal]
	    : parentVal
	}

	config._lifecycleHooks.forEach(function (hook) {
	  strats[hook] = mergeHook;
	});

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	function mergeAssets (parentVal, childVal) {
	  var res = Object.create(parentVal || null);
	  return childVal
	    ? extend(res, childVal)
	    : res
	}

	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});

	/**
	 * Watchers.
	 *
	 * Watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	strats.watch = function (parentVal, childVal) {
	  /* istanbul ignore if */
	  if (!childVal) { return Object.create(parentVal || null) }
	  if (!parentVal) { return childVal }
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !Array.isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent
	      ? parent.concat(child)
	      : [child];
	  }
	  return ret
	};

	/**
	 * Other object hashes.
	 */
	strats.props =
	strats.methods =
	strats.computed = function (parentVal, childVal) {
	  if (!childVal) { return Object.create(parentVal || null) }
	  if (!parentVal) { return childVal }
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret
	};

	/**
	 * Default strategy.
	 */
	var defaultStrat = function (parentVal, childVal) {
	  return childVal === undefined
	    ? parentVal
	    : childVal
	};

	/**
	 * Validate component names
	 */
	function checkComponents (options) {
	  for (var key in options.components) {
	    var lower = key.toLowerCase();
	    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
	      warn(
	        'Do not use built-in or reserved HTML elements as component ' +
	        'id: ' + key
	      );
	    }
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 */
	function normalizeProps (options) {
	  var props = options.props;
	  if (!props) { return }
	  var res = {};
	  var i, val, name;
	  if (Array.isArray(props)) {
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        name = camelize(val);
	        res[name] = { type: null };
	      } else {
	        warn('props must be strings when using array syntax.');
	      }
	    }
	  } else if (isPlainObject(props)) {
	    for (var key in props) {
	      val = props[key];
	      name = camelize(key);
	      res[name] = isPlainObject(val)
	        ? val
	        : { type: val };
	    }
	  }
	  options.props = res;
	}

	/**
	 * Normalize raw function directives into object format.
	 */
	function normalizeDirectives (options) {
	  var dirs = options.directives;
	  if (dirs) {
	    for (var key in dirs) {
	      var def = dirs[key];
	      if (typeof def === 'function') {
	        dirs[key] = { bind: def, update: def };
	      }
	    }
	  }
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 */
	function mergeOptions (
	  parent,
	  child,
	  vm
	) {
	  {
	    checkComponents(child);
	  }
	  normalizeProps(child);
	  normalizeDirectives(child);
	  var extendsFrom = child.extends;
	  if (extendsFrom) {
	    parent = typeof extendsFrom === 'function'
	      ? mergeOptions(parent, extendsFrom.options, vm)
	      : mergeOptions(parent, extendsFrom, vm);
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      var mixin = child.mixins[i];
	      if (mixin.prototype instanceof Vue$3) {
	        mixin = mixin.options;
	      }
	      parent = mergeOptions(parent, mixin, vm);
	    }
	  }
	  var options = {};
	  var key;
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField (key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 */
	function resolveAsset (
	  options,
	  type,
	  id,
	  warnMissing
	) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return
	  }
	  var assets = options[type];
	  // check local registration variations first
	  if (hasOwn(assets, id)) { return assets[id] }
	  var camelizedId = camelize(id);
	  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
	  var PascalCaseId = capitalize(camelizedId);
	  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
	  // fallback to prototype chain
	  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
	  if ("development" !== 'production' && warnMissing && !res) {
	    warn(
	      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
	      options
	    );
	  }
	  return res
	}

	/*  */

	function validateProp (
	  key,
	  propOptions,
	  propsData,
	  vm
	) {
	  var prop = propOptions[key];
	  var absent = !hasOwn(propsData, key);
	  var value = propsData[key];
	  // handle boolean props
	  if (isType(Boolean, prop.type)) {
	    if (absent && !hasOwn(prop, 'default')) {
	      value = false;
	    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
	      value = true;
	    }
	  }
	  // check default value
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop, key);
	    // since the default value is a fresh copy,
	    // make sure to observe it.
	    var prevShouldConvert = observerState.shouldConvert;
	    observerState.shouldConvert = true;
	    observe(value);
	    observerState.shouldConvert = prevShouldConvert;
	  }
	  {
	    assertProp(prop, key, value, vm, absent);
	  }
	  return value
	}

	/**
	 * Get the default value of a prop.
	 */
	function getPropDefaultValue (vm, prop, key) {
	  // no default, return undefined
	  if (!hasOwn(prop, 'default')) {
	    return undefined
	  }
	  var def = prop.default;
	  // warn against non-factory defaults for Object & Array
	  if ("development" !== 'production' && isObject(def)) {
	    warn(
	      'Invalid default value for prop "' + key + '": ' +
	      'Props with type Object/Array must use a factory function ' +
	      'to return the default value.',
	      vm
	    );
	  }
	  // the raw prop value was also undefined from previous render,
	  // return previous default value to avoid unnecessary watcher trigger
	  if (vm && vm.$options.propsData &&
	    vm.$options.propsData[key] === undefined &&
	    vm._props[key] !== undefined) {
	    return vm._props[key]
	  }
	  // call factory function for non-Function types
	  // a value is Function if its prototype is function even across different execution context
	  return typeof def === 'function' && getType(prop.type) !== 'Function'
	    ? def.call(vm)
	    : def
	}

	/**
	 * Assert whether a prop is valid.
	 */
	function assertProp (
	  prop,
	  name,
	  value,
	  vm,
	  absent
	) {
	  if (prop.required && absent) {
	    warn(
	      'Missing required prop: "' + name + '"',
	      vm
	    );
	    return
	  }
	  if (value == null && !prop.required) {
	    return
	  }
	  var type = prop.type;
	  var valid = !type || type === true;
	  var expectedTypes = [];
	  if (type) {
	    if (!Array.isArray(type)) {
	      type = [type];
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType || '');
	      valid = assertedType.valid;
	    }
	  }
	  if (!valid) {
	    warn(
	      'Invalid prop: type check failed for prop "' + name + '".' +
	      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
	      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
	      vm
	    );
	    return
	  }
	  var validator = prop.validator;
	  if (validator) {
	    if (!validator(value)) {
	      warn(
	        'Invalid prop: custom validator check failed for prop "' + name + '".',
	        vm
	      );
	    }
	  }
	}

	/**
	 * Assert the type of a value
	 */
	function assertType (value, type) {
	  var valid;
	  var expectedType = getType(type);
	  if (expectedType === 'String') {
	    valid = typeof value === (expectedType = 'string');
	  } else if (expectedType === 'Number') {
	    valid = typeof value === (expectedType = 'number');
	  } else if (expectedType === 'Boolean') {
	    valid = typeof value === (expectedType = 'boolean');
	  } else if (expectedType === 'Function') {
	    valid = typeof value === (expectedType = 'function');
	  } else if (expectedType === 'Object') {
	    valid = isPlainObject(value);
	  } else if (expectedType === 'Array') {
	    valid = Array.isArray(value);
	  } else {
	    valid = value instanceof type;
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  }
	}

	/**
	 * Use function string name to check built-in types,
	 * because a simple equality check will fail when running
	 * across different vms / iframes.
	 */
	function getType (fn) {
	  var match = fn && fn.toString().match(/^\s*function (\w+)/);
	  return match && match[1]
	}

	function isType (type, fn) {
	  if (!Array.isArray(fn)) {
	    return getType(fn) === getType(type)
	  }
	  for (var i = 0, len = fn.length; i < len; i++) {
	    if (getType(fn[i]) === getType(type)) {
	      return true
	    }
	  }
	  /* istanbul ignore next */
	  return false
	}

	function handleError (err, vm, info) {
	  if (config.errorHandler) {
	    config.errorHandler.call(null, err, vm, info);
	  } else {
	    {
	      warn(("Error in " + info + ":"), vm);
	    }
	    /* istanbul ignore else */
	    if (inBrowser && typeof console !== 'undefined') {
	      console.error(err);
	    } else {
	      throw err
	    }
	  }
	}

	/* not type checking this file because flow doesn't play well with Proxy */

	var initProxy;

	{
	  var allowedGlobals = makeMap(
	    'Infinity,undefined,NaN,isFinite,isNaN,' +
	    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
	    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
	    'require' // for Webpack/Browserify
	  );

	  var warnNonPresent = function (target, key) {
	    warn(
	      "Property or method \"" + key + "\" is not defined on the instance but " +
	      "referenced during render. Make sure to declare reactive data " +
	      "properties in the data option.",
	      target
	    );
	  };

	  var hasProxy =
	    typeof Proxy !== 'undefined' &&
	    Proxy.toString().match(/native code/);

	  if (hasProxy) {
	    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
	    config.keyCodes = new Proxy(config.keyCodes, {
	      set: function set (target, key, value) {
	        if (isBuiltInModifier(key)) {
	          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
	          return false
	        } else {
	          target[key] = value;
	          return true
	        }
	      }
	    });
	  }

	  var hasHandler = {
	    has: function has (target, key) {
	      var has = key in target;
	      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
	      if (!has && !isAllowed) {
	        warnNonPresent(target, key);
	      }
	      return has || !isAllowed
	    }
	  };

	  var getHandler = {
	    get: function get (target, key) {
	      if (typeof key === 'string' && !(key in target)) {
	        warnNonPresent(target, key);
	      }
	      return target[key]
	    }
	  };

	  initProxy = function initProxy (vm) {
	    if (hasProxy) {
	      // determine which proxy handler to use
	      var options = vm.$options;
	      var handlers = options.render && options.render._withStripped
	        ? getHandler
	        : hasHandler;
	      vm._renderProxy = new Proxy(vm, handlers);
	    } else {
	      vm._renderProxy = vm;
	    }
	  };
	}

	var mark;
	var measure;

	{
	  var perf = inBrowser && window.performance;
	  /* istanbul ignore if */
	  if (
	    perf &&
	    perf.mark &&
	    perf.measure &&
	    perf.clearMarks &&
	    perf.clearMeasures
	  ) {
	    mark = function (tag) { return perf.mark(tag); };
	    measure = function (name, startTag, endTag) {
	      perf.measure(name, startTag, endTag);
	      perf.clearMarks(startTag);
	      perf.clearMarks(endTag);
	      perf.clearMeasures(name);
	    };
	  }
	}

	/*  */

	var VNode = function VNode (
	  tag,
	  data,
	  children,
	  text,
	  elm,
	  context,
	  componentOptions
	) {
	  this.tag = tag;
	  this.data = data;
	  this.children = children;
	  this.text = text;
	  this.elm = elm;
	  this.ns = undefined;
	  this.context = context;
	  this.functionalContext = undefined;
	  this.key = data && data.key;
	  this.componentOptions = componentOptions;
	  this.componentInstance = undefined;
	  this.parent = undefined;
	  this.raw = false;
	  this.isStatic = false;
	  this.isRootInsert = true;
	  this.isComment = false;
	  this.isCloned = false;
	  this.isOnce = false;
	};

	var prototypeAccessors = { child: {} };

	// DEPRECATED: alias for componentInstance for backwards compat.
	/* istanbul ignore next */
	prototypeAccessors.child.get = function () {
	  return this.componentInstance
	};

	Object.defineProperties( VNode.prototype, prototypeAccessors );

	var createEmptyVNode = function () {
	  var node = new VNode();
	  node.text = '';
	  node.isComment = true;
	  return node
	};

	function createTextVNode (val) {
	  return new VNode(undefined, undefined, undefined, String(val))
	}

	// optimized shallow clone
	// used for static nodes and slot nodes because they may be reused across
	// multiple renders, cloning them avoids errors when DOM manipulations rely
	// on their elm reference.
	function cloneVNode (vnode) {
	  var cloned = new VNode(
	    vnode.tag,
	    vnode.data,
	    vnode.children,
	    vnode.text,
	    vnode.elm,
	    vnode.context,
	    vnode.componentOptions
	  );
	  cloned.ns = vnode.ns;
	  cloned.isStatic = vnode.isStatic;
	  cloned.key = vnode.key;
	  cloned.isCloned = true;
	  return cloned
	}

	function cloneVNodes (vnodes) {
	  var len = vnodes.length;
	  var res = new Array(len);
	  for (var i = 0; i < len; i++) {
	    res[i] = cloneVNode(vnodes[i]);
	  }
	  return res
	}

	/*  */

	var normalizeEvent = cached(function (name) {
	  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
	  name = once$$1 ? name.slice(1) : name;
	  var capture = name.charAt(0) === '!';
	  name = capture ? name.slice(1) : name;
	  return {
	    name: name,
	    once: once$$1,
	    capture: capture
	  }
	});

	function createFnInvoker (fns) {
	  function invoker () {
	    var arguments$1 = arguments;

	    var fns = invoker.fns;
	    if (Array.isArray(fns)) {
	      for (var i = 0; i < fns.length; i++) {
	        fns[i].apply(null, arguments$1);
	      }
	    } else {
	      // return handler return value for single handlers
	      return fns.apply(null, arguments)
	    }
	  }
	  invoker.fns = fns;
	  return invoker
	}

	function updateListeners (
	  on,
	  oldOn,
	  add,
	  remove$$1,
	  vm
	) {
	  var name, cur, old, event;
	  for (name in on) {
	    cur = on[name];
	    old = oldOn[name];
	    event = normalizeEvent(name);
	    if (!cur) {
	      "development" !== 'production' && warn(
	        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
	        vm
	      );
	    } else if (!old) {
	      if (!cur.fns) {
	        cur = on[name] = createFnInvoker(cur);
	      }
	      add(event.name, cur, event.once, event.capture);
	    } else if (cur !== old) {
	      old.fns = cur;
	      on[name] = old;
	    }
	  }
	  for (name in oldOn) {
	    if (!on[name]) {
	      event = normalizeEvent(name);
	      remove$$1(event.name, oldOn[name], event.capture);
	    }
	  }
	}

	/*  */

	function mergeVNodeHook (def, hookKey, hook) {
	  var invoker;
	  var oldHook = def[hookKey];

	  function wrappedHook () {
	    hook.apply(this, arguments);
	    // important: remove merged hook to ensure it's called only once
	    // and prevent memory leak
	    remove(invoker.fns, wrappedHook);
	  }

	  if (!oldHook) {
	    // no existing hook
	    invoker = createFnInvoker([wrappedHook]);
	  } else {
	    /* istanbul ignore if */
	    if (oldHook.fns && oldHook.merged) {
	      // already a merged invoker
	      invoker = oldHook;
	      invoker.fns.push(wrappedHook);
	    } else {
	      // existing plain hook
	      invoker = createFnInvoker([oldHook, wrappedHook]);
	    }
	  }

	  invoker.merged = true;
	  def[hookKey] = invoker;
	}

	/*  */

	// The template compiler attempts to minimize the need for normalization by
	// statically analyzing the template at compile time.
	//
	// For plain HTML markup, normalization can be completely skipped because the
	// generated render function is guaranteed to return Array<VNode>. There are
	// two cases where extra normalization is needed:

	// 1. When the children contains components - because a functional component
	// may return an Array instead of a single root. In this case, just a simple
	// normalization is needed - if any child is an Array, we flatten the whole
	// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
	// because functional components already normalize their own children.
	function simpleNormalizeChildren (children) {
	  for (var i = 0; i < children.length; i++) {
	    if (Array.isArray(children[i])) {
	      return Array.prototype.concat.apply([], children)
	    }
	  }
	  return children
	}

	// 2. When the children contains constructs that always generated nested Arrays,
	// e.g. <template>, <slot>, v-for, or when the children is provided by user
	// with hand-written render functions / JSX. In such cases a full normalization
	// is needed to cater to all possible types of children values.
	function normalizeChildren (children) {
	  return isPrimitive(children)
	    ? [createTextVNode(children)]
	    : Array.isArray(children)
	      ? normalizeArrayChildren(children)
	      : undefined
	}

	function normalizeArrayChildren (children, nestedIndex) {
	  var res = [];
	  var i, c, last;
	  for (i = 0; i < children.length; i++) {
	    c = children[i];
	    if (c == null || typeof c === 'boolean') { continue }
	    last = res[res.length - 1];
	    //  nested
	    if (Array.isArray(c)) {
	      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
	    } else if (isPrimitive(c)) {
	      if (last && last.text) {
	        last.text += String(c);
	      } else if (c !== '') {
	        // convert primitive to vnode
	        res.push(createTextVNode(c));
	      }
	    } else {
	      if (c.text && last && last.text) {
	        res[res.length - 1] = createTextVNode(last.text + c.text);
	      } else {
	        // default key for nested array children (likely generated by v-for)
	        if (c.tag && c.key == null && nestedIndex != null) {
	          c.key = "__vlist" + nestedIndex + "_" + i + "__";
	        }
	        res.push(c);
	      }
	    }
	  }
	  return res
	}

	/*  */

	function getFirstComponentChild (children) {
	  return children && children.filter(function (c) { return c && c.componentOptions; })[0]
	}

	/*  */

	function initEvents (vm) {
	  vm._events = Object.create(null);
	  vm._hasHookEvent = false;
	  // init parent attached events
	  var listeners = vm.$options._parentListeners;
	  if (listeners) {
	    updateComponentListeners(vm, listeners);
	  }
	}

	var target;

	function add (event, fn, once$$1) {
	  if (once$$1) {
	    target.$once(event, fn);
	  } else {
	    target.$on(event, fn);
	  }
	}

	function remove$1 (event, fn) {
	  target.$off(event, fn);
	}

	function updateComponentListeners (
	  vm,
	  listeners,
	  oldListeners
	) {
	  target = vm;
	  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
	}

	function eventsMixin (Vue) {
	  var hookRE = /^hook:/;
	  Vue.prototype.$on = function (event, fn) {
	    var this$1 = this;

	    var vm = this;
	    if (Array.isArray(event)) {
	      for (var i = 0, l = event.length; i < l; i++) {
	        this$1.$on(event[i], fn);
	      }
	    } else {
	      (vm._events[event] || (vm._events[event] = [])).push(fn);
	      // optimize hook:event cost by using a boolean flag marked at registration
	      // instead of a hash lookup
	      if (hookRE.test(event)) {
	        vm._hasHookEvent = true;
	      }
	    }
	    return vm
	  };

	  Vue.prototype.$once = function (event, fn) {
	    var vm = this;
	    function on () {
	      vm.$off(event, on);
	      fn.apply(vm, arguments);
	    }
	    on.fn = fn;
	    vm.$on(event, on);
	    return vm
	  };

	  Vue.prototype.$off = function (event, fn) {
	    var this$1 = this;

	    var vm = this;
	    // all
	    if (!arguments.length) {
	      vm._events = Object.create(null);
	      return vm
	    }
	    // array of events
	    if (Array.isArray(event)) {
	      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
	        this$1.$off(event[i$1], fn);
	      }
	      return vm
	    }
	    // specific event
	    var cbs = vm._events[event];
	    if (!cbs) {
	      return vm
	    }
	    if (arguments.length === 1) {
	      vm._events[event] = null;
	      return vm
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        cbs.splice(i, 1);
	        break
	      }
	    }
	    return vm
	  };

	  Vue.prototype.$emit = function (event) {
	    var vm = this;
	    {
	      var lowerCaseEvent = event.toLowerCase();
	      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
	        tip(
	          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
	          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
	          "Note that HTML attributes are case-insensitive and you cannot use " +
	          "v-on to listen to camelCase events when using in-DOM templates. " +
	          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
	        );
	      }
	    }
	    var cbs = vm._events[event];
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        cbs[i].apply(vm, args);
	      }
	    }
	    return vm
	  };
	}

	/*  */

	/**
	 * Runtime helper for resolving raw children VNodes into a slot object.
	 */
	function resolveSlots (
	  children,
	  context
	) {
	  var slots = {};
	  if (!children) {
	    return slots
	  }
	  var defaultSlot = [];
	  var name, child;
	  for (var i = 0, l = children.length; i < l; i++) {
	    child = children[i];
	    // named slots should only be respected if the vnode was rendered in the
	    // same context.
	    if ((child.context === context || child.functionalContext === context) &&
	        child.data && (name = child.data.slot)) {
	      var slot = (slots[name] || (slots[name] = []));
	      if (child.tag === 'template') {
	        slot.push.apply(slot, child.children);
	      } else {
	        slot.push(child);
	      }
	    } else {
	      defaultSlot.push(child);
	    }
	  }
	  // ignore whitespace
	  if (!defaultSlot.every(isWhitespace)) {
	    slots.default = defaultSlot;
	  }
	  return slots
	}

	function isWhitespace (node) {
	  return node.isComment || node.text === ' '
	}

	function resolveScopedSlots (
	  fns
	) {
	  var res = {};
	  for (var i = 0; i < fns.length; i++) {
	    res[fns[i][0]] = fns[i][1];
	  }
	  return res
	}

	/*  */

	var activeInstance = null;

	function initLifecycle (vm) {
	  var options = vm.$options;

	  // locate first non-abstract parent
	  var parent = options.parent;
	  if (parent && !options.abstract) {
	    while (parent.$options.abstract && parent.$parent) {
	      parent = parent.$parent;
	    }
	    parent.$children.push(vm);
	  }

	  vm.$parent = parent;
	  vm.$root = parent ? parent.$root : vm;

	  vm.$children = [];
	  vm.$refs = {};

	  vm._watcher = null;
	  vm._inactive = null;
	  vm._directInactive = false;
	  vm._isMounted = false;
	  vm._isDestroyed = false;
	  vm._isBeingDestroyed = false;
	}

	function lifecycleMixin (Vue) {
	  Vue.prototype._update = function (vnode, hydrating) {
	    var vm = this;
	    if (vm._isMounted) {
	      callHook(vm, 'beforeUpdate');
	    }
	    var prevEl = vm.$el;
	    var prevVnode = vm._vnode;
	    var prevActiveInstance = activeInstance;
	    activeInstance = vm;
	    vm._vnode = vnode;
	    // Vue.prototype.__patch__ is injected in entry points
	    // based on the rendering backend used.
	    if (!prevVnode) {
	      // initial render
	      vm.$el = vm.__patch__(
	        vm.$el, vnode, hydrating, false /* removeOnly */,
	        vm.$options._parentElm,
	        vm.$options._refElm
	      );
	    } else {
	      // updates
	      vm.$el = vm.__patch__(prevVnode, vnode);
	    }
	    activeInstance = prevActiveInstance;
	    // update __vue__ reference
	    if (prevEl) {
	      prevEl.__vue__ = null;
	    }
	    if (vm.$el) {
	      vm.$el.__vue__ = vm;
	    }
	    // if parent is an HOC, update its $el as well
	    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
	      vm.$parent.$el = vm.$el;
	    }
	    // updated hook is called by the scheduler to ensure that children are
	    // updated in a parent's updated hook.
	  };

	  Vue.prototype.$forceUpdate = function () {
	    var vm = this;
	    if (vm._watcher) {
	      vm._watcher.update();
	    }
	  };

	  Vue.prototype.$destroy = function () {
	    var vm = this;
	    if (vm._isBeingDestroyed) {
	      return
	    }
	    callHook(vm, 'beforeDestroy');
	    vm._isBeingDestroyed = true;
	    // remove self from parent
	    var parent = vm.$parent;
	    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
	      remove(parent.$children, vm);
	    }
	    // teardown watchers
	    if (vm._watcher) {
	      vm._watcher.teardown();
	    }
	    var i = vm._watchers.length;
	    while (i--) {
	      vm._watchers[i].teardown();
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (vm._data.__ob__) {
	      vm._data.__ob__.vmCount--;
	    }
	    // call the last hook...
	    vm._isDestroyed = true;
	    // invoke destroy hooks on current rendered tree
	    vm.__patch__(vm._vnode, null);
	    // fire destroyed hook
	    callHook(vm, 'destroyed');
	    // turn off all instance listeners.
	    vm.$off();
	    // remove __vue__ reference
	    if (vm.$el) {
	      vm.$el.__vue__ = null;
	    }
	    // remove reference to DOM nodes (prevents leak)
	    vm.$options._parentElm = vm.$options._refElm = null;
	  };
	}

	function mountComponent (
	  vm,
	  el,
	  hydrating
	) {
	  vm.$el = el;
	  if (!vm.$options.render) {
	    vm.$options.render = createEmptyVNode;
	    {
	      /* istanbul ignore if */
	      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
	        vm.$options.el || el) {
	        warn(
	          'You are using the runtime-only build of Vue where the template ' +
	          'compiler is not available. Either pre-compile the templates into ' +
	          'render functions, or use the compiler-included build.',
	          vm
	        );
	      } else {
	        warn(
	          'Failed to mount component: template or render function not defined.',
	          vm
	        );
	      }
	    }
	  }
	  callHook(vm, 'beforeMount');

	  var updateComponent;
	  /* istanbul ignore if */
	  if ("development" !== 'production' && config.performance && mark) {
	    updateComponent = function () {
	      var name = vm._name;
	      var id = vm._uid;
	      var startTag = "vue-perf-start:" + id;
	      var endTag = "vue-perf-end:" + id;

	      mark(startTag);
	      var vnode = vm._render();
	      mark(endTag);
	      measure((name + " render"), startTag, endTag);

	      mark(startTag);
	      vm._update(vnode, hydrating);
	      mark(endTag);
	      measure((name + " patch"), startTag, endTag);
	    };
	  } else {
	    updateComponent = function () {
	      vm._update(vm._render(), hydrating);
	    };
	  }

	  vm._watcher = new Watcher(vm, updateComponent, noop);
	  hydrating = false;

	  // manually mounted instance, call mounted on self
	  // mounted is called for render-created child components in its inserted hook
	  if (vm.$vnode == null) {
	    vm._isMounted = true;
	    callHook(vm, 'mounted');
	  }
	  return vm
	}

	function updateChildComponent (
	  vm,
	  propsData,
	  listeners,
	  parentVnode,
	  renderChildren
	) {
	  // determine whether component has slot children
	  // we need to do this before overwriting $options._renderChildren
	  var hasChildren = !!(
	    renderChildren ||               // has new static slots
	    vm.$options._renderChildren ||  // has old static slots
	    parentVnode.data.scopedSlots || // has new scoped slots
	    vm.$scopedSlots !== emptyObject // has old scoped slots
	  );

	  vm.$options._parentVnode = parentVnode;
	  vm.$vnode = parentVnode; // update vm's placeholder node without re-render
	  if (vm._vnode) { // update child tree's parent
	    vm._vnode.parent = parentVnode;
	  }
	  vm.$options._renderChildren = renderChildren;

	  // update props
	  if (propsData && vm.$options.props) {
	    observerState.shouldConvert = false;
	    {
	      observerState.isSettingProps = true;
	    }
	    var props = vm._props;
	    var propKeys = vm.$options._propKeys || [];
	    for (var i = 0; i < propKeys.length; i++) {
	      var key = propKeys[i];
	      props[key] = validateProp(key, vm.$options.props, propsData, vm);
	    }
	    observerState.shouldConvert = true;
	    {
	      observerState.isSettingProps = false;
	    }
	    // keep a copy of raw propsData
	    vm.$options.propsData = propsData;
	  }
	  // update listeners
	  if (listeners) {
	    var oldListeners = vm.$options._parentListeners;
	    vm.$options._parentListeners = listeners;
	    updateComponentListeners(vm, listeners, oldListeners);
	  }
	  // resolve slots + force update if has children
	  if (hasChildren) {
	    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
	    vm.$forceUpdate();
	  }
	}

	function isInInactiveTree (vm) {
	  while (vm && (vm = vm.$parent)) {
	    if (vm._inactive) { return true }
	  }
	  return false
	}

	function activateChildComponent (vm, direct) {
	  if (direct) {
	    vm._directInactive = false;
	    if (isInInactiveTree(vm)) {
	      return
	    }
	  } else if (vm._directInactive) {
	    return
	  }
	  if (vm._inactive || vm._inactive == null) {
	    vm._inactive = false;
	    for (var i = 0; i < vm.$children.length; i++) {
	      activateChildComponent(vm.$children[i]);
	    }
	    callHook(vm, 'activated');
	  }
	}

	function deactivateChildComponent (vm, direct) {
	  if (direct) {
	    vm._directInactive = true;
	    if (isInInactiveTree(vm)) {
	      return
	    }
	  }
	  if (!vm._inactive) {
	    vm._inactive = true;
	    for (var i = 0; i < vm.$children.length; i++) {
	      deactivateChildComponent(vm.$children[i]);
	    }
	    callHook(vm, 'deactivated');
	  }
	}

	function callHook (vm, hook) {
	  var handlers = vm.$options[hook];
	  if (handlers) {
	    for (var i = 0, j = handlers.length; i < j; i++) {
	      try {
	        handlers[i].call(vm);
	      } catch (e) {
	        handleError(e, vm, (hook + " hook"));
	      }
	    }
	  }
	  if (vm._hasHookEvent) {
	    vm.$emit('hook:' + hook);
	  }
	}

	/*  */


	var queue = [];
	var has = {};
	var circular = {};
	var waiting = false;
	var flushing = false;
	var index = 0;

	/**
	 * Reset the scheduler's state.
	 */
	function resetSchedulerState () {
	  queue.length = 0;
	  has = {};
	  {
	    circular = {};
	  }
	  waiting = flushing = false;
	}

	/**
	 * Flush both queues and run the watchers.
	 */
	function flushSchedulerQueue () {
	  flushing = true;
	  var watcher, id, vm;

	  // Sort queue before flush.
	  // This ensures that:
	  // 1. Components are updated from parent to child. (because parent is always
	  //    created before the child)
	  // 2. A component's user watchers are run before its render watcher (because
	  //    user watchers are created before the render watcher)
	  // 3. If a component is destroyed during a parent component's watcher run,
	  //    its watchers can be skipped.
	  queue.sort(function (a, b) { return a.id - b.id; });

	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (index = 0; index < queue.length; index++) {
	    watcher = queue[index];
	    id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if ("development" !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        warn(
	          'You may have an infinite update loop ' + (
	            watcher.user
	              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
	              : "in a component render function."
	          ),
	          watcher.vm
	        );
	        break
	      }
	    }
	  }

	  // reset scheduler before updated hook called
	  var oldQueue = queue.slice();
	  resetSchedulerState();

	  // call updated hooks
	  index = oldQueue.length;
	  while (index--) {
	    watcher = oldQueue[index];
	    vm = watcher.vm;
	    if (vm._watcher === watcher && vm._isMounted) {
	      callHook(vm, 'updated');
	    }
	  }

	  // devtool hook
	  /* istanbul ignore if */
	  if (devtools && config.devtools) {
	    devtools.emit('flush');
	  }
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 */
	function queueWatcher (watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    has[id] = true;
	    if (!flushing) {
	      queue.push(watcher);
	    } else {
	      // if already flushing, splice the watcher based on its id
	      // if already past its id, it will be run next immediately.
	      var i = queue.length - 1;
	      while (i >= 0 && queue[i].id > watcher.id) {
	        i--;
	      }
	      queue.splice(Math.max(i, index) + 1, 0, watcher);
	    }
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushSchedulerQueue);
	    }
	  }
	}

	/*  */

	var uid$2 = 0;

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 */
	var Watcher = function Watcher (
	  vm,
	  expOrFn,
	  cb,
	  options
	) {
	  this.vm = vm;
	  vm._watchers.push(this);
	  // options
	  if (options) {
	    this.deep = !!options.deep;
	    this.user = !!options.user;
	    this.lazy = !!options.lazy;
	    this.sync = !!options.sync;
	  } else {
	    this.deep = this.user = this.lazy = this.sync = false;
	  }
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _Set();
	  this.newDepIds = new _Set();
	  this.expression = expOrFn.toString();
	  // parse expression for getter
	  if (typeof expOrFn === 'function') {
	    this.getter = expOrFn;
	  } else {
	    this.getter = parsePath(expOrFn);
	    if (!this.getter) {
	      this.getter = function () {};
	      "development" !== 'production' && warn(
	        "Failed watching path: \"" + expOrFn + "\" " +
	        'Watcher only accepts simple dot-delimited paths. ' +
	        'For full control, use a function instead.',
	        vm
	      );
	    }
	  }
	  this.value = this.lazy
	    ? undefined
	    : this.get();
	};

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	Watcher.prototype.get = function get () {
	  pushTarget(this);
	  var value;
	  var vm = this.vm;
	  if (this.user) {
	    try {
	      value = this.getter.call(vm, vm);
	    } catch (e) {
	      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
	    }
	  } else {
	    value = this.getter.call(vm, vm);
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  popTarget();
	  this.cleanupDeps();
	  return value
	};

	/**
	 * Add a dependency to this directive.
	 */
	Watcher.prototype.addDep = function addDep (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};

	/**
	 * Clean up for dependency collection.
	 */
	Watcher.prototype.cleanupDeps = function cleanupDeps () {
	    var this$1 = this;

	  var i = this.deps.length;
	  while (i--) {
	    var dep = this$1.deps[i];
	    if (!this$1.newDepIds.has(dep.id)) {
	      dep.removeSub(this$1);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 */
	Watcher.prototype.update = function update () {
	  /* istanbul ignore else */
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync) {
	    this.run();
	  } else {
	    queueWatcher(this);
	  }
	};

	/**
	 * Scheduler job interface.
	 * Will be called by the scheduler.
	 */
	Watcher.prototype.run = function run () {
	  if (this.active) {
	    var value = this.get();
	    if (
	      value !== this.value ||
	      // Deep watchers and watchers on Object/Arrays should fire even
	      // when the value is the same, because the value may
	      // have mutated.
	      isObject(value) ||
	      this.deep
	    ) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      if (this.user) {
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	  }
	};

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	Watcher.prototype.evaluate = function evaluate () {
	  this.value = this.get();
	  this.dirty = false;
	};

	/**
	 * Depend on all deps collected by this watcher.
	 */
	Watcher.prototype.depend = function depend () {
	    var this$1 = this;

	  var i = this.deps.length;
	  while (i--) {
	    this$1.deps[i].depend();
	  }
	};

	/**
	 * Remove self from all dependencies' subscriber list.
	 */
	Watcher.prototype.teardown = function teardown () {
	    var this$1 = this;

	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed.
	    if (!this.vm._isBeingDestroyed) {
	      remove(this.vm._watchers, this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this$1.deps[i].removeSub(this$1);
	    }
	    this.active = false;
	  }
	};

	/**
	 * Recursively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 */
	var seenObjects = new _Set();
	function traverse (val) {
	  seenObjects.clear();
	  _traverse(val, seenObjects);
	}

	function _traverse (val, seen) {
	  var i, keys;
	  var isA = Array.isArray(val);
	  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
	    return
	  }
	  if (val.__ob__) {
	    var depId = val.__ob__.dep.id;
	    if (seen.has(depId)) {
	      return
	    }
	    seen.add(depId);
	  }
	  if (isA) {
	    i = val.length;
	    while (i--) { _traverse(val[i], seen); }
	  } else {
	    keys = Object.keys(val);
	    i = keys.length;
	    while (i--) { _traverse(val[keys[i]], seen); }
	  }
	}

	/*  */

	var sharedPropertyDefinition = {
	  enumerable: true,
	  configurable: true,
	  get: noop,
	  set: noop
	};

	function proxy (target, sourceKey, key) {
	  sharedPropertyDefinition.get = function proxyGetter () {
	    return this[sourceKey][key]
	  };
	  sharedPropertyDefinition.set = function proxySetter (val) {
	    this[sourceKey][key] = val;
	  };
	  Object.defineProperty(target, key, sharedPropertyDefinition);
	}

	function initState (vm) {
	  vm._watchers = [];
	  var opts = vm.$options;
	  if (opts.props) { initProps(vm, opts.props); }
	  if (opts.methods) { initMethods(vm, opts.methods); }
	  if (opts.data) {
	    initData(vm);
	  } else {
	    observe(vm._data = {}, true /* asRootData */);
	  }
	  if (opts.computed) { initComputed(vm, opts.computed); }
	  if (opts.watch) { initWatch(vm, opts.watch); }
	}

	var isReservedProp = { key: 1, ref: 1, slot: 1 };

	function initProps (vm, propsOptions) {
	  var propsData = vm.$options.propsData || {};
	  var props = vm._props = {};
	  // cache prop keys so that future props updates can iterate using Array
	  // instead of dynamic object key enumeration.
	  var keys = vm.$options._propKeys = [];
	  var isRoot = !vm.$parent;
	  // root instance props should be converted
	  observerState.shouldConvert = isRoot;
	  var loop = function ( key ) {
	    keys.push(key);
	    var value = validateProp(key, propsOptions, propsData, vm);
	    /* istanbul ignore else */
	    {
	      if (isReservedProp[key]) {
	        warn(
	          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
	          vm
	        );
	      }
	      defineReactive$$1(props, key, value, function () {
	        if (vm.$parent && !observerState.isSettingProps) {
	          warn(
	            "Avoid mutating a prop directly since the value will be " +
	            "overwritten whenever the parent component re-renders. " +
	            "Instead, use a data or computed property based on the prop's " +
	            "value. Prop being mutated: \"" + key + "\"",
	            vm
	          );
	        }
	      });
	    }
	    // static props are already proxied on the component's prototype
	    // during Vue.extend(). We only need to proxy props defined at
	    // instantiation here.
	    if (!(key in vm)) {
	      proxy(vm, "_props", key);
	    }
	  };

	  for (var key in propsOptions) loop( key );
	  observerState.shouldConvert = true;
	}

	function initData (vm) {
	  var data = vm.$options.data;
	  data = vm._data = typeof data === 'function'
	    ? getData(data, vm)
	    : data || {};
	  if (!isPlainObject(data)) {
	    data = {};
	    "development" !== 'production' && warn(
	      'data functions should return an object:\n' +
	      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
	      vm
	    );
	  }
	  // proxy data on instance
	  var keys = Object.keys(data);
	  var props = vm.$options.props;
	  var i = keys.length;
	  while (i--) {
	    if (props && hasOwn(props, keys[i])) {
	      "development" !== 'production' && warn(
	        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
	        "Use prop default value instead.",
	        vm
	      );
	    } else if (!isReserved(keys[i])) {
	      proxy(vm, "_data", keys[i]);
	    }
	  }
	  // observe data
	  observe(data, true /* asRootData */);
	}

	function getData (data, vm) {
	  try {
	    return data.call(vm)
	  } catch (e) {
	    handleError(e, vm, "data()");
	    return {}
	  }
	}

	var computedWatcherOptions = { lazy: true };

	function initComputed (vm, computed) {
	  var watchers = vm._computedWatchers = Object.create(null);

	  for (var key in computed) {
	    var userDef = computed[key];
	    var getter = typeof userDef === 'function' ? userDef : userDef.get;
	    {
	      if (getter === undefined) {
	        warn(
	          ("No getter function has been defined for computed property \"" + key + "\"."),
	          vm
	        );
	        getter = noop;
	      }
	    }
	    // create internal watcher for the computed property.
	    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);

	    // component-defined computed properties are already defined on the
	    // component prototype. We only need to define computed properties defined
	    // at instantiation here.
	    if (!(key in vm)) {
	      defineComputed(vm, key, userDef);
	    }
	  }
	}

	function defineComputed (target, key, userDef) {
	  if (typeof userDef === 'function') {
	    sharedPropertyDefinition.get = createComputedGetter(key);
	    sharedPropertyDefinition.set = noop;
	  } else {
	    sharedPropertyDefinition.get = userDef.get
	      ? userDef.cache !== false
	        ? createComputedGetter(key)
	        : userDef.get
	      : noop;
	    sharedPropertyDefinition.set = userDef.set
	      ? userDef.set
	      : noop;
	  }
	  Object.defineProperty(target, key, sharedPropertyDefinition);
	}

	function createComputedGetter (key) {
	  return function computedGetter () {
	    var watcher = this._computedWatchers && this._computedWatchers[key];
	    if (watcher) {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value
	    }
	  }
	}

	function initMethods (vm, methods) {
	  var props = vm.$options.props;
	  for (var key in methods) {
	    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
	    {
	      if (methods[key] == null) {
	        warn(
	          "method \"" + key + "\" has an undefined value in the component definition. " +
	          "Did you reference the function correctly?",
	          vm
	        );
	      }
	      if (props && hasOwn(props, key)) {
	        warn(
	          ("method \"" + key + "\" has already been defined as a prop."),
	          vm
	        );
	      }
	    }
	  }
	}

	function initWatch (vm, watch) {
	  for (var key in watch) {
	    var handler = watch[key];
	    if (Array.isArray(handler)) {
	      for (var i = 0; i < handler.length; i++) {
	        createWatcher(vm, key, handler[i]);
	      }
	    } else {
	      createWatcher(vm, key, handler);
	    }
	  }
	}

	function createWatcher (vm, key, handler) {
	  var options;
	  if (isPlainObject(handler)) {
	    options = handler;
	    handler = handler.handler;
	  }
	  if (typeof handler === 'string') {
	    handler = vm[handler];
	  }
	  vm.$watch(key, handler, options);
	}

	function stateMixin (Vue) {
	  // flow somehow has problems with directly declared definition object
	  // when using Object.defineProperty, so we have to procedurally build up
	  // the object here.
	  var dataDef = {};
	  dataDef.get = function () { return this._data };
	  var propsDef = {};
	  propsDef.get = function () { return this._props };
	  {
	    dataDef.set = function (newData) {
	      warn(
	        'Avoid replacing instance root $data. ' +
	        'Use nested data properties instead.',
	        this
	      );
	    };
	    propsDef.set = function () {
	      warn("$props is readonly.", this);
	    };
	  }
	  Object.defineProperty(Vue.prototype, '$data', dataDef);
	  Object.defineProperty(Vue.prototype, '$props', propsDef);

	  Vue.prototype.$set = set;
	  Vue.prototype.$delete = del;

	  Vue.prototype.$watch = function (
	    expOrFn,
	    cb,
	    options
	  ) {
	    var vm = this;
	    options = options || {};
	    options.user = true;
	    var watcher = new Watcher(vm, expOrFn, cb, options);
	    if (options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn () {
	      watcher.teardown();
	    }
	  };
	}

	/*  */

	// hooks to be invoked on component VNodes during patch
	var componentVNodeHooks = {
	  init: function init (
	    vnode,
	    hydrating,
	    parentElm,
	    refElm
	  ) {
	    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
	      var child = vnode.componentInstance = createComponentInstanceForVnode(
	        vnode,
	        activeInstance,
	        parentElm,
	        refElm
	      );
	      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
	    } else if (vnode.data.keepAlive) {
	      // kept-alive components, treat as a patch
	      var mountedNode = vnode; // work around flow
	      componentVNodeHooks.prepatch(mountedNode, mountedNode);
	    }
	  },

	  prepatch: function prepatch (oldVnode, vnode) {
	    var options = vnode.componentOptions;
	    var child = vnode.componentInstance = oldVnode.componentInstance;
	    updateChildComponent(
	      child,
	      options.propsData, // updated props
	      options.listeners, // updated listeners
	      vnode, // new parent vnode
	      options.children // new children
	    );
	  },

	  insert: function insert (vnode) {
	    if (!vnode.componentInstance._isMounted) {
	      vnode.componentInstance._isMounted = true;
	      callHook(vnode.componentInstance, 'mounted');
	    }
	    if (vnode.data.keepAlive) {
	      activateChildComponent(vnode.componentInstance, true /* direct */);
	    }
	  },

	  destroy: function destroy (vnode) {
	    if (!vnode.componentInstance._isDestroyed) {
	      if (!vnode.data.keepAlive) {
	        vnode.componentInstance.$destroy();
	      } else {
	        deactivateChildComponent(vnode.componentInstance, true /* direct */);
	      }
	    }
	  }
	};

	var hooksToMerge = Object.keys(componentVNodeHooks);

	function createComponent (
	  Ctor,
	  data,
	  context,
	  children,
	  tag
	) {
	  if (!Ctor) {
	    return
	  }

	  var baseCtor = context.$options._base;
	  if (isObject(Ctor)) {
	    Ctor = baseCtor.extend(Ctor);
	  }

	  if (typeof Ctor !== 'function') {
	    {
	      warn(("Invalid Component definition: " + (String(Ctor))), context);
	    }
	    return
	  }

	  // async component
	  if (!Ctor.cid) {
	    if (Ctor.resolved) {
	      Ctor = Ctor.resolved;
	    } else {
	      Ctor = resolveAsyncComponent(Ctor, baseCtor, function () {
	        // it's ok to queue this on every render because
	        // $forceUpdate is buffered by the scheduler.
	        context.$forceUpdate();
	      });
	      if (!Ctor) {
	        // return nothing if this is indeed an async component
	        // wait for the callback to trigger parent update.
	        return
	      }
	    }
	  }

	  // resolve constructor options in case global mixins are applied after
	  // component constructor creation
	  resolveConstructorOptions(Ctor);

	  data = data || {};

	  // transform component v-model data into props & events
	  if (data.model) {
	    transformModel(Ctor.options, data);
	  }

	  // extract props
	  var propsData = extractProps(data, Ctor, tag);

	  // functional component
	  if (Ctor.options.functional) {
	    return createFunctionalComponent(Ctor, propsData, data, context, children)
	  }

	  // extract listeners, since these needs to be treated as
	  // child component listeners instead of DOM listeners
	  var listeners = data.on;
	  // replace with listeners with .native modifier
	  data.on = data.nativeOn;

	  if (Ctor.options.abstract) {
	    // abstract components do not keep anything
	    // other than props & listeners
	    data = {};
	  }

	  // merge component management hooks onto the placeholder node
	  mergeHooks(data);

	  // return a placeholder vnode
	  var name = Ctor.options.name || tag;
	  var vnode = new VNode(
	    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
	    data, undefined, undefined, undefined, context,
	    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
	  );
	  return vnode
	}

	function createFunctionalComponent (
	  Ctor,
	  propsData,
	  data,
	  context,
	  children
	) {
	  var props = {};
	  var propOptions = Ctor.options.props;
	  if (propOptions) {
	    for (var key in propOptions) {
	      props[key] = validateProp(key, propOptions, propsData);
	    }
	  }
	  // ensure the createElement function in functional components
	  // gets a unique context - this is necessary for correct named slot check
	  var _context = Object.create(context);
	  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
	  var vnode = Ctor.options.render.call(null, h, {
	    props: props,
	    data: data,
	    parent: context,
	    children: children,
	    slots: function () { return resolveSlots(children, context); }
	  });
	  if (vnode instanceof VNode) {
	    vnode.functionalContext = context;
	    if (data.slot) {
	      (vnode.data || (vnode.data = {})).slot = data.slot;
	    }
	  }
	  return vnode
	}

	function createComponentInstanceForVnode (
	  vnode, // we know it's MountedComponentVNode but flow doesn't
	  parent, // activeInstance in lifecycle state
	  parentElm,
	  refElm
	) {
	  var vnodeComponentOptions = vnode.componentOptions;
	  var options = {
	    _isComponent: true,
	    parent: parent,
	    propsData: vnodeComponentOptions.propsData,
	    _componentTag: vnodeComponentOptions.tag,
	    _parentVnode: vnode,
	    _parentListeners: vnodeComponentOptions.listeners,
	    _renderChildren: vnodeComponentOptions.children,
	    _parentElm: parentElm || null,
	    _refElm: refElm || null
	  };
	  // check inline-template render functions
	  var inlineTemplate = vnode.data.inlineTemplate;
	  if (inlineTemplate) {
	    options.render = inlineTemplate.render;
	    options.staticRenderFns = inlineTemplate.staticRenderFns;
	  }
	  return new vnodeComponentOptions.Ctor(options)
	}

	function resolveAsyncComponent (
	  factory,
	  baseCtor,
	  cb
	) {
	  if (factory.requested) {
	    // pool callbacks
	    factory.pendingCallbacks.push(cb);
	  } else {
	    factory.requested = true;
	    var cbs = factory.pendingCallbacks = [cb];
	    var sync = true;

	    var resolve = function (res) {
	      if (isObject(res)) {
	        res = baseCtor.extend(res);
	      }
	      // cache resolved
	      factory.resolved = res;
	      // invoke callbacks only if this is not a synchronous resolve
	      // (async resolves are shimmed as synchronous during SSR)
	      if (!sync) {
	        for (var i = 0, l = cbs.length; i < l; i++) {
	          cbs[i](res);
	        }
	      }
	    };

	    var reject = function (reason) {
	      "development" !== 'production' && warn(
	        "Failed to resolve async component: " + (String(factory)) +
	        (reason ? ("\nReason: " + reason) : '')
	      );
	    };

	    var res = factory(resolve, reject);

	    // handle promise
	    if (res && typeof res.then === 'function' && !factory.resolved) {
	      res.then(resolve, reject);
	    }

	    sync = false;
	    // return in case resolved synchronously
	    return factory.resolved
	  }
	}

	function extractProps (data, Ctor, tag) {
	  // we are only extracting raw values here.
	  // validation and default values are handled in the child
	  // component itself.
	  var propOptions = Ctor.options.props;
	  if (!propOptions) {
	    return
	  }
	  var res = {};
	  var attrs = data.attrs;
	  var props = data.props;
	  var domProps = data.domProps;
	  if (attrs || props || domProps) {
	    for (var key in propOptions) {
	      var altKey = hyphenate(key);
	      {
	        var keyInLowerCase = key.toLowerCase();
	        if (
	          key !== keyInLowerCase &&
	          attrs && attrs.hasOwnProperty(keyInLowerCase)
	        ) {
	          tip(
	            "Prop \"" + keyInLowerCase + "\" is passed to component " +
	            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
	            " \"" + key + "\". " +
	            "Note that HTML attributes are case-insensitive and camelCased " +
	            "props need to use their kebab-case equivalents when using in-DOM " +
	            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
	          );
	        }
	      }
	      checkProp(res, props, key, altKey, true) ||
	      checkProp(res, attrs, key, altKey) ||
	      checkProp(res, domProps, key, altKey);
	    }
	  }
	  return res
	}

	function checkProp (
	  res,
	  hash,
	  key,
	  altKey,
	  preserve
	) {
	  if (hash) {
	    if (hasOwn(hash, key)) {
	      res[key] = hash[key];
	      if (!preserve) {
	        delete hash[key];
	      }
	      return true
	    } else if (hasOwn(hash, altKey)) {
	      res[key] = hash[altKey];
	      if (!preserve) {
	        delete hash[altKey];
	      }
	      return true
	    }
	  }
	  return false
	}

	function mergeHooks (data) {
	  if (!data.hook) {
	    data.hook = {};
	  }
	  for (var i = 0; i < hooksToMerge.length; i++) {
	    var key = hooksToMerge[i];
	    var fromParent = data.hook[key];
	    var ours = componentVNodeHooks[key];
	    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
	  }
	}

	function mergeHook$1 (one, two) {
	  return function (a, b, c, d) {
	    one(a, b, c, d);
	    two(a, b, c, d);
	  }
	}

	// transform component v-model info (value and callback) into
	// prop and event handler respectively.
	function transformModel (options, data) {
	  var prop = (options.model && options.model.prop) || 'value';
	  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
	  var on = data.on || (data.on = {});
	  if (on[event]) {
	    on[event] = [data.model.callback].concat(on[event]);
	  } else {
	    on[event] = data.model.callback;
	  }
	}

	/*  */

	var SIMPLE_NORMALIZE = 1;
	var ALWAYS_NORMALIZE = 2;

	// wrapper function for providing a more flexible interface
	// without getting yelled at by flow
	function createElement (
	  context,
	  tag,
	  data,
	  children,
	  normalizationType,
	  alwaysNormalize
	) {
	  if (Array.isArray(data) || isPrimitive(data)) {
	    normalizationType = children;
	    children = data;
	    data = undefined;
	  }
	  if (alwaysNormalize) { normalizationType = ALWAYS_NORMALIZE; }
	  return _createElement(context, tag, data, children, normalizationType)
	}

	function _createElement (
	  context,
	  tag,
	  data,
	  children,
	  normalizationType
	) {
	  if (data && data.__ob__) {
	    "development" !== 'production' && warn(
	      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
	      'Always create fresh vnode data objects in each render!',
	      context
	    );
	    return createEmptyVNode()
	  }
	  if (!tag) {
	    // in case of component :is set to falsy value
	    return createEmptyVNode()
	  }
	  // support single function children as default scoped slot
	  if (Array.isArray(children) &&
	      typeof children[0] === 'function') {
	    data = data || {};
	    data.scopedSlots = { default: children[0] };
	    children.length = 0;
	  }
	  if (normalizationType === ALWAYS_NORMALIZE) {
	    children = normalizeChildren(children);
	  } else if (normalizationType === SIMPLE_NORMALIZE) {
	    children = simpleNormalizeChildren(children);
	  }
	  var vnode, ns;
	  if (typeof tag === 'string') {
	    var Ctor;
	    ns = config.getTagNamespace(tag);
	    if (config.isReservedTag(tag)) {
	      // platform built-in elements
	      vnode = new VNode(
	        config.parsePlatformTagName(tag), data, children,
	        undefined, undefined, context
	      );
	    } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
	      // component
	      vnode = createComponent(Ctor, data, context, children, tag);
	    } else {
	      // unknown or unlisted namespaced elements
	      // check at runtime because it may get assigned a namespace when its
	      // parent normalizes children
	      vnode = new VNode(
	        tag, data, children,
	        undefined, undefined, context
	      );
	    }
	  } else {
	    // direct component options / constructor
	    vnode = createComponent(tag, data, context, children);
	  }
	  if (vnode) {
	    if (ns) { applyNS(vnode, ns); }
	    return vnode
	  } else {
	    return createEmptyVNode()
	  }
	}

	function applyNS (vnode, ns) {
	  vnode.ns = ns;
	  if (vnode.tag === 'foreignObject') {
	    // use default namespace inside foreignObject
	    return
	  }
	  if (vnode.children) {
	    for (var i = 0, l = vnode.children.length; i < l; i++) {
	      var child = vnode.children[i];
	      if (child.tag && !child.ns) {
	        applyNS(child, ns);
	      }
	    }
	  }
	}

	/*  */

	/**
	 * Runtime helper for rendering v-for lists.
	 */
	function renderList (
	  val,
	  render
	) {
	  var ret, i, l, keys, key;
	  if (Array.isArray(val) || typeof val === 'string') {
	    ret = new Array(val.length);
	    for (i = 0, l = val.length; i < l; i++) {
	      ret[i] = render(val[i], i);
	    }
	  } else if (typeof val === 'number') {
	    ret = new Array(val);
	    for (i = 0; i < val; i++) {
	      ret[i] = render(i + 1, i);
	    }
	  } else if (isObject(val)) {
	    keys = Object.keys(val);
	    ret = new Array(keys.length);
	    for (i = 0, l = keys.length; i < l; i++) {
	      key = keys[i];
	      ret[i] = render(val[key], key, i);
	    }
	  }
	  return ret
	}

	/*  */

	/**
	 * Runtime helper for rendering <slot>
	 */
	function renderSlot (
	  name,
	  fallback,
	  props,
	  bindObject
	) {
	  var scopedSlotFn = this.$scopedSlots[name];
	  if (scopedSlotFn) { // scoped slot
	    props = props || {};
	    if (bindObject) {
	      extend(props, bindObject);
	    }
	    return scopedSlotFn(props) || fallback
	  } else {
	    var slotNodes = this.$slots[name];
	    // warn duplicate slot usage
	    if (slotNodes && "development" !== 'production') {
	      slotNodes._rendered && warn(
	        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
	        "- this will likely cause render errors.",
	        this
	      );
	      slotNodes._rendered = true;
	    }
	    return slotNodes || fallback
	  }
	}

	/*  */

	/**
	 * Runtime helper for resolving filters
	 */
	function resolveFilter (id) {
	  return resolveAsset(this.$options, 'filters', id, true) || identity
	}

	/*  */

	/**
	 * Runtime helper for checking keyCodes from config.
	 */
	function checkKeyCodes (
	  eventKeyCode,
	  key,
	  builtInAlias
	) {
	  var keyCodes = config.keyCodes[key] || builtInAlias;
	  if (Array.isArray(keyCodes)) {
	    return keyCodes.indexOf(eventKeyCode) === -1
	  } else {
	    return keyCodes !== eventKeyCode
	  }
	}

	/*  */

	/**
	 * Runtime helper for merging v-bind="object" into a VNode's data.
	 */
	function bindObjectProps (
	  data,
	  tag,
	  value,
	  asProp
	) {
	  if (value) {
	    if (!isObject(value)) {
	      "development" !== 'production' && warn(
	        'v-bind without argument expects an Object or Array value',
	        this
	      );
	    } else {
	      if (Array.isArray(value)) {
	        value = toObject(value);
	      }
	      var hash;
	      for (var key in value) {
	        if (key === 'class' || key === 'style') {
	          hash = data;
	        } else {
	          var type = data.attrs && data.attrs.type;
	          hash = asProp || config.mustUseProp(tag, type, key)
	            ? data.domProps || (data.domProps = {})
	            : data.attrs || (data.attrs = {});
	        }
	        if (!(key in hash)) {
	          hash[key] = value[key];
	        }
	      }
	    }
	  }
	  return data
	}

	/*  */

	/**
	 * Runtime helper for rendering static trees.
	 */
	function renderStatic (
	  index,
	  isInFor
	) {
	  var tree = this._staticTrees[index];
	  // if has already-rendered static tree and not inside v-for,
	  // we can reuse the same tree by doing a shallow clone.
	  if (tree && !isInFor) {
	    return Array.isArray(tree)
	      ? cloneVNodes(tree)
	      : cloneVNode(tree)
	  }
	  // otherwise, render a fresh tree.
	  tree = this._staticTrees[index] =
	    this.$options.staticRenderFns[index].call(this._renderProxy);
	  markStatic(tree, ("__static__" + index), false);
	  return tree
	}

	/**
	 * Runtime helper for v-once.
	 * Effectively it means marking the node as static with a unique key.
	 */
	function markOnce (
	  tree,
	  index,
	  key
	) {
	  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
	  return tree
	}

	function markStatic (
	  tree,
	  key,
	  isOnce
	) {
	  if (Array.isArray(tree)) {
	    for (var i = 0; i < tree.length; i++) {
	      if (tree[i] && typeof tree[i] !== 'string') {
	        markStaticNode(tree[i], (key + "_" + i), isOnce);
	      }
	    }
	  } else {
	    markStaticNode(tree, key, isOnce);
	  }
	}

	function markStaticNode (node, key, isOnce) {
	  node.isStatic = true;
	  node.key = key;
	  node.isOnce = isOnce;
	}

	/*  */

	function initRender (vm) {
	  vm.$vnode = null; // the placeholder node in parent tree
	  vm._vnode = null; // the root of the child tree
	  vm._staticTrees = null;
	  var parentVnode = vm.$options._parentVnode;
	  var renderContext = parentVnode && parentVnode.context;
	  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
	  vm.$scopedSlots = emptyObject;
	  // bind the createElement fn to this instance
	  // so that we get proper render context inside it.
	  // args order: tag, data, children, normalizationType, alwaysNormalize
	  // internal version is used by render functions compiled from templates
	  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
	  // normalization is always applied for the public version, used in
	  // user-written render functions.
	  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
	}

	function renderMixin (Vue) {
	  Vue.prototype.$nextTick = function (fn) {
	    return nextTick(fn, this)
	  };

	  Vue.prototype._render = function () {
	    var vm = this;
	    var ref = vm.$options;
	    var render = ref.render;
	    var staticRenderFns = ref.staticRenderFns;
	    var _parentVnode = ref._parentVnode;

	    if (vm._isMounted) {
	      // clone slot nodes on re-renders
	      for (var key in vm.$slots) {
	        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
	      }
	    }

	    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

	    if (staticRenderFns && !vm._staticTrees) {
	      vm._staticTrees = [];
	    }
	    // set parent vnode. this allows render functions to have access
	    // to the data on the placeholder node.
	    vm.$vnode = _parentVnode;
	    // render self
	    var vnode;
	    try {
	      vnode = render.call(vm._renderProxy, vm.$createElement);
	    } catch (e) {
	      handleError(e, vm, "render function");
	      // return error render result,
	      // or previous vnode to prevent render error causing blank component
	      /* istanbul ignore else */
	      {
	        vnode = vm.$options.renderError
	          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
	          : vm._vnode;
	      }
	    }
	    // return empty vnode in case the render function errored out
	    if (!(vnode instanceof VNode)) {
	      if ("development" !== 'production' && Array.isArray(vnode)) {
	        warn(
	          'Multiple root nodes returned from render function. Render function ' +
	          'should return a single root node.',
	          vm
	        );
	      }
	      vnode = createEmptyVNode();
	    }
	    // set parent
	    vnode.parent = _parentVnode;
	    return vnode
	  };

	  // internal render helpers.
	  // these are exposed on the instance prototype to reduce generated render
	  // code size.
	  Vue.prototype._o = markOnce;
	  Vue.prototype._n = toNumber;
	  Vue.prototype._s = _toString;
	  Vue.prototype._l = renderList;
	  Vue.prototype._t = renderSlot;
	  Vue.prototype._q = looseEqual;
	  Vue.prototype._i = looseIndexOf;
	  Vue.prototype._m = renderStatic;
	  Vue.prototype._f = resolveFilter;
	  Vue.prototype._k = checkKeyCodes;
	  Vue.prototype._b = bindObjectProps;
	  Vue.prototype._v = createTextVNode;
	  Vue.prototype._e = createEmptyVNode;
	  Vue.prototype._u = resolveScopedSlots;
	}

	/*  */

	function initProvide (vm) {
	  var provide = vm.$options.provide;
	  if (provide) {
	    vm._provided = typeof provide === 'function'
	      ? provide.call(vm)
	      : provide;
	  }
	}

	function initInjections (vm) {
	  var inject = vm.$options.inject;
	  if (inject) {
	    // inject is :any because flow is not smart enough to figure out cached
	    // isArray here
	    var isArray = Array.isArray(inject);
	    var keys = isArray
	      ? inject
	      : hasSymbol
	        ? Reflect.ownKeys(inject)
	        : Object.keys(inject);

	    var loop = function ( i ) {
	      var key = keys[i];
	      var provideKey = isArray ? key : inject[key];
	      var source = vm;
	      while (source) {
	        if (source._provided && provideKey in source._provided) {
	          /* istanbul ignore else */
	          {
	            defineReactive$$1(vm, key, source._provided[provideKey], function () {
	              warn(
	                "Avoid mutating an injected value directly since the changes will be " +
	                "overwritten whenever the provided component re-renders. " +
	                "injection being mutated: \"" + key + "\"",
	                vm
	              );
	            });
	          }
	          break
	        }
	        source = source.$parent;
	      }
	    };

	    for (var i = 0; i < keys.length; i++) loop( i );
	  }
	}

	/*  */

	var uid = 0;

	function initMixin (Vue) {
	  Vue.prototype._init = function (options) {
	    var vm = this;
	    // a uid
	    vm._uid = uid++;

	    var startTag, endTag;
	    /* istanbul ignore if */
	    if ("development" !== 'production' && config.performance && mark) {
	      startTag = "vue-perf-init:" + (vm._uid);
	      endTag = "vue-perf-end:" + (vm._uid);
	      mark(startTag);
	    }

	    // a flag to avoid this being observed
	    vm._isVue = true;
	    // merge options
	    if (options && options._isComponent) {
	      // optimize internal component instantiation
	      // since dynamic options merging is pretty slow, and none of the
	      // internal component options needs special treatment.
	      initInternalComponent(vm, options);
	    } else {
	      vm.$options = mergeOptions(
	        resolveConstructorOptions(vm.constructor),
	        options || {},
	        vm
	      );
	    }
	    /* istanbul ignore else */
	    {
	      initProxy(vm);
	    }
	    // expose real self
	    vm._self = vm;
	    initLifecycle(vm);
	    initEvents(vm);
	    initRender(vm);
	    callHook(vm, 'beforeCreate');
	    initInjections(vm); // resolve injections before data/props
	    initState(vm);
	    initProvide(vm); // resolve provide after data/props
	    callHook(vm, 'created');

	    /* istanbul ignore if */
	    if ("development" !== 'production' && config.performance && mark) {
	      vm._name = formatComponentName(vm, false);
	      mark(endTag);
	      measure(((vm._name) + " init"), startTag, endTag);
	    }

	    if (vm.$options.el) {
	      vm.$mount(vm.$options.el);
	    }
	  };
	}

	function initInternalComponent (vm, options) {
	  var opts = vm.$options = Object.create(vm.constructor.options);
	  // doing this because it's faster than dynamic enumeration.
	  opts.parent = options.parent;
	  opts.propsData = options.propsData;
	  opts._parentVnode = options._parentVnode;
	  opts._parentListeners = options._parentListeners;
	  opts._renderChildren = options._renderChildren;
	  opts._componentTag = options._componentTag;
	  opts._parentElm = options._parentElm;
	  opts._refElm = options._refElm;
	  if (options.render) {
	    opts.render = options.render;
	    opts.staticRenderFns = options.staticRenderFns;
	  }
	}

	function resolveConstructorOptions (Ctor) {
	  var options = Ctor.options;
	  if (Ctor.super) {
	    var superOptions = resolveConstructorOptions(Ctor.super);
	    var cachedSuperOptions = Ctor.superOptions;
	    if (superOptions !== cachedSuperOptions) {
	      // super option changed,
	      // need to resolve new options.
	      Ctor.superOptions = superOptions;
	      // check if there are any late-modified/attached options (#4976)
	      var modifiedOptions = resolveModifiedOptions(Ctor);
	      // update base extend options
	      if (modifiedOptions) {
	        extend(Ctor.extendOptions, modifiedOptions);
	      }
	      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
	      if (options.name) {
	        options.components[options.name] = Ctor;
	      }
	    }
	  }
	  return options
	}

	function resolveModifiedOptions (Ctor) {
	  var modified;
	  var latest = Ctor.options;
	  var sealed = Ctor.sealedOptions;
	  for (var key in latest) {
	    if (latest[key] !== sealed[key]) {
	      if (!modified) { modified = {}; }
	      modified[key] = dedupe(latest[key], sealed[key]);
	    }
	  }
	  return modified
	}

	function dedupe (latest, sealed) {
	  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
	  // between merges
	  if (Array.isArray(latest)) {
	    var res = [];
	    sealed = Array.isArray(sealed) ? sealed : [sealed];
	    for (var i = 0; i < latest.length; i++) {
	      if (sealed.indexOf(latest[i]) < 0) {
	        res.push(latest[i]);
	      }
	    }
	    return res
	  } else {
	    return latest
	  }
	}

	function Vue$3 (options) {
	  if ("development" !== 'production' &&
	    !(this instanceof Vue$3)) {
	    warn('Vue is a constructor and should be called with the `new` keyword');
	  }
	  this._init(options);
	}

	initMixin(Vue$3);
	stateMixin(Vue$3);
	eventsMixin(Vue$3);
	lifecycleMixin(Vue$3);
	renderMixin(Vue$3);

	/*  */

	function initUse (Vue) {
	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else if (typeof plugin === 'function') {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this
	  };
	}

	/*  */

	function initMixin$1 (Vue) {
	  Vue.mixin = function (mixin) {
	    this.options = mergeOptions(this.options, mixin);
	  };
	}

	/*  */

	function initExtend (Vue) {
	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */
	  Vue.cid = 0;
	  var cid = 1;

	  /**
	   * Class inheritance
	   */
	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var SuperId = Super.cid;
	    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
	    if (cachedCtors[SuperId]) {
	      return cachedCtors[SuperId]
	    }

	    var name = extendOptions.name || Super.options.name;
	    {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn(
	          'Invalid component name: "' + name + '". Component names ' +
	          'can only contain alphanumeric characters and the hyphen, ' +
	          'and must start with a letter.'
	        );
	      }
	    }

	    var Sub = function VueComponent (options) {
	      this._init(options);
	    };
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(
	      Super.options,
	      extendOptions
	    );
	    Sub['super'] = Super;

	    // For props and computed properties, we define the proxy getters on
	    // the Vue instances at extension time, on the extended prototype. This
	    // avoids Object.defineProperty calls for each instance created.
	    if (Sub.options.props) {
	      initProps$1(Sub);
	    }
	    if (Sub.options.computed) {
	      initComputed$1(Sub);
	    }

	    // allow further extension/mixin/plugin usage
	    Sub.extend = Super.extend;
	    Sub.mixin = Super.mixin;
	    Sub.use = Super.use;

	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }

	    // keep a reference to the super options at extension time.
	    // later at instantiation we can check if Super's options have
	    // been updated.
	    Sub.superOptions = Super.options;
	    Sub.extendOptions = extendOptions;
	    Sub.sealedOptions = extend({}, Sub.options);

	    // cache constructor
	    cachedCtors[SuperId] = Sub;
	    return Sub
	  };
	}

	function initProps$1 (Comp) {
	  var props = Comp.options.props;
	  for (var key in props) {
	    proxy(Comp.prototype, "_props", key);
	  }
	}

	function initComputed$1 (Comp) {
	  var computed = Comp.options.computed;
	  for (var key in computed) {
	    defineComputed(Comp.prototype, key, computed[key]);
	  }
	}

	/*  */

	function initAssetRegisters (Vue) {
	  /**
	   * Create asset registration methods.
	   */
	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (
	      id,
	      definition
	    ) {
	      if (!definition) {
	        return this.options[type + 's'][id]
	      } else {
	        /* istanbul ignore if */
	        {
	          if (type === 'component' && config.isReservedTag(id)) {
	            warn(
	              'Do not use built-in or reserved HTML elements as component ' +
	              'id: ' + id
	            );
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = definition.name || id;
	          definition = this.options._base.extend(definition);
	        }
	        if (type === 'directive' && typeof definition === 'function') {
	          definition = { bind: definition, update: definition };
	        }
	        this.options[type + 's'][id] = definition;
	        return definition
	      }
	    };
	  });
	}

	/*  */

	var patternTypes = [String, RegExp];

	function getComponentName (opts) {
	  return opts && (opts.Ctor.options.name || opts.tag)
	}

	function matches (pattern, name) {
	  if (typeof pattern === 'string') {
	    return pattern.split(',').indexOf(name) > -1
	  } else if (pattern instanceof RegExp) {
	    return pattern.test(name)
	  }
	  /* istanbul ignore next */
	  return false
	}

	function pruneCache (cache, filter) {
	  for (var key in cache) {
	    var cachedNode = cache[key];
	    if (cachedNode) {
	      var name = getComponentName(cachedNode.componentOptions);
	      if (name && !filter(name)) {
	        pruneCacheEntry(cachedNode);
	        cache[key] = null;
	      }
	    }
	  }
	}

	function pruneCacheEntry (vnode) {
	  if (vnode) {
	    if (!vnode.componentInstance._inactive) {
	      callHook(vnode.componentInstance, 'deactivated');
	    }
	    vnode.componentInstance.$destroy();
	  }
	}

	var KeepAlive = {
	  name: 'keep-alive',
	  abstract: true,

	  props: {
	    include: patternTypes,
	    exclude: patternTypes
	  },

	  created: function created () {
	    this.cache = Object.create(null);
	  },

	  destroyed: function destroyed () {
	    var this$1 = this;

	    for (var key in this$1.cache) {
	      pruneCacheEntry(this$1.cache[key]);
	    }
	  },

	  watch: {
	    include: function include (val) {
	      pruneCache(this.cache, function (name) { return matches(val, name); });
	    },
	    exclude: function exclude (val) {
	      pruneCache(this.cache, function (name) { return !matches(val, name); });
	    }
	  },

	  render: function render () {
	    var vnode = getFirstComponentChild(this.$slots.default);
	    var componentOptions = vnode && vnode.componentOptions;
	    if (componentOptions) {
	      // check pattern
	      var name = getComponentName(componentOptions);
	      if (name && (
	        (this.include && !matches(this.include, name)) ||
	        (this.exclude && matches(this.exclude, name))
	      )) {
	        return vnode
	      }
	      var key = vnode.key == null
	        // same constructor may get registered as different local components
	        // so cid alone is not enough (#3269)
	        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
	        : vnode.key;
	      if (this.cache[key]) {
	        vnode.componentInstance = this.cache[key].componentInstance;
	      } else {
	        this.cache[key] = vnode;
	      }
	      vnode.data.keepAlive = true;
	    }
	    return vnode
	  }
	};

	var builtInComponents = {
	  KeepAlive: KeepAlive
	};

	/*  */

	function initGlobalAPI (Vue) {
	  // config
	  var configDef = {};
	  configDef.get = function () { return config; };
	  {
	    configDef.set = function () {
	      warn(
	        'Do not replace the Vue.config object, set individual fields instead.'
	      );
	    };
	  }
	  Object.defineProperty(Vue, 'config', configDef);

	  // exposed util methods.
	  // NOTE: these are not considered part of the public API - avoid relying on
	  // them unless you are aware of the risk.
	  Vue.util = {
	    warn: warn,
	    extend: extend,
	    mergeOptions: mergeOptions,
	    defineReactive: defineReactive$$1
	  };

	  Vue.set = set;
	  Vue.delete = del;
	  Vue.nextTick = nextTick;

	  Vue.options = Object.create(null);
	  config._assetTypes.forEach(function (type) {
	    Vue.options[type + 's'] = Object.create(null);
	  });

	  // this is used to identify the "base" constructor to extend all plain-object
	  // components with in Weex's multi-instance scenarios.
	  Vue.options._base = Vue;

	  extend(Vue.options.components, builtInComponents);

	  initUse(Vue);
	  initMixin$1(Vue);
	  initExtend(Vue);
	  initAssetRegisters(Vue);
	}

	initGlobalAPI(Vue$3);

	Object.defineProperty(Vue$3.prototype, '$isServer', {
	  get: isServerRendering
	});

	Vue$3.version = '2.2.6';

	/*  */

	// attributes that should be using props for binding
	var acceptValue = makeMap('input,textarea,option,select');
	var mustUseProp = function (tag, type, attr) {
	  return (
	    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
	    (attr === 'selected' && tag === 'option') ||
	    (attr === 'checked' && tag === 'input') ||
	    (attr === 'muted' && tag === 'video')
	  )
	};

	var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

	var isBooleanAttr = makeMap(
	  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
	  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
	  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
	  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
	  'required,reversed,scoped,seamless,selected,sortable,translate,' +
	  'truespeed,typemustmatch,visible'
	);

	var xlinkNS = 'http://www.w3.org/1999/xlink';

	var isXlink = function (name) {
	  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
	};

	var getXlinkProp = function (name) {
	  return isXlink(name) ? name.slice(6, name.length) : ''
	};

	var isFalsyAttrValue = function (val) {
	  return val == null || val === false
	};

	/*  */

	function genClassForVnode (vnode) {
	  var data = vnode.data;
	  var parentNode = vnode;
	  var childNode = vnode;
	  while (childNode.componentInstance) {
	    childNode = childNode.componentInstance._vnode;
	    if (childNode.data) {
	      data = mergeClassData(childNode.data, data);
	    }
	  }
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data) {
	      data = mergeClassData(data, parentNode.data);
	    }
	  }
	  return genClassFromData(data)
	}

	function mergeClassData (child, parent) {
	  return {
	    staticClass: concat(child.staticClass, parent.staticClass),
	    class: child.class
	      ? [child.class, parent.class]
	      : parent.class
	  }
	}

	function genClassFromData (data) {
	  var dynamicClass = data.class;
	  var staticClass = data.staticClass;
	  if (staticClass || dynamicClass) {
	    return concat(staticClass, stringifyClass(dynamicClass))
	  }
	  /* istanbul ignore next */
	  return ''
	}

	function concat (a, b) {
	  return a ? b ? (a + ' ' + b) : a : (b || '')
	}

	function stringifyClass (value) {
	  var res = '';
	  if (!value) {
	    return res
	  }
	  if (typeof value === 'string') {
	    return value
	  }
	  if (Array.isArray(value)) {
	    var stringified;
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (value[i]) {
	        if ((stringified = stringifyClass(value[i]))) {
	          res += stringified + ' ';
	        }
	      }
	    }
	    return res.slice(0, -1)
	  }
	  if (isObject(value)) {
	    for (var key in value) {
	      if (value[key]) { res += key + ' '; }
	    }
	    return res.slice(0, -1)
	  }
	  /* istanbul ignore next */
	  return res
	}

	/*  */

	var namespaceMap = {
	  svg: 'http://www.w3.org/2000/svg',
	  math: 'http://www.w3.org/1998/Math/MathML'
	};

	var isHTMLTag = makeMap(
	  'html,body,base,head,link,meta,style,title,' +
	  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
	  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
	  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
	  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
	  'embed,object,param,source,canvas,script,noscript,del,ins,' +
	  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
	  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
	  'output,progress,select,textarea,' +
	  'details,dialog,menu,menuitem,summary,' +
	  'content,element,shadow,template'
	);

	// this map is intentionally selective, only covering SVG elements that may
	// contain child elements.
	var isSVG = makeMap(
	  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
	  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
	  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
	  true
	);

	var isPreTag = function (tag) { return tag === 'pre'; };

	var isReservedTag = function (tag) {
	  return isHTMLTag(tag) || isSVG(tag)
	};

	function getTagNamespace (tag) {
	  if (isSVG(tag)) {
	    return 'svg'
	  }
	  // basic support for MathML
	  // note it doesn't support other MathML elements being component roots
	  if (tag === 'math') {
	    return 'math'
	  }
	}

	var unknownElementCache = Object.create(null);
	function isUnknownElement (tag) {
	  /* istanbul ignore if */
	  if (!inBrowser) {
	    return true
	  }
	  if (isReservedTag(tag)) {
	    return false
	  }
	  tag = tag.toLowerCase();
	  /* istanbul ignore if */
	  if (unknownElementCache[tag] != null) {
	    return unknownElementCache[tag]
	  }
	  var el = document.createElement(tag);
	  if (tag.indexOf('-') > -1) {
	    // http://stackoverflow.com/a/28210364/1070244
	    return (unknownElementCache[tag] = (
	      el.constructor === window.HTMLUnknownElement ||
	      el.constructor === window.HTMLElement
	    ))
	  } else {
	    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
	  }
	}

	/*  */

	/**
	 * Query an element selector if it's not an element already.
	 */
	function query (el) {
	  if (typeof el === 'string') {
	    var selected = document.querySelector(el);
	    if (!selected) {
	      "development" !== 'production' && warn(
	        'Cannot find element: ' + el
	      );
	      return document.createElement('div')
	    }
	    return selected
	  } else {
	    return el
	  }
	}

	/*  */

	function createElement$1 (tagName, vnode) {
	  var elm = document.createElement(tagName);
	  if (tagName !== 'select') {
	    return elm
	  }
	  // false or null will remove the attribute but undefined will not
	  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
	    elm.setAttribute('multiple', 'multiple');
	  }
	  return elm
	}

	function createElementNS (namespace, tagName) {
	  return document.createElementNS(namespaceMap[namespace], tagName)
	}

	function createTextNode (text) {
	  return document.createTextNode(text)
	}

	function createComment (text) {
	  return document.createComment(text)
	}

	function insertBefore (parentNode, newNode, referenceNode) {
	  parentNode.insertBefore(newNode, referenceNode);
	}

	function removeChild (node, child) {
	  node.removeChild(child);
	}

	function appendChild (node, child) {
	  node.appendChild(child);
	}

	function parentNode (node) {
	  return node.parentNode
	}

	function nextSibling (node) {
	  return node.nextSibling
	}

	function tagName (node) {
	  return node.tagName
	}

	function setTextContent (node, text) {
	  node.textContent = text;
	}

	function setAttribute (node, key, val) {
	  node.setAttribute(key, val);
	}


	var nodeOps = Object.freeze({
		createElement: createElement$1,
		createElementNS: createElementNS,
		createTextNode: createTextNode,
		createComment: createComment,
		insertBefore: insertBefore,
		removeChild: removeChild,
		appendChild: appendChild,
		parentNode: parentNode,
		nextSibling: nextSibling,
		tagName: tagName,
		setTextContent: setTextContent,
		setAttribute: setAttribute
	});

	/*  */

	var ref = {
	  create: function create (_, vnode) {
	    registerRef(vnode);
	  },
	  update: function update (oldVnode, vnode) {
	    if (oldVnode.data.ref !== vnode.data.ref) {
	      registerRef(oldVnode, true);
	      registerRef(vnode);
	    }
	  },
	  destroy: function destroy (vnode) {
	    registerRef(vnode, true);
	  }
	};

	function registerRef (vnode, isRemoval) {
	  var key = vnode.data.ref;
	  if (!key) { return }

	  var vm = vnode.context;
	  var ref = vnode.componentInstance || vnode.elm;
	  var refs = vm.$refs;
	  if (isRemoval) {
	    if (Array.isArray(refs[key])) {
	      remove(refs[key], ref);
	    } else if (refs[key] === ref) {
	      refs[key] = undefined;
	    }
	  } else {
	    if (vnode.data.refInFor) {
	      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
	        refs[key].push(ref);
	      } else {
	        refs[key] = [ref];
	      }
	    } else {
	      refs[key] = ref;
	    }
	  }
	}

	/**
	 * Virtual DOM patching algorithm based on Snabbdom by
	 * Simon Friis Vindum (@paldepind)
	 * Licensed under the MIT License
	 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
	 *
	 * modified by Evan You (@yyx990803)
	 *

	/*
	 * Not type-checking this because this file is perf-critical and the cost
	 * of making flow understand it is not worth it.
	 */

	var emptyNode = new VNode('', {}, []);

	var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

	function isUndef (v) {
	  return v === undefined || v === null
	}

	function isDef (v) {
	  return v !== undefined && v !== null
	}

	function isTrue (v) {
	  return v === true
	}

	function sameVnode (a, b) {
	  return (
	    a.key === b.key &&
	    a.tag === b.tag &&
	    a.isComment === b.isComment &&
	    isDef(a.data) === isDef(b.data) &&
	    sameInputType(a, b)
	  )
	}

	// Some browsers do not support dynamically changing type for <input>
	// so they need to be treated as different nodes
	function sameInputType (a, b) {
	  if (a.tag !== 'input') { return true }
	  var i;
	  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
	  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
	  return typeA === typeB
	}

	function createKeyToOldIdx (children, beginIdx, endIdx) {
	  var i, key;
	  var map = {};
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key;
	    if (isDef(key)) { map[key] = i; }
	  }
	  return map
	}

	function createPatchFunction (backend) {
	  var i, j;
	  var cbs = {};

	  var modules = backend.modules;
	  var nodeOps = backend.nodeOps;

	  for (i = 0; i < hooks.length; ++i) {
	    cbs[hooks[i]] = [];
	    for (j = 0; j < modules.length; ++j) {
	      if (isDef(modules[j][hooks[i]])) {
	        cbs[hooks[i]].push(modules[j][hooks[i]]);
	      }
	    }
	  }

	  function emptyNodeAt (elm) {
	    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
	  }

	  function createRmCb (childElm, listeners) {
	    function remove$$1 () {
	      if (--remove$$1.listeners === 0) {
	        removeNode(childElm);
	      }
	    }
	    remove$$1.listeners = listeners;
	    return remove$$1
	  }

	  function removeNode (el) {
	    var parent = nodeOps.parentNode(el);
	    // element may have already been removed due to v-html / v-text
	    if (isDef(parent)) {
	      nodeOps.removeChild(parent, el);
	    }
	  }

	  var inPre = 0;
	  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
	    vnode.isRootInsert = !nested; // for transition enter check
	    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
	      return
	    }

	    var data = vnode.data;
	    var children = vnode.children;
	    var tag = vnode.tag;
	    if (isDef(tag)) {
	      {
	        if (data && data.pre) {
	          inPre++;
	        }
	        if (
	          !inPre &&
	          !vnode.ns &&
	          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
	          config.isUnknownElement(tag)
	        ) {
	          warn(
	            'Unknown custom element: <' + tag + '> - did you ' +
	            'register the component correctly? For recursive components, ' +
	            'make sure to provide the "name" option.',
	            vnode.context
	          );
	        }
	      }
	      vnode.elm = vnode.ns
	        ? nodeOps.createElementNS(vnode.ns, tag)
	        : nodeOps.createElement(tag, vnode);
	      setScope(vnode);

	      /* istanbul ignore if */
	      {
	        createChildren(vnode, children, insertedVnodeQueue);
	        if (isDef(data)) {
	          invokeCreateHooks(vnode, insertedVnodeQueue);
	        }
	        insert(parentElm, vnode.elm, refElm);
	      }

	      if ("development" !== 'production' && data && data.pre) {
	        inPre--;
	      }
	    } else if (isTrue(vnode.isComment)) {
	      vnode.elm = nodeOps.createComment(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    } else {
	      vnode.elm = nodeOps.createTextNode(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    }
	  }

	  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i = vnode.data;
	    if (isDef(i)) {
	      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
	      if (isDef(i = i.hook) && isDef(i = i.init)) {
	        i(vnode, false /* hydrating */, parentElm, refElm);
	      }
	      // after calling the init hook, if the vnode is a child component
	      // it should've created a child instance and mounted it. the child
	      // component also has set the placeholder vnode's elm.
	      // in that case we can just return the element and be done.
	      if (isDef(vnode.componentInstance)) {
	        initComponent(vnode, insertedVnodeQueue);
	        if (isTrue(isReactivated)) {
	          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
	        }
	        return true
	      }
	    }
	  }

	  function initComponent (vnode, insertedVnodeQueue) {
	    if (isDef(vnode.data.pendingInsert)) {
	      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
	    }
	    vnode.elm = vnode.componentInstance.$el;
	    if (isPatchable(vnode)) {
	      invokeCreateHooks(vnode, insertedVnodeQueue);
	      setScope(vnode);
	    } else {
	      // empty component root.
	      // skip all element-related modules except for ref (#3455)
	      registerRef(vnode);
	      // make sure to invoke the insert hook
	      insertedVnodeQueue.push(vnode);
	    }
	  }

	  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i;
	    // hack for #4339: a reactivated component with inner transition
	    // does not trigger because the inner node's created hooks are not called
	    // again. It's not ideal to involve module-specific logic in here but
	    // there doesn't seem to be a better way to do it.
	    var innerNode = vnode;
	    while (innerNode.componentInstance) {
	      innerNode = innerNode.componentInstance._vnode;
	      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
	        for (i = 0; i < cbs.activate.length; ++i) {
	          cbs.activate[i](emptyNode, innerNode);
	        }
	        insertedVnodeQueue.push(innerNode);
	        break
	      }
	    }
	    // unlike a newly created component,
	    // a reactivated keep-alive component doesn't insert itself
	    insert(parentElm, vnode.elm, refElm);
	  }

	  function insert (parent, elm, ref) {
	    if (isDef(parent)) {
	      if (isDef(ref)) {
	        nodeOps.insertBefore(parent, elm, ref);
	      } else {
	        nodeOps.appendChild(parent, elm);
	      }
	    }
	  }

	  function createChildren (vnode, children, insertedVnodeQueue) {
	    if (Array.isArray(children)) {
	      for (var i = 0; i < children.length; ++i) {
	        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
	      }
	    } else if (isPrimitive(vnode.text)) {
	      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
	    }
	  }

	  function isPatchable (vnode) {
	    while (vnode.componentInstance) {
	      vnode = vnode.componentInstance._vnode;
	    }
	    return isDef(vnode.tag)
	  }

	  function invokeCreateHooks (vnode, insertedVnodeQueue) {
	    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
	      cbs.create[i$1](emptyNode, vnode);
	    }
	    i = vnode.data.hook; // Reuse variable
	    if (isDef(i)) {
	      if (isDef(i.create)) { i.create(emptyNode, vnode); }
	      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
	    }
	  }

	  // set scope id attribute for scoped CSS.
	  // this is implemented as a special case to avoid the overhead
	  // of going through the normal attribute patching process.
	  function setScope (vnode) {
	    var i;
	    var ancestor = vnode;
	    while (ancestor) {
	      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
	        nodeOps.setAttribute(vnode.elm, i, '');
	      }
	      ancestor = ancestor.parent;
	    }
	    // for slot content they should also get the scopeId from the host instance.
	    if (isDef(i = activeInstance) &&
	        i !== vnode.context &&
	        isDef(i = i.$options._scopeId)) {
	      nodeOps.setAttribute(vnode.elm, i, '');
	    }
	  }

	  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
	    }
	  }

	  function invokeDestroyHook (vnode) {
	    var i, j;
	    var data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
	      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
	    }
	    if (isDef(i = vnode.children)) {
	      for (j = 0; j < vnode.children.length; ++j) {
	        invokeDestroyHook(vnode.children[j]);
	      }
	    }
	  }

	  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var ch = vnodes[startIdx];
	      if (isDef(ch)) {
	        if (isDef(ch.tag)) {
	          removeAndInvokeRemoveHook(ch);
	          invokeDestroyHook(ch);
	        } else { // Text node
	          removeNode(ch.elm);
	        }
	      }
	    }
	  }

	  function removeAndInvokeRemoveHook (vnode, rm) {
	    if (isDef(rm) || isDef(vnode.data)) {
	      var listeners = cbs.remove.length + 1;
	      if (isDef(rm)) {
	        // we have a recursively passed down rm callback
	        // increase the listeners count
	        rm.listeners += listeners;
	      } else {
	        // directly removing
	        rm = createRmCb(vnode.elm, listeners);
	      }
	      // recursively invoke hooks on child component root node
	      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
	        removeAndInvokeRemoveHook(i, rm);
	      }
	      for (i = 0; i < cbs.remove.length; ++i) {
	        cbs.remove[i](vnode, rm);
	      }
	      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
	        i(vnode, rm);
	      } else {
	        rm();
	      }
	    } else {
	      removeNode(vnode.elm);
	    }
	  }

	  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
	    var oldStartIdx = 0;
	    var newStartIdx = 0;
	    var oldEndIdx = oldCh.length - 1;
	    var oldStartVnode = oldCh[0];
	    var oldEndVnode = oldCh[oldEndIdx];
	    var newEndIdx = newCh.length - 1;
	    var newStartVnode = newCh[0];
	    var newEndVnode = newCh[newEndIdx];
	    var oldKeyToIdx, idxInOld, elmToMove, refElm;

	    // removeOnly is a special flag used only by <transition-group>
	    // to ensure removed elements stay in correct relative positions
	    // during leaving transitions
	    var canMove = !removeOnly;

	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	        oldEndVnode = oldCh[--oldEndIdx];
	      } else if (sameVnode(oldStartVnode, newStartVnode)) {
	        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	        oldStartVnode = oldCh[++oldStartIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else if (sameVnode(oldEndVnode, newEndVnode)) {
	        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
	        oldStartVnode = oldCh[++oldStartIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else {
	        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
	        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
	        if (isUndef(idxInOld)) { // New element
	          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        } else {
	          elmToMove = oldCh[idxInOld];
	          /* istanbul ignore if */
	          if ("development" !== 'production' && !elmToMove) {
	            warn(
	              'It seems there are duplicate keys that is causing an update error. ' +
	              'Make sure each v-for item has a unique key.'
	            );
	          }
	          if (sameVnode(elmToMove, newStartVnode)) {
	            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
	            oldCh[idxInOld] = undefined;
	            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          } else {
	            // same key but different element. treat as new element
	            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          }
	        }
	      }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
	      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	    }
	  }

	  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
	    if (oldVnode === vnode) {
	      return
	    }
	    // reuse element for static trees.
	    // note we only do this if the vnode is cloned -
	    // if the new node is not cloned it means the render functions have been
	    // reset by the hot-reload-api and we need to do a proper re-render.
	    if (isTrue(vnode.isStatic) &&
	        isTrue(oldVnode.isStatic) &&
	        vnode.key === oldVnode.key &&
	        (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))) {
	      vnode.elm = oldVnode.elm;
	      vnode.componentInstance = oldVnode.componentInstance;
	      return
	    }
	    var i;
	    var data = vnode.data;
	    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
	      i(oldVnode, vnode);
	    }
	    var elm = vnode.elm = oldVnode.elm;
	    var oldCh = oldVnode.children;
	    var ch = vnode.children;
	    if (isDef(data) && isPatchable(vnode)) {
	      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
	      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
	      } else if (isDef(ch)) {
	        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	      } else if (isDef(oldVnode.text)) {
	        nodeOps.setTextContent(elm, '');
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      nodeOps.setTextContent(elm, vnode.text);
	    }
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
	    }
	  }

	  function invokeInsertHook (vnode, queue, initial) {
	    // delay insert hooks for component root nodes, invoke them after the
	    // element is really inserted
	    if (isTrue(initial) && isDef(vnode.parent)) {
	      vnode.parent.data.pendingInsert = queue;
	    } else {
	      for (var i = 0; i < queue.length; ++i) {
	        queue[i].data.hook.insert(queue[i]);
	      }
	    }
	  }

	  var bailed = false;
	  // list of modules that can skip create hook during hydration because they
	  // are already rendered on the client or has no need for initialization
	  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

	  // Note: this is a browser-only function so we can assume elms are DOM nodes.
	  function hydrate (elm, vnode, insertedVnodeQueue) {
	    {
	      if (!assertNodeMatch(elm, vnode)) {
	        return false
	      }
	    }
	    vnode.elm = elm;
	    var tag = vnode.tag;
	    var data = vnode.data;
	    var children = vnode.children;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
	      if (isDef(i = vnode.componentInstance)) {
	        // child component. it should have hydrated its own tree.
	        initComponent(vnode, insertedVnodeQueue);
	        return true
	      }
	    }
	    if (isDef(tag)) {
	      if (isDef(children)) {
	        // empty element, allow client to pick up and populate children
	        if (!elm.hasChildNodes()) {
	          createChildren(vnode, children, insertedVnodeQueue);
	        } else {
	          var childrenMatch = true;
	          var childNode = elm.firstChild;
	          for (var i$1 = 0; i$1 < children.length; i$1++) {
	            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
	              childrenMatch = false;
	              break
	            }
	            childNode = childNode.nextSibling;
	          }
	          // if childNode is not null, it means the actual childNodes list is
	          // longer than the virtual children list.
	          if (!childrenMatch || childNode) {
	            if ("development" !== 'production' &&
	                typeof console !== 'undefined' &&
	                !bailed) {
	              bailed = true;
	              console.warn('Parent: ', elm);
	              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
	            }
	            return false
	          }
	        }
	      }
	      if (isDef(data)) {
	        for (var key in data) {
	          if (!isRenderedModule(key)) {
	            invokeCreateHooks(vnode, insertedVnodeQueue);
	            break
	          }
	        }
	      }
	    } else if (elm.data !== vnode.text) {
	      elm.data = vnode.text;
	    }
	    return true
	  }

	  function assertNodeMatch (node, vnode) {
	    if (isDef(vnode.tag)) {
	      return (
	        vnode.tag.indexOf('vue-component') === 0 ||
	        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
	      )
	    } else {
	      return node.nodeType === (vnode.isComment ? 8 : 3)
	    }
	  }

	  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
	    if (isUndef(vnode)) {
	      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
	      return
	    }

	    var isInitialPatch = false;
	    var insertedVnodeQueue = [];

	    if (isUndef(oldVnode)) {
	      // empty mount (likely as component), create new root element
	      isInitialPatch = true;
	      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
	    } else {
	      var isRealElement = isDef(oldVnode.nodeType);
	      if (!isRealElement && sameVnode(oldVnode, vnode)) {
	        // patch existing root node
	        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
	      } else {
	        if (isRealElement) {
	          // mounting to a real element
	          // check if this is server-rendered content and if we can perform
	          // a successful hydration.
	          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
	            oldVnode.removeAttribute('server-rendered');
	            hydrating = true;
	          }
	          if (isTrue(hydrating)) {
	            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
	              invokeInsertHook(vnode, insertedVnodeQueue, true);
	              return oldVnode
	            } else {
	              warn(
	                'The client-side rendered virtual DOM tree is not matching ' +
	                'server-rendered content. This is likely caused by incorrect ' +
	                'HTML markup, for example nesting block-level elements inside ' +
	                '<p>, or missing <tbody>. Bailing hydration and performing ' +
	                'full client-side render.'
	              );
	            }
	          }
	          // either not server-rendered, or hydration failed.
	          // create an empty node and replace it
	          oldVnode = emptyNodeAt(oldVnode);
	        }
	        // replacing existing element
	        var oldElm = oldVnode.elm;
	        var parentElm$1 = nodeOps.parentNode(oldElm);
	        createElm(
	          vnode,
	          insertedVnodeQueue,
	          // extremely rare edge case: do not insert if old element is in a
	          // leaving transition. Only happens when combining transition +
	          // keep-alive + HOCs. (#4590)
	          oldElm._leaveCb ? null : parentElm$1,
	          nodeOps.nextSibling(oldElm)
	        );

	        if (isDef(vnode.parent)) {
	          // component root element replaced.
	          // update parent placeholder node element, recursively
	          var ancestor = vnode.parent;
	          while (ancestor) {
	            ancestor.elm = vnode.elm;
	            ancestor = ancestor.parent;
	          }
	          if (isPatchable(vnode)) {
	            for (var i = 0; i < cbs.create.length; ++i) {
	              cbs.create[i](emptyNode, vnode.parent);
	            }
	          }
	        }

	        if (isDef(parentElm$1)) {
	          removeVnodes(parentElm$1, [oldVnode], 0, 0);
	        } else if (isDef(oldVnode.tag)) {
	          invokeDestroyHook(oldVnode);
	        }
	      }
	    }

	    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
	    return vnode.elm
	  }
	}

	/*  */

	var directives = {
	  create: updateDirectives,
	  update: updateDirectives,
	  destroy: function unbindDirectives (vnode) {
	    updateDirectives(vnode, emptyNode);
	  }
	};

	function updateDirectives (oldVnode, vnode) {
	  if (oldVnode.data.directives || vnode.data.directives) {
	    _update(oldVnode, vnode);
	  }
	}

	function _update (oldVnode, vnode) {
	  var isCreate = oldVnode === emptyNode;
	  var isDestroy = vnode === emptyNode;
	  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
	  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

	  var dirsWithInsert = [];
	  var dirsWithPostpatch = [];

	  var key, oldDir, dir;
	  for (key in newDirs) {
	    oldDir = oldDirs[key];
	    dir = newDirs[key];
	    if (!oldDir) {
	      // new directive, bind
	      callHook$1(dir, 'bind', vnode, oldVnode);
	      if (dir.def && dir.def.inserted) {
	        dirsWithInsert.push(dir);
	      }
	    } else {
	      // existing directive, update
	      dir.oldValue = oldDir.value;
	      callHook$1(dir, 'update', vnode, oldVnode);
	      if (dir.def && dir.def.componentUpdated) {
	        dirsWithPostpatch.push(dir);
	      }
	    }
	  }

	  if (dirsWithInsert.length) {
	    var callInsert = function () {
	      for (var i = 0; i < dirsWithInsert.length; i++) {
	        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
	      }
	    };
	    if (isCreate) {
	      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
	    } else {
	      callInsert();
	    }
	  }

	  if (dirsWithPostpatch.length) {
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
	      for (var i = 0; i < dirsWithPostpatch.length; i++) {
	        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
	      }
	    });
	  }

	  if (!isCreate) {
	    for (key in oldDirs) {
	      if (!newDirs[key]) {
	        // no longer present, unbind
	        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
	      }
	    }
	  }
	}

	var emptyModifiers = Object.create(null);

	function normalizeDirectives$1 (
	  dirs,
	  vm
	) {
	  var res = Object.create(null);
	  if (!dirs) {
	    return res
	  }
	  var i, dir;
	  for (i = 0; i < dirs.length; i++) {
	    dir = dirs[i];
	    if (!dir.modifiers) {
	      dir.modifiers = emptyModifiers;
	    }
	    res[getRawDirName(dir)] = dir;
	    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
	  }
	  return res
	}

	function getRawDirName (dir) {
	  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
	}

	function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
	  var fn = dir.def && dir.def[hook];
	  if (fn) {
	    fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
	  }
	}

	var baseModules = [
	  ref,
	  directives
	];

	/*  */

	function updateAttrs (oldVnode, vnode) {
	  if (!oldVnode.data.attrs && !vnode.data.attrs) {
	    return
	  }
	  var key, cur, old;
	  var elm = vnode.elm;
	  var oldAttrs = oldVnode.data.attrs || {};
	  var attrs = vnode.data.attrs || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (attrs.__ob__) {
	    attrs = vnode.data.attrs = extend({}, attrs);
	  }

	  for (key in attrs) {
	    cur = attrs[key];
	    old = oldAttrs[key];
	    if (old !== cur) {
	      setAttr(elm, key, cur);
	    }
	  }
	  // #4391: in IE9, setting type can reset value for input[type=radio]
	  /* istanbul ignore if */
	  if (isIE9 && attrs.value !== oldAttrs.value) {
	    setAttr(elm, 'value', attrs.value);
	  }
	  for (key in oldAttrs) {
	    if (attrs[key] == null) {
	      if (isXlink(key)) {
	        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
	      } else if (!isEnumeratedAttr(key)) {
	        elm.removeAttribute(key);
	      }
	    }
	  }
	}

	function setAttr (el, key, value) {
	  if (isBooleanAttr(key)) {
	    // set attribute for blank value
	    // e.g. <option disabled>Select one</option>
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      el.setAttribute(key, key);
	    }
	  } else if (isEnumeratedAttr(key)) {
	    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
	  } else if (isXlink(key)) {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
	    } else {
	      el.setAttributeNS(xlinkNS, key, value);
	    }
	  } else {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      el.setAttribute(key, value);
	    }
	  }
	}

	var attrs = {
	  create: updateAttrs,
	  update: updateAttrs
	};

	/*  */

	function updateClass (oldVnode, vnode) {
	  var el = vnode.elm;
	  var data = vnode.data;
	  var oldData = oldVnode.data;
	  if (!data.staticClass && !data.class &&
	      (!oldData || (!oldData.staticClass && !oldData.class))) {
	    return
	  }

	  var cls = genClassForVnode(vnode);

	  // handle transition classes
	  var transitionClass = el._transitionClasses;
	  if (transitionClass) {
	    cls = concat(cls, stringifyClass(transitionClass));
	  }

	  // set the class
	  if (cls !== el._prevClass) {
	    el.setAttribute('class', cls);
	    el._prevClass = cls;
	  }
	}

	var klass = {
	  create: updateClass,
	  update: updateClass
	};

	/*  */

	var validDivisionCharRE = /[\w).+\-_$\]]/;

	function parseFilters (exp) {
	  var inSingle = false;
	  var inDouble = false;
	  var inTemplateString = false;
	  var inRegex = false;
	  var curly = 0;
	  var square = 0;
	  var paren = 0;
	  var lastFilterIndex = 0;
	  var c, prev, i, expression, filters;

	  for (i = 0; i < exp.length; i++) {
	    prev = c;
	    c = exp.charCodeAt(i);
	    if (inSingle) {
	      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
	    } else if (inDouble) {
	      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
	    } else if (inTemplateString) {
	      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
	    } else if (inRegex) {
	      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
	    } else if (
	      c === 0x7C && // pipe
	      exp.charCodeAt(i + 1) !== 0x7C &&
	      exp.charCodeAt(i - 1) !== 0x7C &&
	      !curly && !square && !paren
	    ) {
	      if (expression === undefined) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1;
	        expression = exp.slice(0, i).trim();
	      } else {
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 0x22: inDouble = true; break         // "
	        case 0x27: inSingle = true; break         // '
	        case 0x60: inTemplateString = true; break // `
	        case 0x28: paren++; break                 // (
	        case 0x29: paren--; break                 // )
	        case 0x5B: square++; break                // [
	        case 0x5D: square--; break                // ]
	        case 0x7B: curly++; break                 // {
	        case 0x7D: curly--; break                 // }
	      }
	      if (c === 0x2f) { // /
	        var j = i - 1;
	        var p = (void 0);
	        // find first non-whitespace prev char
	        for (; j >= 0; j--) {
	          p = exp.charAt(j);
	          if (p !== ' ') { break }
	        }
	        if (!p || !validDivisionCharRE.test(p)) {
	          inRegex = true;
	        }
	      }
	    }
	  }

	  if (expression === undefined) {
	    expression = exp.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }

	  function pushFilter () {
	    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
	    lastFilterIndex = i + 1;
	  }

	  if (filters) {
	    for (i = 0; i < filters.length; i++) {
	      expression = wrapFilter(expression, filters[i]);
	    }
	  }

	  return expression
	}

	function wrapFilter (exp, filter) {
	  var i = filter.indexOf('(');
	  if (i < 0) {
	    // _f: resolveFilter
	    return ("_f(\"" + filter + "\")(" + exp + ")")
	  } else {
	    var name = filter.slice(0, i);
	    var args = filter.slice(i + 1);
	    return ("_f(\"" + name + "\")(" + exp + "," + args)
	  }
	}

	/*  */

	function baseWarn (msg) {
	  console.error(("[Vue compiler]: " + msg));
	}

	function pluckModuleFunction (
	  modules,
	  key
	) {
	  return modules
	    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
	    : []
	}

	function addProp (el, name, value) {
	  (el.props || (el.props = [])).push({ name: name, value: value });
	}

	function addAttr (el, name, value) {
	  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
	}

	function addDirective (
	  el,
	  name,
	  rawName,
	  value,
	  arg,
	  modifiers
	) {
	  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
	}

	function addHandler (
	  el,
	  name,
	  value,
	  modifiers,
	  important
	) {
	  // check capture modifier
	  if (modifiers && modifiers.capture) {
	    delete modifiers.capture;
	    name = '!' + name; // mark the event as captured
	  }
	  if (modifiers && modifiers.once) {
	    delete modifiers.once;
	    name = '~' + name; // mark the event as once
	  }
	  var events;
	  if (modifiers && modifiers.native) {
	    delete modifiers.native;
	    events = el.nativeEvents || (el.nativeEvents = {});
	  } else {
	    events = el.events || (el.events = {});
	  }
	  var newHandler = { value: value, modifiers: modifiers };
	  var handlers = events[name];
	  /* istanbul ignore if */
	  if (Array.isArray(handlers)) {
	    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
	  } else if (handlers) {
	    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
	  } else {
	    events[name] = newHandler;
	  }
	}

	function getBindingAttr (
	  el,
	  name,
	  getStatic
	) {
	  var dynamicValue =
	    getAndRemoveAttr(el, ':' + name) ||
	    getAndRemoveAttr(el, 'v-bind:' + name);
	  if (dynamicValue != null) {
	    return parseFilters(dynamicValue)
	  } else if (getStatic !== false) {
	    var staticValue = getAndRemoveAttr(el, name);
	    if (staticValue != null) {
	      return JSON.stringify(staticValue)
	    }
	  }
	}

	function getAndRemoveAttr (el, name) {
	  var val;
	  if ((val = el.attrsMap[name]) != null) {
	    var list = el.attrsList;
	    for (var i = 0, l = list.length; i < l; i++) {
	      if (list[i].name === name) {
	        list.splice(i, 1);
	        break
	      }
	    }
	  }
	  return val
	}

	/*  */

	/**
	 * Cross-platform code generation for component v-model
	 */
	function genComponentModel (
	  el,
	  value,
	  modifiers
	) {
	  var ref = modifiers || {};
	  var number = ref.number;
	  var trim = ref.trim;

	  var baseValueExpression = '$$v';
	  var valueExpression = baseValueExpression;
	  if (trim) {
	    valueExpression =
	      "(typeof " + baseValueExpression + " === 'string'" +
	        "? " + baseValueExpression + ".trim()" +
	        ": " + baseValueExpression + ")";
	  }
	  if (number) {
	    valueExpression = "_n(" + valueExpression + ")";
	  }
	  var assignment = genAssignmentCode(value, valueExpression);

	  el.model = {
	    value: ("(" + value + ")"),
	    expression: ("\"" + value + "\""),
	    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
	  };
	}

	/**
	 * Cross-platform codegen helper for generating v-model value assignment code.
	 */
	function genAssignmentCode (
	  value,
	  assignment
	) {
	  var modelRs = parseModel(value);
	  if (modelRs.idx === null) {
	    return (value + "=" + assignment)
	  } else {
	    return "var $$exp = " + (modelRs.exp) + ", $$idx = " + (modelRs.idx) + ";" +
	      "if (!Array.isArray($$exp)){" +
	        value + "=" + assignment + "}" +
	      "else{$$exp.splice($$idx, 1, " + assignment + ")}"
	  }
	}

	/**
	 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
	 *
	 * for loop possible cases:
	 *
	 * - test
	 * - test[idx]
	 * - test[test1[idx]]
	 * - test["a"][idx]
	 * - xxx.test[a[a].test1[idx]]
	 * - test.xxx.a["asa"][test1[idx]]
	 *
	 */

	var len;
	var str;
	var chr;
	var index$1;
	var expressionPos;
	var expressionEndPos;

	function parseModel (val) {
	  str = val;
	  len = str.length;
	  index$1 = expressionPos = expressionEndPos = 0;

	  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
	    return {
	      exp: val,
	      idx: null
	    }
	  }

	  while (!eof()) {
	    chr = next();
	    /* istanbul ignore if */
	    if (isStringStart(chr)) {
	      parseString(chr);
	    } else if (chr === 0x5B) {
	      parseBracket(chr);
	    }
	  }

	  return {
	    exp: val.substring(0, expressionPos),
	    idx: val.substring(expressionPos + 1, expressionEndPos)
	  }
	}

	function next () {
	  return str.charCodeAt(++index$1)
	}

	function eof () {
	  return index$1 >= len
	}

	function isStringStart (chr) {
	  return chr === 0x22 || chr === 0x27
	}

	function parseBracket (chr) {
	  var inBracket = 1;
	  expressionPos = index$1;
	  while (!eof()) {
	    chr = next();
	    if (isStringStart(chr)) {
	      parseString(chr);
	      continue
	    }
	    if (chr === 0x5B) { inBracket++; }
	    if (chr === 0x5D) { inBracket--; }
	    if (inBracket === 0) {
	      expressionEndPos = index$1;
	      break
	    }
	  }
	}

	function parseString (chr) {
	  var stringQuote = chr;
	  while (!eof()) {
	    chr = next();
	    if (chr === stringQuote) {
	      break
	    }
	  }
	}

	/*  */

	var warn$1;

	// in some cases, the event used has to be determined at runtime
	// so we used some reserved tokens during compile.
	var RANGE_TOKEN = '__r';
	var CHECKBOX_RADIO_TOKEN = '__c';

	function model (
	  el,
	  dir,
	  _warn
	) {
	  warn$1 = _warn;
	  var value = dir.value;
	  var modifiers = dir.modifiers;
	  var tag = el.tag;
	  var type = el.attrsMap.type;

	  {
	    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
	    if (tag === 'input' && dynamicType) {
	      warn$1(
	        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
	        "v-model does not support dynamic input types. Use v-if branches instead."
	      );
	    }
	    // inputs with type="file" are read only and setting the input's
	    // value will throw an error.
	    if (tag === 'input' && type === 'file') {
	      warn$1(
	        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
	        "File inputs are read only. Use a v-on:change listener instead."
	      );
	    }
	  }

	  if (tag === 'select') {
	    genSelect(el, value, modifiers);
	  } else if (tag === 'input' && type === 'checkbox') {
	    genCheckboxModel(el, value, modifiers);
	  } else if (tag === 'input' && type === 'radio') {
	    genRadioModel(el, value, modifiers);
	  } else if (tag === 'input' || tag === 'textarea') {
	    genDefaultModel(el, value, modifiers);
	  } else if (!config.isReservedTag(tag)) {
	    genComponentModel(el, value, modifiers);
	    // component v-model doesn't need extra runtime
	    return false
	  } else {
	    warn$1(
	      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
	      "v-model is not supported on this element type. " +
	      'If you are working with contenteditable, it\'s recommended to ' +
	      'wrap a library dedicated for that purpose inside a custom component.'
	    );
	  }

	  // ensure runtime directive metadata
	  return true
	}

	function genCheckboxModel (
	  el,
	  value,
	  modifiers
	) {
	  var number = modifiers && modifiers.number;
	  var valueBinding = getBindingAttr(el, 'value') || 'null';
	  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
	  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
	  addProp(el, 'checked',
	    "Array.isArray(" + value + ")" +
	      "?_i(" + value + "," + valueBinding + ")>-1" + (
	        trueValueBinding === 'true'
	          ? (":(" + value + ")")
	          : (":_q(" + value + "," + trueValueBinding + ")")
	      )
	  );
	  addHandler(el, CHECKBOX_RADIO_TOKEN,
	    "var $$a=" + value + "," +
	        '$$el=$event.target,' +
	        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
	    'if(Array.isArray($$a)){' +
	      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
	          '$$i=_i($$a,$$v);' +
	      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
	      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
	    "}else{" + value + "=$$c}",
	    null, true
	  );
	}

	function genRadioModel (
	    el,
	    value,
	    modifiers
	) {
	  var number = modifiers && modifiers.number;
	  var valueBinding = getBindingAttr(el, 'value') || 'null';
	  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
	  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
	  addHandler(el, CHECKBOX_RADIO_TOKEN, genAssignmentCode(value, valueBinding), null, true);
	}

	function genSelect (
	    el,
	    value,
	    modifiers
	) {
	  var number = modifiers && modifiers.number;
	  var selectedVal = "Array.prototype.filter" +
	    ".call($event.target.options,function(o){return o.selected})" +
	    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
	    "return " + (number ? '_n(val)' : 'val') + "})";

	  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
	  var code = "var $$selectedVal = " + selectedVal + ";";
	  code = code + " " + (genAssignmentCode(value, assignment));
	  addHandler(el, 'change', code, null, true);
	}

	function genDefaultModel (
	  el,
	  value,
	  modifiers
	) {
	  var type = el.attrsMap.type;
	  var ref = modifiers || {};
	  var lazy = ref.lazy;
	  var number = ref.number;
	  var trim = ref.trim;
	  var needCompositionGuard = !lazy && type !== 'range';
	  var event = lazy
	    ? 'change'
	    : type === 'range'
	      ? RANGE_TOKEN
	      : 'input';

	  var valueExpression = '$event.target.value';
	  if (trim) {
	    valueExpression = "$event.target.value.trim()";
	  }
	  if (number) {
	    valueExpression = "_n(" + valueExpression + ")";
	  }

	  var code = genAssignmentCode(value, valueExpression);
	  if (needCompositionGuard) {
	    code = "if($event.target.composing)return;" + code;
	  }

	  addProp(el, 'value', ("(" + value + ")"));
	  addHandler(el, event, code, null, true);
	  if (trim || number || type === 'number') {
	    addHandler(el, 'blur', '$forceUpdate()');
	  }
	}

	/*  */

	// normalize v-model event tokens that can only be determined at runtime.
	// it's important to place the event as the first in the array because
	// the whole point is ensuring the v-model callback gets called before
	// user-attached handlers.
	function normalizeEvents (on) {
	  var event;
	  /* istanbul ignore if */
	  if (on[RANGE_TOKEN]) {
	    // IE input[type=range] only supports `change` event
	    event = isIE ? 'change' : 'input';
	    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
	    delete on[RANGE_TOKEN];
	  }
	  if (on[CHECKBOX_RADIO_TOKEN]) {
	    // Chrome fires microtasks in between click/change, leads to #4521
	    event = isChrome ? 'click' : 'change';
	    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
	    delete on[CHECKBOX_RADIO_TOKEN];
	  }
	}

	var target$1;

	function add$1 (
	  event,
	  handler,
	  once,
	  capture
	) {
	  if (once) {
	    var oldHandler = handler;
	    var _target = target$1; // save current target element in closure
	    handler = function (ev) {
	      var res = arguments.length === 1
	        ? oldHandler(ev)
	        : oldHandler.apply(null, arguments);
	      if (res !== null) {
	        remove$2(event, handler, capture, _target);
	      }
	    };
	  }
	  target$1.addEventListener(event, handler, capture);
	}

	function remove$2 (
	  event,
	  handler,
	  capture,
	  _target
	) {
	  (_target || target$1).removeEventListener(event, handler, capture);
	}

	function updateDOMListeners (oldVnode, vnode) {
	  if (!oldVnode.data.on && !vnode.data.on) {
	    return
	  }
	  var on = vnode.data.on || {};
	  var oldOn = oldVnode.data.on || {};
	  target$1 = vnode.elm;
	  normalizeEvents(on);
	  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
	}

	var events = {
	  create: updateDOMListeners,
	  update: updateDOMListeners
	};

	/*  */

	function updateDOMProps (oldVnode, vnode) {
	  if (!oldVnode.data.domProps && !vnode.data.domProps) {
	    return
	  }
	  var key, cur;
	  var elm = vnode.elm;
	  var oldProps = oldVnode.data.domProps || {};
	  var props = vnode.data.domProps || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (props.__ob__) {
	    props = vnode.data.domProps = extend({}, props);
	  }

	  for (key in oldProps) {
	    if (props[key] == null) {
	      elm[key] = '';
	    }
	  }
	  for (key in props) {
	    cur = props[key];
	    // ignore children if the node has textContent or innerHTML,
	    // as these will throw away existing DOM nodes and cause removal errors
	    // on subsequent patches (#3360)
	    if (key === 'textContent' || key === 'innerHTML') {
	      if (vnode.children) { vnode.children.length = 0; }
	      if (cur === oldProps[key]) { continue }
	    }

	    if (key === 'value') {
	      // store value as _value as well since
	      // non-string values will be stringified
	      elm._value = cur;
	      // avoid resetting cursor position when value is the same
	      var strCur = cur == null ? '' : String(cur);
	      if (shouldUpdateValue(elm, vnode, strCur)) {
	        elm.value = strCur;
	      }
	    } else {
	      elm[key] = cur;
	    }
	  }
	}

	// check platforms/web/util/attrs.js acceptValue


	function shouldUpdateValue (
	  elm,
	  vnode,
	  checkVal
	) {
	  return (!elm.composing && (
	    vnode.tag === 'option' ||
	    isDirty(elm, checkVal) ||
	    isInputChanged(elm, checkVal)
	  ))
	}

	function isDirty (elm, checkVal) {
	  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
	  return document.activeElement !== elm && elm.value !== checkVal
	}

	function isInputChanged (elm, newVal) {
	  var value = elm.value;
	  var modifiers = elm._vModifiers; // injected by v-model runtime
	  if ((modifiers && modifiers.number) || elm.type === 'number') {
	    return toNumber(value) !== toNumber(newVal)
	  }
	  if (modifiers && modifiers.trim) {
	    return value.trim() !== newVal.trim()
	  }
	  return value !== newVal
	}

	var domProps = {
	  create: updateDOMProps,
	  update: updateDOMProps
	};

	/*  */

	var parseStyleText = cached(function (cssText) {
	  var res = {};
	  var listDelimiter = /;(?![^(]*\))/g;
	  var propertyDelimiter = /:(.+)/;
	  cssText.split(listDelimiter).forEach(function (item) {
	    if (item) {
	      var tmp = item.split(propertyDelimiter);
	      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
	    }
	  });
	  return res
	});

	// merge static and dynamic style data on the same vnode
	function normalizeStyleData (data) {
	  var style = normalizeStyleBinding(data.style);
	  // static style is pre-processed into an object during compilation
	  // and is always a fresh object, so it's safe to merge into it
	  return data.staticStyle
	    ? extend(data.staticStyle, style)
	    : style
	}

	// normalize possible array / string values into Object
	function normalizeStyleBinding (bindingStyle) {
	  if (Array.isArray(bindingStyle)) {
	    return toObject(bindingStyle)
	  }
	  if (typeof bindingStyle === 'string') {
	    return parseStyleText(bindingStyle)
	  }
	  return bindingStyle
	}

	/**
	 * parent component style should be after child's
	 * so that parent component's style could override it
	 */
	function getStyle (vnode, checkChild) {
	  var res = {};
	  var styleData;

	  if (checkChild) {
	    var childNode = vnode;
	    while (childNode.componentInstance) {
	      childNode = childNode.componentInstance._vnode;
	      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
	        extend(res, styleData);
	      }
	    }
	  }

	  if ((styleData = normalizeStyleData(vnode.data))) {
	    extend(res, styleData);
	  }

	  var parentNode = vnode;
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
	      extend(res, styleData);
	    }
	  }
	  return res
	}

	/*  */

	var cssVarRE = /^--/;
	var importantRE = /\s*!important$/;
	var setProp = function (el, name, val) {
	  /* istanbul ignore if */
	  if (cssVarRE.test(name)) {
	    el.style.setProperty(name, val);
	  } else if (importantRE.test(val)) {
	    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
	  } else {
	    el.style[normalize(name)] = val;
	  }
	};

	var prefixes = ['Webkit', 'Moz', 'ms'];

	var testEl;
	var normalize = cached(function (prop) {
	  testEl = testEl || document.createElement('div');
	  prop = camelize(prop);
	  if (prop !== 'filter' && (prop in testEl.style)) {
	    return prop
	  }
	  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
	  for (var i = 0; i < prefixes.length; i++) {
	    var prefixed = prefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return prefixed
	    }
	  }
	});

	function updateStyle (oldVnode, vnode) {
	  var data = vnode.data;
	  var oldData = oldVnode.data;

	  if (!data.staticStyle && !data.style &&
	      !oldData.staticStyle && !oldData.style) {
	    return
	  }

	  var cur, name;
	  var el = vnode.elm;
	  var oldStaticStyle = oldVnode.data.staticStyle;
	  var oldStyleBinding = oldVnode.data.style || {};

	  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
	  var oldStyle = oldStaticStyle || oldStyleBinding;

	  var style = normalizeStyleBinding(vnode.data.style) || {};

	  vnode.data.style = style.__ob__ ? extend({}, style) : style;

	  var newStyle = getStyle(vnode, true);

	  for (name in oldStyle) {
	    if (newStyle[name] == null) {
	      setProp(el, name, '');
	    }
	  }
	  for (name in newStyle) {
	    cur = newStyle[name];
	    if (cur !== oldStyle[name]) {
	      // ie9 setting to null has no effect, must use empty string
	      setProp(el, name, cur == null ? '' : cur);
	    }
	  }
	}

	var style = {
	  create: updateStyle,
	  update: updateStyle
	};

	/*  */

	/**
	 * Add class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function addClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !(cls = cls.trim())) {
	    return
	  }

	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
	    } else {
	      el.classList.add(cls);
	    }
	  } else {
	    var cur = " " + (el.getAttribute('class') || '') + " ";
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      el.setAttribute('class', (cur + cls).trim());
	    }
	  }
	}

	/**
	 * Remove class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function removeClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !(cls = cls.trim())) {
	    return
	  }

	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
	    } else {
	      el.classList.remove(cls);
	    }
	  } else {
	    var cur = " " + (el.getAttribute('class') || '') + " ";
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    el.setAttribute('class', cur.trim());
	  }
	}

	/*  */

	function resolveTransition (def$$1) {
	  if (!def$$1) {
	    return
	  }
	  /* istanbul ignore else */
	  if (typeof def$$1 === 'object') {
	    var res = {};
	    if (def$$1.css !== false) {
	      extend(res, autoCssTransition(def$$1.name || 'v'));
	    }
	    extend(res, def$$1);
	    return res
	  } else if (typeof def$$1 === 'string') {
	    return autoCssTransition(def$$1)
	  }
	}

	var autoCssTransition = cached(function (name) {
	  return {
	    enterClass: (name + "-enter"),
	    enterToClass: (name + "-enter-to"),
	    enterActiveClass: (name + "-enter-active"),
	    leaveClass: (name + "-leave"),
	    leaveToClass: (name + "-leave-to"),
	    leaveActiveClass: (name + "-leave-active")
	  }
	});

	var hasTransition = inBrowser && !isIE9;
	var TRANSITION = 'transition';
	var ANIMATION = 'animation';

	// Transition property/event sniffing
	var transitionProp = 'transition';
	var transitionEndEvent = 'transitionend';
	var animationProp = 'animation';
	var animationEndEvent = 'animationend';
	if (hasTransition) {
	  /* istanbul ignore if */
	  if (window.ontransitionend === undefined &&
	    window.onwebkittransitionend !== undefined) {
	    transitionProp = 'WebkitTransition';
	    transitionEndEvent = 'webkitTransitionEnd';
	  }
	  if (window.onanimationend === undefined &&
	    window.onwebkitanimationend !== undefined) {
	    animationProp = 'WebkitAnimation';
	    animationEndEvent = 'webkitAnimationEnd';
	  }
	}

	// binding to window is necessary to make hot reload work in IE in strict mode
	var raf = inBrowser && window.requestAnimationFrame
	  ? window.requestAnimationFrame.bind(window)
	  : setTimeout;

	function nextFrame (fn) {
	  raf(function () {
	    raf(fn);
	  });
	}

	function addTransitionClass (el, cls) {
	  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
	  addClass(el, cls);
	}

	function removeTransitionClass (el, cls) {
	  if (el._transitionClasses) {
	    remove(el._transitionClasses, cls);
	  }
	  removeClass(el, cls);
	}

	function whenTransitionEnds (
	  el,
	  expectedType,
	  cb
	) {
	  var ref = getTransitionInfo(el, expectedType);
	  var type = ref.type;
	  var timeout = ref.timeout;
	  var propCount = ref.propCount;
	  if (!type) { return cb() }
	  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
	  var ended = 0;
	  var end = function () {
	    el.removeEventListener(event, onEnd);
	    cb();
	  };
	  var onEnd = function (e) {
	    if (e.target === el) {
	      if (++ended >= propCount) {
	        end();
	      }
	    }
	  };
	  setTimeout(function () {
	    if (ended < propCount) {
	      end();
	    }
	  }, timeout + 1);
	  el.addEventListener(event, onEnd);
	}

	var transformRE = /\b(transform|all)(,|$)/;

	function getTransitionInfo (el, expectedType) {
	  var styles = window.getComputedStyle(el);
	  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
	  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
	  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
	  var animationDelays = styles[animationProp + 'Delay'].split(', ');
	  var animationDurations = styles[animationProp + 'Duration'].split(', ');
	  var animationTimeout = getTimeout(animationDelays, animationDurations);

	  var type;
	  var timeout = 0;
	  var propCount = 0;
	  /* istanbul ignore if */
	  if (expectedType === TRANSITION) {
	    if (transitionTimeout > 0) {
	      type = TRANSITION;
	      timeout = transitionTimeout;
	      propCount = transitionDurations.length;
	    }
	  } else if (expectedType === ANIMATION) {
	    if (animationTimeout > 0) {
	      type = ANIMATION;
	      timeout = animationTimeout;
	      propCount = animationDurations.length;
	    }
	  } else {
	    timeout = Math.max(transitionTimeout, animationTimeout);
	    type = timeout > 0
	      ? transitionTimeout > animationTimeout
	        ? TRANSITION
	        : ANIMATION
	      : null;
	    propCount = type
	      ? type === TRANSITION
	        ? transitionDurations.length
	        : animationDurations.length
	      : 0;
	  }
	  var hasTransform =
	    type === TRANSITION &&
	    transformRE.test(styles[transitionProp + 'Property']);
	  return {
	    type: type,
	    timeout: timeout,
	    propCount: propCount,
	    hasTransform: hasTransform
	  }
	}

	function getTimeout (delays, durations) {
	  /* istanbul ignore next */
	  while (delays.length < durations.length) {
	    delays = delays.concat(delays);
	  }

	  return Math.max.apply(null, durations.map(function (d, i) {
	    return toMs(d) + toMs(delays[i])
	  }))
	}

	function toMs (s) {
	  return Number(s.slice(0, -1)) * 1000
	}

	/*  */

	function enter (vnode, toggleDisplay) {
	  var el = vnode.elm;

	  // call leave callback now
	  if (el._leaveCb) {
	    el._leaveCb.cancelled = true;
	    el._leaveCb();
	  }

	  var data = resolveTransition(vnode.data.transition);
	  if (!data) {
	    return
	  }

	  /* istanbul ignore if */
	  if (el._enterCb || el.nodeType !== 1) {
	    return
	  }

	  var css = data.css;
	  var type = data.type;
	  var enterClass = data.enterClass;
	  var enterToClass = data.enterToClass;
	  var enterActiveClass = data.enterActiveClass;
	  var appearClass = data.appearClass;
	  var appearToClass = data.appearToClass;
	  var appearActiveClass = data.appearActiveClass;
	  var beforeEnter = data.beforeEnter;
	  var enter = data.enter;
	  var afterEnter = data.afterEnter;
	  var enterCancelled = data.enterCancelled;
	  var beforeAppear = data.beforeAppear;
	  var appear = data.appear;
	  var afterAppear = data.afterAppear;
	  var appearCancelled = data.appearCancelled;
	  var duration = data.duration;

	  // activeInstance will always be the <transition> component managing this
	  // transition. One edge case to check is when the <transition> is placed
	  // as the root node of a child component. In that case we need to check
	  // <transition>'s parent for appear check.
	  var context = activeInstance;
	  var transitionNode = activeInstance.$vnode;
	  while (transitionNode && transitionNode.parent) {
	    transitionNode = transitionNode.parent;
	    context = transitionNode.context;
	  }

	  var isAppear = !context._isMounted || !vnode.isRootInsert;

	  if (isAppear && !appear && appear !== '') {
	    return
	  }

	  var startClass = isAppear && appearClass
	    ? appearClass
	    : enterClass;
	  var activeClass = isAppear && appearActiveClass
	    ? appearActiveClass
	    : enterActiveClass;
	  var toClass = isAppear && appearToClass
	    ? appearToClass
	    : enterToClass;

	  var beforeEnterHook = isAppear
	    ? (beforeAppear || beforeEnter)
	    : beforeEnter;
	  var enterHook = isAppear
	    ? (typeof appear === 'function' ? appear : enter)
	    : enter;
	  var afterEnterHook = isAppear
	    ? (afterAppear || afterEnter)
	    : afterEnter;
	  var enterCancelledHook = isAppear
	    ? (appearCancelled || enterCancelled)
	    : enterCancelled;

	  var explicitEnterDuration = toNumber(
	    isObject(duration)
	      ? duration.enter
	      : duration
	  );

	  if ("development" !== 'production' && explicitEnterDuration != null) {
	    checkDuration(explicitEnterDuration, 'enter', vnode);
	  }

	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl = getHookArgumentsLength(enterHook);

	  var cb = el._enterCb = once(function () {
	    if (expectsCSS) {
	      removeTransitionClass(el, toClass);
	      removeTransitionClass(el, activeClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, startClass);
	      }
	      enterCancelledHook && enterCancelledHook(el);
	    } else {
	      afterEnterHook && afterEnterHook(el);
	    }
	    el._enterCb = null;
	  });

	  if (!vnode.data.show) {
	    // remove pending leave element on enter by injecting an insert hook
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
	      var parent = el.parentNode;
	      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
	      if (pendingNode &&
	          pendingNode.tag === vnode.tag &&
	          pendingNode.elm._leaveCb) {
	        pendingNode.elm._leaveCb();
	      }
	      enterHook && enterHook(el, cb);
	    });
	  }

	  // start enter transition
	  beforeEnterHook && beforeEnterHook(el);
	  if (expectsCSS) {
	    addTransitionClass(el, startClass);
	    addTransitionClass(el, activeClass);
	    nextFrame(function () {
	      addTransitionClass(el, toClass);
	      removeTransitionClass(el, startClass);
	      if (!cb.cancelled && !userWantsControl) {
	        if (isValidDuration(explicitEnterDuration)) {
	          setTimeout(cb, explicitEnterDuration);
	        } else {
	          whenTransitionEnds(el, type, cb);
	        }
	      }
	    });
	  }

	  if (vnode.data.show) {
	    toggleDisplay && toggleDisplay();
	    enterHook && enterHook(el, cb);
	  }

	  if (!expectsCSS && !userWantsControl) {
	    cb();
	  }
	}

	function leave (vnode, rm) {
	  var el = vnode.elm;

	  // call enter callback now
	  if (el._enterCb) {
	    el._enterCb.cancelled = true;
	    el._enterCb();
	  }

	  var data = resolveTransition(vnode.data.transition);
	  if (!data) {
	    return rm()
	  }

	  /* istanbul ignore if */
	  if (el._leaveCb || el.nodeType !== 1) {
	    return
	  }

	  var css = data.css;
	  var type = data.type;
	  var leaveClass = data.leaveClass;
	  var leaveToClass = data.leaveToClass;
	  var leaveActiveClass = data.leaveActiveClass;
	  var beforeLeave = data.beforeLeave;
	  var leave = data.leave;
	  var afterLeave = data.afterLeave;
	  var leaveCancelled = data.leaveCancelled;
	  var delayLeave = data.delayLeave;
	  var duration = data.duration;

	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl = getHookArgumentsLength(leave);

	  var explicitLeaveDuration = toNumber(
	    isObject(duration)
	      ? duration.leave
	      : duration
	  );

	  if ("development" !== 'production' && explicitLeaveDuration != null) {
	    checkDuration(explicitLeaveDuration, 'leave', vnode);
	  }

	  var cb = el._leaveCb = once(function () {
	    if (el.parentNode && el.parentNode._pending) {
	      el.parentNode._pending[vnode.key] = null;
	    }
	    if (expectsCSS) {
	      removeTransitionClass(el, leaveToClass);
	      removeTransitionClass(el, leaveActiveClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, leaveClass);
	      }
	      leaveCancelled && leaveCancelled(el);
	    } else {
	      rm();
	      afterLeave && afterLeave(el);
	    }
	    el._leaveCb = null;
	  });

	  if (delayLeave) {
	    delayLeave(performLeave);
	  } else {
	    performLeave();
	  }

	  function performLeave () {
	    // the delayed leave may have already been cancelled
	    if (cb.cancelled) {
	      return
	    }
	    // record leaving element
	    if (!vnode.data.show) {
	      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
	    }
	    beforeLeave && beforeLeave(el);
	    if (expectsCSS) {
	      addTransitionClass(el, leaveClass);
	      addTransitionClass(el, leaveActiveClass);
	      nextFrame(function () {
	        addTransitionClass(el, leaveToClass);
	        removeTransitionClass(el, leaveClass);
	        if (!cb.cancelled && !userWantsControl) {
	          if (isValidDuration(explicitLeaveDuration)) {
	            setTimeout(cb, explicitLeaveDuration);
	          } else {
	            whenTransitionEnds(el, type, cb);
	          }
	        }
	      });
	    }
	    leave && leave(el, cb);
	    if (!expectsCSS && !userWantsControl) {
	      cb();
	    }
	  }
	}

	// only used in dev mode
	function checkDuration (val, name, vnode) {
	  if (typeof val !== 'number') {
	    warn(
	      "<transition> explicit " + name + " duration is not a valid number - " +
	      "got " + (JSON.stringify(val)) + ".",
	      vnode.context
	    );
	  } else if (isNaN(val)) {
	    warn(
	      "<transition> explicit " + name + " duration is NaN - " +
	      'the duration expression might be incorrect.',
	      vnode.context
	    );
	  }
	}

	function isValidDuration (val) {
	  return typeof val === 'number' && !isNaN(val)
	}

	/**
	 * Normalize a transition hook's argument length. The hook may be:
	 * - a merged hook (invoker) with the original in .fns
	 * - a wrapped component method (check ._length)
	 * - a plain function (.length)
	 */
	function getHookArgumentsLength (fn) {
	  if (!fn) { return false }
	  var invokerFns = fn.fns;
	  if (invokerFns) {
	    // invoker
	    return getHookArgumentsLength(
	      Array.isArray(invokerFns)
	        ? invokerFns[0]
	        : invokerFns
	    )
	  } else {
	    return (fn._length || fn.length) > 1
	  }
	}

	function _enter (_, vnode) {
	  if (!vnode.data.show) {
	    enter(vnode);
	  }
	}

	var transition = inBrowser ? {
	  create: _enter,
	  activate: _enter,
	  remove: function remove$$1 (vnode, rm) {
	    /* istanbul ignore else */
	    if (!vnode.data.show) {
	      leave(vnode, rm);
	    } else {
	      rm();
	    }
	  }
	} : {};

	var platformModules = [
	  attrs,
	  klass,
	  events,
	  domProps,
	  style,
	  transition
	];

	/*  */

	// the directive module should be applied last, after all
	// built-in modules have been applied.
	var modules = platformModules.concat(baseModules);

	var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

	/**
	 * Not type checking this file because flow doesn't like attaching
	 * properties to Elements.
	 */

	/* istanbul ignore if */
	if (isIE9) {
	  // http://www.matts411.com/post/internet-explorer-9-oninput/
	  document.addEventListener('selectionchange', function () {
	    var el = document.activeElement;
	    if (el && el.vmodel) {
	      trigger(el, 'input');
	    }
	  });
	}

	var model$1 = {
	  inserted: function inserted (el, binding, vnode) {
	    if (vnode.tag === 'select') {
	      var cb = function () {
	        setSelected(el, binding, vnode.context);
	      };
	      cb();
	      /* istanbul ignore if */
	      if (isIE || isEdge) {
	        setTimeout(cb, 0);
	      }
	    } else if (vnode.tag === 'textarea' || el.type === 'text' || el.type === 'password') {
	      el._vModifiers = binding.modifiers;
	      if (!binding.modifiers.lazy) {
	        if (!isAndroid) {
	          el.addEventListener('compositionstart', onCompositionStart);
	          el.addEventListener('compositionend', onCompositionEnd);
	        }
	        /* istanbul ignore if */
	        if (isIE9) {
	          el.vmodel = true;
	        }
	      }
	    }
	  },
	  componentUpdated: function componentUpdated (el, binding, vnode) {
	    if (vnode.tag === 'select') {
	      setSelected(el, binding, vnode.context);
	      // in case the options rendered by v-for have changed,
	      // it's possible that the value is out-of-sync with the rendered options.
	      // detect such cases and filter out values that no longer has a matching
	      // option in the DOM.
	      var needReset = el.multiple
	        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
	        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
	      if (needReset) {
	        trigger(el, 'change');
	      }
	    }
	  }
	};

	function setSelected (el, binding, vm) {
	  var value = binding.value;
	  var isMultiple = el.multiple;
	  if (isMultiple && !Array.isArray(value)) {
	    "development" !== 'production' && warn(
	      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
	      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
	      vm
	    );
	    return
	  }
	  var selected, option;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    option = el.options[i];
	    if (isMultiple) {
	      selected = looseIndexOf(value, getValue(option)) > -1;
	      if (option.selected !== selected) {
	        option.selected = selected;
	      }
	    } else {
	      if (looseEqual(getValue(option), value)) {
	        if (el.selectedIndex !== i) {
	          el.selectedIndex = i;
	        }
	        return
	      }
	    }
	  }
	  if (!isMultiple) {
	    el.selectedIndex = -1;
	  }
	}

	function hasNoMatchingOption (value, options) {
	  for (var i = 0, l = options.length; i < l; i++) {
	    if (looseEqual(getValue(options[i]), value)) {
	      return false
	    }
	  }
	  return true
	}

	function getValue (option) {
	  return '_value' in option
	    ? option._value
	    : option.value
	}

	function onCompositionStart (e) {
	  e.target.composing = true;
	}

	function onCompositionEnd (e) {
	  e.target.composing = false;
	  trigger(e.target, 'input');
	}

	function trigger (el, type) {
	  var e = document.createEvent('HTMLEvents');
	  e.initEvent(type, true, true);
	  el.dispatchEvent(e);
	}

	/*  */

	// recursively search for possible transition defined inside the component root
	function locateNode (vnode) {
	  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
	    ? locateNode(vnode.componentInstance._vnode)
	    : vnode
	}

	var show = {
	  bind: function bind (el, ref, vnode) {
	    var value = ref.value;

	    vnode = locateNode(vnode);
	    var transition = vnode.data && vnode.data.transition;
	    var originalDisplay = el.__vOriginalDisplay =
	      el.style.display === 'none' ? '' : el.style.display;
	    if (value && transition && !isIE9) {
	      vnode.data.show = true;
	      enter(vnode, function () {
	        el.style.display = originalDisplay;
	      });
	    } else {
	      el.style.display = value ? originalDisplay : 'none';
	    }
	  },

	  update: function update (el, ref, vnode) {
	    var value = ref.value;
	    var oldValue = ref.oldValue;

	    /* istanbul ignore if */
	    if (value === oldValue) { return }
	    vnode = locateNode(vnode);
	    var transition = vnode.data && vnode.data.transition;
	    if (transition && !isIE9) {
	      vnode.data.show = true;
	      if (value) {
	        enter(vnode, function () {
	          el.style.display = el.__vOriginalDisplay;
	        });
	      } else {
	        leave(vnode, function () {
	          el.style.display = 'none';
	        });
	      }
	    } else {
	      el.style.display = value ? el.__vOriginalDisplay : 'none';
	    }
	  },

	  unbind: function unbind (
	    el,
	    binding,
	    vnode,
	    oldVnode,
	    isDestroy
	  ) {
	    if (!isDestroy) {
	      el.style.display = el.__vOriginalDisplay;
	    }
	  }
	};

	var platformDirectives = {
	  model: model$1,
	  show: show
	};

	/*  */

	// Provides transition support for a single element/component.
	// supports transition mode (out-in / in-out)

	var transitionProps = {
	  name: String,
	  appear: Boolean,
	  css: Boolean,
	  mode: String,
	  type: String,
	  enterClass: String,
	  leaveClass: String,
	  enterToClass: String,
	  leaveToClass: String,
	  enterActiveClass: String,
	  leaveActiveClass: String,
	  appearClass: String,
	  appearActiveClass: String,
	  appearToClass: String,
	  duration: [Number, String, Object]
	};

	// in case the child is also an abstract component, e.g. <keep-alive>
	// we want to recursively retrieve the real component to be rendered
	function getRealChild (vnode) {
	  var compOptions = vnode && vnode.componentOptions;
	  if (compOptions && compOptions.Ctor.options.abstract) {
	    return getRealChild(getFirstComponentChild(compOptions.children))
	  } else {
	    return vnode
	  }
	}

	function extractTransitionData (comp) {
	  var data = {};
	  var options = comp.$options;
	  // props
	  for (var key in options.propsData) {
	    data[key] = comp[key];
	  }
	  // events.
	  // extract listeners and pass them directly to the transition methods
	  var listeners = options._parentListeners;
	  for (var key$1 in listeners) {
	    data[camelize(key$1)] = listeners[key$1];
	  }
	  return data
	}

	function placeholder (h, rawChild) {
	  return /\d-keep-alive$/.test(rawChild.tag)
	    ? h('keep-alive')
	    : null
	}

	function hasParentTransition (vnode) {
	  while ((vnode = vnode.parent)) {
	    if (vnode.data.transition) {
	      return true
	    }
	  }
	}

	function isSameChild (child, oldChild) {
	  return oldChild.key === child.key && oldChild.tag === child.tag
	}

	var Transition = {
	  name: 'transition',
	  props: transitionProps,
	  abstract: true,

	  render: function render (h) {
	    var this$1 = this;

	    var children = this.$slots.default;
	    if (!children) {
	      return
	    }

	    // filter out text nodes (possible whitespaces)
	    children = children.filter(function (c) { return c.tag; });
	    /* istanbul ignore if */
	    if (!children.length) {
	      return
	    }

	    // warn multiple elements
	    if ("development" !== 'production' && children.length > 1) {
	      warn(
	        '<transition> can only be used on a single element. Use ' +
	        '<transition-group> for lists.',
	        this.$parent
	      );
	    }

	    var mode = this.mode;

	    // warn invalid mode
	    if ("development" !== 'production' &&
	        mode && mode !== 'in-out' && mode !== 'out-in') {
	      warn(
	        'invalid <transition> mode: ' + mode,
	        this.$parent
	      );
	    }

	    var rawChild = children[0];

	    // if this is a component root node and the component's
	    // parent container node also has transition, skip.
	    if (hasParentTransition(this.$vnode)) {
	      return rawChild
	    }

	    // apply transition data to child
	    // use getRealChild() to ignore abstract components e.g. keep-alive
	    var child = getRealChild(rawChild);
	    /* istanbul ignore if */
	    if (!child) {
	      return rawChild
	    }

	    if (this._leaving) {
	      return placeholder(h, rawChild)
	    }

	    // ensure a key that is unique to the vnode type and to this transition
	    // component instance. This key will be used to remove pending leaving nodes
	    // during entering.
	    var id = "__transition-" + (this._uid) + "-";
	    child.key = child.key == null
	      ? id + child.tag
	      : isPrimitive(child.key)
	        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
	        : child.key;

	    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
	    var oldRawChild = this._vnode;
	    var oldChild = getRealChild(oldRawChild);

	    // mark v-show
	    // so that the transition module can hand over the control to the directive
	    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
	      child.data.show = true;
	    }

	    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
	      // replace old child transition data with fresh one
	      // important for dynamic transitions!
	      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
	      // handle transition mode
	      if (mode === 'out-in') {
	        // return placeholder node and queue update when leave finishes
	        this._leaving = true;
	        mergeVNodeHook(oldData, 'afterLeave', function () {
	          this$1._leaving = false;
	          this$1.$forceUpdate();
	        });
	        return placeholder(h, rawChild)
	      } else if (mode === 'in-out') {
	        var delayedLeave;
	        var performLeave = function () { delayedLeave(); };
	        mergeVNodeHook(data, 'afterEnter', performLeave);
	        mergeVNodeHook(data, 'enterCancelled', performLeave);
	        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
	      }
	    }

	    return rawChild
	  }
	};

	/*  */

	// Provides transition support for list items.
	// supports move transitions using the FLIP technique.

	// Because the vdom's children update algorithm is "unstable" - i.e.
	// it doesn't guarantee the relative positioning of removed elements,
	// we force transition-group to update its children into two passes:
	// in the first pass, we remove all nodes that need to be removed,
	// triggering their leaving transition; in the second pass, we insert/move
	// into the final desired state. This way in the second pass removed
	// nodes will remain where they should be.

	var props = extend({
	  tag: String,
	  moveClass: String
	}, transitionProps);

	delete props.mode;

	var TransitionGroup = {
	  props: props,

	  render: function render (h) {
	    var tag = this.tag || this.$vnode.data.tag || 'span';
	    var map = Object.create(null);
	    var prevChildren = this.prevChildren = this.children;
	    var rawChildren = this.$slots.default || [];
	    var children = this.children = [];
	    var transitionData = extractTransitionData(this);

	    for (var i = 0; i < rawChildren.length; i++) {
	      var c = rawChildren[i];
	      if (c.tag) {
	        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
	          children.push(c);
	          map[c.key] = c
	          ;(c.data || (c.data = {})).transition = transitionData;
	        } else {
	          var opts = c.componentOptions;
	          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
	          warn(("<transition-group> children must be keyed: <" + name + ">"));
	        }
	      }
	    }

	    if (prevChildren) {
	      var kept = [];
	      var removed = [];
	      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
	        var c$1 = prevChildren[i$1];
	        c$1.data.transition = transitionData;
	        c$1.data.pos = c$1.elm.getBoundingClientRect();
	        if (map[c$1.key]) {
	          kept.push(c$1);
	        } else {
	          removed.push(c$1);
	        }
	      }
	      this.kept = h(tag, null, kept);
	      this.removed = removed;
	    }

	    return h(tag, null, children)
	  },

	  beforeUpdate: function beforeUpdate () {
	    // force removing pass
	    this.__patch__(
	      this._vnode,
	      this.kept,
	      false, // hydrating
	      true // removeOnly (!important, avoids unnecessary moves)
	    );
	    this._vnode = this.kept;
	  },

	  updated: function updated () {
	    var children = this.prevChildren;
	    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
	    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
	      return
	    }

	    // we divide the work into three loops to avoid mixing DOM reads and writes
	    // in each iteration - which helps prevent layout thrashing.
	    children.forEach(callPendingCbs);
	    children.forEach(recordPosition);
	    children.forEach(applyTranslation);

	    // force reflow to put everything in position
	    var body = document.body;
	    var f = body.offsetHeight; // eslint-disable-line

	    children.forEach(function (c) {
	      if (c.data.moved) {
	        var el = c.elm;
	        var s = el.style;
	        addTransitionClass(el, moveClass);
	        s.transform = s.WebkitTransform = s.transitionDuration = '';
	        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
	          if (!e || /transform$/.test(e.propertyName)) {
	            el.removeEventListener(transitionEndEvent, cb);
	            el._moveCb = null;
	            removeTransitionClass(el, moveClass);
	          }
	        });
	      }
	    });
	  },

	  methods: {
	    hasMove: function hasMove (el, moveClass) {
	      /* istanbul ignore if */
	      if (!hasTransition) {
	        return false
	      }
	      if (this._hasMove != null) {
	        return this._hasMove
	      }
	      // Detect whether an element with the move class applied has
	      // CSS transitions. Since the element may be inside an entering
	      // transition at this very moment, we make a clone of it and remove
	      // all other transition classes applied to ensure only the move class
	      // is applied.
	      var clone = el.cloneNode();
	      if (el._transitionClasses) {
	        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
	      }
	      addClass(clone, moveClass);
	      clone.style.display = 'none';
	      this.$el.appendChild(clone);
	      var info = getTransitionInfo(clone);
	      this.$el.removeChild(clone);
	      return (this._hasMove = info.hasTransform)
	    }
	  }
	};

	function callPendingCbs (c) {
	  /* istanbul ignore if */
	  if (c.elm._moveCb) {
	    c.elm._moveCb();
	  }
	  /* istanbul ignore if */
	  if (c.elm._enterCb) {
	    c.elm._enterCb();
	  }
	}

	function recordPosition (c) {
	  c.data.newPos = c.elm.getBoundingClientRect();
	}

	function applyTranslation (c) {
	  var oldPos = c.data.pos;
	  var newPos = c.data.newPos;
	  var dx = oldPos.left - newPos.left;
	  var dy = oldPos.top - newPos.top;
	  if (dx || dy) {
	    c.data.moved = true;
	    var s = c.elm.style;
	    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
	    s.transitionDuration = '0s';
	  }
	}

	var platformComponents = {
	  Transition: Transition,
	  TransitionGroup: TransitionGroup
	};

	/*  */

	// install platform specific utils
	Vue$3.config.mustUseProp = mustUseProp;
	Vue$3.config.isReservedTag = isReservedTag;
	Vue$3.config.getTagNamespace = getTagNamespace;
	Vue$3.config.isUnknownElement = isUnknownElement;

	// install platform runtime directives & components
	extend(Vue$3.options.directives, platformDirectives);
	extend(Vue$3.options.components, platformComponents);

	// install platform patch function
	Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

	// public mount method
	Vue$3.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && inBrowser ? query(el) : undefined;
	  return mountComponent(this, el, hydrating)
	};

	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue$3);
	    } else if ("development" !== 'production' && isChrome) {
	      console[console.info ? 'info' : 'log'](
	        'Download the Vue Devtools extension for a better development experience:\n' +
	        'https://github.com/vuejs/vue-devtools'
	      );
	    }
	  }
	  if ("development" !== 'production' &&
	      config.productionTip !== false &&
	      inBrowser && typeof console !== 'undefined') {
	    console[console.info ? 'info' : 'log'](
	      "You are running Vue in development mode.\n" +
	      "Make sure to turn on production mode when deploying for production.\n" +
	      "See more tips at https://vuejs.org/guide/deployment.html"
	    );
	  }
	}, 0);

	/*  */

	// check whether current browser encodes a char inside attribute values
	function shouldDecode (content, encoded) {
	  var div = document.createElement('div');
	  div.innerHTML = "<div a=\"" + content + "\">";
	  return div.innerHTML.indexOf(encoded) > 0
	}

	// #3663
	// IE encodes newlines inside attribute values while other browsers don't
	var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

	/*  */

	var isUnaryTag = makeMap(
	  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
	  'link,meta,param,source,track,wbr'
	);

	// Elements that you can, intentionally, leave open
	// (and which close themselves)
	var canBeLeftOpenTag = makeMap(
	  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
	);

	// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
	// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
	var isNonPhrasingTag = makeMap(
	  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
	  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
	  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
	  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
	  'title,tr,track'
	);

	/*  */

	var decoder;

	function decode (html) {
	  decoder = decoder || document.createElement('div');
	  decoder.innerHTML = html;
	  return decoder.textContent
	}

	/**
	 * Not type-checking this file because it's mostly vendor code.
	 */

	/*!
	 * HTML Parser By John Resig (ejohn.org)
	 * Modified by Juriy "kangax" Zaytsev
	 * Original code by Erik Arvidsson, Mozilla Public License
	 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
	 */

	// Regular Expressions for parsing tags and attributes
	var singleAttrIdentifier = /([^\s"'<>/=]+)/;
	var singleAttrAssign = /(?:=)/;
	var singleAttrValues = [
	  // attr value double quotes
	  /"([^"]*)"+/.source,
	  // attr value, single quotes
	  /'([^']*)'+/.source,
	  // attr value, no quotes
	  /([^\s"'=<>`]+)/.source
	];
	var attribute = new RegExp(
	  '^\\s*' + singleAttrIdentifier.source +
	  '(?:\\s*(' + singleAttrAssign.source + ')' +
	  '\\s*(?:' + singleAttrValues.join('|') + '))?'
	);

	// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
	// but for Vue templates we can enforce a simple charset
	var ncname = '[a-zA-Z_][\\w\\-\\.]*';
	var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
	var startTagOpen = new RegExp('^<' + qnameCapture);
	var startTagClose = /^\s*(\/?)>/;
	var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
	var doctype = /^<!DOCTYPE [^>]+>/i;
	var comment = /^<!--/;
	var conditionalComment = /^<!\[/;

	var IS_REGEX_CAPTURING_BROKEN = false;
	'x'.replace(/x(.)?/g, function (m, g) {
	  IS_REGEX_CAPTURING_BROKEN = g === '';
	});

	// Special Elements (can contain anything)
	var isPlainTextElement = makeMap('script,style,textarea', true);
	var reCache = {};

	var decodingMap = {
	  '&lt;': '<',
	  '&gt;': '>',
	  '&quot;': '"',
	  '&amp;': '&',
	  '&#10;': '\n'
	};
	var encodedAttr = /&(?:lt|gt|quot|amp);/g;
	var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;

	function decodeAttr (value, shouldDecodeNewlines) {
	  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
	  return value.replace(re, function (match) { return decodingMap[match]; })
	}

	function parseHTML (html, options) {
	  var stack = [];
	  var expectHTML = options.expectHTML;
	  var isUnaryTag$$1 = options.isUnaryTag || no;
	  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
	  var index = 0;
	  var last, lastTag;
	  while (html) {
	    last = html;
	    // Make sure we're not in a plaintext content element like script/style
	    if (!lastTag || !isPlainTextElement(lastTag)) {
	      var textEnd = html.indexOf('<');
	      if (textEnd === 0) {
	        // Comment:
	        if (comment.test(html)) {
	          var commentEnd = html.indexOf('-->');

	          if (commentEnd >= 0) {
	            advance(commentEnd + 3);
	            continue
	          }
	        }

	        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
	        if (conditionalComment.test(html)) {
	          var conditionalEnd = html.indexOf(']>');

	          if (conditionalEnd >= 0) {
	            advance(conditionalEnd + 2);
	            continue
	          }
	        }

	        // Doctype:
	        var doctypeMatch = html.match(doctype);
	        if (doctypeMatch) {
	          advance(doctypeMatch[0].length);
	          continue
	        }

	        // End tag:
	        var endTagMatch = html.match(endTag);
	        if (endTagMatch) {
	          var curIndex = index;
	          advance(endTagMatch[0].length);
	          parseEndTag(endTagMatch[1], curIndex, index);
	          continue
	        }

	        // Start tag:
	        var startTagMatch = parseStartTag();
	        if (startTagMatch) {
	          handleStartTag(startTagMatch);
	          continue
	        }
	      }

	      var text = (void 0), rest$1 = (void 0), next = (void 0);
	      if (textEnd >= 0) {
	        rest$1 = html.slice(textEnd);
	        while (
	          !endTag.test(rest$1) &&
	          !startTagOpen.test(rest$1) &&
	          !comment.test(rest$1) &&
	          !conditionalComment.test(rest$1)
	        ) {
	          // < in plain text, be forgiving and treat it as text
	          next = rest$1.indexOf('<', 1);
	          if (next < 0) { break }
	          textEnd += next;
	          rest$1 = html.slice(textEnd);
	        }
	        text = html.substring(0, textEnd);
	        advance(textEnd);
	      }

	      if (textEnd < 0) {
	        text = html;
	        html = '';
	      }

	      if (options.chars && text) {
	        options.chars(text);
	      }
	    } else {
	      var stackedTag = lastTag.toLowerCase();
	      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
	      var endTagLength = 0;
	      var rest = html.replace(reStackedTag, function (all, text, endTag) {
	        endTagLength = endTag.length;
	        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
	          text = text
	            .replace(/<!--([\s\S]*?)-->/g, '$1')
	            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
	        }
	        if (options.chars) {
	          options.chars(text);
	        }
	        return ''
	      });
	      index += html.length - rest.length;
	      html = rest;
	      parseEndTag(stackedTag, index - endTagLength, index);
	    }

	    if (html === last) {
	      options.chars && options.chars(html);
	      if ("development" !== 'production' && !stack.length && options.warn) {
	        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
	      }
	      break
	    }
	  }

	  // Clean up any remaining tags
	  parseEndTag();

	  function advance (n) {
	    index += n;
	    html = html.substring(n);
	  }

	  function parseStartTag () {
	    var start = html.match(startTagOpen);
	    if (start) {
	      var match = {
	        tagName: start[1],
	        attrs: [],
	        start: index
	      };
	      advance(start[0].length);
	      var end, attr;
	      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
	        advance(attr[0].length);
	        match.attrs.push(attr);
	      }
	      if (end) {
	        match.unarySlash = end[1];
	        advance(end[0].length);
	        match.end = index;
	        return match
	      }
	    }
	  }

	  function handleStartTag (match) {
	    var tagName = match.tagName;
	    var unarySlash = match.unarySlash;

	    if (expectHTML) {
	      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
	        parseEndTag(lastTag);
	      }
	      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
	        parseEndTag(tagName);
	      }
	    }

	    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;

	    var l = match.attrs.length;
	    var attrs = new Array(l);
	    for (var i = 0; i < l; i++) {
	      var args = match.attrs[i];
	      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
	      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
	        if (args[3] === '') { delete args[3]; }
	        if (args[4] === '') { delete args[4]; }
	        if (args[5] === '') { delete args[5]; }
	      }
	      var value = args[3] || args[4] || args[5] || '';
	      attrs[i] = {
	        name: args[1],
	        value: decodeAttr(
	          value,
	          options.shouldDecodeNewlines
	        )
	      };
	    }

	    if (!unary) {
	      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
	      lastTag = tagName;
	    }

	    if (options.start) {
	      options.start(tagName, attrs, unary, match.start, match.end);
	    }
	  }

	  function parseEndTag (tagName, start, end) {
	    var pos, lowerCasedTagName;
	    if (start == null) { start = index; }
	    if (end == null) { end = index; }

	    if (tagName) {
	      lowerCasedTagName = tagName.toLowerCase();
	    }

	    // Find the closest opened tag of the same type
	    if (tagName) {
	      for (pos = stack.length - 1; pos >= 0; pos--) {
	        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
	          break
	        }
	      }
	    } else {
	      // If no tag name is provided, clean shop
	      pos = 0;
	    }

	    if (pos >= 0) {
	      // Close all the open elements, up the stack
	      for (var i = stack.length - 1; i >= pos; i--) {
	        if ("development" !== 'production' &&
	            (i > pos || !tagName) &&
	            options.warn) {
	          options.warn(
	            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
	          );
	        }
	        if (options.end) {
	          options.end(stack[i].tag, start, end);
	        }
	      }

	      // Remove the open elements from the stack
	      stack.length = pos;
	      lastTag = pos && stack[pos - 1].tag;
	    } else if (lowerCasedTagName === 'br') {
	      if (options.start) {
	        options.start(tagName, [], true, start, end);
	      }
	    } else if (lowerCasedTagName === 'p') {
	      if (options.start) {
	        options.start(tagName, [], false, start, end);
	      }
	      if (options.end) {
	        options.end(tagName, start, end);
	      }
	    }
	  }
	}

	/*  */

	var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

	var buildRegex = cached(function (delimiters) {
	  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
	  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
	  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
	});

	function parseText (
	  text,
	  delimiters
	) {
	  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
	  if (!tagRE.test(text)) {
	    return
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index;
	  while ((match = tagRE.exec(text))) {
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
	    }
	    // tag token
	    var exp = parseFilters(match[1].trim());
	    tokens.push(("_s(" + exp + ")"));
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push(JSON.stringify(text.slice(lastIndex)));
	  }
	  return tokens.join('+')
	}

	/*  */

	var onRE = /^@|^v-on:/;
	var dirRE = /^v-|^@|^:/;
	var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
	var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;

	var argRE = /:(.*)$/;
	var bindRE = /^:|^v-bind:/;
	var modifierRE = /\.[^.]+/g;

	var decodeHTMLCached = cached(decode);

	// configurable state
	var warn$2;
	var delimiters;
	var transforms;
	var preTransforms;
	var postTransforms;
	var platformIsPreTag;
	var platformMustUseProp;
	var platformGetTagNamespace;

	/**
	 * Convert HTML string to AST.
	 */
	function parse (
	  template,
	  options
	) {
	  warn$2 = options.warn || baseWarn;
	  platformGetTagNamespace = options.getTagNamespace || no;
	  platformMustUseProp = options.mustUseProp || no;
	  platformIsPreTag = options.isPreTag || no;
	  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
	  transforms = pluckModuleFunction(options.modules, 'transformNode');
	  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
	  delimiters = options.delimiters;

	  var stack = [];
	  var preserveWhitespace = options.preserveWhitespace !== false;
	  var root;
	  var currentParent;
	  var inVPre = false;
	  var inPre = false;
	  var warned = false;

	  function warnOnce (msg) {
	    if (!warned) {
	      warned = true;
	      warn$2(msg);
	    }
	  }

	  function endPre (element) {
	    // check pre state
	    if (element.pre) {
	      inVPre = false;
	    }
	    if (platformIsPreTag(element.tag)) {
	      inPre = false;
	    }
	  }

	  parseHTML(template, {
	    warn: warn$2,
	    expectHTML: options.expectHTML,
	    isUnaryTag: options.isUnaryTag,
	    canBeLeftOpenTag: options.canBeLeftOpenTag,
	    shouldDecodeNewlines: options.shouldDecodeNewlines,
	    start: function start (tag, attrs, unary) {
	      // check namespace.
	      // inherit parent ns if there is one
	      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

	      // handle IE svg bug
	      /* istanbul ignore if */
	      if (isIE && ns === 'svg') {
	        attrs = guardIESVGBug(attrs);
	      }

	      var element = {
	        type: 1,
	        tag: tag,
	        attrsList: attrs,
	        attrsMap: makeAttrsMap(attrs),
	        parent: currentParent,
	        children: []
	      };
	      if (ns) {
	        element.ns = ns;
	      }

	      if (isForbiddenTag(element) && !isServerRendering()) {
	        element.forbidden = true;
	        "development" !== 'production' && warn$2(
	          'Templates should only be responsible for mapping the state to the ' +
	          'UI. Avoid placing tags with side-effects in your templates, such as ' +
	          "<" + tag + ">" + ', as they will not be parsed.'
	        );
	      }

	      // apply pre-transforms
	      for (var i = 0; i < preTransforms.length; i++) {
	        preTransforms[i](element, options);
	      }

	      if (!inVPre) {
	        processPre(element);
	        if (element.pre) {
	          inVPre = true;
	        }
	      }
	      if (platformIsPreTag(element.tag)) {
	        inPre = true;
	      }
	      if (inVPre) {
	        processRawAttrs(element);
	      } else {
	        processFor(element);
	        processIf(element);
	        processOnce(element);
	        processKey(element);

	        // determine whether this is a plain element after
	        // removing structural attributes
	        element.plain = !element.key && !attrs.length;

	        processRef(element);
	        processSlot(element);
	        processComponent(element);
	        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
	          transforms[i$1](element, options);
	        }
	        processAttrs(element);
	      }

	      function checkRootConstraints (el) {
	        {
	          if (el.tag === 'slot' || el.tag === 'template') {
	            warnOnce(
	              "Cannot use <" + (el.tag) + "> as component root element because it may " +
	              'contain multiple nodes.'
	            );
	          }
	          if (el.attrsMap.hasOwnProperty('v-for')) {
	            warnOnce(
	              'Cannot use v-for on stateful component root element because ' +
	              'it renders multiple elements.'
	            );
	          }
	        }
	      }

	      // tree management
	      if (!root) {
	        root = element;
	        checkRootConstraints(root);
	      } else if (!stack.length) {
	        // allow root elements with v-if, v-else-if and v-else
	        if (root.if && (element.elseif || element.else)) {
	          checkRootConstraints(element);
	          addIfCondition(root, {
	            exp: element.elseif,
	            block: element
	          });
	        } else {
	          warnOnce(
	            "Component template should contain exactly one root element. " +
	            "If you are using v-if on multiple elements, " +
	            "use v-else-if to chain them instead."
	          );
	        }
	      }
	      if (currentParent && !element.forbidden) {
	        if (element.elseif || element.else) {
	          processIfConditions(element, currentParent);
	        } else if (element.slotScope) { // scoped slot
	          currentParent.plain = false;
	          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
	        } else {
	          currentParent.children.push(element);
	          element.parent = currentParent;
	        }
	      }
	      if (!unary) {
	        currentParent = element;
	        stack.push(element);
	      } else {
	        endPre(element);
	      }
	      // apply post-transforms
	      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
	        postTransforms[i$2](element, options);
	      }
	    },

	    end: function end () {
	      // remove trailing whitespace
	      var element = stack[stack.length - 1];
	      var lastNode = element.children[element.children.length - 1];
	      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
	        element.children.pop();
	      }
	      // pop stack
	      stack.length -= 1;
	      currentParent = stack[stack.length - 1];
	      endPre(element);
	    },

	    chars: function chars (text) {
	      if (!currentParent) {
	        {
	          if (text === template) {
	            warnOnce(
	              'Component template requires a root element, rather than just text.'
	            );
	          } else if ((text = text.trim())) {
	            warnOnce(
	              ("text \"" + text + "\" outside root element will be ignored.")
	            );
	          }
	        }
	        return
	      }
	      // IE textarea placeholder bug
	      /* istanbul ignore if */
	      if (isIE &&
	          currentParent.tag === 'textarea' &&
	          currentParent.attrsMap.placeholder === text) {
	        return
	      }
	      var children = currentParent.children;
	      text = inPre || text.trim()
	        ? decodeHTMLCached(text)
	        // only preserve whitespace if its not right after a starting tag
	        : preserveWhitespace && children.length ? ' ' : '';
	      if (text) {
	        var expression;
	        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
	          children.push({
	            type: 2,
	            expression: expression,
	            text: text
	          });
	        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
	          children.push({
	            type: 3,
	            text: text
	          });
	        }
	      }
	    }
	  });
	  return root
	}

	function processPre (el) {
	  if (getAndRemoveAttr(el, 'v-pre') != null) {
	    el.pre = true;
	  }
	}

	function processRawAttrs (el) {
	  var l = el.attrsList.length;
	  if (l) {
	    var attrs = el.attrs = new Array(l);
	    for (var i = 0; i < l; i++) {
	      attrs[i] = {
	        name: el.attrsList[i].name,
	        value: JSON.stringify(el.attrsList[i].value)
	      };
	    }
	  } else if (!el.pre) {
	    // non root node in pre blocks with no attributes
	    el.plain = true;
	  }
	}

	function processKey (el) {
	  var exp = getBindingAttr(el, 'key');
	  if (exp) {
	    if ("development" !== 'production' && el.tag === 'template') {
	      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
	    }
	    el.key = exp;
	  }
	}

	function processRef (el) {
	  var ref = getBindingAttr(el, 'ref');
	  if (ref) {
	    el.ref = ref;
	    el.refInFor = checkInFor(el);
	  }
	}

	function processFor (el) {
	  var exp;
	  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
	    var inMatch = exp.match(forAliasRE);
	    if (!inMatch) {
	      "development" !== 'production' && warn$2(
	        ("Invalid v-for expression: " + exp)
	      );
	      return
	    }
	    el.for = inMatch[2].trim();
	    var alias = inMatch[1].trim();
	    var iteratorMatch = alias.match(forIteratorRE);
	    if (iteratorMatch) {
	      el.alias = iteratorMatch[1].trim();
	      el.iterator1 = iteratorMatch[2].trim();
	      if (iteratorMatch[3]) {
	        el.iterator2 = iteratorMatch[3].trim();
	      }
	    } else {
	      el.alias = alias;
	    }
	  }
	}

	function processIf (el) {
	  var exp = getAndRemoveAttr(el, 'v-if');
	  if (exp) {
	    el.if = exp;
	    addIfCondition(el, {
	      exp: exp,
	      block: el
	    });
	  } else {
	    if (getAndRemoveAttr(el, 'v-else') != null) {
	      el.else = true;
	    }
	    var elseif = getAndRemoveAttr(el, 'v-else-if');
	    if (elseif) {
	      el.elseif = elseif;
	    }
	  }
	}

	function processIfConditions (el, parent) {
	  var prev = findPrevElement(parent.children);
	  if (prev && prev.if) {
	    addIfCondition(prev, {
	      exp: el.elseif,
	      block: el
	    });
	  } else {
	    warn$2(
	      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
	      "used on element <" + (el.tag) + "> without corresponding v-if."
	    );
	  }
	}

	function findPrevElement (children) {
	  var i = children.length;
	  while (i--) {
	    if (children[i].type === 1) {
	      return children[i]
	    } else {
	      if ("development" !== 'production' && children[i].text !== ' ') {
	        warn$2(
	          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
	          "will be ignored."
	        );
	      }
	      children.pop();
	    }
	  }
	}

	function addIfCondition (el, condition) {
	  if (!el.ifConditions) {
	    el.ifConditions = [];
	  }
	  el.ifConditions.push(condition);
	}

	function processOnce (el) {
	  var once$$1 = getAndRemoveAttr(el, 'v-once');
	  if (once$$1 != null) {
	    el.once = true;
	  }
	}

	function processSlot (el) {
	  if (el.tag === 'slot') {
	    el.slotName = getBindingAttr(el, 'name');
	    if ("development" !== 'production' && el.key) {
	      warn$2(
	        "`key` does not work on <slot> because slots are abstract outlets " +
	        "and can possibly expand into multiple elements. " +
	        "Use the key on a wrapping element instead."
	      );
	    }
	  } else {
	    var slotTarget = getBindingAttr(el, 'slot');
	    if (slotTarget) {
	      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
	    }
	    if (el.tag === 'template') {
	      el.slotScope = getAndRemoveAttr(el, 'scope');
	    }
	  }
	}

	function processComponent (el) {
	  var binding;
	  if ((binding = getBindingAttr(el, 'is'))) {
	    el.component = binding;
	  }
	  if (getAndRemoveAttr(el, 'inline-template') != null) {
	    el.inlineTemplate = true;
	  }
	}

	function processAttrs (el) {
	  var list = el.attrsList;
	  var i, l, name, rawName, value, modifiers, isProp;
	  for (i = 0, l = list.length; i < l; i++) {
	    name = rawName = list[i].name;
	    value = list[i].value;
	    if (dirRE.test(name)) {
	      // mark element as dynamic
	      el.hasBindings = true;
	      // modifiers
	      modifiers = parseModifiers(name);
	      if (modifiers) {
	        name = name.replace(modifierRE, '');
	      }
	      if (bindRE.test(name)) { // v-bind
	        name = name.replace(bindRE, '');
	        value = parseFilters(value);
	        isProp = false;
	        if (modifiers) {
	          if (modifiers.prop) {
	            isProp = true;
	            name = camelize(name);
	            if (name === 'innerHtml') { name = 'innerHTML'; }
	          }
	          if (modifiers.camel) {
	            name = camelize(name);
	          }
	        }
	        if (isProp || platformMustUseProp(el.tag, el.attrsMap.type, name)) {
	          addProp(el, name, value);
	        } else {
	          addAttr(el, name, value);
	        }
	      } else if (onRE.test(name)) { // v-on
	        name = name.replace(onRE, '');
	        addHandler(el, name, value, modifiers);
	      } else { // normal directives
	        name = name.replace(dirRE, '');
	        // parse arg
	        var argMatch = name.match(argRE);
	        var arg = argMatch && argMatch[1];
	        if (arg) {
	          name = name.slice(0, -(arg.length + 1));
	        }
	        addDirective(el, name, rawName, value, arg, modifiers);
	        if ("development" !== 'production' && name === 'model') {
	          checkForAliasModel(el, value);
	        }
	      }
	    } else {
	      // literal attribute
	      {
	        var expression = parseText(value, delimiters);
	        if (expression) {
	          warn$2(
	            name + "=\"" + value + "\": " +
	            'Interpolation inside attributes has been removed. ' +
	            'Use v-bind or the colon shorthand instead. For example, ' +
	            'instead of <div id="{{ val }}">, use <div :id="val">.'
	          );
	        }
	      }
	      addAttr(el, name, JSON.stringify(value));
	    }
	  }
	}

	function checkInFor (el) {
	  var parent = el;
	  while (parent) {
	    if (parent.for !== undefined) {
	      return true
	    }
	    parent = parent.parent;
	  }
	  return false
	}

	function parseModifiers (name) {
	  var match = name.match(modifierRE);
	  if (match) {
	    var ret = {};
	    match.forEach(function (m) { ret[m.slice(1)] = true; });
	    return ret
	  }
	}

	function makeAttrsMap (attrs) {
	  var map = {};
	  for (var i = 0, l = attrs.length; i < l; i++) {
	    if ("development" !== 'production' && map[attrs[i].name] && !isIE) {
	      warn$2('duplicate attribute: ' + attrs[i].name);
	    }
	    map[attrs[i].name] = attrs[i].value;
	  }
	  return map
	}

	function isForbiddenTag (el) {
	  return (
	    el.tag === 'style' ||
	    (el.tag === 'script' && (
	      !el.attrsMap.type ||
	      el.attrsMap.type === 'text/javascript'
	    ))
	  )
	}

	var ieNSBug = /^xmlns:NS\d+/;
	var ieNSPrefix = /^NS\d+:/;

	/* istanbul ignore next */
	function guardIESVGBug (attrs) {
	  var res = [];
	  for (var i = 0; i < attrs.length; i++) {
	    var attr = attrs[i];
	    if (!ieNSBug.test(attr.name)) {
	      attr.name = attr.name.replace(ieNSPrefix, '');
	      res.push(attr);
	    }
	  }
	  return res
	}

	function checkForAliasModel (el, value) {
	  var _el = el;
	  while (_el) {
	    if (_el.for && _el.alias === value) {
	      warn$2(
	        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
	        "You are binding v-model directly to a v-for iteration alias. " +
	        "This will not be able to modify the v-for source array because " +
	        "writing to the alias is like modifying a function local variable. " +
	        "Consider using an array of objects and use v-model on an object property instead."
	      );
	    }
	    _el = _el.parent;
	  }
	}

	/*  */

	var isStaticKey;
	var isPlatformReservedTag;

	var genStaticKeysCached = cached(genStaticKeys$1);

	/**
	 * Goal of the optimizer: walk the generated template AST tree
	 * and detect sub-trees that are purely static, i.e. parts of
	 * the DOM that never needs to change.
	 *
	 * Once we detect these sub-trees, we can:
	 *
	 * 1. Hoist them into constants, so that we no longer need to
	 *    create fresh nodes for them on each re-render;
	 * 2. Completely skip them in the patching process.
	 */
	function optimize (root, options) {
	  if (!root) { return }
	  isStaticKey = genStaticKeysCached(options.staticKeys || '');
	  isPlatformReservedTag = options.isReservedTag || no;
	  // first pass: mark all non-static nodes.
	  markStatic$1(root);
	  // second pass: mark static roots.
	  markStaticRoots(root, false);
	}

	function genStaticKeys$1 (keys) {
	  return makeMap(
	    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
	    (keys ? ',' + keys : '')
	  )
	}

	function markStatic$1 (node) {
	  node.static = isStatic(node);
	  if (node.type === 1) {
	    // do not make component slot content static. this avoids
	    // 1. components not able to mutate slot nodes
	    // 2. static slot content fails for hot-reloading
	    if (
	      !isPlatformReservedTag(node.tag) &&
	      node.tag !== 'slot' &&
	      node.attrsMap['inline-template'] == null
	    ) {
	      return
	    }
	    for (var i = 0, l = node.children.length; i < l; i++) {
	      var child = node.children[i];
	      markStatic$1(child);
	      if (!child.static) {
	        node.static = false;
	      }
	    }
	  }
	}

	function markStaticRoots (node, isInFor) {
	  if (node.type === 1) {
	    if (node.static || node.once) {
	      node.staticInFor = isInFor;
	    }
	    // For a node to qualify as a static root, it should have children that
	    // are not just static text. Otherwise the cost of hoisting out will
	    // outweigh the benefits and it's better off to just always render it fresh.
	    if (node.static && node.children.length && !(
	      node.children.length === 1 &&
	      node.children[0].type === 3
	    )) {
	      node.staticRoot = true;
	      return
	    } else {
	      node.staticRoot = false;
	    }
	    if (node.children) {
	      for (var i = 0, l = node.children.length; i < l; i++) {
	        markStaticRoots(node.children[i], isInFor || !!node.for);
	      }
	    }
	    if (node.ifConditions) {
	      walkThroughConditionsBlocks(node.ifConditions, isInFor);
	    }
	  }
	}

	function walkThroughConditionsBlocks (conditionBlocks, isInFor) {
	  for (var i = 1, len = conditionBlocks.length; i < len; i++) {
	    markStaticRoots(conditionBlocks[i].block, isInFor);
	  }
	}

	function isStatic (node) {
	  if (node.type === 2) { // expression
	    return false
	  }
	  if (node.type === 3) { // text
	    return true
	  }
	  return !!(node.pre || (
	    !node.hasBindings && // no dynamic bindings
	    !node.if && !node.for && // not v-if or v-for or v-else
	    !isBuiltInTag(node.tag) && // not a built-in
	    isPlatformReservedTag(node.tag) && // not a component
	    !isDirectChildOfTemplateFor(node) &&
	    Object.keys(node).every(isStaticKey)
	  ))
	}

	function isDirectChildOfTemplateFor (node) {
	  while (node.parent) {
	    node = node.parent;
	    if (node.tag !== 'template') {
	      return false
	    }
	    if (node.for) {
	      return true
	    }
	  }
	  return false
	}

	/*  */

	var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
	var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40,
	  'delete': [8, 46]
	};

	// #4868: modifiers that prevent the execution of the listener
	// need to explicitly return null so that we can determine whether to remove
	// the listener for .once
	var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

	var modifierCode = {
	  stop: '$event.stopPropagation();',
	  prevent: '$event.preventDefault();',
	  self: genGuard("$event.target !== $event.currentTarget"),
	  ctrl: genGuard("!$event.ctrlKey"),
	  shift: genGuard("!$event.shiftKey"),
	  alt: genGuard("!$event.altKey"),
	  meta: genGuard("!$event.metaKey"),
	  left: genGuard("'button' in $event && $event.button !== 0"),
	  middle: genGuard("'button' in $event && $event.button !== 1"),
	  right: genGuard("'button' in $event && $event.button !== 2")
	};

	function genHandlers (events, native) {
	  var res = native ? 'nativeOn:{' : 'on:{';
	  for (var name in events) {
	    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
	  }
	  return res.slice(0, -1) + '}'
	}

	function genHandler (
	  name,
	  handler
	) {
	  if (!handler) {
	    return 'function(){}'
	  }

	  if (Array.isArray(handler)) {
	    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
	  }

	  var isMethodPath = simplePathRE.test(handler.value);
	  var isFunctionExpression = fnExpRE.test(handler.value);

	  if (!handler.modifiers) {
	    return isMethodPath || isFunctionExpression
	      ? handler.value
	      : ("function($event){" + (handler.value) + "}") // inline statement
	  } else {
	    var code = '';
	    var genModifierCode = '';
	    var keys = [];
	    for (var key in handler.modifiers) {
	      if (modifierCode[key]) {
	        genModifierCode += modifierCode[key];
	        // left/right
	        if (keyCodes[key]) {
	          keys.push(key);
	        }
	      } else {
	        keys.push(key);
	      }
	    }
	    if (keys.length) {
	      code += genKeyFilter(keys);
	    }
	    // Make sure modifiers like prevent and stop get executed after key filtering
	    if (genModifierCode) {
	      code += genModifierCode;
	    }
	    var handlerCode = isMethodPath
	      ? handler.value + '($event)'
	      : isFunctionExpression
	        ? ("(" + (handler.value) + ")($event)")
	        : handler.value;
	    return ("function($event){" + code + handlerCode + "}")
	  }
	}

	function genKeyFilter (keys) {
	  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
	}

	function genFilterCode (key) {
	  var keyVal = parseInt(key, 10);
	  if (keyVal) {
	    return ("$event.keyCode!==" + keyVal)
	  }
	  var alias = keyCodes[key];
	  return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
	}

	/*  */

	function bind$1 (el, dir) {
	  el.wrapData = function (code) {
	    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")")
	  };
	}

	/*  */

	var baseDirectives = {
	  bind: bind$1,
	  cloak: noop
	};

	/*  */

	// configurable state
	var warn$3;
	var transforms$1;
	var dataGenFns;
	var platformDirectives$1;
	var isPlatformReservedTag$1;
	var staticRenderFns;
	var onceCount;
	var currentOptions;

	function generate (
	  ast,
	  options
	) {
	  // save previous staticRenderFns so generate calls can be nested
	  var prevStaticRenderFns = staticRenderFns;
	  var currentStaticRenderFns = staticRenderFns = [];
	  var prevOnceCount = onceCount;
	  onceCount = 0;
	  currentOptions = options;
	  warn$3 = options.warn || baseWarn;
	  transforms$1 = pluckModuleFunction(options.modules, 'transformCode');
	  dataGenFns = pluckModuleFunction(options.modules, 'genData');
	  platformDirectives$1 = options.directives || {};
	  isPlatformReservedTag$1 = options.isReservedTag || no;
	  var code = ast ? genElement(ast) : '_c("div")';
	  staticRenderFns = prevStaticRenderFns;
	  onceCount = prevOnceCount;
	  return {
	    render: ("with(this){return " + code + "}"),
	    staticRenderFns: currentStaticRenderFns
	  }
	}

	function genElement (el) {
	  if (el.staticRoot && !el.staticProcessed) {
	    return genStatic(el)
	  } else if (el.once && !el.onceProcessed) {
	    return genOnce(el)
	  } else if (el.for && !el.forProcessed) {
	    return genFor(el)
	  } else if (el.if && !el.ifProcessed) {
	    return genIf(el)
	  } else if (el.tag === 'template' && !el.slotTarget) {
	    return genChildren(el) || 'void 0'
	  } else if (el.tag === 'slot') {
	    return genSlot(el)
	  } else {
	    // component or element
	    var code;
	    if (el.component) {
	      code = genComponent(el.component, el);
	    } else {
	      var data = el.plain ? undefined : genData(el);

	      var children = el.inlineTemplate ? null : genChildren(el, true);
	      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
	    }
	    // module transforms
	    for (var i = 0; i < transforms$1.length; i++) {
	      code = transforms$1[i](el, code);
	    }
	    return code
	  }
	}

	// hoist static sub-trees out
	function genStatic (el) {
	  el.staticProcessed = true;
	  staticRenderFns.push(("with(this){return " + (genElement(el)) + "}"));
	  return ("_m(" + (staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
	}

	// v-once
	function genOnce (el) {
	  el.onceProcessed = true;
	  if (el.if && !el.ifProcessed) {
	    return genIf(el)
	  } else if (el.staticInFor) {
	    var key = '';
	    var parent = el.parent;
	    while (parent) {
	      if (parent.for) {
	        key = parent.key;
	        break
	      }
	      parent = parent.parent;
	    }
	    if (!key) {
	      "development" !== 'production' && warn$3(
	        "v-once can only be used inside v-for that is keyed. "
	      );
	      return genElement(el)
	    }
	    return ("_o(" + (genElement(el)) + "," + (onceCount++) + (key ? ("," + key) : "") + ")")
	  } else {
	    return genStatic(el)
	  }
	}

	function genIf (el) {
	  el.ifProcessed = true; // avoid recursion
	  return genIfConditions(el.ifConditions.slice())
	}

	function genIfConditions (conditions) {
	  if (!conditions.length) {
	    return '_e()'
	  }

	  var condition = conditions.shift();
	  if (condition.exp) {
	    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions)))
	  } else {
	    return ("" + (genTernaryExp(condition.block)))
	  }

	  // v-if with v-once should generate code like (a)?_m(0):_m(1)
	  function genTernaryExp (el) {
	    return el.once ? genOnce(el) : genElement(el)
	  }
	}

	function genFor (el) {
	  var exp = el.for;
	  var alias = el.alias;
	  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
	  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

	  if (
	    "development" !== 'production' &&
	    maybeComponent(el) && el.tag !== 'slot' && el.tag !== 'template' && !el.key
	  ) {
	    warn$3(
	      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
	      "v-for should have explicit keys. " +
	      "See https://vuejs.org/guide/list.html#key for more info.",
	      true /* tip */
	    );
	  }

	  el.forProcessed = true; // avoid recursion
	  return "_l((" + exp + ")," +
	    "function(" + alias + iterator1 + iterator2 + "){" +
	      "return " + (genElement(el)) +
	    '})'
	}

	function genData (el) {
	  var data = '{';

	  // directives first.
	  // directives may mutate the el's other properties before they are generated.
	  var dirs = genDirectives(el);
	  if (dirs) { data += dirs + ','; }

	  // key
	  if (el.key) {
	    data += "key:" + (el.key) + ",";
	  }
	  // ref
	  if (el.ref) {
	    data += "ref:" + (el.ref) + ",";
	  }
	  if (el.refInFor) {
	    data += "refInFor:true,";
	  }
	  // pre
	  if (el.pre) {
	    data += "pre:true,";
	  }
	  // record original tag name for components using "is" attribute
	  if (el.component) {
	    data += "tag:\"" + (el.tag) + "\",";
	  }
	  // module data generation functions
	  for (var i = 0; i < dataGenFns.length; i++) {
	    data += dataGenFns[i](el);
	  }
	  // attributes
	  if (el.attrs) {
	    data += "attrs:{" + (genProps(el.attrs)) + "},";
	  }
	  // DOM props
	  if (el.props) {
	    data += "domProps:{" + (genProps(el.props)) + "},";
	  }
	  // event handlers
	  if (el.events) {
	    data += (genHandlers(el.events)) + ",";
	  }
	  if (el.nativeEvents) {
	    data += (genHandlers(el.nativeEvents, true)) + ",";
	  }
	  // slot target
	  if (el.slotTarget) {
	    data += "slot:" + (el.slotTarget) + ",";
	  }
	  // scoped slots
	  if (el.scopedSlots) {
	    data += (genScopedSlots(el.scopedSlots)) + ",";
	  }
	  // component v-model
	  if (el.model) {
	    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
	  }
	  // inline-template
	  if (el.inlineTemplate) {
	    var inlineTemplate = genInlineTemplate(el);
	    if (inlineTemplate) {
	      data += inlineTemplate + ",";
	    }
	  }
	  data = data.replace(/,$/, '') + '}';
	  // v-bind data wrap
	  if (el.wrapData) {
	    data = el.wrapData(data);
	  }
	  return data
	}

	function genDirectives (el) {
	  var dirs = el.directives;
	  if (!dirs) { return }
	  var res = 'directives:[';
	  var hasRuntime = false;
	  var i, l, dir, needRuntime;
	  for (i = 0, l = dirs.length; i < l; i++) {
	    dir = dirs[i];
	    needRuntime = true;
	    var gen = platformDirectives$1[dir.name] || baseDirectives[dir.name];
	    if (gen) {
	      // compile-time directive that manipulates AST.
	      // returns true if it also needs a runtime counterpart.
	      needRuntime = !!gen(el, dir, warn$3);
	    }
	    if (needRuntime) {
	      hasRuntime = true;
	      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
	    }
	  }
	  if (hasRuntime) {
	    return res.slice(0, -1) + ']'
	  }
	}

	function genInlineTemplate (el) {
	  var ast = el.children[0];
	  if ("development" !== 'production' && (
	    el.children.length > 1 || ast.type !== 1
	  )) {
	    warn$3('Inline-template components must have exactly one child element.');
	  }
	  if (ast.type === 1) {
	    var inlineRenderFns = generate(ast, currentOptions);
	    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
	  }
	}

	function genScopedSlots (slots) {
	  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) { return genScopedSlot(key, slots[key]); }).join(',')) + "])")
	}

	function genScopedSlot (key, el) {
	  return "[" + key + ",function(" + (String(el.attrsMap.scope)) + "){" +
	    "return " + (el.tag === 'template'
	      ? genChildren(el) || 'void 0'
	      : genElement(el)) + "}]"
	}

	function genChildren (el, checkSkip) {
	  var children = el.children;
	  if (children.length) {
	    var el$1 = children[0];
	    // optimize single v-for
	    if (children.length === 1 &&
	        el$1.for &&
	        el$1.tag !== 'template' &&
	        el$1.tag !== 'slot') {
	      return genElement(el$1)
	    }
	    var normalizationType = checkSkip ? getNormalizationType(children) : 0;
	    return ("[" + (children.map(genNode).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
	  }
	}

	// determine the normalization needed for the children array.
	// 0: no normalization needed
	// 1: simple normalization needed (possible 1-level deep nested array)
	// 2: full normalization needed
	function getNormalizationType (children) {
	  var res = 0;
	  for (var i = 0; i < children.length; i++) {
	    var el = children[i];
	    if (el.type !== 1) {
	      continue
	    }
	    if (needsNormalization(el) ||
	        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
	      res = 2;
	      break
	    }
	    if (maybeComponent(el) ||
	        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
	      res = 1;
	    }
	  }
	  return res
	}

	function needsNormalization (el) {
	  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
	}

	function maybeComponent (el) {
	  return !isPlatformReservedTag$1(el.tag)
	}

	function genNode (node) {
	  if (node.type === 1) {
	    return genElement(node)
	  } else {
	    return genText(node)
	  }
	}

	function genText (text) {
	  return ("_v(" + (text.type === 2
	    ? text.expression // no need for () because already wrapped in _s()
	    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
	}

	function genSlot (el) {
	  var slotName = el.slotName || '"default"';
	  var children = genChildren(el);
	  var res = "_t(" + slotName + (children ? ("," + children) : '');
	  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
	  var bind$$1 = el.attrsMap['v-bind'];
	  if ((attrs || bind$$1) && !children) {
	    res += ",null";
	  }
	  if (attrs) {
	    res += "," + attrs;
	  }
	  if (bind$$1) {
	    res += (attrs ? '' : ',null') + "," + bind$$1;
	  }
	  return res + ')'
	}

	// componentName is el.component, take it as argument to shun flow's pessimistic refinement
	function genComponent (componentName, el) {
	  var children = el.inlineTemplate ? null : genChildren(el, true);
	  return ("_c(" + componentName + "," + (genData(el)) + (children ? ("," + children) : '') + ")")
	}

	function genProps (props) {
	  var res = '';
	  for (var i = 0; i < props.length; i++) {
	    var prop = props[i];
	    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
	  }
	  return res.slice(0, -1)
	}

	// #3895, #4268
	function transformSpecialNewlines (text) {
	  return text
	    .replace(/\u2028/g, '\\u2028')
	    .replace(/\u2029/g, '\\u2029')
	}

	/*  */

	// these keywords should not appear inside expressions, but operators like
	// typeof, instanceof and in are allowed
	var prohibitedKeywordRE = new RegExp('\\b' + (
	  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
	  'super,throw,while,yield,delete,export,import,return,switch,default,' +
	  'extends,finally,continue,debugger,function,arguments'
	).split(',').join('\\b|\\b') + '\\b');

	// these unary operators should not be used as property/method names
	var unaryOperatorsRE = new RegExp('\\b' + (
	  'delete,typeof,void'
	).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

	// check valid identifier for v-for
	var identRE = /[A-Za-z_$][\w$]*/;

	// strip strings in expressions
	var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

	// detect problematic expressions in a template
	function detectErrors (ast) {
	  var errors = [];
	  if (ast) {
	    checkNode(ast, errors);
	  }
	  return errors
	}

	function checkNode (node, errors) {
	  if (node.type === 1) {
	    for (var name in node.attrsMap) {
	      if (dirRE.test(name)) {
	        var value = node.attrsMap[name];
	        if (value) {
	          if (name === 'v-for') {
	            checkFor(node, ("v-for=\"" + value + "\""), errors);
	          } else if (onRE.test(name)) {
	            checkEvent(value, (name + "=\"" + value + "\""), errors);
	          } else {
	            checkExpression(value, (name + "=\"" + value + "\""), errors);
	          }
	        }
	      }
	    }
	    if (node.children) {
	      for (var i = 0; i < node.children.length; i++) {
	        checkNode(node.children[i], errors);
	      }
	    }
	  } else if (node.type === 2) {
	    checkExpression(node.expression, node.text, errors);
	  }
	}

	function checkEvent (exp, text, errors) {
	  var keywordMatch = exp.replace(stripStringRE, '').match(unaryOperatorsRE);
	  if (keywordMatch) {
	    errors.push(
	      "avoid using JavaScript unary operator as property name: " +
	      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
	    );
	  }
	  checkExpression(exp, text, errors);
	}

	function checkFor (node, text, errors) {
	  checkExpression(node.for || '', text, errors);
	  checkIdentifier(node.alias, 'v-for alias', text, errors);
	  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
	  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
	}

	function checkIdentifier (ident, type, text, errors) {
	  if (typeof ident === 'string' && !identRE.test(ident)) {
	    errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
	  }
	}

	function checkExpression (exp, text, errors) {
	  try {
	    new Function(("return " + exp));
	  } catch (e) {
	    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
	    if (keywordMatch) {
	      errors.push(
	        "avoid using JavaScript keyword as property name: " +
	        "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
	      );
	    } else {
	      errors.push(("invalid expression: " + (text.trim())));
	    }
	  }
	}

	/*  */

	function baseCompile (
	  template,
	  options
	) {
	  var ast = parse(template.trim(), options);
	  optimize(ast, options);
	  var code = generate(ast, options);
	  return {
	    ast: ast,
	    render: code.render,
	    staticRenderFns: code.staticRenderFns
	  }
	}

	function makeFunction (code, errors) {
	  try {
	    return new Function(code)
	  } catch (err) {
	    errors.push({ err: err, code: code });
	    return noop
	  }
	}

	function createCompiler (baseOptions) {
	  var functionCompileCache = Object.create(null);

	  function compile (
	    template,
	    options
	  ) {
	    var finalOptions = Object.create(baseOptions);
	    var errors = [];
	    var tips = [];
	    finalOptions.warn = function (msg, tip$$1) {
	      (tip$$1 ? tips : errors).push(msg);
	    };

	    if (options) {
	      // merge custom modules
	      if (options.modules) {
	        finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
	      }
	      // merge custom directives
	      if (options.directives) {
	        finalOptions.directives = extend(
	          Object.create(baseOptions.directives),
	          options.directives
	        );
	      }
	      // copy other options
	      for (var key in options) {
	        if (key !== 'modules' && key !== 'directives') {
	          finalOptions[key] = options[key];
	        }
	      }
	    }

	    var compiled = baseCompile(template, finalOptions);
	    {
	      errors.push.apply(errors, detectErrors(compiled.ast));
	    }
	    compiled.errors = errors;
	    compiled.tips = tips;
	    return compiled
	  }

	  function compileToFunctions (
	    template,
	    options,
	    vm
	  ) {
	    options = options || {};

	    /* istanbul ignore if */
	    {
	      // detect possible CSP restriction
	      try {
	        new Function('return 1');
	      } catch (e) {
	        if (e.toString().match(/unsafe-eval|CSP/)) {
	          warn(
	            'It seems you are using the standalone build of Vue.js in an ' +
	            'environment with Content Security Policy that prohibits unsafe-eval. ' +
	            'The template compiler cannot work in this environment. Consider ' +
	            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
	            'templates into render functions.'
	          );
	        }
	      }
	    }

	    // check cache
	    var key = options.delimiters
	      ? String(options.delimiters) + template
	      : template;
	    if (functionCompileCache[key]) {
	      return functionCompileCache[key]
	    }

	    // compile
	    var compiled = compile(template, options);

	    // check compilation errors/tips
	    {
	      if (compiled.errors && compiled.errors.length) {
	        warn(
	          "Error compiling template:\n\n" + template + "\n\n" +
	          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
	          vm
	        );
	      }
	      if (compiled.tips && compiled.tips.length) {
	        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
	      }
	    }

	    // turn code into functions
	    var res = {};
	    var fnGenErrors = [];
	    res.render = makeFunction(compiled.render, fnGenErrors);
	    var l = compiled.staticRenderFns.length;
	    res.staticRenderFns = new Array(l);
	    for (var i = 0; i < l; i++) {
	      res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i], fnGenErrors);
	    }

	    // check function generation errors.
	    // this should only happen if there is a bug in the compiler itself.
	    // mostly for codegen development use
	    /* istanbul ignore if */
	    {
	      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
	        warn(
	          "Failed to generate render function:\n\n" +
	          fnGenErrors.map(function (ref) {
	            var err = ref.err;
	            var code = ref.code;

	            return ((err.toString()) + " in\n\n" + code + "\n");
	        }).join('\n'),
	          vm
	        );
	      }
	    }

	    return (functionCompileCache[key] = res)
	  }

	  return {
	    compile: compile,
	    compileToFunctions: compileToFunctions
	  }
	}

	/*  */

	function transformNode (el, options) {
	  var warn = options.warn || baseWarn;
	  var staticClass = getAndRemoveAttr(el, 'class');
	  if ("development" !== 'production' && staticClass) {
	    var expression = parseText(staticClass, options.delimiters);
	    if (expression) {
	      warn(
	        "class=\"" + staticClass + "\": " +
	        'Interpolation inside attributes has been removed. ' +
	        'Use v-bind or the colon shorthand instead. For example, ' +
	        'instead of <div class="{{ val }}">, use <div :class="val">.'
	      );
	    }
	  }
	  if (staticClass) {
	    el.staticClass = JSON.stringify(staticClass);
	  }
	  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
	  if (classBinding) {
	    el.classBinding = classBinding;
	  }
	}

	function genData$1 (el) {
	  var data = '';
	  if (el.staticClass) {
	    data += "staticClass:" + (el.staticClass) + ",";
	  }
	  if (el.classBinding) {
	    data += "class:" + (el.classBinding) + ",";
	  }
	  return data
	}

	var klass$1 = {
	  staticKeys: ['staticClass'],
	  transformNode: transformNode,
	  genData: genData$1
	};

	/*  */

	function transformNode$1 (el, options) {
	  var warn = options.warn || baseWarn;
	  var staticStyle = getAndRemoveAttr(el, 'style');
	  if (staticStyle) {
	    /* istanbul ignore if */
	    {
	      var expression = parseText(staticStyle, options.delimiters);
	      if (expression) {
	        warn(
	          "style=\"" + staticStyle + "\": " +
	          'Interpolation inside attributes has been removed. ' +
	          'Use v-bind or the colon shorthand instead. For example, ' +
	          'instead of <div style="{{ val }}">, use <div :style="val">.'
	        );
	      }
	    }
	    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
	  }

	  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
	  if (styleBinding) {
	    el.styleBinding = styleBinding;
	  }
	}

	function genData$2 (el) {
	  var data = '';
	  if (el.staticStyle) {
	    data += "staticStyle:" + (el.staticStyle) + ",";
	  }
	  if (el.styleBinding) {
	    data += "style:(" + (el.styleBinding) + "),";
	  }
	  return data
	}

	var style$1 = {
	  staticKeys: ['staticStyle'],
	  transformNode: transformNode$1,
	  genData: genData$2
	};

	var modules$1 = [
	  klass$1,
	  style$1
	];

	/*  */

	function text (el, dir) {
	  if (dir.value) {
	    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
	  }
	}

	/*  */

	function html (el, dir) {
	  if (dir.value) {
	    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
	  }
	}

	var directives$1 = {
	  model: model,
	  text: text,
	  html: html
	};

	/*  */

	var baseOptions = {
	  expectHTML: true,
	  modules: modules$1,
	  directives: directives$1,
	  isPreTag: isPreTag,
	  isUnaryTag: isUnaryTag,
	  mustUseProp: mustUseProp,
	  canBeLeftOpenTag: canBeLeftOpenTag,
	  isReservedTag: isReservedTag,
	  getTagNamespace: getTagNamespace,
	  staticKeys: genStaticKeys(modules$1)
	};

	var ref$1 = createCompiler(baseOptions);
	var compileToFunctions = ref$1.compileToFunctions;

	/*  */

	var idToTemplate = cached(function (id) {
	  var el = query(id);
	  return el && el.innerHTML
	});

	var mount = Vue$3.prototype.$mount;
	Vue$3.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && query(el);

	  /* istanbul ignore if */
	  if (el === document.body || el === document.documentElement) {
	    "development" !== 'production' && warn(
	      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
	    );
	    return this
	  }

	  var options = this.$options;
	  // resolve template/el and convert to render function
	  if (!options.render) {
	    var template = options.template;
	    if (template) {
	      if (typeof template === 'string') {
	        if (template.charAt(0) === '#') {
	          template = idToTemplate(template);
	          /* istanbul ignore if */
	          if ("development" !== 'production' && !template) {
	            warn(
	              ("Template element not found or is empty: " + (options.template)),
	              this
	            );
	          }
	        }
	      } else if (template.nodeType) {
	        template = template.innerHTML;
	      } else {
	        {
	          warn('invalid template option:' + template, this);
	        }
	        return this
	      }
	    } else if (el) {
	      template = getOuterHTML(el);
	    }
	    if (template) {
	      /* istanbul ignore if */
	      if ("development" !== 'production' && config.performance && mark) {
	        mark('compile');
	      }

	      var ref = compileToFunctions(template, {
	        shouldDecodeNewlines: shouldDecodeNewlines,
	        delimiters: options.delimiters
	      }, this);
	      var render = ref.render;
	      var staticRenderFns = ref.staticRenderFns;
	      options.render = render;
	      options.staticRenderFns = staticRenderFns;

	      /* istanbul ignore if */
	      if ("development" !== 'production' && config.performance && mark) {
	        mark('compile end');
	        measure(((this._name) + " compile"), 'compile', 'compile end');
	      }
	    }
	  }
	  return mount.call(this, el, hydrating)
	};

	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 */
	function getOuterHTML (el) {
	  if (el.outerHTML) {
	    return el.outerHTML
	  } else {
	    var container = document.createElement('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML
	  }
	}

	Vue$3.compile = compileToFunctions;

	return Vue$3;

	})));

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	module.exports = function (t) {
	  function n(e) {
	    if (r[e]) return r[e].exports;var i = r[e] = { exports: {}, id: e, loaded: !1 };return t[e].call(i.exports, i, i.exports, n), i.loaded = !0, i.exports;
	  }var r = {};return n.m = t, n.c = r, n.p = "", n(0);
	}([function (t, n, r) {
	  t.exports = r(1);
	}, function (t, n, r) {
	  "use strict";
	  function e(t) {
	    if (t && t.__esModule) return t;var n = {};if (null != t) for (var r in t) {
	      Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r]);
	    }return n.default = t, n;
	  }function i(t) {
	    return t && t.__esModule ? t : { default: t };
	  }Object.defineProperty(n, "__esModule", { value: !0 });var o = r(2),
	      u = i(o),
	      c = r(3),
	      a = i(c),
	      f = r(6),
	      s = i(f),
	      l = r(5),
	      h = (e(l), r(4)),
	      v = e(h);r(7);var p = function p(t) {
	    var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};t.modulesEnabled = [];for (var r in n.modules) {
	      var e = void 0;switch (r) {case v.MODULE_GA:
	          e = new a.default(), e.init(n.modules[r]);break;case v.MODULE_MIXPANEL:
	          e = new s.default(), e.init(n.modules[r]);}e && t.modulesEnabled.push(e);
	    }n.params && n.params.vueRouter && d(t, n.params.vueRouter, n.params.ignoredViews, n.params.preferredProperty), t.prototype.$multianalytics = t.prototype.$ma = t.analytics = new u.default(t.modulesEnabled);
	  },
	      d = function d(t, n, r) {
	    var e = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "path";return r && (r = r.map(function (t) {
	      return t.toLowerCase();
	    })), n.afterEach(function (n) {
	      r && r.includes(n[e].toLowerCase()) || t.analytics.trackView({ viewName: n.meta.analytics || n[e] });
	    }), r;
	  };n.default = { install: p };
	}, function (t, n) {
	  "use strict";
	  function r(t, n) {
	    if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
	  }Object.defineProperty(n, "__esModule", { value: !0 });var e = function () {
	    function t(t, n) {
	      for (var r = 0; r < n.length; r++) {
	        var e = n[r];e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(t, e.key, e);
	      }
	    }return function (n, r, e) {
	      return r && t(n.prototype, r), e && t(n, e), n;
	    };
	  }(),
	      i = function () {
	    function t(n) {
	      r(this, t), this.modulesEnabled = n;
	    }return e(t, [{ key: "trackView", value: function value() {
	        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
	            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];t.viewName && this.modulesEnabled.forEach(function (r) {
	          n.includes(r.name) || r.trackView(t);
	        });
	      } }, { key: "trackEvent", value: function value() {
	        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
	            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];this.modulesEnabled.forEach(function (r) {
	          n.includes(r.name) || r.trackEvent(t);
	        });
	      } }, { key: "trackException", value: function value() {
	        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
	            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];this.modulesEnabled.forEach(function (r) {
	          n.includes(r.name) || r.trackException(t);
	        });
	      } }, { key: "trackTiming", value: function value() {
	        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
	            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];this.modulesEnabled.forEach(function (r) {
	          n.includes(r.name) || r.trackTiming(t);
	        });
	      } }]), t;
	  }();n.default = i;
	}, function (t, n, r) {
	  "use strict";
	  function e(t, n) {
	    if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
	  }Object.defineProperty(n, "__esModule", { value: !0 });var i = function () {
	    function t(t, n) {
	      for (var r = 0; r < n.length; r++) {
	        var e = n[r];e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(t, e.key, e);
	      }
	    }return function (n, r, e) {
	      return r && t(n.prototype, r), e && t(n, e), n;
	    };
	  }(),
	      o = r(4),
	      u = r(5),
	      c = function () {
	    function t() {
	      e(this, t), this.name = o.MODULE_GA, this.config = {};
	    }return i(t, [{ key: "init", value: function value() {
	        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};!function (t, n, r, e, i, o, u) {
	          t.GoogleAnalyticsObject = i, t[i] = t[i] || function () {
	            (t[i].q = t[i].q || []).push(arguments);
	          }, t[i].l = 1 * new Date(), o = n.createElement(r), u = n.getElementsByTagName(r)[0], o.async = 1, o.src = e, u.parentNode.insertBefore(o, u);
	        }(window, document, "script", "https://www.google-analytics.com/analytics.js", "ga");var n = ["trackingId", "appName", "appVersion"];n.forEach(function (n) {
	          if (!t[n]) throw new Error('VueAnalytics : Please provide a "' + n + '" from the config.');
	        }), this.config.debug = t.debug, ga("create", t.trackingId, "auto"), ga("set", "transport", "beacon"), ga("set", "appName", t.appName), ga("set", "appVersion", t.appVersion);
	      } }, { key: "trackView", value: function value(t) {
	        var n = t.viewName;this.config.debug && (0, u.logDebug)(n);var r = { hitType: "pageview", page: n };ga("send", r);
	      } }, { key: "trackEvent", value: function value(t) {
	        var n = t.category,
	            r = void 0 === n ? "Event" : n,
	            e = t.action,
	            i = t.label,
	            o = void 0 === i ? null : i,
	            c = t.value,
	            a = void 0 === c ? null : c,
	            f = t.callback,
	            s = void 0 === f ? null : f;if (this.config.debug && u.logDebug.apply(void 0, arguments), a) {
	          var l = parseInt(a, 10);a = isNaN(l) ? 0 : l;
	        }var h = { hitType: "event", eventCategory: r, eventAction: e, eventLabel: o, eventValue: a, hitCallback: s };ga("send", h);
	      } }, { key: "trackException", value: function value(t) {
	        var n = t.description,
	            r = void 0 === n ? "" : n,
	            e = t.isFatal,
	            i = void 0 !== e && e;this.config.debug && (0, u.logDebug)({ description: r, isFatal: i }), ga("send", "exception", { exDescription: r, exFatal: i });
	      } }, { key: "trackTiming", value: function value(t, n, r) {
	        var e = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;this.config.debug && (0, u.logDebug)({ timingCategory: t, timingVar: n, timingValue: r, timingLabel: e });var i = { hitType: "timing", timingCategory: t, timingVar: n, timingValue: r };e && (i.timingLabel = e), ga("send", i);
	      } }]), t;
	  }();n.default = c;
	}, function (t, n) {
	  "use strict";
	  Object.defineProperty(n, "__esModule", { value: !0 });n.MODULE_GA = "ga", n.MODULE_MIXPANEL = "mixpanel";
	}, function (t, n) {
	  "use strict";
	  Object.defineProperty(n, "__esModule", { value: !0 });n.logDebug = function (t) {
	    var n;(n = console).log.apply(n, ["VueAnalytics :"].concat(Array.prototype.slice.call(arguments)));
	  }, n.cordovaApp = { bootstrapWindows: function bootstrapWindows() {
	      window.ActiveXObject = void 0, ga("set", "checkProtocolTask", null);
	    } };
	}, function (t, n, r) {
	  "use strict";
	  function e(t, n) {
	    if (!(t instanceof n)) throw new TypeError("Cannot call a class as a function");
	  }Object.defineProperty(n, "__esModule", { value: !0 });var i = function () {
	    function t(t, n) {
	      for (var r = 0; r < n.length; r++) {
	        var e = n[r];e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e && (e.writable = !0), Object.defineProperty(t, e.key, e);
	      }
	    }return function (n, r, e) {
	      return r && t(n.prototype, r), e && t(n, e), n;
	    };
	  }(),
	      o = r(4),
	      u = r(5),
	      c = function () {
	    function t() {
	      e(this, t), this.name = o.MODULE_MIXPANEL, this.config = {};
	    }return i(t, [{ key: "init", value: function value() {
	        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};!function (t, n) {
	          if (!n.__SV) {
	            var r = window;try {
	              var e,
	                  i,
	                  o,
	                  u = r.location,
	                  c = u.hash;e = function e(t, n) {
	                return (i = t.match(RegExp(n + "=([^&]*)"))) ? i[1] : null;
	              }, c && e(c, "state") && (o = JSON.parse(decodeURIComponent(e(c, "state"))), "mpeditor" === o.action && (r.sessionStorage.setItem("_mpcehash", c), history.replaceState(o.desiredHash || "", t.title, u.pathname + u.search)));
	            } catch (t) {}var a, f;window.mixpanel = n, n._i = [], n.init = function (t, r, e) {
	              function i(t, n) {
	                var r = n.split(".");2 == r.length && (t = t[r[0]], n = r[1]), t[n] = function () {
	                  t.push([n].concat(Array.prototype.slice.call(arguments, 0)));
	                };
	              }var o = n;for ("undefined" != typeof e ? o = n[e] = [] : e = "mixpanel", o.people = o.people || [], o.toString = function (t) {
	                var n = "mixpanel";return "mixpanel" !== e && (n += "." + e), t || (n += " (stub)"), n;
	              }, o.people.toString = function () {
	                return o.toString(1) + ".people (stub)";
	              }, a = "disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" "), f = 0; f < a.length; f++) {
	                i(o, a[f]);
	              }n._i.push([t, r, e]);
	            }, n.__SV = 1.2, r = t.createElement("script"), r.type = "text/javascript", r.async = !0, r.src = "undefined" != typeof MIXPANEL_CUSTOM_LIB_URL ? MIXPANEL_CUSTOM_LIB_URL : "file:" === t.location.protocol && "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//) ? "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js" : "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js", e = t.getElementsByTagName("script")[0], e.parentNode.insertBefore(r, e);
	          }
	        }(document, window.mixpanel || []);var n = ["token"];n.forEach(function (n) {
	          if (!t[n]) throw new Error('VueMultianalytics : Please provide a "' + n + '" from the config.');
	        }), this.config.debug = t.debug, mixpanel.init(t.token);
	      } }, { key: "trackView", value: function value(t) {
	        this.config.debug && (0, u.logDebug)(t), mixpanel.track("Page Viewed", { page: t.viewName });
	      } }, { key: "trackEvent", value: function value(t) {
	        var n = (t.category, t.action),
	            r = (t.label, t.value, t.properties),
	            e = void 0 === r ? {} : r,
	            i = t.callback,
	            o = void 0 === i ? null : i;this.config.debug && u.logDebug.apply(void 0, arguments), mixpanel.track(n, e, o);
	      } }, { key: "trackException", value: function value(t) {
	        t.description, t.isFatal;
	      } }, { key: "trackTiming", value: function value(t, n, r) {
	        arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
	      } }]), t;
	  }();n.default = c;
	}, function (t, n, r) {
	  (function (t) {
	    "use strict";
	    function n(t, n, r) {
	      t[n] || Object[e](t, n, { writable: !0, configurable: !0, value: r });
	    }if (r(8), r(299), r(301), t._babelPolyfill) throw new Error("only one instance of babel-polyfill is allowed");t._babelPolyfill = !0;var e = "defineProperty";n(String.prototype, "padLeft", "".padStart), n(String.prototype, "padRight", "".padEnd), "pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (t) {
	      [][t] && n(Array, t, Function.call.bind([][t]));
	    });
	  }).call(n, function () {
	    return this;
	  }());
	}, function (t, n, r) {
	  r(9), r(58), r(59), r(60), r(61), r(63), r(66), r(67), r(68), r(69), r(70), r(71), r(72), r(73), r(74), r(76), r(78), r(80), r(82), r(85), r(86), r(87), r(91), r(93), r(95), r(98), r(99), r(100), r(101), r(103), r(104), r(105), r(106), r(107), r(108), r(109), r(111), r(112), r(113), r(115), r(116), r(117), r(119), r(120), r(121), r(122), r(123), r(124), r(125), r(126), r(127), r(128), r(129), r(130), r(131), r(132), r(137), r(138), r(142), r(143), r(144), r(145), r(147), r(148), r(149), r(150), r(151), r(152), r(153), r(154), r(155), r(156), r(157), r(158), r(159), r(160), r(161), r(162), r(163), r(165), r(166), r(172), r(173), r(175), r(176), r(177), r(181), r(182), r(183), r(184), r(185), r(187), r(188), r(189), r(190), r(193), r(195), r(196), r(197), r(199), r(201), r(203), r(204), r(205), r(207), r(208), r(209), r(210), r(217), r(220), r(221), r(223), r(224), r(227), r(228), r(230), r(231), r(232), r(233), r(234), r(235), r(236), r(237), r(238), r(239), r(240), r(241), r(242), r(243), r(244), r(245), r(246), r(247), r(248), r(250), r(251), r(252), r(253), r(254), r(255), r(257), r(258), r(259), r(260), r(261), r(262), r(263), r(264), r(266), r(267), r(269), r(270), r(271), r(272), r(275), r(276), r(277), r(278), r(279), r(280), r(281), r(282), r(284), r(285), r(286), r(287), r(288), r(289), r(290), r(291), r(292), r(293), r(294), r(297), r(298), t.exports = r(15);
	}, function (t, n, r) {
	  "use strict";
	  var e = r(10),
	      i = r(11),
	      o = r(12),
	      u = r(14),
	      c = r(24),
	      a = r(28).KEY,
	      f = r(13),
	      s = r(29),
	      l = r(30),
	      h = r(25),
	      v = r(31),
	      p = r(32),
	      d = r(33),
	      g = r(35),
	      y = r(48),
	      m = r(51),
	      b = r(18),
	      w = r(38),
	      _ = r(22),
	      x = r(23),
	      S = r(52),
	      E = r(55),
	      O = r(57),
	      P = r(17),
	      M = r(36),
	      F = O.f,
	      k = P.f,
	      j = E.f,
	      _A = e.Symbol,
	      N = e.JSON,
	      I = N && N.stringify,
	      T = "prototype",
	      L = v("_hidden"),
	      R = v("toPrimitive"),
	      C = {}.propertyIsEnumerable,
	      D = s("symbol-registry"),
	      U = s("symbols"),
	      V = s("op-symbols"),
	      G = Object[T],
	      W = "function" == typeof _A,
	      B = e.QObject,
	      z = !B || !B[T] || !B[T].findChild,
	      Y = o && f(function () {
	    return 7 != S(k({}, "a", { get: function get() {
	        return k(this, "a", { value: 7 }).a;
	      } })).a;
	  }) ? function (t, n, r) {
	    var e = F(G, n);e && delete G[n], k(t, n, r), e && t !== G && k(G, n, e);
	  } : k,
	      J = function J(t) {
	    var n = U[t] = S(_A[T]);return n._k = t, n;
	  },
	      X = W && "symbol" == _typeof(_A.iterator) ? function (t) {
	    return "symbol" == (typeof t === "undefined" ? "undefined" : _typeof(t));
	  } : function (t) {
	    return t instanceof _A;
	  },
	      K = function K(t, n, r) {
	    return t === G && K(V, n, r), b(t), n = _(n, !0), b(r), i(U, n) ? (r.enumerable ? (i(t, L) && t[L][n] && (t[L][n] = !1), r = S(r, { enumerable: x(0, !1) })) : (i(t, L) || k(t, L, x(1, {})), t[L][n] = !0), Y(t, n, r)) : k(t, n, r);
	  },
	      q = function q(t, n) {
	    b(t);for (var r, e = y(n = w(n)), i = 0, o = e.length; o > i;) {
	      K(t, r = e[i++], n[r]);
	    }return t;
	  },
	      $ = function $(t, n) {
	    return void 0 === n ? S(t) : q(S(t), n);
	  },
	      H = function H(t) {
	    var n = C.call(this, t = _(t, !0));return !(this === G && i(U, t) && !i(V, t)) && (!(n || !i(this, t) || !i(U, t) || i(this, L) && this[L][t]) || n);
	  },
	      Z = function Z(t, n) {
	    if (t = w(t), n = _(n, !0), t !== G || !i(U, n) || i(V, n)) {
	      var r = F(t, n);return !r || !i(U, n) || i(t, L) && t[L][n] || (r.enumerable = !0), r;
	    }
	  },
	      Q = function Q(t) {
	    for (var n, r = j(w(t)), e = [], o = 0; r.length > o;) {
	      i(U, n = r[o++]) || n == L || n == a || e.push(n);
	    }return e;
	  },
	      tt = function tt(t) {
	    for (var n, r = t === G, e = j(r ? V : w(t)), o = [], u = 0; e.length > u;) {
	      !i(U, n = e[u++]) || r && !i(G, n) || o.push(U[n]);
	    }return o;
	  };W || (_A = function A() {
	    if (this instanceof _A) throw TypeError("Symbol is not a constructor!");var t = h(arguments.length > 0 ? arguments[0] : void 0),
	        n = function n(r) {
	      this === G && n.call(V, r), i(this, L) && i(this[L], t) && (this[L][t] = !1), Y(this, t, x(1, r));
	    };return o && z && Y(G, t, { configurable: !0, set: n }), J(t);
	  }, c(_A[T], "toString", function () {
	    return this._k;
	  }), O.f = Z, P.f = K, r(56).f = E.f = Q, r(50).f = H, r(49).f = tt, o && !r(34) && c(G, "propertyIsEnumerable", H, !0), p.f = function (t) {
	    return J(v(t));
	  }), u(u.G + u.W + u.F * !W, { Symbol: _A });for (var nt = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), rt = 0; nt.length > rt;) {
	    v(nt[rt++]);
	  }for (var nt = M(v.store), rt = 0; nt.length > rt;) {
	    d(nt[rt++]);
	  }u(u.S + u.F * !W, "Symbol", { for: function _for(t) {
	      return i(D, t += "") ? D[t] : D[t] = _A(t);
	    }, keyFor: function keyFor(t) {
	      if (X(t)) return g(D, t);throw TypeError(t + " is not a symbol!");
	    }, useSetter: function useSetter() {
	      z = !0;
	    }, useSimple: function useSimple() {
	      z = !1;
	    } }), u(u.S + u.F * !W, "Object", { create: $, defineProperty: K, defineProperties: q, getOwnPropertyDescriptor: Z, getOwnPropertyNames: Q, getOwnPropertySymbols: tt }), N && u(u.S + u.F * (!W || f(function () {
	    var t = _A();return "[null]" != I([t]) || "{}" != I({ a: t }) || "{}" != I(Object(t));
	  })), "JSON", { stringify: function stringify(t) {
	      if (void 0 !== t && !X(t)) {
	        for (var n, r, e = [t], i = 1; arguments.length > i;) {
	          e.push(arguments[i++]);
	        }return n = e[1], "function" == typeof n && (r = n), !r && m(n) || (n = function n(t, _n) {
	          if (r && (_n = r.call(this, t, _n)), !X(_n)) return _n;
	        }), e[1] = n, I.apply(N, e);
	      }
	    } }), _A[T][R] || r(16)(_A[T], R, _A[T].valueOf), l(_A, "Symbol"), l(Math, "Math", !0), l(e.JSON, "JSON", !0);
	}, function (t, n) {
	  var r = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();"number" == typeof __g && (__g = r);
	}, function (t, n) {
	  var r = {}.hasOwnProperty;t.exports = function (t, n) {
	    return r.call(t, n);
	  };
	}, function (t, n, r) {
	  t.exports = !r(13)(function () {
	    return 7 != Object.defineProperty({}, "a", { get: function get() {
	        return 7;
	      } }).a;
	  });
	}, function (t, n) {
	  t.exports = function (t) {
	    try {
	      return !!t();
	    } catch (t) {
	      return !0;
	    }
	  };
	}, function (t, n, r) {
	  var e = r(10),
	      i = r(15),
	      o = r(16),
	      u = r(24),
	      c = r(26),
	      a = "prototype",
	      f = function f(t, n, r) {
	    var s,
	        l,
	        h,
	        v,
	        p = t & f.F,
	        d = t & f.G,
	        g = t & f.S,
	        y = t & f.P,
	        m = t & f.B,
	        b = d ? e : g ? e[n] || (e[n] = {}) : (e[n] || {})[a],
	        w = d ? i : i[n] || (i[n] = {}),
	        _ = w[a] || (w[a] = {});d && (r = n);for (s in r) {
	      l = !p && b && void 0 !== b[s], h = (l ? b : r)[s], v = m && l ? c(h, e) : y && "function" == typeof h ? c(Function.call, h) : h, b && u(b, s, h, t & f.U), w[s] != h && o(w, s, v), y && _[s] != h && (_[s] = h);
	    }
	  };e.core = i, f.F = 1, f.G = 2, f.S = 4, f.P = 8, f.B = 16, f.W = 32, f.U = 64, f.R = 128, t.exports = f;
	}, function (t, n) {
	  var r = t.exports = { version: "2.4.0" };"number" == typeof __e && (__e = r);
	}, function (t, n, r) {
	  var e = r(17),
	      i = r(23);t.exports = r(12) ? function (t, n, r) {
	    return e.f(t, n, i(1, r));
	  } : function (t, n, r) {
	    return t[n] = r, t;
	  };
	}, function (t, n, r) {
	  var e = r(18),
	      i = r(20),
	      o = r(22),
	      u = Object.defineProperty;n.f = r(12) ? Object.defineProperty : function (t, n, r) {
	    if (e(t), n = o(n, !0), e(r), i) try {
	      return u(t, n, r);
	    } catch (t) {}if ("get" in r || "set" in r) throw TypeError("Accessors not supported!");return "value" in r && (t[n] = r.value), t;
	  };
	}, function (t, n, r) {
	  var e = r(19);t.exports = function (t) {
	    if (!e(t)) throw TypeError(t + " is not an object!");return t;
	  };
	}, function (t, n) {
	  t.exports = function (t) {
	    return "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) ? null !== t : "function" == typeof t;
	  };
	}, function (t, n, r) {
	  t.exports = !r(12) && !r(13)(function () {
	    return 7 != Object.defineProperty(r(21)("div"), "a", { get: function get() {
	        return 7;
	      } }).a;
	  });
	}, function (t, n, r) {
	  var e = r(19),
	      i = r(10).document,
	      o = e(i) && e(i.createElement);t.exports = function (t) {
	    return o ? i.createElement(t) : {};
	  };
	}, function (t, n, r) {
	  var e = r(19);t.exports = function (t, n) {
	    if (!e(t)) return t;var r, i;if (n && "function" == typeof (r = t.toString) && !e(i = r.call(t))) return i;if ("function" == typeof (r = t.valueOf) && !e(i = r.call(t))) return i;if (!n && "function" == typeof (r = t.toString) && !e(i = r.call(t))) return i;throw TypeError("Can't convert object to primitive value");
	  };
	}, function (t, n) {
	  t.exports = function (t, n) {
	    return { enumerable: !(1 & t), configurable: !(2 & t), writable: !(4 & t), value: n };
	  };
	}, function (t, n, r) {
	  var e = r(10),
	      i = r(16),
	      o = r(11),
	      u = r(25)("src"),
	      c = "toString",
	      a = Function[c],
	      f = ("" + a).split(c);r(15).inspectSource = function (t) {
	    return a.call(t);
	  }, (t.exports = function (t, n, r, c) {
	    var a = "function" == typeof r;a && (o(r, "name") || i(r, "name", n)), t[n] !== r && (a && (o(r, u) || i(r, u, t[n] ? "" + t[n] : f.join(String(n)))), t === e ? t[n] = r : c ? t[n] ? t[n] = r : i(t, n, r) : (delete t[n], i(t, n, r)));
	  })(Function.prototype, c, function () {
	    return "function" == typeof this && this[u] || a.call(this);
	  });
	}, function (t, n) {
	  var r = 0,
	      e = Math.random();t.exports = function (t) {
	    return "Symbol(".concat(void 0 === t ? "" : t, ")_", (++r + e).toString(36));
	  };
	}, function (t, n, r) {
	  var e = r(27);t.exports = function (t, n, r) {
	    if (e(t), void 0 === n) return t;switch (r) {case 1:
	        return function (r) {
	          return t.call(n, r);
	        };case 2:
	        return function (r, e) {
	          return t.call(n, r, e);
	        };case 3:
	        return function (r, e, i) {
	          return t.call(n, r, e, i);
	        };}return function () {
	      return t.apply(n, arguments);
	    };
	  };
	}, function (t, n) {
	  t.exports = function (t) {
	    if ("function" != typeof t) throw TypeError(t + " is not a function!");return t;
	  };
	}, function (t, n, r) {
	  var e = r(25)("meta"),
	      i = r(19),
	      o = r(11),
	      u = r(17).f,
	      c = 0,
	      a = Object.isExtensible || function () {
	    return !0;
	  },
	      f = !r(13)(function () {
	    return a(Object.preventExtensions({}));
	  }),
	      s = function s(t) {
	    u(t, e, { value: { i: "O" + ++c, w: {} } });
	  },
	      l = function l(t, n) {
	    if (!i(t)) return "symbol" == (typeof t === "undefined" ? "undefined" : _typeof(t)) ? t : ("string" == typeof t ? "S" : "P") + t;if (!o(t, e)) {
	      if (!a(t)) return "F";if (!n) return "E";s(t);
	    }return t[e].i;
	  },
	      h = function h(t, n) {
	    if (!o(t, e)) {
	      if (!a(t)) return !0;if (!n) return !1;s(t);
	    }return t[e].w;
	  },
	      v = function v(t) {
	    return f && p.NEED && a(t) && !o(t, e) && s(t), t;
	  },
	      p = t.exports = { KEY: e, NEED: !1, fastKey: l, getWeak: h, onFreeze: v };
	}, function (t, n, r) {
	  var e = r(10),
	      i = "__core-js_shared__",
	      o = e[i] || (e[i] = {});t.exports = function (t) {
	    return o[t] || (o[t] = {});
	  };
	}, function (t, n, r) {
	  var e = r(17).f,
	      i = r(11),
	      o = r(31)("toStringTag");t.exports = function (t, n, r) {
	    t && !i(t = r ? t : t.prototype, o) && e(t, o, { configurable: !0, value: n });
	  };
	}, function (t, n, r) {
	  var e = r(29)("wks"),
	      i = r(25),
	      o = r(10).Symbol,
	      u = "function" == typeof o,
	      c = t.exports = function (t) {
	    return e[t] || (e[t] = u && o[t] || (u ? o : i)("Symbol." + t));
	  };c.store = e;
	}, function (t, n, r) {
	  n.f = r(31);
	}, function (t, n, r) {
	  var e = r(10),
	      i = r(15),
	      o = r(34),
	      u = r(32),
	      c = r(17).f;t.exports = function (t) {
	    var n = i.Symbol || (i.Symbol = o ? {} : e.Symbol || {});"_" == t.charAt(0) || t in n || c(n, t, { value: u.f(t) });
	  };
	}, function (t, n) {
	  t.exports = !1;
	}, function (t, n, r) {
	  var e = r(36),
	      i = r(38);t.exports = function (t, n) {
	    for (var r, o = i(t), u = e(o), c = u.length, a = 0; c > a;) {
	      if (o[r = u[a++]] === n) return r;
	    }
	  };
	}, function (t, n, r) {
	  var e = r(37),
	      i = r(47);t.exports = Object.keys || function (t) {
	    return e(t, i);
	  };
	}, function (t, n, r) {
	  var e = r(11),
	      i = r(38),
	      o = r(42)(!1),
	      u = r(46)("IE_PROTO");t.exports = function (t, n) {
	    var r,
	        c = i(t),
	        a = 0,
	        f = [];for (r in c) {
	      r != u && e(c, r) && f.push(r);
	    }for (; n.length > a;) {
	      e(c, r = n[a++]) && (~o(f, r) || f.push(r));
	    }return f;
	  };
	}, function (t, n, r) {
	  var e = r(39),
	      i = r(41);t.exports = function (t) {
	    return e(i(t));
	  };
	}, function (t, n, r) {
	  var e = r(40);t.exports = Object("z").propertyIsEnumerable(0) ? Object : function (t) {
	    return "String" == e(t) ? t.split("") : Object(t);
	  };
	}, function (t, n) {
	  var r = {}.toString;t.exports = function (t) {
	    return r.call(t).slice(8, -1);
	  };
	}, function (t, n) {
	  t.exports = function (t) {
	    if (void 0 == t) throw TypeError("Can't call method on  " + t);return t;
	  };
	}, function (t, n, r) {
	  var e = r(38),
	      i = r(43),
	      o = r(45);t.exports = function (t) {
	    return function (n, r, u) {
	      var c,
	          a = e(n),
	          f = i(a.length),
	          s = o(u, f);if (t && r != r) {
	        for (; f > s;) {
	          if (c = a[s++], c != c) return !0;
	        }
	      } else for (; f > s; s++) {
	        if ((t || s in a) && a[s] === r) return t || s || 0;
	      }return !t && -1;
	    };
	  };
	}, function (t, n, r) {
	  var e = r(44),
	      i = Math.min;t.exports = function (t) {
	    return t > 0 ? i(e(t), 9007199254740991) : 0;
	  };
	}, function (t, n) {
	  var r = Math.ceil,
	      e = Math.floor;t.exports = function (t) {
	    return isNaN(t = +t) ? 0 : (t > 0 ? e : r)(t);
	  };
	}, function (t, n, r) {
	  var e = r(44),
	      i = Math.max,
	      o = Math.min;t.exports = function (t, n) {
	    return t = e(t), t < 0 ? i(t + n, 0) : o(t, n);
	  };
	}, function (t, n, r) {
	  var e = r(29)("keys"),
	      i = r(25);t.exports = function (t) {
	    return e[t] || (e[t] = i(t));
	  };
	}, function (t, n) {
	  t.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
	}, function (t, n, r) {
	  var e = r(36),
	      i = r(49),
	      o = r(50);t.exports = function (t) {
	    var n = e(t),
	        r = i.f;if (r) for (var u, c = r(t), a = o.f, f = 0; c.length > f;) {
	      a.call(t, u = c[f++]) && n.push(u);
	    }return n;
	  };
	}, function (t, n) {
	  n.f = Object.getOwnPropertySymbols;
	}, function (t, n) {
	  n.f = {}.propertyIsEnumerable;
	}, function (t, n, r) {
	  var e = r(40);t.exports = Array.isArray || function (t) {
	    return "Array" == e(t);
	  };
	}, function (t, n, r) {
	  var e = r(18),
	      i = r(53),
	      o = r(47),
	      u = r(46)("IE_PROTO"),
	      c = function c() {},
	      a = "prototype",
	      _f = function f() {
	    var t,
	        n = r(21)("iframe"),
	        e = o.length,
	        i = "<",
	        u = ">";for (n.style.display = "none", r(54).appendChild(n), n.src = "javascript:", t = n.contentWindow.document, t.open(), t.write(i + "script" + u + "document.F=Object" + i + "/script" + u), t.close(), _f = t.F; e--;) {
	      delete _f[a][o[e]];
	    }return _f();
	  };t.exports = Object.create || function (t, n) {
	    var r;return null !== t ? (c[a] = e(t), r = new c(), c[a] = null, r[u] = t) : r = _f(), void 0 === n ? r : i(r, n);
	  };
	}, function (t, n, r) {
	  var e = r(17),
	      i = r(18),
	      o = r(36);t.exports = r(12) ? Object.defineProperties : function (t, n) {
	    i(t);for (var r, u = o(n), c = u.length, a = 0; c > a;) {
	      e.f(t, r = u[a++], n[r]);
	    }return t;
	  };
	}, function (t, n, r) {
	  t.exports = r(10).document && document.documentElement;
	}, function (t, n, r) {
	  var e = r(38),
	      i = r(56).f,
	      o = {}.toString,
	      u = "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
	      c = function c(t) {
	    try {
	      return i(t);
	    } catch (t) {
	      return u.slice();
	    }
	  };t.exports.f = function (t) {
	    return u && "[object Window]" == o.call(t) ? c(t) : i(e(t));
	  };
	}, function (t, n, r) {
	  var e = r(37),
	      i = r(47).concat("length", "prototype");n.f = Object.getOwnPropertyNames || function (t) {
	    return e(t, i);
	  };
	}, function (t, n, r) {
	  var e = r(50),
	      i = r(23),
	      o = r(38),
	      u = r(22),
	      c = r(11),
	      a = r(20),
	      f = Object.getOwnPropertyDescriptor;n.f = r(12) ? f : function (t, n) {
	    if (t = o(t), n = u(n, !0), a) try {
	      return f(t, n);
	    } catch (t) {}if (c(t, n)) return i(!e.f.call(t, n), t[n]);
	  };
	}, function (t, n, r) {
	  var e = r(14);e(e.S, "Object", { create: r(52) });
	}, function (t, n, r) {
	  var e = r(14);e(e.S + e.F * !r(12), "Object", { defineProperty: r(17).f });
	}, function (t, n, r) {
	  var e = r(14);e(e.S + e.F * !r(12), "Object", { defineProperties: r(53) });
	}, function (t, n, r) {
	  var e = r(38),
	      i = r(57).f;r(62)("getOwnPropertyDescriptor", function () {
	    return function (t, n) {
	      return i(e(t), n);
	    };
	  });
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(15),
	      o = r(13);t.exports = function (t, n) {
	    var r = (i.Object || {})[t] || Object[t],
	        u = {};u[t] = n(r), e(e.S + e.F * o(function () {
	      r(1);
	    }), "Object", u);
	  };
	}, function (t, n, r) {
	  var e = r(64),
	      i = r(65);r(62)("getPrototypeOf", function () {
	    return function (t) {
	      return i(e(t));
	    };
	  });
	}, function (t, n, r) {
	  var e = r(41);t.exports = function (t) {
	    return Object(e(t));
	  };
	}, function (t, n, r) {
	  var e = r(11),
	      i = r(64),
	      o = r(46)("IE_PROTO"),
	      u = Object.prototype;t.exports = Object.getPrototypeOf || function (t) {
	    return t = i(t), e(t, o) ? t[o] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? u : null;
	  };
	}, function (t, n, r) {
	  var e = r(64),
	      i = r(36);r(62)("keys", function () {
	    return function (t) {
	      return i(e(t));
	    };
	  });
	}, function (t, n, r) {
	  r(62)("getOwnPropertyNames", function () {
	    return r(55).f;
	  });
	}, function (t, n, r) {
	  var e = r(19),
	      i = r(28).onFreeze;r(62)("freeze", function (t) {
	    return function (n) {
	      return t && e(n) ? t(i(n)) : n;
	    };
	  });
	}, function (t, n, r) {
	  var e = r(19),
	      i = r(28).onFreeze;r(62)("seal", function (t) {
	    return function (n) {
	      return t && e(n) ? t(i(n)) : n;
	    };
	  });
	}, function (t, n, r) {
	  var e = r(19),
	      i = r(28).onFreeze;r(62)("preventExtensions", function (t) {
	    return function (n) {
	      return t && e(n) ? t(i(n)) : n;
	    };
	  });
	}, function (t, n, r) {
	  var e = r(19);r(62)("isFrozen", function (t) {
	    return function (n) {
	      return !e(n) || !!t && t(n);
	    };
	  });
	}, function (t, n, r) {
	  var e = r(19);r(62)("isSealed", function (t) {
	    return function (n) {
	      return !e(n) || !!t && t(n);
	    };
	  });
	}, function (t, n, r) {
	  var e = r(19);r(62)("isExtensible", function (t) {
	    return function (n) {
	      return !!e(n) && (!t || t(n));
	    };
	  });
	}, function (t, n, r) {
	  var e = r(14);e(e.S + e.F, "Object", { assign: r(75) });
	}, function (t, n, r) {
	  "use strict";
	  var e = r(36),
	      i = r(49),
	      o = r(50),
	      u = r(64),
	      c = r(39),
	      a = Object.assign;t.exports = !a || r(13)(function () {
	    var t = {},
	        n = {},
	        r = Symbol(),
	        e = "abcdefghijklmnopqrst";return t[r] = 7, e.split("").forEach(function (t) {
	      n[t] = t;
	    }), 7 != a({}, t)[r] || Object.keys(a({}, n)).join("") != e;
	  }) ? function (t, n) {
	    for (var r = u(t), a = arguments.length, f = 1, s = i.f, l = o.f; a > f;) {
	      for (var h, v = c(arguments[f++]), p = s ? e(v).concat(s(v)) : e(v), d = p.length, g = 0; d > g;) {
	        l.call(v, h = p[g++]) && (r[h] = v[h]);
	      }
	    }return r;
	  } : a;
	}, function (t, n, r) {
	  var e = r(14);e(e.S, "Object", { is: r(77) });
	}, function (t, n) {
	  t.exports = Object.is || function (t, n) {
	    return t === n ? 0 !== t || 1 / t === 1 / n : t != t && n != n;
	  };
	}, function (t, n, r) {
	  var e = r(14);e(e.S, "Object", { setPrototypeOf: r(79).set });
	}, function (t, n, r) {
	  var e = r(19),
	      i = r(18),
	      o = function o(t, n) {
	    if (i(t), !e(n) && null !== n) throw TypeError(n + ": can't set as prototype!");
	  };t.exports = { set: Object.setPrototypeOf || ("__proto__" in {} ? function (t, n, e) {
	      try {
	        e = r(26)(Function.call, r(57).f(Object.prototype, "__proto__").set, 2), e(t, []), n = !(t instanceof Array);
	      } catch (t) {
	        n = !0;
	      }return function (t, r) {
	        return o(t, r), n ? t.__proto__ = r : e(t, r), t;
	      };
	    }({}, !1) : void 0), check: o };
	}, function (t, n, r) {
	  "use strict";
	  var e = r(81),
	      i = {};i[r(31)("toStringTag")] = "z", i + "" != "[object z]" && r(24)(Object.prototype, "toString", function () {
	    return "[object " + e(this) + "]";
	  }, !0);
	}, function (t, n, r) {
	  var e = r(40),
	      i = r(31)("toStringTag"),
	      o = "Arguments" == e(function () {
	    return arguments;
	  }()),
	      u = function u(t, n) {
	    try {
	      return t[n];
	    } catch (t) {}
	  };t.exports = function (t) {
	    var n, r, c;return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof (r = u(n = Object(t), i)) ? r : o ? e(n) : "Object" == (c = e(n)) && "function" == typeof n.callee ? "Arguments" : c;
	  };
	}, function (t, n, r) {
	  var e = r(14);e(e.P, "Function", { bind: r(83) });
	}, function (t, n, r) {
	  "use strict";
	  var e = r(27),
	      i = r(19),
	      o = r(84),
	      u = [].slice,
	      c = {},
	      a = function a(t, n, r) {
	    if (!(n in c)) {
	      for (var e = [], i = 0; i < n; i++) {
	        e[i] = "a[" + i + "]";
	      }c[n] = Function("F,a", "return new F(" + e.join(",") + ")");
	    }return c[n](t, r);
	  };t.exports = Function.bind || function (t) {
	    var n = e(this),
	        r = u.call(arguments, 1),
	        c = function c() {
	      var e = r.concat(u.call(arguments));return this instanceof c ? a(n, e.length, e) : o(n, e, t);
	    };return i(n.prototype) && (c.prototype = n.prototype), c;
	  };
	}, function (t, n) {
	  t.exports = function (t, n, r) {
	    var e = void 0 === r;switch (n.length) {case 0:
	        return e ? t() : t.call(r);case 1:
	        return e ? t(n[0]) : t.call(r, n[0]);case 2:
	        return e ? t(n[0], n[1]) : t.call(r, n[0], n[1]);case 3:
	        return e ? t(n[0], n[1], n[2]) : t.call(r, n[0], n[1], n[2]);case 4:
	        return e ? t(n[0], n[1], n[2], n[3]) : t.call(r, n[0], n[1], n[2], n[3]);}return t.apply(r, n);
	  };
	}, function (t, n, r) {
	  var e = r(17).f,
	      i = r(23),
	      o = r(11),
	      u = Function.prototype,
	      c = /^\s*function ([^ (]*)/,
	      a = "name",
	      f = Object.isExtensible || function () {
	    return !0;
	  };a in u || r(12) && e(u, a, { configurable: !0, get: function get() {
	      try {
	        var t = this,
	            n = ("" + t).match(c)[1];return o(t, a) || !f(t) || e(t, a, i(5, n)), n;
	      } catch (t) {
	        return "";
	      }
	    } });
	}, function (t, n, r) {
	  "use strict";
	  var e = r(19),
	      i = r(65),
	      o = r(31)("hasInstance"),
	      u = Function.prototype;o in u || r(17).f(u, o, { value: function value(t) {
	      if ("function" != typeof this || !e(t)) return !1;if (!e(this.prototype)) return t instanceof this;for (; t = i(t);) {
	        if (this.prototype === t) return !0;
	      }return !1;
	    } });
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(88);e(e.G + e.F * (parseInt != i), { parseInt: i });
	}, function (t, n, r) {
	  var e = r(10).parseInt,
	      i = r(89).trim,
	      o = r(90),
	      u = /^[\-+]?0[xX]/;t.exports = 8 !== e(o + "08") || 22 !== e(o + "0x16") ? function (t, n) {
	    var r = i(String(t), 3);return e(r, n >>> 0 || (u.test(r) ? 16 : 10));
	  } : e;
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(41),
	      o = r(13),
	      u = r(90),
	      c = "[" + u + "]",
	      a = "​",
	      f = RegExp("^" + c + c + "*"),
	      s = RegExp(c + c + "*$"),
	      l = function l(t, n, r) {
	    var i = {},
	        c = o(function () {
	      return !!u[t]() || a[t]() != a;
	    }),
	        f = i[t] = c ? n(h) : u[t];r && (i[r] = f), e(e.P + e.F * c, "String", i);
	  },
	      h = l.trim = function (t, n) {
	    return t = String(i(t)), 1 & n && (t = t.replace(f, "")), 2 & n && (t = t.replace(s, "")), t;
	  };t.exports = l;
	}, function (t, n) {
	  t.exports = "\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF";
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(92);e(e.G + e.F * (parseFloat != i), { parseFloat: i });
	}, function (t, n, r) {
	  var e = r(10).parseFloat,
	      i = r(89).trim;t.exports = 1 / e(r(90) + "-0") !== -(1 / 0) ? function (t) {
	    var n = i(String(t), 3),
	        r = e(n);return 0 === r && "-" == n.charAt(0) ? -0 : r;
	  } : e;
	}, function (t, n, r) {
	  "use strict";
	  var e = r(10),
	      i = r(11),
	      o = r(40),
	      u = r(94),
	      c = r(22),
	      a = r(13),
	      f = r(56).f,
	      s = r(57).f,
	      l = r(17).f,
	      h = r(89).trim,
	      v = "Number",
	      _p = e[v],
	      d = _p,
	      g = _p.prototype,
	      y = o(r(52)(g)) == v,
	      m = "trim" in String.prototype,
	      b = function b(t) {
	    var n = c(t, !1);if ("string" == typeof n && n.length > 2) {
	      n = m ? n.trim() : h(n, 3);var r,
	          e,
	          i,
	          o = n.charCodeAt(0);if (43 === o || 45 === o) {
	        if (r = n.charCodeAt(2), 88 === r || 120 === r) return NaN;
	      } else if (48 === o) {
	        switch (n.charCodeAt(1)) {case 66:case 98:
	            e = 2, i = 49;break;case 79:case 111:
	            e = 8, i = 55;break;default:
	            return +n;}for (var u, a = n.slice(2), f = 0, s = a.length; f < s; f++) {
	          if (u = a.charCodeAt(f), u < 48 || u > i) return NaN;
	        }return parseInt(a, e);
	      }
	    }return +n;
	  };if (!_p(" 0o1") || !_p("0b1") || _p("+0x1")) {
	    _p = function p(t) {
	      var n = arguments.length < 1 ? 0 : t,
	          r = this;return r instanceof _p && (y ? a(function () {
	        g.valueOf.call(r);
	      }) : o(r) != v) ? u(new d(b(n)), r, _p) : b(n);
	    };for (var w, _ = r(12) ? f(d) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","), x = 0; _.length > x; x++) {
	      i(d, w = _[x]) && !i(_p, w) && l(_p, w, s(d, w));
	    }_p.prototype = g, g.constructor = _p, r(24)(e, v, _p);
	  }
	}, function (t, n, r) {
	  var e = r(19),
	      i = r(79).set;t.exports = function (t, n, r) {
	    var o,
	        u = n.constructor;return u !== r && "function" == typeof u && (o = u.prototype) !== r.prototype && e(o) && i && i(t, o), t;
	  };
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(44),
	      o = r(96),
	      u = r(97),
	      c = 1..toFixed,
	      a = Math.floor,
	      f = [0, 0, 0, 0, 0, 0],
	      s = "Number.toFixed: incorrect invocation!",
	      l = "0",
	      h = function h(t, n) {
	    for (var r = -1, e = n; ++r < 6;) {
	      e += t * f[r], f[r] = e % 1e7, e = a(e / 1e7);
	    }
	  },
	      v = function v(t) {
	    for (var n = 6, r = 0; --n >= 0;) {
	      r += f[n], f[n] = a(r / t), r = r % t * 1e7;
	    }
	  },
	      p = function p() {
	    for (var t = 6, n = ""; --t >= 0;) {
	      if ("" !== n || 0 === t || 0 !== f[t]) {
	        var r = String(f[t]);n = "" === n ? r : n + u.call(l, 7 - r.length) + r;
	      }
	    }return n;
	  },
	      d = function d(t, n, r) {
	    return 0 === n ? r : n % 2 === 1 ? d(t, n - 1, r * t) : d(t * t, n / 2, r);
	  },
	      g = function g(t) {
	    for (var n = 0, r = t; r >= 4096;) {
	      n += 12, r /= 4096;
	    }for (; r >= 2;) {
	      n += 1, r /= 2;
	    }return n;
	  };e(e.P + e.F * (!!c && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== 0xde0b6b3a7640080.toFixed(0)) || !r(13)(function () {
	    c.call({});
	  })), "Number", { toFixed: function toFixed(t) {
	      var n,
	          r,
	          e,
	          c,
	          a = o(this, s),
	          f = i(t),
	          y = "",
	          m = l;if (f < 0 || f > 20) throw RangeError(s);if (a != a) return "NaN";if (a <= -1e21 || a >= 1e21) return String(a);if (a < 0 && (y = "-", a = -a), a > 1e-21) if (n = g(a * d(2, 69, 1)) - 69, r = n < 0 ? a * d(2, -n, 1) : a / d(2, n, 1), r *= 4503599627370496, n = 52 - n, n > 0) {
	        for (h(0, r), e = f; e >= 7;) {
	          h(1e7, 0), e -= 7;
	        }for (h(d(10, e, 1), 0), e = n - 1; e >= 23;) {
	          v(1 << 23), e -= 23;
	        }v(1 << e), h(1, 1), v(2), m = p();
	      } else h(0, r), h(1 << -n, 0), m = p() + u.call(l, f);return f > 0 ? (c = m.length, m = y + (c <= f ? "0." + u.call(l, f - c) + m : m.slice(0, c - f) + "." + m.slice(c - f))) : m = y + m, m;
	    } });
	}, function (t, n, r) {
	  var e = r(40);t.exports = function (t, n) {
	    if ("number" != typeof t && "Number" != e(t)) throw TypeError(n);return +t;
	  };
	}, function (t, n, r) {
	  "use strict";
	  var e = r(44),
	      i = r(41);t.exports = function (t) {
	    var n = String(i(this)),
	        r = "",
	        o = e(t);if (o < 0 || o == 1 / 0) throw RangeError("Count can't be negative");for (; o > 0; (o >>>= 1) && (n += n)) {
	      1 & o && (r += n);
	    }return r;
	  };
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(13),
	      o = r(96),
	      u = 1..toPrecision;e(e.P + e.F * (i(function () {
	    return "1" !== u.call(1, void 0);
	  }) || !i(function () {
	    u.call({});
	  })), "Number", { toPrecision: function toPrecision(t) {
	      var n = o(this, "Number#toPrecision: incorrect invocation!");return void 0 === t ? u.call(n) : u.call(n, t);
	    } });
	}, function (t, n, r) {
	  var e = r(14);e(e.S, "Number", { EPSILON: Math.pow(2, -52) });
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(10).isFinite;e(e.S, "Number", { isFinite: function isFinite(t) {
	      return "number" == typeof t && i(t);
	    } });
	}, function (t, n, r) {
	  var e = r(14);e(e.S, "Number", { isInteger: r(102) });
	}, function (t, n, r) {
	  var e = r(19),
	      i = Math.floor;t.exports = function (t) {
	    return !e(t) && isFinite(t) && i(t) === t;
	  };
	}, function (t, n, r) {
	  var e = r(14);e(e.S, "Number", { isNaN: function isNaN(t) {
	      return t != t;
	    } });
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(102),
	      o = Math.abs;e(e.S, "Number", { isSafeInteger: function isSafeInteger(t) {
	      return i(t) && o(t) <= 9007199254740991;
	    } });
	}, function (t, n, r) {
	  var e = r(14);e(e.S, "Number", { MAX_SAFE_INTEGER: 9007199254740991 });
	}, function (t, n, r) {
	  var e = r(14);e(e.S, "Number", { MIN_SAFE_INTEGER: -9007199254740991 });
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(92);e(e.S + e.F * (Number.parseFloat != i), "Number", { parseFloat: i });
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(88);e(e.S + e.F * (Number.parseInt != i), "Number", { parseInt: i });
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(110),
	      o = Math.sqrt,
	      u = Math.acosh;e(e.S + e.F * !(u && 710 == Math.floor(u(Number.MAX_VALUE)) && u(1 / 0) == 1 / 0), "Math", { acosh: function acosh(t) {
	      return (t = +t) < 1 ? NaN : t > 94906265.62425156 ? Math.log(t) + Math.LN2 : i(t - 1 + o(t - 1) * o(t + 1));
	    } });
	}, function (t, n) {
	  t.exports = Math.log1p || function (t) {
	    return (t = +t) > -1e-8 && t < 1e-8 ? t - t * t / 2 : Math.log(1 + t);
	  };
	}, function (t, n, r) {
	  function e(t) {
	    return isFinite(t = +t) && 0 != t ? t < 0 ? -e(-t) : Math.log(t + Math.sqrt(t * t + 1)) : t;
	  }var i = r(14),
	      o = Math.asinh;i(i.S + i.F * !(o && 1 / o(0) > 0), "Math", { asinh: e });
	}, function (t, n, r) {
	  var e = r(14),
	      i = Math.atanh;e(e.S + e.F * !(i && 1 / i(-0) < 0), "Math", { atanh: function atanh(t) {
	      return 0 == (t = +t) ? t : Math.log((1 + t) / (1 - t)) / 2;
	    } });
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(114);
	  e(e.S, "Math", { cbrt: function cbrt(t) {
	      return i(t = +t) * Math.pow(Math.abs(t), 1 / 3);
	    } });
	}, function (t, n) {
	  t.exports = Math.sign || function (t) {
	    return 0 == (t = +t) || t != t ? t : t < 0 ? -1 : 1;
	  };
	}, function (t, n, r) {
	  var e = r(14);e(e.S, "Math", { clz32: function clz32(t) {
	      return (t >>>= 0) ? 31 - Math.floor(Math.log(t + .5) * Math.LOG2E) : 32;
	    } });
	}, function (t, n, r) {
	  var e = r(14),
	      i = Math.exp;e(e.S, "Math", { cosh: function cosh(t) {
	      return (i(t = +t) + i(-t)) / 2;
	    } });
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(118);e(e.S + e.F * (i != Math.expm1), "Math", { expm1: i });
	}, function (t, n) {
	  var r = Math.expm1;t.exports = !r || r(10) > 22025.465794806718 || r(10) < 22025.465794806718 || r(-2e-17) != -2e-17 ? function (t) {
	    return 0 == (t = +t) ? t : t > -1e-6 && t < 1e-6 ? t + t * t / 2 : Math.exp(t) - 1;
	  } : r;
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(114),
	      o = Math.pow,
	      u = o(2, -52),
	      c = o(2, -23),
	      a = o(2, 127) * (2 - c),
	      f = o(2, -126),
	      s = function s(t) {
	    return t + 1 / u - 1 / u;
	  };e(e.S, "Math", { fround: function fround(t) {
	      var n,
	          r,
	          e = Math.abs(t),
	          o = i(t);return e < f ? o * s(e / f / c) * f * c : (n = (1 + c / u) * e, r = n - (n - e), r > a || r != r ? o * (1 / 0) : o * r);
	    } });
	}, function (t, n, r) {
	  var e = r(14),
	      i = Math.abs;e(e.S, "Math", { hypot: function hypot(t, n) {
	      for (var r, e, o = 0, u = 0, c = arguments.length, a = 0; u < c;) {
	        r = i(arguments[u++]), a < r ? (e = a / r, o = o * e * e + 1, a = r) : r > 0 ? (e = r / a, o += e * e) : o += r;
	      }return a === 1 / 0 ? 1 / 0 : a * Math.sqrt(o);
	    } });
	}, function (t, n, r) {
	  var e = r(14),
	      i = Math.imul;e(e.S + e.F * r(13)(function () {
	    return i(4294967295, 5) != -5 || 2 != i.length;
	  }), "Math", { imul: function imul(t, n) {
	      var r = 65535,
	          e = +t,
	          i = +n,
	          o = r & e,
	          u = r & i;return 0 | o * u + ((r & e >>> 16) * u + o * (r & i >>> 16) << 16 >>> 0);
	    } });
	}, function (t, n, r) {
	  var e = r(14);e(e.S, "Math", { log10: function log10(t) {
	      return Math.log(t) / Math.LN10;
	    } });
	}, function (t, n, r) {
	  var e = r(14);e(e.S, "Math", { log1p: r(110) });
	}, function (t, n, r) {
	  var e = r(14);e(e.S, "Math", { log2: function log2(t) {
	      return Math.log(t) / Math.LN2;
	    } });
	}, function (t, n, r) {
	  var e = r(14);e(e.S, "Math", { sign: r(114) });
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(118),
	      o = Math.exp;e(e.S + e.F * r(13)(function () {
	    return !Math.sinh(-2e-17) != -2e-17;
	  }), "Math", { sinh: function sinh(t) {
	      return Math.abs(t = +t) < 1 ? (i(t) - i(-t)) / 2 : (o(t - 1) - o(-t - 1)) * (Math.E / 2);
	    } });
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(118),
	      o = Math.exp;e(e.S, "Math", { tanh: function tanh(t) {
	      var n = i(t = +t),
	          r = i(-t);return n == 1 / 0 ? 1 : r == 1 / 0 ? -1 : (n - r) / (o(t) + o(-t));
	    } });
	}, function (t, n, r) {
	  var e = r(14);e(e.S, "Math", { trunc: function trunc(t) {
	      return (t > 0 ? Math.floor : Math.ceil)(t);
	    } });
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(45),
	      o = String.fromCharCode,
	      u = String.fromCodePoint;e(e.S + e.F * (!!u && 1 != u.length), "String", { fromCodePoint: function fromCodePoint(t) {
	      for (var n, r = [], e = arguments.length, u = 0; e > u;) {
	        if (n = +arguments[u++], i(n, 1114111) !== n) throw RangeError(n + " is not a valid code point");r.push(n < 65536 ? o(n) : o(((n -= 65536) >> 10) + 55296, n % 1024 + 56320));
	      }return r.join("");
	    } });
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(38),
	      o = r(43);e(e.S, "String", { raw: function raw(t) {
	      for (var n = i(t.raw), r = o(n.length), e = arguments.length, u = [], c = 0; r > c;) {
	        u.push(String(n[c++])), c < e && u.push(String(arguments[c]));
	      }return u.join("");
	    } });
	}, function (t, n, r) {
	  "use strict";
	  r(89)("trim", function (t) {
	    return function () {
	      return t(this, 3);
	    };
	  });
	}, function (t, n, r) {
	  "use strict";
	  var e = r(133)(!0);r(134)(String, "String", function (t) {
	    this._t = String(t), this._i = 0;
	  }, function () {
	    var t,
	        n = this._t,
	        r = this._i;return r >= n.length ? { value: void 0, done: !0 } : (t = e(n, r), this._i += t.length, { value: t, done: !1 });
	  });
	}, function (t, n, r) {
	  var e = r(44),
	      i = r(41);t.exports = function (t) {
	    return function (n, r) {
	      var o,
	          u,
	          c = String(i(n)),
	          a = e(r),
	          f = c.length;return a < 0 || a >= f ? t ? "" : void 0 : (o = c.charCodeAt(a), o < 55296 || o > 56319 || a + 1 === f || (u = c.charCodeAt(a + 1)) < 56320 || u > 57343 ? t ? c.charAt(a) : o : t ? c.slice(a, a + 2) : (o - 55296 << 10) + (u - 56320) + 65536);
	    };
	  };
	}, function (t, n, r) {
	  "use strict";
	  var e = r(34),
	      i = r(14),
	      o = r(24),
	      u = r(16),
	      c = r(11),
	      a = r(135),
	      f = r(136),
	      s = r(30),
	      l = r(65),
	      h = r(31)("iterator"),
	      v = !([].keys && "next" in [].keys()),
	      p = "@@iterator",
	      d = "keys",
	      g = "values",
	      y = function y() {
	    return this;
	  };t.exports = function (t, n, r, m, b, w, _) {
	    f(r, n, m);var x,
	        S,
	        E,
	        O = function O(t) {
	      if (!v && t in k) return k[t];switch (t) {case d:
	          return function () {
	            return new r(this, t);
	          };case g:
	          return function () {
	            return new r(this, t);
	          };}return function () {
	        return new r(this, t);
	      };
	    },
	        P = n + " Iterator",
	        M = b == g,
	        F = !1,
	        k = t.prototype,
	        j = k[h] || k[p] || b && k[b],
	        A = j || O(b),
	        N = b ? M ? O("entries") : A : void 0,
	        I = "Array" == n ? k.entries || j : j;if (I && (E = l(I.call(new t())), E !== Object.prototype && (s(E, P, !0), e || c(E, h) || u(E, h, y))), M && j && j.name !== g && (F = !0, A = function A() {
	      return j.call(this);
	    }), e && !_ || !v && !F && k[h] || u(k, h, A), a[n] = A, a[P] = y, b) if (x = { values: M ? A : O(g), keys: w ? A : O(d), entries: N }, _) for (S in x) {
	      S in k || o(k, S, x[S]);
	    } else i(i.P + i.F * (v || F), n, x);return x;
	  };
	}, function (t, n) {
	  t.exports = {};
	}, function (t, n, r) {
	  "use strict";
	  var e = r(52),
	      i = r(23),
	      o = r(30),
	      u = {};r(16)(u, r(31)("iterator"), function () {
	    return this;
	  }), t.exports = function (t, n, r) {
	    t.prototype = e(u, { next: i(1, r) }), o(t, n + " Iterator");
	  };
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(133)(!1);e(e.P, "String", { codePointAt: function codePointAt(t) {
	      return i(this, t);
	    } });
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(43),
	      o = r(139),
	      u = "endsWith",
	      c = ""[u];e(e.P + e.F * r(141)(u), "String", { endsWith: function endsWith(t) {
	      var n = o(this, t, u),
	          r = arguments.length > 1 ? arguments[1] : void 0,
	          e = i(n.length),
	          a = void 0 === r ? e : Math.min(i(r), e),
	          f = String(t);return c ? c.call(n, f, a) : n.slice(a - f.length, a) === f;
	    } });
	}, function (t, n, r) {
	  var e = r(140),
	      i = r(41);t.exports = function (t, n, r) {
	    if (e(n)) throw TypeError("String#" + r + " doesn't accept regex!");return String(i(t));
	  };
	}, function (t, n, r) {
	  var e = r(19),
	      i = r(40),
	      o = r(31)("match");t.exports = function (t) {
	    var n;return e(t) && (void 0 !== (n = t[o]) ? !!n : "RegExp" == i(t));
	  };
	}, function (t, n, r) {
	  var e = r(31)("match");t.exports = function (t) {
	    var n = /./;try {
	      "/./"[t](n);
	    } catch (r) {
	      try {
	        return n[e] = !1, !"/./"[t](n);
	      } catch (t) {}
	    }return !0;
	  };
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(139),
	      o = "includes";e(e.P + e.F * r(141)(o), "String", { includes: function includes(t) {
	      return !!~i(this, t, o).indexOf(t, arguments.length > 1 ? arguments[1] : void 0);
	    } });
	}, function (t, n, r) {
	  var e = r(14);e(e.P, "String", { repeat: r(97) });
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(43),
	      o = r(139),
	      u = "startsWith",
	      c = ""[u];e(e.P + e.F * r(141)(u), "String", { startsWith: function startsWith(t) {
	      var n = o(this, t, u),
	          r = i(Math.min(arguments.length > 1 ? arguments[1] : void 0, n.length)),
	          e = String(t);return c ? c.call(n, e, r) : n.slice(r, r + e.length) === e;
	    } });
	}, function (t, n, r) {
	  "use strict";
	  r(146)("anchor", function (t) {
	    return function (n) {
	      return t(this, "a", "name", n);
	    };
	  });
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(13),
	      o = r(41),
	      u = /"/g,
	      c = function c(t, n, r, e) {
	    var i = String(o(t)),
	        c = "<" + n;return "" !== r && (c += " " + r + '="' + String(e).replace(u, "&quot;") + '"'), c + ">" + i + "</" + n + ">";
	  };t.exports = function (t, n) {
	    var r = {};r[t] = n(c), e(e.P + e.F * i(function () {
	      var n = ""[t]('"');return n !== n.toLowerCase() || n.split('"').length > 3;
	    }), "String", r);
	  };
	}, function (t, n, r) {
	  "use strict";
	  r(146)("big", function (t) {
	    return function () {
	      return t(this, "big", "", "");
	    };
	  });
	}, function (t, n, r) {
	  "use strict";
	  r(146)("blink", function (t) {
	    return function () {
	      return t(this, "blink", "", "");
	    };
	  });
	}, function (t, n, r) {
	  "use strict";
	  r(146)("bold", function (t) {
	    return function () {
	      return t(this, "b", "", "");
	    };
	  });
	}, function (t, n, r) {
	  "use strict";
	  r(146)("fixed", function (t) {
	    return function () {
	      return t(this, "tt", "", "");
	    };
	  });
	}, function (t, n, r) {
	  "use strict";
	  r(146)("fontcolor", function (t) {
	    return function (n) {
	      return t(this, "font", "color", n);
	    };
	  });
	}, function (t, n, r) {
	  "use strict";
	  r(146)("fontsize", function (t) {
	    return function (n) {
	      return t(this, "font", "size", n);
	    };
	  });
	}, function (t, n, r) {
	  "use strict";
	  r(146)("italics", function (t) {
	    return function () {
	      return t(this, "i", "", "");
	    };
	  });
	}, function (t, n, r) {
	  "use strict";
	  r(146)("link", function (t) {
	    return function (n) {
	      return t(this, "a", "href", n);
	    };
	  });
	}, function (t, n, r) {
	  "use strict";
	  r(146)("small", function (t) {
	    return function () {
	      return t(this, "small", "", "");
	    };
	  });
	}, function (t, n, r) {
	  "use strict";
	  r(146)("strike", function (t) {
	    return function () {
	      return t(this, "strike", "", "");
	    };
	  });
	}, function (t, n, r) {
	  "use strict";
	  r(146)("sub", function (t) {
	    return function () {
	      return t(this, "sub", "", "");
	    };
	  });
	}, function (t, n, r) {
	  "use strict";
	  r(146)("sup", function (t) {
	    return function () {
	      return t(this, "sup", "", "");
	    };
	  });
	}, function (t, n, r) {
	  var e = r(14);e(e.S, "Date", { now: function now() {
	      return new Date().getTime();
	    } });
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(64),
	      o = r(22);e(e.P + e.F * r(13)(function () {
	    return null !== new Date(NaN).toJSON() || 1 !== Date.prototype.toJSON.call({ toISOString: function toISOString() {
	        return 1;
	      } });
	  }), "Date", { toJSON: function toJSON(t) {
	      var n = i(this),
	          r = o(n);return "number" != typeof r || isFinite(r) ? n.toISOString() : null;
	    } });
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(13),
	      o = Date.prototype.getTime,
	      u = function u(t) {
	    return t > 9 ? t : "0" + t;
	  };e(e.P + e.F * (i(function () {
	    return "0385-07-25T07:06:39.999Z" != new Date(-5e13 - 1).toISOString();
	  }) || !i(function () {
	    new Date(NaN).toISOString();
	  })), "Date", { toISOString: function toISOString() {
	      if (!isFinite(o.call(this))) throw RangeError("Invalid time value");var t = this,
	          n = t.getUTCFullYear(),
	          r = t.getUTCMilliseconds(),
	          e = n < 0 ? "-" : n > 9999 ? "+" : "";return e + ("00000" + Math.abs(n)).slice(e ? -6 : -4) + "-" + u(t.getUTCMonth() + 1) + "-" + u(t.getUTCDate()) + "T" + u(t.getUTCHours()) + ":" + u(t.getUTCMinutes()) + ":" + u(t.getUTCSeconds()) + "." + (r > 99 ? r : "0" + u(r)) + "Z";
	    } });
	}, function (t, n, r) {
	  var e = Date.prototype,
	      i = "Invalid Date",
	      o = "toString",
	      u = e[o],
	      c = e.getTime;new Date(NaN) + "" != i && r(24)(e, o, function () {
	    var t = c.call(this);return t === t ? u.call(this) : i;
	  });
	}, function (t, n, r) {
	  var e = r(31)("toPrimitive"),
	      i = Date.prototype;e in i || r(16)(i, e, r(164));
	}, function (t, n, r) {
	  "use strict";
	  var e = r(18),
	      i = r(22),
	      o = "number";t.exports = function (t) {
	    if ("string" !== t && t !== o && "default" !== t) throw TypeError("Incorrect hint");return i(e(this), t != o);
	  };
	}, function (t, n, r) {
	  var e = r(14);e(e.S, "Array", { isArray: r(51) });
	}, function (t, n, r) {
	  "use strict";
	  var e = r(26),
	      i = r(14),
	      o = r(64),
	      u = r(167),
	      c = r(168),
	      a = r(43),
	      f = r(169),
	      s = r(170);i(i.S + i.F * !r(171)(function (t) {
	    Array.from(t);
	  }), "Array", { from: function from(t) {
	      var n,
	          r,
	          i,
	          l,
	          h = o(t),
	          v = "function" == typeof this ? this : Array,
	          p = arguments.length,
	          d = p > 1 ? arguments[1] : void 0,
	          g = void 0 !== d,
	          y = 0,
	          m = s(h);if (g && (d = e(d, p > 2 ? arguments[2] : void 0, 2)), void 0 == m || v == Array && c(m)) for (n = a(h.length), r = new v(n); n > y; y++) {
	        f(r, y, g ? d(h[y], y) : h[y]);
	      } else for (l = m.call(h), r = new v(); !(i = l.next()).done; y++) {
	        f(r, y, g ? u(l, d, [i.value, y], !0) : i.value);
	      }return r.length = y, r;
	    } });
	}, function (t, n, r) {
	  var e = r(18);t.exports = function (t, n, r, i) {
	    try {
	      return i ? n(e(r)[0], r[1]) : n(r);
	    } catch (n) {
	      var o = t.return;throw void 0 !== o && e(o.call(t)), n;
	    }
	  };
	}, function (t, n, r) {
	  var e = r(135),
	      i = r(31)("iterator"),
	      o = Array.prototype;t.exports = function (t) {
	    return void 0 !== t && (e.Array === t || o[i] === t);
	  };
	}, function (t, n, r) {
	  "use strict";
	  var e = r(17),
	      i = r(23);t.exports = function (t, n, r) {
	    n in t ? e.f(t, n, i(0, r)) : t[n] = r;
	  };
	}, function (t, n, r) {
	  var e = r(81),
	      i = r(31)("iterator"),
	      o = r(135);t.exports = r(15).getIteratorMethod = function (t) {
	    if (void 0 != t) return t[i] || t["@@iterator"] || o[e(t)];
	  };
	}, function (t, n, r) {
	  var e = r(31)("iterator"),
	      i = !1;try {
	    var o = [7][e]();o.return = function () {
	      i = !0;
	    }, Array.from(o, function () {
	      throw 2;
	    });
	  } catch (t) {}t.exports = function (t, n) {
	    if (!n && !i) return !1;var r = !1;try {
	      var o = [7],
	          u = o[e]();u.next = function () {
	        return { done: r = !0 };
	      }, o[e] = function () {
	        return u;
	      }, t(o);
	    } catch (t) {}return r;
	  };
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(169);e(e.S + e.F * r(13)(function () {
	    function t() {}return !(Array.of.call(t) instanceof t);
	  }), "Array", { of: function of() {
	      for (var t = 0, n = arguments.length, r = new ("function" == typeof this ? this : Array)(n); n > t;) {
	        i(r, t, arguments[t++]);
	      }return r.length = n, r;
	    } });
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(38),
	      o = [].join;e(e.P + e.F * (r(39) != Object || !r(174)(o)), "Array", { join: function join(t) {
	      return o.call(i(this), void 0 === t ? "," : t);
	    } });
	}, function (t, n, r) {
	  var e = r(13);t.exports = function (t, n) {
	    return !!t && e(function () {
	      n ? t.call(null, function () {}, 1) : t.call(null);
	    });
	  };
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(54),
	      o = r(40),
	      u = r(45),
	      c = r(43),
	      a = [].slice;e(e.P + e.F * r(13)(function () {
	    i && a.call(i);
	  }), "Array", { slice: function slice(t, n) {
	      var r = c(this.length),
	          e = o(this);if (n = void 0 === n ? r : n, "Array" == e) return a.call(this, t, n);for (var i = u(t, r), f = u(n, r), s = c(f - i), l = Array(s), h = 0; h < s; h++) {
	        l[h] = "String" == e ? this.charAt(i + h) : this[i + h];
	      }return l;
	    } });
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(27),
	      o = r(64),
	      u = r(13),
	      c = [].sort,
	      a = [1, 2, 3];e(e.P + e.F * (u(function () {
	    a.sort(void 0);
	  }) || !u(function () {
	    a.sort(null);
	  }) || !r(174)(c)), "Array", { sort: function sort(t) {
	      return void 0 === t ? c.call(o(this)) : c.call(o(this), i(t));
	    } });
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(178)(0),
	      o = r(174)([].forEach, !0);e(e.P + e.F * !o, "Array", { forEach: function forEach(t) {
	      return i(this, t, arguments[1]);
	    } });
	}, function (t, n, r) {
	  var e = r(26),
	      i = r(39),
	      o = r(64),
	      u = r(43),
	      c = r(179);t.exports = function (t, n) {
	    var r = 1 == t,
	        a = 2 == t,
	        f = 3 == t,
	        s = 4 == t,
	        l = 6 == t,
	        h = 5 == t || l,
	        v = n || c;return function (n, c, p) {
	      for (var d, g, y = o(n), m = i(y), b = e(c, p, 3), w = u(m.length), _ = 0, x = r ? v(n, w) : a ? v(n, 0) : void 0; w > _; _++) {
	        if ((h || _ in m) && (d = m[_], g = b(d, _, y), t)) if (r) x[_] = g;else if (g) switch (t) {case 3:
	            return !0;case 5:
	            return d;case 6:
	            return _;case 2:
	            x.push(d);} else if (s) return !1;
	      }return l ? -1 : f || s ? s : x;
	    };
	  };
	}, function (t, n, r) {
	  var e = r(180);t.exports = function (t, n) {
	    return new (e(t))(n);
	  };
	}, function (t, n, r) {
	  var e = r(19),
	      i = r(51),
	      o = r(31)("species");t.exports = function (t) {
	    var n;return i(t) && (n = t.constructor, "function" != typeof n || n !== Array && !i(n.prototype) || (n = void 0), e(n) && (n = n[o], null === n && (n = void 0))), void 0 === n ? Array : n;
	  };
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(178)(1);e(e.P + e.F * !r(174)([].map, !0), "Array", { map: function map(t) {
	      return i(this, t, arguments[1]);
	    } });
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(178)(2);e(e.P + e.F * !r(174)([].filter, !0), "Array", { filter: function filter(t) {
	      return i(this, t, arguments[1]);
	    } });
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(178)(3);e(e.P + e.F * !r(174)([].some, !0), "Array", { some: function some(t) {
	      return i(this, t, arguments[1]);
	    } });
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(178)(4);e(e.P + e.F * !r(174)([].every, !0), "Array", { every: function every(t) {
	      return i(this, t, arguments[1]);
	    } });
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(186);e(e.P + e.F * !r(174)([].reduce, !0), "Array", { reduce: function reduce(t) {
	      return i(this, t, arguments.length, arguments[1], !1);
	    } });
	}, function (t, n, r) {
	  var e = r(27),
	      i = r(64),
	      o = r(39),
	      u = r(43);t.exports = function (t, n, r, c, a) {
	    e(n);var f = i(t),
	        s = o(f),
	        l = u(f.length),
	        h = a ? l - 1 : 0,
	        v = a ? -1 : 1;if (r < 2) for (;;) {
	      if (h in s) {
	        c = s[h], h += v;break;
	      }if (h += v, a ? h < 0 : l <= h) throw TypeError("Reduce of empty array with no initial value");
	    }for (; a ? h >= 0 : l > h; h += v) {
	      h in s && (c = n(c, s[h], h, f));
	    }return c;
	  };
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(186);e(e.P + e.F * !r(174)([].reduceRight, !0), "Array", { reduceRight: function reduceRight(t) {
	      return i(this, t, arguments.length, arguments[1], !0);
	    } });
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(42)(!1),
	      o = [].indexOf,
	      u = !!o && 1 / [1].indexOf(1, -0) < 0;e(e.P + e.F * (u || !r(174)(o)), "Array", { indexOf: function indexOf(t) {
	      return u ? o.apply(this, arguments) || 0 : i(this, t, arguments[1]);
	    } });
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(38),
	      o = r(44),
	      u = r(43),
	      c = [].lastIndexOf,
	      a = !!c && 1 / [1].lastIndexOf(1, -0) < 0;e(e.P + e.F * (a || !r(174)(c)), "Array", { lastIndexOf: function lastIndexOf(t) {
	      if (a) return c.apply(this, arguments) || 0;var n = i(this),
	          r = u(n.length),
	          e = r - 1;for (arguments.length > 1 && (e = Math.min(e, o(arguments[1]))), e < 0 && (e = r + e); e >= 0; e--) {
	        if (e in n && n[e] === t) return e || 0;
	      }return -1;
	    } });
	}, function (t, n, r) {
	  var e = r(14);e(e.P, "Array", { copyWithin: r(191) }), r(192)("copyWithin");
	}, function (t, n, r) {
	  "use strict";
	  var e = r(64),
	      i = r(45),
	      o = r(43);t.exports = [].copyWithin || function (t, n) {
	    var r = e(this),
	        u = o(r.length),
	        c = i(t, u),
	        a = i(n, u),
	        f = arguments.length > 2 ? arguments[2] : void 0,
	        s = Math.min((void 0 === f ? u : i(f, u)) - a, u - c),
	        l = 1;for (a < c && c < a + s && (l = -1, a += s - 1, c += s - 1); s-- > 0;) {
	      a in r ? r[c] = r[a] : delete r[c], c += l, a += l;
	    }return r;
	  };
	}, function (t, n, r) {
	  var e = r(31)("unscopables"),
	      i = Array.prototype;void 0 == i[e] && r(16)(i, e, {}), t.exports = function (t) {
	    i[e][t] = !0;
	  };
	}, function (t, n, r) {
	  var e = r(14);e(e.P, "Array", { fill: r(194) }), r(192)("fill");
	}, function (t, n, r) {
	  "use strict";
	  var e = r(64),
	      i = r(45),
	      o = r(43);t.exports = function (t) {
	    for (var n = e(this), r = o(n.length), u = arguments.length, c = i(u > 1 ? arguments[1] : void 0, r), a = u > 2 ? arguments[2] : void 0, f = void 0 === a ? r : i(a, r); f > c;) {
	      n[c++] = t;
	    }return n;
	  };
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(178)(5),
	      o = "find",
	      u = !0;o in [] && Array(1)[o](function () {
	    u = !1;
	  }), e(e.P + e.F * u, "Array", { find: function find(t) {
	      return i(this, t, arguments.length > 1 ? arguments[1] : void 0);
	    } }), r(192)(o);
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(178)(6),
	      o = "findIndex",
	      u = !0;o in [] && Array(1)[o](function () {
	    u = !1;
	  }), e(e.P + e.F * u, "Array", { findIndex: function findIndex(t) {
	      return i(this, t, arguments.length > 1 ? arguments[1] : void 0);
	    } }), r(192)(o);
	}, function (t, n, r) {
	  r(198)("Array");
	}, function (t, n, r) {
	  "use strict";
	  var e = r(10),
	      i = r(17),
	      o = r(12),
	      u = r(31)("species");t.exports = function (t) {
	    var n = e[t];o && n && !n[u] && i.f(n, u, { configurable: !0, get: function get() {
	        return this;
	      } });
	  };
	}, function (t, n, r) {
	  "use strict";
	  var e = r(192),
	      i = r(200),
	      o = r(135),
	      u = r(38);t.exports = r(134)(Array, "Array", function (t, n) {
	    this._t = u(t), this._i = 0, this._k = n;
	  }, function () {
	    var t = this._t,
	        n = this._k,
	        r = this._i++;return !t || r >= t.length ? (this._t = void 0, i(1)) : "keys" == n ? i(0, r) : "values" == n ? i(0, t[r]) : i(0, [r, t[r]]);
	  }, "values"), o.Arguments = o.Array, e("keys"), e("values"), e("entries");
	}, function (t, n) {
	  t.exports = function (t, n) {
	    return { value: n, done: !!t };
	  };
	}, function (t, n, r) {
	  var e = r(10),
	      i = r(94),
	      o = r(17).f,
	      u = r(56).f,
	      c = r(140),
	      a = r(202),
	      _f2 = e.RegExp,
	      s = _f2,
	      l = _f2.prototype,
	      h = /a/g,
	      v = /a/g,
	      p = new _f2(h) !== h;if (r(12) && (!p || r(13)(function () {
	    return v[r(31)("match")] = !1, _f2(h) != h || _f2(v) == v || "/a/i" != _f2(h, "i");
	  }))) {
	    _f2 = function f(t, n) {
	      var r = this instanceof _f2,
	          e = c(t),
	          o = void 0 === n;return !r && e && t.constructor === _f2 && o ? t : i(p ? new s(e && !o ? t.source : t, n) : s((e = t instanceof _f2) ? t.source : t, e && o ? a.call(t) : n), r ? this : l, _f2);
	    };for (var d = function d(t) {
	      (t in _f2) || o(_f2, t, { configurable: !0, get: function get() {
	          return s[t];
	        }, set: function set(n) {
	          s[t] = n;
	        } });
	    }, g = u(s), y = 0; g.length > y;) {
	      d(g[y++]);
	    }l.constructor = _f2, _f2.prototype = l, r(24)(e, "RegExp", _f2);
	  }r(198)("RegExp");
	}, function (t, n, r) {
	  "use strict";
	  var e = r(18);t.exports = function () {
	    var t = e(this),
	        n = "";return t.global && (n += "g"), t.ignoreCase && (n += "i"), t.multiline && (n += "m"), t.unicode && (n += "u"), t.sticky && (n += "y"), n;
	  };
	}, function (t, n, r) {
	  "use strict";
	  r(204);var e = r(18),
	      i = r(202),
	      o = r(12),
	      u = "toString",
	      c = /./[u],
	      a = function a(t) {
	    r(24)(RegExp.prototype, u, t, !0);
	  };r(13)(function () {
	    return "/a/b" != c.call({ source: "a", flags: "b" });
	  }) ? a(function () {
	    var t = e(this);return "/".concat(t.source, "/", "flags" in t ? t.flags : !o && t instanceof RegExp ? i.call(t) : void 0);
	  }) : c.name != u && a(function () {
	    return c.call(this);
	  });
	}, function (t, n, r) {
	  r(12) && "g" != /./g.flags && r(17).f(RegExp.prototype, "flags", { configurable: !0, get: r(202) });
	}, function (t, n, r) {
	  r(206)("match", 1, function (t, n, r) {
	    return [function (r) {
	      "use strict";
	      var e = t(this),
	          i = void 0 == r ? void 0 : r[n];return void 0 !== i ? i.call(r, e) : new RegExp(r)[n](String(e));
	    }, r];
	  });
	}, function (t, n, r) {
	  "use strict";
	  var e = r(16),
	      i = r(24),
	      o = r(13),
	      u = r(41),
	      c = r(31);t.exports = function (t, n, r) {
	    var a = c(t),
	        f = r(u, a, ""[t]),
	        s = f[0],
	        l = f[1];o(function () {
	      var n = {};return n[a] = function () {
	        return 7;
	      }, 7 != ""[t](n);
	    }) && (i(String.prototype, t, s), e(RegExp.prototype, a, 2 == n ? function (t, n) {
	      return l.call(t, this, n);
	    } : function (t) {
	      return l.call(t, this);
	    }));
	  };
	}, function (t, n, r) {
	  r(206)("replace", 2, function (t, n, r) {
	    return [function (e, i) {
	      "use strict";
	      var o = t(this),
	          u = void 0 == e ? void 0 : e[n];return void 0 !== u ? u.call(e, o, i) : r.call(String(o), e, i);
	    }, r];
	  });
	}, function (t, n, r) {
	  r(206)("search", 1, function (t, n, r) {
	    return [function (r) {
	      "use strict";
	      var e = t(this),
	          i = void 0 == r ? void 0 : r[n];return void 0 !== i ? i.call(r, e) : new RegExp(r)[n](String(e));
	    }, r];
	  });
	}, function (t, n, r) {
	  r(206)("split", 2, function (t, n, e) {
	    "use strict";
	    var i = r(140),
	        o = e,
	        u = [].push,
	        c = "split",
	        a = "length",
	        f = "lastIndex";if ("c" == "abbc"[c](/(b)*/)[1] || 4 != "test"[c](/(?:)/, -1)[a] || 2 != "ab"[c](/(?:ab)*/)[a] || 4 != "."[c](/(.?)(.?)/)[a] || "."[c](/()()/)[a] > 1 || ""[c](/.?/)[a]) {
	      var s = void 0 === /()??/.exec("")[1];e = function e(t, n) {
	        var r = String(this);if (void 0 === t && 0 === n) return [];if (!i(t)) return o.call(r, t, n);var e,
	            c,
	            l,
	            h,
	            v,
	            p = [],
	            d = (t.ignoreCase ? "i" : "") + (t.multiline ? "m" : "") + (t.unicode ? "u" : "") + (t.sticky ? "y" : ""),
	            g = 0,
	            y = void 0 === n ? 4294967295 : n >>> 0,
	            m = new RegExp(t.source, d + "g");for (s || (e = new RegExp("^" + m.source + "$(?!\\s)", d)); (c = m.exec(r)) && (l = c.index + c[0][a], !(l > g && (p.push(r.slice(g, c.index)), !s && c[a] > 1 && c[0].replace(e, function () {
	          for (v = 1; v < arguments[a] - 2; v++) {
	            void 0 === arguments[v] && (c[v] = void 0);
	          }
	        }), c[a] > 1 && c.index < r[a] && u.apply(p, c.slice(1)), h = c[0][a], g = l, p[a] >= y)));) {
	          m[f] === c.index && m[f]++;
	        }return g === r[a] ? !h && m.test("") || p.push("") : p.push(r.slice(g)), p[a] > y ? p.slice(0, y) : p;
	      };
	    } else "0"[c](void 0, 0)[a] && (e = function e(t, n) {
	      return void 0 === t && 0 === n ? [] : o.call(this, t, n);
	    });return [function (r, i) {
	      var o = t(this),
	          u = void 0 == r ? void 0 : r[n];return void 0 !== u ? u.call(r, o, i) : e.call(String(o), r, i);
	    }, e];
	  });
	}, function (t, n, r) {
	  "use strict";
	  var e,
	      i,
	      o,
	      u = r(34),
	      c = r(10),
	      a = r(26),
	      f = r(81),
	      s = r(14),
	      l = r(19),
	      h = r(27),
	      v = r(211),
	      p = r(212),
	      d = r(213),
	      g = r(214).set,
	      y = r(215)(),
	      m = "Promise",
	      b = c.TypeError,
	      w = c.process,
	      _2 = c[m],
	      w = c.process,
	      x = "process" == f(w),
	      S = function S() {},
	      E = !!function () {
	    try {
	      var t = _2.resolve(1),
	          n = (t.constructor = {})[r(31)("species")] = function (t) {
	        t(S, S);
	      };return (x || "function" == typeof PromiseRejectionEvent) && t.then(S) instanceof n;
	    } catch (t) {}
	  }(),
	      O = function O(t, n) {
	    return t === n || t === _2 && n === o;
	  },
	      P = function P(t) {
	    var n;return !(!l(t) || "function" != typeof (n = t.then)) && n;
	  },
	      M = function M(t) {
	    return O(_2, t) ? new F(t) : new i(t);
	  },
	      F = i = function i(t) {
	    var n, r;this.promise = new t(function (t, e) {
	      if (void 0 !== n || void 0 !== r) throw b("Bad Promise constructor");n = t, r = e;
	    }), this.resolve = h(n), this.reject = h(r);
	  },
	      k = function k(t) {
	    try {
	      t();
	    } catch (t) {
	      return { error: t };
	    }
	  },
	      j = function j(t, n) {
	    if (!t._n) {
	      t._n = !0;var r = t._c;y(function () {
	        for (var e = t._v, i = 1 == t._s, o = 0, u = function u(n) {
	          var r,
	              o,
	              u = i ? n.ok : n.fail,
	              c = n.resolve,
	              a = n.reject,
	              f = n.domain;try {
	            u ? (i || (2 == t._h && I(t), t._h = 1), u === !0 ? r = e : (f && f.enter(), r = u(e), f && f.exit()), r === n.promise ? a(b("Promise-chain cycle")) : (o = P(r)) ? o.call(r, c, a) : c(r)) : a(e);
	          } catch (t) {
	            a(t);
	          }
	        }; r.length > o;) {
	          u(r[o++]);
	        }t._c = [], t._n = !1, n && !t._h && A(t);
	      });
	    }
	  },
	      A = function A(t) {
	    g.call(c, function () {
	      var n,
	          r,
	          e,
	          i = t._v;if (N(t) && (n = k(function () {
	        x ? w.emit("unhandledRejection", i, t) : (r = c.onunhandledrejection) ? r({ promise: t, reason: i }) : (e = c.console) && e.error && e.error("Unhandled promise rejection", i);
	      }), t._h = x || N(t) ? 2 : 1), t._a = void 0, n) throw n.error;
	    });
	  },
	      N = function N(t) {
	    if (1 == t._h) return !1;for (var n, r = t._a || t._c, e = 0; r.length > e;) {
	      if (n = r[e++], n.fail || !N(n.promise)) return !1;
	    }return !0;
	  },
	      I = function I(t) {
	    g.call(c, function () {
	      var n;x ? w.emit("rejectionHandled", t) : (n = c.onrejectionhandled) && n({ promise: t, reason: t._v });
	    });
	  },
	      T = function T(t) {
	    var n = this;n._d || (n._d = !0, n = n._w || n, n._v = t, n._s = 2, n._a || (n._a = n._c.slice()), j(n, !0));
	  },
	      L = function L(t) {
	    var n,
	        r = this;if (!r._d) {
	      r._d = !0, r = r._w || r;try {
	        if (r === t) throw b("Promise can't be resolved itself");(n = P(t)) ? y(function () {
	          var e = { _w: r, _d: !1 };try {
	            n.call(t, a(L, e, 1), a(T, e, 1));
	          } catch (t) {
	            T.call(e, t);
	          }
	        }) : (r._v = t, r._s = 1, j(r, !1));
	      } catch (t) {
	        T.call({ _w: r, _d: !1 }, t);
	      }
	    }
	  };E || (_2 = function _(t) {
	    v(this, _2, m, "_h"), h(t), e.call(this);try {
	      t(a(L, this, 1), a(T, this, 1));
	    } catch (t) {
	      T.call(this, t);
	    }
	  }, e = function e(t) {
	    this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1;
	  }, e.prototype = r(216)(_2.prototype, { then: function then(t, n) {
	      var r = M(d(this, _2));return r.ok = "function" != typeof t || t, r.fail = "function" == typeof n && n, r.domain = x ? w.domain : void 0, this._c.push(r), this._a && this._a.push(r), this._s && j(this, !1), r.promise;
	    }, catch: function _catch(t) {
	      return this.then(void 0, t);
	    } }), F = function F() {
	    var t = new e();this.promise = t, this.resolve = a(L, t, 1), this.reject = a(T, t, 1);
	  }), s(s.G + s.W + s.F * !E, { Promise: _2 }), r(30)(_2, m), r(198)(m), o = r(15)[m], s(s.S + s.F * !E, m, { reject: function reject(t) {
	      var n = M(this),
	          r = n.reject;return r(t), n.promise;
	    } }), s(s.S + s.F * (u || !E), m, { resolve: function resolve(t) {
	      if (t instanceof _2 && O(t.constructor, this)) return t;var n = M(this),
	          r = n.resolve;return r(t), n.promise;
	    } }), s(s.S + s.F * !(E && r(171)(function (t) {
	    _2.all(t).catch(S);
	  })), m, { all: function all(t) {
	      var n = this,
	          r = M(n),
	          e = r.resolve,
	          i = r.reject,
	          o = k(function () {
	        var r = [],
	            o = 0,
	            u = 1;p(t, !1, function (t) {
	          var c = o++,
	              a = !1;r.push(void 0), u++, n.resolve(t).then(function (t) {
	            a || (a = !0, r[c] = t, --u || e(r));
	          }, i);
	        }), --u || e(r);
	      });return o && i(o.error), r.promise;
	    }, race: function race(t) {
	      var n = this,
	          r = M(n),
	          e = r.reject,
	          i = k(function () {
	        p(t, !1, function (t) {
	          n.resolve(t).then(r.resolve, e);
	        });
	      });return i && e(i.error), r.promise;
	    } });
	}, function (t, n) {
	  t.exports = function (t, n, r, e) {
	    if (!(t instanceof n) || void 0 !== e && e in t) throw TypeError(r + ": incorrect invocation!");return t;
	  };
	}, function (t, n, r) {
	  var e = r(26),
	      i = r(167),
	      o = r(168),
	      u = r(18),
	      c = r(43),
	      a = r(170),
	      f = {},
	      s = {},
	      n = t.exports = function (t, n, r, l, h) {
	    var v,
	        p,
	        d,
	        g,
	        y = h ? function () {
	      return t;
	    } : a(t),
	        m = e(r, l, n ? 2 : 1),
	        b = 0;if ("function" != typeof y) throw TypeError(t + " is not iterable!");if (o(y)) {
	      for (v = c(t.length); v > b; b++) {
	        if (g = n ? m(u(p = t[b])[0], p[1]) : m(t[b]), g === f || g === s) return g;
	      }
	    } else for (d = y.call(t); !(p = d.next()).done;) {
	      if (g = i(d, m, p.value, n), g === f || g === s) return g;
	    }
	  };n.BREAK = f, n.RETURN = s;
	}, function (t, n, r) {
	  var e = r(18),
	      i = r(27),
	      o = r(31)("species");t.exports = function (t, n) {
	    var r,
	        u = e(t).constructor;return void 0 === u || void 0 == (r = e(u)[o]) ? n : i(r);
	  };
	}, function (t, n, r) {
	  var e,
	      i,
	      o,
	      u = r(26),
	      c = r(84),
	      a = r(54),
	      f = r(21),
	      s = r(10),
	      l = s.process,
	      h = s.setImmediate,
	      v = s.clearImmediate,
	      p = s.MessageChannel,
	      d = 0,
	      g = {},
	      y = "onreadystatechange",
	      m = function m() {
	    var t = +this;if (g.hasOwnProperty(t)) {
	      var n = g[t];delete g[t], n();
	    }
	  },
	      b = function b(t) {
	    m.call(t.data);
	  };h && v || (h = function h(t) {
	    for (var n = [], r = 1; arguments.length > r;) {
	      n.push(arguments[r++]);
	    }return g[++d] = function () {
	      c("function" == typeof t ? t : Function(t), n);
	    }, e(d), d;
	  }, v = function v(t) {
	    delete g[t];
	  }, "process" == r(40)(l) ? e = function e(t) {
	    l.nextTick(u(m, t, 1));
	  } : p ? (i = new p(), o = i.port2, i.port1.onmessage = b, e = u(o.postMessage, o, 1)) : s.addEventListener && "function" == typeof postMessage && !s.importScripts ? (e = function e(t) {
	    s.postMessage(t + "", "*");
	  }, s.addEventListener("message", b, !1)) : e = y in f("script") ? function (t) {
	    a.appendChild(f("script"))[y] = function () {
	      a.removeChild(this), m.call(t);
	    };
	  } : function (t) {
	    setTimeout(u(m, t, 1), 0);
	  }), t.exports = { set: h, clear: v };
	}, function (t, n, r) {
	  var e = r(10),
	      i = r(214).set,
	      o = e.MutationObserver || e.WebKitMutationObserver,
	      u = e.process,
	      c = e.Promise,
	      a = "process" == r(40)(u);t.exports = function () {
	    var t,
	        n,
	        r,
	        f = function f() {
	      var e, i;for (a && (e = u.domain) && e.exit(); t;) {
	        i = t.fn, t = t.next;try {
	          i();
	        } catch (e) {
	          throw t ? r() : n = void 0, e;
	        }
	      }n = void 0, e && e.enter();
	    };if (a) r = function r() {
	      u.nextTick(f);
	    };else if (o) {
	      var s = !0,
	          l = document.createTextNode("");new o(f).observe(l, { characterData: !0 }), r = function r() {
	        l.data = s = !s;
	      };
	    } else if (c && c.resolve) {
	      var h = c.resolve();r = function r() {
	        h.then(f);
	      };
	    } else r = function r() {
	      i.call(e, f);
	    };return function (e) {
	      var i = { fn: e, next: void 0 };n && (n.next = i), t || (t = i, r()), n = i;
	    };
	  };
	}, function (t, n, r) {
	  var e = r(24);t.exports = function (t, n, r) {
	    for (var i in n) {
	      e(t, i, n[i], r);
	    }return t;
	  };
	}, function (t, n, r) {
	  "use strict";
	  var e = r(218);t.exports = r(219)("Map", function (t) {
	    return function () {
	      return t(this, arguments.length > 0 ? arguments[0] : void 0);
	    };
	  }, { get: function get(t) {
	      var n = e.getEntry(this, t);return n && n.v;
	    }, set: function set(t, n) {
	      return e.def(this, 0 === t ? 0 : t, n);
	    } }, e, !0);
	}, function (t, n, r) {
	  "use strict";
	  var e = r(17).f,
	      i = r(52),
	      o = r(216),
	      u = r(26),
	      c = r(211),
	      a = r(41),
	      f = r(212),
	      s = r(134),
	      l = r(200),
	      h = r(198),
	      v = r(12),
	      p = r(28).fastKey,
	      d = v ? "_s" : "size",
	      g = function g(t, n) {
	    var r,
	        e = p(n);if ("F" !== e) return t._i[e];for (r = t._f; r; r = r.n) {
	      if (r.k == n) return r;
	    }
	  };t.exports = { getConstructor: function getConstructor(t, n, r, s) {
	      var l = t(function (t, e) {
	        c(t, l, n, "_i"), t._i = i(null), t._f = void 0, t._l = void 0, t[d] = 0, void 0 != e && f(e, r, t[s], t);
	      });return o(l.prototype, { clear: function clear() {
	          for (var t = this, n = t._i, r = t._f; r; r = r.n) {
	            r.r = !0, r.p && (r.p = r.p.n = void 0), delete n[r.i];
	          }t._f = t._l = void 0, t[d] = 0;
	        }, delete: function _delete(t) {
	          var n = this,
	              r = g(n, t);if (r) {
	            var e = r.n,
	                i = r.p;delete n._i[r.i], r.r = !0, i && (i.n = e), e && (e.p = i), n._f == r && (n._f = e), n._l == r && (n._l = i), n[d]--;
	          }return !!r;
	        }, forEach: function forEach(t) {
	          c(this, l, "forEach");for (var n, r = u(t, arguments.length > 1 ? arguments[1] : void 0, 3); n = n ? n.n : this._f;) {
	            for (r(n.v, n.k, this); n && n.r;) {
	              n = n.p;
	            }
	          }
	        }, has: function has(t) {
	          return !!g(this, t);
	        } }), v && e(l.prototype, "size", { get: function get() {
	          return a(this[d]);
	        } }), l;
	    }, def: function def(t, n, r) {
	      var e,
	          i,
	          o = g(t, n);return o ? o.v = r : (t._l = o = { i: i = p(n, !0), k: n, v: r, p: e = t._l, n: void 0, r: !1 }, t._f || (t._f = o), e && (e.n = o), t[d]++, "F" !== i && (t._i[i] = o)), t;
	    }, getEntry: g, setStrong: function setStrong(t, n, r) {
	      s(t, n, function (t, n) {
	        this._t = t, this._k = n, this._l = void 0;
	      }, function () {
	        for (var t = this, n = t._k, r = t._l; r && r.r;) {
	          r = r.p;
	        }return t._t && (t._l = r = r ? r.n : t._t._f) ? "keys" == n ? l(0, r.k) : "values" == n ? l(0, r.v) : l(0, [r.k, r.v]) : (t._t = void 0, l(1));
	      }, r ? "entries" : "values", !r, !0), h(n);
	    } };
	}, function (t, n, r) {
	  "use strict";
	  var e = r(10),
	      i = r(14),
	      o = r(24),
	      u = r(216),
	      c = r(28),
	      a = r(212),
	      f = r(211),
	      s = r(19),
	      l = r(13),
	      h = r(171),
	      v = r(30),
	      p = r(94);t.exports = function (t, n, r, d, g, y) {
	    var m = e[t],
	        b = m,
	        w = g ? "set" : "add",
	        _ = b && b.prototype,
	        x = {},
	        S = function S(t) {
	      var n = _[t];o(_, t, "delete" == t ? function (t) {
	        return !(y && !s(t)) && n.call(this, 0 === t ? 0 : t);
	      } : "has" == t ? function (t) {
	        return !(y && !s(t)) && n.call(this, 0 === t ? 0 : t);
	      } : "get" == t ? function (t) {
	        return y && !s(t) ? void 0 : n.call(this, 0 === t ? 0 : t);
	      } : "add" == t ? function (t) {
	        return n.call(this, 0 === t ? 0 : t), this;
	      } : function (t, r) {
	        return n.call(this, 0 === t ? 0 : t, r), this;
	      });
	    };if ("function" == typeof b && (y || _.forEach && !l(function () {
	      new b().entries().next();
	    }))) {
	      var E = new b(),
	          O = E[w](y ? {} : -0, 1) != E,
	          P = l(function () {
	        E.has(1);
	      }),
	          M = h(function (t) {
	        new b(t);
	      }),
	          F = !y && l(function () {
	        for (var t = new b(), n = 5; n--;) {
	          t[w](n, n);
	        }return !t.has(-0);
	      });M || (b = n(function (n, r) {
	        f(n, b, t);var e = p(new m(), n, b);return void 0 != r && a(r, g, e[w], e), e;
	      }), b.prototype = _, _.constructor = b), (P || F) && (S("delete"), S("has"), g && S("get")), (F || O) && S(w), y && _.clear && delete _.clear;
	    } else b = d.getConstructor(n, t, g, w), u(b.prototype, r), c.NEED = !0;return v(b, t), x[t] = b, i(i.G + i.W + i.F * (b != m), x), y || d.setStrong(b, t, g), b;
	  };
	}, function (t, n, r) {
	  "use strict";
	  var e = r(218);t.exports = r(219)("Set", function (t) {
	    return function () {
	      return t(this, arguments.length > 0 ? arguments[0] : void 0);
	    };
	  }, { add: function add(t) {
	      return e.def(this, t = 0 === t ? 0 : t, t);
	    } }, e);
	}, function (t, n, r) {
	  "use strict";
	  var e,
	      i = r(178)(0),
	      o = r(24),
	      u = r(28),
	      c = r(75),
	      a = r(222),
	      f = r(19),
	      s = u.getWeak,
	      l = Object.isExtensible,
	      h = a.ufstore,
	      v = {},
	      p = function p(t) {
	    return function () {
	      return t(this, arguments.length > 0 ? arguments[0] : void 0);
	    };
	  },
	      d = { get: function get(t) {
	      if (f(t)) {
	        var n = s(t);return n === !0 ? h(this).get(t) : n ? n[this._i] : void 0;
	      }
	    }, set: function set(t, n) {
	      return a.def(this, t, n);
	    } },
	      g = t.exports = r(219)("WeakMap", p, d, a, !0, !0);7 != new g().set((Object.freeze || Object)(v), 7).get(v) && (e = a.getConstructor(p), c(e.prototype, d), u.NEED = !0, i(["delete", "has", "get", "set"], function (t) {
	    var n = g.prototype,
	        r = n[t];o(n, t, function (n, i) {
	      if (f(n) && !l(n)) {
	        this._f || (this._f = new e());var o = this._f[t](n, i);return "set" == t ? this : o;
	      }return r.call(this, n, i);
	    });
	  }));
	}, function (t, n, r) {
	  "use strict";
	  var e = r(216),
	      i = r(28).getWeak,
	      o = r(18),
	      u = r(19),
	      c = r(211),
	      a = r(212),
	      f = r(178),
	      s = r(11),
	      l = f(5),
	      h = f(6),
	      v = 0,
	      p = function p(t) {
	    return t._l || (t._l = new d());
	  },
	      d = function d() {
	    this.a = [];
	  },
	      g = function g(t, n) {
	    return l(t.a, function (t) {
	      return t[0] === n;
	    });
	  };d.prototype = { get: function get(t) {
	      var n = g(this, t);if (n) return n[1];
	    }, has: function has(t) {
	      return !!g(this, t);
	    }, set: function set(t, n) {
	      var r = g(this, t);r ? r[1] = n : this.a.push([t, n]);
	    }, delete: function _delete(t) {
	      var n = h(this.a, function (n) {
	        return n[0] === t;
	      });return ~n && this.a.splice(n, 1), !!~n;
	    } }, t.exports = { getConstructor: function getConstructor(t, n, r, o) {
	      var f = t(function (t, e) {
	        c(t, f, n, "_i"), t._i = v++, t._l = void 0, void 0 != e && a(e, r, t[o], t);
	      });return e(f.prototype, { delete: function _delete(t) {
	          if (!u(t)) return !1;var n = i(t);return n === !0 ? p(this).delete(t) : n && s(n, this._i) && delete n[this._i];
	        }, has: function has(t) {
	          if (!u(t)) return !1;var n = i(t);return n === !0 ? p(this).has(t) : n && s(n, this._i);
	        } }), f;
	    }, def: function def(t, n, r) {
	      var e = i(o(n), !0);return e === !0 ? p(t).set(n, r) : e[t._i] = r, t;
	    }, ufstore: p };
	}, function (t, n, r) {
	  "use strict";
	  var e = r(222);r(219)("WeakSet", function (t) {
	    return function () {
	      return t(this, arguments.length > 0 ? arguments[0] : void 0);
	    };
	  }, { add: function add(t) {
	      return e.def(this, t, !0);
	    } }, e, !1, !0);
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(225),
	      o = r(226),
	      u = r(18),
	      c = r(45),
	      a = r(43),
	      f = r(19),
	      s = r(10).ArrayBuffer,
	      l = r(213),
	      h = o.ArrayBuffer,
	      v = o.DataView,
	      p = i.ABV && s.isView,
	      d = h.prototype.slice,
	      g = i.VIEW,
	      y = "ArrayBuffer";e(e.G + e.W + e.F * (s !== h), { ArrayBuffer: h }), e(e.S + e.F * !i.CONSTR, y, { isView: function isView(t) {
	      return p && p(t) || f(t) && g in t;
	    } }), e(e.P + e.U + e.F * r(13)(function () {
	    return !new h(2).slice(1, void 0).byteLength;
	  }), y, { slice: function slice(t, n) {
	      if (void 0 !== d && void 0 === n) return d.call(u(this), t);for (var r = u(this).byteLength, e = c(t, r), i = c(void 0 === n ? r : n, r), o = new (l(this, h))(a(i - e)), f = new v(this), s = new v(o), p = 0; e < i;) {
	        s.setUint8(p++, f.getUint8(e++));
	      }return o;
	    } }), r(198)(y);
	}, function (t, n, r) {
	  for (var e, i = r(10), o = r(16), u = r(25), c = u("typed_array"), a = u("view"), f = !(!i.ArrayBuffer || !i.DataView), s = f, l = 0, h = 9, v = "Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(","); l < h;) {
	    (e = i[v[l++]]) ? (o(e.prototype, c, !0), o(e.prototype, a, !0)) : s = !1;
	  }t.exports = { ABV: f, CONSTR: s, TYPED: c, VIEW: a };
	}, function (t, n, r) {
	  "use strict";
	  var e = r(10),
	      i = r(12),
	      o = r(34),
	      u = r(225),
	      c = r(16),
	      a = r(216),
	      f = r(13),
	      s = r(211),
	      l = r(44),
	      h = r(43),
	      v = r(56).f,
	      p = r(17).f,
	      d = r(194),
	      g = r(30),
	      y = "ArrayBuffer",
	      m = "DataView",
	      b = "prototype",
	      w = "Wrong length!",
	      _ = "Wrong index!",
	      x = e[y],
	      _S = e[m],
	      E = e.Math,
	      O = e.RangeError,
	      P = e.Infinity,
	      M = x,
	      F = E.abs,
	      k = E.pow,
	      j = E.floor,
	      A = E.log,
	      N = E.LN2,
	      I = "buffer",
	      T = "byteLength",
	      L = "byteOffset",
	      R = i ? "_b" : I,
	      C = i ? "_l" : T,
	      D = i ? "_o" : L,
	      U = function U(t, n, r) {
	    var e,
	        i,
	        o,
	        u = Array(r),
	        c = 8 * r - n - 1,
	        a = (1 << c) - 1,
	        f = a >> 1,
	        s = 23 === n ? k(2, -24) - k(2, -77) : 0,
	        l = 0,
	        h = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;for (t = F(t), t != t || t === P ? (i = t != t ? 1 : 0, e = a) : (e = j(A(t) / N), t * (o = k(2, -e)) < 1 && (e--, o *= 2), t += e + f >= 1 ? s / o : s * k(2, 1 - f), t * o >= 2 && (e++, o /= 2), e + f >= a ? (i = 0, e = a) : e + f >= 1 ? (i = (t * o - 1) * k(2, n), e += f) : (i = t * k(2, f - 1) * k(2, n), e = 0)); n >= 8; u[l++] = 255 & i, i /= 256, n -= 8) {}for (e = e << n | i, c += n; c > 0; u[l++] = 255 & e, e /= 256, c -= 8) {}return u[--l] |= 128 * h, u;
	  },
	      V = function V(t, n, r) {
	    var e,
	        i = 8 * r - n - 1,
	        o = (1 << i) - 1,
	        u = o >> 1,
	        c = i - 7,
	        a = r - 1,
	        f = t[a--],
	        s = 127 & f;for (f >>= 7; c > 0; s = 256 * s + t[a], a--, c -= 8) {}for (e = s & (1 << -c) - 1, s >>= -c, c += n; c > 0; e = 256 * e + t[a], a--, c -= 8) {}if (0 === s) s = 1 - u;else {
	      if (s === o) return e ? NaN : f ? -P : P;e += k(2, n), s -= u;
	    }return (f ? -1 : 1) * e * k(2, s - n);
	  },
	      G = function G(t) {
	    return t[3] << 24 | t[2] << 16 | t[1] << 8 | t[0];
	  },
	      W = function W(t) {
	    return [255 & t];
	  },
	      B = function B(t) {
	    return [255 & t, t >> 8 & 255];
	  },
	      z = function z(t) {
	    return [255 & t, t >> 8 & 255, t >> 16 & 255, t >> 24 & 255];
	  },
	      Y = function Y(t) {
	    return U(t, 52, 8);
	  },
	      J = function J(t) {
	    return U(t, 23, 4);
	  },
	      X = function X(t, n, r) {
	    p(t[b], n, { get: function get() {
	        return this[r];
	      } });
	  },
	      K = function K(t, n, r, e) {
	    var i = +r,
	        o = l(i);if (i != o || o < 0 || o + n > t[C]) throw O(_);var u = t[R]._b,
	        c = o + t[D],
	        a = u.slice(c, c + n);return e ? a : a.reverse();
	  },
	      q = function q(t, n, r, e, i, o) {
	    var u = +r,
	        c = l(u);if (u != c || c < 0 || c + n > t[C]) throw O(_);for (var a = t[R]._b, f = c + t[D], s = e(+i), h = 0; h < n; h++) {
	      a[f + h] = s[o ? h : n - h - 1];
	    }
	  },
	      $ = function $(t, n) {
	    s(t, x, y);var r = +n,
	        e = h(r);if (r != e) throw O(w);return e;
	  };if (u.ABV) {
	    if (!f(function () {
	      new x();
	    }) || !f(function () {
	      new x(.5);
	    })) {
	      x = function x(t) {
	        return new M($(this, t));
	      };for (var H, Z = x[b] = M[b], Q = v(M), tt = 0; Q.length > tt;) {
	        (H = Q[tt++]) in x || c(x, H, M[H]);
	      }o || (Z.constructor = x);
	    }var nt = new _S(new x(2)),
	        rt = _S[b].setInt8;nt.setInt8(0, 2147483648), nt.setInt8(1, 2147483649), !nt.getInt8(0) && nt.getInt8(1) || a(_S[b], { setInt8: function setInt8(t, n) {
	        rt.call(this, t, n << 24 >> 24);
	      }, setUint8: function setUint8(t, n) {
	        rt.call(this, t, n << 24 >> 24);
	      } }, !0);
	  } else x = function x(t) {
	    var n = $(this, t);this._b = d.call(Array(n), 0), this[C] = n;
	  }, _S = function S(t, n, r) {
	    s(this, _S, m), s(t, x, m);var e = t[C],
	        i = l(n);if (i < 0 || i > e) throw O("Wrong offset!");if (r = void 0 === r ? e - i : h(r), i + r > e) throw O(w);this[R] = t, this[D] = i, this[C] = r;
	  }, i && (X(x, T, "_l"), X(_S, I, "_b"), X(_S, T, "_l"), X(_S, L, "_o")), a(_S[b], { getInt8: function getInt8(t) {
	      return K(this, 1, t)[0] << 24 >> 24;
	    }, getUint8: function getUint8(t) {
	      return K(this, 1, t)[0];
	    }, getInt16: function getInt16(t) {
	      var n = K(this, 2, t, arguments[1]);return (n[1] << 8 | n[0]) << 16 >> 16;
	    }, getUint16: function getUint16(t) {
	      var n = K(this, 2, t, arguments[1]);return n[1] << 8 | n[0];
	    }, getInt32: function getInt32(t) {
	      return G(K(this, 4, t, arguments[1]));
	    }, getUint32: function getUint32(t) {
	      return G(K(this, 4, t, arguments[1])) >>> 0;
	    }, getFloat32: function getFloat32(t) {
	      return V(K(this, 4, t, arguments[1]), 23, 4);
	    }, getFloat64: function getFloat64(t) {
	      return V(K(this, 8, t, arguments[1]), 52, 8);
	    }, setInt8: function setInt8(t, n) {
	      q(this, 1, t, W, n);
	    }, setUint8: function setUint8(t, n) {
	      q(this, 1, t, W, n);
	    }, setInt16: function setInt16(t, n) {
	      q(this, 2, t, B, n, arguments[2]);
	    }, setUint16: function setUint16(t, n) {
	      q(this, 2, t, B, n, arguments[2]);
	    }, setInt32: function setInt32(t, n) {
	      q(this, 4, t, z, n, arguments[2]);
	    }, setUint32: function setUint32(t, n) {
	      q(this, 4, t, z, n, arguments[2]);
	    }, setFloat32: function setFloat32(t, n) {
	      q(this, 4, t, J, n, arguments[2]);
	    }, setFloat64: function setFloat64(t, n) {
	      q(this, 8, t, Y, n, arguments[2]);
	    } });g(x, y), g(_S, m), c(_S[b], u.VIEW, !0), n[y] = x, n[m] = _S;
	}, function (t, n, r) {
	  var e = r(14);e(e.G + e.W + e.F * !r(225).ABV, { DataView: r(226).DataView });
	}, function (t, n, r) {
	  r(229)("Int8", 1, function (t) {
	    return function (n, r, e) {
	      return t(this, n, r, e);
	    };
	  });
	}, function (t, n, r) {
	  "use strict";
	  if (r(12)) {
	    var e = r(34),
	        i = r(10),
	        o = r(13),
	        u = r(14),
	        c = r(225),
	        a = r(226),
	        f = r(26),
	        s = r(211),
	        l = r(23),
	        h = r(16),
	        v = r(216),
	        p = r(44),
	        d = r(43),
	        g = r(45),
	        y = r(22),
	        m = r(11),
	        b = r(77),
	        w = r(81),
	        _ = r(19),
	        x = r(64),
	        S = r(168),
	        E = r(52),
	        O = r(65),
	        P = r(56).f,
	        M = r(170),
	        F = r(25),
	        k = r(31),
	        j = r(178),
	        A = r(42),
	        N = r(213),
	        I = r(199),
	        T = r(135),
	        L = r(171),
	        R = r(198),
	        C = r(194),
	        D = r(191),
	        U = r(17),
	        V = r(57),
	        G = U.f,
	        W = V.f,
	        B = i.RangeError,
	        z = i.TypeError,
	        Y = i.Uint8Array,
	        J = "ArrayBuffer",
	        X = "Shared" + J,
	        K = "BYTES_PER_ELEMENT",
	        q = "prototype",
	        $ = Array[q],
	        H = a.ArrayBuffer,
	        Z = a.DataView,
	        Q = j(0),
	        tt = j(2),
	        nt = j(3),
	        rt = j(4),
	        et = j(5),
	        it = j(6),
	        ot = A(!0),
	        ut = A(!1),
	        ct = I.values,
	        at = I.keys,
	        ft = I.entries,
	        st = $.lastIndexOf,
	        lt = $.reduce,
	        ht = $.reduceRight,
	        vt = $.join,
	        pt = $.sort,
	        dt = $.slice,
	        gt = $.toString,
	        yt = $.toLocaleString,
	        mt = k("iterator"),
	        bt = k("toStringTag"),
	        wt = F("typed_constructor"),
	        _t = F("def_constructor"),
	        xt = c.CONSTR,
	        St = c.TYPED,
	        Et = c.VIEW,
	        Ot = "Wrong length!",
	        Pt = j(1, function (t, n) {
	      return Nt(N(t, t[_t]), n);
	    }),
	        Mt = o(function () {
	      return 1 === new Y(new Uint16Array([1]).buffer)[0];
	    }),
	        Ft = !!Y && !!Y[q].set && o(function () {
	      new Y(1).set({});
	    }),
	        kt = function kt(t, n) {
	      if (void 0 === t) throw z(Ot);var r = +t,
	          e = d(t);if (n && !b(r, e)) throw B(Ot);return e;
	    },
	        jt = function jt(t, n) {
	      var r = p(t);if (r < 0 || r % n) throw B("Wrong offset!");return r;
	    },
	        At = function At(t) {
	      if (_(t) && St in t) return t;throw z(t + " is not a typed array!");
	    },
	        Nt = function Nt(t, n) {
	      if (!(_(t) && wt in t)) throw z("It is not a typed array constructor!");return new t(n);
	    },
	        It = function It(t, n) {
	      return Tt(N(t, t[_t]), n);
	    },
	        Tt = function Tt(t, n) {
	      for (var r = 0, e = n.length, i = Nt(t, e); e > r;) {
	        i[r] = n[r++];
	      }return i;
	    },
	        Lt = function Lt(t, n, r) {
	      G(t, n, { get: function get() {
	          return this._d[r];
	        } });
	    },
	        Rt = function Rt(t) {
	      var n,
	          r,
	          e,
	          i,
	          o,
	          u,
	          c = x(t),
	          a = arguments.length,
	          s = a > 1 ? arguments[1] : void 0,
	          l = void 0 !== s,
	          h = M(c);if (void 0 != h && !S(h)) {
	        for (u = h.call(c), e = [], n = 0; !(o = u.next()).done; n++) {
	          e.push(o.value);
	        }c = e;
	      }for (l && a > 2 && (s = f(s, arguments[2], 2)), n = 0, r = d(c.length), i = Nt(this, r); r > n; n++) {
	        i[n] = l ? s(c[n], n) : c[n];
	      }return i;
	    },
	        Ct = function Ct() {
	      for (var t = 0, n = arguments.length, r = Nt(this, n); n > t;) {
	        r[t] = arguments[t++];
	      }return r;
	    },
	        Dt = !!Y && o(function () {
	      yt.call(new Y(1));
	    }),
	        Ut = function Ut() {
	      return yt.apply(Dt ? dt.call(At(this)) : At(this), arguments);
	    },
	        Vt = { copyWithin: function copyWithin(t, n) {
	        return D.call(At(this), t, n, arguments.length > 2 ? arguments[2] : void 0);
	      }, every: function every(t) {
	        return rt(At(this), t, arguments.length > 1 ? arguments[1] : void 0);
	      }, fill: function fill(t) {
	        return C.apply(At(this), arguments);
	      }, filter: function filter(t) {
	        return It(this, tt(At(this), t, arguments.length > 1 ? arguments[1] : void 0));
	      }, find: function find(t) {
	        return et(At(this), t, arguments.length > 1 ? arguments[1] : void 0);
	      }, findIndex: function findIndex(t) {
	        return it(At(this), t, arguments.length > 1 ? arguments[1] : void 0);
	      }, forEach: function forEach(t) {
	        Q(At(this), t, arguments.length > 1 ? arguments[1] : void 0);
	      }, indexOf: function indexOf(t) {
	        return ut(At(this), t, arguments.length > 1 ? arguments[1] : void 0);
	      }, includes: function includes(t) {
	        return ot(At(this), t, arguments.length > 1 ? arguments[1] : void 0);
	      }, join: function join(t) {
	        return vt.apply(At(this), arguments);
	      }, lastIndexOf: function lastIndexOf(t) {
	        return st.apply(At(this), arguments);
	      }, map: function map(t) {
	        return Pt(At(this), t, arguments.length > 1 ? arguments[1] : void 0);
	      }, reduce: function reduce(t) {
	        return lt.apply(At(this), arguments);
	      }, reduceRight: function reduceRight(t) {
	        return ht.apply(At(this), arguments);
	      }, reverse: function reverse() {
	        for (var t, n = this, r = At(n).length, e = Math.floor(r / 2), i = 0; i < e;) {
	          t = n[i], n[i++] = n[--r], n[r] = t;
	        }return n;
	      }, some: function some(t) {
	        return nt(At(this), t, arguments.length > 1 ? arguments[1] : void 0);
	      }, sort: function sort(t) {
	        return pt.call(At(this), t);
	      }, subarray: function subarray(t, n) {
	        var r = At(this),
	            e = r.length,
	            i = g(t, e);return new (N(r, r[_t]))(r.buffer, r.byteOffset + i * r.BYTES_PER_ELEMENT, d((void 0 === n ? e : g(n, e)) - i));
	      } },
	        Gt = function Gt(t, n) {
	      return It(this, dt.call(At(this), t, n));
	    },
	        Wt = function Wt(t) {
	      At(this);var n = jt(arguments[1], 1),
	          r = this.length,
	          e = x(t),
	          i = d(e.length),
	          o = 0;if (i + n > r) throw B(Ot);for (; o < i;) {
	        this[n + o] = e[o++];
	      }
	    },
	        Bt = { entries: function entries() {
	        return ft.call(At(this));
	      }, keys: function keys() {
	        return at.call(At(this));
	      }, values: function values() {
	        return ct.call(At(this));
	      } },
	        zt = function zt(t, n) {
	      return _(t) && t[St] && "symbol" != (typeof n === "undefined" ? "undefined" : _typeof(n)) && n in t && String(+n) == String(n);
	    },
	        Yt = function Yt(t, n) {
	      return zt(t, n = y(n, !0)) ? l(2, t[n]) : W(t, n);
	    },
	        Jt = function Jt(t, n, r) {
	      return !(zt(t, n = y(n, !0)) && _(r) && m(r, "value")) || m(r, "get") || m(r, "set") || r.configurable || m(r, "writable") && !r.writable || m(r, "enumerable") && !r.enumerable ? G(t, n, r) : (t[n] = r.value, t);
	    };xt || (V.f = Yt, U.f = Jt), u(u.S + u.F * !xt, "Object", { getOwnPropertyDescriptor: Yt, defineProperty: Jt }), o(function () {
	      gt.call({});
	    }) && (gt = yt = function yt() {
	      return vt.call(this);
	    });var Xt = v({}, Vt);v(Xt, Bt), h(Xt, mt, Bt.values), v(Xt, { slice: Gt, set: Wt, constructor: function constructor() {}, toString: gt, toLocaleString: Ut }), Lt(Xt, "buffer", "b"), Lt(Xt, "byteOffset", "o"), Lt(Xt, "byteLength", "l"), Lt(Xt, "length", "e"), G(Xt, bt, { get: function get() {
	        return this[St];
	      } }), t.exports = function (t, n, r, a) {
	      a = !!a;var f = t + (a ? "Clamped" : "") + "Array",
	          l = "Uint8Array" != f,
	          v = "get" + t,
	          p = "set" + t,
	          g = i[f],
	          y = g || {},
	          m = g && O(g),
	          b = !g || !c.ABV,
	          x = {},
	          S = g && g[q],
	          M = function M(t, r) {
	        var e = t._d;return e.v[v](r * n + e.o, Mt);
	      },
	          F = function F(t, r, e) {
	        var i = t._d;a && (e = (e = Math.round(e)) < 0 ? 0 : e > 255 ? 255 : 255 & e), i.v[p](r * n + i.o, e, Mt);
	      },
	          k = function k(t, n) {
	        G(t, n, { get: function get() {
	            return M(this, n);
	          }, set: function set(t) {
	            return F(this, n, t);
	          }, enumerable: !0 });
	      };b ? (g = r(function (t, r, e, i) {
	        s(t, g, f, "_d");var o,
	            u,
	            c,
	            a,
	            l = 0,
	            v = 0;if (_(r)) {
	          if (!(r instanceof H || (a = w(r)) == J || a == X)) return St in r ? Tt(g, r) : Rt.call(g, r);o = r, v = jt(e, n);var p = r.byteLength;if (void 0 === i) {
	            if (p % n) throw B(Ot);if (u = p - v, u < 0) throw B(Ot);
	          } else if (u = d(i) * n, u + v > p) throw B(Ot);c = u / n;
	        } else c = kt(r, !0), u = c * n, o = new H(u);for (h(t, "_d", { b: o, o: v, l: u, e: c, v: new Z(o) }); l < c;) {
	          k(t, l++);
	        }
	      }), S = g[q] = E(Xt), h(S, "constructor", g)) : L(function (t) {
	        new g(null), new g(t);
	      }, !0) || (g = r(function (t, r, e, i) {
	        s(t, g, f);var o;return _(r) ? r instanceof H || (o = w(r)) == J || o == X ? void 0 !== i ? new y(r, jt(e, n), i) : void 0 !== e ? new y(r, jt(e, n)) : new y(r) : St in r ? Tt(g, r) : Rt.call(g, r) : new y(kt(r, l));
	      }), Q(m !== Function.prototype ? P(y).concat(P(m)) : P(y), function (t) {
	        t in g || h(g, t, y[t]);
	      }), g[q] = S, e || (S.constructor = g));var j = S[mt],
	          A = !!j && ("values" == j.name || void 0 == j.name),
	          N = Bt.values;h(g, wt, !0), h(S, St, f), h(S, Et, !0), h(S, _t, g), (a ? new g(1)[bt] == f : bt in S) || G(S, bt, { get: function get() {
	          return f;
	        } }), x[f] = g, u(u.G + u.W + u.F * (g != y), x), u(u.S, f, { BYTES_PER_ELEMENT: n, from: Rt, of: Ct }), K in S || h(S, K, n), u(u.P, f, Vt), R(f), u(u.P + u.F * Ft, f, { set: Wt }), u(u.P + u.F * !A, f, Bt), u(u.P + u.F * (S.toString != gt), f, { toString: gt }), u(u.P + u.F * o(function () {
	        new g(1).slice();
	      }), f, { slice: Gt }), u(u.P + u.F * (o(function () {
	        return [1, 2].toLocaleString() != new g([1, 2]).toLocaleString();
	      }) || !o(function () {
	        S.toLocaleString.call([1, 2]);
	      })), f, { toLocaleString: Ut }), T[f] = A ? j : N, e || A || h(S, mt, N);
	    };
	  } else t.exports = function () {};
	}, function (t, n, r) {
	  r(229)("Uint8", 1, function (t) {
	    return function (n, r, e) {
	      return t(this, n, r, e);
	    };
	  });
	}, function (t, n, r) {
	  r(229)("Uint8", 1, function (t) {
	    return function (n, r, e) {
	      return t(this, n, r, e);
	    };
	  }, !0);
	}, function (t, n, r) {
	  r(229)("Int16", 2, function (t) {
	    return function (n, r, e) {
	      return t(this, n, r, e);
	    };
	  });
	}, function (t, n, r) {
	  r(229)("Uint16", 2, function (t) {
	    return function (n, r, e) {
	      return t(this, n, r, e);
	    };
	  });
	}, function (t, n, r) {
	  r(229)("Int32", 4, function (t) {
	    return function (n, r, e) {
	      return t(this, n, r, e);
	    };
	  });
	}, function (t, n, r) {
	  r(229)("Uint32", 4, function (t) {
	    return function (n, r, e) {
	      return t(this, n, r, e);
	    };
	  });
	}, function (t, n, r) {
	  r(229)("Float32", 4, function (t) {
	    return function (n, r, e) {
	      return t(this, n, r, e);
	    };
	  });
	}, function (t, n, r) {
	  r(229)("Float64", 8, function (t) {
	    return function (n, r, e) {
	      return t(this, n, r, e);
	    };
	  });
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(27),
	      o = r(18),
	      u = (r(10).Reflect || {}).apply,
	      c = Function.apply;e(e.S + e.F * !r(13)(function () {
	    u(function () {});
	  }), "Reflect", { apply: function apply(t, n, r) {
	      var e = i(t),
	          a = o(r);return u ? u(e, n, a) : c.call(e, n, a);
	    } });
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(52),
	      o = r(27),
	      u = r(18),
	      c = r(19),
	      a = r(13),
	      f = r(83),
	      s = (r(10).Reflect || {}).construct,
	      l = a(function () {
	    function t() {}return !(s(function () {}, [], t) instanceof t);
	  }),
	      h = !a(function () {
	    s(function () {});
	  });e(e.S + e.F * (l || h), "Reflect", { construct: function construct(t, n) {
	      o(t), u(n);var r = arguments.length < 3 ? t : o(arguments[2]);if (h && !l) return s(t, n, r);if (t == r) {
	        switch (n.length) {case 0:
	            return new t();case 1:
	            return new t(n[0]);case 2:
	            return new t(n[0], n[1]);case 3:
	            return new t(n[0], n[1], n[2]);case 4:
	            return new t(n[0], n[1], n[2], n[3]);}var e = [null];return e.push.apply(e, n), new (f.apply(t, e))();
	      }var a = r.prototype,
	          v = i(c(a) ? a : Object.prototype),
	          p = Function.apply.call(t, v, n);return c(p) ? p : v;
	    } });
	}, function (t, n, r) {
	  var e = r(17),
	      i = r(14),
	      o = r(18),
	      u = r(22);i(i.S + i.F * r(13)(function () {
	    Reflect.defineProperty(e.f({}, 1, { value: 1 }), 1, { value: 2 });
	  }), "Reflect", { defineProperty: function defineProperty(t, n, r) {
	      o(t), n = u(n, !0), o(r);try {
	        return e.f(t, n, r), !0;
	      } catch (t) {
	        return !1;
	      }
	    } });
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(57).f,
	      o = r(18);e(e.S, "Reflect", { deleteProperty: function deleteProperty(t, n) {
	      var r = i(o(t), n);return !(r && !r.configurable) && delete t[n];
	    } });
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(18),
	      o = function o(t) {
	    this._t = i(t), this._i = 0;var n,
	        r = this._k = [];for (n in t) {
	      r.push(n);
	    }
	  };r(136)(o, "Object", function () {
	    var t,
	        n = this,
	        r = n._k;do {
	      if (n._i >= r.length) return { value: void 0, done: !0 };
	    } while (!((t = r[n._i++]) in n._t));return { value: t, done: !1 };
	  }), e(e.S, "Reflect", { enumerate: function enumerate(t) {
	      return new o(t);
	    } });
	}, function (t, n, r) {
	  function e(t, n) {
	    var r,
	        c,
	        s = arguments.length < 3 ? t : arguments[2];return f(t) === s ? t[n] : (r = i.f(t, n)) ? u(r, "value") ? r.value : void 0 !== r.get ? r.get.call(s) : void 0 : a(c = o(t)) ? e(c, n, s) : void 0;
	  }var i = r(57),
	      o = r(65),
	      u = r(11),
	      c = r(14),
	      a = r(19),
	      f = r(18);c(c.S, "Reflect", { get: e });
	}, function (t, n, r) {
	  var e = r(57),
	      i = r(14),
	      o = r(18);i(i.S, "Reflect", { getOwnPropertyDescriptor: function getOwnPropertyDescriptor(t, n) {
	      return e.f(o(t), n);
	    } });
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(65),
	      o = r(18);e(e.S, "Reflect", { getPrototypeOf: function getPrototypeOf(t) {
	      return i(o(t));
	    } });
	}, function (t, n, r) {
	  var e = r(14);e(e.S, "Reflect", { has: function has(t, n) {
	      return n in t;
	    } });
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(18),
	      o = Object.isExtensible;e(e.S, "Reflect", { isExtensible: function isExtensible(t) {
	      return i(t), !o || o(t);
	    } });
	}, function (t, n, r) {
	  var e = r(14);e(e.S, "Reflect", { ownKeys: r(249) });
	}, function (t, n, r) {
	  var e = r(56),
	      i = r(49),
	      o = r(18),
	      u = r(10).Reflect;t.exports = u && u.ownKeys || function (t) {
	    var n = e.f(o(t)),
	        r = i.f;return r ? n.concat(r(t)) : n;
	  };
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(18),
	      o = Object.preventExtensions;e(e.S, "Reflect", { preventExtensions: function preventExtensions(t) {
	      i(t);try {
	        return o && o(t), !0;
	      } catch (t) {
	        return !1;
	      }
	    } });
	}, function (t, n, r) {
	  function e(t, n, r) {
	    var a,
	        h,
	        v = arguments.length < 4 ? t : arguments[3],
	        p = o.f(s(t), n);if (!p) {
	      if (l(h = u(t))) return e(h, n, r, v);p = f(0);
	    }return c(p, "value") ? !(p.writable === !1 || !l(v)) && (a = o.f(v, n) || f(0), a.value = r, i.f(v, n, a), !0) : void 0 !== p.set && (p.set.call(v, r), !0);
	  }var i = r(17),
	      o = r(57),
	      u = r(65),
	      c = r(11),
	      a = r(14),
	      f = r(23),
	      s = r(18),
	      l = r(19);a(a.S, "Reflect", { set: e });
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(79);i && e(e.S, "Reflect", { setPrototypeOf: function setPrototypeOf(t, n) {
	      i.check(t, n);try {
	        return i.set(t, n), !0;
	      } catch (t) {
	        return !1;
	      }
	    } });
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(42)(!0);e(e.P, "Array", { includes: function includes(t) {
	      return i(this, t, arguments.length > 1 ? arguments[1] : void 0);
	    } }), r(192)("includes");
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(133)(!0);e(e.P, "String", { at: function at(t) {
	      return i(this, t);
	    } });
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(256);e(e.P, "String", { padStart: function padStart(t) {
	      return i(this, t, arguments.length > 1 ? arguments[1] : void 0, !0);
	    } });
	}, function (t, n, r) {
	  var e = r(43),
	      i = r(97),
	      o = r(41);t.exports = function (t, n, r, u) {
	    var c = String(o(t)),
	        a = c.length,
	        f = void 0 === r ? " " : String(r),
	        s = e(n);if (s <= a || "" == f) return c;var l = s - a,
	        h = i.call(f, Math.ceil(l / f.length));return h.length > l && (h = h.slice(0, l)), u ? h + c : c + h;
	  };
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(256);e(e.P, "String", { padEnd: function padEnd(t) {
	      return i(this, t, arguments.length > 1 ? arguments[1] : void 0, !1);
	    } });
	}, function (t, n, r) {
	  "use strict";
	  r(89)("trimLeft", function (t) {
	    return function () {
	      return t(this, 1);
	    };
	  }, "trimStart");
	}, function (t, n, r) {
	  "use strict";
	  r(89)("trimRight", function (t) {
	    return function () {
	      return t(this, 2);
	    };
	  }, "trimEnd");
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(41),
	      o = r(43),
	      u = r(140),
	      c = r(202),
	      a = RegExp.prototype,
	      f = function f(t, n) {
	    this._r = t, this._s = n;
	  };r(136)(f, "RegExp String", function () {
	    var t = this._r.exec(this._s);return { value: t, done: null === t };
	  }), e(e.P, "String", { matchAll: function matchAll(t) {
	      if (i(this), !u(t)) throw TypeError(t + " is not a regexp!");var n = String(this),
	          r = "flags" in a ? String(t.flags) : c.call(t),
	          e = new RegExp(t.source, ~r.indexOf("g") ? r : "g" + r);return e.lastIndex = o(t.lastIndex), new f(e, n);
	    } });
	}, function (t, n, r) {
	  r(33)("asyncIterator");
	}, function (t, n, r) {
	  r(33)("observable");
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(249),
	      o = r(38),
	      u = r(57),
	      c = r(169);e(e.S, "Object", { getOwnPropertyDescriptors: function getOwnPropertyDescriptors(t) {
	      for (var n, r = o(t), e = u.f, a = i(r), f = {}, s = 0; a.length > s;) {
	        c(f, n = a[s++], e(r, n));
	      }return f;
	    } });
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(265)(!1);e(e.S, "Object", { values: function values(t) {
	      return i(t);
	    } });
	}, function (t, n, r) {
	  var e = r(36),
	      i = r(38),
	      o = r(50).f;t.exports = function (t) {
	    return function (n) {
	      for (var r, u = i(n), c = e(u), a = c.length, f = 0, s = []; a > f;) {
	        o.call(u, r = c[f++]) && s.push(t ? [r, u[r]] : u[r]);
	      }return s;
	    };
	  };
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(265)(!0);e(e.S, "Object", { entries: function entries(t) {
	      return i(t);
	    } });
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(64),
	      o = r(27),
	      u = r(17);r(12) && e(e.P + r(268), "Object", { __defineGetter__: function __defineGetter__(t, n) {
	      u.f(i(this), t, { get: o(n), enumerable: !0, configurable: !0 });
	    } });
	}, function (t, n, r) {
	  t.exports = r(34) || !r(13)(function () {
	    var t = Math.random();__defineSetter__.call(null, t, function () {}), delete r(10)[t];
	  });
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(64),
	      o = r(27),
	      u = r(17);r(12) && e(e.P + r(268), "Object", { __defineSetter__: function __defineSetter__(t, n) {
	      u.f(i(this), t, { set: o(n), enumerable: !0, configurable: !0 });
	    } });
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(64),
	      o = r(22),
	      u = r(65),
	      c = r(57).f;r(12) && e(e.P + r(268), "Object", { __lookupGetter__: function __lookupGetter__(t) {
	      var n,
	          r = i(this),
	          e = o(t, !0);do {
	        if (n = c(r, e)) return n.get;
	      } while (r = u(r));
	    } });
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(64),
	      o = r(22),
	      u = r(65),
	      c = r(57).f;r(12) && e(e.P + r(268), "Object", { __lookupSetter__: function __lookupSetter__(t) {
	      var n,
	          r = i(this),
	          e = o(t, !0);do {
	        if (n = c(r, e)) return n.set;
	      } while (r = u(r));
	    } });
	}, function (t, n, r) {
	  var e = r(14);e(e.P + e.R, "Map", { toJSON: r(273)("Map") });
	}, function (t, n, r) {
	  var e = r(81),
	      i = r(274);t.exports = function (t) {
	    return function () {
	      if (e(this) != t) throw TypeError(t + "#toJSON isn't generic");return i(this);
	    };
	  };
	}, function (t, n, r) {
	  var e = r(212);t.exports = function (t, n) {
	    var r = [];return e(t, !1, r.push, r, n), r;
	  };
	}, function (t, n, r) {
	  var e = r(14);e(e.P + e.R, "Set", { toJSON: r(273)("Set") });
	}, function (t, n, r) {
	  var e = r(14);e(e.S, "System", { global: r(10) });
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(40);e(e.S, "Error", { isError: function isError(t) {
	      return "Error" === i(t);
	    } });
	}, function (t, n, r) {
	  var e = r(14);e(e.S, "Math", { iaddh: function iaddh(t, n, r, e) {
	      var i = t >>> 0,
	          o = n >>> 0,
	          u = r >>> 0;return o + (e >>> 0) + ((i & u | (i | u) & ~(i + u >>> 0)) >>> 31) | 0;
	    } });
	}, function (t, n, r) {
	  var e = r(14);e(e.S, "Math", { isubh: function isubh(t, n, r, e) {
	      var i = t >>> 0,
	          o = n >>> 0,
	          u = r >>> 0;return o - (e >>> 0) - ((~i & u | ~(i ^ u) & i - u >>> 0) >>> 31) | 0;
	    } });
	}, function (t, n, r) {
	  var e = r(14);e(e.S, "Math", { imulh: function imulh(t, n) {
	      var r = 65535,
	          e = +t,
	          i = +n,
	          o = e & r,
	          u = i & r,
	          c = e >> 16,
	          a = i >> 16,
	          f = (c * u >>> 0) + (o * u >>> 16);return c * a + (f >> 16) + ((o * a >>> 0) + (f & r) >> 16);
	    } });
	}, function (t, n, r) {
	  var e = r(14);e(e.S, "Math", { umulh: function umulh(t, n) {
	      var r = 65535,
	          e = +t,
	          i = +n,
	          o = e & r,
	          u = i & r,
	          c = e >>> 16,
	          a = i >>> 16,
	          f = (c * u >>> 0) + (o * u >>> 16);return c * a + (f >>> 16) + ((o * a >>> 0) + (f & r) >>> 16);
	    } });
	}, function (t, n, r) {
	  var e = r(283),
	      i = r(18),
	      o = e.key,
	      u = e.set;e.exp({ defineMetadata: function defineMetadata(t, n, r, e) {
	      u(t, n, i(r), o(e));
	    } });
	}, function (t, n, r) {
	  var e = r(217),
	      i = r(14),
	      o = r(29)("metadata"),
	      u = o.store || (o.store = new (r(221))()),
	      c = function c(t, n, r) {
	    var i = u.get(t);if (!i) {
	      if (!r) return;u.set(t, i = new e());
	    }var o = i.get(n);if (!o) {
	      if (!r) return;i.set(n, o = new e());
	    }return o;
	  },
	      a = function a(t, n, r) {
	    var e = c(n, r, !1);return void 0 !== e && e.has(t);
	  },
	      f = function f(t, n, r) {
	    var e = c(n, r, !1);return void 0 === e ? void 0 : e.get(t);
	  },
	      s = function s(t, n, r, e) {
	    c(r, e, !0).set(t, n);
	  },
	      l = function l(t, n) {
	    var r = c(t, n, !1),
	        e = [];return r && r.forEach(function (t, n) {
	      e.push(n);
	    }), e;
	  },
	      h = function h(t) {
	    return void 0 === t || "symbol" == (typeof t === "undefined" ? "undefined" : _typeof(t)) ? t : String(t);
	  },
	      v = function v(t) {
	    i(i.S, "Reflect", t);
	  };t.exports = { store: u, map: c, has: a, get: f, set: s, keys: l, key: h, exp: v };
	}, function (t, n, r) {
	  var e = r(283),
	      i = r(18),
	      o = e.key,
	      u = e.map,
	      c = e.store;e.exp({ deleteMetadata: function deleteMetadata(t, n) {
	      var r = arguments.length < 3 ? void 0 : o(arguments[2]),
	          e = u(i(n), r, !1);if (void 0 === e || !e.delete(t)) return !1;if (e.size) return !0;var a = c.get(n);return a.delete(r), !!a.size || c.delete(n);
	    } });
	}, function (t, n, r) {
	  var e = r(283),
	      i = r(18),
	      o = r(65),
	      u = e.has,
	      c = e.get,
	      a = e.key,
	      f = function f(t, n, r) {
	    var e = u(t, n, r);if (e) return c(t, n, r);var i = o(n);return null !== i ? f(t, i, r) : void 0;
	  };e.exp({ getMetadata: function getMetadata(t, n) {
	      return f(t, i(n), arguments.length < 3 ? void 0 : a(arguments[2]));
	    } });
	}, function (t, n, r) {
	  var e = r(220),
	      i = r(274),
	      o = r(283),
	      u = r(18),
	      c = r(65),
	      a = o.keys,
	      f = o.key,
	      s = function s(t, n) {
	    var r = a(t, n),
	        o = c(t);if (null === o) return r;var u = s(o, n);return u.length ? r.length ? i(new e(r.concat(u))) : u : r;
	  };o.exp({ getMetadataKeys: function getMetadataKeys(t) {
	      return s(u(t), arguments.length < 2 ? void 0 : f(arguments[1]));
	    } });
	}, function (t, n, r) {
	  var e = r(283),
	      i = r(18),
	      o = e.get,
	      u = e.key;e.exp({ getOwnMetadata: function getOwnMetadata(t, n) {
	      return o(t, i(n), arguments.length < 3 ? void 0 : u(arguments[2]));
	    } });
	}, function (t, n, r) {
	  var e = r(283),
	      i = r(18),
	      o = e.keys,
	      u = e.key;e.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(t) {
	      return o(i(t), arguments.length < 2 ? void 0 : u(arguments[1]));
	    } });
	}, function (t, n, r) {
	  var e = r(283),
	      i = r(18),
	      o = r(65),
	      u = e.has,
	      c = e.key,
	      a = function a(t, n, r) {
	    var e = u(t, n, r);if (e) return !0;var i = o(n);return null !== i && a(t, i, r);
	  };e.exp({ hasMetadata: function hasMetadata(t, n) {
	      return a(t, i(n), arguments.length < 3 ? void 0 : c(arguments[2]));
	    } });
	}, function (t, n, r) {
	  var e = r(283),
	      i = r(18),
	      o = e.has,
	      u = e.key;e.exp({ hasOwnMetadata: function hasOwnMetadata(t, n) {
	      return o(t, i(n), arguments.length < 3 ? void 0 : u(arguments[2]));
	    } });
	}, function (t, n, r) {
	  var e = r(283),
	      i = r(18),
	      o = r(27),
	      u = e.key,
	      c = e.set;e.exp({ metadata: function metadata(t, n) {
	      return function (r, e) {
	        c(t, n, (void 0 !== e ? i : o)(r), u(e));
	      };
	    } });
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(215)(),
	      o = r(10).process,
	      u = "process" == r(40)(o);e(e.G, { asap: function asap(t) {
	      var n = u && o.domain;i(n ? n.bind(t) : t);
	    } });
	}, function (t, n, r) {
	  "use strict";
	  var e = r(14),
	      i = r(10),
	      o = r(15),
	      u = r(215)(),
	      c = r(31)("observable"),
	      a = r(27),
	      f = r(18),
	      s = r(211),
	      l = r(216),
	      h = r(16),
	      v = r(212),
	      p = v.RETURN,
	      d = function d(t) {
	    return null == t ? void 0 : a(t);
	  },
	      g = function g(t) {
	    var n = t._c;n && (t._c = void 0, n());
	  },
	      y = function y(t) {
	    return void 0 === t._o;
	  },
	      m = function m(t) {
	    y(t) || (t._o = void 0, g(t));
	  },
	      b = function b(t, n) {
	    f(t), this._c = void 0, this._o = t, t = new w(this);try {
	      var r = n(t),
	          e = r;null != r && ("function" == typeof r.unsubscribe ? r = function r() {
	        e.unsubscribe();
	      } : a(r), this._c = r);
	    } catch (n) {
	      return void t.error(n);
	    }y(this) && g(this);
	  };b.prototype = l({}, { unsubscribe: function unsubscribe() {
	      m(this);
	    } });var w = function w(t) {
	    this._s = t;
	  };w.prototype = l({}, { next: function next(t) {
	      var n = this._s;if (!y(n)) {
	        var r = n._o;try {
	          var e = d(r.next);if (e) return e.call(r, t);
	        } catch (t) {
	          try {
	            m(n);
	          } finally {
	            throw t;
	          }
	        }
	      }
	    }, error: function error(t) {
	      var n = this._s;if (y(n)) throw t;var r = n._o;n._o = void 0;try {
	        var e = d(r.error);if (!e) throw t;t = e.call(r, t);
	      } catch (t) {
	        try {
	          g(n);
	        } finally {
	          throw t;
	        }
	      }return g(n), t;
	    }, complete: function complete(t) {
	      var n = this._s;if (!y(n)) {
	        var r = n._o;n._o = void 0;try {
	          var e = d(r.complete);t = e ? e.call(r, t) : void 0;
	        } catch (t) {
	          try {
	            g(n);
	          } finally {
	            throw t;
	          }
	        }return g(n), t;
	      }
	    } });var _ = function _(t) {
	    s(this, _, "Observable", "_f")._f = a(t);
	  };l(_.prototype, { subscribe: function subscribe(t) {
	      return new b(t, this._f);
	    }, forEach: function forEach(t) {
	      var n = this;return new (o.Promise || i.Promise)(function (r, e) {
	        a(t);var i = n.subscribe({ next: function next(n) {
	            try {
	              return t(n);
	            } catch (t) {
	              e(t), i.unsubscribe();
	            }
	          }, error: e, complete: r });
	      });
	    } }), l(_, { from: function from(t) {
	      var n = "function" == typeof this ? this : _,
	          r = d(f(t)[c]);if (r) {
	        var e = f(r.call(t));return e.constructor === n ? e : new n(function (t) {
	          return e.subscribe(t);
	        });
	      }return new n(function (n) {
	        var r = !1;return u(function () {
	          if (!r) {
	            try {
	              if (v(t, !1, function (t) {
	                if (n.next(t), r) return p;
	              }) === p) return;
	            } catch (t) {
	              if (r) throw t;return void n.error(t);
	            }n.complete();
	          }
	        }), function () {
	          r = !0;
	        };
	      });
	    }, of: function of() {
	      for (var t = 0, n = arguments.length, r = Array(n); t < n;) {
	        r[t] = arguments[t++];
	      }return new ("function" == typeof this ? this : _)(function (t) {
	        var n = !1;return u(function () {
	          if (!n) {
	            for (var e = 0; e < r.length; ++e) {
	              if (t.next(r[e]), n) return;
	            }t.complete();
	          }
	        }), function () {
	          n = !0;
	        };
	      });
	    } }), h(_.prototype, c, function () {
	    return this;
	  }), e(e.G, { Observable: _ }), r(198)("Observable");
	}, function (t, n, r) {
	  var e = r(10),
	      i = r(14),
	      o = r(84),
	      u = r(295),
	      c = e.navigator,
	      a = !!c && /MSIE .\./.test(c.userAgent),
	      f = function f(t) {
	    return a ? function (n, r) {
	      return t(o(u, [].slice.call(arguments, 2), "function" == typeof n ? n : Function(n)), r);
	    } : t;
	  };i(i.G + i.B + i.F * a, { setTimeout: f(e.setTimeout), setInterval: f(e.setInterval) });
	}, function (t, n, r) {
	  "use strict";
	  var e = r(296),
	      i = r(84),
	      o = r(27);t.exports = function () {
	    for (var t = o(this), n = arguments.length, r = Array(n), u = 0, c = e._, a = !1; n > u;) {
	      (r[u] = arguments[u++]) === c && (a = !0);
	    }return function () {
	      var e,
	          o = this,
	          u = arguments.length,
	          f = 0,
	          s = 0;if (!a && !u) return i(t, r, o);if (e = r.slice(), a) for (; n > f; f++) {
	        e[f] === c && (e[f] = arguments[s++]);
	      }for (; u > s;) {
	        e.push(arguments[s++]);
	      }return i(t, e, o);
	    };
	  };
	}, function (t, n, r) {
	  t.exports = r(10);
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(214);e(e.G + e.B, { setImmediate: i.set, clearImmediate: i.clear });
	}, function (t, n, r) {
	  for (var e = r(199), i = r(24), o = r(10), u = r(16), c = r(135), a = r(31), f = a("iterator"), s = a("toStringTag"), l = c.Array, h = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], v = 0; v < 5; v++) {
	    var p,
	        d = h[v],
	        g = o[d],
	        y = g && g.prototype;if (y) {
	      y[f] || u(y, f, l), y[s] || u(y, s, d), c[d] = l;for (p in e) {
	        y[p] || i(y, p, e[p], !0);
	      }
	    }
	  }
	}, function (t, n, r) {
	  (function (n, r) {
	    !function (n) {
	      "use strict";
	      function e(t, n, r, e) {
	        var i = n && n.prototype instanceof o ? n : o,
	            u = Object.create(i.prototype),
	            c = new p(e || []);return u._invoke = s(t, r, c), u;
	      }function i(t, n, r) {
	        try {
	          return { type: "normal", arg: t.call(n, r) };
	        } catch (t) {
	          return { type: "throw", arg: t };
	        }
	      }function o() {}function u() {}function c() {}function a(t) {
	        ["next", "throw", "return"].forEach(function (n) {
	          t[n] = function (t) {
	            return this._invoke(n, t);
	          };
	        });
	      }function f(t) {
	        function n(r, e, o, u) {
	          var c = i(t[r], t, e);if ("throw" !== c.type) {
	            var a = c.arg,
	                f = a.value;return f && "object" == (typeof f === "undefined" ? "undefined" : _typeof(f)) && b.call(f, "__await") ? Promise.resolve(f.__await).then(function (t) {
	              n("next", t, o, u);
	            }, function (t) {
	              n("throw", t, o, u);
	            }) : Promise.resolve(f).then(function (t) {
	              a.value = t, o(a);
	            }, u);
	          }u(c.arg);
	        }function e(t, r) {
	          function e() {
	            return new Promise(function (e, i) {
	              n(t, r, e, i);
	            });
	          }return o = o ? o.then(e, e) : e();
	        }"object" == (typeof r === "undefined" ? "undefined" : _typeof(r)) && r.domain && (n = r.domain.bind(n));var o;this._invoke = e;
	      }function s(t, n, r) {
	        var e = O;return function (o, u) {
	          if (e === M) throw new Error("Generator is already running");if (e === F) {
	            if ("throw" === o) throw u;return g();
	          }for (r.method = o, r.arg = u;;) {
	            var c = r.delegate;if (c) {
	              var a = l(c, r);if (a) {
	                if (a === k) continue;return a;
	              }
	            }if ("next" === r.method) r.sent = r._sent = r.arg;else if ("throw" === r.method) {
	              if (e === O) throw e = F, r.arg;r.dispatchException(r.arg);
	            } else "return" === r.method && r.abrupt("return", r.arg);e = M;var f = i(t, n, r);if ("normal" === f.type) {
	              if (e = r.done ? F : P, f.arg === k) continue;return { value: f.arg, done: r.done };
	            }"throw" === f.type && (e = F, r.method = "throw", r.arg = f.arg);
	          }
	        };
	      }function l(t, n) {
	        var r = t.iterator[n.method];if (r === y) {
	          if (n.delegate = null, "throw" === n.method) {
	            if (t.iterator.return && (n.method = "return", n.arg = y, l(t, n), "throw" === n.method)) return k;n.method = "throw", n.arg = new TypeError("The iterator does not provide a 'throw' method");
	          }return k;
	        }var e = i(r, t.iterator, n.arg);if ("throw" === e.type) return n.method = "throw", n.arg = e.arg, n.delegate = null, k;var o = e.arg;return o ? o.done ? (n[t.resultName] = o.value, n.next = t.nextLoc, "return" !== n.method && (n.method = "next", n.arg = y), n.delegate = null, k) : o : (n.method = "throw", n.arg = new TypeError("iterator result is not an object"), n.delegate = null, k);
	      }function h(t) {
	        var n = { tryLoc: t[0] };1 in t && (n.catchLoc = t[1]), 2 in t && (n.finallyLoc = t[2], n.afterLoc = t[3]), this.tryEntries.push(n);
	      }function v(t) {
	        var n = t.completion || {};n.type = "normal", delete n.arg, t.completion = n;
	      }function p(t) {
	        this.tryEntries = [{ tryLoc: "root" }], t.forEach(h, this), this.reset(!0);
	      }function d(t) {
	        if (t) {
	          var n = t[_];if (n) return n.call(t);if ("function" == typeof t.next) return t;if (!isNaN(t.length)) {
	            var r = -1,
	                e = function n() {
	              for (; ++r < t.length;) {
	                if (b.call(t, r)) return n.value = t[r], n.done = !1, n;
	              }return n.value = y, n.done = !0, n;
	            };return e.next = e;
	          }
	        }return { next: g };
	      }function g() {
	        return { value: y, done: !0 };
	      }var y,
	          m = Object.prototype,
	          b = m.hasOwnProperty,
	          w = "function" == typeof Symbol ? Symbol : {},
	          _ = w.iterator || "@@iterator",
	          x = w.toStringTag || "@@toStringTag",
	          S = "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)),
	          E = n.regeneratorRuntime;if (E) return void (S && (t.exports = E));E = n.regeneratorRuntime = S ? t.exports : {}, E.wrap = e;var O = "suspendedStart",
	          P = "suspendedYield",
	          M = "executing",
	          F = "completed",
	          k = {},
	          j = {};j[_] = function () {
	        return this;
	      };var A = Object.getPrototypeOf,
	          N = A && A(A(d([])));N && N !== m && b.call(N, _) && (j = N);var I = c.prototype = o.prototype = Object.create(j);u.prototype = I.constructor = c, c.constructor = u, c[x] = u.displayName = "GeneratorFunction", E.isGeneratorFunction = function (t) {
	        var n = "function" == typeof t && t.constructor;return !!n && (n === u || "GeneratorFunction" === (n.displayName || n.name));
	      }, E.mark = function (t) {
	        return Object.setPrototypeOf ? Object.setPrototypeOf(t, c) : (t.__proto__ = c, x in t || (t[x] = "GeneratorFunction")), t.prototype = Object.create(I), t;
	      }, E.awrap = function (t) {
	        return { __await: t };
	      }, a(f.prototype), E.AsyncIterator = f, E.async = function (t, n, r, i) {
	        var o = new f(e(t, n, r, i));return E.isGeneratorFunction(n) ? o : o.next().then(function (t) {
	          return t.done ? t.value : o.next();
	        });
	      }, a(I), I[x] = "Generator", I.toString = function () {
	        return "[object Generator]";
	      }, E.keys = function (t) {
	        var n = [];for (var r in t) {
	          n.push(r);
	        }return n.reverse(), function r() {
	          for (; n.length;) {
	            var e = n.pop();if (e in t) return r.value = e, r.done = !1, r;
	          }return r.done = !0, r;
	        };
	      }, E.values = d, p.prototype = { constructor: p, reset: function reset(t) {
	          if (this.prev = 0, this.next = 0, this.sent = this._sent = y, this.done = !1, this.delegate = null, this.method = "next", this.arg = y, this.tryEntries.forEach(v), !t) for (var n in this) {
	            "t" === n.charAt(0) && b.call(this, n) && !isNaN(+n.slice(1)) && (this[n] = y);
	          }
	        }, stop: function stop() {
	          this.done = !0;var t = this.tryEntries[0],
	              n = t.completion;if ("throw" === n.type) throw n.arg;return this.rval;
	        }, dispatchException: function dispatchException(t) {
	          function n(n, e) {
	            return o.type = "throw", o.arg = t, r.next = n, e && (r.method = "next", r.arg = y), !!e;
	          }if (this.done) throw t;for (var r = this, e = this.tryEntries.length - 1; e >= 0; --e) {
	            var i = this.tryEntries[e],
	                o = i.completion;if ("root" === i.tryLoc) return n("end");if (i.tryLoc <= this.prev) {
	              var u = b.call(i, "catchLoc"),
	                  c = b.call(i, "finallyLoc");if (u && c) {
	                if (this.prev < i.catchLoc) return n(i.catchLoc, !0);if (this.prev < i.finallyLoc) return n(i.finallyLoc);
	              } else if (u) {
	                if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
	              } else {
	                if (!c) throw new Error("try statement without catch or finally");if (this.prev < i.finallyLoc) return n(i.finallyLoc);
	              }
	            }
	          }
	        }, abrupt: function abrupt(t, n) {
	          for (var r = this.tryEntries.length - 1; r >= 0; --r) {
	            var e = this.tryEntries[r];if (e.tryLoc <= this.prev && b.call(e, "finallyLoc") && this.prev < e.finallyLoc) {
	              var i = e;break;
	            }
	          }i && ("break" === t || "continue" === t) && i.tryLoc <= n && n <= i.finallyLoc && (i = null);var o = i ? i.completion : {};return o.type = t, o.arg = n, i ? (this.method = "next", this.next = i.finallyLoc, k) : this.complete(o);
	        }, complete: function complete(t, n) {
	          if ("throw" === t.type) throw t.arg;return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && n && (this.next = n), k;
	        }, finish: function finish(t) {
	          for (var n = this.tryEntries.length - 1; n >= 0; --n) {
	            var r = this.tryEntries[n];if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), v(r), k;
	          }
	        }, catch: function _catch(t) {
	          for (var n = this.tryEntries.length - 1; n >= 0; --n) {
	            var r = this.tryEntries[n];if (r.tryLoc === t) {
	              var e = r.completion;if ("throw" === e.type) {
	                var i = e.arg;v(r);
	              }return i;
	            }
	          }throw new Error("illegal catch attempt");
	        }, delegateYield: function delegateYield(t, n, r) {
	          return this.delegate = { iterator: d(t), resultName: n, nextLoc: r }, "next" === this.method && (this.arg = y), k;
	        } };
	    }("object" == (typeof n === "undefined" ? "undefined" : _typeof(n)) ? n : "object" == (typeof window === "undefined" ? "undefined" : _typeof(window)) ? window : "object" == (typeof self === "undefined" ? "undefined" : _typeof(self)) ? self : this);
	  }).call(n, function () {
	    return this;
	  }(), r(300));
	}, function (t, n) {
	  function r() {
	    throw new Error("setTimeout has not been defined");
	  }function e() {
	    throw new Error("clearTimeout has not been defined");
	  }function i(t) {
	    if (s === setTimeout) return setTimeout(t, 0);if ((s === r || !s) && setTimeout) return s = setTimeout, setTimeout(t, 0);try {
	      return s(t, 0);
	    } catch (n) {
	      try {
	        return s.call(null, t, 0);
	      } catch (n) {
	        return s.call(this, t, 0);
	      }
	    }
	  }function o(t) {
	    if (l === clearTimeout) return clearTimeout(t);if ((l === e || !l) && clearTimeout) return l = clearTimeout, clearTimeout(t);try {
	      return l(t);
	    } catch (n) {
	      try {
	        return l.call(null, t);
	      } catch (n) {
	        return l.call(this, t);
	      }
	    }
	  }function u() {
	    d && v && (d = !1, v.length ? p = v.concat(p) : g = -1, p.length && c());
	  }function c() {
	    if (!d) {
	      var t = i(u);d = !0;for (var n = p.length; n;) {
	        for (v = p, p = []; ++g < n;) {
	          v && v[g].run();
	        }g = -1, n = p.length;
	      }v = null, d = !1, o(t);
	    }
	  }function a(t, n) {
	    this.fun = t, this.array = n;
	  }function f() {}var s,
	      l,
	      h = t.exports = {};!function () {
	    try {
	      s = "function" == typeof setTimeout ? setTimeout : r;
	    } catch (t) {
	      s = r;
	    }try {
	      l = "function" == typeof clearTimeout ? clearTimeout : e;
	    } catch (t) {
	      l = e;
	    }
	  }();var v,
	      p = [],
	      d = !1,
	      g = -1;h.nextTick = function (t) {
	    var n = new Array(arguments.length - 1);if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) {
	      n[r - 1] = arguments[r];
	    }p.push(new a(t, n)), 1 !== p.length || d || i(c);
	  }, a.prototype.run = function () {
	    this.fun.apply(null, this.array);
	  }, h.title = "browser", h.browser = !0, h.env = {}, h.argv = [], h.version = "", h.versions = {}, h.on = f, h.addListener = f, h.once = f, h.off = f, h.removeListener = f, h.removeAllListeners = f, h.emit = f, h.binding = function (t) {
	    throw new Error("process.binding is not supported");
	  }, h.cwd = function () {
	    return "/";
	  }, h.chdir = function (t) {
	    throw new Error("process.chdir is not supported");
	  }, h.umask = function () {
	    return 0;
	  };
	}, function (t, n, r) {
	  r(302), t.exports = r(15).RegExp.escape;
	}, function (t, n, r) {
	  var e = r(14),
	      i = r(303)(/[\\^$*+?.()|[\]{}]/g, "\\$&");e(e.S, "RegExp", { escape: function escape(t) {
	      return i(t);
	    } });
	}, function (t, n) {
	  t.exports = function (t, n) {
	    var r = n === Object(n) ? function (t) {
	      return n[t];
	    } : n;return function (n) {
	      return String(n).replace(t, r);
	    };
	  };
	}]);

/***/ }
/******/ ]);