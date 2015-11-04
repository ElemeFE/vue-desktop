<template>
  <div class="alert {{type}}" transition="alert" v-if="live">
    <i class="icon fa fa-lg {{iconClass}}"></i>
    <div class="group">
      <span>{{title}}</span>
      <p><slot></slot></p>
      <div class="alert-closeBtn" :class="{custom: closeText !== '', 'fa': closeText === '', 'fa-times': closeText === ''}" v-show="closable" @click="close()">{{closeText}}</div>
    </div>
  </div>
</template>

<style>
  .alert {
    display: inline-block;
    width: 100%;
    padding: 10px 20px;
    box-sizing: border-box;
    border: solid 1px #eee;
    border-radius: 10px;
    position: relative;
    background-color: #fff;
    overflow: hidden;
    transition: opacity .2s;
    opacity: 1;
  }

  .alert.success {
    background-color: #f3faf0;
  }

  .alert.error {
    background-color: #fff0e6;
  }

  .alert.info {
    background-color: #eaf8fe;
  }

  .alert.warning {
    background-color: #fff9ee;
  }

  .alert .group {
    float: left;
    display: inline-block;
  }

  .alert .icon {
    display: inline-block;
    box-sizing: border-box;
    height: 42px;
    line-height: 42px;
    text-align: center;
    width: 42px;
    border-radius: 50%;
    font-size: 18px;
    float: left;
    margin-right: 10px;
  }

  .alert .success {
    background-color: #87d068;
    color: #f3faf0;
  }

  .alert .error {
    background-color: #f60;
    color: #fff0e6;
  }

  .alert .info {
    background-color: #2db7f5;
    color: #eaf8fe;
  }

  .alert .warning {
    background-color: #fac450;
    color: #fff9ee;
  }

  .alert span {
    font-size: 15px;
    color: #666;
  }

  .alert p {
    color: #999;
    font-size: 12px;
    margin: 5px 0 0 0;
  }

  .alert .alert-closeBtn {
    font-size: 20px;
    position: absolute;
    transform: translateY(50%);
    bottom: 50%;
    right: 15px;
    cursor: pointer;
  }

  .alert .alert-closeBtn.custom {
    color: #0089dc;
    font-size: 15px;
  }

  .alert-leave {
    opacity: 0;
  }
</style>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '提示'
      },
      type: {
        type: String,
        default: 'info'
      },
      closable: {
        type: Boolean,
        default: false
      },
      closeText: {
        type: String,
        default: ''
      }
    },

    data() {
      return {
        live: true
      };
    },

    methods: {
      close() {
        this.live = false;
        this.$emit('close');
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
    }
  }
</script>