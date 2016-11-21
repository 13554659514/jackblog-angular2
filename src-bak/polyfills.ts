// Polyfills
// import 'ie-shim';

// Prefer CoreJS over the polyfills above
import 'core-js';
import 'core-js/es7/reflect';
require('zone.js/dist/zone');

if ('production' === process.env.NODE_ENV) {
  // Production


} else {
  // Development

  Error.stackTraceLimit = Infinity;

  require('zone.js/dist/long-stack-trace-zone');

}
