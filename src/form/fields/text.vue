<template>
  <div class='d-field d-textfield' :class="{ 'validate-error': hintType === 'error' }">
    <label>{{ label || '' }}</label>
    <div>
      <dyna-editor></dyna-editor>
      <slot></slot>
      <div class="d-field-hint">
        <i class='iconfont' :class="{ 'icon-formfield-error': hintType === 'error', 'icon-formfield-warning': hintType === 'warning' }"></i>{{ hintMessage || '' }}
      </div>
    </div>
  </div>
</template>

<style>
  .d-textfield .d-text-editor {
    width: 300px;
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  var SchemaStore = require('../../schema/store');

  export default {
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
      },
      type: {
        type: String,
        default: 'text'
      }
    },

    components: {
      dynaEditor: {
        inherit: true,
        template: '',
        components: {
          DTextEditor: require('../text-editor.vue')
        },
        created() {
          var parent = this.$parent;
          var bindProperty = '$parent.model.' + parent.property;
          var type = parent.type;
          this.$options.template = `<d-text-editor type="${type}" :value.sync="${ bindProperty }" />`;
        }
      }
    },

    compiled() {
      if (this.property) {
        this.$watch('model.' + this.property, function() {
          this.validate();
        });

        var schema = this.schema;
        var property = this.property;

        if (typeof schema === 'string') {
          schema = this.schema = SchemaStore.getSchema(schema);
        }
        if (!schema) return;

        if (!this.label) {
          this.label = schema.$getPropertyLabel(property);
        }
      }
    },

    methods: {
      validate() {
        var model = this.model;
        var schema = this.schema;
        if (typeof schema === 'string') {
          schema = this.schema = SchemaStore.getSchema(schema);
        }

        if (schema) {
          schema.$validateProperty(model, this.property);
          this.hintType = model.$hintTypes[this.property];
          this.hintMessage = model.$hints[this.property];
        }
      }
    }
  };
</script>