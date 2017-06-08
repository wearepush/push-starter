/* eslint-disable import/prefer-default-export */

export function getCx(className, styles) {
  const cxClassName = {};
  if (typeof className === 'object') {
    for (const key in className) { // eslint-disable-line
      if (className[key]) {
        if (styles[key]) {
          cxClassName[styles[key]] = className[key];
        }
      }
    }
  } else if (typeof className === 'string') {
    cxClassName[styles[className]] = className;
  }
  return cxClassName;
}
