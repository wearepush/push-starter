import axios from 'axios';
import config from '../config';

if (config.env === 'test') {
  const httpAdapter = require('axios/lib/adapters/http');
  axios.defaults.host = config.testHost;
  axios.defaults.adapter = httpAdapter; // eslint-disable-line
}

const methods = ['get', 'post', 'put', 'patch', 'delete'];
function formatUrl(path, directUrl = false) {
  if (directUrl) return path;
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  if (path.indexOf('http') === 0) {
    return path;
  }
  return config.apiHost + adjustedPath;
}

class _ApiClient {
  constructor() {
    // we can get an access to req
    methods.forEach((method) => {
      this[method] = (path, { data, attachments, directUrl, handleProgress, ...rest } = {}) => {
        /**
         * params,
         * headers,
         * cancelToken,
         * timeout
         */
        const requestConfig = {
          method,
          url: formatUrl(path, directUrl),
          ...rest,
        };

        if (attachments) {
          if (attachments && typeof attachments === 'object') {
            const _data = new FormData();
            Object.keys(attachments).forEach((c) => {
              _data.append(c, attachments[c]);
            });
            requestConfig.data = _data;
          }
        }

        if (data && !attachments) {
          requestConfig.data = { ...data };
        }

        if (handleProgress) {
          requestConfig.onUploadProgress = handleProgress;
        }

        return axios(requestConfig);
      };
    });
  }
}

const ApiClient = _ApiClient;

export default ApiClient;
