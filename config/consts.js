const paths = require('./paths');
const getClientEnvironment = require('./env');

export const publicPath = paths.publicUrlOrPath + 'assets/';
// We will provide `paths.publicUrlOrPath` to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
// Get environment variables to inject into our app.
export const env = getClientEnvironment(publicPath.slice(0, -1));

export const isEnvDevelopment = env.raw.NODE_ENV === 'development';
export const isEnvProduction = env.raw.NODE_ENV === 'production';

// Variable used for enabling profiling in Production
// passed into alias object. Uses a flag if passed into the build commandF
export const isEnvProductionProfile = isEnvProduction && process.argv.includes('--profile');

export const shouldUseReactRefresh = env.raw.FAST_REFRESH;

export const imageInlineSizeLimit = parseInt(process.env.IMAGE_INLINE_SIZE_LIMIT || '10000');
