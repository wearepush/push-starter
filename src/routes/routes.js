import { App } from 'components';
import { Home, UI, Users, SignIn, NotFound } from 'routes';
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
        path: '/ui',
        component: withTracker(UI)
      },
      {
        path: '/signin',
        component: withTracker(SignIn)
      },
      {
        path: '*',
        component: withTracker(NotFound)
      }
    ]
  }];
};
