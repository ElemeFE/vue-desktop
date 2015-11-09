<template>
  <div class="d-tabs">
    <ul class="d-tabs-nav">
      <li class="d-tab" v-for="tab in tabs" @click="handleTabClick($event, tab)" :class="{ active: activeTab === tab, disabled: tab.disabled }">
        <span v-if="tab.icon" class="d-tab-icon {{ tab.icon }}"></span>
        <span class="d-tab-label">{{ tab.title }}</span>
        <span v-if="tab.closable" class="d-tab-close d-icon icon-close" @click="close($event, tab)"></span>
      </li>
    </ul>
    <div class="d-tabs-content">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6" lang="babel">
  export default {
    props: {},

    ready() {
      if (!this.activeTab) {
        for (var i = 0, j = this.tabs.length; i < j; i++) {
          var tab = this.tabs[i];
          if (!tab.disabled) {
            this.activeTab = tab;
            break;
          }
        }
      }
    },

    methods: {
      handleTabClick(event, tab) {
        event.preventDefault();
        if (tab.disabled) return;
        this.activeTab = tab;
      },

      close(event, tab) {
        event.stopPropagation();

        var tabs = this.tabs;
        var index = tabs.indexOf(tab);
        var i, newActiveTab, item;

        for (i = index - 1; i >= 0; i--) {
          item = tabs[i];
          if (!item.disabled) {
            newActiveTab = item;
            break;
          }
        }

        if (!newActiveTab) {
          for (i = index + 1; i < tabs.length; i++) {
            item = tabs[i];
            if (!item.disabled) {
              newActiveTab = item;
              break;
            }
          }
        }

        if (newActiveTab) {
          this.activeTab = newActiveTab;
        }

        tabs.splice(index, 1);
        this.$children[index].$destroy(true);
      }
    },

    data() {
      return {
        tabs: [],
        activeTab: null
      }
    }
  }
</script>

<style scoped>
  .d-tabs-nav {
    list-style: none;
    padding: 0;
    margin: 0 0 -1px 0;
  }

  .d-tabs-content {
    padding: 5px;
    border: 1px solid #f0f0f0;
    border-top: 1px solid #379be9;
  }

  .d-tab {
    display: inline-block;
    color: #666;
    padding: 8px 10px;
    border-bottom: 0;
    cursor: pointer;
    font-size: 14px;
    min-width: 100px;
  }

  .d-tab:hover {
    background: #379be9;
    color: #fff;
  }

  .d-tab.active {
    background: #379be9;
    color: #fff;
    text-decoration: none;
    margin-bottom: -1px;
  }

  .d-tab.disabled {
    cursor: not-allowed;
  }

  .d-tab.disabled:hover {
    color: #666;
    background-color: transparent;
  }

  .d-tab > a {
    text-decoration: none;
    color: #333;
  }

  .d-tab-icon {
    display: inline-block;
    width: 16px;
  }

  .d-tab-close {
    float: right;
    width: 16px;
    color: #666;
    text-align: right;
  }

  .d-tab:hover .d-tab-icon,
  .d-tab:hover .d-tab-close,
  .d-tab.active .d-tab-icon,
  .d-tab.active .d-tab-close {
    color: #fff;
  }

  .d-tab + .d-tab {
    margin: 0 0 0 1px;
  }
</style>