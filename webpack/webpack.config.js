process.noDeprecation = true;

import path from 'path';
import webpack from 'webpack';

const rootFolder = path.resolve(__dirname, '..');
const config = {
  context: rootFolder,

  entry: {
    main: './src/client'
  },

  output: {
    path: path.resolve(rootFolder, 'static/assets'),
    publicPath: '/assets/',
    filename: '[name].[hash].js'
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        use: 'url-loader?limit=10000'
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        use: 'file-loader'
      },
      {
        test: /\.(scss)$/,
        use:
        [{
          loader: 'style-loader'
        },
        {
          loader : 'css-loader',
          options:
          {
            sourceMap: true,
            importLoaders: 2,
            modules: true,
            localIdentName: '[local]__[hash:base64:5]'
          }
        },
        {
          loader : 'postcss-loader',
          options:
          {
            sourceMap : true
          }
        },
        {
          loader : 'sass-loader',
          options:
          {
            outputStyle       : 'expanded',
            sourceMap         : true,
            sourceMapContents : true
          }
        }]
      },
      {
        test: /\.(css)$/,
        use:
        [{
          loader: 'style-loader'
        },
        {
          loader : 'css-loader',
          options:
          {
            importLoaders : 2,
            sourceMap     : true
          }
        },
        {
          loader : 'postcss-loader'
        }]
      }
    ]
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  resolve: {
    extensions: ['*', '.js', '.html'],
    modules: ['src', 'node_modules'],
    alias: {
      app: path.resolve(rootFolder, 'src/app')
    }
  }
};

export default config;
