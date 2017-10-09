import { App } from './../components';
import Home from './Home/Home';
import Users from './Users/Users';
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
        path: '/users',
        component: Users
      },
      {
        path: '*',
        component: NotFound
      }
    ]
  }];
};
