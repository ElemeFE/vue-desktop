<template>
  <div class="sticky-example-container">
    <div class="sticky-example">
      <sticky>固定在顶部</sticky>
    </div>

    <div class="sticky-example">
      <sticky :top=70>固定在距顶部70px的位置</sticky>
    </div>
  </div>
</template>

<style scoped>
  .sticky-example-container {
    height: 1000px;
  }

  .sticky-example {
    width: 500px;
    margin: 60px auto 0;
    padding: 20px;
    border: solid 1px #ccc;
    background-color: #eee;
  }
</style>

<script type="text/ecmascript-6">
  export default {};
</script>