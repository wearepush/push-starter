/* eslint-disable react/no-danger */
import React from 'react';
import { object, node } from 'prop-types';
import { renderToString } from 'react-dom/server';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';
import config from '../../config';

const Html = ({
  assets,
  component,
  store,
}) => {
  const initialState = `window.__INITIAL_STATE__ = ${serialize(store.getState())}`;
  const head = Helmet.rewind();
  const ie = '<!--[if lte IE 9]><div class="browsehappy"><div class="browsehappy__inner"><div class="browsehappy__message">You are using an <strong>outdated</strong> browser.Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</div></div></div><![endif]-->';
  const content = component ? renderToString(component) : null;
  return (
    <html lang="en">
      <head>
        {head.base.toComponent()}
        {head.title.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {head.script.toComponent()}
        <meta charSet="utf-8" />
        <meta name="robots" content="INDEX,FOLLOW" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
        {/* favicons */}
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
        {/*
        <title></title>
        <meta name="description" content="" />
        */}
        {/* facebook */}
        <meta property="author" content="wearepush" />
        <meta property="og:site_name" content="wearepush.co" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/logo.jpg" />
        {/*
        <meta property="og:title" content="" />
        <meta property="og:description" content="" />
        */}
        {/* twitter */}
        <meta property="twitter:site" content="wearepush.co" />
        <meta property="twitter:domain" content="wearepush.co" />
        <meta property="twitter:creator" content="wearepush" />
        <meta property="twitter:card" content="summary" />
        <meta property="twitter:image:src" content="/logo.jpg" />
        {/*
        <meta property="twitter:title" content="" />
        <meta property="twitter:description" content="" />
        */}
        {/* styles (will be present only in production with webpack extract text plugin) */}
        {config.isProd && assets.styles && Object.keys(assets.styles).map(
          c => <link href={assets.styles[c]} key={c} rel="stylesheet" type="text/css" charSet="UTF-8" />
        )}
        {/* styles will be preloaded */}
        {config.isProd && assets.styles && Object.keys(assets.styles).map(
          c => <link rel="preload" href={assets.styles[c]} key={c} as="style" />
        )}
        {config.isProd && <link rel="preload" href={assets.javascript.vendor} as="script" />}
        {config.isProd && <link rel="preload" href={assets.javascript.main} as="script" />}
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" />
      </head>
      <body>
        <div dangerouslySetInnerHTML={{ __html: ie }} />
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} style={{ height: '100%' }} />
        <script dangerouslySetInnerHTML={{ __html: initialState }} />
        {config.isProd && <script defer src={assets.javascript.vendor} />}
        <script defer src={assets.javascript.main} />
      </body>
    </html>
  );
};

Html.defaultProps = {
  component: null
};

Html.propTypes = {
  assets: object.isRequired,
  component: node,
  store: object.isRequired
};

export default Html;
