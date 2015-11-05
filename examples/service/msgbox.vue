<template>
  <d-button @click="alert">Alert</d-button>
  <d-button @click="confirm">Confirm</d-button>
</template>

<script type="text/ecmascript-6" lang="babel">
  import { MessageBox } from '../../src/index.js'
  export default {
    methods: {
      alert() {
        MessageBox('Title', 'This is a alert message');
      },
      confirm() {
        MessageBox({
          title: 'Title',
          message: 'This is a alert message',
          showCancelButton: true
        }, function(action) {
          MessageBox('Confirm Result', action);
        });
      }
    }
  };
</script>