<template>
  <progress-bar></progress-bar>

  <progress-bar :percent=30 type="warn"></progress-bar>

  <progress-bar :percent=50 :bar-height=30></progress-bar>

  <progress-bar :percent=80 type="error"></progress-bar>

  <progress-bar :percent=100 type="success"></progress-bar>

  <progress-bar :percent=80 type="error" :show-percent=false></progress-bar>

  <progress-bar :percent=100 type="success" :show-percent=false></progress-bar>
</template>

<script type="text/ecmascript-6">
  export default {};
</script>