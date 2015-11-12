var Vue = require('vue');
var VueRouter = require('vue-router');
Vue.use(VueRouter);

var initComponents = require('../src/index').initComponents;
initComponents(Vue);

var router = new VueRouter();

// basic
router.map({
  '/dialog': {
    component: require('./basic/dialog.vue')
  },
  '/icon': {
    component: require('./basic/icon.vue')
  },
  '/button': {
    component: require('./basic/button.vue')
  },
  '/progress-bar': {
    component: require('./basic/progress-bar.vue')
  },
  '/alert': {
    component: require('./basic/alert.vue')
  },
  '/slider': {
    component: require('./basic/slider.vue')
  },
  '/sticky': {
    component: require('./basic/sticky.vue')
  },
  '/dropdown': {
    component: require('./basic/dropdown.vue')
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
  },
  '/accordion': {
    component: require('./nav/accordion.vue')
  }
});

// data
router.map({
  '/grid': {
    component: require('./data/grid.vue')
  },
  '/grid-form': {
    component: require('./data/grid-form.vue')
  },
  '/pagination': {
    component: require('./data/pagination.vue')
  }
});

// service
router.map({
  '/msgbox': {
    component: require('./service/msgbox.vue')
  },
  '/notification': {
    component: require('./service/notification.vue')
  },
  '/tooltip': {
    component: require('./service/tooltip.vue')
  }
});

router.start(Vue.extend({
  components: {
    app: require('./app.vue')
  }
}), 'body');