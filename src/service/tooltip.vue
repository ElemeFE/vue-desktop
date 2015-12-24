<style>
  .tooltip {
    position: absolute;
    left: -9999px;
    top: -9999px;
    z-index: 100;
    opacity: .8;
  }

  .tooltip.fade {
    opacity: 0;
    transition: opacity 0.15s linear;
  }

  .tooltip.fade.in {
    opacity: 1;
  }

  .tooltip.tooltip-placeright {
    padding-left: 6px;
  }

  .tooltip.tooltip-placeright .tooltip-arrow {
    left: 0;
    top: 50%;
    margin-top: -6px;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-right: 6px solid #333;
  }

  .tooltip.tooltip-placeleft {
    padding-right: 6px;
  }

  .tooltip.tooltip-placeleft .tooltip-arrow {
    right: 0;
    top: 50%;
    margin-top: -6px;
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
    border-left: 6px solid #333;
  }

  .tooltip.tooltip-placetop {
    padding-bottom: 6px;
  }

  .tooltip.tooltip-placetop .tooltip-arrow {
    bottom: 0;
    left: 50%;
    margin-left: -6px;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 6px solid #333;
  }

  .tooltip.tooltip-placebottom {
    padding-top: 6px;
  }

  .tooltip.tooltip-placebottom .tooltip-arrow {
    top: 0;
    left: 50%;
    margin-left: -6px;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid #333;
  }

  .tooltip-content {
    font-size: 14px;
    color: white;
    padding: 5px 10px;
    background: #333;
    border-radius: 3px;
  }

  .tooltip-arrow {
    position: absolute;
  }

  .tooltip-fade-enter {
    animation: tooltip-fade-in 0.2s ease-in;
  }

  .tooltip-fade-leave {
    animation: tooltip-fade-out 0.2s ease-out;
  }

  @keyframes tooltip-fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0.8;
    }
  }

  @keyframes tooltip-fade-out {
    0% {
      opacity: 0.8;
    }
    100% {
      opacity: 0;
    }
  }
</style>

<template>
  <div class="tooltip {{ 'tooltip-place' + (finalPlacement || placement) }}" v-show="visible" transition="tooltip-fade">
    <div class="tooltip-arrow"></div>
    <div class="tooltip-content">
      {{ content }}
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Popup from 'vue-popup';
  require('vue-popup/lib/popup.css');
  import Vue from 'vue';
  import Popover from '../popover';

  export default {
    mixins: [ Popup, Popover ],

    props: {
      title: {
        type: String
      },
      content: {
        type: String
      },
      placement: {
        type: String,
        default: 'bottom'
      },
      finalPlacement: {}
    },

    methods: {
      afterLocate(args) {
        this.finalPlacement = args.placement;
      }
    },

    transitions: {
      tooltipFade: {
        afterLeave(el) {
          var component = el.__vue__;
          if (component) {
            component.$afterClose && component.$afterClose();
          }
        }
      }
    },

    computed: {
      popupOptions() {
        return {
          openDelay: 100,
          placement: 'bottom'
        }
      }
    },

    data() {
      return {};
    }
  };
</script>