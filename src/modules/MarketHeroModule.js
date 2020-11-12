import { MODULE_MARKET_HERO } from '../analyticsTypes'
import BasicModule from './BasicModule'

export default class MarketHeroModule extends BasicModule {

    constructor () {
        super(MODULE_MARKET_HERO)
    }

    init (initConf = {}) {
      // Load Market Hero
      (function () {
        var e = document.createElement("script");
        e.src = (`https://176906.tracking.markethero.io/v1/lst/universal-script?ph=c9d23b7724050e2e2d267890a0e0da92a1dd4fc9c4ea7a4b4ea62fcc9f473d78&tag=!hyros%22;head.appendChild(script)`);
        e.type = "text/javascript";
        e.async = true;

        var n = document.getElementsByTagName("script")[0];
        n.parentNode.insertBefore(e, n)
      })();

      this.config.debug = initConf.debug
    }
}