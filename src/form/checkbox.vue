<template>
  <input :id.once="id" type="checkbox" v-model="value" :true-value="trueValue" :false-value="falseValue"/><label :for.once="id" v-if="label">{{ label }}</label>
</template>

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
      }
    },

    data() {
      return {
        value: null
      };
    },

    created() {
      this.id = 'd_checkbox_' + seed;
    }
  };
</script>
