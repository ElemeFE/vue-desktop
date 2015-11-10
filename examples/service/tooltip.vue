<template>
  <d-button v-tooltip tooltip-placement="right" tooltip-content="test">Notification 1</d-button>
  <d-button v-tooltip tooltip-content="test" tooltip-placement="top">Notification 2</d-button>
  <d-button v-tooltip tooltip-content="test">Notification 3</d-button>
  <d-button v-tooltip tooltip-placement="left" tooltip-content="test">Notification 4</d-button>
</template>

<script type="text/ecmascript-6" lang="babel">
  import { Notification } from '../../src/index.js'
  export default {
    methods: {}
  };
</script>