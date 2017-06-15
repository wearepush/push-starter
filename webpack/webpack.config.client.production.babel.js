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
  'react-router',
  'react-router-redux',
  'redux-connect',
  'react-hot-loader',
  'react-helmet',
  'redux-form',
  'semantic-ui-react'
];


const config = {
  devtool: 'source-map',
  entry: { vendor },

  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },

  plugins: [
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {
        discardComments: {removeAll: true }
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

    // css files from the extract-text-plugin loader
    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css',
      // disable: false,
      allChunks: true
    }),

    // we are usign -p in productuin
    // new webpack.optimize.UglifyJsPlugin({
    //   compressor: {
    //     warnings: false
    //   }
    // }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        SSL: `"${process.env.SSL}"`,
        APISSL: `"${process.env.APISSL}"`,
        APIHOST: `"${process.env.APIHOST}"`,
        APIPORT: `"${process.env.APIPORT}"`
      },
      __CLIENT__: true,
      __SERVER__: false
    })
  ]
};

export default merge(baseConfig, config);
