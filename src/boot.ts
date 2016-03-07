/*
 * Providers provided by Angular
 */
import * as ngCore from 'angular2/core';
import * as browser from 'angular2/platform/browser';
import { ROUTER_PROVIDERS, APP_BASE_HREF } from 'angular2/router'
import { HTTP_PROVIDERS } from 'angular2/http';
import { HeroService } from './services/hero.service'
import { youTubeServiceInjectables } from './components/Search/YouTubeSearchComponent'
/*
 * App Environment Providers
 * providers that only live in certain environment
 */
const ENV_PROVIDERS = [];

if ('production' === process.env.NODE_ENV) {
  ngCore.enableProdMode();
  ENV_PROVIDERS.push(browser.ELEMENT_PROBE_PROVIDERS_PROD_MODE);
} else {
  ENV_PROVIDERS.push(browser.ELEMENT_PROBE_PROVIDERS);
}

import {App} from './app';

export function main() {
  return browser.bootstrap(App, [
    ...ENV_PROVIDERS,
    ...HTTP_PROVIDERS,
    ...ROUTER_PROVIDERS,
    HeroService,
    youTubeServiceInjectables,
    ngCore.provide( APP_BASE_HREF, { useValue: '/' } )
  ])
  .catch(err => console.error(err));
}


/*
 * Hot Module Reload
 * experimental version by @gdi2290
 */

function bootstrapDomReady() {
  // bootstrap after document is ready
  return document.addEventListener('DOMContentLoaded', main);
}

if ('development' === process.env.NODE_ENV) {
  // activate hot module reload
  if (process.env.HMR) {
    if (document.readyState === 'complete') {
      main();
    } else {
      bootstrapDomReady();
    }
    module.hot.accept();
  } else {
    bootstrapDomReady();
  }
} else {
  bootstrapDomReady();
}
