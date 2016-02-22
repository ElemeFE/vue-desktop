<template>
  <input v-el:editor class="d-checkbox" @change="onChange" :id.once="id" type="checkbox" v-model="value" :true-value="trueValue" :false-value="falseValue"/><label :for.once="id" class="d-checkbox-label">{{ label }}</label>
</template>

<style>
  .d-checkbox {
    line-height: 24px;
    height: 24px;
  }

  .d-checkbox-label {
    display: inline-block;
    height: 28px;
    vertical-align: top;
    font-size: 14px;
  }
</style>

<script type="text/ecmascript-6">
  var seed = 1;

  export default {
    props: {
      label: {},
      trueValue: {
        default: true
      },
      falseValue: {
        default: false
      },
      value: {}
    },

    methods: {
      onChange() {
        this.$emit('change', this, this.$els.editor.checked);
      }
    },

    created() {
      this.id = 'd_checkbox_' + seed++;
    }
  };
</script>
