'use strict';
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
import { clientConfiguration } from 'universal-webpack';
import settings from './universal-webpack-settings';
import baseConfiguration from './webpack.config';
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
import { devServerConfig, setDevFileServer } from './devserver';

let configuration = clientConfiguration(baseConfiguration, settings);

// Fetch all files from webpack development server.

configuration = setDevFileServer(configuration);

// Run `webpack serve`.
configuration.devServer = devServerConfig;

// Prints more readable module names in the browser console on HMR updates.
configuration.optimization = {
  ...configuration.optimization,
  moduleIds: 'named',
};

configuration.plugins = [
  ...configuration.plugins,
  new ReactRefreshWebpackPlugin(),
  // Watcher doesn't work well if you mistype casing in a path so we use
  // a plugin that prints an error when you attempt to do this.
  // See https://github.com/facebook/create-react-app/issues/240
  new CaseSensitivePathsPlugin(),
].filter(Boolean);

export default configuration;
