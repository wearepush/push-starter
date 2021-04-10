/* eslint-disable no-nested-ternary */
const path = require('path');
const webpack = require('webpack');

const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const ModuleNotFoundPlugin = require('react-dev-utils/ModuleNotFoundPlugin');
const createEnvironmentHash = require('./createEnvironmentHash');

const paths = require('./paths');
const modules = require('./modules');
const webpackModule = require('./webpack.module');
const {
  env,
  publicPath,
  isEnvDevelopment,
  isEnvProduction,
  isEnvProductionProfile,
  shouldUseSourceMap,
} = require('./consts');

const ROOT_DIRECTORY = path.resolve(__dirname, '..')

module.exports = {
  context: ROOT_DIRECTORY,

  mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
  // Stop compilation early in production
  bail: isEnvProduction,

  devtool: isEnvProduction
    ? shouldUseSourceMap
      ? 'source-map'
      : false
    : isEnvDevelopment && 'cheap-module-source-map',
  // These are the "entry points" to our application.
  // This means they will be the "root" imports that are included in JS bundle.
  entry: isEnvDevelopment
    ? [
        'react-hot-loader/patch',
        // Finally, this is your app's code:
        paths.appIndexJs,
        // We include the app code last so that if there is a runtime error during
        // initialization, it doesn't blow up the WebpackDevServer client, and
        // changing JS code would still trigger a refresh.
      ]
    : paths.appIndexJs,

  output: {
    // The build folder.
    path: paths.appBuild,
    // Add /* filename */ comments to generated require()s in the output.
    pathinfo: isEnvDevelopment,
    // There will be one main bundle, and one file per asynchronous chunk.
    // In development, it does not produce real files.
    filename: isEnvProduction ? 'static/js/[name].[contenthash:8].js' : isEnvDevelopment && 'static/js/bundle.js',
    // There are also additional JS chunk files if you use code splitting.
    chunkFilename: isEnvProduction
      ? 'static/js/[name].[contenthash:8].chunk.js'
      : isEnvDevelopment && 'static/js/[name].chunk.js',
    // webpack uses `publicPath` to determine where the app is being served from.
    // It requires a trailing slash, or the file assets will get an incorrect path.
    // We inferred the "public path" (such as / or /my-project) from homepage.
    publicPath,
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: isEnvProduction
      ? (info) => path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/')
      : isEnvDevelopment && ((info) => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
    // this defaults to 'window', but by setting it to 'this' then
    // module chunks which are built will work in web workers as well.
    globalObject: 'this',
  },
  cache: {
    type: 'filesystem',
    version: createEnvironmentHash(env.raw),
    cacheDirectory: paths.appWebpackCache,
    store: 'pack',
    buildDependencies: {
      defaultWebpack: ['webpack/lib/'],
      config: [__filename],
    },
  },
  infrastructureLogging: {
    level: 'none',
  },
  resolve: {
    modules: ['node_modules', paths.appNodeModules].concat(modules.additionalModulePaths || []),
    extensions: paths.moduleFileExtensions.map((ext) => `.${ext}`).filter((ext) => !ext.includes('ts')),
    alias: {
      // Allows for better profiling with ReactDevTools
      ...(isEnvProductionProfile && {
        'react-dom$': 'react-dom/profiling',
        'scheduler/tracing': 'scheduler/tracing-profiling',
      }),
      ...(modules.webpackAliases || {}),
      components: path.resolve('src/components'),
      elements: path.resolve('src/elements'),
      config: path.resolve('src/config'),
      helpers: path.resolve('src/helpers'),
      modules: path.resolve('src/redux/modules'),
      routes: path.resolve('src/routes'),
      utils: path.resolve('src/utils'),
    },
    plugins: [
      // Prevents users from importing files from outside of src/ (or node_modules/).
      // This often causes confusion because we only process files within src/ with babel.
      // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
      // please link the files into your node_modules/ and let module-resolution kick in.
      // Make sure your source files are compiled, as they will not be processed in any way.
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
    ],
  },

  module: webpackModule,

  plugins: [
    // This gives some necessary context to module not found errors, such as
    // the requesting resource.
    new ModuleNotFoundPlugin(paths.appPath),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV is set to production
    // during a production build.
    // Otherwise React will be compiled in the very slow development mode.
    new webpack.DefinePlugin(env.stringified),
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ].filter(Boolean),
  // Turn off performance processing because we utilize
  // our own hints via the FileSizeReporter
  performance: false,
};
