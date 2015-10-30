require('./msgbox.css');

var Popup = require('../../basic/popup');
var util = require('../../util');

var template = require('./msgbox.html');

var CONFIRM_TEXT = '确定';
var CANCEL_TEXT = '取消';

var STATUS_CLASS_MAP = {
  '': '',
  success: 'icon-msgbox-success',
  warning: 'icon-msgbox-warning',
  error: 'icon-msgbox-error'
};

var CONFIRM_BUTTON_CLASS = 'btn btn-primary btn-lg msgbox-confirm';

var Vue = require('vue');

var MessageBoxConstructor = Vue.extend({
  template: template,
  methods: {
    getDOM: function() {
      if (!this.dom) {
        this.$mount();

        this.dom = this.$el;
      }

      return this.dom;
    },
    getPopupOptions: function() {
      return {
        target: 'center',
        modal: true,
        updatePositionOnResize: true,
        openAnimation: 'pop',
        closeDelay: 1,
        closeOnPressEscape: true,
        closeOnClickModal: true
      };
    },
    handleAction(action) {
      var callback = this.callback;
      this.close();
      callback(action);
    }
  },

  data() {
    return {
      title: '',
      message: '',
      type: '',
      showConfirmButton: true,
      showCancelButton: false,
      confirmButtonText: CONFIRM_TEXT,
      cancelButtonText: CANCEL_TEXT,
      confirmButtonClass: '',
      confirmButtonDisabled: false,
      cancelButtonClass: '',

      callback: null
    };
  }
});

var defaults = {
  title: '',
  message: '',
  type: 'success',
  showConfirmButton: true,
  showCancelButton: false,
  confirmButtonText: CONFIRM_TEXT,
  cancelButtonText: CANCEL_TEXT,
  confirmButtonClass: '',
  cancelButtonClass: '',
  buttons: null
};

var instance = new MessageBoxConstructor({});
Popup(instance);

var currentMsg = null;
var msgQueue = [];

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

var showNextMsg = function() {
  if (!instance.visible || instance.closeTimer) {
    if (msgQueue.length > 0) {
      currentMsg = msgQueue.shift();

      var oldVisible = instance.visible;
      instance.visible = false;

      var options = currentMsg.options;
      for (var prop in options) {
        instance[prop] = options[prop];
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
    options: util.merge({}, defaults, MessageBox.defaults || {}, options),
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
