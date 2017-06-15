/* eslint-disable react/no-danger */
import React, { Component } from 'react';
import { object } from 'prop-types';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { ReduxAsyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';
import appConfig from 'config';

export default class Html extends Component {
  static propTypes = {
    assets: object.isRequired,
    renderProps: object.isRequired,
    store: object.isRequired
  };

  render() {
    const {
      store,
      renderProps,
      assets
    } = this.props;

    const { isProd } = appConfig;
    const initialState = `window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}`;
    const head = Helmet.rewind();
    const ie = '<!--[if lte IE 9]><div class="browsehappy"><div class="browsehappy__inner"><div class="browsehappy__message">You are using an <strong>outdated</strong> browser.Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</div></div></div><![endif]-->';

    const content = renderToString(
      <Provider store={store}>
        <ReduxAsyncConnect {...renderProps} />
      </Provider>
    );
    return (
      <html lang="en">
        <head>
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          <link rel="shortcut icon" href="/favicons/favicon.ico" />
          <meta name="msapplication-TileImage" content="/favicons/192x192.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon-180x180.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/favicons/apple-touch-icon-152x152.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/favicons/apple-touch-icon-144x144.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/favicons/apple-touch-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/favicons/apple-touch-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/favicons/apple-touch-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/favicons/apple-touch-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/favicons/apple-touch-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="57x57" href="/favicons/apple-touch-icon-57x57.png" />
          <link rel="android-chrome" sizes="36x36" type="image/png" href="/favicons/android-chrome-36x36.png" />
          <link rel="android-chrome" sizes="48x48" type="image/png" href="/favicons/android-chrome-48x48.png" />
          <link rel="android-chrome" sizes="72x72" type="image/png" href="/favicons/android-chrome-72x72.png" />
          <link rel="android-chrome" sizes="96x96" type="image/png" href="/favicons/android-chrome-96x96.png" />
          <link rel="android-chrome" sizes="144x144" type="image/png" href="/favicons/android-chrome-144x144.png" />
          <link rel="android-chrome" sizes="192x192" type="image/png" href="/favicons/android-chrome-192x192.png" />
          <link rel="icon" sizes="194x194" type="image/png" href="/favicons/favicon-194x194.png" />
          <link rel="icon" sizes="96x96" type="image/png" href="/favicons/favicon-96x96.png" />
          <link rel="icon" sizes="32x32" type="image/png" href="/favicons/favicon-32x32.png" />
          <link rel="icon" sizes="16x16" type="image/png" href="/favicons/favicon-16x16.png" />
          <meta name="msapplication-TileColor" content="#62bf7c" />
          <meta name="msapplication-TileImage" content="/favicons/apple-touch-icon-144x144.png" />
          <meta name="theme-color" content="#ffffff" />

          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css" />
          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />

          {/* styles (will be present only in production with webpack extract text plugin) */}
          {isProd && assets.styles && Object.keys(assets.styles).map(
            style => <link href={assets.styles[style]} key={style} rel="stylesheet" type="text/css" charSet="UTF-8" />
          )}
        </head>
        <body>
          <div dangerouslySetInnerHTML={{ __html: ie }} />
          <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
          <script dangerouslySetInnerHTML={{ __html: initialState }} />
          {isProd && <script defer src={assets.javascript.vendor} />}
          <script defer src={assets.javascript.main} />
        </body>
      </html>
    );
  }
}
