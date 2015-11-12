let cache = require('./cache');

var Schema = require('./schema');
var validators = require('./validators');

export default {
  getSchema(name) {
    return cache[name];
  },

  defineSchema(name, config) {
    if (typeof name !== 'string') {
      throw new Error('name is required when define a schema.');
    }

    if (typeof config !== 'object') {
      throw new Error('config should be an object.');
    }

    var result = new Schema(config);

    cache[name] = result;

    return result;
  },

  removeSchema(name) {
    cache[name] = null;
    delete cache[name];
  },

  defineValidator(name, fn) {
    if (typeof name !== 'string' || typeof fn !== 'function') return;

    validators[name] = fn;
  },

  getValidator(name) {
    if (typeof name !== 'string') return null;

    return validators[name];
  }
}