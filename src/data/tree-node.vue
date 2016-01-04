<template>
  <div class="tree-node" :class="{ expanded: childrenRendered && expanded }">
    <div class="tree-node-content">
      <span class="expand-icon" :class="{ leafnode: !hasChild, expanded: hasChild && expanded }" @click="handleExpandIconClick"></span>
      <input type="checkbox" v-model="isChecked" @change="handleCheckChange()" v-el:input />
      <span class="icon {{icon}}" v-if="icon"></span><span class="text">{{ label + (childrenLoaded === 'loading' ? '(Loading)' : '') }}</span>
    </div>
    <div class="tree-node-children" v-if="!lazyRenderChildren || (lazyRenderChildren && childrenRendered)" v-show="expanded" transition="collapse">
      <d-tree-node v-for="child in children || childrenData" :data="child"></d-tree-node>
    </div>
  </div>
</template>

<style>
  .tree-node {
    white-space: nowrap;
  }

  .tree-node .expand-icon {
    display: inline-block;
    cursor: pointer;
    width: 0;
    height: 0;
    vertical-align: top;
    margin-top: 5px;
    margin-right: 3px;
    border: 5px solid transparent;

    border-right-width: 0;
    border-left-color: #333;
    border-left-width: 7px;
  }

  .tree-node .expand-icon:hover {
    border-left-color: #999;
  }

  .tree-node .expand-icon.expanded {
    border: 5px solid transparent;
    border-bottom-width: 0;
    border-top-color: #333;
    border-top-width: 7px;
    margin-top: 7px;
    margin-right: 0;
  }

  .tree-node .expand-icon.expanded:hover {
    border-top-color: #999;
  }

  .tree-node .expand-icon.leafnode {
    border-color: transparent;
    cursor: default;
  }

  .tree-node .text {
    font-size: 14px;
    vertical-align: middle;
  }

  .tree-node .icon {
    display: inline-block;
    width: 18px;
    height: 18px;
    vertical-align: middle;
    margin-right: 2px;
  }

  .tree-node .tree-node-content {
    padding: 2px;
    cursor: default;
  }

  .tree-node .tree-node-content > input {
    vertical-align: top;
    margin-top: 5px;
  }

  .tree-node.current > .tree-node-content {
    /*color: red;*/
  }

  .tree-node > .tree-node-children {
    overflow: hidden;
    background-color: transparent;
    padding-left: 16px;
    display: none;
  }

  .tree-node.expanded > .tree-node-children {
    display: block;
  }
</style>

<script type="text/ecmascript-6">
  var Vue = require('vue');

  export default {
    name: 'd-tree-node',

    props: {
      checked: {
        type: Boolean,
        default: false
      },
      data: {
        type: Object
      }
    },

    computed: {
      needLoadData() {
        return this.lazyload === true && !this.childrenLoaded && this.loadFn;
      },

      hasChild() {
        var children = this.children || this.childrenData;
        if (!this.lazyload || (this.lazyload === true && this.childrenLoaded === true)) {
          return children && children.length > 0;
        }
        return true;
      },

      label() {
        var data = this.data;
        if (!data) return '';
        var levelConfig = this.levelConfig;
        var labelProperty;
        if (levelConfig) {
          labelProperty = levelConfig.labelProperty;
        }
        if (!labelProperty) {
          return data['label'] || data['name']
        }
        return data[labelProperty];
      },

      isChecked:{
        get() {
          var data = this.data;
          if (!data) return false;
          var levelConfig = this.levelConfig;
          var checkedProperty;

          if (levelConfig) {
            checkedProperty = levelConfig.checkedProperty;

            if (checkedProperty) {
              return this.checked = data[checkedProperty];
            }
          }

          return this.checked;
        },

        set(value) {
          console.log('set checked:' + value);

          var data = this.data;
          if (!data) return false;
          var levelConfig = this.levelConfig;
          var checkedProperty;

          if (levelConfig) {
            checkedProperty = levelConfig.checkedProperty;

            if (checkedProperty) {
              data[checkedProperty] = value;
              this.checked = value;
              return;
            }
          }

          this.checked = value;
        }
      },

      icon() {
        var data = this.data;
        if (!data) return '';
        var levelConfig = this.levelConfig;
        var iconProperty;
        if (levelConfig) {
          iconProperty = levelConfig.iconProperty;

          if (!iconProperty) {
            if (this.hasChild) {
              return levelConfig.icon;
            } else {
              return levelConfig.leafIcon || levelConfig.icon;
            }
          }
        }
        return data[iconProperty];
      },

      children: {
        get() {
          var data = this.data;
          if (!data) return null;
          var levelConfig = this.levelConfig;
          var childrenProperty = 'children';
          if (levelConfig) {
            childrenProperty = levelConfig.childrenProperty || 'children';
          }
          if (data[childrenProperty] === undefined) {
            data[childrenProperty] = null;
          }
          return data[childrenProperty];
        },

        set(value) {
          var data = this.data;
          if (!data) return;
          var levelConfig = this.levelConfig;
          var childrenProperty = 'children';
          if (levelConfig) {
            childrenProperty = levelConfig.childrenProperty || 'children';
          }
          this.childrenData = data[childrenProperty] = value;
        }
      }
    },

    methods: {
      handleExpandIconClick() {
        // Only work on lazy load data.
        if (this.needLoadData) {
          this.loadIfNeeded(() => {
            this.expanded = true;
            this.childrenRendered = true;
          });
        } else {
          if (!this.expanded) {
            this.expanded = true;
            this.childrenRendered = true;
          } else {
            this.expanded = false;
            this.childrenRendered = true;
          }
        }
      },

      handleCheckChange() {
        var value = this.checked;

        this.setChecked(value);

        var children = this.$children;
        for (var i = 0, j = children.length; i < j; i++) {
          var child = children[i];
          child.setChecked(value, true);
        }
      },

      loadIfNeeded(callback) {
        if (this.lazyload === true && !this.childrenLoaded && this.loadFn) {
          this.childrenLoaded = 'loading';

          // TODO
          // loadFn(tree, node, () => {   });

          var loadFn = this.loadFn;

          loadFn(this, () => {
            this.childrenLoaded = true;
            if (this.lazyRenderChildren) {
              if (!this.childrenRendered) {
                this.childrenRendered = true;
              }
              if (callback) {
                callback.call(this);
              }
            }
          });
        } else {
          if (this.lazyRenderChildren) {
            if (!this.childrenRendered) {
              this.childrenRendered = true;
              if (callback) {
                callback.call(this);
              }
            }
          }
        }
      },

      setChecked(value, deep) {
        // Only work on lazy load data.
        this.loadIfNeeded(() => {
          var children = this.$children || [];
          Vue.nextTick(function() {
            for (var i = 0, j = children.length; i < j; i++) {
              var child = children[i];
              child.setChecked(value !== false);
            }
          });
        });

        var input = this.$els.input;
        if (value === 'half') {
          input.indeterminate = true;
          input.checked = false;
        } else {
          input.indeterminate = false;
          input.checked = !!value;
        }

        this.checked = value;
        var i, j;

        if (deep) {
          var children = this.$children;
          for (i = 0, j = children.length; i < j; i++) {
            var child = children[i];
            child.setChecked(value !== false, deep);
          }
        }

        var parent = this.$parent;

        if (parent.level === undefined) return;

        var siblings = parent.$children;

        var all = true;
        var none = true;

        for (i = 0, j = siblings.length; i < j; i++) {
          var sibling = siblings[i];
          if (sibling.checked !== true) {
            all = false;
          }
          if (sibling.checked !== false) {
            none = false;
          }
        }

        //console.log(all, none, this.label, this.checked);

        if (all) {
          parent.setChecked(true);
        } else if (!all && !none) {
          parent.setChecked('half');
        } else if (none) {
          parent.setChecked(false);
        }
      }
    },

    created() {
      var parent = this.$parent;
      if (parent.$isTree) {
        this.level = 0;
        this.$tree = parent;
        this.levelConfig = parent.levelConfig;
        if (this.levelConfig.recursive) {
          this.levelConfig.children = this.levelConfig;
        }
      } else {
        this.level = parent.level + 1;
        this.$tree = parent.$tree;
        if (parent.levelConfig) {
          this.levelConfig = parent.levelConfig.children;
          if (this.levelConfig && this.levelConfig.recursive) {
            this.levelConfig.children = this.levelConfig;
          }
        }
      }

      var levelConfig = this.levelConfig;
      if (levelConfig) {
        var children = levelConfig.children;
        if (children && children.lazy) {
          this.lazyload = true;
          this.loadFn = children.load;
        }
      }

      if (!this.$tree) {
        console.warn('Can not find node\'s tree.');
      } else {
        this.lazyRenderChildren = this.$tree.lazyRender;
      }
    },

    ready() {
      if (this.isChecked) {
        Vue.nextTick(() => {
          this.setChecked(true);
        });
      }
    },

    data() {
      return {
        level: 0,
        childrenData: [],
        childrenLoaded: false,
        expanded: false,
        levelConfig: null,
        $tree: null,
        $item: null,
        lazyRenderChildren: true,
        childrenRendered: false
      }
    },

    transitions: {
      collapse: require('../collapse-transition').default
    }
  }
</script>