<template>
  <div class="dropdown btn btn-default" :class="{active: showItem}">
    {{title}}
    <span class="dropdown-icon d-icon icon-arrow-down" v-el:span></span>
    <dropdown-list :visible.sync="showItem" v-ref:list><slot></slot></dropdown-list>
  </div>
</template>

<style>
  .dropdown {
    position: relative;
    box-sizing: border-box;
  }

  .dropdown .dropdown-icon {
    margin-left: 10px;
    color: #676a6c;
  }

  .dropdown .dropdown-icon:before {
    color: #676a6c;
    transition: .3s;
  }

  .dropdown.active {
    background-color: #1c84c6;
    border-color: #1c84c6;
    color: #fff;
  }

  .dropdown.active .dropdown-icon:before {
    color: #fff;
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
    background-color: #fff;
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  import Popup from 'vue-popup';
  require('vue-popup/lib/popup.css');
  import { default as Dropdown } from '../service/dropdown'

  var getStyle = require('wind-dom').getStyle;
  
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      trigger: {
        type: String,
        default: 'click'
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

    components: {
      dropdownList: {
        mixins: [Popup],
        computed: {
          popupOptions() {
            return {
              placement: this.$parent.position,
              alignment: 'start',
              closeDelay: this.trigger !== 'click' ? 200 : null
            };
          }
        },
        watch: {
          visible(newVal) {
            if (newVal === true) {
              Dropdown.open(this);
            } else {
              Dropdown.close(this);
            }
          }
        },

        methods: {
          onDocumentClick(event) {
            if (event.target !== this.$parent.$el && event.target !== this.$parent.$els.span) {
              this.visible = false;
            }
          }
        },
        inherit: true,
        template: '<ul class="dropdown-list" v-show="visible" transition="pop-fade"><slot></slot></ul>'
      }
    },

    methods: {
      onMouseEnter() {
        this.$refs.list.open({ target: this.$el });
      },

      onMouseLeave() {
        this.$refs.list.close({ closeDelay: 1000 });
      },

      onClick(event) {
        if (event.target.className.indexOf('disabled') === -1 && event.target.tagName !== 'HR') {
          if (this.$refs.list.visible) {
            this.$refs.list.close();
          } else {
            this.$refs.list.open({ target: this.$el });
          }
        }
      }
    },

    detached() {
      Dropdown.close(this);
    },

    destroyed() {
      Dropdown.close(this);
    },

    ready() {
      if (this.trigger === 'click') {
        this.$el.addEventListener('click', this.onClick);
      } else {
        this.$el.addEventListener('mouseenter', this.onMouseEnter);
        this.$el.addEventListener('mouseleave', this.onMouseLeave);
      }
    }
  }
</script>