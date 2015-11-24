<template>
  <div class="d-vbox"><slot></slot></div>
</template>

<style>
  .d-vbox {
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    overflow: hidden;
  }

  .d-vbox > .d-box-cell {
    display: flex;
    width: 100%;
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  var Vue = require('vue');
  var domUtil = require('wind-dom');
  import { throttle } from '../util';

  export default {
    data(){
      return {
        $isBox: true,
        $isTop: false,
        $resizeListener: null
      }
    },

    methods: {
      handleResize() {
        this.$broadcast('onresize');
      }
    },

    destroyed() {
      if (this.$resizeListener) {
        domUtil.off(window, 'resize', this.$resizeListener);
      }
    },

    ready() {
      var parent = this.$parent;
      var isTopBox = true;

      while (parent) {
        if (parent.$isBox) {
          isTopBox = false;
        }
        parent = parent.$parent;
      }

      var children = this.$el.children;
      for (var i = 0, j = children.length; i < j; i++) {
        var child = children[i];
        var flex = child.getAttribute('flex');
        if (flex !== null) {
          child.style.flex = Number(flex) || 1;
        }
      }

      if (isTopBox) {
        var box = this;
        box.$resizeListener = throttle(box.handleResize.bind(box), 100);

        domUtil.on(window, 'resize', box.$resizeListener);

        box.handleResize();
      }
    }
  }
</script>