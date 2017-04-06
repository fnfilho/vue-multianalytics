import Vue from 'vue/dist/vue.js'
import VueMultianalytics from '../dist/vue-multianalytics.min'
import analyticsMixin from './analytics-mixin'


let gaConfig = {
  appName: 'Test', // Mandatory
  appVersion: '0.1', // Mandatory
  trackingId: 'YOUR_TOKEN', // Mandatory
  globalDimensions: [],
  globalMetrics: [],
  debug: true
}

let mixpanelConfig = {
  token: 'YOUR_TOKEN',
  config: {},
  debug: true
}

let segment = {
  token: 'YOUR_TOKEN',
  debug: true
}



Vue.use(VueMultianalytics, {
  modules: {
    ga: gaConfig,
    mixpanel: mixpanelConfig,
    segment: segment
  }
}, analyticsMixin)
let template = `
  <div>
    <div>{{message}}</div>
    <button @click="trackView()">Track View</button>
    <button @click="trackEvent()">Track Event</button>
    <button @click="trackException()">Track Exception</button>
    <button @click="testMixin()">Test Mixin</button>
  </div>
`
const app = new Vue({
  el: '#app',
  template: template,
  data: {
    message: 'Hello MultiAnalytics'
  },
  mounted () {
    console.log(this.$ma)
  },
  methods: {
    trackEvent () {
      this.$ma.trackEvent({action: 'test category', category: 'clicks', properties: {interesting: true}})
    },
    trackView () {
      this.$ma.trackView({viewName: 'test view'})
    },
    trackException () {
      this.$ma.trackException({description: 'test exception', isFatal: true})
    },
    testMixin () {
      this.$mam.test()
    }
  }
})
