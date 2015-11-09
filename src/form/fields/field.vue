<template>
  <div class='d-field' :class="{ 'validate-error': hintType === 'error' }">
    <label>{{ label || '' }}</label>
    <div>
      <slot></slot>
      <div class="d-field-hint">
        <i class='d-icon' :class="{ 'icon-formfield-error': hintType === 'error', 'icon-formfield-warning': hintType === 'warning' }"></i>{{ hintMessage || '' }}
      </div>
    </div>
  </div>
</template>

<style>
  .d-field {
    position: relative;
    display: table;
  }

  .d-field::after {
    content: "";
    display: table;
    clear: both;
  }

  .d-field > label {
    display: table-cell;
    float: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 120px;
    height: 30px;
    font-size: 14px;
    margin-right: 10px;
    line-height: 30px;
    text-align: right;
    color: #666;
  }

  .d-field > div {
    display: table-cell;
    width: 100%;
    vertical-align: top;
  }

  .d-field.validate-error input {
    border-color: #ff464c;
  }

  .d-field.validate-error .d-field-hint {
    color: #ff464c;
  }

  .d-field-hint {
    font-size: 12px;
    line-height: 16px;
    height: 16px;
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

<script type="text/ecmascript-6" lang="babel">
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