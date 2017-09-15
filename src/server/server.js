import path from 'path';
import compression from 'compression';
import express from 'express';
import favicon from 'serve-favicon';
import {} from './env';
import createSSR from './SSR/createSSR';
import appConfig from '../app/config';

const { host, port } = appConfig.server;
const app = express();

export default function (parameters) {
  if (appConfig.isProd) {
    app.use(compression());
  }
  app.disable('etag');
  app.disable('x-powered-by');
  app.use('/', express.static('static', { etag: false }));
  app.use(favicon(path.join(__dirname, '..', 'favicons', 'favicon.ico')));
  app.get('*', createSSR(parameters.chunks()));

  app.listen(port, (err) => { // eslint-disable-line
    if (err) {
      return console.error(err);
    }

    console.info(`Listening at ${host}:${port}`);

  });
}
