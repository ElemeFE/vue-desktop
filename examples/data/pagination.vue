<template>
  <d-button @click="changePageCount()">Change ItemTotal</d-button>
  <d-pagination :item-total="itemTotal" current-page="1"></d-pagination>
</template>

<script type="text/ecmascript-6" lang="babel">
  export default {
    data() {
      return {
        itemTotal: 5
      }
    },

    methods: {
      changePageCount() {
        this.itemTotal = 98;
      }
    }
  };
</script>