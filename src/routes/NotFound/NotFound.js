import React from 'react';
import { Route } from 'react-router-dom';

const NotFound = () => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = 404; // eslint-disable-line
      }
      return (
        <div>
          <h1>404 : Not Found</h1>
        </div>
      );
    }}
  />
);

export default NotFound;
