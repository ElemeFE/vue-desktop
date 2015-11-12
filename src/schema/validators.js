export default {
  required: function(value) {
    return !(value === null || value === undefined || value === '');
  },

  length: function(value, options) {
    options = options || {};
    var min = options.min;
    var max = options.max;
    var string = '';

    if (value !== null && value !== undefined) {
      string = '' + value;
    }

    if (typeof min === 'number') {
      if (string.length < min) {
        return false;
      }
    }

    if (typeof max === 'number') {
      if (string.length > max) {
        return false;
      }
    }

    return true;
  },

  range: function(value, options) {
    options = options || {};
    var min = options.min;
    var max = options.max;

    if (value === null || value === undefined) return true;

    value = Number(value);
    if (!isNaN(value)) return false;

    if (typeof min === 'number') {
      if (value < min) {
        return false;
      }
    }

    if (typeof max === 'number') {
      if (value > max) {
        return false;
      }
    }

    return true;
  },

  enum: function(value, options) {
    if (value === null || value === undefined) return true;
    var validValues = options.enum;

    if (!(validValues instanceof Array)) {
      throw new Error('enum should be a array.');
    }

    return validValues.indexOf(value) !== -1;
  },

  pattern: function(value, options) {
    options = options || {};
    var pattern = options.pattern;
    if (!pattern) throw new Error('pattern is required!');

    return pattern.test(value);
  },

  custom: function(value, options) {
    options = options || {};
    var validate = options.validate;

    if (typeof validate === 'function') {
      return !!validate(value);
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