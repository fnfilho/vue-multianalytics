import { MODULE_MIXPANEL } from '../analyticsTypes'
import { logDebug } from '../utils'
export default class GAModule {

  constructor () {
    this.name = MODULE_MIXPANEL
    this.config = {}
  }

  init (initConf = {}) {

      // Load the analytics snippet
      (function(e,a){if(!a.__SV){var b=window;try{var c,l,i,j=b.location,g=j.hash;c=function(a,b){return(l=a.match(RegExp(b+"=([^&]*)")))?l[1]:null};g&&c(g,"state")&&(i=JSON.parse(decodeURIComponent(c(g,"state"))),"mpeditor"===i.action&&(b.sessionStorage.setItem("_mpcehash",g),history.replaceState(i.desiredHash||"",e.title,j.pathname+j.search)))}catch(m){}var k,h;window.mixpanel=a;a._i=[];a.init=function(b,c,f){function e(b,a){var c=a.split(".");2==c.length&&(b=b[c[0]],a=c[1]);b[a]=function(){b.push([a].concat(Array.prototype.slice.call(arguments,
0)))}}var d=a;"undefined"!==typeof f?d=a[f]=[]:f="mixpanel";d.people=d.people||[];d.toString=function(b){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);b||(a+=" (stub)");return a};d.people.toString=function(){return d.toString(1)+".people (stub)"};k="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
for(h=0;h<k.length;h++)e(d,k[h]);a._i.push([b,c,f])};a.__SV=1.2;b=e.createElement("script");b.type="text/javascript";b.async=!0;b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";c=e.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)}})(document,window.mixpanel||[]);




      // Apply default configuration
      // initConf = { ...pluginConfig, ...initConf }
      const mandatoryParams = [ 'token'];
      mandatoryParams.forEach(el => {
        if (!initConf[ el ]) throw new Error(`VueMultianalytics : Please provide a "${el}" from the config.`)
      })

      this.config.debug = initConf.debug

      // init
      mixpanel.init(initConf.token);
  }


  // Methods

  /**
   * Dispatch a view analytics event
   *
   * params object should contain
   * @param viewName
   */
  trackView (params) {
    if (this.config.debug) {
      logDebug(params)
    }
    mixpanel.track( "Page Viewed", { "page": params.viewName } );
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
   trackEvent ({category = "Event", action, label = null, value = null, properties = {}, callback = null }) {
    if (this.config.debug) {
      logDebug(...arguments)
    }
    mixpanel.track(action, properties, callback)

  }

  /**
   * Track an exception that occurred in the application.
   *
   * @param {string} description - Something describing the error (max. 150 Bytes)
   * @param {boolean} isFatal - Specifies whether the exception was fatal
   */
  trackException ({description = "", isFatal = false}) {
    return
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
    return
  }





}
