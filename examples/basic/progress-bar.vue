<template>
  <d-progress-bar></d-progress-bar>

  <d-progress-bar :percent=30 type="warn"></d-progress-bar>

  <d-progress-bar :percent=50 :bar-height=30></d-progress-bar>

  <d-progress-bar :percent=80 type="error"></d-progress-bar>

  <d-progress-bar :percent=100 type="success"></d-progress-bar>

  <d-progress-bar :percent=80 type="error" :show-percent=false></d-progress-bar>

  <d-progress-bar :percent=100 type="success" :show-percent=false></d-progress-bar>
</template>

<script type="text/ecmascript-6" lang="babel">
  export default {};
</script>