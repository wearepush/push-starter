import React from 'react';
import { loadOnServer } from 'redux-connect';
import { renderToString } from 'react-dom/server';
import { syncHistoryWithStore } from 'react-router-redux';
import { createMemoryHistory, match } from 'react-router';

import routes from 'routes';
import { createSelectLocationState } from 'utils';
import Html from './html';
import ApiClient from '../../helpers/ApiClient';
import configureStore from '../../app/redux/store';

export default function createSSR(assets) {
  return (req, res) => {
    const memoryHistory = createMemoryHistory(req.url);
    const client = new ApiClient(req);
    const store = configureStore(memoryHistory, client);
    const history = syncHistoryWithStore(memoryHistory, store, {
      selectLocationState: createSelectLocationState('routing')
    });

    match({ history, routes: routes(store), location: req.url },
      (err, redirectLocation, renderProps) => {
        if (err) {
          res.status(500).send(err.message);
        } else if (redirectLocation) {
          res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
          loadOnServer({ ...renderProps, store }).then(() => {
            const content = renderToString(<Html {...{ renderProps, store, assets }} />);
            res.send(`<!doctype html>\n${content}`);
          });
        } else {
          res.status(404).send('Not found');
        }
      });
  };
}
