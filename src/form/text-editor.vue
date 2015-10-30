<template>
  <span class="d-text-editor {{size}}">
    <input type="text" v-el:editor placeholder="{{placeholder}}" readonly="{{readonly}}"/>
    <!--<span @click="showSelect()">X</span>-->
  </span>
</template>

<style>
  .d-text-editor {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 2px;
  }

  .d-text-editor input {
    line-height: 18px;
    padding: 2px 2px;
    width: 100%;
    border: 0;
    box-sizing: border-box;
  }

  .d-text-editor input:focus {
    outline: none;
  }

  .d-text-editor.lg input {
    padding: 6px 4px;
  }

  .d-text-editor.sm input {
    padding: 1px 1px;
  }

  .d-text-editor .datepicker{
    position: absolute;
    top: 40px;
    left: 0;
    z-index: 1;
  }
</style>

<script type="text/ecmascript-6">
  var Vue = require('vue');

  export default {
    props: {
      size: {
        type: String
      },

      readonly: {
        type: Boolean,
        default: false
      },

      placeholder: {
        type: String
      }
    },

    methods: {
      showSelect() {
        var Select = require('./select.vue');

        if (!this.picker) {
          var pickerEl = document.createElement('div');

          this.picker = new Vue(Object.assign({ el: pickerEl, replace: true,
          }, Select));

          this.picker.mapping = [
            { label: '11', value: 11 },
            { label: '11', value: 11 },
            { label: '11', value: 11 }
          ];

          this.picker.$appendTo(this.$el);

          var self = this;
          this.picker.$on('pick', function(arg) {
            self.picker.$el.style.display = 'none';
            self.$els.editor.value = arg.date;
          });
        } else {
          this.picker.$el.style.display = '';
        }
      },

      showDatePicker() {
        var DatePicker = require('./date-picker.vue');

        if (!this.picker) {
          var pickerEl = document.createElement('div');

          this.picker = new Vue(Object.assign({ el: pickerEl, replace: true }, DatePicker));

          this.picker.$appendTo(this.$el);
          var self = this;
          this.picker.$on('pick', function(arg) {
            self.picker.$el.style.display = 'none';
            self.$els.editor.value = arg.date;
          });
        } else {
          this.picker.$el.style.display = '';
        }
      }
    }
  }
</script>