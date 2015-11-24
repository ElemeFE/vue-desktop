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

  .loading {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -170px;
    margin-top: -30px;
    height: 60px;
    width: 340px;
    color: #666;
    font-size: 48px;
    text-align: center;
  }

  .loading i {
    font-size: inherit;
  }

  .login {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -170px;
    margin-top: -130px;
    height: 260px;
    width: 340px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    box-shadow: 0 0 12px #bbb;
    padding: 30px 20px;
  }
  .login span {
    display: block;
    text-align: center;
  }
  .login .d-form {
    margin-top: 30px;
  }
  .content {
    height: 100%;
  }
  #aside {
    box-sizing: border-box;
    box-shadow: inset -2px 0 6px rgba(41,63,84,0.24);
    width: 200px;
    height: 100%;
    float: left;
    background: #354052;
    overflow-x: hidden;
    overflow-y: auto;
  }
  #aside p {
    margin: 0;
    padding: 18px 8px;
    color: #8294aa;
    font-size: 20px;
    background-color: rgba(0, 0, 0, 0.28);
    color: rgba(255, 255, 255, 0.75);
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
  .demolist {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .demolist li {
    padding: 0;
    cursor: pointer;
  }
  .demolist li:hover a {
    background-color: #2b3647;
  }
  .demolist .v-link-active {
    background-color: #0f141e;
    font-weight: 400;
  }
  .demolist .v-link-active:hover {
    background-color: #0f141e;
  }
  .demolist a {
    padding: 8px 30px;
    display: block;
    color: #c0cad8;
    text-decoration: none;
    transition: background-color .3s;
  }
  .demoheader {
    padding: 8px;
    color: #8294aa;
  }
</style>

<template>
  <div id="aside">
    <p class="title">Vue Desktop</p>
    <div class="demoheader">Basic</div>
    <ul class="demolist">
      <li><a v-link="{ path: '/alert' }">Alert</a></li>
      <li><a v-link="{ path: '/dialog' }">Dialog</a></li>
      <li><a v-link="{ path: '/button' }">Button</a></li>
      <li><a v-link="{ path: '/progress-bar' }">ProgressBar</a></li>
      <li><a v-link="{ path: '/slider' }">Slider</a></li>
      <li><a v-link="{ path: '/sticky' }">Sticky</a></li>
      <li><a v-link="{ path: '/dropdown' }">Dropdown</a></li>
    </ul>
    <div class="demoheader">Form</div>
    <ul class="demolist">
      <li><a v-link="{ path: '/field' }">Form & Field</a></li>
      <li><a v-link="{ path: '/editor' }">Editor</a></li>
      <li><a v-link="{ path: '/mapping' }">Mapping</a></li>
      <li><a v-link="{ path: '/validation' }">Validation</a></li>
    </ul>
    <div class="demoheader">Data</div>
    <ul class="demolist">
      <li><a v-link="{ path: '/grid' }">Grid</a></li>
      <li><a v-link="{ path: '/tree' }">Tree</a></li>
      <li><a v-link="{ path: '/crud' }">CRUD</a></li>
      <!--<li><a v-link="{ path: '/pagination' }">Pagination</a></li>-->
    </ul>
    <div class="demoheader">Nav</div>
    <ul class="demolist">
      <li><a v-link="{ path: '/tabs' }">Tabs</a></li>
      <li><a v-link="{ path: '/accordion' }">Accordion</a></li>
    </ul>
    <div class="demoheader">Service</div>
    <ul class="demolist">
      <li><a v-link="{ path: '/msgbox' }">MessageBox</a></li>
      <li><a v-link="{ path: '/notification' }">Notification</a></li>
      <li><a v-link="{ path: '/tooltip' }">Tooltip</a></li>
      <li><a v-link="{ path: '/loading-mask' }">Loading Mask</a></li>
    </ul>
  </div>
  <div id="main">
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6" lang="babel">
  export default {}
</script>
