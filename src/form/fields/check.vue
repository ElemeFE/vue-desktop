<template>
  <div class='d-field d-checkboxfield' :class="{ 'validate-error': hintType === 'error', required: isRequired }">
    <label :style="{ width: labelWidth != null ? labelWidth + 'px' : '' }" v-show="!hideLabel">{{ labelText }}</label>
    <div class="d-field-content" :style="{ marginLeft: labelWidth != null ? labelWidth + 'px' : '' }">
      <editor></editor>
      <div class="d-field-hint" v-if="!hideHint">
        <i class='d-icon' :class="{ 'd-icon-error': hintType === 'error', 'd-icon-warning': hintType === 'warning' }"></i>{{ hintMessage || '' }}
      </div>
    </div>
  </div>
</template>

<style>
  .d-checkboxfield {
    min-height: 44px;
  }

  .d-checkboxfield input[type="checkbox"] {
    line-height: 24px;
    height: 24px;
  }
</style>

<script type="text/ecmascript-6">
  import { merge } from '../../util';
  import { default as common } from './field-common';

  export default {
    props: merge({
      trueValue: {
        default: true
      },
      falseValue: {
        default: false
      }
    }, common.props),

    components: {
      editor: {
        inherit: true,
        template: '',
        created() {
          this.$options.template = `<input type="checkbox" v-model="${ '$parent.model.' + this.$parent.property }" :true-value.once="$parent.trueValue" :false-value.once="$parent.falseValue"/>`;
        }
      }
    },

    computed: merge({}, common.computed),

    created: common.onCreated,

    beforeCompile() {
      if (this.property) {
        var schema = this.fieldSchema;
        if (schema) {
          var descriptor = schema.getPropertyDescriptor(this.property);
          if (!descriptor) return;

          if (descriptor.trueValue !== undefined) {
            this.trueValue = descriptor.trueValue;
          }

          if (descriptor.falseValue !== undefined) {
            this.falseValue = descriptor.falseValue;
          }
        }
      }
    },

    events: common.events,

    compiled: common.onCompiled,

    destroyed: common.onDestroyed,

    methods: merge({}, common.methods)
  };
</script>