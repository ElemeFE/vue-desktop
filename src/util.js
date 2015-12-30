const dateUtil = require('fecha');

export function merge(target) {
  for (var i = 1, j = arguments.length; i < j; i++) {
    var source = arguments[i];
    for (var prop in source) {
      if (source.hasOwnProperty(prop)) {
        var value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }

  return target;
}

export function formatDate(date, format) {
  if (!(date instanceof Date)) return '';
  return dateUtil.format(date, format || 'YYYY-MM-DD');
}

export function parseDate(string, format) {
  return dateUtil.parse(string, format || 'YYYY-MM-DD');
}

export function debounce(fn, delay) {
  var timer;

  return function() {
    var context = this;
    var args = arguments;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(function() {
      fn.apply(context, args);
      timer = null;
    }, delay);
  };
}

export function throttle(fn, delay) {
  var now, lastExec, timer, context, args;

  var execute = function () {
    fn.apply(context, args);
    lastExec = now;
  };

  return function() {
    context = this;
    args = arguments;

    now = Date.now();

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    if (!lastExec) {
      execute();
    } else {
      var diff = delay - (now - lastExec);
      if (diff < 0) {
        execute();
      } else {
        timer = setTimeout(function() {
          execute();
        }, diff);
      }
    }
  };
}

var scrollbarWidth;

export function getScrollbarWidth() {
  if (scrollbarWidth !== undefined) return scrollbarWidth;

  var outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.width = '100px';
  outer.style.position = 'absolute';
  outer.style.top = '-9999px';
  document.body.appendChild(outer);

  var widthNoScroll = outer.offsetWidth;
  outer.style.overflow = 'scroll';

  var inner = document.createElement('div');
  inner.style.width = '100%';
  outer.appendChild(inner);

  var widthWithScroll = inner.offsetWidth;
  outer.parentNode.removeChild(outer);

  return widthNoScroll - widthWithScroll;
}