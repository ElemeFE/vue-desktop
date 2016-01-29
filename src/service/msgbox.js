var CONFIRM_TEXT = '确定';
var CANCEL_TEXT = '取消';

var defaults = {
  title: '',
  message: '',
  type: '',
  showConfirmButton: true,
  showCancelButton: false,
  confirmButtonText: CONFIRM_TEXT,
  cancelButtonText: CANCEL_TEXT,
  confirmButtonClass: '',
  cancelButtonClass: ''
};

import Vue from 'vue';
import { merge } from '../util';

var MessageBoxConstructor = Vue.extend(require('./msgbox.vue'));

var currentMsg, instance;
var msgQueue = [];

var initInstance = function() {
  instance = new MessageBoxConstructor({
    el: document.createElement('div')
  });

  instance.callback = function(action) {
    var result;
    if (currentMsg) {
      var callback = currentMsg.callback;
      if (typeof callback === 'function') {
        result = callback(action);
      }
    }
    if (result !== false) {
      showNextMsg();
    } else {
      return false;
    }
  };
};

var showNextMsg = function() {
  if (!instance) {
    initInstance();
  }

  if (!instance.visible || instance.closeTimer) {
    if (msgQueue.length > 0) {
      currentMsg = msgQueue.shift();

      var oldVisible = instance.visible;
      instance.visible = false;

      var options = currentMsg.options;
      for (var prop in options) {
        if (options.hasOwnProperty(prop)) {
          instance[prop] = options[prop];
        }
      }

      instance.visible = oldVisible;

      instance.open();
    }
  }
};

var MessageBox = function(options, callback) {
  if (typeof options === 'string') {
    options = {
      title: options
    };
    if (arguments[1]) {
      options.message = arguments[1];
    }
    if (arguments[2]) {
      options.type = arguments[2];
    }
  } else if (options.callback && !callback) {
    callback = options.callback;
  }

  msgQueue.push({
    options: merge({}, defaults, MessageBox.defaults || {}, options),
    callback: callback
  });

  showNextMsg();
};

MessageBox.setDefaults = function(defaults) {
  MessageBox.defaults = defaults;
};

MessageBox.close = function() {
  instance.close();
  msgQueue = [];
  currentMsg = null;
};

export default MessageBox;
