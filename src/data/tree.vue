<template>
  <div class="tree">
    <tree-node v-for="child in nodes" :data="child"></tree-node>
  </div>
</template>

<style scoped>
  .tree {
    background-color: white;
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
      nodes: {
        type: Array
      },
      levelConfig: {
      }
    }
  };
</script>
