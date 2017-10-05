import { App } from './../components';
import Home from './Home/Home';
import Invite from './Invite/Invite';
import NotFound from './NotFound/NotFound';

export default (store) => {  // eslint-disable-line
  return [{
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/invite',
        component: Invite
      },
      {
        path: '*',
        component: NotFound
      }
    ]
  }];
};
