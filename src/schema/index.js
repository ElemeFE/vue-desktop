import { default as validatorFnMap } from './validators';
import { formatDate, merge, getPath } from '../util';
import { default as defaultMessages } from './messages';

var doValidate = function(object, property, descriptor, rule) {
  const type = rule.type;
  const validateFn = validatorFnMap[type];
  if (typeof validateFn === 'function') {
    const messages = rule.messages || {};
    let message = messages[rule.type] || rule.message || descriptor.message;

    if (!message) {
      message = defaultMessages[type];
    }

    var clonedRule = merge({ message: message || '' }, rule);

    if (!validateFn.call(object, object[property], clonedRule, property, descriptor)) {
      object.$hints[property] = clonedRule.message;

      return false;
    }
  }
  return true;
};

var initObject = (object, schema, addMethod) => {
  if (object.$hints) return;

  Object.defineProperty(object, '$schema', {
    configurable: true,
    enumerable: false,
    value: schema
  });

  Object.defineProperty(object, '$savedState', {
    configurable: true,
    enumerable: false,
    writable: true,
    value: null
  });

  Object.defineProperty(object, '$hints', {
    configurable: true,
    enumerable: false,
    writable: true,
    value: {}
  });

  if (addMethod) {
    Object.defineProperty(object, 'validate', {
      configurable: true,
      enumerable: false,
      value: function() {
        return this.$schema.validate(this);
      }
    });

    Object.defineProperty(object, 'validateProperty', {
      configurable: true,
      enumerable: false,
      value: function(property) {
        return this.$schema.validateProperty(this, property);
      }
    });

    Object.defineProperty(object, '$on', {
      configurable: true,
      enumerable: false,
      value: function(name, fn) {
        if (!name || typeof fn !== 'function') throw new Error('$on need name & fn.');

        var listeners = this.$listeners;
        if (!listeners) {
          listeners = this.$listeners = {};
        }

        let array = listeners[name];
        if (!array) {
          array = listeners[name] = [];
        }
        array.push(fn);
      }
    });

    Object.defineProperty(object, '$off', {
      configurable: true,
      enumerable: false,
      value: function(name, fn) {
        if (!name) throw new Error('$off need name');
        const listeners = this.$listeners || {};
        const array = listeners[name];
        if (!array) return;
        if (typeof fn === 'function') {
          for (let i = 0, j = array.length; i < j; i++) {
            const item = array[i];
            if (item === fn) {
              array.splice(i, 1);
              break;
            }
          }
        } else {
          array.splice(0, array.length - 1);
        }
      }
    });

    Object.defineProperty(object, '$emit', {
      configurable: true,
      enumerable: false,
      value: function(name, arg0, arg1, arg2, arg3) {
        const listeners = this.$listeners || {};
        const array = listeners[name];
        if (!array) return;

        for (var i = 0, j = array.length; i < j; i++) {
          var fn = array[i];
          fn.call(this, arg0, arg1, arg2, arg3);
        }
      }
    });

    Object.defineProperty(object, 'save', {
      configurable: true,
      enumerable: false,
      value: function() {
        this.$schema.save(this);
      }
    });

    Object.defineProperty(object, 'toObject', {
      configurable: true,
      enumerable: false,
      value: function(options) {
        return this.$schema.toObject(this, options);
      }
    });

    Object.defineProperty(object, 'reset', {
      configurable: true,
      enumerable: false,
      value: function() {
        this.$schema.reset(this);
      }
    });

    Object.defineProperty(object, 'assign', {
      configurable: true,
      enumerable: false,
      value: function(...sources) {
        this.$schema.assign(this, ...sources);
      }
    });
  }
};

var reverseMapping = mapping => {
  const result = Object.create(null);

  for (let key in mapping) {
    if (mapping.hasOwnProperty(key)) {
      let value = mapping[key];
      result[value] = key;
    }
  }

  return result;
};

import { default as cache } from './cache';

class Schema {
  constructor(name, options) {
    if (typeof name === 'object') {
      options = name;
    } else {
      cache[name] = this;
    }

    this.nestedSchema = {};

    const props = this.props = {};
    for (let option in options) {
      if (options.hasOwnProperty(option)) {
        var value = options[option];

        if (value && value.type === 'object' && typeof value.fields) {
          this.nestedSchema[option] = new Schema(value.fields);
        }

        props[option] = value;
      }
    }

    this.$reversedMappings = {};
  }

  newModel() {
    const result = {};
    const props = this.props;

    for (let prop in props) {
      if (props.hasOwnProperty(prop)) {
        const value = props[prop];
        let defaultValue = value.default;
        if (typeof defaultValue === 'function') {
          defaultValue = defaultValue();
        }
        result[prop] = defaultValue;
      }
    }

    initObject(result, this, true);

    return result;
  }

  getPropertyDescriptor(property) {
    return this.props[property] || {};
  }

  getPropertyLabel(property) {
    return (this.props[property] || {}).label || '';
  }

  getPropertyMapping(property, object, ...args) {
    const descriptor = this.props[property] || {};
    const mapping = descriptor.mapping;
    let result = mapping;

    if (mapping instanceof Array) {
      result = {};

      for (var i = 0, j = mapping.length; i < j; i++) {
        var config = mapping[i];
        result[config.name || config.label] = config.value;
      }
    } else if (typeof mapping === 'function') {
      result = mapping(object, ...args);
    }

    return result;
  }

  translateProperty(property, value) {
    const mapping = this.getPropertyMapping(property);
    const definedMapping = (this.props[property] || {}).mapping;

    if (mapping) {
      let reversedMapping = this.$reversedMappings[property];

      if (typeof definedMapping !== 'function' && reversedMapping) {
        return reversedMapping[value];
      } else {
        reversedMapping = this.$reversedMappings[property] = reverseMapping(mapping);
      }

      return reversedMapping[value];
    }

    return null;
  }

  getPropertyText(object, property) {
    const value = getPath(object, property);
    const descriptor = this.props[property];
    if (descriptor) {
      if (descriptor.type === 'date' || descriptor.type === 'datetime') {
        return formatDate(value, descriptor.format);
      }
    }

    return value;
  }

  validate(object, options, callback) {
    if (!object) return console.warn('validate require an object.'); // eslint-disable-line no-console

    initObject(object, this);

    object.$hints = {};

    if (typeof options === 'function') {
      callback = options;
      options = null;
    }

    options = options || {};

    let props;
    if (options.props) {
      props = options.props;
    } else {
      props = Object.keys(this.props);
    }

    let skips = options.skips;
    if (skips) {
      props = props.filter(item => skips.indexOf(item) === -1);
    }

    let passed = true;

    for (var i = 0, j = props.length; i < j; i++) {
      var property = props[i];
      if (!this.validateProperty(object, property)) {
        passed = false;
      }
    }

    if (typeof callback === 'function') {
      var hasErrors = false;
      var errors = {};
      var hints = object.$hints;
      for (var hint in hints) {
        if (hints.hasOwnProperty(hint)) {
          var value = hints[hint];
          if (value) {
            hasErrors = true;
            errors[hint] = value;
          }
        }
      }

      callback(hasErrors ? errors : null);
    }

    return passed;
  }

  validateProperty(object, property) {
    if (!object) return console.warn('validate require an object.'); // eslint-disable-line no-console

    initObject(object, this);

    const props = this.props;
    const descriptor = props[property];

    if (!descriptor) {
      console.warn(`no property ${property} found in object:`, object); // eslint-disable-line no-console
      return true;
    }

    const required = descriptor.required;
    if (required) {
      if (!doValidate(object, property, descriptor, { type: 'required' })) {
        return false;
      }
    }

    const pattern = descriptor.pattern;
    if (pattern) {
      if (!doValidate(object, property, descriptor, { type: 'pattern', pattern: pattern })) {
        return false;
      }
    }

    const min = descriptor.min;
    const max = descriptor.max;
    if (typeof min !== 'undefined' || typeof max !== 'undefined') {
      if (!doValidate(object, property, descriptor, { type: 'range', min: min, max: max })) {
        return false;
      }
    }

    const minLength = descriptor.minLength;
    const maxLength = descriptor.maxLength;
    if (typeof minLength !== 'undefined' || typeof maxLength !== 'undefined') {
      if (!doValidate(object, property, descriptor, { type: 'length', min: minLength, max: maxLength })) {
        return false;
      }
    }

    const enumArray = descriptor.enum;
    if (typeof enumArray !== 'undefined') {
      if (!doValidate(object, property, descriptor, { type: 'enum', enum: enumArray })) {
        return false;
      }
    }

    const whitespace = descriptor.whitespace;
    if (typeof whitespace !== 'undefined') {
      if (!doValidate(object, property, descriptor, { type: 'whitespace', whitespace: whitespace })) {
        return false;
      }
    }

    const rules = descriptor.rules;
    if (rules instanceof Array) {
      for (var i = 0, j = rules.length; i < j; i++) {
        var rule = rules[i];
        if (!doValidate(object, property, descriptor, rule)) {
          return false;
        }
      }
    } else if (rules) {
      if (!doValidate(object, property, descriptor, rules)) return false;
    }

    if (typeof this.nestedSchema[property] !== 'undefined') {
      const value = object[property];
      const nestSchema = this.nestedSchema[property];

      if (value) {
        if (!nestSchema.validate(value)) return false;
      }
    }

    object.$hints[property] = '';

    return true;
  }

  save(object) {
    if (!object) {
      throw new Error('object is required when save an object\'s current state.');
    }

    const props = this.props;
    const savedState = {};

    for (var prop in props) {
      if (props.hasOwnProperty(prop)) {
        savedState[prop] = object[prop];
      }
    }

    object.$savedState = savedState;
  }

  reset(object) {
    if (!object) {
      throw new Error('object is required when reset an object\'s saved state.');
    }
    const savedState = object.$savedState;
    const props = this.props;

    for (let prop in props) {
      if (props.hasOwnProperty(prop)) {
        if (!savedState) {
          const descriptor = props[prop];
          let defaultValue = descriptor.default;
          if (typeof defaultValue === 'function') {
            defaultValue = defaultValue();
          }
          object[prop] = defaultValue;
        } else {
          object[prop] = savedState[prop];
        }
      }
    }

    if (object.$emit) {
      object.$emit('reset');
    }

    object.$hints = {};
  }

  format(data) {
    if (!data) return;
    if (!(data instanceof Array)) {
      data = [data];
    }
    data.forEach((item) => {
      var props = this.props;
      for (let prop in props) {
        if (props.hasOwnProperty(prop)) {
          const descriptor = props[prop];
          const value = item[prop];
          if (!item.hasOwnProperty(prop)) {
            item[prop] = undefined;
          }
          var type = descriptor.type;
          if (type === 'date' || type === 'datetime') {
            if (typeof value === 'string') {
              item[prop] = new Date(value);
            }
          } else if (type === 'number' || type === 'float' || type === 'integer') {
            if (typeof value === 'string') {
              item[prop] = Number(value);
            }
          }
        }
      }
    });

    return data;
  }

  assign(target, ...sources) {
    if (!target) {
      return;
    }

    const props = this.props;

    for (let i = 0, j = sources.length; i < j; i++) {
      const source = sources[i];
      for (var prop in props) {
        if (props.hasOwnProperty(prop)) {
          target[prop] = source[prop];
        }
      }
    }
  }

  toObject(model, options) {
    options = options || {};
    const props = this.props;
    const ignoreEmpty = !!options.ignoreEmpty;
    const result = {};

    for (let prop in props) {
      if (props.hasOwnProperty(prop)) {
        const value = model[prop];
        if (ignoreEmpty) {
          if (value !== null && value !== undefined && value !== '') {
            result[prop] = value;
          }
        } else {
          result[prop] = value;
        }
      }
    }

    return result;
  }

  $resetValidate(object) {
    const hints = object.$hints;

    for (var property in hints) {
      if (hints.hasOwnProperty(property)) {
        hints[property] = '';
      }
    }
  }
}

export default Schema;
