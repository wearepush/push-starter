import path from 'path';
import webpack from 'webpack';
import './../src/server/env';
import paths from './paths';

const rootFolder = path.resolve(__dirname, '..');
const cdnHost = process.env.CDNHOST || '';

const config = {
  context: rootFolder,

  entry: {
    main: './src/client',
  },

  mode: process.env.NODE_ENV || 'development',

  output: {
    path: path.resolve(rootFolder, 'static/assets'),
    publicPath: '/assets/',
    filename: '[name].[hash].js',
  },

  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(scss)$/,
        sideEffects: true,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
              modules: {
                // mode: 'local',
                localIdentContext: path.resolve(__dirname, 'src'),
                localIdentName: '[local]__[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(css)$/,
        sideEffects: true,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  resolve: {
    extensions: ['*', '.js'],
    modules: ['src', 'node_modules', paths.appNodeModules, paths.packageModules],
    alias: {
      react: path.resolve('node_modules/react'),
      components: path.resolve('src/components'),
      elements: path.resolve('src/elements'),
      config: path.resolve('src/config'),
      helpers: path.resolve('src/helpers'),
      modules: path.resolve('src/redux/modules'),
      routes: path.resolve('src/routes'),
      utils: path.resolve('src/utils'),
    },
  },
};

if (cdnHost) {
  const publicPath = cdnHost + '/assets/';

  config.module.rules.push({
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 1,
          publicPath,
        },
      },
    ],
  });

  config.module.rules.push({
    test: /\.(eot|ttf|wav|mp3)$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          publicPath,
        },
      },
    ],
  });
} else {
  config.module.rules.push({
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
        },
      },
    ],
  });

  config.module.rules.push({
    test: /\.(eot|ttf|wav|mp3)$/,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  });
}

export default config;
