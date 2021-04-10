const paths = require('./paths');
const getClientEnvironment = require('./env');

const publicPath = paths.publicUrlOrPath + 'assets/';
// We will provide `paths.publicUrlOrPath` to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
// Get environment variables to inject into our app.
const env = getClientEnvironment(publicPath.slice(0, -1));

const isEnvDevelopment = env.raw.NODE_ENV === 'development';
const isEnvProduction = env.raw.NODE_ENV === 'production';

// Variable used for enabling profiling in Production
// passed into alias object. Uses a flag if passed into the build commandF
const isEnvProductionProfile = isEnvProduction && process.argv.includes('--profile');

const imageInlineSizeLimit = parseInt(process.env.IMAGE_INLINE_SIZE_LIMIT || '10000');

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false';

const isServerWebpackConfig = process.env.WEBPACK_SERVER_CONFIG;

module.exports = {
  publicPath,
  env,
  isEnvDevelopment,
  isEnvProduction,
  isEnvProductionProfile,
  imageInlineSizeLimit,
  shouldUseSourceMap,
  isServerWebpackConfig,
};
