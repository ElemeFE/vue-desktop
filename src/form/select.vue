<template>
  <div class="d-select">
    <slot></slot>
    <d-option v-for="item in mapping" :value="item.value || item.label">{{item.label}}</d-option>
  </div>
</template>

<style>
  .d-select {
    border: 1px solid #ccc;
    min-width: 140px;
    overflow: auto;
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  export default {
    components: {
      DOption: require('./select-option.vue')
    },
    props: {
      value: {
      },
      mapping: {
        default() {
          return [];
        }
      }
    }
  }
</script>