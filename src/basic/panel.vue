<template>
  <div class="d-panel" :class="{'noheader': !title}">
    <div class="d-panel-header" v-if="title">{{title}}</div>
    <div class="d-panel-content">
      <slot></slot>
    </div>
  </div>
</template>

<style>
  .d-panel {
  }

  .d-panel-header {
    background: #59677e;
    color: #fff;
    padding: 5px 8px;
    font-size: 14px;
    border-radius: 5px 5px 0 0;
  }

  .d-panel-content {
    background-color: #fff;
    padding: 10px;
    border-radius: 0 0 5px 5px;
  }

  .d-panel.noheader .d-panel-content {
    border-radius: 5px;
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  export default {
    props: {
      title: {}
    }
  }
</script>