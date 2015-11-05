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
    border-right: 1px solid #e2e4e7;
    float: left;
    background: #f5f7f8;
    overflow-x: hidden;
    overflow-y: auto;
  }

  #main {
    margin-left: 200px;
    height: 100%;
    padding: 12px;
    box-sizing: border-box;
    overflow: auto;
  }

  .demolist {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .demolist li {
    padding: 0;
    cursor: pointer;
  }

  .demolist li:hover {
    background-color: #e2e4e7;
  }

  .demolist a {
    padding: 8px 20px;
    display: block;
    color: #333;
    text-decoration: none;
  }

  .demoheader {
    background-color: #e2e4e8;
    border-bottom: 1px solid #bbb;
    padding: 8px;
  }
</style>

<template>
  <div id="aside">
    <div class="demoheader">Basic</div>
    <ul class="demolist">
      <li><a v-link="{ path: '/alert' }">Alert</a></li>
      <li><a v-link="{ path: '/dialog' }">Dialog</a></li>
      <li><a v-link="{ path: '/icon' }">Icon</a></li>
      <li><a v-link="{ path: '/button' }">Button</a></li>
      <li><a v-link="{ path: '/progress-bar' }">ProgressBar</a></li>
      <li><a v-link="{ path: '/slider' }">Slider</a></li>
      <li><a v-link="{ path: '/sticky' }">Sticky</a></li>
    </ul>
    <div class="demoheader">Nav</div>
    <ul class="demolist">
      <li><a v-link="{ path: '/tabs' }">Tabs</a></li>
      <li><a v-link="{ path: '/accordion' }">Accordion</a></li>
    </ul>
    <div class="demoheader">Form</div>
    <ul class="demolist">
      <li><a v-link="{ path: '/field' }">FormField</a></li>
      <li><a v-link="{ path: '/texteditor' }">TextEditor</a></li>
      <li><a v-link="{ path: '/radio' }">RadioGroup</a></li>
      <li><a v-link="{ path: '/checkbox' }">CheckBox</a></li>
      <li><a v-link="{ path: '/select' }">Select</a></li>
      <li><a v-link="{ path: '/datepicker' }">DatePicker</a></li>
    </ul>
    <div class="demoheader">Data</div>
    <ul class="demolist">
      <li><a v-link="{ path: '/grid' }">Grid</a></li>
      <li><a v-link="{ path: '/pagination' }">Pagination</a></li>
    </ul>
    <div class="demoheader">Service</div>
    <ul class="demolist">
      <li><a v-link="{ path: '/msgbox' }">MessageBox</a></li>
    </ul>
  </div>
  <div id="main">
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {

  }
</script>
