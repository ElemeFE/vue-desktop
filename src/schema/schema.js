var validatorFnMap = require('./validators');

var doValidate = function(object, property, rule) {
  var validateFn = validatorFnMap[rule.type];
  if (typeof validateFn === 'function') {
    if (!validateFn(object[property], rule)) {
      object.$hints[property] = rule.errorMessage;
      object.$hintTypes[property] = 'error';

      return false;
    }
  }
  return true;
};

var initObject = object => {
  if (object.$hints) return;

  object.$hints = {};
  object.$hintTypes = {};
};

class Schema {
  constructor(options) {
    var props = this.props = {};
    for (var option in options) {
      if (options.hasOwnProperty(option)) {
        props[option] = options[option];
      }
    }
  }

  $new() {
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

    return result;
  }

  $validate(object) {
    if (!object) return console.warn('$validate require an object.');

    initObject(object);

    object.$hints = {};
    object.$hintTypes = {};

    var props = this.props;
    var passed = true;

    for (var property in props) {
      if (props.hasOwnProperty(property)) {
        if (!this.$validateProperty(object, property)) {
          passed = false;
        }
      }
    }

    return passed;
  }

  $validateProperty(object, property) {
    if (!object) return console.warn('$validate require an object.');

    initObject(object);

    var props = this.props;

    var propDefinition = props[property];

    if (!propDefinition) {
      console.warn(`no property ${property} found in object:`, object);
      return true;
    }

    var required = propDefinition.required;

    if (required) {
      if (!doValidate(object, property, { type: 'required' })) {
        return false;
      }
    }

    var rules = propDefinition.rules;
    if (rules instanceof Array) {
      for (var i = 0, j = rules.length; i < j; i++) {
        var rule = rules[i];
        if (!doValidate(object, property, rule)) {
          return false;
        }
      }
    } else if (rules) {
      if (!doValidate(object, property, rules)) return false;
    }

    object.$hints[property] = '';
    object.$hintTypes[property] = '';

    return true;
  }

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

  // TODO move hint message to form field
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