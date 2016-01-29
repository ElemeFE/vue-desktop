import Vue from 'vue';
var LoadingMask = Vue.extend(require('./loading-mask.vue'));

var instance;
var service = {
  open() {
    if (!instance) {
      instance = new LoadingMask({
        el: document.createElement('div')
      });
    }
    Vue.nextTick(() => {
      instance.open();
    });
  },

  close() {
    if (instance) {
      Vue.nextTick(() => {
        instance.close();
      });
    }
  }
};

Vue.directive('action', {
  bind() {
    var el = this.el;
    el.addEventListener('click', () => {
      var result = this.vm.$get(this.expression);
      if (result && result.then) {
        service.open();
        result.catch(() => void 0).then(() => {
          service.close();
        });
      }
    }, false);
  }
});

export default service;
