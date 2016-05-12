<template>
  <div class="notification" transition="fade" :style="{ top: top ? top + 'px' : 'auto' }" @mouseenter="clearTimer()" @mouseleave="startTimer()">
    <div class="icon d-icon {{iconClass}}"></div>
    <div class="group">
      <span>{{title}}</span>
      <p>{{message}}</p>
      <div class="closeBtn d-icon icon-close" @click="handleClose()"></div>
    </div>
  </div>
</template>

<style>
  .notification {
    display: inline-block;
    width: 320px;
    padding: 15px;
    box-sizing: border-box;
    border-radius: 4px;
    position: fixed;
    right: 25px;
    background-color: #fff;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: opacity 0.2s, top 0.2s;
    overflow: hidden;
    z-index: 100;
  }

  .notification .group {
    float: left;
    display: inline-block;
    width: 230px;
    color: #666;
  }

  .notification .icon {
    display: inline-block;
    box-sizing: border-box;
    height: 48px;
    line-height: 42px;
    text-align: center;
    width: 48px;
    font-size: 46px;
    float: left;
    margin-right: 10px;
  }

  .notification .success {
    color: #87d068;
  }

  .notification .error {
    color: #f60;
  }

  .notification .info {
    color: #2db7f5;
  }

  .notification .warning {
    color: #fac450;
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
            return 'icon-success success';
            break;
          case 'warning':
            return 'icon-warning warning';
            break;
          case 'error':
            return 'icon-error error';
            break;
          default:
            return 'icon-info info';
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
        if (this.duration > 0) {
          this.timer = setTimeout(function() {
            if (!self.closed) {
              self.handleClose();
            }
          }, this.duration * 1000);
        }
      }
    },

    ready() {
      var self = this;
      if (this.duration > 0) {
        this.timer = setTimeout(function() {
          if (!self.closed) {
            self.handleClose();
          }
        }, this.duration * 1000);
      }
    }
  }
</script>