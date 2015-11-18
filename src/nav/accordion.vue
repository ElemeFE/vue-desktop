<template>
  <div class="accordion" :class="{'accordion-transparent': type === 'transparent'}">
    <slot></slot>
  </div>
</template>

<style>
  .accordion {
    margin: 0;
    color: #333;
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  export default {
    props: {
      type: {
        type: String,
        default: 'default'
      }
    }
  }
</script>