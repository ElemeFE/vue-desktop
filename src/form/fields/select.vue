<template>
  <div class='d-field d-selectfield' :class="{ 'validate-error': hintType === 'error', required: isRequired }">
    <label :style="{ width: labelWidth != null ? labelWidth + 'px' : '' }" v-show="!hideLabel">{{ label || '' }}</label>
    <div>
      <div @click="toggleSelect($event)" class="d-selectfield-box" :class="{ active: selectVisible }">
        {{ textValue }}<span class="d-selectfield-trigger d-icon icon-arrow-down"></span>
      </div>
      <d-select v-ref:select v-if="selectActive" v-show="selectVisible" :value.sync="selectValue" @select="selectVisible = false" @selection-change="handleSelectionChange">
        <d-option v-for="(key, val) in mapping" :value="val" :show-checkbox="multiSelect">{{key}}</d-option>
      </d-select>
      <div class="d-field-hint">
        <i class='d-icon' :class="{ 'icon-error': hintType === 'error', 'icon-warning': hintType === 'warning' }"></i>{{ hintMessage || '' }}
      </div>
    </div>
  </div>
</template>

<style>
  .d-selectfield .d-select {
    position: absolute;
    top: 32px;
    max-height: 200px;
    z-index: 1;
    background: #fff;
  }

  .d-selectfield-box {
    cursor: pointer;
    font-size: 14px;
    padding-left: 4px;
    border: 1px solid #e5e6e7;
    background-color: #fff;
    width: 100%;
    padding-right: 24px;
    box-sizing: border-box;
    border-radius: 2px;
    line-height: 28px;
    height: 28px;
    transition: border 0.3s;
  }

  .d-selectfield-box.active {
    border-color: #1ab394;
  }

  .d-selectfield-box .d-selectfield-trigger {
    position: absolute;
    top: 0;
    right: 0;
    margin-right: 4px;
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  var domUtil = require('wind-dom');
  import { merge } from '../../util';
  import { default as common } from './field-common';
  import { default as Dropdown } from '../../service/dropdown';

  export default {
    props: merge({
      parentProperty: {},
      multiSelect: {
        type: Boolean,
        default: false
      },
      emptyRecord: {
        type: Boolean,
        default: false
      }
    }, common.props),

    data() {
      return {
        selectActive: false,
        selectVisible: false
      }
    },

    computed: merge({
      textValue() {
        var mapping = this.mapping;
        var selectValue = this.selectValue;

        var reversedMap = {};

        for (var label in mapping) {
          if (mapping.hasOwnProperty(label)) {
            var value = mapping[label];
            reversedMap[value] = label;
          }
        }

        if (selectValue instanceof Array) {
          return selectValue.map(function(item) {
            return reversedMap[item];
          }).join(',');
        }

        if (mapping && selectValue !== null && selectValue !== undefined) {
          return reversedMap[selectValue];
        }
      },
      selectValue: {
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
      DSelect: require('../select.vue'),
      DOption: require('../select-option.vue')
    },

    events: common.events,

    created: common.onCreated,

    compiled: common.onCompiled,

    ready() {
      if (this.parentProperty) {
        var select = this;
        this.$watch('model.' + this.parentProperty, function() {
          var schema = select.fieldSchema;
          var emptyRecord = this.emptyRecord;
          if (schema) {
            var result = schema.getPropertyMapping(select.property, select.model);
            if (result.then) {
              result.then(function(value) {
                select.selectValue = null;
                select.mapping = value;
                if (emptyRecord) {
                  select.mapping[''] = null;
                }
              });
            } else {
              select.mapping = result;
              if (emptyRecord) {
                select.mapping[''] = null;
              }
            }
          }
        });
      }
    },

    watch: {
      selectVisible(newVal) {
        if (newVal === true) {
          Dropdown.open(this);
        } else {
          Dropdown.close(this);
        }
      }
    },

    methods: merge({
      onDocumentClick() {
        this.selectVisible = false;
      },

      handleSelectionChange() {
        var children = this.$refs.select.$children;
        var value = [];

        children.forEach(function(child) {
          if (child.selected) {
            value.push(child.value);
          }
        });
        this.selectValue = value;
      },

      toggleSelect() {
        this.selectActive = true;
        this.selectVisible = !this.selectVisible;
      },

      showSelect() {
        this.selectActive = true;
        this.selectVisible = true;
      },

      hideSelect() {
        this.selectVisible = false;
      }
    }, common.methods)
  };
</script>