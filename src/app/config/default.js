export default {
  server: {
    host: process.env.HOST || 'http://localhost',
    port: process.env.PORT || 8080
  },

  webpack: {
    server: {
      host: process.env.HOST || 'http://localhost',
      port: process.env.PORT || 3001
    }
  }
};
