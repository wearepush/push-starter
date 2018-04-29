/* eslint-disable */

export function fireEvent(node, eventName) {
  let doc = {};
  if (node.ownerDocument) {
    doc = node.ownerDocument;
  } else if (node.nodeType === 9) {
    doc = node;
  }
  if (node.dispatchEvent) {
    let eventClass = '';
    switch (eventName) {
      case 'click':
      case 'mousedown':
      case 'mouseup':
        eventClass = 'MouseEvents';
        break;
      case 'focus':
      case 'change':
      case 'blur':
      case 'select':
        eventClass = 'HTMLEvents';
        break;
      default:
        break;
    }
    const event = doc.createEvent(eventClass);
    event.initEvent(eventName, true, true); // All events created as bubbling and cancelable.

    event.synthetic = true; // allow detection of synthetic events
    // The second parameter says go ahead with the default action
    node.dispatchEvent(event, true);
  } else if (node.fireEvent) {
    // IE-old school style
    const event = doc.createEventObject();
    event.synthetic = true; // allow detection of synthetic events
    node.fireEvent('on' + eventName, event);
  }
}

export function executionEnvironment() {
  const canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

  return {
    canUseDOM,
    canUseWorkers: typeof Worker !== 'undefined',
    canUseEventListeners:
    canUseDOM && !!(window.addEventListener || window.attachEvent),
    canUseViewport: canUseDOM && !!window.screen
  };
}

export function loadImages(arr) {
  if (!executionEnvironment().canUseDOM) return Promise.reject(Error('no server rendering for new Image'));

  const createImg = path => {
    const img = new Image();
    img.src = path;
    img.alt = 'img';

    return new Promise(res => {
      if (img.naturalWidth) res(img);

      img.onload = () => res(img);
      img.onerror = () => res(img);
    });
  };

  return Promise.all(arr.map(c => createImg(c)));
}

export function contains(obj: Object, pred: Object) {
  return Object.keys(pred).every(key => {
    return obj.hasOwnProperty(key) && obj[key] === pred[key];
  });
}

export function findIndex(arr: Array<any>, pred: any) {
  const predType = typeof pred;
  for (let i = 0; i < arr.length; i += 1) {
    if (predType === 'function' && !!pred(arr[i], i, arr) === true) {
      return i;
    }
    if (predType === 'object' && contains(arr[i], pred)) {
      return i;
    }
    if (['string', 'number', 'boolean'].indexOf(predType) !== -1) {
      return arr.indexOf(pred);
    }
  }
  return -1;
}

export function find(arr: Array<any>, pred: any) {
  const index = findIndex(arr, pred);
  return index > -1 ? arr[index] : undefined;
}
