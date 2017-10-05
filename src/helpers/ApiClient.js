import superagent from 'superagent';
import config from './../app/config';

const methods = ['get', 'post', 'put', 'patch', 'del'];
function formatUrl(path, directUrl = false) {
  if (directUrl) return path;
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  return config.apiHost + (config.apiPort ? ':' + config.apiPort : '') + adjustedPath;
}

class _ApiClient {
  constructor() { // we can get an access to req
    methods.forEach((method) => {
      this[method] = (path, {
        params,
        data,
        headers,
        attachments,
        directUrl,
        handleProgress,
        getBackRequest
      } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path, directUrl));
        if (params) {
          request.query(params);
        }

        if (!attachments) {
          request.set('Content-Type', 'application/json');
        }

        if (headers) {
          for (const header in headers) { // eslint-disable-line
            if (headers.hasOwnProperty(header)) { // eslint-disable-line
              request.set(header, headers[header]);
            }
          }
        }

        if (attachments) {
          if (attachments && typeof attachments === 'object') {
            Object.keys(attachments).forEach((c) => {
              typeof attachments[c] !== 'object' ? request.field(c, attachments[c]) : request.attach(c, attachments[c]);
            });
          }
        }

        if (data && !attachments) {
          request.send(data);
        }

        if (handleProgress) {
          request.on('progress', handleProgress);
        }

        if (getBackRequest) {
          getBackRequest(request);
        }
        request.end((err, res = {}) => {
          if (err) {
            return reject(res.body, err, request.xhr);
          }
          return resolve(res.body, request.xhr);
        });
      });
    });
  }
}

const ApiClient = _ApiClient;

export default ApiClient;
