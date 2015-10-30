<template>
  <button @click="alert">Alert</button>
  <button @click="confirm">Confirm</button>
</template>

<script type="text/ecmascript-6">
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