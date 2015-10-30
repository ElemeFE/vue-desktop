var validatorFnMap = {
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
      return validate(value);
    } else {
      throw new Error('validate must be a function.');
    }
  }
};

export default function(object) {
  object.$hints = {};
  object.$hintTypes = {};

  if (!object.$validators) {
    object.$validators = {};
  }

  object.$validateProperty = function(property) {
    var validators = object.$validators;

    var doValidate = function(property, option) {
      var validateFn = validatorFnMap[option.type];
      if (typeof validateFn === 'function') {
        if (!validateFn(object[property], option)) {
          object.$hints[property] = option.errorMessage;
          object.$hintTypes[property] = 'error';

          return false;
        }
      }
      return true;
    };

    var option = validators[property];
    if (option instanceof Array) {
      for (var i = 0, j = option.length; i < j; i++) {
        var validator = option[i];
        if (!doValidate(property, validator)) {
          return false;
        }
      }
    } else if (option) {
      if (!doValidate(property, option)) return false;
    }

    object.$hints[property] = '';
    object.$hintTypes[property] = '';

    return true;
  };

  object.$validate = function() {
    object.$hints = {};
    object.$hintTypes = {};

    var validators = object.$validators;
    var passed = true;

    for (var property in validators) {
      if (validators.hasOwnProperty(property)) {
        if (!object.$validateProperty(property)) {
          passed = false;
        }
      }
    }

    return passed;
  };

  function getHintMessage(property) {
    var validators = object.$validators;
    var hintMessage;

    var option = validators[property];
    if (option instanceof Array) {
      for (var i = 0, j = option.length; i < j; i++) {
        var validator = option[i];
        if (validator.hintMessage) {
          hintMessage = validator.hintMessage;
        }
      }
    } else if (option) {
      if (option.hintMessage) {
        hintMessage = option.hintMessage;
      }
    }
    return hintMessage;
  }

  object.$resetValidate = function() {
    var hints = object.$hints;
    var hintTypes = object.$hintTypes;

    for (var property in hints) {
      if (hints.hasOwnProperty(property)) {
        hints[property] = '';
        hintTypes[property] = '';
      }
    }
  };

  object.$showErrorMessage = function(property, message) {
    if (!property) return;
    object.$hints[property] = message;
    object.$hintTypes[property] = 'error';
  };

  object.$hideErrorMessage = function(property) {
    if (!property) return;
    object.$hints[property] = '';
    object.$hintTypes[property] = '';
  };

  object.$showHintMessage = function(property) {
    var hintMessage = getHintMessage(property);

    if (hintMessage) {
      object.$hints[property] = hintMessage;
      object.$hintTypes[property] = 'warning';
    }
  };

  object.$hideHintMessage = function(property) {
    var hintMessage = getHintMessage(property);

    if (hintMessage) {
      object.$hints[property] = '';
      object.$hintTypes[property] = '';
    }
  };

  return object;
};