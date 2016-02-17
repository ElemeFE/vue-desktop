<template>
  <div class='d-field d-selectfield' :class="{ 'validate-error': hintType === 'error', required: isRequired }">
    <label :style="{ width: labelWidth != null ? labelWidth + 'px' : '' }" v-show="!hideLabel">{{ labelText }}</label>
    <div class="d-field-content" :style="{ marginLeft: labelWidth != null ? labelWidth + 'px' : '' }">
      <div class="d-labelfield-content">
        {{ textValue }}
      </div>
      <div class="d-field-hint" v-if="!hideHint">
        <i class='d-icon' :class="{ 'd-icon-error': hintType === 'error', 'd-icon-warning': hintType === 'warning' }"></i>{{ hintMessage || '' }}
      </div>
    </div>
  </div>
</template>

<style>
  .d-labelfield {
    min-height: 44px;
  }

  .d-labelfield-content {
    font-size: 14px;
    padding-left: 4px;
    padding-right: 24px;
    box-sizing: border-box;
    border-radius: 2px;
    line-height: 28px;
    height: 28px;
  }
</style>

<script type="text/ecmascript-6">
  import { merge, getPath } from '../../util';
  import { default as common } from './field-common';

  export default {
    props: common.props,

    computed: merge({
      textValue() {
        var mapping = this.mapping;
        if (mapping) {
          var reversedMap = {};

          for (var label in mapping) {
            if (mapping.hasOwnProperty(label)) {
              var value = mapping[label];
              reversedMap[value] = label;
            }
          }

          var currentValue = getPath(this.model, this.property);
          if (mapping && currentValue !== null && currentValue !== undefined) {
            return reversedMap[currentValue];
          }
        }

        return getPath(this.model, this.property);
      }
    }, common.computed),

    events: common.events,

    created: common.onCreated,

    destroyed: common.onDestroyed,

    compiled: common.onCompiled,

    methods: common.methods
  };
</script>