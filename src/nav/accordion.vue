<template>
  <div class="accordion">
    <slot></slot>
  </div>
</template>

<style>
  .accordion {
    width: 95%;
    margin: 0 auto;
    color: #333;
    border: solid 1px #999;
    border-radius: 4px;
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  export default {
    data() {
      return {
        renderData: []
      }
    }
  }
</script>