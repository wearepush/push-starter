import { App } from './../components';
import About from './About/About';
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
        path: '/about',
        component: About
      },
      {
        path: '*',
        component: NotFound
      }
    ]
  }];
};
