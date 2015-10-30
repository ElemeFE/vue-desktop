require('./css/iconfont.css');

var Vue = require('vue');

Vue.config.debug = true;

import Dialog from './basic/dialog.vue'

Vue.component('Dialog', Dialog);

import Tab from './nav/tab.vue'
import Tabs from './nav/tabs.vue'

Vue.component('Tab', Tab);
Vue.component('Tabs', Tabs);

import Grid from './data/grid.vue'
import Pagination from './data/pagination.vue'

Vue.component('DGrid', Grid);
Vue.component('Pagination', Pagination);

import FormField from './form/formfield.vue'
import Radio from './form/radio.vue'
import TextEditor from './form/text-editor.vue'
import RadioGroup from './form/radio-group.vue'
import DatePicker from './form/date-picker.vue'
import Checkbox from './form/checkbox.vue'
import Select from './form/select.vue'
import SelectOption from './form/select-option.vue'

Vue.component('FormField', FormField);
Vue.component('Radio', Radio);
Vue.component('RadioGroup', RadioGroup);
Vue.component('TextEditor', TextEditor);
Vue.component('Checkbox', Checkbox);
Vue.component('DatePicker', DatePicker);
Vue.component('DSelect', Select);
Vue.component('DOption', SelectOption);

export { default as MessageBox } from './service/msgbox/msgbox'

// JUST FOR TEST
Vue.transition('expand', {
  beforeEnter: function (el) {
    //el.textContent = 'beforeEnter';
  },

  enter: function (el) {
    //el.textContent = 'enter';
  },

  afterEnter: function (el) {
    //el.textContent = 'afterEnter';
  },

  enterCancelled: function (el) {
    // handle cancellation
  },

  beforeLeave: function (el) {
    //el.textContent = 'beforeLeave';
  },

  leave: function (el) {
    //el.textContent = 'leave';
  },

  afterLeave: function (el) {
    //el.textContent = 'afterLeave';
  },

  leaveCancelled: function (el) {
    // handle cancellation
  }
});