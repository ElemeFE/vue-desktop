<template>
  <div class="tabs">
    <ul class="nav nav-tabs" role="tablist">
      <li v-for="tab in renderData" @click="handleTabClick($event, tab)" :class="{ active: activeTab === tab, disabled: disabled === true }">
        <i>I</i>
        <span>{{ tab.header }}</span>
        <span @click="close($event, tab)">x</span>
      </li>
    </ul>
    <div class="tab-content" v-el="tabContent">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      effect: {
        type: String,
        default: 'fadein'
      }
    },

    ready() {
      if (!this.activeTab) {
        for (var i = 0, j = this.renderData.length; i < j; i++) {
          var tab = this.renderData[i];
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
        this.activeTab = tab;
      },

      close(event, tab) {
        event.stopPropagation();
        console.log(tab);

        var index = this.renderData.indexOf(tab);
        this.renderData.splice(index, 1);
        this.$children[index].$destroy(true);
      }
    },

    data() {
      return {
        renderData: [],
        activeTab: null
      }
    }
  }
</script>

<style scoped>
  .tabs > ul {
    list-style: none;
    padding: 0;
    margin: 0 0 -1px 0;
  }

  .tabs > ul > li {
    border: 1px solid #ccc;
    color: #666;
    padding: 3px 10px;
    border-bottom: 0;
    border-radius: 3px 3px 0 0;
    cursor: pointer;
  }

  .tabs > ul > li:hover {
    background: #0089dc;
    border-color: #0089dc;
    color: #fff;
  }

  .tabs > ul > li.active {
    color: #fff;
    background-color: #0089dc;
    border-color: #0089dc;
    margin-bottom: -1px;
  }

  .tabs > ul > li > a {
    text-decoration: none;
    color: #333;
  }

  .tabs > ul > li {
    display: inline-block;
  }

  .tabs > ul > li + li {
    margin: 0 0 0 3px;
  }

  .tabs .tab-content {
    padding: 5px;
    border: 1px solid #ddd;
  }

  .nav-tabs {
    margin-bottom: 15px
  }
</style>