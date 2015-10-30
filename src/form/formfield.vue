<template>
  <div class='formfield' :class="{ 'validate-error': isError }">
    <label>{{ label || '' }}</label>
    <div>
      <dyna-editor></dyna-editor>
      <slot></slot>
      <div class="formfield-hint">
        <i class='iconfont' :class="{ 'icon-formfield-error': isError, 'icon-formfield-warning': !isError }"></i>{{ hintMessage }}
      </div>
    </div>
    <!--<button @click="toggleError()">Toggle Error</button>-->
  </div>
</template>

<style>
  .formfield {
    position: relative;
  }

  .formfield > div > input {
    vertical-align: baseline;
    border: 1px solid #dedede;
    width: 300px;
    height: 30px;
    line-height: 30px;
    padding-left: 10px;
    border-radius: 2px;
  }

  .formfield > div > input:focus {
    border-color: #5cb6e6;
    outline: none;
  }

  .formfield > div > input::-webkit-input-placeholder {
    color: #bbb;
    font-size: 12px;
  }

  .formfield > div > input::-moz-placeholder {
    color: #bbb;
    font-size: 12px;
  }

  .formfield > div > input:-ms-input-placeholder {
    color: #bbb;
    font-size: 12px;
  }

  .formfield > div > input::placeholder {
    color: #bbb;
    font-size: 12px;
  }

  .formfield > label {
    float: left;
    display: inline-block;
    width: 120px;
    height: 38px;
    margin-right: 20px;
    line-height: 38px;
    text-align: right;
    color: #666;
  }

  .formfield.validate-error input {
    border-color: #ff464c;
  }

  .formfield.validate-error .formfield-hint {
    color: #ff464c;
  }

  .formfield-hint {
    font-size: 12px;
    line-height: 20px;
    bottom: 5px;
  }

  .formfield-hint .icon-formfield-error {
    font-size: 14px;
    line-height: 14px;
    color: #ff464c;
  }

  .formfield-hint .icon-formfield-error:before {
    margin-right: 3px;
    vertical-align: middle;
  }

  .formfield-hint .icon-formfield-warning:before {
    line-height: 14px;
    font-size: 14px;
    color: #65c04b;
    margin-right: 3px;
    vertical-align: middle;
  }
</style>

<script type="text/ecmascript-6">
  var FormModel = require('./form-model');

  export default {
    props: {
      model: {
        default() {
          return {}
        }
      },
      property: {},
      schema: {},
      label: { type: String },
      isError: {},
      hintMessage: { type: String }
    },

    components: {
      dynaEditor: {
        inherit: true,
        template: '',
        created() {
          var parent = this.$parent;
          var bindProperty = '$parent.model.' + parent.property;
          console.log(bindProperty);
          this.$options.template = `<input type="text" v-model="${ bindProperty }" />`;
        }
      }
    },

    compiled() {
      var bindProperty = 'model.' + this.property;
      var self = this;

      this.$watch(bindProperty, function() {
        self.validate();
      });
    },

    methods: {
      validate() {
        var model = this.model;
        if (model && !model.$validate) {
          FormModel(model);
          model.$validators = this.schema || {};
        }
        model.$validateProperty(this.property);

        this.isError = model.$hintTypes[this.property] === 'error';
        this.hintMessage = model.$hints[this.property];
      },
      toggleError() {
        this.isError = !this.isError;
      }
    }
  };
</script>