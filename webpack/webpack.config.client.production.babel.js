import Dotenv from 'dotenv-webpack';
import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import WebpackBundleAnalyzer from 'webpack-bundle-analyzer';
import getBaseConfig from './webpack.config.client';

const { BundleAnalyzerPlugin } = WebpackBundleAnalyzer;
const baseConfig = getBaseConfig({ development: false, useMiniCssExtractPlugin: true });
const cdnHost = process.env.CDN_HOST || '';

const config = {
  devtool: false,

  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: `${cdnHost}/assets/`,
  },

  optimization: {
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
  },

  plugins: [
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        discardComments: {
          removeAll: true,
        },
      },
    }),

    new webpack.optimize.SplitChunksPlugin({
      names: ['vendor'],
      minChunks: Infinity,
    }),

    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: [path.relative(baseConfig.context, baseConfig.output.path)],
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),

    new Dotenv({
      systemvars: true,
      path: '.env.production',
    }),

    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
    }),

    new webpack.IgnorePlugin(/redbox-react|react-hot-loader/),

    new BundleAnalyzerPlugin({
      // Can be `server`, `static` or `disabled`.
      // In `server` mode analyzer will start HTTP server to show bundle report.
      // In `static` mode single HTML file with bundle report will be generated.
      // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
      analyzerMode: 'static',
      // Host that will be used in `server` mode to start HTTP server.
      analyzerHost: '127.0.0.1',
      // Port that will be used in `server` mode to start HTTP server.
      analyzerPort: 8888,
      // Path to bundle report file that will be generated in `static` mode.
      // Relative to bundles output directory.
      reportFilename: 'report.html',
      // Module sizes to show in report by default.
      // Should be one of `stat`, `parsed` or `gzip`.
      // See "Definitions" section for more information.
      defaultSizes: 'parsed',
      // Automatically open report in default browser
      openAnalyzer: false,
      // If `true`, Webpack Stats JSON file will be generated in bundles output directory
      generateStatsFile: false,
      // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
      // Relative to bundles output directory.
      statsFilename: 'stats.json',
      // Options for `stats.toJson()` method.
      // For example you can exclude sources of your modules from stats file with `source: false` option.
      // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
      statsOptions: null,
      // Log level. Can be 'info', 'warn', 'error' or 'silent'.
      logLevel: 'info',
    }),
  ],
};

export default merge(baseConfig, config);
