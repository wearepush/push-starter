import React from 'react';
import { object, oneOfType, array } from 'prop-types';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import { ScrollToTop } from '../../elements';
import RootRoutes from './RootRoutes';
import HistoryRouter from './HistoryRouter';
import '../../styles/global/index.scss';

const Root = ({ routes, store }) => (
  <HelmetProvider>
    <Provider store={store}>
      <HistoryRouter store={store}>
        <RootRoutes routes={routes} />
        <ScrollToTop />
      </HistoryRouter>
    </Provider>
  </HelmetProvider>
);

Root.propTypes = {
  routes: oneOfType([array, object]).isRequired,
  store: object.isRequired,
};

export default Root;
