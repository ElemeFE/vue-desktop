import { default as Vue } from '../config';
var NotificationConstructor = Vue.extend(require('./notification.vue'));

var instance;
var instances = [];
var seed = 1;

var Notification = function(options) {

  options = options || {};
  var userOnClose = options.callback;
  var id = 'notification_' + seed++;

  options.callback = function() {
    Notification.close(id, userOnClose);
  };

  instance = new NotificationConstructor({
    data: options
  });
  instance.id = id;
  instance.vm = instance.$mount();
  instance.vm.$appendTo('body');
  instance.dom = instance.vm.$el;

  var topDist = 0;
  for (var i = 0, len = instances.length; i < len; i++) {
    topDist += instances[i].$el.offsetHeight + 10;
  }
  topDist += 10;
  instance.top = topDist;
  instances.push(instance);
};

Notification.close = function(id, userOnClose) {
  for (var i = 0, len = instances.length; i < len; i++) {
    if (id === instances[i].id) {
      if (typeof userOnClose === 'function') {
        userOnClose(instances[i]);
      }
      var index = i;
      var removedHeight = instances[i].dom.offsetHeight;
      instances.splice(i, 1);
      break;
    }
  }

  if (len > 1) {
    for (i = index; i < len -1 ; i++) {
      instances[i].dom.style.top = parseInt(instances[i].dom.style.top) - removedHeight - 10 + 'px';
    }
  }
};

export default Notification;