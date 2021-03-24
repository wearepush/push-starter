/* eslint-disable no-nested-ternary */
import path from 'path';
import webpack from 'webpack';
import ModuleScopePlugin from 'react-dev-utils/ModuleScopePlugin';
import PnpWebpackPlugin from 'pnp-webpack-plugin';

import paths from './paths';
import modules from './modules';
import getClientEnvironment from './env';
import { shouldUseSourceMap, isEnvDevelopment, isEnvProduction } from './consts';

const webpackDevClientEntry = require.resolve('react-dev-utils/webpackHotDevClient');
const reactRefreshOverlayEntry = require.resolve('react-dev-utils/refreshOverlayInterop');

const rootFolder = path.resolve(__dirname, '..');
const publicPath = paths.publicUrlOrPath + 'assets/';
const isEnvProductionProfile = isEnvProduction && process.argv.includes('--profile');
const env = getClientEnvironment({ isClient: true, publicUrl: paths.publicUrlOrPath.slice(0, -1) });
const shouldUseReactRefresh = env.raw.FAST_REFRESH;

const config = {
  mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',

  bail: isEnvProduction,

  devtool: isEnvProduction
    ? shouldUseSourceMap
      ? 'source-map'
      : false
    : isEnvDevelopment && 'cheap-module-source-map',

  entry: isEnvDevelopment && !shouldUseReactRefresh ? [webpackDevClientEntry, paths.appIndexJs] : paths.appIndexJs,

  context: rootFolder,

  output: {
    path: paths.appPublic,
    pathinfo: isEnvDevelopment,
    filename: isEnvProduction ? 'static/js/[name].[contenthash:8].js' : isEnvDevelopment && 'static/js/bundle.js',
    chunkFilename: isEnvProduction
      ? 'static/js/[name].[contenthash:8].chunk.js'
      : isEnvDevelopment && 'static/js/[name].chunk.js',
    publicPath,
    devtoolModuleFilenameTemplate: isEnvProduction
      ? (info) => path.relative(paths.appSrc, info.absoluteResourcePath).replace(/\\/g, '/')
      : isEnvDevelopment && ((info) => path.resolve(info.absoluteResourcePath).replace(/\\/g, '/')),
  },

  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(scss)$/,
        sideEffects: true,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(css)$/,
        sideEffects: true,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: isEnvProduction
              ? {
                  limit: 1,
                  publicPath,
                }
              : {
                  limit: 10000,
                },
          },
        ],
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: isEnvProduction ? { publicPath } : undefined,
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin(env.stringified),
  ],

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
      // Adds support for installing with Plug'n'Play, leading to faster installs and adding
      // guards against forgotten dependencies and such.
      PnpWebpackPlugin,
      // Prevents users from importing files from outside of src/ (or node_modules/).
      // This often causes confusion because we only process files within src/ with babel.
      // To fix this, we prevent you from importing files out of src/ -- if you'd like to,
      // please link the files into your node_modules/ and let module-resolution kick in.
      // Make sure your source files are compiled, as they will not be processed in any way.
      new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson, reactRefreshOverlayEntry]),
    ],
  },
  resolveLoader: {
    plugins: [
      // Also related to Plug'n'Play, but this time it tells webpack to load its loaders
      // from the current package.
      PnpWebpackPlugin.moduleLoader(module),
    ],
  },
  performance: false,
};

export default config;
