var domUtil = require('wind-dom');
var transition = require('./transition');

var transitionProperty = transition.prefix + 'transition';
var transformProperty = transition.prefix + 'transform';

module.exports = {
  'fade': {
    duration: 200,
    open: function(popup) {
      var dom = popup.getDOM();
      domUtil.setStyle(dom, 'opacity', 0);

      dom.style.visibility = '';

      setTimeout(function() {
        domUtil.once(dom, transition.event, function() {
          domUtil.setStyle(dom, transitionProperty, '');
          domUtil.setStyle(dom, 'opacity', '');
        });
        domUtil.setStyle(dom, transitionProperty, 'opacity 200ms linear');
        domUtil.setStyle(dom, 'opacity', 1);
      }, 10);
    },
    close: function(popup, afterClose) {
      var dom = popup.getDOM();
      domUtil.setStyle(dom, 'opacity', 1);

      setTimeout(function() {
        domUtil.once(dom, transition.event, function() {
          afterClose.call(popup);
          domUtil.setStyle(dom, transitionProperty, '');
          domUtil.setStyle(dom, 'opacity', '');
        });
        domUtil.setStyle(dom, transitionProperty, 'opacity 200ms linear');
        domUtil.setStyle(dom, 'opacity', 0);
      }, 10);
    }
  },
  'pop': {
    duration: 200,
    open: function(popup) {
      var dom = popup.getDOM();
      domUtil.setStyle(dom, transformProperty, 'scale(0.8)');

      dom.style.visibility = '';

      setTimeout(function() {
        domUtil.once(dom, transition.event, function() {
          domUtil.setStyle(dom, transitionProperty, '');
          domUtil.setStyle(dom, transformProperty, '');
        });
        domUtil.setStyle(dom, transitionProperty, transformProperty + ' 200ms cubic-bezier(0.3, 0, 0, 1.5)');
        domUtil.setStyle(dom, transformProperty, 'none');
      }, 10);
    },
    close: function(popup, afterClose) {
      var dom = popup.getDOM();
      domUtil.setStyle(dom, transformProperty, 'none');

      setTimeout(function() {
        domUtil.once(dom, transition.event, function() {
          afterClose.call(popup);
          domUtil.setStyle(dom, transitionProperty, '');
          domUtil.setStyle(dom, transformProperty, '');
        });
        domUtil.setStyle(dom, transitionProperty, transformProperty + ' 200ms cubic-bezier(0.3, 0, 0, 1.5)');
        domUtil.setStyle(dom, transformProperty, 'scale(0.8)');
      }, 10);
    }
  }
};