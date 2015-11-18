<template>
  <div class="accordion-section" :class="{active: active, disabled: disabled}" @click="onHeaderClick($event)">
    <h3 class="accordion-header fa fa-angle-right">{{title}}</h3>
    <div class="accordion-content-wrap" transition="section" v-show="active">
      <div class="accordion-content" v-el:content>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style>
  .accordion-section .accordion-header {
    font-size: 14px;
    margin: 0;
    padding: 10px 8px;
    display: block;
    cursor: pointer;
    color: #fff;
    background-color: #59677e;
  }

  .accordion-section .accordion-header:before {
    color: #fff;
    float: right;
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
  }

  .accordion-transparent .accordion-header {
    color: inherit;
    background-color: transparent;
  }

  .accordion-transparent .accordion-header:before {
    color: inherit;
  }

  .accordion-transparent .accordion-content {
    background-color: transparent;
  }

  .section-transition {
    transition: .3s;
  }

</style>

<script type="text/ecmascript-6" lang="babel">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      content: {
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
        if (currentTarget.classList.contains('disabled')) {
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
        beforeEnter: function (el) {
          el.style.height = '0';
        },
        enter: function (el) {
          el.style.height = this.getCurrentStyle(this.$els.content, 'height');
        },
        beforeLeave: function (el) {
          el.style.height = this.getCurrentStyle(this.$els.content, 'height');
        },
        leave: function (el) {
          setTimeout(() => el.style.height = '0');
        },
        afterLeave: function (el) {
          this.$els.content.style.display = 'block';
          el.style.height = '';
        }
      }
    }
  }
</script>