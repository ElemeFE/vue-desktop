var prefixMap = {
  'MozTransition': {
    prefix: '-moz-',
    event: 'transitionend'
  },
  'oTransition': {
    prefix:'-o-',
    event: 'oTransitionEnd'
  },
  'webkitTransition': {
    prefix: '-webkit-',
    event: 'webkitTransitionEnd'
  }
};

var testEl = document.body ? document.body : document.createElement('div');

var result;

for (var prop in prefixMap) {
  if (prefixMap.hasOwnProperty(prop)) {
    if (prop in testEl.style) {
      result = prefixMap[prop];

      break;
    }
  }
}

if (result === undefined) {
  result = {
    support: false
  };
} else {
  result.support = true;
}

module.exports = result;