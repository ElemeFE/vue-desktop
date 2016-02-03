<template>
  <input class="d-checkbox" :id.once="id" type="checkbox" v-model="value" :true-value="trueValue" :false-value="falseValue"/><label :for.once="id" class="d-checkbox-label">{{ label }}</label>
</template>

<style>
  .d-checkbox {
    line-height: 24px;
    height: 24px;
  }

  .d-checkbox-label {
    display: inline-block;
    height: 28px;
    vertical-align: middle;
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

    created() {
      this.id = 'd_checkbox_' + seed++;
    }
  };
</script>
