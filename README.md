
# Vue-multianalytics

A [VueJS](http://vuejs.org) multianalytics tool


## About

At [Glovo](https://glovoapp.com) we need to track a lot of events. And not in only one platform, but a few. That is why we needed **vue-multianalytics**, a simple plugin that allows you to track any event in multiple platforms at the same time.

This plugin has been inspired by the awesome library **[vue-ua](https://github.com/ScreamZ/vue-analytics)**, so a big thank you to it. If you want to just have Google Analytics, you should use _vue-ua_ instead of _vue-multianalytics_.

## Configuration

A typical `npm install vue-multianalytics -s` will be enough to download it.

To start using it, you need to add the plugin in your main .js entry

```
import VueMultianalytics from 'vue-multianalytics'
import VueRouter from 'vue-router'
const router = new VueRouter(...)

let gaConfig = {
  appName: 'Test', // Mandatory
  appVersion: '0.1', // Mandatory
  trackingId: 'YOUR_UA', // Mandatory
  debug: true, // Whether or not display console logs debugs (optional)
}

let mixpanelConfig = {
  tracker: 'YOUR_TRACKER'
}


Vue.use(VueMultianalytics, {
  modules: {
    ga: gaConfig,
    mixpanel: mixpanelConfig
  }
})
```

## Tracking

Once the configuration is completed, you can access vue analytics instance in your components like that :

`this.$ma.trackEvent(params, excludedModules)`

### ExcludedModules

You can easily exclude modules from being fired by an event adding them to the excludedModules array. This is per-event based, so feel free to use them as you want

```

// this will exclude mixpanel from being fired
let excludedModules = ['mixpanel']
this.$ma.trackEvent(params, excludedModules)

// this will exclude both, mixpanel and ga from beign fired
this.$ma.trackEvent(params, ['mixpanel', 'ga'])

// this will exclude nothing from beign fired, all the modules will be triggered
this.$ma.trackEvent(params)

```

## API

### trackView({viewName})
```
/**
  * Dispatch a view using the screen name
  * params should contain
  * @param viewName
  */

this.$ma.trackView({screenName: 'Homepage'})  
```

### trackEvent({category = 'Event', action, label = null, value = null})
```
/**
  * Dispatch a view using the screen name
  * params object should contain
  *
  * @param category
  * @param action
  * @param label
  * @param value
  */

this.$ma.trackEvent({category: 'Click', action: 'Homepage Click', label: 'Great', value: ''})  
```


## Modules

Currently, supported modules are the following

### Google Analytics

Name: `ga`
Config:
```
appName: 'Test', // Mandatory
appVersion: '0.1', // Mandatory
trackingId: 'YOUR_UA', // Mandatory
debug: true, // Whether or not display console logs debugs (optional)
```
Supported Events: `trackView`, `trackEvent`, `trackException`, `trackTiming`

### Mixpanel

Name: `mixpanel`
Config:
```
tracker: 'YOUR_TRACKER'
debug: true, // Whether or not display console logs debugs (optional)
```
Supported Events: `trackView`, `trackEvent`


## Todo
- ~~Demo~~ 👍
- Further integration with mixpanel
- New events: registerSuperproperties, alias, timedEvents
- New modules: segment, appboy, kissmetrics?
- Tests
