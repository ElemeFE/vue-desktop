<template>
  <div class='d-field d-selectfield' :class="{ 'validate-error': hintType === 'error' }" @click="$event.stopPropagation()">
    <label>{{ label || '' }}</label>
    <div>
      <div @click="toggleSelect($event)" class="d-selectfield-box" :class="{ active: selectVisible }">{{ visibleLabel }}</div>
      <d-select v-if="selectActive" v-show="selectVisible" :value.sync="bindProperty" @select="selectVisible = false">
        <d-option v-for="(key, val) in mapping" :value="val">{{key}}</d-option>
      </d-select>
      <div class="d-field-hint">
        <i class='iconfont' :class="{ 'icon-formfield-error': hintType === 'error', 'icon-formfield-warning': hintType === 'warning' }"></i>{{ hintMessage || '' }}
      </div>
    </div>
  </div>
</template>

<style>
  .d-selectfield .d-select {
    position: absolute;
    top: 32px;
    max-height: 200px;
  }

  .d-selectfield-box {
    border: 1px solid #dedede;
    width: 300px;
    box-sizing: border-box;
    border-radius: 2px;
    line-height: 30px;
    height: 30px;
  }

  .d-selectfield-box:hover,
  .d-selectfield-box.active {
    border-color: #5cb6e6;
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  var SchemaStore = require('../../schema/store');
  var domUtil = require('wind-dom');

  export default {
    props: {
      model: {
        default() {
          return {}
        }
      },
      property: {},
      schema: {},
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
    },

    data() {
      return {
        selectActive: false,
        selectVisible: false
      }
    },

    computed: {
      visibleLabel() {
        var mapping = this.mapping;
        var bindProperty = this.bindProperty;

        if (mapping && bindProperty) {
          for (var label in mapping) {
            if (mapping.hasOwnProperty(label)) {
              var value = mapping[label];
              if (value === bindProperty) {
                return label;
              }
            }
          }
        }
      },
      bindProperty: {
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
    },

    components: {
      DSelect: require('../select.vue'),
      DOption: require('../select-option.vue')
    },

    compiled() {
      if (this.property) {
        this.$watch('model.' + this.property, function() {
          this.validate();
        });

        var schema = this.schema;
        var property = this.property;

        if (!property) return;

        if (typeof schema === 'string') {
          schema = this.schema = SchemaStore.getSchema(schema);
        }
        if (!schema) return;

        if (!this.label) {
          this.label = schema.$getPropertyLabel(property);
        }

        var mapping = schema.$getPropertyMapping(property);
        if (!mapping) return;

        this.mapping = mapping;
      }
    },

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

    methods: {
      toggleSelect(event) {
        this.selectActive = true;
        this.selectVisible = !this.selectVisible;
      },

      showSelect() {
        this.selectActive = true;
        this.selectVisible = true;
      },

      hideSelect() {
        this.selectVisible = false;
      },

      validate() {
        var model = this.model;
        var schema = this.schema;
        if (typeof schema === 'string') {
          schema = this.schema = SchemaStore.getSchema(schema);
        }

        if (schema) {
          schema.$validateProperty(model, this.property);
          this.hintType = model.$hintTypes[this.property];
          this.hintMessage = model.$hints[this.property];
        }
      }
    }
  };
</script>