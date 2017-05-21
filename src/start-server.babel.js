// Enable ES6
// (ignoring all `dist` and `node_modules` folders for speed-up)
require('babel-register')({ ignore: /\/(dist|node_modules)\// })
require('./start-server.js')
