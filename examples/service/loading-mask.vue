<template>
  <d-button @click="showLoadingMask()">Show Loading Mask By API</d-button>
  <d-button v-action="doAction()">Show Loading Mask By Directive</d-button>
</template>

<script type="text/ecmascript-6">
  import { LoadingMask } from '../../src/index.js';

  export default {
    methods: {
      showLoadingMask() {
        LoadingMask.open();
        setTimeout(function() {
          LoadingMask.close();
        }, 1000);
      },
      doAction() {
        return new Promise(function(resolve) {
          setTimeout(function() {
            resolve(1);
          }, 1000);
        });
      }
    }
  };
</script>