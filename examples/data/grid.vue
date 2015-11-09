<template>
  <d-grid :data="testData" schema="Test" height2="300" :fit="true" :selection.sync="selection" :fixed-column-count2="3">
    <d-grid-column type="index"></d-grid-column>
    <d-grid-column type="selection"></d-grid-column>
    <d-grid-column property="prop1"></d-grid-column>
    <d-grid-column property="prop2"></d-grid-column>
    <d-grid-column property="prop3" width="400"></d-grid-column>
    <d-grid-column property="prop4"></d-grid-column>
    <d-grid-column label="5" property="prop5"></d-grid-column>
    <d-grid-column label="操作" width="200"><d-button @click="$parent.test()">测试1</d-button><button>测试2</button><button>测试3</button></d-grid-column>
  </d-grid>
</template>

<script type="text/ecmascript-6" lang="babel">
  import { SchemaStore } from '../../src/index.js'

  SchemaStore.defineSchema('Test', {
    prop1: {
      label: '测试1',
      required: true
    },
    prop2: {
      label: '测试2',
      required: true
    },
    prop3: {
      label: '测试3'
    },
    prop4: {
      label: '测试4'
    },
    prop5: {
      label: '测试5'
    }
  });

  export default {
    methods: {
      test() {
        alert(123);
      },

      removeThis(row) {
        var index = this.selection.indexOf(row);
        if (index !== -1) {
          this.selection.splice(index, 1);
        }
      }
    },
    data() {
      return {
        selection: [],
        testData: [
          {prop1: '11', prop2: '12', prop3: '13', prop4: '14', prop5: '15'},
          {prop1: '21', prop2: '22', prop3: '23', prop4: '24', prop5: '25'},
          {prop1: '31', prop2: '32', prop3: '33', prop4: '34', prop5: '35'},
          {prop1: '41', prop2: '42', prop3: '43', prop4: '44', prop5: '45'},
          {prop1: '51', prop2: '52', prop3: '53', prop4: '54', prop5: '55'},
          {prop1: '11', prop2: '12', prop3: '13', prop4: '14', prop5: '15'},
          {prop1: '21', prop2: '22', prop3: '23', prop4: '24', prop5: '25'},
          {prop1: '31', prop2: '32', prop3: '33', prop4: '34', prop5: '35'},
          {prop1: '41', prop2: '42', prop3: '43', prop4: '44', prop5: '45'},
          {prop1: '51', prop2: '52', prop3: '53', prop4: '54', prop5: '55'},
          {prop1: '11', prop2: '12', prop3: '13', prop4: '14', prop5: '15'},
          {prop1: '21', prop2: '22', prop3: '23', prop4: '24', prop5: '25'},
          {prop1: '31', prop2: '32', prop3: '33', prop4: '34', prop5: '35'},
          {prop1: '41', prop2: '42', prop3: '43', prop4: '44', prop5: '45'},
          {prop1: '51', prop2: '52', prop3: '53', prop4: '54', prop5: '55'}
        ]
      };
    }
  };
</script>