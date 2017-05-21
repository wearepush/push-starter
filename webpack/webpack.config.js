process.noDeprecation = true;

// Webpack config for development
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var assetsPath = path.resolve(__dirname, '../static/dist');
var host = (process.env.HOST || 'localhost');
var port = (+process.env.PORT + 1) || 3001;
// var bootstrapEntryPoints = require('./webpack.bootstrap.config.js');

module.exports = {
  devtool: 'inline-source-map', // 'eval-cheap-module-source-map' || 'inline-source-map'
  context: path.resolve(__dirname, '..'),
  entry: {
    'main': [
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
      // bootstrapEntryPoints.dev,
      './src/client.js'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://' + host + ':' + port + '/dist/'
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },

      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        query: {
          babelrc: false,
          presets: [
            'react',
            'es2015',
            'stage-0'
          ],
          'plugins': [
            'transform-runtime',
            'add-module-exports',
            'transform-decorators-legacy',
            'transform-react-display-name',
            'transform-flow-strip-types',
            'typecheck',
            [
              'react-transform',
              {
                'transforms': [
                  {
                    'transform': 'react-transform-catch-errors',
                    'imports': ['react','redbox-react']
                  },
                  {
                    'transform': 'react-transform-hmr',
                    'imports': ['react'],
                    'locals': ['module']
                  }
                ]
              }
            ]
          ]
        }

      },

      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
              modules: true,
              localIdentName: '[local]__[hash:base64:5]',
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')({
                  browsers: ['last 2 version']
                })
              ]
            }
          },
          {
            loader: 'sass-loader'
          },
        ],
      },

      {
        test: /\.(woff|woff2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000'
      },

      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        use: 'file-loader'
      },

      // {
      //   test: webpackIsomorphicToolsPlugin.regular_expression('images'),
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10240
      //   }
      // }
    ]
  },
  resolve: {
    modules: [
      'src',
      'node_modules'
    ]
  },
  plugins: [
    // hot reload
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      'process.env': {
        APIHOST: `"${process.env.APIHOST}"`,
        APIPORT: `"${process.env.APIPORT}"`
      },
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE
    })
  ]
};