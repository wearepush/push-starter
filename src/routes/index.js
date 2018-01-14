import { App } from './../components';
import Home from './Home/Home';
import Users from './Users/Users';
import NotFound from './NotFound/NotFound';
import withTracker from './withTracker';

export default (store) => { // eslint-disable-line
  // we can get an access to store
  return [{
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: withTracker(Home)
      },
      {
        path: '/users',
        component: withTracker(Users)
      },
      {
        path: '*',
        component: withTracker(NotFound)
      }
    ]
  }];
};
