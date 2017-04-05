
# Vue-multianalytics

A [VueJS](http://vuejs.org) multianalytics tool


## About

At [Glovo](https://glovoapp.com) we need to track a lot of events. And not in only one platform, but a few. That is why we needed **vue-multianalytics**, a simple plugin that allows you to track any event in multiple platforms at the same time.

This plugin has been inspired by the awesome library **[vue-ua](https://github.com/ScreamZ/vue-analytics)**, so a big thank you to it. If you want to just have Google Analytics, you should use _vue-ua_ instead of _vue-multianalytics_.

## Configuration

A typical `npm install vue-multianalytics -s` will be enough to download it.

To start using it, you need to add the plugin in your main .js entry

```javascript
import VueMultianalytics from 'vue-multianalytics'

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
  },
  params: {
  }
})
```

## Tracking

Once the configuration is completed, you can access vue analytics instance in your components like that :

`this.$ma.trackEvent(params, excludedModules)`

### ExcludedModules

You can easily exclude modules from being fired by an event adding them to the excludedModules array. This is per-event based, so feel free to use them as you want

```javascript
// this will exclude mixpanel from being fired
let excludedModules = ['mixpanel']
this.$ma.trackEvent(params, excludedModules)

// this will exclude both, mixpanel and ga from beign fired
this.$ma.trackEvent(params, ['mixpanel', 'ga'])

// this will exclude nothing from beign fired, all the modules will be triggered
this.$ma.trackEvent(params)
```

## VueRouter integration

vue-multianalytics can be integrated with [vue-router](https://github.com/vuejs/vue-router) to track each new screen view on router change.

To use this feature, you just need to pass your `vue-router` instance in the params property as vueRouter.

```javascript

import VueMultianalytics from 'vue-multianalytics'
import VueRouter from 'vue-router'
const router = new VueRouter(...)

let mixpanelConfig = {
  tracker: 'YOUR_TRACKER'
}

Vue.use(VueMultianalytics, {
  modules: {
    mixpanel: mixpanelConfig
  },
  params: {
    vueRouter: router, //  Pass the router instance to automatically sync with router (optional)
    preferredProperty: 'name', // By default 'path' and related with vueRouter (optional)
    ingoredViews: ['homepage']
  }
})

```
This feature will generate the view name according to a priority rule:
- If you have defined a meta field in your route named `analytics`
```javascript
const homeRoute = {
  path: '/home',
  name: 'home',
  meta: {analytics: 'ThisWillBeTheName'}
}
```
- If you define a `preferredProperty` in your **vue-multianalytics** params, that params will be the used as screen name. Possible params are: `name`, `path`, `fullPath`.
- If nothing is provided `path` will be used.

If you want to ignore some routes, just specify then in the `ignoredViews` param.

## Custom Plugin

Usually you don't want to call directly the library, but call an interface first to manipulate the data before.

```javascript
// Not a very good practice

//component1
if (a === condition1) {
  this.$ma.trackEvent({action: 'User click'})
} else {
  this.$ma.trackError({description: 'Fatal error'})
}

//component2
if (b === condition1) {
  this.$ma.trackEvent({action: 'User click'})
}

// Much better using an interface and handle the logic there. No code repeated, better understanding of the flow

// component1
this.$mam.onUserClick(a)
// componen2
this.$mam.onUserClick(b)
```

To do it so, you just need to create a mixin to act as an interface with the **vue-multianalytics**.

### Mixin

Just create a module that exports a function accepting as a parameter the analytics library:

```javascript
export default function (multianalytics) {

  return {
    onUserClick (input) {
      if (input === true) {
        multianalytics.trackEvent({action: 'User click'})
      } else {
        multianalytics.trackError({description: 'Fatal error'})
      }
    }
  }
}
```
You can define inside all the methods that you want and call all the library api from the parameter received.

### Bind the mixin with the vue-multianalytics

You just need to pass the mixin as the third parameter when you initialize the plugin

```javascript
import VueMultianalytics from 'vue-multianalytics'
import analyticsMixin from './analyticsMixin.js'

Vue.use(VueMultianalytics, {
  modules: {
    ga: gaConfig
  }
}, analyticsMixin)
```

### Usage

Everything is already set, you can now call your mixin methods from anywhere in your vue application using `this.$mam` (instead of `this.$ma`).

```javascript
//Component1
export default {
  data () {

  },
  methods: {
    bannerClick (input) {
      this.$mam.onUserClick(input)
    }
  }
}
```

## API

### trackView({viewName})
```javascript
/**
  * Dispatch a view using the screen name
  * params should contain
  * @param viewName
  */

this.$ma.trackView({screenName: 'Homepage'})  
```

### trackEvent({category = 'Event', action, label = null, value = null})
```javascript
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
```javascript
appName: 'Test', // Mandatory
appVersion: '0.1', // Mandatory
trackingId: 'YOUR_UA', // Mandatory
debug: true // Whether or not display console logs debugs (optional)
```
Supported Events: `trackView`, `trackEvent`, `trackException`, `trackTiming`

### Mixpanel

Name: `mixpanel`
Config:
```javascript
tracker: 'YOUR_TRACKER'
debug: true // Whether or not display console logs debugs (optional)
```
Supported Events: `trackView`, `trackEvent`


## Todo
- ~~Demo~~ 👍
- Further integration with mixpanel
- New events: registerSuperproperties, alias, timedEvents
- New modules: segment, appboy, kissmetrics?
- Tests
