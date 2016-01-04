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

    computed: {
      children: {
        set(value) {
          this.data = value;
        },
        get() {
          return this.data;
        }
      }
    },

    methods: {
      getCheckedNodes(leafNodeOnly) {
        var checkedNodes = [];
        var walk = function(node) {
          var children = node.$children;
          children.forEach(function(child) {
            if (leafNodeOnly) {
              if (child.isChecked && !child.hasChild) {
                checkedNodes.push(child.data);
              }
            } else {
              if (child.isChecked) {
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

    ready() {
      if (this.levelConfig) {
        if (this.levelConfig.lazy === true) {
          var loadFn = this.levelConfig.load;
          if (!loadFn) return;
          loadFn(this, (callback) => {
            if (callback) {
              callback.call(this);
            }
          });
        }
      }
    },

    props: {
      data: {
        type: Array
      },
      levelConfig: {},
      lazyRender: {
        type: Boolean,
        default: true
      }
    }
  };
</script>
