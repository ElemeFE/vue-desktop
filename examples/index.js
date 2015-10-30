var Vue = require('vue');
var VueRouter = require('vue-router');
Vue.use(VueRouter);

require('../src/index');

var router = new VueRouter();

// basic
router.map({
  '/dialog': {
    component: require('./basic/dialog.vue')
  }
});

// form
router.map({
  'texteditor': {
    component: require('./form/text-editor.vue')
  },
  'select': {
    component: require('./form/select.vue')
  },
  '/radio': {
    component: require('./form/radio.vue')
  },
  '/field': {
    component: require('./form/field.vue')
  },
  '/checkbox': {
    component: require('./form/checkbox.vue')
  },
  '/datepicker': {
    component: require('./form/date-picker.vue')
  }
});

// nav
router.map({
  '/tabs': {
    component: require('./nav/tabs.vue')
  }
});

// data
router.map({
  '/grid': {
    component: require('./data/grid.vue')
  },
  '/pagination': {
    component: require('./data/pagination.vue')
  }
});

// service
router.map({
  '/msgbox': {
    component: require('./service/msgbox.vue')
  }
});

router.start(Vue.extend(require('./main.vue')), '#app');