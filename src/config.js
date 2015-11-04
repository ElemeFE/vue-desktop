var Vue = require('vue');
var i18n = require('vue-i18n');

Vue.use(i18n, {
  lang: 'zh',
  locales: require('./locales')
});

Vue.config.debug = true;

export default Vue;