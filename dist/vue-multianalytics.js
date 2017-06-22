module.exports =
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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _AnalyticsPlugin = __webpack_require__(1);

	var _AnalyticsPlugin2 = _interopRequireDefault(_AnalyticsPlugin);

	var _GAModule = __webpack_require__(2);

	var _GAModule2 = _interopRequireDefault(_GAModule);

	var _MixpanelModule = __webpack_require__(6);

	var _MixpanelModule2 = _interopRequireDefault(_MixpanelModule);

	var _SegmentModule = __webpack_require__(7);

	var _SegmentModule2 = _interopRequireDefault(_SegmentModule);

	var _FacebookModule = __webpack_require__(8);

	var _FacebookModule2 = _interopRequireDefault(_FacebookModule);

	var _utils = __webpack_require__(5);

	var Utils = _interopRequireWildcard(_utils);

	var _analyticsTypes = __webpack_require__(3);

	var types = _interopRequireWildcard(_analyticsTypes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Installation procedure
	 *
	 * @param Vue
	 * @param initConf
	 */

	var install = function install(Vue) {
	  var initConf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	  var mixin = arguments[2];

	  // init Google Analytics
	  // We create all the modules that app will use
	  Vue.modulesEnabled = [];
	  for (var key in initConf.modules) {
	    var module = void 0;
	    switch (key) {
	      case types.MODULE_GA:
	        module = new _GAModule2.default();
	        module.init(initConf.modules[key]);
	        break;
	      case types.MODULE_MIXPANEL:
	        module = new _MixpanelModule2.default();
	        module.init(initConf.modules[key]);
	        break;
	      case types.MODULE_SEGMENT:
	        module = new _SegmentModule2.default();
	        module.init(initConf.modules[key]);
	        break;
	      case types.MODULE_FACEBOOK:
	        module = new _FacebookModule2.default();
	        module.init(initConf.modules[key]);
	        break;
	      default:
	        break;
	    }
	    if (module) {
	      Vue.modulesEnabled.push(module);
	    }
	  }
	  // Handle vue-router if defined
	  if (initConf.routing && initConf.routing.vueRouter) {
	    initVueRouterGuard(Vue, initConf.routing);
	  }

	  // Add to vue prototype and also from globals
	  var analyticsPlugin = new _AnalyticsPlugin2.default(Vue.modulesEnabled);
	  Vue.prototype.$multianalytics = Vue.prototype.$ma = Vue.ma = analyticsPlugin;

	  // User can add its own implementation of an interface
	  if (mixin) {
	    Vue.prototype.$multianalyticsm = Vue.prototype.$mam = Vue.mam = mixin(analyticsPlugin);
	  }
	};

	/**
	 * Init the router guard.
	 *
	 * @param {any} Vue - The Vue instance
	 * @param {any} routing - an object with some properties to be used by the vueRouterGuard. Possible params are 'vueRouter', 'ignoredView', 'preferredProperty', 'ignoredModules'
	 * @returns {string[]} The ignored routes names formalized.
	 */
	var initVueRouterGuard = function initVueRouterGuard(Vue, routing) {
	  // Flatten routes name
	  if (routing.ignoredViews) {
	    routing.ignoredViews = routing.ignoredViews.map(function (view) {
	      return view.toLowerCase();
	    });
	  }

	  if (!routing.preferredProperty) {
	    routing.preferredProperty = 'path';
	  }

	  routing.vueRouter.afterEach(function (to) {
	    // Ignore some routes
	    if (routing.ignoredViews && routing.ignoredViews.indexOf(to[routing.preferredProperty].toLowerCase()) !== -1) {
	      return;
	    }
	    // Dispatch vue event using meta analytics value if defined otherwise fallback to route name
	    Vue.ma.trackView({ viewName: to.meta.analytics || to[routing.preferredProperty] }, routing.ignoredModules);
	  });

	  return routing.ignoredViews;
	};

	// Export module
	exports.default = { install: install };

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Plugin main class
	 */
	var AnalyticsPlugin = function () {
	  function AnalyticsPlugin(modulesEnabled) {
	    _classCallCheck(this, AnalyticsPlugin);

	    this.modulesEnabled = modulesEnabled;
	  }

	  /**
	   * Dispatch a view analytics event
	   *
	   * params object should contain
	   * @param viewName
	   */


	  _createClass(AnalyticsPlugin, [{
	    key: "trackView",
	    value: function trackView() {
	      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var excludedModules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	      if (!params.viewName) {
	        return;
	      }

	      this.modulesEnabled.forEach(function (module) {
	        if (excludedModules.indexOf(module.name) === -1) {
	          module.trackView(params);
	        }
	      });
	    }

	    /**
	     * Dispatch a tracking analytics event
	     *
	     * params object should contain
	     * @param category
	     * @param action
	     * @param label
	     * @param value
	     */

	  }, {
	    key: "trackEvent",
	    value: function trackEvent() {
	      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var excludedModules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	      this.modulesEnabled.forEach(function (module) {
	        if (excludedModules.indexOf(module.name) === -1) {
	          module.trackEvent(params);
	        }
	      });
	    }

	    /**
	     * Track an exception that occurred in the application.
	     *
	     * The params object should contain
	     * @param {string} description - Something describing the error (max. 150 Bytes)
	     * @param {boolean} isFatal - Specifies whether the exception was fatal
	     */

	  }, {
	    key: "trackException",
	    value: function trackException() {
	      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var excludedModules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	      this.modulesEnabled.forEach(function (module) {
	        if (excludedModules.indexOf(module.name) === -1) {
	          module.trackException(params);
	        }
	      });
	    }

	    /**
	     * Track an user timing to measure periods of time.
	     *
	     *  The params object should contain
	     * @param {string} timingCategory - A string for categorizing all user timing variables into logical groups (e.g. 'JS Dependencies').
	     * @param {string} timingVar -  A string to identify the variable being recorded (e.g. 'load').
	     * @param {number} timingValue - The number of milliseconds in elapsed time to report to Google Analytics (e.g. 20).
	     * @param {string|null} timingLabel -  A string that can be used to add flexibility in visualizing user timings in the reports (e.g. 'Google CDN').
	     */

	  }, {
	    key: "trackTiming",
	    value: function trackTiming() {
	      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var excludedModules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	      this.modulesEnabled.forEach(function (module) {
	        if (excludedModules.indexOf(module.name) === -1) {
	          module.trackTiming(params);
	        }
	      });
	    }

	    /**
	    * Ecommerce transactions.
	    * @param {long} id - Transaction ID. Required
	    * @param {string} affiliation -  Affiliation or store name
	    * @param {float} revenue - Grand Total
	    * @param {flat} shipping -  Shipping
	    * @param {float} tax - Tax
	    * @param {string} currency - Currency - https://developers.google.com/analytics/devguides/platform/features/currencies
	    */

	  }, {
	    key: "addTransaction",
	    value: function addTransaction() {
	      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var excludedModules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	      this.modulesEnabled.forEach(function (module) {
	        if (excludedModules.indexOf(module.name) === -1) {
	          module.addTransaction(params);
	        }
	      });
	    }

	    /**
	    * Ecommerce transactions.
	    * @param {long} id - Transaction ID. Required
	    * @param {string} name -  Product name. Required.
	    * @param {string} sku - SKU/code.
	    * @param {string} category -  Category or variation.
	    * @param {float} price - Unit price.
	    * @param {int} quantity - Quantity
	    */

	  }, {
	    key: "addItem",
	    value: function addItem() {
	      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var excludedModules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	      this.modulesEnabled.forEach(function (module) {
	        if (excludedModules.indexOf(module.name) === -1) {
	          module.addItem(params);
	        }
	      });
	    }

	    /**
	    * Ecommerce track a transaction.
	    */

	  }, {
	    key: "trackTransaction",
	    value: function trackTransaction() {
	      var excludedModules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	      this.modulesEnabled.forEach(function (module) {
	        if (excludedModules.indexOf(module.name) === -1) {
	          module.trackTransaction();
	        }
	      });
	    }

	    /**
	    * Ecommerce clear a transaction.
	    */

	  }, {
	    key: "clearTransactions",
	    value: function clearTransactions() {
	      var excludedModules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	      this.modulesEnabled.forEach(function (module) {
	        if (excludedModules.indexOf(module.name) === -1) {
	          module.clearTransactions();
	        }
	      });
	    }

	    /**
	     * Set the username.
	     *
	     * @param {string} name - The username
	     */

	  }, {
	    key: "setUsername",
	    value: function setUsername(name) {
	      var excludedModules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	      this.modulesEnabled.forEach(function (module) {
	        if (excludedModules.indexOf(module.name) === -1) {
	          module.setUsername(name);
	        }
	      });
	    }

	    /**
	     * Set some user properties.
	     *
	     * @param {any} properties - The user properties
	     */

	  }, {
	    key: "setUserProperties",
	    value: function setUserProperties() {
	      var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var excludedModules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	      this.modulesEnabled.forEach(function (module) {
	        if (excludedModules.indexOf(module.name) === -1) {
	          module.setUserProperties(properties);
	        }
	      });
	    }

	    /**
	     * Set some user properties once.
	     *
	     * @param {any} properties - The user properties once
	     */

	  }, {
	    key: "setUserPropertiesOnce",
	    value: function setUserPropertiesOnce() {
	      var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var excludedModules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	      this.modulesEnabled.forEach(function (module) {
	        if (excludedModules.indexOf(module.name) === -1) {
	          module.setUserPropertiesOnce(properties);
	        }
	      });
	    }

	    /**
	     * Set some user properties once.
	     *
	     * @param {any} properties - The some properties that will be sent in all the events if supported
	     */

	  }, {
	    key: "setSuperProperties",
	    value: function setSuperProperties() {
	      var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var excludedModules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	      this.modulesEnabled.forEach(function (module) {
	        if (excludedModules.indexOf(module.name) === -1) {
	          module.setSuperProperties(properties);
	        }
	      });
	    }

	    /**
	     * Set some user properties.
	     *
	     * @param {any} properties - The some properties that will be sent in the next event
	     */

	  }, {
	    key: "setSuperPropertiesOnce",
	    value: function setSuperPropertiesOnce() {
	      var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var excludedModules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	      this.modulesEnabled.forEach(function (module) {
	        if (excludedModules.indexOf(module.name) === -1) {
	          module.setSuperPropertiesOnce(properties);
	        }
	      });
	    }

	    /**
	     * Identify the user
	     *
	     * @param {string} userId - The unique ID of the user
	     * @param {object} options - Options to add
	     */

	  }, {
	    key: "identify",
	    value: function identify() {
	      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	      var excludedModules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	      this.modulesEnabled.forEach(function (module) {
	        if (excludedModules.indexOf(module.name) === -1) {
	          module.identify(params);
	        }
	      });
	    }

	    /**
	     * Set an alias for the current instance
	     *
	     * @param {string} alias - The alias to be set
	     */

	  }, {
	    key: "setAlias",
	    value: function setAlias(alias) {
	      var excludedModules = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

	      this.modulesEnabled.forEach(function (module) {
	        if (excludedModules.indexOf(module.name) === -1) {
	          module.setAlias(alias);
	        }
	      });
	    }

	    /**
	     * Resets the id & clears cache
	     *
	     */

	  }, {
	    key: "reset",
	    value: function reset() {
	      var excludedModules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

	      this.modulesEnabled.forEach(function (module) {
	        if (excludedModules.indexOf(module.name) === -1) {
	          module.reset();
	        }
	      });
	    }
	  }]);

	  return AnalyticsPlugin;
	}();

	exports.default = AnalyticsPlugin;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _analyticsTypes = __webpack_require__(3);

	var _BasicModule2 = __webpack_require__(4);

	var _BasicModule3 = _interopRequireDefault(_BasicModule2);

	var _utils = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var GAModule = function (_BasicModule) {
	  _inherits(GAModule, _BasicModule);

	  function GAModule() {
	    _classCallCheck(this, GAModule);

	    var _this = _possibleConstructorReturn(this, (GAModule.__proto__ || Object.getPrototypeOf(GAModule)).call(this, _analyticsTypes.MODULE_GA));

	    _this.settings = {
	      additionalAccountNames: [], // array of additional account names (only works for analyticsjs)
	      userId: null
	    };
	    return _this;
	  }

	  _createClass(GAModule, [{
	    key: 'init',
	    value: function init() {
	      var initConf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


	      // Load the analytics snippet
	      (function (i, s, o, g, r, a, m) {
	        i['GoogleAnalyticsObject'] = r;
	        i[r] = i[r] || function () {
	          (i[r].q = i[r].q || []).push(arguments);
	        }, i[r].l = 1 * new Date();
	        a = s.createElement(o), m = s.getElementsByTagName(o)[0];
	        // a.async = 1;
	        a.setAttribute('defer', '');
	        a.src = g;
	        m.parentNode.insertBefore(a, m);
	      })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

	      // Apply default configuration
	      // initConf = { ...pluginConfig, ...initConf }
	      var mandatoryParams = ['trackingId', 'appName', 'appVersion'];
	      mandatoryParams.forEach(function (el) {
	        if (!initConf[el]) throw new Error('VueAnalytics : Please provide a "' + el + '" from the config.');
	      });

	      this.config.debug = initConf.debug;

	      // register tracker
	      ga('create', initConf.trackingId, 'auto');
	      ga("set", "transport", "beacon");

	      // set app name and version
	      ga('set', 'appName', initConf.appName);
	      ga('set', 'appVersion', initConf.appVersion);

	      // ecommerce
	      if (initConf['ecommerce']) {
	        ga('require', 'ecommerce');
	      }
	    }

	    // Methods

	    /**
	     * Dispatch a view analytics event
	     * https://developers.google.com/analytics/devguides/collection/analyticsjs/pages
	     *
	     * params object should contain
	     * @param {string} viewName - The name of the view
	     */

	  }, {
	    key: 'trackView',
	    value: function trackView(_ref) {
	      var viewName = _ref.viewName;

	      if (this.config.debug) {
	        (0, _utils.logDebug)(viewName);
	      }

	      var fieldsObject = {
	        hitType: 'pageview',
	        page: viewName
	      };

	      if (this.settings.userId) {
	        ga('set', '&uid', this.settings.userId);
	      }

	      // ga('set', 'screenName', params.viewName)
	      ga('send', fieldsObject);
	    }

	    /**
	     * Dispatch a tracking analytics event
	     * https://developers.google.com/analytics/devguides/collection/analyticsjs/events
	     *
	     * params object should contain
	     * @param {string} category - Typically the object that was interacted with (e.g. 'Video')
	     * @param {string} action - The type of interaction (e.g. 'play')
	     * @param {string} label - Useful for categorizing events (e.g. 'Fall Campaign')
	     * @param {integer} value - A numeric value associated with the event (e.g. 42)
	     */

	  }, {
	    key: 'trackEvent',
	    value: function trackEvent(_ref2) {
	      var _ref2$category = _ref2.category,
	          category = _ref2$category === undefined ? "Event" : _ref2$category,
	          action = _ref2.action,
	          _ref2$label = _ref2.label,
	          label = _ref2$label === undefined ? null : _ref2$label,
	          _ref2$value = _ref2.value,
	          value = _ref2$value === undefined ? null : _ref2$value,
	          _ref2$callback = _ref2.callback,
	          callback = _ref2$callback === undefined ? null : _ref2$callback;

	      if (this.config.debug) {
	        _utils.logDebug.apply(undefined, arguments);
	      }

	      // GA requires that eventValue be an integer, see:
	      // https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#eventValue
	      // https://github.com/luisfarzati/angulartics/issues/81
	      if (value) {
	        var parsed = parseInt(value, 10);
	        value = isNaN(parsed) ? 0 : parsed;
	      }

	      var fieldsObject = {
	        hitType: 'event',
	        eventCategory: category,
	        eventAction: action,
	        eventLabel: label,
	        eventValue: value,
	        hitCallback: callback,
	        userId: this.settings.userId
	      };

	      ga('send', fieldsObject);
	    }

	    /**
	     * Track an exception that occurred in the application.
	     * https://developers.google.com/analytics/devguides/collection/analyticsjs/exceptions
	     *
	     * @param {string} description - Something describing the error (max. 150 Bytes)
	     * @param {boolean} isFatal - Specifies whether the exception was fatal
	     */

	  }, {
	    key: 'trackException',
	    value: function trackException(_ref3) {
	      var _ref3$description = _ref3.description,
	          description = _ref3$description === undefined ? "" : _ref3$description,
	          _ref3$isFatal = _ref3.isFatal,
	          isFatal = _ref3$isFatal === undefined ? false : _ref3$isFatal;

	      if (this.config.debug) {
	        (0, _utils.logDebug)({ description: description, isFatal: isFatal });
	      }
	      ga('send', 'exception', { 'exDescription': description, 'exFatal': isFatal });
	    }

	    /**
	     * Track an user timing to measure periods of time.
	     * https://developers.google.com/analytics/devguides/collection/analyticsjs/user-timings
	     *
	     * @param {string} timingCategory - A string for categorizing all user timing variables into logical groups (e.g. 'JS Dependencies').
	     * @param {string} timingVar -  A string to identify the variable being recorded (e.g. 'load').
	     * @param {number} timingValue - The number of milliseconds in elapsed time to report to Google Analytics (e.g. 20).
	     * @param {string|null} timingLabel -  A string that can be used to add flexibility in visualizing user timings in the reports (e.g. 'Google CDN').
	     */

	  }, {
	    key: 'trackTiming',
	    value: function trackTiming(timingCategory, timingVar, timingValue) {
	      var timingLabel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

	      if (this.config.debug) {
	        (0, _utils.logDebug)({ timingCategory: timingCategory, timingVar: timingVar, timingValue: timingValue, timingLabel: timingLabel });
	      }
	      var conf = {
	        hitType: 'timing',
	        timingCategory: timingCategory,
	        timingVar: timingVar,
	        timingValue: timingValue
	      };
	      if (timingLabel) {
	        conf.timingLabel = timingLabel;
	      }

	      ga('send', conf);
	    }
	  }, {
	    key: 'setUsername',
	    value: function setUsername(userId) {
	      this.settings.userId = userId;
	    }

	    // Same as setUsername

	  }, {
	    key: 'identify',
	    value: function identify(_ref4) {
	      var userId = _ref4.userId;

	      this.setUsername(userId);
	    }
	  }, {
	    key: 'setUserProperties',
	    value: function setUserProperties(_ref5) {
	      var properties = _ref5.properties;
	    }
	    // this.setDimensionsAndMetrics(properties)


	    /**
	    * Ecommerce transactions.
	    * ecommerce needs to be enabled in the module options (ecommerce = true)
	    * More info at https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
	    * @param {long} id - Transaction ID. Required
	    * @param {string} affiliation -  Affiliation or store name
	    * @param {float} revenue - Grand Total
	    * @param {flat} shipping -  Shipping
	    * @param {float} tax - Tax
	    * @param {string} currency - Currency - https://developers.google.com/analytics/devguides/platform/features/currencies
	    */

	  }, {
	    key: 'addTransaction',
	    value: function addTransaction(_ref6) {
	      var id = _ref6.id,
	          _ref6$affiliation = _ref6.affiliation,
	          affiliation = _ref6$affiliation === undefined ? '' : _ref6$affiliation,
	          _ref6$revenue = _ref6.revenue,
	          revenue = _ref6$revenue === undefined ? 0 : _ref6$revenue,
	          _ref6$shipping = _ref6.shipping,
	          shipping = _ref6$shipping === undefined ? 0 : _ref6$shipping,
	          _ref6$tax = _ref6.tax,
	          tax = _ref6$tax === undefined ? 0 : _ref6$tax,
	          _ref6$currency = _ref6.currency,
	          currency = _ref6$currency === undefined ? 'USD' : _ref6$currency;

	      ga('ecommerce:addTransaction', {
	        id: id,
	        affiliation: affiliation,
	        revenue: revenue,
	        shipping: shipping,
	        tax: tax,
	        currency: currency
	      });
	    }

	    /**
	    * Ecommerce transactions.
	    * ecommerce needs to be enabled in the module options (ecommerce = true)
	    * More info at https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
	    * @param {long} id - Transaction ID. Required
	    * @param {string} name -  Product name. Required.
	    * @param {string} sku - SKU/code.
	    * @param {string} category -  Category or variation.
	    * @param {float} price - Unit price.
	    * @param {int} quantity - Quantity
	    */

	  }, {
	    key: 'addItem',
	    value: function addItem(_ref7) {
	      var id = _ref7.id,
	          name = _ref7.name,
	          sku = _ref7.sku,
	          category = _ref7.category,
	          _ref7$price = _ref7.price,
	          price = _ref7$price === undefined ? 0 : _ref7$price,
	          _ref7$quantity = _ref7.quantity,
	          quantity = _ref7$quantity === undefined ? 1 : _ref7$quantity;

	      ga('ecommerce:addItem', {
	        id: id,
	        name: name,
	        sku: sku,
	        category: category,
	        price: price,
	        quantity: quantity
	      });
	    }

	    /**
	    * Ecommerce transactions.
	    * More info at https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
	    */

	  }, {
	    key: 'trackTransaction',
	    value: function trackTransaction() {
	      ga('ecommerce:send');
	    }

	    /**
	    * Ecommerce transactions.
	    * More info at https://developers.google.com/analytics/devguides/collection/analyticsjs/ecommerce
	    */

	  }, {
	    key: 'clearTransactions',
	    value: function clearTransactions() {
	      ga('ecommerce:clear');
	    }
	  }]);

	  return GAModule;
	}(_BasicModule3.default);

	exports.default = GAModule;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var MODULE_GA = exports.MODULE_GA = 'ga';
	var MODULE_MIXPANEL = exports.MODULE_MIXPANEL = 'mixpanel';
	var MODULE_SEGMENT = exports.MODULE_SEGMENT = 'segment';
	var MODULE_FACEBOOK = exports.MODULE_FACEBOOK = 'facebook';

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var BasicModule = function () {
	  function BasicModule(name) {
	    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, BasicModule);

	    this.name = name;
	    this.config = config;
	  }

	  _createClass(BasicModule, [{
	    key: "trackView",
	    value: function trackView() {/* Overriden by modules */}
	  }, {
	    key: "trackEvent",
	    value: function trackEvent() {/* Overriden by modules */}
	  }, {
	    key: "trackException",
	    value: function trackException() {/* Overriden by modules */}
	  }, {
	    key: "trackTiming",
	    value: function trackTiming() {/* Overriden by modules */}
	  }, {
	    key: "setAlias",
	    value: function setAlias() {/* Overriden by modules */}
	  }, {
	    key: "identify",
	    value: function identify() {/* Overriden by modules */}
	  }, {
	    key: "setUsername",
	    value: function setUsername() {/* Overriden by modules */}
	  }, {
	    key: "setUserProperties",
	    value: function setUserProperties() {/* Overriden by modules */}
	  }, {
	    key: "setUserPropertiesOnce",
	    value: function setUserPropertiesOnce() {/* Overriden by modules */}
	  }, {
	    key: "setSuperProperties",
	    value: function setSuperProperties() {/* Overriden by modules */}
	  }, {
	    key: "setSuperPropertiesOnce",
	    value: function setSuperPropertiesOnce() {/* Overriden by modules */}
	  }, {
	    key: "addTransaction",
	    value: function addTransaction() {/* Overriden by modules */}
	  }, {
	    key: "addItem",
	    value: function addItem() {/* Overriden by modules */}
	  }, {
	    key: "trackTransaction",
	    value: function trackTransaction() {/* Overriden by modules */}
	  }, {
	    key: "clearTransactions",
	    value: function clearTransactions() {/* Overriden by modules */}
	  }, {
	    key: "reset",
	    value: function reset() {/* Overriden by modules */}
	  }]);

	  return BasicModule;
	}();

	exports.default = BasicModule;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/**
	 * Console log depending on config debug mode
	 * @param {...*} message
	 */
	var logDebug = exports.logDebug = function logDebug(params) {
	  var _console;

	  (_console = console).log.apply(_console, ['VueAnalytics :'].concat(Array.prototype.slice.call(arguments)));
	};

	/**
	 * Handle tools for cordova app workarounds
	 */
	var cordovaApp = exports.cordovaApp = {
	  bootstrapWindows: function bootstrapWindows() {
	    // Disable activeX object to make Analytics.js use XHR, or something else
	    window.ActiveXObject = undefined;
	    ga('set', 'checkProtocolTask', null);
	  }
	};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _analyticsTypes = __webpack_require__(3);

	var _BasicModule2 = __webpack_require__(4);

	var _BasicModule3 = _interopRequireDefault(_BasicModule2);

	var _utils = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MixpanelModule = function (_BasicModule) {
	  _inherits(MixpanelModule, _BasicModule);

	  function MixpanelModule() {
	    _classCallCheck(this, MixpanelModule);

	    return _possibleConstructorReturn(this, (MixpanelModule.__proto__ || Object.getPrototypeOf(MixpanelModule)).call(this, _analyticsTypes.MODULE_MIXPANEL));
	  }

	  _createClass(MixpanelModule, [{
	    key: 'init',
	    value: function init() {
	      var initConf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};


	      // Load the analytics snippet
	      (function (e, a) {
	        if (!a.__SV) {
	          var b = window;try {
	            var c,
	                l,
	                i,
	                j = b.location,
	                g = j.hash;c = function c(a, b) {
	              return (l = a.match(RegExp(b + "=([^&]*)"))) ? l[1] : null;
	            };g && c(g, "state") && (i = JSON.parse(decodeURIComponent(c(g, "state"))), "mpeditor" === i.action && (b.sessionStorage.setItem("_mpcehash", g), history.replaceState(i.desiredHash || "", e.title, j.pathname + j.search)));
	          } catch (m) {}var k, h;window.mixpanel = a;a._i = [];a.init = function (b, c, f) {
	            function e(b, a) {
	              var c = a.split(".");2 == c.length && (b = b[c[0]], a = c[1]);b[a] = function () {
	                b.push([a].concat(Array.prototype.slice.call(arguments, 0)));
	              };
	            }var d = a;"undefined" !== typeof f ? d = a[f] = [] : f = "mixpanel";d.people = d.people || [];d.toString = function (b) {
	              var a = "mixpanel";"mixpanel" !== f && (a += "." + f);b || (a += " (stub)");return a;
	            };d.people.toString = function () {
	              return d.toString(1) + ".people (stub)";
	            };k = "disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
	            for (h = 0; h < k.length; h++) {
	              e(d, k[h]);
	            }a._i.push([b, c, f]);
	          };a.__SV = 1.2;b = e.createElement("script");b.type = "text/javascript";b.setAttribute('defer', '');b.src = "undefined" !== typeof MIXPANEL_CUSTOM_LIB_URL ? MIXPANEL_CUSTOM_LIB_URL : "file:" === e.location.protocol && "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//) ? "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js" : "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";c = e.getElementsByTagName("script")[0];c.parentNode.insertBefore(b, c);
	        }
	      })(document, window.mixpanel || []);

	      // Apply default configuration
	      // initConf = { ...pluginConfig, ...initConf }
	      var mandatoryParams = ['token'];
	      mandatoryParams.forEach(function (el) {
	        if (!initConf[el]) throw new Error('VueMultianalytics : Please provide a "' + el + '" from the config.');
	      });

	      this.config.debug = initConf.debug;

	      // init
	      mixpanel.init(initConf.token, initConf.config);
	    }

	    // Methods

	    /**
	     * https://mixpanel.com/help/reference/javascript#sending-events
	     * Dispatch a view analytics event
	     *
	     * params object should contain
	     * @param viewName
	     */

	  }, {
	    key: 'trackView',
	    value: function trackView(_ref) {
	      var viewName = _ref.viewName;

	      if (this.config.debug) {
	        (0, _utils.logDebug)(viewName);
	      }
	      mixpanel.track("Page Viewed", { "page": viewName });
	    }

	    /**
	     * Dispatch a tracking analytics event
	     *
	     * params object should contain
	     * @param {string} action - Name of the event you are sending.
	     * @param {object} properties - An object of properties that are useful.
	     * @param {function} callback - if provided, the callback function will be called.
	     */

	  }, {
	    key: 'trackEvent',
	    value: function trackEvent(_ref2) {
	      var action = _ref2.action,
	          _ref2$properties = _ref2.properties,
	          properties = _ref2$properties === undefined ? {} : _ref2$properties,
	          _ref2$callback = _ref2.callback,
	          callback = _ref2$callback === undefined ? null : _ref2$callback;

	      if (this.config.debug) {
	        _utils.logDebug.apply(undefined, arguments);
	      }

	      // Mixpanel alters the properties object with it's own properties. To avoid that, we
	      // need to clone the object
	      // https://github.com/mixpanel/mixpanel-js/blob/master/src/mixpanel-core.js#L1066
	      var mixpanelProperties = Object.assign({}, properties);
	      mixpanel.track(action, mixpanelProperties, callback);
	    }
	  }, {
	    key: 'setAlias',
	    value: function setAlias(alias) {
	      if (this.config.debug) {
	        (0, _utils.logDebug)(alias);
	      }
	      mixpanel.alias(alias);
	    }
	  }, {
	    key: 'identify',
	    value: function identify(_ref3) {
	      var userId = _ref3.userId;

	      if (this.config.debug) {
	        (0, _utils.logDebug)(userId);
	      }
	      if (!userId) {
	        return;
	      }
	      mixpanel.identify(userId);
	    }
	  }, {
	    key: 'setUsername',
	    value: function setUsername(userId) {
	      if (this.config.debug) {
	        (0, _utils.logDebug)(userId);
	      }
	      mixpanel.identify(userId);
	    }
	  }, {
	    key: 'setUserProperties',
	    value: function setUserProperties() {
	      var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      if (this.config.debug) {
	        (0, _utils.logDebug)(properties);
	      }
	      mixpanel.people.set(properties);
	    }
	  }, {
	    key: 'setUserPropertiesOnce',
	    value: function setUserPropertiesOnce(properties) {
	      if (this.config.debug) {
	        (0, _utils.logDebug)(properties);
	      }
	      mixpanel.people.set_once(properties);
	    }
	  }, {
	    key: 'setSuperProperties',
	    value: function setSuperProperties(properties) {
	      if (this.config.debug) {
	        (0, _utils.logDebug)(properties);
	      }
	      mixpanel.register(properties);
	    }
	  }, {
	    key: 'setSuperPropertiesOnce',
	    value: function setSuperPropertiesOnce(properties) {
	      if (this.config.debug) {
	        (0, _utils.logDebug)(properties);
	      }
	      mixpanel.register_once(properties);
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      if (this.config.debug) {
	        (0, _utils.logDebug)('reset');
	      }
	      mixpanel.reset();
	    }
	  }]);

	  return MixpanelModule;
	}(_BasicModule3.default);

	exports.default = MixpanelModule;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _analyticsTypes = __webpack_require__(3);

	var _BasicModule2 = __webpack_require__(4);

	var _BasicModule3 = _interopRequireDefault(_BasicModule2);

	var _utils = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SegmentModule = function (_BasicModule) {
	  _inherits(SegmentModule, _BasicModule);

	  function SegmentModule() {
	    _classCallCheck(this, SegmentModule);

	    var _this = _possibleConstructorReturn(this, (SegmentModule.__proto__ || Object.getPrototypeOf(SegmentModule)).call(this, _analyticsTypes.MODULE_SEGMENT));

	    _this.superProperties = {};
	    return _this;
	  }

	  _createClass(SegmentModule, [{
	    key: 'init',
	    value: function init() {
	      var initConf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      // name of gloval variable changed from analytics to segment
	      (function () {
	        var analytics = window.analytics = window.analytics || [];if (!analytics.initialize) if (analytics.invoked) window.console && console.error && console.error("Segment snippet included twice.");else {
	          analytics.invoked = !0;analytics.methods = ["trackSubmit", "trackClick", "trackLink", "trackForm", "pageview", "identify", "reset", "group", "track", "ready", "alias", "debug", "page", "once", "off", "on"];analytics.factory = function (t) {
	            return function () {
	              var e = Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics;
	            };
	          };for (var t = 0; t < analytics.methods.length; t++) {
	            var e = analytics.methods[t];analytics[e] = analytics.factory(e);
	          }analytics.load = function (t) {
	            var e = document.createElement("script");e.type = "text/javascript";e.setAttribute('defer', '');e.src = ("https:" === document.location.protocol ? "https://" : "http://") + "cdn.segment.com/analytics.js/v1/" + t + "/analytics.min.js";var n = document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e, n);
	          };analytics.SNIPPET_VERSION = "4.0.0";
	        }
	      })();

	      // Apply default configuration
	      // initConf = { ...pluginConfig, ...initConf }
	      var mandatoryParams = ['token'];
	      mandatoryParams.forEach(function (el) {
	        if (!initConf[el]) throw new Error('VueMultianalytics : Please provide a "' + el + '" from the config.');
	      });

	      this.config.debug = initConf.debug;

	      // init
	      analytics.load(initConf.token);
	      if (this.config.debug) {
	        analytics.debug();
	      }
	    }

	    /**
	     * https://segment.com/docs/sources/website/analytics.js/#page
	     * Dispatch a page event
	     *
	     * params object should contain
	     * @param {string} viewName
	     */

	  }, {
	    key: 'trackView',
	    value: function trackView(_ref) {
	      var viewName = _ref.viewName,
	          _ref$properties = _ref.properties,
	          properties = _ref$properties === undefined ? {} : _ref$properties;

	      if (this.config.debug) {
	        _utils.logDebug.apply(undefined, arguments);
	      }
	      try {
	        var fullProperties = Object.assign(properties, this.superProperties);
	        analytics.page(viewName, properties);
	      } catch (e) {
	        if (!(e instanceof ReferenceError)) {
	          throw e;
	        }
	      }
	    }
	    /**
	     * Dispatch a tracking analytics event
	     * https://segment.com/docs/sources/website/analytics.js/#track
	     *
	     * params object should contain
	     * @param {string} category - Typically the object that was interacted with (e.g. 'Video')
	     * @param {string} action - The type of interaction (e.g. 'play')
	     * @param {string} label - Useful for categorizing events (e.g. 'Fall Campaign')
	     * @param {integer} value - A numeric value associated with the event (e.g. 42)
	     */

	  }, {
	    key: 'trackEvent',
	    value: function trackEvent(_ref2) {
	      var _ref2$category = _ref2.category,
	          category = _ref2$category === undefined ? "Event" : _ref2$category,
	          action = _ref2.action,
	          _ref2$label = _ref2.label,
	          label = _ref2$label === undefined ? null : _ref2$label,
	          _ref2$value = _ref2.value,
	          value = _ref2$value === undefined ? null : _ref2$value,
	          _ref2$properties = _ref2.properties,
	          properties = _ref2$properties === undefined ? {} : _ref2$properties,
	          _ref2$callback = _ref2.callback,
	          callback = _ref2$callback === undefined ? null : _ref2$callback;

	      if (this.config.debug) {
	        _utils.logDebug.apply(undefined, arguments);
	      }
	      try {
	        var fullProperties = Object.assign(properties, this.superProperties);
	        analytics.track(action, fullProperties);
	      } catch (e) {
	        if (!(e instanceof ReferenceError)) {
	          throw e;
	        }
	      }
	    }

	    /**
	     * Same as identify
	     * associate your users and their actions to a recognizable userId
	     * https://segment.com/docs/sources/website/analytics.js/#identify
	     *
	     * @param {any} properties - traits of your user. If you specify a properties.userId, then a userId will be set
	     */

	  }, {
	    key: 'setUserProperties',
	    value: function setUserProperties() {
	      var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      if (this.config.debug) {
	        (0, _utils.logDebug)(properties);
	      }
	      var params = {};

	      if (properties.hasOwnProperty('userId')) {
	        var id = properties.userId;
	        properties.delete('userId');
	        params.userId = id;
	      }

	      params.options = properties;
	      this.identify(params);
	    }

	    /**
	     * Define a property that will be sent across all the events
	     *
	     * @param {any} properties
	     */

	  }, {
	    key: 'setSuperProperties',
	    value: function setSuperProperties(properties) {
	      if (this.config.debug) {
	        (0, _utils.logDebug)(properties);
	      }
	      this.superProperties = properties;
	    }

	    /**
	     * associate your users and their actions to a recognizable userId
	     * https://segment.com/docs/sources/website/analytics.js/#identify
	     *
	     * @param {any} params - traits of your user. If you specify a params.userId, then a userId will be set
	     */

	  }, {
	    key: 'identify',
	    value: function identify() {
	      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      if (this.config.debug) {
	        (0, _utils.logDebug)(params);
	      }
	      try {
	        if (params.userId) {
	          analytics.identify(params.userId, params.options);
	        } else {
	          analytics.identify(params.options);
	        }
	      } catch (e) {
	        if (!(e instanceof ReferenceError)) {
	          throw e;
	        }
	      }
	    }

	    /**
	     * Same as identify
	     * associate your users and their actions to a recognizable userId
	     * https://segment.com/docs/sources/website/analytics.js/#identify
	     *
	     * @param {any} name - userId
	     */

	  }, {
	    key: 'setUsername',
	    value: function setUsername(userId) {
	      if (this.config.debug) {
	        (0, _utils.logDebug)(userId);
	      }
	      this.identify({ userId: userId });
	    }

	    /**
	    *  Alias is necessary for properly implementing KISSmetrics and Mixpanel.
	    *  https://segment.com/docs/sources/website/analytics.js/#alias
	    *  Note: Aliasing is generally handled automatically when you identify a user
	    *
	    *  @param {string} alias
	    */

	  }, {
	    key: 'setAlias',
	    value: function setAlias(alias) {
	      if (this.config.debug) {
	        (0, _utils.logDebug)(alias);
	      }
	      try {
	        analytics.alias(alias);
	      } catch (e) {
	        if (!(e instanceof ReferenceError)) {
	          throw e;
	        }
	      }
	    }
	  }, {
	    key: 'reset',
	    value: function reset() {
	      if (this.config.debug) {
	        (0, _utils.logDebug)('reset');
	      }
	      try {
	        analytics.reset();
	      } catch (e) {
	        if (!(e instanceof ReferenceError)) {
	          throw e;
	        }
	      }
	    }
	  }]);

	  return SegmentModule;
	}(_BasicModule3.default);

	exports.default = SegmentModule;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _analyticsTypes = __webpack_require__(3);

	var _BasicModule2 = __webpack_require__(4);

	var _BasicModule3 = _interopRequireDefault(_BasicModule2);

	var _utils = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var FacebookModule = function (_BasicModule) {
	  _inherits(FacebookModule, _BasicModule);

	  function FacebookModule() {
	    _classCallCheck(this, FacebookModule);

	    return _possibleConstructorReturn(this, (FacebookModule.__proto__ || Object.getPrototypeOf(FacebookModule)).call(this, _analyticsTypes.MODULE_FACEBOOK));
	  }

	  _createClass(FacebookModule, [{
	    key: 'init',
	    value: function init() {
	      var initConf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	      (function (f, b, e, v, n, t, s) {
	        if (f.fbq) return;n = f.fbq = function () {
	          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
	        };if (!f._fbq) f._fbq = n;
	        n.push = n;n.loaded = !0;n.version = '2.0';n.queue = [];t = b.createElement(e);t.setAttribute('defer', '');
	        t.src = v;s = b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t, s);
	      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

	      // Apply default configuration
	      // initConf = { ...pluginConfig, ...initConf }
	      var mandatoryParams = ['token'];
	      mandatoryParams.forEach(function (el) {
	        if (!initConf[el]) throw new Error('VueAnalytics : Please provide a "' + el + '" from the config.');
	      });

	      this.config.debug = initConf.debug;
	      fbq('init', initConf.token);
	    }

	    // Methods

	    /**
	     * Dispatch a view analytics event
	     * https://developers.facebook.com/docs/ads-for-websites/pixel-events/v2.8
	     *
	     * params object should contain
	     *
	     */

	  }, {
	    key: 'trackView',
	    value: function trackView(_ref) {
	      _objectDestructuringEmpty(_ref);

	      fbq('track', 'PageView');
	    }

	    /**
	     * Dispatch a tracking analytics event
	     * https://developers.facebook.com/docs/ads-for-websites/pixel-events/v2.8
	     *
	     * params object should contain
	     * @param {string} fb_event - Name of the specific event, it will be ViewContent by default
	     * @param {string} category - Typically the object that was interacted with (e.g. 'Video')
	     * @param {string} action - The type of interaction (e.g. 'play')
	     * @param {string} label - Useful for categorizing events (e.g. 'Fall Campaign')
	     * @param {integer} value - A numeric value associated with the event (e.g. 42)
	     * @param {array} ids - Array of ids which are affected in event
	     * @param {string} type - What kind of contente we are reffered with this event
	     * @param {string} currency - Currency the event will use
	     */

	  }, {
	    key: 'trackEvent',
	    value: function trackEvent(_ref2) {
	      var _ref2$fb_event = _ref2.fb_event,
	          fb_event = _ref2$fb_event === undefined ? 'ViewContent' : _ref2$fb_event,
	          _ref2$category = _ref2.category,
	          category = _ref2$category === undefined ? "Event" : _ref2$category,
	          action = _ref2.action,
	          _ref2$label = _ref2.label,
	          label = _ref2$label === undefined ? null : _ref2$label,
	          _ref2$value = _ref2.value,
	          value = _ref2$value === undefined ? null : _ref2$value,
	          _ref2$callback = _ref2.callback,
	          callback = _ref2$callback === undefined ? null : _ref2$callback,
	          _ref2$ids = _ref2.ids,
	          ids = _ref2$ids === undefined ? [] : _ref2$ids,
	          _ref2$type = _ref2.type,
	          type = _ref2$type === undefined ? null : _ref2$type,
	          _ref2$currency = _ref2.currency,
	          currency = _ref2$currency === undefined ? null : _ref2$currency;

	      if (this.config.debug) {
	        _utils.logDebug.apply(undefined, arguments);
	      }
	      if (value) {
	        var parsed = parseInt(value, 10);
	        value = isNaN(parsed) ? 0 : parsed;
	      }

	      var fieldsObject = {
	        content_name: label,
	        content_category: category,
	        content_ids: ids,
	        content_type: type,
	        value: value,
	        currency: currency
	      };
	      fbq('track', fb_event, fieldsObject);
	    }
	  }]);

	  return FacebookModule;
	}(_BasicModule3.default);

	exports.default = FacebookModule;

/***/ })
/******/ ]);