<style>
  html, body {
    font: 100% Helvetica, sans-serif;
    color: #333;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    overflow: hidden;
  }

  #aside {
    box-sizing: border-box;
    width: 200px;
    height: 100%;
    float: left;
    overflow-x: hidden;
    overflow-y: auto;
  }

  #main {
    position: relative;
    margin-left: 200px;
    height: 100%;
    padding: 12px;
    box-sizing: border-box;
    overflow: auto;
    background-color: #f3f3f4;
  }

  #aside {
    position: relative;
    z-index: 1;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.30),
        0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 1px 5px 0 rgba(0, 0, 0, 0.12);
  }

  #aside .v-link-active {
    color: #0f141e;
    font-weight: 600;
  }
</style>

<template>
  <div id="aside">
    <d-nav-menu>
      <d-nav-menu-item v-for="menu in menus" :text="menu.text" :path="menu.path" :expanded="$index === 0">
        <d-nav-menu-item v-for="child in menu.children" :text="child.text" :path="child.path"></d-nav-menu-item>
      </d-nav-menu-item>
    </d-nav-menu>
  </div>
  <div id="main">
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6" lang="babel">
  export default {
    data() {
      return {
        menus: [{
          text: 'Basic',
          children: [{
            text: 'Alert',
            path: '/alert'
          }, {
            text: 'Dialog',
            path: '/dialog'
          }, {
            text: 'Button',
            path: '/button'
          }, {
            text: 'ProgressBar',
            path: '/progress-bar'
          }, {
            text: 'Slider',
            path: '/slider'
          }, {
            text: 'Sticky',
            path: '/sticky'
          }, {
            text: 'Dropdown',
            path: '/dropdown'
          }, {
            text: 'NavMenu',
            path: '/navmenu'
          }]
        }, {
          text: 'Form',
          children: [{
            text: 'Form & Field',
            path: '/field'
          }, {
            text: 'Editor',
            path: '/editor'
          }, {
            text: 'Mapping',
            path: '/mapping'
          }, {
            text: 'Validation',
            path: '/validation'
          }, {
            text: 'Tags',
            path: '/tags'
          }]
        }, {
          text: 'Data',
          children: [{
            text: 'Grid',
            path: '/grid'
          }, {
            text: 'Tree',
            path: '/tree'
          }, {
            text: 'CRUD',
            path: '/crud'
          }]
        }, {
          text: 'Nav',
          children: [{
            text: 'Tabs',
            path: '/tabs'
          }, {
            text: 'Accordion',
            path: '/accordion'
          }, {
            text: 'Breadcrumb',
            path: '/breadcrumb'
          }]
        }, {
          text: 'Service',
          children: [{
            text: 'MessageBox',
            path: '/msgbox'
          }, {
            text: 'Notification',
            path: '/notification'
          }, {
            text: 'Tooltip',
            path: '/tooltip'
          }, {
            text: 'Loading Mask',
            path: '/loading-mask'
          }]
        }]
      }
    }
  }
</script>
