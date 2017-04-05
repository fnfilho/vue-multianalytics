import AnalyticsPlugin from './AnalyticsPlugin'
import GAModule from './modules/GAModule'
import MixpanelModule from './modules/MixpanelModule'
import * as Utils from './utils'
import * as types from './analyticsTypes'

/**
 * Installation procedure
 *
 * @param Vue
 * @param initConf
 */


const install = function (Vue, initConf = {}, mixin) {
  // init Google Analytics
  // We created all the modules that app will use
  Vue.modulesEnabled = []
  for (let key in initConf.modules) {
    let module
    switch (key) {
      case types.MODULE_GA:
        module = new GAModule()
        module.init(initConf.modules[key])
        break;
      case types.MODULE_MIXPANEL:
        module = new MixpanelModule()
        module.init(initConf.modules[key])
      default:
        break;
    }
    if (module) {
      Vue.modulesEnabled.push(module)
    }
  }
  // Handle vue-router if defined
  if (initConf.params && initConf.params.vueRouter) {
    initVueRouterGuard(Vue, initConf.params.vueRouter, initConf.params.ignoredViews, initConf.params.preferredProperty)
  }

  // Add to vue prototype and also from globals
  const analyticsPlugin = new AnalyticsPlugin(Vue.modulesEnabled)
  Vue.prototype.$multianalytics = Vue.prototype.$ma = Vue.ma = analyticsPlugin


  // User can add its own implementation of an interface
  if (mixin) {
    Vue.prototype.$multianalyticsm =  Vue.prototype.$mam = Vue.mam =  mixin(analyticsPlugin)
  }

}

/**
 * Init the router guard.
 *
 * @param Vue - The Vue instance
 * @param vueRouter - The Vue router instance to attach guard
 * @param {string[]} ignoredViews - An array of route name to ignore
 *
 * @returns {string[]} The ignored routes names formalized.
 */
const initVueRouterGuard = function (Vue, vueRouter, ignoredViews, preferredProperty = 'path') {
  // Flatten routes name
  if (ignoredViews) {
    ignoredViews = ignoredViews.map(view => view.toLowerCase())
  }



  vueRouter.afterEach(to => {
    // Ignore some routes
    if (ignoredViews && ignoredViews.indexOf(to[preferredProperty].toLowerCase()) !== -1) {
      return
    }
    // Dispatch vue event using meta analytics value if defined otherwise fallback to route name
    Vue.analytics.trackView({viewName: to.meta.analytics || to[preferredProperty]})
  })

  return ignoredViews;
}

// Export module
export default { install }
