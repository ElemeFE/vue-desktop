var bindEvent = require('wind-dom').on;
var unbindEvent = require('wind-dom').off;

export default {
  props: {
    target: {},
    trigger: {
      type: String,
      default: 'mouseenter'
    }
  },

  beforeDestroy() {
    this.unbindTarget();
  },

  methods: {
    bindTarget: function() {
      var popover = this;
      var target = this.target;
      if (!target) return;

      var trigger = this.trigger;

      if (trigger === 'click') {
        var toggle = () => {
          if (popover.visible) {
            popover.close();
          } else {
            popover.open({
              target: target,
              placement: this.placement
            });
          }
        };
        popover.toggleListener = toggle;

        bindEvent(target, 'click', toggle);
      } else {
        var open = () => {
          popover.open({
            target: target,
            placement: this.placement
          });
        };
        var close = () => {
          popover.close();
        };
        popover.openListener = open;
        popover.closeListener = close;

        if (trigger === 'mouseenter') {
          bindEvent(target, 'mouseenter', open);
          bindEvent(target, 'mouseleave', close);
        } else if (trigger === 'focus') {
          bindEvent(target, 'focus', open);
          bindEvent(target, 'blur', close);
        }
      }
    },
    unbindTarget: function() {
      var popover = this;
      var target = popover.get('target');
      if (!target) return;

      var trigger = popover.get('trigger');

      if (trigger === 'click') {
        var toggle = popover.toggleListener;
        if (toggle) {
          bindEvent(target, 'click', toggle);
        }
      } else {
        var open = popover.openListener;
        var close = popover.closeListener;
        if (!open) return;

        if (trigger === 'mouseenter') {
          unbindEvent(target, 'mouseenter', open);
          unbindEvent(target, 'mouseleave', close);
        } else if (trigger === 'focus') {
          unbindEvent(target, 'focus', open);
          unbindEvent(target, 'blur', close);
        }
      }
    }
  }
};
