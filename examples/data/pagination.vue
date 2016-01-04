<template>
  <d-button @click="changePageCount()">Change ItemTotal</d-button>
  <d-pagination :item-count="itemCount"  layout="info,->,prev,manual,next,list,slot" @current-change="test">
    <button>save</button>
    <button>cancel</button>
  </d-pagination>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        itemCount: 5
      }
    },

    methods: {
      test(currentPage) {
        console.log(currentPage);
      },
      changePageCount() {
        this.itemCount = 98;
      }
    }
  };
</script>