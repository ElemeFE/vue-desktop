<template>
  <d-slider @change="changeFunc"></d-slider>

  <d-slider :min=10 :max=20 :step=2 :default-value=16 :show-input=true @change="changeFunc"></d-slider>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        changeFunc(value) {
          console.log('目前值为' + value);
        }
      };
    }
  };
</script>