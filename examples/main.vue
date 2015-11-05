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
    box-shadow: inset -2px 0 6px rgba(41,63,84,0.24);
    width: 200px;
    height: 100%;
    float: left;
    background: #f6f7f7;
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

  .demolist li:hover a {
    color: #2a94d6;
  }

  .demolist .v-link-active {
    color: #2a94de;
    font-weight: 400;
  }

  .demolist a {
    padding: 8px 30px;
    display: block;
    color: #333;
    text-decoration: none;
  }

  .demoheader {
    padding: 8px;
    color: #777;
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

<script type="text/ecmascript-6" lang="babel">
  export default {

  }
</script>
