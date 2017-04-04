import { MODULE_GA } from '../analyticsTypes'
import BasicModule from './BasicModule'
import { logDebug } from '../utils'

export default class GAModule extends BasicModule {

  constructor () {
    super(MODULE_GA)
  }

  init (initConf = {}) {

      // Load the analytics snippet
      (function (i, s, o, g, r, a, m) {
        i[ 'GoogleAnalyticsObject' ] = r;
        i[ r ] = i[ r ] || function () {
            (i[ r ].q = i[ r ].q || []).push(arguments)
          }, i[ r ].l = 1 * new Date();
        a = s.createElement(o),
          m = s.getElementsByTagName(o)[ 0 ];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
      })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');


      // Apply default configuration
      // initConf = { ...pluginConfig, ...initConf }
      const mandatoryParams = [ 'trackingId', 'appName', 'appVersion' ];
      mandatoryParams.forEach(el => {
        if (!initConf[ el ]) throw new Error(`VueAnalytics : Please provide a "${el}" from the config.`)
      })

      this.config.debug = initConf.debug

      // register tracker
      ga('create', initConf.trackingId, 'auto')
      ga("set", "transport", "beacon")

      // set app name and version
      ga('set', 'appName', initConf.appName)
      ga('set', 'appVersion', initConf.appVersion)

  }


  // Methods

  /**
   * Dispatch a view analytics event
   *
   * params object should contain
   * @param viewName
   */
  trackView ({viewName}) {
    if (this.config.debug) {
      logDebug(viewName)
    }

    let fieldsObject = {
      hitType: 'pageview',
      page: viewName
    }

    // ga('set', 'screenName', params.viewName)
    ga('send', fieldsObject)
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
  trackEvent ({category = "Event", action, label = null, value = null, callback = null }) {
    if (this.config.debug) {
      logDebug(...arguments)
    }

    // GA requires that eventValue be an integer, see:
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#eventValue
    // https://github.com/luisfarzati/angulartics/issues/81
    if (value) {
      var parsed = parseInt(value, 10);
      value = isNaN(parsed) ? 0 : parsed;
    }

    let fieldsObject = {
      hitType: 'event',
      eventCategory: category,
      eventAction: action,
      eventLabel: label,
      eventValue: value,
      hitCallback: callback,
    }

    ga('send', fieldsObject)
  }

  /**
   * Track an exception that occurred in the application.
   *
   * @param {string} description - Something describing the error (max. 150 Bytes)
   * @param {boolean} isFatal - Specifies whether the exception was fatal
   */
  trackException ({description = "", isFatal = false}) {
    if (this.config.debug) {
      logDebug({description, isFatal})
    }
    ga('send', 'exception', { 'exDescription': description, 'exFatal': isFatal });
  }

  /**
   * Track an user timing to measure periods of time.
   *
   * @param {string} timingCategory - A string for categorizing all user timing variables into logical groups (e.g. 'JS Dependencies').
   * @param {string} timingVar -  A string to identify the variable being recorded (e.g. 'load').
   * @param {number} timingValue - The number of milliseconds in elapsed time to report to Google Analytics (e.g. 20).
   * @param {string|null} timingLabel -  A string that can be used to add flexibility in visualizing user timings in the reports (e.g. 'Google CDN').
   */
  trackTiming (timingCategory, timingVar, timingValue, timingLabel = null) {
    if (this.config.debug) {
      logDebug({timingCategory, timingVar, timingValue, timingLabel})
    }
    let conf = {
      hitType: 'timing',
      timingCategory,
      timingVar,
      timingValue
    }
    if (timingLabel) {
      conf.timingLabel = timingLabel;
    }

    ga('send', conf);
  }





}
