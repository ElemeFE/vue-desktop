<template>
  <div class='d-field d-textfield' :class="{ 'validate-error': hintType === 'error', required: isRequired }">
    <label>{{ label || '' }}</label>
    <div>
      <dyna-editor></dyna-editor>
      <slot></slot>
      <div class="d-field-hint">
        <i class='d-icon' :class="{ 'icon-formfield-error': hintType === 'error', 'icon-formfield-warning': hintType === 'warning' }"></i>{{ hintMessage || '' }}
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
      dynaEditor: {
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

    compiled: common.onCompiled,

    methods: merge({}, common.methods)
  };
</script>