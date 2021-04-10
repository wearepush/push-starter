require('../../config/env');

if (process.env.NEWRELIC_NAME && process.env.NEWRELIC_KEY) {
  require('newrelic');
}

// ES6 polyfill.
require('core-js/stable');
// `async/await` support.
require('regenerator-runtime/runtime');

require('./start');
