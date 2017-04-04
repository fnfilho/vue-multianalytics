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
let template = `
  <div>
    <div>message</div>
    <button @click="TrackEvent()">Track Event</button>
    <button @click="TrackView()">Track View</button>
    <button @click="trackException()">Track Exception</button>
  </div>
`
const app = new Vue({
  el: '#app',
  template: '',
  data: {
    message: 'Hello MultiAnalytics'
  },
  mounted () {
    this.$ma.trackEvent({category: 'Test Click'})
    console.log('MOUNTED', this.$ma )
  },
  methods: {
    click() {
      console.log(this)
    },
    TrackEvent () {
      this.$ma.trackView({viewName: 'pepito'})
    },
    trackView () {
      this.$ma.trackEvent({: 'pepito'})
    },
    trackException () {
      this.$ma.trackException({viewName: 'pepito'})
    }
  }
})
