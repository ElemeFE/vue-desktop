<template>
  <div class="btn" :class="{'btn-primary': type === 'primary', 'btn-phantom': type === 'phantom', 'btn-lg': size === 'large', 'btn-sm': size === 'small', 'disabled': disabled}">
    <slot></slot>
  </div>
</template>

<style>
  .btn {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 3px;
    border: solid 1px #ccc;
    background-color: #eee;
    font-size: 12px;
    font-family: 'Helvetica Neue', Helvetica, 'Hiragino Sans GB', 'Microsoft YaHei', SimSun, sans-serif;
    color: #333;
    text-decoration: none;
    line-height: 1.5;
    vertical-align: middle;
    cursor: pointer;
    transition: .3s;
  }

  .btn-primary {
    background-color: #0089dc;
    border-color: #0089dc;
    color: #fff;
  }

  .btn-phantom {
    background-color: #fff;
  }

  .btn:hover,
  .btn.btn-phantom:hover {
    background-color: #fff;
    color: #0089dc;
    border-color: #0089dc;
  }

  .btn.btn-primary:hover {
    background-color: #4bf;
    color: #fff;
    border-color: #4bf;
  }

  .btn-lg {
    font-size: 14px;
    padding: 4px 15px;
  }

  .btn-sm {
    padding: 2px 6px;
  }

  .btn.disabled,
  .btn.disabled:hover {
    cursor: not-allowed;
    color: #ccc;
    background-color: #eee;
    border-color: #ccc;
  }

  .btn .fa {
    color: #fff;
    margin-right: 2px;
  }
</style>

<script type="text/ecmascript-6">
  export default {
    props: {
      type: {
        type: String,
        default: ''
      },
      size: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String,
        default: ''
      }
    },
    ready() {
      if (this.icon !== '' && (this.icon.indexOf('fa-') > -1)) {
        var span = document.createElement('span');
        span.className = this.icon + ' fa';
        if (this.size !== 'small') {
          span.className += ' fa-lg';
        }
        this.$el.insertBefore(span, this.$el.childNodes[0]);
      }
    }
  }
</script>