var domUtil = require('wind-dom');
var util = require('../../util');
var transition = require('./transition');

var PopupManager = require('./popup-manager');

var PLACEMENT_REVERSE = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
var ALIGNMENT_REVERSE = { start: 'end', end: 'start', center: 'center' };

var idSeed = 1;

module.exports = function(target) {
  if (!target) return;

  var positionElement = require('./util').positionElement;
  var isElementOutside = require('./util').isElementOutside;

  var popupId, visible, openTimer, closeTimer, props, inited;

  var initPopup = function(options) {
    popupId = 'popup-' + idSeed++;

    PopupManager.register(popupId, this);

    visible = false;
    openTimer = null;
    closeTimer = null;
    props = util.merge({}, PopupManager.defaultOptions, this.getPopupOptions && this.getPopupOptions(), options);
  };

  var locate = function() {
    var popup = this;
    var dom = popup.getDOM();
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
  };

  var doOpen = function() {
    var popup = this;

    visible = true;

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
      PopupManager.openModal(popupId, PopupManager.nextZIndex());
    }

    if (!dom) {
      dom = popup.getDOM();
      attach();
      popup.refresh();
    } else if (!dom.parentNode || dom.parentNode.nodeType === 11) { //detached element's parentNode is a DocumentFragment in IE8
      attach();
    }

    dom.style.visibility = 'hidden';
    dom.style.display = '';

    if (domUtil.getStyle(dom, 'position') === 'static') {
      domUtil.setStyle(dom, 'position', 'absolute');
    }

    locate.call(popup);

    var zIndex = props.zIndex;
    if (modal) {
      dom.style.zIndex = PopupManager.nextZIndex();
    } else if (zIndex) {
      dom.style.zIndex = zIndex;
    }

    var animation = props.animation;
    var openAnimation = props.openAnimation;
    if (openAnimation === undefined) {
      openAnimation = animation;
    }

    if (transition.support && openAnimation !== false) {
      var config = PopupManager.getAnimation(openAnimation);
      if (config && config.open) {
        config.open.apply(null, [popup]);
      }
    }

    dom.style.visibility = '';

    popup.onOpen && popup.onOpen();
  };

  var afterClose = function() {
    var dom = this.getDOM();
    dom.style.display = 'none';
    dom.style.left = dom.style.top = '';

    if (props.modal) {
      PopupManager.closeModal(popupId);
    }

    if (props.detachAfterHide) {
      dom.parentNode && dom.parentNode.removeChild(dom);
    }
  };

  var doClose = function() {
    var popup = this;
    visible = false;

    popup.onClose && popup.onClose();

    var dom = popup.getDOM();
    if (dom) {
      var animation = props.animation;
      var closeAnimation = props.closeAnimation;
      if (closeAnimation === undefined) {
        closeAnimation = animation;
      }
      if (transition.support && closeAnimation !== false) {
        var config = PopupManager.getAnimation(closeAnimation);
        if (config && config.close) {
          config.close.apply(null, [popup, afterClose]);
        }
      } else {
        afterClose.call(popup);
      }
    }
  };

  //var destroyPopup = function() {
  //  var dom = this.getDOM();
  //  if (dom && dom.parentNode) {
  //    dom.parentNode.removeChild(dom);
  //  }
  //  PopupManager.deregister(popupId);
  //};

  var Popup = {
    open: function(options) {
      if (!inited) {
        initPopup.call(this, options);
        inited = true;
      } else {
        props = util.merge({}, PopupManager.defaultOptions, this.getPopupOptions && this.getPopupOptions(), options);
      }

      var popup = this;

      if (popup.willOpen && !popup.willOpen()) return;

      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }

      if (visible) return;

      clearTimeout(openTimer);

      var openDelay = Number(props.openDelay);

      if (openDelay > 0) {
        openTimer = setTimeout(function() {
          openTimer = null;
          doOpen.call(popup);
        }, openDelay);
      } else {
        doOpen.call(popup);
      }
    },

    close: function() {
      var popup = this;

      if (popup.willClose && !popup.willClose()) return;

      if (openTimer !== null) {
        clearTimeout(openTimer);
        openTimer = null;
      }

      if (!visible) return;

      clearTimeout(closeTimer);

      var closeDelay = props.closeDelay;

      if (Number(closeDelay) > 0) {
        closeTimer = setTimeout(function() {
          closeTimer = null;
          doClose.call(popup);
        }, closeDelay);
      } else {
        doClose.call(popup);
      }
    }
  };

  for (var prop in Popup) {
    if (Popup.hasOwnProperty(prop)) {
      target[prop] = Popup[prop];
    }
  }
};
