<template>
  <span class="d-text-editor {{size}} {{ haveTrigger ? 'have-trigger' : '' }} {{ pickerVisible ? 'active' : '' }}" @click="$event.stopPropagation()">
    <editor></editor>
    <span @click="toggleDatePicker()" class="d-text-editor-trigger d-icon icon-editor-date-trigger" v-if="haveTrigger"></span>
  </span>
</template>

<style>
  .d-text-editor {
    position: relative;
    display: table;
    box-sizing: border-box;
  }

  .d-text-editor.have-trigger input {
    padding-right: 20px;
  }

  .d-text-editor input,
  .d-text-editor textarea {
    display: table-cell;
    width: 100%;
  }

  .d-text-editor .d-text-editor-trigger {
    cursor: pointer;
    position: absolute;
    display: inline-block;
    width: 20px;
    right: 0;
    top: 0;
    bottom: 0;
    line-height: 28px;
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
  .d-text-editor textarea:focus,
  .d-text-editor.active input,
  .d-text-editor.active textarea {
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
    top: 30px;
    left: 0;
    z-index: 1;
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  var Vue = require('vue');
  var fecha = require('fecha');
  var merge = require('../util').merge;
  var domUtil = require('wind-dom');

  export default {
    props: {
      type: {
        type: String,
        default: 'text'
      },

      format: {
        type: String
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

    watch: {
      pickerVisible(newVal) {
        if (newVal === true) {
          var self = this;
          domUtil.once(document, 'click', function(event) {
            console.log('click on document');
            var target = event.target;
            if (target === self.$el || self.$el.contains(target)) {
              return;
            }
            self.hideDatePicker();
          });
        }
      }
    },

    computed: {
      haveTrigger() {
        return this.type === 'date' || this.type === 'datetime';
      },

      visualValue: {
        get() {
          var value = this.value;
          if (value instanceof Date) {
            return fecha.format(value, this.format || 'YYYY-MM-DD');
          }
          return value;
        },
        set(value) {
          if (this.type === 'date' && !(value instanceof Date)) return;

          this.value = value;
        }
      },

      editorType() {
        return this.type === 'password' ? 'password' : 'text';
      }
    },

    data() {
      return {
        pickerVisible: false
      }
    },

    components: {
      editor: {
        inherit: true,
        template: '',
        created() {
          var parent = this.$parent;
          var type = parent.type;
          if (type === 'date') {
            this.$options.template = `<input lazy @change="$parent.handleChange($event)" @focus="$parent.handleFocus()" type="${parent.editorType}" v-model="$parent.visualValue" placeholder="{{$parent.placeholder}}" readonly="{{$parent.readonly}}" />`;
          } else if (type !== 'textarea') {
            this.$options.template = `<input type="${parent.editorType}" v-model="$parent.visualValue" placeholder="{{$parent.placeholder}}" readonly="{{$parent.readonly}}" />`;
          } else {
            this.$options.template = `<textarea placeholder="{{$parent.placeholder}}" readonly="{{$parent.readonly}}" v-model="$parent.visualValue"></textarea>`;
          }
        }
      }
    },

    methods: {
      handleChange(event) {
        var value = event.target.value;
        if (value) {
          var parsedValue = fecha.parse(value, this.format || 'YYYY-MM-DD');

          if (parsedValue) {
            this.value = parsedValue;
          }
        }
        this.hideDatePicker();
      },

      handleFocus() {
        if (!this.pickerVisible) {
          this.showDatePicker();
        }
      },

      toggleDatePicker() {
        if (!this.pickerVisible) {
          this.showDatePicker();
        } else {
          this.hideDatePicker();
        }
      },

      hideDatePicker() {
        if (this.picker) {
          this.picker.$el.style.display = 'none';
          this.pickerVisible = false;
        }
      },

      showDatePicker() {
        var DatePicker = require('./date-picker.vue');

        if (!this.picker) {
          var pickerEl = document.createElement('div');
          this.picker = new Vue(merge({ el: pickerEl, replace: true }, DatePicker));
          this.picker.$appendTo(this.$el);

          var self = this;

          this.pickerVisible = true;

          this.picker.$on('pick', function(arg) {
            self.picker.$el.style.display = 'none';
            self.visualValue = arg.date;
            self.pickerVisible = false;
          });
        } else {
          this.picker.$el.style.display = '';
          this.pickerVisible = true;
          if (this.value instanceof Date) {
            this.picker.date = this.value;
          }
        }
      }
    }
  }
</script>