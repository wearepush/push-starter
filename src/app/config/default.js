const isDefined = v => typeof v !== 'undefined' && v !== 'undefined';
const ssl = isDefined(process.env.SSL) && +(process.env.SSL) === 1 ? 1 : 0;
const prefix = 'http' + (ssl ? 's' : '') + '://';
const host = prefix + (process.env.HOST || 'localhost');
const port = isDefined(process.env.PORT) ? +(process.env.PORT) : '';
const apiSsl = isDefined(process.env.APISSL) && +(process.env.APISSL) === 1 ? 1 : 0;
const prefixHost = 'http' + (apiSsl ? 's' : '') + '://';
const apiPort = isDefined(process.env.APIPORT) ? +(process.env.APIPORT) : '';
const apiHost = prefixHost + (isDefined(process.env.APIHOST) ? process.env.APIHOST : 'localhost') + apiPort;
const ssr = isDefined(process.env.SSR) && +(process.env.SSR) === 1;

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
