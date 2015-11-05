<template>
  <span class="d-text-editor {{size}}">
    <editor v-ref:editor></editor>
    <!--<span @click="showDatePicker()">X</span>-->
  </span>
</template>

<style>
  .d-text-editor {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
  }

  .d-text-editor input {
    border: 1px solid #dedede;
    border-radius: 2px;
    line-height: 18px;
    padding: 4px 2px;
    width: 100%;
    box-sizing: border-box;
    transition: border 0.3s;
  }

  .d-text-editor input::-webkit-input-placeholder {
    color: #bbb;
    font-size: 12px;
  }

  .d-text-editor input::-moz-placeholder {
    color: #bbb;
    font-size: 12px;
  }

  .d-text-editor input:-ms-input-placeholder {
    color: #bbb;
    font-size: 12px;
  }

  .d-text-editor input::placeholder {
    color: #bbb;
    font-size: 12px;
  }

  .d-text-editor textarea {
    border: 1px solid #dedede;
    border-radius: 2px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    resize: none;
    transition: border 0.3s;
  }

  .d-text-editor input:focus,
  .d-text-editor textarea:focus {
    outline: none;
    border-color: #5cb6e6;
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

<script type="text/ecmascript-6" lang="babel">
  var Vue = require('vue');

  export default {
    props: {
      type: {
        type: String,
        default: 'text'
      },

      size: {
        type: String,
        default: ''
      },

      readonly: {
        type: Boolean,
        default: false
      },

      placeholder: {
        type: String
      },

      value: {}
    },

    components: {
      editor: {
        inherit: true,
        template: '',
        created() {
          var parent = this.$parent;
          var type = parent.type;
          if (type !== 'textarea') {
            this.$options.template = `<input type="${parent.type}" v-model="$parent.value" placeholder="{{$parent.placeholder}}" readonly="{{$parent.readonly}}" />`;
          } else {
            this.$options.template = `<textarea placeholder="{{$parent.placeholder}}" readonly="{{$parent.readonly}}" v-model="$parent.value"></textarea>`;
          }
        }
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
            self.$refs.editor.value = arg.date;
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
            self.$refs.editor.value = arg.date;
          });
        } else {
          this.picker.$el.style.display = '';
        }
      }
    }
  }
</script>