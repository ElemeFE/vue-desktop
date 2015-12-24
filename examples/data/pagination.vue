<template>
  <d-button @click="changePageCount()">Change ItemTotal</d-button>
  <d-pagination :item-count="itemCount" :current-page="1"></d-pagination>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        itemCount: 5
      }
    },

    methods: {
      changePageCount() {
        this.itemCount = 98;
      }
    }
  };
</script>