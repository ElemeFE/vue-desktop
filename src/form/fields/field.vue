<template>
  <div class='d-field' :class="{ 'validate-error': hintType === 'error', required: isRequired }">
    <label :style="{ width: labelWidth != null ? labelWidth + 'px' : '' }" v-show="!hideLabel">{{ labelText }}</label>
    <div class="d-field-content" :style="{ marginLeft: labelWidth != null ? labelWidth + 'px' : '' }">
      <slot></slot>
      <div class="d-field-hint" v-if="!hideHint">
        <i class='d-icon' :class="{ 'd-icon-error': hintType === 'error', 'd-icon-warning': hintType === 'warning' }"></i>{{ hintMessage || '' }}
      </div>
    </div>
  </div>
</template>

<style>
  .d-field {
    position: relative;
    width: 300px;
  }

  .d-field.required > label::before {
    content: '*';
    color: #ed5565;
    margin-right: 2px;
  }

  .d-field::after {
    content: "";
    display: table;
    clear: both;
  }

  .d-field > label {
    float: left;
    white-space: nowrap;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 120px;
    height: 30px;
    padding-right: 10px;
    font-size: 14px;
    line-height: 30px;
    text-align: right;
    color: #666;
  }

  .d-field-content {
    vertical-align: top;
  }

  .d-field.validate-error input {
    border-color: #ed5565;
  }

  .d-field.validate-error .d-field-hint {
    color: #ed5565;
  }

  .d-field-hint {
    font-size: 12px;
    line-height: 16px;
    height: 16px;
  }

  .d-field-hint .d-icon {
    vertical-align: top;
  }

  .d-field-hint .d-icon-error {
    font-size: 14px;
    line-height: 14px;
    color: #ed5565;
  }

  .d-field-hint .d-icon-error:before {
    margin-right: 3px;
    vertical-align: middle;
  }

  .d-field-hint .d-icon-warning:before {
    line-height: 14px;
    font-size: 14px;
    color: #65c04b;
    margin-right: 3px;
    vertical-align: middle;
  }
</style>

<script type="text/ecmascript-6">
  import { merge } from '../../util';
  import { default as common } from './field-common';

  export default {
    props: common.props,

    created: common.onCreated,

    compiled: common.onCompiled,

    destroyed: common.onDestroyed,

    computed: merge({}, common.computed)
  };
</script>