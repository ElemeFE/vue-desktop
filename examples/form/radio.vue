<template>
  <radio-group :value.sync="value">
    <radio value="1">test1</radio>
    <radio value="2">test2</radio>
    <radio value="3">test3</radio>
    <radio value="4">test4</radio>
  </radio-group>

  <radio-group :value.sync="value">
    <radio value="1">test1</radio>
    <radio value="2">test2</radio>
    <radio value="3">test3</radio>
    <radio value="4">test4</radio>
  </radio-group>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        value: 1
      }
    }
  }
</script>