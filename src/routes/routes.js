import { Section } from '../components';
import { Home, Users, SignIn, NotFound } from './index';
import withTracker from './withTracker';

export default (store) => { // eslint-disable-line
  // we can get an access to store
  return [
    {
      component: Section,
      routes: [
        {
          path: '/',
          exact: true,
          component: withTracker(Home),
        },
        {
          path: '/users',
          component: withTracker(Users),
        },
        {
          path: '/signin',
          component: withTracker(SignIn),
        },
        {
          path: '*',
          component: withTracker(NotFound),
        },
      ],
    },
  ];
};
