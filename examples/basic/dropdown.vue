<template>
  <div class="dropdown-example">
    <d-dropdown-button title="下拉列表" trigger="click" position="bottom" @select="selectFunc">
      <d-dropdown-item name="1">第一个菜单项</d-dropdown-item>
      <d-dropdown-item name="2">第二个菜单项</d-dropdown-item>
      <d-dropdown-item disabled name="3">第三个菜单项(不可用)</d-dropdown-item>
      <d-dropdown-divider></d-dropdown-divider>
      <d-dropdown-item name="4">第四个菜单项</d-dropdown-item>
    </d-dropdown-button>
  </div>
</template>

<style>
  .dropdown-example {
    width: 200px;
    text-align: center;
    margin: 200px auto;
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  export default {
    data() {
      return {
        selectFunc: function(name) {
          console.log('选中了第' + name + '项');
        }
      }
    }
  };
</script>