import { App } from './../components';
import Home from './Home/Home';
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
        path: '*',
        component: NotFound
      }
    ]
  }];
};
