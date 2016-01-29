<template>
  <div class="btn-group" :class="{'btn-group-lg': size === 'large', 'btn-group-sm': size === 'small'}">
    <slot></slot>
  </div>
</template>

<style>
  .btn-group {
    display: inline-block;
    vertical-align: middle;
  }

  .btn-group .btn {
    padding: 4px 8px;
    float: left;
    border-radius: 0;
    margin-left: -1px;
  }

  .btn-group-lg .btn {
    font-size: 14px;
    padding: 4px 10px;
  }

  .btn-group-sm .btn {
    padding: 2px 6px;
  }

  .btn-group .btn:first-child {
    margin: 0;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  .btn-group .btn:last-child {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  .btn-group .btn-default:hover + .btn-default {
    border-left-color: #d2d2d2;
  }
</style>

<script type="text/ecmascript-6">
  export default {
    props: {
      size: {
        type: String,
        default: ''
      },
      selectionMode: {
        type: String,
        default: 'none'
      }
    },

    data() {
      return {
        selectedArr: []
      };
    },

    created() {
      this.$isButtonGroup = true;
    },

    events: {
      onButtonClick(button) {
        if (this.selectionMode !== 'none') {
          if (this.selectionMode === 'single') {
            this.selectedArr = [];
            var buttons = this.$el.querySelectorAll('button.btn');
            for (var i = 0, len = buttons.length; i < len; i++) {
              buttons[i].__vue__.selected = false;
            }
            if (button.selected) {
              button.selected = false;
            }
          }
          if (!button.selected) {
            this.selectedArr.push(button.value);
            button.selected = true;
          } else {
            this.selectedArr.splice(this.selectedArr.indexOf(button.value), 1);
            button.selected = false;
          }
          this.$emit('select', this.selectedArr);
        }
      }
    },

    ready() {
      if (this.selectionMode !== 'none') {
        var buttons = this.$el.querySelectorAll('button.btn');
        for (var i = 0, len = buttons.length; i < len; i++) {
          var btn = buttons[i];
          if (btn.__vue__.selected) {
            this.selectedArr.push(btn.__vue__.value);
          }
        }
        if (this.selectedArr.length === 0 && this.selectionMode === 'single') {
          buttons[0].__vue__.selected = true;
          this.selectedArr.push(buttons[0].__vue__.value);
        }
      }
    }
  };
</script>