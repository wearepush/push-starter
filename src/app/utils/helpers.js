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

export function getWindowHeight() {
  if (!executionEnvironment().canUseDOM) {
    return 0;
  }
  const w = window;
  const d = document;
  const e = d.documentElement;
  const g = d.getElementsByTagName('body')[0];
  return w.innerHeight || e.clientHeight || g.clientHeight;
}

export function getWindowWidth() {
  if (!executionEnvironment().canUseDOM) {
    return 0;
  }
  const w = window;
  const d = document;
  const e = d.documentElement;
  const g = d.getElementsByTagName('body')[0];
  return w.innerWidth || e.clientWidth || g.clientWidth;
}

export function getDeviceType() {
  if (!executionEnvironment().canUseDOM) {
    return 0;
  }
  const w = window || null;
  const d = document;
  const e = d.documentElement;
  const g = d.getElementsByTagName('body')[0];
  const witdh = w.innerWidth || e.clientWidth || g.clientWidth;
  if (witdh < 768) {
    return 'mobile';
  }
  if (witdh >= 768 && witdh < 1024) {
    return 'tablet';
  }
  return 'desktop';
}
