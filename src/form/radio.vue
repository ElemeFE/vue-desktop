<template>
  <input type="radio" v-el:editor :value.once="value" :id.once="id" :name.once="$parent.$radioName" @change="onChange($event, this)"/><label :for.once="id"><slot></slot></label>
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
        if (target.checked && self.$parent.$setValue) {
          self.$parent.$setValue(self.value);
        }
      }
    }
  };
</script>