/* eslint-disable */
var dotenv = require ('dotenv');
var env = process.env.NODE_ENV;

var dotEnvConfig = {
  path: '.env',
};

if (env === 'production') {
  dotEnvConfig = {
    path: '.env.production'
  };
}

module.exports = dotenv.config(dotEnvConfig);
