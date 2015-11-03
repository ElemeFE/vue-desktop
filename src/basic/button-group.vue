<template>
  <div class="btn-group" :class="{'btn-group-lg': size === 'large', 'btn-group-sm': size === 'small'}">
    <slot></slot>
  </div>
</template>

<style>
  .btn-group {
    display: inline-block;
    vertical-align: middle;
  }

  .btn-group .btn {
    padding: 4px 8px;
    float: left;
    border-radius: 0;
    margin-left: -1px;
  }

  .btn-group-lg .btn {
    font-size: 14px;
    padding: 4px 10px;
  }

  .btn-group-sm .btn {
    padding: 2px 6px;
  }

  .btn-group .btn:first-child {
    margin: 0;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  .btn-group .btn:last-child {
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
  }

  .btn-group .btn-primary + .btn {
    border-left-color: #0089dc;
  }

  .btn-group .btn-primary + .btn-primary {
    border-left-color: #178;
  }

  .btn-group .btn-primary:hover {
    border-left-color: #178;
  }

  .btn-group .btn:hover+.btn,
  .btn-group .btn-phantom:hover+.btn {
    border-left-color: #0089dc;
  }

  .btn-group .btn-primary:hover+.btn {
    border-left-color: #178;
  }

  .btn-group .btn-primary:first-child {
    border-left-color: #0089dc;
  }

  .btn-group .btn-primary:first-child:hover {
    border-left-color: #4bf;
  }
</style>

<script type="text/ecmascript-6">
  export default {
    props: {
      size: {
        type: String,
        default: ''
      }
    }
  }
</script>