var SchemaStore = require('../../schema/store');
var domUtil = require('wind-dom');

export default {
  props: {
    form: {},
    model: {
      default() {
        return {}
      }
    },
    labelWidth: {},
    property: {},
    schema: {},
    label: {
      type: String
    },
    hideLabel: {
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
    mapping: {}
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
      var property = this.property;
      var schema = this.fieldSchema;

      if (schema && property) {
        return !!schema.getPropertyDescriptor(property).required;
      }

      return this.required;
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

    if (this.property) {
      this.$watch('model.' + this.property, function() {
        this.validate();
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

      if (mapping.then) {
        mapping.then((value) => {
          this.mapping = value;
        });
      } else {
        this.mapping = mapping;
      }
    }
  }
};