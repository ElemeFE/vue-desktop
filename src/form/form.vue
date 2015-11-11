<template>
  <div class="d-form"><slot></slot></div>
</template>

<style>
  .d-form > .d-field {
    float: left;
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  export default {
    created() {
      this.$isForm = true;
    },

    props: {
      schema: {},
      model: {},
      labelWidth: {
      }
    }
  }
</script>