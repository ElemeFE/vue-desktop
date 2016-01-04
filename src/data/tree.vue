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

<script type="text/ecmascript-6">
  export default {
    created() {
      this.$isTree = true;
    },

    components: {
      TreeNode: require('./tree-node.vue')
    },

    methods: {
      getCheckedNodes(leafNodeOnly) {
        var checkedNodes = [];
        var walk = function(node) {
          var children = node.$children;
          children.forEach(function(child) {
            if (leafNodeOnly) {
              if (child.checked && !child.hasChild) {
                checkedNodes.push(child.data);
              }
            } else {
              if (child.checked) {
                checkedNodes.push(child.data);
              }
            }

            walk(child);
          });
        };

        walk(this);

        return checkedNodes;
      }
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
