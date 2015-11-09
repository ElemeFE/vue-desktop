var SchemaStore = require('../../schema/store');

export default {
  methods: {
    validate() {
      var model = this.model;
      var schema = this.fieldSchema;

      if (schema) {
        schema.$validateProperty(model, this.property);

        this.hintType = model.$hintTypes[this.property];
        this.hintMessage = model.$hints[this.property];
      }
    }
  },

  computed: {
    isRequired() {
      return this.required;
    },

    fieldSchema() {
      var schema = this.schema;
      if (typeof schema === 'string') {
        schema = this.schema = SchemaStore.getSchema(schema);
      }

      return schema;
    }
  },

  onCompiled() {
    if (this.property) {
      this.$watch('model.' + this.property, function() {
        this.validate();
      });

      var property = this.property;
      if (!property) return;

      var schema = this.fieldSchema;
      if (!schema) return;

      if (!this.label) {
        this.label = schema.$getPropertyLabel(property);
      }

      var mapping = schema.$getPropertyMapping(property);
      if (!mapping) return;

      this.mapping = mapping;
    }
  },

  props: {
    model: {
      default() {
        return {}
      }
    },
    property: {},
    schema: {},
    label: {
      type: String
    },
    hintType: {
      type: String,
      default: ''
    },
    hintMessage: {
      type: String
    }
  }
};