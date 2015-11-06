<template>
  <li class="dropdown-item" :class="{'dropdown-item-disabled': disabled}" v-if="!divider" @click="select()">
    <slot></slot>
  </li>
  <hr v-if="divider">
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

  .dropdown hr {
    margin: 0;
    border: none;
    border-bottom: solid 1px #ddd;
    cursor: default;
    padding: 0;
  }
</style>

<script type="text/ecmascript-6">
  export default {
    props: {
      divider: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      key: {
        type: Number
      }
    },
    methods: {
      select() {
        if (!this.disabled && !this.divider) {
          this.$parent.$emit('select', this.key);
          if (this.$parent.trigger !== 'click') {
            this.$parent.showItem = false;
          }
        }
      }
    }
  }
</script>