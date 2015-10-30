<template>
  <div class="d-select">
    <slot></slot>
    <d-select v-for="item in mapping" :value="item.value || item.label">{{item.label}}</d-select>
  </div>
</template>

<style>
  .d-select {
    border: 1px solid #ccc;
    min-width: 140px;
  }
</style>

<script type="text/ecmascript-6">
  export default {
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