/* eslint-disable consistent-return */
import path from 'path';
import compression from 'compression';
import express from 'express';
import favicon from 'serve-favicon';
import winston from 'winston';
import expressWinston from 'express-winston';
import cookieParser from 'cookie-parser';

import { host, port, logLevel, isEnvProduction, ssl } from '../../config/consts';

import createSSR from './SSR/createSSR';
import { versionRouter } from './routes';

export default function createServer(parameters) {
  const app = express();

  if (isEnvProduction) {
    app.use(compression());
  }
  app.disable('etag');
  app.disable('x-powered-by');
  app.use(cookieParser());
  app.use('/', express.static('public', { etag: false }));
  app.use(favicon(path.join('public', 'favicons', 'icon-48x48.png')));
  app.use((req, res, next) => {
    res.set('X-Frame-Options', 'DENY');
    next();
  });
  if (ssl) {
    app.use((req, res, next) => {
      if (req.headers['x-forwarded-proto'] !== 'https') {
        res.redirect(302, `https://${req.hostname}${req.originalUrl}`);
      } else {
        next();
      }
    });
  }
  app.use(versionRouter);
  app.get('/api/users', (req, res) => {
    res.json({
      records: [
        { id: 2, name: 'Justin Timberlake' },
        { id: 1, name: 'Kanye West' },
      ],
    });
  });
  if (logLevel) {
    const loggerOptions = {
      level: logLevel,
      transports: [
        new winston.transports.Console({
          json: true,
          colorize: true,
        }),
      ],
    };
    app.use(expressWinston.logger(loggerOptions));
  }

  app.get('*', createSSR(parameters && parameters.chunks()));

  app.listen(port, (err) => {
    if (err) {
      return console.error(err);
    }
    if (host && port) {
      console.info(`Listening at ${host}:${port}`);
    }
  });
}
