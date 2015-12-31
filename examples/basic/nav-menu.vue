<template>
  <d-panel style="width: 260px; height: 100%;" class="panel">
    <d-nav-menu>
      <d-nav-menu-item text="test" expanded exclusive icon="folder">
        <d-nav-menu-item text="test" icon="leaf"></d-nav-menu-item>
        <d-nav-menu-item text="test"></d-nav-menu-item>
        <d-nav-menu-item text="test"></d-nav-menu-item>
        <d-nav-menu-item text="test">
          <d-nav-menu-item text="test"></d-nav-menu-item>
          <d-nav-menu-item text="test"></d-nav-menu-item>
          <d-nav-menu-item text="test"></d-nav-menu-item>
          <d-nav-menu-item text="test"></d-nav-menu-item>
        </d-nav-menu-item>
        <d-nav-menu-item text="test">
          <d-nav-menu-item text="test"></d-nav-menu-item>
          <d-nav-menu-item text="test"></d-nav-menu-item>
          <d-nav-menu-item text="test"></d-nav-menu-item>
          <d-nav-menu-item text="test"></d-nav-menu-item>
        </d-nav-menu-item>
      </d-nav-menu-item>
      <d-nav-menu-item text="test">
        <d-nav-menu-item text="test" path="/alert"></d-nav-menu-item>
        <d-nav-menu-item text="test"></d-nav-menu-item>
        <d-nav-menu-item text="test"></d-nav-menu-item>
        <d-nav-menu-item text="test">
          <d-nav-menu-item text="test"></d-nav-menu-item>
          <d-nav-menu-item text="test"></d-nav-menu-item>
          <d-nav-menu-item text="test"></d-nav-menu-item>
          <d-nav-menu-item text="test"></d-nav-menu-item>
        </d-nav-menu-item>
      </d-nav-menu-item>
      <d-nav-menu-item text="test"></d-nav-menu-item>
      <d-nav-menu-item text="test"></d-nav-menu-item>
      <d-nav-menu-item text="test"></d-nav-menu-item>
      <d-nav-menu-item text="test" icon="folder"></d-nav-menu-item>
    </d-nav-menu>
  </d-panel>
</template>

<style>
  .panel .d-panel-content {
    padding: 0;
    height: 100%;
    overflow: auto;
  }

  .leaf {
    width: 20px;
    background: #ddd;
  }

  .folder {
    width: 20px;
    background: #888;
  }
</style>

<script type="text/ecmascript-6">
  export default {
    methods: {
      test() {
        alert(123);
      }
    }
  };
</script>