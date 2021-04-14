import axios from 'axios';

if (process.env.NODE_ENV === 'test') {
  const httpAdapter = require('axios/lib/adapters/http');
  axios.defaults.adapter = httpAdapter; // eslint-disable-line
}

const methods = ['get', 'post', 'put', 'patch', 'delete'];
function formatUrl(path, directUrl = false) {
  if (directUrl) return path;
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  if (path.indexOf('http') === 0) {
    return path;
  }
  return adjustedPath;
}

class _ApiClient {
  constructor(props) {
    // we can get an access to req
    methods.forEach((method) => {
      this[method] = (path, { data, attachments, directUrl, handleProgress, ...rest } = {}) => {
        /**
         * params,
         * headers,
         * cancelToken,
         * timeout
         */
        // compute base url to resolve an issue with request on the nodejs
        let baseURL;
        if (props?.host) {
          baseURL = 'http';
          if (props?.ssl) {
            baseURL += 's';
          }
          baseURL += `://${props.host}`;
          if (props?.port) {
            baseURL += `:${props.port}`;
          }
        }
        const requestConfig = {
          baseURL,
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
