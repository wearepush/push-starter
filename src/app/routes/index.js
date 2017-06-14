import { App } from 'components';

import {
  Home,
  Invite,
  NotFound
} from 'pages';

export default (store) => {  // eslint-disable-line
  return {
    childRoutes: [{
      path: '/',
      component: App,
      childRoutes: [
        Home,
        Invite,
        NotFound
      ]
    }]
  };
};
