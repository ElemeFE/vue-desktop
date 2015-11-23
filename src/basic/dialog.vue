<template>
  <div class="d-dialog" :style="{ width: width + 'px' }" v-show="visible" transition="pop-bounce">
    <div class="d-dialog-header">
      <span class="d-dialog-title">{{title}}</span>
      <div class="d-dialog-header-buttons">
        <i class="d-dialog-close d-icon icon-close" @click='close()'></i>
      </div>
    </div>
    <div class="d-dialog-body"><slot></slot></div>
    <div class="d-dialog-footer"><slot name="dialog-footer"></slot></div>
  </div>
</template>

<script type="text/ecmascript-6" lang="babel">
  var Popup = require('../popup');

  export default {
    mixins: [ Popup ],

    props: {
      title: {
        type: String,
        default: ''
      },

      width: {
        default: 600
      }
    },

    computed: {
      popupOptions() {
        return {
          hideOnPressEscape: true,
          modal: true,
          target: 'center',
          closeOnClickModal: true,
          closeOnPressEscape: true,
          updatePositionOnResize: true
        };
      }
    },

    methods: {
      getDOM() {
        return this.$el;
      }
    }
  }
</script>
<style>
  .d-dialog {
    position: fixed;
    background: #fff;
    border-radius: 3px;
  }

  .d-dialog-header {
    border-bottom: 1px solid #e9e9e9;
    padding: 10px 8px;
  }

  .d-dialog-close {
    cursor: pointer;
  }

  .d-dialog-title {
    font-weight: bold;
  }

  .d-dialog-body {
    padding: 10px;
  }

  .d-dialog-header-buttons {
    float: right;
  }

  .d-dialog-footer {
    border-top: 1px solid #e9e9e9;
    padding: 10px;
    text-align: right;
  }

  .d-dialog-footer .btn {
    min-width: 40px;
  }
</style>
