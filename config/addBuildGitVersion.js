const { GitRevisionPlugin } = require('git-revision-webpack-plugin');

// During Heroku builds, the SOURCE_VERSION and STACK environment variables are set:
const onHeroku = process.env.SOURCE_VERSION && process.env.STACK;

// A simple webpack plugin to get the current version and output that to
// VERSION.txt in the output tree. This is inspired by the GitRevisionPlugin,
// but it is a simplified version that can work on or off Heroku.
class VersionFilePlugin {
  constructor(opts) {
    this.options = {
      ...opts,
    };
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('VersionFilePlugin', (compilation) => {
      const asset = 'VERSION';
      const data = process.env.SOURCE_VERSION;

      compilation.hooks.assetPath.tap('VersionFilePlugin', (assetPath, chunkData) => {
        const path = typeof assetPath === 'function' ? assetPath(chunkData) : assetPath;

        if (!data) return path;
        return path;
      });

      compilation.hooks.processAssets.tap('VersionFilePlugin', (assets) => {
        assets[asset] = {
          source: function () {
            return data;
          },
          size: function () {
            return data ? data.length : 0;
          },
          buffer: function () {
            return Buffer.from(data);
          },
          map: function () {
            return {};
          },
          sourceAndMap: function () {
            return { source: data, map: {} };
          },
          updateHash: function () {},
        };
      });
    });
  }
}

export default onHeroku ? VersionFilePlugin : GitRevisionPlugin;
