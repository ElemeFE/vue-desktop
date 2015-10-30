<template>
  <div role="tabpanel" class="tab-pane" :class="{ hide: !visible }" v-show="visible" transition="expand">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      header: {
        type: String
      },

      disabled: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        visible: false
      }
    },

    computed: {
      visible() {
        console.log('visible:', this.$parent.activeTab === this);
        return this.$parent.activeTab === this;
      },

      transition() {
        return this.$parent.effect;
      }
    },

    created() {
      this.$parent.renderData.push(this);
    }
  }
</script>

<style scoped>
  .expand-transition {
    transition: all 0.3s ease;
    /*background-color: #eee;*/
    /*overflow: hidden;*/
  }

  .expand-enter, .expand-leave {
    height: 0;
    padding: 0 10px;
    opacity: 0;
  }

  .tab-content > .tab-pane {
    display: block;
  }

  .tab-content > .tab-pane.hide {
    position: absolute;
  }

  .fadein-enter {
    animation: fadein-in 0.3s ease-in;
  }

  .fadein-leave {
    animation: fadein-out 0.3s ease-out;
  }
</style>
