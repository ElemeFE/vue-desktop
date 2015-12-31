<template>
  <div class='d-field d-radiogroupfield' :class="{ 'validate-error': hintType === 'error', required: isRequired }">
    <label :style="{ width: labelWidth != null ? labelWidth + 'px' : '' }" v-show="!hideLabel">{{ label || '' }}</label>
    <div>
      <d-radio-group :value.sync="editorValue" v-ref:group><d-radio v-for="(key, val) in mapping" :value="val">{{key}}</d-radio><slot></slot></d-radio-group>
      <div class="d-field-hint" v-if="!hideHint">
        <i class='d-icon' :class="{ 'd-icon-error': hintType === 'error', 'd-icon-warning': hintType === 'warning' }"></i>{{ hintMessage || '' }}
      </div>
    </div>
  </div>
</template>

<style>
  .d-radiogroupfield .d-radio-group {
    line-height: 30px;
  }

  .d-radiogroupfield .d-radio-group input {
    height: 24px;
  }
</style>

<script type="text/ecmascript-6">
  import { merge } from '../../util';
  import { default as common } from './field-common';

  export default {
    props: merge({}, common.props),

    computed: merge({
      $radioName() {
        return this.$refs.group.$radioName;
      },
      $setValue() {
        return this.$refs.group.$setValue;
      },
      editorValue: {
        get() {
          if (this.model && this.property) {
            return this.model[this.property];
          }
        },
        set(newValue) {
          if (this.model && this.property) {
            this.model[this.property] = newValue;
          }
        }
      }
    }, common.computed),

    components: {
      DRadioGroup: require('../radio-group.vue'),
      DRadio: require('../radio.vue')
    },

    events: common.events,

    created: common.onCreated,

    compiled: common.onCompiled,

    methods: merge({}, common.methods)
  };
</script>