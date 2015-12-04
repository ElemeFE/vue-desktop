var Vue = require('vue');
var i18n = require('vue-i18n');

import { default as locales } from './locales/index';

Vue.use(i18n, {
  lang: 'zh',
  locales: locales
});

Vue.transition('d-collapse', {
  beforeEnter: function (el) {
    el.style.height = '0';
  },
  enter: function (el) {
    el.style.display = 'block';
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px';
    } else {
      el.style.height = '';
    }
  },
  afterEnter: function(el) {
    el.style.display = '';
    el.style.height = '';
  },
  beforeLeave: function (el) {
    el.style.display = 'block';
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px';
    }
  },
  leave: function (el) {
    if (el.scrollHeight !== 0) {
      setTimeout(() => el.style.height = '0');
    }
  },
  afterLeave: function (el) {
    el.style.display = '';
    el.style.height = '';
  }
});

export default Vue;