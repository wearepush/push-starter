export default {
  development: {
    isProd: false,
    apiSSL: false
  },
  production: {
    isProd: true,
    apiSSL: true
  }
}[process.env.NODE_ENV || 'development'];
