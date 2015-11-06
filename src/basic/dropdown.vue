<template>
  <div class="dropdown btn btn-primary" :class="{active: showItem}">
    {{title}}
    <ul class="dropdown-list" v-show="showItem" v-el:ul transition="fade">
      <slot></slot>
    </ul>
  </div>
</template>

<style>
  .dropdown {
    position: relative;
    box-sizing: border-box;
  }

  .dropdown.active {
    background-color: #4bf;
    border-color: #4bf;
  }

  .dropdown-list {
    margin: 0;
    padding: 0;
    position: absolute;
    list-style: none;
    display: block;
    width: max-content;
    border: solid 1px #ddd;
    border-radius: 3px;
    box-shadow: 0 0 2px #ddd;
  }

  .fade-transition {
    transition: .4s ease-in;
  }

  .fade-enter, .fade-leave {
    opacity: 0;
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  var getStyle = require('wind-dom').getStyle;
  
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      trigger: {
        type: String,
        default: 'hover'
      },
      position: {
        type: String,
        default: 'bottom'
      }
    },

    data() {
      return {
        showItem: false
      }
    },

    methods: {
      onMouseEnter() {
        this.showItem = true;
      },

      onMouseLeave() {
        this.showItem = false;
      },

      onClick(event) {
        if (event.target.className.indexOf('disabled') === -1 && event.target.tagName !== 'HR') {
          this.showItem = !this.showItem;
        }
      }
    },

    ready() {
      if (this.trigger === 'click') {
        this.$el.addEventListener('click', this.onClick);
      } else {
        this.$el.addEventListener('mouseenter', this.onMouseEnter);
        this.$el.addEventListener('mouseleave', this.onMouseLeave);
      }
      switch(this.position) {
        case 'top':
          this.$els.ul.style.bottom = parseInt(getStyle(this.$el, 'height')) + 5 + 'px';
          this.$els.ul.style.left = '0';
          break;
        case 'left':
          this.$els.ul.style.right = parseInt(getStyle(this.$el, 'width')) + 5 + 'px';
          this.$els.ul.style.top = '0';
          break;
        case 'right':
          this.$els.ul.style.left = parseInt(getStyle(this.$el, 'width')) + 5 + 'px';
          this.$els.ul.style.top = '0';
          break;
        default:
          this.$els.ul.style.top = parseInt(getStyle(this.$el, 'height')) + 5 + 'px';
          this.$els.ul.style.left = '0';
      }
    }
  }
</script>