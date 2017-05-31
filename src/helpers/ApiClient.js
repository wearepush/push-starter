import superagent from 'superagent';
import cookie from 'react-cookie';
import config from '../app/config';
import cookieServer from '../utils/cookie';

const methods = ['get', 'post', 'put', 'patch', 'del'];
function formatUrl(path, directUrl = false) {
  if (directUrl) return path;
  const adjustedPath = path[0] !== '/' ? `/${path}` : path; // eslint-disable-line
  return 'http' + (config.apiSSL ? 's' : '') + '://' + config.apiHost + (config.apiPort ? ':' + config.apiPort : '') + adjustedPath;  // eslint-disable-line
}

class _ApiClient {
  constructor(req) {
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

        if (__SERVER__) {
          const serverCookies = req.get('cookie');
          if (serverCookies) {
            const token = cookieServer.getServer(serverCookies, config.apiTokenKey);
            if (token) {
              request.set('Authorization', `Bearer ${token}`);
            }
          }
        } else if (__CLIENT__) {
          const token = cookie.load(config.apiTokenKey);
          if (token) {
            request.set('Authorization', `Bearer ${token}`);
          }
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
              typeof attachments[c] !== 'object' ? request.field(c, attachments[c]) : request.attach(c, attachments[c]); // eslint-disable-line
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
