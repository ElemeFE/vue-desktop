require('./css/iconfont.css');
require('./css/font-awesome.css');

import Vue from './config';

import Alert from './basic/alert.vue'
import Dialog from './basic/dialog.vue'
import DButton from './basic/button.vue'
import DButtonGroup from './basic/button-group.vue'
import ProgressBar from './basic/progress-bar.vue'
import Slider from './basic/slider.vue'
import Sticky from './basic/sticky.vue'

Vue.component('Alert', Alert);
Vue.component('Dialog', Dialog);
Vue.component('DButton', DButton);
Vue.component('DButtonGroup', DButtonGroup);
Vue.component('ProgressBar', ProgressBar);
Vue.component('Slider', Slider);
Vue.component('Sticky', Sticky);

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

import Radio from './form/radio.vue'
import TextEditor from './form/text-editor.vue'
import RadioGroup from './form/radio-group.vue'
import DatePicker from './form/date-picker.vue'
import Checkbox from './form/checkbox.vue'
import Select from './form/select.vue'
import SelectOption from './form/select-option.vue'
import Field from './form/fields/field.vue'
import TextField from './form/fields/text.vue'
import CheckboxField from './form/fields/check.vue'
import SelectField from './form/fields/select.vue'
import RadiogroupField from './form/fields/radio.vue'

Vue.component('DField', Field);
Vue.component('DTextField', TextField);
Vue.component('DCheckboxField', CheckboxField);
Vue.component('DSelectField', CheckboxField);
Vue.component('DRadiogroupField', RadiogroupField);

Vue.component('DRadio', Radio);
Vue.component('DRadioGroup', RadioGroup);
Vue.component('DTextEditor', TextEditor);
Vue.component('DCheckbox', Checkbox);
Vue.component('DDatePicker', DatePicker);
Vue.component('DSelect', Select);
Vue.component('DOption', SelectOption);

export { default as MessageBox } from './service/msgbox/msgbox'

export { default as SchemaStore } from './schema/store'