require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT || '',
  apiTokenKey: 'token',
  apiSSL: true,
  tokenExpire: 14, // in days
  meta: {
    title: 'Redux Starter',
    description: 'Redux Starter',
    home: {
      htmlAttributes: {
        lang: 'en'
      },
      title: 'Redux Starter - Home',
      meta: [
        { name: 'description', content: 'Redux Starter!' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'Redux Starter' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'Redux Starter' },
        { property: 'og:description', content: 'Redux Starter!' },
      ]
    },
    notFound: {
      title: 'Redux Starter - Not Found',
      htmlAttributes: {
        lang: 'en'
      },
      meta: [
        { name: 'description', content: 'Redux Starter' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: 'Redux Starter' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'Redux Starter' },
        { property: 'og:description', content: 'Redux Starter' },
        { property: 'og:image', content: '/logo.jpg' },
        { property: 'og:image:width', content: '200' },
        { property: 'og:image:height', content: '200' }
      ]
    }
  }
}, environment);
