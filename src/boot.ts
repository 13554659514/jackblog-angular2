/*
 * Providers provided by Angular
 */
import * as ngCore from 'angular2/core'
import * as browser from 'angular2/platform/browser'
import {
  ROUTER_PROVIDERS,
  ROUTER_DIRECTIVES,
  LocationStrategy,
  HashLocationStrategy,
  APP_BASE_HREF
} from 'angular2/router';
import {FORM_PROVIDERS} from 'angular2/common'
import {HTTP_PROVIDERS, BrowserXhr} from 'angular2/http'
import { servicesInjectables } from './services'
import { ResourceService } from './utils/resources'
import { CustomBrowserXhr } from './utils/custom.browserxhr'
import { ShowtoasterService } from './utils/showtoaster'

const APPLICATION_PROVIDERS = [
  ...HTTP_PROVIDERS,
  ...ROUTER_PROVIDERS,
  ...FORM_PROVIDERS,
  ngCore.provide( APP_BASE_HREF, { useValue: '/' } ),
  ngCore.provide( BrowserXhr, { useClass: CustomBrowserXhr })
];
// application_directives: directives that are global through out the application
const APPLICATION_DIRECTIVES = [
  ...ROUTER_DIRECTIVES
];

// application_pipes: pipes that are global through out the application
const APPLICATION_PIPES = [

];

// Environment
if ('production' === process.env.NODE_ENV) {
  // Production
  ngCore.enableProdMode();
  APPLICATION_PROVIDERS.push(browser.ELEMENT_PROBE_PROVIDERS_PROD_MODE);
} else {
  // Development
  APPLICATION_PROVIDERS.push(browser.ELEMENT_PROBE_PROVIDERS);
}

import {App} from './app'

export function main() {
  return browser.bootstrap(App, [
    ...APPLICATION_PROVIDERS,
    ResourceService,
    ShowtoasterService,
    servicesInjectables,
    ngCore.provide(ngCore.PLATFORM_DIRECTIVES, {useValue: APPLICATION_DIRECTIVES, multi: true}),
    ngCore.provide(ngCore.PLATFORM_PIPES, {useValue: APPLICATION_PIPES, multi: true})
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
