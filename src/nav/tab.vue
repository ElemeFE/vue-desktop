<template>
  <div class="d-tabpane" :class="{ hidden: !visible }" v-show="visible" transition="tabpane-fade">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      name: {
        type: String
      },

      title: {
        type: String
      },

      icon: {
        type: String
      },

      disabled: {
        type: Boolean,
        default: false
      },

      closable: {
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
        return this.$parent.activeTab === this;
      }
    },

    created() {
      this.$parent.tabs.push(this);
    }
  }
</script>

<style scoped>
  .tabpane-fade-transition {
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    transform: none;
  }

  .tabpane-fade-enter, .tabpane-fade-leave {
    opacity: 0;
  }

  .tabpane-fade-enter {
    transform: translateX(20px);
  }

  .tabpane-fade-leave {
    display: none !important;
  }

  .d-tabpane {
    display: block;
    padding: 10px;
    background: #fff;
  }

  .d-tabpane.hidden {
    position: absolute;
  }
</style>
