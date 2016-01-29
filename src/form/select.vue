<template>
  <div class="d-select">
    <slot></slot>
    <d-option v-for="item in mapping" :value="item.value || item.label" :show-checkbox="multiSelect">{{item.label}}</d-option>
  </div>
</template>

<style>
  .d-select {
    border: 1px solid #ccc;
    min-width: 140px;
    overflow: auto;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  }
</style>

<script type="text/ecmascript-6">
  export default {
    components: {
      DOption: require('./select-option.vue')
    },

    props: {
      value: {},
      multiSelect: {
        type: Boolean,
        default: false
      },
      mapping: {
        default() {
          return [];
        }
      }
    }
  };
</script>