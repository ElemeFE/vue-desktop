<template>
  <div class='d-field' :class="{ 'validate-error': hintType === 'error' }">
    <label>{{ label || '' }}</label>
    <div>
      <slot></slot>
      <div class="d-textfield-hint">
        <i class='iconfont' :class="{ 'icon-formfield-error': hintType === 'error', 'icon-formfield-warning': hintType === 'warning' }"></i>{{ hintMessage || '' }}
      </div>
    </div>
  </div>
</template>

<style>
  .d-field {
    position: relative;
  }

  .d-field > label {
    float: left;
    display: inline-block;
    width: 120px;
    height: 30px;
    font-size: 14px;
    margin-right: 20px;
    line-height: 30px;
    text-align: right;
    color: #666;
  }

  .d-field.validate-error input {
    border-color: #ff464c;
  }

  .d-field.validate-error .d-field-hint {
    color: #ff464c;
  }

  .d-field-hint {
    font-size: 12px;
    line-height: 20px;
    bottom: 5px;
  }

  .d-field-hint .icon-formfield-error {
    font-size: 14px;
    line-height: 14px;
    color: #ff464c;
  }

  .d-field-hint .icon-formfield-error:before {
    margin-right: 3px;
    vertical-align: middle;
  }

  .d-field-hint .icon-formfield-warning:before {
    line-height: 14px;
    font-size: 14px;
    color: #65c04b;
    margin-right: 3px;
    vertical-align: middle;
  }
</style>

<script type="text/ecmascript-6">
  var SchemaStore = require('../../schema/store');

  export default {
    props: {
      label: {
        type: String
      },
      hintType: {
        type: String,
        default: ''
      },
      hintMessage: {
        type: String
      }
    }
  };
</script>