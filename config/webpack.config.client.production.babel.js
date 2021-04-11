import { CleanWebpackPlugin } from 'clean-webpack-plugin';
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

import TerserPlugin from 'terser-webpack-plugin';

import { clientConfiguration } from 'universal-webpack';
import settings from './universal-webpack-settings';
import baseConfiguration from './webpack.config';

const configuration = clientConfiguration(baseConfiguration, settings, {
  // Extract all CSS into separate `*.css` files (one for each chunk)
  // using `mini-css-extract-plugin`
  // instead of leaving that CSS embedded directly in `*.js` chunk files.
  development: false,
  useMiniCssExtractPlugin: true,
});

// Minimize CSS.
// https://github.com/webpack-contrib/mini-css-extract-plugin#minimizing-for-production
configuration.optimization = {
  chunkIds: 'total-size',
  moduleIds: 'size',

  // Automatically split vendor and commons
  splitChunks: {
    cacheGroups: {
      node_modules: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor',
        chunks: 'all',
      },
    },
  },
  // Keep the runtime chunk separated to enable long term caching
  // https://twitter.com/wSokra/status/969679223278505985
  // https://github.com/facebook/create-react-app/issues/5358
  runtimeChunk: {
    name: (entrypoint) => `runtime-${entrypoint.name}`,
  },
  minimizer: [
    new TerserPlugin({
      parallel: true,
    }),
    // new OptimizeCSSAssetsPlugin({})
    // This is only used in production mode
    new CssMinimizerPlugin(),
  ],
};

configuration.plugins.push(
  // Clears the output folder before building.
  new CleanWebpackPlugin()
);

export default configuration;
