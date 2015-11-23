var Vue = require('vue');
var i18n = require('vue-i18n');

import { default as locales } from './locales/index';

Vue.use(i18n, {
  lang: 'zh',
  locales: locales
});

Vue.config.debug = true;

export default Vue;