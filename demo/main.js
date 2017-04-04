import Vue from 'vue/dist/vue.js'
import VueMultianalytics from '../dist/vue-multianalytics.min'


let gaConfig = {
  appName: 'Test', // Mandatory
  appVersion: '0.1', // Mandatory
  trackingId: 'UA-96678006-1', // Mandatory
  debug: true, // Whether or not display console logs debugs (optional)
  globalDimensions: [],
  globalMetrics: []
}



Vue.use(VueMultianalytics, {
  modules: {
    'ga': gaConfig
  }
})

const app = new Vue({
  el: '#app',
  template: '<div>{{message}}</div>',
  data: {
    message: 'Hello Vue'
  },
  mounted () {
    this.$ma.trackEvent({category: 'Test Click'})
    console.log('MOUNTED', this.$ma )
  },
  methods: {
    click() {
      console.log(this)
    }
  }
})
