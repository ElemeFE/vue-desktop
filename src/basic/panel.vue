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
    background-color: #ffffff;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  }

  .d-panel-header {
    padding: 14px 15px 7px;
    font-size: 14px;
  }

  .d-panel-content {
    color: inherit;
    padding: 15px 20px 20px 20px;
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