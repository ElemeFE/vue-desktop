<template>
  <div class="d-tabpane" :class="{ hidden: !visible }" v-show="visible" transition="tabpane-fade">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6" lang="babel">
  export default {
    props: {
      header: {
        type: String
      },

      icon: {
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
        return this.$parent.activeTab === this;
      },

      transition() {
        return this.$parent.effect;
      }
    },

    created() {
      this.$parent.tabs.push(this);
    }
  }
</script>

<style scoped>
  .tabpane-fade-transition {
    transition: all 0.3s ease;
  }

  .tabpane-fade-enter, .tabpane-fade-leave {
    height: 0;
    padding: 0 10px;
    opacity: 0;
  }

  .d-tabpane {
    display: block;
  }

  .d-tabpane.hidden {
    position: absolute;
  }
</style>
