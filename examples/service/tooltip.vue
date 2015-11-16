<template>
  <d-button v-tooltip tooltip-placement="right" tooltip-content="test">Right Tooltip</d-button>
  <d-button v-tooltip tooltip-content="test" tooltip-placement="top">Top Tooltip</d-button>
  <d-button v-tooltip tooltip-content="test">Bottom Tooltip</d-button>
  <d-button v-tooltip tooltip-placement="left" tooltip-content="test">Left Tooltip</d-button>
</template>

<script type="text/ecmascript-6" lang="babel">
  import { Notification } from '../../src/index.js'
  export default {
    methods: {}
  };
</script>