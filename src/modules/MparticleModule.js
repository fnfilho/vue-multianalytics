import { MODULE_MPARTICLE } from '../analyticsTypes'
import BasicModule from './BasicModule'
import { logDebug } from '../utils'

export default class MparticleModule extends BasicModule {

  constructor () {
    super(MODULE_MPARTICLE)
    this.superProperties = {}
  }

  init (initConf = {}) {
    // Apply default configuration
    // initConf = { ...pluginConfig, ...initConf }
    const mandatoryParams = ['token'];
    mandatoryParams.forEach(el => {
      if (!initConf[ el ]) throw new Error(`VueMultianalytics : Please provide a "${el}" from the config.`)
    })
    window.mParticle = {
      config: {
        isDebug: initConf.debug,
        isSandbox: initConf.sandbox
      }
    };
    // name of gloval variable changed from analytics to segment
    (function (apiKey) {
      window.mParticle = window.mParticle || {};
      window.mParticle.config = window.mParticle.config || {};
      window.mParticle.config.rq = [];
      window.mParticle.ready = function (f) {
          window.mParticle.config.rq.push(f);
      };
      var mp = document.createElement('script');
      mp.type = 'text/javascript';
      mp.async = true;
      mp.src = ('https:' == document.location.protocol ? 'https://jssdkcdns' : 'http://jssdkcdn') + '.mparticle.com/js/v1/' + apiKey + '/mparticle.js';
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(mp, s);
    })(initConf.token);
  }

  /**
   * https://segment.com/docs/sources/website/analytics.js/#page
   * Dispatch a page event
   *
   * params object should contain
   * @param {string} viewName
   */
  trackView({viewName, properties = {}, customFlags = {}}) {
    try {
      let fullProperties = Object.assign(properties, this.superProperties)
      console.log('my properties are: ', fullProperties, this.superProperties)
      mParticle.logPageView(viewName, fullProperties, customFlags)
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
   * @param {integer} eventType - Type of event for mParticle
   * @param {string} label - Useful for categorizing events (e.g. 'Fall Campaign')
   * @param {integer} value - A numeric value associated with the event (e.g. 42)
   */
  trackEvent ({category = "Event", action, eventType = mParticle.EventType.Other, label = null, value = null, properties = {}, callback = null }) {
    try {
      if (this.config.debug) {
        logDebug(...arguments)
      }
      let fullProperties = Object.assign(properties, this.superProperties)
      console.log('my properties are: ', fullProperties, this.superProperties)
      mParticle.logEvent(action, eventType, fullProperties)
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
   * @param {integer} productActionType - Type of action to ecommerce platform (e.g. 1)
   * @param {object} product - Product to be tracked
   * @param {object} attributes - object of attributes related to the event
   */
  ecommerceTrackEvent ({productActionType = mParticle.CommerceEventType.ProductAddToCart, product = {}, properties = {} }) {
    try {
      if (this.config.debug) {
        logDebug(...arguments)
      }
      let mProduct = mParticle.eCommerce.createProduct(product.name, product.sku || performance.now(), product.price, product.quantity);
      let fullProperties = Object.assign(properties, this.superProperties)
      if (properties.currency) {
        mParticle.eCommerce.setCurrencyCode()
      }
      mParticle.eCommerce.logProductAction(productActionType, mProduct, fullProperties)
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  /**
   * associate your users and their actions to a recognizable userId
   * https://segment.com/docs/sources/website/analytics.js/#identify
   *
   * @param {any} properties - traits of your user. If you specify a properties.userId, then a userId will be set
   */
  setUserProperties(properties) {
    try {
      if (this.config.debug) {
        logDebug(...arguments)
      }
      if (properties.userId) {
        mParticle.setUserIdentity(properties.userId, properties.identityType || mParticle.IdentityType.CustomerId)
      }
    } catch (e) {
      if (!(e instanceof ReferenceError)) {
        throw e;
      }
    }
  }

  /**
   * Define a property that will be sent across all the events
   *
   * @param {any} properties
   */
  setSuperProperties (properties) {
    this.superProperties = properties
  }
}
