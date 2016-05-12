<template>
  <d-button @click="notification1">Notification 1</d-button>
  <d-button @click="notification2">Notification 2</d-button>
  <d-button @click="notification3">Notification 3</d-button>
  <d-button @click="notification4">Notification 4</d-button>
</template>

<script type="text/ecmascript-6" lang="babel">
  import { Notification } from '../../src/index.js'
  export default {
    methods: {
      notification1() {
        Notification({
          title: '通知',
          message: '通知信息'
        });
      },
      notification2() {
        Notification({
          title: '通知',
          message: '通知信息',
          type: 'success'
        });
      },
      notification3() {
        Notification({
          title: '通知',
          message: '通知信息',
          type: 'warning',
          duration: 0
        });
      },
      notification4() {
        Notification({
          title: '通知',
          message: '通知信息',
          type: 'error',
          callback: function(instance) {
            console.log(instance.id + ' is closed.');
          }
        });
      }
    }
  };
</script>