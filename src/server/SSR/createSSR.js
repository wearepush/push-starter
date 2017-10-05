import React from 'react';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';

import getRoutes from 'routes';
import Html from './html';
import ApiClient from '../../helpers/ApiClient';
import configureStore from '../../app/redux/store';
import config from '../../app/config';

export default function createSSR(assets) {
  return (req, res) => {
    const context = {};
    const client = new ApiClient(req);
    const store = configureStore(client);

    const hydrateOnClient = () => {
      res.send(
        `<!doctype html>\n${renderToString(
          <Html
            assets={assets}
            store={store}
          />
        )}`
      );
    };

    if (config.ssr) {
      hydrateOnClient();
      return;
    }

    const component = (
      <Provider store={store}>
        <StaticRouter
          location={req.url}
          context={context}
        >
          {renderRoutes(getRoutes(store))}
        </StaticRouter>
      </Provider>
    );
    const content = renderToString(
      <Html
        assets={assets}
        component={component}
        store={store}
      />
    );

    if (context.url) {
      res.writeHead(302, {
        Location: context.url
      });
      res.end();
      return;
    }

    if (context.status) {
      res.status(context.status);
    } else {
      res.status(200);
    }

    for (const cookie of client.cookies) { // eslint-disable-line
      res.set('Set-Cookie', cookie);
    }
    res.send(`<!doctype html>\n${content}`);
  };
}
