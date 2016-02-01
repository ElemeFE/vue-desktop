<template>
  <div class='d-field d-textfield' :class="{ 'validate-error': hintType === 'error', required: isRequired }">
    <label :style="{ width: labelWidth != null ? labelWidth + 'px' : '' }" v-show="!hideLabel">{{ label || '' }}</label>
    <div>
      <editor></editor>
      <slot></slot>
      <div class="d-field-hint" v-if="!hideHint">
        <i class='d-icon' :class="{ 'd-icon-error': hintType === 'error', 'd-icon-warning': hintType === 'warning' }"></i>{{ hintMessage || '' }}
      </div>
    </div>
  </div>
</template>

<style>
  .d-textfield {
    min-height: 44px;
  }

  .d-textfield .d-text-editor {
    width: 100%;
  }
</style>

<script type="text/ecmascript-6">
  import { merge } from '../../util';
  import { default as common } from './field-common';

  const TYPES_MAP = {
    date: 'date',
    datetime: 'datetime',
    integer: 'number',
    float: 'number',
    number: 'number'
  };

  export default {
    props: merge({
      type: {
        type: String
      },

      editorHeight: {
        type: Number
      },

      placeholder: {},

      lazy: {
        type: Boolean,
        default: false
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
          this.$options.template = `<d-text-editor @focus="$parent.handleFocus" type="${ this.$parent.editorType }" :value.sync="${ '$parent.model.' + this.$parent.property }" :height="$parent.editorHeight" :placeholder="$parent.placeholder || ''"/>`;
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
            var descriptor = fieldSchema.getPropertyDescriptor(this.property);
            if (descriptor) {
              if (TYPES_MAP[descriptor.type]) {
                return TYPES_MAP[descriptor.type];
              }
            }
          }
        }

        return 'text';
      }
    }, common.computed),

    created: common.onCreated,

    destroyed: common.onDestroyed,

    beforeCompile() {
      this.editorFocused = false;
    },

    compiled: common.onCompiled,

    methods: merge({
      handleFocus() {
        this.editorFocused = true;
      },

      handleBlur() {
        this.editorFocused = false;
      }
    }, common.methods)
  };
</script>