<template>
  <li class="dropdown-item" :class="{'dropdown-item-disabled': disabled}" @click="select()">
    <slot></slot>
  </li>
</template>

<style>
  .dropdown-item {
    cursor: pointer;
    display: block;
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
    font-size: 13px;
    transition: .2s;
    color: #333;
  }

  .dropdown-item:first-child {
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
  }

  .dropdown-item:last-child {
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
  }

  .dropdown-item:hover {
    background-color: #0089dc;
    color: #fff;
  }

  .dropdown-item.dropdown-item-disabled {
    cursor: default;
    color: #999;
    background-color: inherit;
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  export default {
    props: {
      disabled: {
        type: Boolean,
        default: false
      },
      name: {
        type: String
      }
    },
    methods: {
      select() {
        if (!this.disabled) {
          this.$parent.$emit('select', this.name);
          if (this.$parent.trigger !== 'click') {
            this.$parent.showItem = false;
          }
        }
      }
    }
  }
</script>