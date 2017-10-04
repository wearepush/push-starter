import { App } from 'components';

import {
  Home,
  Invite,
  NotFound
} from 'pages';

export default (store) => {  // eslint-disable-line
  // return [
  //   {
  //     component: App,
  //     routes: [
  //       { path: '/',
  //         exact: true,
  //         component: Home
  //       },
  //       // { path: '/home',
  //       //   component: Home
  //       // },
  //       // { path: '/list',
  //       //   component: List
  //       // }
  //     ]
  //   }
  // ];
  return [{
    component: App,
    routes: [
      Home,
      Invite,
      NotFound
    ]
  }];
};
