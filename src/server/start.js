import { server } from 'universal-webpack';
import settings from '../../config/universal-webpack-settings.json';
import config from '../../config/webpack.config';

/**
 * Define isomorphic constants.
 */
global.__CLIENT__ = false;
global.__SERVER__ = true;

server(config, settings);
