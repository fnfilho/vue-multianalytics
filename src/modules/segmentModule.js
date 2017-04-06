import { MODULE_SEGMENT } from '../analyticsTypes'
import BasicModule from './BasicModule'
import { logDebug } from '../utils'

export default class SegmentModule extends BasicModule {

  constructor () {
    super(MODULE_SEGMENT)
  }

  init (initConf = {}) {
    // name of gloval variable changed from analytics to segment
    (function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t){var e=document.createElement("script");e.type="text/javascript";e.async=!0;e.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};analytics.SNIPPET_VERSION="4.0.0";
    }})();

    // Apply default configuration
    // initConf = { ...pluginConfig, ...initConf }
    const mandatoryParams = [ 'token'];
    mandatoryParams.forEach(el => {
      if (!initConf[ el ]) throw new Error(`VueMultianalytics : Please provide a "${el}" from the config.`)
    })

    this.config.debug = initConf.debug

    // init
    analytics.load(initConf.token)
    if(this.config.debug) {
      analytics.debug()
    }
  }

  /**
   * https://mixpanel.com/help/reference/javascript#sending-events
   * Dispatch a view analytics event
   *
   * params object should contain
   * @param {string} viewName
   */
  trackView({viewName}) {
    try {
      analytics.page(viewName)
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
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
  trackEvent ({category = "Event", action, label = null, value = null, properties, callback = null }) {
    try {
      analytics.track(action, properties);
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  setUserProperties(properties) {
    try {
      if (properties.userId) {
        analytics.identify(properties.userId, properties);
      } else {
        analytics.identify(properties);
      }
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  /**
   * Track an exception that occurred in the application.
   * https://developers.google.com/analytics/devguides/collection/analyticsjs/exceptions
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
}
