require('./icon/iconfont.css');
require('./common.css');
require('./config');

import Alert from './basic/alert.vue';
import Panel from './basic/panel.vue';
import Dialog from './basic/dialog.vue';
import Button from './basic/button.vue';
import ButtonGroup from './basic/button-group.vue';
import ProgressBar from './basic/progress-bar.vue';
import Slider from './basic/slider.vue';
import Sticky from './basic/sticky.vue';
import DropdownButton from './basic/dropdown.vue';
import DropdownItem from './basic/dropdown-item.vue';
import DropdownDivider from './basic/dropdown-divider.vue';
import Vbox from './basic/vbox.vue';
import NavMenu from './basic/nav-menu.vue';
import NavMenuItem from './basic/nav-menu-item.vue';

import Accordion from './nav/accordion.vue';
import AccordionPanel from './nav/accordion-panel.vue';
import Tab from './nav/tab.vue';
import Tabs from './nav/tabs.vue';
import Breadcrumb from './nav/breadcrumb.vue';
import BreadcrumbItem from './nav/breadcrumb-item.vue';

import Grid from './data/grid.vue';
import GridColumn from './data/grid-column.vue';
import Tree from './data/tree.vue';

import Pagination from './data/pagination.vue';

import Form from './form/form.vue';
import Radio from './form/radio.vue';
import TextEditor from './form/text-editor.vue';
import RadioGroup from './form/radio-group.vue';
import DatePicker from './form/date-picker.vue';
import TimePicker from './form/time-picker.vue';
import Checkbox from './form/checkbox.vue';
import Select from './form/select.vue';
import Option from './form/select-option.vue';
import Field from './form/fields/field.vue';
import TextField from './form/fields/text.vue';
import CheckboxField from './form/fields/check.vue';
import SelectField from './form/fields/select.vue';
import RadiogroupField from './form/fields/radio.vue';
import Tags from './form/tags.vue';

export var Components = {
  Alert,
  Panel,
  Dialog,
  Button,
  ButtonGroup,
  ProgressBar,
  Slider,
  Sticky,
  DropdownButton,
  DropdownItem,
  DropdownDivider,
  Vbox,
  NavMenu,
  NavMenuItem,

  Accordion,
  AccordionPanel,
  Tab,
  Tabs,
  Breadcrumb,
  BreadcrumbItem,

  Grid,
  GridColumn,
  Tree,

  Pagination,

  Form,
  Field,
  TextField,
  CheckboxField,
  SelectField,
  RadiogroupField,
  Radio,
  RadioGroup,
  Tags,
  TextEditor,
  Checkbox,
  DatePicker,
  TimePicker,
  Select,
  Option
};

export var initComponents = (Vue, prefix, components) => {
  if (arguments.length < 3) { // eslint-disable-line no-undef
    components = prefix;
    prefix = 'D';
  } else {
    if (!prefix) {
      prefix = 'D';
    }
  }

  if (!components) components = Object.keys(Components);

  if (components instanceof Array) {
    for (var i = 0, j = components.length; i < j; i++) {
      var key = components[i];
      Vue.component(prefix + key, Components[key]);
    }
  }
};

require('./service/tooltip');

export { default as MessageBox } from './service/msgbox';

export { default as Notification } from './service/notification';

export { default as Schema } from './schema/index';

export { default as LoadingMask } from './service/loading-mask';

export { default as Popup } from './popup/index';
