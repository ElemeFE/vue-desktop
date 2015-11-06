<template>
  <div class="notification" transition="fade" :style="{ top: top ? top + 'px' : 'auto' }" @mouseenter="clearTimer()" @mouseleave="startTimer()">
    <div class="icon fa {{iconClass}}"></div>
    <div class="group">
      <span>{{title}}</span>
      <p>{{message}}</p>
      <div class="closeBtn fa fa-times" @click="handleClose()"></div>
    </div>
  </div>
</template>

<style>
  .notification {
    display: inline-block;
    width: 320px;
    padding: 15px;
    box-sizing: border-box;
    border: solid 1px #eee;
    border-radius: 10px;
    position: fixed;
    right: 25px;
    background-color: #f8f8f8;
    transition: opacity 0.2s, top 0.2s;
    overflow: hidden;
  }

  .notification .group {
    float: left;
    display: inline-block;
    width: 230px;
    color: #333;
  }

  .notification .icon {
    display: inline-block;
    box-sizing: border-box;
    height: 48px;
    line-height: 42px;
    text-align: center;
    width: 48px;
    border: solid 3px;
    border-radius: 50%;
    font-size: 30px;
    float: left;
    margin-right: 10px;
  }

  .notification .success {
    color: #87d068;
    border-color: #87d068;
  }

  .notification .error {
    color: #f60;
    border-color: #f60;
  }

  .notification .info {
    color: #2db7f5;
    border-color: #2db7f5;
  }

  .notification .warning {
    color: #fac450;
    border-color: #fac450;
  }

  .notification span {
    font-size: 16px;
  }

  .notification p {
    font-size: 14px;
    margin: 5px 0 0 0;
  }

  .notification .closeBtn {
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
  }

  .fade-leave {
    opacity: 0;
  }
</style>

<script type="text/ecmascript-6" lang="babel">

  export default {
    data() {
      return {
        title: '',
        message: '',
        duration: 5,
        type: 'info',
        callback: null,

        closed: false,
        top: null,
        timer: null
      }
    },

    watch: {
      closed(newVal) {
        if (newVal) {
          this.$destroy(true);
        }
      }
    },

    computed: {
      iconClass() {
        switch(this.type) {
          case 'success':
            return 'fa-check success';
            break;
          case 'warning':
            return 'fa-exclamation warning';
            break;
          case 'error':
            return 'fa-times error';
            break;
          default:
            return 'fa-info info';
        }
      }
    },

    methods: {
      handleClose() {
        this.closed = true;
        if (this.callback) {
          this.callback();
        }
      },

      clearTimer() {
        clearTimeout(this.timer);
      },

      startTimer() {
        var self = this;
        this.timer = setTimeout(function() {
          if (!self.closed) {
            self.handleClose();
          }
        }, this.duration * 1000);
      }
    },

    ready() {
      var self = this;
      this.timer = setTimeout(function() {
        if (!self.closed) {
          self.handleClose();
        }
      }, this.duration * 1000);
    }
  }
</script>