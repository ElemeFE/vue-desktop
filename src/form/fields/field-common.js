import { default as SchemaStore } from '../../schema/store';
import { merge } from '../../util';
var domUtil = require('wind-dom');

import Vue from 'vue';

export default {
  props: {
    form: {},
    model: {
      default() {
        return {};
      }
    },
    labelWidth: {},
    property: {},
    schema: {},
    label: {
      type: String
    },
    required: {
      type: Boolean,
      default: null
    },
    hideLabel: {
      type: Boolean,
      default: false
    },
    hideHint: {
      type: Boolean,
      default: false
    },
    hintType: {
      type: String,
      default: ''
    },
    hintMessage: {
      type: String
    },
    mapping: {},
    editorFocused: {
      type: Boolean,
      defaultValue: true
    }
  },

  methods: {
    validate() {
      var model = this.model;
      var schema = this.fieldSchema;

      if (schema) {
        schema.validateProperty(model, this.property);

        this.hintType = model.$hintTypes[this.property];
        this.hintMessage = model.$hints[this.property];
      }
    }
  },

  events: {
    formModelChange() {
      var form = this.form;
      if (form && form.model) {
        if (this.model !== form.model) {
          this.model = form.model;
        }
      }
    }
  },

  computed: {
    isRequired() {
      if (typeof this.required !== 'undefined' && this.required !== null) {
        return this.required;
      }

      var property = this.property;
      var schema = this.fieldSchema;

      if (schema && property) {
        return !!schema.getPropertyDescriptor(property).required;
      }

      return false;
    },

    fieldSchema() {
      var schema = this.schema;
      if (!schema && this.form && this.form.schema) {
        schema = this.form.schema;
      }

      if (typeof schema === 'string') {
        schema = this.schema = SchemaStore.getSchema(schema);
      }

      return schema;
    }
  },

  onCreated() {
    if (this.$parent.$isForm) {
      this.form = this.$parent;
    }
  },

  onDestroyed() {
    if (this.model && this.model.$off && this.modelListener) {
      this.model.$off('reset', this.modelListener);
    }
  },

  onCompiled() {
    var form = this.form;

    if (form) {
      var className = this.$el.className;
      if (className.indexOf('d-cell-') === -1) {
        var fieldClass = form.fieldClass;
        domUtil.addClass(this.$el, fieldClass);
      }
      if (!this.labelWidth && form.labelWidth) {
        this.labelWidth = form.labelWidth;
      }
      if (form && form.model) {
        this.model = form.model;
      }
    }

    if (this.model && this.model.$on) {
      this.modelListener = () => {
        Vue.nextTick(() => {
          this.hintType = '';
          this.hintMessage = '';
        });
      };
      this.model.$on('reset', this.modelListener);
    }

    if (this.property) {
      this.$watch('model.' + this.property, function() {
        if (this.editorFocused) {
          this.validate();
        }
      });

      var property = this.property;
      if (!property) return;

      var schema = this.fieldSchema;
      if (!schema) return;

      if (!this.label) {
        this.label = schema.getPropertyLabel(property);
      }

      var mapping = schema.getPropertyMapping(property, this.model);
      if (!mapping) return;

      var emptyRecord = this.emptyRecord;
      if (mapping.then) {
        mapping.then((value) => {
          if (emptyRecord) {
            this.mapping = merge({ '': null }, value);
          } else {
            this.mapping = value;
          }
        });
      } else {
        if (emptyRecord) {
          this.mapping = merge({ '': null }, mapping);
        } else {
          this.mapping = mapping;
        }
      }
    }
  }
};