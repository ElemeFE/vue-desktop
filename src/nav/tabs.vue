<template>
  <div class="d-tabs {{ placementClass }}">
    <div class="d-tabs-content" v-if="tabPlacement === 'bottom'">
      <slot></slot>
    </div>
    <ul class="d-tabs-nav">
      <li class="d-tab" v-for="tab in tabs" @click="handleTabClick($event, tab)" :class="{ active: activeTab === tab, disabled: tab.disabled }">
        <span v-if="tab.icon" class="d-tab-icon {{ tab.icon }}"></span>
        <span class="d-tab-label">{{ tab.title }}</span>
        <span v-if="tab.closable" class="d-tab-close d-icon icon-close" @click="close($event, tab)"></span>
      </li>
    </ul>
    <div class="d-tabs-content" v-if="tabPlacement !== 'bottom'">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6" lang="babel">
  export default {
    props: {
      tabPlacement: {
        defaultValue: 'top'
      }
    },

    computed: {
      placementClass() {
        return {
          top: '',
          bottom: 'placement-bottom',
          left: 'placement-left',
          right: 'placement-right'
        }[this.tabPlacement || 'top'];
      }
    },

    watch: {
      activeTabIndex(newVal) {
      }
    },

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

      setActiveTab(index) {
        var tabs = this.tabs;
        var tab;
        if (typeof index === 'number') {
          tab = tabs[index];
        } else if (typeof index === 'string') {
          tabs.forEach(function(item) {
            if (item.name === index) {
              tab = index;
            }
          });
        } else {
          tabs.forEach(function(item) {
            if (item === index) {
              tab = index;
            }
          });
        }

        if (tab) {
          this.activeTab = tab;
        }
      },

      getActiveTab() {
        return this.activeTab;
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

<style>
  .d-tabs-nav {
    list-style: none;
    padding: 0;
    margin: 0 0 -1px 0;
  }

  .d-tabs-content {
    border: 1px solid #e7eaec;
    background: #fff;
  }

  .d-tab {
    display: inline-block;
    background: none;
    border: none;
    color: #676a6c;
    padding: 8px 10px;
    border-bottom: 0;
    cursor: pointer;
    font-size: 14px;
    min-width: 100px;
    border-radius: 5px 5px 0 0;
  }

  .placement-bottom .d-tab {
    border-radius:  0 0 5px 5px;
  }

  .placement-bottom .d-tab.active {
    border-top: 0;
    border-bottom: 1px;
    /* TODO */
    margin-top: -1px;
    margin-bottom: 0;
  }

  .d-tab:hover {
    color: #a7b1c2;
  }

  .d-tab.active {
    border: 1px solid #e7eaec;
    border-bottom-color: transparent;
    background: #fff;
    color: #555555;
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
    color: #676a6c;
    text-align: right;
  }

  .d-tab:hover .d-tab-icon,
  .d-tab:hover .d-tab-close {
    color: #a7b1c2;
  }

  .d-tab + .d-tab {
    margin: 0 0 0 1px;
  }
</style>