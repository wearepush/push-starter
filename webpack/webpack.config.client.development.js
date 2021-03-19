import webpack from 'webpack';
import merge from 'webpack-merge';
import Dotenv from 'dotenv-webpack';
import getBaseConfig from './webpack.config.client';
import appConfig from '../src/config';

const { host, port } = appConfig.webpack.server;
const baseConfig = getBaseConfig({
  development: true,
});

const config = {
  devtool: 'eval',

  watchOptions: {
    aggregateTimeout: 500,
    ignored: ['node_modules', '__mocks__', '__test__'],
  },

  performance: { hints: false },

  entry: {
    main: [
      `webpack-hot-middleware/client?path=${host}:${port}/__webpack_hmr`,
      'react-hot-loader/patch',
      baseConfig.entry.main,
    ],
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
    new Dotenv({
      path: '.env',
      systemvars: true,
      safe: true,
      silent: true,
    }),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
    }),
  ],

  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
};

export default merge(baseConfig, config);
