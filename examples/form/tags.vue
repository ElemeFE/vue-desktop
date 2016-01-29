<template>
  <div class="tags-container">
    <d-tags placeholder="请选择" @select="handleSelect" :value="items"></d-tags>
  </div>
</template>

<style>
  .tags-container {
    width :450px;
    margin: 0 auto;
  }
</style>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        items: ['the', 'quick', 'brown', 'fox', 'jumps', 'over', 'a', 'lazy', 'dog']
      };
    },

    methods: {
      handleSelect(chosenTags) {
        console.log('选中项为: ' + chosenTags.join(', '));
      }
    }
  };
</script>