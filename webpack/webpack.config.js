/* eslint-disable no-nested-ternary */
import path from 'path';
import webpack from 'webpack';
import '../src/server/env';
import paths from './paths';
import { shouldUseSourceMap, isEnvDevelopment, isEnvProduction } from './consts';

const rootFolder = path.resolve(__dirname, '..');
const cdnHost = process.env.CDNHOST || '';

let urlLoaderOptions = {
  limit: 10000,
};
let fileLoaderOptions;

if (cdnHost) {
  const publicPath = `${cdnHost}/assets/`;
  urlLoaderOptions = {
    limit: 1,
    publicPath,
  };

  fileLoaderOptions = {
    publicPath,
  };
}

const config = {
  mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
  // Stop compilation early in production
  bail: isEnvProduction,
  devtool: isEnvProduction
    ? shouldUseSourceMap
      ? 'source-map'
      : false
    : isEnvDevelopment && 'cheap-module-source-map',

  context: rootFolder,

  entry: {
    main: './src/client',
  },

  performance: false,

  output: {
    path: path.resolve(rootFolder, 'static/assets'),
    publicPath: '/assets/',
    filename: '[name].[hash].js',
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
            options: urlLoaderOptions,
          },
        ],
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: fileLoaderOptions,
          },
        ],
      },
    ],
  },

  plugins: [new webpack.NoEmitOnErrorsPlugin()],

  resolve: {
    extensions: ['*', '.js'],
    modules: ['src', 'node_modules', paths.appNodeModules, paths.packageModules],
    alias: {
      react: path.resolve('node_modules/react'),
      components: path.resolve('src/components'),
      elements: path.resolve('src/elements'),
      config: path.resolve('src/config'),
      helpers: path.resolve('src/helpers'),
      modules: path.resolve('src/redux/modules'),
      routes: path.resolve('src/routes'),
      utils: path.resolve('src/utils'),
    },
  },
};

export default config;
