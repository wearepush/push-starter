import { clientConfiguration } from 'universal-webpack';
import settings from './universal-webpack-settings';
import baseConfiguration from './webpack.config';

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

export default configuration;
