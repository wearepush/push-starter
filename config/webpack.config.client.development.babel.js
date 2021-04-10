'use strict';

const webpack = require('webpack');
import { clientConfiguration } from 'universal-webpack';
import settings from './universal-webpack-settings';
import baseConfiguration from './webpack.config';
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpackDevClientEntry = require.resolve('react-dev-utils/webpackHotDevClient');
const reactRefreshOverlayEntry = require.resolve('react-dev-utils/refreshOverlayInterop');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

import { devServerConfig, setDevFileServer } from './devserver';
const { shouldUseReactRefresh } = require('./consts');

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
  // This is necessary to emit hot updates (CSS and Fast Refresh):
  new webpack.HotModuleReplacementPlugin(),
  // Experimental hot reloading for React .
  // https://github.com/facebook/react/tree/master/packages/react-refresh

  shouldUseReactRefresh &&
    new ReactRefreshWebpackPlugin({
      overlay: {
        entry: webpackDevClientEntry,
        // The expected exports are slightly different from what the overlay exports,
        // so an interop is included here to enable feedback on module-level errors.
        module: reactRefreshOverlayEntry,
        // Since we ship a custom dev client and overlay integration,
        // the bundled socket handling logic can be eliminated.
        sockIntegration: false,
      },
    }),

  // Watcher doesn't work well if you mistype casing in a path so we use
  // a plugin that prints an error when you attempt to do this.
  // See https://github.com/facebook/create-react-app/issues/240
  new CaseSensitivePathsPlugin(),
];

export default configuration;
