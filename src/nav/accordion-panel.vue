<template>
  <div class="section" :class="{active: active, disabled: disabled}" @click="onHeaderClick($event)">
    <h3 class="header fa fa-angle-right">{{title}}</h3>
    <div class="content-wrap" transition="section" v-show="active">
      <div class="content" v-el:content>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style>
  .section .header {
    margin: 0;
    padding: 10px 8px;
    display: block;
    border-bottom: solid 1px #999;
    cursor: pointer;
    transition: background-color .3s;
  }

  .section .header:before {
    color: #333;
    float: right;
    transform: rotateZ(0deg);
    transition: transform .3s;
  }

  .section .header:hover {
    color: #0089dc;
  }

  .section.active {
    border-bottom: solid 1px #999;
  }

  .section.active .header {
    background-color: #ccc;
    color: #0089dc;
  }

  .section.active .header:before {
    transform: rotateZ(90deg);
  }

  .section.active .content-wrap {
    height: auto;
  }

  .section.disabled .header {
    cursor: default;
  }

  .section:first-child .header {
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }

  .section:last-child .header{
    border-bottom: none;
  }

  .section:last-child.active {
    border-bottom: none;
  }

  .section:last-child.active .header {
    border-bottom: solid 1px #999;
  }

  .section .content-wrap {
    overflow: hidden;
  }

  .section .content {
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

<script type="text/ecmascript-6">
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

    created() {
      this.$parent.renderData.push(this);
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