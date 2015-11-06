<template>
  <div class="msgbox">
    <div class="msgbox-header">
      <div class="msgbox-title">{{ title }}</div>
      <div class="msgbox-close icon-close" @click="handleAction('close')"></div>
    </div>
    <div class="msgbox-content">
      <div class="msgbox-status iconfont {{ type ? 'icon-msgbox-' + type : '' }}"></div>
      <div class="msgbox-message">{{ message }}</div>
    </div>
    <div class="msgbox-btns">
      <button class="btn btn-primary btn-lg msgbox-confirm" @click="handleAction('confirm')">{{ confirmButtonText }}</button>
      <button class="btn btn-lg msgbox-cancel" v-show="showCancelButton" @click="handleAction('cancel')">{{ cancelButtonText }}</button>
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
    border-bottom: 1px dashed #ddd;
  }

  .msgbox-content {
    padding: 30px 20px 10px 20px;
    min-height: 60px;
  }

  .msgbox-close {
    display: inline-block;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAByUDbMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NTc3MiwgMjAxNC8wMS8xMy0xOTo0NDowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Qjg5OEI5MDY1M0JFMTFFNTg2MDVGOTc4OThEQTJFMTkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Qjg5OEI5MDc1M0JFMTFFNTg2MDVGOTc4OThEQTJFMTkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozQTQwNzA2OTUzQjExMUU1ODYwNUY5Nzg5OERBMkUxOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozQTQwNzA2QTUzQjExMUU1ODYwNUY5Nzg5OERBMkUxOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pt0xtsMAAAGHSURBVHjanNTLK0RhGMfxMxyX8kcosrG0UFZuGxETdkhSjoVS2MhCsXBJKSVJw0gol0bIpXFLSVnJJVFKyT8hI75PPVOn05lz5szUZxbved/fOe/zvL0hy7IihmHcYsXI7JeHAxSY/F0iigTWAgblIoZiVEnYpg7KF35jK0DQNkpRiS9TH6wiG+v4xa5PkMzdQJkGfcqgaZuwrPuXwB/s+wRVyNbwkXxgOiYuIEc/vxnHLkFR/RoJerc/NF3ePKeLpLBNiOt4CEuo06A350IzxVZmkY89NOIKixpegxe3RaZHkSd0y4c40ZBaPKVakOXTtTE8ohUjuPea7Bc2redIujeF8kzDxtGHBnRoF+N6towgNRvFEOpxo2ODOj+utXtIJ2xYhXFtG/9Dv3b5TBvy7BU2oEUP6wLnTwItPYfnet5e3Womb51EC049aimBPfqyC5Q4w3oxgzYcpXFjyGXQpfWUK6woGdaNee1YLMBdJoHtuNPAQgmrRid2MrhlE7ob6WzkX4ABAE+4USc2gfN/AAAAAElFTkSuQmCC) no-repeat;
    position: absolute;
    top: 14px;
    right: 15px;
    width: 20px;
    height: 20px;
    cursor: pointer;
    color: #ccc;
    font-size: 12px;
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
    background-color: #d2d2d2;
    margin-right: 30px;
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