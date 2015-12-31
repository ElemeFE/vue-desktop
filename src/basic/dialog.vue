<template>
  <div class="d-dialog" :style="{ width: width + 'px' }" v-show="visible" transition="pop-bounce">
    <div class="d-dialog-header">
      <span class="d-dialog-title">{{title}}</span>
      <div class="d-dialog-header-buttons">
        <i class="d-dialog-close d-icon d-icon-close" @click='close()'></i>
      </div>
    </div>
    <div class="d-dialog-body"><slot></slot></div>
    <div class="d-dialog-footer"><slot name="dialog-footer"></slot></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Popup from 'vue-popup';
  require('vue-popup/lib/popup.css');

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
      },

      onOpen() {
        this.$broadcast('onresize');
      }
    }
  }
</script>
<style>
  .d-dialog {
    position: fixed;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }

  .d-dialog-header {
    border-bottom: 1px solid #e5e5e5;
    padding: 10px 8px;
  }

  .d-dialog-close {
    cursor: pointer;
  }

  .d-dialog-close:hover {
    color: #18a689;
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
    border-top: 1px solid #e5e5e5;
    padding: 10px;
    text-align: right;
  }

  .d-dialog-footer .btn {
    min-width: 40px;
  }
</style>
