<template>
  <div class="d-tabs">
    <ul class="d-tabs-nav">
      <li class="d-tab" v-for="tab in tabs">
        <span class="d-tab-label">{{ tab.title }}</span>
      </li>
      </ul>
    <div class="d-tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6" lang="babel">
  export default {
    ready() {
      console.log(this.$children.map((item) => item.title));
    },

    data() {
      return {
        tabs: []
      }
    }
  }
</script>

<style>
  .d-tabs-nav {
    list-style: none;
    padding: 0;
    margin: 0 0 -1px;
  }

  .d-tabs-content {
    border: 1px solid #e7eaec;
    background: #fff;
  }

  .d-tab {
    display: inline-block;
    background: none;
    border: none;
    color: #676a6c;
    padding: 8px 10px;
    border-bottom: 0;
    cursor: pointer;
    font-size: 14px;
    min-width: 50px;
    border-radius: 5px 5px 0 0;
  }

  .d-tab:hover {
    color: #a7b1c2;
  }

  .d-tab + .d-tab {
    margin: 0 0 0 1px;
  }
</style>