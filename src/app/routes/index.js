// import AppContainer from 'app/containers/AppContainer';
import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { App, HomePage } from '../containers';

export default function routes() {
  // return {
  //   component: AppContainer,
  //   childRoutes: [
  //     require('./landing'),
  //     require('./notFound')
  //   ]
  // };
  return (
    <Route path="/">
      <Route component={App}>
        { /* Home (main) route */ }
        <IndexRoute component={HomePage} />
      </Route>
    </Route>
  );
}
