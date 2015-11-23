<template>
  <div class="accordion accordion-{{type}}">
    <slot></slot>
  </div>
</template>

<style>
  .accordion {
    margin: 0;
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