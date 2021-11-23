import React from 'react';
import { Section } from '../components';
import { Home, Users, SignIn, NotFound } from './index';
import withTracker from './withTracker';

const ConnectedHome = withTracker(Home);
const ConnectedUsers = withTracker(Users);
const ConnectedSignIn = withTracker(SignIn);
const ConnectedNotFound = withTracker(NotFound);

export default (store) => { // eslint-disable-line
  // we can get an access to store
  return [
    {
      element: <Section />,
      children: [
        {
          path: '/',
          exact: true,
          element: <ConnectedHome />,
        },
        {
          path: '/users',
          element: <ConnectedUsers />,
        },
        {
          path: '/signin',
          element: <ConnectedSignIn />,
        },
        {
          path: '*',
          element: <ConnectedNotFound />,
        },
      ],
    },
  ];
};
