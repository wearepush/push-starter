import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
  App,
  Home
} from '../containers';

export default function routes() {
  return (
    <Route path="/">
      <Route component={App}>
        { /* Home (main) route */ }
        <IndexRoute component={Home} />
      </Route>
    </Route>
  );
}
