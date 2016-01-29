<template>
  <div class="d-navmenu-item" :class="{ expanded: hasChild && expanded, active: !hasChild && active, toplevel: topLevel }">
    <div class="d-navmenu-item-label" @click="handleHeaderClick"><a v-link="{ path: path }"><span v-if="icon" class="d-navmenu-item-icon {{icon}}"></span>{{text}}</a><span class="d-icon d-icon-arrow-right" v-if="hasChild"></span></div>
    <div class="d-navmenu-item-content" @click="$event.stopPropagation()" transition="collapse" v-show="expanded">
      <slot></slot>
    </div>
  </div>
</template>

<style>
  .d-navmenu-item {
    box-sizing: border-box;
  }

  .d-navmenu-item.toplevel.expanded {
    border-left: 4px solid #19aa8d;
  }

  .d-navmenu-item.expanded {
    background-color: #f8f8f9;
  }

  .d-navmenu-item.expanded > .d-navmenu-item-content {
    display: block;
  }

  .d-navmenu-item.expanded > .d-navmenu-item-label .d-icon {
    transform: rotate(90deg);
  }

  .d-navmenu-item-label {
    position: relative;
    color: #676a6c;
    cursor: pointer;
  }

  .d-navmenu-item-icon {
    display: inline-block;
    width: 18px;
    margin-right: 2px;
    height: 20px;
    line-height: 20px;
    vertical-align: top;
  }

  .d-navmenu-item-label > a {
    display: inline-block;
    text-decoration: none;
    padding: 8px 15px 8px 20px;
    line-height: 20px;
    width: 100%;
    box-sizing: border-box;
    color: #676a6c;
  }

  .d-navmenu-item-label .d-icon {
    position: absolute;
    right: 15px;
    top: 9px;
    font-size: 12px;
    margin-top: 3px;
  }

  .d-navmenu-item-label:hover {
    font-weight: 600;
    color: #5b5d5f;
  }

  .d-navmenu-item-label:hover .d-icon {
    font-weight: normal;
  }

  .d-navmenu-item.expanded .d-navmenu-item-label > a {
    padding-left: 16px;
  }

  .d-navmenu-item-content {
    padding-left: 20px;
    display: none;
    overflow: hidden;
  }
</style>

<script type="text/ecmascript-6">
  export default {
    props: {
      path: {},
      text: {},
      icon: {},
      expanded: {
        type: Boolean
      },
      exclusive: {
        type: Boolean,
        default: false
      }
    },

    created() {
      this.$isNavMenu = true;
    },

    methods: {
      handleHeaderClick() {
        if (this.hasChild) {
          this.expanded = !this.expanded;
        }
      },

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
    },

    watch: {
      expanded(newVal) {
        if (newVal) {
          this.$parent.handleExclusive(this);
        }
      }
    },

    data() {
      return {
        hasChild: false,
        topLevel: false
      };
    },

    transitions: {
      collapse: require('../collapse-transition').default
    },

    ready() {
      this.hasChild = this.$children.length > 0;
      this.topLevel = !this.$parent.$isNavMenu;
    }
  };
</script>