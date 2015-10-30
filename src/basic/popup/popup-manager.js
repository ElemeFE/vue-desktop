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

    attachToBody: false,
    detachAfterHide: true,

    target: null,

    adjustLeft: 0,
    adjustTop: 0,

    animation: false,
    openAnimation: undefined,
    closeAnimation: undefined,

    modal: false,
    zIndex: null,

    closeOnPressEscape: false,
    closeOnClickModal: false,

    updatePositionOnResize: false
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
    if (instance.getPopupOptions()['closeOnClickModal']) {
      instance.close();
    }
  },

  openModal: function(id, zIndex) {
    if (!id || zIndex === undefined) return;

    var modalDom = getModal();

    var style = {
      position: 'fixed',
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      opacity: '0.5',
      background: '#000'
    };

    domUtil.setStyle(modalDom, style);

    if (!modalDom.parentNode || modalDom.parentNode.nodeType === 11) {
      document.body.appendChild(modalDom);
    }

    if (zIndex) {
      modalDom.style.zIndex = zIndex;
    }
    modalDom.style.display = '';

    this.modalStack.push({ id: id, zIndex: zIndex });
  },

  closeModal: function(id) {
    var modalStack = this.modalStack;
    var modalDom = getModal();

    if (modalStack.length > 0) {
      var topItem = modalStack[modalStack.length - 1];
      if (topItem.id === id) {
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
      modalDom.style.display = 'none';

      modalDom.parentNode.removeChild(modalDom);
    }
  }
};

var supportAnimations = require('./animation');

for (var prop in supportAnimations) {
  if (supportAnimations.hasOwnProperty(prop)) {
    PopupManager.registerAnimation(prop, supportAnimations[prop]);
  }
}

domUtil.on(window, 'keydown', function(event) {
  if (event.keyCode === 27) { // ESC
    if (PopupManager.modalStack.length > 0) {
      var topItem = PopupManager.modalStack[PopupManager.modalStack.length - 1];
      if (!topItem) return;
      var instance = PopupManager.getInstance(topItem.id);
      var options = instance.getPopupOptions();
      if (options['closeOnPressEscape']) {
        instance.close();
      }
    }
  }
});

domUtil.on(window, 'resize', function() {
  for (var id in instances) {
    if (instances.hasOwnProperty(id)) {
      var instance = PopupManager.getInstance(id);
      var options = instance.getPopupOptions();
      if (instance.visible && options['updatePositionOnResize']) {
        instance.locate();
      }
    }
  }
});

module.exports = PopupManager;
