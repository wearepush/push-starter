import 'babel-polyfill';

import React from 'react';
import { fromJS } from 'immutable';
import { hydrate } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Redbox from 'redbox-react';

import Root from './root';
import ApiClient from '../helpers/ApiClient';
import getRoutes from '../app/routes';
import configureStore from '../app/redux/store';

const client = new ApiClient();
const initialState = fromJS(window.__INITIAL_STATE__);
const store = configureStore(client, initialState);
const dest = document.getElementById('root');

const component = (
  <AppContainer
    errorReporter={Redbox}
  >
    <Root
      routes={getRoutes(store)}
      store={store}
    />
  </AppContainer>
);
hydrate(component, dest);
