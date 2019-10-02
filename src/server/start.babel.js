require('./env');

if (process.env.NEWRELIC_NAME && process.env.NEWRELIC_KEY) {
  require('newrelic');
}

require('@babel/register')({
  ignore: [
    /\/(build|node_modules)\//
  ]
});
require('@babel/polyfill');
require('./start.js');
