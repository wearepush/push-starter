import fs from 'fs-extra';
import path from 'path';

export default class AddSriToChunks {
  constructor(opts) {
    this.options = {
      filename: 'webpack-chunks.json',
      ...opts,
    };
  }

  apply(compiler) {
    const getAssetsWithSRI = (stats, jsonStats) => {
      jsonStats =
        jsonStats ||
        stats.toJson({
          context: process.cwd(),
          chunkModules: true,
        });
      const publicPath = jsonStats.publicPath;
      const assets = jsonStats.assetsByChunkName;
      const _assetsKeys = Object.keys(assets);
      let result = {
        styles: {},
        javascript: {},
      };
      const addToResult = (filename, chunk) => {
        const asset = jsonStats.assets.find((c) => c.name === filename);
        const fileObject = {
          src: `${publicPath}${filename}`,
          integrity: asset.integrity,
        };
        if (/\.js?$/.test(filename)) {
          result.javascript[chunk] = fileObject;
        } else if (/\.css$/.test(filename)) {
          result.styles[chunk] = fileObject;
        }
      };
      for (let i = 0; i < _assetsKeys.length; i++) {
        const currentChunk = _assetsKeys[i];
        const currentAssets = assets[currentChunk];
        if (currentAssets) {
          if (currentAssets instanceof Array) {
            const _js = currentAssets.find((c) => /\.js?$/.test(c));
            const _css = currentAssets.find((c) => /\.css?$/.test(c));
            if (_js) {
              addToResult(_js, currentChunk);
            }
            if (_css) {
              addToResult(_css, currentChunk);
            }
          } else if (typeof currentAssets === 'string') {
            addToResult(currentAssets, currentChunk);
          }
        }
      }
      return result;
    };

    const onDone = (stats) => {
      const jsonStats = stats.toJson({
        context: process.cwd(),
        chunkModules: true,
      });
      const assetsJsonFile = JSON.stringify(getAssetsWithSRI(stats, jsonStats));
      fs.outputFileSync(path.join(jsonStats.outputPath, this.options.filename), assetsJsonFile);
    };

    if (compiler.hooks) {
      compiler.hooks.done.tap('AddSriToChunks', onDone);
    } else {
      compiler.plugin('done', onDone);
    }
  }
}
