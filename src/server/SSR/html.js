import React, { Component } from 'react';
import { object } from 'prop-types';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { ReduxAsyncConnect } from 'redux-connect';
import appConfig from '../../app/config';

export default class Html extends Component {
  static propTypes = {
    store: object.isRequired,
    renderProps: object.isRequired,
    assets: object.isRequired
  };

  render() {
    const {
      store,
      renderProps,
      assets
    } = this.props;

    const { isProd } = appConfig;
    const initialState = `window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}`;

    const content = renderToString(
      <Provider store={store}>
        <ReduxAsyncConnect {...renderProps} />
      </Provider>
    );

    return (
      <html lang="en">
        <head />
        <body>
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          <script dangerouslySetInnerHTML={{ __html: initialState }} />
          {isProd && <script defer src={assets.javascript.vendor} />}
          <script defer src={assets.javascript.main} />
        </body>
      </html>
    );
  }
}
