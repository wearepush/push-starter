const prefix = 'http' + (process.env.SSL ? 's' : '') + '://';
const host = prefix + (process.env.HOST || 'localhost');
const port = process.env.PORT;
const prefixHost = 'http' + (process.env.APISSL ? 's' : '') + '://';
const apiHost = prefixHost + (process.env.APIHOST || 'localhost');
const apiPort = process.env.APIPORT || '';

export default {
  server: {
    host,
    port: port || 8080,
    apiPort,
    apiHost
  },

  webpack: {
    server: {
      host,
      port: port || 3001,
      apiPort,
      apiHost
    }
  }
};
