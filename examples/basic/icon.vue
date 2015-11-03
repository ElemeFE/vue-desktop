<template>
  <div class="icon-example">
    <i class="fa fa-camera-retro"></i> fa-camera-retro
  </div>

  <div class="icon-example">
    <i class="fa fa-camera-retro fa-lg"></i> fa-lg
    <i class="fa fa-camera-retro fa-2x"></i> fa-2x
    <i class="fa fa-camera-retro fa-3x"></i> fa-3x
    <i class="fa fa-camera-retro fa-4x"></i> fa-4x
    <i class="fa fa-camera-retro fa-5x"></i> fa-5x
  </div>

  <div class="icon-example">
    <a href="#"><i class="fa fa-home fa-fw"></i>&nbsp; Home</a>
    <a href="#"><i class="fa fa-book fa-fw"></i>&nbsp; Library</a>
    <a href="#"><i class="fa fa-pencil fa-fw"></i>&nbsp; Applications</a>
    <a href="#"><i class="fa fa-cog fa-fw"></i>&nbsp; Settings</a>
  </div>

  <div class="icon-example">
    <ul class="fa-ul">
      <li><i class="fa-li fa fa-check-square"></i>List icons</li>
      <li><i class="fa-li fa fa-check-square"></i>can be used</li>
      <li><i class="fa-li fa fa-spinner fa-spin"></i>as bullets</li>
      <li><i class="fa-li fa fa-square"></i>in lists</li>
    </ul>
  </div>

  <div class="icon-example">
    <i class="fa fa-spinner fa-spin fa-3x"></i>
    <i class="fa fa-circle-o-notch fa-spin fa-3x"></i>
    <i class="fa fa-refresh fa-spin fa-3x"></i>
    <i class="fa fa-cog fa-spin fa-3x"></i>
    <i class="fa fa-spinner fa-pulse fa-3x"></i>
  </div>

  <div class="icon-list">
  </div>
</template>

<style>
  div.icon-example {
    margin-bottom: 40px;
  }
  div.icon-example a {
    display: block;
    padding: 10px;
    width: 200px;
    border: solid 1px #999;
    color: #000;
    text-decoration: none;
    margin-bottom: -1px;
  }
  div.icon-list div {
    margin-bottom: 10px;
    display: inline-block;
    width: 20%;
  }
  div.icon-list i {
    margin-right: 15px;
  }
  div.icon-list span {
    font-size: 12px;
  }
</style>

<script type="text/ecmascript-6">
  var icons = require('./icons');
  export default {
    ready() {
      var frag = document.createDocumentFragment();
      for (var i = 0, len = icons.length; i < len; i++) {
        var div = document.createElement('div');
        var icon = document.createElement('i');
        icon.className = 'fa fa-fw ' + icons[i];
        div.appendChild(icon);
        var span = document.createElement('span');
        span.appendChild(document.createTextNode(icons[i]));
        div.appendChild(span);
        frag.appendChild(div);
      }
      var container = document.getElementsByClassName('icon-list')[0];
      container.appendChild(frag);
    }
  };
</script>