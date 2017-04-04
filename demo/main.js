import Vue from 'vue/dist/vue.js'
import VueMultianalytics from '../dist/vue-multianalytics.min'


let gaConfig = {
  appName: 'Test', // Mandatory
  appVersion: '0.1', // Mandatory
  trackingId: 'UA-96678006-1', // Mandatory
  globalDimensions: [],
  globalMetrics: [],
  debug: true
}



Vue.use(VueMultianalytics, {
  modules: {
    ga: gaConfig
  }
})
let template = `
  <div>
    <div>{{message}}</div>
    <button @click="trackView()">Track View</button>
    <button @click="trackEvent()">Track Event</button>
    <button @click="trackException()">Track Exception</button>
  </div>
`
const app = new Vue({
  el: '#app',
  template: template,
  data: {
    message: 'Hello MultiAnalytics'
  },
  methods: {
    trackEvent () {
      this.$ma.trackEvent({category: 'test category'})
    },
    trackView () {
      this.$ma.trackView({viewName: 'test view'})
    },
    trackException () {
      this.$ma.trackException({description: 'test exception', isFatal: true})
    }
  }
})
