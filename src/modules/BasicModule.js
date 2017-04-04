export default class BasicModule {

  constructor(name, config = {}) {
    this.name = name
    this.config = config
  }

  trackView() {}

  trackEvent() {}

  trackException() {}

  trackTiming() {}
}
