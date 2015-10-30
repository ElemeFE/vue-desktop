module.exports = {
  merge: function(target) {
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
  },

  debounce: function(fn, delay) {
    var timer;

    return function() {
      var context = this, args = arguments;
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      timer = setTimeout(function() {
        fn.apply(context, args);
        timer = null;
      }, delay);
    };
  },

  throttle: function(fn, delay) {
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
};