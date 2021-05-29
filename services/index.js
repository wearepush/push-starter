require('../config/env');

if (process.env.NEWRELIC_NAME && process.env.NEWRELIC_KEY) {
  require('newrelic');
}

// Not using ES6 `import` syntax here
// to avoid `require()`ing `@babel/register`
// which would parse the whole server-side bundle by default.

require('source-map-support/register');

const startServer = require('universal-webpack/server');
const settings = require('../config/universal-webpack-settings');
const configuration = require('../config/webpack.config');

startServer(configuration, settings);
