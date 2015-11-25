<style>
  .d-navmenu {
    box-sizing: border-box;
  }
</style>

<template>
  <div class="d-navmenu">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6" lang="babel">
  export default {
    props: {
      exclusive: {
        type: Boolean,
        default: true
      }
    },

    methods: {
      handleExclusive(item) {
        if (this.exclusive) {
          var children = this.$children;
          children.forEach(function(child) {
            if (child !== item) {
              child.expanded = false;
            }
          });
        }
      }
    }
  };
</script>