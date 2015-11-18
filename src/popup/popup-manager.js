var instances = {};
var animations = {};

var domUtil = require('wind-dom');

var getModal = function() {
  var modalDom = PopupManager.modalDom;
  if (!modalDom) {
    modalDom = document.createElement('div');
    PopupManager.modalDom = modalDom;

    domUtil.on(modalDom, 'click', function() {
      PopupManager.doOnModalClick && PopupManager.doOnModalClick();
    });
  }

  return modalDom;
};

var PopupManager = {
  zIndex: 1000,

  defaultOptions: {
    openDelay: 0,
    closeDelay: 0,

    placement: 'top',
    alignment: 'center',

    //TODO Remove
    attachToBody: false,
    detachAfterHide: false,

    target: null,

    adjustLeft: 0,
    adjustTop: 0,

    animation: true,

    modal: false,
    zIndex: null,

    closeOnPressEscape: false,
    closeOnClickModal: false,

    updatePositionOnResize: true
  },

  getInstance: function(id) {
    return instances[id];
  },

  register: function(id, instance) {
    if (id && instance) {
      instances[id] = instance;
    }
  },

  deregister: function(id) {
    if (id) {
      instances[id] = null;
      delete instances[id];
    }
  },

  registerAnimation: function(name, config) {
    animations[name] = config;
  },

  getAnimation: function(name) {
    return animations[name];
  },

  nextZIndex: function() {
    return PopupManager.zIndex++;
  },

  modalStack: [],

  doOnModalClick: function() {
    var topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1];
    if (!topItem) return;

    var instance = PopupManager.getInstance(topItem.id);
    if (instance && instance.popupProps && instance.popupProps.closeOnClickModal) {
      instance.close();
    }
  },

  openModal: function(id, zIndex, modalClass) {
    if (!id || zIndex === undefined) return;

    var modalDom = getModal();

    domUtil.addClass(modalDom, 'd-modal modal-enter');
    if (modalClass) {
      domUtil.addClass(modalDom, modalClass);
    }

    setTimeout(() => {
      domUtil.removeClass(modalDom, 'modal-enter');
    }, 300);

    if (!modalDom.parentNode || modalDom.parentNode.nodeType === 11) {
      document.body.appendChild(modalDom);
    }

    if (zIndex) {
      modalDom.style.zIndex = zIndex;
    }
    modalDom.style.display = '';

    this.modalStack.push({ id: id, zIndex: zIndex, modalClass: modalClass });
  },

  closeModal: function(id) {
    var modalStack = this.modalStack;
    var modalDom = getModal();

    if (modalStack.length > 0) {
      var topItem = modalStack[modalStack.length - 1];
      if (topItem.id === id) {
        domUtil.removeClass(modalDom, topItem.modalClass);
        modalStack.pop();
        if (modalStack.length > 0) {
          modalDom.style.zIndex = modalStack[modalStack.length - 1].zIndex;
        }
      } else {
        for (var i = modalStack.length - 1; i >= 0; i--) {
          if (modalStack[i].id === id) {
            modalStack.splice(i, 1);
            break;
          }
        }
      }
    }

    if (modalStack.length === 0) {
      if (modalDom.parentNode) modalDom.parentNode.removeChild(modalDom);

      modalDom.style.display = 'none';
    }
  }
};

domUtil.on(window, 'keydown', function(event) {
  if (event.keyCode === 27) { // ESC
    if (PopupManager.modalStack.length > 0) {
      var topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1];
      if (!topItem) return;
      var instance = PopupManager.getInstance(topItem.id);
      var options = instance.popupProps;
      if (options.closeOnPressEscape) {
        instance.close();
      }
    }
  }
});

domUtil.on(window, 'resize', function() {
  for (var id in instances) {
    if (instances.hasOwnProperty(id)) {
      var instance = PopupManager.getInstance(id);
      var options = instance.popupProps;
      if (instance.visible && options.updatePositionOnResize) {
        instance.$locate();
      }
    }
  }
});

module.exports = PopupManager;
