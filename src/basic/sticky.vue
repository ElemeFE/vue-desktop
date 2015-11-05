<template>
  <div class="btn btn-primary sticky" :class="{'sticky-fixed': fixed}" :style="{top: top + 'px'}"v-el:sticky>
    <slot></slot>
  </div>
  <div class="sticky-phantom" v-show="fixed" v-el:phantom></div>
</template>

<style>
  .sticky {
    display: block;
    text-align: center;
    box-sizing: border-box;
  }

  .sticky-phantom {
    box-sizing: border-box;
  }

  .sticky.sticky-fixed {
    position: fixed;
  }
</style>

<script type="text/ecmascript-6">
  export default {
    props: {
      top: {
        type: Number,
        default: 0
      }
    },

    data() {
      return {
        fixed: false
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
      }
    },

    ready() {
      var phantom = this.$els.phantom;
      var sticky = this.$els.sticky;
      phantom.style.width = this.getCurrentStyle(sticky, 'width');
      phantom.style.height = this.getCurrentStyle(sticky, 'height');
      phantom.style.padding = this.getCurrentStyle(sticky, 'padding');
      phantom.style.margin = this.getCurrentStyle(sticky, 'margin');

      var el = sticky.parentNode;
      while(el && (this.getCurrentStyle(el, 'overflow') === 'visible' || (this.getCurrentStyle(el, 'overflow') === 'hidden'))) {
        el = el.parentNode;
      }
      if (!el) {
        return;
      }
      var self = this;
      var originalWidth = phantom.style.width;
      var fixedPointTop = Math.max(window.scrollY || 0, document.documentElement.scrollTop || 0) + sticky.getBoundingClientRect().top - this.top;
      el.addEventListener('scroll', function() {
        var scrollTop = Math.max(this.scrollY || 0, this.scrollTop || 0);
        if ((!self.fixed) && (sticky.getBoundingClientRect().top <= self.top)) {
          sticky.style.width = originalWidth;
          self.fixed = true;
        } else if ((self.fixed) && (scrollTop < fixedPointTop)){
          self.fixed = false;
        }
      });
    }
  }
</script>