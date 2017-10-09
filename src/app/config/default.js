import { isUndefined } from 'lodash';

const ssl = !isUndefined(process.env.SSL) && +(process.env.SSL) === 1 ? 1 : 0;
const prefix = 'http' + (ssl ? 's' : '') + '://';
const host = prefix + (process.env.HOST || 'localhost');
const port = !isUndefined(process.env.PORT) ? +(process.env.PORT) : '';
const apiSsl = !isUndefined(process.env.APISSL) && +(process.env.APISSL) === 1 ? 1 : 0;
const prefixHost = 'http' + (apiSsl ? 's' : '') + '://';
const apiPort = !isUndefined(process.env.APIPORT) ? +(process.env.APIPORT) : '';
const apiHost = prefixHost + (!isUndefined(process.env.APIHOST) ? process.env.APIHOST : 'localhost') + (apiPort ? ':' + apiPort : '');
const ssr = !isUndefined(process.env.SSR) && +(process.env.SSR) === 1;

export default {
  ssl,
  host: host + (port ? `:${port}` : ''),
  port,
  apiSsl,
  apiPort,
  apiHost,
  ssr,

  server: {
    ssl,
    host,
    port: port || 8080,
    apiSsl,
    apiPort,
    apiHost
  },

  webpack: {
    server: {
      ssl,
      host,
      port: port || 3001,
      apiSsl,
      apiPort,
      apiHost
    }
  }
};
