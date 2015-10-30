<template>
  <div class="d-select-option" :class="{ selected: value === $parent.value }" @click="handleClick">
    <slot></slot>
  </div>
</template>

<style>
  .d-select-option {
    padding: 5px;
  }

  .d-select-option.selected {
    color: #0089dc;
  }
</style>

<script type="text/ecmascript-6">
  export default {
    props: {
      value: {}
    },

    methods: {
      handleClick() {
        this.$parent.value = this.value;
      }
    }
  }
</script>