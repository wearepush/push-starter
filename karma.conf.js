var webpack = require('webpack');

module.exports = function (config) {
  config.set({

    browsers: ['PhantomJS'],

    singleRun: !!process.env.CI,

    frameworks: ['mocha'],

    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      'tests.webpack.js'
    ].filter(function (x) { return !!x; }),

    preprocessors: {
      'tests.webpack.js': ['webpack', 'sourcemap']
    },

    reporters: ['mocha'],

    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher',
      'karma-sourcemap-loader'
    ],

    webpack: {
      devtool: 'inline-source-map',
      entry: '',
      performance: {
        hints: false
      },
      module: {
        rules: [
          { test: /\.(jpe?g|png|gif|svg)$/, loader: 'url-loader', options: { limit: 10240 } },
          { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
          {
            test: /\.scss$/,
            use: [
              {
                loader: 'style-loader',
              },
              {
                loader: 'css-loader',
                options: {
                  sourceMap: '',
                  importLoaders: 1,
                  modules: true,
                  localIdentName: '[local]__[hash:base64:5]', // [name]__
                },
              },
              {
                loader: 'postcss-loader',
              },
              {
                loader: 'sass-loader',
              },
            ],
          },
        ]
      },
      resolve: {
        modules: [
          'src',
          'node_modules'
        ]
      },
      plugins: [
        new webpack.IgnorePlugin(/\.json$/),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
           __CLIENT__: true,
          __SERVER__: false,
          __DEVELOPMENT__: true,
          __DEVTOOLS__: false,  // <-------- DISABLE redux-devtools HERE
        })
      ]
    },

    webpackServer: {
      noInfo: true
    },

    devServer: {
      stats: 'errors-only',
    }

  });
};
