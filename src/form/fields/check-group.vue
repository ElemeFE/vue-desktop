<template>
  <div class='d-field d-checkgroupfield' :class="{ 'validate-error': hintType === 'error', required: isRequired, 'd-field-hashint': !hideHint }">
    <label :style="{ width: labelWidth != null ? labelWidth + 'px' : '' }" v-show="!hideLabel">{{ labelText }}</label>
    <div class="d-field-content" :style="{ marginLeft: labelWidth != null ? labelWidth + 'px' : '' }">
      <span class="{{ checkboxClass }}" v-for="(key, val) in mapping">
        <d-checkbox :value="selectedValue && selectedValue.indexOf(val) !== -1 ? val : false"
          :true-value="val" :label="key" @change="handleValueChange"></d-checkbox>
      </span>
      <div class="d-field-hint" v-if="!hideHint">
        <i class='d-icon' :class="{ 'd-icon-error': hintType === 'error', 'd-icon-warning': hintType === 'warning' }"></i>{{ hintMessage || '' }}
      </div>
    </div>
  </div>
</template>

<style>
  .d-checkgroupfield {
  }
</style>

<script type="text/ecmascript-6">
  import { merge, getPath, setPath } from '../../util';
  import { default as common } from './field-common';

  export default {
    props: merge({
      cols: {
        type: Number
      }
    }, common.props),

    computed: merge({
      selectedValue: {
        get() {
          if (this.model && this.property) {
            return getPath(this.model, this.property);
          }
          return [];
        },
        set(newValue) {
          if (this.model && this.property) {
            setPath(this.model, this.property, newValue);
          }
        }
      },

      checkboxClass() {
        let cols = this.cols;
        if (cols >= 1 && cols <= 6) {
          return `d-cell-1-${cols}`;
        }
        return '';
      }
    }, common.computed),

    components: {
      DCheckbox: require('../checkbox.vue')
    },

    events: common.events,

    created: common.onCreated,

    destroyed: common.onDestroyed,

    compiled: common.onCompiled,

    methods: merge({
      handleValueChange(checkbox, checked) {
        const trueValue = checkbox.trueValue;
        let selectedValue = this.selectedValue;
        if (!selectedValue) {
          selectedValue = this.selectedValue = [];
        }
        if (checked) {
          if (selectedValue.indexOf(trueValue) === -1) {
            selectedValue.push(trueValue);
          }
        } else {
          selectedValue.splice(selectedValue.indexOf(trueValue), 1);
        }
      }
    }, common.methods)
  };
</script>