<template>
  <span>
    <input type="radio" :id.once="id" :name.once="$parent.$radioName" @change="onChange($event, this)"/><label :for.once="id"><slot></slot></label>
  </span>
</template>

<script type="text/ecmascript-6">
  var seed = 1;

  export default {
    props: [ 'value' ],

    created() {
      this.id = 'd_radio_' + seed++;
    },

    methods: {
      onChange: function(event, self) {
        var target = event.target;
        if (target.checked) {
          self.$parent.value = self.value;
        }
      }
    }
  }
</script>