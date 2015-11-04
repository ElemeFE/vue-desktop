<template>
  <div class='d-field d-radiogroupfield' :class="{ 'validate-error': hintType === 'error' }">
    <label>{{ label || '' }}</label>
    <div>
      <d-radio-group v-ref:group :value.sync="bindProperty"><slot></slot></d-radio-group>
      <div class="d-field-hint">
        <i class='iconfont' :class="{ 'icon-formfield-error': hintType === 'error', 'icon-formfield-warning': hintType === 'warning' }"></i>{{ hintMessage || '' }}
      </div>
    </div>
  </div>
</template>

<style>
  .d-radiogroupfield .d-radio-group {
    line-height: 30px;
  }

  .d-radiogroupfield .d-radio-group input {
    line-height: 30px;
    height: 30px;
  }
</style>

<script type="text/ecmascript-6">
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

    computed: {
      $radioName() {
        return this.$refs.group.$radioName;
      },
      $setValue() {
        return this.$refs.group.$setValue;
      },
      bindProperty: {
        get() {
          if (this.model && this.property) {
            return this.model[this.property];
          }
        },
        set(newValue) {
          if (this.model && this.property) {
            this.model[this.property] = newValue;
          }
        }
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