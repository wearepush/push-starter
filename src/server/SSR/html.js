/* eslint-disable react/no-danger */
import React from 'react';
import { object, node } from 'prop-types';
import { renderToString } from 'react-dom/server';
import serialize from 'serialize-javascript';
import { helmetContext } from './createSSR';
import { isEnvProduction } from '../../../config/consts';

const Html = ({ assets, component, store }) => {
  const initialState = `window.INITIAL_STATE = ${serialize(store.getState())}`;
  const ie =
    '<!--[if lte IE 9]><div class="browsehappy"><div class="browsehappy__inner"><div class="browsehappy__message">You are using an <strong>outdated</strong> browser.Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</div></div></div><![endif]-->';
  const content = component ? renderToString(component) : null;
  const { helmet } = helmetContext;
  const jsMap = assets?.javascript;
  const jsList = Object.keys(jsMap);
  const cssMap = assets?.styles;
  const cssList = Object.keys(cssMap);
  return (
    <html lang="en">
      <head>
        {helmet?.base.toComponent()}
        {helmet?.title.toComponent()}
        {helmet?.meta.toComponent()}
        {helmet?.link.toComponent()}
        {helmet?.script.toComponent()}
        <meta charSet="utf-8" />
        <meta name="robots" content="INDEX,FOLLOW" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" />
        {/* favicons */}
        <link rel="icon" href="/favicons/icon-48x48.png" />
        <link rel="manifest" href="/favicons/manifest.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="apple-touch-icon" sizes="48x48" href="/favicons/icon-48x48.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicons/icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="96x96" href="/favicons/icon-96x96.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicons/icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/favicons/icon-192x192.png" />
        <link rel="apple-touch-icon" sizes="256x256" href="/favicons/icon-256x256.png" />
        <link rel="apple-touch-icon" sizes="384x384" href="/favicons/icon-384x384.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/favicons/icon-512x512.png" />
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
        {isEnvProduction && (
          <>
            {cssList?.map((c) => (
              <link
                as="style"
                crossOrigin="anonymous"
                href={cssMap[c]?.src}
                integrity={cssMap[c]?.integrity}
                key={c}
                rel="preload"
              />
            ))}
            {jsList?.map((c) => (
              <link
                as="script"
                crossOrigin="anonymous"
                href={jsMap[c]?.src}
                integrity={jsMap[c]?.integrity}
                key={c}
                rel="preload"
              />
            ))}
          </>
        )}
        {cssList?.map((c) => (
          <link
            charSet="UTF-8"
            crossOrigin="anonymous"
            href={cssMap[c]?.src}
            integrity={cssMap[c]?.integrity}
            key={c}
            rel="stylesheet"
            type="text/css"
          />
        ))}
        <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" />
      </head>
      <body>
        <div dangerouslySetInnerHTML={{ __html: ie }} />
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script dangerouslySetInnerHTML={{ __html: initialState }} />
        {jsList?.map((c) => (
          <script
            crossOrigin={isEnvProduction ? 'anonymous' : undefined}
            defer
            integrity={isEnvProduction ? jsMap[c]?.integrity : undefined}
            key={c}
            src={isEnvProduction ? jsMap[c]?.src : jsMap[c]}
          />
        ))}
      </body>
    </html>
  );
};

Html.defaultProps = {
  component: null,
};

Html.propTypes = {
  assets: object.isRequired,
  component: node,
  store: object.isRequired,
};

export default Html;
