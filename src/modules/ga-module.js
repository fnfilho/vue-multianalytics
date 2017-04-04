import { MODULE_GA } from '../analytics_types'
export default class GAModule {

  constructor () {
    this.name = MODULE_GA
    this.config = {}
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
      this.config.globalDimensions = initConf.globalDimensions
      this.config.globalMetrics = initConf.globalMetrics

      // register tracker
      ga('create', initConf.trackingId, 'auto')
      ga("set", "transport", "beacon")

      // set app name and version
      ga('set', 'appName', initConf.appName)
      ga('set', 'appVersion', initConf.appVersion)

      // Inject global dimensions
      if (initConf.globalDimensions) {
        initConf.globalDimensions.forEach(dimension => {
          ga('set', `dimension${dimension.dimension}`, dimension.value)
        })
      }

      // Inject global metrics
      if (initConf.globalMetrics) {
        initConf.globalMetrics.forEach(metric => {
          ga('set', `metric${metric.metric}`, metric.value)
        })
      }
  }


  // Methods
  trackView (view) {
    ga('set', 'screenName', view)
    ga('send', 'screenview')
  }

  trackEvent ({category, action = null, label = null, value = null}) {
    ga('send', 'event', category, action, label, value)
  }





}
