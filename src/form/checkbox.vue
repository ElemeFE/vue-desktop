<template>
  <input :id.once="id" type="checkbox" /><label :for.once="id" v-if="label">{{ label }}</label>
</template>

<script type="text/ecmascript-6">
  var seed = 1;

  export default {
    props: [ 'label' ],

    created() {
      this.id = 'd_checkbox_' + seed;
    }
  }
</script>
