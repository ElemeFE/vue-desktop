<template>
  <div class="dropdown-example">
    <d-dropdown title="下拉列表" position="bottom" @select="selectFunc">
      <d-dropdown-item :key=1>第一个菜单项</d-dropdown-item>
      <d-dropdown-item :key=2>第二个菜单项</d-dropdown-item>
      <d-dropdown-item disabled :key=3>第三个菜单项(不可用)</d-dropdown-item>
      <d-dropdown-item divider></d-dropdown-item>
      <d-dropdown-item :key=4>第四个菜单项</d-dropdown-item>
    </d-dropdown>
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
        selectFunc: function(key) {
          console.log('选中了第' + key + '项');
        }
      }
    }
  };
</script>