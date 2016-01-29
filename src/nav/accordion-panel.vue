<template>
  <div class="accordion-section" :class="{active: active, disabled: disabled}" @click="onHeaderClick($event)">
    <h3 class="accordion-header d-icon d-icon-arrow-right">{{title}}</h3>
    <div class="accordion-content-wrap" transition="section" v-show="active">
      <div class="accordion-content" v-el:content>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style>
  .accordion-section {
    margin-top: 5px;
  }

  .accordion-section:first-child {
    margin-top: 0;
  }

  .accordion-section .accordion-header {
    font-size: 14px;
    line-height: 20px;
    margin: 0;
    padding: 10px 8px;
    display: block;
    cursor: pointer;
    color: #666;
  }

  .accordion-section .accordion-header:before {
    float: right;
    line-height: 20px;
    transform: rotateZ(0deg);
    transition: transform .3s;
  }

  .accordion-section.active .accordion-header:before {
    transform: rotateZ(90deg);
  }

  .accordion-section.active .accordion-content-wrap {
    height: auto;
  }

  .accordion-section.disabled .accordion-header {
    cursor: not-allowed;
  }

  .accordion-content-wrap {
    overflow: hidden;
  }

  .accordion-content {
    padding: 8px 16px;
    margin: 0;
    box-sizing: border-box;
    line-height: 1.8;
    font-size: 14px;
    background-color: #fff;
    color: #676a6c;
  }

  .accordion-default .accordion-section {
    border: solid 1px #d2d2d2;
    border-bottom-width: 0;
    border-radius: 3px;
  }

  .accordion-default .accordion-header {
    border-radius: 3px;
    border-bottom: solid 1px #d2d2d2;
    background-color: #f5f5f5;
  }

  .accordion-default .accordion-content-wrap {
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  .accordion-default .accordion-section.active .accordion-header {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .accordion-default .accordion-section.active {
    border-bottom-width: 1px;
  }

  .accordion-transparent .accordion-header {
    background-color: transparent;
  }

  .accordion-transparent .accordion-header:before {
  }

  .accordion-transparent .accordion-content {
    background-color: transparent;
    padding: 0;
  }

  .section-transition {
    transition: .3s;
  }

</style>

<script type="text/ecmascript-6">
  import { hasClass } from 'wind-dom';

  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      active: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },

    methods: {
      onHeaderClick(event) {
        var currentTarget = event.currentTarget;
        if (hasClass(currentTarget, 'disabled')) {
          return;
        }
        var target = event.target;
        if (target.tagName !== 'H3') {
          return;
        }
        this.active = !this.active;
      },

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

    transitions: {
      section: {
        beforeEnter(el) {
          el.style.height = '0';
        },
        enter(el) {
          el.style.height = this.getCurrentStyle(this.$els.content, 'height');
        },
        beforeLeave(el) {
          el.style.height = this.getCurrentStyle(this.$els.content, 'height');
        },
        leave(el) {
          setTimeout(() => el.style.height = '0');
        },
        afterLeave(el) {
          this.$els.content.style.display = 'block';
          el.style.height = '';
        }
      }
    }
  };
</script>