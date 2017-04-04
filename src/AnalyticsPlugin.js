
/**
 * Plugin main class
 */
export default class AnalyticsPlugin {

  constructor (modulesEnabled) {
    this.modulesEnabled = modulesEnabled
  }


  /**
   * Dispatch a view analytics event
   *
   * params object should contain
   * @param viewName
   */
  trackView (params = {}, excludedModules = []) {
    if (!params.viewName) {
      return
    }

    this.modulesEnabled.forEach(module => {
      if (excludedModules.indexOf(module.name) === -1) {
        module.trackView(params)
      }
    })

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
  trackEvent (params = {}, excludedModules = []) {
    this.modulesEnabled.forEach(module => {
      if (excludedModules.indexOf(module.name) === -1) {
        module.trackEvent(params)
      }
    })
  }

  /**
   * Track an exception that occurred in the application.
   *
   * The params object should contain
   * @param {string} description - Something describing the error (max. 150 Bytes)
   * @param {boolean} isFatal - Specifies whether the exception was fatal
   */
  trackException (params = {}, excludedModules = []) {
    this.modulesEnabled.forEach(module => {
      if (excludedModules.indexOf(module.name) === -1) {
        module.trackException(params)
      }
    })
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
  trackTiming (params = {}, excludedModules = []) {
    this.modulesEnabled.forEach(module => {
      if (excludedModules.indexOf(module.name) === -1) {
        module.trackTiming(params)
      }
    })

  }
}
