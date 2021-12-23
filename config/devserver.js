import { env } from './consts';
const port = env.raw.WDS_SOCKET_PORT;
const host = env.raw.WDS_SOCKET_HOST;

// `webpack serve` settings.
export const devServerConfig = {
  liveReload: false,

  // The port to serve assets on.
  port,

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
      publicPath: `http://${host}:${port}${configuration.output.publicPath}`,
    },
  };
}
