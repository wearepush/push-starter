/* eslint-disable react/self-closing-comp */

import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
  App,
  HomePage,
  NotFound,
} from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user } } = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth).catch(checkAuth);
    } else {
      checkAuth();
    }
  };

  const loggedRedirect = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user } } = store.getState();
      if (user) {
        // oops, not logged in, so can't be here!
        replace('/');
      }
      cb();
    }
    if (isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth).catch(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/">
      <Route component={App}>
        { /* Home (main) route */ }
        <IndexRoute component={HomePage} />

        <Route onEnter={loggedRedirect}></Route>
        <Route onEnter={requireLogin}></Route>

      </Route>
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
