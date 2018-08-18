import { MODULE_AMPLITUDE } from '../analyticsTypes'
import BasicModule from './BasicModule'
import { logDebug } from '../utils'

export default class AmplitudeModule extends BasicModule {

  constructor () {
    super(MODULE_AMPLITUDE)
  }

  init(initConf = {}) {
    // Load the analytics snippet
    (function(e,t){var n=e.amplitude||{_q:[],_iq:{}};var r=t.createElement("script")
    ;r.type="text/javascript";r.async=true
    ;r.src="https://cdn.amplitude.com/libs/amplitude-4.4.0-min.gz.js"
    ;r.onload=function(){if(e.amplitude.runQueuedFunctions){
    e.amplitude.runQueuedFunctions()}else{
    console.log("[Amplitude] Error: could not load SDK")}}
    ;var i=t.getElementsByTagName("script")[0];i.parentNode.insertBefore(r,i)
    ;function s(e,t){e.prototype[t]=function(){
    this._q.push([t].concat(Array.prototype.slice.call(arguments,0)));return this}}
    var o=function(){this._q=[];return this}
    ;var a=["add","append","clearAll","prepend","set","setOnce","unset"]
    ;for(var u=0;u<a.length;u++){s(o,a[u])}n.Identify=o;var c=function(){this._q=[]
    ;return this}
    ;var l=["setProductId","setQuantity","setPrice","setRevenueType","setEventProperties"]
    ;for(var p=0;p<l.length;p++){s(c,l[p])}n.Revenue=c
    ;var d=["init","logEvent","logRevenue","setUserId","setUserProperties","setOptOut","setVersionName","setDomain","setDeviceId","setGlobalUserProperties","identify","clearUserProperties","setGroup","logRevenueV2","regenerateDeviceId","logEventWithTimestamp","logEventWithGroups","setSessionId","resetSessionId"]
    ;function v(e){function t(t){e[t]=function(){
    e._q.push([t].concat(Array.prototype.slice.call(arguments,0)))}}
    for(var n=0;n<d.length;n++){t(d[n])}}v(n);n.getInstance=function(e){
    e=(!e||e.length===0?"$default_instance":e).toLowerCase()
    ;if(!n._iq.hasOwnProperty(e)){n._iq[e]={_q:[]};v(n._iq[e])}return n._iq[e]}
    ;e.amplitude=n})(window,document);

    // Apply default configuration
    // initConf = { ...pluginConfig, ...initConf }
    const mandatoryParams = [ 'token'];
    mandatoryParams.forEach(el => {
      if (!initConf[ el ]) throw new Error(`VueMultianalytics : Please provide a "${el}" from the config.`)
    })

    this.config.debug = initConf.debug

    // init
    amplitude.getInstance().init(initConf.token);
  }


  // Methods

  /**
   * Dispatch a view analytics event
   *
   * params object should contain
   * @param viewName
   */
  trackView ({viewName}) {
    // if (!mixpanel.track) return
    // if (this.config.debug) {
    //   logDebug(viewName)
    // }
    // mixpanel.track("Page Viewed", { "page": viewName })
  }

  /**
   * Dispatch a tracking analytics event
   *
   * params object should contain
   * @param {string} action - Name of the event you are sending.
   * @param {object} properties - An object of properties that are useful.
   * @param {function} callback - if provided, the callback function will be called.
   */
   trackEvent ({action, properties = {}, callback = null}) {
    if (this.config.debug) {
      logDebug(...arguments)
    }

    amplitude.getInstance().logEvent(action, properties)
  }

  setAlias (alias) {
    // if (!mixpanel.alias) return
    // if (this.config.debug) {
    //   logDebug(alias)
    // }
    // mixpanel.alias(alias)
  }

  identify ({userId}) {
    if (this.config.debug) {
      logDebug(userId)
    }
    if (!userId) {
      return
    }

    amplitude.getInstance().setUserId(userId)
  }

  setUsername (userId) {
    if (this.config.debug) {
      logDebug(userId)
    }
    amplitude.getInstance().setUserId(userId)
  }

  setUserProperties (properties = {}) {
    // if (!mixpanel.people) return
    // if (this.config.debug) {
    //   logDebug(properties)
    // }
    // mixpanel.people.set(properties)
  }

  setUserPropertiesOnce (properties) {
    // if (!mixpanel.people) return
    // if (this.config.debug) {
    //   logDebug(properties)
    // }
    //  mixpanel.people.set_once(properties)
  }

  incrementUserProperties (properties) {
    // if (!mixpanel.people) return
    // if (this.config.debug) {
    //   logDebug(properties)
    // }
    // mixpanel.people.increment(properties)
  }

  setSuperProperties (properties) {
    // if (!mixpanel.register) return
    // if (this.config.debug) {
    //   logDebug(properties)
    // }
    //  mixpanel.register(properties)
  }

  setSuperPropertiesOnce (properties) {
    // if (!mixpanel.register_once) return
    // if (this.config.debug) {
    //   logDebug(properties)
    // }
    // mixpanel.register_once(properties)
  }

  reset () {
    // if (!mixpanel.reset) return
    // if (this.config.debug) {
    //   logDebug('reset')
    // }
    // mixpanel.reset();
  }
}
