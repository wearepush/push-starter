import React from 'react';
import { renderToString } from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';

import getRoutes from 'routes';
import Html from './html';
import ApiClient from '../../helpers/ApiClient';
import configureStore from '../../app/redux/store';

export default function createSSR(assets) {
  return (req, res) => {
    const context = {};
    const client = new ApiClient(req);
    const store = configureStore(client);
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
    res.send(`<!doctype html>\n${content}`);
  };
}
