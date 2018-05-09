import { serverConfiguration } from 'universal-webpack';
import settings from './universal-webpack-settings.json';
import config from './webpack.config';

// remove this when mini-css-extract-plugin resolve an issue with HMR
// if (config.module.rules && config.module.rules.length > 0) {
//   const findScss = config.module.rules.findIndex((c) => {
//     if (c.test.toString().indexOf('.(scss)') > -1) {
//       return c.test;
//     }
//   });
//   if (findScss > -1) {
//     config.module.rules[findScss].use[0] = {
//       loader: 'style-loader'
//     };
//   }
//   const findCss = config.module.rules.findIndex((c) => {
//     if (c.test.toString().indexOf('.(css)') > -1) {
//       return c.test;
//     }
//   });
//   if (findCss > -1) {
//     config.module.rules[findCss].use[0] = {
//       loader: 'style-loader'
//     };
//   }
// }

export default serverConfiguration(config, settings);
