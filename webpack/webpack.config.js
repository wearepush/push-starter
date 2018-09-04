import path from 'path';
import webpack from 'webpack';
import Dotenv from 'dotenv-webpack';

const rootFolder = path.resolve(__dirname, '..');
const config = {
  context: rootFolder,

  entry: {
    main: './src/client'
  },

  mode: process.env.NODE_ENV || 'development',

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
        sideEffects: true,
        use: [
          {
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
            options: {
              sourceMap: true
            }
          },
          {
            loader : 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(css)$/,
        sideEffects: true,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader : 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  },

  plugins: [
    new Dotenv({
      systemvars: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  resolve: {
    extensions: ['*', '.js'],
    modules: ['src', 'node_modules'],
    alias: {
      'react': path.resolve('node_modules/react'),
      'components': path.resolve('src/components'),
      'modules': path.resolve('src/redux/modules'),
      'routes': path.resolve('src/routes'),
    }
  }
};

export default config;
