export default {
  development: {
    isProd: false,
    apiSSL: false,
    apiHost: 'localhost',
    apiPort: 3005
  },
  production: {
    isProd: true,
    apiSSL: true,
    apiHost: 'localhost',
    apiPort: 3005
  }
}[process.env.NODE_ENV || 'development'];
