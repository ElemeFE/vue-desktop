<template>
  <div class="d-dialog" :style="{ width: width + 'px' }" :class="{ hidden: !show }">
    <div class="d-dialog-header">
      <span class="d-dialog-title">{{title}}</span>
      <div class="d-dialog-header-buttons">
        <i class="d-dialog-close fa fa-close" @click='hide'></i>
      </div>
    </div>
    <div class="d-dialog-body"><slot></slot></div>
    <div class="d-dialog-footer"><slot name="dialog-footer"></slot></div>
  </div>
</template>

<script type="text/ecmascript-6" lang="babel">
  var domUtil = require('wind-dom');
  var Popup = require('./popup');

  export default {
    props: {
      title: {
        type: String,
        default: ''
      },

      show: {
        require: true,
        type: Boolean,
        default: false,
        twoWay: true
      },

      width: {
        default: 600
      },

      callback: {
        type: Function,
        default: function () {
        }
      },

      effect: {
        type: String,
        default: 'fade'
      }
    },

    compiled() {
      Popup(this);
    },

    watch: {
      show(val) {
        var self = this;
        if (val) {
          setTimeout(function () {
            self.open();
          }, 0);
        } else {
          this.close();
        }
      }
    },

    methods: {
      hide() {
        this.close();
      },

      onClose() {
        this.show = false;
      },

      getDOM() {
        return this.$el;
      },

      getPopupOptions() {
        return {
          hideOnPressEscape: true,
          modal: true,
          target: 'center',
          closeOnClickModal: true
        };
      }
    }
  }
</script>
<style>
  .hidden {
    display: none;
  }

  .d-dialog {
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
