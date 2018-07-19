import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CleanPlugin from 'clean-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import WebpackBundleAnalyzer from 'webpack-bundle-analyzer';
import getBaseConfig from './webpack.config.client';

const BundleAnalyzerPlugin = WebpackBundleAnalyzer.BundleAnalyzerPlugin;
const baseConfig = getBaseConfig({ development: false, useMiniCssExtractPlugin: true });
const vendor = [
  'axios',
  'react',
  'react-dom',
  'prop-types',
  'redux',
  'react-redux',
  'react-router-config',
  'react-router-dom',
  'react-router-redux',
  'react-helmet',
  'redux-form',
  'lru-memoize',
  'react-ga',
  'current-device',
  'detect-browser'
];

const config = {
  devtool: false,

  entry: { vendor },

  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },

  plugins: [
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      }
    }),

    new webpack.optimize.SplitChunksPlugin({
      names: ['vendor'],
      minChunks: Infinity
    }),

    new CleanPlugin(
      [path.relative(baseConfig.context, baseConfig.output.path)],
      { root: baseConfig.context }
    ),

    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        SSR: process.env.SSR,
        SSL: process.env.SSL,
        APISSL: process.env.APISSL,
        APIHOST: `"${process.env.APIHOST}"`,
        APIPORT: process.env.APIPORT,
        GOOGLE_ANALITICS_ID: `"${process.env.GOOGLE_ANALITICS_ID}"`
      },
      __CLIENT__: true,
      __SERVER__: false
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
      logLevel: 'info'
    })
  ]
};

// remove this when mini-css-extract-plugin fix HMR
const findScss = baseConfig.module.rules.findIndex((c) => {
  if (c && c.test.toString().indexOf('.(scss)') > -1) {
    return c;
  }
});

if (findScss > -1) {
  baseConfig.module.rules[findScss].use[0] = MiniCssExtractPlugin.loader;
}

const findCss = baseConfig.module.rules.findIndex((c) => {
  if (c && c.test.toString().indexOf('.(css)') > -1) {
    return c;
  }
});

if (findCss > -1) {
  baseConfig.module.rules[findCss].use[0] = MiniCssExtractPlugin.loader;
}


export default merge(baseConfig, config);
