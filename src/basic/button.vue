<template>
  <button class="btn {{btnClasses}}">
    <slot></slot>
  </button>
</template>

<style>
  .btn {
    outline: none;
    display: inline-block;
    text-align: center;
    padding: 4px 12px;
    border-radius: 3px;
    border-style: solid;
    border-width: 1px;
    font-size: 12px;
    font-family: 'Helvetica Neue', Helvetica, 'Hiragino Sans GB', 'Microsoft YaHei', SimSun, sans-serif;
    text-decoration: none;
    line-height: 1.5;
    vertical-align: middle;
    cursor: pointer;
    transition: .3s;
    background-color: #fff;
    border-color: #e7eaec;
    color: #676a6c;
  }

  .btn:hover {
    border-color: #d2d2d2;
  }

  .btn-primary {
    color: #fff;
    background-color: #1ab394;
    border-color: #1ab394;
  }

  .btn.btn-primary:hover {
    background-color: #18a689;
    border-color: #18a689;
  }

  .btn-success {
    color: #fff;
    background-color: #1c84c6;
    border-color: #1c84c6;
  }

  .btn.btn-success:hover {
    background-color: #1a7bb9;
    border-color: #1a7bb9;
  }

  .btn-info {
    color: #fff;
    background-color: #23c6c8;
    border-color: #23c6c8;
  }

  .btn.btn-info:hover {
    background-color: #21b9bb;
    border-color: #21b9bb;
  }

  .btn-warning {
    color: #fff;
    background-color: #f8ac59;
    border-color: #f8ac59;
  }

  .btn.btn-warning:hover {
    background-color: #f7a54a;
    border-color: #f7a54a;
  }

  .btn-danger {
    color: #fff;
    background-color: #ed5565;
    border-color: #ed5565;
  }

  .btn.btn-danger:hover {
    background-color: #ec4758;
    border-color: #ec4758;
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

<script type="text/ecmascript-6" lang="babel">
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
      },
      value: {},
      selected: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      btnClasses() {
        var classes = [ this.selected ? this.selectedClass : 'btn-default' ];

        if (this.type) {
          classes.push('btn-' + this.type);
        }

        if (this.size === 'large') {
          classes.push('btn-lg');
        } else if (this.size === 'small') {
          classes.push('btn-sm');
        }

        if (this.disabled) {
          classes.push('disabled');
        }

        return classes.join(' ');
      }
    },

    data() {
      return {
        selectedClass: 'btn-primary'
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
      if (this.$parent.$isButtonGroup) {
        if (!this.value) {
          this.value = this.$el.textContent.trim();
        }
        this.$el.addEventListener('click', () => {
          this.$dispatch('onButtonClick', this);
        });
      }
    }
  }
</script>