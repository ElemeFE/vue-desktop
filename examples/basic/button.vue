<template>
  <div class="button-example">
    <d-button>Button</d-button>
  </div>

  <div class="button-example">
    <d-button type="primary">Primary Button</d-button>
    <d-button>Secondary Button (default)</d-button>
    <d-button type="phantom">Phantom Button</d-button>
  </div>

  <div class="button-example">
    <d-button type="primary" icon="fa-home">Home</d-button>
    <d-button type="primary" icon="fa-book">Library</d-button>
    <d-button type="primary" icon="fa-pencil">Applications</d-button>
    <d-button type="primary" icon="fa-cog">Settings</d-button>
  </div>

  <div class="button-example">
    <d-button type="primary" size="large" icon="fa-home">Large Button</d-button>
    <d-button type="primary" icon="fa-home">Medium Button (default)</d-button>
    <d-button type="primary" size="small" icon="fa-home">Small Button</d-button>
  </div>

  <div class="button-example">
    <d-button type="primary">Primary Button</d-button>
    <d-button type="primary" disabled>Primary Button (disabled)</d-button>
    <d-button>Secondary Button</d-button>
    <d-button disabled>Secondary Button (disabled)</d-button>
    <d-button type="phantom">Phantom Button</d-button>
    <d-button type="phantom" disabled>Phantom Button (disabled)</d-button>
  </div>

  <div class="button-example">
    <d-button-group>
      <d-button type="primary">确定</d-button>
      <d-button type="primary">取消</d-button>
    </d-button-group>

    <d-button-group>
      <d-button>左</d-button>
      <d-button>中</d-button>
      <d-button>右</d-button>
    </d-button-group>

    <d-button-group>
      <d-button type="primary">左</d-button>
      <d-button>中</d-button>
      <d-button>中</d-button>
      <d-button type="phantom">右</d-button>
    </d-button-group>
  </div>

  <div class="button-example">
    <d-button-group>
      <d-button type="phantom">1</d-button>
      <d-button type="phantom">2</d-button>
      <d-button type="phantom">3</d-button>
      <d-button type="phantom">4</d-button>
      <d-button type="phantom">5</d-button>
      <d-button type="phantom">前进 ></d-button>
    </d-button-group>
  </div>

  <div class="button-example">
    <d-button-group size="large">
      <d-button type="phantom">大</d-button>
      <d-button type="phantom">大</d-button>
      <d-button type="phantom">大</d-button>
    </d-button-group>
    <d-button-group>
      <d-button type="phantom">默认</d-button>
      <d-button type="phantom">默认</d-button>
      <d-button type="phantom">默认</d-button>
    </d-button-group>
    <d-button-group size="small">
      <d-button type="phantom">小</d-button>
      <d-button type="phantom">小</d-button>
      <d-button type="phantom">小</d-button>
    </d-button-group>
  </div>
</template>

<style>
  div.button-example {
    margin-top: 20px;
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  export default {};
</script>