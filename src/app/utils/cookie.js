import { executionEnvironment } from 'utils/helpers';

/* eslint-disable */

export function  getCookieServer(string, name) {
  const re = new RegExp(['(?:^|; )',
    name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1'), // eslint-disable-line
    '=([^;]*)'
  ].join(''));

  const matches = string.match(re);

  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// https://learn.javascript.ru/cookie#функция-getcookie-name
export function getCookie(name) {
  if (!executionEnvironment().canUseDOM) return;

  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// https://learn.javascript.ru/cookie#функция-setcookie-name-value-options
export function setCookie(name, value, options) {
  if (!executionEnvironment().canUseDOM) return;

  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

// https://learn.javascript.ru/cookie#функция-deletecookie-name
export function deleteCookie(name) {
  setCookie(name, "", {
    expires: -1
  })
}
/* eslint-enable */
