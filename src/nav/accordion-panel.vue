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
    margin: 0;
    padding: 10px 8px;
    display: block;
    border-bottom: solid 1px #999;
    cursor: pointer;
    transition: background-color .3s;
  }

  .accordion-section .accordion-header:before {
    color: #333;
    float: right;
    transform: rotateZ(0deg);
    transition: transform .3s;
  }

  .accordion-section .accordion-header:hover {
    color: #0089dc;
  }

  .accordion-section.active {
    border-bottom: solid 1px #999;
  }

  .accordion-section.active .accordion-header {
    background-color: #ccc;
    color: #0089dc;
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

  .accordion-section:first-child .accordion-header {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  .accordion-section:last-child .accordion-header{
    border-bottom: none;
  }

  .accordion-section:last-child.active {
    border-bottom: none;
  }

  .accordion-section:last-child.active .accordion-header {
    border-bottom: solid 1px #999;
  }

  .accordion-section .accordion-content-wrap {
    overflow: hidden;
  }

  .accordion-section .accordion-content {
    margin: 0;
    padding: 10px 15px;
    box-sizing: border-box;
    line-height: 1.8;
    font-size: 14px;
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