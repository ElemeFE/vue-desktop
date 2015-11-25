var Vue = require('vue');
var VueRouter = require('vue-router');
Vue.use(VueRouter);

require('./markdown.css');
require('./markdown');
require('highlight.js/styles/agate.css');

var initComponents = require('../src/index').initComponents;
initComponents(Vue);

var router = new VueRouter();

// basic
router.map({
  '/dialog': {
    component: require('./basic/dialog.vue')
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
  },
  '/navmenu': {
    component: require('./basic/nav-menu.vue')
  }
});

// form
router.map({
  '/validation': {
    component: require('./form/validation.vue')
  },
  '/mapping': {
    component: require('./form/mapping.vue')
  },
  '/field': {
    component: require('./form/field.vue')
  },
  '/editor': {
    component: require('./form/editor.vue')
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
  '/tree': {
    component: require('./data/tree.vue')
  },
  '/crud': {
    component: require('./data/crud.vue')
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
  },
  '/loading-mask': {
    component: require('./service/loading-mask.vue')
  }
});

router.start(Vue.extend({
  components: {
    app: require('./app.vue')
  }
}), 'body');