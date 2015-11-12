<template>
  <div class='d-field d-selectfield' :class="{ 'validate-error': hintType === 'error', required: isRequired }" @click="$event.stopPropagation()">
    <label :style="{ width: labelWidth != null ? labelWidth + 'px' : '' }" v-show="!hideLabel">{{ label || '' }}</label>
    <div>
      <div @click="toggleSelect($event)" class="d-selectfield-box" :class="{ active: selectVisible }">
        {{ textValue }}<span class="d-selectfield-trigger d-icon icon-select-arrow-down"></span>
      </div>
      <d-select v-if="selectActive" v-show="selectVisible" :value.sync="selectValue" @select="selectVisible = false">
        <d-option v-for="(key, val) in mapping" :value="val">{{key}}</d-option>
      </d-select>
      <div class="d-field-hint">
        <i class='d-icon' :class="{ 'icon-formfield-error': hintType === 'error', 'icon-formfield-warning': hintType === 'warning' }"></i>{{ hintMessage || '' }}
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
    border: 1px solid #dedede;
    width: 100%;
    box-sizing: border-box;
    border-radius: 2px;
    line-height: 30px;
    height: 30px;
    transition: border 0.3s;
  }

  .d-selectfield-box.active {
    border-color: #5cb6e6;
  }

  .d-selectfield-box .d-selectfield-trigger {
    float: right;
    margin-right: 4px;
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  var domUtil = require('wind-dom');
  var merge = require('../../util').merge;
  var common = require('./field-common');

  export default {
    props: merge({}, common.props),

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

        if (mapping && selectValue !== null && selectValue !== undefined) {
          for (var label in mapping) {
            if (mapping.hasOwnProperty(label)) {
              var value = mapping[label];
              if (value === selectValue) {
                return label;
              }
            }
          }
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

    watch: {
      selectVisible(newVal) {
        if (newVal === true) {
          var self = this;
          domUtil.once(document, 'click', function(event) {
            var target = event.target;
            if (target === self.$el || self.$el.contains(target)) {
              return;
            }
            self.selectVisible = false;
          });
        }
      }
    },

    methods: merge({
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