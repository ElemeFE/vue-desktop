<template>
  <span class="d-text-editor {{size}} {{ haveTrigger ? 'have-trigger' : '' }} {{ pickerVisible ? 'active' : '' }}">
    <editor></editor>
    <span @click="toggleDatePicker()" class="d-text-editor-trigger d-icon d-icon-date-trigger" v-if="haveTrigger"></span>
  </span>
</template>

<style>
  .d-text-editor {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
  }

  .d-text-editor.have-trigger input {
    padding-right: 20px;
  }

  .d-text-editor input,
  .d-text-editor textarea {
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
    border: 1px solid #e5e6e7;
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
    border: 1px solid #e5e6e7;
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
    border-color: #1ab394;
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

<script type="text/ecmascript-6">
  var Vue = require('vue');
  var domUtil = require('wind-dom');
  import { merge, formatDate, parseDate } from '../util';
  import { default as Dropdown } from '../service/dropdown';

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

      value: {},

      height: {},

      lazy: {
        type: Boolean,
        default: false
      }
    },

    watch: {
      pickerVisible(newVal) {
        if (newVal === true) {
          Dropdown.open(this);
        } else {
          Dropdown.close(this);
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
            return formatDate(value, this.format || (this.type === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm'));
          }
          return value;
        },
        set(value) {
          if (this.type === 'date' && !(value instanceof Date)) return;
          if (this.type === 'number') {
            if (value === null || value === undefined || value === '') {
              this.value = null;
              return;
            }

            value = Number(value);
            if (!isNaN(value)) {
              this.value = value;
            }

            return;
          }
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
          var lazy = parent.lazy;
          if (type === 'date' || type === 'number') {
            this.$options.template = `<input @focus="$parent.handleFocus" @blur="$parent.handleBlur" lazy @change="$parent.handleChange($event)" @focus="$parent.handleFocus()" type="${parent.editorType}" v-model="$parent.visualValue" placeholder="{{$parent.placeholder}}" readonly="{{$parent.readonly}}" :style="{ height: $parent.height ? $parent.height + 'px' : '' }"/>`;
          } else if (type !== 'textarea') {
            this.$options.template = `<input @focus="$parent.handleFocus" @blur="$parent.handleBlur" ${lazy ? 'lazy' : ''} type="${parent.editorType}" v-model="$parent.visualValue" placeholder="{{$parent.placeholder}}" :style="{ height: $parent.height ? $parent.height + 'px' : '' }" readonly="{{$parent.readonly}}" />`;
          } else {
            this.$options.template = `<textarea @focus="$parent.handleFocus" @blur="$parent.handleBlur" ${lazy ? 'lazy' : ''} placeholder="{{$parent.placeholder}}" readonly="{{$parent.readonly}}" v-model="$parent.visualValue" :style="{ height: $parent.height ? $parent.height + 'px' : '' }"></textarea>`;
          }
        }
      }
    },

    methods: {
      handleChange(event) {
        var value = event.target.value;
        var type = this.type;
        if (type === 'date' || type === 'datetime') {
          if (value) {
            var parsedValue = parseDate(value, this.format || (type === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm'));

            if (parsedValue) {
              this.value = parsedValue;
            }
          }
          this.hideDatePicker();
        } else if (type === 'number') {
          if (value === undefined || value === null || value === '') {
            this.value = null;
            return;
          }

          value = Number(value);
          if (!isNaN(value)){
            this.value = value;
          }
        }
      },

      handleFocus() {
        var type = this.type;
        if (type === 'date') {
          if (!this.pickerVisible) {
            this.showDatePicker();
          }
        }
        this.$emit('focus', this);
      },

      handleBlur() {
        this.$emit('blur', this);
      },

      onDocumentClick() {
        this.hideDatePicker();
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
          this.picker.resetView && this.picker.resetView();
          this.picker.$el.style.display = 'none';
          this.pickerVisible = false;
        }
      },

      showDatePicker() {
        var DatePicker = require('./date-picker.vue');

        if (!this.picker) {
          var pickerEl = document.createElement('div');
          this.picker = new Vue(merge({ el: pickerEl, replace: true }, DatePicker));
          this.picker.showTime = this.type === 'datetime';
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