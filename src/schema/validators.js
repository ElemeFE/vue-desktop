var format = require('./format');

export default {
  required: function(value, options, property, descriptor) {
    var result = !(value === null || value === undefined || value === '');
    options = options || {};
    descriptor = descriptor || {};

    if (!result) {
      options.message = format(options.message, { label: descriptor.label || property });
    }

    return result;
  },

  length: function(value, options, property, descriptor) {
    options = options || {};
    descriptor = descriptor || {};
    var min = options.min;
    var max = options.max;
    var string = '';

    if (value !== null && value !== undefined) {
      string = '' + value;
    }

    var result = true;

    if (typeof min === 'number') {
      if (string.length < min) {
        result = false;
      }
    }

    if (typeof max === 'number') {
      if (string.length > max) {
        result = false;
      }
    }

    if (!result) {
      var params = { label: descriptor.label || property, min: min, max: max };
      if (typeof options.message === 'object') {
        if (typeof max === 'number' && typeof min === 'number') {
          options.message = format(options.message.range, params);
        } else if (typeof min === 'number') {
          options.message = format(options.message.min, params);
        } else {
          options.message = format(options.message.max, params);
        }
      } else {
        options.message = format(options.message, params);
      }
    }

    return result;
  },

  range: function(value, options, property, descriptor) {
    options = options || {};
    descriptor = descriptor || {};
    var min = options.min;
    var max = options.max;

    var result = true;

    if (value === null || value === undefined) return true;

    value = parseFloat(value);
    if (isNaN(value)) {
      result = false;
    } else {
      if (typeof min === 'number') {
        if (value < min) {
          result = false;
        }
      }

      if (typeof max === 'number') {
        if (value > max) {
          result = false;
        }
      }
    }

    if (!result) {
      var params = { label: descriptor.label || property, min: min, max: max };
      if (typeof options.message === 'object') {
        if (typeof max === 'number' && typeof min === 'number') {
          options.message = format(options.message.range, params);
        } else if (typeof min === 'number') {
          options.message = format(options.message.min, params);
        } else {
          options.message = format(options.message.max, params);
        }
      } else {
        options.message = format(options.message, params);
      }
    }

    return result;
  },

  enum: function(value, options, property, descriptor) {
    options = options || {};
    descriptor = descriptor || {};
    if (value === null || value === undefined) return true;
    var validValues = options.enum;

    if (!(validValues instanceof Array)) {
      throw new Error('enum should be a array.');
    }

    var result = validValues.indexOf(value) !== -1;

    if (!result) {
      options.message = format(options.message, { label: descriptor.label || property, list: validValues.join(', ') });
    }

    return result;
  },

  whitespace: function(value, options, property, descriptor) {
    options = options || {};
    descriptor = descriptor || {};
    var whitespace = !!options.whitespace;
    var result = /^\s+$/.test(value);
    result = whitespace ? result : !result;

    if (!result) {
      options.message = format(options.message, { label: descriptor.label || property });
    }

    return result;
  },

  pattern: function(value, options, property, descriptor) {
    options = options || {};
    descriptor = descriptor || {};
    var pattern = options.pattern;
    if (!pattern) throw new Error('pattern is required!');

    var result = pattern.test(value);
    if (!result) {
      options.message = format(options.message, { label: descriptor.label || property });
    }

    return result;
  },

  custom: function(value, options, property, descriptor) {
    options = options || {};
    descriptor = descriptor || {};
    var validate = options.validate;

    if (typeof validate === 'function') {
      var result = !!validate.call(this, value);
      if (!result) {
        options.message = format(options.message, { label: descriptor.label || property });
      }
      return result;
    } else {
      throw new Error('validate must be a function.');
    }
  },

  mobile: function(value) {
    return /^1[3|4|5|7|8]\d{9}$/.test(value);
  },

  phone: function(value) {
    return /^1[34578]\d{9}$|^[2-9]\d{6,7}(-\d{1,4})?$|^6[1-9]{2,5}$/.test(value);
  },

  email: function (value) {
    return /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(value);
  },

  date: function(value) {
    return /^\d{4}-\d{2}-\d{2}$/.test(value);
  }
};