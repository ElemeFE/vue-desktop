<template>
  <div class="button-example">
    <d-button>Button</d-button>
  </div>

  <div class="button-example">
    <d-button type="primary">Primary Button</d-button>
    <d-button>Default Button</d-button>
    <d-button type="success">Success Button</d-button>
    <d-button type="info">Info Button</d-button>
    <d-button type="warning">Warning Button</d-button>
    <d-button type="danger">Danger Button</d-button>
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
    <d-button>Default Button</d-button>
    <d-button disabled>Default Button (disabled)</d-button>
    <d-button type="success">Success Button</d-button>
    <d-button type="success" disabled>Success Button (disabled)</d-button>
  </div>

  <div class="button-example">
    <d-button-group>
      <d-button>确定</d-button>
      <d-button>取消</d-button>
    </d-button-group>

    <d-button-group>
      <d-button>左</d-button>
      <d-button>中</d-button>
      <d-button>右</d-button>
    </d-button-group>

    <d-button-group>
      <d-button>左</d-button>
      <d-button>中</d-button>
      <d-button>中</d-button>
      <d-button>右</d-button>
    </d-button-group>
  </div>

  <div class="button-example">
    <d-button-group  @select="selectFunc" :exclusive=false>
      <d-button>下单立减</d-button>
      <d-button selected>专享红包</d-button>
      <d-button>特价秒杀</d-button>
      <d-button selected>赠品优惠</d-button>
      <d-button>在线支付</d-button>
    </d-button-group>
  </div>

  <div class="button-example">
    <d-button-group  @select="selectFunc">
      <d-button value="1">全部商家</d-button>
      <d-button value="2">甜品饮品</d-button>
      <d-button value="3">小吃零食</d-button>
      <d-button selected value="4">鲜花蛋糕</d-button>
      <d-button value="5">果蔬生鲜</d-button>
    </d-button-group>
  </div>

  <div class="button-example">
    <d-button-group size="large">
      <d-button>大</d-button>
      <d-button>大</d-button>
      <d-button>大</d-button>
    </d-button-group>
    <d-button-group>
      <d-button>默认</d-button>
      <d-button>默认</d-button>
      <d-button>默认</d-button>
    </d-button-group>
    <d-button-group size="small">
      <d-button>小</d-button>
      <d-button>小</d-button>
      <d-button>小</d-button>
    </d-button-group>
  </div>
</template>

<style>
  div.button-example {
    margin-top: 20px;
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  export default {
    data() {
      return {
        selectFunc: function(selected) {
          console.log('选择了' + selected.join('、'));
        }
      }
    }
  };
</script>