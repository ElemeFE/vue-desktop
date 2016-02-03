<template>
  <div class="d-form"><slot></slot></div>
</template>

<style>
  .d-form::after {
    content: "";
    clear: both;
    display: block;
  }

  .d-form > .d-field {
    float: left;
  }
</style>

<script type="text/ecmascript-6">
  export default {
    created() {
      this.$isForm = true;
    },

    watch: {
      model() {
        this.$broadcast('formModelChange');
      }
    },

    props: {
      cols: {
        type: Number,
        default: 1
      },
      schema: {},
      model: {},
      labelWidth: {},
      labelSuffix: {}
    },

    computed: {
      fieldClass() {
        var cols = this.cols;
        if (cols >= 1 && cols <= 6) {
          return `d-cell-1-${ cols }`;
        }
        return '';
      }
    }
  };
</script>