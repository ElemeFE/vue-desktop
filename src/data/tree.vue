<template>
  <div class="tree">
    <tree-node v-for="child in data" :data="child"></tree-node>
  </div>
</template>

<style scoped>
  .tree {
    overflow: auto;
    cursor: default;
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  export default {
    created() {
      this.$isTree = true;
    },

    components: {
      TreeNode: require('./tree-node.vue')
    },

    props: {
      data: {
        type: Array
      },
      levelConfig: {
      }
    }
  };
</script>
