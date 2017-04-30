/* eslint-disable react/no-danger */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import Helmet from 'react-helmet';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node.isRequired,
    store: PropTypes.object.isRequired
  };

  static defaultProps = {
    assets: {}
  };

  render() {
    const { assets, component, store } = this.props;
    const content = component ? ReactDOM.renderToString(component) : '';
    const head = Helmet.rewind();
    const ie = '<!--[if lte IE 9]><div class="browsehappy"><div class="browsehappy__inner"><div class="browsehappy__message">You are using an <strong>outdated</strong> browser.Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</div></div></div><![endif]-->';
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

          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
          {/* styles (will be present only in production with webpack extract text plugin) */}
          {assets.styles && Object.keys(assets.styles).map(style =>
            <link
              href={assets.styles[style]} key={style} media="screen, projection"
              rel="stylesheet" type="text/css" charSet="UTF-8"
            />
          )}

          {/* (will be present only in development mode) */}
          {assets.styles && Object.keys(assets.styles).length === 0 ?
            <style dangerouslySetInnerHTML={{ __html: '#content{display:none}' }} /> : null}
        </head>
        <body>
          <div dangerouslySetInnerHTML={{ __html: ie }} />
          <div id="content" dangerouslySetInnerHTML={{ __html: content }} style={{ height: '100%', minHeight: 0 }} />
          {store &&
            <script
              dangerouslySetInnerHTML={{ __html: `window.__data=${serialize(store.getState())};` }}
              charSet="UTF-8"
            />
          }
          {assets.javascript && <script src={assets.javascript.main} charSet="UTF-8" />}

          {/* (will be present only in development mode) */}
          {assets.styles && Object.keys(assets.styles).length === 0 ?
            <script
              dangerouslySetInnerHTML={{ __html: 'document.getElementById("content").style.display="block";' }}
            />
            :
            null
          }
        </body>
      </html>
    );
  }
}
