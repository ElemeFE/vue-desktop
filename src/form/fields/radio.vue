<template>
  <div class='d-field d-radiogroupfield' :class="{ 'validate-error': hintType === 'error', required: isRequired }">
    <label>{{ label || '' }}</label>
    <div>
      <d-radio-group v-ref:group :value.sync="editorValue"><d-radio v-for="(key, val) in mapping" :value="val">{{key}}</d-radio><slot></slot></d-radio-group>
      <div class="d-field-hint">
        <i class='d-icon' :class="{ 'icon-formfield-error': hintType === 'error', 'icon-formfield-warning': hintType === 'warning' }"></i>{{ hintMessage || '' }}
      </div>
    </div>
  </div>
</template>

<style>
  .d-radiogroupfield .d-radio-group {
    line-height: 30px;
    height: 30px;
  }

  .d-radiogroupfield .d-radio-group input {
    height: 24px;
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  var merge = require('../../util').merge;
  var common = require('./field-common');

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

    data() {
      return {
        mapping: null
      };
    },

    compiled: common.onCompiled,

    methods: merge({}, common.methods)
  };
</script>