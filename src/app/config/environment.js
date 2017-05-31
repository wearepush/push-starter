const environment = {
  development: {
    apiSSL: false,
    isProduction: false
  },
  production: {
    isProduction: true,
    apiSSL: false
  }
}[process.env.NODE_ENV || 'development'];

export default Object.assign({
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT || '',
  apiTokenKey: 'token',
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
        { name: 'description', content: 'Redux Starter' },
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
