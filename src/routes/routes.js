import { App } from '../components';
import { Home, UI, Users, SignUp, SignIn, ResetPassword, NotFound } from './index';
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
        path: '/signup',
        component: withTracker(SignUp)
      },
      {
        path: '/signin',
        component: withTracker(SignIn)
      },
      {
        path: '/reset',
        component: withTracker(ResetPassword)
      },
      {
        path: '*',
        component: withTracker(NotFound)
      }
    ]
  }];
};
