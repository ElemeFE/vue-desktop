<template>
  <div class="dialog" :style="{ width: width + 'px' }" :class="{ hidden: !show }">
    <div class="dialog-header">
      <span class="dialog-title">{{title}}</span>
      <div class="dialog-header-buttons">
        <button type="button" class="close" @click='hide'><span>&times;</span></button>
      </div>
    </div>
    <div class="dialog-body"><slot></slot></div>
    <div class="dialog-footer"><slot name="dialog-footer"></slot></div>
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
<style scoped>
  .hidden {
    display: none;
  }

  .dialog {
    border: 1px solid #ccc;
    background: #fff;
  }

  .dialog-header {
    border-bottom: 1px solid #ccc;
    padding: 5px;
  }

  .dialog-title {
    font-weight: bold;
  }

  .dialog-body {
    padding: 10px;
  }

  .dialog-header-buttons {
    float: right;
  }

  .dialog-footer {
    border-top: 1px solid #ccc;
    padding: 10px;
  }
</style>
