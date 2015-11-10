var domUtil = require('wind-dom');
var util = require('../util');
require('./popup-transition.css');

var PopupManager = require('./popup-manager');

var PLACEMENT_REVERSE = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
var ALIGNMENT_REVERSE = { start: 'end', end: 'start', center: 'center' };

var positionElement = require('./util').positionElement;
var isElementOutside = require('./util').isElementOutside;

var idSeed = 1;

var Vue = require('../config');

var transitions = ['pop-bounce', 'pop-fade'];

transitions.forEach((transition) => {
  Vue.transition(transition, {
    afterLeave(el) {
      var component = el.__vue__;

      if (component) {
        component.$afterClose && component.$afterClose();
      }
    }
  });
});

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      $visible: false,
      openTimer: null,
      closeTimer: null,
      popupId: null
    }
  },

  watch: {
    visible(val) {
      if (val) {
        setTimeout(() => {
          this.open();
        }, 0);
      } else {
        this.close();
      }
    }
  },

  computed: {
    popupOptions() {
      return {};
    },
    popupProps() {
      return util.merge({}, PopupManager.defaultOptions, this.popupOptions);
    }
  },

  compiled() {
    this.$initPopup();
  },

  methods: {
    getDOM() {
      if (!this.$el) {
        this.$mount();
      }

      return this.$el;
    },

    $initPopup() {
      this.popupId = 'popup-' + idSeed++;

      PopupManager.register(this.popupId, this);
    },

    $locate() {
      var popup = this;
      var dom = popup.getDOM();
      var props = this.popupProps;
      var target = props.target;
      var adjustTop = props.adjustTop || 0;
      var adjustLeft = props.adjustLeft || 0;
      var afterLocateArgs = {};

      if (target && target.nodeType) {
        var placement = props.placement;
        var alignment = props.alignment || 'center';

        var positionCache = {};

        var tryLocate = function(placement, alignment, adjustLeft, adjustTop) {
          var key = placement + ',' + alignment;
          var position = positionCache[key];

          if (!position) {
            position = positionElement(dom, target, placement, alignment);
            positionCache[key] = position;
          }

          dom.style.left = position.left + adjustLeft + 'px';
          dom.style.top = position.top + adjustTop + 'px';
        };

        tryLocate(placement, alignment, adjustLeft, adjustTop);

        var outside = isElementOutside(dom);
        var finalPlacement = placement;
        var finalAlignment = alignment;

        if (outside !== 'none') {
          var needReversePlacement = false;
          var needReverseAlignment = false;
          var reverseAdjustLeft = false;
          var reverseAdjustTop = false;

          if (outside === 'left') {
            if (placement === 'left' || placement === 'right') {
              needReversePlacement = true;
              reverseAdjustLeft = true;
            } else {
              needReverseAlignment = true;
              reverseAdjustTop = true;
            }
          } else if (outside === 'top') {
            if (placement === 'top' || placement === 'bottom') {
              needReversePlacement = true;
              reverseAdjustTop = true;
            } else {
              needReverseAlignment = true;
              reverseAdjustLeft = true;
            }
          }

          if (outside === 'both') {
            needReversePlacement = true;
            needReverseAlignment = true;
            reverseAdjustTop = true;
            reverseAdjustLeft = true;
          }

          if (needReversePlacement) {
            var reversedPlacement = PLACEMENT_REVERSE[placement];
            tryLocate(reversedPlacement, alignment, reverseAdjustLeft ? -adjustLeft : adjustLeft, reverseAdjustTop ? -adjustTop : adjustTop);
            outside = isElementOutside(dom);

            if ((placement === 'left' || placement === 'right') && outside !== 'left') {
              finalPlacement = reversedPlacement;
            } else if ((placement === 'top' || placement === 'bottom') && outside !== 'top') {
              finalPlacement = reversedPlacement;
            }
          }

          if (needReverseAlignment && outside !== 'none') {
            var reversedAlignment = ALIGNMENT_REVERSE[alignment];
            tryLocate(finalPlacement, reversedAlignment, reverseAdjustLeft ? -adjustLeft : adjustLeft, reverseAdjustTop ? -adjustTop : adjustTop);
            outside = isElementOutside(dom);

            if (outside !== 'none') {
              tryLocate(finalPlacement, alignment, reverseAdjustLeft ? -adjustLeft : adjustLeft, reverseAdjustTop ? -adjustTop : adjustTop);
            } else {
              finalAlignment = reversedAlignment;
            }
          }
        }

        afterLocateArgs = {
          placement: finalPlacement,
          alignment: finalAlignment,
          isOutside: outside !== 'none'
        };
      } else if (target instanceof Array && target.length === 2) {
        dom.style.left = target[0] + adjustLeft + 'px';
        dom.style.top = target[1] + adjustTop + 'px';
      } else if (target && target.target) {
        dom.style.left = target.pageX + adjustLeft + 'px';
        dom.style.top = target.pageY + adjustTop + 'px';
      } else if (target === 'center') {
        var selfWidth = dom.offsetWidth;
        var selfHeight = dom.offsetHeight;

        var windowWidth = window.innerWidth || document.documentElement.clientWidth;
        var windowHeight = window.innerHeight || document.documentElement.clientHeight;

        var scrollTop = Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);

        if (domUtil.getStyle(dom, 'position') === 'fixed') {
          scrollTop = 0;
        }

        dom.style.left = (windowWidth - selfWidth) / 2 + adjustLeft + 'px';
        dom.style.top = Math.max((windowHeight - selfHeight) / 2 + scrollTop + adjustTop, 0) + 'px';
      }

      popup.afterLocate && popup.afterLocate(afterLocateArgs);
    },

    $doOpen() {
      var popup = this;
      var props = this.popupProps;

      this.visible = this.$visible = true;

      var dom = popup.getDOM();

      var attach = function () {
        if (props.attachToBody) {
          document.body.appendChild(dom);
        } else {
          var target = props.target;
          if (target && target.nodeType && target.nodeName !== 'BODY') {
            target.parentNode.appendChild(dom);
          } else {
            document.body.appendChild(dom);
          }
        }
      };

      var modal = props.modal;
      if (modal) {
        PopupManager.openModal(this.popupId, PopupManager.nextZIndex());
      }

      if (!dom) {
        dom = popup.getDOM();
        attach();
      } else if (!dom.parentNode || dom.parentNode.nodeType === 11) { //detached element's parentNode is a DocumentFragment in IE8
        attach();
      }

      dom.style.visibility = 'hidden';
      dom.style.display = '';

      if (domUtil.getStyle(dom, 'position') === 'static') {
        domUtil.setStyle(dom, 'position', 'absolute');
      }

      popup.$locate();

      var zIndex = props.zIndex;
      if (modal) {
        dom.style.zIndex = PopupManager.nextZIndex();
      } else if (zIndex) {
        dom.style.zIndex = zIndex;
      }

      dom.style.visibility = '';

      popup.onOpen && popup.onOpen();
    },

    $afterClose() {
      var dom = this.getDOM();

      dom.style.display = 'none';
      dom.style.left = dom.style.top = '';

      var props = this.popupProps;

      if (props.modal) {
        PopupManager.closeModal(this.popupId);
      }

      if (props.detachAfterHide) {
        dom.parentNode && dom.parentNode.removeChild(dom);
      }
    },

    $doClose() {
      var popup = this;
      this.visible = this.$visible = false;

      popup.onClose && popup.onClose();

      var dom = popup.getDOM();
      var props = this.popupProps;

      if (dom) {
        var animation = props.animation;
        if (animation === false) {
          popup.$afterClose();
        }
      }
    },

    open() {
      var props = this.popupProps;

      var popup = this;

      if (popup.willOpen && !popup.willOpen()) return;

      if (this.closeTimer) {
        clearTimeout(this.closeTimer);
        this.closeTimer = null;
      }

      if (this.$visible) return;

      clearTimeout(this.openTimer);

      var openDelay = Number(props.openDelay);

      if (openDelay > 0) {
        this.openTimer = setTimeout(() => {
          this.openTimer = null;
          this.$doOpen();
        }, openDelay);
      } else {
        this.$doOpen();
      }
    },

    close() {
      var popup = this;

      if (popup.willClose && !popup.willClose()) return;

      if (this.openTimer !== null) {
        clearTimeout(this.openTimer);
        this.openTimer = null;
      }

      if (!this.$visible) return;

      clearTimeout(this.closeTimer);
      var props = this.popupProps;
      var closeDelay = props.closeDelay;

      if (Number(closeDelay) > 0) {
        this.closeTimer = setTimeout(() => {
          this.closeTimer = null;
          popup.$doClose();
        }, closeDelay);
      } else {
        popup.$doClose();
      }
    }
  }
};
