<template>
  <d-radio-group :value.sync="value">
    <d-radio value="1">test1</d-radio>
    <d-radio value="2">test2</d-radio>
    <d-radio value="3">test3</d-radio>
    <d-radio value="4">test4</d-radio>
  </d-radio-group>

  <d-radio-group :value.sync="value">
    <d-radio value="1">test1</d-radio>
    <d-radio value="2">test2</d-radio>
    <d-radio value="3">test3</d-radio>
    <d-radio value="4">test4</d-radio>
  </d-radio-group>
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