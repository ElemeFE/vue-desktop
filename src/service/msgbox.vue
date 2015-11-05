<template>
  <div class="msgbox">
    <div class="msgbox-close icon-close" @click="handleAction('close')"></div>
    <div class="msgbox-content">
      <div class="msgbox-status iconfont icon-msgbox-warning"></div>
      <div class="msgbox-title">{{ title }}</div>
      <div class="msgbox-message">{{ message }}</div>
    </div>
    <div class="msgbox-btns">
      <button class="btn btn-primary btn-lg msgbox-confirm" @click="handleAction('confirm')">{{ confirmButtonText }}</button>
      <button class="msgbox-cancel" v-show="showCancelButton" @click="handleAction('cancel')">{{ cancelButtonText }}</button>
    </div>
  </div>
</template>

<style>
  .msgbox {
    position: fixed;
    background-color: #fff;
    width: 465px;
    padding: 50px;
  }

  .msgbox-close {
    display: inline-block;
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    color: #ccc;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
  }

  .msgbox-status {
    float: left;
    width: 36px;
    height: 36px;
    font-size: 36px;
  }

  .msgbox-status.icon-msgbox-success {
    color: #94c852;
  }

  .msgbox-status.icon-msgbox-warning {
    color: #ff9c00;
  }

  .msgbox-status.icon-msgbox-error {
    color: #ff4248;
  }

  .msgbox-title,
  .msgbox-message,
  .msgbox-btns {
    margin-left: 50px;
  }

  .msgbox-title {
    font-size: 18px;
    font-weight: bold;
    color: #666;
    margin-bottom: 8px;
  }

  .msgbox-message {
    color: #999;
    font-size: 14px;
    line-height: 24px;
  }

  .msgbox-btns {
    margin-top: 25px;
  }

  .msgbox-confirm {
    min-width: 112px;
  }

  .msgbox-cancel {
    text-decoration: underline;
    color: #999;
    background: transparent;
    border: 0;
    padding: 10px 20px;
    cursor: pointer;
  }

  .msgbox-cancel:focus {
    outline: none;
  }

</style>

<script type="text/ecmascript-6" lang="babel">
  var Popup = require('../basic/popup');
  var util = require('../util');

  var CONFIRM_TEXT = '确定';
  var CANCEL_TEXT = '取消';

  export default {
    methods: {
      getDOM: function() {
        if (!this.dom) {
          this.$mount();

          this.dom = this.$el;
        }

        return this.dom;
      },

      getPopupOptions: function() {
        return {
          target: 'center',
          modal: true,
          updatePositionOnResize: true,
          openAnimation: 'pop',
          closeDelay: 1,
          closeOnPressEscape: true,
          closeOnClickModal: true
        };
      },

      handleAction(action) {
        var callback = this.callback;
        this.close();
        callback(action);
      }
    },

    data() {
      return {
        title: '',
        message: '',
        type: '',
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: CONFIRM_TEXT,
        cancelButtonText: CANCEL_TEXT,
        confirmButtonClass: '',
        confirmButtonDisabled: false,
        cancelButtonClass: '',

        callback: null
      };
    }
  }
</script>