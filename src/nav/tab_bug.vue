<template>
  <div class="d-tabpane" v-show="visible">
  </div>
</template>

<script type="text/ecmascript-6" lang="babel">
  export default {
    props: {
      title: {
        type: String
      }
    },

    data() {
      return {
        visible: false
      }
    },

    created() {
      this.$parent.tabs.push(this);
    }
  }
</script>

<style scoped>
  .d-tabpane {
    display: block;
    padding: 10px;
    background: #fff;
  }
</style>
