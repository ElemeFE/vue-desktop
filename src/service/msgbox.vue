<template>
  <div class="msgbox" v-show="visible" transition="pop-bounce">
    <div class="msgbox-header">
      <div class="msgbox-title">{{ title }}</div>
      <div class="msgbox-close d-icon icon-close" @click="handleAction('close')"></div>
    </div>
    <div class="msgbox-content">
      <div class="msgbox-status d-icon {{ type ? 'icon-' + type : '' }}"></div>
      <div class="msgbox-message">{{ message }}</div>
    </div>
    <div class="msgbox-btns">
      <button class="btn btn-primary btn-lg msgbox-confirm {{confirmButtonClass}}" v-show="showConfirmButton" @click="handleAction('confirm')">{{ confirmButtonText }}</button>
      <button class="btn btn-lg msgbox-cancel {{cancelButtonClass}}" v-show="showCancelButton" @click="handleAction('cancel')">{{ cancelButtonText }}</button>
    </div>
  </div>
</template>

<style>
  .msgbox {
    position: fixed;
    background-color: #fff;
    width: 414px;
    min-height: 220px;
    border-radius: 3px;
  }

  .msgbox-header{
    padding: 15px 20px 5px 10px;
    border-bottom: 1px dashed #e5e5e5;
  }

  .msgbox-content {
    padding: 30px 20px 10px 20px;
    min-height: 60px;
  }

  .msgbox-close {
    display: inline-block;
    position: absolute;
    top: 14px;
    right: 15px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    line-height: 20px;
    text-align: center;
  }

  .msgbox-title {
    padding-left: 10px;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
  }

  .msgbox-status {
    float: left;
    width: 36px;
    height: 36px;
    font-size: 36px !important;
  }

  .msgbox-status.icon-success {
    color: #94c852;
  }

  .msgbox-status.icon-warning {
    color: #ff9c00;
  }

  .msgbox-status.icon-error {
    color: #ff4248;
  }

  .msgbox-message {
    color: #333;
    font-size: 16px;
    line-height: 36px;
    margin-left: 36px;
    margin-right: 36px;
    text-align: center;
  }

  .msgbox-btns {
    margin: 18px 0;
    text-align: center;
  }

  .msgbox-confirm {
    min-width: 100px;
  }

  .msgbox-cancel {
    min-width: 100px;
    margin-right: 30px;
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  var CONFIRM_TEXT = '确定';
  var CANCEL_TEXT = '取消';

  import Popup from 'vue-popup';
  require('vue-popup/lib/popup.css');

  export default {
    mixins: [ Popup ],

    computed: {
      popupOptions() {
        return {
          target: 'center',
          modal: true,
          updatePositionOnResize: true,
          openAnimation: 'pop',
          closeDelay: 1,
          closeOnPressEscape: true,
          closeOnClickModal: true
        };
      }
    },

    methods: {
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