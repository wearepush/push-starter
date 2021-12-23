const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const {
  publicPath,
  isEnvDevelopment,
  isEnvProduction,
  imageInlineSizeLimit,
  shouldUseSourceMap,
} = require('./consts');
const paths = require('./paths');

// style files regexes
const svgRegex = /\.svg$/;
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

const sassLoaderOptions = {
  // Prefer `dart-sass`
  implementation: require('sass'),
};

// common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor, options) => {
  const loaders = [
    isEnvDevelopment && 'style-loader',
    isEnvProduction && {
      loader: MiniCssExtractPlugin.loader,
      // css is located in `static/css`, use '../../' to locate index.html folder
      // in production `publicPath` can be a relative path
      options: publicPath.startsWith('.') ? { publicPath: '../../' } : {},
    },
    {
      loader: 'css-loader',
      options: cssOptions,
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          // Necessary for external CSS imports to work
          // https://github.com/facebook/create-react-app/issues/2677
          ident: 'postcss',
          plugins: [
            'postcss-flexbugs-fixes',
            [
              'postcss-preset-env',
              {
                autoprefixer: {
                  flexbox: 'no-2009',
                },
                stage: 3,
              },
            ],
          ],
        },
        sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
      },
    },
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push(
      {
        loader: 'resolve-url-loader',
        options: {
          sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
          root: paths.appSrc,
        },
      },
      {
        loader: preProcessor,
        options: {
          sourceMap: true,
          ...options,
        },
      }
    );
  }
  return loaders;
};

module.exports = {
  strictExportPresence: true,
  rules: [
    // TODO: Merge this config once `image/avif` is in the mime-db
    // https://github.com/jshttp/mime-db
    {
      test: [/\.avif$/],
      type: 'asset',
      mimetype: 'image/avif',
      generator: {
        filename: 'static/media/[hash][ext][query]',
      },
      parser: {
        dataUrlCondition: {
          maxSize: imageInlineSizeLimit,
        },
      },
    },
    // "url" loader works like "file" loader except that it embeds assets
    // smaller than specified limit in bytes as data URLs to avoid requests.
    // A missing `test` is equivalent to a match.
    {
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
      type: 'asset',
      generator: {
        filename: 'static/media/[hash][ext][query]',
      },
      parser: {
        dataUrlCondition: {
          maxSize: imageInlineSizeLimit,
        },
      },
    },
    // import SVG as components
    {
      test: svgRegex,
      use: ['@svgr/webpack'],
      issuer: /\.jsx?$/,
    },
    // import SVG in (s)css files
    {
      test: svgRegex,
      type: 'asset',
      use: ['svgo-loader'],
      issuer: /\.s?css$/,
    },
    // Process application JS with Babel.
    // The preset includes JSX, Flow, TypeScript, and some ESnext features.
    {
      test: /\.(js|mjs|jsx)$/,
      include: paths.appSrc,
      loader: 'babel-loader',
      options: {
        plugins: [isEnvDevelopment && !process.env.WEBPACK_SERVER && 'react-refresh/babel'].filter(
          Boolean
        ),
        // This is a feature of `babel-loader` for webpack (not Babel itself).
        // It enables caching results in ./node_modules/.cache/babel-loader/
        // directory for faster rebuilds.
        cacheDirectory: true,
        // See #6846 for context on why cacheCompression is disabled
        cacheCompression: false,
        compact: isEnvProduction,
      },
    },
    // "postcss" loader applies autoprefixer to our CSS.
    // "css" loader resolves paths in CSS and adds assets as dependencies.
    // "style" loader turns CSS into JS modules that inject <style> tags.
    // In production, we use MiniCSSExtractPlugin to extract that CSS
    // to a file, but in development "style" loader enables hot editing
    // of CSS.
    // By default we support CSS Modules with the extension .module.css
    {
      test: cssRegex,
      exclude: cssModuleRegex,
      use: getStyleLoaders({
        importLoaders: 1,
        sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
      }),
      // Don't consider CSS imports dead code even if the
      // containing package claims to have no side effects.
      // Remove this when webpack adds a warning or an error for this.
      // See https://github.com/webpack/webpack/issues/6571
      sideEffects: true,
    },
    // Adds support for CSS Modules (https://github.com/css-modules/css-modules)
    // using the extension .module.css
    {
      test: cssModuleRegex,
      use: getStyleLoaders({
        importLoaders: 1,
        sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
        modules: {
          getLocalIdent: getCSSModuleLocalIdent,
        },
      }),
    },
    // Opt-in support for SASS (using .scss or .sass extensions).
    // By default we support SASS Modules with the
    // extensions .module.scss or .module.sass
    {
      test: sassRegex,
      exclude: sassModuleRegex,
      use: getStyleLoaders(
        {
          importLoaders: 3,
          sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
        },
        'sass-loader',
        sassLoaderOptions
      ),
      // Don't consider CSS imports dead code even if the
      // containing package claims to have no side effects.
      // Remove this when webpack adds a warning or an error for this.
      // See https://github.com/webpack/webpack/issues/6571
      sideEffects: true,
    },
    // Adds support for CSS Modules, but using SASS
    // using the extension .module.scss or .module.sass
    {
      test: sassModuleRegex,
      use: getStyleLoaders(
        {
          importLoaders: 3,
          sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
          modules: {
            getLocalIdent: getCSSModuleLocalIdent,
          },
        },
        'sass-loader',
        sassLoaderOptions
      ),
    },
    // "file" loader makes sure those assets get served by WebpackDevServer.
    // When you `import` an asset, you get its (virtual) filename.
    // In production, they would get copied to the `build` folder.
    // This loader doesn't use a "test" so it will catch all modules
    // that fall through the other loaders.
    {
      // Exclude `js` files to keep "css" loader working as it injects
      // its runtime that would otherwise be processed through "file" loader.
      // Also exclude `html` and `json` extensions so they get processed
      // by webpacks internal loaders.
      exclude: [
        /\.(js|mjs|jsx|ts|tsx)$/,
        /\.html$/,
        /\.json$/,
        cssRegex,
        cssModuleRegex,
        sassRegex,
        sassModuleRegex,
        svgRegex,
      ],
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[hash][ext][query]',
      },
    },

    // ** STOP ** Are you adding a new loader?
    // Make sure to add the new loader(s) before the "file" loader.
  ],
};
