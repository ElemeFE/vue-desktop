<template>
  <div class='d-field d-textfield' :class="{ 'validate-error': hintType === 'error', required: isRequired }">
    <label :style="{ width: labelWidth ? labelWidth + 'px' : '' }">{{ label || '' }}</label>
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
        type: String,
        default: 'text'
      }
    }, common.props),

    components: {
      editor: {
        inherit: true,
        template: '',
        components: {
          DTextEditor: require('../text-editor.vue')
        },
        created() {
          this.$options.template = `<d-text-editor type="${ this.$parent.type}" :value.sync="${ '$parent.model.' + this.$parent.property }" />`;
        }
      }
    },

    computed: merge({}, common.computed),

    created: common.onCreated,

    compiled: common.onCompiled,

    methods: merge({}, common.methods)
  };
</script>