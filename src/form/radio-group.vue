<style>
  .radio-group input[type="radio"] {
    display: inline-block;
  }
</style>

<template>
  <div class="radio-group"><slot></slot></div>
</template>

<script type="text/ecmascript-6">
  var idSeed = 1;
  const prefix = 'radio-group-';

  var syncValue = (group, value) => {
    var children = group.$children;

    children.forEach(function(child) {
      if (child.value == value) {
        child.$el.querySelector('input').checked = true;
      }
    });
  };

  export default {
    props: [ 'value' ],

    watch: {
      value(val) {
        syncValue(this, val);
      }
    },

    compiled() {
      this.$radioName = prefix + idSeed++;
    },

    ready() {
      var value = this.value;
      if (typeof value !== 'undefined') {
        syncValue(this, value);
      }
    }
  }
</script>