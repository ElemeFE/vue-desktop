<template>
  <div class='d-field d-textfield' :class="{ 'validate-error': hintType === 'error', required: isRequired }">
    <label :style="{ width: labelWidth != null ? labelWidth + 'px' : '' }" v-show="!hideLabel">{{ label || '' }}</label>
    <div>
      <editor></editor>
      <slot></slot>
      <div class="d-field-hint">
        <i class='d-icon' :class="{ 'icon-formfield-error': hintType === 'error', 'icon-formfield-warning': hintType === 'warning' }"></i>{{ hintMessage || '' }}
      </div>
    </div>
  </div>
</template>

<style>
  .d-textfield .d-text-editor {
    width: 100%;
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  var merge = require('../../util').merge;
  var common = require('./field-common');

  export default {
    props: merge({
      type: {
        type: String
      },

      editorHeight: {
        type: Number
      }
    }, common.props),

    events: common.events,

    components: {
      editor: {
        inherit: true,
        template: '',
        components: {
          DTextEditor: require('../text-editor.vue')
        },
        created() {
          this.$options.template = `<d-text-editor type="${ this.$parent.editorType }" :value.sync="${ '$parent.model.' + this.$parent.property }" :height="$parent.editorHeight" />`;
        }
      }
    },

    computed: merge({
      editorType() {
        if (this.type) {
          return this.type;
        }

        if (this.property) {
          var fieldSchema = this.fieldSchema;
          if (fieldSchema) {
            var descriptor = fieldSchema.$getPropertyDescriptor(this.property);
            if (descriptor) {
              if (descriptor.type === Date) {
                return 'date';
              } else if (descriptor.type === Number) {
                return 'number';
              }
            }
          }
        }

        return 'text';
      }
    }, common.computed),

    created: common.onCreated,

    compiled: common.onCompiled,

    methods: merge({}, common.methods)
  };
</script>