const ssl = typeof process.env.SSL !== 'undefined' &&
            process.env.SSL !== 'undefined' && +(process.env.SSL) === 1 ? 1 : 0;

const prefix = 'http' + (ssl ? 's' : '') + '://';
const host = prefix + (process.env.HOST || 'localhost');

const port = typeof process.env.PORT !== 'undefined' &&
            process.env.PORT !== 'undefined' ? +(process.env.PORT) : null;

const apiSsl = typeof process.env.APISSL !== 'undefined' &&
                process.env.APISSL !== 'undefined' && +(process.env.APISSL) === 1 ? 1 : 0;

const prefixHost = 'http' + (apiSsl ? 's' : '') + '://';

const apiPort = typeof process.env.APIPORT !== 'undefined' &&
                process.env.APIPORT !== 'undefined' ? +(process.env.APIPORT) : null;

const apiHost = prefixHost + (typeof process.env.APIHOST !== 'undefined' &&
                process.env.APIHOST !== 'undefined' ? process.env.APIHOST : 'localhost') + apiPort;

export default {
  ssl,
  host: host + (port ? `:${port}` : ''),
  port,
  apiSsl,
  apiPort,
  apiHost,

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
