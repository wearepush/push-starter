import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanPlugin from 'clean-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import getBaseConfig from './webpack.config.client';

const baseConfig = getBaseConfig({ development: false });
const vendor = [
  'react',
  'react-dom',
  'prop-types',
  'redux',
  'react-redux',
  'immutable',
  'redux-immutablejs',
  'react-router-config',
  'react-router-dom',
  'react-hot-loader',
  'react-helmet',
  'redux-form'
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

    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: Infinity
    }),

    new CleanPlugin(
      [path.relative(baseConfig.context, baseConfig.output.path)],
      { root: baseConfig.context }
    ),

    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css',
      allChunks: true
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        SSR: process.env.SSR,
        SSL: process.env.SSL,
        APISSL: process.env.APISSL,
        APIHOST: `"${process.env.APIHOST}"`,
        APIPORT: process.env.APIPORT
      },
      __CLIENT__: true,
      __SERVER__: false
    })
  ]
};

export default merge(baseConfig, config);
