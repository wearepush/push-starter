import webpack from 'webpack';
import merge from 'webpack-merge';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import getClientEnvironment from './env';
import getBaseConfig from './webpack.config.client';
import paths from './paths';
import appConfig from '../src/config';

const webpackDevClientEntry = require.resolve('react-dev-utils/webpackHotDevClient');
const reactRefreshOverlayEntry = require.resolve('react-dev-utils/refreshOverlayInterop');

const env = getClientEnvironment({ isClient: true, publicUrl: paths.publicUrlOrPath.slice(0, -1) });
const shouldUseReactRefresh = env.raw.FAST_REFRESH;
const { host, port } = appConfig.webpack.server;
const baseConfig = getBaseConfig({
  development: true,
});

const config = {
  watchOptions: {
    aggregateTimeout: 500,
    ignored: ['node_modules', '__mocks__', '__test__'],
  },

  output: {
    publicPath: `${host}:${port}${baseConfig.output.publicPath}`,
  },

  optimization: {
    moduleIds: 'named',
    chunkIds: 'total-size',
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
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
  ],
};

console.log(merge(baseConfig, config).plugins);

export default merge(baseConfig, config);
