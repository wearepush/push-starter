/* eslint-env browser */

const cookieServer = {
  getServer(string, name) {
    const re = new RegExp(['(?:^|; )',
      name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1'), // eslint-disable-line
      '=([^;]*)'
    ].join(''));

    const matches = string.match(re);

    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
};

export default cookieServer;
