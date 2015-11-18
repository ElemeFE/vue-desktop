var validatorFnMap = require('./validators');
var formatDate = require('../util').formatDate;
var merge = require('../util').merge;

var defaultMessages = require('./messages');

var doValidate = function(object, property, descriptor, rule) {
  var type = rule.type;
  var validateFn = validatorFnMap[type];
  if (typeof validateFn === 'function') {
    var messages = rule.messages || {};
    var message = messages[rule.type] || rule.message || descriptor.message;

    if (!message) {
      message = defaultMessages[type];
    }

    var clonedRule = merge({ message: message || '' }, rule);

    if (!validateFn.call(object, object[property], clonedRule, property, descriptor)) {
      object.$hints[property] = clonedRule.message;
      object.$hintTypes[property] = 'error';

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

  Object.defineProperty(object, '$hintTypes', {
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

    Object.defineProperty(object, 'save', {
      configurable: true,
      enumerable: false,
      value: function() {
        this.$schema.save(this);
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
  var result = Object.create(null);

  for (var key in mapping) {
    if (mapping.hasOwnProperty(key)) {
      var value = mapping[key];
      result[value] = key;
    }
  }

  return result;
};

var cache = require('./cache');

class Schema {
  constructor(name, options) {
    if (typeof name === 'object') {
      options = name;
    } else {
      cache[name] = this;
    }

    var props = this.props = {};
    for (var option in options) {
      if (options.hasOwnProperty(option)) {
        props[option] = options[option];
      }
    }

    this.$reversedMappings = {};
  }

  create() {
    var result = {};
    var props = this.props;

    for (var prop in props) {
      if (props.hasOwnProperty(prop)) {
        var value = props[prop];
        var defaultValue = value.default;
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

  getPropertyMapping(property, object) {
    var descriptor = this.props[property] || {};
    var mapping = descriptor.mapping;
    var result = mapping;

    if (mapping instanceof Array) {
      result = {};

      for (var i = 0, j = mapping.length; i < j; i++) {
        var config = mapping[i];
        result[config.name || config.label] = config.value;
      }
    } else if (typeof mapping === 'function') {
      result = mapping(object);
    }

    return result;
  }

  translateProperty(object, property) {
    var mapping = this.getPropertyMapping(property);
    var definedMapping = (this.props[property] || {}).mapping;

    if (mapping) {
      var value = object[property];
      var reversedMapping = this.$reversedMappings[property];

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
    var value = object[property];
    var descriptor = this.props[property];
    if (descriptor) {
      if (descriptor.type === 'date' || descriptor.type === 'datetime') {
        return formatDate(value, descriptor.format);
      }
    }

    return value;
  }

  validate(object, options) {
    if (!object) return console.warn('validate require an object.');

    initObject(object, this);

    object.$hints = {};
    object.$hintTypes = {};

    options = options || {};

    var props;
    if (options.props) {
      props = options.props;
    } else {
      props = Object.keys(this.props);
    }

    var skips = options.skips;
    if (skips) {
      props = props.filter(item => skips.indexOf(item) === -1);
    }

    var passed = true;

    for (var i = 0, j = props.length; i < j; i++) {
      var property = props[i];
      if (!this.validateProperty(object, property)) {
        passed = false;
      }
    }

    return passed;
  }

  validateProperty(object, property) {
    if (!object) return console.warn('validate require an object.');

    initObject(object, this);

    var props = this.props;

    var descriptor = props[property];

    if (!descriptor) {
      console.warn(`no property ${property} found in object:`, object);
      return true;
    }

    var required = descriptor.required;
    if (required) {
      if (!doValidate(object, property, descriptor, { type: 'required' })) {
        return false;
      }
    }

    var pattern = descriptor.pattern;
    if (pattern) {
      if (!doValidate(object, property, descriptor, { type: 'pattern', pattern: pattern })) {
        return false;
      }
    }

    var min = descriptor.min;
    var max = descriptor.max;
    if (typeof min !== 'undefined' || typeof max !== 'undefined') {
      if (!doValidate(object, property, descriptor, { type: 'range', min: min, max: max })) {
        return false;
      }
    }

    var minLength = descriptor.minLength;
    var maxLength = descriptor.maxLength;
    if (typeof minLength !== 'undefined' || typeof maxLength !== 'undefined') {
      if (!doValidate(object, property, descriptor, { type: 'length', min: minLength, max: maxLength })) {
        return false;
      }
    }

    var enumArray = descriptor.enum;
    if (typeof enumArray !== 'undefined') {
      if (!doValidate(object, property, descriptor, { type: 'enum', enum: enumArray })) {
        return false;
      }
    }

    var whitespace = descriptor.whitespace;
    if (typeof whitespace !== 'undefined') {
      if (!doValidate(object, property, descriptor, { type: 'whitespace', whitespace: whitespace })) {
        return false;
      }
    }

    var rules = descriptor.rules;
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

    object.$hints[property] = '';
    object.$hintTypes[property] = '';

    return true;
  }

  save(object) {
    if (!object) {
      throw new Error('object is required when save an object\'s current state.');
    }

    var props = this.props;
    var savedState = {};

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
    var savedState = object.$savedState;
    var props = this.props;

    for (var prop in props) {
      if (props.hasOwnProperty(prop)) {
        if (!savedState) {
          var descriptor = props[prop];
          var defaultValue = descriptor.default;
          if (typeof defaultValue === 'function') {
            defaultValue = defaultValue();
          }
          object[prop] = defaultValue;
        } else {
          object[prop] = savedState[prop];
        }
      }
    }

    object.$hints = {};
    object.$hintTypes = {};
  }

  convert(data) {
    if (!data) return;
    if (!(data instanceof Array)) {
      data = [data];
    }
    data.forEach((item) => {
      var props = this.props;
      for (var prop in props) {
        if (props.hasOwnProperty(prop)) {
          var descriptor = props[prop];
          var value = item[prop];
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

    var props = this.props;

    for (var i = 0, j = sources.length; i < j; i++) {
      var source = sources[i];
      for (var prop in props) {
        if (props.hasOwnProperty(prop)) {
          target[prop] = source[prop];
        }
      }
    }
  }

  // TODO move hint message to form field
  $getHintMessage(property) {
    var props = this.props;
    if (!props[property]) return;

    var hintMessage;

    var rules = props[property].rules;
    if (rules instanceof Array) {
      for (var i = 0, j = rules.length; i < j; i++) {
        var validator = rules[i];
        if (validator.hintMessage) {
          hintMessage = validator.hintMessage;
        }
      }
    } else if (rules) {
      if (rules.hintMessage) {
        hintMessage = rules.hintMessage;
      }
    }

    return hintMessage;
  }

  $resetValidate(object) {
    var hints = object.$hints;
    var hintTypes = object.$hintTypes;

    for (var property in hints) {
      if (hints.hasOwnProperty(property)) {
        hints[property] = '';
        hintTypes[property] = '';
      }
    }
  }

  $showErrorMessage(object, property, message) {
    if (!object || !property) return;

    object.$hints[property] = message;
    object.$hintTypes[property] = 'error';
  }

  $hideErrorMessage(object, property) {
    if (!object || !property) return;

    object.$hints[property] = '';
    object.$hintTypes[property] = '';
  };

  $showHintMessage(object, property) {
    var hintMessage = this.$getHintMessage(property);

    if (hintMessage) {
      object.$hints[property] = hintMessage;
      object.$hintTypes[property] = 'warning';
    }
  }

  $hideHintMessage(object, property) {
    var hintMessage = this.$getHintMessage(property);

    if (hintMessage) {
      object.$hints[property] = '';
      object.$hintTypes[property] = '';
    }
  }
}

export default Schema;