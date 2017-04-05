export default class BasicModule {

  constructor(name, config = {}) {
    this.name = name
    this.config = config
  }

  trackView () { /* Overriden by modules */ }

  trackEvent () { /* Overriden by modules */ }

  trackException () { /* Overriden by modules */ }

  trackTiming () { /* Overriden by modules */ }

  set () { /* Overriden by modules */ }

  identify () { /* Overriden by modules */ }
}
