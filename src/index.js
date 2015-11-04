require('./css/iconfont.css');
require('./css/font-awesome.css');

var Vue = require('vue');

Vue.config.debug = true;

import Alert from './basic/alert.vue'
import Dialog from './basic/dialog.vue'
import DButton from './basic/button.vue'
import DButtonGroup from './basic/button-group.vue'

Vue.component('Alert', Alert);
Vue.component('Dialog', Dialog);
Vue.component('DButton', DButton);
Vue.component('DButtonGroup', DButtonGroup);

import Accordion from './nav/accordion.vue'
import AccordionPanel from './nav/accordion-panel.vue'
import Tab from './nav/tab.vue'
import Tabs from './nav/tabs.vue'

Vue.component('Accordion', Accordion);
Vue.component('AccordionPanel', AccordionPanel);
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

export { default as SchemaStore } from './schema/store'