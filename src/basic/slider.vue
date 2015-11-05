<template>
  <div>
    <div class="slider" :class="{'show-input': showInput}" @click="onSliderClick($event)" v-el:slider>
      <div class="bar" :style="{width: currentPosition}"></div>
      <div class="button" :style="{left: currentPosition}" v-el:button>
        <div class="pop-up" :class="{active: showTip}" v-el:pop-up>{{currentValue}}</div>
      </div>
    </div>
    <input type="text" v-if="showInput" :value="currentValue" @keyup="onInputChange()" v-el:input>
  </div>
</template>

<style>
  .slider {
    width: 100%;
    height: 5px;
    margin: 20px 0;
    background-color: #ccc;
    border-radius: 3px;
    position: relative;
    cursor: pointer;
    vertical-align: middle;
  }

  .slider.show-input {
    width: 88%;
    display: inline-block;
  }

  .slider + input {
    border: solid 1px #ccc;
    box-sizing: border-box;
    width: 8%;
    vertical-align: middle;
    margin-left: 3%;
    text-align: center;
  }

  .slider:hover .button .pop-up {
    display: block;
  }

  .slider .bar {
    height: 5px;
    background-color: #4997dc;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    position: absolute;
  }

  .slider .button {
    height: 9px;
    width: 9px;
    border: solid 2px #4997dc;
    position: absolute;
    background-color: #fff;
    border-radius: 50%;
    top: -4px;
    transform: translateX(-50%);
    cursor: pointer;
  }

  .slider .button .pop-up {
    font-size: 12px;
    line-height: 1.7;
    text-align: center;
    padding: 0 5px;
    border-radius: 4px;
    background-color: #666;
    color: #fff;
    position: absolute;
    bottom: 15px;
    left: -7px;
    cursor: default;
    display: none;
  }

  .slider .button .pop-up.active {
     display: block;
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  export default {
    props: {
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 100
      },
      step: {
        type: Number,
        default: 1
      },
      defaultValue: {
        type: Number,
        default: 0
      },
      showInput: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        showTip: false,
        currentValue: this.defaultValue,
        currentPosition: (this.defaultValue - this.min) / (this.max - this.min) * 100 + '%'
      }
    },

    methods: {
      getCurrentStyle(obj, prop) {
        if (obj.currentStyle) {
          return obj.currentStyle[prop];
        } else if (window.getComputedStyle) {
          prop = prop.toLowerCase();
          return document.defaultView.getComputedStyle(obj, null)[prop];
        }
        return null;
      },

      setNewPosition(newPos) {
        if ((newPos >= 0) && (newPos <= 100)) {
          var lengthPerStep = 100 / ((this.max - this.min) / this.step);
          var steps = Math.round(newPos / lengthPerStep);
          this.currentValue = steps * lengthPerStep * (this.max - this.min) * 0.01 + this.min;
          this.currentPosition = (this.currentValue - this.min) / (this.max - this.min) * 100 + '%';
        }
      },

      onSliderClick(event) {
        var currentX = event.clientX;
        var newPos = (currentX - this.$els.slider.offsetLeft) / this.$sliderWidth * 100;
        this.setNewPosition(newPos);
      },

      onInputChange() {
        if (this.$els.input.value === '') {
          return;
        }
        if (!isNaN(this.$els.input.value)) {
          this.setNewPosition((this.$els.input.value - this.min) * 100 / (this.max - this.min));
        }
      }
    },

    computed: {
      $sliderWidth() {
        return (parseInt(this.getCurrentStyle(this.$els.slider, 'width')));
      }
    },

    ready() {
      var dragging = false;
      var startX = 0;
      var currentX = 0;
      var startPos = 0;
      var self = this;

      var onDragStart = function(event) {
        dragging = true;
        self.showTip = true;
        startX = event.clientX;
        startPos = parseInt(self.currentPosition);
      };

      var onDragging = function(event) {
        if (dragging) {
          currentX = event.clientX;
          var diff = (currentX - startX) / self.$sliderWidth * 100;
          var newPos = startPos + diff;
          self.setNewPosition(newPos);
        }
      };

      var onDragEnd = function() {
        if (dragging) {
          dragging = false;
          self.showTip = false;
          window.removeEventListener('mousemove', onDragging);
          window.removeEventListener('mouseup', onDragEnd);
        }
      };

      this.$els.button.addEventListener('mousedown', function(event) {
        onDragStart(event);
        window.addEventListener('mousemove', onDragging);
        window.addEventListener('mouseup', onDragEnd);
      });
    }
  }
</script>