<template>
  <div class='d-field d-checkboxfield' :class="{ 'validate-error': hintType === 'error' }">
    <label>{{ label || '' }}</label>
    <div>
      <dyna-editor></dyna-editor>
      <div class="d-field-hint">
        <i class='iconfont' :class="{ 'icon-formfield-error': hintType === 'error', 'icon-formfield-warning': hintType === 'warning' }"></i>{{ hintMessage || '' }}
      </div>
    </div>
  </div>
</template>

<style>
  .d-checkboxfield input[type="checkbox"] {
    line-height: 24px;
    height: 24px;
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
      }
    },

    components: {
      dynaEditor: {
        inherit: true,
        template: '',
        created() {
          var parent = this.$parent;
          var bindProperty = '$parent.model.' + parent.property;
          this.$options.template = `<input type="checkbox" v-model="${ bindProperty }" />`;
        }
      }
    },

    compiled() {
      if (this.property) {
        this.$watch('model.' + this.property, function() {
          this.validate();
        });
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