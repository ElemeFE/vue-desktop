<template>
  <div class="loading-mask">
    <div class="loading-mask-content" style="margin-top: -48px;">
      <div class="loading-mask-progress rotation">
        <div></div>
      </div>
      <div class="loading-mask-text">{{ text || 'Please wait...' }}</div>
    </div>
  </div>
</template>

<style>
  .loading-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9989;
    text-align: center
  }

  .loading-mask-content {
    position: absolute;
    width: 100%;
    top: 50%;
    backface-visibility: hidden
  }

  .loading-mask-text {
    position: relative;
    margin: 20px 0 0
  }

  .loading-mask-progress.rotation > div {
    width: 60px;
    height: 60px;
    margin: auto;
    border-radius: 100%;
    border-width: 6px;
    border-style: solid;
    border-left-color: transparent !important;
    border-right-color: transparent !important;
    border-bottom-color: transparent !important;
    animation: loading-progress-rotation 1s infinite linear
  }

  @keyframes loading-progress-rotation {
    0% {
      transform: rotate(0deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }

  .loading-mask-modal {
    background-color: #fff;
    opacity: 0.1;
  }
</style>

<script type="text/ecmascript-6" lang="babel">
  import Popup from '../popup/index';

  export default {
    mixins: [ Popup ],

    computed: {
      popupOptions() {
        return {
          target: 'center',
          animation: false,
          modal: true,
          modalClass: 'loading-mask-modal',
          closeDelay: 300,
          updatePositionOnResize: true
        };
      }
    },

    props: {
      text: {}
    }
  }
</script>