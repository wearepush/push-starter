/* eslint-disable */

export function isServer() {
  return typeof window === 'undefined';
}

export function loadImages(arr) {
  if (isServer()) {
    return Promise.reject(Error('no server rendering for new Image'));
  }

  const createImg = (path) => {
    const img = new Image();
    img.src = path;
    img.alt = 'img';

    return new Promise((res) => {
      if (img.naturalWidth) res(img);

      img.onload = () => res(img);
      img.onerror = () => res(img);
    });
  };

  return Promise.all(arr.map((c) => createImg(c)));
}

/**
 * Returns data from nested object-like structure
 * @param {object|array} obj - object-like to get data from
 * @param {string|array} path - path to get data
 * @param {string} separator - serapator for data if path is passed as string
 * @example getIn(data, 'user.profile.name');
 * @example getIn(data, 'user/profile/name', '/');
 * @example getIn(data, ['user', 'profile', 'name']);
 */
export function getIn(obj = {}, path, separator = '.') {
  const paths = path.constructor === Array ? path : path.split(separator);
  const pathsLength = paths.length;
  let resultData = obj;

  // for-loop is much faster than something like the reduce:
  // paths.reduce((p, c) => p && p[c], obj);

  for (let i = 0; i < pathsLength; i++) {
    const c = paths[i];
    const curData = resultData[c];
    if (!curData) return curData;

    resultData = curData;
  }

  return resultData;
}

/**
 * Debouncing enforces that a function not be called again until a certain amount
 * of time has passed without it being called. As in "execute this function only
 * if 100 milliseconds have passed without it being called."
 * @param {function} f - function that will be called
 * @param {number} ms - timeout in ms
 * @returns {Function}
 * https://learn.javascript.ru/task/debounce
 */
export function debounce(f, ms) {
  let timer = null;

  return function (...args) {
    const onComplete = () => {
      f.apply(this, args);
      timer = null;
    };

    clearTimeout(timer);
    timer = setTimeout(onComplete, ms);
  };
}

/**
 * Throttling enforces a maximum number of times a function can be called
 * over time. As in "execute this function at most once every 100 milliseconds."
 * @param {function} func - function that will be called
 * @param {number} ms - delay in ms
 * @returns {Function}
 * https://learn.javascript.ru/task/throttle
 */
export function throttle(func, ms) {
  var isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {
    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(function () {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  wrapper.immediateStop = function () {
    savedArgs = savedThis = null;
  };

  return wrapper;
}
/* eslint-enable */
