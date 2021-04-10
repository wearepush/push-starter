import setupConfig from '../configuration/setup';

const PORT = setupConfig.webpackDevServer.port;

// `webpack serve` settings.
export const devServerConfig = {
  hot: true,

  // The port to serve assets on.
  port: PORT,

  publicPath: setupConfig.publicPath + '/',

  // This is just for forcing `webpack serve`
  // to not disable proxying for root path (`/`).
  index: '',

  // Uncomment if using `index.html` instead of Server-Side Rendering.
  // https://webpack.js.org/configuration/dev-server/#devserver-historyapifallback
  // historyApiFallback: true,

  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};

// Modifies webpack configuration to get all files
// from webpack development server.
export function setDevFileServer(configuration) {
  return {
    ...configuration,
    output: {
      ...configuration.output,
      publicPath: `http://localhost:${PORT}${configuration.output.publicPath}`,
    },
  };
}
