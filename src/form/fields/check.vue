<template>
  <div class='d-field d-checkboxfield' :class="{ 'validate-error': hintType === 'error', required: isRequired }">
    <label :style="{ width: labelWidth ? labelWidth + 'px' : '' }">{{ label || '' }}</label>
    <div>
      <editor></editor>
      <div class="d-field-hint">
        <i class='d-icon' :class="{ 'icon-formfield-error': hintType === 'error', 'icon-formfield-warning': hintType === 'warning' }"></i>{{ hintMessage || '' }}
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
  var merge = require('../../util').merge;
  var common = require('./field-common');

  export default {
    props: merge({}, common.props),

    components: {
      editor: {
        inherit: true,
        template: '',
        created() {
          this.$options.template = `<input type="checkbox" v-model="${ '$parent.model.' + this.$parent.property }" />`;
        }
      }
    },

    computed: merge({}, common.computed),

    created: common.onCreated,

    compiled: common.onCompiled,

    methods: merge({}, common.methods)
  };
</script>