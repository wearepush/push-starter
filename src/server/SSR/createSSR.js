import React, { StrictMode } from 'react';
import { renderToNodeStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { matchRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { HelmetProvider } from 'react-helmet-async';
import getRoutes from '../../routes/routes';
import Html from './html';
import ApiClient from '../../helpers/ApiClient';
import configureStore from '../../redux/store';
import { isSSR, host, port, ssl } from '../../../config/consts';
import { initialState as usersInitialState } from '../../redux/reducers/users/users';
import RootRoutes from '../../components/Root/RootRoutes';

export const helmetContext = {};

export default function createSSR(assets) {
  return (req, res) => {
    const context = {};
    const history = createMemoryHistory({
      initialEntries: [req.url],
    });
    const client = new ApiClient({
      port,
      host,
      ssl,
    });
    const { cookies = {} } = req;
    const { testData } = cookies;
    const initialState = {
      users: {
        ...usersInitialState,
        ...(testData && { testData: JSON.parse(testData) }),
      },
    };

    const store = configureStore(history, client, initialState);

    if (!isSSR) {
      const content = (
        <StrictMode>
          <Html assets={assets} store={store} />
        </StrictMode>
      );
      res.write('<!doctype html>');
      const stream = renderToNodeStream(content);
      stream.pipe(res, { end: false });
      stream.on('end', () => {
        res.end();
      });
      return;
    }

    if (context.status === 302) {
      res.redirect(302, context.url);
      return;
    }
    const routes = getRoutes(store);
    const branch = matchRoutes(routes, req.url);
    const promises = branch.map((data) => {
      const fetchData = data.route?.element?.type?.fetchData;
      if (fetchData instanceof Function) {
        return fetchData(store)
          .then((response) => Promise.resolve(response))
          .catch((error) => Promise.reject(error));
      }
      return Promise.resolve();
    });

    const onEnd = (_res) => {
      const component = (
        <HelmetProvider context={helmetContext}>
          <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
              <RootRoutes routes={routes} />
            </StaticRouter>
          </Provider>
        </HelmetProvider>
      );

      const content = (
        <StrictMode>
          <Html assets={assets} component={component} store={store} />
        </StrictMode>
      );

      if (_res && _res.response && _res.response.status) {
        res.status(_res.response.status);
      } else {
        res.status(200);
      }

      res.write('<!doctype html>');
      const stream = renderToNodeStream(content);
      stream.pipe(res, { end: false });
      stream.on('end', () => {
        res.end();
      });
    };

    Promise.all(promises).then(onEnd).catch(onEnd);
  };
}
