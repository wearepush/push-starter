import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import getBaseConfig from './webpack.config.client';
import CleanPlugin        from 'clean-webpack-plugin';

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
  'react-helmet'
];


const config = {
  devtool: 'source-map',
  entry: { vendor },

  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
  },

  plugins: [
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

    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),

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
