import startServer from 'universal-webpack/server';
import settings from './../webpack/universal-webpack-settings';
// `configuration.context` and `configuration.output.path` are used
import configuration from './../webpack/webpack.config';

startServer(configuration, settings);
