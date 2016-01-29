<template>
  <div class="d-select-option" :class="{ selected: !showCheckbox && value === $parent.value }" @click="handleClick">
    <input type="checkbox" v-if="showCheckbox" v-model="selected" />
    <slot></slot>
  </div>
</template>

<style>
  .d-select-option {
    padding: 5px;
    font-size: 14px;
    cursor: pointer;
    min-height: 20px;
    line-height: 20px;
  }

  .d-select-option:hover,
  .d-select-option.selected {
    background-color: #428bca;
    color: #fff;
  }
</style>

<script type="text/ecmascript-6">
  export default {
    props: {
      value: {},
      showCheckbox: {
        type: Boolean,
        default: false
      },
      selected: {
        type: Boolean
      }
    },

    ready() {
      if (this.$parent.multiSelect) {
        this.showCheckbox = true;
      }
    },

    methods: {
      handleClick() {
        if (this.showCheckbox) {
          this.selected = !this.selected;
          this.$parent.$emit('selection-change');
        } else {
          this.$parent.value = this.value;
          this.$parent.$emit('select', this.value);
        }
      }
    }
  };
</script>