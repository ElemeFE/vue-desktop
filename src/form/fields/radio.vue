<template>
  <div class='d-field d-radiogroupfield' :class="{ 'validate-error': hintType === 'error', required: isRequired, 'd-field-hashint': !hideHint }">
    <label :style="{ width: labelWidth != null ? labelWidth + 'px' : '' }" v-show="!hideLabel">{{ labelText }}</label>
    <div class="d-field-content" :style="{ marginLeft: labelWidth != null ? labelWidth + 'px' : '' }">
      <d-radio-group :value.sync="editorValue" v-ref:group><d-radio v-for="(key, val) in mapping" :value="val">{{key}}</d-radio><slot></slot></d-radio-group>
      <div class="d-field-hint" v-if="!hideHint">
        <i class='d-icon' :class="{ 'd-icon-error': hintType === 'error', 'd-icon-warning': hintType === 'warning' }"></i>{{ hintMessage || '' }}
      </div>
    </div>
  </div>
</template>

<style>
  .d-radiogroupfield {
  }

  .d-radiogroupfield .d-radio-group {
    line-height: 30px;
  }

  .d-radiogroupfield .d-radio-group input {
    height: 24px;
  }
</style>

<script type="text/ecmascript-6">
  import { merge, getPath, setPath } from '../../util';
  import { default as common } from './field-common';
  import Vue from 'vue';

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
            return getPath(this.model, this.property);
          }
        },
        set(newValue) {
          if (this.model && this.property) {
            setPath(this.model, this.property, newValue);
          }
        }
      }
    }, common.computed),

    components: {
      DRadioGroup: require('../radio-group.vue'),
      DRadio: require('../radio.vue')
    },

    watch: {
      mapping() {
        let oldValue = this.$refs.group.value;
        this.$refs.group.value = null;
        Vue.nextTick(() => {
          this.$refs.group.value = oldValue;
        });
      }
    },

    events: common.events,

    created: common.onCreated,

    destroyed: common.onDestroyed,

    compiled: common.onCompiled,

    methods: merge({}, common.methods)
  };
</script>